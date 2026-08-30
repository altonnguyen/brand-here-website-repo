#!/usr/bin/env python3
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import json

ROOT = Path(__file__).resolve().parents[2]
PAGES = sorted(ROOT.glob("*.html")) + sorted((ROOT / "vi").glob("*.html"))


class AuditParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.attrs = []
        self.canonical = []
        self.alternates = {}
        self.descriptions = []
        self.h1 = 0
        self.headings = []
        self.images = []
        self.links = []
        self.jsonld = []
        self.lang = None
        self.title = ""
        self._title = False
        self._jsonld = False
        self._json_text = ""
        self.og = {}
        self.twitter = {}
        self.noindex = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "html":
            self.lang = attrs.get("lang")
        if tag == "title":
            self._title = True
        if tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            level = int(tag[1])
            self.headings.append(level)
            if tag == "h1":
                self.h1 += 1
        if tag == "meta":
            if attrs.get("name") == "robots" and "noindex" in attrs.get("content", "").lower():
                self.noindex = True
            if attrs.get("name") == "description":
                self.descriptions.append(attrs.get("content", ""))
            if attrs.get("property", "").startswith("og:"):
                self.og[attrs["property"]] = attrs.get("content", "")
            if attrs.get("name", "").startswith("twitter:"):
                self.twitter[attrs["name"]] = attrs.get("content", "")
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical.append(attrs.get("href", ""))
        if tag == "link" and attrs.get("rel") == "alternate":
            self.alternates[attrs.get("hreflang", "")] = attrs.get("href", "")
        if tag == "img":
            self.images.append(attrs)
        if tag == "a":
            self.links.append(attrs.get("href", ""))
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self._jsonld = True
            self._json_text = ""

    def handle_endtag(self, tag):
        if tag == "title":
            self._title = False
        if tag == "script" and self._jsonld:
            self._jsonld = False
            self.jsonld.append(self._json_text)

    def handle_data(self, data):
        if self._title:
            self.title += data
        if self._jsonld:
            self._json_text += data


def expected_url(page):
    rel = page.relative_to(ROOT).as_posix()
    if rel == "index.html":
        return "https://brandhere.co/"
    if rel == "vi/index.html":
        return "https://brandhere.co/vi/"
    return f"https://brandhere.co/{rel.removesuffix('.html')}"


def main():
    issues = []
    parsed = {}
    for page in PAGES:
        parser = AuditParser()
        parser.feed(page.read_text(encoding="utf-8"))
        rel = page.relative_to(ROOT).as_posix()
        parsed[rel] = parser
        expected_lang = "vi" if rel.startswith("vi/") or rel.startswith("next-stage") else "en"
        if parser.lang != expected_lang:
            issues.append(("HIGH", rel, f"html lang is {parser.lang!r}; expected {expected_lang!r}"))
        if parser.h1 != 1:
            issues.append(("HIGH", rel, f"has {parser.h1} H1 elements; expected exactly 1"))
        if parser.noindex:
            continue
        if len(parser.canonical) != 1:
            issues.append(("HIGH", rel, f"has {len(parser.canonical)} canonical links; expected 1"))
        elif rel not in {"what-we-do.html", "vi/what-we-do.html"} and parser.canonical[0] != expected_url(page):
            issues.append(("MEDIUM", rel, f"canonical {parser.canonical[0]!r} differs from {expected_url(page)!r}"))
        required_alts = {"en", "vi", "x-default"}
        missing_alts = required_alts - set(parser.alternates)
        if rel == "next-stage.html":
            missing_alts -= {"en", "vi"}
        if missing_alts:
            issues.append(("MEDIUM", rel, f"missing hreflang: {', '.join(sorted(missing_alts))}"))
        if len(parser.descriptions) != 1 or not parser.descriptions[0].strip():
            issues.append(("HIGH", rel, "missing or duplicate meta description"))
        elif not 80 <= len(parser.descriptions[0]) <= 170:
            issues.append(("LOW", rel, f"meta description length is {len(parser.descriptions[0])}"))
        title = parser.title.strip()
        if not title:
            issues.append(("HIGH", rel, "missing title"))
        elif len(title) > 65:
            issues.append(("LOW", rel, f"title length is {len(title)}"))
        for key in ("og:title", "og:description", "og:image", "og:url", "og:type"):
            if not parser.og.get(key):
                issues.append(("MEDIUM", rel, f"missing {key}"))
        for key in ("twitter:card", "twitter:title", "twitter:description", "twitter:image"):
            if not parser.twitter.get(key):
                issues.append(("LOW", rel, f"missing {key}"))
        if parser.headings:
            for previous, current in zip(parser.headings, parser.headings[1:]):
                if current > previous + 1:
                    issues.append(("LOW", rel, f"heading jumps H{previous} to H{current}"))
                    break
        for image in parser.images:
            if not image.get("alt", "").strip():
                issues.append(("MEDIUM", rel, f"image missing alt: {image.get('src', '')}"))
            if not image.get("width") or not image.get("height"):
                issues.append(("LOW", rel, f"image lacks width/height: {image.get('src', '')}"))
        for raw in parser.jsonld:
            try:
                json.loads(raw)
            except json.JSONDecodeError as error:
                issues.append(("HIGH", rel, f"invalid JSON-LD: {error}"))

    en_names = {p.name for p in ROOT.glob("*.html") if p.name not in {"concept-home.html", "concept-2.html", "concept-3.html", "next-stage.html", "next-stage-confirmation.html"}}
    vi_names = {p.name for p in (ROOT / "vi").glob("*.html")}
    for name in sorted(en_names - vi_names):
        issues.append(("MEDIUM", name, "no Vietnamese counterpart"))
    for name in sorted(vi_names - en_names):
        issues.append(("MEDIUM", f"vi/{name}", "no English counterpart"))

    print(f"PAGES={len(PAGES)}")
    for severity in ("HIGH", "MEDIUM", "LOW"):
        subset = [issue for issue in issues if issue[0] == severity]
        print(f"{severity}={len(subset)}")
        for _, page, message in subset:
            print(f"{severity}\t{page}\t{message}")
    return 1 if any(issue[0] == "HIGH" for issue in issues) else 0


if __name__ == "__main__":
    raise SystemExit(main())
