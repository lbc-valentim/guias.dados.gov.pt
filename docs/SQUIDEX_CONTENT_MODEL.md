# Modelo de conteúdo Squidex provisório

Estado: implementado e validado na instância provisória da v1.

Objectivo: permitir uma instância Squidex provisória sem acoplar a UI ao formato do CMS e mantendo `GuidesContent` como contrato interno da aplicação.

## Princípios

1. `GuidesContent` continua a ser o modelo de domínio validado por Zod.
2. O Squidex é uma fonte externa. O mapper converte Squidex para `GuidesContent`.
3. IDs funcionais, slugs, relações e ordenação são invariantes.
4. Texto apresentado ao utilizador nasce localizável, mesmo que a v1 publique apenas `pt-PT`.
5. Não duplicar relações em dois sentidos.
6. Não modelar no CMS dados derivados como índice de pesquisa, sitemap ou PDFs.

## Schemas de conteúdo

### `guide-theme`

| Campo | Tipo Squidex | Obrigatório | Localizável | Observação |
| --- | --- | --- | --- | --- |
| `key` | String | Sim | Não | ID funcional estável do tema, equivalente ao `Theme.id` |
| `slug` | String | Sim | Não | Segmento estável de URL |
| `order` | Number | Sim | Não | Ordem de apresentação dos temas |
| `title` | String | Sim | Sim | `Theme.title` |
| `intro` | String | Sim | Sim | `Theme.intro` |

Não guardar `guideIds` no tema. O mapper deriva `Theme.guideIds` a partir dos guias associados ao tema, ordenados por `order`.

### `guide`

| Campo | Tipo Squidex | Obrigatório | Localizável | Observação |
| --- | --- | --- | --- | --- |
| `key` | String | Sim | Não | ID funcional estável, equivalente ao `Guide.id` |
| `code` | String | Sim | Não | Código funcional actual, por exemplo `D01` |
| `slug` | String | Sim | Não | Segmento estável de URL |
| `theme` | Reference para `guide-theme` | Sim | Não | Única fonte da relação tema guia |
| `order` | Number | Sim | Não | Ordem do guia dentro do tema |
| `title` | String | Sim | Sim | `Guide.title` |
| `intro` | String | Sim | Sim | `Guide.intro` |
| `audience` | String | Sim | Sim | `Guide.audience` |
| `tasks` | References ordenadas para `guide-task` | Sim | Não | Constrói `Guide.fichas` preservando a ordem editorial |
| `relatedGuides` | References para `guide` | Não | Não | Constrói `relatedGuideIds` |
| `resources` | Components `guide-resource` | Não | Não | Ligações auxiliares do guia |

Quando o Squidex materializa `resources` opcional como uma colecção vazia, o mapper normaliza esse valor para ausência da propriedade opcional em `GuidesContent`. Na baseline actual não existe `resources: []` com significado próprio.

### `guide-task`

| Campo | Tipo Squidex | Obrigatório | Localizável | Observação |
| --- | --- | --- | --- | --- |
| `key` | String | Sim | Não | ID funcional estável, equivalente ao `Task.id` |
| `slug` | String | Sim | Não | Segmento estável de URL |
| `title` | String | Sim | Sim | `Task.title` |
| `intro` | String | Sim | Sim | `Task.intro` |
| `roles` | String | Não | Sim | `Task.roles`; a baseline contém valores legitimamente vazios |
| `steps` | Components `guide-step` | Sim | Não | Lista ordenada de passos |
| `example` | String | Não | Sim | `Task.example` |
| `tip` | String | Não | Sim | `Task.tip` |
| `table` | JSON | Não | Sim | Mantém a matriz `string[][]` sem criar modelo de tabela prematuramente |
| `media` | String | Não | Sim | Na v1 representa texto editorial sobre a evidência visual |
| `nextType` | String restrita a `task`, `guide`, `overview` | Sim | Não | Preserva a semântica de `nextRef.type` |
| `nextTask` | Reference para `guide-task` | Condicional | Não | Preenchida quando `nextType = task` |
| `nextGuide` | Reference para `guide` | Condicional | Não | Preenchida quando `nextType = guide` ou `overview` |

Regra de consistência no mapper: exactamente uma referência de destino deve estar preenchida de acordo com `nextType`.

## Component schemas

### `guide-step`

* `text`: String, obrigatório, localizável.

### `guide-resource`

* `title`: String, obrigatório, localizável.
* `url`: String, obrigatório, não localizável.

Estes schemas são componentes embebidos, não conteúdos autónomos.

## Mapeamento para `GuidesContent`

* `Theme.guideIds`: derivado dos `guide` com referência ao tema, ordenados por `guide.order`.
* `Guide.themeId`: derivado de `guide.theme.key`.
* `Guide.fichas`: derivado de `guide.tasks` mantendo a ordem das referências.
* `Guide.relatedGuideIds`: derivado de `relatedGuides[].key`.
* `Guide.resources`: preservado quando existem componentes; colecção vazia do CMS é normalizada para ausência da propriedade opcional.
* `Task.steps`: derivado de `steps[].text`.
* `Task.nextRef`: reconstruído a partir de `nextType`, `nextTask` e `nextGuide`.

## Estado da implementação provisória

A instância `guias-dados-gov-pt-piloto` contém a baseline v1 integral em Draft:

* 7 temas;
* 15 guias;
* 95 tarefas;
* 11 resources;
* 409 steps;
* 3 tabelas.

O piloto técnico `tema-piloto / D99 / D99-T01 / D99-T02` permanece separado e também em Draft.

A equivalência semântica da baseline importada foi validada depois da normalização das representações próprias do CMS, incluindo referências por ID, componentes `steps`, campos localizados `media` e `table`, e `resources` vazio.

## Fora de âmbito nesta fase

* integração com o Squidex oficial do dados.gov.pt;
* conteúdo em inglês;
* autenticação e permissões editoriais definitivas;
* workflows editoriais específicos;
* canonicals finais do portal;
* assets reais para capturas, vídeos ou outros media;
* geração de pesquisa, sitemap ou PDFs dentro do CMS;
* alterações funcionais ao conteúdo dos 7 temas, 15 guias e 95 fichas;
* publicação dos conteúdos Draft da instância provisória.

## Riscos controlados

1. O schema exacto do Squidex oficial ainda é por confirmar. A protecção é o mapper e o contrato `GuidesContent`.
2. Campos localizáveis devem ser definidos como tal desde a criação no Squidex, pois a configuração de localização do campo não deve ser tratada como algo a alterar posteriormente.
3. A relação tema guia não é duplicada. `guide.theme` e `guide.order` são a fonte de verdade e `Theme.guideIds` é derivado.
4. `nextRef` mantém o discriminador explícito para evitar que detalhes de referências polimórficas do CMS cheguem ao domínio.
5. Escritas protegidas usam concorrência optimista por versão e `If-Match` no formato aceite pelo Squidex.

## Resultado do piloto e expansão

O piloto de 1 tema, 1 guia e 2 tarefas foi executado antes da expansão. Depois de o mapper produzir `GuidesContent` válido e a leitura GraphQL real ser comprovada, a baseline integral foi importada em Draft e validada por equivalência semântica.
