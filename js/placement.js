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

  /* ---------- obs monitor (ambient vitals display) ---------- */
  function monitorHtml() {
    return '<div class="pm-monitor" aria-hidden="true">' +
      '<div class="pm-mon-top"><span><span class="pm-mon-dot"></span>ParaMind monitor</span>' +
      '<span class="pm-mon-mid"><span id="pmClock">--:--:--</span>' +
      '<button type="button" class="pm-sound-btn" id="pmSound" aria-label="Toggle monitor sound"><i class="bi bi-volume-mute"></i> Sound</button></span></div>' +
      '<div class="pm-mon-body">' +
        '<div class="pm-mon-waves">' +
          '<div class="pm-wave"><span class="pm-wave-label" style="color:#38e06a">ECG</span><canvas id="pmEcg"></canvas></div>' +
          '<div class="pm-wave"><span class="pm-wave-label" style="color:#37d6e6">Pleth (SpO2)</span><canvas id="pmPleth"></canvas></div>' +
        '</div>' +
        '<div class="pm-mon-nums">' +
          '<div class="pm-vital pm-hr-c"><span class="pm-v-label">HR</span><span><span class="pm-v-num" id="pmHR">78</span><span class="pm-v-unit">bpm</span></span></div>' +
          '<div class="pm-vital pm-spo2-c"><span class="pm-v-label">SpO2</span><span><span class="pm-v-num" id="pmSpO2">98</span><span class="pm-v-unit">%</span></span></div>' +
          '<div class="pm-vital pm-nibp-c"><span class="pm-v-label" id="pmNIBPlabel">NIBP</span><span><span class="pm-v-num" id="pmNIBP">118/79</span> <span class="pm-v-sub" id="pmNIBPmean">(92)</span></span></div>' +
        '</div>' +
      '</div></div>';
  }

  function startMonitor(root) {
    var ecg = root.querySelector('#pmEcg'), pleth = root.querySelector('#pmPleth');
    if (!ecg || !pleth) return;
    var hrEl = root.querySelector('#pmHR'), spo2El = root.querySelector('#pmSpO2'),
        nibpEl = root.querySelector('#pmNIBP'), nibpMean = root.querySelector('#pmNIBPmean'),
        nibpLabel = root.querySelector('#pmNIBPlabel'), clock = root.querySelector('#pmClock'),
        soundBtn = root.querySelector('#pmSound');

    function fit(c) {
      var dpr = window.devicePixelRatio || 1;
      var w = c.clientWidth || 300, h = c.clientHeight || 74;
      c.width = w * dpr; c.height = h * dpr;
      var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { c: c, ctx: ctx, w: w, h: h, lastX: null, lastY: null };
    }
    var E = fit(ecg), P = fit(pleth);
    window.addEventListener('resize', function () {
      var ne = fit(ecg), np = fit(pleth);
      E.w = ne.w; E.h = ne.h; E.lastX = null; P.w = np.w; P.h = np.h; P.lastX = null;
    });

    var audioOn = false, actx = null;
    soundBtn.addEventListener('click', function () {
      audioOn = !audioOn;
      soundBtn.classList.toggle('on', audioOn);
      soundBtn.innerHTML = (audioOn ? '<i class="bi bi-volume-up"></i>' : '<i class="bi bi-volume-mute"></i>') + ' Sound';
      if (audioOn) {
        try {
          actx = actx || new (window.AudioContext || window.webkitAudioContext)();
          if (actx.state === 'suspended') actx.resume();
          beep();
        } catch (e) {}
      }
    });
    function beep() {
      if (!audioOn || !actx || document.hidden) return;
      try {
        var o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime;
        o.type = 'sine'; o.frequency.value = 880;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.1, t + 0.005);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
        o.connect(g); g.connect(actx.destination);
        o.start(t); o.stop(t + 0.1);
      } catch (e) {}
    }

    var hr = 78, spo2 = 98, t0 = performance.now(), lastPhase = 0, pxPerSec = 130;

    function ecgY(p) {
      return 0.08 * Math.exp(-Math.pow((p - 0.13) / 0.02, 2))
        - 0.12 * Math.exp(-Math.pow((p - 0.185) / 0.008, 2))
        + 1.0 * Math.exp(-Math.pow((p - 0.205) / 0.008, 2))
        - 0.22 * Math.exp(-Math.pow((p - 0.235) / 0.01, 2))
        + 0.18 * Math.exp(-Math.pow((p - 0.37) / 0.035, 2));
    }
    function plethY(p) {
      var q = (p + 0.82) % 1;
      return 0.62 * Math.exp(-Math.pow((q - 0.28) / 0.12, 2)) + 0.22 * Math.exp(-Math.pow((q - 0.6) / 0.14, 2));
    }
    function step(C, fn, color, amp, dt) {
      var ctx = C.ctx, w = C.w, h = C.h, mid = h * 0.6, beatT = 60 / hr;
      var phase = ((performance.now() - t0) / 1000 % beatT) / beatT;
      var y = mid - fn(phase) * h * amp;
      var nx = (C.lastX == null ? 0 : C.lastX) + pxPerSec * dt;
      if (nx >= w) { nx = 0; C.lastX = null; C.lastY = null; }
      ctx.clearRect(nx, 0, 16, h);
      if (C.lastX != null) {
        ctx.strokeStyle = color; ctx.lineWidth = 1.7; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(C.lastX, C.lastY); ctx.lineTo(nx, y); ctx.stroke();
      }
      C.lastX = nx; C.lastY = y;
    }

    var last = performance.now();
    function frame(now) {
      var dt = Math.min((now - last) / 1000, 0.05); last = now;
      var beatT = 60 / hr, phase = ((now - t0) / 1000 % beatT) / beatT;
      if (lastPhase < 0.205 && phase >= 0.205) {
        beep();
        hrEl.classList.add('pm-beat');
        setTimeout(function () { hrEl.classList.remove('pm-beat'); }, 120);
      }
      lastPhase = phase;
      step(E, ecgY, '#38e06a', 0.42, dt);
      step(P, plethY, '#37d6e6', 0.5, dt);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    setInterval(function () {
      hr += (Math.random() < 0.5 ? -1 : 1) * (Math.random() < 0.4 ? 2 : 1);
      hr = Math.max(72, Math.min(86, hr));
      spo2 = Math.max(96, Math.min(99, spo2 + (Math.random() < 0.5 ? -1 : 1)));
      hrEl.textContent = hr; spo2El.textContent = spo2;
    }, 3500);

    function nibpReading() {
      var sys = 110 + Math.floor(Math.random() * 16), dia = 70 + Math.floor(Math.random() * 14);
      return { sys: sys, dia: dia, mean: Math.round(dia + (sys - dia) / 3) };
    }
    function cycleNibp() {
      nibpLabel.textContent = 'NIBP \u25b2';
      nibpEl.classList.add('pm-inflating');
      var p = 90, target = 150 + Math.floor(Math.random() * 50);
      var inf = setInterval(function () {
        p += 14; nibpEl.textContent = p; nibpMean.textContent = 'mmHg';
        if (p >= target) {
          clearInterval(inf);
          setTimeout(function () {
            var r = nibpReading();
            nibpEl.classList.remove('pm-inflating');
            nibpEl.textContent = r.sys + '/' + r.dia;
            nibpMean.textContent = '(' + r.mean + ')';
            nibpLabel.textContent = 'NIBP';
          }, 900);
        }
      }, 220);
    }
    setInterval(cycleNibp, 24000);

    function tick() {
      var d = new Date(), pad = function (n) { return (n < 10 ? '0' : '') + n; };
      clock.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    }
    tick(); setInterval(tick, 1000);
  }

  /* ---------- YEAR PAGE ---------- */
  function renderYear(root) {
    var year = parseInt(root.getAttribute('data-year'), 10) || 1;
    var list = forYear(year);
    var advice = (window.PLACEMENT_ADVICE && window.PLACEMENT_ADVICE[year]) || [];

    var adviceCards = advice.map(function (a, i) {
      var title = (typeof a === 'string') ? a : (a.title || '');
      var body = (a && typeof a === 'object' && a.body) ? a.body : null;
      if (!body) {
        return '<div class="pm-advice-card"><span>' + esc(title) + '</span>' +
          '<span class="pm-tag is-none">Coming soon</span></div>';
      }
      var paras = (Array.isArray(body) ? body : [body]).map(function (p) {
        return '<p>' + esc(p) + '</p>';
      }).join('');
      var bid = 'adv-' + year + '-' + i;
      return '<div class="pm-advice-card is-expandable">' +
        '<button type="button" class="pm-advice-head" aria-expanded="false" aria-controls="' + bid + '">' +
          '<span>' + esc(title) + '</span>' +
          '<i class="bi bi-chevron-down pm-advice-chev" aria-hidden="true"></i>' +
        '</button>' +
        '<div class="pm-advice-body" id="' + bid + '" hidden>' + paras + '</div>' +
      '</div>';
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
      monitorHtml() +
      '<h2 class="pm-section-title">On placement \u2014 what the uni doesn\u2019t tell you</h2>' +
      '<p class="pm-sub">Honest advice on your shifts and how to cope.</p>' +
      '<div class="pm-advice-grid">' + adviceCards + '</div>' +
      revisitHtml +
      '<h2 class="pm-section-title">Frameworks for ' + (window.PLACEMENT_YEARS[year] ? window.PLACEMENT_YEARS[year].label.toLowerCase() : 'this year') + '</h2>' +
      '<p class="pm-sub">' + summary + '</p>' +
      '<div class="pm-fw-list">' + list.map(fwRow).join('') + '</div>';

    startMonitor(root);
    attachAdviceToggles(root);
  }

  function attachAdviceToggles(root) {
    var heads = root.querySelectorAll('.pm-advice-card.is-expandable .pm-advice-head');
    heads.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = btn.parentNode;
        var body = card.querySelector('.pm-advice-body');
        var open = card.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (body) { body.hidden = !open; }
      });
    });
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
        '<button type="button" class="pm-btn" id="pmReveal"><i class="bi bi-eye"></i> Reveal</button>' +
        '<div class="pm-reveal-box pm-hidden" id="pmRevealBox"><p>' + esc(f.onSceneReveal) + '</p></div>' },
      { name: 'Try it', body:
        '<p class="pm-onscene-label"><i class="bi bi-lightbulb"></i> Try it</p>' +
        '<p>' + esc(f.tryItScenario) + '</p>' +
        '<p class="pm-sub">' + esc(f.tryItQuestions) + '</p>' +
        '<button type="button" class="pm-btn pm-nudge-btn" id="pmNudgeBtn"><i class="bi bi-lightbulb"></i> Stuck? Get a nudge</button>' +
        '<div class="pm-hollie pm-hidden" id="pmNudge"><span class="pm-hollie-av">H</span><div class="pm-hollie-bubble">' +
        '<p class="pm-sub">Hollie \u00b7 a nudge to get you started</p><p>' + esc(f.hollieSample) + '</p></div></div>' +
        '<textarea class="pm-textarea" id="pmReflect" placeholder="Type your thinking here\u2026"></textarea>' +
        '<button type="button" class="pm-btn pm-btn-primary" id="pmHollieBtn"><i class="bi bi-chat-dots"></i> Ask Hollie</button>' +
        '<div class="pm-hollie pm-hidden" id="pmHollie"><span class="pm-hollie-av">H</span><div class="pm-hollie-bubble">' +
        '<p class="pm-sub" id="pmHollieLabel">Hollie</p><div id="pmHollieText"></div></div></div>' },
      { name: 'The point', body:
        (f.wrapPoint ? '<p class="pm-onscene-label"><i class="bi bi-flag"></i> The point</p><p>' + esc(f.wrapPoint) + '</p>' : '') +
        (f.takeaways && f.takeaways.length ? '<p class="pm-onscene-label"><i class="bi bi-check2-circle"></i> Key takeaways</p><ul class="pm-takeaways">' + f.takeaways.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' : '') +
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
    next.addEventListener('click', function () {
      if (step < steps.length - 1) { step++; render(); return; }
      var c = root.querySelector('#pmConf');
      if (c) setConf(f.id, parseInt(c.value, 10));
      window.location.href = 'placement-year-' + f.year + '.html';
    });

    var reveal = root.querySelector('#pmReveal');
    if (reveal) reveal.addEventListener('click', function () {
      root.querySelector('#pmRevealBox').classList.remove('pm-hidden');
      reveal.style.display = 'none';
    });
    var nudge = root.querySelector('#pmNudgeBtn');
    if (nudge) nudge.addEventListener('click', function () {
      root.querySelector('#pmNudge').classList.remove('pm-hidden');
      nudge.style.display = 'none';
    });
    var hb = root.querySelector('#pmHollieBtn');
    if (hb) hb.addEventListener('click', function () { askHollie(root, f); });

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

  /* ---------- live Hollie coaching ---------- */
  function chatEndpoint() {
    try {
      if (window.paramind && window.paramind.CONFIG && window.paramind.CONFIG.api) {
        return window.paramind.CONFIG.api.baseUrl + window.paramind.CONFIG.api.chat;
      }
    } catch (e) {}
    return 'https://europe-west2-paramind-64b8e.cloudfunctions.net/chat';
  }

  function askHollie(root, f) {
    var btn = root.querySelector('#pmHollieBtn');
    var wrap = root.querySelector('#pmHollie');
    var out = root.querySelector('#pmHollieText');
    var ta = root.querySelector('#pmReflect');
    var reflection = (ta && ta.value ? ta.value : '').trim();
    wrap.classList.remove('pm-hidden');

    if (reflection.length < 3) {
      out.innerHTML = '<p>Jot down your thinking first \u2014 even a sentence \u2014 and I\u2019ll give you feedback on it.</p>';
      if (ta) ta.focus();
      return;
    }
    if (typeof firebase === 'undefined' || !firebase.auth || !firebase.auth().currentUser) {
      out.innerHTML = '<p>Sign in and I can give you feedback on your answer. ' +
        '<a href="' + LOGIN_PAGE + '?redirect=' + encodeURIComponent(window.location.href) + '">Sign in</a></p>';
      return;
    }

    var original = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="bi bi-three-dots"></i> Hollie is thinking\u2026';
    out.innerHTML = '';

    var addendum = 'You are Hollie, coaching a student paramedic through the clinical REASONING framework "' + f.title +
      '". They have written an answer to a practice scenario. Reply in one short, warm paragraph: name what they got right, ' +
      'gently surface what they have missed or could develop, and finish with one focused question that pushes their reasoning further. ' +
      'This is reasoning practice only \u2014 do not give treatment steps, drug names, doses, or calculations; coach the thinking, not the management.';
    var message = 'Framework: ' + f.title + '\n\nScenario:\n' + f.tryItScenario +
      '\n\nThe questions: ' + f.tryItQuestions +
      '\n\nMy answer:\n"' + reflection + '"\n\nPlease coach me on my thinking.';

    firebase.auth().currentUser.getIdToken().then(function (token) {
      return fetch(chatEndpoint(), {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message, conversationHistory: [], systemPromptAddendum: addendum })
      });
    }).then(function (resp) {
      if (!resp.ok) { throw new Error('HTTP ' + resp.status); }
      var reader = resp.body.getReader();
      var decoder = new TextDecoder();
      var buffer = '', acc = '';
      function done() { btn.disabled = false; btn.innerHTML = '<i class="bi bi-arrow-repeat"></i> Ask again'; }
      function pump() {
        return reader.read().then(function (r) {
          if (r.done) { done(); return; }
          buffer += decoder.decode(r.value, { stream: true });
          var lines = buffer.split('\n');
          buffer = lines.pop();
          lines.forEach(function (line) {
            if (line.indexOf('data: ') === 0) {
              try {
                var data = JSON.parse(line.slice(6));
                if (data.type === 'chunk' && data.content) {
                  acc += data.content;
                  out.innerHTML = '<p>' + esc(acc).replace(/\n/g, '<br>') + '</p>';
                } else if (data.type === 'error') {
                  out.innerHTML = '<p>Sorry, something went wrong. Please try again.</p>';
                }
              } catch (e) {}
            }
          });
          return pump();
        });
      }
      return pump();
    }).catch(function () {
      btn.disabled = false; btn.innerHTML = original;
      out.innerHTML = '<p>Sorry, I couldn\u2019t reach Hollie just now. Please try again in a moment.</p>';
    });
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
