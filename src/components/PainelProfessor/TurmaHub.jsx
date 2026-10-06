import React, { useState } from 'react';
import { 
  Users, 
  BarChart3, 
  Download, 
  HeartHandshake, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function TurmaHub({ gameState }) {
  const [activeTab, setActiveTab] = useState('painel'); // 'painel' | 'grupo' | 'matriz'

  // Simulated Class Data for URCA
  const mockStudents = [
    { name: 'Ana Beatriz', business: 'Marmitaria', stagesDone: 11, avgQuiz: 92, status: 'Adiantada', badges: '11/12' },
    { name: 'Carlos Eduardo', business: 'Bodega da Vila', stagesDone: 8, avgQuiz: 80, status: 'No Ritmo', badges: '8/12' },
    { name: 'Débora Lima', business: 'Barraca Romaria', stagesDone: 4, avgQuiz: 65, status: 'Em Risco', badges: '4/12' },
    { name: 'Francisco Alves', business: 'Banca na Feira', stagesDone: 9, avgQuiz: 84, status: 'No Ritmo', badges: '9/12' },
    { name: 'Gisele Sousa', business: 'Ateliê Couro', stagesDone: 12, avgQuiz: 96, status: 'Concluído 🏆', badges: '12/12' },
    { name: 'Igor Ferreira', business: 'Marmitaria', stagesDone: 3, avgQuiz: 58, status: 'Em Risco', badges: '3/12' }
  ];

  const hardestQuestions = [
    { topic: 'Estação 6: Markup Divisor com taxas variáveis', errorRate: '42%' },
    { topic: 'Estação 7: Ciclo Financeiro Negativo', errorRate: '38%' },
    { topic: 'Estação 8: Custo Efetivo Total (CET)', errorRate: '35%' },
    { topic: 'Estação 10: Ponto de Equilíbrio em R$', errorRate: '31%' }
  ];

  // Export CSV Handler
  const handleExportCSV = () => {
    const headers = "Nome Anonimizado,Negocio Ficticio,Estacoes Concluidas,Media Quiz,Status\n";
    const rows = mockStudents.map((s, idx) => `Estudante_${idx+1},${s.business},${s.stagesDone},${s.avgQuiz}%,${s.status}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bodega_caju_turma_urca_pesquisa_${Date.now()}.csv`;
    a.click();
    confetti({ particleCount: 40 });
  };

  return (
    <div className="space-y-4 pb-20 text-xs">
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-900 to-amber-950 text-amber-50 p-4 rounded-3xl border border-amber-600/40 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-[11px] mb-1">
          <Users className="w-4 h-4" />
          <span>Turma: Economia URCA 2026 · Cariri</span>
        </div>
        <h1 className="text-base font-extrabold text-white">
          Painel Docente & Comunidade Solidária
        </h1>
        <p className="text-[11px] text-stone-300 mt-1">
          Monitoramento pedagógico da turma, aval solidário e dados para pesquisa científica (TCC/Extensão).
        </p>

        {/* Tab selector */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar mt-3 pt-2 border-t border-stone-800">
          <button
            onClick={() => setActiveTab('painel')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'painel' ? 'bg-amber-500 text-stone-950 shadow' : 'bg-stone-800 text-stone-300'
            }`}
          >
            📊 Painel da Turma
          </button>
          <button
            onClick={() => setActiveTab('grupo')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'grupo' ? 'bg-amber-500 text-stone-950 shadow' : 'bg-stone-800 text-stone-300'
            }`}
          >
            🤝 Aval Solidário
          </button>
          <button
            onClick={() => setActiveTab('matriz')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'matriz' ? 'bg-amber-500 text-stone-950 shadow' : 'bg-stone-800 text-stone-300'
            }`}
          >
            🗺️ Matriz Cariri
          </button>
        </div>
      </div>

      {/* VIEW 1: PAINEL DO PROFESSOR */}
      {activeTab === 'painel' && (
        <div className="space-y-4">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white border border-stone-200 p-2.5 rounded-2xl shadow-sm">
              <span className="text-[10px] text-stone-500 uppercase font-bold">Conclusão Média</span>
              <div className="text-base font-black text-amber-600 mt-0.5">78%</div>
            </div>
            <div className="bg-white border border-stone-200 p-2.5 rounded-2xl shadow-sm">
              <span className="text-[10px] text-stone-500 uppercase font-bold">Alunos em Risco</span>
              <div className="text-base font-black text-rose-600 mt-0.5">2 alunos</div>
            </div>
            <div className="bg-white border border-stone-200 p-2.5 rounded-2xl shadow-sm">
              <span className="text-[10px] text-stone-500 uppercase font-bold">Média Simulado</span>
              <div className="text-base font-black text-emerald-600 mt-0.5">82%</div>
            </div>
          </div>

          {/* Questões com Maior Erro */}
          <div className="bg-white border border-stone-200 rounded-2xl p-3.5 shadow-sm space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-stone-900">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Gargalos de Aprendizagem (Maior Índice de Erro):</span>
            </div>
            <div className="space-y-1.5">
              {hardestQuestions.map((q, i) => (
                <div key={i} className="flex justify-between items-center p-2 rounded-xl bg-stone-50 border border-stone-100">
                  <span className="text-stone-700">{q.topic}</span>
                  <span className="font-mono font-bold text-rose-600">{q.errorRate} erro</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lista de Alunos */}
          <div className="bg-white border border-stone-200 rounded-2xl p-3.5 shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-stone-900">Progresso dos Estudantes</h3>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-xl transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar CSV (Pesquisa)</span>
              </button>
            </div>

            <div className="space-y-2">
              {mockStudents.map((st, idx) => (
                <div key={idx} className="p-2.5 rounded-xl border border-stone-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-stone-900">{st.name}</div>
                    <div className="text-[10px] text-stone-500">{st.business} · {st.stagesDone}/12 estações</div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      st.status === 'Em Risco' ? 'bg-rose-100 text-rose-800' :
                      st.status === 'Concluído 🏆' ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {st.status}
                    </span>
                    <div className="text-[10px] text-stone-400 mt-0.5">{st.avgQuiz}% acertos</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: AVAL SOLIDÁRIO */}
      {activeTab === 'grupo' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-4 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="font-extrabold text-sm text-stone-900">Grupo Solidário: Sertão Produtivo</h3>
              <p className="text-[11px] text-stone-500">Inspirado no Crediamigo: a turma ajuda quem ficou para trás!</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl space-y-2">
            <span className="font-bold text-amber-900 text-xs">Meta Coletiva da Semana:</span>
            <p className="text-stone-700">"Todos os 5 integrantes do grupo com Selo de Prata na Estação 7 (Capital de Giro)."</p>
            
            <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full w-[80%]" />
            </div>
            <div className="flex justify-between text-[10px] text-stone-600 font-bold">
              <span>Progresso Atual: 4/5 membros</span>
              <span>80% concluído</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-stone-800">Enviar Dica / Aval para Colega:</span>
            <div className="p-3 rounded-2xl border border-stone-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-stone-900">Débora Lima (Travada na Estação 7)</span>
                <button
                  onClick={() => {
                    alert('Dica enviada com sucesso para Débora! Você ganhou +20 XP de Mentoria!');
                    confetti({ particleCount: 30 });
                  }}
                  className="px-3 py-1 bg-amber-600 text-white font-bold rounded-xl text-xs"
                >
                  Dar Aval / Dica
                </button>
              </div>
              <p className="text-[11px] text-stone-500">
                Avaliar um colega gera bônus de XP para todo o grupo solidário quando a meta é alcançada!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: MINI-MATRIZ INSTITUCIONAL DO CARIRI */}
      {activeTab === 'matriz' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-4 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="font-extrabold text-sm text-stone-900">Mini-Matriz Institucional da Turma</h3>
              <p className="text-[11px] text-stone-500">Dados reais consolidados das missões de campo por município:</p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="font-bold text-stone-900 text-xs">Crato (Feiras e Alimentação):</span>
              <p className="text-stone-600 text-[11px]">
                82% dos entrevistados usam Pix diariamente. Apenas 28% separam conta física de conta jurídica.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="font-bold text-stone-900 text-xs">Juazeiro do Norte (Romarias e Ambulantes):</span>
              <p className="text-stone-600 text-[11px]">
                Ciclo financeiro atinge 45 dias antes de setembro. 69% utilizam linhas de capital de giro solidário do Crediamigo.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="font-bold text-stone-900 text-xs">Barbalha & Nova Olinda (Artesanato e Mercearias):</span>
              <p className="text-stone-600 text-[11px]">
                O fiado em caderneta ainda representa cerca de 35% do faturamento nas bodegas de bairro.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
