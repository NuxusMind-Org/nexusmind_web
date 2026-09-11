import newsBrainArt from '@/assets/news/news_brain_art.png';
import newsLakeDock from '@/assets/news/news_lake_dock.png';
import newsTherapyRoom from '@/assets/news/news_therapy_room.png';
import newsAnnouncement from '@/assets/news/news_announcement.png';

export interface SimilarBlogCard {
  id: number;
  badge: string;
  image: string;
  title: string;
  description: string;
  date: string;
}

export const SIMILAR_BLOGS: SimilarBlogCard[] = [
  {
    id: 1,
    badge: 'Psixologiya',
    image: newsBrainArt,
    title: 'İmmersiyanın Elmi: Niyə VR Beyni İnanır?',
    description: 'Virtual mühitin sinir sistemimizə təsiri və beynin rəqəmsal stimullara qarşı verdiyi reaksiyaların dərin analizi.',
    date: '12 Okt, 2024',
  },
  {
    id: 2,
    badge: 'Sağlamlıq',
    image: newsLakeDock,
    title: 'VR Meditasiya Texnikaları: Daxili Sükut',
    description: 'Müasir dünyada stresslə mübarizə üçün virtual mühitlərin təqdim etdiyi əən effektiv meditasiya üsulları.',
    date: '10 Okt, 2024',
  },
  {
    id: 3,
    badge: 'Simulyasiya',
    image: newsTherapyRoom,
    title: 'Fobiyaların VR ilə Aradan Qaldırılması',
    description: 'Ekspozisiya terapiyasının virtual məkanda tətbiqi: Qorxularınızla təhlükəsiz şəkildə üzləşin.',
    date: '08 Okt, 2024',
  },
  {
    id: 4,
    badge: 'İnnovasiya',
    image: newsAnnouncement,
    title: 'Rəqəmsal Etika və Virtual Terapiya',
    description: 'Virtual dünyalarda aparılan müalicə seanslarının gizliliyi və etik standartlarının gələcəyi haqqında düşüncələr.',
    date: '05 Okt, 2024',
  },
];

export const POPULAR_TOPICS = [
  '#BeyinElmi',
  '#VRMetaverse',
  '#Terapevtikİnnovasiya',
  '#RəqəmsalDetoks',
  '#GələcəkPsixologiyası',
];
