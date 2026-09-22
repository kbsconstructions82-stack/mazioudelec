import React, { useState } from 'react';
import { MapPin, Phone, ShieldAlert, Navigation } from 'lucide-react';
import { TOWNS_COVERED } from '../data/mockData';

export const ServiceArea: React.FC = () => {
  const [activeTown, setActiveTown] = useState('Nègrepelisse');

  return (
    <section id="contact" className="relative py-24 bg-[#020712] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header */}
        <div className="max-w-2xl mb-12">
          {/* Section label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-4 shadow-[0_0_12px_rgba(0,210,255,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>ZONE D'INTERVENTION</span>
          </div>

          {/* Title */}
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4"
            style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
          >
            Électricien à Nègrepelisse <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
              et périmètre de 40 km
            </span>
          </h2>

          <p className="text-slate-300 text-base leading-relaxed">
            Basés à Nègrepelisse (82800), nous intervenons dans un rayon de 40 km en Tarn-et-Garonne pour vos projets électriques neufs, rénovations et dépannages d'urgence.
          </p>

          {/* Location Chips / Pills - 2 COLUMNS ON MOBILE */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-2.5 mt-6">
            {TOWNS_COVERED.map((town) => {
              const isSelected = activeTown === town.name;
              return (
                <button
                  key={town.name}
                  onClick={() => setActiveTown(town.name)}
                  className={`px-3 sm:px-4 py-2 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center sm:justify-start gap-1.5 ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_20px_rgba(0,210,255,0.4)] scale-[1.02] sm:scale-105'
                      : 'bg-slate-900/80 text-slate-300 border border-slate-700/80 hover:border-cyan-500/40 hover:text-white'
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className="truncate">{town.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Grid: Futuristic Map + Emergency Glass Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT & CENTER (8 cols): Futuristic Abstract Map Radar of the Region */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-slate-950/80 border border-cyan-500/25 backdrop-blur-xl shadow-[0_0_40px_rgba(0,210,255,0.1)] min-h-[380px] flex items-center justify-center">
            
            {/* Background Digital Grid & Radar Concentric Rings */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: 'radial-gradient(circle, #00D2FF 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Concentric Radar Circles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] rounded-full border border-cyan-500/20" />
              <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full border border-cyan-500/15" />
              <div className="absolute w-[460px] h-[460px] sm:w-[600px] sm:h-[600px] rounded-full border border-cyan-500/10" />
              <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
              <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
            </div>

            {/* Interactive Nodes on Map */}
            <div className="relative z-10 w-full max-w-md aspect-square flex items-center justify-center">
              
              {/* Central Main Location: Nègrepelisse */}
              <div className="relative flex flex-col items-center group cursor-pointer" onClick={() => setActiveTown('Nègrepelisse')}>
                {/* Ping rings */}
                <div className="absolute w-16 h-16 rounded-full bg-cyan-400/20 animate-ping" />
                <div className="w-12 h-12 rounded-full bg-cyan-500/30 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_25px_#00D2FF] transition-transform group-hover:scale-110">
                  <MapPin className="w-6 h-6 text-cyan-300 fill-cyan-400 drop-shadow-[0_0_8px_#00D2FF]" />
                </div>
                {/* Label */}
                <div className="mt-2 px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-400 text-cyan-300 font-bold text-xs tracking-wider shadow-[0_0_15px_rgba(0,210,255,0.4)]">
                  NÈGREPELISSE (82800)
                </div>
              </div>

              {/* Surrounding Nodes: Montauban, Caussade, Albias, Moissac, Monclar-de-Quercy */}
              {/* Caussade (North-East) */}
              <div className="absolute top-12 right-12 flex flex-col items-center group cursor-pointer" onClick={() => setActiveTown('Caussade')}>
                <div className="w-4 h-4 rounded-full bg-cyan-500/40 border border-cyan-300 flex items-center justify-center shadow-[0_0_10px_#00D2FF] group-hover:scale-125 transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-200" />
                </div>
                <span className="text-[11px] font-medium text-slate-300 group-hover:text-cyan-300 transition-colors mt-1">
                  Caussade (15 min)
                </span>
              </div>

              {/* Albias (West) */}
              <div className="absolute top-24 left-8 flex flex-col items-center group cursor-pointer" onClick={() => setActiveTown('Albias')}>
                <div className="w-4 h-4 rounded-full bg-cyan-500/40 border border-cyan-300 flex items-center justify-center shadow-[0_0_10px_#00D2FF] group-hover:scale-125 transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-200" />
                </div>
                <span className="text-[11px] font-medium text-slate-300 group-hover:text-cyan-300 transition-colors mt-1">
                  Albias (8 min)
                </span>
              </div>

              {/* Montauban (South-West) */}
              <div className="absolute bottom-12 left-10 flex flex-col items-center group cursor-pointer" onClick={() => setActiveTown('Montauban')}>
                <div className="w-4 h-4 rounded-full bg-cyan-500/40 border border-cyan-300 flex items-center justify-center shadow-[0_0_10px_#00D2FF] group-hover:scale-125 transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-200" />
                </div>
                <span className="text-[11px] font-medium text-slate-300 group-hover:text-cyan-300 transition-colors mt-1">
                  Montauban (15 min)
                </span>
              </div>

              {/* Monclar-de-Quercy (South-East) */}
              <div className="absolute bottom-14 right-12 flex flex-col items-center group cursor-pointer" onClick={() => setActiveTown('Monclar-de-Quercy')}>
                <div className="w-4 h-4 rounded-full bg-cyan-500/40 border border-cyan-300 flex items-center justify-center shadow-[0_0_10px_#00D2FF] group-hover:scale-125 transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-200" />
                </div>
                <span className="text-[11px] font-medium text-slate-300 group-hover:text-cyan-300 transition-colors mt-1">
                  Monclar (15 min)
                </span>
              </div>

              {/* Moissac (North-West) */}
              <div className="absolute top-8 left-20 flex flex-col items-center group cursor-pointer" onClick={() => setActiveTown('Moissac')}>
                <div className="w-4 h-4 rounded-full bg-cyan-500/40 border border-cyan-300 flex items-center justify-center shadow-[0_0_10px_#00D2FF] group-hover:scale-125 transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-200" />
                </div>
                <span className="text-[11px] font-medium text-slate-300 group-hover:text-cyan-300 transition-colors mt-1">
                  Moissac (30 min)
                </span>
              </div>

              {/* Connecting circuit lines SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="#00D2FF" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="50%" y1="50%" x2="20%" y2="22%" stroke="#00D2FF" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="50%" y1="50%" x2="22%" y2="78%" stroke="#00D2FF" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="50%" y1="50%" x2="70%" y2="85%" stroke="#00D2FF" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="50%" y1="50%" x2="88%" y2="60%" stroke="#00D2FF" strokeWidth="1" strokeDasharray="3 3" />
              </svg>

            </div>

            {/* Real-time Radius Badge */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/60 text-[11px] text-slate-300 backdrop-blur-md flex items-center gap-1.5">
              <Navigation className="w-3 h-3 text-cyan-400" />
              <span>Rayon d'action standard : 40 km</span>
            </div>

          </div>

          {/* RIGHT (4 cols): Glassmorphism Emergency / Contact Card */}
          <div className="lg:col-span-4">
            <div
              id="emergency-contact-card"
              className="relative p-7 sm:p-8 rounded-3xl bg-slate-950/90 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_0_35px_rgba(0,210,255,0.12)] flex flex-col justify-between"
            >
              {/* Top Icon */}
              <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-6 shadow-[0_0_20px_rgba(0,210,255,0.25)]">
                <ShieldAlert className="w-7 h-7" />
              </div>

              {/* Text */}
              <h3
                className="text-2xl font-black text-white mb-2"
                style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }}
              >
                Un besoin urgent ?
              </h3>
              
              <p className="text-sm text-slate-300 leading-relaxed mb-8">
                Panne totale de courant, disjoncteur qui saute ou mise en sécurité immédiate ? Notre équipe est disponible pour toutes vos demandes d'intervention rapide.
              </p>

              {/* Call CTA Button with glowing cyan outline */}
              <a
                id="emergency-call-cta"
                href="tel:0766072094"
                className="group relative inline-flex items-center justify-center gap-3 px-6 py-4 rounded-full text-base font-bold text-white bg-slate-900 border-2 border-cyan-400 hover:bg-cyan-500/15 hover:border-cyan-300 transition-all duration-300 shadow-[0_0_25px_rgba(0,210,255,0.3)] hover:shadow-[0_0_35px_rgba(0,210,255,0.6)] cursor-pointer"
              >
                <Phone className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="tracking-wide">07 66 07 20 94</span>
              </a>

              {/* Availability Note */}
              <div className="mt-4 text-center">
                <span className="text-[11px] text-slate-400 font-medium">
                  Intervention rapide du Lundi au Samedi
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
