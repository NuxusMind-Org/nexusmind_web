import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LandingNavbar } from '../components/LandingNavbar';
import { Footer } from '../components/Footer';
import { GradientBackground, AppIcon, SEO, SmartImage } from '@/components';
import { ScrollReveal } from '../components/ScrollReveal';
import { PATHS } from '@/routes/paths';
import teamImage from '@/assets/gallery/gallery_workshop.webp';

const DEFAULT_VISION_ITEMS = [
  'Beynəlxalq standartlara uyğun və sübuta əsaslanan xidmətləri əlçatan etmək.',
  'Cəmiyyətdə psixi sağlamlıq üzrə maarifləndirmə və psixososial rifahın dəstəklənməsində aktiv rol oynamaq.',
  'Mütəxəssislərin peşəkar inkişafını və təcrübə mübadiləsini dəstəkləmək.',
];

const DEFAULT_DIFFERENCE_ITEMS = [
  'Güvənli və rahat online mühit',
  'Etik kodekslərə sadiqlik və məxfilik',
  'Peşəkar və ixtisaslı komanda',
  'Fərdi yanaşma',
  'Müasir rəqəmsal standartlar',
];

export const AboutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const rawVisionItems = t('aboutPage.visionItems', { returnObjects: true }) as string[];
  const visionItems: string[] = Array.isArray(rawVisionItems) ? rawVisionItems : DEFAULT_VISION_ITEMS;

  const rawDifferenceItems = t('aboutPage.differenceItems', { returnObjects: true }) as string[];
  const differenceItems: string[] = Array.isArray(rawDifferenceItems)
    ? rawDifferenceItems
    : DEFAULT_DIFFERENCE_ITEMS;

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white relative overflow-x-hidden">
      <SEO
        metaTitle={t('aboutPage.badge', 'HAQQIMIZDA') + ' | NexusMind'}
        metaDescription={t(
          'aboutPage.intro',
          'Sağlam düşüncə tərzi və daxili balans insanların psixoloji sağlamlığını və həyat keyfiyyətini müəyyən edir.'
        )}
      />

      {/* Unified Fixed Moving WebGL Gradient Background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <GradientBackground speed={0.8} resolution={0.5} />
      </div>

      {/* Navbar */}
      <div className="relative z-20">
        <LandingNavbar activePage="about" />
      </div>

      {/* Main Content — Editorial Layout (No Glassy Boxes) */}
      <main className="relative z-10 flex-1 w-full pt-[110px] sm:pt-[130px] md:pt-[150px] pb-20 md:pb-32 px-4 sm:px-8 md:px-12 lg:px-[72px]">
        <div className="w-full max-w-[1160px] mx-auto flex flex-col gap-14 sm:gap-16 md:gap-20">

          {/* ─────────────────────────────────────────────────────────
              1. Full-Width Top Team Image followed by Title & Intro
          ───────────────────────────────────────────────────────── */}
          <ScrollReveal className="flex flex-col gap-10 sm:gap-12">
            {/* Full-Width Team Image on Top */}
            <div className="relative w-full h-[260px] sm:h-[380px] md:h-[460px] lg:h-[520px] rounded-2xl overflow-hidden shadow-2xl">
              <SmartImage
                src={teamImage}
                alt={t('aboutPage.teamImageAlt', 'NexusMind Peşəkar Komandası')}
                fetchPriority="high"
                critical
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Overline, Title, and Intro Text Under the Image (No glassy box) */}
            <section className="flex flex-col items-start text-left gap-5">
              <span className="text-[13px] sm:text-[14px] font-bold tracking-[0.2em] uppercase text-[#00F2FF]">
                {t('aboutPage.badge', 'HAQQIMIZDA')}
              </span>

              <h1 className="text-[24px] sm:text-[32px] md:text-[38px] lg:text-[44px] font-bold text-white tracking-tight leading-[1.2]">
                {t(
                  'aboutPage.title',
                  'ETİBAR EDƏ BİLƏCƏYİNİZ PEŞƏKAR VƏ İXTİSASLAŞMIŞ RƏQƏMSAL PSİXOLOGİYA PLATFORMASI'
                )}
              </h1>

              <div className="w-16 h-[2px] bg-[#00F2FF]/70 my-1" />

              <p className="text-[16px] sm:text-[18px] md:text-[19px] text-white/90 leading-relaxed font-light max-w-[980px]">
                {t(
                  'aboutPage.intro',
                  'Sağlam düşüncə tərzi və daxili balans insanların psixoloji sağlamlığını və həyat keyfiyyətini müəyyən edir. Peşəkar komandamız gündəlik həyatın çətinlikləri ilə üzləşən, daxili rahatlığını bərpa etmək, yaxud özünü daha dərindən kəşf etmək istəyən fərdlərə ən etibarlı online seans dəstəyini təqdim etmək üçün çalışır. Emosional və psixoloji rifahınızı inkişaf etdirməniz üçün müasir rəqəmsal mühitdə yanınızdayıq.'
                )}
              </p>
            </section>
          </ScrollReveal>

          {/* Horizontal Divider */}
          <div className="w-full border-t border-white/20" />

          {/* ─────────────────────────────────────────────────────────
              2. Editorial Grid: Mission & Vision + What Makes Us Different
                 (Pure typography and dividers — no glassy boxes)
          ───────────────────────────────────────────────────────── */}
          <ScrollReveal>
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: 1. MİSSİYAMIZ & 2. VİZYONUMUZ */}
              <div className="lg:col-span-7 flex flex-col gap-12">
                {/* 1. MİSSİYAMIZ */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-[22px] sm:text-[26px] font-bold text-white tracking-tight">
                    {t('aboutPage.missionTitle', '1. MİSSİYAMIZ')}
                  </h2>
                  <p className="text-[16px] sm:text-[17px] text-white/85 leading-relaxed font-light">
                    {t(
                      'aboutPage.missionDesc',
                      'Fərdlərə həyatın müxtəlif mərhələlərində peşəkar psixoloji bələdçilik etmək, rəqəmsal texnologiyaların gücü ilə psixi sağlamlıq xidmətlərini hər kəs üçün əlçatan etmək. Biz həyat boyu inkişaf və daxili harmoniya prinsipi ilə psixososial rifahın yaxşılaşdırılması üçün çalışırıq.'
                    )}
                  </p>
                </div>

                {/* Divider between Mission and Vision */}
                <div className="w-full border-t border-white/15" />

                {/* 2. VİZYONUMUZ */}
                <div className="flex flex-col gap-5">
                  <h2 className="text-[22px] sm:text-[26px] font-bold text-white tracking-tight">
                    {t('aboutPage.visionTitle', '2. VİZYONUMUZ')}
                  </h2>
                  <ul className="flex flex-col gap-4">
                    {visionItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3.5 text-[16px] sm:text-[17px] text-white/85 leading-relaxed font-light">
                        <span className="mt-2 w-2 h-2 rounded-full bg-[#00F2FF] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Fərqimiz nədir? */}
              <div className="lg:col-span-5 flex flex-col gap-6 lg:border-l lg:border-white/20 lg:pl-12">
                <h2 className="text-[22px] sm:text-[26px] font-bold text-white tracking-tight">
                  {t('aboutPage.differenceTitle', 'Fərqimiz nədir?')}
                </h2>

                <ul className="flex flex-col divide-y divide-white/15">
                  {differenceItems.map((item, idx) => (
                    <li
                      key={idx}
                      className="py-4 first:pt-1 last:pb-0 flex items-center gap-3.5 text-[16px] sm:text-[18px] text-white/90 font-normal"
                    >
                      <AppIcon icon="lucide:check" size={20} className="text-[#00F2FF] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </ScrollReveal>

          {/* ─────────────────────────────────────────────────────────
              3. Bottom Center CTA Button
          ───────────────────────────────────────────────────────── */}
          <ScrollReveal className="w-full flex justify-center items-center pt-4">
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
                {t('aboutPage.ctaStart', 'İndi başla')}
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
