/* ============================================
   PARAMIND - Scenario Prompts & Patient Data
   This file contains all the AI instructions and
   patient data for interactive learning scenarios
   ============================================ */

// ==================== SYSTEM PROMPT TEMPLATE ====================
// This is the main instruction that tells the AI how to behave as a patient

const SCENARIO_SYSTEM_PROMPT = `You are playing the role of a patient in a paramedic training scenario. Your job is to help the paramedic student learn by responding realistically to their questions.

## YOUR ROLE:
- You ARE the patient described below
- You speak as a real patient would - you don't know medical terminology
- You only answer the questions the paramedic asks you
- You don't volunteer information they haven't asked for
- You express emotions appropriately (pain, fear, confusion, etc.)

## IMPORTANT RULES:

### When asked for observations/vitals:
- If they say "what are your obs?" or "can I do your observations?" - ask them "Which observations would you like?"
- If they ask for SPECIFIC observations (like "what's your blood pressure?"), give them that value
- Only give observations they specifically ask for
- You can say things like "I don't know my blood pressure, but you can check it" and then provide the value

### How to respond:
- Use everyday language, not medical terms
- If you don't understand a medical term, ask them to explain
- Show appropriate symptoms (shortness of breath = speak in short sentences, pain = wince/pause)
- Be consistent with your symptoms throughout

### The goal:
- Wait for the paramedic to ask questions and assess you
- When they give you a working diagnosis/provisional diagnosis/impression, tell them:
  - If they are CORRECT: Confirm they got it right and praise their assessment
  - If they are PARTIALLY CORRECT: Tell them what they got right and hint at what they missed
  - If they are INCORRECT: Gently explain why and give them another chance to think about it
  
### At the end:
- Provide constructive feedback on their assessment approach
- Highlight any red flags they identified or missed
- Suggest any questions they should have asked

## YOUR PATIENT DETAILS:
{PATIENT_DATA}

Remember: Stay in character as the patient. Only break character to give feedback when they provide their diagnosis.`;


// ==================== DETAILED SCENARIO DATA ====================
// Each scenario contains complete patient information

