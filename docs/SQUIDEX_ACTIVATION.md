# Activação controlada da fonte Squidex

## Estado actual

A v1 suporta duas fontes de conteúdo na camada técnica:

- Local JSON, fonte activa por defeito.
- Squidex GraphQL, disponível apenas por opt in explícito.

A UI server-side dos Guias usa `loadConfiguredContent()` de `src/lib/content/config.ts`. Sem configuração, a aplicação continua a carregar Local JSON.

Definir `GUIDES_CONTENT_SOURCE=squidex` activa explicitamente a cadeia Squidex para a geração/renderização dos Guias. Não existe fallback silencioso para Local JSON.

## Configuração server only

Variáveis suportadas:

- `GUIDES_CONTENT_SOURCE`
- `GUIDES_SQUIDEX_GRAPHQL_ENDPOINT`
- `GUIDES_SQUIDEX_ACCESS_TOKEN`
- `GUIDES_SQUIDEX_INCLUDE_DRAFTS`

Sem configuração, `GUIDES_CONTENT_SOURCE` resolve para `local`.

Para seleccionar Squidex é obrigatório definir:

```text
GUIDES_CONTENT_SOURCE=squidex
GUIDES_SQUIDEX_GRAPHQL_ENDPOINT=<endpoint GraphQL da App>
```

Configuração opcional:

```text
GUIDES_SQUIDEX_ACCESS_TOKEN=<token server only>
GUIDES_SQUIDEX_INCLUDE_DRAFTS=true|false
```

O token não deve usar prefixo `NEXT_PUBLIC_`.

Os ficheiros `.env*` estão ignorados pelo Git. Apenas `.env.example` pode ser versionado.

## Verificações disponíveis

### Default local

```bash
npm run content:source:check
```

Sem variáveis Squidex, o comando deve validar a fonte local e terminar com `source=local`.

### Squidex live

Com as variáveis server only configuradas:

```bash
GUIDES_CONTENT_SOURCE=squidex npm run content:source:check
```

O comando usa a mesma cadeia técnica prevista para futuros consumidores:

```text
configuração
→ SquidexGraphQLTransport
→ normalizeSquidexGraphQLPayload
→ mapProvisionalSquidexPayload
→ GuidesContent
→ validateReferences
```

Também existe o smoke técnico opt in:

```bash
npm run test:squidex:live
```

Esse teste não é executado automaticamente no CI normal e não contém credenciais.

## Política de erro

Não existe fallback silencioso de Squidex para Local JSON.

Se `GUIDES_CONTENT_SOURCE=squidex` estiver seleccionado e o endpoint estiver indisponível, devolver erro, dados inválidos ou referências inconsistentes, o carregamento falha explicitamente.

Esta regra evita apresentar conteúdo local potencialmente desactualizado sem que a operação perceba que a fonte remota falhou.

## CI

O CI valida sempre:

1. conteúdo local e contrato de rotas;
2. fronteiras da arquitectura;
3. mapper e cadeia Squidex determinística;
4. fonte configurada com default Local JSON;
5. typecheck.

O CI normal não necessita de acesso ao Squidex Cloud nem de segredos.

## Activação na aplicação

A fronteira configurada está ligada à UI no branch v1. O comportamento continua seguro por defeito:

- sem `GUIDES_CONTENT_SOURCE`, usa Local JSON;
- com `GUIDES_CONTENT_SOURCE=local`, usa Local JSON;
- com `GUIDES_CONTENT_SOURCE=squidex`, usa Squidex GraphQL e falha explicitamente se a fonte remota não puder ser carregada ou validada.

As três colecções GraphQL são pedidas com `top: 200`, acima da baseline actual de 7 temas, 15 guias e 95 tarefas e dentro do máximo suportado pelo Squidex.

A publicação dos conteúdos no CMS e a integração em `main` continuam decisões separadas deste mecanismo de selecção de fonte.
