/*
 * rois-engine.js  —  Paramind ROIS self-assessment engine
 *
 * A self-contained "flip-card" trainer. Walks the four ROIS steps one at a
 * time: look -> think -> reveal the expert findings -> self-mark. Designed
 * for learners who aren't yet confident with ECGs, so there are no wrong
 * answers to get — you compare your own read to the expert's and mark yourself.
 *
 * It knows NOTHING about the 12-lead viewer, PTB-XL, or Firebase. You hand it
 * a record's ROIS text and a container; it runs the flow and calls you back.
 * That keeps it reusable elsewhere (e.g. a future single-lead page) and lets
 * CPD be wired in later without touching this file.
 *
 * Reuses the existing css/rois.css visual language.
 *
 * Usage:
 *   RoisEngine.start({
 *     container: el,                       // where to render
 *     labels:   { R, O, I, S },            // step names
 *     rois:     { R, O, I, S },            // expert findings text per step
 *     recordLabel: 'Inferior ST elevation',
 *     onStepMarked: function (letter, mark) {},   // optional, mark in {got,nearly,missed}
 *     onComplete:   function (results) {},        // optional, results = {marks:{R,O,I,S}, recordLabel}
 *     onNext:       function () {}                 // optional, "next record" button in summary
 *   });
 */
