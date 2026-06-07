/* ==================== PLACEMENT FRAMEWORKS — CONTENT DATA ==================== */
/* ParaMind — Student on Placement section
 * Single source of framework content for the placement lesson pages.
 * Content policy: no specific drug names, no doses, no calculations.
 * Generic drug CLASSES, procedural theory, vital signs and 12-lead ECGs are permitted.
 *
 * Year 1 frameworks are fully authored (FREE tier).
 * Year 2 and Year 3 are stubbed (PRO) — content added in a later pass.
 */

window.PLACEMENT_YEARS = {
  1: { label: 'First year', tagline: 'Your placements, and the frameworks to build first.', free: true },
  2: { label: 'Second year', tagline: 'Building your clinical reasoning and communication.', free: false },
  3: { label: 'Third year', tagline: 'Decisions, autonomy, and performance under pressure.', free: false }
};

window.PLACEMENT_FRAMEWORKS = [

  /* ---------- YEAR ONE (FREE) ---------- */

  {
    id: 1, number: 1, year: 1, section: 'Section 1 · Before you touch the patient',
    title: 'The job in your head',
    summary: 'Using the dispatch information to prepare your thinking — without letting it replace your thinking.',
    whyItMatters: [
      'Control gives you an age, a location, a chief complaint. On the way in, your brain starts building a picture. That picture is useful — it means you arrive prepared, not cold.',
      'But by the time you pull up, that picture has often hardened into a conclusion. And once you have decided what this job is, you start filtering everything you see through that decision. Details that fit get noticed; details that do not fit get quietly ignored. That is confirmation bias, and it catches experienced clinicians, not just students. The dispatch information is a starting point. It is never the answer.'
    ],
    analogyIcon: 'bi-cloud-sun',
    analogy: 'Think of it like a weather forecast. It says rain, so you grab an umbrella — sensible. But you do not cancel your whole day, and you do not stay convinced it will rain when the sun comes out. The forecast informed your preparation; it did not determine your reality.',
    steps: [
      'As you travel, use the information to prepare — what might you need, what are the likely presentations.',
      'As you arrive, consciously set it aside. Give yourself permission to find something completely different — because sometimes you will.'
    ],
    onSceneSetup: 'You are travelling to a 45-year-old man, chest pain, started an hour ago. A classic cardiac picture forms — your likely kit out, a 12-lead on your mental list, crew briefed. You arrive. He is at the kitchen table, colour good, calm. His wife mentions he has been moving furniture all morning. He points to one very specific spot on his chest wall that hurts more when he presses it.',
    onSceneReveal: 'The dispatch was not wrong — chest pain is chest pain. But the scene is already telling a different story, and you are only reading it because you arrived ready to find anything, not just the thing Control told you.',
    tryItScenario: 'You are sent to a 65-year-old woman, collapsed, unresponsive. On arrival she is sitting up in bed, alert, and a little confused about why the ambulance is there.',
    tryItQuestions: 'What did you prepare for on the way? What is the scene actually telling you? What three things do you want to find out first?',
    hollieSample: 'Good start. You prepared for an unconscious patient and arrived to someone alert — so the gap between expectation and reality is itself the interesting bit. What might explain a collapse that has now resolved? Pick one, and tell me the first thing you would ask her to test it.'
  },

  {
    id: 2, number: 2, year: 1, section: 'Section 1 · Before you touch the patient',
    title: 'Reading the scene',
    summary: 'Taking in the environment, the bystanders, the mechanism and the hazards in the first thirty seconds — before you focus on the patient.',
    whyItMatters: [
      'Every student knows to check the scene is safe. But there is a difference between checking for obvious hazards and actually reading a scene — and that difference can change everything.',
      'The patient is only part of the story; the scene is the rest of it. A front door wide open on a cold morning. A kitchen that smells of alcohol at nine. Medication bottles that do not match the age of the person in the chair. A child nobody has introduced. These details do not shout — they sit quietly in the background while you focus on the patient, and if you have not built the habit of reading the scene, you walk right past them.'
    ],
    analogyIcon: 'bi-search',
    analogy: 'Think of yourself as a detective arriving at a scene. A good detective does not walk straight up to the body. They stop in the doorway and look at the whole room first — asking the scene questions before they ask anyone else.',
    steps: [
      'Safety — a genuine read, not a box-tick. Is this safe to enter, or do I need to make it safer first?',
      'Mechanism — what has happened here, and does it match what Control told you?',
      'Context — who else is here, how are bystanders behaving, is the home kept or chaotic, any signs of self-neglect?',
      'The patient at a distance — colour, position, engagement, before you are close enough to touch.'
    ],
    onSceneSetup: 'A 40-year-old man, unwell. He is on the sofa, pale and sweaty — what Control said, what you can see. But in your first thirty seconds you have also clocked three empty cans of strong lager, a sharps bin by the television, and his partner in the kitchen doorway, arms folded, not making eye contact with anyone.',
    onSceneReveal: 'None of those details are your primary survey. But all of them are clinically relevant. The scene has already told you something about the complexity of this job — and you have not taken a history yet.',
    tryItScenario: 'You arrive at a third-floor flat, the lift broken. An elderly neighbour meets you — they have not seen the occupant, a 70-year-old woman, for three days. The door is unlocked.',
    tryItQuestions: 'Before you go in: what are you looking for in the first thirty seconds? What would concern you? What would reassure you?',
    hollieSample: 'You have got the right instinct stopping at the door. Three days unseen, an unlocked door, a frail occupant — what does the environment need to tell you before you commit to going in alone? Name the one thing that would make you wait for backup.'
  },

  {
    id: 3, number: 3, year: 1, section: 'Section 1 · Before you touch the patient',
    title: 'Your first impression',
    summary: 'Forming an immediate, instinct-driven judgement about how unwell someone is — and learning to trust, test, and act on it.',
    whyItMatters: [
      'Ask any experienced paramedic and they will tell you they knew something was wrong before they could explain why. The colour was off. The breathing did not look right. The patient was too still. That is not magic — it is pattern recognition, and you can start building it now.',
      'Your brain takes in skin colour, breathing, muscle tone, eye contact and posture — dozens of signals — and produces a summary: sick or not sick. Students are often taught to distrust this. There is truth in the caution, but dismissing it entirely is also a mistake. Your first impression is data. It is not a diagnosis. Treat it like evidence — test it, do not ignore it.'
    ],
    analogyIcon: 'bi-bell',
    analogy: 'Think of your first impression as a smoke alarm. It does not tell you where the fire is or what is burning. What it does is alert you that something needs investigating, right now — and it shifts you from routine to urgent.',
    steps: [
      'Notice — give it a word in the first five seconds: sick, not sick, something is off.',
      'Hold it — keep it as a working hypothesis. Do not act on it blindly, but do not dismiss it either.',
      'Test it — check it against what your assessment finds. The first impression that does not match the clinical picture is one of the most important signals in practice.'
    ],
    onSceneSetup: 'A 55-year-old woman called 999 feeling generally unwell. She opens the door herself, walking and talking, and says she feels a bit dizzy and tired — sounds low-acuity. But something fires: she is a strange colour, she is holding the door frame, and her smile did not reach her eyes. So you sit her down straight away and go to your assessment.',
    onSceneReveal: 'Her blood pressure is 84 over 50, heart rate 112. She has been bleeding internally for two days and assumed it was nothing. The assessment found it — the first impression made sure you were looking properly.',
    tryItScenario: 'You walk into a living room to find a 30-year-old man on the floor with his back against the sofa. His girlfriend says he has had a panic attack. He is conscious, eyes open.',
    tryItQuestions: 'What do you notice in the first five seconds? What would make your alarm fire — and what would reassure you that this is straightforward?',
    hollieSample: 'A panic attack is the label you have been handed — and it might be right. But your first impression is its own data point. What in those first five seconds would tell you this is more than anxiety? Pick the single sign you would not want to miss here.'
  },

  {
    id: 4, number: 4, year: 1, section: 'Section 2 · The primary survey',
    title: 'ABCDE — but actually',
    summary: 'Understanding why ABCDE works in that order — and using it as a genuine thinking tool, not a mechanical chant.',
    whyItMatters: [
      'You have known ABCDE since week one. But here is a question most students cannot answer confidently: why is it in that order — why does Airway come before Breathing, and Breathing before Circulation? If you cannot answer that, you are using it as a mnemonic, not a framework. A mnemonic gets you through an exam; a framework gets you through a bad job at three in the morning.',
      'The order is built on one ruthless principle: deal with the thing most likely to kill your patient first. An unmanaged airway kills faster than compromised breathing, which kills faster than circulatory failure, which kills faster than an altered level of consciousness. At each step you are asking: is this killing my patient right now? If yes, deal with it before moving on.'
    ],
    analogyIcon: 'bi-list-ol',
    analogy: 'Think of ABCDE as a triage system for your own assessment. A good triage nurse does not see patients in the order they arrived — they see them in order of need. ABCDE does the same thing inside a single patient: you are triaging problems by lethality.',
    steps: [
      'Find it — work through in order of what is most likely to kill the patient first.',
      'Fix it — when you find a problem, address it (or begin to) before you move on. An airway that needs opening gets opened at A, not noted and revisited later.',
      'Move on — only once the current problem is dealt with.'
    ],
    onSceneSetup: 'A 68-year-old man slumped in his chair. At A you find his airway is partly obstructed — an audible gurgle on inspiration. You reposition his head and insert an airway adjunct. The gurgle resolves. Now you move to B.',
    onSceneReveal: 'Not before. Not halfway through A while checking his breathing rate. Until that airway is clear, nothing else you find is as important. A student who notes the gurgle, carries on, and plans to come back to it has misunderstood the framework. Find it, fix it, move on.',
    tryItScenario: 'A 45-year-old woman after a road traffic collision, conscious and talking but clearly distressed. At C you find her radial pulse is weak and her skin is pale and clammy.',
    tryItQuestions: 'What does the framework tell you to do at this point? Do you continue to D, or does C require your attention first? What are you looking for, and what are you doing about it?',
    hollieSample: 'You have found something at C. Before you tell me what you would do, tell me what the framework says about timing: does C get dealt with now, or noted and parked while you press on to D? Then walk me through what a weak radial pulse and clammy skin are pointing you towards.'
  },

  {
    id: 6, number: 6, year: 1, section: 'Section 2 · The primary survey',
    title: 'The vital signs story',
    summary: 'Reading a set of observations as a connected story — not a collection of separate numbers to record and move on from.',
    whyItMatters: [
      'Ask a student what a heart rate of 118 means and they will say tachycardic. Ask what 118 combined with a blood pressure of 96 over 64, a respiratory rate of 24, pale clammy skin and a GCS of 14 means together — that is a different question entirely.',
      'Vital signs do not exist in isolation. They are a conversation your patient\u2019s body is having with you. Each value tells you something, but the relationship between them tells you far more. A single set is a snapshot. A second set is a direction of travel. The direction matters more than the number.'
    ],
    analogyIcon: 'bi-speedometer2',
    analogy: 'Think of vital signs like the dashboard of a car. One warning light is information. But the fuel light, a climbing temperature gauge, and an oil warning all at once is a different situation entirely — pull over now. You are reading the whole dashboard, not one gauge.',
    steps: [
      'Do these numbers make sense together? A rate climbing while pressure falls tells you what the body is compensating for. Several mildly abnormal values pointing the same way often worry more than one dramatic one.',
      'What is the trend? One set is information, two is a direction, three is a story.',
      'Do the numbers match what I can see? When appearance and obs disagree, that discrepancy is itself a finding.'
    ],
    onSceneSetup: 'A 58-year-old woman, generally unwell. First obs: heart rate 102, blood pressure 108 over 70, respiratory rate 20, SpO2 96% on air, temperature 38.9. Individually, each value is only mildly off.',
    onSceneReveal: 'But read the dashboard — every value is pointing the same way: the body is working hard, and something is driving it. Ten minutes later: heart rate 110, blood pressure 102 over 66, respiratory rate 22. Now you have a direction of travel, and the story is getting louder. This is a patient who needs hospital, not reassurance.',
    tryItScenario: 'A 35-year-old man who has taken an overdose of an over-the-counter painkiller about four hours ago. He is alert and talking, says he feels fine and does not want to go to hospital. His obs: heart rate 88, blood pressure 124 over 78, respiratory rate 16, SpO2 99%, temperature 36.8 — all normal.',
    tryItQuestions: 'What does the vital signs story tell you here? What are you watching for over time, and how does it change your clinical decision?',
    hollieSample: 'Here is the trap: the obs are reassuringly normal. But the story is about time, not this snapshot. Why might a normal set of numbers four hours in be misleading with this kind of overdose? What does that tell you about whether \u201cI feel fine\u201d should change your plan?'
  },

  {
    id: 7, number: 7, year: 1, section: 'Section 3 · History taking',
    title: 'SAMPLE done properly',
    summary: 'Taking a structured history that actually tells you something — rather than filling boxes on a form.',
    whyItMatters: [
      'SAMPLE — signs and symptoms, allergies, medications, past medical history, last meal, events — is one of the first mnemonics you learn. But most students use it as a data-collection exercise: go through the letters, record the answers, move on. The boxes are ticked, and yet you have learned little about the person.',
      'There is a difference between asking what medications someone takes and thinking about what those medications tell you. SAMPLE is a framework for thinking, not a form for filing. The best history-takers are not the ones who remember the letters most reliably — they are the ones who listen to the answers and follow the threads.'
    ],
    analogyIcon: 'bi-signpost-2',
    analogy: 'Think of SAMPLE as a map rather than a route. A map gives you the direct way — and the side roads a good navigator knows to explore. SAMPLE gives you the map; following the threads is the navigation.',
    steps: [
      'When a patient lists a cluster of medications that go together — a blood-pressure tablet, a beta-blocker and a water tablet, say — that combination itself almost certainly points to an underlying condition, like a cardiac history. That is a thread; follow it.',
      'For every answer, ask one question before moving on: does this change what I think is happening? If yes, stay on the thread. If no, move forward.'
    ],
    onSceneSetup: 'A 71-year-old man, increasingly breathless over two days. His medications: a cholesterol tablet, a diabetes tablet, and a blood-pressure tablet that is also used in heart failure. Past history of type 2 diabetes and high blood pressure. A student records this and moves to last meal.',
    onSceneReveal: 'A clinician stops at medications. The mix points to a cardiovascular risk picture and a long-term metabolic condition — and that blood-pressure tablet is also a heart-failure drug. Is this someone who already has a cardiac diagnosis they have not mentioned, now tipping into heart failure? Two seconds of thinking, three threads to follow. The history just got far more useful.',
    tryItScenario: 'A 58-year-old woman, generally unwell for 24 hours. She takes a thyroid tablet and an antidepressant, has a history of depression and a thyroid problem, and her symptoms started after a busy week at work.',
    tryItQuestions: 'What threads are hiding in this history? What does her medication list tell you beyond the obvious? What do you want to know next — and why?',
    hollieSample: 'You have a thyroid tablet and an antidepressant in front of you. Each is a thread. What does a thyroid condition let you ask about that you might otherwise skip? And before you settle on \u201cbusy week\u201d as the cause, what is the question that would either support or undermine that?'
  },

  {
    id: 17, number: 17, year: 1, section: 'Section 6 · Communication',
    title: 'Talking to patients',
    summary: 'Communicating in a way that builds trust, gathers better information, and makes the interaction feel human — whatever the clinical complexity behind it.',
    whyItMatters: [
      'You will speak to more patients than you will perform any single intervention, yet the quality of those conversations is rarely taught in detail. It matters two ways at once.',
      'Clinically: patients who feel listened to give better histories and mention the detail they would otherwise hold back. Humanly: the person is frightened, maybe in pain, and has let a stranger into their home on one of the worst days of their life. What you say and how you say it decides whether that feels safe and dignified, or cold and transactional. The first thirty seconds set the tone for everything that follows.'
    ],
    analogyIcon: 'bi-broadcast',
    analogy: 'Think of it like tuning a radio. When you walk in, the patient is broadcasting on a frequency — fear, pain, confusion, anger, relief. Your job in the first thirty seconds is to find it and match it, not to impose your own.',
    steps: [
      'Your opening — introduce yourself by first name, say you have got time even when you do not, and get down to their level. Standing over someone makes them feel small, and small people give less information.',
      'Your language — no unexplained jargon, short sentences when someone is distressed, and check understanding without making them feel stupid: \u201cjust so I am clear, can you tell me in your own words?\u201d',
      'Your presence — look up from the paperwork, respond to what they actually say, and be honest and kind when the news is hard.'
    ],
    onSceneSetup: 'A 79-year-old woman who has fallen, embarrassed and distressed. Before you touch her or assess anything, you crouch to her level, make eye contact, and say: \u201cMy name is Sarah. You called the right people. Let us take a breath and sort this out together — we have got time.\u201d',
    onSceneReveal: 'Fifteen seconds. But she is no longer just a fallen patient — she is a person who feels seen, and she will give you a better history and feel far less anxious as a result. The clinical outcome begins with the conversation.',
    tryItScenario: 'A 45-year-old man on the sofa when you arrive, visibly embarrassed. His partner called 999 without telling him, and he is insisting he is fine — avoiding eye contact, arms crossed.',
    tryItQuestions: 'What does the room tell you about his frequency? What do you say first — and what do you deliberately not say? How do you open this in a way that gives you the best chance of an accurate history?',
    hollieSample: 'He is broadcasting embarrassment and a bit of defensiveness — arms crossed, no eye contact, \u201cI\u2019m fine.\u201d If you match that frequency rather than fighting it, what is your opening line? And what is the thing you would deliberately not say in the first thirty seconds?'
  },

  /* ---------- YEAR TWO (PRO) — stubs, content added later ---------- */
  { id: 5,  number: 5,  year: 2, section: 'Section 2 · The primary survey', title: 'When ABCDE breaks', stub: true },
  { id: 8,  number: 8,  year: 2, section: 'Section 3 · History taking', title: 'SOCRATES — the pain conversation', stub: true },
  { id: 9,  number: 9,  year: 2, section: 'Section 3 · History taking', title: 'The reluctant patient', stub: true },
  { id: 10, number: 10, year: 2, section: 'Section 4 · Clinical thinking', title: 'Spot the pattern', stub: true },
  { id: 11, number: 11, year: 2, section: 'Section 4 · Clinical thinking', title: 'The differential mindset', stub: true },
  { id: 12, number: 12, year: 2, section: 'Section 4 · Clinical thinking', title: 'Red flags and safety netting', stub: true },
  { id: 18, number: 18, year: 2, section: 'Section 6 · Communication', title: 'ATMIST — pre-alert and handover', stub: true },
  { id: 21, number: 21, year: 2, section: 'Section 6 · Communication', title: 'Talking to your crew', stub: true },

  /* ---------- YEAR THREE (PRO) — stubs, content added later ---------- */
  { id: 13, number: 13, year: 3, section: 'Section 4 · Clinical thinking', title: 'What am I missing?', stub: true },
  { id: 14, number: 14, year: 3, section: 'Section 5 · Treatment and decision making', title: 'The treatment ladder', stub: true },
  { id: 15, number: 15, year: 3, section: 'Section 5 · Treatment and decision making', title: 'Stay or go', stub: true },
  { id: 16, number: 16, year: 3, section: 'Section 5 · Treatment and decision making', title: 'JRCALC as a tool, not a script', stub: true },
  { id: 19, number: 19, year: 3, section: 'Section 6 · Communication', title: 'Talking to your GP, 111 and other agencies', stub: true },
  { id: 20, number: 20, year: 3, section: 'Section 6 · Communication', title: 'Difficult conversations', stub: true },
  { id: 22, number: 22, year: 3, section: 'Section 7 · When it goes wrong', title: 'Fixation error', stub: true },
  { id: 23, number: 23, year: 3, section: 'Section 7 · When it goes wrong', title: 'Cognitive overload', stub: true },
  { id: 24, number: 24, year: 3, section: 'Section 7 · When it goes wrong', title: 'The deliberate reset', stub: true },
  { id: 25, number: 25, year: 3, section: 'Section 7 · When it goes wrong', title: 'Human factors on the road', stub: true }

];

window.PLACEMENT_ADVICE = {
  1: ['Before your first shift \u2014 be ready', 'Your first few shifts', 'When a job gets to you', 'Asking questions without feeling daft'],
  2: ['Taking more of the lead', 'Managing tiredness and shifts', 'When you make a mistake'],
  3: ['Becoming the decision-maker', 'Preparing for sign-off', 'Looking after yourself long-term']
};
