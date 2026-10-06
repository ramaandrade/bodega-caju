export const GLOSSARY_TERMS = [
  {
    term: 'Margem de Contribuição (MC)',
    category: 'Custos e Precificação',
    formula: 'MC = Preço de Venda − Custos e Despesas Variáveis',
    description: 'Valor que sobra de cada venda após pagar os custos variáveis. É esse valor que contribui para pagar os custos fixos da bodega e gerar lucro.',
    example: 'Se a quentinha é R$ 15,00 e o custo variável é R$ 8,40, a MC é R$ 6,60 (44%).'
  },
  {
    term: 'Ponto de Equilíbrio (PE)',
    category: 'Indicadores',
    formula: 'PE (unidades) = Custos Fixos ÷ MC Unitária',
    description: 'Quantidade mínima de produtos ou serviços que você precisa vender no mês para zerar o prejuízo (cobrir todos os custos fixos). A partir dele começa o lucro.',
    example: 'Com R$ 1.050 de custos fixos e MC de R$ 6,60: PE = 1.050 / 6,60 ≈ 160 marmitas por mês.'
  },
  {
    term: 'Markup Divisor',
    category: 'Custos e Precificação',
    formula: 'Preço = Custo Unitário ÷ [1 − (% Despesas Variáveis + % Margem Lucro)]',
    description: 'Método correto para calcular o preço final de venda garantindo que a margem desejada seja uma porcentagem sobre o faturamento total, e não sobre o custo.',
    example: 'Custo R$ 10,00, taxa maquininha 4%, imposto 6%, lucro desejado 20%: Preço = 10 / (1 - 0,30) = R$ 14,29.'
  },
  {
    term: 'Ciclo Operacional (CO)',
    category: 'Capital de Giro',
    formula: 'CO = PME + PMR',
    description: 'Tempo total decorrido entre a compra da mercadoria e o efetivo recebimento do dinheiro da venda do cliente.',
    example: 'Prazo Médio de Estoque (PME) de 15 dias + Prazo Médio de Recebimento (PMR) de 20 dias = CO de 35 dias.'
  },
  {
    term: 'Ciclo Financeiro (CF)',
    category: 'Capital de Giro',
    formula: 'CF = PME + PMR − PMP',
    description: 'Tempo entre o dia que você paga o fornecedor e o dia em que você recebe do cliente. Quanto menor (ou mais negativo), melhor para o caixa!',
    example: 'Se você paga o fornecedor em 10 dias (PMP), seu CF é 35 - 10 = 25 dias a descoberto sem dinheiro.'
  },
  {
    term: 'Necessidade de Capital de Giro (NCG)',
    category: 'Capital de Giro',
    formula: 'NCG = Contas a Receber + Estoques − Contas a Pagar (Fornecedores)',
    description: 'Volume em dinheiro que o negócio precisa manter disponível para sustentar suas operações no dia a dia até receber dos clientes.',
    example: 'Em negócios sazonais como as romarias, a NCG salta nas semanas que antecedem a festa religiosa.'
  },
  {
    term: 'Pró-Labore',
    category: 'Gestão Financeira',
    formula: 'Salário Fixo do Sócio/Empreendedor',
    description: 'Remuneração fixa mensal retirada pelo empreendedor pelo seu trabalho operacional no negócio. Não deve ser confundido com lucro líquido nem retirado na hora da gaveta.',
    example: 'Dona Socorro estipula R$ 1.800,00 por mês transferidos para sua conta física pessoal todo dia 5.'
  },
  {
    term: 'Sistema Price (Tabela Price)',
    category: 'Crédito e Financiamento',
    formula: 'PMT = PV × i ÷ [1 − (1 + i)^(-n)]',
    description: 'Sistema de amortização em que todas as parcelas são de valor igual do início ao fim do contrato. No início, paga-se mais juros e menos amortização.',
    example: 'Muito usado em microcrédito e financiamentos comerciais rápidos.'
  },
  {
    term: 'Custo Efetivo Total (CET)',
    category: 'Crédito e Financiamento',
    formula: 'Taxa Anual que engloba Juros + IOF + Tarifas + Seguros',
    description: 'A taxa real de uma operação de crédito. Comparar apenas a taxa nominal de juros é uma armadilha, pois o CET revela todas as despesas embutidas.',
    example: 'Um empréstimo com juros de 2% ao mês pode ter CET de 3,8% ao mês após tarifas administrativas.'
  },
  {
    term: 'Payback Simples',
    category: 'Investimentos',
    formula: 'Payback = Investimento Inicial ÷ Geração de Caixa Mensal',
    description: 'Tempo necessário para recuperar o dinheiro investido em um novo equipamento, reforma ou estoque.',
    example: 'Um freezer novo de R$ 2.400 que economiza/gera R$ 400 por mês se paga em 6 meses.'
  },
  {
    term: 'Metodologia CAJU',
    category: 'Institucional & Territorial',
    formula: 'C (Cidades) + A (Análise Institucional) + J (Jurídico) + U (Ubíquo)',
    description: 'Metodologia desenvolvida na URCA para analisar a economia do Cariri e semiárido considerando a dinâmica urbana, regras informais, marcos legais e ferramentas acessíveis.',
    example: 'Mostra que modelos de negócios importados de São Paulo falham na feira do Crato se ignorarem a cultura e as instituições locais.'
  },
  {
    term: 'Microempreendedor Individual (MEI)',
    category: 'Compliance & Jurídico',
    formula: 'LC 128/2008 · Teto R$ 81.000/ano (em 2026)',
    description: 'Figura jurídica simplificada que formaliza pequenos negócios com CNPJ, emissão de notas fiscais para pessoas jurídicas, aposentadoria pelo INSS e pagamento mensal único (DAS).',
    example: 'O pagamento do DAS em dia garante auxílio-doença, salário-maternidade e aposentadoria por idade.'
  },
  {
    term: 'Aval Solidário (Microcrédito)',
    category: 'Institucional & Crédito',
    formula: 'Grupo de 4 a 6 empreendedores com garantia mútua',
    description: 'Mecanismo em que vizinhos e conhecidos avalizam os empréstimos uns dos outros sem precisar dar bens como garantia (usado com sucesso no Crediamigo do BNB).',
    example: 'Substitui a garantia real pela confiança social, reduzindo custos de monitoramento e inadimplência.'
  },
  {
    term: 'Reforma Tributária (CBS e IBS)',
    category: 'Compliance & Jurídico',
    formula: 'EC 132/2023 · LC 214/2025 · Transição 2026–2033',
    description: 'Substituição gradual de tributos (PIS/Cofins viram CBS; ICMS/ISS viram IBS). Em 2026 já aparecem com alíquotas-teste de 0,9% e 0,1% em notas eletrônicas. O Simples Nacional continua resguardado.',
    example: 'Microempresas podem optar pelo Simples híbrido a partir de 2027 para repassar créditos a clientes industriais.'
  }
];
