import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/components';
import { PATHS } from '@/routes/paths';

export const UserQuickActivities = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
      {/* 1. Calming Breath Card */}
      <div
        className="relative overflow-hidden rounded-3xl p-6 sm:p-7 text-white shadow-xl flex flex-col justify-between min-h-[170px] border border-white/15 transition-all duration-300 hover:scale-[1.01]"
        style={{
          background: 'linear-gradient(135deg, rgba(6, 151, 107, 0.75) 0%, rgba(56, 160, 111, 0.6) 50%, rgba(14, 77, 45, 0.8) 100%)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-white/20 text-white border border-white/25">
              {t('webapp.miniGames.techniques.standard', 'Texnika')}
            </span>
            <h3 className="text-xl font-semibold text-white mt-2.5 mb-1">
              {t('webapp.dashboard.calmingBreathTitle', 'Sakitləşdirici Nəfəs')}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-sm line-clamp-2">
              {t('webapp.dashboard.calmingBreathDesc', 'Dərindən nəfəs alaraq zehni sakitləşdirin və bədəninizi rahatladın.')}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
            <AppIcon icon="lucide:wind" size={26} className="text-white" />
          </div>
        </div>

        <button
          onClick={() => navigate(PATHS.MINI_GAMES)}
          className="self-start mt-4 px-5 py-2.5 rounded-xl bg-white text-emerald-950 font-semibold text-xs sm:text-sm hover:bg-white/90 transition-all flex items-center gap-2 cursor-pointer shadow-md"
        >
          <span>{t('webapp.dashboard.startNow', 'İndi Başla')}</span>
          <AppIcon icon="lucide:arrow-right" size={14} />
        </button>
      </div>

      {/* 2. Guided Meditation Card */}
      <div
        className="relative overflow-hidden rounded-3xl p-6 sm:p-7 text-white shadow-xl flex flex-col justify-between min-h-[170px] border border-white/15 transition-all duration-300 hover:scale-[1.01]"
        style={{
          background: 'linear-gradient(135deg, rgba(75, 46, 131, 0.75) 0%, rgba(99, 102, 241, 0.6) 50%, rgba(30, 27, 75, 0.8) 100%)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-white/20 text-white border border-white/25">
              {t('webapp.sidebar.enlightenment', 'Meditasiya')}
            </span>
            <h3 className="text-xl font-semibold text-white mt-2.5 mb-1">
              {t('webapp.dashboard.meditationTitle', 'Günün Meditasiyası')}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-sm line-clamp-2">
              {t('webapp.dashboard.meditationDesc', 'Şüurlu fərqindəlik məşqləri ilə daxili harmoniyanı bərpa edin.')}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
            <AppIcon icon="lucide:moon" size={26} className="text-white" />
          </div>
        </div>

        <button
          onClick={() => navigate(PATHS.MINI_GAMES)}
          className="self-start mt-4 px-5 py-2.5 rounded-xl bg-white text-purple-950 font-semibold text-xs sm:text-sm hover:bg-white/90 transition-all flex items-center gap-2 cursor-pointer shadow-md"
        >
          <span>{t('webapp.dashboard.startNow', 'İndi Başla')}</span>
          <AppIcon icon="lucide:arrow-right" size={14} />
        </button>
      </div>
    </div>
  );
};
