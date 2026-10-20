// =====================================================================
// SERVIÇO DE BANCO DE DADOS NA NUVEM — SUPABASE (BODEGA CAJU / URCA)
// =====================================================================

import { createClient } from '@supabase/supabase-js';

export const STORAGE_SUPABASE_CONFIG = 'bodega_caju_supabase_config_v1';

// SQL para criação rápida das tabelas no SQL Editor do Supabase
export const SUPABASE_SCHEMA_SQL = `-- =====================================================================
-- BODEGA CAJU (URCA) — SCHEMA DE BANCO DE DADOS (SUPABASE POSTGRESQL)
-- Execute este script no SQL Editor do seu projeto Supabase
-- =====================================================================

-- 1. Tabela de Alunos Cadastrados
CREATE TABLE IF NOT EXISTS caju_students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela de Configurações da Turma (Senha e Trilhas Liberadas)
CREATE TABLE IF NOT EXISTS caju_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE caju_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE caju_config ENABLE ROW LEVEL SECURITY;

-- 4. Políticas para permitir leitura e escrita pública com a Chave Anon
-- (Para uso acadêmico/turma URCA)
DROP POLICY IF EXISTS "Permitir leitura de alunos" ON caju_students;
CREATE POLICY "Permitir leitura de alunos" ON caju_students FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir inserção de alunos" ON caju_students;
CREATE POLICY "Permitir inserção de alunos" ON caju_students FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir atualização de alunos" ON caju_students;
CREATE POLICY "Permitir atualização de alunos" ON caju_students FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Permitir exclusão de alunos" ON caju_students;
CREATE POLICY "Permitir exclusão de alunos" ON caju_students FOR DELETE USING (true);

DROP POLICY IF EXISTS "Permitir leitura de config" ON caju_config;
CREATE POLICY "Permitir leitura de config" ON caju_config FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir inserção/atualização de config" ON caju_config;
CREATE POLICY "Permitir inserção/atualização de config" ON caju_config FOR ALL USING (true);

-- 5. Inserir valores iniciais padrão (se ainda não existirem)
INSERT INTO caju_config (key, value)
VALUES 
  ('access_config', '{"studentPassword": "123456"}'::jsonb),
  ('stages_config', '{"allUnlocked": false, "unlockedStages": [1]}'::jsonb)
ON CONFLICT (key) DO NOTHING;

INSERT INTO caju_students (email, name)
VALUES 
  ('aluno1@urca.br', 'Aluno 1 (Demonstração)'),
  ('aluno2@urca.br', 'Aluno 2 (Demonstração)'),
  ('aluno3@urca.br', 'Aluno 3 (Demonstração)')
ON CONFLICT (email) DO NOTHING;
`;

let cachedClient = null;
let lastUsedConfig = null;

/**
 * Obtém as credenciais ativas do Supabase (lendo de .env ou de localStorage)
 */
export function getSupabaseConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_SUPABASE_CONFIG);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.url && parsed.anonKey) {
        return {
          url: parsed.url.trim(),
          anonKey: parsed.anonKey.trim(),
          isConfigured: true,
          source: 'local'
        };
      }
    }
  } catch (err) {
    console.error('Erro ao ler config do Supabase do localStorage:', err);
  }

  // Fallback para variáveis de ambiente Vite (se configuradas no deploy)
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (envUrl && envKey) {
    return {
      url: envUrl.trim(),
      anonKey: envKey.trim(),
      isConfigured: true,
      source: 'env'
    };
  }

  return {
    url: '',
    anonKey: '',
    isConfigured: false,
    source: 'none'
  };
}

export function cleanSupabaseUrl(url) {
  if (!url) return '';
  let clean = url.trim();
  // Remove /rest/v1 se o usuário tiver copiado o endpoint completo
  clean = clean.replace(/\/rest\/v1\/?$/i, '');
  // Remove barras finais
  clean = clean.replace(/\/+$/, '');
  return clean;
}

/**
 * Salva as credenciais do Supabase no localStorage
 */
