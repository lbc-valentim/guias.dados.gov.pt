"""Sincroniza os elementos HTML transversais nas saídas estáticas dos Guias.

GitHub Pages serve ficheiros estáticos e não processa includes no servidor. Por
isso, header e footer vivem como partials únicos em templates/partials/ e este
script materializa-os nas páginas publicadas. O HTML repetido passa a ser saída
de build, não fonte de manutenção.

Uso:
    python scripts/sync_shared_layout.py
    python scripts/sync_shared_layout.py --check

O modo --check é read-only e falha se alguma saída estiver dessincronizada.
As pastas versions/ e .build/ são deliberadamente excluídas: são histórico e
artefactos descartáveis, não páginas correntes do protótipo.
"""

from __future__ import annotations

import argparse
import json
import re
import xml.etree.ElementTree as ET
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
SITE_CONFIG = REPO / "content" / "site.json"
HEADER_TEMPLATE = REPO / "templates" / "partials" / "header.html"
FOOTER_TEMPLATE = REPO / "templates" / "partials" / "footer.html"
SITEMAP = REPO / "sitemap.xml"
SITE_PREFIX = "https://timmarcelino.github.io/Guias_dados.gov.pt/"

HEADER_RE = re.compile(r'<header class="portal-header"[^>]*>.*?</header>', re.S)
FOOTER_RE = re.compile(r'<footer class="portal-footer"[^>]*>.*?</footer>', re.S)


def load_site() -> dict:
    return json.loads(SITE_CONFIG.read_text(encoding="utf-8"))


def template_values(site: dict) -> dict[str, str]:
    author = site["author"]
    prototype = site["prototype"]
    return {
        "author_name": author["name"],
        "author_role": author["role"],
        "author_linkedin": author["linkedin"],
        "author_logo_web": author["logo_web"],
        "author_logo_alt": author["logo_alt"],
        "prototype_name": prototype["name"],
        "prototype_version": prototype["version"],
        "prototype_status": prototype["status"],
    }


def render(path: Path, values: dict[str, str]) -> str:
    text = path.read_text(encoding="utf-8").strip()
    for key, value in values.items():
        text = text.replace("{{" + key + "}}", value)
    unresolved = sorted(set(re.findall(r"\{\{([a-z0-9_]+)\}\}", text)))
    if unresolved:
        raise RuntimeError(f"Placeholders sem valor em {path}: {unresolved}")
    return text


def sitemap_pages() -> list[Path]:
    root = ET.fromstring(SITEMAP.read_text(encoding="utf-8"))
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    pages: list[Path] = []
    for loc in root.findall("sm:url/sm:loc", ns):
        url = (loc.text or "").strip()
        if not url.startswith(SITE_PREFIX):
            raise RuntimeError(f"URL fora do prefixo esperado: {url}")
        relative = url[len(SITE_PREFIX):].strip("/")
        pages.append(REPO / relative / "index.html")
    if len(pages) != 118:
        raise RuntimeError(f"Esperadas 118 páginas no sitemap, obtidas {len(pages)}")
    return pages


def targets() -> tuple[list[Path], set[Path]]:
    core = sitemap_pages()
    core.extend([REPO / "index.html", REPO / "404.html"])
    extras = sorted((REPO / "prototypes").rglob("*.html")) if (REPO / "prototypes").exists() else []

    seen: set[Path] = set()
    ordered: list[Path] = []
    for path in core + extras:
        resolved = path.resolve()
        if resolved not in seen:
            seen.add(resolved)
            ordered.append(path)
    return ordered, {p.resolve() for p in core}


def synchronize(check: bool = False) -> tuple[int, int, int]:
    site = load_site()
    values = template_values(site)
    header = render(HEADER_TEMPLATE, values)
    footer = render(FOOTER_TEMPLATE, values)
    pages, core = targets()

    changed: list[str] = []
    with_header = 0
    with_footer = 0

    for path in pages:
        if not path.exists():
            if path.resolve() in core:
                raise RuntimeError(f"Página corrente inexistente: {path.relative_to(REPO)}")
            continue

        original = path.read_text(encoding="utf-8")
        text = original

        header_match = HEADER_RE.search(text)
        if header_match:
            with_header += 1
            text = HEADER_RE.sub(header, text, count=1)
        elif path.resolve() in core:
            raise RuntimeError(f"Header transversal não encontrado: {path.relative_to(REPO)}")

        footer_match = FOOTER_RE.search(text)
        if footer_match:
            with_footer += 1
            text = FOOTER_RE.sub(footer, text, count=1)
        elif path.resolve() in core:
            raise RuntimeError(f"Footer transversal não encontrado: {path.relative_to(REPO)}")

        if text != original:
            changed.append(str(path.relative_to(REPO)))
            if not check:
                path.write_text(text, encoding="utf-8")

    if check and changed:
        preview = ", ".join(changed[:5])
        raise RuntimeError(
            f"Layout transversal dessincronizado em {len(changed)} ficheiros. "
            f"Primeiros: {preview}"
        )

    if with_footer < 120:
        raise RuntimeError(f"Esperados pelo menos 120 footers correntes, obtidos {with_footer}")

    mode = "validado" if check else "sincronizado"
    print(
        f"Layout transversal {mode}: {len(pages)} alvos; "
        f"{with_header} headers; {with_footer} footers; {len(changed)} alterações."
    )
    return len(pages), with_header, with_footer


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--check",
        action="store_true",
        help="Valida sem escrever e falha se as saídas não coincidirem com os partials.",
    )
    args = parser.parse_args()
    synchronize(check=args.check)


if __name__ == "__main__":
    main()
