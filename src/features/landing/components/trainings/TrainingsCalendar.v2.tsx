import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PATHS } from '@/routes/paths';
import type { Training } from '../../constants/trainings';
import supportIcon from '@/assets/svg/supportIcon.svg';

interface TrainingsCalendarProps {
  trainings: Training[];
  onRegister: (training: Training) => void;
}

/**
 * VERSION 2 - Dark Navy Serious Theme
 * Preserved as a version fallback.
 */
export const TrainingsCalendarV2 = ({ trainings, onRegister }: TrainingsCalendarProps) => {
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
    const firstDayIndex = new Date(year, month - 1, 1).getDay();
    const mondayStartOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const daysInMonth = new Date(year, month, 0).getDate();
    const daysInPrevMonth = new Date(year, month - 1, 0).getDate();

    const cells: { day: number; month: 'prev' | 'current' | 'next'; monthNum: number; year: number }[] = [];

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

    for (let i = 1; i <= daysInMonth; i++) {
      cells.push({
        day: i,
        month: 'current',
        monthNum: month,
        year,
      });
    }

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
        <div className="w-full bg-[#131F2E]/90 border border-white/15 rounded-2xl p-5 flex flex-col gap-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
          <h4 className="text-[17px] font-bold text-white tracking-wide font-sans">Filtrlər</h4>
          
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
                ? 'bg-[#00f2ff] border-[#00f2ff] text-slate-900 shadow-[0_0_10px_rgba(0,242,255,0.5)]'
                : 'border-white/30 group-hover:border-white/50 bg-white/5'
            }`}>
              {selectedType === 'all' && (
                <svg className="w-3.5 h-3.5 stroke-[3.5] stroke-slate-900 fill-none" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <span className="text-[14px] text-white/90 group-hover:text-white transition-colors font-medium">
              Bütün təlimlər
            </span>
          </label>
          
          <div className="h-px bg-white/10 w-full" />
          
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                setSelectedType('online');
                setSelectedTag(null);
              }}
              className={`flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer border border-transparent outline-none text-left w-full ${
                selectedType === 'online' ? 'bg-[#00f2ff]/15 border-[#00f2ff]/40 text-white font-semibold' : 'bg-white/5 border-white/5 hover:bg-white/10 text-white/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00f2ff] shadow-[0_0_8px_rgba(0,242,255,0.8)]" />
                <span className="text-[14px] font-medium">Online</span>
              </div>
              <span className="text-[12px] font-bold text-white/80 bg-black/40 px-2 py-0.5 rounded-md border border-white/10">
                {trainings.filter((t) => t.type === 'online').length}
              </span>
            </button>

            <button
              onClick={() => {
                setSelectedType('eyani');
                setSelectedTag(null);
              }}
              className={`flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer border border-transparent outline-none text-left w-full ${
                selectedType === 'eyani' ? 'bg-[#A682FF]/15 border-[#A682FF]/40 text-white font-semibold' : 'bg-white/5 border-white/5 hover:bg-white/10 text-white/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#A682FF] shadow-[0_0_8px_rgba(166,130,255,0.8)]" />
                <span className="text-[14px] font-medium">Canlı (In-person)</span>
              </div>
              <span className="text-[12px] font-bold text-white/80 bg-black/40 px-2 py-0.5 rounded-md border border-white/10">
                {trainings.filter((t) => t.type === 'eyani').length}
              </span>
            </button>
          </div>
        </div>

        {/* Support Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#23143B] via-[#351759] to-[#1E1235] border border-white/20 rounded-[24px] p-7 shadow-2xl flex flex-col gap-4 font-sans text-left">
          <img
            src={supportIcon}
            alt="Support Icon"
            className="absolute -top-1 -right-2 w-20 h-20 pointer-events-none select-none z-0 opacity-20 filter invert"
          />

          <h4 className="text-white text-[19px] font-bold tracking-tight leading-snug pr-12 z-10">
            Dəstək lazımdır?
          </h4>

          <p className="text-white/80 text-[14px] leading-relaxed font-light z-10">
            Mütəxəssislərimiz sizə kömək etməyə hazırdır.
          </p>

          <div className="w-full z-10 mt-1">
            <button
              onClick={() => navigate(`${PATHS.HOME}#experts`)}
              className="w-full py-3 rounded-[14px] text-white text-[14px] font-bold bg-gradient-to-r from-[#8A38F5] to-[#6A16C5] hover:brightness-110 hover:shadow-[0_0_20px_rgba(138,56,245,0.5)] border border-white/20 cursor-pointer transition-all duration-300 select-none outline-none text-center shadow-lg"
            >
              Məsləhət Alın
            </button>
          </div>
        </div>

        {/* Popular Topics Tags */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[14px] font-bold text-white/90 px-1 uppercase tracking-wider">Populyar Mövzular</h4>
          <div className="flex flex-wrap gap-2">
            {['Meditasiya', 'Təşviş', 'Yuxu', 'Özünü Tanıma', 'Uşaq Psixologiyası'].map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTag((prev) => (prev === tag ? null : tag));
                    setSelectedType('all');
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer border outline-none ${
                    isSelected
                      ? 'bg-[#00f2ff] border-[#00f2ff] text-slate-900 font-bold shadow-[0_0_12px_rgba(0,242,255,0.5)]'
                      : 'bg-[#131F2E]/80 border-white/15 text-white/70 hover:border-white/35 hover:text-white hover:bg-white/10'
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
      <div className="flex-1 w-full bg-[#131F2E]/95 border border-white/15 rounded-2xl p-5 sm:p-7 flex flex-col gap-6 shadow-[0_16px_48px_rgba(0,0,0,0.4)] font-sans">
        <div className="flex items-center justify-between border-b border-white/15 pb-5 bg-[#1B2A3E]/60 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevMonth}
              className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all flex items-center justify-center cursor-pointer border border-white/10 outline-none"
              aria-label="Previous month"
            >
              <ChevronLeft size={20} />
            </button>
            <h3 className="text-[19px] sm:text-[22px] font-bold text-white tracking-tight min-w-[150px] text-center capitalize">
              {monthName}
            </h3>
            <button
              onClick={handleNextMonth}
              className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all flex items-center justify-center cursor-pointer border border-white/10 outline-none"
              aria-label="Next month"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <button
            onClick={handleGoToToday}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#9f5bff]/25 to-[#00f2ff]/25 border border-[#00f2ff]/40 text-white hover:border-[#00f2ff] hover:shadow-[0_0_12px_rgba(0,242,255,0.3)] text-[12px] font-bold transition-all cursor-pointer outline-none uppercase tracking-wider"
          >
            BU GÜN
          </button>
        </div>

        <div className="w-full flex flex-col gap-1 overflow-x-auto">
          <div className="min-w-[650px] flex flex-col rounded-xl overflow-hidden border border-white/15 bg-[#0F1724]">
            <div className="grid grid-cols-7 text-center text-white/80 text-[12px] font-extrabold uppercase tracking-wider py-3.5 border-b border-white/15 bg-[#1B2A3E]">
              {weekdays.map((day, idx) => (
                <div key={idx}>
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {cells.map((cell, idx) => {
                const isCurrentMonth = cell.month === 'current';
                
                const cellDateStr = `${cell.year}-${cell.monthNum.toString().padStart(2, '0')}-${cell.day.toString().padStart(2, '0')}`;
                
                const cellTrainings = trainings.filter((t) => {
                  if (t.fullDate !== cellDateStr) return false;
                  if (selectedType !== 'all' && t.type !== selectedType) return false;
                  if (selectedTag !== null && !t.tags.includes(selectedTag)) return false;
                  return true;
                });

                const hasEvent = cellTrainings.length > 0;
                const mainEvent = cellTrainings[0];
                
                let dayBadgeClass = 'bg-white/5 text-white/70';
                if (hasEvent) {
                  dayBadgeClass = mainEvent.type === 'online'
                    ? 'bg-[#00f2ff]/20 text-[#00f2ff] font-bold border border-[#00f2ff]/50'
                    : 'bg-[#A682FF]/20 text-[#A682FF] font-bold border border-[#A682FF]/50';
                }

                return (
                  <div
                    key={idx}
                    className={`p-2.5 flex flex-col justify-between min-h-[125px] border-r border-b border-white/10 transition-colors ${
                      isCurrentMonth ? 'bg-[#0F1724] hover:bg-[#162334]' : 'bg-[#0A101A]/80 opacity-40'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] ${
                        dayBadgeClass
                      }`}>
                        {cell.day}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5 mt-2">
                      {cellTrainings.map((training) => {
                        const isOnline = training.type === 'online';
                        return (
                          <button
                            key={training.id}
                            onClick={() => onRegister(training)}
                            className={`text-left w-full p-2 rounded-lg border text-[11px] font-medium transition-all duration-300 cursor-pointer overflow-hidden flex flex-col gap-1 hover:-translate-y-0.5 hover:shadow-lg ${
                              isOnline
                                ? 'bg-gradient-to-r from-[#00F2FF]/15 to-[#00F2FF]/5 border-[#00F2FF]/40 text-white hover:border-[#00F2FF]'
                                : 'bg-gradient-to-r from-[#A682FF]/15 to-[#A682FF]/5 border-[#A682FF]/40 text-white hover:border-[#A682FF]'
                            }`}
                          >
                            <span className={`text-[9px] font-extrabold tracking-wider uppercase ${
                              isOnline ? 'text-[#00F2FF]' : 'text-[#A682FF]'
                            }`}>
                              {training.time} • {isOnline ? 'ONLINE' : 'CANLI'}
                            </span>
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

        <div className="block sm:hidden border-t border-white/15 pt-4">
          <h4 className="text-[13px] font-bold text-white/90 uppercase tracking-widest mb-3">
            Təlim cədvəli
          </h4>
          <div className="flex flex-col gap-3">
            {trainings
              .filter((t) => {
                const month = parseInt(t.fullDate.split('-')[1]);
                const year = parseInt(t.fullDate.split('-')[0]);
                
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
                    className="flex items-center justify-between p-3.5 rounded-xl border border-white/15 bg-[#0F1724] hover:bg-[#162334] cursor-pointer transition-colors shadow-md"
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
                    <ChevronRight size={16} className="text-white/60" />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
