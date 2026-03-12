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
        deleteConversation: "/deleteConversation",
        transcribe: "/transcribe",
    	speak: "/speak"
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
    utils,
    storage
};

// ============================================
// CAPACITOR - Android back button handling
// ============================================
(function() {
    // Only run inside Capacitor native app
    if (typeof window.Capacitor === 'undefined' || !window.Capacitor.isNativePlatform()) return;

    // Import the App plugin from Capacitor
    var App = window.Capacitor.Plugins.App;
    if (!App) return;

    App.addListener('backButton', function(event) {
        // If the WebView can go back, go back
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // No history left — minimise the app (don't kill it)
            App.minimizeApp();
        }
    });
})();
// ============================================
// CAPACITOR - Apple offer code / transaction listener
// Automatically activates Pro when a subscription is
// redeemed outside the app (e.g. via an offer code link)
// ============================================
(function() {
    // Only run on iOS inside the Capacitor native app
    if (typeof window.Capacitor === 'undefined' || !window.Capacitor.isNativePlatform()) return;
    if (window.Capacitor.getPlatform() !== 'ios') return;

    var NativePurchases = window.Capacitor.Plugins.NativePurchases;
    if (!NativePurchases) return;

    NativePurchases.addListener('transactionUpdated', async function(transaction) {
        console.log('transactionUpdated received:', JSON.stringify(transaction));

        // Only handle active subscriptions
        if (!transaction || !transaction.productIdentifier) return;

        // Wait for Firebase auth to be ready
        var waitForAuth = new Promise(function(resolve) {
            if (typeof firebase === 'undefined') return resolve(null);
            var unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
                unsubscribe();
                resolve(user);
            });
        });

        var user = await waitForAuth;
        if (!user) {
            console.log('transactionUpdated: no logged-in user, skipping');
            return;
        }

        try {
            // Write to Firestore directly
            await firebase.firestore().collection('users').doc(user.uid).update({
                subscriptionStatus: 'active',
                subscriptionPlatform: 'apple',
                appleProductId: transaction.productIdentifier || null,
                appleTransactionId: transaction.transactionId || null,
                subscriptionUpdatedAt: new Date().toISOString()
            });
            console.log('transactionUpdated: Firestore updated for user', user.uid);

            // Update local cache
            try {
                var cached = JSON.parse(localStorage.getItem('paramind_user') || '{}');
                cached.subscriptionStatus = 'active';
                localStorage.setItem('paramind_user', JSON.stringify(cached));
            } catch (e) {}

            // Reload the page so the user sees Pro immediately
            window.location.reload();
        } catch (err) {
            console.error('transactionUpdated: Firestore write failed:', err);
        }
    });

    console.log('Apple transactionUpdated listener registered');
})();
