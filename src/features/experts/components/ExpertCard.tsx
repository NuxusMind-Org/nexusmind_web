import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/components';
import { PATHS } from '@/routes/paths';
import type { Psychologist } from '@/features/landing/types/psychologist.types';
import defaultAvatar from '@/assets/avatar1.png';

interface ExpertCardProps {
  expert: Psychologist;
}

export const ExpertCard = ({ expert }: ExpertCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState(expert.image || defaultAvatar);

  const handleCardClick = () => {
    navigate(PATHS.PSYCHOLOGIST.replace(':id', String(expert.id)));
  };

  return (
    <div
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      role="button"
      tabIndex={0}
      className="group relative w-full aspect-[350/470] rounded-[24px] overflow-hidden bg-[#1A2836] border border-white/10 hover:border-white/20 shadow-[0_12px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_44px_rgba(0,0,0,0.5)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between p-5 select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
    >
      {/* 1. Full-bleed Doctor Portrait Image - Bright, sharp and clear */}
      <img
        src={imgSrc}
        alt={expert.name}
        onError={() => setImgSrc(defaultAvatar)}
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none brightness-[1.04] contrast-[1.02]"
        loading="lazy"
      />

      {/* 2. Focused Bottom Scrim - Strictly leaves the top 52%+ of the portrait 100% clear and bright */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(12, 18, 28, 0.95) 0%, rgba(12, 18, 28, 0.78) 22%, rgba(12, 18, 28, 0.32) 36%, rgba(12, 18, 28, 0.04) 44%, transparent 48%)',
        }}
      />

      {/* 3. Top Floating Badges */}
      <div className="relative z-10 w-full flex items-center justify-between gap-2 pointer-events-none">
        {/* Experience Pill */}
        {expert.experience ? (
          <div className="bg-[#1A2836]/75 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-white/90 border border-white/15 shadow-sm">
            {expert.experience}
          </div>
        ) : (
          <div />
        )}

        {/* Rating Pill */}
        <div className="bg-[#1A2836]/75 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 text-[#00f2ff] border border-white/15 shadow-sm">
          <AppIcon icon="lucide:star" size={13} fill="currentColor" />
          <span>{expert.rating ? expert.rating.toFixed(1) : '5.0'}</span>
        </div>
      </div>

      {/* 4. Bottom Content Layer */}
      <div className="relative z-10 w-full flex flex-col items-center text-center mt-auto pt-4">
        {/* Doctor Name */}
        <h3 className="text-[22px] sm:text-[24px] font-bold text-white leading-tight line-clamp-1 drop-shadow-sm font-sans">
          {expert.name}
        </h3>

        {/* Specialty / Title */}
        <p className="text-[14px] sm:text-[15px] text-white/85 font-normal line-clamp-1 mt-1 font-sans">
          {expert.specialty || expert.title || t('experts.defaultSpecialty', 'Klinik Psixoloq')}
        </p>

        {/* Subtle Tags / Focus Areas */}
        {expert.tags && expert.tags.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2.5 max-h-6 overflow-hidden">
            {expert.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="bg-white/10 backdrop-blur-sm text-white/80 text-[11px] px-2.5 py-0.5 rounded-full border border-white/10 font-medium line-clamp-1 max-w-[130px]"
              >
                {tag}
              </span>
            ))}
            {expert.tags.length > 2 && (
              <span className="text-[11px] text-white/60 font-medium px-1">
                +{expert.tags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* 5. Bottom Action & Pricing Row */}
        <div className="w-full flex items-center justify-between pt-3 mt-3 border-t border-white/15">
          {/* Price */}
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
              {t('experts.priceLabel', 'Qiymət')}
            </span>
            <span className="text-[15px] font-bold text-white leading-tight">
              {expert.price || 50} AZN
              <span className="text-[11px] font-normal text-white/50 ml-1">
                {t('experts.perSession', '/ seans')}
              </span>
            </span>
          </div>

          {/* Action Link: Learn More with Chevron */}
          <div className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-white/90 group-hover:text-white transition-all duration-300 py-1.5 px-3 rounded-full bg-white/10 group-hover:bg-white/15 border border-white/10 group-hover:border-white/20 shadow-sm">
            <span>{t('experts.learnMore', 'Ətraflı məlumat al')}</span>
            <AppIcon
              icon="lucide:chevron-right"
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1 text-white/80 group-hover:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
