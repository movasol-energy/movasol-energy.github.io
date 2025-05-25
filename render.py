# render.py
import os
from jinja2 import Environment, FileSystemLoader

BASE_DIR      = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_DIR  = os.path.join(BASE_DIR, "templates")
OUTPUT_DIR    = os.path.join(BASE_DIR, "docs")

def asset_url(logical_path: str) -> str:
    return f"/assets/{logical_path}"

env = Environment(
    loader=FileSystemLoader([
        os.path.join(TEMPLATE_DIR, "common"),
        TEMPLATE_DIR
    ]),
    autoescape=True,
    trim_blocks=True,
    lstrip_blocks=True,
)
env.filters["asset_url"] = asset_url

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
    for rel_dir, fname in collect_templates():
        slug = os.path.splitext(fname)[0]
        if slug == "index":
            dest_dir  = os.path.join(OUTPUT_DIR, rel_dir)
            dest_name = "index.html"
        else:
            dest_dir  = os.path.join(OUTPUT_DIR, rel_dir, slug)
            dest_name = "index.html"

        os.makedirs(dest_dir, exist_ok=True)
        tpl_path = f"{rel_dir}/{fname}" if rel_dir != "." else fname

        rendered = env.get_template(tpl_path).render()
        with open(os.path.join(dest_dir, dest_name), "w", encoding="utf-8") as fp:
            fp.write(rendered)

if __name__ == "__main__":
    render_all()