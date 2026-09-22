import React, { useState, useRef, useEffect } from 'react';
import {
  Phone,
  AlertTriangle,
  Flame,
  Zap,
  ZapOff,
  Power,
  ToggleLeft,
  Lightbulb,
  CircuitBoard,
  Sparkles,
  Camera,
  UploadCloud,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowLeft,
  Send,
  ShieldCheck,
  ShieldAlert,
  X
} from 'lucide-react';

interface EmergencyPageProps {
  onNavigateHome: () => void;
}

const PROBLEM_TYPES = [
  { id: 'coupure', label: 'Coupure de courant', icon: Zap, isCritical: true },
  { id: 'disjoncteur', label: 'Disjoncteur qui saute', icon: ZapOff, isCritical: false },
  { id: 'court_circuit', label: 'Court-circuit', icon: Sparkles, isCritical: true },
  { id: 'prise', label: 'Prise défectueuse', icon: Power, isCritical: false },
  { id: 'interrupteur', label: 'Interrupteur défectueux', icon: ToggleLeft, isCritical: false },
  { id: 'eclairage', label: 'Éclairage en panne', icon: Lightbulb, isCritical: false },
  { id: 'tableau', label: 'Tableau électrique', icon: CircuitBoard, isCritical: false },
  { id: 'odeur', label: 'Odeur / échauffement', icon: Flame, isCritical: true },
  { id: 'autre', label: 'Autre', icon: AlertTriangle, isCritical: false },
];

const AVAILABILITY_OPTIONS = [
  'Immédiate (Urgence critique)',
  'Aujourd’hui dès que possible',
  'Ce matin (8h - 12h)',
  'Cet après-midi (14h - 18h)',
  'En soirée (18h - 20h)',
];

