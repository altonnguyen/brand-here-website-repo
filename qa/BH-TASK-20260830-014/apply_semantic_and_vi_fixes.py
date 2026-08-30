#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[2]


def replace_once(path, old, new):
    source = path.read_text(encoding="utf-8")
    if old not in source:
        raise RuntimeError(f"Expected source not found in {path}: {old[:100]}")
    path.write_text(source.replace(old, new, 1), encoding="utf-8")


def main():
    for relative in ("approach.html", "intelligence.html", "labs.html", "work.html", "vi/approach.html", "vi/intelligence.html", "vi/labs.html", "vi/work.html"):
        path = ROOT / relative
        source = path.read_text(encoding="utf-8").replace("<h3", "<h2").replace("</h3>", "</h2>")
        path.write_text(source, encoding="utf-8")

    css_updates = {
        "css/concept-3-2.css": [
            (".layer-flow h3{", ".layer-flow h3,.layer-flow h2{"),
            (".method-grid h3{", ".method-grid h3,.method-grid h2{"),
            (".intelligence-grid h3,.commercial-grid h3{", ".intelligence-grid h3,.intelligence-grid h2,.commercial-grid h3,.commercial-grid h2{"),
            ("html[lang=\"vi\"] .method-grid h3,", "html[lang=\"vi\"] .method-grid h3,html[lang=\"vi\"] .method-grid h2,"),
            ("html[lang=\"vi\"] .intelligence-grid h3,", "html[lang=\"vi\"] .intelligence-grid h3,html[lang=\"vi\"] .intelligence-grid h2,"),
        ],
        "css/style.css": [
            (".case-card h3", ".case-card h3,.case-card h2"),
        ],
    }
    for relative, replacements in css_updates.items():
        path = ROOT / relative
        source = path.read_text(encoding="utf-8")
        for old, new in replacements:
            source = source.replace(old, new)
        path.write_text(source, encoding="utf-8")

    image_sizes = {
        "concept-3-human-editorial.jpg": (2400, 3607),
        "alton-portrait.jpg": (660, 660),
        "la-pham-portrait.jpg": (392, 392),
        "kim-khanh-cao-portrait.jpg": (1280, 1280),
        "vu-nguyen-portrait.jpg": (896, 965),
        "nam-tran-portrait.jpg": (1536, 2048),
        "dung-nguyen-portrait.png": (1280, 719),
        "usofa-logo-light-bg.png": (641, 241),
    }
    for path in sorted(ROOT.glob("*.html")) + sorted((ROOT / "vi").glob("*.html")):
        source = path.read_text(encoding="utf-8")
        for filename, (width, height) in image_sizes.items():
            pattern = rf'(<img\b(?=[^>]*\b{re.escape(filename)}\b)(?![^>]*\bwidth=)(?![^>]*\bheight=)[^>]*)(>)'
            source = re.sub(pattern, rf'\1 width="{width}" height="{height}"\2', source)
        path.write_text(source, encoding="utf-8")

    executive = ROOT / "executive-ai-lab.html"
    source = executive.read_text(encoding="utf-8")
    marker = '<link rel="alternate" hreflang="x-default" href="https://brandhere.co/executive-ai-lab">'
    source = source.replace(marker, '<link rel="alternate" hreflang="en" href="https://brandhere.co/executive-ai-lab"><link rel="alternate" hreflang="vi" href="https://brandhere.co/vi/executive-ai-lab">' + marker, 1)
    executive.write_text(source, encoding="utf-8")

    description_updates = {
        "vi/adaptation.html": ("Brand Here thu hẹp khoảng cách giữa năng lực công nghệ và thực tế kinh doanh.", "Brand Here thu hẹp khoảng cách giữa năng lực công nghệ và thực tế kinh doanh qua con người, marketing, truyền thông và khách hàng."),
        "vi/approach.html": ("Chẩn đoán, chuyển dịch, tái thiết kế, truyền thông, kích hoạt và đo lường.", "Phương pháp Brand Here giúp chẩn đoán, chuyển dịch, tái thiết kế, truyền thông, kích hoạt và đo lường quá trình thích ứng kinh doanh."),
        "vi/insights.html": ("Ghi chú thực tiễn về AI, thương mại và chuyển đổi doanh nghiệp.", "Góc nhìn thực tiễn từ Brand Here về AI, thích ứng kinh doanh, thương mại, marketing và chuyển đổi tổ chức."),
    }
    for relative, (old, new) in description_updates.items():
        path = ROOT / relative
        source = path.read_text(encoding="utf-8").replace(old, new)
        source = re.sub(r'(<meta property="og:description" content=")[^"]*(">)', lambda m: m.group(1) + new + m.group(2), source)
        source = re.sub(r'(<meta name="twitter:description" content=")[^"]*(">)', lambda m: m.group(1) + new + m.group(2), source)
        path.write_text(source, encoding="utf-8")

    vi_home = ROOT / "vi" / "index.html"
    source = vi_home.read_text(encoding="utf-8")
    source = source.replace('<p><span>Agency sản xuất nhanh hơn.</span><span>Mô hình marketing chưa thay đổi.</span></p>', '<p><span>Agency sản xuất nhanh hơn.</span><span>Mô hình marketing chưa thay đổi.</span></p><p><span>Khách hàng đang hỏi AI nên mua gì.</span><span>Thương hiệu vẫn giả định họ bắt đầu từ Google.</span></p>', 1)
    source = source.replace('<li>Vai trò, quy trình và quản lý cần thay đổi gì?</li></ul>', '<li>Vai trò, quy trình và quản lý cần thay đổi gì?</li><li>Làm sao biến đào tạo thành hành vi lặp lại?</li></ul>', 1)
    source = source.replace('<li>Mô hình marketing và agency có còn phù hợp?</li></ul>', '<li>Mô hình marketing và agency có còn phù hợp?</li><li>AI đang hiểu gì về doanh nghiệp của bạn?</li></ul>', 1)
    old_method = '<section class="method-strip"><p class="hero-index">03 / PHƯƠNG PHÁP THÍCH ỨNG BRAND HERE</p><div class="method-grid"><article><b>01</b><h3>Chẩn đoán</h3></article><article><b>02</b><h3>Chuyển dịch</h3></article><article><b>03</b><h3>Tái thiết kế</h3></article><article><b>04</b><h3>Truyền thông</h3></article><article><b>05</b><h3>Kích hoạt</h3></article><article><b>06</b><h3>Đo lường</h3></article></div></section>'
    new_method = '<section class="method-strip"><p class="hero-index">03 / PHƯƠNG PHÁP THÍCH ỨNG BRAND HERE</p><div class="method-grid"><article><b>01</b><h3>Chẩn đoán</h3><p>Tìm khoảng cách giữa năng lực và thực tế.</p></article><article><b>02</b><h3>Chuyển dịch</h3><p>Làm rõ ý nghĩa của thay đổi cho từng bộ phận.</p></article><article><b>03</b><h3>Tái thiết kế</h3><p>Thay đổi quy trình, vai trò và quyền quyết định.</p></article><article><b>04</b><h3>Truyền thông</h3><p>Xây dựng hiểu biết, niềm tin và sự rõ ràng.</p></article><article><b>05</b><h3>Kích hoạt</h3><p>Biến ý định thành hành vi lặp lại.</p></article><article><b>06</b><h3>Đo lường</h3><p>Đi từ quyền truy cập đến tác động kinh doanh.</p></article></div></section>'
    source = source.replace(old_method, new_method, 1)
    closing = '<section class="closing"><p>Công nghệ đã thay đổi.'
    additions = '<section class="intelligence-preview"><p class="hero-index">04 / BRAND HERE INTELLIGENCE</p><h2>Đo lường xem thay đổi có thực sự diễn ra.</h2><p>Các công cụ chẩn đoán có thể lặp lại biến thích ứng thành một kỷ luật. Đây là công cụ hỗ trợ quyết định — không phải tuyên bố về độ chính xác khoa học.</p><div class="intelligence-grid"><article><small>Con người</small><h3>Chỉ số Ứng dụng AI</h3><span class="status-chip">Đang phát triển</span></article><article><small>Marketing</small><h3>Chỉ số Thích ứng Marketing</h3><span class="status-chip">Chẩn đoán tư vấn</span></article><article><small>Danh tiếng</small><h3>Trí tuệ Danh tiếng AI</h3><span class="status-chip">Nguyên mẫu</span></article><article><small>Hệ sinh thái</small><h3>Chẩn đoán Mô hình Agency</h3><span class="status-chip">Đã có tại Labs</span></article></div><a class="adaptation-link" href="intelligence">Khám phá Brand Here Intelligence ↗</a></section><section class="ecosystem"><div><p class="hero-index">05 / HỆ SINH THÁI</p><h2>Chuyển đổi cần một hệ sinh thái.</h2></div><div><p>Đối tác công nghệ xây năng lực. Tư vấn định hình chuyển đổi. Agency thực thi. Đội ngũ nội bộ sở hữu doanh nghiệp. Brand Here làm việc tại những khoảng trống xuất hiện giữa họ.</p><div class="ecosystem-list"><span>Đối tác công nghệ</span><span>Đơn vị tư vấn</span><span>Đội ngũ nội bộ</span><span>Agency và chuyên gia</span></div><a class="adaptation-link" href="partners">Hợp tác cùng Brand Here ↗</a></div></section><section class="lab-preview"><div><span>BRAND HERE LAB / THÍCH ỨNG KINH DOANH</span><h2>Đừng chỉ đọc về thay đổi. Hãy xem nó có ý nghĩa gì.</h2><p>Khám phá bốn mô phỏng chẩn đoán minh bạch ngay trên trình duyệt. Không dùng dữ liệu mật của doanh nghiệp. Không giả lập lời gọi AI.</p><a href="labs">Vào Adaptation Labs ↗</a></div><div class="lab-orbit" aria-hidden="true"><i></i><span>TRUY CẬP</span><strong>KHOẢNG CÁCH<br>ỨNG DỤNG</strong><span>TÁC ĐỘNG</span></div></section>'
    if additions not in source:
        source = source.replace(closing, additions + closing, 1)
    vi_home.write_text(source, encoding="utf-8")


if __name__ == "__main__":
    main()
