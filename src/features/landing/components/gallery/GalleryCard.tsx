import type { GalleryItem } from '../../constants/gallery';

interface GalleryCardProps {
  item: GalleryItem;
}

export const GalleryCard = ({ item }: GalleryCardProps) => {
  return (
    <div className="relative aspect-[3/2] rounded-lg overflow-hidden border border-white/10 shadow-lg group">
      {/* Image with zoom on hover */}
      <img
        src={item.image}
        alt={item.badgeText}
        className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[800ms] ease-out"
        loading="lazy"
      />
      {/* Subtle darkening overlay that vanishes on hover */}
      <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />

      {/* Premium Glassmorphic Badge Overlay */}
      <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-lg px-3.5 py-1.5 text-[10px] md:text-[11px] font-medium text-white/90 tracking-widest uppercase shadow-[0_4px_12px_rgba(0,0,0,0.15)] select-none">
        {item.badgeText}
      </div>
    </div>
  );
};
