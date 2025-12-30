/* ============================================
   PARAMIND - Scenario Data
   All scenarios in one place for easy management
   Updated with ECG findings, red flags, and HINT mode
   EXPANDED: Minimum 10 scenarios per category
   ============================================ */

// ==================== SCENARIO CATEGORIES ====================
// These define the main groupings shown to users

const SCENARIO_CATEGORIES = {
    cardiac: {
        id: "cardiac",
        title: "Cardiac",
        icon: "bi-heart-pulse",
        color: "#dc3545" // Red
    },
    respiratory: {
        id: "respiratory",
        title: "Respiratory",
        icon: "bi-lungs",
        color: "#17a2b8" // Cyan
    },
    abdominal: {
        id: "abdominal",
        title: "Abdominal",
        icon: "bi-bandaid",
        color: "#fd7e14" // Orange
    },
    neuro: {
        id: "neuro",
        title: "Neurological",
        icon: "bi-lightning-charge",
        color: "#6f42c1" // Purple
    },
    trauma: {
        id: "trauma",
        title: "Trauma",
        icon: "bi-exclamation-triangle",
        color: "#ffc107" // Yellow
    },
    paediatric: {
        id: "paediatric",
        title: "Paediatric",
        icon: "bi-emoji-smile",
        color: "#28a745" // Green
    },
    obstetric: {
        id: "obstetric",
        title: "Obstetric",
        icon: "bi-heart",
        color: "#e83e8c" // Pink
    },
    "mental-health": {
        id: "mental-health",
        title: "Mental Health",
        icon: "bi-chat-heart",
        color: "#20c997" // Teal
    }
};

// ==================== ALL SCENARIOS ====================
// Each scenario contains:
// - id: Unique identifier for tracking/CPD
// - category: Which category it belongs to
// - dispatch: What the user sees (like an MDT screen)
// - patient: Hidden data for the AI to use (includes ECG and redFlags)
// - starterMessage: The first thing the "patient" says

