/* ============================================================
   js/ecg12-viewer.js — shared 12-lead ECG viewer
   ------------------------------------------------------------
   The drawing engine from ecg-12lead.html, moved into its own file so the
   new rhythm viewer (ecg-rhythm.html) can use it. Drawing, zoom and
   lead-to-lead navigation are unchanged; only the page-specific parts
   (record picker, Learn/Practise buttons, teaching panel) were left behind.

   Real ECGs from PTB-XL (PhysioNet, CC BY 4.0).

   How a page uses it:
     ECG12Viewer.init({ stage: el, hint: el, tag: el });
     ECG12Viewer.loadLibrary().then(function (library) { ... });
     ECG12Viewer.load(meta).then(function (current) { ... });
   Styles: css/ecg12-viewer.css
   ============================================================ */
window.ECG12Viewer = (function () {
    'use strict';

        // Territory palette — matches the Paramind ECG card.
        var TERR = {
            lateral:  { name:'lateral',  fill:'#EAF3DE', line:'#C0DD97', bold:'#97C459', text:'#27500A' },
            inferior: { name:'inferior', fill:'#FAEEDA', line:'#FAC775', bold:'#EF9F27', text:'#633806' },
            septal:   { name:'septal',   fill:'#E6F1FB', line:'#B5D4F4', bold:'#85B7EB', text:'#0C447C' },
            anterior: { name:'anterior', fill:'#FBEAF0', line:'#F4C0D1', bold:'#ED93B1', text:'#72243E' },
            none:     { name:'',         fill:'#F1EFE8', line:'#D3D1C7', bold:'#B4B2A9', text:'#444441' }
        };
        var T_OF = { I:'lateral', II:'inferior', III:'inferior', aVR:'none', aVL:'lateral', aVF:'inferior',
                     V1:'septal', V2:'septal', V3:'anterior', V4:'anterior', V5:'lateral', V6:'lateral' };

        // Order the leads read ACROSS the card (display), vs the order the nav walks (conventional).
        var DISPLAY = ['I','aVR','V1','V4','II','aVL','V2','V5','III','aVF','V3','V6'];
        var NAV     = ['I','II','III','aVR','aVL','aVF','V1','V2','V3','V4','V5','V6'];

        // Calibration. On the zoom view these are honoured so squares mean 0.04s & 0.1mV.
        var PX_MM = 3.78, SPEED = 25 /* mm/s */, GAIN = 10 /* mm/mV */;
        var WINDOW = 2.5; // seconds shown in the overview

        var els = { stage: null, hint: null, tag: null };
        var library = null;
        var current = null;   // { meta, leads: {name: [samples]}, fs }

        // ---- Lead derivation: store 8, derive 4 ----
        function deriveLeads(stored) {
            var I = stored.I, II = stored.II, out = {};
            for (var k in stored) out[k] = stored[k];
            var n = I.length, III = new Array(n), aVR = new Array(n), aVL = new Array(n), aVF = new Array(n);
            for (var i = 0; i < n; i++) {
                III[i] = II[i] - I[i];
                aVR[i] = -(I[i] + II[i]) / 2;
                aVL[i] = I[i] - II[i] / 2;
                aVF[i] = II[i] - I[i] / 2;
            }
            out.III = III; out.aVR = aVR; out.aVL = aVL; out.aVF = aVF;
            return out;
        }

        // ---- Draw one lead onto a canvas ----
        function draw(cv, id, pxmm, paper) {
            var dpr = window.devicePixelRatio || 1;
            var w = cv.clientWidth, h = cv.clientHeight;
            if (!w || !h) return;
            cv.width = w * dpr; cv.height = h * dpr;
            var ctx = cv.getContext('2d'); ctx.scale(dpr, dpr);
            var T = TERR[T_OF[id]];

            ctx.fillStyle = T.fill; ctx.fillRect(0, 0, w, h);
            var x, y;
            if (paper) {
                ctx.strokeStyle = T.line; ctx.lineWidth = 0.5;
                for (x = 0; x < w; x += pxmm) { ctx.beginPath(); ctx.moveTo(x + 0.25, 0); ctx.lineTo(x + 0.25, h); ctx.stroke(); }
                for (y = 0; y < h; y += pxmm) { ctx.beginPath(); ctx.moveTo(0, y + 0.25); ctx.lineTo(w, y + 0.25); ctx.stroke(); }
                ctx.strokeStyle = T.bold; ctx.lineWidth = 0.9;
                for (x = 0; x < w; x += pxmm * 5) { ctx.beginPath(); ctx.moveTo(x + 0.25, 0); ctx.lineTo(x + 0.25, h); ctx.stroke(); }
                for (y = 0; y < h; y += pxmm * 5) { ctx.beginPath(); ctx.moveTo(0, y + 0.25); ctx.lineTo(w, y + 0.25); ctx.stroke(); }
            }

            var data = current.leads[id];
            if (!data) return;
            var fs = current.fs, mid = h / 2, pxmv = pxmm * GAIN;
            var pxs = pxmm * SPEED;                 // pixels per second
            var samplesPerPx = fs / pxs;            // how many samples advance per horizontal pixel
            ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = paper ? 1.3 : 1.1; ctx.lineJoin = 'round';
            ctx.beginPath();
            for (var px = 0; px <= w; px++) {
                var si = Math.floor(px * samplesPerPx);
                if (si >= data.length) break;
                var yy = mid - data[si] * pxmv;
                if (px === 0) ctx.moveTo(px, yy); else ctx.lineTo(px, yy);
            }
            ctx.stroke();
        }

        // ---- Overview: 4x3 grid, coloured by territory, traces fill each card ----
        function overview() {
            els.tag.textContent = 'overview \u00b7 ' + WINDOW.toFixed(1) + 's window';
            els.hint.textContent = 'Tap any lead to zoom. All twelve share the same window.';
            els.stage.innerHTML = '';
            var g = document.createElement('div');
            g.className = 'ecg12-grid';
            DISPLAY.forEach(function (id) {
                var T = TERR[T_OF[id]];
                var cell = document.createElement('button');
                cell.className = 'ecg12-cell';
                cell.style.borderColor = T.bold;
                cell.style.background = T.fill;
                cell.setAttribute('aria-label', 'Zoom lead ' + id);
                var cv = document.createElement('canvas');
                cell.appendChild(cv);
                var lb = document.createElement('span');
                lb.className = 'lead-tag'; lb.textContent = id; lb.style.color = T.text;
                cell.appendChild(lb);
                cell.onclick = function () { zoom(id); };
                g.appendChild(cell);
            });
            els.stage.appendChild(g);
            requestAnimationFrame(function () {
                var cvs = g.querySelectorAll('canvas');
                DISPLAY.forEach(function (id, i) {
                    // fit the WINDOW seconds into the card width
                    var w = cvs[i].clientWidth;
                    draw(cvs[i], id, w / (WINDOW * SPEED), false);
                });
            });
        }

        // ---- Zoom: single lead on calibrated paper, prev/next walking NAV order ----
        function zoom(id) {
            var n = NAV.indexOf(id), T = TERR[T_OF[id]];
            var prevId = NAV[(n + 11) % 12], nextId = NAV[(n + 1) % 12];
            els.tag.textContent = 'lead ' + id + ' \u00b7 ' + (n + 1) + ' of 12';
            els.stage.innerHTML = '';

            var head = document.createElement('div');
            head.className = 'ecg12-zoom-head';
            var back = document.createElement('button');
            back.className = 'ecg12-btn-plain';
            back.innerHTML = '<i class="bi bi-grid-3x3-gap"></i> All 12';
            back.onclick = overview;
            var chip = document.createElement('span');
            chip.className = 'ecg12-chip';
            chip.textContent = id + (T.name ? ' \u00b7 ' + T.name : '');
            chip.style.background = T.fill; chip.style.color = T.text;
            head.appendChild(back); head.appendChild(chip);
            els.stage.appendChild(head);

            var wrap = document.createElement('div');
            wrap.className = 'ecg12-zoom-wrap';
            wrap.style.borderColor = T.bold;
            var cv = document.createElement('canvas');
            wrap.appendChild(cv);
            var lb = document.createElement('span');
            lb.className = 'lead-tag'; lb.textContent = id; lb.style.color = T.text;
            wrap.appendChild(lb);
            els.stage.appendChild(wrap);

            var nav = document.createElement('div');
            nav.className = 'ecg12-nav';
            var minis = [];
            [[prevId, 'prev'], [nextId, 'next']].forEach(function (pair) {
                var pid = pair[0], dir = pair[1], PT = TERR[T_OF[pid]];
                var b = document.createElement('button');
                b.className = 'ecg12-nav-btn' + (dir === 'next' ? ' next' : '');
                b.setAttribute('aria-label', (dir === 'prev' ? 'Previous lead ' : 'Next lead ') + pid);
                var chev = document.createElement('i');
                chev.className = 'bi bi-chevron-' + (dir === 'prev' ? 'left' : 'right');
                chev.style.color = '#ADB5BD';
                var holder = document.createElement('span');
                holder.className = 'mini'; holder.style.borderColor = PT.bold; holder.style.background = PT.fill;
                var mc = document.createElement('canvas');
                holder.appendChild(mc);
                minis.push({ cv: mc, id: pid });
                var nm = document.createElement('span'); nm.textContent = pid; nm.style.fontWeight = '600';
                if (dir === 'prev') { b.appendChild(chev); b.appendChild(holder); b.appendChild(nm); }
                else { b.appendChild(nm); b.appendChild(holder); b.appendChild(chev); }
                b.onclick = function () { zoom(pid); };
                nav.appendChild(b);
            });
            els.stage.appendChild(nav);

            requestAnimationFrame(function () {
                var w = cv.clientWidth, secs = w / (PX_MM * SPEED);
                draw(cv, id, PX_MM, true);
                els.hint.textContent = '1 small square = 0.04s and 0.1mV. Showing ' + secs.toFixed(1) + 's of lead ' + id + '.';
                minis.forEach(function (m) { draw(m.cv, m.id, 36 / (WINDOW * SPEED), false); });
            });
        }

        // ---- Public API ----
        function init(opts) {
            els.stage = opts.stage; els.hint = opts.hint; els.tag = opts.tag;
        }

        // Fetches data/ecg12/library.json once and remembers it
        function loadLibrary() {
            if (library) return Promise.resolve(library);
            return fetch('data/ecg12/library.json')
                .then(function (r) { if (!r.ok) throw new Error('library load failed'); return r.json(); })
                .then(function (lib) { library = lib; return lib; });
        }

        // Loads one record and shows it as the 4x3 overview
        function load(meta) {
            els.hint.textContent = 'Loading\u2026';
            els.stage.innerHTML = '';
            return fetch('data/ecg12/records/' + meta.id + '.json')
                .then(function (r) { if (!r.ok) throw new Error('load failed'); return r.json(); })
                .then(function (rec) {
                    current = { meta: meta, fs: rec.fs, leads: deriveLeads(rec.leads) };
                    overview();
                    return current;
                })
                .catch(function (err) {
                    els.hint.textContent = 'Could not load this record.';
                    throw err;
                });
        }

        return {
            init: init,
            loadLibrary: loadLibrary,
            load: load,
            overview: overview,
            getCurrent: function () { return current; },
            TERR: TERR
        };
})();
