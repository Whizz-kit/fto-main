import { useState, useEffect, useRef, useMemo } from "react";
import { ArrowRight, Users, BookOpen, Calendar, MapPin, MessageCircle, Search, X, Sparkles, Newspaper } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Navigation } from "../Navigation";
import { Footer } from "../Footer";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { FadeInSection, StaggerContainer, StaggerItem } from "../FadeInSection";
import { SEO } from "../SEO";
// SEO component uses native DOM APIs for meta tag management
import fallbackImage from "figma:asset/045041457457f607eca32c5c5e7a7a719b2695c7.webp";
import { useContent } from "../../hooks/useContent";
import { Listing, Event, NewsArticle, KnowledgeArticle } from "../../data/types";
import { mockListings } from "../../data/mockListings";
import { mockEvents, mockNews, mockKnowledge } from "../../data/mockContent";
import { cleanEssence } from "../../utils/cleanData";

// Directory fallback image - don't show listings with this image on home page
const FALLBACK_IMAGE_URL = fallbackImage;

interface HomePageProps {
  onNavigate: (page: string) => void;
  onNewsClick?: (id: string) => void;
  onListingClick?: (listing: Listing) => void;
  onCommunityClick: () => void;
  onExploreCategory: (category: string) => void;
  onNewsArticleClick: (articleId: string) => void;
  onExploreArticleClick: (articleId: string, category: string) => void;
  onEventClick?: (eventId: string) => void;
  onSubmitClick: () => void;
  onSearch?: (query: string) => void;
}

