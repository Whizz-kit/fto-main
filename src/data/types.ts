// Listing types
export interface Listing {
  id: string;
  slug?: string;
  name: string;
  category: string;
  location: {
    city: string;
    country: string;
  };
  tags: string[];
  essence: string;
  image: string;
  website: string;
  about: string;
  offerings: string[];
  philosophy: string;
  relatedIds: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Generate a URL-friendly slug from a listing name
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
}

// Ensure unique slugs across listings
export function ensureUniqueSlugs(listings: Listing[]): Listing[] {
  const slugCount = new Map<string, number>();
  return listings.map(listing => {
    const baseSlug = listing.slug || generateSlug(listing.name);
    const count = slugCount.get(baseSlug) || 0;
    slugCount.set(baseSlug, count + 1);
    const slug = count > 0 ? `${baseSlug}-${count}` : baseSlug;
    return { ...listing, slug };
  });
}

export type FilterType = "All" | "Community Space" | "Healing Practice" | "Art & Creativity" | "Retreat Center" | "Research Project" | "Education Platform" | "Sound Healing" | "Community Network" | "Retreat" | "Clinic" | "Therapist" | "Coach";

export const categoryTypes: FilterType[] = [
  "All",
  "Community Space",
  "Healing Practice",
  "Art & Creativity",
  "Retreat Center",
  "Research Project",
  "Education Platform",
  "Sound Healing",
  "Community Network",
  "Retreat",
  "Clinic",
  "Therapist",
  "Coach"
];

// News types
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string;
  readTime?: string; // e.g. "5 min read"
  tags: string[];
  category: 'insight' | 'story' | 'research' | 'announcement';
  createdAt?: string;
  updatedAt?: string;
}

// Event types
export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate?: string;
  location: {
    type: 'in-person' | 'online' | 'hybrid';
    city?: string;
    country?: string;
    venue?: string;
    url?: string;
  };
  organizer: string;
  tags: string[];
  website?: string;
  price?: {
    type: 'free' | 'paid' | 'donation';
    amount?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

// Knowledge Article types (for Explore section)
export interface KnowledgeArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string; // slug of the category
  image: string;
  readTime: string; // e.g. "5 min read"
  publishedAt: string;
  tags: string[];
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const knowledgeCategories = [
  { 
    slug: 'foundational-knowledge', 
    title: 'Foundational Knowledge',
    description: 'Essential frameworks and concepts for consciousness exploration'
  },
  { 
    slug: 'psychedelics', 
    title: 'Psychedelics',
    description: 'Research, practices, and wisdom around psychedelic medicines'
  },
  { 
    slug: 'breathwork', 
    title: 'Breathwork',
    description: 'Techniques and insights on conscious breathing practices'
  },
  { 
    slug: 'meditation-mindfulness', 
    title: 'Meditation & Mindfulness',
    description: 'Practices for presence, awareness, and inner stillness'
  }
] as const;
