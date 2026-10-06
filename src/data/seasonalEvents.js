export const SEASONAL_EVENTS = [
  {
    id: 'romaria_dores',
    name: 'Romaria de Nossa Senhora das Dores',
    month: 'Setembro',
    city: 'Juazeiro do Norte',
    effectDescription: 'Demanda +200% por 5 dias; fornecedores exigem pagamento à vista antecipado.',
    demandMultiplier: 3.0,
    workingCapitalImpact: 'high',
    contentReinforced: 'Capital de Giro, Estoque e Fluxo de Caixa',
    story: 'Milhares de romeiros chegam em caminhões paus-de-arara e ônibus de todo o Nordeste. A cidade vira um mar de fé e comércio!',
    icon: '🙏'
  },
  {
    id: 'romaria_finados',
    name: 'Romaria de Finados',
    month: 'Novembro',
    city: 'Juazeiro do Norte',
    effectDescription: 'Pico de vendas; risco severo de faltar troco em moeda/espécie e ruptura de mercadoria.',
    demandMultiplier: 2.5,
    workingCapitalImpact: 'medium',
    contentReinforced: 'Planejamento e Caixa Diário',
    story: 'Peregrinos visitam o túmulo do Padre Cícero na Capela do Socorro. Quem não preparou estoque e troco perde venda na fila.',
    icon: '🕯️'
  },
  {
    id: 'romaria_candeias',
    name: 'Romaria das Candeias',
    month: 'Fevereiro',
    city: 'Juazeiro do Norte',
    effectDescription: 'Pico de vendas no início do ano com procissão de velas; oportunidade de liquidação de sobra de estoque.',
    demandMultiplier: 2.2,
    workingCapitalImpact: 'medium',
    contentReinforced: 'Reserva e Reinvestimento',
    story: 'A noite se ilumina com milhares de velas na Basílica Menor de Nossa Senhora das Dores. Encerramento do ciclo de romarias.',
    icon: '✨'
  },
  {
    id: 'expocrato',
    name: 'ExpoCrato',
    month: 'Julho',
    city: 'Crato',
    effectDescription: 'Oportunidade de barraca temporária no Parque Pedro Felício Cavalcanti com custo fixo alto de espaço.',
    demandMultiplier: 2.0,
    workingCapitalImpact: 'high',
    contentReinforced: 'Investimento, Payback e Ponto de Equilíbrio',
    story: 'A maior feira agropecuária e de grandes shows do interior do Ceará atrai turistas do país todo. O aluguel do espaço é salgado!',
    icon: '🎪'
  },
  {
    id: 'safra_pequi',
    name: 'Safra do Pequi na Chapada',
    month: 'Dezembro a Fevereiro',
    city: 'Floresta Nacional do Araripe',
    effectDescription: 'Insumo aromático abundante e barato por poucas semanas; alta procura regional por pratos típicos.',
    demandMultiplier: 1.4,
    workingCapitalImpact: 'low',
    contentReinforced: 'Precificação e Giro Rápido de Estoque',
    story: 'O aroma do pequi invade as feiras do Crato e Barbalha. Quem compra na safra reduz seu custo por refeição pela metade!',
    icon: '🌳'
  },
  {
    id: 'estiagem',
    name: 'Estiagem Prolongada no Semiárido',
    month: 'Outubro a Dezembro',
    city: 'Região do Cariri',
    effectDescription: 'Alta generalizada de preços de hortifrúti/grãos e queda temporária de poder de compra dos clientes.',
    demandMultiplier: 0.75,
    costMultiplier: 1.25,
    workingCapitalImpact: 'critical',
    contentReinforced: 'Gestão de Riscos, Crédito e Reserva de Emergência',
    story: 'O sol aperta no Cariri. A verdura vem de mais longe e o frete sobe. Só quem guardou a reserva de emergência respira aliviado.',
    icon: '☀️'
  },
  {
    id: 'alta_gas',
    name: 'Reajuste do Botijão de Gás',
    month: 'Qualquer Mês',
    city: 'Geral',
    effectDescription: 'Custo variável unitário de energia/cocção sobe R$ 0,60 por refeição/peça.',
    demandMultiplier: 1.0,
    costIncrease: 0.60,
    workingCapitalImpact: 'medium',
    contentReinforced: 'Custos, Precificação e Margem de Contribuição',
    story: 'O botijão de 13 kg subiu mais uma vez na distribuidora. Ou Dona Socorro recalcula a margem, ou vai pagar para cozinhar!',
    icon: '🔥'
  }
];