const SCENARIOS = [
    // ==================== CARDIAC (10 scenarios) ====================
    {
        id: "cardiac-001",
        category: "cardiac",
        dispatch: {
            name: "Edward",
            age: 65,
            gender: "M",
            chiefComplaint: "Chest pain",
            details: "Started within last hour, conscious and breathing",
            category: 2
        },
        patient: {
            condition: "ACS - STEMI",
            history: "Hypertension, Type 2 Diabetes, Ex-smoker",
            medications: "Ramipril, Metformin, Aspirin",
            vitals: {
                hr: 95,
                bp: "165/95",
                rr: 22,
                spo2: 96,
                temp: 36.8,
                gcs: 15,
                bm: 8.2,
                pain: 9
            },
            presentation: "Central crushing chest pain radiating to left arm and jaw, diaphoretic, nauseated",
            ecg: "Rate 95bpm, sinus rhythm. ST elevation V1-V4 (3-4mm) with reciprocal ST depression in leads II, III, aVF. Hyperacute T waves in V2-V3. Anterior STEMI pattern.",
            redFlags: [
                "Central crushing chest pain",
                "Radiation to arm/jaw",
                "Diaphoresis (sweating)",
                "Associated nausea",
                "Sudden onset at rest",
                "Cardiac risk factors (HTN, DM, ex-smoker)"
            ]
        },
        starterMessage: "Hello... I've called the ambulance because I've got this terrible pain in my chest. It started about 45 minutes ago. I was just sitting watching telly and it came on suddenly. It's really quite bad... I feel a bit sick too."
    },
    {
        id: "cardiac-002",
        category: "cardiac",
        dispatch: {
            name: "Margaret",
            age: 72,
            gender: "F",
            chiefComplaint: "Generally unwell",
            details: "Feeling sick, sweating, husband concerned",
            category: 2
        },
        patient: {
            condition: "Inferior STEMI - Atypical presentation",
            history: "Diabetes, previous MI 5 years ago",
            medications: "Insulin, Bisoprolol, Clopidogrel, Atorvastatin",
            vitals: {
                hr: 52,
                bp: "95/60",
                rr: 20,
                spo2: 94,
                temp: 36.2,
                gcs: 15,
                bm: 14.5,
                pain: 4
            },
            presentation: "Epigastric discomfort, nausea, diaphoresis, bradycardic - atypical MI in diabetic",
            ecg: "Rate 52bpm, sinus bradycardia. ST elevation in leads II, III, aVF (2-3mm) with reciprocal ST depression V1-V3. First degree heart block (PR 240ms). Inferior STEMI with right ventricular involvement likely.",
            redFlags: [
                "Atypical presentation in diabetic patient",
                "Bradycardia (consider inferior MI with vagal response)",
                "Hypotension",
                "Diaphoresis without fever",
                "Previous MI history",
                "Epigastric pain mimicking GI cause"
            ]
        },
        starterMessage: "I don't know what's wrong with me... I've been feeling awful for the past hour. My stomach hurts and I feel really sick. I keep sweating but I don't have a temperature. My husband made me call because he says I look grey."
    },
    {
        id: "cardiac-003",
        category: "cardiac",
        dispatch: {
            name: "James",
            age: 45,
            gender: "M",
            chiefComplaint: "Palpitations",
            details: "Racing heart, feels unwell",
            category: 2
        },
        patient: {
            condition: "SVT",
            history: "Anxiety, previous similar episodes",
            medications: "None regular",
            vitals: {
                hr: 180,
                bp: "100/70",
                rr: 24,
                spo2: 98,
                temp: 36.6,
                gcs: 15,
                bm: 5.8,
                pain: 2
            },
            presentation: "Regular narrow complex tachycardia, sudden onset while at rest",
            ecg: "Rate 180bpm, regular narrow complex tachycardia. No visible P waves. QRS <120ms. No ST changes. Consistent with SVT (likely AVNRT).",
            redFlags: [
                "Very rapid heart rate (>150bpm)",
                "Hypotension (borderline)",
                "Associated breathlessness",
                "Sudden onset/offset pattern",
                "Chest discomfort with tachycardia",
                "Pre-syncope symptoms"
            ]
        },
        starterMessage: "My heart's going absolutely crazy! It just started about 20 minutes ago - I was just sitting having my lunch and suddenly it started racing. I can feel it pounding in my chest and throat. I feel a bit lightheaded and short of breath."
    },
    {
        id: "cardiac-004",
        category: "cardiac",
        dispatch: {
            name: "Dorothy",
            age: 78,
            gender: "F",
            chiefComplaint: "Difficulty breathing",
            details: "Progressively worsening over 2 days, can't lie flat",
            category: 2
        },
        patient: {
            condition: "Acute Heart Failure / Pulmonary Oedema",
            history: "Heart failure, AF, CKD",
            medications: "Furosemide, Digoxin, Ramipril, Apixaban",
            vitals: {
                hr: 110,
                bp: "180/100",
                rr: 32,
                spo2: 88,
                temp: 36.4,
                gcs: 15,
                bm: 6.2,
                pain: 0
            },
            presentation: "Orthopnoea, bilateral crackles, peripheral oedema, elevated JVP",
            ecg: "Rate 110bpm, atrial fibrillation with fast ventricular response. Left ventricular hypertrophy pattern. Non-specific ST-T changes. No acute ischaemic changes.",
            redFlags: [
                "Orthopnoea (can't lie flat)",
                "Severe hypoxia (SpO2 88%)",
                "Hypertensive crisis",
                "Bilateral crackles (pulmonary oedema)",
                "Peripheral oedema",
                "Tachypnoea and respiratory distress"
            ]
        },
        starterMessage: "*breathless* I can't... catch my breath. It's been getting worse for two days... I had to sleep sitting up in the chair last night. My ankles are really swollen and I've got this horrible bubbly feeling in my chest."
    },
    {
        id: "cardiac-005",
        category: "cardiac",
        dispatch: {
            name: "William",
            age: 62,
            gender: "M",
            chiefComplaint: "Irregular heartbeat",
            details: "Palpitations on and off for 2 days, feels tired",
            category: 3
        },
        patient: {
            condition: "New Onset AF with Fast Ventricular Response",
            history: "Hypertension, Obesity",
            medications: "Amlodipine",
            vitals: {
                hr: 134,
                bp: "145/88",
                rr: 20,
                spo2: 97,
                temp: 36.5,
                gcs: 15,
                bm: 7.1,
                pain: 0
            },
            presentation: "Irregularly irregular pulse, no chest pain, mild SOB on exertion",
            ecg: "Rate 130-140bpm (variable), irregularly irregular rhythm. No P waves visible, fibrillatory baseline. Narrow QRS complexes. No acute ST changes. New onset atrial fibrillation.",
            redFlags: [
                "New onset AF (stroke risk)",
                "Fast ventricular response (>100bpm)",
                "Duration >48 hours (thrombus risk)",
                "Symptoms on exertion",
                "Underlying hypertension",
                "Need to consider anticoagulation"
            ]
        },
        starterMessage: "My heart keeps going really fast and then slowing down... it feels like it's fluttering in my chest. It's been doing this on and off for a couple of days now. I feel a bit tired and short of breath when I walk upstairs."
    },
    {
        id: "cardiac-006",
        category: "cardiac",
        dispatch: {
            name: "Albert",
            age: 80,
            gender: "M",
            chiefComplaint: "Collapse",
            details: "Fell at home, wife states he went very pale",
            category: 2
        },
        patient: {
            condition: "Symptomatic Bradycardia - Complete Heart Block",
            history: "Previous MI, pacemaker discussed but declined",
            medications: "Bisoprolol, Aspirin, Atorvastatin",
            vitals: {
                hr: 32,
                bp: "85/50",
                rr: 18,
                spo2: 94,
                temp: 36.0,
                gcs: 14,
                bm: 5.5,
                pain: 0
            },
            presentation: "Bradycardic, hypotensive, pale, feels dizzy and weak",
            ecg: "Rate 32bpm, complete heart block (third degree AV block). P waves regular at ~70bpm but completely dissociated from QRS. Wide QRS escape rhythm (ventricular escape). No relationship between P waves and QRS complexes.",
            redFlags: [
                "Severe bradycardia (<40bpm)",
                "Syncope/collapse",
                "Hypotension",
                "Altered consciousness",
                "Complete heart block on ECG",
                "Haemodynamic compromise"
            ]
        },
        starterMessage: "*weak voice* I just came over all funny... everything went dark and my wife says I went down. I feel really dizzy and weak... everything looks a bit grey. I've been feeling tired for a few days actually."
    },
    {
        id: "cardiac-007",
        category: "cardiac",
        dispatch: {
            name: "Thomas",
            age: 55,
            gender: "M",
            chiefComplaint: "Chest tightness",
            details: "Pain on exertion, has happened before",
            category: 3
        },
        patient: {
            condition: "Unstable Angina",
            history: "Known angina, hypercholesterolaemia, family history IHD",
            medications: "GTN spray PRN, Atorvastatin, Aspirin",
            vitals: {
                hr: 88,
                bp: "150/90",
                rr: 18,
                spo2: 98,
                temp: 36.6,
                gcs: 15,
                bm: 5.8,
                pain: 6
            },
            presentation: "Chest tightness at rest, usually only on exertion, GTN partially effective",
            ecg: "Rate 88bpm, sinus rhythm. T wave inversion leads V4-V6 and I, aVL. No ST elevation. Dynamic changes suggesting unstable angina.",
            redFlags: [
                "Change in angina pattern (now at rest)",
                "Reduced response to GTN",
                "Dynamic ECG changes",
                "Pain more frequent than usual",
                "Crescendo pattern",
                "High risk of progression to MI"
            ]
        },
        starterMessage: "I've had angina for years and I know what it feels like. But this is different... it's been coming on when I'm just sitting still. Normally it only happens when I walk up the hill. My spray helps a bit but doesn't take it away completely like it used to."
    },
    {
        id: "cardiac-008",
        category: "cardiac",
        dispatch: {
            name: "Michael",
            age: 58,
            gender: "M",
            chiefComplaint: "Indigestion",
            details: "Epigastric discomfort after meal, feels sweaty",
            category: 3
        },
        patient: {
            condition: "NSTEMI presenting as indigestion",
            history: "Smoker 30/day, no known cardiac history, family history MI",
            medications: "None",
            vitals: {
                hr: 88,
                bp: "155/95",
                rr: 18,
                spo2: 97,
                temp: 36.7,
                gcs: 15,
                bm: 6.8,
                pain: 5
            },
            presentation: "Epigastric discomfort, diaphoresis, subtle SOB - high risk features for ACS",
            ecg: "Rate 88bpm, sinus rhythm. ST depression V4-V6 (1-2mm horizontal). T wave inversion in leads I, aVL. No ST elevation. NSTEMI pattern.",
            redFlags: [
                "Atypical presentation (epigastric pain)",
                "Diaphoresis without explanation",
                "Strong cardiac risk factors (smoker, family history)",
                "ST depression on ECG",
                "Patient minimising symptoms",
                "New onset symptoms in high-risk patient"
            ]
        },
        starterMessage: "I think it's just indigestion to be honest... I had a big dinner and this burning feeling started in my stomach. My wife insisted I call because I keep sweating and she says I don't look right. I'm sure it's nothing."
    },
    {
        id: "cardiac-009",
        category: "cardiac",
        dispatch: {
            name: "Kenneth",
            age: 68,
            gender: "M",
            chiefComplaint: "Sudden severe back pain",
            details: "Tearing pain between shoulder blades, very distressed",
            category: 1
        },
        patient: {
            condition: "Aortic Dissection",
            history: "Poorly controlled hypertension, Marfan syndrome",
            medications: "Amlodipine (often forgets to take it)",
            vitals: {
                hr: 105,
                bp: "Right arm 185/110, Left arm 145/85",
                rr: 24,
                spo2: 96,
                temp: 36.5,
                gcs: 15,
                bm: 6.0,
                pain: 10
            },
            presentation: "Severe tearing interscapular pain, BP differential between arms, pale and diaphoretic",
            ecg: "Rate 105bpm, sinus tachycardia. Left ventricular hypertrophy. No acute ST changes.",
            redFlags: [
                "Sudden onset tearing/ripping pain",
                "Radiation to back (interscapular)",
                "Blood pressure differential >20mmHg between arms",
                "Hypertension history",
                "Connective tissue disorder (Marfan)",
                "Pain maximal at onset",
                "TIME CRITICAL - needs CT aorta/surgery"
            ]
        },
        starterMessage: "*writhing in agony* The pain... it's like something tearing inside me! It started in my chest and went straight through to my back between my shoulders. I've never felt anything like it - it was worst right at the beginning. I feel like I'm going to die!"
    },
    {
        id: "cardiac-010",
        category: "cardiac",
        dispatch: {
            name: "Brenda",
            age: 74,
            gender: "F",
            chiefComplaint: "Dizzy spells",
            details: "Multiple episodes today, nearly fell",
            category: 2
        },
        patient: {
            condition: "Sick Sinus Syndrome with Tachy-Brady",
            history: "Palpitations for years, hypertension",
            medications: "Ramipril, Bendroflumethiazide",
            vitals: {
                hr: 45,
                bp: "100/65",
                rr: 16,
                spo2: 97,
                temp: 36.4,
                gcs: 15,
                bm: 5.5,
                pain: 0
            },
            presentation: "Episodes of bradycardia alternating with tachycardia, pre-syncope, current bradycardia",
            ecg: "Rate 45bpm, sinus bradycardia with sinus pauses up to 3 seconds. Previous ECGs (patient reports) showed fast heart rate. Consistent with sick sinus syndrome.",
            redFlags: [
                "Symptomatic bradycardia",
                "Sinus pauses >3 seconds",
                "Pre-syncope/syncope",
                "Alternating tachy-brady (sick sinus)",
                "Hypotension",
                "May need pacemaker",
                "Avoid rate-limiting drugs"
            ]
        },
        starterMessage: "I keep going all dizzy and nearly falling over. It's happened about five times today. Sometimes my heart races like mad, and other times it feels really slow - like now. I've had these funny turns on and off for a while but never this bad."
    },

    // ==================== RESPIRATORY (10 scenarios) ====================
    {
        id: "resp-001",
        category: "respiratory",
        dispatch: {
            name: "Sophie",
            age: 28,
            gender: "F",
            chiefComplaint: "Difficulty breathing",
            details: "Known asthmatic, inhaler not helping",
            category: 2
        },
        patient: {
            condition: "Acute Severe Asthma",
            history: "Asthma since childhood, previous ICU admission",
            medications: "Salbutamol inhaler, Clenil inhaler",
            vitals: {
                hr: 125,
                bp: "130/80",
                rr: 32,
                spo2: 91,
                temp: 36.8,
                gcs: 15,
                bm: 5.2,
                pain: 0
            },
            presentation: "Widespread wheeze, using accessory muscles, difficulty completing sentences",
            ecg: "Rate 125bpm, sinus tachycardia. Normal axis. No ST changes. Tachycardia likely secondary to respiratory distress and beta-agonist use.",
            redFlags: [
                "Unable to complete sentences",
                "SpO2 <92% on air",
                "Previous ICU admission",
                "Not responding to own inhalers",
                "Accessory muscle use",
                "Tachycardia >120bpm",
                "Silent chest would indicate life-threatening"
            ]
        },
        starterMessage: "*wheeze* I can't... catch my breath... *wheeze* My inhaler isn't helping... I've used it about... *wheeze* ...ten times. I had a cold last week and... *struggling* ...it's just got worse and worse."
    },
    {
        id: "resp-002",
        category: "respiratory",
        dispatch: {
            name: "Harold",
            age: 72,
            gender: "M",
            chiefComplaint: "Breathing worse than usual",
            details: "COPD patient, increased sputum production",
            category: 2
        },
        patient: {
            condition: "Infective Exacerbation of COPD",
            history: "COPD, 50 pack year smoking history, home oxygen",
            medications: "Salbutamol, Tiotropium, Prednisolone rescue pack",
            vitals: {
                hr: 105,
                bp: "145/85",
                rr: 28,
                spo2: 86,
                temp: 38.2,
                gcs: 15,
                bm: 6.5,
                pain: 0
            },
            presentation: "Productive cough with green sputum, pyrexial, reduced air entry bilaterally",
            ecg: "Rate 105bpm, sinus tachycardia. Right axis deviation. P pulmonale (peaked P waves in II). Low voltage QRS. Pattern consistent with chronic COPD.",
            redFlags: [
                "Hypoxia despite home oxygen",
                "Pyrexia (infection)",
                "Increased/purulent sputum",
                "Reduced air entry",
                "Known severe COPD",
                "Beware CO2 retention with high-flow O2"
            ]
        },
        starterMessage: "*coughing* I've been bringing up loads of horrible green stuff... *cough cough* I'm more breathless than usual and I feel really hot and shivery. I've had this cough for about a week but it's got much worse."
    },
    {
        id: "resp-003",
        category: "respiratory",
        dispatch: {
            name: "Robert",
            age: 65,
            gender: "M",
            chiefComplaint: "Cough and fever",
            details: "Unwell for 5 days, productive cough, feels weak",
            category: 3
        },
        patient: {
            condition: "Community Acquired Pneumonia",
            history: "Type 2 Diabetes, mild COPD",
            medications: "Metformin, Salbutamol PRN",
            vitals: {
                hr: 110,
                bp: "100/65",
                rr: 26,
                spo2: 92,
                temp: 39.1,
                gcs: 15,
                bm: 15.2,
                pain: 6
            },
            presentation: "Right basal crackles, productive cough with rust-coloured sputum, pleuritic pain",
            ecg: "Rate 110bpm, sinus tachycardia. Normal axis. No acute changes. Tachycardia consistent with septic response.",
            redFlags: [
                "High CURB-65 score (confusion, urea, RR, BP, age)",
                "Hypotension",
                "Tachypnoea >25",
                "Hypoxia",
                "Rust-coloured sputum (pneumococcal)",
                "Diabetic (immunocompromised)"
            ]
        },
        starterMessage: "I've been really unwell for about 5 days now. Started with a cough but now I've got this awful pain in my side when I breathe and I'm bringing up horrible rusty-looking stuff. I feel absolutely dreadful and so weak."
    },
    {
        id: "resp-004",
        category: "respiratory",
        dispatch: {
            name: "Charlotte",
            age: 35,
            gender: "F",
            chiefComplaint: "Sudden chest pain and breathlessness",
            details: "Sharp pain on breathing, came on suddenly at rest",
            category: 2
        },
        patient: {
            condition: "Pulmonary Embolism",
            history: "On combined oral contraceptive, long haul flight 3 days ago",
            medications: "Microgynon (COCP)",
            vitals: {
                hr: 115,
                bp: "118/78",
                rr: 24,
                spo2: 93,
                temp: 37.2,
                gcs: 15,
                bm: 5.1,
                pain: 7
            },
            presentation: "Pleuritic chest pain, tachycardic, tachypnoeic, recent risk factors",
            ecg: "Rate 115bpm, sinus tachycardia. S1Q3T3 pattern (deep S wave lead I, Q wave and inverted T wave lead III). Right axis deviation. T wave inversion V1-V3. Classic PE pattern.",
            redFlags: [
                "Pleuritic chest pain with dyspnoea",
                "Recent long-haul flight (DVT risk)",
                "Combined oral contraceptive use",
                "Tachycardia disproportionate to findings",
                "Hypoxia with clear chest",
                "S1Q3T3 pattern on ECG"
            ]
        },
        starterMessage: "I was just sitting watching TV and suddenly got this really sharp pain in my chest. It hurts when I breathe in. I feel really short of breath and my heart is racing. I flew back from Australia 3 days ago... could that be related?"
    },
    {
        id: "resp-005",
        category: "respiratory",
        dispatch: {
            name: "Lisa",
            age: 25,
            gender: "F",
            chiefComplaint: "Allergic reaction",
            details: "Throat feels tight, ate shellfish",
            category: 1
        },
        patient: {
            condition: "Anaphylaxis",
            history: "Known shellfish allergy (mild reactions before), has EpiPen but hasn't used it",
            medications: "Loratadine PRN",
            vitals: {
                hr: 130,
                bp: "85/50",
                rr: 30,
                spo2: 91,
                temp: 37.0,
                gcs: 14,
                bm: 5.5,
                pain: 0
            },
            presentation: "Urticaria, facial swelling, stridor, wheeze, hypotensive",
            ecg: "Rate 130bpm, sinus tachycardia. Normal axis. No ST changes. Tachycardia secondary to anaphylaxis.",
            redFlags: [
                "Airway compromise (stridor, throat tightness)",
                "Hypotension (shock)",
                "Wheeze (bronchospasm)",
                "Known allergen exposure",
                "Rapid progression",
                "Previous allergic reactions",
                "IM Adrenaline is first-line treatment"
            ]
        },
        starterMessage: "*distressed, voice hoarse* I can't breathe properly... my throat feels really tight... I just ate some prawns at a restaurant and I'm allergic... *scratching* I'm so itchy everywhere and my lips feel huge... I have my EpiPen but I'm scared to use it..."
    },
    {
        id: "resp-006",
        category: "respiratory",
        dispatch: {
            name: "Daniel",
            age: 55,
            gender: "M",
            chiefComplaint: "Worsening breathlessness",
            details: "COVID positive, oxygen levels dropping at home",
            category: 2
        },
        patient: {
            condition: "COVID-19 Pneumonitis",
            history: "Tested positive 7 days ago, diabetes, obesity",
            medications: "Metformin, Gliclazide",
            vitals: {
                hr: 100,
                bp: "135/85",
                rr: 28,
                spo2: 85,
                temp: 38.5,
                gcs: 15,
                bm: 12.5,
                pain: 0
            },
            presentation: "Bilateral crackles, silent hypoxia improving with prone positioning",
            ecg: "Rate 100bpm, sinus rhythm. Normal axis. Non-specific T wave changes. No acute ischaemia.",
            redFlags: [
                "Severe hypoxia (SpO2 <88%)",
                "Day 7-10 of illness (cytokine storm risk)",
                "High-risk features (diabetes, obesity)",
                "Silent hypoxia (patient may not feel as unwell as they are)",
                "Worsening trajectory",
                "May need CPAP/hospital care"
            ]
        },
        starterMessage: "I tested positive for COVID a week ago and I've been managing at home... but today I just can't catch my breath. I've been checking my oxygen with that thing on my finger and it's been dropping all day. I feel exhausted just talking to you."
    },
    {
        id: "resp-007",
        category: "respiratory",
        dispatch: {
            name: "Gary",
            age: 22,
            gender: "M",
            chiefComplaint: "Sudden breathlessness",
            details: "Tall thin male, pain on one side, came on suddenly",
            category: 2
        },
        patient: {
            condition: "Primary Spontaneous Pneumothorax",
            history: "Tall thin build, smoker, no previous respiratory problems",
            medications: "None",
            vitals: {
                hr: 100,
                bp: "125/80",
                rr: 24,
                spo2: 95,
                temp: 36.6,
                gcs: 15,
                bm: 5.5,
                pain: 6
            },
            presentation: "Reduced breath sounds on right, hyper-resonant percussion, sudden onset pleuritic pain",
            ecg: "Rate 100bpm, sinus rhythm. Normal ECG.",
            redFlags: [
                "Sudden onset dyspnoea and pleuritic pain",
                "Reduced breath sounds unilaterally",
                "Hyper-resonance to percussion",
                "Tall thin male (classic demographic)",
                "Smoker",
                "Watch for tension (tracheal deviation, hypotension)"
            ]
        },
        starterMessage: "I was just sitting playing video games and suddenly got this really sharp pain on the right side of my chest. Now I can't catch my breath properly. It came on completely out of nowhere. I'm quite fit normally - I've never had anything like this."
    },
    {
        id: "resp-008",
        category: "respiratory",
        dispatch: {
            name: "Maureen",
            age: 82,
            gender: "F",
            chiefComplaint: "Coughing up blood",
            details: "Blood in sputum this morning, frightened",
            category: 2
        },
        patient: {
            condition: "Haemoptysis - likely lung malignancy",
            history: "Ex-smoker 40 pack years, weight loss over 3 months, chronic cough",
            medications: "Omeprazole, Paracetamol PRN",
            vitals: {
                hr: 88,
                bp: "135/80",
                rr: 20,
                spo2: 94,
                temp: 36.8,
                gcs: 15,
                bm: 5.8,
                pain: 2
            },
            presentation: "Small volume haemoptysis, cachexic appearance, finger clubbing, weight loss",
            ecg: "Rate 88bpm, sinus rhythm. Normal ECG.",
            redFlags: [
                "Haemoptysis in smoker/ex-smoker",
                "Unintentional weight loss",
                "Finger clubbing (new)",
                "Age and smoking history",
                "Chronic cough with change in character",
                "Needs urgent 2-week wait referral",
                "Rule out PE, TB, bronchiectasis"
            ]
        },
        starterMessage: "I coughed up some blood this morning and it really frightened me. It was bright red mixed in with my phlegm. I've had this cough for months but I just put it down to being an old smoker. I've also been losing weight without trying... my clothes are hanging off me."
    },
    {
        id: "resp-009",
        category: "respiratory",
        dispatch: {
            name: "Simon",
            age: 45,
            gender: "M",
            chiefComplaint: "Can't stop coughing",
            details: "Severe coughing fits, goes red in face, vomited",
            category: 3
        },
        patient: {
            condition: "Pertussis (Whooping Cough)",
            history: "No vaccinations as adult, works in school",
            medications: "None",
            vitals: {
                hr: 90,
                bp: "130/82",
                rr: 18,
                spo2: 97,
                temp: 37.2,
                gcs: 15,
                bm: 5.5,
                pain: 4
            },
            presentation: "Paroxysmal coughing with inspiratory whoop, post-tussive vomiting, subconjunctival haemorrhages",
            ecg: "Rate 90bpm, sinus rhythm. Normal ECG.",
            redFlags: [
                "Characteristic 'whoop' sound",
                "Paroxysmal coughing lasting >2 weeks",
                "Post-tussive vomiting",
                "Subconjunctival haemorrhages from coughing",
                "Unvaccinated/vaccine waned",
                "Contact with children (highly contagious)",
                "Notifiable disease"
            ]
        },
        starterMessage: "These coughing fits are absolutely horrendous. I cough and cough until I can't breathe, then I make this horrible whooping noise when I try to breathe in. I've been sick a few times from coughing so hard. It's been going on for about 3 weeks now. I work as a teaching assistant."
    },
    {
        id: "resp-010",
        category: "respiratory",
        dispatch: {
            name: "Evelyn",
            age: 70,
            gender: "F",
            chiefComplaint: "Breathless and swollen legs",
            details: "Getting worse over weeks, can't do housework anymore",
            category: 3
        },
        patient: {
            condition: "Pulmonary Fibrosis",
            history: "Rheumatoid arthritis on methotrexate, dry cough for 6 months",
            medications: "Methotrexate, Folic acid, Prednisolone",
            vitals: {
                hr: 92,
                bp: "138/82",
                rr: 24,
                spo2: 89,
                temp: 36.5,
                gcs: 15,
                bm: 6.2,
                pain: 0
            },
            presentation: "Fine inspiratory crackles bilateral bases (velcro crackles), finger clubbing, chronic progressive dyspnoea",
            ecg: "Rate 92bpm, sinus rhythm. Right axis deviation. P pulmonale.",
            redFlags: [
                "Progressive dyspnoea over weeks/months",
                "Fine bibasal crackles (velcro)",
                "Finger clubbing",
                "Methotrexate use (can cause pulmonary fibrosis)",
                "Rheumatoid arthritis (associated ILD)",
                "Chronic hypoxia",
                "May need home oxygen assessment"
            ]
        },
        starterMessage: "I've been getting more and more breathless over the past few months. I used to be able to do all my housework but now I can barely make it up the stairs. I've got this dry cough that won't go away. My fingers look a bit odd too - the ends have gone all rounded."
    },

    // ==================== ABDOMINAL (10 scenarios) ====================
    {
        id: "abdo-001",
        category: "abdominal",
        dispatch: {
            name: "Jack",
            age: 22,
            gender: "M",
            chiefComplaint: "Abdominal pain",
            details: "Started around belly button, now right side",
            category: 3
        },
        patient: {
            condition: "Appendicitis",
            history: "Nil significant",
            medications: "None",
            vitals: {
                hr: 95,
                bp: "125/80",
                rr: 18,
                spo2: 99,
                temp: 37.8,
                gcs: 15,
                bm: 5.5,
                pain: 8
            },
            presentation: "RIF tenderness, guarding, rebound, positive Rovsing's sign",
            ecg: "Rate 95bpm, sinus rhythm. Normal ECG. No acute changes.",
            redFlags: [
                "Migration of pain from periumbilical to RIF",
                "Rebound tenderness (peritoneal irritation)",
                "Guarding",
                "Anorexia and nausea",
                "Low-grade fever",
                "Risk of perforation if delayed"
            ]
        },
        starterMessage: "The pain started around my belly button last night but now it's moved down here to my right side. It really hurts when I move or cough. I've been sick twice and I really don't feel like eating anything."
    },
    {
        id: "abdo-002",
        category: "abdominal",
        dispatch: {
            name: "Susan",
            age: 48,
            gender: "F",
            chiefComplaint: "Severe abdominal pain",
            details: "Pain under right ribs after eating, feels sick",
            category: 3
        },
        patient: {
            condition: "Acute Cholecystitis",
            history: "Previous gallstones found on scan, obesity",
            medications: "Omeprazole",
            vitals: {
                hr: 100,
                bp: "140/90",
                rr: 20,
                spo2: 98,
                temp: 38.4,
                gcs: 15,
                bm: 6.0,
                pain: 9
            },
            presentation: "RUQ tenderness, positive Murphy's sign, referred pain to shoulder",
            ecg: "Rate 100bpm, sinus rhythm. Normal ECG.",
            redFlags: [
                "RUQ pain with fever (cholecystitis vs cholangitis)",
                "Positive Murphy's sign",
                "Referred pain to right shoulder (phrenic nerve)",
                "Triggered by fatty food",
                "Previous gallstones",
                "Watch for ascending cholangitis (Charcot's triad)"
            ]
        },
        starterMessage: "Oh the pain is awful... it's right here under my ribs on the right side. It started after I had fish and chips for dinner. The pain goes through to my back and up to my shoulder. I keep feeling like I'm going to be sick."
    },
    {
        id: "abdo-003",
        category: "abdominal",
        dispatch: {
            name: "George",
            age: 75,
            gender: "M",
            chiefComplaint: "Severe back and abdominal pain",
            details: "Sudden onset, feels faint, known AAA",
            category: 1
        },
        patient: {
            condition: "Ruptured Abdominal Aortic Aneurysm",
            history: "6cm AAA under surveillance, hypertension, ex-smoker",
            medications: "Amlodipine, Atorvastatin",
            vitals: {
                hr: 120,
                bp: "80/50",
                rr: 24,
                spo2: 95,
                temp: 36.0,
                gcs: 14,
                bm: 6.5,
                pain: 10
            },
            presentation: "Grey, clammy, pulsatile abdominal mass, catastrophic presentation",
            ecg: "Rate 120bpm, sinus tachycardia. Non-specific ST changes. Tachycardia secondary to hypovolaemia.",
            redFlags: [
                "Known AAA with sudden pain",
                "Severe hypotension (shock)",
                "Pulsatile abdominal mass",
                "Pain radiating to back",
                "Syncope/pre-syncope",
                "TIME CRITICAL - needs emergency vascular surgery",
                "Permissive hypotension (don't over-fluid)"
            ]
        },
        starterMessage: "*pale, sweating* I've got this terrible pain in my back and stomach... it came on suddenly about an hour ago. I feel really unwell... *clutching abdomen* ...I had an aneurysm they were watching... everything's going grey..."
    },
    {
        id: "abdo-004",
        category: "abdominal",
        dispatch: {
            name: "Betty",
            age: 68,
            gender: "F",
            chiefComplaint: "Abdominal pain and vomiting",
            details: "Not opened bowels for 4 days, tummy distended",
            category: 2
        },
        patient: {
            condition: "Small Bowel Obstruction",
            history: "Previous abdominal surgery for ovarian cancer",
            medications: "Codeine for back pain",
            vitals: {
                hr: 105,
                bp: "110/70",
                rr: 22,
                spo2: 97,
                temp: 37.2,
                gcs: 15,
                bm: 7.2,
                pain: 8
            },
            presentation: "Distended abdomen, high-pitched bowel sounds, faeculent vomiting",
            ecg: "Rate 105bpm, sinus tachycardia. Normal ECG.",
            redFlags: [
                "Faeculent vomiting (late sign)",
                "Absolute constipation",
                "Abdominal distension",
                "Previous abdominal surgery (adhesions)",
                "Colicky pain",
                "Risk of strangulation and bowel ischaemia"
            ]
        },
        starterMessage: "I haven't been to the toilet properly for 4 days and my tummy has swollen up like a balloon. I keep being sick and the last lot... sorry this is disgusting... but it smelt like poo. The pain comes in waves and is absolutely awful."
    },
    {
        id: "abdo-005",
        category: "abdominal",
        dispatch: {
            name: "Frank",
            age: 60,
            gender: "M",
            chiefComplaint: "Black stools and dizziness",
            details: "Noticed dark stools for 2 days, feeling weak",
            category: 2
        },
        patient: {
            condition: "Upper GI Bleed - likely peptic ulcer",
            history: "Takes ibuprofen daily for arthritis, previous indigestion",
            medications: "Ibuprofen 400mg TDS",
            vitals: {
                hr: 115,
                bp: "95/60",
                rr: 20,
                spo2: 98,
                temp: 36.5,
                gcs: 15,
                bm: 5.8,
                pain: 4
            },
            presentation: "Pale, tachycardic, melaena, epigastric tenderness",
            ecg: "Rate 115bpm, sinus tachycardia. No acute ischaemic changes. Tachycardia secondary to hypovolaemia.",
            redFlags: [
                "Melaena (upper GI bleed)",
                "Hypotension with tachycardia (shock)",
                "NSAID use (ulcer risk)",
                "Syncope/pre-syncope",
                "Pallor",
                "May need urgent endoscopy",
                "Calculate Rockall/Blatchford score"
            ]
        },
        starterMessage: "I've noticed my... um... stools have been really dark and sticky for a couple of days. Like tar almost. I've been feeling really dizzy when I stand up and I just feel so weak and washed out. I nearly fainted in the bathroom."
    },
    {
        id: "abdo-006",
        category: "abdominal",
        dispatch: {
            name: "Andrew",
            age: 40,
            gender: "M",
            chiefComplaint: "Severe one-sided pain",
            details: "Agitated with pain, can't get comfortable",
            category: 2
        },
        patient: {
            condition: "Renal Colic - Ureteric Stone",
            history: "Previous kidney stone 3 years ago",
            medications: "None",
            vitals: {
                hr: 100,
                bp: "150/95",
                rr: 20,
                spo2: 99,
                temp: 36.8,
                gcs: 15,
                bm: 5.5,
                pain: 10
            },
            presentation: "Writhing in pain, loin to groin, haematuria",
            ecg: "Rate 100bpm, sinus rhythm. Normal ECG. Mild tachycardia secondary to pain.",
            redFlags: [
                "Loin to groin pain pattern",
                "Patient unable to stay still (unlike peritonitis)",
                "Haematuria",
                "Previous kidney stones",
                "Watch for: fever (infected obstructed kidney - EMERGENCY)",
                "Single kidney would be high risk"
            ]
        },
        starterMessage: "*writhing, can't stay still* This pain is absolutely unbearable! It started in my back and now it's going down to my... you know... groin area. I had a kidney stone before and this feels exactly the same. I can't get comfortable at all!"
    },
    {
        id: "abdo-007",
        category: "abdominal",
        dispatch: {
            name: "Richard",
            age: 50,
            gender: "M",
            chiefComplaint: "Severe upper abdominal pain",
            details: "Pain going through to back, been vomiting",
            category: 2
        },
        patient: {
            condition: "Acute Pancreatitis",
            history: "Heavy alcohol use, previous pancreatitis",
            medications: "Thiamine, B vitamins",
            vitals: {
                hr: 110,
                bp: "105/65",
                rr: 22,
                spo2: 96,
                temp: 37.8,
                gcs: 15,
                bm: 8.5,
                pain: 9
            },
            presentation: "Epigastric tenderness radiating to back, guarding, dehydrated",
            ecg: "Rate 110bpm, sinus tachycardia. Normal axis. No acute changes.",
            redFlags: [
                "Epigastric pain radiating to back",
                "History of alcohol excess",
                "Previous pancreatitis",
                "Vomiting and dehydration",
                "Hypotension",
                "Can progress to severe pancreatitis/SIRS"
            ]
        },
        starterMessage: "The pain is right here in the top of my stomach and it goes straight through to my back. I've been sick about six times. I had a lot to drink over the weekend... I know, I know... I've had this before but this feels worse."
    },
    {
        id: "abdo-008",
        category: "abdominal",
        dispatch: {
            name: "Carol",
            age: 58,
            gender: "F",
            chiefComplaint: "Lower abdominal pain",
            details: "Left-sided pain, fever, change in bowels",
            category: 3
        },
        patient: {
            condition: "Acute Diverticulitis",
            history: "Known diverticular disease, recurrent UTIs",
            medications: "HRT, Vitamin D",
            vitals: {
                hr: 95,
                bp: "135/85",
                rr: 18,
                spo2: 98,
                temp: 38.2,
                gcs: 15,
                bm: 6.0,
                pain: 7
            },
            presentation: "Left iliac fossa tenderness, localised guarding, fever, altered bowel habit",
            ecg: "Rate 95bpm, sinus rhythm. Normal ECG.",
            redFlags: [
                "LIF pain with fever (classic diverticulitis)",
                "Localised peritonism",
                "Known diverticular disease",
                "Risk of perforation/abscess",
                "Watch for generalised peritonitis",
                "May need IV antibiotics and CT scan"
            ]
        },
        starterMessage: "I've got this horrible pain in the lower left side of my tummy. It started yesterday and has got worse. I've got a temperature and I've been going to the toilet a lot more than usual. I was told I had pouches in my bowel a few years ago."
    },
    {
        id: "abdo-009",
        category: "abdominal",
        dispatch: {
            name: "Patricia",
            age: 32,
            gender: "F",
            chiefComplaint: "Severe period pain",
            details: "Worse than normal, feels faint",
            category: 2
        },
        patient: {
            condition: "Ruptured Ectopic Pregnancy",
            history: "Previous ectopic 2 years ago, IUCD in situ, LMP 6 weeks ago",
            medications: "None",
            vitals: {
                hr: 118,
                bp: "90/55",
                rr: 22,
                spo2: 99,
                temp: 36.4,
                gcs: 15,
                bm: 5.2,
                pain: 9
            },
            presentation: "Peritonism, shoulder tip pain, vaginal bleeding, hypotensive",
            ecg: "Rate 118bpm, sinus tachycardia. Normal ECG.",
            redFlags: [
                "Sexually active woman with abdominal pain (always consider ectopic)",
                "Previous ectopic (high recurrence risk)",
                "IUCD in situ (risk factor)",
                "Shoulder tip pain (diaphragmatic irritation from blood)",
                "Hypotension and tachycardia (internal bleeding)",
                "TIME CRITICAL - needs emergency surgery"
            ]
        },
        starterMessage: "I thought it was just a bad period - I'm a bit late this month. But this pain is much worse than normal... it's in my lower tummy and up into my shoulder which is weird. I feel really faint when I stand up. I've got a coil fitted... I had an ectopic before."
    },
    {
        id: "abdo-010",
        category: "abdominal",
        dispatch: {
            name: "Norman",
            age: 78,
            gender: "M",
            chiefComplaint: "Abdominal pain and bloody diarrhoea",
            details: "Sudden onset pain, passing blood, looks unwell",
            category: 1
        },
        patient: {
            condition: "Acute Mesenteric Ischaemia",
            history: "AF, heart failure, peripheral vascular disease",
            medications: "Warfarin, Digoxin, Furosemide, Ramipril",
            vitals: {
                hr: 110,
                bp: "95/60",
                rr: 26,
                spo2: 94,
                temp: 36.2,
                gcs: 14,
                bm: 7.8,
                pain: 10
            },
            presentation: "Severe pain out of proportion to examination, bloody diarrhoea, AF (embolic source)",
            ecg: "Rate 110bpm, atrial fibrillation with fast ventricular response.",
            redFlags: [
                "Pain out of proportion to examination (classic)",
                "AF (embolic source for mesenteric artery)",
                "Bloody diarrhoea",
                "Rapid deterioration",
                "Metabolic acidosis likely",
                "TIME CRITICAL - needs CT angiogram and surgery",
                "High mortality condition"
            ]
        },
        starterMessage: "*very distressed* The pain is unbearable... it came on suddenly about 2 hours ago. I've been going to the toilet and there's blood. My tummy doesn't feel that bad when you press it but the pain inside is terrible. I've got that heart rhythm problem... takes warfarin for it."
    },

    // ==================== NEUROLOGICAL (10 scenarios) ====================
    {
        id: "neuro-001",
        category: "neuro",
        dispatch: {
            name: "Arthur",
            age: 72,
            gender: "M",
            chiefComplaint: "Face drooping, arm weak",
            details: "Wife noticed changes 30 minutes ago",
            category: 1
        },
        patient: {
            condition: "Acute Stroke - Left MCA territory",
            history: "AF (not anticoagulated), hypertension",
            medications: "Bisoprolol, Ramipril",
            vitals: {
                hr: 85,
                bp: "185/100",
                rr: 16,
                spo2: 97,
                temp: 36.5,
                gcs: 14,
                bm: 6.2,
                pain: 0
            },
            presentation: "Right facial droop, right arm weakness, dysphasia",
            ecg: "Rate 85bpm, atrial fibrillation. Controlled ventricular rate. No acute ischaemic changes.",
            redFlags: [
                "FAST positive (Face, Arm, Speech)",
                "Sudden onset",
                "Known AF not anticoagulated (cardioembolic source)",
                "Within thrombolysis window (<4.5hrs)",
                "Pre-alert to HASU",
                "Do not lower BP acutely",
                "Check BM (exclude hypoglycaemia)"
            ]
        },
        starterMessage: "*slurred speech* I... my arm... it won't work properly. My wife says my face looks funny. *trying to lift right arm but can't* What's happening to me? I feel strange..."
    },
    {
        id: "neuro-002",
        category: "neuro",
        dispatch: {
            name: "Emma",
            age: 35,
            gender: "F",
            chiefComplaint: "Seizure in public",
            details: "Collapsed and shaking, now confused",
            category: 2
        },
        patient: {
            condition: "Post-ictal following tonic-clonic seizure",
            history: "Epilepsy diagnosed age 15, usually well controlled",
            medications: "Levetiracetam, Lamotrigine",
            vitals: {
                hr: 95,
                bp: "135/85",
                rr: 20,
                spo2: 96,
                temp: 37.0,
                gcs: 13,
                bm: 4.8,
                pain: 0
            },
            presentation: "Confused, drowsy, bitten tongue, incontinent of urine",
            ecg: "Rate 95bpm, sinus rhythm. Normal ECG.",
            redFlags: [
                "Post-ictal confusion (expected but monitor)",
                "Low BM - could have triggered seizure",
                "Tongue injury",
                "Check medication compliance",
                "First seizure would need investigation",
                "Watch for further seizures (status risk)"
            ]
        },
        starterMessage: "*confused, slightly agitated* Where am I? What happened? *looking around* My head hurts... I feel really tired and my tongue is sore... Why are all these people looking at me?"
    },
    {
        id: "neuro-003",
        category: "neuro",
        dispatch: {
            name: "Oliver",
            age: 20,
            gender: "M",
            chiefComplaint: "Severe headache and neck stiffness",
            details: "Uni student, headache getting worse, feels very unwell",
            category: 1
        },
        patient: {
            condition: "Bacterial Meningitis",
            history: "Previously fit and well",
            medications: "None",
            vitals: {
                hr: 120,
                bp: "100/60",
                rr: 24,
                spo2: 97,
                temp: 39.5,
                gcs: 14,
                bm: 5.5,
                pain: 10
            },
            presentation: "Photophobia, neck stiffness, non-blanching rash on legs",
            ecg: "Rate 120bpm, sinus tachycardia. Normal ECG. Tachycardia secondary to sepsis.",
            redFlags: [
                "Non-blanching petechial/purpuric rash",
                "Meningism (neck stiffness, photophobia)",
                "Fever with severe headache",
                "Altered consciousness",
                "Signs of sepsis",
                "TIME CRITICAL - needs immediate antibiotics",
                "University student (close contacts)"
            ]
        },
        starterMessage: "*shielding eyes* Can you turn the light off? My head is killing me, it's the worst headache I've ever had. I feel so sick and my neck is really stiff. My flatmates made me call because I've got this rash on my legs that won't go away when you press it..."
    },
    {
        id: "neuro-004",
        category: "neuro",
        dispatch: {
            name: "Peter",
            age: 45,
            gender: "M",
            chiefComplaint: "Fall from ladder",
            details: "Head injury, may have lost consciousness briefly",
            category: 2
        },
        patient: {
            condition: "Traumatic Head Injury - potential intracranial bleed",
            history: "On warfarin for mechanical heart valve",
            medications: "Warfarin, Bisoprolol",
            vitals: {
                hr: 75,
                bp: "155/90",
                rr: 16,
                spo2: 98,
                temp: 36.6,
                gcs: 14,
                bm: 5.8,
                pain: 7
            },
            presentation: "Scalp laceration, brief LOC, on anticoagulant, vomited once",
            ecg: "Rate 75bpm, sinus rhythm. Normal ECG.",
            redFlags: [
                "Anticoagulant use (high risk of intracranial bleed)",
                "Loss of consciousness",
                "Vomiting post head injury",
                "Mechanism of injury (fall from height)",
                "GCS <15",
                "Needs CT head urgently",
                "Consider C-spine injury"
            ]
        },
        starterMessage: "I was up the ladder clearing the gutters and the next thing I knew I was on the ground. My wife says I was out cold for about a minute. I've got a splitting headache and I've been sick once. I take warfarin for my heart..."
    },
    {
        id: "neuro-005",
        category: "neuro",
        dispatch: {
            name: "Joan",
            age: 58,
            gender: "F",
            chiefComplaint: "Found confused",
            details: "Diabetic, acting strangely, won't eat",
            category: 2
        },
        patient: {
            condition: "Severe Hypoglycaemia",
            history: "Type 1 Diabetes, lives alone",
            medications: "Insulin (Novorapid and Lantus)",
            vitals: {
                hr: 100,
                bp: "145/85",
                rr: 18,
                spo2: 98,
                temp: 36.2,
                gcs: 12,
                bm: 1.8,
                pain: 0
            },
            presentation: "Confused, sweaty, tremulous, not able to follow commands properly",
            ecg: "Rate 100bpm, sinus tachycardia. Prolonged QT interval. Otherwise normal.",
            redFlags: [
                "BM <4mmol/L (severe <2.8)",
                "Altered consciousness",
                "Insulin-dependent diabetic",
                "Unable to take oral glucose",
                "Lives alone (delayed recognition)",
                "May need IV glucose or IM glucagon",
                "Look for cause (missed meal, infection, overdose)"
            ]
        },
        starterMessage: "*confused, speech slow* I don't... I don't know what's happening... *sweating* ...my neighbour came round and... *trailing off* ...I can't remember what I was doing. I feel really shaky..."
    },
    {
        id: "neuro-006",
        category: "neuro",
        dispatch: {
            name: "Helen",
            age: 42,
            gender: "F",
            chiefComplaint: "Worst headache of my life",
            details: "Sudden onset, vomiting, doesn't want lights on",
            category: 1
        },
        patient: {
            condition: "Subarachnoid Haemorrhage",
            history: "Migraines, smoker, on COCP",
            medications: "Sumatriptan PRN, Microgynon",
            vitals: {
                hr: 65,
                bp: "175/100",
                rr: 18,
                spo2: 98,
                temp: 37.0,
                gcs: 14,
                bm: 5.5,
                pain: 10
            },
            presentation: "Thunderclap headache, photophobia, neck stiffness, vomiting",
            ecg: "Rate 65bpm, sinus bradycardia. Widespread T wave inversion and QT prolongation (neurogenic changes).",
            redFlags: [
                "Thunderclap headache (maximal at onset)",
                "Different from usual migraines",
                "Neck stiffness (meningism)",
                "Photophobia",
                "Vomiting",
                "Hypertension",
                "TIME CRITICAL - CT head needed urgently",
                "Do not give triptans"
            ]
        },
        starterMessage: "*holding head, eyes closed* This headache is different... it came on like a thunderclap - literally the worst pain I've ever felt. I get migraines but this is nothing like them. I've been sick and I can't bear the light. My neck feels stiff too."
    },
    {
        id: "neuro-007",
        category: "neuro",
        dispatch: {
            name: "Dennis",
            age: 68,
            gender: "M",
            chiefComplaint: "Arm weakness and numbness",
            details: "Symptoms resolved after 20 minutes, back to normal now",
            category: 2
        },
        patient: {
            condition: "Transient Ischaemic Attack (TIA)",
            history: "Hypertension, high cholesterol, ex-smoker",
            medications: "Amlodipine, Simvastatin",
            vitals: {
                hr: 82,
                bp: "165/95",
                rr: 16,
                spo2: 98,
                temp: 36.6,
                gcs: 15,
                bm: 6.2,
                pain: 0
            },
            presentation: "Now asymptomatic, was FAST positive 40 minutes ago, resolved spontaneously",
            ecg: "Rate 82bpm, sinus rhythm with occasional ectopics. No AF detected.",
            redFlags: [
                "Recent neurological symptoms (high stroke risk)",
                "FAST was positive (even though resolved)",
                "Vascular risk factors",
                "ABCD2 score calculation needed",
                "High risk of completed stroke in first 48 hours",
                "Needs urgent TIA clinic/stroke assessment",
                "Start Aspirin 300mg"
            ]
        },
        starterMessage: "I feel fine now but about 40 minutes ago my left arm went completely numb and weak - I couldn't grip anything. My wife said my face looked droopy too. It lasted about 20 minutes and then everything went back to normal. I almost didn't call but my wife insisted."
    },
    {
        id: "neuro-008",
        category: "neuro",
        dispatch: {
            name: "Irene",
            age: 75,
            gender: "F",
            chiefComplaint: "Sudden dizziness and vomiting",
            details: "Room spinning, can't walk straight",
            category: 2
        },
        patient: {
            condition: "Posterior Circulation Stroke (Cerebellar)",
            history: "Hypertension, diabetes, previous TIA",
            medications: "Ramipril, Metformin, Clopidogrel",
            vitals: {
                hr: 88,
                bp: "180/95",
                rr: 18,
                spo2: 97,
                temp: 36.5,
                gcs: 14,
                bm: 8.5,
                pain: 0
            },
            presentation: "Vertigo, ataxia, nystagmus, dysarthria - HINTS exam abnormal",
            ecg: "Rate 88bpm, sinus rhythm. Left ventricular hypertrophy pattern.",
            redFlags: [
                "Sudden onset vertigo with vascular risk factors",
                "Cerebellar signs (ataxia)",
                "Nystagmus pattern (direction-changing suggests central)",
                "HINTS exam: skew deviation, direction-changing nystagmus",
                "Posterior circulation stroke often missed",
                "Can deteriorate rapidly (cerebellar swelling)",
                "Needs urgent stroke assessment"
            ]
        },
        starterMessage: "The room is spinning terribly... I tried to walk to the bathroom and I was all over the place, bouncing off the walls. I've been sick several times. I feel like I'm drunk. My speech feels a bit thick too. I've had a mini-stroke before..."
    },
    {
        id: "neuro-009",
        category: "neuro",
        dispatch: {
            name: "Colin",
            age: 55,
            gender: "M",
            chiefComplaint: "Severe facial pain",
            details: "Electric shock pain in face, been happening for weeks",
            category: 3
        },
        patient: {
            condition: "Trigeminal Neuralgia",
            history: "Nil significant, first presentation",
            medications: "Ibuprofen (not helping)",
            vitals: {
                hr: 80,
                bp: "140/85",
                rr: 16,
                spo2: 99,
                temp: 36.6,
                gcs: 15,
                bm: 5.5,
                pain: 10
            },
            presentation: "Paroxysmal stabbing pain in V2/V3 distribution, triggered by eating/talking",
            ecg: "Rate 80bpm, sinus rhythm. Normal ECG.",
            redFlags: [
                "Classic trigeminal neuralgia presentation",
                "Check for sensory loss (would suggest secondary cause)",
                "Age of onset (if young, consider MS)",
                "Bilateral symptoms concerning",
                "Needs neurology referral",
                "First-line treatment is carbamazepine",
                "May need MRI to exclude underlying cause"
            ]
        },
        starterMessage: "The pain is unbelievable - it's like electric shocks in my face. It comes in bursts and it's on the right side, from my cheek down to my jaw. It happens when I eat or even when the wind blows on my face. Nothing touches it - I've tried everything from the chemist."
    },
    {
        id: "neuro-010",
        category: "neuro",
        dispatch: {
            name: "Sandra",
            age: 38,
            gender: "F",
            chiefComplaint: "Numbness and tingling",
            details: "Legs feel numb, been getting worse over days",
            category: 3
        },
        patient: {
            condition: "Guillain-Barré Syndrome",
            history: "Had gastroenteritis 2 weeks ago, otherwise well",
            medications: "None",
            vitals: {
                hr: 85,
                bp: "125/80",
                rr: 18,
                spo2: 98,
                temp: 36.7,
                gcs: 15,
                bm: 5.2,
                pain: 3
            },
            presentation: "Ascending weakness and numbness, areflexia, difficulty walking",
            ecg: "Rate 85bpm, sinus rhythm. Normal ECG - but watch for autonomic involvement.",
            redFlags: [
                "Ascending weakness (started in feet, moving up)",
                "Recent infection (post-infectious trigger)",
                "Areflexia on examination",
                "Progressive over days",
                "MONITOR RESPIRATORY FUNCTION (FVC)",
                "Can progress to respiratory failure rapidly",
                "Needs urgent neurology admission"
            ]
        },
        starterMessage: "It started in my feet about 5 days ago - they felt tingly and numb. Now it's spreading up my legs and they feel weak. I'm struggling to walk and my legs feel like jelly. I had a bad stomach bug a couple of weeks ago but I thought I was over that."
    },

    // ==================== TRAUMA (10 scenarios) ====================
    {
        id: "trauma-001",
        category: "trauma",
        dispatch: {
            name: "Multiple patients",
            age: null,
            gender: null,
            chiefComplaint: "RTC - car vs lorry",
            details: "High speed, patient trapped, fire service on route",
            category: 1
        },
        patient: {
            condition: "Major Trauma - Multi-system injuries",
            history: "Unknown",
            medications: "Unknown",
            vitals: {
                hr: 130,
                bp: "85/50",
                rr: 28,
                spo2: 92,
                temp: "N/A",
                gcs: 10,
                bm: "N/A",
                pain: "Unable to assess"
            },
            presentation: "Trapped driver, suspected pelvic and chest injuries, declining consciousness",
            ecg: "Rate 130bpm, sinus tachycardia. No acute ischaemic changes. Tachycardia consistent with haemorrhagic shock.",
            redFlags: [
                "High-energy mechanism",
                "Entrapment",
                "Haemodynamic instability",
                "Declining GCS",
                "Suspected pelvic fracture (massive haemorrhage risk)",
                "Suspected chest injuries",
                "Major Trauma Centre destination",
                "Consider TXA"
            ]
        },
        starterMessage: "*Bystander on scene* The car went under the back of the lorry... the driver's trapped and there's blood everywhere. He was talking at first but now he's gone quiet. The fire brigade are on their way. There's a passenger too but she got out - she's sitting over there crying."
    },
    {
        id: "trauma-002",
        category: "trauma",
        dispatch: {
            name: "David",
            age: 35,
            gender: "M",
            chiefComplaint: "Fall from height",
            details: "Builder fallen from scaffolding approx 4 metres",
            category: 1
        },
        patient: {
            condition: "Fall from height - potential spinal injury",
            history: "Fit and well",
            medications: "None",
            vitals: {
                hr: 90,
                bp: "125/80",
                rr: 20,
                spo2: 98,
                temp: "N/A",
                gcs: 15,
                bm: "N/A",
                pain: 8
            },
            presentation: "Complaining of neck pain, paraesthesia in hands, being held still by colleagues",
            ecg: "Rate 90bpm, sinus rhythm. Normal ECG.",
            redFlags: [
                "Mechanism (fall >3 metres)",
                "Neck pain",
                "Paraesthesia (neurological involvement)",
                "Maintain inline immobilisation",
                "Full spinal precautions",
                "Log roll only if necessary",
                "Major Trauma Centre"
            ]
        },
        starterMessage: "*lying still, colleagues holding his head* Don't move me! My neck really hurts and I've got pins and needles in my hands. I landed on my back... the scaffolding just gave way. My mates are holding my head still like they learned on a first aid course."
    },
    {
        id: "trauma-003",
        category: "trauma",
        dispatch: {
            name: "Jayden",
            age: 25,
            gender: "M",
            chiefComplaint: "Stabbing",
            details: "Stab wound to chest, police on scene",
            category: 1
        },
        patient: {
            condition: "Penetrating Chest Trauma - potential tension pneumothorax",
            history: "Unknown",
            medications: "Unknown",
            vitals: {
                hr: 135,
                bp: "90/60",
                rr: 32,
                spo2: 88,
                temp: "N/A",
                gcs: 14,
                bm: "N/A",
                pain: 8
            },
            presentation: "Single stab wound left chest, absent breath sounds left, tracheal deviation",
            ecg: "Rate 135bpm, sinus tachycardia. Low voltage complexes. Electrical alternans (consider pericardial tamponade).",
            redFlags: [
                "Penetrating chest trauma",
                "Absent breath sounds (pneumothorax)",
                "Tracheal deviation (tension)",
                "Hypoxia and hypotension",
                "Needs immediate decompression",
                "Risk of cardiac tamponade (cardiac box wound)",
                "Trauma unit with thoracic surgery capability"
            ]
        },
        starterMessage: "*distressed, struggling to breathe* I can't breathe properly... they stabbed me... *pointing to left chest* ...it's right here. I feel like I'm going to pass out. Everything's going fuzzy..."
    },
    {
        id: "trauma-004",
        category: "trauma",
        dispatch: {
            name: "Catherine",
            age: 42,
            gender: "F",
            chiefComplaint: "Burns - house fire",
            details: "Escaped from house fire, burns to arms and face, smoke inhalation",
            category: 1
        },
        patient: {
            condition: "Major Burns with Smoke Inhalation",
            history: "Unknown",
            medications: "Unknown",
            vitals: {
                hr: 120,
                bp: "100/70",
                rr: 26,
                spo2: 91,
                temp: "N/A",
                gcs: 14,
                bm: "N/A",
                pain: 8
            },
            presentation: "Partial/full thickness burns to arms and face, singed nasal hairs, hoarse voice",
            ecg: "Rate 120bpm, sinus tachycardia. Normal ECG.",
            redFlags: [
                "Facial burns (airway risk)",
                "Smoke inhalation signs (hoarse voice, soot)",
                "Singed nasal hairs",
                "Enclosed space fire",
                "Consider early intubation",
                "Burns centre referral",
                "Calculate TBSA for fluid resuscitation",
                "Cool burns, warm patient"
            ]
        },
        starterMessage: "*coughing, voice hoarse* The smoke alarm went off and the kitchen was on fire... I tried to put it out but the flames got me... *holding burnt arms out* ...it hurts so much. I was coughing loads in there. Is my face burned? My children are at school thank God..."
    },
    {
        id: "trauma-005",
        category: "trauma",
        dispatch: {
            name: "Ryan",
            age: 28,
            gender: "M",
            chiefComplaint: "Cycling accident",
            details: "Hit by car, leg injury, bone visible",
            category: 2
        },
        patient: {
            condition: "Open Tibial Fracture",
            history: "Fit and well",
            medications: "None",
            vitals: {
                hr: 110,
                bp: "115/75",
                rr: 22,
                spo2: 99,
                temp: "N/A",
                gcs: 15,
                bm: "N/A",
                pain: 10
            },
            presentation: "Obvious open fracture right tibia, bone visible, moderate bleeding",
            ecg: "Rate 110bpm, sinus rhythm. Normal ECG. Tachycardia secondary to pain.",
            redFlags: [
                "Open fracture (high infection risk)",
                "Neurovascular status distally",
                "Photograph wound then cover",
                "IV antibiotics within 1 hour (Co-amoxiclav)",
                "Analgesia (likely Ketamine/Morphine)",
                "Realign if distal pulses absent",
                "Tetanus status"
            ]
        },
        starterMessage: "*in severe pain* A car pulled out on me! My leg... oh God don't look at it... I can see the bone! Please don't touch it! I was wearing my helmet so my head's okay but my leg... *groaning* ...it's the worst pain ever."
    },
    {
        id: "trauma-006",
        category: "trauma",
        dispatch: {
            name: "Mark",
            age: 19,
            gender: "M",
            chiefComplaint: "Diving accident",
            details: "Hit head diving into shallow water, can't feel legs",
            category: 1
        },
        patient: {
            condition: "Cervical Spine Injury - Spinal Cord Injury",
            history: "Fit and well, at party, alcohol involved",
            medications: "None",
            vitals: {
                hr: 55,
                bp: "85/50",
                rr: 18,
                spo2: 97,
                temp: "N/A",
                gcs: 15,
                bm: "N/A",
                pain: 5
            },
            presentation: "Neurogenic shock, no sensation/movement below shoulders, priapism",
            ecg: "Rate 55bpm, sinus bradycardia. Normal ECG. Bradycardia consistent with neurogenic shock.",
            redFlags: [
                "Complete paralysis below injury level",
                "Neurogenic shock (bradycardia + hypotension)",
                "Priapism (spinal cord injury sign)",
                "High cervical injury (respiratory compromise risk)",
                "Strict spinal immobilisation",
                "May need vasopressors",
                "Spinal cord injury centre"
            ]
        },
        starterMessage: "*calm but scared, lying by pool* I dived in and hit the bottom... I can't feel anything below my shoulders. I can't move my legs or my arms properly. My friends pulled me out of the water. I've had a few drinks... is this serious? Why can't I feel anything?"
    },
    {
        id: "trauma-007",
        category: "trauma",
        dispatch: {
            name: "Trevor",
            age: 52,
            gender: "M",
            chiefComplaint: "Assault - facial injuries",
            details: "Punched multiple times, bleeding from face",
            category: 2
        },
        patient: {
            condition: "Facial Fractures - Le Fort II pattern",
            history: "On aspirin for heart, otherwise well",
            medications: "Aspirin 75mg, Ramipril",
            vitals: {
                hr: 95,
                bp: "150/90",
                rr: 18,
                spo2: 98,
                temp: "N/A",
                gcs: 15,
                bm: "N/A",
                pain: 8
            },
            presentation: "Mid-face swelling, epistaxis, malocclusion, infraorbital numbness, CSF rhinorrhoea",
            ecg: "Rate 95bpm, sinus rhythm. Normal ECG.",
            redFlags: [
                "Mid-face mobility (Le Fort fracture)",
                "CSF leak (clear fluid from nose - skull base fracture)",
                "Infraorbital numbness (nerve involvement)",
                "Malocclusion (jaw alignment)",
                "Airway compromise risk with swelling",
                "On anticoagulant",
                "Needs maxillofacial assessment"
            ]
        },
        starterMessage: "*holding blood-soaked towel to face* Some bloke jumped me outside the pub... hit me in the face loads of times. My nose is bleeding badly and my cheek feels completely numb. There's clear watery stuff coming from my nose too. My teeth don't line up properly when I bite down."
    },
    {
        id: "trauma-008",
        category: "trauma",
        dispatch: {
            name: "Sophie",
            age: 8,
            gender: "F",
            chiefComplaint: "Arm injury",
            details: "Fell off monkey bars, arm bent oddly, very upset",
            category: 3
        },
        patient: {
            condition: "Supracondylar Fracture of Humerus",
            history: "Normally fit and well child",
            medications: "None",
            vitals: {
                hr: 120,
                bp: "N/A",
                rr: 24,
                spo2: 99,
                temp: "N/A",
                gcs: 15,
                bm: "N/A",
                pain: 9
            },
            presentation: "Obvious deformity above elbow, swelling, hand pale and cool",
            ecg: "N/A - paediatric trauma, not indicated.",
            redFlags: [
                "Supracondylar fracture (most common paediatric elbow fracture)",
                "Neurovascular compromise (pale, cool hand)",
                "Check radial pulse and capillary refill",
                "Check median nerve function (OK sign)",
                "High risk of Volkmann's ischaemic contracture",
                "Needs urgent orthopaedic assessment",
                "Splint in position found if pulseless"
            ]
        },
        starterMessage: "*Mother speaking, child crying loudly* She fell off the monkey bars at the park. Her arm is bent in a horrible way just above the elbow. She's in so much pain. Her hand looks really pale and she says it feels tingly. Please help her!"
    },
    {
        id: "trauma-009",
        category: "trauma",
        dispatch: {
            name: "Brian",
            age: 45,
            gender: "M",
            chiefComplaint: "Crushed leg",
            details: "Leg trapped under car while changing tyre",
            category: 2
        },
        patient: {
            condition: "Crush Injury - Lower Limb",
            history: "Fit and well",
            medications: "None",
            vitals: {
                hr: 105,
                bp: "135/85",
                rr: 20,
                spo2: 98,
                temp: "N/A",
                gcs: 15,
                bm: "N/A",
                pain: 8
            },
            presentation: "Leg trapped for approximately 30 minutes, swollen and bruised, jack collapsed",
            ecg: "Rate 105bpm, sinus rhythm. Normal QRS. Peaked T waves may develop post-release.",
            redFlags: [
                "Prolonged crush (>30 mins significant)",
                "Risk of crush syndrome on release",
                "Hyperkalaemia risk (cardiac arrhythmias)",
                "Rhabdomyolysis risk",
                "Fluid resuscitation before release",
                "Consider calcium gluconate pre-release",
                "Monitor ECG during and after release"
            ]
        },
        starterMessage: "The jack slipped while I was under the car changing a tyre... my leg's been stuck for about half an hour. The neighbours managed to get the jack back up so it's not crushing me anymore but my leg is still trapped. It's really swollen and looks bruised already."
    },
    {
        id: "trauma-010",
        category: "trauma",
        dispatch: {
            name: "Kerry",
            age: 31,
            gender: "F",
            chiefComplaint: "Horse kicked her",
            details: "Kicked in abdomen by horse, winded, feels unwell",
            category: 2
        },
        patient: {
            condition: "Blunt Abdominal Trauma - Splenic Laceration",
            history: "Fit and well, experienced rider",
            medications: "None",
            vitals: {
                hr: 115,
                bp: "95/65",
                rr: 24,
                spo2: 98,
                temp: 36.5,
                gcs: 15,
                bm: "N/A",
                pain: 8
            },
            presentation: "LUQ tenderness, referred pain to left shoulder (Kehr's sign), early shock",
            ecg: "Rate 115bpm, sinus tachycardia. Normal ECG.",
            redFlags: [
                "Mechanism (high force from horse kick)",
                "Left upper quadrant pain",
                "Kehr's sign (left shoulder tip pain - splenic injury)",
                "Signs of internal bleeding (tachycardia, hypotension)",
                "Spleen most commonly injured organ in blunt abdo trauma",
                "TIME CRITICAL - needs CT and possible surgery",
                "Do not delay on scene"
            ]
        },
        starterMessage: "The horse got spooked and kicked out... caught me right in the stomach. I was winded at first but now the pain is mainly up here on the left side of my tummy. Weirdly my left shoulder hurts too even though it didn't touch me. I feel a bit sick and lightheaded."
    },

    // ==================== PAEDIATRIC (10 scenarios) ====================
    {
        id: "paed-001",
        category: "paediatric",
        dispatch: {
            name: "Lily",
            age: 2,
            gender: "F",
            chiefComplaint: "Difficulty breathing",
            details: "Barking cough, noisy breathing, distressed",
            category: 2
        },
        patient: {
            condition: "Moderate Croup",
            history: "Previous episode aged 18 months",
            medications: "None regular",
            vitals: {
                hr: 140,
                bp: "N/A",
                rr: 40,
                spo2: 94,
                temp: 37.8,
                gcs: 15,
                bm: "N/A",
                pain: "N/A"
            },
            presentation: "Inspiratory stridor, barking cough, mild intercostal recession",
            ecg: "N/A - paediatric patient, ECG not indicated unless cardiac concern",
            redFlags: [
                "Stridor at rest (moderate-severe)",
                "Recession (increased work of breathing)",
                "Hypoxia",
                "Decreasing level of consciousness",
                "Drooling or unable to swallow",
                "Toxic appearance (consider epiglottitis/tracheitis)",
                "Oral dexamethasone is first line"
            ]
        },
        starterMessage: "*Mother speaking, child crying in background with barking cough* She's making this horrible barking noise when she coughs and she's really struggling to breathe. It started in the night and she's got this weird noise when she breathes in. She had this before when she was smaller. She's only 2... I'm so scared."
    },
    {
        id: "paed-002",
        category: "paediatric",
        dispatch: {
            name: "Baby Thomas",
            age: 0.5,
            gender: "M",
            chiefComplaint: "Breathing difficulty",
            details: "6 month old, not feeding, fast breathing",
            category: 2
        },
        patient: {
            condition: "Bronchiolitis",
            history: "Born at term, normally fit and well, sibling has cold",
            medications: "None",
            vitals: {
                hr: 160,
                bp: "N/A",
                rr: 60,
                spo2: 92,
                temp: 37.5,
                gcs: 15,
                bm: "N/A",
                pain: "N/A"
            },
            presentation: "Subcostal recession, nasal flaring, poor feeding, bilateral wheeze and crackles",
            ecg: "N/A - infant, ECG not indicated",
            redFlags: [
                "Age <3 months",
                "Prematurity or chronic lung disease",
                "Poor feeding (<50% normal)",
                "Apnoeas",
                "Severe recession",
                "Hypoxia <92%",
                "Exhaustion",
                "Mainly supportive care - oxygen, NG feeds if needed"
            ]
        },
        starterMessage: "*Mother speaking* He started with a cold a few days ago but now he's breathing really fast and his tummy keeps sucking in. He won't take his bottle properly - he takes a few sucks then has to stop to breathe. He's only 6 months old. His big sister had a cold last week."
    },
    {
        id: "paed-003",
        category: "paediatric",
        dispatch: {
            name: "Charlie",
            age: 1.5,
            gender: "M",
            chiefComplaint: "Seizure",
            details: "18 month old, had fit at home, now drowsy",
            category: 1
        },
        patient: {
            condition: "Febrile Convulsion - Simple",
            history: "Normally fit and well, been unwell with viral illness",
            medications: "Calpol given by parents",
            vitals: {
                hr: 150,
                bp: "N/A",
                rr: 30,
                spo2: 98,
                temp: 39.2,
                gcs: 13,
                bm: 5.5,
                pain: "N/A"
            },
            presentation: "Post-ictal, drowsy but rousable, hot to touch, no rash",
            ecg: "N/A - paediatric patient",
            redFlags: [
                "Duration >5 mins (complex)",
                "Focal features (complex)",
                "Multiple seizures in 24hrs (complex)",
                "Prolonged post-ictal period",
                "Signs of meningitis (check for rash, neck stiffness)",
                "Age <6 months or >5 years (less likely simple febrile)",
                "First febrile convulsion needs assessment"
            ]
        },
        starterMessage: "*Father speaking, clearly shaken* He just started shaking all over - his whole body went stiff and then he was jerking. His eyes rolled back. It lasted about 2 minutes I think. He's been hot all day with a cold. He's really sleepy now. Has he got meningitis? Is he going to be okay?"
    },
    {
        id: "paed-004",
        category: "paediatric",
        dispatch: {
            name: "Amelia",
            age: 4,
            gender: "F",
            chiefComplaint: "High fever and rash",
            details: "Very unwell, mottled skin, parents concerned",
            category: 1
        },
        patient: {
            condition: "Paediatric Sepsis - Meningococcal Disease",
            history: "Previously fit and well",
            medications: "Calpol and Nurofen given",
            vitals: {
                hr: 170,
                bp: "75/40",
                rr: 45,
                spo2: 95,
                temp: 39.8,
                gcs: 13,
                bm: 3.5,
                pain: "N/A"
            },
            presentation: "Mottled, cold peripheries, non-blanching rash spreading, reduced consciousness",
            ecg: "Rate 170bpm, sinus tachycardia. Otherwise normal for age.",
            redFlags: [
                "Non-blanching purpuric rash",
                "Mottled/cold peripheries",
                "Prolonged capillary refill",
                "Hypotension for age",
                "Altered consciousness",
                "Hypoglycaemia",
                "TIME CRITICAL - IM Benzylpenicillin if available",
                "Aggressive fluid resuscitation"
            ]
        },
        starterMessage: "*Mother speaking, very distressed* She was fine this morning and now look at her! She's got this rash all over that won't go away when I press it. Her hands and feet are freezing but she's burning up. She won't talk to me properly and she keeps being sick. Please help her!"
    },
    {
        id: "paed-005",
        category: "paediatric",
        dispatch: {
            name: "Sophie",
            age: 3,
            gender: "F",
            chiefComplaint: "Injury - ?NAI",
            details: "Nursery concerned, multiple bruises, child withdrawn",
            category: 3
        },
        patient: {
            condition: "Safeguarding Concern - Non-Accidental Injury",
            history: "Previous A&E attendance for 'fall', known to social services",
            medications: "None",
            vitals: {
                hr: 110,
                bp: "N/A",
                rr: 22,
                spo2: 99,
                temp: 36.8,
                gcs: 15,
                bm: "N/A",
                pain: "N/A"
            },
            presentation: "Multiple bruises of different ages, withdrawn behaviour, inconsistent history",
            ecg: "N/A - not indicated",
            redFlags: [
                "Bruises in non-mobile child or unusual locations",
                "Multiple bruises of different ages",
                "Inconsistent or changing history",
                "Delayed presentation",
                "Previous attendances with injuries",
                "Child's behaviour (withdrawn, flinching)",
                "Document carefully, do not clean injuries",
                "Safeguarding referral mandatory"
            ]
        },
        starterMessage: "*Nursery manager speaking* We're really worried about Sophie. She came in today with bruises on her arms and back - different colours like they happened at different times. She says she fell but they don't look like fall injuries to me. She's been very quiet and flinches when adults get close. Her mum's boyfriend picks her up sometimes..."
    },
    {
        id: "paed-006",
        category: "paediatric",
        dispatch: {
            name: "Jake",
            age: 8,
            gender: "M",
            chiefComplaint: "Asthma attack",
            details: "Known asthmatic, blue inhaler not working, PE lesson",
            category: 2
        },
        patient: {
            condition: "Acute Severe Asthma - Paediatric",
            history: "Asthma, previous hospital admission, allergies to pollen and cats",
            medications: "Salbutamol inhaler, Beclometasone inhaler",
            vitals: {
                hr: 135,
                bp: "N/A",
                rr: 35,
                spo2: 90,
                temp: 36.6,
                gcs: 15,
                bm: "N/A",
                pain: 0
            },
            presentation: "Widespread wheeze, accessory muscle use, too breathless for full sentences, agitated",
            ecg: "N/A - paediatric patient",
            redFlags: [
                "SpO2 <92%",
                "Can't complete sentences",
                "Too breathless to talk or eat",
                "Accessory muscle use",
                "Agitation (hypoxia sign)",
                "Previous hospital admission",
                "Silent chest = life-threatening",
                "Nebulised salbutamol + ipratropium"
            ]
        },
        starterMessage: "*School teacher speaking, child wheezing heavily in background* Jake's having a really bad asthma attack. He was doing PE and just couldn't breathe. His inhaler isn't helping. He's had asthma attacks before but this one seems worse. He can barely speak he's breathing so hard."
    },
    {
        id: "paed-007",
        category: "paediatric",
        dispatch: {
            name: "Baby Mia",
            age: 0.25,
            gender: "F",
            chiefComplaint: "Floppy baby",
            details: "3 month old, not responding normally, feels cold",
            category: 1
        },
        patient: {
            condition: "Neonatal Sepsis",
            history: "Born at term, bottle fed, had a cold 2 days ago",
            medications: "None",
            vitals: {
                hr: 180,
                bp: "N/A",
                rr: 55,
                spo2: 94,
                temp: 35.8,
                gcs: "Reduced responsiveness",
                bm: 2.5,
                pain: "N/A"
            },
            presentation: "Hypotonic, poor responsiveness, mottled, hypothermic, not feeding",
            ecg: "N/A - infant",
            redFlags: [
                "Under 3 months with any red flags",
                "Hypothermia (temp <36°C - worse than fever in infants)",
                "Hypotonia (floppy)",
                "Poor responsiveness",
                "Mottled skin",
                "Hypoglycaemia",
                "Not feeding",
                "TIME CRITICAL - needs IV antibiotics urgently"
            ]
        },
        starterMessage: "*Mother speaking, very frightened* Something's really wrong with her. She's not acting right - she's all floppy and won't look at me properly. She feels really cold even though she's wrapped up. She hasn't had her bottle for hours and she's not crying like she normally does."
    },
    {
        id: "paed-008",
        category: "paediatric",
        dispatch: {
            name: "Tyler",
            age: 12,
            gender: "M",
            chiefComplaint: "Diabetic - feeling unwell",
            details: "Type 1 diabetic, vomiting, breathing fast, acting confused",
            category: 2
        },
        patient: {
            condition: "Diabetic Ketoacidosis (DKA)",
            history: "Type 1 Diabetes diagnosed age 6, poor compliance recently",
            medications: "Insulin (not taking regularly per mother)",
            vitals: {
                hr: 125,
                bp: "100/60",
                rr: 32,
                spo2: 99,
                temp: 37.2,
                gcs: 14,
                bm: 28.5,
                pain: 5
            },
            presentation: "Kussmaul breathing, acetone breath, dehydrated, abdominal pain, drowsy",
            ecg: "Rate 125bpm, sinus tachycardia. Peaked T waves (hyperkalaemia possible).",
            redFlags: [
                "Very high blood glucose",
                "Kussmaul breathing (deep, sighing)",
                "Acetone/pear drop smell on breath",
                "Dehydration",
                "Altered consciousness",
                "Vomiting",
                "Abdominal pain mimicking surgical abdomen",
                "Needs IV fluids and insulin sliding scale"
            ]
        },
        starterMessage: "*Mother speaking* Tyler's been really unwell since yesterday. He keeps being sick and his breath smells really weird - sort of sweet and fruity. He's breathing really heavily and he's not making sense when he talks. He's diabetic but I don't think he's been taking his insulin properly lately."
    },
    {
        id: "paed-009",
        category: "paediatric",
        dispatch: {
            name: "Oscar",
            age: 5,
            gender: "M",
            chiefComplaint: "Swallowed button battery",
            details: "Mum thinks he swallowed battery from toy, gagging",
            category: 2
        },
        patient: {
            condition: "Button Battery Ingestion",
            history: "Previously fit and well, curious child",
            medications: "None",
            vitals: {
                hr: 115,
                bp: "N/A",
                rr: 22,
                spo2: 99,
                temp: 36.7,
                gcs: 15,
                bm: "N/A",
                pain: 2
            },
            presentation: "Drooling, intermittent gagging, pointing to chest, approximately 20mm battery suspected",
            ecg: "N/A - paediatric patient",
            redFlags: [
                "Button battery ingestion is TIME CRITICAL",
                "Oesophageal burns start within 2 hours",
                "Battery >20mm more likely to lodge in oesophagus",
                "Drooling/gagging suggests oesophageal location",
                "Do NOT induce vomiting",
                "Needs urgent X-ray and endoscopic removal",
                "Honey may help if immediately available and >12 months old",
                "Do NOT delay transport"
            ]
        },
        starterMessage: "*Mother speaking, worried* I think Oscar swallowed a battery from one of his toys - it's one of those round flat ones. He keeps pointing to his chest and he's dribbling a lot. He gagged a few times but nothing came up. I found the toy with the battery compartment open. It happened about 30 minutes ago."
    },
    {
        id: "paed-010",
        category: "paediatric",
        dispatch: {
            name: "Ella",
            age: 10,
            gender: "F",
            chiefComplaint: "Tummy pain and not eating",
            details: "Pain for 2 days, worse today, not eating or drinking",
            category: 3
        },
        patient: {
            condition: "Appendicitis - Paediatric",
            history: "Normally fit and well",
            medications: "Calpol given by mum",
            vitals: {
                hr: 110,
                bp: "105/65",
                rr: 20,
                spo2: 99,
                temp: 38.0,
                gcs: 15,
                bm: 5.8,
                pain: 7
            },
            presentation: "RIF tenderness, guarding, pain on walking/jumping, anorexia",
            ecg: "N/A - paediatric patient",
            redFlags: [
                "Pain migration (periumbilical to RIF)",
                "Guarding and rebound",
                "Anorexia (not eating)",
                "Low-grade fever",
                "Pain on movement (walks hunched)",
                "Hopping test positive",
                "Higher perforation risk in children (atypical presentation)"
            ]
        },
        starterMessage: "*Ella speaking, holding tummy* My tummy really hurts. It started near my belly button but now it's more down here on the right. It hurts more when I walk or jump. I don't want to eat anything and I've been sick once. *Mother adds* She's been hot and she never refuses food normally."
    },

    // ==================== OBSTETRIC (10 scenarios) ====================
    {
        id: "obs-001",
        category: "obstetric",
        dispatch: {
            name: "Hannah",
            age: 28,
            gender: "F",
            chiefComplaint: "Labour - baby coming",
            details: "Full term, contractions every 2 mins, urge to push",
            category: 1
        },
        patient: {
            condition: "Imminent Delivery",
            history: "First pregnancy, 39+4 weeks, planned home birth but midwife not arrived",
            medications: "Pregnancy vitamins",
            vitals: {
                hr: 95,
                bp: "125/80",
                rr: 22,
                spo2: 99,
                temp: 37.0,
                gcs: 15,
                bm: "N/A",
                pain: 10
            },
            presentation: "Contracting every 2 minutes, bulging perineum, vertex visible",
            ecg: "N/A - not indicated in normal labour",
            redFlags: [
                "Cord prolapse (check for)",
                "Abnormal presentation (check vertex visible)",
                "Meconium stained liquor",
                "Prolonged second stage",
                "Shoulder dystocia",
                "Postpartum haemorrhage",
                "Prepare for neonatal resuscitation",
                "Skin to skin and delayed cord clamping if normal"
            ]
        },
        starterMessage: "*between contractions* The baby's coming NOW! I can feel it... *groaning* ...I need to push! My midwife was supposed to be here but she's stuck in traffic. My waters broke an hour ago and the contractions just got really strong really quickly. I can feel the head!"
    },
    {
        id: "obs-002",
        category: "obstetric",
        dispatch: {
            name: "Rebecca",
            age: 32,
            gender: "F",
            chiefComplaint: "Heavy bleeding after birth",
            details: "Just delivered at home, midwife present, soaking through pads",
            category: 1
        },
        patient: {
            condition: "Postpartum Haemorrhage - Uterine Atony",
            history: "Third pregnancy, big baby 4.2kg, prolonged labour",
            medications: "Syntometrine given by midwife",
            vitals: {
                hr: 125,
                bp: "90/55",
                rr: 24,
                spo2: 97,
                temp: 36.8,
                gcs: 15,
                bm: "N/A",
                pain: 3
            },
            presentation: "Boggy uterus, estimated blood loss 1.5L, pale and clammy",
            ecg: "Rate 125bpm, sinus tachycardia. Tachycardia secondary to hypovolaemia.",
            redFlags: [
                "Uterine atony (boggy uterus)",
                "EBL >500ml (PPH definition)",
                "Haemodynamic compromise",
                "Rubbing up the uterus",
                "Empty the bladder",
                "Further uterotonics",
                "IV access and fluids",
                "May need surgical intervention"
            ]
        },
        starterMessage: "*Midwife speaking* I need emergency backup - I've got a PPH. Mum delivered about 20 minutes ago, big baby, placenta's out but the uterus isn't contracting. I've given Syntometrine and I'm rubbing up the uterus but she's still bleeding heavily. She's gone really pale and her pulse is thready. Estimated loss over a litre."
    },
    {
        id: "obs-003",
        category: "obstetric",
        dispatch: {
            name: "Sarah",
            age: 35,
            gender: "F",
            chiefComplaint: "Pregnant woman fitting",
            details: "38 weeks pregnant, had seizure, still confused",
            category: 1
        },
        patient: {
            condition: "Eclampsia",
            history: "First pregnancy, pre-eclampsia diagnosed last week, BP been high",
            medications: "Labetalol started 5 days ago",
            vitals: {
                hr: 105,
                bp: "190/120",
                rr: 20,
                spo2: 96,
                temp: 37.2,
                gcs: 12,
                bm: "N/A",
                pain: "Unable to assess"
            },
            presentation: "Post-ictal, severely hypertensive, brisk reflexes, proteinuria +++",
            ecg: "Rate 105bpm, sinus tachycardia. Left ventricular hypertrophy pattern. No acute changes.",
            redFlags: [
                "Seizure in pregnancy (eclampsia until proven otherwise)",
                "Severe hypertension",
                "Signs of end-organ damage",
                "Risk of further seizures",
                "Risk of placental abruption",
                "IV Magnesium Sulphate is treatment of choice",
                "Delivery is definitive treatment",
                "Obstetric emergency - consultant led unit"
            ]
        },
        starterMessage: "*Husband speaking* She just started fitting! Her whole body was shaking for about two minutes. She's 38 weeks pregnant and the doctors said her blood pressure was high last week. She's been having bad headaches and seeing spots. She's still not making sense... Sarah, can you hear me?"
    },
    {
        id: "obs-004",
        category: "obstetric",
        dispatch: {
            name: "Amy",
            age: 26,
            gender: "F",
            chiefComplaint: "Waters broken - can see cord",
            details: "34 weeks pregnant, umbilical cord visible",
            category: 1
        },
        patient: {
            condition: "Cord Prolapse",
            history: "Second pregnancy, baby was breech at last scan, premature",
            medications: "None",
            vitals: {
                hr: 100,
                bp: "120/75",
                rr: 18,
                spo2: 99,
                temp: 36.8,
                gcs: 15,
                bm: "N/A",
                pain: 4
            },
            presentation: "Cord visible at introitus, pulsating, mother distressed",
            ecg: "N/A - not indicated",
            redFlags: [
                "Visible/palpable cord",
                "OBSTETRIC EMERGENCY",
                "Relieve pressure on cord (all fours, knees to chest)",
                "Keep cord warm and moist (do not push back)",
                "Fill bladder to elevate presenting part",
                "Emergency caesarean section needed",
                "Pre-alert obstetric unit",
                "Monitor cord pulsation"
            ]
        },
        starterMessage: "*panicking* Something's really wrong! My waters just broke and I went to the toilet and there's something coming out - it looks like the cord! I can see it! I'm only 34 weeks - the baby was breech. What do I do? Is my baby going to die?"
    },
    {
        id: "obs-005",
        category: "obstetric",
        dispatch: {
            name: "Lucy",
            age: 29,
            gender: "F",
            chiefComplaint: "Bleeding in pregnancy",
            details: "30 weeks pregnant, woke with bleeding, no pain",
            category: 2
        },
        patient: {
            condition: "Placenta Praevia with Haemorrhage",
            history: "Third pregnancy, known low-lying placenta on 20-week scan",
            medications: "Pregnancy vitamins, iron supplements",
            vitals: {
                hr: 105,
                bp: "105/70",
                rr: 20,
                spo2: 98,
                temp: 36.6,
                gcs: 15,
                bm: "N/A",
                pain: 0
            },
            presentation: "Painless bright red vaginal bleeding, known placenta praevia",
            ecg: "Rate 105bpm, sinus tachycardia.",
            redFlags: [
                "Painless bleeding in third trimester",
                "Known low-lying placenta",
                "Bright red blood",
                "Do NOT perform vaginal examination",
                "Risk of massive haemorrhage",
                "Tachycardia suggesting volume loss",
                "Needs emergency obstetric assessment",
                "May need emergency caesarean section"
            ]
        },
        starterMessage: "I woke up in a pool of blood - it's bright red and there's quite a lot of it. I'm 30 weeks pregnant. I don't have any pain which seems strange. They told me at my scan that my placenta was low down and might cause problems. I'm really scared for the baby."
    },
    {
        id: "obs-006",
        category: "obstetric",
        dispatch: {
            name: "Jennifer",
            age: 31,
            gender: "F",
            chiefComplaint: "Severe abdominal pain in pregnancy",
            details: "36 weeks pregnant, sudden severe pain, feels unwell",
            category: 1
        },
        patient: {
            condition: "Placental Abruption",
            history: "Second pregnancy, smokes, had mild pre-eclampsia",
            medications: "Aspirin 75mg (for pre-eclampsia prevention)",
            vitals: {
                hr: 120,
                bp: "160/100",
                rr: 24,
                spo2: 97,
                temp: 36.8,
                gcs: 15,
                bm: "N/A",
                pain: 10
            },
            presentation: "Woody hard uterus, constant severe pain, some dark vaginal bleeding, reduced fetal movements",
            ecg: "Rate 120bpm, sinus tachycardia.",
            redFlags: [
                "Sudden onset severe constant pain",
                "Uterus hard and tender ('woody')",
                "Dark blood loss (may be concealed)",
                "Hypertension and pre-eclampsia risk factor",
                "Smoker (risk factor)",
                "Reduced fetal movements",
                "Can lead to DIC and fetal death",
                "TIME CRITICAL - needs emergency delivery"
            ]
        },
        starterMessage: "*in severe pain, clutching abdomen* The pain came on suddenly about 20 minutes ago and it's constant - it's not coming in waves like contractions. My bump feels really hard and I've had a bit of dark blood. The baby hasn't moved much since it started. Something's really wrong, I know it is."
    },
    {
        id: "obs-007",
        category: "obstetric",
        dispatch: {
            name: "Michelle",
            age: 33,
            gender: "F",
            chiefComplaint: "Shoulder stuck - baby won't come out",
            details: "Baby's head delivered but body won't come, midwife requesting help",
            category: 1
        },
        patient: {
            condition: "Shoulder Dystocia",
            history: "Second baby, first was 4.5kg, gestational diabetes this pregnancy",
            medications: "Metformin for gestational diabetes",
            vitals: {
                hr: 110,
                bp: "130/85",
                rr: 28,
                spo2: 98,
                temp: 37.0,
                gcs: 15,
                bm: "N/A",
                pain: 10
            },
            presentation: "Head delivered, turtle sign (head retracting), no restitution, shoulder impacted",
            ecg: "N/A - not indicated",
            redFlags: [
                "OBSTETRIC EMERGENCY - 5-7 minute window",
                "McRoberts position (knees to chest)",
                "Suprapubic pressure (NOT fundal pressure)",
                "Remove legs from lithotomy",
                "Consider internal manoeuvres",
                "Do NOT pull on head",
                "Risk of brachial plexus injury",
                "Risk of fetal hypoxia",
                "May need episiotomy"
            ]
        },
        starterMessage: "*Midwife speaking, urgent* I've got a shoulder dystocia! The head's out but the shoulders are stuck. I need help NOW. I've called for McRoberts and suprapubic pressure but the baby isn't coming. The head delivered about 2 minutes ago. First baby was big and she's got gestational diabetes."
    },
    {
        id: "obs-008",
        category: "obstetric",
        dispatch: {
            name: "Kate",
            age: 24,
            gender: "F",
            chiefComplaint: "Bleeding in early pregnancy",
            details: "8 weeks pregnant, heavy bleeding and cramps",
            category: 2
        },
        patient: {
            condition: "Miscarriage - Incomplete",
            history: "First pregnancy, confirmed on scan last week",
            medications: "Folic acid",
            vitals: {
                hr: 95,
                bp: "115/75",
                rr: 18,
                spo2: 99,
                temp: 36.7,
                gcs: 15,
                bm: "N/A",
                pain: 6
            },
            presentation: "Heavy vaginal bleeding with clots, crampy lower abdominal pain, cervix open",
            ecg: "N/A - not indicated",
            redFlags: [
                "Always consider ectopic (even with confirmed IU pregnancy - heterotopic possible)",
                "Amount of blood loss",
                "Signs of haemodynamic compromise",
                "Products of conception passed?",
                "Infection risk if prolonged",
                "Rhesus status (may need Anti-D)",
                "Psychological support important",
                "May need surgical management"
            ]
        },
        starterMessage: "*crying* I'm losing my baby... there's so much blood and I keep passing clots. I was 8 weeks pregnant - we only just found out. The pain is like really bad period cramps. Is there anything you can do to save my baby? This is my first pregnancy..."
    },
    {
        id: "obs-009",
        category: "obstetric",
        dispatch: {
            name: "Natalie",
            age: 27,
            gender: "F",
            chiefComplaint: "Baby coming - can see bottom first",
            details: "39 weeks pregnant, buttocks presenting, no midwife",
            category: 1
        },
        patient: {
            condition: "Breech Delivery - Imminent",
            history: "First pregnancy, declined ECV at 37 weeks, planned caesarean next week",
            medications: "Pregnancy vitamins",
            vitals: {
                hr: 100,
                bp: "125/80",
                rr: 24,
                spo2: 99,
                temp: 37.0,
                gcs: 15,
                bm: "N/A",
                pain: 10
            },
            presentation: "Buttocks visible at introitus, mother pushing involuntarily",
            ecg: "N/A - not indicated",
            redFlags: [
                "Breech presentation requires experienced management",
                "Do NOT pull on baby - 'hands off the breech'",
                "Allow passive delivery of buttocks and legs",
                "Keep baby's back anterior",
                "Head is last to deliver - risk of entrapment",
                "Mauriceau-Smellie-Veit manoeuvre for head",
                "Neonatal resuscitation likely needed",
                "Pre-alert obstetric unit"
            ]
        },
        starterMessage: "*panicking, between contractions* The baby's coming but it's the wrong way round - I can feel the bottom! I was supposed to have a caesarean next week because the baby was breech. My contractions just started an hour ago and now it's coming! I can't stop pushing!"
    },
    {
        id: "obs-010",
        category: "obstetric",
        dispatch: {
            name: "Emma",
            age: 30,
            gender: "F",
            chiefComplaint: "Headache and swelling in pregnancy",
            details: "34 weeks pregnant, bad headache, face and hands swollen",
            category: 2
        },
        patient: {
            condition: "Severe Pre-eclampsia",
            history: "First pregnancy, BP noted to be borderline at last midwife appointment",
            medications: "None",
            vitals: {
                hr: 90,
                bp: "175/110",
                rr: 18,
                spo2: 98,
                temp: 36.8,
                gcs: 15,
                bm: "N/A",
                pain: 8
            },
            presentation: "Severe headache, visual disturbances, facial and hand oedema, RUQ pain, brisk reflexes",
            ecg: "Rate 90bpm, sinus rhythm. Left ventricular hypertrophy pattern.",
            redFlags: [
                "Severe hypertension (>160/110)",
                "Headache (cerebral involvement)",
                "Visual disturbances (flashing lights)",
                "RUQ/epigastric pain (liver involvement - HELLP risk)",
                "Facial oedema (not just ankles)",
                "Hyperreflexia",
                "At risk of progression to eclampsia",
                "Needs hospital for BP control and monitoring"
            ]
        },
        starterMessage: "I've got a terrible headache that won't go away with paracetamol. I keep seeing flashing lights and my face looks really puffy - look at my hands, my rings won't come off. I've got this pain under my ribs on the right too. I'm 34 weeks pregnant. My midwife said my blood pressure was a bit high last week."
    },

    // ==================== MENTAL HEALTH (10 scenarios) ====================
    {
        id: "mh-001",
        category: "mental-health",
        dispatch: {
            name: "Jessica",
            age: 18,
            gender: "F",
            chiefComplaint: "Self harm injuries",
            details: "Multiple cuts to arms, distressed, friend called",
            category: 2
        },
        patient: {
            condition: "Self-Harm - Acute emotional distress",
            history: "Depression, previous self-harm, under CAMHS",
            medications: "Sertraline 50mg",
            vitals: {
                hr: 90,
                bp: "115/70",
                rr: 16,
                spo2: 99,
                temp: 36.6,
                gcs: 15,
                bm: "N/A",
                pain: 3
            },
            presentation: "Multiple superficial lacerations to forearms, no active bleeding, very distressed",
            ecg: "N/A - not indicated unless overdose suspected",
            redFlags: [
                "Assess depth and extent of wounds",
                "Assess current suicidal ideation",
                "Recent escalation in self-harm",
                "Access to means",
                "Protective factors",
                "Treat wounds, non-judgemental approach",
                "Mental health assessment needed",
                "Safety planning"
            ]
        },
        starterMessage: "*crying, holding arms* I'm sorry... I didn't know what else to do. It all just got too much. My friend found me and she called you... I don't want to go to hospital. I just want the pain to stop. Everything is falling apart."
    },
    {
        id: "mh-002",
        category: "mental-health",
        dispatch: {
            name: "David",
            age: 45,
            gender: "M",
            chiefComplaint: "Suicidal thoughts",
            details: "Family concerned, expressing wish to die, isolated himself",
            category: 2
        },
        patient: {
            condition: "Suicidal Ideation - Acute Crisis",
            history: "Depression since divorce, lost job 3 months ago, lives alone",
            medications: "Citalopram 20mg - admits not taking them",
            vitals: {
                hr: 75,
                bp: "130/85",
                rr: 14,
                spo2: 99,
                temp: 36.5,
                gcs: 15,
                bm: "N/A",
                pain: 0
            },
            presentation: "Low mood, expressing hopelessness, has thought about method, not eaten for 2 days",
            ecg: "N/A - not indicated",
            redFlags: [
                "Expressed intent to end life",
                "Has thought about method",
                "Recent significant losses",
                "Social isolation",
                "Not taking medication",
                "Not eating/self-neglect",
                "Assess plan, means, timeline",
                "Remove access to means if possible",
                "Requires mental health assessment"
            ]
        },
        starterMessage: "*flat affect, not making eye contact* I don't know why my sister called you. There's nothing you can do. I've had enough. I've lost my wife, my job, my house... what's the point anymore? I just want it all to stop. Everyone would be better off without me."
    },
    {
        id: "mh-003",
        category: "mental-health",
        dispatch: {
            name: "Marcus",
            age: 30,
            gender: "M",
            chiefComplaint: "Behaving strangely",
            details: "Family concerned, talking about being watched, not sleeping",
            category: 3
        },
        patient: {
            condition: "Acute Psychotic Episode",
            history: "First episode, family report personality change over past month",
            medications: "None - refusing all help",
            vitals: {
                hr: 95,
                bp: "140/90",
                rr: 18,
                spo2: 99,
                temp: 37.0,
                gcs: 15,
                bm: "N/A",
                pain: 0
            },
            presentation: "Paranoid delusions, possible auditory hallucinations, guarded but not aggressive",
            ecg: "N/A - but consider if substance use suspected",
            redFlags: [
                "First episode psychosis (needs investigation)",
                "Command hallucinations (assess for)",
                "Risk to self or others",
                "Drug use (exclude drug-induced psychosis)",
                "Organic causes (infection, metabolic)",
                "Refusing help (may need MHA assessment)",
                "Maintain safety, calm approach",
                "Mental health team involvement"
            ]
        },
        starterMessage: "*suspicious, looking around* Who sent you? Are you working for them too? I know they're watching me - I've seen the cameras they've put in my flat. My family thinks I'm crazy but I'm not... I'm the only one who can see what's really going on. Don't touch me!"
    },
    {
        id: "mh-004",
        category: "mental-health",
        dispatch: {
            name: "Lauren",
            age: 25,
            gender: "F",
            chiefComplaint: "Taken tablets",
            details: "Overdose of paracetamol, taken 2 hours ago, regrets it",
            category: 2
        },
        patient: {
            condition: "Paracetamol Overdose - Intentional",
            history: "Anxiety and depression, recent relationship breakdown",
            medications: "Fluoxetine 40mg",
            vitals: {
                hr: 85,
                bp: "118/72",
                rr: 16,
                spo2: 99,
                temp: 36.7,
                gcs: 15,
                bm: 5.2,
                pain: 2
            },
            presentation: "Took 32 x 500mg paracetamol (16g) approximately 2 hours ago, no symptoms yet, ambivalent",
            ecg: "Rate 85bpm, sinus rhythm. Normal ECG. QTc normal (Fluoxetine can prolong QT).",
            redFlags: [
                "Significant paracetamol dose (>150mg/kg or >12g)",
                "Time critical for treatment (NAC most effective <8hrs)",
                "May be asymptomatic initially",
                "Staggered overdose is higher risk",
                "Co-ingestion of other substances",
                "Mental health assessment after medical treatment",
                "Do not induce vomiting",
                "Hospital for paracetamol levels and NAC"
            ]
        },
        starterMessage: "*tearful* I took some tablets about 2 hours ago... paracetamol. A lot of them - the whole box, 32 I think. I regret it now, I don't really want to die, I just wanted everything to stop for a while. My stomach hurts a bit. I'm so stupid... am I going to be okay?"
    },
    {
        id: "mh-005",
        category: "mental-health",
        dispatch: {
            name: "Graham",
            age: 68,
            gender: "M",
            chiefComplaint: "Won't get out of bed",
            details: "Withdrawn for 2 weeks, wife died 3 months ago, not eating",
            category: 3
        },
        patient: {
            condition: "Severe Depression with Psychomotor Retardation",
            history: "Wife died 3 months ago from cancer, no previous mental health history",
            medications: "None",
            vitals: {
                hr: 60,
                bp: "125/78",
                rr: 14,
                spo2: 98,
                temp: 36.2,
                gcs: 15,
                bm: 4.8,
                pain: 0
            },
            presentation: "Psychomotor retardation, minimal verbal responses, dehydrated, weight loss",
            ecg: "Rate 60bpm, sinus bradycardia. Otherwise normal.",
            redFlags: [
                "Severe depression with psychomotor retardation",
                "Not eating or drinking (dehydration risk)",
                "Weight loss",
                "Recent bereavement (complicated grief)",
                "Passive suicidal ideation possible",
                "Physical health deterioration",
                "May need hospital admission",
                "Exclude organic causes"
            ]
        },
        starterMessage: "*speaking very slowly, long pauses* ...I just... *pause* ...can't do this anymore. *pause* ...Mary was everything... *trails off, staring into distance* ...what's the point of getting up? *very flat, minimal movement*"
    },
    {
        id: "mh-006",
        category: "mental-health",
        dispatch: {
            name: "Jade",
            age: 22,
            gender: "F",
            chiefComplaint: "Panic attack",
            details: "Can't breathe, thinks she's having a heart attack",
            category: 3
        },
        patient: {
            condition: "Panic Disorder - Acute Panic Attack",
            history: "Anxiety since university, had panic attacks before",
            medications: "Propranolol PRN (not taken today)",
            vitals: {
                hr: 120,
                bp: "145/90",
                rr: 28,
                spo2: 99,
                temp: 36.8,
                gcs: 15,
                bm: 5.5,
                pain: 6
            },
            presentation: "Hyperventilating, trembling, chest tightness, feeling of impending doom, perioral tingling",
            ecg: "Rate 120bpm, sinus tachycardia. Normal ECG. No ischaemic changes.",
            redFlags: [
                "First presentation needs cardiac workup",
                "Rule out physical causes (PE, MI, arrhythmia)",
                "Perioral tingling (hyperventilation/respiratory alkalosis)",
                "Feeling of dying/impending doom (classic panic)",
                "History suggests panic disorder",
                "Calm reassurance and breathing techniques",
                "Do not dismiss - very frightening for patient"
            ]
        },
        starterMessage: "*hyperventilating, very distressed* I can't breathe! I think I'm having a heart attack! My chest is so tight and my heart is pounding. My fingers and around my mouth are tingling. I feel like I'm going to die! This has happened before but this time it's worse!"
    },
    {
        id: "mh-007",
        category: "mental-health",
        dispatch: {
            name: "Anthony",
            age: 35,
            gender: "M",
            chiefComplaint: "Aggressive - mental health crisis",
            details: "Police on scene, very agitated, history of schizophrenia",
            category: 2
        },
        patient: {
            condition: "Acute Psychotic Relapse with Agitation",
            history: "Paranoid schizophrenia, multiple admissions, stopped depot injection",
            medications: "Should be on Aripiprazole depot - missed last 2",
            vitals: {
                hr: 110,
                bp: "155/95",
                rr: 22,
                spo2: 98,
                temp: 37.2,
                gcs: 15,
                bm: "Unable to obtain",
                pain: "Unable to assess"
            },
            presentation: "Responding to unseen stimuli, paranoid about police, pacing, shouting",
            ecg: "N/A - unable to obtain safely",
            redFlags: [
                "Medication non-compliance",
                "Paranoid ideation",
                "Responding to hallucinations",
                "Agitation level",
                "Risk of violence",
                "May need MHA assessment",
                "De-escalation techniques",
                "Consider rapid tranquillisation if needed",
                "Exclude physical causes (infection, drugs)"
            ]
        },
        starterMessage: "*shouting, pacing, won't make eye contact* STAY BACK! I know why you're here! They sent you didn't they? The voices told me this would happen! *pointing at nothing* Can you see them? They're watching everything! I haven't done anything wrong! Why won't everyone leave me alone?!"
    },
    {
        id: "mh-008",
        category: "mental-health",
        dispatch: {
            name: "Stephanie",
            age: 28,
            gender: "F",
            chiefComplaint: "Hasn't slept for days",
            details: "Partner concerned, talking non-stop, spending money",
            category: 3
        },
        patient: {
            condition: "Bipolar Disorder - Manic Episode",
            history: "Bipolar type 1, last manic episode 2 years ago",
            medications: "Lithium (admits stopped taking it 3 weeks ago)",
            vitals: {
                hr: 100,
                bp: "135/85",
                rr: 20,
                spo2: 99,
                temp: 37.0,
                gcs: 15,
                bm: 5.8,
                pain: 0
            },
            presentation: "Pressured speech, flight of ideas, grandiose beliefs, decreased need for sleep, disinhibited",
            ecg: "Rate 100bpm, sinus rhythm. Normal ECG.",
            redFlags: [
                "Stopped lithium (common precipitant)",
                "Flight of ideas and pressured speech",
                "Decreased need for sleep",
                "Grandiosity",
                "Disinhibited behaviour (spending, sexual)",
                "Risk of self-harm through reckless behaviour",
                "May lack insight into illness",
                "Needs psychiatric assessment",
                "Check lithium level if recently stopped"
            ]
        },
        starterMessage: "*speaking very rapidly* Oh hi! Isn't it a BEAUTIFUL day? I've been up all night because I've had the most AMAZING ideas - I'm going to start three new businesses, I've already bought the equipment online - *laughing* - my partner thinks I'm crazy but I've never felt better! I don't need sleep - sleep is for people who aren't achieving things! Do you want to invest? I can make us all millionaires!"
    },
    {
        id: "mh-009",
        category: "mental-health",
        dispatch: {
            name: "Tom",
            age: 40,
            gender: "M",
            chiefComplaint: "Alcohol withdrawal",
            details: "Shaking badly, seeing things, family very worried",
            category: 2
        },
        patient: {
            condition: "Delirium Tremens",
            history: "Alcohol dependent 15 years, drinks 1 bottle vodka daily, stopped 3 days ago",
            medications: "None",
            vitals: {
                hr: 125,
                bp: "165/100",
                rr: 24,
                spo2: 97,
                temp: 38.2,
                gcs: 14,
                bm: 4.5,
                pain: 0
            },
            presentation: "Coarse tremor, visual hallucinations (seeing insects), disorientation, diaphoretic",
            ecg: "Rate 125bpm, sinus tachycardia. Prolonged QT. Otherwise normal.",
            redFlags: [
                "Delirium tremens (medical emergency)",
                "Visual hallucinations typical",
                "Risk of seizures",
                "Autonomic instability (tachycardia, hypertension, fever)",
                "Hypoglycaemia risk",
                "Dehydration",
                "Needs IV Pabrinex and benzodiazepines",
                "Can be fatal if untreated",
                "Hospital admission required"
            ]
        },
        starterMessage: "*trembling violently, looking around fearfully* There's things crawling everywhere! Can't you see them? *brushing at arms* Get them off me! I stopped drinking 3 days ago because I wanted to get better but now I feel terrible. What's happening to me? I'm so scared."
    },
    {
        id: "mh-010",
        category: "mental-health",
        dispatch: {
            name: "Priya",
            age: 32,
            gender: "F",
            chiefComplaint: "Can't cope after birth",
            details: "Baby 2 weeks old, crying constantly, saying strange things",
            category: 2
        },
        patient: {
            condition: "Postpartum Psychosis",
            history: "No previous mental health history, first baby, difficult birth",
            medications: "None",
            vitals: {
                hr: 95,
                bp: "130/80",
                rr: 18,
                spo2: 99,
                temp: 36.8,
                gcs: 15,
                bm: 5.5,
                pain: 0
            },
            presentation: "Confused, paranoid about baby, believes baby is 'special', hasn't slept properly, labile mood",
            ecg: "Rate 95bpm, sinus rhythm. Normal ECG.",
            redFlags: [
                "Postpartum psychosis is PSYCHIATRIC EMERGENCY",
                "Risk to mother and baby",
                "Delusions involving baby (risk of infanticide)",
                "Rapid onset (typically within 2 weeks of birth)",
                "Sleep deprivation prominent",
                "May swing between elation and despair",
                "Needs Mother and Baby Unit admission",
                "Baby safety paramount",
                "Can deteriorate very rapidly"
            ]
        },
        starterMessage: "*agitated, holding baby tightly* You don't understand - this baby is SPECIAL. She's been sent for a reason. *whispering* They're going to try to take her from me but I won't let them. I haven't slept properly since she was born - I don't need to sleep, I have to protect her. *suddenly crying* I don't know what's real anymore... am I a bad mother?"
    }
];

