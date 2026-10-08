import React, { useState } from 'react';
import {
  Bookmark,
  Heart,
  Bell,
  Languages,
  Megaphone,
  Settings,
  HelpCircle,
  FileText,
  LogOut,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Building,
  RotateCcw,
  Sparkles,
  LayoutDashboard,
} from 'lucide-react';
import { UserProfile, NewsArticle, VideoReel, Language } from '../../types';
import { storage } from '../../services/storage';

interface ProfileScreenProps {
  profile: UserProfile;
  news: NewsArticle[];
  reels: VideoReel[];
  language: Language;
  onLanguageToggle: () => void;
  onSelectArticle: (article: NewsArticle) => void;
  onAdvertiseClick: () => void;
  onResetData: () => void;
  onOpenAdmin: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  news,
  reels,
  language,
  onLanguageToggle,
  onSelectArticle,
  onAdvertiseClick,
  onResetData,
  onOpenAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'saved' | 'liked' | 'settings'>('saved');
  const [notifSettings, setNotifSettings] = useState(profile.notificationSettings);

  const toggleNotif = (key: keyof typeof profile.notificationSettings) => {
    const updated = { ...notifSettings, [key]: !notifSettings[key] };
    setNotifSettings(updated);
    const updatedProfile = { ...profile, notificationSettings: updated };
    storage.saveProfile(updatedProfile);
  };

  const savedNewsArticles = news.filter((n) => profile.savedArticles.includes(n.id));
  const likedNewsArticles = news.filter((n) => profile.likedArticles.includes(n.id));

