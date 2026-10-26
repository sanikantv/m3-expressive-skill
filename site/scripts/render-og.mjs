// Renders the Open Graph cards (public/og/*.png, 1200x630) and the GitHub social preview
// (../art/social-preview.png, 1280x640) with headless Chrome. Set in Google Sans Flex from
// public/fonts, decorated with real MaterialShapes paths from src/data/shapes.json.
// Run from site/: node scripts/render-og.mjs  (CHROME=/path/to/chrome to override)
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const chrome = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const { shapes } = JSON.parse(readFileSync(`${root}/src/data/shapes.json`, 'utf8'));
const path = (name) => shapes.find((s) => s.name === name).path;

const CARDS = {
  home: { eyebrow: 'Agent skill · material3 1.5.0-beta02', title: 'Material 3 Expressive<br><em>Compose code</em> your agent gets right', shape: 'Cookie9Sided' },
  components: { eyebrow: 'Components', title: 'Every M3 Expressive<br>component, <em>compiled</em>', shape: 'Clover4Leaf' },
  reference: { eyebrow: 'Reference', title: 'API status, springs,<br><em>shapes</em> and design rules', shape: 'Sunny' },
  guides: { eyebrow: 'Guides', title: 'M3 Expressive in<br>Jetpack Compose, <em>answered</em>', shape: 'SoftBurst' },
  docs: { eyebrow: 'expressive.sanikant.dev', title: 'Material 3 Expressive<br>for <em>Jetpack Compose</em>', shape: 'Pill' },
  social: { eyebrow: 'Agent skill for Claude Code · Codex · Cursor · Copilot', title: 'Material 3 Expressive<br><em>Compose code</em> your agent gets right', shape: 'Cookie9Sided', w: 1280, h: 640 },
};

const html = ({ eyebrow, title, shape, w = 1200, h = 630 }) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'Google Sans Flex';src:url('file://${root}/public/fonts/google-sans-flex-latin.woff2') format('woff2');font-weight:1 1000;font-stretch:25% 151%}
@font-face{font-family:'Material Symbols Rounded';src:url('file://${root}/public/fonts/material-symbols-rounded.woff2') format('woff2')}
*{margin:0;box-sizing:border-box}
body{width:${w}px;height:${h}px;overflow:hidden;background:#FEF7FF;font-family:'Google Sans Flex';color:#1D1B20;position:relative}
.card{position:absolute;inset:28px;border-radius:56px;background:#F3EDF7;padding:56px 72px 52px;display:flex;flex-direction:column;justify-content:space-between}
.top{display:flex;align-items:center;gap:18px;font-size:30px;font-weight:700;font-stretch:112%;font-variation-settings:'ROND' 100}
.top svg{width:56px;height:56px}
.eyebrow{display:inline-block;margin-top:28px;padding:10px 22px;border-radius:999px;background:#E8DEF8;color:#4A4458;font-size:24px;font-weight:600}
h1{font-size:58px;line-height:1.04;font-weight:780;font-stretch:118%;font-variation-settings:'ROND' 100;letter-spacing:-.02em;max-width:${w - 540}px}
h1 em{font-style:normal;color:#6750A4}
.foot{display:flex;gap:14px;font-size:22px;font-weight:600;color:#49454F}
.chip{padding:8px 18px;border-radius:12px;background:#FFFFFF}
.art{position:absolute;right:64px;top:50%;transform:translateY(-50%);width:330px;height:330px}
.art .bg{fill:#EADDFF}.art .fg{fill:#6750A4}
.mini{position:absolute;width:92px;height:92px}
</style></head><body>
<div class="card">
  <div>
    <div class="top"><svg viewBox="-4 -4 108 108"><path fill="#6750A4" d="${path('Cookie9Sided')}"/><path fill="#EADDFF" transform="translate(29 29) scale(.42)" d="${path('Clover4Leaf')}"/></svg>M3 Expressive Skill</div>
    <div class="eyebrow">${eyebrow}</div>
  </div>
  <h1>${title}</h1>
  <div class="foot"><span class="chip">28 snippets compile in CI</span><span class="chip">MIT</span><span class="chip">expressive.sanikant.dev</span></div>
</div>
<svg class="art" viewBox="-6 -6 112 112"><circle cx="50" cy="50" r="56" class="bg"/><path class="fg" transform="translate(14 14) scale(.72)" d="${path(shape)}"/></svg>
<svg class="mini" style="right:380px;top:70px" viewBox="0 0 100 100"><path fill="#FFD8E4" d="${path('Sunny')}"/></svg>
<svg class="mini" style="right:60px;bottom:60px;width:70px;height:70px" viewBox="0 0 100 100"><path fill="#7D5260" d="${path('Clover4Leaf')}"/></svg>
</body></html>`;

mkdirSync(`${root}/og-src`, { recursive: true });
mkdirSync(`${root}/public/og`, { recursive: true });
mkdirSync(`${root}/../art`, { recursive: true });
for (const [name, card] of Object.entries(CARDS)) {
  const file = `${root}/og-src/${name}.html`;
  writeFileSync(file, html(card));
  const out = name === 'social' ? `${root}/../art/social-preview.png` : `${root}/public/og/${name}.png`;
  execFileSync(chrome, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
    '--virtual-time-budget=3000', `--window-size=${card.w ?? 1200},${card.h ?? 630}`, `--screenshot=${out}`, `file://${file}`,
  ], { stdio: 'ignore' });
  console.log(`rendered ${out.replace(root, 'site/')}`);
}
