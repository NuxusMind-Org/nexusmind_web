import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Footer } from '../components/Footer';
import { LandingNavbar } from '../components/LandingNavbar';
import { CardGridSkeleton } from '../components/skeletons';
import {
  NewsHeader,
  NewsHero,
  NewsFilters,
  NewsGrid,
  type NewsCategoryFilter,
  type NewsSortOption,
} from '../components/news';
import { NEWS_ITEMS } from '../constants/news';
import { useNewsList } from '../hooks/useContentQueries';
import {
  mapXeberToNewsItem,
  parseTimestamp,
  resolveContentLang,
} from '@/utils/contentMappers';

export const NewsPage = () => {
  const { i18n } = useTranslation();
  const lang = resolveContentLang(i18n.resolvedLanguage || i18n.language);

  const [activeCategory, setActiveCategory] = useState<NewsCategoryFilter>('all');
  const [activeSort, setActiveSort] = useState<NewsSortOption>('popularity');
  const [visibleLimit, setVisibleLimit] = useState(6);

  const { data: newsDtos, isLoading } = useNewsList();

  const allNewsItems = useMemo(() => {
    const realNews = Array.isArray(newsDtos)
      ? newsDtos
          .filter((dto) => !dto.status || dto.status === 'PUBLISHED')
          .map((dto) => mapXeberToNewsItem(dto, lang))
      : [];

    const realIds = new Set(realNews.map((item) => item.id));
    const uniqueMocks = NEWS_ITEMS.filter((mock) => !realIds.has(mock.id));
    return [...realNews, ...uniqueMocks];
  }, [newsDtos, lang]);

  // Filter and sort items dynamically
  const processedItems = useMemo(() => {
    let items = [...allNewsItems];

    if (activeCategory !== 'all') {
      items = items.filter((item) => item.category === activeCategory);
    }

    items.sort((a, b) => {
      if (activeSort === 'popularity') {
        return b.views - a.views;
      }
      if (activeSort === 'date-desc') {
        return parseTimestamp(b.rawDate, b.date) - parseTimestamp(a.rawDate, a.date);
      }
      if (activeSort === 'date-asc') {
        return parseTimestamp(a.rawDate, a.date) - parseTimestamp(b.rawDate, b.date);
      }
      return 0;
    });

    return items;
  }, [allNewsItems, activeCategory, activeSort]);

  // Extract featured item on 'all' view
  const featuredItem = useMemo(() => {
    if (activeCategory !== 'all' || processedItems.length === 0) return null;
    return processedItems.find((item) => item.isFeatured) || processedItems[0];
  }, [activeCategory, processedItems]);

  // Grid items: exclude the hero featured item when displayed above
  const gridItems = useMemo(() => {
    if (!featuredItem) return processedItems;
    return processedItems.filter((item) => item.id !== featuredItem.id);
  }, [processedItems, featuredItem]);

  const paginatedItems = useMemo(() => {
    return gridItems.slice(0, visibleLimit);
  }, [gridItems, visibleLimit]);

  const hasMore = gridItems.length > visibleLimit;

  const handleLoadMore = () => {
    setVisibleLimit((prev) => prev + 6);
  };

  const handleCategoryChange = (category: NewsCategoryFilter) => {
    setActiveCategory(category);
    setVisibleLimit(6);
  };

  const handleSortChange = (sort: NewsSortOption) => {
    setActiveSort(sort);
    setVisibleLimit(6);
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white bg-landing-gradient">
      <LandingNavbar activePage="news" />

      {/* Page Content */}
      <main className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[32px] pb-[80px] flex flex-col items-center">
        <div className="w-full max-w-[1200px] flex flex-col">
          <NewsHeader />

          {/* Render featured article on top if active category is 'all' */}
          {!isLoading && featuredItem && <NewsHero item={featuredItem} />}

          <NewsFilters
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            activeSort={activeSort}
            onSortChange={handleSortChange}
          />
          {isLoading ? (
            <CardGridSkeleton count={3} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8" />
          ) : (
            <NewsGrid
              items={paginatedItems}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
