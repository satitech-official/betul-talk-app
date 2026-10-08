import React, { useState } from 'react';
import {
  Plus,
  Play,
  Trash2,
  Edit,
  Flame,
  Radio,
  Eye,
  Heart,
  Share2,
  X,
  UploadCloud,
  Film,
} from 'lucide-react';
import { VideoReel, VideoType, BetulTehsil, ContentStatus } from '../../types';

interface AdminVideoManagerProps {
  reels: VideoReel[];
  onSaveReel: (reel: VideoReel) => void;
  onDeleteReel: (id: string) => void;
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

export const AdminVideoManager: React.FC<AdminVideoManagerProps> = ({
  reels,
  onSaveReel,
  onDeleteReel,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingReel, setEditingReel] = useState<VideoReel | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<VideoReel>>({
    titleHi: '',
    titleEn: '',
    descriptionHi: '',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-potter-shaping-a-clay-vase-41121-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    durationSeconds: 30,
    type: 'reel',
    location: 'Betul',
    category: 'Local Ground Report',
    reporter: {
      name: 'Betul Talks Official',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verified: true,
    },
    status: 'published',
  });

  const handleOpenCreate = () => {
    setEditingReel(null);
    setFormData({
      id: `reel-${Date.now()}`,
      titleHi: '',
      titleEn: '',
      descriptionHi: '',
      descriptionEn: '',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-potter-shaping-a-clay-vase-41121-large.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
      durationSeconds: 35,
      type: 'reel',
      location: 'Betul',
      category: 'Events',
      reporter: {
        name: 'बैतूल टॉक्स स्पेशल टीम',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        verified: true,
      },
      viewsCount: 150,
      likesCount: 18,
      commentsCount: 2,
      sharesCount: 5,
      publishedAt: new Date().toISOString(),
      status: 'published',
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleHi) {
      alert('कृपया वीडियो का शीर्षक दर्ज करें।');
      return;
    }

    const reelToSave: VideoReel = {
      id: formData.id || `reel-${Date.now()}`,
      titleHi: formData.titleHi || '',
      titleEn: formData.titleEn || formData.titleHi || '',
      descriptionHi: formData.descriptionHi || '',
      descriptionEn: formData.descriptionEn || formData.descriptionHi || '',
      videoUrl: formData.videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-potter-shaping-a-clay-vase-41121-large.mp4',
      thumbnailUrl: formData.thumbnailUrl || 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
      durationSeconds: Number(formData.durationSeconds) || 30,
      type: (formData.type as VideoType) || 'reel',
      location: formData.location || 'Betul',
      reporter: formData.reporter || {
        name: 'Betul Talks Reporter',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        verified: true,
      },
      viewsCount: formData.viewsCount || 0,
      likesCount: formData.likesCount || 0,
      commentsCount: formData.commentsCount || 0,
      sharesCount: formData.sharesCount || 0,
      publishedAt: formData.publishedAt || new Date().toISOString(),
      status: (formData.status as ContentStatus) || 'published',
      category: formData.category || 'Local News',
    };

    onSaveReel(reelToSave);
    setShowModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E8E8E8]">
        <div>
          <h2 className="text-lg font-black text-[#171717]">
            वीडियो समाचार & रील्स प्रबंधन (Video CMS)
          </h2>
          <p className="text-xs text-[#686868]">
            वर्टिकल रील्स, वीडियो बुलेटिन और लाइव टीवी स्ट्रीम्स अपलोड व नियंत्रित करें
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-1.5 bg-[#D71920] hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>नई रील / वीडियो जोड़ें</span>
        </button>
      </div>

      {/* Grid of Reels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {reels.map((reel) => (
          <div
            key={reel.id}
            className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail with overlay */}
              <div className="relative aspect-[9/13] w-full bg-neutral-900 overflow-hidden">
                <img
                  src={reel.thumbnailUrl}
                  alt={reel.titleHi}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                <div className="absolute top-2 left-2 flex items-center gap-1">
                  <span className="bg-[#D71920] text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                    {reel.type}
                  </span>
                  <span className="bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    {reel.location}
                  </span>
                </div>

                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h4 className="text-xs font-bold line-clamp-2 drop-shadow-sm">
                    {reel.titleHi}
                  </h4>
                  <div className="text-[10px] text-neutral-300 mt-1 flex items-center gap-1">
                    <span>अवधि: 0:{reel.durationSeconds}s</span>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="p-3 bg-neutral-50 grid grid-cols-3 gap-1 text-center border-b border-neutral-100 text-[11px]">
                <div>
                  <div className="text-[10px] text-[#686868]">व्यूज</div>
                  <div className="font-bold text-[#171717]">{reel.viewsCount.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#686868]">लाइक्स</div>
                  <div className="font-bold text-red-600">{reel.likesCount.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#686868]">शेयर</div>
                  <div className="font-bold text-green-600">{reel.sharesCount.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-3 flex items-center justify-between text-xs">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {reel.status}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setEditingReel(reel);
                    setFormData(reel);
                    setShowModal(true);
                  }}
                  className="p-1.5 text-neutral-600 hover:text-[#D71920] rounded-lg cursor-pointer"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('क्या आप इस वीडियो को हटाना चाहते हैं?')) {
                      onDeleteReel(reel.id);
                    }
                  }}
                  className="p-1.5 text-neutral-400 hover:text-red-700 rounded-lg cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Video Modal */}
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
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#171717]">
                  {editingReel ? 'वीडियो संपादित करें' : 'नई वीडियो रील अपलोड करें'}
                </h3>
                <p className="text-xs text-[#686868]">बैतूल टॉक्स वीडियो स्टूडियो</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  वीडियो शीर्षक (Hindi) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. मुलताई ताप्ती सरोवर महाआरती लाइव..."
                  value={formData.titleHi || ''}
                  onChange={(e) => setFormData({ ...formData, titleHi: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none focus:border-[#D71920]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">
                    फॉर्मेट (Format)
                  </label>
                  <select
                    value={formData.type || 'reel'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                  >
                    <option value="reel">वर्टिकल रील (9:16)</option>
                    <option value="video">सामान्य वीडियो बुलेटिन</option>
                    <option value="live">लाइव TV स्ट्रीम</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">
                    स्थान (Location)
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
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  वीडियो फ़ाइल URL / CDN लिंक *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://assets...mp4"
                  value={formData.videoUrl || ''}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  थंबनेल फोटो URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash..."
                  value={formData.thumbnailUrl || ''}
                  onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">
                    अवधि (Duration Seconds)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={600}
                    value={formData.durationSeconds || 30}
                    onChange={(e) => setFormData({ ...formData, durationSeconds: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">
                    स्थिति (Status)
                  </label>
                  <select
                    value={formData.status || 'published'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
                  >
                    <option value="published">प्रकाशित (Live)</option>
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
                  सहेजें (Save Video)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
