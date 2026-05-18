import { ListingCard } from "./ListingCard";
import { Listing } from "../../data/mockListings";
import { motion } from "motion/react";
import { Search } from "lucide-react";

interface ResultsGridProps {
  listings: Listing[];
  onListingClick: (listing: Listing) => void;
}

export function ResultsGrid({ listings, onListingClick }: ResultsGridProps) {
  if (listings.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-20 h-20 rounded-full bg-[#7935F8]/10 flex items-center justify-center mx-auto mb-6">
            <Search className="w-9 h-9 text-[#7935F8]" />
          </div>
          <h3 className="text-xl font-semibold">No matches found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to discover more communities.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-muted-foreground">
          <span className="font-semibold text-foreground">{listings.length}</span>{" "}
          {listings.length === 1 ? "listing" : "listings"} found
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {listings.map((listing, index) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: Math.min(index * 0.06, 0.5),
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <ListingCard
              listing={listing}
              onClick={() => onListingClick(listing)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
