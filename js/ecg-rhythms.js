/* ============================================================
   js/ecg-rhythms.js — shared ECG rhythm data and waveform drawing
   ------------------------------------------------------------
   Used by the new ECG area (ecg-rhythm.html, ecg-test.html).
   Copied unchanged from ecg2.html so every page draws the same traces.
   A waveform fix made here reaches every page that loads this file.

   Provides (as globals, so js/rois.js and the page code can use them):
     rhythms            — the 25 rhythms: name, colour, rates, description, key features
     generateWaveform(rhythm, rate, width) — the points to draw on the monitor
     generateAFBeat(), generatePQRST()     — helpers used by generateWaveform

   IMPORTANT: generateWaveform reads a global called `time` (the animation
   clock). The page that loads this file must declare `let time = 0;` and
   advance it in its animation loop, exactly as ecg.html does.
   ============================================================ */
// ==================== ECG RHYTHM DATA ====================
const rhythms = {
    normalSinus: {
        name: "Normal Sinus Rhythm",
        description: "Regular rhythm with consistent P waves before each QRS complex. Rate 60-100 bpm.",
        keyFeatures: ["Regular R-R intervals", "P wave before each QRS", "Normal PR interval (0.12-0.20s)", "Narrow QRS (<0.12s)"],
        defaultRate: 75,
        minRate: 60,
        maxRate: 100,
        color: "#22c55e"
    },
    sinusBradycardia: {
        name: "Sinus Bradycardia",
        description: "Normal sinus rhythm but rate below 60 bpm. May be normal in athletes or during sleep.",
        keyFeatures: ["Regular rhythm", "Rate < 60 bpm", "Normal P waves", "Normal PR and QRS"],
        defaultRate: 45,
        minRate: 30,
        maxRate: 59,
        color: "#3b82f6"
    },
    sinusTachycardia: {
        name: "Sinus Tachycardia",
        description: "Normal sinus rhythm but rate above 100 bpm. Often a response to pain, anxiety, fever, or hypovolaemia.",
        keyFeatures: ["Regular rhythm", "Rate > 100 bpm", "Normal P waves", "Normal PR and QRS"],
        defaultRate: 120,
        minRate: 101,
        maxRate: 180,
        color: "#f59e0b"
    },
    sinusArrhythmia: {
        name: "Sinus Arrhythmia",
        description: "Normal variant where heart rate increases with inspiration and decreases with expiration. Common in young, fit individuals.",
        keyFeatures: ["Rate varies with breathing", "P wave before each QRS", "Normal PR and QRS", "Benign normal variant"],
        defaultRate: 70,
        minRate: 55,
        maxRate: 90,
        color: "#22c55e"
    },
    atrialFibrillation: {
        name: "Atrial Fibrillation",
        description: "Chaotic atrial activity with irregular ventricular response. No discernible P waves.",
        keyFeatures: ["Irregularly irregular rhythm", "No P waves (fibrillatory baseline)", "Variable R-R intervals", "Narrow QRS usually"],
        defaultRate: 90,
        minRate: 40,
        maxRate: 180,
        color: "#ef4444"
    },
    atrialFlutter: {
        name: "Atrial Flutter",
        description: "Organised atrial activity at ~300 bpm with characteristic 'sawtooth' flutter waves.",
        keyFeatures: ["Regular or regularly irregular", "Sawtooth flutter waves", "Atrial rate ~300 bpm", "Variable AV block (2:1, 3:1, 4:1)"],
        defaultRate: 150,
        minRate: 75,
        maxRate: 150,
        color: "#f97316"
    },
    svt: {
        name: "Supraventricular Tachycardia (SVT)",
        description: "Rapid regular rhythm originating from above the ventricles. Characterised by sudden onset and offset.",
        keyFeatures: ["Regular narrow complex", "Rate 150-250 bpm", "P waves often hidden", "Sudden onset/offset"],
        defaultRate: 180,
        minRate: 150,
        maxRate: 250,
        color: "#f59e0b"
    },
    ventricularTachycardia: {
        name: "Ventricular Tachycardia (VT)",
        description: "Life-threatening rhythm arising from the ventricles. Wide QRS complexes at a rapid rate. Shockable rhythm if pulseless.",
        keyFeatures: ["Wide QRS (>0.12s)", "Rate typically 150-250 bpm", "No P waves visible", "AV dissociation may be present"],
        defaultRate: 180,
        minRate: 100,
        maxRate: 250,
        color: "#dc2626",
        emergency: true
    },
    torsadesDePointes: {
        name: "Torsades de Pointes",
        description: "Polymorphic VT with characteristic 'twisting of the points' pattern. Associated with prolonged QT interval.",
        keyFeatures: ["Twisting QRS axis", "Spindle-shaped amplitude", "Associated with long QT", "Polymorphic QRS morphology"],
        defaultRate: 200,
        minRate: 150,
        maxRate: 300,
        color: "#dc2626"
    },
    ventricularFibrillation: {
        name: "Ventricular Fibrillation (VF)",
        description: "CARDIAC ARREST RHYTHM. Chaotic ventricular activity with no cardiac output. Shockable rhythm.",
        keyFeatures: ["Chaotic, irregular waveform", "No identifiable QRS", "No pulse", "SHOCKABLE RHYTHM"],
        defaultRate: 0,
        minRate: 0,
        maxRate: 0,
        color: "#dc2626",
        emergency: true
    },
    asystole: {
        name: "Asystole",
        description: "CARDIAC ARREST RHYTHM. Flat line with no electrical activity. Non-shockable rhythm.",
        keyFeatures: ["Flat line", "No QRS complexes", "No pulse", "NON-SHOCKABLE RHYTHM"],
        defaultRate: 0,
        minRate: 0,
        maxRate: 0,
        color: "#dc2626",
        emergency: true
    },
    pea: {
        name: "Pulseless Electrical Activity (PEA)",
        description: "CARDIAC ARREST RHYTHM. Organised electrical activity but no pulse. Non-shockable rhythm.",
        keyFeatures: ["Any organised rhythm", "NO PULSE despite rhythm", "Non-shockable", "Consider reversible causes"],
        defaultRate: 60,
        minRate: 20,
        maxRate: 100,
        color: "#dc2626",
        emergency: true
    },
    firstDegreeBlock: {
        name: "First Degree Heart Block",
        description: "Prolonged PR interval (>0.20s) but all P waves conducted. Usually benign.",
        keyFeatures: ["PR interval > 0.20s", "All P waves conducted", "Regular rhythm", "1:1 P:QRS relationship"],
        defaultRate: 70,
        minRate: 50,
        maxRate: 100,
        color: "#8b5cf6"
    },
    secondDegreeMobitz1: {
        name: "Second Degree Block (Mobitz I)",
        description: "Progressive PR prolongation until a beat is dropped (Wenckebach). Usually at AV node level.",
        keyFeatures: ["Progressive PR prolongation", "Dropped QRS after longest PR", "Grouped beating pattern", "Usually narrow QRS"],
        defaultRate: 60,
        minRate: 40,
        maxRate: 80,
        color: "#8b5cf6"
    },
    secondDegreeMobitz2: {
        name: "Second Degree Block (Mobitz II)",
        description: "Intermittent non-conducted P waves without PR prolongation. Higher risk of progression to complete block.",
        keyFeatures: ["Constant PR interval", "Sudden dropped QRS", "May have wide QRS", "Higher risk than Mobitz I"],
        defaultRate: 50,
        minRate: 30,
        maxRate: 70,
        color: "#8b5cf6"
    },
    thirdDegreeBlock: {
        name: "Third Degree (Complete) Heart Block",
        description: "Complete AV dissociation. Atria and ventricles beat independently. May cause syncope.",
        keyFeatures: ["AV dissociation", "Regular P waves (faster)", "Regular QRS (slower)", "No relationship between P and QRS"],
        defaultRate: 35,
        minRate: 20,
        maxRate: 50,
        color: "#8b5cf6"
    },
    junctionalRhythm: {
        name: "Junctional Rhythm",
        description: "Rhythm originating from the AV junction. No normal P waves — may see inverted P waves before, during, or after QRS.",
        keyFeatures: ["Narrow QRS complex", "Rate 40-60 bpm", "Absent or inverted P waves", "Regular rhythm"],
        defaultRate: 50,
        minRate: 40,
        maxRate: 60,
        color: "#06b6d4"
    },
    wpw: {
        name: "Wolff-Parkinson-White (WPW)",
        description: "Pre-excitation syndrome with accessory pathway. Short PR, delta wave, wide QRS. If AF develops, impulses can race down the accessory pathway, producing a very fast, irregular, broad complex rhythm.",
        keyFeatures: ["Short PR interval (<0.12s)", "Delta wave (slurred QRS upstroke)", "Wide QRS complex", "AVOID AV nodal blockers in AF"],
        defaultRate: 80,
        minRate: 60,
        maxRate: 100,
        color: "#f97316"
    },
    pvcs: {
        name: "Premature Ventricular Complexes (PVCs)",
        description: "Early wide QRS beats arising from the ventricles, interrupting normal sinus rhythm. Usually benign if isolated.",
        keyFeatures: ["Wide, bizarre QRS morphology", "Compensatory pause after PVC", "No preceding P wave for PVC", "Normal beats between PVCs"],
        defaultRate: 72,
        minRate: 60,
        maxRate: 100,
        color: "#f59e0b"
    },
    pacs: {
        name: "Premature Atrial Complexes (PACs)",
        description: "Early beats arising from ectopic atrial focus. P wave morphology differs from sinus P waves. Usually benign.",
        keyFeatures: ["Early P wave with different shape", "Narrow QRS usually follows", "Incomplete compensatory pause", "Common and usually benign"],
        defaultRate: 75,
        minRate: 60,
        maxRate: 100,
        color: "#f59e0b"
    },
    hyperkalaemia: {
        name: "Hyperkalaemia Pattern",
        description: "ECG changes caused by dangerously high potassium. Progressive: tall peaked T waves → widened QRS → sine wave → potential cardiac arrest if not treated.",
        keyFeatures: ["Tall, peaked T waves", "Widened QRS complex", "Flattened/absent P waves"],
        defaultRate: 65,
        minRate: 40,
        maxRate: 80,
        color: "#dc2626"
    },
    stemi: {
        name: "ST-Elevation (STEMI Pattern)",
        description: "ST-segment elevation indicating acute myocardial infarction. IMMEDIATE catheter lab activation. Look for reciprocal ST depression.",
        keyFeatures: ["ST elevation ≥1mm in 2+ contiguous leads", "Reciprocal ST depression", "May have pathological Q waves", "TIME-CRITICAL — activate cath lab"],
        defaultRate: 85,
        minRate: 50,
        maxRate: 120,
        color: "#dc2626",
        emergency: true
    },
    longQT: {
        name: "Long QT Syndrome",
        description: "Prolonged QT interval increasing risk of Torsades de Pointes. QTc upper limit: >0.45s in men, >0.47s in women (Bazett formula). Can be congenital or acquired, for example as a side effect of certain medications or from electrolyte disturbances.",
        keyFeatures: ["QTc > 0.45s men / > 0.47s women", "Risk of Torsades de Pointes", "May be drug-induced", "T wave may be broad/notched"],
        defaultRate: 65,
        minRate: 50,
        maxRate: 90,
        color: "#a855f7"
    },
    lbbb: {
        name: "Left Bundle Branch Block (LBBB)",
        description: "Conduction delay in the left bundle branch. In V1, produces a small r wave followed by a deep broad S wave (rS pattern), with a discordant positive T wave. Because LBBB distorts the ST segments, it makes signs of acute ischaemia much harder to identify on the ECG.",
        keyFeatures: ["Wide QRS (≥0.12s)", "rS pattern in V1 — small r, deep broad S", "No septal Q waves in lateral leads", "Discordant T waves (opposite direction to QRS)"],
        defaultRate: 70,
        minRate: 40,
        maxRate: 100,
        color: "#f97316"
    },
    rbbb: {
        name: "Right Bundle Branch Block (RBBB)",
        description: "Conduction delay in the right bundle branch. In V1, produces a small r wave, a deep S wave, then a tall R' prime — the classic RSR' or 'rabbit ears' pattern. Often an incidental finding but can indicate structural heart disease.",
        keyFeatures: ["Wide QRS (≥0.12s)", "RSR' pattern in V1/V2 — small r, S, tall R' prime", "Wide S waves in lateral leads (I, V6)", "Discordant inverted T wave"],
        defaultRate: 70,
        minRate: 40,
        maxRate: 100,
        color: "#f97316"
    }
};

