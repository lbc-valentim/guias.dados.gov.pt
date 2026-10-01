# Plano mínimo de validação autenticada em PRD

Última actualização: 22/09/2026

## 1. Objectivo

Executar apenas os testes autenticados que continuam necessários para fechar os Guias do Utilizador.

Este plano não repete validações já concluídas em GitHub Pages, API pública, Jira, documentação técnica ou revisão editorial.

Ambiente: **PRD**.

Regra: quando o comportamento observado em PRD divergir de requisito, backlog ou documentação futura, o Manual deve descrever **PRD como Implementação actual** e a divergência deve ser registada separadamente.

## 2. Regras de execução

### Fase A, leitura e navegação

Pode ser executada sem alterar dados do portal.

Inclui:

* consulta de páginas e áreas autenticadas;
* verificação de campos, permissões, estados e acções disponíveis;
* navegação por teclado;
* comparação entre perfis quando existirem contas de teste adequadas.

### Registo mínimo de evidência

Para cada execução da Fase A, registar juntamente com o resultado:

* data e ambiente observado, sempre PRD neste plano;
* perfil funcional utilizado, por exemplo Utilizador autenticado, Editor, Administrador da organização ou Administrador do portal, sem identificar a pessoa;
* conteúdo ou área consultada, usando apenas o identificador necessário para reproduzir a observação;
* resultado observado e diferença face ao Manual, quando existir;
* evidência suficiente para rastreabilidade, evitando dados pessoais ou informação sensível;
* decisão resultante: sem alteração, correcção editorial, Por confirmar ou reabertura de teste.

Quando um resultado variar por perfil, executar apenas os perfis necessários para demonstrar a diferença. Não transformar ausência de permissão num requisito global sem evidência adicional.

### Fase B, escrita controlada

**Não executar sem autorização explícita de escrita em PRD na conversa actual.**

Inclui:

* criar ou editar conteúdos;
* carregar/substituir ficheiros;
* publicar, arquivar, eliminar ou transferir;
* associar modelos;
* executar validações;
* aprovar/rejeitar Harvesters;
* criar/responder a Discussões;
* seguir/deixar de seguir;
* alterar membros, perfis, emblemas ou organizações.

Dados de teste, contas e conteúdos a utilizar: **Por confirmar** antes da execução da Fase B.

## 2.1 Estado operacional da Fase A

| TC | Área | Estado actual | Motivo |
| --- | --- | --- | --- |
| PRD-R01 | D02 + D13 | **Parcialmente executado** | Área pessoal e Atividades observadas; organização bloqueada pela conta sem organização disponível |
| PRD-R02 | D04 | **Parcialmente executado** | Formulário observado; ciclo de vida e transferência ainda por fechar |
| PRD-R03 | D05 | **Residual público** | Apenas TSV quando existir recurso real; não depende de sessão autenticada |
| PRD-R04 | D08 | **Parcialmente executado** | Elegibilidade e formulário observados; conta sem organização elegível impede restante fluxo |
| PRD-R05 | D09 | **Parcialmente executado** | Formulário e associação observados; edição/transferência ainda por fechar |
| PRD-R06 | D10 | **Parcialmente executado** | Wizard acessível; contexto de sistema indisponível para a conta actual |
| PRD-R07 | D12 | **Parcialmente executado** | Consulta, pesquisa, estados vazios e formulário de nova discussão observados; resposta/contexto de organização ainda pendentes |
| PRD-R08 | D07 + CM | **Suspenso** | Reabrir apenas quando Validador/Catálogo forem observáveis no stack PRD |
| PRD-R09 | D11 | **Suspenso** | Reabrir apenas quando a evolução Seguir/Notificações estiver integrada |
| PRD-R10 | D06 | **Suspenso** | Reabrir apenas quando o Explorador estiver integrado no Frontoffice PRD |

**Resumo:** 6 grupos activos com sessão autenticada, 1 residual público e 3 suspensos por ausência de integração actual.

## 2.2 Execução autenticada observada em PRD, 22/09/2026

Perfil funcional utilizado: **Utilizador autenticado, sem organização disponível no contexto observado e sem acesso à listagem de sistema de Harvesters**.

### PRD-R01, D02 + D13

Observado:

