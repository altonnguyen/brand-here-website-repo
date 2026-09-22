# Alton Nguyen — Digital Namecard Production

## Live target

- Digital card: `https://brandhere.co/alton/`
- Downloadable vCard: `https://brandhere.co/alton/alton-nguyen.vcf`
- NFC payload: `https://brandhere.co/alton/`

## Contact source of truth

- Name: ALTON NGUYEN
- Organization: Brand Here
- Title: Founder & Managing Director
- Mobile: +84 767 459 331
- Email: alton@brandhere.co
- Website: https://brandhere.co
- LinkedIn: https://www.linkedin.com/in/nguyenanhtuan278
- Location: Ho Chi Minh City, Vietnam
- Descriptor: BRAND & MARKETING × BUSINESS ADAPTATION

## Production behavior

The on-card QR embeds the vCard payload directly, so scanning can resolve the contact without depending on a redirect or QR service. The page also provides a downloadable `.vcf` and a Share Namecard action that renders a 1080 × 1920 PNG in the browser using the current Brand Here master SVG and approved Playfair Display + Manrope typography.

For iPhone-to-iPhone sharing, import the vCard into Contacts, make it the owner's My Card, and use Apple NameDrop. NameDrop always requires the receiving user to confirm the exchange; a website or Wallet pass cannot silently save a contact by touching two phones.

For a physical NFC card/tag, write a standard NDEF URL record containing `https://brandhere.co/alton/`. This keeps the NFC payload updateable because future contact changes can be made on the page without reprogramming the tag.

## Apple Wallet

An installable Apple Wallet `.pkpass` must be signed with a valid Apple Pass Type ID certificate and its private key. Do not publish an unsigned or self-signed pass as production. The Wallet pass can be added after Brand Here has an Apple Developer Pass Type identifier and signing workflow; it should point back to the same `/alton/` contact source.

## Brand governance

Use `../images/homepage-2026/brand-here-master-color.svg` as the wordmark source. Do not redraw the logo. Current type system: Playfair Display for display/editorial typography and Manrope for body/UI. Do not use retired taglines on this card.
