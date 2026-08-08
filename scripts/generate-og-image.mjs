import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas, GlobalFonts } from '/Users/altonnguyen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@napi-rs/canvas/index.js';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const brandRoot = path.resolve(repo, '..', '..');

GlobalFonts.registerFromPath(
  path.join(brandRoot, 'Brand-Assets/Font/Cormorant_Garamond/static/CormorantGaramond-Medium.ttf'),
  'Cormorant Garamond'
);
GlobalFonts.registerFromPath('/Users/altonnguyen/Library/Fonts/Inter-Regular.ttf', 'Inter');
GlobalFonts.registerFromPath('/Users/altonnguyen/Library/Fonts/Inter-Medium.ttf', 'Inter Medium');

const canvas = createCanvas(1200, 630);
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#F6F1E7';
ctx.fillRect(0, 0, 1200, 630);
ctx.fillStyle = '#B8860B';
ctx.fillRect(0, 0, 18, 630);

ctx.fillStyle = '#0C2340';
ctx.beginPath();
ctx.moveTo(890, 0);
ctx.lineTo(1200, 0);
ctx.lineTo(1200, 630);
ctx.lineTo(1040, 630);
ctx.bezierCurveTo(1092, 535, 1112, 427, 1092, 324);
ctx.bezierCurveTo(1072, 219, 1006, 100, 890, 0);
ctx.fill();

ctx.fillStyle = '#122F52';
ctx.globalAlpha = 0.9;
ctx.beginPath();
ctx.moveTo(975, 0);
ctx.lineTo(1200, 0);
ctx.lineTo(1200, 630);
ctx.lineTo(1110, 630);
ctx.bezierCurveTo(1150, 526, 1162, 417, 1140, 307);
ctx.bezierCurveTo(1118, 197, 1064, 93, 975, 0);
ctx.fill();
ctx.globalAlpha = 1;

ctx.fillStyle = '#0C2340';
ctx.font = '500 38px "Cormorant Garamond"';
ctx.fillText('BRAND HERE', 82, 98);
ctx.fillStyle = '#B8860B';
ctx.fillRect(82, 130, 168, 3);

ctx.fillStyle = '#0C2340';
ctx.font = '500 76px "Cormorant Garamond"';
ctx.fillText('Strategy that survives', 82, 246);
ctx.fillText('contact with reality.', 82, 324);

ctx.fillStyle = '#516078';
ctx.font = '25px Inter';
ctx.fillText('Brand, growth and transformation for businesses', 86, 398);
ctx.fillText('moving into their next chapter.', 86, 436);

ctx.fillStyle = '#B8860B';
ctx.beginPath();
ctx.arc(92, 530, 5, 0, Math.PI * 2);
ctx.fill();
ctx.fillStyle = '#0C2340';
ctx.font = '17px "Inter Medium"';
ctx.letterSpacing = '3.4px';
ctx.fillText('INSIGHT TO IMPACT', 111, 537);

fs.writeFileSync(path.join(repo, 'images/og-image.png'), canvas.toBuffer('image/png'));

