import { ref, watch } from "vue";

export type Locale = "uz" | "ru" | "en";

const uz = {
  // Navigation
  "nav.home": "Bosh sahifa",
  "nav.about": "Men haqimda",
  "nav.experience": "Tajriba",
  "nav.projects": "Loyihalar",
  "nav.contact": "Aloqa",

  // Aria / UI labels
  "a11y.home": "Bosh sahifaga o'tish",
  "a11y.menu": "Menyuni ochish/yopish",
  "a11y.lang": "Tilni tanlash",

  // Sidebar
  "role": "Full-Stack Developer",
  "side.contact": "Aloqa",
  "side.direction": "Yo'nalish",
  "side.telefon": "Telefon",
  "side.manzil": "Manzil",
  "dir1": "Full-Stack web dasturlash",
  "dir2": "Backend va API dasturlash",
  "dir3": "CRM tizimlari",
  "dir4": "Telegram botlar",

  // About
  "about.title": "Men Haqimda",
  "about.text":
    "Amaliy tajribaga ega Full-Stack Developer. Python, Django, JavaScript va Vue.js asosida web-ilovalar yaratishga qiziqaman. Foydalanuvchiga qulay, tartibli va ishonchli tizimlar ishlab chiqishga e'tibor beraman. CRM va Telegram bot integratsiyalari ustida ishlashga yo'naltirilganman.",
  "about.hl1": "Python • Django backend",
  "about.hl2": "JavaScript • Vue.js frontend",
  "about.hl3": "CRM va Telegram bot integratsiyasi",

  // Experience
  "exp.title": "Ish Tajribasi",
  "exp.role": "Dasturchi",
  "exp.duration": "3 oy",
  "exp.text":
    "O'quv markazi uchun CRM loyihasini ishlab chiqishda ishtirok etdim. Tizimning web funksiyalari va asosiy imkoniyatlarini yaratishda Full-Stack texnologiyalaridan foydalandim.",
  "exp.projectTitle": "Asosiy Loyiha",
  "exp.projectName": "O'quv markazi CRM tizimi",
  "exp.projectText":
    "O'quv markazi faoliyatini boshqarish uchun ishlab chiqilgan CRM tizimi. Python/Django backend, Vue.js frontend va Telegram bot integratsiyasi ishlatilgan.",

  // Skills
  "skills.title": "Texnik Ko'nikmalar",
  "skills.backend": "Backend",
  "skills.frontend": "Frontend",
  "skills.integration": "Integratsiya",
  "skills.techsTitle": "Texnologiyalar",

  // Projects
  "projects.title": "Loyihalar",
  "projects.p1.desc": "Maktab uchun zamonaviy va interaktiv veb-sayt.",
  "projects.p2.desc": "Mahsulotlar namoyishi uchun onlayn do'kon sahifasi.",
  "projects.p3.desc":
    "Shokolad brendi uchun chiroyli va ta'sirchan landing page.",

  // Contact
  "contact.title": "Aloqa",
  "contact.intro":
    "Hamkorlik, savollar yoki takliflar uchun men bilan bog'lanishingiz mumkin — doim aloqaga chiqishga tayyorman!",

  // Footer
  "footer.top": "Yuqoriga",
} as const;

type MessageKey = keyof typeof uz;

const ru: Record<MessageKey, string> = {
  "nav.home": "Главная",
  "nav.about": "Обо мне",
  "nav.experience": "Опыт",
  "nav.projects": "Проекты",
  "nav.contact": "Контакты",

  "a11y.home": "Перейти на главную",
  "a11y.menu": "Открыть/закрыть меню",
  "a11y.lang": "Выбрать язык",

  "role": "Full-Stack разработчик",
  "side.contact": "Контакты",
  "side.direction": "Направления",
  "side.telefon": "Телефон",
  "side.manzil": "Адрес",
  "dir1": "Full-Stack веб-разработка",
  "dir2": "Backend и API разработка",
  "dir3": "CRM-системы",
  "dir4": "Telegram-боты",

  "about.title": "Обо мне",
  "about.text":
    "Full-Stack разработчик с практическим опытом. Мне интересно создавать веб-приложения на Python, Django, JavaScript и Vue.js. Уделяю внимание разработке удобных, аккуратных и надёжных систем. Сосредоточен на интеграциях CRM и Telegram-ботов.",
  "about.hl1": "Бэкенд: Python • Django",
  "about.hl2": "Фронтенд: JavaScript • Vue.js",
  "about.hl3": "Интеграция CRM и Telegram-ботов",

  "exp.title": "Опыт работы",
  "exp.role": "Разработчик",
  "exp.duration": "3 месяца",
  "exp.text":
    "Участвовал в разработке CRM-системы для учебного центра. Создавал веб-функционал и основные возможности системы с использованием Full-Stack технологий.",
  "exp.projectTitle": "Главный проект",
  "exp.projectName": "CRM-система учебного центра",
  "exp.projectText":
    "CRM-система для управления деятельностью учебного центра. Использованы Python/Django на бэкенде, Vue.js на фронтенде и интеграция Telegram-бота.",

  "skills.title": "Технические навыки",
  "skills.backend": "Бэкенд",
  "skills.frontend": "Frontend",
  "skills.integration": "Интеграция",
  "skills.techsTitle": "Технологии",

  "projects.title": "Проекты",
  "projects.p1.desc": "Современный интерактивный сайт для школы.",
  "projects.p2.desc": "Страница интернет-магазина для показа товаров.",
  "projects.p3.desc":
    "Красивый эффектный лендинг для шоколадного бренда.",

  "contact.title": "Контакты",
  "contact.intro":
    "Свяжитесь со мной по поводу сотрудничества, вопросов или предложений — я всегда открыт к общению!",

  "footer.top": "Наверх",
};

