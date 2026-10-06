import React, { useState } from 'react';
import { 
  Coins, 
  Wallet, 
  Award, 
  HelpCircle, 
  Calculator, 
  Sparkles, 
  Settings, 
  Volume2, 
  VolumeX, 
  TrendingUp,
  Store,
  RotateCcw
} from 'lucide-react';
import { getPlayerLevel } from '../utils/storage';

export function Navbar({ 
  gameState, 
  onOpenCalculator, 
  onOpenGlossary, 
  onToggleAudio, 
  onToggleContrast,
  onToggleFontSize,
  onResetGame
}) {
  const { businessState, gamification, profile, settings } = gameState;
  const currentLevel = getPlayerLevel(gamification.xp);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md text-amber-50 border-b border-amber-900/40 px-3 py-2 shadow-md">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        {/* Left: App Brand & Business icon */}
        <div 
          onClick={() => setShowProfileModal(true)}
          className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-lg shadow-inner border border-amber-300/40">
            🌰
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-wider text-amber-400 uppercase">
              Bodega CAJU
            </span>
            <span className="text-[11px] font-semibold text-stone-300 truncate max-w-[100px]">
              {businessState.name}
            </span>
          </div>
        </div>

        {/* Center: Live Economic HUD */}
        <div className="flex items-center gap-2 bg-stone-800/90 px-2 py-1 rounded-xl border border-stone-700/60 shadow-sm text-xs">
          {/* Caixa do Negócio */}
          <div className="flex items-center gap-1 font-mono font-bold" title="Caixa do Negócio">
            <Wallet className="w-3.5 h-3.5 text-emerald-400" />
            <span className={businessState.cash >= 0 ? "text-emerald-300" : "text-rose-400"}>
              R$ {businessState.cash.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </span>
          </div>

          <div className="w-px h-3 bg-stone-700" />

          {/* Cajus (Moeda do Jogo) */}
          <div className="flex items-center gap-1 font-bold text-amber-400" title="Cajus de Recompensa">
            <Coins className="w-3.5 h-3.5" />
            <span>{gamification.cajus}</span>
          </div>

          <div className="w-px h-3 bg-stone-700" />

          {/* Nível do Jogador */}
          <div className="flex items-center gap-1 font-semibold text-stone-200" title={`Nível: ${currentLevel.title}`}>
            <span>{currentLevel.icon}</span>
            <span className="hidden sm:inline text-[10px] text-amber-200">{currentLevel.title}</span>
          </div>
        </div>

        {/* Right: Quick Tool Action Buttons */}
        <div className="flex items-center gap-1">
          {/* Botão Reiniciar em qualquer momento */}
          <button 
            onClick={() => setShowResetConfirmModal(true)}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-950/70 text-stone-300 hover:text-rose-300 active:scale-90 transition-transform"
            title="Reiniciar a Jornada a qualquer momento"
            aria-label="Reiniciar a Bodega"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Calculadora embutida */}
          <button 
            onClick={onOpenCalculator}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 active:scale-90 transition-transform"
            title="Calculadora Financeira"
            aria-label="Abrir Calculadora"
          >
            <Calculator className="w-4 h-4" />
          </button>

          {/* Glossário rápido */}
          <button 
            onClick={onOpenGlossary}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 active:scale-90 transition-transform"
            title="Glossário CAJU e Fórmulas"
            aria-label="Abrir Glossário"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Audio TTS Toggle */}
          <button 
            onClick={onToggleAudio}
            className={`p-1.5 rounded-lg active:scale-90 transition-transform ${
              settings.audioSpeech ? 'bg-amber-600/30 text-amber-300' : 'bg-stone-800 text-stone-400'
            }`}
            title={settings.audioSpeech ? "Áudio dos Causos Ativado" : "Áudio Desativado"}
          >
            {settings.audioSpeech ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Modal de Confirmação para Reiniciar */}
      {showResetConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-rose-500/50 rounded-3xl max-w-sm w-full p-5 text-stone-100 shadow-2xl animate-in zoom-in-95 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 text-xl shadow-inner">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">Reiniciar a Bodega?</h3>
                <span className="text-[11px] text-stone-400">Recomeçar sua história em Vila Araripe</span>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed bg-stone-950/60 p-3 rounded-2xl border border-stone-800">
              Você pode reiniciar a qualquer momento para <b>escolher outro negócio</b> (Marmitaria, Romaria, Couro, Bodega ou Feira), redefinir o caixa e recomeçar as estações do zero.
            </p>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setShowResetConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs active:scale-95 transition-all"
              >
                Continuar Jogando
              </button>
              <button
                onClick={() => {
                  setShowResetConfirmModal(false);
                  setShowProfileModal(false);
                  onResetGame();
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-xs shadow-lg active:scale-95 transition-all"
              >
                Sim, Reiniciar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Perfil Rápido */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-600/40 rounded-2xl max-w-sm w-full p-4 text-stone-100 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-amber-200">Painel do Jogador</h3>
              </div>
              <button 
                onClick={() => setShowProfileModal(false)}
                className="text-stone-400 hover:text-white text-lg font-bold px-2"
              >
                ✕
              </button>
            </div>

            <div className="py-3 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-800/60">
                <span className="text-stone-400">Negócio Atual:</span>
                <span className="font-bold text-amber-300">{businessState.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-800/60">
                <span className="text-stone-400">Responsável:</span>
                <span className="font-semibold text-white">{businessState.owner}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-800/60">
                <span className="text-stone-400">Ponto Comercial:</span>
                <span className="font-mono text-stone-200">{businessState.city || 'Cariri Cearense'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-800/60">
                <span className="text-stone-400">Graduação Atual:</span>
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  {currentLevel.icon} {currentLevel.title} ({gamification.xp} XP)
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-800/60">
                <span className="text-stone-400">Reputação Comunitária:</span>
                <span className="font-bold text-emerald-400">{businessState.reputation}%</span>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-stone-800 flex gap-2">
              <button 
                onClick={onToggleContrast}
                className="flex-1 py-1.5 px-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-[11px] font-semibold text-stone-200 text-center"
              >
                Alto Contraste
              </button>
              <button 
                onClick={onToggleFontSize}
                className="flex-1 py-1.5 px-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-[11px] font-semibold text-stone-200 text-center"
              >
                Fonte: {settings.fontSize === 'large' ? 'Grande' : 'Normal'}
              </button>
            </div>

            {/* Ação rápida para Reiniciar dentro do perfil */}
            <button
              onClick={() => {
                setShowProfileModal(false);
                setShowResetConfirmModal(true);
              }}
              className="w-full mt-3 py-2 px-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 hover:bg-rose-900/60 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Jornada / Trocar de Negócio</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
