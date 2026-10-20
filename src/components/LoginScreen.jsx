import React, { useState } from 'react';
import { 
  LogIn, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Sparkles, 
  GraduationCap,
  KeyRound,
  AlertCircle
} from 'lucide-react';
import { 
  authenticateUser 
} from '../utils/auth';
import confetti from 'canvas-confetti';

export function LoginScreen({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const res = authenticateUser(email, password);
      setIsLoading(false);

      if (res.success) {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
        onLoginSuccess(res.session);
      } else {
        setErrorMessage(res.error);
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header Branding */}
        <div className="text-center mb-6 space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-600 via-amber-700 to-orange-600 text-3xl shadow-xl shadow-amber-900/20 border-2 border-amber-300/60 animate-float">
            🌰
          </div>
          <div>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">
              Bodega CAJU
            </h1>
            <div className="flex items-center justify-center gap-1.5 mt-1 text-xs font-bold text-amber-900">
              <GraduationCap className="w-4 h-4 text-amber-700" />
              <span>Universidade Regional do Cariri · URCA</span>
            </div>
            <p className="text-[11px] text-stone-600 max-w-xs mx-auto mt-0.5">
              Educação Financeira & Gestão de Negócios para Pequenos Empreendimentos
            </p>
          </div>
        </div>

        {/* Card do Formulário de Acesso (fiel à imagem enviada) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-stone-200/60 border border-stone-200/80">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo E-mail institucional */}
            <div>
              <label 
                htmlFor="email-input" 
                className="block text-sm font-semibold text-stone-900 mb-1.5"
              >
                E-mail institucional
              </label>
              <div className="relative">
                <input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="seu@urca.br"
                  required
                  autoCapitalize="none"
                  autoCorrect="off"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1e6f5c] focus:border-transparent transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label 
                htmlFor="password-input" 
                className="block text-sm font-semibold text-stone-900 mb-1.5"
              >
                Senha
              </label>
              <div className="relative">
                <input
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Digite sua senha"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1e6f5c] focus:border-transparent transition-all shadow-sm pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-700 transition-colors"
                  aria-label={showPassword ? 'Ocultar senha' : 'Ver senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Mensagem de Erro com Alerta Visual */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            {/* Botão de Entrar (estilo exato da imagem enviada) */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#1e6f5c] hover:bg-[#155345] active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-emerald-900/10 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-70 mt-2"
            >
              <LogIn className="w-4 h-4" />
              <span>{isLoading ? 'Entrando...' : 'Entrar'}</span>
            </button>
          </form>
        </div>

        {/* Rodapé institucional */}
        <div className="text-center mt-5 text-[11px] text-stone-500">
          Campus Pimenta & São Miguel · Crato - CE · Bodega CAJU v1.0
        </div>
      </div>
    </div>
  );
}
