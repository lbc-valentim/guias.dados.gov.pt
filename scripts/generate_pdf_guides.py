"""Gera a colecção PDF dos Guias do Utilizador a partir da fonte editorial.

O gerador deve permanecer determinístico: content/guides.json é a fonte de
conteúdo e .build/pdf é sempre descartável. A pasta assets/pdf só é
actualizada pelo workflow depois de a colecção passar pelas validações.

Notas para ampliações futuras:
* temas, slugs e relações são lidos directamente da fonte single-source;
* BASE_WEB aponta actualmente para GitHub Pages e deverá ser parametrizado
  quando o destino oficial dos Guias estiver definido;
* ao acrescentar elementos visuais, preservar texto seleccionável, ordem de
  leitura e contraste, e voltar a validar acessibilidade documental do PDF.
"""

import json, os, re, unicodedata, html, math, textwrap
from pathlib import Path
import qrcode
from weasyprint import HTML
from pypdf import PdfReader

REPO = Path(__file__).resolve().parents[1]
SRC = REPO / 'content' / 'guides.json'
SITE_CONFIG = REPO / 'content' / 'site.json'
OUT = REPO / '.build' / 'pdf'
OUT.mkdir(parents=True, exist_ok=True)
# Destino actual de revisão; não assumir como URL definitiva do produto.
BASE_WEB = ''  # preenchido a partir de content/site.json

SITE = json.loads(SITE_CONFIG.read_text(encoding='utf-8'))
AUTHOR = SITE['author']
PROTOTYPE = SITE['prototype']
AUTHOR_NAME = AUTHOR['name']
AUTHOR_ROLE = AUTHOR['role']
AUTHOR_LINK = AUTHOR['linkedin']
AUTHOR_LOGO_ALT = AUTHOR['logo_alt']
AUTHOR_LOGO_URI = (REPO / AUTHOR['logo_file']).resolve().as_uri()
PROTOTYPE_NAME = PROTOTYPE['name']
PROTOTYPE_VERSION = PROTOTYPE['version']
PROTOTYPE_STATUS = PROTOTYPE.get('status', '').strip()
PROTOTYPE_LABEL = f"Protótipo: '{PROTOTYPE_NAME}' {PROTOTYPE_VERSION}" + (f" {PROTOTYPE_STATUS}" if PROTOTYPE_STATUS else '')
DEPLOYMENT = SITE['site']
BASE_WEB = f"{DEPLOYMENT['reviewOrigin']}{DEPLOYMENT['basePath']}{DEPLOYMENT['guidesPath']}/"

CONTENT = json.loads(SRC.read_text(encoding='utf-8'))
PUBLICATION_STATUS = json.loads((REPO / 'content' / 'guide-publication-status.json').read_text(encoding='utf-8'))['guides']
GUIDES = CONTENT['guides']
THEMES = CONTENT['themes']
BY_CODE = {g['id']: g for g in GUIDES}
THEME_BY_ID = {t['id']: t for t in THEMES}


def slug(s:str)->str:
    s = unicodedata.normalize('NFD', s)
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    s = re.sub(r'[^A-Za-z0-9]+','-',s).strip('-')
    return s

# Preserva ligações históricas mesmo quando o título editorial muda.
PDF_SLUG_OVERRIDES = {
    'D01': 'autenticacao-e-acesso-a-conta',
    'D11': 'seguir-conteudos-e-notificacoes',
}

def esc(s): return html.escape(str(s or ''), quote=True)

def theme_url(theme): return BASE_WEB + theme['slug'] + '/'
def guide_slug(g): return g['slug']
def pdf_slug(g): return PDF_SLUG_OVERRIDES.get(g['code'], slug(g['title']).lower())
def guide_url(g): return theme_url(THEME_BY_ID[g['themeId']]) + guide_slug(g) + '/'

