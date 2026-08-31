# Concept 3.2 Final Production and Lock Report

Branch: `concept-3-2-finalization`

Merge: not performed

Deployment: not performed
Date: 2026-08-31

## Commits

- `1677f42` — Finalize Concept 3.2 editorial architecture and QA.
- `ea18a03` — Prepare Concept 3.2 production assets and routing.
- Final lock report — this report-only commit.
- Final asset-drop prep visual fix — collapse missing media, activate confirmed assets server-side, and correct Labs rhythm.
- `6c9ef3f` — integrate seven approved page artworks and replace English Italiana with CEO-approved Instrument Serif.

## Files changed in final production prep

- Cloudflare routing and metadata: `src/index.js`, `wrangler.jsonc`.
- Production visual governance: `Brand Assets/Concept-3.2/PRODUCTION-VISUAL-GOVERNANCE.md`.
- Asset-drop manifests: `images/og/README.md`, `images/editorial/README.md`.
- Thumbnail system: `js/editorial-images.js`, `css/style.css`, EN/VI Labs, Intelligence, Insights and Work pages.
- Archive policy: `game.html`, `radio.html`, `vi/game.html`, `vi/radio.html`.
- This report.

## Redirect implementation

The existing Cloudflare Worker and Static Assets binding remain the only routing system. Selective `assets.run_worker_first` paths invoke the current Worker for legacy redirects and page-specific OG processing.

Permanent 301 redirects:

- `/advisory-lab` and `/vi/advisory-lab` → `/labs` and `/vi/labs`.
- `/alignment-lab` and `/vi/alignment-lab` → `/labs` and `/vi/labs`.
- `/commerce-lab` and `/vi/commerce-lab` → `/market-brand` and `/vi/market-brand`.
- `/executive-ai-lab` and `/vi/executive-ai-lab` → `/labs` and `/vi/labs`.
- `/next-stage` → `/adaptation`; a defensive `/vi/next-stage` rule targets `/vi/adaptation` if that historical URL is requested.

`game`, `radio` and their VI equivalents remain functional, remain absent from the sitemap, and now carry `noindex,follow`.

## OG integration

The Worker checks the Static Assets binding for the mapped page-specific JPG. It rewrites both `og:image` and `twitter:image` only when the response is a valid JPEG. When absent, the current `images/og-concept-3.jpg` metadata is returned unchanged. EN and VI pages share the matching approved page asset.

Installed approved OG assets (1200 × 630 JPG, 88–168 KB):

- `images/og/home.jpg`
- `images/og/about.jpg`
- `images/og/adaptation.jpg`
- `images/og/labs.jpg`
- `images/og/intelligence.jpg`
- `images/og/insights.jpg`
- `images/og/work.jpg`

## Thumbnail integration

The seven approved source artworks from `Website/thumbnail/` are mapped as Home `(1)`, About `(3)`, Adaptation `(4)`, Labs `(5)`, Intelligence `(2)`, Insights `(6)` and Work `(7)`. They are published through `images/og/` and centrally mapped in `src/index.js`; the Worker emits the correct EN/VI OG and Twitter metadata only after asset validation. All seven load at their native production dimensions without cropping or stretching.

Labs, Intelligence, Insights and Work / Case Zero use governed 1200:630 media interfaces. Missing optional artwork collapses completely: no box, border, copy, skeleton or reserved space. The Cloudflare Worker checks the declared raster assets and marks only confirmed JPEGs available in the initial HTML response. This reserves the correct aspect ratio before paint; the loader then inserts the image lazily with asynchronous decoding and EN/VI alt text. Decorative Insights images use empty alt. Failures remain silent.

Missing editorial artwork:

- `images/editorial/labs/adoption-gap.jpg`
- `images/editorial/labs/marketing-model-after-ai.jpg`
- `images/editorial/labs/ai-brand-mirror.jpg`
- `images/editorial/labs/agency-model-2030.jpg`
- `images/editorial/intelligence/ai-adoption-index.jpg`
- `images/editorial/intelligence/marketing-adaptation-index.jpg`
- `images/editorial/intelligence/ai-reputation-intelligence.jpg`
- `images/editorial/intelligence/agency-model-diagnostic.jpg`
- `images/editorial/insights/technology-ready-business.jpg`
- `images/editorial/insights/access-adoption-impact.jpg`
- `images/editorial/insights/missing-middle.jpg`
- `images/editorial/insights/agency-faster-marketing-better.jpg`
- `images/editorial/insights/ai-customer-first-adviser.jpg`
- `images/editorial/work/case-zero.jpg`

## Sonic result

PASS. Both approved MP3 files remain unchanged and valid. All 24 primary EN/VI pages load `js/sonic.js`. The audited behavior remains silent by default, explicit activation, first-session sting followed by the 40-second cut, later activation of the cut only, one audio element, no loop, no autoplay, stop on hidden tab, and accessible SOUND / ÂM THANH controls.

## EN/VI content result

PASS. Each Insights page contains four governed editorial categories represented across five matching thesis entry points and three published field notes. No full future article or research claim was fabricated. Business Adaptation remains the category; AI remains an enabler. The approved line “Technology can be deployed. Adaptation has to be built.” remains unchanged.

## Typography result

PASS. BH-2026-008 replaces Italiana with Instrument Serif for English display/editorial typography. Manrope remains body, navigation and UI. Instrument Serif's published 374-glyph language list excludes Vietnamese, so Vietnamese display typography intentionally remains Cormorant Garamond. Browser inspection confirmed Instrument Serif for English H1, Cormorant Garamond for Vietnamese H1 and Manrope for body/UI with no diacritic or overflow regression.

## QA result

- `scripts/qa-site.py`: PASS, 49 pages.
- Wrangler 4.127.1 `deploy --dry-run`: PASS; no deployment created.
- Worker unit tests: PASS for EN/VI 301 destinations, query preservation, fallback retention and dual OG/Twitter switching.
- JavaScript syntax and JSONC parsing: PASS.
- Browser QA: PASS for the seven main EN/VI pages at 1440 × 900, 768 × 1024 and 390 × 844 (42 combinations), plus the prior 24-page two-viewport pass.
- All seven production OG images loaded in-browser at exactly 1200 × 630; no console warnings or errors.
- Visible `EDITORIAL IMAGE RESERVED`: 0. Visible empty media boxes: 0.
- No horizontal overflow, broken DOM images, missing-image console warnings/errors or unexpected sonic activation.
- Labs EN/VI visual rhythm: PASS after removing only the inherited older page-hero padding layer; Concept 3.2 hero height and section breathing room remain intact.
- Canonical, hreflang, sitemap, Open Graph, Twitter, JSON-LD, duplicate IDs, local links, focus-visible and reduced-motion checks: PASS.
- Approved audio assets exist and identify as stereo MPEG Layer III, 44.1 kHz.

## Blockers

The seven production OG images are integrated and verified. The fourteen optional editorial card images listed above remain absent; their approved text-only states remain active with no visible placeholder or empty media area. No merge or deployment was performed.

READY FOR FINAL ASSET DROP
