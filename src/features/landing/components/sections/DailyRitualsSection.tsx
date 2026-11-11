import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import meditationBg from '@/assets/bg/meditation_bg_img.jpg';
import { PATHS } from '@/routes/paths';
import { ScrollReveal } from '../ScrollReveal';
import { WaveDivider } from '@/components/WaveDivider';

export const DailyRitualsSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section
      id="daily-rituals"
      className="relative w-full min-h-[540px] sm:min-h-[640px] md:min-h-[780px] lg:min-h-[820px] flex items-center justify-end overflow-hidden scroll-mt-20 pt-36 pb-20 sm:pt-44 sm:pb-24 md:pt-52 md:pb-32 -mt-1"
    >
      {/* ── Background Image ──────────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <img
          src={meditationBg}
          alt={t('features.card2Title', 'Gündəlik Rituallar')}
          className="w-full h-full object-cover object-center"
        />

        {/* Subtle gradient overlays to ensure crisp text legibility on the right and smooth wave transitions */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/35 via-black/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />
      </div>

      {/* ── Top Wave Divider Overlapping the Background Image ─────── */}
      <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">
        <WaveDivider reverse />
      </div>

      {/* ── Right-Aligned Foreground Content ──────────────────────── */}
      <ScrollReveal className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 flex flex-col items-end justify-center">
        <div className="flex flex-col items-start text-left w-full md:w-[46%] lg:w-[44%] ml-auto md:pl-6 lg:pl-10">
          <h2 className="font-title font-normal text-[34px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[68px] text-white leading-[1.08] mb-4 sm:mb-6 tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            {t('features.card2Title', 'Gündəlik Rituallar')}
          </h2>

          <p className="text-[16px] sm:text-[19px] md:text-[21px] lg:text-[22px] text-white/95 font-normal leading-relaxed mb-8 sm:mb-10 max-w-[540px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] ponnala-nudge">
            {t(
              'features.card2Desc',
              'Kiçik addımlarla psixoloji rifahını gücləndir. Nəfəs məşqləri, qısa meditasiya və gündəlik refleksiya ilə özünü daha balanslı hiss et.'
            )}
          </p>

          <button
            type="button"
            onClick={() => navigate(PATHS.TRAININGS)}
            className="inline-flex items-center justify-center bg-black hover:bg-neutral-900 active:scale-95 text-white font-medium text-[16px] sm:text-[18px] px-8 sm:px-10 py-3 sm:py-3.5 rounded-full border border-white/20 hover:border-white/50 shadow-[0_6px_25px_rgba(0,0,0,0.6)] transition-all duration-300 cursor-pointer select-none"
          >
            <span className="ponnala-nudge">{t('features.card2Cta', 'Bütün ritualları gör')}</span>
          </button>
        </div>
      </ScrollReveal>
    </section>
  );
};

