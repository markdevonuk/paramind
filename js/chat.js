/* ============================================
   PARAMIND - Chat Functionality
   With Bottom Navigation & Section Views
   Fixed Version - December 2025
   ============================================ */

console.log('chat.js loading...');

// ==================== DATA ====================

// Scenario Categories and Items
var SCENARIO_DATA = {
    cardiac: {
        title: "Cardiac Scenarios",
        description: "Practice cardiac-related patient assessments",
        items: [
            { id: "cardiac-chest-pain", title: "Chest Pain - ACS", description: "65-year-old with crushing chest pain" },
            { id: "cardiac-palpitations", title: "Palpitations", description: "45-year-old with racing heart" },
            { id: "cardiac-syncope", title: "Cardiac Syncope", description: "70-year-old collapsed at home" },
            { id: "cardiac-heart-failure", title: "Heart Failure", description: "78-year-old with worsening breathlessness" },
            { id: "cardiac-af", title: "Atrial Fibrillation", description: "62-year-old with irregular pulse" },
            { id: "cardiac-bradycardia", title: "Symptomatic Bradycardia", description: "80-year-old dizzy and pale" },
            { id: "cardiac-stemi", title: "Inferior STEMI", description: "58-year-old with nausea and sweating" },
            { id: "cardiac-arrest", title: "Cardiac Arrest", description: "Witnessed collapse scenario" }
        ]
    },
    respiratory: {
        title: "Respiratory Scenarios",
        description: "Practice respiratory assessments",
        items: [
            { id: "resp-asthma", title: "Acute Asthma", description: "28-year-old with severe wheeze" },
            { id: "resp-copd", title: "COPD Exacerbation", description: "72-year-old struggling to breathe" },
            { id: "resp-pneumonia", title: "Community Acquired Pneumonia", description: "65-year-old with productive cough" },
            { id: "resp-pe", title: "Pulmonary Embolism", description: "35-year-old with pleuritic chest pain" },
            { id: "resp-covid", title: "COVID-19 Pneumonitis", description: "55-year-old with worsening SpO2" },
            { id: "resp-anaphylaxis", title: "Anaphylaxis", description: "25-year-old with bee sting reaction" }
        ]
    },
    abdominal: {
        title: "Abdominal Scenarios",
        description: "Practice abdominal assessments",
        items: [
            { id: "abdo-appendicitis", title: "Appendicitis", description: "22-year-old with RIF pain" },
            { id: "abdo-cholecystitis", title: "Cholecystitis", description: "48-year-old with RUQ pain after eating" },
            { id: "abdo-aaa", title: "Ruptured AAA", description: "75-year-old with back pain and collapse" },
            { id: "abdo-bowel-obstruction", title: "Bowel Obstruction", description: "68-year-old with vomiting and distension" },
            { id: "abdo-gi-bleed", title: "GI Bleed", description: "60-year-old with melaena" },
            { id: "abdo-renal-colic", title: "Renal Colic", description: "40-year-old with severe loin pain" },
            { id: "abdo-pancreatitis", title: "Acute Pancreatitis", description: "50-year-old with epigastric pain" }
        ]
    },
    neuro: {
        title: "Neurological Scenarios",
        description: "Practice neurological assessments",
        items: [
            { id: "neuro-stroke", title: "Acute Stroke", description: "72-year-old with facial droop and arm weakness" },
            { id: "neuro-seizure", title: "Seizure", description: "35-year-old post-ictal in public" },
            { id: "neuro-meningitis", title: "Meningitis", description: "20-year-old with headache and neck stiffness" },
            { id: "neuro-head-injury", title: "Head Injury", description: "45-year-old fallen from ladder" },
            { id: "neuro-hypoglycaemia", title: "Hypoglycaemia", description: "58-year-old diabetic found confused" }
        ]
    },
    trauma: {
        title: "Trauma Scenarios",
        description: "Practice trauma assessments",
        items: [
            { id: "trauma-rtc", title: "Road Traffic Collision", description: "Multi-vehicle RTC with entrapment" },
            { id: "trauma-fall", title: "Fall from Height", description: "Builder fallen from scaffolding" },
            { id: "trauma-stabbing", title: "Penetrating Trauma", description: "25-year-old stabbed in chest" },
            { id: "trauma-burns", title: "Major Burns", description: "House fire victim" },
            { id: "trauma-fracture", title: "Open Fracture", description: "Cyclist with open tibial fracture" },
            { id: "trauma-spinal", title: "Spinal Injury", description: "Diving accident with neck pain" }
        ]
    },
    paediatric: {
        title: "Paediatric Scenarios",
        description: "Practice paediatric assessments",
        items: [
            { id: "paed-croup", title: "Croup", description: "2-year-old with barking cough" },
            { id: "paed-bronchiolitis", title: "Bronchiolitis", description: "6-month-old with breathing difficulty" },
            { id: "paed-febrile-convulsion", title: "Febrile Convulsion", description: "18-month-old post-seizure" },
            { id: "paed-sepsis", title: "Paediatric Sepsis", description: "4-year-old with fever and rash" },
            { id: "paed-nai", title: "Safeguarding Concerns", description: "Child with unexplained injuries" }
        ]
    },
    obstetric: {
        title: "Obstetric Scenarios",
        description: "Practice obstetric emergencies",
        items: [
            { id: "obs-labour", title: "Imminent Delivery", description: "Full term with urge to push" },
            { id: "obs-pph", title: "Postpartum Haemorrhage", description: "Heavy bleeding after delivery" },
            { id: "obs-eclampsia", title: "Eclampsia", description: "38 weeks pregnant with seizure" },
            { id: "obs-cord-prolapse", title: "Cord Prolapse", description: "Visible cord after waters breaking" }
        ]
    },
    "mental-health": {
        title: "Mental Health Scenarios",
        description: "Practice mental health assessments",
        items: [
            { id: "mh-self-harm", title: "Self Harm", description: "18-year-old with lacerations" },
            { id: "mh-suicidal", title: "Suicidal Ideation", description: "45-year-old expressing suicidal thoughts" },
            { id: "mh-psychosis", title: "Acute Psychosis", description: "30-year-old with paranoid delusions" },
            { id: "mh-overdose", title: "Intentional Overdose", description: "25-year-old taken paracetamol" }
        ]
    }
};

