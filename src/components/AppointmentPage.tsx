import React, { useState, useRef, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Wrench,
  Zap,
  Home,
  ShieldCheck,
  CircuitBoard,
  Lightbulb,
  Wind,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Camera,
  CheckCircle2,
  ArrowLeft,
  Info,
  FileText,
  X,
  Send,
  AlertTriangle
} from 'lucide-react';

interface AppointmentPageProps {
  onNavigateHome: () => void;
  initialService?: string;
}

// 8 Required Services
const SERVICES = [
  {
    id: 'depannage',
    name: 'Dépannage',
    icon: Wrench,
    desc: 'Panne soudaine, coupure, recherche de défaut ou équipement défaillant',
    badge: 'Intervention d’urgence / rapide',
    color: 'amber',
  },
  {
    id: 'installation',
    name: 'Installation',
    icon: Zap,
    desc: 'Création d’un réseau électrique neuf, ajout de prises, circuits dédiés',
    badge: 'Neuf & Extension',
    color: 'cyan',
  },
  {
    id: 'renovation',
    name: 'Rénovation',
    icon: Home,
    desc: 'Remise à niveau complète d’une maison, appartement ou local',
    badge: 'Projet global',
    color: 'emerald',
  },
  {
    id: 'conformite',
    name: 'Mise en conformité',
    icon: ShieldCheck,
    desc: 'Sécurisation aux normes NF C 15-100, préparation contrôle Consuel',
    badge: 'Sécurité & Normes',
    color: 'blue',
  },
  {
    id: 'tableau',
    name: 'Tableau électrique',
    icon: CircuitBoard,
    desc: 'Remplacement de tableau à fusibles, ajout de disjoncteurs différentiels',
    badge: 'Cœur d’installation',
    color: 'sky',
  },
  {
    id: 'eclairage',
    name: 'Éclairage',
    icon: Lightbulb,
    desc: 'Éclairage intérieur architectural, extérieur jardin, LED basse consommation',
    badge: 'Confort & Design',
    color: 'yellow',
  },
  {
    id: 'vmc',
    name: 'VMC',
    icon: Wind,
    desc: 'Ventilation simple ou double flux, assainissement de l’air ambiant',
    badge: 'Qualité de l’air',
    color: 'teal',
  },
  {
    id: 'autre',
    name: 'Autre',
    icon: Sparkles,
    desc: 'Borne de recharge IRVE, domotique, interphonie ou projet spécifique',
    badge: 'Sur-mesure',
    color: 'purple',
  },
];

// Available Time Slots grouped by period
const TIME_SLOTS = [
  { id: 'matin-1', time: '08:30 - 10:00', period: 'Matin', badge: 'Début de matinée' },
  { id: 'matin-2', time: '10:00 - 12:00', period: 'Matin', badge: 'Fin de matinée' },
  { id: 'aprem-1', time: '14:00 - 16:00', period: 'Après-midi', badge: 'Début d’après-midi' },
  { id: 'aprem-2', time: '16:00 - 18:00', period: 'Après-midi', badge: 'Fin d’après-midi' },
  { id: 'soir-1', time: '18:00 - 19:30', period: 'Fin de journée', badge: 'Créneau fin de journée' },
];

