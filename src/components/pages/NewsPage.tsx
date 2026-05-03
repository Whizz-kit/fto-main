import { useState, useEffect } from "react";
import { ExternalLink, Calendar, Tag, ArrowRight } from "lucide-react";
import { SEO } from "../SEO";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { FadeInSection } from "../FadeInSection";
import { NewsArticle } from "../../data/types";
import { mockNews } from "../../data/mockContent";
import newsBannerImage from "figma:asset/8cac59910940de3db89593ec1227d391299a4d36.webp";
import { useContent } from "../../hooks/useContent";

interface NewsPageProps {
  onArticleClick?: (id: string) => void;
}

export function NewsPage({ onArticleClick }: NewsPageProps) {
  const { data: cmsArticles, loading } = useContent<NewsArticle>('news');
  const articles = cmsArticles.length > 0 ? cmsArticles : mockNews;
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", "insight", "story", "research", "announcement"];
  
  const filteredArticles = selectedCategory === "all" 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-[#FCF8F3]">
      <SEO 
        title="News & Insights"
        description="Latest news, stories, and research from the consciousness community."
        url="/news"
      />
      {/* Hero */}
      <section className="pt-48 pb-12 px-4">
        <FadeInSection>
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <h1 className="text-[#101010] text-4xl md:text-5xl font-semibold tracking-tight">
            News & Insights
          </h1>
          <p className="text-[#101010]/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Stories, research, and reflections from the consciousness community
          </p>
        </div>
        </FadeInSection>
      </section>

      {/* Filters */}
      <section className="bg-[#FCF8F3] border-b border-[#101010]/10 px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-[#7935F8] text-white font-semibold"
                    : "bg-white hover:bg-white/80 text-[#101010]/70 border border-[#101010]/10 font-normal"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="bg-[#FCF8F3] pt-8 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Loading articles...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <p className="text-muted-foreground">No articles yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer"
                  onClick={() => onArticleClick?.(article.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onArticleClick?.(article.id);
                    }
                  }}
                  aria-label={`Read article: ${article.title}`}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                    <h3 className="text-xl group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="rounded-full">
                        {article.category}
                      </Badge>
                      {article.tags.slice(0, 2).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="rounded-full">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="pt-2 flex items-center gap-2 text-sm text-primary">
                      <span>Read more</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
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