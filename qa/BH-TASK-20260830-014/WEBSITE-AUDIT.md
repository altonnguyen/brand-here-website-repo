# Brand Here Production Website Audit

Task: `BH-TASK-20260830-014`
Scope: SEO, Concept 3.2 design, responsive behaviour, English/Vietnamese content
Audited: 2026-08-30
Production baseline: `cf2a8e7eff07281aecdb37533c104df5e74a7126`

## Outcome

Status: DEPLOYED AND VERIFIED

Candidate commit: `336cf71`
Candidate tree: `878c88fa84d1f866dfcbc686562a68f6465781d2`
Candidate archive SHA-256: `4ab4ceb7dfff9b6133416e683488349e990dc83ea46e02b2ad76a6d10e78ee96`
Candidate tag: `concept-3.2-audit-fixes-candidate-20260830`
Cloudflare version: `fa3dd97d-836f-498f-aeb7-67598ab4622a`
Production URL: `https://brandhere.co`

The audit found and corrected material issues without changing the approved Concept 3 visual system:

1. Homepage section labels outside the hero inherited absolute positioning and overlapped inside the hero, especially on mobile.
2. Homepage primary navigation disappeared below 900 px without an accessible replacement.
3. Canonical and sitemap URLs used `.html` while Cloudflare's default static-asset routing redirects them to extensionless URLs.
4. Open Graph, Twitter Card and `x-default` hreflang coverage was inconsistent across indexable pages.
5. Sitemap alternates were incomplete and included a legacy alias whose canonical points to Adaptation.
6. Several content-card sections skipped heading levels.
7. Key images lacked intrinsic dimensions, increasing layout-shift risk.
8. The Vietnamese homepage omitted the Intelligence, ecosystem and Labs sections and carried less decision context than English.
9. Several Vietnamese meta descriptions were too short to explain the page meaningfully.

## Corrections

- Scoped non-hero section labels to normal document flow; preserved the hero label treatment.
- Added an accessible EN/VI mobile menu with `aria-expanded`, Escape-to-close and link-close behaviour.
- Standardized canonicals, social URLs, sitemap entries and internal navigation on Cloudflare's extensionless canonical format.
- Completed Open Graph, Twitter Card, `og:locale` and `x-default` metadata on indexable pages.
- Regenerated a valid bilingual sitemap with paired EN/VI/x-default alternates where counterparts exist.
- Preserved `what-we-do` as a historical alias canonicalized to Adaptation and excluded it from the sitemap.
- Corrected card heading hierarchy and retained existing visual styling.
- Added real intrinsic dimensions for approved production imagery.
- Expanded the Vietnamese homepage to the same strategic architecture as English, using Vietnamese display typography governed by Concept 3.
- Strengthened short Vietnamese descriptions for Adaptation, Approach and Insights.

## Verification

- Static QA: PASS across 49 English/Vietnamese pages.
- Extended SEO/content audit: `0 HIGH / 0 MEDIUM / 0 LOW`.
- Sitemap XML validation: PASS.
- HTML diff whitespace validation: PASS.
- Responsive browser check: PASS at 1280 × 800 and 390 × 844.
- Horizontal overflow: none at tested sizes.
- Mobile navigation: PASS; keyboard state and accessible labels verified.
- Browser console warnings/errors on preview: none.
- Concept 3 compliance: PASS. Palette, approved typography, logo treatment, editorial image and controlled Signal Red use are unchanged.
- Isolated Wrangler dry-run: PASS; 152 deployable assets discovered.

## Boundaries

- Production deployment was executed only after explicit CEO approval of exact candidate `336cf71`.
- Full lab Core Web Vitals were not captured because Chrome DevTools MCP was unavailable; this report does not invent CWV values.
- Contact/RSVP forms were not submitted, so no external communication or personal data was transmitted.

## Post-deployment verification

- Public route smoke test: PASS for homepage, core practices, Labs, About, Contact and Vietnamese routes.
- Public assets: PASS for Concept 3.2 CSS and homepage JavaScript.
- Public sitemap: valid XML with extensionless canonical URLs.
- Public metadata: mobile navigation, Twitter metadata, Open Graph locale and EN/VI strategic sections confirmed.
- Live mobile viewport: 390 × 844, no horizontal overflow, seven menu destinations available.
- Live browser console: no warnings or errors.

## Restore point

- Tag: `concept-3.2-production-before-audit-fixes-20260830`
- Commit: `cf2a8e7eff07281aecdb37533c104df5e74a7126`
