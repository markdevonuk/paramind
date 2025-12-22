/* ============================================
   PARAMIND - Chat Functionality
   Connected to Firebase Backend
   Scenarios loaded from scenarios.js
   ============================================ */

// ==================== STATE ====================

const chatState = {
    messages: [],
    conversationHistory: [], // For API calls
    isLoading: false,
    currentScenario: null,
    messagesRemaining: 5,
    isPro: false,
    userTrust: 'SWAST',
    currentView: 'chatView',
    authToken: null
};

// ==================== ASSESSMENT PROMPTS ====================

const ASSESSMENT_PROMPTS = {
    obs: {
        name: "Observations",
        prompt: "The paramedic is now taking a full set of vital signs observations on this patient. Based on the patient's condition, provide the following in a clear format: Heart Rate, Blood Pressure, Respiratory Rate, SpO2, Temperature, GCS (with breakdown E/V/M), Blood Glucose, and Pain Score out of 10. Present these as realistic findings that match the patient's underlying condition. Respond as the findings the paramedic would see/measure, not as dialogue."
    },
    ecg: {
        name: "ECG",
        prompt: "The paramedic is performing a 12-lead ECG on this patient. Based on the patient's underlying condition, describe what the ECG shows including: rate, rhythm (regular/irregular), P waves, PR interval, QRS width, ST segments (elevation/depression in which leads), T waves, QTc, and overall interpretation. Present this as what the paramedic would see on the monitor/printout."
    },
    chest: {
        name: "Chest Examination",
        prompt: "The paramedic is performing a systematic chest examination on this patient. Based on the patient's condition, describe findings for: INSPECTION (respiratory effort, chest wall movement, symmetry, accessory muscle use, scars, deformity), PALPATION (trachea position, chest expansion, tenderness, crepitus), PERCUSSION (resonance/dullness and where), AUSCULTATION (breath sounds in all zones - are they normal vesicular, reduced, absent? Any added sounds like wheeze, crackles, stridor?). Present as clinical findings, not dialogue."
    },
    abdo: {
        name: "Abdominal Assessment",
        prompt: "The paramedic is performing an abdominal examination on this patient. Based on the patient's condition, describe findings for: INSPECTION (distension, scars, bruising, pulsation), AUSCULTATION (bowel sounds - present/absent/hyperactive), PALPATION (soft/rigid, tenderness location, guarding, rebound, masses, organomegaly, pulsatile mass). Include relevant special signs if applicable (Murphy's, Rovsing's, etc). Present as clinical findings the paramedic would observe."
    },
    neuro: {
        name: "Neurological Exam",
        prompt: "The paramedic is performing a neurological examination on this patient. Based on the patient's condition, provide: GCS breakdown (Eye/Verbal/Motor with specific responses), pupil size and reactivity (PERRLA or abnormality), limb power (grade 0-5 for each limb), sensation, tone, coordination if testable, and any focal neurological deficits. Present as clinical findings, not patient dialogue."
    },
    skin: {
        name: "Skin Assessment",
        prompt: "The paramedic is assessing the patient's skin. Based on the patient's condition, describe: colour (pink, pale, flushed, cyanosed, mottled, jaundiced), temperature (warm, cool, cold), moisture (dry, clammy, diaphoretic), capillary refill time, turgor, and any visible rashes, wounds, track marks, or skin abnormalities. Present as what the paramedic observes."
    },
    fast: {
        name: "FAST Assessment",
        prompt: "The paramedic is performing a FAST stroke assessment on this patient. Respond in character as the patient attempting each test. For FACE: describe what happens when asked to smile (symmetrical or drooping, which side?). For ARMS: describe what happens when asked to hold both arms out with eyes closed for 10 seconds (drift? which side?). For SPEECH: describe what happens when asked to repeat 'you can't teach an old dog new tricks' (normal, slurred, garbled, unable?). Also state the TIME when symptoms were first noticed. Stay in character throughout."
    },
    mend: {
        name: "MEND Assessment",
        prompt: "The paramedic is performing a MEND (Miami Emergency Neurologic Deficit) assessment on this patient. Based on the patient's condition, provide findings for: MENTAL STATUS (alert, confused, obtunded), EYES (gaze deviation, visual field defect, pupil abnormality), NEGLECT (does patient ignore one side?), DEFICITS in speech (aphasia type) and motor function (face, arm, leg weakness with laterality). Present as clinical findings matching the patient's underlying condition."
    },
    pain: {
        name: "Pain Assessment",
        prompt: "The paramedic is asking about the patient's pain using SOCRATES. Respond in character as the patient answering questions about: SITE (where exactly is the pain? point to it), ONSET (when did it start? what were you doing?), CHARACTER (what does it feel like - sharp, dull, burning, crushing, colicky?), RADIATION (does it go anywhere else?), ASSOCIATED symptoms (anything else - nausea, sweating, SOB?), TIMING (constant or comes and goes? how long does it last?), EXACERBATING/RELIEVING (what makes it better or worse?), SEVERITY (out of 10, where 10 is worst imaginable). Answer naturally as the patient would, not using medical terminology."
    },
    wound: {
        name: "Wound Assessment",
        prompt: "The paramedic is assessing any wounds on this patient. Based on the patient's condition, describe: location and number of wounds, size (length x width x depth), wound type (laceration, abrasion, puncture, avulsion, incision), edges (clean, ragged, contused), bleeding status (arterial spurting, venous oozing, controlled, not bleeding), contamination, visible structures (fat, muscle, tendon, bone), and neurovascular status distal to the wound. Present as clinical findings."
    },
    mobility: {
        name: "Mobility Assessment",
        prompt: "The paramedic is assessing the patient's mobility. Respond in character as the patient (or describe what happens when the patient attempts movement). Can they: move all four limbs voluntarily? grip with both hands equally? lift legs off the bed? sit up independently? stand with assistance? stand independently? walk with assistance? walk independently? Also describe their BASELINE mobility before this incident - do they normally use any aids? Are they normally housebound? Present responses naturally."
    },
    history: {
        name: "Full History",
        prompt: "The paramedic is taking a SAMPLE history. Respond in character as the patient (or relative/bystander if patient cannot communicate) providing: SIGNS & SYMPTOMS (what's wrong today in their own words), ALLERGIES (any known allergies to medications, foods, or other substances), MEDICATIONS (what tablets/medicines do they take - they may not know exact names), PAST MEDICAL HISTORY (what illnesses, operations, or hospital admissions have they had), LAST ORAL INTAKE (when did they last eat and drink, and what), EVENTS (what were they doing when this started, what happened leading up to calling 999). Answer naturally as the patient would."
    },
    meds: {
        name: "Medications",
        prompt: "The paramedic is asking about medications. Respond in character as the patient (or describe what medication boxes/dosette boxes are visible). What regular medications do they take? Include the name (patient may only know colours or shapes), dose if known, frequency, and what it's for if they know. Any recent changes to medications? Are they compliant or do they forget doses? Any over-the-counter medications, inhalers, or supplements? Do they have a medications list or repeat prescription form available?"
    },
    social: {
        name: "Social History",
        prompt: "The paramedic is asking about the patient's social situation. Respond in character as the patient (or relative if present). Where do they live - house, flat, bungalow, care home? Do they live alone or with someone? Any stairs to access or inside the property? How do they normally manage day-to-day - independent, need help with washing/dressing, carers visit? If carers, how often? Any family nearby? Do they drive? What's their occupation or are they retired? Any recent life events or stressors? Smoking and alcohol history?"
    },
    scene: {
        name: "Scene Assessment",
        prompt: "The paramedic is looking around the scene/environment. Based on the patient's condition and scenario context, describe what the paramedic might observe: Is the environment safe? Is it clean/cluttered? Any medication packets, pill bottles, or dosette boxes visible (what medications)? Any alcohol bottles or drug paraphernalia? Any medical equipment like oxygen concentrators, hospital bed, walking aids? Any hazards? Any signs of a fall or struggle? Any clues about what happened? Any other people present? Present as observations the paramedic would make on scene."
    }
};

