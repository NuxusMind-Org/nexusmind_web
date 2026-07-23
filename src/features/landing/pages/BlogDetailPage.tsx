import { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Share2, Bookmark, Calendar, Clock, ChevronRight, Mic, ChevronLeft, Eye, Settings, Brain, Flower2 } from 'lucide-react';
import { PATHS } from '@/routes/paths';
import { LandingNavbar } from '../components/LandingNavbar';
import { Footer } from '../components/Footer';
import vrConsultationImg from '@/assets/vr_consultation.png';
import digitalBrainImg from '@/assets/digital_brain.png';
import mountainSunsetImg from '@/assets/mountain_sunset_clouds.png';

export const BlogDetailPage = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const cardWidth = 385 + 30;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white" style={{ background: "linear-gradient(180deg, #263151 5%, #245D68 45%, #914899 95%)" }}>
      <LandingNavbar activePage="blog" />

      {/* Page Main Content */}
      <div className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[40px] sm:pt-[60px] pb-[80px] flex flex-col items-center gap-8">

        {/* Left-Aligned Header Section & Breadcrumbs */}
        <div className="w-full max-w-[1295px] text-left flex flex-col gap-3">
          <h1 className="text-[36px] sm:text-[48px] font-bold text-white tracking-tight leading-tight">
            Bloqlar
          </h1>

          {/* Breadcrumbs Trace */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70 font-medium select-none overflow-x-auto no-scrollbar whitespace-nowrap">
            <Link to={PATHS.HOME} className="hover:text-white transition-colors">
              Ana səhifə
            </Link>
            <ChevronRight size={14} className="text-white/40" />
            <Link to={PATHS.BLOG} className="hover:text-white transition-colors">
              Bloqlar
            </Link>
            <ChevronRight size={14} className="text-white/40" />
            <span className="text-[#a072ff] font-bold">Vr simulyasiya və psixologiya</span>
          </div>
        </div>

        {/* First Component: Hero Banner Card (width: 1295, height: 614, border-radius: 24px) */}
        <div className="w-full max-w-[1295px] h-[380px] sm:h-[480px] lg:h-[614px] rounded-[24px] overflow-hidden relative flex flex-col justify-end p-6 sm:p-10 lg:p-12 shadow-2xl shrink-0 group opacity-100 border border-white/10">
          {/* Cover Image */}
          <img
            src={vrConsultationImg}
            alt="VR Terapiyasının Gələcəyi"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

          {/* Top Right Action Buttons */}
          <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg border border-white/20 select-none">
              <Share2 size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg border border-white/20 select-none">
              <Bookmark size={18} />
            </button>
          </div>

          {/* Bottom Details Container */}
          <div className="relative z-20 text-left flex flex-col gap-4 max-w-[1000px]">

            {/* Meta Details Row */}
            <div className="flex flex-wrap items-center gap-4 text-white/95 text-xs font-semibold">
              <span className="bg-[#3c2549]/80 backdrop-blur-md border border-white/20 text-white text-[10.5px] tracking-wider px-3.5 py-1.5 rounded-full uppercase font-bold select-none">
                BLOQ
              </span>
              <span className="flex items-center gap-1.5 text-white/80 select-none">
                <Calendar size={14} className="text-white/60" />
                24 Mart 2026
              </span>
              <span className="flex items-center gap-1.5 text-white/80 select-none">
                <Clock size={14} className="text-white/60" />
                4 dəq oxu
              </span>
              <span className="flex items-center gap-1.5 text-white/80 select-none">
                <Eye size={14} className="text-white/60" />
                93 baxış
              </span>
            </div>

            {/* Glass Box Overlay Title */}
            <div>
              <h2 className="text-[20px] sm:text-[30px] lg:text-[36px] font-bold leading-tight text-white bg-white/10 backdrop-blur-md px-5 sm:px-8 py-3.5 rounded-[12px] border border-white/20 inline-block shadow-lg">
                VR Terapiyasının Gələcəyi: Virtual Dünyalarda Sağalma
              </h2>
            </div>

          </div>
        </div>

        {/* Content Section: Article Body & Right Sidebar Stack */}
        <div className="w-full max-w-[1295px] flex flex-col lg:flex-row gap-10 mt-6 items-start justify-between">

          {/* Left Column: Main Article Content (68%) */}
          <div className="w-full lg:w-[68%] flex flex-col gap-6 text-left text-white/90 leading-relaxed font-light text-[15px] sm:text-[16px]">

            {/* Intro paragraph */}
            <p className="text-base sm:text-[17px] font-normal text-white leading-relaxed">
              Psixoterapiya klassik &apos;şüuraltı söhbətlər&apos; üzərində qurulub. Lakin bu gün Virtual Reallıq (VR) texnologiyası bu sahədə tamamilə yeni bir səhifə açır. Bəs VR terapiyası klassik üsullardan nə ilə fərqlənir və o, insan beyninə necə təsir edir?
            </p>

            {/* Section 1: Exposure Therapy */}
            <div className="mt-2 flex flex-col gap-3">
              <h3 className="text-white text-[22px] sm:text-[28px] font-bold tracking-tight">
                Ekspozisiya Terapiyasının Rəqəmsal Təkamülü
              </h3>
              <p className="text-white/80 leading-relaxed text-[15px] sm:text-[16px]">
                Travma və Posttravmatik Stress Pozuntusunun (PTSP) müalicəsində ən effektiv metodlardan biri &apos;ekspozisiya&apos; (üzləşmə) terapiyasıdır. Pasient onu travmaya salan xatirəni zehnində yenidən canlandırmalı və onunla üzləşməlidir. Lakin bunu sadəcə təsəvvür etmək hər kəs üçün asan olmur; beyin bəzən özünü qorumaq üçün o xatirələri bloklayır. VR məhz burada dövrəyə girir. Təhlükəsiz və tam nəzarət olunan bir klinika mühitində pasient xüsusi VR eynəkləri vasitəsilə qorxu və ya travma yaratmış mühitə vizual olaraq daxil edilir.
              </p>
            </div>

            {/* Mount Fuji Landscape Card with Overlay Glass Box & Purple Button */}
            <div className="w-full h-[280px] sm:h-[360px] rounded-[18px] overflow-hidden relative shadow-xl my-4 shrink-0 flex flex-col justify-end p-6 border border-white/10">
              <img
                src={mountainSunsetImg}
                alt="VR Konsultasiya Komfort Zonası"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Floating Glass Box Overlay (Top Right) */}
              <div className="absolute top-4 right-4 z-20 max-w-[280px] sm:max-w-[340px] bg-[#d5a089]/60 backdrop-blur-md border border-white/20 rounded-[12px] p-4 text-left text-white shadow-lg">
                <span className="text-[12px] font-bold tracking-wider text-white uppercase block mb-1.5">
                  VR KONSULTASİYA
                </span>
                <p className="text-[11.5px] sm:text-xs leading-relaxed text-white/95 font-light">
                  Burada evdən çölə çıxmadan istədiyin komfort zonanı seçə və orada zaman keçirərək sakitləşə bilərsən.
                </p>
              </div>

              {/* Action Purple Button (Bottom Left) */}
              <div className="relative z-20 self-start">
                <button className="bg-[#482476] hover:bg-[#3b1d62] text-white text-xs sm:text-sm font-semibold px-8 py-3 rounded-[12px] transition-colors shadow-lg cursor-pointer border-0 select-none">
                  İndi yoxla
                </button>
              </div>
            </div>

            {/* Section 2: Neuroplasticity Heading */}
            <div className="flex flex-col gap-3 mt-2">
              <h3 className="text-white text-[22px] sm:text-[28px] font-bold tracking-tight">
                Neyroplastiklik və Yeni Neyron Əlaqələri
              </h3>
              <p className="text-white/80 leading-relaxed text-[15px] sm:text-[16px]">
                VR terapiyası sadəcə bir vizual simulyasiya deyil. O, beynin neyroplastiklik (özünü yenidən proqramlaşdırma) qabiliyyətindən istifadə edir. Təhlükəsiz virtual mühitdə qorxulu ssenarilərlə dəfələrlə qarşılaşan və bu zaman heç bir real zərər görməyən beyin, köhnə &apos;təhlükə&apos; siqnallarını silir və yerinə yeni, neytral neyron əlaqələri qurur. İnsan artıq o xatirəni xatırlayanda bədəni kəskin panik reaksiya vermir.
              </p>
            </div>

          </div>

          {/* Right Column: Sidebar Panels (32%) — Order matching Image 1: Dəstək lazımdır? -> Sanctuary Podkast -> Populyar Mövzular */}
          <div className="w-full lg:w-[32%] flex flex-col gap-6 shrink-0">

            {/* Widget 1 (Top): Need Support Card (Dəstək lazımdır?) */}
            <div className="bg-[#C3CBD6]/95 backdrop-blur-md rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-xl border border-white/20 relative overflow-hidden">
              <div className="flex items-center justify-between w-full">
                <h4 className="text-[#1E0A42] text-[20px] font-bold tracking-tight">
                  Dəstək lazımdır?
                </h4>
                <Flower2 className="w-6 h-6 text-[#9a76be] shrink-0" />
              </div>
              <p className="text-[#1E0A42]/75 text-[14px] leading-relaxed font-normal">
                Mütəxəssislərimiz sizə kömək etməyə hazırdır.
              </p>
              <button
                onClick={() => navigate(`${PATHS.HOME}#experts`)}
                className="w-full py-3 bg-[#482476] hover:bg-[#3b1d62] text-white rounded-[12px] text-sm font-bold transition-colors cursor-pointer text-center select-none shadow-md border-0"
              >
                Məsləhət Alın
              </button>
            </div>

            {/* Widget 2 (Middle): Sanctuary Podcast Player Card */}
            <div className="bg-[#121b3d]/90 backdrop-blur-md border border-white/10 rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2a3866] flex items-center justify-center shrink-0">
                  <Mic size={18} className="text-[#8b9eff]" />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-white text-base font-bold leading-tight">
                    Sanctuary Podkast
                  </h5>
                  <span className="text-white/50 text-[12px] font-light">
                    Həftəlik buraxılış
                  </span>
                </div>
              </div>
              <p className="text-white/75 text-[13px] leading-relaxed font-light italic">
                &ldquo;Rəqəmsal Dünyada İnsan Olmaq&rdquo; - Bu həftəlik qonağımız Dr. Leyla Əliyeva ilə maraqlı söhbəti dinləyin.
              </p>
              <button className="w-full h-[44px] border border-white/30 hover:bg-white/10 text-white font-medium text-[14px] rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all select-none">
                <span>▶</span> İndi Dinlə
              </button>
            </div>

            {/* Widget 3 (Bottom): Popular Topics Tag Box */}
            <div className="bg-[#C3CBD6]/95 backdrop-blur-md rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-xl border border-white/20">
              <h4 className="text-[#1E0A42] text-[18px] font-bold border-b border-black/15 pb-2">
                Populyar Mövzular
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  '#BeyinElmi',
                  '#VRMetaverse',
                  '#Terapevtikİnnovasiya',
                  '#RəqəmsalDetoks',
                  '#GələcəkPsixologiyası',
                ].map((topic, idx) => (
                  <span
                    key={idx}
                    className="bg-[#242d48] text-white/90 text-[12.5px] font-medium px-3.5 py-1.5 rounded-lg border border-white/10 hover:bg-[#343e60] cursor-pointer transition-colors select-none"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Lower Layout Section matching Image 2: Stacked Cards on Left, Blockquote & Phobias text on Right */}
        <div className="w-full max-w-[1295px] flex flex-col md:flex-row gap-8 items-start mt-4">

          {/* Left Part: 2 small vertical dark purple cards stacked */}
          <div className="w-full md:w-[280px] lg:w-[300px] flex flex-col gap-4 shrink-0">

            {/* Small Card 1 */}
            <div className="bg-[#1b153b] rounded-[18px] p-6 text-white text-left flex flex-col gap-3 border border-white/10 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
                  <Settings size={18} />
                </div>
                <h5 className="text-[16px] font-bold font-['Lexend'] tracking-tight">
                  Tam Nəzarət
                </h5>
              </div>
              <p className="text-white/75 text-[12px] leading-relaxed font-light font-['Lexend']">
                Terapevt virtual mühitdəki hər bir detalı — səsləri, vizual effektləri, günün saatını və hadisələrin intensivliyini pasientin dözümlülük səviyyəsinə uyğun tənzimləyir.
              </p>
            </div>

            {/* Small Card 2 */}
            <div className="bg-[#1b153b] rounded-[18px] p-6 text-white text-left flex flex-col gap-3 border border-white/10 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
                  <Brain size={18} />
                </div>
                <h5 className="text-[16px] font-bold font-['Lexend'] tracking-tight">
                  Tam Nəzarət
                </h5>
              </div>
              <p className="text-white/75 text-[12px] leading-relaxed font-light font-['Lexend']">
                Virtual dünya süni olsa da, insan beyni oradakı təhlükəsizlik hissini real qəbul edir və travmatik xatirəyə qarşı dözümlülük (desensitizasiya) qazanır.
              </p>
            </div>

          </div>

          {/* Right Part: Quota Box (Blockquote) & Phobias section */}
          <div className="flex-grow flex flex-col gap-6 text-left">

            {/* Quota Box (Blockquote) with floating purple quote badge matching Image 2 */}
            <div className="relative bg-[#152744]/80 border-l-4 border-l-[#7b46e5] rounded-[18px] p-6 sm:p-8 pl-10 flex flex-col justify-center border border-white/10 backdrop-blur-md">
              <div className="absolute -left-4 top-4 w-9 h-9 rounded-lg bg-[#271c4c] border border-white/20 flex items-center justify-center shadow-lg text-white font-serif text-[22px] font-bold select-none">
                &rdquo;
              </div>
              <blockquote className="text-white text-[16px] sm:text-[19px] font-light italic leading-relaxed text-left font-['Lexend']">
                &ldquo;Virtual dünyalar rəqəmsal qaçış vasitəsi olmaqdan çıxıb, real dünyanın yaralarını sağaldan ən güclü tibbi alətlərdən birinə çevrilir.&rdquo;
              </blockquote>
            </div>

            {/* Phobias Section */}
            <div className="flex flex-col gap-3 mt-2 text-white/90">
              <h3 className="text-white text-[24px] sm:text-[28px] font-bold tracking-tight">
                Fobiyaların İdarə Edilməsi və Psixoloji Rifah
              </h3>
              <p className="text-white/80 leading-relaxed text-[15px] sm:text-[16px] font-light">
                VR təkcə ağır travmaların deyil, gündəlik həyatı məhdudlaşdıran fobiyaların müalicəsində də inqilab edir. Yüksəklik qorxusu (akrofobiya), uçuş qorxusu (aerofobiya) və ya kütlə qarşısında çıxış etmək həyəcanı virtual auditoriyalar və simulyasiyalar vasitəsilə addım-addım aradan qaldırılır.
              </p>
              <p className="text-white/80 leading-relaxed text-[15px] sm:text-[16px] font-light">
                Gələcəkdə süni intellekt və VR-ın sinerjisi sayəsində, tamamilə fərdiləşdirilmiş, pasientin real zamandakı ürək döyüntüsünə və emosional reaksiyalarına uyğun olaraq dəyişən rəqəmsal terapiya otaqları yaradılacaq. virtual dünyalar rəqəmsal qaçış vasitəsi olmaqdan çıxıb, real dünyanın yaralarını sağaldan ən güclü tibbi alətlərdən birinə çevrilir.
              </p>
            </div>

            {/* Back button */}
            <button
              onClick={() => navigate(PATHS.BLOG)}
              className="mr-auto mt-4 text-[#00f2ff] hover:underline font-semibold text-sm flex items-center gap-2 cursor-pointer select-none"
            >
              <span>← Bloqlara qayıt</span>
            </button>

          </div>

        </div>

        {/* Related Blogs Carousel Slider */}
        <div className="w-full max-w-[1295px] mt-12 border-t border-white/10 pt-10 text-left select-none relative group/slider">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white text-[24px] sm:text-[28px] font-bold tracking-tight">
              Oxşar Bloqlar
            </h3>
            <Link
              to={PATHS.BLOG}
              className="text-white/60 hover:underline text-sm font-semibold flex items-center gap-1 group select-none"
            >
              <span>Hamısını gör</span>
              <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="w-full relative flex items-center">
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-[-20px] z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer transition-all opacity-0 group-hover/slider:opacity-100 select-none"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => handleScroll('right')}
              className="absolute right-[-20px] z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer transition-all opacity-0 group-hover/slider:opacity-100 select-none"
            >
              <ChevronRight size={20} />
            </button>

            <div
              ref={scrollRef}
              className="w-full flex flex-row overflow-x-auto gap-6 no-scrollbar scroll-smooth snap-x snap-mandatory py-2"
            >
              {[
                {
                  id: 1,
                  image: digitalBrainImg,
                  badge: 'Psixologiya',
                  date: '12 Okt, 2024',
                  title: 'İmmersiyanın Elmi: Niyə VR Beyni İnanır?',
                  description: 'Virtual mühitin sinir sistemimizə təsiri və beynin rəqəmsal stimullara qarşı verdiyi reaksiyaların dərin analizi.',
                },
                {
                  id: 2,
                  image: digitalBrainImg,
                  badge: 'Psixologiya',
                  date: '12 Okt, 2024',
                  title: 'İmmersiyanın Elmi: Niyə VR Beyni İnanır?',
                  description: 'Virtual mühitin sinir sistemimizə təsiri və beynin rəqəmsal stimullara qarşı verdiyi reaksiyaların dərin analizi.',
                },
                {
                  id: 3,
                  image: digitalBrainImg,
                  badge: 'Psixologiya',
                  date: '12 Okt, 2024',
                  title: 'İmmersiyanın Elmi: Niyə VR Beyni İnanır?',
                  description: 'Virtual mühitin sinir sistemimizə təsiri və beynin rəqəmsal stimullara qarşı verdiyi reaksiyaların dərin analizi.',
                },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(PATHS.BLOG_DETAIL.replace(':id', String(item.id)))}
                  className="bg-[#182a3c]/80 backdrop-blur-md rounded-[18px] overflow-hidden border border-white/10 flex flex-col hover:border-white/30 transition-all duration-300 w-full sm:w-[380px] shrink-0 snap-start cursor-pointer group"
                >
                  <div className="w-full aspect-[16/10] relative overflow-hidden bg-[#101c29]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#111c2e]/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium px-3 py-1 rounded-full uppercase">
                      {item.badge}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1 gap-3 text-left">
                    <div className="flex flex-col gap-2">
                      <h4 className="text-white font-bold text-[17px] leading-snug group-hover:text-[#00f2ff] transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-white/70 text-[13px] leading-relaxed line-clamp-3 font-light">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-white/60 text-[12px] pt-3 border-t border-white/10 font-light">
                      <span>{item.date}</span>
                      <span className="text-white/80 font-medium group-hover:text-white flex items-center gap-1 transition-colors">
                        Daha çox oxu <span>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};
