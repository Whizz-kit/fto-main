// This script converts the retreat data into a CSV format compatible with the listings import
// Run this in the browser console or as a Node.js script

export const retreatData = `Item Type	Name	Title (Page)	Short Description	Category (from URL)	Street Address	City	Region/State	Country	Postal Code	Latitude	Longitude	Phone	Price Range	External Links	Detected Data Type	Page Image URL
Resort	Dimensions Algonquin Highlands	Dimensions Algonquin Highlands - Cannabis Retreat in Algonquin Highlands	Accommodation and meals are included in your rate. Your accommodation in a private cabin includes all programmed activities, one cannabis psychedelic plant ceremony,  and meals prepared daily to suit all dietary needs by Dimensions Algonquin Highlands' Executive Chef Miriam Echeverria. These all-inclusive accommodations, amenities, and activities (including two wellness activities (3 on 4 night stays), two bodywork (3 on 4 nights stays), outdoor activities, evening gatherings, worksheets, and meditations) are all conducted by Dimensions' staff.	retreats > cannabis	1218 Canopy Ln	Algonquin Highlands	Ontario	Canada	K0M 1J1	45.106393	-78.659319	1-888-884-4222	$1,200 per night (starting at)	https://dimensionsretreats.com	Retreat	https://ik.imagekit.io/fto/images/089.jpg`;

function parseTabSeparatedData(tsvData: string) {
  const lines = tsvData.trim().split('\n');
  const headers = lines[0].split('\t');
  const rows = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split('\t');
    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    rows.push(row);
  }
  
  return rows;
}

function escapeCSV(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function convertToListingCSV(retreatRows: any[]): string {
  const csvLines = [];
  
  // Header
  csvLines.push('name,category,location,tags,essence,image,website,about,offerings,philosophy,relatedIds');
  
  // Data rows
  for (const row of retreatRows) {
    // Extract category type from "retreats > type"
    const categoryParts = row['Category (from URL)'].split('>').map((p: string) => p.trim());
    const retreatType = categoryParts[1] || 'retreat';
    const retreatTypeCapitalized = retreatType.charAt(0).toUpperCase() + retreatType.slice(1).replace(/-/g, ' ');
    
    // Parse external links
    const links = row['External Links'].split('|').map((l: string) => l.trim()).filter(Boolean);
    const website = links[0] || '';
    
    // Build location object
    const location = JSON.stringify({
      city: row['City'],
      country: row['Country']
    });
    
    // Build tags
    const tags = `Retreat Center;${retreatTypeCapitalized}`;
    
    // Essence is first 150 chars
    const essence = row['Short Description'].substring(0, 150) + (row['Short Description'].length > 150 ? '...' : '');
    
    // Build offerings array
    const offerings = [
      row['Price Range'] ? `Price Range: ${row['Price Range']}` : '',
      row['Phone'] ? `Contact: ${row['Phone']}` : '',
      row['Street Address'] ? `Address: ${row['Street Address']}, ${row['City']}, ${row['Region/State']}, ${row['Country']}` : ''
    ].filter(Boolean).join(';');
    
    const philosophy = `${row['Name']} specializes in ${retreatType} retreats.`;
    
    const csvRow = [
      escapeCSV(row['Name']),
      escapeCSV('Retreat Center'),
      escapeCSV(location),
      escapeCSV(tags),
      escapeCSV(essence),
      escapeCSV(row['Page Image URL']),
      escapeCSV(website),
      escapeCSV(row['Short Description']),
      escapeCSV(offerings),
      escapeCSV(philosophy),
      escapeCSV('') // relatedIds
    ].join(',');
    
    csvLines.push(csvRow);
  }
  
  return csvLines.join('\n');
}

// Export function to use in browser/Node
export function generateListingsCSV(tsvData: string): string {
  const rows = parseTabSeparatedData(tsvData);
  return convertToListingCSV(rows);
}