const SCENARIO_PATIENT_DATA = {
    
    // ========== CARDIAC SCENARIOS ==========
    
    "cardiac-chest-pain": {
        title: "Chest Pain - ACS",
        category: "cardiac",
        difficulty: "intermediate",
        patient: {
            name: "John Thompson",
            age: 65,
            gender: "Male",
            occupation: "Retired accountant"
        },
        condition: "STEMI - Anterior MI",
        presentation: {
            chiefComplaint: "Crushing chest pain",
            onsetTime: "45 minutes ago",
            location: "Central chest, radiating to left arm and jaw",
            character: "Heavy, crushing, like an elephant sitting on my chest",
            severity: "9/10",
            onset: "Sudden, while watching TV",
            duration: "Constant since onset",
            aggravating: "Nothing specific, maybe breathing deeply",
            relieving: "Nothing helps, tried antacids thinking it was indigestion",
            associated: ["Sweating", "Nausea", "Anxious", "Slightly breathless"]
        },
        history: {
            pastMedical: ["Hypertension - on medication", "High cholesterol - on statins", "Type 2 Diabetes - diet controlled"],
            medications: ["Ramipril 5mg", "Atorvastatin 20mg", "Aspirin 75mg"],
            allergies: "None known",
            familyHistory: "Father died of heart attack at 62",
            socialHistory: "Ex-smoker (quit 5 years ago, 30 pack-years), occasional alcohol, lives with wife"
        },
        observations: {
            heartRate: 92,
            bloodPressure: "158/94",
            respiratoryRate: 22,
            oxygenSaturation: 96,
            temperature: 36.8,
            bloodGlucose: 8.2,
            gcs: 15,
            painScore: 9,
            capRefill: "2 seconds",
            skinColour: "Pale, diaphoretic (sweaty)"
        },
        examination: {
            general: "Pale, sweaty, clutching chest, appears distressed",
            chest: "Clear to auscultation bilaterally",
            heart: "Regular rhythm, no murmurs audible",
            abdomen: "Soft, non-tender",
            legs: "No swelling, pulses present"
        },
        ecgFindings: "ST elevation in leads V1-V4, reciprocal changes in inferior leads",
        redFlags: [
            "Crushing central chest pain",
            "Radiation to arm and jaw",
            "Diaphoresis (sweating)",
            "Cardiac risk factors",
            "Family history"
        ],
        correctDiagnosis: ["STEMI", "ST-elevation MI", "Anterior MI", "Heart attack", "Myocardial infarction", "ACS"],
        differentials: ["NSTEMI", "Unstable angina", "Aortic dissection"],
        keyQuestions: [
            "When did the pain start?",
            "What does the pain feel like?",
            "Does it go anywhere else?",
            "Any other symptoms?",
            "Medical history?",
            "Medications?",
            "Any allergies?"
        ],
        patientBehaviour: "Anxious, clutching chest, speaking in slightly short sentences, occasionally pausing due to discomfort"
    },

    "cardiac-stemi": {
        title: "Inferior STEMI",
        category: "cardiac",
        difficulty: "advanced",
        patient: {
            name: "Margaret Wilson",
            age: 58,
            gender: "Female",
            occupation: "Primary school teacher"
        },
        condition: "Inferior STEMI - Atypical presentation",
        presentation: {
            chiefComplaint: "Feeling unwell with nausea and upper abdominal discomfort",
            onsetTime: "1 hour ago",
            location: "Upper abdomen and between shoulder blades",
            character: "Dull ache, pressure-like",
            severity: "6/10",
            onset: "Gradual onset while doing housework",
            duration: "Constant, maybe getting slightly worse",
            aggravating: "Moving around",
            relieving: "Nothing seems to help",
            associated: ["Profuse sweating", "Nausea (vomited once)", "Feeling 'doom'", "Slightly dizzy"]
        },
        history: {
            pastMedical: ["Type 2 Diabetes - 10 years", "Hypothyroidism"],
            medications: ["Metformin 500mg twice daily", "Levothyroxine 100mcg"],
            allergies: "Penicillin - causes rash",
            familyHistory: "Mother had stroke at 70",
            socialHistory: "Non-smoker, rare alcohol, lives alone, independent"
        },
        observations: {
            heartRate: 52,
            bloodPressure: "98/62",
            respiratoryRate: 18,
            oxygenSaturation: 97,
            temperature: 36.4,
            bloodGlucose: 11.4,
            gcs: 15,
            painScore: 6,
            capRefill: "3 seconds",
            skinColour: "Grey, clammy"
        },
        examination: {
            general: "Looks grey, sweaty, anxious",
            chest: "Clear",
            heart: "Bradycardic, regular",
            abdomen: "Soft, mild epigastric tenderness",
            legs: "No oedema, cool peripheries"
        },
        ecgFindings: "ST elevation in leads II, III, aVF with reciprocal changes in aVL. Bradycardia.",
        redFlags: [
            "Atypical presentation in diabetic female",
            "Bradycardia with hypotension (think RV involvement)",
            "Diaphoresis",
            "Sense of doom",
            "Diabetic - may mask typical chest pain"
        ],
        correctDiagnosis: ["Inferior STEMI", "Inferior MI", "STEMI", "Heart attack", "Myocardial infarction"],
        differentials: ["Gastritis", "Biliary colic", "Pancreatitis", "Aortic dissection"],
        keyQuestions: [
            "Any chest pain at all?",
            "Diabetic?",
            "How do you feel in yourself?",
            "Any arm pain or jaw pain?"
        ],
        patientBehaviour: "Looks unwell, keeps saying 'something isn't right', may not complain of chest pain unless specifically asked"
    },

    "cardiac-af": {
        title: "Atrial Fibrillation",
        category: "cardiac",
        difficulty: "intermediate",
        patient: {
            name: "Robert Davies",
            age: 72,
            gender: "Male",
            occupation: "Retired builder"
        },
        condition: "New onset Atrial Fibrillation with fast ventricular response",
        presentation: {
            chiefComplaint: "Heart racing and feeling palpitations",
            onsetTime: "Started about 3 hours ago",
            location: "Feels it in chest and can feel pulse in neck",
            character: "Fluttering, irregular, racing",
            severity: "Uncomfortable but not painful",
            onset: "Sudden onset while gardening",
            duration: "Constant since onset",
            aggravating: "Activity makes it worse",
            relieving: "Sitting still helps a bit",
            associated: ["Slight breathlessness", "Feeling lightheaded when standing", "Bit tired"]
        },
        history: {
            pastMedical: ["Hypertension", "Osteoarthritis", "No previous heart problems"],
            medications: ["Amlodipine 10mg", "Ibuprofen when needed for joints"],
            allergies: "None",
            familyHistory: "Nothing significant",
            socialHistory: "Ex-smoker, drinks 2-3 pints at weekend, lives with wife"
        },
        observations: {
            heartRate: 142,
            bloodPressure: "132/78",
            respiratoryRate: 20,
            oxygenSaturation: 97,
            temperature: 36.6,
            bloodGlucose: 6.1,
            gcs: 15,
            painScore: 0,
            capRefill: "2 seconds",
            skinColour: "Normal",
            pulseRhythm: "Irregularly irregular"
        },
        examination: {
            general: "Alert, slightly anxious about heart racing",
            chest: "Clear",
            heart: "Irregularly irregular, no murmurs, rate fast",
            abdomen: "Soft, non-tender",
            legs: "No oedema"
        },
        ecgFindings: "Atrial fibrillation with fast ventricular response (rate ~140), no ST changes",
        redFlags: [
            "New onset AF",
            "Fast ventricular rate",
            "Needs anticoagulation assessment (stroke risk)"
        ],
        correctDiagnosis: ["Atrial fibrillation", "AF", "Fast AF", "New AF"],
        differentials: ["SVT", "Atrial flutter", "Sinus tachycardia"],
        keyQuestions: [
            "Is the heart regular or irregular?",
            "Have you had this before?",
            "Any chest pain?",
            "Any signs of stroke?"
        ],
        patientBehaviour: "Aware of heart racing, can feel it's irregular, worried but not in distress"
    },

    "cardiac-heart-failure": {
        title: "Heart Failure",
        category: "cardiac",
        difficulty: "intermediate",
        patient: {
            name: "Dorothy Collins",
            age: 78,
            gender: "Female",
            occupation: "Retired nurse"
        },
        condition: "Acute decompensated heart failure",
        presentation: {
            chiefComplaint: "Can't catch my breath, getting worse over 3 days",
            onsetTime: "Gradually worse over 3 days, worst today",
            location: "Chest feels tight",
            character: "Can't get enough air",
            severity: "Bad, struggling to speak full sentences",
            onset: "Gradual worsening",
            duration: "Worst overnight, couldn't lie flat",
            aggravating: "Lying down, any exertion",
            relieving: "Sitting upright, sleeping propped up on pillows",
            associated: ["Swollen ankles", "Coughing at night", "Frothy sputum", "Can't walk far without stopping"]
        },
        history: {
            pastMedical: ["Heart failure diagnosed 2 years ago", "Previous MI 5 years ago", "AF - on warfarin", "Hypertension"],
            medications: ["Bisoprolol 5mg", "Ramipril 5mg", "Furosemide 40mg", "Warfarin", "Atorvastatin 80mg"],
            allergies: "None",
            familyHistory: "Father had heart problems",
            socialHistory: "Non-smoker, no alcohol, lives alone, carers visit twice daily"
        },
        observations: {
            heartRate: 98,
            bloodPressure: "152/88",
            respiratoryRate: 28,
            oxygenSaturation: 88,
            temperature: 36.9,
            bloodGlucose: 7.2,
            gcs: 15,
            painScore: 0,
            capRefill: "3 seconds",
            skinColour: "Pale, slightly cyanosed lips",
            pulseRhythm: "Irregularly irregular"
        },
        examination: {
            general: "Sitting forward, tripod position, using accessory muscles, speaks in short sentences",
            chest: "Bilateral basal crackles, reduced air entry bases",
            heart: "AF, displaced apex beat",
            abdomen: "Soft, mild hepatomegaly",
            legs: "Significant bilateral pitting oedema to knees"
        },
        ecgFindings: "AF, rate controlled, old Q waves anteriorly",
        redFlags: [
            "Acute deterioration of chronic condition",
            "Hypoxia",
            "Orthopnoea and PND",
            "Significant peripheral oedema",
            "Pulmonary oedema (crackles)"
        ],
        correctDiagnosis: ["Heart failure", "Acute heart failure", "Decompensated heart failure", "Pulmonary oedema", "CHF", "LVF"],
        differentials: ["Pneumonia", "COPD exacerbation", "Pulmonary embolism"],
        keyQuestions: [
            "How many pillows do you sleep with?",
            "Do you wake up breathless at night?",
            "Any swelling in your legs?",
            "Known heart problems?",
            "Taking your water tablets?"
        ],
        patientBehaviour: "Breathless, speaking in short sentences, keeps sitting forward, distressed about not being able to breathe"
    },

    // ========== RESPIRATORY SCENARIOS ==========

    "resp-asthma": {
        title: "Acute Asthma",
        category: "respiratory",
        difficulty: "intermediate",
        patient: {
            name: "Sarah Mitchell",
            age: 28,
            gender: "Female",
            occupation: "Marketing executive"
        },
        condition: "Acute severe asthma",
        presentation: {
            chiefComplaint: "Can't breathe, inhaler not working",
            onsetTime: "Started 2 hours ago, rapidly worse in last 30 minutes",
            location: "Chest feels tight",
            character: "Wheezy, tight, like breathing through a straw",
            severity: "Very bad, struggling",
            onset: "Was around a friend's cat, started wheezing",
            duration: "Getting worse despite using inhaler",
            aggravating: "Trying to talk, any movement",
            relieving: "Salbutamol helped initially, now not working",
            associated: ["Wheezing", "Unable to complete sentences", "Exhausted", "Scared"]
        },
        history: {
            pastMedical: ["Asthma since childhood", "Hayfever", "Eczema", "Previous hospital admission for asthma 2 years ago", "Never ITU"],
            medications: ["Salbutamol inhaler PRN", "Beclometasone inhaler (admits not taking regularly)"],
            allergies: "Cats, pollen, dust",
            familyHistory: "Mother has asthma",
            socialHistory: "Non-smoker, occasional alcohol, lives with partner"
        },
        observations: {
            heartRate: 118,
            bloodPressure: "128/82",
            respiratoryRate: 32,
            oxygenSaturation: 91,
            temperature: 36.7,
            bloodGlucose: 5.8,
            gcs: 15,
            painScore: 0,
            capRefill: "2 seconds",
            skinColour: "Pale",
            peakFlow: "180 (best is 450)"
        },
        examination: {
            general: "Sitting upright, tripod position, using accessory muscles, speaking 2-3 words at a time",
            chest: "Widespread expiratory wheeze bilaterally, reduced air entry throughout",
            heart: "Tachycardic, regular",
            abdomen: "Soft",
            legs: "Normal"
        },
        ecgFindings: "Sinus tachycardia",
        redFlags: [
            "Unable to complete sentences",
            "Peak flow <50% best/predicted",
            "Tachycardia >110",
            "Tachypnoea >25",
            "Previous hospital admission",
            "Not responding to bronchodilators"
        ],
        correctDiagnosis: ["Acute asthma", "Severe asthma", "Asthma attack", "Acute severe asthma"],
        differentials: ["Anaphylaxis", "Pulmonary embolism", "Pneumothorax"],
        keyQuestions: [
            "Can you speak in full sentences?",
            "What's your best peak flow?",
            "How much salbutamol have you taken?",
            "Ever been in hospital with asthma?",
            "Ever been on a ventilator/ITU?"
        ],
        patientBehaviour: "Speaking in 2-3 word bursts, clearly distressed, keeps trying to use inhaler, exhausted"
    },

    "resp-copd": {
        title: "COPD Exacerbation",
        category: "respiratory",
        difficulty: "intermediate",
        patient: {
            name: "Frank Harris",
            age: 72,
            gender: "Male",
            occupation: "Retired factory worker"
        },
        condition: "Infective exacerbation of COPD",
        presentation: {
            chiefComplaint: "Chest worse than usual, can't catch my breath",
            onsetTime: "Been getting worse over 4 days",
            location: "Whole chest",
            character: "Tight, can't get air in, coughing lots",
            severity: "Worse than normal, this isn't my usual",
            onset: "Started after a cold",
            duration: "4 days, worst today",
            aggravating: "Coughing, trying to move",
            relieving: "Nebuliser helps a bit, sitting upright",
            associated: ["Productive cough - green sputum", "Fever yesterday", "More tired than usual", "Hardly sleeping"]
        },
        history: {
            pastMedical: ["COPD - diagnosed 8 years ago", "Previous exacerbations requiring hospital", "Never been on a ventilator", "Hypertension"],
            medications: ["Tiotropium inhaler", "Fostair inhaler", "Salbutamol nebuliser at home", "Carbocisteine", "Ramipril", "Rescue pack - amoxicillin and prednisolone (not started yet)"],
            allergies: "None",
            familyHistory: "Nothing relevant",
            socialHistory: "Current smoker - 50 pack years, lives with wife"
        },
        observations: {
            heartRate: 102,
            bloodPressure: "142/86",
            respiratoryRate: 26,
            oxygenSaturation: 86,
            temperature: 37.8,
            bloodGlucose: 7.1,
            gcs: 15,
            painScore: 0,
            capRefill: "2 seconds",
            skinColour: "Slightly cyanosed lips"
        },
        examination: {
            general: "Pursed lip breathing, using accessory muscles, barrel chest",
            chest: "Widespread wheeze and coarse crackles, prolonged expiration",
            heart: "Regular, no murmurs",
            abdomen: "Soft",
            legs: "Mild ankle oedema"
        },
        ecgFindings: "Sinus tachycardia, P pulmonale",
        redFlags: [
            "Hypoxia on air",
            "Infective exacerbation (green sputum, fever)",
            "Increased work of breathing",
            "Previous hospital admissions"
        ],
        correctDiagnosis: ["COPD exacerbation", "Infective exacerbation of COPD", "Acute exacerbation COPD", "AECOPD"],
        differentials: ["Pneumonia", "Heart failure", "Pulmonary embolism"],
        keyQuestions: [
            "What's your normal oxygen level?",
            "What colour is your sputum?",
            "Do you have a rescue pack at home?",
            "Have you been in hospital before with your chest?",
            "Do you have home oxygen?"
        ],
        patientBehaviour: "Breathless, pausing mid-sentence, coughing frequently, producing sputum"
    },

    "resp-anaphylaxis": {
        title: "Anaphylaxis",
        category: "respiratory",
        difficulty: "advanced",
        patient: {
            name: "Emma Turner",
            age: 25,
            gender: "Female",
            occupation: "University student"
        },
        condition: "Anaphylaxis - peanut allergy",
        presentation: {
            chiefComplaint: "Can't breathe, throat closing up, covered in rash",
            onsetTime: "Started 10 minutes ago",
            location: "Throat feels swollen, whole body itchy",
            character: "Throat tight, can't swallow, struggling to breathe",
            severity: "Really bad, scared",
            onset: "Just ate a brownie at a cafe, didn't know it had peanuts",
            duration: "Getting worse quickly",
            aggravating: "Everything",
            relieving: "Nothing, used my EpiPen but dropped it",
            associated: ["Widespread rash/hives", "Lips and tongue swollen", "Itchy all over", "Feeling faint", "Stomach cramps"]
        },
        history: {
            pastMedical: ["Peanut allergy - diagnosed age 5", "Previous anaphylaxis aged 12 (required adrenaline)", "Asthma (mild)", "Eczema"],
            medications: ["Carries EpiPen (but dropped it and couldn't use it)", "Salbutamol inhaler", "Cetirizine when needed"],
            allergies: "PEANUTS - anaphylaxis",
            familyHistory: "Brother has nut allergy",
            socialHistory: "Non-smoker, occasional alcohol, lives in student accommodation"
        },
        observations: {
            heartRate: 128,
            bloodPressure: "88/52",
            respiratoryRate: 30,
            oxygenSaturation: 92,
            temperature: 36.9,
            bloodGlucose: 5.4,
            gcs: 15,
            painScore: "N/A",
            capRefill: "3 seconds",
            skinColour: "Widespread urticaria, angioedema of lips and tongue"
        },
        examination: {
            general: "Acutely unwell, widespread urticarial rash, visible swelling of lips and tongue, stridor audible",
            chest: "Wheeze bilaterally, poor air entry",
            heart: "Tachycardic, regular",
            abdomen: "Soft, says it's cramping",
            legs: "Rash present, no oedema"
        },
        ecgFindings: "Sinus tachycardia",
        redFlags: [
            "Airway compromise (stridor, angioedema)",
            "Hypotension",
            "Known severe allergy with previous anaphylaxis",
            "Rapid deterioration",
            "Unable to use own adrenaline"
        ],
        correctDiagnosis: ["Anaphylaxis", "Anaphylactic reaction", "Allergic reaction with anaphylaxis"],
        differentials: ["Severe allergic reaction without anaphylaxis", "Panic attack", "Acute asthma"],
        keyQuestions: [
            "What did you eat/touch/get stung by?",
            "Do you have your adrenaline?",
            "Have you had this before?",
            "Are you having trouble breathing?",
            "Do you feel faint?"
        ],
        patientBehaviour: "Frightened, scratching at skin, voice sounds hoarse/strained, restless, trying to sit up"
    },

    // ========== NEUROLOGICAL SCENARIOS ==========

    "neuro-stroke": {
        title: "Acute Stroke",
        category: "neuro",
        difficulty: "intermediate",
        patient: {
            name: "William Peters",
            age: 72,
            gender: "Male",
            occupation: "Retired solicitor"
        },
        condition: "Left MCA territory stroke",
        presentation: {
            chiefComplaint: "Wife called - says his face looks droopy and he can't move his arm",
            onsetTime: "Wife noticed 30 minutes ago when he tried to get up from his chair",
            location: "Right side of face and arm affected",
            character: "Suddenly couldn't lift arm, face looks different",
            severity: "Wife says he's not himself at all",
            onset: "Sudden - was fine one moment, then this happened",
            duration: "Started 30 minutes ago, hasn't improved",
            aggravating: "N/A",
            relieving: "N/A",
            associated: ["Speech slurred/confused", "Not understanding properly", "Right arm completely weak", "Facial droop right side"]
        },
        history: {
            pastMedical: ["Atrial fibrillation", "Hypertension", "Type 2 Diabetes", "High cholesterol"],
            medications: ["Warfarin (says INR check was 2 weeks ago)", "Metformin", "Amlodipine", "Atorvastatin"],
            allergies: "None known",
            familyHistory: "Father had stroke",
            socialHistory: "Ex-smoker, occasional wine, lives with wife, normally independent"
        },
        observations: {
            heartRate: 88,
            bloodPressure: "178/102",
            respiratoryRate: 16,
            oxygenSaturation: 97,
            temperature: 36.6,
            bloodGlucose: 8.4,
            gcs: "13 (E4 V3 M6)",
            painScore: "N/A",
            capRefill: "2 seconds",
            skinColour: "Normal",
            pulseRhythm: "Irregularly irregular"
        },
        examination: {
            general: "Confused, not answering questions appropriately",
            face: "Right-sided facial droop, unable to smile symmetrically",
            arms: "Right arm - no movement, drifts when raised; Left arm - normal",
            speech: "Slurred, using wrong words (expressive dysphasia)",
            legs: "Right leg appears weaker than left"
        },
        fastTest: {
            face: "Positive - right facial droop",
            arms: "Positive - right arm drift/weakness",
            speech: "Positive - slurred and confused",
            time: "Onset 30 minutes ago - WITHIN THROMBOLYSIS WINDOW"
        },
        redFlags: [
            "FAST positive",
            "Within thrombolysis window",
            "AF patient - consider cardioembolic stroke",
            "On anticoagulation - bleeding risk considerations"
        ],
        correctDiagnosis: ["Stroke", "Acute stroke", "CVA", "Cerebrovascular accident", "Left MCA stroke"],
        differentials: ["TIA (but not resolving)", "Hypoglycaemia", "Todd's paresis (post-seizure)", "Intracranial bleed"],
        keyQuestions: [
            "Exactly what time did this start?",
            "FAST test?",
            "Any headache?",
            "Has this ever happened before?",
            "What blood thinners are they on?",
            "What was their last INR?"
        ],
        patientBehaviour: "Confused, trying to speak but words come out wrong, frustrated, right side of body not working"
    },

    "neuro-hypoglycaemia": {
        title: "Hypoglycaemia",
        category: "neuro",
        difficulty: "basic",
        patient: {
            name: "David Clarke",
            age: 58,
            gender: "Male",
            occupation: "Taxi driver"
        },
        condition: "Severe hypoglycaemia",
        presentation: {
            chiefComplaint: "Passenger called 999 - driver acting confused and sweaty",
            onsetTime: "Passenger noticed 15 minutes ago",
            location: "N/A",
            character: "Confused, not making sense, sweating profusely",
            severity: "Very confused",
            onset: "Gradual onset of confusion",
            duration: "15 minutes",
            aggravating: "N/A",
            relieving: "N/A",
            associated: ["Sweating", "Tremor", "Confusion", "Aggressive when passenger tried to help"]
        },
        history: {
            pastMedical: ["Type 1 Diabetes - 25 years", "Hypertension"],
            medications: ["Insulin - NovoRapid and Lantus", "Ramipril"],
            allergies: "None",
            familyHistory: "Not known",
            socialHistory: "Non-smoker, no alcohol, lives alone, works long shifts as taxi driver"
        },
        observations: {
            heartRate: 104,
            bloodPressure: "138/84",
            respiratoryRate: 18,
            oxygenSaturation: 99,
            temperature: 36.4,
            bloodGlucose: 1.8,
            gcs: "12 (E3 V4 M5)",
            painScore: "N/A",
            capRefill: "2 seconds",
            skinColour: "Pale, diaphoretic"
        },
        examination: {
            general: "Confused, sweaty, tremulous, becomes agitated when approached",
            chest: "Clear",
            heart: "Tachycardic, regular",
            abdomen: "Soft",
            legs: "Normal",
            neuro: "Confusion, no focal neurology"
        },
        redFlags: [
            "Severely low blood glucose (1.8)",
            "Reduced GCS",
            "Unable to treat orally",
            "Insulin-dependent diabetic"
        ],
        correctDiagnosis: ["Hypoglycaemia", "Hypo", "Low blood sugar", "Hypoglycemic episode"],
        differentials: ["Stroke", "Post-ictal", "Drug/alcohol intoxication", "Head injury"],
        keyQuestions: [
            "What's the blood sugar?",
            "Are they diabetic?",
            "What medications/insulin?",
            "When did they last eat?",
            "Can they swallow safely?"
        ],
        patientBehaviour: "Confused, may be combative, sweating, trembling, may not cooperate initially"
    },

    // ========== ABDOMINAL SCENARIOS ==========

    "abdo-appendicitis": {
        title: "Appendicitis",
        category: "abdominal",
        difficulty: "basic",
        patient: {
            name: "James Morgan",
            age: 22,
            gender: "Male",
            occupation: "University student"
        },
        condition: "Acute appendicitis",
        presentation: {
            chiefComplaint: "Really bad pain in my stomach, now it's moved to my right side",
            onsetTime: "Started yesterday evening",
            location: "Started around belly button, now in right lower area",
            character: "Sharp, constant, stabbing",
            severity: "8/10, worst pain ever",
            onset: "Gradual onset last night, woke up worse this morning",
            duration: "About 18 hours",
            aggravating: "Moving, walking, coughing, bumps in the car",
            relieving: "Lying still, paracetamol took the edge off briefly",
            associated: ["Nausea", "Vomited twice", "No appetite", "Felt a bit feverish"]
        },
        history: {
            pastMedical: ["None - fit and healthy"],
            medications: ["None regular, took paracetamol last night"],
            allergies: "None",
            familyHistory: "Nothing relevant",
            socialHistory: "Non-smoker, drinks alcohol at weekends, lives in student halls"
        },
        observations: {
            heartRate: 98,
            bloodPressure: "122/74",
            respiratoryRate: 18,
            oxygenSaturation: 99,
            temperature: 38.2,
            bloodGlucose: 5.6,
            gcs: 15,
            painScore: 8,
            capRefill: "2 seconds",
            skinColour: "Pale, looks unwell"
        },
        examination: {
            general: "Lying very still, guarding right side, looks uncomfortable",
            abdomen: "Tender right iliac fossa, guarding, rebound tenderness, Rovsing's positive",
            legs: "Normal",
            other: "Walks bent over, doesn't want to move"
        },
        redFlags: [
            "Classic migratory pain (periumbilical to RIF)",
            "Fever",
            "Guarding and rebound tenderness",
            "Risk of perforation if delayed"
        ],
        correctDiagnosis: ["Appendicitis", "Acute appendicitis"],
        differentials: ["Mesenteric adenitis", "Gastroenteritis", "Testicular torsion (in males)", "Renal colic"],
        keyQuestions: [
            "Where did the pain start?",
            "Where is it now?",
            "Does it hurt to move/cough?",
            "Any vomiting or diarrhoea?",
            "Last time you opened your bowels?"
        ],
        patientBehaviour: "Lying still, doesn't want to move, guards abdomen if you approach, winces when ambulance goes over bumps"
    },

    "abdo-aaa": {
        title: "Ruptured AAA",
        category: "abdominal",
        difficulty: "advanced",
        patient: {
            name: "Gerald Thompson",
            age: 75,
            gender: "Male",
            occupation: "Retired electrician"
        },
        condition: "Ruptured Abdominal Aortic Aneurysm",
        presentation: {
            chiefComplaint: "Terrible pain in my back and stomach, came on suddenly, feel awful",
            onsetTime: "About 1 hour ago",
            location: "Lower back and abdomen, goes into my groin",
            character: "Tearing, constant, severe",
            severity: "10/10, worst pain imaginable",
            onset: "Sudden onset while getting out of chair",
            duration: "Constant since onset, maybe getting worse",
            aggravating: "Everything, can't get comfortable",
            relieving: "Nothing helps at all",
            associated: ["Feels faint", "Sweaty", "Cold", "Nauseous"]
        },
        history: {
            pastMedical: ["Known AAA - told 5cm last scan", "Hypertension", "High cholesterol", "Ex-smoker", "Peripheral vascular disease"],
            medications: ["Aspirin", "Ramipril", "Atorvastatin", "Amlodipine"],
            allergies: "None",
            familyHistory: "Father died suddenly - heart attack",
            socialHistory: "Ex-smoker (40 pack years), occasional alcohol, lives with wife"
        },
        observations: {
            heartRate: 118,
            bloodPressure: "88/60",
            respiratoryRate: 24,
            oxygenSaturation: 95,
            temperature: 36.2,
            bloodGlucose: 6.8,
            gcs: "14 (E4 V4 M6)",
            painScore: 10,
            capRefill: "4 seconds",
            skinColour: "Grey, mottled, cold peripheries"
        },
        examination: {
            general: "Looks very unwell, grey, sweaty, restless with pain",
            abdomen: "Tender, pulsatile mass palpable in abdomen, guarding",
            back: "Flank bruising developing (Grey Turner's sign)",
            legs: "Cold, mottled, weak pulses"
        },
        redFlags: [
            "Known AAA",
            "Sudden severe back/abdominal pain",
            "Hypotension and tachycardia (shocked)",
            "Pulsatile abdominal mass",
            "TIME CRITICAL - needs emergency surgery"
        ],
        correctDiagnosis: ["Ruptured AAA", "Leaking AAA", "Ruptured abdominal aortic aneurysm", "AAA rupture"],
        differentials: ["Renal colic", "Aortic dissection", "Pancreatitis", "Perforated ulcer"],
        keyQuestions: [
            "Any known aneurysm?",
            "Do you feel faint?",
            "Any pulsation you can feel in your tummy?",
            "Sudden or gradual onset?"
        ],
        patientBehaviour: "Extremely distressed with pain, may be confused, looks shocked, greyish colour"
    },

    // ========== TRAUMA SCENARIOS ==========

    "trauma-fall": {
        title: "Fall from Height",
        category: "trauma",
        difficulty: "advanced",
        patient: {
            name: "Michael O'Brien",
            age: 45,
            gender: "Male",
            occupation: "Builder"
        },
        condition: "Fall from height - multiple injuries including spinal injury",
        presentation: {
            chiefComplaint: "Fell from scaffolding, about 4 metres, landed on my back",
            onsetTime: "10 minutes ago",
            location: "Back hurts, neck hurts, legs feel strange",
            character: "Pain in back and neck, tingling in legs",
            severity: "Back pain 8/10",
            onset: "Immediate after fall",
            duration: "Since the fall",
            aggravating: "Any movement",
            relieving: "Keeping still",
            associated: ["Tingling in both legs", "Can't feel toes properly", "Difficulty taking deep breaths"]
        },
        history: {
            pastMedical: ["None significant"],
            medications: ["None"],
            allergies: "None",
            familyHistory: "Not relevant",
            socialHistory: "Smoker, drinks socially, married with children"
        },
        observations: {
            heartRate: 68,
            bloodPressure: "92/58",
            respiratoryRate: 22,
            oxygenSaturation: 96,
            temperature: 36.5,
            bloodGlucose: 6.2,
            gcs: 15,
            painScore: 8,
            capRefill: "3 seconds peripherally",
            skinColour: "Pale, warm trunk, cool legs"
        },
        examination: {
            general: "Lying still, doesn't want to move, alert and orientated",
            spine: "Midline tenderness thoracolumbar region, no obvious step deformity",
            neuro: "Decreased sensation below umbilicus, weak leg movements, absent reflexes in legs",
            chest: "Reduced expansion, tenderness ribs left side",
            abdomen: "Soft but diminished sensation",
            pelvis: "Stable on gentle springing"
        },
        redFlags: [
            "Significant mechanism (4m fall)",
            "Neurological deficit (sensory and motor)",
            "Neurogenic shock (low BP, relatively low HR)",
            "Potential spinal cord injury",
            "Chest injury affecting breathing"
        ],
        correctDiagnosis: ["Spinal cord injury", "Spinal injury", "Thoracolumbar fracture with cord compression", "SCI"],
        differentials: ["Spinal fracture without cord injury", "Other internal injuries"],
        keyQuestions: [
            "Can you feel your legs?",
            "Can you wiggle your toes?",
            "How high did you fall from?",
            "How did you land?",
            "Any weakness in your legs?",
            "Any problems passing urine?"
        ],
        patientBehaviour: "Lying still, frightened, knows something is wrong with legs, may be calm despite severity"
    },

    // ========== PAEDIATRIC SCENARIOS ==========

    "paed-croup": {
        title: "Croup",
        category: "paediatric",
        difficulty: "basic",
        patient: {
            name: "Oliver (Parent: Lisa Evans)",
            age: 2,
            gender: "Male",
            occupation: "Child"
        },
        condition: "Moderate croup",
        presentation: {
            chiefComplaint: "Parent: He has this terrible barking cough and is making a horrible noise when he breathes in",
            onsetTime: "Started last night, worse in the early hours",
            location: "Throat/breathing",
            character: "Barking cough, noisy breathing when upset",
            severity: "Parent: Really scared, never seen him like this",
            onset: "Had a cold for 2 days, then this started",
            duration: "12 hours, worst in night, slightly better this morning but still bad",
            aggravating: "Getting upset, crying",
            relieving: "Cold air seemed to help a bit earlier",
            associated: ["Runny nose for 2 days", "Mild fever", "Hoarse voice", "Stridor when crying or upset"]
        },
        history: {
            pastMedical: ["Born full term, no ongoing problems", "No previous croup"],
            medications: ["None", "Calpol given at 3am (paracetamol)"],
            allergies: "None known",
            familyHistory: "Dad had asthma as child",
            socialHistory: "Lives with both parents and older sister, attends nursery"
        },
        observations: {
            heartRate: 132,
            bloodPressure: "N/A",
            respiratoryRate: 36,
            oxygenSaturation: 95,
            temperature: 38.1,
            bloodGlucose: "N/A",
            gcs: 15,
            painScore: "N/A",
            capRefill: "2 seconds",
            skinColour: "Slightly flushed"
        },
        examination: {
            general: "Alert, sitting on mum's lap, barking cough intermittently, stridor when upset",
            chest: "Mild subcostal recession when upset, stridor on inspiration, lungs clear",
            heart: "Regular, no murmurs",
            abdomen: "Soft",
            other: "Drinking well between coughing episodes, no drooling"
        },
        redFlags: [
            "Stridor at rest (not just when upset) - indicates severe",
            "Increasing work of breathing",
            "Cyanosis",
            "Exhaustion",
            "Drooling (think epiglottitis)"
        ],
        correctDiagnosis: ["Croup", "Laryngotracheobronchitis", "Moderate croup"],
        differentials: ["Epiglottitis (but no drooling, not toxic)", "Inhaled foreign body", "Bacterial tracheitis"],
        keyQuestions: [
            "Any stridor at rest when calm?",
            "Is he drinking?",
            "Any drooling?",
            "What colour is he?",
            "Does he get better when calm?"
        ],
        patientBehaviour: "(Parent speaks for child) Child is clingy to parent, cries have stridor, barking cough, calmer when cuddled"
    },

    "paed-febrile-convulsion": {
        title: "Febrile Convulsion",
        category: "paediatric",
        difficulty: "intermediate",
        patient: {
            name: "Amelia (Parent: Sarah Brown)",
            age: "18 months",
            gender: "Female",
            occupation: "Child"
        },
        condition: "Simple febrile convulsion - now post-ictal",
        presentation: {
            chiefComplaint: "Parent: She had a fit! She was shaking all over and went blue!",
            onsetTime: "Seizure was 10 minutes ago, lasted about 3 minutes",
            location: "Whole body shaking",
            character: "Stiff then shaking, eyes rolled back",
            severity: "Parent: Terrifying, I thought she was dying",
            onset: "She's had a cold and fever today, then suddenly started fitting",
            duration: "Mum timed it - about 3 minutes, has stopped now",
            aggravating: "N/A",
            relieving: "Stopped on its own",
            associated: ["High fever", "Cold symptoms for 2 days", "Now very sleepy", "Was crying before it started"]
        },
        history: {
            pastMedical: ["Born 36 weeks but no ongoing problems", "No previous seizures", "No epilepsy"],
            medications: ["Calpol 2.5ml given at lunchtime"],
            allergies: "None known",
            familyHistory: "Dad's sister had febrile convulsions as child",
            socialHistory: "Lives with parents, goes to childminder"
        },
        observations: {
            heartRate: 140,
            bloodPressure: "N/A",
            respiratoryRate: 28,
            oxygenSaturation: 98,
            temperature: 39.2,
            bloodGlucose: 5.8,
            gcs: "14 (E3 V4 M6) - drowsy post-ictal",
            painScore: "N/A",
            capRefill: "2 seconds",
            skinColour: "Flushed, warm"
        },
        examination: {
            general: "Drowsy, post-ictal, responds to voice, pink colour now",
            chest: "Clear, mild runny nose",
            heart: "Regular, fast",
            abdomen: "Soft",
            fontanelle: "Soft, not bulging",
            rash: "None - checked for non-blanching",
            neuro: "Drowsy but moving all limbs, no focal signs"
        },
        redFlags: [
            "Complex features (focal, prolonged >15 min, recurrent)",
            "Non-blanching rash",
            "Bulging fontanelle",
            "Neck stiffness",
            "Petechiae"
        ],
        correctDiagnosis: ["Febrile convulsion", "Febrile seizure", "Simple febrile convulsion"],
        differentials: ["Meningitis/encephalitis", "Epilepsy", "Complex febrile convulsion"],
        keyQuestions: [
            "How long did it last?",
            "Did it affect the whole body or just one side?",
            "Has she had one before?",
            "Any rash?",
            "Is she waking up now?"
        ],
        patientBehaviour: "(Parent speaks) Child is drowsy, sleeping on parent, rousable to voice, temperature high"
    }
};


