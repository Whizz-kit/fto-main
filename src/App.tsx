import { useState, useEffect, useMemo, lazy, Suspense } from "react";
// UI imports
import { Toaster } from "./components/ui/sonner";
import { ErrorBoundary } from "./components/shared/ErrorBoundary";
import { Navigation } from "./components/layout/Navigation";
import { DirectoryHome } from "./components/directory/DirectoryHome";
import { ResultsGrid } from "./components/directory/ResultsGrid";
import { ProfileDetail } from "./components/directory/ProfileDetail";
import { InlineFilters } from "./components/directory/InlineFilters";
import { SubmitModal } from "./components/modals/SubmitModal";
import { DiscordSignupModal } from "./components/modals/DiscordSignupModal";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./components/pages/HomePage";
import { ScrollToTop } from "./components/shared/ScrollToTop";

// Lazy-loaded pages for code splitting
const AboutPage = lazy(() => import("./components/pages/AboutPage").then(m => ({ default: m.AboutPage })));
const TeamPage = lazy(() => import("./components/pages/TeamPage").then(m => ({ default: m.TeamPage })));
const NewsPage = lazy(() => import("./components/pages/NewsPage").then(m => ({ default: m.NewsPage })));
const NewsArticleDetail = lazy(() => import("./components/pages/NewsArticleDetail").then(m => ({ default: m.NewsArticleDetail })));
const EventsPage = lazy(() => import("./components/pages/EventsPage").then(m => ({ default: m.EventsPage })));
const EventDetailPage = lazy(() => import("./components/pages/EventDetailPage").then(m => ({ default: m.EventDetailPage })));
const ExplorePage = lazy(() => import("./components/pages/ExplorePage").then(m => ({ default: m.ExplorePage })));
const ExploreCategoryPage = lazy(() => import("./components/pages/ExploreCategoryPage").then(m => ({ default: m.ExploreCategoryPage })));
const KnowledgeArticleDetail = lazy(() => import("./components/pages/KnowledgeArticleDetail").then(m => ({ default: m.KnowledgeArticleDetail })));
const RoadmapPage = lazy(() => import("./components/pages/RoadmapPage").then(m => ({ default: m.RoadmapPage })));
const SearchResultsPage = lazy(() => import("./components/pages/SearchResultsPage").then(m => ({ default: m.SearchResultsPage })));
const CommunityPage = lazy(() => import("./components/pages/community/CommunityPage").then(m => ({ default: m.CommunityPage })));
const AdminPage = lazy(() => import("./components/pages/AdminPage").then(m => ({ default: m.AdminPage })));
import { ListingGridSkeleton } from "./components/directory/ListingCardSkeleton";
import { Listing, FilterType, Event, NewsArticle, KnowledgeArticle, ensureUniqueSlugs } from "./data/types";
import { ImageWithFallback } from "./components/shared/ImageWithFallback";
import fallbackImage from "./assets/fallback.webp";

import { mockListings } from "./data/mockListings";
import { mockEvents, mockNews, mockKnowledge } from "./data/mockContent";
import { api } from "./utils/api";

// Directory fallback image constant
const FALLBACK_IMAGE_URL = fallbackImage;

type View = "home" | "directory" | "detail" | "about" | "about-roadmap" | "about-team" | "news" | "news-detail" | "events" | "event-detail" | "explore" | "explore-category" | "explore-article" | "search-results" | "community" | "admin";

