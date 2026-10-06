import React, { useState, useEffect } from 'react';
import { 
  loadGameState, 
  saveGameState, 
  createInitialState, 
  getPlayerLevel 
} from './utils/storage';
import { PLAYABLE_BUSINESSES } from './data/businesses';
import { STAGES_DATA } from './data/stages';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { TrilhaMap } from './components/TrilhaMap';
import { StageView } from './components/StageView';
import { OficinasHub } from './components/Oficinas/OficinasHub';
import { ModoEmpreendedorHub } from './components/ModoEmpreendedor/ModoEmpreendedorHub';
import { SimuladoAv2 } from './components/ModoRevisao/SimuladoAv2';
import { TurmaHub } from './components/PainelProfessor/TurmaHub';
import { CalculatorModal } from './components/CalculatorModal';
import { GlossarioModal } from './components/GlossarioModal';
import { Sparkles, Store, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [gameState, setGameState] = useState(() => {
    const saved = loadGameState();
    if (saved) return saved;
    // default initial with Marmitaria
    return createInitialState(PLAYABLE_BUSINESSES[0]);
  });

  const [hasStarted, setHasStarted] = useState(() => {
    return Boolean(loadGameState()?.profile?.registeredAt);
  });

  // Navigation state
  const [activeTab, setActiveTab] = useState('trilha'); // 'trilha' | 'oficinas' | 'empreendedor' | 'revisao' | 'turma'
  const [selectedStageId, setSelectedStageId] = useState(null);

  // Modals state
  const [showCalculator, setShowCalculator] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  // Onboarding temp state
  const [onboardingName, setOnboardingName] = useState('Estudante da URCA');
  const [onboardingRole, setOnboardingRole] = useState('aluno');
  const [onboardingClass, setOnboardingClass] = useState('URCA26');
  const [onboardingBiz, setOnboardingBiz] = useState(PLAYABLE_BUSINESSES[0]);
  const [lgpdAccepted, setLgpdAccepted] = useState(true);

  // Persist game state on changes
  useEffect(() => {
    if (hasStarted) {
      saveGameState(gameState);
    }
  }, [gameState, hasStarted]);

  // Audio Speech toggle
  const handleToggleAudio = () => {
    setGameState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        audioSpeech: !prev.settings.audioSpeech
      }
    }));
  };

  // Contrast toggle
  const handleToggleContrast = () => {
    setGameState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        highContrast: !prev.settings.highContrast
      }
    }));
  };

  // Font size toggle
  const handleToggleFontSize = () => {
    setGameState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        fontSize: prev.settings.fontSize === 'normal' ? 'large' : 'normal'
      }
    }));
  };

  // Stage completion handler
  const handleCompleteStage = (stageId, { prata, score }) => {
    setGameState(prev => {
      const currentBadges = prev.gamification.badges[stageId] || {};
      const newBadges = {
        ...currentBadges,
        bronze: true,
        prata: prata || currentBadges.prata
      };

      const xpBonus = 120 + (prata ? 80 : 0);
      const cajusBonus = 35 + (prata ? 25 : 0);

      // unlock next stage if this was the highest
      const nextStage = stageId + 1;
      const newHighest = Math.max(
        prev.gamification.highestUnlockedStage || 1, 
        nextStage <= 12 ? nextStage : 12
      );

      return {
        ...prev,
        gamification: {
          ...prev.gamification,
          xp: prev.gamification.xp + xpBonus,
          cajus: prev.gamification.cajus + cajusBonus,
          highestUnlockedStage: newHighest,
          badges: {
            ...prev.gamification.badges,
            [stageId]: newBadges
          },
          quizScores: {
            ...prev.gamification.quizScores,
            [stageId]: score
          }
        }
      };
    });
  };

  // Update business cash
  const handleUpdateCash = (amount) => {
    setGameState(prev => ({
      ...prev,
      businessState: {
        ...prev.businessState,
        cash: prev.businessState.cash + amount
      }
    }));
  };

  // Reward cajus
  const handleRewardCajus = (amount) => {
    setGameState(prev => ({
      ...prev,
      gamification: {
        ...prev.gamification,
        cajus: prev.gamification.cajus + amount,
        xp: prev.gamification.xp + amount * 2
      }
    }));
  };

  // Save reflection
  const handleSaveReflection = (stageId, text) => {
    setGameState(prev => ({
      ...prev,
      reflections: {
        ...prev.reflections,
        [stageId]: text
      }
    }));
  };

  // Save field mission
  const handleSaveFieldMission = (stageId, data) => {
    setGameState(prev => {
      const currentBadges = prev.gamification.badges[stageId] || {};
      return {
        ...prev,
        fieldMissions: {
          ...prev.fieldMissions,
          [stageId]: data
        },
        gamification: {
          ...prev.gamification,
          xp: prev.gamification.xp + 200,
          cajus: prev.gamification.cajus + 50,
          badges: {
            ...prev.gamification.badges,
            [stageId]: {
              ...currentBadges,
              ouro: true
            }
          }
        }
      };
    });
  };

  // Update sub-state (e.g. from Modo Empreendedor)
  const handleUpdateSubState = (updates) => {
    setGameState(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Reset Game Handler (Reiniciar a qualquer momento)
  const handleResetGame = () => {
    localStorage.removeItem('bodega_caju_save_v1');
    const fresh = createInitialState(PLAYABLE_BUSINESSES[0]);
    setGameState(fresh);
    setHasStarted(false);
    setSelectedStageId(null);
    setActiveTab('trilha');
    setOnboardingBiz(PLAYABLE_BUSINESSES[0]);
  };

  // Finish Onboarding
  const handleFinishOnboarding = () => {
    const initialState = createInitialState(onboardingBiz, {
      name: onboardingName,
      role: onboardingRole,
      classCode: onboardingClass
    });
    setGameState(initialState);
    setHasStarted(true);
    confetti({ particleCount: 80, spread: 90 });
  };

  const selectedStage = STAGES_DATA.find(s => s.id === selectedStageId);
  const isHighContrast = gameState.settings?.highContrast;
  const isLargeFont = gameState.settings?.fontSize === 'large';

  // ---------------- ONBOARDING SCREEN ----------------
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 flex items-center justify-center p-3">
        <div className="max-w-md w-full bg-stone-900 border border-amber-600/40 rounded-3xl p-5 shadow-2xl space-y-4">
          <div className="text-center space-y-1">
            <div className="inline-block p-3 rounded-full bg-gradient-to-tr from-amber-600 to-orange-500 text-3xl shadow-lg animate-float">
              🌰
            </div>
            <h1 className="text-xl font-black text-amber-200 tracking-tight">
              Bodega CAJU
            </h1>
            <p className="text-xs text-amber-400 font-semibold">
              Educação Financeira para Pequenos Negócios · URCA (Crato-CE)
            </p>
            <p className="text-[11px] text-stone-400 max-w-xs mx-auto pt-1">
              Bem-vindo a Vila Araripe! Escolha seu perfil e seu pequeno negócio para iniciar a Trilha da Chapada com Mestre Caju.
            </p>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <div>
              <label className="font-bold text-stone-300 block mb-1">Seu Nome ou Apelido:</label>
              <input
                type="text"
                value={onboardingName}
                onChange={(e) => setOnboardingName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white font-semibold text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-stone-300 block mb-1">Perfil:</label>
                <select
                  value={onboardingRole}
                  onChange={(e) => setOnboardingRole(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white font-semibold text-xs focus:outline-none focus:border-amber-500"
                >
                  <option value="aluno">Aluno(a) de Economia</option>
                  <option value="empreendedor">Empreendedor(a)</option>
                  <option value="professor">Professor / Extensionista</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-300 block mb-1">Código da Turma:</label>
                <input
                  type="text"
                  value={onboardingClass}
                  onChange={(e) => setOnboardingClass(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-stone-800 border border-stone-700 text-amber-300 font-mono font-bold text-xs uppercase"
                />
              </div>
            </div>

            {/* Choose 1 of 5 businesses */}
            <div>
              <label className="font-bold text-amber-300 block mb-1.5">
                Escolha seu Negócio Inicial em Vila Araripe:
              </label>
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1 no-scrollbar">
                {PLAYABLE_BUSINESSES.map(b => (
                  <div
                    key={b.id}
                    onClick={() => setOnboardingBiz(b)}
                    className={`p-2.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      onboardingBiz.id === b.id
                        ? 'bg-amber-500/20 border-amber-500 ring-2 ring-amber-400'
                        : 'bg-stone-800/80 border-stone-700 hover:border-stone-600'
                    }`}
                  >
                    <span className="text-2xl">{b.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-stone-100 truncate text-xs">{b.name}</div>
                      <div className="text-[10px] text-amber-400 truncate">{b.tagline}</div>
                      <div className="text-[9px] text-stone-400 mt-0.5 truncate">
                        Caixa inicial: R$ {b.initialCash.toFixed(2)} · {b.city}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LGPD Consent */}
            <div className="flex items-start gap-2 pt-1 text-[10px] text-stone-400">
              <input
                type="checkbox"
                id="lgpd"
                checked={lgpdAccepted}
                onChange={(e) => setLgpdAccepted(e.target.checked)}
                className="mt-0.5 rounded text-amber-600 focus:ring-0"
              />
              <label htmlFor="lgpd" className="leading-tight">
                Autorizo o uso pedagógico e acadêmico dos dados anonimizados das respostas para pesquisas e extensão da URCA (LGPD).
              </label>
            </div>
          </div>

          <button
            disabled={!lgpdAccepted || !onboardingName.trim()}
            onClick={handleFinishOnboarding}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
          >
            <span>Iniciar Jornada com Mestre Caju</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // ---------------- MAIN APPLICATION VIEW ----------------
  return (
    <div className={`min-h-screen flex flex-col transition-colors ${
      isHighContrast ? 'bg-black text-white' : 'bg-amber-50/40 text-stone-900'
    } ${isLargeFont ? 'text-base' : 'text-sm'}`}>
      
      {/* Top Header / HUD */}
      <Navbar 
        gameState={gameState}
        onOpenCalculator={() => setShowCalculator(true)}
        onOpenGlossary={() => setShowGlossary(true)}
        onToggleAudio={handleToggleAudio}
        onToggleContrast={handleToggleContrast}
        onToggleFontSize={handleToggleFontSize}
        onResetGame={handleResetGame}
      />

      {/* Main Container - Mobile Centered Shell */}
      <main className="flex-1 max-w-md w-full mx-auto p-3">
        {/* If a stage is open, show StageView */}
        {selectedStageId ? (
          <StageView
            stage={selectedStage}
            gameState={gameState}
            onBack={() => setSelectedStageId(null)}
            onCompleteStage={handleCompleteStage}
            onUpdateCash={handleUpdateCash}
            onRewardCajus={handleRewardCajus}
            onSaveReflection={handleSaveReflection}
            onSaveFieldMission={handleSaveFieldMission}
          />
        ) : (
          /* Tab router */
          <>
            {activeTab === 'trilha' && (
              <TrilhaMap 
                gameState={gameState} 
                onSelectStage={(id) => setSelectedStageId(id)} 
              />
            )}

            {activeTab === 'oficinas' && (
              <div className="space-y-3 pb-20">
                <div className="bg-stone-900 text-amber-50 p-4 rounded-3xl border border-amber-600/40 shadow-sm">
                  <h2 className="text-base font-extrabold text-amber-300">Oficinas Interativas</h2>
                  <p className="text-xs text-stone-300 mt-1">
                    Pratique cálculos e decisões diretamente nos simuladores das 12 estações:
                  </p>
                </div>
                <OficinasHub 
                  stageId={gameState.gamification.highestUnlockedStage || 1}
                  businessState={gameState.businessState}
                  onUpdateCash={handleUpdateCash}
                  onRewardCajus={handleRewardCajus}
                />
              </div>
            )}

            {activeTab === 'empreendedor' && (
              <ModoEmpreendedorHub 
                gameState={gameState} 
                onUpdateState={handleUpdateSubState} 
              />
            )}

            {activeTab === 'revisao' && (
              <SimuladoAv2 
                onOpenCalculator={() => setShowCalculator(true)} 
              />
            )}

            {activeTab === 'turma' && (
              <TurmaHub gameState={gameState} />
            )}
          </>
        )}
      </main>

      {/* Bottom Nav for Mobile */}
      <BottomNav 
        activeTab={activeTab} 
        onSelectTab={(tab) => {
          setSelectedStageId(null);
          setActiveTab(tab);
        }} 
      />

      {/* Global Modals */}
      {showCalculator && (
        <CalculatorModal onClose={() => setShowCalculator(false)} />
      )}

      {showGlossary && (
        <GlossarioModal onClose={() => setShowGlossary(false)} />
      )}
    </div>
  );
}
