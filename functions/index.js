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
const fs = require("fs");
const os = require("os");
const path = require("path");

// Set global options - deploy to London region
setGlobalOptions({ region: "europe-west2" });

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Constants
const FREE_DAILY_MESSAGES = 20;
const SUBSCRIPTION_PRICE = 499; // £4.99 in pence (kept for reference)

// Stripe Price IDs
const PRICE_IDS = {
  monthly: 'price_1Sk64YCnRSLTR8bs2KeBB9Ud',
  annual: 'price_1T1Q3oCnRSLTR8bsHZFwqsDC',
};

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

      // Determine which plan the user selected (default to monthly)
      const plan = req.body.plan || 'monthly';
      const priceId = PRICE_IDS[plan] || PRICE_IDS.monthly;

      // Create checkout session with the selected price
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        allow_promotion_codes: plan === 'monthly',
        success_url: `${req.headers.origin}/landing.html?session_id={CHECKOUT_SESSION_ID}&success=true`,
        cancel_url: `${req.headers.origin}/landing.html?canceled=true`,
        metadata: {
          firebaseUID: uid,
          plan: plan,
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
        // Activate immediately - payment is already confirmed at this point
        const updateData = {
            stripeSubscriptionId: session.subscription,
            subscriptionStatus: "active",
        };

        // If there was a discount, store it AND retrieve the promo code name
if (session.total_details?.amount_discount > 0) {
    updateData.discountApplied = true;
    updateData.discountAmount = session.total_details.amount_discount;

    // Retrieve the checkout session with discount details expanded
    try {
        const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
            expand: ['total_details.breakdown'],
        });

        const discounts = fullSession.total_details?.breakdown?.discounts;
        if (discounts && discounts.length > 0) {
            const discount = discounts[0].discount;

            // Get the promotion code (the user-facing code like "PARAMIND50")
            if (discount.promotion_code) {
                const promoCode = await stripe.promotionCodes.retrieve(discount.promotion_code);
                updateData.promoCodeUsed = promoCode.code;  // e.g. "PARAMIND50"
            } else if (discount.coupon?.name) {
                // Fallback to coupon name if no promo code
                updateData.promoCodeUsed = discount.coupon.name;
            }
        }
        console.log(`Discount code used: ${updateData.promoCodeUsed || 'unknown'}`);
    } catch (promoError) {
        console.error('Error retrieving promo code details:', promoError.message);
        updateData.promoCodeUsed = 'discount-used';  // fallback so you know SOMETHING was used
    }
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


// ============================================
// LIVE SIM - VOICE SCENARIO FUNCTIONS
// ============================================

/**
 * POST /transcribe
 * Converts user's voice recording to text using OpenAI Whisper
 * Pro users only
 *
 * Expects JSON body: { audio: "base64-encoded-audio", mimeType: "audio/webm" }
 * Returns JSON: { text: "transcribed text" }
 */
exports.transcribe = onRequest(
  {
    cors: true,
    secrets: ["OPENAI_API_KEY"],
    timeoutSeconds: 60
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

      // Pro users only — Live Sim is a premium feature
      if (user.subscriptionStatus !== "active") {
        return res.status(403).json({
          error: "Pro subscription required",
          message: "Live Sim is a Pro feature. Upgrade to access voice scenarios.",
          upgrade: true
        });
      }

      // Get audio data from request body
      const { audio, mimeType } = req.body;

      if (!audio) {
        return res.status(400).json({ error: "Audio data is required" });
      }

      // Convert base64 audio to a buffer
      const audioBuffer = Buffer.from(audio, "base64");

      // Determine file extension from mime type
      let extension = "webm";
      if (mimeType) {
        if (mimeType.includes("wav")) extension = "wav";
        else if (mimeType.includes("mp4")) extension = "mp4";
        else if (mimeType.includes("ogg")) extension = "ogg";
        else if (mimeType.includes("mpeg") || mimeType.includes("mp3")) extension = "mp3";
      }

      // Write audio to a temporary file (Whisper needs a file, not raw bytes)
      const tempFilePath = path.join(os.tmpdir(), `voice-${uid}-${Date.now()}.${extension}`);
      fs.writeFileSync(tempFilePath, audioBuffer);

      try {
        // Send to OpenAI Whisper for transcription
        const transcription = await openai.audio.transcriptions.create({
          model: "whisper-1",
          file: fs.createReadStream(tempFilePath),
          language: "en",
        });

        console.log(`Transcribed ${audioBuffer.length} bytes for user ${uid}: "${transcription.text.substring(0, 50)}..."`);

        return res.status(200).json({
          text: transcription.text
        });

      } finally {
        // Always clean up the temporary file
        try { fs.unlinkSync(tempFilePath); } catch (e) { /* ignore cleanup errors */ }
      }

    } catch (error) {
      console.error("Transcribe error:", error);

      if (error.message.includes("Unauthorized")) {
        return res.status(401).json({ error: error.message });
      }

      return res.status(500).json({
        error: "Failed to transcribe audio",
        details: error.message
      });
    }
  }
);



