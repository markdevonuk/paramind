(function () {
    'use strict';

    // ==================== CONFIG ====================
    const GUARD_CONFIG = {
        loginPage: 'login.html',
        upgradePage: 'upgrade.html',
        maxWaitMs: 8000  // Max time to wait for Firebase before redirecting to login
    };

    // ==================== INJECT LOADING SCREEN ====================
    // This runs immediately — BEFORE the page content is visible
    function injectLoadingScreen() {
        const overlay = document.createElement('div');
        overlay.id = 'proGuardOverlay';
        overlay.innerHTML = `
            <div style="
                position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                background: #f8f9fa; z-index: 9999;
                display: flex; align-items: center; justify-content: center;
                flex-direction: column; gap: 1rem;
                font-family: 'Plus Jakarta Sans', 'DM Sans', -apple-system, sans-serif;
            ">
                <div style="
                    width: 40px; height: 40px;
                    border: 3px solid #e9ecef;
                    border-top-color: #2b8a9c;
                    border-radius: 50%;
                    animation: proGuardSpin 0.8s linear infinite;
                "></div>
                <span style="color: #6c757d; font-size: 0.9rem;">Loading...</span>
            </div>
            <style>
                @keyframes proGuardSpin {
                    to { transform: rotate(360deg); }
                }
            </style>
        `;
        document.documentElement.appendChild(overlay);
    }

    // Show loading screen immediately
    injectLoadingScreen();

    // ==================== REMOVE LOADING SCREEN ====================
    function removeLoadingScreen() {
        const overlay = document.getElementById('proGuardOverlay');
        if (overlay) {
            overlay.style.transition = 'opacity 0.3s ease';
            overlay.style.opacity = '0';
            setTimeout(function () {
                overlay.remove();
            }, 300);
        }
    }

    // ==================== REDIRECT HELPERS ====================
    function redirectToLogin() {
        // Pass current page as return URL so they come back after login
        const returnUrl = encodeURIComponent(window.location.href);
        window.location.href = GUARD_CONFIG.loginPage + '?redirect=' + returnUrl;
    }

    function redirectToUpgrade() {
        // Pass current page so they come back after upgrading
        const returnUrl = encodeURIComponent(window.location.href);
        window.location.href = GUARD_CONFIG.upgradePage + '?from=' + returnUrl;
    }

    // ==================== WAIT FOR FIREBASE ====================
    // menu-v2.js dynamically loads Firebase — we wait for it to be ready
    function waitForFirebase(callback) {
        const startTime = Date.now();

        function check() {
            // Firebase compat SDK loaded and ready?
            if (typeof firebase !== 'undefined' && firebase.auth && firebase.firestore) {
                callback(true);
                return;
            }

            // Timed out?
            if (Date.now() - startTime > GUARD_CONFIG.maxWaitMs) {
                console.warn('Pro Guard: Firebase did not load in time');
                callback(false);
                return;
            }

            // Keep waiting
            setTimeout(check, 100);
        }

        check();
    }

    // ==================== CHECK ACCESS ====================
    function checkAccess() {
        waitForFirebase(function (firebaseReady) {
            if (!firebaseReady) {
                // Firebase never loaded — safest to send to login
                redirectToLogin();
                return;
            }

            // Ensure Firebase is initialised
            // (menu-v2.js usually handles this, but just in case)
            const FIREBASE_CONFIG = {
                apiKey: "AIzaSyC01FaWpNvJQ_LyXYBUx3Z5L2BYRrCNOUE",
                authDomain: "paramind-64b8e.firebaseapp.com",
                projectId: "paramind-64b8e",
                storageBucket: "paramind-64b8e.firebasestorage.app",
                messagingSenderId: "452173393964",
                appId: "1:452173393964:web:8599c0fe1983a6f441e189",
                measurementId: "G-GW385S6L0L"
            };

            try {
                if (!firebase.apps || firebase.apps.length === 0) {
                    firebase.initializeApp(FIREBASE_CONFIG);
                }
            } catch (e) {
                // Already initialised — that's fine
            }

            // Listen for auth state
            firebase.auth().onAuthStateChanged(function (user) {
                if (!user) {
                    // ========== NOT SIGNED IN → LOGIN ==========
                    console.log('Pro Guard: Not signed in → login');
                    redirectToLogin();
                    return;
                }

                // User is signed in — now check subscription
                firebase.firestore().collection('users').doc(user.uid).get()
                    .then(function (doc) {
                        if (doc.exists) {
                            var data = doc.data();
                            var isPro = data.subscriptionStatus === 'active' || data.isPro === true;

                            if (isPro) {
                                // ========== PRO USER → SHOW PAGE ==========
                                console.log('Pro Guard: Pro user ✓ — loading page');
                                removeLoadingScreen();
                            } else {
                                // ========== FREE USER → UPGRADE ==========
                                console.log('Pro Guard: Free user → upgrade');
                                redirectToUpgrade();
                            }
                        } else {
                            // No user document — treat as free
                            console.log('Pro Guard: No user doc → upgrade');
                            redirectToUpgrade();
                        }
                    })
                    .catch(function (error) {
                        console.error('Pro Guard: Error checking subscription:', error);
                        // On error, let them through rather than blocking
                        removeLoadingScreen();
                    });
            });
        });
    }

    // ==================== INIT ====================
    // Start checking as soon as possible
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAccess);
    } else {
        checkAccess();
    }

})();