# CSV Import Guide

Deze guide legt uit hoe je CSV bestanden kunt importeren voor News en Knowledge (Explore) articles vanuit je Webflow export.

## Stappen om te importeren

1. Log in op het Admin Dashboard (`/admin` pagina)
2. Ga naar de **News** of **Explore** tab
3. Klik op de **"Import CSV"** knop
4. Selecteer je CSV bestand
5. De artikelen worden geïmporteerd

## CSV Formaat voor News Articles

Je CSV moet de volgende kolommen hebben (in deze volgorde):

```csv
title,excerpt,content,image,author,publishedAt,category,tags
"Article Title","Short description","Full article content","https://image-url.com/image.jpg","Author Name","2025-01-15","Research","psychedelics; research; mental health"
```

### Kolom Details voor News:

- **title**: Titel van het artikel (verplicht)
- **excerpt**: Korte samenvatting
- **content**: Volledige artikel tekst
- **image**: URL naar afbeelding
- **author**: Naam van auteur
- **publishedAt**: Datum in formaat YYYY-MM-DD
- **category**: Categorie (Research, Community, Practice, etc.)
- **tags**: Tags gescheiden met `;` (bijv: "psychedelics; research; consciousness")

## CSV Formaat voor Knowledge Articles (Explore)

Je CSV moet de volgende kolommen hebben:

```csv
title,slug,excerpt,content,category,image,author,readTime,publishedAt,tags,featured
"What is Consciousness?","what-is-consciousness","Exploring consciousness...","Full article content...","foundational-knowledge","https://image.jpg","Dr. Name","8 min read","2025-01-15","consciousness; philosophy","true"
```

### Kolom Details voor Knowledge:

- **title**: Titel van het artikel (verplicht)
- **slug**: URL-vriendelijke naam (auto-generated als leeg)
- **excerpt**: Korte samenvatting
- **content**: Volledige artikel tekst (kan Markdown bevatten)
- **category**: MOET één van deze zijn (verplicht):
  - `foundational-knowledge`
  - `psychedelics`
  - `breathwork`
  - `meditation-mindfulness`
- **image**: URL naar afbeelding
- **author**: Naam van auteur
- **readTime**: Bijv. "5 min read", "10 min read"
- **publishedAt**: Datum in formaat YYYY-MM-DD
- **tags**: Tags gescheiden met `;`
- **featured**: "true" of "false" (featured articles verschijnen bovenaan)

## Tips voor Webflow Export

Als je exporteert vanuit Webflow CMS:

1. **Map de velden**: Zorg dat Webflow kolommen overeenkomen met bovenstaande namen
2. **Category mapping**: Als Webflow andere categorienamen gebruikt, pas deze aan naar:
   - Foundational Knowledge → `foundational-knowledge`
   - Psychedelics → `psychedelics`
   - Breathwork → `breathwork`
   - Meditation & Mindfulness → `meditation-mindfulness`
3. **Tags**: Als Webflow meerdere tags heeft, combineer ze met `;` separator
4. **Quotes**: Zorg dat tekst met komma's tussen aanhalingstekens staat
5. **Line breaks**: Voor content met meerdere paragrafen, gebruik `\n` of behoud HTML

## Voorbeeld CSV Bestand - News

```csv
title,excerpt,content,image,author,publishedAt,category,tags
"The Psychedelic Renaissance","Recent breakthroughs in psychedelic therapy","The field of psychedelic research continues to evolve rapidly. Recent clinical trials have demonstrated significant therapeutic potential.","https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200","Dr. Sarah Mitchell","2025-01-05","Research","psychedelics; research; mental health"
"New Community Spaces Opening","Consciousness gathering spaces worldwide","A new wave of physical spaces dedicated to consciousness exploration is transforming urban landscapes.","https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200","Maya Chen","2024-12-20","Community","community; meditation; events"
```

## Voorbeeld CSV Bestand - Knowledge

```csv
title,slug,excerpt,content,category,image,author,readTime,publishedAt,tags,featured
"What is Consciousness?","what-is-consciousness","Exploring consciousness through science and contemplation","# What is Consciousness?\n\nConsciousness remains one of the deepest mysteries.","foundational-knowledge","https://images.unsplash.com/photo-1631949136465-af801b6c5244?w=1200","Dr. Elena Rodriguez","8 min read","2024-11-15","consciousness; philosophy; neuroscience","true"
"Psilocybin Guide","psilocybin-guide","A comprehensive overview of psilocybin mushrooms","# Psilocybin: Nature's Teacher\n\nPsilocybin mushrooms have been used for thousands of years.","psychedelics","https://images.unsplash.com/photo-1709651669999-57741c9bf085?w=1200","Dr. Sarah Mitchell","10 min read","2024-09-10","psychedelics; psilocybin; research","true"
```

## Veelvoorkomende Problemen

### Import werkt niet
- Controleer of de eerste regel headers bevat
- Zorg dat verplichte velden (title, category) niet leeg zijn
- Check of de category waarde exact matcht (voor Knowledge articles)

### Speciale karakters
- Gebruik aanhalingstekens rond tekst met komma's
- Escape dubbele quotes met `""`
- Voorbeeld: `"He said ""hello"" to me"`

### Meerdere regels content
- Gebruik `\n` voor line breaks binnen een cel
- Of gebruik quotes rond de hele content cell
- Rich text/HTML is toegestaan in content veld

## Export functionaliteit

Je kunt ook exporteren om het formaat te zien:

1. Ga naar News of Explore tab in Admin Dashboard
2. Klik op **"Export CSV"** knop
3. Bekijk het bestand om het exacte formaat te zien
4. Gebruik dit als template voor je import

## Automatische velden

Deze velden worden automatisch toegevoegd bij import:
- `id`: Unieke identifier (UUID)
- `createdAt`: Timestamp van import
- `updatedAt`: Timestamp van laatste wijziging
- `slug`: Auto-generated van title (voor Knowledge) als niet opgegeven
