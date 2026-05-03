# 📖 Article Detail Views - User Guide

## ✅ What's New

Je kunt nu klikken op News en Explore artikelen om de volledige inhoud te lezen!

---

## 🗞️ News Articles

### Hoe te Gebruiken:

1. **Ga naar News pagina**: Klik "News" in de navigatie
2. **Blader door artikelen**: Zie alle gepubliceerde nieuwsartikelen
3. **Filter op categorie**: 
   - All
   - Insight
   - Story
   - Research
   - Announcement
4. **Klik op een artikel**: De hele kaart is klikbaar
5. **Lees het artikel**: Je ziet nu:
   - Hero image
   - Volledige titel
   - Auteur, datum, en leestijd
   - Volledige content
   - Alle tags
   - Share knop

### Navigatie:

- **Terug**: Klik "Back to News" knop (linksboven of linksonder)
- **Share**: Klik "Share" knop (rechtsonder)

---

## 🧠 Knowledge Articles (Explore)

### Hoe te Gebruiken:

1. **Ga naar Explore**: Klik "Explore" in de navigatie
2. **Kies een categorie**:
   - 📚 Foundational Knowledge
   - 🧠 Psychedelics
   - 💨 Breathwork
   - 🌸 Meditation & Mindfulness
3. **Zie artikelen in categorie**: Featured artikel bovenaan + grid
4. **Klik op een artikel**: Lees de volledige content
5. **Details bekijken**:
   - Hero image
   - Categorie badge
   - Featured badge (indien van toepassing)
   - Auteur en leestijd
   - Volledige content
   - Alle tags
   - Share optie

### Navigatie:

- **Terug naar categorie**: Klik "Back to [Category]" knop
- **Terug naar Explore**: Ga eerst terug naar categorie, dan "Back to Explore"
- **Share**: Klik "Share" knop om artikel te delen

---

## ✨ Features

### Responsive Design

Beide detail views werken perfect op:
- 📱 **Mobile**: Volledig responsive layout
- 💻 **Tablet**: Optimized reading experience
- 🖥️ **Desktop**: Beautiful large format

### Content Formatting

- **Line breaks**: Content wordt automatisch geformatteerd
- **Paragraphs**: Dubbele line breaks maken nieuwe paragrafen
- **Images**: Hero images in vol scherm
- **Typography**: Optimized voor leesbaarheid

### Social Sharing

Op ondersteunde browsers:
- Klik "Share" knop
- Native share sheet opent
- Deel naar apps, social media, etc.

---

## 🎨 Design Elements

### News Article Detail:

```
┌────────────────────────────────┐
│     [Back Button]              │
│                                │
│   Full-height Hero Image      │
│   with gradient overlay        │
│                                │
│   Category + Tags              │
│   Title (large, white)         │
│   Author | Date | Read Time    │
└────────────────────────────────┘

┌────────────────────────────────┐
│  Excerpt (italic, large)       │
│  ───────────────────           │
│                                │
│  Full Article Content          │
│  Formatted paragraphs          │
│  Easy to read                  │
│                                │
│  ───────────────────           │
│  🏷️ All Tags                   │
│                                │
│  [Back] ······· [Share]        │
└────────────────────────────────┘
```

### Knowledge Article Detail:

Identiek aan News, plus:
- Categorie icon en naam
- "Featured" badge indien van toepassing
- Terug naar specifieke categorie

---

## 💡 Tips

### Voor Lezers:

1. **Gebruik filters**: Vind snel relevante content
2. **Bookmark**: Save interessante URL's
3. **Share**: Deel waardevolle artikelen
4. **Explore verwante**: Check tags voor gerelateerde content

### Voor Admins:

Content toevoegen via CMS:

1. **Login op /admin**
2. **Ga naar News of Explore tab**
3. **Klik "New Article"**
4. **Vul alle velden in**:
   - Title (required)
   - Excerpt (samenvatting)
   - Content (volledige tekst)
   - Image URL (van Unsplash of je eigen hosting)
   - Author
   - Read Time (bijv. "5 min read")
   - Tags (comma-separated)
   - Category
   - Publish date
5. **Save Article**
6. **Test de detail view** door erop te klikken

---

## 📊 CSV Import

Artikelen bulk importeren:

### News CSV Format:

```csv
title,excerpt,content,image,author,publishedAt,readTime,tags,category
"Article Title","Short summary","Full content here...","https://...","Author Name","2025-01-10","5 min read","tag1;tag2;tag3","insight"
```

### Knowledge CSV Format:

```csv
title,slug,excerpt,content,category,image,author,readTime,publishedAt,tags,featured
"Guide Title","guide-slug","Summary","Full content...","foundational-knowledge","https://...","Expert","8 min read","2025-01-10","tag1;tag2","true"
```

**Import via Admin**:
1. Prepare CSV (zie `/CSV_IMPORT_GUIDE.md`)
2. Admin → News/Explore tab
3. Click "Import CSV"
4. Select file
5. Done! 🎉

---

## 🐛 Troubleshooting

### "Article not found"

**Oorzaak**: Artikel ID bestaat niet in database

**Oplossing**:
1. Check in Admin dashboard of artikel er staat
2. Refresh de pagina
3. Ga terug naar lijst en probeer opnieuw

### Geen content zichtbaar

**Oorzaak**: Content field is leeg

**Oplossing**:
1. Login op Admin
2. Edit het artikel
3. Voeg content toe
4. Save

### Afbeelding laadt niet

**Oorzaak**: Ongeldige image URL

**Oplossing**:
1. Check of URL geldig is
2. Update image URL in Admin
3. Gebruik Unsplash voor betrouwbare images

### "Loading article..." blijft hangen

**Oorzaak**: Backend niet bereikbaar

**Oplossing**:
1. Check of banner groen is (backend connected)
2. Check browser console voor errors
3. Refresh de pagina

---

## 🎯 Best Practices

### Content Writing:

1. **Title**: Duidelijk en beschrijvend
2. **Excerpt**: 1-2 zinnen die interesse wekken
3. **Content**: 
   - Gebruik line breaks voor leesbaarheid
   - Schrijf in paragrafen
   - Voeg headers toe (gebruik HTML als je wilt)
4. **Tags**: 3-5 relevante tags voor discoverability
5. **Images**: High quality, relevant afbeeldingen

### SEO & Discoverability:

- Gebruik descriptive titles
- Tags helpen met categorization
- Excerpt wordt gebruikt voor previews
- Author credits geven credibility

### User Experience:

- Keep content scannable
- Use white space effectively
- Add relevant tags
- Set accurate read time

---

## 📱 Mobile Experience

De detail views zijn geoptimaliseerd voor mobile:

- **Touch-friendly**: Grote klikbare gebieden
- **Swipe-ready**: Natuurlijke navigatie
- **Readable**: Optimized typography
- **Fast**: Lightweight images en code

---

## 🔄 Updates & Edits

Content updaten:

1. **Login op /admin**
2. **Vind artikel in lijst**
3. **Klik "Edit" (pencil icon)**
4. **Update velden**
5. **Save**
6. **Refresh detail view** om updates te zien

Alle changes zijn instant zichtbaar!

---

## ✨ Summary

Nu heb je:

✅ **Klikbare News artikelen** met volledige detail view
✅ **Klikbare Knowledge artikelen** per categorie
✅ **Beautiful reading experience** op alle devices
✅ **Share functionaliteit** voor distribution
✅ **Easy navigation** terug naar overzichten
✅ **Responsive design** voor alle schermformaten

**Veel leesplezier!** 📖✨

---

*May all beings find knowledge on their journey home.* 🌌
