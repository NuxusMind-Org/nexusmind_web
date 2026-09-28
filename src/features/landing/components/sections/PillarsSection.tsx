import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { PILLARS } from '../../constants/pillars';
import { ScrollReveal } from '../ScrollReveal';
import { WaveDivider } from '@/components/WaveDivider';

export const PillarsSection = () => {
  const { t } = useTranslation();
  const [openAccordion, setOpenAccordion] = useState<number | null>(1);

  const localizedPillars = PILLARS.map((item) => ({
    id: item.id,
    title: t(`pillars.p${item.id}Title`, item.title),
    content: t(`pillars.p${item.id}Content`, item.content),
  }));

  return (
    <section id="pillars" className="relative w-full overflow-hidden scroll-mt-20">
      <div
        className="relative w-full z-[10] pointer-events-none"
        style={{ marginTop: 'clamp(-216px, -16.5vw, -108px)' }}
      >
        <WaveDivider />
      </div>

      <div className="relative z-[11] w-full bg-white -mt-1 px-4 sm:px-8 md:px-12 lg:px-[72px] py-12 md:py-16">
        <ScrollReveal className="w-full max-w-[900px] mx-auto flex flex-col">
          <h2 className="text-[24px] sm:text-[32px] lg:text-[46px] font-bold text-[#3D2A6B] mb-8 lg:mb-10 tracking-tight leading-tight text-center ponnala-nudge">
            {t('pillars.title', 'Psixoloji sağlamlığının 6 əsas sütunu')}
          </h2>

          <div className="flex flex-col gap-2">
            {localizedPillars.map((item) => {
              const isOpen = openAccordion === item.id;
              const contentId = `pillar-content-${item.id}`;

              return (
                <div
                  key={item.id}
                  className={`flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'bg-[#E8F4F5] shadow-sm' : 'bg-transparent'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenAccordion(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="w-full flex items-center justify-between text-left py-4 sm:py-5 px-4 sm:px-6 cursor-pointer select-none rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5C63]/30"
                  >
                    <span className="text-[16px] sm:text-[20px] font-semibold text-[#0F5C63] pr-3 leading-snug ponnala-nudge">
                      {item.title}
                    </span>
                    <ChevronDown
                      size={22}
                      className={`shrink-0 text-[#0F5C63] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </button>

                  <div
                    id={contentId}
                    role="region"
                    className={`grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-5 px-4 sm:px-6 -mt-1">
                        <p className="text-[#0F5C63]/80 text-[15px] sm:text-[17px] leading-relaxed ponnala-nudge">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>

      <div className="relative w-full z-[10] pointer-events-none -mt-1">
        <WaveDivider reverse />
      </div>
    </section>
  );
};
