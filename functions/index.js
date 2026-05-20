/**
 * PARAMIND - Cloud Functions
 * Backend API for the Paramind paramedic learning platform
 * WITH CPD PORTFOLIO FEATURE, DISCOUNT CODES, AND STREAMING RESPONSES
 */

const { onRequest } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler");
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

      // Get message, conversation history, scenario prompt, and addendum from request
      const { message, conversationHistory = [], scenarioPrompt, systemPromptAddendum } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      // Build the system prompt:
      // - If scenarioPrompt is provided, it REPLACES the entire system prompt (used by scenarios)
      // - Otherwise we use the trust-based safety prompt, optionally appending an addendum
      //   from the client (used by chat.html to add Hollie's personality + tool referral rules)
      let systemPrompt;
      if (scenarioPrompt) {
        systemPrompt = scenarioPrompt;
      } else {
        systemPrompt = buildSystemPrompt(user.trust, user.trustFullName);
        if (systemPromptAddendum && typeof systemPromptAddendum === "string" && systemPromptAddendum.trim().length > 0) {
          systemPrompt = systemPrompt + "\n\n" + systemPromptAddendum.trim();
        }
      }

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

        // Set proSince on first activation (never overwrite — protects original
        // join date for users who cancel and later resubscribe)
        try {
          const userSnap = await userRef.get();
          if (!userSnap.exists || userSnap.data().proSince === undefined) {
            updateData.proSince = admin.firestore.FieldValue.serverTimestamp();
            updateData.proSinceSource = "stripe";
          }
        } catch (proSinceErr) {
          console.error(`proSince check failed for ${uid}:`, proSinceErr.message);
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
      // current_period_end moved to items in newer Stripe API versions — check both locations
      const periodEnd = subscription.current_period_end
        || subscription.items?.data?.[0]?.current_period_end
        || null;
      if (periodEnd) {
        updateData.accessExpiresAt = new Date(periodEnd * 1000);
      }
    } else {
      // They might have re-subscribed or un-cancelled
      updateData.cancelledAt = null;
      updateData.accessExpiresAt = null;
    }

    await userDoc.ref.update(updateData);
    
    if (subscription.cancel_at_period_end) {
      console.log(`User ${userDoc.id} cancelled - access continues until ${updateData.accessExpiresAt ? updateData.accessExpiresAt.toISOString() : 'unknown'}`);
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
 * POST /speakHollie
 * Converts Hollie's text responses to speech using ElevenLabs TTS
 * Uses Charlotte voice — British English female
 * Pro users only
 */
exports.speakHollie = onRequest(
  {
    cors: true,
    secrets: ["ELEVENLABS_API_KEY"],
    timeoutSeconds: 60
  },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const uid = await verifyAuth(req);
      const user = await getUser(uid);

      if (user.subscriptionStatus !== "active") {
        return res.status(403).json({
          error: "Pro subscription required",
          upgrade: true
        });
      }

      const { text } = req.body;

      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "text is required" });
      }

      // Charlotte voice ID — warm British English female
      const CHARLOTTE_VOICE_ID = "ZF6FPAbjXT4488VcRRnw";

      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${CHARLOTTE_VOICE_ID}`,
        {
          method: "POST",
          headers: {
            "xi-api-key": process.env.ELEVENLABS_API_KEY,
            "Content-Type": "application/json",
            "Accept": "audio/mpeg"
          },
          body: JSON.stringify({
            text: text.slice(0, 5000),
            model_id: "eleven_turbo_v2_5",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
              style: 0.3,
              use_speaker_boost: true
            }
          })
        }
      );

      if (!response.ok) {
        const err = await response.text();
        console.error("ElevenLabs error:", err);
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBuffer = await response.arrayBuffer();
      const base64Audio = Buffer.from(audioBuffer).toString("base64");

      console.log(`speakHollie: ${text.length} chars for user ${uid}`);

      return res.status(200).json({ audio: base64Audio });

    } catch (error) {
      console.error("speakHollie error:", error);

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

      // Set proSince on first activation (never overwrite — protects original
      // join date through restores, renewals, and resubscriptions)
      try {
        const userSnap = await db.collection("users").doc(uid).get();
        if (!userSnap.exists || userSnap.data().proSince === undefined) {
          updateData.proSince = admin.firestore.FieldValue.serverTimestamp();
          updateData.proSinceSource = "apple";
        }
      } catch (proSinceErr) {
        console.error(`proSince check failed for ${uid}:`, proSinceErr.message);
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
    cors: true,
    secrets: ["GMAIL_APP_PASSWORD"]
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

      // Set proSince on first activation (never overwrite — protects original
      // join date through restores, renewals, and resubscriptions)
      try {
        const userSnap = await db.collection("users").doc(uid).get();
        if (!userSnap.exists || userSnap.data().proSince === undefined) {
          updateData.proSince = admin.firestore.FieldValue.serverTimestamp();
          updateData.proSinceSource = "google";
        }
      } catch (proSinceErr) {
        console.error(`proSince check failed for ${uid}:`, proSinceErr.message);
      }

      await db.collection("users").doc(uid).update(updateData);

      console.log(`Google Play purchase verified for user ${uid}: ${productId} (${plan})${restored ? ' [restored]' : ''}`);

      // Send notification email for new purchases (not restores)
      if (!restored) {
        const userDoc = await db.collection('users').doc(uid).get();
        const userEmail = userDoc.exists ? (userDoc.data().email || 'unknown') : 'unknown';
        await sendNotificationEmail(
          'New Google Play Subscription — ParaMind',
          `A new Google Play subscription has started.\n\nUser: ${userEmail}\nProduct: ${productId}\nPlan: ${plan}\nTransaction ID: ${transactionId || 'unknown'}`
        );
      }

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
          const renewalUpdate = {
            subscriptionStatus: 'active',
            accessExpiresAt: null,
            cancelledAt: null,
            appleOriginalTransactionId: originalTransactionId,
            subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
          };

          // Set proSince on first activation only (DID_RENEW users will
          // already have it from their original subscription, so this only
          // fires for genuine first-time SUBSCRIBED cases that didn't go
          // through verifyApplePurchase)
          if (userDoc.data().proSince === undefined) {
            renewalUpdate.proSince = admin.firestore.FieldValue.serverTimestamp();
            renewalUpdate.proSinceSource = "apple_notification";
          }

          await userDoc.ref.update(renewalUpdate);
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

Start your response with EXACTLY this line (no preamble before it):
VERDICT: [CORRECT / PARTIALLY CORRECT / INCORRECT]

Then immediately follow with the five sections below. Do not add any text between the VERDICT line and ## 1. Overall Performance.
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

      // Score handover quality 0/1/2 by checking ATMIST elements in handover-phase messages only
      // A = Age, T = Time, M = Mechanism/Medical history, I = Injuries/findings, S = Signs/vitals
      let handoverScore = 0;
      if (handoverDelivered) {
        // Find sentinel — only messages after [HANDOVER_PHASE_START] count
        const sentinelIdx = transcript.findIndex(m => m.content === '[HANDOVER_PHASE_START]');
        const handoverOnly = sentinelIdx >= 0
          ? transcript.slice(sentinelIdx + 1)
          : transcript; // fallback: use all if sentinel missing

        const handoverMsgs = handoverOnly
          .filter(m => m.role === "user" && m.content !== '[HANDOVER_PHASE_START]')
          .map(m => m.content.toLowerCase())
          .join(" ");

        const atmistChecks = [
          /\b(\d+[\s-]*(year|yr|y\/o|y\.o|yo)|\bage\b)/i,                                       // A — Age
          /\b(onset|started|began|since|ago|time|this (morning|afternoon|evening|night))/i,       // T — Time
          /\b(history|pmh|medical|condition|cardiac|diabetic|hypertension|previous|background)/i, // M — Mechanism/Med hx
          /\b(pain|injury|bleeding|wound|lacerat|fracture|finding|complain|symptom|present)/i,    // I — Injuries/findings
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
      // Feature 6 fields
      grade,
      totalPoints,
      redFlags,
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
        // Feature 6 fields
        grade: grade || null,
        totalPoints: totalPoints || 0,
        redFlags: Array.isArray(redFlags) ? redFlags : [],
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

// ============================================
// GENERATE CONNECTIONS CACHE
// One-off admin function to pre-generate all A&P Connections
// responses and store them in Firestore.
// Trigger by visiting the URL while logged in as admin.
// Re-run whenever new questions are added.
// ============================================

exports.generateConnectionsCache = onRequest(
  {
    cors: true,
    secrets: ["OPENAI_API_KEY"],
    timeoutSeconds: 540,
    memory: "512MiB"
  },
  async (req, res) => {
    try {
      // Admin check
      const uid = await verifyAuth(req);
      const decodedToken = await admin.auth().verifyIdToken(
        req.headers.authorization.split("Bearer ")[1]
      );
      const adminEmail = "markdevon@gmail.com";
      if (decodedToken.email !== adminEmail) {
        return res.status(403).json({ error: "Forbidden: admin only" });
      }

      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const HOLLIE_AP_PROMPT = `You are Hollie, a friendly and experienced UK paramedic who loves teaching anatomy and physiology to fellow paramedics and students. You explain things in a warm, conversational way - like you're chatting to a colleague over a cuppa.

