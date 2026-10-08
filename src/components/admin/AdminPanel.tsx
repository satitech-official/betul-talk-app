import React, { useState } from 'react';
import {
  LayoutDashboard,
  Newspaper,
  Video,
  Megaphone,
  Building2,
  Calendar,
  Bell,
  BarChart3,
  MessageSquare,
  ShieldAlert,
  Settings,
  Menu,
  X,
  Smartphone,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { BetulTalksLogo } from '../common/BetulTalksLogo';
import { AdminDashboard } from './AdminDashboard';
import { AdminNewsManager } from './AdminNewsManager';
import { AdminVideoManager } from './AdminVideoManager';
import { AdminAdsManager } from './AdminAdsManager';
import { AdminBusinessesManager } from './AdminBusinessesManager';
import { AdminNotificationsManager } from './AdminNotificationsManager';
import { AdminAnalytics } from './AdminAnalytics';
import {
  NewsArticle,
  VideoReel,
  Advertisement,
  BusinessListing,
  AdminRole,
  PushNotificationMessage,
  AdEnquiry,
} from '../../types';

interface AdminPanelProps {
  news: NewsArticle[];
  reels: VideoReel[];
  ads: Advertisement[];
  businesses: BusinessListing[];
  notifications: PushNotificationMessage[];
  enquiries: AdEnquiry[];
  onSaveNews: (article: NewsArticle) => void;
  onDeleteNews: (id: string) => void;
  onSaveReel: (reel: VideoReel) => void;
  onDeleteReel: (id: string) => void;
  onSaveAd: (ad: Advertisement) => void;
  onDeleteAd: (id: string) => void;
  onSaveBusiness: (biz: BusinessListing) => void;
  onDeleteBusiness: (id: string) => void;
  onSendNotification: (notif: PushNotificationMessage) => void;
  onUpdateEnquiryStatus: (id: string, status: any) => void;
  onSwitchToMobile: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  news,
  reels,
  ads,
  businesses,
  notifications,
  enquiries,
  onSaveNews,
  onDeleteNews,
  onSaveReel,
  onDeleteReel,
  onSaveAd,
  onDeleteAd,
  onSaveBusiness,
  onDeleteBusiness,
  onSendNotification,
  onUpdateEnquiryStatus,
  onSwitchToMobile,
}) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [currentRole, setCurrentRole] = useState<AdminRole>('SUPER_ADMIN');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);

  const navItems = [
    { id: 'dashboard', label: 'डैशबोर्ड (Overview)', icon: LayoutDashboard },
    { id: 'news', label: 'समाचार प्रबंधन (News)', icon: Newspaper, count: news.length },
    { id: 'videos', label: 'रील्स व वीडियो (Videos)', icon: Video, count: reels.length },
    { id: 'ads', label: 'विज्ञापन अभियान (Ads)', icon: Megaphone, count: ads.length },
    { id: 'businesses', label: 'प्रतिष्ठान डायरेक्टरी', icon: Building2, count: businesses.length },
    { id: 'notifications', label: 'पुश अलर्ट्स (Push FCM)', icon: Bell },
    { id: 'analytics', label: 'रीडरशिप एनालिटिक्स', icon: BarChart3 },
  ];

  const handleEditNews = (article: NewsArticle) => {
    setEditingArticle(article);
    setActiveSection('news');
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col antialiased">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E8E8E8] px-3 sm:px-6 py-2.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-neutral-100 text-[#171717]"
          >
            <Menu className="w-5 h-5" />
          </button>
          <BetulTalksLogo size="sm" showSubtitle={false} />
          <span className="hidden sm:inline bg-neutral-100 text-[#171717] font-extrabold text-[11px] px-2 py-0.5 rounded border border-neutral-200">
            ADMIN CMS v2.4
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Active Admin Role Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-[#686868] hidden md:inline">
              सक्रिय रोल:
            </span>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as AdminRole)}
              className="text-xs font-bold bg-[#F7F7F7] border border-[#E8E8E8] text-[#D71920] px-2.5 py-1.5 rounded-xl focus:outline-none"
            >
              <option value="SUPER_ADMIN">सुपर एडमिन (Super Admin)</option>
              <option value="ADMIN">एडमिन (Admin)</option>
              <option value="EDITOR">संपादक (Editor)</option>
              <option value="REPORTER">रिपोर्टर (Reporter)</option>
              <option value="VIDEO_EDITOR">वीडियो एडिटर</option>
              <option value="AD_MANAGER">विज्ञापन प्रबंधक</option>
            </select>
          </div>

          {/* Switch to Reader View button */}
          <button
            onClick={onSwitchToMobile}
            className="flex items-center gap-1.5 bg-[#171717] hover:bg-neutral-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#F4B400]" />
            <span className="hidden sm:inline">रीडर ऍप देखें (Reader View)</span>
            <span className="sm:hidden">ऍप</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-white border-r border-[#E8E8E8] p-4 shrink-0">
          <div className="text-[11px] font-bold text-[#686868] uppercase tracking-wider mb-2 px-2">
            कंटेंट & बिज़नेस नेविगेशन
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#D71920] text-white shadow-xs font-extrabold'
                      : 'text-[#171717] hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-[#686868]'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* District Status Card */}
          <div className="mt-8 p-3 rounded-xl bg-red-50 border border-red-100 text-xs">
            <div className="font-bold text-[#D71920] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>सिस्टम ऑनलाइन</span>
            </div>
            <p className="text-[11px] text-neutral-600 mt-1">
              बैतूल, मुलताई, अमला व सतपुड़ा सर्वर सक्रिय। डाटा लोकल स्टोरेज में सिंक्रोनाइज़ है।
            </p>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex lg:hidden">
            <div className="w-64 bg-white h-full p-4 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E8] mb-3">
                  <BetulTalksLogo size="sm" />
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 rounded-lg hover:bg-neutral-100"
                  >
                    <X className="w-5 h-5 text-[#686868]" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveSection(item.id);
                          setMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                          isActive
                            ? 'bg-[#D71920] text-white shadow-xs'
                            : 'text-[#171717] hover:bg-neutral-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.count !== undefined && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/10">
                            {item.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-3 border-t border-[#E8E8E8]">
                <button
                  onClick={onSwitchToMobile}
                  className="w-full py-2 bg-[#171717] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Smartphone className="w-4 h-4 text-[#F4B400]" />
                  <span>पब्लिक न्यूज़ ऍप खोलें</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Content Area */}
        <main className="flex-1 p-3 sm:p-6 overflow-y-auto max-w-full">
          {activeSection === 'dashboard' && (
            <AdminDashboard
              news={news}
              reels={reels}
              ads={ads}
              businesses={businesses}
              onNavigate={(s) => setActiveSection(s)}
              onCreateNews={() => {
                setEditingArticle(null);
                setActiveSection('news');
              }}
              onEditNews={handleEditNews}
              onDeleteNews={onDeleteNews}
            />
          )}

          {activeSection === 'news' && (
            <AdminNewsManager
              news={news}
              onSaveArticle={onSaveNews}
              onDeleteArticle={onDeleteNews}
              onSendBroadcastNotif={(t, b, id) => {
                onSendNotification({
                  id: `notif-${Date.now()}`,
                  title: t,
                  body: b,
                  category: 'Breaking News',
                  articleId: id,
                  sentAt: 'अभी-अभी (Just now)',
                  recipientsCount: 45200,
                  isBreaking: true,
                });
              }}
              editingArticle={editingArticle}
              onClearEditing={() => setEditingArticle(null)}
            />
          )}

          {activeSection === 'videos' && (
            <AdminVideoManager
              reels={reels}
              onSaveReel={onSaveReel}
              onDeleteReel={onDeleteReel}
            />
          )}

          {activeSection === 'ads' && (
            <AdminAdsManager
              ads={ads}
              enquiries={enquiries}
              onSaveAd={onSaveAd}
              onDeleteAd={onDeleteAd}
              onUpdateEnquiryStatus={onUpdateEnquiryStatus}
            />
          )}

          {activeSection === 'businesses' && (
            <AdminBusinessesManager
              businesses={businesses}
              onSaveBusiness={onSaveBusiness}
              onDeleteBusiness={onDeleteBusiness}
            />
          )}

          {activeSection === 'notifications' && (
            <AdminNotificationsManager
              notifications={notifications}
              news={news}
              onSendNotification={onSendNotification}
            />
          )}

          {activeSection === 'analytics' && (
            <AdminAnalytics news={news} reels={reels} ads={ads} />
          )}
        </main>
      </div>
    </div>
  );
};
