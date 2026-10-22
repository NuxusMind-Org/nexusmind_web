import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import nexiePoster from '@/assets/nexie/nexie_pointer_new.png';
import nexieWebm from '@/assets/nexie/Nexie_reversed_transparent.webm';
import nexieHevc from '@/assets/nexie/Nexie_reversed_transparent.mov';
import { ScrollReveal } from '../ScrollReveal';
import { HeroActiveCard } from './HeroActiveCard';

export const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isCardOpen, setIsCardOpen] = useState(false);

  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100vh-80px)] flex items-start justify-start px-4 sm:px-8 md:px-12 lg:px-0 lg:pl-[80px] pt-[100px] sm:pt-[120px] lg:pt-[160px] pb-0 scroll-mt-20 overflow-hidden"
    >
      <ScrollReveal className="w-full max-w-[1300px] flex flex-col relative z-20">
        <div className="relative w-full">
          {/* Default Title & CTA Buttons — Fades out when card opens */}
          <div
            className={`flex flex-col justify-start items-start gap-6 md:gap-12 w-full text-left transition-all duration-500 ease-in-out ${isCardOpen
              ? 'opacity-0 pointer-events-none -translate-x-6 invisible absolute top-0 left-0'
              : 'opacity-100 pointer-events-auto translate-x-0 relative visible'
              }`}
          >
            <div className="flex flex-col gap-3 sm:gap-6 w-full">
              <h1 className="text-[36px] sm:text-[60px] md:text-[72px] lg:text-[84px] font-bold text-white tracking-tight leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] font-title">
                {t('hero.title', 'Özünü kəşf etməyə hazırsan?')}
              </h1>
              <p className="text-[14px] min-[400px]:text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] text-white/95 whitespace-nowrap max-w-none leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] ponnala-nudge">
                {t('hero.subtitle', 'Sıxıntıdan qurtul, rahat nəfəs al və həyatdan zövq al!')}
              </p>
            </div>

            {/*
             * Buttons — mobile: left-aligned, width capped to ~58% of the row
             * so they naturally clear the Nexie standing in the bottom-right.
             * sm+: auto width, side-by-side row.
             */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 w-[58%] sm:w-auto">
              <button
                type="button"
                onClick={() => setIsCardOpen(true)}
                className="group relative w-full sm:w-auto sm:min-w-[200px] h-[52px] sm:h-[54px] bg-[#4A148F] text-white text-center px-6 sm:px-8 rounded-[100px] text-[16px] sm:text-[20px] font-semibold flex items-center justify-center transition-transform duration-300 ease-out active:scale-[0.95] cursor-pointer shadow-[0_4px_20px_rgba(74,20,143,0.4)]"
              >
                {/* Animated Border */}
                <div
                  className="absolute inset-0 rounded-[100px] pointer-events-none overflow-hidden"
                  style={{
                    padding: '2px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                >
                  <div
                    className="absolute left-1/2 top-1/2 w-[200%] aspect-square -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-out group-hover:rotate-90"
                    style={{
                      background: 'conic-gradient(from 315deg, #6700FF 0%, rgba(255, 255, 255, 0.04) 25%, #FFFFFF 50%, rgba(255, 255, 255, 0.07) 75%, #6700FF 100%)'
                    }}
                  />
                </div>
                <span className="relative z-10 ponnala-nudge">{t('hero.cta', 'İndi başla')}</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/experts')}
                className="group relative w-full sm:w-auto sm:min-w-[200px] h-[52px] sm:h-[54px] bg-white text-[#4A148F] text-center px-6 sm:px-8 rounded-[100px] text-[16px] sm:text-[20px] font-semibold flex items-center justify-center transition-transform duration-300 ease-out active:scale-[0.95] cursor-pointer shadow-[0_4px_15px_rgba(255,255,255,0.15)]"
              >
                {/* Animated Border */}
                <div
                  className="absolute inset-0 rounded-[100px] pointer-events-none overflow-hidden"
                  style={{
                    padding: '2px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                >
                  <div
                    className="absolute left-1/2 top-1/2 w-[200%] aspect-square -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-out group-hover:rotate-90"
                    style={{
                      background: 'conic-gradient(from 315deg, #6700FF 0%, rgba(255, 255, 255, 0.04) 25%, #FFFFFF 50%, rgba(255, 255, 255, 0.07) 75%, #6700FF 100%)'
                    }}
                  />
                </div>
                <span className="relative z-10 ponnala-nudge">{t('hero.secondary_cta', 'Psixoloqlara bax')}</span>
              </button>
            </div>
          </div>

          {/* Blank White Card — Fades in and spans to Nexie's hand */}
          <div
            className={`w-full sm:max-w-[90%] md:max-w-[80%] lg:max-w-[50%] xl:max-w-[52%] transition-all duration-500 ease-in-out ${isCardOpen
              ? 'opacity-100 pointer-events-auto translate-x-0 relative visible'
              : 'opacity-0 pointer-events-none translate-x-6 invisible absolute top-0 left-0'
              }`}
          >
            <HeroActiveCard onClose={() => setIsCardOpen(false)} />
          </div>
        </div>
      </ScrollReveal>

      {/*
       * Nexie Mascot — responsive half-height anchored to bottom waves.
       * Constrained to ~50% of hero section height so it never overlaps the navbar
       * even at 125%+ browser zoom or on short laptop viewports.
       */}
      <div className="absolute right-[-10px] sm:right-0 md:right-2 lg:right-[3%] bottom-0 md:bottom-[40px] lg:bottom-[48px] z-[15] pointer-events-none origin-bottom flex items-end justify-end h-[55%] sm:h-[65%] md:h-[70%] max-h-[675px] max-w-[60vw] sm:max-w-[52vw] lg:max-w-[675px] aspect-square">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={nexiePoster}
          className="w-full h-full object-contain object-bottom pointer-events-none select-none"
          aria-label="Nexie Mascot"
        >
          <source src={nexieHevc} type='video/mp4; codecs="hvc1"' />
          <source src={nexieWebm} type="video/webm" />
          <img
            src={nexiePoster}
            alt="Nexie Mascot"
            className="w-full h-full object-contain object-bottom pointer-events-none select-none"
          />
        </video>
      </div>

    </section>
  );
};
