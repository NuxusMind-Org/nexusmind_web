import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';

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
      <div className="relative overflow-hidden bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between min-h-[190px] font-sans">
        {/* Decorative Lotus SVG positioned absolutely in top right */}
        <div className="absolute top-5 right-5 text-[#A682FF]/20 pointer-events-none select-none">
          <svg
            className="w-16 h-16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22C12 22 9 17 9 12C9 7 12 4 12 4C12 4 15 7 15 12C15 17 12 22 12 22Z" />
            <path d="M12 22C12 22 5 20 4 14C3 8 9 7 9 7C9 7 8 11 12 15" />
            <path d="M12 22C12 22 19 20 20 14C21 8 15 7 15 7C15 7 16 11 12 15" />
          </svg>
        </div>

        <div className="flex flex-col gap-2 z-10 max-w-[80%]">
          <h4 className="text-white text-[18px] sm:text-[20px] font-bold tracking-tight">
            Dəstək lazımdır?
          </h4>
          <p className="text-white/80 text-[13.5px] sm:text-[14px] leading-relaxed font-light">
            Mütəxəssislərimiz sizə kömək etməyə hazırdır.
          </p>
        </div>

        <div className="w-full mt-4 z-10">
          <button
            onClick={() => navigate(`${PATHS.HOME}#experts`)}
            className="w-full py-3.5 rounded-2xl text-white text-[13.5px] sm:text-[14px] font-semibold bg-[#581c87] hover:bg-[#6b21a8] hover:shadow-[0_0_15px_rgba(107,33,168,0.4)] border-0 cursor-pointer transition-all duration-300 select-none outline-none text-center"
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
