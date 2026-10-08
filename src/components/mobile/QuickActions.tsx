import React from 'react';
import { Newspaper, PlayCircle, Tag, Calendar, Send } from 'lucide-react';
import { Language } from '../../types';

interface QuickActionsProps {
  language: Language;
  onActionClick: (action: 'latest' | 'video' | 'ads' | 'events' | 'reporter') => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  language,
  onActionClick,
}) => {
  const actions = [
    {
      id: 'latest' as const,
      labelHi: 'ताज़ा ख़बरें',
      labelEn: 'Latest News',
      icon: Newspaper,
      color: 'bg-red-50 text-[#D71920] border-red-100',
    },
    {
      id: 'video' as const,
      labelHi: 'वीडियो रील्स',
      labelEn: 'Video Reels',
      icon: PlayCircle,
      color: 'bg-amber-50 text-amber-700 border-amber-100',
    },
    {
      id: 'ads' as const,
      labelHi: 'ऑफ़र्स / डील्स',
      labelEn: 'Offers & Deals',
      icon: Tag,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
    {
      id: 'events' as const,
      labelHi: 'बैतूल इवेंट्स',
      labelEn: 'Events',
      icon: Calendar,
      color: 'bg-blue-50 text-blue-700 border-blue-100',
    },
    {
      id: 'reporter' as const,
      labelHi: 'ख़बर भेजें',
      labelEn: 'Send News',
      icon: Send,
      color: 'bg-purple-50 text-purple-700 border-purple-100',
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-1.5 sm:gap-2 px-3 py-3 bg-white border-b border-[#E8E8E8]">
      {actions.map((act) => {
        const Icon = act.icon;
        const label = language === 'hi' ? act.labelHi : act.labelEn;

        return (
          <button
            key={act.id}
            onClick={() => onActionClick(act.id)}
            className="flex flex-col items-center justify-center text-center group cursor-pointer"
          >
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105 shadow-2xs ${act.color}`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#171717] mt-1.5 leading-tight group-hover:text-[#D71920] transition-colors line-clamp-1">
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
