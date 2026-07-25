import { Sparkles, Users, BookOpen } from 'lucide-react';
import nexieSittingClassic from '@/assets/svg/NexieSittingClassic.svg';
import nexieSittingPurple from '@/assets/svg/NexieSittingPurple.svg';
import { ScrollReveal } from '../ScrollReveal';
import { useRoadmapMascot } from '../../hooks/useRoadmapMascot';

const PARTNER_NAMES = ['Bakı Psixologiya Mərkəzi', 'NexusMind'];

export const RoadmapSection = () => {
  const {
    roadmapRef,
    card1Ref,
    card2Ref,
    card3Ref,
    arrowsVisible,
    arrow1Path,
    arrow1Chevron,
    arrow2Path,
    arrow2Chevron,
  } = useRoadmapMascot();

  return (
    <section
      id="roadmap"
      className="relative w-full min-h-0 md:min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-[72px] py-10 md:py-20 scroll-mt-20"
    >
      <div className="w-full max-w-[1100px] mx-auto flex flex-col">
        <ScrollReveal className="w-full flex flex-col">
          <div className="text-center mb-10 md:mb-24">
            <h2 className="text-[30px] sm:text-[44px] font-bold text-white mb-3 tracking-tight">
              Necə istifadə edəcəksən:
            </h2>
            <p className="text-[15px] sm:text-[19px] text-white/80">
              Sən də bizimlə həyatdan yenidən zövq almağı öyrən
            </p>
          </div>
        </ScrollReveal>

        {/* Roadmap Cards */}
        <div ref={roadmapRef} className="w-full max-w-[1100px] mx-auto relative flex flex-col gap-20 sm:gap-24 md:gap-[240px] pb-12 md:pb-[200px]">

          {/* SVG Connector Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
            {arrow1Path && (
              <g style={{ opacity: arrowsVisible.a1 ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
                <path d={arrow1Path} fill="none" stroke="#a072ff" strokeWidth="3" strokeDasharray="8 8" />
                <path d={arrow1Chevron} fill="none" stroke="#a072ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}
            {arrow2Path && (
              <g style={{ opacity: arrowsVisible.a2 ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
                <path d={arrow2Path} fill="none" stroke="#a072ff" strokeWidth="3" strokeDasharray="8 8" />
                <path d={arrow2Chevron} fill="none" stroke="#a072ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}
          </svg>

          {/* Card 1 — Özünü tanı */}
          <ScrollReveal ref={card1Ref} className="w-full max-w-[581px] h-auto min-h-0 md:h-[345px] md:min-h-[345px] relative self-center md:self-auto mt-8 md:mt-0">
            {/* Dedicated Classic Nexie Mascot */}
            <div className="absolute -top-[75px] sm:-top-[85px] right-4 sm:right-6 pointer-events-none z-20">
              <img
                src={nexieSittingClassic}
                alt="Nexie Mascot Classic"
                className="w-[125px] sm:w-[150px] object-contain drop-shadow-[0_15px_30px_rgba(0,242,255,0.3)]"
              />
            </div>
            <div className="w-full h-full bg-[#155567] rounded-[8px] p-5 sm:p-8 md:p-10 relative shadow-2xl flex flex-col justify-center">
              <h3 className="text-white text-[22px] sm:text-[26px] font-bold mb-4 flex items-center gap-4">
                <Sparkles size={28} className="text-white" /> Özünü tanı
              </h3>
              <p className="text-white/85 text-[14px] sm:text-[16px] leading-relaxed">
                İlk mərhələdə istifadəçi qısa testlər və gündəlik qeydlərlə emosional vəziyyətini analiz edir. Sistem onun stress, narahatlıq və emosional vəziyyətini müəyyənləşdirərək fərdi tövsiyələr təqdim edir.
              </p>
            </div>
          </ScrollReveal>

          {/* Card 2 — Ekspertlə əlaqə */}
          <ScrollReveal ref={card2Ref} className="w-full max-w-[581px] h-auto min-h-0 md:h-[345px] md:min-h-[345px] self-center md:self-end relative md:mt-0">
            {/* Dedicated Purple Nexie Mascot */}
            <div className="absolute -top-[75px] sm:-top-[85px] right-4 sm:right-6 pointer-events-none z-20">
              <img
                src={nexieSittingPurple}
                alt="Nexie Mascot Purple"
                className="w-[125px] sm:w-[150px] object-contain drop-shadow-[0_15px_30px_rgba(123,75,139,0.5)]"
              />
            </div>
            <div className="w-full h-full bg-[#7B4B8B] rounded-[8px] p-5 sm:p-8 md:p-10 relative shadow-2xl flex flex-col justify-center">
              <h3 className="text-white text-[22px] sm:text-[26px] font-bold mb-4 flex items-center gap-4">
                <Users size={28} className="text-white" /> Ekspertlə əlaqə
              </h3>
              <p className="text-white/85 text-[14px] sm:text-[16px] leading-relaxed">
                İstifadəçi peşəkar psixoloqlarla təhlükəsiz və rahat şəkildə əlaqə qura bilir. Online konsultasiya və fərdi dəstək sayəsində problemlərə daha düzgün yanaşma formalaşır.
              </p>
            </div>
          </ScrollReveal>

          {/* Card 3 — İnkişaf Et */}
          <ScrollReveal ref={card3Ref} className="w-full max-w-[581px] h-auto min-h-0 md:h-[345px] md:min-h-[345px] relative self-center md:self-auto md:mt-0">
            {/* Dedicated Classic Nexie Mascot */}
            <div className="absolute -top-[75px] sm:-top-[85px] right-4 sm:right-6 pointer-events-none z-20">
              <img
                src={nexieSittingClassic}
                alt="Nexie Mascot Classic"
                className="w-[125px] sm:w-[150px] object-contain drop-shadow-[0_15px_30px_rgba(0,242,255,0.3)]"
              />
            </div>
            <div className="w-full h-full bg-[#155567] rounded-[8px] p-5 sm:p-8 md:p-10 relative shadow-2xl flex flex-col justify-center">
              <h3 className="text-white text-[22px] sm:text-[26px] font-bold mb-4 flex items-center gap-4">
                <BookOpen size={28} className="text-white" /> İnkişaf Et
              </h3>
              <p className="text-white/85 text-[14px] sm:text-[16px] leading-relaxed">
                Platformadakı meditasiya, nəfəs məşqləri və şəxsi inkişaf tapşırıqları ilə istifadəçi özünü daha balanslı və güvənli hiss etməyə başlayır. Məqsəd uzunmüddətli daxili rahatlıq və sağlam düşüncə formalaşdırmaqdır.
              </p>
            </div>
          </ScrollReveal>

        </div>
      </div>

      {/* Partner Ticker */}
      <div className="w-screen -mx-4 sm:-mx-8 md:-mx-12 lg:-mx-[72px] bg-white/5 py-4 md:py-8 border-y border-white/10 overflow-hidden relative mt-10 md:mt-20">
        <div className="animate-ticker flex items-center gap-24">
          {[...PARTNER_NAMES, ...PARTNER_NAMES, ...PARTNER_NAMES].map((name, i) => (
            <span key={i} className="text-[20px] sm:text-[24px] font-bold text-white/50 whitespace-nowrap">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

