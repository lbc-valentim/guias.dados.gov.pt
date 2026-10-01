# Estado da entrega em 01/10/2026

O estado corrente desta migração encontra-se em [DEVELOPER_HANDOVER.md](DEVELOPER_HANDOVER.md) e [MIGRATION_2026-10-01.md](MIGRATION_2026-10-01.md). A baseline entregue tem 15 guias, 96 fichas, 119 rotas e 15 PDFs. Os registos abaixo são históricos e conservam contagens e endereços das respectivas datas.

# Estado do projecto: Guias do Utilizador do dados.gov.pt

Última actualização validada: 23/09/2026

## 1. Objectivo deste ficheiro

Este documento é o ponto de continuidade operacional do projecto dos Guias do Utilizador do dados.gov.pt.

Deve permitir retomar o trabalho sem depender do histórico de uma conversa, distinguindo sempre requisito, implementação, decisão, assunção e questão por confirmar.

A actualização deste ficheiro não substitui Jira, Figma, requisitos aprovados, documentação funcional ou evidência de implementação.

## 2. Estado resumido

| Item | Estado validado |
| --- | --- |
| Repositório | `Timmarcelino/Guias_dados.gov.pt` |
| Branch estável | `main` |
| Baseline estável actual | `v0.5.0` |
| Commit de merge da release | `260034099ae643c4ee06139671ab5ad8ecd0a82c` |
| Commit pós merge dos PDFs | `329e6e2ce9623545f3524d79c97167ecc61b4a8f` |
| Baseline anterior | `v0.4`, commit `58c65e205c38ad810e122a57f2dff4b612aa39dd` |
| Branch de origem da release | `feature/static-routes-pdf` |
| PR de promoção | #5, integrado em 23/09/2026 |
| Branch activa para próxima evolução | Por confirmar |
| Relação com `main` | v0.5.0 integrada; próxima branch de evolução ainda Por confirmar |
| Guias | 15 |
| Fichas na baseline estável actual | 95 |
| Temas funcionais | 7 |
| Publicação oficial no dados.gov.pt | Não confirmada |
| Estado funcional do conteúdo | Em revisão funcional, editorial e UX/UI |

Regra: a baseline estável v0.4 mantém 91 fichas. Em 22/09/2026 a branch activa evoluiu para 92 fichas após a validação da 6.ª ficha de D14, “Reportar um problema técnico”. Em 23/09/2026 foi aprovada a expansão para 95 fichas: duas novas fichas em D13 e uma nova ficha em D14.


### Expansão D13/D14 em 23/09/2026

Decisão aprovada: ampliar a branch activa de 92 para **95 fichas**, sem alterar os 15 guias nem os 7 temas.

* D13 recebe `Alterar o email e a palavra-passe da conta` e `Gerir Chaves da API`.
* D14 recebe `Enviar feedback sobre o dados.gov.pt`.
* O sitemap passa de 115 para **118 rotas**.
* O índice de pesquisa passa para **95 entradas**.
* O guardrail passa a exigir 15 guias, 95 fichas e 118 rotas.
* Os 15 PDFs são regenerados no mesmo workflow da expansão e validados quanto a presença integral das fichas.

Fonte da decisão: validação funcional em PPR, confrontada com o comportamento existente, LEDG-1422/LEDG-1656 para Feedback e evidência técnica/funcional de Perfil e Chaves da API. A promoção PPR para PRD não é assumida; diferenças de ambiente continuam a ser tratadas como evidência de implementação.

## 3. Estado após a release v0.5.0

### Implementação

O trabalho consolidado da v0.5.0 encontra-se em `main`.

A branch `feature/static-routes-pdf` foi a origem do PR #5 e deixou de ser a referência activa após o merge. A branch da próxima evolução está **Por confirmar**.

A baseline actual inclui, entre outros:

* rotas estáticas em `Guias-do-utilizador/`;
* páginas próprias para temas, guias e tarefas;
* índice de pesquisa em `assets/js/search-index.json`;
* lógica de pesquisa em `assets/js/search.js`;
* PDFs dos 15 guias em `assets/pdf/`;
* `sitemap.xml`;
* `404.html`;
* `.nojekyll`;
* fonte editorial e workflows permanentes de QA e PDF.

As limitações conhecidas da v0.5.0 estão registadas no checkpoint de release e transitam para a próxima evolução sem alteração do respectivo estado funcional.

### Defeitos técnicos web fechados em 22/09/2026

* Corrigido o título duplicado da entrada principal para `Guias do utilizador | dados.gov.pt`.
* A página 404 passou a ter estrutura semântica, viewport responsivo, skip link, foco no conteúdo, navegação de retorno e `noindex`.
* O gerador PDF e os workflows permanentes estão versionados e foram validados na v0.5.0. A automatização integral da geração das rotas estáticas pode ser aprofundada na próxima evolução, sem afectar o guardrail actual que valida as 118 rotas publicadas.

### Actualização de D14 em 22/09/2026

A revisão histórica confirmou que a 6.ª ficha de D14, `Reportar um problema técnico`, já tinha sido analisada e estava encaminhada para integração.

A reserva operacional principal estava associada ao formulário Ajuda e contactos e ao reCAPTCHA em PPR/PRD. O LEDG-2475 foi concluído e existe evidência posterior de submissão com sucesso em PPR.

Decisão: D14 passa a seis fichas na branch activa. A ficha foi reposta nas rotas estáticas, pesquisa e sitemap e integrada em `assets/js/data.js` para eliminar a divergência entre fonte editorial e artefactos gerados.

A ficha não deve prometer confirmação automática por email enquanto o LEDG-2029 não estiver implementado.

## 4. Baseline v0.4

### Implementação confirmada

A v0.4 disponibiliza:

