/* ============================================
   PARAMIND - Main JavaScript
   ============================================ */

// Configuration
const CONFIG = {
    // API endpoints (Firebase Cloud Functions)
    api: {
        baseUrl: "https://europe-west2-paramind-64b8e.cloudfunctions.net",
        chat: "/chat",
        createCheckout: "/createCheckoutSession",
        user: "/user",
        saveConversation: "/saveConversation",
        conversations: "/conversations",
        deleteConversation: "/deleteConversation"
    },
    // Free tier limits
    freeTier: {
        dailyMessages: 5
    }
};

// Trust lookup data
const TRUSTS = {
    "BHL": "Bristow Group",
    "EEAST": "East of England Ambulance Service NHS Trust",
    "EMAS": "East Midlands Ambulance Service NHS Trust",
    "JAS": "States of Jersey Ambulance Service",
    "NEAS": "North East Ambulance Service NHS Foundation Trust",
    "NIAS": "Northern Ireland Ambulance Service",
    "NWAS": "North West Ambulance Service NHS Trust",
    "SAS": "Scottish Ambulance Service",
    "SCAS": "South Central Ambulance Service NHS Foundation Trust",
    "SECAmb": "South East Coast Ambulance Service NHS Foundation Trust",
    "SJA": "St John Ambulance",
    "SWAST": "South Western Ambulance Service NHS Foundation Trust",
    "WAST": "Welsh Ambulance Services NHS Trust",
    "WMAS": "West Midlands Ambulance Service NHS Foundation Trust",
    "YAS": "Yorkshire Ambulance Service NHS Trust"
};

// Scenario definitions (legacy - now in chat.js)
const SCENARIOS = {
    "patient-assessment": {
        title: "Patient Assessment Practice",
        description: "The AI will present as a patient with symptoms. Ask assessment questions to gather information and formulate a differential diagnosis.",
        prompt: "You are now a patient presenting to a paramedic. You have chest pain that started 2 hours ago while gardening. It feels like pressure in the centre of your chest. You also feel a bit sweaty and nauseous. Answer the paramedic's questions as a realistic patient would - you may not know medical terminology. Do not reveal your diagnosis. After the paramedic offers their differential diagnosis, confirm if correct or explain what they may have missed."
    },
    "differential-diagnosis": {
        title: "Differential Diagnosis Challenge",
        description: "Test your diagnostic reasoning skills with a complex case presentation.",
        prompt: "Present me with a complex patient case (appropriate for paramedic level) including: patient demographics, chief complaint, history of presenting complaint, and relevant observations. After I provide my differential diagnoses, give me feedback on my clinical reasoning."
    },
    "drug-calculation": {
        title: "Drug Calculation Practice",
        description: "Practice medication calculations with realistic scenarios.",
        prompt: "Give me a drug calculation question appropriate for a paramedic. Include the patient's weight, the drug, the dose per kg or fixed dose, and the concentration available. After I answer, confirm if I'm correct and explain the working if needed."
    },
    "ecg-interpretation": {
        title: "ECG Interpretation",
        description: "Learn to identify key ECG abnormalities relevant to pre-hospital care.",
        prompt: "Describe an ECG in text format for me to interpret. Include rate, rhythm, axis, intervals, and any abnormalities. After I provide my interpretation, give feedback and explain the clinical significance."
    }
};

// Utility Functions
const utils = {
    // Show error message
    showError: function(elementId, message) {
        const errorEl = document.getElementById(elementId);
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.remove('d-none');
        }
    },
    
    // Hide error message
    hideError: function(elementId) {
        const errorEl = document.getElementById(elementId);
        if (errorEl) {
            errorEl.classList.add('d-none');
        }
    },
    
    // Format date
    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    },
    
    // Escape HTML to prevent XSS
    escapeHtml: function(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    // Simple markdown-like formatting for AI responses
    formatMessage: function(text) {
        // Escape HTML first
        let formatted = this.escapeHtml(text);
        
        // Bold text: **text** -> <strong>text</strong>
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Bullet points: • at start of line
        formatted = formatted.replace(/^• (.*)$/gm, '<li>$1</li>');
        
        // Line breaks
        formatted = formatted.replace(/\n/g, '<br>');
        
        return formatted;
    },
    
    // Get trust full name from abbreviation
    getTrustFullName: function(abbreviation) {
        return TRUSTS[abbreviation] || abbreviation;
    }
};

// Local Storage Helper (for demo/development)
const storage = {
    // Get user data
    getUser: function() {
        const userData = localStorage.getItem('paramind_user');
        return userData ? JSON.parse(userData) : null;
    },
    
    // Set user data
    setUser: function(user) {
        localStorage.setItem('paramind_user', JSON.stringify(user));
    },
    
    // Clear user data (logout)
    clearUser: function() {
        localStorage.removeItem('paramind_user');
    },
    
    // Get message count for today
    getMessageCount: function() {
        const today = new Date().toDateString();
        const stored = localStorage.getItem('paramind_messages');
        if (stored) {
            const data = JSON.parse(stored);
            if (data.date === today) {
                return data.count;
            }
        }
        return 0;
    },
    
    // Increment message count
    incrementMessageCount: function() {
        const today = new Date().toDateString();
        const count = this.getMessageCount() + 1;
        localStorage.setItem('paramind_messages', JSON.stringify({
            date: today,
            count: count
        }));
        return count;
    }
};

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Auto-resize textarea (for pages that have it)
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 150) + 'px';
        });
    }
});

// Export for use in other files
window.paramind = {
    CONFIG,
    TRUSTS,
    SCENARIOS,
    utils,
    storage
};