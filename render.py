from jinja2 import Environment, FileSystemLoader
import os

TEMPLATE_DIR = "templates"
OUTPUT_DIR = "output"

env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))

def render_template(subdir, filename):
    # Compute paths
    template_path = f"{subdir}/{filename}"
    output_path = os.path.join(OUTPUT_DIR, subdir)

    # Load and render
    template = env.get_template(template_path)
    rendered = template.render()

    # Write to output
    os.makedirs(output_path, exist_ok=True)
    with open(os.path.join(output_path, filename), "w", encoding="utf-8") as f:
        f.write(rendered)

# List of pages to render (relative to/templates/)
pages = [
    ("en", "index.html"),
    ("en", "about.html"),
    ("en", "contact.html"),
    ("en", "news-details.html"),
    ("en", "news.html"),
    ("en", "projects-details.html"),
    ("en", "projects.html"),
    ("en", "services-construction.html"),
    ("en", "services-consulting.html"),
    ("en", "services-development.html"),
    ("en", "services-maintenance.html"),
    ("en", "services-measurement.html"),
    ("en", "services-operations.html"),
    ("en", "services.html"),
    ("hu", "index.html"),
    ("hu", "hirek.html"),
    ("hu", "hirek-details.html"),
    ("hu", "kapcsolat.html"),
    ("hu", "projektek.html"),
    ("hu", "projektek-details.html"),
    ("hu", "rolunk.html"),
    ("hu", "szolgaltatasok.html"),
    ("hu", "szolgaltatasok-fejlesztes.html"),
    ("hu", "szolgaltatasok-kivitelezes.html"),
    ("hu", "szolgaltatasok-meres.html"),
    ("hu", "szolgaltatasok-szakszerviz.html"),
    ("hu", "szolgaltatasok-tanacsadas.html"),
    ("hu", "szolgaltatasok-uzemeltetes.html")
]

for subdir, filename in pages:
    render_template(subdir, filename)

print("OK!")