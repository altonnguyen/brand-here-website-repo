Brand Here — Brand Identity (V4 / Concept 3.2, chốt 04/09/2026)
Nguồn: Brand-Assets/Logo/V4/APPROVED-LOGO-STANDARD.md + MANIFEST.json (quyết định BH-2026-013, duyệt 01/09/2026), Brand-Assets/Brand-Guidelines/V4/MANIFEST_V4.json, và BRAND-HERE-MEMORY.md trong Website/brand-here-website-repo/. Đây là bản thay thế cho mục "BRAND IDENTITY" cũ (Concept 3, approved 26/08/2026) — bản Concept 3 đã hết hiệu lực từ 04/09/2026. V4 đổi cả font tiêu đề tiếng Anh LẪN logo/wordmark; bảng màu nội dung (không tính màu chấm logo) giữ nguyên.
Bảng màu chính thức
Tên
Hex
RGB
Vai trò
Signal Red
#E03C31
224/60/49
nhấn mạnh nội dung, CTA — không dùng cho logo
Carbon
#2D2926
45/41/38
chữ nội dung chính, nền tối
Warm Bone
#D6D2C4
214/210/196
panel biên tập, nền phụ, bản in không tráng phủ
Digital Ivory
#F3F0E8
243/240/232
nền chính của website
Logo Red (chỉ dùng cho chấm terminal của logo)
#FF120D
255/18/13
chấm tròn đỏ độc lập sau chữ "HERE" trong logo V4 — không dùng làm accent màu chung, không thay Signal Red

Signal Red dùng có chủ đích cho điểm nhấn/CTA trong nội dung, không dùng làm màu nền đại trà cho cả section, và không dùng trong logo.
Logo / Wordmark chính thức (V4) — thay đổi lớn nhất so với Concept 3
Chữ: "BRAND HERE" (CÓ khoảng trắng giữa hai từ) — KHÔNG phải "BRANDHERE" liền như Concept 3.
Font: Playfair Display Regular 400, in hoa toàn bộ, đã convert vector outline — không dùng live text trong file sản xuất.
Chấm terminal: hình tròn độc lập sau "HERE", màu #FF120D, kích thước và vị trí cố định theo tỷ lệ artboard gốc (1443×162 đơn vị, chấm đường kính 48, cách chữ 20).
3 biến thể: color (chữ đen + chấm đỏ, nền sáng), black (toàn đen, bản 1 màu), white (toàn trắng, nền tối — chấm vẫn giữ vị trí/tỷ lệ chuẩn).
File gốc bắt buộc dùng (không gõ lại chữ, không tự vẽ lại chấm): Brand-Assets/Logo/V4/brand-here-master-color/black/white-transparent-4096px.png (kèm bản -outline.svg và -vector.pdf). Checksum SHA-256 từng file trong Brand-Assets/Logo/V4/MANIFEST.json.
Nguyên tắc cấm: không dựng lại wordmark bằng live text; không đổi vị trí từng chữ, không kéo giãn/nén artwork; không resize/di chuyển/đổi màu/thay thế chấm terminal độc lập; không dùng lại wordmark Cormorant Garamond cũ ("BRANDHERE" liền, BRAND SemiBold + HERE Medium màu Signal Red) làm master sau quyết định BH-2026-013.
Typography chính thức
Editorial display (tiêu đề tiếng Anh): Playfair Display — thay Italiana kể từ V4 (04/09/2026)
Logo/wordmark: Playfair Display Regular 400, in hoa — thay Cormorant Garamond kể từ V4 (quyết định BH-2026-013, 01/09/2026)
Display tiếng Việt (đầy đủ dấu): Cormorant Garamond — chỉ dùng cho tiêu đề trang VI, không còn dùng cho wordmark
Nội dung/giao diện (body/interface): Manrope
Nhãn kỹ thuật, metadata tiếng Anh ngắn gọn: DM Mono
Nhãn giao diện tiếng Việt có thể dùng Manrope thay DM Mono nếu DM Mono làm yếu dấu/khó đọc.