* `/pt/admin/me/profile` acessível;
* áreas pessoais visíveis: Conjunto de dados, API, Reutilizações, Recursos comunitários, Perfil e Estatísticas;
* aba **Atividades** acessível e com listagem estruturada por Utilizador, Acção e Data;
* `/pt/admin/org/profile` não abriu contexto de organização e regressou à área pessoal;
* no formulário de Conjunto de Dados, o PRD apresenta explicitamente **“Não pertence a uma organização”** para esta conta.

Decisão: perfil/área pessoal **confirmados**; membros, permissões e edição de Organização ficam **Por confirmar com conta adequada**. A ausência de organização nesta conta não é regra global do produto.

### PRD-R02, D04

Observado no passo 2 do formulário de Conjunto de Dados:

* campos obrigatórios identificados por asterisco;
* **Produtor*** obrigatório;
* para esta conta, nenhuma organização disponível como produtor;
* licença inicial apresentada como **“Licença não especificada”**;
* **Frequência de actualização*** obrigatória, inicialmente sem valor seleccionado, com placeholder;
* listagem pessoal de Conjuntos de Dados acessível, incluindo estado e acções por item.

Decisão: formulário e defaults **confirmados**. Ponto de contacto para produtor Organização, estados Arquivado/Eliminado, transferência e restantes acções de ciclo de vida continuam **Por confirmar**.

### PRD-R04, D08

Observado:

* wizard de API acessível em `/pt/admin/dataservices/new?step=1`;
* PRD apresenta a regra: só é possível publicar API em nome de uma organização com emblema **“Serviço público”**;
* a conta actual é informada como não pertencendo a organização elegível e não pode criar API;
* **Nome da API*** e **Descrição*** aparecem como obrigatórios no ecrã observado.

Decisão: restrição de elegibilidade **confirmada no PRD actual**. Tipos de acesso, associação de Conjuntos de Dados e edição de API existente ficam **Por confirmar com organização elegível/API gerível**.

### PRD-R05, D09

Observado:

* wizard de Reutilização acessível;
* produtor pessoal seleccionado para esta conta;
* ausência de organização explicitamente indicada;
* **Nome da reutilização***, URL da reutilização e **Tipo*** aparecem no passo inicial;
* passo 2 acessível directamente em leitura;
* PRD apresenta duas alternativas de associação: Conjuntos de Dados do portal **ou** links externos, não as duas na mesma Reutilização;
* nos links externos, **Título** e **Descrição** aparecem explicitamente como **opcionais**.

Decisão: formulário e regra de associação **confirmados**. Edição existente, estado persistido e transferência continuam **Por confirmar**.

### PRD-R06, D10

Observado:

* `/pt/admin/harvesters/new` acessível e reconhecido pelo browser como **Criar harvester**;
* tentativa de abrir `/pt/admin/system/harvesters` regressou à área pessoal de Conjuntos de Dados.

Decisão: acesso ao wizard **confirmado**; administração de sistema, comparação entre perfis, preview e Trabalhos ficam **Por confirmar com perfil/fonte adequados**.

### PRD-R07, D12

Observado em PRD autenticado:

* Conjunto de Dados real com discussão existente aberto directamente no separador Discussões;
* separador **Discussões (1)**, pesquisa e acção **Nova discussão** visíveis;
* pesquisa por termo existente mantém a conversa correspondente;
* pesquisa por termo sem correspondência remove a conversa da lista; na área observada, o contador visível manteve o total do conteúdo e não foi apresentada mensagem textual específica de “sem resultados”;
* Reutilização pública sem conversas apresenta separador **Discussões**, contador **0 DISCUSSÃO**, pesquisa, **Nova discussão** e estado vazio **“Sem discussões”**;
* API pública sem conversas apresenta separador **Discussões (0)**; o parâmetro `?tab=discussions` não activou visualmente o separador e foi necessário seleccioná-lo;
* no formulário de **Nova discussão**, **Título*** e **A sua mensagem*** são obrigatórios;
* o campo de mensagem apresenta orientação para manter cordialidade e evitar informação pessoal;
* o botão **Enviar** permanece desactivado com o formulário vazio.

Decisão: consulta autenticada, pesquisa, estado vazio e formulário de criação **confirmados**. Resposta a conversa existente, contexto de organização e submissão permanecem **Por confirmar**; nenhuma mensagem foi criada.

