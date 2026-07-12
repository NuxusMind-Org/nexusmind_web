import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { PATHS } from '@/routes/paths';
import type { NewsItem } from '../../constants/news';

interface NewsCardProps {
  item: NewsItem;
}

export const NewsCard = ({ item }: NewsCardProps) => {
  const detailPath = PATHS.NEWS_DETAIL.replace(':id', String(item.id));

  return (
    <div className="bg-[#1e293b]/30 backdrop-blur-md rounded-lg overflow-hidden border border-white/10 shadow-xl flex flex-col h-full group hover:border-white/20 hover:translate-y-[-4px] transition-all duration-300">
      {/* Image Block */}
      <Link to={detailPath} className="w-full aspect-[3/2] overflow-hidden relative block">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
      </Link>

      {/* Details Block */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Badge & Date */}
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-white/10 border border-white/15 rounded-md px-2.5 py-1 text-[10px] font-bold text-white/95 tracking-widest uppercase">
              {item.categoryLabel}
            </span>
            <span className="text-white/50 text-[12px] font-medium">{item.date}</span>
          </div>

          {/* Title */}
          <Link to={detailPath} className="block group">
            <h3 className="text-white text-[18px] font-semibold leading-snug mb-3 group-hover:text-[#00f2ff] transition-colors duration-300 line-clamp-2">
              {item.title}
            </h3>
          </Link>

          {/* Description snippet */}
          <p className="text-white/60 text-[13px] leading-relaxed mb-6 font-light line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* Action Bottom Row */}
        <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
          {/* View Counter */}
          <div className="flex items-center gap-1.5 text-white/50 text-[12px] font-medium">
            <Eye size={14} className="text-white/30" />
            <span>{item.views} baxış</span>
          </div>

          {/* Text link trigger */}
          <Link to={detailPath} className="text-[#00f2ff] hover:underline text-[13px] font-semibold select-none">
            Davamını oxu →
          </Link>
        </div>
      </div>
    </div>
  );
};
