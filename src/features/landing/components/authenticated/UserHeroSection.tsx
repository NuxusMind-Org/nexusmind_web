import { useTranslation } from 'react-i18next';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import nexiePointer from '@/assets/nexie/nexie_pointer_new.webp';
import { ScrollReveal } from '../ScrollReveal';

interface UserHeroSectionProps {
  children?: React.ReactNode;
}

export const UserHeroSection = ({ children }: UserHeroSectionProps = {}) => {
  const { t } = useTranslation();
  const { data: user } = useCurrentUser();
  const displayName = user?.name ? user.name.trim().split(' ')[0] : t('webapp.dashboard.defaultName', 'Dostum');

  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100vh-110px)] sm:min-h-[calc(100vh-120px)] flex items-start sm:items-center justify-start px-4 sm:px-8 md:px-12 lg:px-0 lg:pl-[80px] pt-[132px] sm:pt-[110px] lg:pt-[120px] pb-16 sm:pb-[110px] lg:pb-[130px] scroll-mt-20 overflow-hidden"
    >
      <ScrollReveal className="w-full max-w-[1300px] flex flex-col relative z-20">
        <div className="flex flex-col justify-start items-start gap-4 sm:gap-6 w-full text-left">
          {/* Greeting Title — left-aligned in Caveat font */}
          <h1 className="text-[40px] sm:text-[60px] md:text-[72px] lg:text-[84px] font-bold text-white tracking-tight leading-[1.1] max-w-4xl text-left font-title font-['Caveat',cursive] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
            {t('webapp.dashboard.greeting', { name: displayName })}
          </h1>
          <p className="text-[14px] min-[400px]:text-[15px] sm:text-[18px] md:text-[20px] lg:text-[24px] xl:text-[26px] text-white/95 max-w-xl md:max-w-2xl lg:max-w-3xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] ponnala-nudge">
            {t('hero.subtitle', 'Peşəkar psixoloqla online seansı seç, daxili rahatlığı tap.')}
          </p>

          {children && <div className="w-full max-w-5xl flex flex-col gap-6 mt-4">{children}</div>}
        </div>
      </ScrollReveal>

      {/* Nexie Mascot — responsive half-height anchored to bottom waves */}
      <div className="absolute right-[-25px] min-[390px]:right-[-100px] sm:right-0 md:right-2 lg:right-[3%] bottom-0 md:bottom-[-10px] xl:bottom-[-8px] z-[15] pointer-events-none origin-bottom flex items-end justify-end h-[52%] min-[400px]:h-[54%] sm:h-[65%] md:h-[70%] max-h-[675px] w-auto max-w-none sm:max-w-[52vw] lg:max-w-[675px] aspect-square">
        <img
          src={nexiePointer}
          alt="Nexie Mascot"
          width={1080}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-contain object-bottom pointer-events-none select-none"
        />
      </div>
    </section>
  );
};
