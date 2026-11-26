import { useTranslation } from 'react-i18next';
import { WaveDivider } from '@/components/WaveDivider';
import { ScrollReveal } from '../ScrollReveal';
import { PartnersTicker } from '../PartnersTicker';
import partnersBg from '@/assets/bg/partnersbg.jpg';

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
          <PartnersTicker />
        </div>
      </div>
    </section>
  );
};