const en: Record<MessageKey, string> = {
  "nav.home": "Home",
  "nav.about": "About",
  "nav.experience": "Experience",
  "nav.projects": "Projects",
  "nav.contact": "Contact",

  "a11y.home": "Go to home",
  "a11y.menu": "Toggle menu",
  "a11y.lang": "Choose language",

  "role": "Full-Stack Developer",
  "side.contact": "Contact",
  "side.direction": "Focus Areas",
  "side.telefon": "Phone",
  "side.manzil": "Location",
  "dir1": "Full-Stack web development",
  "dir2": "Backend & API development",
  "dir3": "CRM systems",
  "dir4": "Telegram bots",

  "about.title": "About Me",
  "about.text":
    "Full-Stack Developer with hands-on experience. I enjoy building web applications with Python, Django, JavaScript and Vue.js. I care about crafting user-friendly, well-structured and reliable systems, and I focus on CRM and Telegram bot integrations.",
  "about.hl1": "Python • Django backend",
  "about.hl2": "JavaScript • Vue.js frontend",
  "about.hl3": "CRM & Telegram bot integrations",

  "exp.title": "Work Experience",
  "exp.role": "Developer",
  "exp.duration": "3 months",
  "exp.text":
    "I took part in building a CRM system for a training center, developing its web features and core functionality with Full-Stack technologies.",
  "exp.projectTitle": "Main Project",
  "exp.projectName": "Training Center CRM",
  "exp.projectText":
    "A CRM system built to manage the day-to-day work of a training center, using a Python/Django backend, a Vue.js frontend and Telegram bot integration.",

  "skills.title": "Technical Skills",
  "skills.backend": "Backend",
  "skills.frontend": "Frontend",
  "skills.integration": "Integration",
  "skills.techsTitle": "Technologies",

  "projects.title": "Projects",
  "projects.p1.desc": "A modern, interactive website for a school.",
  "projects.p2.desc": "An online store page for showcasing products.",
  "projects.p3.desc":
    "A beautiful, eye-catching landing page for a chocolate brand.",

  "contact.title": "Contact",
  "contact.intro":
    "Feel free to reach out about collaboration, questions or opportunities — I'm always happy to connect!",

  "footer.top": "Back to top",
};

const messages: Record<Locale, Record<MessageKey, string>> = { uz, ru, en };

export const SUPPORTED_LOCALES: Locale[] = ["uz", "ru", "en"];

const STORAGE_KEY = "portfolio-locale";

function loadSaved(): Locale {
  if (typeof window === "undefined") return "uz";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "uz" || saved === "ru" || saved === "en") return saved;
  } catch {
    /* localStorage unavailable — fall back to default */
  }
  return "uz";
}

export const locale = ref<Locale>(loadSaved());

// Til almashtirish fazasi: "out" — eski til matni so'nadi, "in" — yangisi
// matn elementlarida paydo bo'ladi (App.vue uchun `.lang-out`/`.lang-in`).
export const localePhase = ref<"idle" | "out" | "in">("idle");

let phaseTimer: number | undefined;

export function setLocale(next: Locale) {
  // Jarayon ketayotgan bo'lmasa va til o'zgarmagan bo'lsa — hech narsa qilmaymiz.
  if (next === locale.value && localePhase.value === "idle") return;
  // Tez-tez bosilsa — avvalgi faza bekor qilinadi, oxirgi tanlov ishlaydi.
  if (phaseTimer !== undefined) window.clearTimeout(phaseTimer);

  localePhase.value = "out";
  phaseTimer = window.setTimeout(() => {
    locale.value = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore persistence errors */
    }
    localePhase.value = "in";
    phaseTimer = window.setTimeout(() => {
      localePhase.value = "idle";
    }, 700);
  }, 200);
}

/** Reactive lookup — safe to call directly inside templates. */
export function t(key: string): string {
  const table = messages[locale.value] as Record<string, string> | undefined;
  return table?.[key] ?? messages.uz[key as MessageKey] ?? key;
}

// Keep <html lang> and the document title in sync with the locale.
const meta: Record<Locale, { lang: string; title: string }> = {
  uz: { lang: "uz", title: "Abdulroufjon | Full-Stack Developer" },
  ru: { lang: "ru", title: "Абдулруфжон | Full-Stack разработчик" },
  en: { lang: "en", title: "Abdulroufjon | Full-Stack Developer" },
};

watch(
  locale,
  (value) => {
    document.documentElement.lang = meta[value].lang;
    document.title = meta[value].title;
  },
  { immediate: true },
);