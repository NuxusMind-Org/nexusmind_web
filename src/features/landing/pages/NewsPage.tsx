import { useState, useMemo } from 'react';
import { Footer } from '../components/Footer';
import { LandingNavbar } from '../components/LandingNavbar';
import {
  NewsHeader,
  NewsHero,
  NewsFilters,
  NewsGrid,
  type NewsCategoryFilter,
  type NewsSortOption,
} from '../components/news';
import { NEWS_ITEMS } from '../constants/news';

export const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState<NewsCategoryFilter>('all');
  const [activeSort, setActiveSort] = useState<NewsSortOption>('popularity');
  const [visibleLimit, setVisibleLimit] = useState(3);

  // Filter and sort items dynamically
  const processedItems = useMemo(() => {
    let items = [...NEWS_ITEMS];

    // 1. Category Filter
    if (activeCategory !== 'all') {
      items = items.filter((item) => item.category === activeCategory);
    }

    // 2. Sorting Criteria
    items.sort((a, b) => {
      if (activeSort === 'popularity') {
        return b.views - a.views;
      }
      if (activeSort === 'date-desc') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (activeSort === 'date-asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return 0;
    });

    return items;
  }, [activeCategory, activeSort]);

  // Extract featured item if we are on 'all' view and it exists
  const featuredItem = useMemo(() => {
    if (activeCategory !== 'all') return null;
    return NEWS_ITEMS.find((item) => item.isFeatured) || null;
  }, [activeCategory]);

  // Grid items: if featured item is displayed on top, exclude it from the grid below
  const gridItems = useMemo(() => {
    let items = processedItems;
    if (featuredItem) {
      items = items.filter((item) => item.id !== featuredItem.id);
    }
    return items;
  }, [processedItems, featuredItem]);

  // Retrieve only items up to current pagination index
  const paginatedItems = useMemo(() => {
    return gridItems.slice(0, visibleLimit);
  }, [gridItems, visibleLimit]);

  const hasMore = gridItems.length > visibleLimit;

  const handleLoadMore = () => {
    setVisibleLimit((prev) => prev + 3);
  };

  const handleCategoryChange = (category: NewsCategoryFilter) => {
    setActiveCategory(category);
    setVisibleLimit(3); // Reset pagination index when category switches
  };

  const handleSortChange = (sort: NewsSortOption) => {
    setActiveSort(sort);
    setVisibleLimit(3); // Reset pagination index when sort order changes
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white" style={{ background: 'linear-gradient(320deg, #914899 -4.41%, #263151 51.97%, #245D68 100%)' }}>
      <LandingNavbar activePage="news" />

      {/* Page Content */}
      <main className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[32px] pb-[80px] flex flex-col items-center">
        <div className="w-full max-w-[1200px] flex flex-col">
          <NewsHeader />

          {/* Render featured article on top if active category is 'all' */}
          {featuredItem && <NewsHero item={featuredItem} />}

          <NewsFilters
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            activeSort={activeSort}
            onSortChange={handleSortChange}
          />
          <NewsGrid
            items={paginatedItems}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};
