import React from 'react';
import { Bell, Flame, X, CheckCircle2, ChevronRight, Smartphone } from 'lucide-react';
import { PushNotificationMessage, NewsArticle } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: PushNotificationMessage[];
  news: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  news,
  onSelectArticle,
}) => {
  if (!isOpen) return null;

  const handleNotificationClick = (notif: PushNotificationMessage) => {
    if (notif.articleId) {
      const found = news.find((n) => n.id === notif.articleId);
      if (found) {
        onSelectArticle(found);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right">
        {/* Header */}
        <div className="p-4 border-b border-[#E8E8E8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-red-100 text-[#D71920]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-[#171717]">
                बैतूल टॉक्स सूचनाएं (Alerts)
              </h2>
              <p className="text-[11px] text-[#686868]">लाइव ब्रेकिंग एवं स्थानीय अपडेट्स</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-neutral-100 text-[#686868]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                notif.isBreaking
                  ? 'bg-red-50/70 border-red-200 hover:bg-red-100/70'
                  : 'bg-white border-[#E8E8E8] hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  {notif.isBreaking && <Flame className="w-3.5 h-3.5 text-[#D71920]" />}
                  <span
                    className={`text-xs font-bold ${
                      notif.isBreaking ? 'text-[#D71920]' : 'text-[#171717]'
                    }`}
                  >
                    {notif.title}
                  </span>
                </div>
                <span className="text-[10px] text-[#686868]">{notif.sentAt}</span>
              </div>

              <p className="text-xs text-neutral-700 leading-relaxed mt-1">{notif.body}</p>

              {notif.articleId && (
                <div className="flex items-center justify-end gap-1 text-[11px] font-bold text-[#D71920] mt-2">
                  <span>ख़बर पढ़ें</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#E8E8E8] bg-neutral-50 text-center">
          <p className="text-[11px] text-[#686868]">
            पुश नोटिफिकेशन सेटिंग्स आप अपनी प्रोफ़ाइल से बदल सकते हैं।
          </p>
        </div>
      </div>
    </div>
  );
};
