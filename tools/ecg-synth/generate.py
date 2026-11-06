"""
Paramind — drawn (synthetic) 12-lead ECG generator.

Writes records in the same format as the real PTB-XL records, so the existing
viewer (js/ecg12-viewer.js) shows them unchanged:
    data/ecg12/records/<id>.json  ->  {"fs": 250, "leads": {"I": [...], "II": [...], "V1".."V6": [...]}}
Only I, II and V1-V6 are stored; the viewer works out III, aVR, aVL and aVF itself,
so the limb leads always agree with each other.

Each lead's beat is built from smooth bumps (P, Q, R, S, T) plus an ST level.
Amplitudes are in millivolts (1 small square = 0.1 mV), times in seconds
measured from the start of the QRS.

Run from the repo root:  python3 tools/ecg-synth/generate.py
"""
import json, math, os, random

FS = 250          # samples per second
DUR = 10.0        # seconds
LEADS = ['I', 'II', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6']


def bump(t, centre, width, amp):
    """Smooth bell-shaped wave."""
    return amp * math.exp(-0.5 * ((t - centre) / width) ** 2)


def skew_bump(t, centre, rise, fall, amp):
    """Bell shape with a slower rise than fall (how real T waves look)."""
    w = rise if t < centre else fall
    return amp * math.exp(-0.5 * ((t - centre) / w) ** 2)


def sig(x, k):
    return 1.0 / (1.0 + math.exp(-x / k))


def beat_value(t, m, timing):
    """Value of one lead at time t (seconds from QRS onset) for one beat."""
    v = 0.0
    # P wave (may be absent)
    if timing.get('p') is not None and 'P' in m:
        v += bump(t, -timing['p'] + 0.05, 0.022, m['P'])
    # QRS: any number of components [centre, width, amp]
    for c, w, a in m['QRS']:
        v += bump(t, c, w, a)
    # ST level: lifts from the J point, then fades out at the end of the T wave
    j, tend = timing['j'], timing['tend']
    st = m.get('ST', 0.0)
    if st:
        v += st * sig(t - j, 0.006) * (1 - sig(t - (tend - 0.04), 0.03))
    # T wave
    tc = timing['tpeak']
    v += skew_bump(t, tc, m.get('Trise', 0.055), m.get('Tfall', 0.04), m['T'])
    return v


def build(rhythm, morph, seed=1):
    random.seed(seed)
    n = int(FS * DUR)
    out = {L: [0.0] * n for L in LEADS}
    for onset, timing in rhythm:
        lo = max(0, int((onset - 0.35) * FS))
        hi = min(n, int((onset + 0.75) * FS))
        for i in range(lo, hi):
            t = i / FS - onset
            for L in LEADS:
                out[L][i] += beat_value(t, morph[L], timing)
    # a whisper of noise so it looks like a trace, not a diagram
    for L in LEADS:
        out[L] = [round(x + random.gauss(0, 0.006), 3) for x in out[L]]
    return {'fs': FS, 'leads': out}


def sinus(rate, pr=0.16, j=0.09, tpeak=0.29, tend=0.40, start=0.3):
    rr = 60.0 / rate
    beats, t = [], start
    while t < DUR - 0.2:
        beats.append((t, {'p': pr, 'j': j, 'tpeak': tpeak, 'tend': tend}))
        t += rr
    return beats


# ---------------------------------------------------------------- morphologies
# QRS components: (centre s, width s, amplitude mV)

NSR = {
    'I':  {'P': 0.08, 'QRS': [(0.012, 0.007, -0.05), (0.040, 0.011, 0.75), (0.068, 0.009, -0.10)], 'T': 0.20},
    'II': {'P': 0.13, 'QRS': [(0.012, 0.007, -0.05), (0.040, 0.011, 1.15), (0.068, 0.009, -0.20)], 'T': 0.30},
    'V1': {'P': 0.05, 'QRS': [(0.020, 0.008, 0.20), (0.052, 0.013, -1.00)], 'T': 0.06},
    'V2': {'P': 0.07, 'QRS': [(0.022, 0.009, 0.40), (0.055, 0.013, -1.35)], 'T': 0.35},
    'V3': {'P': 0.08, 'QRS': [(0.030, 0.011, 0.85), (0.062, 0.011, -0.85)], 'T': 0.40},
    'V4': {'P': 0.09, 'QRS': [(0.012, 0.006, -0.05), (0.038, 0.011, 1.45), (0.068, 0.009, -0.40)], 'T': 0.40},
    'V5': {'P': 0.09, 'QRS': [(0.012, 0.006, -0.08), (0.040, 0.011, 1.50), (0.068, 0.009, -0.20)], 'T': 0.32},
    'V6': {'P': 0.08, 'QRS': [(0.012, 0.006, -0.08), (0.040, 0.011, 1.20), (0.068, 0.009, -0.10)], 'T': 0.25},
}

# Left bundle branch block: QRS about 0.16 s. Broad notched R in I, aVL, V5-V6 with
# no septal q; deep broad S in V1-V3; ST/T pointing opposite to the main QRS.
LBBB = {
    'I':  {'P': 0.08, 'QRS': [(0.056, 0.027, 0.70), (0.114, 0.025, 0.72)], 'ST': -0.08, 'T': -0.22},
    'II': {'P': 0.12, 'QRS': [(0.056, 0.027, 0.45), (0.114, 0.025, 0.40)], 'ST': -0.03, 'T': -0.06},
    'V1': {'P': 0.05, 'QRS': [(0.015, 0.008, 0.10), (0.078, 0.034, -1.50)], 'ST': 0.18, 'T': 0.30},
    'V2': {'P': 0.07, 'QRS': [(0.015, 0.008, 0.15), (0.078, 0.036, -2.00)], 'ST': 0.26, 'T': 0.42},
    'V3': {'P': 0.08, 'QRS': [(0.020, 0.010, 0.25), (0.082, 0.036, -1.60)], 'ST': 0.20, 'T': 0.35},
    'V4': {'P': 0.08, 'QRS': [(0.045, 0.024, 0.55), (0.110, 0.026, -0.80)], 'ST': 0.06, 'T': 0.12},
    'V5': {'P': 0.08, 'QRS': [(0.056, 0.027, 1.00), (0.116, 0.025, 1.05)], 'ST': -0.12, 'T': -0.30},
    'V6': {'P': 0.07, 'QRS': [(0.056, 0.027, 0.85), (0.116, 0.025, 0.90)], 'ST': -0.10, 'T': -0.28},
}

# Inferior STEMI: ST elevation II, III, aVF (III > II), reciprocal ST depression in
# aVL and I. Small inferior q waves. Chest leads essentially normal.
STEMI_INF = {
    'I':  {'P': 0.07, 'QRS': [(0.012, 0.007, -0.03), (0.040, 0.011, 0.45), (0.068, 0.009, -0.12)], 'ST': -0.10, 'T': -0.06, 'Trise': 0.07},
    'II': {'P': 0.12, 'QRS': [(0.014, 0.008, -0.14), (0.042, 0.011, 1.00), (0.066, 0.009, -0.10)], 'ST': 0.25, 'T': 0.30, 'Trise': 0.08},
    'V1': {'P': 0.05, 'QRS': [(0.020, 0.008, 0.20), (0.052, 0.013, -1.00)], 'T': 0.06},
    'V2': {'P': 0.07, 'QRS': [(0.022, 0.009, 0.40), (0.055, 0.013, -1.30)], 'T': 0.30},
    'V3': {'P': 0.08, 'QRS': [(0.030, 0.011, 0.80), (0.062, 0.011, -0.80)], 'T': 0.35},
    'V4': {'P': 0.08, 'QRS': [(0.012, 0.006, -0.05), (0.038, 0.011, 1.35), (0.068, 0.009, -0.35)], 'T': 0.35},
    'V5': {'P': 0.08, 'QRS': [(0.012, 0.006, -0.08), (0.040, 0.011, 1.40), (0.068, 0.009, -0.20)], 'T': 0.30},
    'V6': {'P': 0.07, 'QRS': [(0.012, 0.006, -0.08), (0.040, 0.011, 1.10), (0.068, 0.009, -0.10)], 'T': 0.25},
}

RECORDS = {
    'syn-nsr':       (sinus(72), NSR),
    'syn-lbbb':      (sinus(75, pr=0.17, j=0.15, tpeak=0.34, tend=0.46), LBBB),
    'syn-stemi-inf': (sinus(80, j=0.08, tpeak=0.25, tend=0.38), STEMI_INF),
}

if __name__ == '__main__':
    os.makedirs('data/ecg12/records', exist_ok=True)
    for rid, (rhythm, morph) in RECORDS.items():
        rec = build(rhythm, morph)
        with open(f'data/ecg12/records/{rid}.json', 'w') as f:
            json.dump(rec, f, separators=(',', ':'))
        print('wrote', rid, len(rhythm), 'beats')
