/* ============================================
   PARAMIND - Chat Functionality
   With Bottom Navigation & Section Views
   ============================================ */

// ==================== DATA ====================

// Scenario Categories and Items
const SCENARIO_DATA = {
    cardiac: {
        title: "Cardiac Scenarios",
        description: "Practice cardiac-related patient assessments",
        items: [
            { id: "cardiac-chest-pain", title: "Chest Pain - ACS", description: "65-year-old with crushing chest pain" },
            { id: "cardiac-stemi", title: "Inferior STEMI", description: "58-year-old with atypical presentation" },
            { id: "cardiac-af", title: "Atrial Fibrillation", description: "72-year-old with palpitations" },
            { id: "cardiac-heart-failure", title: "Heart Failure", description: "78-year-old with worsening breathlessness" }
        ]
    },
    respiratory: {
        title: "Respiratory Scenarios",
        description: "Practice respiratory assessments",
        items: [
            { id: "resp-asthma", title: "Acute Asthma", description: "28-year-old with severe wheeze" },
            { id: "resp-copd", title: "COPD Exacerbation", description: "72-year-old struggling to breathe" },
            { id: "resp-anaphylaxis", title: "Anaphylaxis", description: "25-year-old with allergic reaction" }
        ]
    },
    abdominal: {
        title: "Abdominal Scenarios",
        description: "Practice abdominal assessments",
        items: [
            { id: "abdo-appendicitis", title: "Appendicitis", description: "22-year-old with RIF pain" },
            { id: "abdo-aaa", title: "Ruptured AAA", description: "75-year-old with back pain and collapse" }
        ]
    },
    neuro: {
        title: "Neurological Scenarios",
        description: "Practice neurological assessments",
        items: [
            { id: "neuro-stroke", title: "Acute Stroke", description: "72-year-old with facial droop and arm weakness" },
            { id: "neuro-hypoglycaemia", title: "Hypoglycaemia", description: "58-year-old diabetic found confused" }
        ]
    },
    trauma: {
        title: "Trauma Scenarios",
        description: "Practice trauma assessments",
        items: [
            { id: "trauma-fall", title: "Fall from Height", description: "Builder fallen from scaffolding" }
        ]
    },
    paediatric: {
        title: "Paediatric Scenarios",
        description: "Practice paediatric assessments",
        items: [
            { id: "paed-croup", title: "Croup", description: "2-year-old with barking cough" },
            { id: "paed-febrile-convulsion", title: "Febrile Convulsion", description: "18-month-old post-seizure" }
        ]
    }
};