def icon(name, size=28):
    paths = {
      'search':'<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>',
      'explore':'<path d="M4 5h16v14H4z"/><path d="M7 15l3-3 2 2 5-5"/><circle cx="17" cy="8" r="1"/>',
      'publish':'<path d="M12 4v11"/><path d="m7 9 5-5 5 5"/><path d="M5 19h14"/>',
      'file':'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5"/>',
      'quality':'<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16.5 9"/>',
      'model':'<path d="M4 6h16v12H4z"/><path d="M8 6v12M4 10h16M4 14h16"/>',
      'org':'<path d="M4 20h16M6 20V8h12v12"/><path d="M9 11h2M13 11h2M9 15h2M13 15h2"/><path d="M9 8V5h6v3"/>',
      'api':'<path d="M8 4H5a2 2 0 0 0-2 2v3M16 4h3a2 2 0 0 1 2 2v3M8 20H5a2 2 0 0 1-2-2v-3M16 20h3a2 2 0 0 0 2-2v-3"/><path d="m9 9-3 3 3 3M15 9l3 3-3 3"/>',
      'reuse':'<path d="M4 7h11l-3-3M15 17H4l3 3"/><path d="M17 7a5 5 0 0 1 0 10"/>',
      'harvest':'<path d="M4 6h16M6 6l2 14h8l2-14"/><path d="M9 10h6M10 14h4"/>',
      'login':'<path d="M10 4H5v16h5"/><path d="M13 8l4 4-4 4M17 12H8"/>',
      'user':'<circle cx="12" cy="8" r="3.5"/><path d="M5.5 20c.6-4.1 3-6.1 6.5-6.1s5.9 2 6.5 6.1"/>',
      'bell':'<path d="M6 16h12l-1.5-2V10a4.5 4.5 0 0 0-9 0v4z"/><path d="M10 19h4"/>',
      'chat':'<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
      'help':'<circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.3 2.3 0 0 1 4.4 1c0 1.7-2.2 2-2.2 3.7M12 17h.01"/>',
      'table':'<path d="M4 5h16v14H4z"/><path d="M4 10h16M4 15h16M9 5v14M15 5v14"/>',
      'settings':'<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a7 7 0 0 0-1.7-1L14.5 3h-5L9 6.1a7 7 0 0 0-1.7 1l-2.4-1-2 3.4L5 11a7 7 0 0 0 0 2l-2.1 1.5 2 3.4 2.4-1a7 7 0 0 0 1.7 1l.5 3.1h5l.5-3.1a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2.1-1.5a7 7 0 0 0 .1-1z"/>',
    }
    p = paths.get(name, paths['file'])
    return f'<svg class="icon" width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{p}</svg>'

GUIDE_ICON = {
'D01':'login','D02':'org','D03':'search','D04':'publish','D05':'file','D06':'explore','D07':'quality','D08':'api','D09':'reuse','D10':'harvest','D11':'bell','D12':'chat','D13':'user','D14':'help','CM':'model'}

def task_icon(title):
    t=title.lower()
    for needle,name in [
      ('pesquis','search'),('filtro','search'),('autent','login'),('sessão','login'),('conta','user'),('perfil','user'),('organiza','org'),('membro','org'),('permiss','settings'),('public','publish'),('criar','publish'),('recurso','file'),('ficheiro','file'),('valid','quality'),('qualidade','quality'),('modelo','model'),('api','api'),('serviço','api'),('reutiliza','reuse'),('harvest','harvest'),('notifica','bell'),('seguir','bell'),('discuss','chat'),('coment','chat'),('ajuda','help'),('contact','help'),('problema','help'),('export','file'),('tabela','table'),('dados','explore')]:
        if needle in t: return name
    return 'file'

def short_step(s, maxlen=66):
    s=' '.join(str(s).split())
    if len(s)<=maxlen:return s
    cut=s[:maxlen-1]
    if ' ' in cut: cut=cut.rsplit(' ',1)[0]
    return cut+'…'

def task_flow(steps):
    items=steps[:4]
    boxes=[]
    for i,s in enumerate(items,1):
        boxes.append(f'<div class="flow-box"><b>{i:02d}</b><span>{esc(short_step(s))}</span></div>')
    joined='<span class="flow-arrow">→</span>'.join(boxes)
    extra=f'<div class="flow-more">+{len(steps)-4} passos adicionais</div>' if len(steps)>4 else ''
    return f'<div class="task-flow">{joined}</div>{extra}'

