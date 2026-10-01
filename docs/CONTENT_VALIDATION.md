# Validação de conteúdo dos Guias do Utilizador

Última validação: 22/09/2026

## 1. Objectivo

Este documento controla a validação funcional e editorial dos 15 guias e 95 fichas existentes na branch `feature/static-routes-pdf`.

Não substitui Requirements, User Stories, critérios de aceitação, Figma aprovado, Jira, documentação técnica nem evidência de testes.

### Regra de fallback para informação não confirmada

Quando uma regra, permissão, validação, mensagem, limite ou comportamento não estiver confirmado por fonte funcional aprovada, o guia deve usar apenas o comportamento observado e reproduzível em **PRD**.

Esse comportamento deve ser tratado como **Implementação actual**, não como Requisito.

Não antecipar backlog, Figma futuro, proposta funcional ou comportamento esperado.

Os estados usados são:

* **Validado no âmbito actual**: o conteúdo principal está suportado pelas fontes consultadas para o comportamento actualmente documentado. Pode continuar a exigir revisão visual, acessibilidade ou nova validação quando a funcionalidade evoluir.
* **Parcialmente validado**: existe base suficiente para manter o guia, mas há regras, permissões, estados, mensagens ou comportamentos específicos que ainda precisam de confirmação.
* **Por confirmar**: não existe evidência suficiente para tratar o conteúdo como orientação definitiva.

## 2. Baseline editorial analisada

A colecção actualmente publicada na branch contém:

| Indicador | Estado |
| --- | ---: |
| Guias | 15 |
| Fichas | 95 |
| Temas | 7 |
| PDFs | 15 |
| Entradas no índice de pesquisa | 95 |
| URLs no sitemap | 118 |

A fonte editorial utilizada na geração PDF v2 foi preservada no histórico Git no commit `9f420bf7bb0811ac809d416dd1a5f051e92cf581`, em `.pdfv2_tmp/conteudo_revisado.json`.

Esta fonte contém os 15 guias e as 95 fichas, incluindo sete fichas em D13 e sete fichas em D14.

## 2.1 Decisão de âmbito da release v0.5.0, 23/09/2026

A release v0.5.0 foi integrada em `main` pelo PR #5 em 23/09/2026 com o conteúdo consolidado dos 15 guias e 95 fichas. O merge da release corresponde ao commit `260034099ae643c4ee06139671ab5ad8ecd0a82c`.

Esta decisão é uma **decisão de release** e não altera a classificação funcional das áreas ainda não observáveis ou não integradas:

* D06 permanece não integrado no Frontoffice actual observado;
* D07 permanece não observável nas superfícies analisadas;
* CM permanece não observável nas superfícies analisadas;
* a validação manual final com NVDA e a revisão visual e documental detalhada dos PDFs transitam para a release seguinte.

Os guias destas áreas permanecem como conteúdo preparado no protótipo e não devem ser interpretados como prova de disponibilidade actual no portal.

A release mantém a natureza de **baseline de demonstração e revisão**. A publicação oficial no dados.gov.pt continua dependente da integração no produto e das validações aplicáveis ao contexto final.

## 3. Validação dos PDFs

### Evidência confirmada

O workflow GitHub Actions `Instalar PDFs v2`, execução `35712017540`, terminou com sucesso.

A geração utilizou:

* WeasyPrint 68.0;
* pypdf 5.9.0;
* `pdf_tags=True`;
* sRGB;
* fonte Inter instalada no runner.

O QA automatizado da geração confirmou:

* 15 guias processados;
* 15 PDFs públicos gerados;
* pelo menos uma página em cada PDF;
* ficheiros superiores a 50 KB;
* ausência de itens editoriais em falta relativamente à fonte usada na geração.

Mensagem final do QA:

`QA PDF v2: 15/15 ficheiros válidos; conteúdo editorial sem omissões.`


### Validação directa dos PDFs publicados

Em 22/09/2026, os 15 PDFs publicados no GitHub Pages foram lidos directamente através do Remote Desktop Commander.

Resultado:

| PDF | Páginas | Fichas esperadas | Fichas detectadas |
| --- | ---: | ---: | ---: |
| Autenticação e acesso à conta | 9 | 6 | 6 |
| Organizações e permissões | 8 | 6 | 6 |
| Encontrar e consultar dados | 7 | 5 | 5 |
| Publicar e gerir Conjuntos de Dados | 9 | 7 | 7 |
| Recursos de um Conjunto de Dados | 9 | 6 | 6 |
| Explorador de dados | 13 | 8 | 8 |
| Qualidade e validação de dados | 9 | 6 | 6 |
| APIs e serviços de dados | 9 | 6 | 6 |
| Reutilizações | 8 | 6 | 6 |
| Harvester | 9 | 6 | 6 |
| Seguir conteúdos e notificações | 7 | 5 | 5 |
| Discussões e comunidade | 8 | 5 | 5 |
| Perfil e actividade | 8 | 7 | 7 |
| Ajuda e contactos | 9 | 7 | 7 |
| Catálogo de Modelos | 12 | 9 | 9 |

Para os 15 PDFs foi confirmado:

* presença da Visão geral;
* presença do fecho do guia;
* sequência completa das tarefas de 1 até N;
* denominador das tarefas coerente com o número esperado;
* ausência de `undefined`;
* ausência das formulações antigas corrigidas em D04, D09 e D13;
* D13 contém 7 fichas e D14 contém 7 fichas, incluindo as três fichas acrescentadas em 23/09/2026.

A leitura directa confirma conteúdo e paginação lógica, mas não substitui a inspecção visual pixel a pixel.

### Limitação de acessibilidade PDF

Foram tentadas duas vias adicionais:

* abertura/captura pelo navegador web da sessão, indisponível para estes PDFs;
* árvore de acessibilidade do Edge headless, que expõe o PDF apenas como `EmbeddedObject` sem estrutura interna.

Assim, permanecem **Por confirmar** antes de publicação oficial:

* cortes/overlaps apenas detectáveis visualmente no PDF renderizado;
* ordem de leitura real no PDF;
* qualidade da árvore de tags;
* headings e listas expostos a leitores de ecrã;
* texto alternativo de elementos gráficos na árvore PDF;
* comportamento com leitor de ecrã num visualizador compatível.


### Limitação

**Por confirmar:** qualidade visual página a página, cortes, quebras inadequadas, sobreposições, qualidade real da árvore de tags, ordem de leitura, bookmarks e restante acessibilidade documental.

O conector GitHub disponível nesta sessão permite validar os ficheiros e o processo de geração, mas não disponibiliza os bytes dos PDFs para renderização visual. Não considerar estes pontos como aprovados apenas com base no QA estrutural.

## 4. Divergência entre fontes editoriais

Foi detectada uma diferença de maturidade entre a fonte que gerou as rotas estáticas/PDFs e a aplicação dinâmica v0.4.

### Implementação

A aplicação dinâmica carrega:

* `assets/js/data.js`;
* `assets/js/data-d01.js`, que regista D01 em execução.

### Achado

A fonte usada para os PDFs e rotas estáticas contém revisões posteriores que não estão integralmente reflectidas em `assets/js/data.js`.

Diferenças identificadas:

* D03, D04, D05, D07 e D09 incluem ligações de recursos na fonte PDF que não existem no objecto dinâmico equivalente;
* D08 possui diferenças substantivas na ficha `Consultar a referência da API do portal`;
* D14 possui diferenças substantivas em percursos de Discussões e no encaminhamento de problemas técnicos;
* D01 é modularizado separadamente e não constitui ausência de conteúdo.

### Risco

Uma mesma tarefa pode apresentar texto diferente consoante o utilizador navegue na experiência dinâmica ou numa rota estática.

### Recomendação

Não copiar automaticamente uma fonte sobre a outra. Rever as diferenças D08 e D14 contra as fontes funcionais aplicáveis e, depois da decisão, estabelecer uma única fonte editorial versionada capaz de gerar experiência web, pesquisa, sitemap e PDFs.


## 4.1 Expansão validada em 23/09/2026

A expansão aprovada acrescenta três fichas: duas em D13 e uma em D14. A consistência técnica é verificada no mesmo workflow que publica a alteração, com contrato de **15 guias, 95 fichas, 95 entradas de pesquisa, 118 rotas e 15 PDFs**.

A nova ficha de Feedback é suportada por LEDG-1422 e LEDG-1656 e foi observada no PPR. As novas fichas de D13 correspondem a capacidades observadas no perfil autenticado do PPR. A equivalência final com PRD deve ser novamente confirmada antes da publicação oficial dos Guides.

## 5. Matriz das 15 áreas

