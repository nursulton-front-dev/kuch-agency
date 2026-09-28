export type IconName = 'megaphone' | 'compass' | 'pen' | 'chart'
export type Accent = 'pink' | 'black' | 'blue' | 'coral'

export interface Service {
  slug: string
  title: string
  short: string
  description: string
  icon: IconName
  priceFrom: number
  priceTo: number
  onRequest?: boolean
  unit: 'project' | 'month'
  deliverables: string[]
  faq: { q: string; a: string }[]
}

export interface TeamMember {
  name: string
  role: string
  photo: string
  accent: Accent
}

export interface CaseItem {
  slug: string
  title: string
  client: string
  category: 'Branding' | 'Production' | 'Marketing'
  poster: string
  video?: string
  result: string
  year: number
  description: string
}

export interface Client {
  name: string
  lockup?: string
}

export interface Talk {
  title: string
  guest: string
  poster: string
  video?: string
  duration: string
}

export interface RatingEntry {
  rank: number
  name: string
  score: number
  note: string
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  cover: string
  readingMinutes: number
}

export interface SiteConfig {
  name: string
  url: string
  description: string
  socials: { instagram: string; telegram: string }
  nav: { label: string; href: string }[]
  contacts: { email: string; phone: string; address: string }
}
