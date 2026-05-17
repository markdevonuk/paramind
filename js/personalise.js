/* ================================================================
   PARAMIND — PERSONALISED GREETING + PRO STATE (shared)
   ----------------------------------------------------------------
   Populates the hero greeting on pages that include it AND hides
   .card-pro-badge spans on tool cards when the user is a Pro
   subscriber. Also bounces non-logged-in users back to login.html.

   USED BY:
     landing2.html
     learn.html, practise.html, reflect.html

   NOT USED BY:
     landing.html — keeps its own inline version until retired.

   REQUIRES:
     Firebase to already be initialised by menu-v2.js (single
     source of Firebase init across the site).

   EXPECTED DOM (any may be absent — script no-ops them):
     #heroGreeting, #userFirstName, #greetingEmoji
     .card-pro-badge (one per Pro tool card)

   BEHAVIOUR:
     - If user not signed in        → redirect to login.html
     - Time-of-day greeting prefix
     - First name from Firestore users/{uid}.firstName, falling
       back to first word of `name`, then "there"
     - Pro detection mirrors landing.html: subscriptionStatus
       === 'active' OR isPro === true OR Apple accessExpiresAt
       still in the future. When Pro, all .card-pro-badge spans
       are hidden across the page.
     - Errors loading the profile are caught and logged only —
       the greeting still falls back gracefully.

   NOTE: Does NOT bring across landing.html's full Pro UX
   (locked-card visuals, upgrade modal trigger, Apple silent
   restore). Those remain in landing.html's inline script until
   it is retired.
   ================================================================ */

(function() {
    'use strict';

    var waitCount = 0;
    var MAX_WAITS = 100; // ~10s of 100ms ticks before giving up

    function start() {
        // menu-v2.js is the single source of Firebase initialisation across
        // the site. Wait until it has actually created the default app — just
        // checking for the SDK namespace isn't enough: firebase.auth() throws
        // "No Firebase App '[DEFAULT]' has been created" if no app exists yet.
        if (!window.firebase || !firebase.apps || !firebase.apps.length) {
            if (++waitCount < MAX_WAITS) {
                setTimeout(start, 100);
                return;
            }
            console.warn('personalise.js: Firebase app never initialised — greeting will stay at defaults.');
            return;
        }

        const auth = firebase.auth();
        const db   = firebase.firestore();

        auth.onAuthStateChanged(async function(user) {
            if (!user) {
                window.location.href = 'login.html';
                return;
            }

            // ---- Time-of-day greeting prefix ----
            const greetingEl  = document.getElementById('heroGreeting');
            const emojiEl     = document.getElementById('greetingEmoji');
            const firstNameEl = document.getElementById('userFirstName');
            const hour = new Date().getHours();
            if (greetingEl && emojiEl) {
                if (hour < 12)      { greetingEl.textContent = 'Good morning';             emojiEl.textContent = '👋'; }
                else if (hour < 17) { greetingEl.textContent = 'Good afternoon';           emojiEl.textContent = '👋'; }
                else if (hour < 21) { greetingEl.textContent = 'Good evening';             emojiEl.textContent = '👋'; }
                else                { greetingEl.textContent = 'Burning the midnight oil'; emojiEl.textContent = '👋'; }
            }

            // ---- Profile fetch (first name + Pro detection) ----
            try {
                const doc = await db.collection('users').doc(user.uid).get();
                if (!doc.exists) return;
                const data = doc.data();

                // First name
                if (firstNameEl) {
                    if (data.firstName)      firstNameEl.textContent = data.firstName;
                    else if (data.name)      firstNameEl.textContent = data.name.split(' ')[0];
                    else                     firstNameEl.textContent = 'there';
                }

                // Pro detection (mirrors landing.html logic)
                const appleAccessExpiry = data.accessExpiresAt ? new Date(data.accessExpiresAt) : null;
                const isPro = data.subscriptionStatus === 'active'
                           || data.isPro === true
                           || (appleAccessExpiry && appleAccessExpiry > new Date());

                if (isPro) {
                    // Hide all Pro badges across the page
                    document.querySelectorAll('.card-pro-badge').forEach(function(el) {
                        el.style.display = 'none';
                    });
                }
            } catch (err) {
                console.warn('personalise.js: could not load profile:', err);
            }
        });
    }

    start();
})();
