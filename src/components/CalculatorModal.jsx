import React, { useState } from 'react';
import { Delete, X } from 'lucide-react';

export function CalculatorModal({ onClose }) {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleDigit = (d) => {
    if (display === '0') {
      setDisplay(String(d));
    } else {
      setDisplay(display + d);
    }
  };

  const handleOp = (op) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleEqual = () => {
    try {
      const full = equation + display;
      // safe eval using Function
      const sanitized = full.replace(/×/g, '*').replace(/÷/g, '/');
      // eslint-disable-next-line no-new-func
      const result = Function(`'use strict'; return (${sanitized})`)();
      setDisplay(String(Number(result.toFixed(4))));
      setEquation('');
    } catch {
      setDisplay('Erro');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-amber-600/50 rounded-3xl max-w-xs w-full p-4 shadow-2xl text-stone-100 animate-in zoom-in-95">
        <div className="flex justify-between items-center pb-2 border-b border-stone-800">
          <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">Calculadora Financeira</span>
          <button onClick={onClose} className="p-1 rounded-full text-stone-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Screen */}
        <div className="my-3 bg-stone-950 p-3 rounded-2xl border border-stone-800 text-right font-mono">
          <div className="text-[11px] text-stone-500 h-4 overflow-hidden">{equation}</div>
          <div className="text-2xl font-bold text-amber-300 truncate">{display}</div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-2 text-sm font-semibold">
          <button onClick={handleClear} className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-rose-400 active:scale-95">C</button>
          <button onClick={() => setDisplay(prev => prev.startsWith('-') ? prev.slice(1) : '-' + prev)} className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 active:scale-95">±</button>
          <button onClick={() => setDisplay(prev => String(Number(prev) / 100))} className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 active:scale-95">%</button>
          <button onClick={() => handleOp('÷')} className="p-3 rounded-xl bg-amber-600/30 text-amber-300 hover:bg-amber-600/50 active:scale-95">÷</button>

          <button onClick={() => handleDigit('7')} className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white active:scale-95">7</button>
          <button onClick={() => handleDigit('8')} className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white active:scale-95">8</button>
          <button onClick={() => handleDigit('9')} className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white active:scale-95">9</button>
          <button onClick={() => handleOp('×')} className="p-3 rounded-xl bg-amber-600/30 text-amber-300 hover:bg-amber-600/50 active:scale-95">×</button>

          <button onClick={() => handleDigit('4')} className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white active:scale-95">4</button>
          <button onClick={() => handleDigit('5')} className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white active:scale-95">5</button>
          <button onClick={() => handleDigit('6')} className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white active:scale-95">6</button>
          <button onClick={() => handleOp('-')} className="p-3 rounded-xl bg-amber-600/30 text-amber-300 hover:bg-amber-600/50 active:scale-95">−</button>

          <button onClick={() => handleDigit('1')} className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white active:scale-95">1</button>
          <button onClick={() => handleDigit('2')} className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white active:scale-95">2</button>
          <button onClick={() => handleDigit('3')} className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white active:scale-95">3</button>
          <button onClick={() => handleOp('+')} className="p-3 rounded-xl bg-amber-600/30 text-amber-300 hover:bg-amber-600/50 active:scale-95">+</button>

          <button onClick={() => handleDigit('0')} className="col-span-2 p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white active:scale-95">0</button>
          <button onClick={() => handleDigit('.')} className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white active:scale-95">,</button>
          <button onClick={handleEqual} className="p-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold active:scale-95 shadow-md">=</button>
        </div>
      </div>
    </div>
  );
}
