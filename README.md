# Guias do Utilizador do dados.gov.pt

Repositório de entrega à equipa de desenvolvimento: **lbc-valentim/guias.dados.gov.pt**.

Comece pelo [guia de entrega técnica](docs/DEVELOPER_HANDOVER.md) e pelo [registo de migração](docs/MIGRATION_2026-10-01.md). A demonstração está configurada para [GitHub Pages](https://lbc-valentim.github.io/guias.dados.gov.pt/Guias-do-utilizador/); o sucesso do deploy deve ser confirmado no workflow. Isto não constitui publicação oficial no portal dados.gov.pt.

## Da documentação funcional à orientação prática para quem utiliza dados abertos

O dados.gov.pt reúne funcionalidades, regras, permissões, conceitos, percursos e decisões que atravessam todo o ciclo de utilização de dados abertos: encontrar informação, consultar conjuntos de dados, publicar, gerir recursos, trabalhar com organizações, validar qualidade, utilizar APIs, acompanhar conteúdos, autenticar-se e pedir apoio.

Este projecto transforma esse conhecimento disperso em **guias práticos, pesquisáveis e orientados a tarefas**, escritos a partir da perspectiva de quem precisa de perceber rapidamente o que fazer, onde ir e o que esperar.

Em vez de obrigar o utilizador a conhecer a arquitectura interna do portal, os módulos técnicos ou o histórico de cada requisito, os guias começam por uma pergunta mais útil:

> **O que pretende fazer?**

A partir daí, o utilizador escolhe um tema, encontra o guia adequado e segue uma ficha curta com passos, exemplos, dicas e ligações para conteúdos relacionados.

## Porque este projecto existe

Documentação completa nem sempre significa documentação fácil de usar.

Um portal como o dados.gov.pt evolui através de requisitos, decisões, implementações e correcções sucessivas. Para uma equipa de produto ou desenvolvimento, essa granularidade é essencial. Para um utilizador final, porém, o problema é outro: quer concluir uma tarefa.

A documentação existente foi analisada, consolidada e reorganizada numa arquitectura de informação centrada em necessidades reais de utilização. O resultado aproxima o conhecimento funcional do portal de quem efectivamente precisa dele, sem perder a rastreabilidade necessária para manutenção, revisão e evolução futura.

## O que construímos

O protótipo actual reúne o conhecimento funcional do portal em **15 guias e 96 fichas práticas**, organizados por objectivo e não pela estrutura interna do sistema.

Cada ficha procura responder a uma necessidade concreta, por exemplo:

* encontrar um conjunto de dados;
* filtrar resultados e consultar metadados;
* publicar e gerir dados;
* trabalhar com organizações e permissões;
* compreender qualidade e modelos de dados;
* utilizar APIs e funcionalidades de reutilização;
* iniciar sessão e recuperar o acesso;
* acompanhar actividade e conteúdos;
* pedir ajuda ou contactar a equipa do dados.gov.pt.

O valor deste trabalho não está apenas em ter mais documentação. Está em tornar a documentação **localizável, compreensível, accionável e coerente**.

## O projecto em números

| Indicador | Estado actual |
| --- | ---: |
| Guias práticos | **15** |
| Fichas orientadas a tarefas | **96** |
| Rotas publicadas no sitemap | **119** |
| Temas funcionais | **7** |
| PDFs publicados | **15** |
| Pesquisa transversal | **96 entradas** |
| Versões de referência preservadas | **4** |

Estes números representam a versão actual do protótipo e evoluem com o trabalho funcional e editorial do projecto.

## Arquitectura de informação

Os guias estão organizados em sete temas funcionais. A intenção é permitir que uma pessoa chegue à informação pelo objectivo que tem, e não pela nomenclatura interna da plataforma.

| Tema | Objectivo |
| --- | --- |
| **Encontrar, consultar e explorar dados** | Ajudar a descobrir dados, interpretar resultados, consultar recursos e explorar informação disponível no portal. |
| **Publicar e gerir dados** | Orientar a criação, publicação, actualização e gestão de conjuntos de dados e respectivos recursos. |
| **Qualidade e modelos de dados** | Explicar validações, modelos, conformidade e elementos necessários para compreender e melhorar a qualidade dos dados. |
| **Organizações** | Apoiar a procura, integração, criação e gestão de organizações, membros e permissões. |
| **APIs, reutilizações e automatização** | Reunir orientações relacionadas com acesso programático, reutilização e operações automatizadas. |
| **Acesso, perfil e participação** | Reunir autenticação, acesso à conta, perfil, actividade e formas de acompanhamento e participação no portal. |
| **Ajuda e contactos** | Disponibilizar um ponto claro para apoio, esclarecimento de dúvidas, pedidos de informação e contacto com a equipa do dados.gov.pt. |

A separação de **Ajuda e contactos** num tema próprio é intencional. Uma pessoa que procura apoio não deve precisar de perceber se o seu problema pertence a autenticação, perfil, publicação ou qualquer outra área antes de encontrar ajuda.

## Como os guias funcionam

A experiência foi desenhada segundo um percurso simples:

**Tema → Guia → Tarefa**

Na página inicial, o utilizador pode explorar os temas ou utilizar a pesquisa transversal. Dentro de cada guia encontra uma visão geral e as tarefas disponíveis. Cada tarefa é apresentada numa ficha própria.

As fichas podem incluir objectivo e contexto, público aplicável, passos principais, exemplos, dicas e alertas, tabelas de apoio, indicação de media previsto e ligações para tarefas relacionadas.

## Como o conteúdo foi construído

Os guias não resultam de uma simples transcrição de documentação existente.

A construção exigiu trabalho de análise funcional e editorial para consolidar informação proveniente de diferentes fontes do projecto, incluindo quando aplicável requisitos e especificações funcionais, User Stories e critérios de aceitação, tickets Jira e decisões registadas, protótipos e referências de UI, comportamento implementado, resultados de testes, documentação técnica e repositórios públicos.

Quando uma fonte descreve um comportamento futuro, esse comportamento não é automaticamente apresentado como funcionalidade actual. Quando existe divergência entre documentação e implementação, a diferença deve ser analisada antes de ser convertida em instrução para o utilizador.

## Rastreabilidade e confiança

O protótipo mantém uma separação consciente entre diferentes níveis de informação:

* **Requisito**, quando existe uma regra funcional aprovada;
* **Implementação**, quando há evidência de comportamento num ambiente;
* **Decisão funcional**, quando o projecto registou uma opção de produto;
* **Assunção**, quando é necessário avançar sem transformar uma hipótese em regra;
* **Por confirmar**, quando ainda não existe evidência suficiente para apresentar uma conclusão como definitiva.

Esta distinção é importante porque um manual de utilizador deve ser simples, mas não pode ser construído à custa de regras inventadas ou de funcionalidades ainda não estabilizadas.

## Estado actual

A versão estável **v1.0.0** representa a baseline técnica actual integrada em `main` neste repositório.

A revisão entregue reúne 15 guias, 96 fichas e sete temas funcionais, com 119 rotas actuais e preservação das 118 rotas históricas, mas substitui a arquitectura de manutenção baseada em HTML materializado por uma aplicação Next.js com domínio estruturado e fonte configurável.

A publicação oficial no dados.gov.pt não faz parte deste repositório. O objectivo é disponibilizar à equipa responsável código, documentação e mecanismos de migração preparados para futura integração.

A autoria pessoal permanece nesta versão de demonstração e deverá ser substituída pelo footer institucional quando a solução for integrada oficialmente no portal.

A validação de acessibilidade também fica fora do âmbito desta release e deverá ser realizada no contexto real do portal integrado.

## Arquitectura técnica v1

O contrato interno é `GuidesContent`, validado por Zod.

```text
UI server-side
    ↓
loadConfiguredContent()
    ↓
Local JSON (default)  ou  Squidex GraphQL (opt in)
    ↓
GuidesContent
    ↓
rotas e componentes Next.js
```

A fonte por defeito é `content/guides.json`. Squidex só é activado com `GUIDES_CONTENT_SOURCE=squidex` e não existe fallback silencioso se a fonte remota falhar.

A aplicação utiliza Next.js 16, React 19, TypeScript, Tailwind 4.3 e `@ama-pt/agora-design-system` 4.0 através de wrappers locais. A configuração segue o modelo CSS-first do frontend oficial dados.gov.pt, com `@tailwindcss/postcss` e tokens Ágora no `globals.css`.

O static export disponibiliza 119 rotas e preserva as 118 rotas históricas. Pesquisa, sitemap e PDFs da release actual continuam derivados do JSON local, garantindo reprodutibilidade da baseline versionada.

O registo técnico anterior da instância Squidex provisória refere 7 temas, 15 guias e 95 tarefas em Draft. Esse estado remoto não foi revalidado nem sincronizado nesta migração. A revisão local contém 96 tarefas; a activação e reconciliação do CMS ficam por confirmar. O piloto D99 permanece fora do conteúdo funcional entregue.

### Fonte única e artefactos derivados

`content/guides.json` é a fonte editorial versionada por defeito. A partir dela são validados ou gerados:

* contrato das 118 rotas;
* índice de pesquisa;
* sitemap;
* 15 PDFs;
* static export da aplicação;
* fixtures e gates de equivalência do Squidex.

A futura activação do Squidex oficial deve também decidir se pesquisa, sitemap e PDFs passam a ser derivados da fonte remota.

### Compatibilidade histórica

As pastas HTML, partials e scripts anteriores permanecem no repositório como materialização histórica e compatibilidade durante a transição. Não devem ser tratadas como nova fonte funcional da v1.

O GitHub Pages publica o static export da pasta `out/` através de GitHub Actions, com `NEXT_PUBLIC_BASE_PATH=/guias.dados.gov.pt`.

## Estrutura técnica principal

```text
.
├── content/
│   ├── guides.json
│   └── site.json
├── src/
│   ├── app/
│   ├── components/
│   └── lib/content/
├── scripts/v1/
├── tests/
├── docs/
├── assets/
├── .github/workflows/
├── next.config.ts
├── package.json
└── README.md
```

## Fluxo de manutenção v1

1. Alterar conteúdo funcional/editorial em `content/guides.json`.
2. Alterar autoria/configuração transversal em `content/site.json` quando aplicável.
3. Executar validação de conteúdo, rotas e typecheck.
4. Gerar artefactos derivados e static export.
5. Integrar alterações através de Pull Request com CI verde.

Os workflows não devem efectuar commits automáticos em `main`. Divergências em artefactos versionados devem falhar a validação e ser corrigidas por commit/PR controlado.

## Executar localmente

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/lbc-valentim/guias.dados.gov.pt.git
cd guias.dados.gov.pt
npm ci
```

Para desenvolvimento:

```bash
npm run dev
```

Para validar e gerar o static export:

```bash
npm run content:validate
npm run routes:check
npm run test:squidex
npm run typecheck
npm run build
```

O build estático fica em `out/`. Para simular o caminho usado no GitHub Pages, definir `NEXT_PUBLIC_BASE_PATH=/guias.dados.gov.pt` no build.

## Versionamento do protótipo

O histórico visual e funcional é preservado na pasta `versions`.

| Versão | Evolução principal |
| --- | --- |
| `v0.1` | Primeiro rascunho do protótipo. |
| `v0.2` | Aproximação visual ao portal e melhoria estrutural. |
| `v0.3` | Organização dos guias por temas e introdução da navegação Tema → Guia → Tarefa. |
| `v0.4` | Modularização técnica, aproximação do header e footer, integração de D14 e D01 e evolução da taxonomia para sete temas. |
| `v0.5.0` | 15 guias, 95 fichas, 118 rotas estáticas, 15 PDFs, guardrails de consistência, alinhamento editorial com PRD/PPR e workflows permanentes. |
| `v1.0.0` | Primeira versão estável do protótipo: arquitectura Next.js single source, Ágora 4.0/Tailwind 4.3 alinhados com o portal oficial, fonte configurável Local/Squidex, 118 rotas preservadas, importação Squidex Draft validada e CI reforçado. |

O histórico Git continua a ser a fonte técnica principal de versionamento. Nem todos os commits originam uma nova pasta em `versions`. A pasta é reservada a referências que seja útil abrir e comparar de forma autónoma.

## Convenção de branches

* `feature/...`: nova funcionalidade ou evolução relevante;
* `content/...`: alterações editoriais e de conteúdo;
* `fix/...`: correcções pontuais;
* `setup/...`: organização técnica do repositório.

A `main` representa a versão considerada estável para demonstração ou revisão. O trabalho é preparado em branches próprias e integrado através de Pull Request.

## O que este projecto não pretende ser

Este repositório não substitui as fontes de verdade do projecto.

Os guias não substituem requisitos aprovados, User Stories, decisões registadas, Figma, Jira, documentação técnica ou evidência de testes. O protótipo funciona como uma **camada editorial orientada ao utilizador**, construída a partir dessas fontes.
