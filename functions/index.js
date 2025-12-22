/**
 * PARAMIND - Cloud Functions
 * Backend API for the Paramind paramedic learning platform
 */

const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2/options");
const admin = require("firebase-admin");
const { OpenAI } = require("openai");
const Stripe = require("stripe");

// Set global options - deploy to London region
setGlobalOptions({ region: "europe-west2" });

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Constants
const FREE_DAILY_MESSAGES = 5;
const SUBSCRIPTION_PRICE = 499; // £4.99 in pence

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Verify Firebase Auth token and get user ID
 */
async function verifyAuth(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized: No token provided");
  }

  const token = authHeader.split("Bearer ")[1];
  const decodedToken = await admin.auth().verifyIdToken(token);
  return decodedToken.uid;
}

/**
 * Get user document from Firestore
 */
async function getUser(uid) {
  const userDoc = await db.collection("users").doc(uid).get();
  if (!userDoc.exists) {
    throw new Error("User not found");
  }
  return { id: userDoc.id, ...userDoc.data() };
}

/**
 * Check if user can send messages (under daily limit or paid)
 */
async function checkMessageLimit(user) {
  // Paid users have unlimited messages
  if (user.subscriptionStatus === "active") {
    return { allowed: true, remaining: -1 }; // -1 means unlimited
  }

  // Check daily limit for free users
  const today = new Date().toDateString();
  const lastMessageDate = user.lastMessageDate?.toDate?.()?.toDateString?.();

  let messageCount = user.dailyMessageCount || 0;

  // Reset count if it's a new day
  if (lastMessageDate !== today) {
    messageCount = 0;
  }

  if (messageCount >= FREE_DAILY_MESSAGES) {
    return { allowed: false, remaining: 0 };
  }

  return { allowed: true, remaining: FREE_DAILY_MESSAGES - messageCount };
}

/**
 * Increment user's daily message count
 */
async function incrementMessageCount(uid) {
  const today = new Date().toDateString();
  const userRef = db.collection("users").doc(uid);
  const user = await userRef.get();
  const userData = user.data();

  const lastMessageDate = userData.lastMessageDate?.toDate?.()?.toDateString?.();

  if (lastMessageDate !== today) {
    // New day, reset counter
    await userRef.update({
      dailyMessageCount: 1,
      lastMessageDate: admin.firestore.FieldValue.serverTimestamp(),
    });
  } else {
    // Same day, increment
    await userRef.update({
      dailyMessageCount: admin.firestore.FieldValue.increment(1),
      lastMessageDate: admin.firestore.FieldValue.serverTimestamp(),
    });
  }
}

/**
 * Build the system prompt based on user's trust
 */
function buildSystemPrompt(trust, trustFullName) {
  return `You are a knowledgeable and supportive UK-based pre-hospital paramedic assistant, aimed specifically at newly qualified paramedics working within ${trustFullName}. 

Your role is to:
- Aid in assessing patient symptoms and formulating differential diagnoses
- Use UK emergency medical protocols, particularly JRCALC 2025 and 2026
- Provide guidance based ONLY on ${trust}-specific clinical guidelines
- Help with medication advice strictly following ${trust} JRCALC guidelines

IMPORTANT RULES:
- You must NOT refer to other ambulance service trust guidelines
- You must NOT reference any non-${trust} protocols when discussing medications
- This ensures accuracy and protects clinicians from acting outside their scope
- Always remind users this is for educational purposes only
- Encourage users to verify information against official sources
- In real emergencies, advise following trust protocols and seeking senior clinical advice

Be friendly, professional, and thorough in your explanations. Use UK medical terminology and spelling. Format responses clearly with bullet points where appropriate.`;
}

// ============================================
// CLOUD FUNCTIONS
// ============================================

/**
 * POST /chat
 * Handle chat messages - the main AI conversation endpoint
 */
exports.chat = onRequest(
  { 
    cors: true,
    secrets: ["OPENAI_API_KEY"]
  }, 
  async (req, res) => {
    // Only allow POST
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      // Initialize OpenAI with secret
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      // Verify authentication
      const uid = await verifyAuth(req);
      const user = await getUser(uid);

      // Check message limit
      const limitCheck = await checkMessageLimit(user);
      if (!limitCheck.allowed) {
        return res.status(429).json({
          error: "Daily message limit reached",
          message: "You've used all 5 free messages for today. Upgrade to Pro for unlimited messages.",
          upgrade: true,
        });
      }

  // Get message, conversation history, and scenario prompt from request
      const { message, conversationHistory = [], scenarioPrompt } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      // Use scenario prompt if provided, otherwise use default trust prompt
      const systemPrompt = scenarioPrompt || buildSystemPrompt(user.trust, user.trustFullName);

      // Build messages array for OpenAI
      // Filter out any messages with null/undefined content and system messages
      const validHistory = conversationHistory
        .slice(-10)
        .filter(msg => msg && msg.content && msg.role !== 'system');

      const messages = [
        { role: "system", content: systemPrompt },
        ...validHistory,
        { role: "user", content: message },
      ];

      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
      });

      const assistantMessage = completion.choices[0].message.content;

      // Increment message count for free users
      if (user.subscriptionStatus !== "active") {
        await incrementMessageCount(uid);
      }

      // Return response
      return res.status(200).json({
        message: assistantMessage,
        remaining: limitCheck.remaining - 1,
      });

    } catch (error) {
      console.error("Chat error:", error);

      if (error.message.includes("Unauthorized")) {
        return res.status(401).json({ error: error.message });
      }

      return res.status(500).json({
        error: "An error occurred processing your message",
        details: error.message,
      });
    }
  }
);

