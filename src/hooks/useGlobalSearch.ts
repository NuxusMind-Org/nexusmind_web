import { useMemo } from 'react';
import {
  STATIC_SEARCH_ITEMS,
  type SearchLanguage,
  type SearchResultItem,
} from '@/data/staticSearchData';

export interface UseGlobalSearchResult {
  results: SearchResultItem[];
  isLoading: boolean;
  totalCount: number;
  isShowingPopular: boolean;
}

/**
 * Abstraction for universal site-wide search.
 * Currently backed by client-side filtering over STATIC_SEARCH_ITEMS.
 *
 * TODO: Swap the implementation to call the backend universal search controller
 * (e.g. via TanStack Query) once the endpoint is available.
 */
export const useGlobalSearch = (
  query: string,
  lang: SearchLanguage
): UseGlobalSearchResult => {
  return useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      const popularItems = STATIC_SEARCH_ITEMS.filter((item) => item.popular);
      return {
        results: popularItems,
        isLoading: false,
        totalCount: popularItems.length,
        isShowingPopular: true,
      };
    }

    const matched = STATIC_SEARCH_ITEMS.filter((item) => {
      const searchableParts = [
        item.title[lang],
        item.title.az,
        item.title.en,
        item.title.ru,
        item.description[lang],
        item.category,
        ...(item.keywords ?? []),
      ];

      return searchableParts.some((part) =>
        part.toLowerCase().includes(normalizedQuery)
      );
    });

    return {
      results: matched,
      isLoading: false,
      totalCount: matched.length,
      isShowingPopular: false,
    };
  }, [query, lang]);
};