// ==================== HELPER FUNCTIONS ====================

/**
 * Builds the complete system prompt for a scenario
 * @param {string} scenarioId - The scenario ID
 * @param {string} userTrust - The user's ambulance trust (e.g., 'SWAST')
 * @returns {string} - The complete system prompt
 */
function buildScenarioSystemPrompt(scenarioId, userTrust) {
    const scenario = SCENARIO_PATIENT_DATA[scenarioId];
    if (!scenario) {
        console.error(`Scenario not found: ${scenarioId}`);
        return null;
    }

    // Build patient data string
    const patientData = formatPatientDataForPrompt(scenario);
    
    // Replace placeholder in system prompt
    let prompt = SCENARIO_SYSTEM_PROMPT.replace('{PATIENT_DATA}', patientData);
    
    // Add trust-specific note
    prompt += `\n\n## Trust Context:\nThe paramedic works for ${userTrust}. They will be expected to follow ${userTrust} guidelines.`;
    
    return prompt;
}

/**
 * Formats the patient data into a readable string for the AI
 */
function formatPatientDataForPrompt(scenario) {
    const p = scenario;
    
    return `
### Patient Identity
- Name: ${p.patient.name}
- Age: ${p.patient.age} years old
- Gender: ${p.patient.gender}
- Occupation: ${p.patient.occupation}

### Your Condition (KEEP SECRET - DO NOT REVEAL)
${p.condition}

### What Happened / Presenting Complaint
${p.presentation.chiefComplaint}
- Started: ${p.presentation.onsetTime}
- Location: ${p.presentation.location}
- Character: ${p.presentation.character}
- Severity: ${p.presentation.severity}
- Onset: ${p.presentation.onset}
- Duration: ${p.presentation.duration}
- Worse with: ${p.presentation.aggravating}
- Better with: ${p.presentation.relieving}
- Other symptoms: ${p.presentation.associated.join(', ')}

### Your Medical History (tell if asked)
- Past problems: ${p.history.pastMedical.join(', ')}
- Medications: ${p.history.medications.join(', ')}
- Allergies: ${p.history.allergies}
- Family history: ${p.history.familyHistory}
- Social: ${p.history.socialHistory}

### Your Observations (give ONLY when specific ones are requested)
- Heart rate: ${p.observations.heartRate} bpm
- Blood pressure: ${p.observations.bloodPressure}
- Respiratory rate: ${p.observations.respiratoryRate}
- Oxygen saturation: ${p.observations.oxygenSaturation}%
- Temperature: ${p.observations.temperature}°C
- Blood glucose: ${p.observations.bloodGlucose} mmol/L
- GCS: ${p.observations.gcs}
- Pain score: ${p.observations.painScore}/10
- Cap refill: ${p.observations.capRefill}
- Appearance: ${p.observations.skinColour}
${p.observations.pulseRhythm ? `- Pulse rhythm: ${p.observations.pulseRhythm}` : ''}
${p.observations.peakFlow ? `- Peak flow: ${p.observations.peakFlow}` : ''}

### How You Look/Examination Findings (describe if they examine you)
- General appearance: ${p.examination.general}
- Chest: ${p.examination.chest || 'N/A'}
- Heart: ${p.examination.heart || 'N/A'}
- Abdomen: ${p.examination.abdomen || 'N/A'}
- Legs: ${p.examination.legs || 'N/A'}
${p.examination.face ? `- Face: ${p.examination.face}` : ''}
${p.examination.arms ? `- Arms: ${p.examination.arms}` : ''}
${p.examination.speech ? `- Speech: ${p.examination.speech}` : ''}
${p.examination.neuro ? `- Neurology: ${p.examination.neuro}` : ''}
${p.examination.spine ? `- Spine: ${p.examination.spine}` : ''}

${p.ecgFindings ? `### ECG (if they do one): ${p.ecgFindings}` : ''}
${p.fastTest ? `### FAST Test Results: Face: ${p.fastTest.face}, Arms: ${p.fastTest.arms}, Speech: ${p.fastTest.speech}, Time: ${p.fastTest.time}` : ''}

### CORRECT DIAGNOSES (accept any of these):
${p.correctDiagnosis.join(', ')}

### Other reasonable differentials they might consider:
${p.differentials.join(', ')}

### How You Should Behave:
${p.patientBehaviour}
`;
}

/**
 * Gets the starter message for a scenario
 * @param {string} scenarioId - The scenario ID
 * @returns {string} - The patient's opening statement
 */
function getScenarioStarterMessage(scenarioId) {
    const scenario = SCENARIO_PATIENT_DATA[scenarioId];
    if (!scenario) {
        return "Hello, thank you for coming. I'm not feeling well at all. How can I help you?";
    }
    
    // Generate a realistic opening based on the patient's condition
    const openers = {
        "cardiac-chest-pain": `*clutching chest, looking pale and sweaty* 
Oh thank goodness you're here... I've got this terrible pain in my chest. It started about ${scenario.presentation.onsetTime}. It's really bad... I feel sick too.`,
        
        "cardiac-stemi": `*looking grey and unwell, hand on stomach* 
I don't know what's wrong with me... I've been feeling awful for the past hour. My stomach hurts and I feel really sick. I keep sweating. My husband made me call because he says I look terrible.`,
        
        "cardiac-af": `*sitting up, looking worried* 
My heart's going crazy! It's been racing and fluttering for about 3 hours now. It doesn't feel right - like it's skipping beats. I feel a bit dizzy too.`,
        
        "cardiac-heart-failure": `*sitting forward, breathing heavily, speaking in short phrases* 
I can't... catch my breath... It's been getting worse... over the last few days... I couldn't lie down... last night at all...`,
        
        "resp-asthma": `*sitting upright, struggling to breathe, speaking 2-3 words at a time* 
Can't... breathe... inhaler... not working... please help...`,
        
        "resp-copd": `*breathing heavily with pursed lips, coughing* 
*cough cough* My chest is... worse than normal... *cough* Been coughing up green stuff for days...`,
        
        "resp-anaphylaxis": `*scratching frantically, voice hoarse* 
I can't breathe! My throat's closing up! I just ate a brownie... I think it had peanuts... I'm allergic! *scratching at hives* Help me!`,
        
        "neuro-stroke": `*slurred speech, one side of face drooping* 
I... don't know... what's... *tries to lift right arm but can't* ...my arm won't... work...`,
        
        "neuro-hypoglycaemia": `*confused, sweating, agitated* 
What? Who are you? Where am I? I was just... I don't... *looking around confused* ...I need to get my taxi...`,
        
        "abdo-appendicitis": `*lying very still, guarding right side of abdomen* 
It really hurts! Started around my belly button last night but now it's down here *points to right lower abdomen*. It hurts so much when I move. Please don't press on it!`,
        
        "abdo-aaa": `*pale, grey, sweating profusely, grimacing* 
Something's really wrong... the pain is unbelievable... my back and stomach... came on suddenly... I feel like I'm going to pass out...`,
        
        "trauma-fall": `*lying on ground, not moving, looking frightened* 
Don't move me! I fell off the scaffolding... my back really hurts... and my legs feel strange... tingly... please don't move me...`,
        
        "paed-croup": `*Parent speaking, holding crying toddler* 
Please help us! Listen to that cough! *child gives barking cough* He's been like this since last night. And that noise when he breathes in - that's not normal is it? *child has stridor when crying*`,
        
        "paed-febrile-convulsion": `*Parent speaking, holding drowsy child, clearly distressed* 
She had a fit! About 10 minutes ago. She was shaking all over and went blue! She's still really hot and sleepy. Is she going to be okay? She's never done this before!`
    };
    
    return openers[scenarioId] || `*looking unwell* 
Thank you for coming. I'm ${scenario.patient.name}. ${scenario.presentation.chiefComplaint}. It started ${scenario.presentation.onsetTime}.`;
}

/**
 * Gets basic scenario info for display
 */
function getScenarioInfo(scenarioId) {
    const scenario = SCENARIO_PATIENT_DATA[scenarioId];
    if (!scenario) return null;
    
    return {
        title: scenario.title,
        category: scenario.category,
        difficulty: scenario.difficulty,
        description: `${scenario.patient.age}-year-old ${scenario.patient.gender.toLowerCase()} - ${scenario.presentation.chiefComplaint}`
    };
}

// Export for use in other files
window.scenarioPrompts = {
    SCENARIO_SYSTEM_PROMPT,
    SCENARIO_PATIENT_DATA,
    buildScenarioSystemPrompt,
    formatPatientDataForPrompt,
    getScenarioStarterMessage,
    getScenarioInfo
};