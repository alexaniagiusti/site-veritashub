export type PrivacySection = {
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

export const privacySections: PrivacySection[] = [
  {
    id: "proprietario-controlador",
    title: "Proprietário e Controlador de Dados",
    blocks: [
      paragraph("VERITAS CONSULTORIA LTDA – 27.307.965/0001-88 – R BOM SUCESSO 745, São Paulo, SP, Brasil"),
      paragraph("E-mail: contato@veritasprev.com.br"),
    ],
  },
  {
    id: "dados-coletados",
    title: "Tipos de Dados coletados",
    blocks: [
      paragraph("Entre os tipos de Dados Pessoais que este Aplicativo coleta, por si mesmo ou através de terceiros, as informações pessoais coletadas podem incluir, mas não se limitam a:"),
      list("Nome", "Endereço de e-mail", "Número de telefone", "Endereço postal", "Informações de pagamento", "Histórico de transações", "Dados de navegação e uso do sistema"),
      paragraph("Detalhes completos sobre cada tipo de Dados Pessoais coletados são fornecidos nas seções dedicadas desta política de privacidade ou por textos explicativos específicos exibidos antes da coleta de Dados."),
      paragraph("Os Dados Pessoais poderão ser fornecidos livremente pelo Usuário ou, no caso dos Dados de Utilização, coletados automaticamente ao se utilizar este Aplicativo."),
      paragraph("A menos que especificado diferentemente, todos os Dados solicitados por este Aplicativo são obrigatórios e a falta de fornecimento destes Dados poderá impossibilitar este Aplicativo de fornecer os seus Serviços."),
      paragraph("Os Usuários que tiverem dúvidas a respeito de quais Dados Pessoais são obrigatórios estão convidados a entrar em contato com o Proprietário."),
      paragraph("Quaisquer usos de cookies – ou de outras ferramentas de rastreamento – por este Aplicativo ou pelos proprietários de serviços terceiros utilizados por este Aplicativo serão para a finalidade de fornecer os Serviços solicitados pelo Usuário."),
    ],
  },
  {
    id: "processamento",
    title: "Modo e local de processamento dos Dados",
    blocks: [
      heading("Método de processamento"),
      paragraph("O proprietário tomará as medidas de segurança adequadas para impedir o acesso não autorizado, divulgação, alteração ou destruição não autorizada dos Dados."),
      paragraph("O processamento dos Dados é realizado utilizando computadores e/ou ferramentas de TI habilitadas, seguindo procedimentos organizacionais e meios estritamente relacionados com os fins indicados."),
      paragraph("Além do Proprietário, em alguns casos, os Dados podem ser acessados por pessoas encarregadas da operação deste Serviço."),
      heading("Base jurídica para o processamento"),
      list("Consentimento do usuário", "Execução contratual", "Obrigação legal", "Interesse público", "Interesse legítimo"),
      heading("Lugar"),
      paragraph("Os dados são processados nas sedes de operação dos Proprietários, e em quaisquer outros lugares onde as partes envolvidas com o processamento estiverem localizadas."),
      heading("Período de conservação"),
      paragraph("Os Dados Pessoais serão processados e armazenados pelo tempo necessário para as finalidades para as quais forem coletados."),
      list("Dados relacionados à execução contratual serão mantidos até o cumprimento completo do contrato.", "Dados relacionados aos interesses legítimos serão conservados pelo período necessário para atingir tais finalidades."),
    ],
  },
  {
    id: "finalidades",
    title: "As finalidades do processamento",
    blocks: [
      paragraph("Os Dados relativos ao Usuário são coletados para permitir que o Proprietário preste seu Serviço, cumpra obrigações legais, responda solicitações, proteja direitos e detecte atividades maliciosas ou fraudulentas."),
      list("Fornecimento e gestão de serviços", "Processamento de transações", "Melhoria do sistema", "Envio de comunicações relevantes", "Pesquisas e análises", "Cumprimento de obrigações legais"),
    ],
  },
  {
    id: "compartilhamento",
    title: "Compartilhamento de Informações",
    blocks: [
      paragraph("Não vendemos, trocamos ou alugamos informações pessoais a terceiros."),
      paragraph("Podemos compartilhar informações genéricas agregadas, não vinculadas a informações pessoais identificáveis, com parceiros de negócios e afiliados."),
    ],
  },
  {
    id: "protecao",
    title: "Proteção de Dados",
    blocks: [paragraph("Implementamos medidas de segurança apropriadas para proteger contra acesso não autorizado, alteração, divulgação ou destruição de informações pessoais.")],
  },
  {
    id: "retencao",
    title: "Retenção de Dados",
    blocks: [paragraph("Manteremos suas informações pessoais apenas pelo tempo necessário para cumprir as finalidades para as quais as coletamos.")],
  },
  {
    id: "detalhes-processamento",
    title: "Informações detalhadas sobre o processamento de Dados Pessoais",
    blocks: [
      heading("Contatar o Usuário"),
      heading("Formulário de contato"),
      paragraph("Ao preencher o formulário de contato, os usuários autorizam este Aplicativo a usar esses detalhes para responder aos pedidos."),
      paragraph("Dados processados:"),
      list("Data de nascimento", "E-mail", "Nome", "Número de telefone"),
      heading("Estatísticas"),
      paragraph("Utilizamos o Google Analytics para monitorar e analisar o tráfego da web."),
      paragraph("O Google pode utilizar os dados coletados para personalização de anúncios."),
    ],
  },
  {
    id: "direitos-usuarios",
    title: "Os direitos dos Usuários",
    blocks: [list("Retirar consentimento", "Objetar o processamento", "Acessar os dados", "Solicitar correção", "Restringir processamento", "Solicitar exclusão", "Solicitar portabilidade", "Registrar reclamação")],
  },
  {
    id: "exercer-direitos",
    title: "Como exercer estes direitos",
    blocks: [paragraph("Os pedidos poderão ser direcionados ao proprietário através dos dados de contato fornecidos neste documento.")],
  },
  {
    id: "logs",
    title: "Logs do sistema e manutenção",
    blocks: [paragraph("Para fins de operação e manutenção, este Aplicativo poderá coletar arquivos de log e utilizar endereço IP.")],
  },
  {
    id: "nao-rastreie",
    title: "Como são tratados os pedidos de “Não me Rastreie”",
    blocks: [paragraph("Este Aplicativo não suporta solicitações de “Não Me Rastreie”.")],
  },
  {
    id: "mudancas",
    title: "Mudanças nesta política de privacidade",
    blocks: [paragraph("O Proprietário se reserva o direito de alterar esta política de privacidade a qualquer momento.")],
  },
  {
    id: "usuarios-brasil",
    title: "Informações para Usuários que residem no Brasil",
    blocks: [paragraph("Esta seção complementa as demais informações desta política, conforme a Lei Geral de Proteção de Dados (LGPD).")],
  },
  {
    id: "direitos-brasileiro",
    title: "Seus direitos de privacidade como brasileiro",
    blocks: [list("Confirmação de tratamento", "Acesso aos dados", "Correção de dados", "Anonimização", "Bloqueio ou exclusão", "Portabilidade", "Retirada de consentimento", "Reclamação perante a ANPD")],
  },
  {
    id: "transferencia-internacional",
    title: "Transferência internacional de dados",
    blocks: [paragraph("Poderemos transferir informações pessoais para fora do Brasil nos casos permitidos pela legislação aplicável.")],
  },
  {
    id: "definicoes-juridicas",
    title: "Definições e referências jurídicas",
    blocks: [
      heading("Dados Pessoais"), paragraph("Qualquer informação que permita identificar uma pessoa física."),
      heading("Usuário"), paragraph("Pessoa que utiliza este Aplicativo."),
      heading("Controlador de Dados"), paragraph("Pessoa física ou jurídica responsável pelas finalidades e meios de processamento dos Dados Pessoais."),
      heading("Cookies"), paragraph("Pequenos conjuntos de dados armazenados no navegador do usuário."),
    ],
  },
  {
    id: "informacao-juridica",
    title: "Informação jurídica",
    blocks: [paragraph("Esta política foi preparada com base em múltiplas legislações, incluindo o GDPR e a LGPD.")],
  },
  {
    id: "alteracoes-politica",
    title: "Alterações na Política de Privacidade",
    blocks: [paragraph("Podemos atualizar esta Política de Privacidade periodicamente.")],
  },
  {
    id: "contato",
    title: "Contato",
    blocks: [paragraph("Caso tenha dúvidas:"), paragraph("contato@veritasprev.com.br")],
  },
];
