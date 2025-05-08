#!/bin/bash
set -euo pipefail

echo "[INFO] Rendering templates…"
python3 render.py

cd docs

echo "[INFO] Launching browser at http://127.0.0.1:8080/hu/…"
# Non-blocking single‐line browser launch
explorer.exe "http://127.0.0.1:8080/hu/" &>/dev/null &

echo "[INFO] Serving on http://127.0.0.1:8080 (root → /hu/)"
# Foreground server so Ctrl+C kills it directly
exec python3 -m http.server 8080
