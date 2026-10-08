import React from 'react';
import {
  TrendingUp,
  Eye,
  Video,
  Share2,
  MousePointerClick,
  Users,
  MapPin,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { NewsArticle, VideoReel, Advertisement } from '../../types';

interface AdminAnalyticsProps {
  news: NewsArticle[];
  reels: VideoReel[];
  ads: Advertisement[];
}

export const AdminAnalytics: React.FC<AdminAnalyticsProps> = ({ news, reels, ads }) => {
  const totalNewsViews = news.reduce((acc, curr) => acc + curr.viewsCount, 0);
  const totalVideoViews = reels.reduce((acc, curr) => acc + curr.viewsCount, 0);
  const totalShares = news.reduce((acc, curr) => acc + curr.sharesCount, 0);
  const totalAdClicks = ads.reduce((acc, curr) => acc + curr.clicks, 0);
  const totalWhatsAppLeads = ads.reduce((acc, curr) => acc + curr.whatsappClicks, 0);

  // Top 5 news stories
  const topNews = [...news].sort((a, b) => b.viewsCount - a.viewsCount).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#E8E8E8] shadow-2xs">
          <div className="text-xs font-bold text-[#686868]">कुल समाचार वाचक (Reads)</div>
          <div className="text-2xl font-black text-[#171717] mt-1.5">
            {totalNewsViews.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" />
            <span>+18.4% पिछले सप्ताह से</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E8E8E8] shadow-2xs">
          <div className="text-xs font-bold text-[#686868]">रील्स & वीडियो प्ले (Plays)</div>
          <div className="text-2xl font-black text-[#171717] mt-1.5">
            {totalVideoViews.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" />
            <span>+24.2% औसत वॉच टाइम: 26s</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E8E8E8] shadow-2xs">
          <div className="text-xs font-bold text-[#686868]">सोशल शेयर (WhatsApp/FB)</div>
          <div className="text-2xl font-black text-[#171717] mt-1.5">
            {totalShares.toLocaleString()}
          </div>
          <div className="text-[11px] text-blue-600 font-bold mt-1">
            सर्वाधिक शेयर: बैतूल फोरलेन प्रोजेक्ट
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E8E8E8] shadow-2xs">
          <div className="text-xs font-bold text-[#686868]">व्यापार लीड्स (WhatsApp)</div>
          <div className="text-2xl font-black text-emerald-700 mt-1.5">
            {totalWhatsAppLeads.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">
            कुल ऐड क्लिक्स: {totalAdClicks}
          </div>
        </div>
      </div>

      {/* Charts / Performance sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Performing Stories */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8E8E8] shadow-2xs">
          <h3 className="font-extrabold text-sm text-[#171717] mb-3">
            शीर्ष 5 सर्वाधिक पढ़े गए समाचार (Top News)
          </h3>
          <div className="space-y-3">
            {topNews.map((item, idx) => (
              <div key={item.id} className="flex items-center gap-3">
                <span className="w-5 font-black text-[#D71920] text-sm">{idx + 1}</span>
                <img
                  src={item.featuredImage}
                  alt=""
                  className="w-12 h-10 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-[#171717] truncate">
                    {item.headlineHi}
                  </div>
                  <div className="text-[10px] text-[#686868] mt-0.5">
                    {item.location} • {item.viewsCount.toLocaleString()} व्यूज • {item.likesCount} लाइक्स
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tehsil Readership Analytics */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8E8E8] shadow-2xs">
          <h3 className="font-extrabold text-sm text-[#171717] mb-3">
            तहसील-वार सक्रियता अनुपात (Betul Tehsils Breakdown)
          </h3>
          <div className="space-y-3">
            {[
              { label: 'बैतूल (Betul HQ)', users: '42,500 सक्रिय', share: 42, color: 'bg-[#D71920]' },
              { label: 'मुलताई (Multai)', users: '24,200 सक्रिय', share: 24, color: 'bg-amber-500' },
              { label: 'अमला (Amla)', users: '15,800 सक्रिय', share: 16, color: 'bg-emerald-600' },
              { label: 'शाहपुर (Shahpur)', users: '9,400 सक्रिय', share: 10, color: 'bg-blue-600' },
              { label: 'चिचोली & भैंसदेही', users: '7,800 सक्रिय', share: 8, color: 'bg-purple-600' },
            ].map((t) => (
              <div key={t.label}>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#171717]">{t.label}</span>
                  <span className="text-[#686868]">{t.users} ({t.share}%)</span>
                </div>
                <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div className={`h-full ${t.color} rounded-full`} style={{ width: `${t.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
