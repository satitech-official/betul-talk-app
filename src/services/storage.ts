import {
  NewsArticle,
  VideoReel,
  Advertisement,
  BusinessListing,
  EventItem,
  CommentItem,
  PushNotificationMessage,
  UserProfile,
  AdEnquiry,
} from '../types';
import {
  INITIAL_NEWS,
  INITIAL_REELS,
  INITIAL_ADVERTISEMENTS,
  INITIAL_BUSINESSES,
  INITIAL_EVENTS,
  INITIAL_COMMENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_PROFILE,
  INITIAL_ENQUIRIES,
} from '../constants/initialData';

const STORAGE_KEYS = {
  NEWS: 'betul_talks_news_v1',
  REELS: 'betul_talks_reels_v1',
  ADS: 'betul_talks_ads_v1',
  BUSINESSES: 'betul_talks_businesses_v1',
  EVENTS: 'betul_talks_events_v1',
  COMMENTS: 'betul_talks_comments_v1',
  NOTIFICATIONS: 'betul_talks_notifs_v1',
  PROFILE: 'betul_talks_profile_v1',
  ENQUIRIES: 'betul_talks_enquiries_v1',
};

class StorageService {
  private getItem<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(key);
      if (!data) return fallback;
      return JSON.parse(data) as T;
    } catch {
      return fallback;
    }
  }

  private setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage set error:', e);
    }
  }

  // News
  getNews(): NewsArticle[] {
    return this.getItem<NewsArticle[]>(STORAGE_KEYS.NEWS, INITIAL_NEWS);
  }

  saveNews(news: NewsArticle[]): void {
    this.setItem(STORAGE_KEYS.NEWS, news);
  }

  addNews(article: NewsArticle): void {
    const list = this.getNews();
    this.saveNews([article, ...list]);
  }

  updateNews(updated: NewsArticle): void {
    const list = this.getNews();
    const idx = list.findIndex((n) => n.id === updated.id);
    if (idx !== -1) {
      list[idx] = updated;
      this.saveNews([...list]);
    }
  }

  deleteNews(id: string): void {
    const list = this.getNews();
    this.saveNews(list.filter((n) => n.id !== id));
  }

  incrementNewsViews(id: string): void {
    const list = this.getNews();
    const idx = list.findIndex((n) => n.id === id);
    if (idx !== -1) {
      list[idx].viewsCount += 1;
      this.saveNews([...list]);
    }
  }

  toggleLikeNews(id: string): boolean {
    const list = this.getNews();
    const profile = this.getProfile();
    const idx = list.findIndex((n) => n.id === id);
    let isLiked = false;

    if (idx !== -1) {
      const likedIdx = profile.likedArticles.indexOf(id);
      if (likedIdx > -1) {
        profile.likedArticles.splice(likedIdx, 1);
        list[idx].likesCount = Math.max(0, list[idx].likesCount - 1);
        isLiked = false;
      } else {
        profile.likedArticles.push(id);
        list[idx].likesCount += 1;
        isLiked = true;
      }
      this.saveNews([...list]);
      this.saveProfile(profile);
    }
    return isLiked;
  }

  toggleBookmarkNews(id: string): boolean {
    const profile = this.getProfile();
    const savedIdx = profile.savedArticles.indexOf(id);
    let isSaved = false;

    if (savedIdx > -1) {
      profile.savedArticles.splice(savedIdx, 1);
      isSaved = false;
    } else {
      profile.savedArticles.push(id);
      isSaved = true;
    }
    this.saveProfile(profile);
    return isSaved;
  }

  // Reels & Videos
  getReels(): VideoReel[] {
    return this.getItem<VideoReel[]>(STORAGE_KEYS.REELS, INITIAL_REELS);
  }

  saveReels(reels: VideoReel[]): void {
    this.setItem(STORAGE_KEYS.REELS, reels);
  }

  addReel(reel: VideoReel): void {
    const list = this.getReels();
    this.saveReels([reel, ...list]);
  }

  updateReel(updated: VideoReel): void {
    const list = this.getReels();
    const idx = list.findIndex((r) => r.id === updated.id);
    if (idx !== -1) {
      list[idx] = updated;
      this.saveReels([...list]);
    }
  }

  deleteReel(id: string): void {
    const list = this.getReels();
    this.saveReels(list.filter((r) => r.id !== id));
  }

  toggleLikeReel(id: string): boolean {
    const list = this.getReels();
    const profile = this.getProfile();
    const idx = list.findIndex((r) => r.id === id);
    let isLiked = false;

    if (idx !== -1) {
      const likedIdx = profile.likedVideos.indexOf(id);
      if (likedIdx > -1) {
        profile.likedVideos.splice(likedIdx, 1);
        list[idx].likesCount = Math.max(0, list[idx].likesCount - 1);
        isLiked = false;
      } else {
        profile.likedVideos.push(id);
        list[idx].likesCount += 1;
        isLiked = true;
      }
      this.saveReels([...list]);
      this.saveProfile(profile);
    }
    return isLiked;
  }

  // Ads
  getAds(): Advertisement[] {
    return this.getItem<Advertisement[]>(STORAGE_KEYS.ADS, INITIAL_ADVERTISEMENTS);
  }

  saveAds(ads: Advertisement[]): void {
    this.setItem(STORAGE_KEYS.ADS, ads);
  }

  addAd(ad: Advertisement): void {
    const list = this.getAds();
    this.saveAds([ad, ...list]);
  }

  updateAd(updated: Advertisement): void {
    const list = this.getAds();
    const idx = list.findIndex((a) => a.id === updated.id);
    if (idx !== -1) {
      list[idx] = updated;
      this.saveAds([...list]);
    }
  }

  deleteAd(id: string): void {
    const list = this.getAds();
    this.saveAds(list.filter((a) => a.id !== id));
  }

  recordAdClick(id: string, type: 'general' | 'whatsapp' | 'phone' | 'directions'): void {
    const list = this.getAds();
    const idx = list.findIndex((a) => a.id === id);
    if (idx !== -1) {
      list[idx].clicks += 1;
      if (type === 'whatsapp') list[idx].whatsappClicks += 1;
      if (type === 'phone') list[idx].phoneClicks += 1;
      if (type === 'directions') list[idx].directionsClicks += 1;
      this.saveAds([...list]);
    }
  }

  recordAdImpression(id: string): void {
    const list = this.getAds();
    const idx = list.findIndex((a) => a.id === id);
    if (idx !== -1) {
      list[idx].impressions += 1;
      this.saveAds([...list]);
    }
  }

  // Businesses
  getBusinesses(): BusinessListing[] {
    return this.getItem<BusinessListing[]>(STORAGE_KEYS.BUSINESSES, INITIAL_BUSINESSES);
  }

  saveBusinesses(biz: BusinessListing[]): void {
    this.setItem(STORAGE_KEYS.BUSINESSES, biz);
  }

  addBusiness(biz: BusinessListing): void {
    const list = this.getBusinesses();
    this.saveBusinesses([biz, ...list]);
  }

  updateBusiness(updated: BusinessListing): void {
    const list = this.getBusinesses();
    const idx = list.findIndex((b) => b.id === updated.id);
    if (idx !== -1) {
      list[idx] = updated;
      this.saveBusinesses([...list]);
    }
  }

  deleteBusiness(id: string): void {
    const list = this.getBusinesses();
    this.saveBusinesses(list.filter((b) => b.id !== id));
  }

  // Events
  getEvents(): EventItem[] {
    return this.getItem<EventItem[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  }

  saveEvents(events: EventItem[]): void {
    this.setItem(STORAGE_KEYS.EVENTS, events);
  }

  addEvent(event: EventItem): void {
    const list = this.getEvents();
    this.saveEvents([event, ...list]);
  }

  deleteEvent(id: string): void {
    const list = this.getEvents();
    this.saveEvents(list.filter((e) => e.id !== id));
  }

  // Comments
  getComments(): CommentItem[] {
    return this.getItem<CommentItem[]>(STORAGE_KEYS.COMMENTS, INITIAL_COMMENTS);
  }

  saveComments(comments: CommentItem[]): void {
    this.setItem(STORAGE_KEYS.COMMENTS, comments);
  }

  addComment(comment: CommentItem): void {
    const list = this.getComments();
    this.saveComments([comment, ...list]);
  }

  updateCommentStatus(id: string, status: 'approved' | 'rejected'): void {
    const list = this.getComments();
    const idx = list.findIndex((c) => c.id === id);
    if (idx !== -1) {
      list[idx].status = status;
      this.saveComments([...list]);
    }
  }

  deleteComment(id: string): void {
    const list = this.getComments();
    this.saveComments(list.filter((c) => c.id !== id));
  }

  // Push Notifications
  getNotifications(): PushNotificationMessage[] {
    return this.getItem<PushNotificationMessage[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }

  saveNotifications(notifs: PushNotificationMessage[]): void {
    this.setItem(STORAGE_KEYS.NOTIFICATIONS, notifs);
  }

  sendPushNotification(notif: PushNotificationMessage): void {
    const list = this.getNotifications();
    this.saveNotifications([notif, ...list]);
  }

  // User Profile
  getProfile(): UserProfile {
    return this.getItem<UserProfile>(STORAGE_KEYS.PROFILE, INITIAL_PROFILE);
  }

  saveProfile(profile: UserProfile): void {
    this.setItem(STORAGE_KEYS.PROFILE, profile);
  }

  // Ad Enquiries
  getEnquiries(): AdEnquiry[] {
    return this.getItem<AdEnquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
  }

  saveEnquiries(enquiries: AdEnquiry[]): void {
    this.setItem(STORAGE_KEYS.ENQUIRIES, enquiries);
  }

  addEnquiry(enquiry: AdEnquiry): void {
    const list = this.getEnquiries();
    this.saveEnquiries([enquiry, ...list]);
  }

  updateEnquiryStatus(id: string, status: 'new' | 'contacted' | 'approved' | 'closed'): void {
    const list = this.getEnquiries();
    const idx = list.findIndex((e) => e.id === id);
    if (idx !== -1) {
      list[idx].status = status;
      this.saveEnquiries([...list]);
    }
  }

  // Reset to seed
  resetAll(): void {
    this.saveNews(INITIAL_NEWS);
    this.saveReels(INITIAL_REELS);
    this.saveAds(INITIAL_ADVERTISEMENTS);
    this.saveBusinesses(INITIAL_BUSINESSES);
    this.saveEvents(INITIAL_EVENTS);
    this.saveComments(INITIAL_COMMENTS);
    this.saveNotifications(INITIAL_NOTIFICATIONS);
    this.saveProfile(INITIAL_PROFILE);
    this.saveEnquiries(INITIAL_ENQUIRIES);
  }
}

export const storage = new StorageService();
