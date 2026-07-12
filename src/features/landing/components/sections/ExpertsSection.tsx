import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import { psychologists } from '../../data/psychologists';
import { Footer } from '../Footer';
import { ScrollReveal } from '../ScrollReveal';

export const ExpertsSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="experts"
      className="relative w-full min-h-0 md:min-h-screen flex flex-col items-center pt-10 md:pt-[112px] scroll-mt-20"
    >
      <ScrollReveal className="w-full max-w-[1200px] mx-auto flex flex-col items-center pb-20 px-4 sm:px-8 md:px-12 lg:px-[72px]">

        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-[26px] sm:text-[36px] md:text-[44px] font-bold text-white mb-2 tracking-tight">
            Mütəxəssislərimiz :
          </h2>
          <p className="text-[15px] sm:text-[20px] md:text-[24px] text-white/90 mb-3">
            Psixoloqlar, Həyat bələdçiləri, Mindfulness terapistləri və s.
          </p>
          <p className="text-[14px] sm:text-[18px] text-[#00f2ff]/80">
            Sən də bizimlə həyatdan yenidən zövq almağı öyrən !
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {psychologists.map((psych) => (
            <div key={psych.id} className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4 items-center">
                  <img src={psych.image} alt={psych.name} className="w-[70px] h-[70px] rounded-full object-cover border-2 border-white/20" />
                  <div>
                    <h3 className="text-white text-[20px] font-semibold">{psych.name}</h3>
                    <p className="text-white/60 text-[14px]">{psych.experience}</p>
                    <p className="text-[#facc15] text-[14px] flex items-center gap-1 mt-1">⭐ {psych.rating}</p>
                  </div>
                </div>
                <div className="text-[#a88bff] font-bold text-[20px]">
                  ${psych.price}<span className="text-[16px] font-normal">/seans</span>
                </div>
              </div>

              <p className="text-white/70 text-[14px] leading-relaxed mb-4 line-clamp-3">
                {psych.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                {psych.languages.map((lang) => (
                  <span key={lang} className="px-3 py-1 rounded-lg border border-[#a88bff]/50 text-white/80 text-[12px]">{lang}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {psych.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-lg bg-white/10 text-white/70 text-[12px]">{tag}</span>
                ))}
              </div>

              <button
                onClick={() => navigate(PATHS.PSYCHOLOGIST.replace(':id', String(psych.id)))}
                className="w-full bg-[#a88bff] hover:bg-[#9773fc] text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer z-50 relative"
              >
                Başlayaq
              </button>
            </div>
          ))}
        </div>

        <button className="text-white hover:text-[#a88bff] transition-colors flex items-center gap-2 text-[18px]">
          Daha çox <span>→</span>
        </button>

      </ScrollReveal>
      <Footer />
    </section>
  );
};
