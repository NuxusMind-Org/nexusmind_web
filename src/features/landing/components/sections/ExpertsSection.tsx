import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PATHS } from '@/routes/paths';
import { psychologists as fallbackPsychologists } from '../../data/psychologists';
import { ScrollReveal } from '../ScrollReveal';
import { doctorsApi } from '@/api/doctors.api';
import { mapDoctorToPsychologist } from '@/utils/mappers';
import type { Psychologist } from '../../types/psychologist.types';

export const ExpertsSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [experts, setExperts] = useState<Psychologist[]>(fallbackPsychologists);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctors = await doctorsApi.getAll();
        if (doctors && doctors.length > 0) {
          const currentLang = (i18n.language?.slice(0, 2) as 'az' | 'en' | 'ru') || 'az';
          const mapped = doctors.map(d => mapDoctorToPsychologist(d, currentLang));
          // If real doctors exist, prioritize them. If fewer than 4, pad with mock data to preserve the 4-card curve
          const realIds = new Set(mapped.map(m => m.id));
          const remainingFallbacks = fallbackPsychologists.filter(f => !realIds.has(f.id));
          const combined = [...mapped, ...remainingFallbacks];
          setExperts(combined.slice(0, Math.max(mapped.length, 4)));
        }
      } catch (error) {
        console.error('Failed to fetch real doctors from database:', error);
      }
    };
    fetchDoctors();
  }, [i18n.language]);

  return (
    <section
      id="experts"
      className="relative z-20 w-full flex flex-col items-center pt-10 sm:pt-12 md:pt-20 pb-24 sm:pb-28 md:pb-32 scroll-mt-20 bg-white overflow-hidden"
    >
      {/* Section Header */}
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center px-4 sm:px-8 text-center mb-6 sm:mb-8 md:mb-12">
        <ScrollReveal className="w-full text-center">
          <h2 className="text-[26px] sm:text-[36px] md:text-[44px] font-bold text-[#4A1FA8] mb-3 sm:mb-4 tracking-tight ponnala-nudge">
            {t('experts.title', 'Mütəxəssislərimiz :')}
          </h2>
          <p className="text-[16px] sm:text-[20px] md:text-[24px] text-[#4A1FA8] font-medium max-w-[280px] sm:max-w-3xl mx-auto ponnala-nudge text-balance">
            {t('experts.subtitle1', 'Psixoloqlar, Həyat bələdçiləri, Mindfulness terapistləri və s.')}
          </p>
        </ScrollReveal>
      </div>

      {/* Full-width Carousel spanning edge-to-edge */}
      <ScrollReveal className="w-full">
        <div className="w-full overflow-x-auto py-2 sm:py-12 md:py-20 px-4 sm:px-10 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="w-max mx-auto flex items-center h-[308px] sm:h-auto gap-4 sm:gap-6 lg:gap-7 px-2 sm:px-4">
            {experts.map((psych, index) => {
              // Creating a curve effect for cards (pattern repeats if more than 4)
              const mod4 = index % 4;
              let curveClass = '';
              if (mod4 === 0) curveClass = 'sm:translate-y-8 sm:-rotate-2';
              else if (mod4 === 1) curveClass = 'sm:-translate-y-2 sm:rotate-2';
              else if (mod4 === 2) curveClass = 'sm:-translate-y-2 sm:-rotate-2';
              else if (mod4 === 3) curveClass = 'sm:translate-y-8 sm:rotate-2';

              return (
                <div 
                  key={psych.id} 
                  className={`snap-center shrink-0 w-[210px] sm:w-[326px] group relative overflow-hidden rounded-[28px] h-[300px] sm:h-[413px] bg-[#1A2836] shadow-[0_18px_40px_rgba(15,23,42,0.28)] cursor-pointer transition-all duration-300 hover:scale-[1.02] ${curveClass}`}
                  onClick={() => navigate(PATHS.PSYCHOLOGIST.replace(':id', String(psych.id)))}
                >
                  <img 
                    src={psych.image} 
                    alt={psych.name} 
                    className="absolute inset-0 w-full h-full object-cover object-top" 
                  />

                  <div
                    className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(to top, #1A2836 0%, rgba(26,40,54,0.88) 38%, rgba(26,40,54,0.35) 68%, rgba(26,40,54,0) 100%)',
                    }}
                  />

                  <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center text-center px-4 sm:px-5 pb-5 sm:pb-6 pt-16">
                    <h3 className="text-white text-[18px] sm:text-[22px] font-medium leading-tight drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)] ponnala-nudge">
                      {psych.name}
                    </h3>
                    <p className="text-white/80 text-[12px] sm:text-[14px] font-light mt-1.5 leading-snug ponnala-nudge">
                      {psych.specialty || psych.title}
                    </p>
                    <div className="flex items-center justify-center text-white/90 text-[12px] sm:text-[13px] font-light gap-1.5 mt-3 group-hover:text-white transition-colors ponnala-nudge">
                      {t('experts.learnMore', 'Ətraflı məlumat al')}
                      <span aria-hidden="true">&gt;</span>
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
