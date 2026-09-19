import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star, GraduationCap, Award, Video, Clock, Lock, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import { psychologists } from '@/features/landing/data/psychologists';
import { PATHS } from '@/routes/paths';
import vrConsultation from '@/assets/vr_consultation.png';
import { CalendarWidget } from '../components/CalendarWidget';
import { useSessionStore } from '@/store/sessionStore';
import { doctorsApi } from '@/api/doctors.api';
import { mapDoctorToPsychologist } from '@/utils/mappers';
import { getLocalizedTitle } from '@/utils/multilingual';
import type { Psychologist } from '@/features/landing/types/psychologist.types';
import type { AvailableSlotDto } from '@/api/types';
import defaultAvatar from '@/assets/avatar1.png';

const formatISODate = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const ExpertDetailPage = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const bookSession = useSessionStore(state => state.bookSession);
  const psychologistId = id ? parseInt(id, 10) : 1;
  const [psych, setPsych] = useState<Psychologist | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Available slots for finding next empty work hour
  const [slots, setSlots] = useState<AvailableSlotDto[]>([]);
  const [isSlotsLoading, setIsSlotsLoading] = useState(true);

  useEffect(() => {
    const fetchPsychologist = async () => {
      try {
        const doctor = await doctorsApi.getById(psychologistId);
        setPsych(mapDoctorToPsychologist(doctor));
      } catch (error) {
        console.error('Failed to fetch psychologist, falling back to mock data:', error);
        setPsych(psychologists.find(p => p.id === psychologistId) || psychologists[0]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPsychologist();
  }, [psychologistId]);

  useEffect(() => {
    const fetchSlots = async () => {
      setIsSlotsLoading(true);
      try {
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + 30);

        const from = formatISODate(today);
        const to = formatISODate(futureDate);

        const data = await doctorsApi.getAvailableWorkingHours(psychologistId, from, to);
        setSlots(data || []);
      } catch (error) {
        console.error('Failed to fetch available hours:', error);
        setSlots([]);
      } finally {
        setIsSlotsLoading(false);
      }
    };
    fetchSlots();
  }, [psychologistId]);

  // Compute the closest available (unbooked) future slot
  const closestAvailableSlot = useMemo(() => {
    if (!slots || slots.length === 0) return null;

    const now = new Date();

    const openSlots = slots
      .filter(s => !s.booked)
      .map(s => {
        const [h = '0', m = '0'] = s.time.split(':');
        const [yearStr, monthStr, dayStr] = s.date.split('-');
        const slotDate = new Date(
          parseInt(yearStr, 10),
          parseInt(monthStr, 10) - 1,
          parseInt(dayStr, 10),
          parseInt(h, 10),
          parseInt(m, 10)
        );

        return {
          original: s,
          dateTime: slotDate,
          startH: parseInt(h, 10),
          startM: parseInt(m, 10),
        };
      })
      .filter(s => s.dateTime.getTime() > now.getTime())
      .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());

    if (openSlots.length === 0) return null;

    const earliest = openSlots[0];
    const { startH, startM, dateTime } = earliest;

    let endH = startH;
    let endM = startM + 45;
    if (endM >= 60) {
      endM -= 60;
      endH += 1;
    }

    const timeRange = `${String(startH).padStart(2, '0')}:${String(startM).padStart(2, '0')} - ${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;

    const today = new Date();
    const isToday =
      dateTime.getDate() === today.getDate() &&
      dateTime.getMonth() === today.getMonth() &&
      dateTime.getFullYear() === today.getFullYear();

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const isTomorrow =
      dateTime.getDate() === tomorrow.getDate() &&
      dateTime.getMonth() === tomorrow.getMonth() &&
      dateTime.getFullYear() === tomorrow.getFullYear();

    let datePrefix: string;
    if (isToday) {
      datePrefix = t('webapp.experts.today');
    } else if (isTomorrow) {
      datePrefix = t('webapp.experts.tomorrow');
    } else {
      const locale = i18n.language === 'az' ? 'az-AZ' : i18n.language === 'ru' ? 'ru-RU' : 'en-US';
      datePrefix = dateTime.toLocaleDateString(locale, { day: 'numeric', month: 'long' });
    }

    return {
      formatted: `${datePrefix}, ${timeRange}`,
      slot: earliest.original,
    };
  }, [slots, t, i18n.language]);

  const [showCalendar, setShowCalendar] = useState(false);
  const [booking, setBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col rounded-t-[20px] md:rounded-t-[38.93px] rounded-b-[20px] md:rounded-b-[38.93px] overflow-hidden shadow-2xl bg-white animate-fade-in min-h-[calc(100vh-64px)] pb-12 sm:pb-20 opacity-100">

      {/* Top Header Section (Card with Gradient) - Height 188px */}
      <div
        className="w-full rounded-t-[20px] md:rounded-t-[38.93px] rounded-b-none h-auto min-h-[140px] sm:min-h-[160px] md:h-[188px] pt-5 sm:pt-[36px] pb-4 sm:pb-[28px] px-4 sm:px-6 md:px-[48px] flex flex-col justify-between items-center text-center opacity-100 relative"
        style={{
          background: 'linear-gradient(135deg, #CBE8FC 0%, #DDD4F8 33%, #F9D8E8 66%, #FFF5E6 100%)',
        }}
      >
        {/* Centered Heading */}
        <h2 className="w-full text-center text-[28px] md:text-[46.72px] font-normal text-[#1E0A42] leading-[36px] md:leading-[59.84px] tracking-[-0.96px] font-['Lexend'] mt-2">
          {t('webapp.experts.stayInformed')}
        </h2>

        {/* Breadcrumb row - Aligned left at the bottom */}
        <div className="w-full flex items-center justify-start gap-2 text-xs sm:text-sm text-[#1E0A42]/70 font-semibold font-['Lexend'] select-none overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link to={PATHS.DASHBOARD} className="hover:text-[#4D2059] transition-colors">
            {t('webapp.bottomNav.home')}
          </Link>
          <ChevronRight size={14} className="text-[#1E0A42]/50" />
          <Link to={PATHS.WEBAPP_EXPERTS} className="hover:text-[#4D2059] transition-colors">
            {t('webapp.sidebar.experts')}
          </Link>
          <ChevronRight size={14} className="text-[#1E0A42]/50" />
          <span className="text-[#4D2059] font-bold">{t('webapp.experts.mentalHealth')}</span>
        </div>
      </div>

      {isLoading || !psych ? (
        <div className="w-full flex items-center justify-center py-20 text-[#1E0A42]/50">
          {t('webapp.experts.loading')}
        </div>
      ) : (
        <div className={`w-full max-w-[1240px] mx-auto py-4 sm:py-10 flex flex-col items-center ${showCalendar ? 'px-2.5 sm:px-6' : 'px-4 sm:px-6'}`}>
          {!showCalendar ? (
            <div className="w-full flex flex-col lg:flex-row gap-6 sm:gap-8 items-start animate-fade-in">
              {/* Left Column (65% width) */}
              <div className="w-full lg:w-[68%] flex flex-col gap-6">

                {/* Card 1: Main Profile Card */}
                <div className="w-full bg-[#4B2E83] rounded-[24px] p-6 sm:p-8 text-white flex flex-col sm:flex-row gap-6 relative shadow-lg border border-white/10">
                  {/* Avatar block with rating badge */}
                  <div className="relative shrink-0 mx-auto sm:mx-0">
                    <img
                      src={psych.image}
                      alt={psych.name}
                      onError={(e) => {
                        e.currentTarget.src = defaultAvatar;
                      }}
                      className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] rounded-full object-cover border-4 border-white/20 shadow-md"
                    />
                    <div className="absolute bottom-10 right-0 bg-[#03C6B2] text-[#111] px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-md font-['Lexend'] select-none">
                      <Star size={10} fill="currentColor" /> {psych.rating.toFixed(1)}
                    </div>
                  </div>

                  {/* Profile Info block */}
                  <div className="flex flex-col flex-1 text-left">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2 w-full">
                      <div>
                        <h3 className="text-2xl sm:text-[28px] font-bold text-white leading-tight font-['Lexend']">
                          {psych.name}
                        </h3>
                        <p className="text-white/70 text-[13px] font-['Lexend'] mt-1.5">
                          {psych.experience} • {getLocalizedTitle(psych.title as any, i18n.language as 'az' | 'en' | 'ru', '')}
                        </p>
                      </div>
                      <div className="text-[#03C6B2] font-bold text-[22px] sm:text-[24px] font-['Lexend'] shrink-0">
                        ${psych.price}<span className="text-[12px] text-white/60 font-normal">{t('webapp.sessions.perSession')}</span>
                      </div>
                    </div>

                    <p className="text-white/85 text-xs sm:text-sm leading-relaxed mt-4 mb-6 font-['Lexend'] font-light">
                      {getLocalizedTitle(psych.description as any, i18n.language as 'az' | 'en' | 'ru', '')}
                    </p>

                    {/* Language badges */}
                    <div className="flex flex-wrap gap-2.5 mt-auto">
                      {psych.languages.map((lang, idx) => (
                        <span
                          key={`lang-${idx}`}
                          className="bg-transparent text-[#44E2CD] text-[10px] font-semibold px-4 py-1.5 rounded-full border border-[#44E2CD] shadow-sm font-['Lexend'] uppercase"
                        >
                          {getLocalizedTitle(lang as any, i18n.language as 'az' | 'en' | 'ru', '')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 2: Education and Certifications cards */}
                <div className="flex flex-col md:flex-row gap-6 w-full">

                  {/* Təhsil Card */}
                  <div className="flex-1 bg-[#4B2E83] rounded-[24px] p-6 sm:p-8 text-white shadow-lg border border-white/10 text-left">
                    <h3 className="text-white text-base font-bold flex items-center gap-2 mb-6 font-['Lexend']">
                      <GraduationCap className="text-white/70" size={18} /> {t('webapp.experts.education')}
                    </h3>
                    <div className="flex flex-col gap-5">
                      {psych.education.map((edu, i) => (
                        <div key={i} className="border-l-2 border-white/20 pl-4 font-['Lexend']">
                          <h4 className="text-white text-sm font-bold leading-snug">{edu.uni}</h4>
                          <p className="text-white/60 text-xs mt-1 font-light">{edu.degree}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sertifikatlar Card */}
                  <div className="flex-1 bg-[#4B2E83] rounded-[24px] p-6 sm:p-8 text-white shadow-lg border border-white/10 text-left">
                    <h3 className="text-white text-base font-bold flex items-center gap-2 mb-6 font-['Lexend']">
                      <Award className="text-white/70" size={18} /> {t('webapp.experts.certifications')}
                    </h3>
                    <div className="flex flex-col gap-3">
                      {psych.certifications.map((cert, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-xl border border-white/5">
                          <CheckCircle2 size={16} className="text-[#03C6B2] shrink-0" />
                          <span className="text-white/80 text-xs font-['Lexend'] leading-snug">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Card 3: Specialties */}
                <div className="bg-[#4B2E83] rounded-[24px] p-6 sm:p-8 text-white shadow-lg border border-white/10 text-left">
                  <h3 className="text-white text-base font-bold mb-6 font-['Lexend']">{t('webapp.experts.directions')}</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {psych.tags.map((tag, idx) => (
                      <span
                        key={`tag-${idx}`}
                        className="bg-white/10 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/5 shadow-sm font-['Lexend']"
                      >
                        {getLocalizedTitle(tag as any, i18n.language as 'az' | 'en' | 'ru', '')}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#4B2E83] rounded-[24px] p-6 sm:p-8 text-white shadow-lg border border-white/10 text-left">
                  <h3 className="text-white text-base font-bold mb-6 font-['Lexend']">{t('webapp.experts.methods')}</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {psych.tags.map((tag, idx) => (
                      <span
                        key={`tag-${idx}`}
                        className="bg-white/10 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/5 shadow-sm font-['Lexend']"
                      >
                        {getLocalizedTitle(tag as any, i18n.language as 'az' | 'en' | 'ru', '')}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column (35% width) */}
              <div className="w-full lg:w-[32%] flex flex-col gap-6">

                {/* Booking Widget Box */}
                <div className="bg-[#3C2475] rounded-[24px] sm:rounded-[38.93px] p-6 sm:p-[38.93px] text-white shadow-xl flex flex-col text-left gap-5 sm:gap-[28px] w-full">
                  <h3 className="text-white text-[28px] font-medium font-['Lexend'] leading-normal">
                    {t('webapp.experts.bookConsultation')}
                  </h3>

                  {/* Next availability container */}
                  <div className="bg-[#25134F] border border-white/10 rounded-[20px] p-[24px]">
                    <div className="flex justify-between items-center mb-[14px]">
                      <span className="text-white/70 text-[16px] font-['Lexend'] font-light">
                        {t('webapp.experts.nextAvailableTime')}
                      </span>
                      {isSlotsLoading ? (
                        <span className="bg-white/10 text-white/50 text-[10px] font-bold px-[10px] py-[4px] rounded-[6px] tracking-wider font-['Lexend'] select-none flex items-center gap-1">
                          <Loader2 size={10} className="animate-spin" /> {t('webapp.experts.loading').toUpperCase()}
                        </span>
                      ) : closestAvailableSlot ? (
                        <span className="bg-[#03C6B2]/15 text-[#03C6B2] text-[10px] font-bold px-[10px] py-[4px] rounded-[6px] tracking-wider font-['Lexend'] select-none">
                          {t('webapp.experts.soon')}
                        </span>
                      ) : (
                        <span className="bg-white/10 text-white/50 text-[10px] font-bold px-[10px] py-[4px] rounded-[6px] tracking-wider font-['Lexend'] select-none">
                          {t('webapp.experts.unavailable')}
                        </span>
                      )}
                    </div>
                    <p className="text-white font-bold text-[20px] font-['Lexend'] leading-snug">
                      {isSlotsLoading
                        ? t('webapp.experts.checking')
                        : closestAvailableSlot
                          ? closestAvailableSlot.formatted
                          : t('webapp.experts.noSlots')}
                    </p>
                  </div>

                  {/* Features list */}
                  <div className="flex flex-col gap-[20px]">
                    <div className="flex items-center gap-[16px]">
                      <Video size={24} className="text-white shrink-0" strokeWidth={1.5} />
                      <span className="text-white text-[18px] font-['Lexend'] font-normal">{t('webapp.experts.onlineVideoSession')}</span>
                    </div>
                    <div className="flex items-center gap-[16px]">
                      <Clock size={24} className="text-white shrink-0" strokeWidth={1.5} />
                      <span className="text-white text-[18px] font-['Lexend'] font-normal">{t('webapp.experts.duration45')}</span>
                    </div>
                    <div className="flex items-center gap-[16px]">
                      <Lock size={24} className="text-white shrink-0" strokeWidth={1.5} />
                      <span className="text-white text-[18px] font-['Lexend'] font-normal">{t('webapp.experts.confidential')}</span>
                    </div>
                  </div>

                  {/* Button and cancellation policy group */}
                  <div className="flex flex-col items-center gap-[12px] w-full">
                    <button
                      onClick={() => setShowCalendar(true)}
                      className="w-full h-[59.05px] bg-gradient-to-r from-[#DDB7FF] to-[#B76DFF] text-[#1E0A42] font-bold text-[18px] rounded-[15.53px] shadow-[0_8px_20px_rgba(183,109,255,0.25)] hover:shadow-[0_8px_24px_rgba(183,109,255,0.4)] hover:opacity-95 active:scale-[0.98] transition-all duration-200 cursor-pointer border-0 outline-none flex items-center justify-center font-['Lexend']"
                    >
                      {t('webapp.experts.setSession')}
                    </button>
                  </div>
                </div>

                {/* VR Promotion Box */}
                <div className="w-full max-w-[388px] h-[240px] sm:h-[287px] rounded-[24px] sm:rounded-[30.25px] overflow-hidden relative group cursor-pointer shadow-xl border border-white/5 opacity-100 mx-auto lg:mx-0">
                  <img
                    src={vrConsultation}
                    alt="VR Consultation"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
                  />
                  <div className="absolute bottom-[24px] left-[24px] right-[24px] bg-[#5C4533]/60 backdrop-blur-md border border-white/20 rounded-[20px] p-[20px] text-left">
                    <h4 className="text-[18px] font-bold text-white mb-2 font-['Lexend'] tracking-wider">
                      {t('webapp.experts.vrTitle')}
                    </h4>
                    <p className="text-[13px] text-white/90 font-['Lexend'] leading-relaxed font-light">
                      {t('webapp.experts.vrDesc')}
                    </p>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            <>
              <CalendarWidget
                psychologistId={psych.id}
                psychologistName={psych.name}
                onBack={() => { setShowCalendar(false); setBookingError(null); }}
                onConfirm={async (appointmentDate, appointmentTimeStr, selectedMode) => {
                  setBooking(true);
                  setBookingError(null);
                  try {
                    await bookSession({
                      doctorId: psych.id,
                      appointmentDate,
                      appointmentTime: appointmentTimeStr,
                      mode: selectedMode,
                    });
                    navigate(PATHS.WEBAPP_SESSIONS);
                  } catch (err: unknown) {
                    const errorObj = err as { response?: { data?: { message?: string } } };
                    console.error('Booking error response:', errorObj?.response?.data || err);
                    setBookingError(
                      errorObj?.response?.data?.message ||
                      t('webapp.experts.bookingError')
                    );
                  } finally {
                    setBooking(false);
                  }
                }}
              />
              {bookingError && (
                <div className="w-full max-w-[900px] mx-auto mt-3 sm:mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm font-['Lexend'] text-center">
                  {bookingError}
                </div>
              )}
              {booking && (
                <div className="w-full max-w-[900px] mx-auto mt-3 sm:mt-4 p-3 sm:p-4 bg-[#4B2E83]/10 border border-[#4B2E83]/20 rounded-xl text-[#4B2E83] text-xs sm:text-sm font-['Lexend'] text-center animate-pulse">
                  {t('webapp.experts.bookingInProgress')}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
