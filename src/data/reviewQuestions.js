export const REVIEW_QUESTIONS_AV2 = [
  {
    id: 'av2_1',
    stageNumber: 3,
    stageTitle: 'Planejamento Financeiro',
    isCalculation: true,
    formula: 'Faturamento = Unidades/dia × Preço × Dias Trabalhados',
    question: 'Um pequeno negócio de marmitas no Crato planeja trabalhar 26 dias no mês, vendendo em média 55 marmitas por dia ao preço unitário de R$ 16,00. Qual é o faturamento mensal projetado?',
    options: ['R$ 22.880,00', 'R$ 14.300,00', 'R$ 24.960,00', 'R$ 18.200,00'],
    answerIndex: 0,
    explanation: 'Faturamento = 55 unidades × R$ 16,00 × 26 dias = R$ 22.880,00.'
  },
  {
    id: 'av2_2',
    stageNumber: 3,
    stageTitle: 'Planejamento Financeiro',
    isCalculation: true,
    formula: 'Q = (Custos Fixos + Lucro Desejado) ÷ (Preço − Custo Variável Unitário)',
    question: 'A Marmitaria da Socorro tem custos fixos de R$ 2.100,00/mês. Vende quentinhas a R$ 15,00 e o CVu é de R$ 8,00. Quantas quentinhas ela precisa vender no mês para atingir um lucro líquido desejado de R$ 2.800,00?',
    options: ['700 refeições', '650 refeições', '820 refeições', '500 refeições'],
    answerIndex: 0,
    explanation: 'MC unitária = 15 − 8 = R$ 7,00. Q = (2.100 + 2.800) ÷ 7 = 4.900 ÷ 7 = 700 marmitas.'
  },
  {
    id: 'av2_3',
    stageNumber: 5,
    stageTitle: 'Custos e Despesas',
    isCalculation: true,
    formula: 'Custo Total Unitário = CVu + (Despesas Fixas Totais ÷ Quantidade Produzida)',
    question: 'Uma oficina artesanal de couro no Cariri produz 200 bolsas por mês. Seus custos variáveis unitários com couro e fivelas somam R$ 38,00. As despesas fixas da oficina somam R$ 3.600,00/mês. Qual é o Custo Total Unitário de cada bolsa?',
    options: ['R$ 56,00', 'R$ 38,00', 'R$ 74,00', 'R$ 48,00'],
    answerIndex: 0,
    explanation: 'DFu = 3.600 ÷ 200 = R$ 18,00 por bolsa. Custo Total Unitário = 38 + 18 = R$ 56,00.'
  },
  {
    id: 'av2_4',
    stageNumber: 5,
    stageTitle: 'Custos e Despesas',
    isCalculation: false,
    formula: 'Conceito: Diluição de Fixos (Economia de Escala)',
    question: 'Se a mesma oficina artesanal dobrar a produção de 200 para 400 bolsas mantendo os mesmos custos fixos, o que ocorrerá com a Despesa Fixa Unitária (DFu)?',
    options: [
      'Cairá de R$ 18,00 para R$ 9,00 por bolsa (diluição dos custos fixos)',
      'Aumentará para R$ 36,00 por bolsa',
      'Permanecerá inalterada',
      'Dobrará o valor do imposto municipal'
    ],
    answerIndex: 0,
    explanation: 'DFu = 3.600 ÷ 400 = R$ 9,00 por bolsa. O aumento da escala dilui o custo fixo unitário.'
  },
  {
    id: 'av2_5',
    stageNumber: 6,
    stageTitle: 'Precificação',
    isCalculation: true,
    formula: 'Preço = Custo Unitário ÷ [1 − (% Despesas Variáveis + % Margem Desejada)]',
    question: 'Um comerciante compra uma imagem religiosa por R$ 21,00 de custo unitário. Ele paga 5% de taxa na maquininha, 5% de tributos e deseja uma margem de lucro líquido de 20%. Qual deve ser o preço de venda calculado pelo Markup Divisor?',
    options: ['R$ 30,00', 'R$ 27,30', 'R$ 25,20', 'R$ 33,50'],
    answerIndex: 0,
    explanation: 'Percentual total = 5% + 5% + 20% = 30% (0,30). Denominador = 1 − 0,30 = 0,70. Preço = 21 ÷ 0,70 = R$ 30,00.'
  },
  {
    id: 'av2_6',
    stageNumber: 6,
    stageTitle: 'Precificação',
    isCalculation: true,
    formula: 'Margem de Contribuição = Preço − CVu',
    question: 'Um produto é vendido por R$ 20,00 com CVu de R$ 12,00 (MC de R$ 8,00). O vendedor decide oferecer um desconto de 15%, passando o preço para R$ 17,00. Qual é a nova MC unitária e a perda percentual de margem?',
    options: [
      'Nova MC de R$ 5,00; perda de 37,5% da margem anterior',
      'Nova MC de R$ 6,80; perda de 15% da margem',
      'Nova MC de R$ 7,00; perda de 10% da margem',
      'A margem não muda'
    ],
    answerIndex: 0,
    explanation: 'Nova MC = 17 − 12 = R$ 5,00. Perda = (8 − 5) ÷ 8 = 3 ÷ 8 = 37,5%. Um desconto de 15% destruiu 37,5% do lucro unitário!'
  },
  {
    id: 'av2_7',
    stageNumber: 7,
    stageTitle: 'Capital de Giro',
    isCalculation: true,
    formula: 'Ciclo Operacional = PME + PMR | Ciclo Financeiro = CO − PMP',
    question: 'A Bodega do Bairro tem Prazo Médio de Estocagem (PME) de 20 dias, recebe dos clientes em média em 25 dias (PMR) e paga seus fornecedores em 15 dias (PMP). Quais são os Ciclos Operacional e Financeiro?',
    options: [
      'CO = 45 dias; CF = 30 dias',
      'CO = 35 dias; CF = 20 dias',
      'CO = 60 dias; CF = 45 dias',
      'CO = 25 dias; CF = 10 dias'
    ],
    answerIndex: 0,
    explanation: 'CO = PME + PMR = 20 + 25 = 45 dias. CF = CO − PMP = 45 − 15 = 30 dias.'
  },
  {
    id: 'av2_8',
    stageNumber: 7,
    stageTitle: 'Capital de Giro',
    isCalculation: true,
    formula: 'NCG ≈ Gastos Diários × Ciclo Financeiro (em dias)',
    question: 'Se a mesma mercearia tem gastos operacionais de R$ 350,00 por dia e seu Ciclo Financeiro é de 30 dias, qual é a Necessidade de Capital de Giro (NCG)?',
    options: ['R$ 10.500,00', 'R$ 7.000,00', 'R$ 5.250,00', 'R$ 14.000,00'],
    answerIndex: 0,
    explanation: 'NCG = R$ 350,00 × 30 dias = R$ 10.500,00.'
  },
  {
    id: 'av2_9',
    stageNumber: 8,
    stageTitle: 'Crédito e Financiamento',
    isCalculation: true,
    formula: 'Comprometimento = (Parcela Mensal ÷ Lucro Médio) × 100',
    question: 'Seu Expedito tem lucro mensal de R$ 2.000,00 na barraca. Ele recebe uma proposta de financiamento em 12 parcelas fixas de R$ 520,00. Qual o percentual de comprometimento do lucro e qual a avaliação prudencial?',
    options: [
      'Comprometimento de 26%; dentro do limite prudencial seguro de até 30%',
      'Comprometimento de 45%; acima do teto de risco',
      'Comprometimento de 52%; perigoso',
      'Comprometimento de 10%; excelente'
    ],
    answerIndex: 0,
    explanation: 'Comprometimento = (520 ÷ 2.000) × 100 = 26%. Está abaixo do teto prudencial de 30%, sendo viável financeiramente.'
  },
  {
    id: 'av2_10',
    stageNumber: 8,
    stageTitle: 'Crédito e Financiamento',
    isCalculation: true,
    formula: 'Juros Simples: M = PV × (1 + i × n)',
    question: 'Um empréstimo de curto prazo de R$ 4.000,00 é contratado a juros simples de 2,5% ao mês para pagamento integral após 6 meses. Qual é o Montante final devolvido?',
    options: ['R$ 4.600,00', 'R$ 4.400,00', 'R$ 5.000,00', 'R$ 4.250,00'],
    answerIndex: 0,
    explanation: 'Juros = 4.000 × 0,025 × 6 = R$ 600,00. Montante = 4.000 + 600 = R$ 4.600,00.'
  },
  {
    id: 'av2_11',
    stageNumber: 9,
    stageTitle: 'Gestão de Investimentos',
    isCalculation: true,
    formula: 'Payback = Investimento Inicial ÷ Ganho Mensal',
    question: 'Um pequeno restaurante em Barbalha compra uma máquina seladora de pratos por R$ 1.800,00. A máquina reduz perdas de alimentos e gera um ganho adicional de caixa de R$ 300,00 por mês. Em quantos meses o investimento se paga?',
    options: ['6 meses', '4 meses', '9 meses', '12 meses'],
    answerIndex: 0,
    explanation: 'Payback = 1.800 ÷ 300 = 6 meses.'
  },
  {
    id: 'av2_12',
    stageNumber: 9,
    stageTitle: 'Gestão de Investimentos',
    isCalculation: true,
    formula: 'Taxa Real = [(1 + Taxa Nominal) ÷ (1 + Inflação)] − 1',
    question: 'Com a taxa Selic em 13,75% ao ano (0,1375) e a inflação IPCA projetada em 5,2% ao ano (0,052), qual é o ganho real de uma aplicação de renda fixa 100% Selic?',
    options: [
      'Aproximadamente 8,13% ao ano',
      'Exatamente 18,95% ao ano',
      '8,55% ao ano',
      '5,20% ao ano'
    ],
    answerIndex: 0,
    explanation: '(1 + 0,1375) ÷ (1 + 0,052) − 1 = 1,1375 ÷ 1,052 − 1 = 1,08127 − 1 = 8,13% a.a.'
  },
  {
    id: 'av2_13',
    stageNumber: 10,
    stageTitle: 'Indicadores Financeiros',
    isCalculation: true,
    formula: 'PE (unidades) = Custos Fixos ÷ MC Unitária | PE (R$) = PE × Preço',
    question: 'Uma lanchonete tem custos fixos de R$ 4.000,00/mês. Vende combos a R$ 25,00 com CVu de R$ 9,00 (MC = R$ 16,00). Qual o Ponto de Equilíbrio em unidades e em faturamento bruto mensal?',
    options: [
      '250 unidades e R$ 6.250,00',
      '200 unidades e R$ 5.000,00',
      '300 unidades e R$ 7.500,00',
      '160 unidades e R$ 4.000,00'
    ],
    answerIndex: 0,
    explanation: 'PE (unid) = 4.000 ÷ 16 = 250 combos. PE (R$) = 250 × 25 = R$ 6.250,00.'
  },
  {
    id: 'av2_14',
    stageNumber: 10,
    stageTitle: 'Indicadores Financeiros',
    isCalculation: true,
    formula: 'Liquidez Corrente = Ativo Circulante ÷ Passivo Circulante',
    question: 'A bodega possui R$ 7.500,00 entre dinheiro no caixa, estoque vendável e faturas a receber no mês (Ativo Circulante). Suas contas a pagar no mês com fornecedores e energia somam R$ 5.000,00 (Passivo Circulante). Qual é a Liquidez Corrente?',
    options: ['1,50 (Solvente e saudável)', '0,66 (Em risco)', '2,50', '1,00'],
    answerIndex: 0,
    explanation: 'LC = 7.500 ÷ 5.000 = 1,50. Como é maior que 1,0, a empresa possui R$ 1,50 para cada R$ 1,00 de dívida de curto prazo.'
  },
  {
    id: 'av2_15',
    stageNumber: 10,
    stageTitle: 'Indicadores Financeiros',
    isCalculation: true,
    formula: 'Margem Líquida = (Lucro Líquido ÷ Faturamento Total) × 100',
    question: 'Se a Marmitaria da Socorro faturou R$ 20.000,00 no mês e o lucro líquido final apurado após todos os custos e pró-labore foi de R$ 3.200,00, qual é a Margem Líquida?',
    options: ['16%', '20%', '32%', '8%'],
    answerIndex: 0,
    explanation: 'Margem Líquida = (3.200 ÷ 20.000) × 100 = 16%.'
  }
];
