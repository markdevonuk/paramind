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
}

];
