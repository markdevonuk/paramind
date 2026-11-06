"""
Paramind — drawn (synthetic) 12-lead ECG generator.

Writes records in the same format as the real PTB-XL records, so the existing
viewer (js/ecg12-viewer.js) shows them unchanged:
    data/ecg12/records/<id>.json -> {"fs": 250, "leads": {"I": [...], "II": [...], "V1".."V6": [...]}}
Only I, II and V1-V6 are stored; the viewer works out III, aVR, aVL and aVF
itself, so the limb leads always agree with each other.

A record is built from:
  * P waves   - a list of (time, P shape)          (so P waves can run independently)
  * complexes - a list of (time, QRST shape, timing) (time = start of the QRS)
  * an optional continuous signal (AF baseline, flutter waves, VF, torsades)
Amplitudes are in millivolts (1 small square = 0.1 mV); times in seconds.

One file per rhythm in js/ecg-rhythms.js:  data/ecg12/records/syn-<rhythmKey>.json

Run from the repo root:  python3 tools/ecg-synth/generate.py
"""
import json, math, os, random

FS = 250
DUR = 10.0
N = int(FS * DUR)
LEADS = ['I', 'II', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6']


# ------------------------------------------------------------------ wave shapes
def bump(t, c, w, a):
    return a * math.exp(-0.5 * ((t - c) / w) ** 2)


def skew_bump(t, c, rise, fall, a):
    w = rise if t < c else fall
    return a * math.exp(-0.5 * ((t - c) / w) ** 2)


def sig(x, k):
    x = max(-60.0, min(60.0, x / k))
    return 1.0 / (1.0 + math.exp(-x))


# P wave shapes: amplitude per stored lead
P_SINUS = {'I': 0.08, 'II': 0.13, 'V1': 0.05, 'V2': 0.07, 'V3': 0.08, 'V4': 0.08, 'V5': 0.08, 'V6': 0.07}
P_FLAT = {k: v * 0.3 for k, v in P_SINUS.items()}                       # hyperkalaemia
P_RETRO = {'I': 0.02, 'II': -0.13, 'V1': 0.03, 'V2': 0.0, 'V3': -0.03, 'V4': -0.04, 'V5': -0.05, 'V6': -0.05}  # junctional
P_ECTOPIC = {'I': 0.05, 'II': -0.10, 'V1': 0.08, 'V2': 0.05, 'V3': 0.0, 'V4': -0.03, 'V5': -0.04, 'V6': -0.04}  # PAC


def qrs_value(t, m, tm):
    v = 0.0
    for c, w, a in m['QRS']:
        v += bump(t, c, w, a)
    st = m.get('ST', 0.0)
    if st:
        v += st * sig(t - tm['j'], 0.006) * (1 - sig(t - (tm['tend'] - 0.04), 0.03))
    v += skew_bump(t, tm['tpeak'], m.get('Trise', 0.055), m.get('Tfall', 0.04), m['T'])
    return v


LAST_MARKS = {}   # where the waves are in the last record built (for the page's highlights)


def build(pwaves, complexes, extra=None, noise=0.006, seed=1):
    random.seed(seed)
    LAST_MARKS.clear()
    LAST_MARKS['p'] = [[round(pt, 3), 'e' if pm is P_ECTOPIC else 'r' if pm is P_RETRO else 's'] for pt, pm in pwaves]
    LAST_MARKS['c'] = [[round(qt, 3), round(tm['j'], 3), round(tm['tend'], 3), 'v' if m in (PVC, VT, ESCAPE) else 'n'] for qt, m, tm in complexes]
    out = {L: [0.0] * N for L in LEADS}
    for pt, pm in pwaves:                       # pt = P onset
        lo, hi = max(0, int((pt - 0.05) * FS)), min(N, int((pt + 0.16) * FS))
        for i in range(lo, hi):
            t = i / FS - pt
            for L in LEADS:
                out[L][i] += bump(t, 0.05, 0.022, pm[L])
    for qt, m, tm in complexes:                 # qt = QRS onset
        lo, hi = max(0, int((qt - 0.1) * FS)), min(N, int((qt + 0.8) * FS))
        for i in range(lo, hi):
            t = i / FS - qt
            for L in LEADS:
                out[L][i] += qrs_value(t, m[L], tm)
    if extra:
        for L in LEADS:
            for i in range(N):
                out[L][i] += extra(L, i / FS)
    for L in LEADS:
        out[L] = [round(x + random.gauss(0, noise), 3) for x in out[L]]
    # R peak of each complex: the biggest deflection in lead II inside the QRS
    for c in LAST_MARKS['c']:
        i0, i1 = int(c[0] * FS), min(N, int((c[0] + c[1]) * FS))
        seg = out['II'][i0:i1] or [0]
        k = max(range(len(seg)), key=lambda i: abs(seg[i]))
        c.append(round((i0 + k) / FS, 3))
    return {'fs': FS, 'leads': out}


def timing(j=0.09, tpeak=0.29, tend=0.40):
    return {'j': j, 'tpeak': tpeak, 'tend': tend}


def regular(rate, start=0.35):
    rr, ts, t = 60.0 / rate, [], start
    while t < DUR - 0.25:
        ts.append(t)
        t += rr
    return ts


def conducted(qrs_times, morph, tm, pr=0.16, pm=P_SINUS):
    """Sinus-style beats: a P wave then the QRS after the PR interval."""
    return [(t - pr, pm) for t in qrs_times], [(t, morph, tm) for t in qrs_times]


# ------------------------------------------------------------------ QRST shapes
# QRS components are (centre s, width s, amplitude mV) from the start of the QRS.
NORMAL = {
    'I':  {'QRS': [(0.012, 0.007, -0.05), (0.040, 0.011, 0.75), (0.068, 0.009, -0.10)], 'T': 0.20},
    'II': {'QRS': [(0.012, 0.007, -0.05), (0.040, 0.011, 1.15), (0.068, 0.009, -0.20)], 'T': 0.30},
    'V1': {'QRS': [(0.020, 0.008, 0.20), (0.052, 0.013, -1.00)], 'T': 0.06},
    'V2': {'QRS': [(0.022, 0.009, 0.40), (0.055, 0.013, -1.35)], 'T': 0.35},
    'V3': {'QRS': [(0.030, 0.011, 0.85), (0.062, 0.011, -0.85)], 'T': 0.40},
    'V4': {'QRS': [(0.012, 0.006, -0.05), (0.038, 0.011, 1.45), (0.068, 0.009, -0.40)], 'T': 0.40},
    'V5': {'QRS': [(0.012, 0.006, -0.08), (0.040, 0.011, 1.50), (0.068, 0.009, -0.20)], 'T': 0.32},
    'V6': {'QRS': [(0.012, 0.006, -0.08), (0.040, 0.011, 1.20), (0.068, 0.009, -0.10)], 'T': 0.25},
}


def scaled_T(m, k, **extra):
    return {L: dict(v, T=v['T'] * k, **extra) for L, v in m.items()}


LBBB = {
    'I':  {'QRS': [(0.056, 0.027, 0.70), (0.114, 0.025, 0.72)], 'ST': -0.08, 'T': -0.22},
    'II': {'QRS': [(0.056, 0.027, 0.45), (0.114, 0.025, 0.40)], 'ST': -0.03, 'T': -0.06},
    'V1': {'QRS': [(0.015, 0.008, 0.10), (0.078, 0.034, -1.50)], 'ST': 0.18, 'T': 0.30},
    'V2': {'QRS': [(0.015, 0.008, 0.15), (0.078, 0.036, -2.00)], 'ST': 0.26, 'T': 0.42},
    'V3': {'QRS': [(0.020, 0.010, 0.25), (0.082, 0.036, -1.60)], 'ST': 0.20, 'T': 0.35},
    'V4': {'QRS': [(0.045, 0.024, 0.55), (0.110, 0.026, -0.80)], 'ST': 0.06, 'T': 0.12},
    'V5': {'QRS': [(0.056, 0.027, 1.00), (0.116, 0.025, 1.05)], 'ST': -0.12, 'T': -0.30},
    'V6': {'QRS': [(0.056, 0.027, 0.85), (0.116, 0.025, 0.90)], 'ST': -0.10, 'T': -0.28},
}

# Right bundle branch block: QRS about 0.14 s. rSR' in V1-V2, broad slurred S in
# I, V5-V6, T inverted in V1-V2.
RBBB = {
    'I':  {'QRS': [(0.012, 0.007, -0.04), (0.038, 0.011, 0.70), (0.100, 0.024, -0.30)], 'T': 0.20},
    'II': {'QRS': [(0.012, 0.007, -0.04), (0.040, 0.011, 1.00), (0.100, 0.024, -0.22)], 'T': 0.25},
    'V1': {'QRS': [(0.020, 0.009, 0.30), (0.052, 0.012, -0.45), (0.100, 0.020, 0.85)], 'ST': -0.05, 'T': -0.25},
    'V2': {'QRS': [(0.022, 0.009, 0.35), (0.055, 0.012, -0.70), (0.105, 0.020, 0.55)], 'ST': -0.03, 'T': -0.12},
    'V3': {'QRS': [(0.030, 0.011, 0.70), (0.065, 0.013, -0.60), (0.110, 0.020, 0.20)], 'T': 0.20},
    'V4': {'QRS': [(0.036, 0.011, 1.20), (0.095, 0.024, -0.45)], 'T': 0.30},
    'V5': {'QRS': [(0.012, 0.006, -0.08), (0.040, 0.011, 1.30), (0.098, 0.024, -0.38)], 'T': 0.30},
    'V6': {'QRS': [(0.012, 0.006, -0.08), (0.040, 0.011, 1.10), (0.098, 0.024, -0.32)], 'T': 0.25},
}

# Inferior STEMI: ST elevation II, III, aVF (III > II), reciprocal depression aVL, I.
STEMI_INF = {
    'I':  {'QRS': [(0.012, 0.007, -0.03), (0.040, 0.011, 0.45), (0.068, 0.009, -0.12)], 'ST': -0.10, 'T': -0.06, 'Trise': 0.07},
    'II': {'QRS': [(0.014, 0.008, -0.14), (0.042, 0.011, 1.00), (0.066, 0.009, -0.10)], 'ST': 0.25, 'T': 0.30, 'Trise': 0.08},
    'V1': {'QRS': [(0.020, 0.008, 0.20), (0.052, 0.013, -1.00)], 'T': 0.06},
    'V2': {'QRS': [(0.022, 0.009, 0.40), (0.055, 0.013, -1.30)], 'T': 0.30},
    'V3': {'QRS': [(0.030, 0.011, 0.80), (0.062, 0.011, -0.80)], 'T': 0.35},
    'V4': {'QRS': [(0.012, 0.006, -0.05), (0.038, 0.011, 1.35), (0.068, 0.009, -0.35)], 'T': 0.35},
    'V5': {'QRS': [(0.012, 0.006, -0.08), (0.040, 0.011, 1.40), (0.068, 0.009, -0.20)], 'T': 0.30},
    'V6': {'QRS': [(0.012, 0.006, -0.08), (0.040, 0.011, 1.10), (0.068, 0.009, -0.10)], 'T': 0.25},
}

# WPW: delta wave (slow first part of the QRS), QRS about 0.12 s, used with a short PR.
WPW = {
    'I':  {'QRS': [(0.028, 0.022, 0.32), (0.068, 0.012, 0.65), (0.095, 0.009, -0.08)], 'T': 0.15},
    'II': {'QRS': [(0.028, 0.022, 0.45), (0.068, 0.012, 0.90), (0.095, 0.009, -0.12)], 'T': 0.22},
    'V1': {'QRS': [(0.025, 0.020, 0.15), (0.060, 0.013, 0.30), (0.088, 0.013, -0.90)], 'T': 0.05},
    'V2': {'QRS': [(0.025, 0.020, 0.25), (0.062, 0.013, 0.50), (0.090, 0.013, -1.10)], 'T': 0.25},
    'V3': {'QRS': [(0.028, 0.022, 0.38), (0.066, 0.012, 0.90), (0.095, 0.011, -0.70)], 'T': 0.30},
    'V4': {'QRS': [(0.028, 0.022, 0.50), (0.068, 0.012, 1.30), (0.097, 0.009, -0.30)], 'T': 0.30},
    'V5': {'QRS': [(0.028, 0.022, 0.50), (0.068, 0.012, 1.35), (0.097, 0.009, -0.15)], 'T': 0.25},
    'V6': {'QRS': [(0.028, 0.022, 0.45), (0.068, 0.012, 1.10), (0.097, 0.009, -0.08)], 'T': 0.20},
}

# Hyperkalaemia: tall, narrow, peaked T waves; QRS slightly broad.
HYPERK = {
    'I':  {'QRS': [(0.015, 0.009, -0.05), (0.050, 0.015, 0.70), (0.088, 0.013, -0.15)], 'T': 0.45},
    'II': {'QRS': [(0.015, 0.009, -0.05), (0.050, 0.015, 1.05), (0.088, 0.013, -0.22)], 'T': 0.65},
    'V1': {'QRS': [(0.025, 0.011, 0.20), (0.068, 0.017, -1.00)], 'T': 0.40},
    'V2': {'QRS': [(0.027, 0.012, 0.40), (0.070, 0.017, -1.30)], 'T': 1.05},
    'V3': {'QRS': [(0.036, 0.014, 0.80), (0.078, 0.015, -0.80)], 'T': 1.15},
    'V4': {'QRS': [(0.015, 0.008, -0.05), (0.048, 0.015, 1.35), (0.088, 0.013, -0.40)], 'T': 1.00},
    'V5': {'QRS': [(0.015, 0.008, -0.08), (0.050, 0.015, 1.40), (0.088, 0.013, -0.20)], 'T': 0.80},
    'V6': {'QRS': [(0.015, 0.008, -0.08), (0.050, 0.015, 1.15), (0.088, 0.013, -0.10)], 'T': 0.60},
}
for v in HYPERK.values():
    v['Trise'] = 0.034
    v['Tfall'] = 0.030

# Ventricular ectopic (PVC): broad, upright in the inferior and lateral chest leads,
# negative in V1-V2; T wave opposite to the QRS.
PVC = {
    'I':  {'QRS': [(0.070, 0.035, 0.45)], 'ST': -0.08, 'T': -0.20},
    'II': {'QRS': [(0.070, 0.035, 1.30)], 'ST': -0.15, 'T': -0.45},
    'V1': {'QRS': [(0.070, 0.035, -1.30)], 'ST': 0.12, 'T': 0.40},
    'V2': {'QRS': [(0.070, 0.035, -1.20)], 'ST': 0.12, 'T': 0.40},
    'V3': {'QRS': [(0.050, 0.025, 0.40), (0.105, 0.025, -0.50)], 'T': 0.10},
    'V4': {'QRS': [(0.070, 0.035, 1.00)], 'ST': -0.08, 'T': -0.30},
    'V5': {'QRS': [(0.070, 0.035, 1.30)], 'ST': -0.10, 'T': -0.40},
    'V6': {'QRS': [(0.070, 0.035, 1.10)], 'ST': -0.10, 'T': -0.35},
}

# Monomorphic VT: broad, all chest leads negative (concordance), aVR upright.
VT = {
    'I':  {'QRS': [(0.035, 0.018, -0.15), (0.090, 0.028, -0.30)], 'T': 0.12},
    'II': {'QRS': [(0.035, 0.018, -0.45), (0.090, 0.028, -0.95)], 'T': 0.40},
    'V1': {'QRS': [(0.035, 0.018, -0.50), (0.090, 0.028, -1.10)], 'T': 0.40},
    'V2': {'QRS': [(0.035, 0.018, -0.65), (0.090, 0.028, -1.45)], 'T': 0.50},
    'V3': {'QRS': [(0.035, 0.018, -0.60), (0.090, 0.028, -1.35)], 'T': 0.45},
    'V4': {'QRS': [(0.035, 0.018, -0.50), (0.090, 0.028, -1.15)], 'T': 0.40},
    'V5': {'QRS': [(0.035, 0.018, -0.40), (0.090, 0.028, -0.90)], 'T': 0.32},
    'V6': {'QRS': [(0.035, 0.018, -0.30), (0.090, 0.028, -0.70)], 'T': 0.25},
}
for v in VT.values():
    v['Trise'] = 0.035
    v['Tfall'] = 0.032
# Broad ventricular escape (complete heart block)
ESCAPE = {
    'I':  {'QRS': [(0.020, 0.010, -0.10), (0.065, 0.026, 0.70)], 'ST': -0.05, 'T': -0.20},
    'II': {'QRS': [(0.020, 0.010, -0.10), (0.065, 0.026, 0.80)], 'ST': -0.05, 'T': -0.20},
    'V1': {'QRS': [(0.020, 0.010, 0.15), (0.068, 0.028, -1.10)], 'ST': 0.08, 'T': 0.30},
    'V2': {'QRS': [(0.020, 0.010, 0.20), (0.068, 0.028, -1.30)], 'ST': 0.10, 'T': 0.35},
    'V3': {'QRS': [(0.030, 0.015, 0.40), (0.075, 0.025, -0.80)], 'T': 0.20},
    'V4': {'QRS': [(0.065, 0.026, 0.90)], 'ST': -0.05, 'T': -0.15},
    'V5': {'QRS': [(0.065, 0.026, 1.10)], 'ST': -0.05, 'T': -0.25},
    'V6': {'QRS': [(0.065, 0.026, 0.95)], 'ST': -0.05, 'T': -0.25},
}

T_NORMAL = timing()
T_FAST = timing(j=0.085, tpeak=0.22, tend=0.30)          # rates above about 110
T_LBBB = timing(j=0.15, tpeak=0.34, tend=0.46)
T_RBBB = timing(j=0.13, tpeak=0.31, tend=0.42)
T_BROAD = timing(j=0.16, tpeak=0.36, tend=0.48)
T_WPW = timing(j=0.12, tpeak=0.31, tend=0.42)


# ------------------------------------------------------------------ continuous signals
def rng_sines(seed, n, flo, fhi):
    r = random.Random(seed)
    return [(r.uniform(flo, fhi), r.uniform(0, 2 * math.pi), r.uniform(0.6, 1.0)) for _ in range(n)]


AF_SRC = rng_sines(11, 8, 5.0, 9.5)
AF_GAIN = {'I': 0.03, 'II': 0.07, 'V1': 0.14, 'V2': 0.10, 'V3': 0.06, 'V4': 0.04, 'V5': 0.03, 'V6': 0.025}


def af_wave(L, t):
    return AF_GAIN[L] * sum(a * math.sin(2 * math.pi * f * t + p) for f, p, a in AF_SRC) / 2.2


FLUTTER_GAIN = {'I': 0.03, 'II': -0.40, 'V1': 0.22, 'V2': 0.06, 'V3': 0.0, 'V4': -0.03, 'V5': -0.05, 'V6': -0.06}


def flutter_wave(L, t):
    """Sawtooth at 300 a minute: a slow slope one way, a quicker return."""
    p = (t / 0.2) % 1.0
    v = p / 0.7 if p < 0.7 else 1 - (p - 0.7) / 0.3
    return FLUTTER_GAIN[L] * (v - 0.5)


VF_SRC = [rng_sines(20 + k, 7, 2.5, 8.0) for k in range(3)]
VF_MIX = {'I': (0.30, -0.10, 0.15), 'II': (0.45, 0.20, -0.10), 'V1': (-0.20, 0.45, 0.20), 'V2': (-0.10, 0.55, 0.35),
          'V3': (0.20, 0.40, 0.45), 'V4': (0.35, 0.20, 0.45), 'V5': (0.40, 0.05, 0.35), 'V6': (0.35, -0.05, 0.25)}


def vf_wave(L, t):
    env = 0.6 + 0.4 * math.sin(2 * math.pi * 0.37 * t + 1.0) * math.sin(2 * math.pi * 0.11 * t + 0.4)
    src = [sum(a * math.sin(2 * math.pi * f * t + p) for f, p, a in s) / 2.4 for s in VF_SRC]
    return env * sum(g * x for g, x in zip(VF_MIX[L], src)) * 1.4


TDP_GAIN = {'I': 0.20, 'II': 1.0, 'V1': -0.75, 'V2': -1.0, 'V3': -0.6, 'V4': 0.85, 'V5': 1.0, 'V6': 0.8}


def tdp_wave(L, t):
    """Polymorphic VT about 220 a minute; the amplitude swells, shrinks through the
    baseline and flips polarity - the 'twisting'."""
    env = math.cos(math.pi * t / 1.6)                       # node every 1.6 s
    beat = math.sin(2 * math.pi * 3.7 * t) + 0.35 * math.sin(4 * math.pi * 3.7 * t + 0.6)
    return TDP_GAIN[L] * (0.04 + 1.15 * abs(env)) * (1 if env >= 0 else -1) * beat * 0.85


def asystole_wave(L, t):
    return 0.025 * math.sin(2 * math.pi * 0.17 * t + {'I': 0, 'II': 1, 'V1': 2}.get(L, 3))


# ------------------------------------------------------------------ the 25 rhythms
def rec_sinus(rate, morph=NORMAL, tm=T_NORMAL, pr=0.16, pm=P_SINUS):
    return build(*conducted(regular(rate), morph, tm, pr, pm))


def rec_sinus_arrhythmia():
    ts, t = [], 0.35
    while t < DUR - 0.25:
        ts.append(t)
        t += 0.86 + 0.16 * math.sin(2 * math.pi * t / 4.2)    # speeds up and slows with breathing
    return build(*conducted(ts, NORMAL, T_NORMAL))


def rec_af():
    r = random.Random(5)
    ts, t = [], 0.3
    while t < DUR - 0.25:
        ts.append(t)
        t += r.uniform(0.42, 0.95)
    return build([], [(x, NORMAL, T_NORMAL) for x in ts], extra=af_wave)


def rec_flutter():
    # flutter waves every 0.2 s; every second one conducted -> 150 a minute
    ts = [0.16 + 0.4 * k for k in range(25) if 0.16 + 0.4 * k < DUR - 0.25]
    return build([], [(x, scaled_T(NORMAL, 0.35), T_FAST) for x in ts], extra=flutter_wave)


def rec_svt():
    return build([], [(x, scaled_T(NORMAL, 0.75), T_FAST) for x in regular(180, 0.2)])


def rec_first_degree():
    return rec_sinus(70, pr=0.30)


def rec_mobitz1():
    pp, prs, pw, cx = 0.70, [0.18, 0.28, 0.36, None], [], []
    t, k = 0.15, 0
    while t < DUR - 0.2:
        pw.append((t, P_SINUS))
        pr = prs[k % 4]
        if pr is not None and t + pr < DUR - 0.25:
            cx.append((t + pr, NORMAL, T_NORMAL))
        t += pp
        k += 1
    return build(pw, cx)


def rec_mobitz2():
    pp, pw, cx = 0.75, [], []
    t, k = 0.15, 0
    while t < DUR - 0.2:
        pw.append((t, P_SINUS))
        if k % 3 != 2 and t + 0.18 < DUR - 0.25:          # every third P is not conducted
            cx.append((t + 0.18, NORMAL, T_NORMAL))
        t += pp
        k += 1
    return build(pw, cx)


def rec_chb():
    pw = [(0.1 + 0.75 * k, P_SINUS) for k in range(14) if 0.1 + 0.75 * k < DUR - 0.2]
    cx = [(0.55 + 1.65 * k, ESCAPE, T_BROAD) for k in range(6) if 0.55 + 1.65 * k < DUR - 0.25]
    return build(pw, cx)


def rec_junctional():
    return rec_sinus(50, pr=0.12, pm=P_RETRO)


def rec_wpw():
    return rec_sinus(80, morph=WPW, tm=T_WPW, pr=0.10)


def rec_pvcs():
    rr = 60 / 72.0
    sinus_ts = [0.35 + rr * k for k in range(12) if 0.35 + rr * k < DUR - 0.25]
    pw, cx = [], []
    for k, t in enumerate(sinus_ts):
        pw.append((t - 0.16, P_SINUS))                    # sinus P keeps marching
        if k in (2, 5, 8, 11):
            continue                                     # this sinus beat is not conducted
        cx.append((t, NORMAL, T_NORMAL))
        if k in (1, 4, 7, 10):
            cx.append((t + rr * 0.55, PVC, T_BROAD))     # early broad beat, no P
    return build(pw, cx)


def rec_pacs():
    rr = 60 / 75.0
    pw, cx, t, k = [], [], 0.35, 0
    while t < DUR - 0.25:
        early = k in (2, 5, 8, 11)
        pw.append((t - 0.16, P_ECTOPIC if early else P_SINUS))
        cx.append((t, NORMAL, T_NORMAL))
        nxt = rr * 0.7 if k in (1, 4, 7, 10) else rr             # the next beat comes early
        t += nxt
        k += 1
    return build(pw, cx)


def rec_vt():
    return build([], [(x, VT, timing(j=0.16, tpeak=0.26, tend=0.34)) for x in regular(160, 0.1)])


def rec_long_qt():
    m = {L: dict(v, Trise=0.09, Tfall=0.06) for L, v in NORMAL.items()}
    return rec_sinus(70, morph=m, tm=timing(j=0.09, tpeak=0.42, tend=0.54))


def rec_hyperk():
    return rec_sinus(70, morph=HYPERK, tm=timing(j=0.11, tpeak=0.27, tend=0.36), pr=0.20, pm=P_FLAT)


RECORDS = {
    'normalSinus':          lambda: rec_sinus(75),
    'sinusBradycardia':     lambda: rec_sinus(45),
    'sinusTachycardia':     lambda: rec_sinus(120, morph=scaled_T(NORMAL, 0.85), tm=T_FAST, pr=0.14),
    'sinusArrhythmia':      rec_sinus_arrhythmia,
    'atrialFibrillation':   rec_af,
    'atrialFlutter':        rec_flutter,
    'svt':                  rec_svt,
    'ventricularTachycardia': rec_vt,
    'torsadesDePointes':    lambda: build([], [], extra=tdp_wave),
    'ventricularFibrillation': lambda: build([], [], extra=vf_wave),
    'asystole':             lambda: build([], [], extra=asystole_wave, noise=0.008),
    'pea':                  lambda: rec_sinus(60),
    'firstDegreeBlock':     rec_first_degree,
    'secondDegreeMobitz1':  rec_mobitz1,
    'secondDegreeMobitz2':  rec_mobitz2,
    'thirdDegreeBlock':     rec_chb,
    'junctionalRhythm':     rec_junctional,
    'wpw':                  rec_wpw,
    'pvcs':                 rec_pvcs,
    'pacs':                 rec_pacs,
    'hyperkalaemia':        rec_hyperk,
    'stemi':                lambda: rec_sinus(80, morph=STEMI_INF, tm=timing(j=0.08, tpeak=0.25, tend=0.38)),
    'longQT':               rec_long_qt,
    'lbbb':                 lambda: rec_sinus(75, morph=LBBB, tm=T_LBBB, pr=0.17),
    'rbbb':                 lambda: rec_sinus(75, morph=RBBB, tm=T_RBBB),
}

MARKS, MINI = {}, {}

if __name__ == '__main__':
    import sys
    only = sys.argv[1:]
    os.makedirs('data/ecg12/records', exist_ok=True)
    for key, fn in RECORDS.items():
        if only and key not in only:
            continue
        rec = fn()
        with open(f'data/ecg12/records/syn-{key}.json', 'w') as f:
            json.dump(rec, f, separators=(',', ':'))
        marks = dict(LAST_MARKS)
        if key == 'atrialFlutter':
            marks['f'] = [round(0.2 * k + 0.14, 3) for k in range(50) if 0.2 * k + 0.14 < DUR]
        MARKS[key] = marks
        MINI[key] = [rec['leads']['II'][int(i * FS / 60)] for i in range(int(3.2 * 60))]
        print('wrote syn-' + key)
    # Highlight positions and list-card traces go into data/ecg12/drawn.json
    if not only:
        path = 'data/ecg12/drawn.json'
        lib = json.load(open(path))
        for key, entry in lib['rhythms'].items():
            entry['marks'] = MARKS[key]
            entry['mini'] = [round(v, 2) for v in MINI[key]]
        with open(path, 'w') as f:
            f.write(json.dumps(lib, indent=1, ensure_ascii=False))
        print('updated', path)