/**
 * POST /speak
 */
/**
 * POST /speak
 * Converts AI text response to spoken audio using OpenAI TTS
 * Pro users only
 */
exports.speak = onRequest(
  { 
    cors: true,
    secrets: ["OPENAI_API_KEY"],
    timeoutSeconds: 60
  }, 
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const uid = await verifyAuth(req);
      const user = await getUser(uid);

      if (user.subscriptionStatus !== "active") {
        return res.status(403).json({
          error: "Pro subscription required",
          message: "Live Sim is a Pro feature.",
          upgrade: true
        });
      }

      const { segments } = req.body;

      if (!segments || !Array.isArray(segments) || segments.length === 0) {
        return res.status(400).json({ error: "Segments array is required" });
      }

      if (segments.length > 5) {
        return res.status(400).json({ error: "Maximum 5 segments per request" });
      }

   const audioPromises = segments.map(async (segment) => {
        const defaultInstructions = "Speak in a natural, conversational tone.";
        const instructions = segment.instructions || defaultInstructions;

        try {
          const response = await openai.audio.speech.create({
            model: "gpt-4o-mini-tts-2025-03-20",
            voice: segment.voice || "ballad",
            input: segment.text,
            instructions: instructions,
            response_format: "mp3"
          });

          const arrayBuffer = await response.arrayBuffer();
          const base64Audio = Buffer.from(arrayBuffer).toString("base64");

          return {
            character: segment.character || "PATIENT",
            audio: base64Audio,
            text: segment.text
          };
        } catch (segError) {
          console.error(`Audio failed for ${segment.character} (voice: ${segment.voice}): ${segError.message}`);
          return null;
        }
      });

      const audioResults = await Promise.all(audioPromises);
      const audioSegments = audioResults.filter(seg => seg !== null);

      console.log(`Generated ${audioSegments.length} audio segments for user ${uid}`);

      return res.status(200).json({ audioSegments });

    } catch (error) {
      console.error("Speak error:", error);

      if (error.message.includes("Unauthorized")) {
        return res.status(401).json({ error: error.message });
      }

      return res.status(500).json({ 
        error: "Failed to generate speech",
        details: error.message 
      });
    }
  }
);

/**
 * POST /verifyApplePurchase
 * Verify an Apple In-App Purchase and activate Pro subscription
 * Called by the iOS app after a successful StoreKit purchase
 */
