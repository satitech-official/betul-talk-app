import React, { useState } from 'react';
import { Share2, MessageCircle, Copy, Check, X, Facebook, Twitter } from 'lucide-react';
import { NewsArticle } from '../../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: NewsArticle | null;
  language: 'hi' | 'en';
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  article,
  language,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !article) return null;

  const headline = language === 'hi' ? article.headlineHi : article.headlineEn;
  const currentUrl = `${window.location.origin}/news/${article.slug}`;

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `*${headline}*\n\nबैतूल टॉक्स पर पूरी खबर पढ़ें:\n${currentUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${headline}\n${currentUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-sm rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl animate-in slide-in-from-bottom">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E8]">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#D71920]" />
            <h3 className="font-extrabold text-sm text-[#171717]">
              {language === 'hi' ? 'समाचार शेयर करें' : 'Share News Story'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-neutral-100">
            <X className="w-5 h-5 text-[#686868]" />
          </button>
        </div>

        <div className="py-3">
          <p className="text-xs font-bold text-[#171717] line-clamp-2 mb-4">
            {headline}
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2.5 px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp पर भेजें</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-[#171717] py-2.5 px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'कॉपी हुआ!' : 'लिंक कॉपी करें'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
