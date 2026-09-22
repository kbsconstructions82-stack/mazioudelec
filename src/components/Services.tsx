import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Home, Shield, Wrench, Cpu, Lightbulb, Smartphone, CheckCircle2, Zap, Wind, RotateCw } from 'lucide-react';
import { SERVICES_DATA } from '../data/mockData';
import { ServiceItem } from '../types';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenQuoteWithService: (serviceName: string) => void;
  onNavigateToRoute?: (route: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService, onOpenQuoteWithService, onNavigateToRoute }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const getIcon = (iconName: ServiceItem['iconName']) => {
    const props = { className: "w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" };
    switch (iconName) {
      case 'home':
        return <Home {...props} />;
      case 'shield':
        return <Shield {...props} />;
      case 'wrench':
        return <Wrench {...props} />;
      case 'cpu':
        return <Cpu {...props} />;
      case 'lightbulb':
        return <Lightbulb {...props} />;
      case 'smartphone':
        return <Smartphone {...props} />;
      case 'wind':
        return <Wind {...props} />;
      case 'refresh':
        return <RotateCw {...props} />;
      default:
        return <Zap {...props} />;
    }
  };

  return (
    <section id="services" className="relative py-16 sm:py-24 bg-[#030917] overflow-hidden">
      {/* Background Lighting Elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6">
          <div>
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-4 shadow-[0_0_12px_rgba(0,210,255,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>NOS SERVICES</span>
            </div>

            {/* Section Title */}
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight"
              style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
            >
              Des solutions électriques <br />
              pour{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 drop-shadow-[0_0_20px_rgba(0,210,255,0.4)]">
                tous vos besoins
              </span>
            </h2>
          </div>

          {/* Right Link */}
          <button
            onClick={() => {
              const el = document.getElementById('services-grid');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors pb-2 cursor-pointer self-start md:self-auto"
          >
            <span>Voir tous nos services</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
          </button>
        </div>

        {/* 6 Premium Service Cards - 2 COLUMNS ON MOBILE (grid-cols-2) */}
        <div id="services-grid" className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {SERVICES_DATA.map((service) => {
            const isHovered = hoveredCard === service.id;
            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => onSelectService(service)}
                className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between border min-h-[300px] sm:min-h-[440px] ${
                  isHovered
                    ? 'border-cyan-400 shadow-[0_0_35px_rgba(0,210,255,0.25)] -translate-y-1 sm:-translate-y-2'
                    : 'border-cyan-500/20 bg-slate-950/60 shadow-xl'
                }`}
              >
                {/* Background Image with Zoom on Hover */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                      isHovered ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  {/* Dark Multi-stop Gradient Overlays for High Legibility & Cinematic Mood */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020712] via-[#020712]/80 to-[#020712]/40" />
                  <div className="absolute inset-0 bg-[#020712]/35 mix-blend-multiply" />
                  {/* Subtle Top Cyan Rim Glow on Hover */}
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>

                {/* Top Content: Icon & Number */}
                <div className="relative z-10 p-3.5 sm:p-7 flex items-start justify-between">
                  {/* Glowing Futuristic Icon in Rounded Circle */}
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-900/80 border border-cyan-500/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(0,210,255,0.2)] group-hover:border-cyan-400 group-hover:shadow-[0_0_22px_rgba(0,210,255,0.4)] transition-all">
                    {getIcon(service.iconName)}
                  </div>

                  {/* Modern Technical Index */}
                  <span className="font-mono text-[10px] sm:text-xs font-bold text-cyan-400/80 tracking-widest px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-slate-950/60 border border-cyan-500/20">
                    {service.number}
                  </span>
                </div>

                {/* Bottom Content: Titles, Description, and Circular Arrow Button */}
                <div className="relative z-10 p-3.5 sm:p-7 pt-0 flex flex-col justify-end">
                  {/* Subtitle */}
                  <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-0.5 sm:mb-1 line-clamp-1">
                    {service.subtitle}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-sm sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2 group-hover:text-cyan-200 transition-colors leading-tight"
                    style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
                  >
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed line-clamp-2 mb-3 sm:mb-5">
                    {service.description}
                  </p>

                  {/* Bottom Action Bar */}
                  <div className="flex items-center justify-between pt-2.5 sm:pt-4 border-t border-slate-800/80">
                    <span className="text-[11px] sm:text-xs font-medium text-slate-300 group-hover:text-cyan-300 transition-colors">
                      <span className="hidden sm:inline">En savoir plus</span>
                      <span className="sm:hidden">Détails</span>
                    </span>

                    {/* Circular Arrow Button with Cyan Line Border */}
                    <div
                      className={`w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isHovered
                          ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(0,210,255,0.8)] scale-105'
                          : 'bg-slate-900/80 border border-cyan-500/50 text-cyan-400'
                      }`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
