/* ============================================
   PARAMIND ECG - ROIS SYSTEMATIC REVIEW MODE
   ============================================
   ROIS Framework by PocketParamedic
   https://www.pocketparamedic.co.uk
   
   R - Rate & Rhythm (regular/irregular)
   O - Origin  
   I - Intervals (PR, QRS, QTc)
   S - STEMI
   ============================================ */

// ==================== ROIS DATA FOR ALL 20 RHYTHMS ====================
// Excluded: ventricularFibrillation, asystole, pea (cardiac arrest rhythms)
// Each rhythm has 5 steps: R(Rate), R(Rhythm), O, I, S

const ROIS_DATA = {

    normalSinus: {
        roisRate: 75,
        steps: [
            { letter: 'R', label: 'Rate', question: 'What is the approximate ventricular rate?', options: ['Less than 60 bpm', '60\u2013100 bpm', '100\u2013150 bpm', 'Greater than 150 bpm'], correct: 1, explanation: 'The rate is within the normal range of 60\u2013100 bpm. Count the R-R intervals \u2014 they are regular and consistent.' },
            { letter: 'R', label: 'Rhythm', question: 'How would you describe the rhythm regularity?', options: ['Regular', 'Irregular', 'Irregularly irregular', 'Regularly irregular (grouped pattern)'], correct: 0, explanation: 'The rhythm is regular \u2014 the R-R intervals are consistent throughout the trace. A regular rhythm with a normal rate is reassuring, but always complete all ROIS steps.' },
            { letter: 'O', label: 'Origin', question: 'Where is this rhythm most likely originating from?', options: ['SA node (sinus)', 'Atrial ectopic focus', 'AV junction', 'Ventricles'], correct: 0, explanation: 'Upright P waves in Lead II before every QRS complex \u2014 this is sinus origin from the SA node.' },
            { letter: 'I', label: 'Intervals', question: 'What do the intervals (PR, QRS, QTc) show?', options: ['All intervals normal', 'Prolonged PR interval (>0.20s)', 'Widened QRS complex (>0.12s)', 'Prolonged QTc interval'], correct: 0, explanation: 'PR interval 0.12\u20130.20s, narrow QRS <0.12s, and normal QTc. All intervals are within normal limits.' },
            { letter: 'S', label: 'STEMI', question: 'What do the ST segments show?', options: ['No acute ST changes', 'ST elevation in contiguous leads', 'ST depression', 'ST elevation with reciprocal changes'], correct: 0, explanation: 'Isoelectric ST segments with no evidence of acute ischaemia or injury. This is a normal ECG.' }
        ]
    },

    sinusBradycardia: {
        roisRate: 45,
        steps: [
            { letter: 'R', label: 'Rate', question: 'What is the approximate ventricular rate?', options: ['Less than 60 bpm', '60\u2013100 bpm', '100\u2013150 bpm', 'Greater than 150 bpm'], correct: 0, explanation: 'The rate is below 60 bpm. The R-R intervals are wide, indicating a slow heart rate. This could be normal in athletes or during sleep, but may be pathological in symptomatic patients.' },
            { letter: 'R', label: 'Rhythm', question: 'How would you describe the rhythm regularity?', options: ['Regular', 'Irregular', 'Irregularly irregular', 'Regularly irregular (grouped pattern)'], correct: 0, explanation: 'The rhythm is regular \u2014 the R-R intervals are consistent, just wider apart than normal. A regular but slow rhythm points towards sinus bradycardia rather than a conduction disorder with dropped beats.' },
            { letter: 'O', label: 'Origin', question: 'Where is this rhythm most likely originating from?', options: ['SA node (sinus)', 'AV junction', 'Ventricles', 'Multiple atrial foci'], correct: 0, explanation: 'Despite the slow rate, upright P waves are present before each QRS \u2014 this is still sinus origin. The SA node is simply firing more slowly than usual.' },
            { letter: 'I', label: 'Intervals', question: 'What do the intervals (PR, QRS, QTc) show?', options: ['All intervals normal', 'Prolonged PR interval (>0.20s)', 'Widened QRS complex (>0.12s)', 'Variable PR intervals'], correct: 0, explanation: 'PR, QRS, and QTc are all within normal limits. The only abnormality is the rate \u2014 the conduction system itself is functioning normally.' },
            { letter: 'S', label: 'STEMI', question: 'What do the ST segments show?', options: ['No acute ST changes', 'ST elevation in contiguous leads', 'ST depression suggesting ischaemia', 'ST elevation with reciprocal changes'], correct: 0, explanation: 'No acute ST changes. Remember: inferior STEMI can present with bradycardia, so always complete your ROIS assessment even when the rate seems to be the main finding.' }
        ]
    },

    sinusTachycardia: {
        roisRate: 120,
        steps: [
            { letter: 'R', label: 'Rate', question: 'What is the approximate ventricular rate?', options: ['Less than 60 bpm', '60\u2013100 bpm', '100\u2013150 bpm', 'Greater than 150 bpm'], correct: 2, explanation: 'The rate is above 100 bpm. The R-R intervals are shorter than normal, indicating tachycardia. Always ask: why is this patient tachycardic? (Pain, fever, hypovolaemia, anxiety, sepsis?)' },
            { letter: 'R', label: 'Rhythm', question: 'How would you describe the rhythm regularity?', options: ['Regular', 'Irregular', 'Irregularly irregular', 'Regularly irregular (grouped pattern)'], correct: 0, explanation: 'The rhythm is regular \u2014 each R-R interval is the same. A regular tachycardia helps narrow the differential: sinus tachycardia, SVT, atrial flutter, and VT are all typically regular. Irregularity would point towards AF or ectopics.' },
            { letter: 'O', label: 'Origin', question: 'Where is this rhythm most likely originating from?', options: ['SA node (sinus)', 'AV re-entry circuit (SVT)', 'Atrial ectopic focus', 'Ventricles'], correct: 0, explanation: 'P waves are present before each QRS \u2014 this is sinus tachycardia, not SVT. The SA node is firing faster in response to a physiological trigger. Look for the underlying cause.' },
            { letter: 'I', label: 'Intervals', question: 'What do the intervals (PR, QRS, QTc) show?', options: ['All intervals normal', 'Prolonged PR interval (>0.20s)', 'Shortened PR with delta wave', 'Widened QRS complex (>0.12s)'], correct: 0, explanation: 'All intervals remain normal. The PR may appear slightly shorter at faster rates but is still within the normal range. Narrow QRS confirms supraventricular origin.' },
            { letter: 'S', label: 'STEMI', question: 'What do the ST segments show?', options: ['No acute ST changes', 'ST elevation in contiguous leads', 'ST depression (rate-related)', 'ST elevation with reciprocal changes'], correct: 0, explanation: 'No acute ST changes in this trace. Note: tachycardia can cause rate-related ST depression, and persistent sinus tachycardia in a chest pain patient should raise suspicion of ACS.' }
        ]
    },

    sinusArrhythmia: {
        roisRate: 70,
        steps: [
            { letter: 'R', label: 'Rate', question: 'What is the approximate ventricular rate?', options: ['Less than 60 bpm', '60\u2013100 bpm (but varies)', '100\u2013150 bpm', 'Completely irregular \u2014 impossible to determine'], correct: 1, explanation: 'The rate is within the normal range but varies with respiration \u2014 speeding up with inspiration and slowing with expiration. This cyclical variation is the hallmark of sinus arrhythmia.' },
            { letter: 'R', label: 'Rhythm', question: 'How would you describe the rhythm regularity?', options: ['Regular', 'Irregular \u2014 varying R-R intervals in a cyclical pattern', 'Irregularly irregular \u2014 completely chaotic', 'Regularly irregular (grouped pattern with pauses)'], correct: 1, explanation: 'The rhythm is irregular \u2014 R-R intervals vary in a cyclical pattern linked to respiration. This is NOT the same as "irregularly irregular" (which is chaotic, like AF). The cyclical, predictable nature of the irregularity is the key distinguishing feature.' },
            { letter: 'O', label: 'Origin', question: 'Where is this rhythm most likely originating from?', options: ['SA node (sinus)', 'Multiple atrial foci (chaotic)', 'AV junction', 'Alternating sinus and atrial foci'], correct: 0, explanation: 'P waves are consistent in morphology and always precede the QRS \u2014 this is sinus origin. The irregular R-R intervals are due to vagal tone changes with breathing, not a change in origin.' },
            { letter: 'I', label: 'Intervals', question: 'What do the intervals (PR, QRS, QTc) show?', options: ['All intervals normal despite rate variation', 'Variable PR intervals suggesting wandering pacemaker', 'Progressively prolonging PR (Wenckebach)', 'Widened QRS complex'], correct: 0, explanation: 'All intervals are normal. The PR interval stays constant even as the R-R intervals vary. This distinguishes sinus arrhythmia from other causes of irregular rhythm.' },
            { letter: 'S', label: 'STEMI', question: 'What do the ST segments show?', options: ['No acute ST changes', 'ST elevation in contiguous leads', 'ST depression', 'Cannot assess due to irregular rhythm'], correct: 0, explanation: 'No acute ST changes. Sinus arrhythmia is a benign normal variant \u2014 common in young, fit individuals. No treatment is needed.' }
        ]
    },

    atrialFibrillation: {
        roisRate: 110,
        steps: [
            { letter: 'R', label: 'Rate', question: 'What is the approximate ventricular rate?', options: ['Less than 60 bpm', '60\u2013100 bpm', '100\u2013150 bpm', 'Greater than 150 bpm'], correct: 2, explanation: 'The ventricular rate is approximately 110 bpm, though it varies beat-to-beat. In AF, count QRS complexes over 6 seconds and multiply by 10 to estimate the rate, because the rhythm is irregularly irregular.' },
            { letter: 'R', label: 'Rhythm', question: 'How would you describe the rhythm regularity?', options: ['Regular', 'Irregular \u2014 cyclical variation', 'Irregularly irregular \u2014 completely chaotic R-R intervals', 'Regularly irregular (grouped pattern)'], correct: 2, explanation: 'The rhythm is irregularly irregular \u2014 there is no pattern or predictability to the R-R intervals whatsoever. This is the single most important diagnostic clue for atrial fibrillation. If it\'s irregularly irregular, think AF until proven otherwise.' },
            { letter: 'O', label: 'Origin', question: 'Where is this rhythm most likely originating from?', options: ['SA node (sinus)', 'Multiple disorganised atrial foci', 'Single atrial re-entry circuit', 'AV junction'], correct: 1, explanation: 'No organised P waves are visible \u2014 the baseline is fibrillatory with chaotic, disorganised atrial activity from multiple competing foci. This is the hallmark of atrial fibrillation.' },
            { letter: 'I', label: 'Intervals', question: 'What do the intervals (PR, QRS, QTc) show?', options: ['Regular R-R intervals, normal PR', 'Irregular R-R intervals, no measurable PR, narrow QRS', 'Irregular R-R intervals, wide QRS', 'Regular R-R intervals, prolonged PR'], correct: 1, explanation: 'R-R intervals are irregularly irregular \u2014 this is a key diagnostic feature. No PR interval can be measured because there are no P waves. QRS complexes are usually narrow (unless aberrant conduction or bundle branch block is present).' },
            { letter: 'S', label: 'STEMI', question: 'What do the ST segments show?', options: ['No acute ST changes', 'ST elevation in contiguous leads', 'ST depression from fast rate', 'ST elevation with reciprocal changes'], correct: 0, explanation: 'No acute ST changes in this trace. Remember: AF can co-exist with STEMI, so always assess the ST segments even when you have already identified the rhythm as AF.' }
        ]
    },

    atrialFlutter: {
        roisRate: 150,
        steps: [
            { letter: 'R', label: 'Rate', question: 'What is the approximate ventricular rate?', options: ['Approximately 75 bpm', 'Approximately 100 bpm', 'Approximately 150 bpm', 'Approximately 300 bpm'], correct: 2, explanation: 'The ventricular rate is approximately 150 bpm. A ventricular rate of exactly 150 should always make you think of atrial flutter with 2:1 block (atrial rate ~300, conducted 2:1 = ~150). This is a classic exam pearl.' },
            { letter: 'R', label: 'Rhythm', question: 'How would you describe the rhythm regularity?', options: ['Regular', 'Irregularly irregular', 'Regularly irregular \u2014 depending on conduction ratio', 'Completely chaotic'], correct: 0, explanation: 'With a fixed conduction ratio (e.g., 2:1 block), atrial flutter produces a regular ventricular rhythm. If the conduction ratio varies (2:1 then 3:1 then 4:1), it becomes regularly irregular. In this trace with consistent 2:1 conduction, the rhythm is regular.' },
            { letter: 'O', label: 'Origin', question: 'Where is this rhythm most likely originating from?', options: ['SA node (sinus)', 'Single atrial re-entry circuit', 'Multiple disorganised atrial foci', 'AV junction'], correct: 1, explanation: 'Atrial flutter is caused by a single organised re-entry circuit in the atrium, producing the characteristic sawtooth flutter waves at ~300 bpm. This is distinct from AF, which has multiple chaotic foci.' },
            { letter: 'I', label: 'Intervals', question: 'What do the intervals (PR, QRS, QTc) show?', options: ['Normal PR and narrow QRS', 'Sawtooth flutter waves replacing P waves, narrow QRS', 'No P waves with wide QRS', 'Prolonged PR with narrow QRS'], correct: 1, explanation: 'The classic sawtooth flutter waves replace normal P waves. The QRS is usually narrow. The AV node acts as a gatekeeper \u2014 typically conducting every 2nd, 3rd, or 4th flutter wave (2:1, 3:1, 4:1 block).' },
            { letter: 'S', label: 'STEMI', question: 'What do the ST segments show?', options: ['No acute ST changes', 'ST elevation \u2014 but hard to assess with flutter waves', 'Definite ST elevation with reciprocal changes', 'ST depression in all leads'], correct: 0, explanation: 'No acute ST changes, though flutter waves can make ST segment assessment difficult. If you suspect ACS in a patient with atrial flutter, a cardiology opinion is advisable.' }
        ]
    },

    svt: {
        roisRate: 180,
        steps: [
            { letter: 'R', label: 'Rate', question: 'What is the approximate ventricular rate?', options: ['60\u2013100 bpm', '100\u2013150 bpm', '150\u2013250 bpm', 'Greater than 300 bpm'], correct: 2, explanation: 'The rate is approximately 180 bpm \u2014 within the typical SVT range of 150\u2013250 bpm. SVT is characterised by sudden onset and offset, which distinguishes it from sinus tachycardia that increases gradually.' },
            { letter: 'R', label: 'Rhythm', question: 'How would you describe the rhythm regularity?', options: ['Regular', 'Irregular', 'Irregularly irregular', 'Regularly irregular (grouped pattern)'], correct: 0, explanation: 'SVT is characteristically regular \u2014 the R-R intervals are metronomically consistent. This regularity at a fast rate is a key feature. If a fast narrow-complex rhythm is irregular, consider AF with fast ventricular response instead.' },
            { letter: 'O', label: 'Origin', question: 'Where is this rhythm most likely originating from?', options: ['SA node (sinus tachycardia)', 'Supraventricular re-entry circuit', 'Ventricles', 'Atrial flutter with 2:1 block'], correct: 1, explanation: 'SVT typically involves a re-entry circuit above the ventricles (most commonly AVNRT or AVRT). P waves are usually hidden within or just after the QRS complex and are not visible.' },
            { letter: 'I', label: 'Intervals', question: 'What do the intervals (PR, QRS, QTc) show?', options: ['Narrow QRS, no visible P waves or PR interval', 'Wide QRS (>0.12s) with no P waves', 'Narrow QRS with short PR and delta wave', 'Normal PR with narrow QRS'], correct: 0, explanation: 'The QRS is narrow (<0.12s), confirming supraventricular origin. P waves are not visible (hidden in the QRS or T wave). No PR interval can be measured. A narrow complex tachycardia at this rate = SVT until proven otherwise.' },
            { letter: 'S', label: 'STEMI', question: 'What do the ST segments show?', options: ['No acute ST changes', 'ST depression (rate-related, not ischaemic)', 'ST elevation suggesting STEMI', 'Cannot assess at this rate'], correct: 0, explanation: 'No acute ST elevation. SVT can cause rate-related ST depression, which typically resolves when the rhythm converts. Always reassess the ECG after rhythm control.' }
        ]
    },

    ventricularTachycardia: {
        roisRate: 180,
        steps: [
            { letter: 'R', label: 'Rate', question: 'What is the approximate ventricular rate?', options: ['Less than 60 bpm', '60\u2013100 bpm', '100\u2013150 bpm', '150\u2013250 bpm'], correct: 3, explanation: 'The rate is approximately 180 bpm. VT typically runs at 100\u2013250 bpm. The combination of a fast rate with the wide QRS morphology should immediately raise concern for VT.' },
            { letter: 'R', label: 'Rhythm', question: 'How would you describe the rhythm regularity?', options: ['Regular', 'Irregular', 'Irregularly irregular', 'Regularly irregular (grouped pattern)'], correct: 0, explanation: 'Monomorphic VT is typically regular \u2014 the R-R intervals are consistent because a single ventricular focus is firing repeatedly. A regular wide-complex tachycardia should be treated as VT until proven otherwise.' },
            { letter: 'O', label: 'Origin', question: 'Where is this rhythm most likely originating from?', options: ['SA node (sinus)', 'Supraventricular with aberrant conduction', 'Ventricles', 'AV junction'], correct: 2, explanation: 'The wide, bizarre QRS morphology indicates ventricular origin. The electrical impulse originates in the ventricular myocardium and conducts abnormally, producing the characteristic broad complex pattern. Always treat a broad complex tachycardia as VT until proven otherwise.' },
            { letter: 'I', label: 'Intervals', question: 'What do the intervals (PR, QRS, QTc) show?', options: ['Narrow QRS with normal PR', 'Wide QRS (>0.12s), no discernible P waves', 'Wide QRS with short PR and delta wave', 'Progressive PR prolongation'], correct: 1, explanation: 'The QRS is wide (>0.12s) \u2014 this is the defining feature. No P waves are visible. AV dissociation may be present (P waves marching through at their own rate, independently of the QRS). QTc cannot be meaningfully assessed.' },
            { letter: 'S', label: 'STEMI', question: 'What do the ST segments show?', options: ['No acute ST changes', 'ST-T changes present but secondary to wide QRS', 'Clear ST elevation with reciprocal changes', 'Cannot reliably assess ST segments'], correct: 3, explanation: 'ST segments cannot be reliably assessed in VT because the wide QRS causes secondary ST-T changes. \u26a0\ufe0f CRITICAL: Always check for a pulse. Pulseless VT is a cardiac arrest rhythm requiring immediate defibrillation.' }
        ]
    },

    torsadesDePointes: {
        roisRate: 200,
        steps: [
            { letter: 'R', label: 'Rate', question: 'What is the approximate ventricular rate?', options: ['60\u2013100 bpm', '100\u2013150 bpm', '150\u2013250 bpm', 'Greater than 250 bpm'], correct: 2, explanation: 'The rate is very fast, typically 150\u2013300 bpm. The undulating amplitude makes it harder to count individual complexes, but this is clearly a rapid ventricular rhythm.' },
            { letter: 'R', label: 'Rhythm', question: 'How would you describe the rhythm regularity?', options: ['Regular with constant amplitude', 'Regular rate but with undulating, varying amplitude', 'Irregularly irregular', 'Regularly irregular (grouped pattern)'], correct: 1, explanation: 'The rate is relatively regular, but the amplitude of the QRS complexes waxes and wanes in a characteristic spindle-shaped pattern \u2014 this "twisting of the points" is the hallmark of Torsades de Pointes and distinguishes it from monomorphic VT.' },
            { letter: 'O', label: 'Origin', question: 'Where is this rhythm most likely originating from?', options: ['Supraventricular with aberrant conduction', 'Ventricles \u2014 monomorphic (single focus)', 'Ventricles \u2014 polymorphic (rotating axis)', 'Atrial flutter with variable block'], correct: 2, explanation: 'This is a polymorphic ventricular tachycardia \u2014 the QRS axis rotates, creating the characteristic "twisting of the points" (Torsades de Pointes). The changing amplitude is the key visual feature.' },
            { letter: 'I', label: 'Intervals', question: 'What do the intervals (PR, QRS, QTc) show?', options: ['Narrow QRS with normal intervals', 'Wide QRS with progressively changing axis and amplitude', 'Wide QRS with constant morphology', 'Irregular narrow QRS with no P waves'], correct: 1, explanation: 'Wide QRS complexes with a continuously changing axis \u2014 the amplitude waxes and wanes in a spindle-shaped pattern. This is associated with a prolonged QT interval (check the preceding rhythm if available). Key point: treat with IV MAGNESIUM, not amiodarone.' },
            { letter: 'S', label: 'STEMI', question: 'What do the ST segments show?', options: ['No acute ST changes', 'ST elevation visible between complexes', 'Cannot assess \u2014 rhythm is too chaotic', 'ST depression throughout'], correct: 2, explanation: 'ST segments cannot be assessed during Torsades \u2014 the chaotic wide complexes obscure the baseline. The priority is treating the rhythm itself: IV Magnesium 2g, correct underlying cause (usually prolonged QT from drugs or electrolyte imbalance).' }
        ]
    },

    firstDegreeBlock: {
        roisRate: 70,
        steps: [
            { letter: 'R', label: 'Rate', question: 'What is the approximate ventricular rate?', options: ['Less than 60 bpm', '60\u2013100 bpm', '100\u2013150 bpm', 'Greater than 150 bpm'], correct: 1, explanation: 'The rate is within the normal range. First degree heart block often has a normal rate \u2014 the abnormality is in the conduction delay, not the rate itself.' },
            { letter: 'R', label: 'Rhythm', question: 'How would you describe the rhythm regularity?', options: ['Regular', 'Irregular', 'Irregularly irregular', 'Regularly irregular (grouped pattern)'], correct: 0, explanation: 'The rhythm is regular \u2014 every P wave is conducted, so the R-R intervals remain consistent. This helps distinguish first degree block from second degree blocks where beats are dropped.' },
            { letter: 'O', label: 'Origin', question: 'Where is this rhythm most likely originating from?', options: ['SA node (sinus) with delayed AV conduction', 'AV junction', 'Atrial ectopic focus', 'Ventricles'], correct: 0, explanation: 'P waves are present before every QRS \u2014 this is sinus origin. The rhythm starts normally at the SA node but there is a delay in conduction through the AV node.' },
            { letter: 'I', label: 'Intervals', question: 'What do the intervals (PR, QRS, QTc) show?', options: ['All intervals normal', 'Prolonged PR interval (>0.20s) with narrow QRS', 'Shortened PR interval (<0.12s) with delta wave', 'Variable PR intervals with dropped beats'], correct: 1, explanation: 'The PR interval is prolonged beyond 0.20 seconds \u2014 this is the defining feature of first degree heart block. The QRS remains narrow because ventricular conduction is normal. Every P wave is still conducted (1:1 relationship).' },
            { letter: 'S', label: 'STEMI', question: 'What do the ST segments show?', options: ['No acute ST changes', 'ST elevation in inferior leads', 'ST depression in lateral leads', 'ST elevation with reciprocal changes'], correct: 0, explanation: 'No acute ST changes. First degree block is usually benign in isolation, but can be seen with inferior MI, digoxin use, or increased vagal tone. Always consider the clinical context.' }
        ]
    },

    secondDegreeMobitz1: {
        roisRate: 60,
        steps: [
            { letter: 'R', label: 'Rate', question: 'What is the approximate ventricular rate?', options: ['Less than 60 bpm', '60\u2013100 bpm', '100\u2013150 bpm', 'Cannot determine \u2014 too irregular'], correct: 0, explanation: 'The ventricular rate tends to be slow due to the regularly dropped beats. The grouped beating pattern (several conducted beats then a pause) is characteristic of Wenckebach.' },
            { letter: 'R', label: 'Rhythm', question: 'How would you describe the rhythm regularity?', options: ['Regular', 'Irregularly irregular \u2014 completely chaotic', 'Regularly irregular \u2014 repeating group pattern with pauses', 'Irregular \u2014 cyclical variation with breathing'], correct: 2, explanation: 'The rhythm is regularly irregular \u2014 there is a repeating pattern of grouped beats followed by a pause (the dropped QRS). This "grouped beating" pattern is the hallmark of Wenckebach (Mobitz Type I). The pattern repeats predictably: several beats, then a pause, then the cycle restarts.' },
            { letter: 'O', label: 'Origin', question: 'Where is this rhythm most likely originating from?', options: ['SA node with progressively delayed AV conduction', 'AV junction', 'SA node with complete AV block', 'Multiple atrial foci'], correct: 0, explanation: 'The P waves are sinus in origin \u2014 the SA node is firing normally. The problem is at the AV node, which progressively delays each beat more and more until one P wave fails to conduct at all, then the cycle restarts.' },
            { letter: 'I', label: 'Intervals', question: 'What do the intervals (PR, QRS, QTc) show?', options: ['Constant PR with sudden dropped QRS', 'Progressively prolonging PR until a QRS is dropped', 'No relationship between P waves and QRS complexes', 'Shortened PR with delta wave'], correct: 1, explanation: 'The PR interval gets progressively longer with each beat until a P wave is not conducted (dropped QRS), creating a pause. Then the cycle restarts with a shorter PR. This progressive prolongation pattern is called Wenckebach. QRS is usually narrow.' },
            { letter: 'S', label: 'STEMI', question: 'What do the ST segments show?', options: ['No acute ST changes', 'ST elevation in contiguous leads', 'ST depression suggesting ischaemia', 'ST elevation with reciprocal changes'], correct: 0, explanation: 'No acute ST changes. Mobitz Type I (Wenckebach) is usually at the level of the AV node and is often benign. It can occur in athletes, during sleep, or with increased vagal tone. It rarely progresses to complete heart block.' }
        ]
    },

    secondDegreeMobitz2: {
        roisRate: 50,
        steps: [
            { letter: 'R', label: 'Rate', question: 'What is the approximate ventricular rate?', options: ['Less than 60 bpm', '60\u2013100 bpm', '100\u2013150 bpm', 'Greater than 150 bpm'], correct: 0, explanation: 'The ventricular rate is slow because some P waves are simply not conducted. Unlike Mobitz I, the dropped beats occur suddenly without warning, which is why this rhythm is more dangerous.' },
            { letter: 'R', label: 'Rhythm', question: 'How would you describe the rhythm regularity?', options: ['Regular', 'Irregularly irregular \u2014 completely chaotic', 'Regularly irregular \u2014 regular rhythm interrupted by sudden pauses', 'Irregular \u2014 cyclical variation with breathing'], correct: 2, explanation: 'The rhythm is regularly irregular \u2014 the conducted beats are at regular intervals, but sudden pauses occur when a QRS is dropped. Unlike Wenckebach, there is no gradual build-up before the dropped beat \u2014 it happens without warning, which makes this rhythm more unpredictable and dangerous.' },
            { letter: 'O', label: 'Origin', question: 'Where is this rhythm most likely originating from?', options: ['SA node with intermittent conduction failure below the AV node', 'SA node with progressive AV delay (Wenckebach)', 'AV junction', 'Ventricles independently'], correct: 0, explanation: 'The SA node is firing normally (regular P waves at a normal rate), but the block is below the AV node \u2014 in the bundle of His or bundle branches. This means some P waves simply fail to conduct without any prior warning.' },
            { letter: 'I', label: 'Intervals', question: 'What do the intervals (PR, QRS, QTc) show?', options: ['Progressively prolonging PR until a beat drops', 'Constant PR interval with sudden dropped QRS complexes', 'No relationship between P waves and QRS', 'All intervals normal'], correct: 1, explanation: 'The PR interval remains constant for all conducted beats \u2014 then suddenly a QRS is dropped with no prior prolongation. The QRS may be wide (suggesting the block is in the bundle branches). This is the key distinction from Mobitz I: constant PR with sudden dropped beats = Mobitz II.' },
            { letter: 'S', label: 'STEMI', question: 'What do the ST segments show?', options: ['No acute ST changes', 'ST elevation in inferior leads', 'ST depression suggesting ischaemia', 'ST elevation with reciprocal changes'], correct: 0, explanation: 'No acute ST changes in this trace. \u26a0\ufe0f Important: Mobitz Type II is dangerous \u2014 it carries a significant risk of progressing to complete heart block without warning. This patient may need transcutaneous pacing. Prepare for deterioration.' }
        ]
    },

    thirdDegreeBlock: {
        roisRate: 35,
        steps: [
            { letter: 'R', label: 'Rate', question: 'What is the approximate ventricular rate?', options: ['Less than 60 bpm', '60\u2013100 bpm', '100\u2013150 bpm', 'Greater than 150 bpm'], correct: 0, explanation: 'The ventricular rate is very slow (typically 20\u201350 bpm) because the ventricles are being driven by an escape rhythm, not by the SA node.' },
            { letter: 'R', label: 'Rhythm', question: 'How would you describe the rhythm regularity?', options: ['Regular \u2014 both atrial and ventricular rates are independently regular', 'Irregularly irregular', 'Regularly irregular (grouped pattern)', 'Irregular \u2014 random R-R intervals'], correct: 0, explanation: 'Both the atrial rhythm (P waves) and the ventricular rhythm (QRS) are independently regular \u2014 but at different rates. The P waves march through at their own rate (usually ~70 bpm), while the QRS complexes appear at the escape rate (~30-50 bpm). Each is regular, but they are not related to each other.' },
            { letter: 'O', label: 'Origin', question: 'Where is this rhythm most likely originating from?', options: ['SA node with normal conduction', 'SA node firing normally but completely disconnected from ventricles', 'Ventricles only (no atrial activity)', 'AV junction with normal conduction'], correct: 1, explanation: 'The SA node fires normally (you can see regular P waves at their own rate), but there is COMPLETE AV dissociation \u2014 none of the atrial impulses reach the ventricles. The ventricles are driven by an independent escape pacemaker (junctional or ventricular).' },
            { letter: 'I', label: 'Intervals', question: 'What do the intervals (PR, QRS, QTc) show?', options: ['Normal PR with narrow QRS', 'Prolonged but constant PR interval', 'No consistent relationship between P waves and QRS complexes', 'Progressively prolonging PR interval'], correct: 2, explanation: 'There is NO consistent relationship between P waves and QRS complexes \u2014 the PR interval varies randomly because the atria and ventricles are beating completely independently. The QRS may be narrow (junctional escape) or wide (ventricular escape).' },
            { letter: 'S', label: 'STEMI', question: 'What do the ST segments show?', options: ['No acute ST changes', 'ST elevation \u2014 consider inferior STEMI as a cause', 'ST depression throughout', 'ST elevation with reciprocal changes'], correct: 0, explanation: 'No acute ST changes in this trace, though complete heart block can be caused by inferior STEMI. \u26a0\ufe0f This is a time-critical rhythm. Consider: atropine (may not work in infranodal block), transcutaneous pacing, and urgent cardiology referral.' }
        ]
    },

    junctionalRhythm: {
        roisRate: 50,
        steps: [
            { letter: 'R', label: 'Rate', question: 'What is the approximate ventricular rate?', options: ['Less than 40 bpm', '40\u201360 bpm', '60\u2013100 bpm', '100\u2013150 bpm'], correct: 1, explanation: 'The rate is 40\u201360 bpm, which is the intrinsic rate of the AV junction. The AV junction takes over as pacemaker when the SA node fails to fire or when the rate falls below the junctional escape rate.' },
            { letter: 'R', label: 'Rhythm', question: 'How would you describe the rhythm regularity?', options: ['Regular', 'Irregular', 'Irregularly irregular', 'Regularly irregular (grouped pattern)'], correct: 0, explanation: 'Junctional rhythm is regular \u2014 the AV junction fires at a steady rate, producing consistent R-R intervals. This regularity combined with the narrow QRS helps identify it as a junctional rather than ventricular escape.' },
            { letter: 'O', label: 'Origin', question: 'Where is this rhythm most likely originating from?', options: ['SA node (sinus)', 'AV junction', 'Ventricles', 'Multiple atrial foci'], correct: 1, explanation: 'The AV junction is the origin \u2014 you may see inverted P waves before, during (hidden), or after the QRS complex due to retrograde atrial conduction. The narrow QRS confirms the impulse enters the ventricles via the normal conduction pathway.' },
            { letter: 'I', label: 'Intervals', question: 'What do the intervals (PR, QRS, QTc) show?', options: ['Normal upright P waves with normal PR', 'Absent or inverted P waves, narrow QRS', 'Wide QRS with no P waves', 'Prolonged PR with narrow QRS'], correct: 1, explanation: 'P waves are absent or inverted (retrograde). If present before the QRS, the PR interval is very short (<0.12s). The QRS is narrow because ventricular conduction proceeds normally via the His-Purkinje system.' },
            { letter: 'S', label: 'STEMI', question: 'What do the ST segments show?', options: ['No acute ST changes', 'ST elevation in contiguous leads', 'ST depression from slow rate', 'ST elevation with reciprocal changes'], correct: 0, explanation: 'No acute ST changes. Junctional rhythm can be seen in athletes, with digoxin toxicity, after cardiac surgery, or with inferior MI. Clinical context is key.' }
        ]
    },

    wpw: {
        roisRate: 80,
        steps: [
            { letter: 'R', label: 'Rate', question: 'What is the approximate ventricular rate?', options: ['Less than 60 bpm', '60\u2013100 bpm', '100\u2013150 bpm', 'Greater than 150 bpm'], correct: 1, explanation: 'The rate may be normal in WPW at rest. The danger comes during tachyarrhythmias (especially AF) where the accessory pathway can conduct very rapidly, potentially causing VF.' },
            { letter: 'R', label: 'Rhythm', question: 'How would you describe the rhythm regularity?', options: ['Regular', 'Irregular', 'Irregularly irregular', 'Regularly irregular (grouped pattern)'], correct: 0, explanation: 'At rest, WPW produces a regular rhythm \u2014 the underlying sinus rhythm is conducted normally (just via two pathways). The regularity helps identify this as a baseline WPW pattern rather than WPW complicated by an arrhythmia.' },
            { letter: 'O', label: 'Origin', question: 'Where is this rhythm most likely originating from?', options: ['SA node (sinus) with an accessory conduction pathway', 'AV junction', 'Ventricles', 'Multiple atrial foci'], correct: 0, explanation: 'The rhythm is sinus in origin, but an accessory pathway (Bundle of Kent) conducts the impulse to the ventricles faster than the AV node, causing pre-excitation. The ventricles start depolarising early via this shortcut \u2014 producing the delta wave.' },
            { letter: 'I', label: 'Intervals', question: 'What do the intervals (PR, QRS, QTc) show?', options: ['All intervals normal', 'Prolonged PR interval with narrow QRS', 'Short PR interval (<0.12s) with delta wave and wide QRS', 'Absent P waves with wide QRS'], correct: 2, explanation: 'The classic WPW triad: (1) Short PR interval (<0.12s) because the accessory pathway bypasses the AV node delay, (2) Delta wave \u2014 a slurred upstroke at the start of the QRS, (3) Wide QRS because of early ventricular activation via the abnormal pathway.' },
            { letter: 'S', label: 'STEMI', question: 'What do the ST segments show?', options: ['No acute ST changes', 'ST-T changes secondary to pre-excitation (not ischaemic)', 'ST elevation suggesting STEMI', 'ST depression in lateral leads'], correct: 1, explanation: 'WPW can cause secondary ST-T wave changes that mimic ischaemia \u2014 these are due to the abnormal depolarisation, NOT acute coronary syndrome. \u26a0\ufe0f Critical: In AF with WPW, AVOID adenosine, verapamil, and digoxin \u2014 these can accelerate accessory pathway conduction and cause VF.' }
        ]
    },

    pvcs: {
        roisRate: 72,
        steps: [
            { letter: 'R', label: 'Rate', question: 'What is the approximate underlying ventricular rate?', options: ['Less than 60 bpm', '60\u2013100 bpm', '100\u2013150 bpm', 'Cannot determine \u2014 rhythm too irregular'], correct: 1, explanation: 'The underlying sinus rate is within the normal range. The irregular beats you see are premature ventricular complexes (PVCs) \u2014 early, extra beats arising from the ventricles that interrupt the normal sinus rhythm.' },
            { letter: 'R', label: 'Rhythm', question: 'How would you describe the rhythm regularity?', options: ['Regular', 'Irregular \u2014 regular underlying rhythm interrupted by early wide beats', 'Irregularly irregular \u2014 completely chaotic', 'Regularly irregular (grouped pattern)'], correct: 1, explanation: 'The rhythm is irregular because the underlying regular sinus rhythm is interrupted by premature beats. The PVCs occur earlier than expected, followed by a compensatory pause, then the normal rhythm resumes.' },
            { letter: 'O', label: 'Origin', question: 'Where are the abnormal beats originating from?', options: ['SA node (sinus) \u2014 all beats', 'Predominantly sinus with ventricular ectopic beats', 'AV junction', 'Multiple atrial foci'], correct: 1, explanation: 'The underlying rhythm is sinus (normal P waves and narrow QRS), but the wide, bizarre extra beats originate from the ventricles. PVCs have no preceding P wave and are followed by a compensatory pause.' },
            { letter: 'I', label: 'Intervals', question: 'What do the intervals show for the abnormal beats?', options: ['Early narrow QRS with different P wave shape', 'Early wide QRS (>0.12s) with no preceding P wave and compensatory pause', 'Progressive PR prolongation before dropped beat', 'Regular wide QRS throughout'], correct: 1, explanation: 'The PVC has a wide, bizarre QRS morphology (>0.12s) with no preceding P wave. It\'s followed by a compensatory pause as the heart resets. The normal beats between PVCs have normal intervals. Isolated PVCs are usually benign.' },
            { letter: 'S', label: 'STEMI', question: 'What do the ST segments show?', options: ['No acute ST changes on the sinus beats', 'ST elevation in contiguous leads', 'ST depression on all beats', 'ST changes on PVCs only (secondary)'], correct: 0, explanation: 'No acute ST changes on the normal sinus beats. PVCs themselves will show ST-T changes secondary to the abnormal depolarisation \u2014 this is expected and not a sign of ischaemia. Assess ST segments on the sinus beats only.' }
        ]
    },

    pacs: {
        roisRate: 75,
        steps: [
            { letter: 'R', label: 'Rate', question: 'What is the approximate underlying ventricular rate?', options: ['Less than 60 bpm', '60\u2013100 bpm', '100\u2013150 bpm', 'Greater than 150 bpm'], correct: 1, explanation: 'The underlying rate is normal. The rhythm is mostly regular but interrupted by occasional early beats \u2014 these are premature atrial complexes (PACs) arriving earlier than expected.' },
            { letter: 'R', label: 'Rhythm', question: 'How would you describe the rhythm regularity?', options: ['Regular', 'Irregular \u2014 regular underlying rhythm interrupted by early beats', 'Irregularly irregular \u2014 completely chaotic', 'Regularly irregular (grouped pattern)'], correct: 1, explanation: 'The rhythm is irregular because the underlying sinus rhythm is interrupted by premature atrial beats that arrive early. Unlike PVCs, the early beats in PACs are narrow complex. The underlying sinus rhythm is regular between the ectopics.' },
            { letter: 'O', label: 'Origin', question: 'Where are the abnormal beats originating from?', options: ['SA node \u2014 all beats are sinus', 'Predominantly sinus with atrial ectopic beats', 'Predominantly sinus with ventricular ectopic beats', 'AV junction'], correct: 1, explanation: 'The underlying rhythm is sinus, but the early beats have a P wave with a different shape to the normal sinus P waves \u2014 indicating they arise from an ectopic atrial focus, not the SA node.' },
            { letter: 'I', label: 'Intervals', question: 'What do the intervals show for the abnormal beats?', options: ['Early P wave (different morphology) followed by narrow QRS', 'Early wide QRS with no P wave', 'Progressive PR prolongation', 'Short PR with delta wave'], correct: 0, explanation: 'PACs show an early P wave that looks different from the sinus P waves, usually followed by a narrow QRS (because ventricular conduction is normal). There is typically an incomplete compensatory pause. PACs are common and usually benign.' },
            { letter: 'S', label: 'STEMI', question: 'What do the ST segments show?', options: ['No acute ST changes', 'ST elevation in contiguous leads', 'ST depression on PAC beats', 'ST elevation with reciprocal changes'], correct: 0, explanation: 'No acute ST changes. PACs are very common and usually require no treatment. Frequent PACs can occasionally trigger sustained arrhythmias like AF or SVT in some patients.' }
        ]
    },

    hyperkalaemia: {
        roisRate: 65,
        steps: [
            { letter: 'R', label: 'Rate', question: 'What is the approximate ventricular rate?', options: ['Less than 60 bpm', '60\u2013100 bpm', '100\u2013150 bpm', 'Greater than 150 bpm'], correct: 1, explanation: 'The rate may be normal or bradycardic depending on the severity of hyperkalaemia. As potassium rises further, the rate typically slows.' },
            { letter: 'R', label: 'Rhythm', question: 'How would you describe the rhythm regularity?', options: ['Regular', 'Irregular', 'Irregularly irregular', 'Regularly irregular (grouped pattern)'], correct: 0, explanation: 'In early-to-moderate hyperkalaemia, the rhythm is typically still regular \u2014 the conduction system is impaired but still functioning. As potassium rises further, the rhythm may become irregular or deteriorate into a sine wave pattern before arrest.' },
            { letter: 'O', label: 'Origin', question: 'Where is this rhythm most likely originating from?', options: ['SA node (sinus) but with impaired conduction', 'AV junction', 'Ventricles', 'Cannot determine \u2014 P waves are flattened or absent'], correct: 0, explanation: 'Initially sinus, but high potassium progressively affects the myocardium: P waves flatten and may disappear, the QRS widens, and eventually a sine wave pattern develops.' },
            { letter: 'I', label: 'Intervals', question: 'What do the intervals (PR, QRS, QTc) show?', options: ['All intervals normal', 'Prolonged PR and narrow QRS', 'Widened QRS with tall peaked T waves', 'Shortened PR with delta wave'], correct: 2, explanation: 'The classic progression of hyperkalaemia: tall, peaked T waves \u2192 flattened P waves \u2192 widened QRS \u2192 sine wave pattern \u2192 cardiac arrest. The widened QRS and peaked T waves are the key warning signs that demand urgent treatment.' },
            { letter: 'S', label: 'STEMI', question: 'What do the ST segments show?', options: ['No acute ST changes \u2014 but T wave morphology is grossly abnormal', 'ST elevation mimicking STEMI', 'ST depression throughout', 'Normal ST segments and T waves'], correct: 0, explanation: 'The ST segments themselves may not show classic STEMI changes, but the tall, peaked T waves are dramatically abnormal. \u26a0\ufe0f This is a medical emergency: treat with IV calcium (cardioprotection), nebulised salbutamol, insulin/dextrose, and address the underlying cause.' }
        ]
    },

    stemi: {
        roisRate: 85,
        steps: [
            { letter: 'R', label: 'Rate', question: 'What is the approximate ventricular rate?', options: ['Less than 60 bpm', '60\u2013100 bpm', '100\u2013150 bpm', 'Greater than 150 bpm'], correct: 1, explanation: 'The rate may be entirely normal in STEMI \u2014 do not be reassured by a normal rate. This is exactly why ROIS works: you must complete all five steps systematically.' },
            { letter: 'R', label: 'Rhythm', question: 'How would you describe the rhythm regularity?', options: ['Regular', 'Irregular', 'Irregularly irregular', 'Regularly irregular (grouped pattern)'], correct: 0, explanation: 'The rhythm is regular \u2014 normal sinus rhythm. Combined with the normal rate, the first two ROIS steps may seem entirely unremarkable. This is why systematic assessment is critical \u2014 the life-threatening finding here is in the final step.' },
            { letter: 'O', label: 'Origin', question: 'Where is this rhythm most likely originating from?', options: ['SA node (sinus)', 'AV junction', 'Ventricles', 'Atrial ectopic focus'], correct: 0, explanation: 'The underlying rhythm is sinus \u2014 P waves are present before each QRS. The critical finding in this ECG is NOT the rhythm origin. Keep going with your ROIS assessment.' },
            { letter: 'I', label: 'Intervals', question: 'What do the intervals (PR, QRS, QTc) show?', options: ['All intervals normal', 'Prolonged PR interval', 'Widened QRS complex', 'Short PR with delta wave'], correct: 0, explanation: 'Intervals may be completely normal in acute STEMI. Normal R, normal O, normal I \u2014 but the critical finding is waiting at the final step. This is why you must ALWAYS complete all ROIS steps.' },
            { letter: 'S', label: 'STEMI', question: 'What do the ST segments show?', options: ['No acute ST changes', 'ST depression only', 'ST elevation in contiguous leads with reciprocal changes', 'Non-specific T wave changes'], correct: 2, explanation: '\ud83d\udea8 ST elevation in 2 or more contiguous leads with reciprocal ST depression \u2014 this is a STEMI. TIME IS MUSCLE. Activate the cath lab immediately. Aspirin 300mg, GTN if appropriate, morphine for pain, and rapid transport. Every minute of delay costs myocardium.' }
        ]
    },

    longQT: {
        roisRate: 70,
        steps: [
            { letter: 'R', label: 'Rate', question: 'What is the approximate ventricular rate?', options: ['Less than 60 bpm', '60\u2013100 bpm', '100\u2013150 bpm', 'Greater than 150 bpm'], correct: 1, explanation: 'The rate is within the normal range. Long QT syndrome often presents with a normal rate \u2014 the danger is the prolonged repolarisation period, which creates a vulnerable window for Torsades de Pointes.' },
            { letter: 'R', label: 'Rhythm', question: 'How would you describe the rhythm regularity?', options: ['Regular', 'Irregular', 'Irregularly irregular', 'Regularly irregular (grouped pattern)'], correct: 0, explanation: 'The rhythm is regular \u2014 Long QT itself does not cause an irregular rhythm. The danger is that the prolonged QT creates a vulnerable period where a premature beat could trigger Torsades de Pointes. A regular rhythm with suspicious T-wave morphology should prompt you to measure the QT interval.' },
            { letter: 'O', label: 'Origin', question: 'Where is this rhythm most likely originating from?', options: ['SA node (sinus)', 'AV junction', 'Ventricles', 'Atrial ectopic focus'], correct: 0, explanation: 'The rhythm is sinus \u2014 P waves are present and normal. The problem in Long QT is not the rhythm origin but the prolonged ventricular repolarisation, which you will identify in the Intervals step.' },
            { letter: 'I', label: 'Intervals', question: 'What do the intervals (PR, QRS, QTc) show?', options: ['All intervals normal', 'Prolonged PR interval with normal QTc', 'Normal PR and QRS but prolonged QTc interval', 'Shortened PR with delta wave'], correct: 2, explanation: 'The QTc interval is prolonged (>0.45s in men, >0.47s in women). The PR and QRS are normal. The T wave may appear broad, notched, or bifid. This prolongation increases the risk of Torsades de Pointes. Causes include congenital syndromes and drugs (amiodarone, ondansetron, certain antibiotics).' },
            { letter: 'S', label: 'STEMI', question: 'What do the ST segments show?', options: ['No acute ST elevation \u2014 but T wave morphology is abnormal', 'ST elevation in contiguous leads', 'ST depression throughout', 'ST elevation with reciprocal changes'], correct: 0, explanation: 'No acute ST elevation. The T waves may appear abnormal (broad, notched) as part of the prolonged QT, but this is not STEMI. The key risk is that this patient is vulnerable to developing Torsades de Pointes. Review their medications and electrolytes.' }
        ]
    }
};