| Código interno | Guia | Fichas | Estado | Evidência principal | Pendências para fecho |
| --- | --- | ---: | --- | --- | --- |
| D01 | Autenticação e acesso à conta | 6 | **Validado no âmbito actual** | PRD público confirma CMD, eIDAS, E-mail e palavra-passe para utilizadores antigos e recuperação; conteúdo de primeiro acesso foi neutralizado para seguir apenas os passos apresentados pelo portal | Não documentar mecanismo exacto de migração/associação enquanto continuar em evolução; revalidar após alterações de LEDG-2357/fluxos relacionados |
| D02 | Organizações e permissões | 6 | **Parcialmente validado** | Pesquisa pública por nome/sigla e emblemas confirmados em PRD; LEDG-1941/1943/1919 suportam edição e gestão de emblemas; fluxos autenticados de membros estão em evolução | Consulta pública sustentada; criar/integrar/gerir membros/editar e emblemas administrativos devem ser confirmados em PRD autenticado, sem antecipar LEDG-2468/2483 |
| D03 | Encontrar e consultar dados | 5 | **Validado no âmbito actual** | Percurso público simples e orientado a pesquisa, filtros, consulta e acesso aos dados | Revisão final de terminologia/UI e capturas; manter coerência com a pesquisa publicada |
| D04 | Publicar e gerir Conjuntos de Dados | 7 | **Parcialmente validado** | LEDG-2046 e LEDG-2191 em IN UAT; LEDG-2048 READY FOR UAT; Swagger PRD e frontend actual confirmam divergência de licença/contacto face ao requisito alvo | Pendente essencialmente validação autenticada da UI de criação/ciclo de vida/transferência; manter redacção neutra até LEDG-2175 chegar a PRD |
| D05 | Recursos de um Conjunto de Dados | 6 | **Parcialmente validado** | LEDG-2047 em IN UAT; PRD confirma exclusão de SVG/HTML e preview activo para CSV/XLS/XLSX/ODS; TSV suportado em código sem amostra pública encontrada | Pendente: regressão autenticada de integridade upload/substituição, TSV com recurso real e estados/mensagens autenticados quando aplicável |
| D06 | Explorador de dados | 8 | **Não integrado no Frontoffice público de PRD** | CTA `Explore os dados` existe mas está oculto; sem rota pública do Explorador; recurso CSV real em PRD não expôs a acção | Não publicar como comportamento actual. Revalidar apenas quando existir integração pública reproduzível em PRD |
| D07 | Qualidade e validação de dados | 6 | **Não observável no stack público actual de PRD** | LEDG-2031 em READY FOR TESTING; frontend/backend `main` sem rotas/módulos específicos; Swagger PRD sem endpoints/propriedades do novo Validador | Não publicar como comportamento actual. Revalidar quando existir integração PRD observável; ausência pública não prova inexistência de componente privado/separado |
| D08 | APIs e serviços de dados | 6 | **Parcialmente validado** | Referência, tutorial e catálogo público validados directamente em PRD em 22/09/2026; implementação actual do frontend contém gating por organização com emblema `public-service` | Fichas públicas sustentadas; criação, publicação e edição devem ser confirmadas numa sessão autenticada de PRD antes de serem tratadas como comportamento actual |
| D09 | Reutilizações | 6 | **Parcialmente validado** | Consulta pública confirmada em PRD; frontend actual sustenta validações de criação e associação; LEDG-2520 confirma que transferência de reutilização não está exposta no ecrã | Não orientar o utilizador para transferência enquanto o botão permanecer desligado; criação, publicação e edição devem ser confirmadas em sessão PRD autenticada |
| D10 | Harvester | 6 | **Parcialmente validado** | API pública de PRD confirma 15 backends habilitados, 42 fontes, metadados de configuração, trabalhos e estados de validação; LEDG-2323 fecha a política de preview; frontend actual implementa separação de edição por perfil | Fluxos autenticados de edição, preview, trabalhos e aprovação/rejeição devem ser confirmados em PRD; não documentar particularidades de backends ainda em READY FOR TESTING |
| D11 | Favoritos e notificações | 5 | **Parcialmente validado** | PRD revalidado em 22/09/2026 apresenta `Adicionar aos favoritos`/`Remover dos favoritos` em Organização, Conjunto de Dados, Reutilização e API; notificações existentes são independentes desta relação | Fichas de Favoritos alinhadas ao PRD actual. Percurso autenticado de Notificações permanece a confirmar; não afirmar que Favoritos gera notificações |
| D12 | Discussões e comunidade | 5 | **Parcialmente validado** | Discussões públicas confirmadas na API de PRD, incluindo 7 conversas num dataset real e URL directa para `?tab=discussions`; frontend actual suporta datasets, reutilizações, APIs e contexto de organização | Consulta pública sustentada; criação/resposta/contexto administrativo requerem sessão PRD; não prometer fiabilidade total dos emails enquanto LEDG-2390/2391 estiverem abertos |
| D13 | Perfil e actividade | 7 | **Parcialmente validado** | LEDG-2113 e PRD confirmam autenticação obrigatória; correcção editorial de actor/título/data de registo já aplicada e sincronizada | Pendente apenas validação autenticada das áreas pessoais, campos editáveis, actividade e diferenças de visibilidade/permissão |
| D14 | Ajuda e contactos | 7 | **Parcialmente validado após expansão** | LEDG-2475 Done; submissão em PPR já validada; sexta ficha recuperada e sincronizada | Não prometer confirmação automática por email enquanto LEDG-2029 estiver To Do; manter funcionalidades futuras de certificação/emblemas fora do percurso actual |
| CM | Catálogo de Modelos | 9 | **Não observável no stack público actual de PRD** | LEDG-2049 em IN UAT; frontend/backend `main` sem rota/módulo do novo Catálogo; Swagger PRD sem endpoints equivalentes | Não publicar como comportamento actual. Revalidar após integração PRD observável; distinguir explicitamente o endpoint legado `/datasets/schemas/` do novo Catálogo |

## 5.1 Revalidação D01, Autenticação e acesso à conta

Data da revisão: 23/09/2026.

### Evidência actual de PRD

A página pública de autenticação em PRD contém actualmente:

* **Chave Móvel Digital (CMD)**;
* **Autenticação europeia (eIDAS)**;
* **E-mail e palavra-passe**;
* opção de recuperação da palavra-passe.

O conteúdo actual da própria interface indica que o acesso por email e palavra-passe se destina a **utilizadores antigos**.

A recuperação de palavra-passe continua implementada através de pedido por email e apresenta resposta genérica para não revelar se o endereço está associado a uma conta.

### Migração e primeiro acesso

A implementação e os tickets demonstram que os percursos de migração/associação continuam a evoluir.

A LEDG-2357 encontra-se em **READY FOR UAT** e pretende substituir a prova por código de 6 dígitos por validação através de link de email no fluxo de associação de conta legada.

Por isso, o Manual não deve fixar como comportamento actual um mecanismo concreto de código, link ou ecrã intermédio que não tenha sido reproduzido em PRD.

A ficha foi revista para indicar apenas:

1. concluir CMD/eIDAS;
2. observar se o portal apresenta passos adicionais;
3. seguir os campos, mensagens e método de validação efectivamente apresentados;
4. não partilhar códigos, links, palavras-passe ou outros segredos.

### Ajuste editorial de 23/09/2026

Foi removida a instrução que pressupunha uma escolha explícita entre associar uma conta existente e criar uma nova conta. A ficha passa a orientar a confirmação ou indicação do endereço de email e a consulta da mensagem de validação quando esse percurso for apresentado, mantendo a formulação condicional para não transformar uma implementação em regra universal. Foi também removida da ficha de login por email e palavra-passe a referência ao ambiente PRD e clarificado o encaminhamento para conclusão, migração ou associação da conta quando aplicável.

### Decisão editorial

Foi removida a dependência textual de “comportamento alvo validado em TST”.

O D01 permanece **Validado no âmbito actual** porque as capacidades públicas documentadas estão observáveis em PRD e os passos não observados foram deliberadamente generalizados para não antecipar implementação futura.

A URL histórica da antiga ficha **Concluir o primeiro acesso e confirmar o email** foi preservada para evitar quebra de ligações, embora o título editorial passe a **Concluir o primeiro acesso quando solicitado**.

## 6. Revisão profunda D04, Publicar e gerir Conjuntos de Dados

Data da revisão: 22/09/2026.

### Resultado

As sete fichas de D04 estão coerentes, no essencial, com a especificação funcional actual das LEDG-2046 e LEDG-2048.

### Confirmado pela LEDG-2046

* é permitido guardar Rascunho com metadados obrigatórios ainda em falta;
* a publicação exige os metadados obrigatórios no momento de publicar;
* a publicação é imediata e não tem circuito de revisão editorial;
* a ausência de recursos não bloqueia a publicação, com aviso aplicável;
* ausência de modelo, ausência de validação, Não conforme e Erro técnico não bloqueiam a publicação;
* alterações guardadas num Conjunto de Dados Público produzem efeito imediato;
* os estados são Rascunho, Público, Arquivado e Eliminado;
* Arquivado deixa de aparecer nas listagens públicas mas mantém o acesso aplicável por ligação directa;
* a eliminação é lógica e exclusiva de Administrador autorizado;
* Eliminado é irreversível no portal e não pode ser recuperado por qualquer perfil;
* o expurgo definitivo não é disponibilizado no portal e é uma operação de servidor.

A questão de recuperação que permanecia aberta na baseline de 13/08 fica, portanto, ultrapassada pela especificação actual da LEDG-2046.

### Confirmado pela LEDG-2048

* a transferência pode ter como destinatário um utilizador ou organização disponível;
* a submissão cria um pedido Pendente sem alterar a responsabilidade;
* o destinatário recebe email sobre o pedido;
* a aceitação altera a responsabilidade;
* a recusa mantém a responsabilidade;
* estado, metadados, recursos e histórico são preservados após aceitação;
* Arquivado e Eliminado não podem ser transferidos;
* o comentário é incluído quando exista;
* cancelar antes da submissão não cria pedido.

### Divergência requisito versus implementação

A LEDG-2046 define como comportamento alvo:

* `CC BY 4.0` como licença inicial, alterável;
* ponto de contacto opcional quando o produtor é uma organização.

A LEDG-2175 permanece em Backlog e descreve a situação de implementação que motivou estas alterações:

* a licença ainda necessita de melhoria para apresentar um valor por defeito;
* o ponto de contacto é actualmente obrigatório quando o produtor é uma organização.

**Conclusão:** estas duas regras são requisito alvo, não devem ser apresentadas como comportamento actual do portal até existir evidência de implementação/UAT.

### Estado D04

**Parcialmente validado.**

O conteúdo funcional das sete fichas está suficientemente sustentado para continuar no protótipo, mas a publicação oficial fica bloqueada até:

1. validar LEDG-2046 e LEDG-2048 em UAT;
2. confirmar o estado real da LEDG-2175;
3. corrigir ou condicionar no guia as afirmações sobre licença inicial e ponto de contacto;
4. validar mensagens, terminologia e interface final contra o Figma/implementação aplicável.

### Evidência técnica adicional D04, 22/09/2026

Foi aprofundada a divergência entre o requisito alvo da LEDG-2046 e a implementação actual disponível:

* LEDG-2046 passou para **IN UAT** em 22/09/2026;
* LEDG-2175 permanece **Backlog** e identifica como alterações ainda necessárias a licença por defeito e a opcionalidade do ponto de contacto;
* o Swagger actual de PRD define `Dataset.license` com `default: "notspecified"` e `license_title` com `License Not Specified`;
* o frontend `main` utiliza `notspecified` como valor inicial quando não existe licença guardada;
* a função `validateDatasetDetails` do frontend actual exige pelo menos um contacto guardado ou um contacto novo válido quando o produtor seleccionado é uma organização;
* no contrato API, `contact_points` não pertence à lista global de propriedades `required`, o que demonstra uma diferença entre validação de UI e contrato de persistência.

**Requisito alvo:** CC BY 4.0 inicial e ponto de contacto opcional.

**Implementação actual identificada:** licença inicialmente não especificada; a UI actual exige contacto para produtor Organização.

**Impacto editorial:** manter a redacção neutra já aplicada no Manual. Não afirmar CC BY 4.0 por defeito nem opcionalidade do contacto enquanto o comportamento PRD autenticado não reflectir a evolução da LEDG-2175.

