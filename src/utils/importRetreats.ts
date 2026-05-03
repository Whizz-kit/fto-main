// Script to delete all listings and import new retreat data from CSV

export interface RetreatCSVRow {
  itemType: string;
  name: string;
  title: string;
  shortDescription: string;
  category: string;
  streetAddress: string;
  city: string;
  regionState: string;
  country: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  phone: string;
  priceRange: string;
  externalLinks: string;
  detectedDataType: string;
  pageImageURL: string;
}

export function parseRetreatCSV(csvText: string): RetreatCSVRow[] {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];
  
  // Skip header
  const dataLines = lines.slice(1);
  
  return dataLines.map(line => {
    const values = parseCSVLine(line);
    return {
      itemType: values[0] || '',
      name: values[1] || '',
      title: values[2] || '',
      shortDescription: values[3] || '',
      category: values[4] || '',
      streetAddress: values[5] || '',
      city: values[6] || '',
      regionState: values[7] || '',
      country: values[8] || '',
      postalCode: values[9] || '',
      latitude: values[10] || '',
      longitude: values[11] || '',
      phone: values[12] || '',
      priceRange: values[13] || '',
      externalLinks: values[14] || '',
      detectedDataType: values[15] || '',
      pageImageURL: values[16] || '',
    };
  });
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"' && inQuotes && nextChar === '"') {
      current += '"';
      i++; // Skip next quote
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === '\t' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  
  return result;
}

export function convertRetreatToListing(retreat: RetreatCSVRow) {
  // Extract category from "retreats > type" format
  const categoryParts = retreat.category.split('>').map(p => p.trim());
  const retreatType = categoryParts[1] || 'Retreat';
  
  // Parse external links - they're pipe-separated
  const links = retreat.externalLinks.split('|').map(l => l.trim()).filter(Boolean);
  const website = links[0] || '';
  
  // Create tags from category
  const tags = [
    'Retreat Center',
    retreatType.charAt(0).toUpperCase() + retreatType.slice(1).replace(/-/g, ' ')
  ];
  
  return {
    name: retreat.name,
    category: 'Retreat Center',
    location: {
      city: retreat.city,
      country: retreat.country,
    },
    tags: tags,
    essence: retreat.shortDescription.substring(0, 150) + (retreat.shortDescription.length > 150 ? '...' : ''),
    image: retreat.pageImageURL,
    website: website,
    about: retreat.shortDescription,
    offerings: [
      retreat.priceRange ? `Price Range: ${retreat.priceRange}` : '',
      retreat.phone ? `Contact: ${retreat.phone}` : '',
      retreat.streetAddress ? `Address: ${retreat.streetAddress}, ${retreat.city}, ${retreat.regionState}, ${retreat.country}` : '',
    ].filter(Boolean),
    philosophy: `${retreat.name} specializes in ${retreatType} retreats.`,
    relatedIds: [],
  };
}
