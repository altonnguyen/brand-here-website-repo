# BRAND HERE V4 — ABOUT PAGE RETIREMENT & FINAL IA CLEANUP REPORT

**Status:** APPROVED & DEPLOYED TO PRODUCTION  
**Date:** 2026-09-05  
**Environment:** Cloudflare Pages / Workers (`brandhere.co`)  
**Commit:** `c0b950c`  
**Worker Version:** `7fc9194f-8829-4843-ba0d-bc3580fc6550`

---

## 1. Executive Summary

In Brand Here V4, the standalone `/about` and `/vi/about` pages have been officially retired. The strategic responsibilities of the old About page are now distributed across the core V4 architecture:
- **Homepage:** Worldview, master positioning and strategic narrative.
- **Brand & Marketing:** Market-facing capability (*Change what people see, feel and do*).
- **Business Adaptation:** Organisational capability (*Change how organisations think, decide and operate*).
- **Experts:** Founder leadership (*Built on both sides of the table*), accountable strategic lead and specialist network.
- **Work:** Validated client evidence and case studies.
- **Partners:** Delivery ecosystem.
- **Life Sciences:** Vertical sector authority.

---

## 2. Permanent 301 Redirect Implementation

All traffic, search engine bots, and legacy bookmarks hitting `/about` or `/vi/about` are permanently redirected (HTTP 301) to the corresponding Experts endpoints.

### Redirect Map
| Source Route | HTTP Code | Destination Route |
| :--- | :--- | :--- |
| `https://brandhere.co/about` | `301 Moved Permanently` | `https://brandhere.co/experts` |
| `https://brandhere.co/about.html` | `301 Moved Permanently` | `https://brandhere.co/experts` |
| `https://brandhere.co/vi/about` | `301 Moved Permanently` | `https://brandhere.co/vi/experts` |
| `https://brandhere.co/vi/about.html` | `301 Moved Permanently` | `https://brandhere.co/vi/experts` |

### Technical Architecture
1. **Edge Router (`src/index.js`):**
   - Configured `PERMANENT_REDIRECTS` map inside Cloudflare Worker to intercept all requests matching `/about*` and `/vi/about*`.
   - Strips `.html` extensions automatically before destination resolution.
2. **Static Configuration (`_redirects`):**
   - Added Cloudflare Pages edge redirect rules as static fallback.
3. **Template Deletion:**
   - Physical files `about.html` and `vi/about.html` deleted and removed from repository tracking.

---

## 3. Founder Strategic Credibility in Experts

Alton Nguyen's profile card in `experts.html` and `vi/experts.html` succinctly preserves the founder strategic perspective (*Built on both sides of the table* / *Hiểu cả phía agency lẫn phía doanh nghiệp*):

### English (`/experts`)
> **Built on both sides of the table.** Founder of Brand Here with experience spanning agency leadership, multinational marketing, commercial strategy and business management.
>
> That perspective shapes how Brand Here approaches problems: understanding the brief, the commercial pressure behind it, and the operating reality required to turn strategy into execution.
>
> He provides accountable strategic leadership across Brand Here engagements, assembling proven practitioners around the problem when specialist depth is required.

### Vietnamese (`/vi/experts`)
> **Hiểu cả phía agency lẫn phía doanh nghiệp.** Nhà sáng lập Brand Here với kinh nghiệm trải dài từ agency, marketing tại tập đoàn đa quốc gia đến chiến lược thương mại và quản lý doanh nghiệp.
>
> Trải nghiệm từ cả hai phía định hình cách Brand Here tiếp cận bài toán: hiểu brief từ góc nhìn agency, hiểu áp lực kinh doanh từ phía client, và hiểu thực tế vận hành cần thiết để biến chiến lược thành thực thi.
>
> Anh giữ vai trò lãnh đạo chiến lược và trách nhiệm xuyên suốt các dự án của Brand Here, đồng thời tập hợp đúng chuyên gia khi bài toán cần chiều sâu chuyên môn.

---

## 4. Internal Link & Navigation Audit

A comprehensive codebase audit across all 49 HTML templates in EN and VI was performed:

### Cleaned Navigation
- **Header Navigation:** No About links exist across any page.
- **Footer Navigation (EN):**
  ```html
  <nav class="footer-nav" aria-label="Footer">
    <a href="market-brand">Brand &amp; Marketing</a>
    <a href="adaptation">Business Adaptation</a>
    <a href="insights">Insights</a>
    <a href="work">Work</a>
    <a href="contact">Contact</a>
  </nav>
  ```
- **Footer Navigation (VI):**
  ```html
  <nav class="footer-nav" aria-label="Chân trang">
    <a href="market-brand">Thương hiệu &amp; Marketing</a>
    <a href="adaptation">Thích ứng Doanh nghiệp</a>
    <a href="insights">Góc nhìn</a>
    <a href="work">Dự án</a>
    <a href="contact">Liên hệ</a>
  </nav>
  ```
- **Total Remaining Internal Links to About:** **0**

---

## 5. Sitemap & Metadata Synchronization

- **`sitemap.xml`:** Removed `<loc>https://brandhere.co/about</loc>` and `<loc>https://brandhere.co/vi/about</loc>`.
- **Worker Configuration:** Cleaned `OG_IMAGE_BY_PAGE` map to remove retired about routes.
- **Client Runtime (`js/vi-runtime.js`):** Removed `about.html` from auto-translation routes.

---

## 6. Verification Status

```
ABOUT EN REDIRECT: PASS
ABOUT VI REDIRECT: PASS
LEGACY ABOUT LINKS REMOVED: PASS
PUBLIC VERIFIED: YES
```
