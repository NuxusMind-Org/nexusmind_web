import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Globe,
  Bell,
  Volume2,
  Palette,
  Sun,
  Moon,
  Monitor,
  ChevronDown,
  ChevronRight,
  Lock,
  Shield,
  HelpCircle,
  Mail,
  ExternalLink,
  LogOut,
  Check,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { PATHS } from '@/routes/paths';
import type { LanguageCode } from '@/libs/i18n';

export const SettingsPage = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const { t, i18n } = useTranslation();

  // Settings State
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [sessionNotifications, setSessionNotifications] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');

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
    <div className="w-full flex flex-col rounded-none lg:rounded-[38.93px] min-h-full overflow-hidden shadow-none lg:shadow-2xl bg-[#F8FAFC] animate-fade-in pb-12">
      {/* 1. Header Banner Section */}
      <div
        className="w-full flex items-center justify-center relative border-b border-black/5 rounded-none lg:rounded-t-[38.93px] h-[188px] shrink-0 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #CBE8FC 0%, #DDD4F8 33%, #F9D8E8 66%, #FFF5E6 100%)',
        }}
      >
        {/* Progressive blur layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backdropFilter: 'blur(3.89px)',
            WebkitBackdropFilter: 'blur(3.89px)',
          }}
        />

        {/* Title */}
        <h1
          className="relative z-10 text-[#1E0A42] font-normal text-[28px] sm:text-[36px] md:text-[46.72px] leading-[36px] sm:leading-[48px] md:leading-[59.84px] text-center tracking-[-0.96px] font-['Lexend',_sans-serif]"
        >
          {t('webapp.settings.title')}
        </h1>
      </div>

      {/* 2. Settings Main Body Container */}
      <div className="px-4 sm:px-8 md:px-12 pt-8 pb-12 flex flex-col w-full max-w-[1231px] mx-auto text-left flex-1 gap-8">
        
        {/* TƏTBİQ TƏNZİMLƏMƏLƏRİ Section */}
        <div className="flex flex-col w-full">
          {/* Section Header Label */}
          <span className="text-xs font-bold text-gray-400 tracking-[0.12em] uppercase mb-4 font-['Lexend',_sans-serif]">
            {t('webapp.settings.appSettings')}
          </span>

          {/* Settings Card Wrapper */}
          <div className="w-full bg-white border border-gray-100/80 rounded-[28px] shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 sm:p-8 flex flex-col gap-6">
            
            {/* Row 1: Dil (Language) */}
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-gray-100 relative">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F3F0F8] text-[#482476] flex items-center justify-center shrink-0 shadow-sm">
                  <Globe size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[#1E0A42] font-['Lexend',_sans-serif]">
                    {t('webapp.settings.language')}
                  </span>
                  <span className="text-xs text-gray-400 font-normal mt-0.5">
                    {t('webapp.settings.languageDesc')}
                  </span>
                </div>
              </div>

              {/* Language Dropdown Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-sm font-semibold text-[#1E0A42] transition-colors cursor-pointer"
                >
                  <span>{currentLang.label}</span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-200 ${
                      isLanguageOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isLanguageOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 overflow-hidden py-1">
                    {languageOptions.map((opt) => (
                      <div
                        key={opt.code}
                        onClick={() => handleLanguageChange(opt.code)}
                        className={`px-4 py-2.5 text-sm font-medium cursor-pointer transition-colors flex items-center justify-between ${
                          currentLangCode === opt.code
                            ? 'bg-[#38166D]/10 text-[#38166D] font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {currentLangCode === opt.code && <Check size={14} className="text-[#38166D]" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Row 2: Gündəlik Xatırlatmalar (Daily Reminders) */}
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F3F0F8] text-[#482476] flex items-center justify-center shrink-0 shadow-sm">
                  <Bell size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[#1E0A42] font-['Lexend',_sans-serif]">
                    {t('webapp.settings.dailyReminders')}
                  </span>
                  <span className="text-xs text-gray-400 font-normal mt-0.5">
                    {t('webapp.settings.dailyRemindersDesc')}
                  </span>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => setDailyReminders(!dailyReminders)}
                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 shrink-0 ${
                  dailyReminders ? 'bg-[#351465]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                    dailyReminders ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Row 3: Seans Bildirişləri (Session Notifications) */}
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F3F0F8] text-[#482476] flex items-center justify-center shrink-0 shadow-sm">
                  <Volume2 size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[#1E0A42] font-['Lexend',_sans-serif]">
                    {t('webapp.settings.sessionNotifications')}
                  </span>
                  <span className="text-xs text-gray-400 font-normal mt-0.5">
                    {t('webapp.settings.sessionNotificationsDesc')}
                  </span>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => setSessionNotifications(!sessionNotifications)}
                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 shrink-0 ${
                  sessionNotifications ? 'bg-[#351465]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                    sessionNotifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Row 4: Görünüş (Appearance Theme Selector) */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F3F0F8] text-[#482476] flex items-center justify-center shrink-0 shadow-sm">
                  <Palette size={18} />
                </div>
                <span className="text-base font-semibold text-[#1E0A42] font-['Lexend',_sans-serif]">
                  {t('webapp.settings.appearance')}
                </span>
              </div>

              {/* Segmented Control Bar */}
              <div className="w-full bg-[#F1F4FA] p-1.5 rounded-2xl grid grid-cols-3 gap-2">
                {/* Light Theme Button */}
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`py-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    theme === 'light'
                      ? 'bg-white text-[#38166D] font-semibold shadow-sm border border-gray-200/50'
                      : 'text-gray-500 hover:text-gray-800 font-medium'
                  }`}
                >
                  <Sun size={18} />
                  <span className="text-xs">{t('webapp.settings.light')}</span>
                </button>

                {/* Dark Theme Button */}
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`py-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-[#351465] text-white font-semibold shadow-sm'
                      : 'text-gray-500 hover:text-gray-800 font-medium'
                  }`}
                >
                  <Moon size={18} />
                  <span className="text-xs">{t('webapp.settings.dark')}</span>
                </button>

                {/* System Theme Button */}
                <button
                  type="button"
                  onClick={() => setTheme('system')}
                  className={`py-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    theme === 'system'
                      ? 'bg-white text-[#38166D] font-semibold shadow-sm border border-gray-200/50'
                      : 'text-gray-500 hover:text-gray-800 font-medium'
                  }`}
                >
                  <Monitor size={18} />
                  <span className="text-xs">{t('webapp.settings.system')}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* MƏXFİLİK VƏ TƏHLÜKƏSİZLİK Section */}
        <div className="flex flex-col w-full">
          {/* Section Header Label */}
          <span className="text-xs font-bold text-gray-400 tracking-[0.12em] uppercase mb-4 font-['Lexend',_sans-serif]">
            {t('webapp.settings.privacySecurity')}
          </span>

          {/* Settings Card Wrapper */}
          <div className="w-full bg-white border border-gray-100/80 rounded-[28px] shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 sm:p-8 flex flex-col gap-6">
            
            {/* Row 1: Şifrəni Dəyişdir */}
            <div
              onClick={() => navigate(PATHS.WEBAPP_PROFILE)}
              className="flex items-center justify-between gap-4 pb-6 border-b border-gray-100 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F3F0F8] text-[#482476] flex items-center justify-center shrink-0 shadow-sm group-hover:bg-[#482476] group-hover:text-white transition-colors">
                  <Lock size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[#1E0A42] font-['Lexend',_sans-serif] group-hover:text-[#482476] transition-colors">
                    {t('webapp.settings.changePassword')}
                  </span>
                  <span className="text-xs text-gray-400 font-normal mt-0.5">
                    {t('webapp.settings.changePasswordDesc')}
                  </span>
                </div>
              </div>

              <ChevronRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Row 2: Məlumat Məxfiliyi Tənzimləmələri */}
            <div className="flex items-center justify-between gap-4 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F3F0F8] text-[#482476] flex items-center justify-center shrink-0 shadow-sm group-hover:bg-[#482476] group-hover:text-white transition-colors">
                  <Shield size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[#1E0A42] font-['Lexend',_sans-serif] group-hover:text-[#482476] transition-colors">
                    {t('webapp.settings.dataPrivacy')}
                  </span>
                  <span className="text-xs text-gray-400 font-normal mt-0.5">
                    {t('webapp.settings.dataPrivacyDesc')}
                  </span>
                </div>
              </div>

              <ChevronRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>

          </div>
        </div>

        {/* DƏSTƏK Section */}
        <div className="flex flex-col w-full">
          {/* Section Header Label */}
          <span className="text-xs font-bold text-gray-400 tracking-[0.12em] uppercase mb-4 font-['Lexend',_sans-serif]">
            {t('webapp.settings.support')}
          </span>

          {/* Settings Card Wrapper */}
          <div className="w-full bg-white border border-gray-100/80 rounded-[28px] shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 sm:p-8 flex flex-col gap-6">
            
            {/* Row 1: Yardım Mərkəzi */}
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-gray-100 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F3F0F8] text-[#482476] flex items-center justify-center shrink-0 shadow-sm group-hover:bg-[#482476] group-hover:text-white transition-colors">
                  <HelpCircle size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[#1E0A42] font-['Lexend',_sans-serif] group-hover:text-[#482476] transition-colors">
                    {t('webapp.settings.helpCenter')}
                  </span>
                  <span className="text-xs text-gray-400 font-normal mt-0.5">
                    {t('webapp.settings.helpCenterDesc')}
                  </span>
                </div>
              </div>

              <ExternalLink size={18} className="text-gray-400 group-hover:text-[#482476] transition-colors" />
            </div>

            {/* Row 2: Bizimlə Əlaqə */}
            <div className="flex items-center justify-between gap-4 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F3F0F8] text-[#482476] flex items-center justify-center shrink-0 shadow-sm group-hover:bg-[#482476] group-hover:text-white transition-colors">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[#1E0A42] font-['Lexend',_sans-serif] group-hover:text-[#482476] transition-colors">
                    {t('webapp.settings.contactUs')}
                  </span>
                  <span className="text-xs text-gray-400 font-normal mt-0.5">
                    {t('webapp.settings.contactUsDesc')}
                  </span>
                </div>
              </div>

              <ChevronRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>

          </div>
        </div>

        {/* Section 5 Card 1: Hesabdan çıx */}
        <div className="p-6 sm:p-8 bg-white border border-gray-100/80 rounded-[28px] shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <h3 className="text-base sm:text-lg font-bold text-[#1E0A42] font-['Lexend',_sans-serif]">
              {t('webapp.settings.logout')}
            </h3>
            <p className="text-xs text-gray-500 font-normal mt-1">
              {t('webapp.settings.logoutDesc')}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-12 h-12 rounded-2xl bg-gray-50 hover:bg-red-50 text-[#1E0A42] hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer shrink-0 border border-gray-100"
            title={t('webapp.settings.logout')}
          >
            <LogOut size={22} />
          </button>
        </div>

        {/* Section 5 Card 2: Hesabı Sil */}
        <div className="p-6 sm:p-8 bg-[#FDF6F6]/50 border border-red-100 rounded-[28px] shadow-sm flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <h3 className="text-base sm:text-lg font-bold text-red-600 font-['Lexend',_sans-serif]">
              {t('webapp.settings.deleteAccount')}
            </h3>
            <p className="text-xs text-gray-500 font-normal mt-1">
              {t('webapp.settings.deleteAccountDesc')}
            </p>
          </div>

          <button
            onClick={() => {
              if (window.confirm(t('webapp.settings.deleteAccountConfirm'))) {
                handleLogout();
              }
            }}
            className="px-5 py-2 rounded-xl border border-red-500 text-red-600 hover:bg-red-600 hover:text-white text-sm font-semibold transition-colors cursor-pointer shrink-0 shadow-sm"
          >
            {t('webapp.settings.deleteAccountBtn')}
          </button>
        </div>

      </div>
    </div>
  );
};