export function saveSupabaseConfig(url, anonKey) {
  const trimmedUrl = cleanSupabaseUrl(url);
  const trimmedKey = (anonKey || '').trim();

  if (!trimmedUrl || !trimmedKey) {
    localStorage.removeItem(STORAGE_SUPABASE_CONFIG);
    cachedClient = null;
    lastUsedConfig = null;
    return { success: false, error: 'URL e Anon Key são obrigatórios.' };
  }

  try {
    localStorage.setItem(
      STORAGE_SUPABASE_CONFIG, 
      JSON.stringify({ url: trimmedUrl, anonKey: trimmedKey, updatedAt: new Date().toISOString() })
    );
    cachedClient = null; // força recriação do cliente
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Remove a configuração do Supabase
 */
export function clearSupabaseConfig() {
  localStorage.removeItem(STORAGE_SUPABASE_CONFIG);
  cachedClient = null;
  lastUsedConfig = null;
}

/**
 * Retorna uma instância do Supabase Client ou null
 */
export function getSupabaseClient() {
  const config = getSupabaseConfig();
  if (!config.isConfigured) return null;

  if (
    cachedClient && 
    lastUsedConfig?.url === config.url && 
    lastUsedConfig?.anonKey === config.anonKey
  ) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(config.url, config.anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
    lastUsedConfig = config;
    return cachedClient;
  } catch (err) {
    console.error('Falha ao inicializar cliente Supabase:', err);
    return null;
  }
}

/**
 * Testa a conexão com o Supabase e verifica se as tabelas existem
 */
export async function testSupabaseConnection(customUrl = null, customKey = null) {
  let client;
  if (customUrl && customKey) {
    try {
      client = createClient(cleanSupabaseUrl(customUrl), customKey.trim(), {
        auth: { persistSession: false }
      });
    } catch (e) {
      return { success: false, error: `URL ou chave inválida: ${e.message}` };
    }
  } else {
    client = getSupabaseClient();
  }

  if (!client) {
    return { success: false, error: 'Supabase não está configurado. Preencha a URL e a Anon Key.' };
  }

  try {
    const { data, error, count } = await client
      .from('caju_students')
      .select('email', { count: 'exact', head: false })
      .limit(5);

    if (error) {
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return { 
          success: false, 
          error: 'Conexão efetuada, mas a tabela "caju_students" não existe! Execute o Script SQL fornecido no SQL Editor do Supabase.',
          needSchema: true
        };
      }
      return { success: false, error: `Erro no Supabase: ${error.message}` };
    }

    return { 
      success: true, 
      message: 'Conexão com o banco de dados Supabase realizada com sucesso!',
      studentCount: count ?? data?.length ?? 0
    };
  } catch (err) {
    return { success: false, error: `Falha de rede ao conectar com Supabase: ${err.message}` };
  }
}

/**
 * Busca a lista de alunos cadastrados no banco de dados Supabase
 */
export async function fetchStudentsFromDb() {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('caju_students')
      .select('id, email, name, created_at')
      .order('email', { ascending: true });

    if (error) {
      console.warn('Erro ao buscar alunos no Supabase:', error.message);
      return null;
    }

    return data || [];
  } catch (err) {
    console.warn('Exceção ao buscar alunos no Supabase:', err);
    return null;
  }
}

/**
 * Insere um novo aluno no banco de dados Supabase
 */
export async function insertStudentToDb(email, name = '') {
  const client = getSupabaseClient();
  if (!client) return { success: false, offline: true };

  const normEmail = (email || '').trim().toLowerCase();
  try {
    const { data, error } = await client
      .from('caju_students')
      .insert([{ email: normEmail, name: name || normEmail.split('@')[0] }])
      .select();

    if (error) {
      if (error.code === '23505') {
        return { success: false, error: 'Este e-mail já está cadastrado no banco de dados.' };
      }
      return { success: false, error: error.message };
    }

    return { success: true, student: data?.[0] };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Atualiza um aluno no banco de dados Supabase
 */
export async function updateStudentInDb(oldEmail, newEmail) {
  const client = getSupabaseClient();
  if (!client) return { success: false, offline: true };

  const normOld = (oldEmail || '').trim().toLowerCase();
  const normNew = (newEmail || '').trim().toLowerCase();

  try {
    const { data, error } = await client
      .from('caju_students')
      .update({ email: normNew, updated_at: new Date().toISOString() })
      .eq('email', normOld)
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, student: data?.[0] };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Remove um aluno do banco de dados Supabase
 */
export async function deleteStudentFromDb(email) {
  const client = getSupabaseClient();
  if (!client) return { success: false, offline: true };

  const normEmail = (email || '').trim().toLowerCase();
  try {
    const { error } = await client
      .from('caju_students')
      .delete()
      .eq('email', normEmail);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Remove todos os alunos do banco de dados Supabase
 */
export async function clearAllStudentsFromDb() {
  const client = getSupabaseClient();
  if (!client) return { success: false, offline: true };

  try {
    const { error } = await client
      .from('caju_students')
      .delete()
      .neq('email', '___never_match___');

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Busca a configuração de acesso (senha dos alunos) no banco de dados Supabase
 */
export async function fetchAccessConfigFromDb() {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('caju_config')
      .select('value')
      .eq('key', 'access_config')
      .single();

    if (error) return null;
    return data?.value || null;
  } catch (err) {
    return null;
  }
}

/**
 * Salva a configuração de acesso (senha dos alunos) no banco de dados Supabase
 */
export async function saveAccessConfigToDb(accessConfig) {
  const client = getSupabaseClient();
  if (!client) return { success: false, offline: true };

  try {
    const { error } = await client
      .from('caju_config')
      .upsert({
        key: 'access_config',
        value: {
          studentPassword: accessConfig.studentPassword,
          updatedAt: new Date().toISOString()
        },
        updated_at: new Date().toISOString()
      });

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Sincroniza em lote a lista local de alunos com o banco de dados Supabase
 */
export async function syncLocalStudentsToDb(emails) {
  const client = getSupabaseClient();
  if (!client) return { success: false, error: 'Supabase não conectado.' };

  const records = emails.map(email => ({
    email: email.trim().toLowerCase(),
    name: email.split('@')[0]
  }));

  try {
    const { data, error } = await client
      .from('caju_students')
      .upsert(records, { onConflict: 'email' })
      .select();

    if (error) return { success: false, error: error.message };
    return { success: true, count: data?.length || records.length };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
