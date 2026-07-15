import couple from '@/assets/couple.png';
import family from '@/assets/family.png';
import friends from '@/assets/friends.png';
import singlePerson from '@/assets/single_person.png';
import therapist1 from '@/assets/therapist1.png';
import purpleRoom from '@/assets/purple_room.png';
import vrConsultation from '@/assets/vr_consultation.png';
import pillarsImage from '@/assets/pillars_image.png';
import analyzing from '@/assets/analyzing.png';

export interface ArticleItem {
  id: number;
  image: string;
  category: string;
  categoryLabel: string;
  date: string;
  readTime: string;
  views: number;
  title: string;
  description: string;
  author: {
    name: string;
    title: string;
    avatar?: string;
  };
}

export const ARTICLE_ITEMS: ArticleItem[] = [
  {
    id: 1,
    image: couple,
    category: 'psixologiya',
    categoryLabel: 'Psixologiya',
    date: '24 Mart 2026',
    readTime: '4 dəq oxu',
    views: 93,
    title: 'VR Terapiyasının Travma Müalicəsində Effektivliyi',
    description: 'Virtual reallıq texnologiyalarının post-travmatik stress pozuntusu olan pasiyentlərin reabilitasiyasında tətbiqi və klinik nəticələri.',
    author: {
      name: 'Dr. Leyla Rəhimova',
      title: 'Klinik Psixoloq',
    },
  },
  {
    id: 2,
    image: singlePerson,
    category: 'psixologiya',
    categoryLabel: 'Psixologiya',
    date: '22 Mart 2026',
    readTime: '6 dəq oxu',
    views: 114,
    title: 'Koqnitiv Davranış Terapiyası və Təşviş Pozuntuları',
    description: 'Təşviş və panik atakların aradan qaldırılmasında koqnitiv davranış terapiyasının (KDT) effektivliyi və tətbiq metodları.',
    author: {
      name: 'Dr. Leyla Rəhimova',
      title: 'Klinik Psixoloq',
    },
  },
  {
    id: 3,
    image: friends,
    category: 'psixologiya',
    categoryLabel: 'Psixologiya',
    date: '20 Mart 2026',
    readTime: '5 dəq oxu',
    views: 88,
    title: 'Sosial Dəstəyin Ruh Sağlamlığına Əhəmiyyətli Təsiri',
    description: 'Sosial əlaqələrin emosional dayanıqlığa, depressiyanın azaldılmasına və həyat keyfiyyətinin yüksəldilməsinə olan müsbət təsirləri.',
    author: {
      name: 'Dr. Leyla Rəhimova',
      title: 'Klinik Psixoloq',
    },
  },
  {
    id: 4,
    image: family,
    category: 'psixologiya',
    categoryLabel: 'Psixologiya',
    date: '18 Mart 2026',
    readTime: '7 dəq oxu',
    views: 125,
    title: 'Ailə Daxili Konfliktlər və Sağlam Ünsiyyət Metodları',
    description: 'Ailə üzvləri arasında empatiyanın inkişaf etdirilməsi, gərginliyin azaldılması və sağlam ünsiyyət formalarının qurulması yolları.',
    author: {
      name: 'Dr. Leyla Rəhimova',
      title: 'Klinik Psixoloq',
    },
  },
  {
    id: 5,
    image: therapist1,
    category: 'psixologiya',
    categoryLabel: 'Psixologiya',
    date: '15 Mart 2026',
    readTime: '5 dəq oxu',
    views: 97,
    title: 'Uşaqlarda Emosional İnkişaf və Valideyn Roli',
    description: 'Yeniyetmə və uşaq yaşlarında duyğuların tanınması və tənzimlənməsində valideynlərin yanaşmasının rolu.',
    author: {
      name: 'Dr. Leyla Rəhimova',
      title: 'Klinik Psixoloq',
    },
  },
  {
    id: 6,
    image: purpleRoom,
    category: 'psixologiya',
    categoryLabel: 'Psixologiya',
    date: '12 Mart 2026',
    readTime: '8 dəq oxu',
    views: 142,
    title: 'Somatik Terapiya: Bədən və Zəka Əlaqəsi',
    description: 'Bədəndə toplanmış gərginliklərin və emosional blokajların somatik fərqindəlik metodları vasitəsilə azad edilməsi.',
    author: {
      name: 'Dr. Leyla Rəhimova',
      title: 'Klinik Psixoloq',
    },
  },
  {
    id: 7,
    image: vrConsultation,
    category: 'psixologiya',
    categoryLabel: 'Psixologiya',
    date: '10 Mart 2026',
    readTime: '4 dəq oxu',
    views: 89,
    title: 'VR ilə Panik Atakların İdarə Olunması',
    description: 'Virtual mühitdə ekspozisiya terapiyası sayəsində fobilərin və qorxuların təhlükəsiz şəkildə idarə edilməsi üsulları.',
    author: {
      name: 'Dr. Leyla Rəhimova',
      title: 'Klinik Psixoloq',
    },
  },
  {
    id: 8,
    image: pillarsImage,
    category: 'psixologiya',
    categoryLabel: 'Psixologiya',
    date: '08 Mart 2026',
    readTime: '5 dəq oxu',
    views: 75,
    title: 'Şəxsi Sərhədlərin Qurulmasının Önəmi',
    description: 'Sağlam şəxsiyyətlərarası münasibətlər qurmaq və daxili hüzuru qorumaq üçün "yox" demək bacarığının inkişaf etdirilməsi.',
    author: {
      name: 'Dr. Leyla Rəhimova',
      title: 'Klinik Psixoloq',
    },
  },
  {
    id: 9,
    image: analyzing,
    category: 'psixologiya',
    categoryLabel: 'Psixologiya',
    date: '05 Mart 2026',
    readTime: '6 dəq oxu',
    views: 110,
    title: 'Mindfulness və Diqqət Dağınıqlığı ilə Mübarizə',
    description: 'Gündəlik həyatda zehni olaraq indiki andan həzz almaq və diqqətin yayılmasının qarşısını almaq üçün mindfulness praktikaları.',
    author: {
      name: 'Dr. Leyla Rəhimova',
      title: 'Klinik Psixoloq',
    },
  },
  {
    id: 10,
    image: couple,
    category: 'psixologiya',
    categoryLabel: 'Psixologiya',
    date: '03 Mart 2026',
    readTime: '5 dəq oxu',
    views: 92,
    title: 'Yuxu Rejimi və Psixi Sağlamlıq Əlaqəsi',
    description: 'Keyfiyyətli yuxunun koqnitiv funksiyalara, emosional tənzimləməyə və ümumi rifaha olan təsirləri.',
    author: {
      name: 'Dr. Leyla Rəhimova',
      title: 'Klinik Psixoloq',
    },
  },
  {
    id: 11,
    image: singlePerson,
    category: 'psixologiya',
    categoryLabel: 'Psixologiya',
    date: '01 Mart 2026',
    readTime: '4 dəq oxu',
    views: 99,
    title: 'Təşviş Pozuntusunu Gündəlik Həyatda İdarə Etmək',
    description: 'Nəfəs məşqləri, koqnitiv yanaşmalar və relaksasiya texnikaları ilə gündəlik anksiyetenin azaldılması.',
    author: {
      name: 'Dr. Leyla Rəhimova',
      title: 'Klinik Psixoloq',
    },
  },
  {
    id: 12,
    image: friends,
    category: 'psixologiya',
    categoryLabel: 'Psixologiya',
    date: '28 Fevral 2026',
    readTime: '6 dəq oxu',
    views: 104,
    title: 'Psixoloji Möhkəmlik (Resilience) Nədir?',
    description: 'Həyatın çətinlikləri qarşısında emosional dayanıqlığı itirmədən yenidən ayağa qalxma gücünün sirləri.',
    author: {
      name: 'Dr. Leyla Rəhimova',
      title: 'Klinik Psixoloq',
    },
  },
  {
    id: 13,
    image: family,
    category: 'psixologiya',
    categoryLabel: 'Psixologiya',
    date: '25 Fevral 2026',
    readTime: '5 dəq oxu',
    views: 85,
    title: 'Emosional İntellektin Həyatımıza Təsiri',
    description: 'Öz duyğularını anlamaq və başqalarının emosiyalarını düzgün oxumağın iş və şəxsi həyatdakı önəmi.',
    author: {
      name: 'Dr. Leyla Rəhimova',
      title: 'Klinik Psixoloq',
    },
  },
  {
    id: 14,
    image: therapist1,
    category: 'psixologiya',
    categoryLabel: 'Psixologiya',
    date: '22 Fevral 2026',
    readTime: '5 dəq oxu',
    views: 91,
    title: 'Sosial Fobiya ilə Mübarizə Yolları',
    description: 'Sosial mühitlərdə yaranan qorxuların və narahatlıqların mərhələli şəkildə aşılması metodları.',
    author: {
      name: 'Dr. Leyla Rəhimova',
      title: 'Klinik Psixoloq',
    },
  },
  {
    id: 15,
    image: purpleRoom,
    category: 'psixologiya',
    categoryLabel: 'Psixologiya',
    date: '18 Fevral 2026',
    readTime: '6 dəq oxu',
    views: 112,
    title: 'Koqnitiv Yenidən Çərçivələmə Metodları',
    description: 'Neqativ və avtomatik düşüncə qəliblərini daha faydalı və realist fikirlərlə əvəzləmək.',
    author: {
      name: 'Dr. Leyla Rəhimova',
      title: 'Klinik Psixoloq',
    },
  },
  {
    id: 16,
    image: vrConsultation,
    category: 'psixologiya',
    categoryLabel: 'Psixologiya',
    date: '15 Fevral 2026',
    readTime: '5 dəq oxu',
    views: 79,
    title: 'Travmadan Sonrakı İnkişaf (PTGD) Konsepti',
    description: 'Çətin həyat hadisələri və travmatik yaşantılardan sonra şəxsiyyətin daha da güclənərək böyüməsi prosesi.',
    author: {
      name: 'Dr. Leyla Rəhimova',
      title: 'Klinik Psixoloq',
    },
  },
  {
    id: 17,
    image: pillarsImage,
    category: 'psixologiya',
    categoryLabel: 'Psixologiya',
    date: '12 Fevral 2026',
    readTime: '5 dəq oxu',
    views: 101,
    title: 'İş Həyatında Stress Menecmenti Xidmətləri',
    description: 'Professional fəaliyyətdə tükənmə (burnout) sindromunun qarşısını almaq və iş-həyat balansını qorumaq.',
    author: {
      name: 'Dr. Leyla Rəhimova',
      title: 'Klinik Psixoloq',
    },
  },
  {
    id: 18,
    image: analyzing,
    category: 'psixologiya',
    categoryLabel: 'Psixologiya',
    date: '10 Fevral 2026',
    readTime: '4 dəq oxu',
    views: 95,
    title: 'Özünə Hörmət və Özünü Düzgün Qiymətləndirmə',
    description: 'Fərdin daxili tənqidçi ilə mübarizəsi, öz dəyərini qəbul etməsi və özünə qarşı mərhəmətli olması.',
    author: {
      name: 'Dr. Leyla Rəhimova',
      title: 'Klinik Psixoloq',
    },
  },
];
