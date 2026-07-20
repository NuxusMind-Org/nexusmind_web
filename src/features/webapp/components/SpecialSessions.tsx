import { useRef } from 'react';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import coverImg from '@/assets/mountain_sunset_clouds.png';

interface SpecialSessionItem {
  id: number;
  title: string;
  desc: string;
  duration: string;
  active: boolean;
}

export const SpecialSessions = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const sessions: SpecialSessionItem[] = [
    {
      id: 1,
      title: 'Stress İdarəetməsi',
      desc: 'Gündəlik stress ilə başa çıxmaq üçün praktiki texnikalar',
      duration: '15 dəq',
      active: false,
    },
    {
      id: 2,
      title: 'Stress İdarəetməsi',
      desc: 'Gündəlik stress ilə başa çıxmaq üçün praktiki texnikalar',
      duration: '15 dəq',
      active: true,
    },
    {
      id: 3,
      title: 'Stress İdarəetməsi',
      desc: 'Gündəlik stress ilə başa çıxmaq üçün praktiki texnikalar',
      duration: '15 dəq',
      active: false,
    },
    {
      id: 4,
      title: 'Stress İdarəetməsi',
      desc: 'Gündəlik stress ilə başa çıxmaq üçün praktiki texnikalar',
      duration: '15 dəq',
      active: false,
    },
    {
      id: 5,
      title: 'Depressiya ilə Mübarizə',
      desc: 'Həyat eşqini geri qazanmaq üçün addım-addım koqnitiv məşqlər',
      duration: '20 dəq',
      active: false,
    },
    {
      id: 6,
      title: 'Həyəcanın Azaldılması',
      desc: 'Təşviş və panik hisslərini idarə etmək üçün tənəffüs dərsləri',
      duration: '10 dəq',
      active: false,
    },
    {
      id: 7,
      title: 'Yuxu Tənzimlənməsi',
      desc: 'Daha rahat və dərin yuxuya getmək üçün axşam ritualları',
      duration: '25 dəq',
      active: false,
    },
    {
      id: 8,
      title: 'Fokus və Diqqət',
      desc: 'İş və təhsil zamanı konsentrasiyanı artırmaq üçün səs terapiyası',
      duration: '15 dəq',
      active: false,
    },
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const cardWidth = 344; // Card width 320px + gap 24px
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full bg-white px-6 pb-16 lg:px-10 flex flex-col justify-start select-none relative">
      {/* 1. Section Header */}
      <h2
        className="w-full text-left text-[#1E0A42] font-normal mb-8"
        style={{
          fontSize: '31.15px',
          lineHeight: '59.84px',
          letterSpacing: '-0.96px',
          maxWidth: '1251.75px',
        }}
      >
        Özəl seanslar
      </h2>

      {/* 2. Carousel Wrapper with Nav Buttons */}
      <div className="w-full relative flex items-center group/carousel">
        {/* Left Arrow Button */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-[-16px] lg:left-[-24px] z-10 w-11 h-11 rounded-full bg-white text-[#4A247A] shadow-lg border border-gray-150 flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all opacity-0 group-hover/carousel:opacity-100 duration-300"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Horizontally Scrollable Cards Container */}
        <div
          ref={scrollRef}
          className="w-full flex flex-row overflow-x-auto gap-6 pt-6 pb-8 scrollbar-hide scroll-smooth snap-x snap-mandatory px-2"
        >
          {sessions.map((session) => (
            <div
              key={session.id}
              className="w-[320px] rounded-[30px] bg-white flex flex-col overflow-hidden flex-shrink-0 snap-start transition-all duration-300 border-2 border-transparent hover:border-[#5E38A0] hover:scale-[1.02] hover:shadow-[#5e38a0]/10 active:scale-[0.99] shadow-lg shadow-purple-950/5 cursor-pointer group"
            >
              {/* Top Half: Cover Image */}
              <div className="w-full h-[180px] relative overflow-hidden flex-shrink-0">
                <img
                  src={coverImg}
                  alt={session.title}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>

              {/* Bottom Half: Details */}
              <div className="p-6 flex flex-col text-left flex-1 justify-between">
                <div>
                  <h3 className="text-[#2A2B42] text-lg font-bold tracking-tight">
                    {session.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 mt-1.5 leading-relaxed min-h-[40px]">
                    {session.desc}
                  </p>
                </div>

                <div className="mt-4">
                  {/* Duration */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    <Clock size={14} className="text-gray-400" />
                    {session.duration}
                  </div>

                  {/* Button CTA */}
                  <button
                    className={`w-full py-3.5 mt-4 rounded-full text-center text-white font-bold text-xs md:text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md ${
                      session.active
                        ? 'bg-[#5E38A0] hover:bg-[#4A247A] shadow-[#5e38a0]/20'
                        : 'bg-[#4A247A] hover:bg-[#3B2068] shadow-purple-950/15'
                    }`}
                  >
                    İndi Başla
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-[-16px] lg:right-[-24px] z-10 w-11 h-11 rounded-full bg-white text-[#4A247A] shadow-lg border border-gray-150 flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all opacity-0 group-hover/carousel:opacity-100 duration-300"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
