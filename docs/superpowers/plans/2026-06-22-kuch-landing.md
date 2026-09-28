# KUCH Landing & Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-end, SEO/AI-optimized marketing-agency website for KUCH at site root `/` — a long-scroll landing plus dedicated content routes — expressing the brand book's brutalist pink/black system.

**Architecture:** Next.js 15 (App Router) statically generated. Typed TS data modules + MDX feed presentational React components. A thin `lib/` holds testable logic (SEO/JSON-LD builders, form validation, `submitLead` seam). Self-hosted fonts and first-party assets only, so the site renders with no third-party network dependency.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, MDX (`next-mdx-remote` or `@next/mdx`), Vitest + @testing-library/react for logic/smoke tests.

## Testing Strategy

- **TDD (full red→green cycle)** for: data integrity (`data/*`), SEO/JSON-LD builders (`lib/seo.ts`), form validation, `submitLead`, sitemap/feed generation, utilities.
- **Build + smoke + acceptance** for presentational components/pages: `next build` must pass with zero type errors; a smoke render test asserts the component mounts and renders key text; acceptance criteria list verifies brand/layout/motion/SEO requirements.
- Run `npx tsc --noEmit` and `npm run build` before every "page" commit.

## Global Constraints

- Site root is `/`. Russian is the primary language (`lang="ru"`).
- Brand colors (exact): black `#101010`, pink `#FF61E5`, light pink `#FFBEF4`, coral `#FF618E`, red `#FF0048`, white `#FFFFFF`, blue `#95B1FF`.
- Brand tone copy verbatim where used: slogan «МЫ НЕ БОИМСЯ СЛОЖНОГО»; pillars «Сила», «Тяжёлая работа», «Результат»; voice «Прямо · Уверенно · Без воды · По делу».
- Nav order (exact): `О нас · Услуги · Прайс · Кейсы · Блог · Рейтинг · Kuch Talks`, plus Instagram + Telegram links and CTAs `Онлайн Бриф` + `Оставить заявку`.
- The 6 services (exact titles): Маркетинговая стратегия, Бренд-стратегия, Коммуникационная стратегия, Рекламная кампания, Аутсорс-маркетинг, Брендинг.
- Pricing currency: USD (placeholder), shown as "от–до".
- Fonts self-hosted only — no Google Fonts CDN, no mandatory third-party scripts/trackers.
- All forms route through a single `submitLead()`; this iteration is a stub (validate + simulate success + log), no network.
- Respect `prefers-reduced-motion` for every animation.
- All routes statically generated; each route has its own metadata.

## File Structure

```
app/
  layout.tsx                      # html/body, fonts, Header, Footer, StickyCta, default metadata, Organization JSON-LD
  page.tsx                        # landing (/) — composes sections + WebSite JSON-LD
  globals.css                     # tokens, @font-face, base
  services/page.tsx               # /services
  services/[slug]/page.tsx        # /services/[slug] + generateStaticParams + Service/FAQ JSON-LD
  pricing/page.tsx                # /pricing
  cases/page.tsx                  # /cases
  cases/[slug]/page.tsx           # /cases/[slug] + VideoObject JSON-LD
  blog/page.tsx                   # /blog
  blog/[slug]/page.tsx            # /blog/[slug] (MDX) + Article/Breadcrumb JSON-LD
  rating/page.tsx                 # /rating
  kuch-talks/page.tsx             # /kuch-talks
  brief/page.tsx                  # /brief (multi-step)
  contact/page.tsx                # /contact
  sitemap.ts robots.ts            # SEO files
  rss.xml/route.ts                # blog RSS
components/
  layout/{Header,Footer,MobileNav,StickyCta}.tsx
  sections/{Hero,About,Team,Services,Pricing,TrustedBy,VideoCases,BlogPreview,RatingPreview,TalksPreview,ContactCta}.tsx
  ui/{Button,Container,Section,Tag,Card,Marquee,LogoCycle,Icon,Reveal}.tsx
  forms/{LeadForm,BriefForm,FormField,submitLead.ts,validate.ts}
data/{types.ts,site.ts,services.ts,team.ts,cases.ts,pricing.ts,clients.ts,rating.ts,talks.ts,articles.ts}
content/blog/*.mdx
lib/{seo.ts,utils.ts}
public/{fonts/,images/,video/,og/,llms.txt}
test/ (vitest config + tests colocated or under __tests__)
```

---

### Task 1: Project scaffold, tooling, git

