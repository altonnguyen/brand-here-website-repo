#!/usr/bin/env python3
from pathlib import Path
import html
import re

ROOT = Path(__file__).resolve().parents[2]


def replace_once(path, old, new):
    source = path.read_text(encoding="utf-8")
    if old not in source:
        raise RuntimeError(f"Expected source not found in {path}: {old[:90]}")
    path.write_text(source.replace(old, new, 1), encoding="utf-8")


def canonical_for(path):
    rel = path.relative_to(ROOT).as_posix()
    if rel == "index.html":
        return "https://brandhere.co/"
    if rel == "vi/index.html":
        return "https://brandhere.co/vi/"
    return "https://brandhere.co/" + rel.removesuffix(".html")


def add_metadata(path):
    source = path.read_text(encoding="utf-8")
    if re.search(r'<meta\s+name=["\']robots["\'][^>]*noindex', source, re.I):
        return
    title_match = re.search(r"<title>(.*?)</title>", source, re.I | re.S)
    description_match = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', source, re.I | re.S)
    if not title_match or not description_match:
        raise RuntimeError(f"Indexable page lacks title/description: {path}")
    title = html.unescape(re.sub(r"\s+", " ", title_match.group(1)).strip())
    description = html.unescape(re.sub(r"\s+", " ", description_match.group(1)).strip())
    canonical = canonical_for(path)
    lang = "vi" if path.parent.name == "vi" or path.name == "next-stage.html" else "en"
    x_default = canonical.replace("/vi/", "/") if "/vi/" in canonical else canonical
    additions = []
    if 'hreflang="x-default"' not in source:
        additions.append(f'<link rel="alternate" hreflang="x-default" href="{x_default}">')
    og_values = {
        "og:type": "website",
        "og:title": title,
        "og:description": description,
        "og:url": canonical,
        "og:image": "https://brandhere.co/images/og-concept-3.jpg?v=1",
        "og:locale": "vi_VN" if lang == "vi" else "en_US",
    }
    for key, value in og_values.items():
        if f'property="{key}"' not in source:
            additions.append(f'<meta property="{key}" content="{html.escape(value, quote=True)}">')
    twitter_values = {
        "twitter:card": "summary_large_image",
        "twitter:title": title,
        "twitter:description": description,
        "twitter:image": "https://brandhere.co/images/og-concept-3.jpg?v=1",
    }
    for key, value in twitter_values.items():
        if f'name="{key}"' not in source:
            additions.append(f'<meta name="{key}" content="{html.escape(value, quote=True)}">')
    if additions:
        source = source.replace("</head>", "".join(additions) + "</head>", 1)
    path.write_text(source, encoding="utf-8")


def normalize_urls(path):
    source = path.read_text(encoding="utf-8")
    source = re.sub(r"https://brandhere\.co/([^\"'?#]+?)\.html(?=([\"'?#]))", r"https://brandhere.co/\1", source)
    source = re.sub(r'(?P<prefix>(?:href|action)=["\'])(?P<path>(?:\.\./)?[A-Za-z0-9-]+)\.html(?P<suffix>[?#][^"\']*)?(?P<quote>["\'])', lambda m: m.group("prefix") + (("../" if m.group("path").startswith("../") else "") + ("" if m.group("path").removeprefix("../") == "index" else m.group("path").removeprefix("../"))) + (m.group("suffix") or "") + m.group("quote"), source)
    source = source.replace('href=""', 'href="./"').replace("href=''", "href='./'")
    path.write_text(source, encoding="utf-8")


