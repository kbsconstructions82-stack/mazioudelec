import React, { useState, useRef } from 'react';
import {
  Zap,
  ZapOff,
  PlugZap,
  Lightbulb,
  Flame,
  CircuitBoard,
  Home,
  Sparkles,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Phone,
  Camera,
  X,
  ShieldAlert,
  HelpCircle,
  LucideIcon
} from 'lucide-react';

interface ProblemOption {
  id: string;
  label: string;
  badge: string;
  isDangerous?: boolean;
  hint: string;
  icon: LucideIcon;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  glowShadow: string;
  hoverGlow: string;
}

const PROBLEMS: ProblemOption[] = [
  {
    id: 'no_power',
    label: "Plus d'électricité",
    badge: 'Coupure',
    hint: 'Coupure totale ou partielle du courant dans le logement',
    icon: Zap,
    iconBg: 'bg-amber-500/15',
    iconBorder: 'border-amber-400/50',
    iconColor: 'text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]',
    glowShadow: 'shadow-[0_0_20px_rgba(251,191,36,0.35)]',
    hoverGlow: 'group-hover:shadow-[0_0_30px_rgba(251,191,36,0.65)] group-hover:border-amber-300',
  },
  {
    id: 'breaker_trips',
    label: 'Le disjoncteur saute',
    badge: 'Disjonction',
    hint: 'Le disjoncteur général ou un divisionnaire ne tient pas',
    icon: ZapOff,
    iconBg: 'bg-rose-500/15',
    iconBorder: 'border-rose-400/50',
    iconColor: 'text-rose-300 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]',
    glowShadow: 'shadow-[0_0_20px_rgba(244,63,94,0.35)]',
    hoverGlow: 'group-hover:shadow-[0_0_30px_rgba(244,63,94,0.65)] group-hover:border-rose-300',
  },
  {
    id: 'socket_broken',
    label: 'Une prise ne fonctionne plus',
    badge: 'Prise HS',
    hint: 'Prise murale inactive, sans tension ou noircie',
    icon: PlugZap,
    iconBg: 'bg-cyan-500/15',
    iconBorder: 'border-cyan-400/50',
    iconColor: 'text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]',
    glowShadow: 'shadow-[0_0_20px_rgba(6,182,212,0.35)]',
    hoverGlow: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.65)] group-hover:border-cyan-300',
  },
  {
    id: 'lighting_issue',
    label: "Problème d'éclairage",
    badge: 'Lumière',
    hint: 'Ampoules qui clignotent, va-et-vient ou spots défaillants',
    icon: Lightbulb,
    iconBg: 'bg-yellow-500/15',
    iconBorder: 'border-yellow-400/50',
    iconColor: 'text-yellow-300 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]',
    glowShadow: 'shadow-[0_0_20px_rgba(234,179,8,0.35)]',
    hoverGlow: 'group-hover:shadow-[0_0_30px_rgba(234,179,8,0.65)] group-hover:border-yellow-300',
  },
  {
    id: 'overheating_smell',
    label: 'Installation qui chauffe / odeur suspecte',
    badge: 'Danger',
    isDangerous: true,
    hint: 'Odeur de plastique brûlé, surchauffe ou grésillement',
    icon: Flame,
    iconBg: 'bg-red-600/20',
    iconBorder: 'border-red-500/70',
    iconColor: 'text-red-400 drop-shadow-[0_0_12px_rgba(239,68,68,0.9)]',
    glowShadow: 'shadow-[0_0_25px_rgba(239,68,68,0.45)]',
    hoverGlow: 'group-hover:shadow-[0_0_35px_rgba(239,68,68,0.75)] group-hover:border-red-400',
  },
  {
    id: 'panel_issue',
    label: 'Tableau électrique',
    badge: 'Tableau',
    hint: 'Vétusté, fusibles à changer ou ajout de lignes',
    icon: CircuitBoard,
    iconBg: 'bg-sky-500/15',
    iconBorder: 'border-sky-400/50',
    iconColor: 'text-sky-300 drop-shadow-[0_0_10px_rgba(14,165,233,0.8)]',
    glowShadow: 'shadow-[0_0_20px_rgba(14,165,233,0.35)]',
    hoverGlow: 'group-hover:shadow-[0_0_30px_rgba(14,165,233,0.65)] group-hover:border-sky-300',
  },
  {
    id: 'renovation',
    label: 'Installation à rénover',
    badge: 'Normes',
    hint: 'Rénovation complète, conformité NF C 15-100, Consuel',
    icon: Home,
    iconBg: 'bg-emerald-500/15',
    iconBorder: 'border-emerald-400/50',
    iconColor: 'text-emerald-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]',
    glowShadow: 'shadow-[0_0_20px_rgba(16,185,129,0.35)]',
    hoverGlow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.65)] group-hover:border-emerald-300',
  },
  {
    id: 'other',
    label: 'Autre demande',
    badge: 'Sur-mesure',
    hint: 'Borne de recharge, domotique, étude spécifique',
    icon: Sparkles,
    iconBg: 'bg-violet-500/15',
    iconBorder: 'border-violet-400/50',
    iconColor: 'text-violet-300 drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]',
    glowShadow: 'shadow-[0_0_20px_rgba(139,92,246,0.35)]',
    hoverGlow: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.65)] group-hover:border-violet-300',
  },
];