// ==================== DOM ELEMENTS ====================

const elements = {
    // Views
    chatView: document.getElementById('chatView'),
    scenariosView: document.getElementById('scenariosView'),
    patientView: document.getElementById('patientView'),
    
    // Chat elements
    chatMessages: document.getElementById('chatMessages'),
    chatForm: document.getElementById('chatForm'),
    messageInput: document.getElementById('messageInput'),
    sendBtn: document.getElementById('sendBtn'),
    welcomeMessage: document.getElementById('welcomeMessage'),
    
    // Navigation
    navItems: document.querySelectorAll('.nav-item'),
    
    // Message counter
    messagesUsed: document.getElementById('messagesUsed'),
    messageLimitBanner: document.getElementById('messageLimitBanner'),
    
    // User info
    userTrust: document.getElementById('userTrust'),
    userEmail: document.getElementById('userEmail'),
    
    // Scenario elements
    scenarioCategories: document.getElementById('scenarioCategories'),
    scenarioSubcategory: document.getElementById('scenarioSubcategory'),
    scenarioList: document.getElementById('scenarioList'),
    categoryGrid: document.getElementById('categoryGrid'),
    backToScenarioCategories: document.getElementById('backToScenarioCategories'),
    subcategoryTitle: document.getElementById('subcategoryTitle'),
    subcategoryDescription: document.getElementById('subcategoryDescription'),
    
    // Modal
    scenarioModal: document.getElementById('scenarioModal'),
    startScenarioBtn: document.getElementById('startScenarioBtn'),
    modalPatient: document.getElementById('modalPatient'),
    modalCategory: document.getElementById('modalCategory'),
    modalComplaint: document.getElementById('modalComplaint'),
    modalDetails: document.getElementById('modalDetails'),
    mdtAlertBanner: document.getElementById('mdtAlertBanner'),
    
// Assessment toolbar
    assessmentToolbar: document.getElementById('assessmentToolbar'),
    
    // Working impression elements
    workingImpressionToolbar: document.getElementById('workingImpressionToolbar'),
    workingImpressionBtn: document.getElementById('workingImpressionBtn'),
    workingImpressionModal: document.getElementById('workingImpressionModal'),
    workingImpressionInput: document.getElementById('workingImpressionInput'),
    impressionReasoning: document.getElementById('impressionReasoning'),
    submitImpressionBtn: document.getElementById('submitImpressionBtn'),
    
    // Patient form
    patientForm: document.getElementById('patientForm'),
    
    // Random scenario button
    randomScenarioBtn: document.getElementById('randomScenarioBtn'),
    
    // Upgrade buttons
    upgradeBtn: document.getElementById('upgradeBtn'),
    upgradeLinkBanner: document.getElementById('upgradeLinkBanner')
};