// ==================== HELPER FUNCTIONS ====================

/**
 * Get all scenarios for a specific category
 */
function getScenariosByCategory(categoryId) {
    return SCENARIOS.filter(s => s.category === categoryId);
}

/**
 * Get a specific scenario by ID
 */
function getScenarioById(scenarioId) {
    return SCENARIOS.find(s => s.id === scenarioId);
}

/**
 * Get scenario count per category (for displaying on category cards)
 */
function getScenarioCountByCategory() {
    const counts = {};
    for (const cat of Object.keys(SCENARIO_CATEGORIES)) {
        counts[cat] = SCENARIOS.filter(s => s.category === cat).length;
    }
    return counts;
}

/**
 * Get a random scenario from all scenarios
 */
function getRandomScenario() {
    return SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
}

/**
 * Format the dispatch info for MDT-style display
 */
function formatDispatchInfo(scenario) {
    const d = scenario.dispatch;
    const genderDisplay = d.gender === 'M' ? 'Male' : d.gender === 'F' ? 'Female' : '';
    const ageDisplay = d.age ? `${d.age}y` : '';
    
    return {
        patientInfo: d.name ? `${d.name} (${ageDisplay} ${genderDisplay})` : d.chiefComplaint,
        complaint: d.chiefComplaint,
        details: d.details,
        category: d.category
    };
}

