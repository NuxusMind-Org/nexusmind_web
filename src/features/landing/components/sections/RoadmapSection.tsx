import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import roadmap01 from '@/assets/roadmap01.png';
import roadmap02 from '@/assets/roadmap02.png';
import roadmap03 from '@/assets/roadmap03.png';
import { ScrollReveal } from '../ScrollReveal';
import { useRoadmapMascot } from '../../hooks/useRoadmapMascot';

const CARD_GRADIENTS = {
  1: 'linear-gradient(296.12deg, #0B4359 0%, #3D4A7A 28%, #6B64B0 68%, #7D76BC 100%)',
  2: 'linear-gradient(133.35deg, #2A0D61 5.59%, #5F91A6 82.77%)',
  3: 'linear-gradient(114.62deg, #7A6BB8 0%, #5C4A9E 38%, #3D1D72 68%, #301466 100%)',
} as const;

interface RoadmapCardProps {
  image: string;
  imageAlt: string;
  gradient: string;
  title: string;
  ctaLabel: string;
  onCta: () => void;
}

const RoadmapCard = ({ image, imageAlt, gradient, title, ctaLabel, onCta }: RoadmapCardProps) => (
  <div
    className="group relative w-full h-auto min-h-[360px] sm:min-h-[420px] md:min-h-[460px] lg:min-h-[500px] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden p-6 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-white/10 transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
    style={{
      backgroundColor: '#171717',
      backgroundImage: gradient,
    }}
  >
    <div className="relative z-10 flex flex-col justify-between h-full max-w-[62%] sm:max-w-[360px] md:max-w-[460px] lg:max-w-[520px]">
      <h3 className="text-white text-[22px] sm:text-[28px] md:text-[32px] lg:text-[38px] font-bold leading-tight sm:leading-[1.22] tracking-tight">
        {title}
      </h3>
      <button
        type="button"
        onClick={onCta}
        className="inline-flex items-center gap-3 text-white text-[15px] sm:text-[17px] md:text-[19px] lg:text-[20px] font-medium self-start cursor-pointer group/btn mt-6 sm:mt-10 transition-transform duration-200 hover:translate-x-1"
      >
        <span className="group-hover/btn:underline underline-offset-4">{ctaLabel}</span>
        <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border border-white/80 group-hover/btn:border-white group-hover/btn:bg-white/15 transition-all">
          <Icon icon="lucide:arrow-right" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </span>
      </button>
    </div>
    <img
      src={image}
      alt={imageAlt}
      className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 md:bottom-8 md:right-10 z-0 h-[68%] sm:h-[76%] md:h-[84%] lg:h-[88%] w-auto max-w-[46%] sm:max-w-[46%] md:max-w-[44%] max-h-[320px] sm:max-h-[380px] md:max-h-[440px] object-contain object-right-bottom pointer-events-none select-none transition-transform duration-500 group-hover:scale-105"
      aria-hidden="true"
    />
  </div>
);

const scrollToVrSection = () => {
  document.getElementById('vr')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const RoadmapSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    roadmapRef,
    card1Ref,
    card2Ref,
    card3Ref,
    arrowsVisible,
    arrow1Path,
    arrow1Chevron,
    arrow2Path,
    arrow2Chevron,
  } = useRoadmapMascot();

  const psychologistsTitle = t('roadmap.card1Title', 'Mütəxəssislər köməyilə çətinliklərdən azad ol !');
  const psychologistsCta = t('roadmap.ctaPsychologists', 'Psixoloqlar');
  const goToExperts = () => navigate('/experts');

  return (
    <section
      id="roadmap"
      className="relative w-full min-h-0 flex flex-col items-center justify-center px-3 sm:px-6 md:px-8 lg:px-10 xl:px-14 py-16 sm:py-24 md:py-32 scroll-mt-20"
    >
      <div className="w-full max-w-[1560px] 2xl:max-w-[1680px] mx-auto flex flex-col">
        <ScrollReveal className="w-full flex flex-col">
          <div className="text-center max-w-[900px] mx-auto mb-16 sm:mb-24 md:mb-36">
            <h2 className="text-[32px] sm:text-[46px] md:text-[52px] font-bold text-white mb-4 tracking-tight">
              {t('roadmap.title', 'Necə istifadə edəcəksən:')}
            </h2>
            <p className="text-[16px] sm:text-[20px] md:text-[22px] text-white/80">
              {t('roadmap.subtitle', 'Sən də bizimlə həyatdan yenidən zövq almağı öyrən')}
            </p>
          </div>
        </ScrollReveal>

        <div
          ref={roadmapRef}
          className="w-full relative flex flex-col gap-24 sm:gap-40 md:gap-[380px] lg:gap-[460px] pb-24 sm:pb-36 md:pb-[300px] lg:pb-[380px]"
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
            {arrow1Path && (
              <g style={{ opacity: arrowsVisible.a1 ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
                <path
                  d={arrow1Path}
                  fill="none"
                  stroke="#C9E4EA"
                  strokeWidth="1.75"
                  strokeDasharray="5 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={arrow1Chevron}
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            )}
            {arrow2Path && (
              <g style={{ opacity: arrowsVisible.a2 ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
                <path
                  d={arrow2Path}
                  fill="none"
                  stroke="#C9E4EA"
                  strokeWidth="1.75"
                  strokeDasharray="5 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={arrow2Chevron}
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            )}
          </svg>

          <ScrollReveal
            ref={card1Ref}
            className="w-full max-w-[540px] sm:max-w-[620px] md:max-w-[680px] lg:max-w-[720px] xl:max-w-[760px] relative self-center md:self-start"
          >
            <RoadmapCard
              image={roadmap01}
              imageAlt=""
              gradient={CARD_GRADIENTS[1]}
              title={psychologistsTitle}
              ctaLabel={psychologistsCta}
              onCta={goToExperts}
            />
          </ScrollReveal>

          <ScrollReveal
            ref={card2Ref}
            className="w-full max-w-[540px] sm:max-w-[620px] md:max-w-[680px] lg:max-w-[720px] xl:max-w-[760px] relative self-center md:self-end"
          >
            <RoadmapCard
              image={roadmap02}
              imageAlt=""
              gradient={CARD_GRADIENTS[2]}
              title={t('roadmap.card2Title', 'Vr konsultasiya ilə evdən çıxmağa belə ehtiyac yoxur !')}
              ctaLabel={t('roadmap.ctaVrTherapy', 'Vr terapiya')}
              onCta={scrollToVrSection}
            />
          </ScrollReveal>

          <ScrollReveal
            ref={card3Ref}
            className="w-full max-w-[540px] sm:max-w-[620px] md:max-w-[680px] lg:max-w-[720px] xl:max-w-[760px] relative self-center md:self-start"
          >
            <RoadmapCard
              image={roadmap03}
              imageAlt=""
              gradient={CARD_GRADIENTS[3]}
              title={t('roadmap.card3Title', 'Mütəxəssislər köməyilə çətinliklərdən azad ol !')}
              ctaLabel={psychologistsCta}
              onCta={goToExperts}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
