import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PATHS } from '@/routes/paths';
import type { Training } from '../../constants/trainings';
import supportIcon from '@/assets/svg/supportIcon.svg';

interface TrainingsCalendarProps {
  trainings: Training[];
  onRegister: (training: Training) => void;
}

export const TrainingsCalendar = ({ trainings, onRegister }: TrainingsCalendarProps) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Navigation states
  const [currentMonth, setCurrentMonth] = useState<number>(6); // June
  const [currentYear, setCurrentYear] = useState<number>(2026); // Default 2026

  // Interactive filters
  const [selectedType, setSelectedType] = useState<'all' | 'online' | 'eyani'>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const locale = i18n.language === 'az' ? 'az-AZ' : i18n.language === 'ru' ? 'ru-RU' : 'en-US';
  const monthName = new Date(currentYear, currentMonth - 1, 1).toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
  });

  const weekdays =
    i18n.language === 'az'
      ? ['B.ER', 'Ç.AX', 'ÇƏR', 'C.AX', 'CÜM', 'ŞƏN', 'BAZ']
      : i18n.language === 'ru'
      ? ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
      : ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const popularTopics = [
    { key: 'Meditasiya', label: t('trainings.topicMeditation') },
    { key: 'Təşviş', label: t('trainings.topicAnxiety') },
    { key: 'Yuxu', label: t('trainings.topicSleep') },
    { key: 'Özünü Tanıma', label: t('trainings.topicSelfKnowledge') },
    { key: 'Uşaq Psixologiyası', label: t('trainings.topicChildPsychology') },
  ];

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

  const getBadgeTypeLabel = (isOnline: boolean) => {
    if (isOnline) return t('trainings.online').toUpperCase();
    return i18n.language === 'az' ? 'CANLI' : i18n.language === 'ru' ? 'ОЧНО' : 'IN-PERSON';
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-start select-none">
      {/* 1. Left Sidebar Section */}
      <div className="flex flex-col gap-6 w-full lg:w-[280px] xl:w-[300px] shrink-0 font-sans">
        {/* Filters Card */}
        <div className="w-full bg-[#1E2E42]/85 backdrop-blur-xl border border-white/20 rounded-2xl p-5 flex flex-col gap-5 shadow-[0_12px_36px_rgba(0,0,0,0.25)]">
          <h4 className="text-[17px] font-bold text-white tracking-wide font-sans">{t('trainings.filters')}</h4>
          
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
                ? 'bg-[#00f2ff] border-[#00f2ff] text-slate-900 shadow-[0_0_12px_rgba(0,242,255,0.6)]'
                : 'border-white/30 group-hover:border-white/60 bg-white/10'
            }`}>
              {selectedType === 'all' && (
                <svg className="w-3.5 h-3.5 stroke-[3.5] stroke-slate-900 fill-none" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <span className="text-[14px] text-white/90 group-hover:text-white transition-colors font-semibold">
              {t('trainings.allTrainings')}
            </span>
          </label>
          
          <div className="h-px bg-white/15 w-full" />
          
          <div className="flex flex-col gap-2">
            {/* Online Filter Button */}
            <button
              onClick={() => {
                setSelectedType('online');
                setSelectedTag(null);
              }}
              className={`flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer border outline-none text-left w-full ${
                selectedType === 'online' ? 'bg-[#00f2ff]/20 border-[#00f2ff]/60 text-white font-bold shadow-md' : 'bg-white/5 border-white/10 hover:bg-white/15 text-white/90'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00f2ff] shadow-[0_0_10px_rgba(0,242,255,0.9)]" />
                <span className="text-[14px] font-medium">{t('trainings.online')}</span>
              </div>
              <span className="text-[12px] font-bold text-white bg-black/30 px-2 py-0.5 rounded-md border border-white/15">
                {trainings.filter((t) => t.type === 'online').length}
              </span>
            </button>

            {/* In-person Filter Button */}
            <button
              onClick={() => {
                setSelectedType('eyani');
                setSelectedTag(null);
              }}
              className={`flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer border outline-none text-left w-full ${
                selectedType === 'eyani' ? 'bg-[#A682FF]/20 border-[#A682FF]/60 text-white font-bold shadow-md' : 'bg-white/5 border-white/10 hover:bg-white/15 text-white/90'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#A682FF] shadow-[0_0_10px_rgba(166,130,255,0.9)]" />
                <span className="text-[14px] font-medium">{t('trainings.inPerson')}</span>
              </div>
              <span className="text-[12px] font-bold text-white bg-black/30 px-2 py-0.5 rounded-md border border-white/15">
                {trainings.filter((t) => t.type === 'eyani').length}
              </span>
            </button>
          </div>
        </div>

        {/* Support Card - Luminous Vibrant Purple Theme */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#3B1963] via-[#56228A] to-[#2E1252] border border-white/25 rounded-[24px] p-7 shadow-xl flex flex-col gap-4 font-sans text-left">
          {/* Absolute positioned Support Icon */}
          <img
            src={supportIcon}
            alt="Support Icon"
            className="absolute -top-1 -right-2 w-20 h-20 pointer-events-none select-none z-0 opacity-25 filter invert"
          />

          <h4 className="text-white text-[19px] font-bold tracking-tight leading-snug pr-12 z-10">
            {t('trainings.needSupport')}
          </h4>

          <p className="text-white/85 text-[14px] leading-relaxed font-light z-10">
            {t('trainings.supportDesc')}
          </p>

          <div className="w-full z-10 mt-1">
            <button
              onClick={() => navigate(`${PATHS.HOME}#experts`)}
              className="w-full py-3 rounded-[14px] text-white text-[14px] font-bold bg-gradient-to-r from-[#903BFF] to-[#6A16C5] hover:brightness-110 hover:shadow-[0_0_24px_rgba(144,59,255,0.6)] border border-white/30 cursor-pointer transition-all duration-300 select-none outline-none text-center shadow-md"
            >
              {t('trainings.getConsultation')}
            </button>
          </div>
        </div>

        {/* Popular Topics Tags */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[14px] font-bold text-white/90 px-1 uppercase tracking-wider">{t('trainings.popularTopics')}</h4>
          <div className="flex flex-wrap gap-2">
            {popularTopics.map(({ key, label }) => {
              const isSelected = selectedTag === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedTag((prev) => (prev === key ? null : key));
                    setSelectedType('all'); // Clear type selection to let topic filter dominate
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer border outline-none ${
                    isSelected
                      ? 'bg-[#00f2ff] border-[#00f2ff] text-slate-900 font-bold shadow-[0_0_12px_rgba(0,242,255,0.6)]'
                      : 'bg-[#1E2E42]/80 border-white/20 text-white/80 hover:border-white/40 hover:text-white hover:bg-white/15'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Main Calendar Section (Version 3 - Luminous Slate Teal) */}
      <div className="flex-1 w-full bg-[#1E2E42]/85 backdrop-blur-xl border border-white/20 rounded-2xl p-5 sm:p-7 flex flex-col gap-6 shadow-[0_16px_48px_rgba(0,0,0,0.3)] font-sans">
        {/* Month Header Navigation */}
        <div className="flex items-center justify-between border-b border-white/15 pb-5 bg-[#293B52]/80 p-4 rounded-xl border border-white/10 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevMonth}
              className="w-9 h-9 rounded-lg bg-white/15 hover:bg-white/30 text-white transition-all flex items-center justify-center cursor-pointer border border-white/15 outline-none"
              aria-label="Previous month"
            >
              <ChevronLeft size={20} />
            </button>
            <h3 className="text-[19px] sm:text-[22px] font-bold text-white tracking-tight min-w-[150px] text-center capitalize">
              {monthName}
            </h3>
            <button
              onClick={handleNextMonth}
              className="w-9 h-9 rounded-lg bg-white/15 hover:bg-white/30 text-white transition-all flex items-center justify-center cursor-pointer border border-white/15 outline-none"
              aria-label="Next month"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <button
            onClick={handleGoToToday}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#9f5bff]/35 to-[#00f2ff]/35 border border-[#00f2ff]/60 text-white hover:border-[#00f2ff] hover:shadow-[0_0_15px_rgba(0,242,255,0.4)] text-[12px] font-bold transition-all cursor-pointer outline-none uppercase tracking-wider"
          >
            {t('trainings.today')}
          </button>
        </div>

        {/* Calendar Grid Container */}
        <div className="w-full flex flex-col gap-1 overflow-x-auto">
          <div className="min-w-[650px] flex flex-col rounded-xl overflow-hidden border border-white/20 bg-[#18283A]">
            {/* Weekdays Row */}
            <div className="grid grid-cols-7 text-center text-white text-[12.5px] font-extrabold uppercase tracking-wider py-3.5 border-b border-white/20 bg-[#25374C]">
              {weekdays.map((day, idx) => (
                <div key={idx}>
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7">
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
                
                let dayBadgeClass = 'bg-white/10 text-white/90';
                if (hasEvent) {
                  dayBadgeClass = mainEvent.type === 'online'
                    ? 'bg-[#00f2ff]/25 text-[#00f2ff] font-bold border border-[#00f2ff]/70 shadow-[0_0_8px_rgba(0,242,255,0.4)]'
                    : 'bg-[#A682FF]/25 text-[#A682FF] font-bold border border-[#A682FF]/70 shadow-[0_0_8px_rgba(166,130,255,0.4)]';
                }

                return (
                  <div
                    key={idx}
                    className={`p-2.5 flex flex-col justify-between min-h-[125px] border-r border-b border-white/10 transition-colors ${
                      isCurrentMonth ? 'bg-[#192738]/80 hover:bg-[#23354B]' : 'bg-[#101B28]/60 opacity-40'
                    }`}
                  >
                    {/* Day number badge */}
                    <div className="flex items-center justify-between w-full">
                      <span className={`w-6.5 h-6.5 rounded-full flex items-center justify-center text-[12px] font-semibold ${
                        dayBadgeClass
                      }`}>
                        {cell.day}
                      </span>
                    </div>

                    {/* Trainings layout inside day cell */}
                    <div className="flex flex-col gap-1.5 mt-2">
                      {cellTrainings.map((training) => {
                        const isOnline = training.type === 'online';
                        return (
                          <button
                            key={training.id}
                            onClick={() => onRegister(training)}
                            className={`text-left w-full p-2.5 rounded-xl border text-[11px] font-medium transition-all duration-300 cursor-pointer overflow-hidden flex flex-col gap-1 hover:-translate-y-0.5 hover:shadow-xl ${
                              isOnline
                                ? 'bg-gradient-to-r from-[#00F2FF]/25 to-[#00F2FF]/10 border-[#00F2FF]/50 text-white hover:border-[#00F2FF]'
                                : 'bg-gradient-to-r from-[#A682FF]/25 to-[#A682FF]/10 border-[#A682FF]/50 text-white hover:border-[#A682FF]'
                            }`}
                          >
                            {/* Time / Type badge */}
                            <span className={`text-[9px] font-extrabold tracking-wider uppercase ${
                              isOnline ? 'text-[#00F2FF]' : 'text-[#A682FF]'
                            }`}>
                              {training.time} • {getBadgeTypeLabel(isOnline)}
                            </span>
                            {/* Title */}
                            <span className="font-semibold leading-tight line-clamp-2 text-white">
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
        <div className="block sm:hidden border-t border-white/15 pt-4">
          <h4 className="text-[13px] font-bold text-white uppercase tracking-widest mb-3">
            {t('trainings.schedule')}
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
                    className="flex items-center justify-between p-3.5 rounded-xl border border-white/20 bg-[#192738] hover:bg-[#23354B] cursor-pointer transition-colors shadow-md"
                  >
                    <div className="flex flex-col gap-1">
                      <span className={`text-[10px] font-bold ${
                        isOnline ? 'text-[#00F2FF]' : 'text-[#A682FF]'
                      }`}>
                        {training.date} • {training.time} • {getBadgeTypeLabel(isOnline)}
                      </span>
                      <h5 className="text-[13px] font-semibold text-white">
                        {training.title}
                      </h5>
                    </div>
                    <ChevronRight size={16} className="text-white/70" />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
