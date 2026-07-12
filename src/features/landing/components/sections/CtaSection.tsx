import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import { ScrollReveal } from '../ScrollReveal';

export const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="cta"
      className="relative w-full flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[72px] pt-10 md:pt-[112px] pb-10 md:pb-0 scroll-mt-20"
    >
      <ScrollReveal className="w-full max-w-[898px] h-auto min-h-[354px] md:h-[354px] mx-auto bg-white/20 backdrop-blur-md rounded-[8px] pt-[24px] pb-[24px] pr-[16px] pl-[16px] sm:pr-[21px] sm:pl-[21px] gap-[8px] flex flex-col items-center justify-center text-center shadow-2xl border border-white/10">
        <h2 className="text-[30px] sm:text-[44px] font-bold text-white tracking-tight">
          İndi qoşul !
        </h2>
        <p className="text-[14px] sm:text-[18px] text-white/90 max-w-[700px] mb-2">
          Email-ini göndər sənə ilkin ödənişsiz planı göndərək.
        </p>

        <form
          onSubmit={(e) => { e.preventDefault(); navigate(PATHS.REGISTER); }}
          className="w-full max-w-[650px] flex flex-col sm:flex-row gap-4 mt-2"
        >
          <input
            type="email"
            placeholder="E-poçt ünvanınız"
            className="flex-1 bg-[#0b2430] rounded-lg px-6 py-3.5 sm:px-8 sm:py-5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 text-[14px] sm:text-[16px]"
          />
          <button
            type="submit"
            className="whitespace-nowrap bg-[#a88bff] hover:bg-[#9773fc] text-[#1a2b3c] font-bold text-[14px] sm:text-[16px] rounded-lg px-6 py-3.5 sm:px-10 sm:py-5 transition-all duration-300 shadow-[0_4px_14px_rgba(168,139,255,0.4)] hover:shadow-[0_6px_20px_rgba(168,139,255,0.6)] cursor-pointer"
          >
            Göndər
          </button>
        </form>
      </ScrollReveal>
    </section>
  );
};