// ==================== WAVEFORM GENERATION ====================
function generateWaveform(rhythm, rate, width) {
    const points = [];
    const baselineY = 100;
    const pixelsPerSecond = 100;
    const beatInterval = rate > 0 ? (60 / rate) * pixelsPerSecond : 1000;
    
    // Sinus arrhythmia: the complexes are normal and identical; only the GAPS between
    // them change with breathing. Measured from the real 12-lead examples in
    // data/ecg12 (records 122 and 228): mean about 62 bpm, R-R swinging roughly
    // +/-17% around the mean, over a breathing cycle of about six beats.
    // So the beat positions are worked out first, then each complex is drawn at its
    // normal width — exactly how atrial fibrillation is handled below.
    let saBeatPositions = [];
    const SA_SWING = 0.17;          // how far R-R moves either side of the mean
    const SA_BEATS_PER_BREATH = 6;  // beats in one breathing cycle
    let saPatternLength = 0;
    if (rhythm === 'sinusArrhythmia') {
        saPatternLength = beatInterval * SA_BEATS_PER_BREATH;   // one whole breath, so the pattern repeats seamlessly
        let pos = 0;
        for (let i = 0; i < SA_BEATS_PER_BREATH; i++) {
            saBeatPositions.push(pos);
            pos += beatInterval * (1 + SA_SWING * Math.sin((i / SA_BEATS_PER_BREATH) * Math.PI * 2));
        }
        // Stretch the cycle so the beats fit the breath exactly (no jump at the joint)
        const scale = saPatternLength / pos;
        saBeatPositions = saBeatPositions.map(function(v) { return v * scale; });
    }

    let afBeatPositions = [];
    if (rhythm === 'atrialFibrillation') {
        const patternLength = 800;
        const intervals = [45, 70, 55, 90, 40, 85, 60, 75, 50, 95, 65, 80];
        let pos = 0;
        for (let i = 0; pos < patternLength * 3; i++) {
            afBeatPositions.push(pos);
            pos += intervals[i % intervals.length];
        }
    }
    
    for (let x = 0; x < width; x++) {
        const adjustedX = x + (time * pixelsPerSecond * 0.5);
        let y = baselineY;
        
        if (rhythm === 'ventricularFibrillation') {
            // Incommensurate frequencies produce chaotic but smooth undulations
            // No Math.random() per pixel — that gives static, not VF
            const vfEnvelope = 1 + 0.35 * Math.sin(adjustedX * 0.013); // slow amplitude waxing/waning
            y = baselineY + vfEnvelope * (
                Math.sin(adjustedX * 0.31) * 26 +   // ~5 Hz primary chaos
                Math.sin(adjustedX * 0.19) * 18 +   // ~3 Hz lower undulation
                Math.sin(adjustedX * 0.47) * 12 +   // ~7.5 Hz higher flutter
                Math.sin(adjustedX * 0.27) * 14     // ~4.3 Hz mid-component
            );
        } else if (rhythm === 'asystole') {
            // Near-flat with occasional gentle agonal bumps at irregular intervals
            // Two bumps per long cycle at different spacings — never dead flat
            const agonalCycle = adjustedX % 380;
            let agonalBump = 0;
            if (agonalCycle >= 0 && agonalCycle < 30) {
                agonalBump = -Math.sin((agonalCycle / 30) * Math.PI) * 7;
            } else if (agonalCycle >= 210 && agonalCycle < 235) {
                agonalBump = -Math.sin(((agonalCycle - 210) / 25) * Math.PI) * 4;
            }
            y = baselineY + agonalBump + Math.sin(adjustedX * 0.04) * 1.2;
        } else if (rhythm === 'atrialFibrillation') {
            const patternLength = 800;
            const posInPattern = adjustedX % patternLength;
            
            let minDist = Infinity;
            let beatPhase = 0;
            for (const beatPos of afBeatPositions) {
                const dist = posInPattern - beatPos;
                if (Math.abs(dist) < Math.abs(minDist)) {
                    minDist = dist;
                    if (dist >= 0 && dist < 50) {
                        beatPhase = dist / 50;
                    } else {
                        beatPhase = -1;
                    }
                }
            }
            
            y = generateAFBeat(beatPhase, baselineY);
            // the fibrillatory wobble continues between and around beats, but not through the QRS
            if (beatPhase < 0.10 || beatPhase >= 0.21) y += afBaselineWobble(adjustedX);
        } else if (rhythm === 'torsadesDePointes') {
            // Torsades de Pointes — wide complexes that twist polarity with waxing/waning amplitude
            const tdpRate = 250; // ~250 bpm
            const complexInterval = (60 / tdpRate) * pixelsPerSecond;
            const tdpCyclePos = (adjustedX % complexInterval) / complexInterval;
            
            // Spindle envelope — amplitude waxes and wanes over ~2-3 seconds
            const spindlePeriod = 250; // pixels for one full spindle cycle
            const spindlePhase = (adjustedX % spindlePeriod) / spindlePeriod;
            const envelope = Math.sin(spindlePhase * Math.PI) * 55 + 8;
            
            // Polarity twist — complexes gradually flip from upright to inverted
            const twistPhase = Math.sin(adjustedX * 0.006);
            
            // Generate wide QRS-like complexes (not smooth sine)
            if (tdpCyclePos < 0.15) {
                // Sharp Q-like downstroke
                y = baselineY + Math.sin((tdpCyclePos / 0.15) * Math.PI) * (envelope * 0.15) * twistPhase;
            } else if (tdpCyclePos >= 0.15 && tdpCyclePos < 0.40) {
                // Main wide QRS deflection
                const qrsPhase = (tdpCyclePos - 0.15) / 0.25;
                y = baselineY - Math.sin(qrsPhase * Math.PI) * envelope * twistPhase;
            } else if (tdpCyclePos >= 0.40 && tdpCyclePos < 0.60) {
                // S-wave / return
                const sPhase = (tdpCyclePos - 0.40) / 0.20;
                y = baselineY + Math.sin(sPhase * Math.PI) * (envelope * 0.3) * twistPhase;
            } else {
                // Brief baseline between complexes
                y = baselineY + (Math.random() - 0.5) * 2;
            }
        } else if (rhythm === 'sinusArrhythmia') {
            // Find the beat this pixel belongs to, then draw a normal complex from it.
            // The complex always takes the same time; the pause after it is what varies.
            const posInPattern = ((adjustedX % saPatternLength) + saPatternLength) % saPatternLength;
            let beatStart = saBeatPositions[0] - beatInterval;
            for (let i = 0; i < saBeatPositions.length; i++) {
                if (saBeatPositions[i] <= posInPattern) beatStart = saBeatPositions[i];
            }
            const cyclePos = (posInPattern - beatStart) / beatInterval;
            // Past the end of a normal complex (the P-QRS-T is done by 0.5) it is flat baseline
            y = cyclePos < 1 ? generatePQRST('normalSinus', cyclePos, baselineY, adjustedX, beatInterval) : baselineY;
        } else {
            let cyclePos = (adjustedX % beatInterval) / beatInterval;
            y = generatePQRST(rhythm, cyclePos, baselineY, adjustedX, beatInterval);
        }
        
        points.push({ x, y: Math.max(20, Math.min(180, y)) });
    }
    
    return points;
}