// URL routing helpers
function getPathFromState(
  view: View,
  selectedListingSlug?: string,
  selectedArticleId?: string,
  selectedEventId?: string,
  exploreCategory?: string,
  searchQuery?: string
): string {
  switch (view) {
    case "home":
      return "/";
    case "directory":
      return "/directory";
    case "detail":
      return selectedListingSlug ? `/directory/${selectedListingSlug}` : "/directory";
    case "about":
      return "/about";
    case "about-roadmap":
      return "/about/roadmap";
    case "about-team":
      return "/about/team";
    case "news":
      return "/news";
    case "news-detail":
      return selectedArticleId ? `/news/${selectedArticleId}` : "/news";
    case "events":
      return "/events";
    case "event-detail":
      return selectedEventId ? `/events/${selectedEventId}` : "/events";
    case "explore":
      return "/explore";
    case "explore-category":
      return exploreCategory ? `/explore/${exploreCategory}` : "/explore";
    case "explore-article":
      return selectedArticleId && exploreCategory 
        ? `/explore/${exploreCategory}/${selectedArticleId}` 
        : exploreCategory 
        ? `/explore/${exploreCategory}` 
        : "/explore";
    case "about-roadmap":
      return "/roadmap";
    case "search-results":
      return searchQuery ? `/search?q=${encodeURIComponent(searchQuery)}` : "/search";
    case "community":
      return "/community";
    case "admin":
      return "/admin";
    default:
      return "/";
  }
}

function parsePathToState(path: string): {
  view: View;
  listingId?: string;
  articleId?: string;
  eventId?: string;
  category?: string;
} {
  // Remove leading/trailing slashes and split
  const parts = path.replace(/^\/|\/$/g, "").split("/").filter(Boolean);
  
  if (parts.length === 0) {
    return { view: "home" };
  }
  
  const [first, second, third] = parts;
  
  switch (first) {
    case "directory":
      if (second) {
        return { view: "detail", listingId: second };
      }
      return { view: "directory" };
    
    case "about":
      if (second === "roadmap") {
        return { view: "about-roadmap" };
      }
      if (second === "team") {
        return { view: "about-team" };
      }
      return { view: "about" };
    
    case "news":
      if (second) {
        return { view: "news-detail", articleId: second };
      }
      return { view: "news" };
    
    case "events":
      if (second) {
        return { view: "event-detail", eventId: second };
      }
      return { view: "events" };
    
    case "explore":
      if (second && third) {
        return { view: "explore-article", category: second, articleId: third };
      }
      if (second) {
        return { view: "explore-category", category: second };
      }
      return { view: "explore" };
    
    case "search":
      return { view: "search-results" };
      
    case "roadmap":
      return { view: "about-roadmap" };

    case "community":
      return { view: "community" };

    case "admin":
      return { view: "admin" };
    
    default:
      return { view: "home" };
  }
}

