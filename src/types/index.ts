export type Language = 'hi' | 'en';

export type NewsCategory = 
  | 'for_you'
  | 'betul'
  | 'mp'
  | 'politics'
  | 'crime'
  | 'education'
  | 'business'
  | 'sports'
  | 'events';

export type BetulTehsil =
  | 'Betul'
  | 'Multai'
  | 'Amla'
  | 'Bhainsdehi'
  | 'Shahpur'
  | 'Chicholi'
  | 'Athner'
  | 'Ghoradongri'
  | 'Sarni';

export type AdminRole = 
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'EDITOR'
  | 'REPORTER'
  | 'VIDEO_EDITOR'
  | 'AD_MANAGER';

export type ContentStatus = 'published' | 'draft' | 'scheduled' | 'archived';

export interface NewsArticle {
  id: string;
  slug: string;
  headlineHi: string;
  headlineEn: string;
  summaryHi: string;
  summaryEn: string;
  contentHi: string;
  contentEn: string;
  category: NewsCategory;
  location: BetulTehsil | 'Madhya Pradesh' | 'National';
  featuredImage: string;
  galleryImages?: string[];
  videoUrl?: string;
  reporter: {
    id: string;
    name: string;
    avatar: string;
    designation: string;
    verified: boolean;
  };
  isBreaking: boolean;
  isFeatured: boolean;
  isLive: boolean;
  allowComments: boolean;
  sendPushNotification?: boolean;
  viewsCount: number;
  likesCount: number;
  sharesCount: number;
  publishedAt: string;
  updatedAt: string;
  status: ContentStatus;
  tags: string[];
}

export type VideoType = 'reel' | 'video' | 'live';

export interface VideoReel {
  id: string;
  titleHi: string;
  titleEn: string;
  descriptionHi: string;
  descriptionEn: string;
  videoUrl: string;
  thumbnailUrl: string;
  durationSeconds: number;
  type: VideoType;
  location: BetulTehsil | 'Madhya Pradesh';
  reporter: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  publishedAt: string;
  status: ContentStatus;
  category: string;
}

export type AdPlacement = 
  | 'home_hero_banner'
  | 'feed_native'
  | 'between_videos'
  | 'article_inline'
  | 'marketplace_featured'
  | 'full_screen_popup';

export type CampaignStatus = 'active' | 'pending' | 'paused' | 'expired' | 'draft';

export interface Advertisement {
  id: string;
  title: string;
  businessName: string;
  category: string;
  placement: AdPlacement;
  imageUrl: string;
  targetUrl?: string;
  phone: string;
  whatsapp: string;
  address: string;
  googleMapsUrl?: string;
  discountOffer?: string;
  ctaText: string;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  impressions: number;
  clicks: number;
  whatsappClicks: number;
  phoneClicks: number;
  directionsClicks: number;
  budgetInr: number;
}

export interface BusinessListing {
  id: string;
  name: string;
  category: string;
  logo: string;
  coverImage: string;
  description: string;
  phone: string;
  whatsapp: string;
  email?: string;
  address: string;
  tehsil: BetulTehsil;
  googleMapsUrl?: string;
  openingHours: string;
  rating: number;
  verified: boolean;
  featured: boolean;
  specialOffer?: string;
}

export interface EventItem {
  id: string;
  titleHi: string;
  titleEn: string;
  venue: string;
  tehsil: BetulTehsil;
  date: string;
  time: string;
  imageUrl: string;
  descriptionHi: string;
  descriptionEn: string;
  organizer: string;
  contactPhone: string;
  isFeatured: boolean;
  category: 'cultural' | 'religious' | 'sports' | 'business' | 'community';
}

export interface CommentItem {
  id: string;
  articleId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
  likesCount: number;
  status: 'approved' | 'pending' | 'rejected';
  replies?: {
    id: string;
    userName: string;
    content: string;
    timestamp: string;
    isReporter?: boolean;
  }[];
}

export interface PushNotificationMessage {
  id: string;
  title: string;
  body: string;
  category: string;
  targetUrl?: string;
  articleId?: string;
  sentAt: string;
  recipientsCount: number;
  isBreaking: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  location: BetulTehsil;
  preferredLanguage: Language;
  savedArticles: string[]; // IDs
  likedArticles: string[]; // IDs
  likedVideos: string[]; // IDs
  notificationSettings: {
    breakingNews: boolean;
    localBetul: boolean;
    crime: boolean;
    politics: boolean;
    jobs: boolean;
    promotions: boolean;
  };
}

export interface AdEnquiry {
  id: string;
  businessName: string;
  contactPerson: string;
  phone: string;
  whatsapp: string;
  adType: string;
  budgetRange: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'approved' | 'closed';
}
