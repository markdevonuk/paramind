/* ============================================
   PARAMIND - 7-DAY PRO TRIAL PROMOTION (landing.html only)
   ============================================
   Renders into <div id="trialPromoSlot"> (between the hero and the
   Learn / Practise / Reflect panels):

   A. Free Pro Pass card  - free member, never trialled, offer switched ON
   A. Countdown card      - member currently on a trial
   B. Welcome sheet       - slides up once per device for eligible members.
                            Skipped (and tried again next visit) if the news
                            popup or role prompt is already on screen.

   The offer switch is config/trialOffer { enabled } (Admin > Emails >
   Pro Trial). The server (startProTrial) re-checks eligibility, so
   nothing here can grant a trial on its own.
   ============================================ */
(function () {
    'use strict';

    var API_BASE = 'https://europe-west2-paramind-64b8e.cloudfunctions.net';
    var SHEET_SEEN_KEY = 'paramind_trialSheetSeen_';
    var PRO_TOOLS = [
        'A&amp;P Connections', 'ECG Tool', 'Flash Cards', 'Understanding Bones',
        'Understanding Bloods', 'Understanding Drugs', 'Cardiac Arrest Sim',
        'Major Incident Training', 'ATMIST', 'Interview Prep',
        'Debrief Your Calls', 'CPD Portfolio'
    ];

    function injectStyles() {
        if (document.getElementById('trialPromoStyles')) return;
        var css = [
            '#trialPromoSlot { margin: 0 0 1.25rem; }',
            '#trialPromoSlot:empty { margin: 0; }',
            '.tp-pass { background: #164E5A; color: #fff; border-radius: 22px; overflow: hidden; box-shadow: 0 14px 30px rgba(22,78,90,0.28); max-width: 560px; margin: 0 auto; }',
            '.tp-pass-top { padding: 22px 22px 18px; display: flex; gap: 16px; align-items: center; }',
            '.tp-days { flex-shrink: 0; width: 84px; height: 84px; border-radius: 18px; background: #35B0C8; color: #0b2f37; display: flex; flex-direction: column; align-items: center; justify-content: center; }',
            '.tp-days b { font-size: 44px; line-height: 1; font-weight: 800; }',
            '.tp-days span { font-size: 11px; font-weight: 800; letter-spacing: 1.5px; }',
            '.tp-chip { display: inline-block; background: #F5B84C; color: #3b2600; font-weight: 800; font-size: 11px; letter-spacing: 1px; padding: 4px 9px; border-radius: 999px; margin-bottom: 6px; }',
            '.tp-title { font-weight: 800; font-size: 1.35rem; line-height: 1.15; margin: 0; color: #fff; }',
            '.tp-perf { display: flex; align-items: center; }',
            '.tp-perf i { width: 22px; height: 22px; border-radius: 50%; background: #FFFFFF; flex-shrink: 0; }',
            '.tp-perf i:first-child { margin-left: -11px; } .tp-perf i:last-child { margin-right: -11px; }',
            '.tp-perf hr { flex-grow: 1; border: 0; border-top: 2px dashed #3d7f8c; margin: 0; opacity: 1; }',
            '.tp-pass-bottom { padding: 16px 22px 22px; display: flex; flex-direction: column; gap: 14px; }',
            '.tp-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 9px; font-size: 0.95rem; color: #e6f6f9; }',
            '.tp-list li { display: flex; gap: 10px; align-items: center; }',
            '.tp-list .bi { color: #7fe08a; }',
            '.tp-btn { display: flex; align-items: center; justify-content: center; gap: 8px; min-height: 52px; border: none; border-radius: 14px; font-weight: 800; font-size: 1.05rem; cursor: pointer; text-decoration: none; width: 100%; padding: 0 1rem; }',
            '.tp-btn-green { background: #5BC166; color: #0d3314; }',
            '.tp-btn-green:hover { background: #6ccc76; color: #0d3314; }',
            '.tp-btn-teal { background: #1F6E7D; color: #fff; }',
            '.tp-btn-teal:hover { background: #164E5A; color: #fff; }',
            '.tp-btn[disabled] { opacity: 0.7; cursor: default; }',
            '.tp-small { text-align: center; font-size: 0.82rem; color: #b9dde4; margin: 0; }',
            '.tp-count { background: #fff; border: 2px solid #35B0C8; border-radius: 18px; padding: 16px 18px; display: flex; flex-direction: column; gap: 12px; max-width: 560px; margin: 0 auto; }',
            '.tp-count-head { display: flex; justify-content: space-between; align-items: center; gap: 8px; }',
            '.tp-count-head strong { font-size: 1rem; color: #1e293b; }',
            '.tp-count-head .tp-chip { margin: 0 8px 0 0; }',
            '.tp-count-day { font-size: 0.82rem; color: #475569; white-space: nowrap; }',
            '.tp-bar { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 5px; }',
            '.tp-bar i { height: 8px; border-radius: 4px; background: #dbe7ea; }',
            '.tp-bar i.on { background: #2B8A9C; }',
            '.tp-count p { margin: 0; font-size: 0.9rem; color: #334155; }',
            '.tp-count a.tp-link { color: #1F6E7D; font-weight: 600; }',
            '.tp-count .tp-btn { min-height: 46px; font-size: 0.95rem; font-weight: 700; }',
            '.tp-overlay { position: fixed; inset: 0; background: rgba(11,32,38,0.62); z-index: 9000; display: flex; align-items: flex-end; justify-content: center; opacity: 0; transition: opacity 0.25s ease; }',
            '.tp-overlay.show { opacity: 1; }',
            '.tp-sheet { background: #fff; width: 100%; max-width: 480px; border-radius: 26px 26px 0 0; padding: 14px 22px calc(22px + env(safe-area-inset-bottom, 0px)); display: flex; flex-direction: column; align-items: center; gap: 13px; transform: translateY(100%); transition: transform 0.3s ease; max-height: 92vh; overflow-y: auto; }',
            '.tp-overlay.show .tp-sheet { transform: translateY(0); }',
            '.tp-handle { width: 44px; height: 5px; border-radius: 3px; background: #d5dee1; }',
            '.tp-avatar { position: relative; width: 92px; height: 92px; }',
            '.tp-avatar img { width: 92px; height: 92px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 0 5px #d6f0f4; }',
            '.tp-avatar .tp-chip { position: absolute; right: -10px; bottom: -2px; margin: 0; font-size: 12px; padding: 5px 9px; border: 3px solid #fff; }',
            '.tp-sheet h2 { margin: 0; text-align: center; font-weight: 800; font-size: 1.45rem; line-height: 1.2; color: #1e293b; }',
            '.tp-sheet > p { margin: 0; text-align: center; font-size: 0.95rem; color: #475569; line-height: 1.45; }',
            '.tp-tools { width: 100%; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 7px; }',
            '.tp-tools span { background: #eef7f9; border-radius: 10px; padding: 9px 6px; font-size: 0.75rem; font-weight: 600; color: #164E5A; text-align: center; line-height: 1.2; }',
            '.tp-later { min-height: 44px; border: none; background: transparent; color: #475569; font-size: 0.95rem; text-decoration: underline; cursor: pointer; }',
            '.tp-note { font-size: 0.82rem; color: #475569; margin: 0; }'
        ].join('\n');
        var style = document.createElement('style');
        style.id = 'trialPromoStyles';
        style.textContent = css;
        document.head.appendChild(style);
    }

    function toDate(v) {
        if (!v) return null;
        if (typeof v.toDate === 'function') return v.toDate();
        var d = new Date(v);
        return isNaN(d.getTime()) ? null : d;
    }

    function formatEnd(d) {
        return d.toLocaleString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit' });
    }

    // ---------- A. Free Pro Pass card ----------
    function renderOffer(slot, user) {
        slot.innerHTML =
            '<div class="tp-pass" role="region" aria-label="Free Pro trial offer">' +
                '<div class="tp-pass-top">' +
                    '<div class="tp-days" aria-hidden="true"><b>7</b><span>DAYS</span></div>' +
                    '<div><span class="tp-chip">FREE PRO PASS</span>' +
                    '<h2 class="tp-title">Your free week of Pro is waiting</h2></div>' +
                '</div>' +
                '<div class="tp-perf" aria-hidden="true"><i></i><hr><i></i></div>' +
                '<div class="tp-pass-bottom">' +
                    '<ul class="tp-list">' +
                        '<li><i class="bi bi-check-lg"></i>All 12 Pro tools unlocked</li>' +
                        '<li><i class="bi bi-check-lg"></i>Unlimited chats with Hollie</li>' +
                        '<li><i class="bi bi-check-lg"></i>Save reflections to your CPD Portfolio</li>' +
                    '</ul>' +
                    '<button type="button" class="tp-btn tp-btn-green" id="tpStartBtn">Start my free week</button>' +
                    '<p class="tp-small">No card. Nothing to cancel. It just ends.</p>' +
                '</div>' +
            '</div>';
        document.getElementById('tpStartBtn').addEventListener('click', function () {
            startTrial(user, this);
        });
    }

    // ---------- A. Countdown during the trial ----------
    function renderCountdown(slot, start, end) {
        var now = new Date();
        var msDay = 24 * 60 * 60 * 1000;
        var daysLeft = Math.max(1, Math.ceil((end - now) / msDay));
        var dayNum = start ? Math.min(7, Math.max(1, Math.floor((now - start) / msDay) + 1)) : Math.max(1, 8 - daysLeft);
        var bar = '';
        for (var i = 1; i <= 7; i++) bar += '<i' + (i <= dayNum ? ' class="on"' : '') + '></i>';
        slot.innerHTML =
            '<div class="tp-count" role="region" aria-label="Your Pro trial">' +
                '<div class="tp-count-head">' +
                    '<div><span class="tp-chip">PRO TRIAL</span><strong>' + daysLeft + ' day' + (daysLeft === 1 ? '' : 's') + ' left</strong></div>' +
                    '<span class="tp-count-day">Day ' + dayNum + ' of 7</span>' +
                '</div>' +
                '<div class="tp-bar" aria-hidden="true">' + bar + '</div>' +
                '<p>Worth a try: <a class="tp-link" href="major-incident.html">Major Incident Training</a></p>' +
                '<p class="tp-note">Your trial ends ' + formatEnd(end) + '.</p>' +
                '<a class="tp-btn tp-btn-teal" href="upgrade.html">Keep Pro – £4.99/month</a>' +
            '</div>';
    }

    // ---------- B. One-time welcome sheet ----------
    function maybeShowSheet(user) {
        var key = SHEET_SEEN_KEY + user.uid;
        try { if (localStorage.getItem(key)) return; } catch (e) { return; }

        setTimeout(function () {
            // Don't stack on top of the news popup or role prompt - try next visit instead
            if (document.getElementById('newsPopupOverlay') || document.getElementById('rolePromptOverlay')) return;
            try { localStorage.setItem(key, String(Date.now())); } catch (e) { /* ignore */ }

            var tools = PRO_TOOLS.map(function (t) { return '<span>' + t + '</span>'; }).join('');
            var overlay = document.createElement('div');
            overlay.className = 'tp-overlay';
            overlay.id = 'trialPromoOverlay';
            overlay.innerHTML =
                '<div class="tp-sheet" role="dialog" aria-modal="true" aria-labelledby="tpSheetTitle">' +
                    '<div class="tp-handle" aria-hidden="true"></div>' +
                    '<div class="tp-avatar"><img src="images/hollie.png" alt="Hollie"><span class="tp-chip">PRO</span></div>' +
                    '<h2 id="tpSheetTitle">I\'ve unlocked everything for you, free for 7 days</h2>' +
                    '<p>Every Pro tool, unlimited chats with me, and your own CPD Portfolio.</p>' +
                    '<div class="tp-tools">' + tools + '</div>' +
                    '<button type="button" class="tp-btn tp-btn-teal" id="tpSheetStart">Start my free week</button>' +
                    '<p class="tp-note">No card needed · Nothing to cancel</p>' +
                    '<button type="button" class="tp-later" id="tpSheetLater">Maybe later</button>' +
                '</div>';
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(function () { overlay.classList.add('show'); });

            function close() {
                overlay.classList.remove('show');
                document.body.style.overflow = '';
                document.removeEventListener('keydown', onKey);
                setTimeout(function () { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 300);
            }
            function onKey(e) { if (e.key === 'Escape') close(); }

            document.getElementById('tpSheetLater').addEventListener('click', close);
            overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
            document.addEventListener('keydown', onKey);
            document.getElementById('tpSheetStart').addEventListener('click', function () {
                startTrial(user, this);
            });
            document.getElementById('tpSheetStart').focus();
        }, 2500);
    }

    // ---------- Start the trial ----------
    async function startTrial(user, btn) {
        var original = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = 'Starting your free week…';
        try {
            var token = await user.getIdToken();
            var base = (window.paramind && window.paramind.CONFIG && window.paramind.CONFIG.api && window.paramind.CONFIG.api.baseUrl) || API_BASE;
            var response = await fetch(base + '/startProTrial', {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });
            var data = await response.json().catch(function () { return {}; });
            if (response.ok && data.ok) {
                btn.innerHTML = 'Your free week has started!';
                // Reload so the menu, badges and locked tools all switch to Pro
                setTimeout(function () { window.location.reload(); }, 1200);
                return;
            }
            if (response.status === 409 && data.error) {
                alert(data.error);
                window.location.reload();
                return;
            }
            throw new Error(data.error || 'Could not start the trial');
        } catch (err) {
            console.error('Trial start error:', err);
            alert('Sorry, the trial could not be started. Please try again.');
            btn.innerHTML = original;
            btn.disabled = false;
        }
    }

    // ---------- Decide what to show ----------
    function init() {
        var slot = document.getElementById('trialPromoSlot');
        if (!slot || typeof firebase === 'undefined' || !firebase.auth) return;
        injectStyles();

        firebase.auth().onAuthStateChanged(async function (user) {
            if (!user) return;
            try {
                var db = firebase.firestore();
                var results = await Promise.all([
                    db.collection('users').doc(user.uid).get(),
                    db.collection('config').doc('trialOffer').get()
                ]);
                if (!results[0].exists) return;
                var u = results[0].data();
                var now = new Date();

                var trialEnd = toDate(u.trialEndsAt);
                if (u.isPro === true && u.subscriptionStatus !== 'active' && trialEnd && trialEnd > now) {
                    renderCountdown(slot, toDate(u.trialStartedAt), trialEnd);
                    return;
                }

                var appleExpiry = toDate(u.accessExpiresAt);
                var hasPro = u.subscriptionStatus === 'active' || u.isPro === true || (appleExpiry && appleExpiry > now);
                var offerOn = results[1].exists && results[1].data().enabled === true;
                if (hasPro || u.trialUsed === true || !offerOn) return;

                renderOffer(slot, user);
                maybeShowSheet(user);
            } catch (e) {
                console.warn('Trial promo: could not load', e);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