Your personality:
- Friendly and approachable - use "you" and speak directly to the learner
- Enthusiastic about A&P - you find it genuinely fascinating
- Practical - always link theory to what we see on the road
- Encouraging - make learners feel confident
- Use phrases like "So basically...", "The cool thing is...", "You'll often see...", "Think of it like..."

When explaining:
1. Start with a friendly opener (e.g., "Great question!", "Ah, this is a really important one!", "Ooh I love this topic!")
2. Give a simple overview first
3. Explain the anatomy involved in plain terms
4. Walk through the physiology step-by-step
5. Link it to clinical signs we observe as paramedics
6. End with an encouraging note or practical tip

Keep it conversational - no formal headers or bullet points. Write in flowing paragraphs like you're actually talking. Use UK spelling and terminology.

Keep responses around 250-350 words - detailed enough to be useful but not overwhelming.

Remember: This is for EDUCATION only - never give treatment advice. If treatment comes up, remind them to check JRCalc.`;

      const HOLLIE_SIMPLIFY_PROMPT = `You are Hollie, a friendly and experienced UK paramedic who loves teaching anatomy and physiology.

IMPORTANT: The learner asked you to simplify your previous explanation. You MUST:
- Re-explain the SAME topic you just discussed
- Use simpler language and shorter sentences
- Use more analogies and everyday comparisons (like "think of it like...")
- Avoid medical jargon or explain terms simply
- Start with "No worries!" or "Of course!" or similar
- Keep it friendly and encouraging
- Do NOT introduce new topics - simplify what you already explained

