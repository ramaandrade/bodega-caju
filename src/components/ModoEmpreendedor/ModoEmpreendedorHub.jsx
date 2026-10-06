import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  CheckCircle, 
  MessageCircle, 
  QrCode, 
  Share2, 
  Calculator, 
  FileText,
  DollarSign,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function ModoEmpreendedorHub({ gameState, onUpdateState }) {
  const [activeTab, setActiveTab] = useState('caderninho'); // 'caderninho' | 'fiado' | 'markup' | 'ficha'

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-stone-900 text-white p-4 rounded-3xl border border-emerald-600/40 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
          <span>Modo Empreendedor · Ferramentas Reais</span>
        </div>
        <h1 className="text-lg font-black text-amber-100">
          O Balcão da sua Bodega
        </h1>
        <p className="text-xs text-stone-300 mt-1">
          Instrumentos práticos de bolso para controlar caixa, fiado, preços e receitas no seu negócio real.
        </p>

        {/* Tab selector */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar mt-3 pt-2 border-t border-emerald-800/60">
          <button
            onClick={() => setActiveTab('caderninho')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'caderninho' ? 'bg-emerald-500 text-stone-950 shadow' : 'bg-stone-800 text-stone-300'
            }`}
          >
            📒 Caderninho Digital
          </button>
          <button
            onClick={() => setActiveTab('fiado')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'fiado' ? 'bg-emerald-500 text-stone-950 shadow' : 'bg-stone-800 text-stone-300'
            }`}
          >
            📋 Caderninho do Fiado
          </button>
          <button
            onClick={() => setActiveTab('markup')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'markup' ? 'bg-emerald-500 text-stone-950 shadow' : 'bg-stone-800 text-stone-300'
            }`}
          >
            🏷️ Calculadora de Preço
          </button>
          <button
            onClick={() => setActiveTab('ficha')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'ficha' ? 'bg-emerald-500 text-stone-950 shadow' : 'bg-stone-800 text-stone-300'
            }`}
          >
            🍲 Ficha Técnica
          </button>
        </div>
      </div>

      {/* View router */}
      {activeTab === 'caderninho' && <CaderninhoDigital gameState={gameState} onUpdateState={onUpdateState} />}
      {activeTab === 'fiado' && <CaderninhoFiado gameState={gameState} onUpdateState={onUpdateState} />}
      {activeTab === 'markup' && <CalculadoraBalcao />}
      {activeTab === 'ficha' && <FichaTecnicaReal gameState={gameState} onUpdateState={onUpdateState} />}
    </div>
  );
}

