# 🔄 Webflow to FTO Import Guide

## Direct CSV Import van Webflow naar FTO

Je kunt nu **direct** je Webflow CMS export uploaden zonder kolommen te hernoemen! 

---

## ✅ Automatische Mapping

Het systeem herkent automatisch Webflow kolommen en mapt ze naar FTO velden:

| Webflow Kolom | FTO Veld | Notes |
|---------------|----------|-------|
| **Name** | `title` | Required |
| **Slug** | `slug` | Auto-generated if empty |
| **Short description** | `excerpt` | Required |
| **Post body** | `content` | Required (HTML supported) |
| **Main Image** | `image` | URL |
| **Published On** | `publishedAt` | ISO date |
| **Created On** | `createdAt` | ISO date |
| **Updated On** | `updatedAt` | ISO date |
| **Foundational Knowledge** | `category` | Boolean → Category |
| **Psychedelics** | `category` | Boolean → Category |
| **Breathwork** | `category` | Boolean → Category |
| **Meditation & Mindfulness** | `category` | Boolean → Category |
| **Draft** | `featured` | TRUE = not featured |
| **Archived** | (skipped) | Archived items not imported |

---

## 📋 Hoe het werkt

### 1. **Category Detection**
Webflow gebruikt boolean velden voor categorieën. Het systeem kiest de **eerste TRUE** waarde:

```
Foundational Knowledge = TRUE  → category: "Foundational Knowledge"
Psychedelics = FALSE
Breathwork = FALSE
Meditation & Mindfulness = FALSE
```

### 2. **Archived & Draft Handling**
- ✅ **Archived = TRUE** → Item wordt **overgeslagen**
- ✅ **Draft = TRUE** → `featured: false`
- ✅ **Draft = FALSE** → `featured: true`

