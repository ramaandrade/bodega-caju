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
  Users, 
  UserPlus, 
  Search, 
  Edit3, 
  Trash2, 
  Save, 
  RotateCcw, 
  LogOut, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Plus,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { STAGES_DATA } from '../data/stages';
import { 
  getAccessConfig, 
  updateStudentPassword, 
  addStudentEmails, 
  removeStudentEmail,
  updateStudentEmail,
  clearAllStudentEmails,
  resetDefaultStudentEmails
} from '../utils/auth';

export function AdminDashboard({ 
  adminEmail, 
  gameState, 
  onUpdateAdminStages, 
  onLogout, 
  onPreviewAsStudent 
}) {
  const [activeTab, setActiveTab] = useState('alunos'); // 'alunos' | 'trilhas'
  const [accessConfig, setAccessConfig] = useState(() => getAccessConfig());
  
  // Student password state
  const [studentPasswordInput, setStudentPasswordInput] = useState(() => accessConfig.studentPassword || '123456');
  const [showStudentPassword, setShowStudentPassword] = useState(false);

  // Email registration state (Create)
  const [newEmailsText, setNewEmailsText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Inline edit state (Update)
  const [editingEmail, setEditingEmail] = useState(null);
  const [editInput, setEditInput] = useState('');

  // Feedback notifications
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  // Sync access config
  const refreshConfig = () => {
    const cfg = getAccessConfig();
    setAccessConfig(cfg);
    setStudentPasswordInput(cfg.studentPassword || '123456');
  };

  const showToast = (type, text) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback({ type: '', text: '' }), 4000);
  };

  // --- PASSWORD MANAGEMENT ---
  const handleSaveStudentPassword = () => {
    const res = updateStudentPassword(studentPasswordInput);
    if (res.success) {
      showToast('success', 'Senha dos alunos atualizada com sucesso!');
      refreshConfig();
      confetti({ particleCount: 30, spread: 60 });
    } else {
      showToast('error', res.error);
    }
  };

  // --- CRUD: CREATE ---
  const handleAddEmails = (e) => {
    e.preventDefault();
    if (!newEmailsText.trim()) {
      showToast('error', 'Digite ao menos um e-mail com domínio @urca.br');
      return;
    }

    const res = addStudentEmails(newEmailsText);
    if (res.success) {
      showToast('success', `${res.addedCount} e-mail(s) cadastrado(s) com sucesso! Total: ${res.totalCount}`);
      setNewEmailsText('');
      refreshConfig();
      confetti({ particleCount: 40, spread: 70 });
    } else {
      showToast('error', res.error);
    }
  };

  // --- CRUD: UPDATE ---
  const handleStartEdit = (email) => {
    setEditingEmail(email);
    setEditInput(email);
  };

  const handleCancelEdit = () => {
    setEditingEmail(null);
    setEditInput('');
  };

  const handleSaveEdit = (oldEmail) => {
    const res = updateStudentEmail(oldEmail, editInput);
    if (res.success) {
      showToast('success', `E-mail alterado para ${editInput.trim().toLowerCase()}`);
      setEditingEmail(null);
      setEditInput('');
      refreshConfig();
    } else {
      showToast('error', res.error);
    }
  };

  // --- CRUD: DELETE ---
  const handleDeleteEmail = (email) => {
    if (window.confirm(`Tem certeza que deseja remover o acesso do e-mail ${email}?`)) {
      const res = removeStudentEmail(email);
      if (res.success) {
        showToast('success', `E-mail ${email} removido com sucesso.`);
        refreshConfig();
      }
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Atenção: deseja realmente excluir TODOS os e-mails de alunos cadastrados?')) {
      clearAllStudentEmails();
      showToast('success', 'Todos os e-mails foram removidos.');
      refreshConfig();
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Restaurar lista de alunos de demonstração (aluno1, aluno2, aluno3 @urca.br)?')) {
      resetDefaultStudentEmails();
      showToast('success', 'Lista de alunos restaurada com sucesso.');
      refreshConfig();
    }
  };

  // --- STAGES UNLOCK CONTROLS ---
  const unlockedList = gameState.admin?.unlockedStages || [1];
  const allUnlocked = Boolean(gameState.admin?.allUnlocked);

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
    showToast('success', 'Todas as 12 estações foram liberadas para os alunos!');
  };

  const handleLockAllExceptFirst = () => {
    onUpdateAdminStages({
      unlockedStages: [1],
      allUnlocked: false
    });
    showToast('success', 'Apenas a Estação 1 está liberada agora.');
  };

  // Filtered students for Read
  const filteredStudents = accessConfig.studentEmails.filter(email => 
    email.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col">
      {/* Top Header do Administrador */}
      <header className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md border-b border-amber-600/40 px-4 py-3 shadow-xl">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-600 flex items-center justify-center text-xl shadow-lg border border-amber-300/40">
              👑
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-amber-200 tracking-tight">
                  Painel de Gestão do Administrador
                </h1>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                  Docente URCA
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Logado como: <strong className="text-stone-200 font-mono">{adminEmail}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Visualizar como Aluno */}
            <button
              onClick={onPreviewAsStudent}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
              title="Acessar o aplicativo e testar as estações como aluno"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver Trilha como Aluno</span>
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-200 border border-rose-800 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
              title="Sair do painel administrativo"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 space-y-4">
        {/* Toast Feedback */}
        {feedback.text && (
          <div className={`p-3 rounded-2xl text-xs flex items-center gap-2 border shadow-lg animate-in fade-in ${
            feedback.type === 'success' 
              ? 'bg-emerald-950/80 text-emerald-200 border-emerald-500/60' 
              : 'bg-rose-950/80 text-rose-200 border-rose-500/60'
          }`}>
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span className="font-semibold leading-relaxed">{feedback.text}</span>
          </div>
        )}

        {/* Tab Selector */}
        <div className="flex border-b border-stone-800 bg-stone-900/80 rounded-2xl p-1 gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('alunos')}
            className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'alunos'
                ? 'bg-[#1e6f5c] text-white shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Gestão de Alunos (CRUD @urca.br)</span>
            <span className="bg-white/20 text-white px-2 py-0.2 rounded-full text-[10px]">
              {accessConfig.studentEmails.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('trilhas')}
            className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'trilhas'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Liberação das Trilhas (12 Estações)</span>
            <span className="bg-white/20 text-white px-2 py-0.2 rounded-full text-[10px]">
              {allUnlocked ? '12/12' : `${unlockedList.length}/12`}
            </span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* ABA 1: GESTÃO DE ALUNOS (CRUD COMPLETO) */}
        {/* ============================================================== */}
        {activeTab === 'alunos' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Senha Única dos Alunos */}
              <div className="bg-white text-stone-900 rounded-3xl p-5 shadow-xl border border-stone-200 space-y-3">
                <div className="flex items-start gap-2.5">
                  <span className="text-xl select-none">🔑</span>
                  <div>
                    <h3 className="font-extrabold text-sm text-stone-900 leading-snug">
                      Senha dos Alunos
                    </h3>
                    <p className="text-xs text-stone-500">
                      Senha única usada por todos os alunos cadastrados para acessar a plataforma
                    </p>
                  </div>
                </div>

                <div className="pt-1">
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Senha atual
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        type={showStudentPassword ? 'text' : 'password'}
                        value={studentPasswordInput}
                        onChange={(e) => setStudentPasswordInput(e.target.value)}
                        placeholder="123456"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#1e6f5c] pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowStudentPassword(!showStudentPassword)}
                        className="absolute right-3 top-3 text-stone-400 hover:text-stone-700"
                        title={showStudentPassword ? 'Ocultar senha' : 'Ver senha'}
                      >
                        {showStudentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleSaveStudentPassword}
                      className="px-4 py-2.5 rounded-xl bg-[#1e6f5c] hover:bg-[#155345] active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Salvar</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2: CRUD - CREATE (Adicionar E-mails) */}
              <div className="bg-white text-stone-900 rounded-3xl p-5 shadow-xl border border-stone-200 space-y-3">
                <div>
                  <h3 className="font-extrabold text-sm text-stone-900 leading-snug flex items-center gap-1.5">
                    <UserPlus className="w-4 h-4 text-[#1e6f5c]" />
                    <span>Cadastrar Novos Alunos</span>
                  </h3>
                  <p className="text-xs text-stone-500">
                    Insira um ou múltiplos e-mails (um por linha). Todos devem ter final <strong>@urca.br</strong>
                  </p>
                </div>

                <form onSubmit={handleAddEmails} className="space-y-2.5">
                  <textarea
                    rows={3}
                    value={newEmailsText}
                    onChange={(e) => setNewEmailsText(e.target.value)}
                    placeholder={`aluno1@urca.br\naluno2@urca.br\naluno3@urca.br`}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-stone-900 text-xs font-mono leading-relaxed placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1e6f5c] resize-none"
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-stone-400">
                      Aceita listas coladas do SIGA ou planilhas
                    </span>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#1e6f5c] hover:bg-[#155345] active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Cadastrar Aluno(s)</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Card 3: CRUD - READ, UPDATE & DELETE (Lista de Alunos) */}
            <div className="bg-white text-stone-900 rounded-3xl p-5 shadow-xl border border-stone-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
                <div>
                  <h3 className="font-extrabold text-sm text-stone-900">
                    Alunos Cadastrados na Turma
                  </h3>
                  <p className="text-xs text-stone-500">
                    Total: <strong className="text-[#1e6f5c]">{accessConfig.studentEmails.length}</strong> alunos autorizados com e-mail institucional @urca.br
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetDefaults}
                    className="px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-semibold flex items-center gap-1 transition-all"
                    title="Restaurar alunos de teste padrão (aluno1, aluno2, aluno3)"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Restaurar Padrões</span>
                  </button>

                  {accessConfig.studentEmails.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="px-2.5 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-semibold flex items-center gap-1 transition-all"
                      title="Excluir todos os alunos"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Limpar Todos</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Barra de Pesquisa (CRUD - Read filter) */}
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar aluno por e-mail..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-stone-900 text-xs placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1e6f5c]"
                />
              </div>

              {/* Tabela / Lista de Alunos (CRUD - Read, Update, Delete) */}
              <div className="space-y-2 max-h-96 overflow-y-auto pr-1 divide-y divide-stone-100">
                {filteredStudents.length === 0 ? (
                  <div className="text-center py-8 text-stone-400 space-y-1">
                    <GraduationCap className="w-8 h-8 mx-auto text-stone-300" />
                    <p className="text-xs font-semibold">
                      {searchQuery ? 'Nenhum aluno encontrado para a busca.' : 'Nenhum aluno cadastrado no momento.'}
                    </p>
                    <p className="text-[11px]">
                      Cadastre os e-mails institucionais no formulário acima.
                    </p>
                  </div>
                ) : (
                  filteredStudents.map((email, idx) => {
                    const isEditing = editingEmail === email;

                    return (
                      <div 
                        key={email}
                        className="flex flex-wrap items-center justify-between gap-2 py-2 px-1 hover:bg-stone-50 rounded-xl transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </div>

                          {/* Se estiver no modo de edição inline (CRUD - Update) */}
                          {isEditing ? (
                            <div className="flex items-center gap-2 flex-1">
                              <input
                                type="text"
                                value={editInput}
                                onChange={(e) => setEditInput(e.target.value)}
                                className="px-2.5 py-1 text-xs font-mono rounded-lg border border-emerald-500 focus:outline-none flex-1"
                                autoFocus
                              />
                              <button
                                onClick={() => handleSaveEdit(email)}
                                className="px-2 py-1 rounded-lg bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800"
                                title="Salvar alteração"
                              >
                                Salvar
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="px-2 py-1 rounded-lg bg-stone-200 text-stone-700 text-xs font-bold hover:bg-stone-300"
                                title="Cancelar"
                              >
                                Cancelar
                              </button>
                            </div>
                          ) : (
                            /* Modo de visualização (CRUD - Read) */
                            <div className="truncate">
                              <span className="font-mono text-stone-900 font-bold text-xs truncate block">
                                {email}
                              </span>
                              <span className="text-[10px] text-stone-400">
                                Domínio Institucional @urca.br · Acesso Habilitado
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Ações (CRUD - Update e Delete) */}
                        {!isEditing && (
                          <div className="flex items-center gap-1.5 shrink-0">
                            {/* Botão de Editar */}
                            <button
                              onClick={() => handleStartEdit(email)}
                              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors"
                              title="Editar e-mail deste aluno"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            {/* Botão de Excluir */}
                            <button
                              onClick={() => handleDeleteEmail(email)}
                              className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                              title="Excluir aluno da turma"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ABA 2: LIBERAÇÃO DAS TRILHAS (12 ESTAÇÕES INDEPENDENTES) */}
        {/* ============================================================== */}
        {activeTab === 'trilhas' && (
          <div className="space-y-4">
            {/* Quick Actions Bar */}
            <div className="bg-stone-900 p-4 rounded-3xl border border-stone-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-amber-300 uppercase tracking-wider">
                    Controle Global de Liberação
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Libere ou bloqueie todas as estações simultaneamente com um único clique:
                  </p>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-bold border border-emerald-500/30">
                  {allUnlocked ? 'Todas as 12 Liberadas' : `${unlockedList.length} de 12 Liberadas`}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleUnlockAll}
                  className="p-3 rounded-2xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  <Unlock className="w-4 h-4 text-emerald-400" />
                  <span>Liberar Todas as 12 Estações</span>
                </button>

                <button
                  onClick={handleLockAllExceptFirst}
                  className="p-3 rounded-2xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-rose-400" />
                  <span>Bloquear Todas (Manter apenas Estação 1)</span>
                </button>
              </div>
            </div>

            {/* Grid com as 12 Estações Individuais */}
            <div className="bg-stone-900 p-4 rounded-3xl border border-stone-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-stone-300 text-xs uppercase tracking-wider">
                  Controle Individual das Estações (Clique para Alternar):
                </span>
                <span className="text-[11px] text-stone-500">
                  Total: 12 Estações Pedagógicas
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {STAGES_DATA.map((stage) => {
                  const isUnlocked = allUnlocked || unlockedList.includes(stage.id);

                  return (
                    <div
                      key={stage.id}
                      onClick={() => handleToggleStage(stage.id)}
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between gap-3 transition-all select-none ${
                        isUnlocked
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-white shadow-sm hover:border-emerald-400'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl shrink-0">{stage.icon}</span>
                        <div className="truncate">
                          <div className="font-bold text-xs text-stone-200 truncate flex items-center gap-1.5">
                            <span>Estação {stage.id}</span>
                            {stage.id >= 3 && stage.id <= 10 && stage.id !== 4 && (
                              <span className="text-[9px] bg-red-950 text-red-300 px-1.5 py-0.2 rounded font-bold border border-red-800">
                                Av2
                              </span>
                            )}
                          </div>
                          <div className="font-extrabold text-xs text-amber-200 truncate">
                            {stage.title.split('—')[1] || stage.title}
                          </div>
                          <div className="text-[10px] text-stone-400 truncate">
                            {stage.stationName}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0">
                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm ${
                          isUnlocked 
                            ? 'bg-emerald-500 text-stone-950' 
                            : 'bg-stone-800 text-stone-400 border border-stone-700'
                        }`}>
                          {isUnlocked ? (
                            <>
                              <Unlock className="w-3 h-3" />
                              <span>LIBERADA</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-3 h-3" />
                              <span>BLOQUEADA</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
