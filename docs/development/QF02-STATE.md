# QF02: estado de continuidade

Data: 30/09/2026.

## Estado actual

Branch canónica de trabalho: `feature/qf02-ux-recovery`.

Checkpoint funcional antes da adopção do modelo distribuído: `254f3d06577a0d3153a51e46e672a6e1d3440c11`.

Checkpoints QF02 preservados:

* `84f66b7` — planeamento QF02;
* `940ca72` — guardrails UX responsivos;
* `2b4b6071c94a38a39d18a6f11ee1ddf68ab5f5e8` — shell institucional;
* `f2ef516bf3e9fbe07bff6f64c07776a20b8f853e` — correcção UTF-8 do footer;
* `254f3d06577a0d3153a51e46e672a6e1d3440c11` — melhoria da entrada dos Guias.

O modelo de continuidade foi formalizado em `docs/development/CONTINUITY.md`.

## Evidência de recuperação

* O checkpoint `254f3d0` foi publicado no GitHub e confirmado por SHA remoto.
* O executor Linux `chicovm1` clonou a branch directamente do GitHub.
* Os cinco checkpoints foram recuperados com ancestralidade válida.
* `git fsck --no-dangling` passou no clone independente.
* O N4050 e a VM recuperaram o commit de continuidade criado directamente no GitHub.
* Existe bundle Git completo verificado, fora do clone de trabalho, com SHA-256 `8BF21E07E457CBF234DE9B741A4E643C66F617D60115D5CEF9028B9E789007D9`.

## Escrita entre executores

N4050 dispõe de sincronização Git autenticada confirmada. O conector GitHub pode criar checkpoints autorizados directamente no remoto.

`chicovm1` dispõe de clone funcional, Git e Node, mas ainda não tem identidade Git nem credencial GitHub própria configuradas. Não reutilizar ou distribuir credenciais administrativas para resolver esta lacuna. Escrita remota directa pela VM: Por confirmar.

Até existir identidade mínima própria na VM, separar responsabilidades:

* qualquer executor autorizado pode analisar, alterar e validar no seu clone;
* um sincronizador autorizado publica o checkpoint depois de verificar branch, base, diff e SHA remoto;
* trabalho concorrente usa branches distintas e PRs.

## B3 concluído

Checkpoints funcionais sincronizados:

* `a6caeefa68f1f6e27eb1b52df0c90d96eb84932e` — B3.2a, navegação «Escolher guia» em guia e tarefa;
* `8c5d8a1e87ef874336d5372614f2000f82e11739` — B3.2b, navegação estendida ao contexto de Tema;
* `cdbec691e64f9963cbd04044847fcf0bb426b2ff` — B3.3, raiz passa a apresentar directamente a experiência dos Guias.

Validação B3:

* static export concluído com 121 páginas;
* 7 temas, 15 guias, 95 fichas e 118 rotas preservados;
* 95 entradas de pesquisa preservadas;
* validação focalizada de guia e tarefa em 360, 768 e 1440 px;
* foco visível e activação por teclado da navegação confirmados;
* contrato UX permanente: 16 testes aprovados no Chrome do N4050;
* revisão visual de raiz e Tema em 360, 768 e 1440 px sem regressão material observada.

Estado: B3 concluído.

## B4 concluído

Checkpoints funcionais sincronizados:

* `fccddf4c8cb551e5a554bc34290e0dc06c586ffb` — B4.1, hierarquia e densidade da página de Tema;
* `4883dea5d59908e79a19908bd30b1644f6b2296c` — B4.2, hierarquia da página de Guia, PDF, tarefas, relacionados e recursos;
* `e950fb28dcfcb09ee36f2760eecbd81f551a1d00` — B4.3, leitura da Tarefa, tabela, exemplo, media, dica e navegação final.

Validação B4:

* 118 rotas preservadas e static export concluído;
* `check-export` verde com os 15 PDFs versionados instalados apenas no `out` temporário, sem regeneração editorial;
* D06, D07 e CM mantêm aviso QF01 em Guia e Tarefa, PDF, tarefas e navegação;
* contrato UX permanente: 17/17 testes aprovados no Chrome do N4050;
* Axe focalizado em `main#conteudo`: 9/9 scans sem violações serious/critical em Tema, Guia e Tarefa a 360, 768 e 1440 px;
* revisão visual de Tema, Guia e Tarefa em 360, 768 e 1440 px sem regressão material observada.

