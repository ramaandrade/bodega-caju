import React from 'react';
import { 
  Compass, 
  Wrench, 
  Briefcase, 
  GraduationCap, 
  Users 
} from 'lucide-react';

export function BottomNav({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'trilha', label: 'Trilha', icon: Compass },
    { id: 'oficinas', label: 'Oficinas', icon: Wrench },
    { id: 'empreendedor', label: 'Ferramentas', icon: Briefcase },
    { id: 'revisao', label: 'Simulado Av2', icon: GraduationCap },
    { id: 'turma', label: 'Turma', icon: Users },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-stone-900/98 backdrop-blur-lg border-t border-amber-900/40 text-stone-300 py-1 px-2 safe-area-pb shadow-2xl">
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
                isActive
                  ? 'text-amber-400 bg-amber-500/10 font-bold scale-105'
                  : 'text-stone-400 hover:text-stone-200 active:scale-95'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
              <span className="text-[10px] tracking-tight truncate w-full text-center">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
