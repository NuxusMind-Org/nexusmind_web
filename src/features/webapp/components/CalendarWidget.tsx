import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, User } from 'lucide-react';

interface CalendarWidgetProps {
  psychologistName: string;
  onBack: () => void;
  onConfirm: (date: number, time: string) => void;
}

export const CalendarWidget = ({ psychologistName, onBack, onConfirm }: CalendarWidgetProps) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const days = ['B.e', 'Ç.a', 'Ç', 'C.a', 'C', 'Ş', 'B'];
  
  // Use useMemo to prevent random values from changing on every re-render
  const dates = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      available: Math.random() > 0.4
    }));
  }, []);

  const times = [
    '10:00 - 10:45', 
    '11:00 - 11:45', 
    '13:00 - 13:45', 
    '14:00 - 14:45', 
    '15:00 - 15:45', 
    '16:00 - 16:45'
  ];

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
        <div className="w-[100px] hidden sm:block"></div> {/* Spacer for centering on larger screens */}
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Calendar Side */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-[#1E0A42] flex items-center gap-2 font-['Lexend']">
              <CalendarIcon size={20} className="text-[#4B2E83]" />
              Tarix seçin
            </h4>
            <div className="flex items-center gap-4 text-[#1E0A42] font-semibold">
              <button className="p-1 hover:bg-gray-100 rounded-full cursor-pointer border-0 bg-transparent transition-colors">
                <ChevronLeft size={18} />
              </button>
              <span>Avqust 2026</span>
              <button className="p-1 hover:bg-gray-100 rounded-full cursor-pointer border-0 bg-transparent transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center font-['Lexend']">
            {days.map(d => (
              <div key={d} className="text-xs font-bold text-[#7A7570] py-2">{d}</div>
            ))}
            {/* Empty slots for starting day */}
            <div className="py-2"></div>
            <div className="py-2"></div>
            {dates.map(({ day, available }) => (
              <button
                key={day}
                onClick={() => available && setSelectedDate(day)}
                disabled={!available}
                className={`aspect-square rounded-full flex items-center justify-center text-sm font-semibold transition-all border-0 ${
                  !available 
                    ? 'text-gray-300 cursor-not-allowed bg-transparent'
                    : selectedDate === day 
                      ? 'bg-[#4B2E83] text-white shadow-md cursor-pointer' 
                      : 'bg-transparent text-[#1E0A42] hover:bg-gray-100 cursor-pointer'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Time Side */}
        <div className="w-full md:w-[300px] flex flex-col gap-6 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-10">
          <h4 className="text-lg font-bold text-[#1E0A42] flex items-center gap-2 font-['Lexend']">
            <Clock size={20} className="text-[#4B2E83]" />
            Saat seçin
          </h4>
          
          <div className="grid grid-cols-2 gap-3 font-['Lexend']">
            {times.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className={`py-3 px-4 rounded-xl text-sm font-bold cursor-pointer transition-all border ${
                  selectedTime === t 
                    ? 'border-[#4B2E83] bg-[#4B2E83]/10 text-[#4B2E83]' 
                    : 'border-gray-200 bg-white text-[#7A7570] hover:border-[#4B2E83] hover:text-[#4B2E83]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end pt-4 border-t border-gray-100 mt-auto">
        <button 
          disabled={!selectedDate || !selectedTime}
          onClick={() => selectedDate && selectedTime && onConfirm(selectedDate, selectedTime)}
          className="bg-[#4B2E83] hover:bg-[#3C2475] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-[14px] px-8 py-3.5 font-bold font-['Lexend'] flex items-center justify-center transition-all duration-300 shadow-md border-0 cursor-pointer uppercase tracking-wider w-full sm:w-auto"
        >
          Təsdiqlə
        </button>
      </div>
    </div>
  );
};
