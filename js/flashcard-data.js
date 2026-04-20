/* ============================================================
   PARAMIND — FLASH CARD DATA
   js/flashcard-data.js  |  v2.0

   All deck definitions and card content.
   Loaded by flashcards.html before the page script.

   Content rule: NO drug doses, treatment protocols, or calculations.
   All clinical content reflects UK prehospital practice.
   Refer to JRCALC for all clinical guidance.
============================================================ */

var FLASHCARD_DECKS = [

    {
        id: 'cardiovascular',
        name: 'Cardiovascular A&P',
        icon: 'bi-heart-pulse',
        iconColour: '#ef4444',
        iconBg: '#fef2f2',
        pro: false,
        cards: [
            {
                id: 'cv-01',
                front: 'Which chamber of the heart receives deoxygenated blood returning from the body?',
                options: ['Left atrium', 'Right atrium', 'Left ventricle', 'Right ventricle'],
                correct: 1,
                explanation: 'Think of the right atrium as the heart\'s arrivals lounge. All the tired, deoxygenated blood pours in through the superior and inferior vena cavae before heading off to the lungs for a fresh oxygen top-up.',
                hint: ''
            },
            {
                id: 'cv-02',
                front: 'What is the function of the mitral valve?',
                options: ['Prevents backflow from the right ventricle into the right atrium', 'Prevents backflow from the left ventricle into the left atrium', 'Opens during diastole to allow blood into the aorta', 'Separates the left and right ventricles'],
                correct: 1,
                explanation: 'When the left ventricle contracts, pressure shoots up fast. The mitral valve slams shut to make sure all that blood goes forward into the aorta — not backwards where it came from. It has two leaflets held in place by tiny tendinous cords, a bit like a parachute with guide ropes stopping it from inverting.',
                hint: ''
            },
            {
                id: 'cv-03',
                front: 'What is the role of the sinoatrial (SA) node?',
                options: ['It delays the electrical impulse between atria and ventricles', 'It distributes the impulse through the ventricular walls', 'It generates the electrical impulse that starts every heartbeat', 'It receives blood from the pulmonary veins'],
                correct: 2,
                explanation: 'Tucked into the wall of the right atrium, the SA node fires spontaneously 60–100 times a minute without being told to. Every heartbeat you\'ve ever had started here. The signal ripples out across both atria like a stone dropped in water, before reaching the AV node on its way to the ventricles.',
                hint: ''
            },
            {
                id: 'cv-04',
                front: 'Cardiac output is calculated as:',
                options: ['Stroke volume ÷ heart rate', 'Heart rate + stroke volume', 'Heart rate × stroke volume', 'Blood pressure × heart rate'],
                correct: 2,
                explanation: 'A typical resting adult pumps around 70 beats per minute, with about 70 ml going out each beat — that\'s roughly 5 litres a minute. When you\'re running a cardiac arrest, understanding cardiac output helps you grasp why CPR quality matters so much — poor compressions mean poor output.',
                hint: ''
            },
            {
                id: 'cv-05',
                front: 'What is the normal resting heart rate range for an adult?',
                options: ['40–80 bpm', '60–100 bpm', '50–90 bpm', '70–110 bpm'],
                correct: 1,
                explanation: 'Below 60 is bradycardia, above 100 is tachycardia — but context is everything. A fit cyclist with a resting rate of 48 is perfectly healthy. A frightened patient with a rate of 105 may just be anxious. The number only makes sense alongside everything else you\'re seeing.',
                hint: ''
            },
            {
                id: 'cv-06',
                front: 'What does the QRS complex on an ECG represent?',
                options: ['Atrial depolarisation', 'Ventricular repolarisation', 'The AV node delay', 'Ventricular depolarisation'],
                correct: 3,
                explanation: 'The big sharp spike — it\'s the moment both ventricles receive the electrical instruction to squeeze. A normal QRS is narrow and sharp — if it\'s wide and bizarre, something has gone wrong with how the signal is spreading through the ventricles.',
                hint: ''
            },
            {
                id: 'cv-07',
                front: 'What is the pericardium?',
                options: ['The inner lining of the heart chambers', 'The muscular layer of the heart wall', 'A tough double-layered sac surrounding the heart', 'The fibrous skeleton separating the valves'],
                correct: 2,
                explanation: 'The pericardium is like a snug, protective jacket around the heart. A small amount of fluid sits between the two layers to reduce friction. Problems start when fluid accumulates faster than the rigid outer layer can stretch — which is cardiac tamponade.',
                hint: ''
            },
            {
                id: 'cv-08',
                front: 'What is stroke volume?',
                options: ['The total blood pumped per minute', 'The volume ejected from the left ventricle per beat', 'The pressure generated during systole', 'The volume remaining in the ventricle after contraction'],
                correct: 1,
                explanation: 'Every time the heart beats, it doesn\'t empty completely — it ejects a portion of the blood it contains. That portion is the stroke volume. It goes up during exercise, it drops when the heart is failing or when the patient is hypovolaemic.',
                hint: ''
            },
            {
                id: 'cv-09',
                front: 'What is preload?',
                options: ['The resistance the ventricle pumps against', 'The force of myocardial contraction', 'How full the ventricle is just before it contracts', 'The pressure in the aorta during diastole'],
                correct: 2,
                explanation: 'Imagine stretching an elastic band before you let it go — the more you stretch it, the further it flies. The heart works the same way. The more blood that fills the ventricle during diastole, the harder it snaps back. This is the Frank–Starling mechanism in action.',
                hint: ''
            },
            {
                id: 'cv-10',
                front: 'What is afterload?',
                options: ['How full the ventricle is at end-diastole', 'The heart rate response to exercise', 'The volume of blood in the venous system', 'The resistance the ventricle must overcome to eject blood'],
                correct: 3,
                explanation: 'Think of afterload like the pressure you\'d need to squeeze toothpaste against a blocked nozzle — the higher the resistance, the harder you have to squeeze. In a patient with severe hypertension, the left ventricle is constantly working against high resistance.',
                hint: ''
            },
            {
                id: 'cv-11',
                front: 'What is the role of the AV node?',
                options: ['It initiates the heartbeat spontaneously', 'It distributes the impulse through the Purkinje fibres', 'It delays the electrical impulse before passing it to the ventricles', 'It separates oxygenated and deoxygenated blood'],
                correct: 2,
                explanation: 'That pause at the AV node — about a tenth of a second — gives the atria time to finish contracting and push their blood into the ventricles before the ventricles fire. Without that delay, everything would contract at once and filling would be inefficient.',
                hint: ''
            },
            {
                id: 'cv-12',
                front: 'What is the aorta?',
                options: ['The artery supplying the right ventricle', 'The vein returning blood from the lungs', 'The largest artery, carrying oxygenated blood from the left ventricle', 'The vessel connecting the SA node to the ventricles'],
                correct: 2,
                explanation: 'The aorta leaves the left ventricle, sweeps upward and over in a great arch — giving off branches to the head and arms — then runs down through the chest and abdomen before splitting into the arteries supplying the legs.',
                hint: ''
            },
            {
                id: 'cv-13',
                front: 'What happens during systole?',
                options: ['The ventricles relax and fill with blood', 'The mitral and tricuspid valves open', 'The aortic and pulmonary valves close', 'The ventricles contract and eject blood'],
                correct: 3,
                explanation: 'Systole is the working phase — both ventricles fire simultaneously, the AV valves snap shut (that\'s S1, the lub of lub-dub), and the aortic and pulmonary valves fling open. The systolic number in a blood pressure reading reflects the peak pressure generated during this moment.',
                hint: ''
            },
            {
                id: 'cv-14',
                front: 'What happens during diastole?',
                options: ['The ventricles contract and the aortic valve opens', 'Blood is ejected into the pulmonary artery', 'The ventricles relax and refill with blood', 'The SA node fires and atria contract'],
                correct: 2,
                explanation: 'After systole, the ventricles relax, the aortic and pulmonary valves snap shut (S2 — the dub), and the mitral and tricuspid valves open to let blood pour in. Diastole is also when the coronary arteries fill.',
                hint: ''
            },
            {
                id: 'cv-15',
                front: 'What do the pulmonary veins carry?',
                options: ['Deoxygenated blood from the right ventricle to the lungs', 'Oxygenated blood from the lungs to the left atrium', 'Deoxygenated blood from the body to the right atrium', 'Oxygenated blood from the left ventricle to the body'],
                correct: 1,
                explanation: 'This one catches a lot of people out. Veins carry blood towards the heart — but that doesn\'t mean deoxygenated. The four pulmonary veins bring freshly oxygenated blood from the lungs straight into the left atrium. Remember: arteries go away from the heart, veins come back — oxygen content is a separate question.',
                hint: ''
            },
            {
                id: 'cv-16',
                front: 'What does the P wave on an ECG represent?',
                options: ['Ventricular depolarisation', 'Ventricular repolarisation', 'The AV node conduction delay', 'Atrial depolarisation'],
                correct: 3,
                explanation: 'The small, gentle bump before the big QRS spike. No P waves? Think AF. P waves at the wrong rate or shape? The signal isn\'t coming from the SA node.',
                hint: ''
            },
            {
                id: 'cv-17',
                front: 'What does the Frank–Starling mechanism describe?',
                options: ['The heart rate increase during sympathetic stimulation', 'The electrical conduction pathway through the ventricles', 'The greater contraction force produced by greater ventricular stretch', 'The closure of the AV valves during systole'],
                correct: 2,
                explanation: 'The heart is self-regulating. Fill it with more blood and the muscle fibres stretch further, which means they contract with more force and eject more. It\'s also why giving fluid to a hypovolaemic patient with a failing heart is such a careful balancing act.',
                hint: ''
            },
            {
                id: 'cv-18',
                front: 'What is the role of the coronary arteries?',
                options: ['They carry deoxygenated blood to the lungs', 'They supply the heart muscle with oxygenated blood', 'They drain venous blood from the myocardium', 'They connect the aorta to the pulmonary circulation'],
                correct: 1,
                explanation: 'The heart can\'t absorb oxygen from the blood passing through its chambers — it needs its own supply. Block one of those arteries and the muscle it supplies starts dying within minutes.',
                hint: ''
            },
            {
                id: 'cv-19',
                front: 'What is the Bundle of His?',
                options: ['The pacemaker cells in the right atrial wall', 'The fibrous skeleton between the atria and ventricles', 'The electrical cable from the AV node to the ventricular conduction system', 'The network of fibres spreading the impulse across the atria'],
                correct: 2,
                explanation: 'Once the AV node has released the impulse, it travels down the Bundle of His through the interventricular septum before splitting into right and left bundle branches. If it gets blocked, you get a bundle branch block pattern on the ECG.',
                hint: ''
            },
            {
                id: 'cv-20',
                front: 'What are Purkinje fibres?',
                options: ['Fibres that anchor the valve leaflets to the papillary muscles', 'Sensory nerves detecting stretch in the ventricular wall', 'The fibrous pericardial layer surrounding the heart', 'Fibres that rapidly spread the electrical impulse throughout the ventricular muscle'],
                correct: 3,
                explanation: 'After the bundle branches, the impulse fans out through a web of Purkinje fibres embedded in the ventricular walls. Their high conduction speed means the entire ventricle depolarises almost simultaneously — producing a coordinated, powerful squeeze.',
                hint: ''
            },
            {
                id: 'cv-21',
                front: 'What are the three layers of the heart wall from inside to outside?',
                options: ['Epicardium, myocardium, endocardium', 'Endocardium, epicardium, myocardium', 'Myocardium, endocardium, pericardium', 'Endocardium, myocardium, epicardium'],
                correct: 3,
                explanation: 'Picture a sandwich — the endocardium is the smooth inner lining that blood touches, the myocardium is the thick muscular filling that does all the squeezing, and the epicardium is the outer coat that sits against the pericardial sac.',
                hint: ''
            },
            {
                id: 'cv-22',
                front: 'What is the function of the tricuspid valve?',
                options: ['Prevents backflow from the aorta into the left ventricle', 'Opens during systole to allow blood into the pulmonary artery', 'Prevents backflow from the right ventricle into the right atrium', 'Separates the right atrium from the left atrium'],
                correct: 2,
                explanation: 'The tricuspid does exactly the same job as the mitral, but on the right side of the heart — three leaflets, same chordae tendineae arrangement. When the right ventricle fires, the tricuspid shuts to make sure blood goes forward into the pulmonary artery.',
                hint: ''
            },
            {
                id: 'cv-23',
                front: 'The pulmonary valve opens:',
                options: ['During diastole to allow ventricular filling', 'When left ventricular pressure exceeds aortic pressure', 'When right ventricular pressure exceeds pulmonary artery pressure', 'When the SA node fires'],
                correct: 2,
                explanation: 'The pulmonary and aortic valves have no chordae tendineae — they\'re shaped like three little cups that fill with blood to snap shut. Simple, elegant, reliable — until it isn\'t.',
                hint: ''
            },
            {
                id: 'cv-24',
                front: 'What does the T wave on an ECG represent?',
                options: ['Atrial repolarisation', 'Ventricular depolarisation', 'The PR interval delay', 'Ventricular repolarisation'],
                correct: 3,
                explanation: 'After the ventricles fire, they need to reset their electrical charge before they can fire again — that recovery shows up as the T wave. Peaked, flattened, or inverted T waves can all mean something important is going on with the myocardium.',
                hint: ''
            },
            {
                id: 'cv-25',
                front: 'A normal PR interval is:',
                options: ['Less than 80 ms', '120–200 ms', '200–300 ms', 'More than 200 ms'],
                correct: 1,
                explanation: 'Three to five small squares on standard ECG paper. It\'s the time the impulse takes to travel from the SA node through the atria and pause at the AV node. Longer than 200 ms means first-degree heart block.',
                hint: ''
            },
            {
                id: 'cv-26',
                front: 'In a healthy heart, the ST segment should be:',
                options: ['Slightly elevated in all leads', 'Depressed below the baseline', 'Isoelectric — flat on the baseline', 'Gently sloping upward'],
                correct: 2,
                explanation: 'Elevation means part of the myocardium is injured and crying out for blood. Depression can mean ischaemia. It\'s one of the most important things you\'ll ever look at on a 12-lead — learn to spot when it\'s not flat and not where it should be.',
                hint: ''
            },
            {
                id: 'cv-27',
                front: 'Where are baroreceptors located?',
                options: ['The SA node and AV node', 'The ventricular myocardium and pulmonary veins', 'The carotid sinuses and aortic arch', 'The renal arteries and hepatic veins'],
                correct: 2,
                explanation: 'Every time your blood pressure rises or falls, baroreceptors send a signal to the brainstem within seconds. Too high — slow the heart, dilate the vessels. Too low — speed up, constrict. It\'s also why pressing on the carotid sinus can slow the heart.',
                hint: ''
            },
            {
                id: 'cv-28',
                front: 'Sympathetic nervous system stimulation causes the heart to:',
                options: ['Slow down and reduce contractile force', 'Speed up and increase contractile force', 'Speed up but reduce contractile force', 'Slow down but increase contractile force'],
                correct: 1,
                explanation: 'When adrenaline floods the system, the heart gets the message loud and clear. The SA node fires faster, the AV node conducts quicker, and the myocardium contracts with more force. The sympathetic system is the accelerator — useful in an emergency, damaging if it never switches off.',
                hint: ''
            },
            {
                id: 'cv-29',
                front: 'The parasympathetic nervous system slows the heart primarily via:',
                options: ['Adrenaline acting on beta-1 receptors', 'Noradrenaline acting on the SA node', 'The phrenic nerve acting on the AV node', 'The vagus nerve acting on the SA and AV nodes'],
                correct: 3,
                explanation: 'The parasympathetic system is the brake pedal. Acetylcholine released by the vagus nerve slows the SA node\'s firing rate. High vagal tone is normal in fit athletes. It\'s also the mechanism behind vasovagal syncope.',
                hint: ''
            },
            {
                id: 'cv-30',
                front: 'Normal ejection fraction is approximately:',
                options: ['30–45%', '40–55%', '55–70%', '70–85%'],
                correct: 2,
                explanation: 'The heart never fully empties — it ejects a proportion of what it contains. Drop below 40% and the heart is struggling significantly — patients get breathless on minimal exertion because their pump just isn\'t keeping up.',
                hint: ''
            },
            {
                id: 'cv-31',
                front: 'What is the function of the chordae tendineae?',
                options: ['Conduct electrical impulses to the papillary muscles', 'Anchor the semi-lunar valves to the aortic root', 'Anchor the AV valve leaflets to prevent them inverting', 'Connect the SA node to the AV node'],
                correct: 2,
                explanation: 'During systole, ventricular pressure rises sharply and tries to push the AV valve leaflets backwards into the atria. The chordae tendineae act like guy-ropes, holding the leaflets in position so they seal properly.',
                hint: ''
            },
            {
                id: 'cv-32',
                front: 'Cardiac tamponade causes haemodynamic compromise because:',
                options: ['The coronary arteries are compressed by the clot', 'Pericardial fluid prevents ventricular filling', 'The SA node is directly compressed', 'Fluid enters the pleural space reducing lung volume'],
                correct: 1,
                explanation: 'The pericardium is a rigid sac — it can\'t stretch quickly. Even 150–200 ml accumulating rapidly creates enough external pressure to stop the ventricles filling during diastole. The heart is literally being strangled from outside.',
                hint: ''
            },
            {
                id: 'cv-33',
                front: 'Beck\'s triad consists of:',
                options: ['Tachycardia, raised JVP, peripheral oedema', 'Hypotension, muffled heart sounds, raised JVP', 'Hypotension, tracheal deviation, absent breath sounds', 'Hypertension, bradycardia, irregular breathing'],
                correct: 1,
                explanation: 'Hypotension because cardiac output has fallen. Muffled heart sounds because fluid dampens what you can hear. Raised JVP because the impaired right heart can\'t accept venous return. In practice you\'ll rarely see all three clearly — use the full clinical picture.',
                hint: ''
            },
            {
                id: 'cv-34',
                front: 'Pulsus paradoxus is defined as a systolic BP drop during inspiration of more than:',
                options: ['5 mmHg', '10 mmHg', '20 mmHg', '15 mmHg'],
                correct: 1,
                explanation: 'Normally blood pressure dips very slightly on inspiration. In cardiac tamponade or severe asthma, this drop is exaggerated because the compromised heart can\'t maintain output against the pressure changes of breathing.',
                hint: ''
            },
            {
                id: 'cv-35',
                front: 'In left ventricular failure, fluid accumulates in:',
                options: ['The pleural space and pericardium', 'The peripheral tissues and ankles', 'The alveoli and lung interstitium', 'The peritoneal cavity'],
                correct: 2,
                explanation: 'If the left ventricle can\'t shift blood forward, it backs up into the left atrium, then the pulmonary veins, then the pulmonary capillaries — where the pressure forces fluid out into the alveoli. The patient drowns from the inside.',
                hint: ''
            },
            {
                id: 'cv-36',
                front: 'Right ventricular failure classically causes:',
                options: ['Pulmonary oedema and frothy sputum', 'Peripheral oedema and raised JVP', 'Hypoxia and silent chest', 'ST elevation and chest pain'],
                correct: 1,
                explanation: 'Same blocked drain logic, opposite direction. If the right ventricle can\'t shift blood into the lungs, pressure backs up into the systemic veins. You get raised JVP, fluid in the ankles and legs, a congested liver, and ascites.',
                hint: ''
            },
            {
                id: 'cv-37',
                front: 'Atherosclerosis involves the build-up of fatty plaques in:',
                options: ['The pericardial sac', 'The cardiac valves', 'The walls of arteries', 'The ventricular myocardium'],
                correct: 2,
                explanation: 'It starts silently, often decades before symptoms appear. A fibrous cap forms over a fatty core — like a blister under the vessel lining. The artery gradually narrows. When that cap ruptures, everything happens fast.',
                hint: ''
            },
            {
                id: 'cv-38',
                front: 'When an atheromatous plaque ruptures, the immediate danger is:',
                options: ['Air embolism into the coronary circulation', 'Rapid clot formation causing arterial occlusion', 'Pericardial effusion from coronary bleeding', 'Ventricular fibrillation from direct myocardial trauma'],
                correct: 1,
                explanation: 'Picture a blister bursting under the lining of a coronary artery. The body treats it like a wound — platelets rush to the site and a clot forms almost immediately. The faster the artery is reopened, the more muscle is saved — which is why time is muscle.',
                hint: ''
            },
            {
                id: 'cv-39',
                front: 'The key difference between myocardial ischaemia and infarction is:',
                options: ['Ischaemia only occurs in the left ventricle', 'Infarction is always caused by a clot; ischaemia never is', 'Ischaemia is reversible; infarction is permanent cell death', 'Infarction causes chest pain; ischaemia is always silent'],
                correct: 2,
                explanation: 'Ischaemia is the warning — the heart muscle is struggling but still alive. Restore blood flow quickly enough and the muscle recovers fully. Infarction is what happens when ischaemia goes on too long — cells die and are replaced by scar tissue that can never contract again.',
                hint: ''
            },
            {
                id: 'cv-40',
                front: 'Atrial fibrillation is caused by:',
                options: ['Complete heart block at the AV node', 'Failure of the SA node to fire', 'Chaotic electrical activity in the atria overwhelming the SA node', 'Re-entry circuits confined to the ventricles'],
                correct: 2,
                explanation: 'Instead of one organised signal from the SA node, hundreds of random electrical impulses fire simultaneously across the atria. The atria just quiver uselessly. The AV node is bombarded with signals but only lets some through, producing that characteristic irregularly irregular pulse.',
                hint: ''
            },
            {
                id: 'cv-41',
                front: 'A raised JVP indicates:',
                options: ['Left ventricular failure with pulmonary oedema', 'Elevated right atrial pressure', 'Aortic stenosis causing backpressure', 'Low circulating volume from dehydration'],
                correct: 1,
                explanation: 'The internal jugular vein has no valves and connects directly to the right atrium — so it acts like a built-in pressure gauge you can see at the bedside. If it\'s higher than 4 cm above the sternal angle, something is backing up.',
                hint: ''
            },
            {
                id: 'cv-42',
                front: 'Cardiogenic shock differs from hypovolaemic shock because:',
                options: ['Cardiogenic shock always presents with bradycardia', 'The circulating volume is normal but the pump is failing', 'Blood pressure is always normal in cardiogenic shock', 'Cardiogenic shock only occurs after trauma'],
                correct: 1,
                explanation: 'The tank isn\'t empty, the pump is broken. The patient is cold, clammy, and mottled because the body is clamping down peripheral vessels to protect core organs. One of the highest-acuity presentations you\'ll face on the road.',
                hint: ''
            },
            {
                id: 'cv-43',
                front: 'The pulmonary artery is unusual because:',
                options: ['It carries blood towards the heart', 'It has no valves at its origin', 'It carries deoxygenated blood away from the heart', 'It supplies the left ventricle directly'],
                correct: 2,
                explanation: 'Arteries carry blood away from the heart — that\'s the definition. They don\'t have to carry oxygenated blood. The pulmonary artery carries deoxygenated blood from the right ventricle to the lungs for a fresh oxygen load.',
                hint: ''
            },
            {
                id: 'cv-44',
                front: 'Mean arterial pressure (MAP) below what value suggests inadequate organ perfusion?',
                options: ['80 mmHg', '75 mmHg', '70 mmHg', '65 mmHg'],
                correct: 3,
                explanation: 'Systolic pressure is just the peak. MAP averages it all out and gives you a truer picture of how well blood is reaching the tissues. Below 65 is where organ perfusion starts becoming inadequate — it\'s a number worth knowing.',
                hint: ''
            },
            {
                id: 'cv-45',
                front: 'Systemic vascular resistance is primarily regulated at the level of the:',
                options: ['Large veins and venous reservoirs', 'Arterioles', 'Capillary beds', 'Aorta and large arteries'],
                correct: 1,
                explanation: 'Think of it like water pressure in a hosepipe. Narrow the nozzle and resistance increases. In septic shock, SVR crashes as vessels dilate massively. In hypertensive emergencies, SVR is very high and the heart is working against enormous resistance.',
                hint: ''
            },
            {
                id: 'cv-46',
                front: 'The interventricular septum can compromise cardiac output when it:',
                options: ['Thickens due to hypertensive heart disease', 'Bows into the opposite ventricle under extreme pressure', 'Conducts electrical impulses too rapidly', 'Develops calcification in elderly patients'],
                correct: 1,
                explanation: 'If one side is under dramatically higher pressure — like the right ventricle in a tension pneumothorax — the septum can bulge into the other ventricle, squashing the space available for filling. Less filling means less output.',
                hint: ''
            },
            {
                id: 'cv-47',
                front: 'A re-entry circuit causes arrhythmias by:',
                options: ['Blocking conduction through the Bundle of His', 'Suppressing SA node firing', 'Trapping the electrical impulse in a continuous loop', 'Causing the AV node to fire spontaneously'],
                correct: 2,
                explanation: 'Imagine a roundabout with no exit. The electrical impulse travels around a circuit of heart tissue continuously — each loop triggers another contraction before the heart has time to fully recover. SVT, atrial flutter, and VT can all be caused this way.',
                hint: ''
            },
            {
                id: 'cv-48',
                front: 'Ventricular fibrillation is dangerous because:',
                options: ['It causes extreme hypertension', 'It produces a very fast but organised heart rate', 'It results in no coordinated ventricular contraction and no cardiac output', 'It cannot be treated with defibrillation'],
                correct: 2,
                explanation: 'In VF, hundreds of random electrical wavefronts fire simultaneously through the ventricular myocardium. There\'s no coordinated squeeze — just a quivering mass of muscle. Zero blood is being pumped. The patient is in cardiac arrest within seconds.',
                hint: ''
            },
            {
                id: 'cv-49',
                front: 'The aortic valve closes at the end of systole, producing:',
                options: ['S1 — the first heart sound', 'S3 — the third heart sound', 'S4 — the fourth heart sound', 'S2 — the second heart sound'],
                correct: 3,
                explanation: 'The aortic valve is the exit gate from the left ventricle. When ventricular pressure exceeds aortic pressure, the three cusps spring open and blood shoots through. At the end of systole, the cusps snap shut — that snap is S2, the dub of lub-dub.',
                hint: ''
            },
            {
                id: 'cv-50',
                front: 'Coronary arteries fill mainly during diastole because:',
                options: ['Blood pressure is highest during diastole', 'The aortic valve is open during diastole allowing direct filling', 'Systolic myocardial contraction compresses the intramural vessels', 'The SA node diverts flow to the coronaries during rest'],
                correct: 2,
                explanation: 'The very act of contracting squeezes the intramural coronary vessels shut from the inside. Only during diastole, when the muscle relaxes, can blood flow freely into the coronary circulation. A very fast heart rate can compromise coronary perfusion — diastole gets so short there\'s barely time for the coronaries to fill.',
                hint: ''
            }
        ]
    },

    {
        id: 'respiratory',
        name: 'Respiratory A&P',
        icon: 'bi-lungs',
        iconColour: '#0ea5e9',
        iconBg: '#e0f2fe',
        pro: false,
        cards: [
            {
                id: 'resp-01',
                front: 'What is the primary function of the respiratory system?',
                options: ['Regulate blood pressure and cardiac output', 'Filter pathogens from the bloodstream', 'Exchange oxygen and carbon dioxide between the body and the environment', 'Maintain blood glucose levels'],
                correct: 2,
                explanation: 'The respiratory system has one core job — get oxygen in and carbon dioxide out. When it fails at that job, everything else starts to fail too.',
                hint: ''
            },
            {
                id: 'resp-02',
                front: 'Which muscle is the primary driver of breathing?',
                options: ['The intercostal muscles', 'The diaphragm', 'The sternocleidomastoid', 'The pectoralis major'],
                correct: 1,
                explanation: 'The diaphragm does about 80% of the work of breathing at rest. When it contracts it flattens downward, increasing the volume of the thoracic cavity and drawing air in. When you see accessory muscles working hard, the diaphragm is struggling.',
                hint: ''
            },
            {
                id: 'resp-03',
                front: 'During normal inspiration, intrathoracic pressure:',
                options: ['Increases, pushing air into the lungs', 'Stays the same — airflow is passive', 'Decreases, drawing air into the lungs', 'Fluctuates depending on body position'],
                correct: 2,
                explanation: 'Breathing works on pressure gradients — the chest expands, intrathoracic pressure drops below atmospheric pressure, and air rushes in to equalise. Understanding this is key to understanding why a tension pneumothorax is so dangerous.',
                hint: ''
            },
            {
                id: 'resp-04',
                front: 'How many lobes does the right lung have?',
                options: ['Two', 'Four', 'Three', 'Five'],
                correct: 2,
                explanation: 'Right lung — three lobes: upper, middle, and lower. Left lung — two lobes: upper and lower. The left lung gives up a lobe to make room for the heart. The space it leaves is called the cardiac notch.',
                hint: ''
            },
            {
                id: 'resp-05',
                front: 'The left lung has two lobes rather than three because:',
                options: ['It developed differently in the embryo', 'It is smaller to accommodate the heart', 'The left bronchus is narrower', 'The left diaphragm sits higher'],
                correct: 1,
                explanation: 'The heart sits slightly to the left of the midline and takes up space in the left thoracic cavity. The left lung is smaller and narrower, with a concave impression called the cardiac notch where the heart sits against it.',
                hint: ''
            },
            {
                id: 'resp-06',
                front: 'What is the role of surfactant in the lungs?',
                options: ['It warms and humidifies inspired air', 'It transports oxygen across the alveolar membrane', 'It reduces alveolar surface tension, preventing collapse', 'It filters particulate matter from inspired air'],
                correct: 2,
                explanation: 'Alveoli are tiny air sacs — and surface tension would cause them to collapse like a wet balloon if it weren\'t for surfactant. Premature babies lack surfactant — that\'s why they struggle to breathe at birth.',
                hint: ''
            },
            {
                id: 'resp-07',
                front: 'Gas exchange in the lungs takes place in the:',
                options: ['Bronchi', 'Bronchioles', 'Trachea', 'Alveoli'],
                correct: 3,
                explanation: 'The airways from the nose to the bronchioles are just the delivery system — the real work happens in the alveoli. There are around 300 million of them in each lung, giving a total surface area roughly the size of a tennis court.',
                hint: ''
            },
            {
                id: 'resp-08',
                front: 'What drives oxygen from the alveoli into the pulmonary capillaries?',
                options: ['Active transport using ATP', 'The pumping action of the heart', 'Diffusion along a concentration gradient', 'Osmotic pressure differences'],
                correct: 2,
                explanation: 'No energy required — oxygen simply moves from where there\'s more of it (the alveoli) to where there\'s less (the deoxygenated blood in the capillaries). Pulmonary oedema thickens that membrane and makes diffusion much harder — which is why these patients are hypoxic.',
                hint: ''
            },
            {
                id: 'resp-09',
                front: 'Normal tidal volume at rest in an adult is approximately:',
                options: ['200 ml', '500 ml', '1000 ml', '1500 ml'],
                correct: 1,
                explanation: 'About 500 ml with every normal breath at rest. But around 150 ml stays in the conducting airways as anatomical dead space and never takes part in gas exchange. So only about 350 ml per breath actually does useful work.',
                hint: ''
            },
            {
                id: 'resp-10',
                front: 'What is minute ventilation?',
                options: ['The maximum volume of air that can be exhaled forcefully', 'The volume of air in the anatomical dead space', 'The tidal volume multiplied by respiratory rate', 'The residual volume remaining after maximum exhalation'],
                correct: 2,
                explanation: 'A normal adult breathes about 500 ml at 15 breaths per minute — that\'s 7.5 litres per minute. A slow respiratory rate is just as dangerous as a fast one — if each breath is shallow too, minute ventilation collapses and CO2 builds up fast.',
                hint: ''
            },
            {
                id: 'resp-11',
                front: 'The normal respiratory rate for a resting adult is:',
                options: ['8–12 breaths per minute', '20–30 breaths per minute', '12–20 breaths per minute', '25–35 breaths per minute'],
                correct: 2,
                explanation: '12–20 at rest — but consistently underassessed on the road. Count it for a full 30 seconds and double it. Above 25 in a sick patient is a serious warning sign. Below 12 and you should be thinking about what\'s suppressing the respiratory drive.',
                hint: ''
            },
            {
                id: 'resp-12',
                front: 'What is anatomical dead space?',
                options: ['Alveoli that are ventilated but not perfused', 'The airways that conduct air but do not participate in gas exchange', 'Lung tissue destroyed by disease', 'The space between the visceral and parietal pleura'],
                correct: 1,
                explanation: 'Anatomical dead space is everything from the nose and mouth down to the terminal bronchioles — all the plumbing, none of the function. About 150 ml in an average adult. Dead space is wasted ventilation, and in sick patients it matters.',
                hint: ''
            },
            {
                id: 'resp-13',
                front: 'Oxygen is carried in the blood primarily by:',
                options: ['Plasma proteins', 'Dissolved directly in plasma', 'Haemoglobin in red blood cells', 'White blood cells'],
                correct: 2,
                explanation: 'About 98% of the oxygen in your blood is bound to haemoglobin. This is why anaemia reduces oxygen delivery even when SpO2 looks normal. The pulse oximeter measures saturation of haemoglobin — it can\'t tell you if there\'s enough haemoglobin to carry adequate oxygen.',
                hint: ''
            },
            {
                id: 'resp-14',
                front: 'Carbon dioxide is transported in the blood mainly as:',
                options: ['Carbaminohaemoglobin bound to haemoglobin', 'Dissolved CO2 in plasma', 'Bicarbonate ions', 'Carbonic acid'],
                correct: 2,
                explanation: 'About 70% of CO2 is carried as bicarbonate ions. CO2 diffuses into red blood cells, combines with water to form carbonic acid, then dissociates into bicarbonate and hydrogen ions. This bicarbonate system is also central to the body\'s acid-base buffering.',
                hint: ''
            },
            {
                id: 'resp-15',
                front: 'The primary chemical stimulus for breathing in a healthy person is:',
                options: ['Falling oxygen levels in arterial blood', 'Rising carbon dioxide levels in arterial blood', 'Changes in blood pH alone', 'Falling nitrogen levels'],
                correct: 1,
                explanation: 'Most people think it\'s oxygen that drives breathing — it\'s not, it\'s CO2. Central chemoreceptors in the medulla are exquisitely sensitive to rising CO2. Oxygen only becomes the primary driver when CO2 sensitivity is blunted, as can happen in some long-standing COPD patients.',
                hint: ''
            },
            {
                id: 'resp-16',
                front: 'What is the pleural space?',
                options: ['The space inside the alveoli where gas exchange occurs', 'The space between the trachea and oesophagus', 'A potential space between the visceral and parietal pleura containing a small amount of fluid', 'The gap between the right and left lungs in the mediastinum'],
                correct: 2,
                explanation: 'The pleural space is normally just a potential space — a thin film of fluid between the two pleural layers that acts as lubrication. It can rapidly fill with air, blood, or fluid under pathological conditions, and when it does, the consequences can be life-threatening.',
                hint: ''
            },
            {
                id: 'resp-17',
                front: 'A pneumothorax occurs when:',
                options: ['Fluid fills the alveoli preventing gas exchange', 'Air enters the pleural space, causing lung collapse', 'The bronchi become obstructed by mucus', 'The diaphragm is paralysed'],
                correct: 1,
                explanation: 'Air in the pleural space disrupts the negative pressure that keeps the lung inflated. The lung on that side collapses away from the chest wall. A tension pneumothorax, where air keeps entering but can\'t escape, is rapidly fatal without intervention.',
                hint: ''
            },
            {
                id: 'resp-18',
                front: 'In a tension pneumothorax, why does cardiac output fall?',
                options: ['The heart is directly punctured by the lung collapsing', 'Hypoxia causes direct myocardial depression', 'Mediastinal shift compresses the vena cavae, reducing venous return', 'The increased intrathoracic pressure directly slows the SA node'],
                correct: 2,
                explanation: 'It\'s not just about the lung — it\'s about what happens to everything else. As air accumulates under tension, it pushes the mediastinum across, kinking the vena cavae and dramatically reducing venous return to the heart. This is why tension pneumothorax is a cardiac arrest cause.',
                hint: ''
            },
            {
                id: 'resp-19',
                front: 'The trachea divides into the left and right main bronchi at the:',
                options: ['Cricoid cartilage', 'Thyroid cartilage', 'Sternal angle', 'Carina'],
                correct: 3,
                explanation: 'The carina is the ridge of cartilage at the bifurcation of the trachea — roughly at the level of the sternal angle on the anterior chest. It\'s also very sensitive — stimulating it triggers a powerful cough reflex.',
                hint: ''
            },
            {
                id: 'resp-20',
                front: 'Which bronchus is more likely to receive an inhaled foreign body?',
                options: ['Left main bronchus', 'Both are equally likely', 'Right main bronchus', 'The secondary bronchi are equally at risk'],
                correct: 2,
                explanation: 'The right main bronchus is wider, shorter, and branches off at a less acute angle from the trachea than the left. Foreign bodies and aspirated material tend to follow the path of least resistance. This is also why endobronchial intubation almost always ends up in the right bronchus.',
                hint: ''
            },
            {
                id: 'resp-21',
                front: 'Hypoxia is defined as:',
                options: ['Low carbon dioxide in the blood', 'Inadequate oxygen delivery to the tissues', 'Excess oxygen in arterial blood', 'Absence of breathing effort'],
                correct: 1,
                explanation: 'Hypoxia is about the tissues — they\'re not getting enough oxygen to function. A patient can be hypoxic with a normal SpO2 if they\'re severely anaemic — there\'s plenty of saturation but not enough haemoglobin to carry adequate oxygen.',
                hint: ''
            },
            {
                id: 'resp-22',
                front: 'Hypoxaemia refers to:',
                options: ['Low oxygen at tissue level', 'Complete absence of breathing', 'Low oxygen levels in arterial blood', 'Elevated carbon dioxide in the blood'],
                correct: 2,
                explanation: 'Hypoxaemia and hypoxia sound similar but they\'re not the same. Hypoxaemia is specifically about low oxygen in the arterial blood. Hypoxia is about inadequate oxygen at tissue level — which can occur even with normal arterial oxygen if perfusion is poor.',
                hint: ''
            },
            {
                id: 'resp-23',
                front: 'In asthma, airflow obstruction is primarily caused by:',
                options: ['Destruction of alveolar walls reducing surface area', 'Fluid filling the alveoli', 'Bronchospasm, mucosal oedema, and mucus plugging', 'Collapse of the upper airways during inspiration'],
                correct: 2,
                explanation: 'Three things happening at once — bronchial smooth muscle goes into spasm, the lining swells with inflammation, and thick mucus plugs start forming. This is why asthma attacks don\'t always respond instantly to bronchodilators — the oedema and mucus need time.',
                hint: ''
            },
            {
                id: 'resp-24',
                front: 'Why does a patient with asthma have a prolonged expiratory phase?',
                options: ['Inspiratory muscles are fatigued', 'The diaphragm is in spasm', 'Narrowed airways trap air, making it harder to exhale than inhale', 'Mucus blocks the upper airways during expiration'],
                correct: 2,
                explanation: 'During expiration, airways naturally narrow — in asthma that narrowing is exaggerated. Air gets trapped in the alveoli, the chest overinflates, and expiration becomes a long, laboured wheeze. If the expiratory phase disappears and the chest goes quiet — that\'s the emergency.',
                hint: ''
            },
            {
                id: 'resp-25',
                front: 'COPD is characterised by:',
                options: ['Reversible airflow obstruction triggered by allergens', 'Fluid accumulation in the alveoli', 'Progressive, largely irreversible airflow limitation', 'Recurrent episodes of bronchospasm only during exercise'],
                correct: 2,
                explanation: 'The key word is irreversible — COPD is caused by long-term damage, usually from smoking, that permanently changes the structure of the airways and alveoli. Unlike asthma, you can\'t reverse it with a bronchodilator.',
                hint: ''
            },
            {
                id: 'resp-26',
                front: 'Emphysema causes breathlessness because:',
                options: ['The airways become inflamed and produce excess mucus', 'Alveolar walls are destroyed, reducing the surface area for gas exchange', 'Bronchospasm prevents air reaching the alveoli', 'Surfactant production is reduced'],
                correct: 1,
                explanation: 'In emphysema, the walls between alveoli break down — small sacs merge into large, useless air spaces. Less surface area means less gas exchange. These patients also lose the elastic recoil that normally helps push air out, so they trap air and their chests become barrel-shaped.',
                hint: ''
            },
            {
                id: 'resp-27',
                front: 'A pulmonary embolism causes hypoxia primarily because:',
                options: ['It blocks the airway preventing ventilation', 'It destroys alveolar tissue directly', 'Ventilated alveoli are not perfused, creating dead space', 'It causes bronchospasm throughout the lung'],
                correct: 2,
                explanation: 'A PE doesn\'t block the airway — it blocks a pulmonary artery. The alveoli downstream are still being ventilated, but there\'s no blood flowing past them to pick up oxygen. Ventilation without perfusion — dead space. It\'s a circulation problem masquerading as a breathing problem.',
                hint: ''
            },
            {
                id: 'resp-28',
                front: 'Hyperventilation causes a rise in blood pH because:',
                options: ['Excess oxygen is absorbed, raising pH', 'CO2 is blown off, reducing carbonic acid in the blood', 'Bicarbonate is excreted by the kidneys', 'Lactic acid is metabolised faster'],
                correct: 1,
                explanation: 'CO2 dissolves in blood to form carbonic acid — so less CO2 means less acid, which means higher pH. This is what causes the tingling, light-headedness, and carpopedal spasm in a panic attack.',
                hint: ''
            },
            {
                id: 'resp-29',
                front: 'What is the oxygen dissociation curve?',
                options: ['A graph showing how respiratory rate changes with CO2 levels', 'A chart mapping lung volume against airway resistance', 'A curve showing the relationship between oxygen saturation and partial pressure of oxygen', 'A diagram of alveolar surface area versus age'],
                correct: 2,
                explanation: 'The curve is S-shaped — and that shape is incredibly important. The flat upper portion means haemoglobin stays well saturated even as oxygen partial pressure drops a little. The steep lower portion means once you\'re off the plateau, saturation drops rapidly.',
                hint: ''
            },
            {
                id: 'resp-30',
                front: 'A right shift of the oxygen dissociation curve means haemoglobin:',
                options: ['Binds oxygen more tightly, reducing delivery to tissues', 'Releases oxygen more readily to the tissues', 'Carries more oxygen per molecule', 'Is less affected by changes in pH'],
                correct: 1,
                explanation: 'A right shift means haemoglobin gives up its oxygen more easily. This happens in exercising muscle — exactly when you need more oxygen delivered. Think of it as the body telling haemoglobin — these tissues need oxygen, let it go.',
                hint: ''
            },
            {
                id: 'resp-31',
                front: 'Which condition causes a right shift of the oxygen dissociation curve?',
                options: ['Hypothermia and alkalosis', 'Low carbon dioxide and high pH', 'Acidosis, raised CO2, and raised temperature', 'Anaemia and low 2,3-DPG'],
                correct: 2,
                explanation: 'The right shift factors are the conditions found in metabolically active or stressed tissue — high CO2, low pH, high temperature. The opposite conditions — hypothermia, alkalosis, low CO2 — cause a left shift, where haemoglobin holds onto oxygen and releases it less readily.',
                hint: ''
            },
            {
                id: 'resp-32',
                front: 'The visceral pleura covers:',
                options: ['The inner surface of the chest wall', 'The diaphragm', 'The outer surface of the lungs', 'The mediastinal structures'],
                correct: 2,
                explanation: 'Two layers — visceral covers the lung surface itself, parietal lines the chest wall and diaphragm. Between them is that thin film of pleural fluid. When air or blood separates them — pneumo or haemothorax — the lung collapses away.',
                hint: ''
            },
            {
                id: 'resp-33',
                front: 'Normal SpO2 in a healthy adult is:',
                options: ['85–90%', '90–94%', '94–99%', '99–100% only'],
                correct: 2,
                explanation: '94–99% for a healthy adult — but always interpret in context. 94% in a fit 25-year-old is worth investigating. 94% in an elderly COPD patient on home oxygen might be their baseline. SpO2 tells you about saturation, not about ventilation.',
                hint: ''
            },
            {
                id: 'resp-34',
                front: 'Pulse oximetry measures SpO2 by:',
                options: ['Sampling arterial blood from the fingertip', 'Measuring the electrical conductivity of red blood cells', 'Detecting the pressure waveform of arterial pulsation', 'Detecting differences in light absorption between oxygenated and deoxygenated haemoglobin'],
                correct: 3,
                explanation: 'Oxyhaemoglobin and deoxyhaemoglobin absorb red and infrared light differently. The problem is it can\'t distinguish carboxyhaemoglobin from oxyhaemoglobin — they look identical to the device. This is why SpO2 is falsely normal in carbon monoxide poisoning.',
                hint: ''
            },
            {
                id: 'resp-35',
                front: 'A haemothorax is:',
                options: ['Air in the pleural space', 'Pus in the pleural space', 'Blood in the pleural space', 'Fluid from heart failure in the pleural space'],
                correct: 2,
                explanation: 'Blood in the pleural space — usually from trauma to chest wall vessels or the lung itself. A massive haemothorax can hold 1.5–2 litres of blood — enough to cause haemorrhagic shock on its own. Clinically you get reduced breath sounds with dullness to percussion.',
                hint: ''
            },
            {
                id: 'resp-36',
                front: 'The epiglottis functions to:',
                options: ['Warm and humidify inspired air', 'Prevent food and liquid entering the trachea during swallowing', 'Produce mucus to trap particles in the airway', 'Control the diameter of the vocal cords'],
                correct: 1,
                explanation: 'The epiglottis is a leaf-shaped flap of cartilage that flips back over the larynx during swallowing. When it\'s inflamed — epiglottitis — it can swell rapidly and cause life-threatening airway obstruction. In patients with reduced consciousness, this protective reflex is impaired.',
                hint: ''
            },
            {
                id: 'resp-37',
                front: 'What is residual volume?',
                options: ['The maximum amount of air that can be inhaled', 'The volume of air inspired above tidal breathing', 'The air remaining in the lungs after maximum exhalation', 'The volume of air in the anatomical dead space'],
                correct: 2,
                explanation: 'Even after you\'ve blown out as hard as you possibly can, about 1.2 litres of air remains in the lungs — you can never fully empty them. This residual volume keeps the alveoli from collapsing completely between breaths.',
                hint: ''
            },
            {
                id: 'resp-38',
                front: 'Respiratory acidosis occurs when:',
                options: ['The patient hyperventilates and blows off CO2', 'The kidneys excrete too much bicarbonate', 'CO2 accumulates due to inadequate ventilation, lowering blood pH', 'Excessive oxygen raises blood pH'],
                correct: 2,
                explanation: 'Hypoventilate and CO2 builds up — CO2 plus water forms carbonic acid, pH falls, and you have a respiratory acidosis. This happens in any condition that reduces minute ventilation — opioid overdose, severe asthma, neuromuscular failure.',
                hint: ''
            },
            {
                id: 'resp-39',
                front: 'Which receptors detect falling oxygen levels in the peripheral circulation?',
                options: ['Baroreceptors', 'Mechanoreceptors', 'Thermoreceptors', 'Peripheral chemoreceptors'],
                correct: 3,
                explanation: 'Peripheral chemoreceptors — mainly in the carotid bodies — detect falling PaO2, rising PaCO2, and falling pH. In some long-term COPD patients with chronically elevated CO2, the peripheral chemoreceptors responding to low oxygen may become the dominant breathing drive.',
                hint: ''
            },
            {
                id: 'resp-40',
                front: 'In a flail chest, paradoxical movement occurs because:',
                options: ['The diaphragm is paralysed on one side', 'A segment of ribs is fractured in two places and moves independently of the chest wall', 'Air trapping causes one side to hyperinflate', 'Tension pneumothorax pushes the chest wall outward'],
                correct: 1,
                explanation: 'When ribs are fractured in two places, the segment in between loses its bony connection to the rest of the chest wall. During inspiration it gets sucked inward. During expiration it pops out. The underlying lung contusion is often the bigger clinical problem.',
                hint: ''
            },
            {
                id: 'resp-41',
                front: 'The cough reflex is primarily a defence mechanism to:',
                options: ['Increase tidal volume during hypoxia', 'Stimulate the diaphragm during fatigue', 'Regulate carbon dioxide levels', 'Expel foreign material or secretions from the airway'],
                correct: 3,
                explanation: 'A cough generates airflow velocities approaching 500 mph — one of the most powerful protective reflexes in the body. A diminished or absent cough reflex dramatically increases the risk of aspiration. It\'s one of the things you\'re assessing when you check airway protective reflexes.',
                hint: ''
            },
            {
                id: 'resp-42',
                front: 'Type 1 respiratory failure is characterised by:',
                options: ['Low oxygen and high carbon dioxide', 'Normal oxygen with raised carbon dioxide', 'Low oxygen with normal or low carbon dioxide', 'High oxygen with low carbon dioxide'],
                correct: 2,
                explanation: 'Type 1 — the lungs can\'t oxygenate properly, but ventilation is still adequate so CO2 is normal or even low. Think pulmonary oedema, pneumonia, PE — conditions where gas exchange is impaired but the patient is breathing hard enough to keep CO2 down.',
                hint: ''
            },
            {
                id: 'resp-43',
                front: 'Type 2 respiratory failure is characterised by:',
                options: ['Low oxygen with low carbon dioxide', 'Low oxygen with high carbon dioxide', 'Normal oxygen with low carbon dioxide', 'High oxygen with normal carbon dioxide'],
                correct: 1,
                explanation: 'Type 2 — the ventilatory pump is failing. The patient can\'t breathe hard enough or deep enough, so both oxygen falls and CO2 rises. Think severe asthma, COPD exacerbation, neuromuscular failure, opioid overdose. The rising CO2 is the key difference — ventilation itself is failing.',
                hint: ''
            },
            {
                id: 'resp-44',
                front: 'Accessory muscle use during breathing suggests:',
                options: ['Normal breathing mechanics in a fit person', 'Increased respiratory effort due to airway obstruction or respiratory distress', 'The patient is hyperventilating', 'Diaphragmatic paralysis only'],
                correct: 1,
                explanation: 'When the diaphragm alone isn\'t enough, the body recruits accessory muscles — sternocleidomastoid, scalenes, intercostals. Seeing these muscles working hard tells you the patient is fighting for every breath. The more muscles recruited, the harder the work of breathing — and exhaustion is what you\'re racing against.',
                hint: ''
            },
            {
                id: 'resp-45',
                front: 'The normal pleural space contains:',
                options: ['A large volume of fluid to cushion the lungs', 'Surfactant to reduce surface tension', 'A small amount of fluid that lubricates pleural movement', 'No fluid — it is completely dry in health'],
                correct: 2,
                explanation: 'Just a thin film — around 10–20 ml in total — enough to lubricate the two pleural surfaces as they slide against each other with every breath. Any more than that and it starts to compress the lung.',
                hint: ''
            },
            {
                id: 'resp-46',
                front: 'Central cyanosis becomes visible when SpO2 falls approximately below:',
                options: ['95%', '90%', '85%', '80%'],
                correct: 2,
                explanation: 'Cyanosis appears when there\'s around 5 g/dl of deoxygenated haemoglobin in the capillaries. In anaemic patients you may never see cyanosis even at very low saturations — there simply isn\'t enough haemoglobin to turn blue. Never wait for cyanosis to decide a patient is hypoxic.',
                hint: ''
            },
            {
                id: 'resp-47',
                front: 'What prevents the trachea from collapsing?',
                options: ['Smooth muscle running the full circumference', 'Longitudinal elastic fibres', 'C-shaped cartilaginous rings', 'The negative intrathoracic pressure'],
                correct: 2,
                explanation: 'C-shaped rings of hyaline cartilage run along the length of the trachea — like a flexible vacuum cleaner hose. The opening of the C faces posteriorly, where the oesophagus sits, allowing it to bulge slightly when you swallow a large bolus.',
                hint: ''
            },
            {
                id: 'resp-48',
                front: 'Kussmaul breathing is:',
                options: ['Slow, shallow breathing seen in opioid overdose', 'Irregular, gasping breaths seen before respiratory arrest', 'Rapid, deep breathing seen in metabolic acidosis as the body attempts to blow off CO2', 'Noisy, laboured breathing caused by upper airway obstruction'],
                correct: 2,
                explanation: 'When the body is in metabolic acidosis — DKA, severe sepsis, salicylate poisoning — it tries to compensate by blowing off CO2 through deep, rapid breathing. If you see a patient breathing deeply and rapidly and smell acetone on their breath, think DKA.',
                hint: ''
            },
            {
                id: 'resp-49',
                front: 'Cheyne-Stokes breathing is characterised by:',
                options: ['Consistently slow and shallow breaths', 'A rapid regular rate with deep tidal volumes', 'Cycles of gradually increasing then decreasing depth, with periods of apnoea', 'Prolonged expiration with audible wheeze'],
                correct: 2,
                explanation: 'Cheyne-Stokes is the brain losing fine control of breathing. CO2 builds up during the apnoeic phase, triggering increasingly deep breaths until CO2 is blown off, then breathing slows and stops again. In a head-injured patient, it tells you the brainstem is under pressure.',
                hint: ''
            },
            {
                id: 'resp-50',
                front: 'The primary reason high-flow oxygen should be used cautiously in some COPD patients is:',
                options: ['Oxygen is toxic to damaged lung tissue at high concentrations', 'High-flow oxygen causes bronchospasm in COPD', 'Some COPD patients rely on hypoxic drive and may reduce their respiratory effort if oxygen is given', 'Oxygen increases mucus production in chronic bronchitis'],
                correct: 2,
                explanation: 'In a small subset of severe COPD patients with chronically elevated CO2, the central chemoreceptors have adapted and the hypoxic drive becomes more important. Flooding these patients with high-flow oxygen can reduce that drive and cause them to hypoventilate, retaining even more CO2. Target 88–92% and monitor carefully.',
                hint: ''
            }
        ]
    },

    {
        id: 'clinical-signs',
        name: 'Clinical Signs & Symptoms',
        icon: 'bi-clipboard2-pulse',
        iconColour: '#a855f7',
        iconBg: '#faf5ff',
        pro: true,
        cards: [
            {
                id: 'css-01',
                front: 'Cushing\'s triad is a late sign of raised intracranial pressure. Which three features make it up?',
                options: ['Hypotension, tachycardia, irregular breathing', 'Hypertension, bradycardia, irregular breathing', 'Hypertension, tachycardia, shallow breathing', 'Hypotension, bradycardia, deep breathing'],
                correct: 1,
                explanation: 'The brain is being squeezed and the body is desperately trying to perfuse it — so blood pressure shoots up. The baroreceptors respond by slowing the heart. Breathing becomes irregular as the brainstem comes under pressure. If you\'re seeing Cushing\'s triad, this patient is in serious trouble.',
                hint: ''
            },
            {
                id: 'css-02',
                front: 'Battle\'s sign is bruising behind the ear. What does it indicate?',
                options: ['Direct trauma to the mastoid process', 'Basal skull fracture', 'Temporal artery rupture', 'Cervical spine injury'],
                correct: 1,
                explanation: 'Blood from a basal skull fracture tracks through the tissue planes and pools behind the ear — it takes hours to appear, so you won\'t always see it acutely. Always look for it alongside raccoon eyes and CSF from the ears or nose.',
                hint: ''
            },
            {
                id: 'css-03',
                front: 'Raccoon eyes (periorbital bruising with no direct facial trauma) suggests:',
                options: ['Orbital cellulitis', 'Zygoma fracture', 'Basal skull fracture', 'Direct nasal trauma'],
                correct: 2,
                explanation: 'The key phrase is no direct facial trauma. Bruising around the eyes from a punch is just bruising. Bruising around the eyes after a head injury with no direct facial impact means blood is tracking from a fracture at the base of the skull.',
                hint: ''
            },
            {
                id: 'css-04',
                front: 'A patient is pale and sweaty with a rigid abdomen following a road traffic collision. What does this picture suggest?',
                options: ['Musculoskeletal chest wall injury from the seatbelt', 'Intra-abdominal haemorrhage requiring rapid transport', 'Winding from blunt abdominal trauma — reassess in 10 minutes', 'Diaphragmatic rupture causing referred shoulder pain'],
                correct: 1,
                explanation: 'Mechanism plus haemodynamic instability plus a rigid abdomen equals significant internal bleeding until proven otherwise. Don\'t hang around trying to find exactly what\'s injured — your job is to recognise it, package the patient, and move.',
                hint: ''
            },
            {
                id: 'css-05',
                front: 'Tracheal deviation away from the affected side is a sign of:',
                options: ['Haemothorax', 'Simple pneumothorax', 'Tension pneumothorax', 'Pulmonary embolism'],
                correct: 2,
                explanation: 'Air is trapped and building under pressure, pushing everything across. The trachea gets shunted away from the side with the problem. It\'s a late sign — don\'t wait for it. If your patient is deteriorating with absent breath sounds and a distended neck vein, act on tension pneumothorax before the trachea shifts.',
                hint: ''
            },
            {
                id: 'css-06',
                front: 'Tracheal deviation towards the affected side suggests:',
                options: ['Tension pneumothorax', 'Massive haemothorax or lung collapse', 'Aortic dissection', 'Cardiac tamponade'],
                correct: 1,
                explanation: 'Pull versus push — tension pneumothorax pushes the trachea away, lung collapse or a large haemothorax pulls it towards the affected side. Same sign, opposite direction, opposite cause.',
                hint: ''
            },
            {
                id: 'css-07',
                front: 'Kussmaul breathing (deep, rapid breathing) is a compensatory response to:',
                options: ['Opioid overdose', 'Raised intracranial pressure', 'Metabolic acidosis', 'Hyperventilation syndrome'],
                correct: 2,
                explanation: 'The body is drowning in acid and blowing off CO2 is its way of trying to balance the books. Deep, rapid breathing in a sick patient — especially with a smell of acetone — should make you think DKA straight away. But sepsis, renal failure, and salicylate poisoning can do exactly the same thing.',
                hint: ''
            },
            {
                id: 'css-08',
                front: 'Cheyne-Stokes breathing is associated with:',
                options: ['Asthma exacerbation', 'Severe traumatic brain injury or heart failure', 'Diabetic ketoacidosis', 'Pulmonary embolism'],
                correct: 1,
                explanation: 'That waxing and waning pattern means the brain is losing fine control of breathing. In a head-injured patient it tells you the brainstem is under pressure. In an elderly patient it can be seen in severe heart failure too.',
                hint: ''
            },
            {
                id: 'css-09',
                front: 'Muffled heart sounds are a feature of which condition?',
                options: ['Tension pneumothorax', 'Pulmonary oedema', 'Cardiac tamponade', 'Aortic dissection'],
                correct: 2,
                explanation: 'Fluid surrounding the heart dampens the sound — like listening through a thick duvet. Muffled heart sounds, hypotension, and raised JVP together make Beck\'s triad. In practice you\'ll rarely hear all three clearly, especially in the back of an ambulance.',
                hint: ''
            },
            {
                id: 'css-10',
                front: 'A patient has unequal blood pressure readings between arms. What should this raise suspicion of?',
                options: ['Subclavian steal syndrome', 'Aortic dissection', 'Brachial artery occlusion', 'Hypertensive crisis'],
                correct: 1,
                explanation: 'If the dissection involves the vessels branching off the aorta, blood flow to each arm can differ — giving you a BP difference of more than 20 mmHg between sides. In a patient with tearing chest or back pain, it\'s a red flag you can\'t ignore.',
                hint: ''
            },
            {
                id: 'css-11',
                front: 'Jugular venous distension combined with hypotension and absent breath sounds on one side suggests:',
                options: ['Cardiac tamponade', 'Massive pulmonary embolism', 'Tension pneumothorax', 'Haemothorax'],
                correct: 2,
                explanation: 'This is your classic tension pneumothorax triad. The pressure in the chest is so high it\'s backing up venous return — hence the distended neck veins. Combined with absent breath sounds and a hypotensive, deteriorating patient, this needs immediate intervention.',
                hint: ''
            },
            {
                id: 'css-12',
                front: 'What is the significance of a capillary refill time greater than 2 seconds?',
                options: ['Normal in adults over 60', 'Suggests peripheral vasoconstriction and possible poor perfusion', 'Only significant if accompanied by cyanosis', 'Indicates fluid overload'],
                correct: 1,
                explanation: 'The body is shutting down the peripheries to protect the core — blood is being redirected away from the skin. A prolonged CRT is one of the earliest signs of compensated shock. Always assess it alongside skin colour, temperature, and the rest of your observations.',
                hint: ''
            },
            {
                id: 'css-13',
                front: 'Diaphoresis (profuse sweating) in a medical emergency most commonly indicates:',
                options: ['Fever from infection', 'Sympathetic nervous system activation — the body is under serious stress', 'Hyperthermia from environment', 'Medication side effect only'],
                correct: 1,
                explanation: 'Cold, clammy sweating is the sympathetic nervous system in overdrive — the body knows something is very wrong. ACS, hypoglycaemia, shock, and severe pain all do it. Cold clammy diaphoresis in a sick patient is an alarm bell.',
                hint: ''
            },
            {
                id: 'css-14',
                front: 'A patient has a GCS of 3, pinpoint pupils, and a respiratory rate of 6. What is the classic triad?',
                options: ['Benzodiazepine overdose', 'Hypoglycaemia', 'Opioid toxidrome', 'Alcohol poisoning'],
                correct: 2,
                explanation: 'Coma, pinpoints, and respiratory depression — know this triad cold. The respiratory depression is the killer. Airway management first, always.',
                hint: ''
            },
            {
                id: 'css-15',
                front: 'Unilateral leg swelling, redness, and pain in a breathless patient should make you consider:',
                options: ['Cellulitis alone', 'Deep vein thrombosis with possible pulmonary embolism', 'Lymphoedema', 'Compartment syndrome'],
                correct: 1,
                explanation: 'A swollen, painful leg plus breathlessness is PE until proven otherwise. The DVT is the clot in the leg — the PE is what happens when a piece breaks off and heads to the lungs. When you see both together, treat it seriously.',
                hint: ''
            },
            {
                id: 'css-16',
                front: 'Mottling of the skin in a seriously ill patient indicates:',
                options: ['Allergic reaction', 'Hypothermia only', 'Poor peripheral perfusion and microcirculatory failure', 'Normal variation in dark skin tones'],
                correct: 2,
                explanation: 'Mottling — that blotchy, lace-like discolouration — means the tiny blood vessels in the skin are failing. It\'s a sign of severe circulatory compromise and often appears on the knees first. This patient needs rapid intervention.',
                hint: ''
            },
            {
                id: 'css-17',
                front: 'Stridor is a high-pitched inspiratory noise caused by:',
                options: ['Lower airway obstruction such as bronchospasm', 'Fluid in the alveoli', 'Upper airway obstruction', 'Pleural inflammation'],
                correct: 2,
                explanation: 'Stridor is the sound of air being forced through a narrowed upper airway — larynx, trachea, or above. Causes include anaphylaxis, epiglottitis, foreign body, or croup in children. Any stridor is a potential airway emergency — take it seriously and prepare early.',
                hint: ''
            },
            {
                id: 'css-18',
                front: 'Wheeze heard on expiration suggests:',
                options: ['Upper airway obstruction', 'Fluid in the pleural space', 'Lower airway narrowing — asthma or COPD', 'Laryngospasm'],
                correct: 2,
                explanation: 'Wheeze comes from turbulent airflow through narrowed lower airways — bronchospasm, mucosal swelling, mucus. No wheeze at all in a known asthmatic is worse than wheeze — it means no air movement.',
                hint: ''
            },
            {
                id: 'css-19',
                front: 'A silent chest in a known asthmatic is:',
                options: ['Reassuring — the bronchospasm has resolved', 'A sign of critical airflow obstruction — a pre-arrest warning', 'Only significant if the patient is distressed', 'Normal between exacerbations'],
                correct: 1,
                explanation: 'No wheeze doesn\'t mean better — it means barely any air is moving. The airways are so tight there\'s nothing left to wheeze with. A suddenly quiet asthmatic who was previously wheezing loudly is deteriorating, not improving.',
                hint: ''
            },
            {
                id: 'css-20',
                front: 'Unilateral absence of breath sounds following trauma suggests:',
                options: ['Bilateral pulmonary oedema', 'Pneumothorax or haemothorax on that side', 'Consolidation affecting both lungs', 'Diaphragmatic spasm'],
                correct: 1,
                explanation: 'Air or blood in the pleural space stops sound transmitting through to your stethoscope. The difference between the two is percussion — pneumothorax gives you a hyper-resonant, drum-like note; haemothorax gives you dullness.',
                hint: ''
            },
            {
                id: 'css-21',
                front: 'Urticaria, angioedema, and wheeze together suggest:',
                options: ['Sepsis', 'Anaphylaxis', 'Pulmonary embolism', 'Cardiogenic shock'],
                correct: 1,
                explanation: 'The skin signs plus airway involvement is the classic anaphylaxis picture — mast cells firing off everywhere. Urticaria is the hives, angioedema is the swelling of deeper tissues including the airway. When you see them together, act fast.',
                hint: ''
            },
            {
                id: 'css-22',
                front: 'What does a positive Babinski sign (upgoing plantar reflex) in an adult indicate?',
                options: ['Normal plantar reflex response', 'Peripheral nerve damage in the foot', 'Upper motor neurone lesion', 'Cerebellar dysfunction'],
                correct: 2,
                explanation: 'Stroke the sole of the foot — normal adults curl their toes down. An upgoing big toe means the upper motor neurone pathway from the brain to the spinal cord is damaged. It\'s normal in babies under 12 months but abnormal in adults.',
                hint: ''
            },
            {
                id: 'css-23',
                front: 'Hypotension, tachycardia, and warm flushed skin with a bounding pulse suggests:',
                options: ['Hypovolaemic shock', 'Cardiogenic shock', 'Neurogenic shock', 'Distributive shock — sepsis or anaphylaxis'],
                correct: 3,
                explanation: 'Vasodilation is the theme here — vessels are wide open, blood is pooling away from the core, and the heart is racing to compensate. Warm, flushed, bounding — the opposite of cold and clammy. Think sepsis, anaphylaxis, or neurogenic shock.',
                hint: ''
            },
            {
                id: 'css-24',
                front: 'Cold, clammy skin with tachycardia and hypotension suggests:',
                options: ['Distributive shock', 'Neurogenic shock', 'Compensated hypovolaemic or cardiogenic shock', 'Anaphylaxis'],
                correct: 2,
                explanation: 'The body is clamping down — vessels constrict, sweat glands activate, blood is redirected to core organs. Cold, pale, clammy skin with a racing heart and dropping BP means the compensatory mechanisms are working hard but struggling.',
                hint: ''
            },
            {
                id: 'css-25',
                front: 'Paradoxical chest wall movement following trauma indicates:',
                options: ['Haemothorax', 'Open pneumothorax', 'Flail chest', 'Tension pneumothorax'],
                correct: 2,
                explanation: 'A section of ribs fractured in two places loses its connection to the rest of the chest wall and moves independently — in when everything else goes out, out when everything else comes in. The underlying lung bruising is often the bigger problem.',
                hint: ''
            },
            {
                id: 'css-26',
                front: 'Peritonism on abdominal examination suggests:',
                options: ['Bowel obstruction', 'Peritoneal irritation — bleeding, perforation, or infection', 'Hepatic enlargement', 'Constipation'],
                correct: 1,
                explanation: 'Guarding, rigidity, and rebound tenderness — the abdomen goes board-like because the muscles are involuntarily contracting to protect what\'s underneath. Blood, bowel contents, or infection in the peritoneal cavity all cause this. It\'s a surgical emergency sign.',
                hint: ''
            },
            {
                id: 'css-27',
                front: 'The classic presentation of a subarachnoid haemorrhage is:',
                options: ['Gradual onset headache worsening over days', 'Headache with photophobia and neck stiffness', 'Sudden thunderclap headache — worst of life', 'Unilateral facial pain and jaw claudication'],
                correct: 2,
                explanation: 'Patients describe it as being hit over the head with a bat. Sudden, severe, maximal at onset — the worst headache of their life. Don\'t let them sign a refusal without understanding what that headache could mean.',
                hint: ''
            },
            {
                id: 'css-28',
                front: 'Neck stiffness and photophobia in a febrile patient suggest:',
                options: ['Tension headache', 'Raised intracranial pressure from trauma', 'Meningism — meningitis or subarachnoid haemorrhage until proven otherwise', 'Cervical spine injury'],
                correct: 2,
                explanation: 'Irritation of the meninges causes protective muscle spasm in the neck. Light sensitivity follows as the inflamed meninges are aggravated by any stimulation. These two signs together in a feverish patient mean meningitis until proven otherwise.',
                hint: ''
            },
            {
                id: 'css-29',
                front: 'A non-blanching rash in a febrile patient is:',
                options: ['A normal viral rash', 'Urticaria from anaphylaxis', 'A meningococcal emergency until proven otherwise', 'Pressure-related livedo reticularis'],
                correct: 2,
                explanation: 'Press a glass against the rash — if it doesn\'t fade, blood has leaked out of the vessels into the skin. In a febrile unwell patient this is meningococcal septicaemia until proven otherwise. This is a time-critical emergency.',
                hint: ''
            },
            {
                id: 'css-30',
                front: 'Unilateral facial droop, arm weakness, and speech disturbance assessed using FAST indicates:',
                options: ['Hypoglycaemia', 'Todd\'s paresis following a seizure', 'Possible stroke — time-critical emergency', 'Hemiplegic migraine'],
                correct: 2,
                explanation: 'Time is brain — every minute of a stroke, roughly 2 million neurons die. A positive FAST is a blue light job. Always check BM first because hypoglycaemia can mimic a stroke perfectly.',
                hint: ''
            },
            {
                id: 'css-31',
                front: 'A patient post-seizure has a unilateral arm weakness that resolves after 30 minutes. This is:',
                options: ['Evidence of a stroke', 'Todd\'s paresis — transient weakness following focal seizure activity', 'Hysterical paralysis', 'Spinal cord involvement from the seizure'],
                correct: 1,
                explanation: 'The brain is exhausted after a seizure — focal weakness can follow focal seizure activity as the neurons recover. It looks exactly like a stroke but resolves within minutes to hours. Treat it as a stroke until the hospital proves otherwise.',
                hint: ''
            },
            {
                id: 'css-32',
                front: 'Rigidity, bradykinesia, and a resting tremor form the classic triad of:',
                options: ['Multiple sclerosis', 'Motor neurone disease', 'Parkinson\'s disease', 'Cerebellar ataxia'],
                correct: 2,
                explanation: 'The classic Parkinson\'s triad — stiff, slow, and shaky. The tremor is worst at rest and improves with movement. Important for paramedics because Parkinson\'s patients are at high risk of falls, aspiration, and medication-related emergencies.',
                hint: ''
            },
            {
                id: 'css-33',
                front: 'A boggy scalp haematoma following a head injury matters because:',
                options: ['It doesn\'t — scalp injuries rarely bleed significantly', 'It can represent significant blood loss, particularly in children', 'It only matters if there is associated skull fracture', 'It indicates brain herniation'],
                correct: 1,
                explanation: 'The scalp has an incredibly rich blood supply. In small children a large subgaleal haematoma can actually cause haemorrhagic shock. Don\'t dismiss head wounds as minor just because the patient is alert.',
                hint: ''
            },
            {
                id: 'css-34',
                front: 'Unequal pupils in a head-injured patient with a falling GCS suggests:',
                options: ['Physiological anisocoria — a normal variant', 'Opioid overdose', 'Uncal herniation compressing the third cranial nerve', 'Direct eye trauma'],
                correct: 2,
                explanation: 'The brain is herniating — swelling is pushing the medial temporal lobe through the tentorium, squashing the third cranial nerve. The pupil on the affected side dilates and becomes fixed. A blown pupil with a falling GCS means the window for intervention is closing fast.',
                hint: ''
            },
            {
                id: 'css-35',
                front: 'Crepitus felt over a long bone following trauma indicates:',
                options: ['Soft tissue bruising only', 'Joint effusion', 'Fracture with bone ends moving', 'Gas in the tissues from infection'],
                correct: 2,
                explanation: 'That grating feeling of bone ends grinding against each other — you don\'t need to actively test for it and you shouldn\'t. If you feel it during assessment, you\'ve found your fracture. Consider blood loss — a femoral fracture can hide 1–2 litres.',
                hint: ''
            },
            {
                id: 'css-36',
                front: 'Subcutaneous emphysema following chest trauma suggests:',
                options: ['Surgical emphysema from a ruptured oesophagus only', 'Air tracking from a pneumothorax or airway injury', 'Bruising of the pectoral muscles', 'Fat embolism'],
                correct: 1,
                explanation: 'That crackling, crunchy sensation under the skin — like bubble wrap — is air that\'s escaped from the airways or pleural space and tracked through the tissue planes. It\'s telling you there\'s a significant airway or pleural injury underneath.',
                hint: ''
            },
            {
                id: 'css-37',
                front: 'A rigid, board-like abdomen following trauma suggests:',
                options: ['Muscle guarding from pain', 'Intra-abdominal haemorrhage or organ injury', 'Abdominal aortic aneurysm', 'Acute appendicitis'],
                correct: 1,
                explanation: 'When the abdomen feels like a plank, something serious is going on underneath. Involuntary muscle rigidity means peritoneal irritation from blood or damaged organs. In a trauma patient this is a load and go situation.',
                hint: ''
            },
            {
                id: 'css-38',
                front: 'The tripod position is adopted by patients to:',
                options: ['Reduce cardiac workload in heart failure', 'Maximise accessory muscle use and airway diameter in respiratory distress', 'Relieve abdominal pain', 'Prevent syncopal episodes'],
                correct: 1,
                explanation: 'Sitting forward with hands on knees fixes the shoulder girdle, freeing up the accessory muscles to work harder on breathing. If your patient has positioned themselves this way, their body is telling you breathing is hard work. Don\'t lay them flat.',
                hint: ''
            },
            {
                id: 'css-39',
                front: 'Sacral oedema in a bedridden patient with breathlessness suggests:',
                options: ['Pressure injury from prolonged immobility', 'Right heart failure with dependent fluid accumulation', 'Deep vein thrombosis extending to the pelvis', 'Lymphatic obstruction'],
                correct: 1,
                explanation: 'Fluid always follows gravity — in mobile patients it collects in the ankles, in bedridden patients it collects in the sacral area. Sacral pitting oedema combined with breathlessness and raised JVP paints a clear picture of right heart failure.',
                hint: ''
            },
            {
                id: 'css-40',
                front: 'Jaundice is caused by:',
                options: ['Excess bilirubin accumulating in the tissues', 'Haemoglobin leaking from red blood cells', 'Carotene deposits from poor diet', 'Renal failure causing uraemia'],
                correct: 0,
                explanation: 'Bilirubin is a breakdown product of red blood cells. When the system backs up — liver disease, bile duct obstruction, or massive red cell destruction — bilirubin accumulates and deposits in the skin and sclera. The yellow eyes are often the most obvious early sign.',
                hint: ''
            },
            {
                id: 'css-41',
                front: 'McBurney\'s point tenderness is a classic sign of:',
                options: ['Renal colic', 'Ovarian cyst', 'Appendicitis', 'Inguinal hernia'],
                correct: 2,
                explanation: 'McBurney\'s point is two-thirds of the way between the umbilicus and the right anterior superior iliac spine — roughly where the appendix sits. Tenderness there, especially with rebound and guarding, is appendicitis until proven otherwise.',
                hint: ''
            },
            {
                id: 'css-42',
                front: 'Chvostek\'s sign (facial muscle twitch on tapping the cheek) indicates:',
                options: ['Facial nerve palsy', 'Hypocalcaemia', 'Trigeminal neuralgia', 'Meningism'],
                correct: 1,
                explanation: 'Low calcium makes nerves hyperexcitable — a gentle tap over the facial nerve causes the facial muscles to twitch involuntarily. Hypocalcaemia can cause tetany, seizures, and cardiac arrhythmias — it\'s more than just a chemical imbalance.',
                hint: ''
            },
            {
                id: 'css-43',
                front: 'Trousseau\'s sign (carpal spasm when inflating a BP cuff) also indicates:',
                options: ['Brachial artery occlusion', 'Peripheral neuropathy', 'Hypocalcaemia', 'Radial nerve palsy'],
                correct: 2,
                explanation: 'Inflate the cuff above systolic for a few minutes and the hand goes into a characteristic spasm. Trousseau\'s sign is actually more sensitive than Chvostek\'s for detecting hypocalcaemia.',
                hint: ''
            },
            {
                id: 'css-44',
                front: 'Grey Turner\'s sign (flank bruising) is associated with:',
                options: ['Renal trauma', 'Retroperitoneal haemorrhage — classically acute pancreatitis', 'Ruptured spleen', 'Aortic dissection tracking into the flank'],
                correct: 1,
                explanation: 'Blood tracking through the retroperitoneal tissue planes emerges as bruising in the flanks — but it takes hours to appear. In a patient with severe epigastric pain radiating to the back and flank bruising, think acute pancreatitis or retroperitoneal bleed.',
                hint: ''
            },
            {
                id: 'css-45',
                front: 'Cullen\'s sign (periumbilical bruising) is associated with:',
                options: ['Bowel perforation', 'Splenic rupture', 'Retroperitoneal haemorrhage — classically acute pancreatitis', 'Ruptured ectopic pregnancy only'],
                correct: 2,
                explanation: 'Same principle as Grey Turner\'s — blood tracking through tissue planes but appearing around the umbilicus instead of the flanks. Both signs together in a very unwell patient with abdominal pain suggests significant retroperitoneal haemorrhage.',
                hint: ''
            },
            {
                id: 'css-46',
                front: 'A painful, pulsatile abdominal mass. What must you consider?',
                options: ['Bowel obstruction', 'Enlarged spleen', 'Abdominal aortic aneurysm', 'Hepatomegaly from heart failure'],
                correct: 2,
                explanation: 'A pulsatile mass in the abdomen is the aorta until proven otherwise. An AAA that\'s symptomatic is a surgical emergency. Rapid transport, IV access, and do not waste time on scene.',
                hint: ''
            },
            {
                id: 'css-47',
                front: 'Urinary incontinence during a seizure is:',
                options: ['A definitive sign that the event was a true tonic-clonic seizure', 'One supportive feature — but not diagnostic alone', 'Only seen in temporal lobe epilepsy', 'A sign of spinal cord involvement'],
                correct: 1,
                explanation: 'It\'s a useful clue — but not diagnostic on its own. Some patients with syncope lose bladder control too. Build your picture from the whole history — witnesses, duration, postictal confusion, tongue biting.',
                hint: ''
            },
            {
                id: 'css-48',
                front: 'Pallor of the conjunctivae suggests:',
                options: ['Raised intracranial pressure', 'Jaundice', 'Anaemia', 'Carbon monoxide poisoning'],
                correct: 2,
                explanation: 'Pull down the lower eyelid — the inside should be a healthy pink-red. Pale, washed-out conjunctivae suggest low haemoglobin. In patients with dark skin where peripheral pallor is harder to assess, the conjunctivae are one of the most reliable places to look.',
                hint: ''
            },
            {
                id: 'css-49',
                front: 'A patient\'s breath smells of acetone or nail varnish remover. This is associated with:',
                options: ['Alcohol intoxication', 'Hepatic failure', 'Diabetic ketoacidosis', 'Uraemia'],
                correct: 2,
                explanation: 'Ketones are being produced in massive amounts as the body burns fat for fuel instead of glucose. Some of those ketones are exhaled as acetone. If you smell it on a sick, unwell patient, check the BM immediately.',
                hint: ''
            },
            {
                id: 'css-50',
                front: 'Bilateral basal crepitations in a breathless patient suggests:',
                options: ['Bilateral pneumonia only', 'Pulmonary oedema — fluid in the alveoli', 'Bilateral pleural effusions', 'Bronchiectasis'],
                correct: 1,
                explanation: 'Fine, crackly sounds at the bases of both lungs — like opening a strip of velcro — are the sound of fluid-filled alveoli popping open with each breath. Bilateral basal creps in a breathless patient with a cardiac history is pulmonary oedema until proven otherwise.',
                hint: ''
            }
        ]
    },

    {
        id: 'ecg',
        name: 'ECG Features',
        icon: 'bi-activity',
        iconColour: '#10b981',
        iconBg: '#ecfdf5',
        pro: true,
        cards: [
            {
                id: 'ecg-01',
                front: 'What does the P wave represent?',
                options: ['Ventricular depolarisation', 'Atrial depolarisation', 'Ventricular repolarisation', 'The AV node delay'],
                correct: 1,
                explanation: 'The small, rounded bump before the QRS — the atria receiving the signal from the SA node and contracting. No P waves? Think AF. P waves at a different rate to the QRS? Think heart block.',
                hint: ''
            },
            {
                id: 'ecg-02',
                front: 'What does the QRS complex represent?',
                options: ['Atrial repolarisation', 'The PR interval delay', 'Ventricular depolarisation', 'Ventricular repolarisation'],
                correct: 2,
                explanation: 'The big sharp spike — both ventricles receiving the electrical signal and contracting. Normal QRS is narrow and sharp, under 120 ms. Wide and bizarre means the signal is spreading abnormally through the ventricles.',
                hint: ''
            },
            {
                id: 'ecg-03',
                front: 'What does the T wave represent?',
                options: ['Atrial depolarisation', 'Ventricular depolarisation', 'The AV node conduction', 'Ventricular repolarisation'],
                correct: 3,
                explanation: 'The ventricles resetting after the contraction — electrically recharging for the next beat. Inverted, peaked, or flattened T waves can all mean something important is going on with the myocardium.',
                hint: ''
            },
            {
                id: 'ecg-04',
                front: 'What is the normal PR interval?',
                options: ['Less than 80 ms', '80–120 ms', '120–200 ms', '200–280 ms'],
                correct: 2,
                explanation: 'Three to five small squares on standard ECG paper. Longer than 200 ms means first-degree heart block — the signal is being delayed at the AV node.',
                hint: ''
            },
            {
                id: 'ecg-05',
                front: 'A prolonged PR interval greater than 200 ms indicates:',
                options: ['Second-degree heart block', 'Bundle branch block', 'First-degree heart block', 'Complete heart block'],
                correct: 2,
                explanation: 'Every P wave still gets through to the ventricles — it just takes longer than it should. First-degree block is usually benign on its own but in the context of an inferior MI it can progress.',
                hint: ''
            },
            {
                id: 'ecg-06',
                front: 'In second-degree heart block Mobitz type I (Wenckebach), what happens?',
                options: ['The PR interval is fixed but some P waves do not conduct', 'The PR interval progressively lengthens until a QRS is dropped', 'There is no relationship between P waves and QRS complexes', 'Every other P wave fails to conduct'],
                correct: 1,
                explanation: 'The AV node gets more and more fatigued with each beat until it finally gives up and drops one — then resets and starts again. Usually benign but tells you the AV node is struggling.',
                hint: ''
            },
            {
                id: 'ecg-07',
                front: 'In second-degree heart block Mobitz type II, what happens?',
                options: ['The PR interval progressively lengthens before a dropped beat', 'Fixed PR interval with occasional non-conducted P waves', 'Complete dissociation between P waves and QRS', 'Alternating conducted and non-conducted beats with variable PR'],
                correct: 1,
                explanation: 'No warning — the PR interval stays fixed and then suddenly a QRS just disappears. More sinister than Wenckebach because it can progress to complete heart block without warning.',
                hint: ''
            },
            {
                id: 'ecg-08',
                front: 'In third-degree (complete) heart block, what is happening?',
                options: ['Every other P wave fails to conduct to the ventricles', 'The PR interval is prolonged but all P waves conduct', 'The atria and ventricles are beating completely independently', 'The QRS is wide because of aberrant conduction'],
                correct: 2,
                explanation: 'Total electrical divorce between atria and ventricles — the SA node fires at its own rate, and a ventricular escape rhythm takes over to keep the patient alive. The escape rhythm is usually slow and unreliable — these patients can deteriorate rapidly.',
                hint: ''
            },
            {
                id: 'ecg-09',
                front: 'What is the normal QRS duration?',
                options: ['Less than 80 ms', 'Less than 120 ms', '120–160 ms', 'Up to 200 ms'],
                correct: 1,
                explanation: 'Three small squares or less. A narrow QRS means the impulse is spreading normally. Wider than 120 ms and the signal is taking an abnormal route — either a bundle branch block or a rhythm originating in the ventricles themselves.',
                hint: ''
            },
            {
                id: 'ecg-10',
                front: 'A wide QRS complex (greater than 120 ms) suggests:',
                options: ['Atrial flutter with rapid ventricular response', 'First-degree heart block', 'Supraventricular tachycardia', 'Bundle branch block or ventricular origin rhythm'],
                correct: 3,
                explanation: 'Wide and bizarre means abnormal conduction. Wide complex tachycardia should always be treated as VT until proven otherwise.',
                hint: ''
            },
            {
                id: 'ecg-11',
                front: 'In right bundle branch block, which leads show the characteristic RSR’ pattern?',
                options: ['Leads I and aVL', 'Leads II, III and aVF', 'Leads V1 and V2', 'Leads V4 to V6'],
                correct: 2,
                explanation: 'RBBB gives you that classic M-shaped pattern in V1 — two R waves with a dip between them. The right ventricle is depolarising late via an abnormal route because its bundle branch is blocked. You also get wide, slurred S waves in leads I and V6.',
                hint: ''
            },
            {
                id: 'ecg-12',
                front: 'In left bundle branch block, the QRS in lead V1 appears:',
                options: ['Tall and narrow with a sharp peak', 'M-shaped with two positive deflections', 'Broad and mainly negative — a W pattern', 'Identical to right bundle branch block'],
                correct: 2,
                explanation: 'LBBB gives you a broad, deep, mainly negative QRS in V1. In V6 you get a broad, positive QRS. The key clinical point is that LBBB makes the rest of the ECG almost uninterpretable for ischaemia.',
                hint: ''
            },
            {
                id: 'ecg-13',
                front: 'What is the significance of new left bundle branch block in a patient with chest pain?',
                options: ['It is a normal variant and can be ignored', 'It suggests old myocardial damage only', 'It should be treated as an MI equivalent', 'It only matters if the QRS is wider than 160 ms'],
                correct: 2,
                explanation: 'New LBBB plus chest pain equals STEMI equivalent in most guidelines — the block can mask ST changes making it impossible to interpret the ECG for ischaemia in the usual way. Treat it as a cardiac emergency.',
                hint: ''
            },
            {
                id: 'ecg-14',
                front: 'What does ST elevation indicate?',
                options: ['Myocardial ischaemia without infarction', 'Ventricular repolarisation abnormality only', 'Acute myocardial injury — possible STEMI', 'Right bundle branch block'],
                correct: 2,
                explanation: 'The ST segment should sit on the baseline. Elevation means myocardial cells are injured. In the right clinical context with reciprocal changes in opposing leads, ST elevation means a coronary artery is blocked and myocardium is dying.',
                hint: ''
            },
            {
                id: 'ecg-15',
                front: 'What does ST depression suggest?',
                options: ['Acute full thickness myocardial infarction', 'Myocardial ischaemia or NSTEMI', 'Pericarditis', 'Benign early repolarisation'],
                correct: 1,
                explanation: 'The myocardium is struggling for oxygen but not yet dying — or it\'s an NSTEMI where infarction is occurring in the subendocardial layers. Either way, it\'s not a normal finding and deserves serious attention.',
                hint: ''
            },
            {
                id: 'ecg-16',
                front: 'Saddle-shaped ST elevation across multiple leads without reciprocal changes suggests:',
                options: ['STEMI', 'Benign early repolarisation', 'Pericarditis', 'Left ventricular hypertrophy'],
                correct: 2,
                explanation: 'Pericarditis causes widespread ST elevation because the inflammation surrounds the whole heart — unlike STEMI where changes are localised. The shape is concave upward like a saddle, and there are usually no reciprocal depressions.',
                hint: ''
            },
            {
                id: 'ecg-17',
                front: 'What is atrial fibrillation characterised by on ECG?',
                options: ['Regular rhythm with narrow QRS complexes', 'Sawtooth P waves at 300 bpm', 'Absent P waves with an irregularly irregular rhythm', 'Broad complex tachycardia with fusion beats'],
                correct: 2,
                explanation: 'No organised atrial activity means no P waves — just a chaotic, flickering baseline. The ventricular response is irregularly irregular — no two R-R intervals are the same. If the rhythm is irregular and you can’t find any P waves, it’s AF until proven otherwise.',
                hint: ''
            },
            {
                id: 'ecg-18',
                front: 'What is atrial flutter characterised by on ECG?',
                options: ['Absent P waves with completely irregular ventricular response', 'Sawtooth flutter waves at around 300 bpm, usually with regular ventricular response', 'Regular P waves with prolonged PR interval', 'Broad complex irregular tachycardia'],
                correct: 1,
                explanation: 'Classic flutter gives you that unmistakable sawtooth pattern — regular flutter waves at about 300 per minute. A regular tachycardia at exactly 150 bpm should always make you suspect flutter — look hard at the baseline between QRS complexes.',
                hint: ''
            },
            {
                id: 'ecg-19',
                front: 'Ventricular tachycardia on ECG is characterised by:',
                options: ['Narrow complex tachycardia with regular P waves', 'Irregular broad complex rhythm with no P waves', 'Regular broad complex tachycardia, usually over 120 bpm', 'Sawtooth baseline with regular QRS complexes'],
                correct: 2,
                explanation: 'Broad, fast, and regular — VT comes from the ventricles themselves so the QRS is wide and abnormal. If it’s broad complex tachycardia, treat it as VT until proven otherwise.',
                hint: ''
            },
            {
                id: 'ecg-20',
                front: 'Ventricular fibrillation on ECG appears as:',
                options: ['Regular broad complex tachycardia', 'Flat line with occasional escape beats', 'Completely chaotic, irregular waveforms with no identifiable QRS complexes', 'Sawtooth pattern at 300 bpm'],
                correct: 2,
                explanation: 'Chaos — no organised electrical activity, no recognisable waveforms. The ventricles are quivering, not contracting. No cardiac output. This is cardiac arrest — shock it.',
                hint: ''
            },
            {
                id: 'ecg-21',
                front: 'What is the ventricular rate in a typical atrial flutter with 2:1 block?',
                options: ['75 bpm', '100 bpm', '150 bpm', '300 bpm'],
                correct: 2,
                explanation: 'Flutter waves fire at about 300 per minute — with 2:1 block, every other one gets through. 300 divided by 2 gives you 150. A regular tachycardia at exactly 150 bpm should always make you suspect flutter.',
                hint: ''
            },
            {
                id: 'ecg-22',
                front: 'What does a delta wave on ECG indicate?',
                options: ['Hyperkalaemia', 'Right bundle branch block', 'Wolff-Parkinson-White syndrome', 'Left ventricular hypertrophy'],
                correct: 2,
                explanation: 'A delta wave is a slurred upstroke at the beginning of the QRS — caused by early ventricular activation through an accessory pathway bypassing the AV node. WPW can cause very rapid tachycardias and some treatments used for other SVTs can be dangerous in WPW.',
                hint: ''
            },
            {
                id: 'ecg-23',
                front: 'Tall, peaked T waves on ECG are a classic sign of:',
                options: ['Hypocalcaemia', 'Digoxin toxicity', 'Hyperkalaemia', 'Hypothermia'],
                correct: 2,
                explanation: 'High potassium makes the myocardium hyperexcitable — the first ECG change is tall, tented T waves. As potassium rises further you get widening QRS, then a sine wave pattern, then VF. Renal patients, diabetics in DKA, and crush injury patients are all at risk.',
                hint: ''
            },
            {
                id: 'ecg-24',
                front: 'A prolonged QT interval increases the risk of:',
                options: ['First-degree heart block', 'Atrial fibrillation', 'Torsades de pointes — a form of polymorphic ventricular tachycardia', 'Complete heart block'],
                correct: 2,
                explanation: 'A long QT means the ventricles are taking too long to repolarise — they\'re vulnerable to an early beat triggering a dangerous arrhythmia. Torsades de pointes can degenerate into VF. Long QT can be congenital or caused by electrolyte disturbances and drugs.',
                hint: ''
            },
            {
                id: 'ecg-25',
                front: 'J waves (Osborn waves) on ECG are associated with:',
                options: ['Hyperthermia', 'Hyperkalaemia', 'Hypothermia', 'Digoxin toxicity'],
                correct: 2,
                explanation: 'Osborn waves are positive deflections at the J point — the junction between the QRS and the ST segment. They\'re a classic ECG sign of hypothermia. A patient brought in from the cold with these on their ECG needs active rewarming — don’t call time of death in a hypothermic arrest.',
                hint: ''
            },
            {
                id: 'ecg-26',
                front: 'What ECG changes are associated with hypokalaemia?',
                options: ['Tall peaked T waves and wide QRS', 'Short QT interval and narrow QRS', 'Flattened T waves, U waves, and prolonged QT', 'Elevated ST segments in anterior leads'],
                correct: 2,
                explanation: 'Low potassium flattens the T waves and can make U waves appear — a small positive deflection after the T wave in leads V2–V4. The QT interval prolongs, raising the risk of dangerous arrhythmias.',
                hint: ''
            },
            {
                id: 'ecg-27',
                front: 'Which leads look at the inferior wall of the heart?',
                options: ['V1–V4', 'I, aVL, V5, V6', 'II, III, aVF', 'V1, V2, aVR'],
                correct: 2,
                explanation: 'The inferior leads look at the bottom of the heart, supplied mainly by the right coronary artery. An inferior MI gives ST elevation in these leads with reciprocal depression in I and aVL. Inferior MIs love to cause vagal symptoms — bradycardia, nausea, hypotension.',
                hint: ''
            },
            {
                id: 'ecg-28',
                front: 'Which leads look at the anterior wall of the heart?',
                options: ['II, III, aVF', 'I, aVL', 'V1–V4', 'V5, V6'],
                correct: 2,
                explanation: 'The anterior leads look at the front of the left ventricle, supplied by the left anterior descending artery. Anterior MIs tend to be the big ones — the LAD supplies a large territory and these carry significant risk of cardiogenic shock.',
                hint: ''
            },
            {
                id: 'ecg-29',
                front: 'Which leads look at the lateral wall of the heart?',
                options: ['II, III, aVF', 'V1–V4', 'I, aVL, V5, V6', 'V1, V2, aVR'],
                correct: 2,
                explanation: 'The lateral wall of the left ventricle is seen in leads I, aVL, V5, and V6 — supplied by the circumflex artery or diagonal branches of the LAD. Lateral ST changes often accompany anterior or inferior changes as part of a larger territory infarction.',
                hint: ''
            },
            {
                id: 'ecg-30',
                front: 'Reciprocal ST depression in leads opposite an area of ST elevation confirms:',
                options: ['Widespread pericarditis', 'Anterior ischaemia masking inferior changes', 'True ST elevation MI with reciprocal changes', 'Benign early repolarisation'],
                correct: 2,
                explanation: 'Reciprocal changes are your confirmation that ST elevation is real and significant. An inferior STEMI causing ST elevation in II, III, aVF will show reciprocal depression in I and aVL. Seeing both increases your confidence significantly.',
                hint: ''
            },
            {
                id: 'ecg-31',
                front: 'What is the significance of aVR ST elevation?',
                options: ['It is always a normal variant', 'It indicates inferior STEMI', 'It suggests left main stem or proximal LAD occlusion', 'It is only significant with bundle branch block'],
                correct: 2,
                explanation: 'ST elevation in aVR is one of the most ominous ECG findings — it suggests occlusion of the left main coronary artery or the very proximal LAD, which supplies a massive territory. Global ST depression with aVR elevation is a pattern worth knowing.',
                hint: ''
            },
            {
                id: 'ecg-32',
                front: 'A regular narrow complex tachycardia at 180 bpm is most likely:',
                options: ['Ventricular tachycardia', 'Atrial fibrillation', 'Supraventricular tachycardia', 'Atrial flutter with 1:1 conduction'],
                correct: 2,
                explanation: 'Regular, narrow, and fast — SVT uses the normal conduction system so the QRS is narrow. Rate is typically 150–250 bpm and it tends to start and stop suddenly.',
                hint: ''
            },
            {
                id: 'ecg-33',
                front: 'What is the normal axis on a 12-lead ECG?',
                options: ['Minus 90 to 0 degrees', '0 to minus 30 degrees', 'Minus 30 to plus 90 degrees', 'Plus 90 to plus 180 degrees'],
                correct: 2,
                explanation: 'The normal axis runs between minus 30 and plus 90 degrees — roughly pointing down and to the left, toward the bulk of the left ventricular muscle. Left axis deviation can suggest left anterior fascicular block or inferior MI.',
                hint: ''
            },
            {
                id: 'ecg-34',
                front: 'Left axis deviation is defined as an axis more negative than:',
                options: ['0 degrees', 'Minus 30 degrees', 'Minus 60 degrees', 'Minus 90 degrees'],
                correct: 1,
                explanation: 'A quick way to spot axis — look at leads I and aVF. Both positive means normal axis. Lead I positive, aVF negative means left axis deviation. Both negative means extreme axis deviation.',
                hint: ''
            },
            {
                id: 'ecg-35',
                front: 'Right axis deviation is defined as an axis greater than:',
                options: ['Plus 60 degrees', 'Plus 90 degrees', 'Plus 120 degrees', 'Plus 180 degrees'],
                correct: 1,
                explanation: 'Right axis deviation — lead I negative, aVF positive. Think about right ventricular strain from PE, chronic lung disease, or right ventricular hypertrophy.',
                hint: ''
            },
            {
                id: 'ecg-36',
                front: 'What does a Q wave indicate?',
                options: ['Incomplete right bundle branch block', 'Normal septal depolarisation in small amounts — pathological when deep and wide', 'Always old myocardial infarction', 'Atrial depolarisation on ventricular leads'],
                correct: 1,
                explanation: 'Small Q waves are normal in some leads — they represent normal septal depolarisation. Pathological Q waves are more than 25% of the height of the following R wave, or wider than 40 ms. They suggest old full-thickness infarction.',
                hint: ''
            },
            {
                id: 'ecg-37',
                front: 'Sinus bradycardia is defined as a sinus rhythm with a rate below:',
                options: ['70 bpm', '55 bpm', '60 bpm', '50 bpm'],
                correct: 2,
                explanation: 'Below 60 with normal P waves and normal PR interval — the SA node is just firing slowly. In a fit athlete it\'s completely normal. In a sick patient it could be vagal stimulation, inferior MI, hypothyroidism, or beta-blocker effect.',
                hint: ''
            },
            {
                id: 'ecg-38',
                front: 'Sinus tachycardia is most commonly caused by:',
                options: ['A re-entry circuit in the AV node', 'An accessory pathway bypassing the AV node', 'An underlying physiological cause — pain, fever, hypovolaemia, anxiety', 'An atrial ectopic focus firing faster than the SA node'],
                correct: 2,
                explanation: 'Sinus tachycardia is the heart responding to something — it\'s a symptom, not a diagnosis. Find the cause. Treating the tachycardia without treating the cause is missing the point entirely.',
                hint: ''
            },
            {
                id: 'ecg-39',
                front: 'A rhythm with no P waves and a flat line baseline is:',
                options: ['Fine ventricular fibrillation', 'Asystole', 'Pulseless electrical activity', 'Complete heart block'],
                correct: 1,
                explanation: 'Flat line — no electrical activity whatsoever. Before calling it, check your leads are connected and gain is adequate. A fine VF can look like asystole on a poor trace — check in more than one lead.',
                hint: ''
            },
            {
                id: 'ecg-40',
                front: 'Pulseless electrical activity (PEA) is defined as:',
                options: ['Organised electrical activity with a palpable pulse', 'Chaotic electrical activity with no cardiac output', 'Organised electrical activity on the monitor with no palpable pulse', 'Complete heart block with ventricular standstill'],
                correct: 2,
                explanation: 'The ECG looks like it should be producing a pulse — but there isn\'t one. Think 4Hs and 4Ts. A narrow complex PEA with a rate around 60 can suggest tamponade; a slow, broad complex PEA often indicates severe hypoxia or hyperkalaemia.',
                hint: ''
            },
            {
                id: 'ecg-41',
                front: 'How many small squares on standard ECG paper represent 1 second?',
                options: ['5 small squares', '10 small squares', '25 small squares', '50 small squares'],
                correct: 2,
                explanation: 'At standard paper speed of 25 mm per second, each small square is 40 ms and each large square is 200 ms. Five large squares equals one second.',
                hint: ''
            },
            {
                id: 'ecg-42',
                front: 'To quickly estimate heart rate from an ECG, you divide 300 by:',
                options: ['The number of small squares between P waves', 'The number of QRS complexes in a 6-second strip', 'The number of large squares between consecutive R waves', 'The PR interval in small squares'],
                correct: 2,
                explanation: 'Count the large squares between two adjacent R waves — then divide 300 by that number. One large square = 300 bpm, two = 150, three = 100, four = 75, five = 60.',
                hint: ''
            },
            {
                id: 'ecg-43',
                front: 'Epsilon waves and T wave inversion in the right precordial leads are associated with:',
                options: ['Brugada syndrome', 'Hypertrophic cardiomyopathy', 'Arrhythmogenic right ventricular cardiomyopathy', 'Long QT syndrome'],
                correct: 2,
                explanation: 'ARVC is a rare inherited condition where right ventricular muscle is replaced by fatty and fibrous tissue — a cause of sudden cardiac death in young athletes. Epsilon waves are small deflections at the end of the QRS in V1–V3.',
                hint: ''
            },
            {
                id: 'ecg-44',
                front: 'The Brugada pattern on ECG shows:',
                options: ['ST depression in V1 and V2 with a tall R wave', 'Coved ST elevation in V1–V2 with a right bundle branch block appearance', 'ST elevation across all precordial leads', 'Delta waves in V1–V3 with a short PR interval'],
                correct: 1,
                explanation: 'Brugada syndrome is a cause of sudden cardiac death in structurally normal hearts — often presenting as VF during rest or sleep. The ECG shows a characteristic coved (downsloping) ST elevation in V1–V2.',
                hint: ''
            },
            {
                id: 'ecg-45',
                front: 'In which condition does the ECG show a short PR interval and delta waves?',
                options: ['First-degree heart block', 'Lown-Ganong-Levine syndrome', 'Wolff-Parkinson-White syndrome', 'Brugada syndrome'],
                correct: 2,
                explanation: 'WPW has an accessory pathway — the Bundle of Kent — that bypasses the AV node and pre-excites the ventricles. This gives a short PR interval and a delta wave. The danger is that in AF, the accessory pathway can conduct very rapidly and trigger VF.',
                hint: ''
            },
            {
                id: 'ecg-46',
                front: 'ST elevation in leads V1–V4 with reciprocal depression in inferior leads suggests:',
                options: ['Inferior STEMI', 'Lateral STEMI', 'Anterior STEMI', 'Posterior STEMI'],
                correct: 2,
                explanation: 'Classic anterior STEMI — the LAD is blocked, the front wall of the left ventricle is dying. This is one of the bigger MIs you\'ll see — the LAD supplies a large amount of myocardium and these patients are at significant risk of cardiogenic shock.',
                hint: ''
            },
            {
                id: 'ecg-47',
                front: 'Posterior MI can be identified by:',
                options: ['ST elevation in V7–V9 and reciprocal tall R waves and ST depression in V1–V3', 'ST elevation in leads II, III, and aVF', 'Wide QRS with LBBB morphology', 'ST elevation in V4–V6'],
                correct: 0,
                explanation: 'Posterior MI is the one that hides — the standard 12-lead doesn\'t directly look at the posterior wall, so you see the mirror image instead: tall R waves and ST depression in V1–V3. Posterior leads V7–V9 confirm it.',
                hint: ''
            },
            {
                id: 'ecg-48',
                front: 'Which finding on ECG in the context of a suspected PE suggests right heart strain?',
                options: ['ST elevation in leads II, III, and aVF', 'Left bundle branch block', 'S1Q3T3 pattern', 'Delta waves and short PR interval'],
                correct: 2,
                explanation: 'S1Q3T3 — a deep S wave in lead I, a Q wave in lead III, and an inverted T wave in lead III. It suggests right heart strain from a large PE. Sinus tachycardia and right axis deviation are actually more commonly seen in PE.',
                hint: ''
            },
            {
                id: 'ecg-49',
                front: 'A rate of 300 bpm with a regular sawtooth baseline is most likely:',
                options: ['Ventricular fibrillation', 'Atrial fibrillation', 'Atrial flutter', 'Ventricular tachycardia'],
                correct: 2,
                explanation: 'Atrial flutter fires the atria at around 300 per minute — giving that regular, mechanical sawtooth pattern. The regularity is what distinguishes it from AF.',
                hint: ''
            },
            {
                id: 'ecg-50',
                front: 'In a 12-lead ECG, lead aVR primarily looks at:',
                options: ['The inferior wall of the left ventricle', 'The lateral wall of the left ventricle', 'The right atrium and outflow tract', 'The cavity of the left ventricle from the right shoulder'],
                correct: 3,
                explanation: 'aVR is the odd one out — it looks at the heart from the right shoulder, essentially looking into the cavity of the left ventricle. ST elevation in aVR is significant and suggests proximal LAD or left main stem occlusion.',
                hint: ''
            }
        ]
    },

    {
        id: 'terminology',
        name: 'Medical Terminology',
        icon: 'bi-journal-medical',
        iconColour: '#f59e0b',
        iconBg: '#fffbeb',
        pro: true,
        cards: [
            {
                id: 'med-01',
                front: 'What does the prefix \'tachy-\' mean?',
                options: ['Slow', 'Fast', 'Abnormal', 'Absent'],
                correct: 1,
                explanation: 'Tachycardia — fast heart. Tachypnoe — fast breathing. Tachy always means fast.',
                hint: ''
            },
            {
                id: 'med-02',
                front: 'What does the prefix \'brady-\' mean?',
                options: ['Fast', 'Irregular', 'Slow', 'Painful'],
                correct: 2,
                explanation: 'Bradycardia — slow heart. Bradypnoea — slow breathing. The opposite of tachy.',
                hint: ''
            },
            {
                id: 'med-03',
                front: 'What does the suffix \'-itis\' mean?',
                options: ['Removal of', 'Disease of', 'Inflammation of', 'Rupture of'],
                correct: 2,
                explanation: 'Appendicitis — inflammation of the appendix. Pericarditis — inflammation of the pericardium. \'-itis\' always means inflammation.',
                hint: ''
            },
            {
                id: 'med-04',
                front: 'What does the suffix \'-ectomy\' mean?',
                options: ['Surgical repair of', 'Surgical removal of', 'Surgical opening of', 'Inflammation of'],
                correct: 1,
                explanation: 'Appendicectomy — removal of the appendix. Splenectomy — removal of the spleen. A patient who has had a splenectomy is at significantly higher risk of overwhelming infection from certain bacteria.',
                hint: ''
            },
            {
                id: 'med-05',
                front: 'What does the suffix \'-ostomy\' mean?',
                options: ['Surgical removal of an organ', 'Surgical repair of a structure', 'Surgical creation of an opening', 'Examination of the inside of a structure'],
                correct: 2,
                explanation: 'A colostomy is a surgically created opening between the colon and the abdominal wall. A tracheostomy is a surgical opening into the trachea. \'-ostomy\' always means a new opening has been made.',
                hint: ''
            },
            {
                id: 'med-06',
                front: 'What does the prefix \'dys-\' mean?',
                options: ['Absent', 'Normal', 'Excessive', 'Difficult or abnormal'],
                correct: 3,
                explanation: 'Dyspnoea — difficulty breathing. Dysrhythmia — abnormal rhythm. Dysphagia — difficulty swallowing. Dys- tells you something isn\'t working as it should.',
                hint: ''
            },
            {
                id: 'med-07',
                front: 'What does the prefix \'hypo-\' mean?',
                options: ['Above or excessive', 'Below or deficient', 'Between or through', 'Around or surrounding'],
                correct: 1,
                explanation: 'Hypoglycaemia — low blood sugar. Hypotension — low blood pressure. Hypothermia — low body temperature. Hypo- always means below normal.',
                hint: ''
            },
            {
                id: 'med-08',
                front: 'What does the prefix \'hyper-\' mean?',
                options: ['Below normal', 'Absent', 'Above or excessive', 'Around or surrounding'],
                correct: 2,
                explanation: 'Hyperglycaemia — high blood sugar. Hypertension — high blood pressure. Hyperthermia — raised body temperature. Hyper- is above and hypo- is below.',
                hint: ''
            },
            {
                id: 'med-09',
                front: 'What does \'dyspnoea\' mean?',
                options: ['Absent breathing', 'Rapid breathing', 'Difficulty breathing', 'Painful breathing'],
                correct: 2,
                explanation: 'From dys- (difficult) and -pnoea (breathing). Dyspnoea is the patient\'s subjective experience of breathlessness. It doesn\'t tell you why — your job is to find the cause.',
                hint: ''
            },
            {
                id: 'med-10',
                front: 'What does \'orthopnoea\' mean?',
                options: ['Difficulty breathing when lying flat', 'Difficulty breathing on exertion', 'Breathlessness caused by anxiety', 'Noisy breathing during sleep'],
                correct: 0,
                explanation: 'From ortho- (upright) and -pnoea (breathing) — the patient can only breathe comfortably when upright. It\'s a classic symptom of left heart failure. Ask how many pillows they sleep with.',
                hint: ''
            },
            {
                id: 'med-11',
                front: 'What does \'haemoptysis\' mean?',
                options: ['Vomiting blood', 'Blood in the urine', 'Coughing up blood', 'Bleeding into the pleural space'],
                correct: 2,
                explanation: 'Haemo- (blood) and -ptysis (spitting). Coughing up blood — could be pulmonary embolism, tuberculosis, lung cancer, or severe chest infection. Always take it seriously.',
                hint: ''
            },
            {
                id: 'med-12',
                front: 'What does \'haematemesis\' mean?',
                options: ['Coughing up blood', 'Blood in the stool', 'Blood in the urine', 'Vomiting blood'],
                correct: 3,
                explanation: 'Haemo- (blood) and -emesis (vomiting). Upper gastrointestinal bleeding presenting as vomited blood. The colour matters — fresh red blood versus dark coffee-ground material tells you about the speed and source of bleeding.',
                hint: ''
            },
            {
                id: 'med-13',
                front: 'What does \'melaena\' mean?',
                options: ['Blood in the urine', 'Vomiting blood', 'Black, tarry stools from digested blood in the upper GI tract', 'Bright red rectal bleeding'],
                correct: 2,
                explanation: 'Melaena is the dark, sticky, foul-smelling stool produced when blood from the upper GI tract is digested as it travels through the gut. It suggests significant upper GI bleeding.',
                hint: ''
            },
            {
                id: 'med-14',
                front: 'What does \'syncope\' mean?',
                options: ['A seizure with loss of consciousness', 'A transient loss of consciousness due to global cerebral hypoperfusion', 'Dizziness without loss of consciousness', 'Confusion from metabolic causes'],
                correct: 1,
                explanation: 'A faint — brief, sudden loss of consciousness due to insufficient blood flow to the brain, with spontaneous recovery. Always take a careful history about what happened before, during, and after.',
                hint: ''
            },
            {
                id: 'med-15',
                front: 'What does \'diaphoresis\' mean?',
                options: ['Difficulty swallowing', 'Profuse sweating', 'Increased urination', 'Rapid breathing'],
                correct: 1,
                explanation: 'Profuse, abnormal sweating — a sign of sympathetic nervous system activation. Cold and clammy diaphoresis in a sick patient is the body responding to a serious threat — ACS, hypoglycaemia, shock.',
                hint: ''
            },
            {
                id: 'med-16',
                front: 'What does \'tachypnoea\' mean?',
                options: ['Slow breathing', 'Difficulty breathing', 'Absent breathing', 'Rapid breathing'],
                correct: 3,
                explanation: 'Tachy- (fast) and -pnoea (breathing). A respiratory rate above 20 in an adult. It\'s one of the earliest signs of physiological deterioration — the body trying to compensate for hypoxia, acidosis, pain, or shock.',
                hint: ''
            },
            {
                id: 'med-17',
                front: 'What does \'oedema\' mean?',
                options: ['Reduced urine output', 'Accumulation of excess fluid in body tissues', 'Inflammation of a vessel wall', 'Enlargement of an organ'],
                correct: 1,
                explanation: 'Swelling caused by fluid leaking from blood vessels into the surrounding tissues. Peripheral oedema in the ankles — think heart failure or venous insufficiency. The location tells you where the problem is.',
                hint: ''
            },
            {
                id: 'med-18',
                front: 'What does the abbreviation \'LOC\' stand for?',
                options: ['Level of care', 'Loss of circulation', 'Loss of consciousness', 'Limitation of capacity'],
                correct: 2,
                explanation: 'A fundamental term in prehospital documentation — always clarify whether LOC was complete or partial, how long it lasted, and whether there was full recovery.',
                hint: ''
            },
            {
                id: 'med-19',
                front: 'What does \'GCS\' stand for?',
                options: ['General Clinical Score', 'Glasgow Coma Scale', 'Global Consciousness Score', 'Graduated Clinical Scale'],
                correct: 1,
                explanation: 'The Glasgow Coma Scale — a standardised assessment of conscious level measuring eye opening, verbal response, and motor response. Always document the components separately (E4V5M6) rather than just the total.',
                hint: ''
            },
            {
                id: 'med-20',
                front: 'In the GCS, what does the motor score of 1 represent?',
                options: ['Withdraws from pain', 'Abnormal flexion', 'Extension to pain', 'No motor response'],
                correct: 3,
                explanation: '1 is the worst — no movement at all in response to pain. The motor component is the most clinically significant part of the GCS. A drop in motor score is a more serious finding than a drop in verbal score.',
                hint: ''
            },
            {
                id: 'med-21',
                front: 'What does \'AVPU\' stand for?',
                options: ['Alert, Voice, Pain, Unresponsive', 'Airway, Ventilation, Pulse, Unconscious', 'Alert, Verbal, Peripheral, Unreactive', 'Awake, Vocal, Painful, Unconscious'],
                correct: 0,
                explanation: 'A rapid conscious level assessment — simpler than GCS for initial triage. A patient who is V or below has a significantly impaired conscious level and their airway needs careful consideration. P on AVPU corresponds roughly to GCS 8.',
                hint: ''
            },
            {
                id: 'med-22',
                front: 'What does \'NEWS2\' stand for?',
                options: ['National Emergency Warning Score 2', 'National Early Warning Score 2', 'NHS Emergency Workload Score 2', 'National Evaluation of Warning Signs 2'],
                correct: 1,
                explanation: 'The standardised early warning score used across NHS England — it aggregates physiological measurements into a score that flags deteriorating patients. A score of 5 or above, or 3 in one parameter, triggers a clinical review.',
                hint: ''
            },
            {
                id: 'med-23',
                front: 'What does \'SOCRATES\' stand for in pain assessment?',
                options: ['Site, Onset, Character, Radiation, Associated symptoms, Time, Exacerbating/relieving, Severity', 'Symptoms, Origin, Colour, Radiation, Area, Type, Evaluation, Severity', 'Site, Onset, Cause, Radiation, Associated features, Treatment, Examination, Score', 'Severity, Onset, Character, Region, Aggravating, Timing, Exacerbation, Site'],
                correct: 0,
                explanation: 'The gold standard framework for assessing pain in a structured way. Use it consistently and you\'ll never miss an important feature of a pain history.',
                hint: ''
            },
            {
                id: 'med-24',
                front: 'What does \'SAMPLE\' stand for?',
                options: ['Symptoms, Allergies, Medications, Past history, Last meal, Events', 'Signs, Age, Medications, Previous illness, Location, Events', 'Symptoms, Assessment, Medical history, Pulse, Level of consciousness, Examination', 'Severity, Allergies, Medications, Presenting complaint, Last observations, Events'],
                correct: 0,
                explanation: 'The structured history framework — Symptoms, Allergies, Medications, Past medical history, Last oral intake, Events leading up to the call. A systematic SAMPLE means you won\'t arrive at hospital having missed that the patient is on warfarin.',
                hint: ''
            },
            {
                id: 'med-25',
                front: 'What does \'ATMIST\' stand for?',
                options: ['Age, Time, Mechanism, Injuries, Signs, Treatment', 'Assessment, Triage, Mechanism, Injury, Situation, Transfer', 'Age, Treatment, Monitoring, Investigations, Situation, Time', 'Airway, Time, Mechanism, Injuries, Symptoms, Transfer'],
                correct: 0,
                explanation: 'The structured pre-alert and handover tool — Age, Time of incident, Mechanism, Injuries found or suspected, Signs and symptoms, Treatment given. Practice it until it\'s automatic.',
                hint: ''
            },
            {
                id: 'med-26',
                front: 'What does \'ECG\' stand for?',
                options: ['Electrocardiogram', 'Electroencephalogram', 'Echocardiogram', 'Electroclinical graph'],
                correct: 0,
                explanation: 'The recording of the heart\'s electrical activity. Not to be confused with EEG (electroencephalogram — brain activity) or echo (echocardiogram — ultrasound of the heart).',
                hint: ''
            },
            {
                id: 'med-27',
                front: 'What does \'MI\' stand for?',
                options: ['Medical incident', 'Myocardial infarction', 'Mitral insufficiency', 'Muscular ischaemia'],
                correct: 1,
                explanation: 'Myocardial infarction — death of heart muscle from prolonged ischaemia. Myo- (muscle), -cardial (of the heart), infarction (tissue death from lack of blood supply).',
                hint: ''
            },
            {
                id: 'med-28',
                front: 'What does \'STEMI\' stand for?',
                options: ['Severe Tachycardia and ECG Myocardial Ischaemia', 'ST Elevation Myocardial Infarction', 'Subendocardial Tissue and Electrolyte Myocardial Injury', 'ST Elevation Mechanical Insufficiency'],
                correct: 1,
                explanation: 'ST Elevation Myocardial Infarction — a complete blockage of a coronary artery causing full thickness myocardial damage. Time-critical — the sooner the artery is reopened, the more muscle is saved.',
                hint: ''
            },
            {
                id: 'med-29',
                front: 'What does \'NSTEMI\' stand for?',
                options: ['No ST Elevation — Moderate ECG Myocardial Ischaemia', 'Non-ST Elevation Myocardial Infarction', 'Non-Specific T wave and ECG Myocardial Injury', 'Non-Sustained Tachycardia with ECG Myocardial Ischaemia'],
                correct: 1,
                explanation: 'A heart attack without ST elevation — the artery isn\'t completely blocked but myocardium is still being damaged. Clinically it can present identically to a STEMI — don\'t be reassured by a normal or near-normal ECG.',
                hint: ''
            },
            {
                id: 'med-30',
                front: 'What does \'CVA\' stand for?',
                options: ['Cardiac Vascular Arrest', 'Cerebrovascular Accident', 'Central Venous Access', 'Cardiovascular Assessment'],
                correct: 1,
                explanation: 'Cerebrovascular accident — the clinical term for a stroke. A sudden disruption to blood supply in the brain causing neurological deficits. Both ischaemic and haemorrhagic strokes are time-critical emergencies.',
                hint: ''
            },
            {
                id: 'med-31',
                front: 'What does \'TIA\' stand for?',
                options: ['Traumatic Intracranial Arterial injury', 'Transient Ischaemic Attack', 'Total Ischaemic Assessment', 'Temporary Intracranial Artery occlusion'],
                correct: 1,
                explanation: 'A TIA — mini-stroke — is a transient episode of neurological dysfunction resolving within 24 hours. It\'s a serious warning sign — the risk of a full stroke in the days following a TIA is significant.',
                hint: ''
            },
            {
                id: 'med-32',
                front: 'What does \'COPD\' stand for?',
                options: ['Chronic Obstructive Pulmonary Disease', 'Chronic Obstructive Pulmonary Disorder', 'Chronic Obstructive Pleural Disease', 'Chronic Onset Pulmonary Dysfunction'],
                correct: 0,
                explanation: 'Chronic Obstructive Pulmonary Disease — the umbrella term for chronic bronchitis and emphysema. Progressive, largely irreversible airflow limitation, usually from smoking.',
                hint: ''
            },
            {
                id: 'med-33',
                front: 'What does \'PE\' stand for in a clinical context?',
                options: ['Pulmonary Embolism', 'Peripheral Embolism', 'Pleural Effusion', 'Pulmonary Eosinophilia'],
                correct: 0,
                explanation: 'Pulmonary Embolism — a clot blocking a pulmonary artery. Presentation ranges from mild breathlessness to massive cardiovascular collapse and cardiac arrest. Always consider it in the breathless patient.',
                hint: ''
            },
            {
                id: 'med-34',
                front: 'What does \'DVT\' stand for?',
                options: ['Deep Venous Thrombosis', 'Diffuse Vascular Thrombosis', 'Deep Ventricular Tachycardia', 'Distal Vessel Thrombus'],
                correct: 0,
                explanation: 'Deep Vein Thrombosis — a clot forming in the deep veins, usually of the leg. The danger is that a piece breaks off and becomes a pulmonary embolism.',
                hint: ''
            },
            {
                id: 'med-35',
                front: 'What does \'DKA\' stand for?',
                options: ['Diabetic Ketoacidosis', 'Diabetic Keto-Alkalosis', 'Distal Kidney Acidosis', 'Diabetic Ketone Assessment'],
                correct: 0,
                explanation: 'Diabetic Ketoacidosis — a life-threatening complication of diabetes where lack of insulin causes the body to break down fat for fuel, producing ketones and acidifying the blood. Classic triad: hyperglycaemia, ketones, and metabolic acidosis.',
                hint: ''
            },
            {
                id: 'med-36',
                front: 'What does \'HHS\' stand for?',
                options: ['High Hyperglycaemic State', 'Hyperosmolar Hyperglycaemic State', 'Hyperglycaemic Hypertensive Syndrome', 'Hypernatraemic Hyperosmolar State'],
                correct: 1,
                explanation: 'HHS — the type 2 diabetic equivalent of DKA. Extremely high blood glucose causing severe dehydration. Unlike DKA there are minimal ketones. Blood glucose can be extraordinarily high — sometimes over 50 mmol/L.',
                hint: ''
            },
            {
                id: 'med-37',
                front: 'What does \'AAA\' stand for?',
                options: ['Acute Abdominal Assessment', 'Abdominal Aortic Aneurysm', 'Acute Arterial Aneurysm', 'Anterior Aortic Abnormality'],
                correct: 1,
                explanation: 'An abnormal dilation of the abdominal aorta — classically presenting as severe tearing back or abdominal pain with a pulsatile mass. A leaking AAA is immediately life-threatening. Rapid transport with pre-alert gives the best chance of survival.',
                hint: ''
            },
            {
                id: 'med-38',
                front: 'What does \'JVP\' stand for?',
                options: ['Jugular Venous Pulse', 'Jugular Vascular Pressure', 'Jugular Venous Perfusion', 'Jugular Vein Pulsation'],
                correct: 0,
                explanation: 'JVP — the visible pulsation in the internal jugular vein used to estimate right atrial pressure. Raised JVP indicates elevated venous pressure — right heart failure, cardiac tamponade, or tension pneumothorax.',
                hint: ''
            },
            {
                id: 'med-39',
                front: 'What does \'SpO2\' mean?',
                options: ['Serum partial pressure of oxygen', 'Peripheral oxygen saturation measured by pulse oximetry', 'Systemic pulmonary oxygen level', 'Standard partial oxygen saturation'],
                correct: 1,
                explanation: 'The percentage of haemoglobin in the peripheral circulation that is saturated with oxygen. Useful but has important limitations — it can\'t detect CO poisoning, it\'s unreliable with poor perfusion or nail varnish, and it tells you nothing about CO2.',
                hint: ''
            },
            {
                id: 'med-40',
                front: 'What does \'GI\' stand for?',
                options: ['General Illness', 'Gastrointestinal', 'Global Ischaemia', 'Generalised Inflammation'],
                correct: 1,
                explanation: 'Gastrointestinal — relating to the stomach and intestines. Upper GI bleeding causes melaena; lower GI bleeds tend to cause fresh rectal bleeding. The distinction helps guide the clinical picture.',
                hint: ''
            },
            {
                id: 'med-41',
                front: 'What does \'HCPC\' stand for?',
                options: ['Health and Care Professions Council', 'Health Care Professionals Committee', 'Healthcare Clinical Practice Council', 'Health Compliance and Practice Committee'],
                correct: 0,
                explanation: 'The Health and Care Professions Council — the regulatory body for paramedics in the UK. Registration is a legal requirement to practise. They set standards of proficiency, conduct, and continuing professional development.',
                hint: ''
            },
            {
                id: 'med-42',
                front: 'What does \'CPD\' stand for?',
                options: ['Clinical Practice Documentation', 'Continuing Professional Development', 'Certified Practice Designation', 'Clinical Performance Data'],
                correct: 1,
                explanation: 'Continuing Professional Development — the ongoing learning and reflection that keeps your practice up to date and your HCPC registration valid. Paramind CPD certificates count towards your portfolio.',
                hint: ''
            },
            {
                id: 'med-43',
                front: 'What does \'ABCDE\' stand for in systematic patient assessment?',
                options: ['Airway, Breathing, Circulation, Disability, Exposure', 'Airway, Blood pressure, Circulation, Deficit, Examination', 'Assessment, Breathing, Cardiac, Disability, Evaluation', 'Airway, Breathing, Cardiac output, Deficit, Environment'],
                correct: 0,
                explanation: 'The universal systematic approach to assessing any sick patient. Life threats are identified and treated as you go through each step. Never move to the next step without addressing what you\'ve found.',
                hint: ''
            },
            {
                id: 'med-44',
                front: 'What does \'ICP\' stand for?',
                options: ['Intracranial Pressure', 'Intercostal Pressure', 'Internal Cardiac Perfusion', 'Intrathoracic Circulatory Pressure'],
                correct: 0,
                explanation: 'The pressure inside the skull — normally around 5–15 mmHg. The skull is a rigid box, so any increase in volume raises the pressure. Cushing\'s triad is the clinical sign of critically raised ICP.',
                hint: ''
            },
            {
                id: 'med-45',
                front: 'What does \'MAP\' stand for?',
                options: ['Maximum Arterial Pressure', 'Mean Arterial Pressure', 'Minimal Adequate Perfusion', 'Measured Arterial Pulse'],
                correct: 1,
                explanation: 'The average pressure in the arteries throughout one cardiac cycle. Below 65 mmHg and organ perfusion starts to fail. It\'s a better guide to perfusion than systolic pressure alone.',
                hint: ''
            },
            {
                id: 'med-46',
                front: 'What does \'SVR\' stand for?',
                options: ['Systemic Venous Return', 'Systemic Vascular Resistance', 'Stroke Volume Ratio', 'Systolic Vascular Response'],
                correct: 1,
                explanation: 'The resistance the systemic blood vessels offer to blood flow. High SVR — the heart is working against significant resistance, as in hypertension. Low SVR — vessels are dilated and blood is pooling, as in septic shock or anaphylaxis.',
                hint: ''
            },
            {
                id: 'med-47',
                front: 'What does \'PEA\' stand for?',
                options: ['Post-Event Assessment', 'Pulseless Electrical Activity', 'Peripheral Electrical Abnormality', 'Pre-Existing Arrhythmia'],
                correct: 1,
                explanation: 'Cardiac arrest with organised electrical activity on the monitor but no palpable pulse. Always think reversible causes — 4Hs and 4Ts. PEA is not a diagnosis — it\'s a description of the monitor while you search for the cause.',
                hint: ''
            },
            {
                id: 'med-48',
                front: 'What does \'VF\' stand for?',
                options: ['Ventricular Failure', 'Vascular Fibrillation', 'Ventricular Fibrillation', 'Venous Flutter'],
                correct: 2,
                explanation: 'Chaotic, disorganised ventricular electrical activity producing no cardiac output — cardiac arrest. A shockable rhythm. Survival rates drop by approximately 10% for every minute without defibrillation.',
                hint: ''
            },
            {
                id: 'med-49',
                front: 'What does \'ROSC\' stand for?',
                options: ['Return of Spontaneous Circulation', 'Recovery of Sinus Cardiac Cycle', 'Restoration of Systemic Circulation', 'Rate of Spontaneous Cardiac Activity'],
                correct: 0,
                explanation: 'The moment a pulse returns after cardiac arrest — the goal of resuscitation. ROSC doesn\'t mean the patient is out of danger — post-cardiac arrest care is critical.',
                hint: ''
            },
            {
                id: 'med-50',
                front: 'What does \'DNACPR\' stand for?',
                options: ['Do Not Attempt Cardiopulmonary Resuscitation', 'Do Not Refer — Do Not Access Clinical Paramedic Resources', 'Directive for Natural Recovery — Do Not Attempt CPR', 'Decision Not to Resuscitate — Decision Not to Attempt CPR'],
                correct: 0,
                explanation: 'A legally valid clinical decision that CPR should not be attempted. A DNACPR applies only to CPR — it does not mean withdraw all care or treatment. Always check the document carefully, confirm it\'s valid, and treat the patient\'s other needs fully.',
                hint: ''
            }
        ]
    },

    {
        id: 'frameworks',
        name: 'Assessment Frameworks',
        icon: 'bi-list-check',
        iconColour: '#6366f1',
        iconBg: '#eef2ff',
        pro: true,
        cards: [
            {
                id: 'af-01',
                front: 'What does the \'A\' in ABCDE stand for?',
                options: ['Assessment', 'Airway', 'Alert', 'Abdomen'],
                correct: 1,
                explanation: 'Airway first — always. A blocked airway kills faster than anything else. Open it, maintain it, protect it. Everything else waits until you\'ve confirmed the airway is patent and protected.',
                hint: ''
            },
            {
                id: 'af-02',
                front: 'What does the \'D\' in ABCDE stand for?',
                options: ['Diagnosis', 'Defibrillation', 'Disability', 'Dressings'],
                correct: 2,
                explanation: 'Disability means neurological assessment — conscious level, pupils, blood glucose. AVPU or GCS, pupil response, and a BM. A deteriorating conscious level is one of the most important findings in a sick patient.',
                hint: ''
            },
            {
                id: 'af-03',
                front: 'What does the \'E\' in ABCDE stand for?',
                options: ['Examination', 'Evaluation', 'Exposure', 'Environment'],
                correct: 2,
                explanation: 'Expose the patient — you can\'t find what you can\'t see. Rashes, wounds, oedema, surgical scars, medical alert bracelets — all of these can change your entire management.',
                hint: ''
            },
            {
                id: 'af-04',
                front: 'In the ABCDE approach, when should you move from B to C?',
                options: ['After completing a full respiratory assessment', 'After treating any life-threatening airway or breathing problem first', 'Only if the patient is unconscious', 'After 60 seconds at each step regardless of findings'],
                correct: 1,
                explanation: 'Treat as you go — find a life threat, fix it, then move on. The sequence exists because the earlier letters kill faster than the later ones.',
                hint: ''
            },
            {
                id: 'af-05',
                front: 'What does the \'S\' in SOCRATES stand for?',
                options: ['Severity', 'Symptoms', 'Site', 'Source'],
                correct: 2,
                explanation: 'Where is the pain? Get the patient to point to it with one finger if possible. Site also helps you generate differentials — central chest pain has a very different list from right iliac fossa pain.',
                hint: ''
            },
            {
                id: 'af-06',
                front: 'What does the \'O\' in SOCRATES stand for?',
                options: ['Origin', 'Onset', 'Observation', 'Output'],
                correct: 1,
                explanation: 'When did it start and how did it start? Sudden onset chest pain is a different beast from pain that has built up over hours. A thunderclap headache — maximal at onset — is a subarachnoid haemorrhage until proven otherwise.',
                hint: ''
            },
            {
                id: 'af-07',
                front: 'What does the \'C\' in SOCRATES stand for?',
                options: ['Cause', 'Consistency', 'Character', 'Colour'],
                correct: 2,
                explanation: 'How does the pain feel? Sharp, stabbing, burning, crushing, tearing, dull, cramping? Character helps you generate differentials — crushing suggests ACS, tearing suggests dissection, burning suggests oesophageal causes.',
                hint: ''
            },
            {
                id: 'af-08',
                front: 'What does the \'R\' in SOCRATES stand for?',
                options: ['Resolution', 'Rate', 'Radiation', 'Response'],
                correct: 2,
                explanation: 'Does the pain go anywhere? Cardiac pain classically radiates to the left arm, jaw, or shoulder. Renal colic radiates from loin to groin. Diaphragmatic irritation radiates to the shoulder tip.',
                hint: ''
            },
            {
                id: 'af-09',
                front: 'What does the first \'A\' in SOCRATES stand for?',
                options: ['Aggravating factors', 'Associated symptoms', 'Allergies', 'Appearance'],
                correct: 1,
                explanation: 'What else is going on alongside the pain? Nausea and sweating with chest pain — think ACS. Breathlessness with pleuritic chest pain — think PE or pneumothorax. Associated symptoms can be the clue that turns a vague presentation into a clear clinical picture.',
                hint: ''
            },
            {
                id: 'af-10',
                front: 'What does the \'T\' in SOCRATES stand for?',
                options: ['Treatment', 'Tenderness', 'Type', 'Time course'],
                correct: 3,
                explanation: 'How long has it been going on, and has it changed over time? A pain that has been building for three days is different from one that started 20 minutes ago.',
                hint: ''
            },
            {
                id: 'af-11',
                front: 'What does the \'E\' in SOCRATES stand for?',
                options: ['Evaluation', 'Examination findings', 'Exacerbating and relieving factors', 'External causes'],
                correct: 2,
                explanation: 'What makes it better or worse? Pain worse on breathing suggests a pleuritic cause. Pain relieved by sitting forward suggests pericarditis. Exacerbating and relieving factors are often the most diagnostically specific part of a pain history.',
                hint: ''
            },
            {
                id: 'af-12',
                front: 'What does the final \'S\' in SOCRATES stand for?',
                options: ['Source', 'Severity', 'Symptoms', 'Spread'],
                correct: 1,
                explanation: 'Score the pain out of 10 — but use it as a baseline to measure change, not as an absolute judgement. More useful is asking how the severity compares to other pain they\'ve experienced and whether it\'s getting better or worse.',
                hint: ''
            },
            {
                id: 'af-13',
                front: 'What does the \'S\' in SAMPLE stand for?',
                options: ['Severity of presenting complaint', 'Signs and symptoms', 'Site of pain', 'Surgical history'],
                correct: 1,
                explanation: 'What is the patient experiencing — their presenting complaint and associated symptoms? This is your starting point for the history.',
                hint: ''
            },
            {
                id: 'af-14',
                front: 'What does the \'A\' in SAMPLE stand for?',
                options: ['Age', 'Assessment findings', 'Allergies', 'Acute history'],
                correct: 2,
                explanation: 'Always ask about allergies — specifically drug allergies and what reaction occurred. A documented penicillin allergy changes antibiotic options in hospital. Document the allergy and the reaction.',
                hint: ''
            },
            {
                id: 'af-15',
                front: 'What does the \'M\' in SAMPLE stand for?',
                options: ['Medical history', 'Mechanism of injury', 'Medications', 'Mental health history'],
                correct: 2,
                explanation: 'Current medications tell you a huge amount — they reveal diagnoses the patient hasn\'t mentioned, highlight drug interactions, and flag anticoagulants, beta-blockers, and diabetic medications. Get a full medication list including over-the-counter drugs.',
                hint: ''
            },
            {
                id: 'af-16',
                front: 'What does the \'P\' in SAMPLE stand for?',
                options: ['Presenting complaint', 'Past medical history', 'Pulse rate', 'Pain assessment'],
                correct: 1,
                explanation: 'Previous medical history — what conditions does the patient already have? A first seizure in someone with no history is a different situation from a known epileptic who missed their medication.',
                hint: ''
            },
            {
                id: 'af-17',
                front: 'What does the \'L\' in SAMPLE stand for?',
                options: ['Location of pain', 'Level of consciousness', 'Last oral intake', 'Last known vital signs'],
                correct: 2,
                explanation: 'When did they last eat or drink? Critical for unconscious patients regarding aspiration risk, and important for the anaesthetist if the patient needs emergency surgery.',
                hint: ''
            },
            {
                id: 'af-18',
                front: 'What does the \'E\' in SAMPLE stand for?',
                options: ['Examination findings', 'Events leading up to the call', 'Environmental factors', 'Estimated time of onset'],
                correct: 1,
                explanation: 'What was happening before the call? What were they doing when it started? Did anything change recently — new medication, missed dose, recent illness? The events preceding the call often contain the diagnosis.',
                hint: ''
            },
            {
                id: 'af-19',
                front: 'What does the \'A\' in ATMIST stand for?',
                options: ['Assessment findings', 'Airway status', 'Age', 'Arrival time'],
                correct: 2,
                explanation: 'Start your handover with the patient\'s age — it immediately contextualises everything that follows. A 25-year-old with chest pain is a different clinical picture from a 75-year-old with the same complaint.',
                hint: ''
            },
            {
                id: 'af-20',
                front: 'What does the \'T\' in ATMIST stand for?',
                options: ['Treatment given', 'Time of incident or onset', 'Temperature', 'Trauma mechanism'],
                correct: 1,
                explanation: 'When did this happen or when did symptoms start? Time is critical in stroke, MI, and trauma. The receiving team needs to know the time window to plan intervention.',
                hint: ''
            },
            {
                id: 'af-21',
                front: 'What does the \'M\' in ATMIST stand for?',
                options: ['Medical history', 'Medications given', 'Mechanism of injury or medical complaint', 'Mental state assessment'],
                correct: 2,
                explanation: 'For trauma — the mechanism tells the receiving team what forces were involved and what injuries to anticipate. For medical — what is the presenting complaint? The mechanism frames the entire handover.',
                hint: ''
            },
            {
                id: 'af-22',
                front: 'What does the \'I\' in ATMIST stand for?',
                options: ['Interventions performed', 'Injuries found or suspected', 'Initial observations', 'IV access obtained'],
                correct: 1,
                explanation: 'For trauma — what injuries have you found or do you suspect? Be specific and systematic — head, chest, abdomen, pelvis, limbs. This is where you communicate the clinical picture you\'ve identified on scene.',
                hint: ''
            },
            {
                id: 'af-23',
                front: 'What does the \'S\' in ATMIST stand for?',
                options: ['Surgical history', 'Scene information', 'Signs and symptoms', 'SpO2 reading'],
                correct: 2,
                explanation: 'The clinical findings — vital signs, examination findings, the patient\'s condition on your arrival and now. Heart rate, blood pressure, respiratory rate, SpO2, GCS, BM. Paint the picture for the receiving team.',
                hint: ''
            },
            {
                id: 'af-24',
                front: 'What does the final \'T\' in ATMIST stand for?',
                options: ['Transfer time', 'Time of arrival at scene', 'Treatment given', 'Triage category'],
                correct: 2,
                explanation: 'What have you done for this patient? Oxygen, IV access, analgesia, splinting, airway adjuncts — tell them what\'s been given, at what dose, and what response you saw.',
                hint: ''
            },
            {
                id: 'af-25',
                front: 'In the primary survey, which life threat is addressed at catastrophic haemorrhage control?',
                options: ['Airway obstruction', 'Tension pneumothorax', 'Catastrophic external haemorrhage', 'Altered conscious level'],
                correct: 2,
                explanation: 'Control catastrophic external haemorrhage before moving to airway. You can bleed to death faster than you can die from airway compromise — which is why some systems use <C>ABCDE.',
                hint: ''
            },
            {
                id: 'af-26',
                front: 'What is the purpose of a systematic assessment framework like ABCDE?',
                options: ['To ensure documentation is legally defensible', 'To prioritise findings based on what kills fastest', 'To complete the assessment as quickly as possible', 'To follow trust protocols regardless of patient condition'],
                correct: 1,
                explanation: 'ABCDE isn\'t bureaucracy — it\'s ordered by lethality. Airway problems kill in seconds, breathing problems in minutes, circulation in minutes to hours. Working through in order means you can\'t miss a life threat.',
                hint: ''
            },
            {
                id: 'af-27',
                front: 'When assessing breathing in ABCDE, which finding requires immediate intervention?',
                options: ['A respiratory rate of 18', 'A tension pneumothorax', 'Mild wheeze in a stable asthmatic', 'SpO2 of 96% in a young adult'],
                correct: 1,
                explanation: 'Tension pneumothorax under B is the life threat — progressive respiratory failure and cardiovascular collapse. Recognise it and intervene before moving to C.',
                hint: ''
            },
            {
                id: 'af-28',
                front: 'The Glasgow Coma Scale has three components. Which component carries the most clinical weight?',
                options: ['Eye opening', 'Verbal response', 'Motor response', 'All three are weighted equally'],
                correct: 2,
                explanation: 'The motor component is the most clinically significant. Always document the components separately — E4V5M6 tells you far more than just saying GCS 15. Changes in motor score are often the first sign of neurological deterioration.',
                hint: ''
            },
            {
                id: 'af-29',
                front: 'In the GCS, what score does eye opening to pain give?',
                options: ['E1', 'E2', 'E3', 'E4'],
                correct: 1,
                explanation: 'Eye opening: E4 spontaneous, E3 to voice, E2 to pain, E1 no response. Opening eyes to pain means the patient isn\'t responding to voice but has some response to a painful stimulus.',
                hint: ''
            },
            {
                id: 'af-30',
                front: 'A GCS of 8 or below is generally considered to indicate:',
                options: ['Mild confusion requiring monitoring', 'Moderate impairment — keep under review', 'Severe impairment — consider airway intervention', 'Brain death'],
                correct: 2,
                explanation: 'GCS of 8 or below is the traditional threshold for considering airway intervention. In prehospital practice, the decision depends on trajectory, cause, and available skills. But a GCS of 8 should make you think carefully about whether this airway is at risk.',
                hint: ''
            },
            {
                id: 'af-31',
                front: 'In AVPU, approximately which GCS score does P (responds to Pain) correspond to?',
                options: ['GCS 12', 'GCS 10', 'GCS 8', 'GCS 6'],
                correct: 2,
                explanation: 'P on AVPU corresponds roughly to GCS 8 — a significantly reduced conscious level. Any patient at P or below needs careful airway assessment.',
                hint: ''
            },
            {
                id: 'af-32',
                front: 'What are the six components of NEWS2?',
                options: ['Respiration rate, SpO2, heart rate, blood pressure, temperature, consciousness', 'Respiration rate, SpO2, heart rate, blood pressure, blood glucose, consciousness', 'Respiration rate, SpO2, heart rate, blood pressure, temperature, pain score', 'Respiration rate, SpO2, GCS, blood pressure, temperature, urine output'],
                correct: 0,
                explanation: 'Six physiological parameters — each scored 0 to 3 based on how far from normal they deviate. A score of 5 or more, or 3 in a single parameter, triggers a clinical response.',
                hint: ''
            },
            {
                id: 'af-33',
                front: 'Which additional consideration does NEWS2 add for COPD patients regarding SpO2?',
                options: ['SpO2 is not scored in COPD patients', 'A separate SpO2 scale targets 88–92% for patients with hypoxic respiratory failure', 'COPD patients receive double the SpO2 score', 'SpO2 is replaced by peak flow in COPD assessment'],
                correct: 1,
                explanation: 'NEWS2 has two SpO2 scales — Scale 1 for most patients targeting 95% and above, Scale 2 for patients with confirmed hypoxic respiratory failure targeting 88–92%.',
                hint: ''
            },
            {
                id: 'af-34',
                front: 'In FAST stroke assessment, what does F stand for?',
                options: ['Falls', 'Face', 'Fine motor skills', 'Focal neurology'],
                correct: 1,
                explanation: 'Face — ask the patient to smile and look for unilateral drooping. Facial asymmetry that is new is a significant finding. Combined with arm weakness and speech disturbance, a facial droop is part of the time-critical stroke picture.',
                hint: ''
            },
            {
                id: 'af-35',
                front: 'In FAST, what does the A stand for?',
                options: ['Alertness', 'Aphasia', 'Arms', 'Ataxia'],
                correct: 2,
                explanation: 'Ask the patient to raise both arms and hold them up — look for unilateral drift or weakness. Arm weakness is one of the most reliable indicators of a stroke.',
                hint: ''
            },
            {
                id: 'af-36',
                front: 'In FAST, what does the S stand for?',
                options: ['Sensation', 'Severity', 'Signs', 'Speech'],
                correct: 3,
                explanation: 'Speech — is it slurred, muddled, or absent? Ask the patient to repeat a simple phrase. Any speech abnormality in the context of facial and arm findings is a positive FAST.',
                hint: ''
            },
            {
                id: 'af-37',
                front: 'What additional assessment does MEND add beyond FAST?',
                options: ['Mental state, Eyes, Neglect, Dysarthria', 'Memory, Emotion, Nerves, Dizziness', 'Motor, Equilibrium, Neglect, Dysphasia', 'Motor, Eyes, Neurology, Dysphagia'],
                correct: 0,
                explanation: 'MEND adds assessment of cognition, eye movements and visual fields, spatial neglect, and speech and swallowing difficulties. It\'s a more detailed neurological screen for stroke used alongside FAST in UK prehospital practice.',
                hint: ''
            },
            {
                id: 'af-38',
                front: 'What does \'catastrophic haemorrhage\' mean in the context of <C>ABCDE?',
                options: ['Any bleeding requiring a dressing', 'Life-threatening external bleeding that will kill before airway management can be completed', 'Internal bleeding requiring surgical intervention', 'Bleeding from more than one site simultaneously'],
                correct: 1,
                explanation: 'Control catastrophic external haemorrhage first with direct pressure, tourniquet, or wound packing before moving to airway. You can\'t resuscitate someone who\'s bled out on the floor.',
                hint: ''
            },
            {
                id: 'af-39',
                front: 'In trauma assessment, what does mechanism of injury help you predict?',
                options: ['The patient\'s pain score', 'The likelihood of specific injury patterns', 'The appropriate destination hospital', 'The patient\'s GCS on arrival'],
                correct: 1,
                explanation: 'Mechanism tells you what forces the body was exposed to and therefore what injuries to look for. A restrained driver in a frontal impact — think sternal fracture, aortic injury, lower limb fractures.',
                hint: ''
            },
            {
                id: 'af-40',
                front: 'What does \'kinematics\' refer to in trauma assessment?',
                options: ['The speed of transport to hospital', 'The study of how forces cause injury', 'The patient\'s ability to move their limbs', 'The assessment of spinal cord function'],
                correct: 1,
                explanation: 'Kinematics is the science of motion and force — understanding how energy is transferred to the body in a trauma. Understanding kinematics helps you anticipate injuries that may not be immediately obvious.',
                hint: ''
            },
            {
                id: 'af-41',
                front: 'What is the primary purpose of a pre-alert call to hospital?',
                options: ['To satisfy trust protocol requirements', 'To allow the receiving team to prepare for a time-critical patient', 'To confirm the patient\'s destination', 'To get permission to transport the patient'],
                correct: 1,
                explanation: 'A good pre-alert means the trauma team, resuscitation bay, catheter lab, or stroke team is ready when you arrive — which directly improves outcomes for time-critical patients.',
                hint: ''
            },
            {
                id: 'af-42',
                front: 'In a structured handover, why should you give your information in a consistent order every time?',
                options: ['To meet HCPC documentation standards', 'To reduce the chance of critical information being omitted', 'To demonstrate professionalism to the receiving team', 'To ensure the handover takes less than 60 seconds'],
                correct: 1,
                explanation: 'Structure prevents omission. When handovers are unstructured, critical information gets missed — allergies, mechanism, a treatment that was given. ATMIST gives you a scaffold so that even in a chaotic situation, you work through the key points systematically.',
                hint: ''
            },
            {
                id: 'af-43',
                front: 'What does \'SBAR\' stand for?',
                options: ['Situation, Background, Assessment, Recommendation', 'Symptoms, Background, Actions, Response', 'Severity, Background, Assessment, Review', 'Situation, Baseline, Actions, Referral'],
                correct: 0,
                explanation: 'SBAR is a structured communication tool — Situation (what\'s happening), Background (relevant history), Assessment (what you think is going on), Recommendation (what you think needs to happen). Widely used in NHS settings.',
                hint: ''
            },
            {
                id: 'af-44',
                front: 'What should you do if a patient deteriorates while you are at E in ABCDE?',
                options: ['Complete the assessment before going back', 'Return to A and work through again', 'Skip to the most likely cause of deterioration', 'Call for backup before reassessing'],
                correct: 1,
                explanation: 'Deterioration means start again at A. The ABCDE approach isn\'t a one-time checklist — it\'s a continuous loop. Any change in the patient\'s condition means reassessing from the beginning.',
                hint: ''
            },
            {
                id: 'af-45',
                front: 'What does \'time-critical\' patient mean in prehospital practice?',
                options: ['Any patient requiring hospital assessment within 24 hours', 'A patient whose condition requires rapid transport to definitive care to prevent death or serious harm', 'A patient who has been waiting more than 30 minutes for an ambulance', 'Any patient with a NEWS2 score above 5'],
                correct: 1,
                explanation: 'Time-critical means the definitive treatment this patient needs can only be provided in hospital — and delay increases harm. STEMIs, strokes, major trauma, ruptured AAAs — these patients need to be moving, not waiting on scene.',
                hint: ''
            },
            {
                id: 'af-46',
                front: 'In paediatric assessment, what does the Paediatric Assessment Triangle assess?',
                options: ['Airway, breathing, and circulation', 'Appearance, work of breathing, and circulation to skin', 'Age, weight, and respiratory rate', 'Conscious level, skin colour, and pulse rate'],
                correct: 1,
                explanation: 'The PAT is a rapid visual tool you can complete in seconds from across the room. Appearance, Work of breathing, and Circulation to skin. It tells you immediately how sick this child is before you\'ve even touched them.',
                hint: ''
            },
            {
                id: 'af-47',
                front: 'What is the purpose of the \'Exposure\' step in ABCDE?',
                options: ['To assess environmental hazards at scene', 'To examine the whole body for hidden injuries or signs', 'To document the patient\'s clothing and belongings', 'To measure body temperature'],
                correct: 1,
                explanation: 'You can\'t find a stab wound through a shirt, a rash through trousers, or a medical alert bracelet on a covered wrist. Exposure means looking at the whole patient — front and back — while maintaining dignity and preventing heat loss.',
                hint: ''
            },
            {
                id: 'af-48',
                front: 'In the primary survey, what does disability assessment include as a minimum?',
                options: ['GCS, pupils, BM, and limb movement', 'GCS only', 'AVPU and limb strength', 'BM and pupil response only'],
                correct: 0,
                explanation: 'Minimum disability assessment — conscious level (AVPU or GCS), pupil size and reactivity, blood glucose. Each tells you something different. BM catches the hypoglycaemia that mimics everything from stroke to cardiac arrest.',
                hint: ''
            },
            {
                id: 'af-49',
                front: 'What does mechanism of injury in a paediatric patient require special consideration for?',
                options: ['Children have stronger bones so mechanism is less important', 'Non-accidental injury when mechanism does not match the injury pattern', 'Children always have higher energy mechanisms', 'Mechanism is less useful in children under 5'],
                correct: 1,
                explanation: 'Always consider whether the mechanism explains the injuries. A bruise in an unusual location, a fracture inconsistent with the history — these should prompt careful consideration of non-accidental injury.',
                hint: ''
            },
            {
                id: 'af-50',
                front: 'What is the single most important principle underlying all assessment frameworks?',
                options: ['Complete documentation of all findings', 'Following a fixed sequence regardless of findings', 'Treat life threats as you find them, reassess continuously', 'Arriving at a diagnosis before transporting'],
                correct: 2,
                explanation: 'Frameworks are tools, not scripts. The underlying principle is always the same — find what\'s killing the patient fastest and address it, then keep reassessing. Continuous reassessment is what separates competent prehospital care from a one-time checklist.',
                hint: ''
            }
        ]
    },

    {
        id: 'professional',
        name: 'Professional Practice',
        icon: 'bi-shield-check',
        iconColour: '#64748b',
        iconBg: '#f1f5f9',
        pro: true,
        cards: [
            {
                id: 'pro-01',
                front: 'Which organisation regulates paramedics in the United Kingdom?',
                options: ['The British Paramedic Association', 'The Nursing and Midwifery Council', 'The Health and Care Professions Council', 'The General Medical Council'],
                correct: 2,
                explanation: 'The HCPC is the statutory regulator for paramedics — registration is a legal requirement to practise. The HCPC sets standards of proficiency, conduct, and CPD that all registrants must meet.',
                hint: ''
            },
            {
                id: 'pro-02',
                front: 'How often must paramedics renew their HCPC registration?',
                options: ['Every year', 'Every two years', 'Every three years', 'Every five years'],
                correct: 1,
                explanation: 'HCPC registration renews every two years. Failure to renew means your registration lapses — and you cannot legally practise as a paramedic.',
                hint: ''
            },
            {
                id: 'pro-03',
                front: 'What is the primary purpose of the HCPC Standards of Proficiency for paramedics?',
                options: ['To set out the minimum pay scales for paramedics', 'To describe the knowledge, skills and behaviours required to practise safely and effectively', 'To provide a career development framework', 'To outline the scope of medications paramedics can administer'],
                correct: 1,
                explanation: 'The Standards of Proficiency describe what a paramedic must know, understand, and be able to do to be registered. They\'re the benchmark for safe and effective practice — not a ceiling, but a floor.',
                hint: ''
            },
            {
                id: 'pro-04',
                front: 'What does \'scope of practice\' mean for a paramedic?',
                options: ['The geographic area in which a paramedic is permitted to work', 'The range of roles, responsibilities, and activities a paramedic is educated, trained, and competent to perform', 'The list of medications a paramedic is allowed to carry', 'The level of clinical supervision required for newly qualified paramedics'],
                correct: 1,
                explanation: 'Scope of practice isn\'t just a list of skills — it\'s about competence. You should only practise within the limits of your knowledge, skills, and experience. Doing something you\'re not competent to do is unsafe practice and a professional conduct issue.',
                hint: ''
            },
            {
                id: 'pro-05',
                front: 'A paramedic is asked by a manager to perform a skill they have not been trained in. What should they do?',
                options: ['Attempt it with supervision', 'Refuse and explain they are not competent to perform it safely', 'Attempt it and document any difficulties afterwards', 'Defer to the manager\'s judgement as they have more experience'],
                correct: 1,
                explanation: 'Your obligation to practise safely overrides managerial pressure. Saying no to something you\'re not competent to do is professional responsibility. Document your refusal and your reasoning.',
                hint: ''
            },
            {
                id: 'pro-06',
                front: 'What is the legal basis for a competent adult refusing treatment?',
                options: ['The Mental Health Act 2007', 'The Mental Capacity Act 2005', 'The Care Act 2014', 'The Human Rights Act 1998'],
                correct: 1,
                explanation: 'The Mental Capacity Act 2005 establishes that a competent adult has the absolute right to refuse treatment — even if that decision may result in harm or death. Overriding a capacitous refusal is unlawful.',
                hint: ''
            },
            {
                id: 'pro-07',
                front: 'What are the two key principles when assessing capacity under the Mental Capacity Act?',
                options: ['The patient must be over 18 and have a diagnosis', 'Capacity is decision-specific and time-specific', 'Capacity must be formally assessed by a doctor', 'The patient must be able to communicate verbally'],
                correct: 1,
                explanation: 'Capacity is not all-or-nothing. A patient may have capacity to refuse a blood pressure check but not capacity to refuse life-saving surgery. Assess capacity for the specific decision, at the specific time.',
                hint: ''
            },
            {
                id: 'pro-08',
                front: 'Under the Mental Capacity Act, what are the four criteria for assessing capacity?',
                options: ['Understand, Retain, Weigh up, Communicate', 'Understand, Remember, Agree, Verbalise', 'Orientated, Lucid, Responsive, Communicative', 'Alert, Coherent, Rational, Expressive'],
                correct: 0,
                explanation: 'To have capacity a person must be able to understand the information, retain it long enough to make the decision, weigh it up to decide, and communicate their decision. Failure of any one means the person lacks capacity for that decision.',
                hint: ''
            },
            {
                id: 'pro-09',
                front: 'What does \'best interests\' mean when a patient lacks capacity?',
                options: ['Whatever the paramedic decides is clinically best', 'Whatever the family requests', 'The decision that is most likely to benefit the patient considering all relevant factors', 'The least invasive option available'],
                correct: 2,
                explanation: 'Best interests is a structured decision-making framework — it includes the patient\'s known wishes and values, views of those close to them, their cultural and religious beliefs, and their wellbeing.',
                hint: ''
            },
            {
                id: 'pro-10',
                front: 'A valid DNACPR form is present at the scene. What does this mean for your management?',
                options: ['Provide comfort care only — do not treat any condition', 'Do not attempt CPR if the patient arrests, but continue all other appropriate treatment', 'Contact medical control before providing any treatment', 'The document must be signed by the patient to be valid'],
                correct: 1,
                explanation: 'A DNACPR applies only to CPR — it does not mean withdraw all care. Continue to manage pain, breathlessness, and other symptoms. Treat reversible conditions.',
                hint: ''
            },
            {
                id: 'pro-11',
                front: 'What is an Advance Decision to Refuse Treatment (ADRT)?',
                options: ['A request by a patient for a specific treatment', 'A legally binding document in which a person refuses specific treatments in advance, in case they lose capacity', 'A power of attorney document giving a family member authority to make decisions', 'A hospital-issued document limiting treatment options'],
                correct: 1,
                explanation: 'An ADRT is a legally binding refusal. Valid means it was made by an adult with capacity, in writing, signed and witnessed for life-sustaining treatment refusals. Applicable means the current situation matches what the ADRT describes. If in doubt, treat.',
                hint: ''
            },
            {
                id: 'pro-12',
                front: 'What is a Lasting Power of Attorney (LPA) for health and welfare?',
                options: ['A document that allows a person to manage another\'s finances', 'A legal document appointing someone to make health and care decisions on behalf of a person who lacks capacity', 'A court order appointing a clinical guardian', 'An advance directive refusing specific treatments'],
                correct: 1,
                explanation: 'An LPA for health and welfare gives the named attorney legal authority to make treatment decisions when the donor lacks capacity. Not all family members have this authority — always ask specifically whether an LPA exists.',
                hint: ''
            },
            {
                id: 'pro-13',
                front: 'What does \'duty of candour\' require of a healthcare professional?',
                options: ['To report all errors to the police', 'To be open and honest with patients when something goes wrong', 'To document every clinical decision in writing', 'To disclose patient information to the public when in the public interest'],
                correct: 1,
                explanation: 'Duty of candour means being honest when things go wrong — telling the patient, apologising, explaining what happened and what will be done to prevent recurrence. Concealing errors is a serious professional conduct issue.',
                hint: ''
            },
            {
                id: 'pro-14',
                front: 'What is \'vicarious liability\' in a healthcare context?',
                options: ['The patient\'s right to claim compensation for clinical errors', 'An employer\'s legal responsibility for the actions of their employees carried out in the course of employment', 'A paramedic\'s personal liability for clinical decisions', 'The legal liability of a registrant acting outside their scope of practice'],
                correct: 1,
                explanation: 'Your employer is generally liable for your actions carried out in the course of your employment. However, it doesn\'t protect you from HCPC fitness to practise proceedings — professional accountability is separate from legal liability.',
                hint: ''
            },
            {
                id: 'pro-15',
                front: 'What is the difference between a \'criminal\' and a \'civil\' legal matter in healthcare?',
                options: ['Criminal matters involve complaints to the HCPC; civil matters involve police', 'Criminal matters are prosecuted by the state; civil matters involve private claims for compensation', 'Civil matters are more serious than criminal matters', 'There is no meaningful difference in healthcare contexts'],
                correct: 1,
                explanation: 'Criminal proceedings — the state prosecutes for gross negligence manslaughter or assault. Civil proceedings — a patient or family sues for compensation. Both can arise from the same incident. And either can coexist with a separate HCPC investigation.',
                hint: ''
            },
            {
                id: 'pro-16',
                front: 'What is \'informed consent\'?',
                options: ['A patient\'s signature on a consent form', 'Agreement to treatment given voluntarily by a patient who understands what they are consenting to', 'Verbal agreement to treatment regardless of understanding', 'Consent given by a family member on behalf of an adult'],
                correct: 1,
                explanation: 'Consent must be informed, voluntary, and given by someone with capacity. A signature alone doesn\'t make consent valid — the process matters.',
                hint: ''
            },
            {
                id: 'pro-17',
                front: 'What does \'implied consent\' mean in an emergency?',
                options: ['Consent given by a family member when the patient is unconscious', 'The assumption that an unconscious patient without a valid DNACPR or ADRT would consent to emergency treatment', 'Verbal consent given during a confused state', 'Consent that is documented after the event'],
                correct: 1,
                explanation: 'When a patient is unconscious and there is no valid advance refusal, you can act in their best interests under implied consent — the reasonable assumption that they would want life-saving treatment.',
                hint: ''
            },
            {
                id: 'pro-18',
                front: 'What are the Caldicott Principles primarily concerned with?',
                options: ['Safe handling of clinical equipment', 'Protection and appropriate use of patient information', 'Standards for documentation and record keeping', 'Procedures for reporting clinical incidents'],
                correct: 1,
                explanation: 'The Caldicott Principles govern how patient information is handled — only shared when necessary, with the minimum required, and only with those who need it. Breaching patient confidentiality without justification is a serious professional matter.',
                hint: ''
            },
            {
                id: 'pro-19',
                front: 'In what circumstances can patient confidentiality be breached without consent?',
                options: ['Never — confidentiality is absolute', 'When required by law, in the public interest, or to prevent serious harm', 'Whenever a family member requests information', 'Only with written authorisation from a senior clinician'],
                correct: 1,
                explanation: 'Confidentiality is not absolute. It can be overridden when there is a legal requirement, when there is a serious risk of harm, or when it is genuinely in the public interest. These are high bars. When in doubt, seek advice.',
                hint: ''
            },
            {
                id: 'pro-20',
                front: 'What is \'clinical negligence\'?',
                options: ['Any clinical error that harms a patient', 'A breach of the duty of care that causes harm', 'Practising outside your scope without causing harm', 'Failing to document a clinical decision'],
                correct: 1,
                explanation: 'For clinical negligence to be established: a duty of care existed, that duty was breached, and that breach caused harm. All three must be proven. Error alone, without harm, does not constitute negligence.',
                hint: ''
            },
            {
                id: 'pro-21',
                front: 'What does the Bolam test determine in clinical negligence cases?',
                options: ['Whether the patient was informed of risks', 'Whether the clinician\'s conduct met the standard of a responsible body of professional opinion', 'Whether the patient had capacity to consent', 'Whether the harm was foreseeable'],
                correct: 1,
                explanation: 'The Bolam test asks whether a responsible body of professionals in the same field would have acted in the same way. It\'s the legal benchmark for professional conduct in negligence claims.',
                hint: ''
            },
            {
                id: 'pro-22',
                front: 'What is the purpose of a Patient Report Form (PRF)?',
                options: ['To satisfy trust administrative requirements only', 'To provide a contemporaneous clinical record and handover document', 'To document only treatments administered', 'To record patient demographics for billing'],
                correct: 1,
                explanation: 'The PRF is a legal document and a clinical record. It documents your assessment, findings, decisions, and treatment. Incomplete, inaccurate, or falsified documentation is a professional conduct matter.',
                hint: ''
            },
            {
                id: 'pro-23',
                front: 'When should a PRF be completed?',
                options: ['Within 24 hours of the incident', 'Before the end of the shift', 'As soon as possible after the call, ideally contemporaneously', 'Only when the patient is transported to hospital'],
                correct: 2,
                explanation: 'Contemporaneous means written at the time — or as close to it as practically possible. Memory fades fast, especially after multiple calls. A PRF written hours later is less reliable and legally weaker than one completed immediately.',
                hint: ''
            },
            {
                id: 'pro-24',
                front: 'What does \'fitness to practise\' mean in HCPC terms?',
                options: ['Physical fitness to carry out the demands of the role', 'Meeting the standards required to remain on the register and practise safely', 'Passing annual clinical competency assessments', 'Completing mandatory training requirements'],
                correct: 1,
                explanation: 'Fitness to practise encompasses health, character, and competence. The HCPC can investigate concerns about any of these. A fitness to practise investigation can result in conditions, suspension, or removal from the register.',
                hint: ''
            },
            {
                id: 'pro-25',
                front: 'What is a \'duty of care\'?',
                options: ['A contractual obligation to an employer', 'A legal obligation to take reasonable care to avoid causing harm to those you are responsible for', 'A requirement to provide treatment regardless of patient wishes', 'An obligation to treat all patients equally regardless of clinical need'],
                correct: 1,
                explanation: 'A duty of care arises automatically when you attend a patient. It continues until care is handed over to an appropriate person or the patient is safely discharged. Abandoning a patient without ensuring they are safe is a breach of duty of care.',
                hint: ''
            },
            {
                id: 'pro-26',
                front: 'What does \'safeguarding\' mean in a prehospital context?',
                options: ['Securing the scene for personal safety', 'Protecting vulnerable people — children and adults — from abuse, neglect, and harm', 'Ensuring medications are stored securely on the vehicle', 'Protecting patient information from unauthorised access'],
                correct: 1,
                explanation: 'Safeguarding is everyone\'s business. If you have concerns that a child or vulnerable adult is being abused or neglected, you have a professional and legal duty to act. Document your concerns accurately and report through appropriate channels.',
                hint: ''
            },
            {
                id: 'pro-27',
                front: 'What are the categories of child abuse?',
                options: ['Physical, emotional, financial, neglect', 'Physical, emotional, sexual, neglect', 'Physical, psychological, sexual, financial', 'Physical, verbal, emotional, abandonment'],
                correct: 1,
                explanation: 'Four categories — physical abuse, emotional abuse, sexual abuse, and neglect. In prehospital practice, neglect is often the hardest to identify because it\'s about what isn\'t being done.',
                hint: ''
            },
            {
                id: 'pro-28',
                front: 'What is \'Gillick competence\'?',
                options: ['A legal test for assessing capacity in adults over 65', 'The principle that a child under 16 can consent to treatment if they have sufficient maturity and understanding', 'A framework for assessing capacity in patients with learning disabilities', 'The right of parents to refuse treatment on behalf of their child'],
                correct: 1,
                explanation: 'From the Gillick case — a child under 16 can consent to their own medical treatment if they fully understand what is proposed. Importantly, a Gillick competent child\'s refusal can be overridden by a parent or court — consent and refusal are treated differently.',
                hint: ''
            },
            {
                id: 'pro-29',
                front: 'What is the significance of Fraser guidelines?',
                options: ['They define safe manual handling techniques for paramedics', 'They set out criteria for providing contraceptive advice to under-16s without parental consent', 'They establish the framework for assessing Gillick competence', 'They govern the use of restraint in mental health emergencies'],
                correct: 1,
                explanation: 'Fraser guidelines specifically relate to contraceptive and sexual health advice for under-16s. They\'re often confused with Gillick competence, which is the broader principle. Both come from the same 1985 legal case but apply in different contexts.',
                hint: ''
            },
            {
                id: 'pro-30',
                front: 'What does \'professional boundaries\' mean in paramedic practice?',
                options: ['The geographic limits of a paramedic\'s operational area', 'The limits of appropriate professional relationships and behaviour with patients', 'The clinical limits of a paramedic\'s scope of practice', 'The boundary between prehospital and in-hospital care'],
                correct: 1,
                explanation: 'Professional boundaries protect patients from exploitation and maintain the trust on which healthcare depends. Developing personal relationships with patients, accepting significant gifts, or providing care to close family members all risk boundary violations.',
                hint: ''
            },
            {
                id: 'pro-31',
                front: 'What is \'whistleblowing\' in healthcare?',
                options: ['Reporting a colleague for minor clinical errors', 'Raising concerns about unsafe practice, wrongdoing, or risks to patient safety', 'Reporting patient information to the media', 'Filing a formal complaint about a manager'],
                correct: 1,
                explanation: 'Whistleblowing — raising concerns — is a professional and ethical duty. Protected disclosure legislation exists to prevent whistleblowers from being penalised. If internal routes fail, concerns can be raised with the HCPC, CQC, or NHS England.',
                hint: ''
            },
            {
                id: 'pro-32',
                front: 'What is \'reflective practice\'?',
                options: ['Reviewing clinical protocols annually', 'The process of thinking critically about your own practice to identify learning and improve future performance', 'Completing a formal incident report after every call', 'Observing a more experienced colleague\'s practice'],
                correct: 1,
                explanation: 'Reflection is how professionals learn from experience — not just doing, but thinking carefully about what happened, why, what you\'d do differently. It\'s a core HCPC CPD requirement and a genuine tool for improving practice.',
                hint: ''
            },
            {
                id: 'pro-33',
                front: 'What is the difference between \'ethics\' and \'law\' in clinical practice?',
                options: ['There is no meaningful difference — all ethical obligations are legally enforceable', 'Ethics concerns what is morally right; law concerns what is legally required — they often align but can differ', 'Law is more important than ethics in clinical decision-making', 'Ethics applies only to research; law governs clinical practice'],
                correct: 1,
                explanation: 'Something can be legal but ethically questionable — or ethical but technically unlawful. The four ethical principles provide a framework for decision-making alongside the law.',
                hint: ''
            },
            {
                id: 'pro-34',
                front: 'What are the four principles of medical ethics?',
                options: ['Autonomy, Beneficence, Non-maleficence, Justice', 'Consent, Confidentiality, Competence, Care', 'Safety, Dignity, Respect, Candour', 'Honesty, Accountability, Professionalism, Duty'],
                correct: 0,
                explanation: 'Autonomy — respecting the patient\'s right to decide. Beneficence — acting in their best interests. Non-maleficence — avoiding harm. Justice — fair treatment. These four principles underpin clinical ethics and help navigate difficult decisions.',
                hint: ''
            },
            {
                id: 'pro-35',
                front: 'What does \'non-maleficence\' mean?',
                options: ['Acting in the patient\'s best interests', 'Respecting the patient\'s right to make decisions', 'Avoiding causing harm', 'Distributing healthcare resources fairly'],
                correct: 2,
                explanation: 'First do no harm — primum non nocere. Non-maleficence isn\'t about never doing anything — it\'s about ensuring the potential benefit outweighs the potential harm.',
                hint: ''
            },
            {
                id: 'pro-36',
                front: 'What does \'beneficence\' mean?',
                options: ['Avoiding harm to the patient', 'Acting in the patient\'s best interests', 'Respecting the patient\'s autonomy', 'Treating all patients equally'],
                correct: 1,
                explanation: 'Do good — actively work to benefit the patient. It\'s in tension with autonomy when a patient refuses treatment that would benefit them. In a competent adult, autonomy wins.',
                hint: ''
            },
            {
                id: 'pro-37',
                front: 'What does \'clinical governance\' mean?',
                options: ['The management structure of an ambulance trust', 'A framework for continuous improvement in quality and safety of clinical care', 'The process of auditing patient report forms', 'The governance of clinical research in the NHS'],
                correct: 1,
                explanation: 'Clinical governance is the system through which NHS organisations are accountable for quality and safety. As a registrant, you\'re part of this system — raising concerns, participating in audit, and reflecting on practice all contribute.',
                hint: ''
            },
            {
                id: 'pro-38',
                front: 'What is a \'Serious Incident\' in NHS terms?',
                options: ['Any patient complaint requiring a formal response', 'An incident that has resulted in serious harm, or has the potential to, requiring formal investigation', 'Any adverse event documented on a PRF', 'A near-miss that did not result in patient harm'],
                correct: 1,
                explanation: 'Serious Incidents trigger a formal investigation process. Learning from SIs improves systems and prevents recurrence. Reporting them honestly is a professional obligation.',
                hint: ''
            },
            {
                id: 'pro-39',
                front: 'What is the purpose of a \'root cause analysis\' following a serious incident?',
                options: ['To identify and punish the individual responsible', 'To understand the underlying causes and contributing factors to prevent recurrence', 'To provide evidence for a legal claim', 'To satisfy CQC inspection requirements'],
                correct: 1,
                explanation: 'Root cause analysis is a learning tool, not a blame tool. It asks why something happened at every level — individual, team, system, and organisational. Most serious incidents have multiple contributing factors.',
                hint: ''
            },
            {
                id: 'pro-40',
                front: 'What does \'contemporaneous documentation\' mean?',
                options: ['Electronic documentation only', 'Documentation completed at or near the time of the events it describes', 'Documentation reviewed and approved by a senior clinician', 'Documentation that includes photographs and video evidence'],
                correct: 1,
                explanation: 'Written at the time — or as soon as practically possible afterwards. Contemporaneous records are legally more reliable. If a case ever goes to investigation or court, your PRF from the day is the primary evidence of what you did and why.',
                hint: ''
            },
            {
                id: 'pro-41',
                front: 'What are the HCPC Standards of Conduct, Performance and Ethics primarily concerned with?',
                options: ['Providing a curriculum for paramedic education', 'Describing the behaviour and conduct expected of all HCPC registrants', 'Setting clinical competency benchmarks for ambulance trusts', 'Outlining the disciplinary process for fitness to practise cases'],
                correct: 1,
                explanation: 'The Standards of Conduct, Performance and Ethics set out how HCPC registrants are expected to behave. They cover communication, confidentiality, candour, consent, and raising concerns. Every registrant is expected to know them.',
                hint: ''
            },
            {
                id: 'pro-42',
                front: 'What is \'cultural competence\' in paramedic practice?',
                options: ['The ability to speak multiple languages', 'The ability to understand and respond appropriately to the cultural needs of patients', 'Awareness of different religious dietary requirements', 'Formal training in cultural awareness approved by the HCPC'],
                correct: 1,
                explanation: 'Cultural competence means approaching every patient with curiosity, respect, and a willingness to adapt. Assumptions based on cultural stereotypes cause harm.',
                hint: ''
            },
            {
                id: 'pro-43',
                front: 'What does \'reasonable adjustments\' mean in the context of the Equality Act 2010?',
                options: ['Providing identical care to all patients regardless of need', 'Making appropriate changes to ensure disabled people are not substantially disadvantaged', 'Offering additional services to patients from minority backgrounds', 'Adjusting clinical protocols for elderly patients'],
                correct: 1,
                explanation: 'The Equality Act 2010 requires making reasonable adjustments so that disabled people are not put at substantial disadvantage. Reasonable means proportionate — not impossible.',
                hint: ''
            },
            {
                id: 'pro-44',
                front: 'What does \'implicit bias\' mean in healthcare?',
                options: ['Conscious prejudice against certain patient groups', 'Unconscious attitudes that affect clinical decisions and behaviour without awareness', 'The deliberate withholding of treatment based on protected characteristics', 'Assumptions made based on documented clinical evidence'],
                correct: 1,
                explanation: 'Implicit biases are the attitudes and stereotypes we hold unconsciously. Research shows they influence clinical decisions in ways practitioners are unaware of. Recognising and actively working to counteract them is part of equitable practice.',
                hint: ''
            },
            {
                id: 'pro-45',
                front: 'What is \'moral distress\' in paramedic practice?',
                options: ['Distress caused by a traumatic clinical incident', 'The distress experienced when you know the right thing to do but are prevented from doing it', 'Ethical disagreement with a colleague\'s clinical decision', 'Anxiety related to professional accountability'],
                correct: 1,
                explanation: 'Moral distress occurs when you can identify the ethical course of action but circumstances prevent you from taking it. It\'s common in prehospital practice and, unaddressed, contributes to burnout and disengagement.',
                hint: ''
            },
            {
                id: 'pro-46',
                front: 'What is the HCPC\'s definition of \'misconduct\'?',
                options: ['Any clinical error resulting in patient harm', 'Behaviour that falls seriously short of the standards expected of a registered professional', 'A breach of trust protocol or operational policy', 'Failure to complete mandatory training'],
                correct: 1,
                explanation: 'Misconduct is behaviour that falls seriously short of what is expected — not minor errors or single lapses in otherwise good practice. Serious misconduct can result in conditions, suspension, or removal from the register.',
                hint: ''
            },
            {
                id: 'pro-47',
                front: 'What does \'revalidation\' mean for HCPC registrants?',
                options: ['Re-sitting the paramedic qualifying examination every five years', 'Demonstrating continued fitness to practise through ongoing CPD and reflection', 'Completing a formal clinical assessment observed by a senior colleague', 'Reapplying for HCPC registration from scratch'],
                correct: 1,
                explanation: 'Revalidation is the ongoing process of demonstrating that you remain fit to practise — through CPD activities, reflection, professional development, and practice hours.',
                hint: ''
            },
            {
                id: 'pro-48',
                front: 'What is the legal status of a DNACPR signed only by a nurse?',
                options: ['Invalid — only doctors can sign DNACPR forms', 'Valid if the nurse had appropriate authority and it reflects the patient\'s wishes', 'Only valid in a community setting', 'Invalid without the patient\'s countersignature'],
                correct: 1,
                explanation: 'DNACPR authority varies by trust and setting — but a DNACPR signed by an appropriately authorised clinician, reflecting the patient\'s wishes and best interests, is legally valid.',
                hint: ''
            },
            {
                id: 'pro-49',
                front: 'What does \'clinical audit\' involve?',
                options: ['Financial review of clinical department budgets', 'Systematic review of clinical practice against defined standards to identify and drive improvement', 'Inspection of clinical equipment for compliance', 'Annual performance review of individual clinicians'],
                correct: 1,
                explanation: 'Clinical audit compares what is actually happening in practice against what should be happening. Where gaps are found, changes are made and the cycle repeats. Participating in audit is a professional responsibility.',
                hint: ''
            },
            {
                id: 'pro-50',
                front: 'What is the most fundamental obligation of a registered paramedic?',
                options: ['To follow trust protocols at all times', 'To meet Key Performance Indicators set by the ambulance trust', 'To prioritise the safety and wellbeing of patients', 'To maintain registration with the HCPC'],
                correct: 2,
                explanation: 'Everything else flows from this. Protocols, targets, and registration requirements all exist to serve patient safety and wellbeing. When they conflict — and sometimes they do — patient safety comes first.',
                hint: ''
            }
        ]
    },

    {
        id: 'catch',
        name: 'Things That Catch Paramedics Out',
        icon: 'bi-exclamation-triangle',
        iconColour: '#dc2626',
        iconBg: '#fef2f2',
        pro: true,
        cards: [
            {
                id: 'catch-01',
                front: 'A patient is pale, sweaty and has a HR of 45. What\'s the most likely cause?',
                options: ['Hypoglycaemia', 'Vasovagal syncope', 'Third-degree heart block', 'Inferior MI with vagal response'],
                correct: 3,
                explanation: 'Inferior MIs love to irritate the vagus nerve — so you get that classic bradycardia AND hypotension together. Don\'t be fooled into thinking a slow heart rate means a calm situation!',
                hint: ''
            },
            {
                id: 'catch-02',
                front: 'A 70-year-old on beta-blockers has a PE. What classic sign might be missing?',
                options: ['Pleuritic chest pain', 'Haemoptysis', 'Tachycardia', 'Dyspnoea'],
                correct: 2,
                explanation: 'Beta-blockers blunt the heart rate response — so your patient might not go tachycardic at all. Never rule out PE just because the HR looks fine!',
                hint: ''
            },
            {
                id: 'catch-03',
                front: 'You\'re called to a \'drunk\' patient. What should always be on your differential?',
                options: ['Labyrinthitis', 'Hypoglycaemia', 'Anxiety', 'Malingering'],
                correct: 1,
                explanation: 'Every \'drunk\' is hypoglycaemic until proven otherwise. The brain runs on glucose — starve it and the behaviour looks identical to alcohol intoxication. Always check that BM!',
                hint: ''
            },
            {
                id: 'catch-04',
                front: 'A patient has a GCS of 15 but unequal pupils. What does this tell you?',
                options: ['Nothing — anisocoria can be normal', 'Definite raised ICP', 'Opioid overdose', 'Brainstem herniation'],
                correct: 0,
                explanation: 'Up to 20% of people have naturally unequal pupils — it\'s called physiological anisocoria. Context is everything. Compare it to their baseline and look at the whole picture!',
                hint: ''
            },
            {
                id: 'catch-05',
                front: 'A patient with asthma has a silent chest. Is this reassuring?',
                options: ['Yes — the wheeze has resolved', 'No — it means critical airflow obstruction', 'Only if SpO2 is normal', 'Only if they can speak in sentences'],
                correct: 1,
                explanation: 'A silent chest in asthma is a red flag, not a green one. No wheeze means no air movement — there\'s literally nothing to wheeze with. This patient is in serious trouble.',
                hint: ''
            },
            {
                id: 'catch-06',
                front: 'SpO2 reads 98% in a suspected CO poisoning. Should you be reassured?',
                options: ['Yes — SpO2 is reliable here', 'No — pulse oximetry can\'t distinguish COHb', 'Only if the patient looks well', 'Yes if the patient is alert'],
                correct: 1,
                explanation: 'Pulse oximeters can\'t tell the difference between oxyhaemoglobin and carboxyhaemoglobin — they both read as normal! A CO patient can have a normal SpO2 and be in serious danger.',
                hint: ''
            },
            {
                id: 'catch-07',
                front: 'Your patient has a normal ECG. Can you rule out a heart attack?',
                options: ['Yes — a normal ECG excludes MI', 'No — up to 50% of MIs can show a normal initial ECG', 'Only if troponin is normal', 'Yes if the pain has resolved'],
                correct: 1,
                explanation: 'A normal ECG in the first few hours of an MI is surprisingly common. Clinical history is just as important as the trace. Treat the patient, not the monitor!',
                hint: ''
            },
            {
                id: 'catch-08',
                front: 'A patient has a seizure. After 5 minutes it stops on its own. What\'s your priority?',
                options: ['Discharge them — it\'s resolved', 'Airway, breathing, and postictal assessment', 'Ask them to walk to the ambulance', 'Give anticonvulsants immediately'],
                correct: 1,
                explanation: 'The postictal phase can mask serious problems — airway compromise, head injury, hypoglycaemia. Just because the seizure stopped doesn\'t mean the danger has!',
                hint: ''
            },
            {
                id: 'catch-09',
                front: 'A COPD patient has an SpO2 of 88%. Should you give high-flow O2 immediately?',
                options: ['Yes — always maximise oxygen', 'No — titrate to 88–92% to avoid hypoxic drive suppression', 'Only if they\'re unconscious', 'Yes if they\'re over 60'],
                correct: 1,
                explanation: 'Some COPD patients rely on their hypoxic drive to breathe. Flooding them with high-flow O2 can actually suppress their respiratory effort. Target 88–92% and watch them closely!',
                hint: ''
            },
            {
                id: 'catch-10',
                front: 'A patient is hyperventilating. What\'s the danger of assuming it\'s anxiety?',
                options: ['None — hyperventilation is always anxiety', 'You could miss a PE, DKA, or metabolic acidosis', 'It\'s always due to panic attacks in young women', 'There\'s no clinical risk'],
                correct: 1,
                explanation: 'Hyperventilation is the body\'s way of blowing off CO2 to compensate for acidosis — DKA, PE, sepsis, salicylate poisoning. Never assume it\'s just anxiety without ruling out the serious stuff first!',
                hint: ''
            },
            {
                id: 'catch-11',
                front: 'A patient has crushing central chest pain but a normal 12-lead. What\'s a key alternative diagnosis?',
                options: ['Costochondritis', 'Aortic dissection', 'Anxiety', 'GORD'],
                correct: 1,
                explanation: 'Aortic dissection can present exactly like an MI — but the 12-lead can look completely normal. If BP differs between arms and the pain is tearing or ripping, think aortic dissection!',
                hint: ''
            },
            {
                id: 'catch-12',
                front: 'An elderly patient falls with no apparent reason. What should you always consider?',
                options: ['Poor balance from ageing', 'A medical cause precipitating the fall', 'Alcohol intoxication', 'Slippery floor'],
                correct: 1,
                explanation: 'Elderly falls are rarely just tripped. Think about what caused the fall — syncope? Arrhythmia? Stroke? Hypoglycaemia? Treat the cause, not just the consequence!',
                hint: ''
            },
            {
                id: 'catch-13',
                front: 'A patient with a known psychiatric history is acutely confused. What\'s the priority?',
                options: ['Assume it\'s their mental illness', 'Rule out organic causes first', 'Contact their psychiatrist', 'Administer sedation'],
                correct: 1,
                explanation: 'Never blame a psychiatric history for an acute presentation until you\'ve ruled out hypoglycaemia, infection, hypoxia, or a head injury. Organic causes first — always!',
                hint: ''
            },
            {
                id: 'catch-14',
                front: 'You\'re called to a \'panic attack.\' The patient has tingling hands and feet. What else can cause this?',
                options: ['Nothing — it\'s classic hyperventilation', 'Hypocalcaemia, stroke, or spinal cord issue', 'Only anxiety-related conditions', 'Always peripheral neuropathy'],
                correct: 1,
                explanation: 'Tingling extremities can be hyperventilation — but also stroke, hypocalcaemia, or even a spinal cord problem. Do a proper neuro assessment before putting it down to anxiety!',
                hint: ''
            },
            {
                id: 'catch-15',
                front: 'A patient has a GCS of 3, pinpoint pupils, and RR of 6. What\'s the classic triad?',
                options: ['Alcohol overdose', 'Opioid toxidrome — coma, pinpoints, respiratory depression', 'Benzodiazepine overdose', 'Hypoglycaemia'],
                correct: 1,
                explanation: 'Coma, pinpoint pupils, and respiratory depression — that\'s the opioid triad. Know it, spot it fast. Respiratory depression is the killer here, so airway management is everything!',
                hint: ''
            },
            {
                id: 'catch-16',
                front: 'A patient has a normal blood pressure. Can you rule out shock?',
                options: ['Yes — normal BP means no shock', 'No — compensated shock can maintain BP until decompensation', 'Only in young patients', 'Yes if HR is below 100'],
                correct: 1,
                explanation: 'Young, fit patients can compensate brilliantly — HR rises, vessels constrict, and BP stays normal right up until the moment they fall off a cliff. Watch HR, skin perfusion, and cap refill, not just the BP!',
                hint: ''
            },
            {
                id: 'catch-17',
                front: 'A patient has the worst headache of their life. What must you consider?',
                options: ['Migraine', 'Subarachnoid haemorrhage', 'Tension headache', 'Medication overuse headache'],
                correct: 1,
                explanation: 'The thunderclap headache — sudden, severe, worst of their life — is a subarachnoid haemorrhage until proven otherwise. Don\'t let them sign a refusal without understanding the risk!',
                hint: ''
            },
            {
                id: 'catch-18',
                front: 'Your anaphylaxis patient is conscious and insists on sitting up. You allow it. What\'s the risk?',
                options: ['Nothing — position doesn\'t matter in anaphylaxis', 'Their BP can crash rapidly due to vasodilation and reduced venous return', 'It will help their breathing so it\'s always fine', 'It only matters if they\'re already hypotensive'],
                correct: 1,
                explanation: 'In anaphylaxis, massive vasodilation means blood pools away from the core. Sitting or standing suddenly can cause a catastrophic drop in blood pressure. Keep them flat, legs raised if tolerated.',
                hint: ''
            },
            {
                id: 'catch-19',
                front: 'A type 1 diabetic is hypoglycaemic but refuses treatment. What\'s the issue?',
                options: ['Their autonomy must be fully respected', 'Hypoglycaemia can impair capacity to refuse', 'Treat only if unconscious', 'Call the family for consent'],
                correct: 1,
                explanation: 'Low blood glucose directly impairs brain function — and therefore decision-making capacity. A hypoglycaemic patient refusing treatment may literally not have the capacity to make that decision. Assess carefully!',
                hint: ''
            },
            {
                id: 'catch-20',
                front: 'A patient has periorbital bruising with no facial trauma. What does this suggest?',
                options: ['Domestic violence', 'Basal skull fracture', 'Orbital cellulitis', 'Allergic reaction'],
                correct: 1,
                explanation: 'Raccoon eyes — periorbital bruising without direct facial injury — is a classic sign of a basal skull fracture. Look for Battle\'s sign behind the ear too. This patient needs a CT head!',
                hint: ''
            },
            {
                id: 'catch-21',
                front: 'Your patient is talking and alert but their breathing is very slow. What should you worry about?',
                options: ['Nothing — they\'re alert so airway is fine', 'Opioid-related respiratory depression before full arrest', 'Sleep apnoea', 'Normal variation'],
                correct: 1,
                explanation: 'Opioid patients can be apparently okay right up until their respiratory rate drops below the threshold for adequate ventilation. Talking doesn\'t mean breathing well. Count that respiratory rate!',
                hint: ''
            },
            {
                id: 'catch-22',
                front: 'A patient has a pulse but no recordable blood pressure. What\'s happening?',
                options: ['Equipment failure only', 'Profound hypotension — could be shock or tamponade', 'This is impossible', 'Hypertensive crisis'],
                correct: 1,
                explanation: 'Don\'t assume it\'s just a dodgy cuff. Profound hypotension from tension pneumothorax, cardiac tamponade, or massive haemorrhage can give you a central pulse but an unrecordable peripheral BP. Reassess everything!',
                hint: ''
            },
            {
                id: 'catch-23',
                front: 'An asthmatic child is very quiet and not distressed. Is this a good sign?',
                options: ['Yes — they\'ve calmed down', 'No — exhaustion in severe asthma looks like calm', 'Only if SpO2 is normal', 'Yes if they\'re not using accessory muscles'],
                correct: 1,
                explanation: 'A suddenly calm, quiet child in a severe asthma attack can be exhausted, not improved. When they stop fighting to breathe, they may be about to stop breathing altogether. This is a pre-arrest sign!',
                hint: ''
            },
            {
                id: 'catch-24',
                front: 'A patient reports jaw pain during exertion. What should this ring alarm bells for?',
                options: ['TMJ disorder', 'Referred pain from cardiac ischaemia', 'Dental infection', 'Stress-related tension'],
                correct: 1,
                explanation: 'Cardiac ischaemia can refer pain anywhere from the jaw to the epigastrium. If jaw pain comes on with exertion and resolves with rest, think angina or ACS. Don\'t get distracted by the unusual location!',
                hint: ''
            },
            {
                id: 'catch-25',
                front: 'A patient is confused, tachycardic, and has a temperature of 38.1°C. Is this sepsis?',
                options: ['No — temperature isn\'t high enough', 'Possibly — sepsis can present with a relatively low temperature', 'Only if there\'s a known infection source', 'No — confusion rules it out'],
                correct: 1,
                explanation: 'Sepsis doesn\'t always mean a raging fever. Some patients — especially the elderly and immunocompromised — can be septic with a near-normal or even low temperature. Think about the whole picture, not just the number!',
                hint: ''
            },
            {
                id: 'catch-26',
                front: 'A patient tells you they \'just feel weird.\' What\'s this vague presentation a red flag for?',
                options: ['Anxiety', 'Hypoglycaemia, ACS, or stroke', 'Dehydration only', 'Normal ageing'],
                correct: 1,
                explanation: 'When patients can\'t articulate what\'s wrong and just say \'I feel off,\' listen carefully. Vague symptoms in ACS, stroke, and hypoglycaemia are well documented — especially in women and diabetic patients.',
                hint: ''
            },
            {
                id: 'catch-27',
                front: 'You arrive at a cardiac arrest. There\'s no shockable rhythm. What should you still think about?',
                options: ['Cease resuscitation', 'The 4Hs and 4Ts — reversible causes', 'Only PEA management', 'Family presence and comfort care'],
                correct: 1,
                explanation: 'Non-shockable doesn\'t mean non-survivable. Hypoxia, hypovolaemia, hypothermia, hyperkalaemia, tension pneumothorax, tamponade, toxins, thrombosis — find and fix the cause and you can save lives!',
                hint: ''
            },
            {
                id: 'catch-28',
                front: 'A patient has a penetrating chest injury and deteriorates rapidly. What\'s your first thought?',
                options: ['Open pneumothorax', 'Tension pneumothorax', 'Haemothorax', 'Cardiac contusion'],
                correct: 1,
                explanation: 'Penetrating chest trauma plus rapid deterioration — think tension pneumo first. Absent breath sounds and rising distress tell you air is trapped and the mediastinum is shifting.',
                hint: ''
            },
            {
                id: 'catch-29',
                front: 'Your patient was unconscious for 10 minutes but now responds to voice. What\'s still a priority?',
                options: ['Nothing — they\'ve recovered', 'Full assessment — the cause of LOC is still unknown', 'Only neurological assessment', 'Discharge with safety-netting advice'],
                correct: 1,
                explanation: 'Recovering consciousness doesn\'t mean the danger is gone — the cause of the loss of consciousness is the important thing. Arrhythmia, hypoglycaemia, TIA, carbon monoxide — any of these could recur.',
                hint: ''
            },
            {
                id: 'catch-30',
                front: 'A patient has a medical alert bracelet. You don\'t recognise the condition on it. What do you do?',
                options: ['Ignore it — focus on presenting complaint', 'Look it up or call for clinical advice — it\'s there for a reason', 'Assume it\'s outdated', 'Ask the patient — they\'ll know'],
                correct: 1,
                explanation: 'That bracelet is there because the patient or their doctor knew it was important in an emergency. If you don\'t know what it means, find out before you act — some conditions fundamentally change how you manage the patient!',
                hint: ''
            },
            {
                id: 'catch-31',
                front: 'A fit young patient with a first seizure is now alert and GCS 15. Can you discharge them?',
                options: ['Yes — they\'ve fully recovered', 'No — a first seizure always requires hospital assessment', 'Only if a family member is present', 'Yes if they have no headache'],
                correct: 1,
                explanation: 'A first seizure needs investigation — brain tumour, metabolic disturbance, infection, structural abnormality. A normal recovery doesn\'t tell you why it happened. Don\'t let a good GCS on scene lead to a discharge you\'ll regret.',
                hint: ''
            },
            {
                id: 'catch-32',
                front: 'A patient takes warfarin and has a minor head injury. They seem fine. Should you be concerned?',
                options: ['No — if GCS is 15 and there\'s no LOC, they\'re safe', 'Yes — anticoagulants significantly increase the risk of intracranial bleeding', 'Only if the patient is over 75', 'Only if there\'s visible bruising'],
                correct: 1,
                explanation: 'Anticoagulated patients are a different risk category entirely. A minor mechanism that would be fine in most people can cause significant intracranial bleeding in someone on warfarin, DOACs, or antiplatelet agents.',
                hint: ''
            },
            {
                id: 'catch-33',
                front: 'You treat a hypoglycaemic patient who recovers fully. They refuse transport. What\'s the risk?',
                options: ['None — they\'ve recovered and have capacity', 'Rebound hypoglycaemia if the underlying cause isn\'t addressed', 'Only a risk if they live alone', 'None if their BM is above 4 on recheck'],
                correct: 1,
                explanation: 'Treating the episode doesn\'t treat the cause. If they haven\'t eaten or if there\'s an underlying reason for the hypo, they can drop again — possibly when alone. Document your advice carefully and ensure they understand the risk.',
                hint: ''
            },
            {
                id: 'catch-34',
                front: 'A patient with chest pain has ST elevation in aVR with global ST depression. What does this suggest?',
                options: ['Benign early repolarisation', 'Pericarditis', 'Left main stem or proximal LAD occlusion', 'Posterior MI'],
                correct: 2,
                explanation: 'This is one of the most dangerous ECG patterns — global ischaemia from a proximal LAD or left main stem occlusion. Don\'t be falsely reassured because there\'s no obvious localised STEMI.',
                hint: ''
            },
            {
                id: 'catch-35',
                front: 'A patient has taken a paracetamol overdose four hours ago and feels completely well. How seriously should you take this?',
                options: ['Not very — they\'re well and the dose may have been small', 'Very seriously — paracetamol toxicity presents with delayed hepatic failure', 'Only if the dose exceeded 10 tablets', 'Only if they show signs of liver failure now'],
                correct: 1,
                explanation: 'Paracetamol overdose is insidious — the patient feels fine for 24–48 hours while the liver is being destroyed. All paracetamol overdoses need hospital assessment regardless of how well the patient appears.',
                hint: ''
            },
            {
                id: 'catch-36',
                front: 'A patient is found collapsed at home in winter, unconscious with a slow heart rate. What must you consider?',
                options: ['Opioid overdose only', 'Hypothermia', 'Stroke', 'Alcohol intoxication'],
                correct: 1,
                explanation: 'Hypothermia mimics death — bradycardia, low respiratory rate, reduced consciousness, cold peripheries. Never call time of death in a hypothermic patient without rewarming first. They\'re not dead until they\'re warm and dead.',
                hint: ''
            },
            {
                id: 'catch-37',
                front: 'A patient has severe abdominal pain that suddenly improves. Should you be reassured?',
                options: ['Yes — improvement means the problem is resolving', 'No — sudden pain relief in a surgical abdomen can indicate perforation or rupture', 'Only if vital signs are normal', 'Yes if the patient can walk'],
                correct: 1,
                explanation: 'Sudden relief of severe abdominal pain can mean the organ has perforated — the pressure is released and the pain temporarily eases. A patient who was in agony and is suddenly calm needs urgent reassessment, not reassurance.',
                hint: ''
            },
            {
                id: 'catch-38',
                front: 'A patient with known epilepsy is having their usual type of seizure. Is a BM still necessary?',
                options: ['No — it\'s clearly their epilepsy', 'Yes — hypoglycaemia can trigger seizures in known epileptics', 'Only if the seizure is prolonged', 'Only if they\'re diabetic'],
                correct: 1,
                explanation: 'Known epilepsy doesn\'t exclude hypoglycaemia as a trigger. Always check the BM — a low glucose explains the seizure, is easily treated, and changes your management.',
                hint: ''
            },
            {
                id: 'catch-39',
                front: 'A patient is behaving bizarrely and smells of alcohol. Your colleague says to leave them. What should you do?',
                options: ['Agree — alcohol explains the behaviour', 'Assess fully — alcohol doesn\'t exclude serious pathology', 'Take them to hospital only if they request it', 'Wait and reassess in 30 minutes'],
                correct: 1,
                explanation: 'Alcohol and serious illness are not mutually exclusive — they frequently coexist. A drunk patient can also have a head injury, a stroke, hypoglycaemia, or sepsis. The smell of alcohol is not a diagnosis.',
                hint: ''
            },
            {
                id: 'catch-40',
                front: 'A patient who was unconscious at scene is now GCS 15 on your arrival. Should you still transport?',
                options: ['No — if GCS is 15 they don\'t need hospital', 'Yes — any loss of consciousness requires assessment', 'Only if witnesses confirm loss of consciousness', 'Only if there\'s a head injury'],
                correct: 1,
                explanation: 'LOC with full recovery — lucid interval — is classic for an extradural haematoma. The patient looks fine while the bleed expands, then deteriorates rapidly. Any history of LOC with a head injury mechanism needs hospital assessment.',
                hint: ''
            },
            {
                id: 'catch-41',
                front: 'A 30-year-old woman with sharp chest pain is on the contraceptive pill and recently returned from a long-haul flight. What\'s your top differential?',
                options: ['Musculoskeletal chest wall pain', 'Pulmonary embolism', 'Pleuritis', 'Anxiety'],
                correct: 1,
                explanation: 'OCP plus long-haul flight is a textbook DVT/PE risk profile. Young age doesn\'t protect against PE — it just means paramedics sometimes don\'t think of it.',
                hint: ''
            },
            {
                id: 'catch-42',
                front: 'A patient with a head injury has a GCS of 15 and a single episode of vomiting. Do they need hospital assessment?',
                options: ['No — vomiting after a head injury is normal', 'Yes — vomiting is a red flag for intracranial injury', 'Only if vomiting recurs', 'Only if there was loss of consciousness'],
                correct: 1,
                explanation: 'Vomiting following a head injury is a red flag — it suggests raised intracranial pressure. Don\'t be falsely reassured by a normal GCS.',
                hint: ''
            },
            {
                id: 'catch-43',
                front: 'A patient has central crushing chest pain that resolves completely before you arrive. Should you still take it seriously?',
                options: ['No — resolved pain is not an emergency', 'Yes — resolved chest pain can be unstable angina or a resolved STEMI', 'Only if it lasted more than 20 minutes', 'Only in patients over 50'],
                correct: 1,
                explanation: 'Resolved chest pain is not safe chest pain. Unstable angina and even some MIs can present with episodes that come and go. The patient who feels fine now still needs a 12-lead, a careful history, and hospital assessment.',
                hint: ''
            },
            {
                id: 'catch-44',
                front: 'An elderly patient seems confused but their family say she\'s always like this. What should you do?',
                options: ['Accept the family\'s assessment — they know her best', 'Establish her baseline carefully — acute confusion in the elderly often has a serious cause', 'Document confusion as chronic and move on', 'Only investigate if she has a fever'],
                correct: 1,
                explanation: '\'Always like this\' deserves careful scrutiny. Families normalise gradual decline, and acute-on-chronic confusion can hide sepsis, UTI, stroke, or medication toxicity.',
                hint: ''
            },
            {
                id: 'catch-45',
                front: 'A patient in cardiac arrest has a history of renal failure. Which reversible cause should you specifically consider?',
                options: ['Hypovolaemia', 'Hyperkalaemia', 'Hypothermia', 'Hypomagnesaemia'],
                correct: 1,
                explanation: 'Renal failure patients can\'t excrete potassium — hyperkalaemia is a common and potentially fatal complication. In a renal patient in arrest, hyperkalaemia is high on your list of reversible causes.',
                hint: ''
            },
            {
                id: 'catch-46',
                front: 'A patient has a painful, pale, pulseless leg following a period of immobility. What does this suggest?',
                options: ['Deep vein thrombosis', 'Peripheral arterial occlusion', 'Compartment syndrome', 'Venous insufficiency'],
                correct: 1,
                explanation: 'The six Ps of acute limb ischaemia — Pain, Pallor, Pulselessness, Paraesthesia, Paralysis, Perishingly cold. This is an arterial emergency — the limb is dying. Don\'t mistake this for a DVT.',
                hint: ''
            },
            {
                id: 'catch-47',
                front: 'A patient with known heart failure has new confusion and a low-grade temperature. What should you consider?',
                options: ['Worsening heart failure', 'Sepsis precipitating cardiac decompensation', 'Medication toxicity', 'Hyponatraemia from diuretics'],
                correct: 1,
                explanation: 'Heart failure patients are vulnerable to infection — and sepsis in a heart failure patient is a dangerous combination. New confusion in a heart failure patient is a red flag — don\'t just treat the failure.',
                hint: ''
            },
            {
                id: 'catch-48',
                front: 'A patient was restrained by police before your arrival and is now quiet and compliant. What must you consider?',
                options: ['They\'ve calmed down — assessment can be routine', 'Excited delirium and the risk of sudden death in custody', 'Drug intoxication only', 'Exhaustion from the struggle'],
                correct: 1,
                explanation: 'Post-restraint patients are high risk — excited delirium, positional asphyxia, and the physiological aftermath of extreme agitation can all cause sudden deterioration. Quiet is not always safe.',
                hint: ''
            },
            {
                id: 'catch-49',
                front: 'A patient has a normal 12-lead ECG but tells you their pain is identical to a previous MI. What should you do?',
                options: ['Reassure them — the ECG is normal', 'Treat the history seriously and transport for further assessment', 'Repeat the ECG in 10 minutes and discharge if unchanged', 'Only transport if symptoms recur'],
                correct: 1,
                explanation: 'The patient knows their own body. If someone who has had an MI before tells you this feels the same, take that history seriously. A normal initial ECG does not exclude MI.',
                hint: ''
            },
            {
                id: 'catch-50',
                front: 'A patient is found unresponsive in a garage. CO is suspected. They appear cyanotic. What\'s unusual?',
                options: ['CO poisoning always causes cyanosis', 'CO poisoning classically causes cherry-red skin, not cyanosis — making the diagnosis easily missed', 'Cyanosis confirms CO poisoning', 'Skin colour is not relevant in CO poisoning'],
                correct: 1,
                explanation: 'The cherry-red skin of CO poisoning is a classic teaching point — but in reality it\'s rare and often only seen post-mortem. Most CO patients look normal or pale. Mechanism plus symptoms in a confined space is enough to suspect CO.',
                hint: ''
            }
        ]
    }

    // Future decks added here

];
