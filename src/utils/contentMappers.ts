import type {
  XeberResponseDto,
  MeqaleResponseDto,
  BlogResponse,
  GalleryItemResponse,
  MediaType,
} from '@/api/types';
import type { NewsItem } from '@/features/landing/constants/news';
import type { ArticleItem } from '@/features/landing/constants/articles';
import type { SimilarBlogCard } from '@/features/landing/constants/blog';
import type { GalleryItem } from '@/features/landing/constants/gallery';
import { getLocalizedTitle } from './multilingual';

// Fallback images
import newsConference from '@/assets/news/news_conference.png';
import couple from '@/assets/couple.png';
import newsBrainArt from '@/assets/news/news_brain_art.png';
import galleryMeditation from '@/assets/gallery/gallery_meditation.png';

export type ContentLang = 'az' | 'en' | 'ru';

export function resolveContentLang(language?: string): ContentLang {
  const short = (language || 'az').slice(0, 2).toLowerCase();
  if (short === 'en' || short === 'ru') return short;
  return 'az';
}

const AZ_MONTHS_SHORT = [
  'Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyn',
  'İyl', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek',
];

const AZ_MONTHS_FULL = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
  'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr',
];

export function formatDateAz(dateStr?: string, fullMonth = false): string {
  if (!dateStr) return '';

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

export function formatLocalizedDate(
  dateStr?: string,
  lang: ContentLang = 'az',
  fullMonth = false
): string {
  if (!dateStr) return '';

  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;

  if (lang === 'az') {
    return formatDateAz(dateStr, fullMonth);
  }

  const locale = lang === 'ru' ? 'ru-RU' : 'en-US';
  return d.toLocaleDateString(locale, {
    day: '2-digit',
    month: fullMonth ? 'long' : 'short',
    year: 'numeric',
  });
}

export function parseTimestamp(rawDate?: string, fallbackDate?: string): number {
  const candidate = rawDate || fallbackDate;
  if (!candidate) return 0;
  const parsed = Date.parse(candidate);
  return Number.isNaN(parsed) ? 0 : parsed;
}

const READ_TIME_SUFFIX: Record<ContentLang, string> = {
  az: 'dəq oxu',
  en: 'min read',
  ru: 'мин чтения',
};

export function mapXeberToNewsItem(
  dto: XeberResponseDto,
  lang: ContentLang = 'az'
): NewsItem {
  const catRaw = (dto.category || '').toLowerCase();
  let category: 'elanlar' | 'tecrube' | 'tedbirler' = 'tedbirler';
  let defaultCategoryLabel = 'TƏDBİRLƏR';

  if (catRaw.includes('elan') || catRaw.includes('otaq') || catRaw.includes('announc')) {
    category = 'elanlar';
    defaultCategoryLabel = 'ELANLAR';
  } else if (catRaw.includes('tecr') || catRaw.includes('təcr') || catRaw.includes('telim') || catRaw.includes('intern')) {
    category = 'tecrube';
    defaultCategoryLabel = 'TƏCRÜBƏ';
  }

  return {
    id: dto.id ?? 0,
    image: dto.imageUrl || newsConference,
    category,
    categoryLabel: dto.category || defaultCategoryLabel,
    date: formatLocalizedDate(dto.createdAt, lang),
    rawDate: dto.createdAt,
    readTimeMinutes: dto.readTimeMinutes,
    title: getLocalizedTitle(dto.title || dto.titleDto, lang, 'NexusMind'),
    description: getLocalizedTitle(dto.shortDescription || dto.introText, lang, ''),
    views: dto.viewCount ?? 0,
    isFeatured: false,
  };
}

export function mapMeqaleToArticleItem(
  dto: MeqaleResponseDto,
  lang: ContentLang = 'az'
): ArticleItem {
  const minutes = dto.readTimeMinutes || 5;

  return {
    id: dto.id ?? 0,
    image: dto.imageUrl || couple,
    category: (dto.category || 'psixologiya').toLowerCase(),
    categoryLabel: dto.category || 'Psixologiya',
    date: formatLocalizedDate(dto.createdAt, lang, true),
    rawDate: dto.createdAt,
    readTime: `${minutes} ${READ_TIME_SUFFIX[lang]}`,
    views: 0,
    title: getLocalizedTitle(dto.title || dto.titleDto, lang, 'NexusMind'),
    description: getLocalizedTitle(dto.shortDescription || dto.introText, lang, ''),
    doctorId: dto.doctorId,
    author: {
      name: 'NexusMind',
      title: lang === 'en' ? 'Clinical Psychology' : lang === 'ru' ? 'Клиническая психология' : 'Klinik Psixologiya',
    },
  };
}

export type { SimilarBlogCard };

export function mapBlogToSimilarBlogCard(
  dto: BlogResponse,
  lang: ContentLang = 'az'
): SimilarBlogCard {
  return {
    id: dto.id ?? 0,
    badge: dto.category || 'Psixologiya',
    image: dto.imageUrl || newsBrainArt,
    title: getLocalizedTitle(dto.title || dto.titleDto, lang, 'NexusMind'),
    description: getLocalizedTitle(dto.shortDescription || dto.introText, lang, ''),
    date: formatLocalizedDate(dto.createdAt, lang),
    rawDate: dto.createdAt,
    authorName: dto.authorName,
  };
}

export function mapGalleryToGalleryItem(
  dto: GalleryItemResponse,
  lang: ContentLang = 'az'
): GalleryItem {
  const catRaw = (dto.category || '').toLowerCase();
  let category: 'terapiyalar' | 'otaqlar' | 'telimler' = 'terapiyalar';
  let defaultBadge = 'TERAPİYALAR';

  if (catRaw.includes('otaq')) {
    category = 'otaqlar';
    defaultBadge = 'OTAQLAR';
  } else if (catRaw.includes('telim') || catRaw.includes('təlim')) {
    category = 'telimler';
    defaultBadge = 'TƏLİMLƏR';
  }

  const mediaType: MediaType = dto.mediaType === 'VIDEO' ? 'VIDEO' : 'IMAGE';
  const badgeText = dto.categoryLabel || defaultBadge;
  const localizedTitle = getLocalizedTitle(dto.title, lang, '');
  const localizedAlt = getLocalizedTitle(dto.altText || dto.title, lang, badgeText);

  // For VIDEO items, always use thumbnailUrl as the preview image instead of feeding a video file into <img>
  const previewImage =
    mediaType === 'VIDEO'
      ? dto.thumbnailUrl || galleryMeditation
      : dto.thumbnailUrl || dto.mediaUrl || galleryMeditation;

  return {
    id: dto.id ?? 0,
    image: previewImage,
    mediaUrl: dto.mediaUrl,
    thumbnailUrl: dto.thumbnailUrl,
    mediaType,
    title: localizedTitle,
    altText: localizedAlt,
    category,
    badgeText,
    popularity: dto.popularityScore ?? 0,
    date: formatLocalizedDate(dto.createdAt, lang),
    rawDate: dto.createdAt,
  };
}
