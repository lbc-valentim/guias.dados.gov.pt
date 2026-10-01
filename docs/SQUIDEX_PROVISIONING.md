# Provisionamento do Squidex provisório

Estado: decisão técnica para a v1, revalidada em 24/09/2026.

## Decisão revalidada

Recomendação: utilizar Squidex Cloud Starter apenas para o piloto técnico dos Guides.

Motivo: para a escala actual, o risco principal continua a ser a divergência do modelo de conteúdo face ao futuro Squidex oficial, não o alojamento. O Cloud reduz operação sem alterar o motor CMS de destino.

`GuidesContent` continua a ser o contrato interno da aplicação. O mapper permanece como fronteira entre Squidex e UI.

## Evidência verificada em 24/09/2026

Segundo a informação oficial do Squidex:

* Starter: gratuito;
* 20.000 chamadas API;
* 2 GB de tráfego;
* 500 MB de armazenamento;
* 2 contribuidores;
* obrigação de apresentar a marca `Powered By` nas páginas ou aplicações abrangidas pelo plano Starter;
* infraestrutura Cloud localizada em Frankfurt, Alemanha;
* backups permitem migração entre Cloud e self hosted;
* restore numa instalação self hosted pode ser executado pelo administrador;
* restore para Squidex Cloud requer intervenção do suporte do Squidex;
* self hosting implica gerir a instalação, MongoDB, HTTPS e persistência.

Fontes:

* https://www.squidex.io/pricing
* https://docs.squidex.io/id-02-documentation/concepts/backups
* https://docs.squidex.io/id-01-getting-started/installation/platforms/install-on-docker

## Justificação

1. O piloto tem uma escala reduzida: 7 temas, 15 guias e 95 fichas.
2. Não existe necessidade funcional actual de gerir Docker, MongoDB, TLS, upgrades, monitorização ou persistência própria.
3. O destino previsto continua a ser uma instância Squidex, pelo que o alojamento provisório não deve determinar o domínio da aplicação.
4. A migração fica protegida por `GuidesContent`, pelo mapper e pelo mecanismo de backup.
5. O JSON local permanece disponível enquanto a v1 não estiver consolidada.

## Assunções e questões por confirmar

Assunção: dois contribuidores são suficientes para o piloto técnico.

Assunção: o volume de chamadas API, tráfego e armazenamento do piloto fica abaixo dos limites Starter.

Por confirmar: aceitação da marca `Powered By` numa eventual demonstração pública.

Por confirmar: requisitos institucionais de alojamento, governação ou residência de dados aplicáveis a uma futura utilização oficial.

## Critérios de saída do Starter

O Starter deixa de ser a opção recomendada se ocorrer pelo menos uma das seguintes condições:

1. forem necessários mais de dois contribuidores;
2. as chamadas API, tráfego ou armazenamento se aproximarem dos limites do plano;
3. a marca `Powered By` não for aceitável no contexto de demonstração ou publicação;
4. surgirem requisitos institucionais incompatíveis com o alojamento Cloud provisório;
5. a instância oficial do dados.gov.pt ficar disponível para integração controlada.

Nesses casos deve ser avaliada a passagem para um plano Cloud adequado, self hosting ou directamente para a instância oficial, conforme o requisito que motivou a mudança.

## Configuração mínima do piloto

App provisória dedicada aos Guides.

Schemas:

* `guide-theme`
* `guide`
* `guide-task`
* componentes `guide-step` e `guide-resource`

Conteúdo inicial:

* 1 tema sintético;
* 1 guia sintético;
* 2 tarefas sintéticas;
* locale `pt-PT`.

Apenas depois de o ciclo completo funcionar deverá ser considerada a carga do conteúdo real.

## Integração técnica prevista

A aplicação não deve consumir directamente a estrutura GraphQL do Squidex.

Fluxo:

Squidex GraphQL → transporte → normalização → mapper → `GuidesContent` → aplicação

Endpoint, App e credenciais devem ser fornecidos por configuração de ambiente. Nenhum segredo deve ser versionado no repositório.

## Critérios de sucesso do piloto

1. O transporte obtém o tema, guia e duas tarefas.
2. O mapper produz um `GuidesContent` válido.
3. Relações e ordenação permanecem equivalentes à fixture técnica.
4. A aplicação consegue gerar as rotas a partir do resultado normalizado.
5. O JSON local continua disponível como fallback durante a v1.
6. É produzido um backup da App piloto antes de qualquer expansão.
7. O processo de saída do Starter fica documentado antes da carga do conteúdo real.

## Estratégia de saída

Se o destino continuar a ser Squidex:

1. congelar alterações editoriais durante a migração;
2. criar backup da App provisória;
3. validar compatibilidade do schema com a instância de destino;
4. quando o schema oficial divergir, adaptar o mapper ou efectuar transformação controlada;
5. restaurar ou importar o conteúdo na instância de destino;
6. trocar configuração de endpoint e credenciais quando os contratos forem equivalentes;
7. validar IDs, slugs, relações e ordenação.

Nota: restore para Squidex Cloud requer actualmente intervenção do suporte do Squidex. Não deve ser assumido como operação automática.

Se o destino deixar de ser Squidex, `GuidesContent` permanece o contrato interno e deve ser criada uma nova implementação de repositório sem alterar os componentes da UI.

## Riscos

### R1. Divergência do schema oficial

Probabilidade: média.

Impacto: médio.

Mitigação: manter `GuidesContent` e mapper como fronteira de integração.

### R2. Credenciais ou configuração versionadas indevidamente

Probabilidade: baixa.

Impacto: alto.

Mitigação: apenas variáveis de ambiente e secrets do ambiente de execução.

### R3. Dependência do serviço Cloud

Probabilidade: baixa para o piloto.

Impacto: baixo para o piloto.

Mitigação: backup, JSON local preservado e estratégia de saída documentada.

### R4. Limites do Starter

Probabilidade: baixa para o piloto.

Impacto: médio se o piloto crescer.

Mitigação: acompanhar chamadas API, tráfego, armazenamento, contribuidores e requisito de branding antes da expansão.

### R5. Requisitos futuros de alojamento ou governação

Estado: Por confirmar.

Mitigação: tratar Cloud Starter como solução temporária de piloto e manter a arquitectura migrável.

## Fora de âmbito deste checkpoint

* criação efectiva de conta, App ou schemas no Squidex;
* criação de credenciais;
* carga das 95 fichas reais;
* integração oficial com dados.gov.pt;
* definição de governação editorial definitiva;
* alteração do runtime actual dos Guides.
