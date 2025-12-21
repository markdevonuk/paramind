/* ============================================
   PARAMIND - Main JavaScript
   With Firebase Database Sync
   ============================================ */

// Configuration
const CONFIG = {
    // Will be replaced with actual Firebase config
    firebase: {
        apiKey: "AIzaSyC01FaWpNvJQ_LyXYBUx3Z5L2BYRrCNOUE",
        authDomain: "paramind-64b8e.firebaseapp.com",
        projectId: "paramind-64b8e",
        storageBucket: "paramind-64b8e.firebasestorage.app",
        messagingSenderId: "452173393964",
        appId: "1:452173393964:web:8599c0fe1983a6f441e189",
        measurementId: "G-GW385S6L0L"
    },
    // API endpoints (will point to Firebase Cloud Functions)
    api: {
        baseUrl: "https://your-region-your-project.cloudfunctions.net",
        chat: "/chat",
        createCheckout: "/createCheckoutSession",
        user: "/user"
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

// Storage Helper - Syncs with localStorage AND prepares for Firebase
const storage = {
    // Firebase references (will be set by chat.js when Firebase is initialized)
    db: null,
    auth: null,
    
    // Set Firebase references
    setFirebase: function(db, auth) {
        this.db = db;
        this.auth = auth;
        console.log('Firebase references set in storage helper');
    },
    
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
        localStorage.removeItem('paramind_messages');
    },
    
    // Get today's date string for comparison
    getTodayString: function() {
        return new Date().toDateString();
    },
    
    // Get message count for today (from localStorage, synced with Firebase)
    getMessageCount: function() {
        const today = this.getTodayString();
        const stored = localStorage.getItem('paramind_messages');
        
        if (stored) {
            try {
                const data = JSON.parse(stored);
                if (data.date === today) {
                    return data.count;
                }
            } catch (e) {
                console.error('Error parsing message count:', e);
            }
        }
        return 0;
    },
    
    // Increment message count - updates localStorage AND syncs to Firebase
    incrementMessageCount: function() {
        const today = this.getTodayString();
        const count = this.getMessageCount() + 1;
        
        // Update localStorage immediately
        localStorage.setItem('paramind_messages', JSON.stringify({
            date: today,
            count: count
        }));
        
        // Sync to Firebase if available
        this.syncToFirebase(count, today);
        
        return count;
    },
    
    // Sync message count to Firebase
    syncToFirebase: async function(count, date) {
        try {
            const user = this.getUser();
            if (!user || !user.uid) {
                console.log('No user UID available for Firebase sync');
                return;
            }
            
            // Check if Firebase modules are loaded
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                await db.collection('users').doc(user.uid).update({
                    dailyMessageCount: count,
                    lastMessageDate: date
                });
                console.log('Message count synced to Firebase:', count);
            } else {
                // Try using global Firestore if available
                console.log('Firebase sync not available - using localStorage only');
            }
        } catch (error) {
            console.error('Error syncing to Firebase:', error);
            // Continue anyway - localStorage has the data
        }
    },
    
    // Sync FROM Firebase (call on page load to get accurate count)
    syncFromFirebase: async function() {
        try {
            const user = this.getUser();
            if (!user || !user.uid) {
                console.log('No user for Firebase sync');
                return;
            }
            
            // Update localStorage with user's current data from Firestore
            const today = this.getTodayString();
            const storedDate = user.lastMessageDate;
            
            // If the stored date matches today, use the Firebase count
            if (storedDate === today && user.dailyMessageCount) {
                localStorage.setItem('paramind_messages', JSON.stringify({
                    date: today,
                    count: user.dailyMessageCount
                }));
                console.log('Synced message count from user data:', user.dailyMessageCount);
            } else {
                // Different day, reset count
                localStorage.setItem('paramind_messages', JSON.stringify({
                    date: today,
                    count: 0
                }));
                console.log('New day - message count reset to 0');
            }
        } catch (error) {
            console.error('Error syncing from Firebase:', error);
        }
    },
    
    // Reset message count (for new day)
    resetMessageCount: function() {
        const today = this.getTodayString();
        localStorage.setItem('paramind_messages', JSON.stringify({
            date: today,
            count: 0
        }));
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
    
    // Sync from Firebase on page load
    storage.syncFromFirebase();
});

// Export for use in other files
window.paramind = {
    CONFIG,
    TRUSTS,
    SCENARIOS,
    utils,
    storage
};

console.log('app.js loaded - window.paramind available');