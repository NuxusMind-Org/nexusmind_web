import newsConference from '@/assets/news/news_conference.png';
import newsAnnouncement from '@/assets/news/news_announcement.png';
import newsInternship from '@/assets/news/news_internship.png';
import newsEvent from '@/assets/news/news_event.png';

export interface NewsItem {
  id: number;
  image: string;
  category: 'elanlar' | 'tecrube' | 'tedbirler';
  categoryLabel: string;
  date: string;
  title: string;
  description: string;
  views: number;
  isFeatured?: boolean;
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    image: newsConference,
    category: 'tedbirler',
    categoryLabel: 'TƏDBİRLƏR',
    date: '12 May, 2024',
    title: 'Bakı Psixologiya Mərkəzi FMG-nin Dünya Əməyin Mühafizəsi Günü ilə əlaqədar tədbirində iştirak edib.',
    description: 'Sağlamlıq, əməyin təhlükəsizliyi və ətraf mühitin mühafizəsi (SƏTƏMM) sahəsində 2025-ci il üzrə FMG (Facility Management Group) şirkətinin əldə etdiyi nəticələr və qarşıdakı dövr üçün prioritet istiqamətlərə həsr olunan tədbir keçirilib...',
    views: 120,
    isFeatured: true,
  },
  {
    id: 2,
    image: newsAnnouncement,
    category: 'elanlar',
    categoryLabel: 'ELANLAR',
    date: '10 May, 2024',
    title: 'Platformamızda yeni konsultasiya xidmətləri aktivləşdi',
    description: 'İstifadəçilərimiz üçün terapevtik xidmətlərin əlçatanlığını artırmaq məqsədilə yeni elanlar və rəqəmsal dəstək paketləri istifadəyə verilmişdir.',
    views: 95,
  },
  {
    id: 3,
    image: newsInternship,
    category: 'tecrube',
    categoryLabel: 'TƏCRÜBƏ',
    date: '08 May, 2024',
    title: 'Yay Təcrübə Proqramı üçün qeydiyyat başladı',
    description: 'Gənc psixoloqlar və tələbələr üçün mərkəzimizdə keçiriləcək geniş yay təcrübə proqramına start veririk. Təcrübəli mentorlarla işləmək şansını qaçırmayın.',
    views: 150,
  },
  {
    id: 4,
    image: newsEvent,
    category: 'tedbirler',
    categoryLabel: 'TƏDBİRLƏR',
    date: '05 May, 2024',
    title: 'Korporativ komanda təlimlərimiz uğurla başa çatdı',
    description: 'Komandaların daxili emosional sağlamlığını möhkəmləndirmək, stress menecmentini inkişaf etdirmək üçün mərkəzimizin mütəxəssisləri tərəfindən təlimlər icra olunub.',
    views: 80,
  },
];
