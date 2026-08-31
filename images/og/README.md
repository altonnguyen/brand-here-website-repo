# Production Open Graph artwork

Approved page mapping:

- Home → `home.jpg`
- About → `about.jpg`
- Adaptation → `adaptation.jpg`
- Labs → `labs.jpg`
- Intelligence → `intelligence.jpg`
- Insights → `insights.jpg`
- Work → `work.jpg`

The approved source artworks are stored in `Website/thumbnail/`. Production derivatives are 1200 × 630 px, JPG, sRGB and no more than 250 KB. The centralized route mapping lives in `src/index.js`; EN and VI share the correct page artwork. Static HTML retains `images/og-concept-3.jpg`, while the Worker emits the mapped page image for both `og:image` and `twitter:image` only after confirming that its production JPEG exists and is valid.