// ==================== FIREBASE AUTH ====================

let auth = null;
let currentUser = null;

async function initializeAuth() {
    const { getAuth, onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
    const { firebaseConfig } = await import('./firebase-config.js');
    
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    
    return new Promise((resolve) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                currentUser = user;
                chatState.authToken = await user.getIdToken();
                
                if (elements.userEmail) {
                    elements.userEmail.textContent = user.email;
                }
                
                await fetchUserProfile();
                resolve(true);
            } else {
                window.location.href = 'login.html';
                resolve(false);
            }
        });
    });
}

async function getAuthToken() {
    if (currentUser) {
        chatState.authToken = await currentUser.getIdToken(true);
        return chatState.authToken;
    }
    throw new Error('Not authenticated');
}

// ==================== API FUNCTIONS ====================

async function fetchUserProfile() {
    try {
        const token = await getAuthToken();
        const response = await fetch(`${window.paramind.CONFIG.api.baseUrl}${window.paramind.CONFIG.api.user}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }
        
        const data = await response.json();
        
        chatState.userTrust = data.trust;
        chatState.isPro = data.isPro;
        chatState.messagesRemaining = data.messagesRemaining;
        
        if (elements.userTrust) {
            elements.userTrust.textContent = data.trust;
        }
        
        updateMessageCounter();
        
        if (chatState.isPro && elements.messageLimitBanner) {
            elements.messageLimitBanner.style.display = 'none';
        }
        
        return data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        const cached = window.paramind.storage.getUser();
        if (cached) {
            chatState.userTrust = cached.trust || 'SWAST';
            chatState.isPro = cached.subscriptionStatus === 'active';
        }
    }
}

async function sendMessageToAPI(message) {
    const token = await getAuthToken();
    
    const response = await fetch(`${window.paramind.CONFIG.api.baseUrl}${window.paramind.CONFIG.api.chat}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: message,
            conversationHistory: chatState.conversationHistory.slice(-10),
            scenarioId: chatState.currentScenario || null
        })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        if (response.status === 429) {
            throw new Error('LIMIT_REACHED');
        }
        throw new Error(data.error || 'Failed to send message');
    }
    
    if (data.remaining !== undefined && data.remaining >= 0) {
        chatState.messagesRemaining = data.remaining;
        updateMessageCounter();
    }
    
    return data.message;
}

