import { useState, useEffect, useRef } from "react";
import {
  MessageCircle, Bookmark, Heart, Bell, Send, Sparkles,
  ExternalLink, Calendar as CalendarIcon, MapPin, Filter,
  ChevronDown, Check, Megaphone, Compass, Store, Newspaper
} from "lucide-react";
import { ImageWithFallback } from "../../shared/ImageWithFallback";
import { toast } from "sonner";
import { Button } from "../../ui/button";

// Hardcoded feed items
const FEED_ITEMS = [
  {
    id: "ann-1",
    type: "announcement",
    timestamp: "1h ago",
    author: {
      name: "FTO Community Team",
      avatar: "bg-[#066237] text-white",
      handle: "@fto_team"
    },
    content: "Welcome to the new community platform! We've updated our guidelines to foster safer spaces for connection. Please take a moment to review them in the About section.",
    likes: 124,
    comments: [
      { id: 1, user: "Sarah J.", text: "Love the new look!", avatar: "bg-purple-100 text-purple-700" },
      { id: 2, user: "Mike T.", text: "Thanks for the hard work.", avatar: "bg-green-100 text-green-700" }
    ]
  },
  {
    id: "explore-1",
    type: "explore",
    timestamp: "3h ago",
    author: { 
      name: "FTO Explore", 
      avatar: "bg-orange-100 text-orange-700", 
      handle: "@fto_explore" 
    },
    title: "The Art of Integration: Weaving Experiences into Life",
    excerpt: "A comprehensive guide on how to ground and integrate transformative experiences into your daily routine.",
    category: "Education",
    image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    url: "https://findtheothers.com/explore/art-of-integration",
    introMessage: "New resource added to our library! Essential reading for post-retreat grounding. 📚✨",
    likes: 89,
    comments: []
  },
  {
    id: "event-1",
    type: "event",
    timestamp: "5h ago",
    author: { 
      name: "FTO Events", 
      avatar: "bg-[#7935F8] text-white", 
      handle: "@fto_events" 
    },
    title: "Global Community Breathwork: Monthly Session",
    date: "Sunday, Oct 24 • 10:00 AM CET",
    location: "Online (Zoom)",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    url: "https://findtheothers.com/events/breathwork-oct",
    content: "Join us for our signature monthly breathwork session. Open to all levels. Visit the event page for registration details.",
    likes: 245,
    comments: [
      { id: 1, user: "Elena R.", text: "Can't wait!", avatar: "bg-blue-100 text-blue-700" }
    ]
  },
  {
    id: "news-1",
    type: "news",
    timestamp: "1d ago",
    author: { 
      name: "FTO News", 
      avatar: "bg-blue-100 text-blue-700", 
      handle: "@fto_news" 
    },
    title: "Find The Others Partners with MAPS for Research",
    excerpt: "We are thrilled to announce a strategic partnership to support psychedelic research and community safety initiatives worldwide.",
    category: "Partnership",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    url: "https://findtheothers.com/news/maps-partnership",
    introMessage: "Big news for our ecosystem! Read the full story on our main site. 👇",
    likes: 562,
    comments: []
  },
  {
    id: "dir-1",
    type: "directory",
    timestamp: "2d ago",
    author: { 
      name: "Directory Bot", 
      avatar: "bg-yellow-100 text-yellow-700", 
      handle: "@fto_dir" 
    },
    name: "Sacred Valley Retreat Center",
    location: { city: "Cusco", country: "Peru" },
    tags: ["Retreat", "Ayahuasca", "Nature"],
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    url: "https://findtheothers.com/directory/sacred-valley",
    introMessage: null,
    likes: 34,
    comments: []
  }
];