import { useContent } from "./hooks/useContent.ts";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [pendingListingSlug, setPendingListingSlug] = useState<string>("");
  const [selectedArticleId, setSelectedArticleId] = useState<string>("");
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [exploreCategory, setExploreCategory] = useState<string>("");
  
  // UI States
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [discordModalOpen, setDiscordModalOpen] = useState(false);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<FilterType>("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedCity, setSelectedCity] = useState("");
  
  // Fetch real data from CMS
  const { data: listingsData, loading: loadingListings } = useContent<Listing>('listings');
  const { data: eventsData } = useContent<Event>('events');
  const { data: newsData } = useContent<NewsArticle>('news');
  const { data: knowledgeData } = useContent<KnowledgeArticle>('knowledge');

  // Use real data if available, otherwise fallback to mocks for display
  // This ensures the site is never empty on first load
  const listingsRaw = listingsData.length > 0 ? listingsData : mockListings;
  const listings = useMemo(() => ensureUniqueSlugs(listingsRaw), [listingsRaw]);
  const events = eventsData.length > 0 ? eventsData : mockEvents;
  const news = newsData.length > 0 ? newsData : mockNews;
  const knowledge = knowledgeData.length > 0 ? knowledgeData : mockKnowledge;


  // Initialize from URL on mount
  useEffect(() => {
    const initializeFromUrl = () => {
      const currentPath = window.location.pathname;
      const parsed = parsePathToState(currentPath);
      
      setView(parsed.view);
      
      if (parsed.listingId) {
        setPendingListingSlug(parsed.listingId);
      }

      if (parsed.articleId) {
        setSelectedArticleId(parsed.articleId);
      }

      if (parsed.eventId) {
        setSelectedEventId(parsed.eventId);
      }

      if (parsed.category) {
        setExploreCategory(parsed.category);
      }

      if (parsed.view === "search-results") {
        const searchParams = new URLSearchParams(window.location.search);
        const q = searchParams.get("q");
        if (q) setSearchQuery(q);
      }
    };

    initializeFromUrl();
  }, []);

  // Resolve pending listing slug once listings are loaded
  useEffect(() => {
    if (pendingListingSlug && listings.length > 0) {
      const found = listings.find(l =>
        l.slug === pendingListingSlug ||
        l.id === pendingListingSlug
      );
      if (found) {
        setSelectedListing(found);
        setPendingListingSlug("");
      }
    }
  }, [pendingListingSlug, listings]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const currentPath = window.location.pathname;
      const parsed = parsePathToState(currentPath);
      
      setView(parsed.view);
      
      if (parsed.listingId) {
        const found = listings.find(l =>
          l.slug === parsed.listingId ||
          l.id === parsed.listingId
        );
        if (found) setSelectedListing(found);
        else setPendingListingSlug(parsed.listingId);
      } else {
        setSelectedListing(null);
      }
      
      if (parsed.articleId) {
        setSelectedArticleId(parsed.articleId);
      } else {
        setSelectedArticleId("");
      }

      if (parsed.eventId) {
        setSelectedEventId(parsed.eventId);
      } else {
        setSelectedEventId("");
      }
      
      if (parsed.category) {
        setExploreCategory(parsed.category);
      } else {
        setExploreCategory("");
      }

      if (parsed.view === "search-results") {
        const searchParams = new URLSearchParams(window.location.search);
        const q = searchParams.get("q");
        if (q) setSearchQuery(q);
      }
    };
    
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Update URL when view changes
  useEffect(() => {
    const newPath = getPathFromState(
      view,
      selectedListing?.slug || selectedListing?.id,
      selectedArticleId,
      selectedEventId,
      exploreCategory,
      searchQuery
    );

    if (window.location.pathname + window.location.search !== newPath) {
      window.history.pushState({}, "", newPath);
    }
  }, [view, selectedListing?.slug, selectedListing?.id, selectedArticleId, selectedEventId, exploreCategory, searchQuery]);

  // Remove manual mock loading since we use the hook
  // useEffect(() => {
  //   setListings(mockListings);
  //   setLoadingListings(false);
  // }, []);

  // Listing lookup is now handled by the pendingListingSlug effect above

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [view]);

  // Filter and search listings
  const filteredListings = useMemo(() => {
    let filtered = [...listings];

    // Search query
    if (searchQuery.trim() && view === "directory") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (listing) =>
          listing.name?.toLowerCase().includes(query) ||
          listing.category?.toLowerCase().includes(query) ||
          listing.essence?.toLowerCase().includes(query) ||
          (listing.tags && listing.tags.some((tag) => tag?.toLowerCase().includes(query))) ||
          listing.location?.city?.toLowerCase().includes(query) ||
          listing.location?.country?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((listing) => listing.category === selectedCategory);
    }

    // Country filter
    if (selectedCountry !== "All") {
      filtered = filtered.filter((listing) => listing.location?.country === selectedCountry);
    }

    // City filter
    if (selectedCity.trim()) {
      const city = selectedCity.toLowerCase();
      filtered = filtered.filter((listing) =>
        listing.location?.city?.toLowerCase().includes(city)
      );
    }

    return filtered;
  }, [listings, searchQuery, selectedCategory, selectedCountry, selectedCity, view]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleListingClick = (listing: Listing) => {
    setSelectedListing(listing);
    setView("detail");
  };

  const handleBackToDirectory = () => {
    setView("directory");
    setSelectedListing(null);
  };

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSelectedCountry("All");
    setSelectedCity("");
  };

  const handleDiscordClick = () => {
    setView("community");
  };

  const handleNavigate = (page: string) => {
    if (page.startsWith("explore/")) {
      const category = page.replace("explore/", "");
      setExploreCategory(category);
      setView("explore-category");
    } else {
      setView(page as View);
      if (page !== "detail") setSelectedListing(null);
      if (page !== "news-detail" && page !== "explore-article") setSelectedArticleId("");
      if (page !== "explore-category" && page !== "explore-article") setExploreCategory("");
      if (page !== "event-detail") setSelectedEventId("");
    }
  };

  const handleNewsArticleClick = (articleId: string) => {
    setSelectedArticleId(articleId);
    setView("news-detail");
  };

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setView("event-detail");
  };

  const handleBackFromEventDetail = () => {
    setSelectedEventId("");
    setView("events");
  };

  const handleKnowledgeArticleClick = (articleId: string, category?: string) => {
    setSelectedArticleId(articleId);
    if (category) {
      setExploreCategory(category);
    }
    setView("explore-article");
  };

  const handleBackFromNewsDetail = () => {
    setSelectedArticleId("");
    setView("news");
  };

  const handleBackFromKnowledgeDetail = () => {
    setSelectedArticleId("");
    if (exploreCategory) {
      setView("explore-category");
    } else {
      setView("explore");
    }
  };

  const handlePerformSearch = (query: string) => {
    setSearchQuery(query);
    setView("search-results");
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        {/* Floating Navigation - fixed positioning with pointer-events fix */}
      {view !== "detail" && view !== "news-detail" && view !== "explore-article" && view !== "search-results" && view !== "community" && view !== "event-detail" && view !== "admin" && (
        <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
          <div className="pointer-events-auto">
            <Navigation 
              onCommunityClick={handleDiscordClick}
              onNavigate={handleNavigate}
              currentPage={view}
            />
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main className="flex-1">
        <Suspense fallback={
          <div className="min-h-screen bg-[#FCF8F3] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-[#7935F8] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-muted-foreground">Loading...</span>
            </div>
          </div>
        }>
        {view === "home" ? (
          <HomePage
            onNavigate={handleNavigate}
            onNewsClick={(id) => {
              setSelectedArticleId(id);
              setView("news-detail");
            }}
            onListingClick={handleListingClick}
            onCommunityClick={handleDiscordClick}
            onExploreCategory={(category: string) => {
              setExploreCategory(category);
              handleNavigate("explore-category");
            }}
            onNewsArticleClick={(articleId: string) => {
              setSelectedArticleId(articleId);
              handleNavigate("news-detail");
            }}
            onExploreArticleClick={handleKnowledgeArticleClick}
            onEventClick={(eventId: string) => {
              setSelectedEventId(eventId);
              setView("event-detail");
            }}
            onSubmitClick={() => setSubmitModalOpen(true)}
            onSearch={handlePerformSearch}
            // Pass real data
            featuredListings={listings.slice(0, 4)}
            upcomingEvents={events}
            latestNews={news}
          />
        ) : view === "community" ? (
          <CommunityPage onExit={() => setView("home")} />
        ) : view === "admin" ? (
          <AdminPage />
        ) : view === "detail" && selectedListing ? (
          <ProfileDetail
            listing={selectedListing}
            onBack={handleBackToDirectory}
            onListingClick={handleListingClick}
            onSubmitClick={() => setSubmitModalOpen(true)}
            onDiscordClick={handleDiscordClick}
            onNavigate={handleNavigate}
            onCommunityClick={handleDiscordClick}
          />
        ) : view === "detail" && !selectedListing ? (
          // Loading state while waiting for listings to resolve the slug
          <div className="min-h-screen bg-[#FCF8F3] flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading...</div>
          </div>
        ) : view === "about" ? (
          <AboutPage onBackToDirectory={handleBackToDirectory} />
        ) : view === "about-team" ? (
          <TeamPage onNavigate={handleNavigate} />
        ) : view === "about-roadmap" ? (
          <RoadmapPage 
            onNavigate={handleNavigate}
            onCommunityClick={handleDiscordClick}
          />
        ) : view === "news" ? (
          <NewsPage
            onArticleClick={handleNewsArticleClick}
          />
        ) : view === "news-detail" ? (
          <NewsArticleDetail 
            articleId={selectedArticleId}
            onBack={handleBackFromNewsDetail}
            onNavigate={handleNavigate}
            onCommunityClick={handleDiscordClick}
          />
        ) : view === "events" ? (
          <EventsPage 
            onEventClick={handleEventClick}
          />
        ) : view === "event-detail" ? (
          <EventDetailPage
            eventId={selectedEventId}
            events={events}
            onBack={handleBackFromEventDetail}
            onNavigate={handleNavigate}
            onCommunityClick={handleDiscordClick}
          />
        ) : view === "explore" ? (
          <ExplorePage 
            articles={knowledge}
            onNavigate={handleNavigate}
            onArticleClick={(id, category) => {
              setSelectedArticleId(id);
              setExploreCategory(category);
              setView("explore-article");
            }}
          />
        ) : view === "explore-category" ? (
          <ExploreCategoryPage 
            category={exploreCategory} 
            articles={knowledge}
            onBack={() => setView("explore")}
            onArticleClick={handleKnowledgeArticleClick} 
          />
        ) : view === "explore-article" ? (
          <KnowledgeArticleDetail
            articleId={selectedArticleId}
            articles={knowledge}
            onBack={handleBackFromKnowledgeDetail}
            onNavigate={handleNavigate}
            onCommunityClick={handleDiscordClick}
            onArticleClick={handleKnowledgeArticleClick}
          />
        ) : view === "search-results" ? (
          <SearchResultsPage
            initialQuery={searchQuery}
            listings={listings}
            events={events}
            news={news}
            knowledge={knowledge}
            onNavigate={handleNavigate}
            onListingClick={handleListingClick}
            onArticleClick={(id, type, category) => {
              if (type === 'news') {
                handleNewsArticleClick(id);
              } else {
                handleKnowledgeArticleClick(id, category);
              }
            }}
            onCommunityClick={handleDiscordClick}
          />
        ) : view === "directory" ? (
          <>
            <DirectoryHome
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onFilterClick={() => setFilterDrawerOpen(true)}
            />
            
            <div className="max-w-7xl mx-auto px-4 py-8">
              <InlineFilters
                open={filterDrawerOpen}
                onOpenChange={setFilterDrawerOpen}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedCountry={selectedCountry}
                onCountryChange={setSelectedCountry}
                selectedCity={selectedCity}
                onCityChange={setSelectedCity}
                onClearFilters={handleClearFilters}
                availableCountries={[...new Set(listings.map(l => l.location?.country).filter(Boolean))]}
                availableCategories={[...new Set(listings.map(l => l.category).filter(Boolean))]}
              />
              
              {loadingListings ? (
                <ListingGridSkeleton count={6} />
              ) : listings.length === 0 ? (
                <div className="text-center py-20 space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-2xl">Welcome to FTO Directory</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      The directory is empty.
                    </p>
                  </div>
                </div>
              ) : (
                <ResultsGrid
                  listings={filteredListings}
                  onListingClick={handleListingClick}
                />
              )}
            </div>
          </>
        ) : null}
        </Suspense>
      </main>

      {/* Footer - Hide on pages that render their own footer */}
      {view !== "home" && view !== "explore-article" && view !== "news-detail" && view !== "detail" && view !== "search-results" && view !== "community" && view !== "event-detail" && view !== "admin" && (
        <Footer 
          onNavigate={handleNavigate}
          onCommunityClick={handleDiscordClick}
        />
      )}

      {/* Submit Modal */}
      <SubmitModal
        open={submitModalOpen}
        onOpenChange={setSubmitModalOpen}
      />
      
      {/* Hidden trigger for HomePage submit button */}
      <button
        data-submit-listing
        onClick={() => setSubmitModalOpen(true)}
        className="hidden"
        aria-hidden="true"
      />

      {/* Discord Signup Modal */}
      <DiscordSignupModal
        open={discordModalOpen}
        onOpenChange={setDiscordModalOpen}
      />

      {/* Toast notifications */}
      <Toaster />
      <ScrollToTop />
      </div>
    </ErrorBoundary>
  );
}