  return (
    <div className="pb-24 bg-[#F7F7F7] min-h-screen">
      {/* Profile Header Banner */}
      <div className="bg-white border-b border-[#E8E8E8] p-5 shadow-xs">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#D71920] shadow-sm"
          />

          <div className="flex-1 min-w-0">
            <h1 className="text-base sm:text-lg font-black text-[#171717] flex items-center gap-1.5">
              <span>{profile.name}</span>
              <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-50" />
            </h1>
            <div className="flex items-center gap-1 text-xs text-[#686868] mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#D71920]" />
              <span>{profile.location}, मध्य प्रदेश</span>
            </div>
            <div className="text-[11px] text-[#686868] mt-0.5">{profile.phone}</div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4">
        {/* Prominent Admin Panel Launch Banner */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-[#D71920] text-white p-4 rounded-2xl shadow-md mb-4 flex items-center justify-between gap-3 border border-neutral-700">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-black uppercase text-[#F4B400] tracking-wider">
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>बैतूल टॉक्स एडमिन पोर्टल</span>
            </div>
            <h3 className="font-extrabold text-sm text-white mt-1">
              वेब एडमिन सीएमएस (Admin Panel)
            </h3>
            <p className="text-[11px] text-neutral-300 mt-0.5">
              समाचार, वीडियो, रील्स, ब्रेकिंग न्यूज़ व विज्ञापन प्रबंधित करें
            </p>
          </div>
          <button
            onClick={onOpenAdmin}
            className="bg-[#D71920] hover:bg-red-700 text-white font-black text-xs px-3.5 py-2.5 rounded-xl shadow-lg shrink-0 flex items-center gap-1.5 cursor-pointer border border-red-400/40"
          >
            <span>एडमिन खोलें</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        {/* Navigation Tabs */}
        <div className="flex bg-white p-1 rounded-xl border border-[#E8E8E8] shadow-2xs mb-4">
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'saved'
                ? 'bg-[#D71920] text-white shadow-xs'
                : 'text-[#686868] hover:text-[#171717]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>सेव्ड समाचार ({savedNewsArticles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('liked')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'liked'
                ? 'bg-[#D71920] text-white shadow-xs'
                : 'text-[#686868] hover:text-[#171717]'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>पसंदीदा ({likedNewsArticles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-[#D71920] text-white shadow-xs'
                : 'text-[#686868] hover:text-[#171717]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>सेटिंग्स</span>
          </button>
        </div>

        {/* Tab 1: Saved Articles */}
        {activeTab === 'saved' && (
          <div className="space-y-3">
            {savedNewsArticles.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl text-center border border-[#E8E8E8]">
                <Bookmark className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
                <p className="text-xs text-[#686868]">
                  आपने अभी तक कोई समाचार सेव नहीं किया है।
                </p>
              </div>
            ) : (
              savedNewsArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => onSelectArticle(article)}
                  className="bg-white p-3 rounded-xl border border-[#E8E8E8] flex gap-3 cursor-pointer hover:shadow-xs transition-shadow"
                >
                  <img
                    src={article.featuredImage}
                    alt={article.headlineHi}
                    className="w-22 h-18 rounded-lg object-cover shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#D71920]">
                      {article.location} • {article.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#171717] line-clamp-2 mt-0.5">
                      {language === 'hi' ? article.headlineHi : article.headlineEn}
                    </h3>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Liked Articles */}
        {activeTab === 'liked' && (
          <div className="space-y-3">
            {likedNewsArticles.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl text-center border border-[#E8E8E8]">
                <Heart className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
                <p className="text-xs text-[#686868]">
                  कोई पसंद किया गया समाचार नहीं है।
                </p>
              </div>
            ) : (
              likedNewsArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => onSelectArticle(article)}
                  className="bg-white p-3 rounded-xl border border-[#E8E8E8] flex gap-3 cursor-pointer hover:shadow-xs transition-shadow"
                >
                  <img
                    src={article.featuredImage}
                    alt={article.headlineHi}
                    className="w-22 h-18 rounded-lg object-cover shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#D71920]">
                      {article.location}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#171717] line-clamp-2 mt-0.5">
                      {language === 'hi' ? article.headlineHi : article.headlineEn}
                    </h3>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Settings & Preferences */}
        {activeTab === 'settings' && (
          <div className="space-y-4">
            {/* Notification toggles */}
            <div className="bg-white rounded-2xl border border-[#E8E8E8] p-4 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Bell className="w-4 h-4 text-[#D71920]" />
                <h3 className="font-bold text-sm text-[#171717]">
                  पुश नोटिफिकेशन प्राथमिकताएं (Push Alerts)
                </h3>
              </div>

              <div className="space-y-2.5">
                {[
                  { key: 'breakingNews' as const, label: '🔴 ब्रेकिंग न्यूज़ अलर्ट (Breaking News)' },
                  { key: 'localBetul' as const, label: '📍 स्थानीय बैतूल समाचार (Local District)' },
                  { key: 'crime' as const, label: '🚨 क्राइम एवं पुलिस अलर्ट (Crime & Police)' },
                  { key: 'jobs' as const, label: '💼 नौकरियां एवं शिक्षा (Jobs & Exams)' },
                  { key: 'promotions' as const, label: '🏷️ बाज़ार डिस्काउंट एवं ऑफ़र्स (Offers)' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-1">
                    <span className="text-xs text-[#171717]">{item.label}</span>
                    <button
                      onClick={() => toggleNotif(item.key)}
                      className={`w-10 h-5 rounded-full transition-colors relative ${
                        notifSettings[item.key] ? 'bg-[#D71920]' : 'bg-neutral-300'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                          notifSettings[item.key] ? 'left-5.5' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions List */}
            <div className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden shadow-xs divide-y divide-[#E8E8E8]">
              <button
                onClick={onAdvertiseClick}
                className="w-full p-3.5 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-red-50 text-[#D71920]">
                    <Megaphone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#171717]">
                      बैतूल टॉक्स में विज्ञापन दें
                    </div>
                    <div className="text-[11px] text-[#686868]">
                      व्यापार बढ़ाएं, ऑफ़र पोस्ट करें
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>

              <button
                onClick={onLanguageToggle}
                className="w-full p-3.5 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-50 text-[#F4B400]">
                    <Languages className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#171717]">
                      भाषा बदलें (Language)
                    </div>
                    <div className="text-[11px] text-[#686868]">
                      वर्तमान: {language === 'hi' ? 'हिन्दी (Hindi)' : 'English'}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#D71920] bg-red-50 px-2 py-0.5 rounded">
                  {language === 'hi' ? 'ENG करें' : 'हिन्दी करें'}
                </span>
              </button>

              <button
                onClick={onResetData}
                className="w-full p-3.5 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-neutral-100 text-neutral-700">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#171717]">
                      डेटा रीसेट करें (Reset Demo Data)
                    </div>
                    <div className="text-[11px] text-[#686868]">
                      ताज़ा बैतूल टेस्ट डेटा दोबारा लोड करें
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>
            </div>

            {/* About Betul Talks Mediawork Pvt. Ltd. */}
            <div className="bg-white rounded-2xl border border-[#E8E8E8] p-4 text-xs text-[#686868] shadow-xs">
              <div className="flex items-center gap-2 mb-2 font-bold text-[#171717]">
                <Building className="w-4 h-4 text-[#D71920]" />
                <span>बैतूल टॉक्स मीडियावर्क प्रा. लि. (Betul Talks Mediawork Pvt. Ltd.)</span>
              </div>
              <p className="leading-relaxed">
                पंजीकृत कार्यालय: कोठी बाज़ार, बैतूल, मध्य प्रदेश - 460001
                <br />
                ईमेल: info@betultalks.com | हेल्पलाइन: +91 94250 01122
                <br />
                संपादकीय नीति: निष्पक्ष, सत्य एवं स्थानीय पत्रकारिता के प्रति समर्पित।
              </p>
              <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                <span>संस्करण: v2.4.0 (Production Ready)</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  सुरक्षित एवं सत्यापित
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
