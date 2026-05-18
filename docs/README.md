# Find The Others (FTO) - Platform

Welkom bij Find The Others - een curated, consciousness-driven directory platform.

**Version:** 1.1.0 | **Status:** ✅ Production Ready

## 🎉 Nieuw in v1.1.0

**Belangrijke Verbeteringen:**
- ✅ Volledige toetsenbord toegankelijkheid (WCAG compliant)
- ✅ Input validatie op alle endpoints
- ✅ Complete CSV import/export voor News
- ✅ Verbeterde error handling met retry logic
- ✅ Betere scroll behavior en UX
- ✅ Production hardening en bug fixes

Zie [CHANGELOG.md](CHANGELOG.md) voor volledige details | [IMPROVEMENTS_SUMMARY.md](IMPROVEMENTS_SUMMARY.md) voor samenvatting

## 🎯 Status: Backend Geconfigureerd ✅

**Je Supabase backend is volledig geconfigureerd!** Alleen deployment nodig.

### 🚦 Live Status Check

Open de app en kijk naar de **banner bovenaan**:
- 🟢 **Groen** = Backend live! Admin, CMS, alles werkt! 🎉
- 🔵 **Blauw** = Bezig met checken...
- 🟠 **Oranje** = Deploy backend met commando hieronder ↓

### ⚡ Deploy in 3 Commando's

```bash
supabase login
supabase link --project-ref wflyerojdodjthklfbpc
supabase functions deploy server
```

**→ Klaar! Check of de banner groen wordt.** 🟢

### 📚 Complete Guides

