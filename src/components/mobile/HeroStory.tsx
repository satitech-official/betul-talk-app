import React from 'react';
import { Clock, Eye, Share2, Bookmark, CheckCircle2 } from 'lucide-react';
import { NewsArticle, Language } from '../../types';

interface HeroStoryProps {
  article: NewsArticle;
  language: Language;
  onSelect: (article: NewsArticle) => void;
  onBookmark: (article: NewsArticle, e: React.MouseEvent) => void;
  onShare: (article: NewsArticle, e: React.MouseEvent) => void;
  isBookmarked: boolean;
}

export const HeroStory: React.FC<HeroStoryProps> = ({
  article,
  language,
  onSelect,
  onBookmark,
  onShare,
  isBookmarked,
}) => {
  const headline = language === 'hi' ? article.headlineHi : article.headlineEn;
  const summary = language === 'hi' ? article.summaryHi : article.summaryEn;

  return (
    <article
      onClick={() => onSelect(article)}
      className="relative bg-white rounded-2xl overflow-hidden border border-[#E8E8E8] shadow-sm hover:shadow-md transition-all cursor-pointer group m-3"
    >
      {/* Featured Media Aspect Ratio 16:9 */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
        <img
          src={article.featuredImage}
          alt={headline}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
          loading="eager"
        />

        {/* Gradient Overlay for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* Badges on top */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {article.isBreaking && (
            <span className="bg-[#D71920] text-white text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-md tracking-wider uppercase flex items-center gap-1 shadow-md animate-pulse">
              <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></span>
              {language === 'hi' ? 'ब्रेकिंग' : 'BREAKING'}
            </span>
          )}
          {article.isLive && (
            <span className="bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
              LIVE
            </span>
          )}
          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-md">
            {article.location}
          </span>
        </div>

        {/* Category Badge on Bottom Right of Image */}
        <div className="absolute bottom-3 right-3">
          <span className="bg-[#F4B400] text-black text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
            {article.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#171717] leading-snug group-hover:text-[#D71920] transition-colors line-clamp-2">
          {headline}
        </h2>

        <p className="text-xs sm:text-sm text-[#686868] mt-2 line-clamp-2 leading-relaxed">
          {summary}
        </p>

        {/* Meta & Quick Actions footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100 text-xs text-[#686868]">
          <div className="flex items-center gap-2">
            <img
              src={article.reporter.avatar}
              alt={article.reporter.name}
              className="w-5 h-5 rounded-full object-cover border border-neutral-200"
            />
            <span className="font-medium text-[#171717] truncate max-w-[120px] flex items-center gap-1">
              {article.reporter.name}
              {article.reporter.verified && (
                <CheckCircle2 className="w-3 h-3 text-blue-500 shrink-0" />
              )}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {language === 'hi' ? 'ताज़ा अपडेट' : 'Just now'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px] font-medium text-neutral-500">
              <Eye className="w-3.5 h-3.5" />
              {article.viewsCount.toLocaleString()}
            </span>
            <button
              onClick={(e) => onBookmark(article, e)}
              className={`p-1.5 rounded-full hover:bg-neutral-100 transition-colors ${
                isBookmarked ? 'text-[#D71920]' : 'text-neutral-500'
              }`}
              title="Save Story"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={(e) => onShare(article, e)}
              className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-green-600 transition-colors"
              title="Share on WhatsApp"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
