import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppIcon, CircularGallery } from '@/components';
import { PATHS } from '@/routes/paths';
import { psychologists as fallbackPsychologists } from '../../data/psychologists';
import { ScrollReveal } from '../ScrollReveal';
import { doctorsApi } from '@/api/doctors.api';
import { mapDoctorToPsychologist } from '@/utils/mappers';
import type { Psychologist } from '../../types/psychologist.types';
import { useAuthStore } from '@/store/authStore';
import { NextSessionSection } from './NextSessionSection';

export const ExpertsSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [experts, setExperts] = useState<Psychologist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        const doctors = await doctorsApi.getAll();
        if (isMounted) {
          if (doctors && doctors.length > 0) {
            const currentLang = (i18n.language?.slice(0, 2) as 'az' | 'en' | 'ru') || 'az';
            const mapped = doctors.map(d => mapDoctorToPsychologist(d, currentLang));
            // Use real doctors data from database
            setExperts(mapped);
          } else {
            setExperts(fallbackPsychologists);
          }
        }
      } catch (error) {
        console.error('Failed to fetch real doctors from database:', error);
        if (isMounted) {
          setExperts(fallbackPsychologists);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    fetchDoctors();
    return () => {
      isMounted = false;
    };
  }, [i18n.language]);

  const galleryItems = useMemo(
    () =>
      experts.map((psych) => ({
        id: psych.id,
        image: psych.image,
        text: psych.name,
        subtext: psych.specialty || psych.title,
        actionText: t('experts.learnMore', 'Ətraflı məlumat al'),
      })),
    [experts, t]
  );

  return (
    <section
      id="experts"
      className="relative z-20 w-full flex flex-col items-center pt-10 sm:pt-12 md:pt-20 pb-24 sm:pb-28 md:pb-32 scroll-mt-20 bg-white overflow-hidden"
    >
      {/* Post-Registration Next Session Section */}
      {isAuthenticated && (
        <div className="w-full px-4 sm:px-8 lg:px-[56px] mb-10 sm:mb-12 md:mb-14">
          <ScrollReveal className="w-full">
            <NextSessionSection />
          </ScrollReveal>
        </div>
      )}

      {/* Section Header */}
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center px-4 sm:px-8 text-center mb-6 sm:mb-8 md:mb-10">
        <ScrollReveal className="w-full text-center">
          <h2 className="text-[26px] sm:text-[36px] md:text-[44px] font-bold text-[#4A1FA8] mb-3 sm:mb-4 tracking-tight ponnala-nudge">
            {t('experts.title', 'Mütəxəssislərimiz :')}
          </h2>
          <p className="text-[16px] sm:text-[20px] md:text-[24px] text-[#4A1FA8] font-medium max-w-[280px] sm:max-w-3xl mx-auto ponnala-nudge text-balance">
            {t('experts.subtitle1', 'Psixoloqlar, Həyat bələdçiləri, Mindfulness terapistləri və s.')}
          </p>
        </ScrollReveal>
      </div>

      {/* Circular Gallery Section */}
      <ScrollReveal className="w-full">
        <div
          id="experts-gallery"
          className="w-full h-[480px] sm:h-[560px] md:h-[620px] relative my-2 sm:my-4 flex items-center justify-center"
        >
          {isLoading && experts.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-3 border-[#4A1FA8]/20 border-t-[#4A1FA8] rounded-full animate-spin" />
              <p className="text-[#4A1FA8]/70 text-sm font-medium">
                {t('common.loading', 'Yüklənir...')}
              </p>
            </div>
          ) : (
            <CircularGallery
              items={galleryItems}
              bend={-1}
              textColor="#4A1FA8"
              borderRadius={0.07}
              scrollEase={0.02}
              scrollSpeed={2}
              font="bold 28px Afacad, sans-serif"
              onItemClick={(item) => {
                if (item.id) {
                  navigate(PATHS.PSYCHOLOGIST.replace(':id', String(item.id)));
                }
              }}
            />
          )}
        </div>

        {/* View all experts navigation link */}
        <div className="w-full flex justify-center mt-6 sm:mt-10 px-4">
          <button
            type="button"
            onClick={() => navigate(PATHS.EXPERTS)}
            className="group inline-flex items-center gap-2 text-[#4A1FA8] hover:text-[#381582] text-[16px] sm:text-[18px] font-semibold transition-colors duration-200 cursor-pointer select-none"
          >
            <span className="hover:underline underline-offset-4">{t('experts.viewAll', 'Bütün mütəxəssislərə bax')}</span>
            <AppIcon icon="lucide:arrow-right" size={20} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </div>
      </ScrollReveal>
    </section>
  );
};
