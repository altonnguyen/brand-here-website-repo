# V4 Sitewide Migration Audit

Source of truth: production homepage V4 at commit `903174a8defad907ebfa19666b14061b4dbf2eec`.

## Classification

- A — style migration only: Intelligence, Insights, Experts, Partners, People & Business, Market & Brand, Approach, Radio, Game, Thank You and confirmation pages; EN/VI parity.
- B — composition correction: Adaptation, Services (`what-we-do`), Work, About and Labs; EN/VI parity.
- C — message sharpening: Contact only, limited to presentation of its existing headline and supporting statement; no copy rewrite.
- Legacy Concept 1/2/3 preview files are historical and excluded from production migration.

## Controlled implementation

- One shared internal-page stylesheet; homepage does not load it.
- Existing IA, content, routes, forms, Labs controls and scripts preserved.
- One restrained chapter-dot motif at internal page heroes; one Signal Red dot.
- Priority composition corrections are CSS-only and retain source order and semantics.

## Local acceptance evidence

- `scripts/qa-site.py`: PASS for all 49 EN/VI pages, metadata, structured data, IDs, local references, canonicals/hreflang and legacy positioning.
- Browser matrix: PASS for 44 migrated pages at 1440, 1280, 1024, 768, 430, 390 and 375 px (308 page/viewport combinations).
- Zero horizontal overflow and zero visible broken image assets across the matrix.
- Priority visual review: Adaptation, Services, Work, About, Labs and Contact checked in EN/VI at desktop and mobile widths.
- Adaptation/Labs hero contrast corrected to ivory × near-black after selector-level regression detection.
- Advisory and Commerce Lab scripts use null-safe control binding so shared scripts do not throw when a page omits an optional panel.
- Homepage regression lock: no diff in `index.html`, `vi/index.html`, `css/homepage-editorial-2026.css` or any of the eight `images/image-v4/` assets.
- JavaScript syntax, `git diff --check` and Wrangler production-bundle dry-run: PASS.