// ==================== ROIS EXCLUDED RHYTHMS ====================
const ROIS_EXCLUDED = ['ventricularFibrillation', 'asystole', 'pea'];

// ==================== ROIS STATE ====================
let roisState = {
    active: false,
    rhythms: [],
    currentRhythmIndex: 0,
    currentStep: 0,
    answered: false,
    score: {
        total: 0,
        correct: 0,
        perLetter: { R: { correct: 0, total: 0 }, O: { correct: 0, total: 0 }, I: { correct: 0, total: 0 }, S: { correct: 0, total: 0 } }
    },
    results: []
};

// ==================== ROIS FUNCTIONS ====================

function setModeROIS() {
    currentMode = 'rois';
    document.getElementById('learnModeBtn').classList.remove('active');
    document.getElementById('quizModeBtn').classList.remove('active');
    document.getElementById('roisModeBtn').classList.add('active');
    document.getElementById('learnContent').style.display = 'none';
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('quizScore').style.display = 'none';
    document.getElementById('quizFinalResults').style.display = 'none';
    document.getElementById('roisContent').style.display = 'block';
    document.getElementById('monitorHR').style.display = 'flex';
    document.getElementById('emergencyBanner').style.display = 'none';
    document.getElementById('noPulseIndicator').style.display = 'none';
    startROIS();
}