// Differential Diagnosis Data
var DIFFERENTIAL_DATA = {
    "chest-pain": {
        title: "Chest Pain Differentials",
        description: "Common causes of chest pain",
        items: [
            { id: "acs", title: "Acute Coronary Syndrome", description: "STEMI, NSTEMI, Unstable Angina" },
            { id: "pe", title: "Pulmonary Embolism", description: "Pleuritic, sudden onset, risk factors" },
            { id: "pneumothorax", title: "Pneumothorax", description: "Sudden onset, reduced air entry" },
            { id: "aortic-dissection", title: "Aortic Dissection", description: "Tearing pain, BP differential" },
            { id: "pericarditis", title: "Pericarditis", description: "Sharp, positional, recent viral illness" },
            { id: "oesophageal", title: "Oesophageal Spasm/Reflux", description: "Burning, worse after eating" },
            { id: "msk-chest", title: "Musculoskeletal", description: "Reproducible on palpation" },
            { id: "anxiety-chest", title: "Anxiety/Panic Attack", description: "Tingling, hyperventilation" },
            { id: "pneumonia-chest", title: "Pneumonia/Pleurisy", description: "Fever, cough, pleuritic" },
            { id: "shingles", title: "Herpes Zoster", description: "Dermatomal pain, rash" },
            { id: "cholecystitis-chest", title: "Biliary Colic", description: "RUQ, referred to shoulder" },
            { id: "costochondritis", title: "Costochondritis", description: "Tender costochondral joints" }
        ]
    },
    "sob": {
        title: "Shortness of Breath Differentials",
        description: "Common causes of dyspnoea",
        items: [
            { id: "asthma-diff", title: "Acute Asthma", description: "Wheeze, previous history" },
            { id: "copd-diff", title: "COPD Exacerbation", description: "Smoker, chronic history" },
            { id: "heart-failure-diff", title: "Heart Failure", description: "Orthopnoea, peripheral oedema" },
            { id: "pe-diff", title: "Pulmonary Embolism", description: "Risk factors, pleuritic pain" },
            { id: "pneumonia-diff", title: "Pneumonia", description: "Fever, productive cough" },
            { id: "pneumothorax-diff", title: "Pneumothorax", description: "Sudden onset, reduced air entry" },
            { id: "anaphylaxis-diff", title: "Anaphylaxis", description: "Trigger, swelling, rash" },
            { id: "anxiety-sob", title: "Anxiety/Panic", description: "No physical cause, tingling" },
            { id: "metabolic-acidosis", title: "Metabolic Acidosis", description: "DKA, sepsis, overdose" },
            { id: "anaemia", title: "Severe Anaemia", description: "Gradual onset, pallor" }
        ]
    },
    "abdo-pain": {
        title: "Abdominal Pain Differentials",
        description: "Common causes by location",
        items: [
            { id: "appendicitis-diff", title: "Appendicitis", description: "RIF pain, migration from umbilicus" },
            { id: "cholecystitis-diff", title: "Cholecystitis", description: "RUQ, worse after fatty food" },
            { id: "pancreatitis-diff", title: "Pancreatitis", description: "Epigastric, radiating to back" },
            { id: "aaa-diff", title: "AAA Rupture", description: "Pulsatile mass, back pain, shock" },
            { id: "bowel-obstruction-diff", title: "Bowel Obstruction", description: "Vomiting, distension, no flatus" },
            { id: "renal-colic-diff", title: "Renal Colic", description: "Loin to groin, colicky" },
            { id: "uti-diff", title: "UTI/Pyelonephritis", description: "Dysuria, frequency, loin pain" },
            { id: "diverticulitis", title: "Diverticulitis", description: "LIF pain, elderly, fever" },
            { id: "gi-bleed-diff", title: "GI Bleed", description: "Melaena, haematemesis, shock" },
            { id: "ectopic", title: "Ectopic Pregnancy", description: "Female, missed period, bleeding" },
            { id: "ovarian-torsion", title: "Ovarian Torsion/Cyst", description: "Sudden onset, female" },
            { id: "testicular-torsion", title: "Testicular Torsion", description: "Young male, severe pain" },
            { id: "hernia", title: "Strangulated Hernia", description: "Irreducible, tender" },
            { id: "peptic-ulcer", title: "Peptic Ulcer/Perforation", description: "Epigastric, rigid abdomen" },
            { id: "mesenteric-ischaemia", title: "Mesenteric Ischaemia", description: "AF, pain out of proportion" }
        ]
    },
    "headache": {
        title: "Headache Differentials",
        description: "Common causes of headache",
        items: [
            { id: "tension-headache", title: "Tension Headache", description: "Band-like, bilateral" },
            { id: "migraine", title: "Migraine", description: "Unilateral, aura, photophobia" },
            { id: "sah", title: "Subarachnoid Haemorrhage", description: "Thunderclap, worst ever" },
            { id: "meningitis-diff", title: "Meningitis", description: "Fever, neck stiffness, photophobia" },
            { id: "temporal-arteritis", title: "Temporal Arteritis", description: ">50, scalp tenderness, jaw claudication" },
            { id: "raised-icp", title: "Raised ICP", description: "Worse on waking, vomiting" },
            { id: "cluster-headache", title: "Cluster Headache", description: "Unilateral, eye watering, restless" },
            { id: "sinusitis", title: "Sinusitis", description: "Facial pain, worse bending forward" }
        ]
    },
    "altered-loc": {
        title: "Altered Consciousness Differentials",
        description: "Causes of reduced GCS",
        items: [
            { id: "hypoglycaemia-diff", title: "Hypoglycaemia", description: "Diabetic, sweaty, tremor" },
            { id: "stroke-diff", title: "Stroke/TIA", description: "Focal neurology, sudden onset" },
            { id: "head-injury-diff", title: "Head Injury", description: "History of trauma" },
            { id: "seizure-diff", title: "Post-ictal", description: "Witnessed seizure, confusion" },
            { id: "overdose-diff", title: "Drug/Alcohol Overdose", description: "Toxidrome, history" },
            { id: "sepsis-diff", title: "Sepsis", description: "Infection source, fever/hypothermia" },
            { id: "dka-diff", title: "DKA/HHS", description: "Diabetic, high BM, dehydration" },
            { id: "hepatic-enceph", title: "Hepatic Encephalopathy", description: "Liver disease, asterixis" },
            { id: "hyponatraemia", title: "Hyponatraemia", description: "Elderly, diuretics, confusion" },
            { id: "hypothermia-diff", title: "Hypothermia", description: "Cold, bradycardia, elderly" },
            { id: "co-poisoning", title: "Carbon Monoxide", description: "Multiple casualties, headache" }
        ]
    },
    "collapse": {
        title: "Collapse / Syncope Differentials",
        description: "Causes of transient LOC",
        items: [
            { id: "vasovagal", title: "Vasovagal Syncope", description: "Trigger, prodrome, rapid recovery" },
            { id: "cardiac-syncope-diff", title: "Cardiac Syncope", description: "No warning, exertional, palpitations" },
            { id: "orthostatic", title: "Orthostatic Hypotension", description: "On standing, medications" },
            { id: "seizure-collapse", title: "Seizure", description: "Witnessed convulsions, post-ictal" },
            { id: "hypoglycaemia-collapse", title: "Hypoglycaemia", description: "Diabetic, missed meal" },
            { id: "pe-collapse", title: "Massive PE", description: "Sudden, SOB, risk factors" },
            { id: "aortic-stenosis", title: "Aortic Stenosis", description: "Exertional, murmur" },
            { id: "arrhythmia", title: "Arrhythmia", description: "Palpitations before collapse" },
            { id: "situational", title: "Situational Syncope", description: "Cough, micturition, defecation" }
        ]
    },
    "back-pain": {
        title: "Back Pain Differentials",
        description: "Serious and common causes",
        items: [
            { id: "mechanical", title: "Mechanical Back Pain", description: "Movement related, no red flags" },
            { id: "disc-prolapse", title: "Disc Prolapse", description: "Radicular pain, dermatomal" },
            { id: "cauda-equina", title: "Cauda Equina Syndrome", description: "Saddle anaesthesia, urinary symptoms" },
            { id: "aaa-back", title: "AAA Rupture", description: "Elderly, pulsatile mass, shock" },
            { id: "spinal-cord-comp", title: "Spinal Cord Compression", description: "Cancer history, bilateral leg symptoms" },
            { id: "vertebral-fracture", title: "Vertebral Fracture", description: "Trauma, osteoporosis, point tender" },
            { id: "infection-spine", title: "Spinal Infection/Abscess", description: "Fever, IVDU, recent procedure" }
        ]
    },
    "leg-pain": {
        title: "Leg Pain/Swelling Differentials",
        description: "Vascular and other causes",
        items: [
            { id: "dvt", title: "Deep Vein Thrombosis", description: "Unilateral swelling, Wells score" },
            { id: "cellulitis", title: "Cellulitis", description: "Erythema, warmth, spreading" },
            { id: "peripheral-arterial", title: "Acute Limb Ischaemia", description: "6 Ps, pulseless, cold" },
            { id: "compartment", title: "Compartment Syndrome", description: "Trauma, tense, severe pain" },
            { id: "ruptured-bakers", title: "Ruptured Baker's Cyst", description: "Calf swelling, known cyst" },
            { id: "msk-leg", title: "Musculoskeletal Strain", description: "Activity related, localised" }
        ]
    }
};

