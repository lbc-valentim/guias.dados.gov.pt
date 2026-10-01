# Plano de media dos Guias do Utilizador

Última actualização: 23/09/2026

## 1. Objectivo

Definir quais imagens e vídeos previstos nas 95 fichas podem ser produzidos a partir do comportamento actual de PRD, quais exigem sessão autenticada controlada e quais devem permanecer suspensos até existir integração funcional observável.

Este documento controla apenas a produção de media editorial. Não substitui requisitos, Test Cases ou validação funcional.

## 2. Regra de fonte

A imagem ou vídeo deve representar o comportamento efectivamente reproduzível em **PRD** no momento da captura.

Não produzir media a partir de:

* backlog;
* Figma futuro;
* TST, PPR ou DEV como substituto silencioso de PRD;
* requisito alvo ainda não integrado;
* mockup que possa ser confundido com ecrã real;
* dados pessoais, emails reais, códigos, tokens, chaves API, credenciais ou identificadores sensíveis.

Quando uma funcionalidade não estiver disponível em PRD, o media permanece **Suspenso**.

## 3. Estados

| Estado | Significado |
| --- | --- |
| **PRD público** | Pode ser capturado sem autenticação e sem alteração de dados |
| **PRD autenticado** | Requer sessão e contexto/perfil adequado; não capturar até a validação autenticada correspondente estar concluída |
| **Suspenso** | Não produzir enquanto a funcionalidade alvo não estiver integrada/alinhada com PRD |

## 4. Resumo

| Estado | Fichas |
| --- | ---: |
| PRD público | **26** |
| PRD autenticado | **41** |
| Suspenso | **28** |
| **Total** | **95** |

## 5. Classificação por guia

### D01, Autenticação e acesso à conta

| Ficha | Estado | Nota |
| --- | --- | --- |
| Iniciar sessão com email e palavra-passe | PRD público | Capturar o separador e a indicação de que se destina a utilizadores antigos; não introduzir credenciais reais |
| Iniciar sessão com Chave Móvel Digital | PRD público | Capturar apenas o ponto de entrada no dados.gov.pt antes de enviar dados ao serviço de identidade |
| Iniciar sessão com Autenticação Europeia eIDAS | PRD público | Capturar apenas o ponto de entrada/explicação pública |
| Concluir o primeiro acesso quando solicitado | PRD autenticado | Requer identidade/conta controlada e percurso efectivamente apresentado em PRD |
| Recuperar a palavra-passe | PRD público | Capturar o formulário sem submeter email real |
| Resolver dificuldades de acesso | PRD público | Utilizar Ajuda e contactos e exemplos sem segredos |

### D02, Organizações e permissões

| Ficha | Estado |
| --- | --- |
| Encontrar uma organização | PRD público |
| Integrar uma organização | PRD autenticado |
| Criar uma organização | PRD autenticado |
| Gerir pedidos e membros | PRD autenticado |
| Editar uma organização | PRD autenticado |
| Emblemas da organização | PRD público |

### D03, Encontrar e consultar dados

As cinco fichas estão em **PRD público**:

1. Encontrar dados;
2. Pesquisar e filtrar;
3. Consultar um Conjunto de Dados;
4. Aceder aos dados;
5. Não encontrou o que procura?

### D04, Publicar e gerir Conjuntos de Dados

As sete fichas estão em **PRD autenticado**.

Capturas só depois de PRD-R02 confirmar a interface actual, especialmente licença inicial, ponto de contacto, ciclo de vida, transferência e eliminados.

### D05, Recursos de um Conjunto de Dados

| Ficha | Estado |
| --- | --- |
| Adicionar ficheiros | PRD autenticado |
| Adicionar uma ligação | PRD autenticado |
| Editar metadados ou uma ligação | PRD autenticado |
| Substituir o ficheiro de um recurso | PRD autenticado |
| Remover um recurso | PRD autenticado |
| Consultar o recurso disponibilizado | PRD público |

A captura pública deve representar apenas a Pré-visualização actualmente disponível. Não incluir o novo Explorador enquanto D06 permanecer não integrado.

### D06, Explorador de dados

As oito fichas ficam **Suspensas**.

Motivo: o CTA está preparado no frontend, mas oculto, não existe percurso público reproduzível em PRD e não foi encontrada rota pública do novo Explorador.

### D07, Qualidade e validação de dados

As seis fichas ficam **Suspensas**.

Motivo: o novo Validador não é observável no stack público actual de PRD.

### D08, APIs e serviços de dados

| Ficha | Estado |
| --- | --- |
| Escolher a API adequada | PRD público |
| Consultar a referência da API do portal | PRD público |
| Consultar uma API do catálogo | PRD público |
| Preparar e registar uma API | PRD autenticado |
| Actualizar uma API e os dados associados | PRD autenticado |
| Resolver dificuldades com uma API | PRD autenticado |

