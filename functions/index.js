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
const nodemailer = require("nodemailer");

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
        console.log(`Checkout completed for user: ${uid}`);
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
  { cors: true, secrets: ["GMAIL_APP_PASSWORD"] },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      // Authenticate the user
      const uid = await verifyAuth(req);
      
      const { productId, transactionId, receipt, jwsRepresentation, restored } = req.body;

      if (!productId) {
        return res.status(400).json({ error: "Missing productId" });
      }

      // Determine subscription plan from product ID
      let plan = 'monthly';
      if (productId.includes('annual') || productId.includes('yearly')) {
        plan = 'annual';
      }

      // Extract originalTransactionId from JWS if present
      // This is the permanent ID for the subscription lifetime, used for server notifications
      let originalTransactionId = null;
      if (jwsRepresentation) {
        try {
          const jwsParts = jwsRepresentation.split('.');
          if (jwsParts.length === 3) {
            const jwsPayload = JSON.parse(Buffer.from(jwsParts[1], 'base64').toString('utf8'));
            originalTransactionId = jwsPayload.originalTransactionId || jwsPayload.transactionId || null;
          }
        } catch (jwsErr) {
          console.warn('Could not decode JWS to extract originalTransactionId:', jwsErr.message);
        }
      }
      // Fall back to transactionId if JWS not available (they are identical on first purchase)
      if (!originalTransactionId) {
        originalTransactionId = transactionId || null;
      }

      // Update user's subscription status in Firestore
      const updateData = {
        subscriptionStatus: "active",
        subscriptionPlatform: "apple",
        appleProductId: productId,
        appleTransactionId: transactionId || null,
        appleOriginalTransactionId: originalTransactionId,
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

      // Send notification email for new purchases (not restores)
      if (!restored) {
        const userDoc = await db.collection('users').doc(uid).get();
        const userEmail = userDoc.exists ? (userDoc.data().email || 'unknown') : 'unknown';
        await sendNotificationEmail(
          'New Apple Subscription — ParaMind',
          `A new Apple subscription has started.

User: ${userEmail}
Product: ${productId}
Plan: ${plan}
Transaction ID: ${originalTransactionId || transactionId || 'unknown'}`
        );
      }

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
 * POST /verifyGooglePurchase
 * Verify a Google Play purchase and activate subscription.
 * Called by the Android app after a successful purchase.
 */
exports.verifyGooglePurchase = onRequest(
  {
    cors: true
  },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const uid = await verifyAuth(req);
      const { productId, purchaseToken, transactionId, restored } = req.body;

      if (!productId) {
        return res.status(400).json({ error: "Missing productId" });
      }

      console.log(`Google Play purchase verification for user ${uid}: ${productId}`);

      let plan = 'monthly';
      if (productId.includes('annual') || productId.includes('yearly')) {
        plan = 'annual';
      }

      const updateData = {
        subscriptionStatus: "active",
        subscriptionPlatform: "google",
        googleProductId: productId,
        googleTransactionId: transactionId || null,
        googlePurchaseToken: purchaseToken || null,
        googlePlan: plan,
        subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      if (restored) {
        updateData.googleRestoredAt = admin.firestore.FieldValue.serverTimestamp();
      }

      await db.collection("users").doc(uid).update(updateData);

      console.log(`Google Play purchase verified for user ${uid}: ${productId} (${plan})${restored ? ' [restored]' : ''}`);

      return res.status(200).json({
        success: true,
        message: "Subscription activated",
        plan: plan
      });

    } catch (error) {
      console.error("Google Play purchase verification error:", error);

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
  { cors: true, minInstances: 1 },
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

// ============================================
// STEP 1 — AI QUERY EXPANSION
// ============================================

/**
 * Send the user's raw query to OpenAI to expand it into medical synonyms,
 * abbreviations, UK/US drug name variants, and related clinical terms.
 * This runs BEFORE the database searches and dramatically improves recall.
 */
async function expandQuery(openai, query) {
  const prompt = `You are a medical search specialist with expertise in UK paramedic and pre-hospital emergency medicine.

A paramedic has typed this search query: "${query}"

Your job is to expand it into a comprehensive list of search terms that will find relevant research papers in PubMed and Europe PMC databases.

Consider ALL of the following:
- UK vs US drug names (e.g. adrenaline = epinephrine, paracetamol = acetaminophen, lignocaine = lidocaine, morphine = morphine sulfate)
- Medical synonyms (e.g. heart attack = myocardial infarction = MI = STEMI = ACS = acute coronary syndrome)
- Pre-hospital abbreviations (OHCA, ROSC, RSI, TBI, GCS, MAP, CPR, AED, VF, VT, PEA, ASYSTOLE)
- Spelling variants (pre-hospital = prehospital, out-of-hospital = out of hospital)
- Related clinical concepts that would appear in relevant research papers
- Both lay and clinical terminology

Return ONLY a valid JSON object in this exact format with no markdown fences:
{
  "coreTerms": ["most important term 1", "most important term 2"],
  "expandedTerms": ["synonym1", "abbreviation1", "variant1", "related term1"]
}

Rules:
- coreTerms: 2-4 terms that best represent the core clinical concept
- expandedTerms: up to 10 additional synonyms, abbreviations, and variants
- All terms should be lowercase
- Do not include terms so broad they would return irrelevant results (e.g. do not add "patient" or "treatment")`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
      temperature: 0.1,
      response_format: { type: "json_object" },
    });

    const data = JSON.parse(response.choices[0].message.content);
    const coreTerms = (data.coreTerms || []).slice(0, 4);
    const expandedTerms = (data.expandedTerms || []).slice(0, 10);

    console.log(`Query expanded: "${query}" → core: [${coreTerms.join(", ")}] + expanded: [${expandedTerms.join(", ")}]`);

    return {
      coreTerms,
      expandedTerms,
      allTerms: [...coreTerms, ...expandedTerms],
    };
  } catch (err) {
    console.error("Query expansion error:", err.message);
    // Fall back to using the raw query if expansion fails
    return {
      coreTerms: [query],
      expandedTerms: [],
      allTerms: [query],
    };
  }
}