def main():
    en = ROOT / "index.html"
    vi = ROOT / "vi" / "index.html"
    en_old = '<nav><a href="adaptation.html">Adaptation</a><a href="#practices">Practices</a><a href="labs.html">Labs</a><a href="experts.html">Experts</a><a href="insights.html">Insights</a><a href="work.html">Work</a><a href="partners.html">Partner</a></nav><div class="home-lang"><strong>EN</strong><a href="vi/index.html">VI</a></div><a class="nav-cta"'
    en_new = '<nav id="homeNav"><a href="adaptation.html">Adaptation</a><a href="#practices">Practices</a><a href="labs.html">Labs</a><a href="experts.html">Experts</a><a href="insights.html">Insights</a><a href="work.html">Work</a><a href="partners.html">Partner</a></nav><div class="home-lang"><strong>EN</strong><a href="vi/index.html">VI</a></div><button class="home-menu" type="button" aria-controls="homeNav" aria-expanded="false" aria-label="Open navigation">Menu</button><a class="nav-cta"'
    vi_old = '<nav><a href="adaptation.html">Thích ứng</a><a href="#practices">Hai thực hành</a><a href="labs.html">Labs</a><a href="experts.html">Chuyên gia</a><a href="insights.html">Góc nhìn</a><a href="work.html">Dự án</a><a href="partners.html">Đối tác</a></nav><div class="home-lang"><a href="../index.html">EN</a><strong>VI</strong></div><a class="nav-cta"'
    vi_new = '<nav id="homeNav"><a href="adaptation.html">Thích ứng</a><a href="#practices">Hai thực hành</a><a href="labs.html">Labs</a><a href="experts.html">Chuyên gia</a><a href="insights.html">Góc nhìn</a><a href="work.html">Dự án</a><a href="partners.html">Đối tác</a></nav><div class="home-lang"><a href="../index.html">EN</a><strong>VI</strong></div><button class="home-menu" type="button" aria-controls="homeNav" aria-expanded="false" aria-label="Mở điều hướng">Menu</button><a class="nav-cta"'
    replace_once(en, en_old, en_new)
    replace_once(vi, vi_old, vi_new)

    css = ROOT / "css" / "concept-3.css"
    source = css.read_text(encoding="utf-8")
    source += '\n.home-menu{display:none;border:1px solid #ffffff80;background:transparent;color:inherit;padding:8px 10px;font:400 9px/1 var(--o);letter-spacing:.1em;text-transform:uppercase}\n@media(max-width:900px){.nav{grid-template-columns:auto 1fr auto auto}.home-menu{display:block}.nav nav.open{position:absolute;display:flex;flex-direction:column;align-items:flex-start;gap:0;left:0;right:0;top:100%;padding:18px 20px;background:rgba(45,41,38,.98);border-top:1px solid #ffffff3d}.nav nav.open a{width:100%;padding:12px 0;border-bottom:1px solid #ffffff26;font-size:11px}}\n@media(max-width:600px){.nav{grid-template-columns:1fr auto auto;gap:12px}}\n'
    css.write_text(source, encoding="utf-8")

    c32 = ROOT / "css" / "concept-3-2.css"
    source = c32.read_text(encoding="utf-8")
    source += '\n.gap-editorial .hero-index,.adaptation-layer .hero-index,.method-strip .hero-index,.ecosystem .hero-index,.intelligence-preview .hero-index{position:static;margin:0 0 28px}\n'
    c32.write_text(source, encoding="utf-8")

    menu_en = """\n(function () {\n  var menu = document.querySelector('.home-menu');\n  var nav = document.getElementById('homeNav');\n  if (!menu || !nav) return;\n  function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }\n  menu.addEventListener('click', function () { var open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });\n  nav.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', closeMenu); });\n  document.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeMenu(); });\n}());\n"""
    menu_vi = "\n(function(){var m=document.querySelector('.home-menu'),n=document.getElementById('homeNav');if(!m||!n)return;function c(){n.classList.remove('open');m.setAttribute('aria-expanded','false')}m.addEventListener('click',function(){var o=n.classList.toggle('open');m.setAttribute('aria-expanded',String(o))});n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',c)});document.addEventListener('keydown',function(e){if(e.key==='Escape')c()})}());\n"
    for relative, addition in (("js/concept-3.js", menu_en), ("js/concept-3-vi.js", menu_vi)):
        target = ROOT / relative
        target.write_text(target.read_text(encoding="utf-8") + addition, encoding="utf-8")

    pages = sorted(ROOT.glob("*.html")) + sorted((ROOT / "vi").glob("*.html"))
    for page in pages:
        normalize_urls(page)
        add_metadata(page)

    sitemap = ROOT / "sitemap.xml"
    entries = []
    for page in pages:
        source = page.read_text(encoding="utf-8")
        if re.search(r'<meta\s+name=["\']robots["\'][^>]*noindex', source, re.I):
            continue
        canonical_match = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\'](.*?)["\']', source, re.I)
        if not canonical_match:
            continue
        canonical = canonical_match.group(1)
        if page.name in {"concept-home.html", "concept-2.html", "concept-3.html", "what-we-do.html"}:
            continue
        alt_en = re.search(r'<link\s+rel=["\']alternate["\']\s+hreflang=["\']en["\']\s+href=["\'](.*?)["\']', source, re.I)
        alt_vi = re.search(r'<link\s+rel=["\']alternate["\']\s+hreflang=["\']vi["\']\s+href=["\'](.*?)["\']', source, re.I)
        links = ""
        if alt_en and alt_vi:
            links = f'<xhtml:link rel="alternate" hreflang="en" href="{alt_en.group(1)}"/><xhtml:link rel="alternate" hreflang="vi" href="{alt_vi.group(1)}"/><xhtml:link rel="alternate" hreflang="x-default" href="{alt_en.group(1)}"/>'
        entries.append(f'  <url><loc>{canonical}</loc>{links}</url>')
    sitemap.write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + "\n".join(entries) + '\n</urlset>\n', encoding="utf-8")


if __name__ == "__main__":
    main()
