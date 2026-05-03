# Retreat Import Instructions

## Method 1: Using the Conversion Tool (Recommended)

The easiest way to import your retreat data is to use the built-in conversion tool:

1. Open `/public/retreat-import-tool.html` in your browser (or navigate to `https://your-domain.com/retreat-import-tool.html` once deployed)
2. Copy ALL your retreat data (the TSV format data you provided)
3. Paste it into the text area
4. Click "Convert to CSV"
5. Click "Download CSV" to save the converted file
6. Go to Admin Panel (`/admin`) > Listings
7. Click "Import Retreat CSV"
8. Select the downloaded CSV file
9. Confirm the action

This tool will automatically:
- Parse your TSV data
- Convert it to the proper CSV format
- Handle special characters and escaping
- Generate all required fields

## Method 2: Direct Admin Panel Import

If you prefer to use the admin panel directly:

1. Copy your retreat data to a text file
2. Save it with `.tsv` extension
3. Go to Admin Panel (`/admin`) > Listings
4. Click "Import Retreat CSV"
5. Select your TSV file
6. Confirm (this will delete ALL existing listings and import the new retreat data)

## Quick Start

I've added a special "Import Retreat CSV" button to the Listings Manager in the admin panel. Here's how to use it:

1. Go to the Admin Panel (`/admin`)
2. Navigate to "Listings"
3. Copy the retreat data you provided (the TSV format data)
4. Save it to a file with extension `.tsv` (tab-separated values)
5. Click the "Import Retreat CSV" button
6. Select your TSV file
7. Confirm the action (this will delete ALL existing listings and import the new retreat data)

## What Happens

The import process will:

1. **Delete all existing listings** - This clears out the database
2. **Convert TSV to CSV** - Converts your retreat data from TSV format to the proper CSV format that the backend expects
3. **Import new listings** - Creates all new listings from the retreat data

Each retreat entry is converted to a Listing with:
- **Name**: The retreat name
- **Category**: "Retreat Center"
- **Location**: City and Country from your data
- **Tags**: ["Retreat Center", "{Type}"] - where type is extracted from the category (e.g., "Ayahuasca", "Psilocybin mushroom", etc.)
- **Essence**: First 150 characters of the short description
- **Image**: The Page Image URL from your data
- **Website**: First link from External Links
- **About**: Full short description
- **Offerings**: Array containing price range, contact info, and address
- **Philosophy**: Auto-generated based on retreat type

## Data Format

Your source data should be in TSV (tab-separated values) format with these columns:

```
Item Type	Name	Title (Page)	Short Description	Category (from URL)	Street Address	City	Region/State	Country	Postal Code	Latitude	Longitude	Phone	Price Range	External Links	Detected Data Type	Page Image URL
```

## Alternative: Manual CSV Creation

If you prefer to create a proper CSV file directly, use this format:

```csv
name,category,location,tags,essence,image,website,about,offerings,philosophy,relatedIds
"Retreat Name","Retreat Center","{""city"":""City"",""country"":""Country""}","Retreat Center;Type","Short essence...","https://image.url","https://website.url","Full description","Price Range: $X;Contact: phone;Address: full address","Philosophy text",""
```

## Troubleshooting

If the import fails:

1. **Check the file format**: Make sure it's TSV (tab-separated) not CSV (comma-separated)
2. **Check for special characters**: Some characters might need to be escaped
3. **Check the console**: Open browser dev tools (F12) and check the Console tab for error messages
4. **Check the network tab**: Look for failed API requests

## Technical Details

The import process uses these utility functions:
- `deleteAllListings()` - Deletes all listings via API
- `convertRetreatsToListingsCSV()` - Converts TSV retreat data to CSV format
- `importListingsFromCSV()` - Imports CSV data via API

All code is in `/utils/processRetreatData.ts`.