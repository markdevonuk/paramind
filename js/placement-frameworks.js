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
  {
    id: 1, number: 1, year: 1, section: 'Section 1 \u00b7 Before you touch the patient',
    title: 'The job in your head',
    summary: 'Use the dispatch detail to prepare your thinking \u2014 not to replace it.',
    whyItMatters: [
      'Control gives you an age, a location, a complaint, and on the way in your brain builds a picture. That\u2019s useful \u2014 you arrive prepared, not cold.',
      'The danger is the picture hardening into a conclusion. Once you\u2019ve decided what the job is, you notice the details that fit and skip the ones that don\u2019t. That\u2019s confirmation bias \u2014 and it catches experienced medics too. Dispatch is a starting point, never the answer.'
    ],
    analogyIcon: 'bi-cloud-sun',
    analogy: 'Like a weather forecast. It says rain, so you take an umbrella \u2014 sensible. But you don\u2019t stay convinced it\u2019ll rain once the sun\u2019s out. It shapes your prep, not your reality.',
    steps: [
      'On the way in, use it to prepare \u2014 likely kit, likely presentations.',
      'As you arrive, set it aside. Let yourself find something completely different.'
    ],
    onSceneSetup: 'You\u2019re sent to a 45-year-old man, chest pain, started an hour ago. A cardiac picture forms \u2014 kit ready, 12-lead on your mental list. You arrive: he\u2019s at the kitchen table, good colour, calm. His wife says he\u2019s been shifting furniture all morning, and he points to one spot on his chest wall that hurts more when he presses it.',
    onSceneReveal: 'Dispatch wasn\u2019t wrong \u2014 chest pain is chest pain. But the scene\u2019s telling a different story, and you only caught it because you arrived ready to find anything.',
    tryItScenario: 'You\u2019re sent to a 65-year-old woman, collapsed, unresponsive. You arrive and she\u2019s sitting up in bed, alert, a bit puzzled about why you\u2019re there.',
    tryItQuestions: 'What did you prepare for? What\u2019s the scene actually telling you? What three things do you want to find out first?',
    hollieSample: 'Good start. You prepared for someone unconscious and arrived to someone alert \u2014 that gap is the interesting bit. What could explain a collapse that\u2019s now resolved? Pick one, and tell me the first thing you\u2019d ask to test it.',
    wrapPoint: 'Dispatch primes you; it shouldn\u2019t decide for you. Arrive prepared, then let the patient in front of you rewrite the script.',
    takeaways: ['Use dispatch to prepare, not to conclude.', 'Watch for the details that don\u2019t fit your expectation.', 'The scene beats the script \u2014 every time.']
  },
  {
    id: 2, number: 2, year: 1, section: 'Section 1 \u00b7 Before you touch the patient',
    title: 'Reading the scene',
    summary: 'Read the environment, bystanders, mechanism and hazards in the first thirty seconds \u2014 before you focus on the patient.',
    whyItMatters: [
      'Everyone checks a scene is safe. Reading a scene is different \u2014 and that difference changes jobs.',
      'The patient is half the story; the scene is the rest. A door wide open on a cold morning. A kitchen that smells of alcohol at nine. Medication that doesn\u2019t match the person in the chair. A child nobody mentioned. These details don\u2019t shout \u2014 and if you haven\u2019t built the habit, you walk straight past them.'
    ],
    analogyIcon: 'bi-search',
    analogy: 'Be the detective who doesn\u2019t walk straight to the body. Stop in the doorway and read the whole room first \u2014 ask the scene questions before you ask anyone else.',
    steps: [
      'Safety \u2014 a real read, not a tick. Safe to enter, or do I make it safer first?',
      'Mechanism \u2014 what happened here, and does it match what Control said?',
      'Context \u2014 who else is here, how are they behaving, any signs of neglect?',
      'The patient from a distance \u2014 colour, position, engagement, before you touch.'
    ],
    onSceneSetup: 'A 40-year-old man, unwell, pale and sweaty on the sofa \u2014 as dispatched. But in your first thirty seconds you\u2019ve also clocked three empty cans of strong lager, a sharps bin by the TV, and his partner in the doorway, arms folded, not looking at anyone.',
    onSceneReveal: 'None of that is your primary survey \u2014 but all of it is clinically relevant. The scene has already told you how complex this job is, and you haven\u2019t taken a history yet.',
    tryItScenario: 'Third-floor flat, lift broken. A neighbour meets you \u2014 hasn\u2019t seen the occupant, a 70-year-old woman, for three days. The door\u2019s unlocked.',
    tryItQuestions: 'Before you go in: what are you looking for in the first thirty seconds? What would worry you? What would reassure you?',
    hollieSample: 'Good instinct stopping at the door. Three days unseen, an unlocked door, a frail occupant \u2014 what does the scene need to tell you before you commit to going in alone? Name the one thing that would make you wait for backup.',
    wrapPoint: 'The patient is only part of the picture. The scene carries the rest \u2014 read it before you kneel down, not after.',
    takeaways: ['Reading a scene is more than checking it\u2019s safe.', 'The quiet details matter most \u2014 build the habit of seeing them.', 'Look before you touch.']
  },
  {
    id: 3, number: 3, year: 1, section: 'Section 1 \u00b7 Before you touch the patient',
    title: 'Your first impression',
    summary: 'Form a fast, instinct-driven read of how unwell someone is \u2014 then test it rather than trust it blindly.',
    whyItMatters: [
      'Experienced medics often know something\u2019s wrong before they can say why. The colour\u2019s off, the breathing\u2019s wrong, the patient\u2019s too still. That\u2019s pattern recognition \u2014 and you can start building it now.',
      'Your brain reads colour, breathing, tone, posture and eye contact and gives you a verdict: sick or not sick. You\u2019re often taught to distrust that. Don\u2019t dismiss it \u2014 your first impression is data, not a diagnosis. Test it; don\u2019t ignore it.'
    ],
    analogyIcon: 'bi-bell',
    analogy: 'It\u2019s a smoke alarm. It won\u2019t tell you where the fire is \u2014 it tells you something needs looking at, now, and shifts you from routine to urgent.',
    steps: [
      'Notice \u2014 give it a word in five seconds: sick, not sick, something\u2019s off.',
      'Hold it \u2014 keep it as a working hunch, neither acted on blindly nor dismissed.',
      'Test it \u2014 check it against your assessment. A first impression that doesn\u2019t match the obs is one of the most important signals you\u2019ll get.'
    ],
    onSceneSetup: 'A 55-year-old woman, generally unwell. She opens the door, walking and talking, says she\u2019s a bit dizzy and tired \u2014 sounds minor. But something fires: her colour\u2019s wrong, she\u2019s gripping the door frame, her smile didn\u2019t reach her eyes. You sit her down and start assessing.',
    onSceneReveal: 'BP 84 over 50, heart rate 112. She\u2019s been bleeding internally for two days and assumed it was nothing. The assessment found it \u2014 the first impression made sure you looked properly.',
    tryItScenario: 'A 30-year-old man on the floor against the sofa. His girlfriend says he\u2019s had a panic attack. He\u2019s conscious, eyes open.',
    tryItQuestions: 'What do you notice in the first five seconds? What would make your alarm fire \u2014 and what would reassure you this is straightforward?',
    hollieSample: 'Panic attack is the label you\u2019ve been handed \u2014 and it might be right. But your first impression is its own data. What in those five seconds would tell you this is more than anxiety? Pick the one sign you wouldn\u2019t want to miss.',
    wrapPoint: 'That gut read is real information. Trust it enough to look harder, not enough to stop looking.',
    takeaways: ['Your first impression is data, not a diagnosis.', 'Give it a word in five seconds, then test it.', 'A gut read that clashes with the obs is a red flag in itself.']
  },
  {
    id: 4, number: 4, year: 1, section: 'Section 2 \u00b7 The primary survey',
    title: 'ABCDE \u2014 but actually',
    summary: 'Understand why ABCDE runs in that order \u2014 and use it as a thinking tool, not a chant.',
    whyItMatters: [
      'You\u2019ve known ABCDE since week one. But why that order \u2014 why Airway before Breathing, Breathing before Circulation? If you can\u2019t say, you\u2019re using a mnemonic, not a framework. A mnemonic gets you through an exam; a framework gets you through a bad job at 3am.',
      'The order has one ruthless logic: deal with what kills fastest first. A lost airway kills quicker than failing breathing, which kills quicker than failing circulation, which kills quicker than a dropping GCS. At each step you ask: is this killing my patient right now?'
    ],
    analogyIcon: 'bi-list-ol',
    analogy: 'It\u2019s triage inside one patient. A good triage nurse sees people by need, not arrival order. ABCDE triages problems by how fast they\u2019ll kill.',
    steps: [
      'Find it \u2014 work in order of what kills fastest.',
      'Fix it \u2014 sort the problem (or start to) before moving on. An airway that needs opening gets opened at A, not parked.',
      'Move on \u2014 only once it\u2019s handled.'
    ],
    onSceneSetup: 'A 68-year-old man slumped in his chair. At A his airway is partly blocked \u2014 an audible gurgle on inspiration. You reposition his head and insert an airway adjunct. The gurgle clears. Now you move to B.',
    onSceneReveal: 'Not before. Not halfway through A while counting his breaths. Until that airway\u2019s clear, nothing else you find matters as much. Noting the gurgle and pressing on misses the point. Find it, fix it, move on.',
    tryItScenario: 'A 45-year-old woman after a road traffic collision, conscious and talking but distressed. At C her radial pulse is weak and her skin is pale and clammy.',
    tryItQuestions: 'What does the framework tell you to do here? Press on to D, or deal with C first? What are you looking for, and what do you do about it?',
    hollieSample: 'You\u2019ve found something at C. Before what you\u2019d do \u2014 what does the framework say about timing: handle C now, or park it and push on to D? Then tell me where a weak radial pulse and clammy skin point you.',
    wrapPoint: 'ABCDE isn\u2019t a list to recite \u2014 it\u2019s a way of always working on the thing most likely to kill your patient first.',
    takeaways: ['The order is about lethality, not letters.', 'Find it, fix it, then move on \u2014 don\u2019t park problems.', 'If you can\u2019t explain the order, you\u2019re reciting, not reasoning.']
  },
  {
    id: 6, number: 6, year: 1, section: 'Section 2 \u00b7 The primary survey',
    title: 'The vital signs story',
    summary: 'Read a set of obs as one connected story \u2014 not a list of separate numbers to record and forget.',
    whyItMatters: [
      'A heart rate of 118 means tachycardic. But 118 with a BP of 96 over 64, a resp rate of 24, pale clammy skin and a GCS of 14 \u2014 read together \u2014 means something else entirely.',
      'Obs don\u2019t stand alone. Each number says something; the relationship between them says more. One set is a snapshot. A second set is a direction of travel \u2014 and the direction matters more than the number.'
    ],
    analogyIcon: 'bi-speedometer2',
    analogy: 'Read them like a car dashboard. One warning light is information. The fuel light, a rising temperature gauge and an oil warning together is \u201cpull over now.\u201d Read the whole dashboard, not one gauge.',
    steps: [
      'Do these numbers fit together? A rate climbing as pressure falls tells you the body is compensating. Several mildly-off values pointing the same way often worry more than one dramatic one.',
      'What\u2019s the trend? One set is information, two is a direction, three is a story.',
      'Do the numbers match what you see? When appearance and obs disagree, that gap is a finding.'
    ],
    onSceneSetup: 'A 58-year-old woman, generally unwell. First obs: HR 102, BP 108 over 70, resp 20, SpO2 96% on air, temp 38.9. Each value only mildly off.',
    onSceneReveal: 'But read the dashboard \u2014 everything points the same way: the body\u2019s working hard, and something\u2019s driving it. Ten minutes on: HR 110, BP 102 over 66, resp 22. Now you\u2019ve a direction of travel, and it\u2019s getting louder. This needs hospital, not reassurance.',
    tryItScenario: 'A 35-year-old man who took an overdose of an over-the-counter painkiller four hours ago. Alert, talking, says he feels fine and doesn\u2019t want hospital. Obs: HR 88, BP 124 over 78, resp 16, SpO2 99%, temp 36.8 \u2014 all normal.',
    tryItQuestions: 'What does the vital signs story tell you here? What are you watching over time, and how does it change your decision?',
    hollieSample: 'Here\u2019s the trap: the obs look reassuringly normal. But this story is about time, not this snapshot. Why might a normal set four hours into this kind of overdose mislead you? And what does that mean for whether \u201cI feel fine\u201d should change your plan?',
    wrapPoint: 'Numbers in isolation lie. Read obs as a set, and read them again \u2014 the trend tells you where the patient is heading.',
    takeaways: ['Read obs together, not one at a time.', 'A second set beats a first \u2014 the trend is the story.', 'When the patient and the numbers disagree, dig in.']
  },
  {
    id: 7, number: 7, year: 1, section: 'Section 3 \u00b7 History taking',
    title: 'SAMPLE done properly',
    summary: 'Take a structured history that actually tells you something \u2014 not one that just fills boxes.',
    whyItMatters: [
      'SAMPLE \u2014 signs and symptoms, allergies, medications, past history, last meal, events \u2014 is an early mnemonic. Most students run the letters, record the answers and move on. Boxes ticked, person barely known.',
      'There\u2019s a difference between asking what medications someone takes and thinking about what they tell you. SAMPLE is a way of thinking, not a form to file. The best history-takers listen to the answers and follow the threads.'
    ],
    analogyIcon: 'bi-signpost-2',
    analogy: 'Treat it as a map, not a route. A map shows the direct road \u2014 and the side roads worth exploring. SAMPLE gives you the map; following the threads is the navigation.',
    steps: [
      'When medications cluster \u2014 a blood-pressure tablet, a beta-blocker and a water tablet together \u2014 that combination usually points to an underlying condition. That\u2019s a thread; follow it.',
      'For every answer, ask one thing before moving on: does this change what I think is happening? If yes, stay on the thread.'
    ],
    onSceneSetup: 'A 71-year-old man, breathless over two days. Medications: a cholesterol tablet, a diabetes tablet, and a blood-pressure tablet also used in heart failure. History of type 2 diabetes and high blood pressure. A student records it and moves to last meal.',
    onSceneReveal: 'A clinician stops at medications. The mix points to a cardiovascular picture and a long-term metabolic condition \u2014 and that one tablet is also a heart-failure drug. Does he already have a cardiac diagnosis he hasn\u2019t mentioned, now tipping into failure? Two seconds, three threads. The history just got useful.',
    tryItScenario: 'A 58-year-old woman, generally unwell for a day. She takes a thyroid tablet and an antidepressant, has a history of depression and a thyroid problem, and it started after a busy week at work.',
    tryItQuestions: 'What threads are hiding here? What does her medication list tell you beyond the obvious? What do you want to know next, and why?',
    hollieSample: 'You\u2019ve a thyroid tablet and an antidepressant in front of you \u2014 each a thread. What does a thyroid condition let you ask about that you might otherwise skip? And before you settle on \u201cbusy week,\u201d what question would support or undermine that?',
    wrapPoint: 'A history is only as good as the threads you follow. Don\u2019t collect answers \u2014 think about what each one is telling you.',
    takeaways: ['SAMPLE is a thinking tool, not a tick-box.', 'Medication clusters point to hidden conditions \u2014 follow them.', 'After every answer ask: does this change my picture?']
  },
  {
    id: 17, number: 17, year: 1, section: 'Section 6 \u00b7 Communication',
    title: 'Talking to patients',
    summary: 'Communicate in a way that builds trust, gets better information, and feels human \u2014 whatever the clinical complexity behind it.',
    whyItMatters: [
      'You\u2019ll talk to more patients than you\u2019ll do any single intervention, yet the quality of those conversations is rarely taught. It matters two ways.',
      'Clinically: patients who feel heard give better histories and mention what they\u2019d otherwise hold back. Humanly: they\u2019re frightened, maybe in pain, and have let a stranger in on one of their worst days. The first thirty seconds set the tone for everything after.'
    ],
    analogyIcon: 'bi-broadcast',
    analogy: 'It\u2019s tuning a radio. The patient is broadcasting on a frequency \u2014 fear, pain, anger, relief. Your job in the first thirty seconds is to find it and match it, not impose your own.',
    steps: [
      'Your opening \u2014 first name, say you\u2019ve got time even when you don\u2019t, and get down to their level. Standing over people makes them feel small, and small people say less.',
      'Your language \u2014 no unexplained jargon, short sentences when someone\u2019s distressed, and check understanding without making them feel stupid.',
      'Your presence \u2014 look up from the paperwork, respond to what they actually say, and be honest and kind when the news is hard.'
    ],
    onSceneSetup: 'A 79-year-old woman who\u2019s fallen, embarrassed and upset. Before you touch or assess anything, you crouch to her level, make eye contact, and say: \u201cMy name\u2019s Sarah. You called the right people. Let\u2019s take a breath and sort this out together \u2014 we\u2019ve got time.\u201d',
    onSceneReveal: 'Fifteen seconds \u2014 and she\u2019s no longer just a fallen patient but a person who feels seen. She\u2019ll give you a better history and feel far less anxious. The clinical outcome starts with the conversation.',
    tryItScenario: 'A 45-year-old man on the sofa, visibly embarrassed. His partner called 999 without telling him, and he insists he\u2019s fine \u2014 no eye contact, arms crossed.',
    tryItQuestions: 'What does the room tell you about his frequency? What do you say first \u2014 and what do you deliberately not say? How do you open this for the best chance of an accurate history?',
    hollieSample: 'He\u2019s broadcasting embarrassment and a bit of defensiveness \u2014 arms crossed, no eye contact, \u201cI\u2019m fine.\u201d If you match that rather than fight it, what\u2019s your opening line? And what\u2019s the one thing you\u2019d deliberately not say in the first thirty seconds?',
    wrapPoint: 'How you open a conversation shapes the history you get and how safe the patient feels. Find their frequency before you start transmitting.',
    takeaways: ['The first thirty seconds set the tone for everything.', 'Match the patient\u2019s frequency before imposing your own.', 'Good communication is a clinical skill, not a soft one.']
  },

  /* ---------- YEAR TWO (PRO) ---------- */
  {
    id: 5, number: 5, year: 2, section: 'Section 2 \u00b7 The primary survey',
    title: 'When ABCDE breaks',
    summary: 'Keep structured thinking when a patient doesn\u2019t present by the book and your assessment starts to feel like it\u2019s falling apart.',
    whyItMatters: [
      'Textbooks present patients cleanly \u2014 a problem at B stays at B. Real patients don\u2019t cooperate.',
      'The patient fitting and vomiting at once. The trauma patient with an airway problem and a heavy bleed who\u2019s fighting you. The elderly patient where every letter\u2019s lighting up. These jobs don\u2019t break ABCDE \u2014 they break a mechanical, linear use of it. It\u2019s a priority system, not a conveyor belt; when everything happens at once, the priorities still hold, you just work them differently.'
    ],
    analogyIcon: 'bi-shuffle',
    analogy: 'Think of a juggler. A novice drops three balls at once. An expert keeps several going \u2014 not all at the same instant, but by cycling attention fast, always returning to the most critical first.',
    steps: [
      'Run a reassessment loop \u2014 assess, deal with anything immediately life-threatening, reassess, repeat \u2014 not one linear sweep.',
      'Call for help earlier than feels comfortable. Escalate when things are heading the wrong way, not once you\u2019re certain.',
      'Talk to your crewmate: short, clear, closed-loop \u2014 what you\u2019ve found, what you\u2019re doing, what you need (Framework 21).'
    ],
    onSceneSetup: 'A 72-year-old man in cardiac arrest. You\u2019re on compressions, your crewmate\u2019s on the airway, the defibrillator\u2019s charging, and his wife\u2019s in the doorway asking if he\u2019ll be all right.',
    onSceneReveal: 'ABCDE hasn\u2019t broken \u2014 you\u2019re just not working it in a line. A and C are handled at once by two people, D isn\u2019t relevant yet, and you\u2019re cycling \u2014 compressions, rhythm check, airway \u2014 on a loop. The framework\u2019s still there, running faster and as a loop, not a line.',
    tryItScenario: 'A 19-year-old man who\u2019s been assaulted. Conscious but agitated and combative, with a heavily bleeding wound to his left thigh and fast, noisy breathing. He won\u2019t let you near him.',
    tryItQuestions: 'What are your immediate priorities? How do you apply the framework when the patient is actively stopping you assessing them?',
    hollieSample: 'Tricky one \u2014 the patient himself is the obstacle. Two things are shouting for attention. Which is most likely to kill him first, and how might you get a hand on it given he won\u2019t cooperate? Tell me your first move and why it comes before the others.',
    wrapPoint: 'ABCDE doesn\u2019t break under pressure \u2014 a rigid, one-pass version of it does. Run it as a loop, with more hands, and the priorities still hold.',
    takeaways: ['ABCDE is a priority system, not a fixed sequence.', 'Cycle and reassess \u2014 deal with the fastest killer first, every loop.', 'Escalate early and share the load.']
  },
  {
    id: 8, number: 8, year: 2, section: 'Section 3 \u00b7 History taking',
    title: 'SOCRATES \u2014 the pain conversation',
    summary: 'A structured way to explore pain that builds a full picture \u2014 and helps patients describe what they struggle to put into words.',
    whyItMatters: [
      'Pain is the commonest reason people call 999 and one of the hardest things to describe. Ask, and you often get \u201cit hurts,\u201d \u201cit really hurts,\u201d or silence. That\u2019s not unhelpfulness \u2014 most people have no framework for describing pain.',
      'Your job is to give them one. Site, Onset, Character, Radiation, Associated symptoms, Timing, Exacerbating and relieving factors, Severity \u2014 eight prompts, one picture. Each is a discriminator that nudges you towards or away from an impression.'
    ],
    analogyIcon: 'bi-tools',
    analogy: 'It\u2019s a sculptor\u2019s toolkit, not a top-to-bottom form. A sculptor reads the material, reaches for the tool the moment needs, and goes back to an earlier one when the work moves on. Follow the conversation; use each element as needed.',
    steps: [
      'Run it as a guided conversation, not an interrogation \u2014 genuine curiosity draws out the detail.',
      'Watch severity: \u201ceight\u201d while reading a magazine means something different from \u201ceight\u201d and can\u2019t finish a sentence. When the number and the patient disagree, that gap is the finding.'
    ],
    onSceneSetup: 'A 52-year-old man, chest pain. A tightness across his chest, started forty minutes ago while watching TV \u2014 not exertional. Not radiating, no breathlessness, nausea or sweating. Six out of ten, nothing changes it.',
    onSceneReveal: 'SOCRATES has given you a picture, not just a complaint. Tightness fits a cardiac cause; onset at rest matters; no radiation or associated symptoms is mildly reassuring but rules nothing out; stable severity says it hasn\u2019t escalated or resolved. Every element earned its place.',
    tryItScenario: 'A 34-year-old woman, abdominal pain. Coming in waves, centred around her belly button, worse over six hours. Pale, struggling to get comfortable.',
    tryItQuestions: 'Work through SOCRATES. What does each element tell you? What are the key discriminators, and what are you moving towards or away from?',
    hollieSample: 'Good \u2014 \u201ccomes in waves\u201d and \u201caround the belly button\u201d are both doing work. What does colicky, waxing-and-waning pain suggest about what\u2019s going on inside? And does pain near the umbilicus that later shifts change your thinking? Pick the one element you most want to pin down next.',
    wrapPoint: 'SOCRATES isn\u2019t a form to complete \u2014 it\u2019s eight ways to turn \u201cit hurts\u201d into a picture that points somewhere.',
    takeaways: ['Each letter is a clinical discriminator, not a box.', 'Use it as a conversation, in whatever order the story takes.', 'When severity and presentation disagree, that\u2019s a finding.']
  },
  {
    id: 9, number: 9, year: 2, section: 'Section 3 \u00b7 History taking',
    title: 'The reluctant patient',
    summary: 'Keep a structured, effective approach when a patient is confused, frightened, silent or resistant \u2014 and the usual history-taking stops working.',
    whyItMatters: [
      'The history frameworks assume the patient can and will engage. Many will. Some won\u2019t \u2014 the confused elderly patient, the one who thinks hospital means something terrible, the intoxicated or distressed one who doesn\u2019t trust you yet, the patient too unwell to speak.',
      'Their histories aren\u2019t unavailable \u2014 they just need a different way in. When the front door\u2019s closed, you don\u2019t abandon the house; you find another way in.'
    ],
    analogyIcon: 'bi-puzzle',
    analogy: 'A jigsaw with half the pieces missing. You can\u2019t force them to appear, but you can build from what you have, mark the gaps, and use the picture on the lid to infer the rest.',
    steps: [
      'The patient \u2014 whatever they can give. Short questions, simple language, yes or no where possible.',
      'The people around them \u2014 family, carers, neighbours, who often know the baseline, the medications, and what changed.',
      'The environment \u2014 the medication organiser, the discharge letter, the alert bracelet. The scene often carries the history they can\u2019t (Framework 2).',
      'Your own assessment \u2014 when the history\u2019s thin, examination and obs carry more weight. Build from the bottom up when you can\u2019t from the top down.'
    ],
    onSceneSetup: 'An 84-year-old woman found on the floor by her carer. Conscious but acutely confused, can\u2019t tell you her name or the day, pulling at your hand. Your usual approach is limited, so you shift.',
    onSceneReveal: 'You ask the carer about her baseline and what changed. You scan the room: a weekly medication organiser \u2014 it\u2019s Thursday, and Monday to Wednesday are still full, untouched since the weekend. You examine her: warm, dry, clothing that smells offensive. A picture forms \u2014 probable infection causing acute confusion in a frail woman \u2014 built almost without a direct history.',
    tryItScenario: 'A 28-year-old man in a stairwell, reported as acting strangely. No eye contact, hasn\u2019t spoken since you arrived. No visible injuries.',
    tryItQuestions: 'Using the four sources: what can the patient give you? What\u2019s in the environment? Who else might know? What does your assessment tell you with no history?',
    hollieSample: 'Silence isn\u2019t nothing \u2014 it\u2019s data, and so is the stairwell. Which of your four sources is most useful when the patient won\u2019t engage? And before you assume this is behavioural, what would you want to rule out that can look exactly like this?',
    wrapPoint: 'A patient who won\u2019t talk still has a history \u2014 you just gather it from the people, the place and your own examination instead.',
    takeaways: ['Four sources: the patient, the people, the environment, your assessment.', 'A closed front door isn\u2019t a dead end.', 'When the history\u2019s thin, your examination carries more weight.']
  },
  {
    id: 10, number: 10, year: 2, section: 'Section 4 \u00b7 Clinical thinking',
    title: 'Spot the pattern',
    summary: 'Understand how clinical pattern recognition really develops \u2014 and build it deliberately instead of waiting years.',
    whyItMatters: [
      'Ask an experienced medic how they knew and they often can\u2019t say \u2014 it just felt familiar. That\u2019s pattern recognition, and students assume it either takes years or never comes. It can be built \u2014 if you understand what it is.',
      'It\u2019s not a list you scroll through. It\u2019s your brain having seen enough versions of a presentation to build a template of how it looks, sounds and behaves \u2014 and the exposure doesn\u2019t have to be real. Deliberate practice builds templates as well as live jobs, so you can start before you ever set foot on a truck.'
    ],
    analogyIcon: 'bi-translate',
    analogy: 'Like learning a language. At first it\u2019s a stream of sound; with exposure, words emerge, then phrases, then meaning \u2014 because your brain built the pattern. Presentations separate out the same way.',
    steps: [
      'When you meet a presentation \u2014 placement, scenario, case study \u2014 don\u2019t just record it. Ask: what was the pattern? What combination made it what it was?',
      'Ask what you\u2019d recognise first next time, and the single most important signal. Writing that down turns passive exposure into a template.'
    ],
    onSceneSetup: 'A 67-year-old man, sudden severe headache \u2014 the worst of his life \u2014 starting abruptly while reading. Vomited once, pale, unusually quiet.',
    onSceneReveal: 'With a template, something fires straight away: sudden worst-ever headache, vomiting, a patient who looks more unwell than the obs say. Without one, you have \u201ca headache with vomiting and normal obs,\u201d and the urgency may not register. Both could look it up \u2014 the difference is the template, built by repeated exposure.',
    tryItScenario: 'Think of the last clinical presentation you met \u2014 placement, lecture or case study.',
    tryItQuestions: 'What were the key features? Describe its pattern in three words. If you saw those three together, would you recognise them \u2014 and if not, what do you need to see more of?',
    hollieSample: 'Nice \u2014 boiling it to three words is exactly the discipline that builds a template. Tell me your three. Then let\u2019s pressure-test them: is there another presentation that shares two of those three? Knowing where patterns overlap is how you avoid mixing them up on scene.',
    wrapPoint: 'Pattern recognition isn\u2019t a gift you wait years for \u2014 it\u2019s templates you build on purpose, one presentation at a time.',
    takeaways: ['Name the pattern, don\u2019t just record the case.', 'Deliberate practice builds templates as well as real jobs.', 'Three-word patterns are a fast way to lock one in.']
  },
  {
    id: 11, number: 11, year: 2, section: 'Section 4 \u00b7 Clinical thinking',
    title: 'The differential mindset',
    summary: 'Generate and test several explanations for a presentation \u2014 instead of locking onto the first that fits.',
    whyItMatters: [
      'The dangerous moment isn\u2019t having no idea \u2014 it\u2019s having a reasonable idea and stopping looking. That\u2019s premature closure, and it catches consultants as much as students: anyone working fast, under pressure, with incomplete information.',
      'The fix isn\u2019t to avoid early impressions \u2014 they focus you. It\u2019s to hold them lightly, keep generating alternatives, and hunt the evidence that would prove your first idea wrong.'
    ],
    analogyIcon: 'bi-search',
    analogy: 'Be the detective who distrusts their own hunches. They form a theory early \u2014 they can\u2019t help it \u2014 then do the uncomfortable thing: look for what contradicts it, and let the evidence decide.',
    steps: [
      'What else could this be? Not the most likely \u2014 the other realistic options, including the rarer, more dangerous ones.',
      'What would I find if I\u2019m right, and what if I\u2019m not? That tells you what to look for.',
      'What\u2019s the most dangerous thing this could be? Make sure you\u2019ve explicitly looked for it.'
    ],
    onSceneSetup: 'A 44-year-old woman, left-sided chest pain and breathlessness, onset two hours ago, no cardiac history. First impression: possible clot on the lung.',
    onSceneReveal: 'Now apply the framework. What else? Pleurisy, musculoskeletal pain, a collapsed lung, inflammation around the heart, anxiety \u2014 and an atypical cardiac cause, never dismissed on age and sex alone. What rules a clot in or out? Recent immobility, long-haul travel, the contraceptive pill, calf pain, a heart rate out of proportion, low sats \u2014 so you look for those. You haven\u2019t dropped your first impression; you\u2019ve made it robust enough to act on, or to replace.',
    tryItScenario: 'A 55-year-old man, sudden central abdominal pain radiating to his back. Pale, sweating, blood pressure 102 over 64.',
    tryItQuestions: 'Generate your differential. Leading impression? Alternatives? The most dangerous diagnosis \u2014 and the one finding that would confirm or rule it out?',
    hollieSample: 'A worrying combination \u2014 sudden tearing pain through to the back, pale, sweaty, a soft pressure. What\u2019s the most dangerous thing that fits, and what single finding would push you towards it? Name it, and tell me what you\u2019d do differently if you found it.',
    wrapPoint: 'A reasonable first idea is the trap, not the goal. Keep asking \u201cwhat else, and what\u2019s the worst this could be?\u201d until the evidence decides.',
    takeaways: ['Premature closure is the danger \u2014 hold your first idea lightly.', 'Always name the most dangerous fit and look for it.', 'Hunt the evidence that would prove you wrong.']
  },
  {
    id: 12, number: 12, year: 2, section: 'Section 4 \u00b7 Clinical thinking',
    title: 'Red flags and safety netting',
    summary: 'Spot the features that change everything \u2014 and build in a deliberate check that you haven\u2019t missed the serious cause before you decide.',
    whyItMatters: [
      'Most patients you see won\u2019t be critically unwell \u2014 which is exactly where red flags matter. A red flag doesn\u2019t confirm a serious diagnosis; it means you can\u2019t dismiss one without a reason, and your assessment should show you looked.',
      'Without this habit, you assess at face value \u2014 a headache as a headache, back pain as back pain. A red flag isn\u2019t an alarm; it\u2019s a question: before you close this, have you specifically looked for that?'
    ],
    analogyIcon: 'bi-clipboard-check',
    analogy: 'A pre-flight checklist. The pilot doesn\u2019t run it expecting a problem \u2014 almost always it\u2019s fine. They run it because the one time something\u2019s wrong, the cost of missing it is catastrophic, and ninety seconds guarantees nothing got skipped in the rush.',
    steps: [
      'Before you commit, actively look for the serious features for this presentation \u2014 don\u2019t just hope they\u2019re absent.',
      'Know the universal ones: sudden severe onset, worst-ever symptoms, collapse, neurological signs with a non-neurological complaint, a patient who looks worse than their story.',
      'Safety netting is the other half: when you\u2019re not conveying, make sure the patient and family know exactly what to watch for and do. That\u2019s a clinical intervention, not a disclaimer.'
    ],
    onSceneSetup: 'A 38-year-old man, lower back pain after a day gardening. Muscular, reproducible on movement, obs entirely normal \u2014 reassuringly mechanical.',
    onSceneReveal: 'Before you close it, your red-flag check runs: any numbness around the groin or inner thighs, any change in bladder or bowel control, any leg weakness, any cancer history, any major trauma? All negative \u2014 so now you\u2019re not assuming it\u2019s mechanical, you\u2019ve excluded what would make it serious. Then safety netting: if any of those appear, call 999 immediately. He understands. That\u2019s safety netting done properly.',
    tryItScenario: 'A 26-year-old woman, two-day headache, currently four out of ten. History of migraines, thinks it\u2019s another one. She\u2019s taken an over-the-counter painkiller with partial relief.',
    tryItQuestions: 'What headache red flags must you specifically exclude before accepting this as migraine? What would your safety netting look like if you\u2019re not conveying her?',
    hollieSample: 'A known migraine history is reassuring \u2014 and a trap, because it makes \u201canother migraine\u201d the easy answer. What red flags would you actively check before accepting that? Pick the two you\u2019d least want to miss, and tell me how you\u2019d word your safety netting so she actually acts on it.',
    wrapPoint: 'Red flags aren\u2019t about expecting disaster \u2014 they\u2019re the deliberate check that you ruled it out on purpose, not by luck. Safety netting is the second half of that.',
    takeaways: ['A red flag is a question to answer, not an alarm to wait for.', 'Look for the serious cause before you close \u2014 don\u2019t assume it\u2019s absent.', 'Safety netting is a clinical intervention, so make it specific.']
  },
  {
    id: 18, number: 18, year: 2, section: 'Section 6 \u00b7 Communication',
    title: 'ATMIST \u2014 pre-alert and handover',
    summary: 'The agreed UK standard for pre-alert and handover \u2014 everything the receiving team needs, in the right order, to take your patient safely.',
    whyItMatters: [
      'The handover is where your work transfers to another team. Done well it\u2019s seamless; done badly, key information arrives out of order or not at all, and occasionally something important falls in the gap.',
      'ATMIST is agreed across UK services and EDs so everyone delivers in the same order and the receiving team can prepare. Age and presentation, Time of onset, Mechanism or history, Injuries or findings, Signs (the obs), Treatment given \u2014 that order, every time.'
    ],
    analogyIcon: 'bi-telephone-outbound',
    analogy: 'A news report. A good journalist leads with who, what and when \u2014 the headline first \u2014 then the context. ATMIST gives the essential picture in the first two lines, detail after.',
    steps: [
      'Lead with age and presentation \u2014 it tells the team what\u2019s coming and how to prepare.',
      'Keep the pre-alert tight (thirty to forty-five seconds, just what they need to get ready); the on-arrival handover can carry more.',
      'Deliver it confidently, at a pace they can write to, no hedging or story \u2014 you\u2019re transferring a picture, not telling a tale.'
    ],
    onSceneSetup: 'A pre-alert with a 68-year-old man, suspected STEMI. Chest pain about ninety minutes ago, significant cardiac history including a previous heart attack. 12-lead shows ST elevation in the inferior leads. Obs: HR 78, BP 136 over 84, sats 97% on air, GCS 15. Initial treatment for cardiac chest pain underway. ETA eight minutes \u2014 please prepare the cath lab pathway.',
    onSceneReveal: 'About forty seconds, and the team knows exactly what\u2019s coming \u2014 they\u2019re already moving. Notice the shape: the headline (who, what, when) lands first, the obs say how unwell he is now, and \u201ctreatment underway\u201d closes the loop so nobody repeats what you\u2019ve done.',
    tryItScenario: 'You\u2019re en route with a 34-year-old woman, 32 weeks pregnant, who collapsed at home. Now conscious, GCS 14, BP 158 over 104, severe headache and visual disturbances. You have IV access, four minutes out.',
    tryItQuestions: 'Write your pre-alert ATMIST, then the fuller on-arrival handover. What\u2019s different between them, and why?',
    hollieSample: 'Lots here the team needs early. Try your pre-alert out loud in ATMIST order and notice what you instinctively lead with. Which single detail most changes how the department prepares \u2014 and did it come early enough?',
    wrapPoint: 'A good handover isn\u2019t about saying everything \u2014 it\u2019s about giving the right things in the order the receiving team can act on. ATMIST is that order.',
    takeaways: ['Lead with the headline: age and presentation first.', 'Pre-alert is tight; the detail goes on arrival.', 'Close the loop on treatment so nothing gets repeated.']
  },
  {
    id: 21, number: 21, year: 2, section: 'Section 6 \u00b7 Communication',
    title: 'Talking to your crew',
    summary: 'Communicate clearly with your crewmate on scene so you both always know what\u2019s happening, what\u2019s needed, and who\u2019s doing what.',
    whyItMatters: [
      'In aviation, structured crew communication \u2014 crew resource management \u2014 is credited with saving thousands of lives, because crashes often came not from one big failure but small breakdowns between competent people who each held part of the picture.',
      'Prehospital care is the same: two clinicians, a complex patient, time running out. If communication is assumed rather than explicit, gaps appear \u2014 and gaps become errors. Communicating with your crewmate is as clinical a skill as assessing the patient.'
    ],
    analogyIcon: 'bi-people',
    analogy: 'A surgical team in theatre. Before the procedure everyone states their role and the plan; during it, instructions are closed-loop \u2014 given, repeated back, confirmed; after, a quick debrief. Same thing, faster, with two of you.',
    steps: [
      'Closed-loop: give an instruction and wait for it to be confirmed; receive one and repeat it back before acting. Save the full loop for anything critical or time-sensitive.',
      'Shared mental model \u2014 narrate your reasoning briefly: \u201cI think this is cardiac, I\u2019ll get a 12-lead while you do obs, then we move.\u201d',
      'Speak up \u2014 the hardest one. If something looks wrong, say so clearly and without aggression. A crew where only the senior voice counts makes more errors.'
    ],
    onSceneSetup: 'A cardiac arrest. You\u2019re on compressions; your crewmate\u2019s on the airway and the defibrillator. \u201cCharging the defib,\u201d they say. \u201cCopy, pausing compressions,\u201d you reply, stopping and checking you\u2019re clear. \u201cAll clear \u2014 shocking now.\u201d \u201cShock delivered, resuming compressions.\u201d \u201cGot it \u2014 two-minute cycle, I\u2019ll call the next rhythm check.\u201d',
    onSceneReveal: 'Every instruction confirmed, every action acknowledged. Nobody\u2019s guessing what the other\u2019s about to do, and it\u2019s so automatic it frees you both to focus on the patient. That doesn\u2019t happen by accident \u2014 it\u2019s built by practice and a shared understanding that communication is part of the intervention.',
    tryItScenario: 'On scene with your crewmate, a patient with suspected sepsis. You\u2019ve formed an impression and want to bring your crewmate fully into the plan before treatment.',
    tryItQuestions: 'Practise the shared mental model out loud: in three sentences, tell your crewmate what\u2019s going on, your plan, and what you need them to do. Then \u2014 what might they be seeing that you haven\u2019t, and how do you make space for them to raise it?',
    hollieSample: 'Three sentences forces clarity. Give me yours: impression, plan, ask. Then the harder half \u2014 how do you actually invite your crewmate to challenge you, in a way that makes it easy to speak up rather than just nod along?',
    wrapPoint: 'Most crew errors aren\u2019t skill failures \u2014 they\u2019re communication gaps. Closed loops and a shared picture close them.',
    takeaways: ['Closed-loop the critical stuff \u2014 given, repeated, confirmed.', 'Narrate your thinking so you share one picture.', 'A crew that can speak up makes fewer errors.']
  },

  /* ---------- YEAR THREE (PRO) ---------- */
  {
    id: 13, number: 13, year: 3, section: 'Section 4 \u00b7 Clinical thinking',
    title: 'What am I missing?',
    summary: 'A deliberate pause before you commit \u2014 a final check that your own thinking hasn\u2019t led you somewhere the evidence doesn\u2019t support.',
    whyItMatters: [
      'Everything else in this section is about gathering information and reasoning well. This one\u2019s about the thinker. Your brain isn\u2019t neutral \u2014 it has biases that are invisible while they run.',
      'Anchoring (over-weighting the first thing you hear), availability bias (over-rating diagnoses that spring to mind), premature closure (stopping at the first plausible answer). These are features of human cognition, not flaws. The safe clinician isn\u2019t the one without bias \u2014 it\u2019s the one who checks for it.'
    ],
    analogyIcon: 'bi-zoom-in',
    analogy: 'It\u2019s the final proofread before you send an important message. The read straight after writing is the least reliable \u2014 your brain sees what it meant, not what\u2019s there. So you pause and read again, slowly, hunting errors not meaning.',
    steps: [
      'Does the picture support my impression, or have I made the evidence fit?',
      'What haven\u2019t I assessed that I should have?',
      'Is there anything the patient told me I haven\u2019t explained?',
      'If I\u2019m wrong, what\u2019s the most likely alternative \u2014 and the cost of missing it?'
    ],
    onSceneSetup: 'A 61-year-old man you\u2019ve assessed as an exacerbation of his known COPD \u2014 long history, smoker, tight wheezy chest, sats 88%, a partial response to the standard inhaled treatment. The picture fits, and you\u2019re ready to convey.',
    onSceneReveal: 'Run the check. Does it fit? Broadly \u2014 but the response was only partial and his resp rate\u2019s still high. Not assessed? No 12-lead. Unexplained? He said the breathlessness came on suddenly this morning, not gradually \u2014 and sudden onset in a COPD patient raises a collapsed lung, which would explain the partial response. Thirty seconds, three things to re-check before you commit.',
    tryItScenario: 'You\u2019re about to hand over a 78-year-old woman you\u2019ve assessed as a urinary infection with confusion. The history fits, the obs are mildly abnormal, and the carer says she\u2019s had infections present this way before.',
    tryItQuestions: 'Run the check. Does the picture fully support it? What haven\u2019t you assessed? Anything unexplained? What\u2019s the most dangerous alternative \u2014 and have you looked for it?',
    hollieSample: '\u201cShe\u2019s had this before\u201d is exactly the anchor this framework is built for. Play devil\u2019s advocate against your own diagnosis: what else causes acute confusion in an older woman that you\u2019d hate to miss? Name one, and the single check that would help exclude it.',
    wrapPoint: 'The most dangerous bias is the one you can\u2019t feel. A thirty-second check on your own thinking, before you commit, catches what confidence hides.',
    takeaways: ['Bias is invisible while it operates \u2014 check for it on purpose.', 'Ask what you haven\u2019t assessed and what you haven\u2019t explained.', 'Always name the dangerous alternative before you close.']
  },
  {
    id: 14, number: 14, year: 3, section: 'Section 5 \u00b7 Treatment and decision making',
    title: 'The treatment ladder',
    summary: 'Prioritise when several things need doing at once \u2014 so you treat the most important problem first, not the most visible one.',
    whyItMatters: [
      'In a textbook, treatment is one thing at a time in a tidy order. On scene with a sick patient, several things need doing at once with no obvious sequence: access, pain, a 12-lead, a falling blood pressure, an airway to reassess, a family asking questions, a crewmate waiting.',
      'Under pressure, students freeze or grab the nearest problem \u2014 the most visible, or the one they\u2019re most confident with. Neither\u2019s a plan. A plan is a prioritised sequence on one principle: deal with what\u2019s most likely to harm the patient first \u2014 and be able to say why.'
    ],
    analogyIcon: 'bi-fire',
    analogy: 'A fire crew at a burning building. They don\u2019t split up and chase whatever flames they can see \u2014 they find where the fire is most dangerous and prioritise. Every decision answers one question: what causes the most harm if we don\u2019t deal with it right now?',
    steps: [
      'Rank everything by one criterion: what happens to the patient if I don\u2019t do this in the next thirty seconds? Five minutes? Thirty?',
      'In practice that usually puts airway and breathing before circulation, before pain relief, before paperwork.',
      'Stay flexible \u2014 if dealing with one problem reveals another higher up, go back up the ladder.'
    ],
    onSceneSetup: 'A 70-year-old man who\u2019s fallen, obvious deformity to his right thigh, significant pain, blood pressure 94 over 58. Conscious, airway clear, breathing adequate. Everything on your list feels urgent.',
    onSceneReveal: 'The ladder gives you the order. The low pressure is the most dangerous finding \u2014 a fractured thigh can lose a lot of blood internally \u2014 so circulation comes first: access, a fluid challenge if indicated, reassess. Pain relief second, because the circulatory picture changes how safely you give it. Splinting third, which helps pain and bleeding both. Family and paperwork fit around it. One problem at a time, most dangerous first.',
    tryItScenario: 'A 55-year-old woman in anaphylaxis after a wasp sting \u2014 audible stridor, widespread rash, blood pressure 78 over 50, increasing agitation.',
    tryItQuestions: 'List every intervention you can think of. Now rank them with the ladder. What\u2019s first, and why? What can wait \u2014 and for how long?',
    hollieSample: 'Lots competing here, and she\u2019s deteriorating. Of everything you listed, which one buys you the most time in the next thirty seconds \u2014 and which would you regret leaving any later? Put your top two in order and tell me what each is protecting against.',
    wrapPoint: 'When everything feels urgent, the loudest problem isn\u2019t always the deadliest. Rank by harm, act on the top of the ladder, and keep re-ranking.',
    takeaways: ['Prioritise by what harms the patient first, not what\u2019s most visible.', 'Usually airway and breathing before circulation, pain, then paperwork.', 'Re-rank as new problems appear.']
  },
  {
    id: 15, number: 15, year: 3, section: 'Section 5 \u00b7 Treatment and decision making',
    title: 'Stay or go',
    summary: 'Make the convey decision \u2014 stay and work, move now, or use another pathway \u2014 when the right answer isn\u2019t obvious.',
    whyItMatters: [
      'The convey decision is one of the most consequential a paramedic makes, and one of the least taught. You\u2019re shown how to assess, treat and hand over \u2014 the decision in between is left to \u201cinstinct you\u2019ll develop.\u201d',
      'Get it wrong one way and you keep a time-critical patient on scene too long; the other way and you move someone who needed more first and watch them deteriorate in the back with fewer resources. The question is never just whether to go \u2014 it\u2019s whether staying longer helps this patient more than moving sooner.'
    ],
    analogyIcon: 'bi-hourglass-split',
    analogy: 'Picture scales in your head, time on one side and intervention on the other. The benefit of staying \u2014 what you can do here, the stabilising that makes the journey safer \u2014 against its cost: time away from definitive care, deterioration, the things only a hospital can give.',
    steps: [
      'Does this patient need something only a hospital can provide? If yes, the clock\u2019s already running.',
      'Is it time-critical \u2014 a window that narrows by the minute?',
      'Are they stable enough to move and stay stable in transit? Two minutes stabilising before you go is different from twenty because you\u2019re unsure.',
      'Is there a better pathway than the ED \u2014 hear and treat, GP, mental health team, falls pathway?'
    ],
    onSceneSetup: 'A 67-year-old man who woke with sudden left-sided facial droop, arm weakness and slurred speech about fifty minutes ago. Obs stable; alert and frightened.',
    onSceneReveal: 'Run the scales. Needs something only a hospital can give? Yes \u2014 a scan and time-critical stroke-centre treatment. Time-critical? Critically \u2014 the window narrows every minute on scene. Stable to move? Yes. Better pathway? No \u2014 he needs a stroke centre, directly, now. The scales tip at once: on-scene time is the pre-alert, a baseline set of obs, and loading. Everything else happens en route or at hospital.',
    tryItScenario: 'A 42-year-old woman with known alcohol dependence, confused and unsteady, blood sugar 2.4. You correct the low blood sugar and her GCS improves from 13 to 15 within ten minutes. She\u2019s now alert, oriented, and saying she doesn\u2019t want to go to hospital.',
    tryItQuestions: 'Run the four questions. Does she need a hospital-only intervention? Is it time-critical? Is she stable? Is there an alternative pathway? What\u2019s your decision \u2014 and how do you document and defend it?',
    hollieSample: 'She\u2019s improved, she\u2019s refusing, and on the face of it she looks fine \u2014 which is exactly where this gets tricky. What about the cause of her low blood sugar should make you cautious about simply leaving her? Walk me through weighing her right to refuse against that risk.',
    wrapPoint: 'Going isn\u2019t always helping, and staying isn\u2019t always safe. Weigh what staying adds against what it costs \u2014 and let time-critical conditions decide fast.',
    takeaways: ['Ask whether staying longer helps more than moving sooner.', 'Time-critical conditions move the clock to the top of the scales.', 'The right destination isn\u2019t always the ED.']
  },
  {
    id: 16, number: 16, year: 3, section: 'Section 5 \u00b7 Treatment and decision making',
    title: 'JRCALC as a tool, not a script',
    summary: 'Use clinical guidelines as a thinking aid that supports your decision \u2014 not a rulebook that replaces it.',
    whyItMatters: [
      'JRCALC is the clinical standard for UK practice \u2014 evidence-based, updated, the benchmark you\u2019re judged against. Know it, use it, respect it. But there\u2019s a safe way to use it and a way that creates false security.',
      'The unsafe way treats it as a decision tree: patient presents with X, follow the pathway, tick the box, done. Guidelines are written for presentations, not patients \u2014 for what suits most people who present a certain way. They can\u2019t account for the frail patient with several conditions whose physiology is nothing like the healthy person they were calibrated on. JRCALC tells you what\u2019s usually right; whether it\u2019s right for this patient, now, is your job.'
    ],
    analogyIcon: 'bi-map',
    analogy: 'JRCALC is the map; your judgement is the driver. The map gives the roads and likely routes, and a good driver uses it constantly. But it can\u2019t see the roadworks or the flooded underpass \u2014 the driver looks at what\u2019s actually in front of them and makes the call the map can\u2019t.',
    steps: [
      'Use it proactively \u2014 know the guideline for a presentation so you arrive with a clear sense of what\u2019s recommended and why.',
      'Use it reactively \u2014 on scene, to check your thinking or surface an option you hadn\u2019t considered.',
      'When you deviate \u2014 and sometimes that\u2019s the right call \u2014 be able to explain why, clearly, and document it. Unsure whether the deviation\u2019s appropriate? That\u2019s the moment to call for clinical advice.'
    ],
    onSceneSetup: 'An 81-year-old man with acute fluid on the lungs. The guideline permits a particular treatment, with a blood-pressure cut-off below which you shouldn\u2019t give it. His pressure sits just above that cut-off, so on the face of it you can proceed.',
    onSceneReveal: 'But you look at the patient. Frail, on several blood-pressure tablets, and his wife says his pressure normally runs low \u2014 so \u201cjust above the cut-off\u201d isn\u2019t reassuring, it\u2019s a failing heart working flat out. Give that treatment and his pressure could crash into shock. The guideline didn\u2019t make that call \u2014 you did, because you looked at the patient, not just the number. That\u2019s JRCALC as a tool.',
    tryItScenario: 'A 34-year-old woman in active labour calls 999. The baby\u2019s crowning and you\u2019re about eight minutes from hospital.',
    tryItQuestions: 'Before you open the guideline: what do you already know? What decisions are coming in the next few minutes? Now open it \u2014 what does it add, and what does it not cover that needs your own judgement?',
    hollieSample: 'Crowning at eight minutes out makes the stay-or-go almost decide itself \u2014 but the guideline still earns its place. What does it give you that\u2019s genuinely useful to hand right now? And what part of this comes down to your judgement and calm, not any protocol?',
    wrapPoint: 'A guideline tells you what\u2019s usually right for a presentation. Whether it\u2019s right for the patient in front of you, right now, is a judgement only you can make.',
    takeaways: ['Guidelines are written for presentations, not individual patients.', 'Use JRCALC to inform the call, not to make it for you.', 'If you deviate, be able to explain and document why.']
  },
  {
    id: 19, number: 19, year: 3, section: 'Section 6 \u00b7 Communication',
    title: 'Talking to your GP, 111 and other agencies',
    summary: 'Make referral and inter-agency calls that are clear, credible and effective \u2014 so the patient gets the right outcome, not just a good assessment.',
    whyItMatters: [
      'Not every patient goes to an ED. Good prehospital care increasingly means finding the right pathway \u2014 a GP, 111, a mental health crisis team, a falls team \u2014 which means picking up the phone. Students are rarely taught how to make these calls.',
      'A poor referral creates two risks: the receiving clinician doesn\u2019t have enough to decide safely, or you sound uncertain and your assessment is taken less seriously. They\u2019re deciding entirely on what you tell them \u2014 the quality of your communication is the quality of their information.'
    ],
    analogyIcon: 'bi-telephone',
    analogy: 'A business case under time pressure. You don\u2019t open with background and hope they stay with you \u2014 you open with the ask, what you need and why, then back it with evidence. The listener knows straight away what\u2019s being requested.',
    steps: [
      'Identify yourself \u2014 name, role, call sign or service.',
      'State the patient \u2014 age and location.',
      'State what you need and why \u2014 the ask before the evidence.',
      'Give a concise, structured clinical summary as your evidence.',
      'Confirm the outcome \u2014 what\u2019s agreed, who does what next, read back anything you\u2019re unsure of.'
    ],
    onSceneSetup: 'A 67-year-old man, two days of worsening confusion, temperature 38.4, obs mildly abnormal but stable, no signs of systemic sepsis. You don\u2019t feel he needs an ED and want the GP to advise on the right pathway.',
    onSceneReveal: 'You open with who you are and your call sign, name the patient and location, then lead with the ask \u2014 a same-day review, because you don\u2019t feel he needs the ED and would like them to consider whether community treatment is appropriate. Then the evidence: confusion against his usually sharp baseline, the obs, no signs of systemic sepsis, no allergies. Structured, confident, complete \u2014 the GP has what they need to decide safely.',
    tryItScenario: 'A 19-year-old woman who\u2019s taken a small intentional overdose of an over-the-counter painkiller about three hours ago. Medically stable, GCS 15, engaging well. She has a mental health care plan and a named community psychiatric nurse.',
    tryItQuestions: 'You want to refer to the mental health crisis team rather than convey to the ED. Write your call using the five-part structure. What\u2019s your opening? Your ask? Your clinical summary?',
    hollieSample: 'Good \u2014 and notice the ask isn\u2019t just \u201ctake this patient,\u201d it\u2019s a specific pathway for a specific reason. Try your opening line and your ask out loud. What do you lead with so the crisis team immediately understands why they, not the ED, are right for her?',
    wrapPoint: 'On a referral call the other clinician only knows what you tell them. Lead with the ask, back it with a tight summary, and the right outcome follows.',
    takeaways: ['Lead with the ask, then the evidence.', 'Your communication is the quality of their information.', 'Confirm what\u2019s agreed and who does what next.']
  },
  {
    id: 20, number: 20, year: 3, section: 'Section 6 \u00b7 Communication',
    title: 'Difficult conversations',
    summary: 'Navigate the conversations that carry the most weight \u2014 breaking bad news, managing anger, sitting with someone in crisis \u2014 with honesty, compassion and clarity.',
    whyItMatters: [
      'Nobody teaches you how to tell a family their loved one has died, manage a patient screaming at you, or sit with someone in the worst moment of their life. Then it happens, without warning and without a script.',
      'These aren\u2019t rare \u2014 they\u2019re routine. The people who handle them well aren\u2019t gifted talkers; they\u2019ve learned a framework and practised it. You don\u2019t need perfect words. You need to be honest, present and human \u2014 and that\u2019s enough, and more than most people get.'
    ],
    analogyIcon: 'bi-chat-left-text',
    analogy: 'Treat a difficult conversation as a river to navigate, not a road to cross. A road has a right answer \u2014 wait for a gap and go. A river has a current and unexpected depths. You don\u2019t control it; you stay on your feet, read what\u2019s coming, and adjust.',
    steps: [
      'Breaking bad news: prepare the person (\u201cI need to tell you something difficult\u201d), say it plainly without euphemism (\u201che has died\u201d), then be silent \u2014 the silence is the space they need \u2014 and follow their lead.',
      'Managing anger: anger is usually fear in a louder coat. Acknowledge the feeling underneath before you defend or explain \u2014 \u201cI can see how frightened you are; let me tell you what I know.\u201d',
      'Someone in crisis: presence before intervention. You don\u2019t fix them; you sit with them, and your calm is the intervention.'
    ],
    onSceneSetup: 'A 34-year-old man in cardiac arrest. You and your crewmate have worked it for thirty-five minutes; the rhythm\u2019s been unsurvivable throughout, and you\u2019ve made the decision to stop. His wife\u2019s in the kitchen. You bring her through, sit down with her \u2014 not standing over her \u2014 and say: \u201cMrs Harrison, I need to tell you something very difficult. We\u2019ve done everything we possibly can for David. But I have to tell you that he has died. I\u2019m so sorry.\u201d',
    onSceneReveal: 'Then silence. You don\u2019t move, don\u2019t look at your watch, don\u2019t reach for paperwork. You\u2019re completely present, and you stay as long as she needs. That\u2019s the whole framework \u2014 not complicated, but it takes practice to deliver without flinching, and most students have never practised it.',
    tryItScenario: 'A 78-year-old man with a known DNAR has deteriorated at home. His daughter met you at the door and said he doesn\u2019t want resuscitation. When you confirm you\u2019ll follow his wishes and not attempt it, she becomes distraught: \u201cYou have to do something. You can\u2019t just let him die.\u201d',
    tryItQuestions: 'How do you respond? What do you acknowledge first? What do you explain, and how? How do you hold your clinical position \u2014 which is legally and ethically right \u2014 while being genuinely compassionate to someone in acute grief?',
    hollieSample: 'One of the hardest \u2014 you\u2019re right clinically and legally, and she\u2019s terrified and grieving, both at once. What do you acknowledge before you explain anything about the DNAR? Try the first thing you\u2019d actually say, and notice whether it leads with the document or with her.',
    wrapPoint: 'You don\u2019t need the perfect words for the hardest conversations \u2014 you need to be honest, present, and unhurried. That\u2019s a skill you can practise, not a gift you\u2019re born with.',
    takeaways: ['Be honest and plain \u2014 then let silence do its work.', 'Anger is usually fear; acknowledge the feeling first.', 'Presence beats the perfect words.']
  },
  {
    id: 22, number: 22, year: 3, section: 'Section 7 \u00b7 When it goes wrong',
    title: 'Fixation error',
    summary: 'Recognise when your thinking has locked onto one answer and stopped looking \u2014 and break out before it harms your patient.',
    whyItMatters: [
      'Fixation error is one of the best-documented causes of clinical error, and it doesn\u2019t feel like an error \u2014 it feels like confidence. The pieces fit, the picture makes sense, and the pieces that don\u2019t fit get quietly set aside.',
      'The conditions that cause it define the job: time pressure, high load, a deteriorating patient, a crewmate who already agreed with your first impression. Students are especially exposed \u2014 fewer stored patterns means a stronger pull toward the first one that fits.'
    ],
    analogyIcon: 'bi-geo-alt',
    analogy: 'A sat nav that\u2019s lost signal but keeps giving directions \u2014 \u201cturn left, continue three miles\u201d \u2014 based on where it thinks you are, not where you are. Fixation\u2019s the same: information arrives that doesn\u2019t fit, and instead of recalculating you keep following the old route.',
    steps: [
      'Name it \u2014 say the diagnosis you\u2019re working to, out loud. Named assumptions are easier to challenge.',
      'Hunt what doesn\u2019t fit \u2014 not the supporting evidence, the finding your diagnosis can\u2019t explain. If you\u2019ve been ignoring one, that\u2019s the fixation.',
      'Say the alternative out loud \u2014 \u201ccould this be something else?\u201d It breaks the momentum and reopens your thinking.'
    ],
    onSceneSetup: 'A 47-year-old woman, collapsed at home, found by a neighbour who says she\u2019s been very low since her divorce, there are wine bottles in the kitchen, she\u2019s been struggling. She\u2019s unresponsive on the sofa, a faint smell of alcohol, breathing slow. You\u2019re working to a suspected overdose, and you start assessing through that lens.',
    onSceneReveal: 'Then, almost as an afterthought, you run a basic check you\u2019d normally do in the first two minutes \u2014 her blood glucose. Dangerously low. A rapidly reversible cause in plain sight, and a clue on the coffee table you walked straight past. The neighbour\u2019s story wasn\u2019t wrong, but it handed you a diagnosis before you\u2019d assessed a single sign \u2014 and you took it.',
    tryItScenario: 'You\u2019ve been on scene twelve minutes with a 44-year-old woman you\u2019re managing as a severe asthma attack. She\u2019s had asthma since childhood and the obstruction\u2019s real, but the standard first-line approach has only partly improved things.',
    tryItQuestions: 'Run the break-out steps. Name your working diagnosis. Now actively look for what doesn\u2019t fit. What would a fixation error look like on this job \u2014 and what finding might break you out of it?',
    hollieSample: 'You\u2019ve named asthma \u2014 the obvious read, and probably part of it. So pressure-test it: the response\u2019s only partial. What else can make someone breathless and wheezy, look like asthma, but not respond the way asthma should? Pick one, and the single thing you could check now to rule it in or out.',
    wrapPoint: 'Fixation feels like confidence, which is what makes it dangerous. Name your diagnosis out loud and go hunting for the fact that doesn\u2019t fit.',
    takeaways: ['Fixation feels like certainty, not error.', 'Hunt the finding your diagnosis can\u2019t explain.', 'Saying \u201ccould this be something else?\u201d out loud breaks the lock.']
  },
  {
    id: 23, number: 23, year: 3, section: 'Section 7 \u00b7 When it goes wrong',
    title: 'Cognitive overload',
    summary: 'Recognise when your brain has hit its limit \u2014 and manage it deliberately instead of pushing through and making avoidable errors.',
    whyItMatters: [
      'Working memory is extraordinary but not unlimited. When demand exceeds capacity, performance doesn\u2019t fade gently \u2014 it trips like a circuit breaker. The higher-order thinking goes first, and you make mistakes that, reviewed calmly later, are hard to explain.',
      'The prehospital environment is a cognitive-overload machine: several information streams at once, physical and emotional demands, uncertainty, radio traffic, time pressure. Students hit the limit faster than experienced clinicians \u2014 not because they\u2019re less able, but because experience automates the routine and frees capacity for the decisions that matter.'
    ],
    analogyIcon: 'bi-stack',
    analogy: 'Working memory is a whiteboard with a fixed surface. Keep writing in big letters and adding urgent notes without erasing, and new information has nowhere to go. The answer isn\u2019t to write faster \u2014 it\u2019s to wipe what you don\u2019t need and organise what\u2019s left.',
    steps: [
      'Offload \u2014 get anything out of your head that doesn\u2019t need to be there. Write it, say it to your crewmate, use the patient report form as a thinking tool.',
      'Prioritise \u2014 narrow to the single most important thing right now. The treatment ladder (Framework 14) tells you what that is.',
      'Simplify \u2014 call for backup earlier, hand a task off. A few things done well beats everything done badly. Asking for help shows you know your limits.'
    ],
    onSceneSetup: 'A road traffic collision, one vehicle, two patients \u2014 a trapped driver and a passenger who\u2019s self-extricated and wandering in the road. No fire service yet, traffic building, your crewmate on the radio for backup. Your whiteboard\u2019s filling fast and the overload\u2019s starting.',
    onSceneReveal: 'The answer isn\u2019t to think faster \u2014 it\u2019s to offload and prioritise. Out loud, to your crewmate: \u201cI\u2019m on the trapped driver \u2014 highest priority. Get the passenger out of the road and do a primary survey. Call me immediately if he deteriorates.\u201d Two tasks, two people, clearly allocated. The whiteboard just got much cleaner, and you can think again.',
    tryItScenario: 'You\u2019re alone in the front \u2014 your crewmate\u2019s managing a critically unwell patient in the back. You\u2019re driving to hospital while trying to update your pre-alert, watch the patient through the glass, answer a radio call from Control, and remember whether you\u2019ve already repeated the treatment you started.',
    tryItQuestions: 'What do you do first? What can wait? What gets offloaded, and how? At what point do you pull over \u2014 and why is that sometimes the right clinical call?',
    hollieSample: 'You\u2019re pulled four ways and driving \u2014 the most dangerous combination. Of those demands, which one can\u2019t wait, and which two could you safely drop or hand off? And be honest \u2014 what would make pulling over the safer clinical call rather than a failure?',
    wrapPoint: 'Overload doesn\u2019t fade gently \u2014 it trips a breaker, and your best thinking goes first. Offload, prioritise and simplify before you\u2019re past the point of doing it well.',
    takeaways: ['Performance collapses suddenly under overload, not gradually.', 'Offload, prioritise to one thing, then simplify.', 'Asking for help is recognising your limit, not failing.']
  },
  {
    id: 24, number: 24, year: 3, section: 'Section 7 \u00b7 When it goes wrong',
    title: 'The deliberate reset',
    summary: 'A deliberate pause in a deteriorating or unclear job \u2014 a structured reset that breaks the momentum and creates space to think.',
    whyItMatters: [
      'There\u2019s a powerful instinct in prehospital care to keep moving \u2014 to read action as progress and stillness as failure. Sometimes that\u2019s right; an arrest needs compressions, not reflection. But there\u2019s a more common situation where the instinct to keep moving makes things worse.',
      'Where the team\u2019s been doing the same ineffective thing for minutes without asking whether it\u2019s the right thing. Where fixation\u2019s running quietly. Where new information\u2019s arrived that nobody\u2019s stopped to take in. There, the most productive thing you can do is stop \u2014 completely, for a minute or two \u2014 and look at the whole picture fresh.'
    ],
    analogyIcon: 'bi-pause-circle',
    analogy: 'A pit stop in a motor race. The car doesn\u2019t pull in because it\u2019s given up \u2014 the crew outside, with a clearer view than the driver, have seen something that needs changing. The stop costs time; carrying on at full speed on failing tyres costs more.',
    steps: [
      'Reassess the patient from scratch \u2014 a fresh primary survey, as if you\u2019ve just walked in.',
      'Reassess the plan \u2014 what have you done, has it worked, and if not, is it the wrong intervention or just needs more time?',
      'Reassess the diagnosis \u2014 is your impression still the best fit for everything you see?',
      'Get a fresh perspective \u2014 your crewmate may have seen something you haven\u2019t.'
    ],
    onSceneSetup: 'You\u2019ve managed a 55-year-old man with severe breathlessness for nine minutes. He\u2019s had the standard inhaled treatment for presumed bronchospasm, but his breathing hasn\u2019t improved and his sats have fallen from 90 to 86 despite oxygen. He\u2019s tiring. The instinct is to do more of the same.',
    onSceneReveal: 'Instead you call the reset. You step back. A fresh primary survey \u2014 and his windpipe looks slightly deviated to one side, and the breath sounds on the left are absent. The diagnosis has just changed completely: this isn\u2019t bronchospasm, it\u2019s a tension building in the chest you\u2019ve been treating as asthma for nine minutes. Thirty seconds of stillness, a completely different outcome.',
    tryItScenario: 'You\u2019re eight minutes into managing a 70-year-old woman who collapsed at home. Barely conscious (GCS 8), heart rate 38, blood pressure 74 over 40. You\u2019ve given the first-line treatment for the dangerously slow heart rate with minimal effect, and your crewmate\u2019s getting access for a fluid challenge.',
    tryItQuestions: 'You call the reset. Walk the four steps. What do you reassess? What does the fresh primary survey tell you? Is the plan right? Is the diagnosis right \u2014 and if the first treatment hasn\u2019t worked, what does that suggest about the rhythm and the underlying cause?',
    hollieSample: 'The first treatment not working is itself your most useful clue \u2014 it\u2019s telling you something. So pause: if the obvious approach to a dangerously slow heart hasn\u2019t shifted it, what does that make you reconsider about the rhythm, or what\u2019s driving it underneath? Name the thing you haven\u2019t yet looked for.',
    wrapPoint: 'When a job\u2019s going nowhere, more speed rarely helps \u2014 a deliberate stop does. Reassess the patient, the plan and the diagnosis as if you\u2019ve just arrived.',
    takeaways: ['Stillness can be the most productive thing you do.', 'Reassess patient, plan and diagnosis from scratch.', 'A treatment that isn\u2019t working is a clue, not a reason to repeat it.']
  },
  {
    id: 25, number: 25, year: 3, section: 'Section 7 \u00b7 When it goes wrong',
    title: 'Human factors on the road',
    summary: 'Understand how fatigue, stress and shift work affect your decisions \u2014 and manage those effects honestly instead of pretending they don\u2019t exist.',
    whyItMatters: [
      'Human factors \u2014 how performance is shaped by the environment, the system and the conditions you work in \u2014 transformed safety in aviation and surgery. Prehospital care is catching up, slowed by a culture that long valued toughness over honesty about human limits.',
      'That\u2019s changing, slowly, and meanwhile you\u2019re expected to perform at full capacity however long you\u2019ve been on, however many hard jobs back to back, however little you\u2019ve eaten. The things that degrade performance \u2014 fatigue, hunger, the residue of a difficult call \u2014 don\u2019t announce themselves. Knowing you\u2019re not at your best is a clinical finding; ignoring it is a clinical risk.'
    ],
    analogyIcon: 'bi-clipboard-pulse',
    analogy: 'A pilot\u2019s pre-flight check \u2014 but on yourself. A responsible pilot asks: am I fit to fly? Enough sleep? Affected by stress or illness? The answer isn\u2019t always yes. You can\u2019t run a formal check before every shift, but you can build honest awareness of what affects you.',
    steps: [
      'Awareness \u2014 know which conditions are present and be honest about how they\u2019re affecting you. After long enough without sleep, performance can be measurably impaired.',
      'Adjustment \u2014 work more deliberately when they are: check your reasoning more, verbalise more, lower your threshold for asking your crewmate to lead or calling backup early.',
      'Access \u2014 know how to reach support when the weight gets too much. Occupational health, peer support and clinical supervision exist for exactly this; using them is professional responsibility, not weakness.'
    ],
    onSceneSetup: 'It\u2019s the fourth job of a night shift. The third was a paediatric cardiac arrest that didn\u2019t survive. You\u2019re now sent to a 60-year-old man with chest pain. Be honest about what you\u2019re carrying in: your emotional state isn\u2019t neutral, your focus isn\u2019t where it usually is, and your threshold for distress is lower than it was six hours ago.',
    onSceneReveal: 'It doesn\u2019t mean you can\u2019t do the job well \u2014 it means you do it more deliberately. You run your primary survey consciously, step by step, instead of on the autopilot fatigue has dulled. You narrate your reasoning to your crewmate. You use the deliberate reset if the picture\u2019s unclear. And when the shift ends you don\u2019t just go home and expect sleep to fix it \u2014 you talk to someone, because the job you\u2019re carrying deserves to be put down properly.',
    tryItScenario: 'Think about the last time you were genuinely not at your best \u2014 tired, stressed, or emotionally affected by something.',
    tryItQuestions: 'If you\u2019d been called to a complex job in that moment, what would have been different about your performance? What errors are you most vulnerable to when fatigued, and which when emotionally affected? What\u2019s your specific, practical plan for managing those when they\u2019re present?',
    hollieSample: 'This one\u2019s about you, not a patient, which makes it the hardest to be honest about. Pick the last time you were running on empty \u2014 what kind of mistake were you closest to making? And what\u2019s one concrete thing, not a vague intention, you could put in place for next time that state creeps up?',
    wrapPoint: 'You are part of your own equipment. Noticing when fatigue or a hard job has dulled you \u2014 and adjusting for it \u2014 is a clinical skill, and so is knowing when to reach for support.',
    takeaways: ['Knowing you\u2019re not at your best is a clinical finding.', 'When you\u2019re depleted, slow down and verbalise more.', 'Using support is professional responsibility, not weakness.']
  }
];

