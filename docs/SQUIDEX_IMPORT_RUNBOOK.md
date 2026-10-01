# Runbook de importação Squidex provisório

Estado actual: `IMPORTED_DRAFT_VALIDATED`.

A baseline integral foi importada para a instância Squidex provisória, permanece em Draft e foi validada por equivalência semântica com `content/guides.json`.

## Objectivo

Documentar o modelo de segurança usado na migração dos Guias e fornecer à equipa dados.gov.pt uma referência para futura repetição, reconciliação ou migração para outra instância Squidex.

Este runbook não autoriza novas escritas. Qualquer nova importação ou reimportação exige decisão operacional própria e inventário live fresco.

## Baseline importada

* 7 `guide-theme`;
* 15 `guide`;
* 95 `guide-task`;
* 117 conteúdos funcionais;
* 225 operações no plano determinístico;
* 409 componentes `guide-step`;
* 11 componentes `guide-resource`;
* 3 tabelas.

O piloto sintético `tema-piloto`, `D99`, `D99-T01` e `D99-T02` permanece separado da baseline e também em Draft.

## Princípios de segurança preservados

1. O modo normal dos scripts versionados continua a ser `dry-run`.
2. Não existe comando npm genérico de `apply` exposto.
3. O plano usa IDs determinísticos derivados de schema e key.
4. O destino é vinculado por `destinationHash` e o conteúdo por `planHash`.
5. Inventário, colisões e equivalência devem ser verificados antes de qualquer nova escrita.
6. Não existe fallback silencioso entre Squidex e Local JSON.
7. Operações remotas devem ser registadas para retoma e rollback.
8. Updates protegidos usam a versão remota observada e `If-Match` no formato aceite pelo Squidex.
9. Um resultado de transporte ambíguo deve ser reconciliado por leitura remota antes de repetir a operação.
10. Rollback automático só é seguro enquanto a versão remota continuar a ser a versão deixada pela migração.

## Gates disponíveis no repositório

```bash
npm run content:validate
npm run squidex:import:dry-run
npm run test:squidex
npm run squidex:import:preflight
npm run squidex:import:safety-check
npm run typecheck
```

O preflight e o safety check são determinísticos. As fixtures versionadas servem para CI e não substituem um inventário live antes de futuras mutações.

## Concorrência validada no Squidex live

O piloto `D99` foi usado para validar o contrato real de concorrência sem tocar na baseline funcional.

Sequência comprovada:

1. leitura da versão `8`;
2. PATCH com `If-Match: "8"` aceite e nova versão `9`;
3. repetição com a versão obsoleta `8` rejeitada com HTTP `412`;
4. rollback com a versão corrente aceite e versão final `10`;
5. conteúdo do piloto restaurado e mantido em Draft.

A investigação confirmou que o Squidex espera um Entity Tag HTTP numérico entre aspas. Valor sem aspas ou ETag de cache não representa correctamente a precondição de versão usada pelo comando de conteúdo.

## Importação integral executada

Depois do ensaio sintético e do inventário live sem colisões, a baseline foi importada em cinco fases:

1. criação de 7 temas;
2. criação de 95 tarefas;
3. criação de 15 guias com referências de tema e tarefas;
4. aplicação de 13 patches de relações entre guias, totalizando 29 links;
5. aplicação de 95 destinos `nextRef`, com 82 `nextTask` e 13 `nextGuide`.

Nenhum conteúdo da baseline foi publicado.

## Divergência `roles` detectada durante a importação

Quinze tarefas da fonte têm legitimamente `roles=""`.

O schema inicial do Squidex marcava `roles` como obrigatório e uma tentativa intermédia introduziu `N/A`. Esse valor não fazia parte da fonte e não foi aceite como solução funcional.

A implementação foi corrigida:

* `guide-task.roles` passou a não obrigatório;
* as 15 tarefas foram repostas exactamente para `roles=""`;
* a validação confirmou ausência de `N/A` inventado.

## Verificação pós importação

A validação live reconstruiu o domínio a partir dos 117 conteúdos e comparou-o com `content/guides.json`.

Foram normalizadas apenas diferenças estruturais do CMS:

* referências Squidex por ID para IDs funcionais;
* components `steps` para `string[]`;
* wrappers localizados de `media` e `table`;
* colecção `resources` vazia para ausência da propriedade opcional.

Resultado final: `normalizedEquivalent = true`, com zero diferenças funcionais após normalização.

## Estado da UI

A UI já consome `loadConfiguredContent()`.

Comportamento actual:

* sem `GUIDES_CONTENT_SOURCE`, usa Local JSON;
* com `GUIDES_CONTENT_SOURCE=local`, usa Local JSON;
* com `GUIDES_CONTENT_SOURCE=squidex`, usa Squidex GraphQL;
* se Squidex for seleccionado e falhar, a aplicação falha explicitamente em vez de regressar silenciosamente ao conteúdo local.

A activação de Squidex continua opt in. A release deste repositório não altera a fonte por defeito.

## Limites para futura integração

As queries GraphQL usam `top: 200`, suficiente para a baseline actual. Uma instância com mais de 200 conteúdos num schema deve implementar paginação ou bloquear o build quando existir risco de truncamento.

Pesquisa, sitemap e PDFs continuam derivados do JSON local na release actual. Se o Squidex oficial passar a ser a fonte editorial, esses derivados também devem ser alinhados à mesma fonte ou a separação deve ser explicitamente documentada.

## Procedimento para futura reimportação

Antes de qualquer nova escrita:

1. recolher inventário live de `guide-theme`, `guide` e `guide-task`;
2. validar destino e identidade dos schemas;
3. executar dry run, testes, preflight e safety check;
4. comparar targets existentes antes de decidir create ou update;
5. usar `If-Match` com a versão remota corrente em qualquer update;
6. reconciliar operações ambíguas antes de repetir;
7. guardar versões e snapshots necessários para rollback;
8. reler o CMS e exigir equivalência após a execução.

## Fora de âmbito

* integração com o Squidex oficial do dados.gov.pt;
* publicação dos conteúdos Draft;
* remoção do JSON local;
* alterações funcionais ou editoriais da baseline;
* deploy no portal oficial;
* acessibilidade da solução integrada, que deverá ser tratada pela equipa no contexto real do portal.
