import { useState, useEffect } from "react";
import { Calendar, User, Clock, Share2, Home, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Navigation } from "../layout/Navigation";
import { Footer } from "../layout/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { SEO } from "../shared/SEO";
import { NewsArticle } from "../../data/types";
import { mockNews } from "../../data/mockContent";
import { useContent } from "../../hooks/useContent";
import { CommentsSection } from "../directory/CommentsSection";
import { formatContent } from "../../utils/formatContent";

interface NewsArticleDetailProps {
  articleId: string;
  onBack: () => void;
  onNavigate?: (page: string) => void;
  onCommunityClick?: () => void;
}

export function NewsArticleDetail({ articleId, onBack, onNavigate = () => {}, onCommunityClick }: NewsArticleDetailProps) {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: cmsArticles } = useContent<NewsArticle>('news');

  useEffect(() => {
    const allArticles = cmsArticles.length > 0 ? cmsArticles : mockNews;
    const found = allArticles.find(n => n.id === articleId);
    if (found) {
      setArticle(found);
    }
    setLoading(false);
  }, [articleId, cmsArticles]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleShare = () => {
    if (navigator.share && article) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
      });
    } else if (article) {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCF8F3] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-[#7935F8] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[#101010]/60">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#FCF8F3] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-[#101010]/60 text-lg">Article not found</p>
          <Button 
            onClick={() => onNavigate("news")} 
            className="bg-[#7935F8] hover:bg-[#6429d1] text-white rounded-full px-6"
          >
            Back to News
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF8F3] flex flex-col">
      <SEO
        title={article.title}
        description={article.excerpt}
        image={article.image}
        url={`/news/${article.id}`}
        type="article"
        keywords={article.tags}
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              "headline": article.title,
              "description": article.excerpt,
              "image": article.image,
              "datePublished": article.publishedAt,
              "dateModified": article.updatedAt || article.publishedAt,
              "author": { "@type": "Person", "name": article.author },
              "publisher": {
                "@type": "Organization",
                "name": "Find The Others",
                "logo": { "@type": "ImageObject", "url": "https://findtheothers.world/og-image.jpg" }
              },
              "mainEntityOfPage": { "@type": "WebPage", "@id": `https://findtheothers.world/news/${article.id}` }
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://findtheothers.world/" },
                { "@type": "ListItem", "position": 2, "name": "News", "item": "https://findtheothers.world/news" },
                { "@type": "ListItem", "position": 3, "name": article.title }
              ]
            }
          ]
        }}
      />
      {/* Navigation - Fixed */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <Navigation
          onNavigate={onNavigate}
          onCommunityClick={onCommunityClick}
          currentPage="news"
        />
      </div>

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="pt-32 pb-4 px-6">
          <div className="max-w-5xl mx-auto">
            <Breadcrumb>
              <BreadcrumbList className="text-sm font-medium">
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    onClick={() => onNavigate("home")}
                    className="flex items-center gap-2 cursor-pointer hover:text-[#7935F8] transition-colors text-[#101010]/40 font-normal"
                  >
                    <Home className="w-4 h-4 -mt-0.5" />
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-[#101010]/20 scale-75">
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    onClick={onBack}
                    className="cursor-pointer hover:text-[#7935F8] transition-colors text-[#101010]/40 font-normal"
                  >
                    News
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-[#101010]/20 scale-75">
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1 text-[#101010] font-normal max-w-[200px] md:max-w-md">
                    {article.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Back Button */}
        <div className="px-6 pb-8">
          <div className="max-w-5xl mx-auto">
            <Button
              onClick={onBack}
              variant="ghost"
              className="group h-auto p-0 hover:bg-transparent text-[#101010] font-medium hover:text-[#7935F8] transition-colors gap-2"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to News
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        {article.image && (
          <div className="px-6 pb-8">
            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden aspect-[16/9] bg-[#101010]/5">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="px-6 pb-20">
          <div className="max-w-3xl mx-auto">
            {/* Category Badge */}
            <div className="mb-5">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#7935F8]/10 text-[#7935F8]">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#101010] mb-6 font-semibold tracking-tight leading-[1.1]">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 text-[#101010]/40 text-sm mb-8 pb-8 border-b border-[#101010]/5">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>{article.author}</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-[#101010]/20" />
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              {article.readTime && (
                <>
                  <span className="w-1 h-1 rounded-full bg-[#101010]/20" />
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                </>
              )}
            </div>

            {/* Excerpt */}
            {article.excerpt && (
              <div className="mb-10">
                <p className="text-lg md:text-xl text-[#101010]/60 leading-relaxed font-normal">
                  {article.excerpt}
                </p>
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <style>{`
                .news-content p {
                  margin-bottom: 1.25rem;
                  line-height: 1.85;
                }
                .news-content p:empty { display: none; }
                .news-content h2 {
                  font-weight: 600;
                  font-size: 1.5rem;
                  margin-top: 2.5rem;
                  margin-bottom: 0.75rem;
                  color: #101010;
                }
                .news-content h3 {
                  font-weight: 600;
                  font-size: 1.2rem;
                  margin-top: 2rem;
                  margin-bottom: 0.5rem;
                  color: #101010;
                }
                .news-content strong { color: #101010; font-weight: 600; }
                .news-content ul {
                  margin: 0.5rem 0 1rem 0;
                  padding-left: 1.75rem;
                  list-style: disc;
                }
                .news-content li {
                  margin-bottom: 0.25rem;
                  line-height: 1.65;
                }
              `}</style>
              <div
                className="news-content leading-relaxed text-[#101010]/90 font-light"
                dangerouslySetInnerHTML={{ __html: formatContent(article.content || '') }}
              />
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="pt-8 border-t border-[#101010]/10 mb-8">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: idx % 3 === 0 ? '#B197FF20' : idx % 3 === 1 ? '#1ADF8320' : '#7935F820',
                        color: idx % 3 === 0 ? '#7935F8' : idx % 3 === 1 ? '#066237' : '#7935F8',
                        fontWeight: 500
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Button */}
            <div className="flex justify-between items-center pt-8 border-t border-[#101010]/10">
              <Button
                onClick={onBack}
                variant="ghost"
                className="rounded-full text-[#101010]/50 hover:text-[#7935F8] hover:bg-transparent gap-2 h-auto p-0 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to News
              </Button>

              <Button
                onClick={handleShare}
                variant="outline"
                className="rounded-full border-[#101010]/10 text-[#101010]/50 hover:border-[#7935F8]/30 hover:text-[#7935F8] gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>

            {/* Community Comments */}
            <div className="mt-16">
              <CommentsSection 
                onLoginClick={onCommunityClick}
                onSignUpClick={onCommunityClick}
              />
            </div>

          </div>
        </article>
      </main>
      
      <Footer onNavigate={onNavigate} onCommunityClick={onCommunityClick} />
    </div>
  );
}
