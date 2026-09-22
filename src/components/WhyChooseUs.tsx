import React from 'react';
import { Zap, Star, ShieldCheck, Clock } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="pourquoi-nous-choisir" className="relative py-12 bg-[#020712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Horizontal Futuristic Statistics Panel */}
        <div
          id="stats-panel"
          className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-slate-950/70 border border-cyan-500/25 backdrop-blur-xl shadow-[0_0_40px_rgba(0,210,255,0.08)] overflow-hidden"
        >
          {/* Subtle Top & Bottom Glowing Energy Line */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />
          <div className="absolute bottom-0 left-1/3 right-1/3 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-center">
            
            {/* Section Title on the Left */}
            <div className="md:col-span-3 text-left">
              <h3
                className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight"
                style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
              >
                Pourquoi <br className="hidden md:block" />
                nous choisir ?
              </h3>
            </div>

            {/* 4 Stats with Thin Vertical Glowing Separators */}
            <div className="md:col-span-9 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4">
              
              {/* Stat 1: +10 ans d'expérience */}
              <div className="flex items-center gap-3.5 sm:px-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.25)]">
                  <Zap className="w-5 h-5 fill-cyan-400/20" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white tracking-tight leading-none">
                    + 10 ans
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-1">
                    d’expérience
                  </div>
                </div>
              </div>

              {/* Stat 2: 100% de clients satisfaits */}
              <div className="flex items-center gap-3.5 sm:px-3 sm:border-l border-slate-800/90">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.25)]">
                  <Star className="w-5 h-5 fill-cyan-400/20" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white tracking-tight leading-none">
                    100%
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-1">
                    de clients satisfaits
                  </div>
                </div>
              </div>

              {/* Stat 3: Garantie des travaux */}
              <div className="flex items-center gap-3.5 sm:px-3 sm:border-l border-slate-800/90">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.25)]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black text-white tracking-tight leading-none">
                    Garantie
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-1">
                    des travaux (décennale)
                  </div>
                </div>
              </div>

              {/* Stat 4: Intervention rapide */}
              <div className="flex items-center gap-3.5 sm:px-3 sm:border-l border-slate-800/90">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.25)]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black text-white tracking-tight leading-none">
                    Intervention
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-1">
                    rapide 6j/7
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
