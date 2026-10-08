import React, { useState, useRef, useEffect } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Radio,
  MapPin,
  Flame,
  Send,
  X,
} from 'lucide-react';
import { VideoReel, Language } from '../../types';
import { storage } from '../../services/storage';

interface ReelsViewerProps {
  reels: VideoReel[];
  language: Language;
  initialIndex?: number;
  onClose?: () => void;
}

export const ReelsViewer: React.FC<ReelsViewerProps> = ({
  reels,
  language,
  initialIndex = 0,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'reels' | 'videos' | 'live'>('reels');
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [savedMap, setSavedMap] = useState<Record<string, boolean>>({});

  const videoRef = useRef<HTMLVideoElement>(null);

  const currentReel = reels[currentIndex] || reels[0];

  useEffect(() => {
    // Check initial like/save status from profile
    const profile = storage.getProfile();
    const lMap: Record<string, boolean> = {};
    const sMap: Record<string, boolean> = {};
    reels.forEach((r) => {
      lMap[r.id] = profile.likedVideos.includes(r.id);
      sMap[r.id] = false;
    });
    setLikedMap(lMap);
    setSavedMap(sMap);
  }, [reels]);

  // Restart video on index change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay may need muted initially
        setIsMuted(true);
      });
      setIsPlaying(true);
    }
  }, [currentIndex]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleNext = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // loop
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(reels.length - 1);
    }
  };

  const handleLike = () => {
    if (!currentReel) return;
    const nextLiked = storage.toggleLikeReel(currentReel.id);
    setLikedMap((prev) => ({ ...prev, [currentReel.id]: nextLiked }));
  };

  const handleBookmark = () => {
    if (!currentReel) return;
    setSavedMap((prev) => ({ ...prev, [currentReel.id]: !prev[currentReel.id] }));
  };

  const handleShare = () => {
    if (!currentReel) return;
    const title = language === 'hi' ? currentReel.titleHi : currentReel.titleEn;
    const text = encodeURIComponent(
      `*${title}*\n\nदेखिए बैतूल टॉक्स रील्स पर:\n${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  if (!currentReel) {
    return (
      <div className="h-screen bg-[#080808] flex items-center justify-center text-white">
        कोई वीडियो उपलब्ध नहीं है।
      </div>
    );
  }

  const title = language === 'hi' ? currentReel.titleHi : currentReel.titleEn;
  const description = language === 'hi' ? currentReel.descriptionHi : currentReel.descriptionEn;

  return (
    <div className="relative h-[calc(100vh-60px)] sm:h-screen w-full bg-[#080808] overflow-hidden select-none flex items-center justify-center">
      {/* Top Floating Category Switcher: Reels | Videos | Live */}
      <div className="absolute top-3 left-0 right-0 z-30 flex items-center justify-center gap-6 text-sm font-black drop-shadow-md">
        <button
          onClick={() => setActiveTab('reels')}
          className={`transition-colors ${
            activeTab === 'reels' ? 'text-white border-b-2 border-[#D71920] pb-1' : 'text-neutral-400'
          }`}
        >
          {language === 'hi' ? 'रील्स' : 'Reels'}
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`transition-colors ${
            activeTab === 'videos' ? 'text-white border-b-2 border-[#D71920] pb-1' : 'text-neutral-400'
          }`}
        >
          {language === 'hi' ? 'वीडियो बुलेटिन' : 'Videos'}
        </button>
        <button
          onClick={() => setActiveTab('live')}
          className={`flex items-center gap-1.5 transition-colors ${
            activeTab === 'live' ? 'text-[#D71920] border-b-2 border-[#D71920] pb-1 font-black' : 'text-neutral-400'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#D71920] animate-ping" />
          <span>LIVE TV</span>
        </button>
      </div>

      {/* Close button if modal */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/60 text-white hover:bg-black"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Main Video Screen Container (standard 9:16 portrait on mobile, clamped on desktop) */}
      <div className="relative w-full h-full max-w-md mx-auto bg-black flex items-center justify-center overflow-hidden">
        {/* Real Video Player with Poster fallback */}
        <video
          ref={videoRef}
          src={currentReel.videoUrl}
          poster={currentReel.thumbnailUrl}
          loop
          playsInline
          muted={isMuted}
          onClick={togglePlayPause}
          className="w-full h-full object-cover cursor-pointer"
        />

        {/* Play / Pause Center Pulse Indicator */}
        {!isPlaying && (
          <div
            onClick={togglePlayPause}
            className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer z-10"
          >
            <div className="w-16 h-16 rounded-full bg-[#D71920]/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-md">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
          </div>
        )}

        {/* Top Overlay: Tehsil & Verification */}
        <div className="absolute top-12 left-3 z-20 flex items-center gap-2">
          <span className="bg-black/60 backdrop-blur-md text-[#F4B400] text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1 border border-yellow-400/30">
            <MapPin className="w-3 h-3 text-[#F4B400]" />
            <span>{currentReel.location}</span>
          </span>
          <span className="bg-[#D71920] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
            {currentReel.category}
          </span>
        </div>

        {/* Right Action Icons Column (Like, Comment, Share, Save, Sound, Vertical Nav) */}
        <div className="absolute right-3 bottom-20 z-20 flex flex-col items-center gap-4 text-white">
          {/* Like */}
          <button
            onClick={handleLike}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/20 transition-transform active:scale-125 ${
                likedMap[currentReel.id] ? 'text-[#D71920]' : 'text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${likedMap[currentReel.id] ? 'fill-current' : ''}`} />
            </div>
            <span className="text-[11px] font-bold mt-1 drop-shadow-md">
              {(currentReel.likesCount + (likedMap[currentReel.id] ? 1 : 0)).toLocaleString()}
            </span>
          </button>

          {/* Comments */}
          <button
            onClick={() => setShowCommentsModal(true)}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/20">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold mt-1 drop-shadow-md">
              {currentReel.commentsCount}
            </span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/20 hover:text-green-400">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold mt-1 drop-shadow-md">
              {currentReel.sharesCount}
            </span>
          </button>

          {/* Bookmark */}
          <button
            onClick={handleBookmark}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/20 ${
                savedMap[currentReel.id] ? 'text-[#F4B400]' : 'text-white'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${savedMap[currentReel.id] ? 'fill-current' : ''}`} />
            </div>
            <span className="text-[11px] font-bold mt-1 drop-shadow-md">सेव</span>
          </button>

          {/* Sound Mute/Unmute */}
          <button
            onClick={toggleMute}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/20 text-white hover:text-yellow-400 cursor-pointer"
            title="Mute / Unmute Audio"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>

        {/* Up / Down Navigation Controls for Desktop & Mobile */}
        <div className="absolute right-3 top-16 z-20 flex flex-col gap-1">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-full bg-black/60 text-white hover:bg-[#D71920] transition-colors"
            title="Previous Reel"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-full bg-black/60 text-white hover:bg-[#D71920] transition-colors"
            title="Next Reel"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Headline and Reporter Details */}
        <div className="absolute bottom-4 left-3 right-16 z-20 text-white">
          {/* Verified Reporter */}
          <div className="flex items-center gap-2 mb-2">
            <img
              src={currentReel.reporter.avatar}
              alt={currentReel.reporter.name}
              className="w-8 h-8 rounded-full border-2 border-[#D71920] object-cover"
            />
            <div className="flex items-center gap-1 font-bold text-xs">
              <span>{currentReel.reporter.name}</span>
              {currentReel.reporter.verified && (
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              )}
            </div>
            <span className="bg-[#D71920] text-white text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
              फॉलो
            </span>
          </div>

          {/* Title */}
          <h2 className="text-sm sm:text-base font-extrabold leading-snug drop-shadow-md line-clamp-2">
            {title}
          </h2>

          {/* Description */}
          <p className="text-xs text-neutral-300 mt-1 line-clamp-2 drop-shadow-sm">
            {description}
          </p>

          {/* Audio attribution */}
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mt-2">
            <span className="text-yellow-400 font-bold">♫</span>
            <span className="truncate">ओरिजिनल ऑडियो • बैतूल टॉक्स न्यूज़ रूम</span>
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
          <div className="h-full bg-[#D71920] w-2/3 animate-pulse" />
        </div>
      </div>

      {/* Comments Drawer Modal */}
      {showCommentsModal && (
        <div className="absolute inset-0 z-40 bg-black/70 backdrop-blur-xs flex items-end justify-center">
          <div className="w-full max-w-md bg-white rounded-t-2xl p-4 max-h-[70vh] flex flex-col animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E8]">
              <h3 className="font-bold text-sm text-[#171717]">
                रील्स टिप्पणियां ({currentReel.commentsCount})
              </h3>
              <button
                onClick={() => setShowCommentsModal(false)}
                className="p-1 rounded-full hover:bg-neutral-100"
              >
                <X className="w-5 h-5 text-[#686868]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-3">
              <div className="p-2.5 bg-neutral-50 rounded-xl text-xs">
                <div className="font-bold text-[#171717]">प्रमोद देशमुख, मुलताई</div>
                <p className="text-neutral-700 mt-0.5">
                  बहुत ही शानदार कवरेज। बैतूल टॉक्स ग्राउंड रिपोर्ट हमेशा सबसे सटीक होती है।
                </p>
                <span className="text-[10px] text-neutral-400 mt-1 block">10 मिनट पहले</span>
              </div>
              <div className="p-2.5 bg-neutral-50 rounded-xl text-xs">
                <div className="font-bold text-[#171717]">अंकिता सोनी, कोठी बाजार</div>
                <p className="text-neutral-700 mt-0.5">
                  मेले में जरूर जाना चाहिए, गोंडी कलाकृतियां वाकई खूबसूरत हैं!
                </p>
                <span className="text-[10px] text-neutral-400 mt-1 block">25 मिनट पहले</span>
              </div>
            </div>

            {/* Post comment input */}
            <div className="flex items-center gap-2 pt-3 border-t border-[#E8E8E8]">
              <input
                type="text"
                placeholder="अपनी राय लिखें..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl focus:outline-none"
              />
              <button
                onClick={() => {
                  if (newComment.trim()) {
                    setNewComment('');
                    alert('टिप्पणी दर्ज की गई!');
                  }
                }}
                className="p-2 rounded-xl bg-[#D71920] text-white"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