### Limitações desta execução

* nenhuma escrita foi efectuada em PRD;
* não foram criados, editados, publicados, eliminados ou transferidos conteúdos;
* não foram alterados Favoritos, Discussões, membros ou notificações;
* navegação por teclado foi utilizada como meio técnico de acesso, mas a ronda formal de acessibilidade/ordem de foco continua separada e pendente;
* PRD-R07 não recebeu nova evidência autenticada suficiente nesta passagem.

## 3. Test Cases, Fase A

### PRD-R01, Perfil e Organizações

**Rastreabilidade:** D02, D13; LEDG-2113, LEDG-1941, LEDG-1943, LEDG-2468, LEDG-2483.

**Summary:** confirmar acesso autenticado a perfis e diferenças de visibilidade/permissão entre área pessoal e organização.

**Preconditions:**

* sessão PRD autenticada;
* utilizador com acesso a Meu perfil;
* quando possível, utilizador membro de uma organização;
* segundo perfil com permissões superiores, se disponível.

| Step | Action | Input | Expected Result |
| ---: | --- | --- | --- |
| 1 | Abrir o perfil de outro utilizador | Perfil existente | O perfil é acessível após autenticação e apresenta apenas os campos actualmente disponíveis |
| 2 | Abrir Meu perfil | Nenhum | São apresentadas as áreas actualmente disponíveis para a conta |
| 3 | Abrir Conjuntos de Dados, API, Reutilizações e Recursos comunitários | Nenhum | Registar quais áreas existem, conteúdos e ordenação actualmente disponibilizados |
| 4 | Abrir Actividade | Nenhum | São apresentados os registos actuais; não assumir pesquisa textual se não existir |
| 5 | Abrir uma organização onde o utilizador é membro | Organização disponível | São apresentadas apenas as acções permitidas ao perfil |
| 6 | Abrir Membros | Nenhum | Registar pedidos, convites, membros e acções actualmente visíveis |
| 7 | Abrir edição da organização | Nenhum | Registar campos editáveis e presença/ausência da secção Emblemas |
| 8 | Repetir a navegação por teclado | Tab, Shift+Tab, Enter, Esc | Foco visível, ordem coerente, labels e controlos operáveis |

### PRD-R02, Conjuntos de Dados e ciclo de vida

**Rastreabilidade:** D04; LEDG-2046, LEDG-2048, LEDG-2175.

**Summary:** confirmar interface actual de criação/edição e disponibilidade das acções de ciclo de vida sem executar alterações.

**Preconditions:**

* sessão PRD autenticada;
* acesso a pelo menos um Conjunto de Dados gerível;
* quando possível, exemplos nos estados Rascunho, Público, Arquivado ou Eliminado.

| Step | Action | Input | Expected Result |
| ---: | --- | --- | --- |
| 1 | Abrir a criação de Conjunto de Dados | Nenhum | Registar campos, obrigatoriedade visual, licença inicialmente apresentada e ponto de contacto |
| 2 | Abrir um Rascunho existente | Nenhum | Registar metadados em falta e acções disponíveis |
| 3 | Abrir um Conjunto de Dados Público | Nenhum | Registar acções de edição, arquivo, transferência e eliminação conforme o perfil |
| 4 | Abrir um Arquivado | Nenhum | Confirmar visibilidade e acções actualmente disponíveis |
| 5 | Abrir filtro Eliminados com perfil autorizado | Nenhum | Confirmar consulta disponível e ausência/presença de acção de recuperação |
| 6 | Abrir Transferir sem submeter | Nenhum | Confirmar destinatários possíveis, comentário e estado inicial do pedido |
| 7 | Navegar pelos fluxos com teclado | Tab, Shift+Tab, Esc | Foco, labels, estados e modais são operáveis |

### PRD-R03, Recursos e pré-visualização residual

**Rastreabilidade:** D05.

**Summary:** executar apenas a observação residual que ainda não foi fechada por evidência pública.

**Preconditions:**

* recurso TSV público existente, se vier a estar disponível.

