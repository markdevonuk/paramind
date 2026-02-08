/**
 * PARAMIND - Cloud Functions
 * Backend API for the Paramind paramedic learning platform
 * WITH CPD PORTFOLIO FEATURE, DISCOUNT CODES, AND STREAMING RESPONSES
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
- Help users understand clinical presentations, red flags, and assessment approaches
- Discuss pathophysiology, anatomy, and clinical reasoning
- Support learning about patient assessment and history taking

CRITICAL RULE - NO TREATMENT ADVICE:
- You must NEVER provide treatment advice, drug doses, or management plans
- You must NEVER quote or paraphrase JRCalc guidelines
- When users ask about treatment or management, you MUST respond with: "For treatment and management guidance, please open your JRCalc app and refer to the relevant guideline."
- This applies to ALL treatment questions including medications, doses, interventions, and clinical pathways
- You may discuss what assessments to perform, but NOT what treatments to give

IMPORTANT RULES:
- You must NOT refer to other ambulance service trust guidelines
- You must NOT provide any drug doses or medication advice
- This ensures accuracy and protects clinicians from acting outside their scope
- Always remind users this is for educational purposes only
- Encourage users to verify information against official sources using their JRCalc app
- In real emergencies, advise following trust protocols and seeking senior clinical advice

Be friendly, professional, and thorough in your explanations. Use UK medical terminology and spelling. Format responses clearly with bullet points where appropriate.`;
}

// ============================================
// CLOUD FUNCTIONS
// ============================================

/**
 * POST /chat
 * Handle chat messages - WITH STREAMING RESPONSE
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
      const validHistory = conversationHistory
        .slice(-10)
        .filter(msg => msg && msg.content && msg.role !== 'system');

      const messages = [
        { role: "system", content: systemPrompt },
        ...validHistory,
        { role: "user", content: message },
      ];

      // Set headers for streaming (Server-Sent Events)
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      // Send the remaining message count first
      const remaining = user.subscriptionStatus === "active" ? -1 : limitCheck.remaining - 1;
      res.write(`data: ${JSON.stringify({ type: 'meta', remaining: remaining })}\n\n`);

      // Call OpenAI API with streaming enabled
      const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
        stream: true,
      });

      // Stream each chunk to the client
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          res.write(`data: ${JSON.stringify({ type: 'chunk', content: content })}\n\n`);
        }
      }

      // Send completion signal
      res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
      res.end();

      // Increment message count for free users (after successful response)
      if (user.subscriptionStatus !== "active") {
        await incrementMessageCount(uid);
      }

    } catch (error) {
      console.error("Chat error:", error);

      if (!res.headersSent) {
        if (error.message.includes("Unauthorized")) {
          return res.status(401).json({ error: error.message });
        }
        return res.status(500).json({
          error: "An error occurred processing your message",
          details: error.message,
        });
      } else {
        res.write(`data: ${JSON.stringify({ type: 'error', error: error.message })}\n\n`);
        res.end();
      }
    }
  }
);

/**
 * GET /user
 * Get the current user's profile and update last login time
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

    // Update last login time (runs in background, doesn't slow down response)
    db.collection("users").doc(uid).update({
      lastLogin: new Date().toISOString()
    }).catch(err => console.warn("Could not update lastLogin:", err));

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
 * NOW SUPPORTS DISCOUNT CODES!
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

      // Create checkout session with promotion codes enabled
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
        allow_promotion_codes: true,
        success_url: `${req.headers.origin}/landing.html?session_id={CHECKOUT_SESSION_ID}&success=true`,
        cancel_url: `${req.headers.origin}/landing.html?canceled=true`,
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
        // Check what the user's current status is BEFORE updating
        const userRef = db.collection("users").doc(uid);
        const userSnap = await userRef.get();
        const currentStatus = userSnap.exists ? userSnap.data().subscriptionStatus : null;

        // Only set to "pending" if NOT already "active"
        // This prevents overwriting "active" if invoice.paid arrived first
        const updateData = {
            stripeSubscriptionId: session.subscription,
        };

        if (currentStatus !== "active") {
            updateData.subscriptionStatus = "pending";
        }

        // If there was a discount, store it for reference
        if (session.total_details?.amount_discount > 0) {
            updateData.discountApplied = true;
            updateData.discountAmount = session.total_details.amount_discount;
        }

        await userRef.update(updateData);
        console.log(`Checkout completed for user: ${uid} - current status: ${currentStatus}`);
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
    
    // Keep user active if subscription is still active (even if they've cancelled)
    // They keep access until the billing period ends
    const isStillActive = subscription.status === "active";
    
    const updateData = {
      subscriptionStatus: isStillActive ? "active" : "cancelled",
    };
    
    // Track if they've cancelled (so we can show them when access expires)
    if (subscription.cancel_at_period_end) {
      updateData.cancelledAt = admin.firestore.FieldValue.serverTimestamp();
      updateData.accessExpiresAt = new Date(subscription.current_period_end * 1000);
    } else {
      // They might have re-subscribed or un-cancelled
      updateData.cancelledAt = null;
      updateData.accessExpiresAt = null;
    }

    await userDoc.ref.update(updateData);
    
    if (subscription.cancel_at_period_end) {
      console.log(`User ${userDoc.id} cancelled - access continues until ${new Date(subscription.current_period_end * 1000).toISOString()}`);
    } else {
      console.log(`Subscription updated for user: ${userDoc.id}, status: ${updateData.subscriptionStatus}`);
    }
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
      
case "invoice.paid": {
        const invoice = event.data.object;
        const customerId = invoice.customer;

        console.log(`Processing invoice.paid for Stripe customer: ${customerId}`);

        // First, try to find user by Stripe customer ID
        let usersSnapshot = await db
          .collection("users")
          .where("stripeCustomerId", "==", customerId)
          .get();

        let userDoc = null;

        if (!usersSnapshot.empty) {
          userDoc = usersSnapshot.docs[0];
          console.log(`Found user by stripeCustomerId: ${userDoc.id}`);
        } else {
          // FALLBACK: Get Firebase UID from Stripe customer metadata
          console.log(`User not found by stripeCustomerId, trying fallback...`);
          
          try {
            const customer = await stripe.customers.retrieve(customerId);
            const firebaseUID = customer.metadata?.firebaseUID;
            
            if (firebaseUID) {
              console.log(`Found firebaseUID in Stripe metadata: ${firebaseUID}`);
              
              // Look up user directly by Firebase UID
              const userRef = db.collection("users").doc(firebaseUID);
              const userSnap = await userRef.get();
              
              if (userSnap.exists) {
                userDoc = userSnap;
                
                // Also save the stripeCustomerId for future lookups
                await userRef.update({
                  stripeCustomerId: customerId,
                });
                console.log(`Linked stripeCustomerId to user: ${firebaseUID}`);
              } else {
                console.error(`User document not found for firebaseUID: ${firebaseUID}`);
              }
            } else {
              console.error(`No firebaseUID in Stripe customer metadata for: ${customerId}`);
            }
          } catch (stripeError) {
            console.error(`Error retrieving Stripe customer: ${stripeError.message}`);
          }
        }

        // Activate subscription if we found the user
        if (userDoc) {
          await (userDoc.ref || db.collection("users").doc(userDoc.id)).update({
            subscriptionStatus: "active",
          });
          console.log(`Payment confirmed - subscription activated for user: ${userDoc.id}`);
        } else {
          console.error(`CRITICAL: Could not find user for Stripe customer: ${customerId}. User is stuck on pending!`);
        }
        break;
      }

   case "invoice.payment_failed": {
  const invoice = event.data.object;
  const customerId = invoice.customer;

  // Find user and mark subscription as failed
  const usersSnapshot = await db
    .collection("users")
    .where("stripeCustomerId", "==", customerId)
    .get();

  if (!usersSnapshot.empty) {
    const userDoc = usersSnapshot.docs[0];

    await userDoc.ref.update({
      subscriptionStatus: "payment_failed",
    });
    console.log(`Payment failed for user: ${userDoc.id}`);
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

// ============================================
// CPD PORTFOLIO FUNCTIONS
// ============================================

/**
 * POST /saveCpdRecord
 * Save a CPD record for a completed scenario
 */
