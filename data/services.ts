import type { Service } from './types'

export const services: Service[] = [
  {
    slug: 'marketing-strategy',
    title: 'Маркетинговая стратегия',
    title_uz: 'Marketing strategiyasi',
    short: 'Анализируем бизнес и его точки роста, формируя стратегию с системой KPI.',
    short_uz: 'Biznes va uning o\'sish nuqtalarini tahlil qilamiz, KPI tizimiga ega strategiyani shakllantiramiz.',
    description:
      'Формирование маркетинговой стратегии с нуля — от анализа рынка и позиционирования до каналов продвижения, KPI и дорожной карты реализации.',
    description_uz:
      'Bozor tahlili va pozitsiyalashdan tortib, ilgari surish kanallari, KPI va amalga oshirish yo\'l xaritasigacha marketing strategiyasini noldan shakllantirish.',
    icon: 'megaphone',
    priceFrom: 8000,
    priceTo: 8000,
    startingPriceUSD: 8000,
    unit: 'project',
    deliverables: [
      'Диагностика рынка и конкурентной среды',
      'Сегментация аудитории и построение портретов потребителей',
      'Позиционирование бренда и формирование ценностного предложения',
      'Стратегическая дорожная карта с системой KPI',
      'Медиапланирование и распределение бюджета по каналам',
    ],
    deliverables_uz: [
      'Bozor va raqobatchilar muhiti diagnostikasi',
      'Auditoriyani segmentlash va iste\'molchilar portretini tuzish',
      'Brend pozitsiyasi va qiymat taklifini shakllantirish',
      'KPI tizimiga ega strategik yo\'l xaritasi',
      'Mediaprejalashtirish va byudjetni kanallar bo\'yicha taqsimlash',
    ],
    faq: [
      {
        q: 'Сколько времени занимает разработка стратегии?',
        a: 'В среднем 4–6 недель: 2 недели на аудит и исследования, 2–4 недели на разработку и согласование.',
      },
      {
        q: 'Что входит в финальный документ?',
        a: 'Полный стратегический документ с аналитикой, позиционированием, планом действий и метриками успеха.',
      },
    ],
  },
  {
    slug: 'brand-strategy',
    title: 'Бренд-стратегия',
    title_uz: 'Brend strategiyasi',
    short: 'Строим позиционирование бренда на основе его сути и целей бизнеса.',
    short_uz: 'Biznes maqsadlari va mohiyatiga tayangan holda brend pozitsiyasini quramiz.',
    description:
      'Строим бренд-стратегию на миссии, ценностях, архетипе, голосе, обещании и территории бренда.',
    description_uz:
      'Brend strategiyasini missiya, qadriyatlar, arxetip, ovoz, va\'da va brend hududi asosida quramiz.',
    icon: 'pen',
    priceFrom: 18000,
    priceTo: 18000,
    startingPriceUSD: 18000,
    unit: 'project',
    deliverables: [
      'Кабинетное исследование и бренд аудит',
      'Позиционирование бренда',
      'Архитектура бренда',
      'Платформа бренда',
      'Коммуникационная стратегия',
    ],
    deliverables_uz: [
      'Kabinet tadqiqoti va brend auditi',
      'Brend pozitsiyasi',
      'Brend arxitekturasi',
      'Brend platformasi',
      'Kommunikatsiya strategiyasi',
    ],
    faq: [
      {
        q: 'Чем бренд-стратегия отличается от маркетинговой?',
        a: 'Бренд-стратегия определяет смыслы, идентичность и восприятие бренда аудиторией, в то время как маркетинговая фокусируется на каналах и продажах.',
      },
      {
        q: 'Сколько времени требуется на разработку?',
        a: 'Разработка занимает от 4 до 8 недель с учетом проведения исследований.',
      },
    ],
  },
  {
    slug: 'communication-strategy',
    title: 'Коммуникационная стратегия',
    title_uz: 'Kommunikatsiya strategiyasi',
    short: 'Формирование характера и отличия каждого суббренда, определение стратегии коммуникаций.',
    short_uz: 'Har bir subbrend xarakteri va farqini shakllantirish, kommunikatsiya strategiyasini belgilash.',
    description:
      'Формирование архитектуры коммуникаций бренда: ключевые сообщения, tone of voice, контент-стратегию и план активаций по каналам',
    description_uz:
      'Brend kommunikatsiya arxitekturasini shakllantirish: asosiy xabarlar, tone of voice, kontent-strategiya va kanallar bo\'yicha faollashtirish rejasi',
    icon: 'megaphone',
    priceFrom: 10000,
    priceTo: 10000,
    startingPriceUSD: 10000,
    unit: 'project',
    deliverables: [
      'Сегментированная архитектура ключевых сообщений',
      'Tone of voice как система коммуникационных принципов',
      'Контент-стратегия: логика подачи и структура рубрик',
      'Медиаплан активаций по каналам коммуникации',
    ],
    deliverables_uz: [
      'Segmentlangan asosiy xabarlar arxitekturasi',
      'Tone of voice kommunikatsiya tamoyillari tizimi sifatida',
      'Kontent-strategiya: taqdim etish mantig\'i va ruknlar tuzilishi',
      'Kommunikatsiya kanallari bo\'yicha faollashtirish mediaprejalari',
    ],
    faq: [
      {
        q: 'Входит ли питчинг в СМИ в стоимость?',
        a: 'Да, стратегия включает матрицу инфоповодов и первичный питчинг ключевых медиа.',
      },
    ],
  },
  {
    slug: 'ad-campaign',
    title: 'Рекламная кампания',
    title_uz: 'Reklama kampaniyasi',
    short: 'Разработка интегрированной рекламной кампании',
    short_uz: 'Integratsiyalashgan reklama kampaniyasini ishlab chiqish',
    description:
      'Формируем рекламную кампанию на пересечении креативной стратегии и измеримого результата.',
    description_uz:
      'Kreativ strategiya va o\'lchanadigan natija tutashgan joyda reklama kampaniyasini shakllantiramiz.',
    icon: 'chart',
    priceFrom: 8000,
    priceTo: 8000,
    startingPriceUSD: 8000,
    unit: 'project',
    deliverables: [
      'Аудит коммуникации и диагностика точек роста',
      'Big Idea и креативная платформа кампании',
      'Продакшн: адаптация под форматы и каналы',
      'Медиастратегия, сплит бюджета и закупка',
      'Отслеживание метрик и оптимизация в моменте',
    ],
    deliverables_uz: [
      'Kommunikatsiya auditi va o\'sish nuqtalari diagnostikasi',
      'Big Idea va kampaniyaning kreativ platformasi',
      'Prodakshn: formatlar va kanallarga moslashtirish',
      'Mediastrategiya, byudjet spliti va xaridlar',
      'Metrikalarni kuzatish va jarayonda optimallashtirish',
    ],
    faq: [
      {
        q: 'Каковы сроки запуска рекламной кампании?',
        a: 'От разработки концепции до старта показов проходит от 2 до 4 недель.',
      },
    ],
  },
  {
    slug: 'outsource-marketing',
    title: 'Аутсорс-маркетинг',
    title_uz: 'Autsors marketing',
    short: 'Полное управление маркетингом вашей компании',
    short_uz: 'Kompaniyangiz marketingini to\'liq boshqarish',
    description:
      'Ведение маркетинга полного цикла: контент, SMM, рекламные кампании, аналитика',
    description_uz:
      'To\'liq siklli marketing yuritish: kontent, SMM, reklama kampaniyalari, tahlil',
    icon: 'compass',
    priceFrom: 0,
    priceTo: 0,
    startingPriceUSD: 0,
    priceOnRequest: true,
    onRequest: true,
    unit: 'month',
    deliverables: [
      'Ежемесячный маркетинг-план и приоритизация задач',
      'Контент-продакшн под все форматы и каналы',
      'SMM: публикация, комьюнити-менеджмент, модерация',
      'Настройка, запуск и оптимизация рекламных кампаний',
      'Отчётность по метрикам и ROI',
    ],
    deliverables_uz: [
      'Oylik marketing-reja va vazifalar prioritizatsiyasi',
      'Barcha format va kanallar uchun kontent-prodakshn',
      'SMM: nashr qilish, hamjamiyat boshqaruvi, moderatsiya',
      'Reklama kampaniyalarini sozlash, ishga tushirish va optimallashtirish',
      'Metrikalar va ROI bo\'yicha hisobotlar',
    ],
    faq: [
      {
        q: 'Как рассчитывается стоимость аутсорса?',
        a: 'Стоимость формируется на основе требуемых ресурсов команды и объема задач бизнеса.',
      },
    ],
  },
  {
    slug: 'branding',
    title: 'Разработка фирменного стиля',
    title_uz: 'Firma uslubini ishlab chiqish',
    short: 'Разработка вашего фирменного стиля, полноценной дизайн системы и брендбука',
    short_uz: 'Firma uslubingiz, to\'liq dizayn-tizim va brendbukni ishlab chiqish',
    description:
      'Разработка вашего фирменного стиля, полноценной дизайн-системы и брендбука.',
    description_uz:
      'Firma uslubingiz, to\'liq dizayn-tizim va brendbukni ishlab chiqish.',
    icon: 'pen',
    priceFrom: 10000,
    priceTo: 10000,
    startingPriceUSD: 10000,
    unit: 'project',
    deliverables: [
      'Полный дизайн фирменного стиля: логотип, типографика, цветовая палитра и фирменная графика — с адаптацией под все носители и оформлением в брендбук.',
    ],
    deliverables_uz: [
      'To\'liq firma uslubi dizayni: logotip, tipografika, ranglar palitrasi va firma grafikasi — barcha vositalarga moslashtirish va brendbukka jamlash.',
    ],
    faq: [
      {
        q: 'Сколько концепций логотипа вы предоставляете?',
        a: 'Мы предоставляем 3 уникальные концепции с визуализацией на реальных носителях.',
      },
      {
        q: 'Входит ли брендбук в стоимость?',
        a: 'Да, вы получаете подробный брендбук (Brand Guidelines) с правилами использования всех элементов.',
      },
    ],
  },
]
