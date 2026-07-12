import { Share2, Bookmark, Clock } from 'lucide-react';
import type { NewsItem } from '../../constants/news';

interface NewsDetailHeroProps {
  item: NewsItem;
}

export const NewsDetailHero = ({ item }: NewsDetailHeroProps) => {
  return (
    <div className="w-full relative aspect-[21/9] sm:aspect-[16/6] rounded-lg overflow-hidden border border-white/10 shadow-2xl mb-10 group">
      {/* Background Cover Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.01] transition-transform duration-[1200ms] ease-out"
      />
      {/* Gradient Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/25" />

      {/* Top Right Action Buttons */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex items-center gap-3">
        <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/45 hover:bg-black/60 border border-white/10 hover:border-white/20 flex items-center justify-center text-white cursor-pointer transition-all duration-300 backdrop-blur-md outline-none">
          <Share2 size={16} />
        </button>
        <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/45 hover:bg-black/60 border border-white/10 hover:border-white/20 flex items-center justify-center text-white cursor-pointer transition-all duration-300 backdrop-blur-md outline-none">
          <Bookmark size={16} />
        </button>
      </div>

      {/* Bottom Left Meta & Title Overlay */}
      <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 left-6 sm:left-8 lg:left-10 right-6 sm:right-8 lg:right-10 flex flex-col items-start">
        {/* Meta Info Row */}
        <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-5">
          <span className="bg-white/15 backdrop-blur-md border border-white/20 rounded-md px-3 py-1 text-[11px] font-bold text-white tracking-widest uppercase">
            {item.categoryLabel}
          </span>
          <span className="text-white/70 text-[13px] font-medium">{item.date}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <div className="flex items-center gap-1.5 text-white/70 text-[13px] font-medium">
            <Clock size={14} className="text-white/40" />
            <span>8 dəq oxu</span>
          </div>
        </div>

        {/* Headline Title */}
        <h2 className="text-white text-[24px] sm:text-[32px] lg:text-[40px] font-semibold leading-tight tracking-tight max-w-[850px]">
          {item.title}
        </h2>
      </div>
    </div>
  );
};
