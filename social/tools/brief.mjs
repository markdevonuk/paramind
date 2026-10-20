// Paramind Brief: renders a TikTok photo carousel (3:4, 1080x1440) from a content JSON file.
// Usage: node brief.mjs <content.json> <output-folder>
// Prints one line per slide; any line containing "OVERFLOW" means text would not fit.
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const [CONTENT, OUT] = process.argv.slice(2);
if (!CONTENT || !OUT) { console.error('Usage: node brief.mjs <content.json> <output-folder>'); process.exit(1); }
const brief = JSON.parse(fs.readFileSync(CONTENT, 'utf8'));
const stories = brief.stories;
if (!Array.isArray(stories) || stories.length < 3 || stories.length > 5) {
  console.error('content.json must contain 3 to 5 stories'); process.exit(1);
}

const here = path.dirname(new URL(import.meta.url).pathname);
const fontDir = path.join(here, 'node_modules/@fontsource');
const ff = (fam, file, w) => `@font-face{font-family:'${fam}';font-weight:${w};src:url('file://${fontDir}/${file}') format('woff2');}`;
const FONTS = [500, 600, 700, 800].map(w => ff('Plus Jakarta Sans', `plus-jakarta-sans/files/plus-jakarta-sans-latin-${w}-normal.woff2`, w)).join('')
  + [400, 500, 700].map(w => ff('DM Sans', `dm-sans/files/dm-sans-latin-${w}-normal.woff2`, w)).join('');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// TikTok shows photo posts in a 3:4 window. Margins measured from a real screenshot (Oct 2026):
// search/tabs bar covers the top ~108px; like/comment rail covers x>930 below y~850;
// "friends liked" bubbles sit at x<165, y 1013-1306.
const f = { w: 1080, h: 1440, pad: '150px 160px 110px 130px', gap: 28, h2: 60, body: 31, why: 29, whyPad: '30px 40px', h1: 80, lead: 32, cta: 36 };
const PJ = "font-family:'Plus Jakarta Sans',sans-serif";
const px = n => `calc(var(--s) * ${n}px)`;
const WORDS = { 3: 'Three', 4: 'Four', 5: 'Five' };
const total = String(stories.length).padStart(2, '0');