(function (global) {
    'use strict';

    var STEPS = ['R', 'O', 'I', 'S'];
    var DEFAULT_LABELS = { R: 'Rate & Rhythm', O: 'Origin', I: 'Intervals', S: 'ST segment & T waves' };

    // Self-mark -> indicator class (reuses rois.css states; 'nearly' gets its own inline colour)
    var MARK_INDICATOR = { got: 'indicator-correct', nearly: 'indicator-nearly', missed: 'indicator-incorrect' };
    var MARK_ICON = { got: 'bi-check-circle-fill', nearly: 'bi-dash-circle-fill', missed: 'bi-x-circle-fill' };
    var MARK_LABEL = { got: 'Got it', nearly: 'Nearly', missed: 'Missed it' };

    function el(tag, cls, html) {
        var e = document.createElement(tag);
        if (cls) e.className = cls;
        if (html != null) e.innerHTML = html;
        return e;
    }

    function RoisSession(opts) {
        this.opts = opts;
        this.container = opts.container;
        this.labels = opts.labels || DEFAULT_LABELS;
        this.rois = opts.rois || {};
        this.stepIndex = 0;
        this.marks = {};        // letter -> 'got'|'nearly'|'missed'
        this.revealed = false;
    }

    RoisSession.prototype.render = function () {
        var self = this;
        var c = this.container;
        c.innerHTML = '';

        // ---- Letter indicators (R O I S) ----
        var inds = el('div', 'rois-letter-indicators');
        STEPS.forEach(function (letter, i) {
            var d = el('div', 'rois-letter-indicator');
            d.textContent = letter;
            if (self.marks[letter]) {
                d.classList.add(MARK_INDICATOR[self.marks[letter]]);
            } else if (i === self.stepIndex) {
                d.classList.add('indicator-active');
            } else {
                d.classList.add('indicator-pending');
            }
            inds.appendChild(d);
        });
        c.appendChild(inds);

        // ---- Step card ----
        var letter = STEPS[this.stepIndex];
        var card = el('div', 'rois-step-card');

        var header = el('div', 'rois-step-header');
        var big = el('div', 'rois-letter-big');
        big.textContent = letter;
        var htext = el('div');
        htext.appendChild(el('div', 'rois-step-label', 'Step ' + (this.stepIndex + 1) + ' of 4'));
        htext.appendChild(el('div', 'rois-section-title', this.labels[letter] || DEFAULT_LABELS[letter]));
        header.appendChild(big);
        header.appendChild(htext);
        card.appendChild(header);

        if (!this.revealed) {
            // Look & think prompt
            card.appendChild(el('div', 'rois-question',
                'Look at the ECG above. What do you see for <strong>' +
                (this.labels[letter] || DEFAULT_LABELS[letter]) + '</strong>?'));
            var revealBtn = el('button', 'rois-next-btn', '<i class="bi bi-eye"></i> Reveal');
            revealBtn.onclick = function () { self.revealed = true; self.render(); };
            card.appendChild(revealBtn);
        } else {
            // Expert findings
            var reveal = el('div', 'rois-step-card rois-feedback-reveal');
            reveal.style.margin = '0 0 1rem 0';
            reveal.appendChild(el('div', 'rois-step-label', 'What an experienced clinician sees'));
            reveal.appendChild(el('p', 'rois-feedback-explanation',
                (this.rois[letter] || 'No notes for this step.')));
            card.appendChild(reveal);

            // Self-mark
            card.appendChild(el('div', 'rois-step-label', 'How did your read compare?'));
            var marks = el('div', 'rois-selfmark');
            ['got', 'nearly', 'missed'].forEach(function (m) {
                var b = el('button', 'rois-selfmark-btn rois-selfmark-' + m,
                    '<i class="bi ' + MARK_ICON[m] + '"></i> ' + MARK_LABEL[m]);
                b.onclick = function () { self.mark(m); };
                marks.appendChild(b);
            });
            card.appendChild(marks);
        }

        c.appendChild(card);
    };

    RoisSession.prototype.mark = function (m) {
        var letter = STEPS[this.stepIndex];
        this.marks[letter] = m;
        if (typeof this.opts.onStepMarked === 'function') {
            try { this.opts.onStepMarked(letter, m); } catch (e) {}
        }
        this.revealed = false;
        if (this.stepIndex < STEPS.length - 1) {
            this.stepIndex++;
            this.render();
        } else {
            this.finish();
        }
    };

    RoisSession.prototype.finish = function () {
        var self = this;
        var c = this.container;
        c.innerHTML = '';

        var counts = { got: 0, nearly: 0, missed: 0 };
        STEPS.forEach(function (l) { if (self.marks[l]) counts[self.marks[l]]++; });

        var results = el('div', 'rois-final-results');

        // A gentle, non-numeric headline — this is self-assessment, not a test score.
        var msg;
        if (counts.missed === 0 && counts.nearly === 0) msg = 'Walked all four, clean read.';
        else if (counts.got + counts.nearly >= 3) msg = 'Good work — you walked every step.';
        else msg = 'Every step walked. That is the habit that matters.';
        results.appendChild(el('div', 'rois-final-title', msg));
        results.appendChild(el('p', 'rois-final-message',
            'You looked at all four parts of the ECG — the discipline that stops findings being missed.'));

        // Per-letter breakdown
        var breakdown = el('div', 'rois-letter-breakdown');
        breakdown.style.margin = '1.25rem 0';
        STEPS.forEach(function (letter) {
            var m = self.marks[letter] || 'missed';
            var row = el('div', 'rois-letter-stat');
            row.style.marginBottom = '0.6rem';
            var head = el('div', 'rois-letter-stat-header');
            var badge = el('div', 'rois-letter-stat-letter');
            badge.textContent = letter;
            head.appendChild(badge);
            head.appendChild(el('span', 'rois-letter-stat-label', self.labels[letter] || DEFAULT_LABELS[letter]));
            row.appendChild(head);
            var mk = el('span', 'rois-selfmark-tag rois-selfmark-' + m,
                '<i class="bi ' + MARK_ICON[m] + '"></i> ' + MARK_LABEL[m]);
            row.appendChild(mk);
            breakdown.appendChild(row);
        });
        results.appendChild(breakdown);

        // Actions
        var actions = el('div', 'rois-final-buttons');
        var retry = el('button', 'rois-next-btn', '<i class="bi bi-arrow-repeat"></i> Try this ECG again');
        retry.onclick = function () { self.restart(); };
        actions.appendChild(retry);
        if (typeof this.opts.onNext === 'function') {
            var next = el('button', 'rois-next-btn', 'Next ECG <i class="bi bi-arrow-right"></i>');
            next.style.background = 'var(--color-green)';
            next.onclick = function () { self.opts.onNext(); };
            actions.appendChild(next);
        }
        results.appendChild(actions);

        c.appendChild(results);

        if (typeof this.opts.onComplete === 'function') {
            try { this.opts.onComplete({ marks: this.marks, counts: counts, recordLabel: this.opts.recordLabel }); } catch (e) {}
        }
    };

    RoisSession.prototype.restart = function () {
        this.stepIndex = 0;
        this.marks = {};
        this.revealed = false;
        this.render();
    };

    var RoisEngine = {
        start: function (opts) {
            if (!opts || !opts.container) { return null; }
            var session = new RoisSession(opts);
            session.render();
            return session;
        }
    };

    global.RoisEngine = RoisEngine;

})(window);
