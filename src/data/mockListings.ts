import type { Listing, FilterType } from "./types";
import { categoryTypes } from "./types";

export type { Listing, FilterType };
export { categoryTypes };

// Real data comes from Supabase API with localStorage cache as fallback.
// Empty array — the site will show a loading/empty state until data is fetched.
export const mockListings: Listing[] = [];
