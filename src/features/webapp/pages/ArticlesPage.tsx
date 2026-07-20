import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, ChevronLeft, ChevronRight, Clock, Eye, ArrowRight } from 'lucide-react';
import therapist1Img from '@/assets/therapist1.png';
import femaleAvatarImg from '@/assets/female_avatar.png';
import { PATHS } from '@/routes/paths';

export const ArticlesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full flex flex-col rounded-t-[38.93px] rounded-b-[38.93px] overflow-hidden shadow-2xl bg-white animate-fade-in min-h-[calc(100vh-64px)] pb-20 opacity-100">
      
      {/* First Section: Top Header Section (Card with Gradient) - Width: 1279px, Height: 271px */}
      <div
        className="w-full rounded-t-[38.93px] rounded-b-none h-[271px] pt-[50px] pb-[40px] px-[48px] flex flex-col justify-between items-center text-center opacity-100 relative"
        style={{
          background: 'linear-gradient(135deg, #CBE8FC 0%, #DDD4F8 33%, #F9D8E8 66%, #FFF5E6 100%)',
        }}
      >
        <h2 className="w-full text-center text-[28px] md:text-[46.72px] font-normal text-[#1E0A42] leading-[36px] md:leading-[59.84px] tracking-[-0.96px] font-['Lexend'] mt-1">
          Elmi məqalələrlə psixoloji biliklərinizi artırın !
        </h2>

        {/* Centered Search Bar */}
        <div className="w-full max-w-[776px] relative flex items-center mt-3">
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

      {/* Second Section: Articles Card Grid with Sizing and Styling details */}
      <div className="px-[48px] py-12 w-full flex flex-col items-center max-w-[1232px] mx-auto">
        
        {/* 3 columns, 2 rows of Articles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-6 w-full justify-center">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              onClick={() => navigate(PATHS.WEBAPP_ARTICLE_DETAIL.replace(':id', String(idx)))}
              className="w-full md:w-[366.55px] max-w-[366.55px] h-[592px] rounded-[16.15px] bg-[#36106F]/15 border-[1.01px] border-white/55 backdrop-blur-[20.19px] flex flex-col p-0 overflow-hidden relative cursor-pointer group shadow-lg hover:-translate-y-1 transition-all duration-300 mx-auto"
            >
              {/* Cover Image wrapper (Height: 220px) */}
              <div className="w-full h-[220px] rounded-t-[16.15px] rounded-b-none overflow-hidden relative shrink-0">
                <img
                  src={therapist1Img}
                  alt="Məqalə Cover"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0B093C] text-white text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full uppercase font-['Lexend']">
                  Psixologiya
                </span>
              </div>

              {/* Card content container with padding */}
              <div className="p-5 pt-3.5 flex flex-col gap-3 flex-grow">
                {/* Author details block */}
                <div className="flex items-center gap-3 text-left">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-[#482476]/15 flex items-center justify-center text-[#482476] border border-[#482476]/10 shrink-0">
                    <img src={femaleAvatarImg} alt="Dr. Leyla Rəhimova" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col text-left font-['Lexend']">
                    <span className="text-[#1E0A42] font-bold text-sm">Dr. Leyla Rəhimova</span>
                    <span className="text-[#1E0A42]/60 text-xs mt-0.5">Klinik Psixoloq</span>
                  </div>
                </div>

                {/* Meta indicators row */}
                <div className="flex justify-between items-center text-[#1E0A42]/70 text-xs font-semibold font-['Lexend'] border-t border-[#1E0A42]/5 pt-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-[#1E0A42]/55" />
                    24 Mart 2026
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-[#1E0A42]/55" />
                    4 dəq oxu
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye size={14} className="text-[#1E0A42]/55" />
                    93 baxış
                  </span>
                </div>

                {/* Article Title */}
                <h3 className="text-[#1E0A42] text-lg font-bold font-['Lexend'] text-left leading-snug line-clamp-2 min-h-[48px] group-hover:text-[#4D2059] transition-colors mt-1">
                  VR Terapiyasının Travma Müalicəsində Effektivliyi
                </h3>

                {/* Article Description */}
                <p className="text-[#1E0A42]/70 text-xs leading-relaxed line-clamp-3 text-left font-['Lexend'] mt-1">
                  Virtual reallıq texnologiyalarının post-travmatik stress pozuntusu olan pasiyentlərin reabilitasiyasında tətbiqi və klinik sınaqların nəticələri haqqında.
                </p>

                {/* Footer CTA Link */}
                <div className="flex items-center gap-1.5 font-bold text-[#4D2059] group-hover:underline text-sm font-['Lexend'] mt-auto self-end cursor-pointer pt-2">
                  <span>Davamı oxu</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Pagination container (Blogs Page Style) */}
        <div className="flex items-center justify-center gap-2 mt-16 select-none">
          {/* Prev button */}
          <button className="w-10 h-10 rounded-full bg-[#4D2059]/10 text-[#4D2059] flex items-center justify-center hover:bg-[#4D2059]/20 transition-colors duration-200 cursor-pointer">
            <ChevronLeft size={16} />
          </button>

          {/* Page 1 (Active with blue/purple linear gradient) */}
          <button className="w-10 h-10 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white flex items-center justify-center font-bold text-sm shadow-md cursor-default">
            1
          </button>

          {/* Page 2 */}
          <button className="w-10 h-10 rounded-full bg-[#4D2059]/10 text-[#4D2059] flex items-center justify-center hover:bg-[#4D2059]/20 font-bold text-sm transition-colors duration-200 cursor-pointer">
            2
          </button>

          {/* Page 3 */}
          <button className="w-10 h-10 rounded-full bg-[#4D2059]/10 text-[#4D2059] flex items-center justify-center hover:bg-[#4D2059]/20 font-bold text-sm transition-colors duration-200 cursor-pointer">
            3
          </button>

          {/* Next button */}
          <button className="w-10 h-10 rounded-full bg-[#4D2059]/10 text-[#4D2059] flex items-center justify-center hover:bg-[#4D2059]/20 transition-colors duration-200 cursor-pointer">
            <ChevronRight size={16} />
          </button>
        </div>

      </div>

    </div>
  );
};
