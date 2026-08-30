#!/usr/bin/env python3
from pathlib import Path

path = Path(__file__).resolve().parents[2] / "vi" / "insights.html"
source = path.read_text(encoding="utf-8")
old = "Góc nhìn thực tế về AI, P&amp;L, chiến lược và truyền thông từ Brand Here."
new = "Góc nhìn thực tế từ Brand Here về AI, P&amp;L, thích ứng kinh doanh, chiến lược, marketing và truyền thông."
if old not in source:
    raise SystemExit("Expected Vietnamese insights description not found")
path.write_text(source.replace(old, new), encoding="utf-8")
