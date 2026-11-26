import { PATHS } from '@/routes/paths';

export type SearchLanguage = 'az' | 'en' | 'ru';

export type SearchItemCategory =
  | 'experts'
  | 'articles'
  | 'blog'
  | 'news'
  | 'trainings'
  | 'pages';

export interface LocalizedText {
  az: string;
  en: string;
  ru: string;
}

export interface QuickSearchTerm {
  id: string;
  label: LocalizedText;
}

export interface SearchResultItem {
  id: string;
  category: SearchItemCategory;
  title: LocalizedText;
  description: LocalizedText;
  path: string;
  scrollId?: string;
  icon: string;
  keywords?: string[];
  popular?: boolean;
}

/**
 * Quick search pills displayed beneath the search input.
 * Clicking a pill fills the search bar and immediately searches that term.
 */
export const QUICK_SEARCH_TERMS: QuickSearchTerm[] = [
  {
    id: 'vr',
    label: { az: 'VR', en: 'VR', ru: 'VR' },
  },
  {
    id: 'stress',
    label: { az: 'Stress', en: 'Stress', ru: 'Стресс' },
  },
  {
    id: 'meditation',
    label: { az: 'Meditasiya', en: 'Meditation', ru: 'Медитация' },
  },
  {
    id: 'psychologist',
    label: { az: 'Psixoloq', en: 'Psychologist', ru: 'Психолог' },
  },
];

/**
 * Curated static dataset for the navbar universal search popup.
 * Serves as the temporary client-side source until the backend universal
 * search controller is available.
 */
