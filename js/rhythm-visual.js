/* ============================================================================
   PARAMIND — RHYTHM VISUAL ENGINE  (js/rhythm-visual.js)
   ----------------------------------------------------------------------------
   Self-contained teaching visual for the ECG page's Learn Mode.

   HOW TO USE IT (from ecg-v2.html):
       <div id="visualContent" style="display:none;"></div>
       <script src="js/rhythm-visual.js"></script>
       ...
       RhythmVisual.mount(document.getElementById('visualContent'));

   Everything this file creates is namespaced:
     - CSS classes all begin  rv-
     - element ids all begin  rv_
   so nothing here can collide with anything already in ecg.html.

   TO ADD A NEW RHYTHM you only write a new entry in RHYTHMS below.
   The drawing, the animation loop and the Next/Back stepping are shared.
   ============================================================================ */

var RhythmVisual = (function () {
'use strict';

/* ==========================================================================
   1. THE HEART DRAWING  (one SVG, used by every rhythm)
   ========================================================================== */
var SVG_MARKUP = `<svg class="rv-heart" id="rv_heart" viewBox="0 0 1000 720" xmlns="http://www.w3.org/2000/svg" aria-label="Cross-section of the heart">
        <defs>
          <filter id="rv_glow" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="6" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="rv_softShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.25"/>
          </filter>
          <clipPath id="rv_atriaClip">
            <path d="M 306 264 C 342 248 388 258 398 292 C 406 316 404 342 396 362 C 368 376 328 374 310 360 C 298 342 296 286 306 264 Z"/>
            <path d="M 490 320 C 504 286 558 274 598 290 C 622 314 622 358 608 380 C 582 394 530 396 504 382 C 490 364 486 344 490 320 Z"/>
          </clipPath>
          <clipPath id="rv_rvMass">
            <path d="M 316 370 C 308 442 324 510 352 560 C 376 600 416 626 452 634
                     C 462 560 466 470 462 372 C 420 362 356 362 316 370 Z"/>
          </clipPath>
          <clipPath id="rv_lvMass">
            <path d="M 470 372 C 476 470 480 560 470 650 C 510 630 552 590 578 540
                     C 610 476 622 420 614 366 C 566 356 508 360 470 372 Z"/>
          </clipPath>
          <clipPath id="rv_ventMass">
            <path d="M 316 370 C 308 442 324 510 352 560 C 380 606 430 638 470 650
                     C 510 630 552 590 578 540 C 610 476 622 420 614 366
                     C 560 352 372 352 312 370 Z"/>
          </clipPath>
        </defs>

        <!-- ============================================================
             HOW THIS IS BUILT
             Each chamber is ONE cavity path. The heart muscle is that
             same path drawn underneath as a very thick stroke, so the
             wall always wraps the cavity. Left ventricle stroke = 74,
             right ventricle = 30 — that IS the wall-thickness lesson.
             ============================================================ -->

        <!-- ---------- great vessels, drawn behind the muscle ---------- -->
        <g id="rv_vessels">
          <!-- pulmonary artery: out of the right ventricle, up and away to the lungs -->
          <path d="M 430 396 C 426 330 420 268 410 234 C 386 194 328 176 272 190"
                fill="none" stroke="var(--deox-dark)" stroke-width="44" stroke-linecap="round"/>
          <path d="M 430 396 C 426 330 420 268 410 234 C 386 194 328 176 272 190"
                fill="none" stroke="var(--deox)" stroke-width="35" stroke-linecap="round"/>
          <path d="M 396 214 C 366 168 330 142 296 130" fill="none" stroke="var(--deox-dark)" stroke-width="30" stroke-linecap="round"/>
          <path d="M 396 214 C 366 168 330 142 296 130" fill="none" stroke="var(--deox)" stroke-width="22" stroke-linecap="round"/>

          <!-- aorta: out of the left ventricle, arching away to the body -->
          <path d="M 504 398 C 498 320 504 256 516 230 C 556 184 650 174 712 208 C 738 222 746 240 746 264"
                fill="none" stroke="var(--ox-dark)" stroke-width="46" stroke-linecap="round"/>
          <path d="M 504 398 C 498 320 504 256 516 230 C 556 184 650 174 712 208 C 738 222 746 240 746 264"
                fill="none" stroke="var(--ox)" stroke-width="37" stroke-linecap="round"/>

          <!-- superior vena cava -->
          <path d="M 214 150 C 232 200 252 238 278 264" fill="none" stroke="var(--deox-dark)" stroke-width="38" stroke-linecap="round"/>
          <path d="M 214 150 C 232 200 252 238 278 264" fill="none" stroke="var(--deox)" stroke-width="29" stroke-linecap="round"/>
          <!-- inferior vena cava -->
          <path d="M 196 468 C 232 424 264 376 286 344" fill="none" stroke="var(--deox-dark)" stroke-width="38" stroke-linecap="round"/>
          <path d="M 196 468 C 232 424 264 376 286 344" fill="none" stroke="var(--deox)" stroke-width="29" stroke-linecap="round"/>
          <!-- pulmonary veins -->
          <path d="M 800 300 C 762 302 724 308 694 316" fill="none" stroke="var(--ox-dark)" stroke-width="32" stroke-linecap="round"/>
          <path d="M 800 300 C 762 302 724 308 694 316" fill="none" stroke="var(--ox)" stroke-width="24" stroke-linecap="round"/>
          <path d="M 800 366 C 764 364 728 356 700 344" fill="none" stroke="var(--ox-dark)" stroke-width="32" stroke-linecap="round"/>
          <path d="M 800 366 C 764 364 728 356 700 344" fill="none" stroke="var(--ox)" stroke-width="24" stroke-linecap="round"/>
        </g>

        <!-- ---------- heart muscle: outline pass, then fill pass ---------- -->
        <g id="rv_muscleOutline" fill="var(--muscle-dark)" stroke="var(--muscle-dark)" stroke-linejoin="round" stroke-linecap="round">
          <path d="M 268 300 C 262 262 292 240 336 242 C 380 244 396 268 392 300 C 390 330 384 350 376 358 C 340 366 296 362 278 348 C 270 336 268 318 268 300 Z" stroke-width="28"/>
          <path d="M 676 300 C 682 262 652 240 608 242 C 564 244 548 268 552 300 C 554 330 560 350 568 358 C 604 366 648 362 666 348 C 674 336 676 318 676 300 Z" stroke-width="28"/>
          <path d="M 330 386 C 322 440 334 502 362 548 C 386 588 424 606 456 604 C 462 540 464 462 462 386 Z" stroke-width="32"/>
          <path d="M 508 386 C 512 470 508 552 496 616 C 530 606 570 572 592 526 C 618 470 622 424 614 386 Z" stroke-width="74"/>
        </g>
        <g id="rv_muscleFill" fill="var(--muscle)" stroke="var(--muscle)" stroke-linejoin="round" stroke-linecap="round">
          <path d="M 268 300 C 262 262 292 240 336 242 C 380 244 396 268 392 300 C 390 330 384 350 376 358 C 340 366 296 362 278 348 C 270 336 268 318 268 300 Z" stroke-width="21"/>
          <path d="M 676 300 C 682 262 652 240 608 242 C 564 244 548 268 552 300 C 554 330 560 350 568 358 C 604 366 648 362 666 348 C 674 336 676 318 676 300 Z" stroke-width="21"/>
          <path d="M 330 386 C 322 440 334 502 362 548 C 386 588 424 606 456 604 C 462 540 464 462 462 386 Z" stroke-width="24"/>
          <path d="M 508 386 C 512 470 508 552 496 616 C 530 606 570 572 592 526 C 618 470 622 424 614 386 Z" stroke-width="66"/>
        </g>
        <path d="M 508 386 C 512 470 508 552 496 616 C 530 606 570 572 592 526 C 618 470 622 424 614 386 Z"
              fill="none" stroke="var(--muscle-deep)" stroke-width="56" stroke-linejoin="round" stroke-linecap="round" opacity="0.7"/>
        <!-- septum: fills the gap between the two ventricles -->
        <path d="M 462 386 C 464 462 462 540 456 604 L 496 616 C 508 552 512 470 508 386 Z"
              fill="var(--muscle-deep)" stroke="var(--muscle-dark)" stroke-width="2" opacity="0.85"/>

        <!-- ---------- atrioventricular openings (under the chamber outlines) ---------- -->
        <g id="rv_orifices">
          <rect x="346" y="344" width="52" height="54" rx="14" fill="var(--deox)"/>
          <rect x="558" y="344" width="54" height="54" rx="14" fill="var(--ox)"/>
        </g>

        <!-- ---------- chamber cavities ---------- -->
        <g id="rv_raGroup" class="chamber">
          <path d="M 268 300 C 262 262 292 240 336 242 C 380 244 396 268 392 300 C 390 330 384 350 376 358 C 340 366 296 362 278 348 C 270 336 268 318 268 300 Z"
                fill="var(--deox)" stroke="var(--deox-dark)" stroke-width="2.5"/>
        </g>
        <g id="rv_laGroup" class="chamber">
          <path d="M 676 300 C 682 262 652 240 608 242 C 564 244 548 268 552 300 C 554 330 560 350 568 358 C 604 366 648 362 666 348 C 674 336 676 318 676 300 Z"
                fill="var(--ox)" stroke="var(--ox-dark)" stroke-width="2.5"/>
        </g>
        <g id="rv_rvGroup" class="chamber">
          <path d="M 330 386 C 322 440 334 502 362 548 C 386 588 424 606 456 604 C 462 540 464 462 462 386 Z"
                fill="var(--deox)" stroke="var(--deox-dark)" stroke-width="2.5"/>
        </g>
        <g id="rv_lvGroup" class="chamber">
          <path d="M 508 386 C 512 470 508 552 496 616 C 530 606 570 572 592 526 C 618 470 622 424 614 386 Z"
                fill="var(--ox)" stroke="var(--ox-dark)" stroke-width="2.5"/>
        </g>

        <!-- ---------- artery roots, so each artery visibly leaves its ventricle ---------- -->
        <g id="rv_roots">
          <path d="M 430 400 C 428 372 426 350 425 330" fill="none" stroke="var(--deox-dark)" stroke-width="44" stroke-linecap="round"/>
          <path d="M 430 400 C 428 372 426 350 425 330" fill="none" stroke="var(--deox)" stroke-width="35" stroke-linecap="round"/>
          <path d="M 504 402 C 501 374 499 350 499 330" fill="none" stroke="var(--ox-dark)" stroke-width="46" stroke-linecap="round"/>
          <path d="M 504 402 C 501 374 499 350 499 330" fill="none" stroke="var(--ox)" stroke-width="37" stroke-linecap="round"/>
        </g>

        <!-- ---------- valves ---------- -->
        <!-- ============ CORONARY ARTERIES (STEMI only) ============
               The heart's own supply, drawn on the surface of the muscle.
               Hidden unless a rhythm asks for them. -->
          <g id="rv_coronaryLayer" style="display:none">
            <path id="rv_territory" fill="#111827" opacity="0.30" stroke="#F87171" stroke-width="2.5" stroke-dasharray="9 6"/>
            <g fill="none" stroke-linecap="round" stroke-linejoin="round">
              <!-- each vessel gets a pale halo so it reads on top of any chamber -->
              <!-- left anterior descending: down the front of the septum -->
              <path d="M 508 408 C 502 434 492 474 486 522 C 482 562 478 600 476 628" stroke="#FFF3F1" stroke-width="17"/>
              <path d="M 508 408 C 502 434 492 474 486 522 C 482 562 478 600 476 628" stroke="#6E1A14" stroke-width="12"/>
              <path d="M 508 408 C 502 434 492 474 486 522 C 482 562 478 600 476 628" stroke="#E8564A" stroke-width="6.5"/>
              <!-- circumflex: round the left ventricle -->
              <path d="M 512 404 C 546 396 578 412 596 444 C 610 472 612 502 608 530" stroke="#FFF3F1" stroke-width="15"/>
              <path d="M 512 404 C 546 396 578 412 596 444 C 610 472 612 502 608 530" stroke="#6E1A14" stroke-width="11"/>
              <path d="M 512 404 C 546 396 578 412 596 444 C 610 472 612 502 608 530" stroke="#E8564A" stroke-width="6"/>
              <!-- right coronary: along the right groove and round the bottom -->
              <path d="M 496 404 C 458 388 408 384 370 396 C 338 408 320 440 318 478 C 316 522 330 562 354 592" stroke="#FFF3F1" stroke-width="15"/>
              <path d="M 496 404 C 458 388 408 384 370 396 C 338 408 320 440 318 478 C 316 522 330 562 354 592" stroke="#6E1A14" stroke-width="11"/>
              <path d="M 496 404 C 458 388 408 384 370 396 C 338 408 320 440 318 478 C 316 522 330 562 354 592" stroke="#E8564A" stroke-width="6"/>
            </g>
            <g id="rv_clot" style="display:none">
              <circle id="rv_clotDot" r="14" fill="#1f2937" stroke="#fff" stroke-width="3.5"/>
              <text id="rv_clotLabel" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700"
                    fill="#7f1d1d" stroke="#fff" stroke-width="3.5" stroke-linejoin="round" style="paint-order:stroke"></text>
            </g>
          </g>

          <g id="rv_valves" stroke-linecap="round" fill="none" filter="url(#rv_softShadow)">
          <g class="valve" data-valve="tricuspid">
            <path class="v-shut" d="M 344 362 L 371 378 M 400 362 L 373 378" stroke="#FFF7F2" stroke-width="6"/>
            <path class="v-open" d="M 344 362 L 350 392 M 400 362 L 394 392" stroke="#FFF7F2" stroke-width="6"/>
          </g>
          <g class="valve" data-valve="mitral">
            <path class="v-shut" d="M 560 362 L 586 378 M 612 362 L 588 378" stroke="#FFF7F2" stroke-width="6"/>
            <path class="v-open" d="M 560 362 L 566 392 M 612 362 L 606 392" stroke="#FFF7F2" stroke-width="6"/>
          </g>
          <g class="valve" data-valve="pulmonary">
            <path class="v-shut" d="M 412 398 L 430 388 M 448 398 L 430 388" stroke="#FFF7F2" stroke-width="5.5"/>
            <path class="v-open" d="M 412 398 L 409 376 M 448 398 L 451 376" stroke="#FFF7F2" stroke-width="5.5"/>
          </g>
          <g class="valve" data-valve="aortic">
            <path class="v-shut" d="M 486 400 L 504 390 M 522 400 L 504 390" stroke="#FFF7F2" stroke-width="5.5"/>
            <path class="v-open" d="M 486 400 L 483 378 M 522 400 L 525 378" stroke="#FFF7F2" stroke-width="5.5"/>
          </g>
        </g>

        <!-- ---------- blood flow layer ---------- -->
        <g class="layer flow-layer" id="rv_flowLayer">
          <g id="rv_guides" fill="none" stroke="none">
            <path id="rv_pathVenousFill"  d="M 196 468 C 236 422 270 372 290 342 C 306 314 336 296 344 316 C 350 340 358 358 368 376 C 364 424 358 482 376 528 C 390 566 412 588 440 596"/>
            <path id="rv_pathVenousFill2" d="M 214 150 C 234 202 258 240 284 266 C 306 288 334 296 344 316 C 352 336 358 358 368 376 C 364 424 358 482 376 528 C 390 566 412 588 440 596"/>
            <path id="rv_pathRvEject"     d="M 400 544 C 394 484 398 438 410 410 C 418 394 426 388 430 396 C 426 332 420 270 410 234 C 386 196 330 178 274 190"/>
            <path id="rv_pathRvEject2"    d="M 400 544 C 394 484 398 438 410 410 C 418 394 426 388 430 396 C 424 330 412 264 396 216 C 368 172 332 146 298 132"/>
            <path id="rv_pathArterialFill"  d="M 800 300 C 758 304 722 312 694 322 C 662 334 622 346 600 364 C 588 376 582 386 580 398 C 572 462 560 542 546 604"/>
            <path id="rv_pathArterialFill2" d="M 800 366 C 762 364 726 356 698 346 C 664 334 622 350 602 368 C 590 380 584 388 582 398 C 574 462 562 542 548 604"/>
            <path id="rv_pathLvEject"       d="M 536 576 C 528 504 516 448 508 412 C 508 404 504 400 504 398 C 498 320 504 256 516 230 C 556 184 650 174 712 208 C 738 222 746 240 746 264"/>
          </g>
          <g id="rv_particles"></g>
        </g>

        <!-- ---------- electrical conduction layer ---------- -->
        <g class="layer elec-layer" id="rv_elecLayer">
          <g fill="none" stroke="var(--elec-dim)" stroke-width="7" stroke-linecap="round" opacity="0.85">
            <path d="M 330 258 C 374 284 440 330 472 362"/>
            <path d="M 330 258 C 298 280 282 314 284 340"/>
            <path d="M 330 258 C 420 234 556 246 620 278"/>
            <path d="M 478 370 C 480 388 482 398 484 412"/>
            <path d="M 484 412 C 478 470 470 540 462 596"/>
            <path d="M 484 412 C 492 470 498 546 502 606"/>
            <path d="M 462 596 C 430 590 396 560 372 518 C 348 476 336 434 336 396"/>
            <path d="M 502 606 C 534 592 562 558 580 514 C 598 468 602 424 598 394"/>
          </g>
          <g id="rv_conduction" fill="none" stroke-linecap="round">
            <path class="cseg" data-seg="atria" d="M 330 258 C 374 284 440 330 472 362" stroke="var(--elec-bright)" stroke-width="7"/>
            <path class="cseg" data-seg="atria" d="M 330 258 C 298 280 282 314 284 340" stroke="var(--elec-bright)" stroke-width="7"/>
            <path class="cseg" data-seg="atria" d="M 330 258 C 420 234 556 246 620 278" stroke="var(--elec-bright)" stroke-width="7"/>
            <path class="cseg" data-seg="his"  d="M 478 370 C 480 388 482 398 484 412" stroke="var(--elec-bright)" stroke-width="8"/>
            <path class="cseg" data-seg="rbb" d="M 484 412 C 478 470 470 540 462 596" stroke="var(--elec-bright)" stroke-width="6.5"/>
            <path class="cseg" data-seg="lbb" d="M 484 412 C 492 470 498 546 502 606" stroke="var(--elec-bright)" stroke-width="6.5"/>
            <path class="cseg" data-seg="purkR" d="M 462 596 C 430 590 396 560 372 518 C 348 476 336 434 336 396" stroke="var(--elec-bright)" stroke-width="5"/>
            <path class="cseg" data-seg="purkL" d="M 502 606 C 534 592 562 558 580 514 C 598 468 602 424 598 394" stroke="var(--elec-bright)" stroke-width="5"/>
          </g>
          <!-- ===== VT only: ectopic focus and its slow cell-to-cell wavefront ===== -->
          <g id="rv_ectopicLayer" style="display:none">
            <g id="rv_waveClip" clip-path="url(#rv_ventMass)">
              <circle id="rv_waveFill" cx="604" cy="556" r="0" fill="#FF9F1C" opacity="0.22"/>
              <circle id="rv_waveRing" cx="604" cy="556" r="0" fill="none" stroke="var(--elec-bright)" stroke-width="7" opacity="0.85"/>
            </g>
            <circle id="rv_focusGlow" cx="604" cy="556" r="16" fill="#E8890C" opacity="0.35"/>
            <circle id="rv_focusNode" cx="604" cy="556" r="11" fill="#E8890C" stroke="#fff" stroke-width="3"/>
          </g>
          <!-- ===== VT only: the AV node is bypassed / blocked ===== -->

          <!-- ===== atrial fibrillation: chaotic wavelets upstairs ===== -->
          <g id="rv_atrialChaos" style="display:none" clip-path="url(#rv_atriaClip)"></g>

          <!-- ===== re-entry circuit (flutter, SVT) ===== -->
          <g id="rv_circuit" style="display:none">
            <path id="rv_circuitPath" fill="none" stroke="#E8890C" stroke-width="8" stroke-linecap="round" opacity="0.42" stroke-dasharray="14 9"/>
            <circle id="rv_circuitDot" r="10" fill="#FFC93C" stroke="#fff" stroke-width="3"/>
          </g>

          <!-- ===== WPW: an accessory pathway bypassing the AV node ===== -->
          <g id="rv_accessory" style="display:none">
            <path d="M 392 348 C 366 362 360 384 368 408" fill="none" stroke="#FFF" stroke-width="15" stroke-linecap="round"/>
            <path d="M 392 348 C 366 362 360 384 368 408" fill="none" stroke="#C4B5FD" stroke-width="9" stroke-linecap="round"/>
            <path class="cseg" data-seg="acc" d="M 392 348 C 366 362 360 384 368 408" fill="none"
                  stroke="#7C3AED" stroke-width="9" stroke-linecap="round"/>
            <text x="352" y="336" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="12.5"
                  font-weight="700" fill="#5B21B6" stroke="#fff" stroke-width="3.5" stroke-linejoin="round"
                  style="paint-order:stroke">Accessory pathway</text>
            <text x="352" y="352" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="11"
                  font-weight="500" fill="#6C757D" stroke="#fff" stroke-width="3.5" stroke-linejoin="round"
                  style="paint-order:stroke">the side door</text>
          </g>

          <circle id="rv_saNode" cx="330" cy="258" r="13" fill="var(--elec)" stroke="#fff" stroke-width="3"/>
          <circle id="rv_avNode" cx="478" cy="368" r="12" fill="var(--elec)" stroke="#fff" stroke-width="3"/>
          <g id="rv_branchBlock" style="display:none" fill="none" stroke-linecap="round">
            <path id="rv_branchCross1" stroke="#fff" stroke-width="10"/>
            <path id="rv_branchCross2" stroke="#C0392B" stroke-width="5.5"/>
          </g>
          <!-- drawn AFTER the nodes so it sits on top when conduction is blocked -->
          <g id="rv_avBlock" style="display:none" fill="none" stroke-linecap="round">
            <path d="M 466 356 L 490 380 M 490 356 L 466 380" stroke="#fff" stroke-width="10"/>
            <path d="M 466 356 L 490 380 M 490 356 L 466 380" stroke="#C0392B" stroke-width="5.5"/>
          </g>
        </g>

        <!-- ---------- chamber names, set inside the chambers ---------- -->
        <g id="rv_chamberNames" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="700"
           fill="#fff" text-anchor="middle" letter-spacing="0.5" opacity="0.95" pointer-events="none">
          <text x="330" y="296">RIGHT</text><text x="330" y="316">ATRIUM</text>
          <text x="614" y="296">LEFT</text><text x="614" y="316">ATRIUM</text>
          <text x="392" y="480">RIGHT</text><text x="392" y="500">VENTRICLE</text>
          <text x="556" y="480">LEFT</text><text x="556" y="500">VENTRICLE</text>
        </g>

        <!-- ---------- outside labels ---------- -->
        <g id="rv_labels" font-family="Plus Jakarta Sans, sans-serif" font-size="15" fill="var(--label)">
          <g stroke="var(--gray-500)" stroke-width="1.1" fill="none" stroke-dasharray="3 3">
            <path d="M 182 172 L 210 160"/>
            <path d="M 182 496 L 204 476"/>
            <path d="M 322 96 L 300 124"/>
            <path d="M 806 248 L 758 262"/>
            <path d="M 820 304 L 804 302"/>
            <path d="M 208 566 L 318 536"/>
            <path d="M 820 478 L 624 490"/>
          </g>
          <text text-anchor="end" x="178" y="168" font-size="13">Superior vena cava</text>
          <text text-anchor="end" x="178" y="185" font-size="11.5" fill="var(--gray-600)">from head &amp; arms</text>
          <text text-anchor="end" x="178" y="492" font-size="13">Inferior vena cava</text>
          <text text-anchor="end" x="178" y="509" font-size="11.5" fill="var(--gray-600)">from the body</text>
          <text text-anchor="middle" x="330" y="70" font-size="13">Pulmonary artery</text>
          <text text-anchor="middle" x="330" y="87" font-size="11.5" fill="var(--gray-600)">to the lungs</text>
          <text x="812" y="244" font-size="13">Aorta</text>
          <text x="812" y="261" font-size="11.5" fill="var(--gray-600)">to the whole body</text>
          <text x="826" y="300" font-size="13">Pulmonary veins</text>
          <text x="826" y="317" font-size="11.5" fill="var(--gray-600)">back from the lungs</text>
          <text text-anchor="end" x="200" y="564" font-size="13" font-weight="600">Thin wall</text>
          <text text-anchor="end" x="200" y="581" font-size="11.5" fill="var(--gray-600)">only pumps to the lungs</text>
          <text x="826" y="474" font-size="13" font-weight="600">Thick wall</text>
          <text x="826" y="491" font-size="11.5" fill="var(--gray-600)">pumps to the whole body</text>
        </g>

        <g id="rv_vtLabels" style="display:none;paint-order:stroke" font-family="Plus Jakarta Sans, sans-serif"
           font-size="13" font-weight="700" fill="#A82F39" stroke="#fff" stroke-width="3.5" stroke-linejoin="round">
          <text id="rv_focusName" x="700" y="600">Irritable focus</text>
          <text id="rv_focusSub" x="700" y="618" font-size="11" font-weight="500" fill="#6C757D">firing on its own</text>
          <path d="M 694 594 L 622 566" stroke="#C0392B" stroke-width="1.3" fill="none" stroke-dasharray="3 3"/>
          <text id="rv_blockName" x="494" y="352" font-size="12">AV node bypassed</text>
        </g>

        <g class="layer elec-layer" id="rv_elecLabels" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="700"
           fill="#8A5A00" stroke="#fff" stroke-width="3.5" stroke-linejoin="round" style="paint-order:stroke">
          <text text-anchor="end" x="306" y="208">SA node</text>
          <text text-anchor="end" x="306" y="225" font-size="11" font-weight="500">the pacemaker</text>
          <text id="rv_lblAv" x="494" y="352">AV node</text>
          <text id="rv_lblHis" x="500" y="432" font-size="12">Bundle of His</text>
          <text id="rv_lblPurk" x="482" y="668" font-size="12" text-anchor="middle">Purkinje fibres</text>
          <g stroke="#C99A2E" stroke-width="1.1" fill="none" stroke-dasharray="3 3" style="paint-order:normal">
            <path d="M 312 216 L 326 248"/>
            <path d="M 462 608 C 462 634 462 646 464 654"/>
            <path d="M 502 618 C 504 640 500 648 498 654"/>
          </g>
        </g>
      </svg>`;

/* ==========================================================================
   2. STYLES
   ========================================================================== */
var CSS = `
.rv-root{font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif;color:#212529;
  /* the drawing's palette lives here so the module is self-contained */
  --deox:#4C86C6; --deox-dark:#2A5E96; --deox-cell:#B7D6F5;
  --ox:#D64550;   --ox-dark:#A82F39;   --ox-cell:#FFB3B7;
  --muscle:#F2D5D1; --muscle-dark:#D6A49E; --muscle-deep:#E4B9B3;
  --elec:#E8890C; --elec-bright:#FFC93C; --elec-dim:#DCC7A4;
  --label:#495057; --gray-500:#ADB5BD; --gray-600:#6C757D}
.rv-select{font:inherit;font-size:1.02rem;font-weight:700;color:#212529;background:#fff;
  border:1px solid #DEE2E6;border-radius:.5rem;padding:.5rem 2.4rem .5rem .75rem;cursor:pointer;
  max-width:100%;appearance:none;-webkit-appearance:none;transition:border-color 150ms ease;
  background-image:url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236C757D' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right .8rem center}
.rv-select:hover,.rv-select:focus{border-color:#2B8A9C;outline:none}

.rv-card{background:#fff;border:1px solid #E9ECEF;border-radius:.75rem;box-shadow:0 4px 6px -1px rgba(0,0,0,.06);
  overflow:hidden;margin-bottom:1.25rem}
.rv-head{padding:.9rem 1.1rem;border-bottom:1px solid #E9ECEF;display:flex;flex-direction:column;
  align-items:center;text-align:center;gap:.15rem}
.rv-title{font-weight:700;font-size:1rem;margin:0}
.rv-sub{font-size:.85rem;color:#6C757D;margin:.3rem 0 0;text-align:center}
.rv-layers{display:flex;background:#F1F3F5;border-radius:.5rem;padding:.25rem;gap:.25rem}
.rv-layers button{border:0;background:transparent;font:inherit;font-size:.82rem;font-weight:600;color:#6C757D;
  padding:.45rem .8rem;border-radius:.375rem;cursor:pointer;transition:all 200ms ease;white-space:nowrap}
.rv-layers button.rv-on{background:#fff;color:#2B8A9C;box-shadow:0 1px 2px rgba(0,0,0,.08)}

.rv-stage{padding:.4rem .25rem .1rem;background:#fff;max-width:760px;margin:0 auto}
.rv-heart{display:block;width:100%;height:auto;cursor:pointer}
.rv-layer{transition:opacity 350ms ease}
.rv-heart.rv-hide-flow .rv-flow{opacity:0}
.rv-heart.rv-hide-elec .rv-elec{opacity:0}

.rv-comm{display:flex;flex-direction:column;gap:.55rem;align-items:center;text-align:center;
  padding:.95rem 1.1rem;border-top:1px solid #E9ECEF;background:#fff;min-height:104px}
.rv-side{display:flex;flex-direction:row;gap:.6rem;align-items:center;justify-content:center}
.rv-chip{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.7rem;font-weight:600;padding:.32rem .55rem;
  border-radius:.375rem;background:#FFF4E5;color:#8A5A00;min-width:100px;text-align:center}
.rv-count{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.68rem;color:#ADB5BD;font-weight:600}
.rv-text{margin:0;font-size:.98rem;line-height:1.55;color:#495057;max-width:74ch}
.rv-text b{color:#212529}

.rv-steps{display:flex;align-items:center;gap:.6rem;justify-content:center;padding:.5rem 1.1rem;
  background:#fff;border-top:1px solid #E9ECEF}
.rv-step-btn{border:1px solid #DEE2E6;background:#fff;color:#495057;font:inherit;font-size:.88rem;font-weight:600;
  padding:.5rem 1.1rem;border-radius:.5rem;cursor:pointer;transition:all 150ms ease}
.rv-step-btn:hover{border-color:#2B8A9C;color:#2B8A9C}
.rv-step-btn.rv-primary{background:#2B8A9C;border-color:#2B8A9C;color:#fff}
.rv-step-btn.rv-primary:hover{background:#237282;border-color:#237282;color:#fff}
.rv-mid{display:flex;align-items:center;gap:.75rem;flex-wrap:wrap;justify-content:center}
.rv-hint{font-size:.72rem;color:#ADB5BD;text-align:center}
.rv-dots{display:flex;gap:.4rem;justify-content:center}
.rv-dots i{width:9px;height:9px;border-radius:50%;background:#DEE2E6;display:block;transition:all 200ms ease}
.rv-dots i.rv-on{background:#2B8A9C;transform:scale(1.35)}
.rv-dots i.rv-done{background:#2B8A9C;opacity:.4}

.rv-alert{background:#7f1d1d;color:#fff;font-size:.85rem;font-weight:700;padding:.55rem 1.1rem;
  letter-spacing:.02em;display:none}
.rv-monitor{background:#1a1a2e;padding:.75rem 1.1rem 1rem;position:relative}
/* Back / Next float over the bottom-right of the trace, so they stay within
   reach of the animation instead of sitting below the text. */
.rv-jump{position:absolute;right:.9rem;bottom:.75rem;display:flex;gap:.35rem;z-index:3}
.rv-jump button{font:inherit;font-size:.82rem;font-weight:700;border-radius:.45rem;cursor:pointer;
  border:1px solid rgba(255,255,255,.22);background:rgba(26,26,46,.82);color:#cfd3e6;
  padding:.42rem .62rem;transition:all 150ms ease}
.rv-jump button:hover{border-color:#22c55e;color:#fff}
.rv-jump button.rv-primary{background:#3DA4B8;border-color:#5BC0D4;color:#fff;font-size:.88rem;
  padding:.5rem 1.05rem;animation:rv-pulse 1.9s ease-out infinite}
.rv-jump button.rv-primary:hover{background:#5BC0D4;border-color:#8AD8E6;animation:none}
/* glow + brighten only — never move the button, or it becomes hard to tap */
@keyframes rv-pulse{
  0%   {box-shadow:0 0 0 0 rgba(91,192,212,.85); background:#3DA4B8}
  55%  {box-shadow:0 0 0 12px rgba(91,192,212,0); background:#5BC0D4}
  100% {box-shadow:0 0 0 0 rgba(91,192,212,0);   background:#3DA4B8}
}
@media (prefers-reduced-motion:reduce){ .rv-jump button.rv-primary{animation:none} }
.rv-mon-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:.4rem;gap:.75rem;flex-wrap:wrap}
.rv-lead{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.72rem;color:#888;letter-spacing:.05em}
.rv-mon-right{display:flex;gap:1rem;align-items:center}
.rv-hr{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.88rem;color:#22c55e;font-weight:600}
.rv-pulse{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.72rem;color:#8f8fae}
.rv-pulse b{color:#f87171}
.rv-ecg{display:block;width:100%;height:auto}

.rv-controls{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;padding:.75rem 1.1rem;border-top:1px solid #E9ECEF;
  background:#F8F9FA}
.rv-btn{border:1px solid #DEE2E6;background:#fff;color:#495057;font:inherit;font-size:.8rem;font-weight:600;
  padding:.4rem .8rem;border-radius:.375rem;cursor:pointer;transition:all 150ms ease}
.rv-btn:hover{border-color:#2B8A9C;color:#2B8A9C}
.rv-btn.rv-on{background:#2B8A9C;border-color:#2B8A9C;color:#fff}
.rv-sep{width:1px;height:20px;background:#DEE2E6;margin:0 .25rem}
.rv-cap{font-size:.74rem;color:#6C757D;font-weight:600;text-transform:uppercase;letter-spacing:.04em}
.rv-legend{display:flex;flex-wrap:wrap;gap:.9rem;padding:.85rem 1.1rem;border-top:1px solid #E9ECEF;font-size:.8rem;color:#6C757D}
.rv-legend span{display:flex;align-items:center;gap:.4rem}
.rv-dot{width:11px;height:11px;border-radius:50%;display:inline-block}
.rv-note{background:#fff;border:1px solid #E9ECEF;border-radius:.75rem;padding:1.1rem;font-size:.9rem;
  line-height:1.65;color:#6C757D;box-shadow:0 4px 6px -1px rgba(0,0,0,.06)}
.rv-note b{color:#212529}

/* ---------- phones ---------- */
@media (max-width:640px){
  .rv-comm{gap:.45rem;min-height:0;padding:.8rem .9rem}
  .rv-text{font-size:.92rem}
  /* on a phone the strip is short, so keep the buttons small and let the
     trace show through behind them */
  .rv-jump{right:.45rem;bottom:.4rem;gap:.3rem}
  .rv-jump button{padding:.36rem .55rem;font-size:.76rem;background:rgba(26,26,46,.62)}
  .rv-jump button.rv-primary{padding:.36rem .7rem;background:rgba(43,138,156,.92)}
  .rv-head>div{width:100%}
  .rv-layers{width:100%}
  .rv-layers button{flex:1;text-align:center;padding:.5rem .3rem;font-size:.78rem}
  .rv-picker button{flex:1 1 45%;font-size:.8rem;padding:.5rem .6rem}
  .rv-select{width:100%}
  .rv-controls .rv-layers{flex:1 1 100%}
  .rv-controls .rv-sep{display:none}
  .rv-stage{padding:.25rem 0 0}
  .rv-mon-head{gap:.3rem}
  .rv-lead{font-size:.65rem}
}`;

/* ==========================================================================
   3. RHYTHMS  —  one entry per rhythm. This is the only thing you edit
      to add another one.
   ========================================================================== */
function gauss(x, c, w, a){ var d = (x - c) / w; return a * Math.exp(-0.5 * d * d); }

/* Deterministic value noise. Stacked sine waves look regular — which is why
   fibrillation drawn that way ends up looking like flutter. This gives an
   irregular, non-repeating wobble that is still a pure function of time, so
   the strip can be drawn once and never drifts. */
function vhash(n){ var x = Math.sin(n * 127.1) * 43758.5453; return (x - Math.floor(x)) * 2 - 1; }
function vnoise(t, step){
  var i = Math.floor(t / step), f = t / step - i;
  var u = f * f * (3 - 2 * f);
  return vhash(i) + (vhash(i + 1) - vhash(i)) * u;
}

var RHYTHMS = [
{
  key:'nsr', name:'Normal Sinus Rhythm', danger:false,
  title:'Normal Sinus Rhythm', sub:'The reference — a well-run relay, every order in its proper order.',
  rate:75, beats:3, drive:'sinus', atrialRate:null,
  squeeze:1, fillFactor:1, dyssync:0,
  pulse:'PULSE: strong, regular', alert:null,
  ecg:function(p){
    return gauss(p,0.055,0.018,0.16) + gauss(p,0.242,0.008,-0.09) + gauss(p,0.264,0.011,1.00)
         + gauss(p,0.292,0.010,-0.24) + gauss(p,0.560,0.048,0.30);
  },
  marks:[[0.055,'P'],[0.264,'QRS'],[0.560,'T']],
  timing:{ atriaDepol:[0,0.11], avDelay:[0.11,0.20], his:[0.20,0.245], bundles:[0.225,0.27],
           purkinje:[0.255,0.335], atriaSqueeze:[0.05,0.21], ventSqueeze:[0.27,0.60],
           eject:[0.32,0.56], fill:[[0.00,0.20],[0.66,1.00]] },
  steps:[
    {chip:'P wave',    at:[0.000,0.110], html:'<b>The boss calls the move.</b> The SA node fires first, every single time, and the order sweeps across both upstairs rooms — that is the <b>P wave</b>. The atria squeeze the last of the blood down into the ventricles.'},
    {chip:'PR segment',at:[0.110,0.222], html:'<b>The doorman holds everyone at the door</b> for about 0.1 s. The pause is deliberate: it buys the rooms downstairs time to finish filling. On the strip it is the flat line between the P wave and the QRS.'},
    {chip:'PR → QRS',  at:[0.222,0.260], html:'Released. The order drops into the <b>bundle of His</b> — the stairwell — and splits down two staircases, the left and right <b>bundle branches</b>.'},
    {chip:'QRS',       at:[0.260,0.340], html:'<b>The Purkinje fibres are the motorway.</b> They deliver the order to every corner of both ventricles almost at once, so the squeeze is perfectly coordinated and the QRS is <b>narrow (&lt;0.12 s)</b>.'},
    {chip:'ST segment',at:[0.340,0.440], html:'<b>Ejection.</b> The outflow valves are open and blood leaves for the lungs and the body. This is the pulse you feel.'},
    {chip:'T wave',    at:[0.440,0.660], html:'<b>The crew resets.</b> The ventricles repolarise, ready for the next order — that is the <b>T wave</b>.'},
    {chip:'Diastole',  at:[0.660,1.000], html:'<b>Diastole — the quiet bit.</b> Everything relaxes, the AV valves open and the ventricles refill. The heart&rsquo;s own coronary arteries are only fed now, which is why a very fast rate starves the heart itself.'}
  ],
  note:null
},

{
  key:'vt', name:'Ventricular Tachycardia', danger:true,
  title:'Ventricular Tachycardia', sub:'A rogue voice in the basement, shouting orders faster than the boss.',
  rate:180, beats:7, drive:'ectopic', atrialRate:75,
  squeeze:0.85, fillFactor:0.40, dyssync:0.11,
  pulse:'PULSE: weak or absent', alert:'⚠️ SHOCKABLE IF PULSELESS — always check for a pulse',
  ecg:function(p){ return gauss(p,0.26,0.085,1.00) + gauss(p,0.60,0.090,-0.50); },
  atrialEcg:function(q){ return gauss(q,0.06,0.018,0.11); },
  marks:[[0.26,'WIDE QRS']],
  timing:{ ectopic:[0,0.07], wave:[0.03,0.52], atriaSqueeze:[0.05,0.21],
           ventSqueeze:[0.16,0.62], eject:[0.26,0.56], fill:[[0.00,0.14],[0.74,1.00]] },
  steps:[
    {chip:'Rogue voice', at:[0.00,0.10], html:'<b>Nobody asked the boss.</b> A patch of irritable ventricular muscle — often scarred or ischaemic — starts shouting its own orders, and it shouts <b>faster than the SA node</b>. The heart follows whoever is loudest.'},
    {chip:'Hand to hand',at:[0.03,0.52], html:'<b>And it is not using the motorway.</b> The order began in muscle rather than in the conducting system, so it has to be passed <b>hand to hand</b>, cell to cell, across the ventricles. The Purkinje network sits there unused.'},
    {chip:'Wide QRS',    at:[0.06,0.55], html:'Passing it hand to hand takes far longer than the conducting fibres would, and the ECG records every millisecond of it — so the complex is <b>wide (&gt;0.12 s, more than 3 small squares)</b>. Every strip in this section runs at the same speed, so you can compare that width against a normal one.'},
    {chip:'Out of time', at:[0.16,0.62], html:'<b>Like a rowing crew out of time.</b> One side is still pulling as the other finishes, so the ventricles never squeeze as one unit. Plenty of effort, far less blood moved.'},
    {chip:'No quiet bit',at:[0.74,1.00], html:'At <b>180 bpm there is barely any quiet bit left</b>. The ventricles hardly refill before the next order arrives, and with the atria out of the loop there is no atrial kick either. Little in means little out.'},
    {chip:'AV dissoc.',  at:[0.00,1.00], showMarks:true, html:'<b>The boss upstairs never stopped.</b> Look at the SA node — still firing at its own steady rate, still sending orders nobody downstairs is listening to. Those P waves are on the strip, buried in the wide complexes (arrowed). That is <b>AV dissociation</b>.'},
    {chip:'Why it kills',at:[0.00,1.00], html:'Too fast, badly filled, out of time — <b>stroke volume can collapse</b>. The patient may have a pulse, or none at all, which is why you always check. <b>Pulseless VT is a shockable rhythm.</b>'}
  ],
  note:'<b>Same building, same plumbing.</b> Nothing anatomical changed — one voice in the wrong place, taking the wrong route, and the ECG changes completely.'
},

{
  key:'vf', name:'Ventricular Fibrillation', danger:true,
  title:'Ventricular Fibrillation', sub:'Everybody shouting at once, so nobody moves.',
  rate:0, beats:0, freeRun:true, drive:'fibrillation', atrialRate:null,
  squeeze:0, fillFactor:0, dyssync:0, noOutput:true,
  pulse:'PULSE: none', alert:'⚠️ CARDIAC ARREST — SHOCKABLE RHYTHM',
  ecgTime:function(ms){
    return 0.42*Math.sin(2*Math.PI*ms/152) + 0.30*Math.sin(2*Math.PI*ms/97 + 1.1)
         + 0.24*Math.sin(2*Math.PI*ms/211 + 2.3) + 0.15*Math.sin(2*Math.PI*ms/61 + 0.7);
  },
  marks:[],
  timing:{ atriaSqueeze:[0,0], ventSqueeze:[0,0], eject:[0,0], fill:[0,0] },
  steps:[
    {chip:'Everyone shouts', html:'<b>Not one rogue voice — hundreds.</b> Sites all over the ventricular muscle are firing at once and looping back on themselves, every one shouting a different order. Nobody is in charge of anything.'},
    {chip:'Nothing to read', html:'With no single order to follow there is <b>nothing to measure</b>. No P wave, no QRS, no T wave — just a chaotic, irregular line of varying height.'},
    {chip:'Quivering',       html:'<b>Every fibre obeys a different shout</b>, so the muscle quivers instead of contracting. Watch it: frantic, busy, and achieving absolutely nothing.'},
    {chip:'No output',       html:'Look at the blood — <b>none of it is moving</b>. No output, no pulse. The coronary arteries stop being fed as well, so the muscle itself is deteriorating every second this continues.'},
    {chip:'Shock = silence', html:'<b>A shock is how you get silence in the room.</b> Defibrillation depolarises the whole myocardium at once so every cell falls quiet together — and in that silence the heart&rsquo;s own pacemaker, the <b>SA node</b>, gets a chance to take charge again. <b>This is a shockable rhythm.</b>'}
  ],
  note:'<b>VT and VF sit side by side for a reason.</b> Both come from the ventricles, both are shockable. VT still has one voice giving orders, however useless. VF has hundreds, and no order at all.'
},

{
  key:'asystole', name:'Asystole', danger:true,
  title:'Asystole', sub:'Nobody is shouting anything. The building has gone quiet.',
  rate:0, beats:0, freeRun:true, drive:'silent', atrialRate:null,
  squeeze:0, fillFactor:0, dyssync:0, noOutput:true,
  pulse:'PULSE: none', alert:'⚠️ CARDIAC ARREST — NON-SHOCKABLE RHYTHM',
  ecgTime:function(ms){
    var drift = 0.022*Math.sin(2*Math.PI*ms/1150) + 0.013*Math.sin(2*Math.PI*ms/430 + 0.9);
    var agonal = gauss(ms % 2600, 1400, 55, 0.16);      /* the occasional agonal complex */
    return drift + agonal;
  },
  marks:[],
  timing:{ atriaSqueeze:[0,0], ventSqueeze:[0,0], eject:[0,0], fill:[0,0] },
  steps:[
    {chip:'Silence',      html:'<b>Nothing at all.</b> Nothing is firing anywhere — not the <b>SA node</b> at the top, not the <b>AV node</b> in the middle, not even a rogue patch of ventricular muscle. The wiring is all still physically there; it has simply stopped being used.'},
    {chip:'No orders',    html:'No order means <b>no contraction</b>. The muscle has nothing to respond to, so nothing moves and no blood goes anywhere.'},
    {chip:'Never flat',   html:'<b>Even an empty building creaks.</b> A true flat line is rare — there is nearly always baseline wander and the occasional <b>agonal complex</b>. Watch the trace and one drifts past. That is why asystole is confirmed properly rather than on one glance.'},
    {chip:'Nothing to silence', html:'<b>Shouting "quiet!" at an empty room achieves nothing.</b> A shock works by silencing chaos so order can return — here there is no activity to silence. <b>Non-shockable.</b>'}
  ],
  note:'<b>VF left untreated becomes asystole</b> as the muscle runs out of energy — the shouting fades to silence. Two points on the same decline, which is why the first is shockable and the second is not.'
},

{
  key:'pea', name:'Pulseless Electrical Activity', danger:true,
  title:'Pulseless Electrical Activity (PEA)', sub:'The orders arrive perfectly. Nobody downstairs acts on them.',
  rate:60, beats:3, drive:'sinus', atrialRate:null,
  squeeze:0.10, fillFactor:0.06, dyssync:0, noOutput:true,
  pulse:'PULSE: none', alert:'⚠️ CARDIAC ARREST — NON-SHOCKABLE RHYTHM',
  ecg:function(p){
    return gauss(p,0.055,0.018,0.14) + gauss(p,0.242,0.008,-0.08) + gauss(p,0.264,0.011,0.92)
         + gauss(p,0.292,0.010,-0.22) + gauss(p,0.560,0.048,0.26);
  },
  marks:[[0.055,'P'],[0.264,'QRS'],[0.560,'T']],
  timing:{ atriaDepol:[0,0.11], avDelay:[0.11,0.20], his:[0.20,0.245], bundles:[0.225,0.27],
           purkinje:[0.255,0.335], atriaSqueeze:[0.05,0.21], ventSqueeze:[0.27,0.60],
           eject:[0.32,0.56], fill:[[0.00,0.20],[0.66,1.00]] },
  steps:[
    {chip:'Orders sent',  at:[0.000,0.335], html:'<b>Watch the electrics — everything is textbook.</b> The <b>SA node</b> fires, the <b>AV node</b> holds the impulse for a moment, then it drops down the <b>bundle branches</b> and spreads out through the <b>Purkinje fibres</b>. This is the normal sequence, exactly as it should be.'},
    {chip:'Looks fine',   at:[0.240,0.400], html:'So the monitor shows <b>organised complexes</b>. P wave, narrow QRS, T wave. On the trace alone you would call this a perfusing rhythm and move on.'},
    {chip:'Nobody acts',  at:[0.270,0.600], html:'<b>But nobody downstairs is acting on them.</b> Watch the ventricles — the order arrives and the muscle barely moves. The instruction is perfect; the response to it is not.'},
    {chip:'No output',    at:[0.320,0.560], html:'So <b>almost no blood moves</b>. Organised electrical activity, no meaningful output, <b>no pulse</b>.'},
    {chip:'Feel for it',  at:[0.660,1.000], html:'<b>The monitor shows the orders being sent — not whether anyone obeyed them.</b> PEA cannot be spotted on the screen. The only way to find it is to <b>feel for a pulse</b>. Non-shockable, and the priority is the reversible cause.'}
  ],
  note:'<b>This is why we say treat the patient, not the monitor.</b> PEA is the one arrest rhythm where the screen actively reassures you.'
}

];

/* ==========================================================================
   3b. HEART BLOCKS
   All four are stories about one thing: the AV node, the doorway between
   the top of the heart and the bottom. Rather than write out a dozen
   timing windows by hand, makeBlock() builds them from a simple list of
   beats — each with its own PR interval, and either conducted or dropped.
   ========================================================================== */
function makeBlock(o){
  var beatMs = o.atrialRate ? 60000 / o.atrialRate : 0;
  /* each beat may carry its own gap, which is what makes atrial fibrillation
     irregularly irregular; blocks just use the same gap every time */
  var starts = [], run = 0;
  o.beats.forEach(function(b){ starts.push(run); run += (b.gap || beatMs); });
  var patternMs = run;
  var F  = function(ms){ return ms / patternMs; };
  var qw = o.qrsWidth || 9;
  var tA = (o.tAmp  === undefined) ? 0.30 : o.tAmp;   /* T height, mV */
  var tW = (o.tWidth === undefined) ? 44   : o.tWidth; /* T width */

  var atriaDepol = [], atriaSq = [], avHold = [], his = [], bundles = [],
      purkinje = [], ventSq = [], eject = [], fill = [], blocked = [], marks = [],
      waveWins = [];
  var through = 0;

  o.beats.forEach(function(b, i){
    var t0 = starts[i], pr = b.pr * 1000, gap = (b.gap || beatMs);
    if(!o.noP && !b.pvc){
      atriaDepol.push([F(t0),      F(t0 + 90)]);
      atriaSq.push(   [F(t0 + 40), F(t0 + 200)]);
    }
    if(b.pvc){
      /* a ventricular ectopic: nothing comes from above, it just goes off
         in the muscle and spreads the slow way */
      through++;
      waveWins.push([F(t0),      F(t0 + 240)]);
      ventSq.push(  [F(t0 + 30), F(t0 + 380)]);
      eject.push(   [F(t0 + 90), F(t0 + 330)]);
      fill.push(    [F(t0 + 400), F(t0 + 400 + gap * 0.45)]);
      marks.push([t0 + 90, 'PVC']);
    } else if(b.conducted){
      through++;
      if(b.pac){ waveWins.push([F(t0), F(t0 + 110)]); marks.push([t0 + 45, 'PAC']); }
      avHold.push(  [F(t0 + 90),      F(t0 + pr - 40)]);
      his.push(     [F(t0 + pr - 40), F(t0 + pr + 10)]);
      bundles.push( [F(t0 + pr - 20), F(t0 + pr + 40)]);
      purkinje.push([F(t0 + pr + 20), F(t0 + pr + 110)]);
      ventSq.push(  [F(t0 + pr + 40), F(t0 + pr + 360)]);
      eject.push(   [F(t0 + pr + 110), F(t0 + pr + 320)]);
      fill.push(    [F(t0 + pr + 380), F(t0 + pr + 380 + gap * 0.45)]);
    } else {
      avHold.push( [F(t0 + 90),  F(t0 + 250)]);
      blocked.push([F(t0 + 250), F(t0 + gap * 0.92)]);
      marks.push([t0 + 45, 'no QRS']);
    }
  });

  var vRate = Math.round(through * 60000 / patternMs);

  return {
    key:o.key, name:o.name, title:o.title, sub:o.sub, danger:!!o.danger,
    paperMs:o.paperMs || null,
    rate:vRate, cycleMs:patternMs, drive:'sinus', atrialRate:null,
    squeeze:1, dyssync:0,
    pulse:o.pulse || ('PULSE: ' + vRate + ' — atria firing at ' + o.atrialRate),
    alert:o.alert || null,
    circuit:o.circuit || null, atrialChaos:!!o.atrialChaos, saQuiet:!!o.saQuiet,
    fillFactor:o.fillFactor || 1,
    marksMs:marks.concat(o.extraMarks || []),
    ecgTime:function(ms){
      var m = ((ms % patternMs) + patternMs) % patternMs, mv = 0, k, mm;
      for(k = -1; k <= 1; k++){
        mm = m + k * patternMs;
        if(o.baseline) mv += o.baseline(mm);
        o.beats.forEach(function(b, i){
          var t0 = starts[i], pr = b.pr * 1000;
          if(b.pvc){
            mv += gauss(mm, t0 + 85, qw * 2.5, -1.00);        /* broad ectopic complex */
            mv += gauss(mm, t0 + 300, 55, 0.36);              /* discordant T */
            return;
          }
          if(!o.noP) mv += b.pac ? gauss(mm, t0 + 40, 10, 0.21)   /* odd-shaped early P */
                                 : gauss(mm, t0 + 45, 16, 0.16);
          if(b.conducted){
            mv += gauss(mm, t0 + pr + 22, qw * 0.8, -0.09);   /* Q */
            mv += gauss(mm, t0 + pr + 42, qw,        1.00);   /* R */
            mv += gauss(mm, t0 + pr + 70, qw,       -0.24);   /* S */
            mv += gauss(mm, t0 + pr + 300, tW,        tA);   /* T */
          }
        });
      }
      return mv;
    },
    marks:o.waveMarks || [],
    wave:o.wave || null,
    timing:{ wave:waveWins,
             atriaDepol:atriaDepol, avDelay:avHold, his:his, bundles:bundles,
             purkinje:purkinje, atriaSqueeze:atriaSq, ventSqueeze:ventSq,
             eject:eject, fill:fill, blocked:blocked },
    steps:o.steps, note:o.note
  };
}

RHYTHMS.push(makeBlock({
  key:'block1', name:'First Degree Heart Block',
  title:'First Degree Heart Block', sub:'Everyone gets through — the doorman is just slow.',
  atrialRate:70,
  beats:[{pr:0.30, conducted:true}],
  steps:[
    {chip:'The doorway', atMs:[0,200], html:'Picture the <b>AV node as a doorway</b> between the top of the heart and the bottom, with a doorman checking everyone through. In a normal heart he is brisk. Here the atria fire perfectly normally — watch the P wave.'},
    {chip:'A slow doorman', atMs:[90,320], html:'<b>This doorman is slow.</b> He is not turning anyone away — he simply takes his time. On the strip that shows as a <b>long flat gap between the P wave and the QRS</b>: a PR interval over <b>0.20 s</b>, more than one big square.'},
    {chip:'Nobody refused', atMs:[300,430], html:'<b>Every P wave still gets a QRS.</b> Late, but never missing. That one-to-one relationship is what makes this first degree rather than second.'},
    {chip:'Normal squeeze', atMs:[340,700], html:'Once the message arrives, the ventricles behave normally — a proper coordinated squeeze, a normal pulse. The patient usually feels nothing at all.'},
    {chip:'So what?', atMs:[0,857], html:'On its own this is <b>usually harmless</b> and needs no treatment. It matters as a clue: the doorway is not as quick as it once was. Worth noting, particularly alongside other findings.'}
  ],
  note:'<b>The doorway analogy runs through all four blocks.</b> First degree is a slow doorman. Next comes one who tires, then a broken floor beneath him, then a locked door.'
}));

RHYTHMS.push(makeBlock({
  key:'block2a', name:'Second Degree Block (Mobitz I)',
  title:'Second Degree Block — Mobitz I (Wenckebach)', sub:'The doorman gets tired, misses one, then has a rest.',
  atrialRate:80,
  beats:[{pr:0.16, conducted:true}, {pr:0.26, conducted:true},
         {pr:0.36, conducted:true}, {pr:0.36, conducted:false}],
  steps:[
    {chip:'Fresh', atMs:[0,420], html:'<b>Beat one.</b> The <b>AV node</b> is the doorway between the top of the heart and the bottom — picture a doorman checking each impulse through. Right now he is fresh, so the first message passes quickly and the PR interval is normal.'},
    {chip:'Tiring', atMs:[750,1200], html:'<b>Beat two — he is starting to tire.</b> Same queue, but he takes noticeably longer. The gap before this QRS is <b>wider than the last one</b>.'},
    {chip:'Struggling', atMs:[1500,2000], html:'<b>Beat three — slower still.</b> Longer again. You can watch the gap stretching before each QRS — that stretching <i>is</i> the diagnosis.'},
    {chip:'Dropped', atMs:[2250,3000], showMarks:true, html:'<b>Beat four — he cannot manage it at all.</b> A P wave arrives, the AV node blocks it, and <b>nothing follows</b>. No QRS. That is the dropped beat, arrowed on the strip.'},
    {chip:'Then a rest', atMs:[0,3000], html:'<b>Missing that beat gives him a rest.</b> The next P conducts quickly again and the whole thing repeats: <b>longer, longer, longer, drop</b>. That repeating group is what gives Wenckebach its clustered look.'},
    {chip:'So what?', atMs:[0,3000], html:'The fault is at the <b>doorway itself</b> — the AV node. It is often benign, often temporary, and rarely deteriorates without warning. Usually watched rather than treated.'}
  ],
  note:'<b>Longer, longer, longer, drop — then repeat.</b> If you can see the PR stretching before the missing beat, it is Mobitz I.'
}));

RHYTHMS.push(makeBlock({
  key:'block2b', name:'Second Degree Block (Mobitz II)',
  title:'Second Degree Block — Mobitz II', sub:'No warning at all. The floor beyond the doorman gives way.',
  atrialRate:75, qrsWidth:13, danger:true,
  alert:'⚠️ CAN PROGRESS TO COMPLETE BLOCK WITHOUT WARNING',
  beats:[{pr:0.16, conducted:true}, {pr:0.16, conducted:true}, {pr:0.16, conducted:false}],
  steps:[
    {chip:'Rock steady', atMs:[0,520], html:'<b>Watch the gap before each QRS.</b> That gap is the <b>AV node</b> at work — the doorway between the top of the heart and the bottom, with a doorman checking each impulse through. He is not tiring here: every message that gets through takes <b>exactly the same time</b>.'},
    {chip:'Steady again', atMs:[800,1320], html:'<b>Identical again.</b> No stretching, no build-up, nothing to warn you. If you were only watching the PR interval you would think everything was fine.'},
    {chip:'Then nothing', atMs:[1600,2400], showMarks:true, html:'<b>And then a beat simply vanishes.</b> A P wave arrives and no QRS follows it — with no change in the PR beforehand. It came out of nowhere.'},
    {chip:'Why it differs', atMs:[0,2400], html:'<b>The doorman is fine. The floor beyond him is not.</b> The fault sits <i>below</i> the AV node, in the bundle branches — like floorboards that hold, and hold, and then one gives way with no creak first. That is also why these QRS complexes often look <b>wider</b> than normal.'},
    {chip:'The danger', atMs:[0,2400], html:'Because nothing builds up to it, there is <b>no warning before it gets worse</b>. Mobitz II can go from dropping the occasional beat to blocking everything. It is treated far more seriously than Mobitz I.'}
  ],
  note:'<b>Mobitz I stretches before it drops. Mobitz II just drops.</b> That single difference is why one is watched and the other is worried about.'
}));

RHYTHMS.push(makeBlock({
  key:'af', name:'Atrial Fibrillation',
  title:'Atrial Fibrillation', sub:'Everyone in the room shouting at the doorman at once.',
  noP:true, saQuiet:true, atrialChaos:true, fillFactor:0.8,
  pulse:'PULSE: irregularly irregular',
  /* A longer strip than the other rhythms, because the diagnosis of AF is
     the SPACING, and five complexes is not enough to show that there is no
     pattern. Twelve gaps, none the same, spread 360-710 ms. */
  paperMs:6400,
  tAmp:0.18, tWidth:38,
  beats:[{gap:360,pr:0.16,conducted:true},{gap:550,pr:0.16,conducted:true},
         {gap:430,pr:0.16,conducted:true},{gap:710,pr:0.16,conducted:true},
         {gap:380,pr:0.16,conducted:true},{gap:670,pr:0.16,conducted:true},
         {gap:470,pr:0.16,conducted:true},{gap:590,pr:0.16,conducted:true},
         {gap:400,pr:0.16,conducted:true},{gap:690,pr:0.16,conducted:true},
         {gap:510,pr:0.16,conducted:true},{gap:640,pr:0.16,conducted:true}],
  baseline:function(ms){
    /* the fibrillatory line. Built from value noise, not stacked sines —
       sines always end up looking like organised flutter waves. */
    return 0.046*vnoise(ms, 56) + 0.026*vnoise(ms + 1700, 26);
  },
  steps:[
    {chip:'Chaos upstairs', atMs:[0,1340], html:'<b>There is no boss any more.</b> Instead of the SA node calling one clean move, hundreds of little pockets all over the atria are firing off at random. Watch them flicker — nobody upstairs is in charge.'},
    {chip:'So no P waves',  atMs:[0,2430], html:'With no single organised atrial contraction there is <b>no P wave to find</b>. All that is left is a wobbling baseline — the <b>fibrillatory line</b> between the complexes.'},
    {chip:'Doorman swamped',atMs:[0,6400], html:'<b>The AV node is swamped.</b> That doorway between the atria and the ventricles is being shouted at from every direction at once. It blocks most of what arrives and lets an impulse through <b>whenever it happens to be ready</b> — at completely unpredictable moments.'},
    {chip:'Irregularly irregular', atMs:[0,6400], html:'Look at the gaps between the QRS complexes: <b>no two the same, and no pattern to them</b>. That is what <b>irregularly irregular</b> means, and it is exactly what you feel at the wrist.'},
    {chip:'Lost the kick',  atMs:[2050,2760], html:'Below the doorway everything is normal, so the <b>QRS stays narrow</b>. But the atria are only quivering, so there is no atrial squeeze — you lose the <b>atrial kick</b>, roughly the last fifth of ventricular filling.'},
    {chip:'So what?',       atMs:[0,6400], html:'Two things matter. The rate can run away with itself, and blood sitting still in a quivering atrium <b>can clot</b> — which is why AF matters far beyond the pulse you can feel.'}
  ],
  note:'<b>Compare AF with VF.</b> Both are chaos — but AF is chaos upstairs, where the doorman shields the ventricles from it, so the patient walks around with it. VF is the same chaos downstairs with nothing to shield anything, and it is an arrest.'
}));

RHYTHMS.push(makeBlock({
  key:'flutter', name:'Atrial Flutter',
  title:'Atrial Flutter', sub:'One impulse stuck on a roundabout, lapping at 300 a minute.',
  noP:true, saQuiet:true, fillFactor:0.85,
  pulse:'PULSE: 150, regular',
  circuit:{ d:'M 350 264 C 382 264 404 288 404 314 C 404 342 382 366 350 366 C 318 366 296 342 296 314 C 296 288 318 264 350 264 Z', periodMs:200 },
  beats:[{gap:400,pr:0.16,conducted:true},{gap:400,pr:0.16,conducted:true},
         {gap:400,pr:0.16,conducted:true},{gap:400,pr:0.16,conducted:true},
         {gap:400,pr:0.16,conducted:true},{gap:400,pr:0.16,conducted:true},
         {gap:400,pr:0.16,conducted:true},{gap:400,pr:0.16,conducted:true}],
  baseline:function(ms){
    var x = (ms % 200) / 200;                       /* one lap = 200 ms = 300/min */
    return 0.28 * (x < 0.75 ? (0.5 - x/0.75) : (-0.5 + (x-0.75)/0.25));
  },
  steps:[
    {chip:'The roundabout', atMs:[0,800], html:'<b>Not scattered like AF — one impulse, going in circles.</b> It has found a loop in the right atrium and it is lapping it about <b>300 times a minute</b>. Watch the dot going round.'},
    {chip:'Sawtooth',       atMs:[0,1200], html:'<b>Every lap writes a wave on the ECG.</b> Because the laps are identical and relentless, they run together into the classic <b>sawtooth</b>. There is no flat baseline anywhere on this strip.'},
    {chip:'Doorman filters',atMs:[0,800], html:'<b>300 a minute is far too many to pass on.</b> The <b>AV node</b> — the doorway between the atria and the ventricles — refuses most of them and typically lets through <b>every second lap</b>: 2:1 conduction. That filtering is the only reason this patient is not in serious trouble.'},
    {chip:'Regular at 150', atMs:[0,3200], html:'Because he filters at a <b>fixed ratio</b>, the ventricles fire regularly — usually bang on <b>150</b>. Any regular narrow tachycardia sitting at almost exactly 150 should make you look hard for flutter waves.'},
    {chip:'Hidden waves',   atMs:[800,1600], html:'The flutter waves <b>do not stop underneath the QRS</b> — they are simply buried by it. Look in the gaps between complexes and you can count them marching straight through.'},
    {chip:'So what?',       atMs:[0,3200], html:'Same clot risk as AF. And the ratio can change without warning — if the doorman starts letting through <b>every</b> lap, the ventricular rate doubles to around 300.'}
  ],
  note:'<b>AF and flutter are the same problem organised differently.</b> AF is a crowd all shouting at once; flutter is one voice going round in a perfect circle. Both are handled by the same doorman.'
}));

RHYTHMS.push(makeBlock({
  key:'svt', name:'Supraventricular Tachycardia (SVT)',
  title:'Supraventricular Tachycardia', sub:'The message caught in a revolving door at the AV node.',
  noP:true, saQuiet:true, fillFactor:0.55,
  pulse:'PULSE: 180, regular',
  circuit:{ d:'M 478 336 C 498 336 514 350 514 370 C 514 390 498 404 478 404 C 458 404 442 390 442 370 C 442 350 458 336 478 336 Z', periodMs:333 },
  beats:[{gap:333,pr:0.16,conducted:true},{gap:333,pr:0.16,conducted:true},
         {gap:333,pr:0.16,conducted:true},{gap:333,pr:0.16,conducted:true}],
  steps:[
    {chip:'Revolving door', atMs:[0,400], html:'<b>A message reaches the doorway and never leaves it.</b> Instead of passing through once, it gets caught in what is effectively a <b>revolving door</b> at the AV node, going round and round. Watch the loop spinning.'},
    {chip:'A copy each lap',atMs:[0,1332], html:'<b>Every time it comes round, it sends another order downstairs.</b> One lap, one beat. That is why the rate is so fast and so <b>metronomically regular</b> — it is a machine, not a decision.'},
    {chip:'Narrow QRS',     atMs:[150,520], html:'Everything <b>below</b> the doorway is completely normal — both staircases and the whole motorway are working perfectly. So the ventricles are activated the proper way and the <b>QRS stays narrow</b>. The fault is entirely at the door.'},
    {chip:'Where are the Ps?', atMs:[0,1332], html:'The atria are being activated <b>backwards</b> from the doorway, at almost the same moment as the ventricles. So any P wave is <b>buried inside the QRS</b> — usually you simply cannot see one.'},
    {chip:'On like a switch', atMs:[0,1332], html:'Loops like this <b>start and stop abruptly</b>. Patients describe it beginning in an instant, which is a genuinely useful part of the history — this does not build up the way sinus tachycardia does.'},
    {chip:'So what?',       atMs:[0,1332], html:'At this rate there is <b>very little filling time</b>, so output falls even though every beat is normal. Anything that makes the doorman briefly refuse everything — a vagal manoeuvre, for instance — can break the loop and let the boss upstairs take charge again.'}
  ],
  note:'<b>Narrow and fast and regular points at the doorway or above it.</b> Wide and fast points below it. That single question — narrow or wide — is doing most of the work when you meet a tachycardia.'
}));

/* ==========================================================================
   3c. BUNDLE BRANCH BLOCKS
   One of the two staircases below the doorway is out of action, so that
   ventricle has to be reached the long way — through muscle. These are the
   only two entries that show a chest lead, because that is where the
   pattern actually lives.
   ========================================================================== */
function makeBBB(o){
  return {
    key:o.key, name:o.name, title:o.title, sub:o.sub, danger:false,
    rate:70, drive:'sinus', atrialRate:null,
    squeeze:1, fillFactor:0.95, dyssync:0.055,
    pulse:'PULSE: 70, regular', alert:o.alert || null,
    stripLabel:'LEAD V1 — where bundle branch block shows itself',
    ecg:o.ecg, marks:[[0.30,'WIDE QRS']],
    wave:o.wave, branchBlock:o.branchBlock,
    timing:{
      atriaDepol:[0,0.105], avDelay:[0.105,0.19], his:[0.19,0.235],
      rbb:o.rbb, lbb:o.lbb, purkR:o.purkR, purkL:o.purkL,
      wave:o.waveWin,
      atriaSqueeze:[0.05,0.20], ventSqueeze:[0.28,0.68],
      eject:[0.36,0.62], fill:[[0.00,0.19],[0.72,1.00]]
    },
    steps:o.steps, note:o.note
  };
}

RHYTHMS.push(makeBBB({
  key:'rbbb', name:'Right Bundle Branch Block (RBBB)',
  title:'Right Bundle Branch Block', sub:'The right-hand staircase is closed. The right ventricle waits.',
  /* left branch and left Purkinje work normally; the right side never lights */
  lbb:[0.21,0.27], purkL:[0.25,0.33], rbb:[], purkR:[],
  branchBlock:'M 457 528 L 479 550 M 479 528 L 457 550',
  wave:{ cx:462, cy:452, clip:'rv_rvMass', r:300 },
  waveWin:[0.30,0.62],
  ecg:function(p){
    return gauss(p,0.052,0.017,0.15)          /* P */
         + gauss(p,0.236,0.011,0.62)          /* r  — first ear */
         + gauss(p,0.278,0.014,-0.38)         /* S  — the notch between them */
         + gauss(p,0.330,0.021,0.92)          /* R' — second ear, taller and later */
         + gauss(p,0.585,0.055,-0.28);        /* discordant inverted T */
  },
  steps:[
    {chip:'Staircase closed', at:[0.00,0.25], html:'<b>Everything above is completely normal.</b> The <b>SA node</b> fires and the <b>AV node</b> passes the impulse on. Below that, the conducting system splits into two branches, one heading to each ventricle — and here the <b>right branch is out of action</b>. Watch: the impulse can only travel down the left.'},
    {chip:'Left side on time', at:[0.21,0.34], html:'The <b>left ventricle is reached the proper way</b>, down its own staircase and out along its motorway, exactly on schedule. Nothing wrong with that side at all.'},
    {chip:'The long way round', at:[0.30,0.62], html:'<b>The right ventricle has to be reached the long way.</b> The impulse crosses the septum and spreads through muscle, <b>cell to cell</b> — far slower than the conducting fibres it should have used, because muscle was never designed to carry signals quickly.'},
    {chip:'So the QRS is wide', at:[0.20,0.62], html:'The ECG records both activations end to end: one on time, one late. Stitch them together and the complex is <b>wide — 0.12 s or more</b>. A wide QRS always means somebody was reached the long way round.'},
    {chip:'Rabbit ears', at:[0.24,0.40], html:'That late right ventricle writes a <b>second upward spike</b> after the first — the <b>RSR&rsquo; pattern</b>, or "rabbit ears". This is why we have switched to <b>V1</b>: on a Lead II rhythm strip all you would see is "wide".'},
    {chip:'So what?', at:[0.00,1.00], html:'RBBB is <b>often an incidental finding</b> in an otherwise well person, though it can point to strain or disease on the right side of the heart. On its own it is not an emergency — but it does tell you the wiring is not intact.'}
  ],
  note:'<b>Right or left, the principle is identical:</b> one staircase is shut, so one ventricle is reached through muscle instead of down the motorway. That delay is the whole reason the QRS is wide.'
}));

RHYTHMS.push(makeBBB({
  key:'lbbb', name:'Left Bundle Branch Block (LBBB)',
  title:'Left Bundle Branch Block', sub:'The left-hand staircase is closed — and it is the bigger side.',
  alert:'⚠️ NEW LBBB WITH CHEST PAIN IS TREATED AS A STEMI EQUIVALENT',
  rbb:[0.21,0.27], purkR:[0.25,0.33], lbb:[], purkL:[],
  branchBlock:'M 489 534 L 511 556 M 511 534 L 489 556',
  wave:{ cx:480, cy:452, clip:'rv_lvMass', r:320 },
  waveWin:[0.30,0.66],
  ecg:function(p){
    return gauss(p,0.055,0.017,0.15)          /* P */
         + gauss(p,0.238,0.009,0.20)          /* small r */
         + gauss(p,0.308,0.031,-0.95)         /* deep, broad S */
         + gauss(p,0.590,0.058,0.34);         /* discordant positive T */
  },
  steps:[
    {chip:'Staircase closed', at:[0.00,0.25], html:'<b>The SA node and the AV node are working perfectly.</b> The problem sits below them. The conducting system splits into a branch for each ventricle, and here the <b>left branch is out of action</b> — so the impulse can only travel down the right.'},
    {chip:'Right side on time', at:[0.21,0.34], html:'The <b>right ventricle</b> is reached normally, down its own branch and out through its Purkinje fibres, exactly on schedule.'},
    {chip:'The long way round', at:[0.30,0.66], html:'<b>Now the left ventricle has to be reached through muscle</b> — and it is the big one, with the thick wall. So the crawl takes even longer than it would on the other side.'},
    {chip:'Wide QRS', at:[0.20,0.66], html:'On time, then late, recorded end to end — a <b>wide QRS, 0.12 s or more</b>. The left ventricle being activated last and slowly is also why the T wave points the opposite way to the QRS (<b>discordance</b>).'},
    {chip:'What V1 shows', at:[0.22,0.42], html:'In <b>V1</b> you get a small r wave followed by a <b>deep, broad S wave</b> — the rS pattern — with the T wave pointing upwards, away from the QRS.'},
    {chip:'Why this one matters', at:[0.00,1.00], html:'<b>LBBB scrambles the ECG.</b> Because the left ventricle is depolarising abnormally, its repolarisation is abnormal too — so the ST segments cannot be read the usual way. That is why <b>a new LBBB in someone with chest pain is treated as a STEMI equivalent</b>: you cannot rule the STEMI out, so you do not try.'}
  ],
  note:'<b>The mirror image of RBBB, with one crucial difference.</b> RBBB is often incidental. New LBBB with chest pain changes what you do — because it hides the very thing you are looking for.'
}));

/* ==========================================================================
   3d. STEMI
   The only entry that uses the coronary arteries. Before the heart feeds
   anybody else it feeds itself — block one of its own supply pipes and the
   muscle downstream starts to die. Which artery is blocked changes as the
   steps progress, so the same picture teaches both anterior and inferior.
   ========================================================================== */
RHYTHMS.push({
  key:'stemi', name:'ST-Elevation (STEMI Pattern)', danger:true,
  title:'ST Elevation — STEMI', sub:'The heart feeds itself first. Block one of its own pipes and that muscle starts to die.',
  rate:75, drive:'sinus', atrialRate:null,
  squeeze:0.8, fillFactor:0.9, dyssync:0.05,
  pulse:'PULSE: 75, regular', alert:'⚠️ TIME-CRITICAL — the territory is on a clock from the moment it blocks',
  stripLabel:'LEAD V3 — a chest lead looking at the front of the heart',
  coronaries:true, hideLabels:true,
  occlusions:{
    lad:{ name:'LAD blocked', clot:[492,472], label:[512,452],
          territory:'M 452 380 C 458 470 456 546 450 606 C 460 636 466 650 470 654 C 508 628 548 578 572 516 C 546 486 506 462 476 452 C 464 430 456 402 452 380 Z' },
    rca:{ name:'RCA blocked', clot:[344,418], label:[168,404],
          territory:'M 330 512 C 340 566 370 610 412 634 C 440 650 462 656 472 654 C 508 632 544 592 564 546 C 520 566 470 574 420 566 C 382 560 352 538 330 512 Z' }
  },
  ecg:function(p){
    return gauss(p,0.055,0.017,0.13)      /* P */
         + gauss(p,0.243,0.008,-0.06)     /* q */
         + gauss(p,0.262,0.010,0.70)      /* R */
         + gauss(p,0.288,0.010,-0.16)     /* S */
         + gauss(p,0.400,0.085,0.62);     /* the domed, elevated ST-T */
  },
  marks:[[0.40,'ST ELEVATION']],
  timing:{
    atriaDepol:[0,0.11], avDelay:[0.11,0.20], his:[0.20,0.245],
    bundles:[0.225,0.27], purkinje:[0.255,0.335],
    atriaSqueeze:[0.05,0.21], ventSqueeze:[0.27,0.60],
    eject:[0.32,0.56], fill:[[0.00,0.20],[0.66,1.00]]
  },
  steps:[
    {chip:'Feeds itself first', at:[0.32,0.56], html:'<b>Before the heart feeds anyone else, it feeds itself.</b> The coronary arteries are the <b>very first branches off the aorta</b> — you can see them here, running over the outside of the muscle. Everything else in the body is served after they are.'},
    {chip:'A pipe blocks', at:[0.00,1.00], occlude:'lad', html:'<b>A clot lodges in one of them.</b> Here it is the <b>LAD</b>, the artery running down the front. Everything downstream of that point loses its supply the instant it blocks — that is the shaded territory.'},
    {chip:'Starving muscle', at:[0.27,0.60], occlude:'lad', html:'<b>Muscle without a blood supply cannot work, and then starts to die.</b> Watch that region: it is still being told to contract, it simply cannot do it properly. This is what "time is muscle" means — the territory is on a clock from the moment it blocked.'},
    {chip:'Injured cells leak', at:[0.30,0.62], occlude:'lad', html:'<b>Injured cells cannot hold their charge properly between beats.</b> That leaves a current flowing across the heart when there should be none — and the ECG has no way to describe that except by <b>lifting the baseline between the QRS and the T wave</b>.'},
    {chip:'ST elevation', at:[0.30,0.58], occlude:'lad', html:'<b>That lift is the ST elevation.</b> Look at the strip: the segment after the QRS does not come back to the baseline, it stays up and domes over into the T wave. This is a chest lead looking at the <b>front</b> of the heart, which is exactly the wall the LAD feeds.'},
    {chip:'Which artery?', at:[0.00,1.00], occlude:'rca', html:'<b>The leads tell you which pipe.</b> Watch the clot move: block the <b>RCA</b> instead and a different territory starves — the <b>bottom</b> of the heart, which shows up in the inferior leads (II, III, aVF). Front wall means LAD; bottom wall usually means RCA.'},
    {chip:'Why that matters', at:[0.00,1.00], occlude:'rca', html:'<b>And it is not just about location.</b> In most people the RCA also supplies the <b>AV node</b> — the doorman. So an inferior MI often arrives <b>with a bradycardia or a heart block</b>, which is why those rhythms and this one turn up in the same patient.'}
  ],
  note:'<b>This is the one where the drawing does the most work.</b> Everything else in this list is about the route an impulse takes. This is about the plumbing that keeps the muscle alive — and the ECG changes because the muscle is injured, not because the wiring is.'
});

/* ==========================================================================
   3e. THE SINUS VARIANTS, THE JUNCTIONAL ESCAPE AND THE EXTRA BEATS
   All built on the same pattern factory, so PR and QRS stay a fixed number
   of milliseconds however fast or slow the heart is going — which is what
   makes the width comparisons honest.
   ========================================================================== */
RHYTHMS.push(makeBlock({
  key:'sbrady', name:'Sinus Bradycardia',
  title:'Sinus Bradycardia', sub:'The boss is calling the moves slowly. Everything else is normal.',
  atrialRate:45, pulse:'PULSE: 45, regular',
  beats:[{pr:0.16, conducted:true}],
  steps:[
    {chip:'Same route', atMs:[0,420], html:'<b>Nothing here is broken.</b> The <b>SA node</b> fires, the <b>AV node</b> holds the impulse briefly, then it runs down the <b>bundle branches</b> and out through the <b>Purkinje fibres</b> — the normal route, working perfectly.'},
    {chip:'Just slower', atMs:[0,1333], html:'<b>The only difference is how often the boss calls a move</b> — fewer than 60 times a minute. The P wave, the PR interval and the QRS are all completely normal widths. Only the gaps between beats have grown.'},
    {chip:'A long quiet bit', atMs:[700,1333], html:'<b>Look at the size of the quiet bit.</b> Diastole is enormous — so the ventricles fill beautifully, and the coronary arteries get a long, generous supply. A slow heart is a well-fed heart.'},
    {chip:'When it is fine', atMs:[0,1333], html:'This is <b>normal in fit people and during sleep</b>. A trained athlete may sit in the forties all day quite happily, because each beat is moving so much blood that the total output is still fine.'},
    {chip:'When it is not', atMs:[0,1333], html:'It matters when the <b>patient cannot compensate</b> — when the rate is so slow that output falls despite the big beats. That is why you treat the patient in front of you, not the number.'}
  ],
  note:'<b>Rate on its own tells you very little.</b> The same 45 bpm is unremarkable in a marathon runner and an emergency in someone pale and clammy.'
}));

RHYTHMS.push(makeBlock({
  key:'stachy', name:'Sinus Tachycardia',
  title:'Sinus Tachycardia', sub:'The boss calling the moves fast — usually for a very good reason.',
  atrialRate:120, pulse:'PULSE: 120, regular',
  beats:[{pr:0.15, conducted:true}],
  steps:[
    {chip:'Same route', atMs:[0,300], html:'<b>Again, nothing is broken.</b> The impulse takes exactly the normal route — SA node, doorman, staircases, motorway. Every P wave has a QRS and the widths are all normal.'},
    {chip:'Just faster', atMs:[0,500], html:'<b>The boss is simply calling moves more often</b> — over 100 a minute. Notice the P waves are still there before every QRS, which is what separates this from the fast rhythms that are not sinus.'},
    {chip:'The quiet bit shrinks', atMs:[280,500], html:'<b>Speeding up eats the quiet bit, not the busy bit.</b> The QRS and T take the same time as ever; it is <b>diastole</b> that gets squeezed. Less filling time per beat, and less coronary supply.'},
    {chip:'It is a symptom', atMs:[0,500], html:'<b>Sinus tachycardia is almost never the problem itself.</b> It is the heart responding to something else — pain, fear, fever, blood loss, hypoxia. The rhythm is doing its job; something else is wrong.'},
    {chip:'So what?', atMs:[0,500], html:'Which means the useful question is never "how do I slow this down", it is <b>"what is it responding to?"</b> Find that and the rate looks after itself.'}
  ],
  note:'<b>Sinus tachycardia is the messenger.</b> Every other fast rhythm in this list is the problem; this one is telling you about a problem somewhere else.'
}));

RHYTHMS.push(makeBlock({
  key:'sarr', name:'Sinus Arrhythmia',
  title:'Sinus Arrhythmia', sub:'The rate rising and falling with the breath. Completely normal.',
  pulse:'PULSE: 75, varies with breathing',
  /* Same reasoning as AF: the whole diagnosis is in the spacing, so the
     strip has to be long enough to show a full breathing cycle. Eight
     beats, speeding up and slowing down smoothly: 540 ms at the fastest,
     1060 ms at the slowest. */
  paperMs:6400,
  beats:[{gap:540,pr:0.16,conducted:true},{gap:620,pr:0.16,conducted:true},
         {gap:760,pr:0.16,conducted:true},{gap:900,pr:0.16,conducted:true},
         {gap:1060,pr:0.16,conducted:true},{gap:1000,pr:0.16,conducted:true},
         {gap:830,pr:0.16,conducted:true},{gap:690,pr:0.16,conducted:true}],
  extraMarks:[[472,'short gap'],[3552,'long gap']],
  steps:[
    {chip:'Every beat normal', atMs:[0,540], html:'<b>Take each beat on its own and it is perfect.</b> P wave, normal PR, narrow QRS, all from the SA node by the usual route. Nothing is out of place.'},
    {chip:'But the gaps move', atMs:[0,6400], showMarks:true, html:'<b>Now look at the gaps.</b> They lengthen and shorten in a smooth, repeating way — not randomly, the way atrial fibrillation does, but gently, like a wave.'},
    {chip:'Breathing does it', atMs:[0,6400], html:'<b>That wave is the breath.</b> Breathing in briefly speeds the heart up; breathing out slows it down. It is the vagus nerve adjusting the SA node, moment to moment.'},
    {chip:'Not AF', atMs:[0,6400], html:'<b>This is the one irregular rhythm you should not worry about.</b> The giveaway is that every beat still has a normal P wave in front of it, and the change is gradual — AF has no P waves and no pattern at all.'},
    {chip:'So what?', atMs:[0,6400], html:'<b>Common and benign</b>, especially in children and young adults, and a sign of a responsive nervous system. Recognising it saves the patient an unnecessary worry.'}
  ],
  note:'<b>Irregular does not automatically mean atrial fibrillation.</b> Look for the P waves and for a pattern — this one has both.'
}));

RHYTHMS.push(makeBlock({
  key:'junctional', name:'Junctional Rhythm',
  title:'Junctional Rhythm', sub:'The boss has gone quiet, so the doorman starts calling the moves.',
  atrialRate:50, noP:true, saQuiet:true, pulse:'PULSE: 50, regular',
  beats:[{pr:0.16, conducted:true}],
  baseline:function(ms){ return gauss(ms % 1200, 110, 17, -0.10); },   /* retrograde P */
  steps:[
    {chip:'Boss goes quiet', atMs:[0,300], html:'<b>The SA node has stopped calling moves</b> — look at it, grey and silent. In a heart with no backup that would be the end of it. But the conducting system has backups all the way down.'},
    {chip:'Doorman steps up', atMs:[0,500], html:'<b>So the AV node takes the job on itself.</b> The doorway has its own built-in rate of about 40 to 60, and with nothing arriving from above, it simply starts firing on its own.'},
    {chip:'Narrow QRS', atMs:[150,600], html:'<b>Everything below the doorway is untouched</b> — both staircases, the whole motorway. So the ventricles are activated the proper way and the <b>QRS is narrow</b>. This is a backup, but a tidy one.'},
    {chip:'Backwards P waves', atMs:[0,1200], html:'<b>The atria get activated backwards.</b> Because the impulse starts at the doorway, it travels up into the atria as well as down — so any P wave is <b>inverted</b>, and sits right next to the QRS instead of comfortably before it.'},
    {chip:'So what?', atMs:[0,1200], html:'<b>A junctional rhythm is a safety net doing its job.</b> It is slow and there is no atrial kick, so output is lower than normal. But the <b>higher up the system a backup sits, the better it is</b> — this one is at the AV node, so it still uses the normal conducting fibres below, which is why the QRS is narrow and the rate is 40-60 rather than 20-40.'}
  ],
  note:'<b>The heart has pacemakers all the way down.</b> SA node about 60-100, AV junction 40-60, ventricular muscle 20-40. Each takes over only when everything above it has gone quiet — and the lower you go, the slower and less reliable it gets.'
}));

RHYTHMS.push(makeBlock({
  key:'pvc', name:'Premature Ventricular Complexes (PVCs)',
  title:'Premature Ventricular Complexes', sub:'A gatecrasher from downstairs, arriving before it was asked.',
  atrialRate:75, pulse:'PULSE: 72 with an occasional early beat',
  wave:{ cx:560, cy:520, clip:'rv_ventMass', r:320 },
  beats:[{gap:800,pr:0.16,conducted:true},{gap:800,pr:0.16,conducted:true},
         {gap:520,pvc:true},{gap:1080,pr:0.16,conducted:true}],
  steps:[
    {chip:'Two normal beats', atMs:[0,1200], html:'<b>Start with the ordinary.</b> Two normal beats: P wave, normal PR interval, narrow QRS — each one starting at the <b>SA node</b> and travelling down by the usual route.'},
    {chip:'Something gatecrashes', atMs:[1600,2100], showMarks:true, html:'<b>Then a beat arrives that nobody upstairs asked for.</b> A patch of ventricular muscle fires off on its own, <b>early</b> — before the next order was due. No P wave in front of it, because it did not come from the atria.'},
    {chip:'Wide and ugly', atMs:[1600,2200], html:'<b>And it looks completely different.</b> It started in muscle, so it has to spread <b>cell to cell</b> instead of running down the fast conducting fibres — wide, tall and pointing the opposite way to the normal beats. This is exactly the mechanism behind ventricular tachycardia; a PVC is a single beat of it.'},
    {chip:'Then a pause', atMs:[2120,3200], html:'<b>Then a pause.</b> The next order from upstairs arrives while the ventricles are still recovering, so it finds them unavailable — and everything waits until the one after that. Patients often feel the pause, not the extra beat.'},
    {chip:'Back to normal', atMs:[2120,3200], html:'<b>And then it carries straight on as if nothing happened.</b> That is the pattern to recognise: normal, normal, odd one, pause, normal.'},
    {chip:'So what?', atMs:[0,3200], html:'<b>Very common, and usually harmless</b> in an otherwise well heart. They matter more when they are frequent, when they come in runs, or when the patient has chest pain — because the same muscle that fires one of these can fire a run of VT.'}
  ],
  note:'<b>A PVC is a single beat of VT.</b> Same origin, same slow spread, same wide complex — it just stops after one. That is why a run of them gets your attention.'
}));

RHYTHMS.push(makeBlock({
  key:'pac', name:'Premature Atrial Complexes (PACs)',
  title:'Premature Atrial Complexes', sub:'A gatecrasher from upstairs — early, but polite about it.',
  atrialRate:75, pulse:'PULSE: 75 with an occasional early beat',
  wave:{ cx:560, cy:320, clip:'rv_atriaClip', r:220 },
  beats:[{gap:800,pr:0.16,conducted:true},{gap:800,pr:0.16,conducted:true},
         {gap:500,pr:0.16,conducted:true,pac:true},{gap:1100,pr:0.16,conducted:true}],
  steps:[
    {chip:'Two normal beats', atMs:[0,1200], html:'<b>Two ordinary beats to set the scene</b> — each one starting at the SA node and taking the usual route down.'},
    {chip:'Somewhere else fires', atMs:[1600,2000], showMarks:true, html:'<b>Then a different part of the atria fires early.</b> Watch where the wave starts — not at the boss, but somewhere else upstairs entirely. It still produces a P wave, but a <b>differently shaped</b> one, because it is spreading from the wrong place.'},
    {chip:'But it uses the door', atMs:[1700,2200], html:'<b>Crucially, it still goes through the normal route.</b> Down through the <b>AV node</b>, into the bundle of His, out along both bundle branches and through the Purkinje fibres. So the <b>QRS looks completely normal and narrow</b>.'},
    {chip:'A small pause', atMs:[2160,3200], html:'<b>Then a short pause.</b> The early beat resets the SA node, so the next beat starts its timing afresh. The pause is <b>shorter</b> than the one after a PVC — a genuinely useful way to tell them apart.'},
    {chip:'PAC or PVC?', atMs:[0,3200], html:'<b>The QRS answers it.</b> Early with a <b>narrow</b> QRS and an odd P wave = it came from upstairs, a PAC. Early with a <b>wide</b> QRS and no P at all = it came from downstairs, a PVC.'},
    {chip:'So what?', atMs:[0,3200], html:'<b>Extremely common and usually of no consequence.</b> Worth knowing mainly so you can recognise them and not mistake an irregular pulse for something more sinister — though frequent PACs can be the opening act for atrial fibrillation.'}
  ],
  note:'<b>Early beats are named by where they start, not by how early they are.</b> Upstairs gives you a narrow QRS; downstairs gives you a wide one. That single question sorts them.'
}));

/* ==========================================================================
   3f. WPW, LONG QT AND TORSADES — the last three
   ========================================================================== */
RHYTHMS.push({
  key:'wpw', name:'Wolff-Parkinson-White (WPW)',
  title:'Wolff-Parkinson-White', sub:'Born with a side door that bypasses the doorman completely.',
  rate:75, drive:'sinus', atrialRate:null, danger:false,
  squeeze:1, fillFactor:1, dyssync:0,
  pulse:'PULSE: 75, regular',
  accessory:true,
  wave:{ cx:392, cy:432, clip:'rv_ventMass', r:300 },
  ecg:function(p){
    return gauss(p,0.055,0.017,0.15)      /* P */
         + gauss(p,0.196,0.030,0.34)      /* delta — the slurred early upstroke */
         + gauss(p,0.262,0.012,0.85)      /* R, once the normal route catches up */
         + gauss(p,0.294,0.010,-0.18)     /* S */
         + gauss(p,0.560,0.048,0.26);     /* T */
  },
  marks:[[0.198,'DELTA WAVE']],
  timing:{
    atriaDepol:[0,0.10], acc:[0.09,0.16], avDelay:[0.10,0.19], his:[0.19,0.235],
    bundles:[0.215,0.26], purkinje:[0.245,0.325],
    wave:[0.15,0.33],
    atriaSqueeze:[0.05,0.21], ventSqueeze:[0.24,0.60],
    eject:[0.30,0.56], fill:[[0.00,0.20],[0.66,1.00]]
  },
  steps:[
    {chip:'A side door', at:[0.00,0.12], html:'<b>Almost every heart has exactly one way down.</b> Everything from the atria must pass through the <b>AV node</b> — the single doorway between the top of the heart and the bottom, which deliberately holds each impulse for a moment. Some people are born with an extra strand of muscle joining atrium straight to ventricle: an <b>accessory pathway</b>. A side door, and the AV node has no idea it is there.'},
    {chip:'Nobody checks it', at:[0.09,0.20], html:'<b>The AV node&rsquo;s entire job is to hold each impulse for about 0.1 s.</b> The accessory pathway does nothing of the kind — the impulse walks straight through into the ventricle. That is why the <b>PR interval is short</b>.'},
    {chip:'The delta wave', at:[0.15,0.28], html:'<b>But it arrives in the wrong place.</b> It lands in ordinary muscle rather than on the fast conducting fibres, so it has to spread <b>cell to cell</b> — slowly. That sluggish start is the <b>delta wave</b>: the slurred, lazy upstroke at the beginning of the QRS.'},
    {chip:'The proper route catches up', at:[0.19,0.34], html:'<b>Meanwhile the impulse has also taken the proper route</b> — through the AV node, down the bundle branches and out along the Purkinje fibres — and once it arrives it activates everything at full speed and takes over. So the rest of the complex looks normal. You are looking at <b>two beats fused into one</b>.'},
    {chip:'The signature', at:[0.05,0.34], html:'<b>Short PR, delta wave, slightly wide QRS.</b> The three go together and they come from the same cause: something got there early, by the wrong road.'},
    {chip:'Why it matters', at:[0.00,1.00], html:'<b>On a normal day this causes no trouble at all.</b> The danger is if the atria start fibrillating. The AV node would normally protect the ventricles by refusing most of that chaos — but <b>the side door refuses nothing</b>, so the ventricles can be driven dangerously fast.'}
  ],
  note:'<b>Everything about WPW follows from one fact:</b> there is a second way in, and it has no doorman. Early arrival gives the short PR, arriving into muscle gives the delta wave, and no filtering is what makes it dangerous.'
});

RHYTHMS.push({
  key:'longqt', name:'Long QT Syndrome',
  title:'Long QT', sub:'The reset takes far too long — and that leaves a window open.',
  rate:65, drive:'sinus', atrialRate:null, danger:false,
  squeeze:1, fillFactor:1, dyssync:0,
  pulse:'PULSE: 65, regular',
  alert:null,
  ecg:function(p){
    return gauss(p,0.050,0.016,0.15)      /* P */
         + gauss(p,0.222,0.007,-0.08)     /* Q */
         + gauss(p,0.240,0.010,0.95)      /* R */
         + gauss(p,0.264,0.009,-0.20)     /* S */
         + gauss(p,0.560,0.085,0.26);     /* a long, late, broad T */
  },
  marks:[[0.240,'QRS'],[0.560,'LONG T']],
  timing:{
    atriaDepol:[0,0.10], avDelay:[0.10,0.18], his:[0.18,0.22],
    bundles:[0.20,0.245], purkinje:[0.23,0.30],
    atriaSqueeze:[0.05,0.20], ventSqueeze:[0.25,0.66],
    eject:[0.30,0.60], fill:[[0.00,0.18],[0.74,1.00]]
  },
  steps:[
    {chip:'Squeeze is normal', at:[0.18,0.32], html:'<b>Getting the message out is completely normal here.</b> SA node, AV node, bundle branches, Purkinje fibres — the impulse takes the proper route, the QRS is narrow, and the contraction is exactly as it should be.'},
    {chip:'The reset is not', at:[0.32,0.80], html:'<b>The problem is the reset.</b> After every squeeze the ventricles have to recharge before they can go again — that is the T wave. Here it takes <b>far longer than it should</b>. Look how late and how broad that T wave is.'},
    {chip:'Measuring it', at:[0.20,0.72], html:'<b>The QT interval runs from the start of the QRS to the end of the T.</b> It should take up roughly the first half of the gap between beats. When it stretches well beyond that, the heart is spending most of its time recharging.'},
    {chip:'A window left open', at:[0.42,0.72], html:'<b>And a long reset leaves a vulnerable window.</b> During that stretch some cells have recovered and some have not. An extra beat landing right there — <b>on the T wave</b> — finds the ventricles half ready and half not.'},
    {chip:'What that starts', at:[0.42,0.80], html:'<b>That is how torsades begins.</b> The impulse cannot spread evenly through muscle that is half recovered, so it starts circling instead — producing a fast, twisting rhythm called <b>torsades de pointes</b>, which has its own entry in this list.'},
    {chip:'Causes', at:[0.00,1.00], html:'<b>Some people are born with it</b>, and it can also be caused by <b>certain medicines, or by low potassium or magnesium</b>. It is worth spotting precisely because of what it can turn into.'}
  ],
  note:'<b>Long QT is not dangerous in itself — it is dangerous because of what it allows.</b> A long reset is an open door for the rhythm in the next entry.'
});

RHYTHMS.push({
  key:'torsades', name:'Torsades de Pointes',
  title:'Torsades de Pointes', sub:'Twisting of the points — the rogue voice will not stand still.',
  rate:0, beats:0, freeRun:true, drive:'fibrillation', atrialRate:null, danger:true,
  squeeze:0, fillFactor:0, dyssync:0, noOutput:true,
  pulse:'PULSE: weak or absent',
  alert:'⚠️ A FORM OF VT — can stop on its own, or degenerate into VF',
  circuit:{ d:'M 470 430 C 530 430 566 478 566 528 C 566 578 530 620 470 620 C 410 620 374 578 374 528 C 374 478 410 430 470 430 Z', periodMs:1500 },
  ecgTime:function(ms){
    /* Built from individual wide complexes, NOT a modulated sine wave — that
       is the difference between torsades and coarse VF. Each complex keeps its
       shape; what changes is its height and which way up it is, following a
       slow envelope. The result is spindles that grow, shrink, flip over and
       grow again — the twisting of the points. */
    var PERIOD = 3200, BEAT = PERIOD / 14, TWIST = 1600;
    var m = ((ms % PERIOD) + PERIOD) % PERIOD, mv = 0, k, t, dt, A;
    for(k = -2; k <= 16; k++){
      t  = k * BEAT;
      dt = m - t;
      if(dt < -300 || dt > 300) continue;
      A = Math.sin(2 * Math.PI * t / TWIST);
      /* keep a floor on the height — real complexes shrink at the waist of a
         spindle but never disappear altogether */
      A = (A < 0 ? -1 : 1) * (0.26 + 0.72 * Math.abs(A));
      A *= 1 + 0.10 * vhash(k);                              /* never quite identical */
      mv += A * ( gauss(dt, 0, 34, 1.0)
                - 0.30 * gauss(dt, -56, 19, 1.0)
                - 0.30 * gauss(dt,  56, 19, 1.0) );          /* a broad complex, not a bump */
    }
    return mv;
  },
  marks:[],
  timing:{ atriaSqueeze:[0,0], ventSqueeze:[0,0], eject:[0,0], fill:[0,0] },
  steps:[
    {chip:'A kind of VT', html:'<b>This is ventricular tachycardia</b> — it comes from the ventricles, it is fast, and the complexes are wide. But where ordinary VT has one rogue voice shouting from one spot, this one <b>will not stand still</b>.'},
    {chip:'The focus moves', html:'<b>The activation keeps rotating.</b> Watch the loop turning: the point the impulse comes from is travelling around the ventricles rather than staying put, so <b>every beat is shaped differently from the last</b>.'},
    {chip:'Twisting the points', html:'<b>That is what you are seeing on the strip.</b> The complexes grow, shrink, flip over and grow again, so the whole trace appears to twist around the baseline. <b>Torsades de pointes</b> — French for "twisting of the points".'},
    {chip:'Where it came from', html:'<b>It usually starts on the back of a long QT.</b> If the ventricles take too long to recharge after each beat, a stray impulse can land while some cells have recovered and some have not. It cannot cross evenly, so it starts circling instead. <b>Long QT</b> has its own entry here if you want to see the setup.'},
    {chip:'No useful output', html:'<b>At this rate, twisting like this, the ventricles are not filling or emptying properly.</b> The pulse is usually weak or absent, which is what makes this an arrest rhythm rather than a curiosity.'},
    {chip:'What it does next', html:'<b>Torsades often stops on its own</b> — bursts of it come and go, which is why some patients describe repeated collapses and recoveries. But it can also <b>degenerate into VF</b>, and then it stops being self-limiting altogether.'}
  ],
  note:'<b>The last three entries are one story.</b> A long reset leaves a window, a beat lands in that window, and the impulse starts circling — twisting, then possibly fibrillating. Long QT, torsades, VF.'
});

RHYTHMS.push({
  key:'block3', name:'Third Degree (Complete) Heart Block', danger:true,
  title:'Third Degree — Complete Heart Block', sub:'The door is locked. Downstairs runs on a backup generator.',
  rate:35, drive:'ectopic', atrialRate:75,
  squeeze:0.9, fillFactor:0.85, dyssync:0.06,
  pulse:'PULSE: 35 — atria firing at 75',
  alert:'⚠️ UNSTABLE — a backup pacemaker can fail without warning',
  labels:{ focus:'Backup pacemaker', focusSub:'the ventricles going it alone', block:'AV node blocked' },
  ecg:function(p){ return gauss(p,0.10,0.016,1.00) + gauss(p,0.25,0.032,-0.32); },
  atrialEcg:function(q){ return gauss(q,0.06,0.018,0.13); },
  marks:[],
  timing:{ ectopic:[0,0.05], wave:[0.02,0.30], atriaSqueeze:[0.05,0.21],
           ventSqueeze:[0.06,0.42], eject:[0.12,0.36], fill:[[0.50,1.00]] },
  steps:[
    {chip:'Still knocking', at:[0.00,0.30], html:'<b>The SA node has not stopped.</b> Watch the top of the heart — the atria are firing away perfectly normally, at their own steady rate. Those P waves are all over the strip.'},
    {chip:'Door locked', at:[0.00,1.00], showMarks:true, html:'<b>But nothing gets through.</b> The <b>AV node</b> — the only doorway between the top of the heart and the bottom — is shut and locked. Not slow, not intermittent: <b>every single</b> impulse from the atria stops dead there.'},
    {chip:'Backup generator', at:[0.00,0.30], html:'<b>The ventricles will not simply stop.</b> Somewhere below the block, a cell starts firing on its own — a <b>backup generator</b> kicking in. It is slow and it is crude, but it keeps something happening.'},
    {chip:'Slow and wide', at:[0.04,0.45], html:'Because it starts in the muscle instead of the conducting system, it has to spread <b>cell to cell</b> — so the QRS is <b>wide</b>, and the rate is typically only <b>20–40</b>.'},
    {chip:'Out of step', at:[0.00,1.00], showMarks:true, html:'<b>Nothing links the two.</b> The P waves march at their rate, the QRS complexes plod along at theirs, and they simply pass through each other. No P wave has any relationship to any QRS — that is <b>complete AV dissociation</b>.'},
    {chip:'So what?', at:[0.00,1.00], html:'<b>A backup generator was never built to run the house.</b> A rate in the thirties with no atrial kick means poor output — which is why these patients faint, and why this one is an emergency.'}
  ],
  note:'<b>All four blocks, one doorway.</b> Slow doorman, tiring doorman, broken floor, locked door. The ECG changes each time because the impulse takes a different journey — nothing about the heart itself has changed.'
});


/* ==========================================================================
   4. ENGINE
   ========================================================================== */
var W = 900, BASE = 118, SCALE = 70, HOLD_MS = 900, PAPER_MS = 3200;

var root, el = {}, R, particles = [], segs = [], valveEls = {};
var vCycle, aCycle, stripMs, anchorBeat;
var phase = 0, atrialPhase = 0, freeT = 0, uiT = 0, fade = {}, flashSpan = 0.1;
/* ANIMATION SPEED. Every moving thing reads this one number: how fast a step
   plays out, the blood particles, the atrial flicker, the free-running traces
   and the UI pulsing. It was 0.35; halved to 0.175 so there is time to watch
   what is happening. Put it back to 0.35 to restore the original pace. */
var speed = 0.175, stepIndex = 0, anim = null, last = 0, shownIndex = -1, started = false;

function id(x){ return document.getElementById(x); }
function ramp(p,a,b){ if(p<=a) return 0; if(p>=b) return 1; var t=(p-a)/(b-a); return t*t*(3-2*t); }
function bump(p,a,b){ if(b<=a || p<a || p>b) return 0; return Math.sin(((p-a)/(b-a))*Math.PI); }
function clamp(v){ return Math.max(0,Math.min(1,v)); }

/* --------------------------------------------------------------------------
   WINDOW HELPERS
   A rhythm's timings used to be a single window like [0.27, 0.60]. The heart
   blocks need several per cycle (three conducted beats and one dropped, say),
   so every timing may now be EITHER one window or a list of them. These
   helpers accept both.
   -------------------------------------------------------------------------- */
function asWins(w){
  if(!w) return [];
  return (typeof w[0] === 'number') ? [w] : w;
}
function inAnyW(p, w){
  var L = asWins(w);
  for(var i=0;i<L.length;i++) if(p >= L[i][0] && p <= L[i][1]) return true;
  return false;
}
function bumpW(p, w){                      /* 0 -> 1 -> 0, strongest window wins */
  var L = asWins(w), m = 0, v;
  for(var i=0;i<L.length;i++){ v = bump(p, L[i][0], L[i][1]); if(v > m) m = v; }
  return m;
}
function progW(p, w){                      /* progress through the CURRENT window */
  var L = asWins(w), out = 0;
  for(var i=0;i<L.length;i++) if(p >= L[i][0]) out = ramp(p, L[i][0], L[i][1]);
  return out;
}
function gate(p, w, lead, tail){           /* valve-style open/shut envelope */
  var L = asWins(w), m = 0, v;
  for(var i=0;i<L.length;i++){
    v = ramp(p, L[i][0]-lead, L[i][0]+lead) - ramp(p, L[i][1], L[i][1]+tail);
    if(v > m) m = v;
  }
  return m;
}
function pulseW(p, w, span){               /* a decaying flash at each window start */
  var L = asWins(w), m = 0, v;
  for(var i=0;i<L.length;i++){
    if(p >= L[i][0] && p < L[i][0] + span){ v = 1 - (p - L[i][0]) / span; if(v > m) m = v; }
  }
  return m;
}
/* how far a conduction segment is drawn, and how bright, across all its windows */
function segState(p, w, fade){
  var L = asWins(w), drawn = 0, op = 0, o, d;
  for(var i=0;i<L.length;i++){
    if(p < L[i][0]) continue;
    d = ramp(p, L[i][0], L[i][1]);
    o = p < L[i][1] ? 1 : Math.max(0, 1 - (p - L[i][1]) / fade);
    if(o >= op){ op = o; drawn = d; }
  }
  return { drawn:drawn, op:op };
}

var UI = '<div class="rv-root">' +
    '<div class="rv-card">' +
    '<div class="rv-head">' +
      '<div><select class="rv-select" id="rv_select" aria-label="Choose a rhythm"></select>' +
      '<p class="rv-sub" id="rv_subtitle"></p></div>' +
    '</div>' +
    '<div class="rv-alert" id="rv_alert"></div>' +
    '<div class="rv-monitor">' +
      '<div class="rv-mon-head"><span class="rv-lead" id="rv_lead">LEAD II — RHYTHM STRIP</span>' +
        '<div class="rv-mon-right"><span class="rv-pulse" id="rv_pulse"></span>' +
        '<span class="rv-hr">♥ <span id="rv_hr">75</span> BPM</span></div></div>' +
      '<svg class="rv-ecg" id="rv_ecgSvg" viewBox="0 0 900 190" xmlns="http://www.w3.org/2000/svg" aria-label="ECG trace">' +
        '<g id="rv_grid"></g>' +
        '<rect id="rv_hi" y="12" height="146" fill="#22c55e" opacity="0.13" rx="3"/>' +
        '<path id="rv_trace" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>' +
        '<line id="rv_sweep" y1="12" y2="158" stroke="#fff" stroke-width="1.5" opacity=".45"/>' +
        '<circle id="rv_dot" r="5.5" fill="#fff"/>' +
        '<g id="rv_pmarks"></g>' +
        '<g id="rv_waveLabels" font-family="ui-monospace,monospace" font-size="12" fill="#8f8fae"></g>' +
      '</svg>' +
      '<div class="rv-jump">' +
        '<button id="rv_prev" aria-label="Previous step">‹</button>' +
        '<button id="rv_next" class="rv-primary">Next step ›</button>' +
      '</div>' +
    '</div>' +
    '<div class="rv-stage">' + SVG_MARKUP + '</div>' +
    '<div class="rv-comm">' +
      '<div class="rv-side"><span class="rv-chip" id="rv_chip">—</span><span class="rv-count" id="rv_count"></span></div>' +
      '<p class="rv-text" id="rv_textOut"></p>' +
    '</div>' +
    '<div class="rv-steps">' +
      '<div class="rv-mid"><div class="rv-dots" id="rv_dots"></div>' +
        '<span class="rv-hint">replaying — press Next when ready</span></div>' +
    '</div>' +
    '<div class="rv-controls">' +
      '<span class="rv-cap">Show</span>' +
      '<div class="rv-layers" id="rv_layerToggle">' +
        '<button data-layer="flow">Blood flow</button>' +
        '<button data-layer="elec">Electrical</button>' +
        '<button data-layer="both" class="rv-on">Both</button>' +
      '</div>' +
    '</div>' +
    '<div class="rv-legend">' +
      '<span><i class="rv-dot" style="background:#4C86C6"></i> Deoxygenated blood</span>' +
      '<span><i class="rv-dot" style="background:#D64550"></i> Oxygenated blood</span>' +
      '<span><i class="rv-dot" style="background:#E8890C"></i> Electrical impulse</span>' +
      '<span><i class="rv-dot" style="background:#E4B9B3"></i> Heart muscle</span>' +
    '</div>' +
  '</div>' +
  '<div class="rv-note" id="rv_note"></div>' +
'</div>';

/* ---------------------------------------------------------------- mount */
function mount(container){
  if(started) return;
  started = true;

  var style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  container.innerHTML = UI;

  ['select','subtitle','layerToggle','chip','count','textOut','dots','prev','next','alert',
   'lead','pulse','hr','ecgSvg','grid','hi','trace','sweep','dot','pmarks','waveLabels','note',
   'heart','saNode','avNode','avBlock','ectopicLayer','waveFill','waveRing','focusNode',
   'focusGlow','vtLabels','raGroup','laGroup','rvGroup','lvGroup','labels','elecLabels','lblAv',
   'lblHis','lblPurk','particles','elecLayer','flowLayer',
   'focusName','focusSub','blockName','atrialChaos','circuit','circuitPath','circuitDot',
   'waveClip','branchBlock','branchCross1','branchCross2',
   'coronaryLayer','territory','clot','clotDot','clotLabel','accessory']
    .forEach(function(k){ el[k] = id('rv_'+k); });

  /* the SVG uses class names for the two layers — scope them here */
  el.flowLayer.classList.add('rv-flow','rv-layer');
  el.elecLayer.classList.add('rv-elec','rv-layer');
  [].forEach.call(container.querySelectorAll('.elec-layer'), function(g){ g.classList.add('rv-elec','rv-layer'); });

  [el.raGroup, el.laGroup, el.rvGroup, el.lvGroup].forEach(function(g){
    g.style.transformBox = 'fill-box'; g.style.transformOrigin = 'center';
  });

  [].forEach.call(container.querySelectorAll('.valve'), function(v){
    valveEls[v.getAttribute('data-valve')] = { shut:v.querySelector('.v-shut'), open:v.querySelector('.v-open') };
  });

  segs = [].map.call(container.querySelectorAll('.cseg'), function(e){
    var len = e.getTotalLength();
    e.style.strokeDasharray = len; e.style.strokeDashoffset = len;
    return { el:e, len:len, seg:e.getAttribute('data-seg') };
  });

  buildParticles();
  buildPicker();
  wireControls();
  window.addEventListener('resize', fitViewBox);

  load('nsr');
  requestAnimationFrame(function(t){ last = t; loop(t); });
}

function buildParticles(){
  var sets = [
    ['pathVenousFill','#B7D6F5','#2A5E96',6,'fill'],
    ['pathVenousFill2','#B7D6F5','#2A5E96',6,'fill'],
    ['pathRvEject','#B7D6F5','#2A5E96',5,'eject'],
    ['pathRvEject2','#B7D6F5','#2A5E96',4,'eject'],
    ['pathArterialFill','#FFB3B7','#A82F39',6,'fill'],
    ['pathArterialFill2','#FFB3B7','#A82F39',6,'fill'],
    ['pathLvEject','#FFB3B7','#A82F39',7,'eject']
  ];
  var holder = el.particles;
  sets.forEach(function(s){
    var pathEl = id('rv_'+s[0]), len = pathEl.getTotalLength();
    for(var i=0;i<s[3];i++){
      var c = document.createElementNS('http://www.w3.org/2000/svg','circle');
      c.setAttribute('r',6); c.setAttribute('fill',s[1]);
      c.setAttribute('stroke',s[2]); c.setAttribute('stroke-width',1.5);
      holder.appendChild(c);
      particles.push({ el:c, pathEl:pathEl, len:len, offset:i/s[3], when:s[4] });
    }
  });
}

function buildPicker(){
  /* listed A-Z so a rhythm is easy to find; the engine looks them up by key,
     so this ordering is display-only. The page still opens on sinus rhythm. */
  /* sinus rhythm is pinned first — it is the reference every other rhythm is
     compared against; everything else is listed A-Z so it is easy to find */
  var sorted = RHYTHMS.slice().sort(function(a,b){
    if(a.key === 'nsr') return -1;
    if(b.key === 'nsr') return 1;
    return a.name.localeCompare(b.name, 'en');
  });
  el.select.innerHTML = sorted.map(function(r){
    return '<option value="'+r.key+'">'+r.name+'</option>';
  }).join('');
  el.select.addEventListener('change', function(){ load(this.value); });
}

/* ---------------------------------------------------------------- load */
function load(key){
  R = RHYTHMS.filter(function(r){ return r.key === key; })[0];

  el.select.value = key;

  vCycle  = R.cycleMs ? R.cycleMs : (R.rate ? 60000 / R.rate : PAPER_MS);
  aCycle  = R.atrialRate ? 60000 / R.atrialRate : null;
  /* The strip always shows the SAME amount of time, whatever the rate.
     That is what makes a wide QRS genuinely look wide next to a narrow
     one — faster rhythms simply fit more beats on the screen. */
  /* A handful of rhythms are diagnosed by the SPACING between beats rather
     than by the shape of any one complex — atrial fibrillation and sinus
     arrhythmia. Those get a longer window so enough beats are on screen for
     the pattern (or the lack of one) to be visible at all. */
  stripMs = R.paperMs || PAPER_MS;
  anchorBeat = R.freeRun ? 0 : Math.max(0, Math.floor((stripMs / vCycle) / 2));

  el.subtitle.textContent = R.sub;
  el.hr.textContent       = R.rate ? R.rate : '--';
  el.lead.textContent     = R.stripLabel || 'LEAD II — RHYTHM STRIP';
  el.pulse.innerHTML      = R.noOutput || R.key === 'vt'
      ? 'PULSE: <b>' + R.pulse.replace('PULSE: ','') + '</b>' : R.pulse;
  el.alert.style.display  = R.alert ? 'block' : 'none';
  el.alert.textContent    = R.alert || '';
  el.note.innerHTML       = R.note || '';
  el.note.style.display   = R.note ? '' : 'none';
  el.hi.setAttribute('fill', R.danger ? '#f87171' : '#22c55e');
  el.hi.style.display     = R.freeRun ? 'none' : '';
  el.trace.setAttribute('stroke', '#22c55e');

  var ect = R.drive === 'ectopic';
  var hasBlock = asWins(R.timing.blocked).length > 0;
  el.avBlock.style.display      = (ect || hasBlock) ? '' : 'none';
  el.vtLabels.style.display     = ect ? '' : 'none';
  el.atrialChaos.style.display = R.atrialChaos ? '' : 'none';

  /* the wavefront layer is shared by VT, complete block and the bundle blocks */
  var wantsWave = ect || !!R.wave;
  el.ectopicLayer.style.display = wantsWave ? '' : 'none';
  el.focusNode.style.display = ect ? '' : 'none';
  el.focusGlow.style.display = ect ? '' : 'none';
  if(R.wave){
    el.waveClip.setAttribute('clip-path', 'url(#' + (R.wave.clip || 'rv_ventMass') + ')');
    [el.waveFill, el.waveRing].forEach(function(c){
      c.setAttribute('cx', R.wave.cx); c.setAttribute('cy', R.wave.cy);
    });
  } else {
    el.waveClip.setAttribute('clip-path', 'url(#rv_ventMass)');
    [el.waveFill, el.waveRing].forEach(function(c){
      c.setAttribute('cx', 604); c.setAttribute('cy', 556);
    });
  }
  el.coronaryLayer.style.display = R.coronaries ? '' : 'none';
  el.accessory.style.display = R.accessory ? '' : 'none';
  if(R.hideLabels){ el.labels.style.display = 'none'; el.elecLabels.style.display = 'none'; }
  else            { el.elecLabels.style.display = ''; }
  el.branchBlock.style.display = R.branchBlock ? '' : 'none';
  if(R.branchBlock){
    el.branchCross1.setAttribute('d', R.branchBlock);
    el.branchCross2.setAttribute('d', R.branchBlock);
  }
  el.circuit.style.display     = R.circuit ? '' : 'none';
  if(R.circuit){
    el.circuitPath.setAttribute('d', R.circuit.d);
    circuitLen = el.circuitPath.getTotalLength();
  }
  if(R.labels){
    el.focusName.textContent = R.labels.focus;
    el.focusSub.textContent  = R.labels.focusSub;
    el.blockName.textContent = R.labels.block;
  }
  el.lblAv.style.display        = ect ? 'none' : '';
  el.lblHis.style.opacity  = (R.drive === 'sinus') ? 1 : 0.32;
  el.lblPurk.style.opacity = (R.drive === 'sinus') ? 1 : 0.32;

  /* fades are authored in milliseconds so they look the same at any rate */
  fade = { atria:260/vCycle, his:150/vCycle, acc:200/vCycle, rbb:150/vCycle, lbb:150/vCycle,
           purkR:190/vCycle, purkL:190/vCycle };
  flashSpan = 95 / vCycle;

  /* steps may declare their window in milliseconds instead of a fraction */
  R.steps.forEach(function(st){
    if(st.atMs) st.at = [st.atMs[0]/vCycle, st.atMs[1]/vCycle];
  });

  buildStrip();
  el.dots.innerHTML = R.steps.map(function(){ return '<i></i>'; }).join('');
  shownIndex = -1; stepIndex = 0; atrialPhase = 0; freeT = 0;
  startStep();
  fitViewBox();
}

/* ------------------------------------------------------- the ECG strip */
function ecgAtMs(ms){
  if(R.ecgTime) return R.ecgTime(ms);
  var mv = R.ecg((ms % vCycle) / vCycle);
  if(aCycle && R.atrialEcg) mv += R.atrialEcg((ms % aCycle) / aCycle);
  return mv;
}

function buildStrip(){
  var g = '', x, y;
  for(x=0;x<=W;x+=25)    g += '<line x1="'+x+'" y1="10" x2="'+x+'" y2="170" stroke="#2a2a4a" stroke-width="1"/>';
  for(y=10;y<=170;y+=24) g += '<line x1="0" y1="'+y+'" x2="'+W+'" y2="'+y+'" stroke="#2a2a4a" stroke-width="1"/>';
  el.grid.innerHTML = g;

  var STEPS = 2600, d = '', i, ms;
  for(i=0;i<=STEPS;i++){
    ms = (i/STEPS) * stripMs;
    d += (i===0?'M ':' L ') + ((ms/stripMs)*W).toFixed(1) + ' ' + (BASE - ecgAtMs(ms)*SCALE).toFixed(1);
  }
  el.trace.setAttribute('d', d);

  el.waveLabels.innerHTML = (R.marks||[]).map(function(m){
    return '<text x="'+(((anchorBeat+m[0])*vCycle/stripMs)*W).toFixed(0)+'" y="186" text-anchor="middle">'+m[1]+'</text>';
  }).join('');

  /* arrows over particular points on the trace */
  var marks = '';
  if(R.marksMs){
    R.marksMs.forEach(function(m){
      var mx = (m[0]/stripMs)*W, my = BASE - ecgAtMs(m[0])*SCALE;
      marks += '<path d="M '+mx.toFixed(1)+' '+(my-26).toFixed(1)+' l -5 -9 l 10 0 z" fill="#facc15" opacity="0.95"/>' +
               '<text x="'+mx.toFixed(1)+'" y="'+(my-40).toFixed(1)+'" text-anchor="middle" font-family="ui-monospace,monospace" font-size="11" fill="#facc15">'+m[1]+'</text>';
    });
  }
  if(aCycle){
    for(var k=0; k*aCycle < stripMs; k++){
      var t = k*aCycle + 0.06*aCycle, px = (t/stripMs)*W, py = BASE - ecgAtMs(t)*SCALE;
      marks += '<path d="M '+px.toFixed(1)+' '+(py-30).toFixed(1)+' l -5 -9 l 10 0 z" fill="#facc15" opacity="0.9"/>' +
               '<text x="'+px.toFixed(1)+'" y="'+(py-44).toFixed(1)+'" text-anchor="middle" font-family="ui-monospace,monospace" font-size="11" fill="#facc15">P</text>';
    }
  }
  el.pmarks.innerHTML = marks;
  el.pmarks.style.display = 'none';
}

/* ------------------------------------------------------------- stepping */
function startStep(){
  var s = R.steps[stepIndex];
  if(R.freeRun || !s.at){ anim = null; return; }
  var a = s.at[0], b = s.at[1];
  var base = Math.max(900, Math.min(2600, 900 + (b-a)*4200));
  anim = { from:a, to:b-0.0005, start:performance.now(), dur: base * (0.35/speed) };
  phase = a;
}
function goStep(i){ stepIndex = (i + R.steps.length) % R.steps.length; startStep(); }

/* ------------------------------------------------------------- the loop */
function loop(now){
  var dt = now - last; last = now;

  if(R.freeRun){
    freeT = (freeT + dt*speed) % stripMs;
    phase = freeT / stripMs;
  } else if(anim){
    var e = now - anim.start;
    if(e <= anim.dur){ var k = e/anim.dur; phase = anim.from + (anim.to-anim.from)*(k*k*(3-2*k)); }
    else if(e <= anim.dur + HOLD_MS){ phase = anim.to; }
    else { anim.start = now; phase = anim.from; }
  }

  if(aCycle) atrialPhase = (atrialPhase + (dt*speed)/aCycle) % 1;
  else       atrialPhase = phase;
  /* the atria never pause while you read, so chaos and circuits run on their
     own continuous clock rather than the stepped one */
  uiT += dt * speed;

  draw();
  requestAnimationFrame(loop);
}

function draw(){
  var p = phase, T = R.timing, i;

  /* ---------------- electrical ---------------- */
  if(R.drive === 'sinus'){
    /* the two bundle branches and the two Purkinje fans can be driven
       separately (that is all a bundle branch block is); anything that does
       not care just inherits the shared window */
    var WIN = { atria:T.atriaDepol, his:T.his,
                rbb:  T.rbb   !== undefined ? T.rbb   : T.bundles,
                lbb:  T.lbb   !== undefined ? T.lbb   : T.bundles,
                acc:  T.acc,
                purkR:T.purkR !== undefined ? T.purkR : T.purkinje,
                purkL:T.purkL !== undefined ? T.purkL : T.purkinje };
    segs.forEach(function(s){
      var st = segState(p, WIN[s.seg], fade[s.seg]);
      s.el.style.strokeDashoffset = s.len * (1 - st.drawn);
      s.el.style.opacity = st.op;
      s.el.style.filter = st.op > 0.15 ? 'url(#rv_glow)' : 'none';
    });
    var sa = pulseW(p, T.atriaDepol, flashSpan);
    el.saNode.setAttribute('r', R.saQuiet ? 11 : 13 + sa*7);
    el.saNode.setAttribute('fill', R.saQuiet ? '#B0A89C' : (sa > 0.1 ? '#FFC93C' : '#E8890C'));
    el.saNode.style.filter = (!R.saQuiet && sa > 0.1) ? 'url(#rv_glow)' : 'none';

    var hold = inAnyW(p, T.avDelay), fire = inAnyW(p, T.his), stuck = inAnyW(p, T.blocked);
    el.avNode.setAttribute('r', fire ? 18 : 12);
    el.avNode.setAttribute('fill', stuck ? '#C0392B' : ((hold||fire) ? '#FFC93C' : '#E8890C'));
    el.avNode.style.filter = (hold||fire||stuck) ? 'url(#rv_glow)' : 'none';
    el.avNode.style.opacity = 1;
    el.avBlock.style.opacity = stuck ? 1 : 0;      /* the red cross on a dropped beat */

    /* a bundle branch block still spreads a wavefront — just late, and only
       into the ventricle whose staircase is out of action */
    if(R.wave){
      var sp = progW(p, T.wave), rr2 = sp * (R.wave.r || 300);
      el.waveFill.setAttribute('r', rr2); el.waveRing.setAttribute('r', rr2);
      el.waveFill.style.opacity = 0.24 * (1 - Math.max(0,(p - asWins(T.wave)[0][1])/0.3));
      el.waveRing.style.opacity = (sp > 0 && sp < 1) ? 0.8 : 0;
      el.waveRing.style.filter = 'url(#rv_glow)';
    }

  } else if(R.drive === 'ectopic'){
    segs.forEach(function(s){
      if(s.seg === 'atria'){
        s.el.style.strokeDashoffset = s.len * (1 - ramp(atrialPhase, 0, 0.11));
        var op = atrialPhase < 0.11 ? 0.85 : Math.max(0, 0.85 - (atrialPhase-0.11)/0.25);
        s.el.style.opacity = op;
        s.el.style.filter = op > 0.2 ? 'url(#rv_glow)' : 'none';
      } else { s.el.style.opacity = 0; }
    });
    var sa2 = Math.max(0, 1 - atrialPhase/0.09);
    el.saNode.setAttribute('r', 13 + sa2*6);
    el.saNode.setAttribute('fill', sa2 > 0.1 ? '#FFC93C' : '#E8890C');
    el.saNode.style.filter = sa2 > 0.1 ? 'url(#rv_glow)' : 'none';
    el.avNode.setAttribute('r', 12);
    el.avNode.setAttribute('fill', '#B0A89C');
    el.avNode.style.filter = 'none';
    el.avNode.style.opacity = 0.85;
    el.avBlock.style.opacity = 1;

    var spread = progW(p, T.wave), rr = spread*340;
    el.waveFill.setAttribute('r', rr); el.waveRing.setAttribute('r', rr);
    el.waveFill.style.opacity = 0.24 * (1 - Math.max(0,(p - asWins(T.wave)[0][1])/0.3));
    el.waveRing.style.opacity = (spread>0 && spread<1) ? 0.85 : 0;
    el.waveRing.style.filter = 'url(#rv_glow)';
    var fp = pulseW(p, T.ectopic, flashSpan);
    el.focusNode.setAttribute('r', 11 + fp*8);
    el.focusNode.setAttribute('fill', fp > 0.1 ? '#FFC93C' : '#C0392B');
    el.focusGlow.setAttribute('r', 16 + fp*22);
    el.focusGlow.style.opacity = 0.20 + fp*0.35;

  } else if(R.drive === 'fibrillation'){
    /* chaos: every wavelet on its own timer, none of them in charge */
    segs.forEach(function(s){ s.el.style.opacity = 0; });
    el.saNode.setAttribute('r', 11);
    el.saNode.setAttribute('fill', '#B0A89C'); el.saNode.style.filter = 'none';
    el.avNode.setAttribute('r', 11);
    el.avNode.setAttribute('fill', '#B0A89C'); el.avNode.style.filter = 'none';
    var tms = freeT;
    for(i=0;i<FIB.length;i++){
      var f = FIB[i];
      var amp = 0.5 + 0.5*Math.sin(2*Math.PI*tms/f.per + f.ph);
      f.node.setAttribute('r', 5 + amp*13);
      f.node.style.opacity = 0.25 + amp*0.6;
    }

  } else {  /* silent — asystole */
    segs.forEach(function(s){ s.el.style.opacity = 0; });
    el.saNode.setAttribute('r', 11); el.saNode.setAttribute('fill', '#B0A89C'); el.saNode.style.filter = 'none';
    el.avNode.setAttribute('r', 11); el.avNode.setAttribute('fill', '#B0A89C'); el.avNode.style.filter = 'none';
  }
  fibLayer.style.display = (R.drive === 'fibrillation') ? '' : 'none';

  /* ---- atrial fibrillation wavelets ---- */
  if(R.atrialChaos){
    for(i=0;i<AFIB.length;i++){
      var a = AFIB[i];
      var amp = 0.5 + 0.5*Math.sin(2*Math.PI*uiT/a.per + a.ph);
      a.node.setAttribute('r', 3 + amp*8);
      a.node.style.opacity = 0.2 + amp*0.55;
    }
  }

  /* ---- re-entry circuit: one impulse going round and round ---- */
  if(R.circuit && circuitLen){
    var q = el.circuitPath.getPointAtLength(((uiT % R.circuit.periodMs) / R.circuit.periodMs) * circuitLen);
    el.circuitDot.setAttribute('cx', q.x);
    el.circuitDot.setAttribute('cy', q.y);
    el.circuitDot.style.filter = 'url(#rv_glow)';
  }

  /* ---------------- mechanical ---------------- */
  var aSq = bumpW(atrialPhase, T.atriaSqueeze) * R.squeeze;
  el.raGroup.style.transform = 'scale(' + (1 - aSq*0.055) + ')';
  el.laGroup.style.transform = 'scale(' + (1 - aSq*0.055) + ')';

  var rvSq, lvSq;
  if(R.drive === 'fibrillation'){
    /* quivering, not contracting — tiny out-of-phase jitter */
    rvSq = 0.010*Math.sin(2*Math.PI*freeT/113) + 0.008*Math.sin(2*Math.PI*freeT/67);
    lvSq = 0.010*Math.sin(2*Math.PI*freeT/97 + 2) + 0.008*Math.sin(2*Math.PI*freeT/53 + 1);
    el.rvGroup.style.transform = 'scale(' + (1 - rvSq) + ')';
    el.lvGroup.style.transform = 'scale(' + (1 - lvSq) + ')';
  } else {
    rvSq = bumpW(p, T.ventSqueeze) * R.squeeze;
    lvSq = bumpW(p - R.dyssync, T.ventSqueeze) * R.squeeze;
    el.rvGroup.style.transform = 'scale(' + (1 - rvSq*0.07) + ')';
    el.lvGroup.style.transform = 'scale(' + (1 - lvSq*0.075) + ')';
  }

  /* ---------------- valves ---------------- */
  var shut = gate(p, T.ventSqueeze, 0.012, 0.04);       /* AV valves shut during systole */
  setValve('tricuspid', clamp(1 - shut)); setValve('mitral', clamp(1 - shut));
  var sl = gate(p, T.eject, 0.012, 0.04);               /* outflow valves open on ejection */
  setValve('pulmonary', clamp(sl)); setValve('aortic', clamp(sl));

  /* ---------------- blood ---------------- */
  var fillP  = progW(p, T.fill) * R.fillFactor;
  var ejectP = progW(p, T.eject) * (R.fillFactor < 1 ? 0.55 : 1);
  particles.forEach(function(pt){
    var prog = (pt.when === 'fill' ? fillP : ejectP);
    var f = (prog + pt.offset) % 1;
    var q = pt.pathEl.getPointAtLength(f * pt.len);
    pt.el.setAttribute('cx', q.x); pt.el.setAttribute('cy', q.y);
    pt.el.style.opacity = R.noOutput ? 0.32 : Math.min(1, Math.min(f, 1-f)*8);
  });

  /* ---------------- ECG ---------------- */
  var ms = R.freeRun ? freeT : (anchorBeat + p) * vCycle;
  var x = (ms/stripMs)*W;
  el.dot.setAttribute('cx', x);
  el.dot.setAttribute('cy', BASE - ecgAtMs(ms)*SCALE);
  el.sweep.setAttribute('x1', x); el.sweep.setAttribute('x2', x);

  if(!R.freeRun && R.steps[stepIndex].at){
    var w = R.steps[stepIndex].at;
    var h1 = (((anchorBeat+w[0])*vCycle)/stripMs)*W;
    var h2 = (((anchorBeat+w[1])*vCycle)/stripMs)*W;
    el.hi.setAttribute('x', h1);
    el.hi.setAttribute('width', Math.max(2, h2-h1));
  }
  /* which artery is blocked can change from step to step, so the same
     picture can teach both an anterior and an inferior MI */
  if(R.coronaries){
    var occ = (R.occlusions && R.steps[stepIndex].occlude)
            ? R.occlusions[R.steps[stepIndex].occlude] : null;
    if(occ){
      el.territory.style.display = '';
      el.territory.setAttribute('d', occ.territory);
      el.territory.style.opacity = 0.22 + 0.12*Math.abs(Math.sin(uiT/520));
      el.clot.style.display = '';
      el.clotDot.setAttribute('cx', occ.clot[0]);
      el.clotDot.setAttribute('cy', occ.clot[1]);
      el.clotLabel.setAttribute('x', occ.label[0]);
      el.clotLabel.setAttribute('y', occ.label[1]);
      el.clotLabel.textContent = occ.name;
    } else {
      el.territory.style.display = 'none';
      el.clot.style.display = 'none';
    }
  }

  el.pmarks.style.display = R.steps[stepIndex].showMarks ? '' : 'none';

  setText(stepIndex);
}

function setValve(name, open){
  valveEls[name].open.style.opacity = open;
  valveEls[name].shut.style.opacity = 1 - open;
}

function setText(i){
  if(i === shownIndex) return;
  shownIndex = i;
  el.chip.textContent = R.steps[i].chip;
  el.textOut.innerHTML = R.steps[i].html;
  el.count.textContent = (i+1) + ' / ' + R.steps.length;
  [].forEach.call(el.dots.querySelectorAll('i'), function(d,n){
    d.className = n === i ? 'rv-on' : (n < i ? 'rv-done' : '');
  });
}

/* ------------------------------- wavelets and circuits (built once) */
var FIB = [], fibLayer, AFIB = [], circuitLen = 0;
function buildFib(){
  fibLayer = document.createElementNS('http://www.w3.org/2000/svg','g');
  fibLayer.setAttribute('clip-path','url(#rv_ventMass)');
  fibLayer.style.display = 'none';
  var spots = [[368,470],[420,560],[350,540],[470,600],[520,470],[560,540],[590,430],[410,430],
               [480,520],[540,600],[330,430],[620,500]];
  spots.forEach(function(s,i){
    var c = document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('cx',s[0]); c.setAttribute('cy',s[1]); c.setAttribute('r',6);
    c.setAttribute('fill','#FFC93C'); c.setAttribute('opacity',0.6);
    c.style.filter = 'url(#rv_glow)';
    fibLayer.appendChild(c);
    FIB.push({ node:c, per: 90 + (i*37) % 130, ph: (i*2.3) % 6.28 });
  });
  el.elecLayer.appendChild(fibLayer);
}

/* -------------------------------------------------- responsive viewBox */
function fitViewBox(){
  if(!el.heart) return;
  var narrow = el.heart.clientWidth < 560;
  /* viewBoxes cropped to the drawing's real bounds — no wasted margin */
  el.heart.setAttribute('viewBox', narrow ? '186 118 628 566' : '52 46 916 636');
  el.labels.style.display = (narrow || (R && R.hideLabels)) ? 'none' : '';
}

/* ------------------------------------------------------------ controls */
function wireControls(){
  el.next.addEventListener('click', function(){ goStep(stepIndex+1); });
  /* The heart itself is a second Next button. People watch the animation, not
     the button below it, so tapping what they are already looking at moves
     them on. The Next button is unchanged and still does exactly the same. */
  el.heart.addEventListener('click', function(){ goStep(stepIndex+1); });
  el.prev.addEventListener('click', function(){ goStep(stepIndex-1); });
  el.layerToggle.addEventListener('click', function(e){
    var b = e.target.closest('button'); if(!b) return;
    [].forEach.call(el.layerToggle.querySelectorAll('button'), function(x){ x.classList.remove('rv-on'); });
    b.classList.add('rv-on');
    el.heart.classList.toggle('rv-hide-flow', b.getAttribute('data-layer') === 'elec');
    el.heart.classList.toggle('rv-hide-elec', b.getAttribute('data-layer') === 'flow');
  });
  buildFib();
}

return { mount: mount, show: function(k){ if(started) load(k); } };
})();