**Files:**
- Create: `package.json`, `next.config.mjs`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `vitest.config.ts`, `vitest.setup.ts`, `.gitignore`, `app/globals.css`, `app/layout.tsx` (minimal), `app/page.tsx` (minimal).

**Interfaces:**
- Produces: a buildable Next.js app; `npm run dev`, `npm run build`, `npm test` scripts.

- [ ] **Step 1: Initialize git and Next.js app**

```bash
cd /Users/spica/Desktop/kuch
git init
npx create-next-app@latest . --ts --tailwind --app --eslint --src-dir=false --import-alias "@/*" --no-turbopack --use-npm --yes
```
If `create-next-app` refuses due to existing files (`Kuch.pdf`, `docs/`), scaffold into a temp dir and move files in, preserving `Kuch.pdf` and `docs/`.

- [ ] **Step 2: Install runtime + test deps**

```bash
npm i framer-motion
npm i -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: Add Vitest config**

`vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', setupFiles: ['./vitest.setup.ts'], globals: true },
  resolve: { alias: { '@': path.resolve(__dirname, '.') } },
})
```
`vitest.setup.ts`:
```ts
import '@testing-library/jest-dom/vitest'
```
Add to `package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 4: Verify build and test runner**

Run: `npm run build` → Expected: succeeds. Run: `npm test` → Expected: "No test files found" (exit 0) or passes.

- [ ] **Step 5: Commit (includes the approved spec)**

```bash
git add -A
git commit -m "chore: scaffold Next.js app, tooling, and KUCH design spec"
```

---

### Task 2: Brand design tokens, fonts, globals

**Files:**
- Modify: `tailwind.config.ts`, `app/globals.css`
- Create: `public/fonts/` (place self-hosted woff2 files), `lib/utils.ts`
- Test: `lib/__tests__/utils.test.ts`

**Interfaces:**
- Produces: Tailwind colors `kuch.black|pink|pinkLight|coral|red|blue|white`; font families `font-display`, `font-sans`; `cn(...classes)` helper in `lib/utils.ts`.

- [ ] **Step 1: Write failing test for `cn`**

`lib/__tests__/utils.test.ts`:
```ts
import { cn } from '@/lib/utils'
test('cn joins truthy classes and dedupes falsy', () => {
  expect(cn('a', false && 'b', 'c', undefined)).toBe('a c')
})
```

- [ ] **Step 2: Run test → fails** — `npm test` → Expected: FAIL (cannot find module).

- [ ] **Step 3: Implement `lib/utils.ts`**

```ts
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
```

- [ ] **Step 4: Run test → passes** — `npm test` → Expected: PASS.

- [ ] **Step 5: Add brand tokens to Tailwind**

In `tailwind.config.ts` `theme.extend`:
```ts
colors: {
  kuch: { black:'#101010', pink:'#FF61E5', pinkLight:'#FFBEF4', coral:'#FF618E', red:'#FF0048', blue:'#95B1FF', white:'#FFFFFF' },
},
fontFamily: { display:['var(--font-display)','system-ui','sans-serif'], sans:['var(--font-sans)','system-ui','sans-serif'] },
```

- [ ] **Step 6: Self-host fonts + globals**

Download free Cyrillic substitutes and place woff2 in `public/fonts/`:
- Display (heavy): **Unbounded** (700/800/900). Body: **Golos Text** (400/500/600). (Both SIL OFL, Cyrillic.)
In `app/globals.css` add `@font-face` for each (`font-display: swap`), define `--font-display`/`--font-sans` on `:root`, set `body { background:#101010; color:#fff; font-family:var(--font-sans) }`, and a `.reduce-motion` rule. Add a comment: "Replace these woff2 files with licensed HeliosExt/TT Hoves to use real brand fonts — no code change needed."

- [ ] **Step 7: Verify + commit**

Run: `npm run build` → Expected: succeeds. Commit:
```bash
git add -A && git commit -m "feat: brand design tokens, self-hosted fonts, cn util"
```

---

### Task 3: Data types + all data modules (TDD)

**Files:**
- Create: `data/types.ts`, `data/site.ts`, `data/services.ts`, `data/team.ts`, `data/cases.ts`, `data/pricing.ts`, `data/clients.ts`, `data/rating.ts`, `data/talks.ts`, `data/articles.ts`
- Test: `data/__tests__/data.test.ts`

