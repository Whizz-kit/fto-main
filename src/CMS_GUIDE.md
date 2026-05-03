# FTO CMS Quick Reference

## Getting Started

### First Time Setup
1. Navigate to the site
2. Scroll to footer → Click "Admin" 
3. Click "First time? Create admin account"
4. Enter email, password, name
5. Click "Create Account"
6. You're automatically logged in!

### Import Sample Data
1. In CMS, go to **Listings** tab
2. Click **"Import Mock Data"**
3. 8 sample listings will be added instantly
4. Now you can browse the directory on the public site

## Daily Workflow

### Managing Listings

**Add New Listing:**
1. Listings tab → "New Listing"
2. Fill in required fields:
   - Name (e.g., "The Sanctuary Collective")
   - Category (select from dropdown)
   - City & Country
   - Tags (comma-separated: "Community-led, Trauma-informed")
   - Essence (1-2 sentence description)
   - Image URL (use Unsplash or your own)
   - Website URL
   - About (full description)
   - Offerings (one per line)
   - Philosophy (core values/approach)
3. Click "Save Listing"

**Edit Listing:**
1. Find listing in table
2. Click pencil icon
3. Update any fields
4. Click "Save Listing"

**Delete Listing:**
1. Find listing in table
2. Click trash icon
3. Confirm deletion

### Managing News

**Create Article:**
1. News tab → "New Article"
2. Fill in:
   - Title
   - Category (insight/story/research/announcement)
   - Author name
   - Published date
   - Image URL
   - Tags (comma-separated)
   - Excerpt (short preview)
   - Content (full article text)
3. Click "Save Article"

**Edit Article:**
- Click pencil icon → Make changes → Save

**Delete Article:**
- Click trash icon → Confirm

### Managing Events

**Create Event:**
1. Events tab → "New Event"
2. Fill in:
   - Title
   - Start Date (required)
   - End Date (optional, for multi-day events)
   - Location Type (online/in-person/hybrid)
   - City & Country (if in-person)
   - Organizer name
   - Price Type (free/paid/donation)
   - Image URL
   - Website (registration link)
   - Tags (comma-separated)
   - Description (full details)
3. Click "Save Event"

**Edit/Delete Event:**
- Same as news and listings

## Import/Export

### Export All Listings
1. Listings tab → "Export CSV"
2. CSV downloads automatically
3. Save as backup or edit in spreadsheet

### Import Listings from CSV
1. Prepare CSV file (keep same column structure as export)
2. For arrays: use semicolons (e.g., "tag1;tag2;tag3")
3. For nested objects: use JSON format
4. Listings tab → "Import CSV" → Select file
5. Listings are imported and shown immediately

### CSV Format Example
```csv
name,category,city,country,tags,essence,image,website
"Community Name","Community Space","Berlin","Germany","Community-led;Trauma-informed","Short description","https://image-url.jpg","https://website.com"
```

## Tips & Best Practices

### Images
- Use high-quality images (min 1200px wide)
- Recommend Unsplash for free stock photos
- Aspect ratio: 4:3 works best
- Format: JPG or PNG

### Writing Content
- **Essence**: Keep to 1-2 sentences, poetic but clear
- **About**: 2-3 paragraphs telling the story
- **Offerings**: Bullet point list, start with verb
- **Philosophy**: Core values and approach, 1-2 paragraphs

### Tags
- Use 3-5 tags per listing
- Keep tags consistent (check existing listings)
- Common tags: "Community-led", "Trauma-informed", "Nature-based", "Online courses", "Plant medicine"

### Categories
Use the most specific category:
- **Community Space**: Physical gathering places
- **Healing Practice**: Therapists, bodyworkers, facilitators
- **Art & Creativity**: Artists, studios, creative platforms
- **Retreat Center**: Places hosting multi-day retreats
- **Research Project**: Academic or independent research
- **Education Platform**: Online courses, learning tools
- **Sound Healing**: Sound baths, music therapy
- **Community Network**: Online communities, networks

### News Categories
- **Insight**: Reflections, teachings, wisdom
- **Story**: Personal stories, interviews, profiles
- **Research**: Scientific findings, studies
- **Announcement**: News, updates, launches

### Event Location Types
- **Online**: Virtual via Zoom, etc.
- **In-Person**: Physical location required
- **Hybrid**: Both online and in-person options

## Keyboard Shortcuts

- **Tab**: Navigate between fields
- **Enter**: Submit form (when in text input)
- **Escape**: Close modal/dialog

## Common Tasks

### Adding Multiple Listings at Once
1. Create a CSV with all listings
2. Use Import CSV function
3. All listings load at once

### Updating Multiple Listings
1. Export CSV
2. Edit in spreadsheet software
3. Import updated CSV
4. Listings are updated with new data

### Backing Up Content
1. Export CSV for listings
2. Save file with date: `fto-listings-2025-10-11.csv`
3. Store in safe location
4. Repeat regularly (weekly/monthly)

### Finding Specific Content
- Use browser search (Cmd/Ctrl + F) in the CMS tables
- Filter by category in News/Events tabs
- Search by text in the public directory

## Troubleshooting

**Changes not showing?**
- Refresh the page (Cmd/Ctrl + R)
- Clear cache and hard reload (Cmd/Ctrl + Shift + R)
- Check that you clicked "Save"

**CSV import failed?**
- Check file format matches export format
- Ensure no special characters breaking CSV structure
- Try importing one row at a time to identify issue

**Can't log in?**
- Check email and password are correct
- Clear browser cache and cookies
- Try different browser
- Create new admin account if needed

**Images not loading?**
- Verify URL is publicly accessible
- Check image URL doesn't have authentication
- Try different image host (Unsplash recommended)

## Security Notes

- Keep admin credentials secure
- Only share admin access with trusted team members
- Log out when done using public/shared computers
- Use strong, unique password
- Don't share access token or session details

## Getting Help

- Check README.md for technical details
- Check SETUP.md for backend/API info
- Join Discord community for support
- Contact: admin@fto.world

---

**Happy curating! ✨**

*The mycelium grows stronger with each connection.*