O Swagger actual também expõe `archived` e `deleted` no Dataset, sendo `deleted` apenas leitura, e não contém endpoint `restore/recover/undelete`. A transferência dispõe de `/transfer/` e `/transfer/{id}/`, com estados `pending`, `accepted` e `refused`, coerentes com a LEDG-2048.

## 7. Revisão profunda D05, Recursos de um Conjunto de Dados

Data da revisão: 22/09/2026.

### Resultado

As seis fichas de D05 estão, no essencial, alinhadas com a LEDG-2047. A revisão independente do Conselho não identificou conflito funcional estrutural; concentrou a validação PRD nos pontos em que a evidência ainda não fecha o comportamento actual.

### Confirmado pela LEDG-2047

* Editor ou Administrador autorizado pode gerir recursos;
* cada ficheiro aceite num carregamento múltiplo origina um recurso autónomo;
* título, tipo e formato são obrigatórios e a descrição é opcional;
* tamanho e tipo MIME são preenchidos automaticamente quando disponíveis;
* recurso remoto utiliza URL e permanece Não aplicável para validação;
* alterar apenas metadados não inicia nem invalida a validação aplicável ao conteúdo vigente;
* em Conjunto de Dados Público, alterações concluídas com sucesso produzem efeito imediato;
* na substituição, Herdar modelo de validação é opcional e começa desmarcado;
* sem herança, recurso elegível fica Sem modelo;
* com herança, conserva a versão/configuração do modelo e fica Por validar;
* conteúdo não elegível fica Não aplicável;
* uma substituição falhada preserva o ficheiro e a informação vigente;
* remover exige confirmação;
* remover o último recurso não altera automaticamente o estado do Conjunto de Dados.

### Implementação observada em PRD

A evidência da LEDG-1997 regista promoção para produção do limite geral de **800 MB** e aumento do limite de XML para **100 MB**.

Em 22/09/2026, a API pública de PRD foi consultada e confirmou, entre outros elementos:

* existência de um recurso `gpkg.zip` com aproximadamente 670 MB;
* exposição de `filesize`, `mime`, `description`, `format` e tipo de recurso;
* recursos remotos WMS/WFS coexistem com ficheiros carregados;
* o frontend público disponibiliza a estrutura de separadores `Pré-visualização`, `Estrutura de dados`, `Metadados` e `Downloads`;
* o frontend de PRD contém a experiência textual `Explore os dados`.

Estas observações confirmam implementação existente, mas não substituem um teste autenticado às operações de gestão.

### Por confirmar em PRD

1. **SVG e HTML**: a evidência consultada não prova que ambos sejam actualmente rejeitados em PRD. A afirmação não deve ser publicada como facto até teste.
2. **Formatos de pré-visualização**: a ficha enumera CSV, TSV, XLS, XLSX e ODS. A LEDG-2254 alterou o preview para a Tabular API, pelo que a lista deve ser verificada no comportamento actual de PRD antes de ser fechada.
3. **Explorar dados**: existe implementação textual no frontend, mas a disponibilidade efectiva depende do recurso. Confirmar apresentação e navegação num recurso elegível.
4. **Integridade após upload/substituição**: a LEDG-2149 registou corrupção intermitente em PRD para ficheiros superiores a 1 MB. O estado Done não constitui, por si só, prova de regressão bem-sucedida.

### Conjunto mínimo de testes PRD pendentes

| Prioridade | Teste | Resultado observável |
| --- | --- | --- |
| 1 | Carregar e substituir um ficheiro superior a 1 MB e comparar o conteúdo descarregado com o original | O ficheiro descarregado corresponde integralmente ao original e não apresenta corrupção |
| 2 | Tentar adicionar um ficheiro SVG e um HTML | Registar exactamente se PRD aceita ou rejeita cada formato e a mensagem apresentada |
| 3 | Abrir recursos CSV, TSV, XLS, XLSX e ODS disponíveis em PRD | Registar em quais formatos a Pré-visualização é efectivamente apresentada e funcional |
| 4 | Abrir um recurso elegível para exploração | Confirmar se `Explore os dados` é apresentado e se conduz ao Explorador correcto |
| 5 | Verificar recurso sem validação conforme | Confirmar que o acesso/download permanece disponível, quando aplicável |

### Estado D05

**Parcialmente validado.**

Não é necessário revalidar toda a gestão de recursos. O fecho fica concentrado nos cinco testes PRD acima e na UAT da LEDG-2047.

### Evidência PRD adicional D05, 22/09/2026

Foram executadas verificações directas no PRD público:

#### Extensões aceites

O endpoint `/api/1/datasets/extensions/` devolveu a lista actual de extensões permitidas.

* `svg` não está presente;
* `html` não está presente.

Assim, a afirmação do guia de que SVG e HTML não são aceites deixa de estar Por confirmar e passa a estar sustentada pelo contrato actual de PRD.

#### Pré-visualização tabular

O frontend actual declara como formatos tabulares:

`csv`, `tsv`, `xls`, `xlsx`, `ods`.

Foram encontrados recursos públicos e executados os proxies reais de PRD com sucesso para:

* CSV, através de `/internal-api/proxy-csv`;
* XLS, através de `/internal-api/proxy-spreadsheet`;
* XLSX, através de `/internal-api/proxy-spreadsheet`;
* ODS, através de `/internal-api/proxy-spreadsheet`.

Nos três formatos de folha de cálculo, o proxy devolveu cabeçalhos, linhas, total de linhas e total de colunas.

Não foi encontrado um recurso TSV público na amostra pesquisada em PRD. O suporte TSV está presente no frontend, mas permanece **não observado com recurso real** nesta ronda.

#### Explorar dados

Conforme revisão de D06, o CTA **Explore os dados** está preparado no frontend mas oculto e não integrado no Frontoffice público actual. D05 não deve sugerir que o Explorador está actualmente disponível apenas por o recurso ser tabular.

#### Pendência residual de D05

Para o fecho funcional de D05 permanecem essencialmente:

1. regressão autenticada de integridade após upload/substituição, devido ao histórico da LEDG-2149;
2. observação real de TSV quando existir recurso adequado;
3. validação autenticada das mensagens e estados de substituição/herança quando necessária.

## 8. Revisão profunda D07, Qualidade e validação de dados

Data da revisão: 22/09/2026.

### Resultado

As seis fichas de D07 estão fortemente alinhadas com a LEDG-2031. A História define de forma testável elegibilidade, associação, estados, execução, não conformidades, histórico, permissões e acessibilidade.

Contudo, a LEDG-2031 encontra-se em **READY FOR TESTING**. De acordo com a regra de fallback do projecto, isto não é suficiente para apresentar o fluxo como comportamento actual do portal.

### Requisito confirmado pela LEDG-2031

A especificação funcional define:

* formatos elegíveis CSV, TXT tabular, XLS, XLSX e ODS;
* recursos remotos, APIs e serviços de dados como Não aplicável;
* associação opcional de modelo;
* nova associação apenas com modelo Activo e versão Em vigor;
* associação a uma versão exacta e imutável;
* opção `Validar a ordem das colunas` activa por defeito;
* comparação por nome quando a ordem está desactivada, mantendo faltas/adicionais como não conformidades;
* execução apenas por acção explícita e de forma assíncrona;
* estados Sem modelo, Por validar, Em validação, Válido, Não conforme, Erro técnico e Não aplicável;
* Não conforme e Erro técnico como não bloqueantes para gestão/publicação;
* alteração de associação a colocar o recurso em Por validar;
* remoção da associação a colocar o recurso em Sem modelo;
* nova versão do modelo sem migração automática da associação existente;
* preservação do histórico ligado ao conteúdo e à versão utilizados;
* controlo de permissões no contexto aplicável;
* requisitos de acessibilidade WCAG 2.2 AA.

Estes pontos são **Requisito**, não evidência suficiente de **Implementação actual em PRD**.

### Evidência observada em PRD

Em 22/09/2026 foi revisto um Conjunto de Dados público recente com recurso CSV.

No HTML público não foram encontradas ocorrências específicas do novo Validador para:

* `Sem modelo`;
* `Por validar`;
* `Em validação`;
* `Não conforme`;
* `Validar a ordem das colunas`;
* `modelo de validação`.

As ocorrências de `Válido` e `Erro técnico` pertenciam a validações genéricas do frontend e ao formulário de suporte, não ao Validador de Dados.

A API pública do recurso CSV expôs os campos:

`checksum, created_at, description, extras, filesize, filetype, format, harvest, id, internal, last_modified, latest, metrics, mime, preview_url, schema, title, type, url`.

Não foram observados campos públicos específicos para estado, resultado ou associação do novo Validador.

### Interpretação

A ausência destes elementos no Frontoffice público **não prova** que o fluxo autenticado de Backoffice não esteja disponível em PRD.

Prova apenas que o comportamento do Validador não pode ser confirmado através da superfície pública analisada.

Por isso, as seis fichas de D07 permanecem no protótipo como conteúdo funcional preparado, mas **não devem ser apresentadas como comportamento actual do PRD até validação autenticada**.

### Conjunto mínimo de testes PRD autenticados

| Prioridade | Teste | Resultado observável necessário |
| --- | --- | --- |
| 1 | Abrir a gestão de um recurso CSV com Editor/Administrador autorizado | A área de validação existe e apresenta o estado actual aplicável |
| 2 | Associar um modelo a um recurso elegível | São apresentados modelos disponíveis; confirmar estado real do modelo/versão, configuração da ordem e estado resultante do recurso |
| 3 | Executar uma validação | A acção é explícita; observar transição de estado e resultado final real em PRD |
| 4 | Produzir ou utilizar um caso Não conforme | Confirmar detalhe efectivamente apresentado e verificar que o recurso/dataset continua gerível e acessível |
| 5 | Alterar ou remover a associação | Registar os estados reais resultantes e verificar preservação do resultado anterior/histórico |
| 6 | Substituir o ficheiro de um recurso previamente validado | Confirmar que o resultado anterior não é apresentado como resultado actual e observar a opção real de herança do modelo |
| 7 | Consultar histórico | Confirmar exactamente quais campos e detalhes estão disponíveis em PRD |
| 8 | Repetir as operações principais com teclado | Confirmar foco, nomes acessíveis, estados/mensagens e ausência de dependência exclusiva da cor |

### Estado D07

**Não observável no stack público actual de PRD.**

Não é necessário rediscutir a LEDG-2031. O que falta é comprovar, através dos oito testes acima, quais partes da especificação já correspondem ao comportamento efectivamente disponível em produção.

