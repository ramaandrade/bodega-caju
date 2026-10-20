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
  RefreshCw,
  Database,
  Cloud,
  CloudOff,
  Copy,
  CheckCheck,
  Server,
  UploadCloud,
  DownloadCloud,
  HelpCircle,
  ExternalLink as LinkIcon
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
  resetDefaultStudentEmails,
  resetStudentPasswordToDefault,
  syncFromCloudDb
} from '../utils/auth';
import {
  getSupabaseConfig,
  saveSupabaseConfig,
  clearSupabaseConfig,
  testSupabaseConnection,
  syncLocalStudentsToDb,
  cleanSupabaseUrl,
  SUPABASE_SCHEMA_SQL
} from '../services/supabase';

export function AdminDashboard({ 
  adminEmail, 
  gameState, 
  onUpdateAdminStages, 
  onLogout, 
  onPreviewAsStudent 
}) {
  const [activeTab, setActiveTab] = useState('alunos'); // 'alunos' | 'trilhas' | 'database'
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

  // Supabase Database state
  const [supabaseConfig, setSupabaseConfig] = useState(() => getSupabaseConfig());
  const [supabaseUrlInput, setSupabaseUrlInput] = useState(() => cleanSupabaseUrl(getSupabaseConfig().url));
  const [supabaseKeyInput, setSupabaseKeyInput] = useState(() => getSupabaseConfig().anonKey);
  const [isTestingDb, setIsTestingDb] = useState(false);
  const [dbTestResult, setDbTestResult] = useState(null);
  const [isSyncingDb, setIsSyncingDb] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

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
    setTimeout(() => setFeedback({ type: '', text: '' }), 4500);
  };

  // --- PASSWORD MANAGEMENT ---
  const handleSaveStudentPassword = async () => {
    const res = await updateStudentPassword(studentPasswordInput);
    if (res.success) {
      showToast('success', `Senha dos alunos atualizada para: "${res.password}"`);
      refreshConfig();
      confetti({ particleCount: 30, spread: 60 });
    } else {
      showToast('error', res.error);
    }
  };

  const handleResetStudentPassword = async () => {
    if (window.confirm('Restaurar a senha dos alunos para o padrão inicial "123456"?')) {
      const res = await resetStudentPasswordToDefault();
      if (res.success) {
        showToast('success', 'Senha dos alunos restaurada para o padrão inicial: 123456');
        refreshConfig();
      }
    }
  };

  // --- CRUD: CREATE ---
  const handleAddEmails = async (e) => {
    e.preventDefault();
    if (!newEmailsText.trim()) {
      showToast('error', 'Digite ao menos um e-mail com domínio @urca.br');
      return;
    }

    const res = await addStudentEmails(newEmailsText);
    if (res.success) {
      const dbNote = res.dbSynced ? ' e salvo no banco de dados Supabase na nuvem!' : '!';
      showToast('success', `${res.addedCount} e-mail(s) cadastrado(s) com sucesso${dbNote} Total: ${res.totalCount}`);
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

  const handleSaveEdit = async (oldEmail) => {
    const res = await updateStudentEmail(oldEmail, editInput);
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
  const handleDeleteEmail = async (email) => {
    if (window.confirm(`Tem certeza que deseja remover o acesso do e-mail ${email}?`)) {
      const res = await removeStudentEmail(email);
      if (res.success) {
        showToast('success', `E-mail ${email} removido com sucesso.`);
        refreshConfig();
      }
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Atenção: deseja realmente excluir TODOS os e-mails de alunos cadastrados?')) {
      await clearAllStudentEmails();
      showToast('success', 'Todos os e-mails foram removidos.');
      refreshConfig();
    }
  };

  const handleResetDefaults = async () => {
    if (window.confirm('Restaurar lista de alunos de demonstração (aluno1, aluno2, aluno3 @urca.br)?')) {
      await resetDefaultStudentEmails();
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
      newList = [...unlockedList, stageId].sort((a, b) => a - b);
    }

    onUpdateAdminStages({
      unlockedStages: newList,
      allUnlocked: false
    });
    showToast('success', `Estação ${stageId} ${unlockedList.includes(stageId) ? 'bloqueada' : 'liberada'} com sucesso!`);
  };

  const handleUnlockAll = () => {
    onUpdateAdminStages({
      allUnlocked: true,
      unlockedStages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    });
    showToast('success', 'Todas as 12 estações foram liberadas para os alunos!');
    confetti({ particleCount: 50, spread: 80 });
  };

  const handleResetStages = () => {
    onUpdateAdminStages({
      unlockedStages: [1],
      allUnlocked: false
    });
    showToast('success', 'Apenas a Estação 1 está liberada agora.');
  };

  // --- SUPABASE DATABASE ACTIONS ---
  const handleTestDbConnection = async () => {
    setIsTestingDb(true);
    setDbTestResult(null);
    const cleanedUrl = cleanSupabaseUrl(supabaseUrlInput);
    setSupabaseUrlInput(cleanedUrl);
    const result = await testSupabaseConnection(cleanedUrl, supabaseKeyInput);
    setIsTestingDb(false);
    setDbTestResult(result);
    if (result.success) {
      showToast('success', `Conexão bem-sucedida! ${result.studentCount} alunos cadastrados no banco.`);
    } else {
      showToast('error', result.error);
    }
  };

  const handleSaveSupabase = async () => {
    const cleanedUrl = cleanSupabaseUrl(supabaseUrlInput);
    setSupabaseUrlInput(cleanedUrl);
    const saveRes = saveSupabaseConfig(cleanedUrl, supabaseKeyInput);
    if (!saveRes.success) {
      showToast('error', saveRes.error);
      return;
    }
    const cfg = getSupabaseConfig();
    setSupabaseConfig(cfg);
    showToast('success', 'Credenciais do Supabase salvas!');
    await handleTestDbConnection();
  };

  const handleDisconnectSupabase = () => {
    if (window.confirm('Deseja desconectar o Supabase e voltar para o modo local (LocalStorage)?')) {
      clearSupabaseConfig();
      setSupabaseConfig(getSupabaseConfig());
      setSupabaseUrlInput('');
      setSupabaseKeyInput('');
      setDbTestResult(null);
      showToast('success', 'Supabase desconectado. Aplicativo operando em modo local.');
    }
  };

  const handlePushStudentsToCloud = async () => {
    if (!supabaseConfig.isConfigured) {
      showToast('error', 'Configure e salve a URL e a Anon Key do Supabase antes de sincronizar.');
      return;
    }
    setIsSyncingDb(true);
    const res = await syncLocalStudentsToDb(accessConfig.studentEmails);
    setIsSyncingDb(false);
    if (res.success) {
      showToast('success', `${res.count} alunos locais foram gravados com sucesso no banco de dados na nuvem!`);
      confetti({ particleCount: 35, spread: 60 });
    } else {
      showToast('error', `Falha ao gravar no banco: ${res.error}`);
    }
  };

  const handlePullStudentsFromCloud = async () => {
    if (!supabaseConfig.isConfigured) {
      showToast('error', 'Configure e salve a URL e a Anon Key do Supabase antes de sincronizar.');
      return;
    }
    setIsSyncingDb(true);
    const res = await syncFromCloudDb();
    setIsSyncingDb(false);
    if (res.success) {
      refreshConfig();
      showToast('success', `${res.studentCount} alunos baixados com sucesso do banco de dados na nuvem!`);
      confetti({ particleCount: 35, spread: 60 });
    } else {
      showToast('error', `Falha ao carregar do banco: ${res.error}`);
    }
  };

  const handleCopySqlScript = () => {
    navigator.clipboard.writeText(SUPABASE_SCHEMA_SQL);
    setCopiedSql(true);
    showToast('success', 'Script SQL copiado para a área de transferência!');
    setTimeout(() => setCopiedSql(false), 3000);
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
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-black text-amber-200 tracking-tight">
                  Painel de Gestão do Administrador
                </h1>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                  Docente URCA
                </span>
                {/* Status Pill do Banco de Dados */}
                {supabaseConfig.isConfigured ? (
                  <span 
                    onClick={() => setActiveTab('database')}
                    className="cursor-pointer text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/40 flex items-center gap-1.5 hover:bg-emerald-500/30 transition-all"
                    title="Banco de dados na nuvem ativo (Supabase PostgreSQL)"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Supabase Nuvem Ativo</span>
                  </span>
                ) : (
                  <span 
                    onClick={() => setActiveTab('database')}
                    className="cursor-pointer text-[10px] bg-amber-500/10 text-amber-400 font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1.5 hover:bg-amber-500/20 transition-all"
                    title="Dados salvos no cache local deste navegador"
                  >
                    <Database className="w-3 h-3 text-amber-400" />
                    <span>Modo Local (Configurar Banco)</span>
                  </span>
                )}
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
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer"
              title="Acessar o aplicativo e testar as estações como aluno"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver Trilha como Aluno</span>
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-200 border border-rose-800 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer"
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

        {/* Tab Selector com 3 Abas */}
        <div className="flex border-b border-stone-800 bg-stone-900/80 rounded-2xl p-1 gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('alunos')}
            className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
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
            className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
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

          <button
            onClick={() => setActiveTab('database')}
            className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'database'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Banco de Dados na Nuvem</span>
            {supabaseConfig.isConfigured ? (
              <span className="w-2 h-2 rounded-full bg-emerald-400" title="Conectado" />
            ) : (
              <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">
                Local
              </span>
            )}
          </button>
        </div>

        {/* ============================================================== */}
        {/* ABA 1: GESTÃO DE ALUNOS (CRUD COMPLETO) */}
        {/* ============================================================== */}
        {activeTab === 'alunos' && (
          <div className="space-y-4">
            {/* Banner de Sincronização com a Nuvem */}
            <div className={`p-3.5 rounded-2xl border text-xs flex flex-wrap items-center justify-between gap-3 ${
              supabaseConfig.isConfigured
                ? 'bg-emerald-950/30 border-emerald-600/40 text-emerald-200'
                : 'bg-amber-950/30 border-amber-600/40 text-amber-200'
            }`}>
              <div className="flex items-center gap-2.5 min-w-0">
                {supabaseConfig.isConfigured ? (
                  <Cloud className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <Database className="w-5 h-5 text-amber-400 shrink-0" />
                )}
                <div>
                  <div className="font-bold">
                    {supabaseConfig.isConfigured 
                      ? 'Banco de Dados Supabase (PostgreSQL) Conectado' 
                      : 'Armazenamento em Modo Local (LocalStorage)'}
                  </div>
                  <div className="text-[11px] opacity-80">
                    {supabaseConfig.isConfigured
                      ? 'Novos alunos cadastrados aqui são gravados na nuvem e liberados em tempo real nos celulares da turma.'
                      : 'Para que os alunos acessem de outros dispositivos, conecte seu projeto Supabase na aba "Banco de Dados".'}
                  </div>
                </div>
              </div>

              {supabaseConfig.isConfigured ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePushStudentsToCloud}
                    disabled={isSyncingDb}
                    className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                    title="Garante que todos os alunos locais estejam gravados no Supabase"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>{isSyncingDb ? 'Sincronizando...' : 'Enviar para o Banco'}</span>
                  </button>
                  <button
                    onClick={handlePullStudentsFromCloud}
                    disabled={isSyncingDb}
                    className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer border border-stone-600 disabled:opacity-50"
                    title="Baixa os alunos cadastrados no Supabase para este navegador"
                  >
                    <DownloadCloud className="w-3.5 h-3.5" />
                    <span>Baixar da Nuvem</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setActiveTab('database')}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Configurar Banco na Nuvem</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Senha Única dos Alunos */}
              <div className="bg-white text-stone-900 rounded-3xl p-5 shadow-xl border border-stone-200 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <span className="text-xl select-none">🔑</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-stone-900">
                          Senha dos Alunos
                        </h3>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                          Padrão: 123456
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Senha única compartilhada com os estudantes da turma para login com e-mail institucional @urca.br.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-semibold text-stone-700">
                    Alterar senha dos alunos:
                  </label>
                  <div className="relative">
                    <input
                      type={showStudentPassword ? 'text' : 'password'}
                      value={studentPasswordInput}
                      onChange={(e) => setStudentPasswordInput(e.target.value)}
                      placeholder="Nova senha da turma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e6f5c] pr-10 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowStudentPassword(!showStudentPassword)}
                      className="absolute right-3 top-3 text-stone-400 hover:text-stone-700 cursor-pointer"
                      title={showStudentPassword ? 'Ocultar senha' : 'Ver senha'}
                    >
                      {showStudentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={handleResetStudentPassword}
                    className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 underline underline-offset-2 transition-colors cursor-pointer"
                    title="Restaurar para a senha padrão '123456'"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restaurar "123456"</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveStudentPassword}
                    className="px-4 py-2 rounded-xl bg-[#1e6f5c] hover:bg-[#155345] text-white text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Salvar Senha</span>
                  </button>
                </div>
              </div>

              {/* Card 2: CRUD - CREATE (Cadastrar Novos Alunos) */}
              <div className="bg-white text-stone-900 rounded-3xl p-5 shadow-xl border border-stone-200 space-y-3">
                <div className="flex items-start gap-2.5">
                  <span className="text-xl select-none">➕</span>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                      <UserPlus className="w-4 h-4 text-[#1e6f5c]" />
                      <span>Cadastrar Novos Alunos</span>
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Insira um ou vários e-mails institucionais (um por linha ou separados por vírgula).
                    </p>
                  </div>
                </div>

                <form onSubmit={handleAddEmails} className="space-y-3">
                  <textarea
                    rows={3}
                    value={newEmailsText}
                    onChange={(e) => setNewEmailsText(e.target.value)}
                    placeholder={`aluno1@urca.br\naluno2@urca.br\naluno3@urca.br`}
                    className="w-full p-3 rounded-xl border border-stone-300 text-stone-900 text-xs font-mono placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1e6f5c] transition-all"
                  />
                  
                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Obrigatório: @urca.br
                    </span>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#1e6f5c] hover:bg-[#155345] text-white text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Cadastrar Aluno(s)</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Card 3: CRUD - READ, UPDATE & DELETE (Lista de Alunos) */}
            <div className="bg-white text-stone-900 rounded-3xl p-5 shadow-xl border border-stone-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-stone-900">
                      Alunos Cadastrados na Turma
                    </h3>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {accessConfig.studentEmails.length}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Total: <strong className="text-[#1e6f5c]">{accessConfig.studentEmails.length}</strong> alunos autorizados com e-mail institucional @urca.br
                  </p>
                </div>

                {/* Ações em lote */}
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleResetDefaults}
                    className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                    title="Restaurar alunos de teste padrão (aluno1, aluno2, aluno3)"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restaurar Alunos Teste</span>
                  </button>

                  {accessConfig.studentEmails.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                      title="Excluir todos os alunos"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Excluir Todos</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Barra de Busca (Read / Filtro) */}
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar aluno por e-mail..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1e6f5c] text-stone-900 placeholder:text-stone-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700 text-xs cursor-pointer"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Tabela / Lista de Alunos (CRUD - Read, Update, Delete) */}
              <div className="border border-stone-200 rounded-2xl overflow-hidden divide-y divide-stone-100 max-h-96 overflow-y-auto">
                {filteredStudents.length === 0 ? (
                  <div className="p-8 text-center text-xs text-stone-400">
                    <GraduationCap className="w-8 h-8 mx-auto mb-2 text-stone-300" />
                    {searchQuery ? 'Nenhum aluno encontrado para a busca.' : 'Nenhum aluno cadastrado no momento.'}
                  </div>
                ) : (
                  filteredStudents.map((email, idx) => {
                    const isEditing = editingEmail === email;

                    return (
                      <div 
                        key={email}
                        className="p-3 sm:px-4 flex items-center justify-between gap-3 hover:bg-stone-50 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <span className="text-xs font-mono font-bold text-stone-400 w-6 text-right select-none">
                            {idx + 1}.
                          </span>
                          
                          {isEditing ? (
                            <div className="flex items-center gap-2 flex-1">
                              <input
                                type="email"
                                value={editInput}
                                onChange={(e) => setEditInput(e.target.value)}
                                className="px-3 py-1 rounded-lg border border-emerald-500 text-xs font-mono w-full text-stone-900 focus:outline-none ring-2 ring-emerald-500/20"
                                autoFocus
                              />
                              <button
                                onClick={() => handleSaveEdit(email)}
                                className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all cursor-pointer"
                                title="Salvar alteração"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="p-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 transition-all cursor-pointer"
                                title="Cancelar edição"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="truncate flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-stone-800 truncate">
                                {email}
                              </span>
                              <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-mono">
                                Aluno
                              </span>
                            </div>
                          )}
                        </div>

                        {!isEditing && (
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => handleStartEdit(email)}
                              className="p-1.5 rounded-lg text-stone-500 hover:text-[#1e6f5c] hover:bg-emerald-50 transition-colors cursor-pointer"
                              title="Editar e-mail deste aluno"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteEmail(email)}
                              className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Excluir aluno da turma"
                            >
                              <Trash2 className="w-4 h-4" />
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
        {/* ABA 2: LIBERAÇÃO DAS TRILHAS (12 ESTAÇÕES) */}
        {/* ============================================================== */}
        {activeTab === 'trilhas' && (
          <div className="space-y-4">
            <div className="bg-stone-900 border border-amber-600/40 rounded-3xl p-5 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
                <div>
                  <h3 className="font-extrabold text-base text-amber-200 flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-amber-400" />
                    <span>Controle Pedagógico de Liberação das Estações</span>
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Escolha quais estações estarão acessíveis para os alunos praticarem na jornada.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleUnlockAll}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-md cursor-pointer"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Liberar Todas (12)</span>
                  </button>

                  <button
                    onClick={handleResetStages}
                    className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Somente Estação 1</span>
                  </button>
                </div>
              </div>

              {/* Grid das 12 Estações */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {STAGES_DATA.map((stage) => {
                  const isUnlocked = allUnlocked || unlockedList.includes(stage.id);

                  return (
                    <div
                      key={stage.id}
                      onClick={() => handleToggleStage(stage.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isUnlocked
                          ? 'bg-amber-500/15 border-amber-500/80 shadow-md shadow-amber-950/20'
                          : 'bg-stone-900/60 border-stone-800 opacity-60 hover:opacity-100 hover:border-stone-700'
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

        {/* ============================================================== */}
        {/* ABA 3: BANCO DE DADOS NA NUVEM (SUPABASE POSTGRESQL) */}
        {/* ============================================================== */}
        {activeTab === 'database' && (
          <div className="space-y-4">
            {/* Card 1: Status e Ações do Banco de Dados */}
            <div className="bg-stone-900 border border-indigo-500/40 rounded-3xl p-5 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-900/60 border border-indigo-500/40 flex items-center justify-center text-xl text-indigo-400 shadow-md">
                    <Database className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-indigo-200 flex items-center gap-2">
                      <span>Banco de Dados na Nuvem (Supabase PostgreSQL)</span>
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Garante que alunos cadastrados por você fiquem disponíveis instantaneamente nos celulares e computadores de toda a turma.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {supabaseConfig.isConfigured ? (
                    <button
                      onClick={handleDisconnectSupabase}
                      className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-rose-950/60 text-stone-300 hover:text-rose-300 border border-stone-700 hover:border-rose-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      Desconectar
                    </button>
                  ) : null}
                </div>
              </div>

              {/* Formulário de Configuração das Chaves Supabase */}
              <div className="grid grid-cols-1 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Supabase Project URL:
                  </label>
                  <input
                    type="url"
                    value={supabaseUrlInput}
                    onChange={(e) => setSupabaseUrlInput(e.target.value)}
                    onBlur={() => setSupabaseUrlInput(cleanSupabaseUrl(supabaseUrlInput))}
                    placeholder="https://seu-projeto-ref.supabase.co"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 font-mono text-xs placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <span className="text-[11px] text-stone-500 mt-0.5 block">
                    Encontrada no painel do Supabase em: <strong>Project Settings → API → Project URL</strong>
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Supabase Anon Public Key:
                  </label>
                  <input
                    type="password"
                    value={supabaseKeyInput}
                    onChange={(e) => setSupabaseKeyInput(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 font-mono text-xs placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <span className="text-[11px] text-stone-500 mt-0.5 block">
                    Encontrada no painel do Supabase em: <strong>Project Settings → API → Project API keys → anon public</strong>
                  </span>
                </div>

                {/* Resultado do Teste de Conexão */}
                {dbTestResult && (
                  <div className={`p-3.5 rounded-2xl text-xs flex items-start gap-2.5 border ${
                    dbTestResult.success 
                      ? 'bg-emerald-950/70 text-emerald-200 border-emerald-500/60'
                      : 'bg-rose-950/70 text-rose-200 border-rose-500/60'
                  }`}>
                    {dbTestResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div className="leading-relaxed">
                      <strong>{dbTestResult.success ? 'Conexão Ativa: ' : 'Falha na Conexão: '}</strong>
                      {dbTestResult.message || dbTestResult.error}
                      {dbTestResult.needSchema && (
                        <div className="mt-1 text-amber-300 font-semibold">
                          Dica: execute o script SQL abaixo no SQL Editor do Supabase para criar as tabelas!
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Botões de Ação */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-800">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleTestDbConnection}
                      disabled={isTestingDb || !supabaseUrlInput || !supabaseKeyInput}
                      className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 border border-stone-600 disabled:opacity-40 cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isTestingDb ? 'animate-spin' : ''}`} />
                      <span>{isTestingDb ? 'Testando conexão...' : 'Testar Conexão'}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleSaveSupabase}
                    disabled={!supabaseUrlInput || !supabaseKeyInput}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-md shadow-indigo-900/30 disabled:opacity-40 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Salvar e Ativar Banco na Nuvem</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Passo a Passo para Criar o Banco em 2 Minutos */}
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Como configurar o Supabase gratuitamente em 3 passos:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-300">
                <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
                  <div className="font-extrabold text-amber-300">1. Crie o Projeto Grátis</div>
                  <p className="text-[11px] text-stone-400">
                    Acesse <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-amber-400 underline font-bold inline-flex items-center gap-0.5">supabase.com <LinkIcon className="w-2.5 h-2.5" /></a> e clique em <em>New Project</em> (banco PostgreSQL gratuito).
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
                  <div className="font-extrabold text-amber-300">2. Execute o Script SQL</div>
                  <p className="text-[11px] text-stone-400">
                    No menu lateral esquerdo do Supabase, clique em <strong>SQL Editor</strong>, cole o script abaixo e clique no botão verde <strong>RUN</strong>.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
                  <div className="font-extrabold text-amber-300">3. Copie a URL e a Chave</div>
                  <p className="text-[11px] text-stone-400">
                    Vá em <strong>Project Settings → API</strong>, copie a <em>Project URL</em> e a <em>anon public key</em> e cole nos campos acima.
                  </p>
                </div>
              </div>

              {/* Visualizador do Script SQL com Botão Copiar */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-stone-400">
                    Script SQL das Tabelas (caju_students e caju_config):
                  </span>
                  <button
                    onClick={handleCopySqlScript}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                  >
                    {copiedSql ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Script SQL</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-[11px] font-mono text-emerald-300/90 overflow-x-auto max-h-56 leading-relaxed select-all">
                  {SUPABASE_SCHEMA_SQL}
                </pre>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
