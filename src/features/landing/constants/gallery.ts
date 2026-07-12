import galleryMeditation from '@/assets/gallery/gallery_meditation.png';
import galleryTherapy from '@/assets/gallery/gallery_therapy.png';
import galleryPresentation from '@/assets/gallery/gallery_presentation.png';
import galleryConsultation from '@/assets/gallery/gallery_consultation.png';
import galleryLobby from '@/assets/gallery/gallery_lobby.png';
import galleryMassage from '@/assets/gallery/gallery_massage.png';
import galleryWorkshop from '@/assets/gallery/gallery_workshop.png';
import gallerySandplay from '@/assets/gallery/gallery_sandplay.png';

export interface GalleryItem {
  id: number;
  image: string;
  category: 'terapiyalar' | 'otaqlar' | 'telimler';
  badgeText: string;
  popularity: number;
  date: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    image: galleryMeditation,
    category: 'telimler',
    badgeText: 'ƏYANİ TƏLİMLƏR',
    popularity: 95,
    date: '2026-05-12',
  },
  {
    id: 2,
    image: galleryTherapy,
    category: 'terapiyalar',
    badgeText: 'TERAPİYALAR',
    popularity: 88,
    date: '2026-05-08',
  },
  {
    id: 3,
    image: galleryPresentation,
    category: 'otaqlar',
    badgeText: 'BAKI PSİXOLOGİYA MƏRKƏZİ',
    popularity: 92,
    date: '2026-05-15',
  },
  {
    id: 4,
    image: galleryConsultation,
    category: 'telimler',
    badgeText: 'ONLINE TƏLİMLƏR',
    popularity: 85,
    date: '2026-05-01',
  },
  {
    id: 5,
    image: galleryLobby,
    category: 'terapiyalar',
    badgeText: 'VR TERAPİYALAR',
    popularity: 80,
    date: '2026-04-28',
  },
  {
    id: 6,
    image: galleryMassage,
    category: 'telimler',
    badgeText: 'ƏYANİ TƏLİMLƏR',
    popularity: 75,
    date: '2026-04-20',
  },
  {
    id: 7,
    image: galleryWorkshop,
    category: 'telimler',
    badgeText: 'ONLINE TƏLİMLƏR',
    popularity: 82,
    date: '2026-05-05',
  },
  {
    id: 8,
    image: gallerySandplay,
    category: 'otaqlar',
    badgeText: 'BAKI PSİXOLOGİYA MƏRKƏZİ',
    popularity: 90,
    date: '2026-05-10',
  },
];
