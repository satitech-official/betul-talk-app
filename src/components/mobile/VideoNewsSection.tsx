import React from 'react';
import { Play, Flame, ChevronRight, Eye } from 'lucide-react';
import { VideoReel, Language } from '../../types';

interface VideoNewsSectionProps {
  reels: VideoReel[];
  language: Language;
  onSelectReel: (reel: VideoReel) => void;
  onViewAllReels: () => void;
}

export const VideoNewsSection: React.FC<VideoNewsSectionProps> = ({
  reels,
  language,
  onSelectReel,
  onViewAllReels,
}) => {
  return (
    <section className="bg-neutral-900 text-white py-4 my-3">
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 mb-3">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-[#D71920] text-white">
            <Flame className="w-4 h-4" />
          </span>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
              <span>{language === 'hi' ? 'बैतूल वीडियो समाचार & रील्स' : 'Betul Video News & Reels'}</span>
              <span className="bg-[#D71920] text-[9px] font-black px-1.5 py-0.2 rounded uppercase animate-pulse">
                HD
              </span>
            </h3>
            <p className="text-[10px] text-neutral-400">
              {language === 'hi' ? 'ग्राउंड रिपोर्ट और विशेष कवरेज' : 'Ground reports & exclusive local clips'}
            </p>
          </div>
        </div>

        <button
          onClick={onViewAllReels}
          className="text-xs font-bold text-[#F4B400] hover:text-yellow-300 flex items-center gap-0.5 transition-colors"
        >
          <span>{language === 'hi' ? 'सभी देखें' : 'View All'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Horizontal Scroll list */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-3 sm:px-4 pb-2">
        {reels.map((reel) => {
          const title = language === 'hi' ? reel.titleHi : reel.titleEn;

          return (
            <div
              key={reel.id}
              onClick={() => onSelectReel(reel)}
              className="w-40 sm:w-48 shrink-0 bg-neutral-800 rounded-xl overflow-hidden cursor-pointer group hover:ring-2 hover:ring-[#D71920] transition-all"
            >
              {/* Thumbnail Container (Reel aspect 9:16 or 4:5) */}
              <div className="relative aspect-[9/13] w-full bg-neutral-950 overflow-hidden">
                <img
                  src={reel.thumbnailUrl}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#D71920]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-115 transition-transform backdrop-blur-xs">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration & Location Badges */}
                <div className="absolute top-2 left-2 flex items-center gap-1">
                  <span className="bg-black/70 backdrop-blur-md text-[9px] font-bold text-white px-1.5 py-0.5 rounded">
                    {reel.location}
                  </span>
                </div>

                <div className="absolute top-2 right-2">
                  <span className="bg-black/70 text-[9px] font-bold text-yellow-400 px-1.5 py-0.5 rounded">
                    0:{reel.durationSeconds < 10 ? `0${reel.durationSeconds}` : reel.durationSeconds}
                  </span>
                </div>

                {/* Views Counter */}
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="flex items-center gap-1 text-[10px] text-neutral-300 font-semibold mb-1">
                    <Eye className="w-3 h-3 text-[#F4B400]" />
                    {reel.viewsCount.toLocaleString()}
                  </span>
                  <p className="text-xs font-bold text-white line-clamp-2 leading-snug drop-shadow-sm">
                    {title}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