def overview_map(g):
    cards=[]
    for i,f in enumerate(g['fichas'],1):
        cards.append(f'<a class="map-card" href="#task-{i}"><span class="map-icon">{icon(task_icon(f["title"]),20)}</span><span><b>{i:02d}</b>{esc(f["title"])}</span></a>')
    return '<div class="map-grid">'+''.join(cards)+'</div>'

def render_table(table):
    if not table:return ''
    head=table[0]; rows=table[1:]
    return '<div class="table-wrap"><table><thead><tr>'+''.join(f'<th>{esc(x)}</th>' for x in head)+'</tr></thead><tbody>'+''.join('<tr>'+''.join(f'<td>{esc(x)}</td>' for x in row)+'</tr>' for row in rows)+'</tbody></table></div>'

def build_css(title):
    safe_title = title.replace('"','')
    return f'''
@page {{ size: 176mm 250mm; margin: 15mm 14mm 17mm 16mm;
 @top-left {{ content:"dados.gov.pt"; color:#526779; font:600 8pt Arial; }}
 @top-right {{ content:"{safe_title}"; color:#526779; font:500 8pt Arial; }}
 @bottom-left {{ content:"Guias do utilizador"; color:#708394; font:500 7.4pt Arial; }}
 @bottom-right {{ content:counter(page); color:#526779; font:700 8pt Arial; }} }}
@page:first {{ margin:0; @top-left{{content:none}} @top-right{{content:none}} @bottom-left{{content:none}} @bottom-right{{content:none}} }}
*{{box-sizing:border-box}}html{{font-family:Arial,sans-serif;color:#17253a}}body{{margin:0;font-size:10.2pt;line-height:1.46;background:#fff}}
a{{color:#005ce6;text-decoration:none}}h1,h2,h3,p{{margin-top:0}}h2{{font-size:17.5pt;line-height:1.12;color:#103454;margin:0}}h3{{font-size:11.5pt;color:#103454;margin:4mm 0 2mm}}p{{margin-bottom:3mm}}.icon{{display:block}}
.cover{{height:250mm;width:176mm;padding:18mm 15mm 14mm 17mm;position:relative;overflow:hidden;background:linear-gradient(145deg,#f7faff 0%,#fff 57%,#edf4fd 100%);break-after:page}}
.cover:before{{content:"";position:absolute;width:95mm;height:95mm;border:26mm solid rgba(0,92,230,.055);border-radius:50%;right:-35mm;top:-30mm}}
.wordmark{{font-size:15pt;font-weight:800;color:#0050b9;letter-spacing:-.04em}}.cover-kicker{{margin-top:25mm;color:#005ce6;font-size:8.6pt;text-transform:uppercase;font-weight:800;letter-spacing:.10em}}
.cover h1{{font-size:26pt;line-height:1.03;color:#103454;margin:4mm 0;max-width:127mm}}.cover-sub{{font-size:12pt;line-height:1.45;color:#435d73;max-width:118mm}}
.cover-status{{display:inline-block;margin-top:4mm;padding:2mm 3mm;border:1px solid #d49b2a;border-radius:2mm;background:#fff8e8;color:#645124;font-size:8.5pt}}
.hero{{margin-top:12mm;width:138mm;min-height:55mm;border-radius:8mm;background:#fff;border:1px solid #dce5eb;padding:7mm;position:relative;display:grid;grid-template-columns:42mm 1fr;gap:7mm;align-items:center}}
.hero-icon{{width:40mm;height:40mm;border-radius:12mm;background:#edf4fd;color:#005ce6;display:flex;align-items:center;justify-content:center}}
.hero-icon svg{{width:22mm;height:22mm}}.hero-steps{{display:grid;gap:2mm}}.hero-step{{display:grid;grid-template-columns:7mm 1fr;gap:2mm;align-items:center;color:#435d73;font-size:8pt}}.hero-step b{{width:6mm;height:6mm;border-radius:50%;background:#005ce6;color:#fff;display:flex;align-items:center;justify-content:center;font-size:6.8pt}}
.cover-meta{{position:absolute;left:17mm;right:15mm;bottom:14mm;border-top:1px solid #dce5eb;padding-top:4mm;display:flex;justify-content:space-between;color:#526779;font-size:8pt}}.cover-meta strong{{color:#25354a}}
.overview{{break-after:page}}.overview-grid{{display:grid;grid-template-columns:1fr 34mm;gap:6mm;align-items:start}}.lead{{font-size:11.7pt;color:#435d73;line-height:1.52}}.audience{{background:#f4f7f9;border-left:3px solid #005ce6;padding:4mm 5mm;border-radius:0 3mm 3mm 0;margin:5mm 0}}
.availability-note{{background:#fff8e8;border-left:3px solid #d49b2a;padding:3mm 4mm;border-radius:0 3mm 3mm 0;margin:4mm 0;color:#645124}}.availability-note strong{{font-size:9pt}}.availability-note p{{font-size:8pt;line-height:1.4;margin:1.5mm 0 0}}
.map-title{{font-size:13pt;margin:6mm 0 3mm;color:#103454}}.map-grid{{display:grid;grid-template-columns:1fr 1fr;gap:2.1mm}}.map-card{{display:grid;grid-template-columns:7mm 1fr;gap:2mm;align-items:center;border:1px solid #dce5eb;border-radius:3mm;padding:2.2mm 2.5mm;color:#17253a;background:#fff;break-inside:avoid}}.map-icon{{color:#005ce6}}.map-card b{{color:#005ce6;margin-right:1.5mm;font-size:7.5pt}}.map-card span:last-child{{font-size:8pt;line-height:1.22}}
.qr-card{{border-radius:5mm;background:#103454;color:white;padding:4mm;text-align:center}}.qr-card img{{width:25mm;height:25mm;background:#fff;padding:2mm;border-radius:3mm}}.qr-card strong{{display:block;font-size:9.5pt;margin-top:2mm}}.qr-card small{{font-size:7pt;line-height:1.35;display:block;color:#dce5eb;margin-top:1mm}}
.task{{padding-top:3mm;margin-top:4mm}}.task-head{{display:grid;grid-template-columns:12mm 1fr 12mm;gap:3mm;align-items:start;border-top:1.4px solid #005ce6;padding-top:3mm;break-inside:avoid}}.task-index{{font-weight:800;color:#005ce6;font-size:15pt;line-height:1}}.task-icon{{color:#005ce6;justify-self:end}}.eyebrow{{text-transform:uppercase;font-size:7.1pt;color:#526779;letter-spacing:.08em;font-weight:700;margin-bottom:1mm}}.task-intro{{font-size:9.8pt;color:#435d73;margin:2mm 0 0}}
.result-box{{display:grid;grid-template-columns:34mm 1fr;gap:4mm;background:#f7faff;border:1px solid #dce5eb;border-radius:3mm;padding:2.5mm 3.5mm;margin:3mm 0;break-inside:avoid}}.result-box strong{{color:#0050b9;font-size:7.8pt}}.result-box span{{font-size:8.4pt}}
.steps{{list-style:none;padding:0;margin:0;display:grid;gap:1.6mm}}.steps li{{display:grid;grid-template-columns:7mm 1fr;gap:2mm;align-items:start;break-inside:avoid}}.stepnum{{width:6mm;height:6mm;border-radius:50%;background:#005ce6;color:white;font-weight:800;font-size:7.4pt;display:flex;align-items:center;justify-content:center;margin-top:.2mm}}.steps li span:last-child{{font-size:8.9pt}}
.visual{{margin:3.5mm 0 3mm;border:1px solid #dce5eb;border-radius:4mm;background:#f8fafc;padding:3.4mm;break-inside:avoid}}.visual-title{{display:flex;align-items:center;gap:2mm;color:#103454;font-size:8pt;font-weight:800;margin-bottom:2.5mm}}.task-flow{{display:flex;align-items:stretch;gap:1.4mm}}.flow-box{{flex:1;min-width:0;background:#fff;border:1px solid #dce5eb;border-radius:3mm;padding:2.4mm;display:grid;grid-template-columns:5mm 1fr;gap:1.5mm;align-items:start}}.flow-box b{{width:5mm;height:5mm;border-radius:50%;background:#005ce6;color:white;font-size:6.5pt;display:flex;align-items:center;justify-content:center}}.flow-box span{{font-size:7pt;line-height:1.28;color:#435d73}}.flow-arrow{{display:flex;align-items:center;color:#005ce6;font-weight:800}}.flow-more{{font-size:6.8pt;color:#708394;margin-top:2mm;text-align:right}}
.table-wrap{{margin:3mm 0;overflow:hidden}}.table-wrap table{{border-collapse:collapse;width:100%;font-size:7.1pt}}.table-wrap thead{{display:table-header-group}}.table-wrap th{{background:#e4eefc;color:#103454;text-align:left;padding:2mm;border:1px solid #c8d5df}}.table-wrap td{{padding:2mm;border:1px solid #dce5eb;vertical-align:top}}.table-wrap tr{{break-inside:avoid}}.table-wrap tbody tr:nth-child(even){{background:#f8fafc}}
.callouts{{display:grid;grid-template-columns:1fr 1fr;gap:2mm;margin:2mm 0 .5mm}}.callout{{display:grid;grid-template-columns:5.5mm 1fr;gap:1.5mm;border-radius:3mm;padding:1.8mm 2mm;break-inside:avoid}}.callout svg{{color:#005ce6}}.callout strong{{font-size:7.8pt;color:#103454}}.callout p{{font-size:6.8pt;line-height:1.3;margin:.4mm 0 0;color:#435d73}}.callout.example{{background:#edf4fd}}.callout.tip{{background:#eaf5ef}}.callout.tip svg{{color:#237352}}
.resources{{margin:3mm 0;padding:3mm 4mm;background:#f7faff;border:1px solid #dce5eb;border-radius:3mm;break-inside:avoid}}.resources h3{{margin:0 0 2mm;font-size:10pt}}.resources ul{{margin:0;padding-left:5mm}}.resources li{{font-size:7.8pt;margin:1mm 0}}
.closing{{break-before:page;padding-top:8mm}}.closing-grid{{display:grid;grid-template-columns:1fr 36mm;gap:7mm;align-items:start}}.closing-qr{{background:#103454;color:#fff;border-radius:5mm;padding:4mm;text-align:center}}.closing-qr img{{width:27mm;height:27mm;background:#fff;padding:2mm;border-radius:3mm}}.closing-qr strong{{display:block;font-size:8pt;margin-top:2mm}}.guide-info{{margin-top:7mm;background:#f7faff;border:1px solid #dce5eb;border-radius:4mm;padding:3.5mm 4mm}}.guide-info h3{{margin:0 0 2mm;font-size:9.5pt;color:#103454}}.guide-info dl{{display:grid;grid-template-columns:32mm 1fr;margin:0;font-size:7.7pt}}.guide-info dt,.guide-info dd{{padding:1.7mm 0;border-top:1px solid #e6edf2;margin:0}}.guide-info dt{{font-weight:700;color:#526779}}.guide-info dd{{color:#25354a}}.internal-note{{margin-top:4mm;background:#fff8e8;border-left:3px solid #d49b2a;padding:2.5mm 3.5mm;font-size:7.2pt;color:#645124}}
/* PDF_AUTHOR_BRANDING_START */.pdf-author-credit{{margin-top:6mm;padding-top:4mm;border-top:1px solid #dce5eb;display:flex;gap:4mm;align-items:center;break-inside:avoid}}.pdf-author-credit img{{width:22mm;height:auto;flex:0 0 22mm;border-radius:1mm}}.pdf-author-credit p{{margin:0;font-size:7.5pt;line-height:1.42;color:#526779}}.pdf-author-credit p span{{display:inline-block;margin-top:1mm;color:#708394}}.pdf-author-credit a{{font-weight:700;color:#103454;text-decoration:none}}/* PDF_AUTHOR_BRANDING_END */
@media print{{.task-head,h2,h3,.result-box,.visual-title{{break-after:avoid}}}}
'''

