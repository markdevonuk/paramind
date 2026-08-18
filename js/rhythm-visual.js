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
            <path class="cseg" data-seg="bundles" d="M 484 412 C 478 470 470 540 462 596" stroke="var(--elec-bright)" stroke-width="6.5"/>
            <path class="cseg" data-seg="bundles" d="M 484 412 C 492 470 498 546 502 606" stroke="var(--elec-bright)" stroke-width="6.5"/>
            <path class="cseg" data-seg="purkinje" d="M 462 596 C 430 590 396 560 372 518 C 348 476 336 434 336 396" stroke="var(--elec-bright)" stroke-width="5"/>
            <path class="cseg" data-seg="purkinje" d="M 502 606 C 534 592 562 558 580 514 C 598 468 602 424 598 394" stroke="var(--elec-bright)" stroke-width="5"/>
          </g>
          <!-- ===== VT only: ectopic focus and its slow cell-to-cell wavefront ===== -->
          <g id="rv_ectopicLayer" style="display:none">
            <g clip-path="url(#rv_ventMass)">
              <circle id="rv_waveFill" cx="604" cy="556" r="0" fill="#FF9F1C" opacity="0.22"/>
              <circle id="rv_waveRing" cx="604" cy="556" r="0" fill="none" stroke="var(--elec-bright)" stroke-width="7" opacity="0.85"/>
            </g>
            <circle id="rv_focusGlow" cx="604" cy="556" r="16" fill="#E8890C" opacity="0.35"/>
            <circle id="rv_focusNode" cx="604" cy="556" r="11" fill="#E8890C" stroke="#fff" stroke-width="3"/>
          </g>
          <!-- ===== VT only: the AV node is bypassed / blocked ===== -->

          <circle id="rv_saNode" cx="330" cy="258" r="13" fill="var(--elec)" stroke="#fff" stroke-width="3"/>
          <circle id="rv_avNode" cx="478" cy="368" r="12" fill="var(--elec)" stroke="#fff" stroke-width="3"/>
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
.rv-head{padding:.9rem 1.1rem;border-bottom:1px solid #E9ECEF;display:flex;flex-wrap:wrap;gap:.75rem;
  align-items:center;justify-content:space-between}