| Step | Action | Input | Expected Result |
| ---: | --- | --- | --- |
| 1 | Procurar recurso TSV real em PRD | Nenhum | Se não existir recurso adequado, manter apenas suporte técnico confirmado e não inventar resultado de preview |
| 2 | Quando existir recurso TSV, abrir a Pré-visualização | Recurso TSV | Registar se o proxy/UI apresenta dados tabulares correctamente |

**Nota:** CSV, XLS, XLSX e ODS já foram validados directamente pelos proxies de PRD. SVG/HTML já foram confirmados como ausentes da lista de extensões permitidas. A integridade após upload/substituição pertence à Fase B porque exige escrita.

### PRD-R04, APIs e serviços de dados

**Rastreabilidade:** D08.

**Summary:** confirmar elegibilidade para criação, campos e tipos de acesso sem gravar.

**Preconditions:**

* sessão PRD autenticada;
* quando possível, conta membro de organização com emblema Serviço público;
* conta sem organização elegível para comparação, se disponível.

| Step | Action | Input | Expected Result |
| ---: | --- | --- | --- |
| 1 | Abrir criação de API com organização elegível | Nenhum | Organização pode ser seleccionada como produtor e formulário pode avançar |
| 2 | Abrir criação sem organização elegível | Nenhum | Registar exactamente a restrição ou mensagem apresentada |
| 3 | Rever tipos de acesso | Nenhum | Registar opções actualmente apresentadas |
| 4 | Rever associação a Conjuntos de Dados | Nenhum | Confirmar se a associação é apresentada como opcional |
| 5 | Abrir uma API existente em edição sem guardar | API gerível | Registar campos e associações actualmente editáveis |
| 6 | Navegar por teclado | Tab, Shift+Tab | Foco, labels e mensagens são operáveis |

### PRD-R05, Reutilizações

**Rastreabilidade:** D09; LEDG-2520.

**Summary:** confirmar formulário, associações e indisponibilidade actual da transferência sem gravar.

**Preconditions:**

* sessão PRD autenticada;
* reutilização gerível existente, quando disponível.

| Step | Action | Input | Expected Result |
| ---: | --- | --- | --- |
| 1 | Abrir criação de Reutilização | Nenhum | Registar campos, produtor, tipo, tema e estado inicial apresentados |
| 2 | Abrir passo de associação de dados | Nenhum | São apresentadas opções para dados do portal ou links externos |
| 3 | Rever campos de link externo | Nenhum | Título e descrição são ou não obrigatórios conforme PRD |
| 4 | Abrir reutilização existente em edição | Reutilização existente | Links e associações actuais são apresentados |
| 5 | Procurar acção de transferência | Nenhum | Registar disponibilidade real; não antecipar LEDG-2520 |
| 6 | Navegar por teclado | Tab, Shift+Tab | Foco, labels e controlos são operáveis |

### PRD-R06, Harvester

**Rastreabilidade:** D10; LEDG-2323, LEDG-2296, LEDG-2298.

**Summary:** confirmar matriz real de campos, preview e trabalhos sem alterar configuração.

**Preconditions:**

* sessão PRD autenticada;
* fonte Harvester existente;
* perfis distintos quando disponíveis.

| Step | Action | Input | Expected Result |
| ---: | --- | --- | --- |
| 1 | Abrir fonte como perfil de consulta/Editor | Fonte existente | Registar campos visíveis e modo de leitura |
| 2 | Abrir como Administrador da organização | Mesma fonte | Registar exactamente os campos editáveis |
| 3 | Abrir como Administrador do portal | Mesma fonte | Registar campos avançados efectivamente disponíveis |
| 4 | Executar preview apenas se não persistir alterações | Configuração vigente | Resultado é apresentado sem alteração persistente da fonte |
| 5 | Abrir Trabalhos e um detalhe | Trabalho existente | Registar estados, itens, paginação e linhas por página |
| 6 | Navegar por teclado | Tab, Shift+Tab, Esc | Foco, labels, modais e estados são operáveis |

### PRD-R07, Discussões

**Rastreabilidade:** D12; LEDG-2390, LEDG-2391.

**Summary:** confirmar disponibilidade das Discussões no contexto autenticado sem criar mensagens.

**Preconditions:**

* sessão PRD autenticada;
* conteúdo com Discussões existentes, quando possível.

