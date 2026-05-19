/* ============================================
   PARAMIND - Post-Login Role Prompt (Self-Contained)
   ----------------------------------------------
   Shows a blocking modal on landing.html if the
   signed-in user has no paramedicRole set in
   Firestore. Same wording/buttons as the prompt
   in scenarios.html and after-the-call.html.

   Self-contained, like js/news-popup.js:
     - Own Firebase auth listener
     - Own DOM (no Bootstrap)
     - z-index 11000 so it sits ABOVE the news
       popup overlay (10000). News popup is NOT
       touched and still shows once role is set.

   Saves to: users/{uid}.paramedicRole
   Values:   "student" | "nqp" | "registered"
   ============================================ */

(function () {
    'use strict';

    // ---- Wait for Firebase to be available ----
    var checkCount = 0;
    var maxChecks = 80; // ~8 seconds

    var waitForFirebase = setInterval(function () {
        checkCount++;
        if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length > 0) {
            clearInterval(waitForFirebase);
            initRolePrompt();
        }
        if (checkCount >= maxChecks) {
            clearInterval(waitForFirebase);
            console.warn('Role Prompt: Firebase not found, giving up');
        }
    }, 100);


    function initRolePrompt() {
        var auth = firebase.auth();
        var db = firebase.firestore();

        auth.onAuthStateChanged(function (user) {
            if (!user) return; // not logged in
            if (document.getElementById('rolePromptOverlay')) return; // already showing

            db.collection('users').doc(user.uid).get()
                .then(function (userDoc) {
                    if (!userDoc.exists) return;
                    var data = userDoc.data() || {};
                    if (data.paramedicRole) return; // role already set — nothing to do
                    showRolePrompt(db, user.uid);
                })
                .catch(function (err) {
                    console.warn('Role Prompt: Could not read user doc', err);
                });
        });
    }


    function injectStylesOnce() {
        if (document.getElementById('rolePromptStyles')) return;
        var style = document.createElement('style');
        style.id = 'rolePromptStyles';
        style.textContent = [
            '#rolePromptOverlay { position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 11000; display: flex; align-items: center; justify-content: center; padding: 1rem; opacity: 0; transition: opacity 0.2s ease; }',
            '#rolePromptOverlay.rp-visible { opacity: 1; }',
            '#rolePromptModal { background: var(--color-white, #ffffff); color: var(--color-gray-800, #343A40); border-radius: var(--radius-lg, 12px); width: 100%; max-width: 480px; max-height: 92vh; overflow-y: auto; padding: 1.5rem; box-shadow: 0 20px 60px rgba(0,0,0,0.35); transform: translateY(12px); transition: transform 0.2s ease; font-family: inherit; }',
            '#rolePromptOverlay.rp-visible #rolePromptModal { transform: translateY(0); }',
            '.rp-intro { text-align: center; margin-bottom: 1.25rem; }',
            '.rp-hollie-dot { width: 56px; height: 56px; margin: 0 auto 0.75rem; background: var(--color-teal, #2B8A9C); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }',
            '.rp-title { font-size: 1.4rem; font-weight: 700; color: var(--color-gray-800, #343A40); margin: 0 0 0.4rem; }',
            '.rp-subtitle { font-size: 0.875rem; color: var(--color-gray-600, #6C757D); line-height: 1.5; margin: 0; }',
            '.rp-options { display: flex; flex-direction: column; gap: 10px; margin-bottom: 1rem; }',
            '.rp-option { background: var(--color-white, #ffffff); border: 2px solid var(--color-gray-200, #E9ECEF); border-radius: var(--radius-lg, 12px); padding: 0.875rem 1rem; cursor: pointer; transition: all 0.18s; display: flex; align-items: flex-start; gap: 0.875rem; text-align: left; color: var(--color-gray-800, #343A40); width: 100%; font-family: inherit; }',
            '.rp-option:hover { border-color: var(--color-teal, #2B8A9C); background: rgba(43,138,156,0.05); }',
            '.rp-option:disabled { opacity: 0.55; cursor: wait; }',
            '.rp-icon { font-size: 1.4rem; flex-shrink: 0; width: 32px; text-align: center; line-height: 1.4; }',
            '.rp-label { font-size: 0.92rem; font-weight: 600; color: var(--color-gray-800, #343A40); display: block; margin-bottom: 0.2rem; line-height: 1.35; }',
            '.rp-desc { font-size: 0.78rem; color: var(--color-gray-600, #6C757D); line-height: 1.45; display: block; font-weight: 400; }',
            '.rp-note { font-size: 0.75rem; color: var(--color-gray-500, #ADB5BD); text-align: center; line-height: 1.5; margin: 0; }'
        ].join('\n');
        document.head.appendChild(style);
    }


    function showRolePrompt(db, uid) {
        injectStylesOnce();

        // ---- Build overlay ----
        var overlay = document.createElement('div');
        overlay.id = 'rolePromptOverlay';

        // ---- Build modal card ----
        var modal = document.createElement('div');
        modal.id = 'rolePromptModal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'rolePromptTitle');

        modal.innerHTML =
            '<div class="rp-intro">' +
                '<div class="rp-hollie-dot">🎧</div>' +
                '<h2 id="rolePromptTitle" class="rp-title">One quick question</h2>' +
                '<p class="rp-subtitle">Help us pitch your learning at the right level.<br>You only need to answer this once.</p>' +
            '</div>' +
            '<div class="rp-options">' +
                '<button class="rp-option" type="button" data-role="student">' +
                    '<span class="rp-icon">📚</span>' +
                    '<span>' +
                        '<span class="rp-label">Student/Apprentice Paramedic, ECA/EAA/Technician or studying to become a clinician</span>' +
                        '<span class="rp-desc">On a paramedic degree or apprenticeship, working as ECA/EAA/Technician, or otherwise studying to become a registered clinician</span>' +
                    '</span>' +
                '</button>' +
                '<button class="rp-option" type="button" data-role="nqp">' +
                    '<span class="rp-icon">🚑</span>' +
                    '<span>' +
                        '<span class="rp-label">Newly Qualified Paramedic (NQP)</span>' +
                        '<span class="rp-desc">Registered and in your first year or two of practice</span>' +
                    '</span>' +
                '</button>' +
                '<button class="rp-option" type="button" data-role="registered">' +
                    '<span class="rp-icon">⭐</span>' +
                    '<span>' +
                        '<span class="rp-label">Registered Paramedic</span>' +
                        '<span class="rp-desc">Experienced and registered with the HCPC</span>' +
                    '</span>' +
                '</button>' +
            '</div>' +
            '<p class="rp-note">You can change this anytime in your "Account" if you want to change the difficulty or level of responses.</p>';

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Lock background scroll while prompt is open
        var prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        // Fade-in
        requestAnimationFrame(function () {
            overlay.classList.add('rp-visible');
        });

        // ---- Save handler ----
        function closePrompt() {
            overlay.classList.remove('rp-visible');
            setTimeout(function () {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                document.body.style.overflow = prevOverflow || '';
            }, 200);
        }

        function saveRole(role) {
            // Disable all buttons to prevent double-clicks
            var buttons = modal.querySelectorAll('.rp-option');
            buttons.forEach(function (b) { b.disabled = true; });

            db.collection('users').doc(uid).set(
                { paramedicRole: role },
                { merge: true }
            ).then(function () {
                closePrompt();
            }).catch(function (err) {
                console.error('Role Prompt: Error saving paramedicRole', err);
                // Still close so the user is not stuck if Firestore write fails
                closePrompt();
            });
        }

        // Wire up the three buttons. No close button, no escape, no
        // click-outside — picking a role is the only way out.
        modal.querySelectorAll('.rp-option').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var role = btn.getAttribute('data-role');
                if (!role) return;
                saveRole(role);
            });
        });
    }

})();
