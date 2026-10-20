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
  ChevronLeft,
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
      <div className="bg-amber-100/95 border border-amber-300 rounded-2xl p-3.5 shadow-sm text-stone-800 transition-all">
        {/* Top bar with title, month and pagination */}
        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-amber-200/80">
          <div className="flex items-center gap-1.5 min-w-0">
            <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-amber-950">Calendário Sazonal do Cariri</span>
              <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full border border-amber-400/50 font-bold whitespace-nowrap">
                📅 {activeSeason.month}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[10px] text-amber-900/80 font-bold mr-0.5">
              {selectedSeasonIdx + 1}/{SEASONAL_EVENTS.length}
            </span>
            <button
              onClick={() => setSelectedSeasonIdx((prev) => (prev - 1 + SEASONAL_EVENTS.length) % SEASONAL_EVENTS.length)}
              className="p-1 rounded-lg bg-amber-200/90 hover:bg-amber-300 active:scale-95 text-amber-950 font-bold transition-all"
              title="Evento anterior"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setSelectedSeasonIdx((prev) => (prev + 1) % SEASONAL_EVENTS.length)}
              className="p-1 rounded-lg bg-amber-200/90 hover:bg-amber-300 active:scale-95 text-amber-950 font-bold transition-all"
              title="Próximo evento"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-amber-50/90 rounded-xl p-3 border border-amber-200/80 space-y-2">
          {/* Header of the event */}
          <div className="flex items-start gap-2.5">
            <span className="text-2xl sm:text-3xl shrink-0 select-none">{activeSeason.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <h4 className="text-xs sm:text-sm font-extrabold text-stone-900 leading-snug">
                  {activeSeason.name}
                </h4>
                <span className="text-[10px] font-semibold bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded-md">
                  📍 {activeSeason.city}
                </span>
              </div>
            </div>
          </div>

          {/* Full description without clipping */}
          <div className="text-xs text-stone-800 leading-relaxed font-medium">
            <span className="font-bold text-amber-950">Efeito no Negócio: </span>
            {activeSeason.effectDescription}
          </div>

          {/* Cultural Story / Causo contextual */}
          {activeSeason.story && (
            <div className="text-[11px] text-amber-900 italic bg-amber-100/70 p-2 rounded-lg border-l-2 border-amber-500 leading-relaxed">
              "{activeSeason.story}"
            </div>
          )}

          {/* Badges footer */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px]">
            {activeSeason.demandMultiplier && activeSeason.demandMultiplier !== 1.0 && (
              <span className={`px-2 py-0.5 rounded-md font-bold ${
                activeSeason.demandMultiplier > 1 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}>
                {activeSeason.demandMultiplier > 1 ? '📈 Demanda: +' : '📉 Demanda: '}
                {Math.round((activeSeason.demandMultiplier - 1) * 100)}%
              </span>
            )}
            {activeSeason.workingCapitalImpact && (
              <span className={`px-2 py-0.5 rounded-md font-semibold ${
                activeSeason.workingCapitalImpact === 'critical' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                activeSeason.workingCapitalImpact === 'high' ? 'bg-amber-200 text-amber-900 border border-amber-300' :
                'bg-stone-200 text-stone-800'
              }`}>
                Capital de Giro: {
                  activeSeason.workingCapitalImpact === 'critical' ? 'Crítico ⚠️' :
                  activeSeason.workingCapitalImpact === 'high' ? 'Alto ⚡' :
                  activeSeason.workingCapitalImpact === 'medium' ? 'Médio' : 'Baixo'
                }
              </span>
            )}
            {activeSeason.contentReinforced && (
              <span className="text-stone-600 font-medium">
                💡 {activeSeason.contentReinforced}
              </span>
            )}
          </div>
        </div>

        {/* Indicator dots for quick navigation */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {SEASONAL_EVENTS.map((ev, idx) => (
            <button
              key={ev.id}
              onClick={() => setSelectedSeasonIdx(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === selectedSeasonIdx 
                  ? 'w-5 bg-amber-700' 
                  : 'w-1.5 bg-amber-300 hover:bg-amber-400'
              }`}
              title={ev.name}
            />
          ))}
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
                  <h3 className="text-sm font-bold text-stone-900 leading-snug">
                    {stage.title}
                  </h3>
                  <p className="text-[11px] text-stone-500 leading-tight mt-0.5">
                    {stage.stationName}
                  </p>
                </div>

                {/* Badges Earned */}
                <div className="flex items-center gap-1 shrink-0">
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
              <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] gap-2">
                <span className="text-stone-500 italic flex-1">
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
