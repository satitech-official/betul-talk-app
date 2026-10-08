import React from 'react';
import { Flame, ChevronRight } from 'lucide-react';
import { NewsArticle } from '../../types';

interface BreakingTickerProps {
  breakingArticles: NewsArticle[];
  language: 'hi' | 'en';
  onArticleClick: (article: NewsArticle) => void;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({
  breakingArticles,
  language,
  onArticleClick,
}) => {
  if (!breakingArticles || breakingArticles.length === 0) return null;

  return (
    <div className="bg-[#D71920] text-white flex items-center h-10 px-2 sm:px-3 overflow-hidden select-none border-b border-red-700 shadow-inner">
      {/* Red/Yellow Pulsing Badge */}
      <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded text-xs font-black tracking-wider uppercase shrink-0 text-[#F4B400] z-10 shadow-sm border border-yellow-400/30">
        <Flame className="w-3.5 h-3.5 text-[#F4B400] animate-pulse" />
        <span>{language === 'hi' ? 'ब्रेकिंग न्यूज़' : 'BREAKING'}</span>
      </div>

      {/* Marquee Content */}
      <div className="overflow-hidden whitespace-nowrap flex-1 ml-3 relative flex items-center">
        <div className="animate-ticker flex items-center gap-10 cursor-pointer">
          {breakingArticles.concat(breakingArticles).map((article, idx) => {
            const headline = language === 'hi' ? article.headlineHi : article.headlineEn;
            return (
              <button
                key={`${article.id}-${idx}`}
                onClick={() => onArticleClick(article)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold hover:text-[#F4B400] transition-colors text-white text-left focus:outline-none"
              >
                <span className="bg-yellow-400/20 text-yellow-300 text-[10px] px-1.5 py-0.5 rounded font-bold">
                  {article.location}
                </span>
                <span>{headline}</span>
                <span className="text-yellow-400 font-bold ml-3">◆</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick click on latest */}
      <button
        onClick={() => onArticleClick(breakingArticles[0])}
        title="View latest breaking story"
        className="shrink-0 ml-2 hidden sm:flex items-center text-[11px] font-bold text-yellow-300 hover:text-white transition-colors gap-0.5 bg-black/20 px-2 py-0.5 rounded"
      >
        <span>{language === 'hi' ? 'पढ़ें' : 'Read'}</span>
        <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
};