Risco transversal por tratar: o Axe global reporta `link-name` serious no link `Autenticar` do header. A evidência é anterior ao âmbito B4 e não foi mascarada. Por confirmar no B5 ou numa correcção transversal dedicada.

Estado: B4 concluído.

## B5 concluído

Checkpoints funcionais sincronizados:

* `7452472bf8735988d7e8342479c3999b4fe8aac0` — B5.2, correcção do nome acessível de `Autenticar` e reforço dos testes de acessibilidade, pesquisa e teclado;
* `8805a3ad42e1d9893f6d21e2f30cd0721aa2368d` — B5.3a, recuperação das secções de descoberta directa dos 15 guias agrupados pelos 7 temas.

Validação B5:

* `content:validate` verde: 7 temas, 15 guias, 95 fichas, 118 rotas e 3 estados QF01;
* `routes:check`, `content:derive`, `typecheck` e `diffcheck` verdes;
* static export concluído com 121 páginas e 95 entradas de pesquisa;
* `check-export` verde: 118 rotas, canonicals, navegação, pesquisa, sitemap e 15 PDFs coerentes;
* 15 PDFs versionados confirmados sem diferenças de blobs face à `main` `fc1840d74eb4f6589a7f46af7da6589ece240398`, já validada pós QF01;
* os PDFs não foram regenerados porque B5 não alterou conteúdo editorial;
* contrato UX final: 18/18 testes aprovados no Chrome do N4050;
* acessibilidade final: 17/17 testes aprovados, incluindo 12 scans Axe globais em 360, 768 e 1440 px;
* skip link, foco, nomes acessíveis, pesquisa com resultados, `Autenticar` e navegação `Escolher guia` por teclado validados;
* reflow e ausência de overflow horizontal confirmados em Entrada, Tema, Guia e Tarefa a 360, 768 e 1440 px;
* comparação visual B1 versus B5 revista nos três breakpoints;
* a comparação detectou a ausência das secções de guias por tema, corrigida no próprio B5 antes do fecho;
* D06, D07 e CM mantêm aviso QF01 em Guia e Tarefa, PDF, tarefas, `Escolher guia` e navegação;
* D11 permanece `Favoritos e notificações`;
* a falha global `link-name` em `Autenticar` foi diagnosticada em mobile/tablet e corrigida com nome acessível explícito, sem alteração de destino ou comportamento.

Nota PDF: a validação estrutural profunda dos PDFs não foi reexecutada localmente porque os executores não dispõem de parser PDF instalado. A evidência de B5 combina identidade exacta dos 15 blobs com a `main` já validada e `check-export` verde.

Estado: B5 concluído.

## B6 concluído

* PR #12 aberto de `feature/qf02-ux-recovery` para `main`, ready for review e mergeable;
* checkpoint técnico `95b03039e1b8b78c9f6d7434d6f469cb53c4bd79`;
* primeiro ciclo de CI detectou guardrail Tailwind obsoleto, corrigido sem alteração funcional;
* `Validar arquitectura v1` #109: success;
* `Publicar v1 no GitHub Pages` #14, build: success; deploy: skipped por ser pull request;
* 15 PDFs, static export, CSS Ágora 4/Tailwind 4, coerência do export e contrato UX passaram no CI;
* artefacto `github-pages` produzido para o checkpoint técnico validado;
* auditoria pré-integração: `main` inalterada, branch 19 commits à frente e 0 atrás, `git fsck` e `diff --check` verdes;
* N4050 e `chicovm1` sincronizados e limpos no mesmo checkpoint técnico;
* nenhuma publicação manual, merge em `main` ou alteração em Jira.

B6.6 fecha apenas rastreabilidade e contingência, sem mudança funcional. O bundle final verificado é mantido fora do clone e o seu SHA-256 é registado no PR para não criar auto-referência no histórico Git.

Estado: B6 concluído. Integração em `main` aguarda autorização explícita separada.
