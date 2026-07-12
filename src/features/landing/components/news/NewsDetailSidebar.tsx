import { HeartHandshake } from 'lucide-react';

export const NewsDetailSidebar = () => {
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
      <div className="bg-[#1e293b]/30 backdrop-blur-md border border-white/10 rounded-lg p-6 text-center shadow-xl flex flex-col items-center">
        {/* Support Lotus/Heart Icon */}
        <div className="w-12 h-12 rounded-full bg-[#581c87]/20 border border-[#581c87]/40 flex items-center justify-center text-[#c39ffd] mb-4">
          <HeartHandshake size={24} />
        </div>

        <h4 className="text-white text-[16px] sm:text-[18px] font-semibold mb-2">
          Dəstək lazımdır?
        </h4>
        <p className="text-white/60 text-[13px] sm:text-[14px] leading-relaxed mb-6 font-light max-w-[220px]">
          Mütəxəssislərimiz sizə kömək etməyə hazırdır.
        </p>

        {/* Consulting Action Button */}
        <button className="w-full py-2.5 rounded-lg text-white text-[13px] sm:text-[14px] font-semibold bg-[#581c87]/80 hover:bg-[#581c87] hover:shadow-[0_0_15px_rgba(88,28,135,0.4)] border-0 cursor-pointer transition-all duration-300 select-none outline-none">
          Məsləhət Al
        </button>
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
