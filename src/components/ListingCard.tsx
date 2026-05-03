import { ExternalLink, MapPin } from "lucide-react";
import { Listing } from "../data/mockListings";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { cleanEssence, decodeHtml } from "../utils/cleanData";

interface ListingCardProps {
  listing: Listing;
  onClick: () => void;
}

export function ListingCard({ listing, onClick }: ListingCardProps) {
  // Helper to clean up dirty location data
  const cleanLocation = (loc?: { city: string, country: string }) => {
    if (!loc) return { city: '', country: '' };
    
    let city = loc.city || '';
    let country = loc.country || '';

    // Aggressive cleaning for JSON strings leaked into fields
    // e.g. "Bendcountry:United States}, United States"
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

    return { city, country };
  };

  // Helper to process tags
  const processTags = (tags?: string[]) => {
    if (!tags) return [];
    return tags.flatMap(tag => tag.split(/[;,]/).map(t => t.trim())).filter(Boolean);
  };

  const { city, country } = cleanLocation(listing.location);
  const displayTags = processTags(listing.tags).slice(0, 3);
  const displayName = decodeHtml(listing.name);
  const displayEssence = cleanEssence(listing.essence, listing.about);

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-transparent hover:border-[#7935F8]/15"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View details for ${listing.name}`}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <ImageWithFallback 
          src={listing.image} 
          alt={listing.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 right-4">
          <span className="bg-white/95 backdrop-blur-sm text-[#7935F8] text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
            {listing.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="flex-1 font-semibold group-hover:text-[#7935F8] transition-colors">{displayName}</h3>
          <ExternalLink className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0 flex-shrink-0" />
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground opacity-70">
          <MapPin className="w-3.5 h-3.5 text-[#7935F8] flex-shrink-0" />
          <span className="text-sm truncate" title={`${city}, ${country}`}>
             {city || 'N/A'}{country ? `, ${country}` : ''}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {displayTags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 rounded-full text-xs"
              style={{
                backgroundColor: index % 3 === 0 ? '#B197FF20' : index % 3 === 1 ? '#1ADF8320' : '#7935F820',
                color: index % 3 === 0 ? '#7935F8' : index % 3 === 1 ? '#066237' : '#7935F8'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {displayEssence}
        </p>
      </div>
    </div>
  );
}