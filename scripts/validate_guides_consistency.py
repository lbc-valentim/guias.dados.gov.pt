"""Guardrail de consistência dos Guias do Utilizador.

A fonte editorial canónica é content/guides.json. Este script verifica se
os artefactos derivados (rotas estáticas, pesquisa, sitemap e dados JavaScript)
continuam sincronizados e se os requisitos estruturais mínimos da experiência
web não regrediram.

Notas para ampliações futuras:
* adicionar novos guias/temas exige rever THEMES e as contagens esperadas;
* *_SLUG_OVERRIDES existem apenas para preservar URLs históricas;
* SITE_ORIGIN e SITE_PREFIX são específicos da publicação GitHub Pages
  e devem ser parametrizados quando existir o destino oficial;
* novas validações devem produzir erros observáveis e determinísticos para CI.
"""

from __future__ import annotations

import json
import re
import sys
import unicodedata
import xml.etree.ElementTree as ET
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content" / "guides.json"
SEARCH = ROOT / "assets" / "js" / "search-index.json"
DYNAMIC = ROOT / "assets" / "js" / "data.js"
DYNAMIC_D01 = ROOT / "assets" / "js" / "data-d01.js"
SITEMAP = ROOT / "sitemap.xml"
WEB_ROOT = ROOT / "Guias-do-utilizador"

# Destino actual de revisão. Não tratar como URL definitiva do produto.
SITE_ORIGIN = "https://timmarcelino.github.io"
SITE_PREFIX = "/Guias_dados.gov.pt/Guias-do-utilizador/"
SITE_BASE = SITE_ORIGIN + SITE_PREFIX

THEMES = [
    ("Encontrar, consultar e explorar dados", ["D03", "D06"]),
    ("Publicar e gerir dados", ["D04", "D05"]),
    ("Qualidade e modelos de dados", ["D07", "CM"]),
    ("Organizações", ["D02"]),
    ("APIs, reutilizações e automatização", ["D08", "D09", "D10"]),
    ("Acesso, perfil e participação", ["D01", "D13", "D11", "D12"]),
    ("Ajuda e contactos", ["D14"]),
]

# Contrato da versão candidata. Manter valores explícitos evita que uma remoção
# acidental na fonte editorial seja aceite por uma validação puramente derivada.
EXPECTED_GUIDE_COUNT = 15
EXPECTED_TASK_COUNT = 95
EXPECTED_ROUTE_COUNT = 1 + len(THEMES) + EXPECTED_GUIDE_COUNT + EXPECTED_TASK_COUNT

# Contratos de compatibilidade: títulos podem evoluir sem quebrar URLs já publicadas.
GUIDE_SLUG_OVERRIDES = {
    "D11": "Seguir-conteudos-e-notificacoes",
}

TASK_SLUG_OVERRIDES = {
    ("D01", "Concluir o primeiro acesso quando solicitado"): "Concluir-o-primeiro-acesso-e-confirmar-o-email",
    ("D13", "Consultar o perfil de outro utilizador"): "Consultar-um-perfil-publico",
    ("D11", "Adicionar aos favoritos"): "Seguir-um-conteudo",
    ("D11", "Remover dos favoritos"): "Deixar-de-seguir-um-conteudo",
}

FORBIDDEN_TEXT = [
    "A licença inicial é CC BY 4.0",
    "O percurso completo aguarda validação",
    "data de registo apresentados",
    "Consultar um perfil público",
    "validado em TST",
    "validada em TST",
    "percurso em TST",
    "ambiente validado",
]


class VisibleTextParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts = []
        self.hidden_depth = 0

    def handle_starttag(self, tag, attrs):
        if tag.lower() in {"script", "style", "template"}:
            self.hidden_depth += 1

    def handle_endtag(self, tag):
        if tag.lower() in {"script", "style", "template"} and self.hidden_depth:
            self.hidden_depth -= 1

    def handle_data(self, data):
        if not self.hidden_depth:
            value = data.strip()
            if value:
                self.parts.append(value)


def normalise_text(value: str) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def visible_text_of(html: str) -> str:
    parser = VisibleTextParser()
    parser.feed(html)
    return normalise_text(" ".join(parser.parts))