* 15 guias;
* 91 fichas;
* 7 temas funcionais;
* pesquisa transversal;
* navegação Tema → Guia → Tarefa;
* relações entre guias;
* header e footer aproximados à implementação pública do dados.gov.pt;
* estrutura modular em HTML, CSS e JavaScript;
* versões v0.1, v0.2, v0.3 e v0.4 preservadas;
* revisão editorial específica de D01, Autenticação e acesso à conta;
* revisão editorial específica de D14, Ajuda e contactos.

### Decisão editorial

A experiência deve ser orientada pela necessidade do utilizador e não pela arquitectura interna do portal.

O percurso principal mantém-se:

**Tema → Guia → Tarefa**

As fichas devem ser curtas, auto-explicativas e orientadas à execução da tarefa.

Quando fizer sentido podem incluir:

* passos;
* exemplos;
* dicas e alertas;
* imagens;
* vídeos;
* tabelas de apoio;
* ligação para a tarefa seguinte ou conteúdos relacionados.

## 5. Taxonomia actual

Os sete temas funcionais são:

1. Encontrar, consultar e explorar dados
2. Publicar e gerir dados
3. Qualidade e modelos de dados
4. Organizações
5. APIs, reutilizações e automatização
6. Acesso, perfil e participação
7. Ajuda e contactos

### Decisão

Ajuda e contactos permanece como tema próprio para permitir que um utilizador encontre apoio sem ter de identificar previamente a área funcional do problema.

## 6. Decisões de conteúdo já assumidas

### Decisão

Os identificadores internos dos guias, como D03, não devem ser apresentados como nomenclatura pública ao utilizador.

### Decisão

Quando relevante, podem ser usadas indicações pequenas de perfil ou permissão, por exemplo:

* Utilizador autenticado
* Editor
* Administrador da Organização
* Administrador

Estas indicações não substituem a validação das permissões reais suportadas pela fonte funcional aplicável.

### Decisão

O conteúdo do manual deve traduzir a complexidade funcional para linguagem prática sem inventar regras.

### Regra

Quando uma fonte descrever comportamento futuro, esse comportamento não deve ser apresentado como funcionalidade actual sem evidência de implementação aplicável.

## 7. D03: orientação editorial

### Decisão de estrutura simplificada

Para o conteúdo de descoberta e consulta de dados, a estrutura editorial proposta é:

1. Encontrar dados
2. Pesquisar e filtrar
3. Consultar um Conjunto de Dados
4. Aceder aos dados
5. Não encontrou o que procura?

Cada ficha deve privilegiar:

* 3 a 5 passos principais;
* exemplo concreto;
* imagem ou vídeo quando acrescentar valor;
* ligação para a próxima ficha quando existir continuidade natural.

Por confirmar: revisão funcional final de cada ficha e eventual ajuste de nomenclatura pública.

## 8. Estado de publicação

### Implementação

O repositório contém um protótipo funcional e editorial suficientemente estruturado para demonstração e revisão.

### Por confirmar

Não existe, até à validação de 22/09/2026, evidência confirmada de publicação oficial da nova experiência de 15 guias no portal dados.gov.pt.

Também não foi identificada na baseline estável uma configuração de deployment oficial que, por si só, prove publicação em produção.

### Jira

Itens directamente associados ao tema dos Guias:

* `LEDG-2423`: Guias de utilizador/Kit de onboarding de entidades. Estado validado: Backlog.
* `LEDG-64`: Inclusão dos Guias e Tutoriais do Dados.gov. Estado validado: Backlog.

Estes estados não substituem eventual decisão de produto registada noutro artefacto.

## 9. Critérios antes de publicação oficial

Antes de tratar qualquer conteúdo como guia oficial, validar quando aplicável:

* requisito e regra funcional;
* actor e perfil;
* permissões;
* estados e transições;
* validações;
* mensagens relevantes;
* rotas;
* terminologia da interface;
* dados e metadados;
* comportamento nos ambientes aplicáveis;
* acessibilidade no contexto real;
* responsividade;
* alinhamento com Figma aprovado;
* alinhamento com Ágora Design System;
* rastreabilidade das decisões relevantes.

Acessibilidade: usar WCAG 2.2 nível AA como alvo, salvo requisito aplicável diferente.

## 10. Riscos e pontos de atenção

### Risco

Uma instrução do guia pode ficar desactualizada quando o comportamento do portal mudar.

Mitigação: manter rastreabilidade com requisitos, Jira, Figma e evidência de implementação.

### Risco

O protótipo pode aparentar maior maturidade visual do que a maturidade funcional real do conteúdo.

Mitigação: não considerar aparência como aprovação funcional.

### Risco

Conteúdo ainda não validado pode ser confundido com comportamento actual.

Mitigação: quando não existir regra funcional confirmada, usar exclusivamente o comportamento observado e reproduzível em PRD, identificado como Implementação actual. Não antecipar backlog, Figma futuro ou comportamento esperado.

### Risco

Branches antigas podem ser confundidas com a linha actual de evolução.

Mitigação: considerar `main` como baseline estável e `feature/static-routes-pdf` como branch activa até nova decisão registada.

## 11. Estado da validação de conteúdo

A matriz detalhada encontra-se em `docs/CONTENT_VALIDATION.md`.

Estado da primeira passagem em 22/09/2026:

* Validado no âmbito actual: D01, D03 e D14.
* Parcialmente validado: D02, D04, D05, D08, D09, D10, D12 e D13.
* Sem publicação como comportamento actual: D06 não integrado no Frontoffice PRD; D07 e CM não observáveis no stack público actual de PRD. D11 passa a Parcialmente validado após alinhamento editorial com Favoritos em PRD.
* Sem base funcional suficiente: nenhum guia.

PDFs: 15/15 validados quanto a integridade e completude editorial da geração v2. Qualidade visual página a página e acessibilidade documental permanecem Por confirmar.

