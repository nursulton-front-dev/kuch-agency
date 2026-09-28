import type { SiteConfig } from './types'

export const site: SiteConfig = {
  name: 'KUCH',
  url: 'https://kuchgroup.uz',
  description:
    'KUCH — маркетинговое агентство полного цикла. Маркетинговые стратегии, брендинг и рекламные кампании. МЫ НЕ БОИМСЯ СЛОЖНОГО.',
  socials: {
    instagram: 'https://www.instagram.com/kuch_group/',
    telegram: 'https://t.me/kuchaloqada',
  },
  nav: [
    { label: 'О нас', href: '/#about' },
    { label: 'Услуги', href: '/#services' },
    { label: 'Прайс', href: '/#pricing' },
    { label: 'Кейсы', href: '/#cases' },
    { label: 'Блог', href: '/blog' },
    { label: 'Kuch Talks', href: '/kuch-talks' },
  ],
  contacts: {
    email: 'info@kuch-group.uz',
    phone: '+998 97 719 94 47',
    address: 'Ташкент, Дамарык, 41',
  },
}