def task_content_values(ficha: dict):
    values = [
        ("title", ficha.get("title", "")),
        ("intro", ficha.get("intro", "")),
        ("roles", ficha.get("roles", "")),
    ]
    values.extend((f"step {index}", step) for index, step in enumerate(ficha.get("steps", []), start=1))
    values.extend([
        ("example", ficha.get("example", "")),
        ("tip", ficha.get("tip", "")),
        ("media", ficha.get("media", "")),
    ])
    for row_index, row in enumerate(ficha.get("table") or [], start=1):
        for col_index, cell in enumerate(row, start=1):
            values.append((f"table {row_index}.{col_index}", str(cell)))
    return [(label, normalise_text(value)) for label, value in values if normalise_text(value)]


def validate_task_content(path: Path, ficha: dict, errors: list[str]):
    if not path.exists():
        return
    page_text = visible_text_of(path.read_text(encoding="utf-8"))
    rel = str(path.relative_to(ROOT))
    for label, expected in task_content_values(ficha):
        if expected not in page_text:
            errors.append(f"{rel}: conteúdo divergente ({label}): {expected!r}")


def validate_guide_content(path: Path, guide: dict, errors: list[str]):
    if not path.exists():
        return
    page_text = visible_text_of(path.read_text(encoding="utf-8"))
    rel = str(path.relative_to(ROOT))
    for label, expected in [
        ("title", guide.get("title", "")),
        ("intro", guide.get("intro", "")),
        ("audience", guide.get("audience", "")),
    ]:
        expected = normalise_text(expected)
        if expected and expected not in page_text:
            errors.append(f"{rel}: conteúdo do guia divergente ({label}): {expected!r}")
    for ficha in guide.get("fichas", []):
        title = normalise_text(ficha.get("title", ""))
        if title and title not in page_text:
            errors.append(f"{rel}: ficha ausente na visão geral: {title!r}")


def slug(value: str) -> str:
    value = unicodedata.normalize("NFD", value)
    value = "".join(c for c in value if unicodedata.category(c) != "Mn")
    return re.sub(r"[^A-Za-z0-9]+", "-", value).strip("-")


def guide_slug(code: str, title: str) -> str:
    return GUIDE_SLUG_OVERRIDES.get(code, slug(title))


def task_slug(code: str, title: str) -> str:
    return TASK_SLUG_OVERRIDES.get((code, title), slug(title))


def extract_js_guides(text: str):
    marker = "export const guides = "
    start = text.find(marker)
    if start < 0:
        raise AssertionError("assets/js/data.js: export const guides não encontrado")
    start += len(marker)
    depth = 0
    in_string = False
    escaped = False
    end = None
    for idx in range(start, len(text)):
        ch = text[idx]
        if in_string:
            if escaped:
                escaped = False
            elif ch == "\\":
                escaped = True
            elif ch == '"':
                in_string = False
            continue
        if ch == '"':
            in_string = True
        elif ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                end = idx + 1
                break
    if end is None:
        raise AssertionError("assets/js/data.js: array guides incompleto")
    return json.loads(text[start:end])


def canonical_of(html: str) -> str | None:
    match = re.search(r'<link\s+rel="canonical"\s+href="([^"]+)"', html, re.I)
    return match.group(1) if match else None


def title_of(html: str) -> str | None:
    match = re.search(r"<title>([^<]+)</title>", html, re.I)
    return match.group(1).strip() if match else None


def validate_html(path: Path, expected_url: str, errors: list[str], titles: list[tuple[str, str]]):
    if not path.exists():
        errors.append(f"Rota em falta: {path.relative_to(ROOT)}")
        return
    html = path.read_text(encoding="utf-8")
    rel = str(path.relative_to(ROOT))
    if '<html lang="pt-PT">' not in html:
        errors.append(f"{rel}: lang pt-PT em falta")
    if len(re.findall(r"<main\b", html, re.I)) != 1:
        errors.append(f"{rel}: esperado exactamente 1 main")
    if len(re.findall(r"<h1\b", html, re.I)) != 1:
        errors.append(f"{rel}: esperado exactamente 1 h1")
    if 'class="skip-link"' not in html or 'href="#conteudo"' not in html:
        errors.append(f"{rel}: skip link/target esperado em falta")
    if 'id="conteudo"' not in html:
        errors.append(f"{rel}: id=conteudo em falta")
    canonical = canonical_of(html)
    if canonical != expected_url:
        errors.append(f"{rel}: canonical {canonical!r} != {expected_url!r}")
    page_title = title_of(html)
    if not page_title:
        errors.append(f"{rel}: title em falta")
    else:
        titles.append((page_title, rel))
    ids = re.findall(r'\sid="([^"]+)"', html, re.I)
    duplicates = [item for item, count in Counter(ids).items() if count > 1]
    if duplicates:
        errors.append(f"{rel}: ids duplicados {duplicates}")
    for image in re.findall(r"<img\b[^>]*>", html, re.I | re.S):
        if not re.search(r'\salt="[^"]*"', image, re.I):
            errors.append(f"{rel}: imagem sem alt")
    for forbidden in FORBIDDEN_TEXT:
        if forbidden in html:
            errors.append(f"{rel}: texto obsoleto encontrado: {forbidden}")