// ============================================
// RESEARCH PAPERS FINDER
// ============================================

/**
 * HTTPS helper — wraps Node's built-in https module in a Promise.
 * Used to call PubMed and Europe PMC APIs.
 */
function httpsGetText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, data }));
    }).on("error", reject);
  });
}

// ============================================
// STEP 1 — AI QUERY EXPANSION
// ============================================

/**
 * Send the user's raw query to OpenAI to expand it into medical synonyms,
 * abbreviations, UK/US drug name variants, and related clinical terms.
 * This runs BEFORE the database searches and dramatically improves recall.
 */
async function expandQuery(openai, query) {
  const prompt = `You are a medical search specialist with expertise in UK paramedic and pre-hospital emergency medicine.

A paramedic has typed this search query: "${query}"

Your job is to expand it into a comprehensive list of search terms that will find relevant research papers in PubMed and Europe PMC databases.

Consider ALL of the following:
- UK vs US drug names (e.g. adrenaline = epinephrine, paracetamol = acetaminophen, lignocaine = lidocaine, morphine = morphine sulfate)
- Medical synonyms (e.g. heart attack = myocardial infarction = MI = STEMI = ACS = acute coronary syndrome)
- Pre-hospital abbreviations (OHCA, ROSC, RSI, TBI, GCS, MAP, CPR, AED, VF, VT, PEA, ASYSTOLE)
- Spelling variants (pre-hospital = prehospital, out-of-hospital = out of hospital)
- Related clinical concepts that would appear in relevant research papers
- Both lay and clinical terminology

Return ONLY a valid JSON object in this exact format with no markdown fences:
{
  "coreTerms": ["most important term 1", "most important term 2"],
  "expandedTerms": ["synonym1", "abbreviation1", "variant1", "related term1"]
}

Rules:
- coreTerms: 2-4 terms that best represent the core clinical concept
- expandedTerms: up to 10 additional synonyms, abbreviations, and variants
- All terms should be lowercase
- Do not include terms so broad they would return irrelevant results (e.g. do not add "patient" or "treatment")`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
      temperature: 0.1,
      response_format: { type: "json_object" },
    });

    const data = JSON.parse(response.choices[0].message.content);
    const coreTerms = (data.coreTerms || []).slice(0, 4);
    const expandedTerms = (data.expandedTerms || []).slice(0, 10);

    console.log(`Query expanded: "${query}" → core: [${coreTerms.join(", ")}] + expanded: [${expandedTerms.join(", ")}]`);

    return {
      coreTerms,
      expandedTerms,
      allTerms: [...coreTerms, ...expandedTerms],
    };
  } catch (err) {
    console.error("Query expansion error:", err.message);
    // Fall back to using the raw query if expansion fails
    return {
      coreTerms: [query],
      expandedTerms: [],
      allTerms: [query],
    };
  }
}

// ============================================
// STEP 2 — DATABASE SEARCHES
// ============================================

/**
 * Build a PubMed (NCBI E-utilities) search query from expanded terms.
 * NO mandatory context filter — we do not require papers to mention "paramedic"
 * or "prehospital". Many highly relevant trials (e.g. PARAMEDIC2, ARREST)
 * are published in hospital/ICU journals and never use those words.
 * The AI classifier handles relevance filtering after retrieval.
 */
function buildPubMedQuery(queryExpansion, filters) {
  // Build OR group from all expanded terms using [tiab] (title/abstract field)
  const termGroup = queryExpansion.allTerms
    .map((t) => `"${t}"[tiab]`)
    .join(" OR ");

  let q = `(${termGroup})`;

  if (filters.englishOnly) q += " AND English[la]";

  if (filters.peerReviewed) {
    q += ' AND hasabstract[text] AND "journal article"[pt]';
  }

  if (filters.yearRange && filters.yearRange !== "all") {
    const startYear = new Date().getFullYear() - parseInt(filters.yearRange, 10);
    q += ` AND ${startYear}:3000[pdat]`;
  }

  return q;
}

/**
 * Build a Europe PMC query from expanded terms.
 * Uses simple term OR syntax — Europe PMC default search already covers
 * title and abstract, so explicit TITLE/ABSTRACT field tags are unnecessary
 * and make the query so long it triggers a 400 error.
 * We limit to 6 terms max to keep the URL short.
 */