Se PRD divergir da LEDG-2031, o Manual deve descrever **PRD como Implementação actual** e registar separadamente a divergência para correcção do produto.

### Evidência técnica PRD adicional, 22/09/2026

A investigação foi aprofundada no stack público actual de PRD:

* o `main` de `amagovpt/dadosgov-fe` não contém rotas, componentes, serviços ou traduções específicas para os estados/acções da LEDG-2031;
* a árvore completa de rotas administrativas do frontend não contém área do novo Validador;
* o `main` de `amagovpt/udata-pt` não contém módulo específico do novo Validador;
* o Swagger actual de PRD não contém endpoints de associação, execução, resultado ou histórico do novo Validador;
* nas definições de Resource/Dataset existe apenas o campo legado `schema`;
* as ocorrências de `validation` no Swagger correspondem ao Harvester ou a erros genéricos de validação.

**Classificação actual:** o novo Validador não é observável nem integrado no stack público actual de PRD.

**Ressalva:** esta conclusão não prova ausência absoluta de um componente privado, serviço separado ou funcionalidade protegida por feature flag não exposta nas superfícies analisadas.

**Impacto editorial:** D07 permanece como conteúdo preparado a partir do requisito, mas não deve ser publicado como funcionalidade actual.

## 9. Revisão profunda CM, Catálogo de Modelos

Data da revisão: 22/09/2026.

### Resultado

As nove fichas do Catálogo de Modelos estão fortemente alinhadas com a LEDG-2049, actualmente em **IN UAT**.

A especificação é suficientemente detalhada para servir como fonte funcional e para preparar testes, mas o estado UAT não prova, por si só, que o comportamento esteja disponível e estável em PRD.

### Requisito confirmado pela LEDG-2049

A História define, entre outros pontos:

* Catálogo global pesquisável, filtrável, ordenável e paginado;
* Editor com consulta de modelos, versões e utilização, sem alteração, auditoria ou acesso a eliminados;
* Administrador com operações administrativas, inferência, auditoria e consulta de eliminados;
* criação manual ou por inferência;
* primeira gravação a criar modelo e versão v1 em Rascunho;
* no máximo um Rascunho por modelo;
* versão activada imutável;
* estados de versão Rascunho, Em vigor e Substituída;
* modelo Activo ou Inactivo, com eliminação lógica quando elegível;
* inferência para CSV, TXT tabular, XLS, XLSX e ODS;
* inferência limitada a 1.000 linhas ou 5 MB descomprimidos;
* apenas primeira folha em XLS, XLSX e ODS;
* até cinco valores distintos e não vazios por campo na proposta;
* normalização de nomes segundo Unicode NFC, caixa e espaços;
* activação bloqueada perante regras incompatíveis/inactivas ou catálogo de regras indisponível;
* nova versão sem migração automática das associações existentes;
* inactivação bloqueada enquanto existir Rascunho;
* eliminação apenas quando nenhuma versão foi alguma vez associada;
* modelos eliminados não recuperáveis nesta entrega;
* 20 resultados por página;
* preservação de pesquisa, filtros, ordenação e página ao regressar do detalhe;
* utilização e auditoria administrativas rastreáveis;
* WCAG 2.2 AA e contratos de erro/conflito aplicáveis.

Estes pontos são **Requisito** e não devem ser descritos no Manual como comportamento actual até serem confirmados em PRD.

### Evidência observada em PRD

Em 22/09/2026 foram revistos:

* o `main` oficial de `amagovpt/dadosgov-fe`;
* o HTML público actual do portal em PRD.

Não foram encontradas ocorrências específicas para:

* `Catálogo de Modelos`;
* `Guardar e activar`;
* `1.000 linhas`;
* `Em vigor`;
* `Catálogo de regras`;
* `modelo de validação`.

A expressão `Rascunho` existe no frontend actual, mas em contextos de outras funcionalidades e não constitui evidência do Catálogo de Modelos.

A superfície pública não permite validar as operações administrativas do Catálogo.

### Interpretação

Não existe evidência suficiente para afirmar que as nove fichas de CM descrevem actualmente PRD.

A ausência na superfície pública também não demonstra que o Backoffice autenticado esteja ausente.

Assim, o conteúdo permanece no protótipo como documentação preparada a partir do requisito aprovado, mas fica **Por confirmar em PRD** para publicação como Manual do comportamento actual.

### Conjunto mínimo de testes PRD autenticados

| Prioridade | Teste | Resultado observável necessário |
| --- | --- | --- |
| 1 | Aceder ao Catálogo como Editor e como Administrador | Confirmar existência da área, modelos visíveis e diferenças reais de permissões |
| 2 | Criar manualmente um modelo e guardar pela primeira vez | Confirmar campos exigidos, estado inicial, versão criada e mensagens reais |
| 3 | Criar um modelo por inferência com CSV elegível | Confirmar proposta, campos/tipos/amostras, limites observáveis e ausência de activação automática |
| 4 | Repetir inferência com XLS/XLSX/ODS com várias folhas | Confirmar tratamento real da primeira folha, folhas adicionais e erros |
| 5 | Activar um Rascunho | Confirmar pré-condições, mensagens, estado do modelo e estado da versão |
| 6 | Criar e activar uma nova versão | Confirmar existência de um único Rascunho, transição Em vigor/Substituída e imutabilidade da versão activada |
| 7 | Inactivar e reactivar um modelo | Confirmar restrições reais e impacto em novas associações |
| 8 | Consultar utilização e auditoria com Editor e Administrador | Confirmar exactamente que informação cada perfil consegue consultar |
| 9 | Tentar eliminar modelo nunca utilizado e modelo com utilização histórica | Confirmar elegibilidade, confirmação, irreversibilidade e visibilidade posterior |
| 10 | Validar listagem com mais de 20 modelos e regressar do detalhe | Confirmar paginação, pesquisa, filtros, ordenação e preservação de contexto |
| 11 | Executar os fluxos principais apenas por teclado e com NVDA quando aplicável | Confirmar foco, nomes acessíveis, estados, erros e confirmações no contexto real |

### Pontos que não devem ser publicados sem PRD

Até execução destes testes, não apresentar como comportamento actual:

* limite exacto de 20 resultados por página;
* 1.000 linhas ou 5 MB;
* primeira folha para XLS/XLSX/ODS;
* máximo de cinco valores de exemplo;
* regras exactas de normalização de nomes;
* existência de apenas um Rascunho;
* estados e transições de versão;
* irreversibilidade de modelos eliminados;
* acesso do Editor à utilização e restrição de auditoria;
* comportamento de concorrência e conflitos;
* mensagens e confirmações;
* preservação automática do contexto da listagem.

### Estado CM

**Não observável no stack público actual de PRD.**

A LEDG-2049 continua a ser a fonte funcional para UAT. O Manual deve usar apenas o comportamento que os testes PRD autenticados confirmarem.

### Evidência técnica PRD adicional, 22/09/2026

A investigação foi aprofundada no stack público actual de PRD:

* o frontend `main` não contém rota administrativa, componente, serviço ou tradução específica do novo Catálogo de Modelos;
* a árvore completa de rotas administrativas não contém área de modelos de validação;
* o backend `main` não contém módulo específico equivalente à LEDG-2049;
* o Swagger actual de PRD não contém endpoints para criação, inferência, activação, versionamento, auditoria ou eliminação dos modelos da LEDG-2049;
* existe `GET /datasets/schemas/`, mas o contrato devolve `CatalogSchema` com `schema_url`, `schema_type` e versões nominais;
* esse endpoint é apenas de leitura e devolveu lista vazia no PRD consultado;
* não possui estados Rascunho/Activo/Inactivo, inferência, regras, auditoria ou ciclo de vida da LEDG-2049.

**Conclusão:** `/datasets/schemas/` é um mecanismo legado de schemas e não deve ser confundido com o novo Catálogo de Modelos.

**Classificação actual:** CM não é observável nem integrado no stack público actual de PRD.

**Ressalva:** a ausência nas superfícies públicas não prova inexistência de componente privado/separado ou protegido por feature flag.

**Impacto editorial:** CM permanece no protótipo como conteúdo preparado para evolução futura, sem publicação como comportamento actual.

## 10. Revisão profunda D06, Explorador de dados

Data da revisão: 22/09/2026.

### Resultado

As oito fichas de D06 estão fortemente alinhadas com a LEDG-2276 e com a documentação técnica do Explorador.

A LEDG-2276 encontra-se em **READY FOR UAT** e consolida várias capacidades que, na baseline de Agosto, ainda estavam em decisão. Entre elas: oito tipos de gráfico, exportação JSON, exportação PNG, ecrã inteiro, paginação 10/50/200, estado persistente no URL e ausência de alertas automáticos de qualidade nesta entrega.

No entanto, a integração de entrada no Explorador depende da LEDG-2199, também em **READY FOR UAT**.

### Requisito confirmado pela LEDG-2276

A História define:

* quatro áreas: Dados, Estrutura, Métricas e Gráfico;
* formatos elegíveis CSV, TXT tabular delimitado, XLS e XLSX;
* filtros por coluna combinados por AND;
* validação local de filtros;
* ordenação por uma coluna;
* selecção de colunas visíveis;
* paginação de 10, 50 ou 200 registos;
* filtros disponíveis nas quatro áreas;
* filtros a afectar Dados e Gráfico, mantendo Estrutura e Métricas sobre o recurso completo;
* exportação CSV e JSON da página actual e colunas visíveis;
* oito tipos de gráfico;
* gráfico sobre a página actual, até 200 registos, sem Soma ou Contagem;
* exportação PNG;
* modo de ecrã inteiro;
* persistência no URL da área, filtros, ordenação, paginação, colunas e configuração de gráfico;
* remoção selectiva de parâmetros incompatíveis após alteração da estrutura;
* estados de processamento, indisponibilidade, erro e ausência de resultados;
* interface responsiva, bilingue e acessível;
* ausência de alertas automáticos de qualidade na área Métricas nesta entrega.

A documentação técnica do Explorador confirma a existência de implementação para filtros, paginação, exportações, URL, i18n, tratamento de erros e as quatro vistas.

### Divergência histórica ultrapassada

A baseline de 13/08/2026 tratava JSON, PNG, ecrã inteiro, oito gráficos e outras extensões como implementação ainda não aprovada.

A LEDG-2276 actual consolidou funcionalmente essas capacidades. Assim, essa divergência histórica deixa de bloquear o requisito.

O Manual, contudo, continua obrigado a descrever apenas o que estiver efectivamente disponível em PRD.

### Evidência observada em PRD

