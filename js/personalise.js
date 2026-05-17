/* ================================================================
   PARAMIND — PERSONALISED GREETING (shared)
   ----------------------------------------------------------------
   Populates the hero greeting on any page that includes the hero
   component (avatar + #heroGreeting / #userFirstName / #greetingEmoji
   spans). Also bounces non-logged-in users back to login.html.

   USED BY:
     landing2.html
     learn.html, practise.html, reflect.html  (to be built)

   NOT USED BY:
     landing.html — keeps its own inline version until retired.

   REQUIRES:
     Firebase to already be initialised by menu-v2.js (the single
     source of Firebase initialisation across the site).

   EXPECTED DOM ELEMENTS (any can be absent — script no-ops them):
     #heroGreeting    – e.g. "Good morning"
     #userFirstName   – e.g. "Mark"
     #greetingEmoji   – e.g. "👋"

   BEHAVIOUR:
     - If user not signed in        → redirect to login.html
     - Greeting prefix by hour of day
     - First name from Firestore users/{uid}.firstName,
       falling back to first word of `name`, then "there"
     - Errors loading the profile are caught and logged only —
       the greeting still shows with a "there" fallback.
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

            // ---- First name from Firestore profile ----
            try {
                const doc = await db.collection('users').doc(user.uid).get();
                if (doc.exists && firstNameEl) {
                    const data = doc.data();
                    if (data.firstName)      firstNameEl.textContent = data.firstName;
                    else if (data.name)      firstNameEl.textContent = data.name.split(' ')[0];
                    else                     firstNameEl.textContent = 'there';
                }
            } catch (err) {
                console.warn('personalise.js: could not load profile for greeting:', err);
            }
        });
    }

    start();
})();