exports.verifyApplePurchase = onRequest(
  { cors: true },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      // Authenticate the user
      const uid = await authenticateUser(req);
      
      const { productId, transactionId, receipt, jwsRepresentation, restored } = req.body;

      if (!productId) {
        return res.status(400).json({ error: "Missing productId" });
      }

      // Determine subscription plan from product ID
      let plan = 'monthly';
      if (productId.includes('annual') || productId.includes('yearly')) {
        plan = 'annual';
      }

      // Update user's subscription status in Firestore
      const updateData = {
        subscriptionStatus: "active",
        subscriptionPlatform: "apple",
        appleProductId: productId,
        appleTransactionId: transactionId || null,
        applePlan: plan,
        subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      if (restored) {
        updateData.appleRestoredAt = admin.firestore.FieldValue.serverTimestamp();
      }

      // Store receipt for future validation if needed
      if (receipt || jwsRepresentation) {
        updateData.appleReceipt = receipt || null;
        updateData.appleJws = jwsRepresentation || null;
      }

      await db.collection("users").doc(uid).update(updateData);

      console.log(`Apple purchase verified for user ${uid}: ${productId} (${plan})${restored ? ' [restored]' : ''}`);

      return res.status(200).json({ 
        success: true, 
        message: "Subscription activated",
        plan: plan
      });

    } catch (error) {
      console.error("Apple purchase verification error:", error);

      if (error.message.includes("Unauthorized") || error.message.includes("No authorization")) {
        return res.status(401).json({ error: error.message });
      }

      return res.status(500).json({ 
        error: "Failed to verify purchase",
        details: error.message 
      });
    }
  }
);

/**
 * POST /appleAuthToken
 * Exchange a native Apple Sign-In token for a Firebase custom token.
 * Used by Capacitor iOS app where Firebase web SDK can't verify native Apple tokens.
 */
exports.appleAuthToken = onRequest(
  { cors: true },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const { idToken, fullName } = req.body;

      if (!idToken) {
        return res.status(400).json({ error: "Missing idToken" });
      }

      // Decode the Apple JWT to extract user info (already verified by native SDK)
      const parts = idToken.split('.');
      if (parts.length !== 3) {
        return res.status(400).json({ error: "Invalid token format" });
      }

      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));

      // Validate basic claims
      if (payload.iss !== 'https://appleid.apple.com') {
        return res.status(400).json({ error: "Invalid token issuer" });
      }
      if (payload.aud !== 'uk.co.paramind.app') {
        return res.status(400).json({ error: "Invalid token audience" });
      }
      // Check token hasn't expired
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        return res.status(400).json({ error: "Token expired" });
      }

      const appleUserId = payload.sub;
      const email = payload.email || null;

      if (!appleUserId) {
        return res.status(400).json({ error: "Missing user identifier in token" });
      }

      // Find or create a Firebase Auth user for this Apple user
      let firebaseUser;

      // First, try to find by Apple provider
      try {
        const usersByProvider = await admin.auth().getUserByProviderUid('apple.com', appleUserId);
        firebaseUser = usersByProvider;
      } catch (e) {
        // Not found by provider — try by email
        if (email) {
          try {
            firebaseUser = await admin.auth().getUserByEmail(email);
          } catch (e2) {
            // Not found by email either
          }
        }
      }

      let isNew = false;
      if (!firebaseUser) {
        // Create new Firebase Auth user (no Firestore doc — register.html handles that)
        const createData = {
          displayName: fullName || (email ? email.split('@')[0] : 'Apple User'),
        };
        if (email) {
          createData.email = email;
          createData.emailVerified = true;
        }
        firebaseUser = await admin.auth().createUser(createData);
        isNew = true;
      }

      // Generate a Firebase custom token
      const customToken = await admin.auth().createCustomToken(firebaseUser.uid);

      console.log(`Apple auth: issued custom token for user ${firebaseUser.uid} (${email || appleUserId})${isNew ? ' [NEW]' : ''}`);

      return res.status(200).json({
        customToken: customToken,
        uid: firebaseUser.uid,
        isNewUser: isNew
      });

    } catch (error) {
      console.error("Apple auth error:", error);
      return res.status(500).json({
        error: "Authentication failed",
        details: error.message
      });
    }
  }
);



// ============================================
// RESEARCH PAPERS FINDER
// ============================================

/**
 * HTTPS helper — wraps Node's built-in https module in a Promise.
 * Used to call PubMed and Europe PMC APIs.
 */
const https = require("https");

function httpsGetText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, data }));
    }).on("error", reject);
  });
}

/**
 * Build the PubMed/Europe PMC search query with contextual and filter terms.
 */