export function HomePage({
  onNavigate,
  onNewsClick,
  onListingClick,
  onCommunityClick,
  onExploreCategory,
  onNewsArticleClick,
  onExploreArticleClick,
  onEventClick,
  onSubmitClick,
  onSearch,
  featuredListings = [],
  upcomingEvents = [],
  latestNews = []
}: HomePageProps & { featuredListings?: Listing[], upcomingEvents?: Event[], latestNews?: NewsArticle[] }) {
  // Use props for data
  const [activeListings, setActiveListings] = useState<Listing[]>(featuredListings);
  const [activeEvents, setActiveEvents] = useState<Event[]>(upcomingEvents);
  const [activeNews, setActiveNews] = useState<NewsArticle[]>(latestNews);
  
  // Also keep mock data available for search fallback if needed, but primary display comes from props
  const { data: allListings } = useContent<Listing>('listings');
  const { data: allKnowledge } = useContent<KnowledgeArticle>('knowledge');
  const { data: allNews } = useContent<NewsArticle>('news');

  // Define activeKnowledge for search logic usage
  const activeKnowledge = allKnowledge.length > 0 ? allKnowledge : mockKnowledge;

  const [displayListings, setDisplayListings] = useState<Listing[]>([]);
  const [displayEvents, setDisplayEvents] = useState<Event[]>([]);
  const [displayNews, setDisplayNews] = useState<NewsArticle[]>([]);
  
  // Update local state when props change
  useEffect(() => {
    setActiveListings(featuredListings.length > 0 ? featuredListings : mockListings);
    setActiveEvents(upcomingEvents.length > 0 ? upcomingEvents : mockEvents);
    setActiveNews(latestNews.length > 0 ? latestNews : mockNews);
  }, [featuredListings, upcomingEvents, latestNews]);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Typewriter effect state
  const [placeholderText, setPlaceholderText] = useState("Find ");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const [searchResults, setSearchResults] = useState<{
    communities: Listing[];
    explore: KnowledgeArticle[];
    news: NewsArticle[];
  }>({ communities: [], explore: [], news: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const PHRASES = [
    "retreats in Costa Rica",
    "breathwork practices",
    "meditation teachers",
    "consciousness communities",
    "transformative experiences",
    "local gatherings"
  ];

  // Typewriter effect logic
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % PHRASES.length;
      const fullText = "Find " + PHRASES[i];
      
      setPlaceholderText(
        isDeleting 
          ? fullText.substring(0, placeholderText.length - 1) 
          : fullText.substring(0, placeholderText.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && placeholderText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500); // Pause at end
      } else if (isDeleting && placeholderText === "Find ") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [placeholderText, isDeleting, loopNum, typingSpeed]);

  useEffect(() => {
    // Process data for display (using the props data)
    // If props are empty (initial load), we might fall back to mock data inside the setActive calls above
    
    // For featured listings, sort by review count (popularity) and take top 4
    const topListings = [...activeListings]
      .filter(l => l.image && !l.image.includes('placeholder'))
      .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
      .slice(0, 4);
    setDisplayListings(topListings.length > 0 ? topListings : activeListings.slice(0, 4));

    // For events, sort by date
    const upcoming = [...activeEvents]
      .filter(e => new Date(e.startDate) >= new Date())
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(0, 3);
    setDisplayEvents(upcoming);

    // For news, sort by date
    const latest = [...activeNews]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 3);
    setDisplayNews(latest);
  }, [activeListings, activeEvents, activeNews]);

  // Search Logic with "AI" feel
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults({ communities: [], explore: [], news: [] });
      setAiMessage("");
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setAiMessage("");

    // Use the full datasets for search, falling back to mock if needed
    const searchListings = allListings.length > 0 ? allListings : mockListings;
    const searchKnowledge = allKnowledge.length > 0 ? allKnowledge : mockKnowledge;
    const searchNews = allNews.length > 0 ? allNews : mockNews;

    // Simulate "thinking" delay
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase();

      let communities = searchListings.filter(l => 
        l.name.toLowerCase().includes(query) || 
        l.category.toLowerCase().includes(query) ||
        l.tags?.some(t => t.toLowerCase().includes(query))
      ).slice(0, 3);

      let explore = searchKnowledge.filter(k => 
        k.title.toLowerCase().includes(query) || 
        k.category.toLowerCase().includes(query)
      ).slice(0, 3);

      let news = searchNews.filter(n => 
        n.title.toLowerCase().includes(query)
      ).slice(0, 3);

      const totalFound = communities.length + explore.length + news.length;

      // "AI" Logic: If no results, find "related" (random/popular for mock)
      if (totalFound === 0) {
        communities = activeListings.slice(0, 2);
        explore = activeKnowledge.slice(0, 2);
        
        setAiMessage(`I couldn't find an exact match for "${searchQuery}", but here are some related suggestions you might like:`);
      } else {
        // Construct a natural language summary
        const parts = [];
        if (communities.length) parts.push(`${communities.length} communit${communities.length > 1 ? 'ies' : 'y'}`);
        if (explore.length) parts.push(`${explore.length} resource${explore.length > 1 ? 's' : ''}`);
        if (news.length) parts.push(`${news.length} stor${news.length > 1 ? 'ies' : 'y'}`);
        
        const summary = parts.join(' and ');
        setAiMessage(`I found ${summary} matching "${searchQuery}" for you.`);
      }

      setSearchResults({ communities, explore, news });
      setIsSearching(false);
    }, 600); // 600ms delay for "AI thinking" effect

    return () => clearTimeout(timer);
  }, [searchQuery, activeListings, activeKnowledge, activeNews]);

  // Click outside to close search
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch?.(searchQuery);
    }
  };

  return (
    <>
      <SEO 
        title="Home"
        description="A curated ecosystem for consciousness, transformation, and human connection. Explore communities, wisdom, events, and tools for deeper awareness."
        keywords={["consciousness", "transformation", "community", "awareness", "wisdom", "retreats", "breathwork", "meditation"]}
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Find The Others",
          "url": "https://findtheothers.world",
          "logo": "https://findtheothers.world/logo.webp",
          "description": "A curated ecosystem for consciousness, transformation, and human connection.",
          "sameAs": [
            "https://instagram.com/findtheothers",
            "https://discord.com/invite/jXewfMFr4s"
          ]
        }}
      />
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
        <div className="pointer-events-auto">
          <Navigation 
            onNavigate={onNavigate}
            onCommunityClick={onCommunityClick}
            currentPage="home"
          />
        </div>
      </div>

      <div className="min-h-screen bg-[#FCF8F3]">
        {/* Hero Section — Cinematic */}
        <section className="h-[100svh] min-h-[580px] flex flex-col items-center justify-center relative px-4">
          {/* Video Background */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            >
              <source src="https://s3.amazonaws.com/webflow-prod-assets/6794d3433a800e0004578b50/680a5aab8b1e4d87f65b4008_Tranquil%20Meadow%20Scene%20Animation%20(4).mp4" type="video/mp4" />
            </video>

            {/* Subtle cinematic overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#043820]/80 via-[#043820]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#7935F8]/15 via-transparent to-transparent" />
          </div>

          <div className="w-full max-w-3xl mx-auto text-center space-y-6 md:space-y-10 relative z-20 pt-16">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-3xl md:text-5xl lg:text-6xl text-white tracking-tight font-semibold leading-[1.1]">
                Expand your consciousness
              </h1>
              <p className="text-sm md:text-base text-white/50 max-w-lg mx-auto leading-relaxed font-normal">
                A curated world of communities, wisdom, experiences, and tools for people exploring what it means to be truly awake
              </p>
            </div>

            {/* Search — Glassmorphism */}
            <div className="max-w-md mx-auto w-full" ref={searchContainerRef}>
              <div className="relative">
                <div
                  className={`
                    relative flex items-center gap-3 px-4 py-3 rounded-full
                    transition-all duration-500
                    ${isSearchFocused
                      ? 'bg-white/95 shadow-2xl backdrop-blur-xl'
                      : 'bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:border-white/30'
                    }
                  `}
                >
                  <Search className={`w-4 h-4 flex-shrink-0 transition-colors ${isSearchFocused ? 'text-gray-400' : 'text-white/50'}`} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholderText}
                    className={`flex-1 bg-transparent border-none outline-none text-base w-full font-normal focus:ring-0 focus:outline-none focus:border-none transition-colors ${isSearchFocused ? 'text-gray-900 placeholder:text-gray-400' : 'text-white placeholder:text-white/40'}`}
                    style={{ boxShadow: 'none', outline: 'none' }}
                  />
                  <div className="flex items-center gap-2">
                    {searchQuery && (
                      <button 
                        onClick={() => {
                          setSearchQuery("");
                          setSearchResults({ communities: [], explore: [], news: [] });
                        }}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => onSearch?.(searchQuery)}
                      className={`p-2.5 rounded-full transition-all active:scale-95 ${isSearchFocused ? 'bg-[#7935F8] text-white hover:bg-[#6929d6]' : 'bg-white/20 text-white hover:bg-white/30'}`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Search Results Dropdown */}
                {isSearchFocused && searchQuery && (
                  <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left z-50 ring-1 ring-black/5">
                     
                     {/* AI / Status Message Header */}
                     <div className="bg-[#FCF8F3] px-5 py-4 border-b border-[#066237]/5">
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 w-6 h-6 rounded-full bg-[#7935F8]/10 flex items-center justify-center flex-shrink-0 ${isSearching ? 'animate-pulse' : ''}`}>
                            <Sparkles className="w-3.5 h-3.5 text-[#7935F8]" />
                          </div>
                          <p className="text-sm text-[#066237] leading-relaxed font-medium">
                            {isSearching ? (
                              <span className="animate-pulse">Looking for the best matches...</span>
                            ) : (
                              aiMessage
                            )}
                          </p>
                        </div>
                     </div>

                     <div className="max-h-[60vh] overflow-y-auto">
                      {!isSearching && (
                        <div className="py-2">
                          {/* Communities */}
                        {searchResults.communities.length > 0 && (
                          <div className="mb-2">
                            <h3 className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                              <Users className="w-3 h-3" /> Communities
                            </h3>
                            {searchResults.communities.map(listing => (
                              <button
                                key={listing.id}
                                onClick={() => onListingClick?.(listing)}
                                className="w-full px-5 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                              >
                                <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100">
                                  {listing.image ? (
                                    <ImageWithFallback src={listing.image} alt={listing.name} className="w-full h-full object-cover" />
                                  ) : (
                                    <Users className="w-5 h-5 text-gray-400 m-auto" />
                                  )}
                                </div>
                                <div className="flex-1 text-left min-w-0">
                                  <p className="font-medium text-gray-900 truncate">{listing.name}</p>
                                  <p className="text-sm text-gray-500 truncate">{listing.category} • {listing.location?.city}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Explore */}
                        {searchResults.explore.length > 0 && (
                          <div className="mb-2">
                            <h3 className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                              <Sparkles className="w-3 h-3" /> Explore
                            </h3>
                            {searchResults.explore.map(item => (
                              <button
                                key={item.id}
                                onClick={() => onExploreArticleClick?.(item.id, item.category)}
                                className="w-full px-5 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                              >
                                <div className="w-10 h-10 rounded-lg bg-[#066237]/10 flex items-center justify-center flex-shrink-0">
                                  <BookOpen className="w-5 h-5 text-[#066237]" />
                                </div>
                                <div className="flex-1 text-left min-w-0">
                                  <p className="font-medium text-gray-900 truncate">{item.title}</p>
                                  <p className="text-sm text-gray-500 line-clamp-1">{item.excerpt}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* News */}
                        {searchResults.news.length > 0 && (
                          <div>
                            <h3 className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                              <Newspaper className="w-3 h-3" /> News
                            </h3>
                            {searchResults.news.map(item => (
                              <button
                                key={item.id}
                                onClick={() => onNewsArticleClick?.(item.id)}
                                className="w-full px-5 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                              >
                                <div className="w-10 h-10 rounded-lg bg-[#7935F8]/10 flex items-center justify-center flex-shrink-0">
                                  <Newspaper className="w-5 h-5 text-[#7935F8]" />
                                </div>
                                <div className="flex-1 text-left min-w-0">
                                  <p className="font-medium text-gray-900 truncate">{item.title}</p>
                                  <p className="text-sm text-gray-500 line-clamp-1">{item.excerpt}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      )}
                     </div>
                     {/* Footer of search results */}
                   <div className="bg-gray-50 p-3 text-center border-t border-gray-100">
                      <button 
                        onClick={() => onSearch?.(searchQuery)}
                        className="text-sm text-[#7935F8] font-medium hover:underline flex items-center justify-center gap-1 w-full"
                      >
                        View all results for "{searchQuery}" <ArrowRight className="w-3 h-3" />
                      </button>
                   </div>
                  </div>
                )}
              </div>

              {/* Minimal nav links */}
              <div className={`flex items-center justify-center gap-8 mt-6 transition-all duration-500 ${searchQuery ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                 <button
                   onClick={() => onNavigate("directory")}
                   className="text-white/60 hover:text-white text-sm font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white/60 hover:after:w-full after:transition-all"
                 >
                   Directory
                 </button>
                 <span className="w-px h-3 bg-white/20" />
                 <button
                   onClick={() => onNavigate("explore")}
                   className="text-white/60 hover:text-white text-sm font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white/60 hover:after:w-full after:transition-all"
                 >
                   Explore
                 </button>
                 <span className="w-px h-3 bg-white/20" />
                 <button
                   onClick={() => onNavigate("events")}
                   className="text-white/60 hover:text-white text-sm font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white/60 hover:after:w-full after:transition-all"
                 >
                   Events
                 </button>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
              <div className="w-1 h-2.5 rounded-full bg-white/60" />
            </div>
          </div>
        </section>

        {/* Are you one of the others? - SWAPPED POSITION: Now immediately after Hero */}
        <section className="py-20 md:py-28 px-4 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <FadeInSection>
            <div className="text-center mb-14 space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                Are you one of the others?
              </h2>
              <p className="text-muted-foreground text-base max-w-md mx-auto">
                Three ways to go deeper
              </p>
            </div>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Join the community */}
              <FadeInSection delay={0}>
              <div className="bg-[#FCF8F3] rounded-2xl p-8 space-y-6 flex flex-col items-start text-left h-full group hover:shadow-lg transition-all duration-500">
                <div className="w-11 h-11 rounded-xl bg-[#7935F8]/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-[#7935F8]" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-semibold tracking-tight text-[#101010]">Join the community</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Connect with people exploring the same questions and find real support.
                  </p>
                </div>
                <button
                  onClick={onCommunityClick}
                  className="flex items-center gap-2 text-[#7935F8] text-sm font-medium group-hover:gap-3 transition-all"
                >
                  Join now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              </FadeInSection>

              {/* Explore and grow */}
              <FadeInSection delay={0.1}>
              <div className="bg-[#066237] rounded-2xl p-8 space-y-6 flex flex-col items-start text-left text-white h-full group hover:shadow-lg transition-all duration-500">
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-semibold tracking-tight">Explore and grow</h3>
                  <p className="text-white/70 leading-relaxed text-sm">
                    Dive into articles, practices, and ideas that deepen your awareness.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate("explore")}
                  className="flex items-center gap-2 text-white/80 text-sm font-medium group-hover:gap-3 group-hover:text-white transition-all"
                >
                  Start exploring
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              </FadeInSection>

              {/* Discover experiences */}
              <FadeInSection delay={0.2}>
              <div className="bg-[#B197FF] rounded-2xl p-8 space-y-6 flex flex-col items-start text-left text-white h-full group hover:shadow-lg transition-all duration-500">
                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-semibold tracking-tight">Discover experiences</h3>
                  <p className="text-white/80 leading-relaxed text-sm">
                    Find retreats, workshops, and gatherings that create space for transformation.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate("events")}
                  className="flex items-center gap-2 text-white/80 text-sm font-medium group-hover:gap-3 group-hover:text-white transition-all"
                >
                  View events
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* Featured Listings (Discover Communities) */}
        {displayListings.length > 0 && (
          <section className="py-20 md:py-24 2xl:py-32 bg-[#101010]">
            <div className="max-w-7xl mx-auto px-4">
              <FadeInSection>
              <div className="flex justify-between items-end mb-12 2xl:mb-16">
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl xl:text-5xl text-white tracking-tight font-semibold">
                    Discover Communities
                  </h2>
                  <p className="text-white/60 text-lg md:text-xl font-medium">
                    Connect with aligned spaces & practitioners
                  </p>
                </div>
                <Button
                  onClick={() => onNavigate("directory")}
                  variant="outline"
                  className="rounded-full hidden lg:flex border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white/50 hover:text-white px-8 h-12"
                >
                  Browse Directory
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              </FadeInSection>

              {/* Mobile: Horizontal Scroll */}
              <div className="lg:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide">
                <div className="flex gap-5 pb-4">
                  {displayListings.map((listing) => (
                    <div
                      key={listing.id}
                      onClick={() => onListingClick?.(listing)}
                      className="group cursor-pointer bg-white rounded-[2rem] overflow-hidden hover:shadow-lg transition-all duration-300 flex-shrink-0 w-[300px] h-[420px] flex flex-col"
                    >
                      <div className="h-[65%] w-full bg-gray-900 relative overflow-hidden">
                        {listing.image && (
                          <ImageWithFallback
                            src={listing.image}
                            alt={listing.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute top-4 right-4">
                          <span className="bg-white/95 backdrop-blur-sm text-[#7935F8] text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                            {listing.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-center space-y-2">
                        <h3 className="text-lg font-semibold text-black group-hover:text-[#7935F8] transition-colors line-clamp-1">
                          {listing.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                          <MapPin className="w-4 h-4 text-[#7935F8]" />
                          <span className="line-clamp-1">
                            {listing.location?.city}, {listing.location?.country}
                          </span>
                        </div>
                        {listing.essence && (
                          <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed mt-1">
                            {cleanEssence(listing.essence, listing.about)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop: Grid with staggered animation */}
              <StaggerContainer className="hidden lg:grid lg:grid-cols-4 gap-6" staggerDelay={0.12}>
                {featuredListings.map((listing) => (
                  <StaggerItem key={listing.id}>
                  <div
                    onClick={() => onListingClick?.(listing)}
                    className="group cursor-pointer bg-white rounded-[2rem] overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-[460px]"
                  >
                    <div className="h-[65%] w-full bg-gray-900 relative overflow-hidden">
                      {listing.image && (
                        <ImageWithFallback
                          src={listing.image}
                          alt={listing.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/95 backdrop-blur-sm text-[#7935F8] text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                          {listing.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-center space-y-2 relative">
                      <h3 className="text-lg font-semibold text-black group-hover:text-[#7935F8] transition-colors line-clamp-1">
                        {listing.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                        <MapPin className="w-4 h-4 text-[#7935F8]" />
                        <span className="line-clamp-1">
                          {listing.location?.city}, {listing.location?.country}
                        </span>
                      </div>
                      {listing.essence && (
                        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed mt-1">
                          {listing.essence}
                        </p>
                      )}
                    </div>
                  </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <div className="mt-12 text-center lg:hidden">
                <Button
                  onClick={() => onNavigate("directory")}
                  variant="outline"
                  className="rounded-full border-white/30 text-white bg-transparent hover:bg-white/10 px-8 py-6"
                >
                  Browse Directory
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Latest News */}
        {displayNews.length > 0 && (
          <section className="py-32 px-4 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <FadeInSection>
              <div className="flex justify-between items-end mb-16">
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
                    Latest News
                  </h2>
                  <p className="text-muted-foreground text-lg md:text-xl font-medium">
                    Stories from the consciousness community
                  </p>
                </div>
                <Button
                  onClick={() => onNavigate("news")}
                  variant="outline"
                  className="rounded-full hidden lg:flex border-[#7935F8]/20 hover:bg-[#7935F8]/5 hover:border-[#7935F8]/40 h-12 px-8"
                >
                  View All News
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              </FadeInSection>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                {/* Featured Article - Main Focus */}
                {displayNews[0] && (
                  <FadeInSection className="lg:col-span-7 xl:col-span-8">
                  <div
                    onClick={() => onNewsArticleClick(displayNews[0].id)}
                    className="group cursor-pointer relative overflow-hidden rounded-[2.5rem] bg-gray-900 min-h-[500px] lg:min-h-full aspect-[4/3] lg:aspect-auto isolate shadow-md hover:shadow-2xl transition-all duration-500"
                  >
                    {displayNews[0].image && (
                      <img 
                        src={displayNews[0].image} 
                        alt={displayNews[0].title}
                        className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 space-y-4 md:space-y-6 max-w-3xl">
                      {displayNews[0].category && (
                        <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md px-4 py-1.5 text-sm">
                          {displayNews[0].category}
                        </Badge>
                      )}
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                        {displayNews[0].title}
                      </h3>
                      {displayNews[0].excerpt && (
                        <p className="text-lg text-white/80 line-clamp-2 md:line-clamp-3 max-w-2xl leading-relaxed">
                          {displayNews[0].excerpt}
                        </p>
                      )}
                      <div className="pt-2 flex items-center text-white font-medium group-hover:gap-3 transition-all">
                        <span>Read full story</span>
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </div>
                    </div>
                  </div>
                  </FadeInSection>
                )}

                {/* Side Articles - Vertical Stack */}
                <FadeInSection delay={0.2} className="lg:col-span-5 xl:col-span-4">
                <div className="flex flex-col gap-6 lg:gap-8 h-full">
                  {displayNews.slice(1, 3).map((article) => (
                    <div
                      key={article.id}
                      onClick={() => onNewsArticleClick(article.id)}
                      className="bg-[#FCF8F3] rounded-[2.5rem] p-8 flex flex-col justify-center gap-4 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex-1 border border-transparent hover:border-[#7935F8]/10 relative overflow-hidden"
                    >
                      {/* Decorative background blob */}
                      <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#7935F8]/5 rounded-full blur-3xl group-hover:bg-[#7935F8]/10 transition-colors" />
                      
                      <div className="flex justify-between items-start gap-4 relative z-10">
                        <div className="space-y-3 flex-1">
                          {article.category && (
                            <Badge variant="outline" className="border-[#7935F8]/20 text-[#7935F8] bg-white/50">
                              {article.category}
                            </Badge>
                          )}
                          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-[#7935F8] transition-colors leading-tight">
                            {article.title}
                          </h3>
                        </div>
                        {article.image && (
                          <div className="w-24 h-24 rounded-2xl bg-gray-200 overflow-hidden flex-shrink-0 shadow-sm border border-white/50">
                            <img 
                              src={article.image} 
                              alt={article.title} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                            />
                          </div>
                        )}
                      </div>
                      <div className="relative z-10">
                        {article.excerpt && (
                          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                            {article.excerpt}
                          </p>
                        )}
                        <div className="mt-4 pt-2 flex items-center text-[#7935F8] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                          Read article <ArrowRight className="w-3 h-3 ml-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                </FadeInSection>
              </div>

              <div className="mt-10 text-center lg:hidden">
                <Button
                  onClick={() => onNavigate("news")}
                  variant="outline"
                  className="rounded-full border-[#7935F8]/20 hover:bg-[#7935F8]/5 hover:border-[#7935F8]/40"
                >
                  View All News
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Upcoming Events */}
        {displayEvents.length > 0 && (
          <section className="py-32 px-4 bg-[#FCF8F3]">
            <div className="max-w-7xl mx-auto px-4">
              <FadeInSection>
              <div className="flex justify-between items-end mb-16">
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
                    Upcoming Events
                  </h2>
                  <p className="text-muted-foreground text-lg md:text-xl font-medium">
                    Retreats, workshops & ceremonies
                  </p>
                </div>
                <Button
                  onClick={() => onNavigate("events")}
                  variant="outline"
                  className="rounded-full hidden lg:flex border-[#7935F8]/20 hover:bg-[#7935F8]/5 hover:border-[#7935F8]/40 h-12 px-8"
                >
                  View All Events
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              </FadeInSection>

              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.12}>
                {displayEvents.map((event) => (
                  <StaggerItem key={event.id}>
                  <div
                    className="bg-white rounded-[2rem] overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full flex flex-col group hover:shadow-xl border border-transparent hover:border-[#7935F8]/10"
                    onClick={() => onEventClick ? onEventClick(event.id) : onNavigate("events")}
                  >
                    {event.image && (
                      <div className="aspect-[4/3] bg-gradient-to-br from-[#066237] to-[#1ADF83] relative overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                           <div className="bg-white/95 backdrop-blur-md text-[#066237] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider">
                              {event.type || 'Event'}
                           </div>
                        </div>
                      </div>
                    )}
                    <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-[#7935F8] font-bold uppercase tracking-wider">
                          <Calendar className="w-4 h-4" />
                          {new Date(event.startDate).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <h3 className="text-2xl font-bold line-clamp-2 leading-tight group-hover:text-[#7935F8] transition-colors">
                          {event.title}
                        </h3>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-base text-muted-foreground border-t border-gray-100 pt-4">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          {event.location.city ? `${event.location.city}, ${event.location.country}` : 'Online'}
                        </div>
                      )}
                    </div>
                  </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <div className="mt-10 text-center lg:hidden">
                <Button
                  onClick={() => onNavigate("events")}
                  variant="outline"
                  className="rounded-full border-[#7935F8]/20 hover:bg-[#7935F8]/5 hover:border-[#7935F8]/40"
                >
                  View All Events
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <Footer onNavigate={onNavigate} onCommunityClick={onCommunityClick} />
      </div>
    </>
  );
}