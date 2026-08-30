#!/usr/bin/env python3
from pathlib import Path
import re

root = Path(__file__).resolve().parents[2]
for name in ("concept-home.html", "concept-2.html", "concept-3.html"):
    path = root / name
    source = path.read_text(encoding="utf-8")
    def restore(match):
        target = match.group(1)
        return f'href="{target}.html"' if (root / f"{target}.html").exists() else match.group(0)
    source = re.sub(r'href="([A-Za-z0-9-]+)"', restore, source)
    if name == "concept-home.html":
        source = source.replace('href="./"', 'href="index.html"')
    if name == "concept-3.html":
        source = re.sub(r' width="[0-9]+" height="[0-9]+"', '', source)
    path.write_text(source, encoding="utf-8")
