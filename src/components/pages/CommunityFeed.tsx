import { useState, useEffect, useRef } from "react";
import { 
  MessageCircle, Bookmark, Heart, Bell, Send, MoreHorizontal, Sparkles, 
  ExternalLink, Calendar as CalendarIcon, MapPin, PenSquare, Filter, 
  ChevronDown, Check, Megaphone, Compass, Store, Newspaper
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { toast } from "sonner";
import { Button } from "../ui/button";

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
      <div className="w-full max-w-5xl mx-auto space-y-8 pt-8">
        <div className="flex items-center justify-between pb-6">
           <div className="space-y-3">
             <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse" />
             <div className="h-5 w-96 bg-gray-100 rounded-lg animate-pulse" />
           </div>
           <div className="flex gap-4">
              <div className="w-32 h-12 bg-gray-200 rounded-full animate-pulse" />
              <div className="w-40 h-12 bg-gray-200 rounded-full animate-pulse" />
           </div>
        </div>
        {[1, 2].map(i => (
          <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-[#101010]/5 space-y-6">
             <div className="flex items-center gap-4">
               <div className="w-14 h-14 rounded-full bg-gray-100 animate-pulse" />
               <div className="space-y-2 flex-1">
                 <div className="h-5 w-48 bg-gray-100 rounded animate-pulse" />
                 <div className="h-4 w-32 bg-gray-50 rounded animate-pulse" />
               </div>
             </div>
             <div className="h-48 w-full bg-gray-50 rounded-3xl animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col gap-6 px-1 pt-4 md:pt-0">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-[#101010] tracking-tight">
            Latest Updates
          </h2>
          <p className="text-[#101010]/40 text-sm leading-relaxed max-w-lg">
            Community highlights, events, and announcements from Find The Others.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Pill Filters */}
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`
                  flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all
                  ${isActive
                    ? 'bg-[#066237] text-white'
                    : 'bg-white border border-[#101010]/8 text-[#101010]/60 hover:text-[#101010] hover:border-[#101010]/15'}
                `}
              >
                <Icon className="w-3.5 h-3.5" />
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-8 min-h-[50vh]">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
               <FeedCard item={item} />
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#101010]/5">
            <div className="w-14 h-14 bg-[#FCF8F3] rounded-full flex items-center justify-center mx-auto mb-4 text-[#101010]/30">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#101010]">No updates found</h3>
            <p className="text-[#101010]/40 text-sm mt-1.5 max-w-xs mx-auto">
              Nothing in <span className="font-medium text-[#101010]/60">{activeFilterLabel}</span> yet.
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="mt-6 text-sm font-medium text-[#066237] hover:underline"
            >
              Show all updates
            </button>
          </div>
        )}
      </div>
      
      {filteredItems.length > 0 && (
        <div className="py-16 text-center space-y-3">
          <div className="w-10 h-10 bg-[#FCF8F3] rounded-full flex items-center justify-center mx-auto">
            <CheckMark />
          </div>
          <p className="text-[#101010]/40 text-sm">You're all caught up</p>
        </div>
      )}
    </div>
  );
}