.rv-title{font-weight:700;font-size:1rem;margin:0}
.rv-sub{font-size:.82rem;color:#6C757D;margin:.15rem 0 0}
.rv-layers{display:flex;background:#F1F3F5;border-radius:.5rem;padding:.25rem;gap:.25rem}
.rv-layers button{border:0;background:transparent;font:inherit;font-size:.82rem;font-weight:600;color:#6C757D;
  padding:.45rem .8rem;border-radius:.375rem;cursor:pointer;transition:all 200ms ease;white-space:nowrap}
.rv-layers button.rv-on{background:#fff;color:#2B8A9C;box-shadow:0 1px 2px rgba(0,0,0,.08)}

.rv-stage{padding:.4rem .25rem .1rem;background:#fff;max-width:760px;margin:0 auto}
.rv-heart{display:block;width:100%;height:auto}
.rv-layer{transition:opacity 350ms ease}
.rv-heart.rv-hide-flow .rv-flow{opacity:0}
.rv-heart.rv-hide-elec .rv-elec{opacity:0}

.rv-comm{display:flex;gap:.85rem;align-items:flex-start;padding:.9rem 1.1rem;border-top:1px solid #E9ECEF;
  background:#fff;min-height:104px}
.rv-side{flex:0 0 auto;display:flex;flex-direction:column;gap:.3rem;align-items:center}
.rv-chip{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.7rem;font-weight:600;padding:.32rem .55rem;
  border-radius:.375rem;background:#FFF4E5;color:#8A5A00;min-width:100px;text-align:center}
.rv-count{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.68rem;color:#ADB5BD;font-weight:600}
.rv-text{margin:0;font-size:.95rem;line-height:1.5;color:#495057}
.rv-text b{color:#212529}

.rv-steps{display:flex;align-items:center;gap:1rem;justify-content:space-between;padding:.7rem 1.1rem;
  background:#fff;border-top:1px solid #E9ECEF}
.rv-step-btn{border:1px solid #DEE2E6;background:#fff;color:#495057;font:inherit;font-size:.88rem;font-weight:600;
  padding:.5rem 1.1rem;border-radius:.5rem;cursor:pointer;transition:all 150ms ease}
.rv-step-btn:hover{border-color:#2B8A9C;color:#2B8A9C}
.rv-step-btn.rv-primary{background:#2B8A9C;border-color:#2B8A9C;color:#fff}
.rv-step-btn.rv-primary:hover{background:#237282;border-color:#237282;color:#fff}
.rv-mid{flex:1;display:flex;flex-direction:column;align-items:center;gap:.35rem}
.rv-hint{font-size:.72rem;color:#ADB5BD;text-align:center}
.rv-dots{display:flex;gap:.4rem;justify-content:center}
.rv-dots i{width:9px;height:9px;border-radius:50%;background:#DEE2E6;display:block;transition:all 200ms ease}
.rv-dots i.rv-on{background:#2B8A9C;transform:scale(1.35)}
.rv-dots i.rv-done{background:#2B8A9C;opacity:.4}

.rv-alert{background:#7f1d1d;color:#fff;font-size:.85rem;font-weight:700;padding:.55rem 1.1rem;
  letter-spacing:.02em;display:none}
.rv-monitor{background:#1a1a2e;padding:.75rem 1.1rem 1rem}
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
  .rv-comm{flex-direction:column;gap:.5rem;min-height:0}
  .rv-side{flex-direction:row;gap:.5rem;align-items:center}
  .rv-text{font-size:.9rem}
  .rv-steps{flex-wrap:wrap;gap:.6rem}
  .rv-step-btn{flex:1 1 40%;padding:.6rem .5rem}
  .rv-mid{order:3;flex-basis:100%}
  .rv-head{flex-direction:column;align-items:stretch}
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

var RHYTHMS = [
{
  key:'nsr', name:'Normal Sinus Rhythm', danger:false,
  title:'Normal Sinus Rhythm', sub:'The baseline — everything else is a departure from this.',
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
    {chip:'P wave',    at:[0.000,0.110], html:'<b>The SA node fires.</b> The impulse spreads across both atria — that is the <b>P wave</b>. The atria squeeze the last of the blood down into the ventricles.'},
    {chip:'PR segment',at:[0.110,0.222], html:'<b>The AV node deliberately holds the impulse</b> for about 0.1 s. That pause is what gives the ventricles time to fill — it is the flat line between the P wave and the QRS.'},
    {chip:'PR → QRS',  at:[0.222,0.260], html:'Released. The impulse drops into the <b>bundle of His</b> and splits down the left and right <b>bundle branches</b>.'},
    {chip:'QRS',       at:[0.260,0.340], html:'<b>The Purkinje fibres fire both ventricles almost at once</b> — fast and coordinated, so the QRS is <b>narrow (&lt;0.12 s)</b>. The ventricles contract from the apex upwards.'},
    {chip:'ST segment',at:[0.340,0.440], html:'<b>Ejection.</b> The pulmonary and aortic valves are open — blood leaves for the lungs and the body. This is the pulse you feel.'},
    {chip:'T wave',    at:[0.440,0.660], html:'<b>The ventricles repolarise</b> — resetting electrically, ready to go again. That is the <b>T wave</b>.'},
    {chip:'Diastole',  at:[0.660,1.000], html:'<b>Diastole.</b> Everything relaxes, the AV valves open and the ventricles refill. The coronary arteries get their own blood supply now — which is why a very fast rate is bad news for the heart itself.'}
  ],
  note:null
},

{
  key:'vt', name:'Ventricular Tachycardia', danger:true,
  title:'Ventricular Tachycardia', sub:'One irritable patch of ventricular muscle has taken over.',
  rate:180, beats:7, drive:'ectopic', atrialRate:75,
  squeeze:0.85, fillFactor:0.40, dyssync:0.11,
  pulse:'PULSE: weak or absent', alert:'⚠️ SHOCKABLE IF PULSELESS — always check for a pulse',
  ecg:function(p){ return gauss(p,0.26,0.085,1.00) + gauss(p,0.60,0.090,-0.50); },
  atrialEcg:function(q){ return gauss(q,0.06,0.018,0.11); },
  marks:[[0.26,'WIDE QRS']],
  timing:{ ectopic:[0,0.07], wave:[0.03,0.52], atriaSqueeze:[0.05,0.21],
           ventSqueeze:[0.16,0.62], eject:[0.26,0.56], fill:[[0.00,0.14],[0.74,1.00]] },
  steps:[
    {chip:'Focus fires', at:[0.00,0.10], html:'<b>No SA node involved.</b> A patch of irritable ventricular muscle — often scarred or ischaemic — depolarises on its own, and it does it <b>faster than the SA node</b>, so it takes over the whole heart.'},
    {chip:'Slow spread', at:[0.03,0.52], html:'<b>This is the whole problem.</b> The impulse started in muscle, not in the conducting system, so it has to crawl <b>cell to cell</b> across the ventricles. The Purkinje network — the motorway — is bypassed.'},
    {chip:'Wide QRS',    at:[0.06,0.55], html:'Because depolarisation takes so much longer, the complex is <b>wide (&gt;0.12 s — more than 3 small squares)</b>. Same paper speed as sinus rhythm: switch back and compare the width yourself.'},
    {chip:'Poor squeeze',at:[0.16,0.62], html:'The ventricles are no longer squeezed as one unit — one side is still contracting as the other finishes. An <b>uncoordinated squeeze moves far less blood</b>, even though the muscle is working hard.'},
    {chip:'No filling',  at:[0.74,1.00], html:'At <b>180 bpm there is almost no diastole</b>. The ventricles barely refill before the next beat, and with the atria dissociated there is no atrial kick either. Little blood in means little blood out.'},
    {chip:'AV dissoc.',  at:[0.00,1.00], showMarks:true, html:'<b>The SA node has not stopped</b> — look at it, still firing at its own rate, quite independently. Those P waves are on the strip, buried in the wide complexes (arrowed). That is <b>AV dissociation</b>.'},
    {chip:'Why it kills',at:[0.00,1.00], html:'Fast rate + poor filling + uncoordinated squeeze = <b>stroke volume can collapse</b>. The patient may have a pulse, or none at all — which is why you always check. <b>Pulseless VT is a shockable rhythm.</b>'}
  ],
  note:'<b>Nothing anatomical changed.</b> The ECG changed because the <i>electrical path</i> changed — that is the whole point of these visuals.'
},

{
  key:'vf', name:'Ventricular Fibrillation', danger:true,
  title:'Ventricular Fibrillation', sub:'A cardiac arrest rhythm — no organised activity at all.',
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
    {chip:'Many foci',   html:'<b>Not one focus — countless.</b> Sites all over the ventricular muscle are depolarising at once and re-entering in loops, in no order whatsoever. Watch them: nothing takes charge.'},
    {chip:'No QRS',      html:'With no coordinated depolarisation there is <b>nothing to measure</b>. No P wave, no QRS, no T wave — just a chaotic, irregular waveform of varying amplitude.'},
    {chip:'Quivering',   html:'The ventricles <b>quiver, they do not contract</b>. Individual fibres are shortening at random moments, so the chamber never squeezes as a unit. It looks busy and achieves nothing.'},
    {chip:'No output',   html:'Look at the blood — <b>none of it is moving</b>. No cardiac output, no pulse. The coronary arteries stop being perfused too, so the heart muscle itself deteriorates every second this continues.'},
    {chip:'Shockable',   html:'<b>This is a shockable rhythm.</b> A defibrillation depolarises the whole myocardium at once so every cell is refractory together — which gives the heart&rsquo;s own pacemaker a chance to restart an organised sequence.'}
  ],
  note:'<b>VF and VT sit next to each other for a reason.</b> Both come from the ventricles, both are shockable — the difference is that VT still has an organised (if useless) sequence, and VF has none at all.'
},

{
  key:'asystole', name:'Asystole', danger:true,
  title:'Asystole', sub:'A cardiac arrest rhythm — no electrical activity to speak of.',
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
    {chip:'Nothing fires', html:'<b>Nothing is firing.</b> No SA node, no AV node, no ectopic focus anywhere. Compare it with sinus rhythm — the conducting system is all still there, it is simply silent.'},
    {chip:'No contraction',html:'No electrical signal means <b>no contraction</b>. The muscle has nothing to respond to, so the chambers do not move and no blood goes anywhere.'},
    {chip:'Never flat',    html:'<b>A true flat line is rare.</b> There is nearly always some baseline wander, and occasional <b>agonal complexes</b> — watch the trace and you will see one drift past. That is why you confirm asystole properly rather than trusting one glance.'},
    {chip:'Not shockable', html:'<b>This is a non-shockable rhythm.</b> Defibrillation works by reorganising chaotic electrical activity — here there is no electrical activity to reorganise, so there is nothing for a shock to do.'}
  ],
  note:'<b>Worth knowing:</b> VF left untreated deteriorates into asystole as the myocardium runs out of energy. They are two points on the same decline, which is why the first is shockable and the second is not.'
},

{
  key:'pea', name:'Pulseless Electrical Activity', danger:true,
  title:'Pulseless Electrical Activity (PEA)', sub:'The electrics are working. The pump is not.',
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
    {chip:'Electrics fine', at:[0.000,0.335], html:'<b>Watch the electrical layer — it is completely normal.</b> SA node, the AV node pause, down the bundle branches, out through the Purkinje fibres. Exactly the sequence you saw in sinus rhythm.'},
    {chip:'Looks like a rhythm', at:[0.240,0.400], html:'So the monitor shows <b>organised complexes</b>. P wave, narrow QRS, T wave. On the trace alone you would call this a perfusing rhythm and move on.'},
    {chip:'Pump fails',     at:[0.270,0.600], html:'<b>Now watch the ventricles.</b> The signal arrives, but the muscle barely moves. The electrical instruction is fine — the mechanical response to it is not.'},
    {chip:'No output',      at:[0.320,0.560], html:'So <b>almost no blood moves</b>. Organised electrical activity, no meaningful cardiac output, <b>no pulse</b>.'},
    {chip:'Clinical, not ECG', at:[0.660,1.000], html:'<b>PEA cannot be diagnosed from the monitor</b> — the monitor looks reassuring. The only way to find it is to <b>feel for a pulse</b>. Non-shockable, and the priority is finding the reversible cause.'}
  ],
  note:'<b>This is why we say "treat the patient, not the monitor".</b> PEA is the one arrest rhythm where the screen actively misleads you.'
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
  var beatMs    = 60000 / o.atrialRate;
  var patternMs = o.beats.length * beatMs;
  var F  = function(ms){ return ms / patternMs; };
  var qw = o.qrsWidth || 9;

  var atriaDepol = [], atriaSq = [], avHold = [], his = [], bundles = [],
      purkinje = [], ventSq = [], eject = [], fill = [], blocked = [], marks = [];
  var through = 0;

  o.beats.forEach(function(b, i){
    var t0 = i * beatMs, pr = b.pr * 1000;
    atriaDepol.push([F(t0),      F(t0 + 90)]);
    atriaSq.push(   [F(t0 + 40), F(t0 + 200)]);
    if(b.conducted){
      through++;
      avHold.push(  [F(t0 + 90),      F(t0 + pr - 40)]);
      his.push(     [F(t0 + pr - 40), F(t0 + pr + 10)]);
      bundles.push( [F(t0 + pr - 20), F(t0 + pr + 40)]);
      purkinje.push([F(t0 + pr + 20), F(t0 + pr + 110)]);
      ventSq.push(  [F(t0 + pr + 40), F(t0 + pr + 360)]);
      eject.push(   [F(t0 + pr + 110), F(t0 + pr + 320)]);
      fill.push(    [F(t0 + pr + 380), F(t0 + pr + 380 + beatMs * 0.45)]);
    } else {
      avHold.push( [F(t0 + 90),  F(t0 + 250)]);
      blocked.push([F(t0 + 250), F(t0 + beatMs * 0.92)]);
      marks.push([t0 + 45, 'no QRS']);
    }
  });

  var vRate = Math.round(through * 60000 / patternMs);

  return {
    key:o.key, name:o.name, title:o.title, sub:o.sub, danger:!!o.danger,
    rate:vRate, cycleMs:patternMs, drive:'sinus', atrialRate:null,
    squeeze:1, fillFactor:1, dyssync:0,
    pulse:'PULSE: ' + vRate + ' — atria firing at ' + o.atrialRate,
    alert:o.alert || null,
    marksMs:marks,
    ecgTime:function(ms){
      var m = ((ms % patternMs) + patternMs) % patternMs, mv = 0, k, mm;
      for(k = -1; k <= 1; k++){
        mm = m + k * patternMs;
        o.beats.forEach(function(b, i){
          var t0 = i * beatMs, pr = b.pr * 1000;
          mv += gauss(mm, t0 + 45, 16, 0.16);                 /* P wave */
          if(b.conducted){
            mv += gauss(mm, t0 + pr + 22, qw * 0.8, -0.09);   /* Q */
            mv += gauss(mm, t0 + pr + 42, qw,        1.00);   /* R */
            mv += gauss(mm, t0 + pr + 70, qw,       -0.24);   /* S */
            mv += gauss(mm, t0 + pr + 300, 44,       0.30);   /* T */
          }
        });
      }
      return mv;
    },
    marks:[],
    timing:{ atriaDepol:atriaDepol, avDelay:avHold, his:his, bundles:bundles,
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
    {chip:'Fresh', atMs:[0,420], html:'<b>Beat one — the doorman is fresh.</b> The first message goes through quickly. Normal PR interval, nothing to see yet.'},
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
    {chip:'Rock steady', atMs:[0,520], html:'<b>Watch the gap before the QRS.</b> The doorman here is not tiring — every message that gets through takes <b>exactly the same time</b>. The PR interval is constant.'},
    {chip:'Steady again', atMs:[800,1320], html:'<b>Identical again.</b> No stretching, no build-up, nothing to warn you. If you were only watching the PR interval you would think everything was fine.'},
    {chip:'Then nothing', atMs:[1600,2400], showMarks:true, html:'<b>And then a beat simply vanishes.</b> A P wave arrives and no QRS follows it — with no change in the PR beforehand. It came out of nowhere.'},
    {chip:'Why it differs', atMs:[0,2400], html:'<b>The doorman is fine. The floor beyond him is not.</b> The fault sits <i>below</i> the AV node, in the bundle branches — like floorboards that hold, and hold, and then one gives way with no creak first. That is also why these QRS complexes often look <b>wider</b> than normal.'},
    {chip:'The danger', atMs:[0,2400], html:'Because nothing builds up to it, there is <b>no warning before it gets worse</b>. Mobitz II can go from dropping the occasional beat to blocking everything. It is treated far more seriously than Mobitz I.'}
  ],
  note:'<b>Mobitz I stretches before it drops. Mobitz II just drops.</b> That single difference is why one is watched and the other is worried about.'
}));

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
    {chip:'Door locked', at:[0.00,1.00], showMarks:true, html:'<b>But nothing gets through.</b> Not slow like first degree, not intermittent like Mobitz — the doorway is shut and <b>locked</b>. Every single message from the atria stops dead at the AV node.'},
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
var phase = 0, atrialPhase = 0, freeT = 0, fade = {}, flashSpan = 0.1;
var speed = 0.35, stepIndex = 0, anim = null, last = 0, shownIndex = -1, started = false;

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
    '</div>' +
    '<div class="rv-stage">' + SVG_MARKUP + '</div>' +
    '<div class="rv-comm">' +
      '<div class="rv-side"><span class="rv-chip" id="rv_chip">—</span><span class="rv-count" id="rv_count"></span></div>' +
      '<p class="rv-text" id="rv_textOut"></p>' +
    '</div>' +
    '<div class="rv-steps">' +
      '<button class="rv-step-btn" id="rv_prev">‹ Back</button>' +
      '<div class="rv-mid"><div class="rv-dots" id="rv_dots"></div>' +
        '<span class="rv-hint">replaying — press Next when ready</span></div>' +
      '<button class="rv-step-btn rv-primary" id="rv_next">Next ›</button>' +
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
   'focusName','focusSub','blockName']
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
  /* Normal Sinus Rhythm sits first — it is the reference every other
     rhythm is compared against. */
  el.select.innerHTML = RHYTHMS.map(function(r){
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
  stripMs = PAPER_MS;
  anchorBeat = R.freeRun ? 0 : Math.max(0, Math.floor((PAPER_MS / vCycle) / 2));

  el.subtitle.textContent = R.sub;
  el.hr.textContent       = R.rate ? R.rate : '--';
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
  el.ectopicLayer.style.display = ect ? '' : 'none';
  el.avBlock.style.display      = (ect || hasBlock) ? '' : 'none';
  el.vtLabels.style.display     = ect ? '' : 'none';
  if(R.labels){
    el.focusName.textContent = R.labels.focus;
    el.focusSub.textContent  = R.labels.focusSub;
    el.blockName.textContent = R.labels.block;
  }
  el.lblAv.style.display        = ect ? 'none' : '';
  el.lblHis.style.opacity  = (R.drive === 'sinus') ? 1 : 0.32;
  el.lblPurk.style.opacity = (R.drive === 'sinus') ? 1 : 0.32;

  /* fades are authored in milliseconds so they look the same at any rate */
  fade = { atria:260/vCycle, his:150/vCycle, bundles:150/vCycle, purkinje:190/vCycle };
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

  draw();
  requestAnimationFrame(loop);
}

function draw(){
  var p = phase, T = R.timing, i;

  /* ---------------- electrical ---------------- */
  if(R.drive === 'sinus'){
    var WIN = { atria:T.atriaDepol, his:T.his, bundles:T.bundles, purkinje:T.purkinje };
    segs.forEach(function(s){
      var st = segState(p, WIN[s.seg], fade[s.seg]);
      s.el.style.strokeDashoffset = s.len * (1 - st.drawn);
      s.el.style.opacity = st.op;
      s.el.style.filter = st.op > 0.15 ? 'url(#rv_glow)' : 'none';
    });
    var sa = pulseW(p, T.atriaDepol, flashSpan);
    el.saNode.setAttribute('r', 13 + sa*7);
    el.saNode.setAttribute('fill', sa > 0.1 ? '#FFC93C' : '#E8890C');
    el.saNode.style.filter = sa > 0.1 ? 'url(#rv_glow)' : 'none';

    var hold = inAnyW(p, T.avDelay), fire = inAnyW(p, T.his), stuck = inAnyW(p, T.blocked);
    el.avNode.setAttribute('r', fire ? 18 : 12);
    el.avNode.setAttribute('fill', stuck ? '#C0392B' : ((hold||fire) ? '#FFC93C' : '#E8890C'));
    el.avNode.style.filter = (hold||fire||stuck) ? 'url(#rv_glow)' : 'none';
    el.avNode.style.opacity = 1;
    el.avBlock.style.opacity = stuck ? 1 : 0;      /* the red cross on a dropped beat */

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

/* --------------------------------------------- VF wavelets (built once) */
var FIB = [], fibLayer;
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
  el.labels.style.display = narrow ? 'none' : '';
}

/* ------------------------------------------------------------ controls */
function wireControls(){
  el.next.addEventListener('click', function(){ goStep(stepIndex+1); });
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
