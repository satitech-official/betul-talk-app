import React, { useState } from 'react';
import { Smartphone, Monitor, Wifi, Battery, LayoutDashboard, Shield } from 'lucide-react';

interface DeviceFrameWrapperProps {
  children: React.ReactNode;
  activeView: 'phone' | 'fluid';
  onViewChange: (view: 'phone' | 'fluid') => void;
  isMobileDevice: boolean;
  onOpenAdmin: () => void;
}

export const DeviceFrameWrapper: React.FC<DeviceFrameWrapperProps> = ({
  children,
  activeView,
  onViewChange,
  isMobileDevice,
  onOpenAdmin,
}) => {
  // If the user's actual screen is a mobile phone (<768px), render directly without simulator frames
  if (isMobileDevice) {
    return <div className="w-full min-h-screen bg-[#F7F7F7]">{children}</div>;
  }

  // Fluid responsive view with floating switcher on desktop
  if (activeView === 'fluid') {
    return (
      <div className="w-full min-h-screen bg-[#F7F7F7] relative">
        {/* Floating Switcher Pill on Desktop */}
        <div className="fixed top-3 right-4 z-50 bg-neutral-900/95 backdrop-blur-md border border-neutral-700 rounded-full p-1.5 flex items-center gap-1.5 shadow-2xl">
          <button
            onClick={() => onViewChange('phone')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>मोबाइल फ्रेम (Phone)</span>
          </button>
          <button
            onClick={() => onViewChange('fluid')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-neutral-800 text-white shadow-xs"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>फ्लूइड व्यू</span>
          </button>
          <div className="w-px h-4 bg-neutral-700 mx-0.5" />
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-[#D71920] hover:bg-red-700 text-white shadow-md transition-all cursor-pointer animate-pulse"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#F4B400]" />
            <span>💻 एडमिन पैनल (Admin CMS)</span>
          </button>
        </div>
        {children}
      </div>
    );
  }

  // Realistic Smartphone frame simulator
  return (
    <div className="min-h-screen bg-neutral-950 py-6 px-4 flex flex-col items-center justify-center">
      {/* Viewport Switcher & Admin Launch Toolbar */}
      <div className="mb-4 bg-neutral-900 border border-neutral-800 rounded-full p-1.5 flex items-center gap-2 shadow-2xl z-30">
        <button
          onClick={() => onViewChange('phone')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-neutral-800 text-white shadow-xs"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#F4B400]" />
          <span>मोबाइल फ्रेम (Phone Sim)</span>
        </button>

        <button
          onClick={() => onViewChange('fluid')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-neutral-400 hover:text-white transition-all cursor-pointer"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>फ्लूइड रिस्पॉन्सिव</span>
        </button>

        <div className="w-px h-4 bg-neutral-700" />

        <button
          onClick={onOpenAdmin}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-[#D71920] hover:bg-red-700 text-white shadow-lg transition-all cursor-pointer"
        >
          <LayoutDashboard className="w-3.5 h-3.5 text-[#F4B400]" />
          <span>💻 एडमिन पैनल खोलें (Admin CMS)</span>
        </button>
      </div>

      {/* Realistic Smartphone Shell */}
      <div className="relative w-full max-w-[412px] h-[860px] bg-black rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[6px] border-neutral-800 overflow-hidden flex flex-col">
        {/* Notch / Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-black rounded-full z-50 flex items-center justify-end px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800" />
        </div>

        {/* Status Bar */}
        <div className="h-6 w-full bg-white flex items-center justify-between px-6 text-[10px] font-bold text-neutral-800 z-40 shrink-0">
          <span>09:45</span>
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3 h-3" />
            <span>5G</span>
            <Battery className="w-3.5 h-3.5 fill-current" />
          </div>
        </div>

        {/* Phone Content Screen */}
        <div className="flex-1 w-full bg-[#F7F7F7] overflow-y-auto no-scrollbar rounded-b-[36px] relative">
          {children}
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-neutral-400/80 rounded-full z-50 pointer-events-none" />
      </div>
    </div>
  );
};
