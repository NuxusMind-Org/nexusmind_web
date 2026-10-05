import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/components';
import { useAuthStore } from '@/store/authStore';
import { PATHS } from '@/routes/paths';
import type { LanguageCode } from '@/libs/i18n';
import { LandingNavbar } from '@/features/landing/components/LandingNavbar';
import { Footer } from '@/features/landing/components/Footer';

export const SettingsPage = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const { t, i18n } = useTranslation();

  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [sessionNotifications, setSessionNotifications] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');

  const languageOptions = [
    { code: 'az' as LanguageCode, label: 'Azərbaycan dili' },
    { code: 'en' as LanguageCode, label: 'English' },
    { code: 'ru' as LanguageCode, label: 'Русский' },
  ];

  const currentLangCode = (i18n.resolvedLanguage || i18n.language || 'az').slice(0, 2) as LanguageCode;
  const currentLang = languageOptions.find((l) => l.code === currentLangCode) || languageOptions[0];

  const handleLanguageChange = (code: LanguageCode) => {
    i18n.changeLanguage(code);
    setIsLanguageOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white bg-landing-gradient">
      <LandingNavbar activePage="settings" />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
        {/* Page Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-5xl font-light font-sans text-white tracking-tight">
            {t('webapp.settings.title', 'Tənzimləmələr')}
          </h1>
          <p className="text-white/70 text-sm sm:text-base">
            {t('webapp.settings.subtitle', 'Tətbiq təcrübənizi və bildiriş parametrlərini fərdiləşdirin.')}
          </p>
        </div>

        {/* Section 1: App Settings */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold text-[#03C6B2] tracking-widest uppercase">
            {t('webapp.settings.appSettings', 'Tətbiq Tənzimləmələri')}
          </span>

          <div className="w-full bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl">
            {/* Language Selection */}
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10 relative">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-400/20 text-[#03C6B2] flex items-center justify-center shrink-0">
                  <AppIcon icon="lucide:globe" size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-white">
                    {t('webapp.settings.language', 'Dil')}
                  </span>
                  <span className="text-xs text-white/60 mt-0.5">
                    {t('webapp.settings.languageDesc', 'İnterfeys dilini seçin')}
                  </span>
                </div>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-sm font-semibold text-white transition-colors cursor-pointer"
                >
                  <span>{currentLang.label}</span>
                  <AppIcon icon="lucide:chevron-down"
                    size={16}
                    className={`text-white/60 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isLanguageOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#1b0b38]/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl z-20 overflow-hidden py-1">
                    {languageOptions.map((opt) => (
                      <div
                        key={opt.code}
                        onClick={() => handleLanguageChange(opt.code)}
                        className={`px-4 py-2.5 text-sm font-medium cursor-pointer transition-colors flex items-center justify-between ${
                          currentLangCode === opt.code
                            ? 'bg-purple-600/30 text-[#03C6B2] font-semibold'
                            : 'text-white/80 hover:bg-white/10'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {currentLangCode === opt.code && <AppIcon icon="lucide:check" size={14} className="text-[#03C6B2]" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Daily Reminders */}
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-400/20 text-[#03C6B2] flex items-center justify-center shrink-0">
                  <AppIcon icon="lucide:bell" size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-white">
                    {t('webapp.settings.dailyReminders', 'Gündəlik Xatırlatmalar')}
                  </span>
                  <span className="text-xs text-white/60 mt-0.5">
                    {t('webapp.settings.dailyRemindersDesc', 'Gündəlik qeydlər və nəfəs məşqləri üçün bildirişlər alın')}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDailyReminders(!dailyReminders)}
                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 shrink-0 ${
                  dailyReminders ? 'bg-[#03C6B2]' : 'bg-white/20'
                }`}
              >
                <div
                  className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                    dailyReminders ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Session Notifications */}
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-400/20 text-[#03C6B2] flex items-center justify-center shrink-0">
                  <AppIcon icon="lucide:volume-2" size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-white">
                    {t('webapp.settings.sessionNotifications', 'Seans Bildirişləri')}
                  </span>
                  <span className="text-xs text-white/60 mt-0.5">
                    {t('webapp.settings.sessionNotificationsDesc', 'Yaxınlaşan psixoloq seansları barədə səsli xəbərdarlıqlar')}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSessionNotifications(!sessionNotifications)}
                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 shrink-0 ${
                  sessionNotifications ? 'bg-[#03C6B2]' : 'bg-white/20'
                }`}
              >
                <div
                  className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                    sessionNotifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Theme Selector */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-400/20 text-[#03C6B2] flex items-center justify-center shrink-0">
                  <AppIcon icon="lucide:palette" size={20} />
                </div>
                <span className="text-base font-semibold text-white">
                  {t('webapp.settings.appearance', 'Görünüş Mövzusu')}
                </span>
              </div>

              <div className="w-full bg-white/5 border border-white/10 p-1.5 rounded-2xl grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`py-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    theme === 'light'
                      ? 'bg-white text-purple-950 font-bold shadow-md'
                      : 'text-white/60 hover:text-white font-medium'
                  }`}
                >
                  <AppIcon icon="lucide:sun" size={18} />
                  <span className="text-xs">{t('webapp.settings.light', 'İşıqlı')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`py-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md'
                      : 'text-white/60 hover:text-white font-medium'
                  }`}
                >
                  <AppIcon icon="lucide:moon" size={18} />
                  <span className="text-xs">{t('webapp.settings.dark', 'Qaranlıq')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('system')}
                  className={`py-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    theme === 'system'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md'
                      : 'text-white/60 hover:text-white font-medium'
                  }`}
                >
                  <AppIcon icon="lucide:monitor" size={18} />
                  <span className="text-xs">{t('webapp.settings.system', 'Sistem')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Privacy & Account */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold text-[#03C6B2] tracking-widest uppercase">
            {t('webapp.settings.privacySecurity', 'Məxfilik və Təhlükəsizlik')}
          </span>

          <div className="w-full bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col gap-4 shadow-2xl">
            {/* Change Password Link */}
            <div
              onClick={() => navigate(PATHS.PROFILE)}
              className="flex items-center justify-between gap-4 py-3 cursor-pointer group hover:bg-white/5 rounded-2xl px-3 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-400/20 text-[#03C6B2] flex items-center justify-center shrink-0">
                  <AppIcon icon="lucide:lock" size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-white group-hover:text-[#03C6B2] transition-colors">
                    {t('webapp.settings.changePassword', 'Şifrəni Dəyişdir')}
                  </span>
                  <span className="text-xs text-white/60 mt-0.5">
                    {t('webapp.settings.changePasswordDesc', 'Hesabınızın təhlükəsizlik şifrəsini yeniləyin')}
                  </span>
                </div>
              </div>
              <AppIcon icon="lucide:chevron-right" size={18} className="text-white/40 group-hover:text-white transition-colors" />
            </div>

            {/* Logout button */}
            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-semibold text-sm transition-all cursor-pointer"
              >
                <AppIcon icon="lucide:log-out" size={16} />
                <span>{t('webapp.settings.logout', 'Çıxış')}</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
