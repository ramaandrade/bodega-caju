import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Wrench, 
  CheckCircle2, 
  HelpCircle, 
  Compass, 
  MapPin, 
  Award, 
  Sparkles,
  ChevronRight,
  Send,
  Camera,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../utils/audio';
import { OficinasHub } from './Oficinas/OficinasHub';

export function StageView({ 
  stage, 
  gameState, 
  onBack, 
  onCompleteStage, 
  onUpdateCash, 
  onRewardCajus,
  onSaveReflection,
  onSaveFieldMission 
}) {
  const { businessState, gamification, reflections, fieldMissions, settings } = gameState;
  const [activeMoment, setActiveMoment] = useState(0); // 0 to 6
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Moments list
  const moments = [
    { id: 'causo', title: '1. Causo', icon: '👴🏽' },
    { id: 'cartas', title: '2. Cartas de Saber', icon: '🃏' },
    { id: 'oficina', title: '3. Oficina', icon: '🛠️' },
    { id: 'desafio', title: '4. Desafio', icon: '🎯' },
    { id: 'lente', title: '5. Lente CAJU', icon: '🔍' },
    { id: 'realidade', title: '6. Realidade Local', icon: '📍' },
    { id: 'missao', title: '7. Missão & Selo', icon: '🥇' },
  ];

  // Desafio Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Lente Reflexão State
  const [reflectionText, setReflectionText] = useState(reflections[stage.id] || '');
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Missão de Campo State
  const [missionText, setMissionText] = useState(fieldMissions[stage.id]?.text || '');
  const [missionSubmitted, setMissionSubmitted] = useState(Boolean(fieldMissions[stage.id]));

  // TTS Audio Playback
  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      audioManager.stop();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      const textToRead = `${stage.causo.speaker} conta: ${stage.causo.promptAudio || stage.causo.text}`;
      audioManager.speak(textToRead, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  // Submit Desafio
  const handleSubmitQuiz = () => {
    let score = 0;
    stage.challengeQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.answerIndex) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);

    const prataBadge = score >= 4; // 80%
    if (prataBadge) {
      confetti({ particleCount: 60, spread: 70 });
    }
    onCompleteStage(stage.id, { prata: prataBadge, score });
  };

  // Save Reflection
  const handleSaveReflection = () => {
    if (!reflectionText.trim()) return;
    onSaveReflection(stage.id, reflectionText);
    setReflectionSaved(true);
    setTimeout(() => setReflectionSaved(false), 2500);
  };

  // Submit Field Mission
  const handleSubmitMission = () => {
    if (!missionText.trim()) return;
    onSaveFieldMission(stage.id, { text: missionText, date: new Date().toLocaleDateString('pt-BR') });
    setMissionSubmitted(true);
    confetti({ particleCount: 70, spread: 80 });
  };

  const badgeInfo = gamification.badges?.[stage.id] || {};

  return (
    <div className="space-y-4 pb-24 animate-in fade-in">
      {/* Top Bar with Back and Stage Title */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Mapa</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
          <span>Estação {stage.id}/12</span>
          {badgeInfo.bronze && <span title="Selo Bronze">🥉</span>}
          {badgeInfo.prata && <span title="Selo Prata">🥈</span>}
          {badgeInfo.ouro && <span title="Selo Ouro">🥇</span>}
        </div>
      </div>

      {/* Stage Header Card */}
      <div className="bg-gradient-to-r from-amber-800 to-orange-900 text-amber-50 rounded-3xl p-4 shadow-lg border border-amber-600/40">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl shadow-inner">
            {stage.icon}
          </div>
          <div>
            <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase">
              {stage.stationName}
            </span>
            <h1 className="text-base font-extrabold text-white leading-tight">
              {stage.title}
            </h1>
          </div>
        </div>
      </div>

      {/* 4 Botões Principais do Ciclo (100% visíveis, sem corte na tela) */}
      <div className="grid grid-cols-4 gap-1.5 p-1 bg-amber-50/80 rounded-2xl border border-amber-200/80 shadow-sm">
        {moments.slice(0, 4).map((m, idx) => {
          const isActive = activeMoment === idx;
          return (
            <button
              key={m.id}
              onClick={() => setActiveMoment(idx)}
              className={`py-2 px-1 rounded-xl text-center flex flex-col items-center justify-center transition-all ${
                isActive
                  ? 'bg-amber-600 text-white shadow-md font-extrabold scale-[1.02]'
                  : 'bg-white border border-stone-200/90 text-stone-700 hover:bg-stone-50 font-bold'
              }`}
            >
              <span className="text-base sm:text-lg mb-0.5 leading-none">{m.icon}</span>
              <span className="text-[11px] sm:text-xs leading-tight font-extrabold whitespace-nowrap">
                {m.id === 'causo' && '1. Causo'}
                {m.id === 'cartas' && (
                  <>
                    <span>2. Cartas</span>
                    <span className="hidden sm:inline text-[9px] opacity-80"> de Saber</span>
                  </>
                )}
                {m.id === 'oficina' && '3. Oficina'}
                {m.id === 'desafio' && '4. Desafio'}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3 Momentos de Aprofundamento & Prática (Lente CAJU, Realidade Local, Missão & Selo) */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-100/70 rounded-2xl border border-stone-200/70">
        {moments.slice(4).map((m, idx) => {
          const realIdx = idx + 4;
          const isActive = activeMoment === realIdx;
          return (
            <button
              key={m.id}
              onClick={() => setActiveMoment(realIdx)}
              className={`py-1.5 px-1 rounded-xl text-center flex items-center justify-center gap-1 transition-all ${
                isActive
                  ? 'bg-amber-700 text-white shadow-md font-extrabold scale-[1.02]'
                  : 'bg-white/90 border border-stone-200/80 text-stone-600 hover:bg-white font-semibold'
              }`}
            >
              <span className="text-xs sm:text-sm leading-none">{m.icon}</span>
              <span className="text-[10px] sm:text-xs font-bold leading-tight whitespace-nowrap">
                {m.id === 'lente' && '5. Lente CAJU'}
                {m.id === 'realidade' && '6. Realidade'}
                {m.id === 'missao' && '7. Missão & Selo'}
              </span>
            </button>
          );
        })}
      </div>

      {/* ---------------- MOMENT 1: CAUSO ---------------- */}
      {activeMoment === 0 && (
        <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{stage.causo.avatar}</span>
              <div>
                <h3 className="font-extrabold text-sm text-stone-900">{stage.causo.speaker}</h3>
                <span className="text-[10px] text-amber-700 font-semibold">Mentor da Vila Araripe</span>
              </div>
            </div>

            {/* Audio TTS Button */}
            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                isPlayingAudio 
                  ? 'bg-rose-500 text-white animate-pulse' 
                  : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isPlayingAudio ? 'Parar Áudio' : 'Ouvir Causo'}</span>
            </button>
          </div>

          <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 italic text-stone-800 text-sm leading-relaxed relative">
            <span className="text-3xl text-amber-300 absolute -top-3 left-2 font-serif select-none">“</span>
            <p className="relative z-10 pl-2">
              {stage.causo.text}
            </p>
          </div>

          <div className="space-y-1.5 pt-2">
            <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
              Objetivos de Aprendizagem
            </span>
            <ul className="space-y-1 text-xs text-stone-700">
              {stage.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setActiveMoment(1)}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md active:scale-98"
          >
            <span>Avançar para as Cartas de Saber</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ---------------- MOMENT 2: CARTAS DE SABER ---------------- */}
      {activeMoment === 1 && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3">
            {stage.saberCards.map((card, i) => (
              <div 
                key={i}
                className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm space-y-2 hover:border-amber-400 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    {card.badge}
                  </span>
                  <span className="text-xs text-stone-400 font-semibold">Carta {i + 1}/4</span>
                </div>

                <h4 className="font-bold text-sm text-stone-900">{card.title}</h4>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">{card.content}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveMoment(2)}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md active:scale-98"
          >
            <span>Ir para a Oficina Prática</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ---------------- MOMENT 3: OFICINA ---------------- */}
      {activeMoment === 2 && (
        <div className="space-y-3">
          <OficinasHub 
            stageId={stage.id}
            businessState={businessState}
            onUpdateCash={onUpdateCash}
            onRewardCajus={onRewardCajus}
          />

          <button
            onClick={() => setActiveMoment(3)}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md active:scale-98"
          >
            <span>Avançar para o Desafio</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ---------------- MOMENT 4: DESAFIO (QUIZ) ---------------- */}
      {activeMoment === 3 && (
        <div className="space-y-4">
          <div className="bg-amber-100 border border-amber-300 p-3 rounded-2xl flex justify-between items-center">
            <div>
              <h4 className="font-bold text-amber-900 text-sm">Desafio da Estação: 5 Questões</h4>
              <p className="text-[11px] text-stone-700">Acertando 80% (4 ou mais) você conquista o Selo de Prata 🥈!</p>
            </div>
            {quizSubmitted && (
              <div className="text-right">
                <span className="text-[10px] text-stone-500 font-bold uppercase">Nota:</span>
                <div className="text-lg font-black text-amber-700">{quizScore} / 5</div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {stage.challengeQuestions.map((q, qIndex) => {
              const selectedIdx = quizAnswers[q.id];
              const isCorrect = selectedIdx === q.answerIndex;

              return (
                <div key={q.id} className="bg-white border border-stone-200 p-4 rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {qIndex + 1}
                    </span>
                    <h5 className="font-bold text-xs text-stone-900 leading-snug">
                      {q.question}
                    </h5>
                  </div>

                  <div className="space-y-1.5 pl-8">
                    {q.options.map((opt, optIndex) => {
                      let btnStyle = 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100';
                      if (selectedIdx === optIndex) {
                        btnStyle = 'bg-amber-500 text-white font-bold border-amber-600';
                      }
                      if (quizSubmitted) {
                        if (optIndex === q.answerIndex) {
                          btnStyle = 'bg-emerald-600 text-white font-bold border-emerald-700';
                        } else if (selectedIdx === optIndex && !isCorrect) {
                          btnStyle = 'bg-rose-500 text-white font-bold border-rose-600';
                        }
                      }

                      return (
                        <button
                          key={optIndex}
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: optIndex }))}
                          className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="mt-2 p-2.5 rounded-xl bg-stone-900 text-amber-50 text-[11px] space-y-1">
                      <div className="font-bold text-amber-400">
                        {isCorrect ? '✓ Resposta Correta!' : '✗ Justificativa Didática:'}
                      </div>
                      <p className="text-stone-300">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!quizSubmitted ? (
            <button
              disabled={Object.keys(quizAnswers).length < stage.challengeQuestions.length}
              onClick={handleSubmitQuiz}
              className={`w-full py-3 rounded-xl font-bold text-xs shadow-md transition-all ${
                Object.keys(quizAnswers).length === stage.challengeQuestions.length
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white active:scale-95'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              {Object.keys(quizAnswers).length === stage.challengeQuestions.length 
                ? 'Enviar Respostas do Desafio' 
                : `Responda todas as questões (${Object.keys(quizAnswers).length}/5)`}
            </button>
          ) : (
            <button
              onClick={() => setActiveMoment(4)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md active:scale-98"
            >
              <span>Explorar a Lente CAJU</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* ---------------- MOMENT 5: LENTE CAJU ---------------- */}
      {activeMoment === 4 && (
        <div className="space-y-4">
          <div className="bg-amber-100 border border-amber-300 p-3 rounded-2xl">
            <h4 className="font-bold text-amber-900 text-sm">Metodologia CAJU</h4>
            <p className="text-[11px] text-stone-700">
              Análise profunda: <b>C</b>idades, <b>A</b>nálise Institucional, <b>J</b>urídico e <b>U</b>bíquo.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            <div className="bg-white border-l-4 border-l-amber-600 border border-stone-200 p-3 rounded-2xl shadow-sm">
              <span className="font-black text-amber-700 text-xs uppercase tracking-wider">C — Cidades & Território</span>
              <p className="text-xs text-stone-700 mt-1 leading-relaxed">{stage.lenteCaju.cidades}</p>
            </div>

            <div className="bg-white border-l-4 border-l-orange-600 border border-stone-200 p-3 rounded-2xl shadow-sm">
              <span className="font-black text-orange-700 text-xs uppercase tracking-wider">A — Análise Institucional & Custos</span>
              <p className="text-xs text-stone-700 mt-1 leading-relaxed">{stage.lenteCaju.analise}</p>
            </div>

            <div className="bg-white border-l-4 border-l-emerald-600 border border-stone-200 p-3 rounded-2xl shadow-sm">
              <span className="font-black text-emerald-700 text-xs uppercase tracking-wider">J — Jurídico & Marcos Legais</span>
              <p className="text-xs text-stone-700 mt-1 leading-relaxed">{stage.lenteCaju.juridico}</p>
            </div>

            <div className="bg-white border-l-4 border-l-blue-600 border border-stone-200 p-3 rounded-2xl shadow-sm">
              <span className="font-black text-blue-700 text-xs uppercase tracking-wider">U — Ubíquo & Ferramentas de Bolso</span>
              <p className="text-xs text-stone-700 mt-1 leading-relaxed">{stage.lenteCaju.ubiquo}</p>
            </div>
          </div>

          {/* Pergunta Reflexiva Aberta */}
          <div className="bg-stone-900 text-amber-50 p-4 rounded-3xl space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Pergunta Reflexiva da Turma
            </span>
            <p className="text-xs font-semibold text-white">
              {stage.lenteCaju.reflexao}
            </p>
            <textarea
              rows={3}
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="Escreva sua reflexão econômica aqui (fica salva no seu portfólio da disciplina)..."
              className="w-full p-2.5 rounded-xl bg-stone-800 border border-stone-700 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
            <button
              onClick={handleSaveReflection}
              className="py-1.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs"
            >
              {reflectionSaved ? '✓ Reflexão Salva!' : 'Salvar no Portfólio'}
            </button>
          </div>

          <button
            onClick={() => setActiveMoment(5)}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md active:scale-98"
          >
            <span>Ver Realidade Local do Cariri</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ---------------- MOMENT 6: REALIDADE LOCAL ---------------- */}
      {activeMoment === 5 && (
        <div className="space-y-4">
          <div className="bg-white border border-stone-200 rounded-3xl p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-800">
              <MapPin className="w-5 h-5 text-amber-600" />
              <h4 className="font-extrabold text-sm">Economia Real do Cariri & Ceará</h4>
            </div>

            <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-xs text-stone-800 leading-relaxed font-sans">
              {stage.realidadeLocal}
            </div>

            <div className="text-[11px] text-stone-500 italic">
              Fontes: Sebrae Ceará (2025/2026), Banco Central (Copom), Banco do Nordeste (Crediamigo/Agroamigo) e Iniciação Científica URCA.
            </div>
          </div>

          <button
            onClick={() => setActiveMoment(6)}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md active:scale-98"
          >
            <span>Missão de Campo & Conquista de Selo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ---------------- MOMENT 7: MISSÃO DE CAMPO & SELO ---------------- */}
      {activeMoment === 6 && (
        <div className="space-y-4">
          {/* Selos Conquistados Card */}
          <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-amber-50 rounded-3xl p-4 border border-amber-500/30 text-center space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
              Selo da Estação
            </span>
            <div className="text-4xl animate-bounce">
              {stage.selo.icon}
            </div>
            <h3 className="text-base font-extrabold text-amber-200">
              {stage.selo.name}
            </h3>

            <div className="flex justify-center gap-4 pt-2 text-xs">
              <div className="flex items-center gap-1">
                <span>🥉</span>
                <span className={badgeInfo.bronze ? 'text-amber-400 font-bold' : 'text-stone-500'}>
                  Bronze (Concluída)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>🥈</span>
                <span className={badgeInfo.prata ? 'text-slate-200 font-bold' : 'text-stone-500'}>
                  Prata (Desafio 80%)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>🥇</span>
                <span className={badgeInfo.ouro ? 'text-yellow-400 font-bold' : 'text-stone-500'}>
                  Ouro (Missão)
                </span>
              </div>
            </div>
          </div>

          {/* Missão de Campo no Mundo Real */}
          <div className="bg-white border border-stone-200 p-4 rounded-3xl shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-600" />
              <h4 className="font-extrabold text-sm text-stone-900">Missão de Campo</h4>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed">
              {stage.missaoDeCampo}
            </p>

            <div className="space-y-2 pt-2">
              <label className="text-[11px] font-bold text-stone-700">
                Relato da sua entrevista ou pesquisa na cidade:
              </label>
              <textarea
                rows={3}
                disabled={missionSubmitted}
                value={missionText}
                onChange={(e) => setMissionText(e.target.value)}
                placeholder="Ex: Entrevistei o Seu Raimundo que vende frutas na praça. Ele me explicou que..."
                className="w-full p-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
              />

              {!missionSubmitted ? (
                <button
                  disabled={!missionText.trim()}
                  onClick={handleSubmitMission}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow ${
                    missionText.trim()
                      ? 'bg-amber-600 text-white hover:bg-amber-500 active:scale-95'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Missão e Ganhar Selo de Ouro 🥇</span>
                </button>
              ) : (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Missão de Campo enviada com sucesso! Selo de Ouro concedido.</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={onBack}
            className="w-full py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-amber-200 font-bold text-xs shadow-lg active:scale-98"
          >
            Voltar para o Mapa da Trilha da Chapada
          </button>
        </div>
      )}
    </div>
  );
}
