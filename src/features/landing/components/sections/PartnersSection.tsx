import { WaveDivider } from '@/components/WaveDivider';
import bpmPurpleLogo from '@/assets/bpm_purple_logo.jpeg';
import nexusmindPurpleLogo from '@/assets/nexusmind_purple_logo.jpeg';

interface Partner {
  id: string;
  name: string;
  logo: string;
}

const PARTNER_LOGOS: Partner[] = [
  { id: 'nexusmind', name: 'NexusMind', logo: nexusmindPurpleLogo },
  { id: 'bpm', name: 'Bakı Psixologiya Mərkəzi', logo: bpmPurpleLogo },
];

const PARTNER_REPEAT_COUNT = Math.max(1, Math.ceil(8 / PARTNER_LOGOS.length));
const PARTNER_ITEMS = Array.from({ length: PARTNER_REPEAT_COUNT }, () => PARTNER_LOGOS).flat();

export const PartnersSection = () => {
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
          <div className="animate-ticker flex items-center gap-16 md:gap-28 pr-16 md:pr-28 shrink-0">
            {PARTNER_ITEMS.map((partner, i) => (
              <div
                key={`track1-${i}`}
                className="flex items-center justify-center shrink-0 cursor-default"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-10 sm:h-12 md:h-14 w-auto max-w-[200px] sm:max-w-[260px] md:max-w-[320px] object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="animate-ticker flex items-center gap-16 md:gap-28 pr-16 md:pr-28 shrink-0" aria-hidden="true">
            {PARTNER_ITEMS.map((partner, i) => (
              <div
                key={`track2-${i}`}
                className="flex items-center justify-center shrink-0 cursor-default"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-10 sm:h-12 md:h-14 w-auto max-w-[200px] sm:max-w-[260px] md:max-w-[320px] object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full z-[10] pointer-events-none -mt-1">
        <WaveDivider reverse />
      </div>
    </section>
  );
};
