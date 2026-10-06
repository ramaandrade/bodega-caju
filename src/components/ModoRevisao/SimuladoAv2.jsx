import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Timer, 
  Calculator, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles,
  Award,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { REVIEW_QUESTIONS_AV2 } from '../../data/reviewQuestions';

export function SimuladoAv2({ onOpenCalculator }) {
  const [questions, setQuestions] = useState(REVIEW_QUESTIONS_AV2);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 min timer
  const [timerActive, setTimerActive] = useState(true);

  // Timer countdown
  useEffect(() => {
    if (!timerActive || finished) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, finished]);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (optIdx) => {
    if (finished) return;
    setAnswers(prev => ({ ...prev, [currentQ.id]: optIdx }));
  };

  const handleFinish = () => {
    setFinished(true);
    setTimerActive(false);
    confetti({ particleCount: 70, spread: 80 });
  };

  const handleRestart = () => {
    setAnswers({});
    setFinished(false);
    setCurrentIdx(0);
    setTimeLeft(25 * 60);
    setTimerActive(true);
  };

  // Score calculation
  let correctCount = 0;
  questions.forEach(q => {
    if (answers[q.id] === q.answerIndex) {
      correctCount++;
    }
  });

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="space-y-4 pb-20 text-xs">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-amber-950 text-amber-50 p-4 rounded-3xl border border-red-700/50 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-red-300 font-bold uppercase tracking-wider text-[11px]">
            <GraduationCap className="w-4 h-4" />
            <span>Simulado Oficial · Avaliação 2 (URCA)</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono font-bold text-amber-300 bg-black/40 px-3 py-1 rounded-full border border-amber-500/30">
            <Timer className="w-3.5 h-3.5 text-amber-400" />
            <span>{timeFormatted}</span>
          </div>
        </div>

        <h1 className="text-base font-extrabold text-white">
          Treinamento Cronometrado (Etapas 3 e 5 a 10)
        </h1>
        <p className="text-[11px] text-stone-300 mt-1">
          {questions.length} questões com cálculos reais, fórmulas e calculadora de apoio.
        </p>
      </div>

      {!finished ? (
        <div className="bg-white border border-stone-200 rounded-3xl p-4 shadow-sm space-y-4">
          {/* Question Stepper & Formula Header */}
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <span className="font-bold text-stone-500 text-[11px]">
              Questão {currentIdx + 1} de {questions.length} · Estação {currentQ.stageNumber}
            </span>
            <button
              onClick={onOpenCalculator}
              className="flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-xl"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calculadora</span>
            </button>
          </div>

          {/* Formula Display Box */}
          {currentQ.formula && (
            <div className="bg-stone-900 text-amber-300 p-2.5 rounded-xl font-mono text-[11px] border border-stone-800">
              <span className="text-[9px] uppercase tracking-wider text-stone-400 block mb-0.5">Fórmula de Apoio:</span>
              {currentQ.formula}
            </div>
          )}

          {/* Enunciado */}
          <p className="text-sm font-bold text-stone-900 leading-snug">
            {currentQ.question}
          </p>

          {/* Options */}
          <div className="space-y-2">
            {currentQ.options.map((opt, oIndex) => {
              const isSelected = answers[currentQ.id] === oIndex;
              return (
                <button
                  key={oIndex}
                  onClick={() => handleSelectOption(oIndex)}
                  className={`w-full p-3 rounded-2xl border text-left text-xs transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-white font-bold border-amber-600 shadow-sm'
                      : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Nav arrows between questions */}
          <div className="flex items-center justify-between pt-2 border-t border-stone-100">
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(prev => prev - 1)}
              className="px-3 py-1.5 rounded-xl border border-stone-300 text-stone-600 font-bold text-xs disabled:opacity-40"
            >
              ◀ Anterior
            </button>

            {currentIdx < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow"
              >
                Próxima ▶
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-xs shadow"
              >
                Finalizar Simulado 🏁
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-4">
          <div className="bg-stone-900 text-amber-50 p-5 rounded-3xl text-center space-y-2 shadow-xl border border-amber-500/30">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
              Resultado do Simulado Avaliação 2
            </span>
            <div className="text-4xl font-black text-amber-300 font-mono">
              {correctCount} / {questions.length}
            </div>
            <p className="text-xs text-stone-300">
              Taxa de acerto: {Math.round((correctCount / questions.length) * 100)}%
            </p>
            <div className="pt-2">
              <span className={`px-3 py-1 rounded-full font-bold text-xs ${
                correctCount >= 11 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}>
                {correctCount >= 11 ? '🏆 Preparado para a Av2!' : '⚠️ Revise as questões de cálculo abaixo'}
              </span>
            </div>

            <button
              onClick={handleRestart}
              className="mt-3 flex items-center justify-center gap-1 mx-auto px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Tentar Novamente</span>
            </button>
          </div>

          {/* Step by step review of all questions */}
          <div className="space-y-3">
            <h3 className="font-bold text-stone-700 text-sm">Gabarito Comentado com Cálculos:</h3>
            {questions.map((q, idx) => {
              const userAns = answers[q.id];
              const isHit = userAns === q.answerIndex;

              return (
                <div key={q.id} className="bg-white border border-stone-200 p-3.5 rounded-2xl shadow-sm space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-xs text-stone-900">
                      {idx + 1}. {q.question}
                    </span>
                    <span className="text-base">{isHit ? '✅' : '❌'}</span>
                  </div>

                  <div className="text-[11px] space-y-1">
                    <div className="text-stone-500">
                      Sua resposta: <span className={isHit ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                        {userAns !== undefined ? q.options[userAns] : 'Em branco'}
                      </span>
                    </div>
                    {!isHit && (
                      <div className="text-emerald-700 font-bold">
                        Gabarito: {q.options[q.answerIndex]}
                      </div>
                    )}
                  </div>

                  <div className="bg-stone-900 text-amber-50 p-2.5 rounded-xl text-[11px] border border-stone-800">
                    <span className="text-amber-400 font-bold block mb-0.5">Resolução Passo a Passo:</span>
                    <p className="text-stone-300 font-mono">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
