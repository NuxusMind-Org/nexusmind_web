import { WaveDivider } from '@/components/WaveDivider';

const PARTNER_NAMES = ['NexusMind', 'Bakı Psixologiya Mərkəzi'];
const PARTNER_REPEAT_COUNT = Math.max(1, Math.ceil(8 / PARTNER_NAMES.length));
const PARTNER_ITEMS = Array.from({ length: PARTNER_REPEAT_COUNT }, () => PARTNER_NAMES).flat();

export const PartnersSection = () => {
  return (
    <section id="partners" className="relative w-full" aria-label="Partners">
      <div
        className="relative w-full z-[10] pointer-events-none"
        style={{ marginTop: 'clamp(-80px, -6vw, -45px)' }}
      >
        <WaveDivider />
      </div>

      <div className="relative z-[11] w-full bg-white -mt-1 py-8 sm:py-10 md:py-14">
        <div className="group relative w-full overflow-hidden select-none flex">
          <div className="animate-ticker flex items-center gap-16 md:gap-24 pr-16 md:pr-24 shrink-0">
            {PARTNER_ITEMS.map((name, i) => (
              <span
                key={`track1-${i}`}
                className="text-[22px] sm:text-[26px] md:text-[28px] font-regular text-[#3D2A6B] whitespace-nowrap cursor-default ponnala-nudge"
              >
                {name}
              </span>
            ))}
          </div>

          <div className="animate-ticker flex items-center gap-16 md:gap-24 pr-16 md:pr-24 shrink-0" aria-hidden="true">
            {PARTNER_ITEMS.map((name, i) => (
              <span
                key={`track2-${i}`}
                className="text-[22px] sm:text-[26px] md:text-[28px] font-regular text-[#3D2A6B] whitespace-nowrap cursor-default ponnala-nudge"
              >
                {name}
              </span>
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
