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
            { id: "cardiac-palpitations", title: "Palpitations", description: "45-year-old with racing heart" },
            { id: "cardiac-syncope", title: "Cardiac Syncope", description: "70-year-old collapsed at home" },
            { id: "cardiac-heart-failure", title: "Heart Failure", description: "78-year-old with worsening breathlessness" },
            { id: "cardiac-af", title: "Atrial Fibrillation", description: "62-year-old with irregular pulse" },
            { id: "cardiac-bradycardia", title: "Symptomatic Bradycardia", description: "80-year-old dizzy and pale" },
            { id: "cardiac-stemi", title: "Inferior STEMI", description: "58-year-old with nausea and sweating" },
            { id: "cardiac-arrest", title: "Cardiac Arrest", description: "Witnessed collapse scenario" }
        ]
    },
    respiratory: {
        title: "Respiratory Scenarios",
        description: "Practice respiratory assessments",
        items: [
            { id: "resp-asthma", title: "Acute Asthma", description: "28-year-old with severe wheeze" },
            { id: "resp-copd", title: "COPD Exacerbation", description: "72-year-old struggling to breathe" },
            { id: "resp-pneumonia", title: "Community Acquired Pneumonia", description: "65-year-old with productive cough" },
            { id: "resp-pe", title: "Pulmonary Embolism", description: "35-year-old with pleuritic chest pain" },
            { id: "resp-covid", title: "COVID-19 Pneumonitis", description: "55-year-old with worsening SpO2" },
            { id: "resp-anaphylaxis", title: "Anaphylaxis", description: "25-year-old with bee sting reaction" }
        ]
    },
    abdominal: {
        title: "Abdominal Scenarios",
        description: "Practice abdominal assessments",
        items: [
            { id: "abdo-appendicitis", title: "Appendicitis", description: "22-year-old with RIF pain" },
            { id: "abdo-cholecystitis", title: "Cholecystitis", description: "48-year-old with RUQ pain after eating" },
            { id: "abdo-aaa", title: "Ruptured AAA", description: "75-year-old with back pain and collapse" },
            { id: "abdo-bowel-obstruction", title: "Bowel Obstruction", description: "68-year-old with vomiting and distension" },
            { id: "abdo-gi-bleed", title: "GI Bleed", description: "60-year-old with melaena" },
            { id: "abdo-renal-colic", title: "Renal Colic", description: "40-year-old with severe loin pain" },
            { id: "abdo-pancreatitis", title: "Acute Pancreatitis", description: "50-year-old with epigastric pain" }
        ]
    },
    neuro: {
        title: "Neurological Scenarios",
        description: "Practice neurological assessments",
        items: [
            { id: "neuro-stroke", title: "Acute Stroke", description: "72-year-old with facial droop and arm weakness" },
            { id: "neuro-seizure", title: "Seizure", description: "35-year-old post-ictal in public" },
            { id: "neuro-meningitis", title: "Meningitis", description: "20-year-old with headache and neck stiffness" },
            { id: "neuro-head-injury", title: "Head Injury", description: "45-year-old fallen from ladder" },
            { id: "neuro-hypoglycaemia", title: "Hypoglycaemia", description: "58-year-old diabetic found confused" }
        ]
    },
    trauma: {
        title: "Trauma Scenarios",
        description: "Practice trauma assessments",
        items: [
            { id: "trauma-rtc", title: "Road Traffic Collision", description: "Multi-vehicle RTC with entrapment" },
            { id: "trauma-fall", title: "Fall from Height", description: "Builder fallen from scaffolding" },
            { id: "trauma-stabbing", title: "Penetrating Trauma", description: "25-year-old stabbed in chest" },
            { id: "trauma-burns", title: "Major Burns", description: "House fire victim" },
            { id: "trauma-fracture", title: "Open Fracture", description: "Cyclist with open tibial fracture" },
            { id: "trauma-spinal", title: "Spinal Injury", description: "Diving accident with neck pain" }
        ]
    },
    paediatric: {
        title: "Paediatric Scenarios",
        description: "Practice paediatric assessments",
        items: [
            { id: "paed-croup", title: "Croup", description: "2-year-old with barking cough" },
            { id: "paed-bronchiolitis", title: "Bronchiolitis", description: "6-month-old with breathing difficulty" },
            { id: "paed-febrile-convulsion", title: "Febrile Convulsion", description: "18-month-old post-seizure" },
            { id: "paed-sepsis", title: "Paediatric Sepsis", description: "4-year-old with fever and rash" },
            { id: "paed-nai", title: "Safeguarding Concerns", description: "Child with unexplained injuries" }
        ]
    },
    obstetric: {
        title: "Obstetric Scenarios",
        description: "Practice obstetric emergencies",
        items: [
            { id: "obs-labour", title: "Imminent Delivery", description: "Full term with urge to push" },
            { id: "obs-pph", title: "Postpartum Haemorrhage", description: "Heavy bleeding after delivery" },
            { id: "obs-eclampsia", title: "Eclampsia", description: "38 weeks pregnant with seizure" },
            { id: "obs-cord-prolapse", title: "Cord Prolapse", description: "Visible cord after waters breaking" }
        ]
    },
    "mental-health": {
        title: "Mental Health Scenarios",
        description: "Practice mental health assessments",
        items: [
            { id: "mh-self-harm", title: "Self Harm", description: "18-year-old with lacerations" },
            { id: "mh-suicidal", title: "Suicidal Ideation", description: "45-year-old expressing suicidal thoughts" },
            { id: "mh-psychosis", title: "Acute Psychosis", description: "30-year-old with paranoid delusions" },
            { id: "mh-overdose", title: "Intentional Overdose", description: "25-year-old taken paracetamol" }
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
            { id: "anxiety-chest", title: "Anxiety/Panic Attack", description: "Tingling, hyperventilation" },
            { id: "pneumonia-chest", title: "Pneumonia/Pleurisy", description: "Fever, cough, pleuritic" },
            { id: "shingles", title: "Herpes Zoster", description: "Dermatomal pain, rash" },
            { id: "cholecystitis-chest", title: "Biliary Colic", description: "RUQ, referred to shoulder" },
            { id: "costochondritis", title: "Costochondritis", description: "Tender costochondral joints" }
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
            { id: "pneumothorax-diff", title: "Pneumothorax", description: "Sudden onset, reduced air entry" },
            { id: "anaphylaxis-diff", title: "Anaphylaxis", description: "Trigger, swelling, rash" },
            { id: "anxiety-sob", title: "Anxiety/Panic", description: "No physical cause, tingling" },
            { id: "metabolic-acidosis", title: "Metabolic Acidosis", description: "DKA, sepsis, overdose" },
            { id: "anaemia", title: "Severe Anaemia", description: "Gradual onset, pallor" }
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
            { id: "bowel-obstruction-diff", title: "Bowel Obstruction", description: "Vomiting, distension, no flatus" },
            { id: "renal-colic-diff", title: "Renal Colic", description: "Loin to groin, colicky" },
            { id: "uti-diff", title: "UTI/Pyelonephritis", description: "Dysuria, frequency, loin pain" },
            { id: "diverticulitis", title: "Diverticulitis", description: "LIF pain, elderly, fever" },
            { id: "gi-bleed-diff", title: "GI Bleed", description: "Melaena, haematemesis, shock" },
            { id: "ectopic", title: "Ectopic Pregnancy", description: "Female, missed period, bleeding" },
            { id: "ovarian-torsion", title: "Ovarian Torsion/Cyst", description: "Sudden onset, female" },
            { id: "testicular-torsion", title: "Testicular Torsion", description: "Young male, severe pain" },
            { id: "hernia", title: "Strangulated Hernia", description: "Irreducible, tender" },
            { id: "peptic-ulcer", title: "Peptic Ulcer/Perforation", description: "Epigastric, rigid abdomen" },
            { id: "mesenteric-ischaemia", title: "Mesenteric Ischaemia", description: "AF, pain out of proportion" }
        ]
    },
    "headache": {
        title: "Headache Differentials",
        description: "Common causes of headache",
        items: [
            { id: "tension-headache", title: "Tension Headache", description: "Band-like, bilateral" },
            { id: "migraine", title: "Migraine", description: "Unilateral, aura, photophobia" },
            { id: "sah", title: "Subarachnoid Haemorrhage", description: "Thunderclap, worst ever" },
            { id: "meningitis-diff", title: "Meningitis", description: "Fever, neck stiffness, photophobia" },
            { id: "temporal-arteritis", title: "Temporal Arteritis", description: ">50, scalp tenderness, jaw claudication" },
            { id: "raised-icp", title: "Raised ICP", description: "Worse on waking, vomiting" },
            { id: "cluster-headache", title: "Cluster Headache", description: "Unilateral, eye watering, restless" },
            { id: "sinusitis", title: "Sinusitis", description: "Facial pain, worse bending forward" }
        ]
    },
    "altered-loc": {
        title: "Altered Consciousness Differentials",
        description: "Causes of reduced GCS",
        items: [
            { id: "hypoglycaemia-diff", title: "Hypoglycaemia", description: "Diabetic, sweaty, tremor" },
            { id: "stroke-diff", title: "Stroke/TIA", description: "Focal neurology, sudden onset" },
            { id: "head-injury-diff", title: "Head Injury", description: "History of trauma" },
            { id: "seizure-diff", title: "Post-ictal", description: "Witnessed seizure, confusion" },
            { id: "overdose-diff", title: "Drug/Alcohol Overdose", description: "Toxidrome, history" },
            { id: "sepsis-diff", title: "Sepsis", description: "Infection source, fever/hypothermia" },
            { id: "dka-diff", title: "DKA/HHS", description: "Diabetic, high BM, dehydration" },
            { id: "hepatic-enceph", title: "Hepatic Encephalopathy", description: "Liver disease, asterixis" },
            { id: "hyponatraemia", title: "Hyponatraemia", description: "Elderly, diuretics, confusion" },
            { id: "hypothermia-diff", title: "Hypothermia", description: "Cold, bradycardia, elderly" },
            { id: "co-poisoning", title: "Carbon Monoxide", description: "Multiple casualties, headache" }
        ]
    },
    "collapse": {
        title: "Collapse / Syncope Differentials",
        description: "Causes of transient LOC",
        items: [
            { id: "vasovagal", title: "Vasovagal Syncope", description: "Trigger, prodrome, rapid recovery" },
            { id: "cardiac-syncope-diff", title: "Cardiac Syncope", description: "No warning, exertional, palpitations" },
            { id: "orthostatic", title: "Orthostatic Hypotension", description: "On standing, medications" },
            { id: "seizure-collapse", title: "Seizure", description: "Witnessed convulsions, post-ictal" },
            { id: "hypoglycaemia-collapse", title: "Hypoglycaemia", description: "Diabetic, missed meal" },
            { id: "pe-collapse", title: "Massive PE", description: "Sudden, SOB, risk factors" },
            { id: "aortic-stenosis", title: "Aortic Stenosis", description: "Exertional, murmur" },
            { id: "arrhythmia", title: "Arrhythmia", description: "Palpitations before collapse" },
            { id: "situational", title: "Situational Syncope", description: "Cough, micturition, defecation" }
        ]
    },
    "back-pain": {
        title: "Back Pain Differentials",
        description: "Serious and common causes",
        items: [
            { id: "mechanical", title: "Mechanical Back Pain", description: "Movement related, no red flags" },
            { id: "disc-prolapse", title: "Disc Prolapse", description: "Radicular pain, dermatomal" },
            { id: "cauda-equina", title: "Cauda Equina Syndrome", description: "Saddle anaesthesia, urinary symptoms" },
            { id: "aaa-back", title: "AAA Rupture", description: "Elderly, pulsatile mass, shock" },
            { id: "spinal-cord-comp", title: "Spinal Cord Compression", description: "Cancer history, bilateral leg symptoms" },
            { id: "vertebral-fracture", title: "Vertebral Fracture", description: "Trauma, osteoporosis, point tender" },
            { id: "infection-spine", title: "Spinal Infection/Abscess", description: "Fever, IVDU, recent procedure" }
        ]
    },
    "leg-pain": {
        title: "Leg Pain/Swelling Differentials",
        description: "Vascular and other causes",
        items: [
            { id: "dvt", title: "Deep Vein Thrombosis", description: "Unilateral swelling, Wells score" },
            { id: "cellulitis", title: "Cellulitis", description: "Erythema, warmth, spreading" },
            { id: "peripheral-arterial", title: "Acute Limb Ischaemia", description: "6 Ps, pulseless, cold" },
            { id: "compartment", title: "Compartment Syndrome", description: "Trauma, tense, severe pain" },
            { id: "ruptured-bakers", title: "Ruptured Baker's Cyst", description: "Calf swelling, known cyst" },
            { id: "msk-leg", title: "Musculoskeletal Strain", description: "Activity related, localised" }
        ]
    }
};

