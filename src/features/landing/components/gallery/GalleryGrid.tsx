import type { GalleryItem } from '../../constants/gallery';
import { GalleryCard } from './GalleryCard';
import { ScrollReveal } from '../ScrollReveal';

interface GalleryGridProps {
  items: GalleryItem[];
  hasMore: boolean;
  onLoadMore: () => void;
}

export const GalleryGrid = ({ items, hasMore, onLoadMore }: GalleryGridProps) => {
  return (
    <div className="w-full flex flex-col items-center">
      {items.length === 0 ? (
        <div className="text-center py-20 text-white/50 text-[16px] md:text-[18px] font-medium">
          Bu kateqoriyaya uyğun şəkil tapılmadı.
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((item) => (
            <ScrollReveal key={item.id} className="w-full">
              <GalleryCard item={item} />
            </ScrollReveal>
          ))}
        </div>
      )}

      {/* Centered Load More button with smooth hover arrow slide animation */}
      {hasMore && (
        <button
          onClick={onLoadMore}
          className="mt-12 md:mt-16 text-white hover:text-[#00f2ff] transition-colors duration-300 flex items-center gap-2 text-[16px] md:text-[18px] font-medium bg-transparent border-0 outline-none cursor-pointer group select-none py-2"
        >
          <span>Daha çox</span>
          <span className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
        </button>
      )}
    </div>
  );
};
