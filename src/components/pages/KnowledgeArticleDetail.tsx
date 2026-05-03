import { useState, useEffect } from "react";
import { ArrowLeft, Share2, ChevronRight, Home } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Navigation } from "../Navigation";
import { Footer } from "../Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { KnowledgeArticle, knowledgeCategories } from "../../data/types";
import { mockKnowledge } from "../../data/mockContent";
import { CommentsSection } from "../CommentsSection";
import { formatContent } from "../../utils/formatContent";

interface KnowledgeArticleDetailProps {
  articleId: string;
  articles?: KnowledgeArticle[];
  onBack: () => void;
  onNavigate?: (page: string) => void;
  onCommunityClick?: () => void;
  onArticleClick?: (articleId: string, category?: string) => void;
}


export function KnowledgeArticleDetail({ articleId, articles, onBack, onNavigate, onCommunityClick, onArticleClick }: KnowledgeArticleDetailProps) {
  const [article, setArticle] = useState<KnowledgeArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<KnowledgeArticle[]>([]);
  
  // Use passed articles or fallback to mock if strictly necessary (though we should avoid mocks)
  const sourceArticles = articles || mockKnowledge;

  useEffect(() => {
    const found = sourceArticles.find(a => a.id === articleId);
    if (found) {
      setArticle(found);
      
      // Fetch related
      const related = sourceArticles
        .filter(a => a.id !== articleId && a.category === found.category)
        .slice(0, 2);
      setRelatedArticles(related);
    }
  }, [articleId, sourceArticles]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCF8F3]">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Article not found</p>
          <Button onClick={onBack} variant="outline" className="rounded-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Explore
          </Button>
        </div>
      </div>
    );
  }

  const categoryInfo = knowledgeCategories.find(c => c.slug === article.category || c.title === article.category);

  return (
    <div className="min-h-screen bg-[#FCF8F3] flex flex-col">
      {/* Navigation - Fixed */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <Navigation 
          onNavigate={onNavigate || (() => {})}
          onCommunityClick={onCommunityClick}
          currentPage="explore"
        />
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="pt-32 pb-4 px-6">
          <div className="max-w-5xl mx-auto">
            <Breadcrumb>
              <BreadcrumbList className="text-sm font-medium">
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    onClick={() => onNavigate?.("home")}
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
                    onClick={() => onNavigate?.("explore")}
                    className="cursor-pointer hover:text-[#7935F8] transition-colors text-[#101010]/40 font-normal"
                  >
                    Explore
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {categoryInfo && (
                  <>
                    <BreadcrumbSeparator className="text-[#101010]/20 scale-75">
                      <ChevronRight className="w-4 h-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbLink 
                        onClick={onBack}
                        className="cursor-pointer hover:text-[#7935F8] transition-colors text-[#101010]/40 font-normal"
                      >
                        {categoryInfo.title}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
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
              Back to {categoryInfo?.title || "Explore"}
            </Button>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto px-6 pb-16">
          {/* Hero Image - Always show with fallback */}
          <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl mb-8">
            <ImageWithFallback
              src={article.image || `https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&h=400&fit=crop`}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Header */}
          <div className="space-y-6">
            {/* Category and Tags */}
            <div className="flex flex-wrap gap-2">
              {categoryInfo && (
                <Badge className="bg-[#7935F8] text-white border-0 rounded-full px-4 py-1.5">
                  {categoryInfo.title}
                </Badge>
              )}
              {article.tags.slice(0, 4).map((tag, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="rounded-full px-4 py-1.5 border-[#7935F8]/30 text-[#7935F8]"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#101010] font-semibold tracking-tight leading-[1.1]">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-lg md:text-xl text-[#101010]/50 leading-relaxed max-w-3xl">
                {article.excerpt}
              </p>
            )}

            {/* Meta */}
            <div className="flex items-center gap-3 text-sm text-[#101010]/40 pt-2">
              {article.readTime && <span>{article.readTime}</span>}
              {article.publishedAt && (
                <>
                  <span className="w-1 h-1 rounded-full bg-[#101010]/20" />
                  <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </>
              )}
            </div>
          </div>

          {/* Divider */}
          <hr className="border-[#101010]/5 my-10" />

          {/* Article Content */}
          <article className="max-w-3xl">
            <style>{`
              .article-content {
                font-size: 1.0625rem;
                line-height: 1.85;
                color: rgba(16, 16, 16, 0.85);
              }
              .article-content h2 {
                font-weight: 600;
                font-size: 1.5rem;
                margin-top: 2.5rem;
                margin-bottom: 0.75rem;
                color: #101010;
                letter-spacing: -0.01em;
              }
              .article-content h3 {
                font-weight: 600;
                font-size: 1.2rem;
                margin-top: 2rem;
                margin-bottom: 0.5rem;
                color: #7935F8;
                letter-spacing: -0.01em;
              }
              .article-content h4 {
                font-weight: 600;
                font-size: 1.05rem;
                margin-top: 1.5rem;
                margin-bottom: 0.5rem;
                color: #101010;
              }
              .article-content p {
                margin-bottom: 1.25rem;
                line-height: 1.85;
              }
              .article-content ul, .article-content ol {
                margin: 0.5rem 0 1rem 0;
                padding-left: 0;
                list-style: none;
              }
              .article-content ul + ul, .article-content ol + ol,
              .article-content ul + p + ul, .article-content ol + p + ol {
                margin-top: 0;
              }
              .article-content .w-richtext,
              .article-content [class*="rich-text"] {
                all: unset;
              }
              .article-content li {
                position: relative;
                padding-left: 1.75rem;
                margin-bottom: 0.2rem;
                margin-top: 0;
                line-height: 1.6;
              }
              .article-content li:last-child {
                margin-bottom: 0;
              }
              .article-content li p,
              .article-content li div,
              .article-content li span {
                margin: 0 !important;
                padding: 0 !important;
                display: inline;
              }
              .article-content li br {
                display: none;
              }
              .article-content ul + p:empty,
              .article-content ol + p:empty {
                display: none;
              }
              .article-content li::before {
                content: '';
                position: absolute;
                left: 0.25rem;
                top: 0.65rem;
                width: 5px;
                height: 5px;
                border-radius: 50%;
                background: #7935F8;
              }
              .article-content strong {
                color: #101010;
                font-weight: 600;
              }
              .article-content p:first-child {
                font-size: 1.125rem;
                line-height: 1.8;
                color: #101010;
              }
            `}</style>
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
            />
          </article>

          {/* Bottom Actions */}
          <div className="pt-8 border-t border-[#101010]/10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <Button
              onClick={onBack}
              variant="outline"
              className="rounded-full gap-2 border-[#7935F8]/30 text-[#7935F8] hover:bg-[#7935F8]/5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {categoryInfo?.title || "Explore"}
            </Button>

            <Button
              variant="outline"
              className="rounded-full gap-2 border-[#7935F8]/30 text-[#7935F8] hover:bg-[#7935F8]/5"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: article.title,
                    text: article.excerpt,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
            >
              <Share2 className="w-4 h-4" />
              Share Article
            </Button>
          </div>

          {/* Comments Section */}
          <div className="pt-12">
            <CommentsSection 
              onSignUpClick={onCommunityClick} 
              onLoginClick={onCommunityClick}
            />
          </div>

          {/* You Might Also Like Section */}
          {relatedArticles.length > 0 && (
            <div className="pt-12 mt-12 border-t border-[#101010]/10">
              <h2 className="text-2xl md:text-3xl text-[#101010] mb-6 font-semibold">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <article
                    key={relatedArticle.id}
                    onClick={() => {
                      if (onArticleClick) {
                        onArticleClick(relatedArticle.id, relatedArticle.category);
                      }
                    }}
                    className="group cursor-pointer bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#101010]/10"
                  >
                    {/* Article Image */}
                    <div className="aspect-[16/9] overflow-hidden">
                      <ImageWithFallback
                        src={relatedArticle.image || `https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=450&fit=crop`}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Article Content */}
                    <div className="p-6 space-y-3">
                      {categoryInfo && (
                        <Badge className="bg-[#7935F8] text-white border-0 rounded-full px-3 py-1">
                          {categoryInfo.title}
                        </Badge>
                      )}
                      <h3 className="text-xl text-[#101010] line-clamp-2 group-hover:text-[#7935F8] transition-colors font-semibold">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                        {relatedArticle.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-[#7935F8] text-sm pt-2">
                        <span>Read article</span>
                        <ArrowLeft className="w-3 h-3 rotate-180 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer - Only One */}
      <Footer onNavigate={onNavigate} onCommunityClick={onCommunityClick} />
    </div>
  );
}
