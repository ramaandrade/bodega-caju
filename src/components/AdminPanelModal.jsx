import React, { useState } from 'react';
import { 
  KeyRound, 
  Lock, 
  Unlock, 
  Check, 
  X, 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  EyeOff,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { STAGES_DATA } from '../data/stages';

export const ADMIN_PASSWORD = '430798@R';

export function AdminPanelModal({ 
  isOpen, 
  onClose, 
  gameState, 
  onUpdateAdminStages 
}) {
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  // Unlocked stages from gameState
  const unlockedList = gameState.admin?.unlockedStages || [1];
  const allUnlocked = Boolean(gameState.admin?.allUnlocked);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput.trim() === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setErrorMessage('');
      confetti({ particleCount: 40, spread: 60 });
    } else {
      setErrorMessage('Senha incorreta! Digite a senha do administrador (430798@R).');
    }
  };

  const handleToggleStage = (stageId) => {
    let newList;
    if (unlockedList.includes(stageId)) {
      // Don't remove stage 1 as minimum
      newList = unlockedList.filter(id => id !== stageId);
      if (newList.length === 0) newList = [1];
    } else {
      newList = [...unlockedList, stageId];
    }

    onUpdateAdminStages({
      unlockedStages: newList,
      allUnlocked: false
    });
  };

  const handleUnlockAll = () => {
    const allIds = STAGES_DATA.map(s => s.id);
    onUpdateAdminStages({
      unlockedStages: allIds,
      allUnlocked: true
    });
    confetti({ particleCount: 70, spread: 80 });
  };

  const handleLockAllExceptFirst = () => {
    onUpdateAdminStages({
      unlockedStages: [1],
      allUnlocked: false
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in">
      <div className="bg-stone-900 border border-amber-600/50 rounded-3xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl text-stone-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-amber-200">
                Painel do Administrador
              </h2>
              <span className="text-[10px] text-stone-400">
                Liberação Independente das 12 Estações
              </span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Auth Screen or Control Panel */}
        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="p-5 space-y-4 text-xs">
            <div className="bg-amber-950/30 border border-amber-800/40 p-3.5 rounded-2xl text-stone-300 space-y-1">
              <span className="font-bold text-amber-300 block">Acesso Restrito ao Docente/Gestor</span>
              <p className="text-[11px] leading-relaxed">
                Digite a senha do administrador para liberar ou bloquear as estações de forma independente para os estudantes.
              </p>
            </div>

            <div>
              <label className="font-bold text-stone-300 block mb-1">
                Senha do Administrador:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite a senha..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white font-mono text-sm focus:outline-none focus:border-amber-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errorMessage && (
                <p className="text-rose-400 text-[11px] font-bold mt-1.5 animate-shake">
                  {errorMessage}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Autenticar e Acessar Controle</span>
            </button>
          </form>
        ) : (
          /* Authenticated Controls */
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {/* Quick Actions Bar */}
            <div className="bg-stone-950 p-3 rounded-2xl border border-stone-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300 text-[11px] uppercase tracking-wider">
                  Ações Rápidas Globais:
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                  {allUnlocked ? '12/12 Liberadas' : `${unlockedList.length}/12 Liberadas`}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleUnlockAll}
                  className="p-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 font-bold text-[11px] flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                >
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Liberar Todas as 12</span>
                </button>

                <button
                  onClick={handleLockAllExceptFirst}
                  className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 font-bold text-[11px] flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                >
                  <Lock className="w-3.5 h-3.5 text-rose-400" />
                  <span>Travar (Só Estação 1)</span>
                </button>
              </div>
            </div>

            {/* Individual Station Toggles */}
            <div className="space-y-2">
              <span className="font-bold text-stone-400 text-[11px] uppercase tracking-wider block">
                Controle Individual por Estação (Acesso Independente):
              </span>

              <div className="space-y-1.5">
                {STAGES_DATA.map((stage) => {
                  const isUnlocked = allUnlocked || unlockedList.includes(stage.id);

                  return (
                    <div
                      key={stage.id}
                      onClick={() => handleToggleStage(stage.id)}
                      className={`p-2.5 rounded-2xl border cursor-pointer flex items-center justify-between gap-2 transition-all ${
                        isUnlocked
                          ? 'bg-emerald-950/20 border-emerald-500/40 text-white shadow-sm'
                          : 'bg-stone-800/60 border-stone-800 text-stone-400'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-lg">{stage.icon}</span>
                        <div className="truncate">
                          <div className="font-bold text-xs truncate">
                            Estação {stage.id}: {stage.title}
                          </div>
                          <div className="text-[10px] text-stone-500 truncate">
                            {stage.stationName}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isUnlocked 
                            ? 'bg-emerald-500 text-stone-950 font-black' 
                            : 'bg-stone-700 text-stone-400'
                        }`}>
                          {isUnlocked ? 'LIBERADA 🔓' : 'BLOQUEADA 🔒'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md active:scale-95 transition-all"
              >
                Concluir e Aplicar na Trilha ✓
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
