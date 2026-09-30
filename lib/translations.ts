import type { Language } from './context/LanguageContext'

export const translations = {
  ru: {
    nav: {
      cases: 'Кейсы',
      services: 'Услуги',
      about: 'О нас',
      blog: 'Блог',
      talks: 'KUCH Talks',
      contact: 'Контакты',
      brief: 'Онлайн Бриф',
      apply: 'Оставить заявку',
    },
    hero: {
      tag: 'Маркетинговое агентство полного цикла',
      heading: 'МЫ НЕ БОИМСЯ СЛОЖНОГО',
      subheading: 'Разрабатываем стратегии, запускаем бренды и масштабируем бизнес в Узбекистане и Центральной Азии.',
    },
    team: {
      title: 'Наша команда',
      desc: 'Эксперты, а не исполнители. Каждый отвечает за результат, а не за процесс.',
    },
    cases: {
      tag: 'Кейсы',
      title: 'В каждом бренде —',
      allCases: 'Все кейсы',
      published: 'Опубликован',
      draft: 'Черновик',
    },
    talks: {
      tag: 'KUCH TALKS',
      badge: 'СКОРО...',
      desc: 'KUCH Talks — разговоры о том, как строится сильный бренд, от людей, которые это делают.',
      allTalks: 'Все выпуски',
    },
    services: {
      tag: 'Услуги',
      title: 'Что мы делаем',
      desc: 'Полный цикл — от стратегии до запуска. Шесть направлений, один результат.',
      priceOnRequest: 'Под запрос',
      hourlyRate: 'Каждый проект тарифицируется по часам',
    },
    contact: {
      tag: 'Старт',
      title: 'Расскажите задачу — сделаем',
      desc: 'Заполните онлайн-бриф за пару минут или оставьте заявку — мы свяжемся и предложим решение.',
      formTitle: 'Оставить заявку',
      formDesc: 'Коротко о проекте — остальное обсудим лично.',
      email: 'Email',
      phone: 'Телефон',
      address: 'Адрес',
      socials: 'Соцсети',
    },
    footer: {
      motto: 'Маркетинговое агентство полного цикла. МЫ НЕ БОИМСЯ СЛОЖНОГО.',
      nav: 'Навигация',
      services: 'Услуги',
      contacts: 'Контакты',
      rights: 'Все права защищены.',
      privacy: 'Политика конфиденциальности',
    },
  },
  uz: {
    nav: {
      cases: 'Loyiha va Кейслар',
      services: 'Xizmatlar',
      about: 'Biz haqimizda',
      blog: 'Blog',
      talks: 'KUCH Talks',
      contact: 'Kontaktlar',
      brief: 'Onlayn Brif',
      apply: 'Ariza qoldirish',
    },
    hero: {
      tag: 'Kompleks marketing agentligi',
      heading: 'BIZ MURAKKAB NARSALARDAN QO‘RQMAYMIZ',
      subheading: "O'zbekiston va Markaziy Osiyoda strategiyalarni ishlab chiqamiz, brendlarni yo'lga qo'yamiz va biznesni kengaytiramiz.",
    },
    team: {
      title: 'Bizning jamoa',
      desc: 'Mutaxassislar, shunchaki ijrochilar emas. Har bir kishi jarayon uchun emas, natija uchun javobgardir.',
    },
    cases: {
      tag: 'Loyihalar',
      title: 'Har bir brendda —',
      allCases: 'Barcha loyihalar',
      published: 'Chop etilgan',
      draft: 'Qoralama',
    },
    talks: {
      tag: 'KUCH TALKS',
      badge: 'TEZ ORADA...',
      desc: 'KUCH Talks — kuchli brend qanday qurilishi haqida ushbu ishni qilayotgan insonlar bilan suhbatlar.',
      allTalks: 'Barcha sonlar',
    },
    services: {
      tag: 'Xizmatlar',
      title: 'Biz nima qilamiz',
      desc: 'Kompleks yondashuv — strategiyadan ishga tushirishgacha. Olti yo‘nalish, yagona natija.',
      priceOnRequest: "So'rov bo'yicha",
      hourlyRate: 'Har bir loyiha soatbay baholanadi',
    },
    contact: {
      tag: 'Boshlash',
      title: 'Vazifani aytib bering — bajaramiz',
      desc: "Bir necha daqiqada onlayn-brifni to'ldiring yoki ariza qoldiring — biz bog'lanib, yechim taklif etamiz.",
      formTitle: 'Ariza qoldirish',
      formDesc: 'Loyiha haqida qisqacha — qolganini shaxsan muhokama qilamiz.',
      email: 'Email',
      phone: 'Telefon',
      address: 'Manzil',
      socials: 'Ijtimoiy tarmoqlar',
    },
    footer: {
      motto: 'Kompleks marketing agentligi. BIZ MURAKKAB NARSALARDAN QO‘RQMAYMIZ.',
      nav: 'Navigatsiya',
      services: 'Xizmatlar',
      contacts: 'Kontaktlar',
      rights: 'Barcha huquqlar himoyalangan.',
      privacy: 'Maxfiylik siyosati',
    },
  },
}

export function useTranslation(lang: Language) {
  return translations[lang] || translations.ru
}
