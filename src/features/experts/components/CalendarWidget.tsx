import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/components';
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

export const CalendarWidget = ({ psychologistId, psychologistName, onBack, onConfirm }: CalendarWidgetProps) => {
  const { t, i18n } = useTranslation();
  const today = useMemo(() => new Date(), []);
  const todayIso = useMemo(() => formatISODate(today), [today]);

  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [selectedDate, setSelectedDate] = useState<string | null>(todayIso);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<AppointmentMode>('VIDEO_CALL');
  const [slots, setSlots] = useState<AvailableSlotDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const locale = i18n.language === 'az' ? 'az-AZ' : i18n.language === 'ru' ? 'ru-RU' : 'en-US';

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const isCurrentMonth = useMemo(() => {
    return year === today.getFullYear() && month <= today.getMonth();
  }, [year, month, today]);

  // Weekday labels starting from Monday
  const days = useMemo(() => {
    const base = new Date(2023, 0, 2); // Monday, Jan 2 2023
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return d.toLocaleDateString(locale, { weekday: 'short' });
    });
  }, [locale]);

  // Calendar dates generation for the viewed month
  const monthData = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Monday start adjust (0 is Sun -> 6, 1 is Mon -> 0, etc.)
    const startOffset = (firstDay + 6) % 7;

    const cells: (Date | null)[] = [];
    for (let i = 0; i < startOffset; i++) {
      cells.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(year, month, d));
    }
    return cells;
  }, [year, month]);

  // Fetch REAL slots from working hours controller whenever psychologistId, year, or month changes
  useEffect(() => {
    let isCancelled = false;

    const fetchSlots = async () => {
      setIsLoading(true);
      try {
        const startOfMonth = new Date(year, month, 1);
        const endOfMonth = new Date(year, month + 1, 0);

        const from = formatISODate(startOfMonth < today ? today : startOfMonth);
        const to = formatISODate(endOfMonth);

        const data = await doctorsApi.getAvailableWorkingHours(psychologistId, from, to);
        if (isCancelled) return;

        if (Array.isArray(data) && data.length > 0) {
          const normalized: AvailableSlotDto[] = data.map((s) => ({
            date: normalizeSlotDate(s.date),
            time: normalizeSlotTime(s.time),
            booked: Boolean(s.booked),
          }));
          setSlots(normalized);
        } else {
          // No mock data - only real data from backend
          setSlots([]);
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
  }, [psychologistId, year, month, today]);

  // Check if a date has any available, unbooked future slots from the backend
  const hasSlotsForDate = (dateObj: Date): boolean => {
    const iso = formatISODate(dateObj);
    return slots.some((s) => s.date === iso && !s.booked && !isSlotInPast(iso, s.time));
  };

  // Available hours for the currently selected date (only real data)
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

  return (
    <div className="w-full bg-[#1b172a]/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 text-white shadow-2xl flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h3 className="text-xl font-semibold text-white">
            {t('webapp.calendar.title', 'Görüş vaxtını seçin')}
          </h3>
          <p className="text-xs text-white/60 mt-1">
            {psychologistName}
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-white/70 hover:text-white px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 transition-colors cursor-pointer"
        >
          {t('common.back', 'Geri')}
        </button>
      </div>

      {/* Month Navigator */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-medium text-white capitalize">
            {currentDate.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
          </h4>
          {isLoading && (
            <div className="w-3.5 h-3.5 border-2 border-[#00f2ff]/30 border-t-[#00f2ff] rounded-full animate-spin" />
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={isCurrentMonth}
            onClick={() => {
              const prevMonth = new Date(year, month - 1, 1);
              setCurrentDate(prevMonth);
              if (prevMonth.getFullYear() === today.getFullYear() && prevMonth.getMonth() === today.getMonth()) {
                setSelectedDate(todayIso);
              } else {
                setSelectedDate(formatISODate(prevMonth));
              }
              setSelectedTime(null);
            }}
            className={`p-1.5 rounded-lg transition-colors ${
              isCurrentMonth
                ? 'opacity-30 cursor-not-allowed text-white/40 bg-white/5'
                : 'bg-white/10 hover:bg-white/15 text-white/80 hover:text-white cursor-pointer'
            }`}
            aria-label="Previous month"
          >
            <AppIcon icon="lucide:chevron-left" size={18} />
          </button>
          <button
            type="button"
            onClick={() => {
              const nextMonth = new Date(year, month + 1, 1);
              setCurrentDate(nextMonth);
              if (nextMonth.getFullYear() === today.getFullYear() && nextMonth.getMonth() === today.getMonth()) {
                setSelectedDate(todayIso);
              } else {
                setSelectedDate(formatISODate(nextMonth));
              }
              setSelectedTime(null);
            }}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Next month"
          >
            <AppIcon icon="lucide:chevron-right" size={18} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="w-full">
        {/* Weekday headers: Mon - Sun */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-white/50 mb-2 font-medium">
          {days.map((d, idx) => (
            <div key={idx} className="py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Days grid: All 7 days of the week are available */}
        <div className="grid grid-cols-7 gap-1.5">
          {monthData.map((dateObj, idx) => {
            if (!dateObj) {
              return <div key={`empty-${idx}`} className="h-9 sm:h-10" />;
            }

            const iso = formatISODate(dateObj);
            const isSelected = selectedDate === iso;
            const isToday = iso === todayIso;
            const isPast = dateObj < todayStartOfDay;
            const hasSlots = hasSlotsForDate(dateObj);

            return (
              <button
                key={iso}
                type="button"
                disabled={isPast}
                onClick={() => {
                  setSelectedDate(iso);
                  setSelectedTime(null);
                }}
                className={`h-9 sm:h-10 rounded-xl text-xs sm:text-sm font-medium transition-all flex flex-col items-center justify-center relative ${
                  isSelected
                    ? 'bg-[#00f2ff] text-slate-950 font-bold shadow-[0_0_15px_rgba(0,242,255,0.5)]'
                    : isPast
                    ? 'text-white/20 cursor-not-allowed'
                    : hasSlots
                    ? 'bg-white/10 text-white hover:bg-white/20 cursor-pointer border border-white/15'
                    : 'text-white/70 hover:bg-white/10 hover:text-white cursor-pointer border border-transparent'
                }`}
              >
                <span>{dateObj.getDate()}</span>
                {/* Dot for available real hours */}
                {hasSlots && !isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f2ff] absolute bottom-1" />
                )}
                {/* Indicator for today */}
                {isToday && !isSelected && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#c084fc]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Available Hours (Real data only) */}
      <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
        <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
          {t('webapp.calendar.availableHours', 'Mövcud saatlar')}
          {selectedDate ? ` (${selectedDate})` : ''}:
        </span>

        {isLoading ? (
          <div className="py-6 flex items-center justify-center gap-2 text-white/50 text-xs">
            <div className="w-4 h-4 border-2 border-[#00f2ff]/30 border-t-[#00f2ff] rounded-full animate-spin" />
            <span>{t('webapp.calendar.loadingHours', 'Mövcud saatlar yüklənir...')}</span>
          </div>
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
                      ? 'bg-[#c084fc] text-[#1e1435] shadow-[0_0_15px_rgba(192,132,252,0.5)]'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
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
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setSelectedMode('VIDEO_CALL')}
            className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedMode === 'VIDEO_CALL'
                ? 'bg-[#00f2ff] text-slate-950 font-bold'
                : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
            }`}
          >
            {t('webapp.sessions.videoSession', 'Onlayn Video Seans')}
          </button>
          <button
            type="button"
            onClick={() => setSelectedMode('VR')}
            className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedMode === 'VR'
                ? 'bg-[#00f2ff] text-slate-950 font-bold'
                : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
            }`}
          >
            {t('webapp.sessions.vrSession', 'VR Seans')}
          </button>
        </div>
      </div>

      {/* Confirmation Button */}
      <button
        type="button"
        disabled={!selectedDate || !selectedTime || isLoading}
        onClick={() => {
          if (selectedDate && selectedTime) {
            onConfirm(selectedDate, toAppointmentTime(selectedTime), selectedMode);
          }
        }}
        className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#9f5bff] to-[#00f2ff] hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all shadow-[0_4px_25px_rgba(159,91,255,0.4)] cursor-pointer"
      >
        {t('webapp.calendar.confirmBooking', 'Təsdiq et və Seansı Təyin Et')}
      </button>
    </div>
  );
};
