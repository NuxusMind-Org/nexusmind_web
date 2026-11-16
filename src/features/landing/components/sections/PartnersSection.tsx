import { useTranslation } from 'react-i18next';
import { WaveDivider } from '@/components/WaveDivider';
import { ScrollReveal } from '../ScrollReveal';
import partnersBg from '@/assets/bg/partnersbg.jpg';
import bpmPurpleLogo from '@/assets/purple_bpm_logo_new.jpeg';
import nexusmindFullLogo from '@/assets/svg/new_nexusmind_logo_full_bg_removed_purple.svg';

interface Partner {
  id: string;
  name: string;
  logo: string;
  className?: string;
}

const PARTNER_LOGOS: Partner[] = [
  {
    id: 'nexusmind',
    name: 'NexusMind',
    logo: nexusmindFullLogo,
    className: 'h-9 sm:h-11 md:h-12 max-w-[190px] sm:max-w-[230px] md:max-w-[270px]',
  },
  {
    id: 'bpm',
    name: 'Bakı Psixologiya Mərkəzi',
    logo: bpmPurpleLogo,
    className: 'h-[42px] sm:h-[50px] md:h-[56px] max-w-[190px] sm:max-w-[230px] md:max-w-[270px]',
  },
];

const PARTNER_REPEAT_COUNT = Math.max(1, Math.ceil(8 / PARTNER_LOGOS.length));
const PARTNER_ITEMS = Array.from({ length: PARTNER_REPEAT_COUNT }, () => PARTNER_LOGOS).flat();

export const PartnersSection = () => {
  const { t } = useTranslation();

  const renderTrack = (trackKey: string, ariaHidden?: boolean) => (
    <div
      className="animate-ticker flex items-center gap-16 sm:gap-20 md:gap-28 pr-16 sm:pr-20 md:pr-28 shrink-0"
      aria-hidden={ariaHidden ? 'true' : undefined}
    >
      {PARTNER_ITEMS.map((partner, i) => (
        <div
          key={`${trackKey}-${i}`}
          className="flex items-center justify-center h-12 sm:h-14 md:h-16 shrink-0 cursor-default"
        >
          <img
            src={partner.logo}
            alt={partner.name}
            className={`w-auto object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105 ${
              partner.className || 'h-10 sm:h-12 md:h-14 max-w-[200px] sm:max-w-[260px] md:max-w-[320px]'
            }`}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );

  return (
    <section id="partners" className="relative w-full" aria-label="Partners">
      {/* Top Wave Divider overlapping RoadmapSection and PartnersSection */}
      <div
        className="relative w-full z-[12] pointer-events-none"
        style={{ marginTop: 'clamp(-50px, -3.6vw, -28px)' }}
      >
        <WaveDivider />
      </div>

      {/* Main Section Container with partnersbg.jpg as Background */}
      <div
        className="relative z-[11] w-full bg-white bg-cover bg-center bg-no-repeat -mt-1 min-h-[460px] sm:min-h-[580px] md:min-h-[720px] lg:min-h-[820px] pt-2 sm:pt-4 md:pt-6 pb-10 sm:pb-14 md:pb-18 flex flex-col justify-between overflow-hidden"
        style={{ backgroundImage: `url(${partnersBg})` }}
      >
        {/* Top Title & Subtitle */}
        <ScrollReveal className="relative z-20 flex flex-col items-center text-center px-4">
          <h2 className="font-title font-bold italic text-[38px] sm:text-[54px] md:text-[68px] lg:text-[76px] text-[#6D54B5] leading-[1.08] tracking-wide">
            {t('partners.title', 'Exclusive Partnership')}
          </h2>
          <p className="font-sans text-[15px] sm:text-[19px] md:text-[23px] lg:text-[25px] text-[#75629E] font-normal tracking-wide mt-1 sm:mt-2">
            {t('partners.subtitle', 'NexusMind / Baku Psychological Center')}
          </p>
        </ScrollReveal>

        {/* Bottom Right-to-Left Sliding Partner Logos */}
        <div className="relative z-20 w-full mt-auto">
          <div className="group relative w-full overflow-hidden select-none flex">
            {renderTrack('track1')}
            {renderTrack('track2', true)}
          </div>
        </div>
      </div>
    </section>
  );
};
