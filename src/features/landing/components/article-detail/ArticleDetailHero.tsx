import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppIcon, SmartImage } from '@/components';
import { PATHS } from '@/routes/paths';
import type { ArticleItem } from '../../constants/articles';

interface ArticleDetailHeroProps {
  item: ArticleItem;
}

export const ArticleDetailHero = ({ item }: ArticleDetailHeroProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-6 mb-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-white/50 text-breadcrumb sm:text-[16px] font-medium select-none overflow-x-auto no-scrollbar whitespace-nowrap">
        <Link to={PATHS.HOME} className="hover:text-white transition-colors duration-300">
          {t('nav.home', 'Ana səhifə')}
        </Link>
        <AppIcon icon="lucide:chevron-right" size={14} className="text-white/30 shrink-0" />
        <Link to={PATHS.ARTICLE} className="hover:text-white transition-colors duration-300">
          {t('articles.title', 'Məqalələr')}
        </Link>
        <AppIcon icon="lucide:chevron-right" size={14} className="text-white/30 shrink-0" />
        <span className="text-[#c39ffd] font-light truncate max-w-[260px] sm:max-w-[420px]">
          {item.title}
        </span>
      </nav>

      {/* Hero Section Split Layout */}
      <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between">
        {/* Left Info Column */}
        <div className="w-full lg:w-[48%] flex flex-col items-start text-left">
          {/* Category Badge with Dot Indicator */}
          <div className="flex items-center gap-2 bg-[#03c6b2]/10 border border-[#03c6b2]/20 px-3 py-1 rounded-full text-[#03c6b2] text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#03c6b2]" />
            <span>{item.categoryLabel}</span>
          </div>

          {/* Title */}
          <h1 className="text-[32px] sm:text-[40px] lg:text-[44px] font-sans font-bold text-white leading-tight mb-4 tracking-tight">
            {item.title}
          </h1>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 text-white/60 text-[12px] sm:text-[13px] font-normal tracking-wide mb-8">
            {item.date && (
              <div className="flex items-center gap-1.5">
                <AppIcon icon="lucide:calendar" size={14} className="text-white/40" />
                <span>{item.date}</span>
              </div>
            )}
            {item.readTime && (
              <div className="flex items-center gap-1.5">
                <AppIcon icon="lucide:clock" size={14} className="text-white/40" />
                <span>{item.readTime}</span>
              </div>
            )}
            {item.views > 0 && (
              <div className="flex items-center gap-1.5">
                <AppIcon icon="lucide:eye" size={14} className="text-white/40" />
                <span>
                  {item.views} {t('news.views', 'baxış')}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap gap-4 items-center">
            <button
              type="button"
              onClick={() => navigate(`${PATHS.HOME}#vr`)}
              className="px-8 py-3.5 bg-[#591b98] hover:bg-[#6c22b5] text-white font-semibold text-[14px] sm:text-[15px] rounded-full transition-all duration-300 shadow-[0_4px_14px_rgba(89,27,152,0.4)] hover:shadow-[0_6px_20px_rgba(89,27,152,0.6)] cursor-pointer flex items-center justify-center"
            >
              {t('hero.cta', 'İndi başla')}
            </button>
            <button
              type="button"
              onClick={() => navigate(PATHS.EXPERTS)}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-[14px] sm:text-[15px] rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center"
            >
              {t('hero.secondary_cta', 'Psixoloqunu seç')}
            </button>
          </div>
        </div>

        {/* Right Image Column */}
        <div className="w-full lg:w-[48%] aspect-[16/10] overflow-hidden rounded-lg border border-white/10 shadow-2xl relative bg-white/5">
          <SmartImage
            src={item.image}
            alt={item.title}
            fetchPriority="high"
            critical
            className="w-full h-full object-cover transform scale-100 hover:scale-[1.03] transition-transform duration-[3000ms] ease-out"
            loading="eager"
          />
          <div className="absolute inset-0 z-[2] bg-black/5 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
