import React, { useState } from 'react';
import {
  Bell,
  Send,
  Flame,
  CheckCircle2,
  Users,
  Smartphone,
  ExternalLink,
} from 'lucide-react';
import { PushNotificationMessage, NewsArticle } from '../../types';

interface AdminNotificationsManagerProps {
  notifications: PushNotificationMessage[];
  news: NewsArticle[];
  onSendNotification: (notif: PushNotificationMessage) => void;
}

export const AdminNotificationsManager: React.FC<AdminNotificationsManagerProps> = ({
  notifications,
  news,
  onSendNotification,
}) => {
  const [title, setTitle] = useState('🔴 ब्रेकिंग न्यूज़ | बैतूल टॉक्स');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('Breaking News');
  const [selectedArticleId, setSelectedArticleId] = useState('');
  const [isBreaking, setIsBreaking] = useState(true);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;

    const newNotif: PushNotificationMessage = {
      id: `notif-${Date.now()}`,
      title: title.trim(),
      body: body.trim(),
      category,
      articleId: selectedArticleId || undefined,
      sentAt: 'अभी-अभी (Just now)',
      recipientsCount: 45200,
      isBreaking,
    };

    onSendNotification(newNotif);
    setSentSuccess(true);
    setBody('');
    setTimeout(() => setSentSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Broadcast Form */}
      <div className="bg-white rounded-2xl border border-[#E8E8E8] p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-red-100 text-[#D71920]">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-[#171717]">
              पुश नोटिफिकेशन प्रसारण केंद्र (Firebase Cloud Messaging Broadcaster)
            </h2>
            <p className="text-xs text-[#686868]">
              बैतूल और मध्य प्रदेश के 45,000+ पंजीकृत मोबाइल ऐप उपयोगकर्ताओं को तुरंत अलर्ट भेजें
            </p>
          </div>
        </div>

        {sentSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>पुश नोटिफिकेशन 45,200 डिवाइस पर सफलतापूर्वक भेजा गया!</span>
          </div>
        )}

        <form onSubmit={handleSend} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#171717] mb-1">
                नोटिफिकेशन शीर्षक (Title) *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none focus:border-[#D71920]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171717] mb-1">
                श्रेणी (Category)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
              >
                <option>Breaking News</option>
                <option>Local News</option>
                <option>Politics</option>
                <option>Crime</option>
                <option>Business</option>
                <option>Events</option>
                <option>Promotions</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#171717] mb-1">
              संदेश सामग्री (Notification Message Body) *
            </label>
            <textarea
              rows={3}
              required
              placeholder="उदा. बैतूल में नई सड़क परियोजना का काम शुरू, गंज चौक में जाम से मिलेगी राहत..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none focus:border-[#D71920]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#171717] mb-1">
                डीप-लिंक आर्टिकल जोड़ें (Deep Link News Story)
              </label>
              <select
                value={selectedArticleId}
                onChange={(e) => setSelectedArticleId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
              >
                <option value="">कोई समाचार लिंक नहीं (सामान्य सूचना)</option>
                {news.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.headlineHi.slice(0, 50)}...
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 text-xs font-bold text-[#171717] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBreaking}
                  onChange={(e) => setIsBreaking(e.target.checked)}
                  className="w-4 h-4 accent-[#D71920]"
                />
                <span className="flex items-center gap-1 text-[#D71920]">
                  <Flame className="w-3.5 h-3.5" />
                  उच्च प्राथमिकता ब्रेकिंग साउंड अलर्ट
                </span>
              </label>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-[#D71920] hover:bg-red-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>तुरंत प्रसारण करें (Broadcast Now)</span>
            </button>
          </div>
        </form>
      </div>

      {/* Broadcast History */}
      <div className="bg-white rounded-2xl border border-[#E8E8E8] p-5 shadow-xs">
        <h3 className="font-extrabold text-sm text-[#171717] mb-3">
          हाल ही में भेजे गए पुश अलर्ट्स (Sent Alerts History)
        </h3>

        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="p-3.5 rounded-xl border border-[#E8E8E8] bg-neutral-50 flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-xl shrink-0 ${
                    notif.isBreaking ? 'bg-red-100 text-[#D71920]' : 'bg-neutral-200 text-neutral-700'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-[#171717]">{notif.title}</span>
                    <span className="text-[10px] bg-neutral-200 px-1.5 py-0.2 rounded font-bold">
                      {notif.category}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-700 mt-1">{notif.body}</p>
                  <div className="flex items-center gap-3 text-[10px] text-[#686868] mt-2">
                    <span>भेजा गया: {notif.sentAt}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-emerald-700 font-bold">
                      <Users className="w-3 h-3" />
                      {notif.recipientsCount.toLocaleString()} प्राप्तकर्ता
                    </span>
                  </div>
                </div>
              </div>

              {notif.articleId && (
                <span className="text-[10px] font-bold text-[#D71920] bg-red-50 px-2 py-1 rounded shrink-0">
                  डीप लिंक एक्टिव
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
