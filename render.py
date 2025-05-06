import os
from jinja2 import Environment, FileSystemLoader

# ─── CONFIG ────────────────────────────────────────────────────────────────
BASE_DIR     = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_DIR = os.path.join(BASE_DIR, "templates")
OUTPUT_DIR   = os.path.join(BASE_DIR, "output")
# ────────────────────────────────────────────────────────────────────────────

# Dual‐path loader: common templates first, then full tree
env = Environment(
    loader=FileSystemLoader([
        os.path.join(TEMPLATE_DIR, "common"),
        TEMPLATE_DIR
    ]),
    autoescape=True,
    trim_blocks=True,
    lstrip_blocks=True,
)

def collect_templates():
    pages = []
    for root, _, files in os.walk(TEMPLATE_DIR):
        rel = os.path.relpath(root, TEMPLATE_DIR).replace("\\", "/")
        if rel.startswith("common"):
            continue
        for f in files:
            if f.lower().endswith(".html"):
                pages.append((rel, f))
    return pages

def render_all():
    pages = collect_templates()
    print(f"[DEBUG] Found {len(pages)} page templates on disk.")
    
    for rel_dir, fname in pages:
        # source path
        src = os.path.join(TEMPLATE_DIR, rel_dir, fname)
        # derive output path
        slug = os.path.splitext(fname)[0]
        if rel_dir == "hu" and fname == "index.html":
            dest_dir, dest_name = OUTPUT_DIR, "index.html"
        else:
            dest_dir = os.path.join(OUTPUT_DIR, rel_dir, slug)
            dest_name = "index.html"
        os.makedirs(dest_dir, exist_ok=True)
        
        # load+render via Jinja’s loader
        tpl_path = f"{rel_dir}/{fname}" if rel_dir != "." else fname
        try:
            rendered = env.get_template(tpl_path).render()
        except Exception as e:
            print(f"[ERROR] Rendering {tpl_path}: {e}")
            continue
        
        out_path = os.path.join(dest_dir, dest_name)
        try:
            with open(out_path, "w", encoding="utf-8") as fp:
                fp.write(rendered)
            print(f"[INFO] Built ➔ {out_path}")
        except Exception as e:
            print(f"[ERROR] Writing {out_path}: {e}")
    
    print("[SUCCESS] Build complete.")

if __name__ == "__main__":
    render_all()
