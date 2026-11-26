/* ==================== HISTORY TAKING - CONTENT ====================
 * Paramind History Taking (history-taking.html)
 * 19 presenting complaints in 7 categories, plus 3 frameworks.
 *
 * CONTENT POLICY: recognition and history taking only.
 * No drug names, doses or treatment guidance. Management = JRCALC / trust guidelines.
 *
 * Each presentation has:
 *   ask   - what to ask, with "why we ask"
 *   flags - causes not to miss
 *   feats / apart - "tell them apart" comparison
 *   pits  - pitfalls
 * GAP holds one "spot the missing question" case per presentation:
 *   [history, the missing question, asked question, asked question, explanation]
 */
(function () {
'use strict';
function mk(d) {
  return {
    name: d.name, soc: !!d.soc, tool: d.tool || "Differentials",
    ask: d.ask.map(function (a) { return { l: a[0], q: a[1], why: a[2] }; }),
    flags: d.flags.map(function (f) { return { name: f[0], text: f[1] }; }),
    feats: d.feats,
    apart: d.apart.map(function (r) { var o = { name: r[0] }; d.feats.forEach(function (f, i) { o[f[0]] = r[i + 1]; }); return o; }),
    pits: d.pits.map(function (p) { return { h: p[0], t: p[1] }; })
  };
}
var C = {};
C.breath = mk({ name: "Breathing difficulty", soc: true,
ask: [
["S", "What is the main problem: breathless, wheezy, tight, cannot get air in?", "The patient's description separates trouble getting air in from trouble getting it out, and breathlessness from chest tightness."],
["O", "Sudden or gradual? Over minutes, hours or days?", "Onset within minutes suggests a different group of causes from breathlessness that has built over days."],
["C", "Wheeze, noisy breathing, cough? Bringing anything up, and what colour?", "Wheeze, noisy breathing in and a productive cough each point to a different part of the airway or lungs."],
["A", "Chest pain, fever, palpitations, leg swelling, swollen lips or tongue, rash?", "Associated symptoms often name the cause: fever with infection, leg swelling with a clot or heart failure, swelling and rash with an allergic reaction."],
["T", "Constant or in episodes? Worse at night? How does it compare with normal?", "Many patients are always a little breathless. The change from their normal is what matters."],
["E", "Worse lying flat or on exertion? Any trigger?", "Breathlessness lying flat suggests fluid on the lungs. A clear trigger points towards asthma or an allergic cause."],
["S", "Can they speak in full sentences? How far can they walk today?", "Speech and exercise tolerance are a quick, repeatable measure of severity."],
["+", "Lung or heart disease, previous admissions, home oxygen, smoking, recent travel or surgery.", "Previous admissions, especially to intensive care, show how severe earlier episodes have been."]
],
flags: [
["Anaphylaxis", "Sudden onset after an exposure. Swelling of the lips, tongue or throat. Rash, wheeze, feeling faint."],
["Life-threatening asthma", "Known asthma. Too breathless to speak. Exhaustion, a quiet chest, falling effort."],
["Pulmonary embolism", "Sudden breathlessness. Pain worse on breathing in. Recent immobility, surgery or long travel. Calf pain or swelling."],
["Acute heart failure", "Worse lying flat. Waking breathless at night. Leg swelling. Frothy sputum."],
["Pneumothorax", "Sudden one-sided sharp pain with breathlessness. Reduced breath sounds on one side."]
],
feats: [["onset", "Onset"], ["sound", "What you hear"], ["clue", "Key clue"]],
apart: [
["Anaphylaxis", "Minutes after an exposure", "Wheeze or noisy breathing in", "Swelling, rash, feeling faint"],
["Life-threatening asthma", "Hours to days, sometimes minutes", "Wheeze, or a quiet chest when severe", "Known asthma, cannot finish sentences"],
["Pulmonary embolism", "Sudden", "Often clear", "Pain breathing in, calf symptoms, recent immobility"],
["Acute heart failure", "Hours to days, or sudden at night", "Crackles", "Worse lying flat, leg swelling"],
["Pneumothorax", "Sudden", "Reduced on one side", "One-sided sharp pain"]
],
pits: [
["Judging by the oxygen reading alone", "A patient can be tiring and still show an acceptable number. Ask how hard breathing feels and watch them speak."],
["Missing the patient's normal", "Ask what a good day looks like. Long-term breathlessness makes today hard to judge without it."],
["Calling it anxiety too early", "Fast breathing with tingling fingers can be anxiety, but that is a conclusion to reach after the other causes."],
["Forgetting the quiet chest", "Less wheeze is not always improvement. Ask whether the patient feels better or just more tired."],
["Not asking about exposure", "New foods, new medication, stings and travel only come out if you ask."]
] });
C.head = mk({ name: "Headache", soc: true,
ask: [
["S", "Whole head, one side, front, back, behind the eye?", "One-sided pain, pain behind one eye and pain at the back of the head each suggest different causes."],
["O", "Sudden or gradual? How long to reach its worst? Doing what?", "A headache that reaches its worst within a minute raises concern for a bleed."],
["C", "Throbbing, tight band, stabbing, pressure?", "The patient's word helps separate the common headache types from each other."],
["R", "Into the neck, face or jaw?", "Pain into the neck with stiffness raises concern for irritation of the lining of the brain."],
["A", "Vomiting, visual change, weakness, numbness, speech difficulty, fever, neck stiffness, rash, dislike of light?", "Neurological symptoms, fever and neck stiffness are what turn a headache into an emergency."],
["T", "First ever, or like previous headaches? Worse on waking?", "A first or worst-ever headache, or a change in a familiar pattern, matters more than the pain score."],
["E", "Worse coughing, straining, bending or lying down? Eased by dark and quiet?", "Pain worse with coughing, straining or lying down suggests raised pressure inside the skull."],
["S", "Out of ten. Worst headache of their life?", "The score is a baseline. A patient calling it the worst of their life is a red flag in itself."],
["+", "Head injury, blood-thinning medication, pregnancy, known migraine, recent infection, others in the house unwell.", "Head injury with blood-thinning medication raises the risk of a bleed. Others unwell in the same house raises the question of carbon monoxide."]
],
flags: [
["Subarachnoid haemorrhage", "Sudden severe headache reaching its worst within a minute. Neck stiffness, vomiting, collapse."],
["Meningitis", "Fever, neck stiffness, dislike of light, drowsiness, a rash that does not fade under pressure."],
["Stroke", "Facial droop, arm or leg weakness, speech or visual disturbance alongside the headache."],
["Raised pressure in the skull", "Worse on waking, lying down, coughing or straining. Vomiting. Gradual change in behaviour or alertness."],
["Temporal arteritis", "Over 50. Scalp tenderness, jaw pain on chewing, visual disturbance."]
],
feats: [["onset", "Onset"], ["clue", "Key features"], ["who", "Who"]],
apart: [
["Subarachnoid haemorrhage", "Seconds to a minute", "Worst ever, neck stiffness, vomiting", "Any adult, often during exertion"],
["Meningitis", "Hours", "Fever, neck stiffness, dislike of light, rash", "Any age, often young"],
["Stroke", "Sudden", "Weakness, speech or visual loss", "Older, with vascular risk factors"],
["Raised pressure in the skull", "Days to weeks", "Worse on waking and with straining", "Recent head injury or known tumour"],
["Temporal arteritis", "Days", "Scalp tenderness, jaw pain on chewing", "Over 50"]
],
pits: [
["Trusting 'just a migraine'", "People with migraine can have another cause. Ask whether this one is different from their usual."],
["Not timing the onset", "Ask how long it took to reach its worst. Patients say sudden when they mean today."],
["Forgetting the house", "Several people or pets unwell in the same home should make you think of carbon monoxide."],
["Missing the minor head injury", "Ask about falls and knocks over the previous weeks, especially in older patients."],
["Letting the pain score lead", "Mild pain with neurological symptoms is more worrying than severe pain without them."]
] });
C.seizure = mk({ name: "Seizure",
ask: [
["1", "Before: what was the patient doing? Any warning or trigger?", "A warning or trigger helps separate a seizure from a faint and shows whether this fits the patient's usual pattern."],
["2", "During: what did a witness see? Stiffness, jerking, one side or both?", "A witness description is the best evidence you will get. Movements on one side suggest a focal cause."],
["3", "Awareness: were they responsive? Eyes open or closed?", "Loss of awareness and eye position help distinguish seizure types from other causes of collapse."],
["4", "Duration: how long did it last? More than one? Recovery in between?", "A long seizure, or repeated seizures without recovery, is an emergency in its own right."],
["5", "After: confused, drowsy, weak on one side? How long to recover?", "A period of confusion afterwards supports a seizure. Rapid full recovery suggests a faint."],
["6", "Injury: tongue bitten, incontinence, head or other injury?", "A bitten tongue supports a seizure, and the fall may have caused a separate injury."],
["7", "Known epilepsy? Usual pattern, care plan, any missed medication?", "With known epilepsy the question is whether this seizure is typical for the patient."],
["8", "First seizure? Head injury, fever, diabetes, pregnancy, alcohol or drugs?", "A first seizure needs a cause. Low blood sugar, head injury, infection, pregnancy and withdrawal can all present this way."]
],
flags: [
["Prolonged or repeated seizures", "Seizure activity that continues, or seizures that follow one another without recovery in between."],
["Low blood sugar", "Known diabetes, missed meals, sweating or confusion beforehand."],
["Head injury or bleed", "Recent head injury, severe headache before the seizure, or weakness on one side afterwards."],
["Eclampsia", "Pregnant or recently given birth. Headache, visual disturbance or swelling beforehand."],
["Cardiac cause", "Collapse with brief jerking and rapid recovery. Palpitations or chest pain beforehand. Family history of sudden death."]
],
feats: [["before", "Before"], ["during", "During"], ["after", "After"]],
apart: [
["Generalised seizure", "Sometimes a warning, often none", "Stiff, then rhythmic jerking for a minute or more", "Confused and drowsy for minutes to hours"],
["Faint", "Light-headed, hot, vision closing in", "Limp and pale, perhaps a few brief jerks", "Alert within a minute or two"],
["Cardiac collapse", "Palpitations, or nothing at all", "Sudden collapse, pale, brief jerks possible", "Rapid recovery, often no memory of it"],
["Low blood sugar", "Sweaty, shaky, confused, behaving oddly", "Reduced consciousness, sometimes a seizure", "Stays confused until it is corrected"]
],
pits: [
["Settling for no witness", "Find the person who saw it, by phone if needed. The patient cannot tell you what happened."],
["Assuming known epilepsy explains it", "Ask whether this seizure was typical. A change in pattern needs a reason."],
["Calling brief jerks a seizure", "A few jerks are common in a simple faint. Recovery time tells them apart."],
["Forgetting pregnancy", "Ask anyone who could be pregnant or has recently given birth."],
["Missing the injury", "Ask how they fell and check for a head injury once the seizure is over."]
] });
C.fall = mk({ name: "Fall or collapse",
ask: [
["1", "Before: what were they doing? Standing up, straining, exerting?", "The moments before are the best clue to the cause. Collapse on standing, during exertion and while sitting each suggest something different."],
["2", "Warning: dizziness, palpitations, chest pain, vision change, or none?", "Collapse with no warning at all raises concern for the heart."],
["3", "Trip or collapse: do they remember hitting the floor?", "A patient who cannot describe the fall may have lost consciousness, even if they say they tripped."],
["4", "During: did anyone see it? Colour, movements, how long were they out?", "A witness can tell you what the patient cannot: colour, movements and how long it lasted."],
["5", "After: alert straight away, or confused? Any weakness or speech change?", "Immediate recovery suggests a faint. Confusion suggests a seizure, and new weakness suggests a stroke."],
["6", "Injury: head, neck, hip, wrist? Able to get up? How long on the floor?", "A long time on the floor brings its own problems, including pressure damage, cold and dehydration."],
["7", "Has this happened before? How many falls in the last year?", "Repeated falls point to an underlying cause that a one-off explanation misses."],
["8", "Medication changes, blood-thinning medication, alcohol, recent illness, eating and drinking?", "New or changed medication is a common cause of falls in older patients, and blood-thinning medication raises the stakes of any head injury."]
],
flags: [
["Cardiac collapse", "No warning, during exertion or while lying down. Palpitations or chest pain. Family history of sudden death."],
["Stroke", "New weakness, facial droop, speech or visual disturbance."],
["Internal bleeding", "Pale, sweaty, dizzy on standing. Abdominal or back pain. Dark or bloody stools."],
["Head or neck injury", "Head strike, neck pain, altered alertness, on blood-thinning medication."],
["Hip fracture", "Unable to bear weight. Leg shortened and turned outwards. Groin or hip pain."]
],
feats: [["before", "Before"], ["warn", "Warning"], ["after", "Recovery"]],
apart: [
["Simple trip", "Walking, with a hazard or obstacle", "None needed: they remember it all", "Alert throughout, clear memory"],
["Faint", "Standing a long time, pain, heat, emotion", "Light-headed, hot, vision closing in", "Alert within a minute or two"],
["Cardiac collapse", "Exertion, or at rest", "None, or palpitations", "Rapid, often no memory of falling"],
["Drop in blood pressure on standing", "Getting up from sitting or lying", "Dizzy within seconds of standing", "Settles on sitting or lying down"],
["Seizure", "Anything", "Sometimes a warning", "Confused and drowsy"]
],
pits: [
["Accepting 'I just tripped'", "Ask the patient to describe the fall step by step. Gaps in the story matter."],
["Treating the injury and missing the cause", "The fracture is obvious. The reason for the fall is the part that gets missed."],
["Missing the long lie", "Ask how long they were on the floor and whether they could have got up."],
["Forgetting the neck", "A fall with a head strike can injure the neck, particularly in older patients."],
["Not asking about previous falls", "One fall may be bad luck. Several in a year is a pattern."]
] });
C.abdo = mk({ name: "Abdominal pain", soc: true,
ask: [
["S", "Which area? One spot or all over? Has it moved?", "The area of the abdomen narrows the organs involved, and pain that has moved is a clue in itself."],
["O", "Sudden or gradual? After eating, drinking or an injury?", "Sudden severe pain suggests something has ruptured, twisted or blocked."],
["C", "Cramping in waves, constant, sharp, burning, tearing?", "Pain in waves suggests a blockage. Constant pain suggests inflammation."],
["R", "To the back, the groin or the shoulder tip?", "Spread to the back, the groin or the shoulder tip each points to a different structure."],
["A", "Vomiting, bowel or urine changes, fever, blood in vomit or stool, vaginal bleeding?", "Bleeding, fever and changes to the bowels or urine show which system is involved."],
["T", "Constant or in waves? Getting worse? Had it before?", "Pain that keeps worsening is more concerning than pain that has stayed the same for days."],
["E", "Worse on movement, coughing or eating? Lying still, or unable to keep still?", "A patient lying very still suggests irritation of the abdominal lining. One who cannot keep still suggests colic."],
["S", "Out of ten, now and at its worst.", "The score gives you a baseline to reassess against."],
["+", "Last period and chance of pregnancy, previous abdominal surgery, last bowel motion, alcohol.", "Pregnancy must be considered in anyone who could be pregnant. Previous surgery raises the chance of a blockage."]
],
flags: [
["Abdominal aortic aneurysm", "Over 60. Sudden abdominal, back or flank pain. Faintness or collapse. A pulsating mass."],
["Ectopic pregnancy", "Could be pregnant. Lower abdominal pain, often one-sided. Vaginal bleeding, shoulder tip pain, faintness."],
["Perforation or peritonitis", "Sudden severe pain. Rigid abdomen. Lying very still. Worse on any movement."],
["Bowel obstruction", "Pain in waves. Vomiting. Distension. Not opening bowels or passing wind."],
["Heart attack", "Upper abdominal pain with sweating, nausea or breathlessness, especially in older patients or people with diabetes."]
],
feats: [["onset", "Onset"], ["char", "Pain"], ["clue", "Key clue"]],
apart: [
["Abdominal aortic aneurysm", "Sudden", "Severe, through to the back", "Over 60, faint, pulsating mass"],
["Ectopic pregnancy", "Sudden, or over hours", "Lower abdomen, often one-sided", "Missed period, bleeding, shoulder tip pain"],
["Perforation or peritonitis", "Sudden", "Constant, worse on movement", "Rigid abdomen, lying still"],
["Bowel obstruction", "Hours to days", "Cramping, in waves", "Vomiting, distension, bowels not open"],
["Heart attack", "Minutes", "Upper abdomen, heavy or burning", "Sweating, breathless, cardiac risk factors"]
],
pits: [
["Not asking about pregnancy", "Ask everyone who could be pregnant, whatever they tell you about contraception."],
["Forgetting the heart", "Upper abdominal pain can be cardiac. Ask the chest pain questions too."],
["Being reassured by a soft abdomen", "Older patients can have serious illness with very few signs."],
["Stopping at 'a tummy bug'", "Vomiting and diarrhoea occur in serious causes too. Ask which came first, the pain or the vomiting."],
["Skipping bowels and urine", "Patients do not volunteer these. Ask directly, including about blood."]
] });
C.back = mk({ name: "Back pain", soc: true,
ask: [
["S", "Upper, middle or lower? Central or to one side?", "Pain in the middle of the back is less often mechanical than pain low down."],
["O", "Sudden or gradual? Lifting, twisting, a fall, or nothing at all?", "Back pain with a clear mechanical start is usually muscular. Pain from nowhere deserves more questions."],
["C", "Aching, sharp, shooting, tearing?", "Shooting pain suggests a nerve is involved. Tearing pain raises concern for the aorta."],
["R", "Down one leg or both? Round to the abdomen or groin?", "Pain down both legs is more worrying than one. Pain round to the abdomen or groin may not come from the back at all."],
["A", "Leg numbness or weakness, bladder or bowel change, numbness between the legs, fever, weight loss?", "Bladder, bowel and sensation between the legs are the questions that find cauda equina, and patients rarely volunteer them."],
["T", "Constant? Worse at night or at rest?", "Mechanical pain eases with rest. Pain that is worse at night or at rest raises concern for infection or cancer."],
["E", "Better or worse with movement, position or rest?", "Pain that changes with movement and position behaves like a mechanical problem."],
["S", "Out of ten. Able to walk?", "Function tells you as much as the score: what can they not do today that they could yesterday?"],
["+", "History of cancer, osteoporosis, recent infection, injecting drug use, recent injury.", "These risk factors turn ordinary-sounding back pain into something that needs a closer look."]
],
flags: [
["Cauda equina syndrome", "Numbness between the legs. New difficulty passing urine or loss of bowel control. Weakness or pain in both legs."],
["Abdominal aortic aneurysm", "Over 60. Sudden back, flank or abdominal pain. Faintness or collapse."],
["Spinal fracture", "Significant trauma, or a minor fall in someone older or with osteoporosis. Sudden pain at one level."],
["Spinal infection", "Fever, feeling unwell, recent infection, injecting drug use. Pain worse at rest."],
["Cancer in the spine", "History of cancer. Unexplained weight loss. Pain worse at night. New weakness in the legs."]
],
feats: [["onset", "Onset"], ["clue", "Key clue"], ["who", "Who"]],
apart: [
["Cauda equina syndrome", "Hours to days", "Bladder, bowel, numbness between the legs", "Any adult, often known disc problems"],
["Abdominal aortic aneurysm", "Sudden", "Abdominal or flank pain, faintness", "Over 60"],
["Spinal fracture", "Sudden, with an injury", "Tender at one level", "Older, osteoporosis, or major trauma"],
["Spinal infection", "Days to weeks", "Fever, worse at rest", "Recent infection, injecting drug use"],
["Cancer in the spine", "Weeks", "Night pain, weight loss, leg weakness", "History of cancer"]
],
pits: [
["Not asking the bladder and bowel questions", "They feel awkward and they are the ones that matter most. Ask every time."],
["Assuming it is muscular", "Most back pain is, which is why the exceptions get missed. Run the red flags first."],
["Forgetting the abdomen", "In an older patient with sudden back pain, think about the aorta."],
["Accepting 'my usual back'", "Ask what is different this time. Something made them call today."],
["Dismissing the minor fall", "In older patients a small fall can be enough to fracture the spine."]
] });

C.chest = { name: 'Chest pain', soc: true, tool: 'ECG tool',
ask: [{ l: 'S', q: 'Central, left or right? One spot or across the chest?', why: 'Central pain raises concern for a cardiac cause. Pain the patient can point to with one finger, or that is clearly one-sided, widens the picture towards the lungs or chest wall.' },
{ l: 'O', q: 'Sudden or gradual? At rest or on exertion?', why: 'Pain that is at its worst from the first moment suggests a different group of causes from pain that builds. Pain brought on by exertion points towards the heart.' },
{ l: 'C', q: 'Heavy, tight, sharp, tearing or burning?', why: 'The patient\'s own word narrows the field. Heavy or tight, sharp, tearing and burning each fit different causes.' },
{ l: 'R', q: 'Arm, jaw, neck, back or between the shoulder blades?', why: 'Spread to the arm, jaw or neck supports a cardiac cause. Pain going through to the back raises concern for the aorta.' },
{ l: 'A', q: 'Breathlessness, sweating, nausea, palpitations, dizziness, cough, calf pain or swelling?', why: 'Sweating, nausea and breathlessness alongside chest pain increase concern. Calf pain or swelling points towards a clot.' },
{ l: 'T', q: 'Constant or intermittent? Like any previous episode?', why: 'Constant pain and pain that comes and goes behave differently. Comparing with previous episodes shows whether something has changed.' },
{ l: 'E', q: 'Changed by breathing in, movement, position, exertion or rest?', why: 'Pain that changes with breathing or position suggests the lining of the lungs or heart. Pain that changes with movement suggests the chest wall.' },
{ l: 'S', q: 'Score now and at its worst.', why: 'The score gives you a baseline to reassess against. Severity on its own does not tell you how serious the cause is.' },
{ l: '+', q: 'Also ask about previous heart problems, family history of heart disease, smoking, and recent travel, surgery or immobility.', why: 'Risk factors change how likely each cause is before you have examined the patient.' }
],
flags: [
{ name: 'Acute coronary syndrome', text: 'Central heavy or tight pain. Spread to the arm, neck or jaw. Sweating, nausea or breathlessness. Presentation can be less typical in older patients, women and people with diabetes.' },
{ name: 'Pulmonary embolism', text: 'Sudden breathlessness. Pain worse on breathing in. Recent immobility, surgery or long travel. Calf pain or swelling. Coughing up blood.' },
{ name: 'Aortic dissection', text: 'Sudden, severe pain, often described as tearing and felt through to the back. A difference in pulses or blood pressure between arms. New neurological symptoms.' },
{ name: 'Pneumothorax', text: 'Sudden one-sided sharp pain with breathlessness. Reduced breath sounds on one side. Recent chest trauma or existing lung disease.' },
{ name: 'Pericarditis', text: 'Sharp pain that is worse lying flat and easier sitting forward. Often follows a recent viral illness.' }
],
feats: [['onset', 'Onset'], ['char', 'Character'], ['spread', 'Spread'], ['breath', 'Breathing and position']],
apart: [
{ name: 'Acute coronary syndrome', onset: 'Over minutes, on exertion or at rest', char: 'Heavy, tight, pressure', spread: 'Arm, jaw or neck', breath: 'Usually unchanged' },
{ name: 'Pulmonary embolism', onset: 'Sudden', char: 'Sharp', spread: 'Usually none', breath: 'Worse breathing in' },
{ name: 'Aortic dissection', onset: 'Abrupt, at its worst from the start', char: 'Tearing or ripping', spread: 'Through to the back', breath: 'Usually unchanged' },
{ name: 'Pneumothorax', onset: 'Sudden', char: 'Sharp, one-sided', spread: 'Sometimes the shoulder on the same side', breath: 'Worse breathing in' },
{ name: 'Pericarditis', onset: 'Over hours to days', char: 'Sharp', spread: 'Sometimes the neck or shoulder', breath: 'Worse lying flat, easier sitting forward' }
],
pits: [
{ h: 'Expecting textbook pain', t: 'Older patients, women and people with diabetes may have little or no chest pain. Ask about breathlessness, nausea and unusual tiredness.' },
{ h: 'Stopping at the first answer that fits', t: 'Once one cause seems likely it is tempting to stop asking. Finish SOCRATES before you settle.' },
{ h: 'Being reassured by tenderness', t: 'Pain you can reproduce by pressing on the chest does not rule out a serious cause.' },
{ h: 'Accepting the patient\'s label', t: 'Patients often call it indigestion or a pulled muscle. Record the description, and treat the label as their opinion.' },
{ h: 'Leading the patient', t: 'Asking whether it goes down the left arm invites a yes. Ask where it goes, then follow up.' },
{ h: 'Forgetting the legs', t: 'Calf pain, leg swelling and recent travel or immobility only come out if you ask.' },
{ h: 'Letting a normal ECG end the history', t: 'A normal first ECG does not replace the story the patient gives you.' }
],
pocket: [
{ l: 'S', q: 'Where? One spot or across the chest?' },
{ l: 'O', q: 'When? Sudden or gradual? Doing what?' },
{ l: 'C', q: 'Heavy, tight, sharp, tearing, burning?' },
{ l: 'R', q: 'Arm, jaw, neck, back?' },
{ l: 'A', q: 'Breathless, sweaty, sick, palpitations, calf pain?' },
{ l: 'T', q: 'Constant or comes and goes? Had it before?' },
{ l: 'E', q: 'Breathing, movement, position, exertion?' },
{ l: 'S', q: 'Out of ten, now and at worst.' },
{ l: '+', q: 'Heart history, family, smoking, travel, surgery.' }
]
};
C.stroke = mk({ name: "Stroke symptoms",
ask: [
["1", "Onset: exactly when did it start? When were they last seen well?", "Time of onset decides which hospital treatments are possible. If nobody saw it start, the last time seen well is the time that counts."],
["2", "Face, arm, speech: what changed? Which side?", "Sudden weakness or speech change on one side is the core of a stroke history."],
["3", "Other symptoms: vision, balance, swallowing, confusion, numbness?", "Strokes at the back of the brain cause vision, balance and coordination problems and are missed by a face, arm and speech check alone."],
["4", "Course: better, worse or the same? Has it happened before?", "Symptoms that have fully resolved still matter. A brief episode can warn of a stroke to come."],
["5", "Headache, vomiting, seizure or neck pain at the start?", "Sudden severe headache or vomiting at onset raises concern for a bleed."],
["6", "Blood sugar: known diabetes? When did they last eat?", "Low blood sugar can copy a stroke exactly and is quick to exclude."],
["7", "Blood-thinning medication? Recent surgery, injury or bleeding?", "These affect which hospital treatments are safe, so the receiving team will ask."],
["8", "Normal function: how independent were they before today?", "The hospital team needs the patient's usual level of independence to judge the change."]
],
flags: [
["Bleed in the brain", "Sudden severe headache, vomiting, falling alertness, on blood-thinning medication."],
["Stroke at the back of the brain", "Dizziness, double vision, unsteadiness or slurred speech, with a normal face and arm check."],
["Transient ischaemic attack", "Stroke symptoms that have fully resolved. Still needs urgent assessment."],
["Low blood sugar", "Known diabetes, sweating, confusion. Can copy a stroke."],
["Seizure with weakness afterwards", "Witnessed jerking or loss of awareness, followed by weakness on one side."]
],
feats: [["onset", "Onset"], ["clue", "Key features"], ["course", "Course"]],
apart: [
["Stroke", "Sudden", "One-sided weakness, speech or vision loss", "Persists"],
["Transient ischaemic attack", "Sudden", "The same symptoms as a stroke", "Resolves fully, usually within an hour"],
["Low blood sugar", "Minutes to hours", "Sweaty, confused, known diabetes", "Resolves once corrected"],
["Migraine with aura", "Builds over minutes", "Visual disturbance or tingling that spreads, then headache", "Resolves within an hour"],
["Seizure", "Sudden", "Witnessed jerking or loss of awareness", "Weakness fades over hours"]
],
pits: [
["Recording when they were found", "The time that matters is when they were last seen well, not when someone found them."],
["Stopping at face, arm and speech", "Ask about vision, balance and coordination too."],
["Dismissing symptoms that have gone", "A resolved episode is a warning, not an all-clear."],
["Forgetting the blood sugar", "Ask about diabetes and food in every suspected stroke."],
["Leaving without a contact", "Take the number of someone who knows the timeline and the patient's normal."]
] });
C.dizzy = mk({ name: "Dizziness",
ask: [
["1", "Meaning: spinning, light-headed or unsteady?", "Dizzy means three different things. Spinning suggests the balance system, light-headed suggests circulation, unsteady suggests coordination."],
["2", "Onset: sudden or gradual? What were they doing?", "A sudden start with no trigger is more concerning than dizziness that has built over days."],
["3", "Trigger: head movement, standing up, exertion, or none?", "On turning the head suggests the inner ear. On standing suggests blood pressure. On exertion suggests the heart."],
["4", "Duration: seconds, minutes, hours or constant?", "Seconds suggests a positional inner ear problem. Constant dizziness for hours needs a cause in the brain excluding."],
["5", "Ears: hearing loss, ringing, ear pain, recent cold?", "Ear symptoms point towards the inner ear and away from the brain."],
["6", "Double vision, slurred speech, weakness, numbness, headache, trouble walking?", "Any of these with dizziness raises concern for a stroke at the back of the brain."],
["7", "Palpitations, chest pain, breathlessness or a blackout?", "These turn dizziness into a cardiac history."],
["8", "Medication changes, fluid intake, bleeding, alcohol?", "New medication, poor fluid intake and blood loss are common causes."]
],
flags: [
["Stroke at the back of the brain", "Sudden dizziness with double vision, slurred speech, unsteadiness or inability to walk."],
["Heart rhythm problem", "Palpitations, chest pain, a blackout, or dizziness on exertion."],
["Internal bleeding", "Light-headed on standing, pale, dark stools, abdominal pain."],
["Low blood sugar", "Known diabetes, sweating, shaking, confusion."],
["Carbon monoxide", "Headache and dizziness that improve away from home. Others in the house affected."]
],
feats: [["feel", "How it feels"], ["trig", "Trigger"], ["clue", "Key clue"]],
apart: [
["Inner ear problem", "Spinning", "Head movement", "Lasts seconds to minutes, nausea, hearing symptoms"],
["Drop in blood pressure on standing", "Light-headed", "Standing up", "Settles on sitting down"],
["Heart rhythm problem", "Light-headed, near blackout", "None, or exertion", "Palpitations, chest pain"],
["Stroke at the back of the brain", "Spinning or unsteady", "None", "Double vision, slurred speech, cannot walk"]
],
pits: [
["Accepting the word dizzy", "Make the patient describe it without using the word."],
["Assuming it is the ear", "Most dizziness is, which is how the stroke gets missed. Ask the neurological questions."],
["Not asking about walking", "Being unable to walk unaided is a red flag."],
["Missing the medication change", "Ask what has been started, stopped or changed in the last few weeks."],
["Forgetting blood loss", "Ask about dark stools and heavy periods."]
] });
C.palp = mk({ name: "Palpitations", tool: "ECG tool",
ask: [
["1", "What do they feel: racing, thumping, fluttering, missed beats?", "Missed beats and a sustained racing heart are different problems."],
["2", "Regular or irregular? Can they tap it out?", "Asking the patient to tap the rhythm is a quick way to tell regular from irregular."],
["3", "Start and stop: sudden like a switch, or gradual?", "A rhythm that starts and stops abruptly suggests an electrical cause. A gradual build suggests a response to something else."],
["4", "How long does it last? How often? Is it happening now?", "If it is happening now you can record it. If it has gone, the history is all the evidence there is."],
["5", "Chest pain, breathlessness, dizziness or a blackout with it?", "These show the rhythm is affecting the circulation and raise the urgency."],
["6", "Trigger: exertion, rest, caffeine, alcohol, stress, lying down?", "Palpitations during exertion are more concerning than those noticed lying in bed."],
["7", "Heart disease, thyroid problems, previous episodes or procedures?", "Known heart or thyroid disease makes a significant rhythm problem more likely."],
["8", "Family history of sudden death or rhythm problems at a young age?", "An inherited rhythm problem may give no other warning."]
],
flags: [
["Fast rhythm affecting the circulation", "Chest pain, breathlessness, faintness or low blood pressure with a fast heart rate."],
["Blackout with palpitations", "Loss of consciousness suggests a dangerous rhythm."],
["Heart attack", "Chest pain, sweating and nausea alongside the palpitations."],
["Inherited rhythm problem", "Young patient, symptoms on exertion, family history of sudden death."],
["Underlying illness", "Fever, bleeding, dehydration or thyroid disease driving a fast heart rate."]
],
feats: [["feel", "How it feels"], ["start", "Start and stop"], ["clue", "Key clue"]],
apart: [
["Extra beats", "Missed or thumping single beats", "Come and go", "Worse at rest, otherwise well"],
["Fast regular rhythm", "Racing and regular", "Sudden, like a switch", "May stop just as suddenly"],
["Atrial fibrillation", "Racing and irregular", "Sudden, or not noticed", "Older, breathless, irregular pulse"],
["Response to illness or anxiety", "Fast and regular", "Gradual", "Fever, pain, blood loss or fear"]
],
pits: [
["Stopping at a normal recording", "The rhythm may have gone by the time you arrive. The history still counts."],
["Calling it anxiety", "Palpitations cause anxiety as often as the other way round."],
["Not asking about blackouts", "Patients may not link a collapse last week with today's palpitations."],
["Skipping the family history", "Ask specifically about sudden death in young relatives."],
["Forgetting the driver", "A fast heart may be the body's response to infection, bleeding or dehydration."]
] });
C.allergy = mk({ name: "Allergic reaction",
ask: [
["1", "Exposure: what, and when? Food, medication, sting, latex, unknown?", "The trigger and the time since exposure help predict how the reaction will behave."],
["2", "Speed: how quickly did symptoms start and spread?", "Reactions that develop within minutes are more likely to become severe."],
["3", "Airway: swelling of lips, tongue or throat? Voice change, trouble swallowing?", "Voice change and difficulty swallowing are early signs that the airway is involved."],
["4", "Breathing: wheeze, tightness, breathlessness?", "Breathing difficulty separates a severe reaction from a skin-only one."],
["5", "Circulation: faint, dizzy, collapsed, clammy?", "Feeling faint suggests the circulation is involved."],
["6", "Skin and gut: rash, itching, flushing, vomiting, abdominal pain?", "Skin changes are common but can be absent. Their absence does not rule out a severe reaction."],
["7", "Previous reactions: how severe? Emergency medication carried, and used?", "A previous severe reaction raises the risk, and anything already given changes what you see."],
["8", "Asthma? Other conditions and regular medication?", "Asthma increases the risk of a severe reaction."]
],
flags: [
["Anaphylaxis", "Sudden onset with airway swelling, breathing difficulty or faintness, usually with skin changes."],
["Airway swelling without a rash", "Lip, tongue or throat swelling alone. Can be caused by regular medication and not by allergy."],
["Asthma triggered by the allergen", "Wheeze and breathlessness dominating in someone with known asthma."],
["Second reaction", "Symptoms returning hours after the first reaction has settled."]
],
feats: [["skin", "Skin"], ["breath", "Airway and breathing"], ["circ", "Circulation"]],
apart: [
["Mild allergic reaction", "Rash, itching, local swelling", "Normal", "Normal"],
["Anaphylaxis", "Usually rash or flushing, sometimes none", "Swelling, wheeze, voice change", "Faint, pale, clammy"],
["Faint", "Pale, no rash", "Normal", "Brief, recovers lying down"],
["Panic attack", "No rash", "Fast breathing, tingling fingers", "Normal"]
],
pits: [
["Waiting for a rash", "A severe reaction can happen with no skin changes at all."],
["Not asking what has been given", "The patient or family may already have used emergency medication."],
["Assuming it is over", "Symptoms can return hours later. Ask when the first reaction started."],
["Missing the unknown trigger", "No obvious cause does not make it less likely to be allergic."],
["Forgetting asthma", "Ask every patient with a reaction whether they have asthma."]
] });
C.diabetic = mk({ name: "Diabetic problems",
ask: [
["1", "Type of diabetes? Managed by diet, tablets, injections or a pump?", "The type and how it is managed tell you which emergencies are possible."],
["2", "Readings: what has the blood sugar been today and recently?", "The trend over days is more useful than one reading."],
["3", "Food and medication: last meal? Doses taken, missed or changed?", "A mismatch between food, activity and medication is the usual cause of a low."],
["4", "Low symptoms: sweating, shaking, hunger, confusion, odd behaviour?", "Some patients lose their warning symptoms. Ask what a low normally feels like for them."],
["5", "High symptoms: thirst, passing lots of urine, vomiting, abdominal pain, deep breathing?", "Thirst, vomiting, abdominal pain and deep breathing together raise concern for ketoacidosis."],
["6", "Illness: infection, fever, chest pain, or anything else wrong?", "Illness pushes blood sugar up, and a heart attack with little pain is more common in diabetes."],
["7", "Has this happened before? Any recent admissions?", "Repeated episodes suggest the usual plan is no longer working."],
["8", "Alcohol, exercise, pregnancy, foot or skin problems?", "Alcohol and exercise cause delayed lows. Feet are a common hidden source of infection."]
],
flags: [
["Severe low blood sugar", "Confusion, aggression, drowsiness, seizure or unconsciousness."],
["Diabetic ketoacidosis", "Thirst, passing lots of urine, vomiting, abdominal pain, deep sighing breathing, drowsiness."],
["Hyperosmolar state", "Older patient with type 2. Very high readings over days, severe dehydration, confusion."],
["Heart attack with little pain", "Breathless, sweaty, nauseated or just unwell, with little or no chest pain."],
["Sepsis", "Infection with fever, confusion, fast breathing or fast heart rate. Ask about the feet."]
],
feats: [["onset", "Onset"], ["who", "Who"], ["clue", "Key clue"]],
apart: [
["Low blood sugar", "Minutes", "Anyone on tablets or injections", "Sweaty, shaky, confused"],
["Diabetic ketoacidosis", "Hours to a day or two", "Mostly type 1", "Vomiting, abdominal pain, deep breathing"],
["Hyperosmolar state", "Days", "Older, type 2", "Severe dehydration, confusion"]
],
pits: [
["Treating the reading as the answer", "A low has a cause. Ask why it happened today."],
["Mistaking a low for intoxication", "Slurred speech and aggression look the same in both."],
["Dismissing vomiting", "Vomiting in someone with type 1 diabetes needs ketoacidosis considering."],
["Forgetting the heart", "Ask about breathlessness and sweating, because pain may be absent."],
["Not asking about illness", "Infection is the commonest reason for control to slip."]
] });
C.child = mk({ name: "Unwell child",
ask: [
["1", "What worries the parent most? How is the child different from normal?", "Parental concern is a red flag in its own right. They know what normal looks like."],
["2", "Onset and course: how long? Getting better or worse?", "A child who is getting worse despite time and care is more concerning than one who is stable."],
["3", "Fever: how high, for how long, how was it measured?", "Duration matters as much as the number. Fever beyond five days needs explaining."],
["4", "Drinking and feeding: how much? Wet nappies or passing urine?", "Fluid in and urine out are the best history clues to dehydration."],
["5", "Behaviour: alert, playing, drowsy, floppy, irritable? What is the cry like?", "A child who is playing is reassuring. Drowsy, floppy, or a weak or high-pitched cry is not."],
["6", "Breathing: fast, noisy, working hard, pauses?", "Parents often notice the effort of breathing before anything else."],
["7", "Skin: rash, colour, mottled, cold hands and feet?", "Mottled skin and cold hands and feet are early signs of serious illness."],
["8", "Birth history, immunisations, medical conditions, contact with illness?", "Prematurity, missed immunisations and long-term conditions all raise the risk."]
],
flags: [
["Sepsis", "Mottled or pale skin, cold hands and feet, drowsy, fast breathing, not passing urine."],
["Meningitis", "Fever, a rash that does not fade under pressure, neck stiffness, dislike of light, bulging soft spot in a baby."],
["Breathing failure", "Working hard to breathe, grunting, pauses in breathing, too breathless to feed."],
["Dehydration", "Not drinking, no wet nappies, sunken eyes or soft spot, drowsy."],
["Safeguarding concern", "A story that does not fit the injury or the child's age. Delay in seeking help."]
],
feats: [["act", "Behaviour"], ["skin", "Skin"], ["clue", "Key clue"]],
apart: [
["Simple viral illness", "Miserable with fever, brighter in between", "Normal colour, warm hands", "Drinking, wet nappies"],
["Sepsis", "Drowsy, floppy, hard to rouse", "Mottled, pale, cold hands and feet", "Fast breathing, not passing urine"],
["Meningitis", "Irritable, dislikes being handled", "Rash that does not fade", "Neck stiffness, dislike of light"],
["Dehydration", "Lethargic", "Dry mouth, sunken eyes", "Not drinking, no wet nappies"]
],
pits: [
["Not listening to the parent", "If they say the child is not right, record it and take it seriously."],
["Being reassured by a normal temperature", "Serious infection can come with a normal or low temperature, especially in babies."],
["Forgetting fluids in and out", "Ask for numbers: how many feeds, how many wet nappies."],
["Missing the mismatch", "Check that the story fits the child's age and what you see."],
["Judging a baby like an adult", "Babies under three months show few signs. Fever at this age is always significant."]
] });
C.preg = mk({ name: "Pregnancy problems",
ask: [
["1", "How many weeks? Due date? Which pregnancy is this?", "Gestation decides which problems are possible and which unit should receive the patient."],
["2", "Pain: where? Constant, or coming in waves? How often, how long?", "Regular pains that come and go suggest labour. Constant pain is more worrying."],
["3", "Bleeding or fluid loss: how much, what colour, any clots?", "The amount, colour and timing help separate normal labour from bleeding that needs urgent attention."],
["4", "Baby's movements: normal, reduced or none?", "Reduced movements can be the only warning that the baby is in difficulty."],
["5", "Headache, visual disturbance, swelling, pain under the ribs?", "These together suggest pre-eclampsia."],
["6", "Urge to push? Anything felt at the entrance to the vagina?", "An urge to push means birth may be minutes away."],
["7", "Previous pregnancies and births: caesarean, complications, fast labours?", "Previous births predict this one, including how quickly labour may progress."],
["8", "Antenatal care: scans, known problems, placenta position, twins? Notes to hand?", "The notes hold the scan findings and risk factors the patient may not remember."]
],
flags: [
["Ectopic pregnancy", "Early pregnancy. One-sided lower abdominal pain, bleeding, shoulder tip pain, faintness."],
["Pre-eclampsia and eclampsia", "After 20 weeks or recently delivered. Headache, visual disturbance, swelling, pain under the ribs, seizure."],
["Placental abruption", "Constant abdominal pain and a hard, tender uterus, with or without visible bleeding."],
["Placenta praevia", "Painless bright red bleeding in later pregnancy."],
["Cord prolapse", "Cord felt or seen after the waters break."]
],
feats: [["pain", "Pain"], ["bleed", "Bleeding"], ["clue", "Key clue"]],
apart: [
["Labour", "Comes in waves, regular", "A little, mixed with mucus", "Pains getting closer together"],
["Placental abruption", "Constant and severe", "May be hidden", "Hard, tender uterus"],
["Placenta praevia", "None", "Bright red, can be heavy", "Known low-lying placenta"],
["Ectopic pregnancy", "One-sided, low down", "Light and dark", "Early pregnancy, shoulder tip pain"]
],
pits: [
["Not asking about pregnancy", "Ask everyone who could be pregnant, whatever the presenting complaint."],
["Trusting visible blood loss", "Bleeding can be concealed. Pain and faintness matter more than what you can see."],
["Forgetting movements", "Ask when the baby last moved normally."],
["Ignoring the headache", "A headache in later pregnancy needs the pre-eclampsia questions."],
["Leaving the notes behind", "Ask for the hand-held or app notes and take them with you."]
] });
C.mental = mk({ name: "Mental health crisis",
ask: [
["1", "What has happened today? Why now?", "The trigger for today's call tells you what has changed and what the patient needs."],
["2", "Mood and thoughts: how have they been feeling, and for how long?", "Duration separates a reaction to today's events from a longer illness."],
["3", "Thoughts of suicide or self-harm? Ask directly.", "Asking directly does not put the idea into someone's head. It gives them permission to answer honestly."],
["4", "Plan and intent: have they thought about how or when? Acted on it today?", "A plan, access to the means and stated intent raise the risk far more than thoughts alone."],
["5", "Has anything been taken, or any injury caused? What, when, how much?", "There may be a physical emergency underneath the mental health one."],
["6", "Unusual experiences: hearing voices, feeling watched, beliefs others find strange?", "Voices that give instructions to harm raise the risk sharply."],
["7", "Alcohol or drugs today? Sleeping, eating, taking usual medication?", "Intoxication raises the immediate risk and affects how you judge capacity."],
["8", "Support: who is at home? Known to services? What has helped before?", "Support, reasons for living and past coping are what make a safety plan realistic."]
],
flags: [
["High suicide risk", "A plan, access to the means, stated intent, a recent attempt, hopelessness."],
["Physical cause", "Sudden confusion, fever, head injury, low blood sugar or intoxication behind the behaviour."],
["Overdose or injury already happened", "Anything taken or any injury, even if the patient says it was minor."],
["Psychosis", "Voices, paranoia or fixed beliefs, especially with instructions to harm."],
["Risk to others", "Threats, access to weapons, children or dependants in the home."]
],
feats: [["onset", "Onset"], ["aware", "Awareness"], ["clue", "Key clue"]],
apart: [
["Delirium from a physical cause", "Hours to days", "Fluctuates, disorientated", "Older, fever, new medication"],
["Psychosis", "Days to weeks", "Alert and orientated", "Voices, fixed beliefs"],
["Severe depression", "Weeks", "Alert but slowed", "Hopelessness, poor sleep and appetite"],
["Intoxication", "Minutes to hours", "Reduced or fluctuating", "History of use, settles with time"]
],
pits: [
["Avoiding the suicide question", "Use the word. Vague questions get vague answers."],
["Assuming it is all mental health", "New confusion, especially in an older patient, has a physical cause until shown otherwise."],
["Believing 'only a few'", "Patients minimise what they have taken. Ask to see the packets."],
["Not asking the family", "They can tell you what is different and what has happened before."],
["Forgetting dependants", "Ask who else is in the house and who relies on the patient."]
] });
C.overdose = mk({ name: "Overdose and poisoning",
ask: [
["1", "What was taken? Exact name, strength and form.", "The substance decides everything that follows. Packets are more reliable than memory."],
["2", "How much? Count what is left.", "The amount, set against body weight, decides how serious this is."],
["3", "When? In one go, or staggered over hours?", "Timing decides which hospital tests and treatments apply. Staggered overdoses are assessed differently."],
["4", "Anything else with it: alcohol, other tablets, other substances?", "Mixed overdoses are common and the combination can matter more than either part."],
["5", "Intent: accident, self-harm or recreational? How do they feel now?", "Intent shapes the risk after today and what support the patient needs."],
["6", "Symptoms since: vomiting, drowsiness, pain, breathing, seizures?", "No symptoms does not mean no harm. Some overdoses cause few symptoms early on."],
["7", "Weight, medical conditions, regular medication, alcohol use?", "Body weight and liver health change how dangerous a given amount is."],
["8", "Scene: packets, notes, others exposed? Is a gas or chemical still present?", "The scene holds the evidence, and for gases and chemicals it may still be a risk to you."]
],
flags: [
["Delayed harm", "Patient feels well after an overdose that causes damage hours later."],
["Reduced consciousness or breathing", "Drowsy, slow or shallow breathing, snoring."],
["Heart rhythm effects", "Palpitations, collapse, a very fast or very slow pulse."],
["Carbon monoxide or chemical exposure", "Headache, nausea and confusion, several people affected, possible risk to you."],
["Ongoing intent", "Still wants to die, refuses help, has more available."]
],
feats: [["alert", "Alertness"], ["breath", "Breathing"], ["clue", "Key clue"]],
apart: [
["Sedating substance", "Drowsy or hard to rouse", "Slow and shallow", "Snoring, small pupils"],
["Stimulant substance", "Agitated and restless", "Fast", "Hot, sweaty, fast pulse, large pupils"],
["Carbon monoxide", "Headache, confused", "Normal or fast", "Others affected, better outside"],
["Overdose with delayed harm", "Normal at first", "Normal", "Feels well, so the packets tell the story"]
],
pits: [
["Trusting how well they look", "Looking well in the first hours means very little for some overdoses."],
["Guessing the amount", "Count the empty packets and what is left."],
["Missing the staggered overdose", "Ask whether it was all taken at once."],
["Leaving the packets", "Take them with the patient."],
["Not asking about intent", "Ask whether they meant to harm themselves and how they feel about it now."]
] });
C.older = mk({ name: "Generally unwell older adult",
ask: [
["1", "What has changed, and since when? Ask someone who knows them.", "Off their legs or not themselves is a real presentation. The person who sees them daily can date the change."],
["2", "Confusion: new, or worse than usual? Does it come and go?", "New or fluctuating confusion points to delirium, and delirium has a physical cause."],
["3", "Mobility: walking as normal? Any falls?", "A sudden drop in mobility is often the first sign of acute illness."],
["4", "Eating, drinking, bowels and urine: any change?", "Poor intake and changes in output show how long the patient has been unwell."],
["5", "Infection: cough, urinary symptoms, fever, shivering, skin sores?", "Older patients may have a serious infection without a fever."],
["6", "Pain anywhere, including the chest and abdomen?", "Heart attacks and abdominal emergencies often cause little or no pain at this age."],
["7", "Medication: anything new, stopped, or not being taken?", "Medication changes are a common cause of sudden decline."],
["8", "Home: managing alone? Carers, family, heating, food in the house?", "How the patient was coping before today shapes what is safe now."]
],
flags: [
["Sepsis", "New confusion, fast breathing, fast heart rate or low blood pressure, with or without fever."],
["Heart attack with little pain", "Breathless, sweaty, weak or collapsed, with no chest pain."],
["Stroke", "New weakness, speech change, facial droop or visual loss."],
["Slow bleed after a head injury", "Gradual confusion or drowsiness days or weeks after a fall, especially on blood-thinning medication."],
["Not coping or neglect", "Unkempt, no food, cold house, missed medication, carer under strain."]
],
feats: [["onset", "Onset"], ["course", "Course"], ["attn", "Attention"]],
apart: [
["Delirium", "Hours to days", "Fluctuates through the day", "Poor, easily distracted, drowsy or agitated"],
["Dementia", "Months to years", "Slow, steady decline", "Usually normal until late"],
["Depression", "Weeks", "Persistent low mood", "Normal, but slow to answer"]
],
pits: [
["Accepting 'always confused'", "Ask a relative or carer whether today is different from last week."],
["Waiting for a fever", "Serious infection in older patients often comes without one."],
["Settling on a urine infection", "It is the easy answer. Ask about everything else before you accept it."],
["Not asking about falls", "A fall weeks ago may explain today's confusion."],
["Missing the medication change", "Ask what has been started or stopped in the last month."]
] });
C.bleed = mk({ name: "Bleeding",
ask: [
["1", "Where from, and how did it start? Injury or out of nowhere?", "The source and whether it was provoked narrow the causes straight away."],
["2", "How much? Clots? How long has it been going on?", "Patients estimate blood loss badly. Ask about soaked towels, pads or the toilet bowl."],
["3", "Colour: bright red, dark, or black and tarry?", "Bright red suggests bleeding near the exit. Black, tarry stool suggests bleeding higher in the gut."],
["4", "Faint, dizzy, breathless, palpitations, chest pain?", "These suggest the loss is enough to affect the circulation."],
["5", "Pain with it: abdominal, pelvic, or on opening the bowels?", "Painless and painful bleeding have different causes."],
["6", "Could they be pregnant? Last period? Recently given birth?", "Vaginal bleeding in pregnancy or after a birth is a different and more urgent problem."],
["7", "Blood-thinning medication, bleeding disorders, liver disease, alcohol?", "These make bleeding heavier and harder to stop."],
["8", "Happened before? Recent surgery or procedures, weight loss, bowel change?", "Recent procedures and longer-term symptoms point to the underlying cause."]
],
flags: [
["Significant blood loss", "Pale, clammy, fast pulse, dizzy on standing, confused."],
["Bleeding from the upper gut", "Vomiting blood or dark grainy material. Black tarry stools. Liver disease or heavy alcohol use."],
["Ectopic pregnancy or miscarriage", "Could be pregnant. Bleeding with lower abdominal pain or faintness."],
["Bleeding after birth", "Heavy loss in the hours or weeks after delivery."],
["Nosebleed from the back of the nose", "Blood running down the throat, both nostrils, continuing despite first aid, older patient on blood-thinning medication."]
],
feats: [["colour", "What they see"], ["pain", "Pain"], ["clue", "Key clue"]],
apart: [
["Upper gut bleed", "Vomited blood, or black tarry stool", "Upper abdominal, or none", "Liver disease, alcohol, feels faint"],
["Lower gut bleed", "Dark red, mixed with the stool", "Cramping, or none", "Older, change in bowel habit"],
["Haemorrhoids or a tear", "Bright red on the paper", "Pain or itching at the back passage", "Otherwise well"]
],
pits: [
["Trusting the estimate", "Ask for something you can picture: how many pads, how many towels."],
["Being reassured by normal observations", "Fit patients keep a normal blood pressure until late. Ask how they feel standing up."],
["Forgetting swallowed blood", "A nosebleed can be swallowed and vomited later."],
["Not asking about pregnancy", "Ask before you assume a heavy period."],
["Missing the medication", "Ask specifically about anything that thins the blood."]
] });
C.trauma = mk({ name: "Trauma",
ask: [
["1", "Mechanism: exactly what happened? Speed, height, forces, protection?", "The mechanism predicts injuries before you find them."],
["2", "Time of injury? Trapped, or on the ground for how long?", "Time since injury and time trapped both affect how the patient will behave."],
["3", "Why did it happen? Any collapse, dizziness or chest pain first?", "A medical event may have caused the trauma and needs its own history."],
["4", "Loss of consciousness? Memory of before and after?", "Loss of consciousness or a gap in memory raises concern for a head injury."],
["5", "Pain: where? Neck or back pain? Numbness, tingling, weakness?", "Neck or back pain with altered sensation raises concern for a spinal injury."],
["6", "Bleeding: where, and how much at the scene and since?", "Blood left at the scene never reaches hospital unless you report it."],
["7", "Blood-thinning medication, bleeding disorders, pregnancy, age?", "These turn a modest mechanism into a significant one."],
["8", "Others involved? What happened to them?", "Serious injury to someone else in the same incident raises the likelihood of serious injury in your patient."]
],
flags: [
["Head injury", "Loss of consciousness, vomiting, confusion, worsening headache, on blood-thinning medication."],
["Spinal injury", "Neck or back pain, numbness, weakness, a dangerous mechanism."],
["Chest injury", "Breathlessness, chest pain, unequal chest movement."],
["Hidden bleeding", "Abdominal, pelvic or thigh pain. Pale, clammy, fast pulse."],
["Non-accidental injury", "A story that does not match the injuries, delay in calling, a vulnerable patient."]
],
feats: [["think", "Think of"], ["ask", "Ask about"]],
apart: [
["Fall from height", "Spine, pelvis, heels, head", "Height, landing surface, what hit first"],
["Vehicle collision", "Chest, abdomen, neck, pelvis", "Speed, seat belt, airbags, seat position, damage"],
["Pedestrian or cyclist struck", "Legs, pelvis, head", "Speed, thrown or run over, helmet"],
["Older adult, fall from standing", "Hip, wrist, head, neck", "Cause of the fall, blood-thinning medication, time on the floor"]
],
pits: [
["Distracted by the obvious injury", "The injury you can see is rarely the one that kills. Finish the history."],
["Not asking why it happened", "Ask what the patient was doing and feeling just before."],
["Underestimating low falls", "In older patients a fall from standing can cause major injury."],
["Forgetting the others", "Ask what happened to everyone else involved."],
["Assuming the story is complete", "Bystanders and other crews hold parts of it. Ask them before they leave."]
] });
var CATS = [
["Heart and breathing", "#B42318", "#FDECEA", "bi-heart-pulse", ["chest", "breath", "palp", "allergy"]],
["Brain and nerves", "#6D3FC4", "#F0EAFB", "bi-lightning-charge", ["stroke", "head", "seizure", "dizzy"]],
["Collapse, injury and bleeding", "#B54708", "#FDF0E1", "bi-bandaid", ["fall", "trauma", "bleed"]],
["Abdomen and back", "#7A5D00", "#FBF3D0", "bi-person-standing", ["abdo", "back"]],
["Medical", "#1F6E7D", "#E3F2F5", "bi-clipboard2-pulse", ["diabetic", "older"]],
["Mental health and overdose", "#1D5FB8", "#E6F0FC", "bi-chat-heart", ["mental", "overdose"]],
["Pregnancy and children", "#B4236E", "#FCE8F2", "bi-people", ["preg", "child"]]
];

var SOC = [
{ l: 'S', h: 'Site', what: 'Where the pain is, and whether it is in one spot or spread over an area.', ask: 'Where is the pain? Can you point to it with one finger?', tip: 'One finger or a whole hand tells you whether the pain is localised or diffuse.' },
{ l: 'O', h: 'Onset', what: 'When it started, how quickly it came on and what the patient was doing at the time.', ask: 'When did it start? What were you doing? Did it come on suddenly or build up?', tip: 'Get a clock time where you can. "This morning" is hard to act on later.' },
{ l: 'C', h: 'Character', what: 'What the pain feels like, in the patient\'s own description.', ask: 'What does it feel like?', tip: 'Let the patient choose their own word before you offer options.' },
{ l: 'R', h: 'Radiation', what: 'Whether the pain spreads or moves anywhere else.', ask: 'Does the pain go anywhere else?', tip: 'Follow up with specific places. Patients do not always connect a second pain with the first.' },
{ l: 'A', h: 'Associated symptoms', what: 'Anything else that has appeared alongside the pain.', ask: 'Have you noticed anything else since it started?', tip: 'Start open, then ask directly about the symptoms that matter for this complaint.' },
{ l: 'T', h: 'Timing', what: 'Whether it is constant or comes and goes, how long episodes last and whether it has happened before.', ask: 'Is it there all the time, or does it come and go? Have you had this before?', tip: 'If they have had it before, ask how today compares.' },
{ l: 'E', h: 'Exacerbating and relieving', what: 'Anything that makes the pain better or worse, such as breathing, movement, position, eating or rest.', ask: 'Does anything make it better or worse? Have you tried anything for it?', tip: 'Record what the patient has already tried and whether it helped.' },
{ l: 'S', h: 'Severity', what: 'How bad the pain is, as a score the patient gives you.', ask: 'How bad is it out of ten, now and at its worst?', tip: 'Ask again later. The change in score tells you more than the first number.' }
];
var ROS = [
{ h: 'General', what: 'Fever, shivering, tiredness, appetite change, unintended weight loss.', ask: 'Have you felt feverish, or more tired than usual? How has your appetite been?', tip: 'A vague feeling of not being right is still worth recording.' },
{ h: 'Neurological', what: 'Headache, dizziness, visual change, weakness, numbness or tingling, speech difficulty, fits, loss of consciousness.', ask: 'Any headaches, dizziness or changes in your vision? Any weakness or numbness?', tip: 'Ask a witness about confusion or blackouts. The patient may not know.' },
{ h: 'Cardiorespiratory', what: 'Chest pain, breathlessness, palpitations, cough, sputum, wheeze, ankle or leg swelling.', ask: 'Any chest pain, breathlessness or cough? Are you bringing anything up?', tip: 'Compare today with normal: how far can they usually walk?' },
{ h: 'Gastrointestinal', what: 'Abdominal pain, nausea, vomiting, difficulty swallowing, change in bowel habit, blood in vomit or stool.', ask: 'Any tummy pain or sickness? Any change in your bowels?', tip: 'Ask about colour and blood directly. People rarely volunteer it.' },
{ h: 'Urinary', what: 'Passing urine more or less often, pain or burning, urgency, blood in the urine.', ask: 'Any pain or burning when you pass water? Are you going more or less than usual?', tip: 'Ask when they last passed urine.' },
{ h: 'Musculoskeletal', what: 'Joint or muscle pain, stiffness, swelling, reduced movement, recent falls.', ask: 'Any new aches, stiffness or swelling? Have you had any falls?', tip: 'Compare with what is normal for this patient.' },
{ h: 'Skin', what: 'Rashes, colour change, bruising, wounds, sore or pressure areas.', ask: 'Any new rashes, bruises or sore areas?', tip: 'Look as well as ask.' },
{ h: 'Gynaecological', what: 'Vaginal bleeding or discharge, last menstrual period, possibility of pregnancy, contraception.', ask: 'When was your last period? Is there any chance you could be pregnant?', tip: 'Ask in private where you can, and explain why you are asking.' }
];
var MODEL = [
{ h: 'Presenting complaint', what: 'The reason for the call, in a few words. It sets the direction for everything that follows.', ask: 'What has made you call us today?', tip: 'Record it in the patient\'s own words where you can.' },
{ h: 'History of presenting complaint', what: 'The full story of this problem: when it began, what it is like and how it has changed.', ask: 'Talk me through it from the start. Then use SOCRATES to fill the gaps.', tip: 'Let the patient talk first. Open questions early, closed questions later.' },
{ h: 'Past medical history', what: 'Current and previous conditions, operations and hospital admissions.', ask: 'Do you see your GP or the hospital for anything? Has this happened before?', tip: 'Well-controlled conditions get forgotten. The medication list often reveals them.' },
{ h: 'Medications and allergies', what: 'Everything taken regularly, anything started or stopped recently, and any allergies with the reaction they cause.', ask: 'What do you take regularly? Has anything changed lately? Are you allergic to anything?', tip: 'Ask to see the boxes or the repeat prescription.' },
{ h: 'Social history', what: 'Home situation, support, mobility, occupation, smoking, alcohol and recreational drug use.', ask: 'Who is at home with you? How do you normally manage day to day?', tip: 'Ask it plainly and without judgement. People answer honestly when it sounds routine.' },
{ h: 'Family history', what: 'Conditions that run in the close family, such as heart disease, stroke or diabetes.', ask: 'Does anything run in the family? How old were they when it happened?', tip: 'The age a relative was affected matters as much as the condition.' },
{ h: 'Review of systems', what: 'A sweep through the other body systems for symptoms the patient has not mentioned.', ask: 'Any problems with your breathing, your stomach or bowels, or passing water?', tip: 'Keep it relevant to the complaint, and record the important negatives as well as the positives.' }
];
var DOC = [
{ ab: 'PC', h: 'Presenting complaint', t: 'One line, in the patient\'s words where you can.' },
{ ab: 'HPC', h: 'History of presenting complaint', t: 'The full story with times, plus the relevant positives and negatives.' },
{ ab: 'OA', h: 'On arrival', t: 'What you found: where the patient was, their position, how they looked and who was with them.' },
{ ab: 'SH', h: 'Social history', t: 'Living situation and support, mobility, smoking and alcohol.' },
{ ab: 'PMH', h: 'Past medical history', t: 'Current and previous conditions, and relevant family history.' },
{ ab: 'ALLERGIES', h: '', t: 'Any allergies and the reaction they cause, or no known allergies.' },
{ ab: 'MEDS', h: 'Medications', t: 'What the patient takes regularly, and anything started or stopped recently.' },
{ ab: 'OE', h: 'On examination', t: 'Findings in ABCDE order, with your observations.' },
{ ab: 'IMP', h: 'Impression', t: 'Your working impression and the differentials you considered, with reasons.' },
{ ab: 'T', h: 'Treatment', t: 'What you did, when you did it and how the patient responded.' },
{ ab: 'P', h: 'Plan', t: 'Where the patient is going and why, any pre-alert or referral, and the advice you gave.' }
];
var GAP = {
chest: ["58-year-old man. Central, heavy chest pain for 40 minutes that came on while carrying shopping. Seven out of ten, constant, nothing eases it. Feels sick and sweaty. High blood pressure, smokes.", "Does the pain go anywhere else?", "How bad is it out of ten?", "When did it start?", "Radiation was never asked. Spread to the arm, jaw or back changes which causes you are most worried about."],
breath: ["70-year-old woman. Breathless since last night and getting worse. Cannot finish a sentence. No chest pain, no fever. Known heart failure, ankles more swollen this week.", "Is it worse when you lie flat?", "When did it start?", "Do you have any chest pain?", "Position was not asked. Breathlessness lying flat points towards fluid on the lungs."],
palp: ["24-year-old woman. Heart racing for 20 minutes during a netball match. Started suddenly, feels regular. Felt dizzy. No chest pain. No medical history.", "Has anyone in your family died suddenly at a young age?", "Does it feel regular or irregular?", "Did it start suddenly?", "Family history was not asked. Palpitations on exertion in a young patient need the question about sudden death in relatives."],
allergy: ["30-year-old man. Itchy rash and swollen lips ten minutes after eating at a restaurant. No wheeze, does not feel faint. Has had a reaction before.", "Has your voice changed, or is it hard to swallow?", "How quickly did it start?", "Do you feel faint?", "The airway was not fully explored. Voice change and difficulty swallowing are early signs that swelling is spreading."],
stroke: ["76-year-old man found by his wife at 8am with slurred speech and a weak right arm. No headache, no seizure. Takes blood-thinning medication. Normally independent.", "When was he last seen well?", "Does he take blood-thinning medication?", "Was there a headache at the start?", "Found at 8am is not an onset time. The last time he was seen well decides which hospital treatments are possible."],
head: ["35-year-old woman. Headache at the back of the head, nine out of ten, with vomiting. Dislikes the light. No fever, no rash, no weakness. Gets migraines.", "How long did it take to reach its worst?", "Any fever or rash?", "How bad is it out of ten?", "Speed of onset was not asked. A headache that reaches its worst within a minute raises concern for a bleed, even in someone with migraines."],
seizure: ["19-year-old man collapsed at a gig. Friends saw him go stiff, then jerk for about a minute. He bit his tongue and is drowsy now. No known epilepsy.", "Any head injury, alcohol or drugs today?", "How long did it last?", "Is he known to have epilepsy?", "This is a first seizure, so it needs a cause. Head injury, alcohol and drugs were never asked about."],
dizzy: ["68-year-old man. Sudden dizziness for two hours, constant, with vomiting. Not brought on by head movement. No hearing change. No palpitations.", "Any double vision, slurred speech or trouble walking?", "Is it brought on by moving your head?", "Any change in your hearing?", "The neurological questions were missed. Constant dizziness with no trigger needs a stroke at the back of the brain considering."],
fall: ["82-year-old woman on the kitchen floor. Says she tripped on the mat. Hip pain, cannot stand. Did not hit her head. Lives alone. Takes blood-thinning medication.", "How long have you been on the floor?", "Did you hit your head?", "Do you take blood-thinning medication?", "Time on the floor was not asked. A long lie brings its own problems, including pressure damage, cold and dehydration."],
trauma: ["45-year-old driver. Single car into a tree at about 40 miles an hour. Seat belt on, airbags fired. Chest pain where the belt was. No neck pain. Remembers everything.", "Did you feel unwell before the crash?", "Were you wearing a seat belt?", "Do you have any neck pain?", "Nobody asked why it happened. A medical event may have caused the crash and needs its own history."],
bleed: ["28-year-old woman. Vaginal bleeding since this morning, heavier than a period, with one-sided lower abdominal pain. Feels dizzy on standing. No clots.", "Could you be pregnant? When was your last period?", "How heavy is the bleeding?", "Do you feel dizzy?", "Pregnancy was not asked. Bleeding with one-sided pain and dizziness needs an ectopic pregnancy considering."],
abdo: ["67-year-old man. Sudden severe abdominal pain 30 minutes ago, constant, nine out of ten. Vomited once. Bowels opened this morning. Smoker with high blood pressure.", "Does the pain go through to your back?", "When did it start?", "Have your bowels opened?", "Radiation was not asked. Sudden pain going through to the back in a man over 60 raises concern for the aorta."],
back: ["41-year-old woman. Lower back pain for three days after lifting. Shooting pain down both legs. Eight out of ten, worse on movement. No fever, no history of cancer.", "Any change in your bladder or bowels, or numbness between your legs?", "Does the pain go down your legs?", "Have you had a fever?", "The cauda equina questions were missed. Pain down both legs makes them essential."],
diabetic: ["22-year-old with type 1 diabetes. Vomiting since last night, abdominal pain, very thirsty. Readings high all day. Breathing deeply. Last ate yesterday.", "Have you been unwell with anything else, or missed any doses?", "What have your readings been?", "Are you thirsty?", "The trigger was not asked. Infection and missed doses are the usual reasons control is lost."],
older: ["88-year-old man, not himself for two days according to his daughter. More confused than usual and not eating. No cough, no urinary symptoms, no fever, no pain.", "Has he had any falls recently?", "Is the confusion new?", "Any cough or urinary symptoms?", "Falls were not asked. A fall days or weeks ago can explain new confusion."],
mental: ["34-year-old man, call made by his partner. Low for weeks, not sleeping, drinking tonight. Says he cannot go on. Says he has not taken anything. Partner is with him.", "Are you thinking about ending your life, and do you have a plan?", "Have you taken anything?", "Have you been drinking?", "Nobody asked directly. 'Cannot go on' needs a plain question about suicide, plan and intent."],
overdose: ["19-year-old woman. Took tablets from the bathroom cabinet after an argument. About 20 tablets, packets on the bed. No alcohol. Feels fine, no vomiting. Says she regrets it.", "When did you take them, and was it all at once?", "How many did you take?", "Did you drink any alcohol?", "Timing was not asked. When the tablets were taken, and whether in one go, decides the hospital tests and treatment."],
preg: ["31 weeks pregnant, second pregnancy. Headache since yesterday, swollen hands and face, pain under the ribs. No bleeding, no contractions.", "How are the baby's movements?", "Have you had any bleeding?", "How many weeks pregnant are you?", "Movements were not asked. Reduced movements can be the only warning that the baby is in difficulty."],
child: ["14-month-old boy. Fever for two days, 39 degrees by ear thermometer. Runny nose and cough. No rash. Mum says he is sleepier than usual.", "How much is he drinking, and how many wet nappies?", "How long has he had the fever?", "Is there a rash?", "Fluids were not asked. Intake and wet nappies are the best history clues to dehydration."]
};
window.HT_DATA = { C: C, CATS: CATS, SOC: SOC, ROS: ROS, MODEL: MODEL, DOC: DOC, GAP: GAP };
})();