Use UK spelling and terminology.`;

      // All questions mirroring connections.html
      const BODY_SYSTEMS = [
        {
          id: "cardiovascular",
          questions: [
            "Why does a PE cause tachycardia?",
            "How does heart failure cause peripheral oedema?",
            "Why do we see JVP elevation in right heart failure?",
            "Explain why MI can cause referred pain to the arm and jaw",
            "Why does aortic stenosis cause syncope on exertion?",
            "How does atrial fibrillation increase stroke risk?",
            "Why do patients with heart failure get breathless when lying flat?",
            "Explain the pathophysiology of cardiogenic shock",
            "Why does severe bradycardia cause hypotension?",
            "How does cardiac tamponade affect blood pressure?"
          ]
        },
        {
          id: "respiratory",
          questions: [
            "Explain the pathophysiology of anaphylaxis and airway compromise",
            "Why does COPD cause a barrel chest?",
            "How does asthma cause wheeze?",
            "Why do we see pursed lip breathing in COPD patients?",
            "Explain why tension pneumothorax causes tracheal deviation",
            "Why does pulmonary oedema cause pink frothy sputum?",
            "How does hyperventilation cause tingling in the hands?",
            "Why do asthmatics have a prolonged expiratory phase?",
            "Explain why oxygen can be dangerous in some COPD patients",
            "How does a flail chest affect ventilation?"
          ]
        },
        {
          id: "nervous",
          questions: [
            "Why does a stroke cause one-sided weakness?",
            "Explain the pathophysiology of a seizure",
            "How does raised intracranial pressure cause Cushing's triad?",
            "Why do patients become unconscious with hypoglycaemia?",
            "Explain why pupil changes occur in head injuries",
            "How does meningitis cause neck stiffness?",
            "Why does a subarachnoid haemorrhage cause sudden severe headache?",
            "Explain the difference between upper and lower motor neuron lesions",
            "Why does spinal cord injury cause neurogenic shock?",
            "How does the autonomic nervous system affect heart rate?"
          ]
        },
        {
          id: "gastrointestinal",
          questions: [
            "Why does GI bleeding cause melaena vs fresh blood?",
            "Explain the pathophysiology of acute pancreatitis pain",
            "How does bowel obstruction cause vomiting?",
            "Why does liver failure cause confusion?",
            "Explain why appendicitis pain moves from umbilicus to RIF",
            "How does dehydration from D&V affect the cardiovascular system?",
            "Why does cholecystitis cause referred shoulder pain?",
            "Explain the pathophysiology of peritonitis",
            "How does a AAA cause back pain?",
            "Why do patients with GI bleeds become tachycardic before hypotensive?"
          ]
        },
        {
          id: "renal",
          questions: [
            "How does acute kidney injury cause hyperkalaemia?",
            "Why does kidney failure cause fluid overload?",
            "Explain the pathophysiology of renal colic pain",
            "How does chronic kidney disease cause anaemia?",
            "Why do dialysis patients get breathless between treatments?",
            "Explain how UTIs can cause confusion in elderly patients",
            "Why does urinary retention cause lower abdominal pain?",
            "How does rhabdomyolysis affect the kidneys?",
            "Explain why kidney patients are prone to arrhythmias",
            "How does dehydration affect kidney function?"
          ]
        },
        {
          id: "endocrine",
          questions: [
            "Explain the pathophysiology of diabetic ketoacidosis",
            "Why does hypoglycaemia cause sweating and tremor?",
            "How does Addison's disease cause hypotension?",
            "Why do diabetics get fruity-smelling breath in DKA?",
            "Explain how HHS differs from DKA",
            "Why does hyperthyroidism cause tachycardia and tremor?",
            "How does hypothyroidism affect the body?",
            "Explain why stress causes blood glucose to rise",
            "Why do Type 1 and Type 2 diabetes present differently?",
            "How does insulin work at a cellular level?"
          ]
        },
        {
          id: "musculoskeletal",
          questions: [
            "Why do fractures cause fat embolism syndrome?",
            "Explain compartment syndrome pathophysiology",
            "How does a femoral fracture cause significant blood loss?",
            "Why does a hip fracture cause leg shortening and rotation?",
            "Explain the pathophysiology of crush syndrome",
            "How do long bone fractures affect clotting?",
            "Why is pelvic fracture so dangerous?",
            "Explain why open fractures are high risk for infection",
            "How does muscle damage release potassium?",
            "Why do elderly patients fracture more easily?"
          ]
        },
        {
          id: "immune",
          questions: [
            "Explain the pathophysiology of sepsis",
            "Why does anaphylaxis cause widespread vasodilation?",
            "How does the body's immune response cause fever?",
            "Why does sepsis cause mottled skin?",
            "Explain why immunocompromised patients present atypically",
            "How do mast cells cause allergic reactions?",
            "Why does severe infection cause low blood pressure?",
            "Explain the difference between sepsis and septic shock",
            "How does the inflammatory response cause redness and swelling?",
            "Why do some infections cause rigors?"
          ]
        },
        {
          id: "obstetrics",
          questions: [
            "Why does pregnancy cause a physiological increase in heart rate and cardiac output?",
            "How does a growing uterus cause aortocaval compression in late pregnancy?",
            "Why does pre-eclampsia cause headache and visual disturbances?",
            "Explain why placental abruption causes a hard, 'woody' uterus",
            "Why does postpartum haemorrhage cause cardiovascular collapse so rapidly?",
            "How does eclampsia cause seizures?",
            "Why does a cord prolapse compromise fetal oxygen delivery?",
            "Explain why pregnancy shifts the apex beat and makes ECG interpretation different",
            "Why do pregnant patients compensate for blood loss differently to non-pregnant patients?",
            "How does shoulder dystocia cause brachial plexus injury?"
          ]
        },
        {
          id: "gynaecology",
          questions: [
            "Why does an ectopic pregnancy cause referred shoulder tip pain?",
            "How does ovarian torsion cause sudden severe pain?",
            "Explain why a ruptured ectopic pregnancy causes haemodynamic compromise so rapidly",
            "Why does endometriosis cause cyclical pain?",
            "Why does a ruptured ovarian cyst cause peritoneal irritation and guarding?",
            "Why does pelvic inflammatory disease cause rebound tenderness?",
            "Explain how the menstrual cycle is hormonally regulated",
            "Why does ovarian hyperstimulation syndrome cause fluid shifts?",
            "How does menorrhagia lead to iron deficiency anaemia?",
            "Why can ovarian cysts cause referred pain to the thigh or back?"
          ]
        }
      ];

      const results = [];
      let generated = 0;
      let skipped = 0;

      for (const system of BODY_SYSTEMS) {
        for (let i = 0; i < system.questions.length; i++) {
          const question = system.questions[i];
          const docId = `${system.id}_${i}`;
          const docRef = db.collection("connectionsCache").doc(docId);

          // Skip if already cached (allows safe re-runs for new questions only)
          const existing = await docRef.get();
          if (existing.exists) {
            skipped++;
            continue;
          }

          // Generate standard explanation
          const standardResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: HOLLIE_AP_PROMPT },
              { role: "user", content: question }
            ],
            max_tokens: 600,
            temperature: 0.7
          });
          const standard = standardResponse.choices[0].message.content;

          // Generate simplified explanation using the standard as context
          const simplifiedResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: HOLLIE_SIMPLIFY_PROMPT },
              { role: "user", content: question },
              { role: "assistant", content: standard },
              { role: "user", content: "Can you explain that again but in a simpler, easier-to-understand way please? Use simpler language, more analogies, and less medical jargon." }
            ],
            max_tokens: 600,
            temperature: 0.7
          });
          const simplified = simplifiedResponse.choices[0].message.content;

          // Store in Firestore
          await docRef.set({
            question,
            systemId: system.id,
            standard,
            simplified,
            generatedAt: admin.firestore.FieldValue.serverTimestamp()
          });

          generated++;
          results.push({ docId, status: "generated" });
          console.log(`Generated: ${docId} (${generated} done)`);
        }
      }

      return res.status(200).json({
        success: true,
        generated,
        skipped,
        message: `Done. ${generated} new responses generated, ${skipped} already existed.`
      });

    } catch (error) {
      console.error("generateConnectionsCache error:", error);
      if (error.message.includes("Unauthorized") || error.message.includes("Forbidden")) {
        return res.status(403).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
);

// ============================================
// EBOOK DOWNLOAD TRACKING (anonymous)
// ============================================
// The Free Paramedic Book download page (index-free-paramedic-book.html)
// intentionally has no authentication and promises "no email, no sign-up".
// Direct Firestore writes from the page are therefore not possible
// (analytics rules require auth). This endpoint provides a server-side
// atomic increment so we can count downloads without collecting any
// user data.
//
// Writes to analytics/ebookDownloads:
//   count          — lifetime total (number)
//   byDay.{date}   — per-day breakdown, UTC, key = YYYY-MM-DD
//   lastUpdated    — server timestamp
//
// This is a soft metric. A determined bot could inflate it; we use a
// referer allowlist to deflect casual abuse but make no stronger claim.
// The endpoint always returns 204 — the user's actual PDF download must
// never depend on this call succeeding.
exports.trackEbookDownload = onRequest({ cors: true }, async (req, res) => {
  try {
    if (req.method !== "POST") {
      res.status(204).send();
      return;
    }

    const referer = req.headers.referer || req.headers.referrer || "";
    const allowed =
      referer.startsWith("https://paramind.co.uk/") ||
      referer.startsWith("https://www.paramind.co.uk/") ||
      referer.startsWith("http://localhost") ||
      referer.startsWith("http://127.0.0.1");

    if (!allowed) {
      res.status(204).send();
      return;
    }

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD UTC

    await db.collection("analytics").doc("ebookDownloads").set(
      {
        count: admin.firestore.FieldValue.increment(1),
        byDay: {
          [today]: admin.firestore.FieldValue.increment(1),
        },
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    res.status(204).send();
  } catch (err) {
    // Swallow errors — the user's download must not be affected by
    // anything that happens here. Logged for observability only.
    console.error("trackEbookDownload error:", err);
    res.status(204).send();
  }
});

// ============================================
// ADMIN: BACKFILL proSince
// ============================================
// One-off admin tool to populate a `proSince` timestamp on existing Pro users
// based on the original purchase date held externally (Stripe API for web
// subscribers; decoded JWS for Apple). Google Play subscribers are intentionally
// skipped — handle those manually via the Play Console.
//
// Safety:
//   - Gated to a single admin UID
//   - Idempotent: skips any user that already has `proSince`
//   - Dry-run by default: only writes to Firestore when dryRun === false
//
// Trigger (after deploy) from a browser console while logged in at paramind.co.uk:
//
//   const t = await firebase.auth().currentUser.getIdToken();
//   const r = await fetch(
//     "https://europe-west2-paramind-app.cloudfunctions.net/backfillProSince",
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
//       body: JSON.stringify({ dryRun: true })   // set to false to actually write
//     }
//   );
//   console.log(await r.json());

const BACKFILL_ADMIN_UID = "Yo72GSxxr2TO7ixAYGk2ll0jtLr1";

exports.backfillProSince = onRequest(
  { cors: true, secrets: ["STRIPE_SECRET_KEY"] },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      // 1) Auth + admin gate
      const uid = await verifyAuth(req);
      if (uid !== BACKFILL_ADMIN_UID) {
        return res.status(403).json({ error: "Forbidden" });
      }

      // dryRun defaults to true; only `false` actually writes
      const dryRun = req.body?.dryRun !== false;

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2023-10-16",
      });

      // 2) Pull all currently-active Pro users
      const snap = await db
        .collection("users")
        .where("subscriptionStatus", "==", "active")
        .get();

      const summary = {
        dryRun,
        scanned: snap.size,
        wouldUpdate: 0,
        updated: 0,
        skipped_alreadySet: 0,
        skipped_google_manual: 0,
        skipped_apple_missing_jws: 0,
        skipped_unknown: 0,
        errors: 0,
        details: [],
      };

      for (const doc of snap.docs) {
        const userId = doc.id;
        const data = doc.data();

        // Idempotent: skip if proSince has been touched in any way
        // (a real Timestamp, OR a null placeholder set by the seeder)
        if (data.proSince !== undefined) {
          summary.skipped_alreadySet++;
          continue;
        }

        let proSinceDate = null;
        let source = null;

        try {
          // -------- Stripe path --------
          if (data.stripeSubscriptionId) {
            const sub = await stripe.subscriptions.retrieve(
              data.stripeSubscriptionId
            );
            if (sub && sub.created) {
              // Stripe `created` is Unix epoch in seconds
              proSinceDate = new Date(sub.created * 1000);
              source = "stripe";
            }
          }

          // -------- Apple path (decode stored JWS) --------
          else if (data.appleJws) {
            const parts = data.appleJws.split(".");
            if (parts.length === 3) {
              const payload = JSON.parse(
                Buffer.from(parts[1], "base64").toString("utf8")
              );
              // originalPurchaseDate is ms since epoch
              if (payload.originalPurchaseDate) {
                proSinceDate = new Date(payload.originalPurchaseDate);
                source = "apple_jws";
              }
            }
          }

          // -------- Skip categories --------
          else if (data.subscriptionPlatform === "google") {
            summary.skipped_google_manual++;
            summary.details.push({ userId, email: data.email, reason: "google_manual" });
            continue;
          } else if (data.subscriptionPlatform === "apple") {
            // Apple user but no JWS stored — needs manual handling
            summary.skipped_apple_missing_jws++;
            summary.details.push({
              userId,
              email: data.email,
              reason: "apple_missing_jws",
              appleOriginalTransactionId: data.appleOriginalTransactionId || null,
            });
            continue;
          } else {
            // Active Pro user with no recognised platform marker
            summary.skipped_unknown++;
            summary.details.push({
              userId,
              email: data.email,
              reason: "no_platform_identifier",
            });
            continue;
          }

          // Defensive: if we reached here but didn't manage to derive a date
          if (!proSinceDate || isNaN(proSinceDate.getTime())) {
            summary.errors++;
            summary.details.push({
              userId,
              email: data.email,
              reason: "could_not_derive_date",
              source,
            });
            continue;
          }

          // Write (or pretend to)
          if (dryRun) {
            summary.wouldUpdate++;
            summary.details.push({
              userId,
              email: data.email,
              source,
              proSince: proSinceDate.toISOString(),
              wouldWrite: true,
            });
          } else {
            await doc.ref.update({
              proSince: admin.firestore.Timestamp.fromDate(proSinceDate),
              proSinceSource: source,
            });
            summary.updated++;
            summary.details.push({
              userId,
              email: data.email,
              source,
              proSince: proSinceDate.toISOString(),
              written: true,
            });
          }
        } catch (perUserErr) {
          summary.errors++;
          summary.details.push({
            userId,
            email: data.email,
            reason: "exception",
            message: perUserErr.message,
          });
          console.error(`backfillProSince error for ${userId}:`, perUserErr);
        }
      }

      console.log(
        `backfillProSince finished. dryRun=${dryRun} scanned=${summary.scanned} ` +
          `updated=${summary.updated} wouldUpdate=${summary.wouldUpdate} ` +
          `errors=${summary.errors}`
      );

      return res.status(200).json(summary);
    } catch (err) {
      console.error("backfillProSince fatal error:", err);
      return res.status(500).json({ error: err.message });
    }
  }
);

// ============================================
// ADMIN: SEED proSince PLACEHOLDERS
// ============================================
// Companion to backfillProSince. For active Pro users where proSince could not
// be derived automatically (Google Play, Apple-without-JWS, unknown platform),
// writes null placeholder fields so they show up in Firebase Console as
// editable slots — easier for manual data entry than adding fields from
// scratch.
//
// Sources written:
//   "pending_apple_manual"   — Apple subscribers without a stored JWS
//   "pending_google_manual"  — all Google Play subscribers
//   "pending_unknown"        — active Pro user with no platform marker
//
// Filter trick in Firebase Console: filter `users` by
// proSinceSource == "pending_apple_manual" (or _google_manual) to see only
// the users still needing manual entry.
//
// Trigger (after deploy) from a browser console while logged in:
//
//   const t = await firebase.auth().currentUser.getIdToken();
//   const r = await fetch(
//     "https://europe-west2-paramind-64b8e.cloudfunctions.net/seedProSincePlaceholders",
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
//       body: JSON.stringify({ dryRun: true })
//     }
//   );
//   console.log(await r.json());

exports.seedProSincePlaceholders = onRequest(
  { cors: true },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const uid = await verifyAuth(req);
      if (uid !== BACKFILL_ADMIN_UID) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const dryRun = req.body?.dryRun !== false;

      const snap = await db
        .collection("users")
        .where("subscriptionStatus", "==", "active")
        .get();

      const summary = {
        dryRun,
        scanned: snap.size,
        wouldSeed: 0,
        seeded: 0,
        skipped_alreadyHasField: 0,
        seeded_apple: 0,
        seeded_google: 0,
        seeded_unknown: 0,
        errors: 0,
        details: [],
      };

      for (const doc of snap.docs) {
        const userId = doc.id;
        const data = doc.data();

        // Skip anyone whose proSince field has been touched (real value OR
        // an existing null placeholder from a previous run of this seeder)
        if (data.proSince !== undefined) {
          summary.skipped_alreadyHasField++;
          continue;
        }

        // Decide which "pending" source to assign
        let sourceLabel = null;
        if (data.subscriptionPlatform === "apple") {
          sourceLabel = "pending_apple_manual";
        } else if (data.subscriptionPlatform === "google") {
          sourceLabel = "pending_google_manual";
        } else {
          sourceLabel = "pending_unknown";
        }

        try {
          if (dryRun) {
            summary.wouldSeed++;
            summary.details.push({
              userId,
              email: data.email,
              proSinceSource: sourceLabel,
              wouldWrite: true,
            });
          } else {
            await doc.ref.update({
              proSince: null,
              proSinceSource: sourceLabel,
            });
            summary.seeded++;
            if (sourceLabel === "pending_apple_manual") summary.seeded_apple++;
            else if (sourceLabel === "pending_google_manual") summary.seeded_google++;
            else summary.seeded_unknown++;

            summary.details.push({
              userId,
              email: data.email,
              proSinceSource: sourceLabel,
              written: true,
            });
          }
        } catch (perUserErr) {
          summary.errors++;
          summary.details.push({
            userId,
            email: data.email,
            reason: "exception",
            message: perUserErr.message,
          });
          console.error(`seedProSincePlaceholders error for ${userId}:`, perUserErr);
        }
      }

      console.log(
        `seedProSincePlaceholders finished. dryRun=${dryRun} ` +
          `scanned=${summary.scanned} seeded=${summary.seeded} ` +
          `wouldSeed=${summary.wouldSeed} errors=${summary.errors}`
      );

      return res.status(200).json(summary);
    } catch (err) {
      console.error("seedProSincePlaceholders fatal error:", err);
      return res.status(500).json({ error: err.message });
    }
  }
);

// ============================================
// ADMIN: BACKFILL proSince — GOOGLE PLAY API
// ============================================
// Companion to backfillProSince. For active Pro users on the Google Play
// platform, calls the Google Play Developer API to retrieve the authoritative
// subscription startTime, then writes that as proSince.
//
// Targets only users where proSinceSource === "pending_google_manual" so it
// won't disturb anyone already correctly backfilled or manually entered.
//
// Requires:
//   - GOOGLE_PLAY_SERVICE_ACCOUNT secret (JSON contents of the Play API
//     service account key file)
//   - Service account invited as a user in Google Play Console with
//     "View financial data" app permission
//   - Google Play Android Developer API enabled in the GCP project
//
// Trigger (after deploy) from browser console while logged in:
//
//   const t = await firebase.auth().currentUser.getIdToken();
//   const r = await fetch(
//     "https://europe-west2-paramind-64b8e.cloudfunctions.net/backfillProSinceGooglePlay",
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
//       body: JSON.stringify({ dryRun: true })
//     }
//   );
//   console.log(await r.json());

const { GoogleAuth } = require("google-auth-library");

const PLAY_PACKAGE_NAME = "uk.co.paramind.app";

exports.backfillProSinceGooglePlay = onRequest(
  {
    cors: true,
    secrets: ["GOOGLE_PLAY_SERVICE_ACCOUNT"],
    timeoutSeconds: 540,
  },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const uid = await verifyAuth(req);
      if (uid !== BACKFILL_ADMIN_UID) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const dryRun = req.body?.dryRun !== false;

      // Parse service account JSON from secret
      let serviceAccountCredentials;
      try {
        serviceAccountCredentials = JSON.parse(
          process.env.GOOGLE_PLAY_SERVICE_ACCOUNT
        );
      } catch (parseErr) {
        return res.status(500).json({
          error: "GOOGLE_PLAY_SERVICE_ACCOUNT secret is not valid JSON",
          detail: parseErr.message,
        });
      }

      // Build an authenticated Google API client using the service account
      const auth = new GoogleAuth({
        credentials: serviceAccountCredentials,
        scopes: ["https://www.googleapis.com/auth/androidpublisher"],
      });
      const client = await auth.getClient();
      const tokenResp = await client.getAccessToken();
      const accessToken = tokenResp?.token;
      if (!accessToken) {
        return res.status(500).json({
          error: "Failed to obtain Google Play API access token",
        });
      }

      // Find target users — active Pro on Google Play awaiting manual entry
      const snap = await db
        .collection("users")
        .where("subscriptionStatus", "==", "active")
        .where("proSinceSource", "==", "pending_google_manual")
        .get();

      const summary = {
        dryRun,
        scanned: snap.size,
        wouldUpdate_api: 0,
        wouldUpdate_fallback: 0,
        updated_api: 0,
        updated_fallback: 0,
        skipped_noFallback: 0,
        flagged_inactiveOnGoogle: [],
        details: [],
      };

      for (const doc of snap.docs) {
        const userId = doc.id;
        const data = doc.data();
        const purchaseToken = data.googlePurchaseToken;

        // First try: authoritative date from Google Play API
        let derivedDate = null;
        let source = null;
        let apiNote = null;       // why API didn't yield a date (for logging)
        let googleState = null;

        if (purchaseToken) {
          try {
            const apiUrl =
              `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/` +
              `${encodeURIComponent(PLAY_PACKAGE_NAME)}/purchases/subscriptionsv2/tokens/` +
              `${encodeURIComponent(purchaseToken)}`;

            const apiResponse = await fetch(apiUrl, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (!apiResponse.ok) {
              apiNote = `api_${apiResponse.status}`;
            } else {
              const subData = await apiResponse.json();
              googleState = subData.subscriptionState || null;

              if (subData.startTime) {
                const startDate = new Date(subData.startTime);
                if (!isNaN(startDate.getTime())) {
                  derivedDate = startDate;
                  source = "google_api";
                } else {
                  apiNote = "invalid_startTime";
                }
              } else {
                apiNote = "no_startTime";
              }
            }
          } catch (perUserErr) {
            apiNote = `exception:${perUserErr.message.slice(0, 100)}`;
            console.error(
              `backfillProSinceGooglePlay API call failed for ${userId}:`,
              perUserErr
            );
          }
        } else {
          apiNote = "no_purchase_token";
        }

        // Fallback: subscriptionUpdatedAt from Firestore (Timestamp)
        if (!derivedDate) {
          if (data.subscriptionUpdatedAt && typeof data.subscriptionUpdatedAt.toDate === "function") {
            derivedDate = data.subscriptionUpdatedAt.toDate();
            source = "google_fallback";
          } else {
            summary.skipped_noFallback++;
            summary.details.push({
              userId,
              email: data.email,
              reason: "no_api_date_and_no_fallback",
              apiNote,
            });
            continue;
          }
        }

        // Flag if Google explicitly says the subscription is not active.
        // For fallback users, googleState will usually be null (API didn't work)
        // — so this flag is essentially only meaningful when source === "google_api".
        if (googleState) {
          const looksActive =
            googleState === "SUBSCRIPTION_STATE_ACTIVE" ||
            googleState === "SUBSCRIPTION_STATE_IN_GRACE_PERIOD" ||
            googleState === "SUBSCRIPTION_STATE_ON_HOLD";
          if (!looksActive) {
            summary.flagged_inactiveOnGoogle.push({
              userId,
              email: data.email,
              googleState,
            });
          }
        }

        // Write (or pretend to)
        if (dryRun) {
          if (source === "google_api") summary.wouldUpdate_api++;
          else summary.wouldUpdate_fallback++;
          summary.details.push({
            userId,
            email: data.email,
            proSince: derivedDate.toISOString(),
            source,
            apiNote,    // null on full success, otherwise reason API didn't yield
            googleState,
            wouldWrite: true,
          });
        } else {
          await doc.ref.update({
            proSince: admin.firestore.Timestamp.fromDate(derivedDate),
            proSinceSource: source,
          });
          if (source === "google_api") summary.updated_api++;
          else summary.updated_fallback++;
          summary.details.push({
            userId,
            email: data.email,
            proSince: derivedDate.toISOString(),
            source,
            apiNote,
            googleState,
            written: true,
          });
        }
      }

      console.log(
        `backfillProSinceGooglePlay finished. dryRun=${dryRun} ` +
          `scanned=${summary.scanned} ` +
          `updated_api=${summary.updated_api} updated_fallback=${summary.updated_fallback} ` +
          `wouldUpdate_api=${summary.wouldUpdate_api} wouldUpdate_fallback=${summary.wouldUpdate_fallback} ` +
          `skipped_noFallback=${summary.skipped_noFallback}`
      );

      return res.status(200).json(summary);
    } catch (err) {
      console.error("backfillProSinceGooglePlay fatal error:", err);
      return res.status(500).json({ error: err.message });
    }
  }
);

// ============================================
// ADMIN: DEMOTE INACTIVE GOOGLE PLAY USERS
// ============================================
// Counterpart to the missing RTDN webhook handler. Finds active Pro users on
// Google Play whose Google subscriptionState is NOT one of
// {ACTIVE, IN_GRACE_PERIOD, ON_HOLD} and demotes them in Firestore.
//
// Demotion semantics (intentionally conservative):
//   - subscriptionStatus: "active" → "cancelled"
//   - Adds subscriptionDemotedAt + subscriptionDemoteReason for audit trail
//   - Preserves proSince, proSinceSource, Google fields, profile data
//   - Does NOT touch users whose API call fails (no demote on unreliable data)
//   - Does NOT touch Apple or Stripe users
//
// Trigger (after deploy) from browser console while logged in:
//
//   const t = await firebase.auth().currentUser.getIdToken();
//   const r = await fetch(
//     "https://europe-west2-paramind-64b8e.cloudfunctions.net/demoteInactiveGoogleUsers",
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
//       body: JSON.stringify({ dryRun: true })
//     }
//   );
//   console.log(await r.json());

exports.demoteInactiveGoogleUsers = onRequest(
  {
    cors: true,
    secrets: ["GOOGLE_PLAY_SERVICE_ACCOUNT"],
    timeoutSeconds: 540,
  },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const uid = await verifyAuth(req);
      if (uid !== BACKFILL_ADMIN_UID) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const dryRun = req.body?.dryRun !== false;

      let serviceAccountCredentials;
      try {
        serviceAccountCredentials = JSON.parse(
          process.env.GOOGLE_PLAY_SERVICE_ACCOUNT
        );
      } catch (parseErr) {
        return res.status(500).json({
          error: "GOOGLE_PLAY_SERVICE_ACCOUNT secret is not valid JSON",
          detail: parseErr.message,
        });
      }

      const auth = new GoogleAuth({
        credentials: serviceAccountCredentials,
        scopes: ["https://www.googleapis.com/auth/androidpublisher"],
      });
      const client = await auth.getClient();
      const tokenResp = await client.getAccessToken();
      const accessToken = tokenResp?.token;
      if (!accessToken) {
        return res.status(500).json({
          error: "Failed to obtain Google Play API access token",
        });
      }

      // Target ALL active Google Play users, not just the recent backfill bucket
      const snap = await db
        .collection("users")
        .where("subscriptionStatus", "==", "active")
        .where("subscriptionPlatform", "==", "google")
        .get();

      const summary = {
        dryRun,
        scanned: snap.size,
        wouldDemote: 0,
        demoted: 0,
        keptActive_googleSaysActive: 0,
        skipped_noToken: 0,
        skipped_apiError: 0,
        details: [],
      };

      const ACTIVE_LIKE_STATES = new Set([
        "SUBSCRIPTION_STATE_ACTIVE",
        "SUBSCRIPTION_STATE_IN_GRACE_PERIOD",
        "SUBSCRIPTION_STATE_ON_HOLD",
      ]);

      for (const doc of snap.docs) {
        const userId = doc.id;
        const data = doc.data();
        const purchaseToken = data.googlePurchaseToken;

        if (!purchaseToken) {
          summary.skipped_noToken++;
          summary.details.push({
            userId,
            email: data.email,
            decision: "skipped",
            reason: "no_purchase_token",
          });
          continue;
        }

        let googleState = null;
        try {
          const apiUrl =
            `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/` +
            `${encodeURIComponent(PLAY_PACKAGE_NAME)}/purchases/subscriptionsv2/tokens/` +
            `${encodeURIComponent(purchaseToken)}`;

          const apiResponse = await fetch(apiUrl, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          if (!apiResponse.ok) {
            summary.skipped_apiError++;
            summary.details.push({
              userId,
              email: data.email,
              decision: "skipped",
              reason: "google_api_error",
              status: apiResponse.status,
            });
            continue;
          }

          const subData = await apiResponse.json();
          googleState = subData.subscriptionState || null;
        } catch (perUserErr) {
          summary.skipped_apiError++;
          summary.details.push({
            userId,
            email: data.email,
            decision: "skipped",
            reason: "exception",
            message: perUserErr.message,
          });
          console.error(
            `demoteInactiveGoogleUsers API call failed for ${userId}:`,
            perUserErr
          );
          continue;
        }

        // Decision
        if (!googleState) {
          // API succeeded but didn't return a state — treat as unreliable
          summary.skipped_apiError++;
          summary.details.push({
            userId,
            email: data.email,
            decision: "skipped",
            reason: "no_subscription_state_in_response",
          });
          continue;
        }

        if (ACTIVE_LIKE_STATES.has(googleState)) {
          summary.keptActive_googleSaysActive++;
          summary.details.push({
            userId,
            email: data.email,
            decision: "kept_active",
            googleState,
          });
          continue;
        }

        // Demote
        if (dryRun) {
          summary.wouldDemote++;
          summary.details.push({
            userId,
            email: data.email,
            decision: "would_demote",
            googleState,
          });
        } else {
          await doc.ref.update({
            subscriptionStatus: "cancelled",
            subscriptionDemotedAt: admin.firestore.FieldValue.serverTimestamp(),
            subscriptionDemoteReason: googleState,
          });
          summary.demoted++;
          summary.details.push({
            userId,
            email: data.email,
            decision: "demoted",
            googleState,
          });
        }
      }

      console.log(
        `demoteInactiveGoogleUsers finished. dryRun=${dryRun} ` +
          `scanned=${summary.scanned} demoted=${summary.demoted} ` +
          `wouldDemote=${summary.wouldDemote} ` +
          `kept=${summary.keptActive_googleSaysActive} ` +
          `skipped_noToken=${summary.skipped_noToken} ` +
          `skipped_apiError=${summary.skipped_apiError}`
      );

      return res.status(200).json(summary);
    } catch (err) {
      console.error("demoteInactiveGoogleUsers fatal error:", err);
      return res.status(500).json({ error: err.message });
    }
  }
);

// ============================================
// ADMIN: BACKFILL proSince — APPLE APP STORE SERVER API
// ============================================
// Counterpart to backfillProSinceGooglePlay. For active Pro users on Apple
// (iOS) whose proSinceSource is "pending_apple_manual" — i.e. those who came
// from the iOS app before appleJws was stored at verification time — this
// calls Apple's App Store Server API to retrieve the authoritative
// originalPurchaseDate.
//
// Falls back to subscriptionUpdatedAt where the API can't return an answer
// (typically users with null appleOriginalTransactionId, including the
// privaterelay Hide-My-Email user). Same pattern as the Google version.
//
// Requires three secrets, all set via `firebase functions:secrets:set`:
//   APPLE_API_PRIVATE_KEY   — full contents of the downloaded .p8 file
//   APPLE_API_KEY_ID        — Key ID from App Store Connect
//   APPLE_API_ISSUER_ID     — Issuer ID from App Store Connect
//
// Trigger (after deploy) from browser console while logged in:
//
//   const t = await firebase.auth().currentUser.getIdToken();
//   const r = await fetch(
//     "https://europe-west2-paramind-64b8e.cloudfunctions.net/backfillProSinceApple",
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Authorization: `Bearer ${t}` },
//       body: JSON.stringify({ dryRun: true })
//     }
//   );
//   console.log(await r.json());

const jwt = require("jsonwebtoken");

const APPLE_BUNDLE_ID = "uk.co.paramind.app";
const APPLE_API_BASE = "https://api.storekit.itunes.apple.com/inApps/v1";

// Build a fresh signed JWT for Apple's App Store Server API.
// Lifetime: 20 minutes (Apple allows up to 1 hour but shorter is safer).
function buildAppleAuthJwt() {
  const privateKey = process.env.APPLE_API_PRIVATE_KEY;
  const keyId = process.env.APPLE_API_KEY_ID;
  const issuerId = process.env.APPLE_API_ISSUER_ID;

  if (!privateKey || !keyId || !issuerId) {
    throw new Error(
      "Missing Apple API credentials. Required secrets: " +
        "APPLE_API_PRIVATE_KEY, APPLE_API_KEY_ID, APPLE_API_ISSUER_ID."
    );
  }

  const now = Math.floor(Date.now() / 1000);

  return jwt.sign(
    {
      iss: issuerId,
      iat: now,
      exp: now + 20 * 60,
      aud: "appstoreconnect-v1",
      bid: APPLE_BUNDLE_ID,
    },
    privateKey,
    {
      algorithm: "ES256",
      header: {
        alg: "ES256",
        kid: keyId,
        typ: "JWT",
      },
    }
  );
}

// Decode the middle (payload) segment of a JWS. We trust the issuer (Apple)
// in this backfill context so we don't verify the signature — same approach
// as the existing appleJws decoding in backfillProSince.
function decodeJwsPayload(jws) {
  const parts = jws.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWS structure");
  }
  return JSON.parse(Buffer.from(parts[1], "base64").toString("utf8"));
}

exports.backfillProSinceApple = onRequest(
  {
    cors: true,
    secrets: [
      "APPLE_API_PRIVATE_KEY",
      "APPLE_API_KEY_ID",
      "APPLE_API_ISSUER_ID",
    ],
    timeoutSeconds: 540,
  },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const uid = await verifyAuth(req);
      if (uid !== BACKFILL_ADMIN_UID) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const dryRun = req.body?.dryRun !== false;

      // Single JWT shared across all per-user API calls in this run
      let appleJwtToken;
      try {
        appleJwtToken = buildAppleAuthJwt();
      } catch (jwtErr) {
        return res.status(500).json({
          error: "Failed to build Apple API JWT",
          detail: jwtErr.message,
        });
      }

      const snap = await db
        .collection("users")
        .where("subscriptionStatus", "==", "active")
        .where("proSinceSource", "==", "pending_apple_manual")
        .get();

      const summary = {
        dryRun,
        scanned: snap.size,
        wouldUpdate_api: 0,
        wouldUpdate_fallback: 0,
        updated_api: 0,
        updated_fallback: 0,
        skipped_noFallback: 0,
        flagged_inactiveOnApple: [],
        details: [],
      };

      for (const doc of snap.docs) {
        const userId = doc.id;
        const data = doc.data();
        const originalTransactionId = data.appleOriginalTransactionId;

        let derivedDate = null;
        let source = null;
        let apiNote = null;
        let appleStatus = null;        // active/expired/cancelled/etc, if discoverable

        // First try: Apple App Store Server API
        if (originalTransactionId) {
          try {
            const apiUrl = `${APPLE_API_BASE}/transactions/${encodeURIComponent(
              originalTransactionId
            )}`;

            const apiResponse = await fetch(apiUrl, {
              headers: { Authorization: `Bearer ${appleJwtToken}` },
            });

            if (!apiResponse.ok) {
              apiNote = `api_${apiResponse.status}`;
            } else {
              const apiJson = await apiResponse.json();
              if (apiJson.signedTransactionInfo) {
                const txPayload = decodeJwsPayload(apiJson.signedTransactionInfo);

                // originalPurchaseDate is ms since epoch
                if (txPayload.originalPurchaseDate) {
                  const purchaseDate = new Date(txPayload.originalPurchaseDate);
                  if (!isNaN(purchaseDate.getTime())) {
                    derivedDate = purchaseDate;
                    source = "apple_api";
                  } else {
                    apiNote = "invalid_originalPurchaseDate";
                  }
                } else {
                  apiNote = "no_originalPurchaseDate";
                }

                // Try to derive a status hint from the same payload. For a
                // valid active subscription, expiresDate is in the future.
                if (txPayload.expiresDate) {
                  appleStatus =
                    txPayload.expiresDate > Date.now() ? "active" : "expired";
                }
              } else {
                apiNote = "no_signedTransactionInfo";
              }
            }
          } catch (perUserErr) {
            apiNote = `exception:${perUserErr.message.slice(0, 100)}`;
            console.error(
              `backfillProSinceApple API call failed for ${userId}:`,
              perUserErr
            );
          }
        } else {
          apiNote = "no_originalTransactionId";
        }

        // Fallback: subscriptionUpdatedAt from Firestore (Timestamp)
        if (!derivedDate) {
          if (
            data.subscriptionUpdatedAt &&
            typeof data.subscriptionUpdatedAt.toDate === "function"
          ) {
            derivedDate = data.subscriptionUpdatedAt.toDate();
            source = "apple_fallback";
          } else {
            summary.skipped_noFallback++;
            summary.details.push({
              userId,
              email: data.email,
              reason: "no_api_date_and_no_fallback",
              apiNote,
            });
            continue;
          }
        }

        // Flag (don't skip) users that Apple thinks are expired
        if (appleStatus && appleStatus !== "active") {
          summary.flagged_inactiveOnApple.push({
            userId,
            email: data.email,
            appleStatus,
          });
        }

        // Write (or pretend to)
        if (dryRun) {
          if (source === "apple_api") summary.wouldUpdate_api++;
          else summary.wouldUpdate_fallback++;
          summary.details.push({
            userId,
            email: data.email,
            proSince: derivedDate.toISOString(),
            source,
            apiNote,
            appleStatus,
            wouldWrite: true,
          });
        } else {
          await doc.ref.update({
            proSince: admin.firestore.Timestamp.fromDate(derivedDate),
            proSinceSource: source,
          });
          if (source === "apple_api") summary.updated_api++;
          else summary.updated_fallback++;
          summary.details.push({
            userId,
            email: data.email,
            proSince: derivedDate.toISOString(),
            source,
            apiNote,
            appleStatus,
            written: true,
          });
        }
      }

      console.log(
        `backfillProSinceApple finished. dryRun=${dryRun} ` +
          `scanned=${summary.scanned} ` +
          `updated_api=${summary.updated_api} updated_fallback=${summary.updated_fallback} ` +
          `wouldUpdate_api=${summary.wouldUpdate_api} wouldUpdate_fallback=${summary.wouldUpdate_fallback} ` +
          `skipped_noFallback=${summary.skipped_noFallback}`
      );

      return res.status(200).json(summary);
    } catch (err) {
      console.error("backfillProSinceApple fatal error:", err);
      return res.status(500).json({ error: err.message });
    }
  }
);

// ============================================
// DEMOTE EXPIRED USERS — manual + scheduled
// ============================================
// Catches users whose paid access period has ended but whose
// subscriptionStatus is still "active" because the platform's "subscription
// ended" webhook never fired (or fired but wasn't processed). Looks at
// accessExpiresAt, which is set ONLY in cancellation paths:
//   - Stripe customer.subscription.updated when cancel_at_period_end is true
//   - Apple DID_CHANGE_RENEWAL_STATUS when AUTO_RENEW_DISABLED
// Google users never have accessExpiresAt set (no RTDN webhook handler);
// they're handled separately by demoteInactiveGoogleUsers.
//
// Two ways to invoke:
//   1. HTTPS POST to demoteExpiredUsers (admin-gated, dry-run capable)
//      — use this for the one-off historical cleanup
//   2. Cloud Scheduler runs scheduledDemoteExpiredUsers daily at 03:00 UTC
//      — ongoing safety net for missed webhook events
//
// Safeguards:
//   - Hard cap MAX_DEMOTIONS per run. If a run would exceed it, ABORT
//     without writing anything and send Mark an alert email.
//   - Per-user error catching: one user's failure won't halt the run.
//   - Email notification of every actual demotion via sendNotificationEmail.

const MAX_DEMOTIONS_PER_RUN_DEFAULT = 5;

// Parse accessExpiresAt — Apple stores it as ISO string, Stripe as Timestamp
function parseAccessExpiresAt(value) {
  if (!value) return null;
  if (typeof value.toDate === "function") return value.toDate(); // Firestore Timestamp
  if (value instanceof Date) return value;
  if (typeof value === "string") {
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}

// Shared logic used by both the HTTPS endpoint and the scheduled function.
// Returns a summary object describing what happened (or would have happened).
async function performExpiredUsersScan({ dryRun, maxDemotions, source }) {
  const now = new Date();

  const snap = await db
    .collection("users")
    .where("subscriptionStatus", "==", "active")
    .get();

  // First pass: classify every active user. NO writes yet — we want to know
  // the full demotion count before deciding whether to proceed.
  const toDemote = [];
  let noExpiry = 0;
  let futureExpiry = 0;
  const futureExpiryDetails = [];

  for (const doc of snap.docs) {
    const data = doc.data();
    const expiry = parseAccessExpiresAt(data.accessExpiresAt);

    if (!expiry) {
      noExpiry++;
      continue;
    }
    if (expiry >= now) {
      futureExpiry++;
      futureExpiryDetails.push({
        userId: doc.id,
        email: data.email,
        platform: data.subscriptionPlatform || "unknown",
        accessExpiresAt: expiry.toISOString(),
      });
      continue;
    }

    // expiry < now → candidate for demotion
    toDemote.push({
      doc,
      userInfo: {
        userId: doc.id,
        email: data.email,
        platform: data.subscriptionPlatform || "unknown",
        cancelledAt: data.cancelledAt
          ? (typeof data.cancelledAt.toDate === "function"
              ? data.cancelledAt.toDate().toISOString()
              : data.cancelledAt)
          : null,
        accessExpiresAt: expiry.toISOString(),
      },
    });
  }

  const summary = {
    source,
    dryRun,
    timestamp: now.toISOString(),
    scanned: snap.size,
    keptActive_noExpiry: noExpiry,
    keptActive_futureExpiry: futureExpiry,
    wouldDemote: 0,
    demoted: 0,
    errors: 0,
    safetyLimitTriggered: false,
    maxDemotions,
    details: [],
    futureExpiryDetails: futureExpiryDetails.slice(0, 20), // preview, not exhaustive
  };

  // SAFETY LIMIT — refuse to act if too many demotions in one run
  if (toDemote.length > maxDemotions) {
    summary.safetyLimitTriggered = true;
    summary.wouldDemote = toDemote.length;
    summary.details = toDemote.map((t) => ({
      ...t.userInfo,
      decision: "blocked_by_safety_limit",
    }));

    console.warn(
      `demoteExpiredUsers safety limit hit (source=${source}). ` +
        `Wanted to demote ${toDemote.length}, limit is ${maxDemotions}. ` +
        `No writes performed.`
    );

    // Always send the alert email when this triggers (regardless of dryRun)
    try {
      await sendNotificationEmail(
        `⚠️ Paramind: demoteExpiredUsers safety limit hit (${toDemote.length} > ${maxDemotions})`,
        `The ${source} demoteExpiredUsers run wanted to demote ${toDemote.length} ` +
          `users, exceeding the safety limit of ${maxDemotions}. ` +
          `NO DEMOTIONS WERE PERFORMED.\n\n` +
          `Users that would have been demoted:\n\n` +
          toDemote
            .map(
              (t) =>
                `- ${t.userInfo.email} (${t.userInfo.platform}), accessExpiresAt ${t.userInfo.accessExpiresAt}`
            )
            .join("\n") +
          `\n\nInvestigate before proceeding. Manually demote in Firebase Console, ` +
          `or temporarily raise the maxDemotions parameter on a manual run.`
      );
    } catch (emailErr) {
      console.error("Failed to send safety-limit alert email:", emailErr.message);
    }

    return summary;
  }

  // Below safety limit — proceed with demotion (unless dryRun)
  for (const { doc, userInfo } of toDemote) {
    try {
      if (dryRun) {
        summary.wouldDemote++;
        summary.details.push({ ...userInfo, decision: "would_demote" });
      } else {
        await doc.ref.update({
          subscriptionStatus: "cancelled",
          subscriptionDemotedAt: admin.firestore.FieldValue.serverTimestamp(),
          subscriptionDemoteReason: "access_expired",
        });
        summary.demoted++;
        summary.details.push({ ...userInfo, decision: "demoted" });
      }
    } catch (perUserErr) {
      summary.errors++;
      summary.details.push({
        ...userInfo,
        decision: "error",
        error: perUserErr.message,
      });
      console.error(
        `demoteExpiredUsers failed for ${userInfo.userId}:`,
        perUserErr
      );
    }
  }

  // Send notification email IF we actually demoted anyone
  if (!dryRun && summary.demoted > 0) {
    try {
      await sendNotificationEmail(
        `Paramind: ${summary.demoted} user${summary.demoted === 1 ? "" : "s"} demoted (expired access)`,
        `The ${source} demoteExpiredUsers run demoted ${summary.demoted} ` +
          `user${summary.demoted === 1 ? "" : "s"} whose accessExpiresAt is in the past:\n\n` +
          summary.details
            .filter((d) => d.decision === "demoted")
            .map(
              (d) =>
                `- ${d.email} (${d.platform}), expired ${d.accessExpiresAt}`
            )
            .join("\n") +
          `\n\nAll demoted users have:\n` +
          `  - subscriptionStatus: "cancelled"\n` +
          `  - subscriptionDemotedAt: now\n` +
          `  - subscriptionDemoteReason: "access_expired"\n` +
          `Their proSince and platform fields are preserved.`
      );
    } catch (emailErr) {
      console.error("Failed to send demotion summary email:", emailErr.message);
    }
  }

  console.log(
    `demoteExpiredUsers (source=${source}) finished. dryRun=${dryRun} ` +
      `scanned=${summary.scanned} demoted=${summary.demoted} ` +
      `wouldDemote=${summary.wouldDemote} errors=${summary.errors}`
  );

  return summary;
}

// HTTPS endpoint — for manual triggering and dry-runs
exports.demoteExpiredUsers = onRequest(
  { cors: true, secrets: ["GMAIL_APP_PASSWORD"] },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const uid = await verifyAuth(req);
      if (uid !== BACKFILL_ADMIN_UID) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const dryRun = req.body?.dryRun !== false;
      const maxDemotions =
        typeof req.body?.maxDemotions === "number" && req.body.maxDemotions > 0
          ? req.body.maxDemotions
          : MAX_DEMOTIONS_PER_RUN_DEFAULT;

      const summary = await performExpiredUsersScan({
        dryRun,
        maxDemotions,
        source: "manual",
      });

      return res.status(200).json(summary);
    } catch (err) {
      console.error("demoteExpiredUsers fatal error:", err);
      return res.status(500).json({ error: err.message });
    }
  }
);

// Scheduled — runs daily at 03:00 UTC
exports.scheduledDemoteExpiredUsers = onSchedule(
  {
    schedule: "0 3 * * *",
    timeZone: "Etc/UTC",
    secrets: ["GMAIL_APP_PASSWORD"],
    retryCount: 1,
  },
  async () => {
    try {
      await performExpiredUsersScan({
        dryRun: false,
        maxDemotions: MAX_DEMOTIONS_PER_RUN_DEFAULT,
        source: "scheduled",
      });
    } catch (err) {
      console.error("scheduledDemoteExpiredUsers fatal error:", err);
      try {
        await sendNotificationEmail(
          "⚠️ Paramind: scheduledDemoteExpiredUsers crashed",
          `The daily scheduledDemoteExpiredUsers run failed:\n\n${err.message}\n\n${err.stack || ""}`
        );
      } catch (emailErr) {
        // Best-effort logging only
        console.error("Failed to send crash alert email:", emailErr.message);
      }
    }
  }
);

// ============================================
// ADMIN EMAIL — POSTMARK INTEGRATION
// ============================================

const postmark = require("postmark");

const ADMIN_EMAILS = ['markdevon@gmail.com'];
const EMAIL_FROM = 'Paramind <hello@paramind.co.uk>';
const EMAIL_REPLY_TO = 'mark@paramind.co.uk';

/**
 * Verify the request is from an admin user.
 * Reuses the same Bearer-token pattern as verifyAuth() but additionally
 * checks the decoded token's email is on the ADMIN_EMAILS allowlist.
 */
async function verifyAdmin(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized: No token provided");
  }
  const token = authHeader.split("Bearer ")[1];
  const decodedToken = await admin.auth().verifyIdToken(token);
  const email = (decodedToken.email || '').toLowerCase();
  if (!ADMIN_EMAILS.includes(email)) {
    throw new Error("Forbidden: Admin access required");
  }
  return decodedToken;
}

/**
 * Wrap Quill-produced HTML fragment in a proper email shell.
 * Keeps styling inline (most email clients strip <style> blocks).
 */
function wrapEmailHtml(bodyHtml, subject) {
  const safeSubject = String(subject || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${safeSubject}</title>
</head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;line-height:1.6;color:#212529;background:#f5f5f5;">
<div style="max-width:600px;margin:0 auto;background:#ffffff;padding:30px;">
${bodyHtml}
<hr style="border:none;border-top:1px solid #e0e0e0;margin:40px 0 20px;">
<p style="font-size:12px;color:#888;text-align:center;margin:0;line-height:1.4;">
Paramind &middot; UK Paramedic Education<br>
<a href="https://paramind.co.uk" style="color:#888;text-decoration:underline;">paramind.co.uk</a> &middot;
<a href="mailto:unsubscribe@paramind.co.uk?subject=Unsubscribe" style="color:#888;text-decoration:underline;">Unsubscribe</a>
</p>
</div>
</body>
</html>`;
}

