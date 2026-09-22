import React from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Zap, Phone } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenQuote: (serviceTitle: string) => void;
  onNavigateToRoute?: (route: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onOpenQuote,
  onNavigateToRoute,
}) => {
  if (!service) return null;

  return (
    <div
      id="service-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="service-modal-content"
        className="relative w-full max-w-2xl rounded-3xl bg-[#030917]/95 border border-cyan-500/30 overflow-hidden shadow-[0_0_60px_rgba(0,210,255,0.25)] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-950/80 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Image */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden shrink-0">
          <img
            src={service.image}
            alt={service.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030917] via-[#030917]/60 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/30">
              {service.subtitle}
            </span>
            <h3
              className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight"
              style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
            >
              {service.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-left">
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {service.description}
          </p>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              Ce qui est inclus dans notre prestation
            </h4>
            {/* Feature items in 2 columns on mobile */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {service.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 sm:gap-2.5 p-2 sm:p-3 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-[11px] sm:text-sm text-slate-200"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
                  <span className="truncate">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-300 gap-2 sm:gap-0">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />
              <span className="text-[11px] sm:text-xs">Garantie décennale & normes Consuel</span>
            </div>
            <a
              href="tel:0766072094"
              className="font-mono text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 text-[11px] sm:text-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              07 66 07 20 94
            </a>
          </div>

          <div className="pt-2 grid grid-cols-2 sm:flex sm:flex-row sm:items-center sm:justify-end gap-2.5 sm:gap-3">
            {service.route && onNavigateToRoute && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToRoute(service.route!);
                }}
                className="col-span-2 sm:col-span-1 w-full sm:w-auto px-4 py-2.5 rounded-full text-xs font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 hover:border-cyan-400 hover:text-white transition-all flex items-center justify-center gap-1.5"
              >
                <span>Page dédiée du service</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            )}
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold text-slate-300 bg-slate-900/80 border border-slate-700 hover:text-white transition-colors"
            >
              Fermer
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenQuote(service.title);
              }}
              className="w-full sm:w-auto px-4 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold text-white shadow-[0_0_25px_rgba(255,30,39,0.4)] hover:shadow-[0_0_35px_rgba(255,30,39,0.7)] transition-all cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 truncate"
              style={{
                background: 'linear-gradient(135deg, #FF263D 0%, #E6001E 50%, #B30012 100%)',
              }}
            >
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-white shrink-0" />
              <span className="truncate">Devis gratuit</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
