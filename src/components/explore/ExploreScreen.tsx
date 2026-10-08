import React, { useState } from 'react';
import {
  Search,
  Compass,
  Calendar,
  Briefcase,
  GraduationCap,
  Scale,
  ShieldAlert,
  Trophy,
  Landmark,
  Building2,
  Wheat,
  Film,
  HeartPulse,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  X,
  History,
  TrendingUp,
} from 'lucide-react';
import {
  NewsArticle,
  VideoReel,
  BusinessListing,
  EventItem,
  Language,
} from '../../types';

interface ExploreScreenProps {
  news: NewsArticle[];
  reels: VideoReel[];
  businesses: BusinessListing[];
  events: EventItem[];
  language: Language;
  onSelectArticle: (article: NewsArticle) => void;
  onSelectReel: (reel: VideoReel) => void;
  onSelectCategory: (cat: string) => void;
}

const CATEGORY_TILES = [
  { id: 'betul', labelHi: 'बैतूल हलचल', labelEn: 'Betul City', icon: MapPin, color: 'bg-red-50 text-[#D71920]' },
  { id: 'politics', labelHi: 'राजनीति', labelEn: 'Politics', icon: Scale, color: 'bg-blue-50 text-blue-700' },
  { id: 'crime', labelHi: 'क्राइम डायरी', labelEn: 'Crime & Police', icon: ShieldAlert, color: 'bg-rose-50 text-rose-700' },
  { id: 'education', labelHi: 'शिक्षा व करियर', labelEn: 'Education & Jobs', icon: GraduationCap, color: 'bg-indigo-50 text-indigo-700' },
  { id: 'health', labelHi: 'स्वास्थ्य / हॉस्पिटल', labelEn: 'Health & Medical', icon: HeartPulse, color: 'bg-emerald-50 text-emerald-700' },
  { id: 'business', labelHi: 'मंडी व व्यापार', labelEn: 'Mandi & Business', icon: Briefcase, color: 'bg-amber-50 text-amber-700' },
  { id: 'agriculture', labelHi: 'किसान व कृषि', labelEn: 'Agriculture', icon: Wheat, color: 'bg-green-50 text-green-700' },
  { id: 'realestate', labelHi: 'रियल एस्टेट', labelEn: 'Real Estate', icon: Building2, color: 'bg-teal-50 text-teal-700' },
  { id: 'sports', labelHi: 'खेल जगत', labelEn: 'Sports', icon: Trophy, color: 'bg-orange-50 text-orange-700' },
  { id: 'events', labelHi: 'मेले व उत्सव', labelEn: 'Events & Fairs', icon: Calendar, color: 'bg-purple-50 text-purple-700' },
  { id: 'religious', labelHi: 'धर्म व दर्शन', labelEn: 'Religious', icon: Sparkles, color: 'bg-yellow-50 text-yellow-800' },
  { id: 'entertainment', labelHi: 'सिनेमा / मनोरंजन', labelEn: 'Entertainment', icon: Film, color: 'bg-pink-50 text-pink-700' },
];