function CheckMark() {
  return (
    <svg className="w-5 h-5 text-[#066237]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
    <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm p-3 rounded-full text-[#101010] opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 shadow-md z-20">
      <ExternalLink className="w-5 h-5" />
    </div>
  );

  // Helper to render content based on type
  const renderContent = () => {
    switch (item.type) {
      case 'announcement':
        return (
          <div className="bg-[#FCF8F3] rounded-3xl p-8 border border-[#101010]/5 relative overflow-hidden group/card">
             <div className="absolute top-0 right-0 w-48 h-48 bg-[#066237]/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover/card:bg-[#066237]/10 transition-all duration-700" />
             <div className="flex items-start gap-6 relative z-10">
               <div className="p-4 bg-white rounded-2xl shadow-sm border border-[#101010]/5 shrink-0 text-[#066237]">
                 <Bell className="w-6 h-6" />
               </div>
               <p className="text-[#101010] leading-relaxed whitespace-pre-wrap text-lg pt-1 font-medium">
                 {item.content}
               </p>
             </div>
          </div>
        );

      case 'event':
        return (
          <div className="space-y-6">
             <p className="text-[#101010] text-lg leading-relaxed whitespace-pre-wrap font-medium">
               {item.content}
             </p>
             
             <a 
               href={item.url}
               target="_blank"
               rel="noopener noreferrer"
               className="block rounded-xl overflow-hidden border border-[#101010]/5 bg-white shadow-sm group cursor-pointer transition-all duration-500 hover:border-[#7935F8]/20 hover:shadow-xl hover:shadow-[#7935F8]/5 hover:-translate-y-1 relative"
             >
               <ExternalLinkOverlay />
               <div className="flex flex-col lg:flex-row">
                 <div className="w-full lg:w-[40%] aspect-video lg:aspect-auto bg-gray-100 relative min-h-[240px]">
                    <ImageWithFallback 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-[#7935F8] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-md">
                      Event
                    </div>
                 </div>
                 <div className="p-8 flex-1 flex flex-col justify-center bg-white/50">
                    <div className="space-y-3 mb-6">
                       <h3 className="text-2xl font-bold text-[#101010] group-hover:text-[#7935F8] transition-colors leading-tight">
                         {item.title}
                       </h3>
                    </div>
                    <div className="space-y-3 text-sm font-semibold text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <CalendarIcon className="w-4 h-4 text-[#7935F8]" />
                        {item.date}
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-[#7935F8]" />
                        {item.location}
                      </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-dashed border-[#101010]/10 flex items-center text-sm font-bold text-[#7935F8] group-hover:translate-x-1 transition-transform">
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
              <p className="text-[#101010] text-lg leading-relaxed whitespace-pre-wrap font-medium">
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
                className={`block rounded-xl overflow-hidden border border-[#101010]/5 bg-white shadow-sm group cursor-pointer transition-all duration-500 ${accentBorderHover} hover:shadow-xl ${accentShadowHover} hover:-translate-y-1 relative`}
              >
                <ExternalLinkOverlay />
                {item.image && (
                  <div className="aspect-[2.2/1] bg-gray-100 overflow-hidden relative">
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
                  <p className="text-muted-foreground text-lg line-clamp-2 leading-relaxed">{item.excerpt}</p>
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
              className="flex flex-col md:flex-row gap-8 p-6 rounded-xl bg-white border border-[#101010]/5 hover:border-[#066237]/30 transition-all cursor-pointer group hover:shadow-xl hover:shadow-[#066237]/5 hover:-translate-y-1 duration-500 relative"
            >
              <ExternalLinkOverlay />
              <div className="w-full md:w-48 h-48 md:h-32 rounded-3xl bg-gray-100 shrink-0 overflow-hidden shadow-inner relative">
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
                  <h3 className="text-xl font-bold text-[#101010] group-hover:text-[#066237] transition-colors">{item.name}</h3>
                  <div className="bg-[#066237]/10 text-[#066237] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">
                    New
                  </div>
                </div>
                <p className="text-[#101010]/60 truncate mb-5 text-[15px]">{item.location?.city}, {item.location?.country}</p>
                <div className="flex flex-wrap gap-2">
                   {item.tags?.slice(0, 3).map((tag: string, i: number) => (
                     <span key={i} className="px-3.5 py-1.5 rounded-lg bg-[#FCF8F3] border border-[#101010]/5 text-xs font-medium text-[#101010]/70 group-hover:bg-[#066237]/5 group-hover:text-[#066237] group-hover:border-[#066237]/10 transition-colors">
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
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#101010]/5 transition-all hover:shadow-md relative group/card-wrapper">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${item.author.avatar || 'bg-gray-200'} flex items-center justify-center text-xs font-bold`}>
            {item.author.name === "FTO Community Team" ? "FTO" : item.author.name[0]}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-[#101010]">{item.author.name}</span>
            <span className="w-1 h-1 rounded-full bg-[#101010]/20" />
            <span className="text-[#101010]/40">{item.timestamp || new Date(item.publishedAt || Date.now()).toLocaleDateString()}</span>
          </div>
        </div>

        <button className="p-2 -mr-1 text-[#101010]/20 hover:text-[#101010]/60 rounded-full hover:bg-gray-50 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="mb-5">
        {renderContent()}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-[#101010]/5">
        <div className="flex items-center gap-1">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all active:scale-95 ${isLiked ? 'text-red-500' : 'text-[#101010]/40 hover:text-red-500'}`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            {likeCount}
          </button>

          <button
            onClick={() => setShowCommentInput(!showCommentInput)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all ${showCommentInput ? 'text-[#066237]' : 'text-[#101010]/40 hover:text-[#066237]'}`}
          >
            <MessageCircle className="w-4 h-4" />
            {comments.length}
          </button>
        </div>

        <button
          onClick={handleBookmark}
          className={`p-2 rounded-full transition-all active:scale-95 ${isBookmarked ? 'text-[#7935F8]' : 'text-[#101010]/30 hover:text-[#7935F8]'}`}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Comments Section */}
      {(comments.length > 0 || showCommentInput) && (
        <div className="mt-6 pt-6 border-t border-dashed border-[#101010]/10 space-y-6 animate-in slide-in-from-top-2 duration-300">
          {comments.length > 0 && (
            <div className="space-y-4 pl-0 md:pl-2">
              {visibleComments.map((comment: any) => (
                <div key={comment.id} className="flex gap-4 group">
                  <div className={`w-10 h-10 rounded-full ${comment.avatar} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm mt-0.5`}>
                    {comment.user[0]}
                  </div>
                  <div className="flex-1">
                    <div className="bg-[#FCF8F3] rounded-2xl rounded-tl-none px-6 py-4 inline-block min-w-[200px] max-w-full hover:bg-[#f5efe6] transition-colors">
                      <span className="font-bold text-sm block mb-1 text-[#101010]">{comment.user}</span>
                      <span className="text-[#101010]/80 text-[15px] leading-relaxed">{comment.text}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {comments.length > 3 && (
                <button 
                  onClick={() => setShowAllComments(!showAllComments)}
                  className="text-sm text-muted-foreground hover:text-[#101010] font-semibold pl-14 flex items-center gap-1 group transition-colors"
                >
                  {showAllComments ? "Show less" : `View all ${comments.length} comments`}
                </button>
              )}
            </div>
          )}

          {showCommentInput && (
            <div className="flex items-center gap-4 pt-2 animate-in fade-in duration-200">
              <div className="w-10 h-10 rounded-full bg-[#066237] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm ring-4 ring-[#066237]/5">
                ME
              </div>
              <div className="flex-1 relative group/input">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                  placeholder="Share your thoughts..."
                  autoFocus
                  className="w-full bg-white border border-[#101010]/10 rounded-full py-3.5 pl-6 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-[#066237]/10 focus:border-[#066237] transition-all shadow-sm group-hover/input:shadow-md placeholder:text-muted-foreground/50"
                />
                <button 
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#066237] text-white disabled:opacity-50 disabled:bg-gray-200 disabled:text-gray-400 transition-all hover:bg-[#05502d] hover:scale-105 active:scale-95 shadow-sm"
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
