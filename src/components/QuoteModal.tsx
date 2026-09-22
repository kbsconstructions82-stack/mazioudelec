import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  Phone,
  Mail,
  Calendar,
  Euro,
  Camera,
  Info,
  Sparkles,
  HelpCircle,
  Clock,
  Home,
  MapPin,
  FileText,
  ChevronDown,
  Check
} from 'lucide-react';
import { submitFormRequest } from '../services/formService';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

// Exactly 8 requested types
const QUOTE_TYPES = [
  { id: 'renovation', label: 'Rénovation électrique', icon: '🏠', hint: 'Remise à neuf complète ou partielle' },
  { id: 'installation', label: 'Installation électrique', icon: '⚡', hint: 'Création réseau neuf, extensions' },
  { id: 'tableau', label: 'Tableau électrique', icon: '🎛️', hint: 'Remplacement, mise en sécurité' },
  { id: 'eclairage', label: 'Éclairage', icon: '💡', hint: 'Spots, suspensions, extérieur, LED' },
  { id: 'conformite', label: 'Mise en conformité', icon: '🛡️', hint: 'Norme NF C 15-100, diagnostic' },
  { id: 'prises_interrupteurs', label: 'Prises / interrupteurs', icon: '🔌', hint: 'Ajout, déplacement, appareillage' },
  { id: 'vmc', label: 'VMC', icon: '💨', hint: 'Ventilation simple ou double flux' },
  { id: 'autre', label: 'Autre', icon: '✨', hint: 'Domotique, IRVE borne, spécifique' },
];

const BUDGET_RANGES = [
  '< 500 €',
  '500 - 1 500 €',
  '1 500 - 3 000 €',
  '3 000 - 5 000 €',
  '> 5 000 €',
  'À définir'
];

