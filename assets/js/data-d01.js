// Conteúdo editorial do guia D01.
// Este guia descreve o comportamento editorial actualmente consolidado para autenticação e acesso à conta.

export const d01Guide = {
  code: "D01",
  title: "Autenticação e acesso à conta",
  intro: "Inicie sessão no dados.gov.pt, conclua o primeiro acesso quando necessário e recupere o acesso à sua conta.",
  audience: "Para utilizadores que precisam de iniciar sessão ou recuperar o acesso. O portal apresenta actualmente CMD, eIDAS e E-mail e palavra-passe; este último destina-se a utilizadores antigos e pode exigir migração da conta quando o portal assim o indicar.",
  fichas: [
    {
      title: "Iniciar sessão com email e palavra-passe",
      intro: "Utilize este método apenas se já possui uma conta antiga com email e palavra-passe.",
      roles: "Utilizador com conta e credenciais válidas",
      steps: [
        "Abra a página Autenticação do dados.gov.pt.",
        "Seleccione o separador Email e palavra-passe.",
        "Introduza o email e a palavra-passe da sua conta.",
        "Conclua a autenticação pela acção apresentada no formulário.",
        "Confirme que regressa ao portal com a sessão iniciada."
      ],
      example: "Uma utilizadora que já tem conta introduz o email e a palavra-passe e entra no portal para gerir os seus conteúdos.",
      tip: "O acesso por email e palavra-passe destina-se a contas que ainda utilizam este método. Se o portal apresentar um percurso de migração ou associação, siga as instruções apresentadas.",
      table: null,
      media: "Captura da página Autenticação com o separador Email e palavra-passe, usando dados de demonstração.",
      next: "Iniciar sessão com Chave Móvel Digital"
    },
    {
      title: "Iniciar sessão com Chave Móvel Digital",
      intro: "Utilize a Chave Móvel Digital para se autenticar através do Autenticação.gov.",
      roles: "Utilizador com Chave Móvel Digital activa",
      steps: [
        "Abra a página Autenticação do dados.gov.pt.",
        "Seleccione Chave Móvel Digital.",
        "Indique se é cidadão nacional ou estrangeiro, quando essa opção for apresentada.",
        "Continue para o Autenticação.gov e conclua a autenticação com os dados pedidos nesse serviço.",
        "No regresso ao dados.gov.pt, conclua os passos adicionais apresentados, quando aplicável."
      ],
      example: "Um utilizador escolhe Chave Móvel Digital, conclui a autenticação no Autenticação.gov e regressa ao portal.",
      tip: "Se for o primeiro acesso ou se a conta precisar de completar dados, o portal pode pedir a confirmação de um endereço de email antes de disponibilizar o acesso normal.",
      table: null,
      media: "Sequência entre a página Autenticação, o Autenticação.gov e o regresso ao dados.gov.pt, sem expor dados reais.",
      next: "Iniciar sessão com Autenticação Europeia eIDAS"
    },
    {
      title: "Iniciar sessão com Autenticação Europeia eIDAS",
      intro: "Utilize a autenticação electrónica do seu país através do percurso eIDAS disponibilizado pelo portal.",
      roles: "Utilizador com meio de identificação electrónica aceite no percurso eIDAS",
      steps: [
        "Abra a página Autenticação do dados.gov.pt.",
        "Seleccione Autenticação Europeia.",
        "Escolha o país ou o provedor de identidade apresentado no percurso eIDAS.",
        "Conclua a autenticação seguindo as instruções do serviço de identidade seleccionado.",
        "Regresse ao dados.gov.pt e conclua os passos adicionais apresentados, quando aplicável."
      ],
      example: "Uma pessoa de outro Estado-Membro selecciona Autenticação Europeia, autentica-se através do provedor indicado e regressa ao portal.",
      tip: "No primeiro acesso por eIDAS pode ser necessário indicar e confirmar um endereço de email no dados.gov.pt.",
      table: null,
      media: "Sequência do acesso eIDAS com um país de demonstração e sem dados de identidade reais.",
      next: "Concluir o primeiro acesso quando solicitado"
    },
    {
      title: "Concluir o primeiro acesso quando solicitado",
      intro: "Quando o portal apresenta passos adicionais depois da autenticação, siga apenas o percurso e as instruções mostradas no ecrã.",
      roles: "Utilizador autenticado por CMD ou eIDAS com passos adicionais de registo ou associação apresentados pelo portal",
      steps: [
        "Depois de concluir a autenticação por CMD ou eIDAS, verifique se o dados.gov.pt apresenta algum passo adicional.",
        "Se o portal solicitar um endereço de email, confirme ou indique o endereço pretendido no campo apresentado.",
        "Consulte a mensagem enviada para esse endereço e siga a ligação apresentada, quando aplicável.",
        "Conclua o passo de validação exactamente pelo método apresentado no portal.",
        "Depois da conclusão, confirme que regressa ao dados.gov.pt e consegue continuar com a sua conta."
      ],
      example: "Depois de autenticar por CMD ou eIDAS, um utilizador segue os passos adicionais apresentados pelo portal para concluir ou associar a conta.",
      tip: "O mecanismo de confirmação pode evoluir. Não partilhe códigos, links, palavras-passe ou outros segredos fora do percurso oficial apresentado pelo dados.gov.pt.",
      table: null,
      media: "Captura dos passos adicionais apresentados pelo portal após a autenticação, sem mostrar endereços, códigos, links de confirmação ou outros dados reais.",
      next: "Recuperar a palavra-passe"
    },
    {
      title: "Recuperar a palavra-passe",
      intro: "Peça uma mensagem de recuperação quando não se recorda da palavra-passe da conta.",
      roles: "Utilizador de conta com login por email e palavra-passe",
      steps: [
        "Na página Autenticação, abra o separador Email e palavra-passe.",
        "Seleccione a opção de recuperação da palavra-passe.",
        "Introduza o endereço de email da conta e submeta o pedido.",
        "Consulte a caixa de entrada e o spam do endereço indicado.",
        "Se receber a mensagem de recuperação, siga a ligação e defina a nova palavra-passe de acordo com as instruções apresentadas."
      ],
      example: "Uma pessoa que não se recorda da palavra-passe pede a recuperação e utiliza a ligação recebida no email da conta.",
      tip: "Por segurança, o portal pode apresentar uma resposta genérica ao pedido. Se não receber qualquer mensagem e a dificuldade persistir, utilize Ajuda e contactos sem partilhar a sua palavra-passe.",
      table: null,
      media: "Captura do pedido de recuperação e do ecrã de definição da nova palavra-passe, com dados fictícios.",
      next: "Resolver dificuldades de acesso"
    },
    {
      title: "Resolver dificuldades de acesso",
      intro: "Identifique em que ponto o acesso falha antes de repetir o processo ou pedir apoio.",
      roles: "Utilizador com dificuldade de autenticação ou recuperação",
      steps: [
        "Confirme qual o método de autenticação que está a utilizar: email e palavra-passe, Chave Móvel Digital ou Autenticação Europeia.",
        "Se utiliza email e palavra-passe e não se recorda da credencial, tente a recuperação antes de repetir várias vezes o login.",
        "Se o processo CMD ou eIDAS for interrompido, volte à página Autenticação e reinicie o percurso pelo mesmo método.",
        "Se o portal apresentar um passo adicional de conclusão, migração ou associação da conta, conclua esse percurso antes de voltar a tentar.",
        "Se a dificuldade persistir, abra Ajuda e contactos e indique o método utilizado, a página, o momento aproximado e a mensagem apresentada, sem incluir palavras-passe, códigos, tokens ou outros segredos."
      ],
      example: "Uma utilizadora regressa do Autenticação.gov mas não consegue concluir o acesso. Regista o método utilizado e a mensagem apresentada e envia esses elementos através de Ajuda e contactos.",
      tip: "Não crie uma segunda conta para contornar uma dificuldade de autenticação. Se o portal indicar que é necessária migração ou associação de conta, utilize apenas o percurso oficial apresentado.",
      table: null,
      media: "Exemplo de informação útil para suporte, sem credenciais, tokens ou dados pessoais desnecessários.",
      next: "Ajuda e contactos"
    }
  ]
};

