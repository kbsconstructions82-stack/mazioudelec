import React, { useId } from 'react';

interface MazioudLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'patch';
  showText?: boolean;
}

export const MazioudLogo: React.FC<MazioudLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const uid = useId().replace(/:/g, '_');

  // Proportions and typography scale
  const sizeMap = {
    sm: { iconSize: 30, textClass: 'text-lg tracking-tight', subText: false },
    md: { iconSize: 40, textClass: 'text-2xl tracking-tight', subText: true },
    lg: { iconSize: 50, textClass: 'text-3xl tracking-tight', subText: true },
    xl: { iconSize: 66, textClass: 'text-4xl sm:text-5xl tracking-tight', subText: true },
    patch: { iconSize: 24, textClass: 'text-sm tracking-tight font-black', subText: false },
  };

  const { iconSize, textClass, subText } = sizeMap[size];

  return (
    <div
      id={`mazioud-logo-${size}`}
      className={`inline-flex items-center gap-3 select-none transition-all duration-300 ${className}`}
    >
      {/* High-Craft Signature Emblem: Futuristic Shield + Faceted Metallic Lightning Bolt */}
      <div
        className="relative flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300"
        style={{ width: iconSize, height: iconSize }}
      >
        {/* Ambient background glow behind emblem */}
        <div
          className="absolute inset-0 rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,210,255,0.4) 0%, rgba(255,30,39,0.3) 70%, transparent 100%)',
          }}
        />

        <svg
          viewBox="0 0 100 100"
          className="relative w-full h-full drop-shadow-[0_4px_14px_rgba(0,0,0,0.8)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer Hexagon Bevel Stroke */}
            <linearGradient id={`${uid}-shieldBezel`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="25%" stopColor="#0072FF" />
              <stop offset="50%" stopColor="#00D2FF" />
              <stop offset="75%" stopColor="#0051C8" />
              <stop offset="100%" stopColor="#00E5FF" />
            </linearGradient>

            {/* Inner Shield Deep Metallic Carbon Gradient */}
            <linearGradient id={`${uid}-shieldInterior`} x1="30%" y1="0%" x2="70%" y2="100%">
              <stop offset="0%" stopColor="#0A1D3B" />
              <stop offset="40%" stopColor="#040F22" />
              <stop offset="85%" stopColor="#020814" />
              <stop offset="100%" stopColor="#00040A" />
            </linearGradient>

            {/* Facet Left: Brilliant Electric Red */}
            <linearGradient id={`${uid}-boltLeft`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF4D63" />
              <stop offset="50%" stopColor="#FF1130" />
              <stop offset="100%" stopColor="#D9001A" />
            </linearGradient>

            {/* Facet Right: Deep Crimson Bevel */}
            <linearGradient id={`${uid}-boltRight`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D9001D" />
              <stop offset="50%" stopColor="#B30015" />
              <stop offset="100%" stopColor="#7A000C" />
            </linearGradient>

            {/* White-Hot Core Highline */}
            <linearGradient id={`${uid}-boltCore`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#FFB3BC" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#FF1E27" stopOpacity="0" />
            </linearGradient>

            {/* Electric Neon Glow */}
            <filter id={`${uid}-neonGlow`} x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FF1E27" floodOpacity="0.8" />
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#FF2E44" floodOpacity="0.4" />
            </filter>

            {/* Cyan Accent Glow */}
            <filter id={`${uid}-cyanGlow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#00D2FF" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* 1. Outer Hexagonal Shield Background */}
          <polygon
            points="50,5 90,23 90,72 50,95 10,72 10,23"
            fill={`url(#${uid}-shieldInterior)`}
            stroke={`url(#${uid}-shieldBezel)`}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* 2. Inner Technological Framing & Circuit Ring */}
          <polygon
            points="50,11 84,26 84,68 50,89 16,68 16,26"
            fill="none"
            stroke="#00D2FF"
            strokeWidth="1.2"
            strokeOpacity="0.35"
            strokeDasharray="18 4 6 4"
            strokeLinejoin="round"
          />

          {/* Subtle Circuit Nodes on vertices */}
          <circle cx="50" cy="11" r="2" fill="#00E5FF" filter={`url(#${uid}-cyanGlow)`} />
          <circle cx="84" cy="26" r="1.8" fill="#00E5FF" opacity="0.8" />
          <circle cx="16" cy="26" r="1.8" fill="#00E5FF" opacity="0.8" />
          <circle cx="50" cy="89" r="2" fill="#00E5FF" filter={`url(#${uid}-cyanGlow)`} />

          {/* Subtle Cyber Grid lines inside shield */}
          <path
            d="M26 38 L74 38 M20 54 L80 54 M30 70 L70 70"
            stroke="#00D2FF"
            strokeWidth="0.75"
            strokeOpacity="0.15"
          />

          {/* 3. The 3D Faceted MAZIOUD Signature Lightning Bolt */}
          {/* Group with neon glow */}
          <g filter={`url(#${uid}-neonGlow)`}>
            {/* Left Facet (Light side) */}
            <path
              d="M57 9 L33 46 L49 46 L38 88 L51 47 L43 47 L60 9 Z"
              fill={`url(#${uid}-boltLeft)`}
            />

            {/* Right Facet (Bevel shadow side) */}
            <path
              d="M57 9 L60 9 L51 47 L70 42 L38 88 L51 47 L49 46 L67 42 Z"
              fill={`url(#${uid}-boltRight)`}
            />

            {/* Main unified bold silhouette for solid definition */}
            <path
              d="M58 8 L32 46 L49 46 L38 90 L71 42 L51 42 L65 8 Z"
              fill="none"
              stroke="#FFA8B2"
              strokeWidth="0.8"
              strokeLinejoin="miter"
              opacity="0.4"
            />

            {/* Glossy Core Reflection */}
            <path
              d="M56 13 L38 44 L48 44 L42 74 L58 44 L50 44 L60 13 Z"
              fill={`url(#${uid}-boltCore)`}
              opacity="0.85"
            />
          </g>

          {/* Micro Energy Spark at Bolt Tip */}
          <circle cx="38" cy="88" r="1.5" fill="#FFFFFF" />
          <circle cx="58" cy="8" r="1.2" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Typography: MAZIOUD (Neon Red) + ELEC (Neon Cyan) */}
      {showText && (
        <div className="flex flex-col justify-center">
          <div className={`flex items-baseline font-black leading-none ${textClass}`}>
            <span
              style={{
                color: '#FF2E44',
                fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
                letterSpacing: '-0.025em',
                textShadow: '0 0 16px rgba(255, 46, 68, 0.45)',
              }}
            >
              MAZIOUD
            </span>
            <span
              className="ml-1"
              style={{
                color: '#00D2FF',
                fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
                letterSpacing: '-0.015em',
                textShadow: '0 0 16px rgba(0, 210, 255, 0.55)',
              }}
            >
              ELEC
            </span>
          </div>

          {/* Professional Underline Caption for medium and larger sizes */}
          {subText && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-[1.5px] w-2.5 bg-gradient-to-r from-red-500 to-transparent rounded-full" />
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400">
                Électricité Générale
              </span>
              <span className="h-[1.5px] w-2.5 bg-gradient-to-l from-cyan-400 to-transparent rounded-full" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
