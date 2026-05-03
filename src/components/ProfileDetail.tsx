import { useState } from "react";
import { ExternalLink, MapPin, Globe, Mail, ChevronRight, Home, ArrowLeft, DollarSign, Users, User, Tag } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { Listing } from "../data/types";
import { SEO } from "./SEO";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CommentsSection } from "./CommentsSection";

interface ProfileDetailProps {
  listing: Listing;
  onBack: () => void;
  onListingClick: (listing: Listing) => void;
  onSubmitClick: () => void;
  onDiscordClick: () => void;
  onNavigate?: (page: string) => void;
  onCommunityClick?: () => void;
}

export function ProfileDetail({ 
  listing, 
  onBack, 
  onListingClick, 
  onSubmitClick, 
  onDiscordClick, 
  onNavigate = () => {}, 
  onCommunityClick 
}: ProfileDetailProps) {
  
  // Helper to decode HTML entities (safe for SSR/Build)
  const decodeHtml = (html?: string) => {
    if (!html) return '';
    return html
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ');
  };

  // Helper to clean up dirty location data
  const cleanLocation = (loc?: { city: string, country: string }) => {
    if (!loc) return { city: '', country: '' };
    
    let city = loc.city || '';
    let country = loc.country || '';

    // Aggressive cleaning for JSON strings leaked into fields
    const fullString = (city + " " + country).replace(/[{}]/g, '');
    
    // Attempt to extract if explicit keys exist
    if (fullString.includes('city:') || fullString.includes('country:')) {
      const cityMatch = fullString.match(/city:([^,]+)/);
      const countryMatch = fullString.match(/country:([^,]+)/);
      
      if (cityMatch && cityMatch[1]) city = cityMatch[1].replace('country:', '').trim();
      if (countryMatch && countryMatch[1]) country = countryMatch[1].trim();
    } 
    // Handle run-on case like "Bendcountry:United States"
    else if (city.includes('country:')) {
      const parts = city.split('country:');
      city = parts[0].trim();
      if (parts[1] && !country) country = parts[1].trim();
    }
    
    // Final cleanup of artifacts
    city = city.replace(/country:/g, '').replace(/[{}]/g, '').replace(/^,/, '').trim();
    country = country.replace(/city:/g, '').replace(/[{}]/g, '').replace(/^,/, '').trim();

    // If country is still stuck to city in some way or vice versa
    if (city.endsWith(',')) city = city.slice(0, -1);
    if (country.startsWith(',')) country = country.slice(1).trim();

    // Remove "undefined" strings
    if (city.toLowerCase() === 'undefined') city = '';
    if (country.toLowerCase() === 'undefined') country = '';

    // Deduplicate if city contains country (e.g. "Amsterdam Netherlands", "Netherlands")
    if (country && city.toLowerCase().includes(country.toLowerCase())) {
      city = city.replace(new RegExp(country, 'ig'), '').replace(/,\s*$/, '').trim();
    }

    return { city, country };
  };

  // Helper to process tags (handle semicolons from legacy imports)
  const processTags = (tags?: string[]) => {
    if (!tags) return [];
    return tags.flatMap(tag => tag.split(/[;,]/).map(t => t.trim())).filter(Boolean);
  };

  // Helper to organize "Good to Know" / Offerings data
  const organizeOfferings = (offerings?: string[]) => {
    if (!offerings) return { structured: [], general: [] };

    const flatOfferings = offerings.flatMap(o => o.split(';').map(t => t.trim())).filter(Boolean);

    const structured: { label: string, value: string, icon?: string }[] = [];
    const general: string[] = [];

    const { city, country } = cleanLocation(listing.location);

    // Known structured field patterns
    const fieldPatterns: { pattern: RegExp, label: string, icon: string }[] = [
      { pattern: /^Price(\s*Range)?[:\s]*/i, label: 'Price Range', icon: 'dollar' },
      { pattern: /^Group\s*Size[:\s]*/i, label: 'Group Size', icon: 'users' },
      { pattern: /^Founder(s)?(\s*\/\s*CEO)?[:\s]*/i, label: 'Founder', icon: 'user' },
      { pattern: /^Specializ(ing|ation)\s*(In)?[:\s]*/i, label: 'Specializations', icon: 'tag' },
      { pattern: /^Address[:\s]*/i, label: 'Address', icon: 'map' },
      { pattern: /^Email[:\s]*/i, label: 'Email', icon: 'mail' },
      { pattern: /^Website[:\s]*/i, label: 'Website', icon: 'globe' },
    ];

    flatOfferings.forEach(item => {
      const decodedItem = decodeHtml(item);
      const lower = decodedItem.toLowerCase();

      // Try structured field patterns
      let matched = false;
      for (const { pattern, label, icon } of fieldPatterns) {
        if (pattern.test(decodedItem)) {
          const val = decodedItem.replace(pattern, '').trim();
          if (val && val !== 'undefined' && val !== 'null') {
            structured.push({ label, value: val, icon });
          }
          matched = true;
          break;
        }
      }

      if (!matched) {
        const isLocation =
          decodedItem === city ||
          decodedItem === country ||
          (city && decodedItem.includes(city)) ||
          (country && decodedItem.includes(country));

        const isDirty = lower === '000' || lower === 'null' || lower === 'undefined' || decodedItem.length <= 1;

        if (!isLocation && !isDirty) {
          general.push(decodedItem);
        }
      }
    });

    return { structured, general: [...new Set(general)] };
  };

  // Helper to format text into paragraphs with basic heading detection
  const formatTextIntoParagraphs = (text?: string, maxChars = 800) => {
    if (!text) return { items: [], isTruncated: false };

    // Split by newlines first
    const lines = text.split(/\r?\n/).filter(p => p.trim().length > 0);

    // Process lines to identify headers vs paragraphs
    const allItems = lines.map(line => {
      const decodedLine = decodeHtml(line);
      const trimmed = decodedLine.trim();
      const isHeader = (trimmed.length < 50 && trimmed.endsWith(':')) ||
                       (trimmed.length < 50 && trimmed === trimmed.toUpperCase() && trimmed.length > 3);

      return { text: trimmed, isHeader };
    });

    // Truncate if total text is too long
    let charCount = 0;
    const truncatedItems: typeof allItems = [];
    for (const item of allItems) {
      charCount += item.text.length;
      truncatedItems.push(item);
      if (charCount > maxChars) break;
    }

    return {
      items: truncatedItems,
      allItems,
      isTruncated: truncatedItems.length < allItems.length
    };
  };

  const { city, country } = cleanLocation(listing.location);
  const displayName = decodeHtml(listing.name || '');
  const displayEssence = decodeHtml(listing.essence || '');
  const cleanedTags = processTags(listing.tags);
  const { structured: structuredOfferings, general: generalOfferings } = organizeOfferings(listing.offerings);
  const { items: aboutItems, allItems: allAboutItems, isTruncated: aboutTruncated } = formatTextIntoParagraphs(listing.about);

  const [aboutExpanded, setAboutExpanded] = useState(false);
  const displayAboutItems = aboutExpanded ? (allAboutItems || aboutItems) : aboutItems;
  const hasLocation = city || country;

  return (
    <>
      <SEO
        title={displayName}
        description={displayEssence || listing.about?.substring(0, 150) || "View this listing on Find The Others"}
        image={listing.image}
        url={`/directory/${listing.slug || listing.id}`}
        type="profile"
        keywords={[listing.category || "community", ...cleanedTags]}
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LocalBusiness",
              "name": displayName,
              "description": displayEssence,
              "image": listing.image,
              "url": `https://findtheothers.world/directory/${listing.slug || listing.id}`,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": city,
                "addressCountry": country
              }
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://findtheothers.world/" },
                { "@type": "ListItem", "position": 2, "name": "Directory", "item": "https://findtheothers.world/directory" },
                { "@type": "ListItem", "position": 3, "name": displayName }
              ]
            }
          ]
        }}
      />
      <div className="min-h-screen bg-[#FCF8F3] flex flex-col">
        {/* Main Navigation - Fixed on top */}
        <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
          <Navigation 
            onNavigate={onNavigate}
            onCommunityClick={onCommunityClick}
            currentPage="directory"
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
                      Directory
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-[#101010]/20 scale-75">
                    <ChevronRight className="w-4 h-4" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1 text-[#101010] font-normal max-w-[200px] md:max-w-md">
                      {displayName}
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
                Back to Directory
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="pb-16 px-4">
            <div className="max-w-5xl mx-auto">
              {/* Hero Section with Image */}
              <div className="bg-white rounded-3xl overflow-hidden mb-6">
                {listing.image && (
                  <div className="aspect-[21/9] bg-gradient-to-br from-[#7935F8] to-[#B197FF] relative overflow-hidden">
                    <ImageWithFallback 
                      src={listing.image} 
                      alt={displayName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    
                    {/* Category Badge on Image */}
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-white/90 text-[#7935F8] hover:bg-white border-0">
                        {listing.category}
                      </Badge>
                    </div>
                  </div>
                )}
                
                {/* Title & Location */}
                <div className="p-8 md:p-12 space-y-6">
                  <div className="space-y-3">
                    <h1 className="text-3xl md:text-5xl font-semibold">
                      {displayName}
                    </h1>
                    {hasLocation && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {city}{city && country ? ', ' : ''}{country}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {cleanedTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {cleanedTags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-4 py-2 rounded-full text-sm"
                          style={{
                            backgroundColor: index % 3 === 0 ? '#B197FF20' : index % 3 === 1 ? '#1ADF8320' : '#7935F820',
                            color: index % 3 === 0 ? '#7935F8' : index % 3 === 1 ? '#066237' : '#7935F8'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  {listing.website && (
                    <Button 
                      className="rounded-full px-8 gap-2 bg-[#7935F8] hover:bg-[#7935F8]/90 text-white"
                      onClick={() => window.open(listing.website, '_blank')}
                    >
                      <Globe className="w-4 h-4" />
                      Visit Website
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* About */}
                  {listing.about && (
                    <div className="bg-white rounded-3xl p-8">
                      <h2 className="text-2xl mb-4 font-semibold">About</h2>
                      <div className="text-muted-foreground leading-relaxed space-y-4">
                        {displayAboutItems.map((item, index) => (
                          item.isHeader ? (
                            <h3 key={index} className="text-[#101010] font-semibold text-lg pt-2">{item.text}</h3>
                          ) : (
                            <p key={index}>{item.text}</p>
                          )
                        ))}
                      </div>
                      {aboutTruncated && !aboutExpanded && (
                        <button
                          onClick={() => setAboutExpanded(true)}
                          className="mt-4 text-[#7935F8] font-medium text-sm hover:underline"
                        >
                          Read more...
                        </button>
                      )}
                    </div>
                  )}

                  {/* Offerings / Good to Know */}
                  {(structuredOfferings.length > 0 || generalOfferings.length > 0) && (
                    <div className="bg-white rounded-3xl p-8">
                      <h2 className="text-2xl mb-6 font-semibold">Good to Know</h2>
                      
                      <div className="space-y-6">
                        {/* Structured items (Price, etc) */}
                        {structuredOfferings.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {structuredOfferings.map((item, index) => (
                              <div key={index} className="flex items-start gap-3 p-4 rounded-2xl bg-[#FCF8F3] border border-[#FCF8F3] hover:border-[#7935F8]/20 transition-colors">
                                <div className="mt-0.5 w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#7935F8]">
                                  {item.icon === 'dollar' && <DollarSign className="w-4 h-4" />}
                                  {item.icon === 'map' && <MapPin className="w-4 h-4" />}
                                  {item.icon === 'mail' && <Mail className="w-4 h-4" />}
                                  {item.icon === 'globe' && <Globe className="w-4 h-4" />}
                                  {item.icon === 'users' && <Users className="w-4 h-4" />}
                                  {item.icon === 'user' && <User className="w-4 h-4" />}
                                  {item.icon === 'tag' && <Tag className="w-4 h-4" />}
                                </div>
                                <div>
                                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
                                    {item.label}
                                  </div>
                                  <div className="font-medium text-[#101010]">
                                    {item.value}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* General bullet points */}
                        {generalOfferings.length > 0 && (
                          <ul className="space-y-3 pt-2">
                            {generalOfferings.map((offering, index) => (
                              <li key={index} className="flex gap-3 items-start group">
                                <span className="text-[#7935F8]/60 mt-1 text-lg group-hover:text-[#7935F8] transition-colors">✦</span>
                                <div className="flex-1 text-muted-foreground leading-relaxed">
                                  {offering}
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Community Discussions / Comments Section */}
                  <CommentsSection 
                    onSignUpClick={onCommunityClick}
                    onLoginClick={onCommunityClick}
                  />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Join Community CTA */}
                  <div className="bg-[#7935F8] rounded-3xl p-8 text-white space-y-6">
                    <h3 className="text-xl font-semibold">Are you one of the others?</h3>
                    <p className="text-base text-white/90 leading-relaxed">
                      Connect with people exploring the same questions. Share what you're learning, find real support, and stay close to what's happening in consciousness.
                    </p>
                    <Button
                      onClick={onCommunityClick}
                      className="w-full rounded-full bg-white text-[#7935F8] hover:bg-white/90 py-6 text-base"
                    >
                      Join Our Community
                    </Button>
                  </div>

                  {/* Submit your directory listing */}
                  <div className="bg-[#FCF8F3] rounded-3xl p-8 border border-[#7935F8]/10 hover:border-[#7935F8]/30 transition-all duration-300">
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">
                        Want to be featured?
                      </h3>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        Do you have a practice, retreat center, or space that aligns with what we're building? We'd love to hear from you. Submit your listing to be part of the directory.
                      </p>
                      <Button
                        onClick={onSubmitClick}
                        variant="outline"
                        className="w-full rounded-full border-[#7935F8]/30 hover:bg-[#7935F8]/5 hover:border-[#7935F8]/50 py-6 text-base"
                      >
                        Submit Listing
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer onNavigate={onNavigate} onCommunityClick={onCommunityClick} />
      </div>
    </>
  );
}