// Differential Diagnosis Data
const DIFFERENTIAL_DATA = {
    "chest-pain": {
        title: "Chest Pain Differentials",
        description: "Common causes of chest pain",
        items: [
            { id: "acs", title: "Acute Coronary Syndrome", description: "STEMI, NSTEMI, Unstable Angina" },
            { id: "pe", title: "Pulmonary Embolism", description: "Pleuritic, sudden onset, risk factors" },
            { id: "pneumothorax", title: "Pneumothorax", description: "Sudden onset, reduced air entry" },
            { id: "aortic-dissection", title: "Aortic Dissection", description: "Tearing pain, BP differential" },
            { id: "pericarditis", title: "Pericarditis", description: "Sharp, positional, recent viral illness" },
            { id: "oesophageal", title: "Oesophageal Spasm/Reflux", description: "Burning, worse after eating" },
            { id: "msk-chest", title: "Musculoskeletal", description: "Reproducible on palpation" },
            { id: "anxiety-chest", title: "Anxiety/Panic Attack", description: "Tingling, hyperventilation" }
        ]
    },
    "sob": {
        title: "Shortness of Breath Differentials",
        description: "Common causes of dyspnoea",
        items: [
            { id: "asthma-diff", title: "Acute Asthma", description: "Wheeze, previous history" },
            { id: "copd-diff", title: "COPD Exacerbation", description: "Smoker, chronic history" },
            { id: "heart-failure-diff", title: "Heart Failure", description: "Orthopnoea, peripheral oedema" },
            { id: "pe-diff", title: "Pulmonary Embolism", description: "Risk factors, pleuritic pain" },
            { id: "pneumonia-diff", title: "Pneumonia", description: "Fever, productive cough" },
            { id: "anaphylaxis-diff", title: "Anaphylaxis", description: "Trigger, swelling, rash" }
        ]
    },
    "abdo-pain": {
        title: "Abdominal Pain Differentials",
        description: "Common causes by location",
        items: [
            { id: "appendicitis-diff", title: "Appendicitis", description: "RIF pain, migration from umbilicus" },
            { id: "cholecystitis-diff", title: "Cholecystitis", description: "RUQ, worse after fatty food" },
            { id: "pancreatitis-diff", title: "Pancreatitis", description: "Epigastric, radiating to back" },
            { id: "aaa-diff", title: "AAA Rupture", description: "Pulsatile mass, back pain, shock" },
            { id: "renal-colic-diff", title: "Renal Colic", description: "Loin to groin, colicky" }
        ]
    },
    "headache": {
        title: "Headache Differentials",
        description: "Common causes of headache",
        items: [
            { id: "tension-headache", title: "Tension Headache", description: "Band-like, bilateral" },
            { id: "migraine", title: "Migraine", description: "Unilateral, aura, photophobia" },
            { id: "sah", title: "Subarachnoid Haemorrhage", description: "Thunderclap, worst ever" },
            { id: "meningitis-diff", title: "Meningitis", description: "Fever, neck stiffness, photophobia" }
        ]
    },
    "altered-loc": {
        title: "Altered Consciousness Differentials",
        description: "Causes of reduced GCS",
        items: [
            { id: "hypoglycaemia-diff", title: "Hypoglycaemia", description: "Diabetic, sweaty, tremor" },
            { id: "stroke-diff", title: "Stroke/TIA", description: "Focal neurology, sudden onset" },
            { id: "seizure-diff", title: "Post-ictal", description: "Witnessed seizure, confusion" },
            { id: "overdose-diff", title: "Drug/Alcohol Overdose", description: "Toxidrome, history" },
            { id: "sepsis-diff", title: "Sepsis", description: "Infection source, fever/hypothermia" }
        ]
    },
    "collapse": {
        title: "Collapse / Syncope Differentials",
        description: "Causes of transient LOC",
        items: [
            { id: "vasovagal", title: "Vasovagal Syncope", description: "Trigger, prodrome, rapid recovery" },
            { id: "cardiac-syncope-diff", title: "Cardiac Syncope", description: "No warning, exertional, palpitations" },
            { id: "orthostatic", title: "Orthostatic Hypotension", description: "On standing, medications" },
            { id: "seizure-collapse", title: "Seizure", description: "Witnessed convulsions, post-ictal" }
        ]
    },
    "back-pain": {
        title: "Back Pain Differentials",
        description: "Serious and common causes",
        items: [
            { id: "mechanical", title: "Mechanical Back Pain", description: "Movement related, no red flags" },
            { id: "cauda-equina", title: "Cauda Equina Syndrome", description: "Saddle anaesthesia, urinary symptoms" },
            { id: "aaa-back", title: "AAA Rupture", description: "Elderly, pulsatile mass, shock" }
        ]
    },
    "leg-pain": {
        title: "Leg Pain/Swelling Differentials",
        description: "Vascular and other causes",
        items: [
            { id: "dvt", title: "Deep Vein Thrombosis", description: "Unilateral swelling, Wells score" },
            { id: "cellulitis", title: "Cellulitis", description: "Erythema, warmth, spreading" },
            { id: "peripheral-arterial", title: "Acute Limb Ischaemia", description: "6 Ps, pulseless, cold" }
        ]
    }
};


// ==================== STATE ====================

const chatState = {
    messages: [],
    isLoading: false,
    currentScenario: null,
    currentScenarioPrompt: null,  // Stores the system prompt for current scenario
    messagesUsed: 0,
    isPro: false,
    userTrust: 'SWAST',
    currentView: 'chatView'
};

// ==================== DOM ELEMENTS ====================

const elements = {
    // Views
    chatView: document.getElementById('chatView'),
    scenariosView: document.getElementById('scenariosView'),
    differentialsView: document.getElementById('differentialsView'),
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
    
    // Scenario elements
    scenarioCategories: document.getElementById('scenarioCategories'),
    scenarioSubcategory: document.getElementById('scenarioSubcategory'),
    scenarioList: document.getElementById('scenarioList'),
    backToScenarioCategories: document.getElementById('backToScenarioCategories'),
    subcategoryTitle: document.getElementById('subcategoryTitle'),
    subcategoryDescription: document.getElementById('subcategoryDescription'),
    
    // Differential elements
    diffCategories: document.getElementById('diffCategories'),
    diffSubcategory: document.getElementById('diffSubcategory'),
    diffList: document.getElementById('diffList'),
    backToDiffCategories: document.getElementById('backToDiffCategories'),
    diffSubcategoryTitle: document.getElementById('diffSubcategoryTitle'),
    diffSubcategoryDescription: document.getElementById('diffSubcategoryDescription'),
    
    // Modal
    scenarioModal: document.getElementById('scenarioModal'),
    scenarioModalTitle: document.getElementById('scenarioModalTitle'),
    scenarioModalDescription: document.getElementById('scenarioModalDescription'),
    startScenarioBtn: document.getElementById('startScenarioBtn'),
    
    // Patient form
    patientForm: document.getElementById('patientForm'),
    
    // Random scenario button
    randomScenarioBtn: document.getElementById('randomScenarioBtn')
};

// ==================== INITIALIZATION ====================