Nunca mostrar uma chave `X-API-KEY` real.

### D09, Reutilizações

| Ficha | Estado |
| --- | --- |
| Encontrar e consultar reutilizações | PRD público |
| Preparar uma reutilização | PRD autenticado |
| Associar os dados utilizados | PRD autenticado |
| Publicar ou manter em rascunho | PRD autenticado |
| Actualizar uma reutilização | PRD autenticado |
| Resolver dificuldades numa reutilização | PRD autenticado |

Não produzir media de transferência enquanto a acção continuar ausente do ecrã actual.

### D10, Harvester

As seis fichas estão em **PRD autenticado**.

Utilizar apenas fonte e organização de teste/autorizadas. Não expor credenciais, tokens, URLs privadas ou dados operacionais sensíveis.

### D11, Seguir conteúdos e notificações

As cinco fichas ficam **Suspensas**.

Motivo: PRD actual continua a apresentar **Adicionar aos favoritos / Remover dos favoritos** nos quatro tipos; a evolução **Seguir / Deixar de seguir** ainda não está integrada.

### D12, Discussões e comunidade

| Ficha | Estado |
| --- | --- |
| Consultar as discussões de um conteúdo | PRD público |
| Iniciar uma discussão | PRD autenticado |
| Responder a uma discussão | PRD autenticado |
| Consultar discussões da organização | PRD autenticado |
| Resolver dificuldades nas discussões | PRD público |

Em emails/notificações, ocultar endereços e outros dados pessoais.

### D13, Perfil e actividade

As sete fichas estão em **PRD autenticado**. As novas fichas `Alterar o email e a palavra-passe da conta` e `Gerir Chaves da API` exigem sessão e devem ser capturadas sem expor credenciais ou chaves reais.

Os perfis de utilizador exigem autenticação no PRD actual. Utilizar conta de teste e dados fictícios/autorizados.

### D14, Ajuda e contactos

As sete fichas podem ser preparadas em **PRD público**:

1. Consultar Ajuda e contactos;
2. Enviar uma pergunta à equipa do dados.gov.pt;
3. Enviar feedback sobre o dados.gov.pt;
4. Pedir informação ou sugerir um conjunto de dados;
5. Reportar uma questão sobre um conjunto de dados;
6. Solicitar atribuição ou alteração de um emblema;
7. Reportar um problema técnico.

Não submeter formulários apenas para obter uma captura. Capturar antes da submissão, com dados fictícios quando necessário.

### CM, Catálogo de Modelos

As nove fichas ficam **Suspensas**.

Motivo: o novo Catálogo não é observável no stack público actual de PRD. O endpoint legado `/datasets/schemas/` não representa a funcionalidade da LEDG-2049.

## 6. Critérios para uma captura utilizável

Uma captura só pode ser integrada no Manual quando:

1. corresponde ao PRD actual;
2. não contém dados pessoais ou segredos;
3. mostra apenas a área necessária à tarefa;
4. utiliza zoom e dimensão que mantenham o texto legível;
5. não depende exclusivamente de cor para explicar um estado;
6. preserva contexto suficiente para o utilizador reconhecer a página;
7. não contém menus, notificações ou informação incidental desnecessária;
8. possui texto alternativo editorial adequado quando integrada no HTML/PDF;
9. foi revalidada se a interface tiver mudado desde a captura.

## 7. Vídeo

Para vídeos curtos:

* mostrar apenas um fluxo;
* evitar pausas ou navegação sem relação com a tarefa;
* não gravar digitação de palavras-passe, códigos ou tokens;
* remover notificações do sistema operativo e dados de outras aplicações;
* incluir alternativa textual equivalente no Manual;
* legendas em português europeu quando existir fala ou informação sonora relevante.

## 8. Ordem recomendada de produção

### Vaga 1, PRD público

Prioridade:

1. D03;
2. D14;
3. D08 público;
4. D02 público;
5. D05 consulta;
6. D09 consulta;
7. D12 público;
8. D01 público.

### Vaga 2, PRD autenticado

Executar apenas depois dos Test Cases activos de `docs/PRD_TEST_PLAN.md`:

1. D02 + D13;
2. D04;
3. D08;
4. D09;
5. D10;
6. D12;
7. D05 operações de recursos;
8. D01 primeiro acesso controlado.

### Vaga 3, suspensos

Só iniciar após nova evidência de integração em PRD:

* D06;
* D07;
* D11;
* CM.

## 9. Critério de fecho

A frente de media só está fechada quando cada uma das 95 fichas possui:

* media validado, quando o media acrescenta valor real;
* ou decisão editorial explícita de que não necessita de imagem/vídeo;
* ou estado Suspenso documentado por dependência funcional ainda não integrada.

A existência de um placeholder “Imagem ou vídeo previsto” não constitui, por si só, media concluído.
