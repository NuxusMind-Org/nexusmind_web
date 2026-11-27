import { AppIcon } from '@/components/common/AppIcon';
import { SmartImage } from '@/components/common/SmartImage';
import type { GalleryItem } from '../../constants/gallery';

interface GalleryCardProps {
  item: GalleryItem;
  onSelect?: (item: GalleryItem) => void;
}

export const GalleryCard = ({ item, onSelect }: GalleryCardProps) => {
  const isVideo = item.mediaType === 'VIDEO';
  const alt = item.altText || item.title || item.badgeText;

  return (
    <button
      type="button"
      onClick={() => onSelect?.(item)}
      aria-label={alt}
      className="relative w-full aspect-[3/2] rounded-lg overflow-hidden border border-white/10 shadow-lg group block text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      {/* Thumbnail / Image with zoom on hover */}
      <SmartImage
        src={item.image}
        alt={alt}
        className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
        loading="lazy"
      />
      {/* Subtle darkening overlay that vanishes on hover */}
      <div className="absolute inset-0 z-[2] bg-black/15 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />

      {/* Center Play Indicator for VIDEO items */}
      {isVideo && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-black/60 border border-white/30 backdrop-blur-md flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:bg-[#6700FF]/80 transition-all duration-300">
            <AppIcon icon="lucide:play" size={20} className="ml-0.5" />
          </div>
        </div>
      )}

      {/* Premium Glassmorphic Badge Overlay */}
      <div className="absolute bottom-4 right-4 z-10 bg-white/10 backdrop-blur-md border border-white/15 rounded-lg px-3.5 py-1.5 text-[10px] md:text-[11px] font-medium text-white/90 tracking-widest uppercase shadow-[0_4px_12px_rgba(0,0,0,0.15)] select-none">
        {item.badgeText}
      </div>
    </button>
  );
};
