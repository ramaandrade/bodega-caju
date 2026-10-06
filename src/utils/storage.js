export const STORAGE_KEY = 'bodega_caju_save_v1';

export const LEVEL_TIERS = [
  { minXp: 0, title: 'Semente', icon: '🌱' },
  { minXp: 150, title: 'Muda', icon: '🌿' },
  { minXp: 400, title: 'Cajueiro', icon: '🌳' },
  { minXp: 800, title: 'Florada', icon: '🌸' },
  { minXp: 1400, title: 'Safra', icon: '🌰' },
  { minXp: 2200, title: 'Castanha de Ouro', icon: '🏆' },
];

export function getPlayerLevel(xp) {
  let current = LEVEL_TIERS[0];
  for (const tier of LEVEL_TIERS) {
    if (xp >= tier.minXp) {
      current = tier;
    }
  }
  return current;
}

export function loadGameState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load game state:', e);
  }
  return null;
}

export function saveGameState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save game state:', e);
  }
}

export function createInitialState(business, profileData = {}) {
  return {
    profile: {
      name: profileData.name || 'Estudante da URCA',
      role: profileData.role || 'aluno', // 'aluno', 'empreendedor', 'professor'
      classCode: profileData.classCode || 'URCA26',
      chosenBusinessId: business.id,
      consentLGPD: true,
      registeredAt: new Date().toISOString()
    },
    businessState: {
      id: business.id,
      name: business.name,
      owner: business.owner,
      cash: business.initialCash,
      reputation: business.reputation || 80,
      dailyFixedCost: business.dailyFixedCost,
      averagePrice: business.averagePrice,
      variableCostUnit: business.variableCostUnit
    },
    gamification: {
      xp: 0,
      cajus: 100, // starting currency
      badges: {}, // { stageId: { bronze: true, prata: false, ouro: false } }
      completedStages: [1], // stage 1 unlocked initially
      highestUnlockedStage: 1,
      quizScores: {}
    },
    reflections: {}, // { stageId: "text" }
    fieldMissions: {}, // { stageId: { text, photoUrl, status: 'enviada', feedback: '' } }
    caderninho: [
      { id: 1, date: '2026-10-01', desc: 'Venda de quentinhas do almoço', type: 'in', amount: 450.00, cat: 'Vendas' },
      { id: 2, date: '2026-10-02', desc: 'Compra de frango na feira do Crato', type: 'out', amount: 180.00, cat: 'Insumos' },
      { id: 3, date: '2026-10-02', desc: 'Embalagens e sacolas plásticas', type: 'out', amount: 45.00, cat: 'Embalagem' }
    ],
    fiado: [
      { id: 1, client: 'Seu Raimundo (Viginho)', value: 45.00, dueDate: '2026-10-15', status: 'pendente', phone: '88998765432' },
      { id: 2, client: 'Dona Toinha Costureira', value: 30.00, dueDate: '2026-10-10', status: 'pendente', phone: '88991234567' }
    ],
    recipes: [
      { id: 1, name: 'Quentinha Especial de Galinha Caipira', ingredients: 'Frango caipira, arroz, pirão, jerimum e cheiro verde', cva: 8.50, suggestedPrice: 15.00 }
    ],
    settings: {
      audioSpeech: true,
      highContrast: false,
      fontSize: 'normal' // 'normal' | 'large'
    }
  };
}
