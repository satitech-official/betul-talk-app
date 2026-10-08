import React from 'react';
import { Flame, TrendingUp, Sparkles, Newspaper } from 'lucide-react';
import {
  NewsArticle,
  VideoReel,
  Advertisement,
  NewsCategory,
  Language,
} from '../../types';
import { HeroStory } from './HeroStory';
import { QuickActions } from './QuickActions';
import { NewsCard } from './NewsCard';
import { VideoNewsSection } from './VideoNewsSection';
import { SponsoredAdCard } from '../ads/SponsoredAdCard';

interface MobileHomeFeedProps {
  news: NewsArticle[];
  reels: VideoReel[];
  ads: Advertisement[];
  selectedCategory: NewsCategory | 'all';
  language: Language;
  onSelectArticle: (article: NewsArticle) => void;
  onSelectReel: (reel: VideoReel) => void;
  onBookmark: (article: NewsArticle, e: React.MouseEvent) => void;
  onShare: (article: NewsArticle, e: React.MouseEvent) => void;
  savedArticleIds: string[];
  onQuickAction: (action: 'latest' | 'video' | 'ads' | 'events' | 'reporter') => void;
  onViewAllReels: () => void;
}

export const MobileHomeFeed: React.FC<MobileHomeFeedProps> = ({
  news,
  reels,
  ads,
  selectedCategory,
  language,
  onSelectArticle,
  onSelectReel,
  onBookmark,
  onShare,
  savedArticleIds,
  onQuickAction,
  onViewAllReels,
}) => {
  // Filter news according to active category
  const filteredNews =
    selectedCategory === 'all' || selectedCategory === 'for_you'
      ? news
      : news.filter((n) => n.category === selectedCategory);

  // 1. Hero story: featured or first published news
  const heroArticle = filteredNews.find((n) => n.isFeatured) || filteredNews[0];

  // 2. Remaining stories for top stories & feeds
  const remainingNews = filteredNews.filter((n) => n.id !== heroArticle?.id);

  // 3. Top Stories (first 2)
  const topStories = remainingNews.slice(0, 2);

  // 4. Trending in Betul (sorted by views count)
  const trendingNews = [...news].sort((a, b) => b.viewsCount - a.viewsCount).slice(0, 3);

  // 5. Advertisements
  const heroBannerAd = ads.find((a) => a.placement === 'home_hero_banner') || ads[0];
  const feedNativeAd = ads.find((a) => a.placement === 'feed_native') || ads[1] || ads[0];

  // 6. Latest feed items (remaining after top stories)
  const latestFeed = remainingNews.slice(2);

  return (
    <div className="pb-24 max-w-2xl mx-auto">
      {/* 4. Hero Story */}
      {heroArticle && (
        <HeroStory
          article={heroArticle}
          language={language}
          onSelect={onSelectArticle}
          onBookmark={onBookmark}
          onShare={onShare}
          isBookmarked={savedArticleIds.includes(heroArticle.id)}
        />
      )}

      {/* 5. Quick Actions Bar */}
      <QuickActions language={language} onActionClick={onQuickAction} />

      {/* Sponsored Banner Placement (After Hero & Quick Actions) */}
      {heroBannerAd && (
        <SponsoredAdCard ad={heroBannerAd} language={language} variant="banner" />
      )}

      {/* 6. Top Stories Section */}
      {topStories.length > 0 && (
        <section className="px-3 my-3">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D71920]" />
              <h2 className="font-extrabold text-sm sm:text-base text-[#171717]">
                {language === 'hi' ? 'प्रमुख समाचार (Top Stories)' : 'Top Local Stories'}
              </h2>
            </div>
            <span className="text-[11px] text-[#686868]">बैतूल संभाग</span>
          </div>

          <div className="space-y-2.5">
            {topStories.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                language={language}
                onSelect={onSelectArticle}
                onBookmark={onBookmark}
                onShare={onShare}
                isBookmarked={savedArticleIds.includes(article.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* 7. VIDEO NEWS Section (Horizontal slider) */}
      {reels.length > 0 && (
        <VideoNewsSection
          reels={reels}
          language={language}
          onSelectReel={onSelectReel}
          onViewAllReels={onViewAllReels}
        />
      )}

      {/* 8. TRENDING IN BETUL */}
      {trendingNews.length > 0 && (
        <section className="px-3 my-4">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#D71920]" />
              <h2 className="font-extrabold text-sm sm:text-base text-[#171717]">
                {language === 'hi' ? 'ट्रेंडिंग इन बैतूल (Trending)' : 'Trending in Betul'}
              </h2>
            </div>
            <span className="text-[11px] font-bold text-[#D71920]">सर्वाधिक पढ़े गए</span>
          </div>

          <div className="space-y-2.5">
            {trendingNews.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                language={language}
                onSelect={onSelectArticle}
                onBookmark={onBookmark}
                onShare={onShare}
                isBookmarked={savedArticleIds.includes(article.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* 9. Sponsored Native Feed Advertisement */}
      {feedNativeAd && (
        <SponsoredAdCard ad={feedNativeAd} language={language} variant="card" />
      )}

      {/* 10. Latest News Feed */}
      {latestFeed.length > 0 && (
        <section className="px-3 my-4">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <Newspaper className="w-4 h-4 text-[#686868]" />
              <h2 className="font-extrabold text-sm sm:text-base text-[#171717]">
                {language === 'hi' ? 'ताज़ा समाचार फीड (Latest Feed)' : 'Latest News Feed'}
              </h2>
            </div>
            <span className="text-[11px] text-[#686868]">24x7 लाइव</span>
          </div>

          <div className="space-y-2.5">
            {latestFeed.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                language={language}
                onSelect={onSelectArticle}
                onBookmark={onBookmark}
                onShare={onShare}
                isBookmarked={savedArticleIds.includes(article.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
