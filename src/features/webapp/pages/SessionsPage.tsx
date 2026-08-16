import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, ChevronLeft, ChevronRight, Plus, Calendar, Clock } from 'lucide-react';
import { psychologists } from '@/features/landing/data/psychologists';
import { PATHS } from '@/routes/paths';
import presentingNexie from '@/assets/svg/presenting_nexie.svg';
import { useSessionStore } from '@/store/sessionStore';

export const SessionsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessions = useSessionStore(state => state.sessions);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const cardWidth = 618; // Card width 593.6px + gap 24px
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full flex flex-col rounded-t-[20px] md:rounded-t-[38.93px] rounded-b-[20px] md:rounded-b-[38.93px] overflow-hidden shadow-2xl bg-white animate-fade-in min-h-[calc(100vh-64px)] pb-10 opacity-100">

      {/* Top Header Section (Card with Gradient) - Height 250px */}
      <div
        className="w-full rounded-t-[20px] md:rounded-t-[38.93px] rounded-b-none h-[200px] sm:h-[230px] md:h-[250px] pt-[24px] sm:pt-[36px] md:pt-[48px] pb-[24px] sm:pb-[32px] md:pb-[38px] px-4 sm:px-6 md:px-[48px] flex flex-col justify-between items-center text-center opacity-100 relative"
        style={{
          background: 'linear-gradient(135deg, #CBE8FC 0%, #DDD4F8 33%, #F9D8E8 66%, #FFF5E6 100%)',
        }}
      >
        {/* Centered Heading */}
        <h2 className="w-full text-center text-[28px] md:text-[46.72px] font-normal text-[#1E0A42] leading-[36px] md:leading-[59.84px] tracking-[-0.96px] font-['Lexend'] mt-2">
          Bugünkü seansa hazırsan ?
        </h2>

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
            className="w-full pl-12 pr-6 py-4.5 bg-white border border-[#44E2CD]/40 focus:border-[#44E2CD] text-sm text-[#1E0A42] font-semibold rounded-full outline-none shadow-md placeholder-[#1E0A42]/40 transition-all font-['Lexend']"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow w-full flex flex-col justify-center pt-10 md:pt-14 pb-12 px-4 sm:px-6 md:px-[48px] gap-6 bg-[#FAFAFA] min-h-[350px]">
        {sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full">
            <h3 className="text-[32px] md:text-[42px] font-light text-[#7A7570] font-['Lexend'] text-center">
              Hələki seans yoxdur .
            </h3>

            <div className="relative w-full max-w-[500px] h-[235px] sm:h-[320px] mt-4 sm:mt-8 mx-auto">
              <img
                src={presentingNexie}
                alt="Presenting Nexie"
                className="absolute left-[50%] -translate-x-[85%] sm:-translate-x-[85%] bottom-0 w-[200px] sm:w-[260px] object-contain"
              />
              <button 
                onClick={() => navigate(PATHS.WEBAPP_EXPERTS)}
                className="absolute top-[25%] sm:top-[32%] left-[59%] -translate-x-[15%] sm:-translate-x-[15%] translate-y-[-50%] bg-[#4B2E83] hover:bg-[#3C2475] text-white rounded-full px-4 sm:px-6 py-3 sm:py-4 font-semibold font-['Lexend'] flex items-center justify-center gap-2 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] text-[11px] sm:text-[15px] border-0 cursor-pointer uppercase tracking-wide whitespace-nowrap z-10"
              >
                <Plus strokeWidth={2.5} className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
                seans təyin et
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-6 animate-fade-in mx-auto">
            <div className="flex justify-between items-center mb-2">
               <h3 className="text-[24px] md:text-[28px] font-bold text-[#1E0A42] font-['Lexend']">
                 Qarşıdan gələn seanslar
               </h3>
               <button 
                 onClick={() => navigate(PATHS.WEBAPP_EXPERTS)}
                 className="flex items-center gap-1.5 text-sm md:text-base font-semibold text-[#4B2E83] hover:text-[#3C2475] transition-colors bg-transparent border-0 cursor-pointer font-['Lexend']"
               >
                 <Plus size={18} /> Yeni Seans
               </button>
            </div>
            {sessions.map(session => {
              const psych = psychologists.find(p => p.id === session.psychologistId);
              const title = psych ? psych.title : 'Klinik Psixoloq';
              const startTime = session.time.split(' - ')[0] || session.time;
              
              return (
                <div 
                  key={session.id} 
                  className="w-full relative overflow-hidden rounded-[24px] sm:rounded-[33px] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 hover:scale-[1.01] transition-transform duration-300"
                  style={{
                    background: 'linear-gradient(100deg, #3B2068 0%, #5E38A0 50%, #8B63C9 100%)',
                    boxShadow: '0px 27px 83px rgba(75, 46, 131, 0.35)'
                  }}
                >
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-[20%] w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none hidden md:block"></div>
                  <div className="absolute bottom-0 right-[40%] w-[200px] h-[200px] bg-white/5 rounded-full blur-2xl translate-y-1/2 pointer-events-none hidden md:block"></div>

                  {/* Left side info */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full relative z-10">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <img 
                        src={session.psychologistImage} 
                        alt={session.psychologistName} 
                        className="w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] rounded-[24px] object-cover border-2 border-white/20 shadow-md" 
                      />
                    </div>
                    
                    {/* Text info */}
                    <div className="flex flex-col text-center sm:text-left font-['Lexend']">
                      <span className="text-white/70 text-[13px] sm:text-sm font-medium">{title}</span>
                      <h4 className="text-[22px] sm:text-[28px] font-bold text-white mt-1 mb-3">{session.psychologistName}</h4>
                      
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-white/85 text-[13px] sm:text-sm font-medium mb-5">
                        <span className="flex items-center gap-1.5"><Calendar size={16} className="opacity-70" /> Avq {session.date}, 2026</span>
                        <span className="flex items-center gap-1.5"><Clock size={16} className="opacity-70" /> {startTime}</span>
                      </div>

                      <div className="flex items-center justify-center sm:justify-start gap-3">
                        <span className="bg-white/10 text-white/90 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-sm backdrop-blur-sm border border-white/5">
                          Video Seans
                        </span>
                        <span className="bg-white/10 text-white/90 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-sm backdrop-blur-sm border border-white/5">
                          45 dəqiqə
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right side buttons */}
                  <div className="flex flex-col w-full md:w-[220px] shrink-0 gap-3.5 relative z-10 mt-2 md:mt-0">
                    <button className="w-full bg-white hover:bg-gray-50 text-[#3B2068] py-3.5 sm:py-4 rounded-[16px] font-bold font-['Lexend'] shadow-md cursor-pointer transition-all active:scale-[0.98] border-0 text-[15px] sm:text-[16px]">
                      Qoşul
                    </button>
                    <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3.5 sm:py-4 rounded-[16px] font-bold font-['Lexend'] cursor-pointer transition-all active:scale-[0.98] border border-white/30 text-[15px] sm:text-[16px]">
                      Vaxtı dəyiş
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Section 3: Explore Experts Slider */}
      <div className="w-full bg-white px-4 sm:px-6 md:px-[48px] py-8 flex flex-col justify-start select-none relative border-t border-gray-100">
        <h2 className="text-left text-[#1E0A42] font-semibold mb-6 font-['Lexend'] text-[28px]">
          Mütəxəssisləri araşdır
        </h2>

        {/* Carousel Wrapper with Hover Arrows */}
        <div className="w-full relative flex items-center group/carousel">
          {/* Left Arrow Button */}
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-[-24px] z-10 w-11 h-11 rounded-full bg-white text-[#4A247A] shadow-lg border border-gray-150 flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all opacity-0 group-hover/carousel:opacity-100 duration-300 border-0 outline-none animate-fade-in"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Horizontally Scrollable Cards Container */}
          <div
            ref={scrollRef}
            className="w-full flex flex-row overflow-x-auto gap-6 pt-2 pb-6 scrollbar-hide scroll-smooth snap-x snap-mandatory"
          >
            {psychologists.map((expert) => (
              <div
                key={expert.id}
                onClick={() => navigate(PATHS.WEBAPP_EXPERT_DETAIL.replace(':id', String(expert.id)))}
                className="flex flex-col text-white flex-shrink-0 snap-start transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer group p-5 sm:p-6 md:p-8 w-[280px] sm:w-[380px] md:w-[480px] lg:w-[593px] rounded-[16px] sm:rounded-[19px]"
                style={{
                  backgroundColor: '#4B2E83',
                  boxShadow: '0px 4.48px 4.48px rgba(0, 0, 0, 0.25), 0px 4.48px 4.48px rgba(0, 0, 0, 0.25)',
                }}
              >
                {/* Header inside Card: Avatar + Info & Price */}
                <div className="flex flex-row justify-between items-start w-full">
                  {/* Avatar & Ratings Column */}
                  <div className="flex flex-row gap-4 items-center">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-20 h-20 rounded-full border-2 border-white/20 object-cover shadow-sm flex-shrink-0"
                    />
                    <div className="flex flex-col text-left font-['Lexend']">
                      <span className="text-lg md:text-xl font-bold text-white leading-tight">
                        {expert.name}
                      </span>
                      <span className="text-xs text-white/70 mt-1 font-medium">
                        {expert.experience} • {expert.title}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-amber-400 mt-2 font-semibold">
                        <Star size={13} fill="currentColor" className="text-amber-400" />
                        {expert.rating.toFixed(1)}
                      </div>
                    </div>
                  </div>

                  {/* Pricing text */}
                  <span className="text-[20px] md:text-[22px] font-bold text-white tracking-tight flex-shrink-0 font-['Lexend']">
                    ${expert.price}<span className="text-xs font-normal text-white/70">/seans</span>
                  </span>
                </div>

                {/* Bio description paragraph */}
                <p className="text-xs md:text-sm text-white/80 leading-relaxed mt-5 text-left line-clamp-3 font-['Lexend']">
                  {expert.description}
                </p>

                {/* Languages badges */}
                <div className="flex flex-wrap gap-2.5 mt-5">
                  {expert.languages.map((lang) => (
                    <span
                      key={lang}
                      className="bg-white text-[#0D0669] text-[10px] font-bold px-4 py-1.5 rounded-full border border-[#0D0669]/10 shadow-sm font-['Lexend'] uppercase"
                    >
                      {lang}
                    </span>
                  ))}
                </div>

                {/* Specialties badges */}
                <div className="flex flex-wrap gap-2.5 mt-2.5">
                  {expert.tags.slice(0, 3).map((spec) => (
                    <span
                      key={spec}
                      className="bg-white/10 text-white text-[10px] font-bold px-4 py-1.5 rounded-full border border-white/5 shadow-sm font-['Lexend'] uppercase"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* CTA Booking Button */}
                <button className="bg-white hover:bg-white/95 text-[#0D0669] font-bold text-xs md:text-sm py-4 rounded-[14px] w-full text-center mt-2.5 shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer uppercase tracking-wider font-['Lexend'] border-0">
                  Başlayaq
                </button>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-[-24px] z-10 w-11 h-11 rounded-full bg-white text-[#4A247A] shadow-lg border border-gray-150 flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all opacity-0 group-hover/carousel:opacity-100 duration-300 border-0 outline-none animate-fade-in"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* "Daha çox" link button */}
        <div className="w-full flex justify-center mt-6">
          <button
            onClick={() => navigate(PATHS.WEBAPP_EXPERTS)}
            className="text-[#4B2E83] hover:text-[#3C2475] transition-colors font-medium flex items-center gap-2 cursor-pointer border-0 bg-transparent text-[16px] font-['Lexend']"
          >
            Daha çox &rarr;
          </button>
        </div>
      </div>

    </div>
  );
};
