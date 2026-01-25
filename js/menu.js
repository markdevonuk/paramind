/* ==================== HAMBURGER MENU - CENTRALISED JS ==================== */
/* ParaMind - Centralised Menu JavaScript */
/* Add to your pages: <script src="js/menu.js"></script> */

(function() {
    'use strict';

    // ==================== CONFIGURATION ====================
    // Define all menu items here - easy to add/remove/reorder
    const MENU_CONFIG = {
        // Main navigation items
        mainNav: [
            { id: 'chat', href: 'chat.html', icon: 'bi-chat-dots', label: 'Chat' },
            { id: 'scenarios', href: 'chat.html#scenarios', icon: 'bi-mortarboard', label: 'Scenarios' },
            { id: 'patient', href: 'chat.html#patient', icon: 'bi-clipboard2-pulse', label: 'Patient' }
        ],
        // Pro features
        proNav: [
            { id: 'atmist', href: 'atmist.html', icon: 'bi-telephone-outbound', label: 'ATMIST', isPro: true },
            { id: 'ecg', href: 'ecg.html', icon: 'bi-activity', label: 'ECG Tool', isPro: true }
        ],
        // Other items
        otherNav: [
            { id: 'cpd', href: 'chat.html#cpd', icon: 'bi-award', label: 'CPD Portfolio' }
        ],
        // Footer items
        footerNav: [
            { id: 'contact', href: 'contact.html', icon: 'bi-envelope', label: 'Contact Us' }
        ]
    };

    // ==================== DETECT CURRENT PAGE ====================
    function getCurrentPage() {
        const path = window.location.pathname.toLowerCase();
        const hash = window.location.hash.toLowerCase();
        
        if (path.includes('atmist')) return 'atmist';
        if (path.includes('ecg')) return 'ecg';
        if (path.includes('contact')) return 'contact';
        if (hash.includes('scenarios')) return 'scenarios';
        if (hash.includes('patient')) return 'patient';
        if (hash.includes('cpd')) return 'cpd';
        if (path.includes('chat') || path.endsWith('/') || path.includes('index')) return 'chat';
        
        return 'chat'; // Default
    }

    // ==================== BUILD MENU HTML ====================
    function buildMenuHTML() {
        const currentPage = getCurrentPage();
        
        // Helper to create nav item HTML
        function createNavItem(item) {
            const isActive = item.id === currentPage ? ' active' : '';
            const proBadge = item.isPro ? '<span class="pro-badge">Pro</span>' : '';
            return `
                <a class="menu-nav-item${isActive}" href="${item.href}" data-menu-id="${item.id}">
                    <i class="bi ${item.icon}"></i>
                    <span>${item.label}</span>
                    ${proBadge}
                </a>
            `;
        }

        // Build the complete menu HTML
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
                    ${MENU_CONFIG.mainNav.map(createNavItem).join('')}
                    
                    <div class="menu-divider"></div>
                    
                    ${MENU_CONFIG.proNav.map(createNavItem).join('')}
                    
                    <div class="menu-divider"></div>
                    
                    ${MENU_CONFIG.otherNav.map(createNavItem).join('')}
                    
                    <div class="menu-divider"></div>
                    
                    <a class="menu-nav-item upgrade" href="#" id="menuUpgradeBtn">
                        <i class="bi bi-star-fill"></i>
                        <span>Upgrade to Pro</span>
                    </a>
                </div>
                
                <div class="menu-footer">
                    ${MENU_CONFIG.footerNav.map(createNavItem).join('')}
                    <button class="menu-nav-item logout" id="menuLogoutBtn">
                        <i class="bi bi-box-arrow-right"></i>
                        <span>Sign Out</span>
                    </button>
                </div>
            </nav>
        `;
    }

    // ==================== INJECT HAMBURGER BUTTON ====================
    function injectHamburgerButton() {
        // Look for existing header elements to add the button to
        const possibleContainers = [
            document.querySelector('.header-right'),
            document.querySelector('.navbar .container .d-flex'),
            document.querySelector('.atmist-navbar .container .d-flex'),
            document.querySelector('.ecg-navbar .container .d-flex'),
            document.querySelector('header'),
            document.querySelector('nav')
        ];

        // Check if hamburger already exists
        if (document.getElementById('hamburgerBtn')) {
            return document.getElementById('hamburgerBtn');
        }

        // Create the hamburger button
        const hamburgerBtn = document.createElement('button');
        hamburgerBtn.className = 'hamburger-btn';
        hamburgerBtn.id = 'hamburgerBtn';
        hamburgerBtn.setAttribute('aria-label', 'Open menu');
        hamburgerBtn.innerHTML = '<span></span><span></span><span></span>';

        // Try to find the best place to insert it
        for (const container of possibleContainers) {
            if (container) {
                container.appendChild(hamburgerBtn);
                return hamburgerBtn;
            }
        }

        // If no suitable container found, append to body (fallback)
        console.warn('Menu: No suitable container found for hamburger button');
        document.body.appendChild(hamburgerBtn);
        return hamburgerBtn;
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

        // Toggle menu
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

        // Handle menu item clicks for hash navigation
        slideMenu.querySelectorAll('.menu-nav-item[href*="#"]').forEach(item => {
            item.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                // If we're on the same page, just close menu and handle hash
                if (href.startsWith('chat.html#') && window.location.pathname.includes('chat')) {
                    e.preventDefault();
                    closeMenu();
                    const hash = href.split('#')[1];
                    // Trigger view switch if function exists
                    if (typeof window.switchView === 'function') {
                        window.switchView(hash);
                    } else {
                        window.location.hash = hash;
                    }
                }
            });
        });

        // Logout button
        if (menuLogoutBtn) {
            menuLogoutBtn.addEventListener('click', function() {
                closeMenu();
                // Try to use existing logout function
                if (typeof window.signOut === 'function') {
                    window.signOut();
                } else if (typeof window.logout === 'function') {
                    window.logout();
                } else if (typeof firebase !== 'undefined' && firebase.auth) {
                    firebase.auth().signOut().then(() => {
                        window.location.href = 'index.html';
                    });
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
                // Try to use existing upgrade function
                if (typeof window.handleUpgrade === 'function') {
                    window.handleUpgrade();
                } else if (typeof window.showUpgradeModal === 'function') {
                    window.showUpgradeModal();
                } else {
                    // Fallback - look for upgrade button on page
                    const upgradeBtn = document.querySelector('[data-upgrade], #upgradeBtn, .upgrade-btn');
                    if (upgradeBtn) {
                        upgradeBtn.click();
                    }
                }
            });
        }
    }

    // ==================== SYNC USER INFO ====================
    function syncUserInfo() {
        const menuUserEmail = document.getElementById('menuUserEmail');
        const menuUserTrust = document.getElementById('menuUserTrust');

        if (!menuUserEmail || !menuUserTrust) return;

        // Try to get user info from various sources
        function updateUserDisplay(email, trust) {
            if (email) menuUserEmail.textContent = email;
            if (trust) menuUserTrust.textContent = trust;
        }

        // Method 1: Check for existing elements on the page
        const existingEmail = document.querySelector('#userEmail, .user-email, [data-user-email]');
        const existingTrust = document.querySelector('#userTrust, #trustBadge, .trust-badge, [data-user-trust]');
        
        if (existingEmail) {
            updateUserDisplay(existingEmail.textContent, existingTrust?.textContent);
        }

        // Method 2: Check Firebase auth
        if (typeof firebase !== 'undefined' && firebase.auth) {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    updateUserDisplay(user.email, null);
                    
                    // Try to get trust from Firestore
                    if (firebase.firestore) {
                        firebase.firestore().collection('users').doc(user.uid).get()
                            .then(doc => {
                                if (doc.exists && doc.data().trust) {
                                    updateUserDisplay(null, doc.data().trust);
                                }
                            })
                            .catch(() => {});
                    }
                }
            });
        }

        // Method 3: Check localStorage
        const storedEmail = localStorage.getItem('userEmail');
        const storedTrust = localStorage.getItem('userTrust');
        if (storedEmail || storedTrust) {
            updateUserDisplay(storedEmail, storedTrust);
        }
    }

    // ==================== HIDE PRO ITEMS FOR NON-PRO USERS ====================
    function updateProVisibility() {
        // This function can be called to hide/show pro items based on subscription
        // For now, we show them all with the Pro badge
        
        // Check if user is Pro (you can customize this logic)
        const isPro = localStorage.getItem('isPro') === 'true' || 
                      document.body.classList.contains('pro-user');

        if (isPro) {
            // Hide upgrade button for Pro users
            const upgradeBtn = document.getElementById('menuUpgradeBtn');
            if (upgradeBtn) {
                upgradeBtn.style.display = 'none';
            }
            // Remove Pro badges since they have Pro
            document.querySelectorAll('.menu-nav-item .pro-badge').forEach(badge => {
                badge.style.display = 'none';
            });
        }
    }

    // ==================== INITIALIZE ====================
    function init() {
        // Inject menu HTML into the page
        const menuContainer = document.createElement('div');
        menuContainer.id = 'menuContainer';
        menuContainer.innerHTML = buildMenuHTML();
        document.body.insertBefore(menuContainer, document.body.firstChild);

        // Inject hamburger button if not already present
        injectHamburgerButton();

        // Initialize functionality
        initMenuFunctionality();

        // Sync user info
        syncUserInfo();

        // Update Pro visibility
        updateProVisibility();

        console.log('Menu: Initialized successfully');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ==================== PUBLIC API ====================
    // Expose functions for external use
    window.ParamindMenu = {
        open: function() {
            document.getElementById('slideMenu')?.classList.add('active');
            document.getElementById('menuOverlay')?.classList.add('active');
            document.getElementById('hamburgerBtn')?.classList.add('active');
            document.body.classList.add('menu-open');
        },
        close: function() {
            document.getElementById('slideMenu')?.classList.remove('active');
            document.getElementById('menuOverlay')?.classList.remove('active');
            document.getElementById('hamburgerBtn')?.classList.remove('active');
            document.body.classList.remove('menu-open');
        },
        toggle: function() {
            const menu = document.getElementById('slideMenu');
            if (menu?.classList.contains('active')) {
                this.close();
            } else {
                this.open();
            }
        },
        updateUser: function(email, trust) {
            if (email) document.getElementById('menuUserEmail').textContent = email;
            if (trust) document.getElementById('menuUserTrust').textContent = trust;
        },
        setProUser: function(isPro) {
            localStorage.setItem('isPro', isPro);
            updateProVisibility();
        }
    };

})();