Em 22/09/2026 foi revisto o frontend oficial actualmente associado ao portal.

No componente de detalhe de recurso, o bloco com o texto **Explore os dados** encontra-se explicitamente com a classe `hidden`.

O Frontoffice público apresenta actualmente a **Pré-visualização simples**, incluindo:

* Pré-visualização;
* Estrutura de dados;
* Metadados;
* Downloads.

O código actual da Pré-visualização carrega dados tabulares através dos endpoints internos `proxy-csv` ou `proxy-spreadsheet`.

Não foi encontrada uma rota pública do novo Explorador acessível a partir do recurso analisado, nem resultados públicos indexados que demonstrem o percurso completo D06 em PRD.

### Distinção obrigatória

**Pré-visualização simples** e **Explorador de dados** não são a mesma funcionalidade.

A primeira está actualmente observável em PRD.

A segunda é a funcionalidade definida na LEDG-2276, cuja entrada depende da acção **Explorar dados** da LEDG-2199.

Não utilizar a existência da Pré-visualização como prova de disponibilidade do Explorador.

### Conjunto mínimo de testes PRD após integração

| Prioridade | Teste | Resultado observável necessário |
| --- | --- | --- |
| 1 | Abrir um recurso elegível no Frontoffice | A acção **Explorar dados** é visível e abre o Explorador correcto |
| 2 | Abrir o Explorador | São apresentadas Dados, Estrutura, Métricas e Gráfico sobre o mesmo conteúdo vigente |
| 3 | Aplicar dois filtros e ocultar uma coluna filtrada | Os filtros combinam-se por AND; ocultar coluna não remove o filtro; Limpar remove filtros e preserva visibilidade |
| 4 | Ordenar e alterar paginação | Só uma coluna ordena; estão disponíveis 10, 50 e 200 registos por página |
| 5 | Exportar CSV e JSON | O ficheiro contém apenas a página actual e as colunas visíveis |
| 6 | Consultar Estrutura e Métricas após filtrar | Ambas continuam a representar o recurso completo |
| 7 | Configurar os oito tipos de gráfico | Apenas configurações compatíveis são permitidas e o gráfico representa a página actual sem agregação |
| 8 | Exportar PNG e utilizar ecrã inteiro | PNG corresponde ao estado visível; ecrã inteiro abre/fecha por controlo e Esc com retorno de foco |
| 9 | Copiar e reabrir URL configurado | O estado suportado da exploração é reposto sem conceder permissões |
| 10 | Introduzir filtro inválido e provocar ausência de resultados | Erro é associado ao campo sem pedido inválido; ausência de resultados é distinguida de erro |
| 11 | Simular indisponibilidade/reprocessamento | Não são apresentados dados antigos como actuais e existe mensagem recuperável |
| 12 | Executar navegação por teclado e NVDA | Separadores, filtros, tabela, paginação, exportações, gráfico e ecrã inteiro são operáveis e compreensíveis |

### Estado D06

**Não integrado no Frontoffice público de PRD.**

O conteúdo deve permanecer no protótipo porque está alinhado com a LEDG-2276, mas não deve ser apresentado como funcionalidade actualmente disponível até a acção de entrada estar exposta e o conjunto mínimo acima ser validado em PRD.

### Evidência PRD pública adicional, 22/09/2026

Foi verificada a integração do Explorador no comportamento público actual:

* em `ResourceExpandedContent.tsx`, o bloco com título e CTA **Explore os dados** existe, mas está dentro de `className="hidden"`;
* a pesquisa no frontend actual não encontrou rota pública autónoma denominada Explorador/`explorer`;
* foi consultado em PRD um dataset real com recurso CSV, **Estudantes da Universidade Politécnica de Viana do Castelo por curso e características sociodemográficas**, recurso `ipvc-estudantes.csv`;
* no DOM renderizado da página não foi encontrado CTA **Explore os dados**;
* não foi encontrado percurso público reproduzível para abrir o novo Explorador a partir desse recurso.

**Implementação actual:** o novo Explorador está preparado tecnicamente, mas não está integrado/exposto no Frontoffice público de PRD.

**Impacto editorial:** manter D06 no protótipo como conteúdo preparado, mas não o apresentar como funcionalidade actualmente disponível no portal.

## 11. Revisão profunda D08, APIs e serviços de dados

Data da revisão: 22/09/2026.

### Resultado

D08 combina dois domínios distintos:

1. utilização pública da API do portal e consulta das APIs registadas;
2. gestão autenticada de registos de APIs no Backoffice.

A primeira parte foi validada directamente em PRD. A segunda tem forte evidência de implementação e tickets concluídos, mas requer observação autenticada em PRD segundo a regra de fallback deste projecto.

### Implementação actual confirmada em PRD público

Foram revistos:

* `/pt/recursos/desenvolvimento/referencia-api`;
* `/pt/recursos/desenvolvimento/tutorial-api`;
* `/api/1/dataservices/`;
* um registo público real de API no catálogo.

O tutorial actual confirma explicitamente:

* para operações de escrita, o utilizador deve autenticar-se e obter uma chave nas definições do perfil;
* a chave é enviada no cabeçalho HTTP `X-API-KEY`;
* as permissões sobre o recurso continuam a ser verificadas;
* respostas paginadas fornecem `previous_page` e `next_page`;
* estes campos ficam `null` quando não existe página nesse sentido;
* modificações e eliminações através da API são definitivas;
* não existe actualmente uma área de testes para experimentar essas alterações.

A referência actual contém referências a Swagger e OpenAPI.

### Catálogo público de APIs

A API pública `/api/1/dataservices/` devolve, entre outros:

* `base_api_url`;
* `access_type`;
* `business_documentation_url`;
* `technical_documentation_url`;
* `machine_documentation_url`;
* relação com Conjuntos de Dados;
* organização ou proprietário;
* identificadores e URLs do registo;
* datas de criação/modificação e metadados aplicáveis.

Foi consultado um registo real, **AGIT Planner**, publicado por uma organização cujo payload público contém o emblema `public-service`, com URL base, tipo de acesso e três Conjuntos de Dados relacionados.

O detalhe público apresenta a informação do registo e os conteúdos relacionados aplicáveis.

### Fichas sustentadas pelo PRD público

Podem ser mantidas, no âmbito actual:

* **Escolher a API adequada**;
* **Consultar a referência da API do portal**;
* **Consultar uma API do catálogo**.

A formulação deve continuar a evitar expor chaves reais ou sugerir que a data de actualização do registo prova actualização dos dados do serviço.

### Gestão autenticada: evidência disponível

O `main` actual do frontend filtra as organizações elegíveis para criação por emblema `public-service`.

A interface contém mensagens que indicam que uma API só pode ser publicada em nome de organização com emblema **Serviço público**.

O frontend actual também utiliza os tipos de acesso:

* `open`;
* `open_with_account`;
* `restricted`.

Tickets concluídos confirmam implementação para:

* associação opcional de Conjuntos de Dados;
* guardar como rascunho ou publicar;
* edição de API;
* tipos de acesso;
* apresentação/gestão dos estados administrativos.

Isto é **evidência de implementação**, mas não substitui o teste autenticado em PRD.

### Conjunto mínimo de testes PRD autenticados

| Prioridade | Teste | Resultado observável necessário |
| --- | --- | --- |
| 1 | Aceder à criação com membro de organização com emblema Serviço público | A organização elegível é apresentada como produtor e o fluxo de criação pode avançar |
| 2 | Aceder com utilizador sem organização elegível | A criação é impedida ou a ausência de produtor elegível é comunicada exactamente como PRD implementar |
| 3 | Repetir a condição com Administrador do portal, quando aplicável | Confirmar se a mesma regra de produtor se aplica efectivamente ao perfil administrativo |
| 4 | Criar com acesso Aberto, Aberto com conta e Restrito | Confirmar campos, valores guardados, validações e informação apresentada no detalhe |
| 5 | Avançar sem associar Conjunto de Dados | Confirmar que a associação é efectivamente opcional |
| 6 | Guardar como rascunho e publicar | Confirmar estados, mensagens e presença/ausência na área pública |
| 7 | Editar descrição, URL base, documentação e associações | Confirmar persistência das alterações e comportamento ao remover uma associação |
| 8 | Confirmar listagem administrativa após alterações | Validar pesquisa, estado e informação actualmente exposta, sem antecipar itens ainda em To Do/In Review |
| 9 | Executar criação/edição apenas por teclado | Confirmar ordem de foco, labels, erros, controlos e mensagens no contexto real |

### Pontos que não devem ser antecipados

A LEDG-2026 permanece To Do e a LEDG-2379 está In Review. Melhorias de novas colunas, filtros e implementação de endpoints das listagens administrativas não devem ser descritas como concluídas no Manual até PRD as apresentar.

### Divergência editorial

A fonte estática/PDF contém uma revisão mais recente da ficha de referência API do que a fonte dinâmica antiga.

A versão a preservar deve ser a que corresponde ao conteúdo confirmado no PRD actual, incluindo `X-API-KEY`, paginação, OpenAPI e o aviso sobre operações definitivas.

### Estado D08

**Parcialmente validado.**

As três fichas de consulta pública estão suportadas pelo PRD actual. As três fichas de gestão autenticada ficam pendentes apenas do conjunto mínimo de testes PRD acima.

## 12. Revisão profunda D10, Harvester

Data da revisão: 22/09/2026.

### Resultado

D10 descreve uma funcionalidade existente e activa em PRD, mas a maior parte das tarefas do Manual ocorre no Backoffice autenticado.

A revisão conseguiu confirmar em PRD a infraestrutura, os tipos activos e os estados públicos das fontes. As regras de edição, preview e validação têm evidência forte em Jira e no frontend actual, mas permanecem pendentes de observação autenticada em PRD para serem tratadas como comportamento actual.

### Implementação actual observada em PRD público

O endpoint `/api/1/harvest/backends/` devolveu **15 backends habilitados**:

`ckan`, `ckanpt`, `cswudata`, `csw-dcat`, `csw-iso-19139`, `dcat`, `dkan`, `dgt`, `ogc`, `apambiente`, `dgtIne`, `ine`, `inehvd`, `maaf` e `odspt`.

A própria resposta confirma que filtros, funcionalidades e configurações adicionais dependem do backend. Isto suporta a formulação do guia de que os tipos e opções variam por ambiente/implementação.

O endpoint público de fontes devolveu **42 Harvesters** em PRD.

Na consulta de 22/09/2026:

