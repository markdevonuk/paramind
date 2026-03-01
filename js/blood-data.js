/* ==================== BLOOD LAB DATA ====================
 * ParaMind Blood Lab - Marker Reference Data & Scenario Questions
 * 
 * Contains:
 *   1. bloodPanels[] - All blood test panels with markers, ranges, explanations
 *   2. scenarios[]   - 25 scenario-based quiz questions with realistic blood results
 *
 * Used by: blood-lab.html
 */

export const bloodPanels = [
    {
        id: 'fbc',
        name: 'Full Blood Count',
        shortName: 'FBC',
        icon: 'bi-droplet-fill',
        colour: '#DC3545',
        markers: [
            {
                id: 'hb',
                name: 'Haemoglobin (Hb)',
                unit: 'g/L',
                normalLow: 120,
                normalHigh: 170,
                absMin: 40,
                absMax: 220,
                step: 1,
                defaultVal: 145,
                maleLow: 130,
                maleHigh: 170,
                femaleLow: 120,
                femaleHigh: 150,
                whatIsIt: 'Haemoglobin is the protein inside red blood cells that carries oxygen from the lungs to every tissue in the body and brings carbon dioxide back. Think of it as the oxygen taxi service in your blood.',
                high: 'Raised Hb (polycythaemia) can indicate dehydration (making blood more concentrated), chronic hypoxia (body making more red cells to compensate — e.g., COPD, living at altitude), or polycythaemia vera (a bone marrow disorder). Can increase clotting risk.',
                low: 'Low Hb (anaemia) means reduced oxygen-carrying capacity. Causes include blood loss (trauma, GI bleeds), iron deficiency, chronic disease, or bone marrow problems. Patient may be pale, tired, tachycardic, and short of breath.',
                roadRelevance: 'Understanding Hb helps you recognise why your trauma patient is tachycardic and pale even when external bleeding seems controlled — they may have significant internal blood loss. A chronically anaemic patient may decompensate faster with even small additional blood loss.'
            },
            {
                id: 'wcc',
                name: 'White Cell Count (WCC)',
                unit: '×10⁹/L',
                normalLow: 4.0,
                normalHigh: 11.0,
                absMin: 0.5,
                absMax: 40.0,
                step: 0.1,
                defaultVal: 7.5,
                whatIsIt: 'White blood cells are the soldiers of your immune system. The total WCC tells you how active the immune response is. Different types of white cells fight different threats.',
                high: 'Raised WCC (leucocytosis) usually indicates infection or inflammation. Very high counts (>30) can suggest leukaemia. Also rises with stress, steroid use, and after trauma or surgery. Bacterial infections tend to push WCC higher than viral ones.',
                low: 'Low WCC (leucopenia) means a weakened immune system. Can be caused by viral infections (HIV, hepatitis), chemotherapy, bone marrow failure, or autoimmune conditions. These patients are vulnerable to overwhelming sepsis.',
                roadRelevance: 'When you suspect sepsis on the road, the hospital will look at WCC as part of the picture. A septic patient with a LOW WCC is actually more concerning than a high one — it suggests the immune system is being overwhelmed. This connects to your NEWS2 scoring.'
            },
            {
                id: 'platelets',
                name: 'Platelets (PLT)',
                unit: '×10⁹/L',
                normalLow: 150,
                normalHigh: 400,
                absMin: 10,
                absMax: 800,
                step: 5,
                defaultVal: 250,
                whatIsIt: 'Platelets are tiny cell fragments that clump together to form blood clots and stop bleeding. They are the first responders to any breach in a blood vessel wall.',
                high: 'Raised platelets (thrombocytosis) can occur with infection, inflammation, iron deficiency, or after splenectomy. Very high levels increase thrombosis risk — meaning higher chance of stroke, PE, or DVT.',
                low: 'Low platelets (thrombocytopenia) means impaired clotting. Causes include liver disease, DIC (disseminated intravascular coagulation), heparin treatment, alcohol excess, or autoimmune conditions. Risk of spontaneous bleeding when very low (<50).',
                roadRelevance: 'If your patient bruises easily, has petechiae (tiny red dots on skin), or has unexplained nosebleeds, they may have low platelets. This matters for trauma — a patient on anticoagulants with low platelets will bleed more and clot less.'
            },
            {
                id: 'neutrophils',
                name: 'Neutrophils',
                unit: '×10⁹/L',
                normalLow: 2.0,
                normalHigh: 7.5,
                absMin: 0.1,
                absMax: 25.0,
                step: 0.1,
                defaultVal: 4.5,
                whatIsIt: 'Neutrophils are the most abundant type of white blood cell and the first to arrive at sites of bacterial infection. They are your body\'s frontline infantry against bacteria.',
                high: 'Raised neutrophils strongly suggest bacterial infection. Also rise with inflammation, stress, steroid use, and tissue damage. A high neutrophil count with a left shift (immature neutrophils) suggests the body is in overdrive fighting infection.',
                low: 'Low neutrophils (neutropenia) are dangerous — the patient is at severe risk of infection. Often caused by chemotherapy, bone marrow disorders, or some medications. These patients need reverse barrier nursing in hospital.',
                roadRelevance: 'Neutrophils help you understand the difference between bacterial and viral infections. This connects to why some of your septic patients deteriorate rapidly — if their neutrophils are depleted, they have lost their primary defence against bacteria.'
            },
            {
                id: 'lymphocytes',
                name: 'Lymphocytes',
                unit: '×10⁹/L',
                normalLow: 1.0,
                normalHigh: 4.0,
                absMin: 0.1,
                absMax: 20.0,
                step: 0.1,
                defaultVal: 2.5,
                whatIsIt: 'Lymphocytes are the specialised forces of the immune system — they include T-cells (which destroy infected cells), B-cells (which make antibodies), and natural killer cells. They handle the targeted, adaptive immune response.',
                high: 'Raised lymphocytes (lymphocytosis) typically suggest viral infection (glandular fever, HIV, hepatitis). Chronic lymphocytic leukaemia (CLL) also causes persistently high lymphocytes. Can be raised in pertussis (whooping cough).',
                low: 'Low lymphocytes (lymphopenia) can indicate HIV/AIDS, steroid use, or severe stress response. Post-COVID patients often show persistent lymphopenia.',
                roadRelevance: 'A patient with raised lymphocytes and a normal neutrophil count points more towards a viral cause. This helps you understand why antibiotics won\'t help every febrile patient — viral infections fight via lymphocytes, not neutrophils.'
            }
        ]
    },
    {
        id: 'ue',
        name: 'Urea & Electrolytes',
        shortName: 'U&Es',
        icon: 'bi-moisture',
        colour: '#0D6EFD',
        markers: [
            {
                id: 'sodium',
                name: 'Sodium (Na⁺)',
                unit: 'mmol/L',
                normalLow: 135,
                normalHigh: 145,
                absMin: 110,
                absMax: 170,
                step: 1,
                defaultVal: 140,
                whatIsIt: 'Sodium is the most important electrolyte outside cells. It controls fluid balance — where sodium goes, water follows. It is essential for nerve impulse transmission and muscle contraction.',
                high: 'Hypernatraemia (>145) usually means dehydration — the patient has lost more water than salt. Common in elderly patients who don\'t drink enough, diabetes insipidus, or excessive sweating/diarrhoea. Causes confusion, lethargy, and seizures if severe.',
                low: 'Hyponatraemia (<135) is the most common electrolyte abnormality. Causes include SIADH, heart failure, liver disease, diuretics (especially thiazides), and excessive water intake. Severe cases cause confusion, seizures, and cerebral oedema.',
                roadRelevance: 'That confused elderly patient you attend — they might not be having a stroke. Severe hyponatraemia causes confusion, drowsiness, and seizures that can mimic stroke. This is why hospital bloods matter — the treatment is completely different.'
            },
            {
                id: 'potassium',
                name: 'Potassium (K⁺)',
                unit: 'mmol/L',
                normalLow: 3.5,
                normalHigh: 5.0,
                absMin: 2.0,
                absMax: 8.0,
                step: 0.1,
                defaultVal: 4.2,
                whatIsIt: 'Potassium is the key electrolyte inside cells. It is critical for electrical activity in the heart and muscles. Even small changes can have life-threatening effects on cardiac rhythm.',
                high: 'Hyperkalaemia (>5.5) is a medical emergency. Causes include renal failure (kidneys can\'t excrete it), ACE inhibitors, crush injuries (potassium floods out of damaged cells), Addison\'s disease, and acidosis. Causes tall peaked T-waves → widened QRS → VF/cardiac arrest.',
                low: 'Hypokalaemia (<3.5) causes muscle weakness, cramps, and arrhythmias. Common causes: diuretics (furosemide), vomiting, diarrhoea, and refeeding syndrome. ECG shows flattened T-waves and prominent U-waves. Risk of Torsades de Pointes.',
                roadRelevance: 'This is THE electrolyte for paramedics. Hyperkalaemia explains the peaked T-waves you see on your ECG. In cardiac arrest with a renal history, think hyperkalaemia. Crush injury patients release massive amounts of potassium when freed — that\'s why they can arrest on extrication.'
            },
            {
                id: 'urea',
                name: 'Urea',
                unit: 'mmol/L',
                normalLow: 2.5,
                normalHigh: 7.8,
                absMin: 0.5,
                absMax: 50.0,
                step: 0.1,
                defaultVal: 5.0,
                whatIsIt: 'Urea is a waste product made by the liver when it breaks down protein. The kidneys filter it out. It\'s a rough marker of kidney function and hydration status.',
                high: 'Raised urea can mean kidney failure (the kidneys aren\'t clearing waste), dehydration (blood is more concentrated), upper GI bleeding (blood is digested as protein), or a high-protein diet. Very high urea causes nausea, confusion, and uraemic symptoms.',
                low: 'Low urea is less clinically significant but can indicate liver disease (liver can\'t make urea), malnutrition, or overhydration.',
                roadRelevance: 'A raised urea in your dehydrated elderly patient or your GI bleed patient helps the hospital understand the severity. In GI bleeds, a disproportionately raised urea compared to creatinine suggests upper rather than lower GI bleeding — the digested blood acts as a protein load.'
            },
            {
                id: 'creatinine',
                name: 'Creatinine',
                unit: 'μmol/L',
                normalLow: 60,
                normalHigh: 120,
                absMin: 20,
                absMax: 1200,
                step: 5,
                defaultVal: 85,
                whatIsIt: 'Creatinine is a waste product from normal muscle metabolism. The kidneys excrete it at a constant rate, making it a more reliable marker of kidney function than urea. It\'s used to calculate eGFR (estimated glomerular filtration rate).',
                high: 'Raised creatinine indicates impaired kidney function (acute kidney injury or chronic kidney disease). Also raised in rhabdomyolysis (muscle breakdown), dehydration, and in patients with high muscle mass. A rapidly rising creatinine is an emergency.',
                low: 'Low creatinine can indicate low muscle mass, malnutrition, or liver disease. Less clinically significant on its own.',
                roadRelevance: 'Creatinine is the gold-standard kidney marker. When you transport a patient with renal failure to dialysis, their creatinine will be very high. In crush injuries and rhabdomyolysis, creatinine rises alongside potassium — both contributing to cardiac arrest risk.'
            },
            {
                id: 'egfr',
                name: 'eGFR',
                unit: 'mL/min',
                normalLow: 90,
                normalHigh: 120,
                absMin: 5,
                absMax: 120,
                step: 1,
                defaultVal: 95,
                whatIsIt: 'Estimated Glomerular Filtration Rate (eGFR) is a calculated measure of how well the kidneys are filtering blood. It\'s derived from creatinine, age, sex, and ethnicity. Think of it as the kidneys\' efficiency score.',
                high: 'A high eGFR is normal/good — the kidneys are filtering efficiently.',
                low: 'Low eGFR indicates kidney impairment. Stage 3 CKD is eGFR 30-59, Stage 4 is 15-29, Stage 5 is <15 (usually needing dialysis). Sudden drops indicate acute kidney injury.',
                roadRelevance: 'You\'ll see eGFR on discharge summaries. A patient with eGFR <30 has significant kidney disease and will be on restricted diets, adjusted medications, and may be near dialysis. This affects which drugs are safe to give them.'
            }
        ]
    },
    {
        id: 'lft',
        name: 'Liver Function Tests',
        shortName: 'LFTs',
        icon: 'bi-lungs',
        colour: '#198754',
        markers: [
            {
                id: 'alt',
                name: 'ALT (Alanine Transaminase)',
                unit: 'U/L',
                normalLow: 7,
                normalHigh: 56,
                absMin: 2,
                absMax: 5000,
                step: 5,
                defaultVal: 30,
                whatIsIt: 'ALT is an enzyme found mainly in liver cells. When liver cells are damaged or inflamed, ALT leaks into the blood. It\'s the most specific marker for liver cell damage.',
                high: 'Raised ALT indicates liver cell damage (hepatocellular injury). Very high levels (>1000) suggest acute hepatitis (viral, drug-induced, or paracetamol overdose), ischaemic hepatitis (shock liver), or autoimmune hepatitis. Moderate rises occur with fatty liver disease, alcohol excess, and medications.',
                low: 'Low ALT is normal and not clinically significant.',
                roadRelevance: 'In paracetamol overdose, ALT is the critical marker of liver damage. A patient who took paracetamol 24+ hours ago with a massively raised ALT is in serious trouble. This is why staggered overdoses are so dangerous — by the time they present, liver damage may already be severe.'
            },
            {
                id: 'ast',
                name: 'AST (Aspartate Transaminase)',
                unit: 'U/L',
                normalLow: 10,
                normalHigh: 40,
                absMin: 2,
                absMax: 5000,
                step: 5,
                defaultVal: 25,
                whatIsIt: 'AST is similar to ALT but is found in the liver, heart, muscle, and kidneys. It rises with liver damage but is less specific because it can also come from other tissues.',
                high: 'Raised AST with raised ALT suggests liver damage. AST higher than ALT (AST:ALT ratio >2:1) is a classic pattern of alcoholic liver disease. Very high AST also occurs in myocardial infarction, rhabdomyolysis, and muscle damage.',
                low: 'Low AST is normal and not clinically significant.',
                roadRelevance: 'The AST:ALT ratio helps doctors determine the cause of liver disease. AST also rises with muscle damage, so in your rhabdomyolysis patients (crush injuries, prolonged immobility), expect raised AST alongside raised CK and creatinine.'
            },
            {
                id: 'alp',
                name: 'ALP (Alkaline Phosphatase)',
                unit: 'U/L',
                normalLow: 30,
                normalHigh: 130,
                absMin: 10,
                absMax: 2000,
                step: 10,
                defaultVal: 80,
                whatIsIt: 'ALP is an enzyme found in the bile ducts of the liver and in bone. It rises when there is a blockage or inflammation in the bile ducts, or with bone disease.',
                high: 'Raised ALP with normal ALT/AST suggests a bile duct problem (cholestatic pattern) — could be gallstones blocking the duct, pancreatic head tumour, or drug reaction. Raised ALP with bone pain might indicate Paget\'s disease or bone metastases. Normally high in pregnancy and growing children.',
                low: 'Low ALP is rare and usually not clinically significant. Can occur in hypothyroidism and zinc deficiency.',
                roadRelevance: 'Understanding ALP helps you connect abdominal pain presentations to outcomes. Your jaundiced patient with right upper quadrant pain — if their ALP is sky-high, it points towards an obstructive cause (gallstones) rather than liver cell disease.'
            },
            {
                id: 'bilirubin',
                name: 'Bilirubin',
                unit: 'μmol/L',
                normalLow: 3,
                normalHigh: 21,
                absMin: 1,
                absMax: 400,
                step: 1,
                defaultVal: 12,
                whatIsIt: 'Bilirubin is the yellow pigment produced when red blood cells are broken down. The liver processes it and excretes it in bile. When bilirubin builds up, you get jaundice — the yellow discolouration of skin and sclera.',
                high: 'Raised bilirubin causes jaundice. Pre-hepatic causes: haemolytic anaemia (too many red cells being destroyed). Hepatic causes: hepatitis, cirrhosis, paracetamol overdose. Post-hepatic (obstructive): gallstones, pancreatic cancer blocking the bile duct.',
                low: 'Low bilirubin is not clinically significant.',
                roadRelevance: 'You assess for jaundice on the road. Understanding bilirubin helps you differentiate — a jaundiced patient with dark urine and pale stools has an obstructive cause (post-hepatic). A jaundiced patient with a known liver condition has a hepatic cause. This helps you convey the right picture at handover.'
            },
            {
                id: 'albumin',
                name: 'Albumin',
                unit: 'g/L',
                normalLow: 35,
                normalHigh: 50,
                absMin: 10,
                absMax: 55,
                step: 1,
                defaultVal: 42,
                whatIsIt: 'Albumin is the most abundant protein in the blood, made by the liver. It keeps fluid inside blood vessels (oncotic pressure) and transports substances around the body. It\'s a marker of the liver\'s synthetic function and overall nutrition.',
                high: 'High albumin is rare and usually just reflects dehydration concentrating the blood.',
                low: 'Low albumin (hypoalbuminaemia) causes oedema — fluid leaks out of blood vessels into tissues because there isn\'t enough protein to hold it in. Causes: liver disease (can\'t make it), kidney disease (leaking it out), malnutrition, sepsis, and chronic illness.',
                roadRelevance: 'That patient with swollen ankles and ascites (fluid-filled abdomen) may have low albumin from liver disease. Understanding this helps you recognise chronic liver disease presentations and explains why some patients have peripheral oedema despite normal cardiac function.'
            }
        ]
    },
    {
        id: 'coag',
        name: 'Coagulation',
        shortName: 'Coag',
        icon: 'bi-bandaid',
        colour: '#6F42C1',
        markers: [
            {
                id: 'inr',
                name: 'INR',
                unit: '',
                normalLow: 0.8,
                normalHigh: 1.2,
                absMin: 0.5,
                absMax: 10.0,
                step: 0.1,
                defaultVal: 1.0,
                whatIsIt: 'International Normalised Ratio (INR) measures how long blood takes to clot compared to normal. It standardises the prothrombin time (PT) across different labs. An INR of 1.0 is normal clotting speed.',
                high: 'High INR means blood is thinner (clots slower). Warfarin therapy targets INR 2-3 (or 3-4 for mechanical heart valves). INR >5 is a bleeding risk. INR >8 is a haemorrhage risk. Also raised in liver disease, vitamin K deficiency, and DIC.',
                low: 'Low INR is normal clotting. A very low INR in a patient supposed to be on warfarin might indicate non-compliance or dietary changes (too much vitamin K).',
                roadRelevance: 'INR is vital for your warfarin patients. A fall with head injury + INR of 6 = high risk of intracranial haemorrhage. Always ask warfarin patients about their last INR reading. This connects directly to your major trauma decision-making.'
            },
            {
                id: 'pt',
                name: 'Prothrombin Time (PT)',
                unit: 'seconds',
                normalLow: 10,
                normalHigh: 14,
                absMin: 8,
                absMax: 60,
                step: 0.5,
                defaultVal: 12,
                whatIsIt: 'PT measures how long it takes for the extrinsic clotting pathway to form a clot. It tests Factors I, II, V, VII, and X. PT is what INR is calculated from.',
                high: 'Prolonged PT means slower clotting via the extrinsic pathway. Causes: warfarin therapy, liver disease, vitamin K deficiency, DIC. Paired with a normal APTT, it suggests a Factor VII deficiency or warfarin effect.',
                low: 'Short PT is generally not clinically significant.',
                roadRelevance: 'PT and INR go hand-in-hand. Understanding the clotting cascade helps you appreciate why liver disease patients bleed — the liver makes most clotting factors, so when it fails, PT rises and the patient can\'t clot properly.'
            },
            {
                id: 'aptt',
                name: 'APTT',
                unit: 'seconds',
                normalLow: 25,
                normalHigh: 38,
                absMin: 15,
                absMax: 120,
                step: 1,
                defaultVal: 30,
                whatIsIt: 'Activated Partial Thromboplastin Time measures the intrinsic clotting pathway. It tests Factors I, II, V, VIII, IX, X, XI, and XII. Used to monitor heparin therapy.',
                high: 'Prolonged APTT: heparin therapy, haemophilia (Factor VIII or IX deficiency), von Willebrand disease, DIC, or lupus anticoagulant. If both PT and APTT are raised, suspect DIC, liver disease, or a common pathway problem.',
                low: 'Short APTT can paradoxically indicate increased clotting risk and is sometimes seen in active thrombosis or DIC.',
                roadRelevance: 'Patients on heparin infusions will have a monitored APTT. If you\'re transferring a patient on IV heparin, understanding APTT helps you communicate effectively with the receiving team. Both PT and APTT raised together in a bleeding patient = think DIC — a life-threatening emergency.'
            }
        ]
    },
    {
        id: 'cardiac',
        name: 'Cardiac Markers',
        shortName: 'Cardiac',
        icon: 'bi-heart-pulse-fill',
        colour: '#E63946',
        markers: [
            {
                id: 'troponin',
                name: 'Troponin (hsTnT)',
                unit: 'ng/L',
                normalLow: 0,
                normalHigh: 14,
                absMin: 0,
                absMax: 10000,
                step: 5,
                defaultVal: 5,
                whatIsIt: 'High-sensitivity Troponin T is a protein released into the blood when heart muscle cells are damaged. It is THE definitive marker for myocardial injury. Even tiny amounts indicate heart muscle damage.',
                high: 'Raised troponin confirms myocardial injury. In the context of chest pain + ECG changes = myocardial infarction. But troponin also rises in PE, myocarditis, sepsis, renal failure, heart failure exacerbation, and after cardioversion. A rising pattern (serial troponins) is more diagnostic than a single value.',
                low: 'Normal troponin helps rule out MI (in combination with timing and clinical picture). However, troponin may be normal in the first 3-6 hours after onset — hence serial testing.',
                roadRelevance: 'This is the blood test that confirms or rules out MI. When you hand over a chest pain patient, the first thing ED will do is order a troponin. Understanding the timing matters — if your patient\'s pain started 1 hour ago, the first troponin may be normal even if they ARE having an MI. That\'s why your clinical assessment and ECG matter.'
            },
            {
                id: 'bnp',
                name: 'BNP / NT-proBNP',
                unit: 'pg/mL',
                normalLow: 0,
                normalHigh: 100,
                absMin: 0,
                absMax: 20000,
                step: 50,
                defaultVal: 50,
                whatIsIt: 'B-type Natriuretic Peptide is released by the heart when it is stretched or under pressure. It\'s the key blood test for diagnosing and monitoring heart failure. Think of it as the heart\'s distress signal.',
                high: 'Raised BNP strongly suggests heart failure. The higher the BNP, the worse the heart failure. BNP >400 pg/mL is very likely heart failure. Also raised in PE, renal failure, sepsis, and atrial fibrillation. BNP helps differentiate cardiac from non-cardiac causes of breathlessness.',
                low: 'Normal BNP (<100 pg/mL) effectively rules out heart failure as the cause of breathlessness. This has a very high negative predictive value.',
                roadRelevance: 'BNP helps answer the question you face regularly on the road: "Is this patient breathless because of their heart or their lungs?" You can\'t test BNP pre-hospital, but understanding it helps you communicate with the hospital team and understand the diagnostic pathway your patient will go through.'
            }
        ]
    },
    {
        id: 'metabolic',
        name: 'Metabolic',
        shortName: 'Metabolic',
        icon: 'bi-lightning-charge-fill',
        colour: '#FD7E14',
        markers: [
            {
                id: 'glucose',
                name: 'Blood Glucose',
                unit: 'mmol/L',
                normalLow: 4.0,
                normalHigh: 7.0,
                absMin: 1.0,
                absMax: 40.0,
                step: 0.5,
                defaultVal: 5.5,
                whatIsIt: 'Blood glucose is the concentration of sugar in the blood. It\'s the body\'s primary energy source, especially for the brain. Regulated by insulin (lowers it) and glucagon (raises it).',
                high: 'Hyperglycaemia (>7 fasting, >11 random) indicates diabetes or stress response. Very high levels (>20) with ketones = DKA (type 1) or HHS (type 2) — both emergencies. DKA presents with Kussmaul breathing, fruity breath, abdominal pain. HHS presents with profound dehydration and confusion.',
                low: 'Hypoglycaemia (<4 mmol/L) is an emergency. Causes: insulin/sulphonylurea overdose, missed meals, liver failure, sepsis, alcohol excess, Addison\'s disease. Causes sweating, tremor, confusion, seizures, and can lead to coma and death if untreated.',
                roadRelevance: 'BM checks are bread and butter for paramedics. But understanding the blood glucose in the wider context of hospital bloods helps you appreciate why hypoglycaemia in a non-diabetic is a red flag (liver failure? sepsis? Addison\'s?) and why the hospital cares about trends, not just single readings.'
            },
            {
                id: 'hba1c',
                name: 'HbA1c',
                unit: 'mmol/mol',
                normalLow: 20,
                normalHigh: 42,
                absMin: 15,
                absMax: 130,
                step: 1,
                defaultVal: 35,
                whatIsIt: 'HbA1c measures the average blood glucose over the last 2-3 months. It shows what percentage of haemoglobin has glucose attached to it. Think of it as the long-term blood sugar report card.',
                high: 'HbA1c ≥48 mmol/mol (6.5%) = diabetes diagnosis. 42-47 = pre-diabetes. Higher levels indicate poorer glucose control over months. HbA1c >75 means very poorly controlled diabetes with increased complication risk.',
                low: 'Very low HbA1c may indicate frequent hypoglycaemic episodes, anaemia, or blood loss (new red cells haven\'t had time to accumulate glucose).',
                roadRelevance: 'When you see a diabetic patient\'s recent HbA1c on their records, it tells you how well controlled they\'ve been. A high HbA1c means they\'re at greater risk of the complications you see on the road — neuropathy, retinopathy, cardiovascular events, and DKA.'
            },
            {
                id: 'lactate',
                name: 'Lactate',
                unit: 'mmol/L',
                normalLow: 0.5,
                normalHigh: 2.0,
                absMin: 0.3,
                absMax: 20.0,
                step: 0.1,
                defaultVal: 1.2,
                whatIsIt: 'Lactate is produced when cells switch to anaerobic metabolism — i.e., when tissues aren\'t getting enough oxygen. It\'s a critical marker of tissue perfusion and is central to sepsis management.',
                high: 'Raised lactate (>2 mmol/L) indicates tissue hypoperfusion — cells are starved of oxygen. Causes: sepsis, shock (any type), cardiac arrest, severe anaemia, mesenteric ischaemia, seizures, and exercise. Lactate >4 is associated with high mortality in sepsis and triggers the sepsis 6 bundle.',
                low: 'Low lactate is normal and reassuring.',
                roadRelevance: 'Lactate is the single most important marker for tissue perfusion. You can\'t measure it on the road (without iSTAT), but it\'s the first thing ED checks in your septic or shocked patients. A patient who LOOKS ok but has a lactate of 6 is in serious trouble — this is why sepsis screening catches people early.'
            }
        ]
    },
    {
        id: 'abg',
        name: 'Blood Gases (ABG)',
        shortName: 'ABG',
        icon: 'bi-wind',
        colour: '#0DCAF0',
        markers: [
            {
                id: 'ph',
                name: 'pH',
                unit: '',
                normalLow: 7.35,
                normalHigh: 7.45,
                absMin: 6.80,
                absMax: 7.80,
                step: 0.01,
                defaultVal: 7.40,
                whatIsIt: 'Blood pH measures how acidic or alkaline the blood is. The body maintains it in a very tight range. Even small deviations cause significant physiological effects. Normal pH is 7.35-7.45.',
                high: 'Alkalosis (pH >7.45): Respiratory alkalosis = hyperventilation (anxiety, PE, pain). Metabolic alkalosis = vomiting (losing acid), diuretics, or excessive bicarbonate. Alkalosis causes tingling, muscle spasms, and arrhythmias.',
                low: 'Acidosis (pH <7.35): Respiratory acidosis = CO₂ retention (COPD, sedation, exhaustion). Metabolic acidosis = DKA, renal failure, sepsis/shock, aspirin overdose. Severe acidosis (<7.1) is life-threatening — the heart becomes resistant to drugs and prone to arrest.',
                roadRelevance: 'Understanding pH helps you appreciate why DKA patients have Kussmaul breathing — they\'re trying to blow off CO₂ to compensate for metabolic acidosis. It also explains why prolonged cardiac arrest has a poor prognosis — the acidosis becomes so severe that adrenaline stops working.'
            },
            {
                id: 'pao2',
                name: 'PaO₂',
                unit: 'kPa',
                normalLow: 10.0,
                normalHigh: 13.3,
                absMin: 3.0,
                absMax: 60.0,
                step: 0.5,
                defaultVal: 12.0,
                whatIsIt: 'Partial pressure of oxygen in arterial blood. It measures how much oxygen is dissolved in the blood and reflects how well the lungs are transferring oxygen into the bloodstream.',
                high: 'High PaO₂ (>13.3 kPa) usually means the patient is on supplemental oxygen. Excessive oxygen can be harmful in COPD patients (suppresses hypoxic drive) and in neonates (retinopathy of prematurity).',
                low: 'Low PaO₂ (<10 kPa) = hypoxaemia. Type 1 respiratory failure is defined as PaO₂ <8 kPa. Causes: pneumonia, PE, COPD exacerbation, asthma, pulmonary oedema, ARDS. The lower the PaO₂, the more critical the situation.',
                roadRelevance: 'PaO₂ gives a more accurate picture of oxygenation than SpO₂. Your pulse oximeter shows 94% — that could mean PaO₂ of 8.5 kPa. On the steep part of the oxygen dissociation curve, small drops in PaO₂ cause big drops in SpO₂. This is why patients can look fine then suddenly decompensate.'
            },
            {
                id: 'paco2',
                name: 'PaCO₂',
                unit: 'kPa',
                normalLow: 4.7,
                normalHigh: 6.0,
                absMin: 1.5,
                absMax: 15.0,
                step: 0.1,
                defaultVal: 5.3,
                whatIsIt: 'Partial pressure of carbon dioxide in arterial blood. CO₂ is the waste product of metabolism and is removed by breathing. PaCO₂ reflects how well the lungs are ventilating.',
                high: 'High PaCO₂ (>6.0 kPa) = hypercapnia = respiratory acidosis. The patient isn\'t breathing out enough CO₂. Causes: COPD, exhaustion, opiate overdose, neuromuscular disease, severe asthma. Type 2 respiratory failure = low O₂ + high CO₂. Patient becomes drowsy, confused, with bounding pulse and headache.',
                low: 'Low PaCO₂ (<4.7 kPa) = respiratory alkalosis = hyperventilation. Causes: anxiety, pain, PE, early sepsis, compensation for metabolic acidosis (Kussmaul breathing in DKA). Usually corrects when the underlying cause is treated.',
                roadRelevance: 'PaCO₂ explains why you give controlled oxygen in COPD — some patients rely on hypoxic drive, and too much O₂ removes the stimulus to breathe, causing CO₂ to rise further. It also explains why your tiring asthmatic is the one in most danger — they stop being able to breathe out enough CO₂.'
            },
            {
                id: 'hco3',
                name: 'Bicarbonate (HCO₃⁻)',
                unit: 'mmol/L',
                normalLow: 22,
                normalHigh: 26,
                absMin: 5,
                absMax: 45,
                step: 1,
                defaultVal: 24,
                whatIsIt: 'Bicarbonate is the body\'s main chemical buffer against acid. The kidneys control it. When the body produces too much acid, bicarbonate neutralises it. Think of it as the acid-mopping system.',
                high: 'High bicarbonate (>26): Metabolic alkalosis (vomiting, diuretics) or compensation for chronic respiratory acidosis (COPD — the kidneys retain bicarbonate to buffer the chronically high CO₂).',
                low: 'Low bicarbonate (<22): Metabolic acidosis — the bicarbonate has been used up buffering acid. Causes: DKA, renal failure, sepsis, lactic acidosis, diarrhoea (losing bicarbonate directly). Also seen in compensation for respiratory alkalosis.',
                roadRelevance: 'In COPD patients, a high bicarbonate suggests chronic CO₂ retention — the kidneys have compensated over time. This helps you understand their baseline. In DKA patients, low bicarbonate tells you how much acid has built up. Both help you frame your handover with real understanding.'
            },
            {
                id: 'be',
                name: 'Base Excess (BE)',
                unit: 'mmol/L',
                normalLow: -2,
                normalHigh: 2,
                absMin: -30,
                absMax: 30,
                step: 1,
                defaultVal: 0,
                whatIsIt: 'Base excess measures how much extra acid or base is in the blood beyond what\'s normal. It strips out the respiratory component to show the purely metabolic acid-base status. Negative = too much acid. Positive = too much base.',
                high: 'Positive base excess (>+2): Metabolic alkalosis — excess base in the blood. Causes: vomiting, excessive bicarbonate administration, chronic respiratory acidosis compensation.',
                low: 'Negative base excess (<-2): Metabolic acidosis — excess acid in the blood. The more negative, the worse the acidosis. BE of -10 indicates severe metabolic acidosis. Seen in shock, DKA, renal failure, and prolonged cardiac arrest.',
                roadRelevance: 'Base excess is a quick way to see how acidotic a patient is metabolically. In trauma, a very negative base excess tells you the patient has been in shock for a while — it\'s a predictor of mortality. On HEMS/critical care, you\'ll see iSTAT readings including BE — a falling BE means the patient is deteriorating.'
            },
            {
                id: 'abg_lactate',
                name: 'Lactate (ABG)',
                unit: 'mmol/L',
                normalLow: 0.5,
                normalHigh: 2.0,
                absMin: 0.3,
                absMax: 20.0,
                step: 0.1,
                defaultVal: 1.2,
                whatIsIt: 'Lactate on an ABG is the same marker as in venous blood — it indicates tissue hypoperfusion. ABGs often include lactate automatically, giving an immediate reading alongside the gas analysis.',
                high: 'Raised lactate on ABG has the same significance — tissue hypoperfusion, sepsis, shock. The advantage of ABG lactate is speed — it comes back in 2 minutes alongside the gas results, rather than waiting for formal blood results.',
                low: 'Normal lactate on ABG is reassuring for tissue perfusion.',
                roadRelevance: 'In the ED, the ABG lactate is often the FIRST result available. It can confirm or refute your pre-hospital suspicion of sepsis or shock within minutes of arrival. Your clinical assessment on scene directly feeds into how urgently the team processes the ABG.'
            }
        ]
    },
    {
        id: 'inflammatory',
        name: 'Inflammatory Markers',
        shortName: 'Inflam',
        icon: 'bi-fire',
        colour: '#E67E22',
        markers: [
            {
                id: 'crp',
                name: 'CRP (C-Reactive Protein)',
                unit: 'mg/L',
                normalLow: 0,
                normalHigh: 5,
                absMin: 0,
                absMax: 500,
                step: 5,
                defaultVal: 2,
                whatIsIt: 'CRP is a protein made by the liver in response to inflammation. It rises quickly (within 6-8 hours) and falls quickly when inflammation resolves. It\'s a non-specific but sensitive marker of inflammation.',
                high: 'Raised CRP indicates inflammation somewhere in the body. Mild (5-50): minor infection, chronic inflammation. Moderate (50-200): significant infection, autoimmune flare. Severe (>200): serious bacterial infection, sepsis, or major tissue damage. CRP above 100 is rarely caused by a viral infection.',
                low: 'Normal CRP is reassuring but doesn\'t completely rule out infection in the very early stages.',
                roadRelevance: 'CRP helps the hospital determine if infection or inflammation is present. When your patient with abdominal pain turns out to have a CRP of 350, it confirms significant pathology. Understanding CRP helps you appreciate why some of your "vague" patients end up seriously unwell — their bloods tell the story their symptoms underplayed.'
            },
            {
                id: 'esr',
                name: 'ESR (Erythrocyte Sediment Rate)',
                unit: 'mm/hr',
                normalLow: 0,
                normalHigh: 20,
                absMin: 0,
                absMax: 150,
                step: 5,
                defaultVal: 10,
                whatIsIt: 'ESR measures how quickly red blood cells settle to the bottom of a test tube. Inflammation makes proteins coat the red cells, making them clump and sink faster. ESR is slower to rise and fall than CRP — it reflects inflammation over weeks rather than hours.',
                high: 'Raised ESR suggests chronic inflammation. Very high ESR (>100): temporal arteritis (giant cell arteritis), multiple myeloma, severe infection, autoimmune conditions. A raised ESR with headache in an elderly patient = temporal arteritis until proven otherwise.',
                low: 'Low ESR is normal. Can be falsely low in polycythaemia and sickle cell disease.',
                roadRelevance: 'If you attend an elderly patient with sudden-onset unilateral headache and jaw pain, temporal arteritis (GCA) should be on your differential. The hospital will check ESR urgently — if it\'s very high (>50), it supports the diagnosis and the patient needs immediate steroids to prevent blindness.'
            }
        ]
    },
    {
        id: 'thyroid',
        name: 'Thyroid Function',
        shortName: 'Thyroid',
        icon: 'bi-shield-plus',
        colour: '#20C997',
        markers: [
            {
                id: 'tsh',
                name: 'TSH (Thyroid Stimulating Hormone)',
                unit: 'mU/L',
                normalLow: 0.4,
                normalHigh: 4.0,
                absMin: 0.01,
                absMax: 100,
                step: 0.1,
                defaultVal: 2.0,
                whatIsIt: 'TSH is released by the pituitary gland to tell the thyroid to produce more hormones. It works as an inverse indicator — high TSH means the thyroid ISN\'T producing enough (hypothyroid), low TSH means it\'s producing too much (hyperthyroid).',
                high: 'High TSH = hypothyroidism (underactive thyroid). The pituitary is screaming at the thyroid to work harder. Symptoms: weight gain, fatigue, cold intolerance, bradycardia, constipation, dry skin, depression. Myxoedema coma is the extreme emergency presentation.',
                low: 'Low TSH = hyperthyroidism (overactive thyroid). The pituitary has backed off because there\'s too much thyroid hormone. Symptoms: weight loss, tremor, anxiety, tachycardia, AF, heat intolerance, diarrhoea. Thyroid storm is the extreme emergency.',
                roadRelevance: 'Thyroid emergencies are rare but dangerous. Myxoedema coma presents with hypothermia, bradycardia, and reduced GCS. Thyroid storm presents with extreme tachycardia, hyperthermia, and agitation. Both can be mistaken for other conditions on the road. Knowing thyroid function helps you make sense of these rare presentations.'
            },
            {
                id: 'ft4',
                name: 'Free T4 (Thyroxine)',
                unit: 'pmol/L',
                normalLow: 9,
                normalHigh: 22,
                absMin: 2,
                absMax: 80,
                step: 1,
                defaultVal: 15,
                whatIsIt: 'Free T4 is the unbound, active form of thyroxine — the main hormone produced by the thyroid gland. It\'s converted to T3 (the more active form) in tissues. Free T4 is measured alongside TSH to confirm thyroid disorders.',
                high: 'High Free T4 = hyperthyroidism (with low TSH) or overmedication with levothyroxine. Confirms excessive thyroid hormone in the blood.',
                low: 'Low Free T4 = hypothyroidism (with high TSH). Confirms insufficient thyroid hormone production.',
                roadRelevance: 'Understanding T4 alongside TSH helps you interpret the full thyroid picture. Many of your elderly patients are on levothyroxine for hypothyroidism — if they\'ve been taking too much (or their dose was recently changed), they can present with symptoms that mimic cardiac or neurological emergencies.'
            },
            {
                id: 'ft3',
                name: 'Free T3 (Triiodothyronine)',
                unit: 'pmol/L',
                normalLow: 3.1,
                normalHigh: 6.8,
                absMin: 1.0,
                absMax: 25.0,
                step: 0.1,
                defaultVal: 5.0,
                whatIsIt: 'Free T3 is the most biologically active thyroid hormone — it\'s 3-5 times more potent than T4. Most T3 is produced by converting T4 in the tissues. T3 is particularly important in diagnosing T3 thyrotoxicosis where T4 may be normal but T3 is raised.',
                high: 'High Free T3: Hyperthyroidism, T3 thyrotoxicosis (where T4 is normal but T3 is elevated). In thyroid storm, T3 levels are significantly elevated and driving the extreme metabolic state.',
                low: 'Low Free T3: Hypothyroidism, sick euthyroid syndrome (where the body reduces T3 conversion during severe illness — this is a protective mechanism and doesn\'t need thyroid treatment).',
                roadRelevance: 'In thyroid storm, it\'s the excessive T3 driving the dangerous tachycardia, hyperthermia, and cardiovascular collapse. Understanding this helps you recognise why beta-blockers are a key part of the treatment — they counteract the effect of excess thyroid hormones on the heart.'
            }
        ]
    }
];

