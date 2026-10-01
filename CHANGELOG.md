# Histórico de versões

## v0.5.0 · 23/09/2026

Release de demonstração e revisão preparada a partir da branch `feature/static-routes-pdf` para promoção a `main` pelo PR #5.

Principais alterações:

* Evolução da colecção para **15 guias e 95 fichas**. Em 23/09/2026 foram acrescentadas duas fichas a D13, `Alterar o email e a palavra-passe da conta` e `Gerir Chaves da API`, e uma ficha a D14, `Enviar feedback sobre o dados.gov.pt`.
* Publicação de **118 rotas estáticas** com sitemap, canonicals, pesquisa transversal e página 404 dedicada.
* Publicação e validação estrutural de **15 PDFs**, cobrindo as 95 fichas após a expansão de 23/09/2026.
* Criação da fonte editorial permanente `content/guides.json` e do gerador `scripts/generate_pdf_guides.py`.
* Criação do guardrail `scripts/validate_guides_consistency.py` e workflow de CI para validar fonte, rotas, pesquisa, sitemap e estrutura HTML.
* Correcção do workflow PDF permanente: limpeza dos artefactos temporários de `.build` antes do `rebase`, publicação concorrente controlada por branch e suporte equivalente para `main` e para a branch de evolução.
* Correcções editoriais baseadas em PRD para D04, D09 e D13.
* D01 foi revalidado segundo o comportamento público actual de PRD; a ficha de primeiro acesso foi generalizada para não antecipar o mecanismo de migração/associação.
* Correcção de acessibilidade da pesquisa dinâmica com anúncio de resultados por `role="status"` e `aria-live="polite"`.
* Correcção dos nomes acessíveis de Pesquisa e Autenticar no header mobile.
* Guardrail final validado sobre **118 páginas HTML**, 95 entradas de pesquisa e 118 URLs de sitemap. A ronda HTTP anterior à expansão confirmou 115/115 páginas e 134 ligações internas sem quebras.
* QA responsivo e por teclado em 320, 360, 768 e 1440 px nas páginas representativas.
* Criação de `docs/PROJECT_STATUS.md`, `docs/CONTENT_VALIDATION.md` e `docs/PRD_TEST_PLAN.md` para continuidade, rastreabilidade e fecho de validação.
* D06 está confirmado como não integrado no Frontoffice público de PRD; D07 e CM não são observáveis no stack público actual de PRD; D11 foi alinhado ao PRD actual: o guia passou a **Favoritos e notificações**, mantendo as rotas históricas; Favoritos e Notificações são documentados como capacidades separadas.

Limitações conhecidas transferidas para a próxima release: integração efectiva de D06 no Frontoffice; observabilidade de D07 e CM; validação manual final com NVDA; revisão visual detalhada e validação documental dos PDFs; e evoluções funcionais ou correcções que surjam após esta baseline. Esta decisão de âmbito não equivale a validar funcionalmente essas limitações nem transforma o protótipo em publicação oficial.

## v0.4 · 15/09/2026

Evolução técnica, visual e editorial do protótipo preparada para revisão.

Principais alterações:

* Aproximação do header ao frontend público actual do dados.gov.pt, com marca, navegação principal, Recursos, Publicar, pesquisa, Ecossistema e autenticação representados no protótipo.
* Aproximação do footer à estrutura observada no portal, incluindo as três áreas de navegação `Dados abertos`, `Portal` e `Desenvolvimento`, marcas institucionais e ligações relacionadas.
* Separação do CSS do documento HTML.
* Separação dos dados editoriais, lógica principal e comportamento do header em módulos JavaScript distintos.
* Introdução de propriedades CSS personalizadas e camadas de cascade para reduzir conflitos de especificidade e centralizar tokens do protótipo.
* Utilização de HTML semântico para `header`, `nav`, `main` e `footer`.
* Integração do guia D14, Ajuda e contactos, com cinco fichas suportadas pelo comportamento actual e pelas decisões registadas.
* Integração do guia D01, Autenticação e acesso à conta, com seis fichas baseadas no comportamento alvo validado em TST. O guia mantém o login por email e palavra-passe como opção actual e não antecipa a futura consolidação de contas nem a descontinuação desse método.
* Evolução da taxonomia de seis para sete temas funcionais.
* Renomeação do tema `Conta e participação` para `Acesso, perfil e participação`.
* Separação de `Ajuda e contactos` num tema próprio, para tornar o apoio directamente localizável sem exigir que o utilizador identifique primeiro a área funcional do problema.
* A v0.4 disponibiliza 15 guias e 91 fichas.
* Criação e manutenção de uma cópia autónoma da v0.4 dentro de `versions/v0.4`.
* Reescrita integral do `README.md`, que passa a apresentar o problema resolvido, a proposta de valor dos guias, a arquitectura de informação, a metodologia de construção do conteúdo, a rastreabilidade e a estrutura técnica do protótipo.

Fonte técnica: implementação pública do frontend `amagovpt/dadosgov-fe`, incluindo `Header.tsx`, `Footer.tsx`, configuração de navegação, estilos globais e testes E2E de header/footer. Para D01 e D14, foram consideradas as decisões funcionais e a evidência de implementação registadas no Jira do projecto.

Assunção: a v0.4 é uma aproximação estática para prototipagem. Não implementa autenticação, sessão, CMS ou conteúdo dinâmico do Ecossistema.

Por confirmar: paridade visual pixel a pixel com a versão publicada, todos os tokens Ágora aplicáveis e comportamento integral do header/footer nos breakpoints suportados.

## v0.3 · 15/09/2026

Principais alterações:

* Criação de uma página inicial orientada pela pergunta «Como podemos ajudar?».
* Agrupamento dos 13 guias em seis temas funcionais.
* Navegação organizada segundo o percurso Tema → Guia → Tarefa.
* Pesquisa transversal com resultados contextualizados pelo respectivo tema.
* Manutenção das 80 fichas existentes, sem alteração intencional das respectivas regras funcionais nesta evolução.
* Inspiração na arquitectura de informação de guides.data.gouv.fr, adaptada ao contexto do dados.gov.pt.

Assunção: a taxonomia temática é uma proposta UX/editorial para revisão e não constitui requisito funcional aprovado.

## v0.2 · 15/09/2026

Principais alterações:

* Correcção do idioma principal do documento para `pt-PT`.
* Aproximação estrutural ao Figma oficial do dados.gov.pt e aos padrões Ágora que foi possível observar.
* Ajuste da estrutura do header para os breakpoints de referência observados no Figma.
* Conteúdo desktop organizado numa área útil de 1216 px.
* Margens mobile alinhadas com a referência observada para 360 px.
* Separação da pesquisa da área institucional do header.
* Reforço do foco visível nos principais elementos interactivos.
* Manutenção da arquitectura editorial e dos 13 guias.

Por confirmar: conformidade integral com tokens, tipografia, raios, estados e restantes componentes do Ágora Design System. Esta versão não deve ser interpretada como Figma aprovado.

## v0.1 · 08/09/2026

Primeiro rascunho preservado a partir do `index.html` que existia na branch `main` antes da reorganização do versionamento.

Características principais:

* Protótipo HTML inicial dos Guias do Utilizador.
* Estrutura concentrada num único `index.html`.
* Apresentação limitada a uma área máxima de 736 px.
* Idioma do documento identificado como `pt-BR`.

Esta versão é preservada apenas para referência histórica e comparação visual.
