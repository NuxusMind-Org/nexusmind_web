import bpmPurpleLogo from '@/assets/purple_bpm_logo_new.webp';
import nexusmindFullLogo from '@/assets/svg/new_nexusmind_logo_full_bg_removed_purple.webp';

export interface PartnerLogo {
  id: string;
  name: string;
  logo: string;
  className?: string;
}

const PARTNER_LOGOS: PartnerLogo[] = [
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

export interface PartnersTickerProps {
  className?: string;
  compact?: boolean;
}

export const PartnersTicker = ({ className = '', compact = false }: PartnersTickerProps) => {
  const renderTrack = (trackKey: string, ariaHidden?: boolean) => (
    <div
      className={`animate-ticker flex items-center shrink-0 ${
        compact
          ? 'gap-14 sm:gap-18 md:gap-24 pr-14 sm:pr-18 md:pr-24'
          : 'gap-16 sm:gap-20 md:gap-28 pr-16 sm:pr-20 md:pr-28'
      }`}
      aria-hidden={ariaHidden ? 'true' : undefined}
    >
      {PARTNER_ITEMS.map((partner, i) => (
        <div
          key={`${trackKey}-${i}`}
          className={`flex items-center justify-center shrink-0 cursor-default ${
            compact ? 'h-10 sm:h-11 md:h-12' : 'h-12 sm:h-14 md:h-16'
          }`}
        >
          <img
            src={partner.logo}
            alt={partner.name}
            className={`w-auto object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105 ${
              compact
                ? partner.id === 'bpm'
                  ? 'h-9 sm:h-10 md:h-11 max-w-[160px] sm:max-w-[200px] md:max-w-[230px]'
                  : 'h-8 sm:h-9 md:h-10 max-w-[160px] sm:max-w-[200px] md:max-w-[230px]'
                : partner.className || 'h-10 sm:h-12 md:h-14 max-w-[200px] sm:max-w-[260px] md:max-w-[320px]'
            }`}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className={`group relative w-full overflow-hidden select-none flex ${className}`}>
      {renderTrack('track1')}
      {renderTrack('track2', true)}
    </div>
  );
};
