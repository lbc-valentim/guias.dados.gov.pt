// Dados de conteúdo do protótipo.
// Mantém os conteúdos editoriais separados da lógica de apresentação.

export const guides = [
  {
    "code": "D02",
    "title": "Organizações e permissões",
    "intro": "Encontre uma organização, peça para a integrar e, quando tiver permissões, gira o perfil e os membros.",
    "audience": "Para quem consulta organizações, pretende colaborar ou administra uma entidade no portal.",
    "fichas": [
      {
        "title": "Encontrar uma organização",
        "intro": "Pesquise pelo nome ou pela sigla e abra o perfil público da entidade.",
        "roles": "Consulta pública",
        "steps": [
          "Aceda à área Organizações.",
          "Pesquise pelo nome completo ou pela sigla.",
          "Abra a organização pretendida e confirme a sua identificação.",
          "Consulte a informação e os conteúdos publicados pela entidade."
        ],
        "example": "Para encontrar a Agência para a Reforma Tecnológica do Estado, pesquise pelo nome ou por ARTE.",
        "tip": "Antes de criar uma organização, confirme se a entidade já está registada.",
        "table": null,
        "media": "Captura do percurso da organização com dados fictícios, sem expor informação pessoal ou administrativa sensível.",
        "next": "Integrar uma organização."
      },
      {
        "title": "Integrar uma organização",
        "intro": "Pode pedir adesão a uma organização ou responder a um convite recebido.",
        "roles": "Utilizador autenticado",
        "steps": [
          "Para pedir adesão, abra o perfil da organização e seleccione Pedir adesão.",
          "Preencha a informação pedida, envie o pedido e aguarde a decisão de quem gere a organização.",
          "Se recebeu um convite, abra-o na sua área pessoal e confirme qual é a organização.",
          "Aceite ou recuse o convite de acordo com a sua decisão."
        ],
        "example": "A Ana envia um pedido para colaborar com uma entidade. Se a iniciativa partir da entidade, a Ana responde ao convite recebido.",
        "tip": "O pedido de adesão é tratado por quem gere a organização. O convite deve ser aceite ou recusado pela pessoa convidada.",
        "table": null,
        "media": "Captura do percurso da organização com dados fictícios, sem expor informação pessoal ou administrativa sensível.",
        "next": "Criar uma organização."
      },
      {
        "title": "Criar uma organização",
        "intro": "Registe uma entidade que ainda não exista no portal.",
        "roles": "Utilizador autenticado",
        "steps": [
          "Pesquise primeiro a entidade pelo nome e pela sigla.",
          "Inicie o registo de uma organização e indique o nome e a sigla, quando aplicável.",
          "Descreva a actividade e a missão da entidade.",
          "Adicione o website e o logótipo, quando aplicável, respeitando as indicações do formulário.",
          "Reveja a informação e conclua o registo pela acção apresentada."
        ],
        "example": "Ao registar um município, use a designação oficial e uma descrição curta da sua actividade.",
        "tip": "Se encontrar a entidade na pesquisa inicial, utilize o percurso Integrar uma organização.",
        "table": null,
        "media": "Captura do percurso da organização com dados fictícios, sem expor informação pessoal ou administrativa sensível.",
        "next": "Gerir pedidos e membros."
      },
      {
        "title": "Gerir pedidos e membros",
        "intro": "Trate pedidos de adesão e mantenha os membros e os seus papéis actualizados.",
        "roles": "Administrador da organização ou do portal",
        "steps": [
          "Abra a organização na administração e entre na área Membros.",
          "Nos pedidos pendentes, confirme a pessoa e a informação apresentada; aceite ou recuse o pedido de adesão.",
          "Para adicionar um membro, use a opção disponível, pesquise a pessoa e seleccione o papel a atribuir.",
          "Para alterar um papel, abra a edição do membro, escolha o papel e guarde; confirme o resultado na lista.",
          "Para remover um membro, confirme a pessoa, seleccione a remoção e leia a confirmação antes de prosseguir."
        ],
        "example": "Uma administradora aceita um pedido de adesão e confirma o papel que a pessoa terá na equipa.",
        "tip": "Antes de remover ou alterar o papel de um administrador, assegure que outra pessoa mantém a administração da organização.",
        "table": null,
        "media": "Captura do percurso da organização com dados fictícios, sem expor informação pessoal ou administrativa sensível.",
        "next": "Editar uma organização."
      },
      {
        "title": "Editar uma organização",
        "intro": "Actualize a informação pública da entidade.",
        "roles": "Membro com permissão de edição",
        "steps": [
          "Abra a organização que pretende actualizar.",
          "Seleccione Editar ou entre no perfil da organização na administração.",
          "Altere a informação necessária, como nome, descrição, website ou logótipo.",
          "Guarde e confirme que as alterações foram aplicadas.",
          "Utilize Ver perfil público, quando disponível, para verificar a apresentação."
        ],
        "example": "Se o website institucional mudou, actualize esse campo e confirme o resultado no perfil público.",
        "tip": "A gestão de emblemas tem uma permissão própria. Se a gravação falhar, registe a acção e a mensagem apresentada ao pedir apoio.",
        "table": null,
        "media": "Captura do percurso da organização com dados fictícios, sem expor informação pessoal ou administrativa sensível.",
        "next": "Emblemas da organização."
      },
      {
        "title": "Emblemas da organização",
        "intro": "Consulte os emblemas apresentados no perfil público da entidade.",
        "roles": "Consulta pública; gestão pela administração do portal",
        "steps": [
          "Abra o perfil público da organização.",
          "Consulte os emblemas e a informação explicativa apresentada.",
          "Se administra o portal e precisa de gerir emblemas, abra o perfil da organização na administração.",
          "Na secção Emblemas, efectue a alteração autorizada, guarde e confirme o resultado."
        ],
        "example": "Uma pessoa consulta os emblemas de uma entidade antes de explorar os dados que publica.",
        "tip": "Pertencer à organização, mesmo como administrador da entidade, não dá acesso à gestão de emblemas.",
        "table": null,
        "media": "Captura do percurso da organização com dados fictícios, sem expor informação pessoal ou administrativa sensível.",
        "next": "Encontrar uma organização."
      }
    ]
  },
  {
    "code": "D03",
    "title": "Encontrar e consultar dados",
    "intro": "Encontre Conjuntos de Dados, refine a pesquisa e escolha como aceder à informação.",
    "audience": "Não precisa de iniciar sessão para pesquisar e consultar Conjuntos de Dados públicos.",
    "fichas": [
      {
        "title": "Encontrar dados",
        "intro": "Comece pelo tema que lhe interessa.",
        "roles": "",
        "steps": [
          "Aceda à área Conjuntos de Dados.",
          "Escreva uma palavra ou expressão no campo de pesquisa.",
          "Consulte os resultados e abra o Conjunto de Dados que lhe parece mais adequado."
        ],
        "example": "Para procurar informação sobre transportes em Lisboa, pesquise “transportes Lisboa”.",
        "tip": "Comece com poucas palavras. Pode refinar a pesquisa depois.",
        "table": null,
        "media": "Captura do catálogo com o campo de pesquisa destacado.",
        "next": "Pesquisar e filtrar"
      },
      {
        "title": "Pesquisar e filtrar",
        "intro": "Combine a pesquisa com os filtros disponíveis para reduzir os resultados.",
        "roles": "",
        "steps": [
          "Pesquise pelo tema pretendido.",
          "Abra os filtros e aplique os critérios que lhe interessam.",
          "Ajuste a ordenação e percorra as páginas de resultados.",
          "Remova ou altere os filtros se a pesquisa ficar demasiado restrita."
        ],
        "example": "Pesquise “qualidade da água” e refine os resultados com os filtros disponíveis que se adequem à sua pesquisa.",
        "tip": "Um resultado vazio pode dever-se à combinação de critérios. Retire um filtro de cada vez.",
        "table": null,
        "media": "Captura da pesquisa e dos filtros; vídeo curto a aplicar e remover um filtro.",
        "next": "Consultar um Conjunto de Dados"
      },
      {
        "title": "Consultar um Conjunto de Dados",
        "intro": "Antes de utilizar os dados, confirme o conteúdo e as condições de utilização.",
        "roles": "",
        "steps": [
          "Leia o título e a descrição.",
          "Identifique quem publicou os dados e consulte as datas e a cobertura indicadas.",
          "Consulte a licença para compreender as condições de utilização.",
          "Verifique os recursos e os conteúdos relacionados disponíveis."
        ],
        "example": "Se procura acidentes rodoviários de um determinado ano, confirme o período abrangido antes de descarregar o ficheiro.",
        "tip": "O título, a descrição, as datas e a licença fazem parte dos metadados, a informação que descreve o Conjunto de Dados.",
        "table": null,
        "media": "Captura do detalhe com entidade, datas, licença e recursos identificados.",
        "next": "Aceder aos dados"
      },
      {
        "title": "Aceder aos dados",
        "intro": "Escolha a opção adequada ao que pretende fazer com o recurso.",
        "roles": "",
        "steps": [
          "No detalhe do Conjunto de Dados, aceda a Ficheiros.",
          "Escolha um recurso e seleccione Ver mais.",
          "Consulte os separadores disponíveis e escolha a forma de acesso."
        ],
        "example": "Use a pré-visualização para confirmar o conteúdo. Para trabalhar fora do portal, consulte Downloads. Para analisar no portal, seleccione Explorar dados, quando disponível.",
        "tip": "Nem todas as opções estão disponíveis em todos os recursos. Uma falha da pré-visualização não impede a consulta de Metadados e Downloads.",
        "table": [
          [
            "Pretendo",
            "Opção"
          ],
          [
            "Ver rapidamente o conteúdo",
            "Pré-visualização"
          ],
          [
            "Guardar o ficheiro disponibilizado",
            "Downloads"
          ],
          [
            "Aceder a uma fonte externa",
            "Ligação do recurso"
          ],
          [
            "Analisar no portal",
            "Explorar dados"
          ]
        ],
        "media": "Captura de um recurso expandido e vídeo curto das opções de acesso.",
        "next": "Não encontrou o que procura?"
      },
      {
        "title": "Não encontrou o que procura?",
        "intro": "Experimente outros termos ou critérios antes de concluir que os dados não existem.",
        "roles": "",
        "steps": [
          "Use menos palavras ou uma expressão diferente.",
          "Remova os filtros activos.",
          "Procure a entidade que poderá publicar os dados e consulte os conteúdos relacionados.",
          "Se precisar de apoio, consulte Ajuda e contactos."
        ],
        "example": "Se “rendas médias Lisboa” não devolver resultados, experimente “rendas Lisboa” ou “habitação”.",
        "tip": "Sem resultados e erro são situações diferentes. Perante um erro, tente novamente; se persistir, reporte o problema através de Ajuda e contactos.",
        "table": null,
        "media": "Captura do estado sem resultados e da ligação a Ajuda e contactos.",
        "next": "Voltar à visão geral"
      }
    ],
    "resources": [
      {
        "title": "Minicurso: O que são dados abertos?",
        "url": "https://dados.gov.pt/pt/recursos/aprender/minicursos/o-que-sao-dados-abertos"
      },
      {
        "title": "Minicurso: Licenças",
        "url": "https://dados.gov.pt/pt/recursos/aprender/minicursos/licencas"
      }
    ]
  },
  {
    "code": "D04",
    "title": "Publicar e gerir Conjuntos de Dados",
    "intro": "Crie um Conjunto de Dados, publique a informação e mantenha os seus metadados, estado e responsabilidade.",
    "audience": "Inicie sessão e confirme que tem permissão no contexto pessoal ou na organização onde pretende actuar.",
    "fichas": [
      {
        "title": "Encontrar os Conjuntos de Dados que gere",
        "intro": "Escolha o contexto certo antes de procurar um conteúdo.",
        "roles": "Utilizador autenticado",
        "steps": [
          "Na área de gestão, escolha Meu perfil para os seus Conjuntos de Dados pessoais, sem organização associada, ou seleccione a organização pretendida.",
          "Pesquise pelo título, sigla ou acrónimo, ou descrição.",
          "Ajuste o filtro de estado, a ordenação e a paginação.",
          "Seleccione o Conjunto de Dados para abrir o detalhe e as acções a que tem acesso."
        ],
        "example": "Para encontrar um conteúdo arquivado de uma organização, seleccione essa organização e o filtro Arquivado.",
        "tip": "O filtro Todos apresenta Públicos e Rascunhos. Arquivados e Eliminados têm filtros próprios. O contexto Sistema exige a permissão administrativa aplicável.",
        "table": null,
        "media": "Captura dos contextos e do filtro de estado.",
        "next": "Criar e guardar um rascunho"
      },
      {
        "title": "Criar e guardar um rascunho",
        "intro": "Prepare a informação antes de a tornar pública.",
        "roles": "Utilizador autenticado",
        "steps": [
          "Escolha o contexto pessoal ou a organização em que tem permissão para criar.",
          "Inicie a criação de um Conjunto de Dados.",
          "Preencha os metadados disponíveis e confirme a licença adequada entre as opções apresentadas no formulário.",
          "Guarde como Rascunho para continuar mais tarde."
        ],
        "example": "Pode guardar o título e a descrição enquanto aguarda a informação necessária para completar os restantes metadados.",
        "tip": "Um Rascunho pode ser guardado com metadados obrigatórios em falta. O conteúdo ainda não fica disponível ao público.",
        "table": null,
        "media": "Captura da criação e da acção de guardar rascunho.",
        "next": "Publicar um Conjunto de Dados"
      },
      {
        "title": "Publicar um Conjunto de Dados",
        "intro": "A publicação torna o conteúdo público imediatamente após a conclusão.",
        "roles": "Utilizador autenticado",
        "steps": [
          "Abra o Rascunho que pretende publicar.",
          "Complete os metadados obrigatórios assinalados no formulário e reveja a informação.",
          "Se pretende disponibilizar ficheiros ou ligações, adicione os recursos e confirme os respectivos metadados.",
          "Seleccione a acção de publicar e verifique o resultado."
        ],
        "example": "Depois de completar os metadados de um Conjunto de Dados sobre transportes, publique-o e confirme a informação apresentada ao público.",
        "tip": "Pode publicar sem recursos, após o aviso apresentado. A ausência de modelo ou validação, Não conforme e Erro técnico também não bloqueiam a publicação. Não existe aprovação editorial intermédia no portal.",
        "table": null,
        "media": "Captura da revisão e publicação, incluindo o aviso de ausência de recursos.",
        "next": "Editar a informação publicada"
      },
      {
        "title": "Editar a informação publicada",
        "intro": "Mantenha os metadados actualizados no contexto em que tem permissão.",
        "roles": "Utilizador autenticado",
        "steps": [
          "Abra o Conjunto de Dados e seleccione a edição.",
          "Altere os metadados necessários. A licença existente mantém-se, salvo alteração explícita.",
          "Quando o produtor é uma organização, reveja o ponto de contacto e preencha-o conforme o formulário o solicitar.",
          "Reveja e guarde as alterações."
        ],
        "example": "Actualize a descrição para esclarecer a cobertura dos dados, mantendo a licença quando as condições de utilização não mudaram.",
        "tip": "Num Conjunto de Dados público, as alterações guardadas têm efeito imediato. Cancelar antes de guardar descarta as alterações. O portal não disponibiliza versões recuperáveis dos metadados.",
        "table": null,
        "media": "Captura dos metadados em edição.",
        "next": "Arquivar e voltar a disponibilizar"
      },
      {
        "title": "Arquivar e voltar a disponibilizar",
        "intro": "Arquive um Conjunto de Dados público quando pretende retirá-lo das listagens públicas.",
        "roles": "Utilizador autenticado",
        "steps": [
          "Abra o Conjunto de Dados público no contexto autorizado.",
          "Seleccione a acção de arquivar e conclua a operação apresentada.",
          "Para o voltar a incluir nas listagens públicas, localize-o com o filtro Arquivado.",
          "Seleccione a acção de desarquivar. O estado regressa a Público."
        ],
        "example": "Pode arquivar um conteúdo que deixou de ser actualizado e desarquivá-lo quando voltar a ser pertinente.",
        "tip": "Arquivar retira o conteúdo das listagens públicas, mas mantém o acesso aplicável por ligação directa. Não use o arquivo como garantia de retirada total de acesso.",
        "table": null,
        "media": "Captura das acções e dos estados Público e Arquivado.",
        "next": "Transferir a responsabilidade"
      },
      {
        "title": "Transferir a responsabilidade",
        "intro": "A transferência só altera o responsável quando o destinatário autorizado aceita o pedido.",
        "roles": "Utilizador autenticado",
        "steps": [
          "Abra um Conjunto de Dados que pode modificar e que não esteja Arquivado nem Eliminado.",
          "Seleccione Transferir o Conjunto de Dados.",
          "No campo Organização ou utilizador, escolha o destinatário. Preencha Comentário se quiser contextualizar o pedido.",
          "Reveja e confirme. O pedido fica Pendente e o responsável actual mantém-se.",
          "O destinatário recebe um email e pode consultar, aceitar ou recusar o pedido, conforme as suas permissões."
        ],
        "example": "Transfira um conteúdo pessoal para a organização que passará a ser responsável por o manter. A mudança concretiza-se após a aceitação.",
        "tip": "A aceitação preserva o estado, os metadados, os recursos e o histórico. Uma recusa mantém o responsável anterior. Pode cancelar antes de submeter o pedido.",
        "table": null,
        "media": "Sequência do formulário de transferência e da decisão do destinatário.",
        "next": "Eliminar um Conjunto de Dados"
      },
      {
        "title": "Eliminar um Conjunto de Dados",
        "intro": "A eliminação é uma operação administrativa e não permite recuperação no portal.",
        "roles": "Administrador",
        "steps": [
          "Com perfil Administrador e a permissão aplicável, abra o Conjunto de Dados.",
          "Seleccione a acção de eliminar e reveja o conteúdo identificado.",
          "Confirme apenas se pretende concluir a eliminação.",
          "Para consulta posterior autorizada, utilize o filtro Eliminados enquanto o registo existir."
        ],
        "example": "Antes de eliminar um conteúdo criado por engano, confirme o título e o contexto para evitar actuar sobre outro Conjunto de Dados.",
        "tip": "O conteúdo deixa de ser público. A eliminação preserva os registos e o histórico, mas nenhum perfil dispõe de recuperação ou expurgo definitivo no portal.",
        "table": null,
        "media": "Captura da confirmação de eliminação e do filtro Eliminados.",
        "next": "Voltar à visão geral"
      }
    ],
    "resources": [
      {
        "title": "Minicurso: Metadados & Standards",
        "url": "https://dados.gov.pt/pt/recursos/aprender/minicursos/metadados-and-standards"
      },
      {
        "title": "Minicurso: Licenças",
        "url": "https://dados.gov.pt/pt/recursos/aprender/minicursos/licencas"
      }
    ]
  },
  {
    "code": "D05",
    "title": "Recursos de um Conjunto de Dados",
    "intro": "Disponibilize os dados através de ficheiros ou ligações e mantenha os recursos actualizados.",
    "audience": "Para gerir recursos, inicie sessão como Editor ou Administrador com permissão sobre o Conjunto de Dados.",
    "fichas": [
      {
        "title": "Adicionar ficheiros",
        "intro": "Cada ficheiro aceite origina um recurso próprio.",
        "roles": "Editor ou Administrador",
        "steps": [
          "Aceda à gestão de recursos do Conjunto de Dados e seleccione a opção de adicionar.",
          "Escolha carregar ficheiros e seleccione-os ou arraste-os para a área indicada.",
          "Aguarde o resultado do carregamento.",
          "Para cada recurso, preencha o título, o tipo e o formato, além do tipo de recurso e do ficheiro. A descrição é opcional.",
          "Corrija os campos assinalados e conclua a operação."
        ],
        "example": "Carregue dois ficheiros com dados de anos diferentes e atribua a cada recurso um título que identifique o ano correspondente.",
        "tip": "XML é admitido até 100 MB; os restantes tipos até 800 MB. SVG e HTML não são permitidos. O tamanho e o tipo MIME são preenchidos automaticamente quando disponíveis.",
        "table": null,
        "media": "Captura do carregamento múltiplo e dos metadados de cada recurso.",
        "next": "Adicionar uma ligação"
      },
      {
        "title": "Adicionar uma ligação",
        "intro": "Use um recurso remoto quando os dados são disponibilizados noutro endereço.",
        "roles": "Editor ou Administrador",
        "steps": [
          "Na gestão de recursos, escolha adicionar um recurso remoto.",
          "Indique a URL e preencha o título, o tipo e o formato aplicáveis.",
          "Acrescente uma descrição, se necessário.",
          "Reveja e conclua a operação."
        ],
        "example": "Adicione a ligação para um ficheiro disponibilizado no sítio da entidade e use a descrição para explicar o seu conteúdo.",
        "tip": "Ligações externas, APIs e serviços de dados apresentam Não aplicável para validação. Adicionar a ligação não equivale a carregar o ficheiro no portal.",
        "table": null,
        "media": "Captura de criação de recurso remoto com URL e metadados.",
        "next": "Editar metadados ou uma ligação"
      },
      {
        "title": "Editar metadados ou uma ligação",
        "intro": "Actualize a descrição do recurso ou o endereço de acesso quando necessário.",
        "roles": "Editor ou Administrador",
        "steps": [
          "Abra o recurso na área de gestão.",
          "Altere o título, o tipo, a descrição ou o formato, conforme necessário.",
          "Num recurso remoto, actualize a URL se o endereço mudou.",
          "Reveja e guarde."
        ],
        "example": "Se a entidade mudou o endereço de um ficheiro, actualize a ligação do recurso existente.",
        "tip": "Alterar apenas metadados não inicia nem invalida a validação aplicável ao ficheiro actual. Uma ligação remota continua com Não aplicável. Num Conjunto de Dados público, as alterações concluídas são imediatas.",
        "table": null,
        "media": "Captura dos metadados e da alteração de URL.",
        "next": "Substituir o ficheiro de um recurso"
      },
      {
        "title": "Substituir o ficheiro de um recurso",
        "intro": "Substitua o conteúdo quando pretende actualizar o ficheiro do mesmo recurso.",
        "roles": "Editor ou Administrador",
        "steps": [
          "Abra o recurso e seleccione a substituição do ficheiro.",
          "Escolha o novo ficheiro e aguarde o resultado do carregamento.",
          "Se o novo ficheiro for elegível e existir modelo anterior, decida se pretende seleccionar Herdar modelo de validação. A opção começa desmarcada.",
          "Conclua a substituição e confira o estado da validação."
        ],
        "example": "Ao substituir um CSV actualizado, seleccione Herdar modelo de validação se pretende conservar a versão e a configuração do modelo anterior. O novo conteúdo fica Por validar.",
        "tip": "O ficheiro novo nunca herda o resultado anterior. Sem herança fica Sem modelo; se não for elegível, fica Não aplicável. A validação tem de ser solicitada. Se a substituição falhar, o conteúdo anterior mantém-se.",
        "table": null,
        "media": "Captura da substituição, da herança desmarcada e do estado resultante.",
        "next": "Remover um recurso"
      },
      {
        "title": "Remover um recurso",
        "intro": "Confirme qual o recurso que pretende retirar antes de concluir.",
        "roles": "Editor ou Administrador",
        "steps": [
          "Abra a lista de recursos do Conjunto de Dados.",
          "Seleccione a remoção do recurso pretendido.",
          "Reveja a confirmação e confirme a operação.",
          "Verifique que o recurso deixou de constar da lista."
        ],
        "example": "Se adicionou o mesmo ficheiro duas vezes, identifique o recurso duplicado antes de o remover.",
        "tip": "Cancelar a confirmação mantém o recurso. Remover o último recurso não altera automaticamente o estado do Conjunto de Dados.",
        "table": null,
        "media": "Captura da confirmação de remoção.",
        "next": "Consultar o recurso disponibilizado"
      },
      {
        "title": "Consultar o recurso disponibilizado",
        "intro": "Verifique como os dados são apresentados a quem os consulta.",
        "roles": "",
        "steps": [
          "Abra o detalhe do Conjunto de Dados e aceda a Ficheiros.",
          "No recurso pretendido, seleccione Ver mais.",
          "Consulte Metadados e Downloads e, quando apresentados, Pré-visualização e Estrutura de dados.",
          "Use Explorar dados quando a acção estiver disponível."
        ],
        "example": "Depois de actualizar um ficheiro, confirme o título, os metadados e a opção de acesso apresentada no detalhe.",
        "tip": "A pré-visualização simples suporta CSV, TSV, XLS, XLSX e ODS, mas depende da obtenção e leitura do conteúdo. O Explorador e o Validador têm condições próprias. A ausência de validação não bloqueia, por si só, o acesso.",
        "table": null,
        "media": "Captura de recurso com pré-visualização e outro apenas com Metadados e Downloads.",
        "next": "Voltar à visão geral"
      }
    ],
    "resources": [
      {
        "title": "Minicurso: Metadados & Standards",
        "url": "https://dados.gov.pt/pt/recursos/aprender/minicursos/metadados-and-standards"
      }
    ]
  },
  {
    "code": "D06",
    "title": "Explorador de dados",
    "intro": "Consulte uma tabela, aplique filtros, crie gráficos e exporte a informação apresentada.",
    "audience": "Aceda ao recurso que pretende consultar. A opção Explorar dados depende da disponibilidade do conteúdo e das permissões de acesso.",
    "fichas": [
      {
        "title": "Abrir o Explorador",
        "intro": "Entre a partir do recurso que pretende analisar.",
        "roles": "",
        "steps": [
          "No detalhe do recurso, seleccione Explorar dados, quando disponível.",
          "Aguarde a abertura da área Dados.",
          "Navegue entre Dados, Estrutura, Métricas e Gráfico."
        ],
        "example": "Abra um recurso tabular sobre transportes para consultar os registos antes de escolher os filtros.",
        "tip": "O Explorador suporta CSV, TXT tabular delimitado, XLS e XLSX após processamento bem-sucedido e disponibilização dos dados. Nos ficheiros Excel, apresenta a folha disponibilizada pelo processamento, sem selector de folhas.",
        "table": null,
        "media": "Captura da entrada e das quatro áreas do Explorador.",
        "next": "Filtrar os resultados"
      },
      {
        "title": "Filtrar os resultados",
        "intro": "Os filtros restringem os Dados e o Gráfico. A Estrutura e as Métricas continuam a representar o recurso completo.",
        "roles": "",
        "steps": [
          "Em qualquer área, seleccione Filtrar Resultados.",
          "Escolha os filtros das colunas pretendidas e preencha os valores no formato indicado.",
          "Aplique os filtros e consulte os resultados.",
          "Para remover todos os filtros, incluindo os de colunas ocultas, seleccione Limpar."
        ],
        "example": "Num recurso com município e data, filtre um município e uma data. Os resultados têm de cumprir as duas condições.",
        "tip": "Os filtros combinam-se por “e”. Ocultar uma coluna não retira o seu filtro. Limpar remove os filtros, mas mantém a visibilidade das colunas. Para uma data, use o formato YYYY-MM-DD, como 2026-08-01.",
        "table": null,
        "media": "Captura do painel com dois filtros e da acção Limpar.",
        "next": "Ordenar e escolher as colunas"
      },
      {
        "title": "Ordenar e escolher as colunas",
        "intro": "Adapte a tabela ao que precisa de consultar.",
        "roles": "",
        "steps": [
          "Na área Dados, escolha a coluna pela qual pretende ordenar.",
          "Defina as colunas que quer manter visíveis.",
          "Escolha 10, 50 ou 200 registos por página.",
          "Percorra as páginas para consultar os restantes resultados."
        ],
        "example": "Mantenha visíveis apenas o município, a data e o valor que pretende analisar, e ordene pela data.",
        "tip": "A ordenação utiliza uma coluna de cada vez. A tabela inicia com 10 registos por página. Os filtros de colunas ocultas continuam activos.",
        "table": null,
        "media": "Captura da selecção de colunas, ordenação e paginação.",
        "next": "Consultar a estrutura e as métricas"
      },
      {
        "title": "Consultar a estrutura e as métricas",
        "intro": "Conheça as colunas e os indicadores disponíveis para o recurso completo.",
        "roles": "",
        "steps": [
          "Abra Estrutura para consultar a identificação do recurso, os campos e os tipos e formatos disponibilizados.",
          "Abra Métricas para consultar os indicadores globais e por coluna existentes.",
          "Confirme o significado e a disponibilidade de cada indicador antes de o interpretar."
        ],
        "example": "Mesmo que filtre um município na tabela, as métricas continuam a descrever o recurso completo.",
        "tip": "Uma métrica não disponível não significa zero. As métricas podem ajudar a compreender os dados, mas esta área não produz alertas automáticos de qualidade.",
        "table": null,
        "media": "Captura de Estrutura e Métricas com o âmbito completo identificado.",
        "next": "Criar e guardar um gráfico"
      },
      {
        "title": "Criar e guardar um gráfico",
        "intro": "O gráfico representa os registos da página actual, até 200.",
        "roles": "",
        "steps": [
          "Abra Gráfico e escolha o tipo pretendido.",
          "Seleccione os eixos e as séries entre as colunas compatíveis. Em Bolhas, escolha também a coluna numérica para o raio.",
          "Ajuste os filtros e a paginação para seleccionar os registos representados.",
          "Use o modo de ecrã inteiro para ampliar ou exporte o gráfico em PNG."
        ],
        "example": "Para comparar valores entre municípios presentes na página actual, escolha Barras e configure as colunas de município e valor.",
        "tip": "Os gráficos não calculam Soma ou Contagem. Anel, Circular e Área polar usam uma série de valores. Para sair do ecrã inteiro, use o controlo disponível ou Esc. Pode consultar a informação na tabela.",
        "table": [
          [
            "Tipos disponíveis",
            "Utilização das colunas"
          ],
          [
            "Linha, Barras e Radar",
            "Dimensão ou categorias e valores numéricos"
          ],
          [
            "Anel, Circular e Área polar",
            "Categorias e uma série de valores"
          ],
          [
            "Dispersão",
            "Eixos numéricos"
          ],
          [
            "Bolhas",
            "Eixos numéricos e valor numérico para o raio"
          ]
        ],
        "media": "Captura do gráfico configurado, paginação e exportação PNG.",
        "next": "Exportar os dados apresentados"
      },
      {
        "title": "Exportar os dados apresentados",
        "intro": "A exportação do Explorador inclui apenas a página actual e as colunas visíveis.",
        "roles": "",
        "steps": [
          "Ajuste os filtros, a ordenação, a página e as colunas visíveis.",
          "Em Dados, Estrutura, Métricas ou Gráfico, seleccione Exportar CSV ou Exportar JSON.",
          "Guarde o ficheiro e confirme o conteúdo exportado."
        ],
        "example": "Se a página apresenta 50 registos e três colunas visíveis, a exportação contém esses registos e essas três colunas.",
        "tip": "Para obter o ficheiro original completo, regresse ao detalhe do recurso e consulte Downloads, quando disponível. Exportar a partir de Métricas não exporta as métricas.",
        "table": null,
        "media": "Captura da exportação com a página e as colunas visíveis assinaladas.",
        "next": "Guardar ou partilhar uma exploração"
      },
      {
        "title": "Guardar ou partilhar uma exploração",
        "intro": "Guarde o endereço para retomar a configuração suportada sobre o conteúdo disponível.",
        "roles": "",
        "steps": [
          "Configure a área, os filtros, a ordenação, a página, as colunas e, se necessário, o gráfico.",
          "Copie o endereço do navegador.",
          "Guarde ou partilhe a ligação e volte a abri-la para retomar a exploração."
        ],
        "example": "Partilhe a ligação depois de filtrar um município para que outro utilizador possa abrir essa configuração, desde que tenha acesso ao recurso.",
        "tip": "A ligação não concede permissões nem fixa uma cópia dos dados. Após uma actualização do recurso, configurações incompatíveis podem ser removidas, com informação ao utilizador.",
        "table": null,
        "media": "Captura de uma exploração configurada e do endereço para partilha.",
        "next": "Resolver ausência de resultados ou indisponibilidade"
      },
      {
        "title": "Resolver ausência de resultados ou indisponibilidade",
        "intro": "Identifique a situação apresentada antes de tentar novamente.",
        "roles": "",
        "steps": [
          "Se os filtros não devolverem resultados, altere os critérios ou seleccione Limpar.",
          "Se um filtro for inválido, corrija o campo indicado.",
          "Se ocorrer uma falha temporária, seleccione Tentar novamente.",
          "Se o conteúdo estiver em processamento, volte a consultar quando os dados estiverem disponíveis."
        ],
        "example": "Depois de substituir um ficheiro, o Explorador pode ficar indisponível durante o novo processamento.",
        "tip": "Durante o reprocessamento, os dados anteriores não são apresentados como actuais. Recurso não encontrado, erro e pesquisa sem resultados são situações distintas.",
        "table": null,
        "media": "Capturas dos estados sem resultados, em processamento e erro com nova tentativa.",
        "next": "Voltar à visão geral"
      }
    ]
  },
  {
    "code": "D07",
    "title": "Qualidade e validação de dados",
    "intro": "Associe um modelo a um ficheiro tabular, execute a validação e interprete o resultado no contexto do conteúdo validado.",
    "audience": "Para associar modelos ou executar validações, inicie sessão como Editor ou Administrador com permissão sobre o Conjunto de Dados.",
    "fichas": [
      {
        "title": "Compreender o resultado da validação",
        "intro": "A validação verifica se o ficheiro cumpre a estrutura, os tipos e as regras de uma versão do modelo.",
        "roles": "",
        "steps": [
          "Consulte o estado apresentado no recurso.",
          "Quando existir resultado, confirme o ficheiro e a versão do modelo a que se aplica.",
          "Interprete o resultado em conjunto com a descrição, a cobertura e a licença dos dados."
        ],
        "example": "Um ficheiro pode estar Válido perante o modelo e, ainda assim, abranger um período diferente do que procura.",
        "tip": "Válido significa que o ficheiro cumpre as verificações do modelo. Não é uma garantia geral de qualidade ou adequação. A ausência de validação não impede, por si só, a publicação, consulta ou exploração.",
        "table": [
          [
            "Estado",
            "Significado"
          ],
          [
            "Não aplicável",
            "O recurso não é elegível"
          ],
          [
            "Sem modelo",
            "É elegível, mas não tem modelo associado"
          ],
          [
            "Por validar",
            "Tem modelo, mas não tem resultado actual aplicável"
          ],
          [
            "Em validação",
            "A execução está em curso"
          ],
          [
            "Válido",
            "Cumpre as verificações do modelo"
          ],
          [
            "Não conforme",
            "Foi identificada pelo menos uma não conformidade"
          ],
          [
            "Erro técnico",
            "A execução não pôde ser concluída"
          ]
        ],
        "media": "Captura de um resumo de validação aplicável ao conteúdo actual.",
        "next": "Associar um modelo de validação"
      },
      {
        "title": "Associar um modelo de validação",
        "intro": "A associação é opcional e identifica uma versão exacta do modelo.",
        "roles": "Editor ou Administrador",
        "steps": [
          "Abra a área de validação de um recurso elegível: ficheiro carregado em CSV, TXT tabular, XLS, XLSX ou ODS.",
          "Escolha um modelo Activo e a versão Em vigor disponibilizada.",
          "Reveja Validar a ordem das colunas, activa por defeito.",
          "Confirme a associação. O recurso fica Por validar."
        ],
        "example": "Associe um modelo com as colunas esperadas para os dados de transportes que está a disponibilizar.",
        "tip": "Se desactivar a validação da ordem, as colunas são comparadas pelo nome. Colunas em falta ou adicionais continuam a ser não conformidades. Ligações externas, APIs e serviços de dados não são elegíveis.",
        "table": null,
        "media": "Captura do selector de modelo, versão e ordem das colunas.",
        "next": "Executar a validação"
      },
      {
        "title": "Executar a validação",
        "intro": "A validação começa quando a solicita. Carregar ou editar o recurso não a inicia automaticamente.",
        "roles": "Editor ou Administrador",
        "steps": [
          "Confirme que o recurso tem um modelo associado.",
          "Seleccione a acção de validar.",
          "Acompanhe o estado Em validação.",
          "Consulte o resultado final e o detalhe disponível."
        ],
        "example": "Depois de associar o modelo, execute a validação para verificar se o ficheiro cumpre as regras seleccionadas.",
        "tip": "Não conforme e Erro técnico não bloqueiam a gestão do recurso nem a publicação ou actualização do Conjunto de Dados. Um erro técnico não é um resultado de conformidade.",
        "table": null,
        "media": "Sequência Por validar, Em validação e resultado final.",
        "next": "Tratar não conformidades ou erros"
      },
      {
        "title": "Tratar não conformidades ou erros",
        "intro": "Use o detalhe disponível para decidir o que precisa de corrigir.",
        "roles": "Editor ou Administrador",
        "steps": [
          "Se o resultado for Não conforme, consulte as colunas, regras ou ocorrências identificadas, quando disponíveis.",
          "Confirme se o ficheiro ou o modelo escolhido precisa de correcção.",
          "Se corrigiu o ficheiro fora do portal, substitua-o e confirme a associação de modelo.",
          "Solicite uma nova validação. Perante Erro técnico, pode tentar novamente."
        ],
        "example": "Se faltar uma coluna exigida pelo modelo, corrija o ficheiro ou confirme se associou o modelo adequado antes de repetir a validação.",
        "tip": "Uma substituição bem-sucedida retira ao resultado anterior o carácter de resultado actual. Herdar o modelo conserva a versão e a configuração, mas exige uma nova validação.",
        "table": null,
        "media": "Captura de não conformidade e erro técnico, sem prometer detalhe que não esteja disponível.",
        "next": "Alterar ou remover o modelo associado"
      },
      {
        "title": "Alterar ou remover o modelo associado",
        "intro": "Altere a associação quando pretende validar o recurso com outra definição.",
        "roles": "Editor ou Administrador",
        "steps": [
          "Abra a associação de modelo do recurso.",
          "Para a alterar, seleccione um modelo Activo e a versão Em vigor disponibilizada.",
          "Confirme a nova associação e solicite a validação quando necessário.",
          "Para deixar de utilizar um modelo, remova a associação."
        ],
        "example": "Se foi disponibilizada uma nova versão adequada ao recurso, seleccione-a explicitamente para passar a validar com essa definição.",
        "tip": "Alterar a associação coloca o recurso em Por validar. Removê-la coloca-o em Sem modelo. As versões novas e a inactivação de um modelo não alteram automaticamente associações existentes.",
        "table": null,
        "media": "Captura da alteração e remoção da associação.",
        "next": "Consultar o histórico de validações"
      },
      {
        "title": "Consultar o histórico de validações",
        "intro": "Cada execução fica ligada ao ficheiro e à versão do modelo utilizados nessa validação.",
        "roles": "Editor ou Administrador",
        "steps": [
          "Abra o histórico de validação do recurso.",
          "Identifique a execução pela data, ficheiro, modelo e versão.",
          "Consulte o resultado e as não conformidades disponíveis.",
          "Distinga o resultado aplicável ao conteúdo actual dos resultados históricos."
        ],
        "example": "Depois de substituir um CSV, consulte a execução anterior para perceber quais as verificações feitas sobre o ficheiro substituído.",
        "tip": "Alterar apenas os metadados mantém a validação aplicável ao ficheiro. Uma execução antiga que termine após a substituição não passa a validar o novo conteúdo.",
        "table": null,
        "media": "Captura do histórico com data, ficheiro, modelo, versão e resultado.",
        "next": "Voltar à visão geral"
      }
    ],
    "resources": [
      {
        "title": "Minicurso: Metadados & Standards",
        "url": "https://dados.gov.pt/pt/recursos/aprender/minicursos/metadados-and-standards"
      }
    ]
  },
  {
    "code": "D08",
    "title": "APIs e serviços de dados",
    "intro": "Consulte a API do dados.gov.pt, conheça as APIs registadas no catálogo e prepare a publicação e manutenção da API da sua organização.",
    "audience": "Para pessoas que integram dados em aplicações e membros de organizações que pretendem registar uma API no portal.",
    "fichas": [
      {
        "title": "Escolher a API adequada",
        "intro": "A API do portal dá acesso programático ao catálogo. Uma API registada no catálogo tem o seu próprio endereço e documentação, que deve consultar antes de a utilizar.",
        "roles": "Consulta pública",
        "steps": [
          "Se pretende consultar ou integrar informação do catálogo, abra a referência da API do dados.gov.pt na área de desenvolvimento.",
          "Se procura uma API disponibilizada por uma entidade, consulte o seu registo no catálogo.",
          "Leia a descrição e a documentação associada para confirmar se a API responde à sua necessidade.",
          "Distinga o endereço da página no portal da URL base usada para comunicar com a API."
        ],
        "example": "Uma equipa consulta a API do portal para recolher metadados do catálogo. Para usar um serviço de uma entidade, consulta a documentação ligada ao respectivo registo.",
        "tip": "Registar uma API no catálogo não substitui a preparação e disponibilização do serviço pela entidade responsável.",
        "table": null,
        "media": "Referência da API do portal e registo de uma API, com os destinos identificados.",
        "next": "Consultar a referência da API do portal."
      },
      {
        "title": "Consultar a referência da API do portal",
        "intro": "A referência permite identificar as operações disponíveis, os parâmetros e a informação devolvida.",
        "roles": "Consulta pública e utilizador autenticado para escrita",
        "steps": [
          "Se está a começar, percorra o tutorial da API; utilize a referência para consultar operações e parâmetros.",
          "Abra a referência da API do portal e consulte a documentação interactiva ou a ligação para Swagger.",
          "Localize a operação pretendida e leia os parâmetros e a estrutura da resposta.",
          "Para leitura de informação pública, siga a operação de consulta documentada. Quando a resposta for paginada, consulte as páginas seguintes indicadas na própria resposta.",
          "Para operações de escrita, obtenha uma chave nas definições do perfil e forneça-a no cabeçalho X-API-KEY. As permissões da conta continuam a aplicar-se.",
          "Se precisar da definição da API nas suas ferramentas, utilize a opção de descarregar a especificação OpenAPI em JSON.",
          "Antes de alterar ou eliminar conteúdos, reveja o pedido: o tutorial alerta que estas operações são definitivas e não disponibiliza uma área de testes."
        ],
        "example": "Uma equipa consulta os metadados de organizações e percorre as páginas devolvidas para obter os restantes resultados.",
        "tip": "Guarde a chave de forma reservada. Não a inclua em exemplos partilhados, capturas ou pedidos de apoio. Nos resultados paginados, next_page e previous_page indicam os endereços de navegação; null indica que não existe página nesse sentido.",
        "table": null,
        "media": "Referência e ligação para Swagger. Não mostrar uma chave real.",
        "next": "Consultar uma API do catálogo."
      },
      {
        "title": "Consultar uma API do catálogo",
        "intro": "O registo reúne a descrição da API e as ligações que ajudam a compreender o serviço e os dados associados.",
        "roles": "Consulta pública",
        "steps": [
          "Abra o detalhe da API que pretende conhecer.",
          "Leia a descrição, a documentação funcional e a informação de acesso apresentada.",
          "Consulte a URL base e, quando disponível, a documentação Swagger para preparar a integração.",
          "Na área de informações, abra os Conjuntos de Dados associados que pretende consultar.",
          "Consulte as informações técnicas do registo, incluindo identificador, data de criação e última actualização."
        ],
        "example": "Uma pessoa abre o detalhe de uma API e consulta um dos Conjuntos de Dados relacionados antes de preparar a integração.",
        "tip": "A data de actualização do registo não confirma, por si só, a actualização de todos os dados devolvidos pelo serviço.",
        "table": null,
        "media": "Detalhe com informações técnicas, documentação e dados relacionados.",
        "next": "Preparar e registar uma API."
      },
      {
        "title": "Preparar e registar uma API",
        "intro": "A criação de uma API no catálogo é feita em nome de uma organização com o emblema Serviço público da qual o utilizador seja membro. Esta regra também se aplica a administradores do portal.",
        "roles": "Membro de organização com emblema Serviço público",
        "steps": [
          "Confirme que pertence à organização que vai publicar a API e que esta tem o emblema Serviço público.",
          "Prepare a descrição do serviço, a URL base, as ligações de documentação e as condições de acesso.",
          "Inicie a criação de uma API e seleccione a organização elegível no campo Produtor.",
          "Preencha a informação pedida no formulário. No tipo de acesso, escolha Aberto, Aberto com conta ou Restrito de acordo com o serviço. Para acesso restrito, prepare as audiências, condições e motivo da restrição.",
          "No passo de associação de Conjuntos de Dados, seleccione os que correspondem ao serviço. Esta associação é opcional.",
          "No passo final, escolha guardar como rascunho ou publicar. Consulte a listagem para confirmar o resultado."
        ],
        "example": "Uma organização com o emblema Serviço público prepara o registo da sua API, associa um Conjunto de Dados e guarda o rascunho para revisão interna.",
        "tip": "Confirme o produtor e a informação guardada antes de publicar. A regra de criação não altera retroactivamente as APIs pessoais já existentes.",
        "table": null,
        "media": "Produtor com organização fictícia, campos de acesso e decisão final entre rascunho e publicação.",
        "next": "Actualizar uma API e os dados associados."
      },
      {
        "title": "Actualizar uma API e os dados associados",
        "intro": "Mantenha o registo alinhado com o serviço e reveja as ligações aos Conjuntos de Dados.",
        "roles": "Utilizador com acesso à edição da API",
        "steps": [
          "Localize a API na sua área de gestão e abra a edição.",
          "Reveja o formulário preenchido e actualize a descrição, URL base, documentação ou outras informações que mudaram.",
          "Na secção Conjuntos de dados associados, pesquise e seleccione os conjuntos que pretende acrescentar.",
          "Para retirar uma associação, remova o conjunto da selecção.",
          "Guarde e volte a abrir o registo para confirmar as alterações e os dados associados."
        ],
        "example": "Uma entidade actualiza a documentação funcional da API e acrescenta à selecção um Conjunto de Dados que passou a ser disponibilizado pelo serviço.",
        "tip": "A remoção de um conjunto da selecção altera a associação ao registo da API. Não use esta acção como procedimento de eliminação do Conjunto de Dados.",
        "table": null,
        "media": "Edição com dados associados apresentados como elementos removíveis e acção Guardar.",
        "next": "Resolver dificuldades com uma API."
      },
      {
        "title": "Resolver dificuldades com uma API",
        "intro": "Identifique se o problema afecta o registo no portal, as permissões da conta ou a comunicação com o serviço.",
        "roles": "Utilizador da API ou editor do registo",
        "steps": [
          "Se não consegue criar uma API, confirme a pertença à organização e o emblema Serviço público.",
          "Se uma chamada à API do portal falhar, compare a operação com a referência e confirme a chave e as permissões quando forem necessárias.",
          "Se o problema ocorrer numa API do catálogo, consulte a documentação indicada no seu registo para verificar o endereço e as condições de acesso.",
          "Se uma alteração ao registo não ficar guardada, registe a página, a acção e a mensagem apresentada.",
          "Ao pedir apoio, indique qual a API afectada e descreva o resultado esperado e o observado, omitindo credenciais e dados pessoais desnecessários."
        ],
        "example": "Um editor não consegue iniciar a criação de uma API. Confirma que a organização seleccionada ainda não tem o emblema exigido.",
        "tip": "Não confunda a chave da API do portal com credenciais eventualmente exigidas por outro serviço.",
        "table": null,
        "media": "Exemplo de reporte sem credenciais nem dados pessoais reais.",
        "next": "Organizações e permissões ou Ajuda e contactos."
      }
    ],
    "resources": [
      {
        "title": "Tutorial da API do dados.gov.pt",
        "url": "https://dados.gov.pt/pt/recursos/desenvolvimento/tutorial-api"
      },
      {
        "title": "Referência da API do dados.gov.pt",
        "url": "https://dados.gov.pt/pt/recursos/desenvolvimento/referencia-api"
      }
    ]
  },
  {
    "code": "D09",
    "title": "Reutilizações",
    "intro": "Encontre trabalhos baseados em dados e prepare, publique ou actualize uma reutilização no portal.",
    "audience": "Para pessoas que consultam reutilizações e utilizadores que publicam trabalhos em nome próprio ou no contexto de uma organização.",
    "fichas": [
      {
        "title": "Encontrar e consultar reutilizações",
        "intro": "Conheça os trabalhos que reutilizam dados.",
        "roles": "Consulta pública",
        "steps": [
          "Abra a página de Reutilizações e pesquise pelo assunto pretendido.",
          "Reveja os termos e filtros quando precisar de ajustar os resultados.",
          "Abra uma reutilização e leia a descrição e as etiquetas apresentadas.",
          "Consulte os dados e as ligações disponibilizadas para compreender o trabalho."
        ],
        "example": "Uma pessoa pesquisa reutilizações sobre mobilidade e abre uma publicação para conhecer o trabalho desenvolvido.",
        "tip": "Se não encontrar resultados, reveja os critérios antes de concluir que não existe uma publicação relevante.",
        "table": null,
        "media": "Captura do percurso da reutilização com dados fictícios, sem expor dados pessoais reais.",
        "next": "A tarefa seguinte deste guia."
      },
      {
        "title": "Preparar uma reutilização",
        "intro": "Prepare uma apresentação clara do trabalho e identifique quem o publica.",
        "roles": "Utilizador com acesso à criação",
        "steps": [
          "Na área de gestão, inicie a criação de uma reutilização.",
          "Preencha a informação pedida sobre o trabalho, incluindo nome, endereço e descrição.",
          "Seleccione o produtor, o tipo e o tema adequados entre as opções disponíveis.",
          "Acrescente palavras-chave e a imagem de capa, respeitando as indicações do formulário.",
          "Reveja a informação e avance para a associação de dados."
        ],
        "example": "Uma equipa descreve uma aplicação de consulta de transportes e indica o seu endereço e produtor.",
        "tip": "Seleccionar uma palavra-chave nova não a guarda por si só. A persistência depende da gravação do conteúdo ao avançar.",
        "table": null,
        "media": "Captura do percurso da reutilização com dados fictícios, sem expor dados pessoais reais.",
        "next": "A tarefa seguinte deste guia."
      },
      {
        "title": "Associar os dados utilizados",
        "intro": "Identifique as fontes usadas no trabalho.",
        "roles": "Editor da reutilização",
        "steps": [
          "Escolha conjuntos publicados no portal ou ligações para conjuntos externos.",
          "Para dados do portal, pesquise e seleccione um ou vários Conjuntos de Dados.",
          "Para dados de outros portais, indique os respectivos endereços. O título e a descrição de cada ligação são opcionais.",
          "Reveja os itens e avance. A associação é opcional, mas não combine dados do portal e ligações externas na mesma reutilização."
        ],
        "example": "Uma pessoa selecciona dois Conjuntos de Dados do portal usados numa análise.",
        "tip": "Use a pesquisa para conjuntos deste portal. O campo de ligação externa destina-se a dados de outros portais.",
        "table": null,
        "media": "Captura do percurso da reutilização com dados fictícios, sem expor dados pessoais reais.",
        "next": "A tarefa seguinte deste guia."
      },
      {
        "title": "Publicar ou manter em rascunho",
        "intro": "A reutilização fica guardada como rascunho ao concluir o primeiro passo. Torná-la pública exige uma acção de publicação.",
        "roles": "Editor da reutilização",
        "steps": [
          "No passo final, reveja a informação e os dados associados.",
          "Se precisar de revisão, mantenha o rascunho para continuar posteriormente na área de gestão.",
          "Quando estiver pronto, escolha Publicar a reutilização.",
          "Confirme o resultado e consulte a publicação no portal."
        ],
        "example": "Uma equipa mantém o rascunho para rever a descrição antes de publicar.",
        "tip": "Avançar entre passos não significa que o trabalho já esteja público. Confirme o estado antes de partilhar a publicação.",
        "table": null,
        "media": "Captura do percurso da reutilização com dados fictícios, sem expor dados pessoais reais.",
        "next": "A tarefa seguinte deste guia."
      },
      {
        "title": "Actualizar uma reutilização",
        "intro": "Mantenha a apresentação do trabalho e as referências aos dados actualizadas.",
        "roles": "Utilizador com acesso à edição",
        "steps": [
          "Localize a reutilização na área de gestão e abra a edição.",
          "Reveja a informação preenchida e altere o que deixou de estar actualizado.",
          "Na área de Conjuntos de Dados, confira as associações e as ligações externas existentes.",
          "Se alterar ou remover uma ligação externa, reveja a lista a manter. Título e descrição da ligação são opcionais.",
          "Guarde e volte a abrir a reutilização para confirmar as alterações."
        ],
        "example": "Uma editora corrige o endereço de uma fonte externa e acrescenta uma descrição.",
        "tip": "Confirme a informação guardada, sobretudo quando remove ligações. A transferência de gestão tem um percurso próprio.",
        "table": null,
        "media": "Captura do percurso da reutilização com dados fictícios, sem expor dados pessoais reais.",
        "next": "A tarefa seguinte deste guia."
      },
      {
        "title": "Resolver dificuldades numa reutilização",
        "intro": "Identifique se a dificuldade ocorre na pesquisa, no preenchimento ou na publicação.",
        "roles": "Utilizador ou editor",
        "steps": [
          "Se a pesquisa não apresentar o esperado, reveja os termos e filtros.",
          "Se não conseguir avançar na associação, confirme que não combinou dados do portal com ligações externas.",
          "Se um campo for recusado, leia a indicação apresentada e reveja o valor.",
          "Se não encontrar a publicação, confirme na área de gestão se continua em rascunho.",
          "Ao pedir apoio, indique a página, a acção e a mensagem, sem incluir palavras-passe."
        ],
        "example": "Uma pessoa não consegue avançar porque seleccionou dados locais e uma ligação externa. Revê as fontes e mantém uma modalidade.",
        "tip": "Se precisar de alterar a responsabilidade e não encontrar essa acção no ecrã, consulte Ajuda e contactos.",
        "table": null,
        "media": "Captura do percurso da reutilização com dados fictícios, sem expor dados pessoais reais.",
        "next": "Ajuda e contactos."
      }
    ],
    "resources": [
      {
        "title": "Minicurso: O que são reutilizações de dados abertos?",
        "url": "https://dados.gov.pt/pt/recursos/aprender/minicursos/o-que-sao-reutilizacoes-de-dados-abertos"
      },
      {
        "title": "Minicurso: Licenças",
        "url": "https://dados.gov.pt/pt/recursos/aprender/minicursos/licencas"
      }
    ]
  },
  {
    "code": "D10",
    "title": "Harvester",
    "intro": "Prepare uma fonte, consulte a configuração e acompanhe os trabalhos de Harvester que integram dados no portal.",
    "audience": "Para membros de organizações que acompanham fontes de Harvester e administradores do sistema que as validam e gerem.",
    "fichas": [
      {
        "title": "Preparar uma fonte de Harvester",
        "intro": "Reúna a informação sobre a origem dos dados antes de configurar a integração.",
        "roles": "Responsável pela preparação da fonte",
        "steps": [
          "Identifique a organização responsável e o endereço da fonte de dados.",
          "Prepare um nome e uma descrição que permitam reconhecer o conteúdo da fonte.",
          "Confirme o tipo de fonte a utilizar entre as opções disponibilizadas no ambiente.",
          "Identifique se precisa de limitar os dados através de filtros e quais os valores a usar.",
          "Confirme com o administrador o acesso necessário para criar a fonte e a sua validação."
        ],
        "example": "Uma organização prepara o endereço do seu catálogo e identifica as etiquetas dos dados que pretende integrar.",
        "tip": "Os tipos disponíveis dependem do ambiente. Não seleccione um tipo diferente apenas para contornar uma dificuldade no formulário.",
        "table": null,
        "media": "Captura do percurso do Harvester com fonte e organização fictícias, sem expor dados ou credenciais reais.",
        "next": "Consultar e actualizar a configuração."
      },
      {
        "title": "Consultar e actualizar a configuração",
        "intro": "O editor consulta a configuração. O administrador da organização pode alterar nome, descrição e filtros.",
        "roles": "Editor ou administrador da organização",
        "steps": [
          "Abra a listagem de Harvesters da organização e localize a fonte.",
          "Abra o detalhe pelo nome ou use o ícone de edição para entrar em Configuração.",
          "Consulte o produtor, o nome, a descrição e a configuração apresentada.",
          "Se for administrador da organização, actualize apenas os campos permitidos: nome, descrição e filtros. URL, tipo e planeamento não são editáveis neste perfil.",
          "Guarde as alterações e volte a consultar a fonte para confirmar o resultado."
        ],
        "example": "Um administrador corrige a descrição da fonte. Um editor da mesma organização consulta essa informação sem a alterar.",
        "tip": "Uma opção desactivada pode corresponder às permissões do seu perfil. Confirme o contexto da organização antes de pedir apoio.",
        "table": null,
        "media": "Captura do percurso do Harvester com fonte e organização fictícias, sem expor dados ou credenciais reais.",
        "next": "Configurar e rever filtros."
      },
      {
        "title": "Configurar e rever filtros",
        "intro": "Os filtros permitem seleccionar os dados a considerar. As opções dependem do tipo de Harvester.",
        "roles": "Administrador com permissão para editar os filtros",
        "steps": [
          "Na Configuração, localize a secção de filtros quando o tipo de fonte a disponibiliza.",
          "Escolha a chave do filtro entre as opções apresentadas e indique o valor pretendido.",
          "Seleccione o modo Incluir ou Excluir de acordo com a selecção que pretende preparar.",
          "Guarde e volte a abrir a configuração para confirmar que os filtros ficaram registados.",
          "Utilize a pré-visualização autorizada para rever os resultados antes de uma execução real."
        ],
        "example": "Uma organização configura um filtro de etiqueta para seleccionar dados de mobilidade e revê os resultados apresentados.",
        "tip": "Não deduza como vários filtros se combinam. Confirme os resultados e a regra aplicável ao tipo de fonte.",
        "table": null,
        "media": "Captura do percurso do Harvester com fonte e organização fictícias, sem expor dados ou credenciais reais.",
        "next": "Pré-visualizar os resultados."
      },
      {
        "title": "Pré-visualizar os resultados",
        "intro": "A pré-visualização permite rever os resultados da configuração sem os publicar como uma execução real.",
        "roles": "Utilizador com permissão de pré-visualização da fonte",
        "steps": [
          "Abra a Configuração da fonte e reveja os valores apresentados.",
          "Se tiver permissão, seleccione Pré-visualização.",
          "Consulte os itens e avisos devolvidos. Compare a origem e a selecção com o que pretende integrar.",
          "Se tiver acesso apenas de leitura, reveja a configuração guardada. A pré-visualização de alterações ainda não guardadas exige direitos de edição.",
          "Se o resultado divergir do esperado, reveja os filtros ou peça apoio ao responsável pela configuração."
        ],
        "example": "Um editor consulta os resultados da configuração guardada e comunica ao administrador que falta um grupo de dados esperado.",
        "tip": "A disponibilidade da acção depende da permissão sobre a fonte. Ter uma conta autenticada não concede, por si só, acesso a todas as pré-visualizações.",
        "table": null,
        "media": "Captura do percurso do Harvester com fonte e organização fictícias, sem expor dados ou credenciais reais.",
        "next": "Consultar trabalhos e resultados."
      },
      {
        "title": "Consultar trabalhos e resultados",
        "intro": "Consulte os trabalhos para acompanhar os resultados apresentados e identificar dificuldades.",
        "roles": "Utilizador com acesso ao Harvester",
        "steps": [
          "Abra o detalhe do Harvester e entre em Trabalhos.",
          "Localize o trabalho que pretende consultar e abra o seu detalhe.",
          "Reveja os itens apresentados e a informação que os acompanha.",
          "Utilize a navegação entre páginas e Linhas por página para consultar os restantes itens.",
          "Se precisar de apoio, indique a fonte, o trabalho e o resultado observado, sem partilhar credenciais."
        ],
        "example": "Um editor abre um trabalho e aumenta o número de linhas por página para rever os itens apresentados.",
        "tip": "Uma lista vazia não permite concluir que todos os dados foram integrados. Verifique o trabalho e a configuração antes de repetir a operação.",
        "table": null,
        "media": "Captura do percurso do Harvester com fonte e organização fictícias, sem expor dados ou credenciais reais.",
        "next": "Aprovar ou rejeitar uma fonte, quando aplicável."
      },
      {
        "title": "Aprovar ou rejeitar uma fonte",
        "intro": "A decisão de validação de uma fonte pendente pertence ao administrador do sistema.",
        "roles": "Administrador do sistema",
        "steps": [
          "Na administração do sistema, localize uma fonte com validação pendente.",
          "Reveja a configuração e a informação disponível sobre a fonte.",
          "Escolha Aprovar ou Rejeitar na listagem ou no detalhe, conforme a acção apresentada.",
          "Ao rejeitar, preencha o motivo. Ao aprovar, o comentário é opcional.",
          "Confirme a decisão e verifique o novo estado. Se ocorrer um erro, consulte a mensagem antes de repetir."
        ],
        "example": "Um administrador rejeita uma fonte e indica que o endereço precisa de ser corrigido.",
        "tip": "A aprovação da fonte e a execução do Harvester são operações distintas. Não interprete a aprovação como confirmação de importação dos dados.",
        "table": null,
        "media": "Captura do percurso do Harvester com fonte e organização fictícias, sem expor dados ou credenciais reais.",
        "next": "Consultar trabalhos e resultados."
      }
    ]
  },
  {
    "code": "D11",
    "title": "Favoritos e notificações",
    "intro": "Guarde conteúdos nos favoritos e consulte os avisos associados à sua actividade no portal.",
    "audience": "Para utilizadores autenticados e administradores que consultam notificações.",
    "fichas": [
      {
        "title": "Adicionar aos favoritos",
        "intro": "Adicione uma organização, um conjunto de dados, uma reutilização ou uma API aos favoritos.",
        "roles": "Utilizador autenticado",
        "steps": [
          "Abra o conteúdo que pretende adicionar aos favoritos.",
          "Inicie sessão se o portal indicar que é necessário.",
          "Seleccione Adicionar aos favoritos na área de acções do conteúdo.",
          "Confirme que a acção passa a Remover dos favoritos."
        ],
        "example": "Uma pessoa adiciona aos favoritos um conjunto de dados sobre transportes que consulta regularmente.",
        "tip": "Adicionar aos favoritos não dá permissão para editar o conteúdo e não garante o envio de notificações sobre as suas alterações.",
        "table": null,
        "media": "Captura do percurso com conteúdo de demonstração e sem dados pessoais reais.",
        "next": "Remover dos favoritos."
      },
      {
        "title": "Remover dos favoritos",
        "intro": "Remova dos favoritos um conteúdo que deixou de querer guardar nessa relação.",
        "roles": "Utilizador autenticado",
        "steps": [
          "Abra o conteúdo com a conta que utilizou para o adicionar aos favoritos.",
          "Seleccione Remover dos favoritos.",
          "Confirme que a acção Adicionar aos favoritos volta a estar disponível."
        ],
        "example": "Uma pessoa remove dos favoritos uma reutilização que já não consulta regularmente.",
        "tip": "Remover dos favoritos altera apenas essa relação com o conteúdo. Não deve ser interpretado como gestão das notificações da conta.",
        "table": null,
        "media": "Captura do percurso com conteúdo de demonstração e sem dados pessoais reais.",
        "next": "Consultar uma notificação."
      },
      {
        "title": "Consultar uma notificação",
        "intro": "Leia o aviso e confirme o conteúdo a que se refere antes de agir.",
        "roles": "Utilizador autenticado com notificações disponíveis",
        "steps": [
          "Na administração, abra a área de notificações disponibilizada à sua conta.",
          "Seleccione o aviso e leia a informação apresentada.",
          "Abra a ligação associada, quando existir, e confirme o conteúdo de destino.",
          "Se o aviso solicitar uma decisão, consulte o contexto e utilize apenas as acções disponíveis para o seu perfil."
        ],
        "example": "Um administrador abre um aviso sobre uma fonte de harvesting e consulta o detalhe antes de decidir.",
        "tip": "O tipo de aviso depende do evento e do seu papel. Adicionar um conteúdo aos favoritos não garante o envio de notificações sobre as suas alterações.",
        "table": null,
        "media": "Captura do percurso com conteúdo de demonstração e sem dados pessoais reais.",
        "next": "Tratar um aviso de validação de harvester."
      },
      {
        "title": "Tratar um aviso de validação de harvester",
        "intro": "Consulte a fonte associada ao pedido de validação.",
        "roles": "Administrador do portal",
        "steps": [
          "Abra a notificação e confirme o nome da fonte de harvesting.",
          "Siga a ligação para o detalhe da fonte.",
          "Reveja a informação necessária à validação.",
          "Utilize a acção de aprovação ou rejeição disponibilizada no detalhe, conforme a decisão tomada.",
          "Volte às notificações e confirme o tratamento do aviso."
        ],
        "example": "Um administrador recebe um pedido de validação, consulta a fonte e regista a decisão no seu detalhe.",
        "tip": "Marcar um aviso como lido, quando essa opção está disponível, não aprova nem rejeita a fonte.",
        "table": null,
        "media": "Captura do percurso com conteúdo de demonstração e sem dados pessoais reais.",
        "next": "Resolver dificuldades com notificações."
      },
      {
        "title": "Resolver dificuldades com notificações",
        "intro": "Verifique a conta, o conteúdo e o aviso antes de repetir uma acção.",
        "roles": "Utilizador autenticado",
        "steps": [
          "Confirme que iniciou sessão com a conta destinatária.",
          "Se uma ligação falhar, procure o conteúdo no portal e consulte o seu estado actual.",
          "Se já tomou uma decisão, confirme o resultado no conteúdo antes de repetir a operação.",
          "Se precisar de apoio, indique o tipo de aviso, o momento em que o recebeu e a mensagem de erro apresentada."
        ],
        "example": "Uma ligação recebida não abre o detalhe. A pessoa localiza o conteúdo no portal e confirma a informação antes de agir.",
        "tip": "Não partilhe palavras-passe ou chaves da API ao reportar uma dificuldade.",
        "table": null,
        "media": "Captura do percurso com conteúdo de demonstração e sem dados pessoais reais.",
        "next": "Consultar uma notificação."
      }
    ]
  },
  {
    "code": "D12",
    "title": "Discussões e comunidade",
    "intro": "Consulte as discussões de um conteúdo, coloque uma questão e participe na conversa com informação útil para quem utiliza os dados.",
    "audience": "Para pessoas que consultam o portal, utilizadores autenticados que participam e membros com acesso às discussões da sua organização.",
    "fichas": [
      {
        "title": "Consultar as discussões de um conteúdo",
        "intro": "Leia as questões e respostas já publicadas antes de iniciar uma conversa.",
        "roles": "Consulta pública",
        "steps": [
          "Abra o detalhe do Conjunto de Dados e seleccione Discussões.",
          "Consulte os títulos, autores, datas e respostas apresentados.",
          "Utilize a pesquisa disponibilizada para localizar o assunto pretendido e abra a discussão.",
          "Leia a conversa e confirme a que conteúdo se refere."
        ],
        "example": "Uma pessoa consulta as discussões de um Conjunto de Dados para perceber o significado de uma coluna.",
        "tip": "Se não houver discussões, a área apresenta o estado correspondente. O detalhe de uma API também dispõe de um separador Discussões.",
        "table": null,
        "media": "Captura do percurso de discussões com conteúdo fictício, sem dados pessoais reais.",
        "next": "Iniciar uma discussão."
      },
      {
        "title": "Iniciar uma discussão",
        "intro": "Coloque uma questão relacionada com o conteúdo que está a consultar.",
        "roles": "Utilizador autenticado",
        "steps": [
          "No separador Discussões do conteúdo, seleccione Iniciar nova discussão.",
          "Se ainda não iniciou sessão, autentique-se quando o portal o solicitar.",
          "Preencha o formulário apresentado, identificando o assunto e explicando a questão.",
          "Reveja a informação e utilize a acção de submissão disponível.",
          "Confirme que a discussão aparece no conteúdo correcto."
        ],
        "example": "Uma utilizadora pergunta qual é a unidade de medida usada num recurso do Conjunto de Dados.",
        "tip": "Indique o recurso ou campo relevante. Evite publicar credenciais ou dados pessoais desnecessários.",
        "table": null,
        "media": "Captura do percurso de discussões com conteúdo fictício, sem dados pessoais reais.",
        "next": "Responder a uma discussão."
      },
      {
        "title": "Responder a uma discussão",
        "intro": "Acrescente informação à conversa existente quando o assunto já está em discussão.",
        "roles": "Utilizador autenticado com acesso à participação",
        "steps": [
          "Abra a discussão e leia as mensagens anteriores.",
          "Utilize a opção de resposta disponibilizada na discussão.",
          "Escreva a informação que pretende acrescentar e reveja o texto.",
          "Envie a resposta e confirme que aparece na conversa. Se necessário, volte a abrir a discussão para verificar o resultado."
        ],
        "example": "Um editor responde à pergunta sobre a unidade de medida e indica onde consultar a descrição do recurso.",
        "tip": "Uma ligação recebida por email pode abrir o Conjunto de Dados no separador Discussões. Confirme sempre o conteúdo e a conversa antes de responder.",
        "table": null,
        "media": "Captura do percurso de discussões com conteúdo fictício, sem dados pessoais reais.",
        "next": "Consultar discussões da organização."
      },
      {
        "title": "Consultar discussões da organização",
        "intro": "Use o contexto da organização para localizar as discussões que pode acompanhar.",
        "roles": "Membro com acesso à área de discussões da organização",
        "steps": [
          "Na administração, seleccione a organização pretendida.",
          "Abra a área de Discussões e localize a conversa.",
          "Abra o detalhe e confirme o conteúdo a que a discussão está associada.",
          "Consulte ou responda através das acções disponibilizadas para a sua conta."
        ],
        "example": "Uma editora selecciona a sua organização e abre uma discussão relacionada com os dados publicados pela entidade.",
        "tip": "Confirme a organização seleccionada. A presença de uma área de gestão não permite presumir direitos de edição, encerramento ou eliminação de todas as discussões.",
        "table": null,
        "media": "Captura do percurso de discussões com conteúdo fictício, sem dados pessoais reais.",
        "next": "Resolver dificuldades nas discussões."
      },
      {
        "title": "Resolver dificuldades nas discussões",
        "intro": "Identifique se o problema ocorre na procura, na participação ou no acesso à conversa.",
        "roles": "Leitor ou participante",
        "steps": [
          "Se não encontrar o assunto, reveja os termos de pesquisa e confirme o conteúdo consultado.",
          "Se o portal solicitar autenticação para participar, inicie sessão e volte à discussão.",
          "Se a resposta não aparecer, volte a abrir a conversa e confirme o resultado antes de enviar novamente.",
          "Se uma ligação recebida falhar, abra o conteúdo no portal e consulte o separador Discussões.",
          "Se o problema persistir, indique a página, a acção e a mensagem apresentada ao pedir apoio."
        ],
        "example": "Uma pessoa recebe uma ligação que não abre a conversa. Localiza o Conjunto de Dados no portal e consulta as suas discussões.",
        "tip": "Descreva o resultado esperado e o observado. Partilhe apenas a informação necessária para reproduzir a dificuldade.",
        "table": null,
        "media": "Captura do percurso de discussões com conteúdo fictício, sem dados pessoais reais.",
        "next": "Ajuda e contactos."
      }
    ]
  },
  {
    "code": "D13",
    "title": "Perfil e actividade",
    "intro": "Actualize a informação do seu perfil e da conta, gira as Chaves da API, encontre os seus conteúdos e consulte a actividade apresentada na sua área pessoal.",
    "audience": "Para utilizadores com conta no dados.gov.pt. A consulta do perfil de outros utilizadores exige autenticação e é distinguida da gestão da própria conta.",
    "fichas": [
      {
        "title": "Actualizar o perfil e a fotografia",
        "intro": "Mantenha a sua apresentação actualizada para que outras pessoas reconheçam quem publica ou participa no portal.",
        "roles": "Utilizador autenticado",
        "steps": [
          "Inicie sessão e abra Meu perfil. Entre na área Perfil e escolha a edição das informações.",
          "Reveja o nome, a biografia e o endereço do seu site. Altere os campos que pretende actualizar.",
          "Para mudar a fotografia, utilize a opção de carregamento. Respeite os formatos e o tamanho indicados junto ao campo.",
          "Se pretender retirar a fotografia, utilize a opção de remoção disponível na edição do perfil.",
          "Guarde as alterações e volte a consultar o perfil para confirmar a informação apresentada."
        ],
        "example": "Uma editora actualiza a biografia para indicar a área em que trabalha e substitui a fotografia do perfil.",
        "tip": "Inclua apenas informação que pretende apresentar a outros utilizadores do portal.",
        "table": null,
        "media": "Edição do perfil com dados fictícios e opções de carregar e remover fotografia.",
        "next": "Alterar o email e a palavra-passe da conta."
      },
      {
        "title": "Alterar o email e a palavra-passe da conta",
        "intro": "Actualize os dados de acesso da conta quando o portal disponibiliza essas opções no seu perfil.",
        "roles": "Utilizador autenticado com conta aplicável",
        "steps": [
          "Inicie sessão e abra Meu perfil.",
          "Na área Perfil, localize a opção para alterar o endereço de email ou a palavra-passe.",
          "Escolha a alteração pretendida e preencha os campos apresentados.",
          "Conclua a confirmação solicitada pelo portal, incluindo a consulta da caixa de correio quando for enviado um link de validação.",
          "Volte ao perfil ou ao acesso à conta e confirme que a alteração ficou concluída."
        ],
        "example": "Uma utilizadora altera o endereço de email da conta e conclui a validação através da mensagem recebida.",
        "tip": "Não partilhe palavras-passe nem links de validação. Se a conta estiver associada a CMD ou eIDAS, siga apenas o percurso apresentado pelo portal para a alteração pretendida.",
        "table": null,
        "media": "Área de Perfil com as opções de alteração de email e palavra-passe, usando dados de demonstração.",
        "next": "Gerir Chaves da API."
      },
      {
        "title": "Gerir Chaves da API",
        "intro": "Crie e elimine Chaves da API a partir da sua área pessoal quando precisar de autenticar pedidos programáticos.",
        "roles": "Utilizador autenticado",
        "steps": [
          "Inicie sessão e abra Meu perfil.",
          "Abra a área Chaves da API.",
          "Para criar uma chave, utilize a acção de geração apresentada pelo portal.",
          "Guarde a chave de forma segura quando o portal a apresentar e utilize-a apenas nas integrações autorizadas.",
          "Para deixar de utilizar uma chave, identifique-a na listagem, utilize a acção de eliminação e confirme o resultado apresentado."
        ],
        "example": "Uma pessoa cria uma Chave da API para uma integração e elimina-a quando deixa de ser necessária.",
        "tip": "Trate a Chave da API como uma credencial. Não a inclua em capturas, exemplos públicos, repositórios ou pedidos de apoio.",
        "table": null,
        "media": "Área Chaves da API com dados de demonstração e sem expor uma chave real.",
        "next": "Consultar o perfil de outro utilizador."
      },
      {
        "title": "Consultar o perfil de outro utilizador",
        "intro": "Consulte a apresentação e os conteúdos de outro utilizador depois de iniciar sessão.",
        "roles": "Utilizador autenticado",
        "steps": [
          "Inicie sessão e abra a ligação para o perfil de um utilizador apresentada num conteúdo do portal.",
          "Consulte o nome, a fotografia, a biografia e o site apresentados, quando disponíveis.",
          "Consulte os Conjuntos de Dados e as Reutilizações que constam desse perfil.",
          "Abra um conteúdo para conhecer o seu detalhe ou aceder aos dados associados."
        ],
        "example": "Ao consultar uma Reutilização, uma pessoa abre o perfil do autor para conhecer outros trabalhos que publicou.",
        "tip": "Uma lista sem conteúdos não indica, por si só, um erro. Consulte os conteúdos efectivamente apresentados.",
        "table": null,
        "media": "Perfil de utilizador com nome, apresentação e conteúdos publicados, sem dados pessoais reais.",
        "next": "Encontrar e consultar dados."
      },
      {
        "title": "Encontrar os seus conteúdos",
        "intro": "Meu perfil reúne áreas de acesso aos conteúdos pessoais. A gestão de uma organização tem o seu próprio contexto.",
        "roles": "Utilizador autenticado",
        "steps": [
          "Inicie sessão e abra Meu perfil.",
          "Escolha a área correspondente: Conjuntos de Dados, API, Reutilizações ou Recursos comunitários.",
          "Localize o conteúdo pretendido. Utilize a ordenação disponibilizada na listagem para facilitar a procura.",
          "Abra o conteúdo e escolha a acção de gestão disponível para a sua conta.",
          "Se procura conteúdos de uma organização, entre no contexto dessa organização e confirme que está a consultar a área correcta."
        ],
        "example": "Um utilizador abre Meu perfil e escolhe Reutilizações para localizar uma publicação sua.",
        "tip": "A existência de uma conta não concede acesso à gestão de todas as organizações. Consulte o guia Organizações e permissões.",
        "table": null,
        "media": "Meu perfil com as áreas de conteúdos e uma listagem ordenada.",
        "next": "O guia do tipo de conteúdo que pretende gerir."
      },
      {
        "title": "Consultar a actividade da conta",
        "intro": "A área de actividade permite consultar os registos apresentados no seu perfil e reconhecer as acções a que dizem respeito.",
        "roles": "Utilizador autenticado",
        "steps": [
          "Inicie sessão e abra a área Perfil em Meu perfil.",
          "Localize a listagem de actividades.",
          "Leia a acção indicada em cada registo e a informação que a acompanha.",
          "Quando precisar de verificar o estado actual de um conteúdo, abra a respectiva área de gestão."
        ],
        "example": "Um editor consulta a actividade e depois abre o seu Conjunto de Dados para confirmar a informação actualmente guardada.",
        "tip": "Use a actividade como apoio à consulta. Para confirmar o estado de um conteúdo, verifique o próprio conteúdo.",
        "table": null,
        "media": "Listagem de actividades com acções fictícias. Não incluir uma pesquisa ainda não aprovada.",
        "next": "Encontrar os seus conteúdos."
      },
      {
        "title": "Resolver dificuldades no perfil",
        "intro": "Comece por identificar se a dificuldade está no acesso, na edição do perfil ou na localização de conteúdos.",
        "roles": "Utilizador autenticado",
        "steps": [
          "Se não consegue iniciar sessão, consulte Autenticação e acesso à conta.",
          "Se uma fotografia for recusada, compare o ficheiro com os requisitos indicados no campo de carregamento.",
          "Se não encontra um conteúdo, confirme a conta utilizada e se está na área pessoal ou na área da organização.",
          "Se a alteração não ficar guardada ou o problema persistir, abra Ajuda e contactos e descreva a acção, a página e a mensagem apresentada."
        ],
        "example": "Uma pessoa não encontra um Conjunto de Dados em Meu perfil. Confirma que foi publicado pela sua organização e consulta essa área.",
        "tip": "Ao pedir apoio, omita palavras-passe e chaves da API. Uma captura deve mostrar apenas a informação necessária para explicar a dificuldade.",
        "table": null,
        "media": "Exemplo de requisitos junto ao campo da fotografia e ligação para apoio.",
        "next": "Ajuda e contactos."
      }
    ]
  },
  {
    "code": "D14",
    "title": "Ajuda e contactos",
    "intro": "Encontre apoio, contacte a equipa do dados.gov.pt e saiba como encaminhar questões relacionadas com dados e organizações.",
    "audience": "Para quem procura apoio sobre a utilização do portal, pedidos relacionados com dados ou assuntos de uma organização.",
    "fichas": [
      {
        "title": "Consultar Ajuda e contactos",
        "intro": "Comece pela informação de apoio disponível para identificar o canal mais adequado à sua necessidade.",
        "roles": "Consulta pública",
        "steps": [
          "Aceda à página Ajuda e contactos.",
          "Consulte os temas e opções de apoio apresentados.",
          "Escolha a opção que corresponde à sua necessidade.",
          "Se a informação disponível não resolver a questão, utilize o canal de contacto adequado apresentado na página."
        ],
        "example": "Uma pessoa que não encontra a forma correcta de encaminhar uma questão começa por consultar Ajuda e contactos antes de submeter um pedido.",
        "tip": "Escolher o canal adequado ajuda a encaminhar a questão para o contexto correcto.",
        "table": null,
        "media": "Captura da página Ajuda e contactos com as principais opções de apoio identificadas.",
        "next": "Enviar uma pergunta à equipa do dados.gov.pt."
      },
      {
        "title": "Enviar uma pergunta à equipa do dados.gov.pt",
        "intro": "Utilize o formulário Tenho uma pergunta quando precisa de contactar a equipa responsável pelo portal.",
        "roles": "Utilizador da página Ajuda e contactos",
        "steps": [
          "Na página Ajuda e contactos, seleccione Tenho uma pergunta.",
          "Indique o endereço de email solicitado no formulário.",
          "Escolha a categoria aplicável, indique o assunto e escreva a sua pergunta.",
          "Reveja a informação e submeta o pedido.",
          "Confirme o resultado apresentado após a submissão."
        ],
        "example": "Para esclarecer uma dúvida sobre o funcionamento do portal, escolha a categoria adequada e descreva a situação de forma objectiva.",
        "tip": "Ao pedir apoio, indique a página e a acção em causa e evite incluir palavras-passe, chaves da API ou dados pessoais desnecessários.",
        "table": null,
        "media": "Captura do formulário Tenho uma pergunta com dados de demonstração.",
        "next": "Enviar feedback sobre o dados.gov.pt."
      },
      {
        "title": "Enviar feedback sobre o dados.gov.pt",
        "intro": "Utilize o formulário Envie o seu feedback para partilhar uma sugestão ou comentário sobre o portal.",
        "roles": "Pessoa que pretende enviar feedback",
        "steps": [
          "Aceda à página Ajuda e contactos e seleccione Envie o seu feedback.",
          "Preencha os campos apresentados, incluindo o endereço de email, o assunto e o detalhe.",
          "Descreva de forma clara a sugestão, comentário ou experiência que pretende partilhar.",
          "Reveja a informação e submeta o formulário.",
          "Confirme a mensagem apresentada após o envio."
        ],
        "example": "Uma pessoa envia uma sugestão para tornar mais clara a informação apresentada numa página do portal.",
        "tip": "Não inclua palavras-passe, Chaves da API ou dados pessoais desnecessários no feedback.",
        "table": null,
        "media": "Formulário Envie o seu feedback preenchido com dados de demonstração.",
        "next": "Pedir informação ou sugerir um conjunto de dados."
      },
      {
        "title": "Pedir informação ou sugerir um conjunto de dados",
        "intro": "Quando não encontra os dados de que precisa, consulte as orientações disponíveis para encaminhar o pedido.",
        "roles": "Consulta pública; participação quando aplicável",
        "steps": [
          "Na página Ajuda e contactos, consulte a área Pedir um dataset.",
          "Se a dúvida disser respeito a dados publicados, abra o separador Discussões do respectivo Conjunto de Dados.",
          "Se pretende efectuar um pedido formal de dados a uma entidade pública, consulte as orientações apresentadas e a página de perguntas frequentes da CADA indicada pelo portal.",
          "Escolha o percurso adequado ao tipo de pedido que pretende realizar."
        ],
        "example": "Ao precisar de esclarecer a cobertura de dados publicados, coloque a questão nas Discussões do Conjunto de Dados.",
        "tip": "O portal não disponibiliza actualmente um formulário autónomo de sugestão de conjuntos de dados. Um pedido formal de acesso a informação segue o enquadramento indicado na página Ajuda e contactos.",
        "table": null,
        "media": "Captura da área Pedir um dataset e das orientações para discussões e CADA.",
        "next": "Reportar uma questão sobre um conjunto de dados."
      },
      {
        "title": "Reportar uma questão sobre um conjunto de dados",
        "intro": "Quando a questão está ligada a dados já publicados, identifique primeiro o conteúdo e a organização responsável.",
        "roles": "Consulta pública; utilizador autenticado para participar em discussões",
        "steps": [
          "Abra o Conjunto de Dados e identifique a organização responsável pela publicação.",
          "Abra o separador Discussões na página do Conjunto de Dados.",
          "Se precisar de participar, inicie sessão quando o portal o solicitar e descreva a questão com a informação necessária para a compreender.",
          "Acompanhe a discussão no contexto correspondente."
        ],
        "example": "Uma pessoa que tem uma dúvida sobre o significado de um campo identifica a organização responsável e coloca a questão na discussão relacionada com os dados.",
        "tip": "Para uma falha de funcionamento do portal, escolha Reportar um problema em Ajuda e contactos.",
        "table": null,
        "media": "Captura do acesso às discussões a partir de um conteúdo e da identificação da organização responsável.",
        "next": "Solicitar atribuição ou alteração de um emblema."
      },
      {
        "title": "Solicitar atribuição ou alteração de um emblema",
        "intro": "O gestor de uma organização pode pedir um novo emblema ou a alteração de um emblema existente através do formulário de contacto.",
        "roles": "Gestor da organização",
        "steps": [
          "Na página Ajuda e contactos, seleccione Tenho uma pergunta.",
          "No pedido, indique o nome da organização.",
          "Identifique o emblema que pretende solicitar ou alterar.",
          "Inclua a fundamentação quando aplicável e submeta o pedido.",
          "Aguarde a análise da equipa de gestão do portal e a comunicação do resultado por email."
        ],
        "example": "O gestor de uma organização solicita a alteração de um emblema, identificando a entidade, o emblema pretendido e a fundamentação aplicável.",
        "tip": "A submissão do pedido não atribui nem altera automaticamente o emblema. O resultado depende da análise da equipa de gestão do portal.",
        "table": null,
        "media": "Captura da referência aos emblemas em Ajuda e contactos e do formulário Tenho uma pergunta.",
        "next": "Reportar um problema técnico"
      },
      {
        "title": "Reportar um problema técnico",
        "intro": "Descreva a dificuldade de forma que a equipa consiga perceber onde e como acontece.",
        "roles": "Utilizador do portal",
        "steps": [
          "Abra Ajuda e contactos e escolha Reportar um problema.",
          "Indique a página, a acção realizada, o resultado esperado e o que aconteceu.",
          "Acrescente a mensagem de erro e a hora aproximada, se forem relevantes.",
          "Reveja os campos pedidos, conclua a verificação apresentada e confirme o resultado do envio."
        ],
        "example": "Ao adicionar um ficheiro, o carregamento termina com um erro. Indique a página, o formato, o tamanho e os passos realizados.",
        "tip": "Oculte palavras-passe, chaves de acesso e dados pessoais desnecessários.",
        "table": null,
        "media": "Captura do formulário de reporte com dados de demonstração.",
        "next": "Voltar à visão geral."
      }
    ],
    "resources": [
      {
        "title": "Ajuda e contactos: perguntas, problemas e feedback",
        "url": "https://dados.gov.pt/pt/ajuda-e-contactos"
      }
    ]
  },
  {
    "code": "CM",
    "title": "Catálogo de Modelos",
    "intro": "Consulte e administre os modelos que definem a estrutura e as regras utilizadas na validação de ficheiros tabulares.",
    "audience": "O Editor pode consultar modelos, versões e utilização. As operações de criação, alteração, activação, eliminação e auditoria exigem perfil Administrador.",
    "fichas": [
      {
        "title": "Consultar modelos e versões",
        "intro": "O Catálogo é global e permite conhecer a definição e a utilização de cada modelo.",
        "roles": "Editor ou Administrador",
        "steps": [
          "Inicie sessão e abra o Catálogo de Modelos.",
          "Pesquise por nome ou descrição e ajuste o filtro de estado.",
          "Abra um modelo para consultar a identificação, a estrutura, as versões e a utilização.",
          "Regresse à listagem para continuar a pesquisa; os critérios e a página mantêm-se."
        ],
        "example": "Antes de associar um modelo a um recurso, consulte as colunas e as regras esperadas.",
        "tip": "O Editor consulta modelos em Rascunho, Activos e Inactivos, mas não os altera nem acede à auditoria ou aos eliminados. A listagem apresenta 20 resultados por página.",
        "table": null,
        "media": "Captura da listagem e do detalhe de uma versão.",
        "next": "Criar um modelo manualmente"
      },
      {
        "title": "Criar um modelo manualmente",
        "intro": "Defina a estrutura que os ficheiros deverão cumprir.",
        "roles": "Administrador",
        "steps": [
          "Com perfil Administrador, inicie a criação de um modelo e introduza um nome único.",
          "Escolha a criação manual e adicione os campos.",
          "Em cada campo, preencha o nome e seleccione o tipo lógico. Ordene os campos conforme a estrutura pretendida.",
          "Adicione regras compatíveis, se necessário, e guarde. A primeira gravação cria o modelo e a versão v1 em Rascunho."
        ],
        "example": "Crie um modelo para ficheiros com as colunas de município, data e valor, seleccionando os tipos adequados disponibilizados pelo portal.",
        "tip": "O nome do modelo é único, mesmo com diferenças de maiúsculas, acentos ou espaços normalizados. Nomes de modelos eliminados não podem ser reutilizados.",
        "table": null,
        "media": "Captura da criação manual, dos campos e da gravação em Rascunho.",
        "next": "Criar a partir de um ficheiro"
      },
      {
        "title": "Criar a partir de um ficheiro",
        "intro": "A inferência propõe uma estrutura inicial que tem de rever antes de guardar.",
        "roles": "Administrador",
        "steps": [
          "Escolha a criação assistida por inferência e seleccione um ficheiro CSV, TXT tabular, XLS, XLSX ou ODS.",
          "Aguarde a proposta de campos, ordem, tipos prováveis e valores apresentados.",
          "Reveja os nomes, os tipos e as regras. Corrija colunas vazias, duplicadas ou equivalentes.",
          "Confirme e guarde a proposta. O modelo e a versão v1 ficam em Rascunho."
        ],
        "example": "Use um CSV representativo para obter uma proposta inicial e confirme se os tipos sugeridos correspondem ao significado dos dados.",
        "tip": "São consideradas até 1.000 linhas ou 5 MB descomprimidos, consoante o primeiro limite atingido. Em XLS, XLSX e ODS, só é analisada a primeira folha. A inferência não valida o ficheiro nem activa o modelo.",
        "table": null,
        "media": "Captura da proposta inferida, incluindo coluna a corrigir e aviso de folhas adicionais.",
        "next": "Rever campos e regras"
      },
      {
        "title": "Rever campos e regras",
        "intro": "Prepare uma definição coerente antes de activar o modelo.",
        "roles": "Administrador",
        "steps": [
          "Abra o Rascunho e reveja os nomes, os tipos lógicos e a ordem dos campos.",
          "Seleccione apenas regras activas e compatíveis e preencha os parâmetros pedidos.",
          "Se alterar um tipo ou remover um campo com regras, reveja e confirme a remoção das regras afectadas.",
          "Corrija os problemas indicados e guarde."
        ],
        "example": "Os nomes “ Código Postal ” e “código postal” são equivalentes para detectar duplicados. “Código Postal” e “Codigo Postal” são diferentes.",
        "tip": "Depois de editar manualmente a proposta, não pode repetir a inferência sobre essa proposta. As amostras e os valores usados na inferência são temporários e não integram o modelo nem a auditoria.",
        "table": null,
        "media": "Captura de campos, regra parametrizada e confirmação de incompatibilidade.",
        "next": "Activar um modelo"
      },
      {
        "title": "Activar um modelo",
        "intro": "A activação disponibiliza uma versão válida para novas associações a recursos.",
        "roles": "Administrador",
        "steps": [
          "Abra um Rascunho previamente guardado.",
          "Confirme que existe pelo menos um campo e que todos têm nome e tipo lógico.",
          "Reveja as regras e os parâmetros. Corrija os problemas que impeçam a activação.",
          "Seleccione Guardar e activar e confirme. O modelo fica Activo e a versão Em vigor."
        ],
        "example": "Depois de rever a estrutura proposta a partir de um CSV, active a versão para a disponibilizar na associação de modelos aos recursos.",
        "tip": "Uma versão activada não pode ser alterada. Uma regra inactiva ou a indisponibilidade do catálogo de regras impede a activação, embora o Rascunho possa ser guardado.",
        "table": null,
        "media": "Captura da activação e do resultado Activo com versão Em vigor.",
        "next": "Criar uma nova versão"
      },
      {
        "title": "Criar uma nova versão",
        "intro": "Altere a estrutura ou as regras através de um novo Rascunho.",
        "roles": "Administrador",
        "steps": [
          "Abra um modelo Activo e seleccione a edição da definição.",
          "Se já existir um Rascunho, continue nesse Rascunho. Caso contrário, é criada uma cópia da versão Em vigor.",
          "Altere os campos ou as regras e guarde.",
          "Quando a definição estiver válida, active-a. A versão anterior passa a Substituída."
        ],
        "example": "Para acrescentar uma coluna esperada ao modelo, prepare uma nova versão e active-a depois de revista.",
        "tip": "Existe no máximo um Rascunho por modelo. A activação não migra recursos já associados: cada recurso mantém a versão exacta anterior até uma alteração explícita da associação.",
        "table": null,
        "media": "Captura do Rascunho e comparação dos estados Em vigor e Substituída.",
        "next": "Inactivar ou reactivar um modelo"
      },
      {
        "title": "Inactivar ou reactivar um modelo",
        "intro": "A inactivação impede novas associações e preserva as versões e a utilização histórica.",
        "roles": "Administrador",
        "steps": [
          "Abra o modelo que pretende inactivar.",
          "Se existir um Rascunho, active-o ou descarte-o antes de inactivar.",
          "Seleccione a inactivação e conclua a operação apresentada.",
          "Para reactivar, confirme que a versão continua válida. Se precisar de a corrigir, edite uma nova versão e utilize Guardar e reactivar."
        ],
        "example": "Inactive um modelo que deixou de ser recomendado para novos recursos, preservando a rastreabilidade das associações existentes.",
        "tip": "Uma regra entretanto inactiva pode impedir a reactivação. A inactivação não altera automaticamente os recursos que já utilizam o modelo.",
        "table": null,
        "media": "Captura de inactivação, impedimento por Rascunho e reactivação.",
        "next": "Consultar a utilização e a auditoria"
      },
      {
        "title": "Consultar a utilização e a auditoria",
        "intro": "Verifique onde o modelo foi utilizado e quais as operações administrativas registadas.",
        "roles": "Editor ou Administrador",
        "steps": [
          "Abra o modelo e consulte a utilização das versões.",
          "Identifique as associações relevantes para avaliar o impacto de uma alteração.",
          "Com perfil Administrador, consulte a auditoria das operações sobre o modelo e as versões."
        ],
        "example": "Antes de inactivar um modelo, consulte a utilização para identificar os recursos que continuam associados às versões existentes.",
        "tip": "Uma utilização passada continua relevante mesmo que já não existam associações actuais. O Editor pode consultar a utilização, mas não a auditoria.",
        "table": null,
        "media": "Captura da utilização por versão e da auditoria administrativa.",
        "next": "Eliminar um modelo nunca utilizado"
      },
      {
        "title": "Eliminar um modelo nunca utilizado",
        "intro": "Só pode eliminar um modelo quando nenhuma das suas versões foi alguma vez associada a um recurso.",
        "roles": "Administrador",
        "steps": [
          "Com perfil Administrador, abra o modelo e verifique a utilização.",
          "Seleccione Eliminar, quando permitido.",
          "Reveja e confirme a operação.",
          "O modelo e as versões ficam logicamente eliminados e só o Administrador os pode consultar."
        ],
        "example": "Pode eliminar um modelo de preparação que nunca foi associado. Retirar associações actuais de um modelo utilizado não o torna elegível para eliminação.",
        "tip": "O portal não permite recuperar modelos eliminados. O nome também não fica disponível para reutilização. A elegibilidade é novamente verificada ao confirmar.",
        "table": null,
        "media": "Captura da confirmação de eliminação e do impedimento por utilização histórica.",
        "next": "Voltar à visão geral"
      }
    ]
  }
];
