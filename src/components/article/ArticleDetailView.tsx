import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Heart,
  Eye,
  Clock,
  MapPin,
  Volume2,
  VolumeX,
  Type,
  MessageCircle,
  Send,
  CheckCircle2,
  ThumbsUp,
  CornerDownRight,
  ExternalLink,
} from 'lucide-react';
import { NewsArticle, Language, CommentItem, Advertisement } from '../../types';
import { BetulTalksLogo } from '../common/BetulTalksLogo';
import { SponsoredAdCard } from '../ads/SponsoredAdCard';
import { storage } from '../../services/storage';

interface ArticleDetailViewProps {
  article: NewsArticle;
  onBack: () => void;
  language: Language;
  onSelectArticle: (article: NewsArticle) => void;
  allNews: NewsArticle[];
  ads: Advertisement[];
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  onBack,
  language: initialLanguage,
  onSelectArticle,
  allNews,
  ads,
}) => {
  const [lang, setLang] = useState<Language>(initialLanguage);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(article.likesCount);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Comments state
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Check saved/liked state and record view on mount
  useEffect(() => {
    storage.incrementNewsViews(article.id);
    const profile = storage.getProfile();
    setIsBookmarked(profile.savedArticles.includes(article.id));
    setIsLiked(profile.likedArticles.includes(article.id));

    // Load comments
    const allComments = storage.getComments().filter((c) => c.articleId === article.id);
    setComments(allComments);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.id]);

  const headline = lang === 'hi' ? article.headlineHi : article.headlineEn;
  const content = lang === 'hi' ? article.contentHi : article.contentEn;
  const summary = lang === 'hi' ? article.summaryHi : article.summaryEn;

  // Font sizing styles
  const fontSizeClass = {
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-loose',
    xlarge: 'text-xl leading-loose',
  }[fontSize];

  const handleLike = () => {
    const nextLiked = storage.toggleLikeNews(article.id);
    setIsLiked(nextLiked);
    setLikesCount((prev) => (nextLiked ? prev + 1 : Math.max(0, prev - 1)));
  };

  const handleBookmark = () => {
    const nextSaved = storage.toggleBookmarkNews(article.id);
    setIsBookmarked(nextSaved);
  };

  const handleShareWhatsApp = () => {
    const url = window.location.href;
    const text = encodeURIComponent(
      `*${headline}*\n\n${summary}\n\nपूरी खबर पढ़ें बैतूल टॉक्स पर:\n${url}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleToggleVoice = () => {
    if (!('speechSynthesis' in window)) {
      alert('Your browser does not support text-to-speech.');
      return;
    }

    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(`${headline}. ${content}`);
      utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.95;
      utterance.onend = () => setIsReadingAloud(false);
      utterance.onerror = () => setIsReadingAloud(false);
      window.speechSynthesis.speak(utterance);
      setIsReadingAloud(true);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmittingComment(true);
    const newComment: CommentItem = {
      id: `comm-${Date.now()}`,
      articleId: article.id,
      userName: commentAuthor.trim() || 'बैतूल पाठक (Reader)',
      content: commentText.trim(),
      timestamp: 'अभी-अभी (Just now)',
      likesCount: 0,
      status: 'approved',
    };

    storage.addComment(newComment);
    setComments([newComment, ...comments]);
    setCommentText('');
    setCommentAuthor('');
    setIsSubmittingComment(false);
  };

  // Related articles
  const relatedArticles = allNews
    .filter((n) => n.id !== article.id && (n.category === article.category || n.location === article.location))
    .slice(0, 3);

  const inlineAd = ads.find((a) => a.placement === 'article_inline') || ads[0];

  return (
    <div className="min-h-screen bg-white pb-24 animate-in fade-in">
      {/* Sticky Top Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E8E8] px-3 sm:px-4 py-2 flex items-center justify-between shadow-xs">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs font-bold text-[#171717] hover:text-[#D71920] transition-colors p-1.5 -ml-1.5 rounded-lg"
          aria-label="Back to feed"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">{lang === 'hi' ? 'वापस' : 'Back'}</span>
        </button>

        <BetulTalksLogo size="sm" showSubtitle={false} />

        {/* Quick controls: Font Size + Language */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() =>
              setFontSize((prev) =>
                prev === 'normal' ? 'large' : prev === 'large' ? 'xlarge' : 'normal'
              )
            }
            className="p-1.5 rounded-lg hover:bg-neutral-100 text-[#171717] transition-colors flex items-center gap-0.5 text-xs font-bold border border-neutral-200"
            title="Adjust Font Size"
          >
            <Type className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase">{fontSize[0]}</span>
          </button>

          <button
            onClick={() => setLang((prev) => (prev === 'hi' ? 'en' : 'hi'))}
            className="px-2 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-[#D71920] border border-neutral-200 transition-colors"
          >
            {lang === 'hi' ? 'ENG' : 'हिन्दी'}
          </button>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-4 sm:py-6">
        {/* Category & Location Badges */}
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-[#D71920] text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded tracking-wide">
            {article.category}
          </span>
          <span className="bg-[#F4B400] text-black text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {article.location}
          </span>
          {article.isBreaking && (
            <span className="bg-red-100 text-[#D71920] text-[11px] font-bold px-2 py-0.5 rounded border border-red-200">
              ब्रेकिंग न्यूज़
            </span>
          )}
        </div>

        {/* Headline */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#171717] leading-tight sm:leading-snug mb-3 font-serif">
          {headline}
        </h1>

        {/* Reporter Info & Published Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-[#E8E8E8] my-4 text-xs text-[#686868]">
          <div className="flex items-center gap-2.5">
            <img
              src={article.reporter.avatar}
              alt={article.reporter.name}
              className="w-10 h-10 rounded-full object-cover border border-[#D71920]"
            />
            <div>
              <div className="font-bold text-[#171717] flex items-center gap-1 text-sm">
                <span>{article.reporter.name}</span>
                {article.reporter.verified && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-50" />
                )}
              </div>
              <div className="text-[11px] text-[#686868]">{article.reporter.designation}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>आज, 35 मिनट पहले</span>
            </div>
            <div className="flex items-center gap-1 text-[11px]">
              <Eye className="w-3.5 h-3.5 text-neutral-400" />
              <span>{article.viewsCount.toLocaleString()} बार पढ़ा गया</span>
            </div>
          </div>
        </div>

        {/* Audio Read-Aloud Bar */}
        <div className="my-3 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D71920]">
            {isReadingAloud ? (
              <VolumeX className="w-4 h-4 animate-pulse text-[#D71920]" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#D71920]" />
            )}
            <span>
              {isReadingAloud
                ? (lang === 'hi' ? 'ऑडियो न्यूज़ चल रहा है...' : 'Reading aloud...')
                : (lang === 'hi' ? 'ख़बर सुनें (Listen to News)' : 'Listen to Audio News')}
            </span>
          </div>

          <button
            onClick={handleToggleVoice}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
              isReadingAloud
                ? 'bg-neutral-800 text-white'
                : 'bg-[#D71920] text-white hover:bg-red-700'
            }`}
          >
            {isReadingAloud ? 'रोकें (Stop)' : 'सुनें (Play)'}
          </button>
        </div>

        {/* Featured Image */}
        <div className="my-4 rounded-2xl overflow-hidden border border-[#E8E8E8] shadow-xs">
          <img
            src={article.featuredImage}
            alt={headline}
            className="w-full aspect-video object-cover"
          />
          <div className="bg-neutral-50 px-3 py-2 text-[11px] text-[#686868] border-t border-neutral-100 flex items-center justify-between">
            <span>फोटो साभार: बैतूल टॉक्स मीडिया नेटवर्क</span>
            <span>स्थान: {article.location}</span>
          </div>
        </div>

        {/* Summary Callout */}
        <div className="p-3.5 sm:p-4 bg-amber-50/70 border-l-4 border-[#F4B400] rounded-r-xl my-4 text-xs sm:text-sm font-semibold text-neutral-800 leading-relaxed">
          {summary}
        </div>

        {/* Article Body */}
        <div className={`prose max-w-none text-neutral-800 space-y-4 my-6 whitespace-pre-line font-serif ${fontSizeClass}`}>
          {content}
        </div>

        {/* Interactive Floating Action Strip */}
        <div className="flex items-center justify-between p-3 bg-[#F7F7F7] border border-[#E8E8E8] rounded-xl my-6">
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isLiked
                  ? 'bg-red-100 text-[#D71920] border border-red-200'
                  : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-[#D71920]' : ''}`} />
              <span>{likesCount} पसंद</span>
            </button>

            <button
              onClick={handleBookmark}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isBookmarked
                  ? 'bg-amber-100 text-amber-900 border border-amber-200'
                  : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current text-[#F4B400]' : ''}`} />
              <span>{isBookmarked ? 'सेव्ड' : 'सेव करें'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center gap-1 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="hidden sm:flex items-center gap-1 bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'कॉपी हुआ!' : 'लिंक'}</span>
            </button>
          </div>
        </div>

        {/* Inline Sponsored Ad Block */}
        {inlineAd && (
          <div className="my-6">
            <SponsoredAdCard ad={inlineAd} language={lang} variant="card" />
          </div>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="my-6 pt-4 border-t border-[#E8E8E8]">
            <div className="text-xs font-bold text-[#686868] mb-2 uppercase">सम्बंधित टैग्स:</div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs px-2.5 py-1 rounded-full cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <section className="my-8 pt-6 border-t border-[#E8E8E8]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#D71920]" />
              <h3 className="font-extrabold text-base sm:text-lg text-[#171717]">
                पाठकों की प्रतिक्रियाएं ({comments.length})
              </h3>
            </div>
            <span className="text-[11px] text-[#686868]">बैतूल टॉक्स मंच</span>
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="bg-[#F7F7F7] p-3.5 rounded-xl border border-[#E8E8E8] mb-6">
            <div className="mb-2.5">
              <input
                type="text"
                placeholder="आपका नाम (Your Name)"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-[#E8E8E8] rounded-lg focus:outline-none focus:border-[#D71920]"
              />
            </div>
            <div className="mb-2.5">
              <textarea
                rows={2}
                placeholder="इस खबर पर अपनी राय या टिप्पणी लिखें..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs bg-white border border-[#E8E8E8] rounded-lg focus:outline-none focus:border-[#D71920] resize-none"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmittingComment || !commentText.trim()}
                className="flex items-center gap-1.5 bg-[#D71920] hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>टिप्पणी भेजें</span>
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3">
            {comments.map((comm) => (
              <div key={comm.id} className="p-3 bg-white border border-[#E8E8E8] rounded-xl shadow-2xs">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-[#171717]">{comm.userName}</span>
                  <span className="text-[10px] text-[#686868]">{comm.timestamp}</span>
                </div>
                <p className="text-xs text-neutral-800 leading-relaxed mt-1">{comm.content}</p>
                <div className="flex items-center gap-3 mt-2 pt-2 border-t border-neutral-100 text-[11px] text-[#686868]">
                  <button className="flex items-center gap-1 hover:text-[#D71920]">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{comm.likesCount}</span>
                  </button>
                </div>

                {/* Reporter / Admin Reply */}
                {comm.replies &&
                  comm.replies.map((rep) => (
                    <div
                      key={rep.id}
                      className="ml-4 mt-2 p-2.5 bg-red-50/60 border-l-2 border-[#D71920] rounded-r-lg text-xs"
                    >
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#D71920]">
                        <CornerDownRight className="w-3 h-3" />
                        <span>{rep.userName}</span>
                      </div>
                      <p className="text-xs text-neutral-700 mt-1">{rep.content}</p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </section>

        {/* Related Stories */}
        {relatedArticles.length > 0 && (
          <section className="my-8 pt-6 border-t border-[#E8E8E8]">
            <h3 className="font-extrabold text-base text-[#171717] mb-3">
              {lang === 'hi' ? 'संबंधित अन्य ख़बरें' : 'Related Local Stories'}
            </h3>
            <div className="space-y-3">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel)}
                  className="flex gap-3 p-2.5 rounded-xl border border-[#E8E8E8] hover:bg-neutral-50 cursor-pointer transition-colors"
                >
                  <img
                    src={rel.featuredImage}
                    alt={lang === 'hi' ? rel.headlineHi : rel.headlineEn}
                    className="w-20 h-16 rounded-lg object-cover shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#D71920] uppercase">
                      {rel.location}
                    </span>
                    <h4 className="text-xs font-bold text-[#171717] line-clamp-2 mt-0.5">
                      {lang === 'hi' ? rel.headlineHi : rel.headlineEn}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
