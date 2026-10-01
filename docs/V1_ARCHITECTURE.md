# Arquitectura v1.0 dos Guias do Utilizador

## Estado

A arquitectura v1.0 está implementada e validada como release estável `v1.0.0` deste repositório.

A fonte activa por defeito continua a ser Local JSON. A fonte Squidex existe por opt in explícito e não tem fallback silencioso.

A integração oficial no portal dados.gov.pt, a substituição pelo shell institucional e a validação de acessibilidade no contexto real do portal ficam fora do âmbito desta release.

## Objectivo

Manter `GuidesContent` como contrato interno único e `content/guides.json` como fonte editorial versionada por defeito. A UI, rotas, pesquisa, sitemap e PDFs são derivados a partir desse domínio sem transformar HTML materializado em fonte funcional.

## Stack

1. Next.js 16.3.6, React 19.2.3 e TypeScript 5.9.
2. `@ama-pt/agora-design-system` 4.0.1 através de wrappers locais, alinhado com o frontend oficial.
3. Tailwind 4.3 em configuração CSS-first com `@tailwindcss/postcss`, Zod 4.6 e Playwright para validação automatizada.
4. `output: export` e `trailingSlash: true` para preservar a demonstração estática e o contrato histórico de URLs.

## Decisões arquitecturais

1. IDs e slugs são persistentes. Relações usam IDs funcionais e não títulos.
2. As 118 rotas da v0.5.0 são um contrato de compatibilidade validado automaticamente.
3. A UI consome `loadConfiguredContent()` e não lê directamente a fonte editorial.
4. Sem configuração, `GUIDES_CONTENT_SOURCE=local` é o comportamento efectivo.
5. Squidex só é seleccionado explicitamente e é normalizado antes de chegar a `GuidesContent`.
6. Não existe fallback silencioso de Squidex para Local JSON.
7. A autoria pessoal permanece transversal nesta release e deverá ser substituída pelo footer institucional quando a equipa integrar a solução no portal oficial.

## Pipeline da release

`guides.json → Zod → validação de referências → contrato de rotas → Next.js → static export`

A pesquisa, o sitemap e os PDFs da release actual continuam derivados da fonte Local JSON. Esta decisão mantém todos os artefactos reproduzíveis e coerentes com a baseline versionada.

Se a equipa activar Squidex como fonte editorial oficial no futuro, deverá alinhar também pesquisa, sitemap e PDFs à mesma fonte ou documentar explicitamente a separação.

## Squidex provisório

O registo anterior da instância provisória descreve a seguinte baseline em Draft. Não foi revalidada nem sincronizada nesta migração; a fonte local actual tem 96 tarefas:

* 7 temas;
* 15 guias;
* 95 tarefas;
* 117 conteúdos funcionais;
* 409 componentes de passos;
* 11 resources;
* 3 tabelas.

O piloto técnico `tema-piloto / D99 / D99-T01 / D99-T02` permanece separado. A equivalência semântica da baseline importada com `content/guides.json` foi validada após normalização das representações próprias do CMS.

As queries GraphQL usam `top: 200`, valor suficiente para a baseline actual. Uma expansão que possa ultrapassar 200 conteúdos por schema deve implementar paginação ou um guardrail de overflow antes da activação oficial.

## Gates desta release

* 15 guias, 96 fichas, 7 temas e 119 rotas actuais;
* 118/118 URLs históricas preservadas;
* referências internas válidas e IDs sem duplicação;
* static export reconstruível a partir de clone limpo;
* pesquisa e sitemap derivados;
* 15/15 PDFs gerados e validados;
* autoria transversal em Web e PDF;
* testes Squidex, dry run, preflight e safety check verdes;
* typecheck e build verdes;
* CI executado em Pull Requests para `main` e novamente em `main` após integração.

A acessibilidade não é gate desta release. A sua validação deve ocorrer quando a solução for integrada no portal dados.gov.pt, no shell, componentes, conteúdo e ambiente institucionais reais.

## Entrega à equipa dados.gov.pt

Este repositório entrega código preparado para futura integração. Não executa por conta própria:

* publicação oficial dos Guias;
* activação do Squidex oficial;
* deploy no portal dados.gov.pt;
* substituição pelo header ou footer oficial;
* validação WCAG/NVDA do portal integrado;
* definição de autenticação, permissões editoriais ou workflows oficiais do CMS.
