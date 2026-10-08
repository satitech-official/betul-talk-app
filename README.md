# Betul Talks – Local News & Advertisement Platform
### BETUL TALKS MEDIAWORK PVT. LTD. (बैतूल टॉक्स मीडिया नेटवर्क)

A production-ready mobile news application and web-based administration content management system built specifically for **Betul Talks Mediawork Pvt. Ltd.** in Betul, Madhya Pradesh.

---

## 🌟 Key Features

### 1. Reader Application (Mobile & Responsive Web)
- **Brand Identity**: Authentic Betul Talks circular sunrise logo, `#D71920` (Strong News Red), `#F4B400` (Golden Yellow), and clean editorial whitespace.
- **Breaking News Ticker**: Smooth high-priority red marquee ticker displaying real-time breaking alerts across Betul district.
- **Tehsil & Location Filtering**: Real-time filtering across Betul, Multai, Amla, Bhainsdehi, Shahpur, Chicholi, Athner, Ghoradongri, and Sarni.
- **Video & Short Reels**: Immersive 9:16 vertical reels video player with like, comment, share, bookmark, audio attribution, and reporter verification badges.
- **Audio News (TTS)**: One-click "ख़बर सुनें" audio player for all news stories in Hindi and English.
- **Local Ads Marketplace**: Dedicated business promotion hub with WhatsApp and Direct Call action buttons, discount deals, and "Grow Your Business in Betul" enquiry forms.
- **Explore & Global Search**: Multi-category exploration (Politics, Crime, Mandi & Business, Agriculture, Sports, Events) with search history.
- **Citizen Reporter (ख़बर भेजें)**: Direct tip-off submission from local citizens to the newsroom desk.
- **Bilingual Support**: Instant toggle between Hindi (हिन्दी) and English.

### 2. Web Administration Panel (CMS & Ad Portal)
- **Role-Based Access Control (RBAC)**: Super Admin, Admin, Editor, Reporter, Video Editor, Ad Manager.
- **News Management**: Rich bilingual article editor (Hindi & English), slug generation, image/video URLs, breaking news ticker toggle, comments toggle, and instant push notification toggle.
- **Video & Reels Studio**: Reel/Bulleting/Live TV stream manager with duration, engagement analytics, and status controls.
- **Ad Campaigns & Marketplace**: Full campaign management (Hero banners, native feed cards, in-article slots), tracking impressions, clicks, WhatsApp leads, phone calls, and CTR.
- **Business Listings Directory**: Directory verification, featured tags, and opening hours.
- **Push Notification Broadcaster**: Firebase Cloud Messaging (FCM) broadcast simulation to 45,000+ local mobile devices with deep linking.
- **Analytics Suite**: Tehsil-wise readership distribution, top 5 stories, video watch metrics, and lead conversions.

---

## 🏗️ Architecture & Folder Structure

```
├── src/
│   ├── components/
│   │   ├── admin/               # Web CMS Dashboard & Content Managers
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminNewsManager.tsx
│   │   │   ├── AdminVideoManager.tsx
│   │   │   ├── AdminAdsManager.tsx
│   │   │   ├── AdminBusinessesManager.tsx
│   │   │   ├── AdminNotificationsManager.tsx
│   │   │   ├── AdminAnalytics.tsx
│   │   │   └── AdminPanel.tsx
│   │   ├── ads/                 # Marketplace & Native In-Feed Ads
│   │   │   ├── AdsMarketplace.tsx
│   │   │   └── SponsoredAdCard.tsx
│   │   ├── article/             # Full Article Reader with Audio & Comments
│   │   │   └── ArticleDetailView.tsx
│   │   ├── common/              # Logo, Header, BottomNav, Ticker, Modals
│   │   │   ├── BetulTalksLogo.tsx
│   │   │   ├── AppHeader.tsx
│   │   │   ├── BottomNav.tsx
│   │   │   ├── BreakingTicker.tsx
│   │   │   ├── NotificationDrawer.tsx
│   │   │   ├── ShareModal.tsx
│   │   │   ├── CitizenReporterModal.tsx
│   │   │   └── DeviceFrameWrapper.tsx
│   │   ├── explore/             # Global Search, Events & Categories
│   │   │   └── ExploreScreen.tsx
│   │   ├── mobile/              # News Feeds, Hero Story, Category Pills
│   │   │   ├── MobileHomeFeed.tsx
│   │   │   ├── HeroStory.tsx
│   │   │   ├── NewsCard.tsx
│   │   │   ├── CategoryPills.tsx
│   │   │   ├── QuickActions.tsx
│   │   │   └── VideoNewsSection.tsx
│   │   ├── profile/             # User Bookmarks, Liked News & Settings
│   │   │   └── ProfileScreen.tsx
│   │   └── reels/               # Vertical Video Reels Viewer
│   │       └── ReelsViewer.tsx
│   ├── constants/
│   │   └── initialData.ts       # Realistic Betul District Seed Content
│   ├── services/
│   │   └── storage.ts           # Unified Reactive LocalStorage & DB Service
│   ├── types/
│   │   └── index.ts             # Strict TypeScript Models
│   ├── App.tsx                  # Master View Coordinator & Mode Router
│   ├── index.css                # Tailwind CSS v4 & Typography
│   └── main.tsx                 # React 19 Entry
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm or bun

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
# Type check and build
npm run build

# Preview production build
npm run preview
```

---

## 📱 Mobile & Admin Switcher
At the top of the application ribbon, you can seamlessly switch between:
1. **न्यूज़ ऍप (Reader App)**: Mobile reading experience with simulated phone frame or fluid view.
2. **एडमिन पैनल (Admin CMS)**: Comprehensive web dashboard for editors and business managers.
3. **Language Toggle**: One-click switch between Hindi (`हिन्दी`) and English (`ENG`).

---

## 🏛️ About Betul Talks Mediawork Pvt. Ltd.
- **Headquarters**: Kothi Bazar, Betul, Madhya Pradesh - 460001
- **Focus**: Hyperlocal, truthful, and video-first journalism covering Betul, Multai, Amla, and the Satpura region.
