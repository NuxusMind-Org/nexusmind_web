import { useState } from 'react';
import { Search, List, Clock, MapPin, Video, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import galleryConsultationImg from '@/assets/gallery/gallery_consultation.png';
import singlePersonImg from '@/assets/single_person.png';
import purpleRoomImg from '@/assets/purple_room.png';

// Dynamic Trainings Dataset
const trainingsData = [
  {
    id: 1,
    title: "Affirmasiya və Meditasiya Texnikaları",
    type: "in-person", // Canlı (In-person)
    date: "2024-06-29",
    time: "17:00",
    location: "Bakı Psixologiya Mərkəzi",
    shortLocation: "BPC",
    price: "35 AZN",
    tags: ["Meditasiya", "Texnika"],
    image: galleryConsultationImg,
  },
  {
    id: 2,
    title: "Affirmasiya və Meditasiya Texnikaları",
    type: "in-person", // Canlı (In-person)
    date: "2024-06-29",
    time: "17:00",
    location: "Bakı Psixologiya Mərkəzi",
    shortLocation: "BPC",
    price: "35 AZN",
    tags: ["Meditasiya", "Texnika"],
    image: galleryConsultationImg,
  },
  {
    id: 3,
    title: "Daxili Rahatlıq Onlayn Kursu",
    type: "online", // Online
    date: "2024-06-18",
    time: "18:00",
    location: "Google Meet",
    shortLocation: "ONLINE",
    price: "35 AZN",
    tags: ["Meditasiya", "Texnika"],
    image: singlePersonImg,
    isLive: true,
  },
  {
    id: 4,
    title: "Stress İdarəetməsi",
    type: "online", // Online
    date: "2024-07-05",
    time: "14:00",
    location: "Google Meet",
    shortLocation: "ONLINE",
    price: "45 AZN",
    tags: ["Stress", "Terapiya"],
    image: purpleRoomImg,
  },
];

// Months in Azerbaijani language
const azMonths = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
  'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
];

// Weekdays in Azerbaijani language starting Monday
const azWeekdays = ['B.ER', 'Ç.AX', 'ÇƏR', 'C.AX', 'CÜM', 'ŞƏN', 'BAZ'];

