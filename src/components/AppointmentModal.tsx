import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, ArrowRight, MapPin, User, Phone, Mail } from 'lucide-react';
import { SERVICES_DATA } from '../data/mockData';
import { submitFormRequest } from '../services/formService';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [service, setService] = useState(SERVICES_DATA[0].title);
  const [preferredDate, setPreferredDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Matin (08h - 12h)');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Nègrepelisse');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // 1. Sauvegarde dans Firebase
      await submitFormRequest('appointments', {
        fullName,
        phone,
        email,
        city,
        date: preferredDate,
        time: timeSlot,
        description: notes,
        serviceType: service
      });

      // 2. Envoi email
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'appointment',
          fullName,
          phone,
          email,
          city,
          date: preferredDate,
          time: timeSlot,
          description: notes,
          serviceType: service
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

  const timeSlots = [
    'Matin (08h - 12h)',
    'Après-midi (14h - 18h)',
    'Fin de journée (18h - 20h)'
  ];

  return (
    <div
      id="appointment-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="appointment-modal-content"
        className="relative w-full max-w-2xl rounded-3xl bg-[#040a18]/95 border-2 border-sky-500/40 p-5 sm:p-8 shadow-[0_0_60px_rgba(14,165,233,0.25)] overflow-hidden max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top ambient blue glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-sky-500/15 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/90 border border-slate-700 hover:border-sky-400 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer z-10"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Confirmation state */
          <div className="text-center py-6 sm:py-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-sky-950/80 border-2 border-sky-400 flex items-center justify-center mx-auto mb-5 text-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.4)]">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-950/90 border border-sky-400/40 text-sky-300 text-xs font-bold uppercase tracking-wider mb-3">
              Rendez-vous Pré-réservé
            </div>

            <h3
              className="text-2xl sm:text-3xl font-black text-white mb-3"
              style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
            >
              Merci {fullName || 'cher client'} !
            </h3>

            <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
              Votre demande de rendez-vous pour <strong className="text-white">{service}</strong> à <strong className="text-cyan-300">{city}</strong> a bien été enregistrée pour le <strong className="text-white">{preferredDate || 'créneau choisi'}</strong> ({timeSlot}).
            </p>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-sky-500/30 text-left text-xs sm:text-sm text-slate-300 space-y-2 mb-6 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400">Confirmation :</span>
                <span className="text-emerald-400 font-semibold">Par SMS / E-mail sous 2h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Déplacement :</span>
                <span className="text-slate-200">Sans engagement initial</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Contact direct :</span>
                <span className="text-cyan-400 font-mono">07 66 07 20 94</span>
              </div>
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
              <div className="w-12 h-12 rounded-2xl bg-sky-950/80 border border-sky-400/50 flex items-center justify-center text-sky-400 shrink-0 shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                  Visite Technique & Devis sur Place
                </span>
                <h3
                  className="text-xl sm:text-2xl font-black text-white"
                  style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
                >
                  Prendre un rendez-vous
                </h3>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Objet de l'intervention *
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-sky-400 focus:outline-none"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Visite technique globale / Diagnostic">Visite technique globale / Diagnostic</option>
                  <option value="Autre demande de travaux">Autre demande de travaux</option>
                </select>
              </div>

              {/* Date & Time Slot - 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>Date souhaitée *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-sky-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    <span>Créneau horaire *</span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-sky-400 focus:outline-none"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Identity & Contact - 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Nom & Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex: Jean Dupont"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-sky-400 focus:outline-none placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Téléphone (confirmation par SMS) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex: 06 12 34 56 78"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-sky-400 focus:outline-none placeholder-slate-500 font-mono"
                  />
                </div>
              </div>

              {/* Email & City - 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Ville (Nègrepelisse & 40 km) *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ex: Nègrepelisse, Montauban..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-sky-400 focus:outline-none placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.fr"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-sky-400 focus:outline-none placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Remarques ou détails du projet (Optionnel)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Rénovation cuisine, rajout de disjoncteurs, maison ancienne..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-sky-400 focus:outline-none placeholder-slate-500"
                />
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
                className={`w-full group relative inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm sm:text-base font-bold text-white overflow-hidden transition-all duration-300 shadow-[0_0_25px_rgba(14,165,233,0.4)] hover:shadow-[0_0_35px_rgba(14,165,233,0.6)] hover:scale-[1.01] ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
                }`}
                style={{
                  background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 50%, #075985 100%)',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>{isSubmitting ? 'Envoi en cours...' : 'Confirmer la demande de rendez-vous'}</span>
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
