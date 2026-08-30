# Concept 3.2 Finalization QA

Branch: `concept-3-2-finalization`

Deployment: not performed
Date: 2026-08-31

## Insights

- Reframed EN/VI Insights as a Business Adaptation thought-leadership field rather than a blog index.
- Added four matching editorial clusters: Business Adaptation; People & Adoption; Market & Brand; Leadership & Judgement.
- Added the five approved future thesis titles as clearly marked “in development” entry points only.
- Retained and categorised three existing field notes; no new research claims or case results were created.

## Editorial image interface

A reusable `1200 / 630` responsive slot with neutral absent-asset fallback is prepared for:

- Labs: four diagnostic cards in EN/VI.
- Intelligence / Research Signals: four diagnostic cards in EN/VI.
- Insights: five thesis entry points in EN/VI.
- Work / Case Zero: one Case Zero card in EN/VI.

No image, SVG or AI-generated placeholder asset was created. Existing photography was not changed.

## OG asset manifest

The current valid `images/og-concept-3.jpg` remains the live OG/Twitter fallback. Machine-readable `brandhere:og-image-target` metadata now records the intended per-page target for EN/VI variants. Production requires these seven files:

- `images/og/home.jpg`
- `images/og/about.jpg`
- `images/og/adaptation.jpg`
- `images/og/labs.jpg`
- `images/og/intelligence.jpg`
- `images/og/insights.jpg`
- `images/og/work.jpg`

Recommended production artwork dimensions: 1200 × 630 px.

## Legacy routes

All seven routes exist, have no inbound links from current HTML pages, and are absent from `sitemap.xml`.

| Route | Recommendation |
| --- | --- |
| `advisory-lab` | 301 to `/labs` |
| `alignment-lab` | 301 to `/labs` |
| `commerce-lab` | 301 to `/market-brand` |
| `executive-ai-lab` | 301 to `/labs` |
| `next-stage` | 301 to `/adaptation` |
| `game` | Archive and add `noindex`; no equivalent current destination |
| `radio` | Archive and add `noindex`; no equivalent current destination |

No route was deleted and no redirect/noindex was implemented in this branch.

## Sonic QA

- Both approved MP3 assets exist and were not modified.
- Primary EN/VI pages include `js/sonic.js`.
- Browser interaction verified: silent initial state; explicit action; first activation sting then official cut; later activation official cut only; one audio element; `loop=false`; no autoplay; accessible EN/VI labels.
- Source audit confirms stop on hidden tab/page exit and no automatic resume.

## Technical QA

- Existing `scripts/qa-site.py`: PASS across 49 EN/VI pages.
- HTML parser: balanced markup after editorial-slot integration.
- `git diff --check`: PASS.
- Canonical, hreflang, metadata, OG/Twitter fallback, sitemap, local links, duplicate IDs and existing JSON-LD checks: PASS.
- Reduced-motion rules and keyboard focus states: present; sonic button is a native accessible button.
- Manual browser inspection: home, adaptation, labs, intelligence, insights, work and about in EN/VI at 1440 × 900 and 390 × 844.
- Browser results: no broken images, no console warnings/errors, no horizontal overflow after scoped fixes.

## Blockers

- Seven approved production OG artworks are not yet supplied. The generic live fallback remains intentionally active.
- Final redirect/noindex policy for legacy routes remains a production-routing decision; recommendations are documented above and no destructive action was taken.

Status: READY FOR CHATGPT FINAL REVIEW