// Scenario starter messages
var SCENARIO_STARTERS = {
    "cardiac-chest-pain": "Hello... I've called the ambulance because I've got this terrible pain in my chest. It started about 45 minutes ago. I was just sitting watching telly and it came on suddenly. It's really quite bad... I feel a bit sick too.",
    "cardiac-stemi": "I don't know what's wrong with me... I've been feeling awful for the past hour. My stomach hurts and I feel really sick. I keep sweating but I don't have a temperature. My husband made me call because he says I look grey.",
    "cardiac-palpitations": "My heart is going crazy! It's been racing for about 20 minutes now and I feel really dizzy. It just started out of nowhere.",
    "cardiac-syncope": "*confused* What happened? I was just getting up to make a cup of tea and the next thing I know I'm on the floor...",
    "cardiac-heart-failure": "I can't breathe properly... it's been getting worse for days. I can't lie flat at night anymore. My ankles are really swollen.",
    "cardiac-af": "My heart keeps going really fast and then slowing down... it feels like it's fluttering in my chest. I feel a bit dizzy and short of breath.",
    "cardiac-bradycardia": "*speaks slowly* I just feel so tired... and dizzy. My wife says I look really pale. I nearly fainted in the bathroom.",
    "cardiac-arrest": "*bystander speaking* He just collapsed! He was walking and then he just dropped. I don't think he's breathing!",
    "resp-asthma": "*wheeze* I can't... catch my breath... *wheeze* My inhaler isn't helping...",
    "resp-copd": "*gasping* I can't... breathe... it's my lungs... *cough* Been getting worse for three days...",
    "resp-pneumonia": "I've had this terrible cough for a week now... *cough cough* bringing up green stuff. I feel so hot and cold at the same time.",
    "resp-pe": "I've got this really sharp pain in my chest when I breathe. It came on suddenly this morning. I'm also quite short of breath.",
    "resp-covid": "I've been unwell for about a week... COVID test was positive. But today my breathing has got much worse. I'm really struggling.",
    "resp-anaphylaxis": "*distressed* I can't breathe properly... my throat feels tight... I just ate some prawns at a restaurant... *scratching* I'm so itchy everywhere...",
    "neuro-stroke": "*slurred speech* I... my arm... it won't work properly. My wife says my face looks funny. What's happening to me?",
    "neuro-seizure": "*confused, slightly agitated* Where am I? What happened? My head hurts... I feel really tired and my tongue is sore...",
    "neuro-meningitis": "I've got the worst headache of my life... the light hurts my eyes and my neck is so stiff. I've been sick as well.",
    "neuro-head-injury": "*holding head* I fell off the ladder about an hour ago... hit my head on the ground. I've been sick twice and I feel really confused.",
    "neuro-hypoglycaemia": "*sweaty, trembling* I don't feel right... everything feels weird... I'm a diabetic... I think I missed lunch...",
    "abdo-appendicitis": "The pain started around my belly button last night but now it's moved down here to my right side. It really hurts when I move. I've been sick twice.",
    "abdo-cholecystitis": "I've got this terrible pain here under my ribs on the right side. It started after I had fish and chips last night. I feel sick and it goes through to my back.",
    "abdo-aaa": "*pale, sweating* I've got this terrible pain in my back and stomach... it came on suddenly about an hour ago. I feel really unwell... *clutching abdomen*",
    "abdo-bowel-obstruction": "I haven't been able to keep anything down for two days. My belly is really bloated and I haven't been to the toilet properly either. The pain comes and goes.",
    "abdo-gi-bleed": "I've been feeling weak and dizzy... and when I went to the toilet this morning, it was black. Really dark black. I feel awful.",
    "abdo-renal-colic": "*writhing in pain* This pain in my back is unbearable! It goes round to my front and down to my... you know. I can't get comfortable no matter what I do.",
    "abdo-pancreatitis": "The pain is right here in my stomach and goes through to my back. It started after I was drinking last night. I've been sick loads and it's the worst pain I've ever had.",
    "trauma-rtc": "*groaning* My neck hurts... I can't move my legs properly... the car came out of nowhere...",
    "trauma-fall": "*lying on ground* I fell from the scaffolding... I can't feel my legs properly... my back really hurts...",
    "trauma-stabbing": "*holding chest, blood visible* He stabbed me... I can't breathe properly... *gasping*",
    "trauma-burns": "*in pain* The fire spread so fast... my arms hurt so much... I can't stop shaking...",
    "trauma-fracture": "*crying in pain* My leg! I came off my bike... I can see the bone... please help me!",
    "trauma-spinal": "*lying still* I dived into the pool but it was shallower than I thought... my neck really hurts and my hands are tingling...",
    "paed-croup": "*parent speaking* She's making this horrible barking noise when she coughs and she's really struggling to breathe. It started in the night. She's only 2.",
    "paed-bronchiolitis": "*parent speaking* He's only 6 months old and he's really struggling to feed. His breathing is so fast and you can see his ribs when he breathes.",
    "paed-febrile-convulsion": "*parent panicking* She was really hot and then she started shaking all over! Her eyes rolled back... it lasted about 2 minutes. She's still not responding properly!",
    "paed-sepsis": "*parent worried* He's been off his food all day with a temperature. Now he's got this rash that doesn't go away when I press it. He's just lying there not moving much.",
    "paed-nai": "*child quiet, avoiding eye contact* *carer speaking* He fell down the stairs yesterday. He bruises easily... *child has bruises of different ages visible*",
    "obs-labour": "*heavily pregnant, breathing heavily* The pains are every two minutes... I feel like I need to push! The baby's coming... *bearing down*",
    "obs-pph": "*post-delivery* I've just had the baby but I'm bleeding loads... I feel really dizzy... *pale and sweating*",
    "obs-eclampsia": "*38 weeks pregnant, post-seizure* *partner speaking* She suddenly started fitting! She's 38 weeks pregnant. She complained of a headache earlier...",
    "obs-cord-prolapse": "*distressed* My waters just broke and there's something coming out... it looks like the cord! Help!",
    "mh-self-harm": "*quiet, avoiding eye contact, arm wrapped in towel* I didn't mean to do it so deep... I just needed to feel something...",
    "mh-suicidal": "*flat affect* I just don't want to be here anymore. I've thought about how I'd do it. I have tablets saved up...",
    "mh-psychosis": "*agitated, looking around suspiciously* They're watching me... the people in the walls. They've put cameras everywhere. You're one of them aren't you?",
    "mh-overdose": "*drowsy* I took all the paracetamol about 4 hours ago... I just wanted to go to sleep and not wake up..."
};

