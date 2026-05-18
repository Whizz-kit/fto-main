# SEO Audit Report — Find The Others (fto-main.pages.dev)

**Scope:** Single-page full audit (React SPA)
**Date:** 2026-05-03
**URL:** https://fto-main.pages.dev
**Production domain:** https://findtheothers.world
**Overall SEO Health Score: 28/100 — Critical**

---

## Executive Summary

Find The Others is a React SPA (Vite + React) serving a community directory for "seekers, misfits and free thinkers." The site has **fundamental SEO problems** that make it essentially invisible to search engines. Because it's a client-side rendered SPA, Google sees only 3 words of content and zero headings, links, or structured data in the initial HTML.

### Top 5 Critical Issues
1. **No server-side rendering (SSR) / pre-rendering** — crawler sees empty `<div id="root"></div>`
2. **No canonical URL** in initial HTML
3. **No JSON-LD structured data** in initial HTML
4. **No H1 or any heading tags** in initial HTML
5. **Sitemap references wrong domain** (`findtheothers.world` vs `fto-main.pages.dev`)

### Top 5 Quick Wins
1. Add `<link rel="canonical">` to `index.html`
2. Add Organization JSON-LD schema to `index.html`
3. Fix sitemap domain to match deployment URL
4. Add missing security headers via Cloudflare
5. Complete Twitter Card meta tags

---

## Findings Table

| # | Area | Severity | Confidence | Finding | Evidence | Fix |
|---|------|----------|------------|---------|----------|-----|
| 1 | Rendering | 🔴 Critical | Confirmed | SPA renders no content for crawlers | `parse_html.py` returns `word_count: 3`, zero H1/H2/H3, zero links | Implement SSR (Next.js/Remix) or static pre-rendering (vite-plugin-ssr / react-snap) |
| 2 | Indexability | 🔴 Critical | Confirmed | No canonical URL in HTML source | `canonical: null` in parsed output | Add `<link rel="canonical" href="https://findtheothers.world/">` to `index.html` |
| 3 | Structured Data | 🔴 Critical | Confirmed | No JSON-LD in initial HTML | `schema: []` in parsed output; SEO.tsx injects via JS only | Add static JSON-LD Organization + WebSite schema to `index.html` |
| 4 | Content | 🔴 Critical | Confirmed | 3 words visible to crawlers | readability.py: `word_count: 3` | Pre-render homepage content or use SSR |
| 5 | Headings | 🔴 Critical | Confirmed | No H1 tag in HTML source | `h1: []` in parsed output | Ensure H1 is in static HTML or pre-rendered |
| 6 | Sitemap | 🔴 Critical | Confirmed | Sitemap domain mismatch | Sitemap uses `findtheothers.world`, deployed at `fto-main.pages.dev` | Update sitemap to match deployment domain or set up custom domain |
| 7 | Robots.txt | ⚠️ Warning | Confirmed | Sitemap URL in robots.txt points to wrong domain | `Sitemap: https://findtheothers.world/sitemap.xml` | Update to match actual deployment domain |
| 8 | Security | ⚠️ Warning | Confirmed | 4 security headers missing | security_headers.py: missing HSTS, CSP, X-Frame-Options, Permissions-Policy (score: 45/100) | Add headers via Cloudflare Pages `_headers` file |
| 9 | AI Crawlers | ⚠️ Warning | Confirmed | 10 AI crawlers not explicitly managed | robots_checker.py: only GPTBot managed | Add explicit rules for ClaudeBot, PerplexityBot, etc. |
| 10 | Social Meta | ⚠️ Warning | Confirmed | Incomplete Twitter Card tags | social_meta.py: missing twitter:title, twitter:description, twitter:image, twitter:site | Add missing Twitter meta tags to `index.html` |
| 11 | OG Meta | ⚠️ Warning | Confirmed | OG image URL points to production domain | `og:image: https://findtheothers.world/og-image.jpg` | Use relative URL or match deployment domain |
| 12 | llms.txt | ⚠️ Warning | Confirmed | llms.txt exists but empty/malformed | Quality score: 5/100, no title, no description, no links | Write proper llms.txt with site info and key pages |
| 13 | Internal Links | ⚠️ Warning | Likely | Zero internal links visible to crawlers | SPA routing — all links are JS-based `onClick` handlers | Pre-render or use SSR to expose `<a href>` links |
| 14 | Images | ⚠️ Warning | Likely | No images visible to crawlers in initial HTML | `images: []` in parsed output | Pre-render to expose `<img>` tags with alt text |
| 15 | CWV | ℹ️ Info | Hypothesis | Core Web Vitals unmeasured | PageSpeed API rate limited | Re-run `pagespeed.py` later or check PageSpeed Insights manually |

