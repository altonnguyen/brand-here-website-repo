# Concept 3.2 Duplicate / Legacy Text Audit

Date: 2026-08-31  
Branch: `concept-3-2-playfair-footer`  
Deployment: not performed

## Scope

Audited EN and VI versions of home, About, Adaptation, Labs, Intelligence, Insights and Work, plus shared navigation, heroes, labels, cards, interactive states and footers. Runtime QA covered 1440x900, 768x1024 and 390x844.

## Issues found and corrected

1. Every current header/footer wordmark link retained obsolete `.brand-word` and `.here-word` text spans. CSS moved that text off screen with `text-indent:-9999px` while the approved raster wordmark was painted as a background. The spans and the hiding rule were removed. Each logo link now has one approved visual layer and an explicit `aria-label="Brand Here"`.
2. The shared sonic control still declared legacy `DM Mono`. It now uses `Manrope, Arial, sans-serif`; the required Manrope weight is loaded. All pages use the cache-busted `sonic.js?v=2` reference.
3. Minified homepage markup omitted semantic whitespace at several inline/block boundaries. This produced concatenated DOM text such as `Business has to adapt.People`, `approved.Your teams` and `change.Deloitte`. EN/VI primary-page boundaries and line-break transitions now include whitespace.
4. Small editorial labels were visually fragile at the previous raster size. The canonical label treatment is now one unsplit text node using Manrope 600 at 12px/1.35 with 0.12em tracking, normal fill, no stroke, shadow, blend, mask, clip, filter, transform or opacity stacking, and native font smoothing.
5. The archived `next-stage.html` source retained a Cormorant heading declaration and a legacy logo-span selector. The heading now follows the approved Playfair Display major-heading system; the obsolete selector was removed. The route redirect policy is unchanged.

## DOM and CSS findings

- Exact-coordinate visible text duplicate scan: zero matches across 42 route/viewport combinations.
- Hero stacking scan: zero overlapping visible text layers.
- Each audited hero contains exactly one eyebrow/kicker node.
- The homepage eyebrow is a single text node with zero child spans.
- Active primary-route CSS/JS contains no Instrument Serif, Cormorant Garamond, DM Mono or Italiana references.
- Runtime pseudo-element text is limited to structural arrows and slash separators. No phrase or slogan is emitted by `::before`/`::after`.
- Current hidden nodes are legitimate responsive navigation or interactive states (`home-menu`, `mobile-toggle`, navigation variants, gap/stage interaction states and scroll reveals). They do not duplicate canonical copy and were retained.
- No horizontal overflow was detected.

Historical Concept 2 prototype styles remain in their explicitly superseded, non-production prototype files. They are not loaded by any audited Concept 3.2 route and were not rewritten.

## QA result

- `scripts/qa-site.py`: PASS, 49 EN/VI pages.
- JavaScript syntax: PASS.
- Browser console: zero errors across the 42-view audit.
- Font runtime: Manrope 600 loaded; final label computed style is `600 12px / 16.2px Manrope, Arial, sans-serif`, `letter-spacing: 1.44px` (0.12em).
- Responsive screenshots: 42/42 captured successfully.
- Production packaging: PASS, Wrangler 4.127.1 dry-run; no deployment.

## Candidate status

The duplicate/legacy cleanup is technically complete. No production deployment was performed.
