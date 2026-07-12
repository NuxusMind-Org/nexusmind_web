import { Link } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import { ChevronRight } from 'lucide-react';

interface NewsDetailHeaderProps {
  categoryLabel: string;
}

export const NewsDetailHeader = ({ categoryLabel }: NewsDetailHeaderProps) => {
  return (
    <div className="w-full text-left mb-6 sm:mb-8">
      <h1 className="text-[42px] sm:text-[56px] font-serif font-light text-white mb-3 tracking-tight leading-tight">
        Xəbərlər
      </h1>
      <div className="flex items-center flex-wrap gap-2 text-[13px] sm:text-[14px] text-white/50 font-medium select-none">
        <Link to={PATHS.HOME} className="hover:text-[#00f2ff] transition-colors">
          Ana səhifə
        </Link>
        <ChevronRight size={14} className="text-white/30" />
        <Link to={PATHS.NEWS} className="hover:text-[#00f2ff] transition-colors">
          Xəbərlər
        </Link>
        <ChevronRight size={14} className="text-white/30" />
        <span className="text-[#c39ffd] font-semibold">{categoryLabel}</span>
      </div>
    </div>
  );
};