// The fibrillatory baseline: a restless, never-repeating wobble instead of P waves.
// On the real example (record 866) the baseline moves noticeably, so it is drawn
// rather than left flat.
function afBaselineWobble(x) {
    return Math.sin(x * 0.55) * 3.2 +
           Math.sin(x * 0.91) * 2.4 +
           Math.sin(x * 1.37) * 1.6;
}

// One QRST of atrial fibrillation. The 50px window is 500ms, so the QRS below
// spans about 60ms — matching the real record — and no P wave is drawn.
function generateAFBeat(phase, baselineY) {
    if (phase < 0 || phase > 1) {
        return baselineY;
    }
    
    let y = baselineY;
    
    if (phase >= 0.10 && phase < 0.12) {
        y = baselineY + Math.sin(((phase - 0.10) / 0.02) * Math.PI) * 7;      // small q
    }
    else if (phase >= 0.12 && phase < 0.17) {
        y = baselineY - Math.sin(((phase - 0.12) / 0.05) * Math.PI) * 60;     // sharp narrow R
    }
    else if (phase >= 0.17 && phase < 0.21) {
        y = baselineY + Math.sin(((phase - 0.17) / 0.04) * Math.PI) * 12;     // s wave
    }
    else if (phase >= 0.42 && phase < 0.78) {
        y = baselineY - Math.sin(((phase - 0.42) / 0.36) * Math.PI) * 12;     // T wave
    }
    else {
        y = baselineY;
    }
    
    return y;
}

