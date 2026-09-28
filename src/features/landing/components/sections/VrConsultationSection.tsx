import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import vrNexie from '@/assets/svg/VR_Nexie.png';
import { PATHS } from '@/routes/paths';
import { ScrollReveal } from '../ScrollReveal';

export const VrConsultationSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section
      id="vr"
      className="relative w-full min-h-0 sm:min-h-[560px] md:min-h-[700px] flex items-center justify-center overflow-hidden scroll-mt-20 pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24"
      style={{ marginTop: 'clamp(-80px, -6vw, -45px)' }}
    >
      {/* ── Background Cosmic Video ───────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/bg/cosmic_bg.mp4" type="video/mp4" />
          <source
            src="/bg/Generating_cosmic_background_video_1080p_20260922051243 (1).mp4.mp4"
            type="video/mp4"
          />
        </video>

        {/* Subtle radial/horizontal gradient overlays to enhance typography readability while keeping cosmic brilliance */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />
      </div>

      {/* ── Foreground Content ────────────────────────────────────── */}
      <ScrollReveal className="relative z-10 w-full max-w-[1300px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 flex flex-col-reverse md:flex-row items-center justify-between gap-6 sm:gap-10 md:gap-14 lg:gap-20">
        {/* Left: Nexie Mascot wearing VR Goggles */}
        <div className="flex-1 flex justify-center md:justify-end items-center w-full">
          <div className="relative group">
            <img
              src={vrNexie}
              alt="Nexie VR Mascot"
              className="w-[240px] sm:w-[280px] md:w-[420px] lg:w-[480px] h-auto object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.7)] select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
              loading="eager"
            />
          </div>
        </div>

        {/* Right: Typography & CTA */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left max-w-[580px]">
          <h2 className="font-title font-normal text-[32px] sm:text-[48px] md:text-[74px] lg:text-[84px] text-white leading-[1.08] mb-3 sm:mb-6 tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            {t('vr.title', 'Vr konsultasiya')}
          </h2>

          <p className="text-[16px] sm:text-[19px] md:text-[21px] lg:text-[22px] text-white/95 font-normal leading-relaxed mb-8 sm:mb-10 max-w-[540px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] ponnala-nudge">
            {t(
              'vr.description',
              'Burada evdən çölə çıxmadan istədiyin konfort zonanı seçə və orada zaman keçirərək sakitləşə bilərsən.'
            )}
          </p>

          <button
            type="button"
            onClick={() => navigate(PATHS.REGISTER)}
            className="inline-flex items-center justify-center bg-black hover:bg-neutral-900 active:scale-95 text-white font-medium text-[16px] sm:text-[18px] px-8 sm:px-10 py-3 sm:py-3.5 rounded-full border border-white/20 hover:border-white/50 shadow-[0_6px_25px_rgba(0,0,0,0.6)] transition-all duration-300 cursor-pointer select-none"
          >
            <span className="ponnala-nudge">{t('vr.cta', 'İndi başla')}</span>
          </button>
        </div>
      </ScrollReveal>
    </section>
  );
};

