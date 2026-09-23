# Alton Nguyen — digital namecard

Production route: https://brandhere.co/alton/

- `index.html` references the existing master wordmark at `../images/homepage-2026/brand-here-master-color.svg` and uses Playfair Display + Manrope.
- `alton-nguyen.vcf` is the full downloadable contact, including the LinkedIn field and descriptor.
- `qr-vcard-direct.svg` is a standard QR containing a compact vCard with name, company, role, mobile, email, website and city. `qr-vcard-direct.png` is its raster companion. The QR is self contained; no redirect service is involved.
- `Alton-Nguyen-Brand-Here-Share-1080x1920.png` is the static share asset. The Share button invokes the native share sheet when file sharing is supported and falls back to downloading the PNG.
- Physical NFC tags should contain a single NDEF URL record: `https://brandhere.co/alton/`.

After each deployment, check the exact live assets, scan the page and share image QR, import the VCF on iPhone and Android, and verify native sharing in installed apps. Apple Wallet requires a Pass Type ID certificate and its private signing key before a valid `.pkpass` can be shipped.
