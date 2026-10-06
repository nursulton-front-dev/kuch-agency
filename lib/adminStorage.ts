export interface TeamMemberItem {
  id: string
  photo: string
  name_ru: string
  name_uz: string
  role_ru: string
  role_uz: string
  order: number
}

export interface CaseAdminItem {
  id: string
  title_ru: string
  title_uz: string
  client: string
  category_ru: string
  category_uz: string
  year: number
  desc_ru: string
  desc_uz: string
  cover: string
  slug: string
  published: boolean
}

export interface BlogAdminItem {
  id: string
  title_ru: string
  title_uz: string
  tag_ru: string
  tag_uz: string
  read_time_ru: string
  read_time_uz: string
  content_ru: string
  content_uz: string
  cover: string
  date: string
}

export interface TalkAdminItem {
  id: string
  title_ru: string
  title_uz: string
  speaker_ru: string
  speaker_uz: string
  duration: string
  video_url: string
  video?: string
  cover: string
}

export interface ContactsSettings {
  phone: string
  email: string
  address_ru: string
  address_uz: string
  telegram: string
  instagram: string
}

export interface ServicePriceItem {
  id: string
  title_ru: string
  title_uz: string
  starting_price: number | null
  is_on_request: boolean
}

export interface AdminSettingsData {
  contacts: ContactsSettings
  services: ServicePriceItem[]
}

// Initial default seed data
const initialTeam: TeamMemberItem[] = [
  {
    id: 'team-1',
    photo: '/images/team/mohitobon-kenjaeva.jpg',
    name_ru: 'Мохитобон Кенджаева',
    name_uz: 'Mohitobon Kenjaeva',
    role_ru: 'Стратег и со-основатель',
    role_uz: 'Strateg va hammuassis',
    order: 1,
  },
  {
    id: 'team-2',
    photo: '/images/team/farkhad-kuchkarov.jpg',
    name_ru: 'Фархад Кучкаров',
    name_uz: 'Farxod Kuchkarov',
    role_ru: 'Куратор агентства',
    role_uz: 'Agentlik kuratori',
    order: 2,
  },
  {
    id: 'team-3',
    photo: '/images/team/tamila-kurt-bedin.jpg',
    name_ru: 'Тамила Курт-Бедин',
    name_uz: 'Tamila Kurt-Bedin',
    role_ru: 'Проджект-менеджер',
    role_uz: 'Loyiha menejeri',
    order: 3,
  },
  {
    id: 'team-4',
    photo: '/images/team/shakhzod-turobov.jpg',
    name_ru: 'Шахзод Туробов',
    name_uz: 'Shaxzod Turobov',
    role_ru: 'Арт-директор',
    role_uz: 'Art-direktor',
    order: 4,
  },
  {
    id: 'team-5',
    photo: '/images/team/timur-akhmadjonov.jpg',
    name_ru: 'Тимур Ахмаджонов',
    name_uz: 'Timur Ahmadjonov',
    role_ru: 'Бренд-дизайнер',
    role_uz: 'Brend-dizayner',
    order: 5,
  },
]

const initialCases: CaseAdminItem[] = [
  {
    id: 'case-1',
    slug: 'fido',
    title_ru: 'KUCH × Fido',
    title_uz: 'KUCH × Fido',
    client: 'Fido',
    category_ru: 'Маркетинг',
    category_uz: 'Marketing',
    cover: '/images/cases/wellco.jpg',
    year: 2026,
    desc_ru: 'Комплексная маркетинговая стратегия для цифровой экосистемы Fido.',
    desc_uz: 'Fido raqamli ekotizimi uchun kompleks marketing strategiyasi.',
    published: true,
  },
  {
    id: 'case-2',
    slug: 'uklon',
    title_ru: 'KUCH × Uklon',
    title_uz: 'KUCH × Uklon',
    client: 'Uklon',
    category_ru: 'Маркетинг',
    category_uz: 'Marketing',
    cover: '/images/cases/gravity.jpg',
    year: 2026,
    desc_ru: 'Запуск и позиционирование сервиса райдхайлинга в Узбекистане.',
    desc_uz: "O'zbekistonda raydhayling xizmatini yo'lga qo'yish va pozitsiyalash.",
    published: true,
  },
  {
    id: 'case-3',
    slug: 'birbir',
    title_ru: 'KUCH × BirBir',
    title_uz: 'KUCH × BirBir',
    client: 'BirBir',
    category_ru: 'Брендинг',
    category_uz: 'Brending',
    cover: '/images/cases/urban-taste.jpg',
    year: 2026,
    desc_ru: 'Айдентика и нейминг инновационной финтех платформы.',
    desc_uz: 'Innovatsion fintex platformasining ayniyati va neymingi.',
    published: true,
  },
  {
    id: 'case-4',
    slug: 'ovi',
    title_ru: 'KUCH × Ovi',
    title_uz: 'KUCH × Ovi',
    client: 'Ovi',
    category_ru: 'Брендинг',
    category_uz: 'Brending',
    cover: '/images/cases/nomad-tech.jpg',
    year: 2026,
    desc_ru: 'Разработка бренда экосистемы логистических услуг.',
    desc_uz: 'Logistika xizmatlari ekotizimi brendini ishlab chiqish.',
    published: true,
  },
  {
    id: 'case-5',
    slug: 'orzu',
    title_ru: 'KUCH × Orzu',
    title_uz: 'KUCH × Orzu',
    client: 'Orzu',
    category_ru: 'Маркетинг',
    category_uz: 'Marketing',
    cover: '/images/cases/bloom-beauty.jpg',
    year: 2026,
    desc_ru: 'Интегрированная рекламная кампания и коммуникация.',
    desc_uz: 'Integratsiyalashgan reklama kampaniyasi va kommunikatsiya.',
    published: true,
  },
]

