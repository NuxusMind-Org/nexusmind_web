import vrConsultation from '@/assets/vr_consultation.png';
import { ScrollReveal } from '../ScrollReveal';

export const VrConsultationSection = () => {
  return (
    <section
      id="vr"
      className="relative w-full min-h-0 md:min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-[72px] py-10 md:py-20 scroll-mt-20"
    >
      <ScrollReveal className="w-full max-w-[1200px] h-[50vh] sm:h-[60vh] md:h-[75vh] mx-auto relative rounded-[8px] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.5)] border border-white/20 group">
        {/* Background Image */}
        <img
          src={vrConsultation}
          alt="VR Consultation"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
        />

        {/* Floating Glassmorphism Content */}
        <div className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-10 md:right-10 bg-[#eeb3b3]/30 backdrop-blur-2xl border border-white/40 rounded-lg p-4 sm:p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-[22px] md:text-[36px] font-bold text-white mb-2 md:mb-3 tracking-wide">
              VR KONSULTASİYA
            </h2>
            <p className="text-[13px] sm:text-[15px] md:text-[20px] text-white/95 leading-relaxed font-semibold">
              Burada evdən çölə çıxmadan istədiyin konfort zonanı seçə və orada zaman keçirərək sakitləşə bilərsən.
            </p>
          </div>
          <button className="whitespace-nowrap bg-[#a88bff] hover:bg-[#9773fc] text-[#1a2b3c] font-bold text-[14px] md:text-[18px] rounded-lg px-6 py-2.5 md:px-10 md:py-4 transition-all duration-300 shadow-[0_4px_14px_rgba(168,139,255,0.4)] hover:shadow-[0_6px_20px_rgba(168,139,255,0.6)] cursor-pointer">
            Demo-nu İzlə
          </button>
        </div>
      </ScrollReveal>
    </section>
  );
};