export const InteractiveDiagnostic: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedProblem, setSelectedProblem] = useState<ProblemOption | null>(null);

  // Questionnaire answers
  const [scope, setScope] = useState<string>('Toute l’habitation');
  const [behavior, setBehavior] = useState<string>('Immédiatement au réarmement');
  const [duration, setDuration] = useState<string>("Moins d'1 heure");
  const [details, setDetails] = useState<string>('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string>('');

  // Contact info
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [city, setCity] = useState<string>('Nègrepelisse');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectProblem = (problem: ProblemOption) => {
    setSelectedProblem(problem);
    setCurrentStep(2);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setPhotoName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setPhotoName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGoToStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handleSubmitDiagnostic = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(4);
  };

  const handleReset = () => {
    setSelectedProblem(null);
    setCurrentStep(1);
    setScope('Toute l’habitation');
    setBehavior('Immédiatement au réarmement');
    setDuration("Moins d'1 heure");
    setDetails('');
    setPhotoPreview(null);
    setPhotoName('');
    setFullName('');
    setPhone('');
  };

  return (
    <section
      id="diagnostic"
      className="relative py-16 sm:py-24 bg-[#020712] border-b border-cyan-500/20 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(0,210,255,0.15)]">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>DIAGNOSTIC RAPIDE • MINI-ASSISTANT</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-3"
            style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
          >
            Quel est votre{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
              problème ?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Identifiez votre situation en quelques clics pour transmettre une fiche technique claire à notre artisan électricien.
          </p>
        </div>

        {/* Global Mandatory Safety Warning Disclaimer */}
        <div className="mb-8 p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30 flex items-start gap-3 text-xs sm:text-sm text-slate-300 shadow-[0_0_20px_rgba(245,158,11,0.08)]">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-amber-300">Information de sécurité :</strong> Ce questionnaire recueille des indications techniques utiles pour préparer l'intervention. Il ne constitue pas un diagnostic définitif et ne remplace pas l'intervention d'un électricien habilité.
          </p>
        </div>

        {/* Multi-step Container */}
        <div className="rounded-2xl sm:rounded-3xl bg-slate-950/90 border-2 border-cyan-500/30 p-3 sm:p-8 shadow-[0_0_50px_rgba(0,210,255,0.12)] overflow-hidden">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6 text-[11px] sm:text-xs text-slate-400">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs shrink-0 ${
                currentStep >= 1 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                1
              </span>
              <span className={`truncate max-w-[80px] sm:max-w-none ${currentStep === 1 ? 'text-white font-semibold' : ''}`}>Problème</span>
            </div>

            <div className="h-0.5 w-4 sm:w-12 bg-slate-800" />

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs shrink-0 ${
                currentStep >= 2 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                2
              </span>
              <span className={`truncate max-w-[80px] sm:max-w-none ${currentStep === 2 ? 'text-white font-semibold' : ''}`}>Précisions</span>
            </div>

            <div className="h-0.5 w-4 sm:w-12 bg-slate-800" />

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs shrink-0 ${
                currentStep >= 3 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                3
              </span>
              <span className={`truncate max-w-[80px] sm:max-w-none ${currentStep === 3 ? 'text-white font-semibold' : ''}`}>Contact</span>
            </div>
          </div>

          {/* STEP 1: Problem Selection (2 COLUMNS ON MOBILE with guaranteed zero overflow) */}
          {currentStep === 1 && (
            <div>
              <div className="text-center sm:text-left mb-5 sm:mb-6">
                <h3
                  className="text-base sm:text-2xl font-black text-white mb-1"
                  style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
                >
                  Sélectionnez la nature de votre problème :
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Cliquez sur la carte correspondant le plus précisément à votre situation.
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                {PROBLEMS.map((problem) => {
                  const isDangerous = problem.isDangerous;
                  return (
                    <button
                      key={problem.id}
                      onClick={() => handleSelectProblem(problem)}
                      className={`group relative flex flex-col justify-between p-2.5 sm:p-5 rounded-xl sm:rounded-2xl text-left transition-all duration-300 cursor-pointer overflow-hidden border-2 min-w-0 ${
                        isDangerous
                          ? 'bg-red-950/30 border-red-500/40 hover:border-red-400 hover:shadow-[0_0_30px_rgba(255,46,68,0.3)]'
                          : 'bg-slate-900/80 border-slate-800 hover:border-cyan-400/80 hover:shadow-[0_0_30px_rgba(0,210,255,0.2)]'
                      } hover:scale-[1.02] hover:-translate-y-0.5`}
                    >
                      <div className="min-w-0 w-full">
                        <div className="flex items-center justify-between gap-1 sm:gap-1.5 mb-2 sm:mb-3 min-w-0">
                          {/* Luminous Glowing Icon Container */}
                          <div
                            className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center border transition-all duration-300 shrink-0 ${problem.iconBg} ${problem.iconBorder} ${problem.glowShadow} ${problem.hoverGlow} group-hover:scale-110`}
                          >
                            <problem.icon className={`w-4 h-4 sm:w-6 sm:h-6 ${problem.iconColor} transition-transform duration-300`} />
                          </div>
                          <span
                            className={`px-1.5 sm:px-2 py-0.5 rounded-full font-bold text-[9px] sm:text-[10px] tracking-tight sm:tracking-wide shrink min-w-0 truncate text-center ${
                              isDangerous
                                ? 'bg-red-950/80 border border-red-500/50 text-red-300'
                                : 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-300'
                            }`}
                          >
                            {problem.badge}
                          </span>
                        </div>

                        <h4
                          className={`font-black text-[11px] sm:text-sm sm:leading-snug mb-1 sm:mb-1.5 transition-colors break-words hyphens-auto leading-tight ${
                            isDangerous
                              ? 'text-red-200 group-hover:text-white'
                              : 'text-white group-hover:text-cyan-300'
                          }`}
                          style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
                        >
                          {problem.label}
                        </h4>

                        <p className="text-[10px] sm:text-xs text-slate-400 line-clamp-2 leading-tight sm:leading-relaxed">
                          {problem.hint}
                        </p>
                      </div>

                      <div
                        className={`pt-2 sm:pt-2.5 mt-2 sm:mt-3 border-t text-[10px] sm:text-xs font-bold flex items-center justify-between w-full ${
                          isDangerous
                            ? 'border-red-950/80 text-red-400 group-hover:text-red-300'
                            : 'border-slate-800 text-cyan-400 group-hover:text-cyan-300'
                        }`}
                      >
                        <span>Choisir</span>
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Adapted Targeted Questions */}
          {currentStep === 2 && selectedProblem && (
            <div>
              {/* Top problem summary bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${selectedProblem.iconBg} ${selectedProblem.iconBorder} ${selectedProblem.glowShadow}`}>
                    <selectedProblem.icon className={`w-5 h-5 ${selectedProblem.iconColor}`} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                      Problème sélectionné
                    </span>
                    <div className="text-sm font-bold text-white">
                      {selectedProblem.label}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Modifier le problème</span>
                </button>
              </div>

              {/* High Danger Safety Banner (If overheating/smell or danger indicated) */}
              {selectedProblem.isDangerous && (
                <div
                  id="danger-safety-recommendation"
                  className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-950/90 via-red-900/60 to-red-950/90 border-2 border-red-500 text-red-200 shadow-[0_0_35px_rgba(255,30,39,0.4)] animate-pulse"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-red-900 border border-red-400 flex items-center justify-center text-white shrink-0">
                      <Flame className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="space-y-2 flex-grow">
                      <div className="text-sm sm:text-base font-black text-white uppercase tracking-wider">
                        🚨 Consigne de sécurité immédiate
                      </div>
                      <p className="text-xs sm:text-sm text-red-100 font-medium leading-relaxed">
                        « En cas de danger immédiat, fumée, feu ou risque d'électrocution, éloignez-vous de l'installation et contactez les services d'urgence appropriés. »
                      </p>
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <a
                          href="tel:0766072094"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-bold shadow-[0_0_15px_rgba(255,46,68,0.5)] transition-all"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Appeler l'électricien : 07 66 07 20 94</span>
                        </a>
                        <span className="text-xs text-red-300 font-mono">
                          Pompiers : 18 / Urgences : 112
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Form with simple tailored questions */}
              <form onSubmit={handleGoToStep3} className="space-y-5">
                {/* Question 1: Scope */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-2 uppercase tracking-wider">
                    1. Le problème concerne-t-il toute l'habitation ?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      "Toute l'habitation",
                      'Une seule pièce / une zone précise',
                      'Un seul appareil / une prise spécifique',
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setScope(opt)}
                        className={`px-3.5 py-3 rounded-xl border text-xs font-medium transition-all text-left flex items-center justify-between cursor-pointer ${
                          scope === opt
                            ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,210,255,0.2)]'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        <span>{opt}</span>
                        {scope === opt && <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 2: Breaker behavior / Frequency */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-2 uppercase tracking-wider">
                    2. Le disjoncteur saute-t-il immédiatement ?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      'Immédiatement dès le réarmement',
                      'De manière aléatoire / intermittente',
                      'Non / Ne disjoncte pas',
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setBehavior(opt)}
                        className={`px-3.5 py-3 rounded-xl border text-xs font-medium transition-all text-left flex items-center justify-between cursor-pointer ${
                          behavior === opt
                            ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,210,255,0.2)]'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        <span>{opt}</span>
                        {behavior === opt && <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 3: Duration */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-2 uppercase tracking-wider">
                    3. Depuis combien de temps constatez-vous cela ?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      "Moins d'1 heure",
                      "Aujourd'hui",
                      'Depuis quelques jours',
                      'Problème ancien / récurrent',
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setDuration(opt)}
                        className={`px-3 py-2.5 rounded-xl border text-xs font-medium transition-all text-center cursor-pointer ${
                          duration === opt
                            ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,210,255,0.2)]'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 4: Photo Upload with Drag & Drop */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-2 uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-cyan-400" />
                      <span>4. Pouvez-vous envoyer une photo ? (Optionnel mais recommandé)</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      Tableau, prise, disjoncteur...
                    </span>
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="diagnostic-photo-upload"
                  />

                  {photoPreview ? (
                    <div className="relative p-3 rounded-2xl bg-slate-900 border border-cyan-500/40 flex items-center gap-4">
                      <img
                        src={photoPreview}
                        alt="Aperçu de la panne"
                        className="w-20 h-20 object-cover rounded-xl border border-cyan-500/30"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-grow">
                        <div className="text-xs font-bold text-white truncate max-w-xs">
                          {photoName || 'Photo jointe'}
                        </div>
                        <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Photo prête pour l’artisan</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-red-950 hover:text-red-400 text-slate-300 transition-all cursor-pointer"
                        title="Supprimer la photo"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={() => fileInputRef.current?.click()}
                      className="p-5 rounded-2xl bg-slate-900/60 border-2 border-dashed border-slate-700 hover:border-cyan-400/70 transition-all text-center cursor-pointer group"
                    >
                      <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-cyan-400 mx-auto mb-2 transition-colors" />
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-white">
                        Glissez-déposez une photo ici ou{' '}
                        <span className="text-cyan-400 underline">parcourez vos fichiers</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Format JPG, PNG, WEBP acceptés
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional free text details */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
                    Détails complémentaires ou constatations particulières
                  </label>
                  <textarea
                    rows={2}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Ex: Le tableau fait un petit sifflement, cela se produit quand le lave-linge tourne..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none placeholder-slate-500"
                  />
                </div>

                {/* Buttons */}
                <div className="pt-3 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Retour</span>
                  </button>

                  <button
                    type="submit"
                    className="group px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(0,210,255,0.3)] flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continuer vers mes coordonnées</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: Contact Details & Submit */}
          {currentStep === 3 && selectedProblem && (
            <div>
              <div className="mb-5">
                <h3
                  className="text-lg sm:text-2xl font-black text-white mb-1"
                  style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
                >
                  Où l'artisan doit-il vous joindre ?
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Renseignez vos coordonnées afin que MAZIOUDELEC examine votre diagnostic technique.
                </p>
              </div>

              {/* Summary pill card */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 mb-6 text-xs text-slate-300 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Problème :</span>
                  <span className="font-bold text-white flex items-center gap-2">
                    <selectedProblem.icon className={`w-4 h-4 ${selectedProblem.iconColor}`} />
                    <span>{selectedProblem.label}</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Étendue :</span>
                  <span className="text-cyan-300">{scope}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Fréquence :</span>
                  <span className="text-slate-200">{behavior}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Photo jointe :</span>
                  <span className="text-emerald-400">{photoPreview ? 'Oui (1 image)' : 'Non'}</span>
                </div>
              </div>

              <form onSubmit={handleSubmitDiagnostic} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Votre Nom & Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ex: David Dupont"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Numéro de téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ex: 06 12 34 56 78"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/50 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none placeholder-slate-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Ville (Nègrepelisse & Rayon de 40 km) *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ex: Nègrepelisse, Montauban, Caussade..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none placeholder-slate-500"
                  />
                </div>

                <div className="pt-3 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Retour</span>
                  </button>

                  <button
                    type="submit"
                    className="group px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(0,210,255,0.3)] flex items-center gap-2 cursor-pointer"
                  >
                    <span>Transmettre mon diagnostic technique</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 4: Success & Summary */}
          {currentStep === 4 && selectedProblem && (
            <div className="text-center py-6 sm:py-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-950/80 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-4 text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.4)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/90 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
                Diagnostic Technique Transmis
              </div>

              <h3
                className="text-2xl sm:text-3xl font-black text-white mb-2"
                style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
              >
                Merci {fullName || 'cher client'} !
              </h3>

              <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto mb-6 leading-relaxed">
                Les éléments recueillis concernant votre problème de <strong className="text-white">{selectedProblem.label}</strong> à <strong className="text-cyan-300">{city}</strong> ont été transmis directement à notre électricien.
              </p>

              {/* Technical summary recap */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 text-left text-xs sm:text-sm text-slate-300 space-y-2 mb-6 max-w-md mx-auto">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Problème :</span>
                  <span className="font-semibold text-white flex items-center gap-2">
                    <selectedProblem.icon className={`w-4 h-4 ${selectedProblem.iconColor}`} />
                    <span>{selectedProblem.label}</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Étendue constatée :</span>
                  <span className="text-cyan-300">{scope}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Déclenchement :</span>
                  <span className="text-slate-200">{behavior}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Constaté depuis :</span>
                  <span className="text-slate-200">{duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Délai estimé de rappel :</span>
                  <span className="text-emerald-400 font-bold">
                    {selectedProblem.isDangerous ? '< 15 minutes' : 'Sous 1 à 2 heures'}
                  </span>
                </div>
              </div>

              {/* Direct call banner */}
              <div className="max-w-md mx-auto mb-6 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-300">Besoin d'accélérer l'intervention ?</span>
                <a
                  href="tel:0766072094"
                  className="font-bold text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  07 66 07 20 94
                </a>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                Faire un autre diagnostic
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
