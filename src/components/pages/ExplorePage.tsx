import { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { knowledgeCategories, KnowledgeArticle } from "../../data/types";

interface ExplorePageProps {
  articles: KnowledgeArticle[];
  onNavigate: (page: string) => void;
  onArticleClick?: (id: string, category: string) => void;
}

const categoryEmojis: Record<string, string> = {
  'foundational-knowledge': '📚',
  'psychedelics': '🍄',
  'breathwork': '💨',
  'meditation-mindfulness': '🧘',
};

export function ExplorePage({ articles, onNavigate, onArticleClick }: ExplorePageProps) {
  // Use passed articles, fallback to empty array if undefined
  const displayArticles = articles || [];

  return (
    <div className="min-h-screen bg-[#101010]">
      {/* Hero Section - Dark Background */}
      <section className="pt-48 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-white text-4xl md:text-5xl font-semibold">
            Where curiosity becomes consciousness.
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Articles, practices, and ideas to help you see more clearly, feel more deeply, and understand what's actually happening inside you.
          </p>
        </div>
      </section>

      {/* Categories Grid - Dark Cards */}
      <section className="pb-16 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-white text-2xl font-semibold">
            Dive into Topics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {knowledgeCategories.map((category) => {
              const emoji = categoryEmojis[category.slug] || '📚';
              
              return (
                <div
                  key={category.slug}
                  onClick={() => onNavigate(`explore/${category.slug}`)}
                  className="group cursor-pointer bg-[#1a1a1a] rounded-2xl p-8 hover:bg-[#222222] transition-all duration-300 border border-white/5"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onNavigate(`explore/${category.slug}`);
                    }
                  }}
                  aria-label={`Explore ${category.title} articles`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{emoji}</span>
                      <div className="flex-1">
                        <h3 className="text-white text-xl mb-2 font-semibold">
                          {category.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-white/70 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-2 text-[#B197FF] group-hover:gap-3 transition-all">
                      <span className="text-sm">Explore</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      {displayArticles.length > 0 && (
        <section className="pb-16 px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-[#B197FF]" />
              <h2 className="text-white text-2xl font-semibold">
                Featured Articles
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayArticles.slice(0, 6).map((article) => {
                const categoryInfo = knowledgeCategories.find(
                  c => c.slug === article.category || c.title === article.category
                );
                
                return (
                  <article
                    key={article.id}
                    onClick={() => onArticleClick?.(article.id, article.category)}
                    className="group cursor-pointer bg-[#1a1a1a] rounded-2xl overflow-hidden hover:bg-[#222222] transition-all duration-300 border border-white/5"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onArticleClick?.(article.id, article.category);
                      }
                    }}
                  >
                    <div className="p-6 space-y-3">
                      {categoryInfo && (
                        <Badge className="bg-[#7935F8] text-white border-0">
                          {categoryInfo.title}
                        </Badge>
                      )}
                      <h3 className="text-white text-lg line-clamp-2 font-semibold">
                        {article.title}
                      </h3>
                      <p className="text-white/60 text-sm line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-[#B197FF] group-hover:gap-3 transition-all pt-2">
                        <span className="text-sm">Read article</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Ready to Begin Journey Section - Light Background */}
      <section className="bg-[#FCF8F3] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl text-[#101010] font-semibold">
            Ready to go further?
          </h2>
          <p className="text-[#101010]/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover communities, practitioners, events, and spaces that support real transformation and deeper connection.
          </p>
          <Button
            onClick={() => onNavigate("directory")}
            className="rounded-full px-8 py-3 bg-[#101010] hover:bg-[#101010]/90 text-white mt-4"
          >
            Explore
          </Button>
        </div>
      </section>

      {/* FAQ Section - Purple Background */}
      <section className="bg-[#7935F8] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white text-center text-3xl md:text-4xl mb-12 font-semibold">
            Questions we hear most
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "What is Find The Others?",
              "How do I stay updated on new events and content?",
              "How can I join the community?",
              "Can I partner with Find The Others?",
              "What kind of events do you host?",
              "Where can I contact for more information?"
            ].map((question, idx) => (
              <button
                key={idx}
                className="bg-[#B197FF] hover:bg-[#B197FF]/90 text-white px-6 py-4 rounded-xl text-left transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span>{question}</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
