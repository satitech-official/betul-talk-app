import React from 'react';
import { Home, PlaySquare, Megaphone, Compass, User } from 'lucide-react';
import { Language } from '../../types';

export type TabType = 'home' | 'videos' | 'ads' | 'explore' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  language: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  language,
}) => {
  const tabs = [
    {
      id: 'home' as TabType,
      labelHi: 'होम',
      labelEn: 'Home',
      icon: Home,
    },
    {
      id: 'videos' as TabType,
      labelHi: 'रील्स/वीडियो',
      labelEn: 'Reels',
      icon: PlaySquare,
      badge: 'LIVE',
    },
    {
      id: 'ads' as TabType,
      labelHi: 'लोकल बाज़ार',
      labelEn: 'Marketplace',
      icon: Megaphone,
      badge: 'OFFERS',
    },
    {
      id: 'explore' as TabType,
      labelHi: 'श्रेणियां',
      labelEn: 'Explore',
      icon: Compass,
    },
    {
      id: 'profile' as TabType,
      labelHi: 'प्रोफ़ाइल',
      labelEn: 'Profile',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E8E8E8] shadow-lg safe-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-1.5 sm:py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const label = language === 'hi' ? tab.labelHi : tab.labelEn;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all relative ${
                isActive
                  ? 'text-[#D71920]'
                  : 'text-[#686868] hover:text-[#171717]'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge && (
                  <span
                    className={`absolute -top-1.5 -right-3 text-[8px] font-black px-1 rounded-full uppercase tracking-tighter ${
                      tab.badge === 'LIVE'
                        ? 'bg-[#D71920] text-white animate-pulse'
                        : 'bg-[#F4B400] text-black font-bold'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-1 tracking-tight truncate max-w-[65px] ${
                  isActive ? 'font-bold text-[#D71920]' : 'font-medium'
                }`}
              >
                {label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 bg-[#D71920] rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
