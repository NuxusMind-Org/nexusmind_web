import { useState, useMemo } from 'react';
import { Footer } from '../components/Footer';
import { LandingNavbar } from '../components/LandingNavbar';
import {
  GalleryHeader,
  GalleryFilters,
  GalleryGrid,
  type CategoryFilter,
  type SortOption,
} from '../components/gallery';
import { GALLERY_ITEMS } from '../constants/gallery';

export const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [activeSort, setActiveSort] = useState<SortOption>('popularity');
  const [visibleLimit, setVisibleLimit] = useState(4);

  // Filter and sort items dynamically based on reactive selection
  const processedItems = useMemo(() => {
    // 1. Category Filter
    let items = [...GALLERY_ITEMS];
    if (activeCategory !== 'all') {
      items = items.filter((item) => item.category === activeCategory);
    }

    // 2. Sorting Criteria
    items.sort((a, b) => {
      if (activeSort === 'popularity') {
        return b.popularity - a.popularity;
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

  // Retrieve only items up to current pagination index
  const paginatedItems = useMemo(() => {
    return processedItems.slice(0, visibleLimit);
  }, [processedItems, visibleLimit]);

  const hasMore = processedItems.length > visibleLimit;

  const handleLoadMore = () => {
    setVisibleLimit((prev) => prev + 4);
  };

  const handleCategoryChange = (category: CategoryFilter) => {
    setActiveCategory(category);
    setVisibleLimit(4); // Reset pagination index when categories switch
  };

  const handleSortChange = (sort: SortOption) => {
    setActiveSort(sort);
    setVisibleLimit(4); // Reset pagination index when sort order changes
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white" style={{ background: "linear-gradient(180deg, #263151 5%, #245D68 45%, #914899 95%)" }}>
      <LandingNavbar activePage="gallery" />

      {/* Page Content */}
      <main className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[32px] pb-[80px] flex flex-col items-center">
        <div className="w-full max-w-[1200px] flex flex-col">
          <GalleryHeader />
          <GalleryFilters
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            activeSort={activeSort}
            onSortChange={handleSortChange}
          />
          <GalleryGrid
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
