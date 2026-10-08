import React, { useState, useEffect } from 'react';
import { storage } from './services/storage';
import {
  NewsArticle,
  VideoReel,
  Advertisement,
  BusinessListing,
  EventItem,
  PushNotificationMessage,
  UserProfile,
  AdEnquiry,
  NewsCategory,
  BetulTehsil,
  Language,
} from './types';
import { AppHeader } from './components/common/AppHeader';
import { BreakingTicker } from './components/common/BreakingTicker';
import { BottomNav, TabType } from './components/common/BottomNav';
import { CategoryPills } from './components/mobile/CategoryPills';
import { MobileHomeFeed } from './components/mobile/MobileHomeFeed';
import { ReelsViewer } from './components/reels/ReelsViewer';
import { AdsMarketplace } from './components/ads/AdsMarketplace';
import { ExploreScreen } from './components/explore/ExploreScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { ArticleDetailView } from './components/article/ArticleDetailView';
import { AdminPanel } from './components/admin/AdminPanel';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { ShareModal } from './components/common/ShareModal';
import { CitizenReporterModal } from './components/common/CitizenReporterModal';
import { DeviceFrameWrapper } from './components/common/DeviceFrameWrapper';

export default function App() {
  // Global Data State
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [reels, setReels] = useState<VideoReel[]>([]);
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [businesses, setBusinesses] = useState<BusinessListing[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [notifications, setNotifications] = useState<PushNotificationMessage[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [enquiries, setEnquiries] = useState<AdEnquiry[]>([]);

  // Navigation & View State
  const [currentMode, setCurrentMode] = useState<'mobile' | 'admin'>('mobile');
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'all'>('all');
  const [currentLocation, setCurrentLocation] = useState<BetulTehsil | 'All'>('All');
  const [language, setLanguage] = useState<Language>('hi');

  // Active Reader Detail State
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  // Modals & Drawers
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);
  const [sharingArticle, setSharingArticle] = useState<NewsArticle | null>(null);
  const [isCitizenModalOpen, setIsCitizenModalOpen] = useState(false);

  // Device Frame Viewport Simulation
  const [deviceView, setDeviceView] = useState<'phone' | 'fluid'>('phone');
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  // Floating Push Banner Toast
  const [latestToast, setLatestToast] = useState<PushNotificationMessage | null>(null);

  // Load data from persistent storage
  const reloadData = () => {
    setNews(storage.getNews());
    setReels(storage.getReels());
    setAds(storage.getAds());
    setBusinesses(storage.getBusinesses());
    setEvents(storage.getEvents());
    setNotifications(storage.getNotifications());
    setProfile(storage.getProfile());
    setEnquiries(storage.getEnquiries());
  };

  useEffect(() => {
    reloadData();

    // Check screen size
    const checkScreen = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Filter news by location if specific tehsil is chosen
  const locationFilteredNews = currentLocation === 'All'
    ? news
    : news.filter((n) => n.location === currentLocation || n.location === 'Madhya Pradesh');

  const breakingArticles = news.filter((n) => n.isBreaking && n.status === 'published');

  // Bookmark / Save News
  const handleBookmark = (article: NewsArticle, e: React.MouseEvent) => {
    e.stopPropagation();
    storage.toggleBookmarkNews(article.id);
    setProfile(storage.getProfile());
  };

  // Share News
  const handleShare = (article: NewsArticle, e: React.MouseEvent) => {
    e.stopPropagation();
    setSharingArticle(article);
  };

  // Quick action from Mobile Home Feed
  const handleQuickAction = (action: 'latest' | 'video' | 'ads' | 'events' | 'reporter') => {
    if (action === 'latest') {
      setActiveTab('home');
      setSelectedCategory('all');
    } else if (action === 'video') {
      setActiveTab('videos');
    } else if (action === 'ads') {
      setActiveTab('ads');
    } else if (action === 'events') {
      setActiveTab('explore');
    } else if (action === 'reporter') {
      setIsCitizenModalOpen(true);
    }
  };

  // Admin Actions
  const handleSaveNews = (article: NewsArticle) => {
    const existing = news.find((n) => n.id === article.id);
    if (existing) {
      storage.updateNews(article);
    } else {
      storage.addNews(article);
    }
    reloadData();
  };

  const handleDeleteNews = (id: string) => {
    storage.deleteNews(id);
    reloadData();
  };

  const handleSaveReel = (reel: VideoReel) => {
    const existing = reels.find((r) => r.id === reel.id);
    if (existing) {
      storage.updateReel(reel);
    } else {
      storage.addReel(reel);
    }
    reloadData();
  };

  const handleDeleteReel = (id: string) => {
    storage.deleteReel(id);
    reloadData();
  };

  const handleSaveAd = (ad: Advertisement) => {
    const existing = ads.find((a) => a.id === ad.id);
    if (existing) {
      storage.updateAd(ad);
    } else {
      storage.addAd(ad);
    }
    reloadData();
  };

  const handleDeleteAd = (id: string) => {
    storage.deleteAd(id);
    reloadData();
  };

  const handleSaveBusiness = (biz: BusinessListing) => {
    const existing = businesses.find((b) => b.id === biz.id);
    if (existing) {
      storage.updateBusiness(biz);
    } else {
      storage.addBusiness(biz);
    }
    reloadData();
  };

  const handleDeleteBusiness = (id: string) => {
    storage.deleteBusiness(id);
    reloadData();
  };

  const handleSendNotification = (notif: PushNotificationMessage) => {
    storage.sendPushNotification(notif);
    setNotifications(storage.getNotifications());
    // Trigger in-app banner toast
    setLatestToast(notif);
    setTimeout(() => setLatestToast(null), 5000);
  };

  const handleUpdateEnquiryStatus = (id: string, status: any) => {
    storage.updateEnquiryStatus(id, status);
    setEnquiries(storage.getEnquiries());
  };

  const handleResetData = () => {
    if (confirm('क्या आप सभी टेस्ट डेटा को डिफ़ॉल्ट पर रीसेट करना चाहते हैं?')) {
      storage.resetAll();
      reloadData();
      alert('डेटा रीसेट सफल रहा!');
    }
  };

  // If Admin CMS mode is active, render the dedicated Web Admin Panel
  if (currentMode === 'admin') {
    return (
      <AdminPanel
        news={news}
        reels={reels}
        ads={ads}
        businesses={businesses}
        notifications={notifications}
        enquiries={enquiries}
        onSaveNews={handleSaveNews}
        onDeleteNews={handleDeleteNews}
        onSaveReel={handleSaveReel}
        onDeleteReel={handleDeleteReel}
        onSaveAd={handleSaveAd}
        onDeleteAd={handleDeleteAd}
        onSaveBusiness={handleSaveBusiness}
        onDeleteBusiness={handleDeleteBusiness}
        onSendNotification={handleSendNotification}
        onUpdateEnquiryStatus={handleUpdateEnquiryStatus}
        onSwitchToMobile={() => setCurrentMode('mobile')}
      />
    );
  }

  // Mobile App Reader Experience
  const mobileContent = (
    <div className="relative min-h-screen bg-[#F7F7F7] flex flex-col justify-between">
      {/* Real-time Push Alert Banner Toast */}
      {latestToast && (
        <div
          onClick={() => {
            if (latestToast.articleId) {
              const target = news.find((n) => n.id === latestToast.articleId);
              if (target) setActiveArticle(target);
            }
            setLatestToast(null);
          }}
          className="fixed top-2 left-3 right-3 sm:left-auto sm:right-6 sm:w-96 z-50 bg-[#171717] text-white p-3.5 rounded-2xl shadow-2xl border-2 border-[#D71920] animate-in slide-in-from-top cursor-pointer flex items-start gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-[#D71920] flex items-center justify-center shrink-0">
            🔔
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#F4B400]">{latestToast.title}</span>
              <span className="text-[10px] text-neutral-400">अभी</span>
            </div>
            <p className="text-xs text-neutral-200 line-clamp-2 mt-0.5">{latestToast.body}</p>
          </div>
        </div>
      )}

      {/* If reading an article, show Full Article View */}
      {activeArticle ? (
        <ArticleDetailView
          article={activeArticle}
          onBack={() => setActiveArticle(null)}
          language={language}
          onSelectArticle={(art) => setActiveArticle(art)}
          allNews={news}
          ads={ads}
        />
      ) : (
        <>
          {/* Header & Breaking News Ticker (visible on Home, Ads, Explore, Profile) */}
          {activeTab !== 'videos' && (
            <div className="sticky top-0 z-40 bg-white">
              <AppHeader
                currentLocation={currentLocation}
                onLocationChange={(loc) => setCurrentLocation(loc)}
                language={language}
                onLanguageToggle={() => setLanguage((prev) => (prev === 'hi' ? 'en' : 'hi'))}
                onSearchClick={() => setActiveTab('explore')}
                onNotificationsClick={() => setIsNotifDrawerOpen(true)}
                unreadNotifsCount={notifications.length}
                currentMode={currentMode}
                onModeSwitch={(m) => setCurrentMode(m)}
              />

              {/* Breaking News ticker */}
              <BreakingTicker
                breakingArticles={breakingArticles}
                language={language}
                onArticleClick={(art) => setActiveArticle(art)}
              />

              {/* Category Pills (only on Home Tab) */}
              {activeTab === 'home' && (
                <CategoryPills
                  activeCategory={selectedCategory}
                  onCategorySelect={(cat) => setSelectedCategory(cat)}
                  language={language}
                />
              )}
            </div>
          )}

          {/* Main Screens Container */}
          <main className="flex-1">
            {/* Tab 1: Home Screen */}
            {activeTab === 'home' && (
              <MobileHomeFeed
                news={locationFilteredNews}
                reels={reels}
                ads={ads}
                selectedCategory={selectedCategory}
                language={language}
                onSelectArticle={(art) => setActiveArticle(art)}
                onSelectReel={(reel) => setActiveTab('videos')}
                onBookmark={handleBookmark}
                onShare={handleShare}
                savedArticleIds={profile?.savedArticles || []}
                onQuickAction={handleQuickAction}
                onViewAllReels={() => setActiveTab('videos')}
              />
            )}

            {/* Tab 2: Videos / Reels Screen */}
            {activeTab === 'videos' && (
              <ReelsViewer
                reels={reels}
                language={language}
                onClose={() => setActiveTab('home')}
              />
            )}

            {/* Tab 3: Advertisements Marketplace & Business Directory */}
            {activeTab === 'ads' && (
              <AdsMarketplace
                businesses={businesses}
                ads={ads}
                language={language}
              />
            )}

            {/* Tab 4: Explore & Categories Screen */}
            {activeTab === 'explore' && (
              <ExploreScreen
                news={news}
                reels={reels}
                businesses={businesses}
                events={events}
                language={language}
                onSelectArticle={(art) => setActiveArticle(art)}
                onSelectReel={(reel) => setActiveTab('videos')}
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat as any);
                  setActiveTab('home');
                }}
              />
            )}

            {/* Tab 5: Profile Screen */}
            {activeTab === 'profile' && profile && (
              <ProfileScreen
                profile={profile}
                news={news}
                reels={reels}
                language={language}
                onLanguageToggle={() => setLanguage((prev) => (prev === 'hi' ? 'en' : 'hi'))}
                onSelectArticle={(art) => setActiveArticle(art)}
                onAdvertiseClick={() => setActiveTab('ads')}
                onResetData={handleResetData}
                onOpenAdmin={() => setCurrentMode('admin')}
              />
            )}
          </main>

          {/* Bottom Navigation */}
          <BottomNav
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            language={language}
          />
        </>
      )}

      {/* Notifications Drawer */}
      <NotificationDrawer
        isOpen={isNotifDrawerOpen}
        onClose={() => setIsNotifDrawerOpen(false)}
        notifications={notifications}
        news={news}
        onSelectArticle={(art) => setActiveArticle(art)}
      />

      {/* WhatsApp / Social Share Modal */}
      <ShareModal
        isOpen={!!sharingArticle}
        onClose={() => setSharingArticle(null)}
        article={sharingArticle}
        language={language}
      />

      {/* Citizen Reporter Tip-off Modal */}
      <CitizenReporterModal
        isOpen={isCitizenModalOpen}
        onClose={() => setIsCitizenModalOpen(false)}
        onSubmitSuccess={() => {
          alert('धन्यवाद! आपका समाचार बैतूल टॉक्स न्यूज़ रूम तक पहुंच गया है।');
        }}
      />
    </div>
  );

  return (
    <DeviceFrameWrapper
      activeView={deviceView}
      onViewChange={(v) => setDeviceView(v)}
      isMobileDevice={isMobileScreen}
      onOpenAdmin={() => setCurrentMode('admin')}
    >
      {mobileContent}
    </DeviceFrameWrapper>
  );
}
