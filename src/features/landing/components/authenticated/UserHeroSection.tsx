import { useTranslation } from 'react-i18next';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import nexiePoster from '@/assets/nexie/nexie_pointer_new.png';
import nexieWebm from '@/assets/nexie/Nexie_reversed_transparent.webm';
import nexieHevc from '@/assets/nexie/Nexie_reversed_transparent.mov';
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
      className="relative w-full min-h-[calc(100vh-80px)] flex items-start justify-start px-4 sm:px-8 md:px-12 lg:px-0 lg:pl-[80px] pt-[100px] sm:pt-[120px] lg:pt-[160px] pb-0 scroll-mt-20 overflow-hidden"
    >
      <ScrollReveal className="w-full max-w-[1300px] flex flex-col relative z-20">
        <div className="flex flex-col justify-start items-start gap-4 sm:gap-6 w-full text-left">
          {/* Greeting Title — left-aligned in Caveat font */}
          <h1 className="text-[40px] sm:text-[60px] md:text-[72px] lg:text-[84px] font-bold text-white tracking-tight leading-[1.1] max-w-4xl text-left font-title font-['Caveat',cursive] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
            {t('webapp.dashboard.greeting', { name: displayName })}
          </h1>

          {children && <div className="w-full max-w-5xl flex flex-col gap-6 mt-4">{children}</div>}
        </div>
      </ScrollReveal>

      {/* Nexie Mascot — responsive half-height anchored to bottom waves */}
      <div className="absolute right-[-10px] sm:right-0 md:right-2 lg:right-[3%] bottom-0 md:bottom-[40px] lg:bottom-[48px] z-[15] pointer-events-none origin-bottom flex items-end justify-end h-[55%] sm:h-[65%] md:h-[70%] max-h-[675px] max-w-[60vw] sm:max-w-[52vw] lg:max-w-[675px] aspect-square">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={nexiePoster}
          className="w-full h-full object-contain object-bottom pointer-events-none select-none"
          aria-label="Nexie Mascot"
        >
          <source src={nexieHevc} type='video/mp4; codecs="hvc1"' />
          <source src={nexieWebm} type="video/webm" />
          <img
            src={nexiePoster}
            alt="Nexie Mascot"
            className="w-full h-full object-contain object-bottom pointer-events-none select-none"
          />
        </video>
      </div>
    </section>
  );
};
