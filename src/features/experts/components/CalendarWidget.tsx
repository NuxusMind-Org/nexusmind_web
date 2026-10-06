import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AppIcon, Skeleton, SkeletonGroup } from '@/components';
import { doctorsApi } from '@/api/doctors.api';
import type { AvailableSlotDto, AppointmentMode } from '@/api/types';

interface CalendarWidgetProps {
  psychologistId: number;
  psychologistName: string;
  onBack: () => void;
  onConfirm: (appointmentDate: string, appointmentTime: string, mode: AppointmentMode) => void;
}

const formatISODate = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const normalizeSlotDate = (dateVal: unknown): string => {
  if (!dateVal) return '';
  if (typeof dateVal === 'string') {
    return dateVal.split('T')[0].trim();
  }
  if (dateVal instanceof Date) {
    return formatISODate(dateVal);
  }
  return String(dateVal).split('T')[0].trim();
};

const normalizeSlotTime = (timeVal: unknown): string => {
  if (!timeVal) return '';
  if (typeof timeVal === 'string') {
    const parts = timeVal.split(':');
    if (parts.length >= 2) {
      const h = parts[0].padStart(2, '0');
      const m = parts[1].padStart(2, '0');
      return `${h}:${m}`;
    }
    return timeVal.slice(0, 5);
  }
  if (Array.isArray(timeVal) && timeVal.length >= 2) {
    const h = String(timeVal[0]).padStart(2, '0');
    const m = String(timeVal[1]).padStart(2, '0');
    return `${h}:${m}`;
  }
  if (typeof timeVal === 'object' && timeVal !== null) {
    const obj = timeVal as { hour?: number; minute?: number };
    if (typeof obj.hour === 'number' && typeof obj.minute === 'number') {
      const h = String(obj.hour).padStart(2, '0');
      const m = String(obj.minute).padStart(2, '0');
      return `${h}:${m}`;
    }
  }
  return String(timeVal).slice(0, 5);
};

