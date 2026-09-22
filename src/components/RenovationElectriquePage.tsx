import React from 'react';
import {
  ArrowLeft,
  Phone,
  Calendar,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Home,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  Settings,
  HelpCircle,
  MapPin
} from 'lucide-react';

interface RenovationElectriquePageProps {
  onNavigateHome: () => void;
  onOpenQuote: (service?: string) => void;
  onNavigateAppointment: () => void;
}

export const RenovationElectriquePage: React.FC<RenovationElectriquePageProps> = ({
  onNavigateHome,
  onOpenQuote,
  onNavigateAppointment,
}) => {
  return (
    <div className="min-h-screen bg-[#020712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top sticky navigation bar */}
      <header className="sticky top-0 z-40 bg-[#020712]/90 backdrop-blur-xl border-b border-cyan-500/20 py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white transition-all text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour à l'accueil</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
              <span>/</span>
              <span className="text-slate-400">Services</span>
              <span>/</span>
              <span className="text-cyan-300 font-semibold">Rénovation électrique</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:0766072094"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,210,255,0.2)]"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>07 66 07 20 94</span>
            </a>
            <button
              onClick={() => onOpenQuote('Rénovation électrique')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-[0_0_20px_rgba(255,38,61,0.4)] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #FF263D 0%, #E6001E 50%, #B30012 100%)',
              }}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Devis gratuit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
        {/* Background decorative glows */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wider uppercase mb-5 shadow-[0_0_15px_rgba(0,210,255,0.15)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Spécialiste Rénovation Habitat & Tertiaire (82)</span>
            </div>

            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6"
              style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
            >
              Rénovation électrique <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 drop-shadow-[0_0_25px_rgba(0,210,255,0.4)]">
                totale ou partielle
              </span>{' '}
              en Tarn-et-Garonne
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              Mise en sécurité complète des installations anciennes, remplacement des câblages vétustes, suppression des risques d’incendie et mise en conformité stricte <strong>NF C 15-100</strong>. Travaux soignés pour maisons anciennes, appartements et locaux à Nègrepelisse, Montauban et 40 km aux alentours.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => onOpenQuote('Rénovation électrique')}
                className="px-6 py-3.5 rounded-full text-sm font-bold text-white shadow-[0_0_25px_rgba(255,30,39,0.5)] hover:shadow-[0_0_35px_rgba(255,30,39,0.7)] transition-all cursor-pointer flex items-center justify-center gap-2 text-center"
                style={{
                  background: 'linear-gradient(135deg, #FF263D 0%, #E6001E 50%, #B30012 100%)',
                }}
              >
                <FileText className="w-4 h-4" />
                <span>Demander mon devis gratuit sous 24h</span>
              </button>

              <button
                onClick={onNavigateAppointment}
                className="px-6 py-3.5 rounded-full text-sm font-bold text-slate-100 bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 hover:bg-slate-850 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,210,255,0.15)] text-center"
              >
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Prendre rendez-vous sur place</span>
              </button>
            </div>

            {/* Micro assurances */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Garantie Décennale</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Norme NF C 15-100</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Intervention Tarn-et-Garonne</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warning signs: Quand rénover ? */}
      <section className="py-12 bg-slate-950/70 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Sécurité & Prévention</span>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mt-1"
              style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
            >
              Les signes qui indiquent qu’une rénovation est urgente
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Fils en tissu ou plomb</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Les isolants en tissu ou plomb s’effritent avec les années, causant des courts-circuits et des départs de feu invisibles dans les cloisons.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Absence de mise à la terre</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Des prises à deux broches sans terre exposent directement les occupants au risque mortel d’électrocution lors d'un défaut d’appareil.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Tableau à fusibles porcelaine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                L’absence d’interrupteurs différentiels 30 mA modernes ne coupe pas le courant instantanément lors d’un contact humain avec l’électricité.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                <Home className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Disjonctions à répétition</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Le réseau d'origine n’est pas calibré pour supporter vos appareils actuels (plaque induction, borne, lave-linge, radiateurs électriques).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos formules de rénovation */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Nos Prestations</span>
            <h2
              className="text-2xl sm:text-4xl font-black text-white mt-2 mb-4"
              style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
            >
              Des solutions adaptées à chaque configuration
            </h2>
            <p className="text-sm text-slate-400">
              Que vous prépariez une vente, un emménagement ou une réfection complète de votre logement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Rénovation Totale</h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                  Idéale lors d'un achat de maison ancienne ou d’un projet global de réhabilitation intérieure.
                </p>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Dépose complète de l'ancien réseau électrique obsolète</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Création d'un réseau encastré ou sous goulottes décoratives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Tableau électrique neuf aux normes NF C 15-100</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Réseau de communication RJ45 et prises multimédias</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Diagnostic sur place</span>
                <button
                  onClick={() => onOpenQuote('Rénovation électrique')}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Chiffrer le projet</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_30px_rgba(0,210,255,0.15)] transition-all flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300 text-[10px] font-bold uppercase tracking-wider">
                Le plus demandé
              </div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Mise en Sécurité</h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                  Élimine les risques immédiats sans casser les murs, parfait avant une location ou un achat.
                </p>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Remplacement du tableau électrique par un coffret modulaire sécurisé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Pose d'interrupteurs différentiels 30 mA haute sensibilité</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Création ou vérification de la prise de terre</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Protection des pièces d'eau (salles de bain, cuisine)</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Intervention rapide</span>
                <button
                  onClick={() => onOpenQuote('Mise en conformité')}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Chiffrer le projet</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Rénovation par Pièce</h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                  Cuisine neuve, salle d'eau, combles aménagés ou extension de maison.
                </p>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Circuits spécialisés pour four, lave-vaisselle, plaque à induction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Respect des volumes de sécurité électrique en salle de bain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Ajout de prises et interrupteurs design encastrés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Mise en valeur par éclairage LED architectural</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Sur-mesure</span>
                <button
                  onClick={() => onOpenQuote('Rénovation électrique')}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Chiffrer le projet</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Étapes d'un chantier de rénovation */}
      <section className="py-16 bg-[#040d1f] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Méthode & Sérénité</span>
            <h2
              className="text-2xl sm:text-3xl font-black text-white mt-1"
              style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
            >
              Les 4 étapes de votre chantier avec MAZIOUDELEC
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-2xl font-mono font-black text-cyan-400 mb-3 block">01</span>
              <h3 className="text-base font-bold text-white mb-2">Visite & Diagnostic</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Visite sur place à votre domicile pour relever l’état du réseau, identifier les dangers et écouter vos envies d'aménagement.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-2xl font-mono font-black text-cyan-400 mb-3 block">02</span>
              <h3 className="text-base font-bold text-white mb-2">Devis Détaillé & Clair</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Proposition chiffrée poste par poste, sans frais cachés, avec détail du matériel certifié (Legrand, Schneider, Hager).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-2xl font-mono font-black text-cyan-400 mb-3 block">03</span>
              <h3 className="text-base font-bold text-white mb-2">Réalisation Soignée</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Travaux propres avec protection de vos sols et mobilier. Gestion des coupures pour préserver votre confort au quotidien.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-2xl font-mono font-black text-cyan-400 mb-3 block">04</span>
              <h3 className="text-base font-bold text-white mb-2">Contrôle & Attestation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tests complets au mesureur d'isolement, remise du schéma de tableau et attestation de conformité pour votre assurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Rénovation */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Questions Fréquentes</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-black text-white"
            style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
          >
            Tout savoir sur la rénovation électrique
          </h2>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-sm sm:text-base font-bold text-white mb-2">
              Dois-je obligatoirement casser mes cloisons pour rénover ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Non ! Nous adaptons la méthode à votre intérieur et à votre budget : saignées encastrées invisibles si vous repeignez, ou goulottes et plinthes moulurées ultra-discrètes pour rénover sans refaire les peintures.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-sm sm:text-base font-bold text-white mb-2">
              Combien de temps durent les travaux de rénovation ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Pour un remplacement de tableau ou une mise en sécurité, comptez généralement 1 jour d'intervention. Pour une rénovation complète de maison (100 m²), le délai moyen se situe entre 5 et 10 jours ouvrés selon la complexité.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-sm sm:text-base font-bold text-white mb-2">
              Suis-je couvert par une garantie en cas de problème ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Oui, l'ensemble de nos travaux de rénovation est couvert par notre <strong>assurance garantie décennale</strong> et responsabilité civile professionnelle.
            </p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-[#020712] via-cyan-950/30 to-[#020712] border-t border-cyan-500/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
            <span>Étude gratuite sous 24h</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl font-black text-white mb-4"
            style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
          >
            Un projet de rénovation électrique en vue ?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Profitez des conseils d'un artisan électricien qualifié. Échangeons sur vos besoins et recevez un chiffrage clair et transparent.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenQuote('Rénovation électrique')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold text-white shadow-[0_0_30px_rgba(255,30,39,0.5)] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #FF263D 0%, #E6001E 50%, #B30012 100%)',
              }}
            >
              Demander un devis en ligne
            </button>

            <button
              onClick={onNavigateAppointment}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold text-cyan-300 bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 transition-all cursor-pointer"
            >
              Prendre rendez-vous
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
