/* ============================================================================
 * Paramind — Go deeper (shared, drop-in)
 * ----------------------------------------------------------------------------
 * Add to any page with:  <script src="js/go-deeper.js"></script>
 * (after menu-v2.js, which provides firebase + window.paramind.CONFIG)
 *
 * Opens a popup in which Hollie explains something at university Level 5–6
 * depth, streamed from the existing /chat endpoint. Self-contained: it injects
 * its own styles and popup. Safe to include once per page.
 *
 * Usage from a page:
 *   ParamindGoDeeper.open({
 *       snippet: 'Potassium (K+)',               // shown at the top of the popup
 *       message: 'Marker: ... Normal range: ...', // what Hollie is given to work from
 *       context: 'The learner is studying a blood test marker.',  // who/where
 *       extra:   'Explain how the body regulates this marker...'  // optional, page-specific
 *   });
 *
 * Buttons can use the injected class "pgd-btn" for the standard amber style.
 * ==========================================================================*/
(function () {
    if (window.ParamindGoDeeper) return;

    function buildPrompt(context, extra) {
        return [
            'You are Hollie, an experienced UK paramedic and educator. ' + (context || '') +
            ' They want to go deeper, at university Level 5–6 depth. Using the information provided as your starting point:',
            '1. Explain the underlying mechanism at cellular and molecular, tissue and organ, and whole-body level, where relevant.',
            '2. Walk through it as a chain of cause and effect.',
            '3. Link it to the signs, symptoms and observations a paramedic would see, and explain why each appears.',
            '4. Define key terms briefly the first time you use them.',
            '5. Finish with a short "Linking it together" paragraph.',
            extra ? '\n' + extra : '',
            '',
            'Keep your warm, encouraging tone, but prioritise accuracy and depth. You may use short subheadings. Aim for 300–450 words. Use UK spelling and terminology.',
            '',
            'This is for education only. Do not discuss medicines, drug actions, treatments or management. If they come up, remind the learner to refer to JRCalc and their trust guidelines.'
        ].join('\n');
    }

    var CSS = [
        '.pgd-btn{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#fff;border:none;padding:0.6rem 1.25rem;border-radius:999px;font-weight:600;font-size:0.9rem;cursor:pointer;display:inline-flex;align-items:center;gap:0.5rem;font-family:inherit;}',
        '.pgd-btn:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(245,158,11,0.35);}',
        '#pgdOverlay{position:fixed;inset:0;z-index:2100;display:none;align-items:center;justify-content:center;background:rgba(20,40,45,0.5);padding:1rem;}',
        '#pgdOverlay.pgd-open{display:flex;}',
        ".pgd-modal{background:#fff;border-radius:18px;width:100%;max-width:560px;max-height:85vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 50px rgba(0,0,0,0.25);font-family:'Plus Jakarta Sans',-apple-system,sans-serif;}",
        '.pgd-head{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid var(--color-gray-200,#E9ECEF);flex-shrink:0;}',
        '.pgd-head img{width:36px;height:36px;border-radius:50%;object-fit:cover;flex-shrink:0;}',
        '.pgd-title{font-size:0.9rem;font-weight:700;color:#212529;line-height:1.2;}',
        '.pgd-tag{font-size:0.72rem;font-weight:600;color:var(--color-teal,#2B8A9C);}',
        '.pgd-close{margin-left:auto;width:32px;height:32px;border:none;background:#f1f3f5;border-radius:8px;color:var(--color-gray-700,#495057);font-size:1.3rem;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;}',
        '.pgd-body{padding:16px;overflow-y:auto;font-size:0.95rem;line-height:1.7;color:var(--color-gray-700,#495057);}',
        '.pgd-snip{background:#f0f9fb;border-left:3px solid var(--color-teal,#2B8A9C);padding:10px 12px;font-size:0.82rem;color:var(--color-teal-dark,#237282);margin-bottom:14px;font-weight:500;}',
        '.pgd-ans p{margin:0 0 0.75rem;}',
        '.pgd-ans p:last-child{margin-bottom:0;}',
        '.pgd-ans strong{color:var(--color-teal,#2B8A9C);}',
        '.pgd-ans ul,.pgd-ans ol{margin:0.5rem 0;padding-left:1.5rem;}',
        '.pgd-ans li{display:list-item;margin-bottom:0.35rem;}',
        '.pgd-ans h1,.pgd-ans h2,.pgd-ans h3,.pgd-ans h4{font-size:1.05rem;font-weight:700;margin:1rem 0 0.5rem;color:var(--color-gray-800,#343a40);}',
        '.pgd-ans h1:first-child,.pgd-ans h2:first-child,.pgd-ans h3:first-child,.pgd-ans h4:first-child{margin-top:0;}'
    ].join('\n');

    var overlay, snipEl, answerEl, requestId = 0;

    function injectChrome() {
        if (overlay) return;
        var style = document.createElement('style');
        style.id = 'pgdStyles';
        style.textContent = CSS;
        document.head.appendChild(style);

        overlay = document.createElement('div');
        overlay.id = 'pgdOverlay';
        overlay.innerHTML =
            '<div class="pgd-modal" role="dialog" aria-modal="true" aria-labelledby="pgdTitle">' +
                '<div class="pgd-head">' +
                    '<img src="images/hollie.png" alt="Hollie">' +
                    '<div>' +
                        '<div class="pgd-title" id="pgdTitle">Going deeper</div>' +
                        '<div class="pgd-tag">Advanced · Level 5–6</div>' +
                    '</div>' +
                    '<button type="button" class="pgd-close" aria-label="Close">&times;</button>' +
                '</div>' +
                '<div class="pgd-body">' +
                    '<div class="pgd-snip"></div>' +
                    '<div class="pgd-ans"></div>' +
                '</div>' +
            '</div>';
        document.body.appendChild(overlay);
        snipEl = overlay.querySelector('.pgd-snip');
        answerEl = overlay.querySelector('.pgd-ans');

        overlay.querySelector('.pgd-close').addEventListener('click', close);
        overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && overlay.classList.contains('pgd-open')) close();
        });
    }

    function escapeHtml(t) {
        return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // Turns Hollie's markdown into HTML. Works line by line, so it is safe to run
    // on a half-finished answer while it is still streaming in.
    function inline(t) {
        return t
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/__(.+?)__/g, '<strong>$1</strong>')
            .replace(/(^|[^*])\*(?!\s)([^*]+?)\*(?!\*)/g, '$1<em>$2</em>')
            .replace(/\*\*/g, '');                     // an unfinished ** while streaming
    }
    function formatAnswer(full) {
        if (typeof marked !== 'undefined') return marked.parse(full);   // pages that load marked (Flash Cards)
        var lines = escapeHtml(full).split('\n');
        var html = '', para = [], list = null;
        function flushPara() { if (para.length) { html += '<p>' + inline(para.join('<br>')) + '</p>'; para = []; } }
        function flushList() { if (list) { html += '</' + list + '>'; list = null; } }
        lines.forEach(function (raw) {
            var line = raw.trim(), m;
            if (!line) { flushPara(); flushList(); return; }
            if ((m = line.match(/^#{1,6}\s*(.+?)\s*#*$/))) {              // ### Heading
                flushPara(); flushList();
                html += '<h3>' + inline(m[1]) + '</h3>'; return;
            }
            if ((m = line.match(/^\*\*([^*]{2,80})\*\*:?$/))) {             // **Heading** on its own line
                flushPara(); flushList();
                html += '<h3>' + m[1] + '</h3>'; return;
            }
            if ((m = line.match(/^[-*•]\s+(.*)$/))) {                       // - bullet
                flushPara();
                if (list !== 'ul') { flushList(); html += '<ul>'; list = 'ul'; }
                html += '<li>' + inline(m[1]) + '</li>'; return;
            }
            if ((m = line.match(/^\d+[.)]\s+(.*)$/))) {                     // 1. numbered
                flushPara();
                if (list !== 'ol') { flushList(); html += '<ol>'; list = 'ol'; }
                html += '<li>' + inline(m[1]) + '</li>'; return;
            }
            flushList();
            para.push(line);
        });
        flushPara(); flushList();
        return html;
    }

    function close() {
        requestId++;   // ignore any answer still streaming in
        if (!overlay) return;
        overlay.classList.remove('pgd-open');
        answerEl.innerHTML = '';
    }

    async function open(opts) {
        opts = opts || {};
        injectChrome();
        var myId = ++requestId;
        snipEl.textContent = opts.snippet || '';
        snipEl.style.display = opts.snippet ? '' : 'none';
        answerEl.innerHTML = '<p>Hollie is thinking&hellip;</p>';
        overlay.classList.add('pgd-open');

        try {
            if (typeof firebase === 'undefined' || !firebase.auth().currentUser) throw new Error('Not signed in');
            var token = await firebase.auth().currentUser.getIdToken();
            var cfg = (window.paramind && window.paramind.CONFIG && window.paramind.CONFIG.api) || {};
            var response = await fetch(cfg.baseUrl + cfg.chat, {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: (opts.message || '') + '\n\nPlease take this further for me at university Level 5-6.',
                    conversationHistory: [],
                    systemPromptAddendum: buildPrompt(opts.context, opts.extra)
                })
            });
            if (!response.ok) {
                throw new Error(response.status === 429 ? 'LIMIT_REACHED' : 'Request failed');
            }

            var reader = response.body.getReader();
            var decoder = new TextDecoder();
            var full = '', buffer = '', drawPending = false;
            // Format as it streams, at most once per screen refresh
            function draw() {
                drawPending = false;
                if (myId === requestId) answerEl.innerHTML = formatAnswer(full);
            }
            while (true) {
                var chunk = await reader.read();
                if (chunk.done) break;
                // A line can be split across two network chunks: keep the unfinished end for next time
                buffer += decoder.decode(chunk.value, { stream: true });
                var lines = buffer.split('\n');
                buffer = lines.pop();
                for (var i = 0; i < lines.length; i++) {
                    if (lines[i].indexOf('data: ') !== 0) continue;
                    var data;
                    try { data = JSON.parse(lines[i].slice(6)); } catch (e) { continue; }
                    if (data.type === 'chunk') {
                        full += data.content;
                        if (!drawPending) { drawPending = true; requestAnimationFrame(draw); }
                    } else if (data.type === 'error') {
                        throw new Error(data.error);
                    }
                }
            }
            if (buffer.indexOf('data: ') === 0) {
                try { var last = JSON.parse(buffer.slice(6)); if (last.type === 'chunk') full += last.content; } catch (e) { /* ignore */ }
            }
            if (myId === requestId) answerEl.innerHTML = formatAnswer(full);
        } catch (err) {
            if (myId !== requestId) return;
            console.error('Go deeper error:', err);
            answerEl.innerHTML = (err.message === 'LIMIT_REACHED')
                ? '<p>You\'ve used all your free messages for today. Your limit resets at midnight.</p>'
                : '<p style="color:#dc2626;">Sorry, I couldn\'t go deeper just now. Please try again.</p>';
        }
    }

    // Styles are needed for page buttons straight away, not just when the popup opens
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectChrome);
    } else {
        injectChrome();
    }

    window.ParamindGoDeeper = { open: open, close: close };
})();