function generatePQRST(rhythm, cyclePos, baselineY, adjustedX, beatInterval) {
    let y = baselineY;
    
    switch (rhythm) {
        case 'normalSinus':
        case 'sinusBradycardia':
        case 'sinusTachycardia':
        case 'pea':
            if (cyclePos >= 0.0 && cyclePos < 0.08) {
                y = baselineY - Math.sin((cyclePos / 0.08) * Math.PI) * 10;
            }
            else if (cyclePos >= 0.16 && cyclePos < 0.18) {
                y = baselineY + Math.sin(((cyclePos - 0.16) / 0.02) * Math.PI) * 8;
            }
            else if (cyclePos >= 0.18 && cyclePos < 0.22) {
                y = baselineY - Math.sin(((cyclePos - 0.18) / 0.04) * Math.PI) * 60;
            }
            else if (cyclePos >= 0.22 && cyclePos < 0.26) {
                y = baselineY + Math.sin(((cyclePos - 0.22) / 0.04) * Math.PI) * 15;
            }
            else if (cyclePos >= 0.35 && cyclePos < 0.50) {
                y = baselineY - Math.sin(((cyclePos - 0.35) / 0.15) * Math.PI) * 15;
            }
            break;
            
        case 'atrialFlutter':
            const flutterPeriod = 20;
            const flutterPos = (adjustedX % flutterPeriod) / flutterPeriod;
            
            // Sawtooth: a long, slightly curved descent then a fast upstroke — the teeth.
            // On record 20 the sawtooth is large next to the QRS, so it is drawn tall.
            let flutterWave;
            if (flutterPos < 0.75) {
                const fall = flutterPos / 0.75;
                flutterWave = baselineY + 13 - (0.75 * fall + 0.25 * Math.sin(fall * Math.PI / 2)) * 26;
            } else {
                flutterWave = baselineY - 13 + ((flutterPos - 0.75) / 0.25) * 26;
            }
            
            y = flutterWave;
            
            // QRS rides on top of the sawtooth, sharp and narrow so it stands out from it
            if (cyclePos >= 0.17 && cyclePos < 0.185) {
                y = baselineY + Math.sin(((cyclePos - 0.17) / 0.015) * Math.PI) * 8;
            }
            else if (cyclePos >= 0.185 && cyclePos < 0.215) {
                y = baselineY - Math.sin(((cyclePos - 0.185) / 0.03) * Math.PI) * 58;
            }
            else if (cyclePos >= 0.215 && cyclePos < 0.245) {
                y = baselineY + Math.sin(((cyclePos - 0.215) / 0.03) * Math.PI) * 14;
            }
            break;
            
        case 'ventricularTachycardia':
            // Monomorphic VT: wide dome-shaped complex, no sharp QRS
            // sin^0.25 squashes the peak into a broad flat-topped dome with
            // smoothly curved edges — far more rounded than a plain sine arch
            if (cyclePos < 0.55) {
                const vtPhase = cyclePos / 0.55;
                const dome = Math.pow(Math.sin(vtPhase * Math.PI), 0.25);
                y = baselineY - dome * 62;
            } else if (cyclePos >= 0.60 && cyclePos < 0.85) {
                // Discordant T wave — broad, negative
                y = baselineY + Math.pow(Math.sin(((cyclePos - 0.60) / 0.25) * Math.PI), 0.5) * 18;
            }
            break;
            
        case 'firstDegreeBlock':
            if (cyclePos >= 0.0 && cyclePos < 0.06) {
                y = baselineY - Math.sin((cyclePos / 0.06) * Math.PI) * 10;
            } else if (cyclePos >= 0.20 && cyclePos < 0.22) {
                y = baselineY + Math.sin(((cyclePos - 0.20) / 0.02) * Math.PI) * 8;
            } else if (cyclePos >= 0.22 && cyclePos < 0.26) {
                y = baselineY - Math.sin(((cyclePos - 0.22) / 0.04) * Math.PI) * 60;
            } else if (cyclePos >= 0.26 && cyclePos < 0.30) {
                y = baselineY + Math.sin(((cyclePos - 0.26) / 0.04) * Math.PI) * 15;
            } else if (cyclePos >= 0.40 && cyclePos < 0.55) {
                y = baselineY - Math.sin(((cyclePos - 0.40) / 0.15) * Math.PI) * 15;
            }
            break;
            
        case 'thirdDegreeBlock':
            const pCycle = (adjustedX % 75) / 75;
            if (pCycle >= 0.0 && pCycle < 0.15) {
                y = baselineY - Math.sin((pCycle / 0.15) * Math.PI) * 10;
            }
            if (cyclePos >= 0.16 && cyclePos < 0.18) {
                y = baselineY + Math.sin(((cyclePos - 0.16) / 0.02) * Math.PI) * 8;
            } else if (cyclePos >= 0.18 && cyclePos < 0.24) {
                y = baselineY - Math.sin(((cyclePos - 0.18) / 0.06) * Math.PI) * 55;
            } else if (cyclePos >= 0.24 && cyclePos < 0.30) {
                y = baselineY + Math.sin(((cyclePos - 0.24) / 0.06) * Math.PI) * 15;
            } else if (cyclePos >= 0.45 && cyclePos < 0.60) {
                y = baselineY - Math.sin(((cyclePos - 0.45) / 0.15) * Math.PI) * 12;
            }
            break;
            
        case 'svt':
            if (cyclePos >= 0.10 && cyclePos < 0.14) {
                y = baselineY + Math.sin(((cyclePos - 0.10) / 0.04) * Math.PI) * 6;
            } else if (cyclePos >= 0.14 && cyclePos < 0.20) {
                y = baselineY - Math.sin(((cyclePos - 0.14) / 0.06) * Math.PI) * 55;
            } else if (cyclePos >= 0.20 && cyclePos < 0.26) {
                y = baselineY + Math.sin(((cyclePos - 0.20) / 0.06) * Math.PI) * 12;
            } else if (cyclePos >= 0.40 && cyclePos < 0.55) {
                y = baselineY - Math.sin(((cyclePos - 0.40) / 0.15) * Math.PI) * 10;
            }
            break;
            
        case 'secondDegreeMobitz1':
            const wenkeBeat = Math.floor((adjustedX / beatInterval) % 4);
            const prProlongation = wenkeBeat * 0.08; // 0.08 per beat gives clearly visible PR lengthening
            
            if (wenkeBeat < 3) {
                if (cyclePos >= 0.0 && cyclePos < 0.08) {
                    y = baselineY - Math.sin((cyclePos / 0.08) * Math.PI) * 10;
                } else if (cyclePos >= (0.16 + prProlongation) && cyclePos < (0.18 + prProlongation)) {
                    y = baselineY + Math.sin(((cyclePos - 0.16 - prProlongation) / 0.02) * Math.PI) * 8;
                } else if (cyclePos >= (0.18 + prProlongation) && cyclePos < (0.22 + prProlongation)) {
                    y = baselineY - Math.sin(((cyclePos - 0.18 - prProlongation) / 0.04) * Math.PI) * 60;
                } else if (cyclePos >= (0.22 + prProlongation) && cyclePos < (0.26 + prProlongation)) {
                    y = baselineY + Math.sin(((cyclePos - 0.22 - prProlongation) / 0.04) * Math.PI) * 15;
                } else if (cyclePos >= (0.40 + prProlongation) && cyclePos < (0.56 + prProlongation)) {
                    // T wave follows QRS so it doesn't collide as PR lengthens
                    y = baselineY - Math.sin(((cyclePos - 0.40 - prProlongation) / 0.16) * Math.PI) * 15;
                }
            } else {
                if (cyclePos >= 0.0 && cyclePos < 0.08) {
                    y = baselineY - Math.sin((cyclePos / 0.08) * Math.PI) * 10;
                }
            }
            break;
            
        case 'secondDegreeMobitz2':
            const mobitz2Beat = Math.floor((adjustedX / beatInterval) % 3);
            
            if (mobitz2Beat < 2) {
                if (cyclePos >= 0.0 && cyclePos < 0.08) {
                    y = baselineY - Math.sin((cyclePos / 0.08) * Math.PI) * 10;
                } else if (cyclePos >= 0.16 && cyclePos < 0.18) {
                    y = baselineY + Math.sin(((cyclePos - 0.16) / 0.02) * Math.PI) * 8;
                } else if (cyclePos >= 0.18 && cyclePos < 0.24) {
                    y = baselineY - Math.sin(((cyclePos - 0.18) / 0.06) * Math.PI) * 55;
                } else if (cyclePos >= 0.24 && cyclePos < 0.30) {
                    y = baselineY + Math.sin(((cyclePos - 0.24) / 0.06) * Math.PI) * 15;
                } else if (cyclePos >= 0.40 && cyclePos < 0.55) {
                    y = baselineY - Math.sin(((cyclePos - 0.40) / 0.15) * Math.PI) * 12;
                }
            } else {
                if (cyclePos >= 0.0 && cyclePos < 0.08) {
                    y = baselineY - Math.sin((cyclePos / 0.08) * Math.PI) * 10;
                }
            }
            break;
        
        // ===== NEW RHYTHM WAVEFORMS =====
            
        case 'junctionalRhythm':
            // No P wave before QRS, possible inverted P after
            if (cyclePos >= 0.16 && cyclePos < 0.18) {
                y = baselineY + Math.sin(((cyclePos - 0.16) / 0.02) * Math.PI) * 8;
            } else if (cyclePos >= 0.18 && cyclePos < 0.22) {
                y = baselineY - Math.sin(((cyclePos - 0.18) / 0.04) * Math.PI) * 60;
            } else if (cyclePos >= 0.22 && cyclePos < 0.26) {
                y = baselineY + Math.sin(((cyclePos - 0.22) / 0.04) * Math.PI) * 15;
            } else if (cyclePos >= 0.28 && cyclePos < 0.34) {
                // Inverted P wave AFTER QRS (retrograde conduction)
                y = baselineY + Math.sin(((cyclePos - 0.28) / 0.06) * Math.PI) * 6;
            } else if (cyclePos >= 0.40 && cyclePos < 0.55) {
                y = baselineY - Math.sin(((cyclePos - 0.40) / 0.15) * Math.PI) * 15;
            }
            break;
            
        case 'wpw':
            // Short PR + very prominent delta wave ramp + tall R + deep S
            if (cyclePos >= 0.0 && cyclePos < 0.06) {
                // Normal P wave
                y = baselineY - Math.sin((cyclePos / 0.06) * Math.PI) * 10;
            } else if (cyclePos >= 0.08 && cyclePos < 0.18) {
                // DELTA WAVE — wide, obvious gradual ramp (the key WPW feature)
                // Starts almost immediately after P wave (short PR)
                const deltaPos = (cyclePos - 0.08) / 0.10;
                y = baselineY - deltaPos * 25;
            } else if (cyclePos >= 0.18 && cyclePos < 0.23) {
                // Sharp R wave spike (starts from where delta ramp ended)
                const rPhase = (cyclePos - 0.18) / 0.05;
                y = baselineY - 25 - Math.sin(rPhase * Math.PI) * 40;
            } else if (cyclePos >= 0.23 && cyclePos < 0.32) {
                // Deep S wave below baseline
                const sPhase = (cyclePos - 0.23) / 0.09;
                if (sPhase < 0.4) {
                    // Sharp drop through baseline to S wave trough
                    y = baselineY + (sPhase / 0.4) * 25;
                } else {
                    // Return from S wave
                    y = baselineY + 25 * (1 - ((sPhase - 0.4) / 0.6));
                }
            } else if (cyclePos >= 0.45 && cyclePos < 0.62) {
                // T wave
                y = baselineY - Math.sin(((cyclePos - 0.45) / 0.17) * Math.PI) * 15;
            }
            break;
            
        case 'pvcs':
            // PVCs — mostly normal sinus with occasional EARLY wide bizarre beats
            // Pattern: 3 normal beats, then 1 early PVC, then a compensatory pause
            const pvcSuperCycle = beatInterval * 4.5; // 3 normal + 1 early + full compensatory pause
            const pvcSuperPos = adjustedX % pvcSuperCycle;
            
            const pvcBeat1Start = 0;
            const pvcBeat2Start = beatInterval;
            const pvcBeat3Start = beatInterval * 2;
            const pvcEarlyStart = beatInterval * 2.5; // PVC arrives EARLY
            // Full compensatory pause fills until next super-cycle
            
            let pvcLocalPhase = -1;
            let isPVCBeat = false;
            
            if (pvcSuperPos >= pvcBeat1Start && pvcSuperPos < pvcBeat2Start) {
                pvcLocalPhase = (pvcSuperPos - pvcBeat1Start) / beatInterval;
            } else if (pvcSuperPos >= pvcBeat2Start && pvcSuperPos < pvcBeat3Start) {
                pvcLocalPhase = (pvcSuperPos - pvcBeat2Start) / beatInterval;
            } else if (pvcSuperPos >= pvcBeat3Start && pvcSuperPos < pvcEarlyStart) {
                pvcLocalPhase = (pvcSuperPos - pvcBeat3Start) / beatInterval;
            } else if (pvcSuperPos >= pvcEarlyStart && pvcSuperPos < pvcEarlyStart + beatInterval) {
                pvcLocalPhase = (pvcSuperPos - pvcEarlyStart) / beatInterval;
                isPVCBeat = true;
            }
            
            if (pvcLocalPhase >= 0 && pvcLocalPhase <= 1) {
                if (isPVCBeat) {
                    // PVC — wide, bizarre, no P wave, tall, with inverted T after
                    // A real PVC (record 818) is about twice the height of the normal
                    // beats and roughly 2.5x their width, but with a fast upstroke rather
                    // than a smooth balloon. The power curve gives that sharper edge.
                    if (pvcLocalPhase >= 0.06 && pvcLocalPhase < 0.16) {
                        // Wide tall R wave, steep on the way up
                        y = baselineY - Math.pow(Math.sin(((pvcLocalPhase - 0.06) / 0.10) * Math.PI), 0.65) * 75;
                    } else if (pvcLocalPhase >= 0.16 && pvcLocalPhase < 0.26) {
                        // Deep wide S wave
                        y = baselineY + Math.pow(Math.sin(((pvcLocalPhase - 0.16) / 0.10) * Math.PI), 0.75) * 30;
                    } else if (pvcLocalPhase >= 0.36 && pvcLocalPhase < 0.56) {
                        // Inverted (opposite direction) T wave
                        y = baselineY + Math.sin(((pvcLocalPhase - 0.36) / 0.20) * Math.PI) * 14;
                    }
                } else {
                    // Normal sinus beat
                    if (pvcLocalPhase >= 0.0 && pvcLocalPhase < 0.08) {
                        y = baselineY - Math.sin((pvcLocalPhase / 0.08) * Math.PI) * 10;
                    } else if (pvcLocalPhase >= 0.16 && pvcLocalPhase < 0.18) {
                        y = baselineY + Math.sin(((pvcLocalPhase - 0.16) / 0.02) * Math.PI) * 8;
                    } else if (pvcLocalPhase >= 0.18 && pvcLocalPhase < 0.22) {
                        y = baselineY - Math.sin(((pvcLocalPhase - 0.18) / 0.04) * Math.PI) * 60;
                    } else if (pvcLocalPhase >= 0.22 && pvcLocalPhase < 0.26) {
                        y = baselineY + Math.sin(((pvcLocalPhase - 0.22) / 0.04) * Math.PI) * 15;
                    } else if (pvcLocalPhase >= 0.35 && pvcLocalPhase < 0.50) {
                        y = baselineY - Math.sin(((pvcLocalPhase - 0.35) / 0.15) * Math.PI) * 15;
                    }
                }
            }
            break;
            
        case 'pacs':
            // PACs — mostly normal sinus with occasional EARLY beats
            // Pattern: 3 normal beats, then 1 early PAC, then a pause
            // We use a longer super-cycle to create the irregular timing
            const pacSuperCycle = beatInterval * 4.3; // 3 normal + 1 early + pause
            const pacSuperPos = adjustedX % pacSuperCycle;
            
            // Beat positions within the super-cycle
            const pacBeat1Start = 0;
            const pacBeat2Start = beatInterval;
            const pacBeat3Start = beatInterval * 2;
            const pacEarlyStart = beatInterval * 2.65; // PAC arrives EARLY
            // Then a pause until the next super-cycle starts
            
            let pacLocalPhase = -1;
            let isPACBeat = false;
            
            if (pacSuperPos >= pacBeat1Start && pacSuperPos < pacBeat2Start) {
                pacLocalPhase = (pacSuperPos - pacBeat1Start) / beatInterval;
            } else if (pacSuperPos >= pacBeat2Start && pacSuperPos < pacBeat3Start) {
                pacLocalPhase = (pacSuperPos - pacBeat2Start) / beatInterval;
            } else if (pacSuperPos >= pacBeat3Start && pacSuperPos < pacEarlyStart) {
                pacLocalPhase = (pacSuperPos - pacBeat3Start) / beatInterval;
            } else if (pacSuperPos >= pacEarlyStart && pacSuperPos < pacEarlyStart + beatInterval) {
                pacLocalPhase = (pacSuperPos - pacEarlyStart) / beatInterval;
                isPACBeat = true;
            }
            
            if (pacLocalPhase >= 0 && pacLocalPhase <= 1) {
                if (isPACBeat) {
                    // PAC beat — slightly different (taller/sharper) P wave, normal QRS
                    if (pacLocalPhase >= 0.0 && pacLocalPhase < 0.06) {
                        y = baselineY - Math.sin((pacLocalPhase / 0.06) * Math.PI) * 14;
                    } else if (pacLocalPhase >= 0.14 && pacLocalPhase < 0.16) {
                        y = baselineY + Math.sin(((pacLocalPhase - 0.14) / 0.02) * Math.PI) * 8;
                    } else if (pacLocalPhase >= 0.16 && pacLocalPhase < 0.20) {
                        y = baselineY - Math.sin(((pacLocalPhase - 0.16) / 0.04) * Math.PI) * 60;
                    } else if (pacLocalPhase >= 0.20 && pacLocalPhase < 0.24) {
                        y = baselineY + Math.sin(((pacLocalPhase - 0.20) / 0.04) * Math.PI) * 15;
                    } else if (pacLocalPhase >= 0.33 && pacLocalPhase < 0.48) {
                        y = baselineY - Math.sin(((pacLocalPhase - 0.33) / 0.15) * Math.PI) * 14;
                    }
                } else {
                    // Normal sinus beat
                    if (pacLocalPhase >= 0.0 && pacLocalPhase < 0.08) {
                        y = baselineY - Math.sin((pacLocalPhase / 0.08) * Math.PI) * 10;
                    } else if (pacLocalPhase >= 0.16 && pacLocalPhase < 0.18) {
                        y = baselineY + Math.sin(((pacLocalPhase - 0.16) / 0.02) * Math.PI) * 8;
                    } else if (pacLocalPhase >= 0.18 && pacLocalPhase < 0.22) {
                        y = baselineY - Math.sin(((pacLocalPhase - 0.18) / 0.04) * Math.PI) * 60;
                    } else if (pacLocalPhase >= 0.22 && pacLocalPhase < 0.26) {
                        y = baselineY + Math.sin(((pacLocalPhase - 0.22) / 0.04) * Math.PI) * 15;
                    } else if (pacLocalPhase >= 0.35 && pacLocalPhase < 0.50) {
                        y = baselineY - Math.sin(((pacLocalPhase - 0.35) / 0.15) * Math.PI) * 15;
                    }
                }
            }
            break;
            
        case 'hyperkalaemia':
            // Widened QRS + very tall peaked T waves + flattened P
            if (cyclePos >= 0.0 && cyclePos < 0.05) {
                // Flattened, barely visible P wave
                y = baselineY - Math.sin((cyclePos / 0.05) * Math.PI) * 3;
            } else if (cyclePos >= 0.12 && cyclePos < 0.16) {
                // Wide Q onset
                y = baselineY + Math.sin(((cyclePos - 0.12) / 0.04) * Math.PI) * 10;
            } else if (cyclePos >= 0.16 && cyclePos < 0.26) {
                // Wide QRS — takes longer than normal
                y = baselineY - Math.sin(((cyclePos - 0.16) / 0.10) * Math.PI) * 50;
            } else if (cyclePos >= 0.26 && cyclePos < 0.34) {
                // Wide S wave
                y = baselineY + Math.sin(((cyclePos - 0.26) / 0.08) * Math.PI) * 18;
            } else if (cyclePos >= 0.37 && cyclePos < 0.54) {
                // Very tall, peaked, narrow T wave (tent-shaped) — the hallmark sign
                const tPos = (cyclePos - 0.37) / 0.17;
                y = baselineY - Math.pow(Math.sin(tPos * Math.PI), 1.5) * 55;
            }
            break;
            
        case 'stemi':
            // Normal QRS with ST elevation and possible Q waves
            if (cyclePos >= 0.0 && cyclePos < 0.08) {
                y = baselineY - Math.sin((cyclePos / 0.08) * Math.PI) * 10;
            } else if (cyclePos >= 0.14 && cyclePos < 0.16) {
                // Pathological Q wave
                y = baselineY + Math.sin(((cyclePos - 0.14) / 0.02) * Math.PI) * 15;
            } else if (cyclePos >= 0.16 && cyclePos < 0.20) {
                y = baselineY - Math.sin(((cyclePos - 0.16) / 0.04) * Math.PI) * 60;
            } else if (cyclePos >= 0.20 && cyclePos < 0.24) {
                y = baselineY + Math.sin(((cyclePos - 0.20) / 0.04) * Math.PI) * 12;
            } else if (cyclePos >= 0.24 && cyclePos < 0.58) {
                // Coved ST elevation running straight into the T wave — one smooth dome
                // rather than a square plateau, which is how the real record looks.
                y = baselineY - 14 - Math.sin(((cyclePos - 0.24) / 0.34) * Math.PI) * 14;
            }
            break;
            
        case 'longQT':
            // Normal PQRS but prolonged QT with broad T wave
            if (cyclePos >= 0.0 && cyclePos < 0.08) {
                y = baselineY - Math.sin((cyclePos / 0.08) * Math.PI) * 10;
            } else if (cyclePos >= 0.16 && cyclePos < 0.18) {
                y = baselineY + Math.sin(((cyclePos - 0.16) / 0.02) * Math.PI) * 8;
            } else if (cyclePos >= 0.18 && cyclePos < 0.22) {
                y = baselineY - Math.sin(((cyclePos - 0.18) / 0.04) * Math.PI) * 60;
            } else if (cyclePos >= 0.22 && cyclePos < 0.26) {
                y = baselineY + Math.sin(((cyclePos - 0.22) / 0.04) * Math.PI) * 15;
            } else if (cyclePos >= 0.32 && cyclePos < 0.70) {
                // Very broad, prolonged T wave (the long QT)
                const tPos = (cyclePos - 0.32) / 0.38;
                y = baselineY - Math.sin(tPos * Math.PI) * 18;
                // Add slight notch in T wave (common in long QT)
                if (tPos > 0.4 && tPos < 0.6) {
                    y += Math.sin(((tPos - 0.4) / 0.2) * Math.PI) * 4;
                }
            }
            break;

        case 'lbbb':
            // LBBB — V1 representation (rS pattern)
            // Small r up, deep broad S down, broad positive discordant T
            if (cyclePos >= 0.0 && cyclePos < 0.08) {
                // Normal P wave
                y = baselineY - Math.sin((cyclePos / 0.08) * Math.PI) * 10;
            } else if (cyclePos >= 0.16 && cyclePos < 0.21) {
                // Small r wave — slight upward deflection
                y = baselineY - Math.sin(((cyclePos - 0.16) / 0.05) * Math.PI) * 14;
            } else if (cyclePos >= 0.21 && cyclePos < 0.38) {
                // Deep broad S wave — the dominant downward deflection
                y = baselineY + Math.sin(((cyclePos - 0.21) / 0.17) * Math.PI) * 55;
            } else if (cyclePos >= 0.44 && cyclePos < 0.66) {
                // Broad positive discordant T wave (opposite to the negative QRS)
                y = baselineY - Math.sin(((cyclePos - 0.44) / 0.22) * Math.PI) * 20;
            }
            break;

        case 'rbbb':
            // RBBB — V1 representation
            // Small r up, deep S down, tall sharp R' prime up, inverted discordant T down
            if (cyclePos >= 0.0 && cyclePos < 0.08) {
                // Normal P wave
                y = baselineY - Math.sin((cyclePos / 0.08) * Math.PI) * 10;
            } else if (cyclePos >= 0.16 && cyclePos < 0.22) {
                // Small r wave — upward
                y = baselineY - Math.sin(((cyclePos - 0.16) / 0.06) * Math.PI) * 28;
            } else if (cyclePos >= 0.22 && cyclePos < 0.31) {
                // Deep S wave — downward
                y = baselineY + Math.sin(((cyclePos - 0.22) / 0.09) * Math.PI) * 38;
            } else if (cyclePos >= 0.31 && cyclePos < 0.42) {
                // Tall R' prime — sharp prominent upward deflection (taller than initial r)
                y = baselineY - Math.sin(((cyclePos - 0.31) / 0.11) * Math.PI) * 65;
            } else if (cyclePos >= 0.42 && cyclePos < 0.48) {
                // Return to baseline
                y = baselineY + Math.sin(((cyclePos - 0.42) / 0.06) * Math.PI) * 8;
            } else if (cyclePos >= 0.52 && cyclePos < 0.70) {
                // Discordant inverted T wave — downward (opposite to R' which was positive)
                y = baselineY + Math.sin(((cyclePos - 0.52) / 0.18) * Math.PI) * 18;
            }
            break;
            
        default:
            if (cyclePos >= 0.0 && cyclePos < 0.08) {
                y = baselineY - Math.sin((cyclePos / 0.08) * Math.PI) * 10;
            } else if (cyclePos >= 0.16 && cyclePos < 0.18) {
                y = baselineY + Math.sin(((cyclePos - 0.16) / 0.02) * Math.PI) * 8;
            } else if (cyclePos >= 0.18 && cyclePos < 0.22) {
                y = baselineY - Math.sin(((cyclePos - 0.18) / 0.04) * Math.PI) * 60;
            } else if (cyclePos >= 0.22 && cyclePos < 0.26) {
                y = baselineY + Math.sin(((cyclePos - 0.22) / 0.04) * Math.PI) * 15;
            } else if (cyclePos >= 0.35 && cyclePos < 0.50) {
                y = baselineY - Math.sin(((cyclePos - 0.35) / 0.15) * Math.PI) * 15;
            }
    }
    
    return y;
}