function buildQuery(query, filters, engine) {
  // Add paramedic/pre-hospital context so results stay clinically relevant
  let q = `(${query}) AND (paramedic OR "pre-hospital" OR prehospital OR "emergency medical services" OR EMS OR ambulance OR "critical care paramedic")`;

  if (filters.englishOnly) {
    q += engine === "pubmed" ? " AND English[la]" : " AND LANG:eng";
  }

  if (filters.peerReviewed) {
    q += engine === "pubmed"
      ? " AND hasabstract[text] AND \"journal article\"[pt]"
      : " AND HAS_ABSTRACT:Y AND (SRC:MED OR SRC:PMC)";
  }

  if (filters.yearRange && filters.yearRange !== "all") {
    const startYear = new Date().getFullYear() - parseInt(filters.yearRange, 10);
    q += engine === "pubmed"
      ? ` AND ${startYear}:3000[pdat]`
      : ` AND FIRST_PDATE:[${startYear}-01-01 TO *]`;
  }

  return q;
}

/**
 * Search PubMed using NCBI E-utilities (free, no key required).
 * Returns up to 12 papers with titles, abstracts, journals, years, authors.
 */
async function searchPubMed(query, filters) {
  try {
    const q = buildQuery(query, filters, "pubmed");

    // Step 1: Get list of PMIDs
    const searchUrl =
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi` +
      `?db=pubmed&term=${encodeURIComponent(q)}&retmax=12&retmode=json` +
      `&tool=paramind&email=info@paramind.co.uk`;

    const searchRes = await httpsGetText(searchUrl);
    const searchData = JSON.parse(searchRes.data);
    const ids = searchData.esearchresult?.idlist || [];

    if (ids.length === 0) return [];

    // Step 2: Fetch XML (includes titles AND abstracts)
    const fetchUrl =
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi` +
      `?db=pubmed&id=${ids.join(",")}&rettype=xml&retmode=xml` +
      `&tool=paramind&email=info@paramind.co.uk`;

    const fetchRes = await httpsGetText(fetchUrl);
    return parsePubMedXML(fetchRes.data);
  } catch (err) {
    console.error("PubMed search error:", err.message);
    return [];
  }
}

/**
 * Parse PubMed XML response into normalised paper objects.
 * Uses simple regex rather than a full XML parser (no extra npm dependencies needed).
 */
function parsePubMedXML(xml) {
  const papers = [];
  const articleBlocks = xml.split("<PubmedArticle>").slice(1);

  articleBlocks.forEach((block) => {
    try {
      const pmid = getFirst(block, "PMID");
      if (!pmid) return;

      const title = cleanText(getFirst(block, "ArticleTitle") || "Untitled");
      const abstract = cleanText(getAll(block, "AbstractText").join(" "));

      // Journal: prefer ISO abbreviation, fall back to full title
      const journal = cleanText(
        getFirst(block, "ISOAbbreviation") ||
        getFirst(block, "MedlineTA") ||
        getFirst(block, "Title") ||
        "Unknown Journal"
      );

      // Year: try PubDate/Year first, then MedlineDate first 4 chars
      const year =
        getFirst(block, "Year") ||
        (getFirst(block, "MedlineDate") || "").substring(0, 4) ||
        "Unknown";

      // Authors: first 3 LastName + Initials
      const lastNames = getAll(block, "LastName").slice(0, 3);
      const initials = getAll(block, "Initials").slice(0, 3);
      const authors = lastNames.map((n, i) => `${n} ${initials[i] || ""}`.trim()).join(", ");

      papers.push({
        id: `pubmed_${pmid}`,
        source: "PubMed",
        title,
        abstract,
        authors: authors || "Unknown",
        journal,
        year,
        url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
      });
    } catch (e) {
      // Skip malformed articles silently
    }
  });

  return papers;
}

function getFirst(text, tag) {
  const m = text.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return m ? m[1].trim() : null;
}

function getAll(text, tag) {
  const regex = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "gi");
  const results = [];
  let m;
  while ((m = regex.exec(text)) !== null) {
    results.push(m[1].trim());
  }
  return results;
}

