# Entrega técnica à equipa dados.gov.pt

## Ponto de partida
Este repositório entrega o protótipo v1 e a revisão editorial D01+D13 publicada em 01/10/2026. Não é uma integração já aprovada ou instalada no portal oficial.

| Elemento | Baseline |
| --- | --- |
| Origem | Timmarcelino/Guias_dados.gov.pt |
| Commit de origem | c4ba678dbc7f466b8603d56263840cc4ff70c225 |
| Conteúdo | 7 temas, 15 guias, 96 fichas |
| Rotas | 119 actuais; 118 históricas v0.5 preservadas |
| PDFs | 15 |
| Fonte activa | JSON local |
| Demonstração prevista | https://lbc-valentim.github.io/guias.dados.gov.pt/Guias-do-utilizador/ |

Os resultados de CI devem ser consultados no PR de migração e no workflow do commit integrado. Os relatórios antigos e pastas `.build/`, `versions/` e `prototypes/` são referências históricas, não comprovativos de execução actual.

## Instalação e desenvolvimento
Pré-requisitos: Git, Node.js 20 (baseline da CI) e npm. Para PDFs e testes, a CI usa Python 3.12 no Ubuntu, WeasyPrint 68.0, pypdf 5.9.0, qrcode, fontes Inter e bibliotecas Pango.

```bash
git clone https://github.com/lbc-valentim/guias.dados.gov.pt.git
cd guias.dados.gov.pt
npm ci
npm run dev
```

O desenvolvimento sem base path abre em http://localhost:3000/Guias-do-utilizador/.

Para reproduzir a demonstração publicada:

```bash
npm run content:validate
npm run routes:check
npm run test:squidex
npm run content:source:check
npm run typecheck
bash scripts/v1/build-pdfs.sh
NEXT_PUBLIC_BASE_PATH=/guias.dados.gov.pt npm run build
npm run test:ux
```

O script PDF requer as dependências acima. Em Windows, use WSL ou a CI Ubuntu para reproduzir esse passo; não assuma equivalência de fontes e paginação entre sistemas. Para definir o base path em PowerShell, use `$env:NEXT_PUBLIC_BASE_PATH='/guias.dados.gov.pt'` antes do build.

O export fica em `out/`. O teste UX prepara esse export sob `.build/site/guias.dados.gov.pt/`. A geração de PDF tem um gate próprio de equivalência com os ficheiros versionados em `assets/pdf/`.

## Mapa do código
| Localização | Responsabilidade |
| --- | --- |
| `content/guides.json` | Fonte editorial por defeito; IDs, slugs, fichas e relações |
| `content/site.json` | Origem, base path, autoria e configuração da demonstração |
| `content/guide-publication-status.json` | Estados editoriais do protótipo |
| `src/lib/content/` | Contrato GuidesContent, Zod, fontes, normalização, rotas e pesquisa |
| `src/app/` | Rotas Next.js e composição das páginas |
| `src/components/agora/` | Wrappers dos componentes Ágora e shell da demonstração |
| `scripts/v1/` | Guardrails, derivados, PDF, Squidex simulado e preparação de testes |
| `tests/` | Contratos, testes unitários, integração e UX |
| `.github/workflows/` | CI, PDFs e publicação da demonstração |
| `Guias-do-utilizador/`, `versions/`, `prototypes/` | Material histórico; não editar como fonte da v1 |

Não alterar IDs, slugs ou o contrato `tests/contracts/v0.5-routes.json` para acomodar uma mudança editorial. Novas rotas podem ser acrescentadas, preservando as 118 históricas.

## Manutenção e revisão
1. Alterar a fonte editorial e, quando necessário, a configuração transversal.
2. Validar referências, rotas e contagens. Uma expansão autorizada exige ajustar os guardrails correspondentes.
3. Regenerar os PDFs afectados e verificar texto, paginação, metadados e links.
4. Abrir PR e exigir os gates relevantes verdes.
5. Confirmar o deploy e verificar o endereço público. Ficheiros presentes não provam publicação.

`guides-consistency.yml` é um workflow legacy manual. Os gates correntes são `v1-ci.yml`, `guides-pdf.yml` e o build em `pages-v1.yml`. O deploy Pages só decorre após integração ou execução manual.

## Integração no portal oficial
Decisões ainda necessárias à equipa:
- Adoptar rota e origem institucionais, alinhando links, canonicals, sitemap, pesquisa e PDFs. O nome do repositório não configura o domínio guias.dados.gov.pt.
- Integrar header, footer e autoria institucionais. A demonstração mantém a autoria existente.
- Validar acessibilidade no contexto real, tendo WCAG 2.2 AA como alvo, incluindo teclado, foco, semântica, contraste, erros e NVDA. Os testes UX e a marcação dos PDFs não certificam conformidade.
- Confirmar comportamento editorial face a requisitos aprovados e ambientes aplicáveis.
- Decidir fonte editorial, permissões, publicação, gestão de versões, responsáveis e operação do CMS.
- Confirmar segurança, privacidade, licenças e adequação dos conteúdos e recursos à publicação oficial.

## Squidex e credenciais
O default é `GUIDES_CONTENT_SOURCE=local`. A escolha `squidex` é explícita e não tem fallback silencioso. Os testes e dry runs não são importações.

O estado remoto registado anteriormente não foi revalidado nesta migração. Antes de activar o CMS, reconciliar a revisão de 96 tarefas com o conteúdo remoto e seguir [SQUIDEX_ACTIVATION.md](SQUIDEX_ACTIVATION.md) e [SQUIDEX_IMPORT_RUNBOOK.md](SQUIDEX_IMPORT_RUNBOOK.md).

Use `.env.example` como referência. Não versionar tokens, ficheiros `.env` privados nem dados reais de utilizadores. Esta entrega não copia credenciais nem altera Jira, Squidex ou SharePoint.

## Histórico e recuperação
O histórico original de main e as tags alcançadas no clone estão preservados num Git bundle dividido em seis partes, com comando de reconstrução e hash e instruções em [MIGRATION_2026-10-01.md](MIGRATION_2026-10-01.md). Os commits originais não foram reescritos para simular a sua pertença ao destino.

A licença existente está em [LICENSE](../LICENSE). O registo de origem e autoria foi preservado.
