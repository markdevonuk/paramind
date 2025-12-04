/* ============================================
   PARAMIND - Chat Functionality
   ============================================ */

// Extended Scenario definitions for 20 scenarios
const SCENARIOS = {
    "abdominal-pain": {
        title: "Abdominal Pain",
        description: "The AI will present as a patient with abdominal pain. Conduct a systematic assessment to determine the likely cause.",
        starterMessage: "Hello... I've been having this really bad stomach pain since last night. It started around my belly button but now it's moved to my right side, lower down. I feel a bit sick too and I haven't been able to eat anything."
    },
    "chest-pain": {
        title: "Chest Pain",
        description: "The AI will present as a patient with chest pain. Assess the patient to differentiate between cardiac and non-cardiac causes.",
        starterMessage: "I've got this horrible pain in my chest. It started about two hours ago when I was doing the gardening. It feels like pressure, right in the centre. I'm feeling a bit sweaty and sick too. I'm quite worried about it."
    },
    "neck-pain": {
        title: "Neck Pain",
        description: "The AI will present as a patient with neck pain. Assess for red flags and determine if immobilisation is required.",
        starterMessage: "I've hurt my neck. I was in a car accident about an hour ago - someone went into the back of my car. My neck is really stiff and sore. I've got a bit of a headache too."
    },
    "back-pain": {
        title: "Back Pain",
        description: "The AI will present as a patient with back pain. Screen for red flags including cauda equina syndrome.",
        starterMessage: "My back's gone again. I was just bending down to pick something up this morning and felt it go. The pain goes down my left leg too. It's really hard to move."
    },
    "headache": {
        title: "Headache",
        description: "The AI will present as a patient with headache. Differentiate between primary and secondary causes.",
        starterMessage: "I've got the worst headache of my life. It came on really suddenly about an hour ago, like someone hit me on the back of the head. I've never had anything like this before."
    },
    "shortness-of-breath": {
        title: "Shortness of Breath",
        description: "The AI will present as a patient with breathing difficulties. Assess and identify the likely cause.",
        starterMessage: "I can't... catch my breath properly. It's been getting worse... over the last few hours. I've got asthma... but my inhaler isn't helping."
    },
    "seizure": {
        title: "Seizure",
        description: "The AI will present as a witness to a seizure or post-ictal patient. Gather history and manage appropriately.",
        starterMessage: "My husband just had a fit. He's never had one before. He was just watching TV and then he went all stiff and started shaking. It lasted about two minutes. He's awake now but he's really confused and doesn't know what happened."
    },
    "stroke": {
        title: "Stroke / CVA",
        description: "The AI will present as a patient with stroke symptoms. Conduct a rapid assessment for time-critical intervention.",
        starterMessage: "Something's wrong with me. I woke up this morning and my face feels funny on one side. My arm won't work properly either. My wife says I'm talking strangely."
    },
    "cardiac-arrest": {
        title: "Cardiac Arrest",
        description: "The AI will act as a bystander at a cardiac arrest scene. You'll need to guide them and manage the situation.",
        starterMessage: "Please help! My dad's collapsed! He's not breathing! I don't know what to do! We're at home, he was just watching TV and suddenly he grabbed his chest and fell off the chair!"
    },
    "anaphylaxis": {
        title: "Anaphylaxis",
        description: "The AI will present as a patient experiencing anaphylaxis. Rapidly assess and manage this time-critical emergency.",
        starterMessage: "I can't breathe properly... my throat feels tight... I just ate something with nuts in it... I'm allergic... I feel really dizzy..."
    },
    "diabetic-emergency": {
        title: "Diabetic Emergency",
        description: "The AI will present as a patient with a diabetic emergency. Assess and differentiate between hypo and hyperglycaemia.",
        starterMessage: "I feel really strange... shaky... sweaty... I'm diabetic... I think I might have taken too much insulin... everything seems a bit fuzzy..."
    },
    "overdose": {
        title: "Overdose / Poisoning",
        description: "The AI will present as a patient or relative in an overdose situation. Gather information and manage safely.",
        starterMessage: "It's my daughter... she's taken something... I found her in her room with some empty packets... she's really drowsy and won't wake up properly... she's only 17..."
    },
    "trauma": {
        title: "Major Trauma",
        description: "The AI will present as a trauma patient. Conduct a primary survey and identify life-threatening injuries.",
        starterMessage: "I've been hit by a car... I was crossing the road... my leg hurts really badly... I can't move it... there's blood everywhere... I feel dizzy..."
    },
    "burns": {
        title: "Burns",
        description: "The AI will present as a patient with burns. Assess the severity and extent of the burns.",
        starterMessage: "I've burnt myself... I was cooking and the chip pan caught fire... I tried to put it out with water and it went everywhere... my arms and chest are really painful..."
    },
    "falls-elderly": {
        title: "Falls in Elderly",
        description: "The AI will present as an elderly patient who has fallen. Conduct a falls assessment and look for underlying causes.",
        starterMessage: "I've had a fall dear. I was getting up to make a cup of tea and my legs just gave way. I've been on the floor for about an hour. My hip hurts quite a lot."
    },
    "paediatric": {
        title: "Paediatric Emergency",
        description: "The AI will present as a parent with a sick child. Assess using paediatric-specific approaches.",
        starterMessage: "It's my little boy, he's only 2. He's been poorly for a couple of days with a temperature. Now he's gone really floppy and he's got this rash that doesn't go away when I press it."
    },
    "obstetric": {
        title: "Obstetric Emergency",
        description: "The AI will present as a pregnant patient with a complication. Assess both maternal and foetal wellbeing.",
        starterMessage: "I'm 34 weeks pregnant and I'm having really bad stomach pains. They keep coming and going. I've also noticed some bleeding. This is my first baby, I'm really scared."
    },
    "mental-health": {
        title: "Mental Health Crisis",
        description: "The AI will present as a patient in mental health crisis. Conduct a sensitive assessment and risk evaluation.",
        starterMessage: "I don't want to be here anymore. Everything's too much. I can't cope with it all. My family would be better off without me. I've been thinking about ending it."
    },
    "sepsis": {
        title: "Sepsis",
        description: "The AI will present as a patient with possible sepsis. Screen using sepsis criteria and manage appropriately.",
        starterMessage: "I've been feeling really unwell for a couple of days. I had a water infection last week. Now I feel hot and cold, I'm shivering but sweating, and I just feel really confused about things."
    },
    "hypothermia": {
        title: "Hypothermia / Hyperthermia",
        description: "The AI will present as a patient with temperature-related emergency. Assess severity and manage appropriately.",
        starterMessage: "We found this gentleman outside. He's homeless and he's been out all night. It was freezing last night. He's shivering really badly and he seems confused about where he is."
    },
    "differential-diagnosis": {
        title: "Differential Diagnosis Checker",
        description: "Describe your patient's symptoms and presentation. I'll help you work through a systematic differential diagnosis.",
        starterMessage: "I'm ready to help you work through a differential diagnosis. Please describe your patient's presenting complaint, relevant history, and any observations you've taken. I'll help you systematically consider the possibilities and key differentiating features."
    }
};

