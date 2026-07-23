import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import pillarsImage from '@/assets/pillars_image.png';
import { PILLARS } from '../../constants/pillars';
import { ScrollReveal } from '../ScrollReveal';

export const PillarsSection = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(1);

  return (
    <section
      id="pillars"
      className="relative w-full min-h-0 md:min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-[72px] py-10 md:py-20 scroll-mt-20"
    >
      <ScrollReveal className="w-full mx-auto flex flex-col lg:flex-row items-center lg:items-stretch gap-12 lg:gap-20">

        {/* Left Image */}
        <div className="w-full lg:w-[582px] h-[300px] sm:h-[400px] lg:h-[728px] flex-shrink-0 rounded-lg overflow-hidden shadow-2xl relative">
          <img
            src={pillarsImage}
            alt="6 Pillars of Psychological Health"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right Accordion */}
        <div className="w-full lg:w-[45%] xl:w-[50%] flex flex-col">
          <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-bold text-white mb-8 lg:mb-10 tracking-tight leading-tight">
            Psixoloji sağlamlığının 6 əsas sütunu
          </h2>

          <div className="flex flex-col gap-4">
            {PILLARS.map((item) => {
              const isOpen = openAccordion === item.id;
              const contentId = `pillar-content-${item.id}`;

              return (
                <div
                  key={item.id}
                  className={`flex flex-col rounded-lg overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'bg-[#F4F5F6] shadow-md' : 'bg-transparent hover:bg-white/5'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenAccordion(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="w-full flex items-center justify-between text-left py-[18px] px-6 cursor-pointer select-none rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                  >
                    <span
                      className={`text-[16px] sm:text-[17px] font-medium transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? 'text-[#1a2b3c]' : 'text-white'
                      }`}
                    >
                      {item.title}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? 'rotate-180 text-[#1a2b3c]' : 'rotate-0 text-white'
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
                      <div
                        className={`pb-5 px-6 -mt-1 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isOpen ? 'translate-y-0' : '-translate-y-1'
                        }`}
                      >
                        <p className="text-[#475467] text-[13px] sm:text-[14px] leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </ScrollReveal>
    </section>
  );
};

