import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PATHS } from '@/routes/paths';
import { NewsCard } from './NewsCard';
import type { NewsItem } from '../../constants/news';

interface NewsDetailRelatedProps {
  items: NewsItem[];
}

export const NewsDetailRelated = ({ items }: NewsDetailRelatedProps) => {
  const { t } = useTranslation();

  if (items.length === 0) return null;

  return (
    <div className="w-full mt-16 sm:mt-20 border-t border-white/10 pt-12">
      {/* Heading Header Row */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-white text-[22px] sm:text-[26px] font-semibold tracking-tight">
          {t('news.otherNews', 'Oxşar Xəbərlər')}
        </h3>
        <Link
          to={PATHS.NEWS}
          className="text-white/60 hover:text-[#00f2ff] text-[14px] font-semibold transition-colors flex items-center gap-1.5 group select-none"
        >
          <span>{t('news.all', 'Hamısını gör')}</span>
          <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
        </Link>
      </div>

      {/* 3 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {items.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