export function CommunityFeed() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filters = [
    { id: 'all', label: 'All Updates', icon: Sparkles },
    { id: 'announcement', label: 'Announcements', icon: Megaphone },
    { id: 'event', label: 'Events', icon: CalendarIcon },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'directory', label: 'Directory', icon: Store },
  ];

  const filteredItems = activeFilter === 'all'
    ? FEED_ITEMS
    : FEED_ITEMS.filter(item => item.type === activeFilter);

  const activeFilterLabel = filters.find(f => f.id === activeFilter)?.label;
  const ActiveIcon = filters.find(f => f.id === activeFilter)?.icon || Sparkles;

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6 pt-8">
        <div className="space-y-2 pb-4">
           <div className="h-7 w-20 bg-[#2a2523] rounded-lg animate-pulse" />
           <div className="h-4 w-48 bg-[#252220] rounded-lg animate-pulse" />
        </div>
        {[1, 2].map(i => (
          <div key={i} className="bg-[#252220] rounded-2xl p-6 border border-white/[0.06] space-y-4">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-[#2a2523] animate-pulse" />
               <div className="h-3 w-32 bg-[#2a2523] rounded animate-pulse" />
             </div>
             <div className="h-40 w-full bg-[#252220] rounded-xl animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 pb-20">
      {/* Filter pills */}
      <div className="flex flex-wrap items-center gap-1.5 pt-2">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all
                ${isActive
                  ? 'bg-[#2a2523] text-white'
                  : 'text-[#857c73] hover:text-[#e8e0d8] hover:bg-[#252220]'}
              `}
            >
              <Icon className="w-3 h-3" />
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-5 min-h-[50vh]">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
               <FeedCard item={item} />
            </div>
          ))
        ) : (
          <div className="text-center py-20 rounded-2xl border border-white/[0.06]">
            <div className="w-12 h-12 bg-[#2a2523] rounded-full flex items-center justify-center mx-auto mb-4 text-[#524b45]">
              <Filter className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-medium text-[#9e958c]">No updates found</h3>
            <p className="text-[#524b45] text-xs mt-1 max-w-xs mx-auto">
              Nothing in {activeFilterLabel} yet.
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="mt-4 text-xs font-medium text-[#7935F8] hover:underline"
            >
              Show all
            </button>
          </div>
        )}
      </div>
      
      {filteredItems.length > 0 && (
        <div className="py-12 text-center space-y-2">
          <div className="w-8 h-8 bg-[#252220] rounded-full flex items-center justify-center mx-auto border border-white/[0.06]">
            <CheckMark />
          </div>
          <p className="text-[#6b635b] text-xs font-medium">You're all caught up</p>
        </div>
      )}
    </div>
  );
}

function CheckMark() {
  return (
    <svg className="w-4 h-4 text-[#7935F8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function FeedCard({ item }: { item: any }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<any[]>(item.comments || []);
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes || 0);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      user: "Guest User",
      text: newComment,
      avatar: "bg-[#066237] text-white"
    };
    setComments([...comments, comment]);
    setNewComment("");
    toast.success("Comment posted!");
  };

  const handleLike = () => {
    const newVal = !isLiked;
    setIsLiked(newVal);
    setLikeCount(prev => newVal ? prev + 1 : prev - 1);
    if (newVal) toast.success("Liked!");
  };

  const handleBookmark = () => {
    const newVal = !isBookmarked;
    setIsBookmarked(newVal);
    if (newVal) toast.success("Saved to bookmarks");
    else toast.info("Removed from bookmarks");
  };

  const ExternalLinkOverlay = () => (
    <div className="absolute top-4 right-4 bg-[#1c1917]/80 backdrop-blur-sm p-2.5 rounded-full text-[#9e958c] opacity-0 group-hover:opacity-100 transition-opacity z-20">
      <ExternalLink className="w-4 h-4" />
    </div>
  );

  // Helper to render content based on type
  const renderContent = () => {
    switch (item.type) {
      case 'announcement':
        return (
          <div className="bg-[#7935F8]/5 rounded-xl p-5 border border-[#7935F8]/10 relative overflow-hidden">
             <div className="flex items-start gap-4">
               <div className="p-2.5 bg-[#7935F8]/10 rounded-xl shrink-0 text-[#7935F8]">
                 <Bell className="w-4 h-4" />
               </div>
               <p className="text-[#d4cbc2] leading-relaxed whitespace-pre-wrap text-sm">
                 {item.content}
               </p>
             </div>
          </div>
        );

      case 'event':
        return (
          <div className="space-y-6">
             <p className="text-[#e8e0d8] text-lg leading-relaxed whitespace-pre-wrap font-medium">
               {item.content}
             </p>
             
             <a 
               href={item.url}
               target="_blank"
               rel="noopener noreferrer"
               className="block rounded-xl overflow-hidden border border-white/[0.06] bg-[#1f1c1a] group cursor-pointer transition-colors hover:border-white/[0.12] relative"
             >
               <ExternalLinkOverlay />
               <div className="flex flex-col lg:flex-row">
                 <div className="w-full lg:w-[40%] aspect-video lg:aspect-auto bg-[#2a2523] relative min-h-[240px]">
                    <ImageWithFallback 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-[#7935F8] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-md">
                      Event
                    </div>
                 </div>
                 <div className="p-8 flex-1 flex flex-col justify-center bg-[#1f1c1a]">
                    <div className="space-y-3 mb-6">
                       <h3 className="text-2xl font-bold text-[#e8e0d8] group-hover:text-[#7935F8] transition-colors leading-tight">
                         {item.title}
                       </h3>
                    </div>
                    <div className="space-y-3 text-sm font-semibold text-[#857c73]">
                      <div className="flex items-center gap-3">
                        <CalendarIcon className="w-4 h-4 text-[#7935F8]" />
                        {item.date}
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-[#7935F8]" />
                        {item.location}
                      </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-dashed border-white/[0.08] flex items-center text-sm font-bold text-[#7935F8] group-hover:translate-x-1 transition-transform">
                       View event details <ExternalLink className="w-4 h-4 ml-2" />
                    </div>
                 </div>
               </div>
             </a>
          </div>
        );

      case 'news':
      case 'explore':
        const isNews = item.type === 'news';
        const accentColor = isNews ? "text-blue-600" : "text-orange-600";
        const accentBg = isNews ? "bg-blue-600" : "bg-orange-600";
        const accentGroupHover = isNews ? "group-hover:text-blue-600" : "group-hover:text-orange-600";
        const accentBorderHover = isNews ? "hover:border-blue-500/20" : "hover:border-orange-500/20";
        const accentShadowHover = isNews ? "hover:shadow-blue-500/5" : "hover:shadow-orange-500/5";

        return (
          <div className="space-y-6">
            {item.introMessage && (
              <p className="text-[#e8e0d8] text-lg leading-relaxed whitespace-pre-wrap font-medium">
                {item.introMessage}
              </p>
            )}

            <div className="space-y-4">
              {!item.introMessage && (
                <p className={`text-sm ${accentColor} font-bold uppercase tracking-wide flex items-center gap-2 pl-1`}>
                  <span className={`w-2 h-2 rounded-full ${accentBg} shadow-sm`} />
                  New {isNews ? "News" : "Explore"} • {item.category}
                </p>
              )}
              <a 
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block rounded-xl overflow-hidden border border-white/[0.06] bg-[#1f1c1a] group cursor-pointer transition-colors hover:border-white/[0.12] relative`}
              >
                <ExternalLinkOverlay />
                {item.image && (
                  <div className="aspect-[2.2/1] bg-[#2a2523] overflow-hidden relative">
                     <ImageWithFallback 
                       src={item.image} 
                       alt={item.title} 
                       className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-50 transition-opacity" />
                     <div className="absolute bottom-8 left-8 right-8">
                        <span className={`text-xs font-bold text-white uppercase tracking-wider ${accentBg}/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-white/10 mb-3 inline-block`}>
                          {item.category}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-md">{item.title}</h3>
                     </div>
                  </div>
                )}
                <div className="p-8">
                  <p className="text-[#9e958c] text-lg line-clamp-2 leading-relaxed">{item.excerpt}</p>
                </div>
              </a>
            </div>
          </div>
        );

      case 'directory':
        return (
          <div className="space-y-4">
            <p className="text-xs text-[#066237] font-bold uppercase tracking-wide flex items-center gap-2 pl-1">
               <span className="w-1.5 h-1.5 rounded-full bg-[#066237] shadow-[0_0_8px_rgba(6,98,55,0.5)]" />
              New Listing
            </p>
            <a 
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col md:flex-row gap-8 p-6 rounded-xl bg-[#1f1c1a] border border-white/[0.06] hover:border-white/[0.12] transition-colors cursor-pointer group relative"
            >
              <ExternalLinkOverlay />
              <div className="w-full md:w-48 h-48 md:h-32 rounded-3xl bg-[#2a2523] shrink-0 overflow-hidden shadow-none relative">
                {item.image && (
                   <ImageWithFallback 
                     src={item.image} 
                     alt={item.name} 
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                   />
                )}
              </div>
              <div className="flex-1 min-w-0 py-2 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[#e8e0d8] group-hover:text-[#066237] transition-colors">{item.name}</h3>
                  <div className="bg-[#066237]/10 text-[#066237] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">
                    New
                  </div>
                </div>
                <p className="text-[#e8e0d8]/60 truncate mb-5 text-[15px]">{item.location?.city}, {item.location?.country}</p>
                <div className="flex flex-wrap gap-2">
                   {item.tags?.slice(0, 3).map((tag: string, i: number) => (
                     <span key={i} className="px-3.5 py-1.5 rounded-lg bg-[#1f1c1a] border border-white/[0.06] text-xs font-medium text-[#e8e0d8]/70 group-hover:bg-[#066237]/5 group-hover:text-[#066237] group-hover:border-[#066237]/10 transition-colors">
                       {tag}
                     </span>
                   ))}
                </div>
              </div>
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  const visibleComments = showAllComments ? comments : comments.slice(0, 3);

  return (
    <div className="bg-[#252220] rounded-2xl p-5 md:p-6 border border-white/[0.06] relative group/card-wrapper">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className={`w-8 h-8 rounded-full ${item.author.avatar || 'bg-[#352f2c]'} flex items-center justify-center text-[10px] font-bold`}>
          {item.author.name === "FTO Community Team" ? "FTO" : item.author.name[0]}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-[#e8e0d8] text-xs">{item.author.name}</span>
          <span className="w-1 h-1 rounded-full bg-[#3a3530]" />
          <span className="text-[#6b635b] text-xs">{item.timestamp || new Date(item.publishedAt || Date.now()).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Content */}
      <div className="mb-5">
        {renderContent()}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-1">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 ${isLiked ? 'text-red-400' : 'text-[#6b635b] hover:text-red-400'}`}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
            {likeCount}
          </button>

          <button
            onClick={() => setShowCommentInput(!showCommentInput)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${showCommentInput ? 'text-[#7935F8]' : 'text-[#6b635b] hover:text-[#7935F8]'}`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            {comments.length}
          </button>
        </div>

        <button
          onClick={handleBookmark}
          className={`p-1.5 rounded-full transition-all active:scale-95 ${isBookmarked ? 'text-[#7935F8]' : 'text-[#6b635b] hover:text-[#7935F8]'}`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Comments Section */}
      {(comments.length > 0 || showCommentInput) && (
        <div className="mt-5 pt-5 border-t border-white/[0.06] space-y-5 animate-in slide-in-from-top-2 duration-300">
          {comments.length > 0 && (
            <div className="space-y-4 pl-0 md:pl-2">
              {visibleComments.map((comment: any) => (
                <div key={comment.id} className="flex gap-4 group">
                  <div className={`w-7 h-7 rounded-full ${comment.avatar} flex items-center justify-center text-[9px] font-bold shrink-0`}>
                    {comment.user[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="font-semibold text-xs text-[#b8afa6]">{comment.user}</span>
                    </div>
                    <p className="text-[#9e958c] text-sm leading-relaxed">{comment.text}</p>
                  </div>
                </div>
              ))}
              
              {comments.length > 3 && (
                <button 
                  onClick={() => setShowAllComments(!showAllComments)}
                  className="text-sm text-[#857c73] hover:text-[#e8e0d8] font-semibold pl-14 flex items-center gap-1 group transition-colors"
                >
                  {showAllComments ? "Show less" : `View all ${comments.length} comments`}
                </button>
              )}
            </div>
          )}

          {showCommentInput && (
            <div className="flex items-center gap-4 pt-2 animate-in fade-in duration-200">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7935F8] to-[#B197FF] text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                GU
              </div>
              <div className="flex-1 relative group/input">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                  placeholder="Share your thoughts..."
                  autoFocus
                  className="w-full bg-[#2a2523] border border-white/10 rounded-full py-3 pl-5 pr-12 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#7935F8]/30 focus:border-[#7935F8]/30 transition-all placeholder:text-[#524b45]"
                />
                <button 
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#7935F8] text-white disabled:opacity-30 disabled:bg-[#2a2523] transition-all hover:bg-[#6929d6] active:scale-95"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