def main() -> int:
    errors: list[str] = []
    guides = json.loads(CONTENT.read_text(encoding="utf-8"))
    if len(guides) != EXPECTED_GUIDE_COUNT:
        errors.append(f"Esperados {EXPECTED_GUIDE_COUNT} guias; obtidos {len(guides)}")
    task_count = sum(len(g.get("fichas", [])) for g in guides)
    if task_count != EXPECTED_TASK_COUNT:
        errors.append(f"Esperadas {EXPECTED_TASK_COUNT} fichas; obtidas {task_count}")

    by_code = {g["code"]: g for g in guides}
    expected_codes = {code for _, codes in THEMES for code in codes}
    if set(by_code) != expected_codes:
        errors.append(f"Códigos de guias divergentes: {sorted(set(by_code) ^ expected_codes)}")

    theme_of = {code: theme for theme, codes in THEMES for code in codes}

    expected_search = {}
    expected_sitemap = {SITE_BASE}
    route_files: list[tuple[Path, str]] = [(WEB_ROOT / "index.html", SITE_BASE)]
    guide_pages = []
    task_pages = []

    for theme, codes in THEMES:
        theme_path = f"{slug(theme)}/"
        theme_url = SITE_BASE + theme_path
        expected_sitemap.add(theme_url)
        route_files.append((WEB_ROOT / slug(theme) / "index.html", theme_url))
        for code in codes:
            guide = by_code[code]
            guide_path = f"{theme_path}{guide_slug(code, guide['title'])}/"
            guide_url = SITE_BASE + guide_path
            expected_sitemap.add(guide_url)
            guide_file = WEB_ROOT / slug(theme) / guide_slug(code, guide["title"]) / "index.html"
            route_files.append((guide_file, guide_url))
            guide_pages.append((guide_file, guide))
            for ficha in guide["fichas"]:
                task_path = f"{guide_path}{task_slug(code, ficha['title'])}/"
                full_url = SITE_BASE + task_path
                expected_sitemap.add(full_url)
                expected_search[ficha["title"]] = {
                    "url": SITE_PREFIX + task_path,
                    "intro": ficha["intro"],
                    "text": " ".join(
                        [ficha["title"], ficha["intro"], *ficha.get("steps", []), ficha.get("tip", "")]
                    ).strip(),
                }
                task_file = WEB_ROOT / slug(theme) / guide_slug(code, guide["title"]) / task_slug(code, ficha["title"]) / "index.html"
                route_files.append((task_file, full_url))
                task_pages.append((task_file, ficha))

    search = json.loads(SEARCH.read_text(encoding="utf-8"))
    if len(search) != EXPECTED_TASK_COUNT:
        errors.append(f"search-index: esperadas {EXPECTED_TASK_COUNT} entradas; obtidas {len(search)}")
    actual_search = {item.get("title"): item for item in search}
    if set(actual_search) != set(expected_search):
        missing = sorted(set(expected_search) - set(actual_search))
        extra = sorted(set(actual_search) - set(expected_search))
        errors.append(f"search-index: títulos divergentes; missing={missing}; extra={extra}")
    for title, expected in expected_search.items():
        item = actual_search.get(title)
        if not item:
            continue
        if item.get("url") != expected["url"]:
            errors.append(f"search-index: URL divergente para {title!r}")
        if item.get("intro") != expected["intro"]:
            errors.append(f"search-index: intro divergente para {title!r}")
        if item.get("text") != expected["text"]:
            errors.append(f"search-index: texto pesquisável divergente para {title!r}")

    tree = ET.parse(SITEMAP)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    actual_sitemap = {loc.text.strip() for loc in tree.findall(".//sm:loc", ns) if loc.text}
    if actual_sitemap != expected_sitemap:
        missing = sorted(expected_sitemap - actual_sitemap)
        extra = sorted(actual_sitemap - expected_sitemap)
        errors.append(f"sitemap divergente; missing={missing}; extra={extra}")
    if len(actual_sitemap) != EXPECTED_ROUTE_COUNT:
        errors.append(f"sitemap: esperadas {EXPECTED_ROUTE_COUNT} URLs; obtidas {len(actual_sitemap)}")

    titles: list[tuple[str, str]] = []
    for path, url in route_files:
        validate_html(path, url, errors, titles)
    for path, guide in guide_pages:
        validate_guide_content(path, guide, errors)
    for path, ficha in task_pages:
        validate_task_content(path, ficha, errors)

    title_map: dict[str, list[str]] = {}
    for page_title, rel in titles:
        title_map.setdefault(page_title, []).append(rel)
    duplicated_titles = {title: paths for title, paths in title_map.items() if len(paths) > 1}
    if duplicated_titles:
        errors.append(f"Títulos HTML duplicados nas rotas: {duplicated_titles}")

    dynamic = extract_js_guides(DYNAMIC.read_text(encoding="utf-8"))
    dyn_by_code = {g["code"]: g for g in dynamic}
    expected_dynamic_codes = set(by_code) - {"D01"}
    if set(dyn_by_code) != expected_dynamic_codes:
        errors.append(
            "assets/js/data.js: conjunto de códigos difere da fonte editorial "
            f"(esperado sem D01 modularizado: {sorted(expected_dynamic_codes)}; "
            f"obtido: {sorted(dyn_by_code)})"
        )
    for code, guide in by_code.items():
        if code == "D01":
            continue
        dg = dyn_by_code.get(code)
        if not dg:
            continue
        for field in ("title", "intro", "audience", "fichas"):
            if dg.get(field) != guide.get(field):
                errors.append(f"assets/js/data.js: campo {field} divergente em {code}")

    d01_text = DYNAMIC_D01.read_text(encoding="utf-8")
    d01 = by_code["D01"]
    if 'code: "D01"' not in d01_text:
        errors.append("assets/js/data-d01.js: código D01 em falta")
    if f'title: "{d01["title"]}"' not in d01_text:
        errors.append("assets/js/data-d01.js: título D01 divergente")
    def iter_strings(value):
        if isinstance(value, str):
            yield value
        elif isinstance(value, list):
            for item in value:
                yield from iter_strings(item)
        elif isinstance(value, dict):
            for item in value.values():
                yield from iter_strings(item)

    for value in iter_strings(d01):
        encoded = json.dumps(value, ensure_ascii=False)
        if encoded not in d01_text:
            errors.append(
                "assets/js/data-d01.js: conteúdo D01 em falta ou divergente: "
                f"{value!r}"
            )

    page404 = ROOT / "404.html"
    if not page404.exists():
        errors.append("404.html em falta")
    else:
        html404 = page404.read_text(encoding="utf-8")
        for token in ['name="robots" content="noindex"', '<main id="conteudo"', '<h1>Página não encontrada</h1>']:
            if token not in html404:
                errors.append(f"404.html: elemento esperado em falta: {token}")

    search_js = (ROOT / "assets" / "js" / "search.js").read_text(encoding="utf-8")
    if "setAttribute('role','status')" not in search_js or "setAttribute('aria-live','polite')" not in search_js:
        errors.append("Pesquisa: status acessível não configurado")

    if errors:
        print("VALIDAÇÃO DOS GUIAS: FALHOU")
        for error in errors:
            print(f"- {error}")
        return 1

    print("VALIDAÇÃO DOS GUIAS: OK")
    print(f"- Guias: {len(guides)}")
    print(f"- Fichas: {task_count}")
    print(f"- Rotas/sitemap: {len(expected_sitemap)}")
    print(f"- Pesquisa: {len(search)} entradas")
    print(f"- HTML validado: {len(route_files)} páginas")
    return 0


if __name__ == "__main__":
    sys.exit(main())
