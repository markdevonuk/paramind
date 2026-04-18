/* ============================================================
   PARAMIND — FLASH CARD DATA
   js/flashcard-data.js

   All deck definitions and card content live here.
   Loaded by flashcards.html. Keep card logic in flashcards.html.

   Content rule: NO drug doses, treatment protocols, or calculations.
   All clinical content reflects UK prehospital practice.
============================================================ */

var FLASHCARD_DECKS = [

    // ==================== DECK 1: CARDIOVASCULAR A&P (FREE) ====================
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
                answer: 'The right atrium',
                explanation: 'Think of the right atrium as the heart\'s arrivals lounge. All the tired, deoxygenated blood from around the body pours in through two big veins \u2014 the superior vena cava from above and the inferior vena cava from below \u2014 before heading off to the lungs for a fresh oxygen top-up.',
                hint: 'The first stop blood makes when it arrives back at the heart.'
            },
            {
                id: 'cv-02',
                front: 'What is the function of the mitral valve?',
                answer: 'It stops blood flowing backwards from the left ventricle into the left atrium when the heart squeezes',
                explanation: 'When the left ventricle contracts, pressure shoots up fast. The mitral valve slams shut to make sure all that blood goes forward into the aorta \u2014 not backwards where it came from. It has two leaflets held in place by tiny tendinous cords, a bit like a parachute with guide ropes stopping it from inverting.',
                hint: 'It sits on the left side of the heart between two chambers \u2014 a one-way gate.'
            },
            {
                id: 'cv-03',
                front: 'What is the role of the sinoatrial (SA) node?',
                answer: 'It\'s the heart\'s natural pacemaker \u2014 it fires the electrical impulse that starts every single heartbeat',
                explanation: 'Tucked into the wall of the right atrium, the SA node fires spontaneously 60\u2013100 times a minute without being told to. Every heartbeat you\'ve ever had started here. The signal ripples out across both atria like a stone dropped in water, before reaching the AV node on its way to the ventricles.',
                hint: 'Every heartbeat starts here \u2014 it\'s the spark plug of the heart.'
            },
            {
                id: 'cv-04',
                front: 'What is cardiac output and how is it calculated?',
                answer: 'The total volume of blood the heart pumps every minute \u2014 heart rate multiplied by stroke volume',
                explanation: 'A typical resting adult pumps around 70 beats per minute, with about 70 ml going out each beat \u2014 that\'s roughly 5 litres a minute, your entire blood volume, going around the circuit every 60 seconds. When you\'re running a cardiac arrest, understanding cardiac output helps you grasp why CPR quality matters so much \u2014 poor compressions mean poor output.',
                hint: 'How fast the heart beats \u00d7 how much it pushes out each time.'
            },
            {
                id: 'cv-05',
                front: 'What is the normal resting heart rate range for an adult?',
                answer: '60\u2013100 beats per minute',
                explanation: 'Below 60 is bradycardia, above 100 is tachycardia \u2014 but context is everything. A fit cyclist with a resting rate of 48 is perfectly healthy because their heart pumps more blood with each beat. A frightened patient with a rate of 105 may just be anxious. The number only makes sense alongside everything else you\'re seeing.',
                hint: 'The range you\'d expect on a healthy adult at rest.'
            },
            {
                id: 'cv-06',
                front: 'What does the QRS complex represent on an ECG?',
                answer: 'Ventricular depolarisation \u2014 the electrical signal that triggers the ventricles to contract',
                explanation: 'The QRS is the big sharp spike in the middle of each ECG cycle \u2014 it\'s the moment both ventricles receive the electrical instruction to squeeze. Everything before it is preparation, everything after it is recovery. A normal QRS is narrow and sharp \u2014 if it\'s wide and bizarre, something has gone wrong with how the signal is spreading through the ventricles.',
                hint: 'The tallest, sharpest waveform on a normal ECG trace \u2014 the moment of ventricular action.'
            },
            {
                id: 'cv-07',
                front: 'What is the pericardium?',
                answer: 'A tough, double-layered sac that surrounds and protects the heart',
                explanation: 'The pericardium is like a snug, protective jacket around the heart. A small amount of fluid sits between the two layers to reduce friction as the heart beats away continuously. It also anchors the heart in position within the chest. Problems start when fluid accumulates faster than the rigid outer layer can stretch \u2014 which is cardiac tamponade.',
                hint: 'The heart\'s outer protective casing.'
            },
            {
                id: 'cv-08',
                front: 'What is stroke volume?',
                answer: 'The volume of blood pushed out of the left ventricle with each heartbeat \u2014 around 70 ml at rest',
                explanation: 'Every time the heart beats, it doesn\'t empty completely \u2014 it ejects a portion of the blood it contains. That portion is the stroke volume. It goes up during exercise, it drops when the heart is failing or when the patient is hypovolaemic. It\'s one of the two dials that control cardiac output \u2014 the other being heart rate.',
                hint: 'One beat\'s worth of output from the left ventricle.'
            },
            {
                id: 'cv-09',
                front: 'What is preload?',
                answer: 'How full the ventricle is just before it contracts',
                explanation: 'Imagine stretching an elastic band before you let it go \u2014 the more you stretch it, the further it flies. The heart works the same way. The more blood that fills the ventricle during diastole, the more the muscle stretches, and the harder it snaps back. This is the Frank\u2013Starling mechanism in action \u2014 the heart automatically pumps harder when it receives more blood.',
                hint: 'How full the ventricle is before it squeezes.'
            },
            {
                id: 'cv-10',
                front: 'What is afterload?',
                answer: 'The resistance the ventricle has to overcome to push blood out into the circulation',
                explanation: 'Think of afterload like the pressure you\'d need to squeeze toothpaste against a blocked nozzle \u2014 the higher the resistance, the harder you have to squeeze. In a patient with severe hypertension, the left ventricle is constantly working against high resistance. Over time, that extra workload causes the heart muscle to thicken, which ironically makes it less efficient.',
                hint: 'The pressure the heart has to pump against.'
            },
            {
                id: 'cv-11',
                front: 'What does the AV node do?',
                answer: 'It receives the electrical signal from the SA node and deliberately slows it down before passing it to the ventricles',
                explanation: 'That pause at the AV node \u2014 about a tenth of a second \u2014 is essential. It gives the atria time to finish contracting and push their blood into the ventricles before the ventricles fire. Without that delay, everything would contract at once and filling would be inefficient. When the AV node fails, you get heart block.',
                hint: 'The gatekeeper between the atria and the ventricles \u2014 holds the signal briefly before letting it through.'
            },
            {
                id: 'cv-12',
                front: 'What is the aorta?',
                answer: 'The largest artery in the body \u2014 it carries oxygenated blood from the left ventricle out to the rest of the body',
                explanation: 'The aorta leaves the left ventricle, sweeps upward and over in a great arch \u2014 giving off branches to the head and arms \u2014 then runs down through the chest and abdomen before splitting into the arteries supplying the legs. It\'s under enormous pressure with every beat, which is why aortic emergencies are so devastating.',
                hint: 'The main arterial highway leaving the left ventricle.'
            },
            {
                id: 'cv-13',
                front: 'What is systole?',
                answer: 'The phase when the ventricles contract and squeeze blood out',
                explanation: 'Systole is the working phase \u2014 both ventricles fire simultaneously, the AV valves snap shut (that\'s S1, the lub of lub-dub), and the aortic and pulmonary valves fling open. Blood shoots into the aorta and pulmonary artery. The systolic number in a blood pressure reading reflects the peak pressure generated during this moment.',
                hint: 'The squeezing, pumping phase of the cardiac cycle.'
            },
            {
                id: 'cv-14',
                front: 'What is diastole?',
                answer: 'The relaxation phase \u2014 when the ventricles refill with blood ready for the next beat',
                explanation: 'After systole, the ventricles relax, the aortic and pulmonary valves snap shut (S2 \u2014 the dub), and the mitral and tricuspid valves open to let blood pour in from the atria. Diastole is longer than systole at rest, which is important \u2014 it\'s also when the coronary arteries fill. The diastolic pressure reading reflects how hard the arteries are working during this rest phase.',
                hint: 'The resting, filling phase between contractions.'
            },
            {
                id: 'cv-15',
                front: 'What do the pulmonary veins carry and where do they go?',
                answer: 'They carry oxygenated blood from the lungs back to the left atrium \u2014 the only veins in the body carrying oxygenated blood',
                explanation: 'This one catches a lot of people out. Veins carry blood towards the heart \u2014 but that doesn\'t mean deoxygenated. The four pulmonary veins bring freshly oxygenated blood from the lungs straight into the left atrium, ready to be pumped around the body. Remember: arteries go away from the heart, veins come back \u2014 oxygen content is a separate question.',
                hint: 'The one set of veins that breaks the usual rule \u2014 they carry oxygenated blood.'
            },
            {
                id: 'cv-16',
                front: 'What does the P wave represent on an ECG?',
                answer: 'Atrial depolarisation \u2014 the electrical signal spreading across both atria before they contract',
                explanation: 'The P wave is the small, gentle bump before the big QRS spike. It represents the electrical wave rippling out from the SA node across both atria. It\'s easy to overlook but incredibly useful \u2014 no P waves? Think AF. P waves at the wrong rate or shape? The signal isn\'t coming from the SA node.',
                hint: 'The small bump before the QRS \u2014 atria getting ready to fire.'
            },
            {
                id: 'cv-17',
                front: 'What is the Frank\u2013Starling mechanism?',
                answer: 'The more the heart is stretched by incoming blood, the harder it contracts \u2014 automatically matching output to what it receives',
                explanation: 'The heart is self-regulating. Fill it with more blood and the muscle fibres stretch further, which means they contract with more force and eject more. This is how the heart matches its output to venous return without needing a nerve signal. It\'s also why giving fluid to a hypovolaemic patient with a failing heart is such a careful balancing act.',
                hint: 'The heart pumps harder when it receives more \u2014 stretch in, force out.'
            },
            {
                id: 'cv-18',
                front: 'What do the coronary arteries do?',
                answer: 'They supply the heart muscle itself with oxygenated blood \u2014 the heart has its own dedicated plumbing',
                explanation: 'For all its incredible work, the heart can\'t absorb oxygen from the blood passing through its chambers \u2014 it needs its own supply. The left and right coronary arteries branch off the aorta just above the aortic valve and feed the myocardium. Block one of those arteries and the muscle it supplies starts dying within minutes.',
                hint: 'The heart\'s own blood supply \u2014 separate from the blood it pumps.'
            },
            {
                id: 'cv-19',
                front: 'What is the Bundle of His?',
                answer: 'The electrical cable that carries the impulse from the AV node down into the ventricular muscle',
                explanation: 'Once the AV node has done its job and released the impulse, it travels down the Bundle of His through the interventricular septum before splitting into right and left bundle branches. Think of it as the main trunk road of the ventricular electrical system \u2014 if it gets blocked, you get a bundle branch block pattern on the ECG.',
                hint: 'The electrical cable connecting the AV node to the ventricular conduction system.'
            },
            {
                id: 'cv-20',
                front: 'What are Purkinje fibres?',
                answer: 'The final branches of the heart\'s electrical system \u2014 they spread the impulse rapidly throughout the ventricular muscle so it all contracts at once',
                explanation: 'After the bundle branches, the impulse fans out through a web of Purkinje fibres embedded in the ventricular walls. Their conduction speed is very fast, which means the entire ventricle depolarises almost simultaneously \u2014 producing a coordinated, powerful squeeze rather than an uncoordinated ripple. Damage to this network produces a wide, abnormal QRS on ECG.',
                hint: 'The final wiring that gets the signal to every corner of the ventricles.'
            },
            {
                id: 'cv-21',
                front: 'What are the three layers of the heart wall?',
                answer: 'Endocardium (inner lining), myocardium (middle muscle), epicardium (outer layer)',
                explanation: 'Picture a sandwich \u2014 the endocardium is the smooth inner lining that blood touches, the myocardium is the thick muscular filling that does all the squeezing, and the epicardium is the outer coat that sits against the pericardial sac. When clinicians talk about a transmural infarction they mean damage going all the way through all three layers.',
                hint: 'Inner, middle, outer \u2014 lining, muscle, coat.'
            },
            {
                id: 'cv-22',
                front: 'What does the tricuspid valve do?',
                answer: 'It stops blood flowing backwards from the right ventricle into the right atrium during contraction',
                explanation: 'The tricuspid does exactly the same job as the mitral, but on the right side of the heart. Three leaflets, same chordae tendineae arrangement, same logic \u2014 when the right ventricle fires, the tricuspid shuts to make sure blood goes forward into the pulmonary artery, not back where it came from.',
                hint: 'The mitral\'s partner \u2014 same job, right side of the heart.'
            },
            {
                id: 'cv-23',
                front: 'What is the pulmonary valve and when does it open?',
                answer: 'A semi-lunar valve between the right ventricle and pulmonary artery \u2014 it opens during systole to let blood through to the lungs',
                explanation: 'Unlike the AV valves, the pulmonary and aortic valves have no chordae tendineae \u2014 they\'re shaped like three little cups that fill with blood to snap shut. The pulmonary valve opens the moment right ventricular pressure exceeds pulmonary artery pressure during systole, then snaps closed in diastole. Simple, elegant, reliable \u2014 until it isn\'t.',
                hint: 'The exit gate from the right ventricle.'
            },
            {
                id: 'cv-24',
                front: 'What does the T wave represent on an ECG?',
                answer: 'Ventricular repolarisation \u2014 the ventricles electrically resetting after contraction, ready for the next beat',
                explanation: 'After the ventricles fire (QRS), they need to reset their electrical charge before they can fire again \u2014 that recovery process shows up as the T wave. It\'s broader and more rounded than the QRS. Peaked T waves, flattened T waves, or inverted T waves can all be important findings \u2014 the T wave is telling you something about how well the ventricular myocardium is recovering.',
                hint: 'The recovery wave \u2014 ventricles recharging after the QRS.'
            },
            {
                id: 'cv-25',
                front: 'What is the PR interval?',
                answer: 'The time it takes for the electrical signal to travel from the SA node through the atria and AV node to reach the ventricles',
                explanation: 'Measured from the start of the P wave to the start of the QRS, the normal PR interval is 120\u2013200 ms \u2014 three to five little squares on ECG paper. A prolonged PR interval means the signal is taking too long to get through the AV node. That\'s first-degree heart block \u2014 not usually dangerous on its own, but a sign worth noting.',
                hint: 'The travel time from SA node to ventricles \u2014 including the AV node delay.'
            },
            {
                id: 'cv-26',
                front: 'What does the ST segment represent on an ECG?',
                answer: 'The period when the ventricles are fully contracted but haven\'t started recovering yet',
                explanation: 'The ST segment is the flat bit between the end of the QRS and the start of the T wave \u2014 and in a healthy heart it should sit right on the baseline. Elevation means part of the myocardium is injured and crying out for blood. Depression can mean ischaemia. It\'s one of the most important things you\'ll ever look at on a 12-lead \u2014 learn to spot when it\'s not flat and not where it should be.',
                hint: 'The flat section between QRS and T wave \u2014 it should be right on the baseline.'
            },
            {
                id: 'cv-27',
                front: 'What are baroreceptors and where are they found?',
                answer: 'Pressure sensors in the carotid sinuses and aortic arch that detect changes in blood pressure and trigger an automatic response',
                explanation: 'Every time your blood pressure rises or falls, baroreceptors send a signal to the brainstem within seconds. Too high \u2014 slow the heart, dilate the vessels. Too low \u2014 speed the heart up, constrict the vessels. It\'s an incredibly fast feedback loop. It\'s also why pressing on the carotid sinus can slow the heart \u2014 you\'re artificially triggering that reflex.',
                hint: 'The body\'s built-in blood pressure sensors \u2014 constantly adjusting in real time.'
            },
            {
                id: 'cv-28',
                front: 'What is the effect of the sympathetic nervous system on the heart?',
                answer: 'It speeds the heart up and makes it squeeze harder \u2014 the fight-or-flight response',
                explanation: 'When adrenaline floods the system, the heart gets the message loud and clear. The SA node fires faster, the AV node conducts quicker, and the myocardium contracts with more force. This is why your heart races when you\'re scared, running, or standing over a seriously unwell patient. The sympathetic system is the accelerator \u2014 useful in an emergency, damaging if it never switches off.',
                hint: 'The heart\'s accelerator pedal \u2014 faster and stronger.'
            },
            {
                id: 'cv-29',
                front: 'What is the effect of the parasympathetic nervous system on the heart?',
                answer: 'It slows the heart down \u2014 mainly by the vagus nerve acting on the SA and AV nodes',
                explanation: 'The parasympathetic system is the brake pedal. Acetylcholine released by the vagus nerve slows the SA node\'s firing rate and makes the AV node conduct more sluggishly. High vagal tone is normal in fit athletes. It\'s also the mechanism behind vasovagal syncope \u2014 too much vagal stimulation and the heart slows so much the patient faints.',
                hint: 'The heart\'s brake pedal \u2014 the vagus nerve at work.'
            },
            {
                id: 'cv-30',
                front: 'What is ejection fraction?',
                answer: 'The percentage of blood inside the left ventricle that actually gets pumped out with each beat \u2014 normally 55\u201370%',
                explanation: 'The heart never fully empties \u2014 it ejects a proportion of what it contains. Ejection fraction tells you how well it\'s doing that. Normal is around 55\u201370%. Drop below 40% and the heart is struggling significantly \u2014 patients get breathless on minimal exertion because their pump just isn\'t keeping up. It\'s one of the key numbers in heart failure assessment.',
                hint: 'What fraction of the ventricle\'s blood actually gets pumped out each beat.'
            },
            {
                id: 'cv-31',
                front: 'What are chordae tendineae?',
                answer: 'Tough tendinous cords that anchor the mitral and tricuspid valve leaflets to the papillary muscles \u2014 stopping them from inverting under pressure',
                explanation: 'During systole, ventricular pressure rises sharply and tries to push the AV valve leaflets backwards into the atria. The chordae tendineae act like guy-ropes, holding the leaflets in position so they seal properly. If one ruptures \u2014 often after a myocardial infarction \u2014 the valve becomes suddenly incompetent and the patient deteriorates rapidly.',
                hint: 'The guy-ropes that stop the valve leaflets flapping the wrong way.'
            },
            {
                id: 'cv-32',
                front: 'What is cardiac tamponade and why does it cause problems?',
                answer: 'Fluid builds up in the pericardial sac and squeezes the heart from the outside, preventing it from filling properly',
                explanation: 'The pericardium is a rigid sac \u2014 it can\'t stretch quickly. Even 150\u2013200 ml accumulating rapidly creates enough external pressure to stop the ventricles filling during diastole. Less filling means less output. Less output means shock. The body tries to compensate with tachycardia and vasoconstriction, but these can only buy so much time. The heart is literally being strangled from outside.',
                hint: 'External pressure squeezing the heart \u2014 it can\'t fill, so it can\'t pump.'
            },
            {
                id: 'cv-33',
                front: 'What is Beck\'s triad?',
                answer: 'The three classic signs of cardiac tamponade \u2014 hypotension, muffled heart sounds, and raised jugular venous pressure',
                explanation: 'Hypotension because cardiac output has fallen. Muffled heart sounds because the fluid surrounding the heart dampens what you can hear through a stethoscope. Raised JVP because the impaired right heart can\'t accept venous return, so pressure backs up into the neck veins. Textbook perfect \u2014 but in reality, you\'ll rarely see all three together. Hypotension with raised JVP in the right context should make you think.',
                hint: 'Three signs pointing to one cause \u2014 fluid compressing the heart.'
            },
            {
                id: 'cv-34',
                front: 'What is pulsus paradoxus?',
                answer: 'An exaggerated drop in blood pressure during breathing in \u2014 suggesting the heart is being compressed from outside or within',
                explanation: 'Normally blood pressure dips very slightly on inspiration \u2014 too small to notice. In cardiac tamponade or severe asthma, this drop is exaggerated because the compromised heart can\'t maintain output against the pressure changes of breathing. You might notice the pulse weakening or disappearing on inspiration \u2014 that\'s pulsus paradoxus in action at the bedside.',
                hint: 'The pulse noticeably weakens when the patient breathes in.'
            },
            {
                id: 'cv-35',
                front: 'What happens physiologically in left ventricular failure?',
                answer: 'The left ventricle can\'t pump effectively, so pressure backs up into the lungs and fluid leaks into the alveoli',
                explanation: 'Think of it as a blocked drain. If the left ventricle can\'t shift blood forward, it backs up into the left atrium, then the pulmonary veins, then the pulmonary capillaries \u2014 where the pressure forces fluid out through the capillary walls and into the alveoli. The patient drowns from the inside. That\'s why they\'re breathless, can\'t lie flat, and may have frothy sputum.',
                hint: 'Left pump fails \u2014 fluid backs up into the lungs.'
            },
            {
                id: 'cv-36',
                front: 'What happens physiologically in right ventricular failure?',
                answer: 'The right ventricle can\'t pump effectively, so venous pressure rises and fluid leaks into body tissues',
                explanation: 'Same blocked drain logic, opposite direction. If the right ventricle can\'t shift blood into the lungs, pressure backs up into the right atrium and then into the systemic veins. You get raised JVP, fluid in the ankles and legs, a congested liver, and ascites. Right heart failure can be caused by left heart failure \u2014 if the left side backs up enough, the right side eventually can\'t cope either.',
                hint: 'Right pump fails \u2014 fluid backs up into the body.'
            },
            {
                id: 'cv-37',
                front: 'What is atherosclerosis?',
                answer: 'A slow build-up of fatty plaques inside artery walls that narrows the vessel and reduces blood flow',
                explanation: 'It starts silently, often decades before symptoms appear. Damage to the inner lining of an artery allows fat and inflammatory cells to accumulate beneath the surface. Over time a fibrous cap forms over this fatty core \u2014 like a blister under the vessel lining. The artery gradually narrows, flow reduces, and the plaque becomes increasingly unstable. When that cap ruptures, everything happens fast.',
                hint: 'The gradual furring up of arteries from the inside.'
            },
            {
                id: 'cv-38',
                front: 'What happens when an atheromatous plaque ruptures?',
                answer: 'The ruptured plaque triggers rapid clot formation that can completely block the artery within seconds',
                explanation: 'Picture a blister bursting under the lining of a coronary artery. The body treats it like a wound \u2014 platelets rush to the site and a clot forms almost immediately. If that clot completely occludes the artery, the myocardium beyond it is cut off from its oxygen supply and starts dying. The faster the artery is reopened, the more muscle is saved \u2014 which is why time is muscle.',
                hint: 'The plaque bursts, the body clots, and the artery blocks.'
            },
            {
                id: 'cv-39',
                front: 'What is the difference between myocardial ischaemia and myocardial infarction?',
                answer: 'Ischaemia is a temporary oxygen shortage the heart can recover from \u2014 infarction is permanent cell death',
                explanation: 'Ischaemia is the warning \u2014 the heart muscle is struggling but still alive. Restore blood flow quickly enough and the muscle recovers fully. Infarction is what happens when ischaemia goes on too long \u2014 cells die and are replaced by scar tissue that can never contract again. That\'s why a patient with six hours of crushing chest pain is in a very different situation to one who had ten minutes that resolved completely.',
                hint: 'Ischaemia is the warning \u2014 infarction is the damage.'
            },
            {
                id: 'cv-40',
                front: 'What causes atrial fibrillation?',
                answer: 'Chaotic electrical activity in the atria overwhelms the SA node, causing the atria to quiver rather than contract properly',
                explanation: 'Instead of one organised signal from the SA node, hundreds of random electrical impulses fire simultaneously across the atria. The atria just quiver uselessly. The AV node is bombarded with signals but only lets some through, producing that characteristic irregularly irregular pulse. No organised atrial contraction means reduced ventricular filling \u2014 and over time, blood can pool and clot in the atria.',
                hint: 'Too many electrical signals for the atria to organise \u2014 they just quiver.'
            },
            {
                id: 'cv-41',
                front: 'What is jugular venous pressure and what does a raised JVP tell you?',
                answer: 'A visible estimate of right atrial pressure \u2014 raised JVP means the right side of the heart is under pressure',
                explanation: 'The internal jugular vein has no valves and connects directly to the right atrium \u2014 so it acts like a built-in pressure gauge you can see at the bedside. Normally the pulsation sits less than 4 cm above the sternal angle with the patient at 45\u00b0. If it\'s higher than that, something is backing up \u2014 right heart failure, tamponade, tension pneumothorax. A simple observation with significant diagnostic value.',
                hint: 'The neck veins acting as a visible pressure gauge for the right heart.'
            },
            {
                id: 'cv-42',
                front: 'What is cardiogenic shock?',
                answer: 'The heart is failing as a pump \u2014 cardiac output is so low that the organs aren\'t getting the blood they need, despite adequate circulating volume',
                explanation: 'This is different from hypovolaemic shock \u2014 the tank isn\'t empty, the pump is broken. Most commonly seen after a large myocardial infarction. The patient is cold, clammy, and mottled because the body is clamping down peripheral vessels to protect core organs. Heart rate climbs to compensate but can\'t make up for the lost output. One of the highest-acuity presentations you\'ll face on the road.',
                hint: 'Pump failure \u2014 the heart itself is the problem, not the blood volume.'
            },
            {
                id: 'cv-43',
                front: 'What is unusual about the pulmonary artery?',
                answer: 'It\'s the only artery in the body that carries deoxygenated blood',
                explanation: 'Arteries carry blood away from the heart \u2014 that\'s the definition. They don\'t have to carry oxygenated blood. The pulmonary artery carries deoxygenated blood from the right ventricle to the lungs \u2014 the whole point is to get it there for a fresh oxygen load. It pairs with the pulmonary veins, which carry oxygenated blood back. Both are exceptions to the usual rule \u2014 and both come up in exams.',
                hint: 'It pairs with the pulmonary veins \u2014 both break the oxygen rule.'
            },
            {
                id: 'cv-44',
                front: 'What is mean arterial pressure and why does it matter?',
                answer: 'The average pressure pushing blood to the organs throughout the whole cardiac cycle \u2014 a better guide to perfusion than systolic pressure alone',
                explanation: 'Systolic pressure is just the peak \u2014 the heart is only in systole for a third of the cycle at resting rates. The rest of the time, organs are being perfused by diastolic pressure. MAP averages it all out and gives you a truer picture of how well blood is reaching the tissues. A MAP below 65 is where organ perfusion starts becoming inadequate \u2014 it\'s a number worth knowing.',
                hint: 'The average pressure keeping organs perfused throughout the whole cycle.'
            },
            {
                id: 'cv-45',
                front: 'What is systemic vascular resistance?',
                answer: 'The resistance the blood vessels offer to flow \u2014 the friction the heart has to overcome to push blood around the body',
                explanation: 'Think of it like water pressure in a hosepipe. Narrow the nozzle and resistance increases \u2014 the pump has to work harder. The arterioles are the main control point \u2014 constrict them and resistance rises, dilate them and it falls. In septic shock, SVR crashes as vessels dilate massively. In hypertensive emergencies, SVR is very high and the heart is working against enormous resistance with every beat.',
                hint: 'The friction the heart has to overcome to push blood around the body.'
            },
            {
                id: 'cv-46',
                front: 'What is the significance of the interventricular septum?',
                answer: 'It divides the two ventricles \u2014 but under extreme pressure it can bow sideways and compromise the other ventricle\'s filling',
                explanation: 'Normally the septum sits straight, and both ventricles work happily side by side. But if one side is under dramatically higher pressure \u2014 like the right ventricle in a tension pneumothorax \u2014 it can bulge into the other ventricle, squashing the space available for filling. Less filling means less output, which is one reason tension pneumothorax deteriorates so rapidly into cardiac arrest.',
                hint: 'The wall between the ventricles \u2014 which can move under pressure and cause problems.'
            },
            {
                id: 'cv-47',
                front: 'What is a re-entry circuit?',
                answer: 'When the electrical signal gets trapped in a loop and keeps firing round and round, causing a sustained fast rhythm',
                explanation: 'Imagine a roundabout with no exit. The electrical impulse travels around a circuit of heart tissue continuously \u2014 each loop triggers another contraction before the heart has time to fully recover. This underlies many arrhythmias including SVT, atrial flutter, and ventricular tachycardia. The circuit can sometimes be broken by a shock, a drug, or even a vagal manoeuvre \u2014 effectively interrupting the loop.',
                hint: 'The electrical signal stuck going round in circles.'
            },
            {
                id: 'cv-48',
                front: 'What is ventricular fibrillation?',
                answer: 'Completely chaotic electrical activity in the ventricles \u2014 no organised contraction, no cardiac output, cardiac arrest',
                explanation: 'In VF, hundreds of random electrical wavefronts fire simultaneously through the ventricular myocardium. There\'s no coordinated squeeze \u2014 just a quivering mass of muscle. Zero blood is being pumped. The patient is in cardiac arrest within seconds. VF is a shockable rhythm \u2014 a defibrillator delivers a massive dose of energy to depolarise the entire myocardium at once and give the SA node a chance to restart an organised rhythm.',
                hint: 'The ventricles receive too many signals to contract as a unit \u2014 cardiac arrest.'
            },
            {
                id: 'cv-49',
                front: 'What is the role of the aortic valve?',
                answer: 'It opens during systole to let blood leave the left ventricle and snaps shut in diastole to stop it flowing back',
                explanation: 'The aortic valve is the exit gate from the left ventricle. When ventricular pressure exceeds aortic pressure, the three cusps spring open and blood shoots through. At the end of systole, aortic pressure briefly exceeds ventricular pressure and the cusps snap shut \u2014 that snap is S2, the dub of lub-dub. The coronary arteries sit just above the valve and fill during diastole, when the valve is closed.',
                hint: 'The exit gate from the left ventricle \u2014 opens to let blood out, shuts to stop it returning.'
            },
            {
                id: 'cv-50',
                front: 'Why do the coronary arteries fill mainly during diastole?',
                answer: 'During systole the heart muscle is squeezing so hard it compresses its own blood vessels \u2014 coronary flow only really happens when the heart relaxes',
                explanation: 'This is one of the more counterintuitive facts in cardiac physiology. The very act of contracting squeezes the intramural coronary vessels shut from the inside. Only during diastole, when the muscle relaxes, can blood flow freely into the coronary circulation. This is why a very fast heart rate can compromise coronary perfusion \u2014 diastole gets so short there\'s barely time for the coronaries to fill between beats.',
                hint: 'The heart can only fill its own vessels when it stops squeezing.'
            }
        ]
    }

    // Future decks added here

];