// ==================== SCENARIO QUIZ DATA ====================
export const scenarios = [
    {
        id: 1,
        dispatch: '72-year-old female, generally unwell for 3 days, confused today. Known UTI history. Temp 38.9°C, HR 118, BP 88/52, RR 26, SpO₂ 95% on air.',
        category: 'Sepsis',
        bloods: { wcc: 22.4, neutrophils: 19.8, crp: 287, lactate: 4.8, urea: 14.2, creatinine: 210, sodium: 131, potassium: 5.4, ph: 7.28, glucose: 8.2 },
        question: 'Which combination of results is most concerning and why?',
        options: [
            'Raised WCC and CRP — confirms infection is present',
            'Lactate of 4.8 with pH 7.28 — indicates severe sepsis with tissue hypoperfusion and metabolic acidosis',
            'Raised urea and creatinine — shows chronic kidney disease',
            'Sodium of 131 — causing her confusion'
        ],
        correct: 1,
        explanation: 'The lactate of 4.8 combined with a pH of 7.28 indicates severe sepsis with significant tissue hypoperfusion and metabolic acidosis. Lactate >4 triggers the sepsis 6 bundle. The raised WCC/CRP confirm infection, but it\'s the lactate and acidosis that indicate severity. The raised urea/creatinine likely represent acute kidney injury secondary to sepsis, not chronic disease. The mildly low sodium alone wouldn\'t cause this degree of confusion.'
    },
    {
        id: 2,
        dispatch: '58-year-old male, central chest pain for 90 minutes, radiating to left arm, diaphoretic. HR 92, BP 145/88, RR 18, SpO₂ 98%. Bloods taken 4 hours after onset:',
        category: 'Cardiac',
        bloods: { troponin: 892, bnp: 180, wcc: 12.8, crp: 18, glucose: 9.2, potassium: 4.1, creatinine: 88 },
        question: 'What does this blood panel most likely confirm?',
        options: [
            'Heart failure — the BNP is raised',
            'Acute myocardial infarction — the troponin of 892 confirms significant myocardial injury',
            'Infection — the WCC is raised',
            'Diabetic emergency — the glucose is 9.2'
        ],
        correct: 1,
        explanation: 'A troponin of 892 ng/L (normal <14) taken 4 hours after symptom onset confirms significant myocardial injury consistent with acute MI. The mildly raised BNP reflects cardiac strain but isn\'t diagnostic of heart failure here. The slightly raised WCC is a stress response. The glucose of 9.2 is a stress hyperglycaemia, not a diabetic emergency.'
    },
    {
        id: 3,
        dispatch: '24-year-old female, Type 1 diabetic, vomiting for 12 hours, abdominal pain, drowsy. BM reading HI. HR 128, BP 100/60, RR 36 (Kussmaul), SpO₂ 99%.',
        category: 'DKA',
        bloods: { glucose: 32.4, ph: 7.08, hco3: 8, be: -18, potassium: 5.8, sodium: 128, lactate: 3.2, urea: 12.1, creatinine: 148 },
        question: 'Which result best indicates the severity of this DKA?',
        options: [
            'Glucose of 32.4 — extremely high blood sugar',
            'Potassium of 5.8 — risk of cardiac arrest',
            'pH of 7.08 with bicarbonate of 8 and BE of -18 — severe metabolic acidosis',
            'Sodium of 128 — severe hyponatraemia'
        ],
        correct: 2,
        explanation: 'The pH of 7.08, bicarbonate of 8, and base excess of -18 indicate severe metabolic acidosis — this is what makes DKA life-threatening, not the glucose level alone. The Kussmaul breathing is the body\'s attempt to blow off CO₂ to compensate. The potassium of 5.8 is actually misleading — total body potassium is depleted in DKA despite the high reading (acidosis shifts K⁺ out of cells). As insulin corrects the acidosis, potassium will plummet. The glucose, while high, is not what kills in DKA — the acidosis is.'
    },
    {
        id: 4,
        dispatch: '45-year-old male found collapsed at building site, trapped under rubble for ~4 hours before extrication. Alert but in pain. HR 108, BP 95/60.',
        category: 'Crush Injury',
        bloods: { potassium: 7.2, creatinine: 380, urea: 18.4, ph: 7.18, lactate: 6.1, ast: 1200, alt: 180 },
        question: 'What is the most immediately life-threatening result?',
        options: [
            'Creatinine of 380 — acute kidney failure',
            'Potassium of 7.2 — imminent risk of fatal cardiac arrhythmia',
            'Lactate of 6.1 — tissue hypoperfusion',
            'AST of 1200 — liver damage'
        ],
        correct: 1,
        explanation: 'Potassium of 7.2 is immediately life-threatening. In crush injuries, massive amounts of potassium are released from damaged muscle cells on reperfusion. At K⁺ >6.5, the risk of VF and cardiac arrest is high. The ECG will likely show peaked T-waves and widened QRS. The raised creatinine reflects rhabdomyolysis-related kidney injury. The very high AST is from muscle damage (not liver — note ALT is only mildly raised). Treatment priority is calcium gluconate to stabilise the myocardium, insulin/dextrose to drive potassium into cells, and aggressive fluid resuscitation.'
    },
    {
        id: 5,
        dispatch: '68-year-old male, sudden onset severe tearing chest pain radiating to back. Known hypertensive. HR 62, BP 210/118 (right arm), BP 168/90 (left arm).',
        category: 'Aortic',
        bloods: { hb: 98, lactate: 5.4, creatinine: 168, troponin: 45, inr: 1.1, potassium: 4.8 },
        question: 'How do these bloods fit with the clinical picture?',
        options: [
            'The troponin of 45 confirms MI as the primary diagnosis',
            'The low Hb suggests chronic anaemia unrelated to this presentation',
            'The raised lactate and creatinine with low Hb suggest aortic dissection with end-organ malperfusion — the troponin rise is secondary to aortic root involvement',
            'The normal INR rules out any bleeding'
        ],
        correct: 2,
        explanation: 'The BP differential between arms, tearing pain, and bloods together suggest aortic dissection. The Hb of 98 suggests blood loss (into the false lumen or mediastinum). Raised lactate indicates organs aren\'t being perfused properly. Raised creatinine suggests renal malperfusion. The mild troponin rise (45) can occur when the dissection involves the aortic root and compromises coronary blood flow — this is a secondary finding, not primary MI. The INR being normal tells us the patient isn\'t anticoagulated, but doesn\'t "rule out bleeding" — dissection causes mechanical bleeding, not coagulopathic bleeding.'
    },
    {
        id: 6,
        dispatch: '82-year-old female, fall at home, head injury, on warfarin for AF. GCS 14 (confused). HR 78, BP 155/88.',
        category: 'Coagulation',
        bloods: { inr: 5.8, pt: 52, platelets: 165, hb: 118, creatinine: 95 },
        question: 'What is the key concern from these results?',
        options: [
            'The platelets are normal so bleeding risk is low',
            'The INR of 5.8 puts her at very high risk of intracranial haemorrhage following head injury',
            'The Hb of 118 rules out significant bleeding',
            'The creatinine is normal so her kidneys are fine'
        ],
        correct: 1,
        explanation: 'An INR of 5.8 (therapeutic range for AF is 2-3) means her blood is much thinner than intended and clotting is severely impaired. Combined with a head injury, this puts her at very high risk of intracranial haemorrhage. Even a seemingly minor head injury can cause a subdural or extradural bleed in an over-anticoagulated patient. The normal Hb doesn\'t rule out bleeding — intracranial bleeds don\'t show in Hb initially. She needs urgent CT head, INR reversal (vitamin K ± prothrombin complex concentrate), and neurosurgical input.'
    },
    {
        id: 7,
        dispatch: '35-year-old female, 8 weeks post-partum, progressive shortness of breath for 2 weeks, now worse with bilateral ankle oedema. HR 110, BP 100/68, RR 24, SpO₂ 92%.',
        category: 'Heart Failure',
        bloods: { bnp: 2800, troponin: 38, hb: 108, sodium: 130, creatinine: 105, alt: 65, albumin: 28 },
        question: 'What diagnosis do these bloods support?',
        options: [
            'Pulmonary embolism — post-partum with breathlessness',
            'Anaemia — Hb of 108 explains all her symptoms',
            'Peripartum cardiomyopathy with acute heart failure — massively raised BNP with mild troponin rise',
            'Liver disease — low albumin and raised ALT'
        ],
        correct: 2,
        explanation: 'BNP of 2800 is massively elevated, strongly confirming heart failure. In a young post-partum woman, peripartum cardiomyopathy is the key diagnosis. The mild troponin rise (38) reflects myocardial strain from the failing heart. The low albumin and mildly raised ALT are secondary to hepatic congestion from right heart failure. The Hb of 108 is mildly low (common post-partum) but doesn\'t explain the BNP or clinical picture. While PE should be excluded, the very high BNP points to heart failure as the primary problem.'
    },
    {
        id: 8,
        dispatch: '19-year-old male, found unresponsive by friends, suspected deliberate paracetamol overdose 18 hours ago. GCS 12, jaundiced. HR 118, BP 90/55.',
        category: 'Overdose',
        bloods: { alt: 4200, ast: 3800, inr: 6.2, bilirubin: 85, creatinine: 210, ph: 7.22, lactate: 8.5, glucose: 2.8 },
        question: 'Which results indicate the worst prognosis?',
        options: [
            'ALT of 4200 — massive liver cell death',
            'INR of 6.2 with pH <7.25 and hypoglycaemia — these are King\'s College criteria for liver transplant referral',
            'Bilirubin of 85 — causing the jaundice',
            'Creatinine of 210 — acute kidney injury'
        ],
        correct: 1,
        explanation: 'The combination of INR >6.5 (his is 6.2 and rising), pH <7.3 (his is 7.22), and renal impairment (creatinine 210) meets King\'s College Hospital criteria for emergency liver transplant referral. The pH <7.25 alone, or the combination of INR >6.5 + creatinine >300 + grade III encephalopathy, are criteria. The hypoglycaemia (glucose 2.8) indicates the liver can no longer maintain glucose production — a very late and ominous sign. The massively raised ALT confirms hepatocyte death but alone doesn\'t predict prognosis. This patient needs critical care and likely liver transplant assessment.'
    },
    {
        id: 9,
        dispatch: '55-year-old male, sudden onset breathlessness, pleuritic chest pain, right calf swollen. Recent long-haul flight. HR 120, BP 108/70, RR 28, SpO₂ 88%.',
        category: 'PE',
        bloods: { troponin: 120, bnp: 650, pao2: 7.2, paco2: 3.8, ph: 7.48, lactate: 3.1, hb: 148 },
        question: 'How do these results support the suspected diagnosis of PE?',
        options: [
            'The troponin confirms MI — not PE',
            'The high Hb causes the breathlessness',
            'Low PaO₂ with low PaCO₂ (type 1 respiratory failure), raised troponin and BNP from right heart strain, and raised lactate all support a significant PE',
            'The alkalotic pH means the patient is hyperventilating from anxiety'
        ],
        correct: 2,
        explanation: 'This is a classic massive PE blood picture. PaO₂ of 7.2 kPa with PaCO₂ of 3.8 kPa = type 1 respiratory failure (low oxygen despite hyperventilating). The low PaCO₂ causes the respiratory alkalosis (pH 7.48). The troponin of 120 isn\'t from MI — it\'s from right ventricular strain as the clot blocks the pulmonary circulation. The raised BNP (650) confirms the right heart is under significant pressure. Lactate of 3.1 shows early tissue hypoperfusion. Together these bloods indicate a haemodynamically significant PE that may need thrombolysis.'
    },
    {
        id: 10,
        dispatch: '78-year-old male, melena (black tarry stools) for 2 days, dizziness on standing, looks pale. HR 108, BP 96/58 (lying), 78/50 (standing), RR 20.',
        category: 'GI Bleed',
        bloods: { hb: 62, urea: 28.4, creatinine: 98, inr: 1.0, platelets: 210, lactate: 3.8, potassium: 3.2 },
        question: 'What is most significant about the urea:creatinine ratio?',
        options: [
            'Both are raised indicating chronic kidney disease',
            'The creatinine is normal so the kidneys are fine and the urea doesn\'t matter',
            'The massively raised urea with normal creatinine is characteristic of upper GI bleeding — digested blood acts as a protein load raising urea disproportionately',
            'The urea is raised from dehydration alone'
        ],
        correct: 2,
        explanation: 'A urea of 28.4 with a normal creatinine of 98 gives a very high urea:creatinine ratio. This is characteristic of upper GI bleeding — when blood enters the stomach and upper GI tract, it is digested like any protein, and the breakdown products are absorbed and converted to urea by the liver. This raises urea disproportionately to creatinine. The Hb of 62 is dangerously low and this patient needs urgent blood transfusion. The raised lactate confirms tissue hypoperfusion from blood loss. The low potassium may be from the GI losses. The normal INR and platelets are reassuring from a coagulation perspective.'
    },
    {
        id: 11,
        dispatch: '64-year-old female, known COPD, increasing breathlessness over 3 days, purulent sputum, drowsy. HR 98, BP 148/82, RR 12 (shallow), SpO₂ 82% on air.',
        category: 'COPD',
        bloods: { ph: 7.24, pao2: 6.1, paco2: 10.8, hco3: 34, be: 8, wcc: 15.2, crp: 95 },
        question: 'How would you interpret this ABG?',
        options: [
            'Pure respiratory alkalosis from hyperventilation',
            'Acute on chronic type 2 respiratory failure — raised PaCO₂ with partial metabolic compensation (raised HCO₃⁻), now decompensated with acidotic pH',
            'Metabolic acidosis with respiratory compensation',
            'Normal ABG for a COPD patient'
        ],
        correct: 1,
        explanation: 'This shows acute on chronic type 2 respiratory failure. The PaCO₂ is very high (10.8 kPa) indicating severe CO₂ retention. The bicarbonate is raised (34) showing the kidneys have been compensating chronically — but the pH is acidotic (7.24), meaning the respiratory component has acutely worsened beyond what the kidneys can buffer. The PaO₂ of 6.1 confirms severe hypoxaemia. The infection (raised WCC and CRP) has tipped this COPD patient into acute decompensation. Note the low respiratory rate (12) — this patient is tiring and may need non-invasive ventilation or intubation.'
    },
    {
        id: 12,
        dispatch: '42-year-old female, progressive fatigue, weight gain, constipation, feeling cold. HR 52, BP 105/70, RR 14, temp 35.2°C.',
        category: 'Thyroid',
        bloods: { tsh: 58.0, ft4: 4.2, ft3: 2.1, hb: 105, sodium: 128, glucose: 3.2, crp: 4 },
        question: 'What do these thyroid results indicate?',
        options: [
            'Hyperthyroidism — the TSH is very high',
            'Normal thyroid function — the CRP is normal',
            'Severe hypothyroidism — TSH is massively raised because the pituitary is desperately trying to stimulate a failing thyroid, with very low T4 and T3',
            'Secondary hypothyroidism from pituitary failure'
        ],
        correct: 2,
        explanation: 'TSH of 58 (normal 0.4-4.0) is massively elevated — the pituitary gland is screaming at the thyroid to produce more hormones. Free T4 of 4.2 (normal 9-22) and Free T3 of 2.1 (normal 3.1-6.8) are both critically low. This is primary hypothyroidism — the thyroid itself has failed. The clinical picture matches: bradycardia, hypothermia, weight gain, fatigue, constipation. The low sodium (128) is common in severe hypothyroidism (due to SIADH). The mild anaemia (Hb 105) is also associated. The low glucose (3.2) is concerning — hypothyroidism can cause hypoglycaemia. If this patient\'s GCS drops, think myxoedema coma.'
    },
    {
        id: 13,
        dispatch: '28-year-old male, RTC motorbike vs car, significant mechanism, complaining of left-sided abdominal pain, left shoulder tip pain. HR 125, BP 88/52, RR 26.',
        category: 'Trauma',
        bloods: { hb: 78, lactate: 7.2, ph: 7.22, be: -12, platelets: 98, inr: 1.8, potassium: 3.8 },
        question: 'What do these bloods tell you about this trauma patient?',
        options: [
            'The low Hb is from a pre-existing anaemia',
            'The normal potassium means there\'s nothing to worry about',
            'Acute blood loss (Hb 78) with developing coagulopathy (raised INR, low platelets) and severe shock (lactate 7.2, acidotic pH, very negative base excess) — consistent with haemorrhagic shock progressing toward the lethal triad',
            'The low platelets suggest a chronic clotting disorder'
        ],
        correct: 2,
        explanation: 'This is the trauma lethal triad in progress: hypothermia (not shown but implied), acidosis (pH 7.22, BE -12), and coagulopathy (INR 1.8, platelets 98). The Hb of 78 confirms significant blood loss. The left-sided abdominal pain with shoulder tip pain (Kehr\'s sign) suggests splenic injury with diaphragmatic irritation. Lactate of 7.2 indicates severe tissue hypoperfusion. This patient needs massive transfusion protocol, damage control surgery, and the clock is ticking. The bloods confirm what your clinical assessment suspected — this patient is bleeding internally and decompensating.'
    },
    {
        id: 14,
        dispatch: '70-year-old male, known alcoholic, found confused, abdominal distension, jaundiced. HR 92, BP 108/62.',
        category: 'Liver',
        bloods: { albumin: 18, bilirubin: 145, alt: 68, ast: 142, alp: 180, inr: 2.8, platelets: 62, sodium: 126, creatinine: 185, hb: 92 },
        question: 'What pattern does this blood panel show?',
        options: [
            'Acute hepatitis — very high ALT',
            'Decompensated chronic liver disease — low albumin, raised bilirubin, coagulopathy (raised INR, low platelets), hyponatraemia, and hepatorenal syndrome (raised creatinine)',
            'Gallstone obstruction — raised ALP',
            'The anaemia is the primary problem'
        ],
        correct: 1,
        explanation: 'This is classic decompensated cirrhosis. Low albumin (18) indicates the liver can\'t synthesise protein — causing the ascites (abdominal distension). Raised bilirubin (145) causes jaundice. The AST:ALT ratio >2:1 is characteristic of alcoholic liver disease. Raised INR (2.8) and low platelets (62) indicate impaired clotting from liver failure plus portal hypertension (spleen destroys platelets). The raised creatinine (185) suggests hepatorenal syndrome. Hyponatraemia (126) is from fluid retention. The mild anaemia is multifactorial. This patient has a very poor prognosis.'
    },
    {
        id: 15,
        dispatch: '52-year-old female, shortness of breath for 3 months, now struggling to walk up stairs. No chest pain. HR 104, BP 118/72, RR 20, SpO₂ 97%.',
        category: 'Anaemia',
        bloods: { hb: 58, wcc: 5.2, platelets: 380, creatinine: 72, sodium: 140, potassium: 4.0, crp: 8 },
        question: 'What is the most likely cause of her symptoms?',
        options: [
            'Heart failure — she has exertional breathlessness',
            'COPD — chronic breathlessness',
            'Severe anaemia (Hb 58) — the isolated low Hb with normal WCC and raised platelets suggests iron deficiency anaemia, likely from chronic blood loss',
            'Infection — raised CRP'
        ],
        correct: 2,
        explanation: 'Hb of 58 is severely anaemic and fully explains her progressive breathlessness and tachycardia — the heart is working harder to compensate for reduced oxygen-carrying capacity. The normal WCC rules out haematological malignancy or infection. Raised platelets (380) are a reactive thrombocytosis commonly seen in iron deficiency. Normal renal function and electrolytes. The CRP of 8 is trivially raised. The most likely cause is iron deficiency from chronic blood loss (heavy menstruation is the most common cause in a 52-year-old woman). She needs iron studies, a GI investigation to exclude bowel pathology, and likely blood transfusion given the severity.'
    },
    {
        id: 16,
        dispatch: '33-year-old male, palpitations, weight loss, tremor, feeling anxious and hot all the time. HR 148 (irregular), BP 152/68, RR 18, temp 37.8°C.',
        category: 'Thyroid',
        bloods: { tsh: 0.01, ft4: 68, ft3: 22.4, glucose: 8.8, potassium: 3.4, alt: 52, wcc: 11.2 },
        question: 'What thyroid emergency should you be concerned about?',
        options: [
            'Hypothyroidism — the TSH is low',
            'Normal thyroid — the symptoms are from anxiety',
            'Thyrotoxicosis approaching thyroid storm — suppressed TSH with massively elevated T4 and T3, tachycardia, pyrexia, and AF',
            'The raised glucose indicates DKA'
        ],
        correct: 2,
        explanation: 'TSH of 0.01 (essentially undetectable) with Free T4 of 68 and Free T3 of 22.4 (both massively elevated) confirms severe thyrotoxicosis. The irregular heart rate of 148 is likely thyrotoxic atrial fibrillation. The pyrexia (37.8°C), agitation, and tachycardia raise concern for thyroid storm — a life-threatening emergency. The raised glucose is a stress response to excess thyroid hormones (not DKA). The low-normal potassium (3.4) occurs because thyroid hormones drive potassium into cells. Mild ALT rise reflects the metabolic overdrive affecting the liver. This patient needs urgent beta-blockade and anti-thyroid treatment.'
    },
    {
        id: 17,
        dispatch: '6-year-old male, rash that doesn\'t disappear under a glass, fever 39.5°C for 6 hours, drowsy, neck stiffness. HR 160, BP 75/40, RR 32, cap refill 5 sec.',
        category: 'Meningitis',
        bloods: { wcc: 1.8, neutrophils: 0.4, platelets: 48, crp: 320, lactate: 6.8, inr: 2.4, ph: 7.18, glucose: 2.1, sodium: 128 },
        question: 'What is most alarming about the WCC result?',
        options: [
            'It\'s raised, confirming infection',
            'It\'s normal for a child',
            'It\'s dangerously LOW (1.8) with almost no neutrophils (0.4) — the immune system is being overwhelmed by the infection, which carries a much worse prognosis than a high WCC',
            'WCC doesn\'t matter in children'
        ],
        correct: 2,
        explanation: 'A WCC of 1.8 with neutrophils of only 0.4 in the context of meningococcal sepsis is terrifying. Rather than the expected leucocytosis, the immune system is being overwhelmed — the infection is destroying white cells faster than they can be produced. This carries a significantly worse prognosis than a high WCC. The bloods show DIC developing (low platelets 48, raised INR 2.4), severe metabolic acidosis (pH 7.18), tissue hypoperfusion (lactate 6.8), and hypoglycaemia (glucose 2.1). The non-blanching rash + shock + DIC = fulminant meningococcal septicaemia. This child needs immediate IV antibiotics, fluid resuscitation, and transfer to PICU.'
    },
    {
        id: 18,
        dispatch: '50-year-old male, abdominal pain for 24 hours, now rigid abdomen, not passed urine for 12 hours. Known heavy drinker. HR 118, BP 90/55, temp 38.6°C.',
        category: 'Pancreatitis',
        bloods: { wcc: 18.6, crp: 410, alt: 85, ast: 120, alp: 210, bilirubin: 48, glucose: 16.8, lactate: 4.2, creatinine: 220, calcium_not_shown: true },
        question: 'Which results suggest severe acute pancreatitis rather than a simple acute abdomen?',
        options: [
            'Just the raised WCC — this confirms appendicitis',
            'The raised ALT and AST — this is liver failure',
            'The combination of very high CRP (>150 predicts severity), hyperglycaemia (pancreas can\'t produce insulin), raised bilirubin and ALP (possible gallstone cause), and acute kidney injury — all markers of severe pancreatitis',
            'The lactate alone — this just means sepsis'
        ],
        correct: 2,
        explanation: 'Severe acute pancreatitis produces a distinctive blood picture. CRP >150 at 48h is a predictor of severity (his is already 410). The raised glucose (16.8) occurs because the inflamed pancreas can\'t produce adequate insulin. The raised bilirubin (48) and ALP (210) suggest a gallstone may be blocking the common bile duct (gallstone pancreatitis). The raised creatinine (220) indicates acute kidney injury from third-space fluid losses and hypoperfusion. The mildly raised ALT/AST can occur with bile duct obstruction. This patient needs aggressive IV fluids, analgesia, and likely ERCP if gallstone pancreatitis is confirmed.'
    },
    {
        id: 19,
        dispatch: '72-year-old female, suddenly unable to speak, right-sided weakness, onset 45 minutes ago. HR 88 (irregular), BP 178/96.',
        category: 'Stroke',
        bloods: { glucose: 6.2, inr: 1.0, platelets: 245, creatinine: 82, sodium: 141, potassium: 4.0, hb: 132 },
        question: 'Why are these "normal" bloods actually important in acute stroke?',
        options: [
            'They\'re not important — the diagnosis is clinical and based on imaging',
            'The raised BP is the only concern',
            'Normal glucose (excludes hypoglycaemia mimicking stroke), normal INR and platelets (safe for thrombolysis), normal renal function (safe for CT contrast) — these bloods ENABLE treatment, not diagnose',
            'The irregular heart rate confirms AF is causing the stroke'
        ],
        correct: 2,
        explanation: 'In acute stroke, blood tests don\'t diagnose — they enable treatment. Normal glucose (6.2) rules out hypoglycaemia, which can perfectly mimic stroke. Normal INR (1.0) and adequate platelets (245) mean thrombolysis can be given safely if the CT shows ischaemic stroke. Normal creatinine (82) means CT contrast is safe if CT angiography is needed. The irregular pulse suggests AF as the stroke mechanism (cardioembolism). These bloods are taken in parallel with the CT scan — any delay costs brain tissue. This is why your pre-alert with FAST-positive findings and time of onset is so critical.'
    },
    {
        id: 20,
        dispatch: '86-year-old female, nursing home resident, hasn\'t eaten for 5 days, found increasingly confused. HR 52, BP 100/58, temp 34.8°C.',
        category: 'Metabolic',
        bloods: { sodium: 118, potassium: 5.8, urea: 22.4, creatinine: 285, glucose: 2.4, tsh: 72, ft4: 3.8, ph: 7.28, hb: 92 },
        question: 'How many concurrent problems can you identify in this panel?',
        options: [
            'Just dehydration — the raised urea and creatinine',
            'Just hypothyroidism — the raised TSH',
            'Multiple concurrent emergencies: severe hyponatraemia (118), hyperkalaemia (5.8), acute kidney injury (creatinine 285), hypoglycaemia (2.4), severe hypothyroidism (TSH 72), and metabolic acidosis — this patient is critically unwell with overlapping pathologies',
            'The blood results are unreliable in confused patients'
        ],
        correct: 2,
        explanation: 'This frail elderly patient has multiple life-threatening derangements happening simultaneously. Severe hyponatraemia (118) — enough alone to cause seizures and confusion. Hyperkalaemia (5.8) — cardiac arrest risk, potentially worsened by the AKI. Acute kidney injury (creatinine 285) — kidneys failing, not clearing potassium or acid. Hypoglycaemia (2.4) — brain fuel running out. Severe hypothyroidism (TSH 72, FT4 3.8) — with hypothermia and bradycardia, approaching myxoedema coma. Metabolic acidosis (pH 7.28). Each problem compounds the others. This is sadly common in frail elderly patients who stop eating and drinking — one problem triggers a cascade of metabolic failure.'
    },
    {
        id: 21,
        dispatch: '30-year-old female, sudden onset severe headache ("worst ever"), neck stiffness, vomiting. GCS 14. HR 68, BP 165/95.',
        category: 'Neurology',
        bloods: { hb: 138, wcc: 14.2, platelets: 220, inr: 1.0, sodium: 132, potassium: 3.8, creatinine: 62, glucose: 8.4, crp: 12 },
        question: 'What is the significance of these bloods in a suspected subarachnoid haemorrhage?',
        options: [
            'The raised WCC proves meningitis, not SAH',
            'The raised glucose proves diabetic ketoacidosis',
            'The bloods are essentially normal enough to not delay CT — the mild WCC rise and hyperglycaemia are stress responses. Normal clotting and platelets are reassuring for any surgical intervention needed',
            'The low sodium means SIADH has already developed'
        ],
        correct: 2,
        explanation: 'In suspected SAH, the bloods serve a similar role to stroke — they enable management rather than diagnose. The mildly raised WCC (14.2) is a stress response (SAH causes sympathetic surge), not infection. Glucose of 8.4 is also stress-related. Normal INR and platelets mean clotting is intact — important because if a cerebral aneurysm is found, the patient may need neurosurgical clipping or endovascular coiling urgently. Normal renal function allows safe CT contrast for CT angiography. The mildly low sodium (132) may reflect early SIADH, which commonly develops after SAH. The diagnosis comes from CT brain (and LP if CT is negative within 6 hours of onset).'
    },
    {
        id: 22,
        dispatch: '48-year-old male, Type 2 diabetic, found confused by wife, excessive thirst for 1 week, polyuria. BM reads 44.2. HR 110, BP 100/55, RR 18, SpO₂ 97%.',
        category: 'HHS',
        bloods: { glucose: 48.6, sodium: 158, potassium: 4.8, urea: 32, creatinine: 310, ph: 7.32, hco3: 20, be: -3, lactate: 2.8 },
        question: 'How does this differ from DKA?',
        options: [
            'It doesn\'t — high glucose means DKA',
            'The pH is near-normal (7.32) and bicarbonate is only mildly reduced (20) — this is HHS, not DKA. The hallmarks are extreme hyperglycaemia (>30), severe dehydration (Na 158, urea 32, creatinine 310), and high osmolality WITHOUT the severe acidosis seen in DKA',
            'The normal respiratory rate proves there\'s no emergency',
            'The raised creatinine means this is a kidney problem'
        ],
        correct: 1,
        explanation: 'HHS (Hyperosmolar Hyperglycaemic State) differs from DKA in key ways. The glucose is extremely high (48.6 — even higher than typical DKA). BUT the pH is 7.32 (near-normal) and bicarbonate is 20 (not severely depleted) — because HHS patients still produce enough insulin to prevent ketoacidosis, just not enough to control glucose. The sodium of 158 indicates profound dehydration. The massively raised urea (32) and creatinine (310) reflect severe dehydration and pre-renal AKI. These patients are often MORE dehydrated than DKA patients (6-9L fluid deficit). The mortality rate for HHS (15-20%) is actually higher than DKA because of the patient demographic and complication risk. Fluid replacement is the priority treatment.'
    },
    {
        id: 23,
        dispatch: '62-year-old male, chest pain, syncope, now in cardiac arrest — PEA. ROSC achieved after 8 minutes. HR 45, BP 82/50.',
        category: 'Arrest',
        bloods: { potassium: 6.8, ph: 7.05, lactate: 12.4, be: -22, troponin: 2400, creatinine: 450, glucose: 14.2, hb: 140 },
        question: 'Which results reflect the cardiac arrest itself vs the underlying cause?',
        options: [
            'Everything is caused by the cardiac arrest',
            'The troponin is the only important result',
            'Potassium (6.8) and creatinine (450) likely pre-existed and may have CAUSED the arrest (hyperkalaemic arrest). The pH (7.05), lactate (12.4), and base excess (-22) reflect the prolonged period of no cardiac output. The very high troponin reflects both possible MI and arrest-related myocardial damage',
            'These bloods are unreliable after cardiac arrest'
        ],
        correct: 2,
        explanation: 'Post-ROSC bloods tell two stories. The potassium of 6.8 with creatinine of 450 suggests renal failure was present BEFORE the arrest — the hyperkalaemia likely caused the PEA arrest (this is one of the 4Hs). The severe acidosis (pH 7.05), extreme lactate (12.4), and base excess of -22 result from 8 minutes of no cardiac output — tissues were completely starved of oxygen. The troponin of 2400 is multifactorial — could be underlying MI that triggered the arrest AND/OR myocardial damage from the arrest itself and CPR. Distinguishing cause from consequence is critical for ongoing management — this patient may need urgent dialysis to clear the potassium.'
    },
    {
        id: 24,
        dispatch: '38-year-old female, progressive weakness in legs over 2 weeks, now arms affected, difficulty breathing. HR 78, BP 125/75, RR 22 (shallow), SpO₂ 95%.',
        category: 'Neurology',
        bloods: { hb: 130, wcc: 8.2, crp: 15, sodium: 139, potassium: 3.9, creatinine: 68, glucose: 5.8, ph: 7.36, paco2: 5.8, pao2: 9.5 },
        question: 'These bloods are mostly normal. Why might that actually be significant?',
        options: [
            'Normal bloods mean there\'s nothing seriously wrong',
            'The CRP of 15 explains everything — it\'s an infection',
            'Near-normal bloods in a patient with progressive ascending weakness and respiratory compromise point AWAY from metabolic/infective causes and TOWARDS a neurological diagnosis like Guillain-Barré syndrome. The mildly reduced PaO₂ shows early respiratory muscle involvement — this patient needs FVC monitoring',
            'The blood gas is completely normal'
        ],
        correct: 2,
        explanation: 'Sometimes what the bloods DON\'T show is as important as what they do. Normal FBC, electrolytes, inflammatory markers, and renal function in a patient with progressive ascending weakness effectively rule out metabolic and most infective causes. This pattern — ascending weakness, areflexia, respiratory involvement, mostly normal bloods — is classic for Guillain-Barré syndrome. The PaO₂ of 9.5 (low-normal) and PaCO₂ of 5.8 (high-normal) show early respiratory compromise — the diaphragm is weakening. This is a medical emergency not because of the bloods, but because respiratory failure can progress rapidly. FVC monitoring is critical — FVC <20mL/kg or falling by >30% = intubation.'
    },
    {
        id: 25,
        dispatch: '44-year-old male, severe abdominal pain, profuse watery diarrhoea for 3 days, muscle cramps, feels dizzy. HR 118, BP 85/48, RR 22.',
        category: 'Electrolyte',
        bloods: { potassium: 2.2, sodium: 126, urea: 18.5, creatinine: 195, ph: 7.52, hco3: 34, be: 10, glucose: 4.8, wcc: 9.8, crp: 42 },
        question: 'What is the most dangerous result here?',
        options: [
            'The low sodium — causing his dizziness',
            'The raised creatinine — kidney failure',
            'Potassium of 2.2 — critically low, risk of fatal cardiac arrhythmias including Torsades de Pointes and cardiac arrest. The metabolic alkalosis (pH 7.52, high HCO₃⁻) from the diarrhoea is driving potassium even lower',
            'The CRP — suggesting infection is the cause'
        ],
        correct: 2,
        explanation: 'Potassium of 2.2 is a medical emergency. At this level, the risk of Torsades de Pointes (a polymorphic VT), VF, and cardiac arrest is very high. The ECG will likely show flattened T-waves, prominent U-waves, and ST depression. The profuse diarrhoea has caused massive potassium losses. The metabolic alkalosis (pH 7.52, HCO₃⁻ 34) makes it worse — in alkalosis, hydrogen ions come out of cells and potassium moves IN, further lowering serum potassium. The raised urea (18.5) and creatinine (195) reflect severe dehydration and pre-renal AKI. This patient needs cardiac monitoring, cautious IV potassium replacement (too fast can also cause arrest), and aggressive fluid resuscitation.'
    }
];