| Step | Action | Input | Expected Result |
| ---: | --- | --- | --- |
| 1 | Abrir Discussões num Conjunto de Dados | Conteúdo existente | Conversas são apresentadas no contexto correcto |
| 2 | Abrir Discussões numa Reutilização | Conteúdo existente | Registar disponibilidade e estado vazio/conversas |
| 3 | Abrir Discussões numa API | Conteúdo existente | Registar disponibilidade e estado vazio/conversas |
| 4 | Abrir Discussões de uma organização | Organização existente | Registar agregação actualmente apresentada |
| 5 | Pesquisar uma discussão | Termo conhecido | Resultados e estado sem resultados correspondem ao PRD |
| 6 | Navegar por teclado | Tab, Shift+Tab | Foco e controlos são operáveis |

### PRD-R08, Validador e Catálogo de Modelos após integração

**Rastreabilidade:** D07, CM; LEDG-2031, LEDG-2049.

**Summary:** revalidar a disponibilidade apenas após existir evidência de integração no PRD. No estado actual, frontend/backend/Swagger públicos não expõem o novo Validador nem o novo Catálogo.

**Preconditions:**

* sessão PRD autenticada;
* Editor e/ou Administrador autorizado, se disponíveis.

| Step | Action | Input | Expected Result |
| ---: | --- | --- | --- |
| 1 | Confirmar que existe nova rota/área de Validação ou Catálogo em PRD | Nenhum | Se continuar ausente, terminar o TC e manter D07/CM bloqueados para publicação actual |
| 2 | Confirmar que o Swagger/API PRD expõe contratos do novo domínio | Nenhum | Endpoints/propriedades correspondem ao Validador/Catálogo e não ao schema legado/Harvester |
| 3 | Apenas após 1 e 2, abrir gestão de recurso CSV | Recurso elegível | Área de validação existe e apresenta o estado actual aplicável |
| 4 | Apenas após 1 e 2, abrir Catálogo como Editor e Administrador | Nenhum | Registar área, modelos e diferenças reais de permissões |
| 5 | Navegar por teclado | Tab, Shift+Tab | Foco, nomes acessíveis e estados são perceptíveis |

### PRD-R09, Favoritos e Notificações

**Rastreabilidade:** D11; LEDG-2289, LEDG-1960, LEDG-2305.

**Summary:** confirmar a relação de Favoritos e a área de Notificações actualmente disponíveis, sem antecipar a futura evolução para Seguir.

**Preconditions:**

* sessão PRD autenticada;
* conteúdos dos quatro tipos disponíveis;
* notificações existentes na conta, se aplicável.

| Step | Action | Input | Expected Result |
| ---: | --- | --- | --- |
| 1 | Abrir Organização | Conteúdo existente | A acção apresentada corresponde a Adicionar aos favoritos ou Remover dos favoritos |
| 2 | Abrir Conjunto de Dados | Conteúdo existente | A terminologia actual é Favoritos |
| 3 | Abrir Reutilização | Conteúdo existente | A terminologia actual é Favoritos |
| 4 | Abrir API | Conteúdo existente | A terminologia actual é Favoritos |
| 5 | Abrir Notificações | Nenhum | Registar tipos, conteúdo, ligações e estado lido/não lido |
| 6 | Abrir aviso de Harvester, se existir | Notificação existente | Ligação encaminha para a fonte e marcar como lido permanece distinto da decisão |
| 7 | Confirmar ausência de relação automática documentável entre Favoritos e Notificações | Nenhum | Não existe no PRD observado uma promessa de notificação apenas por adicionar aos favoritos |
| 8 | Navegar por teclado | Tab, Shift+Tab | Foco, nomes e estados são perceptíveis |

**Nota:** adicionar/remover Favoritos altera dados da conta. Executar esses passos apenas na Fase B, após autorização explícita.


### PRD-R10, Explorador, suspenso até integração

**Rastreabilidade:** D06; LEDG-2199, LEDG-2276.

**Summary:** não executar enquanto o CTA/rota do Explorador continuar ausente do Frontoffice público de PRD. Reabrir apenas após evidência de integração.

**Preconditions:**

* recurso tabular elegível existente.

