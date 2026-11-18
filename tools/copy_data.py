# Copies data/whales.json into js/data.js.
# Usage (from the project folder): python tools/copy_data.py
import json, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
data = json.loads((root / "data" / "whales.json").read_text(encoding="utf-8"))
text = json.dumps(data, ensure_ascii=False, indent=2)
(root / "js" / "data.js").write_text(
    "// Copy of data/whales.json so the site also works when opened by double-click (file://).\n"
    "// After editing the JSON, run: python tools/copy_data.py\n"
    "window.WHALES = " + text + ";\n", encoding="utf-8")
print("js/data.js updated")
