import React from 'react';
import { ArrowRight, Zap, Phone } from 'lucide-react';

interface FinalCTAProps {
  onOpenQuote: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenQuote }) => {
  return (
    <section className="relative py-16 sm:py-20 bg-[#020712] overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Full-Width Futuristic Banner */}
        <div
          id="final-cta-banner"
          className="relative rounded-3xl p-6 sm:p-12 lg:p-14 overflow-hidden border border-cyan-500/30 bg-gradient-to-r from-[#031535] via-[#020d24] to-[#010814] shadow-[0_0_60px_rgba(0,210,255,0.18)]"
        >
          {/* Subtle Electric Energy / Lightning Arc Wave Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Ambient Cyan and Blue Radial Lights */}
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px]" />
            <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />

            {/* Glowing Wavy Lightning Stream SVG */}
            <svg
              className="absolute inset-0 w-full h-full opacity-35"
              viewBox="0 0 1200 400"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M-50,220 C200,100 400,320 700,180 C950,50 1100,280 1300,160"
                stroke="#00D2FF"
                strokeWidth="2.5"
                filter="drop-shadow(0 0 12px #00D2FF)"
              />
              <path
                d="M-50,230 C220,120 420,300 720,190 C960,80 1080,260 1300,180"
                stroke="#38BDF8"
                strokeWidth="1.2"
                strokeDasharray="8 6"
                opacity="0.8"
              />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12">
            
            {/* Left: Large Futuristic Lightning Icon + Headings */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-4 sm:gap-8 text-center sm:text-left">
              
              {/* Large Glowing Hexagon Lightning Badge */}
              <div className="relative shrink-0 flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24">
                <div className="absolute inset-0 rounded-3xl bg-cyan-400/20 blur-xl animate-pulse" />
                <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-blue-600/40 to-slate-950 border border-cyan-400/70 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(0,210,255,0.4)]">
                  <Zap className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-300 fill-cyan-400 drop-shadow-[0_0_12px_#00D2FF]" />
                </div>
              </div>

              {/* Headings */}
              <div>
                <h2
                  className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-2 sm:mb-3"
                  style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
                >
                  Un projet électrique ?
                </h2>
                <p className="text-sm sm:text-lg text-slate-300 font-normal max-w-xl leading-relaxed">
                  Parlons-en dès maintenant et obtenez votre devis gratuit sans engagement.
                </p>
              </div>

            </div>

            {/* Right Side: 2 Columns on mobile */}
            <div className="shrink-0 w-full lg:w-auto grid grid-cols-2 gap-3 sm:gap-4 sm:flex sm:flex-row sm:items-center">
              <button
                id="final-cta-btn"
                onClick={onOpenQuote}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-10 py-3.5 sm:py-5 rounded-full text-xs sm:text-lg font-bold text-white overflow-hidden transition-all duration-300 cursor-pointer shadow-[0_0_35px_rgba(255,30,39,0.5)] hover:shadow-[0_0_55px_rgba(255,30,39,0.8)] hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #FF263D 0%, #E6001E 50%, #B30012 100%)',
                }}
              >
                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                  <span className="hidden sm:inline">Demander un devis gratuit</span>
                  <span className="sm:hidden">Devis gratuit</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1.5 shrink-0" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full duration-700 transition-transform" />
              </button>

              <a
                href="tel:0766072094"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-4 sm:px-7 py-3.5 sm:py-5 rounded-full text-xs sm:text-base font-semibold text-slate-200 bg-slate-900/90 border border-cyan-500/40 hover:border-cyan-300 hover:text-cyan-300 transition-all duration-300 backdrop-blur-md shadow-[0_0_20px_rgba(0,210,255,0.15)] w-full sm:w-auto text-center"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
                <span>07 66 07 20 94</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
