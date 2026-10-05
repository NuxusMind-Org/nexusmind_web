import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/components';
import { PATHS } from '@/routes/paths';
import { TechniqueCard } from '../components/TechniqueCard';
import { LandingNavbar } from '@/features/landing/components/LandingNavbar';
import { Footer } from '@/features/landing/components/Footer';

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
      tag: t('webapp.miniGames.techniques.standard', 'Standart'),
      title: t('webapp.miniGames.techniques.naturalBreathing', 'Təbii Nəfəs Alma'),
      imageSrc: miniGame01,
      steps: (Array.isArray(naturalSteps) ? naturalSteps : []).map((text, idx) => ({ number: idx + 1, text })),
    },
    {
      id: 'box-breathing',
      tag: t('webapp.miniGames.techniques.box', 'Kvadrat'),
      title: t('webapp.miniGames.techniques.boxBreathing', 'Kvadrat Nəfəs Texnikası'),
      imageSrc: miniGame02,
      steps: (Array.isArray(boxSteps) ? boxSteps : []).map((text, idx) => ({ number: idx + 1, text })),
    },
    {
      id: 'alternate-nostril',
      tag: t('webapp.miniGames.techniques.pranayama', 'Pranayama'),
      title: t('webapp.miniGames.techniques.alternateNostril', 'Növbəli Burun Dəliyi ilə Nəfəs'),
      imageSrc: miniGame03,
      steps: (Array.isArray(pranayamaSteps) ? pranayamaSteps : []).map((text, idx) => ({ number: idx + 1, text })),
    },
    {
      id: 'ocean-sound',
      tag: t('webapp.miniGames.techniques.ujjayi', 'Ujjayi'),
      title: t('webapp.miniGames.techniques.oceanSound', 'Okean Səsi Nəfəs Texnikası'),
      imageSrc: miniGame04,
      steps: (Array.isArray(ujjayiSteps) ? ujjayiSteps : []).map((text, idx) => ({ number: idx + 1, text })),
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white bg-landing-gradient">
      <LandingNavbar activePage="mini-games" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10">
        {/* Header Banner */}
        <div className="flex flex-col gap-3 text-center items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#03C6B2] text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <AppIcon icon="lucide:sparkles" size={14} />
            <span>{t('webapp.miniGames.tag', 'Zehin və Bədən Balansı')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-light font-sans text-white tracking-tight max-w-3xl leading-tight">
            {t('webapp.miniGames.headerTitle', 'Nəfəs Məşqləri və Sakitləşdirici Texnikalar')}
          </h1>
          <p className="text-white/70 text-sm sm:text-base max-w-xl">
            {t('webapp.miniGames.headerSubtitle', 'Günün gərginliyindən uzaqlaşın, zehni aydınlığı və daxili rahatlığı bərpa edin.')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full justify-items-center">
          {techniques.map((item) => (
            <TechniqueCard
              key={item.id}
              tag={item.tag}
              title={item.title}
              steps={item.steps}
              imageSrc={item.imageSrc}
              onStart={() => {
                navigate(PATHS.BREATHING_GAME);
              }}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};
