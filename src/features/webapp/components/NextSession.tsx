import { Calendar, Clock } from 'lucide-react';
import therapistImg from '@/assets/therapist1.png';

export const NextSession = () => {
  return (
    <div className="w-full bg-white px-4 sm:px-6 pb-10 sm:pb-16 lg:px-10 flex flex-col justify-start select-none">
      {/* 1. Section Header */}
      <h2
        className="w-full text-left text-[#1E0A42] font-normal mb-6 sm:mb-8 text-[22px] sm:text-[26px] md:text-[31.15px] leading-[32px] sm:leading-[42px] md:leading-[59.84px]"
        style={{
          letterSpacing: '-0.96px',
          maxWidth: '1251.75px',
        }}
      >
        Növbəti seansın
      </h2>

      {/* 2. Purple Session Card */}
      <div
        className="w-full relative overflow-hidden flex flex-col items-center justify-between p-5 sm:p-6 md:flex-row md:px-10 md:py-8 text-white group min-h-[200px] md:min-h-[261px]"
        style={{
          background: 'linear-gradient(135deg, #3B2068 0%, #5E38A0 50%, #8B63C9 100%)',
          borderRadius: '20px',
          boxShadow: '0px 27.86px 83.57px rgba(75, 46, 131, 0.35)',
        }}
      >
        {/* Abstract Background Design Spheres */}
        <div className="absolute right-[-40px] top-[-40px] w-[280px] h-[280px] rounded-full bg-white/[0.05] pointer-events-none" />
        <div className="absolute right-[140px] bottom-[-100px] w-[220px] h-[220px] rounded-full bg-white/[0.04] pointer-events-none" />

        {/* Left Side: Doctor Info & Profile */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 relative z-10 w-full md:w-auto">
          {/* Avatar Frame with custom border and active badge */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-[16px] sm:rounded-[24px] md:rounded-[28px] overflow-hidden border-2 border-white/20 p-[2px] bg-white/5 shadow-md">
              <img
                src={therapistImg}
                alt="Dr. Aynur Həsənova"
                className="w-full h-full rounded-[14px] sm:rounded-[22px] md:rounded-[24px] object-cover"
              />
            </div>
            {/* Green active badge dot */}
            <span className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500 border-2 sm:border-3 border-[#4A267F] shadow-sm animate-pulse" />
          </div>

          {/* Doctor text information */}
          <div className="flex flex-col text-left justify-center">
            <span className="text-[10px] sm:text-xs md:text-sm text-white/70 font-semibold uppercase tracking-wider">
              Klinik Psixoloq
            </span>
            <h3 className="text-[18px] sm:text-[22px] md:text-[28px] font-bold text-white leading-tight mt-0.5 tracking-tight">
              Dr. Aynur Həsənova
            </h3>

            {/* Time & Date details */}
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-1.5 text-[10px] sm:text-xs md:text-sm text-white/80 mt-2 sm:mt-2.5 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar size={15} className="text-white/60" />
                Bu gün, 18 iyul 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-white/60" />
                15:30
              </span>
            </div>

            {/* Sub-badges for session details */}
            <div className="flex gap-2 sm:gap-2.5 mt-3 sm:mt-4 select-none">
              <span className="px-3 sm:px-5 py-1.5 sm:py-2 bg-white/10 border border-white/10 text-white text-[10px] sm:text-xs md:text-[13px] font-semibold rounded-full backdrop-blur-sm shadow-sm">
                Video Seans
              </span>
              <span className="px-3 sm:px-5 py-1.5 sm:py-2 bg-white/10 border border-white/10 text-white text-[10px] sm:text-xs md:text-[13px] font-semibold rounded-full backdrop-blur-sm shadow-sm">
                50 dəqiqə
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Reschedule and Join Actions */}
        <div className="flex flex-row md:flex-col gap-3 items-center md:items-end flex-shrink-0 relative z-10 w-full md:w-auto mt-4 md:mt-0">
          <button className="flex-1 md:flex-initial md:w-[200px] py-3 sm:py-3.5 bg-white hover:bg-white/95 text-[#3B2068] font-bold text-xs md:text-sm rounded-full shadow-lg hover:shadow-white/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer uppercase tracking-wider text-center">
            Qoşul
          </button>
          <button className="flex-1 md:flex-initial md:w-[200px] py-3 sm:py-3.5 border border-white/30 bg-white/5 hover:bg-white/10 text-white font-bold text-xs md:text-sm rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer uppercase tracking-wider text-center">
            Vaxtı dəyiş
          </button>
        </div>
      </div>
    </div>
  );
};

