/* ==================== SHORT ANSWER PRACTICE — CASE DATA ====================
 * Used by: short-answer.html
 * Every case has one patient story and two levels (intro / advanced), each with
 * its own question, word guide, marking points, bonus points and model answer.
 * All content is written for Paramind and clinically checked by Mark before use.
 * Content policy: no drug names, doses, treatment or management.
 */
var SHORT_ANSWER_CATEGORIES = [
    { id: 'cardiovascular', name: 'Cardiovascular',      icon: 'bi-heart-pulse',  colour: '#DC3545' },
    { id: 'respiratory',    name: 'Respiratory',         icon: 'bi-lungs',        colour: '#0DCAF0' },
    { id: 'neurological',   name: 'Neurological',        icon: 'bi-activity',     colour: '#6F42C1' },
    { id: 'sepsis',         name: 'Sepsis & infection',  icon: 'bi-thermometer-half', colour: '#FD7E14' }
];

var SHORT_ANSWER_CASES = [
    {
        "id": "sa-cv-01",
        "category": "cardiovascular",
        "title": "Fluid loss and compensation",
        "stem": "A 72-year-old man has had three days of vomiting and diarrhoea. HR 118, BP 92/58, RR 22. His hands and feet are cool, capillary refill is 4 seconds, and he says he has passed very little urine today.",
        "intro": {
            "question": "Why is this man's heart rate fast, and why are his hands and feet cold?",
            "wordGuide": 100,
            "markingPoints": [
                "He has lost a lot of fluid, so there is less blood in his circulation",
                "Less blood returns to the heart, so it pumps out less with each beat and blood pressure starts to fall",
                "His body detects this and speeds up the heart rate to keep blood moving",
                "Blood vessels in the skin and limbs narrow to send blood to vital organs, so hands and feet are cold and capillary refill is slow"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Fast heart rate, low-ish blood pressure and cold hands after days of fluid loss suggest he is short of fluid.",
                "mechanism": "Vomiting and diarrhoea have reduced the amount of blood in his circulation.",
                "physiology": "With less blood coming back to the heart, each beat pumps out less, and blood pressure starts to drop. His body senses this.",
                "signs": "The heart speeds up to keep blood moving. Vessels in the skin and limbs narrow to send blood to the brain, heart and kidneys, so his hands and feet are cold and refill is slow.",
                "linking": "His fast pulse and cold peripheries are his body compensating for lost fluid."
            }
        },
        "advanced": {
            "question": "Explain the physiological mechanisms behind his tachycardia and cool peripheries.",
            "wordGuide": 150,
            "markingPoints": [
                "Fluid loss from vomiting and diarrhoea reduces circulating blood volume",
                "Reduced venous return lowers preload, so stroke volume falls (Frank–Starling)",
                "Falling stroke volume reduces cardiac output and blood pressure",
                "Baroreceptors in the carotid sinus and aortic arch detect reduced stretch",
                "Sympathetic activation increases heart rate to maintain cardiac output (CO = HR × SV)",
                "Peripheral vasoconstriction diverts blood to vital organs, causing cool peripheries and prolonged capillary refill"
            ],
            "bonusPoints": [
                "RAAS activation and ADH release conserve water and sodium, explaining the reduced urine output."
            ],
            "modelAnswer": {
                "presentation": "Tachycardia, borderline hypotension, cool peripheries, slow capillary refill and low urine output after three days of fluid loss point to hypovolaemia with active compensation.",
                "mechanism": "Vomiting and diarrhoea remove water and electrolytes, reducing circulating volume. Less blood returns to the heart, so preload falls.",
                "physiology": "By the Frank–Starling mechanism, reduced ventricular filling lowers stroke volume, so cardiac output and blood pressure fall. Baroreceptors in the carotid sinus and aortic arch sense reduced stretch and increase sympathetic output.",
                "signs": "Sympathetic stimulation raises heart rate to protect cardiac output (CO = HR × SV). Alpha-adrenergic vasoconstriction in the skin and peripheries redirects blood to the brain, heart and kidneys, producing cool peripheries and prolonged capillary refill. RAAS and ADH reduce urine output to conserve fluid.",
                "linking": "His tachycardia and cool peripheries are not the problem itself but the body's compensation for falling cardiac output caused by volume loss."
            }
        }
    },
    {
        "id": "sa-cv-02",
        "category": "cardiovascular",
        "title": "Exertional chest pain",
        "stem": "A 64-year-old woman gets a tight central chest pain when she walks uphill to the shops. It eases within a few minutes of stopping. She has a history of high cholesterol and smokes.",
        "intro": {
            "question": "Why does her chest pain come on when she walks uphill, and why does it go when she stops?",
            "wordGuide": 100,
            "markingPoints": [
                "Fatty plaque has narrowed the arteries that supply the heart muscle",
                "At rest, enough blood still gets through",
                "Walking uphill makes the heart work harder, so it needs more oxygen, but the narrowed arteries can't deliver more",
                "The heart muscle is short of oxygen, which causes pain; when she rests, the heart needs less and the pain goes"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Chest tightness on exertion that settles with rest is typical of angina.",
                "mechanism": "Fatty plaque, linked to smoking and high cholesterol, has narrowed her coronary arteries.",
                "physiology": "At rest, enough blood gets through. Walking uphill makes the heart beat faster and harder, so it needs more oxygen, but the narrowed arteries can't increase the supply.",
                "signs": "The oxygen-starved heart muscle causes chest tightness.",
                "linking": "When she stops, the heart's demand falls back to what the narrowed arteries can supply, so the pain eases."
            }
        },
        "advanced": {
            "question": "Explain why her chest pain comes on with exertion and settles with rest.",
            "wordGuide": 150,
            "markingPoints": [
                "Atherosclerotic plaque narrows the coronary artery lumen",
                "At rest, the narrowed artery can still supply enough blood to meet demand",
                "Exertion increases heart rate, contractility and so myocardial oxygen demand",
                "The fixed narrowing cannot increase flow to match the higher demand (supply–demand mismatch)",
                "The resulting myocardial ischaemia produces pain",
                "Rest reduces demand, restoring the balance, so the pain settles"
            ],
            "bonusPoints": [
                "Tachycardia shortens diastole, when most coronary perfusion occurs, further reducing supply."
            ],
            "modelAnswer": {
                "presentation": "Predictable chest tightness on exertion that settles with rest, in a smoker with high cholesterol, is the pattern of stable angina.",
                "mechanism": "Atherosclerosis narrows her coronary arteries. The narrowing is fixed, so it limits how much blood can flow through.",
                "physiology": "At rest, flow through the narrowed artery still meets the heart's needs. On exertion, heart rate and contractility rise, increasing myocardial oxygen demand. The narrowed artery cannot increase supply to match, creating a supply–demand mismatch. Tachycardia also shortens diastole, when the left ventricle is mainly perfused.",
                "signs": "The oxygen-starved myocardium switches towards anaerobic metabolism; the resulting metabolites stimulate cardiac pain fibres, felt as central chest tightness. When she stops, demand falls and supply is sufficient again, so the pain resolves within minutes.",
                "linking": "Her pain appears whenever demand outstrips a fixed supply, and disappears when demand falls — the defining feature of stable angina."
            }
        }
    },
    {
        "id": "sa-cv-03",
        "category": "cardiovascular",
        "title": "Breathless lying flat",
        "stem": "An 80-year-old man with a previous heart attack now sleeps propped up on three pillows. Tonight he woke suddenly, very breathless. He has fine crackles at both lung bases and SpO₂ 90%.",
        "intro": {
            "question": "Why is he breathless with crackles in his lungs, and why is it worse when he lies flat?",
            "wordGuide": 100,
            "markingPoints": [
                "His heart attack damaged the left side of his heart, so it can't pump blood forward well",
                "Blood backs up into the lungs, and fluid leaks into the air sacs",
                "Fluid in the air sacs causes crackles and makes it harder to get oxygen into the blood",
                "Lying flat sends more blood back to the heart, which it can't cope with, so more fluid builds up in the lungs"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Breathlessness at night, needing to sleep propped up, crackles and low SpO₂ suggest heart failure with fluid on the lungs.",
                "mechanism": "The damaged left side of his heart can't pump out all the blood it receives.",
                "physiology": "Blood backs up into the blood vessels of the lungs, and the raised pressure pushes fluid into the air sacs.",
                "signs": "Fluid in the air sacs causes crackles and gets in the way of oxygen, lowering SpO₂. Lying flat returns more blood to the heart, making the back-up worse.",
                "linking": "A weak left heart pushes fluid backwards into the lungs, and lying flat adds to the load."
            }
        },
        "advanced": {
            "question": "Explain why he is breathless, has crackles, and is worse lying flat.",
            "wordGuide": 150,
            "markingPoints": [
                "The damaged left ventricle cannot pump blood forward effectively (left ventricular failure)",
                "Pressure backs up into the left atrium and pulmonary veins",
                "Raised pulmonary capillary hydrostatic pressure pushes fluid into the interstitium and alveoli (pulmonary oedema)",
                "Fluid in the alveoli causes crackles and impairs gas exchange, lowering SpO₂",
                "Lying flat increases venous return to the heart, which the failing left ventricle cannot handle, worsening congestion (orthopnoea)",
                "Fluid also makes the lungs stiffer, increasing the work of breathing"
            ],
            "bonusPoints": [
                "Waking suddenly breathless at night is paroxysmal nocturnal dyspnoea, as fluid redistributes over hours lying down."
            ],
            "modelAnswer": {
                "presentation": "Orthopnoea, sudden night-time breathlessness, bibasal crackles and low SpO₂ in a man with previous MI suggest left ventricular failure with pulmonary oedema.",
                "mechanism": "Scarred myocardium reduces the left ventricle's ability to eject blood, so blood backs up into the left atrium and pulmonary veins.",
                "physiology": "Rising pulmonary capillary hydrostatic pressure exceeds the forces holding fluid in the capillaries, so fluid moves into the interstitium and then the alveoli. Lying flat increases venous return, adding volume the failing ventricle cannot move forward.",
                "signs": "Fluid in the alveoli produces crackles, most obvious at the bases where gravity collects it. Fluid thickens the barrier to diffusion, lowering SpO₂, and stiffens the lungs, increasing the work of breathing. Redistribution over hours lying down causes paroxysmal nocturnal dyspnoea.",
                "linking": "Every sign traces back to one problem — a left ventricle that cannot keep up — pushing fluid backwards into the lungs."
            }
        }
    },
    {
        "id": "sa-cv-04",
        "category": "cardiovascular",
        "title": "Fainting in a warm room",
        "stem": "A 23-year-old woman fainted after standing for 40 minutes at a wedding in a hot church. She felt clammy, nauseous and \"went grey\" before collapsing. She recovered within a minute of lying flat. HR on your arrival is 58.",
        "intro": {
            "question": "Why did she faint, and why did she recover quickly once she was lying down?",
            "wordGuide": 100,
            "markingPoints": [
                "Standing still for a long time lets blood pool in the legs, and the heat widens blood vessels",
                "Less blood returns to the heart, so blood pressure falls",
                "A reflex then slows the heart and widens the vessels further, so not enough blood reaches the brain and she faints",
                "Lying flat lets blood return from the legs to the heart and brain, so she recovers"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Feeling clammy and sick, then fainting after standing in the heat and recovering quickly, is a typical simple faint.",
                "mechanism": "Standing still let blood pool in her legs, and the heat widened her blood vessels.",
                "physiology": "Less blood returned to her heart, so her blood pressure fell. A reflex then slowed her heart and widened her vessels further.",
                "signs": "Not enough blood reached her brain, so she collapsed. The slow pulse reflects that reflex.",
                "linking": "Lying flat let gravity stop pulling blood into her legs, so blood reached her brain again and she recovered."
            }
        },
        "advanced": {
            "question": "Explain the physiology behind her faint and why she recovered quickly once lying down.",
            "wordGuide": 150,
            "markingPoints": [
                "Prolonged standing causes blood to pool in the leg veins under gravity",
                "Heat causes peripheral vasodilation, adding to pooling and reducing venous return",
                "Reduced venous return lowers stroke volume, cardiac output and blood pressure",
                "An inappropriate reflex (vasovagal) response causes increased vagal tone and withdrawal of sympathetic tone",
                "This produces bradycardia and further vasodilation, dropping blood pressure",
                "Cerebral perfusion falls below what is needed to maintain consciousness",
                "Lying flat removes the gravitational effect, restoring venous return and cerebral perfusion"
            ],
            "bonusPoints": [
                "Nausea, pallor and sweating are prodromal signs of the autonomic reflex."
            ],
            "modelAnswer": {
                "presentation": "A prodrome of clamminess, nausea and pallor, collapse after prolonged standing in the heat, and rapid recovery lying flat suggest vasovagal syncope.",
                "mechanism": "Standing still lets blood pool in the leg veins, and heat dilates peripheral vessels, so less blood returns to the heart.",
                "physiology": "Reduced venous return lowers stroke volume and blood pressure. In vasovagal syncope, a reflex then over-corrects in the wrong direction: vagal tone increases and sympathetic tone is withdrawn, causing bradycardia and further vasodilation. Blood pressure falls sharply.",
                "signs": "Cerebral perfusion drops below the level needed for consciousness, so she collapses. Autonomic activity causes the nausea, sweating and pallor beforehand, and her HR of 58 reflects the vagal response.",
                "linking": "Once she is flat, gravity no longer holds blood in her legs, venous return and cerebral perfusion recover, and so does she — which is why the faint is brief."
            }
        }
    },
    {
        "id": "sa-cv-05",
        "category": "cardiovascular",
        "title": "A swollen calf",
        "stem": "A 58-year-old man flew back from Australia four days ago. His left calf is now swollen, warm and tender, and measures 4 cm larger than the right.",
        "intro": {
            "question": "How might a clot have formed, and why is only one leg swollen, warm and sore?",
            "wordGuide": 100,
            "markingPoints": [
                "Sitting still for a long flight slows blood flow in the deep leg veins, making a clot more likely",
                "A clot in a deep vein (DVT) blocks blood draining out of that leg",
                "Blood backs up behind the clot and fluid leaks into the tissues, so that leg swells",
                "The clot causes inflammation, making the leg warm and tender"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "One swollen, warm, sore calf after a long flight suggests a deep vein thrombosis.",
                "mechanism": "Sitting still for hours slowed the blood in his deep leg veins, and a clot formed.",
                "physiology": "The clot blocks blood draining out of the leg, so pressure builds up behind it and fluid leaks into the tissues.",
                "signs": "Only that leg swells because only that leg's vein is blocked. The clot causes inflammation, so the calf is warm and tender.",
                "linking": "Slow blood flow caused the clot, and the clot caused the swelling and soreness. It matters because part of it could break off and travel to the lungs."
            }
        },
        "advanced": {
            "question": "Explain how a clot may have formed, and why it causes swelling, warmth and tenderness in one leg.",
            "wordGuide": 150,
            "markingPoints": [
                "Virchow's triad: stasis, hypercoagulability and vessel wall injury",
                "Long-haul immobility causes venous stasis in the deep leg veins",
                "A thrombus forms in a deep vein (deep vein thrombosis)",
                "The clot obstructs venous outflow, raising pressure in the veins and capillaries upstream",
                "Raised capillary hydrostatic pressure forces fluid into the tissues, causing unilateral swelling",
                "The clot triggers local inflammation, causing warmth and tenderness"
            ],
            "bonusPoints": [
                "The main risk is that part of the clot breaks off and travels to the lungs (pulmonary embolism)."
            ],
            "modelAnswer": {
                "presentation": "A unilaterally swollen, warm, tender calf after a long-haul flight suggests a deep vein thrombosis.",
                "mechanism": "Virchow's triad describes the conditions for clotting: stasis, hypercoagulability and vessel wall injury. Hours of immobility on a flight cause stasis, as the calf muscle pump is not moving blood out of the deep veins.",
                "physiology": "A thrombus forms in a deep vein and obstructs venous return from that leg. Pressure rises in the veins and capillaries behind the blockage, and raised capillary hydrostatic pressure pushes fluid out into the surrounding tissues.",
                "signs": "Swelling is one-sided because only one leg's venous outflow is blocked. The clot provokes an inflammatory response in the vein wall and surrounding tissue, producing warmth and tenderness.",
                "linking": "Stasis caused the clot, the clot caused back-pressure and swelling, and inflammation caused the heat and pain — and the clot's ability to embolise is what makes it dangerous."
            }
        }
    },
    {
        "id": "sa-cv-06",
        "category": "cardiovascular",
        "title": "Syncope on exertion",
        "stem": "A 79-year-old man collapsed while climbing stairs and recovered quickly. He has had increasing breathlessness and chest tightness on exertion. You hear a harsh ejection systolic murmur radiating to the carotids. HR 78, BP 118/94.",
        "intro": {
            "question": "Why might a narrowed aortic valve make him collapse when climbing stairs?",
            "wordGuide": 100,
            "markingPoints": [
                "The aortic valve is narrowed, so the heart can only push a limited amount of blood out with each beat",
                "During exercise, the body needs more blood, but the heart can't increase its output enough",
                "Blood pressure drops and not enough blood reaches the brain, so he collapses",
                "Blood squeezing through the narrow valve is turbulent, which causes the murmur"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Collapsing on exertion, with chest tightness, breathlessness and a murmur, suggests a narrowed aortic valve (aortic stenosis).",
                "mechanism": "The narrowed valve limits how much blood the heart can push out.",
                "physiology": "When he climbs stairs, his muscles need more blood, but his heart can't increase its output past the narrowed valve.",
                "signs": "His blood pressure drops and his brain doesn't get enough blood, so he collapses. Blood forced through the narrow valve makes the murmur.",
                "linking": "His heart can't meet the extra demand of exercise because the valve is in the way."
            }
        },
        "advanced": {
            "question": "Explain why aortic stenosis causes syncope on exertion. Link the pathophysiology to his presentation.",
            "wordGuide": 200,
            "markingPoints": [
                "The narrowed aortic valve creates a fixed obstruction to left ventricular outflow",
                "Cardiac output cannot increase adequately during exertion",
                "Exercise causes vasodilation in skeletal muscle, reducing systemic vascular resistance",
                "With fixed output and falling resistance, blood pressure falls and cerebral perfusion drops, causing syncope",
                "Chronic pressure overload causes left ventricular hypertrophy",
                "Hypertrophy raises oxygen demand and compresses subendocardial vessels, causing exertional chest pain",
                "Turbulent flow across the narrowed valve produces the ejection systolic murmur radiating to the carotids"
            ],
            "bonusPoints": [
                "A narrow pulse pressure reflects reduced stroke volume across the stenosed valve; exertional arrhythmia is another possible cause of syncope."
            ],
            "modelAnswer": {
                "presentation": "Exertional syncope, chest tightness and breathlessness, an ejection systolic murmur radiating to the carotids and a narrow pulse pressure suggest severe aortic stenosis.",
                "mechanism": "The calcified, narrowed aortic valve is a fixed obstruction. The left ventricle must generate much higher pressure to eject blood, and the amount it can eject is limited.",
                "physiology": "During exertion, muscle vasodilation lowers systemic vascular resistance. Normally cardiac output rises to compensate, but a fixed outflow obstruction prevents this, so blood pressure falls and cerebral perfusion drops. Chronic pressure overload causes left ventricular hypertrophy, which increases oxygen demand while the thickened wall and high intraventricular pressure compress the subendocardial vessels, reducing supply.",
                "signs": "Syncope reflects cerebral hypoperfusion; chest tightness reflects subendocardial ischaemia; breathlessness reflects rising left-sided filling pressures. Turbulent flow through the valve produces the murmur, which radiates along the direction of flow into the carotids. The narrow pulse pressure (24 mmHg) reflects a reduced stroke volume.",
                "linking": "A fixed outflow obstruction means his heart cannot increase output when his body demands it — so exertion unmasks the problem as collapse, pain and breathlessness."
            }
        }
    },
    {
        "id": "sa-cv-07",
        "category": "cardiovascular",
        "title": "Inferior infarct with bradycardia",
        "stem": "A 67-year-old woman has crushing central chest pain. Her 12-lead ECG shows ST elevation in II, III and aVF. HR 42 with a complete heart block, BP 84/50. Her chest is clear but her neck veins are distended.",
        "intro": {
            "question": "Why might a heart attack affecting the bottom (inferior) wall of the heart cause a slow heart rate and low blood pressure?",
            "wordGuide": 100,
            "markingPoints": [
                "The inferior wall is usually supplied by the right coronary artery",
                "The same artery usually supplies the heart's electrical \"junction box\" (the AV node), so signals get blocked and the heart rate slows",
                "It also supplies the right side of the heart, so the right side pumps less blood through to the left side",
                "A slow heart rate and less blood being pumped both lower the blood pressure"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Chest pain with ST elevation in II, III and aVF, a slow heart rate and low blood pressure suggest an inferior heart attack.",
                "mechanism": "The inferior wall is usually supplied by the right coronary artery, which is now blocked.",
                "physiology": "This artery usually also supplies the AV node, which passes electrical signals from the top to the bottom of the heart, and the right ventricle.",
                "signs": "With the AV node starved of blood, signals are blocked and the heart rate slows. A weak right ventricle sends less blood onwards, so less is pumped to the body. Both lower her blood pressure.",
                "linking": "One blocked artery affects the heart's wiring and its right-sided pump at the same time."
            }
        },
        "advanced": {
            "question": "Explain why an inferior MI can cause bradycardia, heart block and hypotension with clear lungs.",
            "wordGuide": 200,
            "markingPoints": [
                "The inferior wall is usually supplied by the right coronary artery (RCA)",
                "The RCA supplies the SA node in most people and the AV node in most people",
                "Ischaemia of the AV node disrupts conduction, causing heart block and bradycardia",
                "Increased vagal tone in inferior MI can also contribute to bradycardia",
                "The RCA also supplies the right ventricle; right ventricular infarction reduces its output",
                "Reduced right ventricular output lowers left ventricular preload, reducing cardiac output and blood pressure",
                "Blood backs up into the systemic veins (raised JVP) rather than the lungs, so the lung fields are clear"
            ],
            "bonusPoints": [
                "Bradycardia itself reduces cardiac output (CO = HR × SV), compounding the hypotension; right-sided leads (V4R) help identify RV involvement."
            ],
            "modelAnswer": {
                "presentation": "Inferior ST elevation with complete heart block, hypotension, raised JVP and clear lungs suggests an inferior MI with right ventricular involvement.",
                "mechanism": "The inferior wall is usually supplied by the right coronary artery. The RCA also typically supplies the SA and AV nodes and the right ventricle, so a single occlusion affects conduction and right ventricular function together.",
                "physiology": "AV nodal ischaemia disrupts conduction from atria to ventricles, producing heart block; a ventricular escape rhythm gives a slow rate. Vagal activation, common in inferior MI, adds to the bradycardia. Right ventricular infarction reduces the volume pumped into the pulmonary circulation, so less blood reaches the left ventricle — preload and stroke volume fall.",
                "signs": "Low heart rate and low stroke volume together produce significant hypotension (CO = HR × SV). Because the failing ventricle is the right one, blood backs up into the systemic veins, raising the JVP, while the lungs stay clear — unlike left ventricular failure.",
                "linking": "One artery, three consequences: conduction failure, right ventricular failure and hypotension — explaining a picture that looks very different from a typical anterior MI."
            }
        }
    },
    {
        "id": "sa-cv-08",
        "category": "cardiovascular",
        "title": "Muffled heart sounds after a stabbing",
        "stem": "A 30-year-old man has a single stab wound to the left parasternal area. HR 128, BP 82/64, and his systolic BP drops by more than 10 mmHg on inspiration. His neck veins are distended and his heart sounds are quiet.",
        "intro": {
            "question": "What is cardiac tamponade, and why does it cause low blood pressure, swollen neck veins and quiet heart sounds?",
            "wordGuide": 100,
            "markingPoints": [
                "Blood collects in the sac around the heart (the pericardium), which can't stretch quickly",
                "The build-up squeezes the heart so it can't fill properly between beats",
                "Less filling means less blood pumped out, so blood pressure falls and the heart speeds up to compensate",
                "Blood that can't get into the heart backs up into the neck veins, and fluid around the heart muffles the heart sounds"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "A chest stab wound with low blood pressure, a fast pulse, swollen neck veins and quiet heart sounds suggests cardiac tamponade.",
                "mechanism": "Blood has leaked into the sac around the heart, which can't stretch quickly.",
                "physiology": "The pressure squeezes the heart so it can't fill properly, so less blood is pumped out with each beat.",
                "signs": "Blood pressure falls and the heart speeds up to compensate. Blood that can't get into the heart backs up into the neck veins. The fluid around the heart muffles the heart sounds.",
                "linking": "The heart isn't failing as a pump — it's being squeezed so it can't fill."
            }
        },
        "advanced": {
            "question": "Explain the pathophysiology of cardiac tamponade and link it to his signs, including the fall in blood pressure on inspiration.",
            "wordGuide": 200,
            "markingPoints": [
                "Blood collects in the pericardial sac, which cannot stretch acutely",
                "Rising pericardial pressure compresses the heart, especially the thin-walled right side, during diastole",
                "Restricted diastolic filling reduces stroke volume and cardiac output",
                "Hypotension and compensatory tachycardia result",
                "Impaired filling causes venous back-pressure, raising the JVP",
                "Fluid around the heart muffles the heart sounds (Beck's triad: hypotension, raised JVP, muffled heart sounds)",
                "On inspiration, increased venous return fills the right ventricle, pushing the septum into the left ventricle (ventricular interdependence), reducing left ventricular stroke volume — pulsus paradoxus"
            ],
            "bonusPoints": [
                "The narrow pulse pressure reflects the low stroke volume; the rate at which fluid accumulates matters more than the volume."
            ],
            "modelAnswer": {
                "presentation": "A penetrating chest wound with hypotension, tachycardia, raised JVP, quiet heart sounds and pulsus paradoxus indicates cardiac tamponade.",
                "mechanism": "Blood from the wound fills the pericardial sac. The fibrous pericardium cannot stretch quickly, so even a small volume raises pericardial pressure sharply.",
                "physiology": "High pericardial pressure compresses the heart during diastole, limiting how much the ventricles can fill — the thin-walled right side is affected first. Reduced filling lowers stroke volume and cardiac output. On inspiration, venous return to the right ventricle increases; because the pericardium cannot expand, the septum bulges into the left ventricle, reducing its filling and output further.",
                "signs": "Low cardiac output causes hypotension with a narrow pulse pressure, and sympathetic compensation causes tachycardia. Blood that cannot enter the heart backs up, distending the neck veins. Fluid around the heart dampens the heart sounds. The exaggerated fall in systolic pressure on inspiration is pulsus paradoxus.",
                "linking": "Tamponade is a filling problem, not a pumping problem — every sign follows from a heart that cannot fill because it is being squeezed from outside."
            }
        }
    },
    {
        "id": "sa-cv-09",
        "category": "cardiovascular",
        "title": "Peaked T waves",
        "stem": "A 71-year-old man with chronic kidney disease has missed two dialysis sessions. He feels weak and his legs feel heavy. His ECG shows tall, peaked T waves and a broadening QRS. HR 52.",
        "intro": {
            "question": "Why has his potassium gone up, and why is a high potassium dangerous for his heart?",
            "wordGuide": 100,
            "markingPoints": [
                "The kidneys normally remove potassium; with kidney disease and missed dialysis, it builds up in the blood",
                "Potassium is essential for the electrical signals in heart and muscle cells",
                "Too much potassium disrupts these signals, changing the ECG (tall, peaked T waves and a wider QRS) and slowing the heart",
                "It can progress to a dangerous rhythm or cardiac arrest, and also causes muscle weakness"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Weakness, a slow pulse and tall T waves in a man who has missed dialysis suggest a high potassium.",
                "mechanism": "His kidneys can't remove potassium, and without dialysis it has built up in his blood.",
                "physiology": "Potassium controls the electrical charge across heart and muscle cells. Too much disturbs how those cells fire and recover.",
                "signs": "The ECG shows tall, peaked T waves and a widening QRS, and his heart rate is slow. His muscles are affected too, causing weakness.",
                "linking": "The same electrical disturbance affects his heart and his muscles — and in the heart it can lead to cardiac arrest."
            }
        },
        "advanced": {
            "question": "Explain why a high potassium changes the ECG and causes weakness. Link your answer to the cardiac action potential.",
            "wordGuide": 200,
            "markingPoints": [
                "Kidneys excrete most potassium; without dialysis, potassium accumulates in the blood",
                "Raised extracellular potassium reduces the gradient for potassium to leave cells",
                "The resting membrane potential becomes less negative (partially depolarised)",
                "This inactivates some fast sodium channels, slowing depolarisation and conduction — widened QRS, bradycardia, and risk of heart block",
                "Increased potassium conductance speeds repolarisation, producing tall, peaked T waves",
                "The same effect on skeletal muscle membranes reduces excitability, causing weakness",
                "Progression can lead to a sine-wave pattern and cardiac arrest"
            ],
            "bonusPoints": [
                "Flattened or absent P waves reflect slowed atrial conduction; metabolic acidosis in renal failure shifts potassium out of cells."
            ],
            "modelAnswer": {
                "presentation": "Missed dialysis, weakness, bradycardia, peaked T waves and a widening QRS indicate significant hyperkalaemia.",
                "mechanism": "The kidneys are the main route for potassium excretion. Without dialysis, potassium builds up in the extracellular fluid.",
                "physiology": "The resting membrane potential depends on potassium leaving cells down its concentration gradient. When extracellular potassium rises, the gradient falls and the resting potential becomes less negative. A partly depolarised membrane inactivates a proportion of fast sodium channels, so phase 0 depolarisation is slower and conduction through the myocardium is delayed. At the same time, increased potassium conductance accelerates phase 3 repolarisation.",
                "signs": "Faster repolarisation gives tall, peaked T waves. Slowed conduction widens the QRS, flattens P waves and slows the heart rate, and can progress to heart block, a sine-wave pattern and arrest. Skeletal muscle membranes are affected in the same way, reducing excitability and causing weakness.",
                "linking": "One change — a less negative resting membrane potential — explains both the ECG and the weakness, and why hyperkalaemia is so dangerous to the heart."
            }
        }
    },
    {
        "id": "sa-cv-10",
        "category": "cardiovascular",
        "title": "Tearing pain and unequal blood pressures",
        "stem": "A 68-year-old man with poorly controlled hypertension has sudden, severe \"tearing\" chest pain going through to his back. BP is 186/104 in the right arm and 142/88 in the left. He says his left leg feels numb.",
        "intro": {
            "question": "What is an aortic dissection, and why might it cause different blood pressures in each arm?",
            "wordGuide": 100,
            "markingPoints": [
                "Long-term high blood pressure weakens the wall of the aorta",
                "A tear in the inner lining lets blood force its way between the layers of the aortic wall",
                "The tearing of the wall causes sudden, severe pain that goes through to the back",
                "The split can block arteries branching off the aorta, so less blood reaches one arm (different blood pressures) or a leg (numbness)"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Sudden tearing chest pain into the back, with different blood pressures in each arm, suggests an aortic dissection.",
                "mechanism": "Years of high blood pressure have weakened his aorta, and a tear has opened in its inner lining.",
                "physiology": "Blood forces its way between the layers of the aortic wall and spreads along it.",
                "signs": "The tearing causes severe pain felt in the back. As the split spreads, it can block arteries branching off the aorta, so one arm gets less blood (lower pressure) and so can a leg (numbness).",
                "linking": "Where the split spreads decides which parts of the body lose blood supply."
            }
        },
        "advanced": {
            "question": "Explain the pathophysiology of aortic dissection and link it to his pain, unequal blood pressures and leg symptoms.",
            "wordGuide": 200,
            "markingPoints": [
                "Chronic hypertension weakens the aortic wall (the media)",
                "A tear in the intima lets blood enter the media, creating a false lumen",
                "Blood tracks along the aorta between the layers, extending the dissection",
                "Tearing of the wall produces sudden severe pain that moves or radiates to the back",
                "The false lumen can compress or occlude branch arteries arising from the aorta",
                "Involvement of a subclavian artery reduces flow to one arm, causing unequal blood pressures",
                "Involvement of vessels supplying the legs or spinal cord explains numbness or weakness"
            ],
            "bonusPoints": [
                "Proximal dissection can involve the coronary arteries or aortic valve, or rupture into the pericardium, causing tamponade."
            ],
            "modelAnswer": {
                "presentation": "Sudden tearing chest pain radiating to the back, a significant difference in arm blood pressures and a neurological leg symptom in a hypertensive man suggest aortic dissection.",
                "mechanism": "Long-standing hypertension places stress on the aortic wall and weakens its middle layer. A tear in the inner lining allows blood under high pressure to enter the wall and split the layers apart, creating a false lumen.",
                "physiology": "Driven by arterial pressure, blood tracks along the aorta within the false lumen. As it extends, the false lumen can compress or shear off the openings of branch arteries — including the subclavian, carotid, renal, spinal and iliac arteries.",
                "signs": "Tearing of the aortic wall causes sudden, severe pain, felt in the back as the dissection extends. Reduced flow into one subclavian artery lowers the blood pressure in that arm. Compromise of arteries to the leg or spinal cord explains his numbness.",
                "linking": "His signs depend on which branches the false lumen reaches — so a single tear can present as chest pain, a pulse deficit and a neurological symptom at the same time."
            }
        }
    },
    {
        "id": "sa-rs-01",
        "category": "respiratory",
        "title": "Wheeze in asthma",
        "stem": "A 19-year-old woman with known asthma became breathless after running for a bus on a cold morning. She has a widespread expiratory wheeze, RR 26 and can speak in short sentences.",
        "intro": {
            "question": "Why does an asthma attack cause wheeze and make it hard to breathe out?",
            "wordGuide": 100,
            "markingPoints": [
                "In asthma the airways are sensitive and react to triggers such as cold air and exercise",
                "The muscle around the airways tightens, the lining swells and more mucus is made, so the airways narrow",
                "Air forced through narrowed airways makes the whistling sound of a wheeze",
                "Airways naturally narrow further when breathing out, so air gets trapped and breathing out is hardest"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Breathlessness and wheeze after exercise in cold air, in someone with asthma, suggests an asthma attack.",
                "mechanism": "Cold air and exercise triggered her sensitive airways to react.",
                "physiology": "The muscle around her airways has tightened, the lining has swollen and extra mucus has been produced, so the airways are narrower.",
                "signs": "Air squeezing through narrow airways makes a wheeze. Airways get even narrower when breathing out, so air is harder to push out and she breathes fast to keep up.",
                "linking": "Narrowed airways explain both the wheeze and why breathing out is the hardest part."
            }
        },
        "advanced": {
            "question": "Explain the pathophysiology of an acute asthma attack and link it to her expiratory wheeze and raised respiratory rate.",
            "wordGuide": 150,
            "markingPoints": [
                "Asthma is chronic airway inflammation with airway hyperresponsiveness",
                "Triggers (cold, dry air and exercise) provoke mast cell degranulation and inflammatory mediator release, e.g. histamine and leukotrienes",
                "This causes bronchial smooth muscle contraction (bronchoconstriction), mucosal oedema and mucus hypersecretion",
                "Airway resistance rises sharply as radius falls (resistance is proportional to 1/r⁴)",
                "During expiration, rising intrathoracic pressure compresses the narrowed airways, limiting airflow and causing air trapping",
                "Turbulent flow through narrowed airways produces the expiratory wheeze",
                "Increased work of breathing and V/Q mismatch drive the raised respiratory rate"
            ],
            "bonusPoints": [
                "Air trapping causes hyperinflation, flattening the diaphragm and making breathing less efficient."
            ],
            "modelAnswer": {
                "presentation": "Exercise- and cold-triggered breathlessness with widespread expiratory wheeze, tachypnoea and short sentences indicates an acute asthma exacerbation.",
                "mechanism": "Her airways are chronically inflamed and hyperresponsive. Cold, dry air during exercise triggers mast cells to release mediators such as histamine and leukotrienes.",
                "physiology": "These cause bronchoconstriction, mucosal oedema and mucus hypersecretion, all reducing airway radius. Because resistance is proportional to 1/r⁴, small reductions in radius greatly increase resistance. During expiration, rising intrathoracic pressure compresses already narrowed airways, limiting outflow and trapping air.",
                "signs": "Turbulent airflow through narrowed airways produces the wheeze, loudest on expiration. Increased airway resistance raises the work of breathing, and uneven ventilation creates V/Q mismatch, both driving her raised respiratory rate. Needing to breathe fast limits her to short sentences.",
                "linking": "Inflammation narrows her airways; narrowed airways explain the wheeze, the air trapping and the effort she needs to breathe."
            }
        }
    },
    {
        "id": "sa-rs-02",
        "category": "respiratory",
        "title": "Swelling and breathlessness after a sting",
        "stem": "A 34-year-old man was stung by a wasp 10 minutes ago. He has a widespread raised red rash, swollen lips and a hoarse voice, and is wheezy. HR 124, BP 84/48.",
        "intro": {
            "question": "Why has a wasp sting caused a rash, swelling, wheeze and low blood pressure?",
            "wordGuide": 100,
            "markingPoints": [
                "His immune system has overreacted to the sting (a severe allergic reaction, anaphylaxis)",
                "Immune cells release chemicals such as histamine throughout the body",
                "These make blood vessels widen and leak, causing the rash, the swelling and a fall in blood pressure",
                "They also tighten the airways, causing wheeze, and swelling around the throat causes the hoarse voice"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "A rash, swollen lips, hoarse voice, wheeze and low blood pressure minutes after a sting suggest anaphylaxis.",
                "mechanism": "His immune system has massively overreacted to the wasp venom.",
                "physiology": "Immune cells release chemicals like histamine all over his body. These widen blood vessels, make them leaky and tighten the airways.",
                "signs": "Wide, leaky vessels cause the red rash, the swelling of his lips and throat, and low blood pressure, with his heart racing to compensate. Tight airways cause the wheeze, and throat swelling makes his voice hoarse.",
                "linking": "One chemical release affects his skin, airway, breathing and circulation at the same time."
            }
        },
        "advanced": {
            "question": "Explain the pathophysiology of anaphylaxis and link it to his airway, breathing and circulation findings.",
            "wordGuide": 200,
            "markingPoints": [
                "Prior sensitisation has produced IgE antibodies bound to mast cells and basophils",
                "Re-exposure to the allergen cross-links IgE, triggering rapid, widespread degranulation",
                "Mediators released include histamine, tryptase, leukotrienes and prostaglandins",
                "Vasodilation and increased capillary permeability cause fluid to shift out of the circulation, producing distributive shock (hypotension with compensatory tachycardia)",
                "Fluid leak into tissues causes angioedema, including of the lips and larynx, explaining the hoarse voice and airway threat",
                "Bronchial smooth muscle contraction and mucosal oedema cause bronchospasm and wheeze",
                "Cutaneous vasodilation and leak cause the urticarial rash and flushing"
            ],
            "bonusPoints": [
                "Up to a third of circulating volume can shift out of the vessels within minutes; reduced venous return lowers preload and cardiac output."
            ],
            "modelAnswer": {
                "presentation": "Rapid-onset urticaria, lip swelling, hoarseness, wheeze, tachycardia and hypotension after a sting indicate anaphylaxis affecting airway, breathing and circulation.",
                "mechanism": "Previous exposure sensitised him, producing IgE antibodies that sit on mast cells and basophils. On re-exposure, venom cross-links this IgE, triggering sudden, widespread degranulation.",
                "physiology": "Released mediators — histamine, tryptase, leukotrienes and prostaglandins — cause systemic vasodilation and increased capillary permeability, so large volumes of fluid shift into the tissues. Venous return and preload fall, reducing cardiac output. The same mediators contract bronchial smooth muscle and cause mucosal oedema.",
                "signs": "Vasodilation and fluid loss from the circulation cause distributive shock: hypotension with a compensatory tachycardia. Tissue fluid produces angioedema of the lips and larynx, making his voice hoarse and threatening his airway. Bronchospasm causes wheeze. Skin vasodilation and leak cause the urticarial rash.",
                "linking": "A single immune trigger releases mediators that act everywhere at once, which is why anaphylaxis threatens airway, breathing and circulation together."
            }
        }
    },
    {
        "id": "sa-rs-03",
        "category": "respiratory",
        "title": "Chest infection",
        "stem": "A 76-year-old woman has had a cough with green sputum for three days. She is hot to touch (38.9 °C), RR 28, SpO₂ 91%, HR 108. There are coarse crackles and bronchial breathing over her right lower zone.",
        "intro": {
            "question": "Why does pneumonia cause crackles, a high temperature and low oxygen levels?",
            "wordGuide": 100,
            "markingPoints": [
                "An infection in the lung causes inflammation, and the air sacs fill with fluid and pus",
                "Air bubbling through fluid in the air sacs and small airways makes crackles",
                "Oxygen can't get into the blood through air sacs full of fluid, so oxygen levels fall and she breathes faster",
                "The body's immune response to the infection causes the high temperature, and the heart speeds up"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Cough with green sputum, fever, fast breathing, low oxygen and crackles on one side suggest pneumonia.",
                "mechanism": "An infection has taken hold in part of her right lung.",
                "physiology": "The inflammation fills the air sacs in that area with fluid and pus, so that part of the lung can't take in air properly.",
                "signs": "Air moving through fluid causes crackles. Less working lung means less oxygen gets into her blood, so SpO₂ falls and she breathes faster. Her immune response causes the fever and a faster heart rate.",
                "linking": "Infected, fluid-filled air sacs explain both the chest sounds and her low oxygen."
            }
        },
        "advanced": {
            "question": "Explain the pathophysiology of lobar pneumonia and link it to her hypoxaemia, crackles, bronchial breathing and fever.",
            "wordGuide": 200,
            "markingPoints": [
                "Bacterial infection triggers an inflammatory response in the alveoli",
                "Alveoli fill with inflammatory exudate — fluid, neutrophils and debris (consolidation)",
                "Perfused but unventilated alveoli create a V/Q mismatch (shunt), lowering arterial oxygen",
                "Hypoxaemia and increased work of breathing stimulate a raised respiratory rate",
                "Crackles occur as air moves through fluid-filled small airways and alveoli open",
                "Consolidated lung transmits sound from the large airways well, producing bronchial breathing",
                "Cytokines (e.g. IL-1, IL-6) act on the hypothalamus to raise the temperature set-point, causing fever; tachycardia reflects fever, sepsis and hypoxaemia"
            ],
            "bonusPoints": [
                "Hypoxic pulmonary vasoconstriction partly redirects blood away from consolidated lung but cannot fully correct the shunt; the illness may progress to sepsis."
            ],
            "modelAnswer": {
                "presentation": "Productive cough, fever, tachypnoea, tachycardia, low SpO₂ and focal crackles with bronchial breathing indicate right lower lobe pneumonia.",
                "mechanism": "Bacteria in the alveoli trigger an inflammatory response. Alveoli fill with exudate of fluid, neutrophils and debris — consolidation.",
                "physiology": "Consolidated alveoli are still perfused but no longer ventilated, creating a shunt: blood passes them without picking up oxygen, lowering arterial oxygen. Hypoxic pulmonary vasoconstriction diverts some flow away but cannot fully compensate. Cytokines such as IL-1 and IL-6 reset the hypothalamic temperature set-point.",
                "signs": "Hypoxaemia and stiffer lungs drive a raised respiratory rate. Air moving through fluid and airways opening produce crackles. Solid, consolidated lung conducts sound from the bronchi more efficiently than aerated lung, giving bronchial breathing. The raised set-point causes fever, and fever, hypoxaemia and the systemic response raise her heart rate.",
                "linking": "Consolidation explains the local chest signs and the hypoxaemia, while the systemic inflammatory response explains the fever and tachycardia."
            }
        }
    },
    {
        "id": "sa-rs-04",
        "category": "respiratory",
        "title": "Sudden chest pain in a tall young man",
        "stem": "A tall, slim 21-year-old man developed sudden sharp left-sided chest pain and breathlessness while sitting at his desk. Air entry is reduced on the left, and the left side sounds more resonant on percussion. SpO₂ 95%, RR 22.",
        "intro": {
            "question": "What has happened to his lung, and why are the breath sounds quieter on that side?",
            "wordGuide": 100,
            "markingPoints": [
                "Air has leaked into the space between the lung and the chest wall (a pneumothorax)",
                "Tall, slim young men can have small weak air blisters on the lung that burst without injury",
                "The lung partly collapses because it is no longer held against the chest wall",
                "Less air moves in and out of the collapsed lung, so breath sounds are quieter, and air in the chest makes it sound more hollow when tapped"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Sudden sharp one-sided chest pain and breathlessness in a tall, slim young man suggest a spontaneous pneumothorax.",
                "mechanism": "A small weak blister on the surface of his lung has burst, letting air into the space around the lung.",
                "physiology": "The lung normally stays inflated because it's held against the chest wall. With air in that space, the lung partly collapses.",
                "signs": "The collapsed lung moves less air, so breath sounds are quieter on that side. Air in the chest makes it sound more hollow (resonant) when tapped. Pain comes from the irritated lining of the lung.",
                "linking": "Air in the wrong place lets the lung collapse, explaining the quiet breath sounds and breathlessness."
            }
        },
        "advanced": {
            "question": "Explain the pathophysiology of a primary spontaneous pneumothorax and link it to his clinical signs.",
            "wordGuide": 150,
            "markingPoints": [
                "Primary spontaneous pneumothorax typically affects tall, thin young males, often from rupture of apical subpleural blebs",
                "Normally negative intrapleural pressure keeps the lung expanded against the chest wall",
                "Air entering the pleural space abolishes the negative pressure, and the lung's elastic recoil causes it to collapse",
                "The collapsed lung is poorly ventilated, causing V/Q mismatch; young, healthy lungs usually compensate, so SpO₂ may be near normal",
                "Reduced ventilation of the affected lung causes reduced air entry and breath sounds",
                "Air in the pleural space causes hyper-resonance on percussion",
                "Irritation of the parietal pleura causes sharp, pleuritic pain"
            ],
            "bonusPoints": [
                "Blebs at the apex are exposed to more negative pleural pressure in tall individuals, increasing the risk of rupture."
            ],
            "modelAnswer": {
                "presentation": "Sudden pleuritic chest pain and breathlessness at rest with reduced air entry and hyper-resonance on one side in a tall, slim young man indicate a primary spontaneous pneumothorax.",
                "mechanism": "Small subpleural blebs at the lung apex have ruptured, allowing air into the pleural space. In tall individuals the apex is exposed to more negative pleural pressure, increasing this risk.",
                "physiology": "The lung is normally held expanded by negative intrapleural pressure. When air enters the pleural space, that pressure is lost and the lung's elastic recoil collapses it. The collapsed portion is poorly ventilated, creating V/Q mismatch, but healthy young lungs often compensate, keeping SpO₂ close to normal.",
                "signs": "Reduced ventilation gives reduced air entry and quieter breath sounds. Air between lung and chest wall produces hyper-resonance on percussion. Parietal pleural irritation causes sharp, pleuritic pain.",
                "linking": "Loss of negative pleural pressure explains the collapse, and air in the pleural space explains the percussion and auscultation findings."
            }
        }
    },
    {
        "id": "sa-rs-05",
        "category": "respiratory",
        "title": "Tingling fingers when anxious",
        "stem": "A 27-year-old woman is very anxious after a stressful phone call. She is breathing fast (RR 34), says her lips and fingers are tingling, and her hands are cramping. SpO₂ 99%.",
        "intro": {
            "question": "Why does breathing too fast make her fingers and lips tingle and her hands cramp?",
            "wordGuide": 100,
            "markingPoints": [
                "Anxiety has made her breathe much faster and deeper than her body needs",
                "She is breathing out too much carbon dioxide, so its level in the blood falls",
                "Less carbon dioxide makes the blood more alkaline",
                "This reduces the calcium available to nerves and muscles, making them over-excitable, which causes tingling and cramping"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Fast breathing, tingling lips and fingers and hand cramps after a stressful event suggest anxiety-related hyperventilation.",
                "mechanism": "Anxiety has made her breathe faster and deeper than her body needs.",
                "physiology": "She is blowing off too much carbon dioxide, so her blood becomes more alkaline. This lowers the calcium available to her nerves and muscles.",
                "signs": "Nerves become over-excitable, causing tingling around the mouth and in the fingers. Muscles in her hands cramp. Her SpO₂ is normal because the problem is carbon dioxide, not oxygen.",
                "linking": "Breathing off too much carbon dioxide explains all her symptoms."
            }
        },
        "advanced": {
            "question": "Explain the physiology linking hyperventilation to her paraesthesia and carpopedal spasm.",
            "wordGuide": 150,
            "markingPoints": [
                "Anxiety drives alveolar ventilation beyond metabolic need",
                "Excess CO₂ elimination lowers PaCO₂ (hypocapnia)",
                "Falling CO₂ reduces carbonic acid and hydrogen ions, raising pH — respiratory alkalosis",
                "In alkalosis, more calcium binds to albumin, lowering ionised (free) calcium",
                "Low ionised calcium increases neuronal excitability, causing perioral and peripheral paraesthesia",
                "Increased neuromuscular excitability causes muscle spasm, e.g. carpopedal spasm",
                "SpO₂ is normal because oxygenation is not the problem"
            ],
            "bonusPoints": [
                "Hypocapnia causes cerebral vasoconstriction, which can cause light-headedness; organic causes of tachypnoea must be excluded before attributing it to anxiety."
            ],
            "modelAnswer": {
                "presentation": "Tachypnoea with perioral and digital paraesthesia and carpopedal spasm, normal SpO₂ and an emotional trigger suggest hyperventilation with respiratory alkalosis.",
                "mechanism": "Anxiety increases alveolar ventilation beyond what her metabolism requires, so CO₂ is removed faster than it is produced.",
                "physiology": "PaCO₂ falls. Less CO₂ means less carbonic acid and fewer hydrogen ions, so pH rises — a respiratory alkalosis. In alkalosis, albumin binds more calcium, lowering the ionised fraction that stabilises nerve and muscle membranes.",
                "signs": "Reduced ionised calcium lowers the threshold for depolarisation, so peripheral and perioral nerves fire spontaneously, causing tingling. Increased neuromuscular excitability produces carpopedal spasm. Hypocapnic cerebral vasoconstriction can add light-headedness. SpO₂ is 99% because oxygenation is normal.",
                "linking": "Her symptoms come from what she is losing — CO₂ — and its effect on pH and calcium, not from a lack of oxygen."
            }
        }
    },
    {
        "id": "sa-rs-06",
        "category": "respiratory",
        "title": "Drowsy with a chest infection and COPD",
        "stem": "A 71-year-old man with severe COPD has had a chest infection for four days. His family say he has become drowsy and confused today. He has a headache, warm peripheries and a bounding pulse. RR 26, SpO₂ 84%.",
        "intro": {
            "question": "Why might a flare-up of COPD make him drowsy and confused?",
            "wordGuide": 100,
            "markingPoints": [
                "COPD damages the lungs so they can't move air in and out efficiently",
                "The chest infection makes this worse, so he can't breathe out enough carbon dioxide",
                "Carbon dioxide builds up in his blood",
                "High carbon dioxide affects the brain, making him drowsy, confused and headachy"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Drowsiness, confusion and headache during a chest infection in someone with severe COPD suggest a build-up of carbon dioxide.",
                "mechanism": "His damaged lungs already struggle, and the infection has made them worse.",
                "physiology": "He can't breathe out enough carbon dioxide, so it builds up in his blood. Oxygen levels also fall.",
                "signs": "High carbon dioxide affects his brain, causing drowsiness, confusion and headache. It also widens blood vessels, making his hands warm and his pulse bounding.",
                "linking": "His lungs can't get rid of carbon dioxide, and the build-up is what's affecting his brain."
            }
        },
        "advanced": {
            "question": "Explain the pathophysiology of hypercapnic respiratory failure in an exacerbation of COPD and link it to his neurological and circulatory signs.",
            "wordGuide": 200,
            "markingPoints": [
                "COPD causes airflow limitation from airway inflammation and narrowing, and alveolar destruction in emphysema",
                "Infection increases airway resistance and mucus, worsening V/Q mismatch and alveolar hypoventilation",
                "Respiratory muscles are disadvantaged by hyperinflation and tire, reducing effective ventilation",
                "CO₂ elimination falls, so PaCO₂ rises (type 2 respiratory failure)",
                "Rising CO₂ causes respiratory acidosis",
                "Hypercapnia and acidosis depress the CNS, causing drowsiness and confusion (CO₂ narcosis)",
                "CO₂ is a vasodilator: cerebral vasodilation causes headache, and peripheral vasodilation causes warm peripheries and a bounding pulse"
            ],
            "bonusPoints": [
                "Chronic compensation (renal bicarbonate retention) may be present, but an acute rise overwhelms it, lowering pH; a flapping tremor is another sign of hypercapnia."
            ],
            "modelAnswer": {
                "presentation": "Drowsiness, confusion, headache, warm peripheries, a bounding pulse and low SpO₂ during an infective exacerbation of severe COPD suggest hypercapnic (type 2) respiratory failure.",
                "mechanism": "COPD causes chronic airflow limitation and, in emphysema, loss of alveolar surface. Infection adds airway inflammation and mucus, raising resistance and worsening V/Q mismatch.",
                "physiology": "Hyperinflation flattens the diaphragm, putting the respiratory muscles at a mechanical disadvantage; as they fatigue, alveolar ventilation falls. CO₂ elimination can no longer match production, so PaCO₂ rises. Even with chronic renal bicarbonate retention, an acute rise lowers pH — a respiratory acidosis.",
                "signs": "Hypercapnia and acidosis depress the central nervous system, producing drowsiness and confusion. CO₂ is a potent vasodilator: cerebral vasodilation causes headache, and peripheral vasodilation causes warm hands and a bounding pulse. Low SpO₂ reflects the accompanying hypoxaemia.",
                "linking": "Falling ventilation leads to rising CO₂, and CO₂'s effects on the brain and blood vessels explain his neurological and circulatory signs."
            }
        }
    },
    {
        "id": "sa-rs-07",
        "category": "respiratory",
        "title": "Sudden breathlessness after surgery",
        "stem": "A 62-year-old woman had a hip replacement 10 days ago. She has become suddenly breathless with sharp right-sided chest pain on breathing in. HR 116, RR 30, SpO₂ 89%, BP 104/70. Her chest sounds clear.",
        "intro": {
            "question": "Why might a blood clot in the lungs cause sudden breathlessness and low oxygen, even though her chest sounds clear?",
            "wordGuide": 100,
            "markingPoints": [
                "After surgery and reduced mobility, a clot can form in a leg vein and travel to the lungs (pulmonary embolism)",
                "The clot blocks blood flow to part of the lung",
                "Air still reaches that part of the lung, but no blood is there to pick up oxygen, so oxygen levels fall",
                "Her airways and air sacs aren't affected, so the chest sounds clear; she breathes fast and her heart speeds up to compensate"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Sudden breathlessness, pleuritic chest pain, a fast heart rate and low oxygen with a clear chest after hip surgery suggest a pulmonary embolism.",
                "mechanism": "Surgery and reduced movement led to a clot forming, which travelled to her lungs.",
                "physiology": "The clot blocks blood flow to part of her lung. Air still gets there, but no blood is passing to collect oxygen.",
                "signs": "Her oxygen level falls, so she breathes fast and her heart speeds up. The chest sounds clear because the problem is in the blood vessels, not the airways.",
                "linking": "A clear chest with low oxygen fits a blockage in the lung's blood supply."
            }
        },
        "advanced": {
            "question": "Explain the pathophysiology of pulmonary embolism and link it to her hypoxaemia, pleuritic pain, tachycardia and clear chest.",
            "wordGuide": 200,
            "markingPoints": [
                "Post-operative immobility and surgery (Virchow's triad) predispose to DVT, which embolises to the pulmonary arteries",
                "The embolus obstructs pulmonary blood flow, so ventilated alveoli are no longer perfused (increased dead space)",
                "Blood is redirected to other regions, causing V/Q mismatch and hypoxaemia",
                "Hypoxaemia and stimulation of lung receptors drive tachypnoea",
                "Distal lung tissue may infarct, irritating the pleura and causing pleuritic pain",
                "Raised pulmonary vascular resistance increases right ventricular afterload; RV strain can reduce left-sided filling and cardiac output, with compensatory tachycardia",
                "Airways and alveoli are not primarily affected, so the chest is often clear on auscultation"
            ],
            "bonusPoints": [
                "A massive PE can cause obstructive shock and cardiac arrest; tachypnoea often lowers PaCO₂."
            ],
            "modelAnswer": {
                "presentation": "Sudden breathlessness, pleuritic chest pain, tachycardia, tachypnoea and hypoxaemia with a clear chest 10 days after hip surgery indicate a pulmonary embolism.",
                "mechanism": "Surgery and immobility satisfy Virchow's triad, promoting deep vein thrombosis. A thrombus has broken off and lodged in her pulmonary arterial tree.",
                "physiology": "Alveoli beyond the blockage are ventilated but not perfused, increasing dead space. Blood diverted to other lung regions over-perfuses them relative to ventilation, so V/Q mismatch lowers arterial oxygen. Obstruction raises pulmonary vascular resistance and right ventricular afterload; a strained right ventricle can reduce left-sided filling and cardiac output.",
                "signs": "Hypoxaemia and lung receptor stimulation cause tachypnoea. Infarction of distal lung irritates the pleura, causing pain on inspiration. Reduced output and hypoxaemia drive a compensatory tachycardia; her BP is still maintained. Because the airways and alveoli themselves are unaffected, the chest sounds clear.",
                "linking": "PE is a perfusion problem, not a ventilation one — which is why she is hypoxic and breathless with a clear chest."
            }
        }
    },
    {
        "id": "sa-rs-08",
        "category": "respiratory",
        "title": "Deteriorating after a chest injury",
        "stem": "A 40-year-old motorcyclist has a left-sided chest injury. Over 10 minutes he has become increasingly breathless and distressed. There is no air entry on the left, his neck veins are distended, HR 140, BP 78/50, SpO₂ 82%. His trachea is deviated to the right.",
        "intro": {
            "question": "What is a tension pneumothorax, and why does it cause low blood pressure as well as breathing problems?",
            "wordGuide": 100,
            "markingPoints": [
                "Air leaks into the space around the lung with each breath but can't escape (a one-way valve)",
                "Pressure builds up in that side of the chest and the lung collapses completely, so there is no air entry",
                "The rising pressure pushes the heart and main blood vessels towards the other side",
                "This squashes the large veins returning blood to the heart, so the heart can't fill, blood pressure falls and neck veins swell"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Worsening breathlessness, no air entry on one side, swollen neck veins, low blood pressure and a shifted windpipe after a chest injury suggest a tension pneumothorax.",
                "mechanism": "A lung injury is letting air into the space around the lung with every breath, but it can't get out.",
                "physiology": "Pressure keeps rising on that side, so the lung collapses completely and the heart and main vessels are pushed across.",
                "signs": "No air entry on the left and low oxygen come from the collapsed lung. The squashed veins can't return blood to the heart, so blood pressure falls, his heart races and his neck veins swell. The windpipe is pushed to the other side.",
                "linking": "Trapped, rising pressure stops both breathing and blood returning to the heart."
            }
        },
        "advanced": {
            "question": "Explain the pathophysiology of tension pneumothorax and why it causes obstructive shock. Link your answer to his signs.",
            "wordGuide": 200,
            "markingPoints": [
                "A one-way valve lets air enter the pleural space on inspiration but not leave on expiration",
                "Intrapleural pressure rises progressively and becomes positive",
                "The ipsilateral lung collapses completely, causing absent breath sounds and hypoxaemia",
                "Rising pressure causes mediastinal shift towards the opposite side (tracheal deviation is a late sign)",
                "The shift and raised intrathoracic pressure compress and kink the great veins, impairing venous return",
                "Reduced preload lowers stroke volume and cardiac output — obstructive shock, with hypotension and compensatory tachycardia",
                "Impaired venous return raises the JVP (may be absent if hypovolaemic)"
            ],
            "bonusPoints": [
                "The contralateral lung is also compressed, worsening hypoxaemia; tachycardia and hypoxia typically precede tracheal deviation."
            ],
            "modelAnswer": {
                "presentation": "Progressive breathlessness after chest trauma with absent left air entry, hypoxaemia, raised JVP, tachycardia, hypotension and tracheal deviation to the right indicate a left tension pneumothorax.",
                "mechanism": "Injured lung tissue acts as a one-way valve: air enters the pleural space on each inspiration but cannot leave on expiration.",
                "physiology": "Intrapleural pressure rises with each breath until it is positive. The left lung collapses completely and the mediastinum is pushed to the right, compressing the right lung too. Raised intrathoracic pressure and mediastinal shift compress and kink the vena cavae, reducing venous return. Falling preload lowers stroke volume and cardiac output — obstructive shock.",
                "signs": "A collapsed lung gives absent air entry and hypoxaemia. Obstructed venous return distends the neck veins and causes hypotension with compensatory tachycardia. Tracheal deviation away from the affected side is a late sign of mediastinal shift.",
                "linking": "It is the rising pressure — not the collapsed lung alone — that kills, because it stops blood returning to the heart."
            }
        }
    },
    {
        "id": "sa-rs-09",
        "category": "respiratory",
        "title": "A quiet chest in severe asthma",
        "stem": "A 16-year-old with asthma has been struggling to breathe for hours. She is exhausted, can only manage single words, and her chest is now almost silent on auscultation. RR 12, HR 134, SpO₂ 88%.",
        "intro": {
            "question": "Why is a quiet chest and a slowing breathing rate a very worrying sign in someone having an asthma attack?",
            "wordGuide": 100,
            "markingPoints": [
                "Her airways are so narrow that very little air is moving in or out",
                "With little air moving, there is not enough airflow to make a wheeze, so the chest goes quiet",
                "After hours of hard work her breathing muscles are exhausted, so her breathing rate is slowing",
                "Carbon dioxide builds up and oxygen falls, and she may be close to respiratory arrest"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Exhaustion, single words, a near-silent chest and a slowing breathing rate after hours of asthma suggest a life-threatening attack.",
                "mechanism": "Her airways have become so narrow that hardly any air can move through them.",
                "physiology": "A wheeze needs air flowing through narrowed airways. When almost no air moves, the wheeze disappears. Her breathing muscles are tiring after hours of work.",
                "signs": "The chest goes quiet, her breathing rate falls from exhaustion, and oxygen levels drop while carbon dioxide rises. Her heart races to compensate.",
                "linking": "A quiet chest here doesn't mean she's getting better — it means very little air is moving, and she may stop breathing."
            }
        },
        "advanced": {
            "question": "Explain the pathophysiology of life-threatening asthma and why a silent chest and falling respiratory rate indicate imminent respiratory arrest.",
            "wordGuide": 200,
            "markingPoints": [
                "Severe bronchoconstriction, mucosal oedema and mucus plugging critically narrow the airways",
                "Expiratory airflow limitation causes air trapping and dynamic hyperinflation",
                "Hyperinflation flattens the diaphragm and increases the work of breathing",
                "Airflow becomes too low to generate turbulent flow, so wheeze disappears (silent chest)",
                "Prolonged high work of breathing leads to respiratory muscle fatigue and a falling respiratory rate",
                "Alveolar hypoventilation causes rising PaCO₂ and worsening hypoxaemia; a normal or rising CO₂ is ominous",
                "Hypoxaemia and acidosis progress towards respiratory then cardiac arrest"
            ],
            "bonusPoints": [
                "Hyperinflation raises intrathoracic pressure, reducing venous return; pulsus paradoxus may be present, and confusion or drowsiness indicates rising CO₂."
            ],
            "modelAnswer": {
                "presentation": "Exhaustion, single words, a silent chest, a falling respiratory rate, tachycardia and hypoxaemia after prolonged symptoms indicate life-threatening asthma.",
                "mechanism": "Bronchoconstriction, oedema and mucus plugging have narrowed her airways so severely that airflow is critically limited, especially on expiration.",
                "physiology": "Air trapping causes dynamic hyperinflation, flattening the diaphragm and greatly increasing the work of breathing. After hours of this, the respiratory muscles fatigue. As ventilation falls, CO₂ is no longer cleared: early in an attack PaCO₂ is usually low from tachypnoea, so a normal or rising CO₂ signals failure. Hypoxaemia worsens and acidosis develops.",
                "signs": "Airflow is too low to create turbulence, so the wheeze disappears — a silent chest. The falling respiratory rate reflects exhaustion, not improvement. Hypoxaemia and sympathetic drive keep her heart rate high. Raised intrathoracic pressure can reduce venous return, sometimes causing pulsus paradoxus.",
                "linking": "Silence and a slowing rate mean the airways and muscles are failing together — the final stage before respiratory arrest."
            }
        }
    },
    {
        "id": "sa-rs-10",
        "category": "respiratory",
        "title": "Headache and a normal SpO₂ in a smoky house",
        "stem": "A couple were found drowsy at home in winter with an old gas fire running. Both have headaches and nausea, and one is confused. The pulse oximeter reads 99% on both of them.",
        "intro": {
            "question": "How does carbon monoxide starve the body of oxygen, and why might the pulse oximeter still read normal?",
            "wordGuide": 100,
            "markingPoints": [
                "Carbon monoxide sticks to haemoglobin in red blood cells far more strongly than oxygen does",
                "This leaves less haemoglobin free to carry oxygen, so the tissues and brain are starved of oxygen",
                "The brain is very sensitive to low oxygen, causing headache, nausea, drowsiness and confusion",
                "A standard pulse oximeter can't tell haemoglobin carrying carbon monoxide from haemoglobin carrying oxygen, so it can read falsely normal"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Headache, nausea, drowsiness and confusion in two people sharing a home with an old gas fire suggest carbon monoxide poisoning.",
                "mechanism": "Carbon monoxide from the faulty fire has been breathed in and has attached to their red blood cells.",
                "physiology": "It binds to haemoglobin far more strongly than oxygen, so less oxygen can be carried to the tissues.",
                "signs": "The brain is starved of oxygen, causing headache, nausea, drowsiness and confusion. A standard pulse oximeter reads haemoglobin carrying carbon monoxide as if it were carrying oxygen, so it shows a falsely reassuring 99%.",
                "linking": "They are short of oxygen at tissue level even though the monitor looks normal — so the reading can't be trusted here."
            }
        },
        "advanced": {
            "question": "Explain the pathophysiology of carbon monoxide poisoning, including its effect on the oxygen–haemoglobin dissociation curve, and why SpO₂ is unreliable.",
            "wordGuide": 200,
            "markingPoints": [
                "Carbon monoxide binds haemoglobin with around 200–250 times the affinity of oxygen, forming carboxyhaemoglobin (COHb)",
                "This reduces the oxygen-carrying capacity of the blood",
                "CO shifts the oxygen–haemoglobin dissociation curve to the left, so remaining haemoglobin releases oxygen less readily to the tissues",
                "CO also impairs cellular respiration by binding cytochrome oxidase in mitochondria",
                "Tissue hypoxia affects the brain and heart first, causing headache, nausea, confusion and reduced consciousness",
                "Standard two-wavelength pulse oximeters cannot distinguish COHb from oxyhaemoglobin, so SpO₂ is falsely normal",
                "PaO₂ (dissolved oxygen) may also be normal, so hypoxia is at the level of carriage and delivery, not lung gas exchange"
            ],
            "bonusPoints": [
                "CO-oximetry measures COHb; multiple people from one household with similar symptoms is a key clue; delayed neurological effects can occur."
            ],
            "modelAnswer": {
                "presentation": "Headache, nausea, drowsiness and confusion in two people from one home with an old gas fire, with falsely normal SpO₂, indicate carbon monoxide poisoning.",
                "mechanism": "Incomplete combustion produces CO, which is inhaled and binds haemoglobin with roughly 200–250 times the affinity of oxygen, forming carboxyhaemoglobin.",
                "physiology": "Less haemoglobin is available to carry oxygen, reducing oxygen content. CO also shifts the dissociation curve to the left, so the haemoglobin that does carry oxygen releases it less readily to the tissues. At cellular level, CO binds cytochrome oxidase, impairing mitochondrial respiration. Gas exchange in the lungs is normal, so PaO₂ can also look normal.",
                "signs": "The brain and heart, with the highest oxygen demand, are affected first — causing headache, nausea, confusion and reduced consciousness. Two-wavelength pulse oximeters read COHb as oxyhaemoglobin, so SpO₂ shows a falsely reassuring 99%.",
                "linking": "CO causes hypoxia in how oxygen is carried and delivered, not in how it enters the blood — which is exactly why the usual monitoring fails to show it."
            }
        }
    },
    {
        "id": "sa-ne-01",
        "category": "neurological",
        "title": "Weakness down one side",
        "stem": "A 74-year-old man was found by his wife at 08:00 unable to move his right arm and leg. His face droops on the right and his speech is slurred and muddled. He is fully awake. BP 178/96.",
        "intro": {
            "question": "Why does a stroke on one side of the brain cause weakness on the opposite side of the body?",
            "wordGuide": 100,
            "markingPoints": [
                "A stroke happens when the blood supply to part of the brain is blocked or bleeds, so that area is starved of oxygen",
                "The nerve pathways that control movement cross over from one side of the brain to the other side of the body",
                "So damage on the left side of the brain causes weakness on the right side of the body",
                "Speech is usually controlled on the left side of the brain, so left-sided strokes often affect speech as well"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Sudden right-sided weakness, facial droop and muddled speech in an older man suggest a stroke affecting the left side of the brain.",
                "mechanism": "Blood supply to part of his brain has been interrupted, so that area is starved of oxygen and glucose and stops working.",
                "physiology": "The nerves controlling movement cross from one side of the brain to the opposite side of the body.",
                "signs": "Damage on the left therefore causes weakness on his right arm, leg and face. Speech is usually controlled on the left, so his speech is affected too.",
                "linking": "The side of the body affected tells you which side of the brain is in trouble."
            }
        },
        "advanced": {
            "question": "Explain why an occlusion of the left middle cerebral artery produces right-sided weakness and expressive difficulty, and why the deficit is contralateral.",
            "wordGuide": 200,
            "markingPoints": [
                "Ischaemic stroke follows occlusion of a cerebral artery, most often by thrombus or embolus",
                "Neurons deprived of oxygen and glucose fail within minutes; a surrounding penumbra is at risk but potentially salvageable",
                "The middle cerebral artery supplies the lateral cortex, including the motor and sensory strips for the face and arm, and the language areas in the dominant hemisphere",
                "Corticospinal (pyramidal) fibres decussate at the medulla, so motor control is contralateral",
                "Left MCA territory damage therefore causes right facial, arm and leg weakness",
                "Language is left-dominant in most people; involvement of Broca's area impairs expression, Wernicke's area impairs comprehension",
                "The face and arm are affected more than the leg in MCA strokes because of the motor homunculus layout (the leg is supplied by the anterior cerebral artery)"
            ],
            "bonusPoints": [
                "Raised blood pressure is common acutely and may help maintain perfusion of the penumbra; \"found down\" means the last known well time defines the window."
            ],
            "modelAnswer": {
                "presentation": "Acute right hemiparesis, right facial weakness and dysarthric, muddled speech with preserved consciousness fit a left middle cerebral artery territory stroke.",
                "mechanism": "An artery supplying the left lateral cortex has been occluded, usually by thrombus or embolus. Deprived of oxygen and glucose, neurons fail within minutes, with a surrounding penumbra at risk but still salvageable.",
                "physiology": "The MCA supplies the motor and sensory strips serving the face and arm, and the language areas of the dominant hemisphere. Corticospinal fibres decussate in the medulla, so each hemisphere controls the opposite side of the body.",
                "signs": "Left-sided damage therefore produces right-sided weakness, affecting face and arm more than leg, because the leg area lies in anterior cerebral artery territory. Involvement of the left-sided language areas explains his difficulty producing clear, meaningful speech. His raised blood pressure is a common acute response.",
                "linking": "Knowing the artery's territory and where the motor fibres cross lets you predict the pattern of deficit — and read the pattern backwards to the vessel involved."
            }
        }
    },
    {
        "id": "sa-ne-02",
        "category": "neurological",
        "title": "Confused after a fit",
        "stem": "A 28-year-old woman with known epilepsy had a witnessed generalised seizure lasting two minutes. It has stopped. She is now drowsy, confused and doesn't remember what happened. She bit her tongue.",
        "intro": {
            "question": "Why is she drowsy and confused after her seizure has stopped?",
            "wordGuide": 100,
            "markingPoints": [
                "A seizure is a burst of abnormal, excessive electrical activity across the brain",
                "This uses up a huge amount of the brain's energy and oxygen very quickly",
                "Afterwards the brain needs time to recover and restore its normal chemistry (the post-ictal phase)",
                "During that recovery she is drowsy and confused, and won't remember the seizure because memory isn't laid down during it"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Drowsiness, confusion and no memory of a witnessed seizure, with a bitten tongue, describe the post-ictal phase.",
                "mechanism": "A seizure is a sudden burst of abnormal electrical activity spreading across the brain.",
                "physiology": "That activity uses huge amounts of energy and oxygen in a short time and disturbs the brain's normal chemistry.",
                "signs": "Afterwards the brain needs time to recover, so she is drowsy and confused. Memories aren't formed during a seizure, so she can't remember it. Her tongue was bitten by the jaw muscles contracting.",
                "linking": "The confusion isn't a new problem — it's the brain recovering from the electrical storm."
            }
        },
        "advanced": {
            "question": "Explain the pathophysiology of a generalised tonic-clonic seizure and the post-ictal state.",
            "wordGuide": 200,
            "markingPoints": [
                "Seizures arise from an imbalance between excitation (largely glutamate) and inhibition (largely GABA)",
                "A hypersynchronous discharge of neurons spreads through the cortex and across both hemispheres",
                "Loss of consciousness follows involvement of both hemispheres and reticular activating pathways",
                "Sustained motor cortex discharge produces the tonic phase, followed by intermittent inhibition producing the clonic phase",
                "Massive neuronal activity raises cerebral metabolic demand sharply, depleting ATP and glucose, and produces lactate",
                "Post-ictally, neuronal exhaustion, neurotransmitter depletion and active inhibition suppress cortical function, causing drowsiness and confusion",
                "Memory encoding fails during the seizure, so there is amnesia for the event; tongue biting results from involuntary masseter contraction"
            ],
            "bonusPoints": [
                "Transient lactic acidosis is common; autonomic activation can cause tachycardia and hypertension during the seizure."
            ],
            "modelAnswer": {
                "presentation": "A witnessed two-minute generalised seizure followed by drowsiness, confusion, amnesia and tongue biting is a typical tonic-clonic seizure with a post-ictal phase.",
                "mechanism": "Seizures reflect a loss of balance between excitatory glutamatergic and inhibitory GABAergic activity, allowing a hypersynchronous neuronal discharge to spread through the cortex and across both hemispheres.",
                "physiology": "Bilateral hemispheric involvement abolishes consciousness. Sustained discharge to the motor cortex causes the tonic phase; rhythmic inhibition interrupting it produces the clonic phase. Neuronal firing at this rate massively increases cerebral metabolic demand, depleting ATP and glucose and generating lactate.",
                "signs": "Afterwards, exhausted neurons, depleted neurotransmitters and active inhibitory mechanisms suppress cortical function, producing the post-ictal drowsiness and confusion. Because encoding of new memory cannot occur during the discharge, she has no recall. Involuntary masseter contraction caused the tongue bite.",
                "linking": "The post-ictal state is the metabolic and neurochemical bill for the seizure — which is why it improves steadily rather than suddenly."
            }
        }
    },
    {
        "id": "sa-ne-03",
        "category": "neurological",
        "title": "Sweaty, shaky and confused",
        "stem": "A 44-year-old man with diabetes has been unwell and eating very little today. He is pale, sweaty and shaking, and is confused and aggressive. Blood glucose is 2.4 mmol/L.",
        "intro": {
            "question": "Why does a low blood glucose cause both sweating and shaking, and confusion?",
            "wordGuide": 100,
            "markingPoints": [
                "The brain relies almost entirely on glucose for fuel and cannot store it",
                "When glucose falls, brain cells can't work properly, causing confusion and behaviour changes",
                "The body detects the low glucose and releases stress hormones such as adrenaline to raise it",
                "Those hormones cause sweating, shaking, pallor and a fast heart rate"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Sweating, shaking, pallor, confusion and aggression with a glucose of 2.4 mmol/L indicate hypoglycaemia.",
                "mechanism": "He has eaten very little, so his blood glucose has fallen too low.",
                "physiology": "The brain depends almost entirely on glucose and can't store it, so it starts to fail quickly. The body also releases stress hormones to try to raise the glucose.",
                "signs": "The struggling brain causes confusion and out-of-character aggression. The stress hormones cause the sweating, shaking, pallor and fast heart rate.",
                "linking": "His symptoms come from two things at once — a brain short of fuel, and the body's emergency response to fix it."
            }
        },
        "advanced": {
            "question": "Explain the pathophysiology of hypoglycaemia, distinguishing the autonomic and neuroglycopenic features.",
            "wordGuide": 200,
            "markingPoints": [
                "The brain depends almost exclusively on glucose, cannot store it, and relies on a continuous supply across the blood–brain barrier",
                "As glucose falls, counter-regulatory hormones are released — glucagon, then adrenaline, cortisol and growth hormone",
                "Sympathoadrenal activation produces the autonomic features: sweating, tremor, pallor, tachycardia, anxiety and hunger",
                "Neuroglycopenia is the direct effect of glucose deprivation on neurons, causing confusion, altered behaviour, slurred speech, focal deficits and reduced consciousness",
                "Autonomic symptoms usually appear first, but warning can be lost in long-standing diabetes (impaired awareness)",
                "Higher cortical function is affected before brainstem function, so consciousness declines progressively",
                "Prolonged, severe hypoglycaemia can cause seizures and permanent neuronal injury"
            ],
            "bonusPoints": [
                "Hypoglycaemia can mimic stroke with focal signs; behaviour change may be mistaken for intoxication."
            ],
            "modelAnswer": {
                "presentation": "Autonomic features (sweating, tremor, pallor) alongside neuroglycopenic features (confusion, aggression) with a glucose of 2.4 mmol/L indicate significant hypoglycaemia.",
                "mechanism": "Poor intake while unwell has reduced his circulating glucose below what his brain requires.",
                "physiology": "The brain cannot store glucose or use alternative fuels quickly, so function depends on continuous supply. As levels fall, counter-regulatory hormones are released: glucagon first, then adrenaline, cortisol and growth hormone, mobilising glucose and opposing insulin's effects.",
                "signs": "Sympathoadrenal activation causes sweating, tremor, pallor and tachycardia — the warning symptoms. Direct neuronal glucose deprivation, neuroglycopenia, impairs the higher cortical functions first, causing confusion and disinhibited, aggressive behaviour, and can progress to reduced consciousness and seizures.",
                "linking": "One set of signs is the body shouting for help, the other is the brain running out of fuel — and recognising both matters, because the warning signs can be absent in long-standing diabetes."
            }
        }
    },
    {
        "id": "sa-ne-04",
        "category": "neurological",
        "title": "Headache, neck stiffness and a rash",
        "stem": "A 19-year-old student has had a severe headache and fever since this morning. She dislikes the light, her neck is stiff, and there is a dark purple rash on her legs that does not fade when pressed. HR 126, BP 92/60.",
        "intro": {
            "question": "Why does meningitis cause neck stiffness and dislike of light, and why does the rash not fade when pressed?",
            "wordGuide": 100,
            "markingPoints": [
                "Meningitis is inflammation of the membranes covering the brain and spinal cord (the meninges)",
                "Inflamed meninges are painful when stretched, so moving or bending the neck hurts and the muscles resist it",
                "The same irritation makes light painful (photophobia)",
                "In meningococcal infection, bacteria damage blood vessels so blood leaks into the skin; blood outside the vessels can't be pressed away, so the rash doesn't fade"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Fever, severe headache, photophobia, neck stiffness and a non-fading purple rash suggest meningococcal meningitis with septicaemia.",
                "mechanism": "Infection has inflamed the membranes covering her brain and spinal cord, and the bacteria are also in her bloodstream.",
                "physiology": "Inflamed meninges are painful when stretched, and light increases that discomfort.",
                "signs": "Bending the neck stretches the meninges, so it hurts and the muscles resist — neck stiffness. Photophobia comes from the same irritation. Bacteria damage small blood vessels, letting blood leak into the skin, so the rash stays visible when pressed. Her fast pulse and low blood pressure show the infection is affecting her circulation.",
                "linking": "The head signs come from inflamed meninges and the rash from damaged blood vessels — together a serious combination."
            }
        },
        "advanced": {
            "question": "Explain the pathophysiology of meningococcal meningitis with septicaemia and link it to her meningism, non-blanching rash and haemodynamic findings.",
            "wordGuide": 200,
            "markingPoints": [
                "Bacteria reach the subarachnoid space, where the inflammatory response releases cytokines and attracts neutrophils",
                "Meningeal inflammation causes pain on stretching, producing neck stiffness and positive meningeal signs, plus photophobia",
                "Inflammation increases blood–brain barrier permeability, causing cerebral oedema and raised intracranial pressure, contributing to headache and vomiting",
                "In septicaemia, endotoxin (lipopolysaccharide) triggers a systemic inflammatory response",
                "Endothelial injury and activation of coagulation cause microvascular thrombosis and leakage of blood into the skin — a non-blanching petechial or purpuric rash",
                "Vasodilation and capillary leak cause distributive shock: hypotension with compensatory tachycardia",
                "The combination can progress to disseminated intravascular coagulation and multi-organ failure"
            ],
            "bonusPoints": [
                "The rash may begin as sparse petechiae and evolve rapidly; septicaemia without meningitis is possible and can be more rapidly lethal."
            ],
            "modelAnswer": {
                "presentation": "Fever, severe headache, photophobia, neck stiffness, a non-blanching purpuric rash, tachycardia and hypotension indicate meningococcal disease with both meningitis and septicaemia.",
                "mechanism": "Bacteria have invaded the subarachnoid space and the bloodstream. In the subarachnoid space, cytokine release recruits neutrophils and produces intense inflammation.",
                "physiology": "Inflamed meninges are exquisitely sensitive to stretch, and inflammation increases blood–brain barrier permeability, causing oedema and raised intracranial pressure. In the circulation, endotoxin drives a systemic inflammatory response with widespread vasodilation, capillary leak, endothelial injury and activation of coagulation.",
                "signs": "Stretching inflamed meninges causes neck stiffness and headache, and photophobia follows the same irritation. Endothelial damage and microvascular thrombosis allow blood to leak into the skin, so the rash does not blanch. Vasodilation and fluid leak cause distributive shock — hypotension with compensatory tachycardia.",
                "linking": "Her head signs reflect inflammation inside the skull and her rash and shock reflect the same organism damaging blood vessels throughout the body."
            }
        }
    },
    {
        "id": "sa-ne-05",
        "category": "neurological",
        "title": "Flashing lights before a headache",
        "stem": "A 31-year-old woman describes 20 minutes of zig-zag flashing lights in her right visual field, which faded and was followed by a severe throbbing headache on the left with nausea. She has had similar episodes before. Observations are normal.",
        "intro": {
            "question": "Why do some people see visual disturbances before a migraine headache starts?",
            "wordGuide": 100,
            "markingPoints": [
                "A migraine aura is caused by a wave of altered electrical activity spreading slowly across the surface of the brain",
                "It usually starts in the visual area at the back of the brain, so visual symptoms come first",
                "The wave causes a short burst of activity (flashing zig-zags) followed by reduced activity (a blank or dark area)",
                "The headache follows as pain-sensitive structures around the brain are activated"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Zig-zag flashing lights lasting 20 minutes, followed by a one-sided throbbing headache with nausea, is a typical migraine with aura.",
                "mechanism": "A wave of altered electrical activity spreads slowly across the surface of her brain.",
                "physiology": "It usually begins in the visual area at the back of the brain, which is why the first symptoms are visual. The wave briefly excites the area, then leaves it less active.",
                "signs": "The excitement causes flashing zig-zags, and the quiet phase can leave a blank patch. As the process continues, pain-sensitive structures around the brain are activated, causing the throbbing headache and nausea.",
                "linking": "The aura and the headache are two stages of the same process, which is why one follows the other."
            }
        },
        "advanced": {
            "question": "Explain the pathophysiology of migraine with aura, including why the aura precedes the headache and why the visual field affected is opposite to the headache.",
            "wordGuide": 200,
            "markingPoints": [
                "Aura is attributed to cortical spreading depression: a slowly propagating wave of neuronal and glial depolarisation followed by prolonged suppression",
                "The wave typically begins in the occipital cortex and spreads at roughly 3 mm per minute, explaining the gradual march over 20–60 minutes",
                "Initial depolarisation produces positive symptoms (scintillations, zig-zags); the following suppression produces negative symptoms (scotoma)",
                "Visual pathways are crossed: the left occipital cortex processes the right visual field, so left-sided cortical events cause right-field symptoms",
                "Cortical spreading depression is thought to activate the trigeminovascular system",
                "Trigeminal activation releases neuropeptides such as CGRP, causing meningeal vasodilation and neurogenic inflammation, sensitising pain fibres",
                "Central sensitisation explains throbbing pain, photophobia, phonophobia and nausea"
            ],
            "bonusPoints": [
                "Because the cortical wave takes time to trigger trigeminal activation, the aura reliably precedes or overlaps the headache; aura without headache can occur."
            ],
            "modelAnswer": {
                "presentation": "A gradual 20-minute right visual field aura followed by a left-sided throbbing headache with nausea, in a woman with previous identical episodes, describes migraine with aura.",
                "mechanism": "The aura reflects cortical spreading depression — a wave of neuronal and glial depolarisation that moves slowly across the cortex and is followed by prolonged suppression of activity.",
                "physiology": "The wave usually starts occipitally and spreads at around 3 mm per minute, which is why symptoms build gradually rather than instantly. Because visual pathways cross, the left occipital cortex serves the right visual field. The wave is thought to activate the trigeminovascular system, releasing neuropeptides such as CGRP, producing meningeal vasodilation and neurogenic inflammation.",
                "signs": "Depolarisation causes positive visual phenomena — the zig-zag scintillations — and the following suppression can leave a scotoma. Trigeminal activation and central sensitisation then produce the throbbing headache, nausea and light sensitivity.",
                "linking": "One cortical wave explains the timing, the side and the sequence: right-field aura from the left cortex, then a left-sided headache as the pain system is activated."
            }
        }
    },
    {
        "id": "sa-ne-06",
        "category": "neurological",
        "title": "Deteriorating after a head injury",
        "stem": "A 55-year-old man fell down stairs an hour ago and hit his head. He was talking at first, but is now only responding to pain. His right pupil is dilated and sluggish. HR 48, BP 196/104, and his breathing is irregular.",
        "intro": {
            "question": "Why does bleeding inside the skull after a head injury cause the level of consciousness to drop?",
            "wordGuide": 100,
            "markingPoints": [
                "The skull is a rigid box with a fixed space inside it",
                "Bleeding takes up space, and as there is nowhere for it to go, the pressure inside the skull rises",
                "Rising pressure squashes the brain and reduces the blood flow reaching it",
                "A squashed, poorly perfused brain works less well, so his level of consciousness falls"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Talking at first, then dropping to responding only to pain after a head injury, suggests bleeding inside his skull.",
                "mechanism": "The fall has torn a blood vessel inside the skull and blood is collecting there.",
                "physiology": "The skull is a rigid box, so the extra volume has nowhere to go and the pressure inside rises. Higher pressure inside the skull makes it harder for blood to flow into the brain.",
                "signs": "The squashed, poorly supplied brain functions less well, so his consciousness falls. The pressure is also pressing on nerves and the brainstem, which explains the large pupil, slow pulse and irregular breathing.",
                "linking": "A fixed space plus expanding blood means rising pressure — and it's the pressure that harms the brain."
            }
        },
        "advanced": {
            "question": "Explain raised intracranial pressure using the Monro-Kellie doctrine, and link it to his pupil, Cushing's triad and falling GCS.",
            "wordGuide": 200,
            "markingPoints": [
                "Monro-Kellie doctrine: the skull contains a fixed volume of brain, blood and CSF; an increase in one must be offset by a decrease in another",
                "Initially CSF and venous blood are displaced, so pressure rises little (compensation)",
                "Once compensation is exhausted, small further increases in volume cause steep rises in intracranial pressure",
                "Cerebral perfusion pressure = MAP − ICP; rising ICP reduces cerebral perfusion and causes ischaemia, lowering GCS",
                "The Cushing reflex raises blood pressure to maintain perfusion; baroreceptor response to hypertension causes bradycardia, and brainstem compression causes irregular breathing (Cushing's triad)",
                "An expanding supratentorial mass causes uncal herniation, compressing the oculomotor nerve (CN III) and giving an ipsilateral fixed, dilated pupil",
                "Continued herniation compresses the brainstem, causing further deterioration and ultimately respiratory arrest"
            ],
            "bonusPoints": [
                "A lucid interval followed by deterioration is classic for extradural haemorrhage; hypoxia and hypercapnia worsen ICP through cerebral vasodilation."
            ],
            "modelAnswer": {
                "presentation": "A lucid period then deterioration to pain response only, with a dilated sluggish right pupil, bradycardia, hypertension and irregular breathing, indicates a rapidly expanding intracranial haematoma with raised ICP.",
                "mechanism": "The skull holds a fixed volume of brain, blood and CSF. An expanding haematoma must displace something else.",
                "physiology": "CSF and venous blood are displaced first, so pressure initially rises little — this is the lucid interval. Once compensation is exhausted, further bleeding produces steep rises in ICP. Cerebral perfusion pressure equals mean arterial pressure minus ICP, so rising ICP reduces perfusion and causes ischaemia.",
                "signs": "Falling perfusion lowers his GCS. The Cushing reflex raises his blood pressure to defend perfusion, and baroreceptors respond with bradycardia, while brainstem compression makes his breathing irregular. Uncal herniation compresses the right oculomotor nerve, giving the dilated, sluggish right pupil.",
                "linking": "His signs are stages of the same process — compensation, then failing perfusion, then herniation — which is why deterioration accelerates."
            }
        }
    },
    {
        "id": "sa-ne-07",
        "category": "neurological",
        "title": "The worst headache of her life",
        "stem": "A 48-year-old woman developed a severe occipital headache while lifting a box, reaching maximum intensity within seconds. She vomited twice and dislikes the light. Her neck is stiff. GCS 15, BP 168/92.",
        "intro": {
            "question": "Why does a bleed around the brain cause a sudden severe headache with a stiff neck and vomiting?",
            "wordGuide": 100,
            "markingPoints": [
                "A blood vessel on the surface of the brain has burst, and blood spreads into the fluid-filled space around the brain",
                "The membranes around the brain are very sensitive to pain, so the headache starts instantly and is severe",
                "Blood irritates those membranes, causing neck stiffness and dislike of light",
                "The sudden rise in pressure and irritation trigger vomiting"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "A headache reaching full intensity within seconds, with vomiting, photophobia and neck stiffness, suggests bleeding around the brain.",
                "mechanism": "A blood vessel on the brain's surface has ruptured, and blood has spread into the fluid-filled space surrounding the brain.",
                "physiology": "The membranes in that space are richly supplied with pain fibres and are irritated by blood.",
                "signs": "The rupture causes instant, severe pain. Blood irritating the membranes causes neck stiffness and photophobia, in the same way meningitis does. The sudden pressure rise and irritation cause vomiting.",
                "linking": "A headache that peaks in seconds points to something that happened in seconds — a bleed, not a build-up."
            }
        },
        "advanced": {
            "question": "Explain the pathophysiology of subarachnoid haemorrhage and link it to the thunderclap onset, meningism and vomiting.",
            "wordGuide": 200,
            "markingPoints": [
                "Most spontaneous subarachnoid haemorrhage is due to rupture of a berry (saccular) aneurysm, often at arterial branch points on the circle of Willis",
                "Rupture releases arterial blood at pressure into the subarachnoid space, mixing with CSF",
                "The dura and vessels are densely innervated by trigeminal pain fibres, so onset is instantaneous and maximal — thunderclap headache",
                "Blood is a potent meningeal irritant, producing a chemical meningitis: neck stiffness and photophobia",
                "A sudden rise in intracranial pressure reduces cerebral perfusion transiently and can cause brief loss of consciousness",
                "Raised ICP and irritation stimulate the vomiting centre, causing vomiting",
                "Exertion transiently raises arterial pressure, which is why onset is often during straining or exertion"
            ],
            "bonusPoints": [
                "Later complications include vasospasm with delayed ischaemia, hydrocephalus from impaired CSF reabsorption, and rebleeding; hypertension is common acutely."
            ],
            "modelAnswer": {
                "presentation": "An occipital headache peaking within seconds during exertion, with vomiting, photophobia, neck stiffness and preserved GCS, is typical of subarachnoid haemorrhage.",
                "mechanism": "A saccular aneurysm, usually at a branch point on the circle of Willis, has ruptured. Exertion briefly raised arterial pressure, precipitating it.",
                "physiology": "Arterial blood enters the subarachnoid space under pressure and mixes with CSF. The meninges and vessels carry dense trigeminal pain innervation, and blood acts as a chemical irritant. Intracranial pressure rises abruptly, transiently reducing cerebral perfusion.",
                "signs": "Instantaneous stimulation of pain fibres gives a headache that is maximal from the outset. Meningeal irritation by blood causes neck stiffness and photophobia, mimicking meningitis without infection. Raised pressure and irritation stimulate the vomiting centre. Her GCS of 15 does not exclude the diagnosis.",
                "linking": "The speed of onset reflects the mechanism — arterial blood hitting pain-sensitive membranes instantly, rather than an inflammatory process building over hours."
            }
        }
    },
    {
        "id": "sa-ne-08",
        "category": "neurological",
        "title": "Hypotensive after a diving accident",
        "stem": "A 22-year-old man dived into shallow water and struck his head. He cannot move or feel anything below his chest. HR 46, BP 82/48, and his skin is warm and dry with no sweating below the injury.",
        "intro": {
            "question": "Why can a spinal cord injury cause low blood pressure with a slow pulse and warm skin, when blood loss usually causes a fast pulse and cold skin?",
            "wordGuide": 100,
            "markingPoints": [
                "Nerves that keep blood vessels tightened and speed the heart up leave the spinal cord in the chest region",
                "A high spinal injury cuts off those nerve signals below the injury",
                "Blood vessels relax and widen, so blood pressure falls and the skin stays warm and dry",
                "The heart can't speed up in the usual way, so the pulse stays slow instead of rising"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Low blood pressure with a slow pulse and warm, dry skin after a high spinal injury suggests neurogenic shock rather than blood loss.",
                "mechanism": "The injury has cut the nerve pathways that normally keep blood vessels tightened and allow the heart rate to rise.",
                "physiology": "Without those signals, blood vessels below the injury relax and widen, so the blood has more space to fill and the pressure falls.",
                "signs": "Warm, dry skin below the injury shows vessels are widened and sweating is lost. The heart cannot speed up to compensate, so the pulse stays slow.",
                "linking": "In blood loss the body compensates with a fast pulse and cold skin; here the compensation pathway itself is cut off, which is the clue."
            }
        },
        "advanced": {
            "question": "Explain the pathophysiology of neurogenic shock and how you would distinguish it physiologically from hypovolaemic shock.",
            "wordGuide": 200,
            "markingPoints": [
                "Sympathetic outflow leaves the cord from T1–L2; cardiac accelerator fibres arise from T1–T4",
                "A cord injury above T6 interrupts descending sympathetic control below the lesion",
                "Loss of vasomotor tone causes arterial and venous dilation, increasing the size of the vascular compartment",
                "Venous pooling reduces preload, and reduced systemic vascular resistance lowers blood pressure — distributive shock",
                "Unopposed vagal tone, with loss of cardiac accelerator fibres, causes bradycardia instead of compensatory tachycardia",
                "Loss of sympathetic control below the lesion also abolishes vasoconstriction and sweating, so skin is warm, dry and often flushed",
                "Hypovolaemic shock instead shows tachycardia, cool clammy peripheries and prolonged capillary refill — the presence of bradycardia with warm skin is the key distinction"
            ],
            "bonusPoints": [
                "Neurogenic shock and spinal shock are different: spinal shock describes transient loss of reflexes and flaccidity below the lesion; both may coexist, and occult haemorrhage must still be excluded in trauma."
            ],
            "modelAnswer": {
                "presentation": "Hypotension with bradycardia, warm dry skin and a sensorimotor level at the chest after a diving injury indicates neurogenic shock from a high cervical or upper thoracic cord injury.",
                "mechanism": "Sympathetic fibres leave the cord between T1 and L2, with cardiac accelerator fibres from T1–T4. An injury above T6 interrupts descending sympathetic control below the lesion.",
                "physiology": "Loss of vasomotor tone dilates arteries and veins, enlarging the vascular compartment relative to the circulating volume. Venous pooling lowers preload while reduced systemic vascular resistance lowers blood pressure — a distributive shock. With cardiac accelerator fibres cut off, vagal tone is unopposed, so the heart cannot mount a compensatory tachycardia.",
                "signs": "He is hypotensive but bradycardic. Skin below the lesion is warm and dry because vasoconstriction and sweating are lost.",
                "linking": "Hypovolaemia would give tachycardia with cool, clammy skin; here the compensatory pathway is itself disconnected, which is why the picture is the opposite — though bleeding still has to be excluded."
            }
        }
    },
    {
        "id": "sa-ne-09",
        "category": "neurological",
        "title": "A seizure that won't stop",
        "stem": "A 35-year-old woman has been fitting continuously for 12 minutes. She is cyanosed around the lips, SpO₂ 86%, HR 148, temperature 38.4 °C.",
        "intro": {
            "question": "Why is a seizure that carries on for a long time dangerous?",
            "wordGuide": 100,
            "markingPoints": [
                "During a prolonged seizure the brain and muscles use enormous amounts of oxygen and glucose",
                "Normal breathing is disrupted, so oxygen levels fall and carbon dioxide builds up",
                "Muscles working continuously produce acid and heat, so the body becomes acidotic and the temperature rises",
                "If it continues, brain cells start to be damaged from lack of oxygen and energy"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "A seizure lasting more than 10 minutes with cyanosis, low oxygen, a fast pulse and a raised temperature is a medical emergency.",
                "mechanism": "The abnormal electrical activity is continuing rather than stopping on its own.",
                "physiology": "Her brain and muscles are using huge amounts of oxygen and glucose, while her breathing is disrupted, so oxygen falls and carbon dioxide rises. Continuously contracting muscles produce acid and heat.",
                "signs": "She is cyanosed with a low SpO₂, her heart is racing and her temperature is climbing.",
                "linking": "Demand is rising while supply is falling, so the longer it goes on, the more likely the brain is to be damaged."
            }
        },
        "advanced": {
            "question": "Explain why status epilepticus becomes self-sustaining and harmful, and link this to her hypoxaemia, tachycardia and pyrexia.",
            "wordGuide": 200,
            "markingPoints": [
                "Status epilepticus is a failure of the mechanisms that normally terminate a seizure",
                "With prolonged activity, inhibitory GABA-A receptors are internalised while excitatory (NMDA/AMPA) receptors are trafficked to the membrane, so seizures become self-sustaining and harder to stop",
                "Cerebral metabolic demand rises dramatically while ventilation is impaired, causing hypoxaemia and hypercapnia",
                "Sustained muscle activity produces lactic acid, causing a metabolic acidosis, and generates heat, raising core temperature",
                "Massive catecholamine release causes tachycardia and hypertension early",
                "Early in the seizure, cerebral blood flow rises to meet demand; later, autoregulation fails and supply no longer matches demand",
                "The resulting excitotoxic neuronal injury, driven by glutamate and calcium influx, causes lasting damage — so time matters"
            ],
            "bonusPoints": [
                "Later features include hypotension, hypoglycaemia and rhabdomyolysis; convulsive activity may become subtle while electrical seizures continue."
            ],
            "modelAnswer": {
                "presentation": "Twelve minutes of continuous convulsive activity with cyanosis, hypoxaemia, tachycardia and pyrexia constitutes status epilepticus.",
                "mechanism": "The mechanisms that normally terminate a seizure have failed. As activity continues, inhibitory GABA-A receptors are internalised while excitatory NMDA and AMPA receptors move to the membrane, so the seizure becomes self-sustaining and progressively harder to stop.",
                "physiology": "Cerebral metabolic demand rises steeply while effective ventilation is lost, producing hypoxaemia and hypercapnia. Sustained skeletal muscle contraction generates lactic acid and heat. Catecholamine release drives the cardiovascular response. Cerebral blood flow initially rises to meet demand, but autoregulation eventually fails, so supply falls short.",
                "signs": "She is cyanosed with SpO₂ 86% from impaired ventilation, tachycardic from catecholamines and hypoxaemia, and pyrexial from muscle heat production rather than infection.",
                "linking": "Each passing minute makes the seizure harder to stop and the mismatch between demand and supply worse, which is why prolonged seizures cause excitotoxic neuronal injury."
            }
        }
    },
    {
        "id": "sa-ne-10",
        "category": "neurological",
        "title": "A drooping face",
        "stem": "A 52-year-old woman woke with the left side of her face drooping. She cannot close her left eye or wrinkle her forehead on that side. Her arms and legs are normal, her speech is clear, and she has no other symptoms.",
        "intro": {
            "question": "Why does being unable to wrinkle the forehead suggest this is a facial nerve problem rather than a stroke?",
            "wordGuide": 100,
            "markingPoints": [
                "In a stroke, the forehead usually still works, because each side of the forehead receives nerve signals from both sides of the brain",
                "So a stroke typically causes drooping of the lower face only",
                "In a facial nerve problem (Bell's palsy), the whole side of the face is affected, including the forehead and eye closure",
                "Her normal arms, legs and speech also point away from a stroke, but any new facial droop still needs urgent assessment"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "A one-sided facial droop affecting the forehead and eye closure, with normal limbs and speech, suggests a facial nerve palsy rather than a stroke.",
                "mechanism": "The facial nerve on that side isn't working, so every muscle it supplies is weak.",
                "physiology": "The forehead muscles get their instructions from both sides of the brain, but only from one facial nerve.",
                "signs": "A stroke usually spares the forehead, because the other side of the brain can still supply it. Here the forehead and eye closure are affected, which points to the nerve itself.",
                "linking": "Forehead involvement is the key difference — although any new facial weakness still needs urgent assessment."
            }
        },
        "advanced": {
            "question": "Explain the anatomical basis for distinguishing an upper motor neurone from a lower motor neurone facial weakness.",
            "wordGuide": 200,
            "markingPoints": [
                "The facial nerve (CN VII) supplies all the muscles of facial expression on its own side",
                "The facial nucleus has two parts: the upper part (supplying forehead and orbicularis oculi) receives bilateral cortical input; the lower part receives mainly contralateral input",
                "An upper motor neurone lesion (e.g. stroke) therefore spares the forehead, because the unaffected hemisphere still supplies the upper facial nucleus",
                "A lower motor neurone lesion affects the nerve or nucleus itself, so all ipsilateral facial muscles are weak, including the forehead and eye closure",
                "Bell's palsy is an acute lower motor neurone palsy, thought to follow inflammation and oedema of the nerve within the facial canal",
                "Swelling within the narrow bony canal compresses the nerve, impairing conduction",
                "Loss of orbicularis oculi function prevents eye closure, risking corneal exposure; associated features can include altered taste and sensitivity to loud sound"
            ],
            "bonusPoints": [
                "Forehead sparing is a useful rule but not absolute; a stroke must still be considered where onset, other deficits or risk factors suggest it."
            ],
            "modelAnswer": {
                "presentation": "Isolated unilateral facial weakness including the forehead and eye closure, with normal limbs and speech, indicates a lower motor neurone facial palsy.",
                "mechanism": "The facial nerve supplies all the muscles of facial expression on its own side. Its nucleus is divided: the part supplying the forehead and orbicularis oculi receives cortical input from both hemispheres, while the part supplying the lower face receives mainly crossed input.",
                "physiology": "In an upper motor neurone lesion such as a stroke, the intact hemisphere still drives the upper facial nucleus, so forehead movement is preserved and only the lower face droops. In a lower motor neurone lesion, the final common pathway itself is affected, so every muscle it supplies is weak. In Bell's palsy, inflammation and oedema compress the nerve within the narrow facial canal, impairing conduction.",
                "signs": "Her inability to wrinkle the forehead and close the eye localises the lesion to the nerve rather than the cortex. Loss of eye closure threatens the cornea.",
                "linking": "The bilateral cortical supply to the forehead is what makes it the deciding sign — though a new facial droop still warrants urgent assessment."
            }
        }
    },
    {
        "id": "sa-se-01",
        "category": "sepsis",
        "title": "Warm and flushed but shutting down",
        "stem": "A 58-year-old man has had a cough and fever for three days. Today he is confused. He is flushed and warm to touch, HR 122, BP 88/52, RR 26, temperature 38.8 °C.",
        "intro": {
            "question": "Why can someone with sepsis be warm and flushed and still have a dangerously low blood pressure?",
            "wordGuide": 100,
            "markingPoints": [
                "In sepsis the body's response to infection spreads throughout the whole body, not just the infected part",
                "Chemicals released in that response make blood vessels widen everywhere",
                "Widened vessels mean the same amount of blood is filling a much bigger space, so blood pressure falls",
                "Wide vessels near the skin make him look flushed and feel warm, while the heart speeds up to compensate"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Fever, confusion, a fast pulse, fast breathing and low blood pressure with warm, flushed skin suggest sepsis.",
                "mechanism": "A chest infection has triggered a body-wide response rather than staying local.",
                "physiology": "Chemicals released in that response widen blood vessels throughout the body, so the same volume of blood now has to fill a much larger space.",
                "signs": "Blood pressure falls, and his heart speeds up to compensate. Wide skin vessels make him warm and flushed. Poor blood supply to the brain causes the confusion.",
                "linking": "He looks warm because the vessels are wide, and that same widening is exactly why his blood pressure is low."
            }
        },
        "advanced": {
            "question": "Explain the pathophysiology of sepsis and why it produces distributive shock with warm peripheries.",
            "wordGuide": 200,
            "markingPoints": [
                "Pathogen components (e.g. endotoxin) are recognised by pattern recognition receptors, triggering an innate immune response",
                "Release of pro-inflammatory cytokines (TNF-α, IL-1, IL-6) produces a dysregulated, systemic response",
                "Endothelial activation and induction of nitric oxide cause widespread vasodilation, reducing systemic vascular resistance",
                "Increased capillary permeability allows fluid to leak into the interstitium, reducing effective circulating volume",
                "The combination produces distributive shock — hypotension with a normal or high cardiac output early, so peripheries stay warm",
                "Compensatory tachycardia and tachypnoea occur; tachypnoea also compensates for developing metabolic acidosis",
                "Reduced cerebral perfusion and inflammatory effects on the brain cause confusion; progression leads to cold, shut-down peripheries later"
            ],
            "bonusPoints": [
                "Sepsis is defined as life-threatening organ dysfunction caused by a dysregulated host response to infection; myocardial depression can also occur."
            ],
            "modelAnswer": {
                "presentation": "Fever, tachycardia, tachypnoea, hypotension and new confusion with warm, flushed skin, three days into a chest infection, indicate sepsis with distributive shock.",
                "mechanism": "Components of the pathogen are recognised by innate immune receptors, triggering release of pro-inflammatory cytokines such as TNF-α, IL-1 and IL-6. In sepsis this response becomes dysregulated and systemic.",
                "physiology": "Endothelial activation and nitric oxide production cause widespread vasodilation, lowering systemic vascular resistance. Increased capillary permeability lets fluid leak into the tissues, reducing effective circulating volume. Cardiac output is often normal or high early, so the problem is distribution rather than pump failure.",
                "signs": "Low resistance explains hypotension despite warm, flushed peripheries. Tachycardia compensates for falling blood pressure, and tachypnoea reflects both the systemic response and developing metabolic acidosis. Reduced cerebral perfusion and inflammatory effects cause confusion.",
                "linking": "Warm shock is still shock — perfusion pressure is failing even though the skin feels well perfused, and peripheries only shut down later."
            }
        }
    },
    {
        "id": "sa-se-02",
        "category": "sepsis",
        "title": "Shivering with a high temperature",
        "stem": "A 33-year-old woman with a urinary infection is shaking uncontrollably and says she feels freezing cold, yet her temperature is 39.2 °C and her skin is hot.",
        "intro": {
            "question": "Why does someone with a high temperature shiver and feel cold?",
            "wordGuide": 100,
            "markingPoints": [
                "The body has a \"set-point\" temperature that it tries to maintain, like a thermostat",
                "Chemicals released during infection raise that set-point",
                "The body now sees its normal temperature as too cold, so it shivers to make heat and narrows skin vessels to hold heat in",
                "She feels cold even though she is hot, because her body is trying to reach a higher target"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Uncontrollable shivering and feeling cold with a temperature of 39.2 °C is a rigor.",
                "mechanism": "Chemicals released in response to her urinary infection have raised her body's temperature set-point.",
                "physiology": "Her body works like a thermostat. With the target raised, her current temperature is read as too low.",
                "signs": "To close the gap, she shivers to generate heat and her skin vessels narrow to keep heat in, which is why she feels cold despite being hot to touch.",
                "linking": "She isn't cold — her body has simply moved the goalposts and is working hard to reach them."
            }
        },
        "advanced": {
            "question": "Explain the physiology of fever and rigors, including the role of the hypothalamus.",
            "wordGuide": 150,
            "markingPoints": [
                "Exogenous pyrogens (e.g. bacterial components) trigger release of endogenous pyrogens — cytokines such as IL-1, IL-6 and TNF-α",
                "These act on the preoptic area of the anterior hypothalamus",
                "They increase prostaglandin E2 production, which raises the thermoregulatory set-point",
                "The body then behaves as if it is cold: cutaneous vasoconstriction reduces heat loss",
                "Shivering — rapid involuntary muscle contraction — generates heat, producing a rigor",
                "The subjective sensation of cold occurs because core temperature is below the new set-point",
                "When the set-point falls again, the reverse occurs: vasodilation and sweating, so the patient feels hot and flushed"
            ],
            "bonusPoints": [
                "Fever may aid host defence by impairing pathogen replication and enhancing immune function; rigors suggest bacteraemia."
            ],
            "modelAnswer": {
                "presentation": "Rigors with a temperature of 39.2 °C and hot skin, during a urinary infection, show fever with an actively rising set-point.",
                "mechanism": "Bacterial components act as exogenous pyrogens, prompting immune cells to release endogenous pyrogens — cytokines including IL-1, IL-6 and TNF-α.",
                "physiology": "These cytokines act on the preoptic area of the anterior hypothalamus, increasing prostaglandin E2 and raising the thermoregulatory set-point. The hypothalamus compares core temperature with the new, higher target and finds it too low, so it activates heat-conserving and heat-generating responses.",
                "signs": "Cutaneous vasoconstriction reduces heat loss, and shivering — rapid involuntary muscle contraction — generates heat, producing the rigor. She feels cold because her core temperature is below the new set-point, even though she is hot to touch.",
                "linking": "Fever isn't loss of temperature control, it's controlled to a higher target — which is exactly why she shivers on the way up and sweats on the way down."
            }
        }
    },
    {
        "id": "sa-se-03",
        "category": "sepsis",
        "title": "Confused and \"off legs\"",
        "stem": "An 85-year-old woman is brought in by her daughter because she has been confused since yesterday and keeps falling. She has no cough and no pain. Temperature 37.1 °C, HR 96, BP 118/70. She has a urinary infection.",
        "intro": {
            "question": "Why might an older person with an infection be confused and falling rather than have an obvious fever?",
            "wordGuide": 100,
            "markingPoints": [
                "Older people often have a weaker immune response, so they may not mount a fever",
                "The ageing brain is more vulnerable, so infection anywhere in the body can cause confusion (delirium)",
                "Confusion, falls and being \"off legs\" may be the only signs that something is wrong",
                "This means infection can be easily missed if you only look for the classic signs"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "New confusion and falls in an 85-year-old with a urinary infection but no fever is a typical presentation of delirium.",
                "mechanism": "An infection is present, but her body's response to it looks different from a younger person's.",
                "physiology": "With age, the immune response is blunted, so a fever may not develop. The ageing brain has less reserve, so it is easily disturbed by illness elsewhere in the body.",
                "signs": "Her confusion and falls are the way her infection is showing itself, and normal observations do not rule it out.",
                "linking": "In older people, a change in behaviour may be the main sign of infection, so it deserves the same attention as a fever would."
            }
        },
        "advanced": {
            "question": "Explain why older adults with infection often present atypically, and the pathophysiology of delirium.",
            "wordGuide": 200,
            "markingPoints": [
                "Immunosenescence blunts the febrile and inflammatory response, so temperature may be normal or low",
                "Baseline temperature is often lower in older adults, so a \"normal\" reading may represent a relative rise",
                "Reduced physiological reserve means illness presents as functional decline — falls, immobility, reduced intake",
                "Delirium arises from systemic inflammation affecting the brain: cytokines cross a more permeable blood–brain barrier and activate microglia",
                "Neurotransmitter disturbance, particularly reduced cholinergic and altered dopaminergic function, disrupts attention and cognition",
                "Pre-existing cognitive impairment, sensory impairment and multiple conditions increase vulnerability",
                "Delirium is typically acute in onset, fluctuating, and affects attention — distinguishing it from dementia"
            ],
            "bonusPoints": [
                "Hypoactive delirium is more common in older adults and easily missed; delirium is associated with poorer outcomes, so recognising it matters."
            ],
            "modelAnswer": {
                "presentation": "Acute confusion and falls in an 85-year-old with a urinary infection and near-normal observations illustrates atypical presentation with delirium.",
                "mechanism": "Infection is present, but the response to it is altered by age. Immunosenescence blunts cytokine-driven fever, and her lower baseline temperature means 37.1 °C may already represent a relative rise.",
                "physiology": "Systemic inflammation affects the brain: cytokines cross a more permeable blood–brain barrier and activate microglia, while neurotransmitter systems — particularly cholinergic — are disturbed. Attention and cognition, which depend on widespread network function, fail first. Reduced physiological reserve means small insults produce large functional effects.",
                "signs": "Instead of fever and localising symptoms, she presents with acute, fluctuating confusion and falls. Observations that look reassuring do not exclude significant infection.",
                "linking": "In frail older adults, the presentation is filtered through reduced reserve — so new confusion or a loss of function should be treated as a red flag for infection, not as \"just her age\"."
            }
        }
    },
    {
        "id": "sa-se-04",
        "category": "sepsis",
        "title": "A hot, red leg",
        "stem": "A 46-year-old man has a hot, red, swollen and painful left lower leg that has spread over two days from a small cut. The edge of the redness is clearly defined. Temperature 37.9 °C.",
        "intro": {
            "question": "Why does an infected wound become red, hot, swollen and painful?",
            "wordGuide": 100,
            "markingPoints": [
                "Bacteria entering through the cut trigger an immune response in the skin",
                "Blood vessels in the area widen and bring more blood, making the skin red and hot",
                "Vessels also become leaky, so fluid moves into the tissue, causing swelling",
                "Chemicals released and the pressure of the swelling stimulate pain nerves, so it hurts"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "A spreading, hot, red, swollen and painful leg after a small cut suggests a skin infection.",
                "mechanism": "Bacteria have entered through the cut and are multiplying in the skin, triggering an immune response.",
                "physiology": "That response widens local blood vessels and makes them leaky, so more blood and fluid reach the area.",
                "signs": "Increased blood flow makes the skin red and hot. Fluid leaking into the tissue causes swelling. Inflammatory chemicals and the pressure of the swelling stimulate pain nerves. His mild fever shows the response is becoming systemic.",
                "linking": "The four classic signs are all the same process — more blood and fluid arriving to fight the infection."
            }
        },
        "advanced": {
            "question": "Explain the inflammatory process underlying cellulitis and its cardinal signs.",
            "wordGuide": 150,
            "markingPoints": [
                "Breach of the skin barrier allows bacteria, commonly streptococci or staphylococci, to enter the dermis and subcutaneous tissue",
                "Pattern recognition receptors on resident immune cells trigger cytokine and chemokine release",
                "Mediators such as histamine, prostaglandins and bradykinin cause arteriolar vasodilation — producing rubor (redness) and calor (heat)",
                "Increased capillary permeability allows protein-rich exudate into the tissue, causing tumor (swelling)",
                "Bradykinin and prostaglandins sensitise nociceptors, and tissue distension adds pressure, causing dolor (pain)",
                "Chemotaxis recruits neutrophils, which migrate by diapedesis to the site",
                "Systemic cytokine release raises the hypothalamic set-point, causing fever, and may progress to sepsis"
            ],
            "bonusPoints": [
                "A sharply demarcated edge with more superficial involvement suggests erysipelas; lymphatic spread may cause tracking and tender lymph nodes."
            ],
            "modelAnswer": {
                "presentation": "A spreading, sharply demarcated, hot, red, swollen and tender leg after a skin breach, with low-grade fever, describes cellulitis.",
                "mechanism": "A small cut has breached the skin barrier, allowing bacteria — commonly streptococci or staphylococci — into the dermis and subcutaneous tissue.",
                "physiology": "Resident immune cells recognise bacterial components and release cytokines and chemokines. Histamine, prostaglandins and bradykinin dilate local arterioles and increase capillary permeability, while chemotaxis recruits neutrophils that migrate out of the vessels into the tissue.",
                "signs": "Vasodilation and increased blood flow cause redness and heat. Protein-rich exudate entering the tissue causes swelling. Bradykinin and prostaglandins sensitise pain receptors, and distension adds to the pain. Cytokines reaching the circulation raise the hypothalamic set-point, causing his fever.",
                "linking": "Redness, heat, swelling and pain are the visible consequences of increased flow and permeability — and fever signals that the response is no longer confined to the leg."
            }
        }
    },
    {
        "id": "sa-se-05",
        "category": "sepsis",
        "title": "A high lactate",
        "stem": "A 62-year-old woman with abdominal sepsis has a lactate of 5.6 mmol/L. HR 128, BP 86/54, RR 28. Her hands are cool and her capillary refill is 4 seconds.",
        "intro": {
            "question": "Why does the lactate rise when someone is severely unwell with sepsis?",
            "wordGuide": 100,
            "markingPoints": [
                "Cells normally make energy using oxygen",
                "In sepsis, not enough oxygen reaches the tissues because blood pressure and blood flow are poor",
                "Without enough oxygen, cells switch to a back-up way of making energy that produces lactate",
                "Lactate builds up in the blood, so a high level is a warning sign that tissues aren't getting enough oxygen"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "A lactate of 5.6 mmol/L with low blood pressure, a fast pulse and cool, slow-refilling hands shows poorly perfused tissues.",
                "mechanism": "Sepsis has reduced the blood pressure and the flow of blood reaching her tissues.",
                "physiology": "Cells normally use oxygen to make energy. When oxygen delivery falls, they switch to a back-up process that produces lactate as a by-product.",
                "signs": "Lactate accumulates in her blood. Her cool hands and slow capillary refill show that blood is being diverted away from the skin.",
                "linking": "A rising lactate is a signal that the tissues are not getting the oxygen they need, which is why it's taken so seriously."
            }
        },
        "advanced": {
            "question": "Explain the mechanisms that raise lactate in sepsis, including causes other than tissue hypoxia.",
            "wordGuide": 200,
            "markingPoints": [
                "Normally pyruvate from glycolysis enters the mitochondria for aerobic metabolism",
                "When oxygen delivery is inadequate, pyruvate is converted to lactate to regenerate NAD⁺ and allow glycolysis to continue (anaerobic metabolism)",
                "In sepsis, hypotension, microcirculatory dysfunction and microthrombi impair oxygen delivery despite a normal or high cardiac output",
                "Mitochondrial dysfunction (\"cytopathic hypoxia\") means cells cannot use oxygen effectively even when it is delivered",
                "Catecholamine-driven stimulation increases glycolysis and lactate production independent of hypoxia",
                "Reduced hepatic clearance in shock and liver hypoperfusion raises lactate further",
                "Lactate accumulation contributes to metabolic acidosis, driving compensatory tachypnoea; the level correlates with severity and outcome"
            ],
            "bonusPoints": [
                "Lactate may remain raised after blood pressure improves, so trends matter more than single values."
            ],
            "modelAnswer": {
                "presentation": "A lactate of 5.6 mmol/L with hypotension, tachycardia, tachypnoea, cool peripheries and delayed capillary refill indicates significant tissue hypoperfusion in abdominal sepsis.",
                "mechanism": "Glycolysis produces pyruvate, which normally enters the mitochondria for aerobic metabolism. When that pathway cannot keep up, pyruvate is converted to lactate, regenerating NAD⁺ so glycolysis can continue.",
                "physiology": "In sepsis several mechanisms act together. Hypotension, microcirculatory dysfunction and microthrombi impair oxygen delivery even when cardiac output is normal or high. Mitochondrial dysfunction limits oxygen use at cellular level. Catecholamine release accelerates glycolysis, producing lactate independently of hypoxia. Hepatic hypoperfusion reduces lactate clearance.",
                "signs": "Lactate accumulates, contributing to a metabolic acidosis that drives her tachypnoea. Peripheral vasoconstriction produces cool hands and delayed capillary refill.",
                "linking": "A raised lactate in sepsis is not simply \"not enough oxygen\" — it reflects delivery, use and clearance all failing together, which is why the trend is such a useful marker of severity."
            }
        }
    },
    {
        "id": "sa-se-06",
        "category": "sepsis",
        "title": "Cold and shut down",
        "stem": "An 80-year-old man with sepsis has deteriorated. He is now mottled and cold to the knees, HR 132 and thready, BP 72/40 despite fluid given in hospital, and he has passed no urine for eight hours.",
        "intro": {
            "question": "Why do the hands and feet become cold and mottled as sepsis gets worse, and why does the urine stop?",
            "wordGuide": 100,
            "markingPoints": [
                "As blood pressure falls further, the body tries to protect the vital organs",
                "Blood vessels in the skin and limbs clamp down so blood is sent to the brain and heart instead",
                "With less blood reaching the skin, it becomes cold, pale and mottled",
                "The kidneys also receive less blood, so they make little or no urine"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Mottled, cold limbs, a thready fast pulse, very low blood pressure and no urine show sepsis progressing to shock.",
                "mechanism": "His blood pressure has fallen beyond what his body can compensate for.",
                "physiology": "To protect the brain and heart, the body narrows blood vessels in the skin, limbs and less essential organs, sending the remaining blood to where it matters most.",
                "signs": "The skin becomes cold and mottled as its blood supply is sacrificed. The kidneys also lose blood flow, so urine production stops. His pulse is fast but weak because each beat pumps very little.",
                "linking": "Cold, mottled skin and no urine are signs the body is rationing blood flow — a late and serious stage."
            }
        },
        "advanced": {
            "question": "Explain the progression from warm distributive shock to cold, decompensated septic shock, and link it to his mottling and anuria.",
            "wordGuide": 200,
            "markingPoints": [
                "Early sepsis produces vasodilation with normal or increased cardiac output — warm, flushed peripheries",
                "Ongoing capillary leak reduces effective circulating volume, and septic cardiomyopathy can depress myocardial function",
                "As compensation fails, intense sympathetic activation causes peripheral vasoconstriction, redistributing flow to brain and heart",
                "Reduced stroke volume with vasoconstriction produces a thready pulse and cold, mottled skin",
                "Microcirculatory failure — microthrombi, endothelial injury, impaired capillary recruitment — means some capillary beds are bypassed entirely",
                "Renal hypoperfusion reduces glomerular filtration; sustained hypoperfusion causes acute kidney injury and oliguria or anuria",
                "Refractory hypotension despite fluid resuscitation defines decompensation, with progressive multi-organ dysfunction"
            ],
            "bonusPoints": [
                "Mottling extending up the limb is associated with worse outcomes; anaerobic metabolism worsens acidosis, further depressing myocardial function."
            ],
            "modelAnswer": {
                "presentation": "Mottling to the knees, a thready tachycardia, hypotension despite fluid and anuria indicate decompensated septic shock.",
                "mechanism": "Early sepsis caused vasodilation with preserved cardiac output. Continued capillary leak has reduced effective circulating volume, and septic cardiomyopathy may have depressed contractility.",
                "physiology": "As compensation fails, intense sympathetic activation constricts peripheral vessels to redirect flow to the brain and heart. At the same time the microcirculation fails: endothelial injury and microthrombi mean some capillary beds are bypassed, so tissues remain hypoxic even where flow exists. Renal perfusion pressure falls below the level needed for filtration.",
                "signs": "Vasoconstriction with a low stroke volume produces cold, mottled skin and a thready pulse. Loss of glomerular filtration causes anuria and acute kidney injury. Hypotension persisting despite fluid marks decompensation.",
                "linking": "The shift from warm to cold marks the point where compensation has been exhausted, and the failing organs — skin, then kidneys — show the order in which flow is being sacrificed."
            }
        }
    },
    {
        "id": "sa-se-07",
        "category": "sepsis",
        "title": "Rapidly unwell without a spleen",
        "stem": "A 38-year-old woman had her spleen removed after a road traffic collision two years ago. She became unwell this morning with fever and vomiting and has deteriorated within hours. Temperature 39.6 °C, HR 130, BP 84/50.",
        "intro": {
            "question": "Why can an infection become severe so quickly in someone who has had their spleen removed?",
            "wordGuide": 100,
            "markingPoints": [
                "The spleen filters the blood and helps remove certain bacteria",
                "It is particularly important against bacteria with a protective outer capsule",
                "Without a spleen, these bacteria are cleared much more slowly and can multiply rapidly in the blood",
                "Infection can therefore become overwhelming within hours rather than days"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Fever, vomiting and rapid deterioration to hypotension within hours, in someone without a spleen, suggests overwhelming infection.",
                "mechanism": "Bacteria have entered her bloodstream and are multiplying quickly.",
                "physiology": "The spleen normally filters blood and removes bacteria, especially those with a protective capsule that makes them hard for the immune system to handle.",
                "signs": "Without it, those bacteria are cleared far more slowly, so numbers rise rapidly. Her high temperature, fast pulse and low blood pressure show the infection is already affecting her whole body.",
                "linking": "The missing spleen means she loses the early filtering step, which is why she can go from well to critically unwell in hours."
            }
        },
        "advanced": {
            "question": "Explain the immunological basis of overwhelming post-splenectomy infection.",
            "wordGuide": 150,
            "markingPoints": [
                "The spleen filters blood, removing opsonised bacteria and damaged cells via splenic macrophages",
                "It is the main site for clearing encapsulated organisms, e.g. Streptococcus pneumoniae, Neisseria meningitidis, Haemophilus influenzae type b",
                "Polysaccharide capsules resist phagocytosis unless opsonised by antibody and complement",
                "The spleen houses marginal zone B cells that generate rapid antibody responses to polysaccharide antigens",
                "Asplenia reduces both filtration and this early antibody response, so bacteraemia escalates rapidly",
                "Progression to septic shock can occur within hours, with a high mortality",
                "Any fever in an asplenic patient must therefore be treated as potentially life-threatening"
            ],
            "bonusPoints": [
                "Functional asplenia (e.g. sickle cell disease) carries the same risk; vaccination reduces but does not remove it."
            ],
            "modelAnswer": {
                "presentation": "Fever, vomiting, tachycardia and hypotension developing within hours in an asplenic patient indicate possible overwhelming post-splenectomy infection.",
                "mechanism": "Bacteria have reached the bloodstream. Normally the spleen would filter them out early.",
                "physiology": "Splenic macrophages remove opsonised organisms from the circulation, and the spleen is the principal site for clearing encapsulated bacteria such as pneumococcus, meningococcus and Haemophilus influenzae type b. Their polysaccharide capsules resist phagocytosis unless coated with antibody and complement, and the spleen's marginal zone B cells generate exactly this rapid antipolysaccharide response. Without a spleen, both the filtration step and the early antibody response are lost.",
                "signs": "Bacterial numbers rise unchecked, so the systemic inflammatory response and shock develop over hours rather than days — explaining her rapid decline.",
                "linking": "Asplenia removes the immune system's early-warning filter, which is why any fever in these patients is treated as a time-critical emergency."
            }
        }
    },
    {
        "id": "sa-se-08",
        "category": "sepsis",
        "title": "Pain out of proportion",
        "stem": "A 55-year-old man has a swollen, tender right thigh two days after a minor graze. The skin looks dusky in places, the pain is far worse than the appearance suggests, and he is systemically unwell: HR 124, BP 96/58, temperature 38.7 °C.",
        "intro": {
            "question": "Why is pain that seems far worse than the skin looks a warning sign in a limb infection?",
            "wordGuide": 100,
            "markingPoints": [
                "Some infections spread in the tissue layers deep under the skin rather than in the skin itself",
                "The damage is therefore much greater than the surface appearance suggests",
                "The infection destroys tissue and nerves, which causes severe pain early on",
                "This type of infection spreads very quickly and makes people systemically unwell, so it must be recognised early"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Severe pain out of keeping with the skin's appearance, dusky patches and systemic illness after a minor graze is a warning picture.",
                "mechanism": "The infection is spreading in the tissue layers beneath the skin, not just within it.",
                "physiology": "Because the damage is deep, the skin can look relatively unremarkable while extensive tissue is being destroyed underneath.",
                "signs": "Destruction of tissue and nerves causes pain far worse than expected. Dusky skin shows the blood supply is being lost. His fast pulse, low-ish blood pressure and fever show the infection is affecting his whole body.",
                "linking": "When the pain doesn't match the appearance, it suggests the problem is deeper than it looks — and that needs urgent attention."
            }
        },
        "advanced": {
            "question": "Explain the pathophysiology of necrotising soft tissue infection and why pain out of proportion, dusky skin and systemic toxicity occur.",
            "wordGuide": 200,
            "markingPoints": [
                "Bacteria enter through a breach and spread along fascial planes, where there is little resistance to spread",
                "Bacterial enzymes and toxins destroy fascia, fat and connective tissue, and spread is rapid",
                "Thrombosis of perforating vessels causes ischaemia and necrosis of overlying skin — dusky discolouration, later blistering or crepitus",
                "Early on, deep tissue destruction occurs while the skin still looks relatively normal, so pain is out of proportion to appearance",
                "Progressive destruction of cutaneous nerves may later cause anaesthesia over the area",
                "Toxin release (including superantigens in streptococcal infection) drives massive cytokine release and systemic toxicity",
                "The result is rapidly progressive sepsis and shock, with high mortality if not recognised early"
            ],
            "bonusPoints": [
                "Risk factors include diabetes, immunosuppression and peripheral vascular disease; the rate of progression is a key clue."
            ],
            "modelAnswer": {
                "presentation": "Severe pain out of proportion to appearance, dusky skin and systemic toxicity after a minor graze are the classic warning features of a necrotising soft tissue infection.",
                "mechanism": "Bacteria have entered through the graze and spread along fascial planes, which offer little resistance and poor barrier function.",
                "physiology": "Bacterial enzymes and toxins destroy fascia, fat and connective tissue rapidly. Thrombosis of the perforating vessels that supply the skin produces ischaemia, so the overlying skin becomes dusky and may blister. Because the destruction begins deep, tissue damage far exceeds what is visible, producing pain out of proportion. Toxins, including streptococcal superantigens, trigger massive non-specific T-cell activation and cytokine release.",
                "signs": "Severe early pain, dusky discolouration and rapid systemic deterioration with tachycardia, fever and falling blood pressure all follow. Later, destruction of cutaneous nerves can paradoxically reduce sensation.",
                "linking": "The mismatch between how bad he feels and how the skin looks is the diagnostic clue, because the disease starts beneath what you can see."
            }
        }
    },
    {
        "id": "sa-se-09",
        "category": "sepsis",
        "title": "Bleeding and clotting at the same time",
        "stem": "A 67-year-old woman with severe sepsis is oozing from her cannula sites and has widespread bruising, yet her fingertips are dusky and cold. Her platelet count is low and her clotting times are prolonged.",
        "intro": {
            "question": "How can someone with severe sepsis be bleeding and forming clots at the same time?",
            "wordGuide": 100,
            "markingPoints": [
                "Severe infection activates the body's clotting system throughout the blood vessels",
                "Tiny clots form in the small vessels, blocking blood flow, which is why the fingertips are dusky and cold",
                "Forming all those clots uses up the platelets and clotting factors",
                "With those used up, the blood can no longer clot properly where it needs to, so she bleeds and bruises easily"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Oozing from cannula sites and bruising alongside dusky, cold fingertips in severe sepsis suggests clotting and bleeding happening together.",
                "mechanism": "The severe infection has switched on clotting throughout her blood vessels rather than at one site.",
                "physiology": "Tiny clots form in small vessels all over the body, and making them uses up her platelets and clotting factors faster than she can replace them.",
                "signs": "Blocked small vessels reduce blood flow to the fingertips, making them dusky and cold. Depleted platelets and clotting factors mean she bleeds from puncture sites and bruises easily.",
                "linking": "The bleeding is a consequence of the clotting, because the clotting has consumed the very things needed to stop bleeding."
            }
        },
        "advanced": {
            "question": "Explain the pathophysiology of disseminated intravascular coagulation in sepsis and link it to her bleeding and ischaemic signs.",
            "wordGuide": 200,
            "markingPoints": [
                "Inflammatory cytokines and endotoxin induce tissue factor expression on monocytes and endothelium",
                "This activates the coagulation cascade systemically rather than locally",
                "Widespread thrombin generation produces fibrin deposition and microthrombi throughout the microcirculation",
                "Microthrombi impair perfusion, causing tissue ischaemia — dusky, cold digits and contributing to organ dysfunction",
                "Natural anticoagulant pathways (antithrombin, protein C) are depleted and impaired, so coagulation is unchecked",
                "Ongoing consumption depletes platelets and clotting factors (consumptive coagulopathy), prolonging clotting times",
                "Secondary fibrinolysis further degrades clot, so bleeding occurs from puncture sites and into the skin"
            ],
            "bonusPoints": [
                "Red cells can be sheared as they pass through fibrin strands, causing haemolysis; DIC is a marker of severity rather than a separate disease."
            ],
            "modelAnswer": {
                "presentation": "Oozing cannula sites, widespread bruising, dusky cold digits, thrombocytopenia and prolonged clotting times in severe sepsis indicate disseminated intravascular coagulation.",
                "mechanism": "Cytokines and endotoxin induce tissue factor on monocytes and endothelium, activating the coagulation cascade throughout the circulation rather than at a single site of injury.",
                "physiology": "Widespread thrombin generation deposits fibrin in the microcirculation. At the same time, natural anticoagulant systems such as antithrombin and activated protein C are consumed and impaired, so there is little to restrain it. Continuous clot formation consumes platelets and clotting factors faster than they can be replaced, and secondary fibrinolysis breaks down the clot that does form.",
                "signs": "Microthrombi obstruct small vessels, causing ischaemia in the fingertips and contributing to organ dysfunction. Consumption of platelets and factors prolongs clotting times and causes oozing and bruising.",
                "linking": "Clotting and bleeding aren't contradictory here — the bleeding is caused by the clotting, once the body's clotting resources have been used up."
            }
        }
    },
    {
        "id": "sa-se-10",
        "category": "sepsis",
        "title": "Fevers, a murmur and odd marks on the fingers",
        "stem": "A 41-year-old man has had night sweats and fevers on and off for three weeks. You hear a murmur that his GP records did not mention, and there are small, dark splinter-like marks under a few fingernails. He has a history of injecting drug use.",
        "intro": {
            "question": "Why can an infection on a heart valve cause fevers over weeks and marks under the fingernails?",
            "wordGuide": 100,
            "markingPoints": [
                "Bacteria can settle on a heart valve and grow there, forming an infected clump",
                "Small amounts of bacteria are released into the blood over time, causing repeated fevers and night sweats",
                "Small pieces of the clump can break off and travel in the blood",
                "When they lodge in tiny blood vessels, such as those under the fingernails, they cause the small dark marks"
            ],
            "bonusPoints": [],
            "modelAnswer": {
                "presentation": "Weeks of fevers and night sweats, a new murmur and splinter marks under the nails suggest infection on a heart valve.",
                "mechanism": "Bacteria have settled on a valve and formed an infected growth there.",
                "physiology": "That growth releases bacteria into the bloodstream intermittently, and pieces of it can break off and travel wherever the blood takes them.",
                "signs": "Intermittent release of bacteria causes recurring fevers and night sweats. Damage to the valve causes the new murmur. Fragments lodging in tiny vessels under the nails cause the splinter-like marks.",
                "linking": "A valve infection keeps seeding the bloodstream, which is why the illness drags on for weeks and shows up in places far from the heart."
            }
        },
        "advanced": {
            "question": "Explain the pathophysiology of infective endocarditis and link it to his prolonged fever, new murmur and peripheral signs.",
            "wordGuide": 200,
            "markingPoints": [
                "Endothelial injury on a valve allows platelet and fibrin deposition, forming a sterile thrombus",
                "Bacteraemia, e.g. from injecting drug use, allows organisms to adhere to and colonise that thrombus",
                "Bacteria multiply within the vegetation, protected from immune cells and poorly penetrated by host defences",
                "Intermittent release of organisms into the bloodstream produces persistent or recurring fever, sweats and malaise",
                "Progressive valve destruction or regurgitation produces a new or changed murmur and can lead to heart failure",
                "Fragments embolise: to the lungs from right-sided (often tricuspid) lesions in injecting drug use, and systemically from left-sided lesions",
                "Microemboli and immune complex deposition cause peripheral signs — splinter haemorrhages, Janeway lesions, Osler's nodes, and haematuria from glomerular involvement"
            ],
            "bonusPoints": [
                "Right-sided endocarditis is typical in injecting drug use and may present with recurrent chest infections from septic pulmonary emboli."
            ],
            "modelAnswer": {
                "presentation": "Three weeks of fevers and night sweats, a new murmur and splinter haemorrhages in a man who injects drugs strongly suggest infective endocarditis.",
                "mechanism": "Minor endothelial injury on a valve allows platelets and fibrin to deposit, forming a sterile thrombus. Bacteria entering the blood adhere to and colonise it, creating a vegetation.",
                "physiology": "Within the vegetation, bacteria are shielded from immune cells and multiply. Organisms are shed into the blood intermittently, while the vegetation itself progressively damages the valve and can shed fragments downstream.",
                "signs": "Intermittent bacteraemia produces prolonged, relapsing fever, sweats and malaise. Valve damage causes the new murmur. Small emboli and immune complex deposition produce splinter haemorrhages and similar peripheral signs; right-sided lesions embolise to the lungs, left-sided ones systemically.",
                "linking": "A protected reservoir of bacteria on a valve explains all three elements — the long fever, the changing murmur and the distant signs in the fingers."
            }
        }
    }
];
