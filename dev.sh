#!/bin/bash
set -e

echo "[INFO] Rendering templates..."
python3 render.py

# Serve from the unified 'output' root so /assets, /en and /hu all resolve
cd output

# Ensure a redirect index exists
if [ ! -f index.html ]; then
  cat > index.html <<'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=/hu/">
  <title>Redirecting…</title>
</head>
<body>
  <p>Redirecting to <a href="/hu/">/hu/</a>…</p>
</body>
</html>
EOF
  echo "[INFO] Created redirecting index.html → /hu/"
fi

echo "[INFO] Serving on http://127.0.0.1:8080 (root → /hu/)"
python3 -m http.server 8080 &

sleep 1
cmd.exe /c start http://127.0.0.1:8080

wait
