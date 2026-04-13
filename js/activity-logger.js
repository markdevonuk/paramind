/* ==================== ACTIVITY LOGGER ====================
 * Paramind CPD Activity Logger v1.0
 *
 * PURPOSE: Silently tracks time spent on each learning tool for Pro users.
 * Data stored in Firestore: users/{uid}/activityLog/{sessionId}
 *
 * USAGE: Add <script src="js/activity-logger.js"></script> after menu-v2.js
 * on any tracked page. No other configuration needed — the tool name is
 * auto-detected from the page URL.
 *
 * BEHAVIOUR:
 *  - Only runs for authenticated Pro subscribers (free users are ignored)
 *  - Logs session start on page load
 *  - Logs session end + duration on tab switch / mobile background / page close
 *  - If user returns to the tab, a new session begins automatically
 *  - Sessions under 30 seconds are discarded (accidental/brief visits)
 */

(function () {
    'use strict';

    // ==================== PAGE → TOOL NAME MAP ====================
    var PAGE_TOOLS = {
        'chat.html':             'Chat with Hollie',
        'scenarios.html':        'Patient Scenarios',
        'arrest-scenarios.html': 'Cardiac Arrest Simulator',
        'differentials.html':    'Differentials Tool',
        'readiness.html':        'Readiness Score',
        'podcast.html':          'Podcast',
        'connections.html':      'A&P Connections',
        'ecg.html':              'ECG Tool',
        'atmist.html':           'ATMIST Handover',
        'bone-lab.html':         'Understanding Bones',
        'blood-lab.html':        'Understanding Bloods',
        'drugs.html':            'Understanding Drugs',
        'interview.html':        'Interview Prep',
        'cpd.html':              'CPD Portfolio'
    };

    // ==================== DETECT CURRENT PAGE ====================
    var parts    = window.location.pathname.split('/');
    var pageName = parts[parts.length - 1] || '';
    var toolName = PAGE_TOOLS[pageName];

    // Not a tracked page — exit silently
    if (!toolName) { return; }

    // ==================== SESSION STATE ====================
    var sessionId    = null;
    var startTime    = null;
    var sessionEnded = true;   // Treated as "ended" until first session starts
    var currentUser  = null;
    var db           = null;

    // ==================== WAIT FOR FIREBASE ====================
    // menu-v2.js loads Firebase dynamically — poll until it is fully ready
    function waitForFirebase(callback) {
        var start = Date.now();
        function check() {
            if (typeof firebase !== 'undefined' &&
                firebase.auth &&
                firebase.firestore &&
                firebase.apps &&
                firebase.apps.length > 0) {
                callback(true);
                return;
            }
            if (Date.now() - start > 12000) {
                // Firebase didn't load in time — give up gracefully
                callback(false);
                return;
            }
            setTimeout(check, 200);
        }
        check();
    }

    // ==================== GENERATE SESSION ID ====================
    function generateSessionId() {
        return Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 9);
    }

    // ==================== START SESSION ====================
    function startSession() {
        if (!currentUser || !db) { return; }

        sessionId    = generateSessionId();
        startTime    = new Date();
        sessionEnded = false;

        var dateStr = startTime.toISOString().split('T')[0]; // YYYY-MM-DD

        console.log('[ActivityLogger] Starting session for:', toolName, '| User:', currentUser.uid, '| Session:', sessionId);

        db.collection('users')
          .doc(currentUser.uid)
          .collection('activityLog')
          .doc(sessionId)
          .set({
              tool:            toolName,
              page:            pageName,
              startTime:       firebase.firestore.Timestamp.fromDate(startTime),
              date:            dateStr,
              durationSeconds: 0,
              durationMinutes: 0,
              complete:        false
          })
          .then(function () {
              console.log('[ActivityLogger] Session start written to Firestore OK');
          })
          .catch(function (e) {
              console.warn('[ActivityLogger] Could not write session start:', e);
          });
    }

    // ==================== END SESSION ====================
    function endSession() {
        if (!currentUser || !db || sessionEnded || !sessionId) { return; }
        sessionEnded = true;

        var endTime         = new Date();
        var durationSeconds = Math.round((endTime - startTime) / 1000);

        console.log('[ActivityLogger] Ending session | Duration:', durationSeconds, 'seconds');

        // Discard sessions under 30 seconds — too brief to be meaningful CPD
        if (durationSeconds < 30) {
            console.log('[ActivityLogger] Session discarded — under 30 seconds');
            db.collection('users')
              .doc(currentUser.uid)
              .collection('activityLog')
              .doc(sessionId)
              .delete()
              .catch(function () {});
            return;
        }

        var durationMinutes = parseFloat((durationSeconds / 60).toFixed(2));

        db.collection('users')
          .doc(currentUser.uid)
          .collection('activityLog')
          .doc(sessionId)
          .update({
              endTime:         firebase.firestore.Timestamp.fromDate(endTime),
              durationSeconds: durationSeconds,
              durationMinutes: durationMinutes,
              complete:        true
          })
          .catch(function (e) {
              console.warn('[ActivityLogger] Could not write session end:', e);
          });
    }

    // ==================== VISIBILITY CHANGE HANDLER ====================
    function onVisibilityChange() {
        if (document.visibilityState === 'hidden') {
            // Tab hidden / mobile app backgrounded — close the session
            endSession();
        } else if (document.visibilityState === 'visible' && sessionEnded) {
            // Returned to the tab — start a fresh session
            startSession();
        }
    }

    // ==================== INITIALISE ====================
    waitForFirebase(function (ready) {
        if (!ready) {
            console.warn('[ActivityLogger] Firebase did not load in time — giving up');
            return;
        }
        console.log('[ActivityLogger] Firebase ready, setting up auth listener for page:', pageName);

        db = firebase.firestore();

        firebase.auth().onAuthStateChanged(function (user) {
            if (!user) { return; }

            // Read the user's Firestore doc to confirm Pro status
            db.collection('users').doc(user.uid).get()
              .then(function (doc) {
                  if (!doc.exists) { return; }

                  var data  = doc.data();
                  var isPro = data.subscriptionStatus === 'active' || data.isPro === true;

                  console.log('[ActivityLogger] User Pro status:', isPro, '| subscriptionStatus:', data.subscriptionStatus, '| isPro field:', data.isPro);

                  if (!isPro) { return; } // Free user — do nothing

                  // Pro user confirmed — begin tracking
                  currentUser = user;
                  startSession();

                  // End session when tab is hidden or mobile is backgrounded
                  document.addEventListener('visibilitychange', onVisibilityChange);

                  // End session on page close / navigation (desktop browsers)
                  window.addEventListener('beforeunload', endSession);
              })
              .catch(function (e) {
                  console.warn('[ActivityLogger] Pro status check failed:', e);
              });
        });
    });

})();
