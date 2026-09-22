import React, { useState } from 'react';
import { ArrowRight, Eye, Sparkles, MapPin } from 'lucide-react';
import { PROJECTS_DATA } from '../data/mockData';
import { ProjectItem } from '../types';

interface RealisationsProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const Realisations: React.FC<RealisationsProps> = ({ onSelectProject }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="realisations" className="relative py-24 bg-[#020712] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            {/* Small label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-4 shadow-[0_0_12px_rgba(0,210,255,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>NOS RÉALISATIONS</span>
            </div>

            {/* Large title */}
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight"
              style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
            >
              Des projets qui <br />
              parlent{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 drop-shadow-[0_0_20px_rgba(0,210,255,0.4)]">
                d’eux-mêmes
              </span>
            </h2>
          </div>

          {/* Right link */}
          <button
            onClick={() => {
              const el = document.getElementById('projects-grid');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors pb-2 cursor-pointer"
          >
            <span>Voir toutes nos réalisations</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
          </button>
        </div>

        {/* Gallery of 6 Project Images - 2 COLUMNS ON MOBILE */}
        <div
          id="projects-grid"
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-5"
        >
          {PROJECTS_DATA.map((project, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onSelectProject(project)}
                className={`group relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border aspect-[3/4] sm:aspect-[4/5] xl:aspect-[3/5] flex flex-col justify-end p-2.5 sm:p-4 ${
                  isHovered
                    ? 'border-cyan-400 shadow-[0_0_30px_rgba(0,210,255,0.3)] -translate-y-1 sm:-translate-y-1.5 scale-[1.02]'
                    : 'border-cyan-500/20 bg-slate-950/80 shadow-lg'
                }`}
              >
                {/* Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                      isHovered ? 'scale-115' : 'scale-100'
                    }`}
                  />
                  {/* Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020712] via-[#020712]/50 to-transparent" />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Top Badge: Location & Quick View */}
                <div className="relative z-10 mb-auto flex items-center justify-between opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-slate-300 px-1.5 sm:px-2 py-0.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-slate-700/60 truncate max-w-[85px] sm:max-w-none">
                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-400 shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </span>

                  <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all ${
                    isHovered ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_#00D2FF]' : 'bg-slate-900/80 text-white/70 border border-slate-700'
                  }`}>
                    <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </div>

                {/* Bottom Project Title and Tag */}
                <div className="relative z-10">
                  <div className="text-[9px] sm:text-[11px] text-cyan-300/90 font-medium tracking-wide mb-0.5 sm:mb-1 line-clamp-1">
                    {project.category}
                  </div>
                  <h3
                    className="text-xs sm:text-base font-bold text-white group-hover:text-cyan-200 transition-colors leading-tight line-clamp-2"
                    style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
                  >
                    {project.title}
                  </h3>
                </div>

                {/* Luminous bottom line on hover */}
                <div
                  className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
