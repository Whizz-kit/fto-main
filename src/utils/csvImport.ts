import { Listing, NewsArticle, KnowledgeArticle } from "../data/types";

// Robust CSV Parser that handles quotes and multiline values
export function parseCSV(text: string): Record<string, string>[] {
  const lines: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuote = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuote) {
      if (char === '"') {
        if (nextChar === '"') {
          // Escaped quote
          currentField += '"';
          i++;
        } else {
          // End of quote
          inQuote = false;
        }
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuote = true;
      } else if (char === ',') {
        currentRow.push(currentField.trim());
        currentField = '';
      } else if (char === '\r') {
        // Ignore carriage returns
      } else if (char === '\n') {
        currentRow.push(currentField.trim());
        lines.push(currentRow);
        currentRow = [];
        currentField = '';
      } else {
        currentField += char;
      }
    }
  }
  
  // Push the last field/row if exists
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    lines.push(currentRow);
  }

  if (lines.length < 2) return [];

  const headers = lines[0].map(h => h.trim().replace(/^"|"$/g, ''));
  const result: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i];
    if (row.length === 0 || (row.length === 1 && !row[0])) continue;

    const obj: Record<string, string> = {};
    headers.forEach((header, index) => {
      // Map header to lowercase for easier matching, but keep value clean
      // Clean up value: remove surrounding quotes if parser left them (though logic above handles most)
      obj[header] = row[index] || '';
    });
    result.push(obj);
  }

  return result;
}

// Helper to decode HTML entities
function decodeHtml(html?: string): string {
  if (!html) return '';
  // Basic entity decoding for common cases without DOM access (runs in logic, not React render)
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

// Helper to clean location string from CSV
function parseLocation(locString: string): { city: string, country: string } {
  if (!locString) return { city: '', country: '' };

  let city = '';
  let country = '';
  let cleanStr = locString;

  // 1. Handle JSON-like structures leaked into string
  if (cleanStr.includes('{') || cleanStr.includes('city:') || cleanStr.includes('country:')) {
      const cityMatch = cleanStr.match(/city:([^,}"']+)/i);
      const countryMatch = cleanStr.match(/country:([^,}"']+)/i);
      
      if (cityMatch) city = cityMatch[1];
      if (countryMatch) country = countryMatch[1];

      // If we extracted, return immediately, cleaning up artifacts
      if (city || country) {
         return { 
           city: decodeHtml(city.trim()), 
           country: decodeHtml(country.trim()) 
         };
      }
      
      // Fallback: strip braces and continue
      cleanStr = cleanStr.replace(/[{}"']/g, '');
  }

  // 2. Standard "City, Country" format
  const parts = cleanStr.split(',');
  if (parts.length > 1) {
    country = parts.pop()?.trim() || '';
    city = parts.join(',').trim();
  } else {
    city = cleanStr.trim();
  }

  // 3. Final cleanup of common artifacts
  const clean = (s: string) => s
    .replace(/country:/gi, '')
    .replace(/city:/gi, '')
    .replace(/undefined/gi, '')
    .replace(/^,/, '')
    .trim();

  return { 
    city: decodeHtml(clean(city)), 
    country: decodeHtml(clean(country)) 
  };
}

function parseTags(tagString: string): string[] {
  if (!tagString) return [];
  return tagString.split(/[;,]/).map(t => decodeHtml(t.trim())).filter(Boolean);
}

function parseDate(dateString: string): string {
  if (!dateString) return new Date().toISOString();
  try {
    return new Date(dateString).toISOString();
  } catch (e) {
    return new Date().toISOString();
  }
}

export function mapExploreCSV(rows: Record<string, string>[]): KnowledgeArticle[] {
  return rows.map(row => {
    // Required fields check or defaults
    const id = row.slug || crypto.randomUUID();
    
    return {
      id: id,
      title: decodeHtml(row.title) || 'Untitled',
      slug: row.slug || id,
      excerpt: decodeHtml(row.excerpt) || '',
      content: decodeHtml(row.content) || '',
      category: row.category || 'foundational-knowledge',
      image: row.image || '', // Empty if not provided
      readTime: row.readTime || '5 min read',
      publishedAt: parseDate(row.publishedAt),
      tags: parseTags(row.tags),
      featured: row.featured?.toLowerCase() === 'true',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  });
}

export function mapNewsCSV(rows: Record<string, string>[]): NewsArticle[] {
  return rows.map(row => {
    return {
      id: crypto.randomUUID(), // News doesn't usually have stable ID in CSV, generate one
      title: decodeHtml(row.title) || 'Untitled',
      excerpt: decodeHtml(row.excerpt) || '',
      content: decodeHtml(row.content) || '',
      image: row.image || '',
      author: decodeHtml(row.author) || 'FTO Team',
      publishedAt: parseDate(row.publishedAt),
      readTime: row.readTime || '3 min read',
      tags: parseTags(row.tags),
      category: (row.category as any) || 'insight',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  });
}

export function mapDirectoryCSV(rows: Record<string, string>[]): Listing[] {
  return rows.map(row => {
    // Robust location parsing
    const { city, country } = parseLocation(row.location);

    return {
      id: row.id || crypto.randomUUID(),
      name: decodeHtml(row.name) || 'Untitled',
      category: row.category || 'Community Space',
      location: {
        city,
        country
      },
      tags: parseTags(row.tags),
      essence: decodeHtml(row.essence) || '',
      image: row.image || '',
      website: row.website || '',
      about: decodeHtml(row.about) || '',
      offerings: parseTags(row.offerings), // Assuming offerings are comma separated in CSV
      philosophy: decodeHtml(row.philosophy) || '',
      relatedIds: parseTags(row.relatedIds), // Assuming comma separated IDs
      createdAt: row.updatedAt ? parseDate(row.updatedAt) : new Date().toISOString(),
      updatedAt: row.updatedAt ? parseDate(row.updatedAt) : new Date().toISOString()
    };
  });
}
