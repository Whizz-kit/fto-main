import { useState, useEffect } from "react";
import { ArrowLeft, Search, Filter, Home, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { SEO } from "../shared/SEO";
import { KnowledgeArticle, knowledgeCategories } from "../../data/types";
import { mockKnowledge } from "../../data/mockContent";

interface ExploreCategoryPageProps {
  category: string;
  articles: KnowledgeArticle[];
  onBack: () => void;
  onArticleClick?: (id: string, category: string) => void;
}

export function ExploreCategoryPage({ category, articles, onBack, onArticleClick }: ExploreCategoryPageProps) {
  // Use passed articles directly
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");

  const categoryInfo = knowledgeCategories.find(c => c.slug === category);

  // Filter and sort articles
  const filteredArticles = articles
    .filter(article => {
      // First filter by category
      const matchesCategory = article.category === category || 
                             article.category?.toLowerCase() === categoryInfo?.title.toLowerCase() ||
                             // Handle case where category might be a slug or title
                             categoryInfo?.slug === article.category;
      
      if (!matchesCategory) return false;

      const matchesSearch = 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case "oldest":
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  // Get all unique tags from articles
  const allTags = Array.from(new Set(articles.flatMap(a => a.tags))).sort();

  if (!categoryInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Category not found</p>
          <Button onClick={onBack} variant="outline" className="rounded-full">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-[#FCF8F3]">
      <SEO
        title={categoryInfo.title}
        description={categoryInfo.description || `Explore articles about ${categoryInfo.title} on Find The Others.`}
        url={`/explore/${category}`}
        keywords={[category, "knowledge", "consciousness", categoryInfo.title.toLowerCase()]}
      />
      {/* Header */}
      <section className="bg-[#FCF8F3] py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="flex items-center gap-1 cursor-pointer" onClick={onBack}>
                  <Home className="w-3.5 h-3.5" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="w-3.5 h-3.5" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink className="cursor-pointer" onClick={onBack}>
                  Explore
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="w-3.5 h-3.5" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{categoryInfo.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Button
            onClick={onBack}
            variant="ghost"
            className="rounded-full gap-2 -ml-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Button>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-semibold">{categoryInfo.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {categoryInfo.description}
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full"
              />
            </div>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as typeof sortBy)}>
              <SelectTrigger className="w-full sm:w-[180px] rounded-full">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20 space-y-4 bg-white rounded-3xl shadow-lg p-12">
              <p className="text-muted-foreground text-lg">
                {searchQuery 
                  ? `No articles found matching "${searchQuery}"`
                  : "No articles yet in this category. Check back soon!"}
              </p>
              {searchQuery && (
                <Button
                  onClick={() => setSearchQuery("")}
                  variant="outline"
                  className="rounded-full"
                >
                  Clear search
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => onArticleClick?.(article.id, category)}
                  className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group space-y-4"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onArticleClick?.(article.id, category);
                    }
                  }}
                  aria-label={`Read article: ${article.title}`}
                >
                  <h3 className="text-xl group-hover:text-primary transition-colors line-clamp-2 font-semibold">
                    {article.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  {/* Tags */}
                  {article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {article.tags.slice(0, 3).map((tag, idx) => (
                        <Badge 
                          key={idx} 
                          variant="outline" 
                          className="text-xs rounded-full"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {article.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs rounded-full">
                          +{article.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-primary text-sm pt-2">
                    <span>Read article</span>
                    <ArrowLeft className="w-3 h-3 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
