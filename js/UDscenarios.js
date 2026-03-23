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

// ==================== DIFFICULTY LEVELS ====================
// Dynamic modifiers that adjust scenario difficulty

const DIFFICULTY_LEVELS = {
    1: {
        name: "Level 1 - Student",
        description: "Classic presentations, cooperative patients",
        modifiers: {
            presentation: "Present with textbook, classic symptoms that are clearly recognisable. Make the key signs and symptoms obvious.",
            patientManner: "Be calm, cooperative, and articulate. Answer questions clearly and provide information willingly without needing much prompting.",
            historyRecall: "Remember your medical history clearly. Know your medications and allergies well. Provide complete information when asked.",
            complexity: "Focus only on the primary condition. Do not introduce additional co-morbidities or complicating factors.",
            redFlags: "Volunteer important red flag symptoms without being asked, or make them very obvious when questioned.",
            clinicalCourse: "Remain stable throughout the scenario. Vital signs should not deteriorate.",
            distractors: "Do not introduce any distracting symptoms or social issues that might confuse the assessment."
        }
    },
    2: {
        name: "Level 2 - NQP",
        description: "Realistic presentations, some complexity",
        modifiers: {
            presentation: "Present realistically but with recognisable features. Symptoms may not be textbook-perfect but should still point towards the diagnosis.",
            patientManner: "Be somewhat anxious or worried about your condition. You may need some reassurance. Answer questions but might need occasional prompting for details.",
            historyRecall: "Remember most of your medical history but may be uncertain about some medication doses or exact dates. 'I think it was...' or 'Something like...' responses are appropriate.",
            complexity: "You may have one minor co-morbidity (such as well-controlled hypertension or diabetes) that adds slight complexity but doesn't significantly alter the presentation.",
            redFlags: "Red flags are present but must be specifically asked about - don't volunteer them. Reveal them when directly questioned.",
            clinicalCourse: "Remain mostly stable but may show subtle hints of potential deterioration if assessment is delayed.",
            distractors: "You may have minor concerns (worried about missing work, anxious about hospitals) that add realism but shouldn't significantly derail the assessment."
        }
    },
    3: {
        name: "Level 3 - Paramedic",
        description: "Atypical presentations, complex patients",
        modifiers: {
            presentation: "Present atypically or with 'silent' features. Symptoms may be vague, subtle, or easily attributed to other causes. The classic textbook presentation should NOT be obvious.",
            patientManner: "Be one of: confused/vague in your answers, a poor historian who gives contradictory information, distressed and hard to calm, or dismissive of your symptoms ('I'm sure it's nothing'). Make gathering information challenging.",
            historyRecall: "Be a poor historian. You may not remember all your medications, give vague timelines ('sometime last week'), or provide information that requires clarification. Family members might need to fill in gaps.",
            complexity: "Have multiple interacting co-morbidities that complicate the picture. For example: diabetes masking chest pain, COPD with heart failure, polypharmacy with potential drug interactions.",
            redFlags: "Red flags are hidden and subtle. They require careful, systematic questioning to uncover. You may initially deny symptoms that later turn out to be significant.",
            clinicalCourse: "Your condition may show signs of deterioration during the scenario if assessment is slow. Vital signs might worsen, consciousness might decrease, or new symptoms might develop.",
            distractors: "Introduce significant distractors: other symptoms unrelated to the main condition, family members with strong opinions, social issues that demand attention, or previous bad experiences with healthcare."
        }
    }
};

// ==================== PATIENT PERSONAS (LEVEL 3 ONLY) ====================
// These create realistic assessment challenges - focused on ASSESSMENT not treatment
// A persona is automatically assigned at Level 3 to make information gathering genuinely challenging

const PATIENT_PERSONAS = {
    denier: {
        name: "The Denier",
        description: "Minimises symptoms, reluctant to accept help",
        behaviour: `You are a DENIER patient. You MUST exhibit these behaviours throughout:
- Actively minimise your symptoms: "I'm sure it's nothing", "My wife overreacted by calling you"
- Be reluctant to accept you're unwell: "I've felt worse", "I'll be fine in a minute"  
- Initially resist assessment: "Do you really need to do all that?"
- Downplay concerning features: "It's just a twinge", "Barely hurts really"
- Only gradually reveal the true severity when the paramedic is persistent and professional
- Make them work to uncover how serious your condition actually is
- Your clinical observations will tell the real story - but YOU won't admit it easily`
    },
    poorHistorian: {
        name: "The Poor Historian",
        description: "Doesn't know medications or medical history well",
        behaviour: `You are a POOR HISTORIAN patient. You MUST exhibit these behaviours throughout:
- Be vague about medications: "I take some tablets... white ones, I think", "The doctor gave me something for my heart"
- Uncertain about medical history: "I had something done years ago", "They said it was my blood or something"  
- Struggle with timelines: "It started... sometime last week? Or was it the week before?"
- Mix up names: "Dr... something... at the hospital", "That condition beginning with D"
- Give incomplete information that requires careful follow-up questions
- You genuinely don't know the details - you're not being difficult on purpose
- If asked about a medication list or repeat prescription, you might say "it's somewhere in the kitchen drawer"`
    },
    distressed: {
        name: "The Distressed",
        description: "Highly emotional, barely able to answer questions",
        behaviour: `You are a DISTRESSED patient. You MUST exhibit these behaviours throughout:
- Be crying, panicking, or very anxious between answers
- Give fragmented responses: "I can't... it hurts so much... please help me..."
- Need calming and reassurance before you can answer properly
- Require patience - information gathering will be slow
- May fixate on one concern: "Am I going to die?", "What about my children?"
- The paramedic must manage your emotional state to get information
- If they are calm and reassuring, you gradually become more cooperative
- If they are impatient or dismissive, you become more distressed`
    },
    confused: {
        name: "The Confused",
        description: "Gives contradictory or muddled information",
        behaviour: `You are a CONFUSED patient. You MUST exhibit these behaviours throughout:
- Give contradictory information: "The pain started this morning... or was it last night?"
- Mix up details: confuse medications, get names wrong, muddle timelines
- Change your story unintentionally when asked again
- Say things like: "Wait, that's not right...", "Did I say morning? I meant evening"
- The paramedic must piece together what's actually true through careful questioning
- This confusion may be due to your condition, age, stress, or cognitive state
- Be consistent about being inconsistent - your confusion should feel genuine, not evasive
- You're trying to help but your brain isn't cooperating`
    },
    stoic: {
        name: "The Stoic",
        description: "Downplays everything, clinical findings don't match presentation",
        behaviour: `You are a STOIC patient. You MUST exhibit these behaviours throughout:
- Downplay all symptoms: "It's not that bad", "I've had worse", "I don't want to make a fuss"
- Rate pain much lower than it should be: severe conditions described as "about a 3 or 4"
- Minimise concerning symptoms: "I'm just a bit breathless" (even when severely unwell)
- Be dismissive of concern: "You don't need to worry about me", "There are sicker people than me"
- Your clinical findings (observations, examination) should tell the REAL story
- Force the paramedic to trust their clinical assessment over your self-report
- Be tough and uncomplaining - but your body tells the truth
- You might have a "stiff upper lip" attitude or be from a generation that doesn't complain`
    },
    interferingFamily: {
        name: "The Interfering Relative",
        description: "Family member answers for patient, sometimes incorrectly",
        behaviour: `There is an INTERFERING FAMILY MEMBER present. You MUST incorporate this throughout:
- A family member (spouse, adult child, etc.) constantly interrupts and answers FOR the patient
- The family member may give information that is incomplete or even incorrect
- The family member has their own theories: "I think it's just indigestion", "He's been overdoing it"
- When the paramedic asks the patient, the relative jumps in: "He means...", "What she's trying to say is..."
- The patient may defer to the family member OR try to correct them (creating conflict)
- The paramedic must politely but firmly direct questions to the patient
- Create realistic tension between getting information from family vs patient
- Format your responses to show BOTH voices, e.g.:
  PATIENT: "Well, I think it started—"
  RELATIVE: "It was definitely after breakfast, I remember because—"
  PATIENT: "No, it was before breakfast, dear..."
- The relative means well but is making assessment harder`
    }
};

/**
 * Get a persona for Level 3 based on scenario ID
 * Uses deterministic selection so the same scenario always gets the same persona
 * This ensures consistency for learners who repeat scenarios
 */