def build_html(g, qr_name):
    title=g['title']; url=guide_url(g); theme=THEME_BY_ID[g['themeId']]['title'];
    status=PUBLICATION_STATUS.get(g['id'])
    css=build_css(title)
    hero_steps=''.join(f'<div class="hero-step"><b>{i}</b><span>{esc(f["title"])}</span></div>' for i,f in list(enumerate(g['fichas'],1))[:4])
    cover_status=f'<div class="cover-status"><strong>{esc(status["label"])}</strong></div>' if status else ''
    cover=f'''<section class="cover"><div class="wordmark">dados.gov.pt</div><div class="cover-kicker">Guias do utilizador · {esc(theme)}</div><h1>{esc(title)}</h1><p class="cover-sub">{esc(g['intro'])}</p>{cover_status}<div class="hero"><div class="hero-icon">{icon(GUIDE_ICON.get(g['code'],'file'),90)}</div><div class="hero-steps">{hero_steps}</div></div><div class="cover-meta"><span><strong>Formato</strong> B5 digital-first</span><span><strong>Actualização</strong> 29/09/2026</span></div></section>'''
    availability=f'<aside class="availability-note"><strong>{esc(status["label"])}</strong><p>{esc(status["message"])}</p></aside>' if status else ''
    overview=f'''<section class="overview"><div class="overview-grid"><div><div class="eyebrow">Visão geral</div><h2>Sobre este guia</h2><p class="lead">{esc(g['intro'])}</p><div class="audience"><strong>Este guia é para</strong><br>{esc(g['audience'])}</div>{availability}<div class="map-title">O que vai encontrar</div>{overview_map(g)}</div><aside class="qr-card"><img src="{qr_name}" alt="QR code para a versão Web do guia"><strong>Versão online</strong><small>Aponte a câmara para abrir o guia na Web.</small></aside></div></section>'''
    tasks=[]
    for i,f in enumerate(g['fichas'],1):
        steps=''.join(f'<li><span class="stepnum">{n}</span><span>{esc(s)}</span></li>' for n,s in enumerate(f['steps'],1))
        table=render_table(f.get('table'))
        visual=f'''<figure class="visual"><div class="visual-title">{icon(task_icon(f['title']),18)} Percurso visual da tarefa</div>{task_flow(f['steps'])}<figcaption style="font-size:7pt;color:#526779;margin-top:2mm"><strong>Esquema visual.</strong> Resume a sequência descrita acima; não substitui a interface real do portal.</figcaption></figure>'''
        callouts=f'''<div class="callouts"><aside class="callout example">{icon('explore',18)}<div><strong>Exemplo</strong><p>{esc(f['example'])}</p></div></aside><aside class="callout tip">{icon('help',18)}<div><strong>Dica</strong><p>{esc(f['tip'])}</p></div></aside></div>'''
        tasks.append(f'''<section class="task" id="task-{i}"><div class="task-head"><span class="task-index">{i:02d}</span><div><div class="eyebrow">Tarefa {i} de {len(g['fichas'])}</div><h2>{esc(f['title'])}</h2><p class="task-intro">{esc(f['intro'])}</p></div><div class="task-icon">{icon(task_icon(f['title']),34)}</div></div><div class="result-box"><strong>Objectivo desta tarefa</strong><span>{esc(f['intro'])}</span></div><h3>Como fazer</h3><ol class="steps">{steps}</ol>{visual}{table}{callouts}</section>''')
    resources=''
    if g.get('resources'):
        resources='<section class="resources"><h3>Ligações úteis</h3><ul>'+''.join(f'<li><a href="{esc(r["url"])}">{esc(r["title"])}</a><br><span style="font-size:6.5pt;color:#708394;word-break:break-all">{esc(r["url"])}</span></li>' for r in g['resources'])+'</ul></section>'
    closing=f'''<section class="closing"><div class="eyebrow">Fim do guia</div><h2>Continue na versão online</h2><div class="closing-grid"><div><p>Consulte a versão Web para aceder à versão mais recente deste guia e navegar pelos restantes conteúdos dos Guias do utilizador.</p>{resources}<p><a href="{esc(url)}">{esc(url)}</a></p></div><div class="closing-qr"><img src="{qr_name}" alt="QR code para a versão Web"><strong>Versão online</strong></div></div><section class="guide-info"><h3>Informação do guia</h3><dl><dt>Título</dt><dd>{esc(title)}</dd><dt>Tema</dt><dd>{esc(theme)}</dd><dt>Última actualização</dt><dd>29/09/2026</dd></dl></section><div class="internal-note"><strong>Nota editorial:</strong> alguns elementos visuais deste guia são esquemas informativos baseados no conteúdo consolidado.</div><div class="pdf-author-credit"><img src="{AUTHOR_LOGO_URI}" alt="{esc(AUTHOR_LOGO_ALT)}"><p>{esc(AUTHOR_ROLE)}: <a href="{AUTHOR_LINK}">{esc(AUTHOR_NAME)}</a><br><span>© dados.gov.pt · {esc(PROTOTYPE_LABEL)}</span></p></div></section>'''
    return f'''<!doctype html><html lang="pt-PT"><head><meta charset="utf-8"><title>{esc(title)} | Guias do utilizador | dados.gov.pt</title><meta name="author" content="dados.gov.pt"><meta name="description" content="{esc(g['intro'])}"><meta name="keywords" content="dados abertos, dados.gov.pt, guia do utilizador, {esc(theme)}"><style>{css}</style></head><body>{cover}{overview}{''.join(tasks)}{closing}</body></html>'''

