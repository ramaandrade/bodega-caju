import React, { useState } from 'react';
import { Search, X, BookOpen, Layers, Filter, RotateCcw } from 'lucide-react';
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

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('Todas');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in">
      <div className="bg-stone-900 border border-amber-600/40 rounded-3xl max-w-lg w-full h-[88vh] flex flex-col shadow-2xl text-stone-100 overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="p-4 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm sm:text-base text-amber-200">
                Glossário CAJU & Fórmulas
              </h2>
              <span className="text-[10px] text-stone-400">
                Conceitos e fórmulas da Gestão Financeira
              </span>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            title="Fechar glossário"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Header */}
        <div className="p-3.5 border-b border-stone-800 space-y-2.5 bg-stone-950/70">
          {/* Campo de Busca */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
            <input 
              type="text"
              placeholder="Buscar termos, fórmulas ou leis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-stone-800 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-2.5 text-stone-400 hover:text-white"
                title="Limpar busca"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Categorias: Todos os botões visíveis (com wrap flexível) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-stone-400 px-0.5">
              <span className="font-bold flex items-center gap-1 text-stone-300">
                <Layers className="w-3 h-3 text-amber-400" />
                <span>Categorias de Conceitos ({categories.length}):</span>
              </span>
              {(selectedCategory !== 'Todas' || search) && (
                <button
                  onClick={handleResetFilters}
                  className="text-[10px] text-amber-400 hover:underline flex items-center gap-0.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Ver todas</span>
                </button>
              )}
            </div>

            {/* Grid flex-wrap de botões de categoria - TODOS VISÍVEIS */}
            <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1 no-scrollbar pt-0.5">
              {categories.map(cat => {
                const count = cat === 'Todas' 
                  ? GLOSSARY_TERMS.length 
                  : GLOSSARY_TERMS.filter(t => t.category === cat).length;
                const isSelected = selectedCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950 shadow-md ring-1 ring-amber-400 font-extrabold'
                        : 'bg-stone-800/90 hover:bg-stone-750 text-stone-300 hover:text-white border border-stone-700/80'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                      isSelected 
                        ? 'bg-stone-950/20 text-stone-950 font-black' 
                        : 'bg-stone-700 text-stone-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          <div className="text-[11px] text-stone-400 flex items-center justify-between px-1">
            <span>
              Exibindo <strong>{filteredTerms.length}</strong> de {GLOSSARY_TERMS.length} termos
            </span>
            {selectedCategory !== 'Todas' && (
              <span className="text-amber-400 font-semibold">
                Filtro: {selectedCategory}
              </span>
            )}
          </div>

          {filteredTerms.length === 0 ? (
            <div className="text-center py-12 text-stone-500 text-xs space-y-2">
              <BookOpen className="w-8 h-8 mx-auto text-stone-600 opacity-60" />
              <p className="font-semibold text-stone-400">Nenhum termo encontrado para sua busca.</p>
              <button
                onClick={handleResetFilters}
                className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-xl text-xs font-bold"
              >
                Limpar filtros e ver todos
              </button>
            </div>
          ) : (
            filteredTerms.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-stone-800/90 rounded-2xl p-3.5 border border-stone-700/70 shadow-sm space-y-2 hover:border-amber-500/40 transition-colors"
              >
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <h3 className="font-bold text-sm text-amber-300 leading-snug">
                    {item.term}
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-stone-700/80 text-stone-300 font-semibold border border-stone-600/50">
                    {item.category}
                  </span>
                </div>

                <div className="bg-stone-950/90 px-3 py-2 rounded-xl border border-amber-900/40 font-mono text-xs text-amber-200 leading-relaxed overflow-x-auto">
                  {item.formula}
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">
                  {item.description}
                </p>

                {item.example && (
                  <div className="text-[11px] text-amber-100/90 bg-amber-950/30 p-2.5 rounded-xl border border-amber-800/30 italic leading-relaxed">
                    💡 <strong className="not-italic text-amber-300">Exemplo prático:</strong> {item.example}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
