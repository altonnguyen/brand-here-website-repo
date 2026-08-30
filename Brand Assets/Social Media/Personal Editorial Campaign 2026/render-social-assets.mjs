import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
const sharp = require('/Users/altonnguyen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');

const fontData = (path) => readFileSync(path).toString('base64');
const italiana = fontData('/Users/altonnguyen/Library/Fonts/Italiana-Regular.ttf');
const cormorant = fontData('/Users/altonnguyen/Library/Fonts/CormorantGaramond-SemiBold.ttf');
const dmMono = fontData('/Users/altonnguyen/Library/Fonts/DMMono-Regular.ttf');

const embeddedFonts = `
  @font-face { font-family: 'BH Italiana'; src: url(data:font/ttf;base64,${italiana}) format('truetype'); font-weight: 400; }
  @font-face { font-family: 'BH Cormorant'; src: url(data:font/ttf;base64,${cormorant}) format('truetype'); font-weight: 600; }
  @font-face { font-family: 'BH DM Mono'; src: url(data:font/ttf;base64,${dmMono}) format('truetype'); font-weight: 400; }
`;

const width = 1122;
const height = 1402;
const ivory = '#F3F0E8';
const red = '#E03C31';

const files = [
  {
    input: '01-more-than-an-agency-base.png',
    output: '01-more-than-an-agency-final.png',
    overlay: `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          ${embeddedFonts}
          .display { font-family: 'BH Italiana'; font-weight: 400; }
          .mono { font-family: 'BH DM Mono'; font-weight: 400; letter-spacing: 2.2px; }
          .brand { font-family: 'BH Cormorant'; font-weight: 600; letter-spacing: 1.8px; }
        </style>
        <text x="62" y="78" class="mono" fill="${red}" font-size="13">BRAND HERE / REINTRODUCED</text>
        <text x="58" y="167" class="display" fill="${ivory}" font-size="71">More than</text>
        <text x="58" y="236" class="display" fill="${ivory}" font-size="71">an agency.</text>
        <line x1="62" y1="272" x2="296" y2="272" stroke="${red}" stroke-width="2"/>
        <text x="62" y="307" class="mono" fill="${ivory}" font-size="10">STRATEGY / AI / BRAND / COMMERCE</text>
        <text x="62" y="1332" class="brand" fill="${ivory}" font-size="25">BRAND<tspan fill="${red}"> HERE</tspan></text>
        <text x="1060" y="1330" text-anchor="end" class="mono" fill="${ivory}" font-size="9">FASHION · INTERIORS · LIFESTYLE · CONNECTION</text>
      </svg>`
  },
  {
    input: '02-business-can-have-taste-base.png',
    output: '02-business-can-have-taste-final.png',
    overlay: `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          ${embeddedFonts}
          .display { font-family: 'BH Italiana'; font-weight: 400; }
          .mono { font-family: 'BH DM Mono'; font-weight: 400; letter-spacing: 2.2px; }
          .brand { font-family: 'BH Cormorant'; font-weight: 600; letter-spacing: 1.8px; }
        </style>
        <text x="58" y="72" class="mono" fill="${red}" font-size="13">CREATIVE CULTURE / 02</text>
        <text x="56" y="151" class="display" fill="${ivory}" font-size="65">A business can</text>
        <text x="56" y="216" class="display" fill="${ivory}" font-size="65">have taste.</text>
        <text x="60" y="254" class="mono" fill="${ivory}" font-size="10">WHAT I LIKE SHAPES HOW I THINK.</text>
        <text x="62" y="1332" class="brand" fill="${ivory}" font-size="25">BRAND<tspan fill="${red}"> HERE</tspan></text>
        <text x="1060" y="1330" text-anchor="end" class="mono" fill="${ivory}" font-size="9">HUMAN JUDGEMENT / CULTURAL CURIOSITY</text>
      </svg>`
  }
];

for (const asset of files) {
  await sharp(asset.input)
    .composite([{ input: Buffer.from(asset.overlay), top: 0, left: 0 }])
    .png({ compressionLevel: 9 })
    .toFile(asset.output);
}
