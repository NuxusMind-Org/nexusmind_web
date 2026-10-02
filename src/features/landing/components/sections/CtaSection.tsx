import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PATHS } from '@/routes/paths';
import { ScrollReveal } from '../ScrollReveal';

export const CtaSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section
      id="cta"
      className="relative w-full flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[72px] py-16 md:py-24 scroll-mt-20"
    >
      <ScrollReveal className="w-full max-w-[900px] mx-auto flex flex-col items-center text-center">
        <h2 className="text-[32px] sm:text-[52px] lg:text-[64px] font-bold text-white tracking-tight leading-tight">
          {t('cta.title', 'İndi qoşul !')}
        </h2>
        <p className="text-[16px] sm:text-[19px] md:text-[21px] text-white/80 max-w-[560px] mt-4 mb-10 sm:mb-12 leading-relaxed">
          {t('cta.subtitle', 'Email-ini göndər sənə ilkin ödənişsiz planı göndərək.')}
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate(PATHS.REGISTER);
          }}
          className="w-full max-w-[640px] flex flex-col sm:flex-row items-stretch gap-3 sm:gap-0 sm:p-1.5 sm:bg-white/10 sm:backdrop-blur-xl sm:rounded-full sm:border sm:border-white/15"
        >
          <input
            type="email"
            required
            placeholder={t('cta.placeholder', 'E-poçt ünvanınız')}
            className="w-full flex-1 h-[56px] sm:h-[58px] bg-white/10 sm:bg-transparent text-white placeholder-white/50 px-6 sm:px-7 rounded-full border border-white/15 sm:border-0 focus:outline-none focus:ring-2 focus:ring-white/25 text-[15px] sm:text-[17px]"
          />
          <button
            type="submit"
            className="w-full sm:w-auto h-[56px] sm:h-[58px] px-8 sm:px-10 bg-[#4A148F] hover:bg-[#5b1ab0] text-white font-semibold text-[16px] sm:text-[18px] rounded-full transition-colors duration-300 cursor-pointer shrink-0 shadow-[0_4px_20px_rgba(74,20,143,0.45)] inline-flex items-center justify-center"
          >
            <span>{t('cta.button', 'Göndər')}</span>
          </button>
        </form>
      </ScrollReveal>
    </section>
  );
};
