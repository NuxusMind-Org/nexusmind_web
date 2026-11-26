import { useTranslation } from 'react-i18next';
import { WaveDivider } from '@/components/WaveDivider';
import { ScrollReveal } from '../ScrollReveal';
import partnersBg from '@/assets/bg/partnersbg.jpg';
import nexusmindPurpleLogo from '@/assets/svg/new_nexusmind_logo_full_bg_removed_purple.svg';
import bpmPurpleLogo from '@/assets/purple_bpm_logo_new.jpeg';

export const PartnersSection = () => {
  const { t } = useTranslation();

  return (
    <section id="partners" className="relative w-full scroll-mt-20" aria-label="Partners">
      {/* Top Wave Divider overlapping RoadmapSection and PartnersSection */}
      <div
        className="relative w-full z-[12] pointer-events-none"
        style={{ marginTop: 'clamp(-50px, -3.6vw, -28px)' }}
      >
        <WaveDivider />
      </div>

      {/* Main Compact Section Container */}
      <div className="relative z-[11] w-full bg-white -mt-1 pt-2 sm:pt-3 md:pt-4 flex flex-col items-center overflow-hidden">
        {/* Top Title & Purple Partner Logos */}
        <ScrollReveal className="relative z-20 flex flex-col items-center text-center px-4">
          <h2 className="font-title font-bold italic text-[36px] sm:text-[50px] md:text-[62px] lg:text-[70px] text-[#6D54B5] leading-[1.08] tracking-wide">
            {t('partners.title', 'Exclusive Partnership')}
          </h2>

          <div
            className="mt-2.5 sm:mt-3.5 flex items-center justify-center gap-4 sm:gap-7 md:gap-9 flex-wrap"
            aria-label={t('partners.subtitle', 'NexusMind / Baku Psychological Center')}
          >
            <img
              src={nexusmindPurpleLogo}
              alt="NexusMind"
              width={2322}
              height={774}
              className="h-7 sm:h-9 md:h-11 w-auto max-w-[140px] sm:max-w-[190px] md:max-w-[230px] object-contain select-none"
              loading="lazy"
              decoding="async"
            />
            <span
              className="h-6 sm:h-8 w-px bg-[#6D54B5]/25 shrink-0"
              aria-hidden="true"
            />
            <img
              src={bpmPurpleLogo}
              alt="Bakı Psixologiya Mərkəzi"
              width={2689}
              height={884}
              className="h-8 sm:h-10 md:h-12 w-auto max-w-[140px] sm:max-w-[190px] md:max-w-[230px] object-contain mix-blend-multiply select-none"
              loading="lazy"
              decoding="async"
            />
          </div>
        </ScrollReveal>

        {/* Compact Full-Bleed Puzzle-Hands Artwork */}
        <div className="relative z-10 w-full overflow-hidden max-h-[210px] sm:max-h-[300px] md:max-h-[360px] lg:max-h-[410px] xl:max-h-[450px] 2xl:max-h-[520px]">
          <img
            src={partnersBg}
            alt=""
            aria-hidden="true"
            width={2752}
            height={1536}
            className="w-full h-auto block select-none pointer-events-none -mt-[11%]"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};