Revisão profunda: concluída para D02, D04, D05, D06, D07, D08, D09, D10, D11, D12, D13 e CM em 22/09/2026. D01, D03 e D14 já se encontravam validados no âmbito actual. D06 não está integrado no Frontoffice PRD; D07 e CM não são observáveis no stack público actual; D11 está Parcialmente validado com Favoritos alinhados ao PRD. Os restantes itens parciais têm testes PRD mínimos identificados.

## 12. Próximos passos recomendados

1. Rever a implementação existente em `feature/static-routes-pdf`.
2. Validar rotas estáticas, pesquisa, PDFs, sitemap e página 404.
3. Rever os 15 guias e classificar cada um como validado, parcialmente validado ou por validar. Primeira passagem e revisões profundas concluídas em `docs/CONTENT_VALIDATION.md`.
4. Executar os testes PRD autenticados mínimos registados por guia.
5. Corrigir divergências editoriais objectivas identificadas e sincronizar todos os artefactos derivados. D04, D09, D11 e D13 já receberam correcções baseadas no PRD actual.
6. Fechar nomenclatura e arquitectura de informação.
7. Validar acessibilidade e responsividade.
8. Confirmar modelo de publicação e integração no produto.
9. Preparar critérios objectivos para merge da branch em `main`.
10. Só após validação, preparar a versão candidata a publicação oficial.

## 13. Protocolo de continuidade

Sempre que o trabalho for retomado:

1. Ler este ficheiro.
2. Confirmar a branch activa no GitHub.
3. Comparar a branch activa com `main`.
4. Verificar alterações no Jira relacionadas com Guias.
5. Actualizar este documento apenas quando existir nova evidência ou decisão.
6. Não substituir uma decisão validada por inferência de implementação.
7. Não usar Assunção para preencher lacunas de comportamento do portal. Quando não houver regra confirmada, consultar PRD e registar apenas o comportamento observado como Implementação actual.
8. Usar `Por confirmar` quando PRD não puder ser observado ou a evidência não for suficiente.

## 14. Função de controlo de continuidade

O projecto pode usar uma função de “Secretário do projecto” no processo de análise.

Responsabilidades:

* conferir se decisões recentes estão reflectidas neste documento;
* detectar contradições entre conversas, GitHub, Jira e documentação;
* identificar informação desactualizada;
* preservar distinção entre requisito, implementação, recomendação, assunção e questão em aberto;
* sinalizar itens que necessitam de nova validação.

Esta função é um mecanismo de revisão. O presente ficheiro versionado continua a ser o ponto de continuidade operacional.

## Ponto de controlo operacional 22/09/2026 15:56 Europe/Lisbon

Secretário do projecto: progresso registado antes da nova ronda de testes PRD autenticados.

Estado confirmado:

* revisão profunda concluída para as 15 áreas;
* D01, D03 e D14 validados no âmbito actual;
* D02, D04, D05, D08, D09, D10, D12 e D13 parcialmente validados;
* D06 não integrado no Frontoffice público de PRD; D07 e CM não observáveis no stack público actual de PRD; D11 alinhado editorialmente a Favoritos e parcialmente validado;
* fonte editorial permanente em `content/guides.json`;
* gerador PDF permanente em `scripts/generate_pdf_guides.py`;
* workflow PDF permanente validado com sucesso;
* correcções editoriais PRD já aplicadas a D04, D09 e D13;
* próximo objectivo: executar apenas os testes PRD autenticados mínimos já identificados, começando por D04/D05, e actualizar a matriz apenas com evidência observada.

Regra de continuidade: quando não existir regra funcional confirmada, documentar exclusivamente o comportamento reproduzível em PRD como Implementação actual. Não antecipar backlog, Figma futuro ou comportamento esperado.

## QA web estrutural 22/09/2026

Ronda executada sobre a publicação GitHub Pages da branch `feature/static-routes-pdf`.

### Evidência

* 115 URLs do sitemap verificadas;
* 115/115 responderam HTTP 200;
* 134 ligações internas únicas verificadas;
* 0 ligações internas quebradas;
* `lang="pt-PT"`, `main`, um `h1` e skip link presentes nas 115 páginas;
* nenhum `id` duplicado detectado;
* nenhuma imagem sem `alt` detectada pelo crawler estrutural;
* nenhum botão sem nome acessível detectado;
* nenhum campo de formulário sem associação de label detectado;
* nenhum salto de heading detectado no conteúdo principal;
* canonicals presentes e únicos na ronda;
* resíduos editoriais de D13 detectados em 3 páginas e corrigidos no commit `b96ba58`;
* pesquisa dinâmica passou a anunciar resultados com `role="status"` e `aria-live="polite"` no commit `8d8b684`;
* título duplicado entre tema e guia `Ajuda e contactos` corrigido no commit `e943752`.

### Nota sobre `aria-current`

O crawler encontrou duas ocorrências de `aria-current="page"` na maioria das páginas. A revisão confirmou que pertencem a contextos de navegação distintos, breadcrumb e navegação lateral. Não é tratado como defeito.

### Próxima frente

Validar responsividade e navegação por teclado nos breakpoints de referência 360, 768 e 1440, incluindo header, menu, pesquisa, sidebar/select, breadcrumbs, cards, navegação entre fichas e 404.


## QA web interactivo e responsivo 22/09/2026

Ronda executada com Edge headless/Puppeteer sobre o GitHub Pages publicado.

### Responsividade e reflow

Páginas representativas testadas a 320, 360, 768 e 1440 px:

* página inicial dos Guias;
* página de tema;
* página de guia;
* ficha de tarefa.

Resultado:

* 0 overflow horizontal;
* 0 alvos interactivos testados abaixo de 24 × 24 px;
* menu mobile abre com `aria-expanded=true`;
* navegação principal fica visível após abrir o menu;
* dropdown Recursos abre e actualiza `aria-expanded`.

### Teclado e foco

Sequência de Tab validada em 360 e 1440 px.

Resultado:

