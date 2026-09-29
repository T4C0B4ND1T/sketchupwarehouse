#!/usr/bin/env node
// Renders the default social sharing image, public/og-default.png (1200x630).
//
// The card is plain HTML/CSS in the site's Swiss style: a framed white sheet,
// the Inter Black wordmark in black and Swiss Red, the homepage hero's Bauhaus
// composition, and a black base strip. Headless Chromium screenshots it.
//
// Usage:  npm run og-image [-- --out path/to/file.png]
//
// Needs a Chromium for Playwright. Install one once with:
//   npx playwright install chromium
// or point CHROMIUM_PATH at an existing Chrome/Chromium binary.
//
// Inter comes from the installed @fontsource-variable/inter package and is
// embedded in the page, so the render never falls back to a system font. The
// script exits non-zero if Inter fails to load.

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);

const outArg = process.argv.indexOf('--out');
const OUT = outArg > -1 ? path.resolve(process.argv[outArg + 1]) : path.join(root, 'public/og-default.png');

const fontDir = path.join(path.dirname(require.resolve('@fontsource-variable/inter/package.json')), 'files');
const font = fs.readFileSync(path.join(fontDir, 'inter-latin-wght-normal.woff2')).toString('base64');
const domain = fs.readFileSync(path.join(root, 'public/CNAME'), 'utf8').trim();

// Keep in step with the tokens in src/styles/global.css.
const html = /* html */ `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face { font-family: Inter; src: url(data:font/woff2;base64,${font}) format('woff2'); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 630px; overflow: hidden; background: #fff; color: #000; font-family: Inter; }

.sheet { position: absolute; inset: 0; border: 8px solid #000; display: grid; grid-template-columns: 780px 1fr; grid-template-rows: 1fr 72px; }
.label { font-size: 20px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; }
.label b { color: #cc2600; font-weight: 800; }

.copy { padding: 52px 56px 44px; display: flex; flex-direction: column; justify-content: space-between; border-right: 8px solid #000; }
.top { display: flex; align-items: center; gap: 20px; }
.mark { width: 64px; height: 64px; background: #ff3000; display: grid; place-items: center; }
h1 { font-size: 112px; font-weight: 900; line-height: .86; letter-spacing: -.06em; text-transform: uppercase; }
h1 span { display: block; color: #ff3000; }

.comp { position: relative; overflow: hidden;
  background-image: linear-gradient(to right, rgb(0 0 0 / .05) 1px, transparent 1px), linear-gradient(to bottom, rgb(0 0 0 / .05) 1px, transparent 1px);
  background-size: 24px 24px; }
.comp > * { position: absolute; }
.post { right: 26%; top: 0; bottom: 0; width: 4px; background: #000; }
.circle { width: 250px; height: 250px; top: 52px; right: 36px; border-radius: 50%; background: #ff3000; box-shadow: 0 0 0 16px rgb(255 48 0 / .1); }
.square { left: 44px; top: 52px; width: 92px; height: 92px; border: 8px solid #000; background: #fff radial-gradient(rgb(0 0 0 / .08) 1.5px, transparent 1.5px) 0 0 / 16px 16px; }
.block { left: 44px; bottom: 60px; width: 150px; height: 230px; background: #000; mix-blend-mode: multiply; }
.bar { right: 0; bottom: 120px; width: 66%; height: 8px; background: #000; }
.caption { left: 44px; bottom: 22px; font-size: 14px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; }

.base { grid-column: 1 / -1; display: flex; justify-content: space-between; align-items: center; padding: 0 56px; border-top: 8px solid #000; background: #000; color: #fff; }
.base .label { font-size: 18px; letter-spacing: .14em; }
.base .label b { color: #ff3000; }
</style></head>
<body><div class="sheet">
  <div class="copy">
    <div class="top">
      <div class="mark">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="square">
          <path d="M12 2.5 21 7.5v9L12 21.5 3 16.5v-9z"/><path d="M3 7.5l9 5 9-5M12 12.5v9"/>
        </svg>
      </div>
      <p class="label"><b>00.</b> Independent SketchUp journal</p>
    </div>
    <h1>SketchUp<span>Warehouse</span></h1>
  </div>
  <div class="comp">
    <div class="post"></div><div class="circle"></div><div class="square"></div>
    <div class="block"></div><div class="bar"></div>
    <div class="caption">Fig. 01 — Push / Pull</div>
  </div>
  <div class="base">
    <p class="label"><b>→</b> Tutorials · Extensions · Rendering · News</p>
    <p class="label">${domain}</p>
  </div>
</div></body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  if (!(await page.evaluate(() => document.fonts.check('900 40px Inter')))) {
    throw new Error('Inter did not load; refusing to render with a fallback font.');
  }
  await page.screenshot({ path: OUT });
  console.log(`Wrote ${path.relative(process.cwd(), OUT) || OUT}`);
} finally {
  await browser.close();
}
