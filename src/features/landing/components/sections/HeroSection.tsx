import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import nexie from '@/assets/svg/Nexie.svg';
import nexieCloud from '@/assets/svg/NexieCloud.svg';
import hi0101 from '@/assets/hi0101.png';
import hi0102 from '@/assets/hi0102.png';
import hi0103 from '@/assets/hi0103.png';
import { ScrollReveal } from '../ScrollReveal';

const FEATURE_CARDS = [
  { img: hi0101, text: 'Mütəxəssislər köməyilə çətinliklərdən azad ol!' },
  { img: hi0102, text: 'Vr konsultasiya ilə evdən çıxmağa belə ehtiyac yoxdur!' },
  { img: hi0103, text: 'Günlük notlar qeyd edərək səndə öz inkişafını gör!' },
];

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative w-full min-h-fit flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[60px] sm:pt-[80px] pb-[80px] sm:pb-[100px] scroll-mt-20"
    >
      <ScrollReveal className="w-full mx-auto flex flex-col items-center relative">
        <div className="relative w-full max-w-[1056px] h-auto min-h-[417px] md:h-[417px] bg-white/10 backdrop-blur-xl border border-white/10 rounded-[8px] pt-[24px] pb-[24px] pr-[16px] pl-[16px] sm:pr-[21px] sm:pl-[21px] gap-[8px] flex flex-col justify-between items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.3)]">

          {/* Mascot — Desktop */}
          <div className="absolute -left-[145px] bottom-[-25px] hidden md:flex flex-col items-center pointer-events-none z-20">
            <img src={nexieCloud} alt="Speech Bubble" className="w-[180px] object-contain mb-[-15px] ml-[-40px] drop-shadow-xl" />
            <img src={nexie} alt="Nexie Mascot" className="w-[285px] object-contain drop-shadow-[0_0_35px_rgba(0,242,255,0.4)]" />
          </div>

          {/* Mascot — Mobile */}
          <div className="absolute -left-[35px] -bottom-[15px] flex md:hidden flex-col items-center pointer-events-none z-20">
            <img src={nexie} alt="Nexie Mascot" className="w-[135px] sm:w-[165px] object-contain drop-shadow-[0_0_20px_rgba(0,242,255,0.4)]" />
          </div>

          {/* Card Content */}
          <div className="flex-1 flex flex-col justify-center gap-6 py-2 w-full items-center">
            <div className="flex flex-col gap-3">
              <h1 className="text-[28px] sm:text-[40px] md:text-[48px] font-bold text-white tracking-tight leading-tight">
                Özünü kəşf etməyə hazırsan?
              </h1>
              <p className="text-[16px] sm:text-[22px] md:text-[24px] text-white/80 max-w-[800px] mx-auto leading-relaxed">
                Sıxıntıdan qurtul, rahat nəfəs al,<br />
                və həyatdan zövq al!
              </p>
            </div>

            <button
              onClick={() => navigate(PATHS.REGISTER)}
              className="w-full max-w-[280px] bg-[#591b98] hover:bg-[#6c22b5] text-white py-3.5 rounded-lg text-[16px] sm:text-[18px] font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(89,27,152,0.4)] hover:shadow-[0_0_30px_rgba(89,27,152,0.6)] hover:scale-[1.02] cursor-pointer"
            >
              İndi başla
            </button>
          </div>

          <p className="text-white/50 text-[11px] sm:text-[12px] pb-2 px-12 sm:px-0 relative z-30">
            Davam etməklə, siz bizim{' '}
            <a href="#" className="text-white/70 hover:text-white transition-colors cursor-pointer pointer-events-auto">Xidmət Şərtləri</a>
            {' '}və{' '}
            <a href="#" className="text-white/70 hover:text-white transition-colors cursor-pointer pointer-events-auto">Məxfilik Siyasəti</a>
            {' '}ilə razılaşırsınız.
          </p>
        </div>

        {/* Bottom Feature Cards */}
        <div className="w-full mt-[64px] flex flex-wrap justify-evenly gap-6 px-4 sm:px-6 xl:px-[58px]">
          {FEATURE_CARDS.map((card, i) => (
            <div
              key={i}
              className="flex items-center justify-center gap-3.5 w-full max-w-[326px] min-h-[80px] bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-[12px] hover:bg-white/15 transition-colors"
            >
              <div className="w-[46px] h-[46px] rounded-full overflow-hidden flex-shrink-0 bg-[#591b98]/30">
                <img src={card.img} alt={`Feature ${i + 1}`} className="w-full h-full object-cover" />
              </div>
              <p className="text-white text-[13px] leading-snug font-medium text-left flex-1">{card.text}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};
