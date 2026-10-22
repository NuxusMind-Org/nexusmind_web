import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LandingNavbar } from '../components/LandingNavbar';
import { Footer } from '../components/Footer';
import { GradientBackground, AppIcon, SEO } from '@/components';
import { ScrollReveal } from '../components/ScrollReveal';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export const FaqPage = () => {
  const { t } = useTranslation();
  // Store expanded item IDs (default first item open)
  const [openItems, setOpenItems] = useState<number[]>([1]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const rawItems = t('faqPage.items', { returnObjects: true }) as FaqItem[];
  const faqList: FaqItem[] = Array.isArray(rawItems)
    ? rawItems
    : [
        {
          id: 1,
          question: '1. Mənim fərdi məlumatlarım necə qorunur?',
          answer:
            'Beynəlxalq GDPR standartlarına uyğun olaraq məlumatlarınızın təhlükəsizliyinə və məxfiliyinə tam zəmanət veririk. Məlumatlarınız üçüncü tərəflərlə paylaşılmır.',
        },
        {
          id: 2,
          question: '2. NexusMind platformasından kimlər istifadə edə bilər?',
          answer:
            'Platformamız həm fərdi istifadəçilər (tələbələr, işçilər və s.), həm də korporativ tərəfdaşlar (psixologiya və biznes mərkəzləri, təhsil müəssisələri) üçün nəzərdə tutulub.',
        },
        {
          id: 3,
          question: '3. Platformada necə qeydiyyatdan keçə bilərəm?',
          answer:
            '"Daxil ol" düyməsinə klikləyib e-poçt ünvanınızı yazın. E-poçtunuza gələn təsdiq kodunu daxil etdikdən və qısa yönləndirmə suallarını cavablandırdıqdan sonra hesabınız hazır olacaq.',
        },
        {
          id: 4,
          question: '4. Seansı ləğv etsəm, ödənişim geri qaytarılırmı?',
          answer:
            'Seansa ən azı 24 saat (1 gün) qalmış ləğv etdikdə ödənişiniz tam geri qaytarılır. Seans günü edilən ləğvlərdə isə ödəniş qaytarılmır.',
        },
        {
          id: 5,
          question: '5. Seans rezervasiyası necə edilir?',
          answer:
            'Təqvim üzərindən sizə uyğun tarix və saatı seçib ödənişi tamamlayırsınız. Ödəniş təsdiqləndikdə rezervasiyanız həyata keçirilir.',
        },
      ];

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white relative overflow-x-hidden">
      <SEO
        metaTitle={t('faqPage.title', 'Tez-tez Verilən Suallar') + ' | NexusMind'}
        metaDescription={t(
          'faqPage.subtitle',
          'NexusMind platforması, xidmətlərimiz və təhlükəsizlik haqqında ən çox maraqlanılan sualların cavabları.'
        )}
      />

      {/* ─────────────────────────────────────────────────────────────
          Unified Fixed Moving WebGL Gradient Background
      ───────────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <GradientBackground speed={0.8} resolution={0.5} />
      </div>

      {/* Navbar */}
      <div className="relative z-20">
        <LandingNavbar activePage="faq" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          Page Main Content
      ───────────────────────────────────────────────────────────── */}
      <main className="relative z-10 flex-1 w-full pt-[110px] sm:pt-[130px] md:pt-[150px] pb-20 md:pb-28 px-4 sm:px-8 md:px-12">
        <div className="w-full max-w-[960px] mx-auto flex flex-col items-center">
          
          {/* Header */}
          <ScrollReveal className="w-full flex flex-col items-center text-center mb-10 sm:mb-14">
            <h1 className="text-[28px] sm:text-[38px] md:text-[48px] font-bold text-white tracking-tight leading-[1.2] drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] mb-4">
              {t('faqPage.title', 'Tez-tez Verilən Suallar')}
            </h1>

            <p className="text-[15px] sm:text-[17px] md:text-[18px] text-white/85 max-w-[680px] leading-relaxed font-light drop-shadow-sm">
              {t(
                'faqPage.subtitle',
                'NexusMind platforması, xidmətlərimiz və təhlükəsizlik haqqında ən çox maraqlanılan sualların cavabları.'
              )}
            </p>
          </ScrollReveal>

          {/* FAQ Accordion List */}
          <div className="w-full flex flex-col gap-4 sm:gap-5">
            {faqList.map((item) => {
              const isOpen = openItems.includes(item.id);
              return (
                <ScrollReveal key={item.id} className="w-full">
                  <div
                    className={`w-full bg-[#120f26]/35 backdrop-blur-2xl border transition-all duration-300 rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.25)] ${
                      isOpen
                        ? 'border-white/30 bg-[#120f26]/45'
                        : 'border-white/15 hover:border-white/25 hover:bg-[#120f26]/40'
                    }`}
                  >
                    {/* Header Click Area */}
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer outline-none select-none transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-[16px] sm:text-[18px] md:text-[19px] font-semibold text-white tracking-tight leading-snug drop-shadow-sm flex-1">
                        {item.question}
                      </span>

                      {/* Expand / Collapse Icon */}
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen
                            ? 'bg-white/20 rotate-180 text-white'
                            : 'bg-white/10 text-white/70'
                        }`}
                      >
                        <AppIcon icon="lucide:chevron-down" size={20} />
                      </div>
                    </button>

                    {/* Smooth Collapsible Answer */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out px-5 sm:px-6 ${
                        isOpen
                          ? 'grid-rows-[1fr] opacity-100 pb-5 sm:pb-6'
                          : 'grid-rows-[0fr] opacity-0 pb-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pt-3 border-t border-white/10">
                          <p className="text-[14.5px] sm:text-[16px] md:text-[17px] text-white/85 leading-relaxed font-light drop-shadow-sm">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Contact Support Card */}
          <ScrollReveal className="w-full mt-12 sm:mt-16">
            <div className="w-full bg-[#120f26]/30 backdrop-blur-2xl border border-white/15 rounded-[24px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_10px_35px_rgba(0,0,0,0.25)] text-center sm:text-left">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[18px] sm:text-[20px] font-bold text-white tracking-tight">
                  {t('faqPage.stillHaveQuestions', 'Hələ də sualınız var?')}
                </h3>
                <p className="text-[14px] sm:text-[15px] text-white/75 font-light max-w-[500px]">
                  {t(
                    'faqPage.stillHaveQuestionsDesc',
                    'Komandamız sizə kömək etməyə hər zaman hazırdır. Bizimlə birbaşa əlaqə saxlayın.'
                  )}
                </p>
              </div>

              <a
                href="mailto:nexusmind.net@gmail.com"
                className="group relative w-full sm:w-auto px-6 sm:px-8 h-[48px] sm:h-[50px] bg-[#4A148F] text-white font-semibold text-[15px] rounded-full flex items-center justify-center gap-2 transition-transform duration-300 ease-out active:scale-95 cursor-pointer shadow-[0_4px_20px_rgba(74,20,143,0.45)] shrink-0 overflow-hidden"
              >
                {/* Animated Conic Border */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
                  style={{
                    padding: '2px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                >
                  <div
                    className="absolute left-1/2 top-1/2 w-[200%] aspect-square -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-out group-hover:rotate-90"
                    style={{
                      background:
                        'conic-gradient(from 315deg, #6700FF 0%, rgba(255, 255, 255, 0.04) 25%, #FFFFFF 50%, rgba(255, 255, 255, 0.07) 75%, #6700FF 100%)',
                    }}
                  />
                </div>
                <AppIcon icon="lucide:mail" size={17} className="relative z-10 text-white/90" />
                <span className="relative z-10 ponnala-nudge">
                  {t('faqPage.contactUs', 'Bizimlə Əlaqə')}
                </span>
              </a>
            </div>
          </ScrollReveal>

        </div>
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};
