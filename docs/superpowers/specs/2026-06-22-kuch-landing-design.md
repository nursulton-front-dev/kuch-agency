# KUCH — Landing & Site Design Spec

**Date:** 2026-06-22
**Status:** Approved (design), pending spec review
**Owner:** adilkalikbergenov@gmail.com

## 1. Overview

Build a high-end marketing-agency website for **KUCH** (Marketing · Branding · Strategy)
at the site root `/`. Quality bar: on par with Saffron Consultants, Design Bridge &
Partners, and Siegel+Gale — bold editorial typography, work-led, motion-rich — expressed
through KUCH's brutalist pink/black brand system.

The deliverable is a **long-scroll landing page** plus **dedicated content routes** (blog,
cases, services, pricing, rating, Kuch Talks) so each piece is independently
SEO-optimized and well-indexed by AI crawlers.

### Brand foundation (from `Kuch.pdf` brand book)
- **Idea:** A brand that doesn't explain its strength — it demonstrates it. No softness.
  Confidence and specifics only.
- **Three pillars:** Сила (Strength) · Тяжёлая работа (Hard work) · Результат (Result).
- **Tone of voice:** «МЫ НЕ БОИМСЯ СЛОЖНОГО». Прямо · Уверенно · Без воды · По делу.
- **Colors:** `#101010` (near-black), `#FF61E5` (primary pink), `#FFBEF4` (light pink),
  `#FF618E` (coral), `#FF0048` (red), `#FFFFFF` (white), `#95B1FF` (periwinkle blue).
