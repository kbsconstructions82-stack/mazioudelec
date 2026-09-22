import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, Menu, X, Sparkles, Mail } from 'lucide-react';
import { MazioudLogo } from './MazioudLogo';

interface NavbarProps {
  onOpenQuote: () => void;
  onOpenAbout: () => void;
  onNavigateEmergency?: () => void;
  onNavigateAppointment?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuote,
  onOpenAbout,
  onNavigateEmergency,
  onNavigateAppointment,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['accueil', 'diagnostic', 'services', 'realisations', 'avis', 'contact'];
      const scrollPosition = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'accueil', label: 'Accueil', href: '#accueil' },
    { id: 'urgence', label: '🚨 Urgence', onClick: onNavigateEmergency, isUrgent: true },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'diagnostic', label: 'Diagnostic', href: '#diagnostic' },
    { id: 'a-propos', label: 'À propos', onClick: onOpenAbout },
    { id: 'contact', label: 'Contact', isDropdown: true },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.id === 'contact') {
      setContactDropdownOpen(!contactDropdownOpen);
      return;
    }
    setContactDropdownOpen(false);
    setMobileMenuOpen(false);
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      const el = document.querySelector(item.href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#nav-item-contact') && !target.closest('#mobile-nav-contact')) {
        setContactDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#020712]/85 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3'
          : 'bg-gradient-to-b from-[#020712]/90 via-[#020712]/60 to-transparent backdrop-blur-md py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Logo */}
        <a
          href="#accueil"
          id="header-logo-link"
          className="group flex items-center focus:outline-none"
        >
          <MazioudLogo size="md" />
        </a>

        {/* Center: Desktop Navigation */}
        <nav
          id="desktop-nav"
          className="hidden md:flex items-center gap-1 lg:gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/60 border border-slate-800/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <div key={item.id} className="relative" id={`nav-item-${item.id}`}>
                <button
                  onClick={(e) => {
                    // Prevent closing immediately from global listener
                    if (item.id === 'contact') e.stopPropagation();
                    handleNavClick(item);
                  }}
                  className={`group relative px-4 py-1.5 text-sm font-medium transition-all duration-300 cursor-pointer rounded-full ${
                    item.isUrgent
                      ? 'text-red-300 hover:text-white bg-red-950/40 border border-red-500/40 shadow-[0_0_12px_rgba(255,46,68,0.2)] hover:border-red-400 hover:shadow-[0_0_18px_rgba(255,46,68,0.4)]'
                      : isActive || (item.id === 'contact' && contactDropdownOpen)
                      ? 'text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span className={`absolute inset-0 rounded-full transition-all duration-300 pointer-events-none blur-[2px] ${
                    item.isUrgent ? 'bg-red-500/0 group-hover:bg-red-500/20' : 'bg-cyan-400/0 group-hover:bg-cyan-400/[0.12]'
                  }`} />
                  <span className={`absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-[1.5px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none ${
                    item.isUrgent ? 'bg-red-400 shadow-[0_0_10px_#FF2E44]' : 'bg-cyan-300 shadow-[0_0_10px_#00D2FF,0_0_18px_#00D2FF]'
                  }`} />
                  <span className={`relative z-10 transition-all duration-200 flex items-center gap-1 ${
                    item.isUrgent
                      ? 'group-hover:text-red-200 group-hover:drop-shadow-[0_0_8px_rgba(255,46,68,0.8)] font-bold'
                      : 'group-hover:text-cyan-200 group-hover:drop-shadow-[0_0_8px_rgba(0,210,255,0.7)]'
                  } ${
                    isActive || (item.id === 'contact' && contactDropdownOpen) ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(0,210,255,0.5)] font-semibold' : ''
                  }`}>
                    {item.label}
                  </span>
                  {(isActive && !item.isUrgent) || (item.id === 'contact' && contactDropdownOpen) ? (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_10px_#00D2FF,0_0_20px_#00D2FF]" />
                  ) : !item.isUrgent && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full transition-all duration-300 w-0 group-hover:w-3/4 opacity-0 group-hover:opacity-100 shadow-[0_0_8px_#00D2FF]" />
                  )}
                </button>

                {/* Dropdown Contact Desktop */}
                {item.id === 'contact' && contactDropdownOpen && (
                  <div className="absolute top-full right-0 mt-3 w-64 p-3 rounded-2xl bg-[#030917]/95 border border-cyan-500/40 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(0,210,255,0.15)] backdrop-blur-xl animate-fadeIn z-50 flex flex-col gap-2">
                    <a href="tel:0766072094" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/80 transition-colors border border-transparent hover:border-cyan-500/30 group/link">
                      <div className="w-10 h-10 rounded-full bg-cyan-950/60 flex items-center justify-center border border-cyan-500/40 group-hover/link:shadow-[0_0_15px_rgba(0,210,255,0.3)] transition-all">
                        <Phone className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Appelez-nous</span>
                        <span className="text-white text-sm font-semibold font-mono">07 66 07 20 94</span>
                      </div>
                    </a>
                    <a href="mailto:mazioud.elec@gmail.com" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/80 transition-colors border border-transparent hover:border-emerald-500/30 group/link">
                      <div className="w-10 h-10 rounded-full bg-emerald-950/60 flex items-center justify-center border border-emerald-500/40 group-hover/link:shadow-[0_0_15px_rgba(52,211,153,0.3)] transition-all">
                        <Mail className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Écrivez-nous</span>
                        <span className="text-white text-sm font-semibold">mazioud.elec@gmail.com</span>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Side: Quote CTA */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Futuristic Red CTA */}
          <button
            id="header-quote-btn"
            onClick={onOpenQuote}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white overflow-hidden transition-all duration-300 cursor-pointer shadow-[0_0_25px_rgba(255,30,39,0.35)] hover:shadow-[0_0_35px_rgba(255,30,39,0.6)] hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #FF2E44 0%, #E6001E 50%, #B80014 100%)',
            }}
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Demander un devis
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full duration-700 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-slate-200 hover:text-cyan-400 focus:outline-none"
            aria-label="Menu mobile"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden bg-[#030a18]/95 backdrop-blur-2xl border-b border-cyan-500/20 px-6 py-6 transition-all animate-fadeIn"
        >
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <div key={item.id} className="flex flex-col">
                <button
                  id={`mobile-nav-${item.id}`}
                  onClick={(e) => {
                    if (item.id === 'contact') e.stopPropagation();
                    handleNavClick(item);
                  }}
                  className={`group flex items-center justify-between py-2.5 px-3 rounded-xl text-base font-semibold text-left transition-all duration-200 border-b border-slate-800/60 ${
                    item.isUrgent
                      ? 'bg-red-950/50 border-red-500/40 text-red-300 font-bold shadow-[0_0_15px_rgba(255,46,68,0.25)]'
                      : activeSection === item.id || (item.id === 'contact' && contactDropdownOpen)
                      ? 'text-cyan-300 bg-cyan-950/40'
                      : 'text-slate-300 hover:text-white hover:bg-cyan-500/10 hover:border-cyan-500/30'
                  }`}
                >
                  <span className={item.isUrgent ? 'text-red-200 font-bold' : 'group-hover:drop-shadow-[0_0_6px_rgba(0,210,255,0.6)] transition-all'}>
                    {item.label}
                  </span>
                  {item.isUrgent ? (
                    <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#FF2E44] animate-pulse" />
                  ) : activeSection === item.id || (item.id === 'contact' && contactDropdownOpen) ? (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00D2FF]" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/0 group-hover:bg-cyan-400/80 group-hover:shadow-[0_0_6px_#00D2FF] transition-all" />
                  )}
                </button>
                
                {/* Mobile Contact Dropdown Items */}
                {item.id === 'contact' && contactDropdownOpen && (
                  <div className="flex flex-col gap-2 p-2 mt-1 mb-2 rounded-xl bg-slate-900/50 border border-slate-800/50 animate-fadeIn">
                    <a href="tel:0766072094" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-cyan-950/80 flex items-center justify-center border border-cyan-500/30">
                        <Phone className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Appelez-nous</span>
                        <span className="text-white text-sm font-semibold font-mono">07 66 07 20 94</span>
                      </div>
                    </a>
                    <a href="mailto:mazioud.elec@gmail.com" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-emerald-950/80 flex items-center justify-center border border-emerald-500/30">
                        <Mail className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Écrivez-nous</span>
                        <span className="text-white text-sm font-semibold">mazioud.elec@gmail.com</span>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <a
                href="tel:0766072094"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 font-semibold"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                07 66 07 20 94
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold shadow-[0_0_20px_rgba(255,30,39,0.4)]"
                style={{
                  background: 'linear-gradient(135deg, #FF2E44 0%, #E6001E 50%, #B80014 100%)',
                }}
              >
                Demander un devis gratuit
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
