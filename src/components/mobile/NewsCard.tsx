import React from 'react';
import { Clock, Eye, Share2, Bookmark } from 'lucide-react';
import { NewsArticle, Language } from '../../types';

interface NewsCardProps {
  article: NewsArticle;
  language: Language;
  onSelect: (article: NewsArticle) => void;
  onBookmark: (article: NewsArticle, e: React.MouseEvent) => void;
  onShare: (article: NewsArticle, e: React.MouseEvent) => void;
  isBookmarked: boolean;
  layout?: 'horizontal' | 'compact';
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  language,
  onSelect,
  onBookmark,
  onShare,
  isBookmarked,
  layout = 'horizontal',
}) => {
  const headline = language === 'hi' ? article.headlineHi : article.headlineEn;

  return (
    <article
      onClick={() => onSelect(article)}
      className="bg-white rounded-xl border border-[#E8E8E8] p-3 sm:p-3.5 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
    >
      <div className="flex gap-3">
        {/* Content details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-[10px] font-bold text-[#D71920] uppercase bg-red-50 px-1.5 py-0.5 rounded">
              {article.location}
            </span>
            <span className="text-[10px] font-semibold text-[#686868] uppercase">
              • {article.category}
            </span>
          </div>

          <h3 className="text-xs sm:text-sm font-bold text-[#171717] leading-snug group-hover:text-[#D71920] transition-colors line-clamp-2 sm:line-clamp-3">
            {headline}
          </h3>
        </div>

        {/* Thumbnail Image */}
        <div className="w-24 h-20 sm:w-28 sm:h-22 rounded-lg overflow-hidden shrink-0 bg-neutral-100 relative">
          <img
            src={article.featuredImage}
            alt={headline}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {article.isBreaking && (
            <span className="absolute top-1 left-1 bg-[#D71920] text-white text-[8px] font-black px-1 rounded uppercase">
              Alert
            </span>
          )}
        </div>
      </div>

      {/* Meta Bar */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-100 text-[11px] text-[#686868]">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#686868]" />
            <span>2h ago</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3 text-[#686868]" />
            <span>{article.viewsCount.toLocaleString()}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => onBookmark(article, e)}
            className={`p-1 rounded hover:bg-neutral-100 transition-colors ${
              isBookmarked ? 'text-[#D71920]' : 'text-neutral-400'
            }`}
            title="Bookmark"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => onShare(article, e)}
            className="p-1 rounded hover:bg-neutral-100 text-neutral-400 hover:text-green-600 transition-colors"
            title="Share"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