async function createCheckoutSession() {
    try {
        const token = await getAuthToken();
        
        const response = await fetch(`${window.paramind.CONFIG.api.baseUrl}${window.paramind.CONFIG.api.createCheckout}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to create checkout session');
        }
        
        window.location.href = data.url;
    } catch (error) {
        console.error('Checkout error:', error);
        alert('Failed to start checkout. Please try again.');
    }
}

// ==================== INITIALIZATION ====================

async function initChat() {
    const isAuthenticated = await initializeAuth();
    if (!isAuthenticated) return;
    
    // Build the category grid from scenarios.js data
    buildCategoryGrid();
    
    setupEventListeners();
    
    // Check for successful payment
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        showPaymentSuccess();
        window.history.replaceState({}, document.title, 'chat.html');
    }
}

function buildCategoryGrid() {
    if (!elements.categoryGrid || !window.scenarioData) return;
    
    const categories = window.scenarioData.SCENARIO_CATEGORIES;
    const counts = window.scenarioData.getScenarioCountByCategory();
    
    let html = '';
    for (const [key, cat] of Object.entries(categories)) {
        html += `
            <div class="category-card" data-category="${key}">
                <div class="icon"><i class="bi ${cat.icon}"></i></div>
                <h3>${cat.title}</h3>
                <span class="count">${counts[key]} scenarios</span>
            </div>
        `;
    }
    
    elements.categoryGrid.innerHTML = html;
    
    // Add click listeners
    elements.categoryGrid.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            showScenarioSubcategory(category);
        });
    });
}

function showPaymentSuccess() {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success mx-2 my-2';
    successDiv.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-check-circle-fill me-2"></i>
            <div>
                <strong>Welcome to Paramind Pro!</strong>
                <div class="small">Your subscription is now active. Enjoy unlimited messages!</div>
            </div>
        </div>
    `;
    elements.chatMessages.insertBefore(successDiv, elements.chatMessages.firstChild);
    fetchUserProfile();
}

// ==================== EVENT LISTENERS ====================

function setupEventListeners() {
    // Bottom navigation
    elements.navItems.forEach(item => {
        item.addEventListener('click', () => {
            const viewId = item.dataset.view;
            switchView(viewId);
        });
    });
    
    // Chat form
    if (elements.chatForm) {
        elements.chatForm.addEventListener('submit', handleSendMessage);
    }
    
    // Auto-resize textarea
    if (elements.messageInput) {
        elements.messageInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
        
        elements.messageInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                elements.chatForm.dispatchEvent(new Event('submit'));
            }
        });
    }
    
    // Back button for scenarios
    if (elements.backToScenarioCategories) {
        elements.backToScenarioCategories.addEventListener('click', (e) => {
            e.preventDefault();
            hideScenarioSubcategory();
        });
    }
    
    // Start scenario button in modal
    if (elements.startScenarioBtn) {
        elements.startScenarioBtn.addEventListener('click', startScenario);
    }
    
    // Patient form
    if (elements.patientForm) {
        elements.patientForm.addEventListener('submit', handlePatientForm);
    }
    
    // Random scenario button
    if (elements.randomScenarioBtn) {
        elements.randomScenarioBtn.addEventListener('click', startRandomScenario);
    }
    
    // Upgrade buttons
    if (elements.upgradeBtn) {
        elements.upgradeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            createCheckoutSession();
        });
    }
    
    if (elements.upgradeLinkBanner) {
        elements.upgradeLinkBanner.addEventListener('click', (e) => {
            e.preventDefault();
            createCheckoutSession();
        });
    }
    
    // Working impression button
    if (elements.workingImpressionBtn) {
        elements.workingImpressionBtn.addEventListener('click', openWorkingImpressionModal);
    }
    
    // Submit impression button
    if (elements.submitImpressionBtn) {
        elements.submitImpressionBtn.addEventListener('click', submitWorkingImpression);
    }
    
    
    // Assessment dropdown items
    document.querySelectorAll('[data-assessment]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const assessmentType = item.dataset.assessment;
            handleAssessment(assessmentType);
        });
    });
}

// ==================== VIEW NAVIGATION ====================

function switchView(viewId) {
    elements.navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.view === viewId);
    });
    
    document.querySelectorAll('.content-view').forEach(view => {
        view.classList.remove('active');
    });
    
    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.add('active');
    }
    
    chatState.currentView = viewId;
    
    if (viewId === 'scenariosView') {
        hideScenarioSubcategory();
    }
}

// ==================== SCENARIO NAVIGATION ====================

function showScenarioSubcategory(categoryId) {
    const category = window.scenarioData.SCENARIO_CATEGORIES[categoryId];
    const scenarios = window.scenarioData.getScenariosByCategory(categoryId);
    
    if (!category || !scenarios.length) return;
    
    elements.subcategoryTitle.textContent = category.title + ' Scenarios';
    elements.subcategoryDescription.textContent = 'Respond to incoming calls';
    
    // Build MDT-style cards
    elements.scenarioList.innerHTML = scenarios.map((scenario, index) => {
        const d = scenario.dispatch;
        const genderDisplay = d.gender === 'M' ? 'Male' : d.gender === 'F' ? 'Female' : '';
        const ageDisplay = d.age ? `${d.age}y` : '';
        const patientDisplay = d.name ? `${d.name} (${ageDisplay} ${genderDisplay})` : 'Multiple Patients';
        const incidentNum = `INC-${Date.now().toString().slice(-6)}-${(index + 1).toString().padStart(2, '0')}`;
        
        const catClass = d.category === 1 ? 'cat-1' : d.category === 2 ? 'cat-2' : 'cat-3';
        
        return `
            <div class="mdt-card" data-scenario-id="${scenario.id}">
                <div class="mdt-header">
                    <span class="mdt-incident">${incidentNum}</span>
                    <span class="mdt-category ${catClass}">CAT ${d.category}</span>
                </div>
                <div class="mdt-body">
                    <div class="mdt-patient">${patientDisplay}</div>
                    <div class="mdt-complaint">${d.chiefComplaint}</div>
                    <div class="mdt-details">${d.details}</div>
                </div>
                <div class="mdt-footer">
                    <span class="mdt-status">AWAITING RESPONSE</span>
                    <span class="mdt-respond"><i class="bi bi-chevron-right"></i></span>
                </div>
            </div>
        `;
    }).join('');
    
    // Add click listeners to MDT cards
    elements.scenarioList.querySelectorAll('.mdt-card').forEach(card => {
        card.addEventListener('click', () => {
            const scenarioId = card.dataset.scenarioId;
            openScenarioModal(scenarioId);
        });
    });
    
    elements.scenarioCategories.style.display = 'none';
    elements.scenarioSubcategory.style.display = 'block';
}

