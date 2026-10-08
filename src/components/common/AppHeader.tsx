import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Bell,
  Languages,
  LayoutDashboard,
  Smartphone,
  ChevronDown,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { BetulTalksLogo } from './BetulTalksLogo';
import { BetulTehsil, Language } from '../../types';

interface AppHeaderProps {
  currentLocation: BetulTehsil | 'All';
  onLocationChange: (loc: BetulTehsil | 'All') => void;
  language: Language;
  onLanguageToggle: () => void;
  onSearchClick: () => void;
  onNotificationsClick: () => void;
  unreadNotifsCount: number;
  currentMode: 'mobile' | 'admin';
  onModeSwitch: (mode: 'mobile' | 'admin') => void;
}

const TEHSILS: (BetulTehsil | 'All')[] = [
  'All',
  'Betul',
  'Multai',
  'Amla',
  'Bhainsdehi',
  'Shahpur',
  'Chicholi',
  'Athner',
  'Ghoradongri',
  'Sarni',
];

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentLocation,
  onLocationChange,
  language,
  onLanguageToggle,
  onSearchClick,
  onNotificationsClick,
  unreadNotifsCount,
  currentMode,
  onModeSwitch,
}) => {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E8E8E8] shadow-xs">
      {/* Top Utility Ribbon with System Switcher */}
      <div className="bg-[#171717] text-white text-xs px-3 sm:px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-neutral-300 hidden sm:inline">
            बैतूल टॉक्स मीडिया नेटवर्क (पंजीकृत)
          </span>
          <span className="font-semibold text-neutral-300 sm:hidden">
            Betul Talks Network
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mode Switcher: Mobile App vs Admin Dashboard */}
          <div className="bg-neutral-800 rounded-md p-0.5 flex items-center border border-neutral-700">
            <button
              onClick={() => onModeSwitch('mobile')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                currentMode === 'mobile'
                  ? 'bg-[#D71920] text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>{language === 'hi' ? 'न्यूज़ ऍप' : 'Reader App'}</span>
            </button>
            <button
              onClick={() => onModeSwitch('admin')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                currentMode === 'admin'
                  ? 'bg-[#D71920] text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>{language === 'hi' ? 'एडमिन पैनल' : 'Admin CMS'}</span>
            </button>
          </div>

          {/* Language Toggle */}
          <button
            onClick={onLanguageToggle}
            className="flex items-center gap-1 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 px-2 py-1 rounded text-[11px] font-semibold text-neutral-200 transition-colors"
            title="Switch Language (हिन्दी / English)"
          >
            <Languages className="w-3 h-3 text-[#F4B400]" />
            <span>{language === 'hi' ? 'ENG' : 'हिन्दी'}</span>
          </button>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between">
        {/* Logo */}
        <div className="cursor-pointer" onClick={() => onModeSwitch('mobile')}>
          <BetulTalksLogo size="md" showSubtitle={false} />
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Location Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E8E8E8] bg-[#F7F7F7] hover:bg-neutral-100 text-xs font-semibold text-[#171717] transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D71920]" />
              <span className="truncate max-w-[85px] sm:max-w-none">
                {currentLocation === 'All'
                  ? (language === 'hi' ? 'संपूर्ण बैतूल जिला' : 'All Betul Dist.')
                  : currentLocation}
              </span>
              <ChevronDown className="w-3 h-3 text-[#686868]" />
            </button>

            {/* Tehsil Dropdown */}
            {showLocationDropdown && (
              <div className="absolute right-0 sm:left-0 mt-1.5 w-48 bg-white border border-[#E8E8E8] rounded-xl shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 text-[10px] font-bold text-[#686868] uppercase tracking-wider border-b border-neutral-100">
                  {language === 'hi' ? 'तहसील / क्षेत्र चुनें' : 'Select Tehsil / Area'}
                </div>
                {TEHSILS.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      onLocationChange(t);
                      setShowLocationDropdown(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-red-50 hover:text-[#D71920] font-medium transition-colors"
                  >
                    <span>{t === 'All' ? (language === 'hi' ? 'सभी क्षेत्र (जिला)' : 'All Districts') : t}</span>
                    {currentLocation === t && (
                      <Check className="w-3.5 h-3.5 text-[#D71920]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Admin Panel Quick Button */}
          <button
            onClick={() => onModeSwitch('admin')}
            className="flex items-center gap-1 bg-[#D71920] hover:bg-red-700 text-white font-black text-[11px] px-2.5 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer"
            title="एडमिन पैनल खोलें (Admin CMS)"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#F4B400]" />
            <span>एडमिन</span>
          </button>

          {/* Search Button */}
          <button
            onClick={onSearchClick}
            className="p-2 rounded-full hover:bg-neutral-100 text-[#171717] transition-colors relative"
            title="खोजें (Search)"
            aria-label="Search"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#171717]" />
          </button>

          {/* Notifications Bell */}
          <button
            onClick={onNotificationsClick}
            className="p-2 rounded-full hover:bg-neutral-100 text-[#171717] transition-colors relative"
            title="सूचनाएं (Notifications)"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#171717]" />
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#D71920] text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                {unreadNotifsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
