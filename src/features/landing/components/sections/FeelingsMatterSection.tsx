import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import feelingsBg from '@/assets/bg/Change_image_color_tones_7440143b_2K.jpg';
import { PATHS } from '@/routes/paths';
import { useAuthStore } from '@/store/authStore';
import { ScrollReveal } from '../ScrollReveal';
import { WaveDivider } from '@/components/WaveDivider';

export const FeelingsMatterSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleNavigate = () => {
    if (isAuthenticated) {
      navigate(PATHS.JOURNAL);
    } else {
      navigate(PATHS.REGISTER);
    }
  };

  return (
    <section
      id="feelings-matter"
      className="relative w-full min-h-[600px] sm:min-h-[700px] md:min-h-[860px] lg:min-h-[900px] flex items-center justify-start overflow-hidden scroll-mt-20 pt-36 pb-36 sm:pt-44 sm:pb-44 md:pt-52 md:pb-52 -mt-1"
    >
      {/* ── Background Image ──────────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <img
          src={feelingsBg}
          alt={t('features.card1Title', 'Sənin hisslərin önəmlidir.')}
          className="w-full h-full object-cover object-center"
        />

        {/* Subtle gradient overlays to ensure crisp text legibility on the left and smooth wave transitions */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />
      </div>

      {/* ── Top Wave Divider Overlapping the Background Image ─────── */}
      <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">
        <WaveDivider reverse />
      </div>

      {/* ── Left-Aligned Foreground Content ───────────────────────── */}
      <ScrollReveal className="relative z-20 w-full max-w-[1300px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 flex flex-col items-start justify-center">
        <div className="flex flex-col items-start text-left w-full md:w-1/2">
          <h2 className="font-title font-normal text-[34px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[68px] text-white leading-[1.08] mb-4 sm:mb-6 tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            {t('features.card1Title', 'Sənin hisslərin önəmlidir.')}
          </h2>

          <p className="text-[16px] sm:text-[19px] md:text-[21px] lg:text-[22px] text-white/95 font-normal leading-relaxed mb-8 sm:mb-10 max-w-[540px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] ponnala-nudge">
            {t(
              'features.card1Desc',
              'Bu platforma düşüncələrini anlamaq, emosiyalarını idarə etmək və gündəlik streslə daha sağlam şəkildə başa çıxmaq üçün hazırlanıb. Sən burada tək deyilsən. Sevdiyin bir məkan seç və terapiyaya başla.'
            )}
          </p>

          <button
            type="button"
            onClick={handleNavigate}
            className="inline-flex items-center justify-center bg-black hover:bg-neutral-900 active:scale-95 text-white font-medium text-[16px] sm:text-[18px] px-8 sm:px-10 py-3 sm:py-3.5 rounded-full border border-white/20 hover:border-white/50 shadow-[0_6px_25px_rgba(0,0,0,0.6)] transition-all duration-300 cursor-pointer select-none"
          >
            <span className="ponnala-nudge">{t('features.card1Cta', 'İndi başla')}</span>
          </button>
        </div>
      </ScrollReveal>
    </section>
  );
};