* skip link é o primeiro elemento focável;
* foco visível detectado com contorno sólido de 3 px;
* pesquisa, menu, select, breadcrumbs, cards e navegação principal entram na sequência de teclado.

Defeito detectado e corrigido:

* em mobile, Pesquisa e Autenticar perdiam o nome acessível porque o texto era removido com `display:none`;
* corrigido no commit `d7f5672` com ocultação apenas visual;
* árvore de acessibilidade revalidada: 0 controlos sem nome; Pesquisa e Autenticar expostos correctamente.

### Pesquisa

Pesquisa real validada com `?q=dados`:

* H1 alterado para Resultados da pesquisa;
* 56 resultados devolvidos no cenário testado;
* título da página actualizado;
* `role="status"` e `aria-live="polite"` confirmados com cache desactivada;
* correcção implementada no commit `8d8b684`.

### Contraste, tabelas e links

* 0 falhas automáticas de contraste AA nas páginas representativas analisadas;
* 3 tabelas detectadas, todas com `th` e `scope`;
* 0 links genéricos do tipo Clique aqui, Aqui, Ver mais ou Saber mais;
* links de logótipo sem texto visível mantêm nome acessível através de `aria-label` e `alt`.

### Navegação e 404

* select lateral navega para o guia seleccionado;
* 404 personalizada devolve HTTP 404;
* 404 contém `noindex`, skip link, `main#conteudo`, H1 e título coerente.

Conclusão desta ronda: não ficaram defeitos web técnicos conhecidos em aberto no âmbito dos checks automatizados executados. Permanecem por fazer validação manual/NVDA no contexto final e validação visual detalhada dos PDFs.


## Validação directa dos PDFs publicados 22/09/2026

Remote Desktop Commander utilizado para ler os 15 PDFs directamente da publicação GitHub Pages.

Resultado consolidado:

* 15/15 PDFs acessíveis;
* contagens de páginas coerentes;
* 92/92 fichas presentes;
* sequência de tarefas completa em cada guia;
* Visão geral e fecho presentes nos 15;
* D14 confirmado com 6 fichas;
* correcções editoriais D04/D09/D13 reflectidas nos PDFs;
* 0 ocorrências de `undefined`;
* QA do workflow PDF já tinha confirmado 15/15 ficheiros válidos e sem omissões editoriais.

Limitação mantida:

* inspecção visual pixel a pixel não executada nesta sessão;
* estrutura interna de acessibilidade PDF não pôde ser validada, porque o Edge expõe o documento apenas como `EmbeddedObject`;
* estas verificações ficam Por confirmar antes da publicação oficial.

Estado da frente PDF: **conteúdo e integridade estrutural validados; acessibilidade documental e revisão visual final Por confirmar**.


## Guardrail automático de consistência 22/09/2026

Foi criado o validador `scripts/validate_guides_consistency.py` e o workflow `.github/workflows/guides-consistency.yml`.

A validação passa a falhar automaticamente quando existir, entre outros:

* contagem diferente de 15 guias ou 95 fichas;
* rota estática em falta;
* pesquisa fora de sincronização;
* sitemap divergente de 118 URLs;
* canonical incorrecto;
* title duplicado nas rotas;
* mais ou menos de um `main` ou `h1`;
* ausência de `lang="pt-PT"`, skip link ou `id="conteudo"`;
* imagem sem `alt`;
* IDs duplicados;
* reaparecimento das formulações obsoletas corrigidas em D04, D09 e D13;
* divergência estrutural entre `content/guides.json`, `assets/js/data.js` e o módulo `data-d01.js`;
* remoção da semântica de status acessível da pesquisa;
* perda dos elementos essenciais da página 404.

A rota histórica de D13 `Consultar-um-perfil-publico` é preservada explicitamente para evitar quebra de URLs apesar do novo título editorial.

Execuções:

* primeira execução detectou um falso positivo causado pela modularização intencional de D01;
* validador ajustado para a arquitectura real;
* execução subsequente passou;
* execução final após inclusão de `data-d01.js` nos triggers do CI passou com sucesso.

Estado: **guardrail activo e verde**.


## Plano mínimo de testes PRD autenticados

Criado `docs/PRD_TEST_PLAN.md` no commit `63304df`.

O plano separa:

* **Fase A:** 6 grupos activos com sessão autenticada, 1 residual público e 3 suspensos até integração PRD;
* **Fase B, escrita controlada:** 7 Test Cases preparados, mas bloqueados até autorização explícita adicional de escrita em PRD.

Áreas cobertas:

* D02 e D13, perfil/organizações;
* D04, ciclo de vida e transferência;
* D05, recursos;
* D08, APIs;
* D09, Reutilizações;
* D10, Harvester;
* D12, Discussões;
* D07 e CM, Validador/Catálogo;
* D11, Favoritos/Notificações;
* D06, Explorador após integração.

Critério: o Manual descreve PRD como Implementação actual quando houver divergência com backlog, requisito alvo ou documentação futura.


## Release v0.5.0 integrada em main

Checkpoint pós release: 23/09/2026.

### Resultado da promoção

* PR #5 integrado com sucesso em `main`;
* commit de merge: `260034099ae643c4ee06139671ab5ad8ecd0a82c`;
* workflow PDF executado em `main` e sincronização publicada no commit `329e6e2ce9623545f3524d79c97167ecc61b4a8f`;
* guardrail pós merge: execução `35853966260`, sucesso;
* workflow PDF pós merge: execução `35853966165`, sucesso.

### Baseline v0.5.0

* 15 guias;
* 95 fichas;
* 7 temas;
* 118 rotas estáticas e 118 URLs de sitemap;
* 95 entradas de pesquisa;
* 15 PDFs;
* workflows permanentes activos em `main` para consistência e PDFs.

### Limitações conhecidas transferidas para a próxima release

As limitações seguintes permanecem abertas e não são consideradas resolvidas:

