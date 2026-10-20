import React, { useState, useEffect } from 'react';
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
  CheckCircle2,
  Users,
  Save,
  Plus,
  Trash2,
  MapPin,
  Mail,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { STAGES_DATA } from '../data/stages';
import { 
  ADMIN_PASSWORD, 
  getAccessConfig, 
  updateStudentPassword, 
  addStudentEmails, 
  removeStudentEmail 
} from '../utils/auth';

export { ADMIN_PASSWORD };

export function AdminPanelModal({ 
  isOpen, 
  onClose, 
  gameState, 
  onUpdateAdminStages,
  currentAuthSession
}) {
  const [activeTab, setActiveTab] = useState('acesso'); // 'acesso' | 'estacoes'
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return currentAuthSession?.role === 'admin';
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Access config state
  const [accessConfig, setAccessConfig] = useState(() => getAccessConfig());
  const [studentPasswordInput, setStudentPasswordInput] = useState('');
  const [newEmailsText, setNewEmailsText] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState({ type: '', text: '' });

  // Sync access config when modal opens
  useEffect(() => {
    if (isOpen) {
      const cfg = getAccessConfig();
      setAccessConfig(cfg);
      setStudentPasswordInput(cfg.studentPassword || '123456');
      if (currentAuthSession?.role === 'admin') {
        setIsAuthenticated(true);
      }
    }
  }, [isOpen, currentAuthSession]);

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

  const handleSaveStudentPassword = () => {
    const res = updateStudentPassword(studentPasswordInput);
    if (res.success) {
      setFeedbackMsg({ type: 'success', text: 'Senha dos alunos atualizada com sucesso!' });
      setAccessConfig(getAccessConfig());
      setTimeout(() => setFeedbackMsg({ type: '', text: '' }), 3000);
    } else {
      setFeedbackMsg({ type: 'error', text: res.error });
    }
  };

  const handleAddEmails = () => {
    if (!newEmailsText.trim()) {
      setFeedbackMsg({ type: 'error', text: 'Insira ao menos um e-mail com final @urca.br' });
      return;
    }

    const res = addStudentEmails(newEmailsText);
    if (res.success) {
      setFeedbackMsg({ 
        type: 'success', 
        text: `${res.addedCount} e-mail(s) adicionado(s) com sucesso! Total: ${res.totalCount}` 
      });
      setNewEmailsText('');
      setAccessConfig(getAccessConfig());
      setTimeout(() => setFeedbackMsg({ type: '', text: '' }), 4000);
    } else {
      setFeedbackMsg({ type: 'error', text: res.error });
    }
  };

  const handleRemoveEmail = (email) => {
    if (window.confirm(`Remover o acesso do e-mail ${email}?`)) {
      const res = removeStudentEmail(email);
      if (res.success) {
        setAccessConfig(getAccessConfig());
      }
    }
  };

  const handleToggleStage = (stageId) => {
    let newList;
    if (unlockedList.includes(stageId)) {
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
      <div className="bg-stone-900 border border-amber-600/50 rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl text-stone-100 overflow-hidden">
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
                Gestão da Turma URCA & Estações
              </span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Gate (if not yet authenticated) */}
        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="p-5 space-y-4 text-xs">
            <div className="bg-amber-950/30 border border-amber-800/40 p-3.5 rounded-2xl text-stone-300 space-y-1">
              <span className="font-bold text-amber-300 block">Acesso Restrito ao Administrador</span>
              <p className="text-[11px] leading-relaxed">
                Digite a senha do administrador (<strong>430798@R</strong>) para gerenciar as credenciais dos alunos e a liberação das estações.
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
              <span>Autenticar e Acessar Painel</span>
            </button>
          </form>
        ) : (
          /* Authenticated Controls */
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Tabs Selector */}
            <div className="flex border-b border-stone-800 bg-stone-950 px-3 pt-2 gap-2 text-xs font-bold">
              <button
                onClick={() => setActiveTab('acesso')}
                className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
                  activeTab === 'acesso'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Acesso dos Alunos</span>
              </button>
              <button
                onClick={() => setActiveTab('estacoes')}
                className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
                  activeTab === 'estacoes'
                    ? 'border-amber-500 text-amber-400'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Estações da Trilha ({unlockedList.length}/12)</span>
              </button>
            </div>

            {/* Notification Feedback Toast */}
            {feedbackMsg.text && (
              <div className={`mx-4 mt-3 p-3 rounded-xl text-xs flex items-center gap-2 border animate-in fade-in ${
                feedbackMsg.type === 'success' 
                  ? 'bg-emerald-950/60 text-emerald-200 border-emerald-500/50' 
                  : 'bg-rose-950/60 text-rose-200 border-rose-500/50'
              }`}>
                {feedbackMsg.type === 'success' ? <Check className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                <span>{feedbackMsg.text}</span>
              </div>
            )}

            {/* TAB 1: ACESSO DOS ALUNOS (Fiel à imagem enviada) */}
            {activeTab === 'acesso' && (
              <div className="p-4 space-y-4 text-stone-900">
                {/* Card 1: Senha dos Alunos (Fiel ao screenshot do usuário) */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200/90 space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-base select-none">🔑</span>
                    <div>
                      <h3 className="font-extrabold text-sm text-stone-900 leading-snug">
                        Senha dos Alunos
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        Senha única usada por todos os alunos para acessar a plataforma
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Senha atual
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={studentPasswordInput}
                        onChange={(e) => setStudentPasswordInput(e.target.value)}
                        placeholder="123456"
                        className="flex-1 px-3.5 py-2 rounded-xl border border-stone-300 text-stone-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#1e6f5c]"
                      />
                      <button
                        onClick={handleSaveStudentPassword}
                        className="px-4 py-2 rounded-xl bg-[#1e6f5c] hover:bg-[#155345] active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Salvar</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 2: Adicionar E-mails (Fiel ao screenshot do usuário) */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200/90 space-y-3">
                  <div>
                    <h3 className="font-extrabold text-sm text-stone-900 leading-snug">
                      + Adicionar E-mails
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Insira um e-mail por linha. Todos devem ter final @urca.br
                    </p>
                  </div>

                  <div>
                    <textarea
                      rows={4}
                      value={newEmailsText}
                      onChange={(e) => setNewEmailsText(e.target.value)}
                      placeholder={`aluno1@urca.br\naluno2@urca.br\naluno3@urca.br`}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-xs font-mono leading-relaxed placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1e6f5c] resize-none"
                    />
                  </div>

                  <div>
                    <button
                      onClick={handleAddEmails}
                      className="px-4 py-2 rounded-xl bg-[#639a88] hover:bg-[#488b77] active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Adicionar</span>
                    </button>
                  </div>
                </div>

                {/* Card 3: Lista de Alunos Atualmente Cadastrados */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200/90 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-xs text-stone-800 uppercase tracking-wider">
                      Alunos Cadastrados ({accessConfig.studentEmails.length})
                    </h4>
                    <span className="text-[10px] text-stone-400">
                      Domínio institucional @urca.br
                    </span>
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 divide-y divide-stone-100">
                    {accessConfig.studentEmails.length === 0 ? (
                      <p className="text-xs text-stone-400 italic py-2 text-center">
                        Nenhum aluno cadastrado no momento. Adicione os e-mails acima.
                      </p>
                    ) : (
                      accessConfig.studentEmails.map((email) => (
                        <div key={email} className="flex items-center justify-between py-1.5 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-stone-400">🎓</span>
                            <span className="font-mono text-stone-800 font-semibold">{email}</span>
                          </div>
                          <button
                            onClick={() => handleRemoveEmail(email)}
                            className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                            title={`Remover ${email}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ESTAÇÕES DA TRILHA */}
            {activeTab === 'estacoes' && (
              <div className="p-4 space-y-4 text-xs">
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
              </div>
            )}

            {/* Footer */}
            <div className="p-3 border-t border-stone-800 bg-stone-950 flex justify-end">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md active:scale-95 transition-all"
              >
                Salvar e Fechar Painel ✓
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
