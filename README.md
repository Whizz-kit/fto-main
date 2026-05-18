# FTO Main

Find The Others — a global community platform for seekers, misfits and free thinkers.

## Tech stack

- React 18 + Vite 6 + TypeScript
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- Radix UI primitives + shadcn-style wrappers
- Supabase (auth, database, Edge Functions)
- Motion (animations)

## Project structure

```
docs/                    Project documentation
public/                  Static assets served as-is
scripts/                 Build scripts (prerender)
src/
├── App.tsx              Root component + URL router
├── main.tsx             React entry
├── index.css            Tailwind + theme tokens
├── assets/              Image assets (.webp)
├── components/
│   ├── layout/          Navigation, Footer
│   ├── modals/          Submit, Discord signup
│   ├── shared/          ErrorBoundary, SEO, ScrollToTop, FadeIn, ImageWithFallback
│   ├── directory/       Listings, profile, filters, comments
│   ├── pages/           Page-level components (incl. community/)
│   ├── admin/           CMS + admin dashboard
│   └── ui/              shadcn/Radix component library
├── data/                Types + mock content
├── hooks/               Custom React hooks
├── supabase/            Edge functions (Deno)
└── utils/               API client, helpers
```

## Development

```bash
npm install
npm run dev              # vite dev server on :3000
npm run build            # build to /build
npm run build:prerender  # build + puppeteer prerender
```

## Environment

Copy `.env.example` to `.env` and fill in Supabase credentials.