function cleanText(str) {
  if (!str) return "";
  // Strip any remaining XML tags and decode basic entities
  return str
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Search Europe PMC (free REST API, returns JSON with full abstracts).
 * Returns up to 12 papers.
 */
async function searchEuropePMC(query, filters) {
  try {
    const q = buildQuery(query, filters, "epmc");
    const searchUrl =
      `https://www.ebi.ac.uk/europepmc/webservices/rest/search` +
      `?query=${encodeURIComponent(q)}&format=json&resultType=core&pageSize=12&sort=RELEVANCE`;

    const res = await httpsGetText(searchUrl);
    const data = JSON.parse(res.data);
    const results = data.resultList?.result || [];

    return results.map((paper) => ({
      id: `epmc_${paper.id || paper.pmid || Math.random()}`,
      source: "Europe PMC",
      title: cleanText(paper.title || "Untitled"),
      abstract: cleanText(paper.abstractText || ""),
      authors: cleanText(paper.authorString || "Unknown"),
      journal: cleanText(paper.journalTitle || "Unknown Journal"),
      year: String(paper.pubYear || "Unknown"),
      url: paper.doi
        ? `https://doi.org/${paper.doi}`
        : paper.pmid
        ? `https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/`
        : "#",
    }));
  } catch (err) {
    console.error("Europe PMC search error:", err.message);
    return [];
  }
}

/**
 * Deduplicate papers from both sources by title similarity.
 * Keeps the version with the longer abstract.
 */
function deduplicatePapers(papers) {
  const seen = new Map();

  papers.forEach((paper) => {
    // Normalise title for comparison: lowercase, strip punctuation
    const normTitle = paper.title.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
    const key = normTitle.substring(0, 60); // first 60 chars as key

    if (!seen.has(key)) {
      seen.set(key, paper);
    } else {
      // Keep whichever has the longer abstract
      const existing = seen.get(key);
      if ((paper.abstract || "").length > (existing.abstract || "").length) {
        seen.set(key, paper);
      }
    }
  });

  return Array.from(seen.values());
}

/**
 * Send the papers to OpenAI for analysis.
 * Returns structured JSON: { summary, supporting, refuting, neutral }
 */
async function analyseWithAI(openai, query, papers, emphasis) {
  // Build a compact representation of each paper for the AI prompt
  const papersList = papers
    .map((p, i) => {
      const abstract = p.abstract
        ? `Abstract: ${p.abstract.substring(0, 400)}${p.abstract.length > 400 ? "…" : ""}`
        : "Abstract: Not available";
      return `[${i + 1}] ID: ${p.id}\nTitle: ${p.title}\nJournal: ${p.journal} (${p.year})\n${abstract}`;
    })
    .join("\n\n---\n\n");

  // Emphasis instruction for the AI
  const emphasisInstruction =
    emphasis === "support"
      ? "The user wants to find evidence that SUPPORTS this topic. Be thorough in identifying supporting papers."
      : emphasis === "refute"
      ? "The user wants to find evidence that CHALLENGES or REFUTES this topic. Be thorough in identifying challenging papers."
      : "Provide a balanced analysis of both supporting and refuting evidence.";

  const prompt = `You are a research analyst specialising in UK paramedic and pre-hospital emergency medicine.

A paramedic has searched for evidence on the following topic: "${query}"

${emphasisInstruction}

Below are ${papers.length} research papers retrieved from PubMed and Europe PMC. Analyse them and respond ONLY with a valid JSON object in the exact format specified. Do not include markdown code fences or any text outside the JSON.

PAPERS:
${papersList}

REQUIRED JSON FORMAT:
{
  "summary": "2-4 sentence plain English overview of what the evidence landscape shows for this topic. Mention the overall weight of evidence and any notable gaps or conflicts.",
  "papers": [
    {
      "id": "the paper's ID exactly as given above",
      "stance": "supporting OR refuting OR neutral",
      "note": "1-2 sentences explaining WHY this paper supports, refutes, or is neutral regarding the topic. Reference the specific finding."
    }
  ]
}

Rules:
- Every paper must appear in the papers array with its exact id.
- stance must be exactly one of: supporting, refuting, neutral
- If the abstract is missing or too short to determine stance, classify as neutral.
- Focus on pre-hospital / paramedic relevance in your analysis.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 2000,
    temperature: 0.3,
    response_format: { type: "json_object" },
  });

  // Parse the AI response
  let aiData;
  try {
    aiData = JSON.parse(response.choices[0].message.content);
  } catch (e) {
    throw new Error("AI returned invalid JSON. Please try again.");
  }

  // Build lookup map: paper ID → paper object
  const paperMap = {};
  papers.forEach((p) => (paperMap[p.id] = p));

  // Merge AI analysis with paper data
  const supporting = [];
  const refuting = [];
  const neutral = [];

  (aiData.papers || []).forEach((aiPaper) => {
    const paper = paperMap[aiPaper.id];
    if (!paper) return;

    const enriched = {
      ...paper,
      note: aiPaper.note || "",
      stance: aiPaper.stance || "neutral",
    };

    if (aiPaper.stance === "supporting") supporting.push(enriched);
    else if (aiPaper.stance === "refuting") refuting.push(enriched);
    else neutral.push(enriched);
  });

  return {
    summary: aiData.summary || "Analysis complete.",
    supporting,
    refuting,
    neutral,
    totalFound: papers.length,
  };
}

/**
 * POST /researchPapers
 * Searches PubMed and Europe PMC for evidence on a paramedic topic,
 * then uses AI to categorise papers as supporting or refuting.
 * Pro users only.
 */
exports.researchPapers = onRequest(
  {
    cors: true,
    secrets: ["OPENAI_API_KEY"],
    timeoutSeconds: 120, // Longer timeout — multiple external API calls + AI analysis
  },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      // Verify authentication
      const uid = await verifyAuth(req);
      const user = await getUser(uid);

      // Pro users only
      if (user.subscriptionStatus !== "active") {
        return res.status(403).json({
          error: "Pro subscription required",
          message: "Research Papers Finder is a Pro feature. Upgrade to access real-time evidence search.",
          upgrade: true,
        });
      }

      const {
        query,
        peerReviewed = true,
        englishOnly = true,
        yearRange = "all",
        emphasis = "balanced",
      } = req.body;

      // Validate query
      if (!query || typeof query !== "string" || query.trim().length < 3) {
        return res.status(400).json({ error: "Search query must be at least 3 characters." });
      }

      if (query.trim().length > 200) {
        return res.status(400).json({ error: "Search query must be under 200 characters." });
      }

      const filters = { peerReviewed, englishOnly, yearRange };

      console.log(`Research search by ${uid}: "${query.trim()}" (yearRange=${yearRange}, peerReviewed=${peerReviewed})`);

      // Search both databases in parallel
      const [pubmedResults, epmcResults] = await Promise.allSettled([
        searchPubMed(query.trim(), filters),
        searchEuropePMC(query.trim(), filters),
      ]);

      let allPapers = [];
      if (pubmedResults.status === "fulfilled") allPapers = [...allPapers, ...pubmedResults.value];
      if (epmcResults.status === "fulfilled") allPapers = [...allPapers, ...epmcResults.value];

      // Deduplicate and limit to 20 papers
      allPapers = deduplicatePapers(allPapers).slice(0, 20);

      console.log(`Found ${allPapers.length} unique papers after deduplication.`);

      // If no papers found, return early with a helpful message
      if (allPapers.length === 0) {
        return res.status(200).json({
          summary:
            "No research papers were found for this search. Try broader search terms, removing filters, or using different keywords. For example, try 'cardiac arrest airway management' instead of a very specific phrasing.",
          supporting: [],
          refuting: [],
          neutral: [],
          totalFound: 0,
        });
      }

      // Run AI analysis
      const analysis = await analyseWithAI(openai, query.trim(), allPapers, emphasis);

      return res.status(200).json(analysis);

    } catch (error) {
      console.error("Research papers error:", error);

      if (error.message.includes("Unauthorized")) {
        return res.status(401).json({ error: error.message });
      }

      return res.status(500).json({
        error: "Failed to fetch research papers. Please try again.",
        details: error.message,
      });
    }
  }
);