export const TrainingsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'list' | 'calendar'>('list');
  
  // Calendar month/year navigation state - Default is June 2024 to match mockup
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2024, 5, 1));
  
  // Filter checkboxes state
  const [filters, setFilters] = useState({
    all: true,
    online: true,
    inPerson: true,
  });

  // Filter handlers to keep state in sync
  const handleToggleAll = () => {
    setFilters(prev => {
      const nextAll = !prev.all;
      return {
        all: nextAll,
        online: nextAll,
        inPerson: nextAll
      };
    });
  };

  const handleToggleOnline = () => {
    setFilters(prev => {
      const nextOnline = !prev.online;
      const nextAll = nextOnline && prev.inPerson;
      return {
        ...prev,
        online: nextOnline,
        all: nextAll
      };
    });
  };

  const handleToggleInPerson = () => {
    setFilters(prev => {
      const nextInPerson = !prev.inPerson;
      const nextAll = prev.online && nextInPerson;
      return {
        ...prev,
        inPerson: nextInPerson,
        all: nextAll
      };
    });
  };

  // Month navigation handlers
  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const year = prev.getFullYear();
      const month = prev.getMonth();
      return month === 0 ? new Date(year - 1, 11, 1) : new Date(year, month - 1, 1);
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const year = prev.getFullYear();
      const month = prev.getMonth();
      return month === 11 ? new Date(year + 1, 0, 1) : new Date(year, month + 1, 1);
    });
  };

  const handleToday = () => {
    // Reset back to June 2024 since it has the mockup items, or can reset to current system date.
    // Let's set it to June 2024 specifically so mockup is immediately viewable, or standard system month.
    setCurrentDate(new Date(2024, 5, 1));
  };

  // Helper: generates 42 day cells for standard grid calendar layout
  const getCalendarDays = (year: number, month: number) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    
    // Day of week index for first day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    let firstDayOfWeek = firstDayOfMonth.getDay();
    // Adjust index to start week on Monday: 0 = B.ER, 1 = Ç.AX, ..., 6 = BAZ
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    const days = [];
    
    // Previous month filler days
    const prevMonthLast = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLast - i,
        month: month === 0 ? 11 : month - 1,
        year: month === 0 ? year - 1 : year,
        isCurrentMonth: false,
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        month: month,
        year: year,
        isCurrentMonth: true,
      });
    }
    
    // Next month filler days
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        day: i,
        month: month === 11 ? 0 : month + 1,
        year: month === 11 ? year + 1 : year,
        isCurrentMonth: false,
      });
    }
    
    return days;
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const calendarDays = getCalendarDays(year, month);

  // Filter events based on search input & checkboxes
  const filteredEvents = trainingsData.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesType = false;
    if (filters.all) {
      matchesType = true;
    } else {
      if (event.type === 'online' && filters.online) matchesType = true;
      if (event.type === 'in-person' && filters.inPerson) matchesType = true;
    }
    
    return matchesSearch && matchesType;
  });

  // Split list view items
  const inPersonList = trainingsData.filter(t => t.type === 'in-person' && t.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const onlineList = trainingsData.filter(t => t.type === 'online' && t.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="w-full flex flex-col rounded-t-[38.93px] rounded-b-[38.93px] overflow-hidden shadow-2xl bg-white animate-fade-in min-h-[calc(100vh-64px)] pb-20 opacity-100">
      
      {/* First Section: Top Header Section (Card with Gradient) - Width: 100% full boundary, Height: 271px */}
      <div
        className="w-full rounded-t-[38.93px] rounded-b-none h-[271px] pt-[45px] pb-[35px] px-[48px] flex flex-col justify-between items-center text-center opacity-100 relative"
        style={{
          background: 'linear-gradient(135deg, #CBE8FC 0%, #DDD4F8 33%, #F9D8E8 66%, #FFF5E6 100%)',
        }}
      >
        {/* Centered Heading */}
        <h2 className="w-full text-center text-[28px] md:text-[46.72px] font-normal text-[#1E0A42] leading-[36px] md:leading-[59.84px] tracking-[-0.96px] font-['Lexend'] mt-1">
          Təlimlərlə inkişaf et!
        </h2>

        {/* View Selection Toggle Switch Pill */}
        <div className="flex items-center bg-[#4D2059]/10 rounded-full p-1 border border-white/20 select-none mt-2 z-10">
          <button
            onClick={() => setActiveTab('list')}
            className={`flex items-center gap-1.5 px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 border-0 outline-none cursor-pointer ${
              activeTab === 'list'
                ? 'bg-white text-[#4D2059] shadow-sm'
                : 'text-[#4D2059]/60 bg-transparent hover:text-[#4D2059]'
            }`}
          >
            <List size={14} />
            <span>Siyahı</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-1.5 px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 border-0 outline-none cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-white text-[#4D2059] shadow-sm'
                : 'text-[#4D2059]/60 bg-transparent hover:text-[#4D2059]'
            }`}
          >
            <CalendarIcon size={14} className="opacity-70" />
            <span>Təqvim</span>
          </button>
        </div>

        {/* Centered Search Bar */}
        <div className="w-full max-w-[776px] relative flex items-center mt-3 z-10">
          <span className="absolute left-5 text-[#1E0A42]/50">
            <Search size={18} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Hər şeyi axtarın..."
            className="w-full pl-12 pr-6 py-3.5 bg-white rounded-full border border-[#C2B7D0] text-sm text-[#1E0A42] placeholder-[#1E0A42]/50 focus:outline-none focus:border-[#4D2059]/40 focus:ring-1 focus:ring-[#4D2059]/40 font-['Lexend'] transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Main Content Area (Trainings Feed Grid) - max-width exactly 1239.4px with transitions */}
      <div className="w-full max-w-[1239.4px] mx-auto px-6 py-12 relative min-h-[500px]">
        
        {/* ==================== Siyahı (List) View ==================== */}
        <div
          className={`transition-all duration-500 ease-in-out flex flex-col gap-16 ${
            activeTab === 'list'
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto relative z-10'
              : 'opacity-0 translate-y-8 scale-95 pointer-events-none absolute inset-x-6 top-12 h-0 overflow-hidden invisible'
          }`}
        >
          {/* Part 1: Əyani Təlimlər (In-person) */}
          <div className="w-full flex flex-col gap-6">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <span className="w-1 h-6 bg-[#D946EF] rounded-full mr-2.5" />
                <h3 className="text-[#1E0A42] text-2xl font-bold font-['Lexend']">
                  Əyani Təlimlər
                </h3>
              </div>
              <button className="text-[#4D2059]/70 hover:text-[#4D2059] text-sm font-semibold transition-colors duration-200 cursor-pointer font-['Lexend'] bg-transparent border-0 outline-none">
                Hamısına bax →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[30.98px] w-full justify-start items-stretch">
              {inPersonList.map((item) => (
                <div key={item.id} className="w-full h-[559.47px] rounded-[11.62px] bg-[#4B2E83]/90 border-[1.45px] border-white/55 backdrop-blur-[19.37px] flex flex-col p-0 overflow-hidden relative cursor-pointer group shadow-lg">
                  <div className="w-full h-[280px] rounded-t-[11.62px] rounded-b-none overflow-hidden relative shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                    />
                    <span className="absolute top-3.5 right-3.5 bg-[#0B093C]/60 text-white text-[11px] font-bold px-3 py-1.5 rounded-[5px] uppercase font-['Lexend'] select-none">
                      29 İyun
                    </span>
                  </div>

                  <div className="p-5 pt-4 flex flex-col gap-4 flex-grow">
                    <div className="flex flex-wrap gap-2 text-left">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-white/30 text-white/95 text-[10px] font-semibold px-3 py-1 rounded-full uppercase font-['Lexend']"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h4 className="text-white text-lg font-bold font-['Lexend'] text-left leading-snug line-clamp-1">
                      {item.title}
                    </h4>

                    <div className="flex flex-col gap-2 text-left font-['Lexend'] text-white/80 text-xs sm:text-[13px] font-light">
                      <span className="flex items-center gap-2">
                        <Clock size={15} className="text-white/60 shrink-0" />
                        {item.time}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin size={15} className="text-white/60 shrink-0" />
                        {item.location}
                      </span>
                    </div>

                    <div className="flex justify-between items-center w-full mt-auto pt-2 border-t border-white/10">
                      <span className="text-white font-bold text-lg font-['Lexend']">
                        {item.price}
                      </span>
                      <button className="bg-white hover:bg-white/95 text-[#4B2E83] text-xs font-bold px-6 py-2.5 rounded-full transition-colors cursor-pointer border-0 outline-none select-none font-['Lexend']">
                        Qeydiyyatdan keç
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {inPersonList.length === 0 && (
              <p className="text-[#1E0A42]/60 text-sm font-['Lexend'] py-8 text-left">Hazırda bu kateqoriyada təlim tapılmadı.</p>
            )}
          </div>

          {/* Part 2: Onlayn Təlimlər (Online) */}
          <div className="w-full flex flex-col gap-6">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <span className="w-1 h-6 bg-[#3B82F6] rounded-full mr-2.5" />
                <h3 className="text-[#1E0A42] text-2xl font-bold font-['Lexend']">
                  Onlayn Təlimlər
                </h3>
              </div>
              <div className="flex items-center gap-2 select-none">
                <button className="w-8 h-8 rounded-full border border-[#E5DFDF] hover:bg-gray-50 flex items-center justify-center text-[#4D2059] transition-colors cursor-pointer bg-white outline-none">
                  <ChevronLeft size={16} />
                </button>
                <button className="w-8 h-8 rounded-full border border-[#E5DFDF] hover:bg-gray-50 flex items-center justify-center text-[#4D2059] transition-colors cursor-pointer bg-white outline-none">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[30.98px] w-full justify-start items-stretch">
              {onlineList.map((item) => (
                <div key={item.id} className="w-full h-[559.47px] rounded-[11.62px] bg-[#4B2E83]/90 border-[1.45px] border-white/55 backdrop-blur-[19.37px] flex flex-col p-0 overflow-hidden relative cursor-pointer group shadow-lg">
                  <div className="w-full h-[280px] rounded-t-[11.62px] rounded-b-none overflow-hidden relative shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                    />
                    <span className="absolute top-3.5 right-3.5 bg-[#0B093C]/60 text-white text-[11px] font-bold px-3 py-1.5 rounded-[5px] uppercase font-['Lexend'] select-none">
                      {item.id === 3 ? "18 İyun" : "5 İyul"}
                    </span>
                    {item.isLive && (
                      <span className="absolute bottom-3.5 left-3.5 bg-black/40 text-white text-[10px] font-bold px-3 py-1 rounded-[5px] flex items-center gap-1.5 font-['Lexend'] backdrop-blur-sm select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        CANLI
                      </span>
                    )}
                  </div>

                  <div className="p-5 pt-4 flex flex-col gap-4 flex-grow">
                    <div className="flex flex-wrap gap-2 text-left">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-white/30 text-white/95 text-[10px] font-semibold px-3 py-1 rounded-full uppercase font-['Lexend']"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h4 className="text-white text-lg font-bold font-['Lexend'] text-left leading-snug line-clamp-1">
                      {item.title}
                    </h4>

                    <div className="flex flex-col gap-2 text-left font-['Lexend'] text-white/80 text-xs sm:text-[13px] font-light">
                      <span className="flex items-center gap-2">
                        <Clock size={15} className="text-white/60 shrink-0" />
                        {item.time}
                      </span>
                      <span className="flex items-center gap-2">
                        <Video size={15} className="text-white/60 shrink-0" />
                        {item.location}
                      </span>
                    </div>

                    <div className="flex justify-between items-center w-full mt-auto pt-2 border-t border-white/10">
                      <span className="text-white font-bold text-lg font-['Lexend']">
                        {item.price}
                      </span>
                      <button className="bg-white hover:bg-white/95 text-[#4B2E83] text-xs font-bold px-6 py-2.5 rounded-full transition-colors cursor-pointer border-0 outline-none select-none font-['Lexend']">
                        Qeydiyyatdan keç
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {onlineList.length === 0 && (
              <p className="text-[#1E0A42]/60 text-sm font-['Lexend'] py-8 text-left">Hazırda bu kateqoriyada təlim tapılmadı.</p>
            )}
          </div>
        </div>

        {/* ==================== Təqvim (Calendar) View ==================== */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            activeTab === 'calendar'
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto relative z-10'
              : 'opacity-0 translate-y-8 scale-95 pointer-events-none absolute inset-x-6 top-12 h-0 overflow-hidden invisible'
          }`}
        >
          <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Sidebar Layout */}
            <div className="w-full lg:w-[305px] shrink-0 flex flex-col gap-6">
              
              {/* Card 1: Filters */}
              <div className="w-full bg-[#462985] rounded-[24px] p-6 text-white flex flex-col gap-6 shadow-xl border border-white/10">
                <h4 className="text-lg font-bold font-['Lexend'] text-white text-left">Filtrlər</h4>
                
                <div className="flex flex-col gap-4">
                  {/* Bütün təlimlər */}
                  <label className="flex items-center gap-3 cursor-pointer group select-none text-left">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={filters.all}
                        onChange={handleToggleAll}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        filters.all
                          ? 'bg-[#A682FF] border-[#A682FF]'
                          : 'border-white/30 group-hover:border-white/60'
                      }`}>
                        {filters.all && (
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-white/95">Bütün təlimlər</span>
                  </label>

                  <div className="h-[1px] bg-white/15 my-1" />

                  {/* Online */}
                  <label className="flex items-center justify-between cursor-pointer group select-none">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={filters.online}
                        onChange={handleToggleOnline}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        filters.online
                          ? 'bg-[#D946EF] border-[#D946EF]'
                          : 'border-white/30 group-hover:border-white/60'
                      }`}>
                        {filters.online && (
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-medium text-white/95 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#D946EF]" />
                        Online
                      </span>
                    </div>
                    <span className="text-xs text-white/60 font-semibold bg-white/10 px-2.5 py-0.5 rounded-full">12</span>
                  </label>

                  {/* Canlı */}
                  <label className="flex items-center justify-between cursor-pointer group select-none">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={filters.inPerson}
                        onChange={handleToggleInPerson}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        filters.inPerson
                          ? 'bg-[#7C3AED] border-[#7C3AED]'
                          : 'border-white/30 group-hover:border-white/60'
                      }`}>
                        {filters.inPerson && (
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-medium text-white/95 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" />
                        Canlı (In-person)
                      </span>
                    </div>
                    <span className="text-xs text-white/60 font-semibold bg-white/10 px-2.5 py-0.5 rounded-full">5</span>
                  </label>
                </div>
              </div>

              {/* Card 2: Support */}
              <div className="w-full bg-[#E3DCFF] rounded-[24px] p-6 text-[#1E0A42] flex flex-col gap-4 shadow-xl border border-white/30 relative overflow-hidden text-left">
                {/* Stylized Lotus Outline Graphic inside box */}
                <div className="absolute top-4 right-4 text-[#7C3AED]/25 w-16 h-16 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-full h-full"
                  >
                    <path d="M50 20 C55 35, 65 40, 80 50 C65 60, 55 65, 50 80 C45 65, 35 60, 20 50 C35 40, 45 35, 50 20 Z" />
                    <path d="M50 35 C53 45, 60 48, 70 55 C60 62, 53 65, 50 75 C47 65, 40 62, 30 55 C40 48, 47 45, 50 35 Z" />
                    <circle cx="50" cy="50" r="3" fill="currentColor" />
                  </svg>
                </div>
                <div className="flex flex-col gap-2 max-w-[85%]">
                  <h4 className="text-[17px] font-bold font-['Lexend'] text-[#1E0A42]">Dəstək lazımdır?</h4>
                  <p className="text-xs text-[#1E0A42]/75 font-['Lexend'] leading-relaxed">
                    Mütəxəssislərimiz sizə kömək etməyə hazırdır.
                  </p>
                </div>
                <button className="w-full bg-[#201046] hover:bg-[#341b70] text-white text-xs font-bold py-3 px-6 rounded-full transition-colors cursor-pointer border-0 outline-none mt-2 font-['Lexend'] shadow-md">
                  Məsləhət Alın
                </button>
              </div>

              {/* Card 3: Popular topics */}
              <div className="w-full flex flex-col gap-3.5 text-left">
                <h4 className="text-[15px] font-bold font-['Lexend'] text-[#1E0A42] px-1">Populyar Mövzular</h4>
                <div className="flex flex-wrap gap-2.5">
                  {["Meditasiya", "Təşviş", "Yuxu", "Özünü Tanıma", "Uşaq Psixologiyası"].map((topic) => (
                    <span
                      key={topic}
                      className="bg-[#EAE4FF] hover:bg-[#DDD4F8] text-[#4D2059] text-xs font-semibold px-4 py-2.5 rounded-full cursor-pointer transition-colors duration-200 font-['Lexend'] shadow-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Side Calendar Card */}
            <div className="flex-grow w-full bg-[#311F5E] rounded-[24px] p-6 text-white shadow-2xl border border-white/5 flex flex-col">
              
              {/* Header block */}
              <div className="flex justify-between items-center mb-6">
                
                {/* Month Picker controls */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePrevMonth}
                    className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors cursor-pointer bg-transparent outline-none"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <h3 className="text-xl font-bold font-['Lexend'] min-w-[130px] text-center select-none">
                    {azMonths[month]} {year}
                  </h3>
                  <button
                    onClick={handleNextMonth}
                    className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors cursor-pointer bg-transparent outline-none"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Today button */}
                <button
                  onClick={handleToday}
                  className="border border-white/20 px-5 py-2 rounded-full text-[10px] font-bold tracking-wider hover:bg-white/10 transition-all cursor-pointer bg-transparent uppercase select-none outline-none font-['Lexend']"
                >
                  BU GÜN
                </button>
              </div>

              {/* Grid block */}
              <div className="grid grid-cols-7 border-t border-l border-white/10 rounded-[12px] overflow-hidden bg-white/[0.01]">
                
                {/* Weekday titles */}
                {azWeekdays.map((day) => (
                  <div
                    key={day}
                    className="text-center py-4 text-xs font-bold text-white/50 uppercase tracking-wider bg-white/[0.02] border-r border-b border-white/10 font-['Lexend']"
                  >
                    {day}
                  </div>
                ))}

                {/* Day cells grid */}
                {calendarDays.map((cell, idx) => {
                  const cellDateString = `${cell.year}-${String(cell.month + 1).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`;
                  const dayEvents = filteredEvents.filter(ev => ev.date === cellDateString);

                  return (
                    <div
                      key={idx}
                      className={`min-h-[112px] p-2 flex flex-col gap-1 border-r border-b border-white/10 transition-all font-['Lexend'] text-left ${
                        cell.isCurrentMonth
                          ? 'text-white hover:bg-white/[0.03]'
                          : 'text-white/20 bg-white/[0.005]'
                      }`}
                    >
                      <span className={`text-xs font-bold ${
                        cell.isCurrentMonth
                          ? dayEvents.length > 0 ? 'text-[#A682FF]' : 'text-white/70'
                          : 'text-white/20'
                      }`}>
                        {cell.day}
                      </span>
                      
                      {/* Events block inside day cell */}
                      <div className="flex flex-col gap-1.5 mt-1 overflow-y-auto max-h-[75px] no-scrollbar">
                        {dayEvents.map(event => (
                          <div
                            key={event.id}
                            className={`p-1.5 rounded-[6px] text-left transition-all border ${
                              event.type === 'online'
                                ? 'bg-[#D946EF]/20 border-[#D946EF]/35 hover:bg-[#D946EF]/25'
                                : 'bg-[#7C3AED]/20 border-[#7C3AED]/35 hover:bg-[#7C3AED]/25'
                            }`}
                          >
                            <div className="flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${event.type === 'online' ? 'bg-[#D946EF]' : 'bg-[#7C3AED]'}`} />
                              <span className={`text-[8px] font-bold uppercase tracking-wider ${
                                event.type === 'online' ? 'text-[#F472B6]' : 'text-[#C084FC]'
                              }`}>
                                {event.time} • {event.shortLocation}
                              </span>
                            </div>
                            <p className="text-[10px] font-semibold text-white/95 truncate mt-0.5 leading-snug">
                              {event.title}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

