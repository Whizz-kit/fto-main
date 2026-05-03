/**
 * Converts detailed clinics CSV data (with description, price, phone, address, etc.) to FTO listings CSV format
 */
export function convertDetailedClinicsToListingsCSV(csvText: string): string {
  const lines = csvText.trim().split('\n');
  
  // Skip header line
  const dataLines = lines.slice(1);
  
  const convertedListings = dataLines
    .map((line) => {
      // Parse CSV line - handle quoted fields with commas
      const fields = parseCSVLine(line);
      
      // New CSV has 23 fields, old had 15 - support both
      const isNewFormat = fields.length >= 20;
      
      if (fields.length < 14) return null;
      
      const pageNumber = fields[0]?.trim();
      const name = fields[1]?.trim();
      const listingCategory = fields[2]?.trim(); // "clinics"
      const substance = fields[3]?.trim(); // "ketamine", "ibogaine", etc.
      const description = fields[4]?.trim();
      const priceRange = fields[5]?.trim();
      const telephone = fields[6]?.trim();
      
      // New format has extra fields here
      let streetAddress, city, region, postalCode, country, latitude, longitude, ftoImageUrl;
      
      if (isNewFormat) {
        // New format: page_url, listing_url_from_jsonld, primary_website, other_links are at positions 7-10
        const primaryWebsite = fields[9]?.trim(); // Use this for website field
        streetAddress = fields[11]?.trim();
        city = fields[12]?.trim();
        region = fields[13]?.trim();
        postalCode = fields[14]?.trim();
        country = fields[15]?.trim();
        latitude = fields[16]?.trim();
        longitude = fields[17]?.trim();
        ftoImageUrl = fields[20]?.trim(); // fto_image_url at position 20
        
        // Store website for later
        var website = primaryWebsite || '';
      } else {
        // Old format
        streetAddress = fields[7]?.trim();
        city = fields[8]?.trim();
        region = fields[9]?.trim();
        postalCode = fields[10]?.trim();
        country = fields[11]?.trim();
        latitude = fields[12]?.trim();
        longitude = fields[13]?.trim();
        ftoImageUrl = fields[14]?.trim();
        var website = '';
      }
      
      if (!name || !country) return null;
      
      // Build tags from substance
      const tags: string[] = [];
      if (substance) {
        tags.push(substance.charAt(0).toUpperCase() + substance.slice(1)); // Capitalize
      }
      tags.push('Clinic'); // Add generic clinic tag
      
      // Category is always "Clinic"
      const category = "Clinic";
      
      // Clean fields for CSV
      const cleanName = name.replace(/"/g, '""');
      const cleanCity = city.replace(/"/g, '""');
      const cleanCountry = country.replace(/"/g, '""');
      const cleanDescription = description.replace(/"/g, '""');
      const cleanPhone = telephone.replace(/"/g, '""');
      const cleanWebsite = website.replace(/"/g, '""');
      
      // Use provided image URL or default placeholder for clinics
      const imageUrl = ftoImageUrl || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800';
      const cleanImage = imageUrl.replace(/"/g, '""');
      
      // Build tags string (comma-separated within quotes)
      const tagsStr = tags.length > 0 
        ? `"${tags.join(',')}"` // Tags als comma-separated binnen quotes
        : '""';
      
      // Build offerings array (include price range if available)
      const offerings: string[] = [];
      if (priceRange && priceRange !== '-' && priceRange !== 'N/A' && priceRange !== '.N/A') {
        offerings.push(`Price Range: ${priceRange}`);
      }
      if (streetAddress) {
        offerings.push(`Address: ${streetAddress}${postalCode ? ', ' + postalCode : ''}`);
      }
      
      const offeringsStr = offerings.length > 0
        ? `"${offerings.map(o => o.replace(/"/g, '""')).join(',')}"` // Fix: added closing quote
        : '""';
      
      // Create essence (short description - first 150 chars)
      const essence = description.substring(0, 150) + (description.length > 150 ? '...' : '');
      const cleanEssence = essence.replace(/"/g, '""');
      
      // Philosophy is empty for clinics
      const philosophy = "";
      
      // Build CSV row with all fields
      // Format: name,category,city,country,tags,essence,image,website,about,offerings,philosophy,relatedIds
      return `"${cleanName}","${category}","${cleanCity}","${cleanCountry}",${tagsStr},"${cleanEssence}","${cleanImage}","${cleanWebsite}","${cleanDescription}",${offeringsStr},"${philosophy}",""`;
    })
    .filter(Boolean);
  
  // Add CSV header
  const header = 'name,category,city,country,tags,essence,image,website,about,offerings,philosophy,relatedIds';
  
  return [header, ...convertedListings].join('\n');
}

/**
 * Parse a CSV line handling quoted fields with commas and newlines
 */
function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let currentField = '';
  let insideQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++;
      } else {
        // Toggle quotes
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      // Field separator
      fields.push(currentField);
      currentField = '';
    } else {
      currentField += char;
    }
  }
  
  // Add last field
  fields.push(currentField);
  
  return fields;
}