// ==================== STATE ====================

var chatState = {
    messages: [],
    isLoading: false,
    currentScenario: null,
    currentScenarioTitle: '',
    messagesUsed: 0,
    isPro: false,
    userTrust: 'SWAST',
    currentView: 'chatView'
};

// ==================== INITIALIZE ====================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing chat...');
    initChat();
});

function initChat() {
    console.log('initChat() called');
    
    // Check if paramind is available
    if (typeof window.paramind === 'undefined') {
        console.error('window.paramind not available! Make sure app.js loads before chat.js');
        return;
    }
    
    // Load message count
    chatState.messagesUsed = window.paramind.storage.getMessageCount();
    console.log('Message count loaded:', chatState.messagesUsed);
    updateMessageCounter();
    
    // Load user data
    var user = window.paramind.storage.getUser();
    console.log('User data:', user);
    
    if (user) {
        chatState.userTrust = user.trust || 'SWAST';
        chatState.isPro = user.subscriptionStatus === 'active';
        
        // Update trust badge
        var userTrustEl = document.getElementById('userTrust');
        if (userTrustEl) {
            userTrustEl.textContent = chatState.userTrust;
        }
        
        // Update email in dropdown
        var userEmailEl = document.getElementById('userEmail');
        if (userEmailEl && user.email) {
            userEmailEl.textContent = user.email;
        }
        
        // Hide message limit banner for pro users
        var bannerEl = document.getElementById('messageLimitBanner');
        if (chatState.isPro && bannerEl) {
            bannerEl.style.display = 'none';
        }
    }
    
    // Setup all event listeners
    setupEventListeners();
    
    console.log('Chat initialized successfully');
}

