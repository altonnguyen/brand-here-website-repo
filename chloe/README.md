# Nguyễn Thảo Nhi (Chloe) — Brand Here digital namecard

Target URL: https://brandhere.co/chloe/ — verify HTTP 200 before announcing as live.

Master logo is referenced from `../images/homepage-2026/brand-here-master-color.svg`. Fonts: Playfair Display and Manrope. QR embeds the vCard. The 1080×1920 share PNG contains the same vCard QR and the original logo paths. Physical NFC tags should use an NDEF URL record to `https://brandhere.co/chloe/`. The share button invokes the native file share sheet, falling back to PNG download. Apple Wallet requires a Pass Type ID certificate and its private signing key.

The repository source is on `main`. Check Cloudflare Workers & Pages → Worker `brand-here-website-repo` → Deployments / Builds. A successful production build must become the Active Deployment. Then verify `/chloe/`, `.vcf`, `.svg`, and `.png` with HTTP 200 and run physical iPhone/Android import/share/QR tests. Do not print or encode NFC tags until the route responds with HTTP 200.
