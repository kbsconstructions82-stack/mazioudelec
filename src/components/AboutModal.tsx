import React from 'react';
import { X, Award, Shield, Cpu, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MazioudLogo } from './MazioudLogo';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, onOpenQuote }) => {
  if (!isOpen) return null;

  return (
    <div
      id="about-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="about-modal-content"
        className="relative w-full max-w-2xl rounded-3xl bg-[#030917]/95 border border-cyan-500/30 p-6 sm:p-8 shadow-[0_0_60px_rgba(0,210,255,0.25)] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="mb-6">
          <MazioudLogo size="md" />
          <h3
            className="text-2xl sm:text-3xl font-black text-white mt-4 tracking-tight"
            style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
          >
            L’art de l’électricité contemporaine
          </h3>
          <p className="text-sm text-cyan-400 font-medium mt-1">
            Basé à Nègrepelisse (82800) • Périmètre d'intervention de 40 km
          </p>
        </div>

        {/* Narrative & Values */}
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            Fondée avec la volonté de renouveler l’approche de l’électricité générale, <strong className="text-white">MAZIOUDELEC</strong> associe l’exigence de l’artisanat d'art aux technologies les plus avancées : tableaux modulaires de haute précision, domotique connectée et éclairage architectural.
          </p>
          <p>
            Nous intervenons auprès des particuliers et des professionnels exigeants pour concevoir des installations fiables, durables, sécurisées et économes en énergie.
          </p>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-cyan-500/20 flex items-start gap-3">
            <Shield className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Sécurité Absolue</div>
              <div className="text-xs text-slate-400 mt-0.5">Stricte conformité NF C 15-100 et vérification systématique.</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-cyan-500/20 flex items-start gap-3">
            <Cpu className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Haute Technologie</div>
              <div className="text-xs text-slate-400 mt-0.5">Domotique KNX/Zigbee, gestion intelligente et connectée.</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-cyan-500/20 flex items-start gap-3">
            <Award className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Finition Millimétrée</div>
              <div className="text-xs text-slate-400 mt-0.5">Câblage soigné, repérage précis et appareillages design.</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-cyan-500/20 flex items-start gap-3">
            <Zap className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Énergie Responsable</div>
              <div className="text-xs text-slate-400 mt-0.5">Optimisation des consommations et éclairage LED basse tension.</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Déplacement à Nègrepelisse, Montauban, Caussade et dans un rayon de 40 km.
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenQuote();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-bold text-white shadow-[0_0_25px_rgba(255,30,39,0.4)] cursor-pointer flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #FF263D 0%, #E6001E 50%, #B30012 100%)',
            }}
          >
            <span>Demander un devis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