const TIMEFRAMES = [
  'Dès que possible',
  'Dans le mois',
  'D’ici 2 à 3 mois',
  'Date précise'
];

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  defaultService,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form Fields
  const [serviceType, setServiceType] = useState<string>('Rénovation électrique');
  const [propertyType, setPropertyType] = useState<string>('Maison individuelle');
  const [city, setCity] = useState<string>('Nègrepelisse');
  const [address, setAddress] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // Required New Fields
  const [budgetRange, setBudgetRange] = useState<string>('');
  const [customBudget, setCustomBudget] = useState<string>('');
  const [desiredDateOption, setDesiredDateOption] = useState<string>('Dès que possible');
  const [specificDate, setSpecificDate] = useState<string>('');



  // Project type dropdown state
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState<boolean>(false);
  const typeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target as Node)) {
        setIsTypeDropdownOpen(false);
      }
    };
    if (isTypeDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTypeDropdownOpen]);

  // Synchronize defaultService if provided
  useEffect(() => {
    if (defaultService) {
      const lower = defaultService.toLowerCase();
      if (lower.includes('rénov') || lower.includes('renov')) {
        setServiceType('Rénovation électrique');
      } else if (lower.includes('tableau')) {
        setServiceType('Tableau électrique');
      } else if (lower.includes('éclairage') || lower.includes('eclairage') || lower.includes('led')) {
        setServiceType('Éclairage');
      } else if (lower.includes('conform') || lower.includes('norme')) {
        setServiceType('Mise en conformité');
      } else if (lower.includes('prise') || lower.includes('interrupteur')) {
        setServiceType('Prises / interrupteurs');
      } else if (lower.includes('vmc') || lower.includes('ventilation')) {
        setServiceType('VMC');
      } else if (lower.includes('install')) {
        setServiceType('Installation électrique');
      } else {
        setServiceType('Autre');
      }
    }
  }, [defaultService]);

  if (!isOpen) return null;



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // 1. Sauvegarde dans Firebase Firestore
      await submitFormRequest('quotes', {
        fullName,
        email,
        phone,
        city,
        serviceType,
        budgetRange,
        customBudget,
        desiredDateOption,
        specificDate,
        description
      });

      // 2. Envoi de l'email via l'API existante
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'quote',
          serviceType,
          fullName,
          phone,
          email,
          city,
          budgetRange,
          customBudget,
          desiredDateOption,
          specificDate,
          description
        }),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        const errorData = await response.json();
        setSubmitError(errorData.error || "Erreur lors de l'envoi.");
      }
    } catch (error) {
      setSubmitError('Erreur réseau. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  const finalBudgetText = customBudget.trim()
    ? `${customBudget} €`
    : budgetRange || 'Non spécifié';

  const finalDesiredDateText = desiredDateOption === 'Date précise' && specificDate
    ? `Le ${specificDate}`
    : desiredDateOption;

  const currentTypeObj = QUOTE_TYPES.find((t) => t.label === serviceType) || QUOTE_TYPES[0];

  return (
    <div
      id="quote-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="quote-modal-content"
        className="relative w-full max-w-2xl rounded-3xl bg-[#030917]/95 border border-cyan-500/30 p-5 sm:p-8 shadow-[0_0_60px_rgba(0,210,255,0.2)] overflow-hidden max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Confirmation Success State */
          <div className="py-6 sm:py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_30px_rgba(0,210,255,0.5)] mb-5 animate-bounce">
              <CheckCircle2 className="w-9 h-9 text-cyan-400" />
            </div>

            <div className="inline-block px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
              Devis en cours d’étude
            </div>

            <h3
              className="text-2xl sm:text-3xl font-black text-white mb-2"
              style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
            >
              Demande de devis transmise
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
              Merci <strong className="text-white">{fullName || 'Monsieur / Madame'}</strong>. L’équipe technique de <strong>MAZIOUDELEC</strong> a bien reçu les éléments de votre projet pour <strong className="text-cyan-300">{city}</strong>.
            </p>

            {/* Recap Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-left text-xs sm:text-sm text-slate-300 space-y-2.5 mb-6 w-full max-w-md">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Prestation :</span>
                <span className="text-cyan-300 font-bold">{serviceType}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Date souhaitée :</span>
                <span className="text-white font-medium">{finalDesiredDateText}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Budget indicatif :</span>
                <span className="text-emerald-400 font-medium font-mono">{finalBudgetText}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Téléphone de contact :</span>
                <span className="text-white font-mono">{phone}</span>
              </div>

              <div className="flex justify-between pt-1">
                <span className="text-slate-400">Délai estimé :</span>
                <span className="text-cyan-400 font-bold">Réponse sous 24h ouvrées</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-full text-sm font-bold text-white shadow-[0_0_25px_rgba(255,30,39,0.4)] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #FF263D 0%, #E6001E 50%, #B30012 100%)',
              }}
            >
              Fermer la fenêtre
            </button>
          </div>
        ) : (
          /* Form Content */
          <div>
            {/* Modal Header */}
            <div className="mb-4 pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-2">
                <Zap className="w-3.5 h-3.5" />
                <span>Devis Gratuit & Sans Engagement</span>
              </div>
              <h3
                className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight"
                style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
              >
                Votre demande de devis sur-mesure
              </h3>
            </div>

            {/* MANDATORY DISPLAYED PHRASE */}
            <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/35 mb-5 flex items-start gap-3 shadow-[0_0_20px_rgba(0,210,255,0.1)]">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-cyan-200 font-medium leading-relaxed">
                « Plus votre demande est détaillée, plus l'artisan pourra préparer efficacement votre échange. »
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* 1. TYPE DE PRESTATION (Menu déroulant avec petite flèche) */}
              <div ref={typeDropdownRef} className="relative">
                <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider flex items-center justify-between">
                  <span>Type de projet *</span>
                  <span className="text-[10px] text-slate-400 font-normal">Cliquez pour choisir votre prestation</span>
                </label>

                {/* Bouton déclencheur avec petite flèche */}
                <button
                  type="button"
                  id="quote-project-type-trigger"
                  onClick={() => setIsTypeDropdownOpen((prev) => !prev)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer text-left ${
                    isTypeDropdownOpen
                      ? 'bg-slate-900 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,210,255,0.25)] ring-1 ring-cyan-400'
                      : 'bg-slate-900 border-slate-700 text-slate-100 hover:border-slate-600 hover:bg-slate-850'
                  }`}
                  aria-expanded={isTypeDropdownOpen}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base shrink-0">{currentTypeObj.icon}</span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs sm:text-sm font-bold text-white truncate">
                        {currentTypeObj.label}
                      </span>
                      <span className="text-[10px] text-slate-400 truncate">
                        {currentTypeObj.hint}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pl-2 shrink-0">
                    <span className="text-[10px] text-cyan-400 font-medium hidden sm:inline">Modifier</span>
                    <div className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-cyan-400 transition-transform duration-200 ${
                          isTypeDropdownOpen ? 'rotate-180 text-white' : ''
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Liste des lignes déroulantes */}
                {isTypeDropdownOpen && (
                  <div
                    id="quote-project-type-menu"
                    className="absolute z-20 left-0 right-0 mt-1.5 py-1.5 rounded-2xl bg-[#081024] border border-cyan-500/40 shadow-[0_15px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(0,210,255,0.15)] max-h-64 overflow-y-auto divide-y divide-slate-800/60"
                  >
                    {QUOTE_TYPES.map((type) => {
                      const isSelected = serviceType === type.label;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => {
                            setServiceType(type.label);
                            setIsTypeDropdownOpen(false);
                          }}
                          className={`w-full px-3.5 py-2.5 flex items-center justify-between text-left transition-colors cursor-pointer group ${
                            isSelected
                              ? 'bg-cyan-950/70 text-cyan-300 font-semibold'
                              : 'text-slate-200 hover:bg-slate-800/80 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="text-base shrink-0">{type.icon}</span>
                            <div className="min-w-0">
                              <div className={`text-xs sm:text-sm ${isSelected ? 'text-cyan-300 font-bold' : 'text-slate-200 font-medium'}`}>
                                {type.label}
                              </div>
                              <div className="text-[10px] text-slate-400 group-hover:text-slate-300 truncate">
                                {type.hint}
                              </div>
                            </div>
                          </div>
                          {isSelected && (
                            <Check className="w-4 h-4 text-cyan-400 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 2. DATE SOUHAITÉE */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Date souhaitée d'intervention</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">Selon vos disponibilités</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                  {TIMEFRAMES.map((option) => {
                    const isSelected = desiredDateOption === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setDesiredDateOption(option)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.25)]'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {desiredDateOption === 'Date précise' && (
                  <div className="mt-2 animate-in fade-in duration-200">
                    <input
                      type="date"
                      value={specificDate}
                      onChange={(e) => setSpecificDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/50 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                )}
              </div>

              {/* 3. BUDGET INDICATIF FACULTATIF */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Euro className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Budget indicatif (facultatif)</span>
                  </span>
                  <span className="text-[10px] text-emerald-400/80 font-normal">Aide à calibrer le matériel</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mb-2">
                  {BUDGET_RANGES.map((b) => {
                    const isSelected = budgetRange === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => {
                          setBudgetRange(isSelected ? '' : b);
                          if (!isSelected) setCustomBudget('');
                        }}
                        className={`px-2 py-1.5 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={customBudget}
                    onChange={(e) => {
                      setCustomBudget(e.target.value);
                      if (e.target.value) setBudgetRange('');
                    }}
                    placeholder="Ou saisissez un montant indicatif libre en € (ex: 2 500 €)..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-emerald-400 focus:outline-none placeholder-slate-500"
                  />
                </div>
              </div>



              {/* 5. DESCRIPTION */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
                  Description détaillée du projet
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Précisez votre besoin : nombre de pièces, surface, puissance souhaitée, contraintes techniques..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none placeholder-slate-500 resize-none"
                />
              </div>

              {/* 6. COORDONNÉES CLIENT */}
              <div className="pt-2 border-t border-slate-800/80">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Vos coordonnées
                </div>

                {/* Nom & Téléphone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Nom & Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ex: Jean Dupont"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="06 XX XX XX XX"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none placeholder-slate-500 font-mono"
                    />
                  </div>
                </div>

                {/* Email & Ville */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre.email@exemple.fr"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Ville ou commune d'intervention
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ex: Nègrepelisse, Montauban..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none placeholder-slate-500"
                    />
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
                <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
                  <Shield className="w-3.5 h-3.5" />
                  Garantie décennale & Assurance pro
                </span>
                <span>Réponse technique sous 24h ouvrées</span>
              </div>

              {submitError && (
                <div className="p-3 mb-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-400 text-xs text-center font-medium">
                  {submitError}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 rounded-full text-sm font-bold text-white shadow-[0_0_30px_rgba(255,30,39,0.45)] hover:shadow-[0_0_40px_rgba(255,30,39,0.7)] transition-all flex items-center justify-center gap-2 mt-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
                }`}
                style={{
                  background: 'linear-gradient(135deg, #FF263D 0%, #E6001E 50%, #B30012 100%)',
                }}
              >
                <span>{isSubmitting ? 'Envoi en cours...' : 'Transmettre ma demande de devis'}</span>
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
