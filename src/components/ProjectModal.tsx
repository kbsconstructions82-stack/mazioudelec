import React from 'react';
import { X, MapPin, Clock, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenQuote: (serviceTitle?: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenQuote,
}) => {
  if (!project) return null;

  return (
    <div
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="project-modal-content"
        className="relative w-full max-w-3xl rounded-3xl bg-[#030917]/95 border border-cyan-500/30 overflow-hidden shadow-[0_0_60px_rgba(0,210,255,0.25)] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-950/80 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Image Preview */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030917] via-transparent to-black/40" />

          {/* Location & Category Badges */}
          <div className="absolute bottom-4 left-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/60 text-cyan-300 text-xs font-semibold backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              {project.location}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-200 text-xs font-medium backdrop-blur-md">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {project.duration}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div>
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
              {project.category}
            </div>
            <h3
              className="text-2xl sm:text-3xl font-black text-white tracking-tight"
              style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
            >
              {project.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mt-3">
              {project.description}
            </p>
          </div>

          {/* Technical Specifications - 2 COLUMNS ON MOBILE */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              Spécifications techniques & Équipements
            </h4>
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {project.specs.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-[11px] sm:text-sm text-slate-200"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
                  <span className="truncate">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Chantier réalisé selon la norme française NF C 15-100</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenQuote(project.title);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-bold text-white shadow-[0_0_25px_rgba(255,30,39,0.4)] hover:shadow-[0_0_35px_rgba(255,30,39,0.7)] transition-all cursor-pointer flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #FF263D 0%, #E6001E 50%, #B30012 100%)',
              }}
            >
              <span>Demander un projet similaire</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
