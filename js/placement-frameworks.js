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

  /* ---------- YEAR TWO (PRO) — stubs, content added later ---------- */
  {
    id: 5, number: 5, year: 2, section: 'Section 2 · The primary survey',
    title: 'When ABCDE breaks',
    summary: 'Keeping structured thinking when a patient does not present by the textbook and your assessment starts to feel like it is falling apart.',
    whyItMatters: [
      'Textbooks present patients cleanly: a problem at B is a problem at B, and your assessment flows neatly from A to E. Real patients are far less cooperative.',
      'The patient who is fitting and vomiting at once. The trauma patient with an airway problem and a heavy bleed who is fighting you. The elderly patient where every letter is lighting up. These jobs do not break ABCDE \u2014 they break a mechanical, linear use of it. It is not a conveyor belt; it is a priority system, and when everything happens at once the priorities still hold, you just work them differently.'
    ],
    analogyIcon: 'bi-shuffle',
    analogy: 'Think of a juggler. A novice drops three balls at once. An experienced juggler keeps several objects going \u2014 not by doing everything simultaneously, but by cycling attention rapidly between them, always returning to the most critical first.',
    steps: [
      'Run a dynamic reassessment loop \u2014 assess, deal with anything immediately life-threatening, reassess, repeat \u2014 rather than a single linear sweep.',
      'Call for help earlier than feels comfortable. Escalate when things are heading in a direction you do not like, not once you are certain.',
      'Communicate with your crewmate: short, clear, closed-loop \u2014 what you have found, what you are doing, what you need (that is Framework 21).'
    ],
    onSceneSetup: 'A 72-year-old man in cardiac arrest. You are doing compressions, your crewmate is managing the airway, the defibrillator is charging, and his wife is in the doorway asking if he will be all right.',
    onSceneReveal: 'ABCDE has not broken \u2014 but you are not working it in a line. A and C are being managed at once by two people, D is not relevant yet, and you are cycling \u2014 compressions, rhythm check, airway, rhythm check \u2014 on a loop. The framework is still there; it is just running faster, with more hands, and as a loop rather than a line.',
    tryItScenario: 'A 19-year-old man who has been assaulted. He is conscious but agitated and combative, with a heavily bleeding wound to his left thigh and fast, noisy breathing. He will not let you near him.',
    tryItQuestions: 'What are your immediate priorities? How do you apply the framework when the patient is actively stopping you from assessing them?',
    hollieSample: 'Tricky one \u2014 the patient himself is the obstacle. You have at least two things shouting for attention. Which is most likely to kill him first, and how might you get a hand on it given he will not cooperate? Tell me your first move and why it comes before the others.'
  },
  {
    id: 8, number: 8, year: 2, section: 'Section 3 · History taking',
    title: 'SOCRATES \u2014 the pain conversation',
    summary: 'A structured way to explore pain that gives you a complete picture \u2014 and helps patients describe something they often struggle to put into words.',
    whyItMatters: [
      'Pain is the most common reason people call 999, and one of the hardest things to describe. Ask someone about their pain and you often get \u201cit hurts,\u201d \u201cit really hurts,\u201d or a puzzled silence. That is not unhelpfulness \u2014 most people simply have no framework for describing pain.',
      'Your job is to give them the one they are missing. Site, Onset, Character, Radiation, Associated symptoms, Timing, Exacerbating and relieving factors, Severity \u2014 eight prompts, one complete picture. Each one is a clinical discriminator that nudges you towards or away from a working impression.'
    ],
    analogyIcon: 'bi-tools',
    analogy: 'Think of SOCRATES as a sculptor\u2019s toolkit, not a form to complete top to bottom. A sculptor reads the material first, then reaches for the tool the moment calls for \u2014 and revisits an earlier one when the work has moved on. You follow the conversation, using each element as it is needed.',
    steps: [
      'Run it as a guided dialogue, not a rapid-fire interrogation \u2014 your genuine curiosity is what draws out the detail.',
      'Watch severity carefully: a patient who says \u201ceight\u201d while reading a magazine is telling you something different from one who says \u201ceight\u201d and cannot finish a sentence. When the number and the presentation diverge, that gap is itself a finding.'
    ],
    onSceneSetup: 'A 52-year-old man with chest pain. He describes a tightness across his chest that started forty minutes ago while watching television \u2014 so not exertional. It is not radiating, with no breathlessness, nausea or sweating. He rates it six out of ten, and nothing makes it better or worse.',
    onSceneReveal: 'That SOCRATES has given you a picture, not just a complaint. The character (tightness) fits a cardiac cause; onset at rest is significant; the absence of radiation and associated symptoms is mildly reassuring but rules nothing out; the stable severity says it has not escalated but has not resolved. Every element earned its place.',
    tryItScenario: 'A 34-year-old woman with abdominal pain. She describes it as coming in waves, centred around her belly button, getting worse over six hours. She looks pale and is struggling to get comfortable.',
    tryItQuestions: 'Work through SOCRATES in your head. What does each element tell you? What are the key discriminators, and what are you moving towards or away from?',
    hollieSample: 'Good \u2014 \u201ccomes in waves\u201d and \u201ccentred around the belly button\u201d are both doing work for you. What does a colicky, waxing-and-waning pain suggest about what is going on inside? And does pain near the umbilicus that later shifts change your thinking? Pick the one element of SOCRATES you most want to pin down next.'
  },
  {
    id: 9, number: 9, year: 2, section: 'Section 3 · History taking',
    title: 'The reluctant patient',
    summary: 'Keeping a structured, effective approach when a patient is confused, frightened, non-communicative or resistant \u2014 and the usual history-taking has stopped working.',
    whyItMatters: [
      'The earlier history frameworks assume the patient can and will engage. Many will. Some absolutely will not \u2014 the confused elderly patient, the frightened one convinced hospital means something terrible, the intoxicated or distressed one who does not trust you yet, the patient too unwell to speak at all.',
      'These patients do not have histories that are unavailable \u2014 they have histories that need a different way in. When the front door is closed, you do not abandon the house; you look for another way in.'
    ],
    analogyIcon: 'bi-puzzle',
    analogy: 'Think of a jigsaw with half the pieces missing from the box. You cannot force them to appear, but you can build what you can from the pieces you have, identify the gaps, and use the picture on the lid to make intelligent inferences about the rest.',
    steps: [
      'The patient \u2014 whatever they can give you. Short questions, simple language, yes or no where possible.',
      'The people around them \u2014 family, carers, neighbours, who often know the baseline, the medications, and what changed and when.',
      'The environment \u2014 the medication organiser, the discharge letter, the alert bracelet. The scene often carries the history the patient cannot give (Framework 2).',
      'Your own assessment \u2014 when the history is thin, the examination and observations carry more weight. Build from the bottom up when you cannot build from the top down.'
    ],
    onSceneSetup: 'An 84-year-old woman found on the floor by her carer. She is conscious but acutely confused, cannot tell you her name or the day, and is pulling at your hand. Your usual history approach is immediately limited, so you shift.',
    onSceneReveal: 'You ask the carer about her baseline and what changed. You scan the room: a weekly medication organiser, today is Thursday, and Monday to Wednesday are still full \u2014 untouched since the weekend. You examine her: warm, dry, and her clothing smells offensive. A picture forms \u2014 a probable infection causing acute confusion in a frail woman \u2014 built almost entirely without a direct history. The framework got you there.',
    tryItScenario: 'A 28-year-old man sitting in a stairwell, reported as acting strangely. He will not make eye contact and has not spoken since you arrived. He has no visible injuries.',
    tryItQuestions: 'Using the four sources: what can the patient give you? What do you look for in the environment? Who else might know something? What does your clinical assessment tell you with no history?',
    hollieSample: 'Silence is not nothing \u2014 it is data, and so is the stairwell. Which of your four sources is most useful right now when the patient will not engage? And before you assume this is behavioural, what would you want to rule out that can present in exactly this way?'
  },
  {
    id: 10, number: 10, year: 2, section: 'Section 4 · Clinical thinking',
    title: 'Spot the pattern',
    summary: 'Understanding how clinical pattern recognition actually develops \u2014 and how to build it deliberately instead of waiting years for it to arrive.',
    whyItMatters: [
      'Ask an experienced paramedic how they knew, and they often cannot say precisely \u2014 it just felt familiar, something clicked. That is pattern recognition, and students often assume it either appears after years on the road or never. It can be built \u2014 but only if you understand what it is.',
      'It is not a memorised list you scroll through. It is your brain having seen enough variations of a presentation that it has built an internal template of how that thing looks, sounds and behaves \u2014 and exposure does not have to be real. Deliberate, focused practice builds templates just as well as live jobs, which means you can accelerate it before you ever set foot on an ambulance.'
    ],
    analogyIcon: 'bi-translate',
    analogy: 'Think of learning a language. At first a foreign tongue is an undifferentiated stream of sound. With exposure, individual words emerge, then phrases, then meaning \u2014 not by memorising every sound, but because your brain built the pattern. Clinical presentations separate out the same way.',
    steps: [
      'When you meet a presentation \u2014 on placement, in a scenario, in a case study \u2014 do not just record what happened. Ask: what was the pattern here? What combination of features made it what it was?',
      'Ask what you would recognise first if you saw it again, and what the single most important signal was. Writing that down is the deliberate practice that turns passive exposure into a template.'
    ],
    onSceneSetup: 'A 67-year-old man with a sudden, severe headache \u2014 the worst of his life \u2014 starting abruptly while reading. He vomited once, looks pale, and is unusually quiet.',
    onSceneReveal: 'If you have a template for this, something fires straight away: sudden, worst-ever headache, vomiting, a patient who looks more unwell than the obs suggest. If you do not, you have \u201ca headache with vomiting and unremarkable obs,\u201d and the urgency may not register. Both clinicians could look it up and describe it \u2014 the difference is the template, built through deliberate, repeated exposure.',
    tryItScenario: 'Think of the last clinical presentation you met \u2014 on placement, in a lecture, or in a case study.',
    tryItQuestions: 'What were the key features that made it what it was? Describe its pattern in three words. If you saw those three together, would you recognise them \u2014 and if not, what do you need to see more of?',
    hollieSample: 'Nice \u2014 boiling it down to three words is exactly the discipline that builds a template. Tell me your three. Then let us pressure-test them: is there another presentation that shares two of those three features? Knowing where two patterns overlap is how you avoid mixing them up on scene.'
  },
  {
    id: 11, number: 11, year: 2, section: 'Section 4 · Clinical thinking',
    title: 'The differential mindset',
    summary: 'Generating and systematically testing several explanations for a presentation \u2014 rather than locking onto the first one that fits.',
    whyItMatters: [
      'The most dangerous moment is not having no idea what is going on \u2014 it is having a perfectly reasonable idea and stopping looking. Fixating early has a name, premature closure, and it affects consultants as much as students: anyone working fast, under pressure, with incomplete information.',
      'The fix is not to avoid early impressions \u2014 they focus your assessment. It is to hold them lightly, keep generating alternatives, and actively hunt the evidence that would prove your first idea wrong.'
    ],
    analogyIcon: 'bi-search',
    analogy: 'Think of a detective trained to distrust their own hunches. They form a theory early \u2014 they cannot help it \u2014 but then they do the disciplined, uncomfortable thing: look for evidence that contradicts it, consider who else could be responsible, and let the evidence, not the hunch, decide.',
    steps: [
      'What else could this be? Not the most likely \u2014 the other realistic possibilities, including the less common but more dangerous ones.',
      'What would I expect to find if I am right, and what if I am not? That tells you exactly what to look for.',
      'What is the most dangerous thing this could be? Make sure your assessment has explicitly looked for and addressed it.'
    ],
    onSceneSetup: 'A 44-year-old woman with left-sided chest pain and breathlessness, onset two hours ago, no cardiac history. First impression: a possible clot on the lung given the presentation and demographics.',
    onSceneReveal: 'Now apply the framework. What else? Pleurisy, musculoskeletal pain, a collapsed lung, inflammation around the heart, anxiety \u2014 and an atypical cardiac cause, which should never be dismissed on age and sex alone. What would rule a clot in or out? Recent immobility, long-haul travel, the contraceptive pill, calf pain, a heart rate out of proportion to the pain, low sats \u2014 so you look for those specifically. You have not abandoned your first impression; you have made it robust enough to act on, or to replace.',
    tryItScenario: 'A 55-year-old man with sudden central abdominal pain radiating to his back. He is pale and sweating, with a blood pressure of 102 over 64.',
    tryItQuestions: 'Generate your differential. What is your leading impression? What are the alternatives? What is the most dangerous diagnosis on the list \u2014 and what one finding would confirm or rule it out?',
    hollieSample: 'You have got a worrying combination there \u2014 sudden tearing-type pain through to the back, pale, sweaty, a soft pressure. What is the most dangerous thing that fits, and what single examination finding would push you towards it? Name it, and tell me what you would do differently if you found it.'
  },
  {
    id: 12, number: 12, year: 2, section: 'Section 4 · Clinical thinking',
    title: 'Red flags and safety netting',
    summary: 'Spotting the features that change everything \u2014 and building in a deliberate check that the serious causes have not been missed before you decide.',
    whyItMatters: [
      'Most patients you see will not be critically unwell, and that is exactly where red flags matter most. A red flag does not confirm a serious diagnosis \u2014 it means the serious possibility cannot be dismissed without a reason, and that your assessment and documentation should show you looked.',
      'Students who have not internalised this assess presentations at face value: a headache gets assessed as a headache, back pain as back pain. A red flag is not an alarm \u2014 it is a question: before you close this, have you specifically looked for this?'
    ],
    analogyIcon: 'bi-clipboard-check',
    analogy: 'Think of a pre-flight checklist. The pilot does not run it expecting a problem \u2014 almost always everything is fine. They run it because the one time something is wrong, the cost of missing it is catastrophic, and ninety seconds guarantees nothing was overlooked in the rush.',
    steps: [
      'Before you commit, actively look for the serious features for this presentation \u2014 do not just hope they are absent.',
      'Know the universal ones: sudden severe onset, worst-ever symptoms, collapse with any complaint, neurological signs alongside a non-neurological complaint, a patient who looks more unwell than their story.',
      'Safety netting is the second half: when you are not conveying, make sure the patient and family know exactly what to watch for and what to do. That is a clinical intervention, not a disclaimer.'
    ],
    onSceneSetup: 'A 38-year-old man with lower back pain after a day of gardening. The pain is muscular, reproducible on movement, and his observations are entirely normal \u2014 reassuringly mechanical.',
    onSceneReveal: 'Before you close it, your red-flag check runs automatically: any numbness around the groin or inner thighs, any change in bladder or bowel control, any leg weakness, any history of cancer, any major trauma? All negative \u2014 so now you are not assuming it is mechanical, you have excluded what would make it serious. Then your safety netting: if any of those appear, call 999 immediately, do not wait until morning. He understands. That is safety netting done properly.',
    tryItScenario: 'A 26-year-old woman with a two-day headache, currently four out of ten. She has a history of migraines and thinks this is another one. She has taken an over-the-counter painkiller with partial relief.',
    tryItQuestions: 'What are the red flags for headache you need to specifically exclude before accepting this as a migraine? What would your safety netting look like if you are not conveying her?',
    hollieSample: 'A known migraine history is reassuring but it is also a trap \u2014 it makes \u201canother migraine\u201d the easy answer. What headache red flags would you actively check for before you accept that? Pick the two you would least want to miss, and tell me how you would word your safety netting so she actually acts on it.'
  },
  {
    id: 18, number: 18, year: 2, section: 'Section 6 · Communication',
    title: 'ATMIST \u2014 pre-alert and handover',
    summary: 'The agreed UK standard for pre-alert and handover \u2014 a structure that gives the receiving team everything they need, in the right order, to receive your patient safely.',
    whyItMatters: [
      'The handover is where your clinical work is transferred to another team. Done well it is seamless; done poorly, critical information arrives out of order or not at all, the receiving team starts from the wrong place, and occasionally something important falls into the gap.',
      'ATMIST is agreed across UK services and emergency departments precisely so everyone delivers information in the same order \u2014 the receiving team knows what is coming next and can prepare. Age and presentation, Time of onset, Mechanism or medical history, Injuries or findings, Signs (the vital signs), Treatment given. In that order, every time.'
    ],
    analogyIcon: 'bi-telephone-outbound',
    analogy: 'Think of a news report. A good journalist leads with who, what and when \u2014 the headline first \u2014 then fills in the context. ATMIST gives the receiving team the essential picture in the first two lines, with the supporting detail after.',
    steps: [
      'Lead with age and presentation \u2014 it tells the team what kind of patient is coming and how to prepare.',
      'Keep the pre-alert tight (thirty to forty-five seconds, focused on what they need to get ready); the on-arrival handover can carry more detail.',
      'Deliver it confidently, at a pace they can write to, without hedging or unnecessary story \u2014 you are transferring a picture, not telling a tale.'
    ],
    onSceneSetup: 'A pre-alert en route with a 68-year-old man, suspected STEMI. Onset of chest pain about ninety minutes ago, significant cardiac history including a previous heart attack. The 12-lead shows ST elevation in the inferior leads. Obs: heart rate 78, blood pressure 136 over 84, sats 97% on air, GCS 15. Initial treatment for cardiac chest pain underway. ETA eight minutes \u2014 please prepare the cath lab pathway.',
    onSceneReveal: 'Around forty seconds, and the receiving team knows exactly what is coming \u2014 they are already moving. Notice the shape: the headline (who, what, when) lands first, the obs say how unwell he is now, and \u201ctreatment underway\u201d closes the loop so nobody repeats what you have already done.',
    tryItScenario: 'You are en route with a 34-year-old woman, 32 weeks pregnant, who collapsed at home. She is now conscious with a GCS of 14, a blood pressure of 158 over 104, a severe headache and visual disturbances. You have IV access and are four minutes out.',
    tryItQuestions: 'Write your pre-alert ATMIST, then the fuller on-arrival handover. What is different between the two, and why?',
    hollieSample: 'Good scenario to practise on \u2014 there is a lot here the receiving team needs early. Try your pre-alert out loud in ATMIST order and notice what you instinctively lead with. Which single detail here most changes how the department prepares, and did it come early enough in your handover?'
  },
  {
    id: 21, number: 21, year: 2, section: 'Section 6 · Communication',
    title: 'Talking to your crew',
    summary: 'Communicating clearly with your crewmate on scene so both of you always know what is happening, what is needed, and who is doing what.',
    whyItMatters: [
      'In aviation, structured communication between crew \u2014 crew resource management \u2014 is credited with saving thousands of lives, because many crashes came not from one big failure but small communication breakdowns between competent people who each held a piece of the picture.',
      'Prehospital care has the same dynamic: two clinicians, a complex patient, time running out. If communication is assumed rather than explicit \u2014 each believing the other knows what they know \u2014 gaps appear, and gaps become errors. How well you communicate with your crewmate is as clinically important as how well you assess the patient.'
    ],
    analogyIcon: 'bi-people',
    analogy: 'Think of a surgical team in theatre. Before the procedure everyone states their role and the plan; during it, instructions are closed-loop \u2014 given, repeated back, confirmed; afterwards, a quick debrief. You are doing the same, faster, with two people.',
    steps: [
      'Closed-loop communication: give an instruction and wait for it to be confirmed; receive one and repeat it back before acting. Reserve the full loop for anything critical or time-sensitive.',
      'Build a shared mental model \u2014 narrate your reasoning briefly so your crewmate is working from the same picture: \u201cI think this is cardiac, I will get a 12-lead while you do obs, then we move.\u201d',
      'Speak up \u2014 the hardest one. If something does not look right, say so clearly and without aggression. A crew where only the senior voice counts makes more errors.'
    ],
    onSceneSetup: 'You are managing a cardiac arrest. You are on compressions; your crewmate is on the airway and the defibrillator. \u201cCharging the defib,\u201d they say. \u201cCopy, pausing compressions,\u201d you respond, and stop, checking you are clear. \u201cAll clear \u2014 shocking now.\u201d \u201cShock delivered, resuming compressions.\u201d \u201cGot it \u2014 two-minute cycle, I will call the next rhythm check.\u201d',
    onSceneReveal: 'Every instruction confirmed, every action acknowledged. Nobody is guessing what the other is about to do, and the communication is so automatic it frees both of you to focus entirely on the patient. That does not happen by accident \u2014 it is built through deliberate practice and a shared understanding that communication is part of the clinical intervention.',
    tryItScenario: 'You are on scene with your crewmate managing a patient with suspected sepsis. You have formed a working impression and want to bring your crewmate fully into the plan before you move to treatment.',
    tryItQuestions: 'Practise the shared mental model out loud: in three sentences, tell your crewmate what you think is going on, your plan, and what you need them to do. Then ask \u2014 what might they be seeing that you have not, and how do you create space for them to raise it?',
    hollieSample: 'Three sentences is the right discipline \u2014 it forces you to be clear. Give me yours: impression, plan, ask. Then the harder half \u2014 how do you actually invite your crewmate to challenge you, in a way that makes it easy for them to speak up rather than just nod along?'
  },

  /* ---------- YEAR THREE (PRO) — stubs, content added later ---------- */
  {
    id: 13, number: 13, year: 3, section: 'Section 4 · Clinical thinking',
    title: 'What am I missing?',
    summary: 'A deliberate pause before you commit \u2014 a final check that your own thinking has not led you somewhere the evidence does not actually support.',
    whyItMatters: [
      'Everything else in this section is about gathering better information and reasoning well. This one is about the thinker. Your brain is not a neutral processor \u2014 it has built-in biases that are largely invisible while they operate.',
      'Anchoring (over-weighting the first thing you hear), availability bias (over-rating diagnoses that come easily to mind), premature closure (stopping once you have something plausible). These are features of human cognition, not character flaws. The difference between a safe clinician and an unsafe one is not the absence of bias \u2014 it is the habit of checking for it.'
    ],
    analogyIcon: 'bi-zoom-in',
    analogy: 'Think of the final proofread before you send an important message. The read straight after writing is the least reliable \u2014 your brain fills in what it meant, not what is there. So you pause and read it again, slowly, looking for errors rather than for meaning.',
    steps: [
      'Does the picture actually support my impression, or have I made the evidence fit?',
      'What have I not assessed that I should have?',
      'Is there anything the patient told me that I have not explained?',
      'If I am wrong, what is the most likely alternative \u2014 and what are the consequences of missing it?'
    ],
    onSceneSetup: 'A 61-year-old man you have assessed as an exacerbation of his known COPD \u2014 long history, smoker, tight wheezy chest, sats 88%, a partial response to the standard inhaled treatment. The picture fits, and you are preparing to convey.',
    onSceneReveal: 'Run the check. Does it fit? Broadly \u2014 but the response was only partial and his respiratory rate is still high. What have you not assessed? You have not done a 12-lead. Anything unexplained? He mentioned the breathlessness came on quite suddenly this morning, not gradually \u2014 and sudden onset in a COPD patient raises a collapsed lung, which would explain the partial response. Thirty seconds, three things to re-examine before you commit.',
    tryItScenario: 'You are about to hand over a 78-year-old woman you have assessed as a urinary infection with associated confusion. The history fits, the obs are mildly abnormal, and the carer confirms she has had infections that presented this way before.',
    tryItQuestions: 'Run the check. Does the picture fully support it? What have you not assessed? Is anything unexplained? What is the most dangerous alternative \u2014 and have you explicitly looked for it?',
    hollieSample: '\u201cShe has had this before\u201d is exactly the kind of anchor this framework is built for. Play devil\u2019s advocate against your own diagnosis: what else causes acute confusion in an older woman that you would hate to miss? Name one, and tell me the single check that would help you exclude it.'
  },
  {
    id: 14, number: 14, year: 3, section: 'Section 5 · Treatment and decision making',
    title: 'The treatment ladder',
    summary: 'Prioritising interventions when several things need doing at once \u2014 so you treat the most important problem first, not the most visible one.',
    whyItMatters: [
      'In a textbook, treatment is one thing at a time in a sensible order. On scene with a sick patient, several things need doing at once and there is no obvious sequence: access, pain, a 12-lead, a falling blood pressure, an airway to reassess, a family asking questions, a crewmate waiting for direction.',
      'Under that pressure students freeze, or grab the nearest problem \u2014 the most visible, or the one they feel most confident with. Neither is a plan. A plan is a prioritised sequence based on one principle: deal with what is most likely to harm the patient first. The key skill is knowing what to do first \u2014 and being able to say why.'
    ],
    analogyIcon: 'bi-fire',
    analogy: 'Think of a fire crew at a burning building. They do not split up and tackle whatever flames they can see \u2014 they identify where the fire is most dangerous and prioritise. The stairwell first because it is the escape route; the occupied room first because lives are at stake. Every decision answers one question: what causes the most harm if we do not deal with it right now?',
    steps: [
      'Rank everything by one criterion: what happens to the patient if I do not do this in the next thirty seconds? The next five minutes? The next thirty?',
      'In practice that usually puts airway and breathing before circulation, before pain relief, before documentation.',
      'Stay flexible \u2014 if dealing with one problem reveals another higher up, go back up the ladder.'
    ],
    onSceneSetup: 'A 70-year-old man who has fallen, with an obvious deformity to his right thigh, significant pain, and a blood pressure of 94 over 58. He is conscious, his airway is clear, and his breathing is adequate. Everything on your list feels urgent.',
    onSceneReveal: 'The ladder gives you the order. The low blood pressure is the most dangerous finding \u2014 a fractured thigh can lose a lot of blood internally \u2014 so circulation comes first: access, a fluid challenge if indicated, reassess. Pain relief second, because the circulatory picture changes how safely you can give it. Splinting third, which also helps both pain and bleeding. Family and documentation fit around it. One problem at a time, most dangerous first.',
    tryItScenario: 'A 55-year-old woman in anaphylaxis after a wasp sting, with audible stridor, a widespread rash, a blood pressure of 78 over 50, and increasing agitation.',
    tryItQuestions: 'List every intervention you can think of. Now rank them with the treatment ladder. What is first, and why? What can wait \u2014 and for how long?',
    hollieSample: 'Lots competing for your attention here, and the patient is deteriorating. Of everything you listed, which one buys you the most time if you do it in the next thirty seconds \u2014 and which would you regret leaving any later? Put your top two in order and tell me what each is protecting against.'
  },
  {
    id: 15, number: 15, year: 3, section: 'Section 5 · Treatment and decision making',
    title: 'Stay or go',
    summary: 'Making the convey decision \u2014 stay and work, move now, or use an alternative pathway \u2014 when the right answer is not obvious.',
    whyItMatters: [
      'The convey decision is one of the most consequential a paramedic makes, and one of the least explicitly taught. Students are shown how to assess, treat and hand over \u2014 the decision in between is often left to \u201cinstinct you will develop.\u201d',
      'Get it wrong one way and you keep a time-critical patient on scene too long; the other way and you move someone who needed more before transport and watch them deteriorate in the back with fewer resources. The question is never simply whether to go \u2014 it is whether staying longer will help this patient more than moving sooner.'
    ],
    analogyIcon: 'bi-hourglass-split',
    analogy: 'Think of a set of scales in your head, time on one side and intervention on the other. The benefit of staying \u2014 what you can do here, the stabilising that makes the journey safer \u2014 against the cost of staying: time away from definitive care, deterioration, the things only a hospital can provide.',
    steps: [
      'Does this patient need something only a hospital can provide? If yes, the clock is already running.',
      'Is the condition time-critical \u2014 a treatment window that narrows by the minute?',
      'Is the patient stable enough to move and stay stable in transit? Two minutes stabilising before you go is different from twenty because you are unsure.',
      'Is there a better pathway than the emergency department \u2014 hear and treat, GP, mental health team, falls pathway?'
    ],
    onSceneSetup: 'A 67-year-old man who woke with sudden left-sided facial droop, arm weakness and slurred speech about fifty minutes ago. His observations are stable; he is alert and frightened.',
    onSceneReveal: 'Run the scales. Does he need something only a hospital can provide? Yes \u2014 a scan and time-critical stroke-centre treatment. Time-critical? Critically so \u2014 the window narrows with every minute on scene. Stable to move? Yes. A better pathway? No \u2014 he needs a stroke centre, directly, now. The scales tip immediately: your on-scene time is the pre-alert, a baseline set of obs, and loading. Everything else happens en route or at hospital.',
    tryItScenario: 'A 42-year-old woman with known alcohol dependence, confused and unsteady, with a blood sugar of 2.4. You correct the low blood sugar and her GCS improves from 13 to 15 within ten minutes. She is now alert, oriented, and saying she does not want to go to hospital.',
    tryItQuestions: 'Run the four questions. Does she need something only a hospital can provide? Is it time-critical? Is she stable? Is there an alternative pathway? What is your decision \u2014 and how do you document and defend it?',
    hollieSample: 'She has improved, she is refusing, and on the face of it she looks fine now \u2014 which is exactly where this gets tricky. What is it about the cause of her low blood sugar that should make you cautious about simply leaving her at home? Walk me through how you would weigh her right to refuse against that risk.'
  },
  {
    id: 16, number: 16, year: 3, section: 'Section 5 · Treatment and decision making',
    title: 'JRCALC as a tool, not a script',
    summary: 'Using clinical guidelines as a thinking aid that supports your decision-making \u2014 not a rulebook that replaces it.',
    whyItMatters: [
      'JRCALC is the clinical standard for UK paramedic practice \u2014 evidence-based, regularly updated, and the benchmark your decisions are judged against. You should know it, use it, and respect it. But there is a safe way to use it and a way that creates false security.',
      'The unsafe way treats it as a decision tree: patient presents with X, follow the pathway, tick the box, therefore correct. Guidelines are written for presentations, not patients \u2014 they describe what suits most people who present a certain way. They cannot account for the frail patient with several conditions whose physiology is nothing like the healthy person the guideline was calibrated on. JRCALC tells you what is usually right; whether it is right for this patient, right now, is your job.'
    ],
    analogyIcon: 'bi-map',
    analogy: 'Think of JRCALC as a map and your judgement as the driver. The map gives you the roads and the likely routes, and a good driver uses it constantly. But the map cannot see the roadworks or the flooded underpass \u2014 the driver looks at what is actually in front of them and makes the call the map alone cannot.',
    steps: [
      'Use it proactively \u2014 know the guideline for a presentation so you arrive with a clear framework of what is recommended and why.',
      'Use it reactively \u2014 on scene, to check your thinking or consider an option you had not thought of.',
      'When you deviate \u2014 and sometimes the right call is to \u2014 be able to explain why, clearly and professionally, and document it. If you are unsure whether the deviation is appropriate, that is the moment to call for clinical advice.'
    ],
    onSceneSetup: 'An 81-year-old man with acute fluid on the lungs. The guideline permits a particular treatment for this, with a blood-pressure cut-off below which you should not give it. His pressure sits just above that cut-off, so on the face of it you can proceed.',
    onSceneReveal: 'But you look at the patient. He is frail, on several blood-pressure tablets, and his wife says his pressure normally runs low \u2014 so \u201cjust above the cut-off\u201d is not reassuring, it is a failing heart working flat out. Give that treatment and his pressure could crash into shock. The guideline did not make that call \u2014 you did, because you looked at the patient, not just the number. That is JRCALC as a tool.',
    tryItScenario: 'A 34-year-old woman in active labour calls 999. The baby is crowning and you are about eight minutes from hospital.',
    tryItQuestions: 'Before you open the guideline: what do you already know? What decisions will you need to make in the next few minutes? Now open it \u2014 what does it add, and what does it not cover that you will need your own judgement for?',
    hollieSample: 'Crowning at eight minutes out makes the stay-or-go part of this almost decide itself \u2014 but the guideline still earns its place. What does it give you that is genuinely useful to have to hand right now? And what part of this will come down to your judgement and calm rather than any protocol?'
  },
  {
    id: 19, number: 19, year: 3, section: 'Section 6 · Communication',
    title: 'Talking to your GP, 111 and other agencies',
    summary: 'Making referral and inter-agency calls that are clear, credible and effective \u2014 so the patient gets the right outcome from the conversation, not just the assessment.',
    whyItMatters: [
      'Not every patient goes to an emergency department. Good prehospital care increasingly means finding the right pathway \u2014 a GP, a 111 clinician, a mental health crisis team, a falls team \u2014 which means picking up the phone. Students are almost never taught how to make these calls.',
      'A poor referral creates two risks: the receiving clinician does not have enough to decide safely, or you come across as uncertain and your assessment is taken less seriously. The person on the other end is making a clinical decision based entirely on what you tell them \u2014 the quality of your communication is the quality of their information.'
    ],
    analogyIcon: 'bi-telephone',
    analogy: 'Think of a business case delivered under time pressure. You do not open with background and hope they stay engaged \u2014 you open with the ask, what you need and why, then support it with the evidence. The listener knows immediately what is being requested.',
    steps: [
      'Identify yourself clearly \u2014 name, role, call sign or service.',
      'State the patient \u2014 age and location.',
      'State what you need and why \u2014 the ask comes before the evidence.',
      'Deliver a concise, structured clinical summary as your evidence.',
      'Confirm the outcome \u2014 what has been agreed, who does what next, read back anything you are unsure of.'
    ],
    onSceneSetup: 'A 67-year-old man with two days of worsening confusion and a temperature of 38.4, obs mildly abnormal but stable, no signs of systemic sepsis. You do not feel he needs an emergency department and you want the GP to advise on the right pathway.',
    onSceneReveal: 'You open with who you are and your call sign, name the patient and location, then lead with the ask \u2014 a same-day review, because you do not feel he needs the ED and would like them to consider whether community treatment is appropriate. Then the evidence: the confusion against his usual sharp baseline, the obs, no signs of systemic sepsis, no allergies. Structured, confident, complete \u2014 the GP has everything they need to decide safely.',
    tryItScenario: 'A 19-year-old woman who has taken a small intentional overdose of an over-the-counter painkiller about three hours ago. She is medically stable, GCS 15, and has engaged well. She has an existing mental health care plan and a named community psychiatric nurse.',
    tryItQuestions: 'You want to refer to the mental health crisis team rather than convey to the ED. Write your referral call using the five-part structure. What is your opening? What is your ask? What is your clinical summary?',
    hollieSample: 'Good \u2014 and notice the ask here is not just \u201ctake this patient,\u201d it is a specific pathway for a specific reason. Try your opening line and your ask out loud. What do you lead with so the crisis team immediately understands why they, and not the ED, are the right team for her?'
  },
  {
    id: 20, number: 20, year: 3, section: 'Section 6 · Communication',
    title: 'Difficult conversations',
    summary: 'Navigating the conversations that carry the most weight \u2014 breaking bad news, managing anger, being with someone in crisis \u2014 with honesty, compassion and clarity.',
    whyItMatters: [
      'Nobody teaches students how to tell a family their loved one has died, how to manage a patient screaming at them, or how to sit with someone in the worst moment of their life. Then those situations happen, without warning and without a script.',
      'They are not rare \u2014 they are routine. The clinicians who handle them well are not naturally gifted talkers; they have learned a framework and practised it. You do not need the perfect words. You need to be honest, present and human \u2014 and that is enough, and more than most people get.'
    ],
    analogyIcon: 'bi-chat-left-text',
    analogy: 'Think of a difficult conversation as a river to navigate, not a road to cross. A road has a correct solution \u2014 wait for a gap and go. A river has a current, changes direction, has unexpected depths. You do not control it; you stay on your feet, read what is coming, and adjust.',
    steps: [
      'Breaking bad news: prepare the person (\u201cI need to tell you something difficult\u201d), deliver it clearly without euphemism (\u201che has died\u201d), then be silent \u2014 the silence is the space they need \u2014 and follow their lead.',
      'Managing anger: anger is usually fear wearing a louder coat. Acknowledge the feeling underneath before you defend or explain \u2014 \u201cI can see how frightened you are; let me tell you what I know.\u201d',
      'Someone in crisis: presence before intervention. You do not fix them; you sit with them, and your calm is the intervention.'
    ],
    onSceneSetup: 'A 34-year-old man in cardiac arrest. You and your crewmate have worked it for thirty-five minutes; the rhythm has been unsurvivable throughout, and you have made the decision to stop. His wife is in the kitchen. You ask her to come through, you sit down with her \u2014 not standing above her \u2014 and say: \u201cMrs Harrison, I need to tell you something very difficult. We have done everything we possibly can for David. But I have to tell you that he has died. I am so sorry.\u201d',
    onSceneReveal: 'Then silence. You do not move, do not look at your watch, do not reach for paperwork. You are completely present with her, and you stay there as long as she needs. That is the whole framework \u2014 not complicated, but it takes practice to deliver without flinching, and most students have never practised it at all.',
    tryItScenario: 'A 78-year-old man with a known DNAR has deteriorated at home. His daughter met you at the door and told you he does not want resuscitation. When you confirm you will follow his wishes and not attempt it, she becomes distraught: \u201cYou have to do something. You cannot just let him die.\u201d',
    tryItQuestions: 'How do you respond? What do you acknowledge first? What do you explain, and how? How do you hold your clinical position \u2014 which is legally and ethically correct \u2014 while being genuinely compassionate to someone in acute grief?',
    hollieSample: 'This is one of the hardest ones \u2014 you are right clinically and legally, and she is terrified and grieving, and both are true at once. What do you acknowledge before you explain anything about the DNAR? Try the first thing you would actually say to her, and notice whether it leads with the document or with her.'
  },
  {
    id: 22, number: 22, year: 3, section: 'Section 7 · When it goes wrong',
    title: 'Fixation error',
    summary: 'Recognising when your thinking has locked onto one answer and stopped looking \u2014 and breaking out before it harms your patient.',
    whyItMatters: [
      'Fixation error is one of the best-documented causes of clinical error. It does not feel like an error \u2014 it feels like confidence. The pieces fit, the picture makes sense, and the pieces that do not fit get quietly set aside.',
      'The conditions that cause it define the job: time pressure, high load, a deteriorating patient, a crewmate who already agreed with your first impression. Students are especially exposed, because fewer stored patterns means the pull toward the first one that fits is stronger.'
    ],
    analogyIcon: 'bi-geo-alt',
    analogy: 'Think of a sat nav that has lost signal but keeps giving directions \u2014 \u201cturn left, continue three miles\u201d \u2014 based on where it thinks you are, not where you actually are. Fixation works the same way: new information arrives that does not fit, and instead of recalculating you keep following the original route.',
    steps: [
      'Name it \u2014 say the diagnosis you are working to, out loud. Named assumptions are easier to challenge.',
      'Hunt what does not fit \u2014 not the supporting evidence, the finding your diagnosis cannot explain. If you find one you have been ignoring, that is the fixation.',
      'Say the alternative out loud \u2014 \u201ccould this be something else?\u201d \u2014 even briefly. It breaks the momentum and reopens your thinking.'
    ],
    onSceneSetup: 'A 47-year-old woman, collapsed at home, found by a neighbour who tells you she has been very low since her divorce, there are wine bottles in the kitchen, and she has been struggling. She is unresponsive on the sofa, a faint smell of alcohol, breathing slow. You are working to a suspected overdose, and you begin your assessment with that lens.',
    onSceneReveal: 'Then, almost as an afterthought, you run a basic check you would normally do in the first two minutes \u2014 her blood glucose. It is dangerously low. There is a rapidly reversible cause sitting in plain sight, and a clue on the coffee table you walked straight past. The neighbour\u2019s story was not wrong, but it handed you a diagnosis before you had assessed a single clinical sign, and you took it.',
    tryItScenario: 'You have been on scene twelve minutes with a 44-year-old woman you are managing as a severe asthma attack. She has had asthma since childhood and the obstruction is real, but the standard first-line approach has produced only partial improvement.',
    tryItQuestions: 'Run the break-out framework. Name your working diagnosis. Now actively look for what does not fit. What would a fixation error look like on this job \u2014 and what finding might break you out of it?',
    hollieSample: 'You have named asthma \u2014 the obvious read, and probably part of the picture. So pressure-test it: the response has only been partial. What else can make someone breathless and wheezy, look like asthma, but not respond the way asthma should? Pick one, and tell me the single thing you could check right now to rule it in or out.'
  },
  {
    id: 23, number: 23, year: 3, section: 'Section 7 · When it goes wrong',
    title: 'Cognitive overload',
    summary: 'Recognising when your brain has hit its processing limit \u2014 and managing that limit deliberately instead of pushing through and making avoidable errors.',
    whyItMatters: [
      'Your working memory is extraordinary but not unlimited. When demand exceeds capacity, performance does not fade gently \u2014 it trips like a circuit breaker. The higher-order, analytical thinking goes first, and you start making mistakes that, reviewed calmly afterwards, are hard to explain.',
      'The prehospital environment is a cognitive-overload machine: several information streams at once, physical and emotional demands, uncertainty, radio traffic, time pressure. Students hit the limit faster than experienced clinicians \u2014 not because they are less able, but because experienced clinicians have automated the routine, freeing capacity for the decisions that matter.'
    ],
    analogyIcon: 'bi-stack',
    analogy: 'Think of your working memory as a whiteboard. There is a fixed surface. Keep writing in big letters and adding urgent notes without erasing, and new information has nowhere to go. The answer is not to write faster \u2014 it is to erase what you no longer need and organise what remains.',
    steps: [
      'Offload \u2014 externalise anything that does not need to stay in your head. Write it down, say it to your crewmate, use the patient report form as a thinking tool.',
      'Prioritise \u2014 narrow to the single most important thing right now. The treatment ladder (Framework 14) tells you what that is.',
      'Simplify \u2014 call for backup earlier, hand a task to your crewmate. Doing a few things well beats attempting everything badly. Asking for help is a sign you understand your limits.'
    ],
    onSceneSetup: 'A road traffic collision, one vehicle, two patients \u2014 a trapped driver and a passenger who has self-extricated and is wandering in the road. No fire service yet, traffic building, your crewmate on the radio for backup. Your whiteboard is filling fast and you feel the overload starting.',
    onSceneReveal: 'The answer is not to think faster \u2014 it is to offload and prioritise. Out loud, to your crewmate: \u201cI am going to the trapped driver \u2014 highest priority. Can you get the passenger out of the road and do a primary survey. Call me immediately if he deteriorates.\u201d Two tasks, two people, clearly allocated. The whiteboard just got much cleaner, and you can think again.',
    tryItScenario: 'You are alone in the front \u2014 your crewmate is managing a critically unwell patient in the back. You are driving to hospital while trying to update your pre-alert, watch the patient through the glass, answer a radio call from Control, and remember whether you have already repeated the treatment you started.',
    tryItQuestions: 'What do you do first? What can wait? What gets offloaded, and how? At what point do you pull over \u2014 and why is that sometimes the right clinical decision?',
    hollieSample: 'You are being pulled four ways and driving \u2014 which is the most dangerous combination. Of those competing demands, which one cannot wait, and which two could you safely drop or hand off? And be honest with me: what would make pulling over the safer clinical decision rather than a failure?'
  },
  {
    id: 24, number: 24, year: 3, section: 'Section 7 · When it goes wrong',
    title: 'The deliberate reset',
    summary: 'A deliberate pause in a deteriorating or unclear situation \u2014 a structured reset that interrupts the momentum of a job that is not going well and creates space to think.',
    whyItMatters: [
      'There is a powerful instinct in prehospital care to keep moving \u2014 to read action as progress and stillness as failure. Sometimes that is right; an arrest needs continuous compressions, not reflection. But there is another, more common situation where the instinct to keep moving makes things worse.',
      'Where the team has been doing the same ineffective thing for several minutes without asking whether it is the right thing. Where fixation is operating quietly. Where new information has arrived that nobody has stopped to integrate. There, the most productive thing you can do is stop \u2014 completely, for a minute or two \u2014 and look at the whole picture with fresh eyes.'
    ],
    analogyIcon: 'bi-pause-circle',
    analogy: 'Think of a pit stop in a motor race. The car does not pull in because it has given up \u2014 the people watching from outside, with a clearer view than the driver in the cockpit, have seen something that needs to change. The stop costs time, but carrying on at full speed on failing tyres costs more.',
    steps: [
      'Reassess the patient from the beginning \u2014 a fresh primary survey, as if you have just walked in.',
      'Reassess the plan \u2014 what have you done, has it worked, and if not, is it the wrong intervention or just needing more time?',
      'Reassess the diagnosis \u2014 is your impression still the best fit for everything you see?',
      'Ask for a fresh perspective \u2014 your crewmate may have noticed something you have not.'
    ],
    onSceneSetup: 'You have managed a 55-year-old man with severe breathlessness for nine minutes. He has had the standard inhaled treatment for presumed bronchospasm, but his breathing has not improved and his sats have fallen from 90 to 86 despite oxygen. He is tiring. The instinct is to do more of the same.',
    onSceneReveal: 'Instead you call the reset. You step back. A fresh primary survey \u2014 and his windpipe looks slightly deviated to one side, and the breath sounds on the left are absent. The diagnosis has just changed completely: this is not bronchospasm, it is a tension building in the chest that you have been treating as asthma for nine minutes. Thirty seconds of stillness, a completely different outcome.',
    tryItScenario: 'You are eight minutes into managing a 70-year-old woman who collapsed at home. She is barely conscious (GCS 8), with a heart rate of 38 and a blood pressure of 74 over 40. You have given the first-line treatment for the dangerously slow heart rate with minimal effect, and your crewmate is getting access for a fluid challenge.',
    tryItQuestions: 'You call the deliberate reset. Walk through the four steps. What do you reassess? What does the fresh primary survey tell you? Is the plan right? Is the diagnosis right \u2014 and if the first treatment has not worked, what does that suggest about the rhythm and the underlying cause?',
    hollieSample: 'The first treatment not working is itself the most useful clue you have \u2014 it is telling you something. So pause with me: if the obvious approach to a dangerously slow heart has not shifted it, what does that make you reconsider about the rhythm, or about what is driving it underneath? Name the thing you have not yet looked for.'
  },
  {
    id: 25, number: 25, year: 3, section: 'Section 7 · When it goes wrong',
    title: 'Human factors on the road',
    summary: 'Understanding how fatigue, stress and the conditions of shift work affect your decision-making \u2014 and managing those effects honestly rather than pretending they do not exist.',
    whyItMatters: [
      'Human factors \u2014 how performance is affected by the environment, the system and the conditions you work in \u2014 transformed safety in aviation and surgery. Prehospital care is catching up, slowed by a culture that has historically valued toughness over honesty about human limits.',
      'That culture is changing, but slowly, and meanwhile the expectation is that you perform at full capacity however long you have been on, however many hard jobs back to back, however little you have eaten. The things that degrade performance \u2014 fatigue, hunger, the emotional residue of a difficult call \u2014 do not announce themselves. They work quietly in the background. Knowing you are not at your best is a clinical finding; ignoring it is a clinical risk.'
    ],
    analogyIcon: 'bi-clipboard-pulse',
    analogy: 'Think of a pilot\u2019s pre-flight check \u2014 but on themselves. A responsible pilot asks: am I fit to fly? Enough sleep? Affected by stress or illness? It is a requirement, and the answer is not always yes. You cannot run a formal check before every shift, but you can build honest self-awareness about what affects you.',
    steps: [
      'Awareness \u2014 know which conditions are present and be honest about how they are affecting you. After long enough without sleep, performance can be measurably impaired.',
      'Adjustment \u2014 work more deliberately when they are: check your reasoning more, verbalise more, lower your threshold for asking your crewmate to lead or calling backup early.',
      'Access \u2014 know how to reach support when the weight of the job becomes too much. Occupational health, peer support and clinical supervision exist for exactly this; using them is professional responsibility, not weakness.'
    ],
    onSceneSetup: 'It is the fourth job of a night shift. The third was a paediatric cardiac arrest that did not survive. You are now sent to a 60-year-old man with chest pain. Be honest about what you are carrying into this: your emotional state is not neutral, your focus is not where it usually is, and your threshold for distress is lower than it was six hours ago.',
    onSceneReveal: 'It does not mean you cannot do the job well \u2014 it means you do it more deliberately. You run your primary survey consciously, step by step, rather than on the autopilot that fatigue has dulled. You narrate your reasoning to your crewmate. You use the deliberate reset if the picture is unclear. And when the shift ends you do not just go home and expect sleep to fix it \u2014 you talk to someone, because the job you are carrying deserves to be put down properly.',
    tryItScenario: 'Think about the last time you were genuinely not at your best \u2014 tired, stressed, or emotionally affected by something.',
    tryItQuestions: 'If you had been called to a complex job in that moment, what would have been different about your performance? What errors are you most vulnerable to when fatigued, and which when emotionally affected? What is your specific, practical plan for managing those vulnerabilities when they are present?',
    hollieSample: 'This one is about you, not a patient, and that makes it the hardest to be honest about. Pick the last time you were running on empty \u2014 what kind of mistake were you closest to making? And what is one concrete thing, not a vague intention, you could put in place for the next time that same state creeps up on you?'
  }

];