export const AppointmentPage: React.FC<AppointmentPageProps> = ({ onNavigateHome, initialService }) => {
  // Current Step: 1, 2, 3, 4, 5
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [selectedService, setSelectedService] = useState<string>(initialService || 'Dépannage');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('08:30 - 10:00');

  // Client Details
  const [nom, setNom] = useState<string>('');
  const [prenom, setPrenom] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [adresse, setAdresse] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [commentaire, setCommentaire] = useState<string>('');

  // Photos
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Calendar Month Navigation
  const [calendarOffset, setCalendarOffset] = useState<number>(0);

  // Initialize with a valid upcoming date (e.g. tomorrow or next Monday if weekend)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Prise de rendez-vous en ligne - MAZIOUDELEC';

    // Default to tomorrow or next business day
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (tomorrow.getDay() === 0) { // Sunday
      tomorrow.setDate(tomorrow.getDate() + 1);
    }
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setSelectedDate(`${yyyy}-${mm}-${dd}`);
  }, []);

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

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setPhotoName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Generate upcoming days for quick selection (next 14 days)
  const getUpcomingDays = () => {
    const days = [];
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + 1); // start tomorrow

    for (let i = 0; i < 21; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      // Skip Sundays (artisan repos hebdomadaire sauf urgence)
      if (d.getDay() !== 0) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd}`;
        const dayName = d.toLocaleDateString('fr-FR', { weekday: 'short' });
        const dayNumber = d.getDate();
        const monthName = d.toLocaleDateString('fr-FR', { month: 'short' });

        days.push({
          dateStr,
          dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1),
          dayNumber,
          monthName,
          isSaturday: d.getDay() === 6,
          isToday: i === 0,
        });
      }
    }
    return days;
  };

  const upcomingDays = getUpcomingDays();

  // Navigation between steps with validation
  const goToNextStep = () => {
    if (currentStep === 1) {
      if (!selectedService) return;
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!selectedDate) return;
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!selectedSlot) return;
      setCurrentStep(4);
    } else if (currentStep === 4) {
      if (!nom.trim() || !prenom.trim() || !telephone.trim() || !adresse.trim()) {
        alert('Veuillez renseigner votre nom, prénom, téléphone et adresse d’intervention.');
        return;
      }
      setCurrentStep(5);
    }
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 700);
  };

  const handleResetAll = () => {
    setCurrentStep(1);
    setIsSubmitted(false);
    setSelectedService('Dépannage');
    setSelectedSlot('08:30 - 10:00');
    setNom('');
    setPrenom('');
    setTelephone('');
    setEmail('');
    setAdresse('');
    setDescription('');
    setCommentaire('');
    setPhotoPreview(null);
    setPhotoName('');
  };

  // Helper formatting date in French
  const formatDateFriendly = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    return dateObj.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const currentServiceObj = SERVICES.find(s => s.name === selectedService) || SERVICES[0];
  const ServiceIcon = currentServiceObj.icon;

  const STEPS_LABELS = [
    { num: 1, title: 'Prestation' },
    { num: 2, title: 'Date' },
    { num: 3, title: 'Créneau' },
    { num: 4, title: 'Coordonnées' },
    { num: 5, title: 'Confirmation' },
  ];

  return (
    <div className="min-h-screen bg-[#020712] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Header bar */}
      <header className="sticky top-0 z-50 bg-[#020712]/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>Retour à l'accueil</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-cyan-300">
              Réservation en ligne 24/7
            </span>
          </div>

          <a
            href="tel:0766072094"
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-cyan-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all font-mono"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">07 66 07 20 94</span>
            <span className="sm:hidden">Appel</span>
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10">
        {/* SUCCESS CONFIRMATION VIEW */}
        {isSubmitted ? (
          <div className="my-8 p-6 sm:p-10 rounded-3xl bg-slate-950 border-2 border-cyan-400/60 shadow-[0_0_60px_rgba(0,210,255,0.2)] text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-full bg-cyan-950/80 border-2 border-cyan-400 flex items-center justify-center mx-auto mb-6 text-cyan-400 shadow-[0_0_30px_rgba(0,210,255,0.4)]">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="inline-block px-4 py-1 rounded-full bg-cyan-950/90 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-3">
              Demande enregistrée avec succès
            </div>

            {/* Exact user-requested success message */}
            <h1
              className="text-2xl sm:text-4xl font-black text-white mb-3"
              style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
            >
              Votre demande de rendez-vous a bien été enregistrée.
            </h1>

            {/* Explicit confirmation notice requested */}
            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 max-w-xl mx-auto mb-6 text-sm text-cyan-200 text-left flex items-start gap-3">
              <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Information importante :</strong> Votre rendez-vous est une <strong>DEMANDE à confirmer</strong> par votre électricien. L'artisan prendra contact avec vous dans les plus brefs délais par téléphone ou email pour valider définitivement votre créneau et préparer l’intervention.
              </div>
            </div>

            {/* Technical recap */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-left text-xs sm:text-sm space-y-2.5 max-w-lg mx-auto mb-8 text-slate-300">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Prestation demandée :</span>
                <span className="font-bold text-cyan-300">{selectedService}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Date souhaitée :</span>
                <span className="font-bold text-white capitalize">{formatDateFriendly(selectedDate)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Créneau horaire :</span>
                <span className="font-bold text-emerald-400 font-mono">{selectedSlot}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Client :</span>
                <span className="font-medium text-white">{prenom} {nom}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Téléphone de contact :</span>
                <span className="font-mono text-white">{telephone}</span>
              </div>
              {email && (
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Email :</span>
                  <span className="text-white">{email}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Adresse d’intervention :</span>
                <span className="text-white text-right max-w-[220px] truncate">{adresse}</span>
              </div>
              {photoName && (
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Photo jointe :</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{photoName}</span>
                  </span>
                </div>
              )}
              {description && (
                <div className="pt-1">
                  <span className="text-slate-400 block mb-1">Description :</span>
                  <p className="text-white bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs italic">
                    "{description}"
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleResetAll}
                className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                Prendre un autre rendez-vous
              </button>
              <button
                type="button"
                onClick={onNavigateHome}
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-[0_0_20px_rgba(0,210,255,0.4)]"
              >
                Retourner à l'accueil
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Top Page Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Réservation en ligne • Devis gratuit sur place</span>
              </div>

              <h1
                className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2"
                style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
              >
                Prendre Rendez-vous avec votre Électricien
              </h1>

              <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
                Choisissez votre prestation, votre créneau et recevez une confirmation rapide pour votre intervention à Nègrepelisse et dans un rayon de 40 km.
              </p>
            </div>

            {/* Stepper Progress Bar */}
            <div className="mb-8 p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between relative">
                {/* Connecting background line */}
                <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
                <div
                  className="absolute top-1/2 left-4 h-0.5 bg-gradient-to-r from-cyan-500 to-sky-400 -translate-y-1/2 z-0 transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / (STEPS_LABELS.length - 1)) * 92}%` }}
                />

                {STEPS_LABELS.map((step) => {
                  const isCompleted = currentStep > step.num;
                  const isCurrent = currentStep === step.num;

                  return (
                    <button
                      key={step.num}
                      type="button"
                      onClick={() => {
                        // Allow clicking back to already completed steps
                        if (isCompleted) {
                          setCurrentStep(step.num);
                        }
                      }}
                      className={`relative z-10 flex flex-col items-center gap-1.5 focus:outline-none ${
                        isCompleted ? 'cursor-pointer' : 'cursor-default'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          isCompleted
                            ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,210,255,0.6)]'
                            : isCurrent
                            ? 'bg-cyan-950 border-2 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,210,255,0.4)] scale-110'
                            : 'bg-slate-900 border border-slate-800 text-slate-500'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.num}
                      </div>
                      <span
                        className={`text-[10px] sm:text-xs font-semibold hidden sm:inline transition-colors ${
                          isCurrent ? 'text-cyan-300' : isCompleted ? 'text-white' : 'text-slate-500'
                        }`}
                      >
                        {step.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP CONTAINER */}
            <div className="rounded-3xl bg-slate-950/90 border border-slate-800 p-5 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* STEP 1: Choisir la prestation */}
              {currentStep === 1 && (
                <div>
                  <div className="mb-6">
                    <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider mb-1">
                      Étape 1 sur 5
                    </div>
                    <h2
                      className="text-xl sm:text-2xl font-black text-white"
                      style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
                    >
                      Choisissez la prestation souhaitée
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Sélectionnez la catégorie correspondant au besoin de votre logement ou entreprise.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {SERVICES.map((srv) => {
                      const Icon = srv.icon;
                      const isSelected = selectedService === srv.name;

                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => setSelectedService(srv.name)}
                          className={`group p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
                            isSelected
                              ? 'bg-cyan-950/50 border-cyan-400 shadow-[0_0_25px_rgba(0,210,255,0.25)] scale-[1.01]'
                              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                          }`}
                        >
                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                              isSelected
                                ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.5)]'
                                : 'bg-slate-800 border-slate-700 text-cyan-400 group-hover:border-cyan-500/50'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>

                          <div className="flex-grow min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="font-bold text-sm sm:text-base text-white">
                                {srv.name}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                                  isSelected
                                    ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/40'
                                    : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                {srv.badge}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                              {srv.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={goToNextStep}
                      className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(0,210,255,0.4)] flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                    >
                      <span>Continuer vers la date</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Choisir une date */}
              {currentStep === 2 && (
                <div>
                  <div className="mb-6">
                    <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider mb-1">
                      Étape 2 sur 5
                    </div>
                    <h2
                      className="text-xl sm:text-2xl font-black text-white"
                      style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
                    >
                      Choisissez la date d’intervention
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Intervention du lundi au samedi à Nègrepelisse et 40 km aux alentours.
                    </p>
                  </div>

                  {/* Prestation recap badge */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 mb-6 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Prestation sélectionnée :</span>
                    <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                      <ServiceIcon className="w-3.5 h-3.5" />
                      <span>{selectedService}</span>
                    </span>
                  </div>

                  {/* Interactive Quick Date Picker Grid */}
                  <div className="mb-6">
                    <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                      Prochains jours disponibles :
                    </label>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                      {upcomingDays.slice(0, 12).map((day) => {
                        const isSelected = selectedDate === day.dateStr;

                        return (
                          <button
                            key={day.dateStr}
                            type="button"
                            onClick={() => setSelectedDate(day.dateStr)}
                            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                              isSelected
                                ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,210,255,0.35)] scale-105 ring-1 ring-cyan-400'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                            }`}
                          >
                            <span className={`text-[11px] uppercase font-bold tracking-wider ${
                              isSelected ? 'text-cyan-300' : 'text-slate-400'
                            }`}>
                              {day.dayName}
                            </span>
                            <span className="text-xl sm:text-2xl font-black text-white font-mono">
                              {day.dayNumber}
                            </span>
                            <span className="text-[10px] text-slate-400 lowercase">
                              {day.monthName}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Manual date selector input as fallback */}
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-semibold text-white block">
                        Ou choisissez une autre date ultérieure :
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Pour des travaux planifiés ou un chantier à venir
                      </span>
                    </div>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={goToPrevStep}
                      className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Retour</span>
                    </button>
                    <button
                      type="button"
                      onClick={goToNextStep}
                      disabled={!selectedDate}
                      className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(0,210,255,0.4)] flex items-center gap-2 cursor-pointer transition-all disabled:opacity-40"
                    >
                      <span>Continuer vers le créneau</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Choisir un créneau disponible */}
              {currentStep === 3 && (
                <div>
                  <div className="mb-6">
                    <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider mb-1">
                      Étape 3 sur 5
                    </div>
                    <h2
                      className="text-xl sm:text-2xl font-black text-white"
                      style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
                    >
                      Choisissez un créneau disponible
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Date retenue : <strong className="text-white capitalize">{formatDateFriendly(selectedDate)}</strong>
                    </p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = selectedSlot === slot.time;

                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSelectedSlot(slot.time)}
                          className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                            isSelected
                              ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-[0_0_25px_rgba(0,210,255,0.25)] scale-[1.01]'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                                isSelected
                                  ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_10px_rgba(0,210,255,0.5)]'
                                  : 'bg-slate-800 border-slate-700 text-cyan-400'
                              }`}
                            >
                              <Clock className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-base sm:text-lg font-bold font-mono text-white">
                                {slot.time}
                              </div>
                              <div className="text-xs text-slate-400">
                                {slot.period}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                                isSelected
                                  ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/40'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {slot.badge}
                            </span>
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? 'border-cyan-400 bg-cyan-500 text-slate-950'
                                  : 'border-slate-700 bg-slate-900'
                              }`}
                            >
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={goToPrevStep}
                      className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Retour</span>
                    </button>
                    <button
                      type="button"
                      onClick={goToNextStep}
                      disabled={!selectedSlot}
                      className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(0,210,255,0.4)] flex items-center gap-2 cursor-pointer transition-all disabled:opacity-40"
                    >
                      <span>Continuer vers les coordonnées</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Renseigner les coordonnées */}
              {currentStep === 4 && (
                <div>
                  <div className="mb-6">
                    <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider mb-1">
                      Étape 4 sur 5
                    </div>
                    <h2
                      className="text-xl sm:text-2xl font-black text-white"
                      style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
                    >
                      Renseignez vos coordonnées
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Ces informations permettront à l’électricien de vous joindre pour confirmer l’intervention.
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {/* Nom & Prénom */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
                          Nom *
                        </label>
                        <input
                          type="text"
                          required
                          value={nom}
                          onChange={(e) => setNom(e.target.value)}
                          placeholder="Votre nom"
                          className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none placeholder-slate-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
                          Prénom *
                        </label>
                        <input
                          type="text"
                          required
                          value={prenom}
                          onChange={(e) => setPrenom(e.target.value)}
                          placeholder="Votre prénom"
                          className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none placeholder-slate-500"
                        />
                      </div>
                    </div>

                    {/* Téléphone & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
                          Téléphone * (Rappel pour confirmation)
                        </label>
                        <input
                          type="tel"
                          required
                          value={telephone}
                          onChange={(e) => setTelephone(e.target.value)}
                          placeholder="06 XX XX XX XX"
                          className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-white text-sm focus:border-cyan-400 focus:outline-none placeholder-slate-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
                          Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="votre.email@exemple.fr"
                          className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none placeholder-slate-500"
                        />
                      </div>
                    </div>

                    {/* Adresse d'intervention */}
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
                        Adresse d'intervention *
                      </label>
                      <input
                        type="text"
                        required
                        value={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                        placeholder="Numéro, rue, code postal et ville"
                        className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none placeholder-slate-500"
                      />
                    </div>

                    {/* Description du besoin */}
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
                        Description du besoin ou des travaux
                      </label>
                      <textarea
                        rows={2}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ex: Remplacement du tableau électrique vétuste, ajout de 3 prises dans le garage..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none placeholder-slate-500"
                      />
                    </div>

                    {/* Photos (File upload & Drag & drop) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider flex items-center justify-between">
                        <span>Photos (Optionnel mais très utile)</span>
                        <span className="text-[10px] text-slate-400 font-normal">Tableau, pièces, matériel</span>
                      </label>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="appointment-file-input"
                      />

                      {photoPreview ? (
                        <div className="p-3 rounded-2xl bg-slate-900 border border-cyan-500/40 flex items-center gap-3">
                          <img
                            src={photoPreview}
                            alt="Aperçu rdv"
                            className="w-16 h-16 object-cover rounded-xl border border-cyan-500/30"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-grow min-w-0">
                            <div className="text-xs font-bold text-white truncate">
                              {photoName || 'Photo jointe'}
                            </div>
                            <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Photo enregistrée</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemovePhoto}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-300 transition-colors cursor-pointer"
                            title="Retirer la photo"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div
                          onDrop={handleDrop}
                          onDragOver={(e) => e.preventDefault()}
                          onClick={() => fileInputRef.current?.click()}
                          className="p-4 rounded-xl bg-slate-900/70 border border-dashed border-slate-700 hover:border-cyan-400 transition-all text-center cursor-pointer group"
                        >
                          <Camera className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 mx-auto mb-1 transition-colors" />
                          <div className="text-xs text-slate-300 group-hover:text-white font-medium">
                            Ajouter une photo ou <span className="text-cyan-400 underline">parcourir</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Commentaire */}
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
                        Commentaire / Précisions d’accès
                      </label>
                      <input
                        type="text"
                        value={commentaire}
                        onChange={(e) => setCommentaire(e.target.value)}
                        placeholder="Interphone, code portail, chien, étage..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={goToPrevStep}
                      className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Retour</span>
                    </button>
                    <button
                      type="button"
                      onClick={goToNextStep}
                      className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(0,210,255,0.4)] flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                    >
                      <span>Vérifier et confirmer</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: Confirmer */}
              {currentStep === 5 && (
                <div>
                  <div className="mb-6">
                    <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider mb-1">
                      Étape 5 sur 5
                    </div>
                    <h2
                      className="text-xl sm:text-2xl font-black text-white"
                      style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
                    >
                      Confirmation de votre demande de rendez-vous
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Vérifiez les informations saisies avant l'envoi de votre demande à l'artisan.
                    </p>
                  </div>

                  {/* Explicit notice that it is a DEMANDE to confirm */}
                  <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 mb-6 text-xs text-amber-200 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="leading-relaxed">
                      <strong>Rappel important :</strong> Cette réservation constitue une <strong>DEMANDE de rendez-vous</strong>. L'artisan électricien vous recontactera rapidement par téléphone pour confirmer la disponibilité exacte du créneau et les détails de l’intervention.
                    </div>
                  </div>

                  {/* Complete Technical Recap */}
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm space-y-3 mb-6 text-slate-300">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <span className="text-slate-400">Prestation :</span>
                      <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                        <ServiceIcon className="w-4 h-4" />
                        <span>{selectedService}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <span className="text-slate-400">Date souhaitée :</span>
                      <span className="font-bold text-white capitalize">{formatDateFriendly(selectedDate)}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <span className="text-slate-400">Créneau horaire :</span>
                      <span className="font-bold text-emerald-400 font-mono">{selectedSlot}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <span className="text-slate-400">Client :</span>
                      <span className="font-semibold text-white">{prenom} {nom}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <span className="text-slate-400">Téléphone de contact :</span>
                      <span className="font-mono text-cyan-300 font-bold">{telephone}</span>
                    </div>

                    {email && (
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                        <span className="text-slate-400">Email :</span>
                        <span className="text-white">{email}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <span className="text-slate-400">Adresse d’intervention :</span>
                      <span className="text-white text-right font-medium">{adresse}</span>
                    </div>

                    {photoName && (
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                        <span className="text-slate-400">Photo :</span>
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{photoName}</span>
                        </span>
                      </div>
                    )}

                    {description && (
                      <div className="border-b border-slate-800 pb-2.5">
                        <span className="text-slate-400 block mb-1">Description du besoin :</span>
                        <p className="text-white bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs italic">
                          "{description}"
                        </p>
                      </div>
                    )}

                    {commentaire && (
                      <div>
                        <span className="text-slate-400 block mb-1">Commentaire d'accès :</span>
                        <p className="text-white bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs">
                          {commentaire}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Submission Form */}
                  <form onSubmit={handleFinalSubmit} className="space-y-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-base sm:text-lg shadow-[0_0_35px_rgba(0,210,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                          <span>Transmission de votre demande...</span>
                        </div>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>ENVOYER MA DEMANDE DE RENDEZ-VOUS</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={goToPrevStep}
                        className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Modifier les coordonnées</span>
                      </button>

                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Sans engagement • Réponse rapide</span>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer minimaliste */}
      <footer className="border-t border-slate-900 bg-[#01050e] py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="font-bold text-slate-400">
            MAZIOUDELEC • Électricité Générale, Dépannage & Rénovation
          </div>
          <div>
            Nègrepelisse 82800 • Montauban • Caussade • Rayon de 40 km
          </div>
          <div className="text-[11px]">
            Téléphone :{' '}
            <a href="tel:0766072094" className="text-cyan-400 font-bold hover:underline font-mono">
              07 66 07 20 94
            </a>{' '}
            • Email : mazioud.elec@gmail.com
          </div>
        </div>
      </footer>
    </div>
  );
};