// Chat state
const chatState = {
    messages: [],
    isLoading: false,
    currentScenario: null,
    messagesUsed: 0,
    isPro: false,
    userTrust: 'SWAST'
};

// DOM Elements
const elements = {
    chatMessages: document.getElementById('chatMessages'),
    chatForm: document.getElementById('chatForm'),
    messageInput: document.getElementById('messageInput'),
    sendBtn: document.getElementById('sendBtn'),
    welcomeMessage: document.getElementById('welcomeMessage'),
    messagesUsed: document.getElementById('messagesUsed'),
    messageProgress: document.getElementById('messageProgress'),
    userTrust: document.getElementById('userTrust'),
    newChatBtn: document.getElementById('newChatBtn'),
    scenarioModal: document.getElementById('scenarioModal'),
    scenarioModalTitle: document.getElementById('scenarioModalTitle'),
    scenarioDescription: document.getElementById('scenarioDescription'),
    startScenarioBtn: document.getElementById('startScenarioBtn'),
    diffDiagnosisBtn: document.getElementById('diffDiagnosisBtn')
};

// Initialize chat
function initChat() {
    chatState.messagesUsed = window.paramind.storage.getMessageCount();
    updateMessageCounter();
    
    const user = window.paramind.storage.getUser();
    if (user) {
        chatState.userTrust = user.trust || 'SWAST';
        chatState.isPro = user.subscriptionStatus === 'active';
        
        if (elements.userTrust) {
            elements.userTrust.textContent = chatState.userTrust;
        }
    }
    
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    if (elements.chatForm) {
        elements.chatForm.addEventListener('submit', handleSendMessage);
    }
    
    if (elements.newChatBtn) {
        elements.newChatBtn.addEventListener('click', handleNewChat);
    }
    
    // Scenario dropdown items
    document.querySelectorAll('.scenario-dropdown-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const scenarioId = this.dataset.scenario;
            openScenarioModal(scenarioId);
        });
    });
    
    // Differential diagnosis button
    if (elements.diffDiagnosisBtn) {
        elements.diffDiagnosisBtn.addEventListener('click', function() {
            const scenarioId = this.dataset.scenario;
            openScenarioModal(scenarioId);
        });
    }
    
    // Quick prompt buttons
    document.querySelectorAll('.quick-prompt-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const prompt = this.dataset.prompt;
            elements.messageInput.value = prompt;
            elements.chatForm.dispatchEvent(new Event('submit'));
        });
    });
    
    if (elements.startScenarioBtn) {
        elements.startScenarioBtn.addEventListener('click', startScenario);
    }
}