const POPULAR_SEARCHES = [
  'मुलताई ताप्ती सरोवर',
  'फोरलेन बाईपास बैतूल',
  'सोयाबीन भाव बडोरा मंडी',
  'साइबर सेल बैतूल',
  'अमला जंक्शन',
  'खेड़ापति मोटर्स',
  'दशहरा मैदान मेला',
];

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  news,
  reels,
  businesses,
  events,
  language,
  onSelectArticle,
  onSelectReel,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'बैतूल बाईपास',
    'मंडी भाव',
  ]);

  const handleSearchSubmit = (searchTerm: string) => {
    setQuery(searchTerm);
    if (searchTerm && !recentSearches.includes(searchTerm)) {
      setRecentSearches([searchTerm, ...recentSearches.slice(0, 4)]);
    }
  };

  const clearHistory = () => {
    setRecentSearches([]);
  };

  // Search Results
  const filteredNews = query
    ? news.filter(
        (n) =>
          n.headlineHi.toLowerCase().includes(query.toLowerCase()) ||
          n.headlineEn.toLowerCase().includes(query.toLowerCase()) ||
          n.contentHi.toLowerCase().includes(query.toLowerCase()) ||
          n.location.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredReels = query
    ? reels.filter(
        (r) =>
          r.titleHi.toLowerCase().includes(query.toLowerCase()) ||
          r.titleEn.toLowerCase().includes(query.toLowerCase()) ||
          r.location.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredBusinesses = query
    ? businesses.filter(
        (b) =>
          b.name.toLowerCase().includes(query.toLowerCase()) ||
          b.description.toLowerCase().includes(query.toLowerCase()) ||
          b.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredEvents = query
    ? events.filter(
        (e) =>
          e.titleHi.toLowerCase().includes(query.toLowerCase()) ||
          e.venue.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const hasResults =
    filteredNews.length > 0 ||
    filteredReels.length > 0 ||
    filteredBusinesses.length > 0 ||
    filteredEvents.length > 0;

  return (
    <div className="pb-24 bg-[#F7F7F7] min-h-screen">
      {/* Top Search Bar */}
      <div className="bg-white p-3 sm:p-4 border-b border-[#E8E8E8] sticky top-[57px] z-30 shadow-xs">
        <div className="max-w-2xl mx-auto relative">
          <Search className="w-4 h-4 text-[#686868] absolute left-3 top-3" />
          <input
            type="text"
            placeholder={
              language === 'hi'
                ? 'ख़बरें, वीडियो रील्स, व्यापार, मेले खोजें...'
                : 'Search news, videos, businesses, events...'
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none focus:border-[#D71920]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-2.5 text-[#686868] hover:text-[#171717]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4">
        {/* If user is actively searching */}
        {query ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-extrabold text-[#171717]">
                "{query}" के लिए परिणाम
              </h2>
              <button
                onClick={() => setQuery('')}
                className="text-xs text-[#D71920] font-bold"
              >
                खोज साफ़ करें
              </button>
            </div>

            {!hasResults ? (
              <div className="bg-white p-8 rounded-2xl text-center border border-[#E8E8E8]">
                <p className="text-sm font-semibold text-[#686868]">
                  कोई परिणाम नहीं मिला। कृपया अन्य शब्द लिखकर खोजें।
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* News matches */}
                {filteredNews.length > 0 && (
                  <section>
                    <h3 className="text-xs font-black uppercase text-[#D71920] mb-2 tracking-wider">
                      समाचार ({filteredNews.length})
                    </h3>
                    <div className="space-y-2">
                      {filteredNews.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => onSelectArticle(n)}
                          className="bg-white p-3 rounded-xl border border-[#E8E8E8] flex gap-3 cursor-pointer hover:shadow-xs"
                        >
                          <img
                            src={n.featuredImage}
                            alt={n.headlineHi}
                            className="w-20 h-16 rounded-lg object-cover shrink-0"
                          />
                          <div>
                            <span className="text-[10px] font-bold text-[#D71920]">
                              {n.location} • {n.category}
                            </span>
                            <h4 className="text-xs font-bold text-[#171717] line-clamp-2 mt-0.5">
                              {language === 'hi' ? n.headlineHi : n.headlineEn}
                            </h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Video matches */}
                {filteredReels.length > 0 && (
                  <section>
                    <h3 className="text-xs font-black uppercase text-amber-700 mb-2 tracking-wider">
                      वीडियो रील्स ({filteredReels.length})
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {filteredReels.map((r) => (
                        <div
                          key={r.id}
                          onClick={() => onSelectReel(r)}
                          className="bg-white p-2 rounded-xl border border-[#E8E8E8] flex gap-2 cursor-pointer"
                        >
                          <img
                            src={r.thumbnailUrl}
                            alt={r.titleHi}
                            className="w-14 h-18 rounded-lg object-cover shrink-0"
                          />
                          <div className="text-xs font-bold text-[#171717] line-clamp-3">
                            {language === 'hi' ? r.titleHi : r.titleEn}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Business matches */}
                {filteredBusinesses.length > 0 && (
                  <section>
                    <h3 className="text-xs font-black uppercase text-emerald-700 mb-2 tracking-wider">
                      स्थानीय व्यापार ({filteredBusinesses.length})
                    </h3>
                    <div className="space-y-2">
                      {filteredBusinesses.map((b) => (
                        <div
                          key={b.id}
                          className="bg-white p-3 rounded-xl border border-[#E8E8E8] flex items-center justify-between"
                        >
                          <div>
                            <div className="text-xs font-bold text-[#171717]">{b.name}</div>
                            <div className="text-[11px] text-[#686868]">{b.category} • {b.address}</div>
                          </div>
                          <a
                            href={`tel:${b.phone}`}
                            className="text-xs font-bold text-[#D71920] bg-red-50 px-2.5 py-1 rounded-lg"
                          >
                            कॉल
                          </a>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Default Explore View: Recent Searches, Popular Searches, Grid Categories, and Events */
          <div className="space-y-6">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#686868]">
                    <History className="w-3.5 h-3.5" />
                    <span>हाल की खोजें (Recent Searches)</span>
                  </div>
                  <button
                    onClick={clearHistory}
                    className="text-[11px] text-red-600 hover:underline"
                  >
                    साफ़ करें
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {recentSearches.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSearchSubmit(s)}
                      className="px-2.5 py-1 bg-white hover:bg-neutral-100 border border-[#E8E8E8] rounded-full text-xs text-[#171717]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#171717] mb-2">
                <TrendingUp className="w-3.5 h-3.5 text-[#D71920]" />
                <span>बैतूल में लोकप्रिय सर्च (Trending Topics)</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_SEARCHES.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleSearchSubmit(topic)}
                    className="px-2.5 py-1 bg-neutral-200/60 hover:bg-neutral-200 text-[#171717] rounded-full text-xs font-medium transition-colors"
                  >
                    #{topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Browse Categories Grid */}
            <section>
              <h2 className="text-sm font-extrabold text-[#171717] mb-3">
                {language === 'hi' ? 'विषय एवं श्रेणियां' : 'Categories Directory'}
              </h2>

              <div className="grid grid-cols-2 gap-2.5">
                {CATEGORY_TILES.map((cat) => {
                  const Icon = cat.icon;
                  const label = language === 'hi' ? cat.labelHi : cat.labelEn;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => onSelectCategory(cat.id)}
                      className="bg-white p-3 rounded-2xl border border-[#E8E8E8] hover:border-[#D71920] hover:shadow-xs transition-all flex items-center gap-2.5 text-left group cursor-pointer"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cat.color}`}
                      >
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-[#171717] group-hover:text-[#D71920] transition-colors leading-tight">
                          {label}
                        </div>
                        <div className="text-[10px] text-[#686868] mt-0.5">देखें</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Upcoming Betul Events Directory */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#D71920]" />
                  <h2 className="text-sm font-extrabold text-[#171717]">
                    आगामी बैतूल कार्यक्रम एवं मेले (District Events)
                  </h2>
                </div>
                <span className="text-[11px] text-[#686868]">{events.length} सक्रिय</span>
              </div>

              <div className="space-y-3">
                {events.map((evt) => (
                  <div
                    key={evt.id}
                    className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden p-3 sm:p-4 hover:shadow-xs transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row gap-3">
                      <img
                        src={evt.imageUrl}
                        alt={evt.titleHi}
                        className="w-full sm:w-36 h-24 object-cover rounded-xl shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-white bg-[#D71920] px-2 py-0.5 rounded">
                            {evt.date}
                          </span>
                          <span className="text-[10px] text-neutral-500 font-semibold">
                            {evt.time}
                          </span>
                        </div>

                        <h3 className="font-extrabold text-sm text-[#171717]">
                          {language === 'hi' ? evt.titleHi : evt.titleEn}
                        </h3>

                        <div className="flex items-center gap-1.5 text-xs text-[#686868] mt-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#D71920] shrink-0" />
                          <span>{evt.venue}</span>
                        </div>

                        <div className="text-[11px] text-[#686868] mt-1">
                          आयोजक: {evt.organizer} • फ़ोन: {evt.contactPhone}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