1. D06 sem integração pública reproduzível nas superfícies PRD/PPR analisadas;
2. D07 sem integração observável nas superfícies analisadas;
3. CM sem integração observável nas superfícies analisadas;
4. validação manual final com NVDA no contexto final;
5. revisão visual detalhada e validação documental final dos PDFs;
6. evoluções e correcções funcionais posteriores à baseline.

A transferência destas limitações para a próxima release é uma decisão de âmbito. Não altera o respectivo estado funcional.

### Publicação oficial

A v0.5.0 em `main` é a baseline estável de demonstração e revisão. Não representa, por si só, publicação oficial no dados.gov.pt.

### Próxima evolução

A branch e o âmbito da próxima release devem ser definidos antes de novos desenvolvimentos. D06, D07, CM, validação final dos PDFs e novas correcções/evoluções constituem a fila inicial conhecida.

## Sincronização documental corrente 22/09/2026

Após a validação técnica e funcional, foi corrigida a documentação corrente:

* `README.md` actualizado para 15 guias e 95 fichas;
* estrutura técnica actualizada para incluir fonte editorial, rotas, PDFs, scripts, workflows e documentação viva;
* D13 e D14 actualizados para sete fichas cada;
* `CHANGELOG.md` recebeu a secção **Em desenvolvimento · 22/09/2026**, preservando a v0.4 histórica de 15/09;
* pesquisa no repositório não encontrou referências correntes a `91 fichas` fora do histórico preservado.

Commits:

* `97671ae`, README;
* `76072ca`, CHANGELOG.

Estado: documentação corrente alinhada com 15 guias, 95 fichas, 118 rotas e 15 PDFs.


## Actualização D06, Explorador de dados

Evidência adicional recolhida em 22/09/2026:

* o frontend actual contém o bloco **Explore os dados**, mas oculto com `className="hidden"`;
* não foi encontrada rota pública autónoma do Explorador no frontend;
* num recurso CSV real de PRD, `ipvc-estudantes.csv`, não foi exposto CTA **Explore os dados** no comportamento público observado;
* não existe percurso público reproduzível confirmado para abrir o novo Explorador a partir do recurso testado.

Conclusão operacional: D06 deixa de estar apenas **Por confirmar** e passa a **Não integrado no Frontoffice público de PRD**. O guia permanece no protótipo como conteúdo preparado, mas fica bloqueado para publicação como funcionalidade actualmente disponível.

## Actualização D07 e CM, stack público PRD

Investigação adicional concluída em 22/09/2026.

### D07, Validador Automático

* LEDG-2031: READY FOR TESTING;
* sem rota/componente/serviço específico no frontend `main`;
* sem módulo específico no backend `main`;
* Swagger PRD sem endpoints do novo Validador;
* Resource/Dataset expõem apenas o campo legado `schema`;
* validation no contrato actual refere Harvester ou validação técnica genérica.

Estado: **não observável no stack público actual de PRD**.

### CM, Catálogo de Modelos

* LEDG-2049: IN UAT;
* sem rota/componente/serviço específico no frontend `main`;
* sem módulo específico no backend `main`;
* Swagger PRD sem endpoints do novo Catálogo;
* `GET /datasets/schemas/` é um catálogo legado de schemas externos, apenas leitura, e devolveu lista vazia no PRD consultado.

Estado: **não observável no stack público actual de PRD**.

Ressalva comum: a evidência demonstra ausência nas superfícies públicas analisadas, não inexistência absoluta de componente privado, serviço separado ou feature flag.

Decisão: D07 e CM permanecem no protótipo como conteúdo preparado, mas bloqueados para publicação como comportamento actual.

## Actualização D11, Favoritos e notificações

Em 22/09/2026, D11 foi corrigido para cumprir a regra do projecto de documentar o comportamento actual de PRD.

Evidência:

* Organização, Conjunto de Dados, Reutilização e API apresentam **Adicionar aos favoritos** / **Remover dos favoritos**;
* a relação técnica utiliza Follow/Unfollow, mas essa terminologia não é exposta ao utilizador;
* não existe evidência que permita afirmar que adicionar aos favoritos gera notificações de alterações;
* as notificações existentes continuam associadas a eventos próprios do portal.

Correcções executadas:

* título visível do guia alterado para **Favoritos e notificações**;
* fichas **Seguir um conteúdo** e **Deixar de seguir um conteúdo** substituídas por **Adicionar aos favoritos** e **Remover dos favoritos**;
* rotas históricas e nome físico do PDF preservados para compatibilidade;
* fonte editorial, experiência dinâmica, pesquisa, HTML estático, PDF, matriz funcional e plano PRD sincronizados;
* guardrail de consistência passou após a alteração.

Estado: **D11 Parcialmente validado**. Favoritos está alinhado ao PRD actual; Notificações requerem apenas a validação autenticada mínima prevista no plano PRD.

## Actualização D04 e D05, evidência PRD pública

Revisão complementar concluída em 22/09/2026.

### D04

* LEDG-2046 e LEDG-2047 passaram para **IN UAT**;
* Swagger PRD mantém licença por defeito `notspecified`;
* frontend actual também inicia com `notspecified`;
* frontend actual exige contacto quando o produtor é Organização;
* LEDG-2175 permanece Backlog para alterar estes comportamentos;
* não existe endpoint público de recuperação de Dataset eliminado;
* transferência expõe estados pending/accepted/refused.

Decisão: manter o Manual neutro quanto à licença inicial e obrigatoriedade do contacto até a evolução estar reflectida em PRD.

### D05

* `/datasets/extensions/` confirma que SVG e HTML não estão entre as extensões permitidas;
* preview real validado em PRD para CSV, XLS, XLSX e ODS;
* TSV está suportado no frontend, mas não foi encontrado recurso público para observação;
* Explorar dados continua não integrado no Frontoffice público;
* principal pendência residual: integridade de upload/substituição e estados autenticados.

