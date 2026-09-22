import React from 'react';
import { Calendar, ArrowRight, UserCheck, ShieldCheck, Clock, Leaf, Zap, Sparkles } from 'lucide-react';
import { MazioudLogo } from './MazioudLogo';

interface HeroProps {
  onOpenQuote: () => void;
  onNavigateAppointment?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onNavigateAppointment }) => {
  return (
    <section
      id="accueil"
      className="relative min-h-screen pt-28 pb-16 lg:pt-32 lg:pb-24 flex items-center overflow-hidden bg-[#020712]"
    >
      {/* Dynamic Background: Luxury Architectural Villa at Night with Ambient Glow */}
      <div className="absolute inset-0 z-0">
        {/* Architectural Villa Photo */}
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2200&q=85"
          alt="Villa d'architecte contemporaine illuminée la nuit"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Cinematic Vignette & Deep Navy Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020712] via-[#020712]/80 to-[#020712]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020712] via-transparent to-[#020712]/90" />

        {/* Ambient Electric Cyan Glow Spots */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Technical Sub-Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#00D2FF 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE CONTENT: Typography, Eyebrow, Headlines, CTAs, Trust Indicators */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Small Eyebrow */}
            <div
              id="hero-eyebrow"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-widest uppercase mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(0,210,255,0.15)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>VOTRE ÉLECTRICIEN DE CONFIANCE</span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-main-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6"
              style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
            >
              Des installations <br />
              électriques{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 drop-shadow-[0_0_25px_rgba(0,210,255,0.5)]">
                modernes
              </span>{' '}
              <br />
              et{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 drop-shadow-[0_0_25px_rgba(0,210,255,0.5)]">
                durables
              </span>
            </h1>

            {/* Supporting Text */}
            <p
              id="hero-description"
              className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mb-8"
            >
              Particuliers et professionnels, <strong className="text-white font-semibold">MAZIOUDELEC</strong> vous accompagne à <strong className="text-cyan-300 font-medium">Nègrepelisse (82800)</strong> et dans un rayon de 40 km (Montauban, Caussade...) : installation, rénovation, dépannage et domotique.
            </p>

            {/* CTAs - 2 COLUMNS ON MOBILE */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:flex sm:flex-wrap sm:items-center mb-10 sm:mb-12 w-full sm:w-auto">
              {/* Primary CTA (Red Glowing Button) */}
              <button
                id="hero-primary-cta"
                onClick={onOpenQuote}
                className="group relative inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-base font-bold text-white overflow-hidden transition-all duration-300 cursor-pointer shadow-[0_0_30px_rgba(255,30,39,0.45)] hover:shadow-[0_0_45px_rgba(255,30,39,0.7)] hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto"
                style={{
                  background: 'linear-gradient(135deg, #FF263D 0%, #E6001E 55%, #B30012 100%)',
                }}
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white transition-transform group-hover:scale-110 drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] shrink-0" />
                <span className="hidden sm:inline">Demander un devis</span>
                <span className="sm:hidden">Devis gratuit</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full duration-700 transition-transform" />
              </button>

              {/* Secondary CTA (Prise de rendez-vous) */}
              <a
                id="hero-phone-cta"
                href="/rendez-vous"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateAppointment?.();
                }}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3 sm:px-6 py-3 sm:py-3.5 rounded-full text-xs sm:text-base font-semibold text-slate-200 bg-slate-900/80 border border-cyan-500/40 hover:border-cyan-300 hover:text-cyan-300 hover:bg-slate-850 transition-all duration-300 backdrop-blur-md shadow-[0_0_20px_rgba(0,210,255,0.12)] w-full sm:w-auto cursor-pointer group"
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 group-hover:scale-110 transition-transform shrink-0" />
                <span>Prendre rendez-vous</span>
              </a>
            </div>

            {/* Below CTAs: 4 Horizontal Trust Indicators - 2 COLUMNS ON MOBILE */}
            <div
              id="hero-trust-indicators"
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 pt-6 border-t border-slate-800/80 w-full"
            >
              {/* Trust 1: Artisan local */}
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 mt-0.5 shadow-[0_0_10px_rgba(0,210,255,0.15)]">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-white">Artisan local</div>
                  <div className="text-slate-400">et de confiance</div>
                </div>
              </div>

              {/* Trust 2: Devis gratuit */}
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 mt-0.5 shadow-[0_0_10px_rgba(0,210,255,0.15)]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-white">Devis gratuit</div>
                  <div className="text-slate-400">et sans engagement</div>
                </div>
              </div>

              {/* Trust 3: Intervention rapide */}
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 mt-0.5 shadow-[0_0_10px_rgba(0,210,255,0.15)]">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-white">Intervention rapide</div>
                  <div className="text-slate-400">dans votre secteur</div>
                </div>
              </div>

              {/* Trust 4: Solutions durables */}
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 mt-0.5 shadow-[0_0_10px_rgba(0,210,255,0.15)]">
                  <Leaf className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-white">Solutions durables</div>
                  <div className="text-slate-400">et économies d’énergie</div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Cinematic Composition of Electrician working on Panel with MAZIOUD ELEC logo on uniform */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-lg lg:max-w-none rounded-3xl overflow-hidden p-1.5 bg-gradient-to-b from-cyan-500/30 via-slate-800/40 to-cyan-500/10 shadow-[0_0_50px_rgba(0,210,255,0.15)]">
              
              {/* Inner Image Container */}
              <div className="relative rounded-[22px] overflow-hidden bg-slate-950 aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5]">
                {/* Electrician working on high-tech distribution panel photo */}
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=85"
                  alt="Électricien professionnel MAZIOUD ELEC intervenant sur un tableau moderne"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top scale-100 filter contrast-105"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020712] via-transparent to-[#020712]/40" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020712]/40 via-transparent to-cyan-950/30 mix-blend-overlay" />

                {/* MAZIOUD ELEC Authentic Embroidered Logo Patch on Electrician's Workwear Jacket */}
                <div
                  id="electrician-uniform-badge"
                  className="absolute top-[32%] left-4 sm:left-6 px-3 py-1.5 rounded-lg bg-[#070e1c]/95 border border-slate-700/70 shadow-[0_6px_20px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center gap-2 select-none -rotate-1 hover:rotate-0 transition-all duration-300 ring-1 ring-cyan-400/20 group cursor-default"
                >
                  <MazioudLogo size="patch" showText={false} />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 leading-none font-bold text-xs tracking-tight">
                      <span
                        className="text-[#FF1E27] drop-shadow-[0_0_8px_rgba(255,30,39,0.4)]"
                        style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
                      >
                        MAZIOUD
                      </span>
                      <span
                        className="text-[#00D2FF] drop-shadow-[0_0_8px_rgba(0,210,255,0.5)]"
                        style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
                      >
                        ELEC
                      </span>
                    </div>
                    <span className="text-[9px] text-slate-300 font-medium tracking-wider uppercase mt-0.5">
                      Artisan Agréé
                    </span>
                  </div>
                </div>

                {/* Futuristic Electrical Glow & Circuit Lines around the Electrical Panel */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 pointer-events-none">
                  <div className="relative">
                    {/* Pulsing Energy Aura */}
                    <div className="w-24 h-24 rounded-full bg-cyan-400/20 blur-xl animate-pulse" />
                    {/* SVG Circuit Energy lines */}
                    <svg
                      className="absolute -top-4 -right-4 w-32 h-32 opacity-75"
                      viewBox="0 0 120 120"
                      fill="none"
                    >
                      <path
                        d="M 10 10 L 60 10 L 80 30 L 110 30"
                        stroke="#00D2FF"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                        className="animate-pulse"
                      />
                      <path
                        d="M 40 40 L 70 40 L 95 65 L 115 65"
                        stroke="#00D2FF"
                        strokeWidth="1"
                        opacity="0.6"
                      />
                      <circle cx="110" cy="30" r="3" fill="#00D2FF" />
                      <circle cx="115" cy="65" r="2.5" fill="#FF1E27" />
                    </svg>
                  </div>
                </div>

                {/* Sleek High-Tech Diagnostic & Safety Floating Glass Card */}
                <div
                  id="hero-tech-hud"
                  className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-5 sm:left-5 sm:right-5 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-950/75 border border-cyan-500/25 backdrop-blur-xl flex items-center justify-between shadow-[0_10px_35px_rgba(0,0,0,0.7)]"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center shrink-0 text-cyan-400 shadow-[0_0_12px_rgba(0,210,255,0.25)]">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-white tracking-wide truncate flex items-center gap-1.5">
                        <span>Conformité & Sécurité</span>
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981]" />
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-300 truncate">
                        Norme NF C 15-100 • Attestation Consuel
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 pl-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 text-[10px] sm:text-[11px] font-mono font-semibold">
                      230V / 400V
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
