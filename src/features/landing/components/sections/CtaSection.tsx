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
      <ScrollReveal className="relative w-full max-w-[1231px] min-h-[457px] md:h-[457px] mx-auto bg-[#052C39] rounded-[20px] pt-[18px] pb-[18px] px-6 sm:px-[32px] flex flex-col items-center justify-center text-center shadow-2xl border border-white/5 overflow-hidden">
        {/* Top-Left Quote Badge */}
        <div
          className="absolute top-5 left-5 sm:top-7 sm:left-8 w-[42px] h-[36px] sm:w-[50px] sm:h-[42px] bg-[#196882] rounded-[8px] flex items-center justify-center shadow-sm select-none"
          aria-hidden="true"
        >
          <svg
            className="w-[28px] h-[22px] sm:w-[32px] sm:h-[26px]"
            viewBox="0 0 38 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 4H14.5L11 12C14.5 12.2 17 14.8 17 18.5C17 22.5 13.8 25.5 10 25.5C6.2 25.5 3 22.5 3 18.5C3 15 5.2 11.5 8 8.8L11.5 4Z"
              fill="#E56CE9"
            />
            <path
              d="M28.5 4H31.5L28 12C31.5 12.2 34 14.8 34 18.5C34 22.5 30.8 25.5 27 25.5C23.2 25.5 20 22.5 20 18.5C20 15 22.2 11.5 25 8.8L28.5 4Z"
              fill="#E56CE9"
            />
          </svg>
        </div>

        {/* Bottom-Right Quote Badge */}
        <div
          className="absolute bottom-5 right-5 sm:bottom-7 sm:right-8 w-[42px] h-[36px] sm:w-[50px] sm:h-[42px] bg-[#196882] rounded-[8px] flex items-center justify-center shadow-sm select-none"
          aria-hidden="true"
        >
          <svg
            className="w-[28px] h-[22px] sm:w-[32px] sm:h-[26px]"
            viewBox="0 0 38 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 6.5C13.8 6.5 17 9.5 17 13.5C17 17 14.8 20.5 12 23.2L8.5 28H5.5L9 20C5.5 19.8 3 17.2 3 13.5C3 9.5 6.2 6.5 10 6.5Z"
              fill="#E56CE9"
            />
            <path
              d="M27 6.5C30.8 6.5 34 9.5 34 13.5C34 17 31.8 20.5 29 23.2L25.5 28H22.5L26 20C22.5 19.8 20 17.2 20 13.5C20 9.5 23.2 6.5 27 6.5Z"
              fill="#E56CE9"
            />
          </svg>
        </div>

        {/* Main Content */}
        <div className="w-full flex flex-col items-center">
          <h2 className="text-[32px] sm:text-[42px] md:text-[48px] font-bold text-white tracking-tight leading-tight">
            İndi qoşul !
          </h2>
          <p className="text-[14px] sm:text-[16px] md:text-[18px] text-white/90 max-w-[700px] mt-2 sm:mt-3 mb-7 sm:mb-9 font-normal">
            Email-ini göndər sənə ilkin ödənişsiz planı göndərək.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(PATHS.REGISTER);
            }}
            className="w-full max-w-[560px] sm:max-w-[680px] md:max-w-[730px] flex flex-col gap-4 sm:gap-5 items-center"
          >
            <input
              type="email"
              required
              placeholder="E-poçt ünvanınız"
              className="w-full h-[54px] sm:h-[62px] bg-[#3E5B65] text-white placeholder-white/60 px-6 sm:px-8 rounded-full border border-[#4A6D79] focus:outline-none focus:ring-2 focus:ring-[#711574]/60 text-[15px] sm:text-[17px] shadow-inner transition-colors"
            />
            <button
              type="submit"
              className="w-full h-[54px] sm:h-[62px] bg-[#711574] hover:bg-[#861A8A] text-white font-bold text-[16px] sm:text-[18px] rounded-full transition-all duration-300 shadow-[0_4px_16px_rgba(113,21,116,0.4)] hover:shadow-[0_6px_24px_rgba(134,26,138,0.6)] cursor-pointer flex items-center justify-center active:scale-[0.99]"
            >
              Göndər
            </button>
          </form>
        </div>
      </ScrollReveal>
    </section>
  );
};