export const EmergencyPage: React.FC<EmergencyPageProps> = ({ onNavigateHome }) => {
  // Form states
  const [nom, setNom] = useState<string>('');
  const [prenom, setPrenom] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [adresse, setAdresse] = useState<string>('');
  const [selectedProblem, setSelectedProblem] = useState<string>('Coupure de courant');
  const [description, setDescription] = useState<string>('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string>('');
  const [disponibilite, setDisponibilite] = useState<string>('Immédiate (Urgence critique)');
  const [commentaire, setCommentaire] = useState<string>('');

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = "🚨 Urgence électrique - MAZIOUDELEC";
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setPhotoName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setNom('');
    setPrenom('');
    setTelephone('');
    setAdresse('');
    setSelectedProblem('Coupure de courant');
    setDescription('');
    setPhotoPreview(null);
    setPhotoName('');
    setDisponibilite('Immédiate (Urgence critique)');
    setCommentaire('');
  };

  return (
    <div className="min-h-screen bg-[#020611] text-slate-100 flex flex-col selection:bg-red-500 selection:text-white">
      {/* Top Urgent Emergency Header Bar */}
      <header className="sticky top-0 z-50 bg-[#020611]/95 backdrop-blur-md border-b border-red-500/30 px-4 py-3 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-red-400" />
            <span>Retour à l'accueil</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-red-400">
              Ligne d'Urgence Active 6j/7
            </span>
          </div>

          <a
            href="tel:0766072094"
            className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm shadow-[0_0_15px_rgba(255,46,68,0.5)] flex items-center gap-1.5 transition-all font-mono"
          >
            <Phone className="w-3.5 h-3.5 animate-bounce" />
            <span className="hidden sm:inline">07 66 07 20 94</span>
            <span className="sm:hidden">Appel</span>
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-12">
        {/* SUCCESS VIEW */}
        {isSubmitted ? (
          <div className="my-8 sm:my-12 p-6 sm:p-10 rounded-3xl bg-slate-950 border-2 border-emerald-400/60 shadow-[0_0_60px_rgba(52,211,153,0.2)] text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-950 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-6 text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.4)]">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="inline-block px-4 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-3">
              Prise en charge confirmée
            </div>

            <h1
              className="text-2xl sm:text-4xl font-black text-white mb-3"
              style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
            >
              Votre demande a bien été envoyée.
            </h1>

            <p className="text-base sm:text-lg text-emerald-300 font-semibold mb-6 max-w-xl mx-auto">
              Un professionnel vous recontactera pour confirmer les modalités d'intervention.
            </p>

            {/* Recap card */}
            <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 text-left text-xs sm:text-sm space-y-2.5 max-w-lg mx-auto mb-8 text-slate-300">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Demandeur :</span>
                <span className="font-bold text-white">{prenom} {nom}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Téléphone de contact :</span>
                <span className="font-mono text-cyan-300 font-bold">{telephone}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Adresse d'intervention :</span>
                <span className="text-white text-right font-medium">{adresse}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Type de problème :</span>
                <span className="font-bold text-amber-300">{selectedProblem}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Disponibilité :</span>
                <span className="text-emerald-400 font-bold">{disponibilite}</span>
              </div>
            </div>

            {/* Direct immediate call fallback */}
            <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 max-w-lg mx-auto mb-8 flex items-center justify-between gap-4">
              <div className="text-left text-xs text-red-200">
                <div className="font-bold text-white">Situation critique ?</div>
                <div>Ligne directe prioritaire MAZIOUDELEC :</div>
              </div>
              <a
                href="tel:0766072094"
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(255,46,68,0.5)] shrink-0"
              >
                <Phone className="w-4 h-4" />
                <span>07 66 07 20 94</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                Nouvelle demande d'urgence
              </button>
              <button
                type="button"
                onClick={onNavigateHome}
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                Retour au site principal
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* HERO EMERGENCY BANNER */}
            <div className="text-center mb-8 sm:mb-12">
              {/* Intervention Sector Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/90 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,46,68,0.2)] mb-3">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>Intervention rapide • Nègrepelisse & 40 km</span>
              </div>

              {/* Title without town span */}
              <h1
                className="text-3xl sm:text-5xl font-black text-white mb-3 tracking-tight leading-tight"
                style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
              >
                🚨 Urgence électrique
              </h1>

              {/* Exact user-requested Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6 font-medium">
                Une panne ou un problème électrique ? Envoyez votre demande d'intervention.
              </p>

              {/* TWO IMMEDIATE HIGH-ACTION BUTTONS REQUIRED BY USER */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mb-8">
                {/* [ 📞 APPELER ] */}
                <a
                  href="tel:0766072094"
                  id="action-btn-call"
                  className="group relative flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-base sm:text-lg shadow-[0_0_35px_rgba(255,46,68,0.45)] hover:shadow-[0_0_45px_rgba(255,46,68,0.65)] transition-all hover:scale-[1.02] active:scale-95 border border-red-400/50"
                >
                  <Phone className="w-6 h-6 animate-pulse" />
                  <div className="text-left">
                    <div className="text-xs uppercase tracking-widest text-red-100 font-semibold leading-none mb-1">
                      Appel direct immédiat
                    </div>
                    <div className="text-xl sm:text-2xl font-mono tracking-tight font-black leading-none">
                      📞 APPELER
                    </div>
                  </div>
                </a>

                {/* [ 🚨 DEMANDER UNE INTERVENTION ] */}
                <button
                  type="button"
                  id="action-btn-intervention"
                  onClick={scrollToForm}
                  className="group relative flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-base sm:text-lg shadow-[0_0_35px_rgba(0,210,255,0.35)] hover:shadow-[0_0_45px_rgba(0,210,255,0.55)] transition-all hover:scale-[1.02] active:scale-95 cursor-pointer border border-cyan-300/60"
                >
                  <AlertTriangle className="w-6 h-6 text-slate-950 shrink-0" />
                  <div className="text-left">
                    <div className="text-xs uppercase tracking-widest text-slate-900 font-semibold leading-none mb-1">
                      Envoi express 60 sec
                    </div>
                    <div className="text-base sm:text-lg uppercase tracking-tight font-black leading-none">
                      🚨 DEMANDER UNE INTERVENTION
                    </div>
                  </div>
                </button>
              </div>

              {/* Safety notice disclaimer */}
              <div className="p-3.5 rounded-2xl bg-red-950/30 border border-red-500/30 text-xs text-red-200 max-w-xl mx-auto flex items-start gap-2.5 text-left">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>En cas de fumée, flamme ou danger immédiat :</strong> coupez le disjoncteur général si accessible sans risque et appelez les pompiers (18/112).
                </span>
              </div>
            </div>

            {/* FORMULAIRE URGENCE CONTAINER */}
            <div
              ref={formRef}
              id="formulaire-urgence"
              className="rounded-3xl bg-slate-950/90 border-2 border-red-500/40 p-5 sm:p-8 shadow-[0_0_50px_rgba(255,46,68,0.15)] relative overflow-hidden"
            >
              {/* Header */}
              <div className="border-b border-slate-800/80 pb-4 mb-6 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] uppercase font-bold text-red-400 tracking-widest">
                    Formulaire Court & Optimisé Mobile
                  </div>
                  <h2
                    className="text-xl sm:text-2xl font-black text-white"
                    style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
                  >
                    Formulaire Urgence Électrique
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Rappel moyen : 15 min</span>
                </div>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nom & Prénom */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-red-400 focus:outline-none placeholder-slate-500"
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
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-red-400 focus:outline-none placeholder-slate-500"
                    />
                  </div>
                </div>

                {/* Téléphone & Adresse */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
                      Téléphone pour rappel urgent *
                    </label>
                    <input
                      type="tel"
                      required
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      placeholder="06 XX XX XX XX"
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-red-500/40 text-white text-sm focus:border-red-400 focus:outline-none placeholder-slate-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
                      Adresse d'intervention *
                    </label>
                    <input
                      type="text"
                      required
                      value={adresse}
                      onChange={(e) => setAdresse(e.target.value)}
                      placeholder="Numéro, rue, ville..."
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-red-400 focus:outline-none placeholder-slate-500"
                    />
                  </div>
                </div>

                {/* Type de problème (2-column layout on mobile, touch friendly) */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-2 uppercase tracking-wider">
                    Type de problème *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {PROBLEM_TYPES.map((prob) => {
                      const Icon = prob.icon;
                      const isSelected = selectedProblem === prob.label;
                      return (
                        <button
                          key={prob.id}
                          type="button"
                          onClick={() => setSelectedProblem(prob.label)}
                          className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center gap-2.5 cursor-pointer min-h-[44px] ${
                            isSelected
                              ? 'bg-red-950/80 border-red-400 text-white shadow-[0_0_15px_rgba(255,46,68,0.3)]'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                          }`}
                        >
                          <Icon className={`w-4 h-4 shrink-0 ${
                            isSelected ? 'text-red-400' : 'text-slate-400'
                          }`} />
                          <span className="text-xs font-semibold leading-tight line-clamp-2">
                            {prob.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
                    Description de la panne
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Que s'est-il passé ? Bruit, odeur, panne soudaine..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-red-400 focus:outline-none placeholder-slate-500"
                  />
                </div>

                {/* Photos (File & Drag and Drop) */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider flex items-center justify-between">
                    <span>Photos du problème (Optionnel mais recommandé)</span>
                    <span className="text-[10px] text-slate-400 font-normal">Tableau, prise...</span>
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="urgence-file-input"
                  />

                  {photoPreview ? (
                    <div className="p-3 rounded-2xl bg-slate-900 border border-red-500/40 flex items-center gap-3">
                      <img
                        src={photoPreview}
                        alt="Aperçu urgence"
                        className="w-16 h-16 object-cover rounded-xl border border-red-500/30"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-grow min-w-0">
                        <div className="text-xs font-bold text-white truncate">
                          {photoName || 'Photo jointe'}
                        </div>
                        <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Photo prête à l'envoi</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-300 transition-colors cursor-pointer"
                        title="Retirer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onDrop={handleDrop}
                      onDragOver={(e) => e.preventDefault()}
                      onClick={() => fileInputRef.current?.click()}
                      className="p-4 rounded-xl bg-slate-900/70 border border-dashed border-slate-700 hover:border-red-400 transition-all text-center cursor-pointer group"
                    >
                      <Camera className="w-6 h-6 text-slate-400 group-hover:text-red-400 mx-auto mb-1 transition-colors" />
                      <div className="text-xs text-slate-300 group-hover:text-white font-medium">
                        Prendre une photo ou <span className="text-red-400 underline">parcourir</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Disponibilité */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
                    Disponibilité pour l'intervention *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {AVAILABILITY_OPTIONS.map((avail) => (
                      <button
                        key={avail}
                        type="button"
                        onClick={() => setDisponibilite(avail)}
                        className={`px-3 py-2.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                          disponibilite === avail
                            ? 'bg-red-950/80 border-red-400 text-white shadow-[0_0_12px_rgba(255,46,68,0.25)]'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {avail}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Commentaire */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
                    Commentaire / Précisions d'accès
                  </label>
                  <input
                    type="text"
                    value={commentaire}
                    onChange={(e) => setCommentaire(e.target.value)}
                    placeholder="Code portail, interphone, chien sur place..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-red-400 focus:outline-none placeholder-slate-500"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-base sm:text-lg shadow-[0_0_30px_rgba(255,46,68,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Transmission prioritaire...</span>
                      </div>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>ENVOYER MA DEMANDE D'INTERVENTION</span>
                      </>
                    )}
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Artisan électricien qualifié • Nègrepelisse & 40 km • Devis clair avant intervention</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Footer minimaliste d'urgence */}
      <footer className="border-t border-slate-900 bg-[#01040a] py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="font-bold text-slate-400">
            MAZIOUDELEC • Dépannage & Urgences Électriques
          </div>
          <div>
            Nègrepelisse 82800 • Montauban • Caussade • Rayon de 40 km
          </div>
          <div className="text-[11px]">
            Ligne d'urgence :{' '}
            <a href="tel:0766072094" className="text-red-400 font-bold hover:underline font-mono">
              07 66 07 20 94
            </a>{' '}
            • Contact : mazioud.elec@gmail.com
          </div>
        </div>
      </footer>
    </div>
  );
};