function initChat() {
    // Load message count
    chatState.messagesUsed = window.paramind.storage.getMessageCount();
    updateMessageCounter();
    
    // Load user data
    const user = window.paramind.storage.getUser();
    if (user) {
        chatState.userTrust = user.trust || 'SWAST';
        chatState.isPro = user.subscriptionStatus === 'active';
        
        if (elements.userTrust) {
            elements.userTrust.textContent = chatState.userTrust;
        }
        
        // Hide message limit banner for pro users
        if (chatState.isPro && elements.messageLimitBanner) {
            elements.messageLimitBanner.style.display = 'none';
        }
    }
    
    setupEventListeners();
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
        
        // Submit on Enter (Shift+Enter for new line)
        elements.messageInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                elements.chatForm.dispatchEvent(new Event('submit'));
            }
        });
    }
    
    // Scenario category cards
    document.querySelectorAll('[data-category]').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            showScenarioSubcategory(category);
        });
    });
    
    // Back button for scenarios
    if (elements.backToScenarioCategories) {
        elements.backToScenarioCategories.addEventListener('click', (e) => {
            e.preventDefault();
            hideScenarioSubcategory();
        });
    }
    
    // Differential category cards
    document.querySelectorAll('[data-diff-category]').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.diffCategory;
            showDiffSubcategory(category);
        });
    });
    
    // Back button for differentials
    if (elements.backToDiffCategories) {
        elements.backToDiffCategories.addEventListener('click', (e) => {
            e.preventDefault();
            hideDiffSubcategory();
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
}

// ==================== VIEW NAVIGATION ====================

function switchView(viewId) {
    // Update navigation active state
    elements.navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.view === viewId);
    });
    
    // Hide all views
    document.querySelectorAll('.content-view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show selected view
    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.add('active');
    }
    
    chatState.currentView = viewId;
    
    // Reset subcategory views when switching
    if (viewId === 'scenariosView') {
        hideScenarioSubcategory();
    } else if (viewId === 'differentialsView') {
        hideDiffSubcategory();
    }
}

// ==================== SCENARIO NAVIGATION ====================

function showScenarioSubcategory(category) {
    const data = SCENARIO_DATA[category];
    if (!data) {
        console.error('Category not found:', category);
        return;
    }
    
    // Get the elements
    const subcategoryTitle = document.getElementById('subcategoryTitle');
    const subcategoryDescription = document.getElementById('subcategoryDescription');
    const scenarioList = document.getElementById('scenarioList');
    const scenarioCategories = document.getElementById('scenarioCategories');
    const scenarioSubcategory = document.getElementById('scenarioSubcategory');
    
    // Update title and description
    if (subcategoryTitle) subcategoryTitle.textContent = data.title;
    if (subcategoryDescription) subcategoryDescription.textContent = data.description;
    
    // Populate scenario list
    if (scenarioList) {
        scenarioList.innerHTML = data.items.map(item => `
            <div class="subcategory-item" data-scenario-id="${item.id}">
                <div class="info">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
                <i class="bi bi-chevron-right arrow"></i>
            </div>
        `).join('');
        
        // Add click handlers to scenario items
        scenarioList.querySelectorAll('.subcategory-item').forEach(item => {
            item.addEventListener('click', function() {
                const scenarioId = this.getAttribute('data-scenario-id');
                const title = this.querySelector('h4').textContent;
                const description = this.querySelector('p').textContent;
                
                console.log('Clicked scenario:', scenarioId); // Debug log
                
                if (scenarioId) {
                    openScenarioModal(scenarioId, title, description);
                } else {
                    console.error('No scenario ID found on element');
                }
            });
        });
    }
    
    // Show subcategory view
    if (scenarioCategories) scenarioCategories.style.display = 'none';
    if (scenarioSubcategory) scenarioSubcategory.style.display = 'block';
}

function hideScenarioSubcategory() {
    const scenarioCategories = document.getElementById('scenarioCategories');
    const scenarioSubcategory = document.getElementById('scenarioSubcategory');
    
    if (scenarioCategories) scenarioCategories.style.display = 'block';
    if (scenarioSubcategory) scenarioSubcategory.style.display = 'none';
}

function openScenarioModal(scenarioId, title, description) {
    console.log('Opening modal for scenario:', scenarioId); // Debug log
    
    if (!scenarioId) {
        console.error('No scenario ID provided to openScenarioModal');
        return;
    }
    
    // Store the scenario ID
    chatState.currentScenario = scenarioId;
    
    // Update modal content
    const modalTitle = document.getElementById('scenarioModalTitle');
    const modalDesc = document.getElementById('scenarioModalDescription');
    
    if (modalTitle) {
        modalTitle.textContent = title;
    }
    if (modalDesc) {
        modalDesc.textContent = description + " This interactive scenario will test your assessment skills. Ask questions, gather information, and provide your working diagnosis.";
    }
    
    // Show the modal
    const modalElement = document.getElementById('scenarioModal');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}

