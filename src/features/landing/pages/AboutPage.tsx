import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LandingNavbar } from '../components/LandingNavbar';
import { Footer } from '../components/Footer';
import { GradientBackground, AppIcon, SEO } from '@/components';
import { ScrollReveal } from '../components/ScrollReveal';
import { PATHS } from '@/routes/paths';

export const AboutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white relative overflow-x-hidden">
      <SEO
        metaTitle={t('aboutPage.badge', 'Haqqımızda') + ' | NexusMind'}
        metaDescription={t(
          'aboutPage.section1.desc',
          'Biz müasir həyatın sürətli ritmində dərindən nəfəs ala biləcəyin təhlükəsiz bir daxili sığınacağıq.'
        )}
      />

      {/* ─────────────────────────────────────────────────────────────
          Unified Fixed Moving WebGL Gradient Background
          Covers the entire page seamlessly from top to bottom
      ───────────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <GradientBackground speed={0.8} resolution={0.5} />
      </div>

      {/* Navbar */}
      <div className="relative z-20">
        <LandingNavbar activePage="about" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          Unified Content Container
      ───────────────────────────────────────────────────────────── */}
      <main className="relative z-10 flex-1 w-full pt-[110px] sm:pt-[130px] md:pt-[150px] pb-20 md:pb-32 px-4 sm:px-8 md:px-12">
        <div className="w-full max-w-[1280px] mx-auto flex flex-col gap-16 sm:gap-20 md:gap-28">
          
          {/* ─────────────────────────────────────────────────────────
              Block 1: Top Center Introductory Block
          ───────────────────────────────────────────────────────── */}
          <ScrollReveal className="w-full flex flex-col items-center text-center">
            {/* Responsive single-line title */}
            <h1 className="text-[20px] min-[420px]:text-[24px] sm:text-[30px] md:text-[36px] lg:text-[42px] xl:text-[46px] font-bold text-white tracking-tight leading-[1.2] drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] mb-6 sm:mb-8 text-center sm:whitespace-nowrap max-w-none px-2">
              {t('aboutPage.section1.title', 'Biz Şirkətdən daha çox, Bir Sığınacağıq.')}
            </h1>

            {/* Intro Text Card (Top-Center) */}
            <div className="w-full max-w-[880px] bg-[#120f26]/35 backdrop-blur-2xl border border-white/15 rounded-[28px] p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.35)] relative overflow-hidden text-center">
              {/* Subtle top specular sheen */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

              <p className="text-[16px] sm:text-[18px] md:text-[20px] text-white/95 leading-relaxed font-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
                {t(
                  'aboutPage.section1.desc',
                  'İnsan olmaq — bəzən yorulmaq, cavabsız suallar arasında itmək və daxili fırtınalarla mübarizə aparmaq deməkdir. NexusMind sıradan bir rəqəmsal platforma və ya korporativ layihə deyil; biz müasir həyatın sürətli ritmində dərindən nəfəs ala biləcəyin təhlükəsiz bir daxili sığınacağıq. Məqsədimiz psixoloji dəstəyi hər bir insan üçün əlçatan, anlaşılan və hər növ mühakimədən uzaq bir təcrübəyə çevirməkdir.'
                )}
              </p>
            </div>
          </ScrollReveal>

          {/* ─────────────────────────────────────────────────────────
              Z-Pattern Step 1 (Section 2):
              Left Aligned Content | Right Aligned Future Image Slot
          ───────────────────────────────────────────────────────── */}
          <ScrollReveal>
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left Column: Text Content */}
              <div className="lg:col-span-7 flex flex-col items-start text-left gap-4">
                <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-white/90 text-[12px] font-semibold tracking-wide uppercase backdrop-blur-md shadow-sm">
                  <span>{t('aboutPage.section2.badge', 'Real Çətinliklər')}</span>
                </div>

                <h2 className="text-[24px] sm:text-[30px] md:text-[36px] font-bold text-white tracking-tight leading-[1.25] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                  {t('aboutPage.section2.title', 'Səssiz mübarizələr və baryerlər həyatın real üzüdür')}
                </h2>

                <div className="w-full bg-[#120f26]/35 backdrop-blur-2xl border border-white/15 rounded-[24px] p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.3)] relative overflow-hidden mt-2">
                  <p className="text-[15px] sm:text-[17px] md:text-[18px] text-white/90 leading-relaxed font-light drop-shadow-sm">
                    {t(
                      'aboutPage.section2.desc',
                      'Maddiyyat, vaxt darlığı, stereotiplər və ya sadəcə "məni kim anlar ki?" düşüncəsi... Təəssüf ki, milyonlarla insan ruhi rahatlığa ehtiyacı olduğu halda ilk addımı atmaqdan çəkinir. Ənənəvi psixoloji yardım metodları bəzən soyuq, çətin tapılan və ya büdcəyə ağır gələn bir prosesə çevrilir. Biz gördük ki, insanlar problemləri ilə baş-başa qalır və daxili balanslarını bərpa etmək üçün intuitiv, həqiqi dəstəyə ehtiyac duyurlar.'
                    )}
                  </p>
                </div>
              </div>

              {/* Right Column: Reserved Image Space */}
              <div className="lg:col-span-5 w-full">
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-[24px] border-2 border-dashed border-white/20 hover:border-white/40 bg-white/[0.04] backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center transition-all duration-300 group overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                  {/* Subtle clean icon */}
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white/80 mb-3 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                    <AppIcon icon="lucide:image" size={26} />
                  </div>
                  <span className="text-white/80 text-[14px] font-medium tracking-wide">
                    {t('aboutPage.imageSlot', 'Şəkil və ya İllüstrasiya Sahəsi')}
                  </span>
                  <span className="text-white/40 text-[12px] font-light mt-1">
                    {t('aboutPage.imageSlotHint', 'Gələcək vizual material üçün ayrılmışdır')}
                  </span>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* ─────────────────────────────────────────────────────────
              Z-Pattern Step 2 (Section 3):
              Left Aligned Future Image Slot | Right Aligned Content
          ───────────────────────────────────────────────────────── */}
          <ScrollReveal>
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left Column: Reserved Image Space (Desktop Order 1, Mobile Order 2) */}
              <div className="lg:col-span-5 w-full order-2 lg:order-1">
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-[24px] border-2 border-dashed border-white/20 hover:border-white/40 bg-white/[0.04] backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center transition-all duration-300 group overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                  {/* Subtle clean icon */}
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white/80 mb-3 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                    <AppIcon icon="lucide:sparkles" size={26} />
                  </div>
                  <span className="text-white/80 text-[14px] font-medium tracking-wide">
                    {t('aboutPage.imageSlot', 'Şəkil və ya İllüstrasiya Sahəsi')}
                  </span>
                  <span className="text-white/40 text-[12px] font-light mt-1">
                    {t('aboutPage.imageSlotHint', 'Gələcək vizual material üçün ayrılmışdır')}
                  </span>
                </div>
              </div>

              {/* Right Column: Text Content (Desktop Order 2, Mobile Order 1) */}
              <div className="lg:col-span-7 flex flex-col items-start text-left gap-4 order-1 lg:order-2">
                <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-white/90 text-[12px] font-semibold tracking-wide uppercase backdrop-blur-md shadow-sm">
                  <span>{t('aboutPage.section3.badge', 'Bizim İdeyamız')}</span>
                </div>

                <h2 className="text-[24px] sm:text-[30px] md:text-[36px] font-bold text-white tracking-tight leading-[1.25] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                  {t('aboutPage.section3.title', 'İnsan İstiliyi və Rəqəmsal İnnovasiyanın Vəhdəti- Bizim İdea imzamızdır.')}
                </h2>

                <div className="w-full bg-[#120f26]/35 backdrop-blur-2xl border border-white/15 rounded-[24px] p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.3)] relative overflow-hidden mt-2">
                  <p className="text-[15px] sm:text-[17px] md:text-[18px] text-white/90 leading-relaxed font-light drop-shadow-sm">
                    {t(
                      'aboutPage.section3.desc',
                      'NexusMind bu baryerləri yıxmaq üçün yaradıldı. Biz süni intellekt bələdçimiz Neksi, VR (Virtual Reallıq) konsultasiya mühitləri və peşəkar psixoloq şəbəkəsini tek bir ekosistemdə birləşdirdik. İstər evindən çıxmadan virtual rahatlıq zonanda sakitlik tap, istər "Hekayəni paylaş" bölməsində içini boşalt, istərsə də sahəsinin peşəkarı olan mütəxəssislərlə tam məxfi şəkildə əlaqə qur. Biz texnologiyanı soyuq alət kimi deyil, sənə uzanan isti bir kömək əli kimi istifadə edirik.'
                    )}
                  </p>
                </div>

                {/* Ecosystem Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mt-2">
                  <div className="bg-[#120f26]/40 backdrop-blur-xl border border-white/15 rounded-xl p-3 flex items-center gap-2.5 shadow-sm">
                    <AppIcon icon="lucide:bot" size={18} className="text-white/80 shrink-0" />
                    <span className="text-[13px] font-medium text-white/95">Neksi AI Bələdçi</span>
                  </div>
                  <div className="bg-[#120f26]/40 backdrop-blur-xl border border-white/15 rounded-xl p-3 flex items-center gap-2.5 shadow-sm">
                    <AppIcon icon="lucide:glasses" size={18} className="text-white/80 shrink-0" />
                    <span className="text-[13px] font-medium text-white/95">VR Mühitləri</span>
                  </div>
                  <div className="bg-[#120f26]/40 backdrop-blur-xl border border-white/15 rounded-xl p-3 flex items-center gap-2.5 shadow-sm">
                    <AppIcon icon="lucide:shield-check" size={18} className="text-white/80 shrink-0" />
                    <span className="text-[13px] font-medium text-white/95">Məxfi Mütəxəssislər</span>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* ─────────────────────────────────────────────────────────
              Z-Pattern Step 3 (Section 4):
              Left Aligned Content | Right Aligned Future Image Slot
          ───────────────────────────────────────────────────────── */}
          <ScrollReveal>
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left Column: Text Content */}
              <div className="lg:col-span-7 flex flex-col items-start text-left gap-4">
                <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-white/90 text-[12px] font-semibold tracking-wide uppercase backdrop-blur-md shadow-sm">
                  <span>{t('aboutPage.section4.badge', 'Gələcəyə Doğru')}</span>
                </div>

                <h2 className="text-[24px] sm:text-[30px] md:text-[36px] font-bold text-white tracking-tight leading-[1.25] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                  {t('aboutPage.section4.title', 'Öz Hekayənin Qəhrəmanı Ol')}
                </h2>

                <div className="w-full bg-[#120f26]/35 backdrop-blur-2xl border border-white/15 rounded-[24px] p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.3)] relative overflow-hidden mt-2">
                  <p className="text-[15px] sm:text-[17px] md:text-[18px] text-white/90 leading-relaxed font-light drop-shadow-sm">
                    {t(
                      'aboutPage.section4.desc',
                      'Bizim ümumi hədəfimiz sadəcə bir tətbiq olmaq deyil — insanın özünü kəşf etmə səyahətində onun ən etibarlı yoldaşına çevrilməkdir. İnanırıq ki, psixoloji sağlamlıq lüks deyil, hər bir insanın təməl haqqıdır. NexusMind ilə sən yalnız deyilsən: burada hər emosiyanın dəyəri var, hər addımın isə daha güclü, balanslı və hüzurlu bir "Sən"ə doğru atılan addımdır.'
                    )}
                  </p>
                </div>
              </div>

              {/* Right Column: Reserved Image Space */}
              <div className="lg:col-span-5 w-full">
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-[24px] border-2 border-dashed border-white/20 hover:border-white/40 bg-white/[0.04] backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center transition-all duration-300 group overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                  {/* Subtle clean icon */}
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white/80 mb-3 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                    <AppIcon icon="lucide:heart-handshake" size={26} />
                  </div>
                  <span className="text-white/80 text-[14px] font-medium tracking-wide">
                    {t('aboutPage.imageSlot', 'Şəkil və ya İllüstrasiya Sahəsi')}
                  </span>
                  <span className="text-white/40 text-[12px] font-light mt-1">
                    {t('aboutPage.imageSlotHint', 'Gələcək vizual material üçün ayrılmışdır')}
                  </span>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* ─────────────────────────────────────────────────────────
              Bottom Center: Classic Purple "Get Started" Button
          ───────────────────────────────────────────────────────── */}
          <ScrollReveal className="w-full flex justify-center items-center pt-4 sm:pt-8">
            <button
              type="button"
              onClick={() => navigate(PATHS.REGISTER)}
              className="group relative w-full sm:w-auto sm:min-w-[220px] h-[54px] sm:h-[58px] bg-[#4A148F] text-white text-center px-8 sm:px-12 rounded-[100px] text-[17px] sm:text-[20px] font-semibold flex items-center justify-center transition-transform duration-300 ease-out active:scale-[0.95] cursor-pointer shadow-[0_4px_25px_rgba(74,20,143,0.5)]"
            >
              {/* Animated Conic Border */}
              <div
                className="absolute inset-0 rounded-[100px] pointer-events-none overflow-hidden"
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
              <span className="relative z-10 ponnala-nudge">
                {t('hero.cta', 'İndi başla')}
              </span>
            </button>
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
