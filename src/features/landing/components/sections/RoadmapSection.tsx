import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
    className="relative w-full h-auto min-h-[280px] sm:min-h-[320px] md:h-[356px] md:min-h-[356px] rounded-[20px] overflow-hidden pt-6 pr-7 pb-6 pl-7 flex flex-col gap-2"
    style={{
      backgroundColor: '#171717',
      backgroundImage: gradient,
    }}
  >
    <div className="relative z-10 flex flex-col gap-2 max-w-[58%] sm:max-w-[260px]">
      <h3 className="text-white text-[18px] sm:text-[20px] md:text-[22px] font-medium leading-snug ponnala-nudge">
        {title}
      </h3>
      <button
        type="button"
        onClick={onCta}
        className="inline-flex items-center gap-2 text-white text-[14px] sm:text-[15px] self-start cursor-pointer group"
      >
        <span className="ponnala-nudge">{ctaLabel}</span>
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-white/80 group-hover:border-white transition-colors">
          <ArrowRight size={14} />
        </span>
      </button>
    </div>
    <img
      src={image}
      alt={imageAlt}
      className="absolute bottom-2 right-2 z-0 h-[72%] sm:h-[80%] md:h-[88%] w-auto max-w-[58%] object-contain object-right-bottom pointer-events-none select-none"
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
      className="relative w-full min-h-0 md:min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-[72px] py-10 md:py-20 scroll-mt-20"
    >
      <div className="w-full max-w-[1100px] mx-auto flex flex-col">
        <ScrollReveal className="w-full flex flex-col">
          <div className="text-center mb-10 md:mb-24">
            <h2 className="text-[30px] sm:text-[44px] font-bold text-white mb-3 tracking-tight ponnala-nudge">
              {t('roadmap.title', 'Necə istifadə edəcəksən:')}
            </h2>
            <p className="text-[15px] sm:text-[19px] text-white/80 ponnala-nudge">
              {t('roadmap.subtitle', 'Sən də bizimlə həyatdan yenidən zövq almağı öyrən')}
            </p>
          </div>
        </ScrollReveal>

        <div ref={roadmapRef} className="w-full max-w-[1100px] mx-auto relative flex flex-col gap-8 sm:gap-24 md:gap-[240px] pb-12 md:pb-[200px]">
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

          <ScrollReveal ref={card1Ref} className="w-full max-w-[530px] relative self-center md:self-auto">
            <RoadmapCard
              image={roadmap01}
              imageAlt=""
              gradient={CARD_GRADIENTS[1]}
              title={psychologistsTitle}
              ctaLabel={psychologistsCta}
              onCta={goToExperts}
            />
          </ScrollReveal>

          <ScrollReveal ref={card2Ref} className="w-full max-w-[530px] relative self-center md:self-end">
            <RoadmapCard
              image={roadmap02}
              imageAlt=""
              gradient={CARD_GRADIENTS[2]}
              title={t('roadmap.card2Title', 'Vr konsultasiya ilə evdən çıxmağa belə ehtiyac yoxur !')}
              ctaLabel={t('roadmap.ctaVrTherapy', 'Vr terapiya')}
              onCta={scrollToVrSection}
            />
          </ScrollReveal>

          <ScrollReveal ref={card3Ref} className="w-full max-w-[530px] relative self-center md:self-auto">
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