// ==================== EVENT LISTENERS ====================

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Bottom navigation
    var navItems = document.querySelectorAll('.nav-item');
    console.log('Found nav items:', navItems.length);
    
    navItems.forEach(function(item) {
        item.addEventListener('click', function() {
            var viewId = this.getAttribute('data-view');
            console.log('Nav clicked:', viewId);
            switchView(viewId);
        });
    });
    
    // Chat form
    var chatForm = document.getElementById('chatForm');
    if (chatForm) {
        chatForm.addEventListener('submit', handleSendMessage);
        console.log('Chat form listener added');
    }
    
    // Message input - auto resize and Enter key
    var messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
        
        messageInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                chatForm.dispatchEvent(new Event('submit'));
            }
        });
        console.log('Message input listeners added');
    }
    
    // Scenario category cards
    var scenarioCards = document.querySelectorAll('[data-category]');
    console.log('Found scenario category cards:', scenarioCards.length);
    
    scenarioCards.forEach(function(card) {
        card.addEventListener('click', function() {
            var category = this.getAttribute('data-category');
            console.log('Scenario category clicked:', category);
            showScenarioSubcategory(category);
        });
    });
    
    // Back button for scenarios
    var backToScenarios = document.getElementById('backToScenarioCategories');
    if (backToScenarios) {
        backToScenarios.addEventListener('click', function(e) {
            e.preventDefault();
            hideScenarioSubcategory();
        });
        console.log('Back to scenarios listener added');
    }
    
    // Differential category cards
    var diffCards = document.querySelectorAll('[data-diff-category]');
    console.log('Found differential category cards:', diffCards.length);
    
    diffCards.forEach(function(card) {
        card.addEventListener('click', function() {
            var category = this.getAttribute('data-diff-category');
            console.log('Differential category clicked:', category);
            showDiffSubcategory(category);
        });
    });
    
    // Back button for differentials
    var backToDiffs = document.getElementById('backToDiffCategories');
    if (backToDiffs) {
        backToDiffs.addEventListener('click', function(e) {
            e.preventDefault();
            hideDiffSubcategory();
        });
        console.log('Back to differentials listener added');
    }
    
    // Start scenario button in modal
    var startScenarioBtn = document.getElementById('startScenarioBtn');
    if (startScenarioBtn) {
        startScenarioBtn.addEventListener('click', startScenario);
        console.log('Start scenario button listener added');
    }
    
    // Patient form
    var patientForm = document.getElementById('patientForm');
    if (patientForm) {
        patientForm.addEventListener('submit', handlePatientForm);
        console.log('Patient form listener added');
    }
    
    // Random scenario button
    var randomBtn = document.getElementById('randomScenarioBtn');
    if (randomBtn) {
        randomBtn.addEventListener('click', startRandomScenario);
        console.log('Random scenario button listener added');
    }
    
    console.log('All event listeners setup complete');
}

// ==================== VIEW NAVIGATION ====================

function switchView(viewId) {
    console.log('Switching to view:', viewId);
    
    // Update navigation active state
    var navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(function(item) {
        var isActive = item.getAttribute('data-view') === viewId;
        item.classList.toggle('active', isActive);
    });
    
    // Hide all views
    var views = document.querySelectorAll('.content-view');
    views.forEach(function(view) {
        view.classList.remove('active');
    });
    
    // Show selected view
    var targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.add('active');
        console.log('Activated view:', viewId);
    } else {
        console.error('View not found:', viewId);
    }
    
    chatState.currentView = viewId;
    
    // Reset subcategory views when switching
    if (viewId === 'scenariosView') {
        hideScenarioSubcategory();
    } else if (viewId === 'differentialsView') {
        hideDiffSubcategory();
    }
}

// ==================== SCENARIO NAVIGATION ====================

function showScenarioSubcategory(category) {
    console.log('showScenarioSubcategory:', category);
    
    var data = SCENARIO_DATA[category];
    if (!data) {
        console.error('No data for category:', category);
        return;
    }
    
    // Update title and description
    var titleEl = document.getElementById('subcategoryTitle');
    var descEl = document.getElementById('subcategoryDescription');
    
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.description;
    
    // Populate scenario list
    var listEl = document.getElementById('scenarioList');
    if (listEl) {
        var html = '';
        data.items.forEach(function(item) {
            html += '<div class="subcategory-item" data-scenario-id="' + item.id + '">' +
                '<div class="info">' +
                '<h4>' + item.title + '</h4>' +
                '<p>' + item.description + '</p>' +
                '</div>' +
                '<i class="bi bi-chevron-right arrow"></i>' +
                '</div>';
        });
        listEl.innerHTML = html;
        
        // Add click handlers to scenario items
        var items = listEl.querySelectorAll('.subcategory-item');
        items.forEach(function(item) {
            item.addEventListener('click', function() {
                var scenarioId = this.getAttribute('data-scenario-id');
                var title = this.querySelector('h4').textContent;
                var description = this.querySelector('p').textContent;
                console.log('Scenario item clicked:', scenarioId);
                openScenarioModal(scenarioId, title, description);
            });
        });
    }
    
    // Show subcategory view
    var categoriesEl = document.getElementById('scenarioCategories');
    var subcategoryEl = document.getElementById('scenarioSubcategory');
    
    if (categoriesEl) categoriesEl.style.display = 'none';
    if (subcategoryEl) subcategoryEl.style.display = 'block';
}

function hideScenarioSubcategory() {
    var categoriesEl = document.getElementById('scenarioCategories');
    var subcategoryEl = document.getElementById('scenarioSubcategory');
    
    if (categoriesEl) categoriesEl.style.display = 'block';
    if (subcategoryEl) subcategoryEl.style.display = 'none';
}

function openScenarioModal(scenarioId, title, description) {
    console.log('Opening scenario modal:', scenarioId, title);
    
    chatState.currentScenario = scenarioId;
    chatState.currentScenarioTitle = title;
    
    var modalTitle = document.getElementById('scenarioModalTitle');
    var modalDesc = document.getElementById('scenarioModalDescription');
    
    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = description + " This interactive scenario will test your assessment skills.";
    
    // Show modal using Bootstrap
    var modalEl = document.getElementById('scenarioModal');
    if (modalEl && typeof bootstrap !== 'undefined') {
        var modal = new bootstrap.Modal(modalEl);
        modal.show();
    }
}