/**
 * Generate a plain-text version of HTML for Postmark's TextBody field.
 * Not perfect (no library), but enough to satisfy spam filters and
 * give accessible text fallback.
 */
function htmlToText(html) {
  return String(html || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Escape user-supplied strings being inserted into HTML content. */
function escapeEmailHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * POST /sendGeneralEmail
 * Admin-only. Sends a one-off email to a supplied list of recipients
 * via Postmark, performing {firstName} substitution per recipient.
 *
 * Body: {
 *   subject:    string (may contain {firstName}),
 *   htmlBody:   string of Quill HTML (may contain {firstName}),
 *   recipients: [{ firstName: string, email: string }]   // max 5000
 * }
 *
 * Response: { sent: int, failed: int, errors: [{ email, code, message }] }
 *
 * Logs each send to Firestore collection emailSendLog/{autoId}.
 */
exports.sendGeneralEmail = onRequest(
  {
    cors: true,
    secrets: ["POSTMARK_API_TOKEN"],
    timeoutSeconds: 540,
    memory: '512MiB'
  },
  async (req, res) => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Admin auth
    try {
      await verifyAdmin(req);
    } catch (err) {
      console.warn('sendGeneralEmail auth failed:', err.message);
      return res.status(err.message.startsWith('Forbidden') ? 403 : 401)
        .json({ error: err.message });
    }

    // Validate body
    const { subject, htmlBody, recipients } = req.body || {};
    if (!subject || typeof subject !== 'string') {
      return res.status(400).json({ error: 'subject is required' });
    }
    if (!htmlBody || typeof htmlBody !== 'string') {
      return res.status(400).json({ error: 'htmlBody is required' });
    }
    if (!Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({ error: 'recipients must be a non-empty array' });
    }
    if (recipients.length > 5000) {
      return res.status(400).json({ error: 'Maximum 5000 recipients per send' });
    }
    for (const r of recipients) {
      if (!r || typeof r.firstName !== 'string' || typeof r.email !== 'string'
          || !r.firstName.trim() || !r.email.trim()) {
        return res.status(400).json({
          error: 'Each recipient must have a non-empty firstName and email'
        });
      }
    }

    // Build personalised messages
    const messages = recipients.map(r => {
      const firstName = r.firstName.trim();
      const personalisedSubject = subject.replace(/\{firstName\}/g, firstName);
      const personalisedBody    = htmlBody.replace(/\{firstName\}/g, escapeEmailHtml(firstName));
      return {
        From: EMAIL_FROM,
        To: r.email.trim(),
        ReplyTo: EMAIL_REPLY_TO,
        Subject: personalisedSubject,
        HtmlBody: wrapEmailHtml(personalisedBody, personalisedSubject),
        TextBody: htmlToText(personalisedBody),
        MessageStream: 'outbound',
      };
    });

    // Send in batches (Postmark limit: 500 per call)
    let allResults = [];
    try {
      const client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN);
      const CHUNK = 500;
      for (let i = 0; i < messages.length; i += CHUNK) {
        const chunk = messages.slice(i, i + CHUNK);
        const batchResults = await client.sendEmailBatch(chunk);
        allResults = allResults.concat(batchResults);
      }
    } catch (err) {
      console.error('sendGeneralEmail Postmark call failed:', err);
      return res.status(500).json({
        error: 'Postmark request failed: ' + (err.message || 'unknown error')
      });
    }

    const sent   = allResults.filter(r => r.ErrorCode === 0).length;
    const failed = allResults.length - sent;
    const errors = allResults
      .filter(r => r.ErrorCode !== 0)
      .map(r => ({ email: r.To, code: r.ErrorCode, message: r.Message }));

    // Best-effort audit log
    try {
      await db.collection('emailSendLog').add({
        type: 'general',
        subject: subject,
        totalRecipients: recipients.length,
        sent: sent,
        failed: failed,
        errors: errors.slice(0, 20),
        sentAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } catch (logErr) {
      console.error('Failed to write emailSendLog:', logErr.message);
    }

    return res.status(200).json({
      sent: sent,
      failed: failed,
      errors: errors.slice(0, 50)
    });
  }
);
