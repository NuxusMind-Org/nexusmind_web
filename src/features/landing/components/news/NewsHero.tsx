import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { PATHS } from '@/routes/paths';
import type { NewsItem } from '../../constants/news';

interface NewsHeroProps {
  item: NewsItem;
}

export const NewsHero = ({ item }: NewsHeroProps) => {
  const detailPath = PATHS.NEWS_DETAIL.replace(':id', String(item.id));

  return (
    <div className="w-full bg-[#1e293b]/30 backdrop-blur-md rounded-lg overflow-hidden border border-white/10 shadow-2xl flex flex-col lg:flex-row mb-12 group transition-all duration-500 hover:border-white/25">
      {/* Left: Image block */}
      <Link to={detailPath} className="w-full lg:w-[55%] aspect-[16/10] overflow-hidden relative block">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.02] transition-transform duration-[1000ms] ease-out"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
      </Link>

      {/* Right: Content details block */}
      <div className="w-full lg:w-[45%] p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-[#1e293b]/20 to-[#0f172a]/40">
        <div>
          {/* Badge & Date row */}
          <div className="flex items-center gap-3 mb-5">
            <span className="bg-white/10 border border-white/15 rounded-md px-3 py-1 text-[11px] font-bold text-white/90 tracking-widest uppercase">
              {item.categoryLabel}
            </span>
            <span className="text-white/60 text-[13px] font-medium">{item.date}</span>
          </div>

          {/* Headline Title */}
          <Link to={detailPath} className="block group">
            <h2 className="text-white text-[22px] sm:text-[26px] lg:text-[28px] font-semibold leading-snug mb-4 group-hover:text-[#00f2ff] transition-colors duration-300">
              {item.title}
            </h2>
          </Link>

          {/* Description Snippet */}
          <p className="text-white/70 text-[14px] sm:text-[15px] leading-relaxed mb-6 font-light line-clamp-4 lg:line-clamp-5">
            {item.description}
          </p>
        </div>

        {/* Action Bottom row */}
        <div className="flex items-center justify-between border-t border-white/5 pt-5 mt-auto">
          {/* View counter */}
          <div className="flex items-center gap-2 text-white/60 text-[13px] font-medium">
            <Eye size={16} className="text-white/40" />
            <span>{item.views} baxış</span>
          </div>

          {/* Davamını oxu action button */}
          <Link
            to={detailPath}
            className="px-6 py-2.5 rounded-lg text-white text-[14px] font-medium bg-[#581c87]/80 hover:bg-[#581c87] hover:shadow-[0_0_15px_rgba(88,28,135,0.4)] border-0 cursor-pointer transition-all duration-300 select-none outline-none block text-center"
          >
            Davamını oxu
          </Link>
        </div>
      </div>
    </div>
  );
};
