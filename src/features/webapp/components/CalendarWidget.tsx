import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, User } from 'lucide-react';
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
  const [selectedMode, setSelectedMode] = useState<AppointmentMode>('VR');
  const [slots, setSlots] = useState<AvailableSlotDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const locale = i18n.language === 'az' ? 'az-AZ' : i18n.language === 'ru' ? 'ru-RU' : 'en-US';

  const days = useMemo(() => {
    // Mon-Sun
    const base = new Date(2023, 0, 2); // A Monday
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return d.toLocaleDateString(locale, { weekday: 'short' });
    });
  }, [locale]);

  useEffect(() => {
    const fetchSlots = async () => {
      setIsLoading(true);
      try {
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        
        const from = formatISODate(today);
        const to = formatISODate(nextWeek);
        
        const data = await doctorsApi.getAvailableWorkingHours(psychologistId, from, to);
        setSlots(data || []);
      } catch (error) {
        console.error('Failed to fetch available hours:', error);
        setSlots([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSlots();
  }, [psychologistId]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // Adjust so Monday is 0, Sunday is 6
  const emptySlots = (firstDayOfMonth + 6) % 7;

  // Group slots by date
  const availableDatesMap = useMemo(() => {
    const map = new Map<string, boolean>();
    slots.forEach(slot => {
      if (!slot.booked) {
        map.set(slot.date, true);
      }
    });
    return map;
  }, [slots]);

  // Available times for the selected date
  const availableTimesForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    return slots
      .filter(s => s.date === selectedDate && !s.booked)
      .map(s => {
        // s.time is a string like "08:00:00"
        const [hourStr, minStr] = s.time.split(':');
        
        let startH = parseInt(hourStr, 10);
        let startM = parseInt(minStr, 10);
        
        let endH = startH;
        let endM = startM + 45;
        if (endM >= 60) {
          endM -= 60;
          endH += 1;
        }
        
        const finalStartHour = String(startH).padStart(2, '0');
        const finalStartMin = String(startM).padStart(2, '0');
        const endHour = String(endH).padStart(2, '0');
        const endMinute = String(endM).padStart(2, '0');
        
        return {
          original: s,
          formatted: `${finalStartHour}:${finalStartMin} - ${endHour}:${endMinute}`,
          startTime: `${finalStartHour}:${finalStartMin}:00`
        };
      })
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [selectedDate, slots]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return;
    
    // Find the original start time from our mapped array
    const timeObj = availableTimesForSelectedDate.find(t => t.formatted === selectedTime);
    if (!timeObj) return;

    onConfirm(selectedDate, timeObj.startTime, selectedMode);
  };

  return (
    <div className="w-full max-w-[900px] mx-auto bg-white rounded-2xl sm:rounded-3xl md:rounded-[38.93px] shadow-xl p-3.5 sm:p-6 md:p-8 lg:p-10 border border-gray-100 flex flex-col gap-5 sm:gap-8 animate-fade-in my-2 sm:my-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-3.5 sm:pb-4 gap-3 sm:gap-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-1.5 sm:gap-2 text-[#4B2E83] hover:text-[#3C2475] font-semibold transition-colors cursor-pointer border-0 bg-transparent text-xs sm:text-sm md:text-base font-['Lexend'] w-fit py-1 px-1 -ml-1 rounded-lg hover:bg-[#4B2E83]/5"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          {t('webapp.calendar.back')}
        </button>
        <div className="flex flex-col items-center text-center">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1E0A42] font-['Lexend'] leading-tight">
            {t('webapp.calendar.setSession')}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-[#7A7570] font-['Lexend'] text-xs sm:text-sm">
            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4B2E83]" />
            <span className="font-medium text-[#1E0A42]/80">{psychologistName}</span>
          </div>
        </div>
        <div className="w-[80px] hidden sm:block"></div>
      </div>

      {isLoading ? (
        <div className="w-full flex items-center justify-center py-16 sm:py-20 text-[#1E0A42]/50 font-['Lexend'] text-xs sm:text-sm">
          {t('webapp.calendar.loading')}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10">
          {/* Calendar Side */}
          <div className="flex-1 flex flex-col gap-4 sm:gap-6">
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
              <h4 className="text-sm sm:text-base md:text-lg font-bold text-[#1E0A42] flex items-center gap-1.5 sm:gap-2 font-['Lexend']">
                <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#4B2E83] shrink-0" />
                <span>{t('webapp.calendar.selectDate')}</span>
              </h4>
              <div className="flex items-center gap-1 sm:gap-2 text-[#1E0A42] font-semibold text-xs sm:text-sm md:text-base ml-auto sm:ml-0">
                <button 
                  onClick={handlePrevMonth} 
                  aria-label="Previous month"
                  className="p-1 sm:p-1.5 hover:bg-gray-100 rounded-full cursor-pointer border-0 bg-transparent transition-colors flex items-center justify-center text-[#1E0A42]"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </button>
                <span className="w-28 sm:w-36 text-center capitalize font-semibold tracking-tight truncate">
                  {new Date(year, month, 1).toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
                </span>
                <button 
                  onClick={handleNextMonth} 
                  aria-label="Next month"
                  className="p-1 sm:p-1.5 hover:bg-gray-100 rounded-full cursor-pointer border-0 bg-transparent transition-colors flex items-center justify-center text-[#1E0A42]"
                >
                  <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-1.5 md:gap-2 text-center font-['Lexend'] select-none">
              {days.map(d => (
                <div key={d} className="text-[10px] sm:text-xs font-bold text-[#7A7570] py-1 sm:py-2 uppercase tracking-wider">
                  {d}
                </div>
              ))}
              
              {/* Empty slots for starting day */}
              {Array.from({ length: emptySlots }).map((_, i) => (
                <div key={`empty-${i}`} className="py-1 sm:py-2"></div>
              ))}
              
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const available = availableDatesMap.has(dateStr);
                const isSelected = selectedDate === dateStr;
                
                return (
                  <button
                    key={day}
                    onClick={() => {
                      if (available) {
                        setSelectedDate(dateStr);
                        setSelectedTime(null);
                      }
                    }}
                    disabled={!available}
                    className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 mx-auto aspect-square rounded-full flex items-center justify-center text-xs sm:text-sm font-medium sm:font-semibold transition-all border-0 ${
                      !available 
                        ? 'text-gray-300 cursor-not-allowed bg-transparent'
                        : isSelected 
                          ? 'bg-[#4B2E83] text-white shadow-md cursor-pointer font-bold scale-105' 
                          : 'bg-transparent text-[#1E0A42] hover:bg-gray-100 cursor-pointer font-semibold'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time & Mode Side */}
          <div className="w-full md:w-[290px] lg:w-[320px] flex flex-col gap-4 sm:gap-6 border-t md:border-t-0 md:border-l border-gray-100 pt-4 sm:pt-6 md:pt-0 md:pl-6 lg:pl-8">
            <h4 className="text-sm sm:text-base md:text-lg font-bold text-[#1E0A42] flex items-center gap-1.5 sm:gap-2 font-['Lexend']">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#4B2E83] shrink-0" />
              <span>{t('webapp.calendar.selectTime')}</span>
            </h4>
            
            {selectedDate ? (
              availableTimesForSelectedDate.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5 font-['Lexend'] mb-2 sm:mb-4 max-h-[200px] sm:max-h-[250px] overflow-y-auto pr-1">
                    {availableTimesForSelectedDate.map(t => (
                      <button
                        key={t.formatted}
                        onClick={() => setSelectedTime(t.formatted)}
                        className={`py-2 sm:py-2.5 md:py-3 px-1.5 sm:px-3 rounded-xl text-xs sm:text-sm font-semibold tracking-tight text-center whitespace-nowrap cursor-pointer transition-all border ${
                          selectedTime === t.formatted 
                            ? 'border-[#4B2E83] bg-[#4B2E83]/10 text-[#4B2E83] font-bold shadow-xs' 
                            : 'border-gray-200 bg-white text-[#7A7570] hover:border-[#4B2E83] hover:text-[#4B2E83]'
                        }`}
                      >
                        {t.formatted}
                      </button>
                    ))}
                  </div>
                  
                  {/* Mode Selection */}
                  <div className="flex flex-col gap-2 sm:gap-3 mt-1 sm:mt-2">
                    <h4 className="text-sm sm:text-base md:text-lg font-bold text-[#1E0A42] flex items-center gap-1.5 sm:gap-2 font-['Lexend']">
                      <span>{t('webapp.calendar.selectMode')}</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 font-['Lexend']">
                      <button
                        onClick={() => setSelectedMode('VR')}
                        className={`py-2 sm:py-2.5 md:py-3 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-semibold sm:font-bold cursor-pointer transition-all border text-center ${
                          selectedMode === 'VR'
                            ? 'border-[#03C6B2] bg-[#03C6B2]/10 text-[#03C6B2]'
                            : 'border-gray-200 bg-white text-[#7A7570] hover:border-[#03C6B2] hover:text-[#03C6B2]'
                        }`}
                      >
                        {t('webapp.calendar.vrMode')}
                      </button>
                      <button
                        onClick={() => setSelectedMode('VIDEO_CALL')}
                        className={`py-2 sm:py-2.5 md:py-3 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-semibold sm:font-bold cursor-pointer transition-all border text-center ${
                          selectedMode === 'VIDEO_CALL'
                            ? 'border-[#03C6B2] bg-[#03C6B2]/10 text-[#03C6B2]'
                            : 'border-gray-200 bg-white text-[#7A7570] hover:border-[#03C6B2] hover:text-[#03C6B2]'
                        }`}
                      >
                        {t('webapp.calendar.videoMode')}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-xs sm:text-sm text-gray-400 font-['Lexend'] text-center py-6 sm:py-10 bg-gray-50/70 rounded-xl border border-dashed border-gray-200 px-3">
                  {t('webapp.calendar.noSlotsForDate')}
                </div>
              )
            ) : (
              <div className="text-xs sm:text-sm text-gray-400 font-['Lexend'] text-center py-6 sm:py-10 bg-gray-50/70 rounded-xl border border-dashed border-gray-200 px-3">
                {t('webapp.calendar.selectDatePrompt')}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3.5 sm:pt-4 border-t border-gray-100 mt-auto">
        {selectedDate && selectedTime ? (
          <div className="text-xs sm:text-sm text-[#1E0A42]/70 font-['Lexend'] flex items-center gap-1.5 self-start sm:self-center">
            <span className="font-semibold text-[#4B2E83]">{selectedDate}</span>
            <span>•</span>
            <span className="font-semibold text-[#4B2E83]">{selectedTime}</span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded-md bg-[#03C6B2]/15 text-[#03C6B2] font-bold text-[10px] sm:text-xs">
              {selectedMode === 'VR' ? t('webapp.calendar.vrMode') : t('webapp.calendar.videoMode')}
            </span>
          </div>
        ) : (
          <div className="hidden sm:block"></div>
        )}
        <button 
          disabled={!selectedDate || !selectedTime}
          onClick={handleConfirm}
          className="bg-[#4B2E83] hover:bg-[#3C2475] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 text-white rounded-xl sm:rounded-[14px] px-6 sm:px-8 py-3 sm:py-3.5 font-bold font-['Lexend'] text-xs sm:text-sm md:text-base flex items-center justify-center transition-all duration-300 shadow-md border-0 cursor-pointer uppercase tracking-wider w-full sm:w-auto"
        >
          {t('webapp.calendar.confirm')}
        </button>
      </div>
    </div>
  );
};