- **Type (brand book):** Headings = HeliosExt (heavy, large, tight kerning, "presses on
  the screen"); Body = TT Hoves.
- **Logo:** KUCH wordmark; circle & rectangle variants in black/pink/white; stacked KU/CH.
  Logo animation cycles KUCH → MARKETING → BRANDING → STRATEGY.
- **Service icons:** Маркетинг (megaphone), Стратегия (compass), Брендинг (pen nib),
  Аналитика (bar chart) — bold filled black glyphs.

## 2. Goals & Non-Goals

### Goals
1. Strong technical SEO: server-rendered HTML, per-route metadata, sitemap, robots, RSS.
2. Excellent AI/LLM discoverability: schema.org JSON-LD, semantic HTML, `llms.txt`.
3. Works reliably behind VPNs / in restricted regions: self-hosted fonts, no mandatory
   third-party CDNs or trackers, deployable as static output.
4. Fast portfolio: optimized images, lazy-loaded video with posters, route code-splitting.
5. Cross-cutting lead capture: reusable form component + single submit seam.
6. Faithful expression of the KUCH brand system.

### Non-Goals (this iteration)
- No live backend for form submission (UI + stubbed `submitLead()` seam only).
- No CMS — content authored as typed data + MDX in-repo.
- No real client content — realistic placeholders derived from the brand book.
- No authentication, no e-commerce, no multi-language (Russian primary).

## 3. Tech Stack & Architecture

- **Framework:** Next.js 15 (App Router) + TypeScript.
- **Styling:** Tailwind CSS with brand tokens (colors, type scale, spacing) in config +
  CSS variables.
- **Animation:** Framer Motion (scroll-reveal, marquee, logo cycle), gated by
  `prefers-reduced-motion`.
- **Content:** MDX for blog/articles; typed TS data modules for services, team, cases,
  pricing, rating, talks.
- **Rendering:** Static generation (SSG) for all routes; `next/image` for images.
- **Fonts:** Self-hosted. HeliosExt/TT Hoves are commercial → ship with close free
  Cyrillic substitutes (heavy display for headings, neutral grotesque for body) wired via
  `@font-face` so licensed fonts swap in by replacing files only. Candidate substitutes:
  headings → Unbounded / Geologica; body → Golos Text / Inter. Subset to Cyrillic+Latin.
- **Deployment target:** static-exportable; host-agnostic (Vercel/Netlify/any static host).

### Project structure (high level)
```
app/                      # routes (App Router)
  layout.tsx              # root layout, fonts, header, footer, metadata defaults
  page.tsx                # landing (/)
  services/               # /services, /services/[slug]
  cases/                  # /cases, /cases/[slug]
  pricing/page.tsx        # /pricing
  blog/                   # /blog, /blog/[slug]
  rating/page.tsx         # /rating
  kuch-talks/page.tsx     # /kuch-talks
  brief/page.tsx          # /brief (multi-step Online Brief)
  contact/page.tsx        # /contact
  sitemap.ts robots.ts    # generated SEO files
components/
  layout/  (Header, Footer, MobileNav, StickyCta)
  sections/ (Hero, About, Team, Services, Pricing, TrustedBy, VideoCases,
             BlogPreview, RatingPreview, TalksPreview, ContactCta)
  ui/       (Button, Card, Marquee, LogoCycle, Section, Tag, ...)
  forms/    (LeadForm, BriefForm, FormField, submitLead seam)
  seo/      (JsonLd helpers, Metadata helpers)
content/
  blog/*.mdx
data/
  services.ts team.ts cases.ts pricing.ts rating.ts talks.ts clients.ts site.ts
public/
  fonts/ images/ video/ llms.txt og/
lib/
  seo.ts (metadata + JSON-LD builders), utils.ts
styles/ (globals.css, tokens)
```

## 4. Information Architecture & Navigation

**Top bar (sticky):** `О нас · Услуги · Прайс · Кейсы · Блог · Рейтинг · Kuch Talks`
+ Instagram & Telegram icon links + **`Онлайн Бриф`** (primary CTA) and
**`Оставить заявку`** (secondary CTA) side by side. Mobile: hamburger drawer with same
items + CTAs + socials.

Landing anchors map to: О нас → `#about`, Услуги → `#services`, Прайс → `#pricing`,
Кейсы → `#cases`. Блог/Рейтинг/Kuch Talks point to their dedicated routes.

**Routes:**
| Route | Purpose | SEO type |
|---|---|---|
| `/` | Long-scroll landing | WebSite / Organization |
| `/services` | All 6 services overview | ItemList |
| `/services/[slug]` | One service detail | Service + FAQ |
| `/pricing` | "от–до" table for all services | (Service offers) |
| `/cases` | Portfolio + video cases grid | ItemList |
| `/cases/[slug]` | Case study detail | CreativeWork / VideoObject |
| `/blog` | Article index | Blog |
| `/blog/[slug]` | Article (MDX) | Article + BreadcrumbList |
| `/rating` | Editorial rating/insights hub | Article / ItemList |
| `/kuch-talks` | Video/podcast series | ItemList / VideoObject |
| `/brief` | Multi-step Online Brief form | — (noindex optional) |
| `/contact` | Contact + quick lead form | ContactPage |
| `/sitemap.xml` `/robots.txt` `/llms.txt` `/rss.xml` | Crawl/SEO/AI files | — |

## 5. Landing Page — Section Order & Content

1. **Hero** — *Header stays.* Oversized KUCH + logo animation cycling
   `MARKETING → BRANDING → STRATEGY`; slogan **«МЫ НЕ БОИМСЯ СЛОЖНОГО»**; subline from the
   three pillars; CTAs `Онлайн Бриф` + `Оставить заявку`. Black/pink brutalist composition,
   giant letterforms as graphic elements.
2. **О нас (About)** — *stays.* Idea statement + three pillars **Сила · Тяжёлая работа ·
   Результат** as numbered 01/02/03 blocks; key stats (e.g. проектов, клиентов, лет, рост).
3. **Команда (Team)** — *new block.* Poster-style cards (photo + name + role) alternating
   pink/black/blue per brand book. Placeholder team (see §8).
4. **Услуги (Services)** — *6 cards:* Маркетинговая стратегия · Бренд-стратегия ·
   Коммуникационная стратегия · Рекламная кампания · Аутсорс-маркетинг · Брендинг. Each:
   icon + short description + "от $X" + link to `/services/[slug]`.
5. **Прайс (Pricing)** — "от–до" table for all 6 services (full table also at `/pricing`).
6. **Нам доверяют (Trusted by)** — *former "Cases" block, corrected.* Client/partner logo
   strip incl. KUCH × Wellco, KUCH × GRAVITY; short trust line.
7. **Видео-кейсы (Video cases)** — *cases moved lower.* Portfolio grid with lazy video
   (poster-first); link to `/cases`.
8. **Блог (Blog preview)** — latest 3 articles → `/blog`.
9. **Рейтинг (Rating preview)** — teaser → `/rating`.
10. **Kuch Talks (preview)** — latest talks → `/kuch-talks`.
11. **Связаться с нами (Contact)** — *new block.* Online Brief + Оставить заявку side by
    side, contacts, socials.
12. **Footer** — full nav, Instagram/Telegram, legal line, giant KUCH wordmark.

## 6. Visual Design System

- **Color usage:** alternating section backgrounds (black → white → pink → blue) echoing
  brand-book posters; pink `#FF61E5` as primary accent/CTA; red `#FF0048` for emphasis.
- **Type:** heavy "pressing" display headings; clean grotesque body; oversized KUCH
  letters as graphic devices; tight kerning on display.
- **Type scale (responsive):** display ~clamp(3rem, 9vw, 7.5rem); h2 ~clamp(2rem, 5vw,
  3.5rem); body 1rem–1.125rem; small 0.875rem. Mirrors brand-book 72/48/36/24/16 intent.
- **Devices:** knockout text blocks, marquee (`Marketing · Branding · Strategy`), numbered
  pillars, poster cards, hover-interactive case cards.
- **Motion:** scroll-reveal fade/slide, logo cycle, marquee, hover micro-interactions; all
  disabled/reduced under `prefers-reduced-motion`.
- **Accessibility:** semantic landmarks, heading hierarchy, alt text, visible focus states,
  WCAG AA contrast (verify pink-on-white for text; use black text on pink, white on black).

## 7. Forms & Lead Strategy

- **Онлайн Бриф (`/brief`):** multi-step — (1) тип проекта, (2) задача/описание,
  (3) бюджет, (4) сроки, (5) контакты. Progress indicator; client-side validation;
  success screen.
- **Оставить заявку:** quick form (имя, контакт, сообщение) available as a modal/section.
- **Cross-cutting:** reusable `LeadForm`/`FormField`; a sticky CTA button/bar present
  across pages.
- **Submit seam:** all forms call a single `submitLead(payload)` in `components/forms/`.
  This iteration: validates, simulates success, logs payload (no network). Wiring Supabase
  (table insert + notify) or Telegram later = replace this one function. Payload shape
  documented in code (name, contact, type, budget, timeline, message, source page, ts).

## 8. Placeholder Content (from brand book)

**Services & pricing (USD placeholders, "от–до"):**
| Услуга | Цена |
|---|---|
| Маркетинговая стратегия | $3,000 – $12,000 |
| Бренд-стратегия | $4,000 – $15,000 |
| Коммуникационная стратегия | $2,500 – $8,000 |
| Рекламная кампания | $5,000 – $50,000 |
| Аутсорс-маркетинг | $1,500 – $8,000 / мес |
| Брендинг | $6,000 – $25,000 |

**Team (placeholders, brand-book names):**
- Мохитобону Кенджаева — CEO / Бренд-стратег
- Дони Ахмаджонов — Head of Production
- Алишер Мамадалиев — Marketing Director
- Aziz Azizov — Art Director
- + 2 generic roles (Strategy Lead, Account Director)

**Cases (video-cases, placeholders):** 6 entries across Branding / Production / Marketing,
including KUCH × Wellco and KUCH × GRAVITY collaborations; each with poster image + video
placeholder + result metric.

**Blog (≥4 MDX articles):** e.g. «Как собрать бренд-платформу, которая работает»,
«Маркетинговая стратегия: с чего начать», «Аутсорс-маркетинг vs внутренний отдел»,
«Рекламная кампания: от идеи до медиабаинга».

**Rating:** editorial hub — KUCH's методология оценки/рейтинг (listicle-style content for
SEO/AI). **Kuch Talks:** 3–4 video/podcast entries with posters.