### 3. **Tab-Separated Values**
Webflow exporteert met **tabs** (niet komma's). Het systeem detecteert dit automatisch.

---

## 🚀 Stap-voor-Stap Import

### Stap 1: Export vanuit Webflow
1. Ga naar je Webflow CMS Collection (Knowledge/Explore)
2. Klik op **Export** (rechterbovenhoek)
3. Download de CSV (tab-separated)

### Stap 2: Voorbereiding (belangrijk!)
1. **Open Browser DevTools** (F12)
2. Ga naar **Console** tab
3. Houd dit open tijdens import voor live debugging
4. Je ziet nu real-time logs van wat er gebeurt

### Stap 3: Import in FTO Admin
1. Log in op FTO Admin Dashboard
2. Ga naar **"Explore" tab**
3. Klik op **"Import CSV (Webflow)"**
4. Selecteer je Webflow export bestand
5. **Kijk naar Console** - je ziet live welke rows worden verwerkt
6. ✅ Done! Articles worden geïmporteerd

### Stap 4: Verificatie
**Toast Notification:**
```
✅ Imported 15 articles, skipped 3 (archived/invalid)
```

**Console Output (F12):**
```
=== WEBFLOW IMPORT START ===
Total lines: 18
Detected separator: TAB
Headers found: 17
Header names: ['Name', 'Slug', 'Archived', 'Draft', ...]

--- Row 1 ---
Name: Becoming the medicine
Archived: FALSE
Draft: FALSE
  Foundational Knowledge: FALSE
  Psychedelics: TRUE
  Breathwork: FALSE
  Meditation & Mindfulness: FALSE
Detected category: Psychedelics
✓ Imported: "Becoming the medicine" → Psychedelics

--- Row 2 ---
Name: Old archived post
Archived: TRUE
✗ Skipped (archived): Old archived post

=== WEBFLOW IMPORT COMPLETE ===
Imported: 15, Skipped: 3
```

**Skipped items** kunnen zijn:
- ✗ Archived = TRUE
- ✗ Ontbrekende Name (title)
- ✗ Geen category TRUE
- ✗ Invalid/corrupt row data

---

## 📊 Voorbeeld Webflow Export

```tsv
Name	Slug	Archived	Draft	Main Image	Short description	Post body	Foundational Knowledge	Psychedelics	Breathwork	Meditation & Mindfulness
Becoming the medicine	becoming-the-medicine	FALSE	FALSE		The trip isn't the end...	<h3>Full content...</h3>	FALSE	TRUE	FALSE	FALSE
Breathwork guide	breathwork-guide	FALSE	FALSE		Your breath is a portal...	<h3>Full content...</h3>	FALSE	FALSE	TRUE	FALSE
```

**Dit wordt automatisch:**

```json
{
  "title": "Becoming the medicine",
  "slug": "becoming-the-medicine",
  "excerpt": "The trip isn't the end...",
  "content": "<h3>Full content...</h3>",
  "category": "Psychedelics",
  "featured": true,
  "image": "",
  "author": "",
  "readTime": "",
  "tags": []
}
```

---

## ⚙️ Velden die NIET in Webflow zitten

Deze velden zijn optioneel en blijven leeg bij import:

- **author** - Kan later handmatig toegevoegd worden
- **readTime** - Kan later handmatig toegevoegd worden  
- **tags** - Webflow heeft geen tags veld in deze export

Je kunt deze velden **na import** toevoegen via de FTO Admin editor.

---

## 🔍 Troubleshooting

### "Skipped X articles"

**Mogelijke oorzaken:**
1. **Archived = TRUE** - Dit is normaal, archived items worden niet geïmporteerd
2. **Ontbrekende Name** - Article heeft geen titel
3. **Geen category geselecteerd** - Geen van de boolean category velden is TRUE
4. **Invalid data** - Corrupt CSV bestand

**Oplossing:**
1. **Open Browser Console** (F12 → Console tab)
2. Kijk naar de import logs:
   ```
   === WEBFLOW IMPORT START ===
   Total lines: 15
   Detected separator: TAB
   Headers found: 17
   
   --- Row 1 ---
   Name: Becoming the medicine
   Archived: FALSE
   Draft: FALSE
     Foundational Knowledge: FALSE
     Psychedelics: TRUE
     Breathwork: FALSE
     Meditation & Mindfulness: FALSE
   Detected category: Psychedelics
   ✓ Imported: "Becoming the medicine" → Psychedelics
   ```
3. Zoek naar rows met `✗ Skipped` om te zien waarom
4. Check of category booleans correct zijn (TRUE/FALSE)
5. Verifieer dat Name kolom niet leeg is

### "Failed to import"

**Debug Steps:**
1. ✅ **Ben je ingelogd als admin?**
   - Log uit en weer in als het niet werkt
   
2. ✅ **Check browser console** (F12)
   - Zoek naar rode error messages
   - Kopieer hele error voor debugging
   
3. ✅ **Verifieer bestand format:**
   - Open CSV in Notepad/TextEdit (NIET Excel!)
   - Check dat kolommen gescheiden zijn met TABS
   - Eerste regel moet headers bevatten
   - TRUE/FALSE moet in hoofdletters
   
4. ✅ **Test met voorbeeld bestand:**
   - Download `webflow-import-example.csv`
   - Probeer dit eerst te importeren
   - Als dit werkt, vergelijk met je eigen bestand
   
5. ✅ **Check server logs:**
   - Logs tonen exacte reden voor elke skipped row
   - Zoek naar "✗ Skipped" messages

---

## 📝 Best Practices

### Voor Import
1. ✅ **Backup eerst** - Export je huidige FTO data
2. ✅ **Test klein** - Importeer eerst 2-3 articles om te testen
3. ✅ **Check categorieën** - Zorg dat elke article één category (TRUE) heeft
4. ✅ **Verwijder archived** - Of accepteer dat ze worden overgeslagen

### Na Import
1. ✅ **Verificatie** - Check of alle articles zichtbaar zijn
2. ✅ **Voeg toe** - Author, readTime, tags handmatig
3. ✅ **Images** - Controleer of Main Image URLs kloppen
4. ✅ **Content** - Check of HTML formatting goed is

---

## 🎯 Multiple Categories?

**Let op:** Een article kan maar **één category** hebben in FTO.

Als Webflow meerdere booleans heeft:
```
Foundational Knowledge = TRUE
Psychedelics = TRUE  ← Deze wordt NIET gebruikt
```

**Het systeem kiest de EERSTE TRUE in deze volgorde:**
1. Foundational Knowledge
2. Psychedelics
3. Breathwork
4. Meditation & Mindfulness

**Workaround:**
- Importeer articles per category
- Of pas Webflow export aan (één TRUE per row)

---

## 💡 Pro Tips

### 1. Bulk Updates
Na import kun je via FTO Admin:
- Bulk edit categories
- Add authors in batch
- Set featured articles
- Add tags

### 2. Re-import
Als je opnieuw importeert:
- ✅ Nieuwe UUIDs worden gegenereerd
- ✅ Je krijgt duplicates (oude blijven staan)
- ⚠️ Verwijder oude articles eerst als je geen duplicates wilt

### 3. Featured Logic
Webflow **Draft** wordt geïnverteerd:
- Draft = FALSE → Featured in FTO
- Draft = TRUE → Niet featured

---

## 🔄 Export terug naar Webflow?

FTO exporteert in **FTO format** (niet Webflow format):

```csv
title,slug,excerpt,content,category,image,author,readTime,publishedAt,tags,featured
```

**Om terug te importeren in Webflow:**
1. Open FTO export in Excel/Google Sheets
2. Map kolommen handmatig naar Webflow velden
3. Converteer category naar boolean velden
4. Save as tab-separated

*Of vraag om een Webflow export formatter (custom tool).*

---

## 📚 Related Docs

- [CSV_IMPORT_GUIDE.md](CSV_IMPORT_GUIDE.md) - Algemene CSV import guide
- [CMS_GUIDE.md](CMS_GUIDE.md) - Admin dashboard handleiding
- [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md) - Deployment checklist

---

## ✅ Pre-Import Checklist

Voor je importeert, zorg dat:

- [ ] Webflow export gedownload (via CMS → Export)
- [ ] Admin ingelogd in FTO
- [ ] **Browser Console open** (F12 → Console tab) ⭐ BELANGRIJK
- [ ] Backup van huidige FTO data gemaakt (via Export CSV)
- [ ] Categorieën correct in Webflow (minstens één TRUE per article)
- [ ] Archived articles verwijderd of geaccepteerd dat ze skipped worden

**Ready to import!** 🚀

---

## 🐛 Debug Checklist (als import niet werkt)

Als je problemen hebt:

1. **[ ] Console open?**
   - F12 → Console tab
   - Refresh page en probeer opnieuw
   
2. **[ ] Errors in console?**
   - Kopieer hele error message
   - Check of "Unauthorized" → log opnieuw in
   
3. **[ ] Test met voorbeeld:**
   - Download `webflow-import-example.csv`
   - Importeer dit eerst
   - Werkt? Dan is je eigen bestand het probleem
   
4. **[ ] Bestand format check:**
   - Open in TextEdit/Notepad (NIET Excel!)
   - Zie je TABS tussen kolommen? (niet komma's)
   - Eerste regel = headers?
   - TRUE/FALSE in hoofdletters?
   
5. **[ ] Column mapping:**
   - Heeft je export deze kolommen?
     - Name ✓
     - Slug ✓
     - Short description ✓
     - Post body ✓
     - Foundational Knowledge / Psychedelics / Breathwork / Meditation & Mindfulness ✓
   
6. **[ ] Category check:**
   - Open je CSV
   - Heeft ELKE article minstens één TRUE?
   - Geen articles met alle FALSE?

**Nog steeds problemen?** Kopieer de console output en deel deze voor verdere hulp.

---

## 🙏 Support

Problemen met import?

1. Check browser console (F12 → Console)
2. Check server logs voor details over skipped items
3. Verify Webflow export format (tab-separated)
4. Lees de error message in de toast notification

---

**Happy Importing!** 🎉

*Your Webflow content → FTO in seconds* ⚡

---

**Last Updated:** 2025-01-11  
**Version:** 1.0 (Webflow Direct Import)
