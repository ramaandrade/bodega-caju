// =====================================================================
// AUTENTICAÇÃO E CONTROLE DE ACESSO — BODEGA CAJU (URCA)
// =====================================================================

export const ADMIN_EMAIL = 'rama.lucas@urca.br';
export const ADMIN_PASSWORD = '430798@R';

export const DEFAULT_STUDENT_PASSWORD = '123456';
export const DEFAULT_STUDENT_EMAILS = [
  'aluno1@urca.br',
  'aluno2@urca.br',
  'aluno3@urca.br'
];

export const STORAGE_AUTH_SESSION = 'bodega_caju_auth_session_v1';
export const STORAGE_ACCESS_CONFIG = 'bodega_caju_access_config_v1';

/**
 * Obtém as configurações de acesso (senha dos alunos e lista de emails autorizados)
 */
export function getAccessConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_ACCESS_CONFIG);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        studentPassword: parsed.studentPassword || DEFAULT_STUDENT_PASSWORD,
        studentEmails: Array.isArray(parsed.studentEmails) ? parsed.studentEmails : DEFAULT_STUDENT_EMAILS
      };
    }
  } catch (err) {
    console.error('Erro ao ler access config:', err);
  }

  // Padrão inicial
  const initial = {
    studentPassword: DEFAULT_STUDENT_PASSWORD,
    studentEmails: DEFAULT_STUDENT_EMAILS
  };
  saveAccessConfig(initial);
  return initial;
}

/**
 * Salva as configurações de acesso
 */
export function saveAccessConfig(config) {
  try {
    localStorage.setItem(STORAGE_ACCESS_CONFIG, JSON.stringify(config));
  } catch (err) {
    console.error('Erro ao salvar access config:', err);
  }
}

/**
 * Atualiza a senha única dos alunos
 */
export function updateStudentPassword(newPassword) {
  const trimmed = (newPassword || '').trim();
  if (!trimmed) {
    return { success: false, error: 'A senha não pode ser vazia.' };
  }
  const config = getAccessConfig();
  config.studentPassword = trimmed;
  saveAccessConfig(config);
  return { success: true, password: trimmed };
}

/**
 * Adiciona novos e-mails de estudantes.
 * Valida rigorosamente que todos os e-mails terminem com @urca.br
 */
export function addStudentEmails(inputText) {
  if (!inputText || typeof inputText !== 'string') {
    return { success: false, error: 'Insira ao menos um e-mail válido.' };
  }

  const lines = inputText
    .split(/[\n,;]+/)
    .map(line => line.trim().toLowerCase())
    .filter(Boolean);

  if (lines.length === 0) {
    return { success: false, error: 'Nenhum e-mail informado.' };
  }

  const invalidEmails = [];
  const validEmails = [];

  lines.forEach(email => {
    // Validação estrita: deve terminar com @urca.br e ter formato válido de email
    const emailRegex = /^[^\s@]+@urca\.br$/i;
    if (emailRegex.test(email)) {
      validEmails.push(email);
    } else {
      invalidEmails.push(email);
    }
  });

  if (invalidEmails.length > 0) {
    return {
      success: false,
      error: `Os seguintes e-mails são inválidos ou não terminam com @urca.br: ${invalidEmails.join(', ')}`,
      invalidEmails
    };
  }

  const config = getAccessConfig();
  const currentSet = new Set(config.studentEmails.map(e => e.toLowerCase()));
  let addedCount = 0;

  validEmails.forEach(email => {
    if (!currentSet.has(email)) {
      currentSet.add(email);
      addedCount++;
    }
  });

  config.studentEmails = Array.from(currentSet).sort();
  saveAccessConfig(config);

  return {
    success: true,
    addedCount,
    totalCount: config.studentEmails.length,
    studentEmails: config.studentEmails
  };
}

/**
 * Remove um e-mail da lista de alunos autorizados
 */
export function removeStudentEmail(emailToRemove) {
  const config = getAccessConfig();
  const target = (emailToRemove || '').trim().toLowerCase();
  config.studentEmails = config.studentEmails.filter(e => e.toLowerCase() !== target);
  saveAccessConfig(config);
  return { success: true, studentEmails: config.studentEmails };
}

/**
 * Obtém a sessão autenticada ativa
 */
export function getAuthSession() {
  try {
    const raw = localStorage.getItem(STORAGE_AUTH_SESSION);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Erro ao ler auth session:', err);
  }
  return null;
}

/**
 * Salva a sessão autenticada
 */
export function saveAuthSession(session) {
  try {
    localStorage.setItem(STORAGE_AUTH_SESSION, JSON.stringify(session));
  } catch (err) {
    console.error('Erro ao salvar auth session:', err);
  }
}

/**
 * Remove a sessão ativa (Logout)
 */
export function clearAuthSession() {
  try {
    localStorage.removeItem(STORAGE_AUTH_SESSION);
  } catch (err) {
    console.error('Erro ao remover auth session:', err);
  }
}

/**
 * Realiza a autenticação de login
 * @param {string} email
 * @param {string} password
 */
export function authenticateUser(email, password) {
  const normEmail = (email || '').trim().toLowerCase();
  const normPass = (password || '').trim();

  if (!normEmail || !normPass) {
    return { 
      success: false, 
      error: 'Por favor, preencha o e-mail institucional e a senha.' 
    };
  }

  // 1. Verificação do Administrador
  if (normEmail === ADMIN_EMAIL.toLowerCase()) {
    if (normPass === ADMIN_PASSWORD) {
      const userSession = {
        email: ADMIN_EMAIL,
        role: 'admin',
        name: 'Prof. Rama Lucas (Admin)',
        loggedAt: new Date().toISOString()
      };
      saveAuthSession(userSession);
      return { success: true, session: userSession };
    } else {
      return { 
        success: false, 
        error: 'Senha incorreta para a conta de administrador.' 
      };
    }
  }

  // 2. Verificação de Aluno
  // Deve ter domínio @urca.br
  if (!normEmail.endsWith('@urca.br')) {
    return { 
      success: false, 
      error: 'O e-mail deve ter o domínio institucional @urca.br' 
    };
  }

  const config = getAccessConfig();

  // Verifica se o e-mail está na lista de alunos cadastrados pelo administrador
  const isRegistered = config.studentEmails.some(e => e.trim().toLowerCase() === normEmail);
  if (!isRegistered) {
    return { 
      success: false, 
      error: 'E-mail institucional não cadastrado na turma. Solicite ao professor a inclusão do seu e-mail no painel.' 
    };
  }

  // Verifica a senha única dos alunos
  if (normPass !== config.studentPassword) {
    return { 
      success: false, 
      error: 'Senha incorreta para alunos. Verifique a senha da turma com o professor.' 
    };
  }

  // Sucesso Aluno
  const studentSession = {
    email: normEmail,
    role: 'aluno',
    name: normEmail.split('@')[0],
    loggedAt: new Date().toISOString()
  };
  saveAuthSession(studentSession);
  return { success: true, session: studentSession };
}