| 📖 Guide | 🎯 Gebruik Dit Als... |
|----------|---------------------|
| **[⚡ QUICK_START.md](./QUICK_START.md)** | Je wilt zo snel mogelijk starten (3 min) |
| **[✅ SUPABASE_SETUP_COMPLETE.md](./SUPABASE_SETUP_COMPLETE.md)** | Je wilt alles begrijpen wat er is opgezet |
| **[🔌 CONNECTION_STATUS.md](./CONNECTION_STATUS.md)** | Je wilt checken wat werkt en wat niet |
| **[📖 DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** | Je wilt naar productie deployen (Vercel/Netlify) |
| **[📊 CSV_IMPORT_GUIDE.md](./CSV_IMPORT_GUIDE.md)** | Je wilt algemene CSV import info |
| **[🔄 WEBFLOW_IMPORT_GUIDE.md](./WEBFLOW_IMPORT_GUIDE.md)** | Je wilt DIRECT Webflow CMS importeren (nieuw!) |
| **[⚙️ CMS_GUIDE.md](./CMS_GUIDE.md)** | Je wilt leren hoe admin dashboard werkt |
| **[📖 ARTICLE_VIEWS_GUIDE.md](./ARTICLE_VIEWS_GUIDE.md)** | Je wilt weten hoe artikel detail pagina's werken |
| **[📋 PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)** | Je gaat deployen naar productie |
| **[📝 CHANGELOG.md](./CHANGELOG.md)** | Je wilt zien wat er is veranderd |

### 🔍 Test je Deployment

Open `verify-deployment.html` in je browser voor automatische backend tests!

---

## 📍 Hoe Admin Toegang Te Vinden

Op de gepubliceerde site kun je naar Admin gaan via:

### Optie 1: Desktop Navigation
- Klik op **"Admin"** in de navigatie (rechts naast Community knop)

### Optie 2: Footer Link
- Scroll naar de **footer** (onderaan elke pagina)  
- Rechtsonder in de copyright tekst zie je een klein **"Admin"** linkje
- Klik daarop om naar Admin Login te gaan

### Optie 3: Mobile Menu
- Open het hamburger menu (rechtsboven)
- Scroll naar beneden  
- Klik **"🔐 Admin Login"**

⚠️ **Let op**: Admin werkt alleen na volledige deployment met Supabase backend (zie hieronder).

---

## 🚀 Maak Backend Live

Je Supabase backend is **al geconfigureerd**! Deploy in 3 commando's:

```bash
supabase login
supabase link --project-ref wflyerojdodjthklfbpc
supabase functions deploy server
```

**→ Klaar!** De banner wordt groen als het werkt. 🟢

### 📚 Guides:

| Guide | Wanneer te gebruiken |
|-------|---------------------|
| **[⚡ QUICK_START.md](./QUICK_START.md)** | Snelste weg naar werkende backend (3 min) |
| **[🔌 CONNECTION_STATUS.md](./CONNECTION_STATUS.md)** | Check wat werkt en wat niet |
| **[📖 DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** | Volledige deployment + productie setup |
| **[📊 CSV_IMPORT_GUIDE.md](./CSV_IMPORT_GUIDE.md)** | Webflow content importeren |
| **[⚙️ CMS_GUIDE.md](./CMS_GUIDE.md)** | Admin dashboard handleiding |

---

## 💻 Lokale Development

Voor lokaal testen en ontwikkeling:

```bash
# 1. Installeer dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# Navigeer naar http://localhost:3000
```

Voor volledige backend setup lokaal: zie [SETUP.md](./SETUP.md)

---

## 📂 Project Structuur

```
├── /components          # React componenten
│   ├── /admin          # CMS Admin Dashboard
│   ├── /pages          # Main site pages
│   └── /ui             # Shadcn UI components
├── /supabase           # Backend Edge Functions
├── /data               # Type definitions
├── /utils              # Helper functies
└── /styles             # Global styles
```

---

## 📚 Documentatie

| Bestand | Beschrijving |
|---------|-------------|
| **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** | 🚀 Volledige deployment instructies (Vercel + Supabase) |
| **[CSV_IMPORT_GUIDE.md](./CSV_IMPORT_GUIDE.md)** | 📊 CSV formaat voor News en Knowledge import |
| **[CMS_GUIDE.md](./CMS_GUIDE.md)** | ⚙️ Admin CMS gebruikershandleiding |
| **[SETUP.md](./SETUP.md)** | 🔧 Supabase backend setup |
| **[OVERVIEW.md](./OVERVIEW.md)** | 📋 Technisch platform overzicht |

---

## 🔑 Features

### Publieke Site
- ✅ **Home** - Hero, mission, categorieën
- ✅ **Explore** - 4 knowledge categorieën (Foundational, Psychedelics, Breathwork, Meditation)
- ✅ **Directory** - Filter op type, locatie, tags
- ✅ **News** - Nieuwsartikelen
- ✅ **Events** - Evenementen kalender
- ✅ **About** - Over FTO

### Admin CMS (na deployment)
- ✅ **Listings Manager** - Directory entries beheren
- ✅ **News Manager** - Artikelen + CSV import/export
- ✅ **Events Manager** - Evenementen beheren
- ✅ **Explore Manager** - Knowledge articles + CSV import/export
- ✅ **Seed Data** - Test content toevoegen

---

## 🔐 Admin Login (na deployment)

1. Setup admin user in Supabase (zie DEPLOYMENT_GUIDE.md)
2. Ga naar Admin via navigatie/footer/menu
3. Log in met credentials
4. Toegang tot volledige CMS

**Default credentials** (wijzig na deployment!):
- Email: `admin@fto.world`
- Password: (ingesteld in Supabase Auth)

---

## 📊 CSV Import

### 🔄 Direct Webflow Import (NIEUW!)

Je kunt nu **direct** je Webflow CMS export uploaden zonder kolommen te hernoemen!

1. **Exporteer vanuit Webflow** CMS Collection
2. **Ga naar Explore tab** in FTO Admin Dashboard
3. **Klik "Import CSV (Webflow)"**
4. **Selecteer je Webflow export** (tab-separated)
5. ✅ **Done!** Artikelen worden automatisch geïmporteerd

**Features:**
- ✅ Automatische kolom mapping (Name → title, etc.)
- ✅ Category detection via boolean velden
- ✅ Archived items worden overgeslagen
- ✅ Draft/Featured handling
- ✅ Tab-separated format support

Zie [WEBFLOW_IMPORT_GUIDE.md](./WEBFLOW_IMPORT_GUIDE.md) voor:
- Exacte veld mapping
- Category boolean logic
- Voorbeeld bestand: `webflow-import-example.csv`
- Troubleshooting & best practices

---

## 🎨 Brand Colors

- **Dark Gray**: `#101010` - Primaire achtergrond
- **Purple**: `#7935F8` - Primaire accent
- **Light Purple**: `#B197FF` - Secundaire accent
- **Off White**: `#FCF8F3` - Achtergrond licht
- **Bright Green**: `#1ADF83` - Success/CTA
- **Nature Green**: `#066237` - Secondary

**Typography**: General Sans (600 weight voor headings)

---

## 🤝 Support

Heb je problemen met deployment?

1. Check de browser console (F12 → Console)
2. Lees [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) troubleshooting sectie
3. Verifieer Supabase credentials in environment variables
4. Test met "Seed Sample Data" knop in Admin

---

## ✨ Credits

Ontwikkeld met:
- React + TypeScript
- Tailwind CSS v4
- Shadcn/ui Components
- Supabase (Backend + Auth)
- Lucide Icons

---

**Find The Others** — Consciousness expansion for the collective 🌌
