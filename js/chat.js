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
    authToken: null,
    // Scenario progress tracking
    scenarioProgress: {
        questionsAsked: 0,
        assessmentsPerformed: 0
    }
};

// ==================== ASSESSMENT PROMPTS ====================

const ASSESSMENT_PROMPTS = {
    obs: {
        name: "Observations",
        prompt: "[CLINICAL ASSESSMENT - PROVIDE DATA, NOT ROLEPLAY]\n\nThe paramedic is performing observations. Respond ONLY with clinical findings in this format:\n\nCLINICAL DATA:\n• HR: [value] bpm\n• BP: [value] mmHg\n• RR: [value] /min\n• SpO2: [value]%\n• Temp: [value]°C\n• GCS: [value] (E?/V?/M?)\n• BM: [value] mmol/L\n• Pain: [value]/10\n\nDo NOT respond as the patient. Do NOT add dialogue. Just provide the clinical values."
    },
    ecg: {
        name: "ECG",
        prompt: "[CLINICAL ASSESSMENT - PROVIDE DATA, NOT ROLEPLAY]\n\nThe paramedic is performing a 12-lead ECG. Respond ONLY with clinical findings:\n\nCLINICAL DATA - ECG:\n• Rate: [value] bpm\n• Rhythm: [regular/irregular]\n• P waves: [description]\n• PR interval: [value]\n• QRS: [value]\n• ST segments: [description with leads]\n• T waves: [description]\n• Interpretation: [finding]\n\nDo NOT respond as the patient. Do NOT add dialogue. Just describe what the ECG shows."
    },
    chest: {
        name: "Chest Examination",
        prompt: "[CLINICAL ASSESSMENT - PROVIDE DATA, NOT ROLEPLAY]\n\nThe paramedic is performing a chest examination. Respond ONLY with clinical findings:\n\nCLINICAL DATA - CHEST EXAM:\n• Inspection: [respiratory effort, symmetry, accessory muscle use]\n• Palpation: [trachea position, expansion, tenderness]\n• Percussion: [resonance/dullness]\n• Auscultation: [breath sounds, added sounds]\n\nDo NOT respond as the patient. Do NOT add dialogue. Just provide examination findings."
    },
    abdo: {
        name: "Abdominal Assessment",
        prompt: "[CLINICAL ASSESSMENT - PROVIDE DATA, NOT ROLEPLAY]\n\nThe paramedic is performing an abdominal examination. Respond ONLY with clinical findings:\n\nCLINICAL DATA - ABDOMINAL EXAM:\n• Inspection: [distension, scars, bruising]\n• Auscultation: [bowel sounds]\n• Palpation: [soft/rigid, tenderness, guarding, masses]\n• Special signs: [if applicable]\n\nDo NOT respond as the patient. Do NOT add dialogue. Just provide examination findings."
    },
    neuro: {
        name: "Neurological Exam",
        prompt: "[CLINICAL ASSESSMENT - PROVIDE DATA, NOT ROLEPLAY]\n\nThe paramedic is performing a neurological examination. Respond ONLY with clinical findings:\n\nCLINICAL DATA - NEURO EXAM:\n• GCS: [value] (E?/V?/M?)\n• Pupils: [size, reactivity, equality]\n• Limb power: [grade 0-5 each limb]\n• Sensation: [intact/reduced]\n• Tone: [normal/increased/decreased]\n• Focal deficits: [any noted]\n\nDo NOT respond as the patient. Do NOT add dialogue. Just provide examination findings."
    },
    skin: {
        name: "Skin Assessment",
        prompt: "[CLINICAL ASSESSMENT - PROVIDE DATA, NOT ROLEPLAY]\n\nThe paramedic is assessing the patient's skin. Respond ONLY with clinical findings:\n\nCLINICAL DATA - SKIN:\n• Colour: [pink/pale/cyanosed/mottled/flushed]\n• Temperature: [warm/cool/cold]\n• Moisture: [dry/clammy/diaphoretic]\n• CRT: [value] seconds\n• Other findings: [rashes, wounds, etc.]\n\nDo NOT respond as the patient. Do NOT add dialogue. Just provide what the paramedic observes."
    },
    fast: {
        name: "FAST Assessment",
        prompt: "[CLINICAL ASSESSMENT - PROVIDE DATA, NOT ROLEPLAY]\n\nThe paramedic is performing a FAST stroke assessment. Respond with clinical findings:\n\nCLINICAL DATA - FAST:\n• Face: [symmetrical smile / facial droop - which side?]\n• Arms: [both held equal / drift - which side?]\n• Speech: [normal / slurred / garbled / unable]\n• Time: [when symptoms first noticed]\n\nDo NOT add unnecessary dialogue. Focus on the objective findings."
    },
    mend: {
        name: "MEND Assessment",
        prompt: "[CLINICAL ASSESSMENT - PROVIDE DATA, NOT ROLEPLAY]\n\nThe paramedic is performing a MEND assessment. Respond ONLY with clinical findings:\n\nCLINICAL DATA - MEND:\n• Mental status: [alert/confused/obtunded]\n• Eyes: [gaze deviation, visual fields, pupils]\n• Neglect: [present/absent, which side]\n• Deficits - Speech: [normal/aphasia type]\n• Deficits - Motor: [face/arm/leg weakness, laterality]\n\nDo NOT respond as the patient. Just provide clinical findings."
    },
    pain: {
        name: "Pain Assessment",
        prompt: "[CLINICAL ASSESSMENT - PATIENT HISTORY]\n\nThe paramedic is asking about pain using SOCRATES. For this assessment, respond AS THE PATIENT answering each question naturally:\n\n• Site: Where is the pain?\n• Onset: When did it start?\n• Character: What does it feel like?\n• Radiation: Does it spread anywhere?\n• Associated symptoms: Anything else?\n• Timing: Constant or intermittent?\n• Exacerbating/relieving: What makes it better or worse?\n• Severity: Pain score out of 10?\n\nRespond conversationally as the patient would describe their pain."
    },
    history: {
        name: "Medical History",
        prompt: "[CLINICAL ASSESSMENT - PATIENT HISTORY]\n\nThe paramedic is taking a SAMPLE history. For this assessment, respond AS THE PATIENT:\n\n• Signs/Symptoms: Main complaints\n• Allergies: Any known allergies\n• Medications: Current medications\n• Past medical history: Previous conditions\n• Last oral intake: When did you last eat/drink\n• Events leading up: What happened before this\n\nRespond conversationally as the patient would."
    },
    meds: {
        name: "Medications",
        prompt: "[CLINICAL ASSESSMENT - PATIENT HISTORY]\n\nThe paramedic is asking about medications. Respond AS THE PATIENT listing your regular medications, any recent changes, whether you've taken them today, and any medications you've tried for the current problem."
    },
    social: {
        name: "Social History",
        prompt: "[CLINICAL ASSESSMENT - PATIENT HISTORY]\n\nThe paramedic is asking about social history. Respond AS THE PATIENT describing: who you live with, mobility and baseline function, smoking and alcohol history, and any relevant social circumstances."
    },
    scene: {
        name: "Scene Assessment",
        prompt: "[CLINICAL ASSESSMENT - PROVIDE DATA, NOT ROLEPLAY]\n\nThe paramedic is assessing the scene. Respond with third-person observations:\n\nSCENE FINDINGS:\n• Location/environment: [description]\n• Safety hazards: [any noted]\n• Clues: [medication boxes, medical equipment, alcohol, etc.]\n• Patient position: [how/where found]\n• Other people present: [who else is there]\n\nDo NOT respond as the patient. Describe what the paramedic would observe on arrival."
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
    hintBtn: document.getElementById('hintBtn'),
    
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
    incidentCount: document.getElementById('incidentCount'),
    
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
    
    
    // Welcome name
welcomeName: document.getElementById('welcomeName'),
    
    
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

async function handleLogout() {
    try {
        const { signOut } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
        await signOut(auth);
        
        // Clear localStorage
        localStorage.removeItem('paramind_user');
        
        // Redirect to login page
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Logout error:', error);
        // Even if there's an error, try to redirect
        window.location.href = 'login.html';
    }
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
        
        // Display user's first name in welcome message
if (elements.welcomeName && data.firstName) {
    elements.welcomeName.textContent = ', ' + data.firstName;
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
    // Show cached firstName if available
    if (elements.welcomeName && cached.firstName) {
        elements.welcomeName.textContent = ', ' + cached.firstName;
    }
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
    
    // Hint button
    if (elements.hintBtn) {
        elements.hintBtn.addEventListener('click', handleHint);
    }
    
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
    
    // Logout button
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleLogout();
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
    
    // Reset chat to welcome screen when clicking Chat nav button
    if (viewId === 'chatView') {
        clearChat();
        if (elements.welcomeMessage) {
            elements.welcomeMessage.style.display = 'block';
        }
    }
}

// ==================== SCENARIO NAVIGATION ====================

function showScenarioSubcategory(categoryId) {
    const category = window.scenarioData.SCENARIO_CATEGORIES[categoryId];
    const scenarios = window.scenarioData.getScenariosByCategory(categoryId);
    
    if (!category || !scenarios.length) return;
    
    // Update the dispatcher screen header
    if (elements.subcategoryTitle) {
        elements.subcategoryTitle.textContent = category.title;
    }
    if (elements.incidentCount) {
        elements.incidentCount.textContent = scenarios.length;
    }
    
    // Build dispatcher table rows
    elements.scenarioList.innerHTML = scenarios.map((scenario, index) => {
        const d = scenario.dispatch;
        const genderDisplay = d.gender === 'M' ? 'Male' : d.gender === 'F' ? 'Female' : '';
        const ageDisplay = d.age ? `${d.age}yr` : '';
        const patientAgeGender = d.age ? `${ageDisplay} ${genderDisplay}` : 'Multiple';
        const patientName = d.name || 'Patients';
        
        // Generate incident number
        const incidentNum = `INC-${new Date().getFullYear()}-${(index + 1).toString().padStart(3, '0')}`;
        
        // Category class for badge
        const catClass = d.category === 1 ? 'cat-1' : d.category === 2 ? 'cat-2' : d.category === 3 ? 'cat-3' : 'cat-4';
        
        return `
            <tr data-scenario-id="${scenario.id}">
                <td>
                    <span class="incident-number">${incidentNum}</span>
                </td>
                <td>
                    <div class="patient-info">
                        <span class="patient-age-sex">${patientAgeGender}</span>
                        <span class="patient-name">${patientName}</span>
                    </div>
                </td>
                <td>
                    <div class="complaint-text">${d.chiefComplaint}</div>
                    <div class="complaint-details">${d.details}</div>
                </td>
                <td>
                    <span class="cat-badge ${catClass}">C${d.category}</span>
                </td>
                <td>
                    <button class="dispatch-btn" data-scenario-id="${scenario.id}">
                        <i class="bi bi-broadcast"></i>
                        Dispatch
                    </button>
                </td>
            </tr>
        `;
    }).join('');
    
    // Add click listeners to dispatch buttons
    elements.scenarioList.querySelectorAll('.dispatch-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent row click if we add that later
            const scenarioId = btn.dataset.scenarioId;
            openScenarioModal(scenarioId);
        });
    });
    
    // Also make the entire row clickable (optional but nice UX)
    elements.scenarioList.querySelectorAll('tr').forEach(row => {
        row.style.cursor = 'pointer';
        row.addEventListener('click', () => {
            const scenarioId = row.dataset.scenarioId;
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
    resetScenarioProgress(); // Reset progress tracking for new scenario
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
    resetScenarioProgress(); // Reset progress tracking for new scenario
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

// ==================== SCENARIO PROGRESS TRACKING ====================

function resetScenarioProgress() {
    chatState.scenarioProgress = {
        questionsAsked: 0,
        assessmentsPerformed: 0
    };
}

function incrementQuestionsAsked() {
    if (chatState.currentScenario) {
        chatState.scenarioProgress.questionsAsked++;
    }
}

function incrementAssessmentsPerformed() {
    if (chatState.currentScenario) {
        chatState.scenarioProgress.assessmentsPerformed++;
    }
}

function getTotalInteractions() {
    return chatState.scenarioProgress.questionsAsked + chatState.scenarioProgress.assessmentsPerformed;
}

function canSubmitWorkingImpression() {
    // Require at least 3 total interactions (questions + assessments)
    // AND at least 1 assessment performed
    const minTotalInteractions = 3;
    const minAssessments = 1;
    
    return getTotalInteractions() >= minTotalInteractions && 
           chatState.scenarioProgress.assessmentsPerformed >= minAssessments;
}

function getProgressFeedback() {
    const total = getTotalInteractions();
    const assessments = chatState.scenarioProgress.assessmentsPerformed;
    
    let feedback = [];
    
    if (assessments < 1) {
        feedback.push("• Perform at least 1 assessment (e.g., Observations, ECG, Chest Exam)");
    }
    
    if (total < 3) {
        const needed = 3 - total;
        feedback.push(`• Complete ${needed} more interaction${needed > 1 ? 's' : ''} (ask questions or perform assessments)`);
    }
    
    return feedback;
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
    // Check if they've done enough before allowing submission
    if (!canSubmitWorkingImpression()) {
        const feedback = getProgressFeedback();
        const assessments = chatState.scenarioProgress.assessmentsPerformed;
        const questions = chatState.scenarioProgress.questionsAsked;
        
        // Create a friendly alert message
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-warning mx-2 my-2';
        alertDiv.style.cssText = 'border-left: 4px solid #ffc107;';
        alertDiv.innerHTML = `
            <div class="d-flex align-items-start">
                <i class="bi bi-exclamation-triangle me-2 mt-1"></i>
                <div>
                    <strong>Not so fast!</strong>
                    <p class="mb-2 mt-1">A good paramedic gathers information before forming an impression. You've done:</p>
                    <ul class="mb-2" style="margin-left: -15px;">
                        <li>Questions asked: ${questions}</li>
                        <li>Assessments performed: ${assessments}</li>
                    </ul>
                    <p class="mb-1"><strong>Before submitting, please:</strong></p>
                    <ul class="mb-0" style="margin-left: -15px;">
                        ${feedback.map(f => `<li>${f.substring(2)}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        elements.chatMessages.appendChild(alertDiv);
        alertDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
    }
    
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
    
    // Track that an assessment was performed
    incrementAssessmentsPerformed();
    
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

// ==================== HINT FUNCTION ====================

async function handleHint() {
    if (!chatState.currentScenario) {
        return;
    }
    
    if (chatState.isLoading) return;
    
    if (!chatState.isPro && chatState.messagesRemaining <= 0) {
        showLimitReached();
        return;
    }
    
    if (elements.hintBtn) {
        elements.hintBtn.disabled = true;
    }
    
    const hintPrompt = "[HINT] I'm stuck and need a hint about what to ask or assess next.";
    
    chatState.conversationHistory.push({ role: 'user', content: hintPrompt });
    
    showLoading();
    
    try {
        const response = await sendMessageToAPI(hintPrompt);
        hideLoading();
        
        const hintIndicator = document.createElement('div');
        hintIndicator.className = 'hint-indicator';
        hintIndicator.innerHTML = `<small><i class="bi bi-lightbulb me-1"></i>Hint requested</small>`;
        hintIndicator.style.cssText = 'color: #ffc107; font-size: 0.75rem; margin: 4px 0 0 50px; font-style: italic;';
        elements.chatMessages.appendChild(hintIndicator);
        
        addMessage('assistant', response);
        chatState.conversationHistory.push({ role: 'assistant', content: response });
    } catch (error) {
        hideLoading();
        handleChatError(error);
    } finally {
        if (elements.hintBtn) {
            elements.hintBtn.disabled = false;
        }
    }
}

// ==================== YOUR PATIENT FORM ====================
// ==================== YOUR PATIENT FORM ====================

async function handlePatientForm(e) {
    e.preventDefault();
    
    clearChat();
    
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
    
    // Track that a question was asked (if in a scenario)
    incrementQuestionsAsked();
    
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