function getPersonaForScenario(scenarioId) {
    const personaKeys = Object.keys(PATIENT_PERSONAS);
    
    // Create a simple hash from the scenario ID
    let hash = 0;
    for (let i = 0; i < scenarioId.length; i++) {
        const char = scenarioId.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    
    // Use absolute value and modulo to select persona
    const index = Math.abs(hash) % personaKeys.length;
    return personaKeys[index];
}

// ==================== DETERIORATION SYSTEM ====================
// Patients deteriorate if assessment is delayed - creates realistic urgency
// Based on ASSESSMENT delays, NOT treatment delays

const DETERIORATION_CONFIG = {
    // Thresholds by difficulty level (exchanges without key assessment)
    thresholds: {
        1: { warning: 10, critical: 15 },  // Level 1 - Very slow
        2: { warning: 8, critical: 12 },   // Level 2 - Slow  
        3: { warning: 6, critical: 10 }    // Level 3 - Faster
    },
    
    // Assessments that reset/delay the deterioration counter
    keyAssessments: ['obs', 'ecg', 'chest', 'abdo', 'neuro', 'skin', 'fast', 'mend'],
    
    // Vital sign changes at each phase
    vitalChanges: {
        warning: {
            hr: '+15',      // Increase by 15
            rr: '+6',       // Increase by 6
            spo2: '-4',     // Decrease by 4
            gcs: '-1',      // Decrease by 1
            bp_systolic: '-20'  // Decrease by 20
        },
        critical: {
            hr: '+30',
            rr: '+10', 
            spo2: '-8',
            gcs: '-3',
            bp_systolic: '-40'
        }
    },
    
    // Alert messages shown in chat
    alerts: {
        warning: {
            icon: '&#9888;&#65039;',
            title: 'CLINICAL OBSERVATION',
            message: "The patient appears more unwell than when you arrived. Their colour has changed and they seem less responsive to questions."
        },
        critical: {
            icon: '&#128680;',
            title: 'PATIENT DETERIORATING', 
            message: "The patient's condition is worsening rapidly. You need to complete your assessment urgently."
        }
    },
    
    // AI behaviour instructions at each phase
    behaviourChanges: {
        warning: `
The patient is now DETERIORATING. You must reflect this in your responses:
- Be slightly drowsier and slower to respond
- Give shorter, less detailed answers
- Show signs of worsening condition (more breathless, paler, weaker)
- May need questions repeated
- Express that you're feeling worse: "I'm feeling worse...", "Everything's going a bit fuzzy..."`,
        
        critical: `
The patient is now CRITICALLY DETERIORATING. You must reflect this in your responses:
- Be significantly drowsier, may only give one or two word answers
- Struggle to stay focused or awake
- Show obvious distress or declining consciousness
- May not be able to answer complex questions
- Responses like: "I can't... *trails off*", "Help me...", "*eyes closing*"
- If GCS is very low, may only groan or not respond verbally`
    }
};

/**
 * Calculate deteriorated vital signs based on phase
 * @param {object} baseVitals - Original vital signs from scenario
 * @param {string} phase - 'warning' or 'critical'
 * @returns {object} - Modified vital signs
 */
function calculateDeterioratedVitals(baseVitals, phase) {
    const changes = DETERIORATION_CONFIG.vitalChanges[phase];
    if (!changes) return baseVitals;
    
    const newVitals = { ...baseVitals };
    
    // Heart rate
    if (typeof newVitals.hr === 'number') {
        newVitals.hr = Math.min(180, newVitals.hr + parseInt(changes.hr));
    }
    
    // Respiratory rate
    if (typeof newVitals.rr === 'number') {
        newVitals.rr = Math.min(45, newVitals.rr + parseInt(changes.rr));
    }
    
    // SpO2
    if (typeof newVitals.spo2 === 'number') {
        newVitals.spo2 = Math.max(70, newVitals.spo2 + parseInt(changes.spo2));
    }
    
    // GCS
    if (typeof newVitals.gcs === 'number') {
        newVitals.gcs = Math.max(3, newVitals.gcs + parseInt(changes.gcs));
    }
    
    // Blood pressure (handle string format like "120/80")
    if (typeof newVitals.bp === 'string' && newVitals.bp.includes('/')) {
        const [systolic, diastolic] = newVitals.bp.split('/').map(v => parseInt(v));
        const newSystolic = Math.max(60, systolic + parseInt(changes.bp_systolic));
        const newDiastolic = Math.max(40, diastolic + parseInt(changes.bp_systolic) / 2);
        newVitals.bp = `${newSystolic}/${Math.round(newDiastolic)}`;
    }
    
    return newVitals;
}

/**
 * Get deterioration status based on exchanges since last key assessment
 * @param {number} exchangesSinceAssessment - Count of exchanges without key assessment
 * @param {number} difficultyLevel - Current difficulty level (1, 2, or 3)
 * @returns {string|null} - 'warning', 'critical', or null
 */
function getDeteriorationPhase(exchangesSinceAssessment, difficultyLevel) {
    const thresholds = DETERIORATION_CONFIG.thresholds[difficultyLevel] || DETERIORATION_CONFIG.thresholds[2];
    
    if (exchangesSinceAssessment >= thresholds.critical) {
        return 'critical';
    } else if (exchangesSinceAssessment >= thresholds.warning) {
        return 'warning';
    }
    return null;
}

/**
 * Check if an assessment type is a "key assessment" that resets deterioration
 * @param {string} assessmentType - The type of assessment performed
 * @returns {boolean}
 */
function isKeyAssessment(assessmentType) {
    return DETERIORATION_CONFIG.keyAssessments.includes(assessmentType);
}

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
            ecg: "Rate 95bpm, regular rhythm with P waves before each QRS. ST elevation V1-V4 (3-4mm) with ST depression in leads II, III, aVF. Tall, peaked T waves in V2-V3.",
            redFlags: [
                "Central crushing chest pain",
                "Radiation to arm/jaw",
                "Diaphoresis (sweating)",
                "Associated nausea",
                "Sudden onset at rest",
                "Cardiac risk factors (HTN, DM, ex-smoker)"
            ]
        },
        starterMessage: "Hello... I've called the ambulance because I've got this terrible pain in my chest. It's really quite bad... I feel a bit sick too."
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
            ecg: "Rate 52bpm, regular rhythm with P waves before each QRS. ST elevation in leads II, III, aVF (2-3mm) with ST depression V1-V3. PR interval 240ms.",
            redFlags: [
                "Atypical presentation in diabetic patient",
                "Bradycardia (consider inferior MI with vagal response)",
                "Hypotension",
                "Diaphoresis without fever",
                "Previous MI history",
                "Epigastric pain mimicking GI cause"
            ]
        },
        starterMessage: "I don't know what's wrong with me... I've been feeling awful for the past hour. My husband made me call because he says I look grey."
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
            ecg: "Rate 180bpm, regular rhythm. No visible P waves. QRS narrow (<120ms). No ST changes.",
            redFlags: [
                "Very rapid heart rate (>150bpm)",
                "Hypotension (borderline)",
                "Associated breathlessness",
                "Sudden onset/offset pattern",
                "Chest discomfort with tachycardia",
                "Pre-syncope symptoms"
            ]
        },
        starterMessage: "My heart's going absolutely crazy! I was just sitting having my lunch and suddenly it started racing. I can feel it pounding in my chest and throat."
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
            ecg: "Rate 110bpm, irregularly irregular rhythm, no P waves visible, fibrillatory baseline. Tall R waves in V5-V6, deep S waves in V1-V2. ST-T wave changes present.",
            redFlags: [
                "Orthopnoea (can't lie flat)",
                "Severe hypoxia (SpO2 88%)",
                "Hypertensive crisis",
                "Bilateral crackles (pulmonary oedema)",
                "Peripheral oedema",
                "Tachypnoea and respiratory distress"
            ]
        },
        starterMessage: "*breathless* I can't... catch my breath. It's been getting worse."
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
            ecg: "Rate 130-140bpm (variable), irregularly irregular rhythm. No P waves visible, fibrillatory baseline. QRS complexes narrow. No ST changes.",
            redFlags: [
                "New onset AF (stroke risk)",
                "Fast ventricular response (>100bpm)",
                "Duration >48 hours (thrombus risk)",
                "Symptoms on exertion",
                "Underlying hypertension",
                "Need to consider anticoagulation"
            ]
        },
        starterMessage: "My heart keeps going really fast and then slow... it feels like it's fluttering in my chest."
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
            ecg: "Rate 32bpm. P waves present and regular at approximately 70bpm. QRS complexes wide and occurring independently of P waves. No consistent relationship between P waves and QRS complexes.",
            redFlags: [
                "Severe bradycardia (<40bpm)",
                "Syncope/collapse",
                "Hypotension",
                "Altered consciousness",
                "Complete heart block on ECG",
                "Haemodynamic compromise"
            ]
        },
        starterMessage: "*weak voice* I just came over all funny... everything went dark and my wife says I went down.... everything looks a bit grey."
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
            ecg: "Rate 88bpm, regular rhythm with P waves before each QRS. T wave inversion in leads V4-V6 and I, aVL. No ST elevation.",
            redFlags: [
                "Change in angina pattern (now at rest)",
                "Reduced response to GTN",
                "Dynamic ECG changes",
                "Pain more frequent than usual",
                "Crescendo pattern",
                "High risk of progression to MI"
            ]
        },
        starterMessage: "I've had angina for years and I know what it feels like. But this is different... My spray helps a bit but doesn't take it away completely like it used to."
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
            ecg: "Rate 88bpm, regular rhythm with P waves before each QRS. ST depression V4-V6 (1-2mm, horizontal). T wave inversion in leads I, aVL. No ST elevation.",
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
            ecg: "Rate 105bpm, regular rhythm with P waves before each QRS. Tall R waves in V5-V6, deep S waves in V1-V2. No ST changes.",
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
        starterMessage: "*writhing in agony* The pain... it's like something tearing inside me! I've never felt anything like it. I feel like I'm going to die! Please help me."
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
            ecg: "Rate 45bpm, regular rhythm with P waves before each QRS. Pauses of up to 3 seconds visible. Previous ECGs (patient reports) showed fast heart rate.",
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
        starterMessage: "I keep going all dizzy and nearly falling over. It's happened about five times today. I've had these funny turns on and off for a while but never this bad."
    },

    // ==================== CARDIAC (scenarios 11-20) ====================
    {
        id: "cardiac-011",
        category: "cardiac",
        dispatch: {
            name: "Gary",
            age: 52,
            gender: "M",
            chiefComplaint: "Collapse",
            details: "Found collapsed at gym, bystander CPR in progress",
            category: 1
        },
        patient: {
            condition: "Ventricular Tachycardia with Pulse",
            history: "Previous MI 2 years ago, ICD implanted but patient says device 'hasn't fired'",
            medications: "Amiodarone, Bisoprolol, Atorvastatin, Aspirin",
            vitals: {
                hr: 180,
                bp: "80/50",
                rr: 28,
                spo2: 93,
                temp: 36.9,
                gcs: 13,
                bm: 6.1,
                pain: 4
            },
            presentation: "Broad complex tachycardia, haemodynamically compromised, pale and sweating",
            ecg: "Rate 180bpm, regular rhythm. Broad QRS complexes (>160ms). Fusion beats visible. AV dissociation - P waves march through independently. Concordance in V1-V6 (all positive).",
            redFlags: [
                "Broad complex tachycardia - treat as VT until proven otherwise",
                "Haemodynamic compromise (BP 80/50)",
                "Previous MI (substrate for VT)",
                "ICD has not fired - may be undersensing",
                "Altered consciousness",
                "TIME CRITICAL - synchronised DC cardioversion if pulsed"
            ]
        },
        starterMessage: "*confused and very distressed* I was just on the treadmill... I feel... I feel terrible. Everything went grey and I came round on the floor. My chest is pounding."
    },
    {
        id: "cardiac-012",
        category: "cardiac",
        dispatch: {
            name: "Denise",
            age: 60,
            gender: "F",
            chiefComplaint: "Severe headache and chest pain",
            details: "Sudden onset, very high blood pressure reported by GP",
            category: 2
        },
        patient: {
            condition: "Hypertensive Emergency with End-Organ Damage",
            history: "Poorly controlled hypertension, CKD stage 3, stopped medication 2 weeks ago",
            medications: "Amlodipine, Ramipril (stopped), Doxazosin (stopped)",
            vitals: {
                hr: 98,
                bp: "240/130",
                rr: 22,
                spo2: 97,
                temp: 36.6,
                gcs: 14,
                bm: 7.2,
                pain: 8
            },
            presentation: "Hypertensive emergency, blurred vision, severe headache, confusion, chest pain suggesting aortic involvement",
            ecg: "Rate 98bpm, regular rhythm with P waves before each QRS. LVH pattern - Sokolow-Lyon criteria met. ST depression in V5-V6, I, aVL. T wave inversion laterally.",
            redFlags: [
                "BP >220/120 (hypertensive emergency)",
                "End-organ damage - altered GCS, visual changes",
                "Chest pain with severe hypertension (aortic dissection risk)",
                "Stopped antihypertensives 2 weeks ago",
                "Epistaxis or confusion indicates cerebral oedema risk",
                "DO NOT lower BP rapidly - controlled reduction only"
            ]
        },
        starterMessage: "My head... the pain is the worst I've ever had. And my chest feels tight. I stopped taking my tablets because they were making me feel dizzy. I can't see properly - everything looks blurry."
    },
    {
        id: "cardiac-013",
        category: "cardiac",
        dispatch: {
            name: "Patrick",
            age: 38,
            gender: "M",
            chiefComplaint: "Chest pain - sharp, worse on breathing",
            details: "Young male, chest pain since yesterday, flu last week",
            category: 3
        },
        patient: {
            condition: "Acute Pericarditis",
            history: "Viral illness (flu-like) 10 days ago, otherwise fit and well",
            medications: "Ibuprofen (self-medicating - partially helps)",
            vitals: {
                hr: 102,
                bp: "120/80",
                rr: 20,
                spo2: 98,
                temp: 37.9,
                gcs: 15,
                bm: 5.4,
                pain: 6
            },
            presentation: "Pleuritic chest pain, relieved sitting forward, pericardial friction rub, post-viral",
            ecg: "Rate 102bpm, regular rhythm. Widespread saddle-shaped ST elevation in most leads (I, II, aVF, V2-V6). PR depression in II and V4-V6. No reciprocal changes. No focal ST elevation pattern.",
            redFlags: [
                "Widespread saddle-shaped ST elevation (pericarditis pattern)",
                "Pain relieved sitting forward - classic pericarditic feature",
                "Post-viral trigger",
                "Pericardial friction rub on auscultation",
                "Monitor for pericardial effusion/tamponade",
                "Differentiate from STEMI - widespread elevation, no reciprocal changes"
            ]
        },
        starterMessage: "The pain is really sharp and it's worse when I breathe in deeply. Strangely it's better when I sit forward and lean on my knees. I had the flu last week but I thought I was getting better."
    },
    {
        id: "cardiac-014",
        category: "cardiac",
        dispatch: {
            name: "Roger",
            age: 70,
            gender: "M",
            chiefComplaint: "Known cancer patient - very breathless",
            details: "Lung cancer, progressive breathlessness over 24 hours",
            category: 2
        },
        patient: {
            condition: "Cardiac Tamponade",
            history: "Metastatic lung cancer, pericardial metastases known",
            medications: "Morphine SR, Dexamethasone, Omeprazole, Cyclizine",
            vitals: {
                hr: 125,
                bp: "88/72",
                rr: 28,
                spo2: 92,
                temp: 36.3,
                gcs: 15,
                bm: 6.0,
                pain: 3
            },
            presentation: "Beck's triad - hypotension, raised JVP, muffled heart sounds. Pulsus paradoxus present",
            ecg: "Rate 125bpm, regular. Electrical alternans - QRS complexes alternating in size beat-to-beat. Low voltage complexes throughout. Sinus tachycardia.",
            redFlags: [
                "Beck's triad (hypotension, raised JVP, muffled heart sounds)",
                "Electrical alternans on ECG - pathognomonic of tamponade",
                "Pulsus paradoxus (BP drops >10mmHg on inspiration)",
                "Malignant pericardial effusion (known cancer)",
                "TIME CRITICAL - pericardiocentesis needed",
                "Obstructive shock mechanism"
            ]
        },
        starterMessage: "I've been getting so much worse today... I can't catch my breath at all. I know my cancer is bad but this feels different - my heart feels like it's being squeezed."
    },
    {
        id: "cardiac-015",
        category: "cardiac",
        dispatch: {
            name: "Carol",
            age: 66,
            gender: "F",
            chiefComplaint: "Chest pain and collapse",
            details: "Post-MI patient, now shocked and very unwell",
            category: 1
        },
        patient: {
            condition: "Cardiogenic Shock - Post STEMI Complication",
            history: "STEMI 3 days ago, discharged early, returns feeling worse",
            medications: "Dual antiplatelet therapy, Bisoprolol, Ramipril, Atorvastatin (all new post-MI)",
            vitals: {
                hr: 118,
                bp: "78/50",
                rr: 30,
                spo2: 88,
                temp: 36.1,
                gcs: 14,
                bm: 9.8,
                pain: 7
            },
            presentation: "Cold clammy peripheries, reduced urine output, pulmonary oedema, profound hypotension",
            ecg: "Rate 118bpm, regular. Evolving STEMI changes - new left bundle branch block. Q waves V1-V4. ST still elevated V2-V3.",
            redFlags: [
                "Cardiogenic shock - hypotension + signs of hypoperfusion",
                "Cold clammy peripheries (vasoconstriction)",
                "New LBBB post-MI (mechanical complication?)",
                "SpO2 88% (pulmonary oedema)",
                "TIME CRITICAL - early revascularisation",
                "Mortality >50% without rapid intervention"
            ]
        },
        starterMessage: "I came home three days ago after a heart attack and I've just been getting worse and worse. I feel absolutely dreadful - I'm so cold and I can barely breathe. I feel like I'm dying."
    },
    {
        id: "cardiac-016",
        category: "cardiac",
        dispatch: {
            name: "Jordan",
            age: 24,
            gender: "M",
            chiefComplaint: "Chest pain, feels unwell",
            details: "Young male, chest pain for 3 days, recent flu",
            category: 3
        },
        patient: {
            condition: "Myocarditis",
            history: "COVID infection 2 weeks ago, competitive athlete",
            medications: "None regular, paracetamol and ibuprofen self-medicating",
            vitals: {
                hr: 110,
                bp: "105/70",
                rr: 22,
                spo2: 97,
                temp: 38.1,
                gcs: 15,
                bm: 5.1,
                pain: 5
            },
            presentation: "Exertional chest pain, fatigue, palpitations, post-viral - myocarditis until proven otherwise",
            ecg: "Rate 110bpm, regular. Widespread ST changes - diffuse ST elevation with T wave changes. Occasional ventricular ectopics. QTc mildly prolonged at 460ms.",
            redFlags: [
                "Post-viral presentation (COVID, flu) in young person",
                "Chest pain with exertion in athlete",
                "Ventricular ectopics - arrhythmia risk",
                "Myocarditis can cause sudden cardiac death in young athletes",
                "DO NOT allow to exercise",
                "Needs troponin, echo, cardiac MRI"
            ]
        },
        starterMessage: "I'm a runner and I've been training for a marathon... but since I had COVID a couple of weeks ago I've had this chest pain. It's worst when I try to exercise. I thought I was just unfit from being ill but it's getting worse."
    },
    {
        id: "cardiac-017",
        category: "cardiac",
        dispatch: {
            name: "Helen",
            age: 22,
            gender: "F",
            chiefComplaint: "Fainted at work",
            details: "Student nurse, fainted during a procedure, now recovering",
            category: 3
        },
        patient: {
            condition: "Vasovagal Syncope",
            history: "Previous faints when anxious or seeing blood, low BMI",
            medications: "Combined oral contraceptive pill",
            vitals: {
                hr: 58,
                bp: "105/65",
                rr: 16,
                spo2: 99,
                temp: 36.5,
                gcs: 15,
                bm: 4.9,
                pain: 0
            },
            presentation: "Witnessed collapse with prodrome, rapid recovery, triggered by emotional stimulus, no injury",
            ecg: "Rate 58bpm, regular rhythm with P waves before each QRS. Normal sinus rhythm. No ST changes. Normal PR and QRS intervals.",
            redFlags: [
                "Exclude dangerous causes - no features of VT, structural disease",
                "Age and trigger are reassuring for vasovagal",
                "Prolonged LOC or no prodrome would be concerning",
                "On COCP - check for PE risk factors",
                "ECG normal (important to rule out long QT, WPW)",
                "Advise on avoidance and physical counter-pressure manoeuvres"
            ]
        },
        starterMessage: "I was helping with a cannula and I felt really hot and sick all of a sudden... everything went tunnel-y and I woke up on the floor. It happened to me at school when I had a blood test once. I'm fine now, honestly."
    },
    {
        id: "cardiac-018",
        category: "cardiac",
        dispatch: {
            name: "Yvonne",
            age: 45,
            gender: "F",
            chiefComplaint: "Collapsed - possible cardiac arrest",
            details: "Witness says she fell and shook briefly, now unresponsive",
            category: 1
        },
        patient: {
            condition: "Torsades de Pointes / Polymorphic VT",
            history: "Known long QT syndrome, recently started new antibiotic",
            medications: "Azithromycin (new this week), Citalopram, Domperidone",
            vitals: {
                hr: 220,
                bp: "60/40",
                rr: 8,
                spo2: 85,
                temp: 36.7,
                gcs: 8,
                bm: 5.3,
                pain: 0
            },
            presentation: "Polymorphic VT with twisting QRS axis, severely compromised, multiple QT-prolonging drugs",
            ecg: "Rate approximately 220bpm, irregular. QRS complexes twist around isoelectric baseline in characteristic spindle pattern - axis rotates every 5-20 beats. Underlying long QT intervals visible in sinus beats.",
            redFlags: [
                "Torsades de Pointes - specific VT subtype",
                "Multiple QT-prolonging drugs (azithromycin, citalopram, domperidone)",
                "Known long QT syndrome",
                "MAGNESIUM SULPHATE is first-line treatment",
                "Defibrillation if pulseless",
                "DO NOT give amiodarone (prolongs QT further)"
            ]
        },
        starterMessage: "*Patient unresponsive - bystander speaks* She just fell and shook for a few seconds. She's been on a new antibiotic since Monday for a chest infection."
    },
    {
        id: "cardiac-019",
        category: "cardiac",
        dispatch: {
            name: "Norman",
            age: 68,
            gender: "M",
            chiefComplaint: "Breathless and very swollen legs",
            details: "Known COPD, getting much worse over last week",
            category: 3
        },
        patient: {
            condition: "Cor Pulmonale - Right Heart Failure secondary to COPD",
            history: "Severe COPD (FEV1 30% predicted), chronic hypoxia, home oxygen 16hrs/day",
            medications: "Tiotropium, Salbutamol, Seretide, Prednisolone, Home O2",
            vitals: {
                hr: 105,
                bp: "130/85",
                rr: 26,
                spo2: 82,
                temp: 36.8,
                gcs: 15,
                bm: 5.7,
                pain: 0
            },
            presentation: "Massive peripheral oedema, raised JVP, no pulmonary crackles (right heart failure pattern), severe hypoxia",
            ecg: "Rate 105bpm, regular. Right axis deviation. Tall R in V1, deep S in V6. P pulmonale (tall peaked P waves >2.5mm in II). RBBB pattern. ST-T changes right-sided leads.",
            redFlags: [
                "Right heart failure (cor pulmonale) - no pulmonary oedema",
                "Severe hypoxia (SpO2 82%) - but HYPERCAPNIC RISK",
                "Target SpO2 88-92% only in COPD",
                "Massive peripheral oedema - right-sided overload",
                "Right axis deviation and P pulmonale on ECG",
                "DO NOT over-oxygenate - hypoxic drive"
            ]
        },
        starterMessage: "I know I've got bad lungs but this is different - my legs are like tree trunks and I can't walk to the bathroom. I've been on oxygen at home but I've been turning it up a bit because I feel so bad. Is that alright?"
    },
    {
        id: "cardiac-020",
        category: "cardiac",
        dispatch: {
            name: "Brian",
            age: 61,
            gender: "M",
            chiefComplaint: "Post-cardiac arrest - now has pulse",
            details: "Bystander CPR, ROSC achieved, 999 crew on scene",
            category: 1
        },
        patient: {
            condition: "Post-Resuscitation Care - ROSC after VF Arrest",
            history: "Known IHD, previous CABG 5 years ago",
            medications: "Aspirin, Clopidogrel, Atorvastatin, Ramipril",
            vitals: {
                hr: 88,
                bp: "100/65",
                rr: 12,
                spo2: 95,
                temp: 35.8,
                gcs: 7,
                bm: 8.5,
                pain: 0
            },
            presentation: "Post-ROSC: unconscious, agonal breathing, post-hypoxic brain injury risk, hypothermia, needs immediate transfer",
            ecg: "Rate 88bpm, regular. ST elevation V2-V4 (2mm). LBBB morphology - possible new. Frequent ventricular ectopics. QTc prolonged at 480ms.",
            redFlags: [
                "Post-ROSC - re-arrest risk is high",
                "GCS 7 - needs airway protection",
                "ST elevation present - possible underlying STEMI (cause of arrest)",
                "Targeted temperature management consideration",
                "TARGET SpO2 94-98% - avoid hyperoxia post-arrest",
                "TIME CRITICAL - direct to PCI-capable centre"
            ]
        },
        starterMessage: "*Patient unconscious - crew handover* We've had a ROSC after approximately 15 minutes of VF. Two shocks delivered. He's breathing but GCS is about 7. ECG looks like there might be a STEMI. What's your plan?"
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
            ecg: "Rate 125bpm, regular rhythm with P waves before each QRS. Normal axis. No ST changes.",
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
        starterMessage: "*wheeze* I can't... catch my breath... *wheeze* My inhaler isn't helping... I've used it about... *wheeze* ...ten times."
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
            ecg: "Rate 105bpm, regular rhythm with P waves before each QRS. Right axis deviation. Peaked P waves in lead II. Low voltage QRS complexes.",
            redFlags: [
                "Hypoxia despite home oxygen",
                "Pyrexia (infection)",
                "Increased/purulent sputum",
                "Reduced air entry",
                "Known severe COPD",
                "Beware CO2 retention with high-flow O2"
            ]
        },
        starterMessage: "*coughing* I've been bringing up loads of horrible green stuff... *cough cough*"
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
            ecg: "Rate 110bpm, regular rhythm with P waves before each QRS. Normal axis. No acute changes.",
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
            ecg: "Rate 115bpm, regular rhythm with P waves before each QRS. Deep S wave in lead I, Q wave in lead III, inverted T wave in lead III. Right axis deviation. T wave inversion V1-V3.",
            redFlags: [
                "Pleuritic chest pain with dyspnoea",
                "Recent long-haul flight (DVT risk)",
                "Combined oral contraceptive use",
                "Tachycardia disproportionate to findings",
                "Hypoxia with clear chest",
                "S1Q3T3 pattern on ECG"
            ]
        },
        starterMessage: "I was just sitting watching TV and suddenly got this really sharp pain in my chest. It hurts when I breathe in."
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
            ecg: "Rate 130bpm, regular rhythm with P waves before each QRS. Normal axis. No ST changes.",
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
        starterMessage: "*distressed, voice hoarse* I can't breathe properly... my throat feels really tight... I'm so itchy everywhere and my lips feel huge. "
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
            ecg: "Rate 100bpm, regular rhythm with P waves before each QRS. Normal axis. Non-specific T wave changes.",
            redFlags: [
                "Severe hypoxia (SpO2 <88%)",
                "Day 7-10 of illness (cytokine storm risk)",
                "High-risk features (diabetes, obesity)",
                "Silent hypoxia (patient may not feel as unwell as they are)",
                "Worsening trajectory",
                "May need CPAP/hospital care"
            ]
        },
        starterMessage: "I tested positive for COVID a week ago and I've been managing at home... but today I just can't catch my breath. I've been checking my oxygen with that thing on my finger and it's been dropping all day. I feel awful."
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
            ecg: "Rate 100bpm, regular rhythm with P waves before each QRS.",
            redFlags: [
                "Sudden onset dyspnoea and pleuritic pain",
                "Reduced breath sounds unilaterally",
                "Hyper-resonance to percussion",
                "Tall thin male (classic demographic)",
                "Smoker",
                "Watch for tension (tracheal deviation, hypotension)"
            ]
        },
        starterMessage: "I was just sitting playing video games and suddenly got this really sharp pain on the right side of my chest. Now I can't catch my breath properly. I've never had anything like this."
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
            ecg: "Rate 88bpm, regular rhythm with P waves before each QRS.",
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
            ecg: "Rate 90bpm, regular rhythm with P waves before each QRS. No abnormalities detected.",
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
            ecg: "Rate 92bpm, regular rhythm with P waves before each QRS. Right axis deviation. Peaked P waves in lead II.",
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

    // ==================== RESPIRATORY (scenarios 11-20) ====================
    {
        id: "resp-011",
        category: "respiratory",
        dispatch: {
            name: "Tracey",
            age: 35,
            gender: "F",
            chiefComplaint: "Asthma attack - not responding to inhaler",
            details: "Known severe asthmatic, unable to complete sentences, very distressed",
            category: 1
        },
        patient: {
            condition: "Near-Fatal Asthma - Silent Chest",
            history: "Brittle asthma, 3 previous ICU admissions, oral steroid-dependent",
            medications: "Salbutamol, Clenil, Seretide, Montelukast, Prednisolone 30mg daily",
            vitals: {
                hr: 130,
                bp: "120/85",
                rr: 10,
                spo2: 85,
                temp: 37.2,
                gcs: 13,
                bm: 7.8,
                pain: 0
            },
            presentation: "Silent chest (no wheeze - too tight to move air), exhausted respiratory effort, cyanosis",
            ecg: "Rate 130bpm, regular. Sinus tachycardia. P pulmonale. Right axis deviation. No ST changes.",
            redFlags: [
                "SILENT CHEST - absence of wheeze indicates critical obstruction",
                "Exhausted respiratory effort - imminent respiratory arrest",
                "SpO2 85% despite supplemental oxygen",
                "Previous ICU admissions - high risk of death",
                "Altered consciousness - pre-arrest signs",
                "PREPARE FOR RSI/INTUBATION - call pre-alert",
                "Magnesium sulphate 2g IV if no response to nebulisers"
            ]
        },
        starterMessage: "*barely audible, cannot complete sentences* Can't... breathe... *gestures to nebuliser, shaking head* Not... working..."
    },
    {
        id: "resp-012",
        category: "respiratory",
        dispatch: {
            name: "Callum",
            age: 27,
            gender: "M",
            chiefComplaint: "Chest pain and breathlessness after stab wound",
            details: "Assault, single stab left chest, walked to neighbour's house",
            category: 1
        },
        patient: {
            condition: "Tension Pneumothorax - Penetrating Trauma",
            history: "No significant medical history",
            medications: "None",
            vitals: {
                hr: 138,
                bp: "80/60",
                rr: 32,
                spo2: 84,
                temp: 36.9,
                gcs: 14,
                bm: 5.0,
                pain: 8
            },
            presentation: "Absent breath sounds left, tracheal deviation right, distended neck veins, tension pneumothorax",
            ecg: "Rate 138bpm, sinus tachycardia. No ST changes.",
            redFlags: [
                "TENSION PNEUMOTHORAX - clinical diagnosis, do not wait for X-ray",
                "Tracheal deviation (late sign)",
                "Absent breath sounds on affected side",
                "Distended neck veins (impaired venous return)",
                "Haemodynamic compromise",
                "TIME CRITICAL - immediate needle decompression 2nd ICS MCL then chest drain",
                "Penetrating mechanism - consider haemothorax too"
            ]
        },
        starterMessage: "He stabbed me in the chest... *struggling to breathe, visibly distressed* I walked here but I'm getting worse... I can't breathe properly... it's really tight."
    },
    {
        id: "resp-013",
        category: "respiratory",
        dispatch: {
            name: "Geoffrey",
            age: 71,
            gender: "M",
            chiefComplaint: "Breathlessness - gradual worsening",
            details: "Known lung cancer, very breathless now, can't walk across room",
            category: 2
        },
        patient: {
            condition: "Malignant Pleural Effusion",
            history: "Stage 4 lung adenocarcinoma, on chemotherapy",
            medications: "Chemotherapy agents, Dexamethasone, Omeprazole, Codeine",
            vitals: {
                hr: 100,
                bp: "135/82",
                rr: 24,
                spo2: 91,
                temp: 36.7,
                gcs: 15,
                bm: 5.5,
                pain: 2
            },
            presentation: "Stony dull percussion, absent breath sounds at base, reduced expansion right side, pleural effusion",
            ecg: "Rate 100bpm, regular. Low voltage complexes. No ST changes.",
            redFlags: [
                "Stony dull percussion (effusion vs haemothorax)",
                "SpO2 91% - significant hypoxia",
                "Malignant effusion - palliative context but can be drained",
                "Respiratory distress",
                "Assess goals of care - is drainage consistent with patient wishes?",
                "Mediastinal shift if large effusion"
            ]
        },
        starterMessage: "It's just been getting gradually worse over the last few weeks. I can barely do anything now without getting breathless. I know about my cancer... I just want to be able to breathe a bit better."
    },
    {
        id: "resp-014",
        category: "respiratory",
        dispatch: {
            name: "Maureen",
            age: 80,
            gender: "F",
            chiefComplaint: "Breathlessness and confusion",
            details: "Care home resident, choked on food at lunchtime, now unwell",
            category: 2
        },
        patient: {
            condition: "Aspiration Pneumonia",
            history: "Advanced dementia, previous aspiration episodes, DNAR in place",
            medications: "Risperidone, Lactulose, Memantine, Aspirin",
            vitals: {
                hr: 105,
                bp: "125/78",
                rr: 26,
                spo2: 90,
                temp: 38.8,
                gcs: 12,
                bm: 7.0,
                pain: 0
            },
            presentation: "Right lower lobe consolidation, aspiration history, confusion worse than baseline, hypoxia",
            ecg: "Rate 105bpm, regular. No acute ST changes. P waves normal.",
            redFlags: [
                "Aspiration event - content unknown (solid vs liquid)",
                "Right lower lobe most common site (gravity-dependent)",
                "DNAR in place - clarify scope and patient wishes",
                "Altered consciousness above baseline",
                "Risk of chemical pneumonitis vs infective pneumonia",
                "Swallowing assessment needed",
                "Discuss with family and care home regarding care ceiling"
            ]
        },
        starterMessage: "*Care home staff speaks* Maureen choked at lunch - she's been getting more muddled than normal and her breathing has gone off. There's a DNAR in place. Her daughter is on the way."
    },
    {
        id: "resp-015",
        category: "respiratory",
        dispatch: {
            name: "Phillip",
            age: 48,
            gender: "M",
            chiefComplaint: "Coughing up thick green sputum",
            details: "Worse than normal, has had this all his life, now very unwell",
            category: 3
        },
        patient: {
            condition: "Bronchiectasis - Acute Exacerbation",
            history: "Bronchiectasis (idiopathic), previous Pseudomonas colonisation, ex-smoker",
            medications: "Azithromycin 250mg 3x/week, Carbocisteine, Salbutamol, Tiotropium",
            vitals: {
                hr: 108,
                bp: "130/80",
                rr: 24,
                spo2: 93,
                temp: 38.4,
                gcs: 15,
                bm: 5.3,
                pain: 3
            },
            presentation: "Purulent sputum (green-brown), worse productive cough, crackles bilaterally, fever",
            ecg: "Rate 108bpm, regular. No acute changes.",
            redFlags: [
                "Purulent sputum production (increased volume and quality)",
                "SpO2 93% - monitor closely",
                "Previous Pseudomonas - atypical antibiotic needed",
                "Risk of mucus plugging",
                "Active airway clearance techniques",
                "Needs sputum culture before antibiotics if possible"
            ]
        },
        starterMessage: "I produce a lot of phlegm every day - that's normal for me. But this last few days it's been really thick and green, more than usual, and I feel awful with it. I know I need IV antibiotics when Pseudomonas kicks off."
    },
    {
        id: "resp-016",
        category: "respiratory",
        dispatch: {
            name: "Alfie",
            age: 4,
            gender: "M",
            chiefComplaint: "Choking on toy",
            details: "Playing with LEGO, mum found him distressed and coughing",
            category: 1
        },
        patient: {
            condition: "Foreign Body Aspiration - Partial Airway Obstruction",
            history: "Fit and well child",
            medications: "None",
            vitals: {
                hr: 135,
                bp: "90/55",
                rr: 30,
                spo2: 94,
                temp: 36.8,
                gcs: 15,
                bm: "N/A",
                pain: 0
            },
            presentation: "Sudden onset cough, unilateral wheeze (right), intermittent stridor, maintaining own airway",
            ecg: "N/A - paediatric patient",
            redFlags: [
                "Sudden onset in previously well child",
                "Unilateral wheeze - unilateral obstruction until proven otherwise",
                "DO NOT attempt blind finger sweeps",
                "Effective cough - encourage coughing, do not intervene",
                "If cough becomes ineffective - back blows and chest thrusts (not abdominal in <1yr)",
                "Keep child calm - agitation worsens obstruction",
                "TIME CRITICAL if deteriorating - do not delay transport"
            ]
        },
        starterMessage: "*Mother speaking, very distressed* He was playing and then he just started choking and coughing - he was fine and then suddenly not fine. He's still coughing. Did he swallow something? I don't know what he had."
    },
    {
        id: "resp-017",
        category: "respiratory",
        dispatch: {
            name: "Gemma",
            age: 19,
            gender: "F",
            chiefComplaint: "Breathing problems - feels like she cannot breathe properly",
            details: "Had an argument with boyfriend, now crying and hyperventilating",
            category: 3
        },
        patient: {
            condition: "Hyperventilation Syndrome / Acute Panic Attack",
            history: "Previous episodes, GAD diagnosis, on waiting list for CBT",
            medications: "Sertraline 50mg",
            vitals: {
                hr: 115,
                bp: "130/85",
                rr: 36,
                spo2: 99,
                temp: 36.6,
                gcs: 15,
                bm: 5.0,
                pain: 2
            },
            presentation: "Carpopedal spasm, paraesthesia in hands and face, chest tightness, hyperventilating, SpO2 paradoxically normal",
            ecg: "Rate 115bpm, regular. Sinus tachycardia. No ST changes.",
            redFlags: [
                "EXCLUDE ORGANIC CAUSE before diagnosing panic/hyperventilation",
                "PE must be considered (young female, tachycardia, breathlessness)",
                "SpO2 normal differentiates from PE or asthma",
                "Carpopedal spasm is caused by hypocapnia (respiratory alkalosis)",
                "Do NOT give paper bag - risk of hypoxia",
                "Reassurance and breathing coaching most effective",
                "Safeguarding check - context of relationship argument"
            ]
        },
        starterMessage: "I cannot breathe... I cannot breathe properly. Everything has gone tingly - my hands are cramping up. I just had a massive row and then I could not breathe. Please, I feel like I am dying."
    },
    {
        id: "resp-018",
        category: "respiratory",
        dispatch: {
            name: "Derek",
            age: 74,
            gender: "M",
            chiefComplaint: "Drowsy and confused",
            details: "Carer says he has been off all day, COPD patient",
            category: 3
        },
        patient: {
            condition: "Type 2 Respiratory Failure - Hypercapnic Encephalopathy",
            history: "Severe COPD, CO2 retainer, home NIV at night",
            medications: "Tiotropium, Salbutamol, Seretide, home NIV machine",
            vitals: {
                hr: 95,
                bp: "145/88",
                rr: 9,
                spo2: 92,
                temp: 36.5,
                gcs: 12,
                bm: 6.2,
                pain: 0
            },
            presentation: "Slow respiratory rate, confusion, asterixis (CO2 flap), warm peripheries - CO2 narcosis",
            ecg: "Rate 95bpm, regular. P pulmonale. Right axis deviation.",
            redFlags: [
                "CO2 narcosis - SpO2 appears reasonable but CO2 is critically high",
                "Warm peripheries and bounding pulse indicate CO2 vasodilation",
                "Asterixis (coarse hand tremor) indicates hypercapnic encephalopathy",
                "LOW respiratory rate is the danger sign here",
                "TARGET SpO2 88-92% - high flow O2 will worsen CO2 retention",
                "Needs NIV (BiPAP) - pre-alert hospital"
            ]
        },
        starterMessage: "*Carer speaks* He has just been getting more and more muddled today. I thought he was just tired but I cannot get any sense out of him now. He uses one of those breathing machine things at night. I gave him some extra oxygen from his machine but he seems worse."
    },
    {
        id: "resp-019",
        category: "respiratory",
        dispatch: {
            name: "Valerie",
            age: 55,
            gender: "F",
            chiefComplaint: "Severe breathlessness on exertion",
            details: "Exertional breathlessness, feeling faint, ankle swelling",
            category: 3
        },
        patient: {
            condition: "Pulmonary Arterial Hypertension",
            history: "Mixed connective tissue disease, Raynaud's phenomenon",
            medications: "Sildenafil, Bosentan, Nifedipine, Hydroxychloroquine",
            vitals: {
                hr: 100,
                bp: "110/70",
                rr: 22,
                spo2: 92,
                temp: 36.7,
                gcs: 15,
                bm: 5.4,
                pain: 0
            },
            presentation: "Right heart strain, exertional syncope, loud P2, raised JVP, ankle oedema",
            ecg: "Rate 100bpm, regular. Right axis deviation. Right bundle branch block. Tall R in V1. T wave inversion V1-V3. Sinus tachycardia.",
            redFlags: [
                "Exertional syncope or presyncope - high risk for sudden death",
                "Right heart strain pattern on ECG",
                "Connective tissue disease - associated PAH is well-recognised",
                "SpO2 92% at rest - will drop further on exertion",
                "Careful with fluid - right ventricle is preload-sensitive",
                "Needs specialist pulmonary hypertension centre"
            ]
        },
        starterMessage: "I have been slowly getting worse over the last year - I cannot walk far without feeling like I am going to faint. I am under a specialist for my connective tissue disease. I am on tablets for my lungs but I just feel so much worse today."
    },
    {
        id: "resp-020",
        category: "respiratory",
        dispatch: {
            name: "Liam",
            age: 22,
            gender: "M",
            chiefComplaint: "Chest tightness and breathlessness",
            details: "Known CF patient, feeling very unwell, worse over past week",
            category: 2
        },
        patient: {
            condition: "Cystic Fibrosis - Acute Pulmonary Exacerbation",
            history: "Cystic Fibrosis (DF508 homozygous), FEV1 baseline 45% predicted, awaiting lung transplant assessment",
            medications: "Ivacaftor/Lumacaftor (Orkambi), DNase, Tobramycin inhaled (alternate months), Azithromycin, Creon, vitamins",
            vitals: {
                hr: 110,
                bp: "118/75",
                rr: 26,
                spo2: 91,
                temp: 38.6,
                gcs: 15,
                bm: 5.2,
                pain: 4
            },
            presentation: "Increased cough with purulent sputum, reduced exercise tolerance, weight loss, haemoptysis",
            ecg: "Rate 110bpm, regular. No acute changes.",
            redFlags: [
                "Haemoptysis in CF - can be massive and life-threatening",
                "SpO2 91% - significantly below his baseline (usually 95%)",
                "Weight loss - metabolic consequence of exacerbation",
                "Established antibiotic resistance patterns likely",
                "ALERT CF centre - patient should be known to them",
                "IV antibiotics needed urgently - Pseudomonas typically"
            ]
        },
        starterMessage: "I have been feeling rough for about a week - my cough is way worse than usual and I have been coughing up blood a couple of times. I know when my CF is kicking off and this is bad. I need to get to the CF unit."
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
            ecg: "Rate 95bpm, regular rhythm with P waves before each QRS. No abnormalities detected.",
            redFlags: [
                "Migration of pain from periumbilical to RIF",
                "Rebound tenderness (peritoneal irritation)",
                "Guarding",
                "Anorexia and nausea",
                "Low-grade fever",
                "Risk of perforation if delayed"
            ]
        },
        starterMessage: "The pain started around my belly button last night. It really hurts when I move or cough. I've been sick twice and I really don't feel like eating anything."
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
            ecg: "Rate 100bpm, regular rhythm with P waves before each QRS. No abnormalities detected.",
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
            ecg: "Rate 120bpm, regular rhythm with P waves before each QRS. Non-specific ST changes.",
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
            ecg: "Rate 105bpm, regular rhythm with P waves before each QRS. No abnormalities detected.",
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
            ecg: "Rate 115bpm, regular rhythm with P waves before each QRS. No ST changes.",
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
            ecg: "Rate 100bpm, regular rhythm with P waves before each QRS. No abnormalities detected.",
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
            ecg: "Rate 110bpm, regular rhythm with P waves before each QRS. Normal axis. No acute changes.",
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
            ecg: "Rate 95bpm, regular rhythm with P waves before each QRS. No abnormalities detected.",
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
            ecg: "Rate 118bpm, regular rhythm with P waves before each QRS. No abnormalities detected.",
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
            ecg: "Rate 110bpm, irregularly irregular rhythm. No P waves visible, fibrillatory baseline.",
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

    // ==================== ABDOMINAL (scenarios 11-20) ====================
    {
        id: "abdo-011",
        category: "abdominal",
        dispatch: {
            name: "Raymond",
            age: 67,
            gender: "M",
            chiefComplaint: "Severe abdominal pain - rigid abdomen",
            details: "Sudden onset pain, stopped eating, abdomen very hard",
            category: 1
        },
        patient: {
            condition: "Bowel Perforation - Generalised Peritonitis",
            history: "Diverticular disease, long-term NSAID use for arthritis",
            medications: "Diclofenac 75mg BD, Lansoprazole, Amlodipine",
            vitals: {
                hr: 118,
                bp: "95/60",
                rr: 26,
                spo2: 96,
                temp: 38.9,
                gcs: 15,
                bm: 7.5,
                pain: 10
            },
            presentation: "Board-like rigid abdomen, absent bowel sounds, guarding and rebound throughout, septic shock",
            ecg: "Rate 118bpm, regular. Sinus tachycardia. No ST changes.",
            redFlags: [
                "Board-like rigidity - generalised peritonitis",
                "Absent bowel sounds",
                "Septic shock (hypotension, tachycardia, fever)",
                "NSAID use - peptic ulcer perforation risk",
                "TIME CRITICAL - needs emergency laparotomy",
                "IV access, fluids, analgesia, urgent transport",
                "Nil by mouth"
            ]
        },
        starterMessage: "The pain came on really suddenly about three hours ago - it was like something had burst inside me. Now my whole belly is rock hard and I can't move. I feel terrible... hot and shivery."
    },
    {
        id: "abdo-012",
        category: "abdominal",
        dispatch: {
            name: "Colin",
            age: 58,
            gender: "M",
            chiefComplaint: "Confusion and jaundice",
            details: "Found confused by wife, yellowing of skin, known to drink alcohol",
            category: 2
        },
        patient: {
            condition: "Hepatic Encephalopathy - Acute on Chronic Liver Failure",
            history: "Alcoholic liver disease (cirrhosis), previous variceal bleeding",
            medications: "Lactulose, Spironolactone, Propranolol, Thiamine",
            vitals: {
                hr: 92,
                bp: "105/65",
                rr: 18,
                spo2: 97,
                temp: 37.8,
                gcs: 12,
                bm: 3.8,
                pain: 0
            },
            presentation: "Jaundice, asterixis, confusion (Grade II encephalopathy), abdominal ascites, fetor hepaticus",
            ecg: "Rate 92bpm, regular. No acute changes.",
            redFlags: [
                "Hepatic encephalopathy (asterixis, confusion, fetor hepaticus)",
                "Hypoglycaemia (BM 3.8) - liver unable to maintain glucose",
                "Cirrhosis - risk of variceal bleeding",
                "Coagulopathy risk (liver not producing clotting factors)",
                "Infection can precipitate encephalopathy - look for source",
                "Give Thiamine BEFORE any glucose"
            ]
        },
        starterMessage: "*Wife speaks* He's been getting more and more muddled since yesterday. He's gone yellow and his tummy is huge - it's been swelling for weeks. He has been drinking heavily again. He keeps flapping his hands."
    },
    {
        id: "abdo-013",
        category: "abdominal",
        dispatch: {
            name: "Shirley",
            age: 70,
            gender: "F",
            chiefComplaint: "Passing blood from back passage",
            details: "Large amount of fresh red blood from rectum, feeling faint",
            category: 2
        },
        patient: {
            condition: "Acute Lower GI Bleed - Likely Diverticular",
            history: "Known diverticular disease, hypertension, on warfarin for AF",
            medications: "Warfarin, Ramipril, Amlodipine",
            vitals: {
                hr: 115,
                bp: "92/58",
                rr: 22,
                spo2: 97,
                temp: 36.5,
                gcs: 15,
                bm: 6.0,
                pain: 3
            },
            presentation: "Haemodynamic compromise, large volume PR bleed, anticoagulated patient",
            ecg: "Rate 115bpm, irregularly irregular. AF. No ST changes.",
            redFlags: [
                "Haemodynamic compromise from acute blood loss",
                "Anticoagulation (warfarin) - major haemorrhage protocol",
                "Reversal of warfarin needed (Vitamin K, PCC)",
                "IV access, fluids, urgent transfer",
                "Large volume PR bleed suggests diverticular or angiodysplasia",
                "AF - do not stop anticoagulation without senior review"
            ]
        },
        starterMessage: "I went to the toilet and there was blood everywhere - bright red blood. I feel really dizzy and faint. I take warfarin - does that matter? I feel awful."
    },
    {
        id: "abdo-014",
        category: "abdominal",
        dispatch: {
            name: "Leonard",
            age: 72,
            gender: "M",
            chiefComplaint: "Hernia has come out and won't go back",
            details: "Right groin lump, unable to reduce, now with vomiting",
            category: 2
        },
        patient: {
            condition: "Strangulated Inguinal Hernia",
            history: "Known inguinal hernia for 5 years, usually reduces, hypertension",
            medications: "Amlodipine, Aspirin",
            vitals: {
                hr: 112,
                bp: "140/88",
                rr: 20,
                spo2: 97,
                temp: 38.2,
                gcs: 15,
                bm: 7.0,
                pain: 9
            },
            presentation: "Irreducible tense hernia, overlying skin erythema, vomiting, signs of early bowel ischaemia",
            ecg: "Rate 112bpm, regular. Sinus tachycardia. No ST changes.",
            redFlags: [
                "Strangulated hernia - blood supply to herniated bowel compromised",
                "Irreducible (unlike his usual hernia)",
                "Overlying skin changes - bowel ischaemia developing",
                "Vomiting indicates obstruction",
                "DO NOT attempt forceful reduction",
                "TIME CRITICAL - needs emergency surgery"
            ]
        },
        starterMessage: "My hernia has been coming and going for years - I usually just push it back in. But this time I cannot get it back in. It happened at dinner time and now it is rock hard and agony. I've been sick twice."
    },
    {
        id: "abdo-015",
        category: "abdominal",
        dispatch: {
            name: "Harry",
            age: 76,
            gender: "M",
            chiefComplaint: "Cannot pass urine",
            details: "No urine for 12 hours, lower abdominal pain, distressed",
            category: 2
        },
        patient: {
            condition: "Acute Urinary Retention",
            history: "Known BPH (benign prostatic hyperplasia), recent cold and flu tablets",
            medications: "Tamsulosin, recently started pseudoephedrine-containing decongestant",
            vitals: {
                hr: 95,
                bp: "155/90",
                rr: 18,
                spo2: 98,
                temp: 36.9,
                gcs: 15,
                bm: 6.8,
                pain: 7
            },
            presentation: "Suprapubic mass (distended bladder to umbilicus), urge to void but unable, agonising discomfort",
            ecg: "Rate 95bpm, regular. No acute changes.",
            redFlags: [
                "Suprapubic mass - grossly distended bladder",
                "Pseudoephedrine precipitated retention in BPH patient",
                "Duration 12 hours - risk of renal impairment (post-renal AKI)",
                "Catheterisation needed (in/out or indwelling)",
                "Beware rapid decompression of large volume (>1L)",
                "Pain should resolve after catheterisation"
            ]
        },
        starterMessage: "I am absolutely bursting but I just cannot go. I can feel my bladder - it is huge. I started taking some cold tablets earlier this week. I have had trouble with my waterworks before but never like this."
    },
    {
        id: "abdo-016",
        category: "abdominal",
        dispatch: {
            name: "Naomi",
            age: 26,
            gender: "F",
            chiefComplaint: "Severe right-sided pelvic pain",
            details: "Sudden onset severe pain, feels faint, young woman",
            category: 2
        },
        patient: {
            condition: "Ovarian Torsion",
            history: "Known right ovarian cyst (6cm) on previous scan",
            medications: "Combined oral contraceptive pill",
            vitals: {
                hr: 120,
                bp: "105/70",
                rr: 22,
                spo2: 99,
                temp: 37.3,
                gcs: 15,
                bm: 5.1,
                pain: 9
            },
            presentation: "Sudden onset unilateral pelvic pain, nausea and vomiting, known ovarian cyst - torsion until proven otherwise",
            ecg: "Rate 120bpm, regular. Sinus tachycardia. No ST changes.",
            redFlags: [
                "Sudden onset severe unilateral pelvic pain in young woman",
                "Known ovarian cyst - torsion risk",
                "TIME CRITICAL - ovary can infarct within 6 hours",
                "Nausea and vomiting from pain severity",
                "Must exclude ectopic pregnancy (urine or serum pregnancy test)",
                "Needs urgent laparoscopy - do not delay"
            ]
        },
        starterMessage: "The pain just came on out of nowhere - it is really severe, on my right side, and I feel like I am going to be sick. I know I have a cyst on my right ovary - they found it on a scan recently. This is different to period pain."
    },
    {
        id: "abdo-017",
        category: "abdominal",
        dispatch: {
            name: "Zoe",
            age: 22,
            gender: "F",
            chiefComplaint: "Pelvic pain and vaginal discharge",
            details: "Pelvic pain for 3 days, discharge, fever",
            category: 3
        },
        patient: {
            condition: "Pelvic Inflammatory Disease (PID) - Severe",
            history: "Multiple sexual partners, inconsistent contraception, previous chlamydia",
            medications: "None",
            vitals: {
                hr: 105,
                bp: "118/72",
                rr: 20,
                spo2: 99,
                temp: 39.1,
                gcs: 15,
                bm: 5.0,
                pain: 7
            },
            presentation: "Cervical motion tenderness, purulent vaginal discharge, bilateral adnexal tenderness, fever, systemic sepsis",
            ecg: "Rate 105bpm, regular. Sinus tachycardia. No ST changes.",
            redFlags: [
                "Sepsis from PID - can cause tubo-ovarian abscess",
                "Cervical motion tenderness (pathognomonic of PID)",
                "Must exclude ectopic pregnancy",
                "High-dose IV antibiotics needed",
                "Risk of future infertility if untreated",
                "Contact tracing needed - notifiable"
            ]
        },
        starterMessage: "I have had this pelvic pain for a few days but it is getting really bad now. I have a horrible discharge as well. I feel hot and shivery. I thought it might sort itself out but it has got worse."
    },
    {
        id: "abdo-018",
        category: "abdominal",
        dispatch: {
            name: "Keith",
            age: 42,
            gender: "M",
            chiefComplaint: "Vomiting and diarrhoea",
            details: "Family barbecue yesterday, all unwell, this patient worst affected",
            category: 3
        },
        patient: {
            condition: "Severe Gastroenteritis with Dehydration - Suspected Salmonella",
            history: "Type 1 Diabetes, partially-eaten chicken at barbecue yesterday",
            medications: "Insulin (NovoRapid and Lantus)",
            vitals: {
                hr: 118,
                bp: "105/68",
                rr: 22,
                spo2: 98,
                temp: 38.5,
                gcs: 15,
                bm: 4.1,
                pain: 5
            },
            presentation: "Dehydration, hypoglycaemia (Type 1 DM affected by vomiting/reduced oral intake), food poisoning cluster",
            ecg: "Rate 118bpm, regular. Sinus tachycardia. Flattened T waves (hypokalaemia risk from vomiting).",
            redFlags: [
                "Hypoglycaemia in Type 1 DM - vomiting prevents oral intake",
                "Dehydration with haemodynamic compromise",
                "Potassium depletion from vomiting and diarrhoea",
                "Food poisoning cluster - Public Health notification needed",
                "IV access and fluid resuscitation",
                "Dextrose for BM 4.1 with symptoms"
            ]
        },
        starterMessage: "We all had the barbecue yesterday - the chicken. My wife and kids are ill but I am the worst. I have vomited about 10 times and my bowels... I cannot stop going. I am a diabetic - I have not been able to eat or take my insulin properly."
    },
    {
        id: "abdo-019",
        category: "abdominal",
        dispatch: {
            name: "Vernon",
            age: 75,
            gender: "M",
            chiefComplaint: "Back pain radiating to abdomen",
            details: "Sudden onset severe back and flank pain, feeling faint",
            category: 1
        },
        patient: {
            condition: "Symptomatic AAA - Impending Rupture",
            history: "Known 5.8cm AAA under surveillance, hypertension, ex-smoker",
            medications: "Amlodipine, Atorvastatin, Aspirin",
            vitals: {
                hr: 108,
                bp: "100/65",
                rr: 20,
                spo2: 96,
                temp: 36.6,
                gcs: 15,
                bm: 6.3,
                pain: 9
            },
            presentation: "Pulsatile abdominal mass, periumbilical bruising developing (Cullen's), pain radiating to back",
            ecg: "Rate 108bpm, regular. Sinus tachycardia. No ST changes.",
            redFlags: [
                "KNOWN AAA now symptomatic - impending rupture",
                "Pulsatile abdominal mass",
                "Haemodynamic compromise",
                "DO NOT palpate abdomen repeatedly",
                "TIME CRITICAL - needs emergency vascular surgery",
                "Permissive hypotension (allow SBP 80-100) en route - do not over-resuscitate",
                "Pre-alert vascular centre"
            ]
        },
        starterMessage: "I have got an aneurysm in my tummy - they have been watching it. The pain is absolutely dreadful... it started in my back and now it is in my front too. I feel very faint. Am I going to be alright?"
    },
    {
        id: "abdo-020",
        category: "abdominal",
        dispatch: {
            name: "Fiona",
            age: 32,
            gender: "F",
            chiefComplaint: "Severe abdominal pain and diarrhoea",
            details: "Known bowel condition, much worse than usual flare-up",
            category: 2
        },
        patient: {
            condition: "Crohn's Disease - Severe Acute Exacerbation with Abscess",
            history: "Crohn's disease diagnosed age 22, previous small bowel resection, on immunosuppressants",
            medications: "Azathioprine, Prednisolone (current flare), Mesalazine, Iron supplements",
            vitals: {
                hr: 115,
                bp: "110/70",
                rr: 22,
                spo2: 98,
                temp: 39.2,
                gcs: 15,
                bm: 5.0,
                pain: 8
            },
            presentation: "RIF mass (possible abscess), bloody diarrhoea, systemic sepsis, on immunosuppressants masking signs",
            ecg: "Rate 115bpm, regular. Sinus tachycardia. No ST changes.",
            redFlags: [
                "Immunosuppressants masking sepsis signs",
                "RIF mass - possible intra-abdominal abscess or fistula",
                "Systemic sepsis (fever, tachycardia)",
                "High-dose steroids already (adrenal suppression risk)",
                "Risk of toxic megacolon",
                "Needs CT abdomen, IV antibiotics, surgical review"
            ]
        },
        starterMessage: "I have Crohn's and I have had flares before but this is different. I have a horrible mass in my right side and I can feel it. I have got a temperature and I cannot stop going to the loo with blood. I am on azathioprine - does that matter?"
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
            ecg: "Rate 85bpm, irregularly irregular rhythm. No P waves visible, fibrillatory baseline. No ST changes.",
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
            ecg: "Rate 95bpm, regular rhythm with P waves before each QRS. No abnormalities detected.",
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
            ecg: "Rate 120bpm, regular rhythm with P waves before each QRS. No abnormalities detected.",
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
            ecg: "Rate 75bpm, regular rhythm with P waves before each QRS. No abnormalities detected.",
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
            ecg: "Rate 100bpm, regular rhythm with P waves before each QRS. Prolonged QT interval.",
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
        starterMessage: "*confused, speech slow* I don't... I don't know what's happening... *sweating* ...my neighbour came round and... *trailing off* ..."
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
            ecg: "Rate 65bpm, regular rhythm with P waves before each QRS. Widespread T wave inversion. QT interval prolonged.",
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
        starterMessage: "*holding head, eyes closed* This headache is different... liliterally the worst pain I've ever felt. I get migraines but this is nothing like them."
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
            ecg: "Rate 82bpm, regular rhythm with P waves before each QRS, occasional ectopic beats visible.",
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
        starterMessage: "I feel fine now but earlier my left arm went completely numb and weak - I couldn't grip anything. My wife said my face looked droopy too. I almost didn't call but my wife insisted."
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
            ecg: "Rate 88bpm, regular rhythm with P waves before each QRS. Tall R waves in V5-V6, deep S waves in V1-V2.",
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
        starterMessage: "The room is spinning terribly... I tried to walk to the bathroom and I was all over the place, bouncing off the walls. I've been sick several times. I feel like I'm drunk."
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
            ecg: "Rate 80bpm, regular rhythm with P waves before each QRS. No abnormalities detected.",
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
            ecg: "Rate 85bpm, regular rhythm with P waves before each QRS. No abnormalities detected.",
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
        starterMessage: "It started in my feet about 5 days ago - they felt tingly and numb. Now it's spreading up my legs and they feel weak. I'm struggling to walk and my legs feel like jelly."
    },

    // ==================== NEUROLOGICAL (scenarios 11-20) ====================
    {
        id: "neuro-011",
        category: "neuro",
        dispatch: {
            name: "Clive",
            age: 54,
            gender: "M",
            chiefComplaint: "Severe headache and becoming confused",
            details: "Headache for 2 days, now confused and drowsy, wife very worried",
            category: 3
        },
        patient: {
            condition: "Adult Bacterial Meningitis - Pneumococcal",
            history: "Type 2 Diabetes, ex-smoker, no recent viral illness, no rash",
            medications: "Metformin, Ramipril",
            vitals: {
                hr: 112,
                bp: "145/90",
                rr: 24,
                spo2: 96,
                temp: 39.8,
                gcs: 13,
                bm: 14.2,
                pain: 10
            },
            presentation: "Gradual onset over 48 hours, NO rash, neck stiffness, photophobia, Kernig's sign positive - adult pneumococcal meningitis is more insidious than meningococcal",
            ecg: "Rate 112bpm, regular rhythm with P waves before each QRS. Sinus tachycardia. No ST changes.",
            redFlags: [
                "Adult meningitis often has NO rash - do not rely on petechiae",
                "Kernig's sign positive (pain/resistance on knee extension with hip flexed)",
                "Classic triad: headache, fever, neck stiffness (only 45% have all three)",
                "Photophobia and phonophobia",
                "GCS declining - altered consciousness",
                "TIME CRITICAL - immediate hospital transfer, antibiotics within 1 hour of diagnosis",
                "Diabetic patient - consider dexamethasone with antibiotics to reduce cerebral oedema"
            ]
        },
        starterMessage: "*Wife speaks* He has had a terrible headache for two days but I thought it was flu. Now he keeps saying odd things and he seemed confused when he woke up. He cannot stand bright lights and he said his neck hurts. He has not got a rash - I checked."
    },
    {
        id: "neuro-012",
        category: "neuro",
        dispatch: {
            name: "Craig",
            age: 28,
            gender: "M",
            chiefComplaint: "Fitting - not stopping",
            details: "Witness reports continuous seizure for 10 minutes, no history of epilepsy",
            category: 1
        },
        patient: {
            condition: "Status Epilepticus - First Presentation",
            history: "No known epilepsy, recreational drug use (MDMA last night), sleep deprived",
            medications: "None",
            vitals: {
                hr: 140,
                bp: "155/100",
                rr: 8,
                spo2: 88,
                temp: 38.8,
                gcs: 6,
                bm: 3.5,
                pain: 0
            },
            presentation: "Continuous tonic-clonic activity, hypoxia, hyperthermia, hypoglycaemia, drug-induced - status epilepticus",
            ecg: "Rate 140bpm (artefact from movement). Unable to assess rhythm accurately during seizure.",
            redFlags: [
                "Status epilepticus - seizure >5 minutes requires treatment",
                "Hypoglycaemia (BM 3.5) may be cause or consequence - give glucose",
                "Hypoxia (SpO2 88%) - airway at risk during seizure",
                "Hyperthermia - MDMA toxicity",
                "MDMA can cause hyponatraemia - seizure risk",
                "Buccal midazolam or IV/IO lorazepam first-line",
                "If no response - second agent and RSI preparation"
            ]
        },
        starterMessage: "*Bystander speaks* He has been shaking for ages - I do not know what to do. He was at a party last night. He just collapsed and started fitting and he has not stopped."
    },
    {
        id: "neuro-013",
        category: "neuro",
        dispatch: {
            name: "Arthur",
            age: 62,
            gender: "M",
            chiefComplaint: "Headache and confusion",
            details: "Hypertensive patient, very confused, severe headache",
            category: 2
        },
        patient: {
            condition: "Hypertensive Encephalopathy",
            history: "Poorly controlled hypertension, non-compliant with medications",
            medications: "Amlodipine (not taking), Ramipril (not taking)",
            vitals: {
                hr: 88,
                bp: "235/135",
                rr: 20,
                spo2: 97,
                temp: 36.8,
                gcs: 13,
                bm: 7.2,
                pain: 8
            },
            presentation: "Altered consciousness, severe hypertension, visual disturbance, headache, no focal neurology (differentiates from stroke)",
            ecg: "Rate 88bpm, regular. LVH criteria met. ST depression V5-V6. T wave inversion laterally.",
            redFlags: [
                "Hypertensive encephalopathy - BP >220 with end-organ dysfunction",
                "Differentiating from stroke is critical (no focal deficits here)",
                "POSTERIOR REVERSIBLE ENCEPHALOPATHY SYNDROME (PRES) possible",
                "Sudden visual changes with hypertension",
                "DO NOT lower BP rapidly - risk of watershed infarction",
                "Needs controlled reduction in monitored setting",
                "Aortic dissection must be excluded"
            ]
        },
        starterMessage: "My head is splitting and I cannot think straight. I know I should take my blood pressure tablets but they run out and I keep forgetting to get more. My vision has gone funny - blurry patches."
    },
    {
        id: "neuro-014",
        category: "neuro",
        dispatch: {
            name: "Rebecca",
            age: 31,
            gender: "F",
            chiefComplaint: "Severe headache with visual problems",
            details: "Worst headache of her life, flashing lights, vomiting",
            category: 3
        },
        patient: {
            condition: "Complicated Migraine with Hemiplegic Aura",
            history: "Migraines since age 16, usually responds to triptans, family history of hemiplegic migraine",
            medications: "Sumatriptan PRN, Combined Oral Contraceptive Pill",
            vitals: {
                hr: 90,
                bp: "135/88",
                rr: 18,
                spo2: 99,
                temp: 36.9,
                gcs: 15,
                bm: 5.0,
                pain: 9
            },
            presentation: "Unilateral arm weakness (aura), visual disturbance, photophobia, normal GCS, known migraineur - but needs SAH excluded",
            ecg: "Rate 90bpm, regular. No acute changes.",
            redFlags: [
                "Must EXCLUDE subarachnoid haemorrhage (thunderclap headache)",
                "Hemiplegic aura - focal neurology requires CT to exclude structural cause",
                "COCP and migraine with aura - increased stroke risk",
                "Triptan CONTRAINDICATED in hemiplegic migraine",
                "Worst headache ever - treat as SAH until proven otherwise",
                "LP may be needed even if CT negative (12 hours post onset)"
            ]
        },
        starterMessage: "I get migraines but this is so much worse than usual. I have got flashing lights and the left side of my arm has gone weak and tingly. My head is pounding and I have been sick twice. I have had similar ones before but this feels different... more intense."
    },
    {
        id: "neuro-015",
        category: "neuro",
        dispatch: {
            name: "Walter",
            age: 65,
            gender: "M",
            chiefComplaint: "Cannot move face on right side",
            details: "Woke up with facial weakness, worried about stroke",
            category: 3
        },
        patient: {
            condition: "Bell's Palsy - Peripheral Facial Nerve Palsy",
            history: "Recent viral illness (cold sore), hypertension",
            medications: "Amlodipine",
            vitals: {
                hr: 72,
                bp: "148/90",
                rr: 16,
                spo2: 99,
                temp: 36.6,
                gcs: 15,
                bm: 6.0,
                pain: 2
            },
            presentation: "Complete unilateral facial weakness INCLUDING forehead (distinguishes peripheral from central), normal limbs, hyperacusis, post-viral",
            ecg: "Rate 72bpm, regular. No acute changes.",
            redFlags: [
                "CRITICAL DISTINCTION: Forehead involvement = PERIPHERAL (Bell's palsy)",
                "Forehead sparing = CENTRAL (stroke) - FAST stroke pathway applies",
                "This patient has forehead involvement - peripheral palsy",
                "Ramsay Hunt syndrome if vesicles in ear canal (herpes zoster)",
                "Eye protection essential (cannot blink fully)",
                "Prednisolone within 72 hours improves outcomes",
                "Exclude stroke with FAST assessment first"
            ]
        },
        starterMessage: "I woke up and half my face would not work. I cannot close my right eye properly and my mouth droops. My wife thinks it is a stroke - I am terrified. I had a cold sore on my lip last week."
    },
    {
        id: "neuro-016",
        category: "neuro",
        dispatch: {
            name: "Martin",
            age: 55,
            gender: "M",
            chiefComplaint: "Confused and unsteady - found by police",
            details: "Found wandering, smells of alcohol, confused",
            category: 3
        },
        patient: {
            condition: "Wernicke's Encephalopathy",
            history: "Alcohol dependency, poor diet, previous admissions for alcohol detox",
            medications: "None current (was on thiamine but stopped)",
            vitals: {
                hr: 105,
                bp: "128/78",
                rr: 18,
                spo2: 97,
                temp: 36.3,
                gcs: 11,
                bm: 3.2,
                pain: 0
            },
            presentation: "Classic triad: ophthalmoplegia (bilateral nystagmus), ataxia, confusion - Wernicke's encephalopathy",
            ecg: "Rate 105bpm, regular. Sinus tachycardia. No acute changes.",
            redFlags: [
                "Wernicke's triad: ophthalmoplegia + ataxia + confusion (all three in only 10%)",
                "Hypoglycaemia (BM 3.2) - alcohol depletes glycogen",
                "GIVE THIAMINE BEFORE GLUCOSE - glucose without thiamine can precipitate Wernicke's",
                "Parenteral thiamine (Pabrinex) needed - oral absorption poor in alcoholic patients",
                "If untreated, progresses to irreversible Korsakoff's syndrome",
                "Do not assume confusion is purely alcohol intoxication"
            ]
        },
        starterMessage: "*Confused, slightly slurred speech* I feel... I do not know where I am... *eyes flickering and jerking* I have had a few drinks... I cannot walk properly. *patient stumbles when trying to stand*"
    },
    {
        id: "neuro-017",
        category: "neuro",
        dispatch: {
            name: "Diana",
            age: 38,
            gender: "F",
            chiefComplaint: "Severe headache and right arm weak",
            details: "Headache for days, right arm weakness developed today, on contraceptive pill",
            category: 2
        },
        patient: {
            condition: "Cerebral Venous Sinus Thrombosis (CVST)",
            history: "Dehydration from recent illness, oral contraceptive pill, recently started new job with long screen hours",
            medications: "Combined oral contraceptive pill, NSAIDs PRN",
            vitals: {
                hr: 95,
                bp: "138/88",
                rr: 18,
                spo2: 98,
                temp: 37.2,
                gcs: 14,
                bm: 5.3,
                pain: 9
            },
            presentation: "Progressive headache over days, focal neurology (right arm weakness), seizure risk, young woman on COCP",
            ecg: "Rate 95bpm, regular. No acute changes.",
            redFlags: [
                "CVST - often missed as it mimics migraine or tension headache",
                "Progressive headache over DAYS (different from thunderclap of SAH)",
                "Focal neurology developing = venous infarction",
                "COCP is the commonest identifiable risk factor",
                "Anticoagulation is treatment of choice (even with haemorrhagic transformation)",
                "CT often normal - MRI/MRV needed for diagnosis",
                "Seizure risk high"
            ]
        },
        starterMessage: "I have had the most dreadful headache for about four days and I thought it was stress or tension. But this morning my right arm feels weak and heavy. I am on the pill. I have never had headaches like this before."
    },
    {
        id: "neuro-018",
        category: "neuro",
        dispatch: {
            name: "Leslie",
            age: 58,
            gender: "M",
            chiefComplaint: "Back pain and cannot walk",
            details: "Sudden weakness in both legs, back pain, cannot stand",
            category: 1
        },
        patient: {
            condition: "Cauda Equina Syndrome",
            history: "Known lumbar disc prolapse, previous back pain, now with new symptoms",
            medications: "Co-codamol, Naproxen",
            vitals: {
                hr: 85,
                bp: "135/82",
                rr: 18,
                spo2: 99,
                temp: 36.7,
                gcs: 15,
                bm: 6.5,
                pain: 9
            },
            presentation: "Bilateral leg weakness, saddle anaesthesia, urinary retention with overflow, faecal incontinence",
            ecg: "Rate 85bpm, regular. No acute changes.",
            redFlags: [
                "Cauda equina syndrome - surgical emergency",
                "Saddle anaesthesia (inner thighs, perineum, perianal) - MUST ASK",
                "Bladder dysfunction (retention or incontinence)",
                "Bilateral lower limb weakness",
                "TIME CRITICAL - decompression within hours prevents permanent incontinence",
                "Urgent MRI lumbar spine needed",
                "Log-roll if moving patient"
            ]
        },
        starterMessage: "My back pain has been bad for months but this morning I woke up and my legs just gave way. I cannot stand properly. The worst thing is... I cannot feel anything down below in my... private area. And I do not know if I have wet myself - I cannot feel it."
    },
    {
        id: "neuro-019",
        category: "neuro",
        dispatch: {
            name: "Penelope",
            age: 32,
            gender: "F",
            chiefComplaint: "Sudden vision loss in one eye",
            details: "Right eye went completely dark suddenly 30 minutes ago",
            category: 1
        },
        patient: {
            condition: "Central Retinal Artery Occlusion (CRAO)",
            history: "Atrial fibrillation (paroxysmal, not anticoagulated), migraine history",
            medications: "None (declined anticoagulation)",
            vitals: {
                hr: 88,
                bp: "148/92",
                rr: 16,
                spo2: 99,
                temp: 36.6,
                gcs: 15,
                bm: 5.4,
                pain: 0
            },
            presentation: "Painless complete monocular vision loss (curtain came down), Marcus Gunn pupil (RAPD), fundoscopy shows cherry red spot",
            ecg: "Rate 88bpm, irregularly irregular. AF rhythm. No ST changes.",
            redFlags: [
                "CRAO = 'stroke of the eye' - time-critical emergency",
                "Painless monocular vision loss = CRAO until proven otherwise",
                "Window for treatment is 90 minutes (ideally) - 4.5 hours maximum",
                "Paroxysmal AF without anticoagulation - embolic source likely",
                "TIME CRITICAL - needs urgent ophthalmology and stroke assessment",
                "Relative Afferent Pupillary Defect (RAPD) on examination",
                "CRAO is equivalent to STEMI of the eye"
            ]
        },
        starterMessage: "I was reading and suddenly everything went completely black in my right eye - like a curtain just dropped. It has not come back at all. It is not painful. I have had a funny heart rhythm in the past but I decided not to take the blood thinners."
    },
    {
        id: "neuro-020",
        category: "neuro",
        dispatch: {
            name: "Joanna",
            age: 29,
            gender: "F",
            chiefComplaint: "Weakness and visual problems - known neurological condition",
            details: "MS patient, severe relapse, unable to walk today",
            category: 2
        },
        patient: {
            condition: "Multiple Sclerosis - Acute Relapse with Optic Neuritis",
            history: "Relapsing-remitting MS diagnosed 4 years ago, 2 previous relapses",
            medications: "Natalizumab (infusion monthly), Amitriptyline 10mg",
            vitals: {
                hr: 88,
                bp: "118/75",
                rr: 18,
                spo2: 99,
                temp: 37.9,
                gcs: 15,
                bm: 5.1,
                pain: 4
            },
            presentation: "Right eye pain on movement, reduced visual acuity right, bilateral leg spasticity, Lhermitte's sign, urinary urgency",
            ecg: "Rate 88bpm, regular. No acute changes.",
            redFlags: [
                "Uhthoff's phenomenon - heat and fever worsen MS symptoms",
                "High temperature may mimic relapse (pseudorelapse) - exclude infection first",
                "Optic neuritis: eye pain on movement + visual loss",
                "Lhermitte's sign - electric shock sensation down spine on neck flexion",
                "On natalizumab - risk of PML (progressive multifocal leukoencephalopathy)",
                "Needs urine dip - UTI is commonest pseudorelapse trigger",
                "Contact MS nurse and neurology"
            ]
        },
        starterMessage: "I have got MS and I know what a relapse feels like, but I want to make sure I am doing the right thing. My right eye hurts when I move it and my vision has gone blurry. My legs are so stiff and heavy. I also feel a bit feverish - could that be making it worse?"
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
            ecg: "Rate 130bpm, regular rhythm with P waves before each QRS. No ST changes.",
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
            ecg: "Rate 90bpm, regular rhythm with P waves before each QRS. No abnormalities detected.",
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
        starterMessage: "*lying still, colleagues holding his head* Don't move me! My neck really hurts... the scaffolding just gave way. My mates are holding my head still like they learned on a first aid course."
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
            ecg: "Rate 135bpm, regular rhythm with P waves before each QRS. Low voltage complexes. QRS amplitude varying beat-to-beat.",
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
            ecg: "Rate 120bpm, regular rhythm with P waves before each QRS. No abnormalities detected.",
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
            ecg: "Rate 110bpm, regular rhythm with P waves before each QRS. No abnormalities detected.",
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
            ecg: "Rate 55bpm, regular rhythm with P waves before each QRS. No other abnormalities detected.",
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
        starterMessage: "*calm but scared, lying by pool* I dived in and hit the bottom... I can't feel anything below my shoulders. My friends pulled me out of the water. I've had a few drinks... is this serious? Why can't I feel anything?"
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
            ecg: "Rate 95bpm, regular rhythm with P waves before each QRS. No abnormalities detected.",
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
            ecg: "Rate 105bpm, regular rhythm with P waves before each QRS. Normal QRS complexes. T waves normal currently.",
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
        starterMessage: "The jack slipped while I was under the car changing a tyre... my leg's been stuck. The neighbours managed to get the jack back up so it's not crushing me anymore but my leg is still trapped."
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
            ecg: "Rate 115bpm, regular rhythm with P waves before each QRS. No abnormalities detected.",
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

    // ==================== TRAUMA (scenarios 11-20) ====================
    {
        id: "trauma-011",
        category: "trauma",
        dispatch: {
            name: "Kevin",
            age: 45,
            gender: "M",
            chiefComplaint: "Cyclist vs car - pelvis injury",
            details: "High-energy mechanism, complaining of pelvis and hip pain",
            category: 1
        },
        patient: {
            condition: "Unstable Pelvic Fracture with Haemorrhage",
            history: "Fit and well, no medications",
            medications: "None",
            vitals: {
                hr: 128,
                bp: "88/60",
                rr: 26,
                spo2: 95,
                temp: 35.8,
                gcs: 14,
                bm: 5.8,
                pain: 10
            },
            presentation: "Pelvic instability, haemodynamic compromise, perineal bruising, suspected major pelvic haemorrhage",
            ecg: "Rate 128bpm, regular. Sinus tachycardia. No ST changes.",
            redFlags: [
                "Unstable pelvis - DO NOT rock pelvis (worsens bleeding)",
                "Pelvic fracture can lose 3-4 litres blood into retroperitoneum",
                "APPLY PELVIC BINDER immediately (greater trochanter level, not iliac crests)",
                "Hypothermia developing - keep warm",
                "TIME CRITICAL - needs IR (interventional radiology) or REBOA",
                "Major haemorrhage protocol",
                "TXA within 3 hours of injury"
            ]
        },
        starterMessage: "*conscious but in agony* I came off my bike - the car just pulled out. I cannot move my legs properly. Please be careful with my pelvis - it feels like everything is moving when it should not be. I feel sick and cold."
    },
    {
        id: "trauma-012",
        category: "trauma",
        dispatch: {
            name: "Stuart",
            age: 19,
            gender: "M",
            chiefComplaint: "Head injury - fell at rugby",
            details: "Initially unconscious briefly, now confused, GCS falling",
            category: 1
        },
        patient: {
            condition: "Extradural (Epidural) Haematoma - Lucid Interval then Deterioration",
            history: "Fit young male, no medications, temporal head impact",
            medications: "None",
            vitals: {
                hr: 58,
                bp: "155/90",
                rr: 10,
                spo2: 96,
                temp: 36.5,
                gcs: 11,
                bm: 5.5,
                pain: 7
            },
            presentation: "Classic lucid interval - brief LOC then recovery then deterioration, Cushing's triad developing",
            ecg: "Rate 58bpm, regular. Sinus bradycardia. No ST changes.",
            redFlags: [
                "LUCID INTERVAL - classic EDH presentation (brief LOC, recovery, then deterioration)",
                "Cushing's triad developing: hypertension + bradycardia + abnormal respirations",
                "GCS falling - expanding haematoma compressing brainstem",
                "Temporal impact = middle meningeal artery at risk",
                "TIME CRITICAL - needs neurosurgical evacuation within minutes/hours",
                "PRE-ALERT trauma centre",
                "Keep normotensive, normoxic, normocapnic"
            ]
        },
        starterMessage: "*confused and increasingly drowsy* I got hit on the side of my head in a tackle... I was fine after for a bit but now I have the worst headache and I feel sleepy... *speech becoming slurred*"
    },
    {
        id: "trauma-013",
        category: "trauma",
        dispatch: {
            name: "Danny",
            age: 22,
            gender: "M",
            chiefComplaint: "Stab wound to neck",
            details: "Zone II neck stab, bleeding controlled with pressure, talking",
            category: 1
        },
        patient: {
            condition: "Penetrating Neck Trauma - Zone II",
            history: "No medical history",
            medications: "None",
            vitals: {
                hr: 122,
                bp: "108/72",
                rr: 22,
                spo2: 96,
                temp: 36.8,
                gcs: 15,
                bm: 5.2,
                pain: 6
            },
            presentation: "Zone II neck stab, risk of carotid, jugular, airway, oesophageal injury - currently stable but can deteriorate rapidly",
            ecg: "Rate 122bpm, regular. Sinus tachycardia. No ST changes.",
            redFlags: [
                "Zone II - between cricoid and angle of mandible - most common zone",
                "Any of: carotid, jugular, airway, trachea, oesophagus at risk",
                "DO NOT remove penetrating object if still in situ",
                "Maintain C-spine (penetrating trauma - selective immobilisation)",
                "Expanding haematoma will compromise airway - watch for stridor",
                "DO NOT probe the wound",
                "TIME CRITICAL - direct to MTC with vascular surgery"
            ]
        },
        starterMessage: "My mate is pressing on it... it happened so fast. I can breathe... I can talk. There is a lot of blood but he is pressing on it. I feel a bit lightheaded."
    },
    {
        id: "trauma-014",
        category: "trauma",
        dispatch: {
            name: "Emily",
            age: 8,
            gender: "F",
            chiefComplaint: "Near-drowning at swimming pool",
            details: "Found submerged, bystander CPR, now breathing",
            category: 1
        },
        patient: {
            condition: "Near-Drowning - Secondary Drowning Risk",
            history: "Non-swimmer, fell in at birthday party, submerged for estimated 3-4 minutes",
            medications: "None",
            vitals: {
                hr: 130,
                bp: "85/55",
                rr: 30,
                spo2: 89,
                temp: 34.2,
                gcs: 12,
                bm: 5.5,
                pain: 0
            },
            presentation: "Post-submersion, hypothermic, hypoxic, altered GCS, risk of secondary drowning from pulmonary oedema",
            ecg: "Rate 130bpm. Sinus tachycardia. J waves (Osborn waves) present - hypothermia. No other ST changes.",
            redFlags: [
                "Secondary drowning risk - delayed pulmonary oedema can occur hours later",
                "Hypothermia (34.2 degrees) - do NOT assume death in cold water drowning",
                "GCS 12 - neurological monitoring essential",
                "J (Osborn) waves on ECG = hypothermia marker",
                "Rewarm actively but gently",
                "All near-drowning patients require hospital observation minimum 24 hours",
                "High-flow oxygen and early CPAP/BiPAP if available"
            ]
        },
        starterMessage: "*Mother speaking, very distressed* She fell in and was under the water. They got her out and she started breathing. She is shivering and she is confused - she keeps asking where she is. Please help her."
    },
    {
        id: "trauma-015",
        category: "trauma",
        dispatch: {
            name: "Paul",
            age: 38,
            gender: "M",
            chiefComplaint: "Electrocution at work",
            details: "240V electrical contact, fell from ladder after shock",
            category: 1
        },
        patient: {
            condition: "Electrical Injury with Fall Trauma",
            history: "Electrician, 240V domestic supply, contact for several seconds",
            medications: "None",
            vitals: {
                hr: 95,
                bp: "128/85",
                rr: 18,
                spo2: 97,
                temp: 36.7,
                gcs: 15,
                bm: 5.8,
                pain: 7
            },
            presentation: "Entry and exit burns (hand/foot), fall trauma injuries, cardiac arrhythmia risk for 24 hours, rhabdomyolysis risk",
            ecg: "Rate 95bpm, regular. Multiple ventricular ectopics. QTc prolonged at 470ms. T wave changes throughout.",
            redFlags: [
                "ELECTRICAL INJURY - scene safety first (power isolated?)",
                "Cardiac monitoring mandatory for 24 hours (arrhythmia can be delayed)",
                "Rhabdomyolysis - dark urine, muscle pain, AKI risk",
                "Entry and exit wounds - tissue damage may be extensive under skin",
                "Spinal injury from fall - appropriate immobilisation",
                "High fluid requirements (IV) - IV access needed",
                "Ventricular ectopics on ECG - rhythm monitoring critical"
            ]
        },
        starterMessage: "I grabbed the live wire and I could not let go - it was only a few seconds but it felt like forever. I fell off the ladder too. My hand is burned and my foot feels weird. I feel shaky but alright. Do I need to go to hospital?"
    },
    {
        id: "trauma-016",
        category: "trauma",
        dispatch: {
            name: "Unknown male",
            age: null,
            gender: "M",
            chiefComplaint: "Explosion at industrial site",
            details: "Gas explosion, multiple casualties, one patient closest to blast",
            category: 1
        },
        patient: {
            condition: "Blast Injury - Primary and Secondary",
            history: "Factory worker, no medical history known",
            medications: "Unknown",
            vitals: {
                hr: 135,
                bp: "88/55",
                rr: 32,
                spo2: 87,
                temp: 36.9,
                gcs: 12,
                bm: 5.5,
                pain: 8
            },
            presentation: "Primary blast (barotrauma - lung injury, tympanic perforation), secondary blast (shrapnel), burns, haemodynamic compromise",
            ecg: "Rate 135bpm, irregular. Multiple ectopics. Right heart strain pattern. No ST elevation.",
            redFlags: [
                "PRIMARY BLAST INJURY - tympanic perforation suggests lung barotrauma",
                "Blast lung - pulmonary contusion, haemothorax, pneumothorax",
                "Ruptured tympanic membranes = marker of blast exposure intensity",
                "Scene safety - secondary explosion risk",
                "Shrapnel wounds can penetrate unexpectedly deeply",
                "Hypothermia from burns + exposure",
                "Major incident protocol - triage and command structure"
            ]
        },
        starterMessage: "*Dazed, shouting due to hearing loss* I cannot hear anything - there was a massive bang. I was near the explosion. *multiple lacerations visible, clothing scorched* My chest feels all wrong... I cannot breathe right."
    },
    {
        id: "trauma-017",
        category: "trauma",
        dispatch: {
            name: "Michael",
            age: 34,
            gender: "M",
            chiefComplaint: "Found hanging - cut down by neighbour",
            details: "Partial suspension hanging, neighbour cut rope, GCS now 12",
            category: 1
        },
        patient: {
            condition: "Hanging - Partial Suspension",
            history: "History of depression, recent relationship breakdown, neighbour heard noise",
            medications: "Sertraline 100mg (prescribed but compliance unknown)",
            vitals: {
                hr: 105,
                bp: "165/105",
                rr: 10,
                spo2: 92,
                temp: 36.8,
                gcs: 12,
                bm: 5.5,
                pain: 0
            },
            presentation: "Ligature mark, airway oedema risk, hypoxic brain injury possible, cervical spine injury possible, post-hanging physiology",
            ecg: "Rate 105bpm, regular. Sinus tachycardia. QTc prolonged. T wave changes laterally.",
            redFlags: [
                "Airway oedema from ligature compression - may worsen over hours",
                "Cervical spine injury possible (judicial vs partial suspension - assess mechanism)",
                "Hypoxic brain injury if prolonged suspension",
                "Hypertensive response (post-hypoxic)",
                "Safeguarding - mental health risk, MHA assessment may be needed",
                "Document scene carefully - forensic considerations",
                "Airway management priority - early intubation if airway threatened"
            ]
        },
        starterMessage: "*groggy and confused* Leave me... *ligature mark visible on neck, hoarse voice* ...alone."
    },
    {
        id: "trauma-018",
        category: "trauma",
        dispatch: {
            name: "James",
            age: 26,
            gender: "M",
            chiefComplaint: "Farm machinery accident - arm caught",
            details: "Forearm caught in farm machinery, arm traumatically amputated below elbow",
            category: 1
        },
        patient: {
            condition: "Traumatic Amputation - Below Elbow",
            history: "Farmer, no significant medical history, tetanus status unknown",
            medications: "None",
            vitals: {
                hr: 140,
                bp: "88/60",
                rr: 28,
                spo2: 95,
                temp: 35.9,
                gcs: 14,
                bm: 5.2,
                pain: 4
            },
            presentation: "Traumatic below-elbow amputation, haemorrhagic shock, tourniquet applied by bystander - limb potentially replantable",
            ecg: "Rate 140bpm, regular. Sinus tachycardia. No ST changes.",
            redFlags: [
                "Haemorrhagic shock - major blood loss",
                "Tourniquet - document time of application",
                "PRESERVE amputated part: wrap in saline-moistened gauze, place in sealed bag, place bag on ice - do NOT freeze",
                "Limb replantation may be possible if <6 hours warm ischaemia",
                "TXA within 3 hours of injury",
                "TIME CRITICAL - direct to replantation-capable centre",
                "Tetanus prophylaxis needed"
            ]
        },
        starterMessage: "*pale and distressed, tourniquet on upper arm* I got my arm caught... my hand is over there. The bloke working with me put a belt on my arm. I feel very cold and dizzy. Is it going to be alright?"
    },
    {
        id: "trauma-019",
        category: "trauma",
        dispatch: {
            name: "Patricia",
            age: 52,
            gender: "F",
            chiefComplaint: "Chemical splash to eyes",
            details: "Industrial cleaning fluid splashed in eyes at work, in severe pain",
            category: 2
        },
        patient: {
            condition: "Chemical Eye Injury - Alkali Burn",
            history: "Factory worker, no eye conditions, no glasses",
            medications: "None",
            vitals: {
                hr: 110,
                bp: "145/92",
                rr: 20,
                spo2: 99,
                temp: 36.8,
                gcs: 15,
                bm: 6.2,
                pain: 9
            },
            presentation: "Bilateral eye involvement, alkali agent (industrial cleaner), pain and visual impairment, needs immediate irrigation",
            ecg: "Rate 110bpm, regular. Sinus tachycardia. No ST changes.",
            redFlags: [
                "ALKALI BURNS are worse than acid - penetrate deeper and continue to damage",
                "IMMEDIATE irrigation - start before transport and continue throughout",
                "Minimum 30 minutes continuous irrigation per eye (normal saline or water)",
                "Remove contact lenses immediately if present",
                "Check pH of conjunctival sac - target >7",
                "Alkali agent - identify substance for hospital team",
                "Ophthalmology emergency - can cause permanent blindness if delayed"
            ]
        },
        starterMessage: "*screaming in pain, hands over eyes* Get it out get it out! It went in my eyes - the cleaning fluid! I cannot open them - it burns so much. Please help, I cannot see!"
    },
    {
        id: "trauma-020",
        category: "trauma",
        dispatch: {
            name: "Ryan",
            age: 23,
            gender: "M",
            chiefComplaint: "Motorbike accident - thigh injury",
            details: "MCA, significant thigh deformity, reduced sensation in foot",
            category: 2
        },
        patient: {
            condition: "Femoral Shaft Fracture with Vascular Injury",
            history: "No significant medical history",
            medications: "None",
            vitals: {
                hr: 125,
                bp: "95/65",
                rr: 24,
                spo2: 96,
                temp: 35.6,
                gcs: 15,
                bm: 5.0,
                pain: 10
            },
            presentation: "Femoral shaft fracture with significant thigh haematoma, reduced distal perfusion, haemorrhagic shock",
            ecg: "Rate 125bpm, regular. Sinus tachycardia. No ST changes.",
            redFlags: [
                "Femoral shaft can bleed 1-2 litres into thigh",
                "Assess 6 Ps: Pain, Pallor, Pulselessness, Paraesthesia, Paralysis, Perishingly cold",
                "Reduced sensation and pulse = vascular injury until proven otherwise",
                "Traction splint (e.g. Thomas splint) reduces pain and blood loss",
                "TXA within 3 hours",
                "TIME CRITICAL - vascular injury needs OR within 6 hours",
                "Spinal board/log roll - assess for other injuries"
            ]
        },
        starterMessage: "My leg is in a really bad way - it looks all wrong, bent in the middle. My foot feels strange... I cannot feel it properly. There is so much pain. I was doing about 50 when he pulled out."
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
        starterMessage: "*Mother speaking, child crying in background with cough* She's making this horrible noise when she coughs and she's really struggling to breathe. She's only 2... I'm so scared."
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
        starterMessage: "*Mother speaking* He started with a cold a few days ago but now he's breathing really fast and his tummy keeps sucking in. He won't take his bottle properly - he takes a few sucks then has to stop to breathe. He's only 6 months old."
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
        starterMessage: "*Father speaking, clearly shaken* He just started shaking all over - his whole body went stiff and then he was jerking. His eyes rolled back. He's really sleepy now. Has he got meningitis? Is he going to be okay?"
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
            ecg: "Rate 170bpm, regular rhythm with P waves before each QRS. Otherwise normal for age.",
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
        starterMessage: "*Mother speaking, very distressed* She was fine this morning and now look at her! She's got this rash all over. Her hands and feet are freezing but she's burning up. She won't talk to me properly and she keeps being sick. Please help her!"
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
        starterMessage: "*Mother speaking, very frightened* Something's really wrong with her. She's not acting right - she's all floppy and won't look at me properly. She hasn't had her bottle for hours and she's not crying like she normally does."
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
            ecg: "Rate 125bpm, regular rhythm with P waves before each QRS. Peaked T waves.",
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
        starterMessage: "*Mother speaking* Tyler's been really unwell since yesterday. He keeps being sick. He's breathing really heavily and he's not making sense when he talks."
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
        starterMessage: "*Mother speaking, worried* I think Oscar swallowed something. He keeps pointing to his chest and he's dribbling a lot. He gagged a few times but nothing came up."
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
        starterMessage: "*Ella speaking, holding tummy* My tummy really hurts. I don't want to eat anything and I've been sick once. *Mother adds* She's been hot and she never refuses food normally."
    },

    // ==================== PAEDIATRIC (scenarios 11-20) ====================
    {
        id: "paed-011",
        category: "paediatric",
        dispatch: {
            name: "Leo",
            age: 14,
            gender: "M",
            chiefComplaint: "Sudden severe testicular pain",
            details: "Woke up in night with severe left testicular pain, vomiting",
            category: 1
        },
        patient: {
            condition: "Testicular Torsion",
            history: "Fit and well, previously had intermittent scrotal pain",
            medications: "None",
            vitals: {
                hr: 118,
                bp: "125/78",
                rr: 22,
                spo2: 99,
                temp: 37.5,
                gcs: 15,
                bm: 5.2,
                pain: 10
            },
            presentation: "Sudden onset severe testicular pain, high-riding testicle, absent cremasteric reflex, vomiting from pain - surgical emergency",
            ecg: "N/A - paediatric patient",
            redFlags: [
                "TESTICULAR TORSION - surgical emergency, time-critical",
                "Viability: 100% if <6hrs, 50% if 6-12hrs, <10% if >24hrs",
                "High-riding testicle (shortened spermatic cord)",
                "Absent cremasteric reflex (key sign)",
                "Previous intermittent episodes (intermittent torsion)",
                "DO NOT delay for ultrasound - clinical diagnosis",
                "TIME CRITICAL - needs urgent scrotal exploration"
            ]
        },
        starterMessage: "*in agony, hunched over* My left... it came on in the night and I woke up in absolute agony. I have been sick twice. Please, it is so bad. *Mother adds: I was worried something was seriously wrong.*"
    },
    {
        id: "paed-012",
        category: "paediatric",
        dispatch: {
            name: "Freddie",
            age: 7,
            gender: "M",
            chiefComplaint: "Abdominal pain and screaming episodes",
            details: "Intermittent severe crying then normal, vomited twice",
            category: 2
        },
        patient: {
            condition: "Intussusception",
            history: "Recent viral illness last week, fit and well otherwise",
            medications: "None",
            vitals: {
                hr: 130,
                bp: "92/60",
                rr: 26,
                spo2: 98,
                temp: 37.8,
                gcs: 15,
                bm: "N/A",
                pain: 0
            },
            presentation: "Intermittent colicky pain (child screams then goes quiet/pale), redcurrant jelly stool, palpable sausage-shaped mass RUQ",
            ecg: "N/A - paediatric patient",
            redFlags: [
                "Intermittent screaming with pallor then floppy/quiet - classic intussusception",
                "Redcurrant jelly stool (blood and mucus) = late sign, bowel ischaemia",
                "Sausage-shaped mass palpable (RUQ most common)",
                "Dehydration from vomiting",
                "Recent viral illness - mesenteric adenitis can be lead point",
                "Needs ultrasound and possible air/hydrostatic enema reduction",
                "TIME CRITICAL if ischaemia suspected"
            ]
        },
        starterMessage: "*Mother speaks, distressed* He keeps screaming and then going quiet and pale and floppy for a few minutes, then he is almost normal, then it happens again. He was sick and I noticed something strange in his nappy that looked like redcurrant jelly."
    },
    {
        id: "paed-013",
        category: "paediatric",
        dispatch: {
            name: "Charlie",
            age: 3,
            gender: "M",
            chiefComplaint: "Difficulty breathing - drooling and not moving",
            details: "Woke this morning with high fever, drooling, sitting forward, very quiet",
            category: 1
        },
        patient: {
            condition: "Epiglottitis",
            history: "Unvaccinated (parents declined Hib vaccine), previously well",
            medications: "None",
            vitals: {
                hr: 148,
                bp: "88/55",
                rr: 42,
                spo2: 91,
                temp: 39.8,
                gcs: 15,
                bm: "N/A",
                pain: 0
            },
            presentation: "Tripod position (sitting forward, hands on knees), drooling, high fever, muffled voice, stridor, toxic-looking child",
            ecg: "N/A - paediatric patient",
            redFlags: [
                "EPIGLOTTITIS - do NOT examine throat or cause distress",
                "Tripod position is diagnostic - do not move child",
                "DO NOT lie child flat - can cause complete obstruction",
                "DO NOT attempt cannula or blood tests until airway secured",
                "Unvaccinated child - Hib epiglottitis still occurs",
                "TIME CRITICAL - needs immediate anaesthetic team, theatre",
                "Pre-alert as IMMEDIATELY LIFE-THREATENING"
            ]
        },
        starterMessage: "*Mother whispers, terrified* He has been like this all morning - sitting completely still, drooling, not moving. His voice is all muffled. He is burning up and he will not let me touch him. I am so scared."
    },
    {
        id: "paed-014",
        category: "paediatric",
        dispatch: {
            name: "Isla",
            age: 9,
            gender: "F",
            chiefComplaint: "Bee sting - now has rash and breathing difficulty",
            details: "Multiple bee stings at park, now swollen face and wheezing",
            category: 1
        },
        patient: {
            condition: "Paediatric Anaphylaxis",
            history: "No known allergies, first bee sting, no EpiPen",
            medications: "Salbutamol inhaler (mild asthma)",
            vitals: {
                hr: 145,
                bp: "75/50",
                rr: 34,
                spo2: 90,
                temp: 37.0,
                gcs: 14,
                bm: "N/A",
                pain: 6
            },
            presentation: "Anaphylaxis: urticaria, angioedema, bronchospasm, cardiovascular compromise, paediatric weight-based adrenaline dosing needed",
            ecg: "N/A - paediatric patient",
            redFlags: [
                "ANAPHYLAXIS - adrenaline IM immediately (0.01mg/kg, max 0.5mg)",
                "Paediatric dosing: 0.15mg if <25kg (junior EpiPen), 0.3mg if >25kg",
                "Angioedema - airway compromise risk",
                "Bronchospasm (known asthmatic)",
                "Cardiovascular compromise (BP 75/50)",
                "Position: sit up if respiratory compromise, lie flat if shock",
                "Repeat adrenaline after 5 minutes if no improvement"
            ]
        },
        starterMessage: "*Father speaking, running to ambulance* She was stung about 15 minutes ago - loads of times. Her face is swelling up and she says she cannot breathe. She is covered in a rash. She has never had this before!"
    },
    {
        id: "paed-015",
        category: "paediatric",
        dispatch: {
            name: "Harry",
            age: 13,
            gender: "M",
            chiefComplaint: "Vomiting and confusion - known diabetic",
            details: "Type 1 diabetic, vomiting since yesterday, very confused now",
            category: 2
        },
        patient: {
            condition: "Diabetic Ketoacidosis (DKA) - Paediatric",
            history: "Type 1 DM diagnosed age 8, missed insulin injections for 2 days",
            medications: "NovoRapid, Lantus (missed doses)",
            vitals: {
                hr: 128,
                bp: "95/60",
                rr: 30,
                spo2: 98,
                temp: 37.5,
                gcs: 13,
                bm: 28.5,
                pain: 4
            },
            presentation: "Kussmaul breathing, fruity breath, dehydration, altered GCS - paediatric DKA with cerebral oedema risk",
            ecg: "N/A - paediatric patient",
            redFlags: [
                "Kussmaul breathing (deep regular - compensatory respiratory alkalosis)",
                "Cerebral oedema risk in paediatric DKA - MOST DANGEROUS complication",
                "DO NOT rehydrate too rapidly - slow rehydration protocol",
                "Altered GCS in DKA = suspect cerebral oedema - CALL PAEDIATRICS",
                "BM 28.5 - severe hyperglycaemia",
                "Dehydration assessment: capillary refill, skin turgor",
                "Needs paediatric HDU/ICU management"
            ]
        },
        starterMessage: "*Mother speaking* He has been vomiting since yesterday and I could not get his sugars down. He has not taken his insulin for 2 days - he said he did not want to. He is very drowsy now and his breathing sounds really strange and deep."
    },
    {
        id: "paed-016",
        category: "paediatric",
        dispatch: {
            name: "Evie",
            age: 6,
            gender: "F",
            chiefComplaint: "Found in swimming pool",
            details: "Found face-down in garden paddling pool, unclear submersion time",
            category: 1
        },
        patient: {
            condition: "Paediatric Near-Drowning",
            history: "Fit and well, unsupervised briefly, found by older sibling",
            medications: "None",
            vitals: {
                hr: 52,
                bp: "70/40",
                rr: 6,
                spo2: 74,
                temp: 33.5,
                gcs: 4,
                bm: 3.8,
                pain: 0
            },
            presentation: "Apnoeic on arrival, bradycardic, hypothermic - near-drowning with CPR in progress by family",
            ecg: "Rate 52bpm. Bradycardia. J waves (Osborn) present - hypothermia.",
            redFlags: [
                "Hypothermic cardiac arrest - DO NOT confirm death until warm",
                "In cold water cardiac arrest: 'Not dead until warm and dead'",
                "Paediatric BLS - 5 initial rescue breaths",
                "Hypothermia significantly slows metabolism - prolonged CPR warranted",
                "Hypoglycaemia (BM 3.8) - glucose needed",
                "Safeguarding assessment - supervision at time of incident",
                "ECMO may be considered at receiving hospital for refractory arrest"
            ]
        },
        starterMessage: "*Bystander (older sibling, distressed) speaks* I found her in the paddling pool - I do not know how long. Dad is doing chest compressions. She did not wake up when I pulled her out."
    },
    {
        id: "paed-017",
        category: "paediatric",
        dispatch: {
            name: "Chloe",
            age: 15,
            gender: "F",
            chiefComplaint: "Taken lots of tablets",
            details: "Parents found empty packets of paracetamol and ibuprofen, teenager",
            category: 2
        },
        patient: {
            condition: "Paediatric Mixed Overdose - Paracetamol and Ibuprofen",
            history: "Bullying at school, self-harmed previously (cutting), no psychiatric history",
            medications: "None regular",
            vitals: {
                hr: 105,
                bp: "110/70",
                rr: 20,
                spo2: 98,
                temp: 37.2,
                gcs: 15,
                bm: 5.2,
                pain: 4
            },
            presentation: "Weight-based paracetamol toxic dose calculation needed, early stage (currently well), gastric symptoms from ibuprofen",
            ecg: "N/A - paediatric patient",
            redFlags: [
                "Paracetamol in overdose - initially WELL (presentation to liver failure can be delayed 24-72 hours)",
                "TIME since ingestion critical for NAC decision",
                "Weight-based toxic dose: >150mg/kg in children potentially hepatotoxic",
                "Do NOT assume small amount because she is small",
                "IBUPROFEN overdose - renal and GI toxicity",
                "Safeguarding MUST be documented",
                "CAMHS referral - mental health assessment required"
            ]
        },
        starterMessage: "*Mother speaking, crying* I found the empty boxes in her room. She took them this afternoon I think. She will not talk to me. She is sitting there... she looks fine but I am terrified. She has been so unhappy at school."
    },
    {
        id: "paed-018",
        category: "paediatric",
        dispatch: {
            name: "Noah",
            age: 3,
            gender: "M",
            chiefComplaint: "Projectile vomiting for 2 weeks",
            details: "3-week-old, vomiting immediately after every feed, losing weight",
            category: 2
        },
        patient: {
            condition: "Pyloric Stenosis",
            history: "First child, bottle-fed, well immediately after birth",
            medications: "None",
            vitals: {
                hr: 155,
                bp: "65/40",
                rr: 42,
                spo2: 97,
                temp: 37.0,
                gcs: 15,
                bm: "N/A",
                pain: 0
            },
            presentation: "Non-bilious projectile vomiting, dehydration, visible peristaltic waves, hungry infant who vomits after every feed",
            ecg: "N/A - paediatric patient",
            redFlags: [
                "Non-bilious vomiting in infant - differentiates from bowel obstruction",
                "Projectile - forceful (across the room)",
                "Hungry immediately after vomiting (unlike intestinal obstruction where appetite lost)",
                "Hypochloraemic hypokalaemic metabolic alkalosis (classic biochemical finding)",
                "Dehydration in neonate - high surface area:volume ratio",
                "Olive-shaped mass palpable in RUQ if experienced examiner",
                "Needs urgent paediatric surgical review for pyloromyotomy"
            ]
        },
        starterMessage: "*Father speaks* He vomits after every single feed - it literally shoots across the room. He seems hungry still afterwards and wants more milk. He has been losing weight and now he looks really dehydrated. He is three weeks old."
    },
    {
        id: "paed-019",
        category: "paediatric",
        dispatch: {
            name: "Jake",
            age: 14,
            gender: "M",
            chiefComplaint: "Collapsed at football training",
            details: "Collapsed during running drill, no warning, currently unresponsive",
            category: 1
        },
        patient: {
            condition: "Long QT Syndrome - Arrhythmic Collapse in Young Person",
            history: "Sudden death of uncle at age 35, was told to 'get his heart checked' but never did",
            medications: "None",
            vitals: {
                hr: 0,
                bp: "Undetectable",
                rr: 0,
                spo2: 0,
                temp: 36.8,
                gcs: 3,
                bm: 5.0,
                pain: 0
            },
            presentation: "Witnessed sudden cardiac arrest during exercise, no prodrome, strong family history of sudden cardiac death - likely channelopathy",
            ecg: "AED delivered 2 shocks, rhythm now: Rate 85bpm regular. Sinus rhythm with prolonged QTc (540ms). T wave abnormalities throughout.",
            redFlags: [
                "SUDDEN CARDIAC ARREST IN YOUNG PERSON - channelopathy until proven otherwise",
                "Post-ROSC with prolonged QTc - high re-arrest risk",
                "Family history of sudden cardiac death (uncle aged 35)",
                "Exercise-triggered - classic for Long QT and CPVT",
                "All first-degree relatives need cardiac screening",
                "DO NOT give adrenaline if rhythm restored - worsens long QT",
                "TIME CRITICAL - cardiac genetics centre referral"
            ]
        },
        starterMessage: "*Coach speaking, very distressed* He just dropped mid-sprint - no warning at all. We got the defibrillator from the sports centre and it shocked him twice. He has a pulse now but he will not wake up. He was absolutely fine two minutes ago."
    },
    {
        id: "paed-020",
        category: "paediatric",
        dispatch: {
            name: "Sophie",
            age: 2,
            gender: "F",
            chiefComplaint: "Vomiting and diarrhoea - very lethargic",
            details: "3 days of vomiting and diarrhoea, now not responding normally",
            category: 2
        },
        patient: {
            condition: "Severe Gastroenteritis with Dehydration - Paediatric",
            history: "Nursery outbreak of gastroenteritis (norovirus likely), not vaccinated against rotavirus",
            medications: "None",
            vitals: {
                hr: 175,
                bp: "68/40",
                rr: 44,
                spo2: 97,
                temp: 38.3,
                gcs: 12,
                bm: 2.8,
                pain: 0
            },
            presentation: "Severe dehydration (>10%), sunken fontanelle, no tears, capillary refill 4 seconds, hypoglycaemia, altered GCS",
            ecg: "N/A - paediatric patient",
            redFlags: [
                "HYPOGLYCAEMIA (BM 2.8) - altered GCS in toddler with low BM",
                "Severe dehydration: >10% body weight loss in infant",
                "Sunken fontanelle, sunken eyes, dry mucous membranes",
                "Capillary refill 4 seconds - shock",
                "Altered GCS from hypoglycaemia and dehydration",
                "IV/IO access - oral rehydration not appropriate in this state",
                "Paediatric fluid bolus: 10ml/kg 0.9% NaCl (not 20ml/kg as in adult)"
            ]
        },
        starterMessage: "*Father speaking, very worried* She has not kept anything down for three days. She has got diarrhoea as well. She was a bit poorly to begin with but now she just lies there and barely opens her eyes. She feels floppy. She has not been herself for hours."
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
        starterMessage: "*between contractions* The baby's coming NOW! I can feel it... *groaning* ...I need to push! My midwife was supposed to be here but she's stuck in traffic."
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
            ecg: "Rate 125bpm, regular rhythm with P waves before each QRS.",
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
        starterMessage: "*Midwife speaking* Mum delivered about 20 minutes ago, big baby, placenta's out but the uterus isn't contracting. I've given Syntometrine and I'm rubbing up the uterus but she's still bleeding heavily. She's gone really pale and her pulse is thready."
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
            ecg: "Rate 105bpm, regular rhythm with P waves before each QRS. Tall R waves in V5-V6, deep S waves in V1-V2. No ST changes.",
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
        starterMessage: "*Husband speaking* She just started fitting! Her whole body was shaking for about two minutes. She's 38 weeks pregnant. She's been having bad headaches and seeing spots. She's still not making sense... Sarah, can you hear me?"
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
        starterMessage: "*panicking* Something's really wrong! My waters just broke and I went to the toilet and there's something coming out... I can see it! I'm only 34 weeks. What do I do? Is my baby going to die?"
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
            ecg: "Rate 105bpm, regular rhythm with P waves before each QRS.",
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
        starterMessage: "I woke up in a pool of blood - it's bright red and there's quite a lot of it. I don't have any pain which seems strange. They told me at my scan that my placenta was low down and might cause problems. I'm really scared for the baby."
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
            ecg: "Rate 120bpm, regular rhythm with P waves before each QRS.",
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
        starterMessage: "*in severe pain, clutching abdomen* The pain came on suddenly about 20 minutes ago and it's constant. I've had a bit of dark blood. The baby hasn't moved much since it started. Something's really wrong, I know it is."
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
        starterMessage: "*Midwife speaking, urgent* The head's out but baby isn't coming. I need help NOW. First baby was big and she's got gestational diabetes."
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
        starterMessage: "*crying* I'm scared... there's so much blood and I keep passing clots. I am 8 weeks pregnant - we only just found out. The pain is like really bad period cramps. Is there anything you can do to save my baby? This is my first pregnancy..."
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
        starterMessage: "*panicking, between contractions* The baby's coming but I can't feel it's head, it's something else? I was supposed to have a caesarean next week. My contractions just started an hour ago and now it's coming! I can't stop pushing!"
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
            ecg: "Rate 90bpm, regular rhythm with P waves before each QRS. Tall R waves in V5-V6, deep S waves in V1-V2.",
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
        starterMessage: "I've got a terrible headache that won't go away with paracetamol. I keep seeing flashing lights and my face looks really puffy - look at my hands, my rings won't come off. I've got this pain under my ribs on the right too. I'm 34 weeks pregnant."
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
        starterMessage: "*flat affect, not making eye contact* I don't know why my sister called you. There's nothing you can do. I've had enough.... what's the point anymore? I just want it all to stop. Everyone would be better off without me."
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
            ecg: "Rate 85bpm, regular rhythm with P waves before each QRS. QT interval within normal limits.",
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
        starterMessage: "*tearful* I took some tablets about 2 hours ago... I regret it now, I don't really want to die, I just wanted everything to stop for a while. My stomach hurts a bit. I'm so stupid... am I going to be okay?"
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
            ecg: "Rate 60bpm, regular rhythm with P waves before each QRS. No other abnormalities.",
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
            ecg: "Rate 120bpm, regular rhythm with P waves before each QRS. No ST changes.",
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
            ecg: "Rate 100bpm, regular rhythm with P waves before each QRS. No abnormalities detected.",
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
            ecg: "Rate 125bpm, regular rhythm with P waves before each QRS. QT interval prolonged.",
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
        starterMessage: "*trembling violently, looking around fearfully* There's things crawling everywhere! Can't you see them? *brushing at arms* Get them off me! I stopped drinking because I wanted to get better but now I feel terrible. What's happening to me? I'm so scared."
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
            ecg: "Rate 95bpm, regular rhythm with P waves before each QRS. No abnormalities detected.",
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
/**
 * Get the system prompt for a scenario (for the AI)
 * Updated with difficulty levels, HINT mode and improved DEBRIEF detection
 */


/**
 * Get the system prompt for a scenario (for the AI)
 * Updated with difficulty levels, HINT mode, personas for Level 3, and improved DEBRIEF detection
 */
function getScenarioSystemPrompt(scenarioId, difficultyLevel = 1, deteriorationPhase = null) {
    const scenario = getScenarioById(scenarioId);
    if (!scenario) return null;
    
    const p = scenario.patient;
    const d = scenario.dispatch;
    
    // Get difficulty modifiers
    const difficulty = DIFFICULTY_LEVELS[difficultyLevel] || DIFFICULTY_LEVELS[1];
    const mods = difficulty.modifiers;
    
    // Format red flags as a readable list
    const redFlagsFormatted = p.redFlags ? p.redFlags.join(', ') : 'None specified';
    
    // Handle deterioration state
    let deteriorationInstructions = '';
    let currentVitals = p.vitals;
    
    if (deteriorationPhase) {
        currentVitals = calculateDeterioratedVitals(p.vitals, deteriorationPhase);
        deteriorationInstructions = `
========================================================================
PATIENT DETERIORATION STATUS: ${deteriorationPhase.toUpperCase()}
========================================================================
${DETERIORATION_CONFIG.behaviourChanges[deteriorationPhase]}

UPDATED VITAL SIGNS (use these instead of the original values):
- HR: ${currentVitals.hr}
- BP: ${currentVitals.bp}
- RR: ${currentVitals.rr}
- SpO2: ${currentVitals.spo2}%
- GCS: ${currentVitals.gcs}

You MUST reflect this deterioration in ALL your responses from now on.
========================================================================`;
    }
    
    
    // Build difficulty-specific instructions
    let difficultyInstructions = '';
    let personaInstructions = '';
    
    if (difficultyLevel === 1) {
        difficultyInstructions = `
LEVEL 1 REQUIREMENTS (YOU MUST FOLLOW THESE):
- Present with TEXTBOOK, OBVIOUS symptoms
- Be CALM and COOPERATIVE
- Answer questions CLEARLY and COMPLETELY
- VOLUNTEER important information without being asked
- Make it EASY for the learner to identify the condition`;
    } else if (difficultyLevel === 2) {
        difficultyInstructions = `
LEVEL 2 REQUIREMENTS (YOU MUST FOLLOW THESE):
- Present REALISTICALLY but not perfectly textbook
- Be somewhat ANXIOUS, may need prompting for details
- Remember MOST of your history but be uncertain about some details
- Only reveal red flags when DIRECTLY ASKED
- Add minor realistic concerns (worried about work, etc.)`;
    } else {
        // Level 3 - Get persona for this scenario
        const personaKey = getPersonaForScenario(scenarioId);
        const persona = PATIENT_PERSONAS[personaKey];
        
        difficultyInstructions = `
LEVEL 3 REQUIREMENTS (YOU MUST FOLLOW THESE):
- Present ATYPICALLY - symptoms should be VAGUE or SUBTLE
- HIDE red flags - only reveal with careful, persistent questioning
- ADD DISTRACTORS - unrelated symptoms, social issues
- Your condition may DETERIORATE if assessment is slow
- You MUST adopt the assigned PATIENT PERSONA below`;

        personaInstructions = `
========================================================================
MANDATORY PATIENT PERSONA: ${persona.name}
========================================================================
${persona.description}

${persona.behaviour}

THIS PERSONA IS NOT OPTIONAL. You must maintain this persona consistently throughout the entire scenario.
The paramedic must work around these challenges to gather the information they need.
========================================================================`;
    }
    
    return `
========================================================================
CRITICAL: DIFFICULTY LEVEL ${difficultyLevel} - ${difficulty.name}
========================================================================

YOU MUST ADJUST YOUR ENTIRE PERFORMANCE BASED ON THIS DIFFICULTY LEVEL.
This is NOT optional - the difficulty level fundamentally changes how you portray this patient.
${difficultyInstructions}
${personaInstructions}
${deteriorationInstructions}

CORE GOAL
You are simulating a patient encounter for paramedic training.
- Use British English throughout
- Act as the patient (or bystander) for history and symptoms
- Provide clinical data ONLY when explicitly requested
- NEVER teach, explain, interpret, or give differentials during ROLEPLAY
- Teaching happens ONLY in DEBRIEF mode

------------------------------------------------------------------------
PATIENT DETAILS (hidden from learner):
------------------------------------------------------------------------
- Name: ${d.name || 'Unknown'}
- Age: ${d.age || 'Unknown'}
- Gender: ${d.gender === 'M' ? 'Male' : d.gender === 'F' ? 'Female' : 'Unknown'}
- Condition: ${p.condition}
- Medical History: ${p.history}
- Medications: ${p.medications}
- Vital Signs: HR ${currentVitals.hr}, BP ${currentVitals.bp}, RR ${currentVitals.rr}, SpO2 ${currentVitals.spo2}%, Temp ${currentVitals.temp}, GCS ${currentVitals.gcs}, BM ${currentVitals.bm}, Pain ${currentVitals.pain}/10
- Presentation: ${p.presentation}
- ECG Findings: ${p.ecg}
- Red Flags: ${redFlagsFormatted}

PATIENT BEHAVIOUR:
- Speak naturally as a real patient would (may not know medical terms)
- Show appropriate emotion (anxious if chest pain, drowsy if septic, etc.)
- ADJUST your responses according to the DIFFICULTY LEVEL above
- If very unwell (low GCS, severe pain), responses may be brief or confused

------------------------------------------------------------------------
PROFESSIONALISM MONITOR (IMPORTANT)
------------------------------------------------------------------------
You must monitor the paramedic's communication for unprofessional behaviour.

EXAMPLES OF UNPROFESSIONAL BEHAVIOUR:
- Insults or name-calling ("idiot", "stupid", swearing AT the patient)
- Dismissive language ("stop being dramatic", "there's nothing wrong with you")
- Blaming the patient ("this is your own fault", "you did this to yourself")
- Impatience or aggression ("just answer the question", "shut up")
- Inappropriate comments about weight, lifestyle, appearance
- Condescending tone ("you wouldn't understand", "obviously...")
- Threatening behaviour ("if you don't cooperate...")

IF YOU DETECT UNPROFESSIONAL BEHAVIOUR:

1. First, respond as the patient would realistically react (upset, offended, withdrawn)

2. Then add a clearly marked warning box:

---
**PROFESSIONALISM WARNING**

Speaking to patients in this manner is unacceptable in clinical practice. This behaviour could result in:
- Formal complaints from patients
- Fitness to practice investigations
- Disciplinary action from your employer
- Potential removal from the HCPC register

As healthcare professionals, we must treat all patients with dignity and respect, regardless of the circumstances. Please reconsider your approach.

---

3. Continue the scenario but the patient may now be less cooperative or more distressed

DO NOT flag normal clinical firmness (e.g., "I need you to stay still" or "It's important you answer honestly") - only flag genuinely rude, dismissive, or unprofessional communication.
------------------------------------------------------------------------
STATE MACHINE (strict - operate in exactly ONE mode at a time)
------------------------------------------------------------------------

MODE: ROLEPLAY (default)
------------------------------------------------------------------------
Output Rules:
- History/symptoms question: Respond as PATIENT in everyday language
- Measurement/test request: Provide CLINICAL DATA with objective findings only
- "Obs" / "vitals" / "full set": CLINICAL DATA: HR ${currentVitals.hr}, BP ${currentVitals.bp}, RR ${currentVitals.rr}, SpO2 ${currentVitals.spo2}%, Temp ${currentVitals.temp}, GCS ${currentVitals.gcs}, BM ${currentVitals.bm}, Pain ${currentVitals.pain}/10
- Scene assessment: Describe environment/observations as third-person findings

STRICTLY FORBIDDEN in ROLEPLAY:
- Revealing the diagnosis or naming the condition
- Listing differentials or red flags
- Interpreting findings ("this suggests...", "this could indicate...")
- Giving management advice or treatment suggestions
- Explaining why something is significant
- Summarising what the learner should consider

Treatment Requests:
If learner says they are giving treatment (e.g., "I'm giving GTN", "Starting O2"):
- Acknowledge naturally as patient ("Okay, that spray tastes odd")
- Do NOT confirm if treatment is correct or incorrect
- If asked about effect, give realistic patient response (not clinical evaluation)

ECG Rule:
- ECG/12-lead/rhythm request: Provide ONLY the objective findings from: ${p.ecg}
- REMOVE any diagnostic labels or pattern names from your response
- Give only: rate, rhythm regularity, P waves, PR interval, QRS width, ST segments, T waves, axis
- DO NOT add an "Interpretation" line - this is FORBIDDEN
- DO NOT name the rhythm type (e.g., do NOT say "narrow complex tachycardia", "SVT", "AF", "sinus rhythm", "heart block")
- DO NOT say what the findings "suggest" or "indicate"
- Simply state WHAT YOU SEE on the tracing, not WHAT IT MEANS
- Example CORRECT output: "Rate 180bpm, regular rhythm, no visible P waves, QRS narrow (<120ms), no ST changes"
- Example WRONG output: "Rate 180bpm... Interpretation: Regular narrow complex tachycardia" ← NEVER DO THIS
- If learner asks "What does this ECG show?" or "Interpret this ECG": Provide the raw findings only, then add: PATIENT: "I don't know what those squiggly lines mean - what do you think?"
- The learner must interpret the ECG themselves - that is the learning exercise

MODE: HINT
------------------------------------------------------------------------
Triggered when message contains: [HINT] or "give me a hint" or "I'm stuck"

Provide a gentle nudge WITHOUT revealing the diagnosis:
- Suggest ONE area they have not explored yet
- Frame as a question: "Have you asked about...?" or "What about checking...?"
- Keep it brief (1-2 sentences max)
- Do NOT list multiple suggestions
- Do NOT explain why it is important
- Return to ROLEPLAY mode after giving the hint

Example hints:
- "Have you asked about any associated symptoms?"
- "It might be worth checking the patient's medication list."
- "Have you performed a 12-lead ECG yet?"

MODE: DEBRIEF
------------------------------------------------------------------------
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
6. Consider the difficulty level (${difficulty.name}) when assessing their performance

REQUIRED DEBRIEF FORMAT (use these exact headings):

## 1. DIAGNOSIS CHECK
The actual diagnosis is: ${p.condition}
Your impression was: [quote their impression]
VERDICT: [CORRECT / PARTIALLY CORRECT / INCORRECT]
[If correct: "Well done! You correctly identified..." and briefly explain why the findings support this]
[If partially correct: Explain what they got right and what they missed]
[If incorrect: Explain why their impression does not fit and what the correct diagnosis is]

## 2. WHAT YOU DID WELL
[Review the conversation above and list SPECIFIC things they actually did]
[Quote their questions/assessments directly, e.g., "You asked about pain radiation - good cardiac thinking"]
[If they did minimal assessment: "You submitted your impression without gathering much information. In real practice, always assess thoroughly before diagnosing."]

## 3. WHAT YOU MISSED
[List 3-6 specific things they should have done but did not]
- Questions they did not ask
- Assessments they did not perform  
- History they did not gather

## 4. RED FLAGS FOR ${p.condition}
The key red flags for this condition are:
${redFlagsFormatted}
[Note which ones they identified vs missed]

## 5. NEXT STEPS
[Where should this patient go? (Disposition)]
[What resources might be needed?]
For treatment and management of ${p.condition}, open your JRCalc app and refer to the relevant guideline.

IMPORTANT: Start your response with "## 1. DIAGNOSIS CHECK" - do NOT start with 
generic text like "DEBRIEF:" or advice. Go straight into the structured feedback.

------------------------------------------------------------------------
OUTPUT FORMAT (strict)
------------------------------------------------------------------------

In ROLEPLAY:
- Patient dialogue: PATIENT: [response]
- Clinical findings: CLINICAL DATA: [findings]
- Scene observations: SCENE: [observations]
- Do NOT mix types in one response unless explicitly requested

In HINT:
- Brief suggestion: HINT: [one gentle nudge]

In DEBRIEF:
- Start IMMEDIATELY with "## 1. DIAGNOSIS CHECK"
- Follow the exact 5-section format with ## headings
- State clearly if diagnosis is CORRECT, PARTIALLY CORRECT, or INCORRECT
- Do NOT start with "DEBRIEF:" or generic preamble
- Do NOT give generic advice - be SPECIFIC to this case

------------------------------------------------------------------------

BEGIN in MODE: ROLEPLAY. Wait for learner's first question.`;
}





// ==================== EXPORTS ====================

// Make available globally for use in chat.js
window.scenarioData = {
    SCENARIO_CATEGORIES,
    SCENARIOS,
    DIFFICULTY_LEVELS,
    PATIENT_PERSONAS, 
    DETERIORATION_CONFIG, 
    getScenariosByCategory,
    getScenarioById,
    getScenarioCountByCategory,
    getRandomScenario,
    formatDispatchInfo,
    getScenarioSystemPrompt,
    getPersonaForScenario,
    calculateDeterioratedVitals,       
    getDeteriorationPhase,             
    isKeyAssessment                    
};