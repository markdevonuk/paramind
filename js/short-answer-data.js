/* ==================== SHORT ANSWER PRACTICE — CASE DATA ====================
 * Used by: short-answer.html
 * Every case has one patient story and two levels (intro / advanced), each with
 * its own question, word guide, marking points, bonus points and model answer.
 * All content is written for Paramind and clinically checked by Mark before use.
 * Content policy: no drug names, doses, treatment or management.
 */
var SHORT_ANSWER_CATEGORIES = [
    { id: 'cardiovascular', name: 'Cardiovascular', icon: 'bi-heart-pulse', colour: '#DC3545' },
    { id: 'respiratory',    name: 'Respiratory',    icon: 'bi-lungs',      colour: '#0DCAF0' }
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
    }
];