All images/video are local placeholders (brand-colored blocks / sample posters) in
`public/`; alt text written for each.

## 9. SEO / AI / Performance / VPN

- **SEO:** SSG HTML; per-route `<title>`, description, canonical, Open Graph/Twitter;
  generated `sitemap.xml`, `robots.txt`; `rss.xml` for blog.
- **AI discoverability:** JSON-LD — Organization (site-wide), Service (`/services/[slug]`),
  Article (`/blog/[slug]`), VideoObject (cases/talks), BreadcrumbList, FAQPage; `llms.txt`
  summarizing the site for LLM crawlers; clean semantic HTML.
- **Performance:** `next/image` (sized, lazy); video poster-first + lazy load; route-level
  code-splitting; minimal client JS; font subsetting + `font-display: swap`. Targets:
  Lighthouse Performance/SEO/Best-Practices ≥ 90 on landing.
- **VPN/region resilience:** self-hosted fonts (no Google Fonts CDN); no mandatory external
  scripts/trackers; all assets first-party; static output works without origin services.

## 10. Verification & Acceptance

- Builds cleanly (`next build`) with no type errors.
- All routes render server-side HTML (view-source shows content, not empty shell).
- Lighthouse SEO ≥ 95, Performance ≥ 90 on `/`.
- JSON-LD validates (schema.org); `sitemap.xml`, `robots.txt`, `llms.txt` reachable.
- All nav items, anchors, CTAs work; forms validate and show success (stub).
- Responsive (mobile/tablet/desktop); `prefers-reduced-motion` honored; keyboard-navigable.
- No external network dependency required to render (verify with network blocked).

## 11. Open Items / Future Work
- Confirm pricing currency (default USD) and real ranges.
- Replace placeholder content (team photos, real cases/video, real articles, client logos).
- License real fonts (HeliosExt, TT Hoves) and swap font files.
- Wire `submitLead()` to Supabase (table + notify) or Telegram bot.
- Optional analytics (privacy-friendly, VPN-safe) if desired later.
