set -euo pipefail

sass docs/assets/scss:docs/assets/css

echo "[INFO] Rendering templates…"
python3 render.py

cd docs

echo "[INFO] Launching browser at http://127.0.0.1:8080/hu/…"

explorer.exe "http://127.0.0.1:8080/hu/" &>/dev/null &

echo "[INFO] Serving on http://127.0.0.1:8080 (root → /hu/)"

exec python3 -m http.server 8080
