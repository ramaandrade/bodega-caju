import React, { useState } from 'react';
import { 
  Check, 
  RefreshCw, 
  AlertTriangle, 
  ArrowRight, 
  Coins, 
  TrendingUp, 
  TrendingDown, 
  Sparkles,
  ShieldAlert,
  Sliders,
  DollarSign,
  PieChart
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function OficinasHub({ stageId, businessState, onUpdateCash, onRewardCajus }) {
  // We render the specific interactive simulator based on stageId (1 to 12)
  switch (stageId) {
    case 1:
      return <OficinaGaveta businessState={businessState} onUpdateCash={onUpdateCash} onRewardCajus={onRewardCajus} />;
    case 2:
      return <OficinaTeorias onRewardCajus={onRewardCajus} />;
    case 3:
      return <OficinaCalendario businessState={businessState} onUpdateCash={onUpdateCash} onRewardCajus={onRewardCajus} />;
    case 4:
      return <OficinaCaixa businessState={businessState} onUpdateCash={onUpdateCash} onRewardCajus={onRewardCajus} />;
    case 5:
      return <OficinaCustos businessState={businessState} onRewardCajus={onRewardCajus} />;
    case 6:
      return <OficinaMarkup businessState={businessState} onUpdateCash={onUpdateCash} onRewardCajus={onRewardCajus} />;
    case 7:
      return <OficinaGiro businessState={businessState} onRewardCajus={onRewardCajus} />;
    case 8:
      return <OficinaCredito businessState={businessState} onUpdateCash={onUpdateCash} onRewardCajus={onRewardCajus} />;
    case 9:
      return <OficinaInvestimentos businessState={businessState} onUpdateCash={onUpdateCash} onRewardCajus={onRewardCajus} />;
    case 10:
      return <OficinaIndicadores businessState={businessState} onRewardCajus={onRewardCajus} />;
    case 11:
      return <OficinaCompliance businessState={businessState} onUpdateCash={onUpdateCash} onRewardCajus={onRewardCajus} />;
    case 12:
      return <OficinaRiscos businessState={businessState} onUpdateCash={onUpdateCash} onRewardCajus={onRewardCajus} />;
    default:
      return <div className="p-4 text-center text-xs text-stone-500">Selecione uma estação para abrir a oficina.</div>;
  }
}

// ----------------------------------------------------
// 1. OFICINA A GAVETA MISTURADA (Estação 1)
// ----------------------------------------------------
function OficinaGaveta({ businessState, onUpdateCash, onRewardCajus }) {
  const initialItems = [
    { id: 1, desc: 'Compra de 20 kg de frango na feira', val: 240, correct: 'negocio' },
    { id: 2, desc: 'Conta de luz da casa da família', val: 190, correct: 'casa' },
    { id: 3, desc: 'Venda de 35 marmitas no almoço', val: 525, correct: 'negocio' },
    { id: 4, desc: 'Mensalidade escolar do filho', val: 320, correct: 'casa' },
    { id: 5, desc: 'Botijão de gás da cozinha da marmitaria', val: 110, correct: 'negocio' },
    { id: 6, desc: 'Remédio da farmácia para a avó', val: 85, correct: 'casa' },
    { id: 7, desc: 'Compra de 100 embalagens descartáveis', val: 95, correct: 'negocio' },
    { id: 8, desc: 'Feira da semana para casa (frutas/sabão)', val: 210, correct: 'casa' },
  ];

  const [items, setItems] = useState(initialItems);
  const [classified, setClassified] = useState({});
  const [proLabore, setProlabore] = useState(1500);
  const [finalized, setFinalized] = useState(false);

  const handleClassify = (id, choice) => {
    setClassified(prev => ({ ...prev, [id]: choice }));
  };

  const handleFinish = () => {
    let correctCount = 0;
    let businessIn = 0;
    let businessOut = 0;
    let personalOut = 0;

    items.forEach(it => {
      if (classified[it.id] === it.correct) correctCount++;
      if (it.correct === 'negocio') {
        if (it.val === 525) businessIn += it.val;
        else businessOut += it.val;
      } else {
        personalOut += it.val;
      }
    });

    setFinalized(true);
    confetti({ particleCount: 50, spread: 60 });
    onRewardCajus(40);
  };

  const allAnswered = Object.keys(classified).length === items.length;

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-amber-100 border border-amber-300 p-3 rounded-2xl">
        <h4 className="font-bold text-amber-900 text-sm">Oficina: A Gaveta Misturada</h4>
        <p className="text-stone-700 mt-1">
          Socorro encontrou 8 comprovantes na gaveta. Separe cada um clicando em <b>Negócio</b> ou <b>Casa</b> para revelar o vazamento de dinheiro!
        </p>
      </div>

      <div className="space-y-2">
        {items.map(it => {
          const current = classified[it.id];
          const isCorrect = finalized && current === it.correct;
          const isWrong = finalized && current !== it.correct;

          return (
            <div 
              key={it.id} 
              className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                isCorrect ? 'bg-emerald-50 border-emerald-300' :
                isWrong ? 'bg-rose-50 border-rose-300' :
                'bg-white border-stone-200'
              }`}
            >
              <div className="flex-1">
                <div className="font-medium text-stone-900">{it.desc}</div>
                <div className="text-[11px] font-mono font-bold text-amber-800">
                  R$ {it.val.toFixed(2)}
                </div>
              </div>

              {!finalized ? (
                <div className="flex gap-1">
                  <button
                    onClick={() => handleClassify(it.id, 'negocio')}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                      current === 'negocio' 
                        ? 'bg-amber-600 text-white shadow' 
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    🏪 Negócio
                  </button>
                  <button
                    onClick={() => handleClassify(it.id, 'casa')}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                      current === 'casa' 
                        ? 'bg-orange-600 text-white shadow' 
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    🏠 Casa
                  </button>
                </div>
              ) : (
                <span className={`text-[11px] font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {isCorrect ? '✓ Correto' : `✗ Era ${it.correct === 'negocio' ? 'Negócio' : 'Casa'}`}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {!finalized ? (
        <button
          disabled={!allAnswered}
          onClick={handleFinish}
          className={`w-full py-2.5 rounded-xl font-bold text-sm shadow-md transition-all ${
            allAnswered 
              ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white active:scale-95' 
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          {allAnswered ? 'Revelar Lucro e Vazamento da Gaveta' : 'Classifique todos os 8 itens'}
        </button>
      ) : (
        <div className="bg-stone-900 text-amber-50 p-4 rounded-2xl space-y-3 animate-in fade-in">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Diagnóstico do Mestre Caju</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-stone-800 p-2.5 rounded-xl border border-stone-700">
              <span className="text-stone-400">Total Faturamento:</span>
              <div className="text-base font-bold text-emerald-400">R$ 525,00</div>
            </div>
            <div className="bg-stone-800 p-2.5 rounded-xl border border-stone-700">
              <span className="text-stone-400">Custos Reais do Negócio:</span>
              <div className="text-base font-bold text-amber-300">R$ 445,00</div>
            </div>
            <div className="bg-stone-800 p-2.5 rounded-xl border border-stone-700">
              <span className="text-stone-400">Lucro Operacional Puro:</span>
              <div className="text-base font-bold text-emerald-400">+ R$ 80,00</div>
            </div>
            <div className="bg-stone-800 p-2.5 rounded-xl border border-rose-900/60 bg-rose-950/20">
              <span className="text-rose-400">Vazamento para a Casa:</span>
              <div className="text-base font-bold text-rose-400">R$ 805,00</div>
            </div>
          </div>

          <p className="text-stone-300 leading-relaxed text-[11px]">
            <b>Conclusão:</b> O negócio deu R$ 80 de lucro no dia! Mas como a casa retirou R$ 805 na mesma semana sem planejamento, faltou dinheiro no caixa da bodega. A solução é fixar o Pró-Labore!
          </p>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 2. OFICINA QUEM EXPLICA? (Estação 2 - Teorias)
// ----------------------------------------------------
function OficinaTeorias({ onRewardCajus }) {
  const cases = [
    {
      id: 1,
      story: 'Seu Expedito não pega empréstimo de expansão mesmo com o banco oferecendo, porque tem medo da romaria ser fraca e não conseguir pagar as parcelas fixas.',
      theory: 'Utilidade Esperada & Aversão ao Risco',
      desc: 'Mostra como a incerteza faz o empreendedor preferir o ganho certo ao risco.'
    },
    {
      id: 2,
      story: 'Dona Socorro vende tudo o que cozinha, mas quebrou em 2 meses porque clientes pagavam em 30 dias enquanto o frango tinha que ser pago à vista.',
      theory: 'Gestão do Capital de Giro',
      desc: 'Crise de liquidez e descasamento de prazos quebra negócios lucrativos.'
    },
    {
      id: 3,
      story: 'Mestre Valdir vende bolsas a R$ 250 porque sua técnica manual e história no Geopark não podem ser copiadas por indústrias chinesas.',
      theory: 'Recursos e Capacidades (VBR)',
      desc: 'Ativos únicos, raros e difíceis de imitar sustentam a vantagem competitiva.'
    },
    {
      id: 4,
      story: 'O banco recusa crédito a Dona Maria da feira porque ela não tem imóvel com escritura registrada no cartório para dar como garantia.',
      theory: 'Restrições Financeiras & Assimetria de Informação',
      desc: 'Custos de transação e ausência de garantias formais limitam o crédito formal.'
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentCase = cases[currentIdx];
  const options = [
    'Utilidade Esperada & Aversão ao Risco',
    'Gestão do Capital de Giro',
    'Recursos e Capacidades (VBR)',
    'Restrições Financeiras & Assimetria de Informação'
  ];

  const handleSelect = (opt) => {
    if (answered) return;
    setSelected(opt);
    setAnswered(true);
    if (opt === currentCase.theory) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < cases.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      confetti({ particleCount: 40 });
      onRewardCajus(40);
    }
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-amber-100 border border-amber-300 p-3 rounded-2xl">
        <h4 className="font-bold text-amber-900 text-sm">Oficina: Quem Explica?</h4>
        <p className="text-stone-700 mt-1">
          Associe cada situação real do Cariri à teoria financeira correspondente ({currentIdx + 1}/{cases.length}).
        </p>
      </div>

      <div className="bg-white border border-stone-200 p-4 rounded-2xl shadow-sm space-y-2">
        <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">Situação Real</span>
        <p className="text-sm font-semibold text-stone-900 leading-relaxed">
          "{currentCase.story}"
        </p>
      </div>

      <div className="space-y-2">
        {options.map((opt, i) => {
          let btnClass = 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100';
          if (answered) {
            if (opt === currentCase.theory) btnClass = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
            else if (opt === selected) btnClass = 'bg-rose-100 border-rose-400 text-rose-900';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              className={`w-full p-3 rounded-xl border text-left font-medium transition-all ${btnClass}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="bg-stone-900 text-amber-50 p-3 rounded-2xl space-y-2 animate-in fade-in">
          <p className="text-xs text-stone-300">
            <b>Explicação:</b> {currentCase.desc}
          </p>
          <button
            onClick={handleNext}
            className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs"
          >
            {currentIdx < cases.length - 1 ? 'Próxima Situação ▶' : 'Concluir Oficina (+40 Cajus)'}
          </button>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 3. OFICINA CALENDÁRIO DA SAFRA (Estação 3 - Planejamento)
// ----------------------------------------------------
function OficinaCalendario({ businessState, onUpdateCash, onRewardCajus }) {
  const [reservePercent, setReservePercent] = useState(15);
  const months = [
    { name: 'Jan', season: 'normal', demand: 1.0 },
    { name: 'Fev', season: 'Candeias', demand: 2.2 },
    { name: 'Mar', season: 'baixo', demand: 0.8 },
    { name: 'Abr', season: 'normal', demand: 1.0 },
    { name: 'Mai', season: 'normal', demand: 1.0 },
    { name: 'Jun', season: 'normal', demand: 1.0 },
    { name: 'Jul', season: 'ExpoCrato', demand: 2.0 },
    { name: 'Ago', season: 'normal', demand: 1.0 },
    { name: 'Set', season: 'Romaria Dores', demand: 3.0 },
    { name: 'Out', season: 'normal', demand: 0.9 },
    { name: 'Nov', season: 'Finados', demand: 2.5 },
    { name: 'Dez', season: 'Safra Pequi', demand: 1.3 }
  ];

  const baseFixed = 1200;
  const baseRevenue = 3000;
  const baseVariable = 1600;

  let reserveTotal = 0;
  let negativeMonths = 0;

  const simulation = months.map(m => {
    const rev = baseRevenue * m.demand;
    const varCost = baseVariable * m.demand;
    const grossProfit = rev - varCost;
    const toReserve = rev * (reservePercent / 100);
    reserveTotal += toReserve;
    const netCash = grossProfit - baseFixed - toReserve;
    if (netCash < 0 && reserveTotal < Math.abs(netCash)) {
      negativeMonths++;
    }
    return { ...m, rev, netCash };
  });

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-amber-100 border border-amber-300 p-3 rounded-2xl">
        <h4 className="font-bold text-amber-900 text-sm">Oficina: Calendário da Safra (12 Meses)</h4>
        <p className="text-stone-700 mt-1">
          Ajuste a % de Reserva retida nos meses de pico (romarias e feiras) para proteger o caixa nos meses de seca.
        </p>
      </div>

      <div className="bg-white border border-stone-200 p-3 rounded-2xl space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-bold text-stone-800">Retenção para Reserva de Emergência:</span>
          <span className="font-mono text-base font-extrabold text-amber-600">{reservePercent}%</span>
        </div>
        <input 
          type="range"
          min="0"
          max="30"
          step="5"
          value={reservePercent}
          onChange={(e) => setReservePercent(Number(e.target.value))}
          className="w-full accent-amber-600"
        />
        <div className="flex justify-between text-[10px] text-stone-500">
          <span>0% (Sem reserva)</span>
          <span>15% (Recomendado)</span>
          <span>30% (Conservador)</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        {simulation.map((m, idx) => (
          <div 
            key={idx} 
            className={`p-2 rounded-xl border text-center ${
              m.demand >= 2.0 ? 'bg-amber-100 border-amber-400 font-bold' :
              m.netCash < 0 ? 'bg-rose-50 border-rose-300' :
              'bg-stone-50 border-stone-200'
            }`}
          >
            <div className="text-[10px] uppercase font-bold text-stone-600">{m.name}</div>
            <div className="text-[9px] text-amber-800 truncate">{m.season}</div>
            <div className={`font-mono text-[10px] font-bold mt-1 ${m.netCash >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
              R$ {Math.round(m.netCash)}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-stone-900 text-amber-50 p-3 rounded-2xl flex items-center justify-between">
        <div>
          <span className="text-stone-400 text-[10px]">Reserva Acumulada no Ano:</span>
          <div className="text-base font-mono font-bold text-amber-400">
            R$ {Math.round(reserveTotal).toLocaleString('pt-BR')}
          </div>
        </div>
        <div>
          <span className="text-stone-400 text-[10px]">Meses com Caixa no Vermelho:</span>
          <div className={`text-base font-bold text-right ${negativeMonths === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {negativeMonths === 0 ? '0 (Caixa Seguro ✓)' : `${negativeMonths} meses ⚠️`}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 4. OFICINA CAIXA DA SEMANA (Estação 4 - Fluxo de Caixa)
// ----------------------------------------------------
function OficinaCaixa({ businessState, onUpdateCash, onRewardCajus }) {
  const [actionChosen, setActionChosen] = useState(null);

  const handleAction = (type) => {
    setActionChosen(type);
    if (type === 'renegociar') {
      onRewardCajus(50);
      confetti({ particleCount: 30 });
    } else if (type === 'cheque_especial') {
      onUpdateCash(-120); // juros do cheque especial
    }
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-amber-100 border border-amber-300 p-3 rounded-2xl">
        <h4 className="font-bold text-amber-900 text-sm">Oficina: O Apuro do Dia 10</h4>
        <p className="text-stone-700 mt-1">
          É dia 10. Você tem <b>R$ 300 em saldo</b>, mas um boleto de <b>R$ 800 do distribuidor de bebidas</b> vence hoje às 17h. O que fazer?
        </p>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => handleAction('renegociar')}
          className={`w-full p-3 rounded-xl border text-left transition-all ${
            actionChosen === 'renegociar' ? 'bg-emerald-100 border-emerald-500 font-bold' : 'bg-white border-stone-200 hover:bg-stone-50'
          }`}
        >
          <div className="font-bold text-stone-900">1. Ligar antecipadamente e renegociar prazo para dia 20</div>
          <p className="text-[11px] text-stone-600 mt-0.5">Custo R$ 0. Mantém a confiança do parceiro e preserva o caixa.</p>
        </button>

        <button
          onClick={() => handleAction('cobrar_fiado')}
          className={`w-full p-3 rounded-xl border text-left transition-all ${
            actionChosen === 'cobrar_fiado' ? 'bg-amber-100 border-amber-500 font-bold' : 'bg-white border-stone-200 hover:bg-stone-50'
          }`}
        >
          <div className="font-bold text-stone-900">2. Enviar mensagem amigável no WhatsApp cobrando clientes com fiado vencido</div>
          <p className="text-[11px] text-stone-600 mt-0.5">Recupera até R$ 400 no Pix com baixo custo de transação.</p>
        </button>

        <button
          onClick={() => handleAction('cheque_especial')}
          className={`w-full p-3 rounded-xl border text-left transition-all ${
            actionChosen === 'cheque_especial' ? 'bg-rose-100 border-rose-500 font-bold' : 'bg-white border-stone-200 hover:bg-stone-50'
          }`}
        >
          <div className="font-bold text-stone-900">3. Entrar no Cheque Especial do banco comercial</div>
          <p className="text-[11px] text-stone-600 mt-0.5">Cobre o boleto na hora, mas cobra 14% ao mês de juros e IOF!</p>
        </button>
      </div>

      {actionChosen && (
        <div className="bg-stone-900 text-amber-50 p-3 rounded-2xl space-y-1.5 animate-in fade-in">
          <div className="font-bold text-amber-300">
            {actionChosen === 'renegociar' ? '🏆 Excelente Decisão!' :
             actionChosen === 'cobrar_fiado' ? '👍 Boa Alternativa Operacional!' :
             '⚠️ Perigo Financeiro!'}
          </div>
          <p className="text-[11px] text-stone-300">
            {actionChosen === 'renegociar' 
              ? 'Negociar prazo com antecedência demonstra profissionalismo e honra seu nome no comércio do Cariri sem pagar juros abusivos.'
              : actionChosen === 'cobrar_fiado'
              ? 'Cobrar recebíveis atrasados com elegância pelo WhatsApp gera liquidez imediata no caixa.'
              : 'O cheque especial é uma das linhas de crédito mais perigosas do país. Evite a todo custo!'}
          </p>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 5. OFICINA RAIO-X DA MARMITA (Estação 5 - Custos)
// ----------------------------------------------------
function OficinaCustos({ businessState, onRewardCajus }) {
  const [volume, setVolume] = useState(500);
  const fixedTotal = 1500;
  const cva = 8.40;

  const dfu = fixedTotal / volume;
  const totalUnit = cva + dfu;

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-amber-100 border border-amber-300 p-3 rounded-2xl">
        <h4 className="font-bold text-amber-900 text-sm">Oficina: Raio-X dos Custos e Escala</h4>
        <p className="text-stone-700 mt-1">
          Veja como o aumento na quantidade vendida dilui as despesas fixas (DFu) e reduz o custo total de cada quentinha!
        </p>
      </div>

      <div className="bg-white border border-stone-200 p-3 rounded-2xl space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-bold text-stone-800">Volume Produzido no Mês:</span>
          <span className="font-mono text-base font-extrabold text-amber-600">{volume} marmitas</span>
        </div>
        <input 
          type="range"
          min="100"
          max="2000"
          step="50"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full accent-amber-600"
        />
        <div className="flex justify-between text-[10px] text-stone-500">
          <span>100 unidades</span>
          <span>1.000 unidades</span>
          <span>2.000 unidades</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-stone-100 p-2.5 rounded-xl border border-stone-200">
          <span className="text-[10px] text-stone-500">Custo Variável (CVu):</span>
          <div className="font-mono font-bold text-stone-800 mt-0.5">R$ {cva.toFixed(2)}</div>
          <span className="text-[9px] text-stone-400">Fixo por unidade</span>
        </div>
        <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200">
          <span className="text-[10px] text-amber-800 font-semibold">Custo Fixo (DFu):</span>
          <div className="font-mono font-bold text-amber-700 mt-0.5">R$ {dfu.toFixed(2)}</div>
          <span className="text-[9px] text-amber-600">Dilui com escala!</span>
        </div>
        <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
          <span className="text-[10px] text-emerald-800 font-semibold">Custo Total Unit:</span>
          <div className="font-mono font-bold text-emerald-700 mt-0.5">R$ {totalUnit.toFixed(2)}</div>
          <span className="text-[9px] text-emerald-600">Para precificar</span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 6. OFICINA BALCÃO DE PREÇO & MARKUP (Estação 6 - Precificação)
// ----------------------------------------------------
function OficinaMarkup({ businessState, onUpdateCash, onRewardCajus }) {
  const [cost, setCost] = useState(9.00);
  const [cardTax, setCardTax] = useState(4);
  const [simplesTax, setSimplesTax] = useState(6);
  const [targetMargin, setTargetMargin] = useState(25);

  const totalDeductions = (cardTax + simplesTax + targetMargin) / 100;
  const denominator = 1 - totalDeductions;
  const calculatedPrice = denominator > 0 ? cost / denominator : 0;
  const mcUnit = calculatedPrice - cost;

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-amber-100 border border-amber-300 p-3 rounded-2xl">
        <h4 className="font-bold text-amber-900 text-sm">Oficina: Calculadora de Markup Divisor</h4>
        <p className="text-stone-700 mt-1">
          Preço = Custo ÷ [1 − (Taxas + Margem)]. Garanta que sua margem seja calculada sobre o preço final!
        </p>
      </div>

      <div className="bg-white border border-stone-200 p-3 rounded-2xl space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-stone-600">Custo Variável Unitário:</span>
          <div className="flex items-center gap-1 font-mono font-bold">
            R$ <input 
              type="number" 
              value={cost} 
              onChange={(e) => setCost(Number(e.target.value))}
              className="w-16 p-1 border rounded text-right font-bold" 
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-stone-600">Taxa Maquininha Cartão (%):</span>
          <span className="font-mono font-bold">{cardTax}%</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-stone-600">Tributos Simples / DAS (%):</span>
          <span className="font-mono font-bold">{simplesTax}%</span>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-stone-600 font-semibold">Margem de Lucro Desejada:</span>
            <span className="font-mono font-bold text-amber-700">{targetMargin}%</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="45" 
            value={targetMargin} 
            onChange={(e) => setTargetMargin(Number(e.target.value))}
            className="w-full accent-amber-600"
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-stone-900 to-stone-950 text-amber-50 p-4 rounded-2xl space-y-2 text-center">
        <span className="text-[11px] text-stone-400 uppercase tracking-wider">Preço Recomendado de Venda</span>
        <div className="text-3xl font-mono font-black text-amber-400">
          R$ {calculatedPrice.toFixed(2)}
        </div>
        <div className="text-[11px] text-emerald-300 font-medium">
          Margem de Contribuição: R$ {mcUnit.toFixed(2)} por unidade vendida
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 7. OFICINA RÉGUA DOS PRAZOS (Estação 7 - Capital de Giro)
// ----------------------------------------------------
function OficinaGiro({ businessState, onRewardCajus }) {
  const [pme, setPme] = useState(15);
  const [pmr, setPmr] = useState(20);
  const [pmp, setPmp] = useState(25);

  const co = pme + pmr;
  const cf = co - pmp;
  const dailyExpenses = 350;
  const ncg = cf > 0 ? cf * dailyExpenses : 0;

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-amber-100 border border-amber-300 p-3 rounded-2xl">
        <h4 className="font-bold text-amber-900 text-sm">Oficina: A Régua dos Prazos</h4>
        <p className="text-stone-700 mt-1">
          Arraste os prazos para calcular o Ciclo Operacional (CO) e Ciclo Financeiro (CF). O segredo é negociar PMP alto!
        </p>
      </div>

      <div className="bg-white border border-stone-200 p-3 rounded-2xl space-y-3">
        <div>
          <div className="flex justify-between">
            <span>Tempo de Estoque (PME):</span>
            <span className="font-mono font-bold text-amber-700">{pme} dias</span>
          </div>
          <input type="range" min="2" max="45" value={pme} onChange={(e) => setPme(Number(e.target.value))} className="w-full accent-amber-600" />
        </div>

        <div>
          <div className="flex justify-between">
            <span>Prazo dos Clientes (PMR):</span>
            <span className="font-mono font-bold text-amber-700">{pmr} dias</span>
          </div>
          <input type="range" min="0" max="60" value={pmr} onChange={(e) => setPmr(Number(e.target.value))} className="w-full accent-amber-600" />
        </div>

        <div>
          <div className="flex justify-between">
            <span>Prazo com Fornecedores (PMP):</span>
            <span className="font-mono font-bold text-emerald-700">{pmp} dias</span>
          </div>
          <input type="range" min="5" max="60" value={pmp} onChange={(e) => setPmp(Number(e.target.value))} className="w-full accent-emerald-600" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="bg-stone-800 text-stone-100 p-3 rounded-xl">
          <span className="text-[10px] text-stone-400">Ciclo Operacional (CO):</span>
          <div className="text-lg font-bold text-amber-300">{co} dias</div>
        </div>
        <div className={`p-3 rounded-xl font-bold ${cf <= 0 ? 'bg-emerald-950 text-emerald-200 border border-emerald-500' : 'bg-rose-950 text-rose-200 border border-rose-500'}`}>
          <span className="text-[10px] opacity-80">Ciclo Financeiro (CF):</span>
          <div className="text-lg">{cf} dias</div>
          <span className="text-[9px] font-normal">{cf <= 0 ? 'Negativo (Excelente!)' : 'A descoberto'}</span>
        </div>
      </div>

      <div className="bg-stone-900 text-amber-100 p-3 rounded-2xl flex justify-between items-center">
        <span>Necessidade de Giro (NCG):</span>
        <span className="font-mono font-extrabold text-base text-amber-400">
          R$ {ncg.toLocaleString('pt-BR')}
        </span>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 8. OFICINA BALCÃO DO BANCO DA VILA (Estação 8 - Crédito)
// ----------------------------------------------------
function OficinaCredito({ businessState, onUpdateCash, onRewardCajus }) {
  const [selectedProposal, setSelectedProposal] = useState(null);

  const proposals = [
    {
      id: 'crediamigo',
      title: 'Microcrédito Solidário (Crediamigo BNB)',
      rate: '1,8% ao mês (orientado)',
      installments: '6x de R$ 555,00',
      total: 3330,
      cet: '24% ao ano',
      risk: 'Baixo (requer grupo de 4 vizinhos)',
      tag: 'Recomendado'
    },
    {
      id: 'comercial',
      title: 'Empréstimo Comercial Tradicional',
      rate: '3,8% ao mês + TAC',
      installments: '6x de R$ 620,00',
      total: 3720,
      cet: '56% ao ano',
      risk: 'Médio (exige garantias reais)',
      tag: 'Caro'
    },
    {
      id: 'agiota',
      title: 'Dinheiro na Mão na Praça (Agiota)',
      rate: '15% ao mês (sem consulta)',
      installments: '6x de R$ 850,00',
      total: 5100,
      cet: '435% ao ano',
      risk: 'Crítico (ameaças e perda de bens)',
      tag: 'Perigoso'
    }
  ];

  const handleChoose = (prop) => {
    setSelectedProposal(prop.id);
    if (prop.id === 'crediamigo') {
      onRewardCajus(40);
      confetti({ particleCount: 30 });
    }
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-amber-100 border border-amber-300 p-3 rounded-2xl">
        <h4 className="font-bold text-amber-900 text-sm">Oficina: O Balcão de Crédito</h4>
        <p className="text-stone-700 mt-1">
          Você precisa de R$ 3.000 para capital de giro antes da romaria. Compare as 3 propostas pelo Custo Total e CET!
        </p>
      </div>

      <div className="space-y-2">
        {proposals.map(p => (
          <div 
            key={p.id}
            onClick={() => handleChoose(p)}
            className={`p-3 rounded-2xl border cursor-pointer transition-all ${
              selectedProposal === p.id 
                ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-400' 
                : 'bg-white border-stone-200 hover:border-stone-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <h5 className="font-bold text-stone-900">{p.title}</h5>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                p.id === 'crediamigo' ? 'bg-emerald-100 text-emerald-800' :
                p.id === 'agiota' ? 'bg-rose-100 text-rose-800' : 'bg-stone-100 text-stone-700'
              }`}>
                {p.tag}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1 text-[11px]">
              <div>
                <span className="text-stone-400 text-[10px]">Parcela:</span>
                <div className="font-bold">{p.installments}</div>
              </div>
              <div>
                <span className="text-stone-400 text-[10px]">Custo Total:</span>
                <div className="font-bold text-amber-700">R$ {p.total}</div>
              </div>
              <div>
                <span className="text-stone-400 text-[10px]">CET Anual:</span>
                <div className="font-bold">{p.cet}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 9. OFICINA FEIRA DOS INVESTIMENTOS (Estação 9 - Investimentos)
// ----------------------------------------------------
function OficinaInvestimentos({ businessState, onUpdateCash, onRewardCajus }) {
  const [allocation, setAllocation] = useState({ freezer: 1200, tesouro: 800, scam: 0 });

  const total = allocation.freezer + allocation.tesouro + allocation.scam;

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-amber-100 border border-amber-300 p-3 rounded-2xl">
        <h4 className="font-bold text-amber-900 text-sm">Oficina: Alocação de Sementes</h4>
        <p className="text-stone-700 mt-1">
          Você tem R$ 2.000 para investir. Onde aplicar para obter o melhor retorno real protegido de golpes?
        </p>
      </div>

      <div className="space-y-2">
        <div className="bg-white p-3 rounded-xl border border-stone-200">
          <div className="flex justify-between">
            <span className="font-bold text-stone-800">1. Maquinário / Freezer Novo (Negócio)</span>
            <span className="font-mono text-emerald-700 font-bold">R$ {allocation.freezer}</span>
          </div>
          <p className="text-[10px] text-stone-500">Payback de 5 meses; gera economia diária de R$ 240/mês.</p>
        </div>

        <div className="bg-white p-3 rounded-xl border border-stone-200">
          <div className="flex justify-between">
            <span className="font-bold text-stone-800">2. Tesouro Selic 13,75% (Liquidez Diária)</span>
            <span className="font-mono text-amber-700 font-bold">R$ {allocation.tesouro}</span>
          </div>
          <p className="text-[10px] text-stone-500">Reserva de emergência; rentabilidade real de 8,1% acima da inflação.</p>
        </div>

        <div className="bg-rose-50 p-3 rounded-xl border border-rose-200">
          <div className="flex justify-between">
            <span className="font-bold text-rose-900">3. "Robô do Pix" no WhatsApp (Pirâmide)</span>
            <span className="font-mono text-rose-700 font-bold">R$ {allocation.scam}</span>
          </div>
          <p className="text-[10px] text-rose-600">Promessa de 5% ao dia. 100% de probabilidade de golpe e perda do dinheiro!</p>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 10. OFICINA PAINEL DO NEGÓCIO (Estação 10 - Indicadores)
// ----------------------------------------------------
function OficinaIndicadores({ businessState }) {
  return (
    <div className="space-y-4 text-xs">
      <div className="bg-amber-100 border border-amber-300 p-3 rounded-2xl">
        <h4 className="font-bold text-amber-900 text-sm">Oficina: O Semáforo do Negócio</h4>
        <p className="text-stone-700 mt-1">
          Os 4 indicadores vitais do seu estabelecimento em tempo real:
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-2xl text-center">
          <div className="text-lg">🟢</div>
          <span className="text-[10px] text-emerald-800 font-semibold uppercase">Margem de Contribuição</span>
          <div className="text-base font-bold font-mono text-emerald-900 mt-1">44%</div>
          <span className="text-[9px] text-emerald-700">Saudável (&gt; 35%)</span>
        </div>

        <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-2xl text-center">
          <div className="text-lg">🟢</div>
          <span className="text-[10px] text-emerald-800 font-semibold uppercase">Ponto de Equilíbrio</span>
          <div className="text-base font-bold font-mono text-emerald-900 mt-1">Dia 16</div>
          <span className="text-[9px] text-emerald-700">Atingido a cada mês</span>
        </div>

        <div className="bg-amber-50 border border-amber-300 p-3 rounded-2xl text-center">
          <div className="text-lg">🟡</div>
          <span className="text-[10px] text-amber-800 font-semibold uppercase">Giro de Estoque</span>
          <div className="text-base font-bold font-mono text-amber-900 mt-1">18 dias</div>
          <span className="text-[9px] text-amber-700">Atenção a perecíveis</span>
        </div>

        <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-2xl text-center">
          <div className="text-lg">🟢</div>
          <span className="text-[10px] text-emerald-800 font-semibold uppercase">Liquidez Corrente</span>
          <div className="text-base font-bold font-mono text-emerald-900 mt-1">1,65</div>
          <span className="text-[9px] text-emerald-700">Capacidade de honrar dívidas</span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 11. OFICINA DIA DA FISCALIZAÇÃO (Estação 11 - Compliance)
// ----------------------------------------------------
function OficinaCompliance({ businessState, onUpdateCash, onRewardCajus }) {
  const [checked, setChecked] = useState({});

  const items = [
    { id: 1, title: 'CNPJ MEI Ativo & DAS pago em dia', points: 30 },
    { id: 2, title: 'Álcool 70%, toucas e aventais na cozinha', points: 25 },
    { id: 3, title: 'Extintor de incêndio com lacre válido', points: 20 },
    { id: 4, title: 'Tabela de preços visível ao consumidor', points: 25 },
  ];

  const handleToggle = (id) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const totalScore = items.filter(it => checked[it.id]).reduce((acc, it) => acc + it.points, 0);

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-amber-100 border border-amber-300 p-3 rounded-2xl">
        <h4 className="font-bold text-amber-900 text-sm">Oficina: Checklist de Fiscalização</h4>
        <p className="text-stone-700 mt-1">
          A fiscalização chegou de surpresa na rua. Marque os itens em dia para calcular sua pontuação de compliance!
        </p>
      </div>

      <div className="space-y-2">
        {items.map(it => (
          <div 
            key={it.id} 
            onClick={() => handleToggle(it.id)}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              checked[it.id] ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-stone-200'
            }`}
          >
            <span className="font-semibold text-stone-800">{it.title}</span>
            <div className={`w-5 h-5 rounded-md flex items-center justify-center border font-bold text-xs ${
              checked[it.id] ? 'bg-emerald-600 text-white border-emerald-700' : 'border-stone-300'
            }`}>
              {checked[it.id] && '✓'}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-stone-900 text-amber-50 p-3 rounded-2xl flex items-center justify-between">
        <div>
          <span className="text-stone-400 text-[10px]">Pontuação de Compliance:</span>
          <div className="text-lg font-bold text-amber-400">{totalScore} / 100 pontos</div>
        </div>
        <div className="text-[11px] font-bold">
          {totalScore === 100 ? '🏆 100% Regular!' : totalScore >= 70 ? '👍 Risco Baixo' : '⚠️ Risco de Multa'}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 12. OFICINA MATRIZ DA SECA (Estação 12 - Riscos)
// ----------------------------------------------------
function OficinaRiscos({ businessState }) {
  return (
    <div className="space-y-4 text-xs">
      <div className="bg-amber-100 border border-amber-300 p-3 rounded-2xl">
        <h4 className="font-bold text-amber-900 text-sm">Oficina: A Matriz de Riscos 3x3</h4>
        <p className="text-stone-700 mt-1">
          Posicionamento dos principais riscos climáticos e econômicos do Cariri:
        </p>
      </div>

      <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
        <div className="bg-amber-100/60 p-2 rounded-lg border border-amber-200">
          <span className="font-bold text-stone-700">Médio</span>
          <p className="text-[9px] text-stone-500 mt-1">Alta do gás</p>
        </div>
        <div className="bg-rose-100 p-2 rounded-lg border border-rose-300 font-bold text-rose-800">
          <span>Alto</span>
          <p className="text-[9px] text-rose-700 mt-1">Estiagem / Seca</p>
        </div>
        <div className="bg-rose-200 p-2 rounded-lg border border-rose-400 font-bold text-rose-950">
          <span>Crítico</span>
          <p className="text-[9px] text-rose-900 mt-1">Fornecedor único falhar</p>
        </div>

        <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-200">
          <span className="font-bold text-emerald-800">Baixo</span>
          <p className="text-[9px] text-stone-500 mt-1">Falta de troco</p>
        </div>
        <div className="bg-amber-50 p-2 rounded-lg border border-amber-200">
          <span className="font-bold text-amber-800">Médio</span>
          <p className="text-[9px] text-stone-500 mt-1">Golpe do Pix falso</p>
        </div>
        <div className="bg-rose-100 p-2 rounded-lg border border-rose-300 font-bold text-rose-800">
          <span>Alto</span>
          <p className="text-[9px] text-rose-700 mt-1">Cliente devendo fiado alto</p>
        </div>
      </div>
    </div>
  );
}