/**
 * GET /user
 * Get the current user's profile
 */
exports.user = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const uid = await verifyAuth(req);
    const user = await getUser(uid);

    // Check message limit status
    const limitCheck = await checkMessageLimit(user);

return res.status(200).json({
    uid: user.id,
    firstName: user.firstName || null,
    surname: user.surname || null,
    email: user.email,
    trust: user.trust,
    trustFullName: user.trustFullName,
    subscriptionStatus: user.subscriptionStatus,
    messagesRemaining: limitCheck.remaining,
    isPro: user.subscriptionStatus === "active",
});

  } catch (error) {
    console.error("User fetch error:", error);

    if (error.message.includes("Unauthorized")) {
      return res.status(401).json({ error: error.message });
    }

    return res.status(500).json({ error: error.message });
  }
});

/**
 * POST /createCheckoutSession
 * Create a Stripe checkout session for subscription
 */
exports.createCheckoutSession = onRequest(
  { 
    cors: true,
    secrets: ["STRIPE_SECRET_KEY"]
  }, 
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      // Initialize Stripe with secret
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2023-10-16",
      });

      const uid = await verifyAuth(req);
      const user = await getUser(uid);

      // Get or create Stripe customer
      let customerId = user.stripeCustomerId;

      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          metadata: { firebaseUID: uid },
        });
        customerId = customer.id;

        // Save customer ID to Firestore
        await db.collection("users").doc(uid).update({
          stripeCustomerId: customerId,
        });
      }

      // Create checkout session
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "gbp",
              product_data: {
                name: "Paramind Pro",
                description: "Unlimited messages, full scenario library, save conversations",
              },
              unit_amount: SUBSCRIPTION_PRICE,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${req.headers.origin}/chat.html?session_id={CHECKOUT_SESSION_ID}&success=true`,
        cancel_url: `${req.headers.origin}/chat.html?canceled=true`,
        metadata: {
          firebaseUID: uid,
        },
      });

      return res.status(200).json({ sessionId: session.id, url: session.url });

    } catch (error) {
      console.error("Checkout error:", error);
      return res.status(500).json({ error: error.message });
    }
  }
);

/**
 * POST /stripeWebhook
 * Handle Stripe webhook events
 */
exports.stripeWebhook = onRequest(
  { 
    cors: false,
    secrets: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"]
  }, 
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    });

    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const uid = session.metadata.firebaseUID;

        if (uid) {
          await db.collection("users").doc(uid).update({
            subscriptionStatus: "active",
            stripeSubscriptionId: session.subscription,
          });
          console.log(`Subscription activated for user: ${uid}`);
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        // Find user by Stripe customer ID
        const usersSnapshot = await db
          .collection("users")
          .where("stripeCustomerId", "==", customerId)
          .get();

        if (!usersSnapshot.empty) {
          const userDoc = usersSnapshot.docs[0];
          const status = subscription.status === "active" ? "active" : "cancelled";

          await userDoc.ref.update({
            subscriptionStatus: status,
          });
          console.log(`Subscription updated for user: ${userDoc.id}, status: ${status}`);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        // Find user by Stripe customer ID
        const usersSnapshot = await db
          .collection("users")
          .where("stripeCustomerId", "==", customerId)
          .get();

        if (!usersSnapshot.empty) {
          const userDoc = usersSnapshot.docs[0];

          await userDoc.ref.update({
            subscriptionStatus: "cancelled",
            stripeSubscriptionId: null,
          });
          console.log(`Subscription cancelled for user: ${userDoc.id}`);
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const customerId = invoice.customer;

        // Find user and notify them
        const usersSnapshot = await db
          .collection("users")
          .where("stripeCustomerId", "==", customerId)
          .get();

        if (!usersSnapshot.empty) {
          const userDoc = usersSnapshot.docs[0];
          console.log(`Payment failed for user: ${userDoc.id}`);
          // TODO: Send email notification
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  }
);

/**
 * POST /saveConversation
 * Save a conversation for paid users
 */
exports.saveConversation = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const uid = await verifyAuth(req);
    const user = await getUser(uid);

    // Only paid users can save conversations
    if (user.subscriptionStatus !== "active") {
      return res.status(403).json({
        error: "Pro subscription required",
        message: "Upgrade to Pro to save conversations",
      });
    }

    const { title, messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    // Create conversation document
    const conversationRef = await db
      .collection("users")
      .doc(uid)
      .collection("conversations")
      .add({
        title: title || `Conversation ${new Date().toLocaleDateString()}`,
        messages: messages,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    return res.status(200).json({
      success: true,
      conversationId: conversationRef.id,
    });

  } catch (error) {
    console.error("Save conversation error:", error);
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /conversations
 * List saved conversations for a user
 */
exports.conversations = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const uid = await verifyAuth(req);

    const conversationsSnapshot = await db
      .collection("users")
      .doc(uid)
      .collection("conversations")
      .orderBy("createdAt", "desc")
      .limit(50)
      .get();

    const conversations = conversationsSnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      createdAt: doc.data().createdAt?.toDate?.(),
      messageCount: doc.data().messages?.length || 0,
    }));

    return res.status(200).json({ conversations });

  } catch (error) {
    console.error("List conversations error:", error);
    return res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /deleteConversation
 * Delete a saved conversation
 */
exports.deleteConversation = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const uid = await verifyAuth(req);
    const conversationId = req.query.id;

    if (!conversationId) {
      return res.status(400).json({ error: "Conversation ID is required" });
    }

    await db
      .collection("users")
      .doc(uid)
      .collection("conversations")
      .doc(conversationId)
      .delete();

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Delete conversation error:", error);
    return res.status(500).json({ error: error.message });
  }
});