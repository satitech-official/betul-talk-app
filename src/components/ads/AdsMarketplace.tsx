import React, { useState } from 'react';
import {
  Megaphone,
  Phone,
  MessageCircle,
  MapPin,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Send,
  Star,
  ChevronRight,
  TrendingUp,
  X,
} from 'lucide-react';
import { BusinessListing, Advertisement, Language, BetulTehsil, AdEnquiry } from '../../types';
import { SponsoredAdCard } from './SponsoredAdCard';
import { storage } from '../../services/storage';

interface AdsMarketplaceProps {
  businesses: BusinessListing[];
  ads: Advertisement[];
  language: Language;
}

const BUSINESS_CATEGORIES = [
  'All',
  'Automobile',
  'Restaurants',
  'Hospitals',
  'Shops',
  'Real Estate',
  'Electronics',
  'Education',
  'Local Services',
];

export const AdsMarketplace: React.FC<AdsMarketplaceProps> = ({
  businesses,
  ads,
  language,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTehsil, setSelectedTehsil] = useState<BetulTehsil | 'All'>('All');
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // Enquiry Form State
  const [enquiryForm, setEnquiryForm] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    whatsapp: '',
    adType: 'होम स्क्रीन बैनर विज्ञापन (Banner Ad)',
    budgetRange: '₹10,000 - ₹20,000 प्रति माह',
    message: '',
  });

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEnquiry: AdEnquiry = {
      id: `enq-${Date.now()}`,
      businessName: enquiryForm.businessName,
      contactPerson: enquiryForm.contactPerson,
      phone: enquiryForm.phone,
      whatsapp: enquiryForm.whatsapp || enquiryForm.phone,
      adType: enquiryForm.adType,
      budgetRange: enquiryForm.budgetRange,
      message: enquiryForm.message,
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    storage.addEnquiry(newEnquiry);
    setEnquirySuccess(true);
    setTimeout(() => {
      setEnquirySuccess(false);
      setShowEnquiryModal(false);
      setEnquiryForm({
        businessName: '',
        contactPerson: '',
        phone: '',
        whatsapp: '',
        adType: 'होम स्क्रीन बैनर विज्ञापन (Banner Ad)',
        budgetRange: '₹10,000 - ₹20,000 प्रति माह',
        message: '',
      });
    }, 2500);
  };

  const filteredBusinesses = businesses.filter((b) => {
    const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesTehsil = selectedTehsil === 'All' || b.tehsil === selectedTehsil;
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesTehsil && matchesSearch;
  });

  const featuredBiz = businesses.filter((b) => b.featured);

  return (
    <div className="pb-24 bg-[#F7F7F7] min-h-screen">
      {/* Top Hero Promotion Banner */}
      <div className="bg-gradient-to-br from-[#171717] via-[#222222] to-[#D71920] text-white p-5 sm:p-7 relative overflow-hidden shadow-md">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#F4B400] text-black text-xs font-black px-2.5 py-1 rounded uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GROW YOUR BUSINESS IN BETUL</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-black leading-tight">
            बैतूल के 1.5 लाख से अधिक सक्रिय पाठकों तक पहुंचाएं अपना व्यापार
          </h1>

          <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-xl">
            बैतूल टॉक्स न्यूज़ नेटवर्क के माध्यम से अपने शोरूम, हॉस्पिटल, स्कूल, रेस्टोरेंट या प्रॉपर्टी का सीधा प्रचार करें।
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <button
              onClick={() => setShowEnquiryModal(true)}
              className="bg-[#D71920] hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Megaphone className="w-4 h-4" />
              <span>विज्ञापन दें / Advertise with Us</span>
            </button>

            <a
              href="https://wa.me/919425001122?text=Hello%20Betul%20Talks,%20I%20want%20to%20advertise%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-3.5 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp पर बात करें</span>
            </a>
          </div>
        </div>

        {/* Decorative badge in background */}
        <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
          <Megaphone className="w-48 h-48 text-white" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4">
        {/* Search & Tehsil Bar */}
        <div className="bg-white p-3 rounded-2xl border border-[#E8E8E8] shadow-xs mb-4 flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#686868] absolute left-3 top-3" />
            <input
              type="text"
              placeholder="बैतूल में व्यापार, शोरूम या सेवाएं खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none focus:border-[#D71920]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedTehsil}
              onChange={(e) => setSelectedTehsil(e.target.value as any)}
              className="px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl font-medium focus:outline-none"
            >
              <option value="All">संपूर्ण बैतूल जिला</option>
              <option value="Betul">बैतूल शहर</option>
              <option value="Multai">मुलताई</option>
              <option value="Amla">अमला</option>
              <option value="Shahpur">शाहपुर</option>
              <option value="Bhainsdehi">भैंसदेही</option>
              <option value="Sarni">सारणी</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-4">
          {BUSINESS_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#D71920] text-white shadow-xs font-bold'
                  : 'bg-white text-[#171717] border border-[#E8E8E8] hover:bg-neutral-100'
              }`}
            >
              {cat === 'All' ? 'सभी श्रेणियां' : cat}
            </button>
          ))}
        </div>

        {/* Exclusive Offers & Deals Section */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="p-1 rounded-md bg-[#F4B400] text-black">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="font-extrabold text-sm sm:text-base text-[#171717]">
                विशेष छूट & डिस्काउंट ऑफर्स (Local Deals)
              </h2>
            </div>
            <span className="text-[11px] font-bold text-[#D71920]">सीमित समय के लिए</span>
          </div>

          <div className="space-y-3">
            {ads.slice(0, 2).map((ad) => (
              <SponsoredAdCard key={ad.id} ad={ad} language={language} variant="banner" />
            ))}
          </div>
        </section>

        {/* Verified Local Businesses Directory */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-extrabold text-sm sm:text-base text-[#171717]">
              प्रमुख स्थानीय प्रतिष्ठान ({filteredBusinesses.length})
            </h2>
            <span className="text-[11px] text-[#686868]">सत्यापित बैतूल व्यापारी</span>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {filteredBusinesses.map((biz) => (
              <div
                key={biz.id}
                className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Cover image */}
                  <div className="relative aspect-video w-full bg-neutral-100 overflow-hidden">
                    <img
                      src={biz.coverImage}
                      alt={biz.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      <MapPin className="w-3 h-3 text-[#D71920]" />
                      <span>{biz.tehsil}</span>
                    </div>

                    {biz.featured && (
                      <div className="absolute top-2 right-2 bg-[#F4B400] text-black text-[10px] font-black px-2 py-0.5 rounded shadow-sm">
                        FEATURED
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-[#D71920] uppercase bg-red-50 px-2 py-0.5 rounded">
                        {biz.category}
                      </span>
                      <div className="flex items-center gap-0.5 text-xs font-bold text-amber-600">
                        <Star className="w-3 h-3 fill-current text-amber-500" />
                        <span>{biz.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-sm text-[#171717] flex items-center gap-1 mt-1">
                      <span>{biz.name}</span>
                      {biz.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      )}
                    </h3>

                    <p className="text-xs text-[#686868] mt-1 line-clamp-2 leading-relaxed">
                      {biz.description}
                    </p>

                    {biz.specialOffer && (
                      <div className="mt-2.5 bg-amber-50 border border-amber-200 p-2 rounded-lg text-[11px] font-bold text-amber-900 flex items-center gap-1.5">
                        <span>🏷️</span>
                        <span className="truncate">{biz.specialOffer}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 text-[11px] text-[#686868] mt-2.5">
                      <Clock className="w-3 h-3 text-neutral-400 shrink-0" />
                      <span className="truncate">{biz.openingHours}</span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="p-3 pt-0 border-t border-neutral-100 mt-2 grid grid-cols-2 gap-2">
                  <a
                    href={`https://wa.me/${biz.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 py-1.5 rounded-xl text-xs font-bold transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${biz.phone}`}
                    className="flex items-center justify-center gap-1.5 bg-[#171717] hover:bg-neutral-800 text-white py-1.5 rounded-xl text-xs font-bold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#F4B400]" />
                    <span>कॉल</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Advertisement Packages Box */}
        <div className="bg-white rounded-2xl border border-[#E8E8E8] p-5 shadow-xs mb-8">
          <h3 className="font-extrabold text-base text-[#171717] mb-2">
            बैतूल टॉक्स विज्ञापन फॉर्मेट्स (Advertising Formats)
          </h3>
          <p className="text-xs text-[#686868] mb-4">
            आपकी आवश्यकता अनुसार अनुकूलित विज्ञापन पैकेज उपलब्ध हैं:
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl border border-neutral-200 bg-neutral-50">
              <div className="text-xs font-bold text-[#D71920]">01. होम स्क्रीन बैनर</div>
              <div className="text-sm font-extrabold text-[#171717] mt-1">₹5,000 / माह से</div>
              <p className="text-[11px] text-[#686868] mt-1">सर्वोच्च दृश्यता, प्रतिदिन 50,000+ व्यूज।</p>
            </div>
            <div className="p-3 rounded-xl border border-neutral-200 bg-neutral-50">
              <div className="text-xs font-bold text-amber-600">02. वीडियो रील ऐड</div>
              <div className="text-sm font-extrabold text-[#171717] mt-1">₹8,000 / रील से</div>
              <p className="text-[11px] text-[#686868] mt-1">पूरी स्क्रीन 30-सेकंड वीडियो प्रचार।</p>
            </div>
            <div className="p-3 rounded-xl border border-neutral-200 bg-neutral-50">
              <div className="text-xs font-bold text-emerald-600">03. स्पॉन्सर्ड आर्टिकल</div>
              <div className="text-sm font-extrabold text-[#171717] mt-1">₹3,500 / आर्टिकल</div>
              <p className="text-[11px] text-[#686868] mt-1">ब्रांड स्टोरी व लाइफटाइम वेब लिंक।</p>
            </div>
            <div className="p-3 rounded-xl border border-neutral-200 bg-neutral-50">
              <div className="text-xs font-bold text-blue-600">04. पुश नोटिफिकेशन</div>
              <div className="text-sm font-extrabold text-[#171717] mt-1">₹2,000 / ब्लास्ट</div>
              <p className="text-[11px] text-[#686868] mt-1">बैतूल के सभी यूज़र्स के फोन पर तुरंत अलर्ट।</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl w-full max-w-lg p-5 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowEnquiryModal(false)}
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
                  बैतूल टॉक्स विज्ञापन इंक्वायरी फॉर्म
                </h3>
                <p className="text-xs text-[#686868]">हमारी विज्ञापन टीम 2 घंटे के भीतर संपर्क करेगी</p>
              </div>
            </div>

            {enquirySuccess ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center my-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h4 className="font-bold text-base text-emerald-900">आपकी इंक्वायरी दर्ज कर ली गई है!</h4>
                <p className="text-xs text-emerald-700 mt-1">
                  बैतूल टॉक्स मीडियावर्क टीम आपसे शीघ्र ही संपर्क करेगी।
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-3 mt-3">
                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">
                    व्यापार / प्रतिष्ठान का नाम *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. खेड़ापति मोटर्स / होटल प्राइड"
                    value={enquiryForm.businessName}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, businessName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none focus:border-[#D71920]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-[#171717] mb-1">
                      संपर्क व्यक्ति का नाम *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="आपका नाम"
                      value={enquiryForm.contactPerson}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, contactPerson: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none focus:border-[#D71920]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#171717] mb-1">
                      मोबाइल नंबर *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 94250..."
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none focus:border-[#D71920]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-[#171717] mb-1">
                      विज्ञापन का प्रकार
                    </label>
                    <select
                      value={enquiryForm.adType}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, adType: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                    >
                      <option>होम स्क्रीन बैनर विज्ञापन (Banner Ad)</option>
                      <option>वीडियो रील एडवरटाइजमेंट (Reels Ad)</option>
                      <option>स्पॉन्सर्ड आर्टिकल (Sponsored Article)</option>
                      <option>लोकल बिज़नेस डायरेक्टरी लिस्टिंग</option>
                      <option>पुश नोटिफिकेशन अलर्ट (Push Alert)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#171717] mb-1">
                      अनुमानित मासिक बजट
                    </label>
                    <select
                      value={enquiryForm.budgetRange}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, budgetRange: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                    >
                      <option>₹5,000 - ₹10,000</option>
                      <option>₹10,000 - ₹25,000</option>
                      <option>₹25,000 - ₹50,000</option>
                      <option>₹50,000 से अधिक (कस्टम पैकेज)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">
                    अतिरिक्त जानकारी या संदेश
                  </label>
                  <textarea
                    rows={2}
                    placeholder="अपने विज्ञापन या विशेष ऑफर के बारे में बताएं..."
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#D71920] hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>इंक्वायरी सबमिट करें (Submit Enquiry)</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
