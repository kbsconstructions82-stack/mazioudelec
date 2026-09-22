import React, { useState } from 'react';
import { X, AlertTriangle, Phone, ShieldAlert, CheckCircle2, Zap, ArrowRight, Clock } from 'lucide-react';
import { submitFormRequest } from '../services/formService';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [urgencyType, setUrgencyType] = useState('Coupure totale de courant');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Nègrepelisse');
  const [address, setAddress] = useState('');
  const [details, setDetails] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // 1. Sauvegarde dans Firebase
      await submitFormRequest('emergencies', {
        fullName: 'Client Urgence',
        phone,
        city,
        address,
        description: details,
        serviceType: urgencyType
      });

      // 2. Envoi email
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'emergency',
          fullName: 'Client Urgence',
          phone,
          city,
          address,
          description: details,
          serviceType: urgencyType
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

  const emergencyTypes = [
    'Coupure totale de courant',
    'Tableau électrique qui disjoncte / étincelles',
    'Odeur de brûlé ou surchauffe',
    'Ballon d’eau chaude / Chauffage en panne',
    'Autre urgence électrique'
  ];

  return (
    <div
      id="emergency-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="emergency-modal-content"
        className="relative w-full max-w-2xl rounded-3xl bg-[#090306]/95 border-2 border-red-500/40 p-5 sm:p-8 shadow-[0_0_60px_rgba(255,30,39,0.3)] overflow-hidden max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top ambient red alert glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-red-600/20 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/90 border border-slate-700 hover:border-red-400 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer z-10"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Confirmation / Dispatching state */
          <div className="text-center py-6 sm:py-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-950/80 border-2 border-red-500 flex items-center justify-center mx-auto mb-5 text-red-400 shadow-[0_0_30px_rgba(255,30,39,0.5)]">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/90 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              Priorité Absolue Transmise
            </div>

            <h3
              className="text-2xl sm:text-3xl font-black text-white mb-3"
              style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
            >
              Votre urgence est enregistrée !
            </h3>

            <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
              Notre électricien d'astreinte a reçu votre signalement pour <strong className="text-white">{urgencyType}</strong> à <strong className="text-cyan-300">{city}</strong>. Vous serez rappelé immédiatement sur le <strong className="text-white">{phone || 'numéro renseigné'}</strong>.
            </p>

            {/* Direct Call Recommendation */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-red-500/40 text-left text-xs sm:text-sm text-slate-300 space-y-3 mb-6 max-w-md mx-auto">
              <div className="flex items-center gap-2 text-red-400 font-bold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Pour accélérer l'arrivée du technicien :</span>
              </div>
              <a
                href="tel:0766072094"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-bold shadow-[0_0_20px_rgba(255,30,39,0.4)] hover:brightness-110 transition-all text-sm sm:text-base"
              >
                <Phone className="w-4 h-4" />
                Appel direct : 07 66 07 20 94
              </a>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 text-sm font-semibold transition-all cursor-pointer"
            >
              Fermer cette fenêtre
            </button>
          </div>
        ) : (
          /* Emergency Form */
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-950/80 border border-red-500/50 flex items-center justify-center text-red-400 shrink-0 shadow-[0_0_20px_rgba(255,30,39,0.3)]">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                    Dépannage Électrique Express 6j/7
                  </span>
                </div>
                <h3
                  className="text-xl sm:text-2xl font-black text-white"
                  style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
                >
                  J'ai une urgence électrique
                </h3>
              </div>
            </div>

            {/* Direct Urgent Call Banner */}
            <div className="mb-5 p-3.5 sm:p-4 rounded-2xl bg-red-950/50 border border-red-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0_0_25px_rgba(255,30,39,0.15)]">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
                <div className="text-xs sm:text-sm text-slate-200">
                  <strong className="text-white">Danger ou coupure critique ?</strong> Appelez notre technicien directement :
                </div>
              </div>
              <a
                href="tel:0766072094"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(255,30,39,0.5)] shrink-0"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>07 66 07 20 94</span>
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type of emergency */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                  Type de panne ou d'urgence *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {emergencyTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setUrgencyType(type)}
                      className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        urgencyType === type
                          ? 'bg-red-950/70 border-red-400 text-white shadow-[0_0_15px_rgba(255,30,39,0.25)]'
                          : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <span className="truncate pr-1">{type}</span>
                      {urgencyType === type && (
                        <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone & Location - 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Votre Téléphone (Rappel immédiat) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex: 06 XX XX XX XX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-red-500/40 text-white text-xs sm:text-sm focus:border-red-400 focus:outline-none placeholder-slate-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Ville (Nègrepelisse & 40 km) *
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
              </div>

              {/* Address / Street */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Adresse exacte ou indications d'accès (Optionnel)
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Numéro, rue, étage, digicode..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none placeholder-slate-500"
                />
              </div>

              {/* Details */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Précisions sur la situation
                </label>
                <textarea
                  rows={2}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Ex: Le disjoncteur saute dès que j'allume le four, odeur de plastique chaud..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none placeholder-slate-500"
                />
              </div>

              {/* Security advice mini-box */}
              <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-300">Consigne de sécurité :</strong> En cas de fumée ou d'étincelles visibles, coupez immédiatement le disjoncteur général et ne touchez à aucun fil.
                </span>
              </div>

              {submitError && (
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-400 text-xs text-center font-medium">
                  {submitError}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full group relative inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm sm:text-base font-bold text-white overflow-hidden transition-all duration-300 shadow-[0_0_25px_rgba(255,30,39,0.5)] hover:shadow-[0_0_35px_rgba(255,30,39,0.7)] hover:scale-[1.01] ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
                }`}
                style={{
                  background: 'linear-gradient(135deg, #FF2E44 0%, #E6001E 50%, #B80014 100%)',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>{isSubmitting ? 'Envoi en cours...' : "🚨 Déclencher l'intervention d'urgence"}</span>
                  {!isSubmitting && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                </span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
