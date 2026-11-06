/* ============================================================
   js/ecg-2027-data.js — shared lists for ecg-2027.html (the rhythm list)
   and ecg-2027-rhythm.html (the page for one rhythm).
   Rhythm names and colours come from js/ecg-rhythms.js; drawn 12-lead
   teaching notes come from data/ecg12/drawn.json.
   ============================================================ */

// The rhythms grouped into categories, in the order they are shown.
// An entry is a rhythm key, or { key, name, tagline } to show the same rhythm
// under a different name in that category (it still opens the same page).
var ECG2027_CATEGORIES = [
    { title: 'Sinus rhythms', icon: 'bi-heart-pulse',
      keys: ['normalSinus', 'sinusBradycardia', 'sinusTachycardia', 'sinusArrhythmia'] },
    { title: 'Atrial & junctional rhythms', icon: 'bi-lightning',
      keys: ['atrialFibrillation', 'atrialFlutter', 'svt', 'pacs', 'junctionalRhythm'] },
    { title: 'Heart blocks', icon: 'bi-sign-stop',
      keys: ['firstDegreeBlock', 'secondDegreeMobitz1', 'secondDegreeMobitz2', 'thirdDegreeBlock'] },
    { title: 'Bundle branch blocks & pre-excitation', icon: 'bi-diagram-2',
      keys: ['lbbb', 'rbbb', 'wpw'] },
    { title: 'Ventricular rhythms', icon: 'bi-activity',
      keys: ['pvcs', 'ventricularTachycardia', 'torsadesDePointes'] },
    { title: 'Cardiac arrest rhythms', icon: 'bi-exclamation-octagon',
      keys: ['ventricularFibrillation',
             { key: 'ventricularTachycardia', name: 'Pulseless VT', tagline: 'VT with no pulse' },
             'asystole', 'pea'] },
    { title: 'ST, T wave & QT changes', icon: 'bi-graph-up',
      keys: ['stemi', 'hyperkalaemia', 'longQT'] }
];

// One short line per rhythm for the list
var ECG2027_TAGLINES = {
    normalSinus: 'The reference: regular, a P wave before every QRS',
    sinusBradycardia: 'Sinus rhythm under 60',
    sinusTachycardia: 'Sinus rhythm over 100',
    sinusArrhythmia: 'Rate rises and falls with breathing',
    atrialFibrillation: 'Irregularly irregular, no P waves',
    atrialFlutter: 'Sawtooth flutter waves',
    svt: 'Fast, regular, narrow, no visible P waves',
    pacs: 'Early beats with a different P wave',
    junctionalRhythm: 'Inverted or absent P waves',
    firstDegreeBlock: 'Long, fixed PR interval',
    secondDegreeMobitz1: 'PR lengthens until a beat drops',
    secondDegreeMobitz2: 'Fixed PR, suddenly dropped beats',
    thirdDegreeBlock: 'P waves and QRS complexes unlinked',
    lbbb: 'Broad QRS, deep in V1, notched R in V6',
    rbbb: "Broad QRS, RSR' in V1",
    wpw: 'Short PR and a delta wave',
    pvcs: 'Early broad beats with no P wave',
    ventricularTachycardia: 'Fast, regular, broad complexes',
    torsadesDePointes: 'Polymorphic VT that twists around the baseline',
    ventricularFibrillation: 'Chaotic, no organised complexes',
    asystole: 'No electrical activity',
    pea: 'Organised rhythm, no pulse',
    stemi: 'ST elevation in a territory',
    hyperkalaemia: 'Tall, peaked T waves',
    longQT: 'The T wave ends late'
};

// Real 12-lead examples for each rhythm (record ids in data/ecg12/library.json),
// copied from ecg-rhythm.html. A rhythm missing from this list has no real example.
var ECG2027_REAL_EXAMPLES = {
    normalSinus: ['10', '57', '62', '79', '94'],
    sinusBradycardia: ['611', '1166'],
    sinusTachycardia: ['892', '1628'],
    sinusArrhythmia: ['122', '228'],
    atrialFibrillation: ['866', '2078', '4117'],
    atrialFlutter: ['20', '23'],
    svt: ['1173', '7796'],
    firstDegreeBlock: ['3948', '6910', '7079'],
    wpw: ['4825', '6240'],
    pvcs: ['219', '818'],
    pacs: ['1084', '1184'],
    stemi: ['11944', '8075', '11948'],
    longQT: ['6515', '9894'],
    lbbb: ['598', '618', '798'],
    rbbb: ['1123', '3041', '3155'],
    thirdDegreeBlock: ['c21-Q3361'],
    ventricularFibrillation: ['c21-Q2497', 'c21-Q1285', 'c21-JS45453'],
    ventricularTachycardia: ['c21-Q1083', 'c21-JS45527', 'c21-JS45509']
};
