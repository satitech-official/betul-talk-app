import React, { useState } from 'react';
import {
  Plus,
  Building2,
  Trash2,
  Edit,
  CheckCircle2,
  Star,
  Phone,
  MessageCircle,
  MapPin,
  X,
} from 'lucide-react';
import { BusinessListing, BetulTehsil } from '../../types';

interface AdminBusinessesManagerProps {
  businesses: BusinessListing[];
  onSaveBusiness: (biz: BusinessListing) => void;
  onDeleteBusiness: (id: string) => void;
}

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

export const AdminBusinessesManager: React.FC<AdminBusinessesManagerProps> = ({
  businesses,
  onSaveBusiness,
  onDeleteBusiness,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingBiz, setEditingBiz] = useState<BusinessListing | null>(null);

  const [formData, setFormData] = useState<Partial<BusinessListing>>({
    name: '',
    category: 'Automobile',
    description: '',
    phone: '+919425001122',
    whatsapp: '919425001122',
    address: 'कोठी बाज़ार, बैतूल',
    tehsil: 'Betul',
    openingHours: 'सुबह 09:30 - रात 08:30',
    coverImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    verified: true,
    featured: false,
    specialOffer: '',
  });

  const handleOpenCreate = () => {
    setEditingBiz(null);
    setFormData({
      id: `biz-${Date.now()}`,
      name: '',
      category: 'Restaurants',
      description: '',
      phone: '+919425012345',
      whatsapp: '919425012345',
      address: 'सिविल लाइंस, बैतूल',
      tehsil: 'Betul',
      openingHours: 'सुबह 10:00 - रात 10:00',
      logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=200&q=80',
      coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      rating: 4.6,
      verified: true,
      featured: true,
      specialOffer: '',
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      alert('कृपया व्यापार का नाम दर्ज करें।');
      return;
    }

    const bizToSave: BusinessListing = {
      id: formData.id || `biz-${Date.now()}`,
      name: formData.name || '',
      category: formData.category || 'Retail',
      description: formData.description || '',
      phone: formData.phone || '+919425001122',
      whatsapp: formData.whatsapp || '919425001122',
      address: formData.address || 'बैतूल',
      tehsil: formData.tehsil || 'Betul',
      openingHours: formData.openingHours || 'सुबह 10:00 - रात 09:00',
      logo: formData.logo || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=200&q=80',
      coverImage: formData.coverImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      rating: formData.rating || 4.5,
      verified: !!formData.verified,
      featured: !!formData.featured,
      specialOffer: formData.specialOffer || '',
    };

    onSaveBusiness(bizToSave);
    setShowModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E8E8E8]">
        <div>
          <h2 className="text-lg font-black text-[#171717]">
            बैतूल स्थानीय प्रतिष्ठान डायरेक्टरी (Business Listings)
          </h2>
          <p className="text-xs text-[#686868]">
            सत्यापित शोरूम, क्लिनिक, रेस्टोरेंट और सेवाएं प्रबंधित करें
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-1.5 bg-[#D71920] hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>नया प्रतिष्ठान जोड़ें</span>
        </button>
      </div>

      {/* Businesses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {businesses.map((biz) => (
          <div
            key={biz.id}
            className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden p-3.5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-3">
                <img src={biz.coverImage} alt={biz.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {biz.tehsil}
                </div>
                {biz.featured && (
                  <div className="absolute top-2 right-2 bg-[#F4B400] text-black text-[10px] font-black px-2 py-0.5 rounded">
                    FEATURED
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#D71920] uppercase bg-red-50 px-2 py-0.5 rounded">
                  {biz.category}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                  <span>{biz.rating}</span>
                </div>
              </div>

              <h3 className="font-extrabold text-sm text-[#171717] mt-1.5 flex items-center gap-1">
                <span>{biz.name}</span>
                {biz.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />}
              </h3>

              <p className="text-xs text-[#686868] mt-1 line-clamp-2 leading-relaxed">
                {biz.description}
              </p>

              <div className="text-[11px] text-[#686868] mt-2 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#D71920] shrink-0" />
                <span className="truncate">{biz.address}</span>
              </div>
            </div>

            {/* Admin actions */}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-neutral-100">
              <button
                onClick={() => {
                  const updated = { ...biz, verified: !biz.verified };
                  onSaveBusiness(updated);
                }}
                className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${
                  biz.verified
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                {biz.verified ? '✓ सत्यापित (Verified)' : 'सत्यापित करें'}
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setEditingBiz(biz);
                    setFormData(biz);
                    setShowModal(true);
                  }}
                  className="p-1.5 text-neutral-600 hover:text-[#D71920] rounded-lg"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('क्या आप इस प्रतिष्ठान को हटाना चाहते हैं?')) {
                      onDeleteBusiness(biz.id);
                    }
                  }}
                  className="p-1.5 text-neutral-400 hover:text-red-700 rounded-lg"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl w-full max-w-lg p-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-neutral-100 text-[#686868]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#171717]">
                  {editingBiz ? 'प्रतिष्ठान संपादित करें' : 'नया स्थानीय प्रतिष्ठान जोड़ें'}
                </h3>
                <p className="text-xs text-[#686868]">बैतूल लोकल बाज़ार डायरेक्टरी</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  प्रतिष्ठान का नाम *
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. सतपुड़ा सुपर-स्पेशियलिटी हॉस्पिटल"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none focus:border-[#D71920]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">
                    श्रेणी (Category)
                  </label>
                  <select
                    value={formData.category || 'Automobile'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                  >
                    <option>Automobile</option>
                    <option>Restaurants</option>
                    <option>Hospitals</option>
                    <option>Shops</option>
                    <option>Real Estate</option>
                    <option>Electronics</option>
                    <option>Education</option>
                    <option>Local Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">
                    तहसील (Tehsil)
                  </label>
                  <select
                    value={formData.tehsil || 'Betul'}
                    onChange={(e) => setFormData({ ...formData, tehsil: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                  >
                    {TEHSILS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  विवरण / विशेषताएं
                </label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">फ़ोन नंबर</label>
                  <input
                    type="text"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">व्हाट्सएप</label>
                  <input
                    type="text"
                    value={formData.whatsapp || ''}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">पता (Address)</label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  कवर फोटो URL
                </label>
                <input
                  type="url"
                  value={formData.coverImage || ''}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                />
              </div>

              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.verified}
                    onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span>सत्यापित बैज (Verified)</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 accent-[#F4B400]"
                  />
                  <span>फीचर्ड लिस्टिंग (Featured)</span>
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-[#E8E8E8]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3.5 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-100 rounded-xl"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D71920] hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  प्रतिष्ठान सहेजें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
