import os
from jinja2 import Environment, FileSystemLoader

# ─── CONFIG ────────────────────────────────────────────────────────────────
BASE_DIR     = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_DIR = os.path.join(BASE_DIR, "templates")
OUTPUT_DIR   = os.path.join(BASE_DIR, "docs")
# ────────────────────────────────────────────────────────────────────────────

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
        slug = os.path.splitext(fname)[0]
        
        # Output directory logic
        if slug == "index":
            dest_dir = os.path.join(OUTPUT_DIR, rel_dir)  # .../en/
            dest_name = "index.html"
        else:
            dest_dir = os.path.join(OUTPUT_DIR, rel_dir, slug)  # .../en/about/
            dest_name = "index.html"

        os.makedirs(dest_dir, exist_ok=True)
        
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
        except Exception as e:
            print(f"[ERROR] Writing {out_path}: {e}")
    
    print("[SUCCESS] Build complete.")

if __name__ == "__main__":
    render_all()