* 41 fontes estavam com validação `accepted`;
* 1 fonte estava com validação `pending`;
* não foi encontrada fonte `refused` na amostra completa;
* a resposta expõe backend, organização, configuração, planeamento, último trabalho, estado de validação e permissões;
* para utilizador anónimo, as permissões `delete`, `edit`, `preview`, `run`, `schedule` e `validate` surgiram como `false`.

Foram observados trabalhos concluídos em fontes reais, confirmando a existência operacional do conceito de `last_job` e estado `done`.

### Política de preview confirmada na LEDG-2323

A decisão final registada é:

* preview de configuração sem `organization` exige **sysadmin**;
* no fluxo de edição, quando o utilizador pode editar, o frontend envia a organização da fonte;
* quando não pode editar, utiliza o preview da fonte existente, sujeito à permissão `preview` do objecto;
* pré-visualizar configuração ainda não guardada exige direitos de edição;
* o botão deve respeitar a permissão de preview;
* as rotas de preview receberam limite específico de utilização.

Esta decisão substitui a situação antiga em que uma conta meramente autenticada podia chegar ao preview de configuração sem autorização adequada.

### Edição: evidência de implementação

O frontend actual distingue:

* **Administrador da organização**: pode editar Nome, Descrição e Filtros;
* **Administrador do portal**: pode editar também os campos avançados, incluindo URL, implementação/tipo, planeamento e opções avançadas;
* utilizadores sem permissão de edição consultam o formulário em modo de leitura.

A LEDG-2296 foi testada em TST com Administrador do sistema e, posteriormente, com Editor/Administrador de organização, confirmando a restrição do produtor ao contexto aplicável.

Por regra do projecto, estas evidências não substituem uma confirmação autenticada em PRD.

### Aprovação e rejeição

O frontend actual apresenta os estados `pending`, `accepted` e `refused`.

Em estado pendente, as acções Aprovar e Rejeitar são apresentadas ao administrador do sistema.

A aprovação/rejeição da fonte e a execução do Harvester são operações distintas.

**Por confirmar em PRD:** mensagem final, obrigatoriedade efectiva do motivo de rejeição, comentário de aprovação e comportamento exacto após cada decisão.

### Volatilidade por backend

Existem alterações recentes ainda não estabilizadas em produção, nomeadamente:

* LEDG-2518, Harvester DGT, em READY FOR TESTING;
* LEDG-2530, campos/formatos do Harvester DGT, em READY FOR TESTING;
* LEDG-2513, CMLisboa, em Ready for review.

Estas alterações são específicas dos backends e **não devem ser incorporadas como regras genéricas do Manual D10** até estarem efectivamente reflectidas em PRD.

### Conjunto mínimo de testes PRD autenticados

| Prioridade | Teste | Resultado observável necessário |
| --- | --- | --- |
| 1 | Abrir uma fonte como Editor/consulta e como Administrador de organização | Confirmar campos visíveis, modo de leitura e campos efectivamente editáveis por cada perfil |
| 2 | Editar Nome, Descrição e Filtros como Administrador da organização | Confirmar gravação e persistência após reabrir; URL, Tipo e Planeamento permanecem não editáveis nesse perfil, se PRD assim implementar |
| 3 | Abrir a mesma fonte como Administrador do portal | Confirmar disponibilidade real dos campos avançados |
| 4 | Configurar filtro suportado pelo backend, guardar e reabrir | Filtro permanece registado e produz o efeito esperado no preview |
| 5 | Executar preview como utilizador autorizado e como utilizador sem permissão | Confirmar disponibilidade/403 ou ocultação da acção e ausência de efeitos persistentes inesperados |
| 6 | Consultar Trabalhos e detalhe de um trabalho | Confirmar estados, itens, paginação e Linhas por página efectivamente disponíveis |
| 7 | Aprovar fonte pendente como Administrador do sistema | Confirmar mensagem, estado resultante e que a aprovação não equivale a execução |
| 8 | Rejeitar fonte pendente | Confirmar se motivo é obrigatório, estado resultante e feedback ao proprietário |
| 9 | Executar os fluxos principais apenas por teclado | Confirmar foco, labels, estados, modais, erros e acções no contexto real |

### Estado D10

**Parcialmente validado.**

A preparação da fonte, dependência do backend/ambiente e existência dos estados/trabalhos têm evidência directa em PRD. As instruções autenticadas permanecem pendentes apenas do conjunto mínimo de testes acima.

O Manual deve continuar genérico quanto a backends específicos e nunca recomendar alteração de tipo como contorno para erros de configuração.

## 13. Revisão profunda D11, Favoritos e notificações

Data da revisão: 22/09/2026.

### Resultado

D11 foi alinhado à regra do projecto de documentar o comportamento actual de PRD sem antecipar evoluções futuras.

O guia passa a separar duas capacidades:

1. **Favoritos**, relação actualmente exposta no Frontoffice através das acções `Adicionar aos favoritos` e `Remover dos favoritos`;
2. **Notificações**, avisos associados a eventos específicos do portal e não à existência de um Favorito por si só.

### Implementação actual observada em PRD

Foram revalidados exemplos públicos de:

* Organização;
* Conjunto de Dados;
* Reutilização;
* API.

Nos quatro tipos, o comportamento actual apresenta:

* **Adicionar aos favoritos**;
* **Remover dos favoritos**.

Não foram encontradas as acções públicas **Seguir** ou **Deixar de seguir** nestes conteúdos.

A LEDG-2289 confirma que, tecnicamente, Favoritos utiliza a relação `Follow/Unfollow`, mas a terminologia técnica não substitui a terminologia visível do PRD no Manual.

### Favoritos não equivale a Notificações

A evidência disponível não demonstra uma regra implementada do tipo:

`Adicionar aos favoritos → alteração do conteúdo → notificação para o utilizador`.

Por isso:

* adicionar um conteúdo aos Favoritos não deve ser documentado como subscrição de alterações;
* remover dos Favoritos não deve ser documentado como gestão/desactivação das notificações;
* as notificações devem ser explicadas a partir dos eventos que o portal efectivamente produz.

### Notificações actualmente suportadas

A análise LEDG-2289 e a implementação actual identificam notificações relacionadas, entre outros contextos, com:

* Discussões;
* Organizações;
* Transferências;
* Harvesters.

O frontend actual possui tratamento específico para validação de Harvester, incluindo:

* estado da validação;
* nome da fonte;
* ligação **Ver harvester**;
* acção **Marcar como lida**.

Outros tipos podem ser apresentados de forma genérica conforme a implementação disponível.

Marcar uma notificação como lida não equivale a executar a decisão de negócio associada, por exemplo aprovar ou rejeitar um Harvester.

### Evolução futura fora do Manual actual

Os tickets seguintes continuam a representar evolução e não comportamento actual:

* LEDG-1960, **To Do**;
* LEDG-2305, **In Progress**;
* LEDG-2306, **Backlog**;
* LEDG-2303, **To Do**.

A futura uniformização para **Seguir** não deve ser antecipada no conteúdo actual enquanto PRD continuar a apresentar Favoritos.

### Impacto nas cinco fichas

| Ficha actual | Estado face a PRD |
| --- | --- |
| Adicionar aos favoritos | Alinhada ao comportamento público observado |
| Remover dos favoritos | Alinhada ao comportamento público observado |
| Consultar uma notificação | Funcionalidade existente; percurso autenticado ainda deve ser confirmado |
| Tratar um aviso de validação de harvester | Implementação actual fortemente suportada; confirmar sessão PRD |
| Resolver dificuldades com notificações | Conteúdo genérico compatível com o comportamento actual |

### Correcção editorial executada

A fonte editorial foi alterada de:

* **Seguir conteúdos e notificações** para **Favoritos e notificações**;
* **Seguir um conteúdo** para **Adicionar aos favoritos**;
* **Deixar de seguir um conteúdo** para **Remover dos favoritos**.

As rotas históricas e o nome físico do PDF foram preservados para evitar quebra de ligações existentes.

A fonte, experiência dinâmica, pesquisa, páginas estáticas e PDF foram sincronizados. O guardrail de consistência passou após a alteração.

### Conjunto mínimo de testes PRD autenticados

| Prioridade | Teste | Resultado observável necessário |
| --- | --- | --- |
| 1 | Abrir Organização, Conjunto de Dados, Reutilização e API autenticado | A acção actual é **Adicionar aos favoritos** ou **Remover dos favoritos** conforme a relação existente |
| 2 | Adicionar um conteúdo aos favoritos, apenas quando houver autorização de escrita | A relação persiste e a acção passa a **Remover dos favoritos** |
| 3 | Remover dos favoritos, apenas quando houver autorização de escrita | A relação termina e **Adicionar aos favoritos** volta a estar disponível |
| 4 | Consultar área de Notificações | Conteúdo, ligação, estado lido/não lido e destino correspondem ao evento apresentado |
| 5 | Consultar um aviso de Harvester existente | A ligação encaminha para a fonte e marcar como lido permanece distinto da aprovação/rejeição |
| 6 | Operar Favoritos e Notificações por teclado | Foco, nomes acessíveis, estados e mensagens são perceptíveis |

### Estado D11

**Parcialmente validado.**

As duas fichas de Favoritos estão alinhadas com o comportamento actual observado em PRD.

As fichas de Notificações permanecem pendentes apenas da validação autenticada mínima. Não existe evidência para afirmar que Favoritos gera notificações de alterações.


## 14. Revisão profunda D02, Organizações e permissões

Data da revisão: 22/09/2026.

### Resultado

D02 contém uma componente pública claramente observável em PRD e uma componente administrativa que ainda exige validação autenticada.

### Implementação actual confirmada em PRD público

A pesquisa de organizações por sigla foi confirmada através do endpoint de sugestões.

A pesquisa por `ARTE` devolveu como primeiro resultado:

**Agência para a Reforma Tecnológica do Estado**, acrónimo `arte`.

Isto suporta a ficha **Encontrar uma organização** e a orientação para pesquisar por nome ou sigla.

Os perfis públicos de organizações apresentam emblemas. Num perfil real foi observada a apresentação do emblema **Serviço público**.

As LEDG-1919 e LEDG-1943 já tinham consolidado a visibilidade pública dos emblemas e a regra de que a gestão de emblemas pertence ao super administrador.

### Evidência de implementação administrativa

A LEDG-1941 confirmou a existência da acção de edição para super administrador ou membro da organização.

A LEDG-1943 define que apenas o super administrador pode visualizar e alterar a secção administrativa de Emblemas; um administrador da organização não recebe essa capacidade apenas por pertencer à entidade.