// Scenario prompts for AI conversation
const SCENARIO_PROMPTS = {
    "cardiac-chest-pain": {
        title: "Chest Pain - ACS",
        prompt: "You are now a 65-year-old male patient named John presenting to a paramedic. You have crushing central chest pain that started 45 minutes ago while watching TV. The pain radiates to your left arm and jaw. You feel sweaty, nauseous, and anxious. You have a history of hypertension and high cholesterol. Answer the paramedic's questions as a realistic patient would - you may not know medical terminology. Do not reveal your diagnosis. After the paramedic offers their assessment and treatment plan, provide feedback on what they did well and what they might have missed."
    },
    "cardiac-stemi": {
        title: "Inferior STEMI",
        prompt: "You are a 58-year-old female patient named Margaret. You have been feeling unwell for the past hour with nausea, sweating, and discomfort in your upper abdomen and back. You don't have typical chest pain but feel very unwell. You have type 2 diabetes. Answer the paramedic's questions realistically. After their assessment, provide feedback on their recognition of atypical MI presentation."
    }
    // Add more scenario prompts as needed
};

// ==================== STATE ====================

const chatState = {
    messages: [],
    isLoading: false,
    currentScenario: null,
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
    userEmail: document.getElementById('userEmail'),
    
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
        
        // Update trust badge
        if (elements.userTrust) {
            elements.userTrust.textContent = chatState.userTrust;
        }
        
        // Update email display
        if (elements.userEmail && user.email) {
            elements.userEmail.textContent = user.email;
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
    if (!data) return;
    
    // Update title and description
    elements.subcategoryTitle.textContent = data.title;
    elements.subcategoryDescription.textContent = data.description;
    
    // Populate scenario list
    elements.scenarioList.innerHTML = data.items.map(item => `
        <div class="subcategory-item" data-scenario-id="${item.id}">
            <div class="info">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
            <i class="bi bi-chevron-right arrow"></i>
        </div>
    `).join('');
    
    // Add click handlers to scenario items
    elements.scenarioList.querySelectorAll('.subcategory-item').forEach(item => {
        item.addEventListener('click', () => {
            const scenarioId = item.dataset.scenarioId;
            openScenarioModal(scenarioId, item.querySelector('h4').textContent, item.querySelector('p').textContent);
        });
    });
    
    // Show subcategory view
    elements.scenarioCategories.style.display = 'none';
    elements.scenarioSubcategory.style.display = 'block';
}

function hideScenarioSubcategory() {
    elements.scenarioCategories.style.display = 'block';
    elements.scenarioSubcategory.style.display = 'none';
}

function openScenarioModal(scenarioId, title, description) {
    chatState.currentScenario = scenarioId;
    
    elements.scenarioModalTitle.textContent = title;
    elements.scenarioModalDescription.textContent = description + " This interactive scenario will test your assessment skills.";
    
    const modal = new bootstrap.Modal(elements.scenarioModal);
    modal.show();
}

function startScenario() {
    if (!chatState.currentScenario) return;
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(elements.scenarioModal);
    modal.hide();
    
    // Switch to chat view
    switchView('chatView');
    
    // Clear current messages
    clearChat();
    
    // Hide welcome message
    if (elements.welcomeMessage) {
        elements.welcomeMessage.style.display = 'none';
    }
    
    // Add scenario banner
    const scenarioTitle = elements.scenarioModalTitle.textContent;
    const bannerDiv = document.createElement('div');
    bannerDiv.className = 'alert alert-info mx-2 my-2';
    bannerDiv.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-mortarboard me-2"></i>
            <div>
                <strong>Scenario: ${scenarioTitle}</strong>
                <div class="small">Assess the patient and provide your working diagnosis</div>
            </div>
        </div>
    `;
    elements.chatMessages.appendChild(bannerDiv);
    
    // Start the scenario with AI response
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        // Get appropriate starter message
        const starterMessage = getScenarioStarterMessage(chatState.currentScenario);
        addMessage('assistant', starterMessage);
    }, 1000);
}

function getScenarioStarterMessage(scenarioId) {
    // Default starter messages based on scenario type
    const starters = {
        "cardiac-chest-pain": "Hello... I've called the ambulance because I've got this terrible pain in my chest. It started about 45 minutes ago. I was just sitting watching telly and it came on suddenly. It's really quite bad... I feel a bit sick too.",
        "cardiac-stemi": "I don't know what's wrong with me... I've been feeling awful for the past hour. My stomach hurts and I feel really sick. I keep sweating but I don't have a temperature. My husband made me call because he says I look grey.",
        "resp-asthma": "*wheeze* I can't... catch my breath... *wheeze* My inhaler isn't helping...",
        "neuro-stroke": "*slurred speech* I... my arm... it won't work properly. My wife says my face looks funny. What's happening to me?",
        "abdo-appendicitis": "The pain started around my belly button last night but now it's moved down here to my right side. It really hurts when I move. I've been sick twice.",
        "resp-anaphylaxis": "*distressed* I can't breathe properly... my throat feels tight... I just ate some prawns at a restaurant... *scratching* I'm so itchy everywhere...",
        "neuro-seizure": "*confused, slightly agitated* Where am I? What happened? My head hurts... I feel really tired and my tongue is sore...",
        "trauma-rtc": "*groaning* My neck hurts... I can't move my legs properly... the car came out of nowhere...",
        "paed-croup": "*parent speaking* She's making this horrible barking noise when she coughs and she's really struggling to breathe. It started in the night. She's only 2.",
        "cardiac-af": "My heart keeps going really fast and then slowing down... it feels like it's fluttering in my chest. I feel a bit dizzy and short of breath.",
        "abdo-aaa": "*pale, sweating* I've got this terrible pain in my back and stomach... it came on suddenly about an hour ago. I feel really unwell... *clutching abdomen*"
    };
    
    return starters[scenarioId] || "Hello, thank you for coming. I'm not feeling well at all. Where would you like to start?";
}

// Start a random scenario
function startRandomScenario() {
    // Get all categories
    const categories = Object.keys(SCENARIO_DATA);
    
    // Pick a random category
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    // Get items from that category
    const categoryItems = SCENARIO_DATA[randomCategory].items;
    
    // Pick a random scenario from that category
    const randomScenario = categoryItems[Math.floor(Math.random() * categoryItems.length)];
    
    // Set the current scenario
    chatState.currentScenario = randomScenario.id;
    
    // Clear current chat
    clearChat();
    
    // Hide welcome message
    if (elements.welcomeMessage) {
        elements.welcomeMessage.style.display = 'none';
    }
    
    // Add scenario banner
    const bannerDiv = document.createElement('div');
    bannerDiv.className = 'alert alert-info mx-2 my-2';
    bannerDiv.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-mortarboard me-2"></i>
            <div>
                <strong>Scenario: ${randomScenario.title}</strong>
                <div class="small">${randomScenario.description}</div>
            </div>
        </div>
    `;
    elements.chatMessages.appendChild(bannerDiv);
    
    // Start the scenario with AI response
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        const starterMessage = getScenarioStarterMessage(chatState.currentScenario);
        addMessage('assistant', starterMessage);
    }, 1000);
}