function startScenario() {
    console.log('Starting scenario:', chatState.currentScenario);
    
    if (!chatState.currentScenario) {
        console.error('No scenario selected');
        return;
    }
    
    // Close modal
    var modalEl = document.getElementById('scenarioModal');
    if (modalEl && typeof bootstrap !== 'undefined') {
        var modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
    }
    
    // Switch to chat view
    switchView('chatView');
    
    // Clear current messages
    clearChat();
    
    // Hide welcome message
    var welcomeMsg = document.getElementById('welcomeMessage');
    if (welcomeMsg) {
        welcomeMsg.style.display = 'none';
    }
    
    // Add scenario banner
    var chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        var bannerDiv = document.createElement('div');
        bannerDiv.className = 'alert alert-info mx-2 my-2';
        bannerDiv.innerHTML = '<div class="d-flex align-items-center">' +
            '<i class="bi bi-mortarboard me-2"></i>' +
            '<div>' +
            '<strong>Scenario: ' + chatState.currentScenarioTitle + '</strong>' +
            '<div class="small">Assess the patient and provide your working diagnosis</div>' +
            '</div>' +
            '</div>';
        chatMessages.appendChild(bannerDiv);
    }
    
    // Show loading then start scenario
    showLoading();
    
    setTimeout(function() {
        hideLoading();
        var starterMessage = getScenarioStarterMessage(chatState.currentScenario);
        addMessage('assistant', starterMessage);
    }, 1000);
}

function getScenarioStarterMessage(scenarioId) {
    // Check if we have a specific starter for this scenario
    if (SCENARIO_STARTERS[scenarioId]) {
        return SCENARIO_STARTERS[scenarioId];
    }
    
    // Default fallback
    return "Hello, thank you for coming. I'm not feeling well at all. Where would you like to start?";
}

// Start a random scenario
function startRandomScenario() {
    console.log('Starting random scenario');
    
    // Get all categories
    var categories = Object.keys(SCENARIO_DATA);
    
    // Pick a random category
    var randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    // Get items from that category
    var categoryItems = SCENARIO_DATA[randomCategory].items;
    
    // Pick a random scenario from that category
    var randomScenario = categoryItems[Math.floor(Math.random() * categoryItems.length)];
    
    console.log('Random scenario selected:', randomScenario.id, randomScenario.title);
    
    // Set the current scenario
    chatState.currentScenario = randomScenario.id;
    chatState.currentScenarioTitle = randomScenario.title;
    
    // Clear current chat
    clearChat();
    
    // Hide welcome message
    var welcomeMsg = document.getElementById('welcomeMessage');
    if (welcomeMsg) {
        welcomeMsg.style.display = 'none';
    }
    
    // Add scenario banner
    var chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        var bannerDiv = document.createElement('div');
        bannerDiv.className = 'alert alert-info mx-2 my-2';
        bannerDiv.innerHTML = '<div class="d-flex align-items-center">' +
            '<i class="bi bi-mortarboard me-2"></i>' +
            '<div>' +
            '<strong>Scenario: ' + randomScenario.title + '</strong>' +
            '<div class="small">' + randomScenario.description + '</div>' +
            '</div>' +
            '</div>';
        chatMessages.appendChild(bannerDiv);
    }
    
    // Show loading then start scenario
    showLoading();
    
    setTimeout(function() {
        hideLoading();
        var starterMessage = getScenarioStarterMessage(chatState.currentScenario);
        addMessage('assistant', starterMessage);
    }, 1000);
}

// ==================== DIFFERENTIAL NAVIGATION ====================

function showDiffSubcategory(category) {
    console.log('showDiffSubcategory:', category);
    
    var data = DIFFERENTIAL_DATA[category];
    if (!data) {
        console.error('No data for differential category:', category);
        return;
    }
    
    // Update title and description
    var titleEl = document.getElementById('diffSubcategoryTitle');
    var descEl = document.getElementById('diffSubcategoryDescription');
    
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.description;
    
    // Populate differential list
    var listEl = document.getElementById('diffList');
    if (listEl) {
        var html = '';
        data.items.forEach(function(item) {
            html += '<div class="subcategory-item" data-diff-id="' + item.id + '">' +
                '<div class="info">' +
                '<h4>' + item.title + '</h4>' +
                '<p>' + item.description + '</p>' +
                '</div>' +
                '<i class="bi bi-chevron-right arrow"></i>' +
                '</div>';
        });
        listEl.innerHTML = html;
        
        // Add click handlers - ask AI about the condition
        var items = listEl.querySelectorAll('.subcategory-item');
        items.forEach(function(item) {
            item.addEventListener('click', function() {
                var title = this.querySelector('h4').textContent;
                console.log('Differential clicked:', title);
                askAboutCondition(title);
            });
        });
    }
    
    // Show subcategory view
    var categoriesEl = document.getElementById('diffCategories');
    var subcategoryEl = document.getElementById('diffSubcategory');
    
    if (categoriesEl) categoriesEl.style.display = 'none';
    if (subcategoryEl) subcategoryEl.style.display = 'block';
}

function hideDiffSubcategory() {
    var categoriesEl = document.getElementById('diffCategories');
    var subcategoryEl = document.getElementById('diffSubcategory');
    
    if (categoriesEl) categoriesEl.style.display = 'block';
    if (subcategoryEl) subcategoryEl.style.display = 'none';
}

function askAboutCondition(conditionName) {
    console.log('Asking about condition:', conditionName);
    
    // Switch to chat view
    switchView('chatView');
    
    // Hide welcome message
    var welcomeMsg = document.getElementById('welcomeMessage');
    if (welcomeMsg) {
        welcomeMsg.style.display = 'none';
    }
    
    var prompt = 'Tell me about ' + conditionName + ' for a paramedic: key features, red flags, and pre-hospital management.';
    
    addMessage('user', prompt);
    
    // Increment message count
    if (!chatState.isPro) {
        chatState.messagesUsed = window.paramind.storage.incrementMessageCount();
        updateMessageCounter();
    }
    
    // Get AI response
    showLoading();
    
    sendToAI(prompt).then(function(response) {
        hideLoading();
        addMessage('assistant', response);
    }).catch(function(error) {
        hideLoading();
        addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
        console.error('AI error:', error);
    });
}

// ==================== YOUR PATIENT FORM ====================

