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
        prompt: "I'm taking a full set of observations. Please provide the vital signs: heart rate, blood pressure, respiratory rate, SpO2, temperature, GCS, blood glucose, and pain score."
    },
    ecg: {
        name: "ECG",
        prompt: "I'm performing a 12-lead ECG. What does it show? Describe the rate, rhythm, axis, intervals, and any abnormalities."
    },
    chest: {
        name: "Chest Examination",
        prompt: "I'm examining the chest. What do I find on inspection, palpation, percussion, and auscultation? Include breath sounds, chest expansion, and any abnormalities."
    },
    abdo: {
        name: "Abdominal Assessment",
        prompt: "I'm examining the abdomen. What do I find on inspection, auscultation, and palpation? Include any tenderness, guarding, masses, or organomegaly."
    },
    neuro: {
        name: "Neurological Exam",
        prompt: "I'm performing a neurological examination. Please provide GCS breakdown, pupil response, limb power and sensation, and any focal neurological findings."
    },
    skin: {
        name: "Skin Assessment",
        prompt: "I'm assessing the skin. What do I observe regarding colour, temperature, moisture, turgor, and any rashes, wounds or abnormalities?"
    },
    fast: {
        name: "FAST Assessment",
        prompt: "I'm performing a FAST stroke assessment. What are the findings for Facial drooping, Arm weakness, Speech abnormalities, and what is the Time of onset?"
    },
    mend: {
        name: "MEND Assessment",
        prompt: "I'm performing a MEND assessment. What are the findings for Mental status, Eyes, Neglect, and Deficits in speech/motor function?"
    },
    pain: {
        name: "Pain Assessment",
        prompt: "I'm taking a full pain history using SOCRATES. Please describe: Site, Onset, Character, Radiation, Associated symptoms, Timing, Exacerbating/relieving factors, and Severity."
    },
    wound: {
        name: "Wound Assessment",
        prompt: "I'm assessing the wound(s). Please describe location, size, depth, edges, bleeding status, contamination, and any underlying structures involved."
    },
    mobility: {
        name: "Mobility Assessment",
        prompt: "I'm assessing the patient's mobility. Can they walk? Stand? Sit up? Move all limbs? What is their normal baseline mobility?"
    },
    history: {
        name: "Full History",
        prompt: "I'm taking a full SAMPLE history. Please provide: Signs/symptoms, Allergies, Medications, Past medical history, Last oral intake, and Events leading up to this."
    },
    meds: {
        name: "Medications",
        prompt: "What medications is the patient taking? Include dose and frequency if known, and any recent changes to medications."
    },
    social: {
        name: "Social History",
        prompt: "Tell me about the patient's social situation. Where do they live? Do they live alone? Any carers? How do they normally manage day-to-day? Any stairs at home?"
    },
    scene: {
        name: "Scene Assessment",
        prompt: "I'm looking around the scene. What can I observe in the environment? Any medications visible? Hazards? Clues about what happened?"
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
    
    // Show assessment toolbar for scenarios
    showAssessmentToolbar();
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
    
    // Show assessment toolbar for scenarios
    showAssessmentToolbar();
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
    
    scrollToBottom();
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
    
    // Hide assessment toolbar when clearing chat
    hideAssessmentToolbar();
}

function scrollToBottom() {
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

// Make createCheckoutSession available globally
window.createCheckoutSession = createCheckoutSession;

// ==================== INITIALIZE ====================

document.addEventListener('DOMContentLoaded', initChat);