export const STATIC_SEARCH_ITEMS: SearchResultItem[] = [
  // ── Popular Blogs & News (shown by default when input is empty) ──
  {
    id: 'blog-vr-immersion',
    category: 'blog',
    title: {
      az: 'İmmersiyanın Elmi: Niyə VR Beyni İnanır?',
      en: 'The Science of Immersion: Why the Brain Believes VR',
      ru: 'Наука иммерсии: почему мозг верит VR?',
    },
    description: {
      az: 'Virtual mühitin sinir sistemimizə təsiri və beynin rəqəmsal stimullara reaksiyaları.',
      en: 'How virtual environments influence the nervous system and brain responses.',
      ru: 'Влияние виртуальной среды на нервную систему и реакции мозга.',
    },
    path: `${PATHS.BLOG}/1`,
    icon: 'lucide:pen-line',
    keywords: ['vr', 'blog', 'beyin', 'brain', 'immersion', 'мозг'],
    popular: true,
  },
  {
    id: 'blog-vr-meditation',
    category: 'blog',
    title: {
      az: 'VR Meditasiya Texnikaları: Daxili Sükut',
      en: 'VR Meditation Techniques: Inner Stillness',
      ru: 'Техники VR-медитации: внутренний покой',
    },
    description: {
      az: 'Stresslə mübarizə üçün virtual mühitlərin təqdim etdiyi effektiv meditasiya üsulları.',
      en: 'Effective meditation practices in virtual environments to ease daily stress.',
      ru: 'Эффективные методы медитации в виртуальной среде для снятия стресса.',
    },
    path: `${PATHS.BLOG}/2`,
    icon: 'lucide:pen-line',
    keywords: ['meditasiya', 'meditation', 'медитация', 'vr', 'stress', 'стресс', 'sakitlik'],
    popular: true,
  },
  {
    id: 'news-consultations',
    category: 'news',
    title: {
      az: 'Platformamızda yeni konsultasiya xidmətləri aktivləşdi',
      en: 'New consultation services are now live on NexusMind',
      ru: 'На платформе запущены новые консультационные услуги',
    },
    description: {
      az: 'Terapevtik xidmətlərin əlçatanlığını artırmaq üçün yeni elanlar və rəqəmsal dəstək paketləri.',
      en: 'New digital support packages and expanded consultation services.',
      ru: 'Новые пакеты цифровой поддержки и расширенные терапевтические консультации.',
    },
    path: `${PATHS.NEWS}/2`,
    icon: 'lucide:newspaper',
    keywords: ['xəbər', 'news', 'новости', 'konsultasiya', 'consultation', 'psixoloq'],
    popular: true,
  },

  // ── Additional Static Items (searchable by query / quick search) ──
  {
    id: 'news-internship',
    category: 'news',
    title: {
      az: 'Yay Təcrübə Proqramı üçün qeydiyyat başladı',
      en: 'Registration is open for the Summer Internship Program',
      ru: 'Открыта регистрация на Летнюю программу стажировки',
    },
    description: {
      az: 'Gənc psixoloqlar və tələbələr üçün təcrübəli mentorlarla yay təcrübə proqramı.',
      en: 'Hands-on summer internship program with experienced mentors for students and psychologists.',
      ru: 'Летняя стажировка с опытными менторами для студентов и начинающих психологов.',
    },
    path: `${PATHS.NEWS}/3`,
    icon: 'lucide:newspaper',
    keywords: ['təcrübə', 'internship', 'стажировка', 'news', 'xəbərlər', 'psixoloq'],
  },
  {
    id: 'expert-selvi',
    category: 'experts',
    title: {
      az: 'Səlvi Əliyeva — Klinik Psixoloq',
      en: 'Selvi Aliyeva — Clinical Psychologist',
      ru: 'Сельви Алиева — Клинический психолог',
    },
    description: {
      az: 'Fərdi konsultasiya, stress idarəetməsi və mindfulness terapiyası.',
      en: 'Individual consultations, stress management, and mindfulness therapy.',
      ru: 'Индивидуальные консультации, управление стрессом и майндфулнесс-терапия.',
    },
    path: `${PATHS.EXPERTS}/1`,
    icon: 'lucide:user-round',
    keywords: ['psixoloq', 'psychologist', 'психолог', 'stress', 'стресс', 'mindfulness', 'cbt'],
  },
  {
    id: 'expert-murad',
    category: 'experts',
    title: {
      az: 'Murad Həsənov — Koqnitiv-Davranış Terapevti',
      en: 'Murad Hasanov — CBT Therapist',
      ru: 'Мурад Гасанов — КПТ-терапевт',
    },
    description: {
      az: 'Təşviş pozuntuları, depressiya və panik atakların idarə olunması.',
      en: 'Anxiety disorders, depression, and panic attack support.',
      ru: 'Тревожные расстройства, депрессия и панические атаки.',
    },
    path: `${PATHS.EXPERTS}/2`,
    icon: 'lucide:user-round',
    keywords: ['psixoloq', 'psychologist', 'психолог', 'kdt', 'cbt', 'anxiety', 'təşviş', 'depressiya'],
  },
  {
    id: 'article-vr-trauma',
    category: 'articles',
    title: {
      az: 'VR Terapiyasının Travma Müalicəsində Effektivliyi',
      en: 'Effectiveness of VR Therapy in Trauma Treatment',
      ru: 'Эффективность VR-терапии в лечении травм',
    },
    description: {
      az: 'Virtual reallıq texnologiyalarının post-travmatik stress reabilitasiyasında nəticələri.',
      en: 'Clinical outcomes of virtual reality technologies in post-traumatic stress rehabilitation.',
      ru: 'Клинические результаты применения виртуальной реальности при реабилитации ПТСР.',
    },
    path: `${PATHS.ARTICLE}/1`,
    icon: 'lucide:book-open',
    keywords: ['vr', 'travma', 'trauma', 'stress', 'стресс', 'terapiya', 'məqalə'],
  },
  {
    id: 'training-meditation',
    category: 'trainings',
    title: {
      az: 'Affirmasiya və Meditasiya Texnikaları',
      en: 'Affirmation and Meditation Techniques',
      ru: 'Техники аффирмации и медитации',
    },
    description: {
      az: 'Gündəlik zehni rahatlama və fokus praktikası üzrə əyani təlim.',
      en: 'In-person workshop on daily mental relaxation and focus habits.',
      ru: 'Очный тренинг по практикам ежедневного расслабления и фокуса.',
    },
    path: PATHS.TRAININGS,
    icon: 'lucide:graduation-cap',
    keywords: ['təlim', 'training', 'тренинг', 'meditasiya', 'meditation', 'медитация'],
  },
  {
    id: 'training-stress',
    category: 'trainings',
    title: {
      az: 'Stress İdarəetməsi Təlimi',
      en: 'Stress Management Workshop',
      ru: 'Тренинг по управлению стрессом',
    },
    description: {
      az: 'Stress faktorlarını tanımaq və sağlam mübarizə strategiyaları qurmaq.',
      en: 'Identify everyday stress triggers and build sustainable coping strategies.',
      ru: 'Распознавание факторов стресса и выработка здоровых стратегий адаптации.',
    },
    path: PATHS.TRAININGS,
    icon: 'lucide:graduation-cap',
    keywords: ['stress', 'стресс', 'təlim', 'training', 'тренинг'],
  },
  {
    id: 'page-vr',
    category: 'pages',
    title: {
      az: 'VR Konsultasiya',
      en: 'VR Consultation',
      ru: 'VR-консультация',
    },
    description: {
      az: 'Evdən çıxmadan immersiv virtual reallıq mühitində psixoloji konsultasiya.',
      en: 'Immersive virtual reality psychological consultations from home.',
      ru: 'Психологические консультации в виртуальной среде из дома.',
    },
    path: `${PATHS.HOME}#vr`,
    scrollId: 'vr',
    icon: 'lucide:glasses',
    keywords: ['vr', 'virtual', 'konsultasiya', 'consultation', 'консультация'],
  },
  {
    id: 'page-about',
    category: 'pages',
    title: {
      az: 'NexusMind — Haqqımızda',
      en: 'NexusMind — About Us',
      ru: 'NexusMind — О нас',
    },
    description: {
      az: 'Missiyamız, dəyərlərimiz və peşəkar komandamız haqqında.',
      en: 'Learn about our mission, values, and professional team.',
      ru: 'Подробнее о нашей миссии, ценностях и команде.',
    },
    path: PATHS.ABOUT,
    icon: 'lucide:sparkles',
    keywords: ['about', 'haqqımızda', 'о нас', 'nexusmind', 'psixoloq'],
  },
  {
    id: 'page-partners',
    category: 'pages',
    title: {
      az: 'Tərəfdaşlar — Bakı Psixologiya Mərkəzi',
      en: 'Partners — Baku Psychological Center',
      ru: 'Партнеры — Бакинский Психологический Центр',
    },
    description: {
      az: 'NexusMind və Bakı Psixologiya Mərkəzi arasında eksklüziv tərəfdaşlıq.',
      en: 'Exclusive partnership between NexusMind and Baku Psychological Center.',
      ru: 'Эксклюзивное партнерство между NexusMind и Бакинским Психологическим Центром.',
    },
    path: `${PATHS.HOME}#partners`,
    scrollId: 'partners',
    icon: 'lucide:handshake',
    keywords: ['partners', 'tərəfdaşlar', 'партнеры', 'bpm'],
  },
];