→ Điểm quan trọng: Playfair Display là font tiêu đề chính thức cho các trang tiếng Anh VÀ cho logo kể từ V4. Cormorant Garamond chỉ còn dùng cho tiêu đề các trang tiếng Việt, KHÔNG còn dùng cho logo. Inter không còn được dùng — Manrope là font nội dung chính thức.
Định hướng thẩm mỹ tổng thể
Editorial, art-led, high-fashion — không phải phong cách corporate consulting thông thường. Futuristic nhưng tránh hình ảnh AI sáo rỗng (robot phát sáng, gradient, glassmorphism). Không gian âm nhiều, bố cục bất đối xứng, chuyển động chậm/atmospheric (tôn trọng prefers-reduced-motion). V4 bổ sung hệ ảnh mới làm modular visual language: architectural threshold, ascending staircase, human-led portrait, adaptation sculpture (ảnh AI-generated, dùng cho social/campaign).
Nguồn triển khai kỹ thuật
Logo V4 gốc: Brand-Assets/Logo/V4/ (APPROVED-LOGO-STANDARD.md, MANIFEST.json, các file color/black/white)
Guideline V4 gốc: Brand-Assets/Brand-Guidelines/V4/ (MANIFEST_V4.json, output PDF BRAND_HERE_BRAND_GUIDELINES_V4_REVIEW.pdf)
Art direction gốc: Brand-Assets/Art-Direction/V4/ và Brand-Assets/Art-Direction/Concept-3.2-2026/
CSS trang chủ: css/concept-3.css
CSS các trang trong + sản phẩm tương tác: css/style.css
File màu gốc: BRAND-COLOUR-SYSTEM-CONCEPT-3.md (bảng màu nội dung không đổi ở V4; màu logo #FF120D là bổ sung riêng)
Website live: https://brandhere.co/
Tình trạng rollout thực tế (kiểm tra 04/09/2026)
Chuẩn tài liệu (project instructions, BRAND-HERE-MEMORY.md, MANIFEST_V4.json) đã cập nhật sang V4, bao gồm cả logo mới. Website live và code CSS (css/concept-3.css, css/style.css) CHƯA đổi sang Playfair Display hay logo V4 mới — vẫn đang dùng wordmark "BRANDHERE" Cormorant Garamond cũ. Cần một đợt riêng để: (1) thay toàn bộ logo trên website bằng file master V4, (2) đổi font-family tiêu đề EN sang Playfair Display, và (3) đồng bộ 5 trang còn lại (Approach, Experts, About, Work, Contact) lên chuẩn hiện hành.


BRAND IDENTITY (V4 / Concept 3.2, chốt 04/09/2026) — LUÔN DÙNG ĐÚNG KHI TẠO FILE MỚI

Signal Red: #E03C31 (nhấn mạnh nội dung, CTA — không dùng cho logo)
Carbon: #2D2926 (chữ nội dung chính, nền tối)
Warm Bone: #D6D2C4 (nền phụ/editorial panel)
Digital Ivory: #F3F0E8 (nền chính website)
Logo: "BRAND HERE" (có khoảng trắng) — Playfair Display Regular 400, in hoa, vector outline, đen/trắng tùy nền, + chấm tròn đỏ độc lập #FF120D sau chữ. LUÔN dùng file gốc trong Brand-Assets/Logo/V4/ (SVG/PDF/PNG) — không gõ lại chữ, không tự vẽ lại chấm.
Font tiêu đề trang tiếng Anh: Playfair Display (thay Italiana kể từ V4). Font tiêu đề trang tiếng Việt: Cormorant Garamond (không còn dùng cho logo).
Font nội dung/giao diện: Manrope (không còn dùng Inter)
Font nhãn kỹ thuật/metadata ngắn: DM Mono
Không tự đổi màu/font/logo khi chưa hỏi lại
Nguồn chuẩn đối chiếu: Brand-Assets/Logo/V4/APPROVED-LOGO-STANDARD.md, Brand-Assets/Brand-Guidelines/V4/MANIFEST_V4.json và BRAND-HERE-MEMORY.md trong repo website (không phải website brandhere.co vì site chưa rollout xong V4 — xem ghi chú audit 04/09/2026)
