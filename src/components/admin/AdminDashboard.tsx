import React from 'react';
import {
  Newspaper,
  Video,
  Megaphone,
  Eye,
  TrendingUp,
  MousePointerClick,
  Building2,
  Users,
  Flame,
  ArrowUpRight,
  Plus,
} from 'lucide-react';
import {
  NewsArticle,
  VideoReel,
  Advertisement,
  BusinessListing,
  AdminRole,
} from '../../types';

interface AdminDashboardProps {
  news: NewsArticle[];
  reels: VideoReel[];
  ads: Advertisement[];
  businesses: BusinessListing[];
  onNavigate: (section: string) => void;
  onCreateNews: () => void;
  onEditNews: (article: NewsArticle) => void;
  onDeleteNews: (id: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  news,
  reels,
  ads,
  businesses,
  onNavigate,
  onCreateNews,
  onEditNews,
  onDeleteNews,
}) => {
  const totalNewsViews = news.reduce((acc, curr) => acc + curr.viewsCount, 0);
  const totalVideoViews = reels.reduce((acc, curr) => acc + curr.viewsCount, 0);
  const totalAdClicks = ads.reduce((acc, curr) => acc + curr.clicks, 0);
  const totalAdImpressions = ads.reduce((acc, curr) => acc + curr.impressions, 0);
  const averageCTR = totalAdImpressions > 0 ? ((totalAdClicks / totalAdImpressions) * 100).toFixed(2) : '0';

  const activeAds = ads.filter((a) => a.status === 'active');
  const breakingNewsCount = news.filter((n) => n.isBreaking).length;

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#171717] via-neutral-900 to-[#D71920] rounded-2xl p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#D71920] text-white text-[11px] font-black px-2.5 py-0.5 rounded tracking-wider uppercase mb-1">
            <span>LIVE CMS</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            बैतूल टॉक्स समाचार एवं विज्ञापन प्रबंधन केंद्र
          </h1>
          <p className="text-xs text-neutral-300 mt-1">
            Betul Talks Mediawork Pvt. Ltd. • संपूर्ण बैतूल जिला एवं मध्य प्रदेश संस्करण
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCreateNews}
            className="flex items-center gap-1.5 bg-[#D71920] hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>नया समाचार लिखें</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#E8E8E8] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#686868]">कुल समाचार</span>
            <div className="p-2 rounded-xl bg-red-50 text-[#D71920]">
              <Newspaper className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#171717] mt-2">{news.length}</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>{breakingNewsCount} ब्रेकिंग एक्टिव</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E8E8E8] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#686868]">वीडियो & रील्स</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Video className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#171717] mt-2">{reels.length}</div>
          <div className="flex items-center gap-1 text-[11px] text-amber-700 font-bold mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>{totalVideoViews.toLocaleString()} वीडियो व्यूज</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E8E8E8] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#686868]">सक्रिय विज्ञापन कैंपेन</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Megaphone className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#171717] mt-2">{activeAds.length}</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-1">
            <MousePointerClick className="w-3 h-3" />
            <span>{averageCTR}% औसत CTR</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E8E8E8] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#686868]">पाठक रीडरशिप (Views)</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#171717] mt-2">
            {(totalNewsViews + totalVideoViews).toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-blue-600 font-bold mt-1">
            <Users className="w-3 h-3" />
            <span>{businesses.length} सत्यापित प्रतिष्ठान</span>
          </div>
        </div>
      </div>

      {/* Analytics Preview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Tehsil Distribution */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8E8E8] shadow-2xs">
          <h3 className="font-extrabold text-sm text-[#171717] mb-3">
            बैतूल जिला तहसील-वार समाचार व रीडरशिप शेयर
          </h3>
          <div className="space-y-2.5">
            {[
              { name: 'बैतूल शहर (Betul HQ)', percent: 45, count: '64,200 पाठक' },
              { name: 'मुलताई (Multai)', percent: 22, count: '31,500 पाठक' },
              { name: 'अमला जंक्शन (Amla)', percent: 14, count: '19,800 पाठक' },
              { name: 'शाहपुर & सतपुड़ा (Shahpur)', percent: 11, count: '15,200 पाठक' },
              { name: 'अन्य (चिचोली/भैंसदेही/सारणी)', percent: 8, count: '11,400 पाठक' },
            ].map((t) => (
              <div key={t.name}>
                <div className="flex items-center justify-between text-xs mb-1 font-semibold">
                  <span className="text-[#171717]">{t.name}</span>
                  <span className="text-[#686868]">{t.count} ({t.percent}%)</span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#D71920] rounded-full"
                    style={{ width: `${t.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ad Campaign Performance */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8E8E8] shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold text-sm text-[#171717]">
              विज्ञापन प्रदर्शन एवं लीड्स मेट्रिक्स
            </h3>
            <button
              onClick={() => onNavigate('ads')}
              className="text-xs font-bold text-[#D71920] hover:underline"
            >
              सभी कैंपेन देखें
            </button>
          </div>

          <div className="space-y-3">
            {ads.slice(0, 3).map((ad) => (
              <div key={ad.id} className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="flex items-center justify-between text-xs font-bold text-[#171717]">
                  <span className="truncate max-w-[200px]">{ad.businessName}</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {ad.status.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-neutral-200/60 text-center">
                  <div>
                    <div className="text-[10px] text-[#686868]">इम्प्रेशन्स</div>
                    <div className="text-xs font-black text-[#171717]">{ad.impressions.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#686868]">क्लिक्स</div>
                    <div className="text-xs font-black text-[#171717]">{ad.clicks.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#686868]">व्हाट्सएप लीड्स</div>
                    <div className="text-xs font-black text-emerald-600">{ad.whatsappClicks}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent News Table with Quick Actions */}
      <div className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-[#E8E8E8] flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-base text-[#171717]">
              ताज़ा प्रकाशित समाचार सूची ({news.length})
            </h2>
            <p className="text-xs text-[#686868]">एडिट, ब्रेकिंग टॉगल एवं लाइव स्टेटस प्रबंधन</p>
          </div>

          <button
            onClick={() => onNavigate('news')}
            className="text-xs font-bold text-[#D71920] hover:underline"
          >
            पूर्ण समाचार प्रबंधक खोलें
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F7F7] border-b border-[#E8E8E8] text-[#686868] uppercase font-bold text-[10px]">
              <tr>
                <th className="p-3">थंबनेल & शीर्षक</th>
                <th className="p-3">तहसील / श्रेणी</th>
                <th className="p-3">स्थिति</th>
                <th className="p-3">रिपोर्टर</th>
                <th className="p-3">व्यूज</th>
                <th className="p-3 text-right">कार्रवाई</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E8]">
              {news.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-2.5 max-w-md">
                      <img
                        src={item.featuredImage}
                        alt=""
                        className="w-12 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-[#171717] truncate">
                          {item.headlineHi}
                        </div>
                        {item.isBreaking && (
                          <span className="inline-block mt-0.5 text-[9px] font-black bg-[#D71920] text-white px-1.5 rounded uppercase">
                            🔴 ब्रेकिंग न्यूज़
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="p-3">
                    <div className="font-semibold text-[#171717]">{item.location}</div>
                    <div className="text-[10px] text-[#686868] uppercase">{item.category}</div>
                  </td>

                  <td className="p-3">
                    <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px]">
                      {item.status}
                    </span>
                  </td>

                  <td className="p-3 font-medium text-[#171717]">
                    {item.reporter.name}
                  </td>

                  <td className="p-3 font-bold text-[#171717]">
                    {item.viewsCount.toLocaleString()}
                  </td>

                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => onEditNews(item)}
                      className="px-2.5 py-1 text-xs font-bold text-[#D71920] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      एडिट
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`क्या आप इस समाचार को हटाना चाहते हैं: ${item.headlineHi}?`)) {
                          onDeleteNews(item.id);
                        }
                      }}
                      className="px-2.5 py-1 text-xs font-bold text-neutral-500 hover:text-red-700 rounded-lg transition-colors cursor-pointer"
                    >
                      डिलीट
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
