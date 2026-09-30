import type { Service } from './types'

export const services: Service[] = [
  {
    slug: 'marketing-strategy',
    title: 'Маркетинговая стратегия',
    title_uz: 'Marketing strategiyasi',
    short: 'Анализируем бизнес и его точки роста, формируя маркетинговую стратегию.',
    short_uz: 'Biznes va uning o\'sish nuqtalarini tahlil qilamiz, marketing strategiyasini shakllantiramiz.',
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
      '01 Diagnostika: bozor va raqobat muhitini tahlil qilish',
      '02 Auditoriyani segmentatsiyalash va iste\'molchilar portretini qurish',
      '03 Brendni pozitsiyalash va qiymat taklifini shakllantirish',
      '04 KPI tizimi bilan strategik yo\'l xaritasi',
      '05 Mediaplanlashtirish va byudjetni kanallar bo\'yicha taqsimlash',
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
      {
        q: 'Нужно ли привлекать команду клиента?',
        a: 'Да, нам важно провести установочные интервью с ключевыми людьми — это ускоряет работу и повышает точность.',
      },
    ],
  },
  {
    slug: 'brand-strategy',
    title: 'Бренд-стратегия',
    title_uz: 'Brend strategiyasi',
    short: 'Строим позиционирование бренда на основе его сути и целей бизнеса.',
    short_uz: 'Brend pozitsiyasini uning mohiyati va biznes maqsadlari asosida quramiz.',
    description:
      'Строим бренд-стратегию на миссии, ценностях, архетипе, голосе, обещании и территории бренда.',
    description_uz:
      'Brend strategiyasini missiya, qadriyatlar, arxetip, ovoz, va\'da va brend hududi asosida quramiz.',
    icon: 'compass',
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
      '01 Kabinet tadqiqoti va brend auditi',
      '02 Brendni pozitsiyalash',
      '03 Brend arxitekturasi',
      '04 Brend platformasi',
      '05 Kommunikatsiya strategiyasi',
    ],
    faq: [
      {
        q: 'Чем бренд-стратегия отличается от маркетинговой?',
        a: 'Маркетинговая стратегия — про каналы и тактики. Бренд-стратегия — про то, кто вы и что вы значите для людей.',
      },
      {
        q: 'Для кого подходит этот продукт?',
        a: 'Для компаний, которые хотят выстроить долгосрочное восприятие: стартапов, ребрендинга или выхода на новые рынки.',
      },
    ],
  },
  {
    slug: 'communication-strategy',
    title: 'Коммуникационная стратегия',
    title_uz: 'Kommunikatsiya strategiyasi',
    short:
      'Формирование характера и отличия каждого суббренда, определение стратегии коммуникаций.',
    short_uz:
      'Har bir subbrend xarakteri va farqini shakllantirish, kommunikatsiya strategiyasini belgilash.',
    description:
      'Формирование архитектуры коммуникаций бренда: ключевые сообщения, tone of voice, контент-стратегию и план активаций по каналам',
    description_uz:
      'Brend kommunikatsiya arxitekturasini shakllantirish: asosiy xabarlar, tone of voice, kontent-strategiya va kanallar bo\'yicha faollashtirish rejasi.',
    icon: 'compass',
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
      '01 Segmentatsiyalangan asosiy xabarlar arxitekturasi',
      '02 Tone of voice kommunikatsiya tamoyillari tizimi sifatida',
      '03 Kontent-strategiya: taqdim etish mantiqi va ruknlar strukturasi',
      '04 Kommunikatsiya kanallari bo\'yicha faollashtirish mediaplani',
    ],
    faq: [
      {
        q: 'Нужна ли уже готовая бренд-платформа?',
        a: 'Желательно, но не обязательно. Мы можем разработать коммуникационную стратегию параллельно с позиционированием.',
      },
      {
        q: 'Включает ли это производство контента?',
        a: 'Стратегия описывает что и как делать, производство — отдельная услуга или часть аутсорс-маркетинга.',
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
    icon: 'megaphone',
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
      '01 Kommunikatsiya auditi va o\'sish nuqtalari diagnostikasi',
      '02 Big Idea va kampaniyaning kreativ platformasi',
      '03 Prodakshn: formatlar va kanallarga moslashtirish',
      '04 Mediastrategiya, byudjet spiliti va xarid qilish',
      '05 Metrikalarni kuzatish va jarayonda optimallashtirish',
    ],
    faq: [
      {
        q: 'На каких площадках работаете?',
        a: 'Instagram, Telegram, YouTube, TikTok, digital OOH — в зависимости от ЦА и бюджета.',
      },
      {
        q: 'Бюджет на рекламу входит в стоимость?',
        a: 'Нет, стоимость услуги — это агентская работа. Медиабюджет согласовывается отдельно.',
      },
    ],
  },
  {
    slug: 'outsource-marketing',
    title: 'Аутсорс-маркетинг',
    title_uz: 'Autsors marketing',
    short: 'Ведение маркетинга полного цикла: контент, SMM, рекламные кампании, аналитика',
    short_uz: 'To\'liq siklli marketing yuritish: kontent, SMM, reklama kampaniyalari, tahlil',
    description:
      'Ведение маркетинга полного цикла: контент, SMM, рекламные кампании, аналитика',
    description_uz:
      'To\'liq siklli marketing yuritish: kontent, SMM, reklama kampaniyalari, tahlil',
    icon: 'chart',
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
      '01 Oylik marketing-reja va vazifalarni ustuvorlashtirish',
      '02 Barcha formatlar va kanallar uchun kontent-prodakshn',
      '03 SMM: nashr etish, komyuniti-menejment, moderatsiya',
      '04 Reklama kampaniyalarini sozlash, ishga tushirish va optimallashtirish',
      '05 Metrikalar va ROI bo\'yicha hisobot berish',
    ],
    faq: [
      {
        q: 'Минимальный срок сотрудничества?',
        a: 'Рекомендуем от 3 месяцев — за это время можно увидеть и зафиксировать результаты.',
      },
      {
        q: 'Сколько человек работает над проектом?',
        a: 'Команда 3–5 специалистов: стратег, контент-менеджер, дизайнер, таргетолог и аккаунт-менеджер.',
      },
      {
        q: 'Как выглядит отчётность?',
        a: 'Ежемесячный дашборд с KPI, выводами и рекомендациями на следующий период.',
      },
    ],
  },
  {
    slug: 'branding',
    title: 'Разработка фирменного стиля',
    title_uz: 'Firma uslubini ishlab chiqish',
    short:
      'Разработка вашего фирменного стиля, полноценной дизайн-системы и брендбука',
    short_uz:
      'Firma uslubingiz, to\'liq dizayn-tizim va brendbukni ishlab chiqish',
    description:
      'Разработка вашего фирменного стиля, полноценной дизайн-системы и брендбука',
    description_uz:
      'Firma uslubingiz, to\'liq dizayn-tizim va brendbukni ishlab chiqish',
    icon: 'pen',
    priceFrom: 10000,
    priceTo: 10000,
    startingPriceUSD: 10000,
    unit: 'project',
    deliverables: [
      'Полный дизайн фирменного стиля: логотип, типографика, цветовая палитра и фирменная графика — с адаптацией под все носители и оформлением в брендбук.',
    ],
    deliverables_uz: [
      '01 Firma uslubining to\'liq dizayni: logotip, tipografika, ranglar palitrasi va firma grafikasi — barcha tashuvchilarga moslashtirilgan holda.',
    ],
    faq: [
      {
        q: 'Сколько концепций предлагаете?',
        a: '3 концепции на этапе логотипа, затем дорабатываем выбранное направление до финального результата.',
      },
      {
        q: 'Что входит в финальные файлы?',
        a: 'Все форматы (AI, PDF, PNG, SVG) с руководством по использованию.',
      },
    ],
  },
]