function hideScenarioSubcategory() {
    elements.scenarioCategories.style.display = 'block';
    elements.scenarioSubcategory.style.display = 'none';
}

function openScenarioModal(scenarioId) {
    const scenario = window.scenarioData.getScenarioById(scenarioId);
    if (!scenario) return;
    
    chatState.currentScenario = scenarioId;
    
    const d = scenario.dispatch;
    const genderDisplay = d.gender === 'M' ? 'Male' : d.gender === 'F' ? 'Female' : '';
    const ageDisplay = d.age ? `${d.age}y` : '';
    const patientDisplay = d.name ? `${d.name} (${ageDisplay} ${genderDisplay})` : 'Multiple Patients';
    
    elements.modalPatient.textContent = patientDisplay;
    elements.modalCategory.innerHTML = `<span class="mdt-category ${d.category === 1 ? 'cat-1' : d.category === 2 ? 'cat-2' : 'cat-3'}">CATEGORY ${d.category}</span>`;
    elements.modalComplaint.textContent = d.chiefComplaint;
    elements.modalDetails.textContent = d.details;
    
    // Reset and show alert banner animation
    if (elements.mdtAlertBanner) {
        elements.mdtAlertBanner.style.animation = 'none';
        elements.mdtAlertBanner.offsetHeight; // Trigger reflow
        elements.mdtAlertBanner.style.animation = 'flash 0.5s ease-in-out 3';
    }
    
    const modal = new bootstrap.Modal(elements.scenarioModal);
    modal.show();
}

function startScenario() {
    if (!chatState.currentScenario) return;
    
    const scenario = window.scenarioData.getScenarioById(chatState.currentScenario);
    if (!scenario) return;
    
    const modal = bootstrap.Modal.getInstance(elements.scenarioModal);
    modal.hide();
    
    switchView('chatView');
    
    const scenarioId = chatState.currentScenario;
    clearChat();
    chatState.currentScenario = scenarioId;
    
    if (elements.welcomeMessage) {
        elements.welcomeMessage.style.display = 'none';
    }
    
    // Create scenario banner
    const d = scenario.dispatch;
    const genderDisplay = d.gender === 'M' ? 'Male' : d.gender === 'F' ? 'Female' : '';
    const ageDisplay = d.age ? `${d.age}y` : '';
    const patientDisplay = d.name ? `${d.name} (${ageDisplay} ${genderDisplay})` : 'Multiple Patients';
    
    const bannerDiv = document.createElement('div');
    bannerDiv.className = 'alert alert-info mx-2 my-2';
    bannerDiv.style.background = 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)';
    bannerDiv.style.border = '1px solid #0f3460';
    bannerDiv.style.color = '#ffffff';
    bannerDiv.style.fontFamily = "'JetBrains Mono', monospace";
    bannerDiv.innerHTML = `
        <div class="d-flex align-items-center justify-content-between">
            <div>
                <strong style="color: #00d9ff;">📟 ACTIVE INCIDENT</strong>
                <div class="small" style="color: #e94560;">${patientDisplay} - ${d.chiefComplaint}</div>
            </div>
            <span class="mdt-category ${d.category === 1 ? 'cat-1' : d.category === 2 ? 'cat-2' : 'cat-3'}" style="font-size: 0.7rem;">CAT ${d.category}</span>
        </div>
        <div class="small mt-2" style="color: #8892b0;">Assess the patient and provide your working diagnosis</div>
    `;
    elements.chatMessages.appendChild(bannerDiv);
    
    // Get and display starter message
    const starterMessage = scenario.starterMessage;
    addMessage('assistant', starterMessage);
    
    chatState.conversationHistory.push({
        role: 'assistant',
        content: starterMessage
    });
    
    // Add system prompt context (this will be used by the API)
    chatState.conversationHistory.push({
        role: 'system',
        content: window.scenarioData.getScenarioSystemPrompt(scenarioId)
    });
    
