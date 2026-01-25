/* ==================== HAMBURGER MENU V2 - CENTRALISED JS ==================== */
/* ParaMind - Centralised Menu JavaScript */
/* Version 2: Updated for separate pages structure */
/* Add to your pages BEFORE </body>: <script src="js/menu-v2.js"></script> */

(function() {
    'use strict';

    // ==================== FIREBASE CONFIG (for standalone pages) ====================
    const FIREBASE_CONFIG = {
        apiKey: "AIzaSyC01FaWpNvJQ_LyXYBUx3Z5L2BYRrCNOUE",
        authDomain: "paramind-64b8e.firebaseapp.com",
        projectId: "paramind-64b8e",
        storageBucket: "paramind-64b8e.firebasestorage.app",
        messagingSenderId: "452173393964",
        appId: "1:452173393964:web:8599c0fe1983a6f441e189",
        measurementId: "G-GW385S6L0L"
    };

    // ==================== MENU CONFIGURATION ====================
    const MENU_CONFIG = {
        // Main navigation items (free features)
        mainNav: [
            { id: 'home', href: 'landing.html', icon: 'bi-house', label: 'Home' },
            { id: 'chat', href: 'chat.html', icon: 'bi-chat-dots', label: 'Chat' },
            { id: 'scenarios', href: 'scenarios.html', icon: 'bi-mortarboard', label: 'Scenarios' },
            { id: 'differentials', href: 'differentials.html', icon: 'bi-clipboard2-pulse', label: 'Differentials' }
        ],
        // Pro features
        proNav: [
            { id: 'atmist', href: 'atmist.html', icon: 'bi-telephone-outbound', label: 'ATMIST', isPro: true },
            { id: 'ecg', href: 'ecg.html', icon: 'bi-activity', label: 'ECG Tool', isPro: true },
            { id: 'cpd', href: 'cpd.html', icon: 'bi-award', label: 'CPD Portfolio', isPro: true }
        ],
        // Bottom items (Contact, Sign Out)
        bottomNav: [
            { id: 'contact', href: 'contact.html', icon: 'bi-envelope', label: 'Contact Us' }
        ]
    };

    // ==================== DETECT CURRENT PAGE ====================
    function getCurrentPage() {
        const path = window.location.pathname.toLowerCase();
        
        if (path.includes('landing')) return 'home';
        if (path.includes('chat')) return 'chat';
        if (path.includes('scenarios')) return 'scenarios';
        if (path.includes('differentials')) return 'differentials';
        if (path.includes('atmist')) return 'atmist';
        if (path.includes('ecg')) return 'ecg';
        if (path.includes('cpd')) return 'cpd';
        if (path.includes('contact')) return 'contact';
        
        // Default to home for root or unknown pages
        return 'home';
    }

    // ==================== BUILD MENU HTML ====================
    function buildMenuHTML(isPro) {
        const currentPage = getCurrentPage();
        
        function createNavItem(item) {
            const isActive = item.id === currentPage ? ' active' : '';
            // Only show Pro badge if user is NOT a Pro subscriber
            const proBadge = (item.isPro && !isPro) ? '<span class="pro-badge">Pro</span>' : '';
            return `
                <a class="menu-nav-item${isActive}" href="${item.href}" data-menu-id="${item.id}">
                    <i class="bi ${item.icon}"></i>
                    <span>${item.label}</span>
                    ${proBadge}
                </a>
            `;
        }

        // Build upgrade button HTML - only show if NOT Pro
        const upgradeHTML = !isPro ? `
            <div class="menu-divider"></div>
            <a class="menu-nav-item upgrade" href="#" id="menuUpgradeBtn">
                <i class="bi bi-star-fill"></i>
                <span>Upgrade to Pro</span>
            </a>
        ` : '';

        return `
            <!-- Menu Overlay -->
            <div class="menu-overlay" id="menuOverlay"></div>

            <!-- Slide-out Menu -->
            <nav class="slide-menu" id="slideMenu">
                <div class="menu-header">
                    <span class="brand-text">
                        <span class="brand-para">para</span><span class="brand-mind">mind</span>
                    </span>
                    <div class="menu-user-info">
                        <div id="menuUserEmail">Loading...</div>
                        <div class="menu-user-trust">
                            <i class="bi bi-hospital"></i>
                            <span id="menuUserTrust">—</span>
                        </div>
                    </div>
                </div>
                
                <div class="menu-nav">
                    <!-- Main Navigation -->
                    ${MENU_CONFIG.mainNav.map(createNavItem).join('')}
                    
                    <div class="menu-divider"></div>
                    
                    <!-- Pro Features -->
                    <div class="menu-section-label">Pro Features</div>
                    ${MENU_CONFIG.proNav.map(createNavItem).join('')}
                    
                    ${upgradeHTML}
                    
                    <div class="menu-divider"></div>
                    
                    <!-- Bottom Navigation -->
                    ${MENU_CONFIG.bottomNav.map(createNavItem).join('')}
                    
                    <button class="menu-nav-item logout" id="menuLogoutBtn">
                        <i class="bi bi-box-arrow-right"></i>
                        <span>Sign Out</span>
                    </button>
                </div>
            </nav>
        `;
    }

    // ==================== MENU FUNCTIONALITY ====================
    function initMenuFunctionality() {
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const slideMenu = document.getElementById('slideMenu');
        const menuOverlay = document.getElementById('menuOverlay');
        const menuLogoutBtn = document.getElementById('menuLogoutBtn');
        const menuUpgradeBtn = document.getElementById('menuUpgradeBtn');

        if (!hamburgerBtn || !slideMenu || !menuOverlay) {
            console.error('Menu: Required elements not found');
            return;
        }

        function openMenu() {
            hamburgerBtn.classList.add('active');
            slideMenu.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.classList.add('menu-open');
        }

        function closeMenu() {
            hamburgerBtn.classList.remove('active');
            slideMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        }

        function toggleMenu() {
            if (slideMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        // Event listeners
        hamburgerBtn.addEventListener('click', toggleMenu);
        menuOverlay.addEventListener('click', closeMenu);

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && slideMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        // Logout button
        if (menuLogoutBtn) {
            menuLogoutBtn.addEventListener('click', function() {
                closeMenu();
                // Try Firebase auth first
                if (typeof firebase !== 'undefined' && firebase.auth) {
                    firebase.auth().signOut().then(() => {
                        window.location.href = 'index.html';
                    }).catch((error) => {
                        console.error('Sign out error:', error);
                        window.location.href = 'index.html';
                    });
                } else if (typeof window.signOut === 'function') {
                    window.signOut();
                } else if (typeof window.logout === 'function') {
                    window.logout();
                } else {
                    window.location.href = 'index.html';
                }
            });
        }

        // Upgrade button
        if (menuUpgradeBtn) {
            menuUpgradeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                closeMenu();
                if (typeof window.handleUpgrade === 'function') {
                    window.handleUpgrade();
                } else if (typeof window.showUpgradeModal === 'function') {
                    window.showUpgradeModal();
                } else if (typeof window.createCheckoutSession === 'function') {
                    window.createCheckoutSession();
                } else {
                    // Fallback: redirect to a page that can handle upgrade
                    window.location.href = 'landing.html?upgrade=true';
                }
            });
        }

        // Expose functions globally
        window.ParamindMenu = {
            open: openMenu,
            close: closeMenu,
            toggle: toggleMenu,
            updateUser: function(email, trust) {
                const emailEl = document.getElementById('menuUserEmail');
                const trustEl = document.getElementById('menuUserTrust');
                if (email && emailEl) emailEl.textContent = email;
                if (trust && trustEl) trustEl.textContent = trust;
            }
        };
    }

    // ==================== GET USER DATA ====================
    // This function tries multiple methods to get user data:
    // 1. From existing DOM elements (if populated by another script)
    // 2. From Firebase compat SDK
    
    function getUserData(callback) {
        // Method 1: Try to read from existing DOM elements
        const existingEmail = document.querySelector('#userEmail');
        const existingTrust = document.querySelector('#userTrust');
        const proBadge = document.querySelector('#proBadgeWelcome');
        
        // Check if these elements have real data (not just placeholders)
        if (existingEmail && existingEmail.textContent && 
            existingEmail.textContent !== 'user@nhs.net' && 
            existingEmail.textContent !== 'Loading...') {
            
            // User data already available in DOM
            const isPro = proBadge && proBadge.style.display !== 'none';
            callback({
                email: existingEmail.textContent,
                trust: existingTrust ? existingTrust.textContent : null,
                isPro: isPro
            });
            return;
        }
        
        // Method 2: Load Firebase and get user data
        loadFirebaseAndGetUser(callback);
    }
    
    // Load Firebase SDK dynamically if not already loaded
    function loadFirebaseAndGetUser(callback) {
        // Check if Firebase is already loaded
        if (typeof firebase !== 'undefined' && firebase.auth) {
            initFromFirebaseCompat(callback);
            return;
        }
        
        // Prevent multiple loading attempts
        if (window._firebaseLoading) {
            // Wait and retry
            setTimeout(() => loadFirebaseAndGetUser(callback), 100);
            return;
        }
        
        window._firebaseLoading = true;
        
        // Load Firebase scripts
        const scripts = [
            'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js',
            'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js',
            'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js'
        ];
        
        let loaded = 0;
        scripts.forEach((src, index) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                loaded++;
                if (loaded === scripts.length) {
                    window._firebaseLoading = false;
                    try {
                        initFromFirebaseCompat(callback);
                    } catch (e) {
                        console.error('Menu: Firebase init error', e);
                        window._firebaseLoading = false;
                        callback({ email: null, trust: null, isPro: false });
                    }
                }
            };
            script.onerror = () => {
                console.error('Menu: Failed to load Firebase script', src);
                window._firebaseLoading = false;
                callback({ email: null, trust: null, isPro: false });
            };
            document.head.appendChild(script);
        });
    }
    
    // Initialize from Firebase compat SDK
    function initFromFirebaseCompat(callback) {
        if (typeof firebase === 'undefined' || !firebase.auth) {
            callback({ email: null, trust: null, isPro: false });
            return;
        }
        
        // Initialize if not already done
        try {
            if (!firebase.apps || firebase.apps.length === 0) {
                firebase.initializeApp(FIREBASE_CONFIG);
            }
        } catch (e) {
            // Already initialized, that's fine
        }
        
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in - get their data from Firestore
                if (firebase.firestore) {
                    firebase.firestore().collection('users').doc(user.uid).get()
                        .then(function(doc) {
                            if (doc.exists) {
                                const data = doc.data();
                                callback({
                                    email: user.email,
                                    trust: data.trust || data.trustName || null,
                                    isPro: data.subscriptionStatus === 'active' || data.isPro === true
                                });
                            } else {
                                callback({
                                    email: user.email,
                                    trust: null,
                                    isPro: false
                                });
                            }
                        })
                        .catch(function(error) {
                            console.error('Menu: Error fetching user data:', error);
                            callback({
                                email: user.email,
                                trust: null,
                                isPro: false
                            });
                        });
                } else {
                    callback({
                        email: user.email,
                        trust: null,
                        isPro: false
                    });
                }
            } else {
                // User not signed in - redirect to login
                callback({ email: null, trust: null, isPro: false });
            }
        });
    }

    // ==================== UPDATE USER DISPLAY ====================
    function updateUserDisplay(email, trust) {
        const menuUserEmail = document.getElementById('menuUserEmail');
        const menuUserTrust = document.getElementById('menuUserTrust');

        if (menuUserEmail && email) {
            menuUserEmail.textContent = email;
        } else if (menuUserEmail) {
            menuUserEmail.textContent = 'Not signed in';
        }

        if (menuUserTrust && trust) {
            menuUserTrust.textContent = trust;
        } else if (menuUserTrust) {
            menuUserTrust.textContent = '—';
        }
    }

    // ==================== INITIALIZE ====================
    function init() {
        // Check if hamburger button exists
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        if (!hamburgerBtn) {
            console.error('Menu: Hamburger button not found. Please add: <button class="hamburger-btn" id="hamburgerBtn"><span></span><span></span><span></span></button>');
            return;
        }

        // Get user data and initialize menu
        getUserData(function(userData) {
            // Remove existing menu if any (in case of re-init)
            const existingMenu = document.getElementById('menuContainer');
            if (existingMenu) {
                existingMenu.remove();
            }

            // Inject menu HTML into the page
            const menuContainer = document.createElement('div');
            menuContainer.id = 'menuContainer';
            menuContainer.innerHTML = buildMenuHTML(userData.isPro);
            document.body.insertBefore(menuContainer, document.body.firstChild);

            // Initialize functionality
            initMenuFunctionality();

            // Update user display
            updateUserDisplay(userData.email, userData.trust);

            console.log('Menu v2: Initialized successfully', userData.isPro ? '(Pro user)' : '(Free user)');
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();