import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/components';
import { LandingNavbar } from '@/features/landing/components/LandingNavbar';
import { Footer } from '@/features/landing/components/Footer';

export const NotificationsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white bg-landing-gradient">
      <LandingNavbar activePage="notifications" />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-5xl font-light font-sans text-white tracking-tight">
            {t('webapp.notifications.title', 'Bildirişlər')}
          </h1>
          <p className="text-white/70 text-sm sm:text-base">
            {t('webapp.notifications.subtitle', 'Sistem və seans xatırlatmalarınız.')}
          </p>
        </div>

        <div className="w-full bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center text-center gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#03C6B2] shadow-xl relative z-10">
            <AppIcon icon="lucide:bell" size={36} />
          </div>

          <div className="flex flex-col gap-2 max-w-md relative z-10">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight flex items-center justify-center gap-2">
              <AppIcon icon="lucide:sparkles" size={20} className="text-[#03C6B2]" />
              <span>{t('webapp.notifications.allCaughtUp', 'Hər şey qaydasındadır!')}</span>
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              {t('webapp.notifications.comingSoon', 'Hazırda oxunmamış yeni bildirişiniz yoxdur. Seanslarınız yaxınlaşdıqda və ya həkiminiz sizə mesaj yazdıqda burada bildiriş alacaqsınız.')}
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 relative z-10">
            <AppIcon icon="lucide:check-circle-2" size={14} className="text-emerald-400" />
            <span>{t('webapp.notifications.systemActive', 'Bildiriş sistemi aktivdir')}</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