function startScenario() {
    console.log('Starting scenario:', chatState.currentScenario); // Debug log
    
    if (!chatState.currentScenario) {
        console.error('No scenario selected');
        alert('Please select a scenario first.');
        return;
    }
    
    // Close modal
    const modalElement = document.getElementById('scenarioModal');
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        }
    }
    
    // Switch to chat view
    switchView('chatView');
    
    // Clear current messages
    clearChat();
    
    // Hide welcome message
    if (elements.welcomeMessage) {
        elements.welcomeMessage.style.display = 'none';
    }
    
    // Build the system prompt for this scenario
    if (window.scenarioPrompts && window.scenarioPrompts.buildScenarioSystemPrompt) {
        chatState.currentScenarioPrompt = window.scenarioPrompts.buildScenarioSystemPrompt(
            chatState.currentScenario, 
            chatState.userTrust
        );
    }
    
    // Get scenario info - with fallback
    let scenarioTitle = 'Scenario';
    if (window.scenarioPrompts && window.scenarioPrompts.getScenarioInfo) {
        const scenarioInfo = window.scenarioPrompts.getScenarioInfo(chatState.currentScenario);
        if (scenarioInfo && scenarioInfo.title) {
            scenarioTitle = scenarioInfo.title;
        }
    }
    
    // Add scenario banner
    const bannerDiv = document.createElement('div');
    bannerDiv.className = 'alert alert-info mx-2 my-2';
    bannerDiv.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-mortarboard me-2"></i>
            <div>
                <strong>Scenario: ${scenarioTitle}</strong>
                <div class="small">Assess the patient and provide your working diagnosis</div>
            </div>
            <button class="btn btn-sm btn-outline-secondary ms-auto" onclick="endScenario()">
                <i class="bi bi-x-lg"></i> End
            </button>
        </div>
    `;
    elements.chatMessages.appendChild(bannerDiv);
    
    // Start the scenario with AI response (patient's opening statement)
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        // Get the starter message from scenario prompts
        let starterMessage = "Hello, thank you for coming. I'm not feeling well at all.";
        if (window.scenarioPrompts && window.scenarioPrompts.getScenarioStarterMessage) {
            starterMessage = window.scenarioPrompts.getScenarioStarterMessage(chatState.currentScenario);
        }
        
        addMessage('assistant', starterMessage);
    }, 1000);
}

/**
 * End the current scenario and return to normal chat
 */
function endScenario() {
    chatState.currentScenario = null;
    chatState.currentScenarioPrompt = null;
    
    // Add end message
    addMessage('assistant', `**Scenario ended.** Feel free to ask me any clinical questions or start a new scenario from the menu.`);
}

// Make endScenario available globally
window.endScenario = endScenario;

// Start a random scenario
function startRandomScenario() {
    // Get all scenarios from all categories that have patient data
    const allScenarios = [];
    
    Object.keys(SCENARIO_DATA).forEach(category => {
        SCENARIO_DATA[category].items.forEach(item => {
            // Only add if we have patient data for it
            if (window.scenarioPrompts && 
                window.scenarioPrompts.SCENARIO_PATIENT_DATA && 
                window.scenarioPrompts.SCENARIO_PATIENT_DATA[item.id]) {
                allScenarios.push(item);
            }
        });
    });
    
    if (allScenarios.length === 0) {
        console.error('No scenarios with patient data found');
        addMessage('assistant', 'Sorry, no scenarios are available at the moment. Please try again later.');
        return;
    }
    
    // Pick a random scenario
    const randomScenario = allScenarios[Math.floor(Math.random() * allScenarios.length)];
    
    console.log('Starting random scenario:', randomScenario.id); // Debug log
    
    // Set the current scenario
    chatState.currentScenario = randomScenario.id;
    
    // Clear current chat
    clearChat();
    
    // Hide welcome message
    if (elements.welcomeMessage) {
        elements.welcomeMessage.style.display = 'none';
    }
    
    // Build the system prompt
    if (window.scenarioPrompts && window.scenarioPrompts.buildScenarioSystemPrompt) {
        chatState.currentScenarioPrompt = window.scenarioPrompts.buildScenarioSystemPrompt(
            chatState.currentScenario, 
            chatState.userTrust
        );
    }
    
    // Add scenario banner
    const bannerDiv = document.createElement('div');
    bannerDiv.className = 'alert alert-info mx-2 my-2';
    bannerDiv.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-shuffle me-2"></i>
            <div>
                <strong>Random Scenario: ${randomScenario.title}</strong>
                <div class="small">${randomScenario.description}</div>
            </div>
            <button class="btn btn-sm btn-outline-secondary ms-auto" onclick="endScenario()">
                <i class="bi bi-x-lg"></i> End
            </button>
        </div>
    `;
    
    if (elements.chatMessages) {
        elements.chatMessages.appendChild(bannerDiv);
    }
    
    // Start the scenario with AI response
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        let starterMessage = "Hello, thank you for coming. I'm not feeling well.";
        if (window.scenarioPrompts && window.scenarioPrompts.getScenarioStarterMessage) {
            starterMessage = window.scenarioPrompts.getScenarioStarterMessage(chatState.currentScenario);
        }
        addMessage('assistant', starterMessage);
    }, 1000);
}

// ==================== DIFFERENTIAL NAVIGATION ====================

