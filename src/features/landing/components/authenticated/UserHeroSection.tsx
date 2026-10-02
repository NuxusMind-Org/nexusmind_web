import { useTranslation } from 'react-i18next';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';

interface UserHeroSectionProps {
  children?: React.ReactNode;
}

export const UserHeroSection = ({ children }: UserHeroSectionProps) => {
  const { t } = useTranslation();
  const { data: user } = useCurrentUser();
  const displayName = user?.name ? user.name.trim().split(' ')[0] : t('webapp.dashboard.defaultName', 'Dostum');

  return (
    <div className="w-full flex flex-col items-center justify-center pt-[104px] sm:pt-[116px] md:pt-[128px] pb-12 px-4 sm:px-8 md:px-12 lg:px-[72px] text-center relative z-20">
      {/* Greeting Header */}
      <h1 className="text-[40px] sm:text-[60px] md:text-[72px] lg:text-[84px] font-bold text-white tracking-tight leading-[1.1] max-w-4xl mb-4 font-title font-['Caveat',cursive] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
        {t('webapp.dashboard.greeting', { name: displayName })}
      </h1>

      <p className="text-white/70 text-sm sm:text-lg max-w-xl mb-8 font-light">
        {t('landing.userSubtitle', 'Zehninin sakitliyini və sağlamlığını qorumaq üçün gündəlik rutininə davam et.')}
      </p>

      {/* Embedded Widgets (e.g. MoodSelector, NextSession) */}
      {children && <div className="w-full max-w-5xl flex flex-col gap-6">{children}</div>}
    </div>
  );
};
