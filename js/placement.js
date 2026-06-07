/* ==================== PLACEMENT ENGINE ==================== */
/* ParaMind — Student on Placement section
 * Renders the year pages and the framework lesson stepper.
 * - Year 1 frameworks are free (rendered immediately).
 * - Year 2 / 3 frameworks are Pro: the lesson page checks the subscription
 *   (Firebase is loaded by menu-v2.js) and sends free users to upgrade.html.
 * - Confidence is stored in localStorage for now (Phase 4 moves it to Firestore).
 */
(function () {
  'use strict';

  var UPGRADE_PAGE = 'upgrade.html';
  var LOGIN_PAGE = 'login.html';

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function frameworks() { return window.PLACEMENT_FRAMEWORKS || []; }
  function byId(id) { return frameworks().filter(function (f) { return f.id === id; })[0]; }
  function forYear(y) { return frameworks().filter(function (f) { return f.year === y; }); }

  function getConf(id) {
    try { var v = parseInt(localStorage.getItem('pm_placement_conf_' + id), 10); return isNaN(v) ? 0 : v; }
    catch (e) { return 0; }
  }
  function setConf(id, v) {
    try { localStorage.setItem('pm_placement_conf_' + id, String(v)); } catch (e) {}
  }

  function statusFor(conf) {
    if (conf === 0) return { cls: 'is-none', label: 'Not started' };
    if (conf <= 2)  return { cls: 'is-revisit', label: 'Revisit \u00b7 ' + conf + ' of 5' };
    if (conf === 3) return { cls: 'is-getting', label: 'Getting there \u00b7 3 of 5' };
    return { cls: 'is-confident', label: 'Confident \u00b7 ' + conf + ' of 5' };
  }

  function segs(conf) {
    var out = '';
    for (var i = 1; i <= 5; i++) out += '<span class="pm-seg' + (i <= conf ? ' f' : '') + '"></span>';
    return '<span class="pm-segs">' + out + '</span>';
  }

  function fwRow(f) {
    var conf = getConf(f.id);
    var st = statusFor(conf);
    return '<a class="pm-fw-row" href="framework-lesson.html?id=' + f.id + '">' +
      '<span class="pm-fw-meta"><span class="pm-fw-title">' + esc(f.title) + '</span>' +
      '<span class="pm-fw-sec">' + esc(f.section) + '</span></span>' +
      '<span class="pm-fw-status"><span class="pm-tag ' + st.cls + '">' + st.label + '</span>' +
      (conf > 0 ? segs(conf) : '') + '</span></a>';
  }

  /* ---------- YEAR PAGE ---------- */
  function renderYear(root) {
    var year = parseInt(root.getAttribute('data-year'), 10) || 1;
    var list = forYear(year);
    var advice = (window.PLACEMENT_ADVICE && window.PLACEMENT_ADVICE[year]) || [];

    var adviceCards = advice.map(function (a) {
      return '<div class="pm-advice-card"><span>' + esc(a) + '</span>' +
        '<span class="pm-tag is-none">Coming soon</span></div>';
    }).join('');

    var revisit = list.filter(function (f) { var c = getConf(f.id); return c >= 1 && c <= 2; });
    var revisitHtml = '';
    if (revisit.length) {
      revisitHtml = '<div class="pm-section-title"><i class="bi bi-arrow-repeat"></i> Worth revisiting</div>' +
        '<div class="pm-fw-list pm-revisit">' + revisit.map(fwRow).join('') + '</div>';
    }

    var practised = list.filter(function (f) { return getConf(f.id) > 0; });
    var avg = practised.length
      ? (practised.reduce(function (s, f) { return s + getConf(f.id); }, 0) / practised.length).toFixed(1)
      : null;
    var summary = practised.length
      ? practised.length + ' of ' + list.length + ' practised \u00b7 average confidence ' + avg + ' of 5'
      : list.length + ' frameworks \u00b7 none practised yet';

    root.innerHTML =
      '<h2 class="pm-section-title">On placement \u2014 what the uni doesn\u2019t tell you</h2>' +
      '<p class="pm-sub">Honest advice on your shifts and how to cope.</p>' +
      '<div class="pm-advice-grid">' + adviceCards + '</div>' +
      revisitHtml +
      '<h2 class="pm-section-title">Frameworks for ' + (window.PLACEMENT_YEARS[year] ? window.PLACEMENT_YEARS[year].label.toLowerCase() : 'this year') + '</h2>' +
      '<p class="pm-sub">' + summary + '</p>' +
      '<div class="pm-fw-list">' + list.map(fwRow).join('') + '</div>';
  }

  /* ---------- LESSON PAGE ---------- */
  function getParam(name) {
    var m = new RegExp('[?&]' + name + '=([^&]+)').exec(window.location.search);
    return m ? decodeURIComponent(m[1]) : null;
  }

  function lessonStepperHtml(f) {
    var beats = [
      { name: 'What it is', body: '<p class="pm-lead">' + esc(f.summary) + '</p>' },
      { name: 'Why it matters', body: (f.whyItMatters || []).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') },
      { name: 'How it works', body:
        '<div class="pm-analogy"><i class="bi ' + esc(f.analogyIcon || 'bi-lightbulb') + '"></i><p>' + esc(f.analogy) + '</p></div>' +
        (f.steps && f.steps.length ? '<div class="pm-steps">' + f.steps.map(function (s, i) {
          return '<div class="pm-step-item"><span class="pm-num">' + (i + 1) + '</span><p>' + esc(s) + '</p></div>';
        }).join('') + '</div>' : '') },
      { name: 'On scene', body:
        '<p class="pm-onscene-label"><i class="bi bi-truck"></i> On scene</p>' +
        '<p>' + esc(f.onSceneSetup) + '</p>' +
        '<button type="button" class="pm-btn" id="pmReveal"><i class="bi bi-eye"></i> Reveal the point</button>' +
        '<div class="pm-reveal-box pm-hidden" id="pmRevealBox"><p>' + esc(f.onSceneReveal) + '</p></div>' },
      { name: 'Try it', body:
        '<p class="pm-onscene-label"><i class="bi bi-lightbulb"></i> Try it</p>' +
        '<p>' + esc(f.tryItScenario) + '</p>' +
        '<p class="pm-sub">' + esc(f.tryItQuestions) + '</p>' +
        '<textarea class="pm-textarea" id="pmReflect" placeholder="Type your thinking here\u2026"></textarea>' +
        '<button type="button" class="pm-btn pm-btn-primary" id="pmHollieBtn"><i class="bi bi-chat-dots"></i> Ask Hollie</button>' +
        '<div class="pm-hollie pm-hidden" id="pmHollie"><span class="pm-hollie-av">H</span><div class="pm-hollie-bubble">' +
        '<p class="pm-sub">Hollie \u00b7 coaching preview</p><p>' + esc(f.hollieSample) + '</p></div></div>' +
        '<div class="pm-conf"><p class="pm-sub">How confident are you running this under pressure?</p>' +
        '<div class="pm-conf-row"><input type="range" min="1" max="5" step="1" value="' + (getConf(f.id) || 3) + '" id="pmConf">' +
        '<span id="pmConfOut">' + (getConf(f.id) || 3) + ' of 5</span></div>' +
        '<button type="button" class="pm-btn pm-btn-primary pm-save" id="pmSave"><i class="bi bi-check2-square"></i> Save my confidence</button>' +
        '<p class="pm-saved pm-hidden" id="pmSaved"><i class="bi bi-check-circle"></i> Saved. It will show on your year page.</p></div>' }
    ];

    var dots = beats.map(function () { return '<span class="pm-dot"></span>'; }).join('');
    var steps = beats.map(function (b, i) {
      return '<div class="pm-step' + (i === 0 ? '' : ' pm-hidden') + '" data-step="' + i + '">' + b.body + '</div>';
    }).join('');

    return '<div class="pm-lesson">' +
      '<a href="placement-year-' + f.year + '.html" class="pm-back"><i class="bi bi-arrow-left"></i> Back to ' +
        (window.PLACEMENT_YEARS[f.year] ? window.PLACEMENT_YEARS[f.year].label.toLowerCase() : 'frameworks') + '</a>' +
      '<div class="pm-lesson-head"><span class="pm-pill">' + esc(f.section) + '</span>' +
        '<span class="pm-fw-count">Framework ' + f.number + ' of 25</span></div>' +
      '<h1 class="pm-lesson-title">' + esc(f.title) + '</h1>' +
      '<div class="pm-dots" id="pmDots">' + dots + '</div>' +
      '<p class="pm-stepname" id="pmStepName"></p>' +
      steps +
      '<div class="pm-nav-btns"><button type="button" class="pm-btn" id="pmBack"><i class="bi bi-arrow-left"></i> Back</button>' +
      '<button type="button" class="pm-btn pm-btn-primary" id="pmNext">Next <i class="bi bi-arrow-right"></i></button></div>' +
      '</div>';
  }

  function wireLesson(root, f) {
    var names = ['What it is', 'Why it matters', 'How it works', 'On scene', 'Try it'];
    var step = 0;
    var steps = root.querySelectorAll('.pm-step');
    var dots = root.querySelectorAll('#pmDots .pm-dot');
    var back = root.querySelector('#pmBack');
    var next = root.querySelector('#pmNext');
    var label = root.querySelector('#pmStepName');

    function render() {
      for (var i = 0; i < steps.length; i++) steps[i].classList.toggle('pm-hidden', i !== step);
      for (var j = 0; j < dots.length; j++) dots[j].classList.toggle('on', j <= step);
      label.textContent = names[step];
      back.disabled = step === 0;
      next.innerHTML = step === steps.length - 1 ? 'Finish' : 'Next <i class="bi bi-arrow-right"></i>';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    back.addEventListener('click', function () { if (step > 0) { step--; render(); } });
    next.addEventListener('click', function () { if (step < steps.length - 1) { step++; render(); } });

    var reveal = root.querySelector('#pmReveal');
    if (reveal) reveal.addEventListener('click', function () {
      root.querySelector('#pmRevealBox').classList.remove('pm-hidden');
      reveal.style.display = 'none';
    });
    var hb = root.querySelector('#pmHollieBtn');
    if (hb) hb.addEventListener('click', function () { root.querySelector('#pmHollie').classList.remove('pm-hidden'); });

    var conf = root.querySelector('#pmConf');
    var confOut = root.querySelector('#pmConfOut');
    if (conf) conf.addEventListener('input', function () { confOut.textContent = conf.value + ' of 5'; });
    var save = root.querySelector('#pmSave');
    if (save) save.addEventListener('click', function () {
      setConf(f.id, parseInt(conf.value, 10));
      root.querySelector('#pmSaved').classList.remove('pm-hidden');
    });

    render();
  }

  function renderLessonContent(root, f) {
    if (f.stub) {
      root.innerHTML = '<div class="pm-lesson"><a href="placement-year-' + f.year + '.html" class="pm-back">' +
        '<i class="bi bi-arrow-left"></i> Back</a>' +
        '<div class="pm-lesson-head"><span class="pm-pill">' + esc(f.section) + '</span></div>' +
        '<h1 class="pm-lesson-title">' + esc(f.title) + '</h1>' +
        '<div class="pm-coming"><i class="bi bi-hourglass-split"></i><p>This lesson is being written. Check back soon.</p></div></div>';
      return;
    }
    root.innerHTML = lessonStepperHtml(f);
    wireLesson(root, f);
  }

  /* ---------- Pro gate (year 2 / 3 lessons) ---------- */
  function waitForFirebase(cb) {
    var start = Date.now();
    (function check() {
      if (typeof firebase !== 'undefined' && firebase.auth && firebase.firestore && firebase.apps && firebase.apps.length) { cb(true); return; }
      if (Date.now() - start > 10000) { cb(false); return; }
      setTimeout(check, 150);
    })();
  }
  function gateThenRender(root, f) {
    root.innerHTML = '<div class="pm-gate-loading"><div class="pm-spin"></div><span>Loading\u2026</span></div>';
    waitForFirebase(function (ready) {
      if (!ready) { window.location.href = LOGIN_PAGE + '?redirect=' + encodeURIComponent(window.location.href); return; }
      var resolved = false, t = null;
      var unsub = firebase.auth().onAuthStateChanged(function (user) {
        if (resolved) return;
        if (user) { resolved = true; clearTimeout(t); unsub(); checkSub(user); }
        else if (!t) {
          t = setTimeout(function () {
            if (resolved) return; resolved = true; unsub();
            var u = firebase.auth().currentUser;
            if (u) checkSub(u);
            else window.location.href = LOGIN_PAGE + '?redirect=' + encodeURIComponent(window.location.href);
          }, 3000);
        }
      });
      function checkSub(user) {
        firebase.firestore().collection('users').doc(user.uid).get().then(function (doc) {
          var d = doc.exists ? doc.data() : {};
          var isPro = d.subscriptionStatus === 'active' || d.subscriptionStatus === 'pro' || d.isPro === true;
          if (isPro) renderLessonContent(root, f);
          else window.location.href = UPGRADE_PAGE + '?from=' + encodeURIComponent(window.location.href);
        }).catch(function () { renderLessonContent(root, f); });
      }
    });
  }

  function renderLesson(root) {
    var id = parseInt(getParam('id'), 10);
    var f = byId(id);
    if (!f) {
      root.innerHTML = '<div class="pm-coming"><i class="bi bi-question-circle"></i><p>Framework not found.</p>' +
        '<a class="pm-btn" href="placement.html">Back to placement</a></div>';
      return;
    }
    if (f.year === 1) renderLessonContent(root, f);   /* free */
    else gateThenRender(root, f);                      /* Pro: gate first */
  }

  /* ---------- boot ---------- */
  function boot() {
    var yearRoot = document.getElementById('placement-year-root');
    if (yearRoot) renderYear(yearRoot);
    var lessonRoot = document.getElementById('lesson-root');
    if (lessonRoot) renderLesson(lessonRoot);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
