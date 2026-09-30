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
    ],
  },
  {
    slug: 'brand-strategy',
    title: 'Брендинг и айдентика',
    title_uz: 'Brending va ayniyat',
    short: 'Разработка визуальной идентификации бренда: логотип, фирменный стиль, гайдлайн и носители.',
    short_uz: 'Brend vizual identifikasiyasini ishlab chiqish: logotip, brendbuk va korporativ uslub.',
    description:
      'Разработка визуальной идентификации бренда — от платформы бренда и нейминга до логотипа, дизайн-системы, гайдлайнов и фирменных носителей.',
    description_uz:
      'Brend vizual identifikasiyasini ishlab chiqish — brend platformasi va neymingdan tortib, logotip, dizayn-tizim va brendbukgacha.',
    icon: 'pen',
    priceFrom: 6000,
    priceTo: 6000,
    startingPriceUSD: 6000,
    unit: 'project',
    deliverables: [
      'Анализ конкурентного окружения и платформа бренда',
      'Разработка нейминга, слогана и системы смыслов',
      'Создание логотипа и концепций визуальной айдентики',
      'Разработка полноценного брендбука и гайдлайнов (Brand Guidelines)',
      'Дизайн ключевых фирменных носителей и упаковки',
    ],
    deliverables_uz: [
      '01 Raqobatchilar muhitini tahlil qilish va brend platformasi',
      '02 Neyming, shior va ma\'nolar tizimini yaratish',
      '03 Logotip va vizual ayniyat konseptsiyalarini ishlab chiqish',
      '04 Mukammal brendbuk va yo\'riqnomalarni yaratish',
      '05 Asosiy korporativ tashuvchilar va qadoqlash dizayni',
    ],
    faq: [
      {
        q: 'Сколько концепций логотипа вы предоставляете?',
        a: 'Мы предоставляем 3 уникальные концепции с полной визуализацией на носителях.',
      },
      {
        q: 'Входит ли регистрация товарного знака?',
        a: 'Мы проводим первичную проверку патентоспособности нейминга совместно с патентными поверенными.',
      },
    ],
  },
  {
    slug: 'web-development',
    title: 'Веб-разработка',
    title_uz: 'Veb-dasturlash',
    short: 'Создание современных высококонверсионных веб-сайтов и цифровых сервисов.',
    short_uz: 'Zamonaviy va yuqori konversiyali veb-saytlar va raqamli xizmatlarni yaratish.',
    description:
      'Проектирование и разработка корпоративных сайтов, веб-приложений и интернет-магазинов с акцентом на премиальный UX/UI дизайн и высокую скорость.',
    description_uz:
      'Mukammal UX/UI dizayn va yuqori tezlikka ega korporativ saytlar, veb-ilovalar va internet-do\'konlarni loyihalash va ishlab chiqish.',
    icon: 'chart',
    priceFrom: 5000,
    priceTo: 5000,
    startingPriceUSD: 5000,
    unit: 'project',
    deliverables: [
      'Проектирование UX-прототипов и CJM пользователей',
      'Разработка уникального премиального UI-дизайна',
      'Адаптивная фронтенд-верстка (Next.js / React)',
      'Интеграция с CMS, CRM и базами данных (Supabase)',
      'SEO-оптимизация, тестирование и запуск',
    ],
    deliverables_uz: [
      '01 UX-prototiplar va foydalanuvchi CJM ni loyihalash',
      '02 Unikal premium UI-dizaynni ishlab chiqish',
      '03 Adaptiv frontend-verstka (Next.js / React)',
      '04 CMS, CRM va ma\'lumotlar bazasi (Supabase) integratsiyasi',
      '05 SEO-optimallashtirish, sinovdan o\'tkazish va ishga tushirish',
    ],
    faq: [
      {
        q: 'На каком стеке вы разрабатываете сайты?',
        a: 'Мы используем React, Next.js, TailwindCSS и Supabase для создания быстрых и безопасных сервисов.',
      },
      {
        q: 'Адаптирован ли сайт для мобильных устройств?',
        a: 'Да, все наши веб-сайты имеют 100% адаптивную верстку и высокую скорость загрузки на смартфонах.',
      },
    ],
  },
  {
    slug: 'smm-promotion',
    title: 'SMM & Контент',
    title_uz: 'SMM va Kontent',
    short: 'Комплексное ведение соцсетей — от контент-стратегии до визуала и таргета.',
    short_uz: 'Ijtimoiy tarmoqlarni kompleks yuritish — kontent-strategiyadan vizual va maqsadli reklamagacha.',
    description:
      'Комплексное продвижение бренда в соцсетях (Instagram, Telegram, LinkedIn): создание контента, фото/видео съёмки, таргетированная реклама и модерация.',
    description_uz:
      'Ijtimoiy tarmoqlarda brendni kompleks targ\'ib qilish: kontent yaratish, foto/video suratga olish, maqsadli reklama va moderatsiya.',
    icon: 'megaphone',
    priceFrom: 2500,
    priceTo: 2500,
    startingPriceUSD: 2500,
    unit: 'month',
    deliverables: [
      'Разработка SMM-стратегии и тональности (Tone of Voice)',
      'Составление ежемесячного контент-плана и рубрикатора',
      'Продакшн визуала: фотосессии, Reels и графика',
      'Настройка и ведение таргетированной рекламы',
      'Ежемесячная аналитика, модерация и отчётность',
    ],
    deliverables_uz: [
      '01 SMM-strategiya va muloqot ohangini (Tone of Voice) ishlab chiqish',
      '02 Oylik kontent-rejasi va ruknlarni tuzish',
      '03 Vizual produktsiya: fotosessiyalar, Reels va grafika',
      '04 Maqsadli reklamani sozlash va yuritish',
      '05 Oylik tahlil, moderatsiya va hisobot berish',
    ],
    faq: [
      {
        q: 'Минимальный срок договора на SMM?',
        a: 'Минимальный период работы по SMM составляет 3 месяца.',
      },
      {
        q: 'Входит ли съёмочная команда в стоимость?',
        a: 'Да, наш продакшн выезжает на съёмки регулярного Reels и фото контента.',
      },
    ],
  },
  {
    slug: 'media-production',
    title: 'Media Production & Видео',
    title_uz: 'Media Produktsiya va Video',
    short: 'Полный цикл видеопроизводства — от креативного сценария до съемок и монтажа.',
    short_uz: 'Video ishlab chiqarishning to\'liq sikli — senariydan suratga olish va montajgacha.',
    description:
      'Создание имиджевых видеороликов, рекламных видео, продуктового контента и 3D-анимации под ключ любой сложности.',
    description_uz:
      'Imijli roliklar, reklama videolari, mahsulot kontenti va 3D-animatsiyalarni to\'liq tayyor holda yaratish.',
    icon: 'compass',
    priceFrom: 0,
    priceTo: 0,
    startingPriceUSD: 0,
    priceOnRequest: true,
    onRequest: true,
    unit: 'project',
    deliverables: [
      'Креативный концепт и тритмент ролика',
      'Написание сценария и раскадровка (Storyboarding)',
      'Организация съемочного процесса (кастинг, локации, команда)',
      'Пост-продакшн: монтаж, цветкоррекция, SFX и моушн-дизайн',
      'Адаптация под все медиаформаты и платформы',
    ],
    deliverables_uz: [
      '01 Rolikning kreativ kontseptsiyasi va tritmenti',
      '02 Senariy va kadrlar rejasini yozish (Storyboarding)',
      '03 Suratga olish jarayonini tashkillashtirish (kasting, joylar, jamoa)',
      '04 Post-produktsiya: montaj, rang berish, SFX va moushn-dizayn',
      '05 Barcha media formatlar va platformalarga moslashtirish',
    ],
    faq: [
      {
        q: 'От чего зависит стоимость видеопроизводства?',
        a: 'Стоимость рассчитывается индивидуально в зависимости от масштаба съемок, съёмочной группы, локаций и сложностей графика.',
      },
    ],
  },
  {
    slug: 'communication-strategy',
    title: 'PR & Коммуникации',
    title_uz: 'PR va Kommunikatsiyalar',
    short: 'Управление репутацией бренда, работа со СМИ, инфлюенсерами и PR-ивенты.',
    short_uz: 'Brend obro\'sini boshqarish, OAV va inflyuenserlar bilan ishlash va PR-tadbirlar.',
    description:
      'Формирование публичного имиджа компании: интеграции у блогеров, публикации в ведущих СМИ, антикризисный PR и организация спецпроектов.',
    description_uz:
      'Kompaniyaning ommaviy imidjini shakllantirish: blogerlar bilan integratsiya, OAVda nashrlar, inqirozga qarshi PR va maxsus loyihalar.',
    icon: 'megaphone',
    priceFrom: 4000,
    priceTo: 4000,
    startingPriceUSD: 4000,
    unit: 'project',
    deliverables: [
      'Разработка PR-стратегии и позиционирования в инфополе',
      'Написание пресс-релизов, статей и питчинг в ключевые СМИ',
      'Инфлюенс-маркетинг: подбор, закупка и контроль блогеров',
      'Антикризисный PR и мониторинг упоминаний бренда',
      'Организация пресс-мероприятий и презентаций',
    ],
    deliverables_uz: [
      '01 PR-strategiya va axborot maydonida pozitsiyalashni ishlab chiqish',
      '02 Press-relizlar, maqolalar yozish va yetakchi OAVga taqdim etish',
      '03 Inflyuenser-marketing: tanlash, sotib olish va nazorat qilish',
      '04 Inqirozga qarshi PR va brend haqidagi eslatmalarni monitoring qilish',
      '05 Matbuot tadbirlari va taqdimotlarni tashkillashtirish',
    ],
    faq: [
      {
        q: 'Входит ли закупка публикаций в СМИ в стоимость?',
        a: 'Стоимость услуги включает написание и питчинг материалов. Бюджет на коммерческие размещения согласовывается отдельно.',
      },
    ],
  },
]