---

## Category Scores

### Technical SEO — 20/100 (Weight: 25%)
**Positive signals:** HTTPS active, no redirect chains (0 hops, 88ms), robots.txt present and accessible
**Deficit signals:** No SSR/pre-rendering, no canonical, sitemap domain mismatch, missing security headers, AI crawlers unmanaged
**Score justification:** Score of 20 reflects working HTTPS and clean redirects (+), penalized by missing SSR (Critical, -15), no canonical (Critical, -15), sitemap mismatch (Critical, -15), and missing security headers (Warning, -5).

### Content Quality — 5/100 (Weight: 20%)
**Positive signals:** Meta description present and well-written (161 chars)
**Deficit signals:** Only 3 words visible to crawlers, no headings, no visible content structure, no E-E-A-T signals
**Score justification:** Score of 5 reflects existing meta description (+), penalized by essentially zero crawlable content (Critical, -15) and no heading structure (Critical, -15).

### On-Page SEO — 25/100 (Weight: 15%)
**Positive signals:** Title tag present ("Find The Others"), meta description present, OG tags partially complete
**Deficit signals:** No H1, no internal links in HTML, no keyword-rich content visible
**Score justification:** Score of 25 reflects title and meta description (+), penalized by no H1 (Critical, -15) and no crawlable internal links (Warning, -5).

### Schema / Structured Data — 0/100 (Weight: 15%)
**Positive signals:** SEO.tsx component exists and can inject JSON-LD via JS
**Deficit signals:** Zero JSON-LD in initial HTML, crawlers cannot execute JS reliably for schema
**Score justification:** Score of 0 — no schema detected in HTML source. JS-injected schema is unreliable for crawlers.

### Performance (CWV) — Insufficient data (Weight: 10%)
PageSpeed API was rate limited. Cannot confirm scores.

### Image Optimization — Insufficient data (Weight: 10%)
No images visible in initial HTML to audit. WebP format used in source (good practice).

### AI Search Readiness (GEO) — 15/100 (Weight: 5%)
**Positive signals:** llms.txt file exists, GPTBot explicitly allowed
**Deficit signals:** llms.txt is malformed (score 5/100), no structured content for AI citation, most AI crawlers unmanaged
**Score justification:** Score of 15 reflects llms.txt presence and GPTBot allowance (+), penalized by malformed llms.txt (Warning, -5) and no citable content structure (Critical, -15).

### Weighted Overall Score
| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Technical SEO | 20 | 25% | 5.0 |
| Content Quality | 5 | 20% | 1.0 |
| On-Page SEO | 25 | 15% | 3.75 |
| Schema | 0 | 15% | 0.0 |
| Performance | 50* | 10% | 5.0 |
| Images | 50* | 10% | 5.0 |
| AI Search Readiness | 15 | 5% | 0.75 |
| **Total** | | | **20.5** |

*Performance and Images estimated at 50 (neutral) due to insufficient data.

**Overall: 21/100 — Critical**

---

## Unknowns and Follow-ups

| Item | What's needed | How to collect |
|------|--------------|----------------|
| Core Web Vitals | LCP, INP, CLS scores | Run `pagespeed.py` when API is available, or check PageSpeed Insights |
| Image optimization | Alt text, sizing, format audit | Only possible after SSR/pre-rendering exposes images |
| Internal link structure | Orphan pages, link equity flow | Only possible after SSR/pre-rendering exposes links |
| Mobile rendering | Responsive layout verification | Run `capture_screenshot.py` with Playwright |
| Custom domain | Is `findtheothers.world` pointing to Cloudflare Pages? | Check DNS configuration |