// Handle sending a message
async function handleSendMessage(e) {
    e.preventDefault();
    
    const message = elements.messageInput.value.trim();
    if (!message || chatState.isLoading) return;
    
    if (!chatState.isPro && chatState.messagesUsed >= window.paramind.CONFIG.freeTier.dailyMessages) {
        showLimitReached();
        return;
    }
    
    elements.messageInput.value = '';
    elements.messageInput.style.height = 'auto';
    
    if (elements.welcomeMessage) {
        elements.welcomeMessage.style.display = 'none';
    }
    
    addMessage('user', message);
    
    if (!chatState.isPro) {
        chatState.messagesUsed = window.paramind.storage.incrementMessageCount();
        updateMessageCounter();
    }
    
    showLoading();
    
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

// Send message to AI (simulated for demo)
async function sendToAI(message) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lowerMessage = message.toLowerCase();
    
    // Demo responses based on keywords
    if (lowerMessage.includes('chest pain')) {
        return `**Based on ${chatState.userTrust} guidelines:**\n\nFor a patient presenting with chest pain, follow your primary survey (ABCDE approach):\n\n1. **Airway** - Ensure patent airway\n2. **Breathing** - Assess respiratory rate, SpO2, breath sounds\n3. **Circulation** - HR, BP, 12-lead ECG, skin colour/temperature\n4. **Disability** - GCS, blood glucose, pupils\n5. **Exposure** - Full assessment as appropriate\n\nFor chest pain specifically, consider the ACS pathway:\n- Aspirin 300mg (if not contraindicated)\n- GTN if SBP >90mmHg\n- Pain assessment and management\n- Continuous monitoring\n\nWhat specific aspect would you like to explore further?`;
    }
    
    if (lowerMessage.includes('gtn') || lowerMessage.includes('contraindication')) {
        return `**GTN Contraindications (${chatState.userTrust} JRCALC guidelines):**\n\n• Systolic BP <90mmHg\n• Heart rate <50 or >150 bpm\n• Right ventricular infarction (suspected or confirmed)\n• Phosphodiesterase inhibitor use within:\n  - 24 hours for sildenafil/vardenafil\n  - 48 hours for tadalafil\n• Severe aortic stenosis\n• Hypertrophic obstructive cardiomyopathy\n• Constrictive pericarditis\n• Raised intracranial pressure\n\nRemember: Always check your trust's specific guidelines as there may be local variations.`;
    }
    
    if (lowerMessage.includes('stemi') || lowerMessage.includes('nstemi')) {
        return `**STEMI vs NSTEMI - Key Differences:**\n\n**STEMI (ST-Elevation MI):**\n• Complete coronary artery occlusion\n• ST elevation ≥1mm in 2+ contiguous leads (or ≥2mm in V2-V3)\n• Often associated with reciprocal changes\n• Requires immediate PPCI pathway activation\n• Time-critical: door-to-balloon <90 minutes\n\n**NSTEMI (Non-ST-Elevation MI):**\n• Partial coronary occlusion\n• ST depression, T-wave inversion, or no ECG changes\n• Elevated troponin confirms diagnosis\n• Risk-stratified management\n• May not require immediate intervention\n\n**Pre-hospital management for both:**\n• High-flow oxygen only if SpO2 <94%\n• Aspirin 300mg PO\n• Pain management (GTN, morphine as per guidelines)\n• 12-lead ECG and pre-alert if appropriate`;
    }
    
    // Default response
    return `Thank you for your question. As your ${chatState.userTrust} clinical assistant, I'm here to help with your learning.\n\nCould you provide more details about what you'd like to know? I can help with:\n• Patient assessment approaches\n• Differential diagnoses\n• Medication queries\n• Clinical pathways and protocols\n• Scenario-based learning\n\nRemember: Always verify information against your trust's current guidelines.`;
}

