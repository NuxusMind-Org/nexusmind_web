import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import { Mic, PlayCircle } from 'lucide-react';
import supportIcon from '@/assets/svg/supportIcon.svg';

export const ArticleDetailSidebar = () => {
  const navigate = useNavigate();
  const popularTopics = [
    '#BeyinElmi',
    '#VRMetaverse',
    '#Terapevtikİnnovasiya',
    '#RəqəmsalDetoks',
    '#GələcəkPsixologiyası',
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '284px',
        flexShrink: 0,
      }}
    >
      {/* Card 1: Support */}
      <div className="relative overflow-hidden bg-[rgba(255,255,255,0.73)] rounded-[24px] p-8 shadow-xl flex flex-col gap-4 font-sans text-left">
        {/* Absolute positioned Support Icon */}
        <img
          src={supportIcon}
          alt="Support Icon"
          className="absolute top-3 right-8 w-14 h-14 pointer-events-none select-none z-10 opacity-25"
        />

        <h4 className="text-[#311066] text-[20px] font-semibold tracking-tight leading-snug pr-16 z-10">
          Dəstək lazımdır?
        </h4>

        <p className="text-[#311066]/90 text-[16px] leading-relaxed font-light z-10">
          Mütəxəssislərimiz sizə kömək etməyə hazırdır.
        </p>

        <div className="w-full z-10">
          <button
            onClick={() => navigate(`${PATHS.HOME}#experts`)}
            className="w-full py-3.5 rounded-[16px] text-white text-[14px] sm:text-[15px] font-semibold bg-[#581c87] hover:bg-[#6b21a8] hover:shadow-[0_0_15px_rgba(107,33,168,0.4)] border-0 cursor-pointer transition-all duration-300 select-none outline-none text-center"
          >
            Məsləhət Alın
          </button>
        </div>
      </div>

      {/* Card 2: Podcast */}
      <div className="relative overflow-hidden bg-[rgba(16,13,93,0.62)] rounded-[24px] p-8 shadow-xl flex flex-col gap-4 font-sans text-left border border-white/10">
        {/* Header row */}
        <div className="flex items-center gap-3 w-full">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <Mic size={20} className="text-white" />
          </div>
          <div className="flex flex-col justify-center leading-snug">
            <span className="text-white text-[16px] font-semibold">Sanctuary Podkast</span>
            <span className="text-white/60 text-[12px] font-light mt-0.5">Həftəlik buraxılış</span>
          </div>
        </div>

        <p className="text-white/90 text-[14px] leading-relaxed font-light mt-1">
          "Rəqəmsal Dünyada İnsan Olmaq" — Bu həftəlik qonağımız Dr. Leyla Əliyeva ilə maraqlı söhbəti dinləyin.
        </p>

        <button
          className="w-full py-3.5 rounded-[16px] border border-white/20 hover:border-white/40 bg-transparent hover:bg-white/5 text-white text-[14px] font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 select-none outline-none"
        >
          <PlayCircle size={18} className="text-white" />
          <span>İndi Dinlə</span>
        </button>
      </div>

      {/* Card 3: Popular Topics */}
      <div className="relative overflow-hidden bg-[rgba(255,255,255,0.75)] border border-[rgba(255,255,255,0.1)] rounded-[24px] p-8 shadow-xl flex flex-col gap-6 font-sans text-left">
        <div className="flex flex-col gap-3">
          <h4 className="text-[#311066] text-[20px] font-semibold tracking-tight leading-snug">
            Populyar Mövzular
          </h4>
          <div className="h-px bg-[#311066]/35 w-full" />
        </div>
        <div className="flex flex-wrap gap-2">
          {popularTopics.map((topic) => (
            <span
              key={topic}
              className="bg-[#2E2459] text-white text-[11px] font-medium px-2.5 py-1 rounded-[8px] cursor-pointer hover:bg-[#3D2E75] hover:scale-[1.02] transition-all duration-300 select-none"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