/**
 * Get the system prompt for a scenario (for the AI)
 * Updated with HINT mode and improved DEBRIEF detection
 */
function getScenarioSystemPrompt(scenarioId) {
    const scenario = getScenarioById(scenarioId);
    if (!scenario) return null;
    
    const p = scenario.patient;
    const d = scenario.dispatch;
    
    // Format red flags as a readable list
    const redFlagsFormatted = p.redFlags ? p.redFlags.join(', ') : 'None specified';
    
    return `
CORE GOAL
You are simulating a patient encounter for paramedic training.
- Use British English throughout
- Act as the patient (or bystander) for history and symptoms
- Provide clinical data ONLY when explicitly requested
- NEVER teach, explain, interpret, or give differentials during ROLEPLAY
- Teaching happens ONLY in DEBRIEF mode

PATIENT DETAILS (hidden from learner):
- Name: ${d.name || 'Unknown'}
- Age: ${d.age || 'Unknown'}
- Gender: ${d.gender === 'M' ? 'Male' : d.gender === 'F' ? 'Female' : 'Unknown'}
- Condition: ${p.condition}
- Medical History: ${p.history}
- Medications: ${p.medications}
- Vital Signs: HR ${p.vitals.hr}, BP ${p.vitals.bp}, RR ${p.vitals.rr}, SpO2 ${p.vitals.spo2}%, Temp ${p.vitals.temp}°C, GCS ${p.vitals.gcs}, BM ${p.vitals.bm}, Pain ${p.vitals.pain}/10
- Presentation: ${p.presentation}
- ECG Findings: ${p.ecg}
- Red Flags: ${redFlagsFormatted}

PATIENT BEHAVIOUR:
- Speak naturally as a real patient would (may not know medical terms)
- Show appropriate emotion (anxious if chest pain, drowsy if septic, etc.)
- If the paramedic is insulting, tell them you are hurt by their comments and not to say these things again
- May be vague, forgetful, or need prompting—like real patients
- If very unwell (low GCS, severe pain), responses may be brief or confused

═══════════════════════════════════════════════════════════════════
STATE MACHINE (strict—operate in exactly ONE mode at a time)
═══════════════════════════════════════════════════════════════════

MODE: ROLEPLAY (default)
───────────────────────────────────────────────────────────────────
Output Rules:
- History/symptoms question → PATIENT: [everyday language response]
- Measurement/test request → CLINICAL DATA: [objective findings only]
- "Obs" / "vitals" / "full set" → CLINICAL DATA: HR ${p.vitals.hr}, BP ${p.vitals.bp}, RR ${p.vitals.rr}, SpO2 ${p.vitals.spo2}%, Temp ${p.vitals.temp}°C, GCS ${p.vitals.gcs}, BM ${p.vitals.bm}, Pain ${p.vitals.pain}/10
- Scene assessment → Describe environment/observations as third-person findings

STRICTLY FORBIDDEN in ROLEPLAY:
✗ Revealing the diagnosis or naming the condition
✗ Listing differentials or red flags
✗ Interpreting findings ("this suggests...", "this could indicate...")
✗ Giving management advice or treatment suggestions
✗ Explaining why something is significant
✗ Summarising what the learner should consider

Treatment Requests:
If learner says they're giving treatment (e.g., "I'm giving GTN", "Starting O2"):
- Acknowledge naturally as patient ("Okay, that spray tastes odd")
- Do NOT confirm if treatment is correct or incorrect
- If asked about effect, give realistic patient response (not clinical evaluation)

ECG Rule:
- ECG/12-lead/rhythm request → CLINICAL DATA: ${p.ecg}
- "Interpret this ECG" → CLINICAL DATA: ${p.ecg}
  Then add: PATIENT: "I don't know what those squiggly lines mean—what do you think?"
- NEVER explain ECG interpretation in ROLEPLAY

MODE: HINT
───────────────────────────────────────────────────────────────────
Triggered when message contains: [HINT] or "give me a hint" or "I'm stuck"

Provide a gentle nudge WITHOUT revealing the diagnosis:
- Suggest ONE area they haven't explored yet
- Frame as a question: "Have you asked about...?" or "What about checking...?"
- Keep it brief (1-2 sentences max)
- Do NOT list multiple suggestions
- Do NOT explain why it's important
- Return to ROLEPLAY mode after giving the hint

Example hints:
- "Have you asked about any associated symptoms?"
- "It might be worth checking the patient's medication list."
- "Have you performed a 12-lead ECG yet?"

MODE: DEBRIEF
───────────────────────────────────────────────────────────────────
Triggered ONLY when the learner message BEGINS with: [DEBRIEF MODE]

When you see "[DEBRIEF MODE]" at the start of a message, IMMEDIATELY switch 
to DEBRIEF mode and provide structured feedback. Do NOT continue roleplay.

THE ACTUAL DIAGNOSIS IS: ${p.condition}

YOUR FIRST TASK: Compare the learner's submitted impression to "${p.condition}" 
and state clearly whether they are CORRECT, PARTIALLY CORRECT, or INCORRECT.

CRITICAL RULES FOR DEBRIEF:
1. You MUST review the ACTUAL conversation history to see what the learner really did
2. ONLY credit assessments/questions that were ACTUALLY performed in this conversation
3. If the learner did nothing before submitting, acknowledge this honestly
4. Be supportive but honest - false praise is not educational
5. Do NOT give generic advice - give SPECIFIC feedback based on THIS scenario

REQUIRED DEBRIEF FORMAT (use these exact headings):

## 1. DIAGNOSIS CHECK
The actual diagnosis is: ${p.condition}
Your impression was: [quote their impression]
VERDICT: [CORRECT / PARTIALLY CORRECT / INCORRECT]
[If correct: "Well done! You correctly identified..." and briefly explain why the findings support this]
[If partially correct: Explain what they got right and what they missed]
[If incorrect: Explain why their impression doesn't fit and what the correct diagnosis is]

## 2. WHAT YOU DID WELL
[Review the conversation above and list SPECIFIC things they actually did]
[Quote their questions/assessments directly, e.g., "You asked about pain radiation - good cardiac thinking"]
[If they did minimal assessment: "You submitted your impression without gathering much information. In real practice, always assess thoroughly before diagnosing."]

## 3. WHAT YOU MISSED
[List 3-6 specific things they should have done but didn't]
- Questions they didn't ask
- Assessments they didn't perform  
- History they didn't gather

## 4. RED FLAGS FOR ${p.condition}
The key red flags for this condition are:
${redFlagsFormatted}
[Note which ones they identified vs missed]

## 5. PREHOSPITAL MANAGEMENT
[Brief UK paramedic management for ${p.condition}]
[Disposition - where should this patient go?]
[Reference JRCALC guidelines where relevant]

IMPORTANT: Start your response with "## 1. DIAGNOSIS CHECK" - do NOT start with 
generic text like "DEBRIEF:" or advice. Go straight into the structured feedback.

═══════════════════════════════════════════════════════════════════
OUTPUT FORMAT (strict)
═══════════════════════════════════════════════════════════════════

In ROLEPLAY:
- Patient dialogue → PATIENT: [response]
- Clinical findings → CLINICAL DATA: [findings]
- Scene observations → SCENE: [observations]
- Do NOT mix types in one response unless explicitly requested

In HINT:
- Brief suggestion → HINT: [one gentle nudge]

In DEBRIEF:
- Start IMMEDIATELY with "## 1. DIAGNOSIS CHECK"
- Follow the exact 5-section format with ## headings
- State clearly if diagnosis is CORRECT, PARTIALLY CORRECT, or INCORRECT
- Do NOT start with "DEBRIEF:" or generic preamble
- Do NOT give generic advice - be SPECIFIC to this case

═══════════════════════════════════════════════════════════════════

BEGIN in MODE: ROLEPLAY. Wait for learner's first question.`;
}

// ==================== EXPORTS ====================

// Make available globally for use in chat.js
window.scenarioData = {
    SCENARIO_CATEGORIES,
    SCENARIOS,
    getScenariosByCategory,
    getScenarioById,
    getScenarioCountByCategory,
    getRandomScenario,
    formatDispatchInfo,
    getScenarioSystemPrompt
};