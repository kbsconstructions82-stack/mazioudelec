import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Zap } from 'lucide-react';
import { MazioudLogo } from './MazioudLogo';

interface FooterProps {
  onOpenQuote: () => void;
  onOpenAbout: () => void;
  onNavigateEmergency?: () => void;
  onNavigateAppointment?: () => void;
  onNavigateToRoute?: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenQuote,
  onOpenAbout,
  onNavigateEmergency,
  onNavigateAppointment,
  onNavigateToRoute,
}) => {
  return (
    <footer id="footer" className="relative bg-[#01050e] border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-900/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Left Column (5 cols): Logo + Company Description + Certifications */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <a href="#accueil" className="inline-block mb-4">
              <MazioudLogo size="lg" />
            </a>

            <p className="text-sm text-slate-400 font-normal leading-relaxed max-w-sm mb-6">
              Entreprise d’électricité générale et d’ingénierie domotique haut de gamme. Solutions pérennes, intelligentes et conformes aux plus hauts standards de sécurité.
            </p>

            {/* Certifications Badge Bar - 2 COLUMNS ON MOBILE */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl sm:rounded-full bg-slate-900/90 border border-cyan-500/30 text-[10px] sm:text-[11px] font-semibold text-cyan-300 justify-center sm:justify-start">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Norme NF C 15-100</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl sm:rounded-full bg-slate-900/90 border border-cyan-500/30 text-[10px] sm:text-[11px] font-semibold text-cyan-300 justify-center sm:justify-start">
                <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Garantie Décennale</span>
              </span>
              <span className="col-span-2 sm:col-span-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl sm:rounded-full bg-slate-900/90 border border-slate-700 text-[10px] sm:text-[11px] font-medium text-slate-300 justify-center sm:justify-start">
                <span>Qualifelec RGE</span>
              </span>
            </div>
          </div>

          {/* Navigation Column (3 cols) - 2 COLUMNS ON MOBILE */}
          <div className="lg:col-span-3">
            <h4
              className="text-sm font-bold text-white uppercase tracking-wider mb-4"
              style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
            >
              Navigation
            </h4>
            <ul className="grid grid-cols-2 sm:block gap-y-2.5 gap-x-4 sm:space-y-2.5 text-sm">
              <li>
                <a href="#accueil" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                {onNavigateEmergency ? (
                  <button
                    onClick={onNavigateEmergency}
                    className="text-red-400 font-semibold hover:text-red-300 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>🚨 Urgence Électrique</span>
                  </button>
                ) : (
                  <a href="/urgence-electrique" className="text-red-400 font-semibold hover:text-red-300 transition-colors">
                    🚨 Urgence Électrique
                  </a>
                )}
              </li>
              <li>
                {onNavigateAppointment ? (
                  <button
                    onClick={onNavigateAppointment}
                    className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>📅 Prise de rendez-vous</span>
                  </button>
                ) : (
                  <a href="/rendez-vous" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
                    📅 Prise de rendez-vous
                  </a>
                )}
              </li>
              <li>
                <a href="#services" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Tous nos services
                </a>
              </li>
              <li>
                {onNavigateToRoute ? (
                  <button
                    onClick={() => onNavigateToRoute('/services/renovation-electrique')}
                    className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer text-left"
                  >
                    Rénovation électrique
                  </button>
                ) : (
                  <a href="/services/renovation-electrique" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    Rénovation électrique
                  </a>
                )}
              </li>
              <li>
                {onNavigateToRoute ? (
                  <button
                    onClick={() => onNavigateToRoute('/services/vmc')}
                    className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer text-left"
                  >
                    VMC & Ventilation
                  </button>
                ) : (
                  <a href="/services/vmc" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    VMC & Ventilation
                  </a>
                )}
              </li>
              <li>
                <a href="#realisations" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Réalisations
                </a>
              </li>
              <li>
                <a href="#avis" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Avis clients
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  À propos
                </button>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Socials Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h4
                className="text-sm font-bold text-white uppercase tracking-wider mb-4"
                style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
              >
                Contact & Coordonnées
              </h4>

              <div className="space-y-3 text-sm text-slate-300">
                <a
                  href="tel:0766072094"
                  className="flex items-center gap-2.5 hover:text-cyan-400 transition-colors group"
                >
                  <span className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 group-hover:border-cyan-400">
                    <Phone className="w-4 h-4" />
                  </span>
                  <span className="font-semibold text-white">07 66 07 20 94</span>
                </a>

                <a
                  href="mailto:mazioud.elec@gmail.com"
                  className="flex items-center gap-2.5 hover:text-cyan-400 transition-colors group"
                >
                  <span className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 group-hover:border-cyan-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <span>mazioud.elec@gmail.com</span>
                </a>

                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <span>Nègrepelisse 82800 (Rayon 40 km, 82)</span>
                </div>
              </div>
            </div>

            {/* Google Business & Social Links */}
            <div className="mt-6">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Fiche Google & Réseaux
              </div>
              <div className="flex items-center gap-3">
                {/* Google Business Link */}
                <a
                  href="https://share.google/YY999ruRq5edQDW0K"
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 px-3.5 rounded-full bg-slate-900 border border-cyan-500/40 hover:border-cyan-300 text-slate-200 hover:text-cyan-300 flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_10px_rgba(0,210,255,0.15)] text-xs font-semibold"
                  aria-label="Fiche d'établissement Google MAZIOUDELEC"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                  </svg>
                  <span>Avis Google</span>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all hover:scale-105 shadow-[0_0_10px_rgba(0,210,255,0.1)]"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all hover:scale-105 shadow-[0_0_10px_rgba(0,210,255,0.1)]"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 <strong className="text-white">MAZIOUDELEC</strong>. Tous droits réservés.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Mentions légales</span>
            <span className="hover:text-slate-300 cursor-pointer">Politique de confidentialité</span>
            <span className="text-cyan-400 font-mono">Nègrepelisse • 82800</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