function frame(bg, color, inner, extra = '') {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>${FONTS}body{margin:0}:root{--s:1}</style></head><body>
<div style="position:relative;width:${f.w}px;height:${f.h}px;overflow:hidden;background:${bg};color:${color};font-family:'DM Sans',sans-serif">
<div id="col" style="width:${f.w}px;height:${f.h}px;box-sizing:border-box;padding:${f.pad};display:flex;flex-direction:column;${extra}">${inner}</div></div></body></html>`;
}

const intro = () => frame('#237282', '#FFFFFF', `
<div style="display:flex;flex-direction:column;gap:10px">
  <div style="${PJ};font-weight:800;font-size:42px;letter-spacing:-0.5px">Paramind</div>
  <div style="font-size:26px;font-weight:500;color:#D6EEF2">${esc(brief.date)}</div>
</div>
<div style="display:flex;flex-direction:column;align-items:flex-start;gap:${f.gap + 4}px">
  <div style="${PJ};font-size:26px;font-weight:700;letter-spacing:5px;padding:12px 28px;border-radius:999px;background:#5BC166;color:#1F2A2E">THE BRIEF</div>
  <h1 style="margin:0;${PJ};font-weight:800;font-size:${px(f.h1)};line-height:1.03;letter-spacing:-2px">${WORDS[stories.length]} stories from across UK ambulance services</h1>
  <p style="margin:0;font-size:${px(f.lead)};line-height:1.38;color:#D6EEF2">What’s moving in the profession, in under a minute.</p>
</div>
<div style="display:flex;justify-content:space-between;align-items:center;border-top:2px solid #3E8D9C;padding-top:28px">
  <div style="font-size:24px;color:#D6EEF2">UK ambulance &amp; paramedic news</div>
  <div style="display:flex;align-items:center;gap:14px;${PJ};font-size:30px;font-weight:700">Swipe
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="M13 6l6 6-6 6"></path></svg></div>
</div>`, 'justify-content:space-between');

const story = (s, i) => frame('#F4F7F8', '#1F2A2E', `
<div style="display:flex;justify-content:space-between;align-items:center">
  <div style="${PJ};font-size:26px;font-weight:700;padding:12px 28px;border-radius:999px;background:#237282;color:#FFFFFF">${esc(s.region)}</div>
  <div style="${PJ};font-size:30px;font-weight:700;letter-spacing:2px;color:#237282">0${i} / ${total}</div>
</div>
<h2 style="margin:0;${PJ};font-weight:800;font-size:${px(f.h2)};line-height:1.07;letter-spacing:-1.3px">${esc(s.headline)}</h2>
<p style="margin:0;font-size:${px(f.body)};line-height:1.43;color:#3A464B">${esc(s.body)}</p>
<div style="margin-top:auto;background:#237282;color:#FFFFFF;border-radius:26px;padding:${f.whyPad};display:flex;flex-direction:column;gap:12px">
  <div style="display:flex;align-items:center;gap:14px;${PJ};font-size:23px;font-weight:700;letter-spacing:4px"><div style="width:15px;height:15px;border-radius:50%;background:#5BC166"></div>WHY IT MATTERS</div>
  <div style="font-size:${px(f.why)};line-height:1.38">${esc(s.why)}</div>
</div>
<div style="display:flex;justify-content:space-between;align-items:center;font-size:24px;color:#55606A">
  <div>Source: ${esc(s.source)}</div>
  <div style="${PJ};font-weight:800;font-size:30px;color:#2B8A9C">Paramind</div>
</div>`, `gap:${f.gap}px`);

const outro = () => frame('#237282', '#FFFFFF', `
<div style="${PJ};font-weight:800;font-size:42px;letter-spacing:-0.5px">Paramind</div>
<div style="display:flex;flex-direction:column;gap:${f.gap + 4}px">
  <h2 style="margin:0;${PJ};font-weight:800;font-size:${px(f.h1)};line-height:1.03;letter-spacing:-2px">Stay sharp between shifts.</h2>
  <p style="margin:0;font-size:${px(f.lead)};line-height:1.4;color:#D6EEF2">Revision, patient scenarios and interview practice with Hollie, built for UK paramedics.</p>
  <div style="display:flex;flex-direction:column;align-items:flex-start;gap:20px">
    <div style="${PJ};font-size:${f.cta}px;font-weight:700;padding:22px 40px;border-radius:999px;background:#5BC166;color:#1F2A2E">paramind.co.uk</div>
    <div style="font-size:30px;font-weight:500">Follow for the next brief</div>
  </div>
</div>
<div style="border-top:2px solid #3E8D9C;padding-top:28px;font-size:22px;line-height:1.4;color:#D6EEF2">Educational content only. News summarised from the sources credited on each slide.</div>`, 'justify-content:space-between');

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: f.w, height: f.h } });
const slides = [['01-intro', intro()], ...stories.map((s, k) => [`0${k + 2}-story${k + 1}`, story(s, k + 1)]), [`0${stories.length + 2}-outro`, outro()]];
let failed = false;
for (const [name, html] of slides) {
  const file = path.join(OUT, name + '.html');
  fs.writeFileSync(file, html);
  await page.goto('file://' + file);
  await page.evaluate(() => document.fonts.ready);
  // Shrink text a little (down to 80%) if anything would spill outside the safe area
  const res = await page.evaluate(() => {
    const col = document.getElementById('col');
    let s = 1;
    const over = () => col.scrollHeight > col.clientHeight + 1;
    while (over() && s > 0.8) { s -= 0.02; document.documentElement.style.setProperty('--s', s); }
    return { scale: Math.round(s * 100) / 100, overflow: over() };
  });
  await page.screenshot({ path: path.join(OUT, name + '.png') });
  fs.unlinkSync(file);
  if (res.overflow) failed = true;
  console.log(`${name}: scale ${res.scale}${res.overflow ? '  OVERFLOW' : ''}`);
}
await browser.close();
process.exit(failed ? 2 : 0);
