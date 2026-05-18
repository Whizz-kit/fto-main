import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Search, Users, Calendar, BookOpen, Newspaper, MapPin, ArrowRight, Filter } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Navigation } from "../layout/Navigation";
import { Footer } from "../layout/Footer";
import { ImageWithFallback } from "../shared/ImageWithFallback";
import { SEO } from "../shared/SEO";
import type { Listing, Event, NewsArticle, KnowledgeArticle } from "../../data/types";
import { cleanEssence } from "../../utils/cleanData";

interface SearchResultsPageProps {
  initialQuery: string;
  listings: Listing[];
  events: Event[];
  news: NewsArticle[];
  knowledge: KnowledgeArticle[];
  onNavigate: (page: string) => void;
  onListingClick: (listing: Listing) => void;
  onArticleClick: (id: string, type: 'news' | 'knowledge', category?: string) => void;
  onCommunityClick: () => void;
}

export function SearchResultsPage({
  initialQuery,
  listings,
  events,
  news,
  knowledge,
  onNavigate,
  onListingClick,
  onArticleClick,
  onCommunityClick
}: SearchResultsPageProps) {
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'communities' | 'events' | 'knowledge' | 'news'>('all');

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { communities: [], events: [], knowledge: [], news: [] };

    return {
      communities: listings.filter(l =>
        l.name.toLowerCase().includes(q) ||
        l.about?.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q) ||
        l.tags?.some(t => t.toLowerCase().includes(q)) ||
        l.location?.city?.toLowerCase().includes(q) ||
        l.location?.country?.toLowerCase().includes(q)
      ),
      events: events.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.location?.city?.toLowerCase().includes(q)
      ),
      knowledge: knowledge.filter(k =>
        k.title.toLowerCase().includes(q) ||
        k.excerpt.toLowerCase().includes(q) ||
        k.category.toLowerCase().includes(q)
      ),
      news: news.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.excerpt.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q)
      )
    };
  }, [query]);

  const totalResults = results.communities.length + results.events.length + results.knowledge.length + results.news.length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // URL update is handled by parent or effect if needed, but here we just update local state which drives the view
  };

  return (
    <div className="min-h-screen bg-[#FCF8F3] flex flex-col">
      <SEO
        title={`Search Results for "${query}"`}
        description={`Search results for "${query}" across listings, news, events, and knowledge articles.`}
      />
      
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <Navigation 
            onNavigate={onNavigate}
            onCommunityClick={onCommunityClick}
            currentPage="home" // Use home style navigation
          />
        </div>
      </div>

      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Search Header */}
          <div className="space-y-6">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate("home")}
              className="pl-0 hover:bg-transparent hover:text-[#7935F8]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>

            <h1 className="text-3xl md:text-4xl font-semibold">
              Search Results
            </h1>

            <form onSubmit={handleSearch} className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 py-6 text-lg rounded-full bg-white border-gray-200 focus-visible:ring-[#7935F8]"
                placeholder="Search communities, events, articles..."
              />
            </form>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-1">
              {[
                { id: 'all', label: 'All Results', count: totalResults },
                { id: 'communities', label: 'Communities', count: results.communities.length },
                { id: 'events', label: 'Events', count: results.events.length },
                { id: 'knowledge', label: 'Explore', count: results.knowledge.length },
                { id: 'news', label: 'News', count: results.news.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors
                    ${activeTab === tab.id 
                      ? 'border-[#7935F8] text-[#7935F8] bg-[#7935F8]/5' 
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-gray-100'
                    }
                  `}
                >
                  {tab.label} <span className="ml-1 opacity-60 text-xs">({tab.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Results Content */}
          <div className="space-y-12">
            {totalResults === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">No results found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms or browse our directory.</p>
                <Button 
                  onClick={() => onNavigate("directory")}
                  className="mt-6 rounded-full bg-[#7935F8] hover:bg-[#7935F8]/90 text-white"
                >
                  Browse Directory
                </Button>
              </div>
            ) : (
              <>
                {/* Communities Section */}
                {(activeTab === 'all' || activeTab === 'communities') && results.communities.length > 0 && (
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-5 h-5 text-[#7935F8]" />
                      <h2 className="text-xl font-semibold">Communities</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {results.communities.map(listing => (
                        <div 
                          key={listing.id}
                          onClick={() => onListingClick(listing)}
                          className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-[#7935F8]/20"
                        >
                          <div className="w-20 h-20 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden">
                            <ImageWithFallback src={listing.image} alt={listing.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-medium truncate pr-2">{listing.name}</h3>
                              <Badge variant="secondary" className="text-xs shrink-0">{listing.category}</Badge>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <MapPin className="w-3 h-3 mr-1" />
                              {listing.location?.city}, {listing.location?.country}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{cleanEssence(listing.essence, listing.about)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Events Section */}
                {(activeTab === 'all' || activeTab === 'events') && results.events.length > 0 && (
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="w-5 h-5 text-[#066237]" />
                      <h2 className="text-xl font-semibold">Events</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {results.events.map(event => (
                        <div 
                          key={event.id}
                          onClick={() => onNavigate("events")} // Ideally navigate to specific event if page supported it
                          className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
                        >
                          <div className="aspect-video bg-gray-100 relative overflow-hidden">
                            <ImageWithFallback src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          </div>
                          <div className="p-4 space-y-2">
                            <div className="text-xs font-medium text-[#066237] flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(event.startDate).toLocaleDateString()}
                            </div>
                            <h3 className="font-medium line-clamp-2">{event.title}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Knowledge Section */}
                {(activeTab === 'all' || activeTab === 'knowledge') && results.knowledge.length > 0 && (
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-5 h-5 text-[#B197FF]" />
                      <h2 className="text-xl font-semibold">Explore</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {results.knowledge.map(article => (
                        <div 
                          key={article.id}
                          onClick={() => onArticleClick(article.id, 'knowledge', article.category)}
                          className="p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer border-l-4 border-[#B197FF]"
                        >
                          <div className="space-y-2">
                            <Badge variant="outline" className="text-xs border-[#B197FF]/30 text-[#B197FF]">
                              {article.category}
                            </Badge>
                            <h3 className="font-medium text-lg">{article.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* News Section */}
                {(activeTab === 'all' || activeTab === 'news') && results.news.length > 0 && (
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Newspaper className="w-5 h-5 text-orange-500" />
                      <h2 className="text-xl font-semibold">News</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {results.news.map(article => (
                        <div 
                          key={article.id}
                          onClick={() => onArticleClick(article.id, 'news')}
                          className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                        >
                          <div className="w-24 h-24 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden">
                            <ImageWithFallback src={article.image} alt={article.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 space-y-2">
                            <h3 className="font-medium text-lg">{article.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                            <div className="text-xs text-muted-foreground">
                              {new Date(article.publishedAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} onCommunityClick={onCommunityClick} />
    </div>
  );
}