function showDiffSubcategory(category) {
    const data = DIFFERENTIAL_DATA[category];
    if (!data) {
        console.error('Differential category not found:', category);
        return;
    }
    
    // Get the elements
    const diffSubcategoryTitle = document.getElementById('diffSubcategoryTitle');
    const diffSubcategoryDescription = document.getElementById('diffSubcategoryDescription');
    const diffList = document.getElementById('diffList');
    const diffCategories = document.getElementById('diffCategories');
    const diffSubcategory = document.getElementById('diffSubcategory');
    
    // Update title and description
    if (diffSubcategoryTitle) diffSubcategoryTitle.textContent = data.title;
    if (diffSubcategoryDescription) diffSubcategoryDescription.textContent = data.description;
    
    // Populate differential list
    if (diffList) {
        diffList.innerHTML = data.items.map(item => `
            <div class="subcategory-item" data-diff-id="${item.id}">
                <div class="info">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
                <i class="bi bi-chevron-right arrow"></i>
            </div>
        `).join('');
        
        // Add click handlers - ask AI about the condition
        diffList.querySelectorAll('.subcategory-item').forEach(item => {
            item.addEventListener('click', function() {
                const title = this.querySelector('h4').textContent;
                askAboutCondition(title);
            });
        });
    }
    
    // Show subcategory view
    if (diffCategories) diffCategories.style.display = 'none';
    if (diffSubcategory) diffSubcategory.style.display = 'block';
}

function hideDiffSubcategory() {
    const diffCategories = document.getElementById('diffCategories');
    const diffSubcategory = document.getElementById('diffSubcategory');
    
    if (diffCategories) diffCategories.style.display = 'block';
    if (diffSubcategory) diffSubcategory.style.display = 'none';
}

function askAboutCondition(conditionName) {
    // Switch to chat view and ask about the condition
    switchView('chatView');
    
    // Hide welcome message
    if (elements.welcomeMessage) {
        elements.welcomeMessage.style.display = 'none';
    }
    
    // End any active scenario
    chatState.currentScenario = null;
    chatState.currentScenarioPrompt = null;
    
    const prompt = `Tell me about ${conditionName} for a paramedic: key features, red flags, and pre-hospital management.`;
    
    addMessage('user', prompt);
    
    // Increment message count
    if (!chatState.isPro) {
        chatState.messagesUsed = window.paramind.storage.incrementMessageCount();
        updateMessageCounter();
    }
    
    // Get AI response
    showLoading();
    
    sendToAI(prompt).then(response => {
        hideLoading();
        addMessage('assistant', response);
    }).catch(error => {
        hideLoading();
        addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
    });
}

// ==================== YOUR PATIENT FORM ====================

function handlePatientForm(e) {
    e.preventDefault();
    
    // End any active scenario
    chatState.currentScenario = null;
    chatState.currentScenarioPrompt = null;
    
    // Gather form data
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
    
    // Build prompt from patient data
    const prompt = buildPatientPrompt(patientData);
    
    // Switch to chat view
    switchView('chatView');
    
    // Hide welcome message
    if (elements.welcomeMessage) {
        elements.welcomeMessage.style.display = 'none';
    }
    
    // Add a summary message
    const summaryMessage = formatPatientSummary(patientData);
    addMessage('user', summaryMessage);
    
    // Increment message count
    if (!chatState.isPro) {
        chatState.messagesUsed = window.paramind.storage.incrementMessageCount();
        updateMessageCounter();
    }
    
    // Get AI response
    showLoading();
    
    sendToAI(prompt).then(response => {
        hideLoading();
        addMessage('assistant', response);
    }).catch(error => {
        hideLoading();
        addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
    });
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
    
    prompt += `\nBased on ${chatState.userTrust} guidelines, what are the key differential diagnoses, red flags to consider, and recommended pre-hospital management?`;
    
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
    
    // Check message limit for free users
    if (!chatState.isPro && chatState.messagesUsed >= window.paramind.CONFIG.freeTier.dailyMessages) {
        showLimitReached();
        return;
    }
    
    // Clear input
    elements.messageInput.value = '';
    elements.messageInput.style.height = 'auto';
    
    // Hide welcome message
    if (elements.welcomeMessage) {
        elements.welcomeMessage.style.display = 'none';
    }
    
    // Add user message
    addMessage('user', message);
    
    // Increment message count
    if (!chatState.isPro) {
        chatState.messagesUsed = window.paramind.storage.incrementMessageCount();
        updateMessageCounter();
    }
    
    // Show loading
    showLoading();
    
    // Get AI response
    try {
        const response = await sendToAI(message);
        hideLoading();
        addMessage('assistant', response);
    } catch (error) {
        hideLoading();
        addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
        console.error('Chat error:', error);
    }
}

/**
 * Send message to AI
 * This function will need to be updated when you connect to your actual AI backend
 */
async function sendToAI(message) {
    // For now, this is a demo response system
    // When you have your backend ready, this will call your Firebase Cloud Function
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if we're in a scenario
    if (chatState.currentScenario && chatState.currentScenarioPrompt) {
        return handleScenarioResponse(message);
    }
    
    // Normal chat mode - demo responses
    return handleNormalChatResponse(message);
}

/**
 * Handle responses during an active scenario
 * The AI acts as the patient
 */