function startROIS() {
    var eligible = Object.keys(rhythms).filter(function(k) { return !ROIS_EXCLUDED.includes(k) && ROIS_DATA[k]; });
    var shuffled = eligible.slice().sort(function() { return Math.random() - 0.5; });
    roisState = {
        active: true,
        rhythms: shuffled.slice(0, 5),
        currentRhythmIndex: 0,
        currentStep: 0,
        answered: false,
        score: { total: 0, correct: 0, perLetter: { R: { correct: 0, total: 0 }, O: { correct: 0, total: 0 }, I: { correct: 0, total: 0 }, S: { correct: 0, total: 0 } } },
        results: []
    };
    document.getElementById('roisFinalResults').style.display = 'none';
    document.getElementById('roisStepArea').style.display = 'block';
    document.getElementById('roisProgressBar').style.display = 'flex';
    showROISRhythm();
}

function showROISRhythm() {
    var rhythmKey = roisState.rhythms[roisState.currentRhythmIndex];
    var roisData = ROIS_DATA[rhythmKey];
    heartRate = roisData.roisRate;
    selectedRhythm = rhythmKey;
    document.getElementById('hrValue').textContent = roisData.roisRate;
    document.getElementById('monitorHR').style.color = '#22c55e';
    updateROISProgress();
    roisState.currentStep = 0;
    roisState.results.push({ rhythmKey: rhythmKey, steps: [] });
    showROISStep();
}