// Show assessment toolbar and working impression button for scenarios
    showAssessmentToolbar();
    showWorkingImpressionToolbar();
}

function startRandomScenario() {
    const scenario = window.scenarioData.getRandomScenario();
    if (!scenario) return;
    
    chatState.currentScenario = scenario.id;
    
    clearChat();
    chatState.currentScenario = scenario.id;
    
    if (elements.welcomeMessage) {
        elements.welcomeMessage.style.display = 'none';
    }
    
    const d = scenario.dispatch;
    const genderDisplay = d.gender === 'M' ? 'Male' : d.gender === 'F' ? 'Female' : '';
    const ageDisplay = d.age ? `${d.age}y` : '';
    const patientDisplay = d.name ? `${d.name} (${ageDisplay} ${genderDisplay})` : 'Multiple Patients';
    
    const bannerDiv = document.createElement('div');
    bannerDiv.className = 'alert alert-info mx-2 my-2';
    bannerDiv.style.background = 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)';
    bannerDiv.style.border = '1px solid #0f3460';
    bannerDiv.style.color = '#ffffff';
    bannerDiv.style.fontFamily = "'JetBrains Mono', monospace";
    bannerDiv.innerHTML = `
        <div class="d-flex align-items-center justify-content-between">
            <div>
                <strong style="color: #00d9ff;">📟 RANDOM INCIDENT</strong>
                <div class="small" style="color: #e94560;">${patientDisplay} - ${d.chiefComplaint}</div>
            </div>
            <span class="mdt-category ${d.category === 1 ? 'cat-1' : d.category === 2 ? 'cat-2' : 'cat-3'}" style="font-size: 0.7rem;">CAT ${d.category}</span>
        </div>
        <div class="small mt-2" style="color: #8892b0;">Assess the patient and provide your working diagnosis</div>
    `;
    elements.chatMessages.appendChild(bannerDiv);
    
    const starterMessage = scenario.starterMessage;
    addMessage('assistant', starterMessage);
    
    chatState.conversationHistory.push({
        role: 'assistant',
        content: starterMessage
    });
    
    chatState.conversationHistory.push({
        role: 'system',
        content: window.scenarioData.getScenarioSystemPrompt(scenario.id)
    });
    
// Show assessment toolbar and working impression button for scenarios
    showAssessmentToolbar();
    showWorkingImpressionToolbar();
}

// ==================== WORKING IMPRESSION FUNCTIONS ====================

function showWorkingImpressionToolbar() {
    if (elements.workingImpressionToolbar) {
        elements.workingImpressionToolbar.style.display = 'block';
    }
}

function hideWorkingImpressionToolbar() {
    if (elements.workingImpressionToolbar) {
        elements.workingImpressionToolbar.style.display = 'none';
    }
}

function openWorkingImpressionModal() {
    // Clear previous inputs
    if (elements.workingImpressionInput) {
        elements.workingImpressionInput.value = '';
    }
    if (elements.impressionReasoning) {
        elements.impressionReasoning.value = '';
    }
    
    // Show the modal
    const modal = new bootstrap.Modal(elements.workingImpressionModal);
    modal.show();
}

async function submitWorkingImpression() {
    const impression = elements.workingImpressionInput.value.trim();
    
    if (!impression) {
        alert('Please enter your working impression');
        return;
    }
    
    const reasoning = elements.impressionReasoning.value.trim();
    
    // Close the modal
    const modal = bootstrap.Modal.getInstance(elements.workingImpressionModal);
    modal.hide();
    
    // Build the trigger message that the AI will recognise
    let triggerMessage = `[DEBRIEF MODE] My working impression is: ${impression}`;
    if (reasoning) {
        triggerMessage += `\n\nMy reasoning: ${reasoning}`;
    }
    
    // Display a user-friendly version in the chat
    let displayMessage = `**My Working Impression:** ${impression}`;
    if (reasoning) {
        displayMessage += `\n\n**Reasoning:** ${reasoning}`;
    }
    
    // Hide the toolbars as the scenario is ending
    hideWorkingImpressionToolbar();
    hideAssessmentToolbar();
    
    // Add the message to chat
    addMessage('user', displayMessage);
    chatState.conversationHistory.push({ role: 'user', content: triggerMessage });
    
    showLoading();
    
    try {
        const response = await sendMessageToAPI(triggerMessage);
        hideLoading();
        addMessage('assistant', response);
        chatState.conversationHistory.push({ role: 'assistant', content: response });
        
        // Clear the scenario state after debrief
        chatState.currentScenario = null;
    } catch (error) {
        hideLoading();
        handleChatError(error);
    }
}


// ==================== ASSESSMENT FUNCTIONS ====================

function showAssessmentToolbar() {
    if (elements.assessmentToolbar) {
        elements.assessmentToolbar.style.display = 'block';
    }
}

