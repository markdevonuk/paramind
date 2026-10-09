/* ==================== CLUE HUNT CASES ====================
 * Paramind — Clue Hunt (Pro). Case content only; the game logic is in js/cluehunt-engine.js.
 *
 * CONTENT POLICY: recognition, interpretation and understanding only.
 * No drug names, doses, treatment protocols or clinical management guidance.
 * Run the content policy grep after every edit to this file.
 *
 * Each action: id, l (label), L (ABCDE letter), cost (seconds), clue {t, key?, normal?}
 *   kind: (none) | count {rate, what:'breath'|'beat', irregular?} | listen {zones[]}
 *         | crt {secs} | press {dent} | pupils {react?, size?} | bm {value}
 *   fx: {say:[lines]} | {show:'veins'|'scm'} | {flash:'mouth'|'sweat'|'hives'|'legs'|'mottle'}
 * Points: key clue 20, normal finding 5, other 10.
 */
window.CLUEHUNT_CASES = [

/* ───────────────────────── EASY 1 · SEVERE ASTHMA ───────────────────────── */
{
  id:'easy-asthma', level:'easy',
  dispatch:{time:'21:15', cat:'Cat 2', headline:'Difficulty in breathing',
    text:'24-year-old female. Difficulty in breathing. Known asthmatic.',
    detail:'Caller is a friend. Patient conscious, struggling to talk.', addr:'First-floor flat · friend will buzz you in'},
  scene:{room:'lounge_eve', chair:'armchair', chairColour:'#6a5a7a'},
  patient:{name:'Chloe', age:24, sex:'f', skin:'#8d5a3b', hair:'curly', hairColour:'#1f1a17',
    outfit:'tshirt', top:'#6fa79a', bottom:'#3e5a7a', shoes:'#f2f2f2', mouth:'gasp', eyes:'open',
    signs:{sweat:true}},
  doorway:{t:'Sitting forward gripping her knees, shoulders raised, with a wheeze you can hear from the door', correct:'sick'},
  askHint:'Chloe can only manage a few words. Her friend Jess can help.',
  areas:{
    face:[
      {id:'talk', l:'Talk to her', L:'A', cost:15, clue:{t:'Airway clear, but only managing 3–4 words at a time', key:true}, fx:{say:['Can’t… get… air…']}},
      {id:'lips', l:'Look at her lips', L:'B', cost:10, clue:{t:'Lips a normal colour for her', normal:true}, fx:{flash:'mouth'}},
      {id:'skin', l:'Look at her skin', L:'C', cost:10, clue:{t:'Sweaty and anxious-looking'}, fx:{flash:'sweat'}},
      {id:'alert', l:'Check how alert she is', L:'D', cost:15, clue:{t:'Alert and knows where she is, but frightened', normal:true}, fx:{say:['I know… where…','I am…']}},
      {id:'pupils', l:'Check her pupils', L:'D', cost:15, kind:'pupils', clue:{t:'Pupils equal and reacting to light', normal:true}}
    ],
    neck:[
      {id:'accessory', l:'Watch her neck muscles', L:'B', cost:10, clue:{t:'Neck and shoulder muscles pulling with every breath'}, fx:{show:'scm'}},
      {id:'trachea', l:'Check the position of her windpipe', L:'B', cost:10, clue:{t:'Windpipe in the middle', normal:true}}
    ],
    chest:[
      {id:'rr', l:'Count her breathing rate', L:'B', cost:15, kind:'count', rate:32, what:'breath', clue:{t:'Breathing rate about 32 a minute'}},
      {id:'move', l:'Watch her chest move', L:'B', cost:10, clue:{t:'Both sides move equally, but each breath out is long and effortful', key:true}},
      {id:'listen', l:'Listen to her chest', L:'B', kind:'listen', zones:[
        {id:'upper', label:'Upper chest', where:'Both sides, below the collarbones', sound:'wheeze', clue:{t:'Loud wheeze on breathing out, both sides', key:true}},
        {id:'bases', label:'Bottom of the chest', where:'Both sides, from behind', sound:'wheeze', clue:{t:'Wheeze heard all the way down both sides'}}
      ]}
    ],
    hand:[
      {id:'hr', l:'Count her pulse', L:'C', cost:15, kind:'count', rate:128, what:'beat', clue:{t:'Pulse about 128 a minute and regular'}},
      {id:'crt', l:'Check capillary refill', L:'C', cost:10, kind:'crt', secs:1.8, clue:{t:'Capillary refill under 2 seconds', normal:true}},
      {id:'temp', l:'Feel her skin temperature', L:'E', cost:10, clue:{t:'Warm, not hot to the touch', normal:true}}
    ],
    abdo:[
      {id:'abdo', l:'Look at and feel her tummy', L:'E', cost:15, clue:{t:'Tummy soft; she’s using her tummy muscles to push each breath out'}}
    ],
    legs:[
      {id:'legs', l:'Look at her legs', L:'E', cost:10, clue:{t:'No swelling, no rash', normal:true}}
    ]
  },
  questions:[
    {q:'What’s happened tonight?', who:'Jess, her friend', a:'We were watching a film at mine. Her breathing got tighter and tighter over about an hour. My cats were all over her.', clue:{t:'Built up over an hour after contact with cats', key:true}},
    {q:'Has this happened before?', who:'Chloe', a:'Asthma… since… a kid.', clue:{t:'Known asthma since childhood', key:true}, bubble:['Asthma…','since… a kid…']},
    {q:'Has your inhaler helped?', who:'Chloe', a:'Used it… loads… nothing.', clue:{t:'Her usual inhaler has made no difference'}, bubble:['Used it…','nothing…']},
    {q:'Any chest pain?', who:'Chloe', a:'Tight… not… pain.', clue:{t:'Chest feels tight but isn’t painful', normal:true}, bubble:['Tight…','not pain…']},
    {q:'Have you been unwell lately?', who:'Jess, her friend', a:'She’s had a cold this week.', clue:{t:'Has had a cold this week'}},
    {q:'Has she ever been this bad before?', who:'Jess, her friend', a:'She’s been to A&E with it twice this year, but never stayed in.', clue:{t:'Two A&E visits with asthma this year'}}
  ],
  obs:{hr:128, sp:92, rr:32, bp:'128/78', t:'36.9', bm:'5.8'},
  options:[
    {id:'asthma', t:'Severe asthma attack'},
    {id:'anaph', t:'Anaphylaxis'},
    {id:'ptx', t:'Pneumothorax (collapsed lung)'},
    {id:'panic', t:'Panic attack'}
  ],
  correct:'asthma',
  summary:'Narrowed airways in a known asthmatic, triggered by cats and a recent cold.',
  wrong:{
    anaph:'There’s no rash, no lip or tongue swelling, no drop in blood pressure and no new food, sting or medicine. Her trigger and her wheeze fit her known asthma.',
    ptx:'A collapsed lung usually causes sudden, sharp, one-sided chest pain with quiet breath sounds on one side. Chloe’s wheeze is on both sides and built up over an hour.',
    panic:'Panic can make breathing fast, but it doesn’t cause a wheeze or a falling oxygen level. Breathlessness should never be put down to panic while the chest sounds like this.'
  },
  separator:{title:'What made this asthma, not anaphylaxis',
    text:'A known asthmatic exposed to her usual trigger, wheeze on both sides with a long breath out, and no rash, swelling or drop in blood pressure.'},
  explain:[
    'In an asthma attack the small airways narrow in three ways at once: the muscle around them tightens, their lining swells, and they fill with sticky mucus.',
    'Air can still be pulled in, but pushing it back out through narrowed tubes is much harder. That’s why the wheeze is loudest on breathing out, why each breath out is long, and why she’s using her neck, shoulder and tummy muscles to help.',
    'She can only manage a few words because she has no spare breath. Being unable to finish sentences, breathing over 25 a minute and a pulse over 110 are all signs that an attack is severe.',
    'Her oxygen level is falling because some parts of the lungs aren’t being ventilated properly. A chest that goes quiet would be a worse sign, not a better one: it means very little air is moving at all.'
  ]
},

/* ───────────────────────── EASY 2 · STROKE ───────────────────────── */
{
  id:'easy-stroke', level:'easy',
  dispatch:{time:'08:24', cat:'Cat 2', headline:'Face looks odd, speech muddled',
    text:'68-year-old male. Face drooping, speech not making sense.',
    detail:'Caller is his wife. Started a few minutes ago at breakfast.', addr:'Semi-detached house · wife at the front door'},
  scene:{room:'kitchen_day', chair:'dining', chairColour:'#9a6b43'},
  patient:{name:'Graham', age:68, sex:'m', skin:'#e8c6aa', hair:'short', hairColour:'#cfd2d6',
    outfit:'shirt', top:'#c9d6e4', bottom:'#6b5e4e', shoes:'#5a4a3a', mouth:'droop', eyes:'open',
    arms:{L:'drop', R:'knee'}, signs:{droop:true}},
  doorway:{t:'Sitting at the kitchen table, the right side of his face drooping, his right arm hanging by his side', correct:'sick'},
  askHint:'Graham is struggling to get his words out. His wife Pat can help.',
  areas:{
    face:[
      {id:'talk', l:'Talk to him', L:'A', cost:15, clue:{t:'Airway clear; speech slurred and he’s struggling to find words', key:true}, fx:{say:['I… the… thing…','can’t… say it…']}},
      {id:'smile', l:'Ask him to smile', L:'D', cost:10, clue:{t:'Right side of his mouth stays down; the left side lifts normally', key:true}, fx:{flash:'mouth'}},
      {id:'skin', l:'Look at his skin', L:'C', cost:10, clue:{t:'Normal colour, warm and dry', normal:true}},
      {id:'alert', l:'Check how alert he is', L:'D', cost:15, clue:{t:'Awake and follows simple instructions, but frustrated', normal:true}, fx:{say:['Yes… yes…','I know…']}},
      {id:'pupils', l:'Check his pupils', L:'D', cost:15, kind:'pupils', clue:{t:'Pupils equal and reacting to light', normal:true}}
    ],
    neck:[
      {id:'neck', l:'Look at his neck', L:'C', cost:10, clue:{t:'Neck veins not swollen; nothing unusual', normal:true}}
    ],
    chest:[
      {id:'rr', l:'Count his breathing rate', L:'B', cost:15, kind:'count', rate:16, what:'breath', clue:{t:'Breathing rate about 16 a minute', normal:true}},
      {id:'listen', l:'Listen to his chest', L:'B', kind:'listen', zones:[
        {id:'upper', label:'Upper chest', where:'Both sides, below the collarbones', sound:'normal', clue:{t:'Upper chest clear on both sides', normal:true}},
        {id:'bases', label:'Bottom of the chest', where:'Both sides, from behind', sound:'normal', clue:{t:'Bottom of the chest clear on both sides', normal:true}}
      ]}
    ],
    hand:[
      {id:'hr', l:'Count his pulse', L:'C', cost:15, kind:'count', rate:92, what:'beat', irregular:true, clue:{t:'Pulse about 92 a minute and irregular'}},
      {id:'arms', l:'Ask him to hold both arms out', L:'D', cost:10, clue:{t:'Right arm drifts down and he can’t hold it up', key:true}},
      {id:'grip', l:'Ask him to squeeze your hands', L:'D', cost:10, clue:{t:'Right hand grip weak; left hand strong'}},
      {id:'bm', l:'Check his blood sugar', L:'D', cost:20, kind:'bm', value:'6.4', clue:{t:'Blood sugar 6.4: normal, so low sugar isn’t causing this', key:true}},
      {id:'temp', l:'Feel his skin temperature', L:'E', cost:10, clue:{t:'Warm, not hot', normal:true}}
    ],
    abdo:[
      {id:'abdo', l:'Look at and feel his tummy', L:'E', cost:15, clue:{t:'Tummy soft, nothing of note', normal:true}}
    ],
    legs:[
      {id:'legs', l:'Ask him to lift each leg', L:'D', cost:15, clue:{t:'Right leg weaker than the left'}}
    ]
  },
  questions:[
    {q:'When did this start?', who:'Pat, his wife', a:'He was fine when he sat down at eight. About ten past, his toast fell out of his hand and he started talking nonsense.', clue:{t:'Sudden onset at about 08:10; normal at 08:00', key:true}},
    {q:'Has he banged his head or had a fall?', who:'Pat, his wife', a:'No, he’s been sat here the whole time.', clue:{t:'No fall or head injury', normal:true}},
    {q:'Any medical problems?', who:'Pat, his wife', a:'High blood pressure, and an irregular heartbeat. He takes tablets for both.', clue:{t:'Known high blood pressure and irregular heartbeat'}},
    {q:'Is he diabetic?', who:'Pat, his wife', a:'No.', clue:{t:'Not diabetic', normal:true}},
    {q:'Has anything like this happened before?', who:'Pat, his wife', a:'Last month his arm went funny for a few minutes, then it came back. He wouldn’t see anyone about it.', clue:{t:'Brief episode of arm weakness last month that fully recovered'}},
    {q:'Any headache?', who:'Graham', a:'No… no…', clue:{t:'No headache', normal:true}, bubble:['No… no…']}
  ],
  obs:{hr:92, sp:97, rr:16, bp:'182/98', t:'36.7', bm:'6.4'},
  options:[
    {id:'stroke', t:'Stroke'},
    {id:'hypo', t:'Low blood sugar'},
    {id:'bells', t:'Bell’s palsy'},
    {id:'seizure', t:'Weakness after a seizure'}
  ],
  correct:'stroke',
  summary:'Sudden loss of blood supply to part of the left side of his brain.',
  wrong:{
    hypo:'Low blood sugar can cause one-sided weakness and slurred speech, which is why sugar is checked in every patient like this. Graham’s sugar is 6.4, so it isn’t the cause.',
    bells:'Bell’s palsy affects the face only, including the forehead. It doesn’t weaken the arm or leg or muddle speech.',
    seizure:'Weakness after a fit can mimic a stroke, but nobody saw a fit, he isn’t drowsy or confused, and it started while he was sitting and talking.'
  },
  separator:{title:'What made this a stroke, not low blood sugar',
    text:'Sudden onset at a known time, face, arm and speech all affected on the same side, and a normal blood sugar.'},
  explain:[
    'A stroke happens when the blood supply to part of the brain is suddenly cut off, either by a clot blocking a vessel or by a bleed. That part of the brain stops working within minutes.',
    'The left side of the brain controls the right side of the body, and for most people it also handles language. That’s why Graham has a right-sided facial droop, a weak right arm and leg, and is struggling to find his words.',
    'An irregular heartbeat lets blood pool and form clots inside the heart, which can then travel to the brain. His brief episode last month was likely a warning sign of the same process.',
    'Knowing exactly when symptoms started, and when he was last seen well, matters a great deal, so it’s always worth pinning down. Blood sugar is checked because low sugar is a common stroke mimic.'
  ]
},

/* ───────────────────────── EASY 3 · LOW BLOOD SUGAR ───────────────────────── */
{
  id:'easy-hypo', level:'easy',
  dispatch:{time:'14:32', cat:'Cat 2', headline:'Confused and sweaty at work',
    text:'45-year-old male. Confused and behaving out of character.',
    detail:'Caller is a colleague. Patient sweating heavily, not making sense.', addr:'Office, third floor · colleague meeting you at reception'},
  scene:{room:'office_day', chair:'office', chairColour:'#2e3440'},
  patient:{name:'Tom', age:45, sex:'m', skin:'#ecc9ad', hair:'short', hairColour:'#5b3e2b',
    outfit:'shirt', top:'#f2f4f6', bottom:'#4a4f57', shoes:'#202020', tie:'#8a2a3a', mouth:'closed', eyes:'open',
    signs:{sweat:true, pale:true, shiver:true}},
  doorway:{t:'Slumped at his desk, pale and drenched in sweat, staring blankly at his screen', correct:'sick'},
  askHint:'Tom isn’t making much sense. His colleague Priya can help.',
  areas:{
    face:[
      {id:'talk', l:'Talk to him', L:'A', cost:15, clue:{t:'Airway clear; speech slurred and muddled, repeating himself'}, fx:{say:['I’m fine… leave it…','got to finish this…']}},
      {id:'skin', l:'Look at his skin', L:'C', cost:10, clue:{t:'Pale and drenched in sweat', key:true}, fx:{flash:'sweat'}},
      {id:'alert', l:'Check how alert he is', L:'D', cost:15, clue:{t:'Confused: doesn’t know where he is, irritable when pressed', key:true}, fx:{say:['Where…?','Stop asking me…']}},
      {id:'face', l:'Ask him to smile', L:'D', cost:10, clue:{t:'Face moves equally on both sides', normal:true}},
      {id:'pupils', l:'Check his pupils', L:'D', cost:15, kind:'pupils', clue:{t:'Pupils equal and reacting to light', normal:true}}
    ],
    chest:[
      {id:'rr', l:'Count his breathing rate', L:'B', cost:15, kind:'count', rate:18, what:'breath', clue:{t:'Breathing rate about 18 a minute', normal:true}},
      {id:'listen', l:'Listen to his chest', L:'B', kind:'listen', zones:[
        {id:'upper', label:'Upper chest', where:'Both sides, below the collarbones', sound:'normal', clue:{t:'Upper chest clear on both sides', normal:true}},
        {id:'bases', label:'Bottom of the chest', where:'Both sides, from behind', sound:'normal', clue:{t:'Bottom of the chest clear on both sides', normal:true}}
      ]}
    ],
    hand:[
      {id:'hr', l:'Count his pulse', L:'C', cost:15, kind:'count', rate:108, what:'beat', clue:{t:'Pulse about 108 a minute and regular'}},
      {id:'tremor', l:'Look at his hands', L:'D', cost:10, clue:{t:'Hands trembling'}},
      {id:'bm', l:'Check his blood sugar', L:'D', cost:20, kind:'bm', value:'2.1', clue:{t:'Blood sugar 2.1: very low', key:true}},
      {id:'temp', l:'Feel his skin temperature', L:'E', cost:10, clue:{t:'Skin cold and clammy'}}
    ],
    abdo:[
      {id:'abdo', l:'Look at and feel his tummy', L:'E', cost:15, clue:{t:'Tummy soft, nothing of note', normal:true}}
    ],
    legs:[
      {id:'limbs', l:'Check all four limbs', L:'D', cost:15, clue:{t:'Moves all four limbs equally; no one-sided weakness', key:true}}
    ]
  },
  questions:[
    {q:'What’s happened?', who:'Priya, his colleague', a:'He was fine this morning. After lunch he got really snappy, then started typing nonsense and sweating buckets.', clue:{t:'Behaviour changed over about an hour this afternoon'}},
    {q:'Has he eaten today?', who:'Priya, his colleague', a:'No, he worked through lunch. He had a big meeting.', clue:{t:'Missed lunch', key:true}},
    {q:'Any medical problems?', who:'Priya, his colleague', a:'He’s diabetic. He keeps his testing kit in his drawer.', clue:{t:'Known diabetic', key:true}},
    {q:'Has he had any alcohol?', who:'Priya, his colleague', a:'No, definitely not. We’re at work.', clue:{t:'No alcohol', normal:true}},
    {q:'Has he hit his head?', who:'Priya, his colleague', a:'No, he’s been at his desk all afternoon.', clue:{t:'No head injury', normal:true}},
    {q:'Has this happened before?', who:'Priya, his colleague', a:'Once at the Christmas party he went all shaky, but he ate something and was fine.', clue:{t:'Similar shaky episode before that settled after eating'}}
  ],
  obs:{hr:108, sp:98, rr:18, bp:'142/86', t:'36.4', bm:'2.1'},
  options:[
    {id:'hypo', t:'Low blood sugar (hypoglycaemia)'},
    {id:'stroke', t:'Stroke'},
    {id:'alcohol', t:'Alcohol intoxication'},
    {id:'panic', t:'Panic attack'}
  ],
  correct:'hypo',
  summary:'A diabetic who missed lunch, with a brain running short of fuel.',
  wrong:{
    stroke:'Confusion and slurred speech can look like a stroke, but Tom moves all four limbs equally, his face moves normally, and his blood sugar is 2.1.',
    alcohol:'Muddled speech and irritability can look like drink, but there’s no alcohol involved, and sweating, shaking and a sugar of 2.1 point elsewhere. Never assume a confused person is simply drunk.',
    panic:'Panic doesn’t make someone confused about where they are, and it doesn’t cause a blood sugar of 2.1.'
  },
  separator:{title:'What made this low blood sugar, not a stroke',
    text:'A known diabetic who missed lunch, with cold sweaty skin, shaking, confusion that came on over an hour, all four limbs working equally, and a blood sugar of 2.1.'},
  explain:[
    'The brain runs almost entirely on glucose and can’t store much of it. When blood sugar drops, the brain is the first organ to struggle, which is why the early signs are confusion, irritability, slurred speech and out-of-character behaviour.',
    'At the same time the body sounds an alarm. Stress hormones are released to try to raise the sugar, and those cause the sweating, shaking, pale skin and fast pulse.',
    'In someone with diabetes, a missed meal is a classic trigger. Low blood sugar can look very like a stroke or like being drunk, which is why blood sugar is checked in anyone who is confused or has new neurological signs.'
  ]
},

/* ───────────────────────── EASY 4 · ANAPHYLAXIS ───────────────────────── */
{
  id:'easy-anaphylaxis', level:'easy',
  dispatch:{time:'20:41', cat:'Cat 1', headline:'Lips swelling, can’t breathe',
    text:'30-year-old female. Lips swelling, difficulty breathing.',
    detail:'Caller is her partner. Started while eating at a restaurant.', addr:'Restaurant, high street · partner at the table'},
  scene:{room:'restaurant_eve', chair:'dining', chairColour:'#5a3b2b'},
  patient:{name:'Aisha', age:30, sex:'f', skin:'#a8724f', hair:'long', hairColour:'#231a16',
    outfit:'dress', top:'#d9a441', shoes:'#3a2a2a', mouth:'swollen', eyes:'open',
    arms:{L:'throat', R:'knee'}, signs:{hives:true, flushed:true}},
  doorway:{t:'Sitting at the table clutching her throat, lips visibly swollen, a blotchy rash on her neck', correct:'sick'},
  askHint:'Aisha is struggling to speak. Her partner Sam can help.',
  areas:{
    face:[
      {id:'talk', l:'Talk to her', L:'A', cost:15, clue:{t:'Voice hoarse; says her throat feels tight', key:true}, fx:{say:['Throat… tight…']}},
      {id:'lips', l:'Look at her lips and tongue', L:'A', cost:10, clue:{t:'Lips and tongue swollen', key:true}, fx:{flash:'mouth'}},
      {id:'skin', l:'Look at her skin', L:'C', cost:10, clue:{t:'Flushed, with raised blotchy hives on her face, neck and arms', key:true}, fx:{flash:'hives'}},
      {id:'alert', l:'Check how alert she is', L:'D', cost:15, clue:{t:'Alert but very anxious; says she feels something awful is happening'}, fx:{say:['Something’s… wrong…','really wrong…']}},
      {id:'pupils', l:'Check her pupils', L:'D', cost:15, kind:'pupils', clue:{t:'Pupils equal and reacting to light', normal:true}}
    ],
    neck:[
      {id:'stridor', l:'Listen to her breathing at the neck', L:'A', cost:10, clue:{t:'High-pitched noise as she breathes in (stridor)', key:true}},
      {id:'accessory', l:'Watch her neck muscles', L:'B', cost:10, clue:{t:'Neck muscles working with every breath'}, fx:{show:'scm'}}
    ],
    chest:[
      {id:'rr', l:'Count her breathing rate', L:'B', cost:15, kind:'count', rate:28, what:'breath', clue:{t:'Breathing rate about 28 a minute'}},
      {id:'listen', l:'Listen to her chest', L:'B', kind:'listen', zones:[
        {id:'upper', label:'Upper chest', where:'Both sides, below the collarbones', sound:'wheeze', clue:{t:'Wheeze on breathing out, both sides', key:true}},
        {id:'bases', label:'Bottom of the chest', where:'Both sides, from behind', sound:'wheeze', clue:{t:'Wheeze heard down both sides'}}
      ]}
    ],
    hand:[
      {id:'hr', l:'Count her pulse', L:'C', cost:15, kind:'count', rate:132, what:'beat', clue:{t:'Pulse about 132 a minute, weak and regular'}},
      {id:'crt', l:'Check capillary refill', L:'C', cost:10, kind:'crt', secs:3.2, clue:{t:'Capillary refill about 3 seconds'}},
      {id:'temp', l:'Feel her skin temperature', L:'E', cost:10, clue:{t:'Warm and flushed', normal:true}}
    ],
    abdo:[
      {id:'abdo', l:'Ask about her tummy', L:'E', cost:15, clue:{t:'Tummy cramping; she feels sick'}}
    ],
    legs:[
      {id:'legs', l:'Look at her legs', L:'E', cost:10, clue:{t:'Hives spreading onto her legs'}, fx:{flash:'legs'}}
    ]
  },
  questions:[
    {q:'What happened?', who:'Sam, her partner', a:'We were halfway through our starters. About ten minutes later her lips started tingling, then swelling, and then she couldn’t breathe properly.', clue:{t:'Came on within minutes of eating', key:true}},
    {q:'Does she have any allergies?', who:'Sam, her partner', a:'Peanuts. The waiter said the sauce was nut-free.', clue:{t:'Known peanut allergy', key:true}},
    {q:'Has this happened before?', who:'Sam, her partner', a:'Once as a teenager, but only a rash. Nothing like this.', clue:{t:'Previous milder reaction as a teenager'}},
    {q:'Does she have asthma?', who:'Sam, her partner', a:'No, never.', clue:{t:'Not asthmatic', normal:true}},
    {q:'Do you feel faint?', who:'Aisha', a:'Dizzy… feel sick…', clue:{t:'Feels dizzy and sick'}, bubble:['Dizzy…','feel sick…']}
  ],
  obs:{hr:132, sp:93, rr:28, bp:'84/50', t:'37.0', bm:'6.1'},
  options:[
    {id:'anaph', t:'Anaphylaxis'},
    {id:'mild', t:'Mild allergic reaction (skin only)'},
    {id:'asthma', t:'Asthma attack'},
    {id:'panic', t:'Panic attack'}
  ],
  correct:'anaph',
  summary:'A severe, whole-body allergic reaction minutes after a known trigger.',
  wrong:{
    mild:'A skin-only reaction gives hives and itching but no airway, breathing or circulation problems. Aisha has a hoarse voice, stridor, a wheeze and a blood pressure of 84/50.',
    asthma:'She has a wheeze, but she isn’t asthmatic, and asthma doesn’t cause hives, swollen lips or a drop in blood pressure.',
    panic:'Panic doesn’t cause hives, swelling, stridor or a low blood pressure.'
  },
  separator:{title:'What made this anaphylaxis, not a skin-only allergy',
    text:'Sudden onset minutes after a known trigger, plus problems beyond the skin: a hoarse voice and stridor (airway), a wheeze (breathing), and a low blood pressure with a fast pulse (circulation).'},
  explain:[
    'In anaphylaxis the immune system massively overreacts to a trigger and floods the body with chemicals such as histamine.',
    'Those chemicals make blood vessels widen and leak. Fluid seeps into the tissues, which is why her lips and tongue swell and why her voice goes hoarse as her throat swells. The noisy breath in, stridor, is air squeezing past a narrowing upper airway.',
    'Wider, leakier vessels also let the blood pressure fall, so the heart races to compensate. The same chemicals tighten the airway muscles, causing the wheeze, and affect the gut, causing cramps and nausea.',
    'It can move from tingling lips to a threatened airway in minutes. The key is recognising that it’s more than skin deep: any airway, breathing or circulation problem alongside the rash makes it anaphylaxis.'
  ]
},

/* ───────────────────────── EASY 5 · SEPSIS ───────────────────────── */
{
  id:'easy-sepsis', level:'easy',
  dispatch:{time:'02:10', cat:'Cat 2', headline:'Confused and shaking',
    text:'84-year-old female. Confused and shaking.',
    detail:'Caller is her son. Not her normal self, worsening over a few hours.', addr:'Bungalow · son will leave the porch light on'},
  scene:{room:'bedroom_night', chair:'armchair', chairColour:'#8a7a5a'},
  patient:{name:'Margaret', age:84, sex:'f', skin:'#efd6c6', hair:'bun', hairColour:'#d8d8dc',
    outfit:'nightdress', top:'#e9c6d2', shoes:'#9a7aa0', mouth:'gasp', eyes:'half',
    signs:{flushed:true, shiver:true, mottled:true}},
  doorway:{t:'Sitting in the chair by her bed, shaking in waves, picking at her nightdress and breathing fast', correct:'sick'},
  askHint:'Margaret is muddled. Her son Paul can help.',
  areas:{
    face:[
      {id:'talk', l:'Talk to her', L:'A', cost:15, clue:{t:'Airway clear; talking, but muddled, thinks it’s daytime'}, fx:{say:['Is it… lunchtime?','Where’s my bag…']}},
      {id:'skin', l:'Look at her face', L:'C', cost:10, clue:{t:'Face flushed; shivering in waves'}},
      {id:'alert', l:'Check how alert she is', L:'D', cost:15, clue:{t:'Confused: doesn’t know where she is or what time it is', key:true}, fx:{say:['This isn’t… my house…']}},
      {id:'pupils', l:'Check her pupils', L:'D', cost:15, kind:'pupils', clue:{t:'Pupils equal and reacting to light', normal:true}}
    ],
    chest:[
      {id:'rr', l:'Count her breathing rate', L:'B', cost:15, kind:'count', rate:26, what:'breath', clue:{t:'Breathing rate about 26 a minute'}},
      {id:'listen', l:'Listen to her chest', L:'B', kind:'listen', zones:[
        {id:'upper', label:'Upper chest', where:'Both sides, below the collarbones', sound:'normal', clue:{t:'Upper chest clear on both sides', normal:true}},
        {id:'bases', label:'Bottom of the chest', where:'Both sides, from behind', sound:'normal', clue:{t:'Bottom of the chest clear on both sides: no sign of a chest infection', key:true}}
      ]}
    ],
    hand:[
      {id:'hr', l:'Count her pulse', L:'C', cost:15, kind:'count', rate:118, what:'beat', clue:{t:'Pulse about 118 a minute and regular'}},
      {id:'crt', l:'Check capillary refill', L:'C', cost:10, kind:'crt', secs:4, clue:{t:'Capillary refill about 4 seconds'}},
      {id:'temp', l:'Feel her skin temperature', L:'E', cost:10, clue:{t:'Hot to the touch', key:true}}
    ],
    abdo:[
      {id:'abdo', l:'Feel her tummy', L:'E', cost:15, clue:{t:'Tender low down, just above the pubic bone', key:true}}
    ],
    legs:[
      {id:'legs', l:'Look at her legs', L:'E', cost:10, clue:{t:'Knees and lower legs mottled with a lacy purple pattern', key:true}, fx:{flash:'mottle'}}
    ]
  },
  questions:[
    {q:'What’s happened tonight?', who:'Paul, her son', a:'She went to bed fine. About one o’clock I heard her wandering about, talking nonsense and shaking all over.', clue:{t:'Became unwell over a few hours tonight'}},
    {q:'Is she normally confused?', who:'Paul, her son', a:'Never. She does the crossword every morning and beats me at it.', clue:{t:'Confusion is new; normally sharp', key:true}},
    {q:'Any problems passing water?', who:'Paul, her son', a:'She said yesterday it stung, and she’s been up to the toilet all night.', clue:{t:'Stinging and going often to pass urine since yesterday', key:true}},
    {q:'Any cough?', who:'Margaret', a:'No… no cough.', clue:{t:'No cough', normal:true}, bubble:['No…','no cough…']},
    {q:'Any medical problems?', who:'Paul, her son', a:'Just blood pressure tablets. She’s very healthy for her age.', clue:{t:'Takes tablets for blood pressure; otherwise well', normal:true}},
    {q:'Has she been eating and drinking?', who:'Paul, her son', a:'Not much today, she said she wasn’t thirsty.', clue:{t:'Eating and drinking less today'}}
  ],
  obs:{hr:118, sp:94, rr:26, bp:'92/58', t:'38.9', bm:'7.2'},
  options:[
    {id:'sepsis', t:'Sepsis from a urine infection'},
    {id:'uti', t:'Urine infection without sepsis'},
    {id:'chest', t:'Chest infection'},
    {id:'stroke', t:'Stroke'}
  ],
  correct:'sepsis',
  summary:'A urine infection that’s now affecting her whole body.',
  wrong:{
    uti:'A urine infection on its own gives stinging and going often. Margaret also has new confusion, fast breathing and pulse, a low blood pressure, slow capillary refill and mottled skin: the infection is now affecting her whole body.',
    chest:'Her chest is clear on both sides and she has no cough. The clues point to her bladder.',
    stroke:'Confusion can come with a stroke, but she has no facial droop or one-sided weakness, and she has a high temperature and urinary symptoms.'
  },
  separator:{title:'What made this sepsis, not a simple urine infection',
    text:'Signs that the infection is affecting the whole body: new confusion, breathing over 20, a pulse over 100, a low blood pressure, slow capillary refill and mottled skin.'},
  explain:[
    'Sepsis is the body’s response to an infection running out of control. Instead of staying local, the reaction spreads through the whole body and starts to affect how organs work.',
    'Blood vessels widen and leak, so the blood pressure falls and the heart speeds up to keep blood moving. Breathing speeds up too, as the body tries to clear the acid that builds up when tissues get too little oxygen.',
    'The brain is sensitive to falling blood flow and to inflammation, so new confusion is often the first sign in an older person, sometimes before any fever. Mottled skin and slow capillary refill show the body diverting blood away from the skin to protect vital organs.',
    'The shaking is a rigor: the body shivering hard as it drives its temperature up. In an older person, new confusion with signs of infection should always make you think of sepsis.'
  ]
},

/* ───────────────────────── EASY 6 · HEART ATTACK ───────────────────────── */
{
  id:'easy-mi', level:'easy',
  dispatch:{time:'19:36', cat:'Cat 2', headline:'Chest pain',
    text:'58-year-old male. Central chest pain.',
    detail:'Caller is his wife. Pain started about 40 minutes ago while watching TV. Patient sweating.', addr:'Terraced house · wife will open the door'},
  scene:{room:'lounge_eve', chair:'armchair', chairColour:'#4f6b5a'},
  patient:{name:'Keith', age:58, sex:'m', skin:'#e6c0a2', hair:'short', hairColour:'#6b6b6b',
    outfit:'tshirt', top:'#3f5a7a', bottom:'#5a5a5a', shoes:'#2a2a2a', mouth:'grimace', face:'pain', eyes:'open',
    arms:{L:'chest', R:'knee'}, signs:{sweat:true, grey:true}},
  doorway:{t:'Sitting forward in his chair, grey and sweaty, a fist pressed into the middle of his chest', correct:'sick'},
  askHint:'Keith can talk, but the pain is distracting him. His wife Lynn can help.',
  areas:{
    face:[
      {id:'talk', l:'Talk to him', L:'A', cost:15, clue:{t:'Airway clear; talking in full sentences, but clearly in pain', normal:true}, fx:{say:['It’s like an elephant','sitting on my chest']}},
      {id:'skin', l:'Look at his skin', L:'C', cost:10, clue:{t:'Grey, pale and drenched in sweat', key:true}, fx:{flash:'sweat'}},
      {id:'alert', l:'Check how alert he is', L:'D', cost:15, clue:{t:'Alert and oriented, frightened', normal:true}},
      {id:'pupils', l:'Check his pupils', L:'D', cost:15, kind:'pupils', clue:{t:'Pupils equal and reacting to light', normal:true}}
    ],
    neck:[
      {id:'neck', l:'Look at his neck', L:'C', cost:10, clue:{t:'Neck veins not swollen', normal:true}}
    ],
    chest:[
      {id:'rr', l:'Count his breathing rate', L:'B', cost:15, kind:'count', rate:22, what:'breath', clue:{t:'Breathing rate about 22 a minute'}},
      {id:'listen', l:'Listen to his chest', L:'B', kind:'listen', zones:[
        {id:'upper', label:'Upper chest', where:'Both sides, below the collarbones', sound:'normal', clue:{t:'Upper chest clear on both sides', normal:true}},
        {id:'bases', label:'Bottom of the chest', where:'Both sides, from behind', sound:'normal', clue:{t:'Bottom of the chest clear on both sides', normal:true}}
      ]},
      {id:'press', l:'Press on his chest wall', L:'C', cost:10, clue:{t:'Pressing on his chest doesn’t change the pain', key:true}},
      {id:'ecg', l:'Record a 12-lead ECG', L:'C', cost:60, clue:{t:'12-lead ECG shows ST elevation in leads II, III and aVF', key:true}}
    ],
    hand:[
      {id:'hr', l:'Count his pulse', L:'C', cost:15, kind:'count', rate:102, what:'beat', clue:{t:'Pulse about 102 a minute and regular'}},
      {id:'crt', l:'Check capillary refill', L:'C', cost:10, kind:'crt', secs:2.4, clue:{t:'Capillary refill about 2 seconds', normal:true}},
      {id:'temp', l:'Feel his skin temperature', L:'E', cost:10, clue:{t:'Cool and clammy'}}
    ],
    abdo:[
      {id:'abdo', l:'Look at and feel his tummy', L:'E', cost:15, clue:{t:'Tummy soft and not tender', normal:true}}
    ],
    legs:[
      {id:'legs', l:'Look at his legs', L:'E', cost:10, clue:{t:'No swelling; calves soft and not tender', normal:true}}
    ]
  },
  questions:[
    {q:'Tell me about the pain', who:'Keith', a:'It’s a crushing, heavy pressure right in the middle. It’s going down my left arm and up into my jaw.', clue:{t:'Crushing central pain spreading to the left arm and jaw', key:true}, bubble:['Crushing…','down my arm…']},
    {q:'What were you doing when it started?', who:'Keith', a:'Nothing, just sat watching the telly. It hasn’t let up since.', clue:{t:'Started at rest about 40 minutes ago and hasn’t eased', key:true}},
    {q:'Do you feel sick?', who:'Keith', a:'Yeah, I feel really sick.', clue:{t:'Feels nauseous'}},
    {q:'Does it hurt more when you breathe in?', who:'Keith', a:'No, it’s the same whatever I do.', clue:{t:'Pain doesn’t change with breathing', normal:true}},
    {q:'Any medical problems?', who:'Lynn, his wife', a:'High blood pressure and cholesterol. He takes tablets for both.', clue:{t:'High blood pressure and high cholesterol'}},
    {q:'Does he smoke?', who:'Lynn, his wife', a:'Twenty a day, and his dad died of a heart attack at sixty.', clue:{t:'Smoker with a family history of heart attack'}}
  ],
  obs:{hr:102, sp:95, rr:22, bp:'148/92', t:'36.6', bm:'7.8'},
  options:[
    {id:'mi', t:'Heart attack'},
    {id:'indig', t:'Indigestion'},
    {id:'wall', t:'Chest wall strain'},
    {id:'panic', t:'Panic attack'}
  ],
  correct:'mi',
  summary:'A blocked coronary artery starving part of his heart muscle.',
  wrong:{
    indig:'Indigestion is usually a burning pain linked to eating, without grey sweaty skin. Keith’s crushing pain spreads to his arm and jaw, started at rest, and his ECG shows ST elevation.',
    wall:'Chest wall pain usually hurts more when you press on it or move. Pressing on Keith’s chest makes no difference, and his ECG shows ST elevation.',
    panic:'Panic can cause chest tightness, but not grey, clammy skin with ST elevation on the ECG. Chest pain should never be put down to anxiety until the heart has been considered.'
  },
  separator:{title:'What made this a heart attack, not indigestion',
    text:'Crushing central pain at rest that spreads to the arm and jaw, grey sweaty skin and nausea, risk factors, pain that doesn’t change with pressing or breathing, and ST elevation on the 12-lead ECG.'},
  explain:[
    'The heart muscle is fed by its own arteries, the coronary arteries. In a heart attack a fatty plaque inside one of them cracks, a clot forms on it, and the blood supply to part of the heart muscle is cut off.',
    'Starved heart muscle produces a heavy, crushing pain. Nerves from the heart share pathways with nerves from the arm and jaw, so the brain often feels the pain spreading there too.',
    'The body’s alarm response causes the grey, sweaty skin, nausea and faster pulse. Unlike muscle pain, it doesn’t change when you press on the chest or when he breathes.',
    'ST elevation on the ECG is the electrical sign of heart muscle being actively injured. Leads II, III and aVF look at the bottom of the heart, so this is an inferior heart attack.'
  ]
},

/* ───────────────────────── EASY 7 · CHEST INFECTION ───────────────────────── */
{
  id:'easy-pneumonia', level:'easy',
  dispatch:{time:'11:05', cat:'Cat 2', headline:'Cough and breathlessness',
    text:'72-year-old male. Cough, fever and difficulty breathing.',
    detail:'Caller is his daughter. Unwell for three days, worse today.', addr:'Bungalow · back door is open'},
  scene:{room:'lounge_day', chair:'armchair', chairColour:'#7a5a4a'},
  patient:{name:'Brian', age:72, sex:'m', skin:'#ecc8ae', hair:'bald', hairColour:'#d0d0d0',
    outfit:'shirt', top:'#8a6a4a', bottom:'#4b5563', shoes:'#5a3a2a', mouth:'gasp', eyes:'half',
    signs:{flushed:true, sweat:true}},
  doorway:{t:'Sitting slumped in his chair, flushed and breathing fast, coughing every few breaths', correct:'sick'},
  askHint:'Brian is tired and short of breath. His daughter Karen can help.',
  areas:{
    face:[
      {id:'talk', l:'Talk to him', L:'A', cost:15, clue:{t:'Airway clear; speaking in short sentences between coughs'}, fx:{say:['Can’t stop…','coughing…']}},
      {id:'skin', l:'Look at his skin', L:'C', cost:10, clue:{t:'Flushed and sweaty'}, fx:{flash:'sweat'}},
      {id:'alert', l:'Check how alert he is', L:'D', cost:15, clue:{t:'Tired but alert and oriented', normal:true}},
      {id:'pupils', l:'Check his pupils', L:'D', cost:15, kind:'pupils', clue:{t:'Pupils equal and reacting to light', normal:true}}
    ],
    neck:[
      {id:'veins', l:'Look at his neck veins', L:'C', cost:10, clue:{t:'Neck veins not swollen', key:true}}
    ],
    chest:[
      {id:'rr', l:'Count his breathing rate', L:'B', cost:15, kind:'count', rate:24, what:'breath', clue:{t:'Breathing rate about 24 a minute'}},
      {id:'move', l:'Watch his chest move', L:'B', cost:10, clue:{t:'Right side of the chest moves less than the left'}},
      {id:'listen', l:'Listen to his chest', L:'B', kind:'listen', zones:[
        {id:'upper', label:'Upper chest', where:'Both sides, below the collarbones', sound:'normal', clue:{t:'Upper chest clear on both sides', normal:true}},
        {id:'lbase', label:'Bottom of the left side', where:'From behind', sound:'normal', clue:{t:'Bottom of the left lung clear', key:true}},
        {id:'rbase', label:'Bottom of the right side', where:'From behind', sound:'coarse', clue:{t:'Coarse crackles at the bottom of the right lung only', key:true}}
      ]}
    ],
    hand:[
      {id:'hr', l:'Count his pulse', L:'C', cost:15, kind:'count', rate:104, what:'beat', clue:{t:'Pulse about 104 a minute and regular'}},
      {id:'crt', l:'Check capillary refill', L:'C', cost:10, kind:'crt', secs:2.2, clue:{t:'Capillary refill about 2 seconds', normal:true}},
      {id:'temp', l:'Feel his skin temperature', L:'E', cost:10, clue:{t:'Hot to the touch', key:true}}
    ],
    abdo:[
      {id:'abdo', l:'Look at and feel his tummy', L:'E', cost:15, clue:{t:'Tummy soft, nothing of note', normal:true}}
    ],
    legs:[
      {id:'ankles', l:'Press on his ankles', L:'E', cost:15, kind:'press', dent:false, clue:{t:'No ankle swelling', key:true}}
    ]
  },
  questions:[
    {q:'How long have you been unwell?', who:'Karen, his daughter', a:'Three days. It started as a cold, then the cough got worse and today he could barely get out of the chair.', clue:{t:'Worsening over three days after a cold'}},
    {q:'Are you coughing anything up?', who:'Brian', a:'Green… thick stuff.', clue:{t:'Coughing up thick green phlegm', key:true}, bubble:['Green…','thick stuff…']},
    {q:'Any chest pain?', who:'Brian', a:'Right side… sharp… when I breathe in.', clue:{t:'Sharp right-sided pain on breathing in'}, bubble:['Sharp…','when I breathe in…']},
    {q:'Have you been hot or shivery?', who:'Karen, his daughter', a:'He was shaking under two blankets last night.', clue:{t:'Fever and shivering last night', key:true}},
    {q:'Can you lie flat?', who:'Brian', a:'Yes… slept in bed… just coughing.', clue:{t:'Can lie flat; not worse lying down', key:true}},
    {q:'Any medical problems?', who:'Karen, his daughter', a:'Just his blood pressure. He’s normally out walking the dog every day.', clue:{t:'Normally fit and active', normal:true}}
  ],
  obs:{hr:104, sp:93, rr:24, bp:'132/80', t:'38.6', bm:'7.0'},
  options:[
    {id:'pneu', t:'Chest infection (pneumonia)'},
    {id:'hf', t:'Acute heart failure (fluid on the lungs)'},
    {id:'pe', t:'Pulmonary embolism'},
    {id:'asthma', t:'Asthma attack'}
  ],
  correct:'pneu',
  summary:'An infection filling part of his right lung.',
  wrong:{
    hf:'Fluid on the lungs gives crackles at the bottom of both lungs, often with swollen neck veins and ankles and breathlessness lying flat. Brian’s crackles are on one side only, he has a fever and green phlegm, and he can lie flat.',
    pe:'A clot on the lung can cause sharp pain on breathing in and a fast pulse, but it doesn’t usually cause a high fever, green phlegm and crackles in one area after a cold.',
    asthma:'Asthma gives a wheeze on both sides, not coarse crackles in one area, and doesn’t usually cause a high fever.'
  },
  separator:{title:'What made this a chest infection, not fluid on the lungs',
    text:'Fever, green phlegm, coarse crackles on one side only with reduced movement on that side, and no swollen neck veins or ankles. He can also lie flat.'},
  explain:[
    'In pneumonia, an infection settles in one area of the lung. The tiny air sacs there fill with fluid, pus and inflammatory cells, so that part of the lung can’t take in oxygen.',
    'Air bubbling through those fluid-filled airways makes coarse crackles, heard over the affected area only. That area also moves less, because inflamed lung is stiff and breathing hurts.',
    'The infection drives the fever, shivering and fast pulse, and the inflamed lining of the lung causes the sharp pain on breathing in.',
    'Compare this with fluid on the lungs from heart failure: that fluid comes from back-pressure, so it settles at the bottom of both lungs and usually comes with swollen neck veins and ankles.'
  ]
},

/* ───────────────────────── EASY 8 · HIP FRACTURE ───────────────────────── */
{
  id:'easy-nof', level:'easy',
  dispatch:{time:'13:12', cat:'Cat 3', headline:'Fall, can’t get up',
    text:'89-year-old female. Fallen at home, unable to get up.',
    detail:'Caller is a neighbour who heard her calling. Patient conscious and talking.', addr:'Ground-floor flat · neighbour has a key'},
  scene:{room:'hallway_day'},
  patient:{name:'Edith', age:89, sex:'f', pose:'floor', skin:'#efd8ca', hair:'bun', hairColour:'#e2e2e6',
    outfit:'skirt', top:'#7a8aa8', shoes:'#6a4a5a', mouth:'grimace', face:'pain', eyes:'open',
    signs:{pale:true, shortRotated:true}},
  doorway:{t:'Lying on her back on the hall floor, wincing, her right leg looking shorter and turned outwards', correct:'unwell'},
  askHint:'Edith is in pain but chatty. Her neighbour Joan found her.',
  areas:{
    face:[
      {id:'talk', l:'Talk to her', L:'A', cost:15, clue:{t:'Airway clear; talking normally in full sentences', normal:true}, fx:{say:['Oh, my hip, dear…','I feel such a fool']}},
      {id:'skin', l:'Look at her skin', L:'C', cost:10, clue:{t:'Pale'}},
      {id:'alert', l:'Check how alert she is', L:'D', cost:15, clue:{t:'Alert and knows exactly where and when she is', normal:true}},
      {id:'head', l:'Check her head for injury', L:'E', cost:15, clue:{t:'No head injury', normal:true}},
      {id:'pupils', l:'Check her pupils', L:'D', cost:15, kind:'pupils', clue:{t:'Pupils equal and reacting to light', normal:true}}
    ],
    chest:[
      {id:'rr', l:'Count her breathing rate', L:'B', cost:15, kind:'count', rate:18, what:'breath', clue:{t:'Breathing rate about 18 a minute', normal:true}},
      {id:'listen', l:'Listen to her chest', L:'B', kind:'listen', zones:[
        {id:'upper', label:'Upper chest', where:'Both sides, below the collarbones', sound:'normal', clue:{t:'Upper chest clear on both sides', normal:true}},
        {id:'bases', label:'Bottom of the chest', where:'Both sides, at the sides', sound:'normal', clue:{t:'Bottom of the chest clear on both sides', normal:true}}
      ]}
    ],
    hand:[
      {id:'hr', l:'Count her pulse', L:'C', cost:15, kind:'count', rate:96, what:'beat', clue:{t:'Pulse about 96 a minute and regular'}},
      {id:'temp', l:'Feel her skin temperature', L:'E', cost:10, clue:{t:'Cold to the touch after lying on the floor'}},
      {id:'bm', l:'Check her blood sugar', L:'D', cost:20, kind:'bm', value:'6.0', clue:{t:'Blood sugar 6.0: normal', normal:true}}
    ],
    abdo:[
      {id:'pelvis', l:'Feel her tummy and pelvis', L:'E', cost:15, clue:{t:'Tummy soft; pain in the right groin when you press near the hip'}}
    ],
    legs:[
      {id:'look', l:'Look at her legs', L:'E', cost:10, clue:{t:'Right leg shorter than the left and turned outwards', key:true}, fx:{flash:'legs'}},
      {id:'move', l:'Ask her to move her legs', L:'D', cost:15, clue:{t:'Can’t lift her right leg because of groin pain; left leg moves normally', key:true}},
      {id:'feet', l:'Check her feet', L:'C', cost:10, clue:{t:'Both feet warm, with pulses felt', normal:true}}
    ]
  },
  questions:[
    {q:'What happened?', who:'Edith', a:'I caught my foot on that rug and went down sideways, right onto my hip.', clue:{t:'Tripped on the rug and landed on her right hip', key:true}},
    {q:'Did you feel dizzy or black out first?', who:'Edith', a:'No, dear. I was wide awake the whole time. It was that blessed rug.', clue:{t:'No dizziness or blackout before the fall', key:true}},
    {q:'How long have you been on the floor?', who:'Joan, her neighbour', a:'She thinks since about eleven. I heard her calling when I came back from the shops.', clue:{t:'On the floor for about two hours'}},
    {q:'Where does it hurt?', who:'Edith', a:'My right hip and groin, but only when I try to move.', clue:{t:'Pain in the right hip and groin on moving'}},
    {q:'Any medical problems?', who:'Edith', a:'Thin bones, the doctor says. And my blood pressure tablets.', clue:{t:'Has thin bones (osteoporosis)', key:true}},
    {q:'Any chest pain or palpitations?', who:'Edith', a:'No, nothing like that.', clue:{t:'No chest pain or palpitations', normal:true}}
  ],
  obs:{hr:96, sp:96, rr:18, bp:'158/88', t:'35.9', bm:'6.0'},
  options:[
    {id:'nof', t:'Hip fracture (broken neck of femur)'},
    {id:'soft', t:'Bruised hip (soft tissue injury)'},
    {id:'pelvis', t:'Broken pelvis'},
    {id:'collapse', t:'Collapse caused by a heart rhythm problem'}
  ],
  correct:'nof',
  summary:'A break at the top of the thigh bone after a simple trip.',
  wrong:{
    soft:'A bruised hip is painful, but the leg looks normal and the person can usually move it. Edith’s right leg is shorter and turned outwards, and she can’t lift it.',
    pelvis:'A broken pelvis causes pain across the pelvis and doesn’t usually shorten and turn out one leg. Edith’s pelvis feels stable and her pain is in the right groin.',
    collapse:'It’s always worth asking why someone fell. Edith clearly tripped, felt fine beforehand, never blacked out and has no chest symptoms, so this was a mechanical fall.'
  },
  separator:{title:'What made this a hip fracture, not a bruised hip',
    text:'A simple fall onto the hip in an older woman with thin bones, a right leg that is shorter and turned outwards, groin pain, and being unable to lift the leg.'},
  explain:[
    'The neck of the femur is the narrow part of the thigh bone just below the ball of the hip joint. In older people, especially women with thin bones, it can break from a simple fall from standing.',
    'Once it breaks, the powerful thigh and buttock muscles pull the lower part of the bone upwards and roll it outwards. That’s why the leg looks shorter and the foot points out to the side.',
    'The pain is felt deep in the groin, and trying to lift the leg pulls on the broken ends. Lying on the floor for two hours has made her cold, which is a risk in itself after a long lie.',
    'Always ask why someone fell. A clear trip with no dizziness, blackout or chest symptoms is a mechanical fall; anything else needs more thought.'
  ]
},

/* ───────────────────────── EASY 9 · AFTER A SEIZURE ───────────────────────── */
{
  id:'easy-seizure', level:'easy',
  dispatch:{time:'09:48', cat:'Cat 2', headline:'Fitting, now drowsy',
    text:'22-year-old male. Had a fit, now drowsy.',
    detail:'Caller is his flatmate. Fit lasted about two minutes and has stopped.', addr:'Shared house, upstairs room · flatmate will let you in'},
  scene:{room:'bedroom_day'},
  patient:{name:'Ryan', age:22, sex:'m', pose:'floor', skin:'#c48d63', hair:'short', hairColour:'#2a1e16',
    outfit:'tshirt', top:'#3a6a5a', bottom:'#4a5a7a', shoes:'#e0e0e0', mouth:'closed', eyes:'closed',
    signs:{}},
  doorway:{t:'Lying on his back on the bedroom floor, eyes closed, breathing steadily and groaning', correct:'unwell'},
  askHint:'Ryan is too drowsy to tell you much yet. His flatmate Jake saw it happen.',
  areas:{
    face:[
      {id:'talk', l:'Talk to him', L:'A', cost:15, clue:{t:'Airway clear; groans and mumbles a few words', normal:true}, fx:{say:['Wha…','where…']}},
      {id:'mouth', l:'Look in his mouth', L:'A', cost:10, clue:{t:'Bite mark on the side of his tongue', key:true}},
      {id:'alert', l:'Check how alert he is', L:'D', cost:15, clue:{t:'Drowsy and confused, but slowly becoming more awake', key:true}},
      {id:'pupils', l:'Check his pupils', L:'D', cost:15, kind:'pupils', clue:{t:'Pupils equal and reacting to light', normal:true}},
      {id:'head', l:'Check his head for injury', L:'E', cost:15, clue:{t:'Small graze on his forehead; no swelling'}}
    ],
    chest:[
      {id:'rr', l:'Count his breathing rate', L:'B', cost:15, kind:'count', rate:18, what:'breath', clue:{t:'Breathing rate about 18 a minute', normal:true}},
      {id:'listen', l:'Listen to his chest', L:'B', kind:'listen', zones:[
        {id:'upper', label:'Upper chest', where:'Both sides, below the collarbones', sound:'normal', clue:{t:'Upper chest clear on both sides', normal:true}},
        {id:'bases', label:'Bottom of the chest', where:'Both sides, at the sides', sound:'normal', clue:{t:'Bottom of the chest clear on both sides', normal:true}}
      ]}
    ],
    hand:[
      {id:'hr', l:'Count his pulse', L:'C', cost:15, kind:'count', rate:98, what:'beat', clue:{t:'Pulse about 98 a minute and regular'}},
      {id:'bm', l:'Check his blood sugar', L:'D', cost:20, kind:'bm', value:'5.4', clue:{t:'Blood sugar 5.4: normal, so low sugar didn’t cause the fit', key:true}},
      {id:'temp', l:'Feel his skin temperature', L:'E', cost:10, clue:{t:'Warm, not hot', normal:true}}
    ],
    abdo:[
      {id:'abdo', l:'Look at and feel his tummy', L:'E', cost:15, clue:{t:'Tummy soft, nothing of note', normal:true}}
    ],
    legs:[
      {id:'wet', l:'Check his clothing', L:'E', cost:10, clue:{t:'He has wet himself', key:true}},
      {id:'limbs', l:'Check all four limbs move', L:'D', cost:15, clue:{t:'Moves all four limbs equally', normal:true}}
    ]
  },
  questions:[
    {q:'What did you see?', who:'Jake, his flatmate', a:'He was talking to me, then he went stiff, made a weird cry and fell. Then his arms and legs were jerking for about two minutes.', clue:{t:'Went stiff, cried out and fell, then jerked all four limbs for about two minutes', key:true}},
    {q:'How has he been since?', who:'Jake, his flatmate', a:'Really out of it, but he’s slowly coming round. It’s been about ten minutes.', clue:{t:'Slowly coming round over ten minutes'}},
    {q:'Has this happened before?', who:'Jake, his flatmate', a:'He’s got epilepsy. His last fit was about a year ago.', clue:{t:'Known epilepsy; last fit a year ago', key:true}},
    {q:'Anything different lately?', who:'Jake, his flatmate', a:'We were out late last night. He only got about three hours’ sleep.', clue:{t:'Very little sleep last night'}},
    {q:'Has he taken his usual tablets?', who:'Ryan', a:'Dunno… can’t… remember…', clue:{t:'Not sure whether he took his usual tablets'}, bubble:['Dunno…','can’t remember…']},
    {q:'Did he hit his head?', who:'Jake, his flatmate', a:'His forehead hit the carpet when he went down, but not hard.', clue:{t:'Forehead hit the carpet as he fell'}}
  ],
  obs:{hr:98, sp:97, rr:18, bp:'128/76', t:'37.2', bm:'5.4'},
  options:[
    {id:'seizure', t:'Seizure (now recovering)'},
    {id:'faint', t:'Faint'},
    {id:'hypo', t:'Low blood sugar'},
    {id:'head', t:'Serious head injury'}
  ],
  correct:'seizure',
  summary:'A generalised seizure in a known epileptic, now in the recovery phase.',
  wrong:{
    faint:'A faint is brief: the person flops, may twitch for a few seconds, and recovers within a minute or so. Ryan went stiff, jerked for two minutes, bit the side of his tongue and has been confused for ten minutes.',
    hypo:'Low blood sugar can cause a fit, which is why it’s checked. Ryan’s sugar is 5.4.',
    head:'His forehead only grazed the carpet as he fell, and his confusion is steadily improving, which fits recovery after a seizure. Worsening drowsiness would be a different story.'
  },
  separator:{title:'What made this a seizure, not a faint',
    text:'Stiffening then rhythmic jerking of all four limbs for two minutes, a bitten tongue on the side, wetting himself, and slow recovery with confusion afterwards, in a known epileptic.'},
  explain:[
    'A seizure is a burst of abnormal electrical activity in the brain. In a generalised seizure it spreads across both sides, first making the muscles go rigid, then making them jerk rhythmically.',
    'The jaw clamps down hard, which is why the tongue is often bitten on the side. The bladder can empty, so wetting is common.',
    'Afterwards the brain is exhausted. That recovery period, the post-ictal phase, brings drowsiness and confusion that should steadily improve over minutes to an hour.',
    'Lack of sleep, alcohol and missed tablets are common triggers for someone with epilepsy. A faint is very different: it’s short, and the person comes round quickly and clear-headed.'
  ]
},

/* ───────────────────────── EASY 10 · COPD FLARE-UP ───────────────────────── */
{
  id:'easy-copd', level:'easy',
  dispatch:{time:'16:20', cat:'Cat 2', headline:'Worsening breathlessness',
    text:'70-year-old male. Difficulty in breathing, worsening over days.',
    detail:'Caller is his wife. Known chest problems.', addr:'Council house · wife at the door'},
  scene:{room:'kitchen_day', chair:'dining', chairColour:'#7a5a3a'},
  patient:{name:'Ron', age:70, sex:'m', skin:'#e2bea2', hair:'bald', hairColour:'#bfc3c8',
    outfit:'shirt', top:'#7a8a6a', bottom:'#4b4b4b', shoes:'#3a2a1a', mouth:'pursed', eyes:'open',
    signs:{barrelChest:true, blueLips:true}},
  doorway:{t:'Sitting forward at the kitchen table, broad barrel-shaped chest, breathing out slowly through pursed lips', correct:'sick'},
  askHint:'Ron is too short of breath to say much. His wife Sheila can help.',
  areas:{
    face:[
      {id:'talk', l:'Talk to him', L:'A', cost:15, clue:{t:'Airway clear; speaking in short phrases'}, fx:{say:['Can’t… get…','my breath…']}},
      {id:'lips', l:'Look at his lips', L:'B', cost:10, clue:{t:'Lips have a blue-grey tinge; breathing out through pursed lips', key:true}, fx:{flash:'mouth'}},
      {id:'alert', l:'Check how alert he is', L:'D', cost:15, clue:{t:'Alert and oriented', normal:true}},
      {id:'pupils', l:'Check his pupils', L:'D', cost:15, kind:'pupils', clue:{t:'Pupils equal and reacting to light', normal:true}}
    ],
    neck:[
      {id:'accessory', l:'Watch his neck muscles', L:'B', cost:10, clue:{t:'Neck and shoulder muscles working with every breath'}, fx:{show:'scm'}}
    ],
    chest:[
      {id:'rr', l:'Count his breathing rate', L:'B', cost:15, kind:'count', rate:28, what:'breath', clue:{t:'Breathing rate about 28 a minute'}},
      {id:'shape', l:'Look at the shape of his chest', L:'B', cost:10, clue:{t:'Barrel-shaped chest', key:true}},
      {id:'listen', l:'Listen to his chest', L:'B', kind:'listen', zones:[
        {id:'upper', label:'Upper chest', where:'Both sides, below the collarbones', sound:'wheeze', clue:{t:'Wheeze on breathing out, both sides'}},
        {id:'bases', label:'Bottom of the chest', where:'Both sides, from behind', sound:'quiet', clue:{t:'Quiet breath sounds at the bottom of both lungs', key:true}}
      ]}
    ],
    hand:[
      {id:'hr', l:'Count his pulse', L:'C', cost:15, kind:'count', rate:106, what:'beat', clue:{t:'Pulse about 106 a minute and regular'}},
      {id:'fingers', l:'Look at his fingers', L:'C', cost:10, clue:{t:'Yellow nicotine staining on his fingers', key:true}},
      {id:'temp', l:'Feel his skin temperature', L:'E', cost:10, clue:{t:'Warm, slightly hot'}}
    ],
    abdo:[
      {id:'abdo', l:'Look at and feel his tummy', L:'E', cost:15, clue:{t:'Tummy soft, nothing of note', normal:true}}
    ],
    legs:[
      {id:'ankles', l:'Press on his ankles', L:'E', cost:15, kind:'press', dent:false, clue:{t:'No ankle swelling', normal:true}}
    ]
  },
  questions:[
    {q:'What’s been happening?', who:'Sheila, his wife', a:'His chest has been getting worse for three days. Today he can’t get to the toilet without stopping.', clue:{t:'Gradually worse over three days', key:true}},
    {q:'Does he smoke?', who:'Sheila, his wife', a:'Forty years. He’s cut down to ten a day.', clue:{t:'Smoked for forty years', key:true}},
    {q:'How is his breathing normally?', who:'Sheila, his wife', a:'He has to stop halfway to the shops. The doctor said it’s COPD.', clue:{t:'Normally breathless walking; diagnosed with COPD', key:true}},
    {q:'Are you coughing anything up?', who:'Ron', a:'More… than usual… green.', clue:{t:'More phlegm than usual, and it’s turned green'}, bubble:['More…','green…']},
    {q:'Any chest pain?', who:'Ron', a:'No.', clue:{t:'No chest pain', normal:true}, bubble:['No.']},
    {q:'Did he have asthma as a child?', who:'Sheila, his wife', a:'No, he was never ill as a lad.', clue:{t:'No childhood asthma', normal:true}}
  ],
  obs:{hr:106, sp:86, rr:28, bp:'138/84', t:'37.6', bm:'6.8'},
  options:[
    {id:'copd', t:'COPD flare-up'},
    {id:'asthma', t:'Asthma attack'},
    {id:'hf', t:'Acute heart failure (fluid on the lungs)'},
    {id:'ptx', t:'Pneumothorax (collapsed lung)'}
  ],
  correct:'copd',
  summary:'A flare-up of long-term smoking-related lung disease, probably triggered by infection.',
  wrong:{
    asthma:'Asthma usually starts young and comes in attacks triggered by things like allergens. Ron has a forty-year smoking history, no childhood asthma, a barrel chest and breathlessness that has been with him for years.',
    hf:'Fluid on the lungs gives crackles at the bottom of both lungs, often with swollen ankles and neck veins. Ron has a wheeze, quiet bases, no ankle swelling and more green phlegm.',
    ptx:'A collapsed lung usually comes on suddenly with sharp one-sided pain. Ron has got worse over three days, has no chest pain and his findings are the same on both sides.'
  },
  separator:{title:'What made this a COPD flare-up, not asthma',
    text:'A long-term smoker with known breathlessness, a barrel chest, pursed-lip breathing, quiet bases and more green phlegm, worsening gradually over days rather than in a sudden attack.'},
  explain:[
    'COPD is long-term damage to the airways and air sacs, usually from smoking. The airways are narrowed and inflamed, and the walls between air sacs break down, so the lungs lose their springiness.',
    'Air gets trapped in the lungs, which gradually pushes the chest into a barrel shape. Breathing out through pursed lips keeps a little pressure in the airways and stops them collapsing, so more air can get out.',
    'Trapped air and damaged lung tissue make the breath sounds quiet, especially at the bottom. A flare-up is often triggered by an infection, which is why the phlegm has increased and changed colour.',
    'People with COPD often live with lower oxygen levels than most people, so knowing what’s normal for them matters. Ron’s blue-tinged lips and sats of 86% show he is worse than his usual self.'
  ]
},

/* ═════════════════════════ INTERMEDIATE ═════════════════════════ */

/* ───────────────────────── INTERMEDIATE 1 · PULMONARY EMBOLISM ───────────────────────── */
{
  id:'int-pe', level:'intermediate',
  dispatch:{time:'15:40', cat:'Cat 2', headline:'Sudden breathlessness',
    text:'34-year-old female. Sudden difficulty breathing and chest pain.',
    detail:'Caller is the patient. Came on suddenly about 30 minutes ago.', addr:'Flat, second floor · door on the latch'},
  scene:{room:'lounge_day', chair:'armchair', chairColour:'#5a6a8a'},
  patient:{name:'Sophie', age:34, sex:'f', skin:'#f0d0b8', hair:'long', hairColour:'#c9a46a',
    outfit:'tshirt', top:'#c95a6a', bottom:'#3e5a7a', shoes:'#e8e8e8', mouth:'gasp', eyes:'open',
    signs:{pale:true}},
  doorway:{t:'Sitting upright on the edge of her chair, breathing a little fast, but talking and looking around', correct:'unwell'},
  askHint:'Sophie can talk to you, though she’s a little short of breath.',
  areas:{
    face:[
      {id:'talk', l:'Talk to her', L:'A', cost:15, clue:{t:'Airway clear; talking in sentences, but has to stop for breath'}, fx:{say:['I just… can’t catch','my breath properly']}},
      {id:'lips', l:'Look at her lips', L:'B', cost:10, clue:{t:'Lips a normal colour', normal:true}},
      {id:'skin', l:'Look at her skin', L:'C', cost:10, clue:{t:'A little pale'}},
      {id:'alert', l:'Check how alert she is', L:'D', cost:15, clue:{t:'Alert and oriented, anxious', normal:true}},
      {id:'pupils', l:'Check her pupils', L:'D', cost:15, kind:'pupils', clue:{t:'Pupils equal and reacting to light', normal:true}}
    ],
    neck:[
      {id:'veins', l:'Look at her neck veins', L:'C', cost:10, clue:{t:'Neck veins not swollen', normal:true}},
      {id:'trachea', l:'Check the position of her windpipe', L:'B', cost:10, clue:{t:'Windpipe in the middle', normal:true}}
    ],
    chest:[
      {id:'rr', l:'Count her breathing rate', L:'B', cost:15, kind:'count', rate:26, what:'breath', clue:{t:'Breathing rate about 26 a minute'}},
      {id:'move', l:'Watch her chest move', L:'B', cost:10, clue:{t:'Both sides move equally', normal:true}},
      {id:'listen', l:'Listen to her chest', L:'B', kind:'listen', zones:[
        {id:'upper', label:'Upper chest', where:'Both sides, below the collarbones', sound:'normal', clue:{t:'Upper chest clear, equal on both sides', normal:true}},
        {id:'bases', label:'Bottom of the chest', where:'Both sides, from behind', sound:'normal', clue:{t:'Bottom of the chest clear on both sides, despite her breathlessness', key:true}}
      ]},
      {id:'press', l:'Press on her chest wall', L:'C', cost:10, clue:{t:'Pressing on her chest doesn’t bring on the pain', normal:true}}
    ],
    hand:[
      {id:'hr', l:'Count her pulse', L:'C', cost:15, kind:'count', rate:118, what:'beat', clue:{t:'Pulse about 118 a minute and regular', key:true}},
      {id:'crt', l:'Check capillary refill', L:'C', cost:10, kind:'crt', secs:2, clue:{t:'Capillary refill about 2 seconds', normal:true}},
      {id:'temp', l:'Feel her skin temperature', L:'E', cost:10, clue:{t:'Warm, not hot', normal:true}}
    ],
    abdo:[
      {id:'abdo', l:'Look at and feel her tummy', L:'E', cost:15, clue:{t:'Tummy soft, nothing of note', normal:true}}
    ],
    legs:[
      {id:'calves', l:'Look at and feel her calves', L:'E', cost:15, clue:{t:'Left calf swollen, warm and tender; clearly bigger than the right', key:true}, fx:{flash:'legs'}},
      {id:'ankles', l:'Press on her ankles', L:'E', cost:15, kind:'press', dent:false, clue:{t:'No ankle swelling', normal:true}}
    ]
  },
  questions:[
    {q:'What happened?', who:'Sophie', a:'I stood up from the sofa and suddenly couldn’t get my breath. Then I got this sharp pain in my chest.', clue:{t:'Sudden breathlessness on standing, then chest pain', key:true}},
    {q:'Where’s the pain? Does breathing change it?', who:'Sophie', a:'On the right. It’s sharp, and it catches when I breathe in.', clue:{t:'Sharp right-sided pain, worse on breathing in'}},
    {q:'Have you travelled recently?', who:'Sophie', a:'I flew back from Australia yesterday. Twenty-two hours of flying.', clue:{t:'Long-haul flight yesterday', key:true}},
    {q:'Any pain in your legs?', who:'Sophie', a:'My left calf has ached since the flight. I thought it was cramp.', clue:{t:'Left calf ache since the flight', key:true}},
    {q:'Any cough, cold or fever?', who:'Sophie', a:'No, I was fine before this.', clue:{t:'No cough, cold or fever', normal:true}},
    {q:'Have you coughed up any blood?', who:'Sophie', a:'Just a tiny streak, about ten minutes ago.', clue:{t:'A small streak of blood when coughing'}}
  ],
  obs:{hr:118, sp:92, rr:26, bp:'118/76', t:'37.3', bm:'5.6'},
  options:[
    {id:'pe', t:'Pulmonary embolism'},
    {id:'ptx', t:'Pneumothorax (collapsed lung)'},
    {id:'pneu', t:'Chest infection (pneumonia)'},
    {id:'asthma', t:'Asthma attack'},
    {id:'mi', t:'Heart attack'},
    {id:'panic', t:'Panic attack'}
  ],
  correct:'pe',
  summary:'A clot from her leg vein has travelled to her lungs.',
  wrong:{
    ptx:'A collapsed lung also gives sudden sharp pain and breathlessness, but breath sounds are quiet on the affected side and that side moves less. Sophie’s chest moves equally and sounds clear on both sides.',
    pneu:'A chest infection builds up over days with fever, cough and crackles. Sophie was well until this came on suddenly, and her chest is clear.',
    asthma:'There’s no wheeze and no history of asthma. Her chest sounds normal.',
    mi:'Heart attack pain is usually heavy and central, not sharp and catching on breathing in. Her history of a long flight and a swollen calf points elsewhere.',
    panic:'She is breathless and anxious, but a pulse of 118, sats of 92% and a swollen calf are not explained by panic. Low sats should never be put down to anxiety.'
  },
  separator:{title:'What made this a PE, not a collapsed lung',
    text:'A clear chest with equal movement and breath sounds on both sides, despite low sats and a fast pulse, after a long-haul flight and with a swollen, tender calf.'},
  explain:[
    'Sitting still for a long time slows blood flow in the deep veins of the legs, and a clot can form there. That’s why her left calf has been aching and is now swollen.',
    'If part of that clot breaks off, it travels up through the right side of the heart and lodges in the arteries of the lungs. Air still reaches that part of the lung, but blood can’t, so oxygen can’t be picked up there.',
    'That’s the key to recognising it: her sats fall and her heart races, yet her chest can sound completely normal. A clear chest doesn’t rule out a serious breathing problem.',
    'The sharp pain on breathing in comes from irritated lung tissue near the blockage, and a small amount of blood can be coughed up for the same reason.'
  ]
},

/* ───────────────────────── INTERMEDIATE 2 · DKA ───────────────────────── */
{
  id:'int-dka', level:'intermediate',
  dispatch:{time:'18:55', cat:'Cat 2', headline:'Vomiting and drowsy',
    text:'19-year-old male. Vomiting, drowsy, breathing fast.',
    detail:'Caller is his flatmate. Unwell since yesterday, worse this evening.', addr:'Student flat · flatmate will meet you'},
  scene:{room:'kitchen_day', chair:'dining', chairColour:'#6a6a6a'},
  patient:{name:'Jordan', age:19, sex:'m', skin:'#5e3b26', hair:'short', hairColour:'#151210',
    outfit:'tshirt', top:'#d06a3a', bottom:'#2f3b4a', shoes:'#f0f0f0', mouth:'gasp', eyes:'half',
    signs:{deepBreaths:true}},
  doorway:{t:'Slumped at the kitchen table, eyes half closed, taking big, deep, sighing breaths', correct:'sick'},
  askHint:'Jordan is drowsy. His flatmate Mia can help.',
  areas:{
    face:[
      {id:'talk', l:'Talk to him', L:'A', cost:15, clue:{t:'Airway clear; answers slowly, sounds exhausted'}, fx:{say:['So… thirsty…']}},
      {id:'smell', l:'Smell his breath', L:'A', cost:10, clue:{t:'Sweet, pear-drop smell on his breath', key:true}},
      {id:'mouth', l:'Look at his mouth and lips', L:'C', cost:10, clue:{t:'Lips and tongue dry and cracked'}},
      {id:'alert', l:'Check how alert he is', L:'D', cost:15, clue:{t:'Drowsy but rousable; knows where he is'}},
      {id:'pupils', l:'Check his pupils', L:'D', cost:15, kind:'pupils', clue:{t:'Pupils equal and reacting to light', normal:true}}
    ],
    chest:[
      {id:'rr', l:'Count his breathing rate', L:'B', cost:15, kind:'count', rate:30, what:'breath', clue:{t:'Breathing rate about 30 a minute'}},
      {id:'pattern', l:'Watch how he breathes', L:'B', cost:10, clue:{t:'Very deep, sighing, regular breaths', key:true}},
      {id:'listen', l:'Listen to his chest', L:'B', kind:'listen', zones:[
        {id:'upper', label:'Upper chest', where:'Both sides, below the collarbones', sound:'normal', clue:{t:'Upper chest clear on both sides', normal:true}},
        {id:'bases', label:'Bottom of the chest', where:'Both sides, from behind', sound:'normal', clue:{t:'Bottom of the chest clear: his fast breathing isn’t coming from his lungs', key:true}}
      ]}
    ],
    hand:[
      {id:'hr', l:'Count his pulse', L:'C', cost:15, kind:'count', rate:124, what:'beat', clue:{t:'Pulse about 124 a minute and regular'}},
      {id:'crt', l:'Check capillary refill', L:'C', cost:10, kind:'crt', secs:3.2, clue:{t:'Capillary refill about 3 seconds'}},
      {id:'bm', l:'Check his blood sugar', L:'D', cost:20, kind:'bm', value:'HI', clue:{t:'Blood sugar reads HI: too high for the meter to measure', key:true}},
      {id:'temp', l:'Feel his skin temperature', L:'E', cost:10, clue:{t:'Warm and dry, not feverish', normal:true}}
    ],
    abdo:[
      {id:'abdo', l:'Look at and feel his tummy', L:'E', cost:15, clue:{t:'Tender all over, but soft'}}
    ],
    legs:[
      {id:'legs', l:'Check his legs', L:'E', cost:10, clue:{t:'Nothing of note', normal:true}}
    ]
  },
  questions:[
    {q:'What’s been happening?', who:'Mia, his flatmate', a:'He’s been throwing up since yesterday and keeps saying his stomach hurts. Today he’s been really sleepy.', clue:{t:'Vomiting and tummy pain since yesterday, now drowsy'}},
    {q:'Have you been drinking or weeing more than usual?', who:'Jordan', a:'So… thirsty… keep… peeing.', clue:{t:'Very thirsty and passing a lot of urine', key:true}, bubble:['So thirsty…','keep peeing…']},
    {q:'Any medical problems?', who:'Mia, his flatmate', a:'He’s type 1 diabetic.', clue:{t:'Type 1 diabetic', key:true}},
    {q:'How has he been managing his diabetes?', who:'Mia, his flatmate', a:'He’s had a cold all week. He said he wasn’t eating so he skipped his injections.', clue:{t:'Ill with a cold and has skipped his injections', key:true}},
    {q:'Any alcohol or drugs?', who:'Mia, his flatmate', a:'No, he hasn’t been out at all this week.', clue:{t:'No alcohol or drugs', normal:true}},
    {q:'Any diarrhoea?', who:'Mia, his flatmate', a:'No, just the sickness.', clue:{t:'No diarrhoea', normal:true}}
  ],
  obs:{hr:124, sp:99, rr:30, bp:'104/62', t:'37.0', bm:'HI'},
  options:[
    {id:'dka', t:'Diabetic ketoacidosis (DKA)'},
    {id:'hypo', t:'Low blood sugar'},
    {id:'gastro', t:'Tummy bug (gastroenteritis)'},
    {id:'sepsis', t:'Sepsis'},
    {id:'appendix', t:'Appendicitis'},
    {id:'panic', t:'Panic attack (hyperventilation)'}
  ],
  correct:'dka',
  summary:'Dangerously high sugar and acid in his blood after missed injections during an illness.',
  wrong:{
    hypo:'Drowsiness in a diabetic makes low sugar the first thing to check, but his sugar reads HI. Everything else, the thirst, the breath and the deep breathing, points the other way.',
    gastro:'A tummy bug causes vomiting, but it wouldn’t explain a blood sugar too high to read, a sweet smell on the breath, and deep sighing breathing.',
    sepsis:'Infection can trigger DKA and should be kept in mind, but Jordan has no fever, and the high sugar, breath smell and breathing pattern are the main story.',
    appendix:'Appendicitis gives pain that settles in the lower right of the tummy. Jordan’s tummy is tender all over, and his sugar and breathing explain his symptoms.',
    panic:'His breathing is fast, but it’s deep and sighing rather than panicky, and he’s drowsy, not agitated. A blood sugar of HI needs explaining.'
  },
  separator:{title:'What made this DKA, not a tummy bug',
    text:'A type 1 diabetic with vomiting, thirst and passing lots of urine, deep sighing breathing, a sweet smell on the breath, and a blood sugar too high to read.'},
  explain:[
    'In type 1 diabetes the body doesn’t make the hormone that lets cells take in sugar from the blood. Without enough of it, sugar builds up in the blood while the cells starve.',
    'Starving cells start burning fat instead, which produces ketones. Ketones are acids, and as they build up the blood becomes acidic. One ketone, acetone, is breathed out, giving the sweet pear-drop smell.',
    'To get rid of acid the body breathes it off as carbon dioxide, so breathing becomes deep and sighing. That breathing pattern is a classic sign.',
    'Very high sugar spills into the urine and drags water with it, so he’s thirsty and passing lots of urine and is now dehydrated: dry mouth, slow capillary refill, fast pulse. Illness and missed injections are common triggers.'
  ]
},

/* ───────────────────────── INTERMEDIATE 3 · MENINGOCOCCAL SEPSIS ───────────────────────── */
{
  id:'int-mening', level:'intermediate',
  dispatch:{time:'08:30', cat:'Cat 2', headline:'Headache, hard to wake',
    text:'19-year-old female. Severe headache, difficult to wake.',
    detail:'Caller is a friend in halls. Patient vomited twice this morning.', addr:'University halls, room 214 · friend will meet you at the entrance'},
  scene:{room:'bedroom_day'},
  patient:{name:'Lily', age:19, sex:'f', pose:'floor', skin:'#f2d4c0', hair:'long', hairColour:'#6b4a30',
    outfit:'skirt', top:'#9a7ac9', shoes:'#e9c6d2', mouth:'closed', eyes:'closed',
    signs:{petechiae:true, flushed:true}},
  doorway:{t:'Lying on the floor beside her bed with her eyes screwed shut, flushed, a few dark spots on her legs', correct:'sick'},
  askHint:'Lily is drowsy and doesn’t want to open her eyes. Her friend Amira can help.',
  areas:{
    face:[
      {id:'talk', l:'Talk to her', L:'A', cost:15, clue:{t:'Airway clear; answers slowly, keeps her eyes shut'}, fx:{say:['My head…','it’s so bad…']}},
      {id:'light', l:'Turn on the main light', L:'D', cost:10, clue:{t:'Flinches and turns away; says the light hurts her eyes', key:true}},
      {id:'alert', l:'Check how alert she is', L:'D', cost:15, clue:{t:'Drowsy and muddled about the time', key:true}},
      {id:'pupils', l:'Check her pupils', L:'D', cost:15, kind:'pupils', clue:{t:'Pupils equal and reacting, though she hates the torch', normal:true}}
    ],
    neck:[
      {id:'stiff', l:'Ask her to bend her chin to her chest', L:'D', cost:10, clue:{t:'Neck stiff and painful to bend forward', key:true}}
    ],
    chest:[
      {id:'rr', l:'Count her breathing rate', L:'B', cost:15, kind:'count', rate:24, what:'breath', clue:{t:'Breathing rate about 24 a minute'}},
      {id:'listen', l:'Listen to her chest', L:'B', kind:'listen', zones:[
        {id:'upper', label:'Upper chest', where:'Both sides, below the collarbones', sound:'normal', clue:{t:'Upper chest clear on both sides', normal:true}},
        {id:'bases', label:'Bottom of the chest', where:'Both sides, at the sides', sound:'normal', clue:{t:'Bottom of the chest clear on both sides', normal:true}}
      ]}
    ],
    hand:[
      {id:'hr', l:'Count her pulse', L:'C', cost:15, kind:'count', rate:128, what:'beat', clue:{t:'Pulse about 128 a minute and regular'}},
      {id:'crt', l:'Check capillary refill', L:'C', cost:10, kind:'crt', secs:4, clue:{t:'Capillary refill about 4 seconds'}},
      {id:'temp', l:'Feel her hands and feet', L:'E', cost:10, clue:{t:'Hands and feet cold, even though her body is hot', key:true}}
    ],
    abdo:[
      {id:'abdo', l:'Look at and feel her tummy', L:'E', cost:15, clue:{t:'Tummy soft, nothing of note', normal:true}}
    ],
    legs:[
      {id:'rash', l:'Look at the spots on her legs', L:'E', cost:10, clue:{t:'Small purple-red spots on her legs, arms and neck', key:true}, fx:{flash:'rash'}},
      {id:'glass', l:'Do the glass test', L:'E', cost:15, kind:'glass', blanch:false, clue:{t:'The spots don’t fade under the glass', key:true}}
    ]
  },
  questions:[
    {q:'What’s happened?', who:'Amira, her friend', a:'She went to bed early with a headache. This morning she was really hard to wake and she’s got these spots.', clue:{t:'Headache last night, hard to wake this morning'}},
    {q:'How bad is the headache?', who:'Lily', a:'Worst… ever…', clue:{t:'Describes the worst headache she’s ever had'}, bubble:['Worst…','ever…']},
    {q:'When did the spots appear?', who:'Amira, her friend', a:'I only noticed them an hour ago, and there are more now.', clue:{t:'Spots appeared an hour ago and are spreading', key:true}},
    {q:'Has she been sick?', who:'Amira, her friend', a:'Twice this morning.', clue:{t:'Vomited twice'}},
    {q:'Was she drinking last night?', who:'Amira, her friend', a:'No, she had a quiet night in because she felt rubbish.', clue:{t:'No alcohol last night', normal:true}},
    {q:'Any medical problems?', who:'Amira, her friend', a:'None that I know of.', clue:{t:'No known medical problems', normal:true}}
  ],
  obs:{hr:128, sp:96, rr:24, bp:'96/58', t:'39.1', bm:'6.2'},
  options:[
    {id:'mening', t:'Meningococcal disease (meningitis with sepsis)'},
    {id:'flu', t:'Flu'},
    {id:'migraine', t:'Migraine'},
    {id:'viral', t:'Harmless viral rash'},
    {id:'uti', t:'Sepsis from a urine infection'},
    {id:'hangover', t:'Hangover'}
  ],
  correct:'mening',
  summary:'A bacterial infection of the blood and the lining of the brain.',
  wrong:{
    flu:'Flu causes fever, headache and aches, but not a stiff neck, a rash that doesn’t fade under a glass, or cold hands and feet with a slow capillary refill.',
    migraine:'Migraine can cause headache, dislike of light and vomiting, but not a high fever, a fast pulse, a stiff neck or a non-fading rash.',
    viral:'Many viral rashes fade when pressed. Lily’s spots don’t fade, are spreading, and she has a stiff neck and a high temperature.',
    uti:'There are no urinary symptoms here, and the stiff neck, dislike of light and non-fading rash point to the brain’s lining and the blood.',
    hangover:'She hasn’t been drinking, and a hangover doesn’t cause a high fever, a stiff neck or a rash that won’t fade.'
  },
  separator:{title:'What made this meningococcal disease, not flu',
    text:'Spots that don’t fade under a glass and are spreading, a stiff neck, dislike of light, cold hands and feet with a high temperature, and worsening drowsiness.'},
  explain:[
    'Meningococcal bacteria can infect the meninges, the lining around the brain and spinal cord, and the bloodstream at the same time.',
    'Inflamed meninges cause the severe headache, the stiff neck and the dislike of light. Bending the neck stretches the inflamed lining, which is why it hurts.',
    'In the bloodstream, the infection damages small blood vessels so they leak blood into the skin. That blood is outside the vessels, so pressing a glass on it can’t push it away. That’s why the spots don’t fade.',
    'Cold hands and feet and a slow capillary refill are early signs that the circulation is struggling, and they often come before the rash. This can get worse within hours, so the whole picture matters more than any one sign.'
  ]
},

/* ───────────────────────── INTERMEDIATE 4 · UPPER GI BLEED ───────────────────────── */
{
  id:'int-gibleed', level:'intermediate',
  dispatch:{time:'10:15', cat:'Cat 2', headline:'Vomiting, feels faint',
    text:'55-year-old male. Vomiting, feels faint.',
    detail:'Caller is the patient. Has been sick several times this morning.', addr:'Ground-floor flat · door is open'},
  scene:{room:'lounge_day', chair:'armchair', chairColour:'#5a5048', prop:'bowl'},
  patient:{name:'Gary', age:55, sex:'m', skin:'#e3c0a6', hair:'short', hairColour:'#8a8a8a',
    outfit:'tshirt', top:'#5a6a4a', bottom:'#3a3a3a', shoes:'#2a2a2a', mouth:'closed', eyes:'half',
    signs:{pale:true, sweat:true}},
  doorway:{t:'Sitting very still in his chair, pale and sweaty, a sick bowl on the floor beside him', correct:'sick'},
  askHint:'Gary is tired but can talk to you.',
  areas:{
    face:[
      {id:'talk', l:'Talk to him', L:'A', cost:15, clue:{t:'Airway clear; talking, but tired and lightheaded', normal:true}, fx:{say:['Feel like I’m','going to pass out']}},
      {id:'mouth', l:'Look at his mouth', L:'A', cost:10, clue:{t:'Dark brown granules around his teeth and lips'}},
      {id:'skin', l:'Look at his skin', L:'C', cost:10, clue:{t:'Very pale, cool and sweaty', key:true}, fx:{flash:'sweat'}},
      {id:'eyes', l:'Look at the whites of his eyes', L:'E', cost:10, clue:{t:'A yellow tinge to the whites of his eyes'}},
      {id:'alert', l:'Check how alert he is', L:'D', cost:15, clue:{t:'Alert but slow to answer'}}
    ],
    chest:[
      {id:'rr', l:'Count his breathing rate', L:'B', cost:15, kind:'count', rate:22, what:'breath', clue:{t:'Breathing rate about 22 a minute'}},
      {id:'listen', l:'Listen to his chest', L:'B', kind:'listen', zones:[
        {id:'upper', label:'Upper chest', where:'Both sides, below the collarbones', sound:'normal', clue:{t:'Upper chest clear on both sides', normal:true}},
        {id:'bases', label:'Bottom of the chest', where:'Both sides, from behind', sound:'normal', clue:{t:'Bottom of the chest clear on both sides', normal:true}}
      ]}
    ],
    hand:[
      {id:'hr', l:'Count his pulse', L:'C', cost:15, kind:'count', rate:124, what:'beat', clue:{t:'Pulse about 124 a minute, weak and regular', key:true}},
      {id:'crt', l:'Check capillary refill', L:'C', cost:10, kind:'crt', secs:3.5, clue:{t:'Capillary refill about 3–4 seconds'}},
      {id:'temp', l:'Feel his skin temperature', L:'E', cost:10, clue:{t:'Cool and clammy'}}
    ],
    abdo:[
      {id:'abdo', l:'Look at and feel his tummy', L:'E', cost:15, clue:{t:'Swollen with fluid and tender in the upper middle'}}
    ],
    legs:[
      {id:'bowl', l:'Look in the sick bowl', L:'E', cost:10, clue:{t:'Dark brown vomit like coffee grounds, with a few fresh red streaks', key:true}}
    ]
  },
  questions:[
    {q:'What’s happened?', who:'Gary', a:'I’ve been sick three times. It looks like coffee. I nearly passed out when I stood up.', clue:{t:'Vomiting dark material, nearly fainted on standing', key:true}},
    {q:'Have your bowels opened?', who:'Gary', a:'Yeah, it was black and sticky. Really smelly.', clue:{t:'Black, sticky, foul-smelling stools', key:true}},
    {q:'How much alcohol do you drink?', who:'Gary', a:'About a bottle of vodka a day. Have done for years.', clue:{t:'Heavy daily drinking for years'}},
    {q:'Any tummy pain?', who:'Gary', a:'A burning pain up here, on and off for weeks.', clue:{t:'Burning upper tummy pain for weeks'}},
    {q:'Have you been told you have any liver problems?', who:'Gary', a:'The doctor said my liver’s in a bad way.', clue:{t:'Known liver damage'}},
    {q:'Any chest pain?', who:'Gary', a:'No, nothing like that.', clue:{t:'No chest pain', normal:true}}
  ],
  obs:{hr:124, sp:97, rr:22, bp:'92/60', t:'36.5', bm:'6.6'},
  options:[
    {id:'gibleed', t:'Bleeding from the stomach or gullet'},
    {id:'gastro', t:'Tummy bug (gastroenteritis)'},
    {id:'withdrawal', t:'Alcohol withdrawal'},
    {id:'pancreatitis', t:'Pancreatitis'},
    {id:'mi', t:'Heart attack'},
    {id:'sepsis', t:'Sepsis'}
  ],
  correct:'gibleed',
  summary:'Blood loss from the upper gut in a heavy drinker with liver damage.',
  wrong:{
    gastro:'A tummy bug can cause vomiting and feeling faint from dehydration, but not coffee-ground vomit and black, sticky stools.',
    withdrawal:'Withdrawal causes shaking, sweating and agitation when someone stops drinking. Gary hasn’t stopped, and the dark vomit and black stools point to bleeding.',
    pancreatitis:'Pancreatitis causes severe upper tummy pain going through to the back, often with vomiting. It doesn’t cause coffee-ground vomit or black stools.',
    mi:'A heart attack can cause sweating and feeling faint, but Gary has no chest pain, and the vomit and stools explain his blood pressure.',
    sepsis:'His fast pulse and low blood pressure could fit sepsis, but he has no fever and the vomit and stools show where the problem is: blood loss.'
  },
  separator:{title:'What made this a bleed, not a tummy bug',
    text:'Vomit that looks like coffee grounds, black sticky stools, nearly fainting on standing, a fast weak pulse, a low blood pressure and pale cool skin.'},
  explain:[
    'Blood that sits in the stomach is partly digested by stomach acid, turning it dark brown and granular. That’s the coffee-ground look. Fresh red streaks mean some of it is recent.',
    'Blood that travels all the way through the gut is digested further and comes out as black, sticky, foul-smelling stools, called melaena.',
    'As blood is lost, the body compensates: the heart speeds up and vessels in the skin narrow, making him pale, cool and sweaty with a slow capillary refill. A low blood pressure is a late sign that compensation is failing, and feeling faint on standing is an early warning of it.',
    'Years of heavy drinking damage the liver. That can cause swollen veins at the bottom of the gullet that bleed heavily, as well as stomach ulcers. The yellow eyes and swollen tummy are clues to his liver damage.'
  ]
},

/* ───────────────────────── INTERMEDIATE 5 · HYPOTHERMIA ───────────────────────── */
{
  id:'int-hypothermia', level:'intermediate',
  dispatch:{time:'08:20', cat:'Cat 2', headline:'Drowsy and very cold',
    text:'81-year-old male. Drowsy, very cold to touch.',
    detail:'Caller is his home carer on her morning visit. Heating not working.', addr:'Terraced house · carer at the door'},
  scene:{room:'lounge_cold', chair:'armchair', chairColour:'#6a6a5a'},
  patient:{name:'Albert', age:81, sex:'m', skin:'#e6cfc4', hair:'bald', hairColour:'#d8d8d8',
    outfit:'pyjama', top:'#9ab0c4', bottom:'#4b5563', shoes:'#5a4a3a', mouth:'closed', eyes:'half',
    signs:{pale:true, blueLips:true, grey:true}},
  doorway:{t:'Sitting very still in his armchair in a freezing room, grey-blue and barely moving', correct:'sick'},
  askHint:'Albert is too drowsy to tell you much. His carer Debbie found him.',
  areas:{
    face:[
      {id:'talk', l:'Talk to him', L:'A', cost:15, clue:{t:'Airway clear; speech slow and slurred'}, fx:{say:['Mm… cold…']}},
      {id:'skin', l:'Look at his skin', L:'C', cost:10, clue:{t:'Pale and grey-blue, cold even on his face', key:true}},
      {id:'lips', l:'Look at his lips', L:'B', cost:10, clue:{t:'Lips blue-tinged'}},
      {id:'alert', l:'Check how alert he is', L:'D', cost:15, clue:{t:'Very drowsy; mumbles and doesn’t know what day it is', key:true}},
      {id:'pupils', l:'Check his pupils', L:'D', cost:15, kind:'pupils', clue:{t:'Pupils equal, slow to react'}}
    ],
    chest:[
      {id:'rr', l:'Count his breathing rate', L:'B', cost:15, kind:'count', rate:10, what:'breath', clue:{t:'Breathing slow and shallow, about 10 a minute', key:true}},
      {id:'listen', l:'Listen to his chest', L:'B', kind:'listen', zones:[
        {id:'upper', label:'Upper chest', where:'Both sides, below the collarbones', sound:'quiet', clue:{t:'Breath sounds quiet but clear', normal:true}},
        {id:'bases', label:'Bottom of the chest', where:'Both sides, from behind', sound:'quiet', clue:{t:'Bottom of the chest quiet but clear', normal:true}}
      ]}
    ],
    hand:[
      {id:'hr', l:'Count his pulse', L:'C', cost:15, kind:'count', rate:46, what:'beat', clue:{t:'Pulse slow, about 46 a minute', key:true}},
      {id:'shiver', l:'Look for shivering', L:'E', cost:10, clue:{t:'Not shivering at all, despite being very cold', key:true}},
      {id:'crt', l:'Check capillary refill', L:'C', cost:10, kind:'crt', secs:4.5, clue:{t:'Capillary refill over 4 seconds'}},
      {id:'bm', l:'Check his blood sugar', L:'D', cost:20, kind:'bm', value:'4.6', clue:{t:'Blood sugar 4.6: normal', normal:true}}
    ],
    abdo:[
      {id:'abdo', l:'Feel his tummy', L:'E', cost:15, clue:{t:'Even his tummy is cold to the touch'}}
    ],
    legs:[
      {id:'legs', l:'Look at his legs', L:'E', cost:10, clue:{t:'Legs cold; no injuries or signs of a fall', normal:true}}
    ]
  },
  questions:[
    {q:'What’s happened?', who:'Debbie, his carer', a:'I come in every morning. The house was freezing and he was like this in his chair. The boiler’s been broken since the weekend.', clue:{t:'Found in a freezing house; boiler broken for days', key:true}},
    {q:'When was he last seen well?', who:'Debbie, his carer', a:'His son rang him at six last night and said he sounded fine.', clue:{t:'Sounded well on the phone at 6pm yesterday'}},
    {q:'Has he fallen?', who:'Debbie, his carer', a:'I don’t think so. He’s in his usual chair and there’s nothing knocked over.', clue:{t:'No sign of a fall', normal:true}},
    {q:'Does he drink alcohol?', who:'Debbie, his carer', a:'No, never.', clue:{t:'Doesn’t drink alcohol', normal:true}},
    {q:'Any medical problems?', who:'Debbie, his carer', a:'He’s a bit forgetful, and he has an underactive thyroid.', clue:{t:'Mild memory problems and an underactive thyroid'}},
    {q:'Has he eaten?', who:'Debbie, his carer', a:'Last night’s dinner is still in the fridge.', clue:{t:'Didn’t eat last night'}}
  ],
  obs:{hr:46, sp:'Poor trace', rr:10, bp:'98/60', t:'31.4', bm:'4.6'},
  options:[
    {id:'hypothermia', t:'Hypothermia'},
    {id:'stroke', t:'Stroke'},
    {id:'sepsis', t:'Sepsis'},
    {id:'hypo', t:'Low blood sugar'},
    {id:'dementia', t:'Worsening dementia'},
    {id:'brady', t:'Slow heart rhythm problem'}
  ],
  correct:'hypothermia',
  summary:'His core temperature has fallen dangerously low in a freezing house.',
  wrong:{
    stroke:'Drowsiness and slurred speech can come with a stroke, but Albert has no one-sided weakness, and the cold house, ice-cold skin and a temperature of 31.4 °C explain everything.',
    sepsis:'Sepsis can cause a low temperature in older people and is worth keeping in mind. But here there’s no sign of infection, and a freezing house with a broken boiler is the obvious cause.',
    hypo:'His sugar is 4.6, so that isn’t the cause.',
    dementia:'He’s normally a bit forgetful, but he sounded fine last night. A sudden change like this always has a cause, and here it’s the cold.',
    brady:'His pulse is slow, but that’s a result of the cold, not the cause. Cold slows the heart down.'
  },
  separator:{title:'What made this hypothermia, not sepsis',
    text:'A freezing house, ice-cold skin even on the tummy, no shivering, slow breathing and pulse, drowsiness, and a temperature of 31.4 °C with no sign of infection.'},
  explain:[
    'Hypothermia happens when the body loses heat faster than it can make it. In mild hypothermia the body fights back by shivering hard and narrowing skin blood vessels.',
    'As the core temperature keeps falling, shivering stops. The body has run out of energy and the shivering response itself fails, so a cold person who isn’t shivering is worse, not better.',
    'Cold slows everything down: the brain, so he’s drowsy and slurred; the heart, so his pulse is slow; and breathing. Clamped-down skin vessels make him grey-blue and make it hard to get a sats reading.',
    'Older people who live alone, eat poorly or have an underactive thyroid are at higher risk. Many standard thermometers can’t read very low temperatures, so a very cold patient may actually be colder than the reading shows.'
  ]
},

/* ───────────────────────── INTERMEDIATE 6 · SIMPLE FAINT ───────────────────────── */
{
  id:'int-faint', level:'intermediate',
  dispatch:{time:'12:34', cat:'Cat 3', headline:'Collapsed in a queue, now awake',
    text:'25-year-old female. Collapsed while queuing, now conscious.',
    detail:'Caller is a member of staff. Patient was briefly unconscious and is now talking.', addr:'Post office, town centre · staff member with her'},
  scene:{room:'shop_day', chair:'dining', chairColour:'#5d6d7a'},
  patient:{name:'Emma', age:25, sex:'f', skin:'#d9a98a', hair:'long', hairColour:'#4a3020',
    outfit:'dress', top:'#4a8a8a', shoes:'#2a2a2a', mouth:'closed', eyes:'open',
    signs:{pale:true}},
  doorway:{t:'Sitting on a chair the staff brought out, a little pale, chatting and looking embarrassed', correct:'well'},
  askHint:'Emma is chatty and remembers most of it. Dev, the staff member, saw her fall.',
  areas:{
    face:[
      {id:'talk', l:'Talk to her', L:'A', cost:15, clue:{t:'Airway clear; talking normally', normal:true}, fx:{say:['I’m so sorry,','I feel such an idiot']}},
      {id:'skin', l:'Look at her skin', L:'C', cost:10, clue:{t:'Slightly pale, but her colour is coming back'}},
      {id:'alert', l:'Check how alert she is', L:'D', cost:15, clue:{t:'Fully alert; remembers everything up to feeling hot and dizzy', key:true}},
      {id:'mouth', l:'Look in her mouth', L:'A', cost:10, clue:{t:'No tongue bite', key:true}},
      {id:'pupils', l:'Check her pupils', L:'D', cost:15, kind:'pupils', clue:{t:'Pupils equal and reacting to light', normal:true}}
    ],
    chest:[
      {id:'rr', l:'Count her breathing rate', L:'B', cost:15, kind:'count', rate:14, what:'breath', clue:{t:'Breathing rate about 14 a minute', normal:true}},
      {id:'listen', l:'Listen to her chest', L:'B', kind:'listen', zones:[
        {id:'upper', label:'Upper chest', where:'Both sides, below the collarbones', sound:'normal', clue:{t:'Upper chest clear on both sides', normal:true}},
        {id:'bases', label:'Bottom of the chest', where:'Both sides, from behind', sound:'normal', clue:{t:'Bottom of the chest clear on both sides', normal:true}}
      ]},
      {id:'ecg', l:'Record a 12-lead ECG', L:'C', cost:60, clue:{t:'Normal 12-lead ECG: regular rhythm and normal intervals', key:true}}
    ],
    hand:[
      {id:'hr', l:'Count her pulse', L:'C', cost:15, kind:'count', rate:72, what:'beat', clue:{t:'Pulse about 72 a minute and regular', normal:true}},
      {id:'crt', l:'Check capillary refill', L:'C', cost:10, kind:'crt', secs:1.8, clue:{t:'Capillary refill under 2 seconds', normal:true}},
      {id:'bm', l:'Check her blood sugar', L:'D', cost:20, kind:'bm', value:'5.2', clue:{t:'Blood sugar 5.2: normal', normal:true}}
    ],
    abdo:[
      {id:'abdo', l:'Look at and feel her tummy', L:'E', cost:15, clue:{t:'Tummy soft, nothing of note', normal:true}}
    ],
    legs:[
      {id:'wet', l:'Check her clothing', L:'E', cost:10, clue:{t:'She hasn’t wet herself', normal:true}},
      {id:'legs', l:'Look at her legs', L:'E', cost:10, clue:{t:'No swelling and no injuries from the fall', normal:true}}
    ]
  },
  questions:[
    {q:'What happened?', who:'Emma', a:'I’d been standing in the queue for ages and it was really hot. I felt sick and sweaty, my vision went grey round the edges, and the next thing I knew I was on the floor.', clue:{t:'Long standing in the heat, then felt hot, sick and her vision greyed', key:true}},
    {q:'How long was she out for?', who:'Dev, staff member', a:'Ten seconds, maybe. Her arms twitched a couple of times, then she came round straight away and knew where she was.', clue:{t:'Out for about ten seconds, a brief twitch, then came round quickly', key:true}},
    {q:'Any chest pain or a racing heart beforehand?', who:'Emma', a:'No, nothing like that. Just hot and sick.', clue:{t:'No chest pain or palpitations before it', key:true}},
    {q:'Has this happened before?', who:'Emma', a:'Once when I had blood taken. I went exactly the same way.', clue:{t:'Fainted once before having blood taken'}},
    {q:'Have you eaten today?', who:'Emma', a:'Only a coffee. I was running late.', clue:{t:'Only had a coffee today'}},
    {q:'Any family history of heart problems or sudden death?', who:'Emma', a:'No, not that I know of.', clue:{t:'No family history of heart problems or sudden death', key:true}}
  ],
  obs:{hr:72, sp:99, rr:14, bp:'112/70', t:'36.8', bm:'5.2'},
  options:[
    {id:'faint', t:'Simple faint'},
    {id:'seizure', t:'Seizure'},
    {id:'arrhythmia', t:'Heart rhythm problem'},
    {id:'hypo', t:'Low blood sugar'},
    {id:'tia', t:'Mini-stroke (TIA)'},
    {id:'panic', t:'Panic attack'}
  ],
  correct:'faint',
  summary:'A reflex drop in heart rate and blood pressure after standing in the heat.',
  wrong:{
    seizure:'A few seconds of twitching is common in a faint and doesn’t mean a seizure. A seizure usually brings longer jerking, often a tongue bite, and confusion afterwards. Emma came round straight away and clear-headed.',
    arrhythmia:'Worrying signs of a heart rhythm problem include collapsing without warning or during exercise, chest pain or palpitations beforehand, a family history of sudden death, or an abnormal ECG. Emma has none of these.',
    hypo:'Her sugar is 5.2, so that isn’t the cause.',
    tia:'A mini-stroke causes weakness, numbness or speech problems and very rarely makes someone pass out. Emma has none of these.',
    panic:'Panic rarely causes someone to pass out, and Emma’s warning signs were feeling hot, sick and grey, not fear and overbreathing.'
  },
  separator:{title:'What made this a simple faint, not a heart rhythm problem',
    text:'A clear trigger (long standing in the heat with an empty stomach), warning signs beforehand, a brief collapse with a quick, full recovery, no chest pain or palpitations, no family history and a normal ECG.'},
  explain:[
    'A simple faint is a reflex. Standing still for a long time lets blood pool in the legs. The body tries to correct it, overshoots, and suddenly slows the heart and widens the blood vessels.',
    'Blood pressure drops, the brain briefly gets too little blood, and the warning signs follow: feeling hot, sick and sweaty, with vision going grey. Then the person collapses.',
    'Once she’s flat, blood flows back to the brain and she recovers within seconds. A few brief twitches are common and don’t mean a seizure.',
    'The real skill is ruling out the dangerous causes. Collapse during exercise or with no warning, chest pain or palpitations, a family history of sudden death, or an abnormal ECG all point away from a simple faint.'
  ]
},

/* ───────────────────────── INTERMEDIATE 7 · KIDNEY STONE ───────────────────────── */
{
  id:'int-renal', level:'intermediate',
  dispatch:{time:'10:52', cat:'Cat 3', headline:'Severe back pain',
    text:'40-year-old male. Severe pain in his back, vomiting.',
    detail:'Caller is his supervisor. Patient can’t sit still.', addr:'Distribution warehouse · supervisor at the loading bay'},
  scene:{room:'warehouse_day', chair:'office', chairColour:'#3a3f4a'},
  patient:{name:'Darren', age:40, sex:'m', skin:'#c99a76', hair:'short', hairColour:'#3a2a1e',
    outfit:'tshirt', top:'#e8d23a', bottom:'#3a3f4a', shoes:'#2a2a2a', mouth:'grimace', face:'pain', eyes:'open',
    arms:{L:'knee', R:'flank'}, signs:{sweat:true, pale:true, restless:true}},
  doorway:{t:'Perched on a chair, rocking and twisting, clutching the left side of his back', correct:'unwell'},
  askHint:'Darren can talk between waves of pain. His supervisor Karl called you.',
  areas:{
    face:[
      {id:'talk', l:'Talk to him', L:'A', cost:15, clue:{t:'Airway clear; talking in full sentences between waves of pain', normal:true}, fx:{say:['It’s coming again…','ahh!']}},
      {id:'skin', l:'Look at his skin', L:'C', cost:10, clue:{t:'Pale and sweaty'}},
      {id:'alert', l:'Check how alert he is', L:'D', cost:15, clue:{t:'Alert and oriented', normal:true}},
      {id:'pupils', l:'Check his pupils', L:'D', cost:15, kind:'pupils', clue:{t:'Pupils equal and reacting to light', normal:true}}
    ],
    chest:[
      {id:'rr', l:'Count his breathing rate', L:'B', cost:15, kind:'count', rate:20, what:'breath', clue:{t:'Breathing rate about 20 a minute', normal:true}},
      {id:'listen', l:'Listen to his chest', L:'B', kind:'listen', zones:[
        {id:'upper', label:'Upper chest', where:'Both sides, below the collarbones', sound:'normal', clue:{t:'Upper chest clear on both sides', normal:true}},
        {id:'bases', label:'Bottom of the chest', where:'Both sides, from behind', sound:'normal', clue:{t:'Bottom of the chest clear on both sides', normal:true}}
      ]}
    ],
    hand:[
      {id:'hr', l:'Count his pulse', L:'C', cost:15, kind:'count', rate:104, what:'beat', clue:{t:'Pulse about 104 a minute and regular'}},
      {id:'crt', l:'Check capillary refill', L:'C', cost:10, kind:'crt', secs:1.9, clue:{t:'Capillary refill under 2 seconds', normal:true}},
      {id:'temp', l:'Feel his skin temperature', L:'E', cost:10, clue:{t:'Warm, not hot: no sign of fever', key:true}}
    ],
    abdo:[
      {id:'front', l:'Feel his tummy', L:'E', cost:15, clue:{t:'Tummy soft and not tender at the front', key:true}},
      {id:'loin', l:'Feel his back below the ribs', L:'E', cost:10, clue:{t:'Tender over the left loin, at the back below the ribs', key:true}},
      {id:'mass', l:'Feel for a pulsing mass', L:'C', cost:10, clue:{t:'No pulsing mass in the tummy', key:true}}
    ],
    legs:[
      {id:'pulses', l:'Feel the pulses in his legs', L:'C', cost:10, clue:{t:'Leg pulses strong and equal on both sides', normal:true}}
    ]
  },
  questions:[
    {q:'Tell me about the pain', who:'Darren', a:'Started an hour ago on the left side of my back. It comes in waves and shoots down into my groin.', clue:{t:'Waves of pain from the left loin down to the groin', key:true}},
    {q:'Can you keep still?', who:'Darren', a:'No, I can’t get comfortable whatever I do.', clue:{t:'Can’t keep still or get comfortable', key:true}},
    {q:'Any problems passing water?', who:'Darren', a:'It looked a bit pink, and it stings.', clue:{t:'Pink urine that stings', key:true}},
    {q:'Have you been sick?', who:'Darren', a:'Twice, since it started.', clue:{t:'Vomited twice'}},
    {q:'Any fever or shivers?', who:'Darren', a:'No.', clue:{t:'No fever or shivering', normal:true}},
    {q:'Has anyone in your family had anything like this?', who:'Darren', a:'My dad gets kidney stones. He says it’s worse than anything.', clue:{t:'Father has kidney stones'}}
  ],
  obs:{hr:104, sp:99, rr:20, bp:'152/94', t:'36.9', bm:'6.0'},
  options:[
    {id:'renal', t:'Kidney stone (renal colic)'},
    {id:'aaa', t:'Leaking abdominal aortic aneurysm'},
    {id:'pyelo', t:'Kidney infection'},
    {id:'strain', t:'Back muscle strain'},
    {id:'appendix', t:'Appendicitis'},
    {id:'pancreatitis', t:'Pancreatitis'}
  ],
  correct:'renal',
  summary:'A stone moving down the tube from his kidney to his bladder.',
  wrong:{
    aaa:'A leaking aneurysm can look exactly like renal colic, so it must always be considered, especially in anyone over 50 with no history of stones. Darren is 40, has no pulsing mass, equal leg pulses and a high blood pressure, and has blood in his urine.',
    pyelo:'A kidney infection causes loin pain with a fever and shivering, and the pain is usually constant. Darren has no fever and his pain comes in waves.',
    strain:'A strained back is worse with movement and better with rest. It doesn’t shoot into the groin in waves, cause vomiting, or turn the urine pink.',
    appendix:'Appendicitis makes people lie still, with tenderness low on the right at the front. Darren can’t keep still and his tummy is soft.',
    pancreatitis:'Pancreatitis causes constant upper tummy pain going through to the back. Darren’s pain is in his left loin, comes in waves and goes to his groin.'
  },
  separator:{title:'What made this a kidney stone, not a leaking aneurysm',
    text:'A 40-year-old with waves of loin-to-groin pain, unable to keep still, with blood in his urine, no pulsing mass, equal leg pulses and a high blood pressure.'},
  explain:[
    'A kidney stone causes pain when it moves into the ureter, the narrow tube from the kidney to the bladder. The muscle in the ureter squeezes in waves to push the stone along.',
    'Each squeeze causes a wave of severe pain that starts in the loin and shoots to the groin. People with renal colic can’t keep still, which is very different from someone with an inflamed tummy lining, who lies very still.',
    'The stone scrapes the lining of the ureter, so blood appears in the urine. The pain itself causes the sweating, pallor, fast pulse, high blood pressure and vomiting.',
    'A fever with a stone is a warning sign of infection trapped behind a blockage. And in older people, a leaking aortic aneurysm can mimic renal colic almost perfectly.'
  ]
},

/* ───────────────────────── INTERMEDIATE 8 · APPENDICITIS ───────────────────────── */
{
  id:'int-appendix', level:'intermediate',
  dispatch:{time:'09:15', cat:'Cat 3', headline:'Tummy pain',
    text:'23-year-old male. Abdominal pain since yesterday.',
    detail:'Caller is his partner. Pain getting worse; vomited once.', addr:'Flat above the bakery · partner will open the door'},
  scene:{room:'lounge_eve', chair:'armchair', chairColour:'#5a4a6a'},
  patient:{name:'Josh', age:23, sex:'m', skin:'#f0cdb0', hair:'short', hairColour:'#a0522d',
    outfit:'tshirt', top:'#4a4a6a', bottom:'#6a6a6a', shoes:'#2a2a2a', mouth:'closed', face:'pain', eyes:'open',
    arms:{L:'tummy', R:'knee'}, signs:{flushed:true}},
  doorway:{t:'Sitting very still and slightly bent forward, one hand pressed low on the right of his tummy', correct:'unwell'},
  askHint:'Josh can talk to you. His partner Alex is with him.',
  areas:{
    face:[
      {id:'talk', l:'Talk to him', L:'A', cost:15, clue:{t:'Airway clear; talking normally', normal:true}, fx:{say:['It really hurts','when I move']}},
      {id:'skin', l:'Look at his skin', L:'C', cost:10, clue:{t:'Slightly flushed'}},
      {id:'alert', l:'Check how alert he is', L:'D', cost:15, clue:{t:'Alert and oriented', normal:true}},
      {id:'pupils', l:'Check his pupils', L:'D', cost:15, kind:'pupils', clue:{t:'Pupils equal and reacting to light', normal:true}}
    ],
    chest:[
      {id:'rr', l:'Count his breathing rate', L:'B', cost:15, kind:'count', rate:18, what:'breath', clue:{t:'Breathing rate about 18 a minute', normal:true}},
      {id:'listen', l:'Listen to his chest', L:'B', kind:'listen', zones:[
        {id:'upper', label:'Upper chest', where:'Both sides, below the collarbones', sound:'normal', clue:{t:'Upper chest clear on both sides', normal:true}},
        {id:'bases', label:'Bottom of the chest', where:'Both sides, from behind', sound:'normal', clue:{t:'Bottom of the chest clear on both sides', normal:true}}
      ]}
    ],
    hand:[
      {id:'hr', l:'Count his pulse', L:'C', cost:15, kind:'count', rate:102, what:'beat', clue:{t:'Pulse about 102 a minute and regular'}},
      {id:'temp', l:'Feel his skin temperature', L:'E', cost:10, clue:{t:'Warm, slightly hot'}},
      {id:'crt', l:'Check capillary refill', L:'C', cost:10, kind:'crt', secs:2, clue:{t:'Capillary refill about 2 seconds', normal:true}}
    ],
    abdo:[
      {id:'feel', l:'Feel his tummy gently', L:'E', cost:15, clue:{t:'Tender low on the right, worst about two-thirds of the way from his belly button to his hip bone', key:true}},
      {id:'left', l:'Press low on the left side', L:'E', cost:10, clue:{t:'Pressing low on the left causes pain on the right', key:true}},
      {id:'cough', l:'Ask him to cough', L:'E', cost:10, clue:{t:'Coughing makes the right-sided pain much worse', key:true}}
    ],
    legs:[
      {id:'leg', l:'Ask him to lift his right leg against your hand', L:'E', cost:10, clue:{t:'Lifting his right leg hurts low on the right of his tummy'}}
    ]
  },
  questions:[
    {q:'Where did the pain start?', who:'Josh', a:'Round my belly button yesterday afternoon. Then overnight it moved down here, on the right.', clue:{t:'Pain started around the belly button and moved low on the right', key:true}},
    {q:'Does moving make it worse?', who:'Josh', a:'The bumps in the road in Alex’s car were agony. I just want to keep still.', clue:{t:'Movement and bumps make it worse; keeping still', key:true}},
    {q:'Have you been hungry?', who:'Josh', a:'Not at all. I couldn’t face breakfast.', clue:{t:'Off his food'}},
    {q:'Have you been sick?', who:'Alex, his partner', a:'Once, this morning.', clue:{t:'Vomited once'}},
    {q:'Any diarrhoea or problems passing water?', who:'Josh', a:'No, both fine.', clue:{t:'No diarrhoea or urinary symptoms', normal:true}},
    {q:'Any pain in your testicles?', who:'Josh', a:'No, nothing down there.', clue:{t:'No testicular pain', normal:true}}
  ],
  obs:{hr:102, sp:98, rr:18, bp:'128/78', t:'37.9', bm:'5.9'},
  options:[
    {id:'appendix', t:'Appendicitis'},
    {id:'renal', t:'Kidney stone'},
    {id:'gastro', t:'Tummy bug (gastroenteritis)'},
    {id:'constipation', t:'Constipation'},
    {id:'torsion', t:'Twisted testicle (testicular torsion)'},
    {id:'hernia', t:'Hernia'}
  ],
  correct:'appendix',
  summary:'An inflamed appendix now irritating the lining of his tummy.',
  wrong:{
    renal:'A kidney stone causes waves of loin-to-groin pain and people can’t keep still. Josh wants to keep perfectly still, and his urine is normal.',
    gastro:'A tummy bug causes crampy pain all over, usually with diarrhoea. Josh has no diarrhoea, and his pain has settled in one spot that’s worse with movement and coughing.',
    constipation:'Constipation causes crampy pain and bloating, not a fever, a fast pulse and sharp pain on coughing low on the right.',
    torsion:'Lower tummy pain in a young man should always prompt a question about the testicles, because torsion can refer pain to the tummy. Josh has no testicular pain.',
    hernia:'A hernia causes a lump in the groin or near a scar. Josh has no lump, and his pain moved from the belly button.'
  },
  separator:{title:'What made this appendicitis, not a tummy bug',
    text:'Pain that started around the belly button and moved low on the right, worse with movement and coughing, pain on the right when you press the left, a low fever, off his food, and no diarrhoea.'},
  explain:[
    'The appendix is a small tube coming off the bowel. If it becomes blocked it can swell, become infected and inflamed.',
    'Early on the pain is vague and felt around the belly button, because the appendix shares its nerve supply with the middle of the gut. As the inflammation spreads to the lining of the tummy wall next to it, the pain becomes sharp and settles low on the right.',
    'Inflamed tummy lining hates being moved or jolted, which is why bumps in the road, coughing and pressing the opposite side all hurt. People with it tend to lie very still, unlike someone with a kidney stone.',
    'The low fever, fast pulse and loss of appetite are the body’s response to the inflammation.'
  ]
},

/* ───────────────────────── INTERMEDIATE 9 · ECTOPIC PREGNANCY ───────────────────────── */
{
  id:'int-ectopic', level:'intermediate',
  dispatch:{time:'14:05', cat:'Cat 2', headline:'Tummy pain, feels faint',
    text:'27-year-old female. Lower abdominal pain, feeling faint.',
    detail:'Caller is her partner. Pain since this morning, getting worse.', addr:'New-build house · partner at the door'},
  scene:{room:'lounge_day', chair:'armchair', chairColour:'#8a6a8a'},
  patient:{name:'Hannah', age:27, sex:'f', skin:'#b07a55', hair:'long', hairColour:'#2a1a12',
    outfit:'tshirt', top:'#e0a0b0', bottom:'#3e4a6a', shoes:'#e8e8e8', mouth:'closed', eyes:'open',
    arms:{L:'tummy', R:'knee'}, signs:{pale:true}},
  doorway:{t:'Sitting on the edge of her chair holding her lower tummy, a little pale, talking to her partner', correct:'unwell'},
  askHint:'Hannah can talk to you. Her partner Ben is with her.',
  areas:{
    face:[
      {id:'talk', l:'Talk to her', L:'A', cost:15, clue:{t:'Airway clear; talking normally', normal:true}, fx:{say:['It’s getting','worse, not better']}},
      {id:'skin', l:'Look at her skin', L:'C', cost:10, clue:{t:'Pale and slightly clammy', key:true}},
      {id:'alert', l:'Check how alert she is', L:'D', cost:15, clue:{t:'Alert and oriented', normal:true}},
      {id:'pupils', l:'Check her pupils', L:'D', cost:15, kind:'pupils', clue:{t:'Pupils equal and reacting to light', normal:true}}
    ],
    chest:[
      {id:'rr', l:'Count her breathing rate', L:'B', cost:15, kind:'count', rate:20, what:'breath', clue:{t:'Breathing rate about 20 a minute', normal:true}},
      {id:'listen', l:'Listen to her chest', L:'B', kind:'listen', zones:[
        {id:'upper', label:'Upper chest', where:'Both sides, below the collarbones', sound:'normal', clue:{t:'Upper chest clear on both sides', normal:true}},
        {id:'bases', label:'Bottom of the chest', where:'Both sides, from behind', sound:'normal', clue:{t:'Bottom of the chest clear on both sides', normal:true}}
      ]}
    ],
    hand:[
      {id:'hr', l:'Count her pulse', L:'C', cost:15, kind:'count', rate:118, what:'beat', clue:{t:'Pulse about 118 a minute and regular', key:true}},
      {id:'crt', l:'Check capillary refill', L:'C', cost:10, kind:'crt', secs:2.8, clue:{t:'Capillary refill nearly 3 seconds'}},
      {id:'temp', l:'Feel her skin temperature', L:'E', cost:10, clue:{t:'Hands cool, no fever'}}
    ],
    abdo:[
      {id:'feel', l:'Feel her tummy gently', L:'E', cost:15, clue:{t:'Tender low down, worse on the left; she tenses her tummy when you press', key:true}}
    ],
    legs:[
      {id:'legs', l:'Look at her legs', L:'E', cost:10, clue:{t:'Nothing of note', normal:true}}
    ]
  },
  questions:[
    {q:'Tell me about the pain', who:'Hannah', a:'It started this morning, low on the left. It’s got worse, and now the tip of my right shoulder hurts too.', clue:{t:'Low left-sided pain, now with pain at the tip of her shoulder', key:true}},
    {q:'When was your last period?', who:'Hannah', a:'About seven weeks ago. I’m usually like clockwork.', clue:{t:'Last period seven weeks ago; normally regular', key:true}},
    {q:'Could you be pregnant?', who:'Hannah', a:'I… suppose I could be. We’ve been trying.', clue:{t:'Could be pregnant', key:true}},
    {q:'Any bleeding?', who:'Hannah', a:'A little bit of spotting this morning.', clue:{t:'Light vaginal spotting this morning'}},
    {q:'Have you felt faint?', who:'Ben, her partner', a:'She nearly went over when she stood up to go to the toilet.', clue:{t:'Nearly fainted on standing', key:true}},
    {q:'Any problems passing water?', who:'Hannah', a:'No, that’s fine.', clue:{t:'No urinary symptoms', normal:true}}
  ],
  obs:{hr:118, sp:98, rr:20, bp:'104/68', t:'36.7', bm:'5.8'},
  options:[
    {id:'ectopic', t:'Ectopic pregnancy'},
    {id:'miscarriage', t:'Miscarriage'},
    {id:'appendix', t:'Appendicitis'},
    {id:'uti', t:'Urine infection'},
    {id:'renal', t:'Kidney stone'},
    {id:'period', t:'Period pain'}
  ],
  correct:'ectopic',
  summary:'A pregnancy growing outside the womb, now bleeding inside her tummy.',
  wrong:{
    miscarriage:'A miscarriage also causes bleeding and cramps, and can’t be ruled out here. But one-sided pain, shoulder-tip pain, nearly fainting and a pulse of 118 suggest bleeding inside the tummy, and an ectopic pregnancy must be thought of first.',
    appendix:'Appendicitis can cause low tummy pain, usually on the right with a fever. Hannah’s missed period, shoulder-tip pain, fast pulse and faintness point elsewhere.',
    uti:'She has no urinary symptoms, and an infection wouldn’t explain the shoulder-tip pain or nearly fainting.',
    renal:'A kidney stone causes waves of loin-to-groin pain with blood in the urine. Hannah’s pain is low and constant and her urine is normal.',
    period:'Her period is seven weeks overdue, and period pain doesn’t cause shoulder-tip pain, nearly fainting or a pulse of 118.'
  },
  separator:{title:'What made this an ectopic pregnancy, not appendicitis',
    text:'A missed period with a possible pregnancy, one-sided low tummy pain, pain at the tip of the shoulder, nearly fainting on standing, and a rising pulse with pale, clammy skin.'},
  explain:[
    'In an ectopic pregnancy the fertilised egg implants outside the womb, usually in a fallopian tube. As it grows, it stretches the tube and causes one-sided pain.',
    'The tube can tear and bleed into the tummy. Blood irritates the diaphragm, which shares its nerve supply with the shoulder tip, so the brain feels pain in the shoulder.',
    'Young, healthy people compensate for blood loss very well. The pulse climbs and the skin goes pale and clammy, but the blood pressure can stay near normal until late. A normal blood pressure shouldn’t reassure you.',
    'Pregnancy should be considered in any woman of childbearing age with tummy pain or a collapse, even if she hasn’t mentioned it.'
  ]
},

/* ───────────────────────── INTERMEDIATE 10 · PANIC ATTACK ───────────────────────── */
{
  id:'int-panic', level:'intermediate',
  dispatch:{time:'23:42', cat:'Cat 2', headline:'Can’t breathe, hands tingling',
    text:'28-year-old female. Difficulty in breathing, tingling in her hands.',
    detail:'Caller is a friend. At a house party.', addr:'House party, terraced street · friend will look out for you'},
  scene:{room:'party_night', chair:'dining', chairColour:'#4a3a5a'},
  patient:{name:'Zara', age:28, sex:'f', skin:'#e8bfa0', hair:'long', hairColour:'#a8442a',
    outfit:'dress', top:'#2a2a3a', shoes:'#1a1a1a', mouth:'gasp', eyes:'open',
    signs:{flushed:true}},
  doorway:{t:'Sitting on a chair at the side of the room, breathing very fast and gripping her friend’s hand', correct:'unwell'},
  askHint:'Zara can talk, in short bursts. Her friend Maddie is with her.',
  areas:{
    face:[
      {id:'talk', l:'Talk to her', L:'A', cost:15, clue:{t:'Airway clear; talking fast in short bursts, very frightened'}, fx:{say:['I can’t breathe!','I think I’m dying!']}},
      {id:'lips', l:'Look at her lips', L:'B', cost:10, clue:{t:'Lips a normal pink colour', normal:true}},
      {id:'skin', l:'Look at her skin', L:'C', cost:10, clue:{t:'A little flushed; no rash or swelling', key:true}},
      {id:'alert', l:'Check how alert she is', L:'D', cost:15, clue:{t:'Alert and oriented, very anxious', normal:true}},
      {id:'pupils', l:'Check her pupils', L:'D', cost:15, kind:'pupils', clue:{t:'Pupils normal size, equal and reacting', key:true}}
    ],
    neck:[
      {id:'stridor', l:'Listen to her breathing at the neck', L:'A', cost:10, clue:{t:'No stridor or noisy breathing in', normal:true}}
    ],
    chest:[
      {id:'rr', l:'Count her breathing rate', L:'B', cost:15, kind:'count', rate:34, what:'breath', clue:{t:'Breathing rate about 34 a minute'}},
      {id:'move', l:'Watch her chest move', L:'B', cost:10, clue:{t:'Both sides move equally; fast breaths from the upper chest', normal:true}},
      {id:'listen', l:'Listen to her chest', L:'B', kind:'listen', zones:[
        {id:'upper', label:'Upper chest', where:'Both sides, below the collarbones', sound:'normal', clue:{t:'Upper chest clear; no wheeze', normal:true}},
        {id:'bases', label:'Bottom of the chest', where:'Both sides, from behind', sound:'normal', clue:{t:'Bottom of the chest clear on both sides', key:true}}
      ]},
      {id:'ecg', l:'Record a 12-lead ECG', L:'C', cost:60, clue:{t:'ECG normal apart from a fast, regular rate', key:true}}
    ],
    hand:[
      {id:'hr', l:'Count her pulse', L:'C', cost:15, kind:'count', rate:112, what:'beat', clue:{t:'Pulse about 112 a minute and regular'}},
      {id:'hands', l:'Look at her hands', L:'D', cost:10, clue:{t:'Fingers cramped and curled inwards', key:true}},
      {id:'bm', l:'Check her blood sugar', L:'D', cost:20, kind:'bm', value:'5.9', clue:{t:'Blood sugar 5.9: normal', normal:true}}
    ],
    abdo:[
      {id:'abdo', l:'Look at and feel her tummy', L:'E', cost:15, clue:{t:'Tummy soft, nothing of note', normal:true}}
    ],
    legs:[
      {id:'calves', l:'Look at and feel her calves', L:'E', cost:15, clue:{t:'Calves soft, not swollen or tender', key:true}}
    ]
  },
  questions:[
    {q:'What happened?', who:'Maddie, her friend', a:'We were dancing, then she took a call from her ex and got really upset. She started breathing faster and faster and saying she couldn’t breathe.', clue:{t:'Started after an upsetting phone call', key:true}},
    {q:'What can you feel?', who:'Zara', a:'My hands… and round my mouth… pins and needles…', clue:{t:'Pins and needles in both hands and around her mouth', key:true}, bubble:['Pins and needles…','my hands…']},
    {q:'Has this happened before?', who:'Maddie, her friend', a:'She had something like this before her exams last year.', clue:{t:'A similar episode last year under stress'}},
    {q:'Do you have asthma or any medical problems?', who:'Zara', a:'No… nothing…', clue:{t:'No asthma or medical problems', normal:true}, bubble:['No…','nothing…']},
    {q:'Has she taken anything tonight?', who:'Maddie, her friend', a:'Two glasses of wine. No drugs. I’ve been with her all night.', clue:{t:'Two glasses of wine; no drugs', key:true}},
    {q:'Any recent travel, surgery or leg pain?', who:'Zara', a:'No… none of that…', clue:{t:'No recent travel, surgery or leg pain', key:true}},
    {q:'Any allergies? Eaten anything new?', who:'Maddie, her friend', a:'No allergies. She’s only had crisps.', clue:{t:'No allergies or new foods', normal:true}}
  ],
  obs:{hr:112, sp:99, rr:34, bp:'132/80', t:'36.8', bm:'5.9'},
  options:[
    {id:'panic', t:'Panic attack (hyperventilation)'},
    {id:'asthma', t:'Asthma attack'},
    {id:'pe', t:'Pulmonary embolism'},
    {id:'anaph', t:'Anaphylaxis'},
    {id:'drugs', t:'Reaction to recreational drugs'},
    {id:'arrhythmia', t:'Heart rhythm problem'}
  ],
  correct:'panic',
  summary:'Overbreathing after an emotional trigger, with every serious cause looked for and ruled out.',
  wrong:{
    asthma:'There’s no wheeze, no history of asthma and her sats are 99%.',
    pe:'A clot on the lung was worth thinking about, but she has no risk factors, no swollen calf, a clear chest and sats of 99%.',
    anaph:'She has no rash, swelling or stridor, no allergies, nothing new to eat, and her blood pressure is normal.',
    drugs:'Her friend has been with her all night. Stimulant drugs would usually cause big pupils, a very fast pulse and a raised temperature; Zara’s pupils and temperature are normal.',
    arrhythmia:'Her pulse is fast, but the ECG shows a normal rhythm that is simply running quickly.'
  },
  separator:{title:'What made this a panic attack, and why you could only say so at the end',
    text:'An emotional trigger, tingling hands and lips with cramped fingers, sats of 99%, a clear chest, a normal ECG apart from the rate, normal calves, normal pupils, and no allergy signs or drugs. Every serious cause was looked for and ruled out first.'},
  explain:[
    'In a panic attack, fear drives very fast breathing. Breathing that fast blows off too much carbon dioxide, which makes the blood slightly alkaline.',
    'That change affects how calcium behaves in the blood and makes nerves more twitchy. The result is pins and needles in the hands and around the mouth, and cramping that curls the fingers inwards.',
    'Those sensations, along with chest tightness and dizziness, make the person even more frightened, which drives even faster breathing. That’s the loop.',
    'Panic attack is a conclusion you reach last, not first. Low sats, a wheeze, chest signs, an abnormal ECG, a swollen calf or signs of allergy all mean something else is going on until proven otherwise.'
  ]
}

];
