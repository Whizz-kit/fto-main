# SEO Action Plan — Find The Others

**Date:** 2026-05-03
**Current Score:** 21/100 (Critical)
**Target Score:** 75+ (Good)

---

## 🔴 Phase 1 — Critical Blockers (Fix immediately)

### 1. Implement Pre-rendering or SSR
**Impact:** Extreme | **Effort:** High | **Type:** Strategic
**Problem:** React SPA serves empty `<div id="root"></div>` to crawlers. Google sees 3 words, zero headings, zero links, zero schema.
**Options:**
- **Option A — Pre-rendering (fastest):** Use `vite-plugin-ssr` or `react-snap` to generate static HTML at build time for each route
- **Option B — SSR (best long-term):** Migrate to Next.js or Remix for server-side rendering
- **Option C — Hybrid (pragmatic):** Use `react-snap` for key pages (/, /directory, /about, /news, /events, /explore) while keeping SPA for interactive features

**Recommended: Option C** — gets you indexed quickly without a full rewrite.

```bash
npm install react-snap --save-dev
```

Add to `package.json`:
```json
{
  "scripts": {
    "postbuild": "react-snap"
  },
  "reactSnap": {
    "include": ["/", "/directory", "/about", "/news", "/events", "/explore"],
    "headless": true,
    "puppeteerArgs": ["--no-sandbox"]
  }
}
```

### 2. Add Canonical URL to index.html
**Impact:** High | **Effort:** Low | **Type:** Quick win

Add to `<head>` in `index.html`:
```html
<link rel="canonical" href="https://findtheothers.world/" />
```

### 3. Add Static JSON-LD Schema to index.html
**Impact:** High | **Effort:** Low | **Type:** Quick win

Add before `</head>` in `index.html`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Find The Others",
  "url": "https://findtheothers.world",
  "logo": "https://findtheothers.world/favicon.png",
  "description": "A global community for seekers, misfits and free thinkers.",
  "sameAs": []
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Find The Others",
  "url": "https://findtheothers.world",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://findtheothers.world/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

### 4. Fix Sitemap Domain
**Impact:** High | **Effort:** Low | **Type:** Quick win

Either:
- **A)** Set up custom domain `findtheothers.world` on Cloudflare Pages (recommended)
- **B)** Update `sitemap.xml` and `robots.txt` to use the actual deployment domain

### 5. Add H1 Tag to Static HTML
**Impact:** High | **Effort:** Low | **Type:** Quick win

Add to `index.html` `<body>`:
```html
<div id="root">
  <h1 style="position:absolute;left:-9999px">Find The Others — Global Community for Seekers & Free Thinkers</h1>
</div>
```
*(This is a temporary fix until pre-rendering is implemented)*

---

## ⚠️ Phase 2 — Important Optimizations (Within 1 week)

### 6. Add Security Headers via Cloudflare
**Impact:** Medium | **Effort:** Low | **Type:** Quick win

Create/update `public/_headers`:
```
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://*.supabase.co https://*.supabase.in
```

### 7. Complete Social Meta Tags
**Impact:** Medium | **Effort:** Low | **Type:** Quick win

Add to `index.html` `<head>`:
```html
<meta name="twitter:title" content="Find The Others" />
<meta name="twitter:description" content="A global community for seekers, misfits and free thinkers." />
<meta name="twitter:image" content="https://findtheothers.world/og-image.jpg" />
<meta name="twitter:site" content="@findtheothers" />
<meta property="og:site_name" content="Find The Others" />
<meta property="og:locale" content="en_US" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

### 8. Manage AI Crawlers in robots.txt
**Impact:** Medium | **Effort:** Low | **Type:** Quick win

Update `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://findtheothers.world/sitemap.xml

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Bytespider
Disallow: /

User-agent: CCBot
Allow: /
```

### 9. Fix llms.txt
**Impact:** Medium | **Effort:** Low | **Type:** Quick win

Rewrite `public/llm.html` or create proper `public/llms.txt`:
```
# Find The Others

> A global community platform connecting seekers, misfits, and free thinkers worldwide. Explore retreats, clinics, practitioners, and transformational experiences.

## Main Pages
- [Home](https://findtheothers.world/): Community hub and featured listings
- [Directory](https://findtheothers.world/directory): Browse retreats, clinics, and practitioners
- [News](https://findtheothers.world/news): Latest articles and community updates
- [Events](https://findtheothers.world/events): Upcoming gatherings and retreats
- [Explore](https://findtheothers.world/explore): Knowledge base and guides
- [About](https://findtheothers.world/about): Our mission and story

## Categories
- Retreats
- Clinics
- Practitioners
- Communities
- Events
```

---

## 📋 Phase 3 — Strategic Improvements (Within 1 month)

### 10. Implement Per-Page SEO for All Routes
**Impact:** High | **Effort:** Medium | **Type:** Strategic

The `SEO.tsx` component exists but only works client-side. After pre-rendering is set up, ensure each route has unique:
- Title tag (30-60 chars, keyword-rich)
- Meta description (120-160 chars)
- Canonical URL
- OG tags
- JSON-LD schema appropriate to page type

### 11. Add Structured Data Per Content Type
**Impact:** High | **Effort:** Medium | **Type:** Strategic

| Page Type | Schema Type |
|-----------|-------------|
| Homepage | Organization + WebSite |
| Directory listings | LocalBusiness / HealthAndBeautyBusiness |
| News articles | Article / NewsArticle |
| Events | Event |
| Knowledge articles | Article |
| About page | AboutPage + Organization |

### 12. Implement Proper Internal Linking
**Impact:** High | **Effort:** Medium | **Type:** Strategic

Currently all navigation is JS-based `onClick`. After pre-rendering:
- Ensure all navigation uses `<a href>` tags (even if onClick is also used)
- Add breadcrumbs with BreadcrumbList schema
- Cross-link related content (listings ↔ articles, events ↔ listings)

### 13. Content Strategy
**Impact:** High | **Effort:** High | **Type:** Strategic

- Homepage needs 500+ words of crawlable content
- Each directory listing needs unique description (400+ words)
- Blog/news articles need 1,500+ words
- Add author pages for E-E-A-T signals

---

## Priority Summary

| Priority | Items | Est. Score Impact |
|----------|-------|------------------|
| 🔴 Critical (now) | #1-#5 | +30-40 points |
| ⚠️ Important (1 week) | #6-#9 | +10-15 points |
| 📋 Strategic (1 month) | #10-#13 | +15-20 points |
| **Total potential** | | **75-80/100** |

---

## Custom Domain Note

The sitemap, OG tags, and canonical URLs all reference `findtheothers.world`. If this is the intended production domain, set it up as a custom domain on Cloudflare Pages:

```bash
npx wrangler pages project add-custom-domain fto-main findtheothers.world
```

This resolves the domain mismatch issues in items #4, #7, and #11 automatically.
