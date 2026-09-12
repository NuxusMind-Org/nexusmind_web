import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { PATHS } from '@/routes/paths';
import { TechniqueCard } from '../components/TechniqueCard';

import miniGame01 from '@/assets/svg/miniGame01.svg';
import miniGame02 from '@/assets/svg/miniGame02.svg';
import miniGame03 from '@/assets/svg/miniGame03.svg';
import miniGame04 from '@/assets/svg/miniGame04.svg';

export const MiniGamesPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const naturalSteps = t('webapp.miniGames.techniques.naturalSteps', { returnObjects: true }) as string[];
  const boxSteps = t('webapp.miniGames.techniques.boxSteps', { returnObjects: true }) as string[];
  const pranayamaSteps = t('webapp.miniGames.techniques.pranayamaSteps', { returnObjects: true }) as string[];
  const ujjayiSteps = t('webapp.miniGames.techniques.ujjayiSteps', { returnObjects: true }) as string[];

  const techniques = [
    {
      id: 'natural-breathing',
      tag: t('webapp.miniGames.techniques.standard'),
      title: t('webapp.miniGames.techniques.naturalBreathing'),
      imageSrc: miniGame01,
      steps: (Array.isArray(naturalSteps) ? naturalSteps : []).map((text, idx) => ({ number: idx + 1, text })),
    },
    {
      id: 'box-breathing',
      tag: t('webapp.miniGames.techniques.box'),
      title: t('webapp.miniGames.techniques.boxBreathing'),
      imageSrc: miniGame02,
      steps: (Array.isArray(boxSteps) ? boxSteps : []).map((text, idx) => ({ number: idx + 1, text })),
    },
    {
      id: 'alternate-nostril',
      tag: t('webapp.miniGames.techniques.pranayama'),
      title: t('webapp.miniGames.techniques.alternateNostril'),
      imageSrc: miniGame03,
      steps: (Array.isArray(pranayamaSteps) ? pranayamaSteps : []).map((text, idx) => ({ number: idx + 1, text })),
    },
    {
      id: 'ocean-sound',
      tag: t('webapp.miniGames.techniques.ujjayi'),
      title: t('webapp.miniGames.techniques.oceanSound'),
      imageSrc: miniGame04,
      steps: (Array.isArray(ujjayiSteps) ? ujjayiSteps : []).map((text, idx) => ({ number: idx + 1, text })),
    },
  ];

  return (
    <div className="w-full flex flex-col rounded-none lg:rounded-[38.93px] min-h-full overflow-hidden shadow-none lg:shadow-2xl bg-white animate-fade-in pb-16">
      {/* 1. Top Header Banner Section */}
      <div
        className="w-full relative px-4 sm:px-8 py-10 sm:py-14 flex flex-col items-center justify-center text-center border-b border-black/5 rounded-none lg:rounded-t-[38.93px] shrink-0"
        style={{
          background: 'linear-gradient(135deg, #CBE8FC 0%, #DDD4F8 33%, #F9D8E8 66%, #FFF5E6 100%)',
        }}
      >
        {/* Top-Right Close Button */}
        <button
          onClick={() => navigate(PATHS.DASHBOARD)}
          className="absolute top-5 right-5 sm:top-8 sm:right-8 text-[#1E0A42]/70 hover:text-[#1E0A42] hover:bg-black/5 p-2 rounded-full transition-colors cursor-pointer z-10"
          aria-label={t('webapp.miniGames.close')}
        >
          <X size={24} />
        </button>

        {/* Centered Main Title */}
        <h1 className="text-[26px] sm:text-[36px] md:text-[44px] font-normal text-[#1E0A42] tracking-[-0.96px] leading-tight font-['Lexend',_sans-serif] max-w-[900px]">
          {t('webapp.miniGames.headerTitle')}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg font-semibold text-[#7B2CBF] mt-2 font-['Lexend',_sans-serif]">
          {t('webapp.miniGames.headerSubtitle')}
        </p>
      </div>

      {/* 2. Cards Grid Container Section */}
      <div className="px-4 sm:px-8 md:px-12 py-10 sm:py-14 flex flex-col w-full max-w-[1231px] mx-auto text-left flex-1">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full justify-items-center">
          {techniques.map((item) => (
            <TechniqueCard
              key={item.id}
              tag={item.tag}
              title={item.title}
              steps={item.steps}
              imageSrc={item.imageSrc}
              onStart={() => {
                navigate(PATHS.WEBAPP_BREATHING_GAME);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