function showROISStep() {
    var rhythmKey = roisState.rhythms[roisState.currentRhythmIndex];
    var roisData = ROIS_DATA[rhythmKey];
    var step = roisData.steps[roisState.currentStep];
    roisState.answered = false;
    updateROISProgress();
    updateROISLetterIndicators();
    document.getElementById('roisLetterBig').textContent = step.letter;
    document.getElementById('roisLetterLabel').textContent = step.label;
    document.getElementById('roisQuestion').textContent = step.question;
    var optionsContainer = document.getElementById('roisOptions');
    optionsContainer.innerHTML = '';
    step.options.forEach(function(option, index) {
        var btn = document.createElement('button');
        btn.className = 'rois-option-btn';
        btn.textContent = option;
        btn.onclick = function() { selectROISAnswer(index); };
        btn.id = 'rois-opt-' + index;
        optionsContainer.appendChild(btn);
    });
    document.getElementById('roisFeedback').style.display = 'none';
    document.getElementById('roisNextBtn').style.display = 'none';
}

function selectROISAnswer(selectedIndex) {
    if (roisState.answered) return;
    roisState.answered = true;
    var rhythmKey = roisState.rhythms[roisState.currentRhythmIndex];
    var roisData = ROIS_DATA[rhythmKey];
    var step = roisData.steps[roisState.currentStep];
    var isCorrect = selectedIndex === step.correct;
    roisState.score.total++;
    if (isCorrect) roisState.score.correct++;
    roisState.score.perLetter[step.letter].total++;
    if (isCorrect) roisState.score.perLetter[step.letter].correct++;
    var currentResult = roisState.results[roisState.results.length - 1];
    currentResult.steps.push({ letter: step.letter, label: step.label, correct: isCorrect, userAnswer: selectedIndex, correctAnswer: step.correct });
    var options = document.querySelectorAll('.rois-option-btn');
    options.forEach(function(btn, i) {
        btn.disabled = true;
        btn.style.pointerEvents = 'none';
        if (i === step.correct) btn.classList.add('rois-correct');
        if (i === selectedIndex && !isCorrect) btn.classList.add('rois-incorrect');
    });
    var feedback = document.getElementById('roisFeedback');
    feedback.style.display = 'block';
    feedback.className = isCorrect ? 'rois-feedback rois-feedback-correct' : 'rois-feedback rois-feedback-incorrect';
    document.getElementById('roisFeedbackIcon').textContent = isCorrect ? '\u2705' : '\u274c';
    document.getElementById('roisFeedbackText').textContent = isCorrect ? 'Correct!' : 'Incorrect';
    document.getElementById('roisFeedbackExplanation').textContent = step.explanation;
    updateROISLetterIndicators();
    var nextBtn = document.getElementById('roisNextBtn');
    nextBtn.style.display = 'block';
    var totalSteps = roisData.steps.length;
    if (roisState.currentStep < totalSteps - 1) {
        var nextStep = roisData.steps[roisState.currentStep + 1];
        nextBtn.innerHTML = 'Next: <strong>' + nextStep.letter + '</strong> \u2014 ' + nextStep.label + ' <i class="bi bi-arrow-right"></i>';
    } else if (roisState.currentRhythmIndex < roisState.rhythms.length - 1) {
        nextBtn.innerHTML = 'Reveal Rhythm <i class="bi bi-arrow-right"></i>';
    } else {
        nextBtn.innerHTML = 'Reveal Rhythm & See Results <i class="bi bi-arrow-right"></i>';
    }
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function roisNext() {
    var rhythmKey = roisState.rhythms[roisState.currentRhythmIndex];
    var roisData = ROIS_DATA[rhythmKey];
    var totalSteps = roisData.steps.length;
    if (roisState.currentStep < totalSteps - 1) {
        roisState.currentStep++;
        showROISStep();
    } else {
        showROISReveal();
    }
}

function showROISReveal() {
    var rhythmKey = roisState.rhythms[roisState.currentRhythmIndex];
    var rhythmData = rhythms[rhythmKey];
    var currentResult = roisState.results[roisState.results.length - 1];
    var stepsCorrect = currentResult.steps.filter(function(s) { return s.correct; }).length;
    var totalSteps = currentResult.steps.length;
    document.getElementById('monitorHR').style.color = rhythmData.color;
    document.getElementById('roisLetterBig').textContent = '\ud83e\udec0';
    document.getElementById('roisLetterLabel').textContent = 'Rhythm Revealed';
    document.getElementById('roisQuestion').textContent = '';
    document.getElementById('roisOptions').innerHTML = '';
    document.getElementById('roisNextBtn').style.display = 'none';
    var feedback = document.getElementById('roisFeedback');
    feedback.style.display = 'block';
    feedback.className = 'rois-feedback rois-feedback-reveal';
    document.getElementById('roisFeedbackIcon').textContent = stepsCorrect === totalSteps ? '\ud83c\udf1f' : stepsCorrect >= 4 ? '\ud83c\udfaf' : stepsCorrect >= 3 ? '\ud83d\udc4d' : '\ud83d\udcda';
    document.getElementById('roisFeedbackText').innerHTML = '<span style="color: ' + rhythmData.color + '; font-size: 1.2rem; font-weight: 700;">' + rhythmData.name + '</span>';
    document.getElementById('roisFeedbackExplanation').textContent = 'You scored ' + stepsCorrect + '/' + totalSteps + ' on this rhythm. ' + rhythmData.description;
    var nextBtn = document.getElementById('roisNextBtn');
    nextBtn.style.display = 'block';
    if (roisState.currentRhythmIndex < roisState.rhythms.length - 1) {
        nextBtn.innerHTML = 'Next Rhythm (' + (roisState.currentRhythmIndex + 2) + ' of 5) <i class="bi bi-arrow-right"></i>';
        nextBtn.onclick = function() { roisState.currentRhythmIndex++; nextBtn.onclick = roisNext; showROISRhythm(); };
    } else {
        nextBtn.innerHTML = 'See Final Results <i class="bi bi-arrow-right"></i>';
        nextBtn.onclick = function() { nextBtn.onclick = roisNext; showROISFinalResults(); };
    }
}

function showROISFinalResults() {
    document.getElementById('roisStepArea').style.display = 'none';
    document.getElementById('roisProgressBar').style.display = 'none';
    document.getElementById('roisFinalResults').style.display = 'block';
    var total = roisState.score.total;
    var correct = roisState.score.correct;
    var percent = Math.round((correct / total) * 100);
    document.getElementById('roisFinalPercent').textContent = percent + '%';
    document.getElementById('roisFinalCorrect').textContent = correct;
    document.getElementById('roisFinalTotal').textContent = total;
    var letterBreakdown = document.getElementById('roisLetterBreakdown');
    letterBreakdown.innerHTML = '';
    ['R', 'O', 'I', 'S'].forEach(function(letter) {
        var data = roisState.score.perLetter[letter];
        var letterPercent = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
        var labels = { R: 'Rate & Rhythm', O: 'Origin', I: 'Intervals', S: 'STEMI' };
        var div = document.createElement('div');
        div.className = 'rois-letter-stat';
        div.innerHTML = '<div class="rois-letter-stat-header"><span class="rois-letter-stat-letter">' + letter + '</span><span class="rois-letter-stat-label">' + labels[letter] + '</span></div><div class="rois-letter-stat-bar"><div class="rois-letter-stat-fill" style="width: ' + letterPercent + '%; background: ' + (letterPercent >= 80 ? '#22c55e' : letterPercent >= 60 ? '#f59e0b' : '#ef4444') + '"></div></div><span class="rois-letter-stat-score">' + data.correct + '/' + data.total + '</span>';
        letterBreakdown.appendChild(div);
    });
    var rhythmBreakdown = document.getElementById('roisRhythmBreakdown');
    rhythmBreakdown.innerHTML = '';
    roisState.results.forEach(function(result) {
        var rhythmData = rhythms[result.rhythmKey];
        var stepsCorrect = result.steps.filter(function(s) { return s.correct; }).length;
        var totalSteps = result.steps.length;
        var div = document.createElement('div');
        div.className = 'rois-rhythm-result';
        var dotsHtml = result.steps.map(function(s) {
            var label = s.letter === 'R' ? (s.label === 'Rate' ? 'R\u2081' : 'R\u2082') : s.letter;
            return '<span class="rois-step-dot ' + (s.correct ? 'dot-correct' : 'dot-incorrect') + '" title="' + s.letter + ' (' + s.label + '): ' + (s.correct ? 'Correct' : 'Incorrect') + '">' + label + '</span>';
        }).join('');
        div.innerHTML = '<div class="rois-rhythm-result-name" style="color: ' + rhythmData.color + '">' + rhythmData.name + '</div><div class="rois-rhythm-result-steps">' + dotsHtml + '</div><div class="rois-rhythm-result-score">' + stepsCorrect + '/' + totalSteps + '</div>';
        rhythmBreakdown.appendChild(div);
    });
    var message;
    if (percent === 100) message = '\ud83c\udf1f Perfect ROIS assessment! Outstanding systematic analysis.';
    else if (percent >= 85) message = '\ud83c\udfaf Excellent! Your systematic approach is strong.';
    else if (percent >= 70) message = '\ud83d\udc4d Good work! Review the steps you missed.';
    else if (percent >= 50) message = '\ud83d\udcda Getting there! Focus on your weakest ROIS letter.';
    else message = '\ud83d\udcaa Keep practising! Try Learn Mode to study the rhythms first.';
    document.getElementById('roisFinalMessage').textContent = message;
    var weakest = null;
    var weakestPercent = 101;
    ['R', 'O', 'I', 'S'].forEach(function(letter) {
        var data = roisState.score.perLetter[letter];
        var pct = data.total > 0 ? (data.correct / data.total) * 100 : 100;
        if (pct < weakestPercent) { weakestPercent = pct; weakest = letter; }
    });
    var weakestTip = document.getElementById('roisWeakestTip');
    if (weakest && weakestPercent < 100) {
        var labels = { R: 'Rate & Rhythm assessment', O: 'identifying rhythm Origin', I: 'Interval analysis', S: 'STEMI recognition' };
        weakestTip.style.display = 'block';
        weakestTip.innerHTML = '<i class="bi bi-lightbulb-fill"></i> <strong>Focus area:</strong> Your results suggest extra practice on <strong>' + labels[weakest] + '</strong> would help most.';
    } else { weakestTip.style.display = 'none'; }
}

function updateROISProgress() {
    document.getElementById('roisRhythmNum').textContent = roisState.currentRhythmIndex + 1;
    document.getElementById('roisStepCount').textContent = 'Step ' + (roisState.currentStep + 1) + ' of 5';
    document.getElementById('roisScoreDisplay').textContent = roisState.score.correct + '/' + roisState.score.total;
}

function updateROISLetterIndicators() {
    var letterMap = [
        { indicator: 'R', steps: [0, 1] },
        { indicator: 'O', steps: [2] },
        { indicator: 'I', steps: [3] },
        { indicator: 'S', steps: [4] }
    ];
    var currentResult = roisState.results[roisState.results.length - 1];
    letterMap.forEach(function(item) {
        var el = document.getElementById('roisIndicator' + item.indicator);
        if (!el) return;
        el.className = 'rois-letter-indicator';
        var allCompleted = item.steps.every(function(s) { return s < roisState.currentStep || (s === roisState.currentStep && roisState.answered); });
        var anyActive = item.steps.includes(roisState.currentStep) && !roisState.answered;
        var allPending = item.steps.every(function(s) { return s > roisState.currentStep; });
        if (allCompleted) {
            var allCorrect = item.steps.every(function(s) { return currentResult.steps[s] && currentResult.steps[s].correct; });
            el.classList.add(allCorrect ? 'indicator-correct' : 'indicator-incorrect');
            if (item.indicator === 'R') el.textContent = 'R';
        } else if (anyActive) {
            el.classList.add('indicator-active');
            if (item.indicator === 'R') el.textContent = roisState.currentStep === 0 ? 'R\u2081' : 'R\u2082';
        } else if (allPending) {
            el.classList.add('indicator-pending');
        } else {
            el.classList.add('indicator-active');
            if (item.indicator === 'R') el.textContent = 'R\u2082';
        }
    });
}

function restartROIS() {
    document.getElementById('roisFinalResults').style.display = 'none';
    document.querySelector('.ecg-monitor-card').classList.add('rois-sticky');
    startROIS();
}

// ==================== PATCH MODE SWITCHING ====================
function setMode(mode) {
    if (mode === 'rois') { setModeROIS(); return; }
    var roisContent = document.getElementById('roisContent');
    if (roisContent) roisContent.style.display = 'none';
    var roisBtn = document.getElementById('roisModeBtn');
    if (roisBtn) roisBtn.classList.remove('active');
    var monitor = document.querySelector('.ecg-monitor-card');
if (monitor) monitor.classList.remove('rois-sticky');
    var rIndicator = document.getElementById('roisIndicatorR');
    if (rIndicator) rIndicator.textContent = 'R';
    currentMode = mode;
    document.getElementById('learnModeBtn').classList.toggle('active', mode === 'learn');
    document.getElementById('quizModeBtn').classList.toggle('active', mode === 'quiz');
    document.getElementById('learnContent').style.display = mode === 'learn' ? 'block' : 'none';
    document.getElementById('quizContent').style.display = mode === 'quiz' ? 'block' : 'none';
    document.getElementById('quizScore').style.display = mode === 'quiz' ? 'block' : 'none';
    document.getElementById('monitorHR').style.display = mode === 'learn' ? 'flex' : (mode === 'quiz' ? 'none' : 'flex');
    if (mode === 'learn') selectRhythm(selectedRhythm || 'normalSinus');
    else if (mode === 'quiz') startQuiz();
}

/* ===== Sticky Monitor in ROIS Mode ===== */
.ecg-monitor-card.rois-sticky {
    position: sticky;
    top: 60px; /* below the navbar */
    z-index: 50;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
}

.ecg-monitor-card.rois-sticky .ecg-canvas-container {
    padding: 0.5rem;
}

.ecg-monitor-card.rois-sticky #ecgCanvas {
    height: 120px;
}