function buildEuropePMCQuery(queryExpansion, filters) {
  // Use core terms first, then fill up to 6 total from expanded terms
  const terms = [
    ...queryExpansion.coreTerms,
    ...queryExpansion.expandedTerms,
  ].slice(0, 6);

  // Simple quoted phrase OR — Europe PMC default field searches title + abstract
  const termGroup = terms.map((t) => `"${t}"`).join(" OR ");

  let q = `(${termGroup})`;

  if (filters.englishOnly) q += " AND LANG:eng";

  if (filters.peerReviewed) {
    // HAS_ABSTRACT filters to articles with abstracts; SRC:MED = MEDLINE indexed
    q += " AND HAS_ABSTRACT:Y AND (SRC:MED OR SRC:PMC OR SRC:PPR)";
  }

  if (filters.yearRange && filters.yearRange !== "all") {
    const startYear = new Date().getFullYear() - parseInt(filters.yearRange, 10);
    q += ` AND FIRST_PDATE:[${startYear}-01-01 TO *]`;
  }

  return q;
}

/**
 * Search PubMed using NCBI E-utilities (free, no API key required).
 * Returns up to 12 papers with titles, abstracts, journals, years, authors.
 */
async function searchPubMed(queryExpansion, filters) {
  try {
    const q = buildPubMedQuery(queryExpansion, filters);

    // Step 1: Get list of PMIDs
    const searchUrl =
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi` +
      `?db=pubmed&term=${encodeURIComponent(q)}&retmax=12&retmode=json&sort=relevance` +
      `&tool=paramind&email=info@paramind.co.uk`;

    const searchRes = await httpsGetText(searchUrl);
    const searchData = JSON.parse(searchRes.data);
    const ids = searchData.esearchresult?.idlist || [];

    console.log(`PubMed returned ${ids.length} IDs`);

    if (ids.length === 0) return [];

    // Step 2: Fetch full XML (titles + abstracts)
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

      const journal = cleanText(
        getFirst(block, "ISOAbbreviation") ||
        getFirst(block, "MedlineTA") ||
        getFirst(block, "Title") ||
        "Unknown Journal"
      );

      const year =
        getFirst(block, "Year") ||
        (getFirst(block, "MedlineDate") || "").substring(0, 4) ||
        "Unknown";

      const lastNames = getAll(block, "LastName").slice(0, 3);
      const initials = getAll(block, "Initials").slice(0, 3);
      const authors = lastNames
        .map((n, i) => `${n} ${initials[i] || ""}`.trim())
        .join(", ");

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

/**
 * Search Europe PMC (free REST API, returns JSON with abstracts).
 * Returns up to 12 papers.
 */
async function searchEuropePMC(queryExpansion, filters) {
  try {
    const q = buildEuropePMCQuery(queryExpansion, filters);

    const searchUrl =
      `https://www.ebi.ac.uk/europepmc/webservices/rest/search` +
      `?query=${encodeURIComponent(q)}&format=json&resultType=core&pageSize=12&sort=RELEVANCE`;

    console.log(`Europe PMC query: ${q.substring(0, 150)}...`);

    const res = await httpsGetText(searchUrl);

    // Europe PMC sometimes returns non-200 with an error body — handle gracefully
    if (res.status !== 200) {
      console.error(`Europe PMC returned status ${res.status}`);
      return [];
    }

    const data = JSON.parse(res.data);
    const results = data.resultList?.result || [];

    console.log(`Europe PMC returned ${results.length} results`);

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

// ============================================
// SHARED HELPERS
// ============================================

function getFirst(text, tag) {
  const m = text.match(
    new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i")
  );
  return m ? m[1].trim() : null;
}

function getAll(text, tag) {
  const regex = new RegExp(
    `<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`,
    "gi"
  );
  const results = [];
  let m;
  while ((m = regex.exec(text)) !== null) {
    results.push(m[1].trim());
  }
  return results;
}

function cleanText(str) {
  if (!str) return "";
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
 * Deduplicate papers from both sources by title similarity.
 * Keeps the version with the longer abstract.
 */
function deduplicatePapers(papers) {
  const seen = new Map();

  papers.forEach((paper) => {
    const normTitle = paper.title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .trim();
    const key = normTitle.substring(0, 60);

    if (!seen.has(key)) {
      seen.set(key, paper);
    } else {
      const existing = seen.get(key);
      if ((paper.abstract || "").length > (existing.abstract || "").length) {
        seen.set(key, paper);
      }
    }
  });

  return Array.from(seen.values());
}

// ============================================
// STEP 3 — AI ANALYSIS
// ============================================

/**
 * Send the retrieved papers to OpenAI to categorise them as
 * supporting / refuting / neutral / irrelevant.
 */
async function analyseWithAI(openai, query, papers, emphasis) {
  const papersList = papers
    .map((p, i) => {
      const abstract = p.abstract
        ? `Abstract: ${p.abstract.substring(0, 400)}${p.abstract.length > 400 ? "…" : ""}`
        : "Abstract: Not available";
      return `[${i + 1}] ID: ${p.id}\nTitle: ${p.title}\nJournal: ${p.journal} (${p.year})\n${abstract}`;
    })
    .join("\n\n---\n\n");

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
  "summary": "2-4 sentence plain English overview of what the evidence landscape shows for this topic. Mention the overall weight of evidence and any notable gaps or conflicts. Only reference papers that are genuinely relevant.",
  "papers": [
    {
      "id": "the paper's ID exactly as given above",
      "stance": "supporting OR refuting OR neutral OR irrelevant",
      "note": "1-2 sentences explaining WHY this paper supports, refutes, or is neutral regarding the topic. Leave empty string if irrelevant."
    }
  ]
}

STANCE DEFINITIONS — apply these strictly:
- "supporting": The paper's findings clearly support or validate the search topic in a pre-hospital or clinically relevant context.
- "refuting": The paper's findings challenge, contradict, or raise concerns about the search topic.
- "neutral": The paper is genuinely relevant to the topic but its findings are inconclusive, mixed, or it is a background/review paper that does not take a clear position.
- "irrelevant": The paper does not meaningfully address the search topic. Use this for papers where the title/abstract match was superficial or coincidental. Do NOT use "neutral" as a catch-all — if a paper is not relevant, it must be "irrelevant".

Every paper in the list must appear in the papers array. Papers classified as "irrelevant" will be silently excluded from the results shown to the user.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 2000,
    temperature: 0.3,
    response_format: { type: "json_object" },
  });

  let aiData;
  try {
    aiData = JSON.parse(response.choices[0].message.content);
  } catch (e) {
    throw new Error("AI returned invalid JSON. Please try again.");
  }

  const paperMap = {};
  papers.forEach((p) => (paperMap[p.id] = p));

  const supporting = [];
  const refuting = [];
  const neutral = [];

  (aiData.papers || []).forEach((aiPaper) => {
    const paper = paperMap[aiPaper.id];
    if (!paper) return;

    if (aiPaper.stance === "irrelevant") return;

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

// ============================================
// MAIN ENDPOINT
// ============================================

/**
 * POST /researchPapers
 * 1. AI expands the user's query into medical synonyms and variants
 * 2. Searches PubMed and Europe PMC in parallel using expanded terms
 * 3. Deduplicates results
 * 4. AI analyses and categorises papers as supporting / refuting / neutral
 * Pro users only.
 */
exports.researchPapers = onRequest(
  {
    cors: true,
    secrets: ["OPENAI_API_KEY"],
    timeoutSeconds: 120,
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
          message:
            "Research Papers Finder is a Pro feature. Upgrade to access real-time evidence search.",
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

      if (!query || typeof query !== "string" || query.trim().length < 3) {
        return res.status(400).json({ error: "Search query must be at least 3 characters." });
      }

      if (query.trim().length > 200) {
        return res.status(400).json({ error: "Search query must be under 200 characters." });
      }

      const filters = { peerReviewed, englishOnly, yearRange };
      const cleanQuery = query.trim();

      console.log(`Research search by ${uid}: "${cleanQuery}" (yearRange=${yearRange}, peerReviewed=${peerReviewed})`);

      // ── STEP 1: Expand the query with AI ──────────────────────────────
      const queryExpansion = await expandQuery(openai, cleanQuery);

      // ── STEP 2: Search both databases in parallel ─────────────────────
      const [pubmedResults, epmcResults] = await Promise.allSettled([
        searchPubMed(queryExpansion, filters),
        searchEuropePMC(queryExpansion, filters),
      ]);

      let allPapers = [];
      if (pubmedResults.status === "fulfilled") allPapers = [...allPapers, ...pubmedResults.value];
      if (epmcResults.status === "fulfilled")   allPapers = [...allPapers, ...epmcResults.value];

      allPapers = deduplicatePapers(allPapers).slice(0, 20);

      console.log(`Found ${allPapers.length} unique papers after deduplication.`);

      if (allPapers.length === 0) {
        return res.status(200).json({
          summary:
            "No research papers were found for this search. Try broader search terms, removing filters, or using different keywords.",
          supporting: [],
          refuting: [],
          neutral: [],
          totalFound: 0,
          expandedTerms: queryExpansion.allTerms,
        });
      }

      // ── STEP 3: AI analysis and categorisation ────────────────────────
      const analysis = await analyseWithAI(openai, cleanQuery, allPapers, emphasis);

      // Return the expanded terms so the frontend can show them to the user
      return res.status(200).json({
        ...analysis,
        expandedTerms: queryExpansion.allTerms,
      });

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
// ============================================================
// REALTIME TOKEN — issues an ephemeral OpenAI Realtime key
// Called by livesim.html before opening a WebRTC session.
// The ephemeral key is short-lived (~1 min) and scoped to
// a single Realtime API session, so it is safe to send to
// the browser.
// ============================================================
exports.realtimeToken = onRequest(
  {
    cors: true,
    secrets: ["OPENAI_API_KEY"],
  },
  async (req, res) => {
    // Explicit CORS headers (belt-and-suspenders alongside cors:true)
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    // --- Auth check (Pro users only) ---
    const authHeader = req.headers.authorization || "";
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    let uid;
    try {
      const decoded = await admin.auth().verifyIdToken(authHeader.slice(7));
      uid = decoded.uid;
    } catch {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const userDoc = await admin.firestore().collection("users").doc(uid).get();
      const userData = userDoc.data() || {};
      const isPro =
        userData.subscriptionStatus === "active" || userData.isPro === true;
      if (!isPro) {
        return res
          .status(403)
          .json({ message: "Live Sim requires a Pro subscription." });
      }
    } catch (err) {
      console.error("Firestore check error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    // --- Pull params from request body ---
    const { systemPrompt, voice } = req.body || {};
    console.log(`realtimeToken: requested voice = "${voice}"`);

    // --- Request ephemeral token from OpenAI ---
    try {
      const openaiKey = process.env.OPENAI_API_KEY;

      const tokenRes = await fetch(
        "https://api.openai.com/v1/realtime/client_secrets",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${openaiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session: {
              type: "realtime",
              model: "gpt-realtime",
              instructions: systemPrompt || "",
              audio: {
                output: {
                  voice: voice || "echo",
                },
              },
            },
          }),
        }
      );

      if (!tokenRes.ok) {
        const errText = await tokenRes.text();
        console.error("OpenAI token error:", tokenRes.status, errText);
        return res
          .status(502)
          .json({ message: "Failed to get Realtime token from OpenAI", detail: errText });
      }

      const tokenData = await tokenRes.json();
      // GA endpoint returns the ephemeral key at tokenData.value
      const ephemeralKey = tokenData.value;

      if (!ephemeralKey) {
        console.error("No token in OpenAI response:", JSON.stringify(tokenData));
        return res
          .status(502)
          .json({ message: "Invalid token response from OpenAI" });
      }

      return res.status(200).json({ token: ephemeralKey });
    } catch (err) {
      console.error("realtimeToken error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

// ============================================
// SHARED EMAIL HELPER
// ============================================

/**
 * Send a notification email to markdevon@gmail.com
 * Requires GMAIL_APP_PASSWORD secret to be available in the calling function.
 */
async function sendNotificationEmail(subject, body) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "markdevon@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: "ParaMind Notifications <markdevon@gmail.com>",
      to: "markdevon@gmail.com",
      subject,
      text: body,
    });
    console.log("Notification email sent: " + subject);
  } catch (emailErr) {
    console.error("Failed to send notification email:", emailErr.message);
  }
}

// ============================================
// APPLE SERVER NOTIFICATIONS
// ============================================

/**
 * POST /appleServerNotifications
 * Receives App Store Server Notifications v2 from Apple.
 * Handles subscription cancellations, expirations, refunds and renewals.
 * No secret required — Apple signs notifications with their own certificate.
 */
exports.appleServerNotifications = onRequest(
  { cors: false, secrets: ["GMAIL_APP_PASSWORD"] },
  async (req, res) => {

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const { signedPayload } = req.body;

      if (!signedPayload) {
        console.error("Apple notification: missing signedPayload");
        return res.status(400).json({ error: "Missing signedPayload" });
      }

      // Decode the outer signed payload (JWS)
      // Apple signs this with their certificate — we trust it based on structure for now
      // Full certificate verification can be added later if needed
      const parts = signedPayload.split('.');
      if (parts.length !== 3) {
        console.error("Apple notification: invalid JWS format");
        return res.status(400).json({ error: "Invalid payload format" });
      }

      const outerPayload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
      const notificationType = outerPayload.notificationType;
      const subtype = outerPayload.subtype || '';

      console.log(`Apple notification received: ${notificationType} (${subtype})`);

      // Decode the inner signed transaction info
      const data = outerPayload.data;
      if (!data || !data.signedTransactionInfo) {
        // Some notifications (e.g. TEST) have no transaction data — that is fine
        console.log(`Apple notification ${notificationType}: no transaction data, ignoring`);
        return res.status(200).json({ received: true });
      }

      const txParts = data.signedTransactionInfo.split('.');
      if (txParts.length !== 3) {
        console.error("Apple notification: invalid signedTransactionInfo format");
        return res.status(400).json({ error: "Invalid transaction format" });
      }

      const txPayload = JSON.parse(Buffer.from(txParts[1], 'base64').toString('utf8'));
      const originalTransactionId = txPayload.originalTransactionId;
      const expiresDateMs = txPayload.expiresDate; // milliseconds
      const productId = txPayload.productId || '';

      if (!originalTransactionId) {
        console.error("Apple notification: missing originalTransactionId in transaction");
        return res.status(400).json({ error: "Missing originalTransactionId" });
      }

      console.log(`Apple notification for originalTransactionId: ${originalTransactionId}, type: ${notificationType}`);

      // Grace date — no one loses access before this date regardless of cancellation timing
      const GRACE_DATE = new Date('2026-04-17T00:00:00.000Z');

      // Find the user in Firestore
      // Try appleOriginalTransactionId first, then fall back to appleTransactionId
      let userDoc = null;

      const byOriginal = await db.collection('users')
        .where('appleOriginalTransactionId', '==', originalTransactionId)
        .limit(1)
        .get();

      if (!byOriginal.empty) {
        userDoc = byOriginal.docs[0];
        console.log(`Found user by appleOriginalTransactionId: ${userDoc.id}`);
      } else {
        // Fallback: match on appleTransactionId (safe for first-week users, IDs are identical)
        const byTransaction = await db.collection('users')
          .where('appleTransactionId', '==', originalTransactionId)
          .limit(1)
          .get();

        if (!byTransaction.empty) {
          userDoc = byTransaction.docs[0];
          console.log(`Found user by appleTransactionId (fallback): ${userDoc.id}`);
          // Store appleOriginalTransactionId now so future notifications match correctly
          await userDoc.ref.update({ appleOriginalTransactionId: originalTransactionId });
        }
      }

      if (!userDoc) {
        // User not found — could be one of the 4 who purchased without registering
        console.warn(`Apple notification: no user found for originalTransactionId ${originalTransactionId}`);
        return res.status(200).json({ received: true });
      }

      // Handle each notification type
      switch (notificationType) {

        case 'DID_RENEW':
        case 'SUBSCRIBED': {
          // Subscription renewed or new subscription — ensure user is active
          await userDoc.ref.update({
            subscriptionStatus: 'active',
            accessExpiresAt: null,
            cancelledAt: null,
            appleOriginalTransactionId: originalTransactionId,
            subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
          });
          console.log(`Apple notification: renewed/subscribed for user ${userDoc.id}`);
          if (notificationType === 'SUBSCRIBED') {
            const userEmail = userDoc.data().email || 'unknown';
            await sendNotificationEmail(
              'New Apple Subscription — ParaMind',
              `A new Apple subscription has started.

User: ${userEmail}
Product: ${productId}
Transaction ID: ${originalTransactionId}`
            );
          }
          break;
        }

        case 'DID_CHANGE_RENEWAL_STATUS': {
          if (subtype === 'AUTO_RENEW_DISABLED') {
            // User has cancelled — keep access until end of billing period or grace date
            // whichever is LATER
            let accessUntil = GRACE_DATE;
            if (expiresDateMs) {
              const appleExpiryDate = new Date(expiresDateMs);
              if (appleExpiryDate > GRACE_DATE) {
                accessUntil = appleExpiryDate;
              }
            }
            await userDoc.ref.update({
              subscriptionStatus: 'active', // Still active until accessUntil
              cancelledAt: admin.firestore.FieldValue.serverTimestamp(),
              accessExpiresAt: accessUntil.toISOString(),
              appleOriginalTransactionId: originalTransactionId,
              subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
            console.log(`Apple notification: cancelled for user ${userDoc.id}, access until ${accessUntil.toISOString()}`);
            console.log('About to send cancellation email...');
            const userEmail = userDoc.data().email || 'unknown';
            console.log('User email retrieved: ' + userEmail);
            await sendNotificationEmail(
              'Apple Subscription Cancelled — ParaMind',
              `A user has cancelled their Apple subscription.

User: ${userEmail}
Product: ${productId}
Access until: ${accessUntil.toISOString()}
Transaction ID: ${originalTransactionId}`
            );
          } else if (subtype === 'AUTO_RENEW_ENABLED') {
            // User un-cancelled — restore full active status
            await userDoc.ref.update({
              subscriptionStatus: 'active',
              cancelledAt: null,
              accessExpiresAt: null,
              appleOriginalTransactionId: originalTransactionId,
              subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
            console.log(`Apple notification: re-subscribed for user ${userDoc.id}`);
            const userEmail = userDoc.data().email || 'unknown';
            await sendNotificationEmail(
              'Apple Subscription Reactivated — ParaMind',
              `A user has reactivated their Apple subscription.

User: ${userEmail}
Product: ${productId}
Transaction ID: ${originalTransactionId}`
            );
          }
          break;
        }

        case 'EXPIRED': {
          // Subscription has fully expired — remove Pro access
          await userDoc.ref.update({
            subscriptionStatus: 'cancelled',
            accessExpiresAt: null,
            appleOriginalTransactionId: originalTransactionId,
            subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
          });
          console.log(`Apple notification: expired for user ${userDoc.id}`);
          break;
        }

        case 'REVOKE': {
          // Apple revoked access (refund etc) — remove Pro access
          await userDoc.ref.update({
            subscriptionStatus: 'cancelled',
            accessExpiresAt: null,
            appleOriginalTransactionId: originalTransactionId,
            subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
          });
          console.log(`Apple notification: revoked for user ${userDoc.id}`);
          break;
        }

        case 'DID_FAIL_TO_RENEW': {
          // Payment failed — log only, do not remove access yet (Apple retries billing)
          console.log(`Apple notification: billing failed for user ${userDoc.id} — no action taken`);
          break;
        }

        case 'GRACE_PERIOD_EXPIRED': {
          // Apple's grace period for failed billing has ended — remove Pro access
          await userDoc.ref.update({
            subscriptionStatus: 'cancelled',
            accessExpiresAt: null,
            appleOriginalTransactionId: originalTransactionId,
            subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
          });
          console.log(`Apple notification: grace period expired for user ${userDoc.id}`);
          break;
        }

        case 'REFUND': {
          // Apple issued a refund — remove Pro access immediately
          await userDoc.ref.update({
            subscriptionStatus: 'cancelled',
            accessExpiresAt: null,
            appleOriginalTransactionId: originalTransactionId,
            subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
          });
          console.log(`Apple notification: refunded for user ${userDoc.id}`);
          break;
        }

        default: {
          // Log unhandled types but always return 200 so Apple does not retry
          console.log(`Apple notification: unhandled type ${notificationType} for user ${userDoc.id}`);
          break;
        }
      }

      return res.status(200).json({ received: true });

    } catch (error) {
      console.error("Apple server notification error:", error);
      // Return 200 even on error to prevent Apple from retrying indefinitely
      // Log will capture the failure for manual review
      return res.status(200).json({ received: true, warning: "Processing error logged" });
    }
  }
);

// ============================================
// FEATURE 2: POST-SCENARIO FEEDBACK REPORT
// ============================================

/**
 * POST /generateScenarioFeedback
 * Generates a structured post-scenario feedback report.
 * Takes the full explicit transcript so the AI can accurately
 * assess what the learner actually did — not rely on conversational memory.
 *
 * Free users: summary verdict + brief missed list + upgrade teaser
 * Pro users: full 5-section report saved to Firestore
 */
exports.generateScenarioFeedback = onRequest(
  {
    cors: true,
    secrets: ["OPENAI_API_KEY"],
    timeoutSeconds: 120,
  },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const uid = await verifyAuth(req);
      const user = await getUser(uid);
      const isPro = user.subscriptionStatus === "active" || user.isPro === true;

      const {
        transcript,        // array of {role, content} messages (non-system only)
        scenarioId,
        correctDiagnosis,
        userImpression,
        difficultyLevel,
        redFlags,          // array of red flag strings from scenario data
        handoverDelivered, // boolean — whether the learner actually delivered a handover
      } = req.body;

      if (!transcript || !scenarioId || !userImpression) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Format transcript as readable text for the AI
      const transcriptText = transcript
        .filter(m => m.role !== "system")
        .map(m => {
          const label = m.role === "user" ? "PARAMEDIC" : "PATIENT/SYSTEM";
          return `${label}: ${m.content}`;
        })
        .join("\n\n");

      const redFlagList = Array.isArray(redFlags) && redFlags.length
        ? redFlags.join(", ")
        : "Not specified";

      // Pro gets full 5-section report; free gets a shorter verdict-only report
      const reportInstructions = isPro ? `
You are a senior paramedic educator providing post-scenario feedback. Write in British English using NHS terminology throughout.

ABSOLUTE CONSTRAINT — READ BEFORE WRITING ANYTHING:
This is an ASSESSMENT and COMMUNICATION tool only. You must NEVER mention, suggest, imply, or reference:
- Any medications, drugs, or drug doses (not even aspirin, oxygen, paracetamol, or GTN)
- Any clinical interventions or treatments
- Any management decisions or clinical actions
- What the paramedic "should have done" clinically
If you find yourself about to write any of the above, stop and delete it. Replace it with a comment about assessment, history-taking, communication, or clinical reasoning only.

Generate a feedback report with EXACTLY these five sections:

## 1. Overall Performance
2-3 sentences on the paramedic's overall performance. Reference the difficulty level (${difficultyLevel === 3 ? 'Paramedic (Level 3)' : difficultyLevel === 2 ? 'NQP (Level 2)' : 'Student (Level 1)'}).

## 2. What You Did Well
2-4 specific things they did well from the transcript — questions asked, assessments performed, communication with the patient, history gathered. Quote their actual words where helpful.

## 3. Assessment Gaps
3-5 specific things they did NOT do in terms of history-taking, communication with the patient, or clinical examination. Examples: "You did not ask about onset of symptoms", "You did not take a social history", "You did not speak directly to the patient before performing assessments". Only assessment and communication gaps — nothing clinical or managerial.

## 4. Handover Quality
${handoverDelivered
  ? `Assess the ATMIST handover — Age, Time of onset, Mechanism/Medical history, Injuries or key findings, Signs and vital signs. Comment on which elements were present, which were missing or vague, and whether the receiving team had enough information. Do NOT comment on the Treatment element of ATMIST.`
  : `The learner did NOT deliver a handover. State this clearly and briefly explain why a structured ATMIST handover is important before handing over to the receiving team. Do NOT fabricate or assume a handover was given. Do NOT refer to anything from the On Scene conversation as if it were a handover.`
}

## 5. Clinical Reasoning
3-4 sentences on why the history and examination findings mattered — what pattern of symptoms and signs the paramedic should have recognised, and why systematic history-taking matters in cases like this. No medications, no interventions, no management.

Do NOT start with any preamble — go straight to "## 1. Overall Performance".
` : `
You are a senior paramedic educator. Write in British English.

ABSOLUTE CONSTRAINT: Never mention medications, treatments, interventions, or management decisions.

Provide a SHORT feedback summary with EXACTLY these three sections:

## Verdict
CORRECT, PARTIALLY CORRECT, or INCORRECT. One sentence.

## Assessment Gaps
Up to 3 things they missed in their history-taking or communication with the patient. No clinical management.

## Unlock Full Feedback
One sentence inviting them to upgrade to Pro for the full 5-section report.

Base everything only on the actual transcript provided.
`;

      const systemPrompt = `You are a UK paramedic clinical educator generating post-scenario feedback. The scenario correct diagnosis is: ${correctDiagnosis}. The learner's working impression was: "${userImpression}". Key red flags for this condition: ${redFlagList}.

CRITICAL — VERDICT RULES:
1. If the working impression is not a genuine clinical diagnosis (e.g. it is nonsense, a joke, a placeholder, or shows no attempt at clinical reasoning), the VERDICT must be INCORRECT — do not give partial credit for non-clinical answers.
2. Only give CORRECT or PARTIALLY CORRECT if the impression contains recognisable medical/clinical terminology that relates to the actual diagnosis.

${reportInstructions}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",  // Full model for feedback quality — not mini
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Here is the full scenario transcript:\n\n${transcriptText}\n\nPlease generate the feedback report now.` }
        ],
        max_tokens: isPro ? 1200 : 400,
        temperature: 0.4,  // Lower temperature for consistent, accurate feedback
      });

      const reportText = response.choices[0]?.message?.content || "";

      // Parse verdict from the report for result classification
      const upper = reportText.toUpperCase();
      let result = "incorrect";
      if (upper.includes("VERDICT: CORRECT") || upper.includes("VERDICT\nCORRECT") || upper.includes("VERDICT\r\nCORRECT") || (upper.includes("VERDICT") && upper.includes(": CORRECT"))) result = "correct";
      else if (upper.includes("VERDICT: PARTIALLY") || upper.includes("PARTIALLY CORRECT") || upper.includes("PARTIAL")) result = "partially_correct";
      else if (upper.includes("INCORRECT")) result = "incorrect";

      // Score handover quality 0/1/2 by checking ATMIST elements in the transcript
      // A = Age, T = Time, M = Mechanism/Medical history, I = Injuries/findings,
      // S = Signs/vitals, T = Treatment (we skip treatment per clinical guidelines)
      let handoverScore = 0;
      if (handoverDelivered) {
        const handoverMsgs = transcript
          .filter(m => m.role === "user")
          .map(m => m.content.toLowerCase())
          .join(" ");
        const atmistChecks = [
          /\b(\d+[\s-]*(year|yr|y\/o|y\.o|yo)|\bage\b)/i,           // A — Age
          /\b(onset|started|began|since|ago|time|this (morning|afternoon|evening|night))/i, // T — Time
          /\b(history|pmh|medical|condition|cardiac|diabetic|hypertension|previous|background)/i, // M — Mechanism/Med hx
          /\b(pain|injury|bleeding|wound|lacerat|fracture|finding|complain|symptom|present)/i,  // I — Injuries/findings
          /\b(bp|blood pressure|pulse|heart rate|spo2|oxygen|gcs|rr|resps|temp|obs|vital|sat)/i, // S — Signs
        ];
        const hits = atmistChecks.filter(p => p.test(handoverMsgs)).length;
        if (hits >= 4) handoverScore = 2;       // full/near-full ATMIST
        else if (hits >= 2) handoverScore = 1;  // partial ATMIST
        else handoverScore = 0;                 // delivered but no relevant content
      }

      return res.status(200).json({
        success: true,
        report: reportText,
        result,
        isPro,
        handoverScore,
      });

    } catch (error) {
      console.error("generateScenarioFeedback error:", error);
      if (error.message.includes("Unauthorized")) {
        return res.status(401).json({ error: error.message });
      }
      return res.status(500).json({ error: "Failed to generate feedback" });
    }
  }
);

/**
 * POST /saveEnhancedCpdRecord
 * Saves a CPD record with the extended fields introduced in Feature 2.
 * Additive only — does not affect existing cpdRecords documents.
 * Pro only.
 */
exports.saveEnhancedCpdRecord = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const uid = await verifyAuth(req);
    const user = await getUser(uid);

    if (user.subscriptionStatus !== "active" && user.isPro !== true) {
      return res.status(403).json({ error: "Pro subscription required" });
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
      assessmentsPerformed,
      // New Feature 2 fields (additive)
      debriefReport,
      difficultyLevel,
    } = req.body;

    if (!scenarioId || !userImpression || !result) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const validResults = ["correct", "partially_correct", "incorrect"];
    if (!validResults.includes(result)) {
      return res.status(400).json({ error: "Invalid result value" });
    }

    const cpdRecordRef = await db
      .collection("users")
      .doc(uid)
      .collection("cpdRecords")
      .add({
        scenarioId,
        scenarioCode: scenarioCode || "N/A",
        scenarioType: scenarioType || "Unknown",
        scenarioCategory: scenarioCategory || "unknown",
        patientName: patientName || "Unknown",
        chiefComplaint: chiefComplaint || "N/A",
        correctDiagnosis: correctDiagnosis || "N/A",
        userImpression,
        result,
        questionsAsked: questionsAsked || 0,
        assessmentsPerformed: assessmentsPerformed || 0,
        completedAt: admin.firestore.FieldValue.serverTimestamp(),
        // Feature 2 fields
        debriefReport: debriefReport || null,
        difficultyLevel: difficultyLevel || 1,
      });

    return res.status(200).json({
      success: true,
      recordId: cpdRecordRef.id,
    });

  } catch (error) {
    console.error("saveEnhancedCpdRecord error:", error);
    if (error.message.includes("Unauthorized")) {
      return res.status(401).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
});
