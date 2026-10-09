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
}
];