const toAppointmentTime = (timeStr: string): string => {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  if (parts.length === 2) {
    return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}:00`;
  }
  return timeStr;
};

const isSlotInPast = (dateIso: string, timeStr: string): boolean => {
  const now = new Date();
  const todayIso = formatISODate(now);
  if (dateIso < todayIso) return true;
  if (dateIso > todayIso) return false;

  const [h, m] = timeStr.split(':').map(Number);
  if (isNaN(h) || isNaN(m)) return false;

  const slotDate = new Date();
  slotDate.setHours(h, m, 0, 0);

  // Require booking at least 15 minutes in advance if today
  const minValidTime = new Date(now.getTime() + 15 * 60 * 1000);
  return slotDate <= minValidTime;
};

const getMonday = (d: Date): Date => {
  const date = new Date(d);
  const day = date.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
};

const formatWeekRange = (start: Date, end: Date, locale: string): string => {
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  const sameYear = start.getFullYear() === end.getFullYear();

  const startDay = start.getDate();
  const endDay = end.getDate();

  if (sameMonth) {
    const monthYear = end.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
    return `${startDay} – ${endDay} ${monthYear}`;
  }

  if (sameYear) {
    const startMonth = start.toLocaleDateString(locale, { month: 'short' });
    const endMonthYear = end.toLocaleDateString(locale, { month: 'short', year: 'numeric' });
    return `${startDay} ${startMonth} – ${endDay} ${endMonthYear}`;
  }

  const startFull = start.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
  const endFull = end.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
  return `${startFull} – ${endFull}`;
};

const formatSelectedDateHeading = (iso: string | null, locale: string): string => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' });
};

export const CalendarWidget = ({ psychologistId, psychologistName, onBack, onConfirm }: CalendarWidgetProps) => {
  const { t, i18n } = useTranslation();
  const today = useMemo(() => new Date(), []);
  const todayIso = useMemo(() => formatISODate(today), [today]);
  const thisWeekMonday = useMemo(() => getMonday(today), [today]);

  const [currentWeekMonday, setCurrentWeekMonday] = useState<Date>(() => getMonday(today));
  const [selectedDate, setSelectedDate] = useState<string | null>(todayIso);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<AppointmentMode>('VIDEO_CALL');
  const [slots, setSlots] = useState<AvailableSlotDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const locale = i18n.language === 'az' ? 'az-AZ' : i18n.language === 'ru' ? 'ru-RU' : 'en-US';

  const isCurrentWeek = currentWeekMonday.getTime() <= thisWeekMonday.getTime();

  // 7 days of the active week: Monday to Sunday
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(currentWeekMonday);
      d.setDate(currentWeekMonday.getDate() + i);
      d.setHours(0, 0, 0, 0);
      return d;
    });
  }, [currentWeekMonday]);

  // Fetch REAL slots for the active week from backend
  useEffect(() => {
    let isCancelled = false;

    const fetchSlots = async () => {
      setIsLoading(true);
      try {
        const weekStart = new Date(currentWeekMonday);
        const weekEnd = new Date(currentWeekMonday);
        weekEnd.setDate(weekEnd.getDate() + 6);

        const from = formatISODate(weekStart < today ? today : weekStart);
        const to = formatISODate(weekEnd);

        const data = await doctorsApi.getAvailableWorkingHours(psychologistId, from, to);
        if (isCancelled) return;

        if (Array.isArray(data) && data.length > 0) {
          const normalized: AvailableSlotDto[] = data.map((s) => ({
            date: normalizeSlotDate(s.date),
            time: normalizeSlotTime(s.time),
            booked: Boolean(s.booked),
          }));
          setSlots(normalized);

          // Update selectedDate if not in active week or to pick first available slot
          setSelectedDate((prevSelected) => {
            const daysInWeek = Array.from({ length: 7 }).map((_, i) => {
              const d = new Date(currentWeekMonday);
              d.setDate(currentWeekMonday.getDate() + i);
              return formatISODate(d);
            });

            if (prevSelected && daysInWeek.includes(prevSelected)) {
              return prevSelected;
            }

            const firstAvailable = daysInWeek.find((isoDate) =>
              normalized.some((s) => s.date === isoDate && !s.booked && !isSlotInPast(isoDate, s.time))
            );

            if (firstAvailable) {
              return firstAvailable;
            }

            if (currentWeekMonday.getTime() === thisWeekMonday.getTime()) {
              return todayIso;
            }
            return daysInWeek[0];
          });
        } else {
          setSlots([]);
          setSelectedDate((prevSelected) => {
            const daysInWeek = Array.from({ length: 7 }).map((_, i) => {
              const d = new Date(currentWeekMonday);
              d.setDate(currentWeekMonday.getDate() + i);
              return formatISODate(d);
            });

            if (prevSelected && daysInWeek.includes(prevSelected)) {
              return prevSelected;
            }
            if (currentWeekMonday.getTime() === thisWeekMonday.getTime()) {
              return todayIso;
            }
            return daysInWeek[0];
          });
        }
      } catch (error) {
        if (isCancelled) return;
        console.warn('Failed to fetch available hours from API:', error);
        setSlots([]);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchSlots();

    return () => {
      isCancelled = true;
    };
  }, [psychologistId, currentWeekMonday, today, todayIso, thisWeekMonday]);

  // Week navigation
  const handlePrevWeek = () => {
    if (isCurrentWeek) return;
    const prev = new Date(currentWeekMonday);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeekMonday(prev);
    setSelectedTime(null);
  };

  const handleNextWeek = () => {
    const next = new Date(currentWeekMonday);
    next.setDate(next.getDate() + 7);
    setCurrentWeekMonday(next);
    setSelectedTime(null);
  };

  const handleJumpToToday = () => {
    setCurrentWeekMonday(thisWeekMonday);
    setSelectedDate(todayIso);
    setSelectedTime(null);
  };

  // Check if a date has any available unbooked future slots
  const hasSlotsForDate = (dateObj: Date): boolean => {
    const iso = formatISODate(dateObj);
    return slots.some((s) => s.date === iso && !s.booked && !isSlotInPast(iso, s.time));
  };

  const getSlotsCountForDate = (dateObj: Date): number => {
    const iso = formatISODate(dateObj);
    return slots.filter((s) => s.date === iso && !s.booked && !isSlotInPast(iso, s.time)).length;
  };

  // Available hours for currently selected date
  const availableHours = useMemo(() => {
    if (!selectedDate) return [];
    const times = slots
      .filter((s) => s.date === selectedDate && !s.booked && !isSlotInPast(selectedDate, s.time))
      .map((s) => s.time);

    const uniqueTimes = Array.from(new Set(times));
    return uniqueTimes.sort((a, b) => a.localeCompare(b));
  }, [slots, selectedDate]);

  const todayStartOfDay = useMemo(() => {
    const d = new Date(today);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [today]);

  const isFormValid = Boolean(selectedDate && selectedTime && !isLoading);

  return (
    <div className="w-full glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-7 text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
            {t('webapp.calendar.title', 'Görüş vaxtını seçin')}
          </h3>
          <p className="text-xs text-white/60 mt-1 font-medium">
            {psychologistName}
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-medium text-white/80 hover:text-white px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <AppIcon icon="lucide:arrow-left" size={14} />
          <span>{t('common.back', 'Geri')}</span>
        </button>
      </div>

      {/* Week Navigator */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h4 className="text-sm sm:text-base font-semibold text-white capitalize">
            {formatWeekRange(weekDays[0], weekDays[6], locale)}
          </h4>
        </div>
        <div className="flex items-center gap-1.5">
          {!isCurrentWeek && (
            <button
              type="button"
              onClick={handleJumpToToday}
              className="text-[11px] font-medium px-2.5 py-1.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/40 text-purple-200 transition-colors cursor-pointer"
            >
              {t('webapp.calendar.thisWeek', 'Bugün')}
            </button>
          )}
          <button
            type="button"
            disabled={isCurrentWeek}
            onClick={handlePrevWeek}
            className={`p-2 rounded-xl transition-all ${
              isCurrentWeek
                ? 'opacity-30 cursor-not-allowed text-white/40 bg-white/5 border border-transparent'
                : 'bg-white/10 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white cursor-pointer active:scale-95'
            }`}
            aria-label="Previous week"
          >
            <AppIcon icon="lucide:chevron-left" size={16} />
          </button>
          <button
            type="button"
            onClick={handleNextWeek}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer active:scale-95"
            aria-label="Next week"
          >
            <AppIcon icon="lucide:chevron-right" size={16} />
          </button>
        </div>
      </div>

      {/* 7-Day Weekly Grid */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {weekDays.map((dateObj) => {
          const iso = formatISODate(dateObj);
          const isSelected = selectedDate === iso;
          const isToday = iso === todayIso;
          const isPast = dateObj < todayStartOfDay;
          const hasSlots = hasSlotsForDate(dateObj);
          const slotCount = getSlotsCountForDate(dateObj);

          const weekdayName = dateObj.toLocaleDateString(locale, { weekday: 'short' });
          const dayNumber = dateObj.getDate();

          return (
            <button
              key={iso}
              type="button"
              disabled={isPast}
              title={hasSlots ? `${slotCount} ${t('webapp.calendar.slotsCount', 'saat mövcuddur')}` : undefined}
              onClick={() => {
                setSelectedDate(iso);
                setSelectedTime(null);
              }}
              className={`py-2.5 sm:py-3 px-1 rounded-xl text-center transition-all flex flex-col items-center justify-between min-h-[66px] sm:min-h-[72px] relative cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] text-white font-bold shadow-[0_4px_16px_rgba(124,58,237,0.45)] border border-purple-300/50 scale-[1.03]'
                  : isPast
                  ? 'text-white/25 cursor-not-allowed border border-transparent pointer-events-none'
                  : hasSlots
                  ? 'bg-purple-500/15 text-white font-semibold hover:bg-purple-500/25 border border-purple-400/40 hover:border-purple-400/70 shadow-[0_0_10px_rgba(168,85,247,0.12)]'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10'
              }`}
            >
              {/* Short Weekday Name (e.g. Mon, B.e, Пн) */}
              <span
                className={`text-[10px] sm:text-[11px] uppercase tracking-wider font-medium truncate max-w-full ${
                  isSelected ? 'text-white/90 font-semibold' : isPast ? 'text-white/20' : 'text-white/55'
                }`}
              >
                {weekdayName}
              </span>

              {/* Day Number */}
              <span
                className={`text-sm sm:text-base my-0.5 leading-tight ${
                  isSelected ? 'text-white font-bold' : isPast ? 'text-white/25' : 'text-white font-semibold'
                }`}
              >
                {dayNumber}
              </span>

              {/* Availability Indicator */}
              <div className="h-2 flex items-center justify-center">
                {isSelected ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                ) : hasSlots ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A682FF] shadow-[0_0_6px_rgba(166,130,255,0.8)]" />
                ) : isToday ? (
                  <span className="w-1 h-1 rounded-full bg-purple-400/60" />
                ) : null}
              </div>

              {/* Today Pill / Top-Right Indicator */}
              {isToday && !isSelected && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#A682FF]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Available Hours */}
      <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
        <span className="text-xs font-semibold text-white/70 uppercase tracking-wider flex items-center justify-between">
          <span>
            {t('webapp.calendar.availableHours', 'Mövcud saatlar')}
            {selectedDate ? ` (${formatSelectedDateHeading(selectedDate, locale)})` : ''}:
          </span>
          {availableHours.length > 0 && (
            <span className="text-[11px] font-medium text-purple-300/90 normal-case bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-400/20">
              {availableHours.length} {t('webapp.calendar.slotsCount', 'saat mövcuddur')}
            </span>
          )}
        </span>

        {isLoading ? (
          <SkeletonGroup
            label={t('webapp.calendar.loadingHours', 'Mövcud saatlar yüklənir...')}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-[34px] !rounded-xl" />
            ))}
          </SkeletonGroup>
        ) : selectedDate && availableHours.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {availableHours.map((timeStr: string) => {
              const isSelected = selectedTime === timeStr;
              return (
                <button
                  key={timeStr}
                  type="button"
                  onClick={() => setSelectedTime(timeStr)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white shadow-[0_4px_14px_rgba(124,58,237,0.4)] border border-purple-300/40'
                      : 'bg-white/5 hover:bg-white/12 text-white/90 hover:text-white border border-white/15 hover:border-purple-400/30'
                  }`}
                >
                  {timeStr}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="py-4 px-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <p className="text-xs text-white/60">
              {selectedDate
                ? t('webapp.calendar.noHours', 'Bu tarixdə mövcud saat yoxdur.')
                : t('webapp.calendar.selectDatePrompt', 'Zəhmət olmasa təqvimdən uyğun tarixi seçin.')}
            </p>
          </div>
        )}
      </div>

      {/* Mode Selection */}
      <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
        <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
          {t('webapp.calendar.sessionFormat', 'Seans formatı')}:
        </span>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setSelectedMode('VIDEO_CALL')}
            className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              selectedMode === 'VIDEO_CALL'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white border border-purple-300/40 shadow-[0_4px_14px_rgba(124,58,237,0.35)]'
                : 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/15'
            }`}
          >
            <AppIcon icon="lucide:video" size={15} />
            <span>{t('webapp.sessions.videoSession', 'Onlayn Video Seans')}</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedMode('VR')}
            className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              selectedMode === 'VR'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white border border-purple-300/40 shadow-[0_4px_14px_rgba(124,58,237,0.35)]'
                : 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/15'
            }`}
          >
            <AppIcon icon="lucide:glasses" size={15} />
            <span>{t('webapp.sessions.vrSession', 'VR Seans')}</span>
          </button>
        </div>
      </div>

      {/* Confirmation Button */}
      <div className="w-full mt-2">
        <button
          type="button"
          disabled={!isFormValid}
          onClick={() => {
            if (selectedDate && selectedTime) {
              onConfirm(selectedDate, toAppointmentTime(selectedTime), selectedMode);
            }
          }}
          className="group relative w-full h-[50px] sm:h-[52px] bg-[#4A148F] hover:bg-[#5b1ab0] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#4A148F] disabled:shadow-none disabled:active:scale-100 text-white font-semibold text-sm sm:text-base rounded-xl flex items-center justify-center transition-all duration-300 ease-out active:scale-[0.98] cursor-pointer shadow-[0_4px_20px_rgba(74,20,143,0.45)] overflow-hidden"
        >
          {/* Animated Conic Border (active when button is enabled) */}
          {isFormValid && (
            <div
              className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden"
              style={{
                padding: '2px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            >
              <div
                className="absolute left-1/2 top-1/2 w-[200%] aspect-square -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-out group-hover:rotate-90"
                style={{
                  background:
                    'conic-gradient(from 315deg, #6700FF 0%, rgba(255, 255, 255, 0.04) 25%, #FFFFFF 50%, rgba(255, 255, 255, 0.07) 75%, #6700FF 100%)',
                }}
              />
            </div>
          )}
          <span className="relative z-10 ponnala-nudge">
            {t('webapp.calendar.confirmBooking', 'Təsdiq et və Seansı Təyin Et')}
          </span>
        </button>
      </div>
    </div>
  );
};
