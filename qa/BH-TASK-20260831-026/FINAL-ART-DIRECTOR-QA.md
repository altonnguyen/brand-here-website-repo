# Concept 3.2 Final Art Director QA

Date: 2026-08-31  
Branch: `concept-3-2-finalization`  
Production baseline: `58ab4c2ed724b5fe4fdf3e47ba318328730a425b`  
Deployment: **NOT DEPLOYED**

## Baseline and hotfix preservation

The branch was fast-forwarded to the current production `main` baseline before implementation. Existing production typography, duplicate-layer, footer-signature, approved asset, sonic and metadata hotfixes remain present.

## Responsive and art-direction changes

- Standardized the canonical inner header/footer across the seven primary EN/VI routes while preserving the approved homepage chrome.
- Added a shared accessible inner-page mobile navigation controller, scroll lock, Escape/link close behavior and a tablet-safe 1180px collapse point.
- Corrected tablet prose containment, mobile Vietnamese width rules, major-heading word breaking and mobile hero-image overflow.
- Rebalanced homepage ecosystem, Practice panels and the adaptation layer for tablet/mobile without changing approved imagery, palette or desktop art direction.
- Strengthened Work hierarchy: Case Zero is the flagship; historical work is a secondary archive grid.
- Strengthened Insights hierarchy: featured thesis cluster plus lighter published field notes.
- Kept Labs cards and interactive results responsive and completed VI output localization.

## Duplicate eyebrow source and fix

The overlapping `BUSINESS ADAPTATION / THE AI ERA` and `04 / THE GAP AND NUMBERS` labels came from two legitimate `.hero-index` elements in different sections. The evidence-section label inherited the homepage hero's absolute-position rule and was pulled into the hero coordinate space. The evidence label is now statically positioned inside its own section. No approved copy was hidden or deleted.

## Markup cleanup

The VI Work archive contained a missing Roche card closing tag and an extra grid close, nesting the ISB card inside Roche and moving Dragon Capital outside the archive grid. The four archive cards are now canonical siblings. EN/VI Work content structure is aligned.

## Typography

- Major headings: Playfair Display only.
- Body, UI, eyebrow, kicker and section labels: Manrope only.
- Eyebrow checks found no serif fallback and no duplicate visible labels across the tested matrix.
- Vietnamese diacritics rendered correctly in representative mobile and desktop captures.

## Browser QA

Automated and visual browser QA covered 168 combinations: 14 EN/VI primary pages across 12 viewports.

Viewports: 1920x1080, 1728x1117, 1440x900, 1366x768, 1280x800, 1024x768, 834x1194, 768x1024, 430x932, 390x844, 375x812 and 360x800.

Checks passed:

- duplicate visible eyebrow/section labels: 0
- hero ghost/stacking layers: 0
- console errors: 0
- broken major-heading word rules: 0
- non-Manrope eyebrow/kicker labels: 0
- Work archive direct child cards: 4 EN / 4 VI
- horizontal visual overflow: 0 after the mobile hero containment correction
- header/footer, Practice panels, ecosystem, Labs, Work and Insights hierarchy visually reviewed at representative desktop/tablet/mobile sizes

## Automated QA and build

- `python3 scripts/qa-site.py`: PASS — 49 EN/VI pages; metadata, JSON-LD, IDs, local references, canonicals, hreflang and legacy positioning valid.
- `node --check`: PASS for all changed JavaScript.
- `git diff --check`: PASS.
- `npx wrangler deploy --dry-run`: PASS with Wrangler 4.127.1. Dry run exited without deployment.

## Governance

Approved Concept 3.2 imagery, Signal Red palette, typography system, copy facts, thumbnails and sonic creative were not redesigned or replaced. No merge and no production deployment occurred.

Final candidate status: **QA PASSED — NOT DEPLOYED**
