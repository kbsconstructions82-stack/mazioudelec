import React from 'react';
import { AlertTriangle, Calendar, Calculator, PhoneCall, ArrowRight, Zap, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface QuickActionHubProps {
  onOpenEmergency: () => void;
  onOpenAppointment: () => void;
  onOpenQuote: () => void;
  onOpenCallback: () => void;
}

export const QuickActionHub: React.FC<QuickActionHubProps> = ({
  onOpenEmergency,
  onOpenAppointment,
  onOpenQuote,
  onOpenCallback,
}) => {
  return (
    <section
      id="besoin-rapide"
      className="relative py-14 sm:py-20 bg-gradient-to-b from-[#020712] via-[#040c1d] to-[#020712] border-y border-cyan-500/20 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(0,210,255,0.15)]">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>PARCOURS RAPIDE • QUEL EST VOTRE BESOIN ?</span>
          </div>

          <h2
            id="hub-title"
            className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-3"
            style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
          >
            Comment pouvons-nous{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
              vous aider ?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Sélectionnez votre situation pour déclencher une prise en charge immédiate à{' '}
            <span className="text-cyan-300 font-semibold">Nègrepelisse</span> et dans tout le périmètre de 40 km.
          </p>
        </div>

        {/* 4 Large Interactive Cards - 2 COLUMNS ON MOBILE (grid-cols-2) & 4 COLUMNS ON DESKTOP */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {/* 1. 🚨 J'AI UNE URGENCE */}
          <button
            id="action-card-emergency"
            onClick={onOpenEmergency}
            className="group relative flex flex-col justify-between p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#160508]/90 via-[#0d0305]/95 to-[#080203] border-2 border-red-500/40 hover:border-red-400 text-left transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 shadow-[0_0_30px_rgba(255,46,68,0.15)] hover:shadow-[0_0_40px_rgba(255,46,68,0.35)] cursor-pointer overflow-hidden"
          >
            {/* Top pulse aura */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/15 rounded-full blur-2xl group-hover:bg-red-600/30 transition-all pointer-events-none" />

            <div>
              {/* Badge & Icon header */}
              <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-5">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-red-950/80 border border-red-500/60 flex items-center justify-center text-red-400 shadow-[0_0_20px_rgba(255,46,68,0.35)] group-hover:scale-110 transition-transform">
                  <AlertTriangle className="w-5 h-5 sm:w-7 sm:h-7 animate-pulse" />
                </div>
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-red-950/90 border border-red-500/50 text-red-300 font-bold text-[10px] sm:text-xs tracking-wide shrink-0">
                  6j/7 Express
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-sm sm:text-xl font-black text-white group-hover:text-red-300 transition-colors mb-1.5 sm:mb-2 leading-tight"
                style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
              >
                🚨 J'AI UNE URGENCE
              </h3>

              {/* Sub-description */}
              <p className="text-slate-300 text-xs sm:text-sm leading-snug line-clamp-3 mb-4">
                Panne générale, disjoncteur qui saute, odeur anormale : intervention prioritaire.
              </p>
            </div>

            {/* Action pill footer */}
            <div className="pt-3 border-t border-red-950/80 flex items-center justify-between text-xs font-bold text-red-400 group-hover:text-red-300">
              <span className="truncate">Déclencher l'urgence</span>
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </div>
          </button>

          {/* 2. 📅 JE VEUX PRENDRE RENDEZ-VOUS */}
          <button
            id="action-card-appointment"
            onClick={onOpenAppointment}
            className="group relative flex flex-col justify-between p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#061226]/90 via-[#030a17]/95 to-[#020610] border-2 border-sky-500/40 hover:border-sky-400 text-left transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 shadow-[0_0_30px_rgba(14,165,233,0.15)] hover:shadow-[0_0_40px_rgba(14,165,233,0.35)] cursor-pointer overflow-hidden"
          >
            {/* Top pulse aura */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/15 rounded-full blur-2xl group-hover:bg-sky-500/30 transition-all pointer-events-none" />

            <div>
              {/* Badge & Icon header */}
              <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-5">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-sky-950/80 border border-sky-400/60 flex items-center justify-center text-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.35)] group-hover:scale-110 transition-transform">
                  <Calendar className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-sky-950/90 border border-sky-400/50 text-sky-300 font-bold text-[10px] sm:text-xs tracking-wide shrink-0">
                  Sur-mesure
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-sm sm:text-xl font-black text-white group-hover:text-sky-300 transition-colors mb-1.5 sm:mb-2 leading-tight"
                style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
              >
                📅 JE VEUX UN RENDEZ-VOUS
              </h3>

              {/* Sub-description */}
              <p className="text-slate-300 text-xs sm:text-sm leading-snug line-clamp-3 mb-4">
                Planifiez une visite technique et un créneau adapté pour vos travaux électriques.
              </p>
            </div>

            {/* Action pill footer */}
            <div className="pt-3 border-t border-sky-950/80 flex items-center justify-between text-xs font-bold text-sky-400 group-hover:text-sky-300">
              <span className="truncate">Choisir un créneau</span>
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </div>
          </button>

          {/* 3. 💰 JE VEUX UN DEVIS */}
          <button
            id="action-card-quote"
            onClick={onOpenQuote}
            className="group relative flex flex-col justify-between p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#051c14]/90 via-[#03110d]/95 to-[#010806] border-2 border-emerald-500/40 hover:border-emerald-400 text-left transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:shadow-[0_0_40px_rgba(16,185,129,0.35)] cursor-pointer overflow-hidden"
          >
            {/* Top pulse aura */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/15 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-all pointer-events-none" />

            <div>
              {/* Badge & Icon header */}
              <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-5">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-emerald-950/80 border border-emerald-400/60 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)] group-hover:scale-110 transition-transform">
                  <Calculator className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-950/90 border border-emerald-400/50 text-emerald-300 font-bold text-[10px] sm:text-xs tracking-wide shrink-0">
                  100% Gratuit
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-sm sm:text-xl font-black text-white group-hover:text-emerald-300 transition-colors mb-1.5 sm:mb-2 leading-tight"
                style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
              >
                💰 JE VEUX UN DEVIS
              </h3>

              {/* Sub-description */}
              <p className="text-slate-300 text-xs sm:text-sm leading-snug line-clamp-3 mb-4">
                Chiffrage transparent sous 24h pour rénovation, tableau, éclairage ou neuf.
              </p>
            </div>

            {/* Action pill footer */}
            <div className="pt-3 border-t border-emerald-950/80 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
              <span className="truncate">Estimer mon projet</span>
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </div>
          </button>

          {/* 4. 📞 JE SOUHAITE ÊTRE RAPPELÉ */}
          <button
            id="action-card-callback"
            onClick={onOpenCallback}
            className="group relative flex flex-col justify-between p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#041624]/90 via-[#030e19]/95 to-[#02080f] border-2 border-cyan-500/40 hover:border-cyan-400 text-left transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 shadow-[0_0_30px_rgba(0,210,255,0.15)] hover:shadow-[0_0_40px_rgba(0,210,255,0.35)] cursor-pointer overflow-hidden"
          >
            {/* Top pulse aura */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-all pointer-events-none" />

            <div>
              {/* Badge & Icon header */}
              <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-5">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(0,210,255,0.35)] group-hover:scale-110 transition-transform">
                  <PhoneCall className="w-5 h-5 sm:w-7 sm:h-7 animate-pulse" />
                </div>
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-cyan-950/90 border border-cyan-400/50 text-cyan-300 font-bold text-[10px] sm:text-xs tracking-wide shrink-0">
                  Sous 15 min
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-sm sm:text-xl font-black text-white group-hover:text-cyan-300 transition-colors mb-1.5 sm:mb-2 leading-tight"
                style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
              >
                📞 JE VEUX ÊTRE RAPPELÉ
              </h3>

              {/* Sub-description */}
              <p className="text-slate-300 text-xs sm:text-sm leading-snug line-clamp-3 mb-4">
                Échangez directement avec un artisan électricien qualifié pour vos questions.
              </p>
            </div>

            {/* Action pill footer */}
            <div className="pt-3 border-t border-cyan-950/80 flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
              <span className="truncate">Rappel gratuit</span>
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