## Sincronização da matriz e redução do plano autenticado

Actualização em 22/09/2026 após D04/D05/D06/D13:

* D04 actualizado para LEDG-2046 e LEDG-2191 em IN UAT;
* D06 actualizado para **Não integrado no Frontoffice público de PRD**;
* D13 já não tem correcção editorial pendente; actor/título/data de registo foram sincronizados;
* D05 deixou de exigir revalidação autenticada de CSV/XLS/XLSX/ODS e SVG/HTML;
* PRD-R03 foi reduzido à observação residual de TSV, quando existir recurso público adequado;
* PRD-R10 fica suspenso até integração efectiva do Explorador.

Objectivo: manter apenas testes autenticados que acrescentem evidência nova.

## Fila operacional autenticada

Após redução do plano, permanecem activos apenas:

1. PRD-R01, D02 + D13;
2. PRD-R02, D04;
3. PRD-R04, D08;
4. PRD-R05, D09;
5. PRD-R06, D10;
6. PRD-R07, D12.

PRD-R03 é residual público para TSV. PRD-R08, PRD-R09 e PRD-R10 ficam suspensos até existir integração observável em PRD.

Esta fila representa o mínimo necessário de leitura autenticada antes de decidir se algum dos guias parciais pode subir para **Validado no âmbito actual**.

## Revalidação D01, autenticação

D01 foi revisto novamente segundo a regra PRD-first.

* PRD público confirma CMD, eIDAS, E-mail e palavra-passe e recuperação;
* E-mail e palavra-passe é apresentado para utilizadores antigos;
* mecanismo exacto de migração/associação não é fixado no Manual, porque LEDG-2357 permanece READY FOR UAT e o fluxo continua em evolução;
* a antiga ficha `Concluir o primeiro acesso e confirmar o email` passou a `Concluir o primeiro acesso quando solicitado`, mantendo a URL histórica;
* referências editoriais a comportamento alvo validado em TST foram removidas.

Estado D01: **Validado no âmbito actual**, com mecanismo exacto de migração fora do detalhe documental até nova evidência PRD.

## Plano visual e robustez da geração PDF

Actualização de 22/09/2026.

### Media

Criado `docs/MEDIA_PLAN.md`, commit `384212b`.

Classificação das 92 fichas:

* **25** com media capturável em PRD público;
* **39** que exigem sessão/contexto autenticado e validação correspondente;
* **28** suspensas porque a funcionalidade alvo ainda não está integrada ou alinhada com PRD.

As indicações públicas de media foram limpas de referências internas a TST/ambiente validado nas áreas D02, D09, D10, D11 e D12.

### Workflow PDF

A falha observada no run `35763998169` ocorreu apenas no push final: a branch avançou enquanto o job gerava os PDFs, causando rejeição `fetch first`.

O workflow foi corrigido no commit `d61b5e9` para:

* serializar jobs PDF através de `concurrency`;
* criar o commit PDF;
* fazer `git fetch` da branch actual;
* rebasear o commit PDF sobre o HEAD remoto;
* publicar apenas depois do rebase.

A estratégia foi validada com sucesso: commits PDF `4fdbb6d` e posteriormente `238141c` foram publicados sem perder alterações concorrentes.

Estado: **workflow PDF robusto para avanço concorrente da branch**.


## Checkpoint de fecho acelerado 22/09/2026

Este checkpoint substitui, para efeitos operacionais, os estados anteriores da secção de prontidão quando houver conflito com informação mais recente.

### Estado da branch e do Pull Request

* branch de revisão: `feature/static-routes-pdf`;
* relação verificada com `main`: **119 commits à frente e 0 atrás** antes deste checkpoint;
* PR #5, **Guias: rotas estáticas, GitHub Pages e PDFs**, já existe em estado **Draft**;
* o PR encontrava-se `mergeable=true` na leitura efectuada;
* a descrição do PR contém informação histórica que necessita de sincronização antes de o marcar Ready for review;
* não marcar Ready for review, não fazer merge em `main` e não publicar oficialmente antes de cumprir os gates de fecho.

A decisão anterior “não abrir PR” fica ultrapassada pela existência do PR #5. Mantém-se integralmente a proibição de merge/publicação antes do fecho.

### Manutenção e extensibilidade do código

Foram acrescentados comentários de manutenção sem alteração intencional de comportamento:

* `8dab26e`: extensibilidade e contratos do validador de consistência;
* `fa8d303`: fonte, determinismo, compatibilidade e extensão do gerador PDF;
* `4626826`: natureza read-only do guardrail de consistência;
* `11c4e4c`: concorrência e rebase seguro no workflow PDF;
* `fabf3bd`: contrato de contagens 15/92/115 centralizado no validador, evitando números mágicos dispersos;
* `df614ec`: pesquisa reformatada e comentada, preservando normalização, segurança por `textContent` e anúncio acessível.

Os comentários documentam especialmente:

* `content/guides.json` como fonte editorial canónica;
* overrides de slug como contratos de compatibilidade e não como nova regra editorial;
* GitHub Pages como destino actual de revisão, não como destino definitivo do produto;
* necessidade de parametrizar origem/caminhos quando existir publicação oficial;
* preservação de ordem de leitura, texto seleccionável, contraste e nova validação de acessibilidade quando o PDF for ampliado.

### CI e publicação de revisão após a manutenção

Execuções verificadas:

* guardrail **Validar consistência dos Guias**: sucesso nos commits `8dab26e` e `4626826`;
* workflow **Gerar PDFs dos Guias**: sucesso após as alterações do gerador/workflow;
* **pages build and deployment**: sucesso no estado posterior da branch;
* o workflow PDF publicou commits automáticos de sincronização sem perder os commits concorrentes, confirmando novamente a protecção por rebase.

Estado técnico desta frente: **verde**. O guardrail voltou a passar após `fabf3bd` e `df614ec`.

### Evidência Jira actualizada

