import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Flame,
  CheckCircle2,
  Trash2,
  Edit,
  Eye,
  Send,
  Calendar,
  Image as ImageIcon,
  X,
  FileText,
} from 'lucide-react';
import {
  NewsArticle,
  NewsCategory,
  BetulTehsil,
  ContentStatus,
} from '../../types';

interface AdminNewsManagerProps {
  news: NewsArticle[];
  onSaveArticle: (article: NewsArticle) => void;
  onDeleteArticle: (id: string) => void;
  onSendBroadcastNotif: (title: string, body: string, articleId: string) => void;
  editingArticle: NewsArticle | null;
  onClearEditing: () => void;
}

const CATEGORIES: NewsCategory[] = [
  'betul',
  'mp',
  'politics',
  'crime',
  'education',
  'business',
  'sports',
  'events',
];

const TEHSILS: BetulTehsil[] = [
  'Betul',
  'Multai',
  'Amla',
  'Bhainsdehi',
  'Shahpur',
  'Chicholi',
  'Athner',
  'Ghoradongri',
  'Sarni',
];

export const AdminNewsManager: React.FC<AdminNewsManagerProps> = ({
  news,
  onSaveArticle,
  onDeleteArticle,
  onSendBroadcastNotif,
  editingArticle,
  onClearEditing,
}) => {
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Form State
  const [formData, setFormData] = useState<Partial<NewsArticle>>({
    headlineHi: '',
    headlineEn: '',
    summaryHi: '',
    summaryEn: '',
    contentHi: '',
    contentEn: '',
    category: 'betul',
    location: 'Betul',
    featuredImage: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1200&q=80',
    reporter: {
      id: 'rep-1',
      name: 'संजय वर्मा (Sanjay Verma)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      designation: 'वरिष्ठ ब्यूरो प्रमुख',
      verified: true,
    },
    isBreaking: false,
    isFeatured: false,
    isLive: false,
    allowComments: true,
    sendPushNotification: true,
    status: 'published',
    tags: ['बैतूल'],
  });

  // When editingArticle changes
  React.useEffect(() => {
    if (editingArticle) {
      setFormData(editingArticle);
      setShowEditorModal(true);
    }
  }, [editingArticle]);

  const handleOpenCreate = () => {
    onClearEditing();
    setFormData({
      id: `news-${Date.now()}`,
      slug: `betul-news-${Date.now()}`,
      headlineHi: '',
      headlineEn: '',
      summaryHi: '',
      summaryEn: '',
      contentHi: '',
      contentEn: '',
      category: 'betul',
      location: 'Betul',
      featuredImage: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1200&q=80',
      reporter: {
        id: 'rep-1',
        name: 'संजय वर्मा (Sanjay Verma)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        designation: 'वरिष्ठ ब्यूरो प्रमुख',
        verified: true,
      },
      isBreaking: false,
      isFeatured: false,
      isLive: false,
      allowComments: true,
      sendPushNotification: true,
      status: 'published',
      tags: ['बैतूल', 'ताज़ा अपडेट'],
      viewsCount: 0,
      likesCount: 0,
      sharesCount: 0,
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setShowEditorModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.headlineHi || !formData.contentHi) {
      alert('कृपया हिन्दी शीर्षक और मुख्य समाचार दर्ज करें।');
      return;
    }

    const articleToSave: NewsArticle = {
      id: formData.id || `news-${Date.now()}`,
      slug: formData.slug || `betul-news-${Date.now()}`,
      headlineHi: formData.headlineHi || '',
      headlineEn: formData.headlineEn || formData.headlineHi || '',
      summaryHi: formData.summaryHi || formData.headlineHi?.slice(0, 100) || '',
      summaryEn: formData.summaryEn || formData.headlineEn?.slice(0, 100) || '',
      contentHi: formData.contentHi || '',
      contentEn: formData.contentEn || formData.contentHi || '',
      category: formData.category || 'betul',
      location: formData.location || 'Betul',
      featuredImage: formData.featuredImage || 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1200&q=80',
      reporter: formData.reporter || {
        id: 'rep-1',
        name: 'बैतूल टॉक्स डेस्क',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        designation: 'न्यूज़ डेस्क',
        verified: true,
      },
      isBreaking: !!formData.isBreaking,
      isFeatured: !!formData.isFeatured,
      isLive: !!formData.isLive,
      allowComments: formData.allowComments !== false,
      viewsCount: formData.viewsCount || 1,
      likesCount: formData.likesCount || 0,
      sharesCount: formData.sharesCount || 0,
      publishedAt: formData.publishedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: (formData.status as ContentStatus) || 'published',
      tags: formData.tags || ['बैतूल'],
    };

    onSaveArticle(articleToSave);

    // If push notification toggle was on, send notification
    if (formData.sendPushNotification) {
      onSendBroadcastNotif(
        formData.isBreaking ? '🔴 ब्रेकिंग न्यूज़ | बैतूल टॉक्स' : '⚡ ताज़ा समाचार | बैतूल टॉक्स',
        articleToSave.headlineHi,
        articleToSave.id
      );
    }

    setShowEditorModal(false);
    onClearEditing();
  };

  const filteredNews = news.filter((n) => {
    const matchesSearch =
      n.headlineHi.toLowerCase().includes(searchFilter.toLowerCase()) ||
      n.headlineEn.toLowerCase().includes(searchFilter.toLowerCase()) ||
      n.location.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCat = categoryFilter === 'all' || n.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-4">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E8E8E8]">
        <div>
          <h2 className="text-lg font-black text-[#171717]">
            समाचार प्रबंधन (News Content Management)
          </h2>
          <p className="text-xs text-[#686868]">
            हिन्दी व अंग्रेजी में समाचार प्रकाशन, ब्रेकिंग टिकर और पुश नोटिफिकेशन नियंत्रण
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-1.5 bg-[#D71920] hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>नया समाचार प्रकाशित करें</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#686868] absolute left-3 top-3" />
          <input
            type="text"
            placeholder="शीर्षक, स्थान या रिपोर्टर से खोजें..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E8E8E8] rounded-xl focus:outline-none focus:border-[#D71920]"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 text-xs bg-white border border-[#E8E8E8] rounded-xl font-medium focus:outline-none"
        >
          <option value="all">सभी श्रेणियां</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* News Table */}
      <div className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F7F7] border-b border-[#E8E8E8] text-[#686868] font-bold text-[10px] uppercase">
              <tr>
                <th className="p-3">समाचार शीर्षक & छवि</th>
                <th className="p-3">तहसील / क्षेत्र</th>
                <th className="p-3">श्रेणी</th>
                <th className="p-3">ब्रेकिंग टिकर</th>
                <th className="p-3">स्टेटस</th>
                <th className="p-3">व्यूज</th>
                <th className="p-3 text-right">कार्रवाई</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E8]">
              {filteredNews.map((article) => (
                <tr key={article.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-3 max-w-sm">
                      <img
                        src={article.featuredImage}
                        alt=""
                        className="w-14 h-11 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-[#171717] line-clamp-2">
                          {article.headlineHi}
                        </div>
                        <div className="text-[10px] text-[#686868] mt-0.5">
                          द्वारा: {article.reporter.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-3 font-semibold text-[#171717]">{article.location}</td>

                  <td className="p-3">
                    <span className="text-[10px] font-bold uppercase bg-neutral-100 text-[#171717] px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => {
                        const updated = { ...article, isBreaking: !article.isBreaking };
                        onSaveArticle(updated);
                      }}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-black transition-colors cursor-pointer ${
                        article.isBreaking
                          ? 'bg-[#D71920] text-white shadow-2xs'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {article.isBreaking ? '🔴 सक्रिय' : 'ऑफ'}
                    </button>
                  </td>

                  <td className="p-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        article.status === 'published'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {article.status}
                    </span>
                  </td>

                  <td className="p-3 font-bold text-[#171717]">
                    {article.viewsCount.toLocaleString()}
                  </td>

                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => {
                        setFormData(article);
                        setShowEditorModal(true);
                      }}
                      className="p-1.5 text-neutral-600 hover:text-[#D71920] rounded-lg transition-colors cursor-pointer"
                      title="Edit Article"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('क्या आप निश्चित हैं कि इस समाचार को हटाना है?')) {
                          onDeleteArticle(article.id);
                        }
                      }}
                      className="p-1.5 text-neutral-400 hover:text-red-700 rounded-lg transition-colors cursor-pointer"
                      title="Delete Article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full News Editor Modal */}
      {showEditorModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl w-full max-w-3xl p-5 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowEditorModal(false);
                onClearEditing();
              }}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-neutral-100 text-[#686868]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-red-100 text-[#D71920]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#171717]">
                  {formData.id ? 'समाचार संपादित करें' : 'नया समाचार तैयार करें'}
                </h3>
                <p className="text-xs text-[#686868]">
                  बैतूल टॉक्स संपादकीय प्रणाली • पूर्ण द्वैतभाषी समर्थन
                </p>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Headline Hindi & English */}
              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  मुख्य शीर्षक (Headline Hindi) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. बैतूल-नागपुर फोरलेन बाईपास निर्माण कार्य शुरू..."
                  value={formData.headlineHi || ''}
                  onChange={(e) => setFormData({ ...formData, headlineHi: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-semibold bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none focus:border-[#D71920]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  Headline English (वैकल्पिक / Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Betul-Nagpur 4-Lane Bypass Construction Accelerates..."
                  value={formData.headlineEn || ''}
                  onChange={(e) => setFormData({ ...formData, headlineEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none focus:border-[#D71920]"
                />
              </div>

              {/* Location & Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">
                    तहसील / क्षेत्र (Location) *
                  </label>
                  <select
                    value={formData.location || 'Betul'}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                  >
                    {TEHSILS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                    <option value="Madhya Pradesh">मध्य प्रदेश (MP State)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">
                    श्रेणी (Category) *
                  </label>
                  <select
                    value={formData.category || 'betul'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Summary Hindi */}
              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  संक्षिप्त विवरण (Short Summary)
                </label>
                <input
                  type="text"
                  placeholder="खबर का 1-2 पंक्तियों में सार..."
                  value={formData.summaryHi || ''}
                  onChange={(e) => setFormData({ ...formData, summaryHi: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                />
              </div>

              {/* Featured Image URL */}
              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  मुख्य फोटो लिंक (Featured Image URL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.featuredImage || ''}
                    onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                    className="flex-1 px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                  />
                  {formData.featuredImage && (
                    <img
                      src={formData.featuredImage}
                      alt="preview"
                      className="w-10 h-9 rounded-lg object-cover border"
                    />
                  )}
                </div>
              </div>

              {/* Full Article Content Hindi */}
              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  विस्तृत समाचार सामग्री (Full Article Content) *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="बैतूल। संपूर्ण समाचार विवरण यहाँ लिखें..."
                  value={formData.contentHi || ''}
                  onChange={(e) => setFormData({ ...formData, contentHi: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none focus:border-[#D71920] font-sans"
                />
              </div>

              {/* Toggles Strip */}
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#171717]">
                  <input
                    type="checkbox"
                    checked={!!formData.isBreaking}
                    onChange={(e) => setFormData({ ...formData, isBreaking: e.target.checked })}
                    className="accent-[#D71920] w-4 h-4 rounded"
                  />
                  <span>🔴 ब्रेकिंग न्यूज़</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#171717]">
                  <input
                    type="checkbox"
                    checked={!!formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="accent-[#F4B400] w-4 h-4 rounded"
                  />
                  <span>⭐ हीरो स्टोरी</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#171717]">
                  <input
                    type="checkbox"
                    checked={formData.allowComments !== false}
                    onChange={(e) => setFormData({ ...formData, allowComments: e.target.checked })}
                    className="accent-[#D71920] w-4 h-4 rounded"
                  />
                  <span>💬 कमेंट्स ऑन</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#171717]">
                  <input
                    type="checkbox"
                    checked={!!formData.sendPushNotification}
                    onChange={(e) => setFormData({ ...formData, sendPushNotification: e.target.checked })}
                    className="accent-blue-600 w-4 h-4 rounded"
                  />
                  <span>🔔 पुश अलर्ट भेजें</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8E8E8]">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditorModal(false);
                    onClearEditing();
                  }}
                  className="px-4 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors cursor-pointer"
                >
                  रद्द करें
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#D71920] hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>समाचार तुरंत प्रकाशित करें (Publish Now)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
