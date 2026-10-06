export const STAGES_DATA = [
  {
    id: 1,
    title: 'Gestão Financeira para Pequenos Negócios',
    stationName: 'Estação 1: A Gaveta da Vila',
    icon: '🗝️',
    causo: {
      speaker: 'Mestre Caju',
      avatar: '👴🏽',
      text: 'Ô de casa! Dona Socorro cozinha que é uma benção, vende marmita pelo WhatsApp como quem espalha semente de juazeiro. No final do mês, entra aquele dinheirão, mas cadê? O dinheiro some! Ela puxa a gaveta e diz: "Mestre, não sei se comi o lucro ou se foi a luz de casa que engoliu a galinha!" Eu digo a ela: "Socorro, quem mistura o bolso da casa com o caixa da bodega não sabe se tá rico ou se tá pedindo esmola de chapéu na mão!"',
      promptAudio: 'Dona Socorro vende bem, mas no fim do mês o dinheiro some. Mestre Caju pergunta: Quanto é do negócio e quanto é da casa? Quem mistura as contas não sabe se tem lucro ou se está pagando para trabalhar.'
    },
    objectives: [
      'Compreender a gestão financeira como pilar de sobrevivência do pequeno negócio.',
      'Separar radicalmente finanças pessoais e empresariais.',
      'Definir um pró-labore fixo e entender as três decisões: operação, investimento e financiamento.'
    ],
    saberCards: [
      {
        type: 'Conceito',
        title: 'A Separação Sagrada',
        content: 'No pequeno negócio, a maior causa de ilusão financeira é a mistura de contas: pagar a luz de casa com dinheiro do caixa e comprar frango com cartão pessoal. Sem separação, o dono nunca sabe se o negócio é viável.',
        badge: 'Regra de Ouro'
      },
      {
        type: 'Fórmula',
        title: 'Pró-Labore Fixo',
        content: 'Pró-Labore é o salário do dono pelo trabalho exercido. Deve ser um valor fixo estipulado, retirado em data certa (ex: dia 5). O lucro só é apurado e distribuído após pagar todos os custos, inclusive o pró-labore!',
        badge: 'Cálculo Básico'
      },
      {
        type: 'Exemplo',
        title: 'O Caso da Marmita',
        content: 'Socorro fatura R$ 18.000/mês. Gastos com insumos, embalagem e ajudante: R$ 12.000. Despesas fixas do ponto: R$ 1.500. Se ela estipula R$ 2.500 de pró-labore, sobram R$ 2.000 de lucro líquido para reinvestir.',
        badge: 'Na Prática'
      },
      {
        type: 'Alerta',
        title: 'Necessidade vs Oportunidade',
        content: 'Segundo o Sebrae, quem empreende por oportunidade tem 58% de chance de sobreviver além de dois anos. Quem empreende por necessidade tem apenas 28%. A gestão financeira encurta essa distância!',
        badge: 'Atenção'
      }
    ],
    oficinaId: 'gaveta',
    challengeQuestions: [
      {
        id: 'q1_1',
        question: 'Qual é a primeira atitude prática indispensável para Dona Socorro não misturar o dinheiro da casa com o da marmitaria?',
        options: [
          'Aumentar o preço de todas as marmitas em 50%',
          'Abrir uma conta bancária ou carteira digital exclusiva para o negócio e fixar um pró-labore',
          'Anotar os gastos da família e pagar tudo pelo cartão de crédito da empresa',
          'Guardar todo o dinheiro vivo embaixo do colchão para não pagar tarifas'
        ],
        answerIndex: 1,
        explanation: 'A abertura de conta exclusiva para pessoa jurídica (ou chave Pix separada) somada à fixação de um pró-labore mensal encerra a confusão patrimonial e revela a verdadeira lucratividade.'
      },
      {
        id: 'q1_2',
        question: 'O que diferencia o "Pró-Labore" da "Distribuição de Lucro" em um pequeno negócio?',
        options: [
          'Pró-labore é a remuneração pelo trabalho do dono; o lucro é a sobra após pagar todas as despesas e custos',
          'Não há diferença, são nomes jurídicos para a mesma retirada diária da gaveta',
          'Pró-labore só existe para quem é MEI formalizado com contador',
          'O lucro deve ser retirado diariamente em espécie e o pró-labore uma vez por ano'
        ],
        answerIndex: 0,
        explanation: 'Pró-labore remunera o trabalho operacional do gestor (faz parte dos custos do negócio), enquanto o lucro é o resultado residual do empreendimento.'
      },
      {
        id: 'q1_3',
        question: 'Segundo dados do Sebrae (2025), a taxa de sobrevivência dos pequenos negócios no Ceará aos dois anos é de 71,6%. Qual dos fatores abaixo aproxima o empreendedor por necessidade do sucesso de quem planejou?',
        options: [
          'Depender exclusivamente do fiado como atrativo de clientes',
          'Prática contínua de gestão financeira com controle de caixa e planejamento',
          'Recorrer a agiotas para não burocratizar documentos bancários',
          'Manter a empresa sem nenhuma anotação de entradas e saídas'
        ],
        answerIndex: 1,
        explanation: 'Estudos do Sebrae (2026) demonstram que a orientação e consultoria em gestão financeira reduzem em até 68% o risco de encerramento precoce das empresas.'
      },
      {
        id: 'q1_4',
        question: 'Quais são as três perguntas estruturantes que guiam toda a gestão financeira do pequeno negócio?',
        options: [
          'Quanto custa o dólar? Devo comprar ouro? Onde investir em ações americanas?',
          'Quanto entra e quando (caixa)? Quanto custa produzir (custos)? De onde vem o capital de longo prazo?',
          'Quantos seguidores tenho no Instagram? Qual dancinha viraliza? Qual influencer contratar?',
          'Qual imposto sonegar? Como driblar a fiscalização? Onde esconder a nota fiscal?'
        ],
        answerIndex: 1,
        explanation: 'As três grandes decisões financeiras cobrem: Operação diária (caixa/giro), Custos e Precificação (produção) e Financiamento e Investimento (longo prazo).'
      },
      {
        id: 'q1_5',
        question: 'Se Dona Socorro fatura R$ 15.000 em um mês, tem custos operacionais de R$ 10.000 e retira R$ 2.000 de pró-labore, qual é o lucro real remanescente para o negócio?',
        options: [
          'R$ 5.000',
          'R$ 3.000',
          'R$ 13.000',
          'Prejuízo de R$ 2.000'
        ],
        answerIndex: 1,
        explanation: 'Lucro = Faturamento (R$ 15.000) − Custos (R$ 10.000) − Pró-labore (R$ 2.000) = R$ 3.000.'
      }
    ],
    lenteCaju: {
      cidades: 'No Cariri e nas cidades do interior, a casa e o comércio muitas vezes dividem as mesmas quatro paredes: a bodega fica na sala da frente e a cozinha da marmita é o fogão da família. A ausência de separação física exige que a separação contábil seja ainda mais rigorosa.',
      analise: 'A gaveta misturada é uma regra informal enraizada: a cultura de que "tudo o que entra é da família". Essa instituição informal gera alta assimetria de informação: nem o próprio dono sabe sua renda, nem o banco consegue avaliar sua capacidade de pagamento.',
      juridico: 'A Lei Complementar 128/2008 (MEI) permite a criação rápida de um CNPJ vinculado ao CPF, viabilizando conta bancária PJ desvinculada. Embora no MEI o patrimônio responda por dívidas, a segregação bancária traz blindagem gerencial.',
      ubiquo: 'No cotidiano do semiárido, o celular é a ferramenta ubíqua mais democrática. O aplicativo Bodega CAJU oferece o "Caderninho Digital" no próprio aparelho para registrar na hora cada centavo que entra e sai.',
      reflexao: 'No seu bairro ou na sua casa, você já viu comerciantes pagando o pão da manhã com o dinheiro da gaveta do negócio? Quais as consequências disso a longo prazo?'
    },
    realidadeLocal: 'O Ceará ostenta uma das maiores participações femininas no pequeno empreendedorismo: 36% dos negócios são liderados por mulheres (Sebrae, 2025). Muitas sustentam a família sozinhas e equilibram afazeres domésticos e comerciais no mesmo espaço.',
    missaoDeCampo: 'Entreviste um pequeno comerciante do seu bairro (feirante, marmiteira, dono de mercearia) com 3 perguntas simples: "Tem conta bancária separada?", "Tira um salário fixo todo mês?", "Sabe quanto lucrou mês passado?". Registre aqui as respostas anonimizadas.',
    selo: { name: 'Gaveta Arrumada', icon: '🗄️' }
  },
  {
    id: 2,
    title: 'Teorias Financeiras Estratégicas',
    stationName: 'Estação 2: O Terreiro das Teorias',
    icon: '🧭',
    causo: {
      speaker: 'Mestre Caju',
      avatar: '👴🏽',
      text: 'Dois compadres abriram oficina no Crato no mesmo dia, com a mesma quantia. Passou três anos: um compadre tá com caminhonete nova e clientela até Juazeiro, e o outro teve de vender as ferramentas pro ferro-velho. O povo diz: "Foi sorte!" Eu digo: "Não foi sorte nem mandinga! Foi teoria pura aplicada na poeira do chão!" Quem conhece as regras do jogo e sabe onde aperta o sapato não tropeça na primeira curva da Chapada.',
      promptAudio: 'Dois vizinhos abriram o mesmo negócio no mesmo ano. Um cresceu, o outro fechou. Mestre Caju diz: Não foi sorte. Cada um jogou com as regras que tinha.'
    },
    objectives: [
      'Conhecer as 5 teorias financeiras do Módulo 3 e saber diagnosticá-las no pequeno negócio.',
      'Compreender a Nova Economia Institucional (NEI) e como os custos de transação moldam o sertão.',
      'Diferenciar restrição de liquidez de falta de viabilidade econômica.'
    ],
    saberCards: [
      {
        type: 'Conceito',
        title: 'Ciclo de Vida & Restrições',
        content: 'O Ciclo de Vida mostra que negócios nascem, tentam sobreviver e buscam crescer. A Teoria das Restrições Financeiras explica por que excelentes ideias não decolam: assimetria de informação impede o crédito formal.',
        badge: 'Teorias 1 e 2'
      },
      {
        type: 'Conceito',
        title: 'Capital de Giro & Utilidade',
        content: 'A Gestão do Capital de Giro ensina que faltar caixa no dia a dia quebra até empresas altamente lucrativas. Já a Utilidade Esperada explica por que o sertanejo muitas vezes prefere o ganho certo menor ao risco incerto.',
        badge: 'Teorias 3 e 4'
      },
      {
        type: 'Conceito',
        title: 'Recursos e Capacidades (VBR)',
        content: 'Nem toda vantagem é dinheiro! Reputação no bairro, receita secreta da família e rede de confiança (capital social) são recursos raros e difíceis de copiar que sustentam a bodega.',
        badge: 'Teoria 5'
      },
      {
        type: 'Institucional',
        title: 'Nova Economia Institucional (NEI)',
        content: 'North define instituições como "as regras do jogo". Williamson explica os custos de transação (buscar preços, negociar, fiscalizar e cobrar). No Cariri, as regras informais determinam o sucesso!',
        badge: 'Lente Teórica'
      }
    ],
    oficinaId: 'teorias',
    challengeQuestions: [
      {
        id: 'q2_1',
        question: 'Seu Expedito tem uma barraca lucrativa nas romarias, mas teme pegar um empréstimo para comprar mais mercadoria porque tem medo de a romaria ser mais fraca que o esperado. Qual teoria explica essa preferência pelo ganho certo e seguro?',
        options: [
          'Teoria da Utilidade Esperada e aversão ao risco',
          'Teoria do Caos e Entropia',
          'Teoria da Moeda Pura',
          'Teoria dos Mercados Eficientes'
        ],
        answerIndex: 0,
        explanation: 'A Teoria da Utilidade Esperada (von Neumann & Morgenstern) modela como pessoas tomam decisões sob incerteza e por que a aversão ao risco faz o pequeno empreendedor evitar dívidas alavancadas.'
      },
      {
        id: 'q2_2',
        question: 'Uma marmitaria muito saborosa que vive com pedidos cheios vai à falência em 90 dias porque seus clientes pagam no fim do mês, mas os fornecedores de carne exigem pagamento à vista na entrega. Essa quebra é explicada por qual teoria?',
        options: [
          'Teoria da Gestão do Capital de Giro (crise de liquidez e descasamento de prazos)',
          'Teoria Neoclássica do Monopólio',
          'Teoria do Equilíbrio Geral Walrasiano',
          'Teoria da Curva de Phillips'
        ],
        answerIndex: 0,
        explanation: 'Um negócio pode ser contabilmente rentável e lucrativo, mas se não tiver caixa disponível para bancar o ciclo financeiro, sofrerá asfixia de liquidez.'
      },
      {
        id: 'q2_3',
        question: 'Segundo Douglass North, o que são "instituições" no contexto econômico?',
        options: [
          'Apenas os prédios públicos da prefeitura e fórum',
          'As regras do jogo de uma sociedade, compostas por normas formais (leis) e informais (costumes e cultura)',
          'Bancos estatais que concedem crédito a juros subsidiados',
          'Sindicatos trabalhistas patronais'
        ],
        answerIndex: 1,
        explanation: 'Instituições são as restrições humanamente concebidas que estruturam a interação política, econômica e social: leis formais, constituições e regras informais de conduta.'
      },
      {
        id: 'q2_4',
        question: 'Quais são os quatro custos de transação clássicos destacados por Oliver Williamson?',
        options: [
          'Informação/busca, negociação, monitoramento e enforcement (cumprimento/execução)',
          'Aluguel, frete, luz e água',
          'Salário, férias, 13º e FGTS',
          'Juros da Selic, inflação do IPCA, câmbio do dólar e taxa de risco soberano'
        ],
        answerIndex: 0,
        explanation: 'Custos de transação são os custos de transacionar no mercado: buscar parceiros e preços, formular contratos, fiscalizar a entrega e exigir o cumprimento contratual.'
      },
      {
        id: 'q2_5',
        question: 'No Ateliê de Couro de Nova Olinda, a habilidade secular transmitida por gerações e o reconhecimento cultural no Cariri representam qual conceito da Teoria dos Recursos e Capacidades (VBR)?',
        options: [
          'Custo afundado irreversível',
          'Recurso valioso, raro e de difícil imitação que gera vantagem competitiva sustentável',
          'Passivo circulante de curto prazo',
          'Depreciação acumulada do maquinário'
        ],
        answerIndex: 1,
        explanation: 'Na Visão Baseada em Recursos (Barney), ativos intangíveis como tradição artesanal, saber-fazer e prestígio cultural geram valor diferenciado impossível de ser replicado por indústrias de massa.'
      }
    ],
    lenteCaju: {
      cidades: 'Cidades médias e pequenas do semiárido concentram negócios nas fases iniciais do ciclo de vida (nascimento e sobrevivência). Raras são as empresas locais centenárias, o que reduz os modelos de maturidade para os jovens empreendedores.',
      analise: 'As restrições de crédito no interior não decorrem de falta de liquidez no sistema, mas de altos custos de transação: assimetria de informação, ausência de imóveis escriturados para garantia real e custos elevados de fiscalização bancária.',
      juridico: 'Leis como o Cadastro Positivo (Lei 12.414/2011), o Microcrédito Produtivo Orientado (Lei 13.636/2018) e os fundos garantidores (Pronampe/FGO) surgiram justamente para mitigar esses custos de transação jurídicos.',
      ubiquo: 'O app Bodega CAJU transforma abstrações teóricas em sabedoria de bolso: a cada decisão na oficina, o jogador enxerga qual teoria econômica está em jogo.',
      reflexao: 'Qual é o recurso mais valioso do negócio que você escolheu no jogo: dinheiro, ponto comercial ou a confiança dos clientes?'
    },
    realidadeLocal: 'Estudo do Sebrae sobre encerramento de microempresas no Ceará revela que 42% dos proprietários estavam desempregados há menos de três meses quando decidiram abrir o negócio. É o retrato límpido do empreendedorismo por sobrevivência.',
    missaoDeCampo: 'Escolha um comércio real da sua rua e redija um parágrafo enquadrando-o em uma fase do Ciclo de Vida e justificando com uma das 5 teorias financeiras aprendidas.',
    selo: { name: 'Lente Afiada', icon: '🔍' }
  },
  {
    id: 3,
    title: 'Planejamento Financeiro',
    stationName: 'Estação 3: O Calendário da Safra',
    icon: '📅',
    causo: {
      speaker: 'Mestre Caju',
      avatar: '👴🏽',
      text: 'Dona Socorro me disse outro dia: "Mestre, meu sonho é comprar um freezer duplex de quatro portas pra guardar os frangos da safra do pequi quando sobrar dinheiro!" Eu olhei bem nos olhos dela e perguntei: "Minha filha, e quando é que vai sobrar se você não colocar a data no papel?" Dinheiro sem dono e sem plano é que nem água na bacia furada: evapora e escorre sem matar a sede de ninguém!',
      promptAudio: 'Dona Socorro quer comprar um freezer novo quando sobrar dinheiro. Mestre Caju pergunta: E quando vai sobrar? Planejamento é colocar números e prazos no sonho.'
    },
    objectives: [
      'Projetar receitas, custos, margens e lucro líquido em horizontes de 12 meses.',
      'Construir e dimensionar a reserva de emergência para atravessar meses de estiagem ou romaria fraca.',
      'Calcular o volume necessário de vendas para atingir uma meta de lucro estipulada.'
    ],
    saberCards: [
      {
        type: 'Fórmula',
        title: 'Faturamento Previsto',
        content: 'Faturamento Previsto = Unidades/dia × Preço Médio × Dias Trabalhados no Mês. Exemplo: 40 marmitas/dia × R$ 15,00 × 26 dias = R$ 15.600,00.',
        badge: 'Projeção Básica'
      },
      {
        type: 'Fórmula',
        title: 'Lucro Líquido Real',
        content: 'Lucro Bruto = Receita − Custos Variáveis. Lucro Líquido = Lucro Bruto − Despesas Fixas − Pró-labore − Impostos.',
        badge: 'DRE Prática'
      },
      {
        type: 'Fórmula',
        title: 'Volume para Meta de Lucro',
        content: 'Q = (Custos Fixos Totais + Lucro Almejado) ÷ (Preço Unitário − Custo Variável Unitário). Mostra exatamente quantas unidades você precisa vender!',
        badge: 'Cálculo Chave'
      },
      {
        type: 'Regra',
        title: 'Reserva da Sazonalidade',
        content: 'Em negócios sazonais do Cariri, separe de 10% a 20% do faturamento dos meses de pico (romarias de setembro/novembro) numa aplicação de liquidez diária para bancar os custos fixos dos meses de calmaria.',
        badge: 'Sustentabilidade'
      }
    ],
    oficinaId: 'calendario',
    challengeQuestions: [
      {
        id: 'q3_1',
        question: 'Dona Socorro vende marmitas a R$ 15,00 com custo variável unitário de R$ 9,00. As despesas fixas da marmitaria somam R$ 1.800,00/mês e ela quer um lucro líquido de R$ 2.400,00. Quantas marmitas ela precisa vender no mês?',
        options: [
          '700 marmitas',
          '500 marmitas',
          '420 marmitas',
          '950 marmitas'
        ],
        answerIndex: 0,
        explanation: 'Margem de Contribuição unitária = 15 - 9 = R$ 6,00. Quantidade = (Custos Fixos + Lucro) ÷ MC = (1.800 + 2.400) ÷ 6 = 4.200 ÷ 6 = 700 marmitas no mês (cerca de 27 marmitas por dia).'
      },
      {
        id: 'q3_2',
        question: 'Seu Expedito fatura R$ 20.000 durante a Romaria das Dores em setembro e sabe que em outubro o faturamento cai para R$ 4.000, enquanto seus custos fixos são R$ 3.000/mês. O que a boa gestão financeira recomenda fazer com o excedente de setembro?',
        options: [
          'Gastar tudo imediatamente com churrasco e compras pessoais',
          'Constituir uma reserva de contingência em conta remunerada de alta liquidez para cobrir os meses de baixa demanda',
          'Comprar um veículo financiado em 60 parcelas sem entrada',
          'Emprestar para parentes sem prazo determinado de devolução'
        ],
        answerIndex: 1,
        explanation: 'A reserva de emergência e contingência suaviza as oscilações sazonais do semiárido, garantindo que as despesas fixas sejam pontualmente honradas nos meses de estiagem ou entressafra de romeiros.'
      },
      {
        id: 'q3_3',
        question: 'Qual é o teto máximo anual de faturamento para que um empreendimento permaneça enquadrado como Microempreendedor Individual (MEI) em 2026?',
        options: [
          'R$ 50.000,00',
          'R$ 81.000,00 (média de R$ 6.750,00/mês)',
          'R$ 180.000,00',
          'R$ 360.000,00'
        ],
        answerIndex: 1,
        explanation: 'Em 2026, o teto do MEI permanece estabelecido em R$ 81.000,00 anuais (projetos de ampliação como o PLP 108/2021 ainda aguardam tramitação final).'
      },
      {
        id: 'q3_4',
        question: 'Um plano financeiro que nunca compara o "Previsto" com o "Realizado" comete qual falha grave?',
        options: [
          'Impede o diagnóstico de desvios e impede a correção preventiva de rotas antes que falte caixa',
          'Aumenta o imposto do Simples Nacional em dobro',
          'Faz a maquininha de cartão travar automaticamente',
          'Torna o CNPJ irregular perante o Banco Central'
        ],
        answerIndex: 0,
        explanation: 'O ciclo de planejamento só se fecha quando o realizado é confrontado com a meta planejada, permitindo identificar onde os custos estouraram ou onde as vendas ficaram abaixo do esperado.'
      },
      {
        id: 'q3_5',
        question: 'Se a barraca de romaria prevê vender 800 lembrancinhas a R$ 10,00 cada, mas chuvas atípicas reduzem as vendas em 30%, qual foi a receita realizada?',
        options: [
          'R$ 8.000,00',
          'R$ 5.600,00',
          'R$ 6.400,00',
          'R$ 2.400,00'
        ],
        answerIndex: 1,
        explanation: 'Previsto = 800 × 10 = R$ 8.000. Queda de 30% significa que vendeu 70% do previsto: R$ 8.000 × 0,70 = R$ 5.600 (ou 560 unidades × R$ 10,00).'
      }
    ],
    lenteCaju: {
      cidades: 'Cidades de forte apelo religioso (Juazeiro do Norte) ou festivo (Crato com a ExpoCrato) vivem em ondas de alta intensidade. Planejar no Cariri não é pensar num gráfico reto de 12 meses idênticos, mas dominar os picos e vales da economia sazonal.',
      analise: 'A norma informal predominante na subsistência é "o que entra hoje gasta hoje". Essa cultura de curto prazo é racional em contextos de insegurança extrema, mas aprisiona o negócio. O planejamento orçamentário é uma regra formal autoimposta que quebra esse ciclo vicioso.',
      juridico: 'O planejamento deve prever o limite de enquadramento tributário do MEI (R$ 81 mil/ano). Ultrapassar o teto sem planejamento pode desenquadrar o negócio retroativamente, gerando cobranças inesperadas do Simples Nacional.',
      ubiquo: 'Planilhas pesadas de computador não chegam ao balcão. O simulador "Calendário da Safra" funciona com toques simples no celular, permitindo ao aluno ou comerciante visualizar os 12 meses na ponta dos dedos.',
      reflexao: 'Se as romarias ou a feira da sua cidade fossem suspensas por 2 meses, quantos dias o comércio local conseguiria sobreviver sem entrar em colapso?'
    },
    realidadeLocal: 'Estudo apresentado na Semana de Iniciação Científica da URCA (2025) constatou que cerca de 65% dos comerciantes ambulantes de Juazeiro do Norte não mantêm reserva financeira para o primeiro trimestre do ano, período de menor fluxo de romeiros.',
    missaoDeCampo: 'Converse com um comerciante e pergunte quais são os 3 melhores e os 3 piores meses de venda no ano. Em seguida, ajude-o a desenhar uma meta de reserva financeira para a baixa temporada.',
    selo: { name: 'Calendário em Dia', icon: '📆' }
  },
  {
    id: 4,
    title: 'Fluxo de Caixa',
    stationName: 'Estação 4: O Caixa da Bodega',
    icon: '💵',
    causo: {
      speaker: 'Mestre Caju',
      avatar: '👴🏽',
      text: 'Seu Zé da Bodega chegou na minha casa com as mãos na cabeça: "Mestre, vendi quase trinta mil reais no mês passado! A mercearia tava cheia de gente! Mas hoje é dia 10, o caminhão da distribuidora tá parado na porta buzinando e eu não tenho quatrocentos contos pra pagar o boleto!" Aí eu sentei com ele no banco de madeira e disse: "Seu Zé, anote bem aí na parede: Lucro é uma opinião; Caixa é um fato sagrado!" Vender no fiado e no cartão a perder de vista não enche bucho de fornecedor.',
      promptAudio: 'A bodega lucrou no mês, mas no dia 10 não havia dinheiro para pagar o fornecedor. Mestre Caju ensina: Lucro é opinião, caixa é fato.'
    },
    objectives: [
      'Construir e interpretar o fluxo de caixa diário e semanal.',
      'Diferenciar o Regime de Competência (lucro contábil) do Regime de Caixa (dinheiro na mão).',
      'Identificar e agir preventivamente contra déficits projetados no fluxo de caixa.'
    ],
    saberCards: [
      {
        type: 'Fórmula',
        title: 'Saldo Final de Caixa',
        content: 'Saldo Final = Saldo Inicial + Total de Entradas Efetivas − Total de Saídas Efetivas. O saldo final de um dia (ou mês) torna-se o saldo inicial do dia seguinte.',
        badge: 'Equação de Caixa'
      },
      {
        type: 'Conceito',
        title: 'Competência vs Caixa',
        content: 'Se você vende R$ 1.000 em 3x no cartão hoje, na competência você teve receita de R$ 1.000 hoje. No caixa, você só receberá R$ 333 nos dias 30, 60 e 90 (descontadas as taxas da operadora).',
        badge: 'Cuidado Vital'
      },
      {
        type: 'Estratégia',
        title: 'Ordem de Ação no Déficit',
        content: 'Quando o caixa vai faltar, a ordem correta de medidas menos caras é: 1) Renegociar prazo com fornecedor; 2) Cobrar recebíveis atrasados (fiado/Pix); 3) Postergar compras; 4) Só por último, tomar crédito.',
        badge: 'Gestão de Crise'
      },
      {
        type: 'Ferramenta',
        title: 'Pix & Pix Cobrança',
        content: 'O Pix transformou as bodegas do Cariri: dinheiro cai na conta em segundos, com custo de transação zero ou ínfimo, eliminando a dependência do troco em moedas e do fiado arriscado.',
        badge: 'Tecnologia'
      }
    ],
    oficinaId: 'caixa',
    challengeQuestions: [
      {
        id: 'q4_1',
        question: 'Uma mercearia iniciou o dia com saldo de R$ 450,00. Durante o dia, recebeu R$ 1.200,00 em dinheiro e Pix, mas precisou pagar R$ 800,00 de distribuidor e R$ 350,00 de energia elétrica. Qual é o saldo de fechamento de caixa desse dia?',
        options: [
          'R$ 500,00',
          'R$ 850,00',
          'R$ 1.300,00',
          'R$ 50,00'
        ],
        answerIndex: 0,
        explanation: 'Saldo Final = Saldo Inicial (450) + Entradas (1.200) − Saídas (800 + 350 = 1.150) = 1.650 − 1.150 = R$ 500,00.'
      },
      {
        id: 'q4_2',
        question: 'O que significa a famosa máxima financeira "Lucro é opinião, caixa é fato"?',
        options: [
          'O lucro apurado pelo regime de competência pode ser ilusório se o dinheiro estiver preso em contas a receber de clientes ou estoques parados',
          'Contadores sempre mentem nos relatórios',
          'O dinheiro no banco não tem valor econômico',
          'Só devemos trabalhar com prejuízo planejado'
        ],
        answerIndex: 0,
        explanation: 'Uma empresa pode apresentar DRE positiva com alto lucro contábil, mas ir à falência no dia seguinte por não possuir saldo financeiro disponível para quitar suas obrigações correntes.'
      },
      {
        id: 'q4_3',
        question: 'Diante de uma projeção de saldo de caixa negativo para a próxima quarta-feira, qual deve ser a PRIMEIRA medida econômica a ser tomada pelo pequeno empreendedor?',
        options: [
          'Contratar um empréstimo no cheque especial bancário',
          'Procurar um agiota na praça central',
          'Renegociar antecipadamente os prazos com fornecedores ou intensificar cobrança de faturas pendentes',
          'Fechar a empresa e decretar autofalência imediatamente'
        ],
        answerIndex: 2,
        explanation: 'Medidas operacionais de baixo custo (renegociar prazos com parceiros comerciais e acelerar cobranças de recebíveis amigáveis) devem sempre anteceder o recurso a linhas de crédito onerosas.'
      },
      {
        id: 'q4_4',
        question: 'Segundo dados do Sebrae, que percentual de MEIs que fecharam as portas apontaram a "falta de capital de giro e descontrole do caixa diário" como a causa principal?',
        options: [
          'Menos de 2%',
          'Aproximadamente 22%',
          'Quase 90%',
          'Zero por cento'
        ],
        answerIndex: 1,
        explanation: 'O Atlas dos Pequenos Negócios do Sebrae constata que 22% das empresas que encerraram atividades citaram diretamente a asfixia de capital de giro e caixa descontrolado.'
      },
      {
        id: 'q4_5',
        question: 'Como o pagamento via Pix impactou positivamente o fluxo de caixa dos pequenos negócios no interior nordestino?',
        options: [
          'Aumentou o tempo de liquidação financeira para 30 dias úteis',
          'Reduziu o ciclo de recebimento para tempo real e diminuiu o risco do fiado não quitado',
          'Obrigou o comerciante a emitir cheques sem fundo',
          'Eliminou a necessidade de comprar mercadorias'
        ],
        answerIndex: 1,
        explanation: 'A liquidação instantânea em 24/7 proporcionada pelo Pix injeta liquidez imediata no caixa, diminuindo a dependência de crédito rotativo e o custo de custódia de papel-moeda.'
      }
    ],
    lenteCaju: {
      cidades: 'Nas bodegas do Crato, Barbalha e Juazeiro, a caderneta de fiado é uma instituição social centenária. Na prática, a bodega funciona como um banco comunitário para as famílias de baixa renda.',
      analise: 'O fiado se sustenta no capital social e na reputação familiar (enforcement comunitário). Quando a comunidade é coesa, a inadimplência é baixa. Contudo, quando a cidade cresce e os vínculos se afrouxam, o risco de calote migra todo para o caixa do bodegueiro.',
      juridico: 'Para vendas com prazo, o uso de títulos executivos extrajudiciais simples (como nota promissória assinada ou confissão de dívida) viabiliza a cobrança célere via Juizado Especial Cível (Lei 9.099/1995), sem necessidade de advogado em causas de até 20 salários mínimos.',
      ubiquo: 'O Pix Cobrança com QR Code dinâmico impresso no balcão ou enviado por WhatsApp substitui a antiga caderneta de papel, reduzindo o custo de monitoramento.',
      reflexao: 'Até que ponto o comerciante do Cariri pode dizer "não vendo fiado" sem perder sua freguesia mais fiel?'
    },
    realidadeLocal: 'Em pesquisa de campo realizada em feiras livres da Região Metropolitana do Cariri, mais de 78% dos pequenos feirantes já utilizam o Pix como principal forma de recebimento, mas menos de 15% mantêm um livro-caixa diário com anotações de saldo.',
    missaoDeCampo: 'Acompanhe as entradas e saídas de um negócio real (ou dos seus próprios gastos) durante 7 dias seguidos e preencha a planilha de fechamento de caixa no aplicativo.',
    selo: { name: 'Caixa na Mão', icon: '💰' }
  },
  {
    id: 5,
    title: 'Custos e Despesas',
    stationName: 'Estação 5: O Raio-X da Marmita',
    icon: '📊',
    causo: {
      speaker: 'Mestre Caju',
      avatar: '👴🏽',
      text: 'Socorro veio me mostrar orgulhosa a conta da quentinha: "Mestre, eu compro o peito de frango por cinco reais, o arroz por um real, a salada por um real... Pronto, a marmita me custa sete reais! Vendo por doze e ganho cinco de lucro limpo!" Eu peguei na mão dela, chamei ela pra perto do fogão e perguntei: "Ô criatura de Deus, e o botijão de gás aceso quatro horas por dia? E a marmitex de isopor? E o motoboy? E a água sanitária pra lavar a panela? E o seu suor?" Ela arregalou os olhos. Quem não bota os custos todos no cálculo acaba vendendo o almoço pra comprar a casca do feijão!',
      promptAudio: 'Socorro calcula o custo da marmita só pelo frango e arroz. Mestre Caju lembra: E o gás? E a embalagem? E o seu trabalho? Não confunda custo direto com custo total.'
    },
    objectives: [
      'Diferenciar custos (ligados à produção) de despesas (ligadas à administração e vendas).',
      'Classificar gastos em fixos, variáveis e semivariáveis.',
      'Calcular Custo Variável Unitário (CVu), Despesa Fixa Unitária (DFu) e Custo Total Unitário.',
      'Montar a ficha técnica detalhada do produto.'
    ],
    saberCards: [
      {
        type: 'Conceito',
        title: 'Custo vs Despesa',
        content: 'Custo: tudo o que é consumido para fazer o produto (ingredientes, gás de cozinha, embalagem, ajudante da cozinha). Despesa: manutenção do negócio (internet, propaganda, aluguel da sala, contador).',
        badge: 'Classificação'
      },
      {
        type: 'Fórmula',
        title: 'Custo Variável Unitário (CVu)',
        content: 'CVu = Ingredientes + Embalagem descartável + Gás por porção + Comissão por venda. Se você produz 0 unidades, o CVu é zero; se produz 100, ele cresce proporcionalmente.',
        badge: 'Cálculo Direto'
      },
      {
        type: 'Fórmula',
        title: 'Diluição dos Fixos (Escala)',
        content: 'Despesa Fixa Unitária (DFu) = Gastos Fixos Totais ÷ Quantidade Produzida. Quanto mais você vende, menor fica o peso do aluguel e da internet em cada unidade!',
        badge: 'Ganho de Escala'
      },
      {
        type: 'Prática',
        title: 'A Ficha Técnica',
        content: 'A ficha técnica padroniza a receita: pesa cada grama de carne, mede a colher de óleo e o tempo de fogo. Evita desperdício e garante que o custo de ontem seja o mesmo de amanhã.',
        badge: 'Ferramenta'
      }
    ],
    oficinaId: 'custos',
    challengeQuestions: [
      {
        id: 'q5_1',
        question: 'Dona Socorro gasta R$ 4,50 em carne, R$ 1,80 em grãos/salada, R$ 0,90 em embalagem e estima R$ 0,80 de gás e temperos por marmita. Seus custos fixos mensais com aluguel da cozinha e pró-labore somam R$ 1.600,00. Produzindo 800 marmitas por mês, qual é o CUSTO TOTAL UNITÁRIO de cada refeição?',
        options: [
          'R$ 8,00',
          'R$ 10,00',
          'R$ 12,50',
          'R$ 7,20'
        ],
        answerIndex: 1,
        explanation: 'CVu = 4,50 + 1,80 + 0,90 + 0,80 = R$ 8,00. Custo Fixo Unitário (DFu) = 1.600 ÷ 800 = R$ 2,00. Custo Total Unitário = CVu + DFu = 8,00 + 2,00 = R$ 10,00 por marmita.'
      },
      {
        id: 'q5_2',
        question: 'Se Dona Socorro aumentar sua produção de 800 para 1.600 marmitas por mês, o que acontecerá com a Despesa Fixa Unitária (DFu), mantidas constantes as despesas fixas de R$ 1.600,00?',
        options: [
          'Aumentará para R$ 4,00 por unidade',
          'Permanecerá inalterada em R$ 2,00 por unidade',
          'Cairá pela metade, passando para R$ 1,00 por unidade (ganho de escala)',
          'Tornar-se-á negativa gerando prejuízo imediato'
        ],
        answerIndex: 2,
        explanation: 'DFu = 1.600 ÷ 1.600 = R$ 1,00. O aumento da quantidade dilui as despesas fixas por unidade, o que caracteriza a economia de escala.'
      },
      {
        id: 'q5_3',
        question: 'A conta de energia elétrica de uma padaria que possui freezers ligados 24 horas e fornos elétricos acionados conforme a demanda de fornadas é classificada como:',
        options: [
          'Custo fixo puro',
          'Gasto semivariável (possui uma parcela fixa mínima e uma parcela que varia com o volume)',
          'Despesa extraordinária não operacional',
          'Receita financeira diferida'
        ],
        answerIndex: 1,
        explanation: 'Gastos semivariáveis possuem uma base mínima de consumo contínuo independente da produção somada a uma parcela variável que acompanha a intensidade da atividade fabril.'
      },
      {
        id: 'q5_4',
        question: 'Qual dos seguintes itens NÃO deve ser classificado como Custo Variável na produção de calçados artesanais em Juazeiro do Norte?',
        options: [
          'O couro bovino utilizado na confecção do cabedal',
          'A fivela metálica colocada em cada par',
          'A taxa de anuidade do alvará de funcionamento da oficina pago à prefeitura',
          'A cola especial para solado utilizada por par fabricado'
        ],
        answerIndex: 2,
        explanation: 'A anuidade do alvará é um gasto fixo anual legal, que independe da quantidade de calçados produzidos no período.'
      },
      {
        id: 'q5_5',
        question: 'No evento real simulado da Etapa 5, a alta do botijão de gás eleva o custo variável de cada refeição em R$ 0,60. Se o preço de venda não for alterado, qual o impacto imediato na margem de contribuição unitária?',
        options: [
          'A margem de contribuição sobe R$ 0,60',
          'A margem de contribuição é reduzida exatamente em R$ 0,60 por refeição',
          'Nenhum impacto, pois gás é despesa não dedutível',
          'O faturamento bruto dobra automaticamente'
        ],
        answerIndex: 1,
        explanation: 'Como MC = Preço − Gastos Variáveis, qualquer aumento direto de R$ 0,60 nos custos variáveis sem reajuste de preço corrói diretamente R$ 0,60 da margem de contribuição unitária.'
      }
    ],
    lenteCaju: {
      cidades: 'No semiárido, parte expressiva dos insumos fabris e embalagens vem de fora (Fortaleza, Recife, São Paulo), encarecendo o frete rodoviário. Já ingredientes locais (farinha, jerimum, feijão-de-corda, pequi) oferecem vantagens de custo em épocas de safra.',
      analise: 'A figura do "atravessador" na Ceasa do Cariri é uma instituição informal que reduz custos de busca para o pequeno comprador individual, mas captura margem. A criação de cooperativas ou associações de compras coletivas reduz esses custos de transação.',
      juridico: 'A organização em cooperativa formal (Lei 5.764/1971) viabiliza compras conjuntas com descontos industriais e qualifica os pequenos produtores para programas de compras públicas (como PAA e PNAE).',
      ubiquo: 'O app Bodega CAJU gera uma Ficha Técnica fotográfica exportável que o cozinheiro ou artesão pode salvar na galeria do celular e enviar para ajudantes pelo WhatsApp.',
      reflexao: 'Você prefere comprar insumos locais e sazonais mais baratos ou pagar mais caro o ano todo por produtos padronizados vindos de longe?'
    },
    realidadeLocal: 'O Cariri abriga o polo calçadista do CRAJUBAR (Crato, Juazeiro, Barbalha). Pequenas fábricas de calçados frequentemente operam com margens estreitas de R$ 1,50 a R$ 3,00 por par, tornando o cálculo milimétrico da ficha técnica a diferença entre o lucro e o fechamento.',
    missaoDeCampo: 'Vá a uma feira ou supermercado da cidade, anote o preço de 5 insumos essenciais do negócio que você escolheu no jogo e atualize a ficha técnica na oficina.',
    selo: { name: 'Ficha Técnica', icon: '📝' }
  },
  {
    id: 6,
    title: 'Precificação Estratégica',
    stationName: 'Estação 6: O Balcão de Preço',
    icon: '🏷️',
    causo: {
      speaker: 'Mestre Caju',
      avatar: '👴🏽',
      text: 'Socorro chegou aperreada: "Mestre, a marmitaria da esquina baixou a quentinha pra treze reais! Minha conta deu quatorze reais e cinquenta centavos. Devo baixar meu preço pra doze e cinquenta pra não perder cliente?" Eu segurei no ombro dela e respondi: "Socorro, se você entrar em briga de foice no escuro pra ver quem cobra mais barato, os dois vão morrer abraçados de fome! Preço não se copia da esquina; preço se calcula na ponta do lápis, respeitando sua qualidade e cobrindo suas taxas!"',
      promptAudio: 'O concorrente da esquina vende a marmita a 13 reais. Socorro calculou 14 reais. Ela pergunta: Baixo o preço? Mestre Caju ensina a arte do markup e valor percebido.'
    },
    objectives: [
      'Calcular o preço de venda através do método do Markup Divisor.',
      'Incorporar impostos, taxas de maquininhas de cartão/aplicativos e margem líquida de lucro.',
      'Avaliar o impacto destrutivo de descontos precipitados na margem de contribuição.',
      'Combinar custo interno com valor percebido pelo cliente caririense.'
    ],
    saberCards: [
      {
        type: 'Fórmula',
        title: 'Markup Divisor',
        content: 'Preço = Custo Unitário ÷ [1 − (% Despesas Variáveis + % Margem Desejada)]. Se a maquininha cobra 5% e você quer 20% de lucro: Denominador = 1 − 0,25 = 0,75.',
        badge: 'A Fórmula Real'
      },
      {
        type: 'Conceito',
        title: 'O Perigo do Markup Multiplicador Cego',
        content: 'Se você gasta R$ 10 e quer 20% de lucro, colocar R$ 12,00 é um erro grave se houver taxas de cartão e impostos! Sobre R$ 12,00, taxas de 10% comem R$ 1,20 e sua margem despenca para 6%!',
        badge: 'Pegadinha Clássica'
      },
      {
        type: 'Impacto',
        title: 'O Custo do Desconto',
        content: 'Em um produto com 30% de margem, conceder um desconto de 10% no preço reduz sua margem líquida em 33%, exigindo vender 50% mais unidades só para empatar o lucro total anterior.',
        badge: 'Cuidado'
      },
      {
        type: 'Diferencial',
        title: 'Valor Percebido vs Preço Baixo',
        content: 'No Cariri, quem oferece feijão-verde com nata fresquinho, tempero de família, entrega pontual e simpatia no atendimento cobra R$ 2 a R$ 3 a mais que o concorrente sem perder freguês.',
        badge: 'Estratégia'
      }
    ],
    oficinaId: 'markup',
    challengeQuestions: [
      {
        id: 'q6_1',
        question: 'Uma marmita possui Custo Variável Unitário de R$ 9,00. A empreendedora precisa pagar 4% de taxa na maquininha de cartão, 6% de Simples Nacional/DAS e deseja obter uma margem de lucro líquido de 20% sobre o preço final. Utilizando o Markup Divisor, qual deve ser o preço de venda correto?',
        options: [
          'R$ 11,70',
          'R$ 12,86',
          'R$ 15,00',
          'R$ 9,90'
        ],
        answerIndex: 1,
        explanation: 'Soma dos percentuais variáveis = 4% + 6% + 20% = 30% (0,30). Denominador = 1 − 0,30 = 0,70. Preço = 9,00 ÷ 0,70 = R$ 12,857 ≈ R$ 12,86.'
      },
      {
        id: 'q6_2',
        question: 'Dona Socorro vende sua marmita a R$ 15,00 com custo variável de R$ 9,00 (Margem de Contribuição de R$ 6,00). Se ela der um desconto de 10% (preço cai para R$ 13,50), qual será a nova Margem de Contribuição Unitária e qual foi a redução percentual dessa margem?',
        options: [
          'Nova MC de R$ 4,50; redução de 25% na margem',
          'Nova MC de R$ 5,50; redução de 10% na margem',
          'Nova MC de R$ 3,00; redução de 50% na margem',
          'A margem não se altera porque o custo continua R$ 9,00'
        ],
        answerIndex: 0,
        explanation: 'Nova MC = 13,50 − 9,00 = R$ 4,50. A perda foi de R$ 1,50. Redução = 1,50 ÷ 6,00 = 25%. Um desconto de apenas 10% no preço destruiu 25% do ganho real!'
      },
      {
        id: 'q6_3',
        question: 'A Lei Federal nº 13.455/2017 trouxe qual autorização expressa para o comércio varejista brasileiro?',
        options: [
          'Obrigatoriedade de aceitar fiado em caderneta',
          'Diferenciação de preços de bens e serviços em função do prazo ou do instrumento de pagamento utilizado (dinheiro/Pix versus cartão de crédito)',
          'Proibição de cobrança de qualquer taxa sobre compras parceladas',
          'Fixação compulsória de tabela única de preços pelo governo municipal'
        ],
        answerIndex: 1,
        explanation: 'A Lei 13.455/2017 legalizou expressamente o desconto para pagamentos em dinheiro ou Pix em relação ao preço cobrado no cartão de crédito.'
      },
      {
        id: 'q6_4',
        question: 'Por que copiar cegamente o preço mais baixo praticado pelo vizinho da esquina costuma ser uma armadilha fatal para o pequeno negócio?',
        options: [
          'Porque o concorrente pode ter custos fixos menores (imóvel próprio, mão de obra familiar não remunerada) ou estar acumulando prejuízo em direção à falência',
          'Porque a polícia apreende mercadorias com preços idênticos',
          'Porque a margem de contribuição é proibida pelo Código Tributário',
          'Porque os clientes sempre desconfiam de preços pares'
        ],
        answerIndex: 0,
        explanation: 'Estruturas de custo são individuais: concorrentes podem não pagar aluguel, usar insumos de qualidade duvidosa ou estarem à beira da insolvência por precificação errada.'
      },
      {
        id: 'q6_5',
        question: 'Se um artesão de couro em Nova Olinda vende uma bolsa por R$ 120,00 e o custo variável de matéria-prima e ferragens foi de R$ 40,00, qual é a Margem de Contribuição Unitária e o percentual dessa margem sobre a receita?',
        options: [
          'R$ 80,00 e 66,7%',
          'R$ 40,00 e 33,3%',
          'R$ 160,00 e 100%',
          'R$ 50,00 e 50%'
        ],
        answerIndex: 0,
        explanation: 'MC = 120 − 40 = R$ 80,00. Percentual da MC = 80 ÷ 120 = 0,6667 = 66,7%.'
      }
    ],
    lenteCaju: {
      cidades: 'Em cidades de porte médio como as do Cariri, todos os preços circulam rapidamente no boca a boca e nos grupos de WhatsApp. A guerra de preços destrói a rentabilidade coletiva.',
      analise: 'Existem "preços de referência" tácitos nos mercados sertanejos (o preço padrão da refeição na praça, o valor da corrida de mototáxi). Romper essa barreira exige construir reputação e atributos percebidos de valor.',
      juridico: 'O Código de Defesa do Consumidor (Lei 8.078/1990) impõe exibição clara e visível de preços. A Lei 13.455/2017 permite conceder descontos para pagamentos à vista via Pix ou dinheiro em espécie, desde que devidamente informado ao cliente.',
      ubiquo: 'A calculadora de markup do app pode ser fixada na tela do celular como ferramenta de balcão instantânea.',
      reflexao: 'Por que muitos clientes aceitam pagar mais caro pelo artesanato do Mestre Espedito Seleiro em Nova Olinda do que por uma sandália comum de loja?'
    },
    realidadeLocal: 'No Cariri, artesãos tradicionais e mestres da cultura agregam até 300% de margem sobre a matéria-prima graças à história, técnica e identidade regional do Geopark Araripe reconhecido pela UNESCO.',
    missaoDeCampo: 'Pesquise o preço de um mesmo produto ou serviço em 3 estabelecimentos diferentes da sua cidade e identifique quais diferenciais justificam as variações encontradas.',
    selo: { name: 'Preço Justo', icon: '⚖️' }
  },
  {
    id: 7,
    title: 'Capital de Giro e Ciclos Financeiros',
    stationName: 'Estação 7: A Régua dos Prazos',
    icon: '⏳',
    causo: {
      speaker: 'Mestre Caju',
      avatar: '👴🏽',
      text: 'Seu Expedito da Barraca de Romaria me procurou com o peito apertado: "Mestre, a Romaria de Nossa Senhora das Dores tá chegando em Juazeiro! O fornecedor de terço e fita lá de São Paulo disse que se eu não pagar à vista hoje, ele não despacha a encomenda. Mas eu só recebo o dinheiro dos romeiros daqui a quarenta dias! De onde tiro esse recurso?" Eu peguei um graveto e risquei a terra: "Expedito, isso se chama Capital de Giro! Quem não domina o compasso entre pagar o fornecedor e receber do freguês morre afogado no seco antes de abrir a barraca!"',
      promptAudio: 'A romaria está chegando. Seu Expedito precisa comprar mercadoria agora, mas só vai receber durante a festa. Mestre Caju explica o Ciclo Financeiro e a Necessidade de Capital de Giro.'
    },
    objectives: [
      'Calcular Ciclo Operacional (CO) e Ciclo Financeiro (CF).',
      'Estimar a Necessidade de Capital de Giro (NCG) em reais.',
      'Identificar estratégias práticas para encurtar ou negativar o Ciclo Financeiro.'
    ],
    saberCards: [
      {
        type: 'Fórmula',
        title: 'Ciclo Operacional (CO)',
        content: 'CO = Prazo Médio de Estocagem (PME) + Prazo Médio de Recebimento (PMR). Mede o tempo total desde o momento em que o produto entra na prateleira até o dinheiro cair na mão.',
        badge: 'Operação Total'
      },
      {
        type: 'Fórmula',
        title: 'Ciclo Financeiro (CF)',
        content: 'CF = PME + PMR − Prazo Médio de Pagamento a Fornecedores (PMP). É a temida lacuna de dias em que seu caixa fica a descoberto, precisando de dinheiro próprio ou empréstimo!',
        badge: 'A Lacuna de Caixa'
      },
      {
        type: 'Objetivo',
        title: 'O Sonho do Ciclo Negativo',
        content: 'Se você consegue pagar o fornecedor em 45 dias (PMP), vende o estoque em 10 dias (PME) e recebe no Pix à vista (PMR = 0), seu CF é 10 − 45 = −35 dias! Os fornecedores financiam seu negócio de graça!',
        badge: 'Gestão Mestre'
      },
      {
        type: 'Fórmula',
        title: 'Cálculo da NCG em Reais',
        content: 'NCG = Contas a Receber + Estoques − Contas a Pagar (Fornecedores). Ou aproximadamente: Gastos Operacionais Diários × Ciclo Financeiro (em dias).',
        badge: 'Dimensão do Giro'
      }
    ],
    oficinaId: 'giro',
    challengeQuestions: [
      {
        id: 'q7_1',
        question: 'Uma mercearia mantém seu estoque em média por 25 dias (PME), concede prazo de 15 dias aos clientes no fiado e cartão (PMR) e paga seus fornecedores em 20 dias (PMP). Qual é o Ciclo Operacional e o Ciclo Financeiro dessa mercearia?',
        options: [
          'CO = 40 dias; CF = 20 dias',
          'CO = 35 dias; CF = 15 dias',
          'CO = 50 dias; CF = 30 dias',
          'CO = 25 dias; CF = 0 dias'
        ],
        answerIndex: 0,
        explanation: 'Ciclo Operacional = PME + PMR = 25 + 15 = 40 dias. Ciclo Financeiro = CO − PMP = 40 − 20 = 20 dias. A mercearia precisa financiar 20 dias de operação.'
      },
      {
        id: 'q7_2',
        question: 'Se a mesma mercearia tem gastos operacionais de R$ 400,00 por dia e seu Ciclo Financeiro é de 20 dias, qual é a Necessidade de Capital de Giro (NCG) aproximada para manter a operação em dia?',
        options: [
          'R$ 4.000,00',
          'R$ 8.000,00',
          'R$ 2.000,00',
          'R$ 16.000,00'
        ],
        answerIndex: 1,
        explanation: 'NCG ≈ Gastos diários × Ciclo Financeiro = R$ 400,00 × 20 dias = R$ 8.000,00 necessários no caixa de giro.'
      },
      {
        id: 'q7_3',
        question: 'Qual das seguintes medidas contribui DIRETAMENTE para REDUZIR a necessidade de capital de giro de um pequeno comércio?',
        options: [
          'Oferecer parcelamento em 10 vezes sem juros para todos os clientes sem entrada',
          'Aumentar o estoque comprando mercadoria para 6 meses à vista',
          'Estimular pagamentos via Pix com desconto e negociar maiores prazos de pagamento com fornecedores',
          'Aumentar as despesas com viagens de lazer'
        ],
        answerIndex: 2,
        explanation: 'Receber à vista (reduz PMR) e obter prazos maiores com distribuidores (aumenta PMP) encurtam o Ciclo Financeiro e diminuem a necessidade de capital de giro.'
      },
      {
        id: 'q7_4',
        question: 'Por que a barraca de romaria em Juazeiro do Norte sofre um choque agudo de necessidade de capital de giro nas semanas que antecedem a Romaria de Finados?',
        options: [
          'Porque os romeiros já estão pagando adiantado',
          'Porque há necessidade de estocar grandes volumes de mercadorias com fornecedores que exigem pagamento antecipado, enquanto o faturamento só ocorrerá nos dias da festa',
          'Porque a prefeitura suspende a circulação da moeda nacional',
          'Porque os custos fixos caem para zero'
        ],
        answerIndex: 1,
        explanation: 'A estocagem prévia de alto volume para atender ao pico de demanda sem recebimento imediato gera um descasamento agudo que exige capital de giro ou crédito temporário.'
      },
      {
        id: 'q7_5',
        question: 'Se uma empresa consegue negociar PMP de 40 dias, PME de 15 dias e PMR de 5 dias, o Ciclo Financeiro resultante é de −20 dias. O que isso significa na prática?',
        options: [
          'A empresa está falida',
          'A empresa tem 20 dias de faturamento recebido antes de ter que desembolsar o pagamento ao fornecedor, operando com caixa financiado pela cadeia produtiva',
          'Os juros bancários aumentam 20% ao mês',
          'A Receita Federal cobrará multa diária'
        ],
        answerIndex: 1,
        explanation: 'Um ciclo financeiro negativo representa uma situação excelente de liquidez: o negócio vende e recebe dos clientes bem antes de ter que pagar aos fornecedores.'
      }
    ],
    lenteCaju: {
      cidades: 'Cidades turísticas e de romaria concentram o fluxo de capitais em datas religiosas. Fora desses períodos, o estoque não gira e o capital fica imobilizado nas prateleiras.',
      analise: 'O prazo concedido por fornecedores é baseado na confiança e no histórico de relacionamento (capital social). O bodegueiro antigo compra fiado na distribuidora; o novato precisa pagar à vista antecipado.',
      juridico: 'O microcrédito produtivo orientado (Lei 13.636/2018) tem forte foco em capital de giro. No Crediamigo do Banco do Nordeste, a linha de capital de giro solidário responde por cerca de 70% das operações.',
      ubiquo: 'O simulador gráfico da "Régua dos Prazos" permite arrastar os controles e ver a agulha da liquidez oscilar em tempo real.',
      reflexao: 'Você já viu um comerciante conhecido ter que fechar a loja cheia de mercadorias porque não tinha dinheiro vivo para pagar a conta de luz do mês?'
    },
    realidadeLocal: 'Estudo do Sebrae Ceará (2025) aponta que 22% dos MEIs que encerraram atividades consideraram a falta de capital de giro o fator decisivo para a falência, e 34% afirmaram que um crédito pontual de giro teria salvo o negócio.',
    missaoDeCampo: 'Entreviste um lojista e descubra: quantos dias o estoque fica parado (PME), em quantos dias ele recebe dos clientes (PMR) e em quantos dias paga os fornecedores (PMP). Calcule o Ciclo Financeiro dele no app.',
    selo: { name: 'Giro Certo', icon: '🔄' }
  },
  {
    id: 8,
    title: 'Crédito e Financiamento Consciente',
    stationName: 'Estação 8: O Balcão do Banco da Vila',
    icon: '🏦',
    causo: {
      speaker: 'Mestre Caju',
      avatar: '👴🏽',
      text: 'Seu Expedito tava na praça com as mãos suando. Apareceu um sujeito de camisa de seda dizendo: "Seu Expedito, pego dez mil reais na sua mão agora, sem consulta de SPC nem fiador! Só me paga dez por cento de juros por semana!" Na mesma hora chegou a agente do microcrédito do Banco do Nordeste com a pasta debaixo do braço. Expedito olhou pra um, olhou pra outro e me chamou: "Mestre, qual é o caminho?" Eu disse: "Expedito, o agiota te dá a mão hoje pra te arrancar o braço amanhã! Crédito bom é crédito produtivo, com juros dentro da lei e parcela que cabe no bolso sem tirar o sono da família!"',
      promptAudio: 'Um rapaz oferece dinheiro rápido sem consulta. No mesmo dia a agente do microcrédito passa na barraca. Mestre Caju alerta sobre o custo efetivo total e o perigo do crédito informal.'
    },
    objectives: [
      'Diferenciar crédito de capital de giro de financiamento para investimento.',
      'Compreender o Custo Efetivo Total (CET), o Sistema Price e juros compostos.',
      'Avaliar a capacidade de pagamento (regra de comprometimento máximo de 30% do lucro).',
      'Comparar opções reais: agiota, banco tradicional e microcrédito produtivo orientado (Crediamigo).'
    ],
    saberCards: [
      {
        type: 'Conceito',
        title: 'Custo Efetivo Total (CET)',
        content: 'A taxa de juros estampada no panfleto nunca é o custo final! O CET engloba juros, IOF, tarifas de abertura de crédito (TAC) e seguros obrigatórios. Sempre compare propostas pelo CET anualizado!',
        badge: 'Transparência'
      },
      {
        type: 'Fórmula',
        title: 'Parcela Fixa (Sistema Price)',
        content: 'PMT = PV × [i ÷ (1 − (1 + i)^−n)]. Todas as prestações são iguais. No início do contrato, a maior parte da parcela é composta por juros; no final, amortiza mais a dívida principal.',
        badge: 'Amortização'
      },
      {
        type: 'Macroeconomia',
        title: 'Cenário da Taxa Selic 2026',
        content: 'Com a decisão do Copom do Banco Central mantendo/ajustando a Selic em patamar elevado (13,75% a.a.), o crédito bancário comercial tradicional é caro. O microcrédito orientado solidário se torna ainda mais vantajoso.',
        badge: 'Cenário Econômico'
      },
      {
        type: 'Regra de Ouro',
        title: 'Capacidade de Pagamento',
        content: 'Comprometimento = (Valor da Parcela Mensal ÷ Lucro Médio Mensal) × 100. Nunca contrate empréstimo cuja parcela comprometa mais de 30% do seu lucro líquido!',
        badge: 'Segurança'
      }
    ],
    oficinaId: 'credito',
    challengeQuestions: [
      {
        id: 'q8_1',
        question: 'Dona Socorro precisa de um empréstimo de R$ 5.000,00 para comprar um forno industrial. Seu lucro mensal médio é de R$ 1.800,00. Uma instituição financeira oferece 10 parcelas mensais de R$ 680,00. Qual é a taxa de comprometimento do lucro dessa parcela e essa operação é recomendada?',
        options: [
          'Comprometimento de 37,8%; não recomendada pois ultrapassa o teto prudencial de 30%',
          'Comprometimento de 15%; altamente recomendada',
          'Comprometimento de 50%; recomendada pois qualquer dívida traz lucro',
          'Comprometimento de 10%; excelente negócio'
        ],
        answerIndex: 0,
        explanation: 'Comprometimento = (680 ÷ 1.800) × 100 = 37,78%. Como supera a margem prudencial de 30%, o negócio correrá risco severo se as vendas oscilarem para baixo.'
      },
      {
        id: 'q8_2',
        question: 'Por que o Custo Efetivo Total (CET) é o indicador que o empreendedor deve SEMPRE exigir antes de assinar um contrato de crédito?',
        options: [
          'Porque ele revela apenas o valor da última prestação',
          'Porque inclui não apenas a taxa nominal de juros, mas todas as taxas administrativas, seguros, cadastros e tributos embutidos na operação',
          'Porque é um documento emitido exclusivamente pela Receita Federal',
          'Porque isenta a empresa do pagamento de juros de mora'
        ],
        answerIndex: 1,
        explanation: 'Muitos contratos anunciam taxas nominais atrativas (ex: 1,5% a.m.), mas embutem seguros e tarifas que elevam o CET real para mais de 3,5% ao mês.'
      },
      {
        id: 'q8_3',
        question: 'No programa Crediamigo do Banco do Nordeste, qual é o mecanismo institucional que substitui as garantias reais de imóveis e permite juros menores para microempreendedores de baixa renda?',
        options: [
          'O penhor de joias de ouro na Caixa Econômica',
          'O grupo de aval solidário (onde 4 a 6 empreendedores avalizam mutuamente os compromissos uns dos outros)',
          'A hipoteca compulsória da casa de família',
          'O pagamento integral antecipado do empréstimo'
        ],
        answerIndex: 1,
        explanation: 'O aval solidário apoia-se na confiança comunitária e no capital social entre vizinhos, eliminando a exigência de garantias reais e barateando os custos de monitoramento do banco.'
      },
      {
        id: 'q8_4',
        question: 'Qual é o maior risco institucional e financeiro de recorrer a agiotas informais em cidades do interior?',
        options: [
          'Perder pontos no ranking do Google',
          'Cobrança de juros extorsivos ilegais (usura), risco à integridade física pessoal e falta de qualquer proteção jurídica regulamentada',
          'Ter o CNPJ desenquadrado automaticamente pelo Banco Central',
          'Obrigação de emitir nota fiscal de exportação'
        ],
        answerIndex: 1,
        explanation: 'A agiotagem opera à margem da lei, com taxas abusivas que provocam espirais impagáveis de endividamento e utilizam métodos violentos de cobrança extrajudicial.'
      },
      {
        id: 'q8_5',
        question: 'Se um empréstimo de R$ 3.000,00 for contratado a juros simples de 3% ao mês para ser quitado em parcela única após 4 meses, qual será o montante total devolvido?',
        options: [
          'R$ 3.360,00',
          'R$ 3.120,00',
          'R$ 4.000,00',
          'R$ 3.090,00'
        ],
        answerIndex: 0,
        explanation: 'Juros = PV × i × n = 3.000 × 0,03 × 4 = R$ 360,00. Montante = 3.000 + 360 = R$ 3.360,00.'
      }
    ],
    lenteCaju: {
      cidades: 'No semiárido, agiotas e intermediários informais muitas vezes operam na mesma praça da feira, oferecendo dinheiro rápido na hora. A proximidade física e a informalidade tornam essa via sedutora, mas fatal.',
      analise: 'O aval solidário do microcrédito substitui a garantia real (que o pequeno comerciante não tem) pela reputação coletiva do grupo. A sanção pelo inadimplemento é a perda da confiança dos vizinhos, o que resulta em baixíssima inadimplência.',
      juridico: 'Marcos legais: Lei 13.636/2018 (Programa Nacional de Microcrédito Produtivo Orientado), LC 167/2019 (Empresa Simples de Crédito - ESC municipal) e Pronampe (Lei 13.999/2020) que garantem respaldo jurídico e fundos garantidores para micro e pequenas empresas.',
      ubiquo: 'O app disponibiliza um comparador lado a lado com alerta de "Semáforo Vermelho" que avisa quando uma simulação ultrapassa 30% do lucro do negócio.',
      reflexao: 'Por que mesmo sabendo dos perigos, muitas pessoas ainda recorrem ao dinheiro fácil de agiotas em vez de buscar os agentes de microcrédito nas agências?'
    },
    realidadeLocal: 'O Crediamigo do Banco do Nordeste movimentou mais de R$ 3,5 bilhões em financiamentos produtivos no segundo trimestre de 2026, com presença maciça de mulheres (69% dos clientes). No meio rural do Cariri, o Agroamigo somou mais de R$ 3,1 bilhões no mesmo período.',
    missaoDeCampo: 'Visite ou consulte o site de um correspondente bancário ou agente do Crediamigo na sua cidade: liste documentos exigidos, taxa média de juros e se exige aval solidário.',
    selo: { name: 'Crédito Consciente', icon: '🤝' }
  },
  {
    id: 9,
    title: 'Gestão de Investimentos e Retorno',
    stationName: 'Estação 9: A Feira dos Investimentos',
    icon: '🌱',
    causo: {
      speaker: 'Mestre Caju',
      avatar: '👴🏽',
      text: 'Passou a Romaria das Candeias e sobrou dois mil e quinhentos reais limpos no caixa de Socorro. O filho dela chegou com os olhos brilhando: "Mãe, meu colega botou dinheiro numa empresa na internet que promete cinco por cento de lucro ao dia! Vamos botar tudo lá!" Na mesma semana, o gerente do banco quis empurrar um Título de Capitalização dizendo que dava prêmio de carro. Socorro veio a mim: "Mestre, onde boto essa semente?" Eu falei: "Menina, se a promessa de ganho é fácil demais, não é investimento: é arapuca de pegar passarinho! Dinheiro de trabalho se investe em ferramenta boa, ou em aplicação séria que protege contra a inflação!"',
      promptAudio: 'Sobraram 2.500 reais depois da romaria. O filho quer investir em bitcoin milagroso, o banco oferece capitalização. Mestre Caju ensina a avaliar ROI, Payback e desmascarar pirâmides financeiras.'
    },
    objectives: [
      'Calcular e interpretar o Retorno sobre o Investimento (ROI) e o Payback Simples.',
      'Compreender o conceito de taxa de rentabilidade real (descontada a inflação IPCA).',
      'Identificar o trade-off entre Risco, Retorno, Prazo e Liquidez.',
      'Identificar sinais de alerta de fraudes e golpes de pirâmides financeiras no WhatsApp.'
    ],
    saberCards: [
      {
        type: 'Fórmula',
        title: 'Payback Simples',
        content: 'Payback = Investimento Inicial ÷ Geração de Caixa Mensal Adicional. Exemplo: Uma seladora de R$ 1.200 que reduz desperdícios e gera R$ 300 a mais por mês tem Payback = 1.200 ÷ 300 = 4 meses.',
        badge: 'Tempo de Retorno'
      },
      {
        type: 'Fórmula',
        title: 'Retorno sobre Investimento (ROI)',
        content: 'ROI = [(Ganho Financeiro Líquido − Custo do Investimento) ÷ Custo do Investimento] × 100. Se uma máquina de R$ 2.000 gerou R$ 3.000 de lucro acumulado no ano: ROI = [(3.000 − 2.000) ÷ 2.000] × 100 = 50%.',
        badge: 'Eficiência'
      },
      {
        type: 'Fórmula',
        title: 'Rentabilidade Real (Fischer)',
        content: 'Rentabilidade Real = [(1 + Taxa Nominal) ÷ (1 + Inflação IPCA)] − 1. Com a Selic a 13,75% e inflação projetada em 5,2% para 2026, a taxa real da renda fixa é de cerca de 8,1% ao ano!',
        badge: 'Poder de Compra'
      },
      {
        type: 'Alerta',
        title: 'Título de Capitalização NÃO é Investimento',
        content: 'Título de capitalização é uma loteria disfarçada de poupança: seu dinheiro fica preso, rende abaixo da inflação e cobra taxas de carregamento abusivas. Fuja!',
        badge: 'Alerta Bancário'
      }
    ],
    oficinaId: 'investimentos',
    challengeQuestions: [
      {
        id: 'q9_1',
        question: 'Dona Socorro investiu R$ 2.400,00 na compra de um novo fogão industrial de alta eficiência. O novo fogão permitiu economizar tempo e gás, aumentando o lucro líquido mensal da marmitaria em R$ 400,00. Em quantos meses o fogão se pagará (Payback Simples)?',
        options: [
          '3 meses',
          '6 meses',
          '12 meses',
          '24 meses'
        ],
        answerIndex: 1,
        explanation: 'Payback = Investimento Inicial ÷ Ganho Mensal = R$ 2.400,00 ÷ R$ 400,00 = 6 meses.'
      },
      {
        id: 'q9_2',
        question: 'Se a taxa básica de juros da economia (Selic) está em 13,75% ao ano e a inflação projetada para o período é de 5,2% ao ano, qual é aproximadamente o juro real que uma aplicação atrelada ao Tesouro Selic proporciona ao investidor?',
        options: [
          'Exatamente 18,95%',
          'Aproximadamente 8,1% ao ano acima da inflação',
          'Zero por cento',
          'Negativo em −5,2%'
        ],
        answerIndex: 1,
        explanation: '(1 + 0,1375) ÷ (1 + 0,052) − 1 = 1,1375 ÷ 1,052 − 1 = 1,08127 − 1 = 8,13% a.a. de ganho real acima da carestia.'
      },
      {
        id: 'q9_3',
        question: 'Qual dos seguintes é um indício INFALÍVEL de golpe ou pirâmide financeira disfarçada circulando em grupos de WhatsApp?',
        options: [
          'Garantia de rentabilidade fixa astronômica (ex: 2% a 5% ao dia), pressão para recrutar novos membros e ausência de registro na CVM ou Banco Central',
          'Exigência de envio de comprovante de residência e documento oficial com foto',
          'Aplicação em títulos públicos do Tesouro Direto com cobrança de imposto de renda regressivo',
          'Contratação de CDB com garantia do FGC até R$ 250 mil'
        ],
        answerIndex: 0,
        explanation: 'Promessas de ganhos rápidos, vultosos e sem risco atrelados à entrada de novos participantes caracterizam o crime de pirâmide financeira.'
      },
      {
        id: 'q9_4',
        question: 'Onde deve ser aplicada a Reserva de Emergência de um pequeno negócio?',
        options: [
          'Em ações de empresas de alto risco na bolsa de valores',
          'Em fundos ou títulos de renda fixa conservadora com liquidez diária (resgate imediato) e risco de crédito quase nulo (como Tesouro Selic ou CDB 100% CDI)',
          'Imobilizada na compra de tijolos e telhas para guardar no quintal',
          'Em criptomoedas desconhecidas'
        ],
        answerIndex: 1,
        explanation: 'A reserva de emergência tem como objetivo a preservação do capital e o resgate a qualquer momento, e não a busca por ganhos especulativos.'
      },
      {
        id: 'q9_5',
        question: 'Se um investimento de R$ 10.000,00 gerou um retorno financeiro total de R$ 13.500,00 ao fim de um ciclo de 12 meses, qual foi o Retorno sobre o Investimento (ROI)?',
        options: [
          '35%',
          '135%',
          '10%',
          '3,5%'
        ],
        answerIndex: 0,
        explanation: 'ROI = [(Ganho Total − Custo) ÷ Custo] × 100 = [(13.500 − 10.000) ÷ 10.000] × 100 = (3.500 ÷ 10.000) × 100 = 35%.'
      }
    ],
    lenteCaju: {
      cidades: 'No interior do Ceará, a forma mais tradicional de investimento da população histórica sempre foi guardar dinheiro em espécie embaixo do colchão, comprar gado ou comprar lotes de terra. São ativos reais, mas de baixa liquidez na hora de uma emergência.',
      analise: 'A desconfiança de bancos e papéis financeiros é uma instituição informal enraizada, alimentada historicamente por confiscos passados e golpes frequentes. A educação financeira precisa acolher essa prudência e orientar para instrumentos seguros.',
      juridico: 'Investimentos regulados contam com a proteção da CVM, Banco Central e a garantia do Fundo Garantidor de Créditos (FGC) para depósitos bancários até o limite de R$ 250 mil por CPF/CNPJ.',
      ubiquo: 'O app traz um "Detector de Promessas Milagrosas": um checklist interativo onde o usuário preenche a proposta recebida e o app acende luzes de alerta para golpes.',
      reflexao: 'Por que comprar um freezer novo para a marmitaria pode ser muito mais rentável para o negócio do que deixar o dinheiro rendendo na poupança?'
    },
    realidadeLocal: 'Nos últimos anos, quadrilhas virtuais aplicaram golpes de falsas plataformas de investimento em diversas cidades do Cariri, prometendo retornos diários no Pix e deixando centenas de famílias de baixa renda e pequenos comerciantes com prejuízos severos.',
    missaoDeCampo: 'Pergunte a três comerciantes ou familiares onde eles preferem guardar suas reservas financeiras (poupança, terra, conta corrente ou no negócio) e analise as respostas sob a ótica de Risco, Retorno e Liquidez.',
    selo: { name: 'Semente que Rende', icon: '🌰' }
  },
  {
    id: 10,
    title: 'Indicadores Financeiros e Diagnóstico',
    stationName: 'Estação 10: O Painel do Negócio',
    icon: '📈',
    causo: {
      speaker: 'Mestre Caju',
      avatar: '👴🏽',
      text: 'Seu Zé da Bodega tava olhando pras prateleiras com cara de dúvida: "Mestre, a loja tá bonita, tem cliente todo dia, mas eu não sei dizer se esse mês foi melhor ou pior do que o mês do ano passado!" Eu apontei pro painel da caminhonete velha que tava estacionada na calçada: "Seu Zé, você tem coragem de pegar a serra do Araripe de noite numa caminhonete com o painel quebrado, sem saber a velocidade, sem marcador de gasolina e com a luz da temperatura queimada?" Ele disse: "Deus me livre, é morte certa!" Eu completei: "Pois tocar negócio sem indicador é a mesma coisa: você só descobre que o motor ferveu quando ele funde!"',
      promptAudio: 'O negócio parece ir bem, mas o dono não sabe dizer se este mês foi melhor que o anterior. Mestre Caju ensina a usar indicadores financeiros como painel de controle do negócio.'
    },
    objectives: [
      'Calcular e interpretar os indicadores vitais: Margem de Contribuição %, Ponto de Equilíbrio (unidades e R$), Margem Líquida e Liquidez Corrente.',
      'Construir um painel semafórico (verde, amarelo, vermelho) para monitoramento regular.',
      'Identificar rapidamente sintomas de estrangulamento operacional.'
    ],
    saberCards: [
      {
        type: 'Fórmula',
        title: 'Ponto de Equilíbrio Contábil (PE)',
        content: 'PE (unidades) = Custos Fixos Totais ÷ Margem de Contribuição Unitária. PE (R$) = Custos Fixos Totais ÷ Índice da Margem de Contribuição (MC%). Mostra a receita mínima para não ter prejuízo.',
        badge: 'Equilíbrio Vital'
      },
      {
        type: 'Fórmula',
        title: 'Margem Líquida %',
        content: 'Margem Líquida = (Lucro Líquido ÷ Faturamento Total) × 100. Mede quantos centavos de lucro limpo sobram de cada real faturado pelo negócio.',
        badge: 'Rentabilidade'
      },
      {
        type: 'Fórmula',
        title: 'Liquidez Corrente (LC)',
        content: 'LC = Ativo Circulante (dinheiro + bancos + a receber + estoques) ÷ Passivo Circulante (contas a pagar a curto prazo). LC > 1,0 indica capacidade de pagar as dívidas imediatas.',
        badge: 'Solvência'
      },
      {
        type: 'Regra',
        title: 'O Painel dos Quatro Botões',
        content: 'O pequeno comerciante não precisa de 50 índices. Basta acompanhar 4: 1) Saldo de Caixa; 2) Margem de Contribuição; 3) Ponto de Equilíbrio alcançado no mês; 4) Giro do estoque.',
        badge: 'Simplicidade'
      }
    ],
    oficinaId: 'indicadores',
    challengeQuestions: [
      {
        id: 'q10_1',
        question: 'Uma lanchonete no centro do Crato tem custos fixos de R$ 3.000,00 por mês. Vende refeições a R$ 20,00 com custo variável unitário de R$ 8,00. Qual é o Ponto de Equilíbrio em unidades e em faturamento mensal?',
        options: [
          '250 refeições e R$ 5.000,00',
          '150 refeições e R$ 3.000,00',
          '375 refeições e R$ 7.500,00',
          '500 refeições e R$ 10.000,00'
        ],
        answerIndex: 0,
        explanation: 'MC unitária = 20 − 8 = R$ 12,00. PE (unidades) = 3.000 ÷ 12 = 250 refeições. PE (R$) = 250 × 20 = R$ 5.000,00 de faturamento.'
      },
      {
        id: 'q10_2',
        question: 'Se um pequeno comércio possui Ativo Circulante de R$ 6.000,00 e Passivo Circulante (dívidas com vencimento no mês) de R$ 8.000,00, qual é sua Liquidez Corrente e qual o diagnóstico financeiro correspondente?',
        options: [
          'LC = 1,33; situação confortável de sobra de recursos',
          'LC = 0,75; situação de alerta/perigo, pois possui apenas R$ 0,75 disponíveis para cada R$ 1,00 de dívida a vencer',
          'LC = 2,0; sem necessidade de ajustes',
          'LC = −2.000; dívida impagável'
        ],
        answerIndex: 1,
        explanation: 'LC = 6.000 ÷ 8.000 = 0,75. Um índice inferior a 1,0 acende luz vermelha no painel, denunciando risco de inadimplência imediata no curto prazo.'
      },
      {
        id: 'q10_3',
        question: 'Dona Socorro faturou R$ 16.000,00 em outubro e, após pagar todos os custos, despesas e pró-labore, obteve R$ 2.400,00 de lucro líquido. Qual foi sua Margem Líquida?',
        options: [
          '15%',
          '24%',
          '10%',
          '30%'
        ],
        answerIndex: 0,
        explanation: 'Margem Líquida = (2.400 ÷ 16.000) × 100 = 0,15 × 100 = 15%.'
      },
      {
        id: 'q10_4',
        question: 'O Giro de Estoque mede quantas vezes as mercadorias foram renovadas no período. Uma mercearia com giro de estoque muito baixo (mercadoria parada meses na prateleira) enfrenta quais riscos graves?',
        options: [
          'Capital imobilizado sem render, risco de vencimento de prazos de validade e perda de mercadoria por avarias',
          'Aumento imediato do lucro bruto',
          'Desconto automático nos tributos municipais',
          'Elogios da vigilância sanitária'
        ],
        answerIndex: 0,
        explanation: 'Estoque parado é dinheiro dormindo: além de não gerar caixa, perecíveis estragam e itens perdem apelo comercial.'
      },
      {
        id: 'q10_5',
        question: 'Se uma empresa atinge seu Ponto de Equilíbrio no dia 18 de um mês de 30 dias de trabalho, o que acontece com as vendas realizadas do dia 19 até o fim do mês?',
        options: [
          'Toda a margem de contribuição gerada passa a constituir lucro líquido direto para a empresa (pois os custos fixos já foram 100% quitados)',
          'Elas geram apenas prejuízo contábil',
          'Devem ser doadas compulsoriamente',
          'Não têm nenhum efeito financeiro'
        ],
        answerIndex: 0,
        explanation: 'Uma vez superado o Ponto de Equilíbrio, todos os custos fixos do período já foram cobertos; a partir daí, cada nova unidade vendida gera margem que vai diretamente para o lucro líquido.'
      }
    ],
    lenteCaju: {
      cidades: 'Indicadores financeiros permitem construir comparações entre comércios similares na mesma região, gerando referências de desempenho ajustadas ao Cariri e ao semiárido em vez de médias abstratas de capitais do Sul.',
      analise: 'O uso de indicadores reduz a assimetria de informação tanto para o gestor quanto para agentes externos (bancos, sócios, fornecedores). Um negócio com indicadores documentados obtém crédito mais fácil e barato.',
      juridico: 'O MEI é legalmente dispensado de escrituração contábil formal complexa, mas deve preencher o Relatório Mensal das Receitas Brutas e a declaração DASN-SIMEI. Indicadores simples cumprem com folga essa obrigação.',
      ubiquo: 'O "Painel do Negócio" no smartphone atua como o velocímetro de bolso do comerciante.',
      reflexao: 'Qual indicador você olharia logo no início de cada manhã para saber se seu comércio está no caminho certo?'
    },
    realidadeLocal: 'Pesquisas de extensão da URCA no projeto "Economia no Bolso" apontam que menos de 10% dos microempreendedores atendidos sabiam calcular seu ponto de equilíbrio antes da oficina pedagógica.',
    missaoDeCampo: 'Junto a um microempreendedor real, levante os custos fixos mensais e a margem de contribuição do produto mais vendido. Calcule com ele o Ponto de Equilíbrio em unidades e explique o resultado.',
    selo: { name: 'Painel Aceso', icon: '🚦' }
  },
  {
    id: 11,
    title: 'Compliance, Formalização e Reforma Tributária',
    stationName: 'Estação 11: O Dia da Fiscalização',
    icon: '📋',
    causo: {
      speaker: 'Mestre Caju',
      avatar: '👴🏽',
      text: 'Uma van branca com o brasão da Vigilância Sanitária e da Prefeitura parou na rua da marmitaria de Dona Socorro. Os fiscais desceram com prancheta na mão. Na mesma manhã, uma empresa do distrito industrial ligou querendo encomendar cem quentinhas diárias pro turno da tarde, mas avisou: "Só fechamos contrato se emitir Nota Fiscal Eletrônica com CNPJ!" Socorro veio correndo com o coração na boca: "Mestre, vale a pena se formalizar como MEI ou continuo no silêncio da informalidade?" Eu respondi: "Socorro, quem anda escondido no mato não cresce: fica pequeno a vida toda com medo de fiscal e perde os maiores contratos da cidade! Formalização com compliance é o escudo que protege e a chave que abre a porta grande do mercado!"',
      promptAudio: 'A vigilância sanitária visita a rua da marmitaria e um cliente grande pede nota fiscal. Mestre Caju explica o valor do compliance, obrigações do MEI e a Reforma Tributária.'
    },
    objectives: [
      'Compreender o conceito de compliance como conformidade legal e ética que gera valor.',
      'Conhecer as obrigações fundamentais do MEI (DAS mensal, DASN-SIMEI, nota fiscal para PJ).',
      'Compreender os impactos da Reforma Tributária (EC 132/2023, CBS e IBS) e o Simples Nacional.',
      'Calcular o custo-benefício da formalização versus os riscos da informalidade.'
    ],
    saberCards: [
      {
        type: 'Conceito',
        title: 'O que é Compliance?',
        content: 'Compliance vem do verbo inglês "to comply" (agir de acordo com as normas). Para o pequeno negócio, significa cumprir exigências sanitárias, fiscais, trabalhistas e de proteção ao consumidor com ética.',
        badge: 'Proteção e Valor'
      },
      {
        type: 'Jurídico',
        title: 'Obrigações e Benefícios do MEI',
        content: 'Obrigação: pagar o DAS mensal pontualmente e declarar o faturamento anual até 31 de maio. Benefícios: cobertura previdenciária do INSS (aposentadoria, auxílio-doença, salário-maternidade), emissão de notas e acesso a contas bancárias PJ.',
        badge: 'LC 128/2008'
      },
      {
        type: 'Tributário 2026',
        title: 'Reforma Tributária: CBS e IBS',
        content: 'A EC 132/2023 e a LC 214/2025 criaram a CBS (federal) e o IBS (estadual/municipal). Em 2026 as NFe já trazem alíquotas-teste simbólicas de 0,9% e 0,1%. O Simples Nacional e o MEI continuam preservados, com opção pelo Simples Híbrido.',
        badge: 'Cenário 2026/2027'
      },
      {
        type: 'Sanitário',
        title: 'Boas Práticas de Alimentação',
        content: 'Para marmitarias e lanchonetes, a RDC Anvisa nº 216/2004 exige controle de temperatura, higiene dos manipuladores, água potável testada e descarte adequado de resíduos. Previne multas e intoxicações graves.',
        badge: 'Saúde Pública'
      }
    ],
    oficinaId: 'compliance',
    challengeQuestions: [
      {
        id: 'q11_1',
        question: 'Dona Socorro atua como MEI. Em qual das seguintes situações ela é LEGALMENTE OBRIGADA a emitir Nota Fiscal Eletrônica?',
        options: [
          'Quando vende uma marmita para uma pessoa física comum que paga em dinheiro vivo',
          'Quando fornece marmitas para uma empresa privada (Pessoa Jurídica) ou órgão público',
          'Ela nunca é obrigada a emitir nota fiscal sob nenhuma hipótese',
          'Apenas aos domingos e feriados'
        ],
        answerIndex: 1,
        explanation: 'De acordo com a legislação do MEI, a emissão de nota fiscal é facultativa na venda direta para pessoas físicas finais, porém COMPULSÓRIA sempre que o cliente for Pessoa Jurídica (empresa).'
      },
      {
        id: 'q11_2',
        question: 'O que garante o pagamento em dia da guia mensal única do DAS-MEI ao microempreendedor individual?',
        options: [
          'Garante passagens aéreas gratuitas',
          'Manutenção dos direitos previdenciários junto ao INSS (como auxílio por incapacidade temporária, salário-maternidade e aposentadoria por idade) e regularidade fiscal',
          'Isenção total na conta de luz residencial',
          'Aumento compulsório do limite de crédito no banco'
        ],
        answerIndex: 1,
        explanation: 'O DAS recolhe a contribuição previdenciária do empreendedor ao INSS somada a valores simbólicos de ICMS/ISS, resguardando o tempo de carência para benefícios previdenciários essenciais.'
      },
      {
        id: 'q11_3',
        question: 'A Lei da Liberdade Econômica (Lei nº 13.874/2019) trouxe qual simplificação fundamental para pequenos negócios de baixo risco (como costura artesanal, escritório virtual e pequenas mercearias)?',
        options: [
          'A dispensa de alvará e licenças prévias de funcionamento para o início das atividades de baixo risco',
          'A proibição do pagamento de tributos',
          'A revogação de todo o Código de Defesa do Consumidor',
          'A obrigação de contratação de 5 funcionários imediatos'
        ],
        answerIndex: 0,
        explanation: 'A Lei de Liberdade Econômica estabeleceu que atividades classificadas como de baixo risco sanitário, ambiental e de incêndio podem iniciar operações sem necessidade de alvará prévio de funcionamento.'
      },
      {
        id: 'q11_4',
        question: 'No âmbito da Reforma Tributária sobre o Consumo (EC 132/2023), qual é a principal novidade em implementação no ano de 2026?',
        options: [
          'O fim imediato de todos os impostos no Brasil',
          'O período de testes e adaptação operacional da CBS e do IBS, com alíquotas-teste de 0,9% e 0,1% destacadas nas notas eletrônicas, mantendo-se resguardado o regime do Simples Nacional',
          'A extinção definitiva do CNPJ',
          'A cobrança retroativa de PIS/Cofins sobre os últimos 20 anos'
        ],
        answerIndex: 1,
        explanation: 'O ano de 2026 funciona como ano de teste nas NFe com alíquotas simbólicas da CBS (0,9%) e do IBS (0,1%), preparando as empresas para a entrada em vigor plena a partir de 2027.'
      },
      {
        id: 'q11_5',
        question: 'Por que a informalidade persistente pode ser descrita como um "teto de vidro" para o crescimento da pequena empresa no Cariri?',
        options: [
          'Porque a empresa informal não consegue vender para grandes empresas que exigem nota fiscal, não acessa linhas oficiais de crédito bancário com taxas subsidiadas e vive sob risco constante de multas e apreensões',
          'Porque impede o dono de criar perfis em redes sociais',
          'Porque a informalidade gera lucros infinitos sem qualquer risco',
          'Porque o produto se torna menos saboroso'
        ],
        answerIndex: 0,
        explanation: 'A informalidade aprisiona o empreendimento em uma escala minúscula, excluindo-o de contratos corporativos, licitações públicas e crédito institucional barato.'
      }
    ],
    lenteCaju: {
      cidades: 'Nas pequenas cidades do semiárido, a fiscalização municipal é personalizada e muitas vezes tolerante. A informalidade é a regra de fato. Por isso, a política pública só atrai a formalização quando os benefícios reais (previdência, nota, crédito) superam o custo do cumprimento.',
      analise: 'O custo de cumprir a lei (tempo em filas, burocracia contábil, descolamento até a sede municipal) é um custo de transação institucional. Se esse custo for alto, a escolha racional do comerciante humilde será permanecer na informalidade.',
      juridico: 'Instrumentos jurídicos facilitadores: LC 128/2008 (MEI), LC 123/2006 (Simples Nacional), Lei 13.874/2019 (Liberdade Econômica) e a RDC Anvisa 216/2004 para alimentação saudável.',
      ubiquo: 'O aplicativo disponibiliza um "Checklist de Formalização e Boas Práticas" interativo onde o estudante avalia seu estabelecimento em 2 minutos.',
      reflexao: 'Na sua cidade, por que tantos ambulantes de romarias continuam na informalidade mesmo com o custo baixo do MEI?'
    },
    realidadeLocal: 'O comércio ambulante em Juazeiro do Norte durante as grandes romarias é um clássico exemplo de convivência dinâmica entre o setor formal e o informal na ocupação do espaço público urbano da Colina do Horto e do entorno da Basílica.',
    missaoDeCampo: 'Pesquise no portal da prefeitura ou converse com um comerciante de alimentação para descobrir quais são as 3 exigências sanitárias e alvarás necessários para vender comida formalmente na sua cidade.',
    selo: { name: 'Tudo nos Conformes', icon: '📜' }
  },
  {
    id: 12,
    title: 'Gestão de Riscos e Continuidade do Negócio',
    stationName: 'Estação 12: A Matriz da Seca',
    icon: '🛡️',
    causo: {
      speaker: 'Mestre Caju',
      avatar: '👴🏽',
      text: 'O sol esquentou no sertão e a chuva atrasou. Os açudes baixaram, a farinha e o milho subiram de preço na feira e os fregueses sumiram da calçada. Pra completar, o motoboy que fazia as entregas adoeceu e um fornecedor deu o cano. Seu Expedito e Dona Socorro vieram sentar comigo debaixo do cajueiro frondoso: "Mestre, é castigo?" Eu olhei pra Chapada do Araripe e disse com a serenidade de quem já viu muitas secas e invernos: "Não é castigo, meus filhos! É a vida do sertão! Quem depende de um só cliente, de um só fornecedor e não guarda reserva de emergência não tem um negócio: tem uma aposta na sorte! O comerciante sábio é que nem a castanha de caju: cria casca grossa pra aguentar a quentura e proteger a semente da vida!"',
      promptAudio: 'Uma estiagem longa reduz a renda dos clientes e o fornecedor principal atrasa a entrega. Mestre Caju ensina a mapear riscos pela matriz de probabilidade e impacto.'
    },
    objectives: [
      'Identificar as 6 categorias de risco do pequeno negócio (financeiro, operacional, de mercado, legal, tecnológico e ambiental).',
      'Construir a Matriz de Riscos 3x3 (Probabilidade × Impacto).',
      'Elaborar planos de mitigação e contingência para crises climáticas, de mercado e golpes digitais.'
    ],
    saberCards: [
      {
        type: 'Conceito',
        title: 'O que é Risco?',
        content: 'Risco é a possibilidade de um evento imprevisto acontecer e causar prejuízo ou inviabilizar o negócio. A meta da gestão de risco não é eliminar a incerteza (impossível no mundo real), mas preparar o negócio para absorver o impacto.',
        badge: 'Proteção Ativa'
      },
      {
        type: 'Fórmula',
        title: 'Grau de Risco (Matriz 3x3)',
        content: 'Nível de Risco = Probabilidade de Ocorrência × Severidade do Impacto. Riscos de Alta Probabilidade e Alto Impacto (Zona Vermelha) exigem ação preventiva imediata!',
        badge: 'Matriz de Risco'
      },
      {
        type: 'Estratégia',
        title: 'Diversificação de Clientes & Fornecedores',
        content: 'Se um único cliente representa mais de 40% do seu faturamento mensal, seu negócio está na mão dele. Da mesma forma, tenha sempre pelo menos dois fornecedores de insumos essenciais.',
        badge: 'Regra de Sobrevivência'
      },
      {
        type: 'Tecnológico',
        title: 'Golpes Virtuais no Balcão',
        content: 'Cuidado com: comprovante de Pix agendado falso, pedidos falsos de troca no balcão e clonagem de WhatsApp com mensagem de emergência de parentes. Treine quem fica no caixa!',
        badge: 'Segurança Digital'
      }
    ],
    oficinaId: 'riscos',
    challengeQuestions: [
      {
        id: 'q12_1',
        question: 'Dona Socorro compra todo o frango de um único fornecedor exclusivo. Se a granja dele sofrer um problema sanitário e interromper o fornecimento, a marmitaria dela para de funcionar imediatamente. Na Matriz de Riscos, como esse evento deve ser classificado e qual a medida mitigadora correta?',
        options: [
          'Risco desprezível; nenhuma atitude necessária',
          'Risco de alto impacto; a medida mitigadora é homologar e cotar com fornecedores alternativos de reserva',
          'Risco financeiro externo que o governo é obrigado a indenizar',
          'Risco especulativo de bolsa'
        ],
        answerIndex: 1,
        explanation: 'A dependência de um fornecedor único cria um ponto único de falha de altíssimo impacto; a diversificação de fornecedores é a mitigação clássica indispensável.'
      },
      {
        id: 'q12_2',
        question: 'No semiárido brasileiro, secas prolongadas constituem qual categoria de risco para o comércio local?',
        options: [
          'Risco Sistêmico e Ambiental (afeta a economia regional de forma generalizada, reduzindo a renda dos clientes e encarecendo insumos)',
          'Risco de compliance previdenciário do MEI',
          'Risco de software desatualizado',
          'Risco cambial de exportação de soja'
        ],
        answerIndex: 0,
        explanation: 'Fenômenos climáticos como estiagens no semiárido geram choques sistêmicos que repercutem em toda a cadeia de consumo e abastecimento regional.'
      },
      {
        id: 'q12_3',
        question: 'Um cliente faz uma compra de R$ 350,00 na bodega, mostra no visor do celular um comprovante bancário com os dizeres "Pix Agendado para amanhã" e tenta levar as mercadorias. Como o comerciante prudente deve proceder?',
        options: [
          'Entregar a mercadoria imediatamente, pois Pix agendado nunca pode ser cancelado',
          'Avisar cordialmente que a mercadoria só pode ser liberada após a efetiva compensação instantânea do Pix no saldo da conta do estabelecimento, já que agendamentos podem ser cancelados a qualquer instante antes da liquidação',
          'Chamar a polícia militar imediatamente sem dialogar',
          'Dar mais R$ 100 de troco em dinheiro vivo'
        ],
        answerIndex: 1,
        explanation: 'O golpe do Pix agendado é frequente: o fraudador agenda o pagamento, exibe a tela e cancela o agendamento minutos depois no aplicativo bancário. Venda com Pix só é concluída com dinheiro compensado em conta.'
      },
      {
        id: 'q12_4',
        question: 'Qual é o papel do "Fundo de Reserva de Emergência" na gestão de riscos de um pequeno negócio?',
        options: [
          'Servir como colchão de liquidez para garantir a sobrevivência e o pagamento de despesas fixas durante períodos de crise ou quedas severas de receita',
          'Financiar festas de final de ano',
          'Pagar multas de trânsito dos sócios',
          'Substituir a necessidade de vender produtos'
        ],
        answerIndex: 0,
        explanation: 'A reserva de contingência garante que despesas inadiáveis (salários, aluguel, energia) sejam honradas mesmo quando choques adversos interrompem temporariamente as receitas normais.'
      },
      {
        id: 'q12_5',
        question: 'Ao concluir as 12 etapas da Trilha da Chapada no Bodega CAJU e dominar a gestão financeira para pequenos negócios, qual é o título honorário conferido ao estudante ou empreendedor?',
        options: [
          'Auditor Fiscal da Fazenda',
          'Mestre da Bodega — Guardião da Castanha de Ouro',
          'Bancário Júnior',
          'Contador Geral da República'
        ],
        answerIndex: 1,
        explanation: 'Concluir a Trilha da Chapada dominando a Lente CAJU e as práticas de gestão confere a graduação máxima de "Mestre da Bodega" com a Castanha de Ouro!'
      }
    ],
    lenteCaju: {
      cidades: 'O semiárido enfrenta riscos climáticos cíclicos (estiagem) que impactam a renda de toda a comunidade simultaneamente. A diversificação dentro da mesma cidade oferece pouca proteção quando todos sofrem ao mesmo tempo.',
      analise: 'Redes de solidariedade e parentesco (associações de moradores, feiras e grupos de microcrédito) funcionam como o seguro social informal mais eficiente das cidades do Cariri, reduzindo os custos de enforcement e desespero social.',
      juridico: 'Instrumentos formais de mitigação: benefícios da Previdência Social garantidos pelo DAS-MEI pontual, seguro prestamista associado a operações de microcrédito e programas governamentais de socorro (como Garantia-Safra para agricultores familiares).',
      ubiquo: 'A Matriz de Riscos no celular e o Guia de Prevenção a Golpes Digitais ficam sempre acessíveis para consulta rápida no balcão.',
      reflexao: 'Se o fornecedor principal ou o cliente mais fiel do seu negócio sumisse amanhã, o que você faria para não fechar as portas?'
    },
    realidadeLocal: 'A crise histórica do polo calçadista do CRAJUBAR (Crato, Juazeiro, Barbalha) demonstrou de forma contundente como a dependência excessiva de uma única atividade fabril pode reverberar em efeito dominó por todo o comércio e serviços da região metropolitana.',
    missaoDeCampo: 'Converse com um comerciante do bairro e liste os 3 maiores riscos que tiram o sono dele atualmente. Proponha, com base no app, uma medida de prevenção prática para o risco mais grave.',
    selo: { name: 'Castanha Protegida', icon: '🛡️' }
  }
];
