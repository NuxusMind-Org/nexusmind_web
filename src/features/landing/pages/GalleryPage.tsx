import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Footer } from '../components/Footer';
import { LandingNavbar } from '../components/LandingNavbar';
import { CardGridSkeleton } from '../components/skeletons';
import {
  GalleryHeader,
  GalleryFilters,
  GalleryGrid,
  type CategoryFilter,
  type SortOption,
} from '../components/gallery';
import { GalleryMediaModal } from '../components/gallery/GalleryMediaModal';
import { GALLERY_ITEMS, type GalleryItem } from '../constants/gallery';
import type { GalleryCategory } from '@/api/types';
import { useGalleryItems } from '../hooks/useContentQueries';
import {
  mapGalleryToGalleryItem,
  parseTimestamp,
  resolveContentLang,
} from '@/utils/contentMappers';

const CATEGORY_TO_API: Record<Exclude<CategoryFilter, 'all'>, GalleryCategory> = {
  terapiyalar: 'TERAPIYALAR',
  otaqlar: 'OTAQLAR',
  telimler: 'TELIMLER',
};

const PAGE_STEP = 4;

export const GalleryPage = () => {
  const { i18n } = useTranslation();
  const lang = resolveContentLang(i18n.resolvedLanguage || i18n.language);

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [activeSort, setActiveSort] = useState<SortOption>('popularity');
  const [visibleLimit, setVisibleLimit] = useState(PAGE_STEP);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const apiCategory = activeCategory === 'all' ? undefined : CATEGORY_TO_API[activeCategory];

  const { data: galleryPage, isLoading } = useGalleryItems({
    category: apiCategory,
    page: 0,
    size: 100,
  });

  const processedItems = useMemo(() => {
    const content = galleryPage?.content;
    const realItems = Array.isArray(content)
      ? content.map((dto) => mapGalleryToGalleryItem(dto, lang))
      : [];

    const realIds = new Set(realItems.map((item) => item.id));
    const filteredMocks = GALLERY_ITEMS.filter(
      (mock) =>
        !realIds.has(mock.id) &&
        (activeCategory === 'all' || mock.category === activeCategory)
    );

    const combined = [...realItems, ...filteredMocks];

    return combined.sort((a, b) => {
      if (activeSort === 'popularity') {
        return b.popularity - a.popularity;
      }
      if (activeSort === 'date-desc') {
        return parseTimestamp(b.rawDate, b.date) - parseTimestamp(a.rawDate, a.date);
      }
      if (activeSort === 'date-asc') {
        return parseTimestamp(a.rawDate, a.date) - parseTimestamp(b.rawDate, b.date);
      }
      return 0;
    });
  }, [galleryPage, lang, activeCategory, activeSort]);

  const paginatedItems = useMemo(() => {
    return processedItems.slice(0, visibleLimit);
  }, [processedItems, visibleLimit]);

  const hasMore = processedItems.length > visibleLimit;

  const handleLoadMore = () => {
    setVisibleLimit((prev) => prev + PAGE_STEP);
  };

  const handleCategoryChange = (category: CategoryFilter) => {
    setActiveCategory(category);
    setVisibleLimit(PAGE_STEP);
  };

  const handleSortChange = (sort: SortOption) => {
    setActiveSort(sort);
    setVisibleLimit(PAGE_STEP);
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white bg-landing-gradient">
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
          {isLoading ? (
            <CardGridSkeleton
              count={4}
              withBody={false}
              imageAspect="aspect-[4/3]"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
            />
          ) : (
            <GalleryGrid
              items={paginatedItems}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
              onSelectItem={setSelectedItem}
            />
          )}
        </div>
      </main>

      <GalleryMediaModal item={selectedItem} onClose={() => setSelectedItem(null)} />

      <Footer />
    </div>
  );
};
