#!/usr/bin/env python3
"""Dependency-free static QA for Brand Here website pages."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
PAGES = sorted(ROOT.glob("*.html")) + sorted((ROOT / "vi").glob("*.html"))
INDEXABLE_VI = {page for page in (ROOT / "vi").glob("*.html") if page.name != "thank-you.html"}
LEGACY_TERMS = ("decision session", "decision labs", "insight to impact")
DESCRIPTION_EXEMPT = {"thank-you.html", "next-stage-confirmation.html"}

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs, self.ids, self.duplicate_ids = [], set(), []
        self.title, self.in_title, self.descriptions = "", False, []
        self.jsonld, self.in_jsonld, self.json_text = [], False, ""
        self.canonical, self.hreflang, self.base = [], set(), None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "title": self.in_title = True
        if tag == "meta" and attrs.get("name") == "description": self.descriptions.append(attrs.get("content", ""))
        if tag == "base" and attrs.get("href"): self.base = attrs["href"]
        if tag == "link" and attrs.get("rel") == "canonical": self.canonical.append(attrs.get("href", ""))
        if tag == "link" and attrs.get("rel") == "alternate" and attrs.get("hreflang"): self.hreflang.add(attrs["hreflang"])
        if tag == "script" and attrs.get("type") == "application/ld+json": self.in_jsonld, self.json_text = True, ""
        if attrs.get("id"):
            if attrs["id"] in self.ids: self.duplicate_ids.append(attrs["id"])
            self.ids.add(attrs["id"])
        for key in ("href", "src"):
            if key in attrs: self.refs.append((tag, key, attrs[key]))

    def handle_endtag(self, tag):
        if tag == "title": self.in_title = False
        if tag == "script" and self.in_jsonld:
            self.in_jsonld = False
            self.jsonld.append(self.json_text)

    def handle_data(self, data):
        if self.in_title: self.title += data
        if self.in_jsonld: self.json_text += data

def main():
    failures = []
    for page in PAGES:
        parser = PageParser()
        source = page.read_text(encoding="utf-8")
        parser.feed(source)
        if not parser.title.strip(): failures.append(f"{page}: missing title")
        if page.name not in DESCRIPTION_EXEMPT and (len(parser.descriptions) != 1 or not parser.descriptions[0].strip()): failures.append(f"{page}: invalid meta description")
        if parser.duplicate_ids: failures.append(f"{page}: duplicate ids {parser.duplicate_ids}")
        if page in INDEXABLE_VI:
            if len(parser.canonical) != 1: failures.append(f"{page}: expected one canonical URL")
            if not {"en", "vi"}.issubset(parser.hreflang): failures.append(f"{page}: missing en/vi hreflang pair")
            folded = source.casefold()
            for term in LEGACY_TERMS:
                if term in folded: failures.append(f"{page}: legacy positioning remains: {term}")
        for raw in parser.jsonld:
            try: json.loads(raw)
            except json.JSONDecodeError as exc: failures.append(f"{page}: invalid JSON-LD: {exc}")
        for tag, key, ref in parser.refs:
            if not ref: failures.append(f"{page}: blank {key}")
            parts = urlsplit(ref)
            if parts.scheme or ref.startswith(("#", "mailto:", "tel:")): continue
            base = (page.parent / parser.base).resolve() if parser.base else page.parent
            target = (base / parts.path).resolve()
            html_target = Path(f"{target}.html")
            if parts.path and not target.exists() and not html_target.exists(): failures.append(f"{page}: broken {tag} {key}={ref}")
    if failures:
        print("FAIL")
        print("\n".join(failures))
        return 1
    print(f"PASS: {len(PAGES)} English/Vietnamese pages; metadata, JSON-LD, IDs, local references, Vietnamese canonicals/hreflang and legacy-positioning checks valid")
    return 0

if __name__ == "__main__": sys.exit(main())