Leitura efectuada em 22/09/2026, sem alterações no Jira:

* LEDG-2046, Publicação e edição de Conjunto de Dados: **IN UAT**;
* LEDG-2048, Transferência de responsabilidade: **READY FOR UAT**;
* LEDG-2175, melhorias de licença/ponto de contacto: **Backlog**;
* LEDG-2296, permissões de Harvester: **Done**;
* LEDG-2298, pesquisa de Harvesters: **Done**;
* LEDG-2323, pré-visualização de Harvester: **Done**;
* LEDG-2031, Validador Automático: **READY FOR TESTING**;
* LEDG-2049, Catálogo de Modelos: **IN UAT**;
* LEDG-1960, evolução Seguir: **To Do**;
* LEDG-2305, Notificações: **In Progress**;
* LEDG-2390 e LEDG-2391, questões de Discussões/notificações: **Backlog**;
* LEDG-2520, transferência de Reutilizações: **Backlog**;
* LEDG-2468, protecção do último administrador: **READY FOR TESTING**;
* LEDG-2483, mistura de convites/pedidos em Membros: **To Do**.

Estes estados são evidência de evolução do backlog. Não substituem o comportamento observado em PRD como Implementação actual.

### Disciplina de evidência PRD

O `docs/PRD_TEST_PLAN.md` passou a exigir, por execução, ambiente, perfil funcional, área/conteúdo observado, resultado, divergência, evidência e decisão (`ee06017`). Não devem ser guardados dados pessoais desnecessários.

A fila mínima mantém-se:

1. PRD-R01, D02 + D13;
2. PRD-R02, D04;
3. PRD-R04, D08;
4. PRD-R05, D09;
5. PRD-R06, D10;
6. PRD-R07, D12.

PRD-R03 continua residual para TSV. Não foi localizada evidência pública suficiente para executar o cenário nesta ronda; isso não demonstra inexistência de recurso TSV.

PRD-R08, PRD-R09 e PRD-R10 continuam suspensos segundo os critérios já registados.

### Gates restantes para Ready for review

O PR #5 só deve sair de Draft quando estiverem tratados ou formalmente aceites:

1. leitura autenticada PRD mínima aplicável;
2. sincronização editorial de qualquer divergência encontrada;
3. ronda manual/NVDA da experiência final;
4. revisão visual final dos PDFs;
5. acessibilidade documental dos PDFs, ou limitação formalmente aceite e documentada;
6. descrição do PR sincronizada com D01, D06, D07/CM, D11 e o estado real de QA;
7. CI de consistência, PDF e publicação de revisão verdes no HEAD final.

Para publicação oficial continuam adicionais: destino definitivo, canonicals/caminhos finais, integração no produto e nova verificação de divergências PRD no momento da publicação.


## Execução autenticada PRD com ponte gráfica local, 22/09/2026

Foi criada na Windows Sandbox uma ponte gráfica **temporária e descartável** em `C:\ChicoRuntime\Chico-GuiBridge.ps1`, usada exclusivamente como ferramenta de teste. Não integra o código dos Guias nem altera o produto.

Capacidades verificadas:

* captura de ecrã da Sandbox;
* envio controlado de teclado;
* clique de rato quando necessário;
* leitura do título e posição das janelas;
* navegação por URL directa no Edge autenticado.

A execução foi mantida em **modo de leitura**. Não foram submetidos formulários nem alterados dados em PRD.

### PRD-R01, Perfil e Organizações

Estado: **Parcialmente executado**.

Confirmado em PRD:

* `/pt/admin/me/profile` acessível;
* áreas pessoais de Conjuntos de dados, API, Reutilizações, Recursos comunitários, Perfil e Estatísticas acessíveis;
* aba **Atividades** acessível com listagem por Utilizador, Acção e Data;
* listagens pessoais de Conjuntos de dados, API, Reutilizações, Recursos comunitários e Estatísticas carregam na sessão autenticada.

Limitação observada:

* a conta utilizada não possui organização disponível no contexto actual;
* o próprio PRD apresenta **“Não pertence a uma organização”**;
* o redirect de Organização regressa à área pessoal.

Decisão: área pessoal confirmada. Membros, permissões e edição de Organização permanecem **Por confirmar com uma conta adequada**. Esta limitação da conta não é tratada como regra global do produto.

### PRD-R02, Conjuntos de Dados

Estado: **Parcialmente executado**.

Confirmado no formulário PRD:

* Produtor é obrigatório;
* a conta observada não possui organização disponível como produtor;
* licença inicial apresentada como **“Licença não especificada”**;
* Frequência de atualização é obrigatória;
* a frequência inicia sem valor seleccionado, com placeholder de selecção;
* a listagem pessoal apresenta estado e acções por item.

Por confirmar:

* comportamento do Ponto de contacto quando o produtor é Organização;
* estados Arquivado e Eliminado;
* transferência;
* restantes acções de ciclo de vida.

### PRD-R04, APIs

Estado: **Parcialmente executado**.

Confirmado em PRD:

* wizard de criação acessível;
* criação de API restrita a organização com emblema **Serviço público**;
* a conta utilizada não pertence a organização elegível e o próprio PRD impede a criação;
* Nome da API e Descrição aparecem como obrigatórios no ecrã observado.

Por confirmar com contexto elegível:

* tipos de acesso;
* associação de Conjuntos de Dados;
* edição de API existente.

### PRD-R05, Reutilizações

Estado: **Parcialmente executado**.

Confirmado em PRD:

* criação disponível com produtor pessoal;
* conta sem organização disponível;
* Nome, URL da reutilização e Tipo apresentados como obrigatórios no passo inicial;
* passo de associação disponível em leitura;
* associação permite Conjuntos de Dados do portal **ou** links externos, não ambas as modalidades na mesma Reutilização;
* Título e Descrição dos links externos aparecem como opcionais.

Por confirmar:

