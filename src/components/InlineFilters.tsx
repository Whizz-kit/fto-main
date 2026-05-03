import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { categoryTypes, FilterType } from "../data/types";
import { motion, AnimatePresence } from "motion/react";

interface InlineFiltersProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategory: FilterType;
  onCategoryChange: (category: FilterType) => void;
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  onClearFilters: () => void;
  availableCountries?: string[];
  availableCategories?: string[];
}

export function InlineFilters({
  open,
  onOpenChange,
  selectedCategory,
  onCategoryChange,
  selectedCountry,
  onCountryChange,
  selectedCity,
  onCityChange,
  onClearFilters,
  availableCountries,
  availableCategories,
}: InlineFiltersProps) {
  const countries = availableCountries && availableCountries.length > 0
    ? ["All", ...availableCountries.sort()]
    : ["All"];
  
  const hasActiveFilters = selectedCategory !== "All" || selectedCountry !== "All" || selectedCity.trim() !== "";
  
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl">Filters</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Refine your search to discover aligned communities
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div className="space-y-3">
                <Label>Type</Label>
                <Select value={selectedCategory} onValueChange={onCategoryChange}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {(availableCategories && availableCategories.length > 0
                      ? ["All", ...availableCategories.sort()]
                      : categoryTypes
                    ).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Country Filter */}
              <div className="space-y-3">
                <Label>Country</Label>
                <Select value={selectedCountry} onValueChange={onCountryChange}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* City Filter */}
              <div className="space-y-3">
                <Label>City</Label>
                <Input
                  type="text"
                  placeholder="Enter city name"
                  value={selectedCity}
                  onChange={(e) => onCityChange(e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="mt-6 flex justify-end">
                <Button
                  variant="outline"
                  onClick={onClearFilters}
                  className="rounded-full gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