exports.saveCpdRecord = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const uid = await verifyAuth(req);
    const user = await getUser(uid);

    // Only paid users can save CPD records
    if (user.subscriptionStatus !== "active") {
      return res.status(403).json({
        error: "Pro subscription required",
        message: "Upgrade to Pro to save CPD records",
      });
    }

    const {
      scenarioId,
      scenarioCode,
      scenarioType,
      scenarioCategory,
      patientName,
      chiefComplaint,
      correctDiagnosis,
      userImpression,
      result,
      questionsAsked,
      assessmentsPerformed
    } = req.body;

    // Validate required fields
    if (!scenarioId || !userImpression || !result) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate result value
    const validResults = ['correct', 'partially_correct', 'incorrect'];
    if (!validResults.includes(result)) {
      return res.status(400).json({ error: "Invalid result value" });
    }

    // Create CPD record document
    const cpdRecordRef = await db
      .collection("users")
      .doc(uid)
      .collection("cpdRecords")
      .add({
        scenarioId,
        scenarioCode: scenarioCode || 'N/A',
        scenarioType: scenarioType || 'Unknown',
        scenarioCategory: scenarioCategory || 'unknown',
        patientName: patientName || 'Unknown',
        chiefComplaint: chiefComplaint || 'N/A',
        correctDiagnosis: correctDiagnosis || 'N/A',
        userImpression,
        result,
        questionsAsked: questionsAsked || 0,
        assessmentsPerformed: assessmentsPerformed || 0,
        completedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    return res.status(200).json({
      success: true,
      recordId: cpdRecordRef.id,
    });

  } catch (error) {
    console.error("Save CPD record error:", error);

    if (error.message.includes("Unauthorized")) {
      return res.status(401).json({ error: error.message });
    }

    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /getCpdRecords
 * Get all CPD records for a user
 */
exports.getCpdRecords = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const uid = await verifyAuth(req);

    const cpdRecordsSnapshot = await db
      .collection("users")
      .doc(uid)
      .collection("cpdRecords")
      .orderBy("completedAt", "desc")
      .limit(100)
      .get();

    const records = cpdRecordsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({ records });

  } catch (error) {
    console.error("Get CPD records error:", error);

    if (error.message.includes("Unauthorized")) {
      return res.status(401).json({ error: error.message });
    }

    return res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /deleteCpdRecord
 * Delete a CPD record
 */
exports.deleteCpdRecord = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const uid = await verifyAuth(req);
    const recordId = req.query.id;

    if (!recordId) {
      return res.status(400).json({ error: "Record ID is required" });
    }

    // Verify the record belongs to the user
    const recordRef = db
      .collection("users")
      .doc(uid)
      .collection("cpdRecords")
      .doc(recordId);

    const recordDoc = await recordRef.get();
    
    if (!recordDoc.exists) {
      return res.status(404).json({ error: "Record not found" });
    }

    await recordRef.delete();

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Delete CPD record error:", error);

    if (error.message.includes("Unauthorized")) {
      return res.status(401).json({ error: error.message });
    }

    return res.status(500).json({ error: error.message });
  }
});