function handleScenarioResponse(message) {
    const lowerMessage = message.toLowerCase();
    const scenario = window.scenarioPrompts?.SCENARIO_PATIENT_DATA[chatState.currentScenario];
    
    if (!scenario) {
        return "I'm sorry, I seem to have lost track of the scenario. Let's start fresh.";
    }
    
    // Check if user is giving their diagnosis
    if (lowerMessage.includes('working diagnosis') || 
        lowerMessage.includes('provisional diagnosis') || 
        lowerMessage.includes('differential') ||
        lowerMessage.includes('i think you have') ||
        lowerMessage.includes('my impression is') ||
        lowerMessage.includes('i believe this is') ||
        lowerMessage.includes('my diagnosis')) {
        return evaluateDiagnosis(message, scenario);
    }
    
    // Check if asking for observations without being specific
    if ((lowerMessage.includes('obs') || lowerMessage.includes('observations') || lowerMessage.includes('vitals')) &&
        !lowerMessage.includes('blood pressure') && 
        !lowerMessage.includes('pulse') && 
        !lowerMessage.includes('heart rate') &&
        !lowerMessage.includes('respiratory') &&
        !lowerMessage.includes('oxygen') &&
        !lowerMessage.includes('spo2') &&
        !lowerMessage.includes('temperature') &&
        !lowerMessage.includes('temp') &&
        !lowerMessage.includes('gcs') &&
        !lowerMessage.includes('blood sugar') &&
        !lowerMessage.includes('bm')) {
        return `Which observations would you like to check? You can check my pulse, blood pressure, breathing rate, oxygen levels, temperature, GCS, or blood sugar.`;
    }
    
    // Specific observation requests
    if (lowerMessage.includes('blood pressure') || lowerMessage.includes('bp')) {
        return `*you check the blood pressure*\nIt's reading ${scenario.observations.bloodPressure}.`;
    }
    
    if (lowerMessage.includes('pulse') || lowerMessage.includes('heart rate') || lowerMessage.includes('hr')) {
        let response = `*you feel the pulse*\nIt's ${scenario.observations.heartRate} beats per minute.`;
        if (scenario.observations.pulseRhythm) {
            response += ` The rhythm is ${scenario.observations.pulseRhythm}.`;
        }
        return response;
    }
    
    if (lowerMessage.includes('respiratory rate') || lowerMessage.includes('breathing') || lowerMessage.includes('rr')) {
        return `*you count the breaths*\n${scenario.observations.respiratoryRate} breaths per minute.`;
    }
    
    if (lowerMessage.includes('oxygen') || lowerMessage.includes('spo2') || lowerMessage.includes('sats')) {
        return `*you put the probe on*\nOxygen saturation is ${scenario.observations.oxygenSaturation}%.`;
    }
    
    if (lowerMessage.includes('temperature') || lowerMessage.includes('temp')) {
        return `*you take the temperature*\n${scenario.observations.temperature}°C.`;
    }
    
    if (lowerMessage.includes('gcs') || lowerMessage.includes('conscious level') || lowerMessage.includes('avpu')) {
        return `GCS is ${scenario.observations.gcs}. ${scenario.observations.gcs === 15 ? "I'm fully alert and oriented." : ""}`;
    }
    
    if (lowerMessage.includes('blood sugar') || lowerMessage.includes('bm') || lowerMessage.includes('glucose')) {
        return `*you check the blood glucose*\nIt's ${scenario.observations.bloodGlucose} mmol/L.`;
    }
    
    if (lowerMessage.includes('cap refill') || lowerMessage.includes('capillary')) {
        return `*you press the nail bed*\nCapillary refill is ${scenario.observations.capRefill}.`;
    }
    
    if (lowerMessage.includes('peak flow') && scenario.observations.peakFlow) {
        return `*you do a peak flow*\nIt's ${scenario.observations.peakFlow}. ${scenario.observations.peakFlow < 200 ? "That's definitely lower than normal for me." : ""}`;
    }
    
    // ECG request
    if (lowerMessage.includes('ecg') || lowerMessage.includes('12 lead')) {
        if (scenario.ecgFindings) {
            return `*you attach the ECG leads and run a 12-lead*\nThe ECG shows: ${scenario.ecgFindings}`;
        }
        return `*you run the ECG*\nThe trace is showing. What do you make of it?`;
    }
    
    // FAST test for stroke
    if (lowerMessage.includes('fast') && scenario.fastTest) {
        return `*you perform FAST assessment*\n
**Face:** ${scenario.fastTest.face}
**Arms:** ${scenario.fastTest.arms}
**Speech:** ${scenario.fastTest.speech}
**Time:** ${scenario.fastTest.time}`;
    }
    
    // Pain questions
    if (lowerMessage.includes('pain') || lowerMessage.includes('hurt')) {
        if (lowerMessage.includes('where')) {
            return scenario.presentation.location;
        }
        if (lowerMessage.includes('score') || lowerMessage.includes('out of 10') || lowerMessage.includes('1 to 10')) {
            return `I'd say about ${scenario.observations.painScore} out of 10.`;
        }
        if (lowerMessage.includes('what does it feel like') || lowerMessage.includes('describe')) {
            return scenario.presentation.character;
        }
        if (lowerMessage.includes('worse') || lowerMessage.includes('aggravat')) {
            return `It's worse when ${scenario.presentation.aggravating}.`;
        }
        if (lowerMessage.includes('better') || lowerMessage.includes('reliev')) {
            return scenario.presentation.relieving;
        }
        if (lowerMessage.includes('start') || lowerMessage.includes('when did') || lowerMessage.includes('how long')) {
            return `It started ${scenario.presentation.onsetTime}. ${scenario.presentation.onset}`;
        }
        // General pain question
        return `${scenario.presentation.location}. ${scenario.presentation.character}. It's about a ${scenario.observations.painScore} out of 10.`;
    }
    
    // History questions
    if (lowerMessage.includes('medical history') || lowerMessage.includes('pmh') || lowerMessage.includes('past history') || lowerMessage.includes('health problems')) {
        return `I've got ${scenario.history.pastMedical.join(', ')}.`;
    }
    
    if (lowerMessage.includes('medication') || lowerMessage.includes('medicine') || lowerMessage.includes('tablets') || lowerMessage.includes('drugs')) {
        return `I take ${scenario.history.medications.join(', ')}.`;
    }
    
    if (lowerMessage.includes('allerg')) {
        return scenario.history.allergies === 'None known' || scenario.history.allergies === 'None' ? 
            "No, I don't have any allergies." : 
            `Yes, I'm allergic to ${scenario.history.allergies}.`;
    }
    
    if (lowerMessage.includes('family history') || lowerMessage.includes('family')) {
        return scenario.history.familyHistory;
    }
    
    if (lowerMessage.includes('smoke') || lowerMessage.includes('smoking') || lowerMessage.includes('cigarette')) {
        const social = scenario.history.socialHistory.toLowerCase();
        if (social.includes('non-smoker')) return "No, I don't smoke.";
        if (social.includes('ex-smoker')) return "I used to smoke but I quit. " + scenario.history.socialHistory;
        if (social.includes('smoker')) return "Yes, I do smoke. " + scenario.history.socialHistory;
        return scenario.history.socialHistory;
    }
    
    if (lowerMessage.includes('alcohol') || lowerMessage.includes('drink')) {
        return scenario.history.socialHistory;
    }
    
    // Onset/timing questions
    if (lowerMessage.includes('when did') || lowerMessage.includes('how long') || lowerMessage.includes('start')) {
        return `It started ${scenario.presentation.onsetTime}. ${scenario.presentation.onset}`;
    }
    
    // Associated symptoms
    if (lowerMessage.includes('other symptoms') || lowerMessage.includes('anything else') || lowerMessage.includes('associated')) {
        return `Well, I've also had ${scenario.presentation.associated.join(', ')}.`;
    }
    
    // What's wrong / what happened
    if (lowerMessage.includes('what happened') || lowerMessage.includes('what\'s wrong') || lowerMessage.includes('tell me')) {
        return `${scenario.presentation.chiefComplaint}. It started ${scenario.presentation.onsetTime}. ${scenario.presentation.onset}`;
    }
    
    // Examination findings
    if (lowerMessage.includes('examine') || lowerMessage.includes('look at') || lowerMessage.includes('check')) {
        if (lowerMessage.includes('chest') || lowerMessage.includes('lung') || lowerMessage.includes('listen')) {
            return `*you examine the chest*\n${scenario.examination.chest || scenario.examination.general}`;
        }
        if (lowerMessage.includes('abdomen') || lowerMessage.includes('stomach') || lowerMessage.includes('tummy')) {
            return `*you examine the abdomen*\n${scenario.examination.abdomen || "Soft"}`;
        }
        if (lowerMessage.includes('leg') || lowerMessage.includes('ankle') || lowerMessage.includes('feet')) {
            return `*you look at the legs*\n${scenario.examination.legs || "Normal"}`;
        }
        if (lowerMessage.includes('heart') || lowerMessage.includes('cardiac')) {
            return `*you listen to the heart*\n${scenario.examination.heart || "Regular heart sounds"}`;
        }
        return `*you do a general examination*\n${scenario.examination.general}`;
    }
    
    // Default - give a generic patient response
    return generatePatientResponse(scenario);
}

