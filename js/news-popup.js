/* ============================================
   PARAMIND - News Popup (Firestore Version)
   Reads articles from Firestore 'news' collection.
   Admin can update articles from admin.html.
   Shows different article for PRO vs Free users.
   Only shows once per article version.
   ============================================ */

(function () {
    'use strict';

    // ============================================
    // WAIT FOR AUTH TO COMPLETE
    // ============================================
    let checkCount = 0;
    const maxChecks = 50;

    const waitForAuth = setInterval(function () {
        checkCount++;

        if (typeof window.isPro !== 'undefined' && typeof window.userData !== 'undefined') {
            clearInterval(waitForAuth);
            loadAndShowPopup(window.isPro);
        }

        if (checkCount >= maxChecks) {
            clearInterval(waitForAuth);
        }
    }, 100);


    // ============================================
    // LOAD ARTICLE FROM FIRESTORE
    // ============================================
    async function loadAndShowPopup(isPro) {
        try {
            // Determine which article to fetch
            const docId = isPro ? 'pro' : 'free';

            // Get the article from Firestore
            const articleDoc = await firebase.firestore().collection('news').doc(docId).get();

            if (!articleDoc.exists) {
                console.log('No news article found for:', docId);
                return;
            }

            const article = articleDoc.data();

            // Check the article is active (admin can turn it off)
            if (!article.active) {
                return;
            }

            // Check if user has already seen this version
            const seenKey = 'paramind_seen_' + docId + '_' + article.version;
            if (localStorage.getItem(seenKey) === 'true') {
                return;
            }

            // Small delay so page feels settled
            setTimeout(function () {
                showModal(article, seenKey);
            }, 800);

        } catch (error) {
            console.error('Error loading news popup:', error);
        }
    }


    // ============================================
    // SHOW THE MODAL
    // ============================================
    function showModal(article, seenKey) {
        // ---- Create overlay ----
        const overlay = document.createElement('div');
        overlay.id = 'newsPopupOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        // ---- Create modal card ----
        const modal = document.createElement('div');
        modal.id = 'newsPopupModal';
        modal.style.cssText = `
            background: #FFFFFF;
            border-radius: 16px;
            max-width: 480px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            transform: translateY(20px);
            transition: transform 0.3s ease;
            position: relative;
        `;

        // ---- Build HTML ----
        let imageHTML = '';
        if (article.image) {
            imageHTML = `
                <div style="width: 100%; max-height: 220px; overflow: hidden; border-radius: 16px 16px 0 0;">
                    <img src="${article.image}" alt="" style="width: 100%; height: 220px; object-fit: cover; display: block;"
                         onerror="this.parentElement.style.display='none'">
                </div>
            `;
        }

        let buttonHTML = '';
        if (article.buttonText && article.buttonLink) {
            buttonHTML = `
                <a href="${article.buttonLink}" id="newsPopupCTA" style="
                    display: inline-block;
                    background: linear-gradient(135deg, #2B8A9C 0%, #237282 100%);
                    color: #FFFFFF;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.95rem;
                    transition: all 0.2s ease;
                    margin-top: 0.5rem;
                ">${article.buttonText}</a>
            `;
        }

        modal.innerHTML = `
            <button id="newsPopupClose" aria-label="Close" style="
                position: absolute;
                top: 12px; right: 12px;
                background: rgba(0, 0, 0, 0.5);
                border: none;
                color: #FFFFFF;
                width: 32px; height: 32px;
                border-radius: 50%;
                font-size: 1.1rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2;
                transition: background 0.2s ease;
                line-height: 1;
            ">&times;</button>

            ${imageHTML}

            <div style="padding: 1.5rem;">
                <div style="
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                    background: linear-gradient(135deg, rgba(43, 138, 156, 0.1) 0%, rgba(92, 184, 92, 0.1) 100%);
                    color: #2B8A9C;
                    font-size: 0.7rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    padding: 0.3rem 0.65rem;
                    border-radius: 6px;
                    margin-bottom: 0.75rem;
                ">
                    <span style="font-size: 0.75rem;">ð°</span> What's New
                </div>

                <h2 style="
                    font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
                    font-size: 1.35rem;
                    font-weight: 700;
                    color: #212529;
                    margin: 0 0 1rem 0;
                    line-height: 1.3;
                ">${article.title}</h2>

                <div style="
                    font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
                    font-size: 0.9rem;
                    color: #495057;
                    line-height: 1.6;
                    margin-bottom: 1.25rem;
                ">
                    ${article.body}
                </div>

                <div style="text-align: center;">
                    ${buttonHTML}
                </div>
            </div>
        `;

        // ---- Add to page ----
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        requestAnimationFrame(function () {
            overlay.style.opacity = '1';
            modal.style.transform = 'translateY(0)';
        });

        // ---- Close handlers ----
        function closePopup() {
            overlay.style.opacity = '0';
            modal.style.transform = 'translateY(20px)';
            setTimeout(function () {
                overlay.remove();
            }, 300);
            localStorage.setItem(seenKey, 'true');
        }

        document.getElementById('newsPopupClose').addEventListener('click', closePopup);

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closePopup();
        });

        document.addEventListener('keydown', function handler(e) {
            if (e.key === 'Escape') {
                closePopup();
                document.removeEventListener('keydown', handler);
            }
        });

        const ctaBtn = document.getElementById('newsPopupCTA');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', function () {
                localStorage.setItem(seenKey, 'true');
            });
        }
    }

})();