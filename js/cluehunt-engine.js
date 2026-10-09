/* ==================== CLUE HUNT ENGINE ====================
 * Paramind — Clue Hunt (Pro)
 *
 * Draws an illustrated patient from a case description, runs the
 * examination game, and shows the debrief. Case content lives in
 * js/cluehunt-cases.js — this file contains no clinical content.
 *
 * Used by: cluehunt-new.html (Pro, behind pro-guard.js)
 * The free single case (cluehunt-free.html) is separate and does not use this file.
 */
(function () {
'use strict';

/* ---------- small helpers ---------- */
/* random order, so the correct answer isn't always in the same place */
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt = s => String(Math.floor(s/60)).padStart(2,'0') + ':' + String(s%60).padStart(2,'0');
function rgb(h){ h=h.replace('#',''); return [0,2,4].map(i=>parseInt(h.substr(i,2),16)); }
function mix(a,b,t){ const A=rgb(a),B=rgb(b); return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join(''); }
function store(){ try { return JSON.parse(localStorage.getItem('paramind_cluehunt_best') || '{}'); } catch(e){ return {}; } }
function saveBest(id, pct){ try { const b=store(); if(!(b[id]>=pct)){ b[id]=pct; localStorage.setItem('paramind_cluehunt_best', JSON.stringify(b)); } } catch(e){} }

/* ==================== SCENES ==================== */
const SCENES = {
  lounge_eve(){ return `
    <defs><radialGradient id="chGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd98a" stop-opacity=".5"/><stop offset="1" stop-color="#ffd98a" stop-opacity="0"/></radialGradient>
    <linearGradient id="chDusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f3d6e"/><stop offset="1" stop-color="#c98a5a"/></linearGradient></defs>
    <rect width="400" height="460" fill="#4a5a6e"/>
    <g fill="#ffffff" opacity=".05">${[10,58,106,154,202,250,298,346].map(x=>`<rect x="${x}" width="16" height="372"/>`).join('')}</g>
    <rect y="372" width="400" height="88" fill="#5a4636"/><rect y="368" width="400" height="8" fill="#6a7684"/>
    <rect x="296" y="36" width="90" height="130" rx="4" fill="#6a7684"/><rect x="302" y="42" width="78" height="118" fill="url(#chDusk)"/>
    <rect x="339" y="42" width="4" height="118" fill="#6a7684"/>
    <path d="M284 30 C292 70 288 120 296 176 L282 176 C276 120 280 70 274 30 Z" fill="#8a5a4a"/>
    <circle cx="58" cy="140" r="96" fill="url(#chGlow)"/><rect x="56" y="118" width="4" height="252" fill="#2a2a2a"/>
    <ellipse cx="58" cy="370" rx="22" ry="5" fill="#2a2a2a"/><path d="M32 120 L84 120 L74 88 L42 88 Z" fill="#e6c27a"/>
    <ellipse cx="200" cy="432" rx="172" ry="22" fill="#6b4f3a"/>`; },

  kitchen_day(){ return `
    <rect width="400" height="460" fill="#ece5d6"/>
    <g stroke="#d9d0bd" stroke-width="1">${[130,150,170,190,210].map(y=>`<line x1="0" y1="${y}" x2="400" y2="${y}"/>`).join('')}${[20,40,60,80,100,300,320,340,360,380].map(x=>`<line x1="${x}" y1="120" x2="${x}" y2="220"/>`).join('')}</g>
    <rect x="0" y="16" width="104" height="96" fill="#7d9b8f"/><rect x="6" y="22" width="44" height="84" fill="#88a89b"/><rect x="54" y="22" width="44" height="84" fill="#88a89b"/>
    <rect x="300" y="36" width="90" height="120" rx="4" fill="#ffffff"/><rect x="306" y="42" width="78" height="108" fill="#a9d6ef"/><circle cx="364" cy="66" r="11" fill="#ffe08a"/><ellipse cx="330" cy="120" rx="22" ry="8" fill="#ffffff" opacity=".8"/>
    <rect x="0" y="222" width="108" height="150" fill="#8c6b4f"/><rect x="0" y="216" width="112" height="10" fill="#d9cdb6"/>
    <rect x="30" y="196" width="18" height="22" rx="3" fill="#c0504d"/><rect x="0" y="372" width="400" height="88" fill="#d6ccb8"/>
    <g stroke="#c4b9a2" stroke-width="2">${[60,140,220,300,380].map(x=>`<line x1="${x}" y1="372" x2="${x-30}" y2="460"/>`).join('')}<line x1="0" y1="410" x2="400" y2="410"/></g>`; },

  office_day(){ return `
    <rect width="400" height="460" fill="#dfe5ea"/>
    <rect x="296" y="36" width="94" height="140" rx="3" fill="#ffffff"/><rect x="302" y="42" width="82" height="128" fill="#bfe0f2"/>
    <g stroke="#e9eef2" stroke-width="5">${[50,62,74,86,98,110,122,134,146,158].map(y=>`<line x1="302" y1="${y}" x2="384" y2="${y}"/>`).join('')}</g>
    <rect x="0" y="372" width="400" height="88" fill="#55606c"/><rect y="368" width="400" height="6" fill="#c8d0d6"/>
    <rect x="0" y="250" width="112" height="14" fill="#b08a64"/><rect x="8" y="264" width="10" height="108" fill="#8e6c4c"/><rect x="92" y="264" width="10" height="108" fill="#8e6c4c"/>
    <rect x="10" y="168" width="86" height="62" rx="4" fill="#2c333b"/><rect x="15" y="173" width="76" height="52" fill="#4d7a92"/><rect x="48" y="230" width="10" height="20" fill="#2c333b"/>
    <rect x="22" y="240" width="60" height="8" rx="2" fill="#e5e5e5"/>`; },

  restaurant_eve(){ return `
    <defs><radialGradient id="chPend" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd27a" stop-opacity=".55"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient></defs>
    <rect width="400" height="460" fill="#7a423b"/><rect y="236" width="400" height="136" fill="#55302a"/><rect y="232" width="400" height="6" fill="#8e5a4e"/>
    <circle cx="70" cy="70" r="90" fill="url(#chPend)"/><line x1="70" y1="0" x2="70" y2="46" stroke="#2a1a16" stroke-width="2"/><path d="M50 62 Q70 38 90 62 Z" fill="#c9a44a"/>
    <rect x="300" y="60" width="72" height="56" fill="#e3c27a"/><rect x="306" y="66" width="60" height="44" fill="#6f8a6b"/>
    <rect x="0" y="372" width="400" height="88" fill="#3d2b22"/>
    <rect x="0" y="262" width="118" height="12" fill="#f4f1ea"/><path d="M0 274 L118 274 L112 330 L0 330 Z" fill="#ebe6dc"/>
    <ellipse cx="62" cy="262" rx="30" ry="6" fill="#ffffff"/><ellipse cx="62" cy="261" rx="16" ry="3" fill="#c98a4a"/><rect x="100" y="236" width="6" height="26" fill="#cfe7ef" opacity=".8"/>`; },

  lounge_day(){ return `
    <rect width="400" height="460" fill="#d9cfbf"/>
    <g fill="#ffffff" opacity=".12">${[10,58,106,154,202,250,298,346].map(x=>`<rect x="${x}" width="16" height="372"/>`).join('')}</g>
    <rect x="296" y="36" width="90" height="130" rx="4" fill="#ffffff"/><rect x="302" y="42" width="78" height="118" fill="#a9d6ef"/>
    <ellipse cx="326" cy="80" rx="18" ry="7" fill="#ffffff" opacity=".85"/><ellipse cx="358" cy="118" rx="14" ry="5" fill="#ffffff" opacity=".7"/>
    <rect x="339" y="42" width="4" height="118" fill="#ffffff"/>
    <path d="M284 30 C292 70 288 120 296 176 L282 176 C276 120 280 70 274 30 Z" fill="#8a9a6a"/>
    <rect x="30" y="318" width="40" height="54" rx="6" fill="#b5654a"/><g fill="#5f8a4f"><ellipse cx="50" cy="300" rx="26" ry="20"/><ellipse cx="36" cy="282" rx="12" ry="22"/><ellipse cx="64" cy="280" rx="12" ry="24"/></g>
    <rect y="372" width="400" height="88" fill="#7a5c44"/><rect y="368" width="400" height="8" fill="#efe8dc"/>
    <ellipse cx="200" cy="432" rx="172" ry="22" fill="#a0614a"/>`; },

  hallway_day(){ return `
    <rect width="400" height="460" fill="#e3dccf"/>
    <rect x="270" y="20" width="100" height="210" fill="#b08a64"/><rect x="278" y="28" width="84" height="202" fill="#c49c74"/><circle cx="350" cy="130" r="5" fill="#d9c27a"/>
    <rect x="60" y="50" width="70" height="54" fill="#8a6a4a"/><rect x="66" y="56" width="58" height="42" fill="#a9c6b8"/>
    <rect x="150" y="150" width="90" height="56" rx="6" fill="#f2f2f2"/><g stroke="#d6d6d6" stroke-width="3">${[160,172,184,196,208,220,232].map(x=>`<line x1="${x}" y1="154" x2="${x}" y2="202"/>`).join('')}</g>
    <rect y="226" width="400" height="10" fill="#f4efe6"/><rect y="236" width="400" height="224" fill="#8a6a4f"/>
    <g stroke="#7a5c44" stroke-width="2">${[262,292,322,352,382,412,442].map(y=>`<line x1="0" y1="${y}" x2="400" y2="${y}"/>`).join('')}</g>
    <path d="M10 262 L392 270 L398 432 L340 426 Q320 418 300 430 L4 424 Z" fill="#8a3f3a"/><path d="M24 274 L380 282 L384 416 L20 412 Z" fill="none" stroke="#b5654a" stroke-width="3"/>`; },

  bedroom_day(){ return `
    <rect width="400" height="460" fill="#c9d3dc"/>
    <rect x="40" y="40" width="60" height="80" fill="#e28a5a"/><rect x="120" y="54" width="54" height="70" fill="#5a8ac9"/><rect x="300" y="30" width="80" height="110" rx="3" fill="#ffffff"/><rect x="306" y="36" width="68" height="98" fill="#bfe0f2"/>
    <rect x="0" y="150" width="150" height="80" rx="6" fill="#4a5a7a"/><rect x="0" y="140" width="70" height="24" rx="10" fill="#f4f2ee"/>
    <rect y="226" width="400" height="10" fill="#eef1f4"/><rect y="236" width="400" height="224" fill="#6a6f7a"/>
    <rect x="300" y="196" width="70" height="40" rx="4" fill="#3a3f4a"/><rect x="306" y="186" width="16" height="10" fill="#e9e9e9"/>`; },

  lounge_cold(){ return `
    <rect width="400" height="460" fill="#5d6a78"/>
    <g fill="#ffffff" opacity=".04">${[10,58,106,154,202,250,298,346].map(x=>`<rect x="${x}" width="16" height="372"/>`).join('')}</g>
    <rect x="296" y="36" width="90" height="130" rx="4" fill="#7a8794"/><rect x="302" y="42" width="78" height="118" fill="#c9d6e2"/>
    <g fill="#ffffff" opacity=".7"><circle cx="312" cy="150" r="10"/><circle cx="372" cy="146" r="12"/><circle cx="318" cy="52" r="8"/><circle cx="368" cy="56" r="9"/></g>
    <rect x="339" y="42" width="4" height="118" fill="#7a8794"/>
    <rect x="18" y="220" width="70" height="152" fill="#8a7a6a"/><rect x="30" y="250" width="46" height="70" fill="#2a2a2a"/><rect x="10" y="212" width="86" height="12" fill="#a08a74"/>
    <rect y="372" width="400" height="88" fill="#4e4a46"/><rect y="368" width="400" height="8" fill="#7a8794"/>
    <ellipse cx="200" cy="432" rx="172" ry="22" fill="#5e5a54"/>`; },

  shop_day(){ return `
    <rect width="400" height="460" fill="#e6e9ec"/><rect y="0" width="400" height="26" fill="#c0392b"/><rect x="24" y="6" width="120" height="14" rx="3" fill="#f4d03f"/>
    <g>${[60,120,180].map(y=>`<rect x="0" y="${y}" width="104" height="8" fill="#b0b8c0"/>`).join('')}
    ${[[8,60,'#e67e22'],[30,60,'#3498db'],[54,60,'#27ae60'],[78,60,'#e74c3c'],[10,120,'#9b59b6'],[36,120,'#f1c40f'],[62,120,'#1abc9c'],[84,120,'#e67e22'],[12,180,'#3498db'],[40,180,'#e74c3c'],[66,180,'#27ae60']].map(([x,y,c],i)=>`<rect x="${x}" y="${y-22-i%3*4}" width="18" height="${22+i%3*4}" fill="${c}"/>`).join('')}</g>
    <rect x="290" y="150" width="110" height="222" fill="#8a9aa8"/><rect x="290" y="140" width="110" height="14" fill="#5d6d7a"/><rect x="300" y="60" width="90" height="78" fill="#dfeef6" opacity=".7"/>
    <rect y="372" width="400" height="88" fill="#b9b0a2"/><g stroke="#a89f90" stroke-width="2">${[60,140,220,300,380].map(x=>`<line x1="${x}" y1="372" x2="${x-30}" y2="460"/>`).join('')}</g>`; },

  warehouse_day(){ return `
    <rect width="400" height="460" fill="#cfd4d8"/>
    <g fill="#3f6fa8">${[0,96,300].map(x=>`<rect x="${x}" y="30" width="8" height="342"/><rect x="${x+88}" y="30" width="8" height="342"/>`).join('')}</g>
    <g fill="#e67e22">${[0,96,300].map(x=>[90,190,290].map(y=>`<rect x="${x}" y="${y}" width="96" height="6"/>`).join('')).join('')}</g>
    <g fill="#c49a6c">${[[8,48],[46,58],[104,52],[140,62],[310,46],[348,56],[10,148],[52,156],[110,150],[308,150],[346,158],[14,250],[106,252],[318,248]].map(([x,y])=>`<rect x="${x}" y="${y+4}" width="34" height="36" fill="#c49a6c" stroke="#a87e52" stroke-width="2"/>`).join('')}</g>
    <rect y="372" width="400" height="88" fill="#9aa0a6"/><rect y="400" width="400" height="8" fill="#f1c40f"/>`; },

  party_night(){ return `
    <rect width="400" height="460" fill="#3a2a4a"/>
    <path d="M0 40 Q100 70 200 40 T400 40" stroke="#5a4a6a" stroke-width="2" fill="none"/>
    <g>${[20,60,100,140,180,220,260,300,340,380].map((x,i)=>`<circle cx="${x}" cy="${46+Math.sin(i)*8}" r="5" fill="${['#ffd27a','#ff8ab0','#8ad8ff','#b0ff8a'][i%4]}" opacity=".9"/>`).join('')}</g>
    <ellipse cx="40" cy="140" rx="22" ry="28" fill="#e05a8a"/><path d="M40 168 Q44 200 36 240" stroke="#c0c0c0" stroke-width="1.5" fill="none"/>
    <ellipse cx="360" cy="120" rx="20" ry="26" fill="#5ab0e0"/><path d="M360 146 Q356 180 364 220" stroke="#c0c0c0" stroke-width="1.5" fill="none"/>
    <rect x="290" y="250" width="110" height="122" fill="#2a1e36"/><rect x="300" y="232" width="12" height="20" fill="#8a3a4a"/><rect x="320" y="226" width="8" height="26" fill="#5a8a5a" opacity=".85"/>
    <rect y="372" width="400" height="88" fill="#2e2438"/>`; },

  gym_day(){ return `
    <rect width="400" height="460" fill="#dde2e6"/><rect x="0" y="40" width="400" height="190" fill="#c9d6de"/>
    <g stroke="#e9f0f4" stroke-width="2" opacity=".8">${[60,160,260,360].map(x=>`<line x1="${x}" y1="40" x2="${x-40}" y2="230"/>`).join('')}</g>
    <rect x="0" y="230" width="400" height="6" fill="#7a8794"/>
    <rect x="300" y="250" width="96" height="10" fill="#4a4a4a"/><rect x="300" y="300" width="96" height="10" fill="#4a4a4a"/>
    <g fill="#2a2a2a">${[310,334,358,382].map(x=>`<rect x="${x-8}" y="236" width="16" height="14" rx="4"/><rect x="${x-8}" y="286" width="16" height="14" rx="4"/>`).join('')}</g>
    <rect x="300" y="250" width="6" height="122" fill="#4a4a4a"/><rect x="390" y="250" width="6" height="122" fill="#4a4a4a"/>
    <rect x="12" y="330" width="80" height="10" rx="4" fill="#6a6a6a"/><circle cx="12" cy="335" r="16" fill="#2a2a2a"/><circle cx="92" cy="335" r="16" fill="#2a2a2a"/>
    <rect y="372" width="400" height="88" fill="#2e3236"/>`; },

  street_night(){ return `
    <rect width="400" height="460" fill="#1c2236"/>
    <rect x="0" y="40" width="250" height="300" fill="#4a3a2e"/><rect x="18" y="80" width="200" height="120" fill="#e8b45a"/><g stroke="#4a3a2e" stroke-width="4"><line x1="118" y1="80" x2="118" y2="200"/><line x1="18" y1="140" x2="218" y2="140"/></g>
    <rect x="20" y="50" width="196" height="22" fill="#2a4a2a"/><rect x="60" y="56" width="116" height="10" fill="#d9c27a"/>
    <rect x="234" y="230" width="40" height="110" fill="#2a2016"/>
    <rect x="330" y="60" width="6" height="312" fill="#3a3f4a"/><path d="M333 60 Q333 44 350 44 L366 44" stroke="#3a3f4a" stroke-width="6" fill="none"/><circle cx="366" cy="52" r="9" fill="#ffe8a0"/>
    <circle cx="366" cy="60" r="60" fill="#ffe8a0" opacity=".08"/>
    <rect y="340" width="400" height="34" fill="#6a6e76"/><rect y="372" width="400" height="88" fill="#3a3d44"/><rect y="370" width="400" height="6" fill="#8a8e96"/>`; },

  race_day(){ return `
    <rect width="400" height="236" fill="#9fd0ef"/><ellipse cx="80" cy="50" rx="30" ry="10" fill="#ffffff" opacity=".8"/><ellipse cx="300" cy="80" rx="40" ry="12" fill="#ffffff" opacity=".7"/>
    <rect x="30" y="40" width="10" height="196" fill="#c0392b"/><rect x="360" y="40" width="10" height="196" fill="#c0392b"/>
    <rect x="30" y="40" width="340" height="40" fill="#c0392b"/><rect x="120" y="50" width="160" height="20" rx="4" fill="#ffffff"/><rect x="150" y="56" width="100" height="8" fill="#c0392b"/>
    <g fill="#d9dde2">${[0,70,140,210,280,350].map(x=>`<rect x="${x}" y="180" width="60" height="40" rx="4" stroke="#aab0b8" stroke-width="2"/>`).join('')}</g>
    <rect y="236" width="400" height="224" fill="#6aa84f"/><g stroke="#5a9a42" stroke-width="3">${[270,310,350,390,430].map(y=>`<line x1="0" y1="${y}" x2="400" y2="${y}"/>`).join('')}</g>`; },

  bedroom_night(){ return `
    <defs><radialGradient id="chBed" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe2a0" stop-opacity=".45"/><stop offset="1" stop-color="#ffe2a0" stop-opacity="0"/></radialGradient></defs>
    <rect width="400" height="460" fill="#3e3c5a"/>
    <rect x="300" y="40" width="84" height="122" rx="3" fill="#5a5878"/><rect x="306" y="46" width="72" height="110" fill="#151d34"/><circle cx="356" cy="76" r="9" fill="#e9edf2"/>
    <path d="M292 34 C298 80 294 130 300 176 L288 176 C284 130 288 80 282 34 Z" fill="#7a6a8a"/>
    <circle cx="40" cy="214" r="80" fill="url(#chBed)"/><rect x="20" y="212" width="40" height="8" fill="#e8d6a8"/><path d="M26 212 L54 212 L48 190 L32 190 Z" fill="#f2e2b4"/>
    <rect x="0" y="236" width="124" height="96" rx="8" fill="#9aaccc"/><rect x="0" y="228" width="80" height="22" rx="10" fill="#f4f2ee"/><rect x="0" y="300" width="124" height="72" fill="#7d8fb2"/>
    <rect x="0" y="372" width="400" height="88" fill="#4a4058"/>`; }
};

/* ==================== CHAIRS ==================== */
function chairSVG(style, col){
  const c2 = mix(col,'#ffffff',.12), c3 = mix(col,'#000000',.15);
  if(style==='armchair') return `
    <rect x="118" y="58" width="164" height="252" rx="34" fill="${col}"/><rect x="132" y="72" width="136" height="220" rx="26" fill="${c2}"/>
    <rect x="92" y="200" width="54" height="132" rx="20" fill="${c2}"/><rect x="254" y="200" width="54" height="132" rx="20" fill="${c2}"/>
    <rect x="108" y="316" width="184" height="54" rx="10" fill="${c3}"/><rect x="122" y="370" width="10" height="10" fill="#3a2c22"/><rect x="268" y="370" width="10" height="10" fill="#3a2c22"/>`;
  if(style==='dining') return `
    <rect x="140" y="112" width="12" height="190" rx="4" fill="${col}"/><rect x="248" y="112" width="12" height="190" rx="4" fill="${col}"/>
    <rect x="136" y="108" width="128" height="22" rx="8" fill="${c2}"/>
    <rect x="128" y="290" width="144" height="22" rx="6" fill="${c2}"/>
    <rect x="132" y="312" width="12" height="62" fill="${c3}"/><rect x="256" y="312" width="12" height="62" fill="${c3}"/>`;
  if(style==='bench') return `
    <rect x="96" y="294" width="208" height="20" rx="6" fill="${col}"/><rect x="96" y="312" width="208" height="6" fill="${c3}"/>
    <rect x="110" y="318" width="10" height="56" fill="${c3}"/><rect x="280" y="318" width="10" height="56" fill="${c3}"/>`;
  /* office */
  return `
    <rect x="136" y="84" width="128" height="214" rx="32" fill="${col}"/><rect x="146" y="96" width="108" height="190" rx="26" fill="${c2}"/>
    <rect x="126" y="286" width="148" height="30" rx="12" fill="${col}"/><rect x="195" y="316" width="10" height="44" fill="#9aa3ad"/>
    <path d="M200 360 L140 374 M200 360 L260 374 M200 360 L200 380" stroke="#6b737c" stroke-width="7" stroke-linecap="round"/>
    <circle cx="140" cy="376" r="5" fill="#2b2f35"/><circle cx="260" cy="376" r="5" fill="#2b2f35"/><circle cx="200" cy="382" r="5" fill="#2b2f35"/>`;
}

/* ==================== PATIENT (seated) ==================== */
const ARM = {
  knee:  {L:['M150 192 L133 256 L160 308',[163,314]], R:['M250 192 L267 256 L240 308',[237,314]]},
  drop:  {L:['M150 192 L128 252 L118 306',[117,314]], R:['M250 192 L272 252 L282 306',[283,314]]},
  chest: {L:['M150 192 L146 250 L186 230',[192,228]], R:['M250 192 L254 250 L214 230',[208,228]]},
  throat:{L:['M150 192 L148 238 L182 178',[190,170]], R:['M250 192 L252 238 L218 178',[210,170]]},
  tummy: {L:['M150 192 L140 250 L172 276',[178,278]], R:['M250 192 L260 250 L228 276',[222,278]]},
  flank: {L:['M150 192 L132 236 L148 262',[152,266]], R:['M250 192 L268 236 L252 262',[248,266]]}
};
const HIVES = [[178,140],[214,150],[196,162],[171,116],[230,118],[188,186],[212,190]];
const HIVES_ARM = [[140,262],[148,284],[260,262],[252,284],[135,240],[265,240]];
const MOTTLE = [[168,340],[178,356],[168,372],[220,344],[230,362],[218,378],[172,388],[228,390]];

function hairBackSVG(P, hair){
  if(P.hair==='curly') return `<g fill="${hair}">${[[200,60,30],[166,72,24],[234,72,24],[154,104,22],[246,104,22],[158,136,20],[242,136,20],[200,50,22]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>`;
  if(P.hair==='long') return `<path d="M158 94 C152 50 248 50 242 94 L250 176 Q200 190 150 176 Z" fill="${hair}"/>`;
  return '';
}

function headSVG(P, skin, shade, ear, lip, hair){
  let s = '';
  s += `<ellipse cx="164" cy="104" rx="7" ry="11" fill="${ear}"/><ellipse cx="236" cy="104" rx="7" ry="11" fill="${ear}"/>`;
  s += `<ellipse cx="200" cy="98" rx="36" ry="42" fill="${skin}"/>`;
  if(P.hair==='bald') s += `<path d="M165 104 C160 74 172 60 184 58 C176 70 172 84 172 104 Z" fill="${hair}"/><path d="M235 104 C240 74 228 60 216 58 C224 70 228 84 228 104 Z" fill="${hair}"/>`;
  if(P.hair==='short' || P.hair==='bun') s += `<path d="M163 102 C158 64 178 52 200 52 C222 52 242 64 237 102 C232 84 220 72 200 72 C180 72 168 84 163 102 Z" fill="${hair}"/>`;
  if(P.hair==='bun') s += `<circle cx="200" cy="50" r="13" fill="${hair}"/>`;
  if(P.hair==='long') s += `<path d="M162 104 C156 62 178 50 200 50 C222 50 244 62 238 104 C232 82 220 70 204 74 C196 70 180 72 170 86 C166 92 164 98 162 104 Z" fill="${hair}"/>`;
  if(P.hair==='curly') s += `<g fill="${hair}"><circle cx="180" cy="62" r="14"/><circle cx="200" cy="58" r="15"/><circle cx="220" cy="62" r="14"/><circle cx="168" cy="78" r="10"/><circle cx="232" cy="78" r="10"/></g>`;
  /* brows */
  const bc = P.hair==='bald' || P.hair==='bun' ? '#9aa0a6' : mix(hair,'#000000',.1);
  const bw = P.sex==='f' ? 2.2 : 3;
  if(P.face==='pain') s += `<path d="M179 89 L194 92" stroke="${bc}" stroke-width="${bw}" stroke-linecap="round"/><path d="M221 89 L206 92" stroke="${bc}" stroke-width="${bw}" stroke-linecap="round"/>`;
  else if(P.signs.droop) s += `<path d="M179 92 L193 89" stroke="${bc}" stroke-width="${bw}" stroke-linecap="round"/><path d="M221 89 L207 88" stroke="${bc}" stroke-width="${bw}" stroke-linecap="round"/>`;
  else s += `<path d="M179 91 L193 86" stroke="${bc}" stroke-width="${bw}" stroke-linecap="round"/><path d="M221 91 L207 86" stroke="${bc}" stroke-width="${bw}" stroke-linecap="round"/>`;
  /* eyes */
  if(P.eyes==='closed') s += `<path d="M183 100 Q187 103 191 100" stroke="#2a2a2a" stroke-width="2" fill="none"/><path d="M209 100 Q213 103 217 100" stroke="#2a2a2a" stroke-width="2" fill="none"/>`;
  else {
    s += `<circle cx="187" cy="99" r="3.2" fill="#2a2a2a"/><circle cx="213" cy="99" r="3.2" fill="#2a2a2a"/>`;
    if(P.eyes==='half') s += `<rect x="182" y="93" width="10" height="5" fill="${skin}"/><rect x="208" y="93" width="10" height="5" fill="${skin}"/>`;
    if(P.signs.droop) s += `<rect x="182" y="93" width="10" height="5.5" fill="${skin}"/>`;
  }
  s += `<path d="M181 106 Q187 109 193 106" stroke="${shade}" stroke-width="1.6" fill="none"/><path d="M207 106 Q213 109 219 106" stroke="${shade}" stroke-width="1.6" fill="none"/>`;
  s += `<path d="M200 100 Q206 112 198 116" stroke="${shade}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  if(P.signs.flushed) s += `<g fill="#e0605a" opacity=".32"><ellipse cx="180" cy="114" rx="10" ry="7"/><ellipse cx="220" cy="114" rx="10" ry="7"/></g>`;
  /* mouth */
  s += `<g id="chMouthG">`;
  const m = P.mouth || 'closed';
  if(m==='gasp') s += `<ellipse id="chMouth" class="ch-gasp" cx="200" cy="127" rx="8" ry="5.5" fill="#4a2e34" stroke="${lip}" stroke-width="3"/>`;
  else if(m==='swollen') s += `<ellipse id="chMouth" class="ch-gasp" cx="200" cy="128" rx="11" ry="6.5" fill="#4a2e34" stroke="${mix(lip,'#d06a74',.5)}" stroke-width="6.5"/>`;
  else if(m==='pursed') s += `<circle id="chMouth" cx="200" cy="127" r="3.6" fill="#4a2e34" stroke="${lip}" stroke-width="3.2"/><path d="M191 124 L194 125 M191 130 L194 129 M209 124 L206 125 M209 130 L206 129" stroke="${shade}" stroke-width="1.2"/>`;
  else if(m==='droop') s += `<path id="chMouth" d="M188 131 Q198 131 212 125" stroke="${lip}" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M186 120 Q184 128 188 133" stroke="${shade}" stroke-width="1.4" fill="none"/>`;
  else if(m==='grimace') s += `<rect id="chMouth" x="191" y="124" width="18" height="6" rx="3" fill="#f4f1ea" stroke="${lip}" stroke-width="2.5"/>`;
  else s += `<path id="chMouth" d="M191 127 Q200 130 209 127" stroke="${lip}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  s += `</g>`;
  if(P.signs.sweat) s += `<g id="chSweat" fill="#d6eef9"><path class="ch-sweat" d="M178 76 q3 5 0 8 q-3 -3 0 -8 Z"/><path class="ch-sweat" d="M222 80 q3 5 0 8 q-3 -3 0 -8 Z" style="animation-delay:.8s"/><path class="ch-sweat" d="M231 96 q3 5 0 8 q-3 -3 0 -8 Z" style="animation-delay:1.6s"/><path class="ch-sweat" d="M171 112 q3 5 0 8 q-3 -3 0 -8 Z" style="animation-delay:2.2s"/></g>`;
  return s;
}

function patientSVG(P){
  let skin = P.skin;
  if(P.signs.pale) skin = mix(skin,'#dcdcdc',.32);
  if(P.signs.grey) skin = mix(skin,'#9aa0a6',.3);
  const shade = mix(skin,'#000000',.13), ear = mix(skin,'#000000',.06);
  const lip = P.signs.blueLips ? '#8d92b8' : (P.signs.pale ? mix(skin,'#c48a8a',.5) : mix(skin,'#b0555a',.45));
  const top = P.top, topS = mix(P.top,'#000000',.1), bottom = P.bottom || '#4b5563', shoe = P.shoes || '#3a3a3a';
  const dress = P.outfit==='dress' || P.outfit==='nightdress';
  const shortSleeve = P.outfit==='tshirt' || P.outfit==='dress';
  const hair = P.hairColour || '#5b3e2b';
  const armL = ARM[P.arms && P.arms.L || 'knee'].L, armR = ARM[P.arms && P.arms.R || 'knee'].R;
  const barrel = !!P.signs.barrelChest;
  let s = '';

  /* legs */
  s += `<g id="chLegs">`;
  s += dress
    ? `<rect x="148" y="280" width="104" height="52" rx="18" fill="${top}"/>`
    : `<rect x="150" y="280" width="100" height="50" rx="18" fill="${bottom}"/>`;
  if(dress){
    s += `<rect x="158" y="322" width="34" height="80" rx="11" fill="${skin}"/><rect x="208" y="322" width="34" height="80" rx="11" fill="${skin}"/>`;
    if(P.outfit==='nightdress') s += `<path d="M150 300 L250 300 L256 352 Q200 362 144 352 Z" fill="${top}"/>`;
    if(P.signs.mottled) s += `<g id="chMottle" fill="#8a5a8a" opacity=".42">${MOTTLE.map(([x,y],i)=>`<ellipse cx="${x}" cy="${y}" rx="${6+i%3}" ry="${4+i%2}"/>`).join('')}</g>`;
  } else {
    s += `<rect x="157" y="318" width="36" height="82" rx="11" fill="${bottom}"/><rect x="207" y="318" width="36" height="82" rx="11" fill="${bottom}"/>`;
    s += `<ellipse cx="175" cy="400" rx="17" ry="9" fill="${skin}"/><ellipse cx="225" cy="400" rx="17" ry="9" fill="${skin}"/>`;
  }
  s += `<ellipse cx="172" cy="416" rx="28" ry="10" fill="${shoe}"/><ellipse cx="228" cy="416" rx="28" ry="10" fill="${shoe}"/></g>`;

  /* upper body (breathes) */
  s += `<g id="chUpper">`;
  s += hairBackSVG(P, hair);
  const arm = (a, sleeve) => {
    const out = [];
    if(shortSleeve){
      out.push(`<path d="${a[0]}" stroke="${skin}" stroke-width="24" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`);
      const m = a[0].match(/M(\d+) (\d+) L(\d+) (\d+)/); const x1=+m[1],y1=+m[2],x2=+m[3],y2=+m[4];
      out.push(`<path d="M${x1} ${y1} L${(x1+(x2-x1)*.45).toFixed(1)} ${(y1+(y2-y1)*.45).toFixed(1)}" stroke="${sleeve}" stroke-width="28" stroke-linecap="round"/>`);
    } else out.push(`<path d="${a[0]}" stroke="${sleeve}" stroke-width="27" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`);
    return out.join('');
  };
  /* arms drawn behind the torso unless resting over it */
  const front = k => (P.arms && ['chest','throat','tummy'].includes(P.arms[k]));
  if(!front('L')) s += arm(armL, topS) + `<circle cx="${armL[1][0]}" cy="${armL[1][1]}" r="13" fill="${skin}"/>`;
  if(!front('R')) s += arm(armR, topS) + `<circle cx="${armR[1][0]}" cy="${armR[1][1]}" r="13" fill="${skin}"/>`;
  s += barrel
    ? `<path d="M134 178 Q200 154 266 178 L258 292 Q200 304 142 292 Z" fill="${top}"/>`
    : `<path d="M142 176 Q200 160 258 176 L254 292 Q200 302 146 292 Z" fill="${top}"/>`;
  if(P.outfit==='pyjama') s += `<g stroke="${topS}" stroke-width="2"><line x1="170" y1="172" x2="168" y2="296"/><line x1="230" y1="172" x2="232" y2="296"/></g>`;
  if(P.outfit==='shirt' || P.outfit==='pyjama') s += `<line x1="200" y1="204" x2="200" y2="298" stroke="${topS}" stroke-width="2"/><circle cx="205" cy="222" r="2.4" fill="${topS}"/><circle cx="205" cy="246" r="2.4" fill="${topS}"/><circle cx="205" cy="270" r="2.4" fill="${topS}"/>`;
  s += `<rect x="184" y="128" width="32" height="50" rx="9" fill="${skin}"/>`;
  if(P.outfit==='shirt' || P.outfit==='pyjama'){
    s += `<path d="M178 170 L200 206 L222 170 Z" fill="${skin}"/><path d="M176 168 L200 206 L186 168 Z" fill="${mix(top,'#ffffff',.25)}"/><path d="M224 168 L200 206 L214 168 Z" fill="${mix(top,'#ffffff',.25)}"/>`;
  } else {
    s += `<path d="M182 170 Q200 192 218 170 Z" fill="${skin}"/>`;
  }
  if(P.tie) s += `<path d="M196 192 L204 192 L208 250 L200 262 L192 250 Z" fill="${P.tie}"/>`;
  s += `<g id="chScm" stroke="${shade}" stroke-width="3" stroke-linecap="round" opacity=".3"><path d="M189 134 L197 176"/><path d="M211 134 L203 176"/></g>`;
  s += `<g id="chScm2" stroke="${mix(shade,'#000000',.15)}" stroke-width="3.5" stroke-linecap="round" opacity="0"><path d="M189 134 L197 176"/><path d="M211 134 L203 176"/><path d="M178 172 L160 180"/><path d="M222 172 L240 180"/></g>`;
  s += `<g id="chVeins" stroke="#6f7fb4" stroke-width="2.6" fill="none" stroke-linecap="round" opacity="0"><path d="M192 136 C188 148 193 158 189 172"/><path d="M208 136 C212 148 207 158 211 172"/></g>`;
  s += headSVG(P, skin, shade, ear, lip, hair);
  if(P.signs.hives){
    s += `<g id="chHives" fill="#e0646a" opacity=".55">${HIVES.map(([x,y],i)=>`<ellipse cx="${x}" cy="${y}" rx="${4+i%3}" ry="${3+i%2}"/>`).join('')}`;
    if(shortSleeve) s += HIVES_ARM.map(([x,y],i)=>`<ellipse cx="${x}" cy="${y}" rx="${4+i%2}" ry="3"/>`).join('');
    s += `</g>`;
  }
  if(P.signs.petechiae){
    s += `<g id="chRash" fill="#7a2a4a">${[[171,346],[180,362],[166,378],[176,390],[222,350],[232,366],[218,382],[229,394],[188,150],[212,158],[140,262],[262,270],[146,286],[256,286]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.5"/>`).join('')}</g>`;
  }
  /* arms resting in front of the body */
  if(front('L')) s += arm(armL, topS) + `<circle cx="${armL[1][0]}" cy="${armL[1][1]}" r="13" fill="${skin}"/>`;
  if(front('R')) s += arm(armR, topS) + `<circle cx="${armR[1][0]}" cy="${armR[1][1]}" r="13" fill="${skin}"/>`;
  s += `</g>`;
  return s;
}

/* ==================== PATIENT (lying on the floor) ====================
 * Drawn as an upright figure facing the viewer, then rotated so the head is
 * on the left. The patient's right side ends up nearest the viewer. */
function floorSVG(P){
  let skin = P.skin;
  if(P.signs.pale) skin = mix(skin,'#dcdcdc',.32);
  if(P.signs.grey) skin = mix(skin,'#9aa0a6',.3);
  const shade = mix(skin,'#000000',.13), ear = mix(skin,'#000000',.06);
  const lip = P.signs.blueLips ? '#8d92b8' : (P.signs.pale ? mix(skin,'#c48a8a',.5) : mix(skin,'#b0555a',.45));
  const top = P.top, topS = mix(P.top,'#000000',.1), bottom = P.bottom || '#4b5563', shoe = P.shoes || '#3a3a3a';
  const skirt = P.outfit==='dress' || P.outfit==='nightdress' || P.outfit==='skirt';
  const hair = P.hairColour || '#5b3e2b';
  const shortR = !!P.signs.shortRotated;
  let s = `<g transform="translate(52,345) rotate(-90)">`;
  s += `<ellipse cx="0" cy="175" rx="74" ry="190" fill="#000000" opacity=".13"/>`;
  s += `<g transform="translate(-200,-58)">${hairBackSVG(P, hair)}</g>`;
  /* legs */
  const legC = skirt ? skin : bottom, rLen = shortR ? 58 : 92;
  s += `<g id="chLegs"><rect x="-38" y="226" width="28" height="${rLen}" rx="12" fill="${legC}"/><rect x="10" y="226" width="28" height="92" rx="12" fill="${legC}"/>`;
  s += shortR
    ? `<ellipse cx="-44" cy="${222+rLen}" rx="16" ry="8" fill="${shoe}" transform="rotate(-62 -44 ${222+rLen})"/>`
    : `<ellipse cx="-24" cy="322" rx="11" ry="9" fill="${shoe}"/>`;
  s += `<ellipse cx="24" cy="322" rx="11" ry="9" fill="${shoe}"/></g>`;
  if(P.signs.petechiae) s += `<g id="chRash" fill="#7a2a4a">${[[-30,250],[-20,268],[-28,284],[-18,300],[18,246],[28,262],[16,280],[26,298],[-24,236],[22,232]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.5"/>`).join('')}</g>`;
  s += `<rect x="-44" y="192" width="88" height="${skirt?64:46}" rx="16" fill="${skirt?top:bottom}"/>`;
  /* arms by the sides */
  s += `<rect x="-64" y="96" width="20" height="112" rx="10" fill="${topS}"/><circle cx="-54" cy="212" r="10" fill="${skin}"/>`;
  s += `<rect x="44" y="96" width="20" height="112" rx="10" fill="${topS}"/><circle cx="54" cy="212" r="10" fill="${skin}"/>`;
  /* torso (breathes) */
  s += `<g class="ch-floor-breathe"><path d="M-46 92 Q0 80 46 92 L42 200 Q0 208 -42 200 Z" fill="${top}"/>`;
  s += `<rect x="-14" y="70" width="28" height="30" rx="8" fill="${skin}"/><path d="M-16 90 Q0 108 16 90 Z" fill="${skin}"/></g>`;
  /* head, reusing the seated head drawing (centre 200,98 → 0,40) */
  s += `<g transform="translate(-200,-58)">${headSVG(P, skin, shade, ear, lip, hair)}</g>`;
  if(P.signs.petechiae) s += `<g fill="#7a2a4a"><circle cx="-8" cy="80" r="1.6"/><circle cx="7" cy="86" r="1.6"/><circle cx="-4" cy="94" r="1.6"/></g>`;
  s += `</g>`;
  return s;
}

/* where the "wrist and hand" hotspot sits: a hand resting on a knee */
function handSpot(P){
  const a = P.arms || {};
  if(!a.L || a.L==='knee') return [160,314];
  if(!a.R || a.R==='knee') return [240,314];
  return [ARM[a.R].R[1][0], ARM[a.R].R[1][1]];
}

const FLOOR_SPOTS = {
  face:  `<ellipse class="ch-hs-shape" cx="92" cy="345" rx="44" ry="40"/>`,
  neck:  `<rect class="ch-hs-shape" x="120" y="328" width="26" height="34" rx="9"/>`,
  chest: `<rect class="ch-hs-shape" x="148" y="302" width="54" height="86" rx="14"/>`,
  abdo:  `<rect class="ch-hs-shape" x="206" y="310" width="46" height="70" rx="12"/>`,
  hand:  `<circle class="ch-hs-shape" cx="264" cy="399" r="19"/>`,
  legs:  `<rect class="ch-hs-shape" x="280" y="300" width="114" height="92" rx="14"/>`
};
function hotspotsSVG(c){
  const P = c.patient, A = c.areas, [hx,hy] = handSpot(P);
  if(P.pose==='floor') return Object.keys(FLOOR_SPOTS).filter(k=>A[k]).map(k=>`<g class="ch-hs" data-area="${k}" tabindex="0" role="button" aria-label="Examine ${esc(AREA_NAMES[k].toLowerCase())}">${FLOOR_SPOTS[k]}</g>`).join('');
  const dress = P.outfit==='dress' || P.outfit==='nightdress';
  const shapes = {
    face:  `<ellipse class="ch-hs-shape" cx="200" cy="98" rx="48" ry="52"/>`,
    neck:  `<rect class="ch-hs-shape" x="176" y="150" width="48" height="28" rx="10"/>`,
    chest: `<rect class="ch-hs-shape" x="148" y="182" width="104" height="76" rx="16"/>`,
    abdo:  `<rect class="ch-hs-shape" x="170" y="262" width="60" height="30" rx="12"/>`,
    hand:  `<circle class="ch-hs-shape" cx="${hx}" cy="${hy}" r="23"/>`,
    legs:  dress ? `<rect class="ch-hs-shape" x="146" y="334" width="108" height="86" rx="14"/>` : `<rect class="ch-hs-shape" x="146" y="384" width="108" height="32" rx="12"/>`
  };
  return Object.keys(shapes).filter(k=>A[k]).map(k=>`<g class="ch-hs" data-area="${k}" tabindex="0" role="button" aria-label="Examine ${esc(AREA_NAMES[k].toLowerCase())}">${shapes[k]}</g>`).join('');
}
const AREA_NAMES = {face:'Face and head', neck:'Neck', chest:'Chest', abdo:'Tummy', hand:'Wrist and hand', legs:'Legs and feet'};

function sceneSVG(c){
  const P = c.patient;
  return `<svg class="ch-scene ch-glow ch-locked" viewBox="0 0 400 460" role="img" aria-label="${esc(P.name)}, ${P.age}">
    ${SCENES[c.scene.room]()}
    ${P.pose==='floor' ? '' : chairSVG(c.scene.chair, c.scene.chairColour)}
    <g id="chFig" class="${P.signs.shiver?'ch-shiver':''}${P.signs.restless?' ch-restless':''}">${P.pose==='floor' ? floorSVG(P) : patientSVG(P)}</g>
    ${c.scene.prop==='bowl' ? `<g><ellipse cx="96" cy="414" rx="30" ry="9" fill="#5a3a2a" opacity=".25"/><path d="M68 398 Q96 428 124 398 Z" fill="#cfd6dc"/><ellipse cx="96" cy="398" rx="28" ry="7" fill="#e9eef2"/><ellipse cx="96" cy="399" rx="22" ry="4.5" fill="#4a2e1e"/></g>` : ''}
    <g id="chBubble" opacity="0"><rect x="232" y="14" width="160" height="50" rx="14" fill="#ffffff"/><path d="M244 62 L236 80 L258 63 Z" fill="#ffffff"/>
      <text id="chBubbleText" x="246" y="35" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-size="13" font-weight="600" fill="#212529"></text></g>
    <g id="chHotspots">${hotspotsSVG(c)}</g>
  </svg>`;
}

/* ==================== SOUND ====================
 * Built as a short WAV clip and played with an <audio> element,
 * which iPhones play even when the silent switch is on. */
const wavCache = {};
let player = null;
function chestWav(type, period){
  const key = type + '|' + period.toFixed(2);
  if(wavCache[key]) return wavCache[key];
  const sr = 22050, breaths = 3, n = Math.floor(sr * period * breaths), d = new Float32Array(n);
  const insp = (type==='wheeze') ? 0.32 : 0.42;           /* share of each breath spent breathing in */
  const loud = type==='quiet' ? 0.25 : 1;
  const env = ph => {                                      /* ph = 0..1 through one breath */
    if(ph < insp) return 0.45 * Math.sin(Math.PI * ph / insp) * loud;
    const e = (ph - insp) / (1 - insp);
    return (e < 0.85 ? 0.22 * Math.sin(Math.PI * e / 0.85) : 0) * loud;
  };
  const a1 = 1-Math.exp(-2*Math.PI*900/sr), a2 = 1-Math.exp(-2*Math.PI*250/sr);
  let lp=0, lp2=0;
  for(let i=0;i<n;i++){
    const t = i/sr, ph = (t % period)/period;
    const x = Math.random()*2-1; lp += a1*(x-lp); lp2 += a2*(lp-lp2);
    d[i] = (lp-lp2) * env(ph) * 3.2;
    if(type==='wheeze' && ph > insp){
      const e = (ph-insp)/(1-insp), w = Math.sin(Math.PI*Math.min(1,e/0.9)) * 0.22;
      d[i] += w * (Math.sin(2*Math.PI*(430+30*e)*t) + 0.7*Math.sin(2*Math.PI*(610-40*e)*t) + 0.45*Math.sin(2*Math.PI*(780+20*e)*t));
    }
  }
  if(type==='crackles' || type==='coarse'){
    const len = Math.floor(sr*(type==='coarse'?0.016:0.008)), per = type==='coarse' ? 7 : 11;
    for(let b=0;b<breaths;b++){
      for(let k=0;k<per;k++){
        const st = Math.floor((b*period + period*insp*(0.4+Math.random()*0.6))*sr), amp = 0.35+Math.random()*0.35;
        let prev = 0;
        for(let j=0;j<len && st+j<n;j++){ const x=(Math.random()*2-1)*Math.exp(-j/(len/5)); d[st+j]+=(type==='coarse'?x:(x-prev))*amp; prev=x; }
      }
    }
  }
  const buf = new ArrayBuffer(44+n*2), v = new DataView(buf);
  const w = (o,str) => { for(let i=0;i<str.length;i++) v.setUint8(o+i, str.charCodeAt(i)); };
  w(0,'RIFF'); v.setUint32(4,36+n*2,true); w(8,'WAVE'); w(12,'fmt ');
  v.setUint32(16,16,true); v.setUint16(20,1,true); v.setUint16(22,1,true);
  v.setUint32(24,sr,true); v.setUint32(28,sr*2,true); v.setUint16(32,2,true); v.setUint16(34,16,true);
  w(36,'data'); v.setUint32(40,n*2,true);
  for(let i=0;i<n;i++) v.setInt16(44+i*2, Math.round(Math.tanh(d[i]*0.9)*0.9*32767), true);
  return (wavCache[key] = URL.createObjectURL(new Blob([buf], {type:'audio/wav'})));
}
function playChest(type, period){
  const url = chestWav(type, period);
  if(player){ try{ player.pause(); }catch(e){} }
  player = new Audio(url); player.setAttribute('playsinline','');
  const p = player.play(); if(p && p.catch) p.catch(()=>{});
  return period * 3;
}

/* ==================== GAME ==================== */
const LEVELS = {
  easy:         {name:'Easy', glow:true,  timeBonus:480, blurb:'Classic presentations. Areas to examine are outlined.'},
  intermediate: {name:'Intermediate', glow:false, timeBonus:420, blurb:'Less obvious presentations, more findings to sift.'},
  hard:         {name:'Hard', glow:false, timeBonus:360, blurb:'Look-alikes and red herrings.'}
};

function ClueHunt(root, cases){
  this.root = root; this.cases = cases; this.S = null; this.c = null; this.level = 'easy';
  this.home();
}
const CH = ClueHunt.prototype;
CH.$ = function(sel){ return this.root.querySelector(sel); };
CH.$$ = function(sel){ return this.root.querySelectorAll(sel); };

/* ---------- case list ---------- */
CH.home = function(){
  const best = store();
  const lv = this.level;
  const list = this.cases.filter(c=>c.level===lv);
  const tabs = Object.keys(LEVELS).map(k=>{
    const n = this.cases.filter(c=>c.level===k).length;
    return `<button class="ch-tab ${k===lv?'on':''}" data-lv="${k}" role="tab" aria-selected="${k===lv}">${LEVELS[k].name}<small>${n?n+' cases':'Coming soon'}</small></button>`;
  }).join('');
  const cards = list.length ? list.map((c,i)=>{
    const b = best[c.id];
    return `<button class="ch-card" data-case="${c.id}">
      <span class="ch-card-n">${i+1}</span>
      <span class="ch-card-main"><b>${esc(c.patient.name)}, ${c.patient.age}</b><span>${esc(c.dispatch.headline)}</span></span>
      <span class="ch-card-best ${b!=null?'done':''}">${b!=null?b+'%':'New'}</span></button>`;
  }).join('') : `<p class="ch-soon">${esc(LEVELS[lv].name)} cases are on their way.</p>`;
  this.root.innerHTML = `
    <div class="ch-home">
      <div class="ch-head"><div class="ch-eyebrow">Paramind Pro</div><h1>Clue Hunt</h1>
        <p>Examine the patient, find the clues, then name what's going on. Turn your sound on to listen to chests.</p></div>
      <div class="ch-tabs" role="tablist">${tabs}</div>
      <p class="ch-lvl">${esc(LEVELS[lv].blurb)}</p>
      <div class="ch-cards">${cards}</div>
      <p class="ch-policy">Clue Hunt teaches recognition and understanding only. For clinical management, follow JRCALC and your trust guidelines.</p>
    </div>`;
  this.$$('.ch-tab').forEach(b=>b.addEventListener('click',()=>{ this.level=b.dataset.lv; this.home(); }));
  this.$$('.ch-card').forEach(b=>b.addEventListener('click',()=>this.brief(b.dataset.case)));
  window.scrollTo({top:0});
};

/* ---------- dispatch brief ---------- */
CH.brief = function(id){
  const c = this.cases.find(x=>x.id===id); this.c = c;
  const d = c.dispatch;
  this.root.innerHTML = `
    <div class="ch-brief">
      <button class="ch-back" id="chBack">← All cases</button>
      <div class="ch-dispatch">
        <div class="ch-row"><span>Incoming · ${esc(d.time)}</span><span class="ch-cat">${esc(d.cat)}</span></div>
        <p><b>${esc(d.text)}</b></p><p>${esc(d.detail)}</p><p class="ch-addr">${esc(d.addr)}</p>
      </div>
      <button class="ch-btn ch-primary ch-big" id="chGo">Arrive on scene</button>
    </div>`;
  this.$('#chBack').addEventListener('click',()=>this.home());
  this.$('#chGo').addEventListener('click',()=>this.start());
  window.scrollTo({top:0});
};

/* ---------- build clue registry from the case ---------- */
CH.registry = function(c){
  const R = {};
  R.doorway = {t:c.doorway.t, g:'Doorway', key:true};
  Object.keys(c.areas).forEach(area=>c.areas[area].forEach(a=>{
    if(a.kind==='listen') a.zones.forEach(z=>{ R[a.id+'_'+z.id] = Object.assign({g:a.L}, z.clue); });
    else R[a.id] = Object.assign({g:a.L}, a.clue);
  }));
  c.questions.forEach((q,i)=>{ R['q'+i] = Object.assign({g:'History'}, q.clue); });
  const o = c.obs;
  R.obs = {t:`HR ${o.hr} · RR ${o.rr} · SpO₂ ${o.sp}${typeof o.sp==='number'?'%':''} · BP ${o.bp} · Temp ${o.t} °C · BM ${o.bm}`, g:'Obs'};
  Object.keys(R).forEach(k=>{ const r=R[k]; r.p = r.key?20:(r.normal?5:10); });
  return R;
};

/* ---------- game ---------- */
CH.start = function(){
  const c = this.c, P = c.patient;
  this.R = this.registry(c);
  this.acts = {}; Object.keys(c.areas).forEach(ar=>c.areas[ar].forEach(a=>{ this.acts[a.id]=a; }));
  this.S = {clock:0, found:new Map(), letters:[], impression:null, choice:null, area:null, busy:false, opts:shuffle(c.options)};
  this.period = Math.max(1.4, Math.min(4.5, 60 / c.obs.rr));
  this.root.innerHTML = `
    <div class="ch-hud"><div class="ch-who"><b>${esc(P.name)}, ${P.age}</b><span>${esc(c.dispatch.headline)}</span></div>
      <div class="ch-hud-r"><div class="ch-abcde" id="chAbcde"></div><div class="ch-clock"><span>Time on scene</span><b id="chClock">00:00</b></div></div></div>
    <div class="ch-grid">
      <div class="ch-stage">
        <div class="ch-scene-wrap">${sceneSVG(c)}
          <div class="ch-doorway" id="chDoorway" hidden><div><b>Doorway view: just look</b><div class="ch-count" id="chDcount">5</div></div></div></div>
        <div class="ch-tools">
          <button class="ch-btn" id="chAsk">Ask questions</button>
          <button class="ch-btn" id="chObs">Monitor</button>
          <button class="ch-btn ch-primary" id="chCall">Make your call</button>
          <label class="ch-toggle"><input type="checkbox" id="chGlowT" ${LEVELS[c.level].glow?'checked':''}> Show areas to examine</label>
        </div>
      </div>
      <aside class="ch-side">
        <div class="ch-sheet-back" id="chSheetBack" hidden></div>
        <div class="ch-sheet" id="chSheet" hidden role="dialog" aria-labelledby="chSheetTitle">
          <div class="ch-sheet-head"><h3 id="chSheetTitle"></h3><button class="ch-x" id="chSheetX" aria-label="Close">×</button></div>
          <div id="chSheetBody"></div>
        </div>
        <div class="ch-panel"><h2><span>Your findings</span><span id="chNCount">0</span></h2>
          <p class="ch-empty" id="chNEmpty">Tap the patient to examine them. What you find is noted here.</p>
          <ol class="ch-notes" id="chNotes"></ol></div>
      </aside>
    </div>`;
  const scene = this.$('.ch-scene');
  if(!LEVELS[c.level].glow) scene.classList.remove('ch-glow');
  const up = this.$('#chUpper'); if(up){ up.style.animationDuration = this.period + 's'; if(P.signs.deepBreaths) up.classList.add('ch-deep'); }
  this.$$('.ch-gasp, .ch-floor-breathe').forEach(el=>el.style.animationDuration = this.period + 's');
  this.renderChips();
  this.$$('.ch-hs').forEach(h=>{
    h.addEventListener('click',()=>this.showArea(h.dataset.area));
    h.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); this.showArea(h.dataset.area);} });
  });
  const unlocked = () => !this.$('.ch-scene').classList.contains('ch-locked');
  this.$('#chAsk').addEventListener('click',()=>{ if(unlocked()) this.askView(); });
  this.$('#chObs').addEventListener('click',()=>{ if(unlocked()) this.obsView(); });
  this.$('#chCall').addEventListener('click',()=>{ if(unlocked()) this.callView(); });
  this.$('#chGlowT').addEventListener('change',e=>scene.classList.toggle('ch-glow', e.target.checked));
  this.$('#chSheetX').addEventListener('click',()=>this.closeSheet());
  this.$('#chSheetBack').addEventListener('click',()=>{ if(!this.$('#chSheetX').hidden) this.closeSheet(); });
  window.scrollTo({top:0});
  this.doorway();
};

CH.addTime = function(s){ this.S.clock += s; this.$('#chClock').textContent = fmt(this.S.clock); };
CH.touch = function(L){ if('ABCDE'.includes(L) && !this.S.letters.includes(L)) this.S.letters.push(L); this.renderChips(); };
CH.renderChips = function(){
  this.$('#chAbcde').innerHTML = 'ABCDE'.split('').map(L=>{ const i=this.S.letters.indexOf(L);
    return `<div class="ch-chip ${i>-1?'on':''}">${L}${i>-1?`<sup>${i+1}</sup>`:''}</div>`; }).join('');
};
CH.record = function(id){
  if(this.S.found.has(id)) return false;
  const r = this.R[id]; this.S.found.set(id, r.t);
  const li = document.createElement('li');
  li.innerHTML = `<span class="ch-tag">${esc(r.g)}</span><span>${esc(r.t)}</span>`;
  this.$('#chNotes').prepend(li);
  this.$('#chNEmpty').hidden = true; this.$('#chNCount').textContent = this.S.found.size;
  this.markDone(); return true;
};
CH.actDone = function(a){
  if(a.kind==='listen') return a.zones.every(z=>this.S.found.has(a.id+'_'+z.id));
  return this.S.found.has(a.id);
};
CH.markDone = function(){
  this.$$('.ch-hs').forEach(h=>h.classList.toggle('done', this.c.areas[h.dataset.area].every(a=>this.actDone(a))));
};
CH.say = function(lines){
  const t = this.$('#chBubbleText'); if(!t) return;
  t.innerHTML = lines.map((l,i)=>`<tspan x="246" dy="${i?17:0}">${esc(l)}</tspan>`).join('');
  this.$('#chBubble rect').setAttribute('height', 32 + lines.length*16);
  t.setAttribute('y', lines.length>1 ? 33 : 41);
  const b = this.$('#chBubble'); b.style.opacity = 1;
  clearTimeout(this.bt); this.bt = setTimeout(()=>{ b.style.opacity = 0; }, 3800);
};
CH.fx = function(f){
  if(!f) return;
  if(f.say) this.say(f.say);
  if(f.show){ const el = this.$(f.show==='veins'?'#chVeins':'#chScm2'); if(el) el.style.opacity = 1; }
  if(f.flash){ const el = this.$({mouth:'#chMouthG', sweat:'#chSweat', hives:'#chHives', legs:'#chLegs', mottle:'#chMottle', rash:'#chRash'}[f.flash]); if(el){ el.classList.remove('ch-flash'); void el.getBoundingClientRect(); el.classList.add('ch-flash'); } }
};

/* ---------- sheet ---------- */
CH.openSheet = function(title, html){
  this.$('#chSheetTitle').textContent = title; this.$('#chSheetBody').innerHTML = html;
  this.$('#chSheet').hidden = false; this.$('#chSheetBack').hidden = false;
};
CH.closeSheet = function(){
  if(this.S.busy) return;
  this.$('#chSheet').hidden = true; this.$('#chSheetBack').hidden = true;
  this.$$('.ch-hs.active').forEach(h=>h.classList.remove('active')); this.S.area = null;
};
CH.backBtn = function(area){
  return `<button class="ch-btn ch-ghost ch-wide" data-back="${area}">Back to ${esc(AREA_NAMES[area].toLowerCase())}</button>`;
};
CH.wireBack = function(){ const b = this.$('[data-back]'); if(b) b.addEventListener('click',()=>this.showArea(b.dataset.back)); };

CH.showArea = function(area){
  if(this.S.busy) return;
  this.S.area = area;
  this.$$('.ch-hs').forEach(h=>h.classList.toggle('active', h.dataset.area===area));
  const rows = this.c.areas[area].map(a=>{
    const done = this.actDone(a);
    let res = '';
    if(a.kind==='listen') res = a.zones.filter(z=>this.S.found.has(a.id+'_'+z.id)).map(z=>z.clue.t).join('. ');
    else if(done) res = this.S.found.get(a.id);
    const cost = a.kind==='listen' ? '20 s each' : `${a.cost} s`;
    return `<button class="ch-act ${done?'done':''}" data-act="${a.id}"><span class="ch-L">${a.L}</span><span>${esc(a.l)}</span><span class="ch-cost">${done?'Done':cost}</span>${res?`<span class="ch-res">${esc(res)}</span>`:''}</button>`;
  }).join('');
  this.openSheet(AREA_NAMES[area], `<div class="ch-acts">${rows}</div>`);
  this.$$('#chSheetBody .ch-act').forEach(b=>b.addEventListener('click',()=>this.doAct(b.dataset.act)));
};

CH.doAct = function(id){
  const a = this.acts[id];
  if(this.actDone(a)) return;
  this.touch(a.L);
  const k = a.kind || 'simple';
  if(k==='count') return this.countView(a);
  if(k==='listen') return this.listenView(a);
  if(k==='crt') return this.crtView(a);
  if(k==='press') return this.pressView(a);
  if(k==='pupils') return this.pupilsView(a);
  if(k==='bm') return this.bmView(a);
  if(k==='glass') return this.glassView(a);
  this.addTime(a.cost); this.fx(a.fx); this.record(a.id); this.showArea(this.S.area);
};

/* counting breaths or pulse */
CH.countView = function(a){
  const isBreath = a.what==='breath', P = this.c.patient;
  const period = 60 / a.rate;
  const mini = isBreath
    ? `<svg viewBox="0 0 120 120" aria-hidden="true"><g class="ch-mini-breathe" style="animation-duration:${period}s"><path d="M22 40 Q60 26 98 40 L94 112 L26 112 Z" fill="${P.top}"/><path d="M44 38 Q60 58 76 38 Z" fill="${P.skin}"/></g></svg>`
    : `<svg viewBox="0 0 120 120" aria-hidden="true"><rect x="10" y="40" width="100" height="44" rx="22" fill="${P.skin}"/><circle cx="52" cy="62" r="8" fill="${mix(P.skin,'#000000',.12)}"/><circle id="chPulseRing" cx="52" cy="62" r="8" fill="none" stroke="#3DA4B8" stroke-width="3" opacity="0"/></svg>`;
  this.openSheet(a.l, `
    <p class="ch-hint">${isBreath?'Watch the chest. Tap once every time it rises.':'Feel the pulse at the wrist. Tap once for every beat.'} You have 15 seconds.</p>
    <div class="ch-counter">${mini}<div><div class="ch-big-n" id="chCN">0</div><div class="ch-hint" style="margin:0">${isBreath?'breaths':'beats'} counted</div><div class="ch-bar"><i id="chCBar"></i></div></div></div>
    <button class="ch-tapbtn" id="chCTap" style="margin-top:12px">Start counting</button><div id="chCOut"></div>`);
  /* pulse: JS-timed beats so an irregular pulse can be shown */
  let beatT = null;
  if(!isBreath){
    const ring = this.$('#chPulseRing');
    const beat = () => {
      if(!ring.isConnected) return;
      if(ring.animate) ring.animate([{transform:'scale(1)',opacity:1},{transform:'scale(2.2)',opacity:0}],{duration:Math.min(450,period*900),easing:'ease-out'});
      const next = period * (a.irregular ? (0.55 + Math.random()*0.9) : 1);
      beatT = setTimeout(beat, next*1000);
    };
    ring.style.transformBox = 'fill-box'; ring.style.transformOrigin = 'center';
    beat();
  }
  let n=0, running=false, t0=0;
  const tap = this.$('#chCTap');
  tap.addEventListener('click',()=>{
    if(!running && !t0){ running=true; this.S.busy=true; t0=performance.now(); tap.textContent = isBreath?'Tap: breath':'Tap: beat'; tick(); return; }
    if(running){ n++; this.$('#chCN').textContent = n; }
  });
  const tick = () => {
    const el = (performance.now()-t0)/1000;
    const bar = this.$('#chCBar'); if(!bar) return;
    bar.style.width = Math.min(100, el/15*100)+'%';
    if(el>=15) return finish();
    requestAnimationFrame(tick);
  };
  const finish = () => {
    running=false; this.S.busy=false; tap.disabled=true; tap.textContent='Time'; clearTimeout(beatT);
    const est=n*4, good=Math.abs(est-a.rate) <= (isBreath?4:12);
    this.addTime(a.cost); this.record(a.id);
    this.$('#chCOut').innerHTML = `<div class="ch-result ${good?'':'warn'}">You counted ${n} in 15 s, so about <b>${est} a minute</b>. Actual: ${a.rate}${a.irregular?', irregular':''}. ${good?'Good count.':'Worth slowing down and counting again in practice.'}</div>${this.backBtn(this.S.area)}`;
    this.wireBack();
  };
};

CH.listenView = function(a){
  const zone = z => { const id=a.id+'_'+z.id, done=this.S.found.has(id);
    return `<button class="ch-act ${done?'done':''}" data-z="${z.id}"><span class="ch-L">🩺</span><span>${esc(z.label)}<br><small>${esc(z.where)}</small></span><span class="ch-cost">${done?'Done':'20 s'}</span>${done?`<span class="ch-res">${esc(z.clue.t)}</span>`:''}</button>`; };
  this.openSheet(a.l, `<p class="ch-hint">Turn your sound on. Each place plays three breaths.</p><div class="ch-acts">${a.zones.map(zone).join('')}</div>
    <p class="ch-hint" style="margin-top:10px">Simulated breath sounds.</p>${this.backBtn(this.S.area)}`);
  this.wireBack();
  this.$$('#chSheetBody [data-z]').forEach(b=>b.addEventListener('click',()=>{
    if(this.S.busy) return;
    const z = a.zones.find(x=>x.id===b.dataset.z), id = a.id+'_'+z.id;
    this.S.busy = true; b.querySelector('.ch-cost').textContent = 'Playing…';
    let dur = 6; try{ dur = playChest(z.sound, this.period); }catch(e){}
    setTimeout(()=>{ this.S.busy=false; if(!this.S.found.has(id)){ this.addTime(20); this.record(id); } this.listenView(a); }, Math.min(dur,9)*1000 + 100);
  }));
};

CH.crtView = function(a){
  const P = this.c.patient, nailC = mix(P.skin,'#d9a3a2',.55), blanch = mix(P.skin,'#ffffff',.55);
  this.openSheet(a.l, `<p class="ch-hint">Press the fingertip for a moment, let go, and watch the colour come back.</p>
    <div class="ch-counter"><svg viewBox="0 0 120 120" aria-hidden="true"><path d="M30 120 L30 50 Q30 20 60 20 Q90 20 90 50 L90 120 Z" fill="${P.skin}"/><rect id="chNail" x="44" y="30" width="32" height="34" rx="12" fill="${nailC}"/></svg>
    <div><div class="ch-big-n" id="chCrtN">0.0 s</div><button class="ch-tapbtn" id="chCrtGo" style="margin-top:10px">Press</button></div></div><div id="chCrtOut"></div>`);
  this.$('#chCrtGo').addEventListener('click',()=>{
    const nail = this.$('#chNail'); this.$('#chCrtGo').disabled = true; this.S.busy = true;
    nail.style.transition='fill .2s'; nail.setAttribute('fill', blanch);
    setTimeout(()=>{
      nail.style.transition = `fill ${a.secs}s linear`; nail.setAttribute('fill', nailC);
      const t0 = performance.now();
      const tick = () => { const el=(performance.now()-t0)/1000, out=this.$('#chCrtN'); if(!out) return;
        out.textContent = Math.min(el,a.secs).toFixed(1)+' s';
        if(el<a.secs) return requestAnimationFrame(tick);
        this.S.busy=false; this.addTime(a.cost); this.record(a.id);
        this.$('#chCrtOut').innerHTML = `<div class="ch-result">${esc(a.clue.t)}.</div>${this.backBtn(this.S.area)}`; this.wireBack(); };
      tick();
    }, 900);
  });
};

CH.pressView = function(a){
  const P = this.c.patient;
  this.openSheet(a.l, `<p class="ch-hint">Press firmly over the ankle bone for a few seconds, then let go.</p>
    <div class="ch-counter"><svg viewBox="0 0 120 120" aria-hidden="true"><rect x="34" y="0" width="52" height="60" fill="${P.bottom||'#4b5563'}"/><ellipse cx="60" cy="72" rx="${a.dent?44:32}" ry="${a.dent?26:20}" fill="${P.skin}"/><ellipse id="chDent" cx="60" cy="72" rx="9" ry="6" fill="${mix(P.skin,'#000000',.15)}" opacity="0"/><ellipse cx="60" cy="104" rx="50" ry="14" fill="${P.shoes||'#3a3a3a'}"/></svg>
    <div><button class="ch-tapbtn" id="chPGo">Press</button></div></div><div id="chPOut"></div>`);
  this.$('#chPGo').addEventListener('click',()=>{
    const d = this.$('#chDent'); this.$('#chPGo').disabled = true; this.S.busy = true;
    d.style.transition='opacity .3s'; d.setAttribute('opacity', a.dent?'1':'.25');
    setTimeout(()=>{ d.style.transition = `opacity ${a.dent?4:.5}s ease-in`; d.setAttribute('opacity','0');
      this.S.busy=false; this.addTime(a.cost); this.record(a.id);
      this.$('#chPOut').innerHTML = `<div class="ch-result">${esc(a.clue.t)}.</div>${this.backBtn(this.S.area)}`; this.wireBack(); }, 1200);
  });
};

CH.pupilsView = function(a){
  const shrink = a.react === false ? 1 : .5, sz = a.size || 6;
  this.openSheet(a.l, `<p class="ch-hint">Shine the torch into each eye and watch the pupils.</p>
    <div class="ch-counter"><svg viewBox="0 0 120 120" aria-hidden="true"><ellipse cx="34" cy="60" rx="24" ry="15" fill="#f5f1ea"/><ellipse cx="86" cy="60" rx="24" ry="15" fill="#f5f1ea"/><circle cx="34" cy="60" r="11" fill="${a.iris||'#6b5a3a'}"/><circle cx="86" cy="60" r="11" fill="${a.iris||'#6b5a3a'}"/>
    <g id="chPups"><circle cx="34" cy="60" r="${a.unequal?9:sz}" fill="#111" data-fixed="${a.unequal?1:0}"/><circle cx="86" cy="60" r="${sz}" fill="#111"/></g></svg>
    <div><button class="ch-tapbtn" id="chEGo">Shine torch</button></div></div><div id="chEOut"></div>`);
  this.$$('#chPups circle').forEach(cn=>{ cn.style.transformBox='fill-box'; cn.style.transformOrigin='center'; cn.style.transition='transform .6s'; });
  this.$('#chEGo').addEventListener('click',()=>{
    this.$('#chEGo').disabled = true; this.S.busy = true;
    this.$$('#chPups circle').forEach(cn=>{ if(cn.dataset.fixed!=='1') cn.style.transform=`scale(${shrink})`; });
    setTimeout(()=>{ this.S.busy=false; this.addTime(a.cost); this.record(a.id);
      this.$('#chEOut').innerHTML = `<div class="ch-result">${esc(a.clue.t)}.</div>${this.backBtn(this.S.area)}`; this.wireBack(); }, 900);
  });
};

CH.bmView = function(a){
  this.openSheet(a.l, `<p class="ch-hint">Prick the side of a fingertip and touch the strip to the drop of blood.</p>
    <div class="ch-counter"><svg viewBox="0 0 120 120" aria-hidden="true"><rect x="28" y="14" width="64" height="96" rx="14" fill="#e9eef2"/><rect x="36" y="24" width="48" height="34" rx="5" fill="#0f2a33"/>
    <text id="chBmTxt" x="60" y="47" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="15" font-weight="700" fill="#6fd3f0">---</text><rect x="54" y="104" width="12" height="16" fill="#f4f1ea"/></svg>
    <div><button class="ch-tapbtn" id="chBmGo">Test</button></div></div><div id="chBmOut"></div>`);
  this.$('#chBmGo').addEventListener('click',()=>{
    this.$('#chBmGo').disabled = true; this.S.busy = true;
    let i=5; const t=this.$('#chBmTxt');
    const iv = setInterval(()=>{ if(!t.isConnected){ clearInterval(iv); return; } t.textContent = i>0 ? String(i) : a.value; i--;
      if(i<-1){ clearInterval(iv); this.S.busy=false; this.addTime(a.cost); this.record(a.id);
        this.$('#chBmOut').innerHTML = `<div class="ch-result">${esc(a.clue.t)}.</div>${this.backBtn(this.S.area)}`; this.wireBack(); } }, 380);
  });
};

CH.glassView = function(a){
  const P = this.c.patient, spots = [[38,46],[56,38],[74,52],[46,66],[64,74],[82,70],[52,86],[72,90],[34,82]];
  this.openSheet(a.l, `<p class="ch-hint">Press the side of a clear glass firmly onto the spots and look through it.</p>
    <div class="ch-counter"><svg viewBox="0 0 120 120" aria-hidden="true"><rect x="10" y="10" width="100" height="100" rx="18" fill="${P.skin}"/>
      <g id="chSpots" fill="#7a2a4a">${spots.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3"/>`).join('')}</g>
      <circle id="chGlass" cx="60" cy="62" r="40" fill="#dff3fb" fill-opacity=".35" stroke="#ffffff" stroke-width="4" opacity="0"/></svg>
    <div><button class="ch-tapbtn" id="chGGo">Press the glass</button></div></div><div id="chGOut"></div>`);
  this.$('#chGGo').addEventListener('click',()=>{
    this.$('#chGGo').disabled = true; this.S.busy = true;
    const g = this.$('#chGlass'); g.style.transition='opacity .4s'; g.setAttribute('opacity','1');
    if(a.blanch){ const sp=this.$('#chSpots'); sp.style.transition='opacity 1.2s'; sp.setAttribute('opacity','.1'); }
    setTimeout(()=>{ this.S.busy=false; this.addTime(a.cost); this.record(a.id);
      this.$('#chGOut').innerHTML = `<div class="ch-result">${esc(a.clue.t)}.</div>${this.backBtn(this.S.area)}`; this.wireBack(); }, 1600);
  });
};

/* ---------- ask, monitor, call ---------- */
CH.clearActive = function(){ this.$$('.ch-hs.active').forEach(h=>h.classList.remove('active')); };
CH.askView = function(){
  if(this.S.busy) return; this.clearActive();
  const rows = this.c.questions.map((q,i)=>{ const done=this.S.found.has('q'+i);
    return `<button class="ch-act ${done?'done':''}" data-q="${i}"><span class="ch-L">?</span><span>${esc(q.q)}</span><span class="ch-cost">${done?'Asked':'20 s'}</span>${done?`<span class="ch-res"><span class="ch-who-s">${esc(q.who)}</span><br>“${esc(q.a)}”</span>`:''}</button>`; }).join('');
  this.openSheet('Ask questions', `${this.c.askHint?`<p class="ch-hint">${esc(this.c.askHint)}</p>`:''}<div class="ch-acts">${rows}</div>`);
  this.$$('#chSheetBody [data-q]').forEach(b=>b.addEventListener('click',()=>{
    const i=+b.dataset.q, q=this.c.questions[i]; if(this.S.found.has('q'+i)) return;
    this.addTime(20); this.record('q'+i); if(q.bubble) this.say(q.bubble); this.askView();
  }));
};
CH.obsView = function(){
  if(this.S.busy) return; this.clearActive();
  const shown = this.S.found.has('obs'), o = this.c.obs;
  const v = shown ? o : {hr:'--',sp:'--',rr:'--',bp:'--/--',t:'--',bm:'--'};
  this.openSheet('Monitor', `<p class="ch-hint">${shown?'A full set of obs is on your notes.':'A full set of obs takes time. Try assessing by eye and hand first.'}</p>
    <div class="ch-monitor"><div class="v-hr"><small>HR</small><b>${v.hr}</b></div><div class="v-sp"><small>SpO₂</small><b>${v.sp}${shown && typeof v.sp==='number'?'%':''}</b></div><div class="v-rr"><small>RR</small><b>${v.rr}</b></div>
    <div class="v-bp"><small>BP</small><b>${v.bp}</b></div><div class="v-t"><small>TEMP °C</small><b>${v.t}</b></div><div class="v-bm"><small>BM mmol/L</small><b>${v.bm}</b></div></div>
    ${shown?'':'<button class="ch-btn ch-primary ch-wide" id="chOGo" style="margin-top:12px">Take a full set of obs · 90 s</button>'}`);
  if(!shown) this.$('#chOGo').addEventListener('click',()=>{ this.addTime(90); this.record('obs'); this.obsView(); });
};
CH.minClues = function(){ return Math.ceil((Object.keys(this.R).length - 1) * 0.35); };
CH.callView = function(){
  if(this.S.busy) return; this.clearActive();
  const few = [...this.S.found.keys()].filter(k=>k!=='doorway').length < this.minClues();
  this.openSheet('Make your call', `<p class="ch-hint">What’s your working impression?</p>
    <div class="ch-opts" role="radiogroup">${this.S.opts.map(o=>`<button class="ch-opt" role="radio" aria-checked="false" data-o="${o.id}">${esc(o.t)}</button>`).join('')}</div>
    ${few?'<p class="ch-hint ch-amber">You haven’t found many clues yet. You can still decide now, but it may cost you.</p>':''}
    <button class="ch-btn ch-primary ch-wide" id="chConfirm" disabled>Confirm</button>`);
  this.$$('#chSheetBody .ch-opt').forEach(b=>b.addEventListener('click',()=>{
    this.$$('#chSheetBody .ch-opt').forEach(x=>{ x.classList.remove('sel'); x.setAttribute('aria-checked','false'); });
    b.classList.add('sel'); b.setAttribute('aria-checked','true'); this.S.choice=b.dataset.o; this.$('#chConfirm').disabled=false;
  }));
  this.$('#chConfirm').addEventListener('click',()=>this.debrief());
};

/* ---------- doorway ---------- */
CH.doorway = function(){
  const dw = this.$('#chDoorway'); dw.hidden=false; let n=5; this.$('#chDcount').textContent=n;
  const iv = setInterval(()=>{ if(!dw.isConnected){ clearInterval(iv); return; } n--; this.$('#chDcount').textContent=n; if(n<=0){ clearInterval(iv); dw.hidden=true; this.impressionView(); } },1000);
};
CH.impressionView = function(){
  const c = this.c, who = c.patient.sex==='f' ? 'she' : 'he';
  this.openSheet('First impression', `<p class="ch-hint">From the doorway, how does ${esc(c.patient.name)} look?</p>
    <div class="ch-opts"><button class="ch-opt" data-i="sick">Seriously unwell</button><button class="ch-opt" data-i="unwell">Unwell but stable</button><button class="ch-opt" data-i="well">Looks well</button></div>`);
  this.$('#chSheetX').hidden = true;
  this.$$('#chSheetBody .ch-opt').forEach(b=>b.addEventListener('click',()=>{
    this.S.impression = b.dataset.i; this.addTime(10); this.record('doorway');
    this.$('#chSheetX').hidden = false; this.$('.ch-scene').classList.remove('ch-locked');
    const right = this.S.impression === c.doorway.correct;
    const label = {sick:'seriously unwell', unwell:'unwell but stable', well:'well'}[c.doorway.correct];
    this.$('#chSheetBody').innerHTML = `<div class="ch-result ${right?'':'warn'}">${right?'Agreed.':'Look again.'} ${esc(c.doorway.t)}. ${right?'':`That looks ${label}.`}</div>
      <p class="ch-hint" style="margin-top:10px">Now examine ${who==='she'?'her':'him'}. Tap the patient to start.</p><button class="ch-btn ch-primary ch-wide" id="chImpOk">Start examining</button>`;
    this.$('#chImpOk').addEventListener('click',()=>this.closeSheet());
  }));
};

/* ---------- debrief ---------- */
CH.debrief = function(){
  this.closeSheet();
  const c = this.c, S = this.S, R = this.R, found = S.found;
  const ids = Object.keys(R);
  const clueMax = ids.reduce((a,k)=>a+R[k].p,0), cluePts = [...found.keys()].reduce((a,k)=>a+R[k].p,0);
  const correct = S.choice === c.correct, inOrder = S.letters.join('')==='ABCDE';
  const tb = LEVELS[c.level].timeBonus, timeOk = S.clock <= tb;
  const premature = [...found.keys()].filter(k=>k!=='doorway').length < this.minClues();
  const rows = [
    ['Clues found', `${found.size} of ${ids.length}`, cluePts],
    ['Working impression', correct?'Correct':'Not this time', correct?50:0],
    ['First impression', S.impression===c.doorway.correct?'Spot on':'Missed', S.impression===c.doorway.correct?10:0],
    ['ABCDE in order', inOrder?'Yes':(S.letters.length===5?'All checked, out of order':`${S.letters.length} of 5 checked`), inOrder?30:0],
    ['Time on scene', `${fmt(S.clock)} (target ${fmt(tb)})`, timeOk?20:0]
  ];
  if(premature) rows.push(['Decided too early', `Fewer than ${this.minClues()} clues`, -30]);
  const max = clueMax+110, total = Math.max(0, rows.reduce((a,r)=>a+r[2],0)), pct = Math.round(total/max*100);
  saveBest(c.id, pct);
  const rating = pct>=80?'Thorough sweep':pct>=55?'Solid assessment':'Keep hunting';
  const keyIds = ids.filter(k=>R[k].key), otherIds = ids.filter(k=>!R[k].key);
  const li = k => `<li class="${found.has(k)?'f':'m'}"><span class="ch-mk">${found.has(k)?'✓':'·'}</span><span>${esc(R[k].t)}</span></li>`;
  const chosen = c.options.find(o=>o.id===S.choice), right = c.options.find(o=>o.id===c.correct);
  const list = this.cases.filter(x=>x.level===c.level), idx = list.indexOf(c), next = list[idx+1];
  this.root.innerHTML = `
    <div class="ch-debrief">
      <div class="ch-verdict"><div><div class="ch-eyebrow">Debrief · ${esc(c.patient.name)}, ${c.patient.age}</div>
        <h2>${correct?`<span class="ok">Correct:</span> ${esc(right.t.toLowerCase())}`:`<span class="bad">Not quite.</span> This was ${esc(right.t.toLowerCase())}`}</h2>
        <p>${correct?esc(c.summary):'You chose: '+esc(chosen?chosen.t:'')+'.'}</p></div>
        <div class="ch-score"><div class="n">${total}</div><small>of ${max} · ${rating}</small></div></div>
      ${!correct && c.wrong[S.choice] ? `<div class="ch-feedback"><b>Why not ${esc(chosen.t.toLowerCase())}?</b><br>${esc(c.wrong[S.choice])}</div>` : ''}
      <div class="ch-sep"><h3>${esc(c.separator.title)}</h3><p>${esc(c.separator.text)}</p></div>
      <div class="ch-cols">
        <div class="ch-panel"><h2><span>Score</span></h2><div class="ch-rows">${rows.map(r=>`<div><span>${esc(r[0])}<br><small>${esc(r[1])}</small></span><b class="${r[2]<0?'bad':''}">${r[2]>0?'+':''}${r[2]}</b></div>`).join('')}</div>
          <h2 style="margin-top:14px"><span>Your examination order</span></h2>
          <div class="ch-path">${S.letters.length?S.letters.map(L=>`<div class="ch-chip on">${L}</div>`).join(''):'<span class="ch-hint">No ABCDE checks made</span>'}</div>
          ${premature?'<p class="ch-hint">You decided early. You might have been right, but a look-alike would have caught you out.</p>':''}</div>
        <div class="ch-panel"><h2><span>Separating clues</span><span>${keyIds.filter(k=>found.has(k)).length}/${keyIds.length}</span></h2><ul class="ch-clist">${keyIds.map(li).join('')}</ul>
          <h2 style="margin-top:14px"><span>Other findings</span><span>${otherIds.filter(k=>found.has(k)).length}/${otherIds.length}</span></h2><ul class="ch-clist">${otherIds.map(li).join('')}</ul></div>
      </div>
      <div class="ch-panel ch-hollie"><img class="ch-av" src="images/hollie.png" alt="Hollie" loading="lazy"><div>
        <h2 style="margin-bottom:8px"><span>Hollie explains</span></h2>${c.explain.map(p=>`<p>${esc(p)}</p>`).join('')}</div></div>
      <div class="ch-end">${next?`<button class="ch-btn ch-primary ch-big" id="chNext">Next case: ${esc(next.patient.name)}</button>`:''}
        <button class="ch-btn ch-ghost ch-big" id="chAgain">Play again</button><button class="ch-btn ch-ghost ch-big" id="chHome">All cases</button></div>
      <p class="ch-policy">Clue Hunt teaches recognition and understanding only. For clinical management, follow JRCALC and your trust guidelines.</p>
    </div>`;
  if(next) this.$('#chNext').addEventListener('click',()=>this.brief(next.id));
  this.$('#chAgain').addEventListener('click',()=>this.start());
  this.$('#chHome').addEventListener('click',()=>this.home());
  window.scrollTo({top:0});
};

window.ClueHunt = ClueHunt;
})();
