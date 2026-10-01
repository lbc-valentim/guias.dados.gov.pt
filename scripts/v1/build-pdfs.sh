#!/usr/bin/env bash
set -euo pipefail
rm -rf .build/pdf
mkdir -p .build public/assets/pdf
python scripts/generate_pdf_guides.py > .build/pdf-generator-output.json
rm -f public/assets/pdf/*.pdf
for f in .build/pdf/*/dados-gov-pt-guia-*-v2.pdf; do
  name="$(basename "$f")"
  target="$(printf '%s' "$name" | sed -e 's/^dados-gov-pt-guia-//' -e 's/-v2\.pdf$/.pdf/')"
  cp "$f" "public/assets/pdf/$target"
done
python - <<'PY'
import json
from pathlib import Path
from pypdf import PdfReader

site=json.loads(Path('content/site.json').read_text(encoding='utf-8'))
author=site['author']['name']
version=site['prototype']['version']
qa=json.loads(Path('.build/pdf/qa-summary.json').read_text(encoding='utf-8'))

assert len(qa)==15
assert not [x for x in qa if x['missing_items'] != 0]
assert not [x for x in qa if not x.get('tagged')]

pdfs=sorted(Path('public/assets/pdf').glob('*.pdf'))
assert len(pdfs)==15, len(pdfs)

for pdf in pdfs:
    reader=PdfReader(str(pdf))
    assert len(reader.pages)>=1, pdf.name

    root=reader.trailer['/Root']
    struct_tree=root.get('/StructTreeRoot')
    mark_info=root.get('/MarkInfo')
    if hasattr(mark_info, 'get_object'):
        mark_info=mark_info.get_object()

    assert struct_tree is not None, f'{pdf.name}: StructTreeRoot em falta'
    assert mark_info is not None and bool(mark_info.get('/Marked')), f'{pdf.name}: MarkInfo/Marked inválido'
    assert str(root.get('/Lang', '')) == 'pt-PT', f'{pdf.name}: idioma documental inválido'

    metadata=reader.metadata or {}
    assert metadata.title, f'{pdf.name}: título documental em falta'

    text='\n'.join((page.extract_text() or '') for page in reader.pages)
    assert author in text, pdf.name
    assert version in text, pdf.name

print('PDF v1: 15/15 derivados da fonte única, com autoria, estrutura marcada, árvore semântica e idioma pt-PT.')
PY
