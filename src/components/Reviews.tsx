import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { REVIEWS_DATA } from '../data/mockData';

export const Reviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS_DATA.length - 2 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev >= REVIEWS_DATA.length - 2 ? 0 : prev + 1));
  };

  const visibleReviews = [
    REVIEWS_DATA[currentIndex % REVIEWS_DATA.length],
    REVIEWS_DATA[(currentIndex + 1) % REVIEWS_DATA.length],
  ];

  return (
    <section id="avis" className="relative py-24 bg-[#030917] overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Top Grid */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div>
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-4 shadow-[0_0_12px_rgba(0,210,255,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>ILS NOUS FONT CONFIANCE</span>
            </div>

            {/* Title */}
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4"
              style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
            >
              Avis clients
            </h2>

            {/* Rating Bar */}
            <div className="flex items-center gap-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-sm font-bold text-white tracking-wide">
                4,9/5{' '}
                <span className="text-slate-400 font-normal">
                  sur Google (127 avis)
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Arrows & Google Business Profile Link */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              id="google-business-reviews-link"
              href="https://share.google/YY999ruRq5edQDW0K"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-slate-200 bg-slate-900/90 border border-cyan-500/40 hover:border-cyan-300 hover:text-cyan-300 transition-all shadow-[0_0_15px_rgba(0,210,255,0.12)]"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
              </svg>
              <span>Voir la fiche Google</span>
            </a>

            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={prevReview}
                className="w-10 h-10 rounded-full bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all cursor-pointer shadow-[0_0_15px_rgba(0,210,255,0.1)]"
                aria-label="Avis précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextReview}
                className="w-10 h-10 rounded-full bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all cursor-pointer shadow-[0_0_15px_rgba(0,210,255,0.1)]"
                aria-label="Avis suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonial Cards Grid - 2 COLUMNS ON MOBILE */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
          {visibleReviews.map((rev) => (
            <div
              key={rev.id}
              className="relative p-3.5 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-950/70 border border-cyan-500/20 backdrop-blur-xl shadow-[0_0_35px_rgba(0,210,255,0.06)] hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Row: Google 'G' Icon and Verified Status */}
              <div className="flex items-start justify-between mb-3 sm:mb-5 gap-2">
                {/* Official Google colorful SVG Icon */}
                <div className="w-6 h-6 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white/10 p-1 sm:p-1.5 flex items-center justify-center backdrop-blur-md border border-white/15 shadow-sm shrink-0">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                </div>

                <div className="flex items-center gap-1 text-[9px] sm:text-xs text-cyan-400 font-medium bg-cyan-950/60 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-cyan-500/30">
                  <CheckCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span className="hidden sm:inline">Avis certifié Google</span>
                  <span className="sm:hidden">Certifié</span>
                </div>
              </div>

              {/* Review Text */}
              <blockquote className="text-xs sm:text-lg text-slate-200 font-normal leading-relaxed mb-3 sm:mb-6 italic line-clamp-3 sm:line-clamp-none">
                “{rev.review}”
              </blockquote>

              {/* Bottom Author & Stars */}
              <div className="pt-2 sm:pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0">
                <div className="w-full sm:w-auto">
                  <div className="text-xs sm:text-sm font-bold text-white tracking-wide truncate">
                    {rev.name}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-400 truncate">
                    {rev.service} • {rev.date}
                  </div>
                </div>

                {/* Stars */}
                <div className="flex text-amber-400 gap-0.5 shrink-0 mt-1 sm:mt-0">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
