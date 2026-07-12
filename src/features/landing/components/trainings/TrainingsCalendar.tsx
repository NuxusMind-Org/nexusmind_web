import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PATHS } from '@/routes/paths';
import type { Training } from '../../constants/trainings';

interface TrainingsCalendarProps {
  trainings: Training[];
  onRegister: (training: Training) => void;
}

export const TrainingsCalendar = ({ trainings, onRegister }: TrainingsCalendarProps) => {
  const navigate = useNavigate();

  // Navigation states
  const [currentMonth, setCurrentMonth] = useState<number>(6); // June
  const [currentYear, setCurrentYear] = useState<number>(2026); // Default 2026

  // Interactive filters
  const [selectedType, setSelectedType] = useState<'all' | 'online' | 'eyani'>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const monthNames = [
    'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
    'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
  ];

  const monthName = `${monthNames[currentMonth - 1]} ${currentYear}`;
  const weekdays = ['B.ER', 'Ç.AX', 'ÇƏR', 'C.AX', 'CÜM', 'ŞƏN', 'BAZ'];

  // Generate 42 calendar cells dynamically
  const getCalendarCells = (year: number, month: number) => {
    // firstDayIndex of month: 0 = Sun, 1 = Mon, ..., 6 = Sat
    const firstDayIndex = new Date(year, month - 1, 1).getDay();
    // Monday start offset: 0 = Mon, 1 = Tue, ..., 6 = Sun
    const mondayStartOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const daysInMonth = new Date(year, month, 0).getDate();
    const daysInPrevMonth = new Date(year, month - 1, 0).getDate();

    const cells: { day: number; month: 'prev' | 'current' | 'next'; monthNum: number; year: number }[] = [];

    // Prev month padding
    const prevMonthNum = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    for (let i = mondayStartOffset - 1; i >= 0; i--) {
      cells.push({
        day: daysInPrevMonth - i,
        month: 'prev',
        monthNum: prevMonthNum,
        year: prevYear,
      });
    }

    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      cells.push({
        day: i,
        month: 'current',
        monthNum: month,
        year,
      });
    }

    // Next month padding to fill up 42 cells (6 rows * 7 cols)
    const totalCells = 42;
    const remaining = totalCells - cells.length;
    const nextMonthNum = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    for (let i = 1; i <= remaining; i++) {
      cells.push({
        day: i,
        month: 'next',
        monthNum: nextMonthNum,
        year: nextYear,
      });
    }

    return cells;
  };

  const cells = getCalendarCells(currentYear, currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 1) {
        setCurrentYear((y) => y - 1);
        return 12;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 12) {
        setCurrentYear((y) => y + 1);
        return 1;
      }
      return prev + 1;
    });
  };

  const handleGoToToday = () => {
    const today = new Date();
    // Default to June 2026 if today is not in 2026 so that it showcases the data
    if (today.getFullYear() === 2026) {
      setCurrentMonth(today.getMonth() + 1);
      setCurrentYear(today.getFullYear());
    } else {
      setCurrentMonth(6);
      setCurrentYear(2026);
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-start select-none">
      {/* 1. Left Sidebar Section */}
      <div className="flex flex-col gap-6 w-full lg:w-[280px] xl:w-[300px] shrink-0 font-sans">
        {/* Filters Card */}
        <div className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-5 backdrop-blur-md flex flex-col gap-5 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          <h4 className="text-[17px] font-semibold text-white tracking-wide font-sans">Filtrlər</h4>
          
          {/* Custom interactive checkbox */}
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <input
              type="checkbox"
              checked={selectedType === 'all'}
              onChange={() => {
                setSelectedType('all');
                setSelectedTag(null);
              }}
              className="hidden"
            />
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
              selectedType === 'all'
                ? 'bg-[#00f2ff] border-[#00f2ff] text-slate-900 shadow-[0_0_8px_rgba(0,242,255,0.4)]'
                : 'border-white/30 group-hover:border-white/50 bg-transparent'
            }`}>
              {selectedType === 'all' && (
                <svg className="w-3.5 h-3.5 stroke-[3.5] stroke-slate-900 fill-none" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <span className="text-[14px] text-white/80 group-hover:text-white transition-colors font-medium">
              Bütün təlimlər
            </span>
          </label>
          
          <div className="h-px bg-white/10 w-full" />
          
          <div className="flex flex-col gap-2">
            {/* Online Filter Button */}
            <button
              onClick={() => {
                setSelectedType('online');
                setSelectedTag(null);
              }}
              className={`flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer border-0 outline-none text-left w-full ${
                selectedType === 'online' ? 'bg-white/10' : 'bg-transparent hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00f2ff] shadow-[0_0_8px_rgba(0,242,255,0.6)]" />
                <span className="text-[14px] text-white/80 font-medium">Online</span>
              </div>
              <span className="text-[12px] font-bold text-white/50 bg-white/5 px-2 py-0.5 rounded-md">
                {trainings.filter((t) => t.type === 'online').length}
              </span>
            </button>

            {/* In-person Filter Button */}
            <button
              onClick={() => {
                setSelectedType('eyani');
                setSelectedTag(null);
              }}
              className={`flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer border-0 outline-none text-left w-full ${
                selectedType === 'eyani' ? 'bg-white/10' : 'bg-transparent hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#A682FF] shadow-[0_0_8px_rgba(166,130,255,0.6)]" />
                <span className="text-[14px] text-white/80 font-medium">Canlı (In-person)</span>
              </div>
              <span className="text-[12px] font-bold text-white/50 bg-white/5 px-2 py-0.5 rounded-md">
                {trainings.filter((t) => t.type === 'eyani').length}
              </span>
            </button>
          </div>
        </div>

        {/* Support Card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.2)] bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-md flex flex-col gap-4">
          {/* Decorative Leaf SVG in top right */}
          <div className="absolute -top-1 -right-1 w-14 h-14 opacity-25 text-white/40 pointer-events-none">
            <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
              <path d="M17 8C8 10 7 18 7 18s8-1 10-10zm-5 7c-4 1-5 5-5 5s4 0 5-5zm6-9c-5.5 1-7.5 5.5-7.5 5.5S13 7.5 18 6z" />
            </svg>
          </div>
          
          <div className="flex flex-col gap-1.5 z-10">
            <h5 className="text-[15px] font-semibold text-white">Dəstək lazımdır?</h5>
            <p className="text-[12.5px] text-white/70 leading-relaxed">
              Mütəxəssislərimiz sizə kömək etməyə hazırdır.
            </p>
          </div>
          
          <button
            onClick={() => navigate(`${PATHS.HOME}#experts`)}
            className="w-full py-2.5 rounded-xl text-center text-white text-[12.5px] font-semibold bg-[#4c1d95] hover:bg-[#581c87] hover:shadow-[0_0_15px_rgba(88,28,135,0.5)] transition-all cursor-pointer border-0 outline-none select-none z-10"
          >
            Məsləhət Alın
          </button>
        </div>

        {/* Popular Topics Tags */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[15px] font-semibold text-white/90 px-1">Populyar Mövzular</h4>
          <div className="flex flex-wrap gap-2">
            {['Meditasiya', 'Təşviş', 'Yuxu', 'Özünü Tanıma', 'Uşaq Psixologiyası'].map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTag((prev) => (prev === tag ? null : tag));
                    setSelectedType('all'); // Clear type selection to let topic filter dominate
                  }}
                  className={`px-3 py-1.5 rounded-full text-[11.5px] font-medium transition-all cursor-pointer border outline-none ${
                    isSelected
                      ? 'bg-[#00f2ff] border-[#00f2ff] text-slate-900 font-semibold shadow-[0_0_8px_rgba(0,242,255,0.4)]'
                      : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Main Calendar Section */}
      <div className="flex-1 w-full bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] font-sans">
        {/* Month Header Navigation */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevMonth}
              className="text-white/60 hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none p-1"
            >
              <ChevronLeft size={20} />
            </button>
            <h3 className="text-[18px] sm:text-[20px] font-semibold text-white tracking-tight min-w-[130px] text-center capitalize">
              {monthName}
            </h3>
            <button
              onClick={handleNextMonth}
              className="text-white/60 hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none p-1"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <button
            onClick={handleGoToToday}
            className="px-4 py-1.5 rounded-full border border-white/25 text-white/80 hover:text-white hover:border-white/50 text-[11px] font-bold transition-all cursor-pointer bg-transparent outline-none uppercase tracking-wider"
          >
            BU GÜN
          </button>
        </div>

        {/* Calendar Grid Container */}
        <div className="w-full flex flex-col gap-1 overflow-x-auto">
          <div className="min-w-[650px] flex flex-col">
            {/* Weekdays Row */}
            <div className="grid grid-cols-7 text-center text-white/50 text-[11px] font-bold uppercase tracking-wider py-3 border-b border-white/10 mb-1 bg-white/[0.01] rounded-t-lg">
              {weekdays.map((day, idx) => (
                <div key={idx}>
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 border-t border-l border-white/10 rounded-b-lg overflow-hidden">
              {cells.map((cell, idx) => {
                const isCurrentMonth = cell.month === 'current';
                
                // Construct date string (YYYY-MM-DD)
                const cellDateStr = `${cell.year}-${cell.monthNum.toString().padStart(2, '0')}-${cell.day.toString().padStart(2, '0')}`;
                
                // Get trainings matching filters
                const cellTrainings = trainings.filter((t) => {
                  if (t.fullDate !== cellDateStr) return false;
                  if (selectedType !== 'all' && t.type !== selectedType) return false;
                  if (selectedTag !== null && !t.tags.includes(selectedTag)) return false;
                  return true;
                });

                const hasEvent = cellTrainings.length > 0;
                const mainEvent = cellTrainings[0];
                
                let textHighlightClass = '';
                if (hasEvent) {
                  textHighlightClass = mainEvent.type === 'online' ? 'text-[#00f2ff]' : 'text-[#A682FF]';
                }

                return (
                  <div
                    key={idx}
                    className={`p-2 flex flex-col justify-between min-h-[120px] border-r border-b border-white/10 transition-all ${
                      isCurrentMonth ? 'bg-transparent' : 'bg-black/15 opacity-40'
                    }`}
                  >
                    {/* Day number */}
                    <span className={`text-[12px] font-bold self-start ${
                      textHighlightClass ? textHighlightClass : isCurrentMonth ? 'text-white/80' : 'text-white/30'
                    }`}>
                      {cell.day}
                    </span>

                    {/* Trainings layout inside day cell */}
                    <div className="flex flex-col gap-1.5 mt-2">
                      {cellTrainings.map((training) => {
                        const isOnline = training.type === 'online';
                        return (
                          <button
                            key={training.id}
                            onClick={() => onRegister(training)}
                            className={`text-left w-full p-2 rounded-lg border text-[11px] font-medium transition-all duration-300 cursor-pointer overflow-hidden flex flex-col gap-1 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] ${
                              isOnline
                                ? 'bg-[#00F2FF]/5 border-[#00F2FF]/20 text-white hover:border-[#00F2FF]/40'
                                : 'bg-[#A682FF]/5 border-[#A682FF]/20 text-white hover:border-[#A682FF]/40'
                            }`}
                          >
                            {/* Time / Type badge */}
                            <span className={`text-[9px] font-extrabold tracking-wider uppercase ${
                              isOnline ? 'text-[#00F2FF]' : 'text-[#A682FF]'
                            }`}>
                              {training.time} • {isOnline ? 'ONLINE' : 'CANLI'}
                            </span>
                            {/* Title */}
                            <span className="font-semibold leading-tight line-clamp-2">
                              {training.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming events list view for small screens details */}
        <div className="block sm:hidden border-t border-white/10 pt-4">
          <h4 className="text-[13px] font-bold text-white/80 uppercase tracking-widest mb-3">
            Təlim cədvəli
          </h4>
          <div className="flex flex-col gap-3">
            {trainings
              .filter((t) => {
                const month = parseInt(t.fullDate.split('-')[1]);
                const year = parseInt(t.fullDate.split('-')[0]);
                
                // Matches current active month/year and current filters
                if (month !== currentMonth || year !== currentYear) return false;
                if (selectedType !== 'all' && t.type !== selectedType) return false;
                if (selectedTag !== null && !t.tags.includes(selectedTag)) return false;
                return true;
              })
              .map((training) => {
                const isOnline = training.type === 'online';
                return (
                  <div
                    key={training.id}
                    onClick={() => onRegister(training)}
                    className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/[0.01] hover:bg-white/[0.05] cursor-pointer transition-colors"
                  >
                    <div className="flex flex-col gap-1">
                      <span className={`text-[10px] font-bold ${
                        isOnline ? 'text-[#00F2FF]' : 'text-[#A682FF]'
                      }`}>
                        {training.date} • {training.time} • {isOnline ? 'ONLINE' : 'CANLI'}
                      </span>
                      <h5 className="text-[13px] font-semibold text-white">
                        {training.title}
                      </h5>
                    </div>
                    <ChevronRight size={16} className="text-white/40" />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
