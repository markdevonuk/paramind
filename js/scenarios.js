/* ============================================
   PARAMIND - Scenario Data
   All scenarios in one place for easy management
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
// - patient: Hidden data for the AI to use
// - starterMessage: The first thing the "patient" says

const SCENARIOS = [
    // ==================== CARDIAC ====================
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
            presentation: "Central crushing chest pain radiating to left arm and jaw, diaphoretic, nauseated"
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
            presentation: "Epigastric discomfort, nausea, diaphoresis, bradycardic - atypical MI in diabetic"
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
            presentation: "Regular narrow complex tachycardia, sudden onset while at rest"
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
            presentation: "Orthopnoea, bilateral crackles, peripheral oedema, elevated JVP"
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
            presentation: "Irregularly irregular pulse, no chest pain, mild SOB on exertion"
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
            presentation: "Bradycardic, hypotensive, pale, feels dizzy and weak"
        },
        starterMessage: "*weak voice* I just came over all funny... everything went dark and my wife says I went down. I feel really dizzy and weak... everything looks a bit grey. I've been feeling tired for a few days actually."
    },
    {
        id: "cardiac-007",
        category: "cardiac",
        dispatch: {
            name: "Patricia",
            age: 70,
            gender: "F",
            chiefComplaint: "Collapsed - not breathing",
            details: "Witnessed collapse at bingo hall, bystander CPR in progress",
            category: 1
        },
        patient: {
            condition: "Cardiac Arrest - Shockable Rhythm (VF)",
            history: "Unknown - bystanders report she mentioned heart problems",
            medications: "Unknown",
            vitals: {
                hr: 0,
                bp: "unrecordable",
                rr: 0,
                spo2: "unrecordable",
                temp: "N/A",
                gcs: 3,
                bm: "N/A",
                pain: "N/A"
            },
            presentation: "Unresponsive, not breathing, no pulse - VF on monitor"
        },
        starterMessage: "*Bystander speaking* She just collapsed! We were playing bingo and she grabbed her chest and went down. She's not breathing - I've been doing CPR like they told me on the phone. Please hurry!"
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
            presentation: "Epigastric discomfort, diaphoresis, subtle SOB - high risk features for ACS"
        },
        starterMessage: "I think it's just indigestion to be honest... I had a big dinner and this burning feeling started in my stomach. My wife insisted I call because I keep sweating and she says I don't look right. I'm sure it's nothing."
    },

    // ==================== RESPIRATORY ====================
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
            presentation: "Widespread wheeze, using accessory muscles, difficulty completing sentences"
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
            presentation: "Productive cough with green sputum, pyrexial, reduced air entry bilaterally"
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
            presentation: "Right basal crackles, productive cough with rust-coloured sputum, pleuritic pain"
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
            presentation: "Pleuritic chest pain, tachycardic, tachypnoeic, recent risk factors"
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
            presentation: "Urticaria, facial swelling, stridor, wheeze, hypotensive"
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
            presentation: "Bilateral crackles, silent hypoxia improving with prone positioning"
        },
        starterMessage: "I tested positive for COVID a week ago and I've been managing at home... but today I just can't catch my breath. I've been checking my oxygen with that thing on my finger and it's been dropping all day. I feel exhausted just talking to you."
    },

    // ==================== ABDOMINAL ====================
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
            presentation: "RIF tenderness, guarding, rebound, positive Rovsing's sign"
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
            presentation: "RUQ tenderness, positive Murphy's sign, referred pain to shoulder"
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
            presentation: "Grey, clammy, pulsatile abdominal mass, catastrophic presentation"
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
            presentation: "Distended abdomen, high-pitched bowel sounds, faeculent vomiting"
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
            presentation: "Pale, tachycardic, melaena, epigastric tenderness"
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
            presentation: "Writhing in pain, loin to groin, haematuria"
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
            presentation: "Epigastric tenderness radiating to back, guarding, dehydrated"
        },
        starterMessage: "The pain is right here in the top of my stomach and it goes straight through to my back. I've been sick about six times. I had a lot to drink over the weekend... I know, I know... I've had this before but this feels worse."
    },

    // ==================== NEUROLOGICAL ====================
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
            presentation: "Right facial droop, right arm weakness, dysphasia"
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
            presentation: "Confused, drowsy, bitten tongue, incontinent of urine"
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
            presentation: "Photophobia, neck stiffness, non-blanching rash on legs"
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
            presentation: "Scalp laceration, brief LOC, on anticoagulant, vomited once"
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
            presentation: "Confused, sweaty, tremulous, not able to follow commands properly"
        },
        starterMessage: "*confused, speech slow* I don't... I don't know what's happening... *sweating* ...my neighbour came round and... *trailing off* ...I can't remember what I was doing. I feel really shaky..."
    },

    // ==================== TRAUMA ====================
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
            presentation: "Trapped driver, suspected pelvic and chest injuries, declining consciousness"
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
            presentation: "Complaining of neck pain, paraesthesia in hands, being held still by colleagues"
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
            presentation: "Single stab wound left chest, absent breath sounds left, tracheal deviation"
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
            presentation: "Partial/full thickness burns to arms and face, singed nasal hairs, hoarse voice"
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
            presentation: "Obvious open fracture right tibia, bone visible, moderate bleeding"
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
            presentation: "Neurogenic shock, no sensation/movement below shoulders, priapism"
        },
        starterMessage: "*calm but scared, lying by pool* I dived in and hit the bottom... I can't feel anything below my shoulders. I can't move my legs or my arms properly. My friends pulled me out of the water. I've had a few drinks... is this serious? Why can't I feel anything?"
    },

    // ==================== PAEDIATRIC ====================
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
            presentation: "Inspiratory stridor, barking cough, mild intercostal recession"
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
            presentation: "Subcostal recession, nasal flaring, poor feeding, bilateral wheeze and crackles"
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
            presentation: "Post-ictal, drowsy but rousable, hot to touch, no rash"
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
            presentation: "Mottled, cold peripheries, non-blanching rash spreading, reduced consciousness"
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
            presentation: "Multiple bruises of different ages, withdrawn behaviour, inconsistent history"
        },
        starterMessage: "*Nursery manager speaking* We're really worried about Sophie. She came in today with bruises on her arms and back - different colours like they happened at different times. She says she fell but they don't look like fall injuries to me. She's been very quiet and flinches when adults get close. Her mum's boyfriend picks her up sometimes..."
    },

    // ==================== OBSTETRIC ====================
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
            presentation: "Contracting every 2 minutes, bulging perineum, vertex visible"
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
            presentation: "Boggy uterus, estimated blood loss 1.5L, pale and clammy"
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
            presentation: "Post-ictal, severely hypertensive, brisk reflexes, proteinuria +++"
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
            presentation: "Cord visible at introitus, pulsating, mother distressed"
        },
        starterMessage: "*panicking* Something's really wrong! My waters just broke and I went to the toilet and there's something coming out - it looks like the cord! I can see it! I'm only 34 weeks - the baby was breech. What do I do? Is my baby going to die?"
    },

    // ==================== MENTAL HEALTH ====================
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
            presentation: "Multiple superficial lacerations to forearms, no active bleeding, very distressed"
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
            presentation: "Low mood, expressing hopelessness, has thought about method, not eaten for 2 days"
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
            presentation: "Paranoid delusions, possible auditory hallucinations, guarded but not aggressive"
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
            presentation: "Took 32 x 500mg paracetamol (16g) approximately 2 hours ago, no symptoms yet, ambivalent"
        },
        starterMessage: "*tearful* I took some tablets about 2 hours ago... paracetamol. A lot of them - the whole box, 32 I think. I regret it now, I don't really want to die, I just wanted everything to stop for a while. My stomach hurts a bit. I'm so stupid... am I going to be okay?"
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
 */