window.PLACEMENT_ADVICE = {
  1: [
    { title: 'Before your shift', icon: 'bi-bag-check', body: [
      'The nerves the night before are completely normal \u2014 every paramedic you\u2019ll ever meet had them too. Get the practical things sorted early: uniform and kit ready, route and start time checked, a proper meal and as much sleep as the nerves will allow. Arrive a little early, introduce yourself to your mentor and the crew, and go in with one honest expectation \u2014 you\u2019re there to learn, not to know everything. The pressure you\u2019re putting on yourself is almost always higher than the pressure anyone\u2019s putting on you.',
      'Dress smart. It\u2019s not a night out, so tuck your top in and clean your boots. Look professional and you\u2019ll act professional. Lose the excess jewellery, go bare below the elbow, and you\u2019ll be treated well. Try to \u201cbe an individual\u201d and it won\u2019t go down well.'
    ] },
    { title: 'Your first few shifts', icon: 'bi-binoculars', body: [
      'The first few shifts can feel like standing in a busy room where everyone\u2019s speaking a language you only half understand \u2014 and that\u2019s exactly how they\u2019re meant to feel. Your job at this stage isn\u2019t to perform, it\u2019s to watch: how the crew moves, how they talk to patients, how a scene gets read in the first thirty seconds. Find small ways to be useful, ask where you should stand, and let yourself be a beginner. Competence comes in layers, and nobody fitted them all on day one.',
      'Get in 30 minutes early every day. Find your truck and start going through every single cupboard and every single bag \u2014 you need to know what is in there and what it does. The quickest way to impress your mentor is, on a time-critical job, being able to immediately put your hand on a Russell chest seal.',
      'And bring treats. Not only will your mentor\u2019s eyes light up, but your crewmates\u2019 too. Never underestimate the power of Haribo.'
    ] },
    { title: 'When a job gets to you', icon: 'bi-chat-heart', body: [
      'Some jobs will stay with you longer than others, and that doesn\u2019t mean you\u2019re not cut out for this \u2014 it means you\u2019re human, and being affected by hard things is part of caring about them. Don\u2019t carry it alone or feel you have to look unshaken. Talk to your mentor, your crewmate, your university tutor, or someone you trust at home; saying it out loud is often what stops it sitting heavy. And if something keeps returning \u2014 your sleep, your mood, your appetite \u2014 treat that as a signal to reach out for proper support, not something to push through. The people around you would far rather you spoke up early.',
      'Talk\u2026 sharing the load is a real thing, and it works.'
    ] },
    { title: 'Asking questions without feeling daft', icon: 'bi-question-circle', body: [
      'Here\u2019s the thing nobody says often enough: asking questions is what good clinicians do, not what beginners do. Your mentor expects them \u2014 a placement where you ask nothing tends to worry them more than one where you ask plenty. Pick your moment (not mid-resus), jot the question down if now isn\u2019t the time, and try asking \u201cwhy\u201d as well as \u201cwhat,\u201d because the reasoning is the part that sticks. The only daft question is the one you sat on because you were too proud to ask.',
      'A really good mentor will admit when they don\u2019t know the answer, and they\u2019ll go and search for it with you. And then you\u2019ll quickly realise they aren\u2019t Superman or Superwoman \u2014 they\u2019re human, just like you.'
    ] }
  ],
  2: [
    { title: 'Taking more of the lead', icon: 'bi-flag', body: [
      'Second year is where the training wheels start coming off \u2014 your mentor steps back a little and lets you run more of the call, and that gap they leave is meant to feel slightly uncomfortable. That discomfort is the work; it\u2019s what growth actually feels like. Take the assessment, voice your thinking out loud, commit to a plan \u2014 and let your mentor be the safety net they\u2019re there to be, rather than the driver. You\u2019ll get things wrong while you find your feet leading, and that\u2019s not a sign you\u2019ve stepped up too soon \u2014 it\u2019s the only way anyone ever does.',
      'Try this\u2026 repeat the patient\u2019s concerns, cover the history and observations, and explain your thinking and your idea for a plan \u2014 but at the end, add a few words to give your mentor the chance to step in if needed: \u201cIs there anything else you\u2019d like to ask, or any concerns you have that I may not have covered?\u201d'
    ] },
    { title: 'Managing tiredness and shifts', icon: 'bi-moon-stars', body: [
      'Shift work is one of the hardest parts of this job to get good at, and nobody really teaches it \u2014 you learn it the tired way. Protect your sleep like it\u2019s part of your kit: wind down properly after a late, get daylight and movement on your days off, and eat and drink regularly across a shift rather than running on fumes and a vending machine. Fatigue isn\u2019t a badge of toughness \u2014 it quietly blunts your judgement, and the culture that treats pushing through as strength has it backwards. Looking after the basics is what lets you do the job well, shift after shift.'
    ] },
    { title: 'When you make a mistake', icon: 'bi-bandaid', body: [
      'You will make mistakes \u2014 every clinician who has ever worked has \u2014 and what defines you isn\u2019t whether it happens but what you do next. The instinct to hide it or shrink is human, but the professional move is the opposite: own it, say it early, and report it through the proper channel so it can be learned from. A good service treats that as how care gets safer, not as a stick to beat you with. And go easy on yourself afterwards; carrying it quietly helps no one, so talk it through with your mentor and let it make you sharper rather than smaller.',
      'Look at the HCPC hearings and you\u2019ll see that no one gets struck off for an individual error. However, they will do for lying \u2014 or for squeezing someone\u2019s personal bits!'
    ] }
  ],
  3: [
    { title: 'Becoming the decision-maker', icon: 'bi-compass', body: [
      'By third year the question quietly shifts from \u201cwhat would my mentor do?\u201d to \u201cwhat am I going to do?\u201d \u2014 and being the one the decision lands on is a different weight entirely. Learn to trust the reasoning you\u2019ve spent two years building, while holding it lightly enough to change your mind when the picture does. Confidence here isn\u2019t never being unsure; it\u2019s being able to act sensibly while you\u2019re unsure and keep reassessing. And knowing when to call for help is not a gap in your decision-making \u2014 it is good decision-making.'
    ] },
    { title: 'Preparing for sign-off', icon: 'bi-patch-check', body: [
      'Sign-off feels enormous from a distance and a lot more manageable once you break it into pieces \u2014 so start early and treat your portfolio as something you build week by week, not a panic in the final month. Use every shift as evidence: capture what you did, why you did it, and what you\u2019d change. Practise saying your clinical reasoning out loud, because being able to explain a decision is often what\u2019s really being assessed. And as the date nears, take the feedback you keep getting at face value \u2014 if the people signing you off think you\u2019re ready, it\u2019s worth believing them.'
    ] },
    { title: 'Looking after yourself long-term', icon: 'bi-battery-charging', body: [
      'This is a career, not a sprint, and the habits you build now are the ones that decide whether you\u2019re still well and still enjoying it in ten years. Get good early at putting jobs down properly \u2014 debriefing, talking to people who get it, having a life that\u2019s fully yours when the uniform comes off. Notice your own warning signs the way you\u2019d notice a patient\u2019s, and treat protecting your wellbeing as part of being a competent clinician, not a luxury on top of it. The best paramedics aren\u2019t the ones who never feel the weight \u2014 they\u2019re the ones who\u2019ve learned how to carry it sustainably.'
    ] }
  ]
};
