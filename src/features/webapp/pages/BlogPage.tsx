import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, ChevronLeft, ChevronRight, Mic, Play } from 'lucide-react';
import vrConsultationImg from '@/assets/vr_consultation.png';
import digitalBrainImg from '@/assets/digital_brain.png';
import { PATHS } from '@/routes/paths';

export const BlogPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full flex flex-col rounded-t-[38.93px] rounded-b-[38.93px] overflow-hidden shadow-2xl bg-white animate-fade-in min-h-[calc(100vh-64px)] pb-20 opacity-100">
      {/* First Section: Top Header Section (Card with Gradient) - Height 188px */}
      <div
        className="w-full rounded-t-[38.93px] rounded-b-none h-[188px] pt-[32px] pb-[24px] px-[48px] flex flex-col justify-between items-center text-center opacity-100 relative"
        style={{
          background: 'linear-gradient(135deg, #CBE8FC 0%, #DDD4F8 33%, #F9D8E8 66%, #FFF5E6 100%)',
        }}
      >
        <h2 className="w-full text-center text-[28px] md:text-[46.72px] font-normal text-[#1E0A42] leading-[36px] md:leading-[59.84px] tracking-[-0.96px] font-['Lexend'] mt-1">
          Trendləri bizimlə izlə!
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

      {/* Second Section: Featured Blog Card Container */}
      <div className="px-[48px] py-12 w-full flex flex-col items-center">
        {/* Featured Card: Width 1232px, Height 475.68px, connected panels without spacing */}
        <div className="w-full max-w-[1232px] h-auto md:h-[475.68px] mx-auto rounded-[18px] overflow-hidden border-[0.95px] border-white/22 bg-[#1E0F44] shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl shrink-0 flex flex-col md:flex-row">

          {/* Left Column: Image wrapper (762px width) */}
          <div className="w-full md:w-[762px] h-[280px] md:h-[475.68px] shrink-0 relative">
            <img
              src={vrConsultationImg}
              alt="VR Terapiyasının Gələcəyi"
              className="w-full h-full object-cover absolute inset-0"
            />
          </div>

          {/* Right Column: Panel text and controls content (470px width) */}
          <div className="w-full md:w-[470px] shrink-0 pt-[46px] pr-[44px] pb-[42px] pl-[44px] flex flex-col justify-between text-left h-auto md:h-[475.68px] bg-[#1E0F44] text-white font-['Lexend']">

            {/* Top Details (Gap: 30.44px) */}
            <div className="flex flex-col gap-[30.44px]">
              {/* Category pill and Date stamp */}
              <div className="flex items-center gap-[16px]">
                <span className="bg-white/20 text-white text-[10px] tracking-widest px-3.5 py-1.5 rounded-full uppercase font-bold flex items-center justify-center h-[28px]">
                  BLOQLAR
                </span>
                <span className="text-white/60 text-xs">
                  24 Mart 2026
                </span>
              </div>

              {/* Title heading */}
              <h3 className="text-xl md:text-[28px] font-bold leading-snug tracking-tight text-white line-clamp-3">
                VR Terapiyasının Gələcəyi: Virtual Dünyalarda Sağalma
              </h3>

              {/* Snippet Description */}
              <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                Rəqəmsal üfüqlərin psixoloji rifahımızı necə dəyişdirdiyini və virtual reallığın travma müalicəsindəki inqilabi rolunu kəşf edin.
              </p>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10 w-full shrink-0">
              <span className="text-white/60 text-xs font-medium flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-white/40"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                130 baxış
              </span>

              <button
                onClick={() => navigate(PATHS.WEBAPP_BLOG_DETAIL.replace(':id', '1'))}
                className="px-6 py-2.5 bg-white text-[#1E0F44] font-bold text-xs md:text-sm rounded-full hover:bg-white/90 transition-colors duration-200 cursor-pointer"
              >
                Davamını oxu
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Third Section: Other Blogs grid and sidebar widgets */}
      <div className="pb-20 w-full flex flex-col lg:flex-row justify-between gap-5 max-w-[1232px] mx-auto items-start">

        {/* Left Column: Other Blogs grid (863.93px width) */}
        <div className="w-full lg:w-[863.93px] flex flex-col gap-8 text-left shrink-0">
          {/* Section title */}
          <h3 className="text-[#1E0A42] text-[28px] md:text-[32px] font-semibold font-['Lexend']">
            Digər bloqlar
          </h3>

          {/* Cards Grid: 3 columns, 2 rows (Width: 863.93px, Height: 684.31px, Gap: 11.95px) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[11.95px] w-full max-w-[863.93px] md:h-[684.31px]">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                onClick={() => navigate(PATHS.WEBAPP_BLOG_DETAIL.replace(':id', String(idx)))}
                className="bg-[#F6EFFF] rounded-[10.06px] overflow-hidden flex flex-col p-0 shadow-[1.26px_1.26px_1.26px_rgba(119,67,188,0.59)] hover:shadow-md transition-shadow duration-300 w-full md:w-[264.79px] max-w-[264.79px] h-[298.13px] mx-auto cursor-pointer group"
              >
                {/* Image Cover */}
                <div className="w-full h-[120px] rounded-t-[10.06px] rounded-b-none overflow-hidden relative shrink-0">
                  <img
                    src={digitalBrainImg}
                    alt="İmmersiyanın Elmi"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-black/35 text-white text-[8px] font-bold tracking-widest px-2 py-0.5 rounded-full uppercase font-['Lexend']">
                    Psixologiya
                  </span>
                </div>

                {/* Card content container with padding */}
                <div className="p-3 pt-2.5 flex flex-col gap-[6.29px] flex-grow justify-between">
                  {/* Title and Summary */}
                  <div className="flex flex-col gap-[4px] text-left">
                    <h4 className="text-[#1E0A42] font-bold text-xs leading-snug line-clamp-2 font-['Lexend'] group-hover:text-[#4D2059] transition-colors">
                      İmmersiyanın Elmi: Niyə VR Beyni İnanır?
                    </h4>
                    <p className="text-[#1E0A42]/70 text-[10px] leading-relaxed line-clamp-3 font-['Lexend']">
                      Virtual mühitin sinir sistemimizə təsiri və beynin rəqəmsal stimullara qarşı verdiyi reaksiyaların dərin analizi.
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="flex justify-between items-center text-[#1E0A42]/60 text-[10px] font-semibold font-['Lexend'] border-t border-[#E5DFDF]/50 pt-2 mt-auto shrink-0">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} className="text-[#1E0A42]/40" />
                      12 Okt, 2024
                    </span>
                    <span className="text-[#4D2059] hover:underline flex items-center gap-0.5 font-bold cursor-pointer">
                      Daha çox oxu
                      <span className="text-[9px]">&gt;</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination container */}
          <div className="flex items-center justify-center gap-2 mt-8 select-none">
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

        {/* Right Column: Sidebar Panels (348px width) */}
        <div className="w-full lg:w-[348px] flex flex-col gap-8 shrink-0">

          {/* Widget 1: Newsletter Subscribe Card */}
          <div className="bg-[#1E0F44] rounded-[24px] p-8 shadow-xl flex flex-col gap-4 font-sans text-left relative overflow-hidden group text-white">
            <h4 className="text-white text-[20px] font-semibold tracking-tight leading-snug font-['Lexend']">
              Bloqlardan xəbərdar ol
            </h4>

            <p className="text-white/80 text-[14px] leading-relaxed font-normal font-['Lexend']">
              Ən son texnologiyalar və psixoloji araşdırmalar haqqında məlumatları birbaşa elektron poçtunuza alın.
            </p>

            {/* E-mail input */}
            <input
              type="email"
              placeholder="E-poçt ünvanınız"
              className="w-full px-5 py-3.5 bg-white/10 rounded-[16px] text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/30 font-['Lexend'] border-0"
            />

            {/* Submit button with blue-purple gradient */}
            <button className="w-full py-3.5 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white rounded-[16px] text-sm font-bold hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all duration-300 cursor-pointer text-center font-['Lexend'] outline-none border-0">
              Abunə Ol
            </button>

            <span className="text-white/40 text-[11px] font-medium font-['Lexend'] text-center">
              İstənilən vaxt abunəliyi ləğv edə bilərsiniz.
            </span>
          </div>

          {/* Widget 2: Popular Topics hashtags container */}
          <div className="bg-white rounded-[24px] border border-[#E5DFDF] p-6 shadow-sm flex flex-col gap-4 text-left">
            <h4 className="text-[#1E0A42] text-[20px] font-semibold font-['Lexend'] border-b border-[#E5DFDF]/50 pb-2">
              Populyar Mövzular
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {[
                '#BeyinElmi',
                '#VRMetaverse',
                '#Terapevtikİnnovasiya',
                '#RəqəmsalDetoks',
                '#GələcəkPsixologiyası',
              ].map((topic, idx) => (
                <button
                  key={idx}
                  className="bg-[#0B093C] rounded-lg px-4 py-2.5 text-[12px] font-bold text-white hover:bg-[#0B093C]/90 transition-all duration-300 cursor-pointer outline-none select-none font-['Lexend'] border-0"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Widget 3: Sanctuary Podcast Player Card */}
          <div className="bg-[#0A072B] rounded-[24px] p-8 shadow-xl flex flex-col gap-6 font-sans text-left relative overflow-hidden group text-white">
            {/* Header Group */}
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md shrink-0">
                <Mic size={18} />
              </span>
              <div className="flex flex-col">
                <h5 className="text-white text-base font-semibold font-['Lexend']">
                  Sanctuary Podkast
                </h5>
                <span className="text-white/50 text-[11px] font-medium tracking-wide uppercase font-['Lexend'] mt-0.5">
                  Həftəlik buraxılış
                </span>
              </div>
            </div>

            {/* Text Description */}
            <p className="text-white/80 text-xs md:text-sm leading-relaxed font-normal font-['Lexend'] line-clamp-3">
              "Rəqəmsal Dünyada İnsan Olmaq" - Bu həftəlik qonağımız Dr. Leyla Əliyeva ilə maraqlı söhbəti dinləyin.
            </p>

            {/* Action Button */}
            <button className="w-full py-3.5 border border-white/20 hover:border-white rounded-[16px] text-white text-sm font-semibold hover:bg-white/5 transition-all duration-300 cursor-pointer text-center font-['Lexend'] flex items-center justify-center gap-2 select-none outline-none">
              <Play size={14} className="fill-white" />
              <span>İndi Dinlə</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
