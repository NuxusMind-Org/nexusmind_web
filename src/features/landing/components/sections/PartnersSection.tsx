import { WaveDivider } from '@/components/WaveDivider';
import bpmPurpleLogo from '@/assets/purple_bpm_logo_new.jpeg';
import nexusmindPurpleLogo from '@/assets/nexusmind_purple_logo.jpeg';

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
    logo: nexusmindPurpleLogo,
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
  const renderTrack = (trackKey: string, ariaHidden?: boolean) => (
    <div
      className="animate-ticker flex items-center gap-16 md:gap-28 pr-16 md:pr-28 shrink-0"
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
      <div
        className="relative w-full z-[10] pointer-events-none"
        style={{ marginTop: 'clamp(-50px, -3.6vw, -28px)' }}
      >
        <WaveDivider />
      </div>

      <div className="relative z-[11] w-full bg-white -mt-1 py-8 sm:py-10 md:py-14">
        <div className="group relative w-full overflow-hidden select-none flex">
          {renderTrack('track1')}
          {renderTrack('track2', true)}
        </div>
      </div>

      <div className="relative w-full z-[10] pointer-events-none -mt-1">
        <WaveDivider reverse />
      </div>
    </section>
  );
};
