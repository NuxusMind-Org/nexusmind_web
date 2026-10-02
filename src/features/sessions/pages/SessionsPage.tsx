import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/components';
import { psychologists } from '@/features/landing/data/psychologists';
import { PATHS } from '@/routes/paths';
import presentingNexie from '@/assets/svg/presenting_nexie.svg';
import { useSessionStore } from '@/store/sessionStore';
import {
  isSessionUpcomingOrActive,
  checkIsJoinable,
  sortSessionsChronologically,
  filterSessionsBySearch,
} from '@/utils/sessionFilters';
import { LandingNavbar } from '@/features/landing/components/LandingNavbar';
import { Footer } from '@/features/landing/components/Footer';

export const SessionsPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const { sessions, loading, fetchSessions } = useSessionStore();

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // Periodically refresh current time every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const [year, month, day] = dateStr.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      const locale = i18n.language === 'az' ? 'az-AZ' : i18n.language === 'ru' ? 'ru-RU' : 'en-US';
      return date.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (timeStr?: string) => {
    if (!timeStr) return '';
    return timeStr.substring(0, 5);
  };

  const getModeLabel = (mode?: string) => {
    switch (mode) {
      case 'VIDEO_CALL': return t('webapp.sessions.videoSession', 'Video Seans');
      case 'VR': return t('webapp.sessions.vrSession', 'VR Seans');
      case 'APP': return t('webapp.sessions.appSession', 'Tətbiq Seansı');
      default: return t('webapp.sessions.videoSession', 'Video Seans');
    }
  };

  // Filter & sort upcoming sessions
  const upcomingSessions = useMemo(() => {
    const active = sessions.filter((s) => isSessionUpcomingOrActive(s, currentTime));
    const sorted = sortSessionsChronologically(active);
    return filterSessionsBySearch(sorted, searchQuery);
  }, [sessions, currentTime, searchQuery]);

  // Filter past sessions
  const pastSessions = useMemo(() => {
    const past = sessions.filter((s) => !isSessionUpcomingOrActive(s, currentTime));
    return filterSessionsBySearch(past, searchQuery);
  }, [sessions, currentTime, searchQuery]);

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white bg-landing-gradient">
      <LandingNavbar activePage="sessions" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-10 flex flex-col gap-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-5xl font-light font-serif text-white tracking-tight mb-2">
              {t('webapp.sessions.mySessions', 'Seanslarım')}
            </h1>
            <p className="text-white/70 text-sm sm:text-base max-w-xl">
              {t('webapp.sessions.subtitle', 'Təyin edilmiş və keçmiş konsultasiyalarınızın siyahısı.')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-72">
              <AppIcon icon="lucide:search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('common.search', 'Axtarış...')}
                className="w-full bg-white/10 border border-white/15 focus:border-[#00f2ff] text-white placeholder-white/40 pl-11 pr-4 py-2.5 rounded-2xl text-sm outline-none transition-all backdrop-blur-md"
              />
            </div>

            <button
              onClick={() => navigate(PATHS.EXPERTS)}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#9f5bff] to-[#00f2ff] hover:opacity-90 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <AppIcon icon="lucide:plus" size={16} />
              <span>{t('webapp.sessions.newSession', 'Yeni Seans')}</span>
            </button>
          </div>
        </div>

        {/* Upcoming Sessions Section */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <AppIcon icon="lucide:calendar" size={20} className="text-[#00f2ff]" />
            <span>{t('webapp.sessions.upcomingSessions', 'Qarşıdan Gələn Seanslar')}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/70">
              {upcomingSessions.length}
            </span>
          </h2>

          {loading ? (
            <div className="w-full bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-12 flex items-center justify-center text-white/60">
              <AppIcon icon="lucide:loader-2" size={28} className="animate-spin text-[#00f2ff] mr-3" />
              <span>{t('common.loading', 'Yüklənir...')}</span>
            </div>
          ) : upcomingSessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingSessions.map((session) => {
                const isJoinable = checkIsJoinable(session, currentTime);
                const fallback = psychologists[0];
                const docName = session.doctorName || fallback.name;
                const psych = psychologists.find((p) => p.name.toLowerCase() === docName.toLowerCase()) || fallback;
                const docSpec = psych.specialty;
                const docImg = psych.image;

                return (
                  <div
                    key={session.id}
                    className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-xl flex flex-col justify-between gap-5 transition-all duration-300 hover:border-[#00f2ff]/40"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={docImg}
                          alt={docName}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-md shrink-0"
                        />
                        <div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]/30">
                            {getModeLabel(session.mode)}
                          </span>
                          <h3 className="text-lg font-semibold text-white mt-1">
                            {docName}
                          </h3>
                          <p className="text-xs text-white/60">
                            {docSpec}
                          </p>
                        </div>
                      </div>

                      {isJoinable && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse">
                          {t('webapp.sessions.liveNow', 'Aktivdir')}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                      <div className="flex items-center gap-3 text-xs text-white/80">
                        <div className="flex items-center gap-1.5">
                          <AppIcon icon="lucide:calendar" size={14} className="text-[#c084fc]" />
                          <span>{formatDate(session.appointmentDate)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <AppIcon icon="lucide:clock" size={14} className="text-[#00f2ff]" />
                          <span>{formatTime(session.appointmentTime)}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate(PATHS.SESSION_VERIFY_FACE.replace(':id', String(session.id)))}
                        className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                          isJoinable
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                        }`}
                      >
                        <AppIcon icon="lucide:video" size={14} />
                        <span>{isJoinable ? t('webapp.sessions.joinCall', 'Qoşul') : t('webapp.sessions.details', 'Ətraflı')}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-white text-left">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 p-2">
                  <img src={presentingNexie} alt="Nexie" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {t('webapp.dashboard.noUpcomingSession', 'Yaxın vaxtda seansınız yoxdur')}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 mt-0.5">
                    {t('webapp.dashboard.scheduleTip', 'Mütəxəssislərimizlə görüş təyin edərək sağlamlığınızı qoruyun.')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate(PATHS.EXPERTS)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#9f5bff] to-[#00f2ff] hover:opacity-90 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap shadow-md"
              >
                {t('landing.bookSessionNow', 'Yeni Seans Təyin Et')}
              </button>
            </div>
          )}
        </section>

        {/* Past Sessions Section */}
        {pastSessions.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-white/80 flex items-center gap-2">
              <AppIcon icon="lucide:clock" size={18} className="text-white/50" />
              <span>{t('webapp.sessions.pastSessions', 'Keçmiş Seanslar')}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50">
                {pastSessions.length}
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pastSessions.map((session) => {
                const fallback = psychologists[0];
                const docName = session.doctorName || fallback.name;
                const psych = psychologists.find((p) => p.name.toLowerCase() === docName.toLowerCase()) || fallback;
                return (
                  <div
                    key={session.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4 text-white/70"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={psych.image}
                        alt="Doctor"
                        className="w-12 h-12 rounded-xl object-cover grayscale opacity-70"
                      />
                      <div>
                        <h4 className="text-sm font-medium text-white/90">
                          {docName}
                        </h4>
                        <span className="text-xs text-white/40">
                          {formatDate(session.appointmentDate)} • {formatTime(session.appointmentTime)}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs text-white/40 uppercase tracking-wider font-semibold">
                      {session.status || 'Bitib'}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};