A LEDG-1680 consolidou que o website da organização não é obrigatório. O D02 já usa uma formulação condicional e não o apresenta como obrigatório.

### Gestão de membros: evolução ainda aberta

A LEDG-2468 está **READY FOR TESTING** e procura impedir que uma organização fique sem administrador através da remoção ou despromoção do último administrador nos endpoints de membros.

A própria evidência do ticket regista que o teste funcional em TST ficou bloqueado e que caminhos relacionados com eliminação da conta ainda exigem decisão/validação.

Portanto, o Manual **não deve afirmar** que o portal impede actualmente uma organização de ficar sem administrador.

A recomendação editorial do D02:

> antes de remover ou alterar o papel de um administrador, assegurar que outra pessoa mantém a administração

continua adequada como precaução operacional e não deve ser reescrita como validação automática do sistema.

### Pedidos de adesão e convites

A LEDG-2483 encontra-se **To Do** e identifica que o ecrã administrativo ainda mistura:

* pedidos de adesão;
* convites pendentes.

O backend já distingue `request` e `invitation`, mas a interface administrativa descrita no ticket ainda necessita de separar as acções.

Assim:

* o utilizador convidado pode continuar a aceitar ou recusar o seu convite conforme o fluxo aplicável;
* não documentar como comportamento actual que o administrador da organização consegue tratar um convite com as mesmas acções dos pedidos de adesão;
* a ficha **Gerir pedidos e membros** deve ser validada em PRD antes de publicação.

### Impacto nas seis fichas

| Ficha | Estado |
| --- | --- |
| Encontrar uma organização | Sustentada pelo PRD público |
| Integrar uma organização | Parcialmente sustentada; validar pedido, convite e respectivas decisões em sessão PRD |
| Criar uma organização | Fluxo existente, mas validar formulário, campos e resultado em sessão PRD |
| Gerir pedidos e membros | Pendente de validação PRD e afectada pelas LEDG-2468/2483 |
| Editar uma organização | Implementação suportada; confirmar permissões e campos em PRD autenticado |
| Emblemas da organização | Consulta pública sustentada; gestão por super administrador requer validação PRD autenticada |

### Conjunto mínimo de testes PRD autenticados

| Prioridade | Teste | Resultado observável necessário |
| --- | --- | --- |
| 1 | Pedir adesão a uma organização | Pedido é criado, estado/feedback ficam visíveis e não há atribuição automática de papel |
| 2 | Responder a um convite como destinatário | Confirmar acções reais disponíveis e estado resultante |
| 3 | Criar organização | Confirmar campos obrigatórios/opcionais, mensagens e resultado actual |
| 4 | Abrir Membros como administrador da organização | Confirmar pedidos, convites e acções efectivamente disponíveis em PRD |
| 5 | Aceitar/recusar pedido de adesão | Confirmar mudança de estado e criação do membro/papel aplicável |
| 6 | Adicionar, alterar papel e remover membro | Confirmar permissões, confirmação e resultado persistido |
| 7 | Tentar remover/despromover o último administrador | Registar o comportamento real de PRD sem antecipar a LEDG-2468 |
| 8 | Editar perfil como membro/admin da organização | Confirmar campos editáveis e presença da acção Ver perfil público |
| 9 | Abrir edição como administrador da organização e super administrador | Confirmar que Emblemas só é gerível pelo perfil global autorizado |
| 10 | Operar fluxos por teclado | Confirmar foco, labels, modais, erros e mensagens |

### Estado D02

**Parcialmente validado.**

A consulta pública pode permanecer no Manual. As operações administrativas devem aguardar a validação PRD autenticada acima e não devem incorporar como actuais as correcções ainda em READY FOR TESTING ou To Do.

## 15. Revisão profunda D09, Reutilizações

Data da revisão: 22/09/2026.

### Resultado

D09 possui um percurso público actualmente disponível em PRD e um percurso de gestão autenticada suportado pelo frontend e por testes anteriores, mas ainda não observado em produção nesta ronda.

### Implementação actual confirmada em PRD público

Foi consultada uma Reutilização pública real:

**Monitorização das Organizações Produtoras de Dados no dados.gov**.

A API pública confirma que uma Reutilização contém, entre outros:

* título;
* descrição;
* URL;
* tema/tipo;
* etiquetas;
* organização ou proprietário;
* relações com Conjuntos de Dados e APIs/serviços quando aplicáveis;
* estado público/privado;
* datas e métricas;
* página pública.

A página pública apresenta os conteúdos e metadados necessários à ficha **Encontrar e consultar reutilizações**.

### Criação: evidência de implementação

O frontend actual:

* exige nome, URL válida, tipo, tema e descrição;
* cria inicialmente a Reutilização com `private: true`;
* permite produtor pessoal ou organização disponível à conta;
* suporta palavras-chave e imagem;
* possui validação de URL.

Isto suporta as fichas **Preparar uma reutilização** e **Publicar ou manter em rascunho** como implementação candidata, mas a execução real deve ser confirmada em PRD autenticado.

### Associação de dados

O frontend actual permite:

* seleccionar um ou mais Conjuntos de Dados do portal;
* registar fontes externas;
* título e descrição opcionais nas fontes externas.

A validação `validateReuseDatasetSelection` bloqueia a utilização simultânea de:

* pelo menos um Conjunto de Dados do portal;
* pelo menos um link externo.

Portanto, a regra do D09 de **não combinar dados do portal e ligações externas na mesma reutilização** está sustentada pela implementação actual.

Por regra do projecto, a mensagem e o comportamento final ainda devem ser observados em PRD antes de publicação oficial.

### Publicação e rascunho

A criação utiliza `private: true` como estado inicial.

A ficha do Manual está correcta ao distinguir avançar no assistente de tornar a Reutilização pública.

**Por confirmar em PRD autenticado:** designação exacta das acções, mensagens e estado visual após guardar/publicar.

### Edição

A implementação actual suporta edição dos dados principais e das associações.

A LEDG-1748 consolidou que:

* links externos existentes devem voltar a aparecer na edição;
* título e descrição de cada link externo são opcionais;
* a contagem de Conjuntos de Dados deve reflectir os itens associados.

A confirmação final do comportamento em PRD continua necessária.

### Transferência não está disponível no percurso actual

A LEDG-2520 encontra-se em **Backlog** e documenta explicitamente que:

* o Backend suporta transferência de Reutilizações;
* o serviço e os tipos no frontend existem;
* a função `handleTransferReuse` está implementada;
* o popup existe;
* **o botão não está ligado ao ecrã**.

Assim, o Manual não deve indicar actualmente qualquer acção de transferência de Reutilização.

A nota existente na ficha **Resolver dificuldades numa reutilização** deve ser entendida como alerta de funcionalidade incompleta. Para publicação actual, a formulação mais rigorosa é: **a transferência self-service de Reutilizações não está disponível no ecrã actual de PRD, salvo evidência posterior em contrário**.

### Conjunto mínimo de testes PRD autenticados

| Prioridade | Teste | Resultado observável necessário |
| --- | --- | --- |
| 1 | Criar uma Reutilização com produtor pessoal e, quando aplicável, organização | Confirmar produtores disponíveis, campos exigidos, validações e estado inicial |
| 2 | Informar URL inválida | Fluxo é bloqueado e mensagem actual é associada ao campo |
| 3 | Associar vários Conjuntos de Dados do portal | Associação é guardada e aparece no detalhe/edição |
| 4 | Associar apenas links externos sem título/descrição | É possível avançar e guardar mantendo estes metadados opcionais |
| 5 | Tentar combinar Conjuntos de Dados do portal e link externo | PRD bloqueia a combinação e apresenta feedback observável |
| 6 | Guardar como rascunho e publicar | Confirmar acções, estados e visibilidade pública |
| 7 | Editar uma Reutilização com links externos | Links existentes são apresentados, podem ser alterados/removidos e o resultado persiste |
| 8 | Procurar acção de transferência | Registar a indisponibilidade actual enquanto LEDG-2520 não estiver implementada |
| 9 | Operar criação/edição apenas por teclado | Confirmar foco, labels, erros e controlos |

### Estado D09

**Parcialmente validado.**

A consulta pública e a regra de associação estão sustentadas. Criação, edição e publicação necessitam apenas da validação PRD autenticada. Transferência fica explicitamente fora do percurso actual.

## 16. Revisão profunda D12, Discussões e comunidade

Data da revisão: 22/09/2026.

### Resultado

D12 descreve uma funcionalidade pública existente em PRD. A criação e resposta exigem autenticação e devem ser fechadas com sessão PRD.

### Implementação actual confirmada em PRD público

O endpoint público de Discussões aceita filtro por identificador do conteúdo através do parâmetro `for`.

Num Conjunto de Dados real foram encontradas **7 discussões**.

A primeira discussão devolvida possuía:

* título;
* mensagens;
* estado aberto/fechado aplicável;
* autores/contexto;
* URL web própria.

O campo `self_web_url` apontou para o próprio Conjunto de Dados com:

`?tab=discussions`.

Isto sustenta as instruções de consulta e confirma o percurso de ligação directa para a área de Discussões.

O endpoint respondeu correctamente também para identificadores de Reutilização e API, embora os exemplos consultados não tivessem discussões registadas.

### Discussões no contexto da organização

A decisão antiga registada na LEDG-1636, que tinha retirado Discussões das Organizações, foi superada na implementação actual.

O frontend actual voltou a apresentar uma área de Discussões na Organização.

Importante: esse contexto utiliza o filtro `org` do Backend.

O filtro `org` não representa necessariamente uma discussão cujo assunto é a própria organização. O Backend agrega discussões cujo assunto pertence a:

* Conjuntos de Dados da organização;
* Reutilizações da organização;
* APIs/serviços de dados da organização.

Assim, a ficha **Consultar discussões da organização** é coerente quando entendida como área de acompanhamento das discussões associadas aos conteúdos da entidade.

### Iniciar e responder

O Backend actual exige autenticação para:

* iniciar nova discussão;
* responder a uma discussão.

A criação exige título, comentário inicial e assunto.

O frontend actual implementa os fluxos `createDiscussion` e `replyToDiscussion`.

**Por confirmar em PRD autenticado:** identidade disponível, mensagens exactas, associação em nome de organização e comportamento final após submissão.

### Pesquisa e estados vazios

O endpoint de Discussões suporta:

* pesquisa `q`;
* ordenação;
* estado aberto/fechado;
* paginação;
* filtro por assunto;
* filtro por organização;
* filtro por utilizador.

