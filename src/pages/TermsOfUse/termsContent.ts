export type TermsSection = {
  id: string;
  title: string;
  blocks: Array<
    | { type: "heading"; text: string }
    | { type: "paragraph"; text: string }
    | { type: "list"; items: string[] }
  >;
};

const heading = (text: string) => ({ type: "heading" as const, text });
const paragraph = (text: string) => ({ type: "paragraph" as const, text });
const list = (...items: string[]) => ({ type: "list" as const, items });

export const termsSections: TermsSection[] = [
  {
    id: "aceitacao-dos-termos",
    title: "1. Aceitação dos Termos",
    blocks: [
      paragraph("Ao acessar, inscrever-se ou utilizar os serviços da plataforma Veritas Hub, você concorda em cumprir os presentes Termos e Condições de Uso, a Política de Privacidade e qualquer outra diretriz ou regulamento relacionado. Caso você não concorde com algum dos termos, deverá interromper imediatamente o uso da plataforma."),
      heading("1.1 Contrato e Termos de Serviço"),
      paragraph('Os termos de utilização aqui descritos (denominados "Contrato" ou "Termos de Serviço") constituem um acordo legal entre você e o fornecedor do serviço. Ao aceitar os termos que serão descritos a seguir, você declara estar agindo em seu próprio nome, plenamente habilitado para a aceitação dos termos e para a representação da parte contratante, além de estar agindo com livre e espontânea vontade, sem qualquer tipo de coerção. Você afirma possuir a legitimidade necessária para a contratação dos serviços e para assumir os direitos, deveres e obrigações aqui dispostos.'),
      heading("1.2 Consentimento"), paragraph("Ao prosseguir, você declara ter ciência e concordar com os termos que se encontram abaixo."),
      heading("1.3 Provedor"), paragraph("Estes termos são firmados entre você e o Veritas Hub."),
      heading("1.4 Importância dos Termos"), paragraph("Para a correta utilização do sistema, é imprescindível que o usuário aceite e concorde com os presentes termos de utilização, pois eles protegem os direitos, garantem a segurança e definem as responsabilidades das partes envolvidas."),
      heading("1.5 Responsabilidades da Empresa"),
      list("Cumprir todas as cláusulas estabelecidas neste Termo de Uso, atuando de acordo com as leis e regulamentações aplicáveis;", "Garantir que a plataforma seja utilizada exclusivamente para fins legais e autorizados;", "Disponibilizar informações e recursos necessários ao usuário para assegurar a correta utilização dos serviços prestados;", "Respeitar normas de segurança e políticas antifraude, além de proibir a prática de qualquer atividade que possa resultar em vendas ou receitas obtidas de forma ilícita ou fraudulenta;", "Respeitar a privacidade e confidencialidade das informações do usuário, não divulgando dados de relacionamento comercial sem consentimento prévio;", "Implementar mecanismos de segurança da informação, informando aos usuários sobre a importância de adotarem práticas seguras, como o não compartilhamento de senhas com terceiros."),
    ],
  },
  {
    id: "definicoes", title: "2. Definições", blocks: [
      heading("Plataforma"), paragraph("Refere-se à aplicação web, mobile ou desktop de Veritas Hub, incluindo suas funcionalidades, conteúdos e serviços."),
      heading("Usuário"), paragraph("Toda pessoa física ou jurídica que acessa e utiliza os serviços da plataforma."),
      heading("Dados Pessoais"), paragraph("Qualquer informação relacionada a pessoa física identificada ou identificável, conforme descrito na Lei Geral de Proteção de Dados (LGPD)."),
      heading("Serviços"), paragraph("Todas as funcionalidades oferecidas pela plataforma, incluindo mas não se limitando a consultas, monitoramento de processos e gestão de prazos."),
    ],
  },
  {
    id: "cadastro-e-conta", title: "3. Cadastro e Conta", blocks: [
      paragraph("Para utilizar as funcionalidades da plataforma, o usuário deve criar uma conta, fornecendo informações precisas, completas e atualizadas. O usuário é responsável por manter a confidencialidade de sua senha e da conta, bem como por todas as atividades realizadas sob seu login. A plataforma se reserva o direito de suspender ou encerrar contas a qualquer momento, em caso de suspeita de uso indevido, violação dos Termos de Uso ou atividades fraudulentas."),
      heading("3.1 Informações Cadastrais"), paragraph("Para utilizar o sistema e todas as suas funcionalidades, o usuário deverá fornecer informações específicas a respeito de si e/ou da pessoa física ou jurídica que representa. Ao prosseguir com a aceitação dos termos aqui dispostos, o usuário declara estar ciente de que a utilização de dados falsos, desatualizados, inválidos, incorretos ou de terceiros poderá resultar no encerramento antecipado do contrato vigente, interrompendo o uso da plataforma, sem prejuízo de responsabilização civil e criminal do usuário, além de pagamento por perdas e danos sofridos."),
      heading("3.1.1 Bloqueio de Conta por Informações Inconsistentes"), paragraph("Através da cláusula acima descrita, o usuário afirma estar ciente de que, caso seja constatada a incoerência ou divergência nos dados solicitados, a plataforma Veritas Hub reserva-se o direito ao bloqueio imediato e por prazo indeterminado da utilização da plataforma, sem a necessidade de quaisquer avisos prévios. Ao concordar com os Termos de Uso, você declara sua responsabilidade quanto à coerência e veracidade das informações fornecidas, sendo assim, nenhuma responsabilidade ou dano poderá ser imputado ao prestador de serviços Veritas Hub."),
      heading("3.2 Declaração de Ausência de Impedimentos para a Adesão"), paragraph("Ao prosseguir com a adesão aos Termos de Uso da plataforma, o usuário declara não ter nenhum impedimento para efetuar a contratação e adesão aos termos aqui dispostos. O usuário afirma possuir capacidade jurídica para a contratação da plataforma, obrigando-se pelo pagamento da mensalidade atribuída à pessoa física ou jurídica em nome da qual ocorreu a contratação. Caso realize a contratação sem possuir capacidade de representação, o usuário será pessoalmente responsável pelas obrigações deste instrumento."),
      heading("3.3 Sigilo das Credenciais de Acesso"), paragraph("O usuário é responsável por manter o sigilo de suas credenciais de acesso à plataforma. Caso o acesso seja efetuado por terceiros em decorrência da negligência do usuário, o Veritas Hub fica isento de qualquer responsabilidade relacionada à privacidade e segurança das informações disponíveis na plataforma."),
      heading("3.4 Responsabilidade por Perfis Criados pelo Usuário"), paragraph("Ao contratar a plataforma, o usuário poderá criar diferentes perfis de acesso. O usuário declara ser o único e exclusivo responsável por toda atividade realizada nos perfis associados à sua conta, devendo informar, orientar e garantir que seus colaboradores observem estes termos."),
    ],
  },
  {
    id: "conformidade-lgpd", title: "4. Conformidade com a LGPD", blocks: [
      heading("4.1 Coleta de Dados"), paragraph("Ao se cadastrar na plataforma, coletamos e processamos os seguintes tipos de dados:"), list("Informações fornecidas diretamente pelo usuário, como nome, CPF e endereço de e-mail;", "Informações geradas pelo uso do serviço, como logs de acesso e consultas realizadas."),
      heading("4.2 Finalidade da Coleta"), paragraph("Os dados coletados serão utilizados para:"), list("Prestação adequada dos serviços contratados;", "Monitoramento e melhoria da plataforma;", "Cumprimento de obrigações legais."),
      heading("4.3 Compartilhamento de Dados"), paragraph("Não compartilhamos dados pessoais com terceiros, exceto:"), list("Quando autorizado expressamente pelo usuário;", "Para cumprimento de obrigações legais;", "Para proteger nossos direitos ou os direitos de terceiros."),
      heading("4.4 Segurança dos Dados"), paragraph("A plataforma adota as melhores práticas de segurança, incluindo criptografia e controles de acesso, para garantir a proteção dos dados pessoais. O usuário também é responsável por garantir que suas credenciais estejam seguras."),
      heading("4.5 Direitos dos Titulares"), paragraph("O usuário tem direito a acessar, corrigir, solicitar a exclusão ou portabilidade de seus dados pessoais, conforme a LGPD. Para exercer esses direitos, deve entrar em contato pelo e-mail contato@veritasprev.com.br."),
    ],
  },
  {
    id: "uso-da-plataforma", title: "5. Uso da Plataforma", blocks: [
      heading("5.1 Funcionamento Geral"), paragraph("Os serviços da plataforma estão disponíveis de forma contínua, exceto durante manutenções programadas ou interrupções causadas por circunstâncias fora de nosso controle. Reservamo-nos o direito de modificar, suspender ou descontinuar funcionalidades ou serviços a qualquer momento, sem aviso prévio."),
      heading("5.2 Uso Permitido"), paragraph("O usuário concorda em utilizar a plataforma de acordo com todas as leis e regulamentos aplicáveis. É expressamente proibido:"), list("Utilizar a plataforma para fins comerciais não autorizados;", "Realizar consultas em massa sem autorização;", "Compartilhar o acesso com terceiros não autorizados;", "Tentar explorar, hackear ou manipular qualquer parte da plataforma ou dos dados fornecidos."),
      heading("5.3 Uso Indevido"), paragraph("Caso seja identificado uso indevido, como acesso não autorizado, tentativa de mineração de dados ou violação das políticas de segurança, o usuário terá seu acesso suspenso imediatamente, sem prejuízo das medidas legais cabíveis."),
      heading("5.3.1 Acessos e Restrições"), paragraph("O usuário concorda em não acessar ou tentar acessar serviços além daqueles contratados, de forma automatizada, nem se envolver em atividades que possam interferir ou prejudicar o website, sistema ou serviços disponibilizados."),
      heading("5.3.1.1 Declaração de Consciência sobre APIs"), list("Existem funcionalidades de utilização do sistema via API que permitem automações autorizadas;", "O Veritas Hub reserva-se o direito de cobrar pelo uso dos serviços de API;", "Automações não permitidas, web scraping e uso de robôs são proibidos. O usuário que desejar utilizar o módulo de API deverá contratá-lo via plataforma."),
      heading("5.3.2 Compromissos de Segurança"), list("Não interromper, interferir ou causar danos ao site, serviços, produtos ou sistemas afiliados;", "Não tentar acessar contas, senhas ou sistemas de outros usuários;", "Não tentar acessar dados e conteúdos não autorizados."),
      heading("5.3.3 Condutas Proibidas na Plataforma"), list("Distribuir, reproduzir, modificar, vender ou explorar economicamente a plataforma, seus dados e conteúdos;", "Realizar modificações, adaptações ou obras derivadas;", "Decifrar, invadir ou realizar engenharia reversa no sistema;", "Testar vulnerabilidades;", "Acessar áreas não públicas ou não autorizadas;", "Prejudicar servidores, redes e outros usuários;", "Transmitir arquivos maliciosos;", "Usar os serviços para infrações legais ou armazenar documentos ilícitos."),
      heading("5.4 Conformidade com o Plano Contratado"), paragraph("Ao contratar um plano, o usuário terá acesso apenas às funcionalidades e ferramentas especificadas nas respectivas condições."),
      heading("5.5 Uso Gratuito da Plataforma"), paragraph("O Veritas Hub pode oferecer períodos de teste e planos gratuitos, reservando-se o direito de suspendê-los ou cancelá-los sem aviso prévio."),
      heading("5.6 Uso de Terceiros à Sua Conta"), paragraph("A plataforma não se responsabiliza por acessos de terceiros decorrentes de informações fornecidas pelo usuário. Todas as ações realizadas serão consideradas feitas em seu nome, reforçando a importância de manter as credenciais seguras."),
      heading("5.7 Direitos de Modificação"), paragraph("O Veritas Hub reserva-se o direito de modificar, atualizar ou remover conteúdo, funcionalidade ou serviço sem aviso prévio. É responsabilidade do usuário revisar periodicamente estes Termos de Uso."),
    ],
  },
  {
    id: "propriedade-intelectual", title: "6. Propriedade Intelectual", blocks: [
      paragraph("Todos os direitos de propriedade intelectual relacionados à plataforma, incluindo design, código, logotipos, textos e gráficos, são de titularidade exclusiva do Veritas Hub ou de seus licenciadores. O uso não autorizado está sujeito a sanções civis e criminais."),
      heading("6.1 Intransferibilidade dos Direitos de Propriedade Intelectual"), paragraph("A utilização da plataforma e a contratação de um plano não conferem ao usuário quaisquer direitos autorais ou de propriedade intelectual sobre a plataforma, suas funcionalidades, serviços, materiais ou conteúdos."),
      heading("6.2 Distribuição de Propriedade Intelectual"), paragraph("Nenhum usuário está autorizado a copiar, ceder, sublicenciar, vender, locar, reproduzir, alienar ou explorar o sistema, sua identidade visual, módulos, treinamentos, manuais, vídeos, layouts ou qualquer informação relativa ao Veritas Hub."),
      heading("6.3 Responsabilidade sobre Informações e Conteúdos na Plataforma"), paragraph("O usuário é exclusivamente responsável pelas informações enviadas por si, seus colaboradores ou representantes, responsabilizando-se por violações legais a direitos de terceiros."),
      heading("6.4 Consequências do Descumprimento dos Termos"), paragraph("O descumprimento destes termos sujeitará o usuário às sanções aplicáveis, à prestação de esclarecimentos e à responsabilização civil por perdas e danos, incluindo lucros cessantes."),
    ],
  },
  {
    id: "planos-e-pagamentos", title: "7. Planos e Pagamentos", blocks: [
      paragraph("A plataforma oferece diferentes planos de assinatura e funcionalidades pagas. Condições, valores e métodos aceitos serão descritos no momento da contratação. A não quitação das faturas poderá resultar na suspensão ou cancelamento dos serviços."),
      heading("7.1 Direitos e Benefícios"), paragraph("Todos os direitos, benefícios, serviços ou produtos ofertados estão sujeitos ao pagamento das taxas aplicáveis, quando houver."),
      heading("7.2 Condições de Pagamento"), paragraph("O pagamento será feito conforme acordado entre o usuário e o fornecedor. O Veritas Hub oferece planos com diferentes taxas e funcionalidades, conforme especificado na página de planos."),
      heading("7.3 Alterações nos Planos"), paragraph("O Veritas Hub não garante que um plano será oferecido indefinidamente e reserva-se o direito de alterar valores ou recursos e descontinuar planos, na extensão permitida pela lei."),
      heading("7.4 Alterações no Valor"), paragraph("O Veritas Hub poderá alterar preços mediante notificação com, no mínimo, quinze dias de antecedência. Caso não concorde, o usuário deverá cancelar a assinatura. Nenhum reembolso por serviços pagos anteriormente será emitido."),
      heading("7.5 Renovação Automática da Assinatura"), paragraph("O usuário declara estar ciente da renovação automática de assinaturas e produtos ao final do período, caso não haja cancelamento, autorizando o débito no método de pagamento escolhido."),
      heading("7.6 Atrasos no Pagamento"), paragraph("Em caso de atraso, o Veritas Hub poderá interromper ou cancelar o acesso imediatamente após o vencimento do plano, sem aviso prévio."),
      heading("7.7 Periodicidade e Vencimento"), paragraph("O usuário declara estar ciente do período de vigência e da cobrança recorrente. Caso o pagamento não seja efetuado, será considerado inadimplente."),
      heading("7.8 Responsabilidade sobre Consumo"), paragraph("Determinados serviços acarretam custos adicionais e exigem recarga prévia. Após a utilização não haverá reembolso, cabendo ao usuário gerir o próprio consumo e o de seus colaboradores."),
      heading("7.9 Modelo de Cobrança"), paragraph("O modelo de pagamento funciona como serviço pré-pago, com liberação da plataforma imediatamente após o pagamento."),
      heading("7.9.1 Alterações nos Modelos de Faturamento"), paragraph("O Veritas Hub poderá adicionar modelos de faturamento, comunicando os usuários afetados com no mínimo quinze dias de antecedência."),
      heading("7.9.2 Inadimplência"), paragraph("O usuário inadimplente poderá ter todo o acesso bloqueado assim que o período vigente de seu plano vencer."),
      heading("7.9.3 Atualização dos Dados de Pagamento"), paragraph("É responsabilidade exclusiva do usuário manter seus dados de pagamento atualizados."),
      heading("7.9.4 Declaração de Representação"), paragraph("Ao cadastrar métodos de pagamento, o usuário declara possuir capacidade de representação e assume a responsabilidade pelas cobranças efetuadas de acordo com o plano contratado."),
    ],
  },
  {
    id: "cancelamento", title: "8. Cancelamento e Encerramento de Contas", blocks: [
      heading("8.1 Cancelamento pelo Usuário"), paragraph("O usuário pode cancelar sua conta a qualquer momento entrando em contato com o suporte. Os dados serão mantidos pelo período necessário ao cumprimento de obrigações legais ou da política de retenção."),
      heading("8.1.1 Reembolso"), paragraph("O cancelamento antecipado não obriga o Veritas Hub a reembolsar valores pagos. O acesso continuará disponível até o fim do período de contratação vigente."),
      heading("8.1.2 Débitos Pendentes"), paragraph("O cancelamento não isenta o usuário de pagar débitos em aberto, que deverão ser quitados integralmente."),
      heading("8.2 Cancelamento pela Plataforma"), paragraph("O Veritas Hub reserva-se o direito de suspender ou encerrar contas que violem estes termos ou apresentem comportamento fraudulento ou abusivo."),
      heading("8.3 Efeitos do Cancelamento do Plano"), paragraph("O acesso será interrompido após o período contratado, salvo em casos de mau uso. Após o bloqueio, arquivos e dados armazenados poderão ser excluídos permanentemente."),
      heading("8.4 Direito de Retirada"), paragraph("Ao se inscrever em teste gratuito, o usuário concorda que o direito de retirada termina ao final do teste. Se não cancelar antes desse período, autoriza a cobrança automática do plano."),
    ],
  },
  {
    id: "limitacao-de-responsabilidade", title: "9. Limitação de Responsabilidade", blocks: [
      paragraph("O usuário declara-se ciente de que, em nenhuma circunstância, o Veritas Hub se responsabilizará pelas situações descritas a seguir."),
      heading("9.1 Acesso Indevido e Segurança"), paragraph("Acessos indevidos, atividades suspeitas ou danos decorrentes da falha do usuário em manter a confidencialidade da senha ou comunicar uso não autorizado."),
      heading("9.2 Força Maior e Caso Fortuito"), paragraph("Atos ou fatos inevitáveis e além do controle razoável do Veritas Hub, incluindo suspensão de serviços de terceiros, incêndios, tempestades, leis, greves, pandemias, revoltas ou guerras."),
      heading("9.3 Remoção de Dados e Cancelamento de Cadastro"), paragraph("Danos decorrentes da remoção de dados, cancelamento de cadastro ou fornecimento de informações em cumprimento destes Termos, da Política de Privacidade ou de ordens judiciais e administrativas."),
      heading("9.4 Modificação e Suspensão da Plataforma"), paragraph("Eventual modificação, suspensão, interrupção ou descontinuação da plataforma."),
      heading("9.5 Declarações e Garantias"), paragraph("O Veritas Hub não oferece garantias expressas ou implícitas quanto à adequação, precisão, eficácia, disponibilidade ou integralidade dos serviços, nem garante acesso livre de erros, vírus ou interrupções."),
      heading("9.6 Responsabilidade do Usuário"), paragraph("É responsabilidade exclusiva do usuário verificar e atualizar suas informações pessoais ou da parte que representa."),
      heading("9.7 Limitação de Garantia e Precisão dos Dados"), paragraph("O Veritas Hub não garante precisão, integridade ou atualidade das informações fornecidas por usuários ou terceiros. O usuário deve conferir informações críticas e é responsável pela veracidade dos dados fornecidos."),
    ],
  },
  {
    id: "privacidade", title: "10. Privacidade", blocks: [
      paragraph("A sua privacidade é importante para nós. Nossa Política de Privacidade, parte integrante destes Termos de Uso, descreve como coletamos, utilizamos e protegemos seus dados pessoais."),
      heading("10.1 Compromisso com a Privacidade"), paragraph("O Veritas Hub prioriza a privacidade e segurança dos dados, em conformidade com a Lei Geral de Proteção de Dados, o Marco Civil da Internet, a Constituição Federal e demais legislações vigentes."),
      heading("10.2 Transparência no Tratamento de Dados"), paragraph("A Política de Privacidade demonstra, de forma transparente, como e por que os dados são coletados, armazenados, compartilhados e tratados, além das medidas adotadas para protegê-los."),
      heading("10.3 Consentimento do Usuário"), paragraph("Ao aceitar estes Termos, o usuário declara estar ciente e concordar em estar vinculado à Política de Privacidade."),
      heading("10.4 Conflito de Disposições"), paragraph("Em caso de conflito entre estes termos e a Política de Privacidade, prevalecerá a regra mais específica."),
    ],
  },
  { id: "modificacoes", title: "11. Modificações dos Termos", blocks: [paragraph("O Veritas Hub pode alterar estes Termos de Uso a qualquer momento. As modificações serão publicadas no site e os usuários serão notificados. O uso continuado dos serviços após a alteração indica a aceitação dos novos termos.")] },
  {
    id: "disposicoes-gerais", title: "12. Disposições Gerais", blocks: [
      heading("12.1 Lei Aplicável"), paragraph("Estes Termos de Uso são regidos pela legislação brasileira, em especial pela Lei Geral de Proteção de Dados (LGPD)."),
      heading("12.2 Foro"), paragraph("As partes elegem o Foro Regional do Tatuapé da Comarca de São Paulo, com renúncia expressa a qualquer outro, por mais privilegiado que seja, para dirimir questões oriundas destes Termos."),
      heading("12.3 Independência das Partes"), paragraph("A concordância com estes Termos não estabelece associação, franquia, parceria, consórcio, mandato, representação, vínculo empregatício, societário ou solidariedade, nem autoriza uma parte a assumir obrigações em nome da outra."),
    ],
  },
  {
    id: "contato", title: "13. Contato", blocks: [
      paragraph("Em caso de dúvidas, sugestões ou reclamações sobre estes Termos de Uso ou sobre a plataforma, entre em contato com nossa equipe pelo e-mail contato@veritasprev.com.br."),
      heading("13.1 Suporte"), paragraph("O Veritas Hub oferece uma plataforma de suporte ao cliente para abertura de tickets referentes a solicitações de suporte técnico ou operacional."),
      heading("13.1.1 Solicitações"), paragraph("Solicitações, dúvidas, melhorias, bugs e demais situações devem ser repassadas através de chamados, que serão direcionados às equipes responsáveis."),
    ],
  },
];