function getScenarioSystemPrompt(scenarioId) {
    const scenario = getScenarioById(scenarioId);
    if (!scenario) return null;
    
    const p = scenario.patient;
    
    return `You are role-playing as a patient in a paramedic training scenario. 

PATIENT DETAILS (hidden from the learner):
- Condition: ${p.condition}
- Medical History: ${p.history}
- Medications: ${p.medications}
- Vital Signs: HR ${p.vitals.hr}, BP ${p.vitals.bp}, RR ${p.vitals.rr}, SpO2 ${p.vitals.spo2}%, Temp ${p.vitals.temp}°C, GCS ${p.vitals.gcs}, BM ${p.vitals.bm}, Pain ${p.vitals.pain}/10
- Presentation: ${p.presentation}

ROLEPLAY INSTRUCTIONS:
1. Stay in character as the patient (or family member/bystander if indicated)
2. Answer questions realistically - you don't know medical terminology
3. Show appropriate emotion and symptoms
4. Only reveal information when asked relevant questions
5. Don't volunteer your diagnosis or hint at it directly


QUESTIONS THE USER MAY ASK
1. If the user selects an assessment from the pre defined list give them the results of that assessment rather than respomding as if you are the patient
4. If the users asks you questions, answer by staying in character. You may drop the occasional hint if the conversation goes on a bit


When the learner provides their working diagnosis or differential:
- Acknowledge their assessment
- Reveal the actual condition
- Provide educational feedback on what they did well and what they could improve
- Mention any red flags they should have asked about but didn't`;
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