O Manual pode orientar a pesquisa de uma conversa, mas a UI e a mensagem de estado vazio devem ser confirmadas no contexto real antes de publicação final.

### Emails e notificações

A LEDG-1742 corrigiu anteriormente o link de resposta para encaminhar para o conteúdo no separador Discussões.

No entanto, existem actualmente questões abertas:

* LEDG-2390, Backlog: comentário de fecho no índice 0 pode ser omitido do email e escapar à verificação de spam;
* LEDG-2391, Backlog: uma notificação assíncrona pode citar o comentário errado se os índices mudarem antes da execução.

Estas questões não impedem o uso normal da Discussão, mas significam que o Manual não deve apresentar o email como fonte de verdade sobre a conversa.

A formulação actual, que recomenda abrir a conversa e confirmar o contexto antes de responder, é adequada.

### Conjunto mínimo de testes PRD autenticados

| Prioridade | Teste | Resultado observável necessário |
| --- | --- | --- |
| 1 | Iniciar discussão num Conjunto de Dados | Autenticação/perfil, campos, mensagem e nova conversa ficam correctamente associados ao conteúdo |
| 2 | Iniciar discussão numa Reutilização e numa API | Confirmar que o percurso está disponível nos dois tipos em PRD |
| 3 | Responder a discussão existente | Resposta aparece uma única vez e na conversa correcta |
| 4 | Abrir área Discussões de uma organização | Confirmar agregação dos conteúdos da entidade e acções efectivamente permitidas ao perfil |
| 5 | Pesquisar discussão | Termo, resultados e estado sem resultados correspondem ao comportamento actual |
| 6 | Abrir uma ligação proveniente de email/notificação | Destino abre o conteúdo/conversa correcta; não usar o email como substituto da confirmação no portal |
| 7 | Operar criação/resposta por teclado | Foco, labels, editor, erros e submissão são acessíveis |

### Estado D12

**Parcialmente validado.**

A consulta pública está confirmada em PRD. A participação autenticada e o contexto de organização precisam apenas da validação PRD mínima acima.

## 17. Revisão profunda D13, Perfil e actividade

Data da revisão: 22/09/2026.

### Resultado

D13 representa funcionalidades existentes do perfil e da área pessoal, mas a ficha **Consultar um perfil público** ficou desactualizada após uma decisão de segurança.

### Alteração de acesso confirmada pela LEDG-2113

A LEDG-2113, concluída, corrigiu o acesso anónimo aos endpoints de utilizadores.

A decisão validada foi:

* exigir autenticação nos endpoints de perfil, contactos, seguidores, conteúdos seguidos, sugestões e roles;
* utilizadores autenticados continuam a poder consultar perfis de outros utilizadores;
* a página `/users/<slug>` passa a encaminhar visitantes anónimos para login.

A consequência de produto está explicitamente registada no ticket:

**o perfil de utilizador passa a exigir login**.

### Implementação actual observada em PRD

Em 22/09/2026:

* `GET /api/1/users/<slug>/` devolveu `401 Unauthorized` sem autenticação;
* a página de perfil respondeu com o esqueleto inicial, mas sem carregar os dados do utilizador para a sessão anónima;
* o frontend actual contém o gate que redirecciona o visitante para `/login?next=/users/<slug>`.

Portanto, a ficha não deve ter o actor **Consulta pública**.

Actor correcto no comportamento actual:

**Utilizador autenticado**.

O termo “perfil público” pode continuar a ser usado apenas no sentido de perfil de apresentação visível a outros utilizadores autenticados, não como página disponível anonimamente.

### Informação apresentada no perfil

O frontend actual apresenta, quando disponível:

* nome;
* fotografia/avatar;
* website;
* biografia;
* organizações;
* Conjuntos de Dados;
* Reutilizações;
* seguidores;
* relação de conteúdos seguidos apenas no próprio perfil, sob a terminologia actual ainda em evolução.

A implementação actual de `PublicProfileClient` **não apresenta a data de registo do utilizador** na área de perfil.

Assim, a instrução do D13 para consultar a “data de registo” deve ser removida enquanto PRD não a apresentar.

### Edição do próprio perfil

O frontend actual permite ao próprio utilizador aceder a **Editar perfil**.

A ficha D13 prevê:

* nome;
* biografia;
* website;
* fotografia;
* remoção da fotografia.

**Por confirmar em PRD autenticado:** campos exactos actualmente editáveis, formatos/limites de fotografia, mensagens e persistência.

O Manual está correcto ao recomendar que se respeitem as indicações apresentadas junto ao campo, sem inventar limites numéricos.

### Conteúdos pessoais

A área **Meu perfil** possui percursos para gestão de conteúdos.

A LEDG-1917 repôs a listagem **Meu perfil > API**, testada anteriormente em PPR.

A LEDG-2114 implementou ordenação nas listagens pessoais, mas registou que a consistência depende do suporte do Backend.

Por isso, o D13 pode mencionar a ordenação disponibilizada, mas não deve prometer os mesmos critérios ou comportamento para todas as listagens sem confirmação PRD.

### Actividade

A área de actividade existe como funcionalidade de perfil.

A LEDG-2115 está em **Backlog** e propõe pesquisa textual pelo campo Acção.

O D13 actual já evita prometer essa pesquisa e deve continuar assim.

A actividade deve permanecer apresentada como apoio à consulta, sem ser tratada como fonte definitiva do estado actual de um conteúdo.

### Conteúdos seguidos e Seguidores

As LEDG-2306 e LEDG-2303 ainda não estão concluídas.

Não introduzir no D13 a nova terminologia/visibilidade prevista para **Conteúdos seguidos** e **Seguidores** enquanto não estiver confirmada em PRD.

A relação com D11 deve manter-se explícita.

### Correcções editoriais necessárias

Na ficha **Consultar um perfil público**:

1. substituir o actor **Consulta pública** por **Utilizador autenticado**;
2. não afirmar acesso anónimo;
3. remover **data de registo** da lista de informação apresentada enquanto não existir evidência PRD;
4. manter nome, fotografia, biografia, website e conteúdos apenas quando efectivamente apresentados.

Estas alterações são correcções do Manual ao comportamento actual, não mudanças de requisito do produto.

### Conjunto mínimo de testes PRD autenticados

| Prioridade | Teste | Resultado observável necessário |
| --- | --- | --- |
| 1 | Abrir perfil de outro utilizador sem sessão e depois autenticado | Anónimo é encaminhado para login; autenticado consegue consultar conforme permissões actuais |
| 2 | Editar o próprio perfil | Confirmar campos, fotografia, remoção, mensagens e persistência |
| 3 | Abrir perfil de outro utilizador autenticado | Confirmar exactamente os campos e conteúdos apresentados |
| 4 | Abrir Meu perfil > Conjuntos de Dados, API, Reutilizações e Recursos comunitários | Confirmar áreas realmente disponíveis, conteúdos e ordenação actual |
| 5 | Abrir Actividade | Confirmar acções, ordenação/paginação e ausência de pesquisa textual enquanto LEDG-2115 não estiver implementada |
| 6 | Comparar conteúdo pessoal com conteúdo de organização | Confirmar que a área pessoal não concede gestão automática dos conteúdos da organização |
| 7 | Operar perfil e listagens por teclado | Confirmar foco, labels, avatar, tabelas, paginação e mensagens |

### Estado D13

**Parcialmente validado.**

A maior correcção necessária é editorial: o perfil deixou de ser público para utilizadores anónimos. As restantes funcionalidades estão sustentadas por implementação, mas devem receber a passagem PRD autenticada acima antes de publicação final.

## 18. Decisões e lacunas transversais

### Requisito/decisão confirmada

O Validador é opcional, explícito, assíncrono e não bloqueante para publicação/manutenção do recurso no âmbito consolidado.

### Questões em aberto

Continuam a exigir decisão ou evidência suficiente, conforme aplicável:

* comportamento concorrente residual entre operações de ciclo de vida e pedidos de transferência, apenas onde não estiver coberto pelas LEDG-2046/2048;
* contratos das não conformidades e histórico do Validador;
* regras finais de Catálogo de Modelos;
* consistência entre fonte editorial dinâmica, estática e PDF;
* acessibilidade real dos PDFs;
* acessibilidade e responsividade da experiência web no contexto final.

## 19. Estado da revisão profunda

A primeira revisão profunda está concluída para todos os guias que não pertenciam já ao grupo **Validado no âmbito actual**:

* D02, Organizações e permissões;
* D04, Publicar e gerir Conjuntos de Dados;
* D05, Recursos de um Conjunto de Dados;
* D06, Explorador de dados;
* D07, Qualidade e validação de dados;
* D08, APIs e serviços de dados;
* D09, Reutilizações;
* D10, Harvester;
* D11, Seguir conteúdos e notificações;
* D12, Discussões e comunidade;
* D13, Perfil e actividade;
* CM, Catálogo de Modelos.

D01, D03 e D14 permanecem **Validado no âmbito actual**, sujeitos apenas às passagens finais de consistência, terminologia, acessibilidade, imagens e nova evidência funcional que altere o comportamento.

A próxima fase deixa de ser investigação ampla. Passa a ser:

1. executar apenas os testes PRD autenticados mínimos já identificados em cada revisão;
2. corrigir divergências editoriais objectivas na fonte do Manual;
3. sincronizar a fonte editorial, rotas estáticas, pesquisa, sitemap e PDFs;
4. executar revisão de acessibilidade e responsividade;
5. preparar critérios objectivos para candidatura a merge em `main`.

Prioridade editorial imediata: D04, D11, D13 e D09, porque já existem diferenças concretas entre o conteúdo actual do guia e o comportamento observado em PRD.

## 20. Critério para marcar um guia como Validado

Um guia só passa a **Validado no âmbito actual** quando:

1. todas as fichas têm fonte funcional ou evidência de implementação identificável;
2. regras sensíveis de perfil, permissão, estado e validação estão confirmadas;
3. não contém funcionalidades futuras apresentadas como actuais;
4. mensagens e terminologia estão alinhadas com a interface aplicável;
5. as dependências e questões em aberto que afectem o percurso estão resolvidas ou explicitamente fora de âmbito;
6. a experiência web foi verificada quanto a navegação, responsividade e acessibilidade;
7. o PDF correspondente foi validado quanto a conteúdo e, antes de publicação oficial, também quanto a apresentação visual e acessibilidade documental.

## 21. Próxima acção

Executar os testes PRD mínimos registados por guia e preparar a ronda de correcções editoriais do conteúdo fonte, começando pelas divergências objectivas encontradas em D04, D11 e D13.
