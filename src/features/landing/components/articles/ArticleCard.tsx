import { Link } from 'react-router-dom';
import { Calendar, Clock, Eye, User, ArrowRight } from 'lucide-react';
import { PATHS } from '@/routes/paths';
import type { ArticleItem } from '../../constants/articles';

interface ArticleCardProps {
  item: ArticleItem;
}

export const ArticleCard = ({ item }: ArticleCardProps) => {
  const detailPath = PATHS.ARTICLE_DETAIL.replace(':id', String(item.id));

  return (
    <div className="bg-ui-glass backdrop-blur-[18px] border border-ui-border rounded-lg overflow-hidden shadow-xl flex flex-col h-full group hover:border-white/20 hover:translate-y-[-4px] transition-all duration-300">
      {/* Image Block */}
      <Link to={detailPath} className="w-full aspect-[3/2] overflow-hidden relative block">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-[#422B63]/90 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-white text-[11px] font-semibold tracking-wider uppercase">
            {item.categoryLabel}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
      </Link>

      {/* Details Block */}
      <div className="p-6 flex flex-col flex-1 justify-between gap-5">
        <div className="flex flex-col gap-4">
          {/* Author info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/60 shrink-0">
              {item.author.avatar ? (
                <img
                  src={item.author.avatar}
                  alt={item.author.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User size={18} className="text-[#a682ff]" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-white text-[14px] sm:text-[15px] font-medium leading-tight">
                {item.author.name}
              </span>
              <span className="text-white/60 text-[11px] sm:text-[12px] font-light">
                {item.author.title}
              </span>
            </div>
          </div>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 text-white/60 text-[12px] font-normal tracking-wide">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-white/40" />
              <span>{item.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-white/40" />
              <span>{item.readTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye size={14} className="text-white/40" />
              <span>{item.views} baxış</span>
            </div>
          </div>

          {/* Title */}
          <Link to={detailPath} className="block group">
            <h3 className="text-white text-[18px] sm:text-[20px] font-semibold leading-snug tracking-tight hover:text-[#00f2ff] transition-colors duration-300 line-clamp-2">
              {item.title}
            </h3>
          </Link>

          {/* Description snippet */}
          <p className="text-white/70 text-[13px] sm:text-[14px] leading-relaxed font-light line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* Action Bottom Link */}
        <div className="flex items-center justify-end border-t border-white/5 pt-4 mt-auto">
          <Link to={detailPath} className="text-accent hover:text-brand text-[13px] sm:text-[14px] font-semibold flex items-center gap-1.5 cursor-pointer transition-colors duration-300 group-hover:translate-x-0.5 transition-transform">
            <span>Davamını oxu</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};