function hideAssessmentToolbar() {
    if (elements.assessmentToolbar) {
        elements.assessmentToolbar.style.display = 'none';
    }
}

async function handleAssessment(assessmentType) {
    const assessment = ASSESSMENT_PROMPTS[assessmentType];
    if (!assessment || !chatState.currentScenario) return;
    
    if (chatState.isLoading) return;
    
    // Check message limit for free users
    if (!chatState.isPro && chatState.messagesRemaining <= 0) {
        showLimitReached();
        return;
    }
    
    // Add to conversation history (but don't display as user message)
    chatState.conversationHistory.push({ role: 'user', content: assessment.prompt });
    
    showLoading();
    
    try {
        const response = await sendMessageToAPI(assessment.prompt);
        hideLoading();
        
        // Show a subtle indicator of what was requested
        const assessmentIndicator = document.createElement('div');
        assessmentIndicator.className = 'assessment-indicator';
        assessmentIndicator.innerHTML = `<small><i class="bi bi-clipboard2-pulse me-1"></i>${assessment.name}</small>`;
        assessmentIndicator.style.cssText = 'color: #17a2b8; font-size: 0.75rem; margin: 4px 0 0 50px; font-style: italic;';
        elements.chatMessages.appendChild(assessmentIndicator);
        
        addMessage('assistant', response);
        chatState.conversationHistory.push({ role: 'assistant', content: response });
    } catch (error) {
        hideLoading();
        handleChatError(error);
    }
}

// ==================== YOUR PATIENT FORM ====================

async function handlePatientForm(e) {
    e.preventDefault();
    
    const patientData = {
        age: document.getElementById('patientAge').value,
        sex: document.getElementById('patientSex').value,
        chiefComplaint: document.getElementById('chiefComplaint').value,
        history: document.getElementById('historyPresenting').value,
        pmh: document.getElementById('pmh').value,
        vitals: {
            rr: document.getElementById('vitalRR').value,
            spo2: document.getElementById('vitalSpO2').value,
            hr: document.getElementById('vitalHR').value,
            bp: document.getElementById('vitalBP').value,
            temp: document.getElementById('vitalTemp').value,
            gcs: document.getElementById('vitalGCS').value,
            bm: document.getElementById('vitalBM').value,
            pain: document.getElementById('vitalPain').value
        },
        notes: document.getElementById('additionalNotes').value
    };
    
    const prompt = buildPatientPrompt(patientData);
    const summaryMessage = formatPatientSummary(patientData);
    
    switchView('chatView');
    
    if (elements.welcomeMessage) {
        elements.welcomeMessage.style.display = 'none';
    }
    
    addMessage('user', summaryMessage);
    chatState.conversationHistory.push({ role: 'user', content: prompt });
    
    showLoading();
    
    try {
        const response = await sendMessageToAPI(prompt);
        hideLoading();
        addMessage('assistant', response);
        chatState.conversationHistory.push({ role: 'assistant', content: response });
    } catch (error) {
        hideLoading();
        handleChatError(error);
    }
}

function buildPatientPrompt(data) {
    let prompt = `I have a patient and need guidance on differential diagnoses and management:\n\n`;
    
    if (data.age) prompt += `Age: ${data.age}\n`;
    if (data.sex) prompt += `Sex: ${data.sex}\n`;
    if (data.chiefComplaint) prompt += `Chief Complaint: ${data.chiefComplaint}\n`;
    if (data.history) prompt += `History: ${data.history}\n`;
    if (data.pmh) prompt += `PMH: ${data.pmh}\n`;
    
    prompt += `\nVital Signs:\n`;
    if (data.vitals.rr) prompt += `RR: ${data.vitals.rr}\n`;
    if (data.vitals.spo2) prompt += `SpO2: ${data.vitals.spo2}%\n`;
    if (data.vitals.hr) prompt += `HR: ${data.vitals.hr}\n`;
    if (data.vitals.bp) prompt += `BP: ${data.vitals.bp}\n`;
    if (data.vitals.temp) prompt += `Temp: ${data.vitals.temp}°C\n`;
    if (data.vitals.gcs) prompt += `GCS: ${data.vitals.gcs}\n`;
    if (data.vitals.bm) prompt += `BM: ${data.vitals.bm}\n`;
    if (data.vitals.pain) prompt += `Pain: ${data.vitals.pain}/10\n`;
    
    if (data.notes) prompt += `\nAdditional Notes: ${data.notes}\n`;
    
    prompt += `\nBased on my trust guidelines, what are the key differential diagnoses, red flags to consider, and recommended pre-hospital management?`;
    
    return prompt;
}