/**
 * Generate a generic patient response based on their condition
 */
function generatePatientResponse(scenario) {
    const responses = [
        `I'm just not feeling right. ${scenario.presentation.chiefComplaint}.`,
        `Can you help me? ${scenario.presentation.character}.`,
        `I've never felt like this before. ${scenario.presentation.associated[0]}.`,
        `Is something wrong with me? I feel awful.`,
        `*looks at you anxiously* What do you think is going on?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Evaluate the user's diagnosis against the correct answer
 */
function evaluateDiagnosis(message, scenario) {
    const lowerMessage = message.toLowerCase();
    
    // Check if any correct diagnosis matches
    const isCorrect = scenario.correctDiagnosis.some(diagnosis => 
        lowerMessage.includes(diagnosis.toLowerCase())
    );
    
    // Check if they mentioned reasonable differentials
    const mentionedDifferential = scenario.differentials.some(diff =>
        lowerMessage.includes(diff.toLowerCase())
    );
    
    if (isCorrect) {
        return `**Excellent work!** 🎉

You correctly identified this as **${scenario.condition}**.

**Key findings you should have identified:**
${scenario.redFlags.map(rf => `• ${rf}`).join('\n')}

**Your assessment was good because:**
• You gathered the relevant history
• You checked appropriate observations
• You came to the correct working diagnosis

Would you like to try another scenario, or do you have any questions about this case?`;
    }
    
    if (mentionedDifferential) {
        return `**Good thinking, but not quite!**

${message.includes('?') ? 'You mentioned' : 'Your diagnosis of'} a reasonable differential, but the primary diagnosis here is actually **${scenario.correctDiagnosis[0]}**.

**Hint:** Look at these key features:
• ${scenario.redFlags[0]}
• ${scenario.redFlags[1]}
${scenario.redFlags[2] ? `• ${scenario.redFlags[2]}` : ''}

Would you like to reconsider, or would you like me to explain why this is ${scenario.correctDiagnosis[0]}?`;
    }
    
    // Incorrect
    return `**Not quite right, I'm afraid.**

Let me give you some hints:
• ${scenario.redFlags[0]}
• ${scenario.redFlags[1]}

Think about what conditions might cause these findings. Would you like to ask me some more questions, or would you like me to tell you what's going on?`;
}

/**
 * Handle normal chat responses (non-scenario)
 */
function handleNormalChatResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Demo responses based on keywords
    if (lowerMessage.includes('chest pain')) {
        return `**Based on ${chatState.userTrust} guidelines:**

For chest pain assessment, use your systematic ABCDE approach:

**Key Assessment Points:**
• Onset, character, radiation, severity (0-10)
• Associated symptoms: SOB, sweating, nausea, palpitations
• Cardiac risk factors: smoking, diabetes, hypertension, family history, cholesterol
• Previous cardiac history

**Red Flags:**
• Crushing/pressure sensation
• Radiation to arm, jaw, or back
• Diaphoresis (sweating)
• Associated breathlessness
• Haemodynamic instability

**Immediate Actions:**
• 12-lead ECG
• Aspirin 300mg (if not contraindicated)
• GTN if SBP >90mmHg (and no contraindications)
• IV access
• Consider pain management

Would you like me to go into more detail on any specific aspect?`;
    }
    
    if (lowerMessage.includes('stemi') || lowerMessage.includes('nstemi')) {
        return `**STEMI vs NSTEMI:**

**STEMI (ST-Elevation MI):**
• Complete coronary artery occlusion
• ST elevation ≥1mm in 2+ contiguous leads
• Requires immediate PPCI pathway activation
• Time-critical: door-to-balloon <90 minutes

**NSTEMI (Non-ST-Elevation MI):**
• Partial coronary occlusion
• ST depression, T-wave inversion, or no ECG changes
• Elevated troponin confirms diagnosis
• Risk-stratified management

**Pre-hospital Management (Both):**
• Aspirin 300mg PO
• GTN if SBP >90mmHg
• Morphine for pain (with antiemetic)
• Oxygen only if SpO2 <94%
• Pre-alert receiving hospital

Remember to follow your ${chatState.userTrust} specific pathways.`;
    }
    
    if (lowerMessage.includes('differential') || lowerMessage.includes('diagnosis')) {
        return `I'd be happy to help with differential diagnoses. To give you the most relevant guidance, could you tell me:

1. What is the patient's main presenting complaint?
2. Any key vital signs abnormalities?
3. Relevant medical history?

Alternatively, you can use the **Your Patient** section in the bottom menu to input the full clinical picture, and I'll provide structured guidance based on ${chatState.userTrust} protocols.`;
    }
    
    // Default response
    return `Thank you for your question. As your ${chatState.userTrust} clinical assistant, I'm here to help.

I can assist with:
• Patient assessment approaches
• Differential diagnoses
• Medication queries and calculations
• Clinical pathways and protocols
• Interactive learning scenarios

Try the **Scenarios** section for interactive practice, or **Differentials** to explore conditions by body system.

What would you like to know more about?`;
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
        elements.messagesUsed.textContent = chatState.messagesUsed;
    }
    
    // Update banner styling based on usage
    if (elements.messageLimitBanner && !chatState.isPro) {
        if (chatState.messagesUsed >= window.paramind.CONFIG.freeTier.dailyMessages) {
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
            <a href="#" class="btn btn-primary btn-sm">
                <i class="bi bi-star me-1"></i>Upgrade to Pro - £4.99/month
            </a>
        </div>
    `;
    
    elements.chatMessages.appendChild(limitDiv);
    scrollToBottom();
}

function clearChat() {
    chatState.messages = [];
    chatState.currentScenario = null;
    chatState.currentScenarioPrompt = null;
    
    // Remove all messages except welcome
    const messages = elements.chatMessages.querySelectorAll('.message, .alert');
    messages.forEach(msg => msg.remove());
}

function scrollToBottom() {
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

// ==================== INITIALIZE ====================

document.addEventListener('DOMContentLoaded', initChat);