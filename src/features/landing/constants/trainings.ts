import galleryMeditation from '@/assets/gallery/gallery_meditation.png';
import galleryWorkshop from '@/assets/gallery/gallery_workshop.png';
import galleryConsultation from '@/assets/gallery/gallery_consultation.png';
import galleryLobby from '@/assets/gallery/gallery_lobby.png';
import galleryPresentation from '@/assets/gallery/gallery_presentation.png';

export interface Training {
  id: string;
  title: string;
  type: 'eyani' | 'online';
  image: string;
  date: string;       // e.g. "29 İyun", "15 İyul"
  fullDate: string;   // format "YYYY-MM-DD" for calendar matching
  time: string;       // e.g. "17:00"
  location: string;   // e.g. "Bakı Psixologiya Mərkəzi"
  price: string;      // e.g. "35 AZN"
  tags: string[];     // e.g. ["Meditasiya", "Texnika"]
}

export const TRAINING_ITEMS: Training[] = [
  {
    id: '1',
    title: 'Affirmasiya və Meditasiya Texnikaları',
    type: 'eyani',
    image: galleryMeditation,
    date: '29 İyun',
    fullDate: '2026-06-29',
    time: '17:00',
    location: 'Bakı Psixologiya Mərkəzi',
    price: '35 AZN',
    tags: ['Meditasiya', 'Texnika'],
  },
  {
    id: '2',
    title: 'Stress İdarəetməsi',
    type: 'eyani',
    image: galleryPresentation,
    date: '15 İyul',
    fullDate: '2026-07-15',
    time: '14:00',
    location: 'Bakı Psixologiya Mərkəzi',
    price: '45 AZN',
    tags: ['Stress', 'Terapiya'],
  },
  {
    id: '3',
    title: 'Psixoloji Möhkəmlik və Adaptasiya',
    type: 'online',
    image: galleryConsultation,
    date: '22 İyun',
    fullDate: '2026-06-22',
    time: '19:00',
    location: 'Online (Zoom)',
    price: '30 AZN',
    tags: ['Davamlılıq', 'İnkişaf'],
  },
  {
    id: '4',
    title: 'Özünü Kəşf və Şüuraltı Analiz',
    type: 'online',
    image: galleryLobby,
    date: '5 İyul',
    fullDate: '2026-07-05',
    time: '20:00',
    location: 'Online (Zoom)',
    price: '40 AZN',
    tags: ['Meditasiya', 'Şüuraltı'],
  },
  {
    id: '5',
    title: 'Uşaq Psixologiyası və İnkişaf Mərhələləri',
    type: 'online',
    image: galleryWorkshop,
    date: '18 İyul',
    fullDate: '2026-07-18',
    time: '15:00',
    location: 'Online (Zoom)',
    price: '50 AZN',
    tags: ['Uşaq', 'Tərbiyə'],
  },
];