def norm(s):
    s=unicodedata.normalize('NFKC',str(s))
    s=re.sub(r'-\s+', '-', s)
    s=re.sub(r'\s+',' ',s).strip().lower()
    return s

def source_text_items(g):
    items=[g['title'],g['intro'],g['audience']]
    status=PUBLICATION_STATUS.get(g['id'])
    if status: items += [status['label'], status['message']]
    for f in g['fichas']:
        items += [f['title'],f['intro'],*f['steps'],f['example'],f['tip']]
        if f.get('table'):
            for row in f['table']: items += row
    for r in g.get('resources',[]): items += [r['title'],r['url']]
    return [x for x in items if str(x).strip()]

summary=[]
for g in GUIDES:
    code=g['code']; folder=OUT/code
    folder.mkdir(parents=True, exist_ok=True)
    out_pdf=folder/f'dados-gov-pt-guia-{pdf_slug(g)}-v2.pdf'
    qr=qrcode.make(guide_url(g)); qr_path=folder/'qr.png'; qr.save(qr_path)
    html_text=build_html(g,'qr.png')
    html_path=folder/'index.html'; html_path.write_text(html_text,encoding='utf-8')
    HTML(filename=str(html_path), base_url=str(folder)).write_pdf(str(out_pdf), pdf_tags=True, srgb=True)
    reader=PdfReader(str(out_pdf))
    text='\n'.join((p.extract_text() or '') for p in reader.pages)
    ntext=norm(text)
    items=source_text_items(g)
    missing=[x for x in items if norm(x) not in ntext]
    outlines=0
    try:
        def count_outline(x):
            nonlocal_dummy=0
        def rec(seq):
            c=0
            for v in seq:
                if isinstance(v,list): c+=rec(v)
                else: c+=1
            return c
        outlines=rec(reader.outline)
    except Exception:
        outlines=0
    meta=reader.metadata or {}
    summary.append({
        'code':code,'title':g['title'],'pages':len(reader.pages),'size_kb':round(out_pdf.stat().st_size/1024,1),
        'source_items':len(items),'missing_items':len(missing),'outline_items':outlines,'tagged':('/MarkInfo' in reader.trailer['/Root']),
        'file':str(out_pdf),'missing_preview':missing[:5]
    })

(OUT/'qa-summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(summary,ensure_ascii=False,indent=2))
