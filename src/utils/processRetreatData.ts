// Process retreat data and convert to listings CSV format

export async function deleteAllListings(_accessToken: string): Promise<number> {
  return 0;
}

export async function importListingsFromCSV(_csvData: string, _accessToken: string): Promise<number> {
  return 0;
}

function escapeCSV(value: string): string {
  if (!value) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('{') || str.includes('}')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function convertRetreatsToListingsCSV(tsvData: string): string {
  const lines = tsvData.trim().split('\n').filter(line => line && line.trim());

  if (lines.length < 2) {
    throw new Error('CSV must have headers and at least one data row');
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
        i++;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  }

  const headerLine = lines[0];
  const headers = parseCSVLine(headerLine);

  const csvLines = [];
  csvLines.push('name,category,location,tags,essence,image,website,about,offerings,philosophy,relatedIds');

  for (let i = 1; i < lines.length; i++) {
    try {
      const line = lines[i];
      if (!line || !line.trim()) continue;

      const values = parseCSVLine(line);
      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header.trim()] = (values[index] || '').trim();
      });

      const categoryParts = (row['Category (from URL)'] || '').split('>').map((p: string) => p.trim());
      const retreatType = categoryParts[1] || 'retreat';
      const retreatTypeCapitalized = retreatType.charAt(0).toUpperCase() + retreatType.slice(1).replace(/-/g, ' ');

      const links = (row['External Links'] || '').split('|').map((l: string) => l.trim()).filter(Boolean);
      const website = links[0] || '';

      const imageUrl = row['Page Image URL'] || row['Image URL'] || row['Image'] || '';

      const location = JSON.stringify({
        city: row['City'] || '',
        country: row['Country'] || ''
      });

      const tags = `Retreat Center;${retreatTypeCapitalized}`;

      const shortDesc = row['Short Description'] || '';
      const essence = shortDesc.substring(0, 150) + (shortDesc.length > 150 ? '...' : '');

      const offeringsArray = [
        row['Price Range'] ? `Price Range: ${row['Price Range']}` : '',
        row['Phone'] ? `Contact: ${row['Phone']}` : '',
        row['Street Address'] ? `Address: ${row['Street Address']}, ${row['City']}, ${row['Region/State']}, ${row['Country']}` : ''
      ].filter(Boolean);
      const offerings = offeringsArray.join(';');

      const philosophy = `${row['Name'] || 'This retreat center'} specializes in ${retreatType.replace(/-/g, ' ')} retreats.`;

      const csvRow = [
        escapeCSV(row['Name']),
        escapeCSV('Retreat Center'),
        escapeCSV(location),
        escapeCSV(tags),
        escapeCSV(essence),
        escapeCSV(imageUrl),
        escapeCSV(website),
        escapeCSV(row['Short Description']),
        escapeCSV(offerings),
        escapeCSV(philosophy),
        escapeCSV('')
      ].join(',');

      csvLines.push(csvRow);
    } catch {
      // Skip malformed rows
    }
  }

  return csvLines.join('\n');
}
