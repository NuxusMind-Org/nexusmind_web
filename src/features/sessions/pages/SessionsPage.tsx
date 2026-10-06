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
import { ExpertCard } from '@/features/experts/components/ExpertCard';
import { ExpertCardGridSkeleton } from '@/features/experts/components/ExpertCardSkeleton';
import { SessionListSkeleton } from '../components/SessionListSkeleton';
import { doctorsApi } from '@/api/doctors.api';
import { mapDoctorToPsychologist } from '@/utils/mappers';
import type { Psychologist } from '@/features/landing/types/psychologist.types';

export const SessionsPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [showAllPastSessions, setShowAllPastSessions] = useState(false);
  const [recommendedExperts, setRecommendedExperts] = useState<Psychologist[]>([]);
  const [loadingExperts, setLoadingExperts] = useState(true);
  const { sessions, loading, fetchSessions } = useSessionStore();

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // Fetch recommended experts (from DB or fallback)
  useEffect(() => {
    let isMounted = true;
    const fetchExperts = async () => {
      setLoadingExperts(true);
      try {
        const doctors = await doctorsApi.getAll();
        if (isMounted && doctors && doctors.length > 0) {
          const currentLang = (i18n.language?.slice(0, 2) as 'az' | 'en' | 'ru') || 'az';
          const mapped = doctors.map((doc) => mapDoctorToPsychologist(doc, currentLang));
          setRecommendedExperts(mapped.slice(0, 4));
        } else if (isMounted) {
          setRecommendedExperts(psychologists.slice(0, 4));
        }
      } catch {
        if (isMounted) {
          setRecommendedExperts(psychologists.slice(0, 4));
        }
      } finally {
        if (isMounted) {
          setLoadingExperts(false);
        }
      }
    };

    fetchExperts();
    return () => {
      isMounted = false;
    };
  }, [i18n.language]);

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

  // Capped past sessions (show max 3 by default, expand on toggle)
  const displayedPastSessions = useMemo(() => {
    return showAllPastSessions ? pastSessions : pastSessions.slice(0, 3);
  }, [pastSessions, showAllPastSessions]);

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white bg-landing-gradient">
      <LandingNavbar activePage="sessions" />

      <main className="flex-1 w-full max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-10 flex flex-col gap-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-5xl font-light font-sans text-white tracking-tight mb-2">
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
            <SessionListSkeleton />
          ) : upcomingSessions.length > 0 ? (
            <div className="flex flex-col gap-5 w-full">
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
                    className={`w-full backdrop-blur-xl rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xl transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border ${
                      isJoinable
                        ? 'bg-gradient-to-r from-emerald-950/30 via-white/10 to-[#16122d]/80 border-emerald-500/40 shadow-[0_0_35px_rgba(16,185,129,0.18)] hover:border-emerald-500/60'
                        : 'bg-white/10 border-white/15 hover:border-[#00f2ff]/40 shadow-black/20'
                    }`}
                  >
                    {/* Left: Doctor Details */}
                    <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src={docImg}
                          alt={docName}
                          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-md border-2 ${
                            isJoinable ? 'border-emerald-400/60' : 'border-white/20'
                          }`}
                        />
                        {isJoinable && (
                          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#16122d]" />
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]/30">
                            {getModeLabel(session.mode)}
                          </span>
                          {isJoinable && (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              {t('webapp.sessions.liveNow', 'Aktivdir')}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
                          {docName}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/60 truncate">
                          {docSpec}
                        </p>
                      </div>
                    </div>

                    {/* Right: Date, Time & Action Button */}
                    <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10 shrink-0">
                      <div className="flex items-center gap-3 text-xs sm:text-sm text-white/80">
                        <div className="flex items-center gap-2 bg-white/5 px-3.5 py-2 rounded-xl border border-white/10 backdrop-blur-sm">
                          <AppIcon icon="lucide:calendar" size={15} className="text-[#c084fc]" />
                          <span className="font-medium">{formatDate(session.appointmentDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 px-3.5 py-2 rounded-xl border border-white/10 backdrop-blur-sm">
                          <AppIcon icon="lucide:clock" size={15} className="text-[#00f2ff]" />
                          <span className="font-medium">{formatTime(session.appointmentTime)}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate(PATHS.SESSION_VERIFY_FACE.replace(':id', String(session.id)))}
                        className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-md whitespace-nowrap ${
                          isJoinable
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold shadow-[0_0_24px_rgba(16,185,129,0.45)] hover:opacity-95 hover:scale-[1.02] active:scale-[0.98]'
                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                        }`}
                      >
                        <AppIcon icon="lucide:video" size={16} />
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

        {/* Past Sessions Section (Capped with expand/collapse) */}
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
              {displayedPastSessions.map((session) => {
                const fallback = psychologists[0];
                const docName = session.doctorName || fallback.name;
                const psych = psychologists.find((p) => p.name.toLowerCase() === docName.toLowerCase()) || fallback;
                return (
                  <div
                    key={session.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4 text-white/70 hover:bg-white/[0.07] transition-colors"
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

            {pastSessions.length > 3 && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() => setShowAllPastSessions((prev) => !prev)}
                  className="px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 hover:border-white/20 text-white/80 hover:text-white text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>
                    {showAllPastSessions
                      ? t('webapp.sessions.hideHistory', 'Daha az göstər')
                      : t('webapp.sessions.showAllHistory', 'Bütün tarixçəni göstər')}
                  </span>
                  <AppIcon
                    icon={showAllPastSessions ? 'lucide:chevron-up' : 'lucide:chevron-down'}
                    size={16}
                    className="text-[#00f2ff] transition-transform duration-200"
                  />
                </button>
              </div>
            )}
          </section>
        )}

        {/* Recommended Experts Section */}
        <section className="flex flex-col gap-6 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#c084fc]">
                  <AppIcon icon="lucide:sparkles" size={16} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
                  {t('webapp.sessions.recommendedExperts', 'Tövsiyə Edilən Mütəxəssislər')}
                </h2>
              </div>
              <p className="text-white/60 text-sm sm:text-base">
                {t('webapp.sessions.recommendedExpertsSubtitle', 'Psixoloji rifahınız üçün ən uyğun mütəxəssislər')}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate(PATHS.EXPERTS)}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#00f2ff] hover:text-[#00f2ff]/80 transition-colors cursor-pointer self-start sm:self-auto py-1.5"
            >
              <span>{t('webapp.sessions.viewAllExperts', 'Bütün mütəxəssislər')}</span>
              <AppIcon
                icon="lucide:arrow-right"
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

          {loadingExperts ? (
            <ExpertCardGridSkeleton count={4} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendedExperts.map((expert) => (
                <ExpertCard key={expert.id} expert={expert} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};
