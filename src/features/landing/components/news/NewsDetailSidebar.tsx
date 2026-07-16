import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import supportIcon from '@/assets/svg/supportIcon.svg';

export const NewsDetailSidebar = () => {
  const navigate = useNavigate();
  const topics = [
    'Meditasiya',
    'Təşviş',
    'Yuxu',
    'Özünü Tanıma',
    'Uşaq Psixologiyası',
  ];

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Widget 1: Need Support Consultation Banner */}
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

      {/* Widget 2: Popular Topics Tag Box */}
      <div className="flex flex-col gap-4">
        <h4 className="text-white text-[16px] sm:text-[17px] font-semibold border-l-2 border-[#00f2ff] pl-3">
          Populyar Mövzular
        </h4>
        <div className="flex flex-wrap gap-2.5">
          {topics.map((topic, idx) => (
            <button
              key={idx}
              className="bg-white/5 border border-white/10 hover:border-[#00f2ff]/30 rounded-lg px-4 py-2 text-[12px] font-medium text-white/70 hover:text-[#00f2ff] hover:bg-white/10 transition-all duration-300 cursor-pointer outline-none select-none"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
