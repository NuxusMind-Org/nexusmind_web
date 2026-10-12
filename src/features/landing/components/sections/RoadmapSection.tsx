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
  badge?: string;
  image: string;
  imageAlt: string;
  gradient: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaLabel: string;
  onCta: () => void;
}

const RoadmapCard = ({
  badge,
  image,
  imageAlt,
  gradient,
  title,
  subtitle,
  description,
  ctaLabel,
  onCta,
}: RoadmapCardProps) => (
  <div
    className="group relative w-full h-auto min-h-[420px] sm:min-h-[460px] md:min-h-[480px] lg:min-h-[520px] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden p-6 sm:p-9 md:p-11 lg:p-12 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-white/10 transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
    style={{
      backgroundColor: '#171717',
      backgroundImage: gradient,
    }}
  >
    <div className="relative z-10 flex flex-col justify-between h-full w-full max-w-[48%] md:max-w-[46%]">
      <div className="flex flex-col gap-2.5 sm:gap-3.5">
        {badge && (
          <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white/90 text-[11px] sm:text-xs font-semibold tracking-wider uppercase shadow-sm">
            <span>{badge}</span>
          </div>
        )}
        <h3 className="text-white text-[22px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-bold leading-tight sm:leading-[1.2] tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-cyan-200/95 sm:text-white/90 font-medium text-[14px] sm:text-[16px] md:text-[17px] leading-snug max-w-full">
            {subtitle}
          </p>
        )}
        {description && (
          <p className="text-white/80 text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed max-w-full">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onCta}
        className="inline-flex items-center gap-3 text-white text-[15px] sm:text-[17px] md:text-[18px] lg:text-[19px] font-medium self-start cursor-pointer group/btn mt-6 sm:mt-8 transition-transform duration-200 hover:translate-x-1"
      >
        <span className="group-hover/btn:underline underline-offset-4">{ctaLabel}</span>
        <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full border border-white/80 group-hover/btn:border-white group-hover/btn:bg-white/15 transition-all">
          <Icon icon="lucide:arrow-right" className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5" />
        </span>
      </button>
    </div>
    <img
      src={image}
      alt={imageAlt}
      className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 md:bottom-7 md:right-8 z-0 h-[62%] sm:h-[72%] md:h-[80%] lg:h-[84%] w-auto max-w-[42%] sm:max-w-[42%] md:max-w-[40%] max-h-[300px] sm:max-h-[360px] md:max-h-[420px] object-contain object-right-bottom pointer-events-none select-none transition-transform duration-500 group-hover:scale-105"
      aria-hidden="true"
    />
  </div>
);

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

  const goToLogin = () => navigate('/login');
  const goToJournal = () => navigate('/journal');
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
              badge={t('roadmap.card1Badge', 'Addım 01')}
              image={roadmap01}
              imageAlt={t('roadmap.card1Title', 'Özünə Yol Tap')}
              gradient={CARD_GRADIENTS[1]}
              title={t('roadmap.card1Title', 'Özünə Yol Tap')}
              subtitle={t('roadmap.card1Subtitle', 'Hər şey özünü anlamaqla başlayır.')}
              description={t(
                'roadmap.card1Desc',
                'Kiçik testlər və gündəlik qeydlərlə emosional vəziyyətini kəşf et. Sistemimiz stress səviyyəni ölçüb sənə özəl ilk addımları təklif edir. Neksi bu yolda bələdçin olmağa hazırdır!'
              )}
              ctaLabel={t('roadmap.card1Cta', 'Özünü kəşf et')}
              onCta={goToLogin}
            />
          </ScrollReveal>

          <ScrollReveal
            ref={card2Ref}
            className="w-full max-w-[540px] sm:max-w-[620px] md:max-w-[680px] lg:max-w-[720px] xl:max-w-[760px] relative self-center md:self-end"
          >
            <RoadmapCard
              badge={t('roadmap.card2Badge', 'Addım 02')}
              image={roadmap02}
              imageAlt={t('roadmap.card2Title', 'Yalnız Deyilsən')}
              gradient={CARD_GRADIENTS[2]}
              title={t('roadmap.card2Title', 'Yalnız Deyilsən')}
              subtitle={t('roadmap.card2Subtitle', 'Çətinlikləri tək aşmaq məcburiyyətində deyilsən.')}
              description={t(
                'roadmap.card2Desc',
                'Səni anlayan peşəkar mütəxəssislərlə istədiyin an, tam məxfi və təhlükəsiz əlaqə qur. Onlayn, əyani və ya VR konsultasiya — seçim sənindir.'
              )}
              ctaLabel={t('roadmap.card2Cta', 'Mütəxəssislər')}
              onCta={goToExperts}
            />
          </ScrollReveal>

          <ScrollReveal
            ref={card3Ref}
            className="w-full max-w-[540px] sm:max-w-[620px] md:max-w-[680px] lg:max-w-[720px] xl:max-w-[760px] relative self-center md:self-start"
          >
            <RoadmapCard
              badge={t('roadmap.card3Badge', 'Addım 03')}
              image={roadmap03}
              imageAlt={t('roadmap.card3Title', 'Yenilən və İrəli Get')}
              gradient={CARD_GRADIENTS[3]}
              title={t('roadmap.card3Title', 'Yenilən və İrəli Get')}
              subtitle={t('roadmap.card3Subtitle', 'Kiçik addımlar, böyük dəyişikliklər yaradır.')}
              description={t(
                'roadmap.card3Desc',
                'Nəfəs texnikaları ilə zehnini sakitləşdir, "Hekayəni paylaş" bölməsində istədiyin an səsli və ya yazılı danış. Ağıllı "Qeyd dəftərçəsi" ilə inkişafını izlə və daxili balansını bərpa et.'
              )}
              ctaLabel={t('roadmap.card3Cta', 'Qeyd dəftərçəsi')}
              onCta={goToJournal}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
