# Malaak Al Zoubi — Portfolio Website

A production-ready, bilingual (Arabic + English) AI Developer portfolio built with **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## ✨ Features

- **True i18n** — Arabic (RTL) + English (LTR) via `next-intl`, toggle in the header
- **8 full project case studies** with architecture diagrams, tool icons, features, challenges & results
- **Filter + search** on the projects page
- **Dark mode** via `next-themes`
- **Contact form** with validation — works with Formspree or falls back to `mailto:`
- **SEO ready** — OpenGraph, sitemap, robots.txt, metadata API
- **Accessible** — keyboard navigation, ARIA labels, skip link, good contrast
- **Responsive** — mobile-first

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9 (or `yarn` / `pnpm` / `bun`)

### Install & Run

```bash
# 1. Clone or extract this project
cd "Malaak Portfolio"

# 2. Install dependencies
npm install

# 3. Create your env file
cp .env.example .env.local
# (Optional) Fill in NEXT_PUBLIC_FORMSPREE_URL and NEXT_PUBLIC_SITE_URL

# 4. Start the dev server
npm run dev
```

Open http://localhost:3000 — it redirects to `/en` automatically.

### Build for Production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push this folder to a GitHub/GitLab repo.
2. Import the repo in [vercel.com](https://vercel.com).
3. Set environment variables in the Vercel dashboard (see `.env.example`).
4. Deploy — Vercel auto-detects Next.js.

### Other Platforms

Any Node.js host (Render, Railway, Netlify with adapter, etc.) works.
Set `NEXT_PUBLIC_SITE_URL` to your domain for correct sitemap URLs.

---

## 📁 Project Structure

```
malaak-portfolio/
├── messages/
│   ├── en.json         ← English UI strings
│   └── ar.json         ← Arabic UI strings
├── public/
│   ├── cv/             ← TODO: Place your CV file here (see below)
│   └── og-image.png    ← TODO: Add OpenGraph image
├── src/
│   ├── app/
│   │   ├── [locale]/   ← Locale-scoped pages
│   │   │   ├── page.tsx            (Home)
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx        (All Projects)
│   │   │   │   └── [id]/page.tsx   (Project Case Study)
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   └── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── layout/     ← Header, Footer, LanguageToggle, ThemeToggle
│   │   ├── home/       ← Hero, Highlights, FeaturedProjects, SkillsStrip, CTASection
│   │   ├── projects/   ← ProjectCard, ProjectFilters, ArchitectureDiagram
│   │   ├── about/      ← Timeline, CertificationCards
│   │   ├── contact/    ← ContactForm
│   │   └── ui/         ← Button, Badge, ToolIcon
│   ├── data/
│   │   ├── projects.ts         ← ALL project data (bilingual)
│   │   └── certifications.ts   ← Certifications data
│   ├── i18n/
│   │   ├── routing.ts
│   │   ├── request.ts
│   │   └── navigation.ts
│   ├── lib/utils.ts
│   └── types/index.ts
├── middleware.ts           ← next-intl locale routing
├── next.config.ts
├── tailwind.config.ts
└── .env.example
```

---

## ✅ TODO — Replace Before Going Live

### 1. CV File
```
public/cv/malaak-cv.pdf
```
Place your actual CV PDF here. The Download CV buttons throughout the site point to this path.

### 2. OpenGraph Image
```
public/og-image.png
```
Add a 1200×630 OG image for social sharing previews.

### 3. Profile Photo (Optional)
The About page currently shows an avatar with the letter "م". To add a real photo:
- Add your photo at `public/images/malaak.jpg`
- In `src/app/[locale]/about/page.tsx`, replace the avatar `<div>` with an `<Image>` component.

### 4. Project Links
In `src/data/projects.ts`, search for `// TODO: Replace with` and update each project's `links` array with actual GitHub repos, demos, or LinkedIn posts:

| Project | What to update |
|---------|----------------|
| TransformMe AI | `github` URL |
| RAG Excellence Awards | `github` URL + any demo link |
| Tashrea Assistant | `github` URL + any demo link |
| Food Prices Syria | `github` URL + Tableau public link |
| Music Genre Classification | `github` URL |
| Salaries EDA | `github` URL |
| Diamond Price Prediction | `github` URL |
| Tasreefah | LinkedIn post URL |

### 5. Project Gallery Images
Each project has a `gallery: []` array. To add screenshots:
- Add images to `public/images/projects/{project-id}/`
- Update the `gallery` array with paths like `['/images/projects/transformme-ai/screenshot-1.jpg']`

### 6. Certifications
Update `src/data/certifications.ts` with your real certifications, links to credential verification pages, and correct years.

### 7. Contact Form (Optional)
For a real form submission backend:
1. Create a free form at [formspree.io](https://formspree.io)
2. Copy the form endpoint URL
3. Add it to `.env.local`: `NEXT_PUBLIC_FORMSPREE_URL=https://formspree.io/f/xxxxxxxx`

Without this, the form opens your email client via `mailto:`.

### 8. Site URL
Set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` in `.env.local` for correct sitemap and OG tags.

### 9. Favicon
Replace `public/favicon.ico` (and optionally add `apple-touch-icon.png`) with your own.

---

## 🎨 Customisation

### Colors
Edit `tailwind.config.ts` → `theme.extend.colors`. The main brand color is `primary` (dusty rose) and `lavender`.

### Fonts
Fonts are loaded via Google Fonts in `src/app/[locale]/layout.tsx`. Change `DM Serif Display`, `Plus Jakarta Sans`, or `Cairo` there and in `tailwind.config.ts → fontFamily`.

### Adding a New Project
1. Add an entry to the `projects` array in `src/data/projects.ts` following the existing format.
2. It will automatically appear in the Projects page and can be filtered/searched.
3. Set `featured: true` to show it on the Home page (max 3 recommended).

### Adding i18n Keys
1. Add the key to both `messages/en.json` and `messages/ar.json`.
2. Use `useTranslations('namespace')` (client) or `getTranslations({locale, namespace})` (server) to access it.

---

## 🛠 Tech Stack

| Layer | Library |
|-------|---------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| i18n | next-intl v3 |
| Dark mode | next-themes |
| Icons | lucide-react |
| Tool icons | Simple Icons CDN (free) |

---

## 📄 License

Personal portfolio — all project content and personal information belong to Malaak Al Zoubi.
The code structure may be reused for personal portfolio projects with attribution.