function formatPatientSummary(data) {
    let summary = `**Patient Presentation:**\n`;
    
    if (data.age || data.sex) {
        summary += `${data.age || '?'} year old ${data.sex || 'patient'}\n`;
    }
    if (data.chiefComplaint) {
        summary += `Chief complaint: ${data.chiefComplaint}\n`;
    }
    
    const vitals = [];
    if (data.vitals.hr) vitals.push(`HR ${data.vitals.hr}`);
    if (data.vitals.bp) vitals.push(`BP ${data.vitals.bp}`);
    if (data.vitals.rr) vitals.push(`RR ${data.vitals.rr}`);
    if (data.vitals.spo2) vitals.push(`SpO2 ${data.vitals.spo2}%`);
    
    if (vitals.length > 0) {
        summary += `Vitals: ${vitals.join(', ')}`;
    }
    
    return summary;
}

// ==================== CHAT FUNCTIONS ====================

async function handleSendMessage(e) {
    e.preventDefault();
    
    const message = elements.messageInput.value.trim();
    if (!message || chatState.isLoading) return;
    
    if (!chatState.isPro && chatState.messagesRemaining <= 0) {
        showLimitReached();
        return;
    }
    
    elements.messageInput.value = '';
    elements.messageInput.style.height = 'auto';
    
    if (elements.welcomeMessage) {
        elements.welcomeMessage.style.display = 'none';
    }
    
    addMessage('user', message);
    chatState.conversationHistory.push({ role: 'user', content: message });
    
    showLoading();
    
    try {
        const response = await sendMessageToAPI(message);
        hideLoading();
        addMessage('assistant', response);
        chatState.conversationHistory.push({ role: 'assistant', content: response });
    } catch (error) {
        hideLoading();
        handleChatError(error);
    }
}

function handleChatError(error) {
    if (error.message === 'LIMIT_REACHED') {
        showLimitReached();
    } else {
        addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
        console.error('Chat error:', error);
    }
}

function addMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    const avatarIcon = role === 'user' ? 'bi-person' : 'bi-robot';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="bi ${avatarIcon}"></i>
        </div>
        <div class="message-content">
            ${window.paramind.utils.formatMessage(content)}
        </div>
    `;
    
    elements.chatMessages.appendChild(messageDiv);
    chatState.messages.push({ role, content, timestamp: new Date() });
    
    // For user messages, scroll to bottom (so they can see the typing indicator)
    // For assistant messages, scroll to the top of the new message so they can start reading
    if (role === 'user') {
        scrollToBottom();
    } else {
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function showLoading() {
    chatState.isLoading = true;
    elements.sendBtn.disabled = true;
    
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message assistant';
    loadingDiv.id = 'loadingMessage';
    
    loadingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="bi bi-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    elements.chatMessages.appendChild(loadingDiv);
    scrollToBottom();
}

function hideLoading() {
    chatState.isLoading = false;
    elements.sendBtn.disabled = false;
    
    const loadingMsg = document.getElementById('loadingMessage');
    if (loadingMsg) {
        loadingMsg.remove();
    }
}

function updateMessageCounter() {
    if (elements.messagesUsed) {
        const used = Math.max(0, 5 - chatState.messagesRemaining);
        elements.messagesUsed.textContent = used;
    }
    
    if (elements.messageLimitBanner && !chatState.isPro) {
        if (chatState.messagesRemaining <= 0) {
            elements.messageLimitBanner.style.background = 'rgba(220, 53, 69, 0.1)';
        }
    }
}

function showLimitReached() {
    if (elements.welcomeMessage) {
        elements.welcomeMessage.style.display = 'none';
    }
    
    const limitDiv = document.createElement('div');
    limitDiv.className = 'message assistant';
    
    limitDiv.innerHTML = `
        <div class="message-avatar">
            <i class="bi bi-robot"></i>
        </div>
        <div class="message-content">
            <strong>Daily message limit reached</strong><br><br>
            You've used all 5 free messages for today. Your limit resets at midnight.<br><br>
            <button class="btn btn-primary btn-sm" onclick="createCheckoutSession()">
                <i class="bi bi-star me-1"></i>Upgrade to Pro - £4.99/month
            </button>
        </div>
    `;
    
    elements.chatMessages.appendChild(limitDiv);
    scrollToBottom();
}

function clearChat() {
    chatState.messages = [];
    chatState.conversationHistory = [];
    chatState.currentScenario = null;
    
    const messages = elements.chatMessages.querySelectorAll('.message, .alert, .assessment-indicator');
    messages.forEach(msg => msg.remove());
    
// Hide toolbars when clearing chat
    hideAssessmentToolbar();
    hideWorkingImpressionToolbar();
}

function scrollToBottom() {
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

// Make createCheckoutSession available globally
window.createCheckoutSession = createCheckoutSession;

// ==================== INITIALIZE ====================

document.addEventListener('DOMContentLoaded', initChat);