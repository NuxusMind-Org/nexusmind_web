import type { TitleDto } from '@/api/types';

/**
 * Safely extracts a localized string from a title field that may be either
 * a plain string or a TitleDto object ({ az?: string, en?: string, ru?: string }).
 *
 * @param title - The title field or object from backend API
 * @param lang - Target language ('az' | 'en' | 'ru'), defaults to 'az'
 * @param fallback - Fallback string if no localized value exists
 */
export function getLocalizedTitle(
  title?: string | TitleDto | null,
  lang: 'az' | 'en' | 'ru' = 'az',
  fallback: string = ''
): string {
  if (!title) return fallback;

  if (typeof title === 'string') {
    return title.trim();
  }

  if (typeof title === 'object') {
    // Try preferred language first
    const directVal = title[lang];
    if (directVal && typeof directVal === 'string' && directVal.trim().length > 0) {
      return directVal.trim();
    }

    // Fallbacks to any available language in priority: az -> en -> ru
    if (title.az && typeof title.az === 'string' && title.az.trim().length > 0) {
      return title.az.trim();
    }
    if (title.en && typeof title.en === 'string' && title.en.trim().length > 0) {
      return title.en.trim();
    }
    if (title.ru && typeof title.ru === 'string' && title.ru.trim().length > 0) {
      return title.ru.trim();
    }
  }

  return fallback;
}