window.PLACEMENT_ADVICE = {
  1: [
    { title: 'Before your shift', body: [
      'The nerves the night before are completely normal \u2014 every paramedic you\u2019ll ever meet had them too. Get the practical things sorted early: uniform and kit ready, route and start time checked, a proper meal and as much sleep as the nerves will allow. Arrive a little early, introduce yourself to your mentor and the crew, and go in with one honest expectation \u2014 you\u2019re there to learn, not to know everything. The pressure you\u2019re putting on yourself is almost always higher than the pressure anyone\u2019s putting on you.',
      'Dress smart. It\u2019s not a night out, so tuck your top in and clean your boots. Look professional and you\u2019ll act professional. Lose the excess jewellery, go bare below the elbow, and you\u2019ll be treated well. Try to \u201cbe an individual\u201d and it won\u2019t go down well.'
    ] },
    { title: 'Your first few shifts', body: [
      'The first few shifts can feel like standing in a busy room where everyone\u2019s speaking a language you only half understand \u2014 and that\u2019s exactly how they\u2019re meant to feel. Your job at this stage isn\u2019t to perform, it\u2019s to watch: how the crew moves, how they talk to patients, how a scene gets read in the first thirty seconds. Find small ways to be useful, ask where you should stand, and let yourself be a beginner. Competence comes in layers, and nobody fitted them all on day one.',
      'Get in 30 minutes early every day. Find your truck and start going through every single cupboard and every single bag \u2014 you need to know what is in there and what it does. The quickest way to impress your mentor is, on a time-critical job, being able to immediately put your hand on a Russell chest seal.'
    ] },
    { title: 'When a job gets to you', body: [
      'Some jobs will stay with you longer than others, and that doesn\u2019t mean you\u2019re not cut out for this \u2014 it means you\u2019re human, and being affected by hard things is part of caring about them. Don\u2019t carry it alone or feel you have to look unshaken. Talk to your mentor, your crewmate, your university tutor, or someone you trust at home; saying it out loud is often what stops it sitting heavy. And if something keeps returning \u2014 your sleep, your mood, your appetite \u2014 treat that as a signal to reach out for proper support, not something to push through. The people around you would far rather you spoke up early.',
      'Talk\u2026 sharing the load is a real thing, and it works.'
    ] },
    { title: 'Asking questions without feeling daft', body: [
      'Here\u2019s the thing nobody says often enough: asking questions is what good clinicians do, not what beginners do. Your mentor expects them \u2014 a placement where you ask nothing tends to worry them more than one where you ask plenty. Pick your moment (not mid-resus), jot the question down if now isn\u2019t the time, and try asking \u201cwhy\u201d as well as \u201cwhat,\u201d because the reasoning is the part that sticks. The only daft question is the one you sat on because you were too proud to ask.',
      'A really good mentor will admit when they don\u2019t know the answer, and they\u2019ll go and search for it with you. And then you\u2019ll quickly realise they aren\u2019t Superman or Superwoman \u2014 they\u2019re human, just like you.'
    ] }
  ],
  2: [
    { title: 'Taking more of the lead', body: [
      'Second year is where the training wheels start coming off \u2014 your mentor steps back a little and lets you run more of the call, and that gap they leave is meant to feel slightly uncomfortable. That discomfort is the work; it\u2019s what growth actually feels like. Take the assessment, voice your thinking out loud, commit to a plan \u2014 and let your mentor be the safety net they\u2019re there to be, rather than the driver. You\u2019ll get things wrong while you find your feet leading, and that\u2019s not a sign you\u2019ve stepped up too soon \u2014 it\u2019s the only way anyone ever does.',
      'Try this\u2026 repeat the patient\u2019s concerns, cover the history and observations, and explain your thinking and your idea for a plan \u2014 but at the end, add a few words to give your mentor the chance to step in if needed: \u201cIs there anything else you\u2019d like to ask, or any concerns you have that I may not have covered?\u201d'
    ] },
    { title: 'Managing tiredness and shifts', body: [
      'Shift work is one of the hardest parts of this job to get good at, and nobody really teaches it \u2014 you learn it the tired way. Protect your sleep like it\u2019s part of your kit: wind down properly after a late, get daylight and movement on your days off, and eat and drink regularly across a shift rather than running on fumes and a vending machine. Fatigue isn\u2019t a badge of toughness \u2014 it quietly blunts your judgement, and the culture that treats pushing through as strength has it backwards. Looking after the basics is what lets you do the job well, shift after shift.'
    ] },
    { title: 'When you make a mistake', body: [
      'You will make mistakes \u2014 every clinician who has ever worked has \u2014 and what defines you isn\u2019t whether it happens but what you do next. The instinct to hide it or shrink is human, but the professional move is the opposite: own it, say it early, and report it through the proper channel so it can be learned from. A good service treats that as how care gets safer, not as a stick to beat you with. And go easy on yourself afterwards; carrying it quietly helps no one, so talk it through with your mentor and let it make you sharper rather than smaller.',
      'Look at the HCPC hearings and you\u2019ll see that no one gets struck off for an individual error. However, they will do for lying \u2014 or for squeezing someone\u2019s personal bits!'
    ] }
  ],
  3: [
    { title: 'Becoming the decision-maker', body: [
      'By third year the question quietly shifts from \u201cwhat would my mentor do?\u201d to \u201cwhat am I going to do?\u201d \u2014 and being the one the decision lands on is a different weight entirely. Learn to trust the reasoning you\u2019ve spent two years building, while holding it lightly enough to change your mind when the picture does. Confidence here isn\u2019t never being unsure; it\u2019s being able to act sensibly while you\u2019re unsure and keep reassessing. And knowing when to call for help is not a gap in your decision-making \u2014 it is good decision-making.'
    ] },
    { title: 'Preparing for sign-off', body: [
      'Sign-off feels enormous from a distance and a lot more manageable once you break it into pieces \u2014 so start early and treat your portfolio as something you build week by week, not a panic in the final month. Use every shift as evidence: capture what you did, why you did it, and what you\u2019d change. Practise saying your clinical reasoning out loud, because being able to explain a decision is often what\u2019s really being assessed. And as the date nears, take the feedback you keep getting at face value \u2014 if the people signing you off think you\u2019re ready, it\u2019s worth believing them.'
    ] },
    { title: 'Looking after yourself long-term', body: [
      'This is a career, not a sprint, and the habits you build now are the ones that decide whether you\u2019re still well and still enjoying it in ten years. Get good early at putting jobs down properly \u2014 debriefing, talking to people who get it, having a life that\u2019s fully yours when the uniform comes off. Notice your own warning signs the way you\u2019d notice a patient\u2019s, and treat protecting your wellbeing as part of being a competent clinician, not a luxury on top of it. The best paramedics aren\u2019t the ones who never feel the weight \u2014 they\u2019re the ones who\u2019ve learned how to carry it sustainably.'
    ] }
  ]
};