**Interfaces:**
- Produces (exact types):
```ts
// data/types.ts
export type IconName = 'megaphone' | 'compass' | 'pen' | 'chart'
export type Accent = 'pink' | 'black' | 'blue' | 'coral'
export interface Service { slug:string; title:string; short:string; description:string; icon:IconName; priceFrom:number; priceTo:number; unit:'project'|'month'; deliverables:string[]; faq:{q:string;a:string}[] }
export interface TeamMember { name:string; role:string; photo:string; accent:Accent }
export interface CaseItem { slug:string; title:string; client:string; category:'Branding'|'Production'|'Marketing'; poster:string; video?:string; result:string; year:number; description:string }
export interface Client { name:string; lockup?:string }
export interface Talk { title:string; guest:string; poster:string; video?:string; duration:string }
export interface RatingEntry { rank:number; name:string; score:number; note:string }
export interface Article { slug:string; title:string; excerpt:string; date:string; tags:string[]; cover:string; readingMinutes:number }
export interface SiteConfig { name:string; url:string; description:string; socials:{instagram:string;telegram:string}; nav:{label:string;href:string}[]; contacts:{email:string;phone:string;address:string} }
```
- `data/site.ts` exports `const site: SiteConfig` with nav in the exact required order and hrefs (`/#about`,`/#services`,`/#pricing`,`/#cases`,`/blog`,`/rating`,`/kuch-talks`).

- [ ] **Step 1: Write failing data-integrity tests**

`data/__tests__/data.test.ts`:
```ts
import { services } from '@/data/services'
import { site } from '@/data/site'
import { cases } from '@/data/cases'
import { articles } from '@/data/articles'

test('exactly 6 services with the required titles', () => {
  expect(services).toHaveLength(6)
  expect(services.map(s => s.title)).toEqual([
    'Маркетинговая стратегия','Бренд-стратегия','Коммуникационная стратегия',
    'Рекламная кампания','Аутсорс-маркетинг','Брендинг',
  ])
})
test('service slugs unique and prices ordered', () => {
  const slugs = services.map(s => s.slug)
  expect(new Set(slugs).size).toBe(slugs.length)
  for (const s of services) { expect(s.priceFrom).toBeGreaterThan(0); expect(s.priceTo).toBeGreaterThanOrEqual(s.priceFrom) }
})
test('nav is in the required order', () => {
  expect(site.nav.map(n => n.label)).toEqual(['О нас','Услуги','Прайс','Кейсы','Блог','Рейтинг','Kuch Talks'])
})
test('cases and articles have unique slugs and ≥ required counts', () => {
  expect(cases.length).toBeGreaterThanOrEqual(6)
  expect(new Set(cases.map(c=>c.slug)).size).toBe(cases.length)
  expect(articles.length).toBeGreaterThanOrEqual(4)
  expect(new Set(articles.map(a=>a.slug)).size).toBe(articles.length)
})
```

- [ ] **Step 2: Run test → fails** — `npm test` → Expected: FAIL (modules missing).

- [ ] **Step 3: Implement all data modules**

Create `data/types.ts` (above). Implement each module with the spec §8 placeholder content:
- `services.ts`: 6 `Service` objects. Prices from spec §8 table (e.g. Маркетинговая стратегия 3000–12000 `project`; Аутсорс-маркетинг 1500–8000 `month`). Each: 3–5 `deliverables`, 2–3 `faq`, icon mapped (Маркетинговая→`megaphone`, Бренд/Коммуникационная→`compass`, Рекламная→`megaphone`, Аутсорс→`chart`, Брендинг→`pen`). Slugs kebab-latin (`marketing-strategy`,`brand-strategy`,`communication-strategy`,`ad-campaign`,`outsource-marketing`,`branding`).
- `team.ts`: 6 members (Мохитобону Кенджаева — CEO / Бренд-стратег; Дони Ахмаджонов — Head of Production; Алишер Мамадалиев — Marketing Director; Aziz Azizov — Art Director; + Strategy Lead, Account Director), `photo` paths under `/images/team/*.jpg`, alternating accents.
- `cases.ts`: ≥6 cases incl. `KUCH × Wellco` and `KUCH × GRAVITY`, posters `/images/cases/*.jpg`, `result` metric strings, years.
- `pricing.ts`: derive from `services` (re-export a table view) — `export const pricing = services.map(s => ({ title:s.title, from:s.priceFrom, to:s.priceTo, unit:s.unit, slug:s.slug }))`.
- `clients.ts`: ≥8 `Client` names incl. Wellco, GRAVITY.
- `rating.ts`: ≥6 `RatingEntry`.
- `talks.ts`: ≥3 `Talk`.
- `articles.ts`: ≥4 `Article` metadata entries whose slugs match the MDX files in Task 11.
- `site.ts`: as in Interfaces (url `https://kuch.agency` placeholder, real instagram/telegram placeholder handles, contacts placeholder).

