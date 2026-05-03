import { Search, SlidersHorizontal } from "lucide-react";
import { SEO } from "./SEO";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface DirectoryHomeProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterClick: () => void;
}

export function DirectoryHome({ searchQuery, onSearchChange, onFilterClick }: DirectoryHomeProps) {
  return (
    <div className="w-full bg-[#101010] pt-36 pb-16 md:pt-40 md:pb-24 px-4">
      <SEO 
        title="Directory"
        description="A curated guide to people, places, and projects expanding consciousness around the world."
        url="/directory"
      />
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl text-white font-semibold">
            Discover Aligned Communities
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            A curated guide to the people, places, and projects expanding consciousness.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for communities, practitioners, projects..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-12 pr-4 py-6 rounded-full border-2 border-transparent bg-white focus:border-primary shadow-lg"
              />
            </div>
            <Button
              onClick={onFilterClick}
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 border-2 bg-white hover:bg-primary hover:text-white hover:border-primary shadow-lg transition-all duration-300"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <span className="text-sm text-muted-foreground">Popular:</span>
          {["Retreat", "Therapist", "Breathwork", "Coach", "Meditation", "Community"].map((term) => (
            <button
              key={term}
              onClick={() => onSearchChange(term)}
              className="px-4 py-2 rounded-full bg-white/80 hover:bg-white text-sm transition-all duration-200 hover:shadow-md"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
