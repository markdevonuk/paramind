/* ============================================
   PARAMIND - News Popup (Self-Contained)
   Reads articles from Firestore 'news' collection.
   Shows different article for PRO vs Free users.
   Only shows once per article version.
   
   This script uses its own Firebase auth listener
   so it doesn't depend on any variables from the
   landing page. Just add the <script> tag and it works.
   ============================================ */

(function () {
    'use strict';

    // ---- Wait for Firebase to be available ----
    // The landing pages load Firebase compat SDK before this script
    var checkCount = 0;
    var maxChecks = 80; // Give up after ~8 seconds

    var waitForFirebase = setInterval(function () {
        checkCount++;

        // Check if Firebase is loaded and initialized
        if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length > 0) {
            clearInterval(waitForFirebase);
            initNewsPopup();
        }

        if (checkCount >= maxChecks) {
            clearInterval(waitForFirebase);
            console.warn('News Popup: Firebase not found, giving up');
        }
    }, 100);


    function initNewsPopup() {
        var auth = firebase.auth();
        var db = firebase.firestore();

        // Listen for auth state - this fires when user is logged in
        auth.onAuthStateChanged(function (user) {
            if (!user) return; // Not logged in, do nothing

            // Get the user's profile to check if they're PRO
            db.collection('users').doc(user.uid).get()
                .then(function (userDoc) {
                    if (!userDoc.exists) return;

                    var userData = userDoc.data();
                    var isPro = userData.subscriptionStatus === 'active' || userData.isPro === true;

                    // Now load the right news article
                    loadArticle(db, isPro);
                })
                .catch(function (error) {
                    console.warn('News Popup: Could not fetch user profile', error);
                });
        });
    }


    function loadArticle(db, isPro) {
        var docType = isPro ? 'pro' : 'free';

        db.collection('news').doc(docType).get()
            .then(function (docSnap) {
                if (!docSnap.exists) {
                    console.log('News Popup: No ' + docType + ' article found in Firestore');
                    return;
                }

                var article = docSnap.data();

                // Check if the article is active
                if (article.active === false) {
                    console.log('News Popup: ' + docType + ' article is not active');
                    return;
                }

                // Check if there's actually content
                if (!article.title && !article.body) {
                    console.log('News Popup: ' + docType + ' article has no content');
                    return;
                }

                // Check if user has already seen this version
                var seenKey = 'paramind_news_' + docType + '_v' + (article.version || '1');
                if (localStorage.getItem(seenKey) === 'true') {
                    console.log('News Popup: User already saw version ' + article.version);
                    return;
                }

                // Small delay so the page feels settled
                setTimeout(function () {
                    showModal(article, seenKey);
                }, 1000);
            })
            .catch(function (error) {
                console.warn('News Popup: Could not load ' + docType + ' article', error);
            });
    }


    function showModal(article, seenKey) {

        // ---- Create the overlay (dark background) ----
        var overlay = document.createElement('div');
        overlay.id = 'newsPopupOverlay';
        overlay.style.cssText = [
            'position:fixed',
            'top:0', 'left:0', 'right:0', 'bottom:0',
            'background:rgba(0,0,0,0.5)',
            'z-index:10000',
            'display:flex',
            'align-items:center',
            'justify-content:center',
            'padding:1rem',
            'opacity:0',
            'transition:opacity 0.3s ease'
        ].join(';');

        // ---- Create the modal card ----
        var modal = document.createElement('div');
        modal.id = 'newsPopupModal';
        modal.style.cssText = [
            'background:#FFFFFF',
            'border-radius:16px',
            'max-width:480px',
            'width:100%',
            'max-height:90vh',
            'overflow-y:auto',
            'box-shadow:0 20px 60px rgba(0,0,0,0.3)',
            'transform:translateY(20px)',
            'transition:transform 0.3s ease',
            'position:relative'
        ].join(';');

        // ---- Image ----
        var imageHTML = '';
        if (article.image) {
            imageHTML = '<div style="width:100%;max-height:220px;overflow:hidden;border-radius:16px 16px 0 0;">' +
                '<img src="' + article.image + '" alt="" style="width:100%;height:220px;object-fit:cover;display:block;" ' +
                'onerror="this.parentElement.style.display=\'none\'">' +
                '</div>';
        }

        // ---- Button ----
        var buttonHTML = '';
        if (article.buttonText && article.buttonLink) {
            buttonHTML = '<div style="text-align:center;">' +
                '<a href="' + article.buttonLink + '" id="newsPopupCTA" style="' +
                'display:inline-block;' +
                'background:linear-gradient(135deg,#2B8A9C 0%,#237282 100%);' +
                'color:#FFFFFF;' +
                'padding:0.75rem 1.5rem;' +
                'border-radius:8px;' +
                'text-decoration:none;' +
                'font-weight:600;' +
                'font-size:0.95rem;' +
                'transition:all 0.2s ease;' +
                'margin-top:0.5rem;' +
                '">' + article.buttonText + '</a></div>';
        }

        // ---- Assemble ----
        modal.innerHTML =
            // Close button
            '<button id="newsPopupClose" aria-label="Close" style="' +
            'position:absolute;top:12px;right:12px;' +
            'background:rgba(0,0,0,0.5);border:none;color:#FFFFFF;' +
            'width:32px;height:32px;border-radius:50%;' +
            'font-size:1.1rem;cursor:pointer;' +
            'display:flex;align-items:center;justify-content:center;' +
            'z-index:2;transition:background 0.2s ease;line-height:1;' +
            '">&times;</button>' +

            imageHTML +

            // Content
            '<div style="padding:1.5rem;">' +

            // "What's New" tag
            '<div style="' +
            'display:inline-flex;align-items:center;gap:0.35rem;' +
            'background:linear-gradient(135deg,rgba(43,138,156,0.1) 0%,rgba(92,184,92,0.1) 100%);' +
            'color:#2B8A9C;font-size:0.7rem;font-weight:700;' +
            'text-transform:uppercase;letter-spacing:0.5px;' +
            'padding:0.3rem 0.65rem;border-radius:6px;margin-bottom:0.75rem;' +
            '"><span style="font-size:0.75rem;">📰</span> What\'s New</div>' +

            // Title
            '<h2 style="' +
            'font-family:\'Plus Jakarta Sans\',-apple-system,sans-serif;' +
            'font-size:1.35rem;font-weight:700;color:#212529;' +
            'margin:0 0 1rem 0;line-height:1.3;' +
            '">' + (article.title || '') + '</h2>' +

            // Body
            '<div style="' +
            'font-family:\'Plus Jakarta Sans\',-apple-system,sans-serif;' +
            'font-size:0.9rem;color:#495057;line-height:1.6;margin-bottom:1.25rem;' +
            '">' + (article.body || '') + '</div>' +

            buttonHTML +

            '</div>';

        // ---- Add to page ----
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // ---- Animate in ----
        requestAnimationFrame(function () {
            overlay.style.opacity = '1';
            modal.style.transform = 'translateY(0)';
        });

        // ---- Close function ----
        function closePopup() {
            overlay.style.opacity = '0';
            modal.style.transform = 'translateY(20px)';
            setTimeout(function () {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 300);
            // Mark this version as seen
            localStorage.setItem(seenKey, 'true');
        }

        // Close button click
        document.getElementById('newsPopupClose').addEventListener('click', closePopup);

        // Click outside modal
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                closePopup();
            }
        });

        // Escape key
        document.addEventListener('keydown', function handler(e) {
            if (e.key === 'Escape') {
                closePopup();
                document.removeEventListener('keydown', handler);
            }
        });

        // CTA button also marks as seen
        var ctaBtn = document.getElementById('newsPopupCTA');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', function () {
                localStorage.setItem(seenKey, 'true');
            });
        }
    }

})();