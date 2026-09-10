/* ==================== TEAM CHALLENGE HELPER ====================
 * Paramind Team Challenges — shared contribution helper v1.0
 *
 * PURPOSE: Gives every tool page a single one-line call to record that the
 * user has just completed one qualifying instance of this month's team
 * challenge activity. All the deciding — is the user Pro, have they opted in,
 * is this month's challenge even this tool — happens in here, so the pages
 * themselves stay dumb.
 *
 * USAGE: Add <script src="js/team-challenge.js"></script> after menu-v2.js,
 * then call at the point a qualifying completion happens:
 *
 *     window.recordTeamContribution('connections');
 *
 * Optionally pass a stable ID for the thing that was completed, which stops
 * a double-fired event counting twice:
 *
 *     window.recordTeamContribution('scenarios', 'scenario-' + scenarioId);
 *
 * BEHAVIOUR:
 *  - Silent in every failure case. Never throws, never shows an error, never
 *    blocks the page. A tool must work identically whether or not the user is
 *    in a team.
 *  - Does nothing unless ALL of these are true:
 *      1. Firebase is loaded and a user is signed in
 *      2. That user is Pro (subscriptionStatus === 'active' || isPro === true)
 *      3. That user has teamChallengeOptIn === true
 *      4. challenges/{YYYY-MM} exists and status === 'active'
 *      5. That challenge's activityType matches the string passed in
 *  - Reads the user document and the challenge document once per page load,
 *    then caches. Repeat calls on the same page cost nothing extra.
 *  - The per-person cap is enforced server side. When the server reports the
 *    cap is reached, this stops calling out for the rest of the page load.
 *
 * NOT YET WIRED: as of Phase 1 no page calls this, and the recordContribution
 * Cloud Function does not exist yet. Loading this file has no effect until
 * both of those land in Phase 3.
 */

