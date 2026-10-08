import React, { useEffect } from 'react';
import { Phone, MessageCircle, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { Advertisement, Language } from '../../types';
import { storage } from '../../services/storage';

interface SponsoredAdCardProps {
  ad: Advertisement;
  language: Language;
  variant?: 'banner' | 'card' | 'compact';
  onEnquireClick?: () => void;
}

export const SponsoredAdCard: React.FC<SponsoredAdCardProps> = ({
  ad,
  language,
  variant = 'card',
  onEnquireClick,
}) => {
  // Record impression on mount
  useEffect(() => {
    storage.recordAdImpression(ad.id);
  }, [ad.id]);

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    storage.recordAdClick(ad.id, 'whatsapp');
    const cleanPhone = ad.whatsapp.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `नमस्ते! मैंने बैतूल टॉक्स (Betul Talks) पर आपका विज्ञापन देखा: "${ad.title}". मुझे अधिक जानकारी चाहिए।`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    storage.recordAdClick(ad.id, 'phone');
    window.location.href = `tel:${ad.phone}`;
  };

  const handleDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    storage.recordAdClick(ad.id, 'directions');
    if (ad.googleMapsUrl) {
      window.open(ad.googleMapsUrl, '_blank');
    }
  };

  if (variant === 'banner') {
    return (
      <div className="mx-3 my-3 bg-gradient-to-r from-red-50 via-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-3 sm:p-4 shadow-xs relative overflow-hidden">
        {/* Sponsored Badge */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1 text-[10px] font-black uppercase text-[#D71920] tracking-wider bg-white px-2 py-0.5 rounded border border-red-200">
            <Sparkles className="w-3 h-3 text-[#F4B400]" />
            <span>{language === 'hi' ? 'प्रायोजित विज्ञापन • SPONSORED' : 'SPONSORED PROMOTION'}</span>
          </div>
          <span className="text-[10px] font-bold text-neutral-600 bg-white/90 px-2 py-0.5 rounded border border-amber-200/50">
            {ad.category}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {/* Banner Image */}
          <div className="relative w-full h-36 rounded-xl overflow-hidden shadow-2xs bg-neutral-900">
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {ad.discountOffer && (
              <div className="absolute bottom-2 left-2 bg-[#D71920] text-white text-xs font-black px-2.5 py-1 rounded shadow-md flex items-center gap-1">
                <span>⚡</span>
                <span>{ad.discountOffer}</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="w-full">
            <div className="text-xs font-bold text-[#D71920] mb-0.5">{ad.businessName}</div>
            <h4 className="text-sm font-extrabold text-[#171717] leading-snug">
              {ad.title}
            </h4>
            <div className="flex items-center gap-1.5 text-[11px] text-[#686868] mt-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D71920] shrink-0" />
              <span className="truncate">{ad.address}</span>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-amber-200/50">
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold py-2 px-3 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleCall}
                className="flex items-center justify-center gap-1.5 bg-[#171717] hover:bg-neutral-800 text-white text-xs font-bold py-2 px-3 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#F4B400]" />
                <span>कॉल करें</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Native In-Feed Card
  return (
    <div className="mx-3 my-3 bg-white rounded-2xl border border-amber-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
      {/* Header with Sponsored Tag */}
      <div className="px-3.5 py-2 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#F4B400]" />
          <span className="text-[10px] font-black uppercase text-amber-900 tracking-wider">
            {language === 'hi' ? 'प्रायोजित • SPONSORED' : 'SPONSORED PARTNER'}
          </span>
          <span className="text-[10px] text-neutral-400 font-medium">|</span>
          <span className="text-[11px] font-bold text-[#171717]">{ad.businessName}</span>
        </div>
        <span className="text-[10px] bg-white border border-amber-200 text-amber-900 font-bold px-1.5 py-0.5 rounded">
          {ad.category}
        </span>
      </div>

      {/* Image Banner */}
      <div className="relative aspect-video w-full bg-neutral-100 overflow-hidden">
        <img
          src={ad.imageUrl}
          alt={ad.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {ad.discountOffer && (
          <div className="absolute top-2 left-2 bg-[#D71920] text-white text-xs font-black px-2.5 py-1 rounded shadow-md flex items-center gap-1">
            <span>🔥</span>
            <span>{ad.discountOffer}</span>
          </div>
        )}
      </div>

      {/* Body & CTAs */}
      <div className="p-3.5">
        <h4 className="text-sm font-extrabold text-[#171717] leading-snug">
          {ad.title}
        </h4>

        <div className="flex items-center gap-1.5 text-xs text-[#686868] mt-2">
          <MapPin className="w-3.5 h-3.5 text-[#D71920] shrink-0" />
          <span className="truncate">{ad.address}</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-neutral-100">
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold py-2 px-3 rounded-xl transition-all shadow-2xs cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>व्हाट्सएप पर बात करें</span>
          </button>
          <button
            onClick={handleCall}
            className="flex items-center justify-center gap-1.5 bg-[#171717] hover:bg-neutral-800 text-white text-xs font-bold py-2 px-3 rounded-xl transition-all shadow-2xs cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#F4B400]" />
            <span>कॉल करें ({ad.phone.slice(-4)})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