const initialBlog: BlogAdminItem[] = [
  {
    id: 'blog-1',
    title_ru: 'Как построить бренд в 2026 году: Пошаговый гайд',
    title_uz: '2026 yilda brendni qanday qurish kerak: Bosqichma-bosqich qo‘llanma',
    tag_ru: 'Брендинг',
    tag_uz: 'Brending',
    read_time_ru: '5 мин',
    read_time_uz: '5 daq',
    date: '2026-03-15',
    cover: '/images/cases/urban-taste.jpg',
    content_ru: 'В современных реалиях рынок требует четкого позиционирования и смелой визуальной айдентики...',
    content_uz: "Zamonaviy haqiqatlarda bo'zor aniq pozitsiyalash va jasur vizual ayniyatni talab qiladi...",
  },
  {
    id: 'blog-2',
    title_ru: 'Зачем маркетинговой стратегии нужен сквозной аудит',
    title_uz: 'Nima uchun marketing strategiyasiga audit kerak',
    tag_ru: 'Маркетинг',
    tag_uz: 'Marketing',
    read_time_ru: '7 мин',
    read_time_uz: '7 daq',
    date: '2026-03-20',
    cover: '/images/cases/gravity.jpg',
    content_ru: 'Без аудита рекламных каналов и поведения аудитории бюджет может уходить вникуда...',
    content_uz: "Reklama kanallari va auditoriya xulq-atvori auditisiz byudjet havoga sovurilishi mumkin...",
  },
]

const initialTalks: TalkAdminItem[] = [
  {
    id: 'talk-1',
    title_ru: 'Как построить бренд с нуля в 2026 году',
    title_uz: '2026 yilda brendni noldan qanday qurish kerak',
    speaker_ru: 'Мохитобон Кенджаева',
    speaker_uz: 'Mohitobon Kenjaeva',
    duration: '42:18',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    cover: '/images/talks/talk-01.jpg',
  },
  {
    id: 'talk-2',
    title_ru: 'Performance vs Brand: где найти баланс',
    title_uz: 'Performance vs Brand: muvozanatni qayerdan topish kerak',
    speaker_ru: 'Алишер Мамадалиев',
    speaker_uz: 'Alisher Mamadaliyev',
    duration: '38:55',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    cover: '/images/talks/talk-02.jpg',
  },
  {
    id: 'talk-3',
    title_ru: 'Визуальная идентичность: больше чем логотип',
    title_uz: 'Vizual ayniyat: logotipdan ko‘ra ko‘proq narsa',
    speaker_ru: 'Азиз Азизов',
    speaker_uz: 'Aziz Azizov',
    duration: '51:22',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    cover: '/images/talks/talk-03.jpg',
  },
]

const initialSettings: AdminSettingsData = {
  contacts: {
    phone: '+998 97 719 94 47',
    email: 'info@kuch-group.uz',
    address_ru: 'Ташкент, Дамарык, 41',
    address_uz: 'Toshkent, Damariq, 41',
    telegram: 'https://t.me/kuchaloqada',
    instagram: 'https://www.instagram.com/kuch_group/',
  },
  services: [
    {
      id: 'marketing-strategy',
      title_ru: 'Маркетинговая стратегия',
      title_uz: 'Marketing strategiyasi',
      starting_price: 8000,
      is_on_request: false,
    },
    {
      id: 'brand-strategy',
      title_ru: 'Бренд-стратегия',
      title_uz: 'Brend-strategiyasi',
      starting_price: 18000,
      is_on_request: false,
    },
    {
      id: 'communication-strategy',
      title_ru: 'Коммуникационная стратегия',
      title_uz: 'Kommunikatsion strategiya',
      starting_price: 10000,
      is_on_request: false,
    },
    {
      id: 'ad-campaign',
      title_ru: 'Рекламная кампания',
      title_uz: 'Reklama kampaniyasi',
      starting_price: 8000,
      is_on_request: false,
    },
    {
      id: 'outsource-marketing',
      title_ru: 'Аутсорс-маркетинг',
      title_uz: 'Autsors-marketing',
      starting_price: null,
      is_on_request: true,
    },
    {
      id: 'branding',
      title_ru: 'Разработка фирменного стиля',
      title_uz: 'Firma uslubini ishlab chiqish',
      starting_price: 10000,
      is_on_request: false,
    },
  ],
}

// LocalStorage helpers
export const getAdminStorage = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback
  try {
    const data = localStorage.getItem(`kuch_admin_${key}`)
    return data ? JSON.parse(data) : fallback
  } catch {
    return fallback
  }
}

export const setAdminStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(`kuch_admin_${key}`, JSON.stringify(value))
  } catch (err) {
    console.error('Storage error:', err)
  }
}

export const getStoredTeam = () => getAdminStorage<TeamMemberItem[]>('team', initialTeam)
export const saveStoredTeam = (items: TeamMemberItem[]) => setAdminStorage('team', items)

export const getStoredCases = () => getAdminStorage<CaseAdminItem[]>('cases', initialCases)
export const saveStoredCases = (items: CaseAdminItem[]) => setAdminStorage('cases', items)

export const getStoredBlog = () => getAdminStorage<BlogAdminItem[]>('blog', initialBlog)
export const saveStoredBlog = (items: BlogAdminItem[]) => setAdminStorage('blog', items)

export const getStoredTalks = () => getAdminStorage<TalkAdminItem[]>('talks', initialTalks)
export const saveStoredTalks = (items: TalkAdminItem[]) => setAdminStorage('talks', items)

export const getStoredSettings = () => getAdminStorage<AdminSettingsData>('settings', initialSettings)
export const saveStoredSettings = (data: AdminSettingsData) => setAdminStorage('settings', data)
