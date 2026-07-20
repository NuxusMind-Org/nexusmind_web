import { Calendar, Clock } from 'lucide-react';
import therapistImg from '@/assets/therapist1.png';

export const NextSession = () => {
  return (
    <div className="w-full bg-white px-6 pb-16 lg:px-10 flex flex-col justify-start select-none">
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
        Növəti seansın
      </h2>

      {/* 2. Purple Session Card */}
      <div
        className="w-full relative overflow-hidden flex flex-col md:flex-row items-center justify-between p-6 md:px-10 md:py-8 text-white group"
        style={{
          height: '261.83px',
          background: 'linear-gradient(135deg, #3B2068 0%, #5E38A0 50%, #8B63C9 100%)',
          borderRadius: '33.43px',
          boxShadow: '0px 27.86px 83.57px rgba(75, 46, 131, 0.35)',
        }}
      >
        {/* Abstract Background Design Spheres */}
        <div className="absolute right-[-40px] top-[-40px] w-[280px] h-[280px] rounded-full bg-white/[0.05] pointer-events-none" />
        <div className="absolute right-[140px] bottom-[-100px] w-[220px] h-[220px] rounded-full bg-white/[0.04] pointer-events-none" />

        {/* Left Side: Doctor Info & Profile */}
        <div className="flex items-center gap-8 relative z-10 h-full">
          {/* Avatar Frame with custom border and active badge */}
          <div className="relative flex-shrink-0">
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-[28px] overflow-hidden border-2 border-white/20 p-[2px] bg-white/5 shadow-md">
              <img
                src={therapistImg}
                alt="Dr. Aynur Həsənova"
                className="w-full h-full rounded-[24px] object-cover"
              />
            </div>
            {/* Green active badge dot */}
            <span className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full bg-emerald-500 border-3 border-[#4A267F] shadow-sm animate-pulse" />
          </div>

          {/* Doctor text information */}
          <div className="flex flex-col text-left justify-center">
            <span className="text-xs md:text-sm text-white/70 font-semibold uppercase tracking-wider">
              Klinik Psixoloq
            </span>
            <h3 className="text-[22px] md:text-[28px] font-bold text-white leading-tight mt-0.5 tracking-tight">
              Dr. Aynur Həsənova
            </h3>

            {/* Time & Date details */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs md:text-sm text-white/80 mt-2.5 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar size={17} className="text-white/60" />
                Bu gün, 18 iyul 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={17} className="text-white/60" />
                15:30
              </span>
            </div>

            {/* Sub-badges for session details */}
            <div className="flex gap-2.5 mt-4 select-none">
              <span className="px-5 py-2 bg-white/10 border border-white/10 text-white text-xs md:text-[13px] font-semibold rounded-full backdrop-blur-sm shadow-sm">
                Video Seans
              </span>
              <span className="px-5 py-2 bg-white/10 border border-white/10 text-white text-xs md:text-[13px] font-semibold rounded-full backdrop-blur-sm shadow-sm">
                50 dəqiqə
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Reschedule and Join Actions */}
        <div className="flex flex-col gap-3 items-center md:items-end flex-shrink-0 relative z-10 w-full md:w-auto mt-6 md:mt-0">
          <button className="w-full md:w-[200px] py-3.5 bg-white hover:bg-white/95 text-[#3B2068] font-bold text-xs md:text-sm rounded-full shadow-lg hover:shadow-white/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer uppercase tracking-wider text-center">
            Qoşul
          </button>
          <button className="w-full md:w-[200px] py-3.5 border border-white/30 bg-white/5 hover:bg-white/10 text-white font-bold text-xs md:text-sm rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer uppercase tracking-wider text-center">
            Vaxtı dəyiş
          </button>
        </div>
      </div>
    </div>
  );
};
