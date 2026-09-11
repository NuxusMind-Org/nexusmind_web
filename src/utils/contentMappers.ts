import type {
  XeberResponseDto,
  MeqaleResponseDto,
  BlogResponse,
  GalleryItemResponse,
} from '@/api/types';
import type { NewsItem } from '@/features/landing/constants/news';
import type { ArticleItem } from '@/features/landing/constants/articles';
import type { GalleryItem } from '@/features/landing/constants/gallery';
import { getLocalizedTitle } from './multilingual';

// Fallback images
import newsConference from '@/assets/news/news_conference.png';
import couple from '@/assets/couple.png';
import newsBrainArt from '@/assets/news/news_brain_art.png';
import galleryMeditation from '@/assets/gallery/gallery_meditation.png';

const AZ_MONTHS_SHORT = [
  'Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyn',
  'İyl', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek',
];

const AZ_MONTHS_FULL = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
  'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr',
];

export function formatDateAz(dateStr?: string, fullMonth = false): string {
  if (!dateStr) return fullMonth ? '24 Mart 2026' : '12 May, 2024';

  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;

  const day = d.getDate().toString().padStart(2, '0');
  const monthIdx = d.getMonth();
  const year = d.getFullYear();

  if (fullMonth) {
    const month = AZ_MONTHS_FULL[monthIdx] || 'Mart';
    return `${day} ${month} ${year}`;
  }

  const month = AZ_MONTHS_SHORT[monthIdx] || 'May';
  return `${day} ${month}, ${year}`;
}

export function mapXeberToNewsItem(dto: XeberResponseDto): NewsItem {
  const catRaw = (dto.category || '').toLowerCase();
  let category: 'elanlar' | 'tecrube' | 'tedbirler' = 'tedbirler';
  let categoryLabel = 'TƏDBİRLƏR';

  if (catRaw.includes('elan') || catRaw.includes('otaq')) {
    category = 'elanlar';
    categoryLabel = 'ELANLAR';
  } else if (catRaw.includes('tecr') || catRaw.includes('telim')) {
    category = 'tecrube';
    categoryLabel = 'TƏCRÜBƏ';
  }

  return {
    id: dto.id ?? Math.floor(1000 + Math.random() * 9000),
    image: dto.imageUrl || newsConference,
    category,
    categoryLabel,
    date: formatDateAz(dto.createdAt),
    title: getLocalizedTitle(dto.title || dto.titleDto, 'az', 'Yenilik və Xəbər'),
    description: dto.shortDescription || dto.introText || '',
    views: 120,
    isFeatured: false,
  };
}

export function mapMeqaleToArticleItem(dto: MeqaleResponseDto): ArticleItem {
  return {
    id: dto.id ?? Math.floor(1000 + Math.random() * 9000),
    image: dto.imageUrl || couple,
    category: (dto.category || 'psixologiya').toLowerCase(),
    categoryLabel: dto.category || 'Psixologiya',
    date: formatDateAz(dto.createdAt, true),
    readTime: `${dto.readTimeMinutes || 5} dəq oxu`,
    views: 95,
    title: getLocalizedTitle(dto.title || dto.titleDto, 'az', 'Elmi Məqalə'),
    description: dto.shortDescription || dto.introText || '',
    author: {
      name: 'Dr. NexusMind Psixoloq',
      title: 'Klinik Psixoloq',
    },
  };
}

export interface SimilarBlogCard {
  id: number;
  badge: string;
  image: string;
  title: string;
  description: string;
  date: string;
}

export function mapBlogToSimilarBlogCard(dto: BlogResponse): SimilarBlogCard {
  return {
    id: dto.id ?? Math.floor(1000 + Math.random() * 9000),
    badge: dto.category || 'Psixologiya',
    image: dto.imageUrl || newsBrainArt,
    title: getLocalizedTitle(dto.title || dto.titleDto, 'az', 'Bloq Məqaləsi'),
    description: dto.shortDescription || dto.introText || '',
    date: formatDateAz(dto.createdAt),
  };
}

export function mapGalleryToGalleryItem(dto: GalleryItemResponse): GalleryItem {
  const catRaw = (dto.category || '').toLowerCase();
  let category: 'terapiyalar' | 'otaqlar' | 'telimler' = 'terapiyalar';
  let badgeText = 'TERAPİYALAR';

  if (catRaw.includes('otaq')) {
    category = 'otaqlar';
    badgeText = 'BAKI PSİXOLOGİYA MƏRKƏZİ';
  } else if (catRaw.includes('telim')) {
    category = 'telimler';
    badgeText = 'ƏYANİ TƏLİMLƏR';
  }

  const dateFormatted = dto.createdAt
    ? dto.createdAt.split('T')[0]
    : '2026-05-12';

  return {
    id: dto.id ?? Math.floor(1000 + Math.random() * 9000),
    image: dto.mediaUrl || dto.thumbnailUrl || galleryMeditation,
    category,
    badgeText: dto.categoryLabel || badgeText,
    popularity: dto.popularityScore || 90,
    date: dateFormatted,
  };
}