| Step | Action | Input | Expected Result |
| ---: | --- | --- | --- |
| 1 | Abrir o recurso no Frontoffice | Recurso elegível | Registar presença/ausência de Explorar dados |
| 2 | Abrir Explorar dados, se disponível | Nenhum | São apresentadas Dados, Estrutura, Métricas e Gráfico |
| 3 | Se indisponível, terminar o TC | Nenhum | D06 permanece Por confirmar em PRD, sem testar comportamento futuro |

## 4. Test Cases, Fase B

Os TCs abaixo alteram dados. **Não executar sem autorização explícita adicional.**

### PRD-W01, Ciclo de vida e transferência de Conjunto de Dados

**Rastreabilidade:** D04; LEDG-2046, LEDG-2048, LEDG-2175.

**Summary:** validar comportamento real de rascunho, publicação, edição, arquivo, transferência e eliminação com conteúdo de teste.

**Preconditions:**

* autorização explícita de escrita em PRD;
* conteúdo de teste autorizado;
* perfis necessários disponíveis;
* destinatário de transferência autorizado, quando aplicável.

**Inputs:** valores fictícios sem dados pessoais reais; destinatário e organização Por confirmar.

**Expected Result global:** apenas comportamentos observados em PRD são incorporados no Manual; qualquer divergência é registada.

### PRD-W02, Upload e substituição de recurso

**Rastreabilidade:** D05.

**Summary:** validar integridade de upload/substituição, SVG/HTML e estados do recurso.

**Preconditions:**

* autorização explícita de escrita em PRD;
* Conjunto de Dados de teste;
* ficheiros de teste autorizados.

**Inputs:** ficheiro superior a 1 MB; SVG; HTML; formatos tabulares aplicáveis.

**Expected Result global:** ficheiro descarregado corresponde ao original; aceitação/rejeição de formatos e mensagens são registadas exactamente como PRD.

### PRD-W03, Gestão de API e Reutilização

**Rastreabilidade:** D08, D09.

**Summary:** validar criação, rascunho/publicação, edição e associações.

**Preconditions:**

* autorização explícita de escrita em PRD;
* produtores/organizações de teste autorizados.

**Expected Result global:** campos, validações, estados e persistência são documentados a partir do comportamento real.

### PRD-W04, Harvester

**Rastreabilidade:** D10.

**Summary:** validar edição, filtros e decisões administrativas numa fonte de teste.

**Preconditions:**

* autorização explícita de escrita em PRD;
* fonte de teste;
* perfis necessários.

**Expected Result global:** permissões, persistência, preview, aprovação/rejeição e mensagens correspondem ao PRD.

### PRD-W05, Discussões e participação

**Rastreabilidade:** D12.

**Summary:** validar criação e resposta a Discussões sem utilizar conteúdos produtivos sensíveis.

**Preconditions:**

* autorização explícita de escrita em PRD;
* conteúdo de teste autorizado.

**Expected Result global:** nova discussão/resposta aparece uma única vez e no contexto correcto.

### PRD-W06, Validador e Catálogo de Modelos

**Rastreabilidade:** D07, CM.

**Summary:** validar associação, execução, histórico, inferência, versionamento e ciclo de vida com dados de teste.

**Preconditions:**

* autorização explícita de escrita em PRD;
* recurso e modelo de teste;
* perfis autorizados.

**Expected Result global:** estados, mensagens, limites e permissões são os observados em PRD.

### PRD-W07, Seguir e Notificações

**Rastreabilidade:** D11.

**Summary:** validar relação Seguir/Deixar de seguir e eventos associados apenas quando a evolução estiver disponível.

**Preconditions:**

* autorização explícita de escrita em PRD;
* LEDG-1960/2305 reflectidas em PRD;
* conteúdos de teste adequados.

**Expected Result global:** terminologia, persistência e notificações correspondem exactamente à implementação actual.

## 5. Critério de fecho

Um guia pendente pode ser promovido de estado apenas quando:

1. os TCs de leitura aplicáveis foram executados;
2. os TCs de escrita necessários foram autorizados e executados, quando indispensáveis;
3. resultados foram registados em `docs/CONTENT_VALIDATION.md`;
4. conteúdo editorial foi sincronizado a partir de `content/guides.json`;
5. CI de consistência permanece verde;
6. PDFs foram regenerados quando o conteúdo fonte mudou;
7. não subsistem afirmações baseadas apenas em backlog ou comportamento futuro.
