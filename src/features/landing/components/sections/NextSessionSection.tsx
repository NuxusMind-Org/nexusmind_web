import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/components';
import { PATHS } from '@/routes/paths';
import { psychologists } from '../../data/psychologists';
import { useSessionStore } from '@/store/sessionStore';
import {
  isSessionUpcomingOrActive,
  checkIsJoinable,
  sortSessionsChronologically,
} from '@/utils/sessionFilters';

export const NextSessionSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
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
      case 'VIDEO_CALL': return t('webapp.sessions.videoSession', 'Video Seans');
      case 'VR': return t('webapp.sessions.vrSession', 'VR Seans');
      case 'APP': return t('webapp.sessions.appSession', 'App Seans');
      default: return t('webapp.sessions.videoSession', 'Video Seans');
    }
  };

  // Find the earliest upcoming session
  const nextSession = useMemo(() => {
    if (!sessions || sessions.length === 0) return null;
    const upcoming = sessions.filter((s) => isSessionUpcomingOrActive(s, currentTime));
    const sorted = sortSessionsChronologically(upcoming);
    return sorted[0] || null;
  }, [sessions, currentTime]);

  const doctorInfo = useMemo(() => {
    if (!nextSession) return null;
    const fallbackPsych = psychologists[0];
    const docName = nextSession.doctorName || fallbackPsych.name;
    const matchedPsych = psychologists.find(
      (p) => p.name.toLowerCase() === docName.toLowerCase()
    ) || fallbackPsych;
    return {
      name: docName,
      speciality: matchedPsych.specialty || matchedPsych.title || t('webapp.sessions.clinicalPsychologist', 'Psixoloq'),
      image: matchedPsych.image,
    };
  }, [nextSession, t]);

  const isJoinable = useMemo(() => {
    if (!nextSession) return false;
    return checkIsJoinable(nextSession, currentTime);
  }, [nextSession, currentTime]);

  return (
    <div className="w-full flex flex-col items-start text-left">
      {/* Section Header */}
      <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#1A103C] tracking-tight mb-5 sm:mb-6 text-left">
        {t('webapp.sessions.nextSession', 'Növbəti seansın')}
      </h2>

      {/* Card Container */}
      {loading ? (
        <div className="w-full rounded-[28px] sm:rounded-[36px] bg-white border border-[#ECEEF5] py-16 px-6 flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-[#4A1FA8]/20 border-t-[#4A1FA8] rounded-full animate-spin" />
        </div>
      ) : nextSession && doctorInfo ? (
        /* Active Upcoming Session Card (White theme matching ExpertsSection) */
        <div className="w-full rounded-[28px] sm:rounded-[36px] bg-white border border-[#ECEEF5] p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-left transition-all duration-300 hover:border-[#DDD9F3]">
          {/* Doctor Info */}
          <div className="flex items-center gap-4 sm:gap-6 w-full lg:w-auto">
            <div className="relative shrink-0">
              <img
                src={doctorInfo.image}
                alt={doctorInfo.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white shadow-md"
              />
              {isJoinable && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#F0EFF9] text-[#4A1FA8] border border-[#E2E0F5]">
                  {getModeLabel(nextSession.mode)}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1A103C]">
                {doctorInfo.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#71717A]">
                {doctorInfo.speciality}
              </p>
            </div>
          </div>

          {/* Time & Action Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full lg:w-auto justify-end">
            <div className="flex items-center gap-4 bg-slate-50 border border-[#ECEEF5] px-4 py-2.5 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 text-[#4A1FA8] text-xs sm:text-sm font-medium">
                <AppIcon icon="lucide:calendar" size={16} />
                <span>{formatDate(nextSession.appointmentDate)}</span>
              </div>
              <div className="h-4 w-[1px] bg-slate-200" />
              <div className="flex items-center gap-2 text-[#4A1FA8] text-xs sm:text-sm font-medium">
                <AppIcon icon="lucide:clock" size={16} />
                <span>{formatTime(nextSession.appointmentTime)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {isJoinable ? (
                <button
                  onClick={() => navigate(PATHS.SESSION_VERIFY_FACE.replace(':id', String(nextSession.id)))}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#4A1FA8] hover:bg-[#3E1691] text-white font-semibold text-sm shadow-[0_8px_24px_rgba(74,31,168,0.35)] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <AppIcon icon="lucide:video" size={16} />
                  <span>{t('webapp.sessions.join', 'Seansa Qoşul')}</span>
                </button>
              ) : (
                <button
                  onClick={() => navigate(PATHS.SESSIONS)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-[#1A103C] font-semibold text-sm shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>{t('webapp.sessions.upcomingSessions', 'Bütün Seanslarım')}</span>
                  <AppIcon icon="lucide:arrow-right" size={15} />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Empty State Card (Matches ExpertsSection White Background, expanded container, no shadow) */}
          <div className="w-full rounded-[28px] sm:rounded-[36px] bg-white border border-[#ECEEF5] py-10 sm:py-12 md:py-14 px-6 sm:px-12 flex flex-col items-center justify-center text-center relative">
            {/* Status Message */}
            <p className="text-[20px] sm:text-[24px] md:text-[26px] text-[#71717A] font-normal tracking-tight mb-7 sm:mb-8">
              {t('webapp.sessions.noSessions', 'Hələki seans yoxdur .')}
            </p>

            {/* Action Button - navigates directly to Experts Page */}
            <button
              onClick={() => navigate(PATHS.EXPERTS)}
              className="px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[#4A1FA8] hover:bg-[#3E1691] active:scale-[0.98] text-white text-[13px] sm:text-[14px] font-bold tracking-wider uppercase transition-all shadow-[0_8px_24px_rgba(74,31,168,0.35)] flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <AppIcon icon="lucide:plus" size={16} className="text-white shrink-0 stroke-[2.5]" />
              <span>{t('webapp.sessions.bookSession', 'SEANS TƏYİN ET').toUpperCase()}</span>
            </button>
          </div>

          {/* Animative Down Arrow between Session Button & Experts Title */}
          <div className="w-full flex justify-center mt-5 sm:mt-6">
            <button
              type="button"
              onClick={() => {
                const galleryEl = document.getElementById('experts-gallery') || document.getElementById('experts');
                galleryEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="flex flex-col items-center justify-center text-[#4A1FA8]/70 hover:text-[#4A1FA8] transition-colors cursor-pointer group p-1"
              aria-label={t('experts.viewAll', 'Mütəxəssislərə bax')}
            >
              <AppIcon
                icon="lucide:chevron-down"
                size={28}
                className="animate-bounce transition-transform duration-200 group-hover:translate-y-1"
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
