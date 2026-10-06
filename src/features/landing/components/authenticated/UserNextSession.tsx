import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/components';
import { PATHS } from '@/routes/paths';
import presentingNexie from '@/assets/svg/presenting_nexie.svg';
import { psychologists } from '@/features/landing/data/psychologists';
import { SessionCardSkeleton } from '../skeletons';
import { useSessionStore } from '@/store/sessionStore';
import {
  isSessionUpcomingOrActive,
  checkIsJoinable,
  sortSessionsChronologically,
} from '@/utils/sessionFilters';

export const UserNextSession = () => {
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
      case 'APP': return t('webapp.sessions.appSession', 'Tətbiq Seansı');
      default: return t('webapp.sessions.videoSession', 'Video Seans');
    }
  };

  // Find next upcoming valid appointment
  const nextSession = useMemo(() => {
    if (!sessions || sessions.length === 0) return null;
    const upcoming = sessions.filter((s) => isSessionUpcomingOrActive(s, currentTime));
    const sorted = sortSessionsChronologically(upcoming);
    return sorted[0] || null;
  }, [sessions, currentTime]);

  const isJoinable = useMemo(() => {
    if (!nextSession) return false;
    return checkIsJoinable(nextSession, currentTime);
  }, [nextSession, currentTime]);

  const doctorInfo = useMemo(() => {
    if (!nextSession) return null;
    const fallbackPsych = psychologists[0];
    const docName = nextSession.doctorName || fallbackPsych.name;
    const matchedPsych = psychologists.find(p => p.name.toLowerCase() === docName.toLowerCase()) || fallbackPsych;
    return {
      name: docName,
      speciality: matchedPsych.specialty,
      image: matchedPsych.image,
    };
  }, [nextSession]);

  if (loading) {
    return <SessionCardSkeleton tone="dark" />;
  }

  // Active / Upcoming appointment state
  if (nextSession && doctorInfo) {
    return (
      <div className="w-full bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-5 sm:p-7 shadow-[0_16px_40px_rgba(0,0,0,0.25)] flex flex-col md:flex-row items-center justify-between gap-6 text-white text-left transition-all duration-300 hover:border-white/25">
        {/* Left: Session tag & Doctor info */}
        <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto">
          <div className="relative shrink-0">
            <img
              src={doctorInfo.image}
              alt={doctorInfo.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/20 shadow-md"
            />
            {isJoinable && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#1e1b4b] animate-pulse" />
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]/30">
                {getModeLabel(nextSession.mode)}
              </span>
              <span className="text-xs text-white/60">
                {t('webapp.dashboard.nextSession', 'Növbəti Seans')}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              {doctorInfo.name}
            </h3>
            <p className="text-xs sm:text-sm text-white/60">
              {doctorInfo.speciality}
            </p>
          </div>
        </div>

        {/* Center / Right: Time details & Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full md:w-auto justify-end">
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl">
            <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
              <AppIcon icon="lucide:calendar" size={16} className="text-[#c084fc]" />
              <span>{formatDate(nextSession.appointmentDate)}</span>
            </div>
            <div className="h-4 w-[1px] bg-white/15" />
            <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
              <AppIcon icon="lucide:clock" size={16} className="text-[#00f2ff]" />
              <span>{formatTime(nextSession.appointmentTime)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {isJoinable ? (
              <button
                onClick={() => navigate(`/sessions/${nextSession.id}/verify-face`)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:opacity-90 text-slate-950 font-semibold text-sm shadow-[0_0_25px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <AppIcon icon="lucide:video" size={16} />
                <span>{t('webapp.sessions.joinCall', 'Seansa Qoşul')}</span>
              </button>
            ) : (
              <button
                onClick={() => navigate(PATHS.SESSIONS)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>{t('webapp.sessions.viewSessions', 'Bütün Seanslarım')}</span>
                <AppIcon icon="lucide:arrow-right" size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Empty state: No upcoming appointment
  return (
    <div className="w-full bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.2)] flex flex-col sm:flex-row items-center justify-between gap-6 text-white text-left">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 p-2">
          <img src={presentingNexie} alt="Nexie" className="w-full h-full object-contain" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white">
            {t('webapp.dashboard.noUpcomingSession', 'Yaxın vaxtda təyin edilmiş seansınız yoxdur')}
          </h3>
          <p className="text-xs sm:text-sm text-white/60 mt-0.5">
            {t('webapp.dashboard.scheduleTip', 'Mütəxəssislərimizdən biri ilə görüş təyin edərək seansınızı planlaşdırın.')}
          </p>
        </div>
      </div>

      <button
        onClick={() => {
          const expertsEl = document.getElementById('experts');
          if (expertsEl) {
            expertsEl.scrollIntoView({ behavior: 'smooth' });
          } else {
            navigate(PATHS.EXPERTS);
          }
        }}
        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#9f5bff] to-[#00f2ff] hover:opacity-90 text-white font-semibold text-sm shadow-[0_8px_25px_rgba(159,91,255,0.3)] transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center justify-center gap-2"
      >
        <AppIcon icon="lucide:sparkles" size={16} />
        <span>{t('landing.bookSessionNow', 'Yeni Seans Təyin Et')}</span>
      </button>
    </div>
  );
};
