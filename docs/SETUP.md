# Find The Others - Setup Guide

## Overview

This is the complete FTO platform combining:
- **Main Site**: Home page with mission, values, and overview
- **Directory**: Curated listings of consciousness-driven communities, practitioners, and projects
- **News**: Articles, insights, and stories from the community
- **Events**: Calendar of retreats, workshops, and gatherings
- **CMS**: Full content management system for managing all content

## Architecture

- **Frontend**: React + Tailwind CSS
- **Backend**: Supabase Edge Functions (Hono server)
- **Database**: Supabase KV Store
- **Auth**: Supabase Auth (for admin access)

## First-Time Setup

### 1. Create Admin Account

Since this is your first time, you need to create an admin account:

1. Click "Admin" in the footer (bottom left, small text)
2. You'll see the login screen
3. To create your first admin account, you'll need to sign up via the API

**Option A: Use the backend signup endpoint**

Send a POST request to create your admin user:

```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-34132228/auth/signup \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "email": "admin@fto.world",
    "password": "your-secure-password",
    "name": "Admin"
  }'
```

**Option B: Temporarily modify the code**

You can temporarily add a signup form to the AdminLogin component, or use the Supabase dashboard to create a user manually.

### 2. Import Mock Data

Once logged in to the CMS:

1. Go to the **Listings** tab
2. Click **"Import Mock Data"** to populate the directory with example listings
3. This will import all 8 mock listings from the codebase

You can now edit, delete, or add new listings through the CMS.

### 3. Add News & Events

Navigate to the **News** and **Events** tabs to start creating content for those sections.

## CMS Features

### Listings Management
- **Create/Edit/Delete** listings
- **Import/Export** CSV for bulk operations
- Import mock data with one click
- Full CRUD interface

### News Management
- Create articles with categories (insight, story, research, announcement)
- Add images, tags, and publish dates
- Manage all news content from the CMS

### Events Management
- Create events (online, in-person, or hybrid)
- Set dates, locations, pricing
- Add images and event details

### Import/Export
- Export all listings as CSV
- Import listings from CSV (spreadsheet format)
- Perfect for bulk updates and backups

## CSV Format for Import

When exporting, the system creates a CSV with all fields. To import:

1. Use the same column headers
2. For arrays (like tags, offerings), separate items with semicolons (`;`)
3. For nested objects (like location), use JSON format

Example CSV structure:
```csv
id,name,category,location,tags,essence,image,website,about,offerings,philosophy,relatedIds
1,"Community Name","Community Space","{""city"":""Berlin"",""country"":""Germany""}","Community-led;Trauma-informed","A short description","https://...","https://...","About text","Offering 1;Offering 2","Philosophy text","2;3"
```

## Accessing the CMS

1. Click **"Admin"** in the footer (small text, bottom left)
2. Log in with your admin credentials
3. Use the tabs to manage Listings, News, or Events
4. Changes are saved to the backend immediately

## Public Pages

- **Home** (`/`): Main landing page with mission and values
- **Directory** (`/directory`): Searchable/filterable directory of listings
- **About** (`/about`): Mission and values specifically for the directory
- **News** (`/news`): All news articles with filtering
- **Events** (`/events`): Upcoming and past events
- **Admin** (`/admin`): CMS for content management (requires auth)

## Backend Routes

All backend routes are prefixed with `/make-server-34132228/`:

### Public Routes
- `GET /listings` - Get all listings
- `GET /listings/:id` - Get single listing
- `GET /news` - Get all news articles
- `GET /news/:id` - Get single article
- `GET /events` - Get all events
- `GET /events/:id` - Get single event

### Admin Routes (require auth)
- `POST /auth/signup` - Create admin user
- `POST /listings` - Create listing
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing
- `POST /news` - Create article
- `PUT /news/:id` - Update article
- `DELETE /news/:id` - Delete article
- `POST /events` - Create event
- `PUT /events/:id` - Update event
- `DELETE /events/:id` - Delete event
- `GET /export/listings` - Export listings as CSV
- `POST /import/listings` - Import listings from CSV
- `POST /seed` - Seed data (for initial setup)

## Tips

### For Content Management
- Use the CMS for all content updates (no need to edit code)
- Export regularly to back up your data
- Use tags consistently across listings for better filtering

### For Development
- Mock data is in `/data/mockListings.ts` - use as reference
- All types are defined in `/data/types.ts`
- Backend code is in `/supabase/functions/server/index.tsx`

### For Deployment
- The platform works with Supabase's infrastructure
- No additional setup needed beyond Supabase configuration
- All content is stored in the KV store

## Troubleshooting

**Can't log in to admin?**
- Make sure you've created an admin account via the signup endpoint
- Check that your email/password are correct
- Check browser console for error messages

**Listings not showing?**
- Import mock data from the CMS
- Check that the backend is running (test `/health` endpoint)
- Check browser console for API errors

**Import/Export not working?**
- Make sure you're logged in as admin
- Check that CSV format matches the expected structure
- Look at browser console for detailed error messages

## Support

For questions or issues, join our Discord community or check the main FTO site for contact information.

---

**Happy curating! May you find all the others. ✨**
