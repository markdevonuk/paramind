/* ============================================================================
 * Paramind — Explain a term (reusable, drop-in)
 * ----------------------------------------------------------------------------
 * Add to any page with:  <script src="js/explain-term.js"></script>
 * (after menu-v2.js, which provides firebase + window.paramind.CONFIG + marked)
 *
 * It activates inside any element matching .hollie-bubble (automatic) or any
 * element you mark with data-explain. Inside those:
 *   - tap a word            -> quick explanation
 *   - long-press then drag  -> explain a phrase (touch); click-drag on desktop
 *   - flicks still scroll
 * The explanation streams from the existing /chat endpoint. A one-time tip
 * tells first-time users the feature exists. Fully self-contained: it injects
 * its own styles, popup and tip. Safe to include once per page.
 * ==========================================================================*/
(function () {
    if (window.__paramindExplainTerm) return;
    window.__paramindExplainTerm = true;

    var SELECTOR = '.hollie-bubble, [data-explain]';
    var MIN_LEN = 2, MAX_LEN = 200, LONG_PRESS_MS = 450, MOVE_CANCEL = 10;
    var TIP_KEY = 'pm_explainTermTipSeen';

    var HX_SYSTEM_PROMPT = [
        'You are Hollie, a friendly and experienced UK paramedic tutor. The learner was reading and has tapped a word or short phrase. They want a quick, clear explanation of just that term.',
        '',
        'Rules:',
        '- Explain ONLY the highlighted term: what it means and why it matters clinically for a UK paramedic.',
        '- Keep it short: 2 to 4 sentences, roughly 60-110 words. Warm, plain, conversational. UK spelling.',
        '- This is EDUCATION only. Never give treatment advice, drug names, doses, or protocols. If treatment comes up, remind them to check JRCalc.',
        "- Don't add a long greeting or sign-off. Just explain the term."
    ].join('\n');

    var CSS = [
        '#hxOverlay{position:fixed;inset:0;z-index:2100;display:none;align-items:center;justify-content:center;background:rgba(20,40,45,0.5);padding:1rem;}',
        '#hxOverlay.hx-open{display:flex;}',
        ".hx-modal{background:#fff;border-radius:18px;width:100%;max-width:460px;max-height:85vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 50px rgba(0,0,0,0.25);font-family:'Plus Jakarta Sans',-apple-system,sans-serif;}",
        '.hx-mhead{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid var(--color-gray-200,#E9ECEF);flex-shrink:0;}',
        '.hx-mav{width:36px;height:36px;border-radius:50%;overflow:hidden;flex-shrink:0;background:var(--color-teal,#2B8A9C);}',
        '.hx-mav img{width:100%;height:100%;object-fit:cover;}',
        '.hx-mtitle{font-size:0.9rem;font-weight:700;color:#212529;line-height:1.2;}',
        '.hx-mtag{font-size:0.72rem;font-weight:600;color:var(--color-teal,#2B8A9C);}',
        '.hx-close{margin-left:auto;width:32px;height:32px;border:none;background:#f1f3f5;border-radius:8px;color:var(--color-gray-700,#495057);font-size:1.3rem;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;}',
        '.hx-close:hover{background:var(--color-gray-200,#E9ECEF);}',
        '.hx-mbody{padding:16px;overflow-y:auto;}',
        '.hx-snip{background:#f0f9fb;border-left:3px solid var(--color-teal,#2B8A9C);padding:10px 12px;font-size:0.82rem;color:var(--color-teal-dark,#237282);margin-bottom:14px;font-weight:500;}',
        '.hx-ans{font-size:0.95rem;line-height:1.7;color:var(--color-gray-700,#495057);min-height:20px;}',
        '.hx-ans p{margin:0 0 0.75rem;font-size:0.95rem;line-height:1.7;color:var(--color-gray-700,#495057);}',
        '.hx-ans p:last-child{margin-bottom:0;}',
        '.hx-ans strong{color:var(--color-teal,#2B8A9C);}',
        '.hx-ans ul,.hx-ans ol{margin:0.5rem 0;padding-left:1.5rem;}',
        '.hx-ans li{display:list-item;margin-bottom:0.35rem;font-size:0.95rem;}',
        '.hx-ans h1,.hx-ans h2,.hx-ans h3{font-size:1.1rem;font-weight:700;margin:1rem 0 0.5rem;color:var(--color-gray-800,#343a40);}',
        '.hx-ans h1:first-child,.hx-ans h2:first-child,.hx-ans h3:first-child{margin-top:0;}',
        '.hx-cur{display:inline-block;width:2px;height:1em;background:var(--color-teal,#2B8A9C);vertical-align:-2px;animation:hxBlink 1s steps(1) infinite;}',
        '@keyframes hxBlink{50%{opacity:0;}}',
        '.hx-foot{padding:0 16px 16px;text-align:center;flex-shrink:0;}',
        '.hx-footbtn{font-size:0.8rem;color:var(--color-teal,#2B8A9C);background:none;border:none;cursor:pointer;font-weight:600;}',
        '.hx-tappable{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;cursor:pointer;}',
        '.hx-w{border-radius:3px;}',
        '.hx-tappable .hx-w:active{background:rgba(43,138,156,0.18);}',
        '.hx-w.hx-sel{background:rgba(43,138,156,0.28);}',
        "#hxTip{position:fixed;left:50%;top:16px;transform:translate(-50%,-12px);z-index:2200;display:none;align-items:flex-start;gap:9px;max-width:360px;width:calc(100% - 32px);background:#eef9fb;border:1px solid #c9eaf0;border-radius:12px;padding:11px 13px;box-shadow:0 8px 24px rgba(0,0,0,0.12);opacity:0;transition:opacity .35s ease,transform .35s ease;font-family:'Plus Jakarta Sans',-apple-system,sans-serif;}",
        '#hxTip.hx-show{display:flex;opacity:1;transform:translate(-50%,0);}',
        '#hxTip .hx-tiptxt{font-size:13px;color:var(--color-teal-dark,#237282);line-height:1.5;font-weight:500;}',
        '#hxTip .hx-tipx{margin-left:auto;border:none;background:none;color:#7bb8c4;font-size:18px;line-height:1;cursor:pointer;flex-shrink:0;padding:0 2px;}',
        '#hxTip .hx-tipx:hover{color:var(--color-teal,#2B8A9C);}',
        '@media (max-width:600px){#hxOverlay{align-items:flex-end;padding:0;}.hx-modal{max-width:100%;border-radius:18px 18px 0 0;max-height:88vh;}}'
    ].join('');

    var overlay, snippetEl, answerEl, tipEl, tipHideTimer = null;

    function injectChrome() {
        var style = document.createElement('style');
        style.id = 'hxStyles';
        style.textContent = CSS;
        document.head.appendChild(style);

        overlay = document.createElement('div');
        overlay.id = 'hxOverlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Hollie explanation');
        overlay.innerHTML =
            '<div class="hx-modal">' +
              '<div class="hx-mhead">' +
                '<div class="hx-mav"><img src="/images/hollie.png" alt="Hollie"></div>' +
                '<div><div class="hx-mtitle">Hollie</div><div class="hx-mtag">Paramedic Tutor</div></div>' +
                '<button class="hx-close" id="hxClose" aria-label="Close">&times;</button>' +
              '</div>' +
              '<div class="hx-mbody">' +
                '<div class="hx-snip"><span id="hxSnippet"></span></div>' +
                '<div class="hx-ans" id="hxAnswer"></div>' +
              '</div>' +
              '<div class="hx-foot"><button class="hx-footbtn" id="hxFootClose">Got it, close</button></div>' +
            '</div>';
        document.body.appendChild(overlay);
        snippetEl = overlay.querySelector('#hxSnippet');
        answerEl = overlay.querySelector('#hxAnswer');
        overlay.querySelector('#hxClose').addEventListener('click', closeModal);
        overlay.querySelector('#hxFootClose').addEventListener('click', closeModal);
        overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });

        tipEl = document.createElement('div');
        tipEl.id = 'hxTip';
        tipEl.innerHTML =
            '<span class="hx-tiptxt">\uD83D\uDCA1 Tip: tap any word for a quick explanation \u2014 or long-press and drag for a phrase.</span>' +
            '<button class="hx-tipx" aria-label="Dismiss tip">&times;</button>';
        document.body.appendChild(tipEl);
        tipEl.querySelector('.hx-tipx').addEventListener('click', hideTip);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && overlay.classList.contains('hx-open')) closeModal();
        });
    }

    /* ---- word wrapping (lets us highlight word-by-word, keeps formatting) ---- */
    function wrapWords(region) {
        if (!region || region.dataset.hxWrapped) return;
        var walker = document.createTreeWalker(region, NodeFilter.SHOW_TEXT, null);
        var nodes = [], n;
        while ((n = walker.nextNode())) { if (n.nodeValue && n.nodeValue.trim()) nodes.push(n); }
        var idx = 0;
        nodes.forEach(function (node) {
            var parts = node.nodeValue.split(/(\s+)/);
            var frag = document.createDocumentFragment();
            parts.forEach(function (part) {
                if (part === '') return;
                if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); }
                else {
                    var sp = document.createElement('span');
                    sp.className = 'hx-w';
                    sp.dataset.i = idx++;
                    sp.textContent = part;
                    frag.appendChild(sp);
                }
            });
            node.parentNode.replaceChild(frag, node);
        });
        region.dataset.hxWrapped = '1';
        region.classList.add('hx-tappable');
    }

    /* ---- light scan: prep styling + show tip; wrapping happens lazily on tap ---- */
    function scanRegions() {
        var regions = document.querySelectorAll(SELECTOR);
        for (var i = 0; i < regions.length; i++) {
            var r = regions[i];
            // Apply no-native-menu styling early (cheap class; does NOT wrap yet,
            // so streamed answers can't lose their wrapping mid-render).
            if (!r.classList.contains('hx-tappable')) r.classList.add('hx-tappable');
            // Show the one-time tip once there's real content worth explaining.
            if (r.textContent.trim().length > 40) maybeShowTip();
        }
    }

    /* ---- one-time tip ---- */
    var tipShown = false;
    function maybeShowTip() {
        if (tipShown) return;
        try { if (localStorage.getItem(TIP_KEY)) { tipShown = true; return; } } catch (e) {}
        tipShown = true;
        tipEl.style.display = 'flex';
        requestAnimationFrame(function () { tipEl.classList.add('hx-show'); });
        tipHideTimer = setTimeout(hideTip, 8000);
        try { localStorage.setItem(TIP_KEY, '1'); } catch (e) {}
    }
    function hideTip() {
        clearTimeout(tipHideTimer);
        tipEl.classList.remove('hx-show');
        setTimeout(function () { tipEl.style.display = 'none'; }, 350);
    }

    /* ---- tap (word) + long-press-drag (phrase); flicks still scroll ---- */
    var currentRegion = null, wordSpans = [], currentSnippet = '';
    var gestureActive = false, phraseSelecting = false, moved = false, isTouch = false;
    var startI = 0, startX = 0, startY = 0, pressTimer = null;

    function regionOf(el) { return (el && el.closest) ? el.closest(SELECTOR) : null; }
    function spanAt(x, y) { var el = document.elementFromPoint(x, y); return (el && el.classList && el.classList.contains('hx-w')) ? el : null; }
    function clearSel() { wordSpans.forEach(function (w) { w.classList.remove('hx-sel'); }); }
    function applyRange(a, b) {
        var lo = Math.min(a, b), hi = Math.max(a, b);
        wordSpans.forEach(function (w, i) { w.classList.toggle('hx-sel', i >= lo && i <= hi); });
    }
    function selectedText() {
        return wordSpans.filter(function (w) { return w.classList.contains('hx-sel'); })
                        .map(function (w) { return w.textContent; })
                        .join(' ').replace(/\s+/g, ' ').trim();
    }
    function resetGesture() { gestureActive = false; phraseSelecting = false; moved = false; clearTimeout(pressTimer); }

    function beginAt(x, y, touch) {
        var el = document.elementFromPoint(x, y);
        if (!el || (el.closest && el.closest('a,button,input,textarea,select'))) return false;
        var region = regionOf(el);
        if (!region) return false;
        // Wrap the final answer now (lazily). If a stale flag is set but the
        // spans are gone (content was re-rendered), wrap again.
        if (!region.dataset.hxWrapped || !region.querySelector('.hx-w')) {
            delete region.dataset.hxWrapped;
            wrapWords(region);
        }
        var w = spanAt(x, y);
        if (!w) return false;
        currentRegion = region;
        wordSpans = Array.prototype.slice.call(region.querySelectorAll('.hx-w'));
        startI = +w.dataset.i; startX = x; startY = y;
        gestureActive = true; phraseSelecting = false; moved = false; isTouch = !!touch;
        clearSel();
        return true;
    }

    function tryOpen() {
        var t = selectedText();
        if (t.length >= MIN_LEN && t.length <= MAX_LEN) { currentSnippet = t; openModal(); }
        else clearSel();
    }
    function finish() {
        clearTimeout(pressTimer);
        if (!gestureActive) return;
        if (phraseSelecting) { tryOpen(); }
        else if (!moved) { applyRange(startI, startI); tryOpen(); }
        else { clearSel(); }
        resetGesture();
    }

    function bindGestures() {
        document.addEventListener('pointerdown', function (e) {
            if (e.button && e.button !== 0) return;
            if (!beginAt(e.clientX, e.clientY, e.pointerType === 'touch')) return;
            if (isTouch) {
                pressTimer = setTimeout(function () {
                    if (gestureActive && !moved) { phraseSelecting = true; applyRange(startI, startI); }
                }, LONG_PRESS_MS);
            } else {
                e.preventDefault();
            }
        });
        document.addEventListener('pointermove', function (e) {
            if (!gestureActive || isTouch) return;
            var dist = Math.hypot(e.clientX - startX, e.clientY - startY);
            if (!phraseSelecting && dist > MOVE_CANCEL) phraseSelecting = true;
            if (phraseSelecting) { var w = spanAt(e.clientX, e.clientY); if (w && regionOf(w) === currentRegion) applyRange(startI, +w.dataset.i); }
        });
        document.addEventListener('pointerup', function () { if (!isTouch) finish(); });
        document.addEventListener('pointercancel', function () { clearSel(); resetGesture(); });

        document.addEventListener('touchmove', function (e) {
            if (!gestureActive || !isTouch) return;
            var t = e.touches[0]; if (!t) return;
            if (phraseSelecting) {
                e.preventDefault();
                var w = spanAt(t.clientX, t.clientY); if (w && regionOf(w) === currentRegion) applyRange(startI, +w.dataset.i);
            } else if (!moved) {
                if (Math.hypot(t.clientX - startX, t.clientY - startY) > MOVE_CANCEL) { moved = true; clearTimeout(pressTimer); }
            }
        }, { passive: false });
        document.addEventListener('touchend', function () { if (isTouch) finish(); });
        document.addEventListener('touchcancel', function () { clearSel(); resetGesture(); });
    }

    /* ---- modal + streaming explanation ---- */
    function closeModal() { overlay.classList.remove('hx-open'); answerEl.innerHTML = ''; clearSel(); }
    function escapeHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
    function formatAnswer(full) {
        return (typeof marked !== 'undefined')
            ? marked.parse(full.replace(/^[ \t]*\u2022[ \t]*/gm, '- '))
            : escapeHtml(full).replace(/\n/g, '<br>');
    }

    async function openModal() {
        if (!currentSnippet) return;
        var snippet = currentSnippet;
        snippetEl.textContent = snippet;
        answerEl.innerHTML = '<span class="hx-cur"></span>';
        overlay.classList.add('hx-open');
        try {
            if (typeof firebase === 'undefined' || !firebase.auth().currentUser) throw new Error('Not signed in');
            var token = await firebase.auth().currentUser.getIdToken(true);
            var cfg = (window.paramind && window.paramind.CONFIG && window.paramind.CONFIG.api) || {};
            var response = await fetch(cfg.baseUrl + cfg.chat, {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: 'Please give me a quick explanation of this term: "' + snippet + '"',
                    conversationHistory: [],
                    systemPrompt: HX_SYSTEM_PROMPT
                })
            });
            if (!response.ok) throw new Error('Request failed');
            var reader = response.body.getReader();
            var decoder = new TextDecoder();
            var full = '';
            while (true) {
                var chunk = await reader.read();
                if (chunk.done) break;
                var lines = decoder.decode(chunk.value, { stream: true }).split('\n');
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    if (line.indexOf('data: ') !== 0) continue;
                    try {
                        var data = JSON.parse(line.slice(6));
                        if (data.type === 'chunk') {
                            full += data.content;
                            answerEl.innerHTML = escapeHtml(full).replace(/\n/g, '<br>') + '<span class="hx-cur"></span>';
                        } else if (data.type === 'error') {
                            throw new Error(data.error);
                        }
                    } catch (err) { /* skip partial JSON */ }
                }
            }
            answerEl.innerHTML = formatAnswer(full);
        } catch (err) {
            console.error('Explain-a-term error:', err);
            answerEl.innerHTML = '<p style="color:#dc2626;">Sorry, I couldn\'t get an explanation just now. Please try again.</p>';
        }
    }

    function init() {
        injectChrome();
        bindGestures();
        new MutationObserver(scanRegions).observe(document.body, { childList: true, subtree: true });
        scanRegions();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