function handlePatientForm(e) {
    e.preventDefault();
    console.log('Patient form submitted');
    
    // Gather form data
    var patientData = {
        age: document.getElementById('patientAge').value,
        sex: document.getElementById('patientSex').value,
        chiefComplaint: document.getElementById('chiefComplaint').value,
        history: document.getElementById('historyPresenting').value,
        pmh: document.getElementById('pmh').value,
        vitals: {
            rr: document.getElementById('vitalRR').value,
            spo2: document.getElementById('vitalSpO2').value,
            hr: document.getElementById('vitalHR').value,
            bp: document.getElementById('vitalBP').value,
            temp: document.getElementById('vitalTemp').value,
            gcs: document.getElementById('vitalGCS').value,
            bm: document.getElementById('vitalBM').value,
            pain: document.getElementById('vitalPain').value
        },
        notes: document.getElementById('additionalNotes').value
    };
    
    // Build prompt from patient data
    var prompt = buildPatientPrompt(patientData);
    
    // Switch to chat view
    switchView('chatView');
    
    // Hide welcome message
    var welcomeMsg = document.getElementById('welcomeMessage');
    if (welcomeMsg) {
        welcomeMsg.style.display = 'none';
    }
    
    // Add a summary message
    var summaryMessage = formatPatientSummary(patientData);
    addMessage('user', summaryMessage);
    
    // Increment message count
    if (!chatState.isPro) {
        chatState.messagesUsed = window.paramind.storage.incrementMessageCount();
        updateMessageCounter();
    }
    
    // Get AI response
    showLoading();
    
    sendToAI(prompt).then(function(response) {
        hideLoading();
        addMessage('assistant', response);
    }).catch(function(error) {
        hideLoading();
        addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
        console.error('AI error:', error);
    });
}

function buildPatientPrompt(data) {
    var prompt = 'I have a patient and need guidance on differential diagnoses and management:\n\n';
    
    if (data.age) prompt += 'Age: ' + data.age + '\n';
    if (data.sex) prompt += 'Sex: ' + data.sex + '\n';
    if (data.chiefComplaint) prompt += 'Chief Complaint: ' + data.chiefComplaint + '\n';
    if (data.history) prompt += 'History: ' + data.history + '\n';
    if (data.pmh) prompt += 'PMH: ' + data.pmh + '\n';
    
    prompt += '\nVital Signs:\n';
    if (data.vitals.rr) prompt += 'RR: ' + data.vitals.rr + '\n';
    if (data.vitals.spo2) prompt += 'SpO2: ' + data.vitals.spo2 + '%\n';
    if (data.vitals.hr) prompt += 'HR: ' + data.vitals.hr + '\n';
    if (data.vitals.bp) prompt += 'BP: ' + data.vitals.bp + '\n';
    if (data.vitals.temp) prompt += 'Temp: ' + data.vitals.temp + '°C\n';
    if (data.vitals.gcs) prompt += 'GCS: ' + data.vitals.gcs + '\n';
    if (data.vitals.bm) prompt += 'BM: ' + data.vitals.bm + '\n';
    if (data.vitals.pain) prompt += 'Pain: ' + data.vitals.pain + '/10\n';
    
    if (data.notes) prompt += '\nAdditional Notes: ' + data.notes + '\n';
    
    prompt += '\nBased on ' + chatState.userTrust + ' guidelines, what are the key differential diagnoses, red flags to consider, and recommended pre-hospital management?';
    
    return prompt;
}

function formatPatientSummary(data) {
    var summary = '**Patient Presentation:**\n';
    
    if (data.age || data.sex) {
        summary += (data.age || '?') + ' year old ' + (data.sex || 'patient') + '\n';
    }
    if (data.chiefComplaint) {
        summary += 'Chief complaint: ' + data.chiefComplaint + '\n';
    }
    
    var vitals = [];
    if (data.vitals.hr) vitals.push('HR ' + data.vitals.hr);
    if (data.vitals.bp) vitals.push('BP ' + data.vitals.bp);
    if (data.vitals.rr) vitals.push('RR ' + data.vitals.rr);
    if (data.vitals.spo2) vitals.push('SpO2 ' + data.vitals.spo2 + '%');
    
    if (vitals.length > 0) {
        summary += 'Vitals: ' + vitals.join(', ');
    }
    
    return summary;
}

// ==================== CHAT FUNCTIONS ====================

function handleSendMessage(e) {
    e.preventDefault();
    
    var messageInput = document.getElementById('messageInput');
    var message = messageInput.value.trim();
    
    if (!message || chatState.isLoading) return;
    
    console.log('Sending message:', message);
    
    // Check message limit for free users
    if (!chatState.isPro && chatState.messagesUsed >= window.paramind.CONFIG.freeTier.dailyMessages) {
        showLimitReached();
        return;
    }
    
    // Clear input
    messageInput.value = '';
    messageInput.style.height = 'auto';
    
    // Hide welcome message
    var welcomeMsg = document.getElementById('welcomeMessage');
    if (welcomeMsg) {
        welcomeMsg.style.display = 'none';
    }
    
    // Add user message
    addMessage('user', message);
    
    // Increment message count
    if (!chatState.isPro) {
        chatState.messagesUsed = window.paramind.storage.incrementMessageCount();
        updateMessageCounter();
    }
    
    // Show loading
    showLoading();
    
    // Get AI response
    sendToAI(message).then(function(response) {
        hideLoading();
        addMessage('assistant', response);
    }).catch(function(error) {
        hideLoading();
        addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
        console.error('Chat error:', error);
    });
}

