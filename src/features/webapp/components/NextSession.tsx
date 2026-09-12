import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, Plus, Loader2 } from 'lucide-react';
import { PATHS } from '@/routes/paths';
import presentingNexie from '@/assets/svg/presenting_nexie.svg';
import { psychologists } from '@/features/landing/data/psychologists';
import { useSessionStore } from '@/store/sessionStore';
import {
  isSessionUpcomingOrActive,
  checkIsJoinable,
  sortSessionsChronologically,
} from '@/features/webapp/utils/sessionFilters';

export const NextSession = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const { sessions, loading, fetchSessions } = useSessionStore();

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // Periodically update current time every 30 seconds to recalculate joinability and expiration
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
      return date.toLocaleDateString(i18n.language === 'az' ? 'az-AZ' : i18n.language === 'ru' ? 'ru-RU' : 'en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
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
      case 'VIDEO_CALL': return t('webapp.sessions.videoSession');
      case 'VR': return t('webapp.sessions.vrSession');
      case 'APP': return t('webapp.sessions.appSession');
      default: return t('webapp.sessions.videoSession');
    }
  };

  // Filter valid upcoming sessions and sort chronologically
  const upcomingSessions = useMemo(() => {
    const valid = sessions.filter((s) => isSessionUpcomingOrActive(s, currentTime));
    return sortSessionsChronologically(valid);
  }, [sessions, currentTime]);

  const nextSession = upcomingSessions[0];
  const isJoinable = nextSession ? checkIsJoinable(nextSession, currentTime) : false;
  const matchedDoctor = nextSession?.doctorName
    ? psychologists.find(
        (p) => p.name.toLowerCase().includes(nextSession.doctorName?.toLowerCase() || '') ||
               (nextSession.doctorName || '').toLowerCase().includes(p.name.toLowerCase())
      )
    : null;

  return (
    <div className="w-full bg-white px-4 sm:px-6 pb-10 sm:pb-16 lg:px-10 flex flex-col justify-start select-none">
      {/* 1. Section Header */}
      <h2
        className="w-full text-left text-[#1E0A42] font-normal mb-6 sm:mb-8 text-[22px] sm:text-[26px] md:text-[31.15px] leading-[32px] sm:leading-[42px] md:leading-[59.84px]"
        style={{
          letterSpacing: '-0.96px',
          maxWidth: '1251.75px',
        }}
      >
        {t('webapp.sessions.nextSession')}
      </h2>

      {/* 2. Loading State */}
      {loading && !nextSession ? (
        <div className="w-full bg-[#FAFAFA] rounded-[24px] border border-gray-100 p-12 flex flex-col items-center justify-center min-h-[220px]">
          <Loader2 className="w-8 h-8 text-[#4B2E83] animate-spin mb-3" />
          <p className="text-sm font-medium text-[#7A7570] font-['Lexend']">{t('webapp.sessions.loading')}</p>
        </div>
      ) : !nextSession ? (
        /* 3. Empty State (Identical to SessionsPage) */
        <div className="w-full bg-[#FAFAFA] rounded-[24px] border border-gray-100/80 p-8 sm:p-12 flex flex-col items-center justify-center text-center animate-fade-in">
          <h3 className="text-[26px] sm:text-[32px] md:text-[36px] font-light text-[#7A7570] font-['Lexend'] text-center">
            {t('webapp.sessions.noSessions')}
          </h3>

          <div className="relative w-full max-w-[460px] h-[210px] sm:h-[260px] mt-4 mx-auto">
            <img
              src={presentingNexie}
              alt="Presenting Nexie"
              className="absolute left-[50%] -translate-x-[85%] bottom-0 w-[180px] sm:w-[220px] object-contain"
            />
            <button
              onClick={() => navigate(PATHS.WEBAPP_EXPERTS)}
              className="absolute top-[28%] sm:top-[35%] left-[59%] -translate-x-[15%] translate-y-[-50%] bg-[#4B2E83] hover:bg-[#3C2475] text-white rounded-full px-5 sm:px-6 py-3 sm:py-3.5 font-semibold font-['Lexend'] flex items-center justify-center gap-2 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] text-xs sm:text-sm border-0 cursor-pointer uppercase tracking-wide whitespace-nowrap z-10"
            >
              <Plus strokeWidth={2.5} className="w-4 h-4 sm:w-5 sm:h-5" />
              {t('webapp.sessions.bookSession')}
            </button>
          </div>
        </div>
      ) : (
        /* 4. Active Purple Session Card */
        <div
          className="w-full relative overflow-hidden flex flex-col items-center justify-between p-5 sm:p-6 md:flex-row md:px-10 md:py-8 text-white group min-h-[200px] md:min-h-[261px] animate-fade-in"
          style={{
            background: 'linear-gradient(135deg, #3B2068 0%, #5E38A0 50%, #8B63C9 100%)',
            borderRadius: '20px',
            boxShadow: '0px 27.86px 83.57px rgba(75, 46, 131, 0.35)',
          }}
        >
          {/* Abstract Background Design Spheres */}
          <div className="absolute right-[-40px] top-[-40px] w-[280px] h-[280px] rounded-full bg-white/[0.05] pointer-events-none" />
          <div className="absolute right-[140px] bottom-[-100px] w-[220px] h-[220px] rounded-full bg-white/[0.04] pointer-events-none" />

          {/* Left Side: Doctor Info & Profile */}
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 relative z-10 w-full md:w-auto">
            {/* Avatar Frame with custom border and active badge */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-[16px] sm:rounded-[24px] md:rounded-[28px] overflow-hidden border-2 border-white/20 p-[2px] bg-white/5 shadow-md flex items-center justify-center">
                {matchedDoctor?.image ? (
                  <img
                    src={matchedDoctor.image}
                    alt={nextSession.doctorName || t('webapp.sessions.doctor')}
                    className="w-full h-full rounded-[14px] sm:rounded-[22px] md:rounded-[24px] object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-[14px] sm:rounded-[22px] md:rounded-[24px] bg-white/10 flex items-center justify-center text-white/70 text-2xl sm:text-4xl font-bold font-['Lexend']">
                    {(nextSession.doctorName || 'D').charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              {/* Green active badge dot */}
              <span className={`absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 sm:border-3 border-[#4A267F] shadow-sm ${
                isJoinable ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-500'
              }`} />
            </div>

            {/* Doctor text information */}
            <div className="flex flex-col text-left justify-center font-['Lexend']">
              <span className="text-[10px] sm:text-xs md:text-sm text-white/70 font-semibold uppercase tracking-wider">
                {matchedDoctor?.title || t('webapp.sessions.clinicalPsychologist')}
              </span>
              <h3 className="text-[18px] sm:text-[22px] md:text-[28px] font-bold text-white leading-tight mt-0.5 tracking-tight">
                {nextSession.doctorName || t('webapp.sessions.doctor')}
              </h3>

              {/* Time & Date details */}
              <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-1.5 text-[10px] sm:text-xs md:text-sm text-white/80 mt-2 sm:mt-2.5 font-medium">
                <span className="flex items-center gap-1.5">
                  <Calendar size={15} className="text-white/60" />
                  {formatDate(nextSession.appointmentDate)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={15} className="text-white/60" />
                  {formatTime(nextSession.appointmentTime)}
                </span>
              </div>

              {/* Sub-badges for session details */}
              <div className="flex gap-2 sm:gap-2.5 mt-3 sm:mt-4 select-none">
                <span className="px-3 sm:px-5 py-1.5 sm:py-2 bg-white/10 border border-white/10 text-white text-[10px] sm:text-xs md:text-[13px] font-semibold rounded-full backdrop-blur-sm shadow-sm">
                  {getModeLabel(nextSession.mode)}
                </span>
                <span className="px-3 sm:px-5 py-1.5 sm:py-2 bg-white/10 border border-white/10 text-white text-[10px] sm:text-xs md:text-[13px] font-semibold rounded-full backdrop-blur-sm shadow-sm">
                  {t('webapp.sessions.duration45')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Reschedule and Join Actions */}
          <div className="flex flex-row md:flex-col gap-3 items-center md:items-end flex-shrink-0 relative z-10 w-full md:w-auto mt-4 md:mt-0 font-['Lexend']">
            <button
              onClick={() => navigate(PATHS.WEBAPP_SESSION_CALL.replace(':id', String(nextSession.id)))}
              disabled={!isJoinable}
              className={`flex-1 md:flex-initial md:w-[200px] py-3 sm:py-3.5 font-bold text-xs md:text-sm rounded-full shadow-lg transition-all duration-300 uppercase tracking-wider text-center border-0 ${
                isJoinable
                  ? 'bg-white hover:bg-white/95 text-[#3B2068] hover:shadow-white/10 hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                  : 'bg-white/40 text-[#3B2068]/60 cursor-not-allowed'
              }`}
            >
              {isJoinable ? t('webapp.sessions.join') : t('webapp.sessions.pending')}
            </button>
            <button
              onClick={() => navigate(PATHS.WEBAPP_SESSIONS)}
              className="flex-1 md:flex-initial md:w-[200px] py-3 sm:py-3.5 border border-white/30 bg-white/5 hover:bg-white/10 text-white font-bold text-xs md:text-sm rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer uppercase tracking-wider text-center"
            >
              {t('webapp.sessions.reschedule')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