// ----------------------------------------------------
// CADERNINHO DIGITAL DE ENTRADAS E SAÍDAS
// ----------------------------------------------------
function CaderninhoDigital({ gameState, onUpdateState }) {
  const transactions = gameState.caderninho || [];
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('in'); // 'in' | 'out'
  const [cat, setCat] = useState('Vendas');

  const totalIn = transactions.filter(t => t.type === 'in').reduce((s, t) => s + t.amount, 0);
  const totalOut = transactions.filter(t => t.type === 'out').reduce((s, t) => s + t.amount, 0);
  const netBalance = totalIn - totalOut;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!desc || !amount) return;
    const newTx = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      desc,
      amount: parseFloat(amount),
      type,
      cat
    };
    onUpdateState({
      caderninho: [newTx, ...transactions]
    });
    setDesc('');
    setAmount('');
  };

  const handleDelete = (id) => {
    onUpdateState({
      caderninho: transactions.filter(t => t.id !== id)
    });
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Balance Summary Cards */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-2xl">
          <span className="text-[10px] text-emerald-800 font-bold uppercase">Entradas</span>
          <div className="text-sm font-black text-emerald-700 font-mono mt-0.5">
            R$ {totalIn.toFixed(2)}
          </div>
        </div>
        <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-2xl">
          <span className="text-[10px] text-rose-800 font-bold uppercase">Saídas</span>
          <div className="text-sm font-black text-rose-700 font-mono mt-0.5">
            R$ {totalOut.toFixed(2)}
          </div>
        </div>
        <div className="bg-stone-900 text-amber-50 p-2.5 rounded-2xl border border-stone-800">
          <span className="text-[10px] text-amber-400 font-bold uppercase">Saldo Líquido</span>
          <div className={`text-sm font-black font-mono mt-0.5 ${netBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            R$ {netBalance.toFixed(2)}
          </div>
        </div>
      </div>

      {/* New Transaction Form */}
      <form onSubmit={handleAdd} className="bg-white border border-stone-200 p-3.5 rounded-2xl shadow-sm space-y-2">
        <span className="font-bold text-stone-900 text-xs">Nova Movimentação no Caixa</span>
        
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Descrição (ex: Venda no balcão)"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="flex-1 p-2 border border-stone-300 rounded-xl text-xs"
          />
          <input
            type="number"
            step="0.01"
            placeholder="R$ 0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-24 p-2 border border-stone-300 rounded-xl text-xs font-mono font-bold"
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setType('in')}
              className={`px-3 py-1 rounded-lg font-bold text-xs ${
                type === 'in' ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600'
              }`}
            >
              + Entrada
            </button>
            <button
              type="button"
              onClick={() => setType('out')}
              className={`px-3 py-1 rounded-lg font-bold text-xs ${
                type === 'out' ? 'bg-rose-600 text-white' : 'bg-stone-100 text-stone-600'
              }`}
            >
              − Saída
            </button>
          </div>

          <button
            type="submit"
            className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow"
          >
            Lançar Registro
          </button>
        </div>
      </form>

      {/* Transactions List */}
      <div className="space-y-1.5">
        <h4 className="font-bold text-stone-600 text-[11px] uppercase tracking-wider">Histórico Recente</h4>
        {transactions.length === 0 ? (
          <div className="p-6 bg-white border border-stone-200 rounded-2xl text-center text-stone-400">
            Nenhuma movimentação lançada ainda.
          </div>
        ) : (
          transactions.map(t => (
            <div key={t.id} className="bg-white border border-stone-200 p-2.5 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-semibold text-stone-900">{t.desc}</div>
                <div className="text-[10px] text-stone-400">{t.date} · {t.cat || 'Geral'}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-mono font-bold ${t.type === 'in' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {t.type === 'in' ? '+' : '−'} R$ {t.amount.toFixed(2)}
                </span>
                <button onClick={() => handleDelete(t.id)} className="text-stone-300 hover:text-rose-500 p-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// CADERNINHO DO FIADO (Com lembrete Pix no WhatsApp!)
// ----------------------------------------------------
function CaderninhoFiado({ gameState, onUpdateState }) {
  const fiado = gameState.fiado || [];
  const [client, setClient] = useState('');
  const [val, setVal] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [phone, setPhone] = useState('');

  const totalFiado = fiado.filter(f => f.status === 'pendente').reduce((s, f) => s + f.value, 0);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!client || !val) return;
    const newEntry = {
      id: Date.now(),
      client,
      value: parseFloat(val),
      dueDate: dueDate || new Date().toISOString().slice(0, 10),
      phone,
      status: 'pendente'
    };
    onUpdateState({
      fiado: [newEntry, ...fiado]
    });
    setClient('');
    setVal('');
    setPhone('');
  };

  const handlePay = (id) => {
    onUpdateState({
      fiado: fiado.map(f => f.id === id ? { ...f, status: 'pago' } : f)
    });
    confetti({ particleCount: 30 });
  };

  const generateWhatsAppMessage = (item) => {
    const text = encodeURIComponent(
      `Olá, ${item.client}! Passando com carinho para lembrar da nossa caderneta na bodega (R$ ${item.value.toFixed(2)} com vencimento em ${item.dueDate}). Se preferir pagar via Pix para facilitar, nossa chave é o nosso CNPJ/Celular! Muito obrigado pela parceria!`
    );
    window.open(`https://wa.me/55${item.phone}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-amber-50 border border-amber-300 p-3 rounded-2xl flex justify-between items-center">
        <div>
          <span className="text-[10px] uppercase font-bold text-amber-800">Total a Receber no Fiado:</span>
          <div className="text-lg font-black text-amber-900 font-mono">
            R$ {totalFiado.toFixed(2)}
          </div>
        </div>
        <div className="text-[11px] text-stone-600 max-w-[160px] text-right">
          Cobrança amigável via Pix reduz o atraso em até 70%!
        </div>
      </div>

      {/* Form novo fiado */}
      <form onSubmit={handleAdd} className="bg-white border border-stone-200 p-3 rounded-2xl space-y-2 shadow-sm">
        <span className="font-bold text-stone-900">Novo Registro de Fiado</span>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Nome do Cliente"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="p-2 border rounded-xl"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Valor R$"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="p-2 border rounded-xl font-mono font-bold"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="p-2 border rounded-xl"
          />
          <input
            type="text"
            placeholder="WhatsApp (com DDD)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-2 border rounded-xl"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow"
        >
          Salvar na Caderneta
        </button>
      </form>

      {/* Lista fiado */}
      <div className="space-y-2">
        {fiado.map(f => (
          <div 
            key={f.id} 
            className={`p-3 rounded-2xl border flex items-center justify-between gap-2 ${
              f.status === 'pago' ? 'bg-stone-50 border-stone-200 opacity-60' : 'bg-white border-amber-200 shadow-sm'
            }`}
          >
            <div>
              <div className="font-bold text-stone-900">{f.client}</div>
              <div className="text-[10px] text-stone-500">
                Vence em: {f.dueDate} · <span className="font-mono font-bold text-amber-700">R$ {f.value.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {f.status === 'pendente' && (
                <>
                  <button
                    onClick={() => generateWhatsAppMessage(f)}
                    className="p-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold flex items-center gap-1"
                    title="Cobrar pelo WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Lembrete</span>
                  </button>
                  <button
                    onClick={() => handlePay(f.id)}
                    className="p-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold"
                  >
                    Recebido ✓
                  </button>
                </>
              )}
              {f.status === 'pago' && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Quitado
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// CALCULADORA DE PREÇO RÁPIDA DE BALCÃO
// ----------------------------------------------------
function CalculadoraBalcao() {
  const [cost, setCost] = useState(10);
  const [margin, setMargin] = useState(25);
  const [taxes, setTaxes] = useState(10);

  const denominator = 1 - (margin + taxes) / 100;
  const price = denominator > 0 ? cost / denominator : 0;

  return (
    <div className="bg-white border border-stone-200 p-4 rounded-3xl shadow-sm space-y-3 text-xs">
      <h3 className="font-bold text-stone-900 text-sm">Calculadora de Markup do Balcão</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span>Custo do Produto (Insumos/Compra):</span>
          <input 
            type="number" 
            value={cost} 
            onChange={(e) => setCost(Number(e.target.value))}
            className="w-20 p-1.5 border rounded-xl text-right font-bold"
          />
        </div>

        <div className="flex justify-between items-center">
          <span>Taxas (Maquininha + Imposto %):</span>
          <input 
            type="number" 
            value={taxes} 
            onChange={(e) => setTaxes(Number(e.target.value))}
            className="w-20 p-1.5 border rounded-xl text-right font-bold"
          />
        </div>

        <div className="flex justify-between items-center">
          <span>Sua Margem de Lucro (%):</span>
          <input 
            type="number" 
            value={margin} 
            onChange={(e) => setMargin(Number(e.target.value))}
            className="w-20 p-1.5 border rounded-xl text-right font-bold text-amber-700"
          />
        </div>
      </div>

      <div className="bg-stone-900 text-amber-50 p-4 rounded-2xl text-center space-y-1">
        <span className="text-[10px] uppercase font-bold text-stone-400">Preço Calculado para Vender:</span>
        <div className="text-2xl font-black font-mono text-amber-400">
          R$ {price.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// FICHA TÉCNICA REAL
// ----------------------------------------------------
function FichaTecnicaReal({ gameState, onUpdateState }) {
  const recipes = gameState.recipes || [];
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [cva, setCva] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !cva) return;
    const newRecipe = {
      id: Date.now(),
      name,
      ingredients,
      cva: parseFloat(cva),
      suggestedPrice: parseFloat(price) || (parseFloat(cva) * 1.8)
    };
    onUpdateState({
      recipes: [...recipes, newRecipe]
    });
    setName('');
    setIngredients('');
    setCva('');
    setPrice('');
  };

  return (
    <div className="space-y-4 text-xs">
      <form onSubmit={handleAdd} className="bg-white border border-stone-200 p-3.5 rounded-2xl space-y-2 shadow-sm">
        <h4 className="font-bold text-stone-900">Cadastrar Nova Ficha Técnica</h4>
        <input
          type="text"
          placeholder="Nome do Prato/Produto (ex: Buchada Tradicional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-xl"
        />
        <textarea
          rows={2}
          placeholder="Ingredientes e porções (ex: 200g carne, 100g arroz, 1 embalagem)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full p-2 border rounded-xl"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            step="0.01"
            placeholder="Custo Variável R$"
            value={cva}
            onChange={(e) => setCva(e.target.value)}
            className="p-2 border rounded-xl font-mono font-bold"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Preço Venda R$"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 border rounded-xl font-mono font-bold"
          />
        </div>
        <button type="submit" className="w-full py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl shadow">
          Salvar Ficha Técnica
        </button>
      </form>

      <div className="space-y-2">
        {recipes.map(r => (
          <div key={r.id} className="bg-white border border-stone-200 p-3 rounded-2xl shadow-sm space-y-1.5">
            <div className="flex justify-between items-start">
              <h5 className="font-bold text-sm text-stone-900">{r.name}</h5>
              <span className="font-mono font-bold text-emerald-700">R$ {r.suggestedPrice.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-stone-600">{r.ingredients}</p>
            <div className="pt-1 border-t border-stone-100 flex justify-between text-[10px] text-stone-500">
              <span>Custo Produção: R$ {r.cva.toFixed(2)}</span>
              <span className="font-bold text-amber-700">
                Margem: R$ {(r.suggestedPrice - r.cva).toFixed(2)} (
                {Math.round(((r.suggestedPrice - r.cva) / r.suggestedPrice) * 100)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
