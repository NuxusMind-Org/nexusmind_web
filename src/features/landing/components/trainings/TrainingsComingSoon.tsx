import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/components';
import { PATHS } from '@/routes/paths';

export const TrainingsComingSoon = () => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full max-w-[720px] bg-[#161226]/75 backdrop-blur-xl border border-purple-400/25 rounded-2xl p-8 sm:p-12 md:p-14 shadow-[0_25px_60px_rgba(0,0,0,0.5),_0_0_24px_rgba(103,0,255,0.14)] overflow-hidden text-center flex flex-col items-center gap-6">
      {/* Ambient corner glows */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#00F2FF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Heading & Description */}
      <div className="relative z-10 flex flex-col items-center gap-3 max-w-[540px]">
        <h1 className="font-title font-bold text-[42px] sm:text-[56px] md:text-[64px] text-white leading-[1.08] tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]">
          {t('trainings.comingSoonTitle', 'Tezliklə')}
        </h1>
        <p className="text-[15px] sm:text-[17px] text-white/80 font-light leading-relaxed">
          {t(
            'trainings.comingSoonDesc',
            'Peşəkar psixoloqlarımızın rəhbərliyi ilə onlayn və əyani təlimlər bölməsi tezliklə istifadəyə veriləcək. Yeniliklərdən xəbərdar olmaq üçün bizi izləyin.'
          )}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mt-2">
        <Link
          to={PATHS.EXPERTS}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#4A148F] hover:bg-[#5b1ab0] text-white text-[15px] font-semibold transition-all duration-300 shadow-[0_4px_20px_rgba(74,20,143,0.45)] border border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <span>{t('hero.secondary_cta', 'Psixoloqunu seç')}</span>
          <AppIcon icon="lucide:arrow-right" size={16} />
        </Link>
        <Link
          to={PATHS.HOME}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white/90 hover:text-white text-[15px] font-medium transition-all duration-300 border border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <AppIcon icon="lucide:home" size={16} />
          <span>{t('nav.home', 'Əsas səhifə')}</span>
        </Link>
      </div>
    </div>
  );
};