export function registerD01(guides, themes) {
  if (!guides.some(guide => guide.code === d01Guide.code)) {
    guides.unshift(d01Guide);
  }

  const accountTheme = themes.find(theme => theme.id === "conta-participacao");
  if (accountTheme) {
    accountTheme.title = "Acesso, perfil e participação";
    accountTheme.intro = "Inicie sessão, consulte o seu perfil e acompanhe a sua actividade e os conteúdos que segue no portal.";
    accountTheme.guides = accountTheme.guides.filter(code => code !== "D14");
    if (!accountTheme.guides.includes(d01Guide.code)) {
      accountTheme.guides.unshift(d01Guide.code);
    }
  }

  let helpTheme = themes.find(theme => theme.id === "ajuda-contactos");
  if (!helpTheme) {
    helpTheme = {
      id: "ajuda-contactos",
      title: "Ajuda e contactos",
      intro: "Encontre apoio, esclareça dúvidas, peça informação e contacte a equipa do dados.gov.pt.",
      guides: ["D14"]
    };

    const accountThemeIndex = accountTheme ? themes.indexOf(accountTheme) : themes.length - 1;
    themes.splice(accountThemeIndex + 1, 0, helpTheme);
  } else {
    helpTheme.title = "Ajuda e contactos";
    helpTheme.intro = "Encontre apoio, esclareça dúvidas, peça informação e contacte a equipa do dados.gov.pt.";
    helpTheme.guides = ["D14"];
  }
}
