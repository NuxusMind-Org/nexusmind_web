import { useState, useMemo, useEffect } from 'react';
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

const monthNames = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
  'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
];

export const CalendarWidget = ({ psychologistId, psychologistName, onBack, onConfirm }: CalendarWidgetProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<AppointmentMode>('VR');
  const [slots, setSlots] = useState<AvailableSlotDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const days = ['B.e', 'Ç.a', 'Ç', 'C.a', 'C', 'Ş', 'B'];

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
    <div className="w-full max-w-[900px] mx-auto bg-white rounded-[24px] sm:rounded-[38.93px] shadow-xl p-6 sm:p-10 border border-gray-100 flex flex-col gap-6 sm:gap-8 animate-fade-in my-4 sm:my-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 gap-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#4B2E83] hover:text-[#3C2475] font-semibold transition-colors cursor-pointer border-0 bg-transparent text-sm sm:text-base font-['Lexend'] w-fit"
        >
          <ChevronLeft size={20} />
          Geri qayıt
        </button>
        <div className="flex flex-col items-center">
          <h3 className="text-xl sm:text-2xl font-bold text-[#1E0A42] font-['Lexend']">
            Seans Təyin Et
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-[#7A7570] font-['Lexend'] text-sm">
            <User size={14} />
            <span>{psychologistName}</span>
          </div>
        </div>
        <div className="w-[100px] hidden sm:block"></div>
      </div>

      {isLoading ? (
        <div className="w-full flex items-center justify-center py-20 text-[#1E0A42]/50 font-['Lexend']">
          Təqvim yüklənir...
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-10">
          {/* Calendar Side */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-[#1E0A42] flex items-center gap-2 font-['Lexend']">
                <CalendarIcon size={20} className="text-[#4B2E83]" />
                Tarix seçin
              </h4>
              <div className="flex items-center gap-4 text-[#1E0A42] font-semibold">
                <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer border-0 bg-transparent transition-colors">
                  <ChevronLeft size={18} />
                </button>
                <span className="w-32 text-center">{monthNames[month]} {year}</span>
                <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer border-0 bg-transparent transition-colors">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center font-['Lexend']">
              {days.map(d => (
                <div key={d} className="text-xs font-bold text-[#7A7570] py-2">{d}</div>
              ))}
              
              {/* Empty slots for starting day */}
              {Array.from({ length: emptySlots }).map((_, i) => (
                <div key={`empty-${i}`} className="py-2"></div>
              ))}
              
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const available = availableDatesMap.has(dateStr);
                
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
                    className={`aspect-square rounded-full flex items-center justify-center text-sm font-semibold transition-all border-0 ${
                      !available 
                        ? 'text-gray-300 cursor-not-allowed bg-transparent'
                        : selectedDate === dateStr 
                          ? 'bg-[#4B2E83] text-white shadow-md cursor-pointer' 
                          : 'bg-transparent text-[#1E0A42] hover:bg-gray-100 cursor-pointer'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Side */}
          <div className="w-full md:w-[300px] flex flex-col gap-6 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-10">
            <h4 className="text-lg font-bold text-[#1E0A42] flex items-center gap-2 font-['Lexend']">
              <Clock size={20} className="text-[#4B2E83]" />
              Saat seçin
            </h4>
            
            {selectedDate ? (
              availableTimesForSelectedDate.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-3 font-['Lexend'] mb-6">
                    {availableTimesForSelectedDate.map(t => (
                      <button
                        key={t.formatted}
                        onClick={() => setSelectedTime(t.formatted)}
                        className={`py-3 px-4 rounded-xl text-sm font-bold cursor-pointer transition-all border ${
                          selectedTime === t.formatted 
                            ? 'border-[#4B2E83] bg-[#4B2E83]/10 text-[#4B2E83]' 
                            : 'border-gray-200 bg-white text-[#7A7570] hover:border-[#4B2E83] hover:text-[#4B2E83]'
                        }`}
                      >
                        {t.formatted}
                      </button>
                    ))}
                  </div>
                  
                  {/* Mode Selection */}
                  <div className="flex flex-col gap-3">
                    <h4 className="text-lg font-bold text-[#1E0A42] flex items-center gap-2 font-['Lexend']">
                      Seans növünü seçin
                    </h4>
                    <div className="grid grid-cols-2 gap-3 font-['Lexend']">
                      <button
                        onClick={() => setSelectedMode('VR')}
                        className={`py-3 px-4 rounded-xl text-sm font-bold cursor-pointer transition-all border ${
                          selectedMode === 'VR'
                            ? 'border-[#03C6B2] bg-[#03C6B2]/10 text-[#03C6B2]'
                            : 'border-gray-200 bg-white text-[#7A7570] hover:border-[#03C6B2] hover:text-[#03C6B2]'
                        }`}
                      >
                        VR Mühiti
                      </button>
                      <button
                        onClick={() => setSelectedMode('VIDEO_CALL')}
                        className={`py-3 px-4 rounded-xl text-sm font-bold cursor-pointer transition-all border ${
                          selectedMode === 'VIDEO_CALL'
                            ? 'border-[#03C6B2] bg-[#03C6B2]/10 text-[#03C6B2]'
                            : 'border-gray-200 bg-white text-[#7A7570] hover:border-[#03C6B2] hover:text-[#03C6B2]'
                        }`}
                      >
                        Video Zəng
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-sm text-gray-500 font-['Lexend'] text-center mt-10">
                  Bu tarixdə boş saat yoxdur.
                </div>
              )
            ) : (
              <div className="text-sm text-gray-500 font-['Lexend'] text-center mt-10">
                Görmək üçün əvvəlcə tarix seçin.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-end pt-4 border-t border-gray-100 mt-auto">
        <button 
          disabled={!selectedDate || !selectedTime}
          onClick={handleConfirm}
          className="bg-[#4B2E83] hover:bg-[#3C2475] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-[14px] px-8 py-3.5 font-bold font-['Lexend'] flex items-center justify-center transition-all duration-300 shadow-md border-0 cursor-pointer uppercase tracking-wider w-full sm:w-auto"
        >
          Təsdiqlə
        </button>
      </div>
    </div>
  );
};
