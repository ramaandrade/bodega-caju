import React, { useState } from 'react';
import { Search, X, BookOpen, Layers } from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/glossary';

export function GlossarioModal({ onClose }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = ['Todas', ...new Set(GLOSSARY_TERMS.map(t => t.category))];

  const filteredTerms = GLOSSARY_TERMS.filter(item => {
    const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
    const matchesSearch = item.term.toLowerCase().includes(search.toLowerCase()) ||
                          item.description.toLowerCase().includes(search.toLowerCase()) ||
                          item.formula.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3">
      <div className="bg-stone-900 border border-amber-600/40 rounded-3xl max-w-md w-full h-[85vh] flex flex-col shadow-2xl text-stone-100 overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="p-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="font-bold text-base text-amber-200">Glossário CAJU & Fórmulas</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-stone-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter */}
        <div className="p-3 border-b border-stone-800 space-y-2 bg-stone-950/60">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input 
              type="text"
              placeholder="Buscar termos, fórmulas ou leis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-800 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex gap-1 overflow-x-auto no-scrollbar py-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-8 text-stone-500 text-xs">
              Nenhum termo encontrado para sua busca.
            </div>
          ) : (
            filteredTerms.map((item, idx) => (
              <div key={idx} className="bg-stone-800/80 rounded-2xl p-3 border border-stone-700/60 shadow-sm space-y-1.5">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-sm text-amber-300">{item.term}</h3>
                  <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-700 text-stone-300 font-semibold">
                    {item.category}
                  </span>
                </div>

                <div className="bg-stone-900/90 px-2.5 py-1.5 rounded-lg border border-amber-900/30 font-mono text-[11px] text-amber-200">
                  {item.formula}
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">
                  {item.description}
                </p>

                {item.example && (
                  <p className="text-[11px] text-amber-100/70 bg-amber-950/30 p-2 rounded-lg border border-amber-800/20 italic">
                    💡 Exemplo: {item.example}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