- [ ] **Step 4: Run test → passes** — `npm test` → Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: typed data modules with brand-book placeholder content"
```

---

### Task 4: SEO library (metadata + JSON-LD builders) (TDD)

**Files:**
- Create: `lib/seo.ts`
- Test: `lib/__tests__/seo.test.ts`

**Interfaces:**
- Produces:
```ts
import type { Metadata } from 'next'
export function pageMetadata(input:{title:string;description:string;path:string;ogImage?:string}):Metadata
export function organizationJsonLd():Record<string,unknown>
export function websiteJsonLd():Record<string,unknown>
export function serviceJsonLd(s:{title:string;description:string;path:string;priceFrom:number}):Record<string,unknown>
export function articleJsonLd(a:{title:string;excerpt:string;path:string;date:string;cover:string}):Record<string,unknown>
export function videoJsonLd(v:{name:string;description:string;thumbnail:string;path:string}):Record<string,unknown>
export function breadcrumbJsonLd(items:{name:string;path:string}[]):Record<string,unknown>
export function faqJsonLd(faq:{q:string;a:string}[]):Record<string,unknown>
```
All use `site.url` for absolute URLs; canonical = `site.url + path`.

- [ ] **Step 1: Write failing tests**

`lib/__tests__/seo.test.ts`:
```ts
import { pageMetadata, organizationJsonLd, serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import { site } from '@/data/site'

test('pageMetadata sets canonical + OG', () => {
  const m = pageMetadata({ title:'T', description:'D', path:'/x' })
  expect(m.title).toContain('T')
  expect(m.alternates?.canonical).toBe(site.url + '/x')
  expect(m.openGraph?.url).toBe(site.url + '/x')
})
test('organization JSON-LD shape', () => {
  const o = organizationJsonLd() as any
  expect(o['@type']).toBe('Organization'); expect(o.name).toBe(site.name)
})
test('service JSON-LD has offers', () => {
  const s = serviceJsonLd({ title:'S', description:'D', path:'/services/s', priceFrom:3000 }) as any
  expect(s['@type']).toBe('Service'); expect(s.offers.price).toBe(3000)
})
test('breadcrumb + faq shapes', () => {
  const b = breadcrumbJsonLd([{name:'Home',path:'/'}]) as any
  expect(b['@type']).toBe('BreadcrumbList'); expect(b.itemListElement[0].position).toBe(1)
  const f = faqJsonLd([{q:'Q',a:'A'}]) as any
  expect(f['@type']).toBe('FAQPage'); expect(f.mainEntity[0].acceptedAnswer.text).toBe('A')
})
```

- [ ] **Step 2: Run → fails.** `npm test` → FAIL.

- [ ] **Step 3: Implement `lib/seo.ts`** with all functions returning valid schema.org objects and Next `Metadata` (title template `"%s — KUCH"`, description, `alternates.canonical`, `openGraph`, `twitter: { card:'summary_large_image' }`, default `ogImage = '/og/default.png'`).

- [ ] **Step 4: Run → passes.** `npm test` → PASS.

- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: SEO metadata + JSON-LD builders"`

---

### Task 5: Form validation, `submitLead` seam, FormField (TDD)

**Files:**
- Create: `components/forms/validate.ts`, `components/forms/submitLead.ts`, `components/forms/FormField.tsx`
- Test: `components/forms/__tests__/forms.test.ts`

**Interfaces:**
- Produces:
```ts
// validate.ts
export interface LeadPayload { name:string; contact:string; type?:string; budget?:string; timeline?:string; message?:string; source:string; ts:string }
export type ValidationErrors = Partial<Record<'name'|'contact'|'message', string>>
export function validateLead(input:Partial<LeadPayload>):ValidationErrors  // empty object = valid
// submitLead.ts
export type SubmitResult = { ok:true } | { ok:false; error:string }
export async function submitLead(payload:LeadPayload):Promise<SubmitResult>
```
`validateLead`: name required (≥2), contact required (email OR phone-ish regex). `submitLead`: runs `validateLead`; if errors → `{ok:false}`; else logs payload and resolves `{ok:true}` (no network). Single integration seam — documented with a comment showing where to add Supabase/Telegram.

- [ ] **Step 1: Write failing tests**

```ts
import { validateLead } from '@/components/forms/validate'
import { submitLead } from '@/components/forms/submitLead'

test('validateLead flags missing name/contact', () => {
  const e = validateLead({ name:'', contact:'' })
  expect(e.name).toBeTruthy(); expect(e.contact).toBeTruthy()
})
test('validateLead accepts valid email', () => {
  expect(validateLead({ name:'Иван', contact:'a@b.co' })).toEqual({})
})
test('submitLead returns ok for valid payload', async () => {
  const r = await submitLead({ name:'Иван', contact:'a@b.co', source:'/', ts:'2026-06-22' })
  expect(r.ok).toBe(true)
})
test('submitLead returns error for invalid payload', async () => {
  const r = await submitLead({ name:'', contact:'', source:'/', ts:'2026-06-22' })
  expect(r.ok).toBe(false)
})
```

- [ ] **Step 2: Run → fails.** `npm test` → FAIL.
- [ ] **Step 3: Implement `validate.ts` + `submitLead.ts`** per Interfaces. `FormField.tsx`: a labeled input/textarea presentational component (props `label,name,type,value,onChange,error,required`) styled with brand tokens (white field on black, pink focus ring, red error text).
- [ ] **Step 4: Run → passes.** `npm test` → PASS.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: lead form validation + submitLead stub seam + FormField"`

---

### Task 6: UI primitives

**Files:**
- Create: `components/ui/Container.tsx`, `Section.tsx`, `Button.tsx`, `Tag.tsx`, `Card.tsx`, `Icon.tsx`, `Reveal.tsx`, `Marquee.tsx`, `LogoCycle.tsx`
- Test: `components/ui/__tests__/ui.test.tsx`

**Interfaces:**
- Produces: `Button({variant:'primary'|'ghost'|'dark',href?,onClick?,children})`; `Section({bg:'black'|'white'|'pink'|'blue',id?,children})`; `Container`; `Tag`; `Card`; `Icon({name:IconName})` (inline SVG for megaphone/compass/pen/chart per brand book); `Reveal({children})` (Framer Motion fade/slide, disabled under reduced-motion); `Marquee({items,speed?})`; `LogoCycle()` (cycles KUCH→MARKETING→BRANDING→STRATEGY).

- [ ] **Step 1: Write failing smoke tests**

```tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

test('Button renders as link when href given', () => {
  render(<Button href="/x">Жми</Button>)
  expect(screen.getByRole('link', { name:'Жми' })).toHaveAttribute('href','/x')
})
test('Icon renders an svg for known name', () => {
  const { container } = render(<Icon name="megaphone" />)
  expect(container.querySelector('svg')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run → fails.** `npm test` → FAIL.
- [ ] **Step 3: Implement primitives.** Brand rules: `Button.primary` = pink bg/black text, hover invert; `.dark` = black bg/white text; `.ghost` = outline. `Section` sets bg + text contrast (black bg→white text, pink/white bg→black text). `Icon` inlines the 4 brand SVG glyphs. `Marquee`/`Reveal`/`LogoCycle` use Framer Motion and check `useReducedMotion()` (render static when reduced). Mark interactive ones `'use client'`.
- [ ] **Step 4: Run → passes.** `npm test` → PASS.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: UI primitives (Button, Section, Icon, Marquee, LogoCycle, Reveal, ...)"`

---

### Task 7: Layout — Header, Footer, MobileNav, StickyCta, root layout

**Files:**
- Create: `components/layout/Header.tsx`, `Footer.tsx`, `MobileNav.tsx`, `StickyCta.tsx`
- Modify: `app/layout.tsx`
- Test: `components/layout/__tests__/header.test.tsx`

**Interfaces:**
- Consumes: `site` (nav, socials), `Button`, `Container`.
- Produces: `Header` (sticky, nav in exact order, Instagram + Telegram icon links, `Онлайн Бриф` + `Оставить заявку` CTAs, mobile hamburger → `MobileNav` drawer); `Footer` (full nav, socials, legal, giant KUCH wordmark); `StickyCta` (floating CTA on scroll). `app/layout.tsx` wires fonts via `next/font/local`, `lang="ru"`, default metadata via `pageMetadata`, injects Organization JSON-LD `<script type="application/ld+json">`.

- [ ] **Step 1: Failing test**

```tsx
import { render, screen } from '@testing-library/react'
import { Header } from '@/components/layout/Header'
test('Header shows all nav items and both CTAs', () => {
  render(<Header />)
  for (const label of ['О нас','Услуги','Прайс','Кейсы','Блог','Рейтинг','Kuch Talks'])
    expect(screen.getByText(label)).toBeInTheDocument()
  expect(screen.getByText('Онлайн Бриф')).toBeInTheDocument()
  expect(screen.getByText('Оставить заявку')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run → fails.** `npm test` → FAIL.
- [ ] **Step 3: Implement** Header/Footer/MobileNav/StickyCta + update `app/layout.tsx` (fonts via `next/font/local` pointing at `public/fonts`, set `--font-display`/`--font-sans`, render Header/children/Footer/StickyCta, Organization JSON-LD). Instagram/Telegram from `site.socials`.
- [ ] **Step 4: Run → passes + build.** `npm test` → PASS; `npm run build` → succeeds.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: header, footer, mobile nav, sticky CTA, root layout + fonts"`

---

### Task 8: LeadForm + BriefForm (client components)

**Files:**
- Create: `components/forms/LeadForm.tsx`, `components/forms/BriefForm.tsx`
- Test: `components/forms/__tests__/leadform.test.tsx`

**Interfaces:**
- Consumes: `validateLead`, `submitLead`, `FormField`, `Button`.
- Produces: `LeadForm({source})` (имя, контакт, сообщение → validate → submitLead → success screen / inline errors); `BriefForm()` multi-step (1 тип проекта → 2 задача → 3 бюджет → 4 сроки → 5 контакты) with progress indicator, back/next, final submit via `submitLead({source:'/brief', ...})`.

- [ ] **Step 1: Failing test**

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LeadForm } from '@/components/forms/LeadForm'
test('LeadForm shows errors then success', async () => {
  render(<LeadForm source="test" />)
  fireEvent.click(screen.getByRole('button', { name:/отправить/i }))
  expect(await screen.findByText(/укажите/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run → fails.** `npm test` → FAIL.
- [ ] **Step 3: Implement** both forms (`'use client'`), brand-styled, accessible labels, error text in `#FF0048`, success state with confirmation copy in brand voice.
- [ ] **Step 4: Run → passes + build.** `npm test` PASS; `npm run build` succeeds.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: LeadForm + multi-step BriefForm"`

---

### Task 9: Landing sections (part 1) — Hero, About, Team, Services, Pricing, TrustedBy

**Files:**
- Create: `components/sections/Hero.tsx`, `About.tsx`, `Team.tsx`, `Services.tsx`, `Pricing.tsx`, `TrustedBy.tsx`
- Test: `components/sections/__tests__/sections1.test.tsx`

**Interfaces:**
- Consumes: data modules, `Section`, `Container`, `Card`, `Icon`, `Button`, `Marquee`, `LogoCycle`, `Reveal`, `LeadForm`.
- Produces: section components with anchor ids `#about`, `#services`, `#pricing` where required. Each exported as default + named.

**Acceptance per section:**
- **Hero** (`id` none, full-height, black bg): giant KUCH, `LogoCycle`, slogan «МЫ НЕ БОИМСЯ СЛОЖНОГО», subline, CTAs `Онлайн Бриф`(→`/brief`) + `Оставить заявку`(opens LeadForm). `Marquee` of Marketing·Branding·Strategy.
- **About** (`#about`, white bg, black text): idea statement + pillars 01 Сила / 02 Тяжёлая работа / 03 Результат + stat row.
- **Team** (pink/black alternating cards): 6 members from `team` with poster styling + alt text.
- **Services** (`#services`): 6 cards from `services` — Icon + title + short + «от $X» + link `/services/[slug]`.
- **Pricing** (`#pricing`): table from `pricing` showing «$from – $to / unit»; CTA to `/pricing`.
- **TrustedBy**: client logo strip from `clients` incl. KUCH × Wellco / KUCH × GRAVITY; trust line.

- [ ] **Step 1: Failing smoke test**

```tsx
import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
test('Hero shows slogan', () => { render(<Hero />); expect(screen.getByText(/МЫ НЕ БОИМСЯ СЛОЖНОГО/)).toBeInTheDocument() })
test('Services renders 6 service titles', () => {
  render(<Services />)
  expect(screen.getByText('Брендинг')).toBeInTheDocument()
  expect(screen.getByText('Маркетинговая стратегия')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run → fails.** `npm test` → FAIL.
- [ ] **Step 3: Implement the 6 sections** per acceptance, brand styling, `Reveal` wrappers, responsive type scale, `prefers-reduced-motion` honored.
- [ ] **Step 4: Run → passes + build.** `npm test` PASS; `npm run build` succeeds.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: landing sections part 1 (hero, about, team, services, pricing, trusted-by)"`

---

### Task 10: Landing sections (part 2) — VideoCases, BlogPreview, RatingPreview, TalksPreview, ContactCta + assemble `/`

**Files:**
- Create: `components/sections/VideoCases.tsx`, `BlogPreview.tsx`, `RatingPreview.tsx`, `TalksPreview.tsx`, `ContactCta.tsx`
- Modify: `app/page.tsx`
- Test: `components/sections/__tests__/sections2.test.tsx`, `app/__tests__/home.test.tsx`

**Interfaces:**
- Consumes: `cases`, `articles`, `rating`, `talks`, `LeadForm`, `BriefForm` link, `next/image`.
- Produces: section components; `app/page.tsx` composes all 11 sections in spec §5 order and adds `websiteJsonLd` + `pageMetadata`.

**Acceptance:**
- **VideoCases** (`#cases`): grid from `cases`, poster-first via `next/image`, `<video preload="none" poster=...>` lazy; link `/cases`.
- **BlogPreview**: latest 3 `articles` → `/blog/[slug]`. **RatingPreview**: teaser → `/rating`. **TalksPreview**: latest talks → `/kuch-talks`.
- **ContactCta**: Online Brief (link `/brief`) + `LeadForm` side by side, contacts + socials.

- [ ] **Step 1: Failing tests**

```tsx
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
test('home renders cases anchor + contact', () => {
  const { container } = render(<Home />)
  expect(container.querySelector('#cases')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run → fails.** `npm test` → FAIL.
- [ ] **Step 3: Implement** the 5 sections + assemble `app/page.tsx` in exact §5 order with metadata + JSON-LD.
- [ ] **Step 4: Run → passes + build.** `npm test` PASS; `npm run build` succeeds; `view-source` of `/` shows rendered text.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: landing sections part 2 + assembled home page"`

---

### Task 11: Content routes — services, pricing, cases

**Files:**
- Create: `app/services/page.tsx`, `app/services/[slug]/page.tsx`, `app/pricing/page.tsx`, `app/cases/page.tsx`, `app/cases/[slug]/page.tsx`
- Test: `app/__tests__/routes1.test.tsx`

**Interfaces:**
- Consumes: data + `lib/seo`. Produces: static routes with `generateStaticParams` for `[slug]`, per-route `generateMetadata`, JSON-LD (Service+FAQ on service detail, VideoObject+Breadcrumb on case detail).

- [ ] **Step 1: Failing test**

```tsx
import { generateStaticParams } from '@/app/services/[slug]/page'
import { services } from '@/data/services'
test('service params cover all services', async () => {
  const params = await generateStaticParams()
  expect(params.map((p:any)=>p.slug).sort()).toEqual(services.map(s=>s.slug).sort())
})
```

- [ ] **Step 2: Run → fails.** `npm test` → FAIL.
- [ ] **Step 3: Implement** all five pages: index pages list items; `[slug]` pages render detail (deliverables, price, FAQ accordion / case video + result), `notFound()` for unknown slug, JSON-LD + metadata.
- [ ] **Step 4: Run → passes + build.** `npm test` PASS; `npm run build` succeeds (all params prerendered).
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: services, pricing, cases routes with SSG + JSON-LD"`

---

### Task 12: Content routes — blog (MDX), rating, kuch-talks, brief, contact

**Files:**
- Create: `content/blog/*.mdx` (≥4, slugs matching `articles.ts`), `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/rating/page.tsx`, `app/kuch-talks/page.tsx`, `app/brief/page.tsx`, `app/contact/page.tsx`
- Modify: `next.config.mjs` (MDX), `package.json` (add `@next/mdx @mdx-js/loader @mdx-js/react` or `next-mdx-remote`)
- Test: `app/__tests__/routes2.test.tsx`

**Interfaces:**
- Consumes: `articles`, MDX content, `lib/seo`, `BriefForm`, `LeadForm`. Produces: blog index + MDX article pages (Article+Breadcrumb JSON-LD, reading time), rating page (ItemList/Article), talks page (VideoObject), `/brief` (BriefForm), `/contact` (LeadForm + contacts).

- [ ] **Step 1: Failing test** — assert `generateStaticParams` for blog covers all `articles` slugs (mirror Task 11 test).
- [ ] **Step 2: Run → fails.** `npm test` → FAIL.
- [ ] **Step 3: Implement** MDX pipeline + write ≥4 articles (spec §8 topics, brand voice, ~400–600 words each, frontmatter matching `articles.ts`), build all pages with metadata + JSON-LD.
- [ ] **Step 4: Run → passes + build.** `npm test` PASS; `npm run build` succeeds.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: blog (MDX), rating, kuch-talks, brief, contact routes"`

---

### Task 13: SEO files — sitemap, robots, llms.txt, RSS, OG defaults (TDD where logic)

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`, `app/rss.xml/route.ts`, `public/llms.txt`, `public/og/default.png` (brand placeholder), `lib/__tests__/sitemap.test.ts`

**Interfaces:**
- Produces: `sitemap()` returning every static + dynamic route; `robots()` allowing all + sitemap ref; RSS route building XML from `articles`; `llms.txt` summarizing site/sections for LLM crawlers.

- [ ] **Step 1: Failing test**

```ts
import sitemap from '@/app/sitemap'
import { services } from '@/data/services'
test('sitemap includes home, all services, blog index', async () => {
  const urls = (await sitemap()).map((e:any)=>e.url)
  expect(urls.some((u:string)=>u.endsWith('/'))).toBe(true)
  for (const s of services) expect(urls.some((u:string)=>u.endsWith('/services/'+s.slug))).toBe(true)
})
```

- [ ] **Step 2: Run → fails.** `npm test` → FAIL.
- [ ] **Step 3: Implement** sitemap (all routes incl. dynamic), robots, RSS route, write `llms.txt`, add brand OG default image.
- [ ] **Step 4: Run → passes + build.** `npm test` PASS; `npm run build` succeeds; `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/rss.xml` reachable in `npm start`.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: sitemap, robots, llms.txt, RSS, OG defaults"`

---

### Task 14: Placeholder media assets

**Files:**
- Create: `public/images/{team,cases,blog}/*`, `public/video/` posters, brand-colored placeholder images sized for `next/image`.

- [ ] **Step 1:** Generate brand-colored placeholder images (pink/black/blue blocks with KUCH wordmark text) at correct aspect ratios for team (3:4), cases (16:9), blog covers (16:9), with descriptive filenames matching data module paths. Use a small script or static SVGs exported to the referenced paths. Ensure every `photo`/`poster`/`cover` path in data resolves.
- [ ] **Step 2: Build verify** — `npm run build` → no missing-image errors; `next/image` renders.
- [ ] **Step 3: Commit** — `git add -A && git commit -m "chore: brand-colored placeholder media assets"`

---

### Task 15: Final verification & polish

**Files:** as needed (responsive fixes, a11y, reduced-motion).

- [ ] **Step 1: Type + build + tests** — `npx tsc --noEmit` (0 errors), `npm test` (all pass), `npm run build` (success).
- [ ] **Step 2: SSR/HTML check** — `npm start`; `curl -s localhost:3000 | grep "МЫ НЕ БОИМСЯ"` returns content (proves SSG HTML, not empty shell). Repeat for `/services/branding`, `/blog/<slug>`.
- [ ] **Step 3: SEO check** — confirm each route has unique `<title>`/description; JSON-LD present and valid (paste into schema.org validator); `sitemap.xml`/`robots.txt`/`llms.txt`/`rss.xml` resolve.
- [ ] **Step 4: VPN/offline check** — load the built site with external network blocked (DevTools "Block all except localhost" / offline after first load); confirm fonts + assets render first-party with no failed third-party requests.
- [ ] **Step 5: Responsive + a11y + motion** — verify mobile/tablet/desktop layouts, keyboard nav + focus states, AA contrast, and that enabling OS "reduce motion" disables animations.
- [ ] **Step 6: Lighthouse** — run on `/`; record Performance ≥ 90, SEO ≥ 95, Best Practices ≥ 90; fix regressions.
- [ ] **Step 7: Commit** — `git add -A && git commit -m "chore: final verification, a11y, responsive, reduced-motion polish"`

---

## Self-Review

**Spec coverage:** Stack (T1–2), data/content (T3, T14, §8), SEO/JSON-LD (T4,T11,T12,T13), forms seam (T5,T8), layout/nav (T7), landing §5 sections in order (T9,T10), all routes §4 (T11,T12), design system §6 (T2,T6,T9,T10), performance/VPN §9 (T2,T10,T13,T15), acceptance §10 (T15). All spec sections map to tasks.

**Placeholder scan:** No "TBD/TODO/handle edge cases" — UI tasks carry explicit acceptance criteria + content source; logic tasks carry full code + tests.

**Type consistency:** `LeadPayload`, `Service`, `CaseItem`, `Article`, `submitLead`, `validateLead`, and `lib/seo` signatures are defined once in T3/T4/T5 and consumed by name in later tasks. `pricing` derived from `services` keeps titles/prices single-sourced.

## Open follow-ups (post-plan, from spec §11)
Real content swap, font licensing, `submitLead` backend wiring, currency confirmation, optional analytics — tracked but out of scope for this plan.
