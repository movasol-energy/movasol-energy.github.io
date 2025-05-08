#!/bin/bash
set -euo pipefail

echo "[INFO] Rendering templates…"
python3 render.py

cd docs

echo "[INFO] Opening browser at http://127.0.0.1:8080/hu/…"
# On Windows, use cmd.exe /c start to launch default browser
cmd.exe /c start http://127.0.0.1:8080/hu/

echo "[INFO] Serving on http://127.0.0.1:8080 (root → /hu/)"
# Exec replaces this shell with the Python server,
# so SIGINT (Ctrl+C) will go directly to it.
exec python3 -m http.server 8080
