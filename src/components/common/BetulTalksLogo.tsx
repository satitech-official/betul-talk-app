import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const BetulTalksLogo: React.FC<LogoProps> = ({
  size = 'md',
  showSubtitle = false,
  className = '',
}) => {
  const dimensions = {
    sm: { width: 34, height: 34, fontSize: 'text-xs' },
    md: { width: 44, height: 44, fontSize: 'text-sm' },
    lg: { width: 60, height: 60, fontSize: 'text-base' },
    xl: { width: 88, height: 88, fontSize: 'text-lg' },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Exact Circular Badge SVG Matching Betul Talks Brand */}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm transition-transform hover:scale-105"
      >
        {/* Outer Circular Ring in #D71920 */}
        <circle cx="100" cy="100" r="95" stroke="#D71920" strokeWidth="6" fill="#FFFFFF" />
        <circle cx="100" cy="100" r="91" stroke="#F4B400" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.4" />

        {/* Radiant Golden Sun Behind 'B' */}
        <g transform="translate(38, 48)">
          {/* Sun Rays */}
          <line x1="20" y1="20" x2="6" y2="6" stroke="#F4B400" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="20" y1="20" x2="20" y2="2" stroke="#F4B400" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="20" y1="20" x2="2" y2="20" stroke="#F4B400" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="20" y1="20" x2="34" y2="6" stroke="#F4B400" strokeWidth="3" strokeLinecap="round" />
          <line x1="20" y1="20" x2="8" y2="34" stroke="#F4B400" strokeWidth="3" strokeLinecap="round" />
          <line x1="20" y1="20" x2="28" y2="3" stroke="#E65100" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="20" y1="20" x2="3" y2="28" stroke="#E65100" strokeWidth="2.5" strokeLinecap="round" />
          {/* Sun Core */}
          <circle cx="20" cy="20" r="14" fill="#F4B400" />
          <circle cx="18" cy="18" r="9" fill="#FFF176" />
        </g>

        {/* White Outline Glow for Betul */}
        <text
          x="105"
          y="98"
          textAnchor="middle"
          fontSize="48"
          fontWeight="900"
          fontFamily="'Georgia', 'Times New Roman', serif"
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinejoin="round"
        >
          Betul
        </text>

        {/* 'Betul' Text in Strong Red #D71920 */}
        <text
          x="105"
          y="98"
          textAnchor="middle"
          fontSize="48"
          fontWeight="900"
          fontFamily="'Georgia', 'Times New Roman', serif"
          fill="#D71920"
          letterSpacing="-1px"
        >
          Betul
        </text>

        {/* White Outline Glow for Talks */}
        <text
          x="105"
          y="150"
          textAnchor="middle"
          fontSize="50"
          fontWeight="900"
          fontFamily="'Georgia', 'Times New Roman', serif"
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinejoin="round"
        >
          Talks
        </text>

        {/* 'Talks' Text in Strong Red #D71920 */}
        <text
          x="105"
          y="150"
          textAnchor="middle"
          fontSize="50"
          fontWeight="900"
          fontFamily="'Georgia', 'Times New Roman', serif"
          fill="#D71920"
          letterSpacing="-1px"
        >
          Talks
        </text>
      </svg>

      {/* Brand Text Header (for header / desktop branding) */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold tracking-tight text-[#D71920] text-lg sm:text-xl font-serif">
            BETUL TALKS
          </span>
          <span className="bg-[#D71920] text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
            LIVE
          </span>
        </div>
        {showSubtitle ? (
          <span className="text-[11px] text-[#686868] font-medium tracking-wide mt-0.5">
            बैतूल टॉक्स मीडियावर्क प्रा. लि.
          </span>
        ) : (
          <span className="text-[10px] text-[#686868] font-medium tracking-wide mt-0.5">
            बैतूल • मुलताई • अमला • सतपुड़ा
          </span>
        )}
      </div>
    </div>
  );
};