function sendToAI(message) {
    return new Promise(function(resolve, reject) {
        // Simulate API delay
        setTimeout(function() {
            var lowerMessage = message.toLowerCase();
            
            // Demo responses based on keywords
            if (lowerMessage.includes('chest pain')) {
                resolve('**Based on ' + chatState.userTrust + ' guidelines:**\n\nFor chest pain assessment, use your systematic ABCDE approach:\n\n**Key Assessment Points:**\n• Onset, character, radiation, severity (0-10)\n• Associated symptoms: SOB, sweating, nausea, palpitations\n• Cardiac risk factors: smoking, diabetes, hypertension, family history, cholesterol\n• Previous cardiac history\n\n**Red Flags:**\n• Crushing/pressure sensation\n• Radiation to arm, jaw, or back\n• Diaphoresis\n• Associated breathlessness\n• Haemodynamic instability\n\n**Immediate Actions:**\n• 12-lead ECG\n• Aspirin 300mg (if not contraindicated)\n• GTN if SBP >90mmHg (and no contraindications)\n• IV access\n• Consider pain management\n\nWould you like me to go into more detail on any specific aspect?');
                return;
            }
            
            if (lowerMessage.includes('stemi') || lowerMessage.includes('nstemi')) {
                resolve('**STEMI vs NSTEMI:**\n\n**STEMI (ST-Elevation MI):**\n• Complete coronary artery occlusion\n• ST elevation ≥1mm in 2+ contiguous leads\n• Requires immediate PPCI pathway activation\n• Time-critical: door-to-balloon <90 minutes\n\n**NSTEMI (Non-ST-Elevation MI):**\n• Partial coronary occlusion\n• ST depression, T-wave inversion, or no ECG changes\n• Elevated troponin confirms diagnosis\n• Risk-stratified management\n\n**Pre-hospital Management (Both):**\n• Aspirin 300mg PO\n• GTN if SBP >90mmHg\n• Morphine for pain (with antiemetic)\n• Oxygen only if SpO2 <94%\n• Pre-alert receiving hospital\n\nRemember to follow your ' + chatState.userTrust + ' specific pathways.');
                return;
            }
            
            if (lowerMessage.includes('gtn') || lowerMessage.includes('contraindication')) {
                resolve('**GTN Contraindications (' + chatState.userTrust + ' JRCALC):**\n\n**Absolute Contraindications:**\n• SBP <90mmHg\n• HR <50 or >150 bpm\n• Right ventricular infarction (suspected/confirmed)\n• Severe aortic stenosis\n• Hypertrophic obstructive cardiomyopathy\n\n**Phosphodiesterase Inhibitors:**\n• Sildenafil/Vardenafil - within 24 hours\n• Tadalafil - within 48 hours\n\n**Relative Cautions:**\n• Raised intracranial pressure\n• Constrictive pericarditis\n• Already hypotensive\n\n**Administration:**\n• 400mcg sublingual spray\n• Can repeat after 5 minutes if pain persists\n• Monitor BP before and after');
                return;
            }
            
            if (lowerMessage.includes('differential') || lowerMessage.includes('diagnosis')) {
                resolve('I\'d be happy to help with differential diagnoses. To give you the most relevant guidance, could you tell me:\n\n1. What is the patient\'s main presenting complaint?\n2. Any key vital signs abnormalities?\n3. Relevant medical history?\n\nAlternatively, you can use the **Your Patient** section in the bottom menu to input the full clinical picture, and I\'ll provide structured guidance based on ' + chatState.userTrust + ' protocols.');
                return;
            }
            
            // Default response
            resolve('Thank you for your question. As your ' + chatState.userTrust + ' clinical assistant, I\'m here to help.\n\nI can assist with:\n• Patient assessment approaches\n• Differential diagnoses\n• Medication queries and calculations\n• Clinical pathways and protocols\n• Interactive learning scenarios\n\nTry the **Scenarios** section for interactive practice, or **Differentials** to explore conditions by body system.\n\nWhat would you like to know more about?');
            
        }, 1500);
    });
}

function addMessage(role, content) {
    var chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    var messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + role;
    
    var avatarIcon = role === 'user' ? 'bi-person' : 'bi-robot';
    
    messageDiv.innerHTML = '<div class="message-avatar">' +
        '<i class="bi ' + avatarIcon + '"></i>' +
        '</div>' +
        '<div class="message-content">' +
        window.paramind.utils.formatMessage(content) +
        '</div>';
    
    chatMessages.appendChild(messageDiv);
    chatState.messages.push({ role: role, content: content, timestamp: new Date() });
    
    scrollToBottom();
}

function showLoading() {
    chatState.isLoading = true;
    
    var sendBtn = document.getElementById('sendBtn');
    if (sendBtn) sendBtn.disabled = true;
    
    var chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    var loadingDiv = document.createElement('div');
    loadingDiv.className = 'message assistant';
    loadingDiv.id = 'loadingMessage';
    
    loadingDiv.innerHTML = '<div class="message-avatar">' +
        '<i class="bi bi-robot"></i>' +
        '</div>' +
        '<div class="message-content">' +
        '<div class="typing-indicator">' +
        '<span></span>' +
        '<span></span>' +
        '<span></span>' +
        '</div>' +
        '</div>';
    
    chatMessages.appendChild(loadingDiv);
    scrollToBottom();
}

function hideLoading() {
    chatState.isLoading = false;
    
    var sendBtn = document.getElementById('sendBtn');
    if (sendBtn) sendBtn.disabled = false;
    
    var loadingMsg = document.getElementById('loadingMessage');
    if (loadingMsg) {
        loadingMsg.remove();
    }
}

function updateMessageCounter() {
    var messagesUsedEl = document.getElementById('messagesUsed');
    if (messagesUsedEl) {
        messagesUsedEl.textContent = chatState.messagesUsed;
    }
    
    // Update banner styling based on usage
    var bannerEl = document.getElementById('messageLimitBanner');
    if (bannerEl && !chatState.isPro) {
        if (chatState.messagesUsed >= window.paramind.CONFIG.freeTier.dailyMessages) {
            bannerEl.style.background = 'rgba(220, 53, 69, 0.1)';
        }
    }
}

function showLimitReached() {
    var welcomeMsg = document.getElementById('welcomeMessage');
    if (welcomeMsg) {
        welcomeMsg.style.display = 'none';
    }
    
    var chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    var limitDiv = document.createElement('div');
    limitDiv.className = 'message assistant';
    
    limitDiv.innerHTML = '<div class="message-avatar">' +
        '<i class="bi bi-robot"></i>' +
        '</div>' +
        '<div class="message-content">' +
        '<strong>Daily message limit reached</strong><br><br>' +
        'You\'ve used all 5 free messages for today. Your limit resets at midnight.<br><br>' +
        '<a href="#" class="btn btn-primary btn-sm">' +
        '<i class="bi bi-star me-1"></i>Upgrade to Pro - £4.99/month' +
        '</a>' +
        '</div>';
    
    chatMessages.appendChild(limitDiv);
    scrollToBottom();
}

function clearChat() {
    chatState.messages = [];
    chatState.currentScenario = null;
    chatState.currentScenarioTitle = '';
    
    var chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    // Remove all messages except welcome
    var messages = chatMessages.querySelectorAll('.message, .alert');
    messages.forEach(function(msg) {
        msg.remove();
    });
}

function scrollToBottom() {
    var chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

console.log('chat.js loaded successfully');