(function () {
    'use strict';

    // ==================== CONFIG ====================
    var FUNCTION_NAME = 'recordContribution';
    var AUTH_WAIT_MS  = 3000;   // Safari restores the session late — wait for it
    var FIREBASE_WAIT_MS = 12000;

    function apiBase() {
        if (window.paramind && window.paramind.CONFIG &&
            window.paramind.CONFIG.api && window.paramind.CONFIG.api.baseUrl) {
            return window.paramind.CONFIG.api.baseUrl;
        }
        return 'https://europe-west2-paramind-64b8e.cloudfunctions.net';
    }

    // ==================== STATE (per page load) ====================
    var context   = null;   // Promise of { user, eligible, challenge }
    var capped    = false;  // set once the server says this user has hit the cap
    var seenIds   = {};     // completion IDs already sent from this page load

    // ==================== MONTH ID ====================
    // Matches the convention already used by Quiz of the Month: "2026-11"
    function currentMonthId() {
        var d = new Date();
        return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
    }

    // ==================== WAIT FOR FIREBASE ====================
    // menu-v2.js loads the compat SDK. Same pattern as activity-logger.js.
    function waitForFirebase(callback) {
        var start = Date.now();
        (function check() {
            if (typeof firebase !== 'undefined' &&
                firebase.auth && firebase.firestore &&
                firebase.apps && firebase.apps.length > 0) {
                callback(true);
                return;
            }
            if (Date.now() - start > FIREBASE_WAIT_MS) { callback(false); return; }
            setTimeout(check, 200);
        })();
    }

    // ==================== WAIT FOR A SIGNED-IN USER ====================
    // currentUser can still be null immediately after load on iOS Safari.
    function waitForUser(callback) {
        var existing = firebase.auth().currentUser;
        if (existing) { callback(existing); return; }

        var settled = false;
        var timer = setTimeout(function () {
            if (settled) { return; }
            settled = true;
            unsubscribe();
            callback(firebase.auth().currentUser || null);
        }, AUTH_WAIT_MS);

        var unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
            if (settled || !user) { return; }
            settled = true;
            clearTimeout(timer);
            unsubscribe();
            callback(user);
        });
    }

    // ==================== READ THIS MONTH'S CHALLENGE ====================
    // Cached in sessionStorage so a user moving between tools in one visit
    // costs a single read. Only the three fields we actually need are kept.
    function readChallenge(db, monthId) {
        var key = 'paramind_tc_' + monthId;

        try {
            var raw = sessionStorage.getItem(key);
            if (raw !== null) { return Promise.resolve(JSON.parse(raw)); }
        } catch (e) { /* sessionStorage unavailable — just read Firestore */ }

        return db.collection('challenges').doc(monthId).get()
            .then(function (doc) {
                var data = doc.exists ? (doc.data() || {}) : null;
                var slim = data ? {
                    activityType:   data.activityType || null,
                    personalTarget: data.personalTarget || 0,
                    status:         data.status || null
                } : null;
                try { sessionStorage.setItem(key, JSON.stringify(slim)); } catch (e) {}
                return slim;
            })
            .catch(function () { return null; });
    }

    // ==================== BUILD CONTEXT (once per page load) ====================
    function loadContext() {
        if (context) { return context; }

        context = new Promise(function (resolve) {
            var empty = { user: null, eligible: false, challenge: null };

            waitForFirebase(function (ready) {
                if (!ready) { resolve(empty); return; }

                waitForUser(function (user) {
                    if (!user) { resolve(empty); return; }

                    var db = firebase.firestore();

                    Promise.all([
                        db.collection('users').doc(user.uid).get(),
                        readChallenge(db, currentMonthId())
                    ]).then(function (res) {
                        var uDoc      = res[0];
                        var challenge = res[1];
                        var u         = (uDoc && uDoc.exists) ? (uDoc.data() || {}) : {};

                        var isPro    = u.subscriptionStatus === 'active' || u.isPro === true;
                        var optedIn  = u.teamChallengeOptIn === true;
                        var isActive = !!challenge && challenge.status === 'active';

                        resolve({
                            user:      user,
                            eligible:  isPro && optedIn,
                            challenge: isActive ? challenge : null
                        });
                    }).catch(function () { resolve(empty); });
                });
            });
        });

        return context;
    }

    // ==================== SEND ONE CONTRIBUTION ====================
    function send(user, activityType, completionId) {
        return user.getIdToken().then(function (token) {
            return fetch(apiBase() + '/' + FUNCTION_NAME, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type':  'application/json'
                },
                body: JSON.stringify({
                    monthId:      currentMonthId(),
                    activityType: activityType,
                    completionId: completionId
                })
            });
        }).then(function (res) {
            if (!res || !res.ok) { return null; }
            return res.json().catch(function () { return null; });
        }).then(function (data) {
            if (!data) { return null; }
            if (data.capped === true) { capped = true; }

            // Fires so a future dashboard/toast can react without this file
            // needing to know anything about the page it is running on.
            try {
                document.dispatchEvent(new CustomEvent('paramind:teamContribution', {
                    detail: data
                }));
            } catch (e) {}

            return data;
        });
    }

    // ==================== PUBLIC API ====================
    /**
     * Record one qualifying completion of this month's challenge activity.
     *
     * @param {string} activityType  e.g. 'connections' — must match the
     *                               activityType on challenges/{YYYY-MM}
     * @param {string} [completionId] Optional stable ID for the thing
     *                               completed. Repeats are ignored within
     *                               the same page load.
     * @returns {Promise} Always resolves. Never rejects.
     */
    window.recordTeamContribution = function (activityType, completionId) {
        if (!activityType) { return Promise.resolve(null); }
        if (capped)        { return Promise.resolve(null); }

        var id = completionId ||
                 (Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 9));

        if (seenIds[id]) { return Promise.resolve(null); }

        return loadContext().then(function (ctx) {
            if (!ctx.user || !ctx.eligible || !ctx.challenge) { return null; }
            if (ctx.challenge.activityType !== activityType)  { return null; }
            if (capped)                                       { return null; }
            if (seenIds[id])                                  { return null; }

            seenIds[id] = true;
            return send(ctx.user, activityType, id);
        }).catch(function () { return null; });
    };

})();
