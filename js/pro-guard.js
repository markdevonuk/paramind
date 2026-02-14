/* ==================== PRO GUARD - CENTRALISED ACCESS CONTROL ==================== */
/* ParaMind - Pro Page Guard
 * Version 1.0
 * 
 * PURPOSE: Single script that protects ALL Pro pages. Add to any Pro page and it handles:
 *   1. Not signed in → redirects to login.html
 *   2. Signed in + Free user → redirects to upgrade.html
 *   3. Signed in + Pro user → page loads normally
 *
 * USAGE: Add these 3 scripts (in this order) before </body> on every Pro page:
 *   <script src="js/app.js"></script>
 *   <script src="js/menu-v2.js"></script>
 *   <script src="js/pro-guard.js"></script>
 *
 * That's it. No other auth/subscription code needed in the page.
 * 
 * HOW IT WORKS:
 *   - Shows a loading screen immediately (hides page content)
 *   - Waits for Firebase (loaded by menu-v2.js) to report auth state
 *   - Checks subscription status in Firestore
 *   - Either reveals the page or redirects
 */

(function () {
    'use strict';

    // ==================== CONFIG ====================
    const GUARD_CONFIG = {
        loginPage: 'login.html',
        upgradePage: 'upgrade.html',
        maxWaitMs: 10000,  // Max time to wait for Firebase before redirecting to login
        firebaseConfig: {
            apiKey: "AIzaSyC01FaWpNvJQ_LyXYBUx3Z5L2BYRrCNOUE",
            authDomain: "paramind-64b8e.firebaseapp.com",
            projectId: "paramind-64b8e",
            storageBucket: "paramind-64b8e.firebasestorage.app",
            messagingSenderId: "452173393964",
            appId: "1:452173393964:web:8599c0fe1983a6f441e189",
            measurementId: "G-GW385S6L0L"
        }
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
    // menu-v2.js dynamically loads Firebase — we wait for it to be FULLY ready
    // (SDK loaded AND app initialised, so auth persistence is available)
    function waitForFirebase(callback) {
        const startTime = Date.now();

        function check() {
            // Firebase compat SDK loaded AND at least one app initialised?
            if (typeof firebase !== 'undefined' && firebase.auth && firebase.firestore && firebase.apps && firebase.apps.length > 0) {
                callback(true);
                return;
            }

            // Timed out?
            if (Date.now() - startTime > GUARD_CONFIG.maxWaitMs) {
                // Last resort: try to init ourselves if SDK is loaded but app isn't
                if (typeof firebase !== 'undefined' && firebase.auth && firebase.firestore) {
                    try {
                        if (!firebase.apps || firebase.apps.length === 0) {
                            firebase.initializeApp(GUARD_CONFIG.firebaseConfig);
                        }
                        callback(true);
                        return;
                    } catch (e) {
                        // Fall through to failure
                    }
                }
                console.warn('Pro Guard: Firebase did not load in time');
                callback(false);
                return;
            }

            // Keep waiting
            setTimeout(check, 150);
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

            console.log('Pro Guard: Firebase ready, checking auth state...');

            // Listen for auth state
            // onAuthStateChanged fires once auth persistence is resolved
            var authHandled = false;

            firebase.auth().onAuthStateChanged(function (user) {
                // Only act on the FIRST auth state callback
                if (authHandled) return;
                authHandled = true;

                if (!user) {
                    // ========== NOT SIGNED IN → LOGIN ==========
                    console.log('Pro Guard: Not signed in → login');
                    redirectToLogin();
                    return;
                }

                console.log('Pro Guard: User signed in, checking subscription...');

                // User is signed in — now check subscription
                firebase.firestore().collection('users').doc(user.uid).get()
                    .then(function (doc) {
                        if (doc.exists) {
                            var data = doc.data();
                            var status = data.subscriptionStatus;
                            var isPro = status === 'active' || 
                                        status === 'pro' || 
                                        data.isPro === true;

                            console.log('Pro Guard: subscriptionStatus =', status, '| isPro =', data.isPro, '| result =', isPro);

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