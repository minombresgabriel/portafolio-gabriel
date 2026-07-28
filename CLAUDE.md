# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run start     # Run production server
npm run lint      # Run ESLint
```

No test suite is configured.

## Architecture

Next.js 15 App Router portfolio site with a markdown-based blog system.

**Pages:**
- `/` — Home page (`app/page.tsx`), a client component that composes all section components
- `/blog/[slug]` — Statically generated blog post pages from markdown files
- `/gracias` — Thank-you page after contact form submission

**Blog system (`lib/posts.ts` + `posts/*.md`):**
- Markdown files in `posts/` use gray-matter frontmatter (`title`, `date`, `author`, `image`, `description`)
- `getPostBySlug()` reads a file, parses frontmatter, and converts markdown to HTML via remark/remark-html
- `getAllPosts()` returns all posts sorted by date descending
- `app/blog/[slug]/page.tsx` uses `generateStaticParams()` for SSG and renders HTML via `dangerouslySetInnerHTML`

**Projects data (`data/projects.ts`):**
- Single exported array of `Project` objects with fields: `title`, `description`, `tech[]`, `image`, `link?`, `github?`, `achievements[]`
- Imported directly by the `Projects` component — no external data fetching

**Component conventions:**
- Interactive/animated components are Client Components (`"use client"`)
- Data-fetching components (e.g., `LatestBlogPosts`) are async Server Components
- Animations use Framer Motion for scroll-triggered effects
- `react-type-animation` in Hero is dynamically imported with `ssr: false`
- All styling via Tailwind CSS v4 (uses `@import "tailwindcss"` syntax, not `@tailwind` directives)

**Key integrations (configured in `app/layout.tsx`):**
- Google Analytics (G-VC58Y8L7G3)
- Google reCAPTCHA v3 (used by ContactForm)
- Vercel Speed Insights
- Contact form submits to FormSubmit service

**Image paths:** Project and blog post images are stored under `public/images/`.
