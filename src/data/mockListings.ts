import type { Listing } from "./types";
import { categoryTypes } from "./types";

export type { Listing };
export { categoryTypes };

// Real data comes from Supabase API with localStorage cache as fallback.
// Empty array — the site will show a loading/empty state until data is fetched.
export const mockListings: Listing[] = [];
