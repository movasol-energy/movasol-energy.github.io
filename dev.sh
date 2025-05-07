#!/bin/bash
set -euo pipefail

cleanup() {
  echo "[INFO] Tearing down server on port 8080…"
  # Negative PID → kill entire process group
  kill -- -"$http_pid" 2>/dev/null || true
}
# Trap INT, TERM and normal EXIT
trap cleanup SIGINT SIGTERM EXIT

echo "[INFO] Rendering templates…"
python3 render.py

cd docs
# …redirect boilerplate…

echo "[INFO] Serving on http://127.0.0.1:8080 (root → /hu/)"
# Start in its own process group
setsid python3 -m http.server 8080 &
http_pid=$!

sleep 1
cmd.exe /c start http://127.0.0.1:8080

# Wait on the server’s PID (not the script’s)
wait "$http_pid"
