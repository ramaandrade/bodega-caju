import React, { useState } from 'react';
import { 
  Lock, 
  Unlock,
  CheckCircle, 
  Star, 
  Sparkles, 
  Flame, 
  Award, 
  Calendar, 
  ChevronRight, 
  MapPin, 
  TrendingUp, 
  Info,
  KeyRound,
  ShieldCheck
} from 'lucide-react';
import { STAGES_DATA } from '../data/stages';
import { SEASONAL_EVENTS } from '../data/seasonalEvents';
import { isStageUnlocked } from '../utils/storage';

export function TrilhaMap({ gameState, onSelectStage, onOpenAdminPanel }) {
  const { gamification, businessState, admin } = gameState;
  const [selectedSeasonIdx, setSelectedSeasonIdx] = useState(0);
  const activeSeason = SEASONAL_EVENTS[selectedSeasonIdx];

  // calculate badge counts
  let bronzeCount = 0;
  let silverCount = 0;
  let goldCount = 0;

  Object.values(gamification?.badges || {}).forEach(b => {
    if (b.bronze) bronzeCount++;
    if (b.prata) silverCount++;
    if (b.ouro) goldCount++;
  });

  const totalUnlocked = STAGES_DATA.filter(s => isStageUnlocked(gameState, s.id)).length;

  return (
    <div className="space-y-4 pb-20">
      {/* Hero: A Trilha da Chapada & Vila Araripe */}
      <div className="bg-gradient-to-br from-amber-900 via-stone-900 to-stone-950 text-amber-50 rounded-3xl p-4 shadow-xl border border-amber-600/40 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Vila Araripe · Cariri Cearense</span>
            </div>
            <h1 className="text-xl font-extrabold text-amber-100 tracking-tight">
              A Trilha da Chapada
            </h1>
            <p className="text-xs text-stone-300 mt-1 max-w-[280px]">
              12 estações lúdicas para transformar sua bodega numa potência econômica do sertão!
            </p>
          </div>
          <div className="text-3xl animate-float">
            🌄
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-amber-300 font-semibold" title="Selos de Bronze">
              🥉 {bronzeCount}
            </span>
            <span className="flex items-center gap-1 text-slate-300 font-semibold" title="Selos de Prata (Desafio)">
              🥈 {silverCount}
            </span>
            <span className="flex items-center gap-1 text-yellow-400 font-semibold" title="Selos de Ouro (Missão de Campo)">
              🥇 {goldCount}
            </span>
          </div>

          <div className="text-[11px] font-bold text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-full border border-amber-500/30">
            {totalUnlocked} / 12 Liberadas
          </div>
        </div>
      </div>

      {/* Sazonalidade do Cariri Interactive Banner */}
      <div className="bg-amber-100/90 border border-amber-300 rounded-2xl p-3 shadow-sm text-stone-800">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
            <Calendar className="w-4 h-4 text-amber-700" />
            <span>Calendário Sazonal do Cariri: {activeSeason.month}</span>
          </div>
          <button 
            onClick={() => setSelectedSeasonIdx((prev) => (prev + 1) % SEASONAL_EVENTS.length)}
            className="text-[10px] font-bold text-amber-800 underline active:opacity-70"
          >
            Próximo Evento ↻
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl">{activeSeason.icon}</span>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-stone-900">{activeSeason.name} ({activeSeason.city})</h4>
            <p className="text-[11px] text-stone-600 line-clamp-1">{activeSeason.effectDescription}</p>
          </div>
        </div>
      </div>

      {/* 12 Stations Road / Trail */}
      <div className="space-y-3">
        {/* Header com Botão do Administrador */}
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Estações da Trilha
            </h2>
            <span className="text-[10px] text-stone-500 font-medium">
              {admin?.allUnlocked ? 'Todas liberadas pelo Admin' : 'Acesso independente'}
            </span>
          </div>

          {/* Botão de Liberação pelo Administrador */}
          <button
            onClick={onOpenAdminPanel}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 text-[11px] font-bold shadow-sm active:scale-95 transition-all border border-amber-600/40"
            title="Disponibilizar estações com a senha do administrador"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>Admin (Liberar)</span>
          </button>
        </div>

        {STAGES_DATA.map((stage) => {
          const isUnlocked = isStageUnlocked(gameState, stage.id);
          const badge = gamification?.badges?.[stage.id] || {};
          const isCompleted = badge.bronze;
          const isAdminUnlocked = admin?.allUnlocked || admin?.unlockedStages?.includes(stage.id);

          return (
            <div
              key={stage.id}
              onClick={() => {
                if (isUnlocked) {
                  onSelectStage(stage.id);
                } else {
                  onOpenAdminPanel();
                }
              }}
              className={`rounded-2xl p-3.5 transition-all border shadow-sm relative overflow-hidden ${
                !isUnlocked
                  ? 'bg-stone-100 border-stone-200 opacity-60 cursor-pointer hover:opacity-80'
                  : isCompleted
                  ? 'bg-white border-emerald-300/80 hover:border-emerald-500 cursor-pointer hover:shadow-md'
                  : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300 hover:border-amber-500 cursor-pointer hover:shadow-md ring-2 ring-amber-400/30'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Station Icon / Step Circle */}
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-lg font-bold shadow-inner ${
                  !isUnlocked
                    ? 'bg-stone-200 text-stone-400'
                    : isCompleted
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-amber-500/30'
                }`}>
                  {!isUnlocked ? <Lock className="w-4 h-4 text-stone-400" /> : stage.icon}
                </div>

                {/* Station Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black tracking-wider uppercase text-amber-800">
                      Estação {stage.id}
                    </span>
                    {stage.id >= 3 && stage.id <= 10 && stage.id !== 4 && (
                      <span className="text-[9px] bg-red-100 text-red-800 px-1.5 py-0.2 rounded font-bold">
                        Av2
                      </span>
                    )}
                    {isAdminUnlocked && !isCompleted && (
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                        Liberada 🔓
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-stone-900 truncate">
                    {stage.title}
                  </h3>
                  <p className="text-[11px] text-stone-500 truncate">
                    {stage.stationName}
                  </p>
                </div>

                {/* Badges Earned */}
                <div className="flex items-center gap-1">
                  {badge.bronze && <span title="Selo Bronze Conquistado">🥉</span>}
                  {badge.prata && <span title="Selo Prata: Desafio Superado">🥈</span>}
                  {badge.ouro && <span title="Selo Ouro: Missão de Campo Validada">🥇</span>}
                  
                  {isUnlocked ? (
                    <ChevronRight className="w-5 h-5 text-stone-400" />
                  ) : (
                    <KeyRound className="w-4 h-4 text-stone-400" title="Bloqueada pelo Admin" />
                  )}
                </div>
              </div>

              {/* Learning preview pill */}
              <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                <span className="text-stone-500 italic truncate max-w-[220px]">
                  Oficina: {stage.selo.name}
                </span>
                <span className={`font-semibold ${
                  isCompleted 
                    ? 'text-emerald-700' 
                    : isUnlocked 
                    ? 'text-amber-700' 
                    : 'text-stone-400'
                }`}>
                  {isCompleted ? 'Concluída ✓' : isUnlocked ? 'Disponível ▶' : 'Requer Senha 🔒'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
