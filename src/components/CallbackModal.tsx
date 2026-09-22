import React, { useState } from 'react';
import { X, PhoneCall, Phone, Clock, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { submitFormRequest } from '../services/formService';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [timePreference, setTimePreference] = useState('Dans les 15 minutes (Prioritaire)');
  const [topic, setTopic] = useState('Devis ou étude de projet');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // 1. Sauvegarde dans Firebase
      await submitFormRequest('callbacks', {
        fullName,
        phone,
        serviceType: topic,
        description: timePreference
      });

      // 2. Envoi email
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'callback',
          fullName,
          phone,
          serviceType: topic, // Using serviceType for topic
          description: timePreference // Reusing fields logically
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

  const timeOptions = [
    'Dans les 15 minutes (Prioritaire)',
    'Dans l’heure',
    'Entre 12h et 14h',
    'En fin de journée (18h - 20h)'
  ];

  const topicOptions = [
    'Devis ou étude de projet',
    'Panne électrique ou urgence',
    'Conseil & audit mise aux normes',
    'Autre question technique'
  ];

  return (
    <div
      id="callback-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="callback-modal-content"
        className="relative w-full max-w-lg rounded-3xl bg-[#030d1c]/95 border-2 border-cyan-500/40 p-5 sm:p-8 shadow-[0_0_60px_rgba(0,210,255,0.25)] overflow-hidden max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top ambient cyan glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-24 bg-cyan-400/20 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/90 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer z-10"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Confirmation state */
          <div className="text-center py-6 sm:py-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-950/80 border-2 border-cyan-400 flex items-center justify-center mx-auto mb-5 text-cyan-400 shadow-[0_0_30px_rgba(0,210,255,0.4)]">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/90 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
              Rappel Enregistré
            </div>

            <h3
              className="text-2xl sm:text-3xl font-black text-white mb-3"
              style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
            >
              C'est noté, {fullName || 'cher client'} !
            </h3>

            <p className="text-slate-300 text-sm sm:text-base max-w-sm mx-auto mb-6 leading-relaxed">
              Notre artisan électricien vous contactera sur le <strong className="text-cyan-300">{phone}</strong> : <strong className="text-white">{timePreference}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 text-xs sm:text-sm text-slate-300 mb-6 max-w-sm mx-auto flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Service 100% gratuit et sans engagement</span>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 text-sm font-semibold transition-all cursor-pointer"
            >
              Fermer cette fenêtre
            </button>
          </div>
        ) : (
          /* Form */
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_20px_rgba(0,210,255,0.3)]">
                <PhoneCall className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Échange Téléphonique Gratuit
                </span>
                <h3
                  className="text-xl sm:text-2xl font-black text-white"
                  style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
                >
                  Être rappelé par un électricien
                </h3>
              </div>
            </div>

            {/* Direct call option banner */}
            <div className="mb-5 p-3 rounded-xl bg-slate-900/80 border border-cyan-500/30 flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-300">Besoin d'une réponse immédiate ?</span>
              <a
                href="tel:0766072094"
                className="inline-flex items-center gap-1.5 font-bold text-cyan-400 hover:text-cyan-300 font-mono tracking-wide"
              >
                <Phone className="w-3.5 h-3.5" />
                07 66 07 20 94
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Votre Nom & Prénom *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ex: Sophie Martin"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Numéro de téléphone où vous joindre *
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

              {/* Timing */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Quand souhaitez-vous être rappelé ?</span>
                </label>
                <select
                  value={timePreference}
                  onChange={(e) => setTimePreference(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                >
                  {timeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Topic */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Motif de votre demande
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                >
                  {topicOptions.map((top) => (
                    <option key={top} value={top}>
                      {top}
                    </option>
                  ))}
                </select>
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
                className={`w-full group relative inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm sm:text-base font-bold text-white overflow-hidden transition-all duration-300 shadow-[0_0_25px_rgba(0,210,255,0.4)] hover:shadow-[0_0_35px_rgba(0,210,255,0.6)] hover:scale-[1.01] ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
                }`}
                style={{
                  background: 'linear-gradient(135deg, #00D2FF 0%, #0099CC 50%, #006699 100%)',
                }}
              >
                <span className="relative z-10 flex items-center gap-2 text-slate-950 font-extrabold">
                  <span>{isSubmitting ? 'Envoi en cours...' : 'Me rappeler gratuitement'}</span>
                  {!isSubmitting && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-slate-950" />}
                </span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