// Add message to chat
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

// Show loading indicator
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

// Hide loading indicator
function hideLoading() {
    chatState.isLoading = false;
    elements.sendBtn.disabled = false;
    
    const loadingMsg = document.getElementById('loadingMessage');
    if (loadingMsg) {
        loadingMsg.remove();
    }
}

// Update message counter
function updateMessageCounter() {
    if (elements.messagesUsed) {
        elements.messagesUsed.textContent = chatState.messagesUsed;
    }
    
    if (elements.messageProgress) {
        const percentage = (chatState.messagesUsed / window.paramind.CONFIG.freeTier.dailyMessages) * 100;
        elements.messageProgress.style.width = Math.min(percentage, 100) + '%';
        
        if (percentage >= 80) {
            elements.messageProgress.classList.add('bg-warning');
        }
        if (percentage >= 100) {
            elements.messageProgress.classList.remove('bg-warning');
            elements.messageProgress.classList.add('bg-danger');
        }
    }
}

// Show limit reached message
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
            You've used all 5 free messages for today. Your limit will reset at midnight.<br><br>
            <a href="#" class="btn btn-primary btn-sm" onclick="alert('Stripe integration coming soon!')">
                <i class="bi bi-star me-1"></i>Upgrade to Paramind Pro
            </a>
            <br><br>
            <small class="text-muted">Unlimited messages for just £4.99/month</small>
        </div>
    `;
    
    elements.chatMessages.appendChild(limitDiv);
    scrollToBottom();
}

// Handle new chat
function handleNewChat() {
    chatState.messages = [];
    chatState.currentScenario = null;
    
    elements.chatMessages.innerHTML = '';
    
    if (elements.welcomeMessage) {
        elements.welcomeMessage.style.display = 'block';
        elements.chatMessages.appendChild(elements.welcomeMessage);
    }
}

// Open scenario modal
function openScenarioModal(scenarioId) {
    const scenario = SCENARIOS[scenarioId];
    if (!scenario) return;
    
    chatState.currentScenario = scenarioId;
    
    if (elements.scenarioModalTitle) {
        elements.scenarioModalTitle.textContent = scenario.title;
    }
    
    if (elements.scenarioDescription) {
        elements.scenarioDescription.innerHTML = `<p>${scenario.description}</p>`;
    }
    
    const modal = new bootstrap.Modal(elements.scenarioModal);
    modal.show();
}

// Start scenario
function startScenario() {
    if (!chatState.currentScenario) return;
    
    const scenario = SCENARIOS[chatState.currentScenario];
    if (!scenario) return;
    
    const modal = bootstrap.Modal.getInstance(elements.scenarioModal);
    modal.hide();
    
    handleNewChat();
    
    if (elements.welcomeMessage) {
        elements.welcomeMessage.style.display = 'none';
    }
    
    // Add scenario system message
    const systemDiv = document.createElement('div');
    systemDiv.className = 'alert alert-info mx-3 my-3';
    systemDiv.innerHTML = `
        <i class="bi bi-mortarboard me-2"></i>
        <strong>Scenario: ${scenario.title}</strong>
        <p class="mb-0 mt-1 small">${scenario.description}</p>
    `;
    elements.chatMessages.appendChild(systemDiv);
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        addMessage('assistant', scenario.starterMessage);
    }, 1000);
}

// Scroll to bottom of chat
function scrollToBottom() {
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initChat);