* edição de Reutilização existente;
* estado persistido;
* disponibilidade final da transferência no ecrã actual.

### PRD-R06, Harvester

Estado: **Parcialmente executado**.

Confirmado:

* wizard `/pt/admin/harvesters/new` acessível;
* tentativa de acesso a `/pt/admin/system/harvesters` com a conta actual regressou à área pessoal.

Decisão: criação/wizard observável, mas administração de sistema, comparação de perfis, preview e Trabalhos permanecem **Por confirmar com perfil e fonte adequados**.

### PRD-R07, Discussões

Não foi recolhida nesta passagem evidência autenticada nova suficiente para promover o estado. Mantém-se a evidência pública já registada e a participação autenticada continua pendente, sem executar qualquer escrita.

### Impacto na fila de fecho

A fila deixa de representar seis grupos totalmente por executar. O estado actual passa a ser:

1. PRD-R01: parcialmente executado; dependência de conta com Organização;
2. PRD-R02: parcialmente executado; ciclo de vida/transferência pendentes;
3. PRD-R04: parcialmente executado; dependência de Organização elegível/API gerível;
4. PRD-R05: parcialmente executado; edição/transferência pendentes;
5. PRD-R06: parcialmente executado; dependência de perfil administrativo/fonte;
6. PRD-R07: parcialmente executado; consulta, pesquisa, estados vazios e formulário de criação confirmados; resposta/contexto de organização pendentes.

Não foram encontradas nesta ronda divergências editoriais objectivas que justifiquem alteração imediata de `content/guides.json`.


### Continuação PRD-R07, Discussões

Execução autenticada complementar concluída sem escrita:

* Conjunto de Dados com conversa existente: separador **Discussões (1)**, pesquisa e **Nova discussão** observados;
* pesquisa por termo existente filtrou para a conversa correspondente;
* termo sem correspondência removeu a conversa da lista; não foi observada mensagem textual específica de “sem resultados” nessa vista;
* Reutilização com zero conversas: **0 DISCUSSÃO**, pesquisa, **Nova discussão** e estado vazio **Sem discussões**;
* API com zero conversas: **Discussões (0)** disponível; o query parameter `?tab=discussions` não activou sozinho o separador na vista observada;
* formulário **Nova discussão** aberto sem submissão;
* **Título*** e **A sua mensagem*** são obrigatórios;
* orientação de cordialidade/privacidade apresentada no campo de mensagem;
* **Enviar** desactivado enquanto o formulário está vazio.

Estado PRD-R07: **Parcialmente executado**.

Ainda Por confirmar: controlo visual de resposta numa conversa existente, contexto de Organização e qualquer submissão persistente. Nenhuma mensagem foi criada.


## Revisão final de PDFs e tentativa NVDA, 22/09/2026

### Revisão visual

Os 15 PDFs publicados na revisão foram descarregados para uma área temporária da Windows Sandbox e a estrutura/paginação foi novamente confirmada.

Foi realizada uma revisão visual amostral no visualizador PDF do Edge, cobrindo diferentes variantes do template:

* **Ajuda e contactos**: capa, página de tarefa e página final;
* **Explorador de dados**: capa, página intermédia e página final;
* **Publicar e gerir Conjuntos de Dados**: capa com título longo;
* **Catálogo de Modelos**: capa;
* **Discussões e comunidade**: capa e página de tarefa.

Na amostra revista não foram observados:

* clipping de texto;
* sobreposição de blocos;
* glifos quebrados;
* títulos fora da área útil;
* QR code ou elementos principais cortados.

No Explorador de dados foi observada uma página intermédia com espaço em branco significativo, resultante da paginação de uma continuação curta. Não foi identificada quebra visual ou perda de conteúdo.

Decisão: **revisão visual amostral sem defeitos detectados**. Não equivale a inspecção pixel a pixel de todas as páginas dos 15 documentos.

### Estrutura documental e acessibilidade técnica dos PDFs

Os 15 PDFs foram inspeccionados com uma biblioteca PDF, sem depender de pesquisa textual binária.

Confirmado em **15/15**:

* `StructTreeRoot` presente;
* `MarkInfo` presente com `Marked=true`;
* idioma documental `pt-PT`;
* título e assunto documentais preenchidos;
* `ViewerPreferences` com `DisplayDocTitle=true`;
* árvore semântica real com `Document`, headings, parágrafos, listas e links;
* tabelas etiquetadas nos documentos que contêm tabelas;
* duas figuras estruturadas por guia e texto alternativo presente em **2/2** figuras de cada PDF.

Esta evidência demonstra que os PDFs não são apenas visualmente renderizados com texto extraível: possuem estrutura semântica e metadados de acessibilidade.

Decisão: **estrutura documental dos 15 PDFs validada tecnicamente**.

Ressalva: isto não substitui uma validação de ordem de leitura com leitor de ecrã/PAC equivalente.

### Tentativa NVDA

Foi verificada a disponibilidade do NVDA oficial 2026.2.

Controlo de integridade efectuado antes da execução:

* origem: servidor oficial NV Access;
* SHA256 local coincidente com o SHA256 oficial da release;
* assinatura Authenticode: **Valid**, signatário **NV Access Limited**.

Ao iniciar a cópia temporária na Windows Sandbox, o próprio log do NVDA registou:

`ImportError: DLL load failed while importing _core: An Application Control policy has blocked this file.`

Ficheiro bloqueado: `wx._core.pyd`, extraído para a área temporária do NVDA.

Decisão: a ronda **NVDA não é executável nesta Windows Sandbox devido à política Application Control do ambiente**. Não foi tentado contornar ou reduzir essa política.

Estado:

* acessibilidade estrutural PDF: **validada tecnicamente**;
* revisão visual PDF: **amostral, sem defeitos detectados**;
* NVDA/leitura assistiva real: **bloqueado pelo ambiente, Por confirmar noutro ambiente compatível**.
