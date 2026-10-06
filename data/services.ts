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
    ],
  },
  {
    slug: 'brand-strategy',
    title: 'Бренд-стратегия',
    title_uz: 'Brend-strategiyasi',
    short: 'Строим позиционирование бренда на основе его сути и целей бизнеса.',
    short_uz: 'Biznes maqsadlari va mohiyatiga tayangan holda brend pozitsiyasini quramiz.',
    description:
      'Разработка глубинной бренд-стратегии — от анализа ценностей и платформы бренда до архитектуры и позиционирования на рынке.',
    description_uz:
      'Brend platformasi va qadriyatlarini tahlil qilishdan tortib, arxitektura va bozorda pozitsiyalashgacha chuqur brend-strategiyasini yaratish.',
    icon: 'pen',
    priceFrom: 18000,
    priceTo: 18000,
    startingPriceUSD: 18000,
    unit: 'project',
    deliverables: [
      'Анализ платформы бренда и рыночной ниши',
      'Формирование миссии, ценностей и тональности коммуникации (Tone of Voice)',
      'Стратегия позиционирования и архитектура бренда',
      'Концепция эмоциональной и функциональной ценности',
      'Гайдлайн по внедрению бренд-стратегии в компании',
    ],
    deliverables_uz: [
      '01 Brend platformasi va bozor o\'rnini tahlil qilish',
      '02 Missiya, qadriyatlar va muloqot ohangini (Tone of Voice) shakllantirish',
      '03 Pozitsiyalash strategiyasi va brend arxitekturasi',
      '04 Emotsional va funktsional qiymat kontseptsiyasi',
      '05 Kompaniyada brend-strategiyani joriy etish yo\'riqnomasi',
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
    title_uz: 'Kommunikatsion strategiya',
    short: 'Формирование характера и отличия каждого суббренда, определение стратегии коммуникаций.',
    short_uz: 'Har bir subbrend xarakteri va farqini shakllantirish, kommunikatsiya strategiyasini belgilash.',
    description:
      'Разработка комплексной коммуникационной стратегии для работы со СМИ, инфлюенсерами, клиентами и партнерами.',
    description_uz:
      'OAV, inflyuenserlar, mijozlar va hamkorlar bilan ishlash uchun kompleks kommunikatsiya strategiyasini ishlab chiqish.',
    icon: 'megaphone',
    priceFrom: 10000,
    priceTo: 10000,
    startingPriceUSD: 10000,
    unit: 'project',
    deliverables: [
      'Анализ информационного поля и ключевых каналов связи',
      'Разработка коммуникационной матрицы под целевые сегменты',
      'Формирование ключевых сообщений (Key Messages) и инфоповодов',
      'План интеграций в СМИ, соцсетях и инфлюенс-каналах',
      'Антикризисный регламент и гайдлайны реагирования',
    ],
    deliverables_uz: [
      '01 Axborot maydoni va asosiy aloqa kanallarini tahlil qilish',
      '02 Maqsadli segmentlar uchun kommunikatsiya matritsasini yaratish',
      '03 Asosiy xabarlar (Key Messages) va axborot sabablarini shakllantirish',
      '04 OAV, ijtimoiy tarmoqlar va inflyuenser kanallarida integratsiya rejasi',
      '05 Inqirozga qarshi reglament va javob berish yo\'riqnomalari',
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
    short: 'Создание Big Idea, креативов и запуск мультиканальных рекламных кампаний.',
    short_uz: 'Big Idea, kreativlarni yaratish va ko\'p kanalli reklama kampaniyalarini ishga tushirish.',
    description:
      'Полный цикл создания и проведения рекламных кампаний — от генерации Big Idea и видеопродакшна до настройки медиаканалов и аналитики.',
    description_uz:
      'Reklama kampaniyalarini yaratish va o\'tkazishning to\'liq sikli — Big Idea va video-ishlab chiqarishdan tortib media-kanallarni sozlashgacha.',
    icon: 'chart',
    priceFrom: 8000,
    priceTo: 8000,
    startingPriceUSD: 8000,
    unit: 'project',
    deliverables: [
      'Разработка креативной концепции и Big Idea',
      'Копирайтинг и подготовка визуальных/видео материалов',
      'Настройка таргетированной и контекстной рекламы (Meta, Google, Yandex)',
      'Медиапланирование, закупка и контроль спецпроектов',
      'Сквозная аналитика и оптимизация конверсии',
    ],
    deliverables_uz: [
      '01 Kreativ kontseptsiya va Big Idea yaratish',
      '02 Kopirayting va vizual/video materiallarni tayyorlash',
      '03 Maqsadli va kontekstli reklamani sozlash (Meta, Google, Yandex)',
      '04 Mediaplanlashtirish, maxsus loyihalarni sotib olish va nazorat qilish',
      '05 Tahlil va konversiyani optimallashtirish',
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
    title_uz: 'Autsors-marketing',
    short: 'Команда маркетинга под ключ для управления всеми процессами продвижения.',
    short_uz: 'Barcha targ\'ibot jarayonlarini boshqarish uchun tayyor marketing jamoasi.',
    description:
      'Полный аутсорсинг маркетинга компании: стратегический контроль, дизайн, таргет, SMM и аналитика в одном окне.',
    description_uz:
      'Kompaniya marketingining to\'liq autsorsingi: strategik nazorat, dizayn, maqsadli reklama, SMM va tahlil bir joyda.',
    icon: 'compass',
    priceFrom: 0,
    priceTo: 0,
    startingPriceUSD: 0,
    priceOnRequest: true,
    onRequest: true,
    unit: 'month',
    deliverables: [
      'Выделенная команда маркетологов, стратегов и дизайнеров',
      'Управление всеми маркетинговыми процессами компании под ключ',
      'Еженедельный спринт-план и регулярная отчётность',
      'Оптимизация рекламных бюджетов и повышение ROI',
      'Гибкое масштабирование ресурсов под задачи бизнеса',
    ],
    deliverables_uz: [
      '01 Marketing bo\'yicha mutaxassislar, strateglar va dizaynerlar jamoasi',
      '02 Kompaniyaning barcha marketing jarayonlarini to\'liq boshqarish',
      '03 Har haftalik sprint-reja va muntazam hisobotlar',
      '04 Reklama byudjetlarini optimallashtirish va ROI ni oshirish',
      '05 Biznes vazifalariga mos ravishda resurslarni moslashuvchan kengaytirish',
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
    title_uz: 'Korporativ uslubni ishlab chiqish',
    short: 'Создание айдентики, логотипа, брендбука и всех точек контакта бренда.',
    short_uz: 'Ayniyat, logotip, brendbuk va brendning barcha aloqa nuqtalarini yaratish.',
    description:
      'Разработка уникального фирменного стиля, логотипа, гайдбука и адаптация визуального языка на все фирменные носители.',
    description_uz:
      'Unikal korporativ uslub, logotip, brendbukni ishlab chiqish va vizual tilni barcha korporativ tashuvchilarga moslashtirish.',
    icon: 'pen',
    priceFrom: 10000,
    priceTo: 10000,
    startingPriceUSD: 10000,
    unit: 'project',
    deliverables: [
      'Создание логотипа и вариантов его использования',
      'Цветовая палитра, типографика и паттерны',
      'Дизайн базовых фирменных носителей (визитки, бланки, мерч)',
      'Разработка гайдбука / брендбука (Brand Guidelines)',
      'Подготовка исходников для печати и digital-каналов',
    ],
    deliverables_uz: [
      '01 Logotip va undan foydalanish variantlarini yaratish',
      '02 Ranglar palitrasi, tipografika va naqshlar',
      '03 Asosiy korporativ tashuvchilar dizayni (tashrif qog\'ozlari, blankalar, merch)',
      '04 Brendbuk / yo\'riqnomalarni ishlab chiqish (Brand Guidelines)',
      '05 Bosma va digital kanallar uchun manbalarni tayyorlash',
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
