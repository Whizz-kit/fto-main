import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
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
import { categoryTypes, FilterType } from "../data/mockListings";

interface FilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategory: FilterType;
  onCategoryChange: (category: FilterType) => void;
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  onClearFilters: () => void;
}

export function FilterDrawer({
  open,
  onOpenChange,
  selectedCategory,
  onCategoryChange,
  selectedCountry,
  onCountryChange,
  selectedCity,
  onCityChange,
  onClearFilters,
}: FilterDrawerProps) {
  const countries = ["All", "Australia", "USA", "Spain", "Netherlands", "Mexico", "Germany", "Bali"];
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filter listings</SheetTitle>
          <SheetDescription>
            Refine your search to discover aligned communities and practitioners
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          {/* Category Filter */}
          <div className="space-y-3">
            <Label>Type</Label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {categoryTypes.map((category) => (
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

          {/* Clear Filters */}
          <div className="pt-4 flex gap-3">
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="flex-1 rounded-full"
            >
              Clear all
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-full bg-primary hover:bg-primary/90"
            >
              Apply filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
