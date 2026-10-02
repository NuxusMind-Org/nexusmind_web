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

const formatISODate = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const CalendarWidget = ({ psychologistId, psychologistName, onBack, onConfirm }: CalendarWidgetProps) => {
  const { t, i18n } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<AppointmentMode>('VIDEO_CALL');
  const [slots, setSlots] = useState<AvailableSlotDto[]>([]);

  const locale = i18n.language === 'az' ? 'az-AZ' : i18n.language === 'ru' ? 'ru-RU' : 'en-US';

  const days = useMemo(() => {
    const base = new Date(2023, 0, 2); // Monday
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return d.toLocaleDateString(locale, { weekday: 'short' });
    });
  }, [locale]);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const today = new Date();
        const nextMonth = new Date(today);
        nextMonth.setDate(today.getDate() + 30);

        const from = formatISODate(today);
        const to = formatISODate(nextMonth);

        const data = await doctorsApi.getAvailableWorkingHours(psychologistId, from, to);
        setSlots(data || []);
      } catch (error) {
        console.error('Failed to fetch available hours:', error);
        setSlots([]);
      }
    };
    fetchSlots();
  }, [psychologistId]);

  // Calendar dates generation
  const monthData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Monday start adjust (0 is Sun, convert to 6, 1 to 0, etc.)
    const startOffset = (firstDay + 6) % 7;

    const cells = [];
    for (let i = 0; i < startOffset; i++) {
      cells.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(year, month, d));
    }
    return cells;
  }, [currentDate]);

  const availableHours = useMemo(() => {
    if (!selectedDate) return [];
    return slots.filter((s) => s.date === selectedDate && !s.booked).map((s) => s.time);
  }, [slots, selectedDate]);

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
          onClick={onBack}
          className="text-xs text-white/70 hover:text-white px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 transition-colors cursor-pointer"
        >
          {t('common.back', 'Geri')}
        </button>
      </div>

      {/* Month Navigator */}
      <div className="flex items-center justify-between px-2">
        <h4 className="text-base font-medium text-white capitalize">
          {currentDate.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
        </h4>
        <div className="flex items-center gap-1">
          <button
            onClick={() =>
              setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
            }
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <AppIcon icon="lucide:chevron-left" size={18} />
          </button>
          <button
            onClick={() =>
              setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
            }
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <AppIcon icon="lucide:chevron-right" size={18} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="w-full">
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-white/50 mb-2 font-medium">
          {days.map((d, idx) => (
            <div key={idx} className="py-1">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {monthData.map((dateObj, idx) => {
            if (!dateObj) {
              return <div key={`empty-${idx}`} className="h-9 sm:h-10" />;
            }

            const iso = formatISODate(dateObj);
            const isSelected = selectedDate === iso;
            const hasSlots = slots.some((s) => s.date === iso && !s.booked);
            const isPast = dateObj < new Date(new Date().setHours(0, 0, 0, 0));

            return (
              <button
                key={iso}
                disabled={isPast || !hasSlots}
                onClick={() => {
                  setSelectedDate(iso);
                  setSelectedTime(null);
                }}
                className={`h-9 sm:h-10 rounded-xl text-xs sm:text-sm font-medium transition-all flex flex-col items-center justify-center relative ${
                  isSelected
                    ? 'bg-[#00f2ff] text-slate-950 font-bold shadow-[0_0_15px_rgba(0,242,255,0.5)]'
                    : hasSlots && !isPast
                    ? 'bg-white/10 text-white hover:bg-white/20 cursor-pointer border border-white/10'
                    : 'text-white/20 cursor-not-allowed'
                }`}
              >
                <span>{dateObj.getDate()}</span>
                {hasSlots && !isSelected && (
                  <span className="w-1 h-1 rounded-full bg-[#00f2ff] absolute bottom-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Available Hours */}
      {selectedDate && (
        <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
          <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
            {t('webapp.calendar.availableHours', 'Mövcud saatlar')} ({selectedDate}):
          </span>

          {availableHours.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {availableHours.map((timeStr: string) => {
                const isSelected = selectedTime === timeStr;
                return (
                  <button
                    key={timeStr}
                    onClick={() => setSelectedTime(timeStr)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#c084fc] text-[#1e1435] shadow-[0_0_15px_rgba(192,132,252,0.5)]'
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                    }`}
                  >
                    {timeStr.slice(0, 5)}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-white/40 italic">
              {t('webapp.calendar.noHours', 'Bu tarixdə mövcud saat yoxdur.')}
            </p>
          )}
        </div>
      )}

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
        disabled={!selectedDate || !selectedTime}
        onClick={() => {
          if (selectedDate && selectedTime) {
            onConfirm(selectedDate, selectedTime, selectedMode);
          }
        }}
        className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#9f5bff] to-[#00f2ff] hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all shadow-[0_4px_25px_rgba(159,91,255,0.4)] cursor-pointer"
      >
        {t('webapp.calendar.confirmBooking', 'Təsdiq et və Seansı Təyin Et')}
      </button>
    </div>
  );
};
