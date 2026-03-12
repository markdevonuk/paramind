/* ============================================
   PARAMIND - Upgrade Modal
   Shared across all pages. Shows a plan picker
   (monthly vs annual) before going to Stripe.
   
   Just add <script src="js/upgrade-modal.js"></script>
   before </body> on any page.
   ============================================ */

(function () {
    // ==================== INJECT MODAL HTML ====================
    const modalHTML = `
        <div class="pm-upgrade-overlay" id="pmUpgradeOverlay">
            <div class="pm-upgrade-modal">
                <button class="pm-upgrade-close" id="pmUpgradeClose">&times;</button>
                <div class="pm-upgrade-header">
                    <i class="bi bi-star-fill pm-upgrade-star"></i>
                    <h3>Upgrade to <span class="brand-para">para</span><span class="brand-mind">mind</span> Pro</h3>
                    <p>Unlimited messages, all scenarios, CPD certificates & more</p>
                </div>

                <div class="pm-plan-options">
                    <!-- Monthly Option -->
                    <div class="pm-plan-card pm-plan-selected" id="pmPlanMonthly" data-plan="monthly">
                        <div class="pm-plan-radio"></div>
                        <div class="pm-plan-details">
                            <div class="pm-plan-name">Monthly</div>
                            <div class="pm-plan-price">£4.99<span>/month</span></div>
                        </div>
                    </div>

                    <!-- Annual Option -->
                    <div class="pm-plan-card" id="pmPlanAnnual" data-plan="annual">
                        <div class="pm-plan-badge">Save £10</div>
                        <div class="pm-plan-radio"></div>
                        <div class="pm-plan-details">
                            <div class="pm-plan-name">Annual</div>
                            <div class="pm-plan-price">£49.99<span>/year</span></div>
                            <div class="pm-plan-sub">Just £4.17/month</div>
                        </div>
                    </div>
                </div>

                <button class="pm-upgrade-btn" id="pmUpgradeBtn">
                    <i class="bi bi-lock-fill me-1"></i> Continue to Checkout
                </button>
                <p class="pm-upgrade-footer">Cancel anytime. Secure payment via Stripe.<br><span style="font-size: 0.7rem; line-height: 1.5;">Subscriptions auto-renew monthly (£4.99/mo) or annually (£49.99/yr) until cancelled.<br><a href="terms.html" style="color: #2B8A9C;">Terms</a> · <a href="privacy.html" style="color: #2B8A9C;">Privacy</a></span></p>
            </div>
        </div>
    `;

    // ==================== INJECT MODAL CSS ====================
    const modalCSS = `
        .pm-upgrade-overlay {
            display: none;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            z-index: 10000;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            animation: pmFadeIn 0.2s ease;
        }
        .pm-upgrade-overlay.pm-visible {
            display: flex;
        }
        @keyframes pmFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .pm-upgrade-modal {
            background: #fff;
            border-radius: 16px;
            padding: 2rem;
            max-width: 400px;
            width: 100%;
            position: relative;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: pmSlideUp 0.3s ease;
        }
        @keyframes pmSlideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .pm-upgrade-close {
            position: absolute;
            top: 12px; right: 16px;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #999;
            cursor: pointer;
            line-height: 1;
            padding: 0;
        }
        .pm-upgrade-close:hover { color: #333; }
        .pm-upgrade-header {
            text-align: center;
            margin-bottom: 1.5rem;
        }
        .pm-upgrade-star {
            font-size: 2rem;
            color: #2B8A9C;
            margin-bottom: 0.5rem;
            display: block;
        }
        .pm-upgrade-header h3 {
            font-size: 1.3rem;
            margin: 0 0 0.35rem 0;
            color: #1a1a2e;
        }
        .pm-upgrade-header p {
            font-size: 0.85rem;
            color: #6c757d;
            margin: 0;
        }

        /* Plan Cards */
        .pm-plan-options {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
        }
        .pm-plan-card {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem;
            border: 2px solid #e9ecef;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
        }
        .pm-plan-card:hover {
            border-color: #b0d4db;
        }
        .pm-plan-card.pm-plan-selected {
            border-color: #2B8A9C;
            background: rgba(43, 138, 156, 0.04);
        }
        .pm-plan-radio {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid #ccc;
            flex-shrink: 0;
            transition: all 0.2s ease;
            position: relative;
        }
        .pm-plan-selected .pm-plan-radio {
            border-color: #2B8A9C;
        }
        .pm-plan-selected .pm-plan-radio::after {
            content: '';
            position: absolute;
            top: 3px; left: 3px;
            width: 10px; height: 10px;
            background: #2B8A9C;
            border-radius: 50%;
        }
        .pm-plan-details {
            flex: 1;
        }
        .pm-plan-name {
            font-weight: 600;
            color: #1a1a2e;
            font-size: 0.95rem;
        }
        .pm-plan-price {
            font-size: 1.25rem;
            font-weight: 700;
            color: #1a1a2e;
        }
        .pm-plan-price span {
            font-size: 0.85rem;
            font-weight: 400;
            color: #6c757d;
        }
        .pm-plan-sub {
            font-size: 0.8rem;
            color: #2B8A9C;
            font-weight: 500;
        }
        .pm-plan-badge {
            position: absolute;
            top: -10px; right: 12px;
            background: linear-gradient(135deg, #2B8A9C 0%, #5CB85C 100%);
            color: #fff;
            font-size: 0.7rem;
            font-weight: 600;
            padding: 0.15rem 0.6rem;
            border-radius: 20px;
            text-transform: uppercase;
        }

        /* CTA Button */
        .pm-upgrade-btn {
            width: 100%;
            padding: 0.85rem;
            background: linear-gradient(135deg, #2B8A9C 0%, #5CB85C 100%);
            color: #fff;
            border: none;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .pm-upgrade-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 15px rgba(43, 138, 156, 0.35);
        }
        .pm-upgrade-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
        .pm-upgrade-footer {
            text-align: center;
            font-size: 0.75rem;
            color: #999;
            margin: 0.75rem 0 0 0;
        }
    `;

    // ==================== INSERT INTO PAGE ====================
    // Add CSS
    const styleEl = document.createElement('style');
    styleEl.textContent = modalCSS;
    document.head.appendChild(styleEl);

    // Add HTML
    const wrapper = document.createElement('div');
    wrapper.innerHTML = modalHTML;
    document.body.appendChild(wrapper.firstElementChild);

    // ==================== MODAL LOGIC ====================
    let selectedPlan = 'monthly';

    const overlay = document.getElementById('pmUpgradeOverlay');
    const closeBtn = document.getElementById('pmUpgradeClose');
    const monthlyCard = document.getElementById('pmPlanMonthly');
    const annualCard = document.getElementById('pmPlanAnnual');
    const checkoutBtn = document.getElementById('pmUpgradeBtn');

    function selectPlan(plan) {
        selectedPlan = plan;
        monthlyCard.classList.toggle('pm-plan-selected', plan === 'monthly');
        annualCard.classList.toggle('pm-plan-selected', plan === 'annual');
    }

    monthlyCard.addEventListener('click', function () { selectPlan('monthly'); });
    annualCard.addEventListener('click', function () { selectPlan('annual'); });

    // Close modal
    closeBtn.addEventListener('click', function () {
        overlay.classList.remove('pm-visible');
    });
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) overlay.classList.remove('pm-visible');
    });

    // ==================== DETECT NATIVE PLATFORM ====================
    const isNativePlatform = window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform();
    const isIOS = isNativePlatform && window.Capacitor.getPlatform && window.Capacitor.getPlatform() === 'ios';
    const isAndroid = isNativePlatform && window.Capacitor.getPlatform && window.Capacitor.getPlatform() === 'android';

    // Update footer text for iOS
    if (isIOS) {
        const footer = document.querySelector('.pm-upgrade-footer');
        if (footer) {
            footer.innerHTML = 'Cancel anytime. Secure payment via Apple.<br><button id="pmRestorePurchases" style="margin-top:0.5rem; padding:0.5rem 1.25rem; background:transparent; color:#2B8A9C; border:1px solid #2B8A9C; border-radius:6px; font-family:inherit; font-size:0.85rem; font-weight:600; cursor:pointer;">Restore Purchases</button><br><span style="font-size: 0.7rem; line-height: 1.5;">Subscriptions auto-renew monthly (£4.99/mo) or annually (£49.99/yr) until cancelled.<br><a href="terms.html" style="color: #2B8A9C;">Terms</a> · <a href="privacy.html" style="color: #2B8A9C;">Privacy</a> · <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" style="color: #2B8A9C;">Apple EULA</a></span>';
        }
        // Restore purchases handler
        setTimeout(function() {
            const restoreLink = document.getElementById('pmRestorePurchases');
            if (restoreLink) {
                restoreLink.addEventListener('click', async function(e) {
                    e.preventDefault();
                    try {
                        restoreLink.disabled = true;
                        restoreLink.textContent = 'Restoring...';
                        const NativePurchases = window.Capacitor.Plugins.NativePurchases;
                        await NativePurchases.restorePurchases();

                        // Check if any active subscriptions were found
                        const purchases = await NativePurchases.getPurchases({ productType: 'subs' });
                        if (purchases && purchases.purchases && purchases.purchases.length > 0) {
                            const tx = purchases.purchases[0];

                            // Step 1: Always write directly to Firestore first — guaranteed path
                            if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
                                const uid = firebase.auth().currentUser.uid;
                                await firebase.firestore().collection('users').doc(uid).update({
                                    subscriptionStatus: 'active',
                                    subscriptionPlatform: 'apple',
                                    appleProductId: tx.productIdentifier || null,
                                    appleTransactionId: tx.transactionId || null,
                                    appleRestoredAt: new Date().toISOString(),
                                    subscriptionUpdatedAt: new Date().toISOString()
                                });
                            }

                            // Step 2: Also call backend to verify (non-blocking, best effort)
                            try {
                                let token;
                                if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
                                    token = await firebase.auth().currentUser.getIdToken();
                                }
                                if (token) {
                                    const baseUrl = window.paramind?.CONFIG?.api?.baseUrl
                                        || (typeof API_CONFIG !== 'undefined' ? API_CONFIG.baseUrl : null)
                                        || 'https://europe-west2-paramind-64b8e.cloudfunctions.net';
                                    fetch(baseUrl + '/verifyApplePurchase', {
                                        method: 'POST',
                                        headers: {
                                            'Authorization': 'Bearer ' + token,
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            productId: tx.productIdentifier || null,
                                            transactionId: tx.transactionId || null,
                                            receipt: tx.receipt || null,
                                            restored: true
                                        })
                                    }).catch(function(e) { console.warn('Backend verify failed (non-critical):', e); });
                                }
                            } catch (verifyErr) {
                                console.warn('Backend verify error (non-critical):', verifyErr);
                            }

                            // Step 3: Update local cache
                            try {
                                const cached = JSON.parse(localStorage.getItem('paramind_user') || '{}');
                                cached.subscriptionStatus = 'active';
                                localStorage.setItem('paramind_user', JSON.stringify(cached));
                            } catch (e) {}

                            overlay.classList.remove('pm-visible');
                            alert('Your Pro subscription has been restored! 🎉');
                            window.location.reload();
                        } else {
                            restoreLink.disabled = false; restoreLink.textContent = 'Restore Purchases';
                            alert('No previous subscription found for this Apple ID.');
                        }
                    } catch (err) {
                        console.error('Restore failed:', err);
                        restoreLink.disabled = false; restoreLink.textContent = 'Restore Purchases';
                        alert('Could not restore purchases. Please try again.');
                    }
                });
            }
        }, 100);
    }

    // Update footer text for Android
    if (isAndroid) {
        const footer = document.querySelector('.pm-upgrade-footer');
        if (footer) {
            footer.innerHTML = 'Cancel anytime. Secure payment via Google Play.<br><button id="pmRestorePurchasesAndroid" style="margin-top:0.5rem; padding:0.5rem 1.25rem; background:transparent; color:#2B8A9C; border:1px solid #2B8A9C; border-radius:6px; font-family:inherit; font-size:0.85rem; font-weight:600; cursor:pointer;">Restore Purchases</button><br><span style="font-size: 0.7rem; line-height: 1.5;">Subscriptions auto-renew monthly (£4.99/mo) or annually (£49.99/yr) until cancelled.<br><a href="terms.html" style="color: #2B8A9C;">Terms</a> · <a href="privacy.html" style="color: #2B8A9C;">Privacy</a></span>';
        }
        // Restore purchases handler for Android
        setTimeout(function() {
            const restoreLinkAndroid = document.getElementById('pmRestorePurchasesAndroid');
            if (restoreLinkAndroid) {
                restoreLinkAndroid.addEventListener('click', async function(e) {
                    e.preventDefault();
                    try {
                        restoreLinkAndroid.disabled = true;
                        restoreLinkAndroid.textContent = 'Restoring...';
                        const NativePurchases = window.Capacitor.Plugins.NativePurchases;

                        const purchases = await NativePurchases.getPurchases({ productType: 'subs' });
                        if (purchases && purchases.purchases && purchases.purchases.length > 0) {
                            let token;
                            if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
                                token = await firebase.auth().currentUser.getIdToken();
                            }
                            if (token) {
                                const baseUrl = window.paramind?.CONFIG?.api?.baseUrl
                                    || (typeof API_CONFIG !== 'undefined' ? API_CONFIG.baseUrl : null)
                                    || 'https://europe-west2-paramind-64b8e.cloudfunctions.net';
                                try {
                                    const tx = purchases.purchases[0];
                                    await fetch(baseUrl + '/verifyGooglePurchase', {
                                        method: 'POST',
                                        headers: {
                                            'Authorization': 'Bearer ' + token,
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            productId: tx.productIdentifier || tx.productId || null,
                                            purchaseToken: tx.purchaseToken || null,
                                            transactionId: tx.transactionId || null,
                                            restored: true
                                        })
                                    });
                                } catch (verifyErr) {
                                    const uid = firebase.auth().currentUser.uid;
                                    await firebase.firestore().collection('users').doc(uid).update({
                                        subscriptionStatus: 'active',
                                        subscriptionPlatform: 'google',
                                        subscriptionUpdatedAt: new Date().toISOString()
                                    });
                                }
                            }
                            try {
                                const cached = JSON.parse(localStorage.getItem('paramind_user') || '{}');
                                cached.subscriptionStatus = 'active';
                                localStorage.setItem('paramind_user', JSON.stringify(cached));
                            } catch (e) {}

                            overlay.classList.remove('pm-visible');
                            alert('Your Pro subscription has been restored! 🎉');
                            window.location.reload();
                        } else {
                            restoreLinkAndroid.disabled = false; restoreLinkAndroid.textContent = 'Restore Purchases';
                            alert('No previous subscription found for this Google account.');
                        }
                    } catch (err) {
                        console.error('Restore failed:', err);
                        restoreLinkAndroid.disabled = false; restoreLinkAndroid.textContent = 'Restore Purchases';
                        alert('Could not restore purchases. Please try again.');
                    }
                });
            }
        }, 100);
    }

    // Try to load real App Store prices when on iOS
    if (isIOS) {
        (async function loadAppStorePrices() {
            try {
                const NativePurchases = window.Capacitor.Plugins.NativePurchases;
                if (!NativePurchases) return;

                const result = await NativePurchases.getProducts({
                    productIdentifiers: ['paramind_pro_monthly', 'paramind_pro_annual'],
                    productType: 'subs'
                });

                if (result && result.products) {
                    result.products.forEach(function(product) {
                        if (product.identifier === 'paramind_pro_monthly') {
                            const priceEl = document.querySelector('#pmPlanMonthly .pm-plan-price');
                            if (priceEl) priceEl.innerHTML = product.priceString + '<span>/month</span>';
                        }
                        if (product.identifier === 'paramind_pro_annual') {
                            const priceEl = document.querySelector('#pmPlanAnnual .pm-plan-price');
                            if (priceEl) priceEl.innerHTML = product.priceString + '<span>/year</span>';
                        }
                    });
                }
            } catch (e) {
                console.log('Could not load App Store prices:', e);
            }
        })();
    }

    // Try to load real Google Play prices when on Android
    if (isAndroid) {
        (async function loadGooglePlayPrices() {
            try {
                const NativePurchases = window.Capacitor.Plugins.NativePurchases;
                if (!NativePurchases) return;

                const result = await NativePurchases.getProducts({
                    productIdentifiers: ['paramind_pro_monthly', 'paramind_pro_annual'],
                    productType: 'subs'
                });

                if (result && result.products) {
                    result.products.forEach(function(product) {
                        if (product.identifier === 'paramind_pro_monthly') {
                            const priceEl = document.querySelector('#pmPlanMonthly .pm-plan-price');
                            if (priceEl) priceEl.innerHTML = product.priceString + '<span>/month</span>';
                        }
                        if (product.identifier === 'paramind_pro_annual') {
                            const priceEl = document.querySelector('#pmPlanAnnual .pm-plan-price');
                            if (priceEl) priceEl.innerHTML = product.priceString + '<span>/year</span>';
                        }
                    });
                }
            } catch (e) {
                console.log('Could not load Google Play prices:', e);
            }
        })();
    }

    // ==================== CHECKOUT ====================
    checkoutBtn.addEventListener('click', async function () {
        const btn = checkoutBtn;
        const originalText = btn.innerHTML;

        try {
            btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Loading...';
            btn.disabled = true;

            // ==================== iOS IN-APP PURCHASE ====================
            if (isIOS) {
                const NativePurchases = window.Capacitor.Plugins.NativePurchases;
                const productId = selectedPlan === 'monthly' ? 'paramind_pro_monthly' : 'paramind_pro_annual';

                // Process the purchase via Apple
                const transaction = await NativePurchases.purchaseProduct({ productIdentifier: productId });
                console.log('Apple purchase successful:', JSON.stringify(transaction));

                // Update Firestore directly first (most reliable)
                let uid = null;
                try {
                    if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
                        uid = firebase.auth().currentUser.uid;
                    } else if (typeof auth !== 'undefined' && auth.currentUser) {
                        uid = auth.currentUser.uid;
                    }
                    if (uid) {
                        console.log('Updating Firestore directly for user:', uid);
                        await firebase.firestore().collection('users').doc(uid).update({
                            subscriptionStatus: 'active',
                            subscriptionPlatform: 'apple',
                            appleProductId: productId,
                            appleTransactionId: transaction.transactionId || '',
                            subscriptionUpdatedAt: new Date().toISOString()
                        });
                        console.log('Firestore updated successfully');
                    }
                } catch (firestoreErr) {
                    console.error('Firestore direct update failed:', firestoreErr);
                }

                // Also try backend verification (non-blocking)
                try {
                    let token;
                    if (typeof getAuthToken === 'function') {
                        token = await getAuthToken();
                    } else if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
                        token = await firebase.auth().currentUser.getIdToken();
                    } else if (typeof auth !== 'undefined' && auth.currentUser) {
                        token = await auth.currentUser.getIdToken();
                    }

                    if (token) {
                        const baseUrl = window.paramind?.CONFIG?.api?.baseUrl
                            || (typeof API_CONFIG !== 'undefined' ? API_CONFIG.baseUrl : null)
                            || 'https://europe-west2-paramind-64b8e.cloudfunctions.net';

                        console.log('Calling verifyApplePurchase...');
                        fetch(baseUrl + '/verifyApplePurchase', {
                            method: 'POST',
                            headers: {
                                'Authorization': 'Bearer ' + token,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                productId: productId,
                                transactionId: transaction.transactionId || null,
                                receipt: transaction.receipt || null,
                                jwsRepresentation: transaction.jwsRepresentation || null
                            })
                        }).then(r => console.log('Backend verify status:', r.status))
                          .catch(e => console.warn('Backend verify failed:', e));
                    }
                } catch (tokenErr) {
                    console.warn('Could not get auth token for backend:', tokenErr);
                }

                // Update local cache
                try {
                    const cached = JSON.parse(localStorage.getItem('paramind_user') || '{}');
                    cached.subscriptionStatus = 'active';
                    localStorage.setItem('paramind_user', JSON.stringify(cached));
                } catch (e) {}

                // Success — close modal and reload
                overlay.classList.remove('pm-visible');
                alert('Welcome to Paramind Pro! 🎉');
                window.location.reload();
                return;
            }

            // ==================== ANDROID IN-APP PURCHASE ====================
            if (isAndroid) {
                const NativePurchases = window.Capacitor.Plugins.NativePurchases;
                const productId = selectedPlan === 'monthly' ? 'paramind_pro_monthly' : 'paramind_pro_annual';

                const transaction = await NativePurchases.purchaseProduct({ productIdentifier: productId });
                console.log('Google Play purchase successful:', JSON.stringify(transaction));

                let uid = null;
                try {
                    if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
                        uid = firebase.auth().currentUser.uid;
                    } else if (typeof auth !== 'undefined' && auth.currentUser) {
                        uid = auth.currentUser.uid;
                    }
                    if (uid) {
                        console.log('Updating Firestore directly for user:', uid);
                        await firebase.firestore().collection('users').doc(uid).update({
                            subscriptionStatus: 'active',
                            subscriptionPlatform: 'google',
                            googleProductId: productId,
                            googleTransactionId: transaction.transactionId || '',
                            googlePurchaseToken: transaction.purchaseToken || '',
                            subscriptionUpdatedAt: new Date().toISOString()
                        });
                        console.log('Firestore updated successfully');
                    }
                } catch (firestoreErr) {
                    console.error('Firestore direct update failed:', firestoreErr);
                }

                try {
                    let token;
                    if (typeof getAuthToken === 'function') {
                        token = await getAuthToken();
                    } else if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
                        token = await firebase.auth().currentUser.getIdToken();
                    } else if (typeof auth !== 'undefined' && auth.currentUser) {
                        token = await auth.currentUser.getIdToken();
                    }

                    if (token) {
                        const baseUrl = window.paramind?.CONFIG?.api?.baseUrl
                            || (typeof API_CONFIG !== 'undefined' ? API_CONFIG.baseUrl : null)
                            || 'https://europe-west2-paramind-64b8e.cloudfunctions.net';
                        console.log('Calling verifyGooglePurchase...');
                        fetch(baseUrl + '/verifyGooglePurchase', {
                            method: 'POST',
                            headers: {
                                'Authorization': 'Bearer ' + token,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                productId: productId,
                                purchaseToken: transaction.purchaseToken || null,
                                transactionId: transaction.transactionId || null
                            })
                        }).then(r => console.log('Backend verify status:', r.status))
                          .catch(e => console.warn('Backend verify failed:', e));
                    }
                } catch (tokenErr) {
                    console.warn('Could not get auth token for backend:', tokenErr);
                }

                try {
                    const cached = JSON.parse(localStorage.getItem('paramind_user') || '{}');
                    cached.subscriptionStatus = 'active';
                    localStorage.setItem('paramind_user', JSON.stringify(cached));
                } catch (e) {}

                overlay.classList.remove('pm-visible');
                alert('Welcome to Paramind Pro! 🎉');
                window.location.reload();
                return;
            }

            // ==================== WEB — STRIPE CHECKOUT ====================
            // Get the auth token — try multiple methods used across the app
            let token;
            if (typeof getAuthToken === 'function') {
                token = await getAuthToken();
            } else if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
                token = await firebase.auth().currentUser.getIdToken();
            } else if (typeof auth !== 'undefined' && auth.currentUser) {
                token = await auth.currentUser.getIdToken();
            } else {
                alert('Please sign in to upgrade.');
                window.location.href = 'login.html';
                return;
            }

            // Get the API base URL — try multiple methods used across the app
            const baseUrl = window.paramind?.CONFIG?.api?.baseUrl
                || (typeof API_CONFIG !== 'undefined' ? API_CONFIG.baseUrl : null)
                || 'https://europe-west2-paramind-64b8e.cloudfunctions.net';
            const endpoint = window.paramind?.CONFIG?.api?.createCheckout
                || window.paramind?.CONFIG?.api?.checkout
                || '/createCheckoutSession';

            const response = await fetch(`${baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ plan: selectedPlan })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Checkout failed');

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error('Upgrade error:', error);
            // Don't show error if user cancelled Apple purchase
            const errorMsg = (error.message || error.code || '').toLowerCase();
            if (errorMsg.includes('cancel') || errorMsg.includes('user_canceled') || errorMsg.includes('paymentcancelled')) {
                // User cancelled — just reset button
            } else if (isIOS) {
                alert('Purchase could not be completed. Please try again.');
            } else if (isAndroid) {
                alert('Purchase could not be completed. Please try again.');
            } else {
                alert('Unable to start checkout. Please try again.');
            }
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    });

    // ==================== PUBLIC FUNCTION ====================
    window.showUpgradeModal = function () {
        selectedPlan = 'monthly';
        selectPlan('monthly');
        checkoutBtn.innerHTML = '<i class="bi bi-lock-fill me-1"></i> Continue to Checkout';
        checkoutBtn.disabled = false;
        overlay.classList.add('pm-visible');
    };

    // ==================== OVERRIDE handleUpgrade GLOBALLY ====================
    // This runs after the page's own scripts, so it takes over all upgrade buttons
    document.addEventListener('DOMContentLoaded', function () {
        window.handleUpgrade = function (e) {
            if (e && e.preventDefault) e.preventDefault();
            window.showUpgradeModal();
        };
        // Also override createCheckoutSession so any code calling it shows the modal
        window.createCheckoutSession = function () {
            window.showUpgradeModal();
        };
    });
})();