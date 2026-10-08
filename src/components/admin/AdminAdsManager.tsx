import React, { useState } from 'react';
import {
  Plus,
  Megaphone,
  Trash2,
  Edit,
  Phone,
  MessageCircle,
  Eye,
  MousePointerClick,
  Sparkles,
  TrendingUp,
  X,
  CheckCircle2,
} from 'lucide-react';
import { Advertisement, AdPlacement, CampaignStatus, AdEnquiry } from '../../types';

interface AdminAdsManagerProps {
  ads: Advertisement[];
  enquiries: AdEnquiry[];
  onSaveAd: (ad: Advertisement) => void;
  onDeleteAd: (id: string) => void;
  onUpdateEnquiryStatus: (id: string, status: any) => void;
}

export const AdminAdsManager: React.FC<AdminAdsManagerProps> = ({
  ads,
  enquiries,
  onSaveAd,
  onDeleteAd,
  onUpdateEnquiryStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'enquiries'>('campaigns');
  const [showModal, setShowModal] = useState(false);
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Advertisement>>({
    title: '',
    businessName: '',
    category: 'Automobile',
    placement: 'home_hero_banner',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    phone: '+919425001122',
    whatsapp: '919425001122',
    address: 'बैतूल (म.प्र.)',
    discountOffer: 'विशेष 15% छूट',
    ctaText: 'कॉल करें',
    startDate: '2026-10-01',
    endDate: '2026-11-30',
    status: 'active',
    budgetInr: 15000,
  });

  const handleOpenCreate = () => {
    setEditingAd(null);
    setFormData({
      id: `ad-${Date.now()}`,
      title: '',
      businessName: '',
      category: 'Restaurants',
      placement: 'home_hero_banner',
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      phone: '+919425012345',
      whatsapp: '919425012345',
      address: 'कोठी बाज़ार, बैतूल',
      discountOffer: 'त्योहारी स्पेशल ऑफर!',
      ctaText: 'ऑफर प्राप्त करें',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-12-31',
      status: 'active',
      budgetInr: 10000,
      impressions: 0,
      clicks: 0,
      whatsappClicks: 0,
      phoneClicks: 0,
      directionsClicks: 0,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.businessName) {
      alert('कृपया विज्ञापन का शीर्षक एवं व्यापार का नाम दर्ज करें।');
      return;
    }

    const adToSave: Advertisement = {
      id: formData.id || `ad-${Date.now()}`,
      title: formData.title || '',
      businessName: formData.businessName || '',
      category: formData.category || 'Retail',
      placement: (formData.placement as AdPlacement) || 'home_hero_banner',
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      phone: formData.phone || '+919425001122',
      whatsapp: formData.whatsapp || '919425001122',
      address: formData.address || 'बैतूल',
      discountOffer: formData.discountOffer || '',
      ctaText: formData.ctaText || 'संपर्क करें',
      startDate: formData.startDate || '2026-10-01',
      endDate: formData.endDate || '2026-11-30',
      status: (formData.status as CampaignStatus) || 'active',
      impressions: formData.impressions || 120,
      clicks: formData.clicks || 15,
      whatsappClicks: formData.whatsappClicks || 8,
      phoneClicks: formData.phoneClicks || 4,
      directionsClicks: formData.directionsClicks || 2,
      budgetInr: Number(formData.budgetInr) || 10000,
    };

    onSaveAd(adToSave);
    setShowModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E8E8E8]">
        <div>
          <h2 className="text-lg font-black text-[#171717]">
            विज्ञापन एवं व्यापार अभियान केंद्र (Ads Management)
          </h2>
          <p className="text-xs text-[#686868]">
            लोकल बिज़नेस प्रमोशन्स, बैनर स्लॉट्स, व्हाट्सएप लीड्स और बजट नियंत्रण
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 bg-[#D71920] hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>नया विज्ञापन बनाएं</span>
          </button>
        </div>
      </div>

      {/* Tabs for Campaigns vs Enquiries */}
      <div className="flex bg-white p-1 rounded-xl border border-[#E8E8E8] shadow-2xs max-w-sm">
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'campaigns'
              ? 'bg-[#D71920] text-white'
              : 'text-[#686868] hover:text-[#171717]'
          }`}
        >
          सक्रिय विज्ञापन ({ads.length})
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors relative ${
            activeTab === 'enquiries'
              ? 'bg-[#D71920] text-white'
              : 'text-[#686868] hover:text-[#171717]'
          }`}
        >
          ग्राहक इंक्वायरीज़ ({enquiries.length})
          {enquiries.filter((e) => e.status === 'new').length > 0 && (
            <span className="ml-1.5 bg-[#F4B400] text-black text-[9px] px-1.5 py-0.2 rounded-full font-black">
              NEW
            </span>
          )}
        </button>
      </div>

      {activeTab === 'campaigns' ? (
        /* Campaigns Table */
        <div className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F7F7] border-b border-[#E8E8E8] text-[#686868] font-bold text-[10px] uppercase">
                <tr>
                  <th className="p-3">विज्ञापन & प्रतिष्ठान</th>
                  <th className="p-3">स्थान निर्धारण (Placement)</th>
                  <th className="p-3">स्थिति</th>
                  <th className="p-3">बजट</th>
                  <th className="p-3">इम्प्रेशन्स</th>
                  <th className="p-3">क्लिक्स & लीड्स</th>
                  <th className="p-3">CTR</th>
                  <th className="p-3 text-right">कार्रवाई</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E8]">
                {ads.map((ad) => {
                  const ctr =
                    ad.impressions > 0
                      ? ((ad.clicks / ad.impressions) * 100).toFixed(2)
                      : '0';

                  return (
                    <tr key={ad.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-3 max-w-sm">
                          <img
                            src={ad.imageUrl}
                            alt=""
                            className="w-14 h-10 rounded-lg object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-[#171717] truncate">
                              {ad.businessName}
                            </div>
                            <div className="text-[11px] text-[#686868] truncate">
                              {ad.title}
                            </div>
                            {ad.discountOffer && (
                              <span className="text-[10px] text-amber-700 font-bold">
                                ⚡ {ad.discountOffer}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="p-3">
                        <span className="text-[10px] font-bold bg-neutral-100 px-2 py-0.5 rounded text-neutral-800 uppercase">
                          {ad.placement}
                        </span>
                      </td>

                      <td className="p-3">
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                            ad.status === 'active'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          {ad.status}
                        </span>
                      </td>

                      <td className="p-3 font-bold text-[#171717]">
                        ₹{ad.budgetInr.toLocaleString()}
                      </td>

                      <td className="p-3 font-semibold text-[#171717]">
                        {ad.impressions.toLocaleString()}
                      </td>

                      <td className="p-3">
                        <div className="font-bold text-[#171717]">{ad.clicks} कुल</div>
                        <div className="text-[10px] text-emerald-700">
                          {ad.whatsappClicks} WhatsApp | {ad.phoneClicks} कॉल
                        </div>
                      </td>

                      <td className="p-3 font-bold text-blue-600">{ctr}%</td>

                      <td className="p-3 text-right space-x-1">
                        <button
                          onClick={() => {
                            setEditingAd(ad);
                            setFormData(ad);
                            setShowModal(true);
                          }}
                          className="p-1.5 text-neutral-600 hover:text-[#D71920] rounded-lg cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('क्या आप इस विज्ञापन अभियान को हटाना चाहते हैं?')) {
                              onDeleteAd(ad.id);
                            }
                          }}
                          className="p-1.5 text-neutral-400 hover:text-red-700 rounded-lg cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Enquiries Table */
        <div className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F7F7] border-b border-[#E8E8E8] text-[#686868] font-bold text-[10px] uppercase">
                <tr>
                  <th className="p-3">व्यापार का नाम</th>
                  <th className="p-3">संपर्क व्यक्ति & फोन</th>
                  <th className="p-3">विज्ञापन प्रकार</th>
                  <th className="p-3">बजट रेंज</th>
                  <th className="p-3">संदेश / विवरण</th>
                  <th className="p-3">स्थिति</th>
                  <th className="p-3 text-right">कार्रवाई</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E8]">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="p-3 font-bold text-[#171717]">{enq.businessName}</td>
                    <td className="p-3">
                      <div className="font-semibold text-[#171717]">{enq.contactPerson}</div>
                      <div className="text-[11px] text-[#686868]">{enq.phone}</div>
                    </td>
                    <td className="p-3 text-[11px] text-neutral-800">{enq.adType}</td>
                    <td className="p-3 font-bold text-amber-700">{enq.budgetRange}</td>
                    <td className="p-3 text-[11px] text-[#686868] max-w-xs">{enq.message}</td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          enq.status === 'new'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}
                      >
                        {enq.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1">
                      <a
                        href={`https://wa.me/${enq.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-2.5 py-1 text-[11px] font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                      >
                        WhatsApp
                      </a>
                      <button
                        onClick={() =>
                          onUpdateEnquiryStatus(
                            enq.id,
                            enq.status === 'new' ? 'contacted' : 'approved'
                          )
                        }
                        className="px-2 py-1 text-[11px] font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg cursor-pointer"
                      >
                        स्थिति बदलें
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Ad Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl w-full max-w-lg p-5 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-neutral-100 text-[#686868]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-red-100 text-[#D71920]">
                <Megaphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#171717]">
                  {editingAd ? 'विज्ञापन संपादित करें' : 'नया विज्ञापन अभियान बनाएं'}
                </h3>
                <p className="text-xs text-[#686868]">बैतूल टॉक्स एडवरटाइजिंग पोर्टल</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  व्यापार / ब्रांड का नाम *
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. खेड़ापति मोटर्स / होटल बैतूल प्राइड"
                  value={formData.businessName || ''}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none focus:border-[#D71920]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  विज्ञापन का मुख्य शीर्षक *
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. नवरात्रि स्पेशल ऑफर! कार बुकिंग पर ₹45,000 की छूट..."
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none focus:border-[#D71920]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">
                    प्लेसमेंट (Placement Slot)
                  </label>
                  <select
                    value={formData.placement || 'home_hero_banner'}
                    onChange={(e) => setFormData({ ...formData, placement: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                  >
                    <option value="home_hero_banner">होम स्क्रीन मुख्य बैनर</option>
                    <option value="feed_native">न्यूज़ फीड इन-लाइन कार्ड</option>
                    <option value="article_inline">आर्टिकल के अंदर विज्ञापन</option>
                    <option value="marketplace_featured">लोकल बाज़ार फीचर्ड</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">
                    श्रेणी (Category)
                  </label>
                  <input
                    type="text"
                    value={formData.category || 'Automobile'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  विज्ञापन मीडिया इमेज URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.imageUrl || ''}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">
                    व्हाट्सएप नंबर (बिना + के) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="919425001122"
                    value={formData.whatsapp || ''}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">
                    कॉल फोन नंबर *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 94250..."
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  ऑफर / छूट टैग (Discount Highlight)
                </label>
                <input
                  type="text"
                  placeholder="उदा. फ्लैट ₹45,000 की छूट"
                  value={formData.discountOffer || ''}
                  onChange={(e) => setFormData({ ...formData, discountOffer: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">
                    मासिक बजट (INR)
                  </label>
                  <input
                    type="number"
                    value={formData.budgetInr || 10000}
                    onChange={(e) => setFormData({ ...formData, budgetInr: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">
                    अभियान स्थिति (Campaign Status)
                  </label>
                  <select
                    value={formData.status || 'active'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                  >
                    <option value="active">सक्रिय (Active)</option>
                    <option value="paused">रोका गया (Paused)</option>
                    <option value="draft">ड्राफ्ट (Draft)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-[#E8E8E8]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3.5 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-100 rounded-xl cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D71920] hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                >
                  सहेजें एवं लाइव करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
