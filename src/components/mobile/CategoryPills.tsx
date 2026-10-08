import React from 'react';
import { NewsCategory, Language } from '../../types';

interface CategoryPillsProps {
  activeCategory: NewsCategory | 'all';
  onCategorySelect: (category: NewsCategory | 'all') => void;
  language: Language;
}

const CATEGORIES: { id: NewsCategory | 'all'; labelHi: string; labelEn: string }[] = [
  { id: 'all', labelHi: 'सभी (All)', labelEn: 'All' },
  { id: 'for_you', labelHi: 'आपके लिए', labelEn: 'For You' },
  { id: 'betul', labelHi: 'बैतूल जिला', labelEn: 'Betul' },
  { id: 'mp', labelHi: 'मध्य प्रदेश', labelEn: 'MP State' },
  { id: 'politics', labelHi: 'राजनीति', labelEn: 'Politics' },
  { id: 'crime', labelHi: 'क्राइम / पुलिस', labelEn: 'Crime' },
  { id: 'education', labelHi: 'शिक्षा व जॉब्स', labelEn: 'Education' },
  { id: 'business', labelHi: 'मंडी व व्यापार', labelEn: 'Business' },
  { id: 'sports', labelHi: 'खेल जगत', labelEn: 'Sports' },
  { id: 'events', labelHi: 'कार्यक्रम / मेले', labelEn: 'Events' },
];

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  activeCategory,
  onCategorySelect,
  language,
}) => {
  return (
    <div className="bg-white border-b border-[#E8E8E8] sticky top-[98px] z-30 shadow-xs">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar px-3 py-2.5 max-w-7xl mx-auto">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const label = language === 'hi' ? cat.labelHi : cat.labelEn;

          return (
            <button
              key={cat.id}
              onClick={() => onCategorySelect(cat.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all select-none ${
                isActive
                  ? 'bg-[#D71920] text-white shadow-xs scale-102 font-bold'
                  : 'bg-[#F7F7F7] text-[#171717] hover:bg-neutral-200 border border-neutral-200/60'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
