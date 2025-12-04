/* ============================================
   PARAMIND - Chat Functionality
   ============================================ */

// Chat state
const chatState = {
    messages: [],
    isLoading: false,
    currentScenario: null,
    messagesUsed: 0,
    isPro: false,
    userTrust: 'SWAST' // Default, will be loaded from user profile
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
    scenarioBtns: document.querySelectorAll('.scenario-btn'),
    quickPromptBtns: document.querySelectorAll('.quick-prompt-btn'),
    scenarioModal: document.getElementById('scenarioModal'),
    scenarioDescription: document.getElementById('scenarioDescription'),
    startScenarioBtn: document.getElementById('startScenarioBtn')
};

// Initialize chat
function initChat() {
    // Load message count
    chatState.messagesUsed = window.paramind.storage.getMessageCount();
    updateMessageCounter();
    
    // Load user data (demo mode)
    const user = window.paramind.storage.getUser();
    if (user) {
        chatState.userTrust = user.trust || 'SWAST';
        chatState.isPro = user.subscriptionStatus === 'active';
        
        if (elements.userTrust) {
            elements.userTrust.textContent = chatState.userTrust;
        }
    }
    
    // Set up event listeners
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    // Chat form submission
    if (elements.chatForm) {
        elements.chatForm.addEventListener('submit', handleSendMessage);
    }
    
    // New chat button
    if (elements.newChatBtn) {
        elements.newChatBtn.addEventListener('click', handleNewChat);
    }
    
    // Scenario buttons
    elements.scenarioBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const scenarioId = this.dataset.scenario;
            openScenarioModal(scenarioId);
        });
    });
    
    // Quick prompt buttons
    elements.quickPromptBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const prompt = this.dataset.prompt;
            elements.messageInput.value = prompt;
            elements.chatForm.dispatchEvent(new Event('submit'));
        });
    });
    
    // Start scenario button in modal
    if (elements.startScenarioBtn) {
        elements.startScenarioBtn.addEventListener('click', startScenario);
    }
}

// Handle sending a message
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
    
    // Add user message to chat
    addMessage('user', message);
    
    // Increment message count
    if (!chatState.isPro) {
        chatState.messagesUsed = window.paramind.storage.incrementMessageCount();
        updateMessageCounter();
        
        // Also update in Firestore if logged in
        if (window.paramindAuth && firebase.auth().currentUser) {
            window.paramindAuth.updateMessageCount();
        }
    }
    
    // Show loading indicator
    showLoading();
    
    // Send to API (simulated for now)
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
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Demo responses based on keywords
    const lowerMessage = message.toLowerCase();
    
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
    
    // Store message
    chatState.messages.push({ role, content, timestamp: new Date() });
    
    // Scroll to bottom
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
        
        // Change color when near limit
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
    // Hide welcome if visible
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
    // Clear messages
    chatState.messages = [];
    chatState.currentScenario = null;
    
    // Clear chat display
    elements.chatMessages.innerHTML = '';
    
    // Show welcome message again
    if (elements.welcomeMessage) {
        elements.welcomeMessage.style.display = 'block';
        elements.chatMessages.appendChild(elements.welcomeMessage);
    }
}

// Open scenario modal
function openScenarioModal(scenarioId) {
    const scenario = window.paramind.SCENARIOS[scenarioId];
    if (!scenario) return;
    
    chatState.currentScenario = scenarioId;
    
    if (elements.scenarioDescription) {
        elements.scenarioDescription.innerHTML = `
            <h6>${scenario.title}</h6>
            <p>${scenario.description}</p>
        `;
    }
    
    const modal = new bootstrap.Modal(elements.scenarioModal);
    modal.show();
}

// Start scenario
function startScenario() {
    if (!chatState.currentScenario) return;
    
    const scenario = window.paramind.SCENARIOS[chatState.currentScenario];
    if (!scenario) return;
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(elements.scenarioModal);
    modal.hide();
    
    // Clear current chat
    handleNewChat();
    
    // Hide welcome message
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
    
    // Start the scenario (simulate AI response)
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        // Different starter messages based on scenario
        let starterMessage = '';
        
        switch(chatState.currentScenario) {
            case 'patient-assessment':
                starterMessage = "Hello... I've called the ambulance because I've got this terrible pain in my chest. It started about two hours ago when I was doing some gardening. I feel a bit sick and sweaty too. I'm quite worried about it.";
                break;
            case 'differential-diagnosis':
                starterMessage = "**Case Presentation:**\n\n72-year-old female, called by care home staff.\n\n**Chief Complaint:** Found on floor, confused\n\n**HPC:** Patient found by staff during routine check. Unsure how long on floor. Normally mobile with frame. Usually alert and oriented. Staff report she seemed 'not quite right' yesterday.\n\n**PMH:** Type 2 diabetes, hypertension, previous TIA (2019), osteoarthritis\n\n**Medications:** Metformin, Amlodipine, Aspirin\n\n**Observations:**\n- RR: 22\n- SpO2: 94% on air\n- HR: 102 irregular\n- BP: 168/94\n- Temp: 37.9°C\n- BM: 14.2\n- GCS: 14 (E4 V4 M6)\n\nWhat are your differential diagnoses?";
                break;
            case 'drug-calculation':
                starterMessage = "**Drug Calculation Question:**\n\nYou need to administer Adrenaline IV for anaphylaxis.\n\nThe patient weighs 70kg.\n\nYour trust protocol requires a 50 microgram bolus (as per JRCalc).\n\nYou have Adrenaline 1:10,000 (1mg in 10ml).\n\n**How many millilitres do you need to draw up for this single bolus dose?**";
                break;
            case 'ecg-interpretation':
                starterMessage = "**ECG Description:**\n\n- Rate: 150 bpm\n- Rhythm: Regular\n- P waves: Not clearly visible, possible flutter waves in inferior leads\n- PR interval: Unable to measure\n- QRS duration: 80ms (narrow)\n- QT interval: Difficult to assess\n- ST segments: 2mm depression in V4-V6 and leads I, aVL\n- T waves: Inverted in lateral leads\n- Other: Sawtooth pattern visible in lead II at 300/min\n\n**What is your interpretation and what would be your management priorities?**";
                break;
            default:
                starterMessage = "Let's begin the scenario. What would you like to explore?";
        }
        
        addMessage('assistant', starterMessage);
    }, 1000);
}

// Scroll to bottom of chat
function scrollToBottom() {
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initChat);
