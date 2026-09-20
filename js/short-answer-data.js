/* ==================== SHORT ANSWER PRACTICE — CASE DATA ====================
 * Used by: short-answer.html
 * Every case has one patient story and two levels (intro / advanced), each with
 * its own question, word guide, marking points, bonus points and model answer.
 * All content is written for Paramind and clinically checked by Mark before use.
 * Content policy: no drug names, doses, treatment or management.
 */
var SHORT_ANSWER_CATEGORIES = [
    { id: 'cardiovascular', name: 'Cardiovascular', icon: 'bi-heart-pulse', colour: '#DC3545' }
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
    }
];
