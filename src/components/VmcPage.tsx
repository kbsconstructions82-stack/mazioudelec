import React from 'react';
import {
  ArrowLeft,
  Phone,
  Calendar,
  FileText,
  Wind,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Droplets,
  Zap,
  ChevronRight,
  HelpCircle,
  MapPin,
  Flame
} from 'lucide-react';

interface VmcPageProps {
  onNavigateHome: () => void;
  onOpenQuote: (service?: string) => void;
  onNavigateAppointment: () => void;
}

export const VmcPage: React.FC<VmcPageProps> = ({
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
              <span className="text-cyan-300 font-semibold">VMC & Ventilation</span>
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
              onClick={() => onOpenQuote('VMC')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-[0_0_20px_rgba(255,38,61,0.4)] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #FF263D 0%, #E6001E 50%, #B30012 100%)',
              }}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Devis VMC</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
        {/* Decorative lighting */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-sky-600/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wider uppercase mb-5 shadow-[0_0_15px_rgba(0,210,255,0.15)]">
              <Wind className="w-3.5 h-3.5" />
              <span>Qualité de l'Air Intérieur & Économies d'Énergie</span>
            </div>

            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6"
              style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
            >
              Installation & remplacement de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 drop-shadow-[0_0_25px_rgba(0,210,255,0.4)]">
                VMC performante
              </span>{' '}
              à Nègrepelisse
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              Éliminez l’humidité, la condensation et les moisissures tout en réduisant vos déperditions de chaleur. Installation, modernisation et dépannage de <strong>VMC simple flux hygroréglable</strong> et <strong>double flux</strong> par votre artisan électricien en Tarn-et-Garonne.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => onOpenQuote('VMC')}
                className="px-6 py-3.5 rounded-full text-sm font-bold text-white shadow-[0_0_25px_rgba(255,30,39,0.5)] hover:shadow-[0_0_35px_rgba(255,30,39,0.7)] transition-all cursor-pointer flex items-center justify-center gap-2 text-center"
                style={{
                  background: 'linear-gradient(135deg, #FF263D 0%, #E6001E 50%, #B30012 100%)',
                }}
              >
                <FileText className="w-4 h-4" />
                <span>Demander mon devis VMC gratuit</span>
              </button>

              <button
                onClick={onNavigateAppointment}
                className="px-6 py-3.5 rounded-full text-sm font-bold text-slate-100 bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 hover:bg-slate-850 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,210,255,0.15)] text-center"
              >
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Prendre rendez-vous</span>
              </button>
            </div>

            {/* Micro assurances */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Marques certifiées (Aldes, Atlantic)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Moteurs basse consommation (EC)</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Tarn-et-Garonne & proximité</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warning signs: Quand remplacer sa VMC ? */}
      <section className="py-12 bg-slate-950/70 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Diagnostic & Santé</span>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mt-1"
              style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
            >
              Votre système de ventilation a-t-il besoin d'être remplacé ?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Moisissures & Buée persistante</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Des traces noires dans la salle de bain ou de la condensation qui ne s'évacue pas sur les vitres révèlent un débit d'extraction insuffisant ou une panne moteur.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                <Wind className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Bruit gênant ou vibration</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Un caisson de VMC qui vibre dans les combles ou émet un sifflement dans les chambres indique des roulements usés ou une turbine déséquilibrée par la poussière.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Risque d'incendie (moteur grippé)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Une vieille VMC encrassée fonctionnant en continu sans entretien peut surchauffer et représente la première cause de départ de feu dans les combles.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Surconsommation électrique</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Les anciens modèles consomment jusqu'à 60 Watts en permanence. Nos modèles actuels à moteur basse consommation (EC) ne consomment que 6 à 12 Watts !
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions de ventilation */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Nos Systèmes de Ventilation</span>
            <h2
              className="text-2xl sm:text-4xl font-black text-white mt-2 mb-4"
              style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
            >
              Des technologies adaptées à votre confort
            </h2>
            <p className="text-sm text-slate-400">
              Pose neuve ou remplacement en combles perdus, faux plafonds ou buanderie.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* VMC Hygro */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-cyan-500/40 shadow-[0_0_30px_rgba(0,210,255,0.15)] transition-all flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300 text-[10px] font-bold uppercase tracking-wider">
                Recommandé
              </div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">VMC Hygroréglable (Type A ou B)</h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                  Le système le plus économique et intelligent : il adapte son débit automatiquement au taux d'humidité de chaque pièce.
                </p>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Ouverture automatique lors des douches ou préparations en cuisine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Jusqu'à 150 € d'économies de chauffage par an vs VMC classique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Moteur ultra-silencieux suspendu sur plots anti-vibratiles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Bouches d'extraction design extra-plates</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Remplacement en 1/2 journée</span>
                <button
                  onClick={() => onOpenQuote('VMC')}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Demander un devis</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* VMC Double Flux */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
                  <Wind className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">VMC Double Flux Haute Efficacité</h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                  Le summum du confort thermique et sanitaire pour maisons passives ou rénovations globales.
                </p>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Récupère jusqu'à 92% des calories de l'air extrait pour préchauffer l'air neuf</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Filtration fine des pollens, poussières et particules extérieures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Suppression totale des sensations de courant d'air froid</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>By-pass automatique pour rafraîchissement nocturne l'été</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Haute performance</span>
                <button
                  onClick={() => onOpenQuote('VMC')}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Étude thermique</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Remplacement caisson & maintenance */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Remplacement de Caisson & Réseau</h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                  Votre moteur actuel est en panne ou fait trop de bruit ? Nous remplaçons uniquement le caisson sans changer les bouches.
                </p>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Dépose sécurisée de l'ancien groupe de ventilation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Contrôle de l'étanchéité et isolation des gaines thermiques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Pose d'un caisson neuf basse consommation garanti</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Mesure des débits d'aspiration pièce par pièce</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Dépannage rapide</span>
                <button
                  onClick={() => onOpenQuote('VMC')}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Remplacer mon caisson</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ VMC */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Vos Questions</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-black text-white"
            style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
          >
            Foire aux questions sur la VMC
          </h2>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-sm sm:text-base font-bold text-white mb-2">
              Peut-on couper sa VMC la nuit pour ne pas entendre de bruit ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Il est fortement déconseillé de couper une VMC. L'arrêt provoque une accumulation rapide d'humidité dans les gaines qui condensent et forment des moisissures toxiques. Si votre VMC fait du bruit, il faut remplacer le caisson par un modèle silencieux moderne monté sur suspensions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-sm sm:text-base font-bold text-white mb-2">
              Quelle est la différence entre VMC Hygro A et Hygro B ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              En Hygro A, seules les bouches d'extraction (cuisine, WC, bain) adaptent leur ouverture selon l'humidité. En <strong>Hygro B</strong> (le standard actuel le plus efficace), les entrées d'air au-dessus des fenêtres des chambres et du salon sont également hygroréglables, optimisant encore davantage la chaleur conservée en hiver.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-sm sm:text-base font-bold text-white mb-2">
              À quelle fréquence faut-il entretenir sa ventilation ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Les bouches d'extraction doivent être dépoussiérées tous les 6 mois à l'eau savonneuse. Le caisson moteur et les gaines doivent faire l'objet d'un contrôle technique tous les 2 à 3 ans pour retirer les amas de poussière et vérifier les connexions électriques.
            </p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-[#020712] via-cyan-950/30 to-[#020712] border-t border-cyan-500/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
            <span>Intervention soignée & rapide</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl font-black text-white mb-4"
            style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
          >
            Besoin d'installer ou remplacer votre VMC ?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Contactez MAZIOUDELEC pour un diagnostic gratuit de votre ventilation à Nègrepelisse et dans tout le 82.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenQuote('VMC')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold text-white shadow-[0_0_30px_rgba(255,30,39,0.5)] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #FF263D 0%, #E6001E 50%, #B30012 100%)',
              }}
            >
              Demander un devis VMC gratuit
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