// ==================== DIFFERENTIAL NAVIGATION ====================

function showDiffSubcategory(category) {
    const data = DIFFERENTIAL_DATA[category];
    if (!data) return;
    
    // Update title and description
    elements.diffSubcategoryTitle.textContent = data.title;
    elements.diffSubcategoryDescription.textContent = data.description;
    
    // Populate differential list
    elements.diffList.innerHTML = data.items.map(item => `
        <div class="subcategory-item" data-diff-id="${item.id}">
            <div class="info">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
            <i class="bi bi-chevron-right arrow"></i>
        </div>
    `).join('');
    
    // Add click handlers - ask AI about the condition
    elements.diffList.querySelectorAll('.subcategory-item').forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h4').textContent;
            askAboutCondition(title);
        });
    });
    
    // Show subcategory view
    elements.diffCategories.style.display = 'none';
    elements.diffSubcategory.style.display = 'block';
}

function hideDiffSubcategory() {
    elements.diffCategories.style.display = 'block';
    elements.diffSubcategory.style.display = 'none';
}

function askAboutCondition(conditionName) {
    // Switch to chat view and ask about the condition
    switchView('chatView');
    
    // Hide welcome message
    if (elements.welcomeMessage) {
        elements.welcomeMessage.style.display = 'none';
    }
    
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

async function sendToAI(message) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lowerMessage = message.toLowerCase();
    
    // Demo responses based on keywords
    if (lowerMessage.includes('chest pain')) {
        return `**Based on ${chatState.userTrust} guidelines:**\n\nFor chest pain assessment, use your systematic ABCDE approach:\n\n**Key Assessment Points:**\n• Onset, character, radiation, severity (0-10)\n• Associated symptoms: SOB, sweating, nausea, palpitations\n• Cardiac risk factors: smoking, diabetes, hypertension, family history, cholesterol\n• Previous cardiac history\n\n**Red Flags:**\n• Crushing/pressure sensation\n• Radiation to arm, jaw, or back\n• Diaphoresis\n• Associated breathlessness\n• Haemodynamic instability\n\n**Immediate Actions:**\n• 12-lead ECG\n• Aspirin 300mg (if not contraindicated)\n• GTN if SBP >90mmHg (and no contraindications)\n• IV access\n• Consider pain management\n\nWould you like me to go into more detail on any specific aspect?`;
    }
    
    if (lowerMessage.includes('stemi') || lowerMessage.includes('nstemi')) {
        return `**STEMI vs NSTEMI:**\n\n**STEMI (ST-Elevation MI):**\n• Complete coronary artery occlusion\n• ST elevation ≥1mm in 2+ contiguous leads\n• Requires immediate PPCI pathway activation\n• Time-critical: door-to-balloon <90 minutes\n\n**NSTEMI (Non-ST-Elevation MI):**\n• Partial coronary occlusion\n• ST depression, T-wave inversion, or no ECG changes\n• Elevated troponin confirms diagnosis\n• Risk-stratified management\n\n**Pre-hospital Management (Both):**\n• Aspirin 300mg PO\n• GTN if SBP >90mmHg\n• Morphine for pain (with antiemetic)\n• Oxygen only if SpO2 <94%\n• Pre-alert receiving hospital\n\nRemember to follow your ${chatState.userTrust} specific pathways.`;
    }
    
    if (lowerMessage.includes('gtn') || lowerMessage.includes('contraindication')) {
        return `**GTN Contraindications (${chatState.userTrust} JRCALC):**\n\n**Absolute Contraindications:**\n• SBP <90mmHg\n• HR <50 or >150 bpm\n• Right ventricular infarction (suspected/confirmed)\n• Severe aortic stenosis\n• Hypertrophic obstructive cardiomyopathy\n\n**Phosphodiesterase Inhibitors:**\n• Sildenafil/Vardenafil - within 24 hours\n• Tadalafil - within 48 hours\n\n**Relative Cautions:**\n• Raised intracranial pressure\n• Constrictive pericarditis\n• Already hypotensive\n\n**Administration:**\n• 400mcg sublingual spray\n• Can repeat after 5 minutes if pain persists\n• Monitor BP before and after`;
    }
    
    if (lowerMessage.includes('differential') || lowerMessage.includes('diagnosis')) {
        return `I'd be happy to help with differential diagnoses. To give you the most relevant guidance, could you tell me:\n\n1. What is the patient's main presenting complaint?\n2. Any key vital signs abnormalities?\n3. Relevant medical history?\n\nAlternatively, you can use the **Your Patient** section in the bottom menu to input the full clinical picture, and I'll provide structured guidance based on ${chatState.userTrust} protocols.`;
    }
    
    // Default response
    return `Thank you for your question. As your ${chatState.userTrust} clinical assistant, I'm here to help.\n\nI can assist with:\n• Patient assessment approaches\n• Differential diagnoses\n• Medication queries and calculations\n• Clinical pathways and protocols\n• Interactive learning scenarios\n\nTry the **Scenarios** section for interactive practice, or **Differentials** to explore conditions by body system.\n\nWhat would you like to know more about?`;
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
    
    // Remove all messages except welcome
    const messages = elements.chatMessages.querySelectorAll('.message, .alert');
    messages.forEach(msg => msg.remove());
}

function scrollToBottom() {
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

// ==================== INITIALIZE ====================

document.addEventListener('DOMContentLoaded', initChat);