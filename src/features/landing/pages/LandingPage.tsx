import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, BookOpen, Users, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { PATHS } from '@/routes/paths';
import nexie from '@/assets/svg/Nexie.svg';
import nexieCloud from '@/assets/svg/NexieCloud.svg';
import nexieSittingClassic from '@/assets/svg/NexieSittingClassic.svg';
import nexieSittingPurple from '@/assets/svg/NexieSittingPurple.svg';
import hi0101 from '@/assets/hi0101.png';
import hi0102 from '@/assets/hi0102.png';
import hi0103 from '@/assets/hi0103.png';
import purpleRoom from '@/assets/purple_room.png';
import avatar1 from '@/assets/avatar1.png';
import avatar2 from '@/assets/avatar2.png';
import avatar3 from '@/assets/avatar3.png';
import pillarsImage from '@/assets/pillars_image.png';
import vrConsultation from '@/assets/vr_consultation.png';
import { Footer } from '../components/Footer';
import { LandingNavbar } from '../components/LandingNavbar';
import { psychologists } from '@/data/psychologists';
import { ScrollReveal } from '../components/ScrollReveal';
import { useEffect } from 'react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(1);

  const [isMascotInView, setIsMascotInView] = useState<boolean>(false);
  // arrowsVisible is set synchronously at zone-crossing time so arrows appear
  // while Nexie is fading out, not after she arrives.
  const [arrowsVisible, setArrowsVisible] = useState<{ a1: boolean; a2: boolean }>({ a1: false, a2: false });
  const arrowsVisibleRef = useRef<{ a1: boolean; a2: boolean }>({ a1: false, a2: false });

  const [arrow1Path, setArrow1Path] = useState<string>('');
  const [arrow1Chevron, setArrow1Chevron] = useState<string>('');
  const [arrow2Path, setArrow2Path] = useState<string>('');
  const [arrow2Chevron, setArrow2Chevron] = useState<string>('');

  const [activeCardIndex, setActiveCardIndex] = useState<1 | 2 | 3>(1);
  const activeCardIndexRef = useRef<1 | 2 | 3>(1);
  const [isTeleporting, setIsTeleporting] = useState<boolean>(false);

  const mainRef = useRef<HTMLElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMascotPosition = () => {
      const container = roadmapRef.current;
      const card1 = card1Ref.current;
      const card2 = card2Ref.current;
      const card3 = card3Ref.current;

      if (!container || !card1 || !card2 || !card3) return;

      // Calculate path curves dynamically for SVG Overlay
      // Fall back to layout detection if window sizing reporting is scaled/simulated
      const isMobile = window.innerWidth < 768 || Math.abs(card1.offsetLeft - card2.offsetLeft) < 100;

      if (isMobile) {
        // Mobile layout: centered cards stacked vertically
        const start1x = card1.offsetLeft + (card1.offsetWidth / 2);
        const start1y = card1.offsetTop + card1.offsetHeight + 18;
        const end1x = card2.offsetLeft + (card2.offsetWidth / 2);
        const end1y = card2.offsetTop - 25;
        
        // Beautiful centered S-curve floating in the middle of the gap
        setArrow1Path(`M ${start1x},${start1y} C ${start1x + 30},${start1y + 15} ${end1x - 30},${end1y - 15} ${end1x},${end1y}`);
        setArrow1Chevron(`M ${end1x - 8},${end1y - 10} L ${end1x},${end1y} L ${end1x + 8},${end1y - 10}`);

        const start2x = card2.offsetLeft + (card2.offsetWidth / 2);
        const start2y = card2.offsetTop + card2.offsetHeight + 18;
        const end2x = card3.offsetLeft + (card3.offsetWidth / 2);
        const end2y = card3.offsetTop - 25;
        
        // Beautiful centered alternating S-curve floating in the middle of the gap
        setArrow2Path(`M ${start2x},${start2y} C ${start2x - 30},${start2y + 15} ${end2x + 30},${end2y - 15} ${end2x},${end2y}`);
        setArrow2Chevron(`M ${end2x - 8},${end2y - 10} L ${end2x},${end2y} L ${end2x + 8},${end2y - 10}`);
      } else {
        // Desktop layout
        const p1x = card1.offsetLeft + card1.offsetWidth;
        const p1y = card1.offsetTop + 170;
        const p2x = card2.offsetLeft + 150;
        const p2y = card2.offsetTop;
        setArrow1Path(`M ${p1x},${p1y} C ${p1x + 60},${p1y} ${p2x},${p2y - 60} ${p2x},${p2y}`);
        setArrow1Chevron(`M ${p2x - 8},${p2y - 10} L ${p2x},${p2y} L ${p2x + 8},${p2y - 10}`);

        const p3x = card2.offsetLeft;
        const p3y = card2.offsetTop + 170;
        const p4x = card3.offsetLeft + card3.offsetWidth - 150;
        const p4y = card3.offsetTop;
        setArrow2Path(`M ${p3x},${p3y} C ${p3x - 60},${p3y} ${p4x},${p4y - 60} ${p4x},${p4y}`);
        setArrow2Chevron(`M ${p4x - 8},${p4y - 10} L ${p4x},${p4y} L ${p4x + 8},${p4y - 10}`);
      }

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Start: top of roadmap container reaches 70% of viewport
      // End: bottom of roadmap container reaches 35% of viewport
      const startScroll = viewportHeight * 0.7;
      const endScroll = -rect.height + viewportHeight * 0.35;
      const currentScroll = rect.top;

      // Calculate scroll progress between 0 and 1
      const range = startScroll - endScroll;
      const progress = Math.max(0, Math.min(1, (startScroll - currentScroll) / range));

      // Set visibility of arrows faster (thresholds: 15% and 45%) to react early to scroll
      const showA1 = progress > 0.15;
      const showA2 = progress > 0.45;

      if (showA1 !== arrowsVisibleRef.current.a1 || showA2 !== arrowsVisibleRef.current.a2) {
        arrowsVisibleRef.current = { a1: showA1, a2: showA2 };
        setArrowsVisible({ a1: showA1, a2: showA2 });
      }

      // Get target card index based on scroll progress (3 equal zones)
      let targetCardIndex: 1 | 2 | 3 = 1;
      if (progress < 0.33) {
        targetCardIndex = 1;
      } else if (progress >= 0.33 && progress < 0.66) {
        targetCardIndex = 2;
      } else {
        targetCardIndex = 3;
      }

      // Check if we need to teleport (cross zones)
      if (targetCardIndex !== activeCardIndexRef.current) {
        activeCardIndexRef.current = targetCardIndex;

        // Fade Nexie out
        setIsTeleporting(true);

        // Swap position while the wrapper is fully invisible (120ms).
        setTimeout(() => {
          setActiveCardIndex(targetCardIndex);
          setIsTeleporting(false);
        }, 120);
      }

      // Hide mascot if scroll is not in range
      const inView = rect.top < viewportHeight && rect.bottom > 0;
      setIsMascotInView(inView);
    };

    window.addEventListener('scroll', updateMascotPosition);
    window.addEventListener('resize', updateMascotPosition);

    // Initial call to set positions once rendered
    setTimeout(updateMascotPosition, 100);

    return () => {
      window.removeEventListener('scroll', updateMascotPosition);
      window.removeEventListener('resize', updateMascotPosition);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  useEffect(() => {
    const sections = [
      { id: 'hero', index: 0 },
      { id: 'features', index: 1 },
      { id: 'pillars', index: 2 },
      { id: 'testimonials', index: 3 },
      { id: 'roadmap', index: 4 },
      { id: 'vr', index: 7 },
      { id: 'cta', index: 8 },
      { id: 'experts', index: 9 }
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matched = sections.find(s => s.id === entry.target.id);
            if (matched !== undefined) {
              setActiveSection(matched.index);
            }
          }
        });
      },
      {
        root: null, // Use browser viewport now that we scroll at the window level
        threshold: 0.2, // Trigger when 20% of section is visible
        rootMargin: '-5% 0px -5% 0px'
      }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      scrollToSection(id);
    }
  }, []);



  // mascotSrc and mascotFilter are derived directly from activeCardIndex.
  // The wrapper is at opacity:0 during the 120ms teleport window, so React
  // swaps the src while it's invisible — no cross-fade, no bleed, no flash.
  const mascotSrc = activeCardIndex === 2 ? nexieSittingPurple : nexieSittingClassic;
  const mascotFilter = activeCardIndex === 2
    ? 'drop-shadow(0 15px 30px rgba(123, 75, 139, 0.5))'
    : 'drop-shadow(0 15px 30px rgba(0, 242, 255, 0.3))';

  // Coordinates are derived at render-time from live refs so they never go stale.
  let mascotX = 0;
  let mascotY = 0;
  if (card1Ref.current && card2Ref.current && card3Ref.current) {
    if (activeCardIndex === 1) {
      mascotX = card1Ref.current.offsetLeft + 32;
      mascotY = card1Ref.current.offsetTop - 105;
    } else if (activeCardIndex === 2) {
      mascotX = card2Ref.current.offsetLeft + card2Ref.current.offsetWidth - 182;
      mascotY = card2Ref.current.offsetTop - 105;
    } else {
      mascotX = card3Ref.current.offsetLeft + 32;
      mascotY = card3Ref.current.offsetTop - 105;
    }
  }

  const mascotOpacity = isMascotInView && !isTeleporting ? 1 : 0;

  return (
    <div className="w-full min-h-screen flex flex-col relative font-sans text-white">
      {/* Dynamic Background Layers */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Layer 1: Landing - Hero & Features */}
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            background: 'linear-gradient(260.37deg, #263151 -4.41%, #245D68 51.97%, #914899 100%)',
            opacity: activeSection <= 1 ? 1 : 0
          }}
        />
        {/* Layer 2: Landing - Pillars, Testimonials & Roadmap */}
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            background: 'linear-gradient(180deg, #263151 5%, #245D68 45%, #914899 95%)',
            opacity: activeSection >= 2 && activeSection <= 4 ? 1 : 0
          }}
        />
        {/* Layer 3: Landing - VR, CTA & Experts */}
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            background: 'linear-gradient(45deg, #263151 0%, #245D68 60%, #914899 100%)',
            opacity: activeSection >= 7 ? 1 : 0
          }}
        />
      </div>

      <style>
        {`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          /* Hide scrollbar for IE, Edge and Firefox */
          .no-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
          
          ::-webkit-scrollbar {
            display: none;
          }
          * {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
      {/* Background ambient light */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#b070ff] rounded-full blur-[150px] opacity-20 pointer-events-none z-10" />

      <LandingNavbar
        activePage="landing"
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      {/* Main Content Area - Stacked Sections */}
      <main ref={mainRef} className="flex-1 w-full relative">

        {/* LANDING PAGE CONTENT */}
        <div className="w-full relative flex flex-col">
          {/* ================= SECTION 0: HERO ================= */}
          <section
            id="hero"
            className="relative w-full min-h-fit flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[60px] sm:pt-[80px] pb-[80px] sm:pb-[100px] scroll-mt-20"
          >
            <ScrollReveal className="w-full mx-auto flex flex-col items-center relative">
              <div className="relative w-full max-w-[1056px] h-auto min-h-[417px] md:h-[417px] bg-white/10 backdrop-blur-xl border border-white/10 rounded-[8px] pt-[24px] pb-[24px] pr-[16px] pl-[16px] sm:pr-[21px] sm:pl-[21px] gap-[8px] flex flex-col justify-between items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.3)]">

                {/* Mascot overlapping left border - Taller & Larger (Desktop) */}
                <div className="absolute -left-[145px] bottom-[-25px] hidden md:flex flex-col items-center pointer-events-none z-20">
                  <img src={nexieCloud} alt="Speech Bubble" className="w-[180px] object-contain mb-[-15px] ml-[-40px] drop-shadow-xl" />
                  <img src={nexie} alt="Nexie Mascot" className="w-[285px] object-contain drop-shadow-[0_0_35px_rgba(0,242,255,0.4)]" />
                </div>

                {/* Mascot sitting at bottom left of glass card - Compact & Tailed (Mobile) */}
                <div className="absolute -left-[35px] -bottom-[15px] flex md:hidden flex-col items-center pointer-events-none z-20">
                  <img src={nexie} alt="Nexie Mascot" className="w-[135px] sm:w-[165px] object-contain drop-shadow-[0_0_20px_rgba(0,242,255,0.4)]" />
                </div>

                {/* Content vertical centering inside glass card */}
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
                    className="w-full max-w-[280px] bg-[#591b98] hover:bg-[#6c22b5] text-white py-3.5 rounded-full text-[16px] sm:text-[18px] font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(89,27,152,0.4)] hover:shadow-[0_0_30px_rgba(89,27,152,0.6)] hover:scale-[1.02] cursor-pointer"
                  >
                    İndi başla
                  </button>
                </div>

                <p className="text-white/50 text-[11px] sm:text-[12px] pb-2 px-12 sm:px-0 relative z-30">
                  Davam etməklə, siz bizim <a href="#" className="text-white/70 hover:text-white transition-colors cursor-pointer pointer-events-auto">Xidmət Şərtləri</a> və <a href="#" className="text-white/70 hover:text-white transition-colors cursor-pointer pointer-events-auto">Məxfilik Siyasəti</a> ilə razılaşırsınız.
                </p>
              </div>

              {/* Bottom Cards aligned centered with exact Figma dimensions */}
              <div className="w-full mt-[64px] flex flex-wrap justify-evenly gap-6 px-4 sm:px-6 xl:px-[58px]">
                <div className="flex items-center gap-[10px] w-full max-w-[326px] h-[80px] bg-white/10 backdrop-blur-md border border-white/20 pt-[13px] pr-[22px] pl-[21px] rounded-[8px] hover:bg-white/15 transition-colors rotate-0 opacity-100">
                  <div className="w-[46px] h-[46px] rounded-full overflow-hidden flex-shrink-0 bg-[#591b98]/30">
                    <img src={hi0101} alt="Feature 1" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-white text-[13px] leading-snug font-medium text-left">
                    Mütəxəssislər köməyilə çətinliklərdən azad ol!
                  </p>
                </div>

                <div className="flex items-center gap-[10px] w-full max-w-[326px] h-[80px] bg-white/10 backdrop-blur-md border border-white/20 pt-[13px] pr-[22px] pl-[21px] rounded-[8px] hover:bg-white/15 transition-colors rotate-0 opacity-100">
                  <div className="w-[46px] h-[46px] rounded-full overflow-hidden flex-shrink-0 bg-[#591b98]/30">
                    <img src={hi0102} alt="Feature 2" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-white text-[13px] leading-snug font-medium text-left">
                    Vr konsultasiya ilə evdən çıxmağa belə ehtiyac yoxdur!
                  </p>
                </div>

                <div className="flex items-center gap-[10px] w-full max-w-[326px] h-[80px] bg-white/10 backdrop-blur-md border border-white/20 pt-[13px] pr-[22px] pl-[21px] rounded-[8px] hover:bg-white/15 transition-colors rotate-0 opacity-100">
                  <div className="w-[46px] h-[46px] rounded-full overflow-hidden flex-shrink-0 bg-[#591b98]/30">
                    <img src={hi0103} alt="Feature 3" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-white text-[13px] leading-snug font-medium text-left">
                    Günlük notlar qeyd edərək səndə öz inkişafını gör!
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* ================= SECTION 1: FEATURE GRID ================= */}
          <section
            id="features"
            className="relative w-full min-h-0 md:min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-[72px] py-10 md:py-20 scroll-mt-20"
          >
            <ScrollReveal className="w-full mx-auto flex flex-col items-center">
              {/* Header */}
              <div className="text-center mb-10">
                <h2 className="text-[30px] sm:text-[44px] font-bold text-white mb-4 tracking-tight leading-snug">
                  Daxili tarazlığı tap, özünü daha yaxşı anla.
                </h2>
                <p className="text-[16px] sm:text-[20px] text-white/80 font-medium">
                  Psixoloji dəstək və özünüinkişaf üçün təhlükəsiz bir məkan
                </p>
              </div>

              {/* Grid layout matching the image */}
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Top Left Card (spans 2 cols) */}
                <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[8px] p-6 sm:p-8 pb-[17px] flex flex-col overflow-hidden relative shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart size={24} className="text-[#00f2ff]" strokeWidth={2} />
                    <h3 className="text-white text-[22px] sm:text-[26px] font-medium tracking-wide">Sənin hisslərin önəmlidir.</h3>
                  </div>
                  <p className="text-white/80 text-[14px] sm:text-[15px] leading-relaxed max-w-[450px] mb-8">
                    Bu platforma düşüncələrini anlamaq, emosiyalarını idarə etmək və gündəlik streslə daha sağlam şəkildə başa çıxmaq üçün hazırlanıb.
                    Sən burada tək deyilsən.Sevdiyin bir məkan seç və terapiyaya başla.
                  </p>
                  <div className="w-full h-[180px] sm:h-[220px] rounded-[8px] overflow-hidden mt-auto">
                    <img src={purpleRoom} alt="Room" className="w-full h-full object-cover object-center border border-white/10 opacity-90" />
                  </div>
                </div>

                {/* Top Right Card */}
                <div className="bg-[#2A7B9B] border border-white/10 rounded-[8px] p-6 sm:p-8 flex flex-col relative shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles size={24} className="text-white" strokeWidth={2} />
                    <h3 className="text-white text-[22px] sm:text-[24px] font-medium tracking-wide">Gündəlik Rituallar</h3>
                  </div>
                  <p className="text-white/90 text-[14px] sm:text-[15px] leading-relaxed flex-1">
                    Kiçik addımlarla psixoloji rifahını gücləndir.Nəfəs məşqləri,qısa meditasiya və gündəlik refleksiya ilə özünü daha balanslı hiss et.
                  </p>
                  <button className="text-white flex items-center gap-2 text-[14px] sm:text-[15px] hover:opacity-80 transition-opacity mt-8 font-medium cursor-pointer">
                    Bütün ritualları gör <ArrowRight size={18} />
                  </button>
                </div>

                {/* Bottom Left Card */}
                <div className="bg-[#276F8C] border border-white/10 rounded-[8px] p-6 sm:p-8 flex flex-col relative shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <BookOpen size={24} className="text-white" strokeWidth={2} />
                    <h3 className="text-white text-[22px] sm:text-[24px] font-medium tracking-wide">Gündəlik Notlar</h3>
                  </div>
                  <p className="text-white/90 text-[14px] sm:text-[15px] leading-relaxed">
                    Düşhncelerinizi yaz və özünü daha yaxşı tanı.Gündəlik hisslərini qeyd edərək emosional vəziyyətini izləyə , öz inkişafını görə bilərsən.
                  </p>
                </div>

                {/* Bottom Right Card (spans 2 cols) */}
                <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[8px] p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 relative shadow-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Users size={24} className="text-[#00f2ff]" strokeWidth={2} />
                      <h3 className="text-white text-[22px] sm:text-[24px] font-medium tracking-wide">Dəstək və paylaşım icması</h3>
                    </div>
                    <p className="text-white/80 text-[14px] sm:text-[15px] leading-relaxed max-w-[480px]">
                      Oxşar təcrübələr yaşayan insanlarla təhlükəsiz mühitdə fikirlərini paylaş, dəstək al və tək olmadığını hiss et.
                    </p>
                  </div>
                  <div className="flex -space-x-3 items-end pb-2">
                    <img src={avatar1} alt="Avatar" className="w-12 h-12 rounded-full border-[2.5px] border-[#3b4a6b] object-cover bg-slate-800" />
                    <img src={avatar2} alt="Avatar" className="w-12 h-12 rounded-full border-[2.5px] border-[#3b4a6b] object-cover bg-slate-800" />
                    <img src={avatar3} alt="Avatar" className="w-12 h-12 rounded-full border-[2.5px] border-[#3b4a6b] object-cover bg-slate-800" />
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </section>

          {/* ================= SECTION 2: ACCORDION PILLARS ================= */}
          <section
            id="pillars"
            className="relative w-full min-h-0 md:min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-[72px] py-10 md:py-20 scroll-mt-20"
          >
            <ScrollReveal className="w-full mx-auto flex flex-col lg:flex-row items-center lg:items-stretch gap-12 lg:gap-20">
              {/* Left Image (Pillars) */}
              <div className="w-full lg:w-[582px] h-[300px] sm:h-[400px] lg:h-[728px] flex-shrink-0 rounded-[24px] sm:rounded-[48px] overflow-hidden shadow-2xl relative">
                <img src={pillarsImage} alt="6 Pillars of Psychological Health" className="absolute inset-0 w-full h-full object-cover rotate-0 opacity-100" />
              </div>

              {/* Right Accordion */}
              <div className="w-full lg:w-[45%] xl:w-[50%] flex flex-col">
                <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-bold text-white mb-8 lg:mb-10 tracking-tight leading-tight">
                  Psixoloji sağlamlığının 6 əsas sütunu
                </h2>

                <div className="flex flex-col gap-4">
                  {[
                    { id: 1, title: '01. Emosional şüur', content: 'Duyğularını tanımaq, onları adlandırmaq və düzgün şəkildə ifadə etmə bacarığını inkişaf etdirir. Bu, daxili balansın əsasıdır.' },
                    { id: 2, title: '02. Bədən şüuru (Somatik fərqindəlik)', content: 'Bədənindəki hissləri və gərginlikləri kəşf edərək onları azad etməyə kömək edir.' },
                    { id: 3, title: '03. Koqnitiv yenidən çərçivələmə', content: 'Neqativ düşüncə qəliblərini qıraraq daha pozitiv və rasional düşünmə tərzi formalaşdırır.' },
                    { id: 4, title: '04. Münasibət sağlamlığı', content: 'Başqaları ilə sağlam sərhədlər qurmaq və empathik ünsiyyət yaratmaq.' },
                    { id: 5, title: '05. Həyatın mənası və məqsədi', content: 'Daxili motivasiyanı artırmaq və həyatda səni nəyin irəli apardığını kəşf etmək.' },
                    { id: 6, title: '06. Şəxsi sərhədlər və özünə hörmət', content: 'Öz ehtiyaclarını anlamaq və başqalarına "yox" deyə bilmək bacarığını inkişaf etdirmək.' },
                  ].map((item) => (
                    <div key={item.id} className={`flex flex-col rounded-[20px] overflow-hidden transition-all duration-300 ${openAccordion === item.id ? 'bg-[#F4F5F6]' : 'bg-transparent'}`}>
                      <button
                        onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                        className="w-full flex items-center justify-between text-left py-[18px] px-6 hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <span className={`text-[16px] sm:text-[17px] font-medium ${openAccordion === item.id ? 'text-[#1a2b3c]' : 'text-white'}`}>
                          {item.title}
                        </span>
                        {openAccordion === item.id ? (
                          <ChevronUp size={20} className="text-[#1a2b3c] shrink-0" />
                        ) : (
                          <ChevronDown size={20} className="text-white shrink-0" />
                        )}
                      </button>

                      <div
                        className={`transition-all duration-300 ease-in-out ${openAccordion === item.id ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        <div className="pb-5 px-6 -mt-1">
                          <p className="text-[#475467] text-[13px] sm:text-[14px] leading-relaxed">
                            {item.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </ScrollReveal>
          </section>

          {/* ================= SECTION 3: TESTIMONIALS ================= */}
          <section
            id="testimonials"
            className="relative w-full min-h-0 md:min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-[72px] py-10 md:py-20 scroll-mt-20"
          >
            <ScrollReveal className="w-full max-w-[1100px] mx-auto flex flex-col items-center">
              {/* Header */}
              <div className="text-center mb-14">
                <h2 className="text-[30px] sm:text-[44px] font-bold text-white mb-3 tracking-tight">
                  Real həyat hekayələri
                </h2>
                <p className="text-[15px] sm:text-[19px] text-white/80">
                  İstifadəçilərimizin təcrübələri (50,000+ istifadəçidən)
                </p>
              </div>

              {/* Testimonials Grid */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Card 1 */}
                <div className="bg-white rounded-[8px] p-6 sm:p-10 flex flex-col shadow-xl border border-transparent min-h-[300px]">
                  <p className="text-[#155a6d] text-[14px] sm:text-[16px] leading-relaxed mb-8 flex-1 font-medium">
                    Uzun müddət davam edən stress və narahatlıq gündəlik həyatımı çətinləşdirirdi. Kiçik hadisələr belə məni tez yorurdu və fokuslanmaqda çətinlik çəkirdim. Psixoloji dəstək aldıqdan sonra düşüncələrimi daha yaxşı idarə etməyi öyrəndim və zamanla daxili rahatlığım bərpa olundu. İndi özümü daha stabil və güvəndə hiss edirəm.
                  </p>
                  <div className="flex items-center gap-4">
                    <img src={avatar2} alt="Samirə.M" className="w-[50px] h-[50px] rounded-full object-cover shadow-md" />
                    <div className="flex flex-col">
                      <span className="text-[#1a2b3c] font-bold text-[15px]">Samirə.M</span>
                      <span className="text-[#667085] text-[13px]">Peşə : Tələbə</span>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-[8px] p-6 sm:p-10 flex flex-col shadow-xl border border-transparent min-h-[300px]">
                  <p className="text-[#155a6d] text-[14px] sm:text-[16px] leading-relaxed mb-8 flex-1 font-medium">
                    Ailə daxilində uzun müddət davam edən gərginlik və emosional laqeydlik mənə ciddi təsir etmişdi. Özümü tez-tez narahat, yorğun və insanlardan uzaq hiss edirdim. Psixoloq dəstəyi ilə bu vəziyyəti anlamağa başladım. Seanslarda hisslərimi ifadə etməyi, sərhədlər qoymağı və stressi idarə etmə texnikalarını öyrəndim. İndi özümü daha stabil hiss edirəm.
                  </p>
                  <div className="flex items-center gap-4">
                    <img src={avatar3} alt="Ramal.Ə" className="w-[50px] h-[50px] rounded-full object-cover shadow-md" />
                    <div className="flex flex-col">
                      <span className="text-[#1a2b3c] font-bold text-[15px]">Ramal.Ə</span>
                      <span className="text-[#667085] text-[13px]">Peşə : İqtisadçı</span>
                    </div>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </section>

          {/* ================= SECTION 4: ROADMAP (Steps 4, 5, 6) ================= */}
          <section
            id="roadmap"
            className="relative w-full min-h-0 md:min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-[72px] py-10 md:py-20 scroll-mt-20"
          >
            <div className="w-full max-w-[1100px] mx-auto flex flex-col">
              <ScrollReveal className="w-full flex flex-col">
                {/* Title */}
                <div className="text-center mb-10 md:mb-24">
                  <h2 className="text-[30px] sm:text-[44px] font-bold text-white mb-3 tracking-tight">
                    Necə istifadə edəcəksən:
                  </h2>
                  <p className="text-[15px] sm:text-[19px] text-white/80">
                    Sən də bizimlə həyatdan yenidən zövq almağı öyrən
                  </p>
                </div>
              </ScrollReveal>

              {/* Roadmap Boxes */}
              <div ref={roadmapRef} className="w-full max-w-[1100px] mx-auto relative flex flex-col gap-28 md:gap-[240px] pb-12 md:pb-[200px]">

                {/* DYNAMIC SVG CONNECTOR LINES */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                  {arrow1Path && (
                    <g style={{ opacity: arrowsVisible.a1 ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
                      <path d={arrow1Path} fill="none" stroke="#a072ff" strokeWidth="3" strokeDasharray="8 8" />
                      <path d={arrow1Chevron} fill="none" stroke="#a072ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  )}
                  {arrow2Path && (
                    <g style={{ opacity: arrowsVisible.a2 ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
                      <path d={arrow2Path} fill="none" stroke="#a072ff" strokeWidth="3" strokeDasharray="8 8" />
                      <path d={arrow2Chevron} fill="none" stroke="#a072ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  )}
                </svg>

                {/* DYNAMIC MASCOT ELEMENT — single img, src swaps while opacity:0 */}
                <div
                  className="absolute pointer-events-none z-30 hidden md:block"
                  style={{
                    left: 0,
                    top: 0,
                    width: '150px',
                    height: '150px',
                    transform: `translate3d(${mascotX}px, ${mascotY}px, 0)`,
                    opacity: mascotOpacity,
                    transition: 'opacity 0.15s ease-in-out'
                  }}
                >
                  <img
                    src={mascotSrc}
                    alt="Nexie Mascot"
                    className="absolute inset-0 w-full h-auto object-contain"
                    style={{ filter: mascotFilter }}
                  />
                </div>

                {/* Box 1 */}
                <ScrollReveal ref={card1Ref} className="w-full max-w-[581px] h-auto min-h-[345px] md:h-[345px] relative self-center md:self-auto mt-8 md:mt-0">
                  {/* Mobile Mascot (visible on mobile only) */}
                  <div className="md:hidden absolute -top-[55px] right-6 pointer-events-none z-20">
                    <img
                      src={nexieSittingClassic}
                      alt="Nexie Mascot"
                      className="w-[135px] sm:w-[165px] object-contain drop-shadow-[0_15px_30px_rgba(0,242,255,0.3)]"
                    />
                  </div>
                  <div className="w-full h-full bg-[#155567] rounded-[8px] p-6 sm:p-10 relative shadow-2xl flex flex-col justify-center">
                    <h3 className="text-white text-[22px] sm:text-[26px] font-bold mb-4 flex items-center gap-4">
                      <Sparkles size={28} className="text-white" /> Özünü tanı
                    </h3>
                    <p className="text-white/85 text-[14px] sm:text-[16px] leading-relaxed">
                      İlk mərhələdə istifadəçi qısa testlər və gündəlik qeydlərlə emosional vəziyyətini analiz edir. Sistem onun stress, narahatlıq və emosional vəziyyətini müəyyənləşdirərək fərdi tövsiyələr təqdim edir.
                    </p>
                  </div>
                </ScrollReveal>

                {/* Box 2 */}
                <ScrollReveal ref={card2Ref} className="w-full max-w-[581px] h-auto min-h-[345px] md:h-[345px] self-center md:self-end relative md:mt-0">
                  {/* Mobile Mascot (visible on mobile only) */}
                  <div className="md:hidden absolute -top-[55px] right-6 pointer-events-none z-20">
                    <img
                      src={nexieSittingPurple}
                      alt="Nexie Mascot"
                      className="w-[135px] sm:w-[165px] object-contain drop-shadow-[0_15px_30px_rgba(123,75,139,0.5)]"
                    />
                  </div>
                  <div className="w-full h-full bg-[#7B4B8B] rounded-[8px] p-6 sm:p-10 relative shadow-2xl flex flex-col justify-center">
                    <h3 className="text-white text-[22px] sm:text-[26px] font-bold mb-4 flex items-center gap-4">
                      <Users size={28} className="text-white" /> Ekspertlə əlaqə
                    </h3>
                    <p className="text-white/85 text-[14px] sm:text-[16px] leading-relaxed">
                      İstifadəçi peşəkar psixoloqlarla təhlükəsiz və rahat şəkildə əlaqə qura bilir. Online konsultasiya və fərdi dəstək sayəsində problemlərə daha düzgün yanaşma formalaşır.
                    </p>
                  </div>
                </ScrollReveal>

                {/* Box 3 */}
                <ScrollReveal ref={card3Ref} className="w-full max-w-[581px] h-auto min-h-[345px] md:h-[345px] relative self-center md:self-auto md:mt-0">
                  {/* Mobile Mascot (visible on mobile only) */}
                  <div className="md:hidden absolute -top-[55px] right-6 pointer-events-none z-20">
                    <img
                      src={nexieSittingClassic}
                      alt="Nexie Mascot"
                      className="w-[135px] sm:w-[165px] object-contain drop-shadow-[0_15px_30px_rgba(0,242,255,0.3)]"
                    />
                  </div>
                  <div className="w-full h-full bg-[#155567] rounded-[8px] p-6 sm:p-10 relative shadow-2xl flex flex-col justify-center">
                    <h3 className="text-white text-[22px] sm:text-[26px] font-bold mb-4 flex items-center gap-4">
                      <BookOpen size={28} className="text-white" /> İnkişaf Et
                    </h3>
                    <p className="text-white/85 text-[14px] sm:text-[16px] leading-relaxed">
                      Platformadakı meditasiya, nəfəs məşqləri və şəxsi inkişaf tapşırıqları ilə istifadəçi özünü daha balanslı və güvənli hiss etməyə başlayır. Məqsəd uzunmüddətli daxili rahatlıq və sağlam düşüncə formalaşdırmaqdır.
                    </p>
                  </div>
                </ScrollReveal>


              </div>
            </div>

            {/* Partners Header at the end of the section, taking 100% width */}
            <div className="w-screen -mx-4 sm:-mx-8 md:-mx-12 lg:-mx-[72px] bg-white/5 py-4 md:py-8 border-y border-white/10 overflow-hidden relative mt-10 md:mt-20">
              <style>{`
                @keyframes ticker {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-33.333%); }
                }
                .animate-ticker {
                  display: flex;
                  width: max-content;
                  animation: ticker 30s linear infinite;
                }
                .animate-ticker:hover {
                  animation-play-state: paused;
                }
              `}</style>
              <div className="animate-ticker flex items-center gap-24">
                {/* Set 1 */}
                <span className="text-[20px] sm:text-[24px] font-bold text-white/50 whitespace-nowrap">MindBridge</span>
                <span className="text-[20px] sm:text-[24px] font-bold text-white/50 whitespace-nowrap">HealthTech AZ</span>
                <span className="text-[20px] sm:text-[24px] font-bold text-white/50 whitespace-nowrap">Zenith Wellness</span>
                <span className="text-[20px] sm:text-[24px] font-bold text-white/50 whitespace-nowrap">PsycheCore</span>
                <span className="text-[20px] sm:text-[24px] font-bold text-white/50 whitespace-nowrap">NeuroHarmony</span>

                {/* Set 2 */}
                <span className="text-[20px] sm:text-[24px] font-bold text-white/50 whitespace-nowrap">MindBridge</span>
                <span className="text-[20px] sm:text-[24px] font-bold text-white/50 whitespace-nowrap">HealthTech AZ</span>
                <span className="text-[20px] sm:text-[24px] font-bold text-white/50 whitespace-nowrap">Zenith Wellness</span>
                <span className="text-[20px] sm:text-[24px] font-bold text-white/50 whitespace-nowrap">PsycheCore</span>
                <span className="text-[20px] sm:text-[24px] font-bold text-white/50 whitespace-nowrap">NeuroHarmony</span>

                {/* Set 3 */}
                <span className="text-[20px] sm:text-[24px] font-bold text-white/50 whitespace-nowrap">MindBridge</span>
                <span className="text-[20px] sm:text-[24px] font-bold text-white/50 whitespace-nowrap">HealthTech AZ</span>
                <span className="text-[20px] sm:text-[24px] font-bold text-white/50 whitespace-nowrap">Zenith Wellness</span>
                <span className="text-[20px] sm:text-[24px] font-bold text-white/50 whitespace-nowrap">PsycheCore</span>
                <span className="text-[20px] sm:text-[24px] font-bold text-white/50 whitespace-nowrap">NeuroHarmony</span>
              </div>
            </div>
          </section>

          {/* ================= SECTION 7: VR CONSULTATION ================= */}
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

              {/* Floating Glassmorphism Content at Bottom */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-10 md:right-10 bg-[#eeb3b3]/30 backdrop-blur-2xl border border-white/40 rounded-[20px] p-4 sm:p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-[22px] md:text-[36px] font-bold text-white mb-2 md:mb-3 tracking-wide">
                    VR KONSULTASİYA
                  </h2>
                  <p className="text-[13px] sm:text-[15px] md:text-[20px] text-white/95 leading-relaxed font-semibold">
                    Burada evdən çölə çıxmadan istədiyin konfort zonanı seçə və orada zaman keçirərək sakitləşə bilərsən.
                  </p>
                </div>
                <button className="whitespace-nowrap bg-[#a88bff] hover:bg-[#9773fc] text-[#1a2b3c] font-bold text-[14px] md:text-[18px] rounded-full px-6 py-2.5 md:px-10 md:py-4 transition-all duration-300 shadow-[0_4px_14px_rgba(168,139,255,0.4)] hover:shadow-[0_6px_20px_rgba(168,139,255,0.6)] cursor-pointer">
                  Demo-nu İzlə
                </button>
              </div>
            </ScrollReveal>
          </section>

          {/* ================= SECTION 8: CTA ================= */}
          <section
            id="cta"
            className="relative w-full flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[72px] pt-10 md:pt-[112px] pb-10 md:pb-0 scroll-mt-20"
          >
            <ScrollReveal className="w-full max-w-[898px] h-auto min-h-[354px] md:h-[354px] mx-auto bg-white/20 backdrop-blur-md rounded-[8px] pt-[24px] pb-[24px] pr-[16px] pl-[16px] sm:pr-[21px] sm:pl-[21px] gap-[8px] flex flex-col items-center justify-center text-center shadow-2xl border border-white/10 rotate-0 opacity-100">
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
                  className="flex-1 bg-[#0b2430] rounded-full px-6 py-3.5 sm:px-8 sm:py-5 text-white text-[15px] sm:text-[16px] placeholder-white/50 focus:outline-none border border-transparent focus:border-[#a88bff]/50 transition-colors shadow-inner"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#a88bff] hover:bg-[#9773fc] text-[#1a2b3c] font-bold text-[15px] sm:text-[18px] rounded-full px-6 py-3.5 sm:px-10 sm:py-5 transition-all duration-300 shadow-[0_4px_14px_rgba(168,139,255,0.4)] hover:shadow-[0_6px_20px_rgba(168,139,255,0.6)] cursor-pointer"
                >
                  Göndər
                </button>
              </form>
            </ScrollReveal>
          </section>

          {/* ================= SECTION 9: SPECIALISTS & FOOTER ================= */}
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
                  <div key={psych.id} className="bg-white/5 backdrop-blur-md rounded-[20px] p-6 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-4 items-center">
                        <img src={psych.image} alt={psych.name} className="w-[70px] h-[70px] rounded-full object-cover border-2 border-white/20" />
                        <div>
                          <h3 className="text-white text-[20px] font-semibold">{psych.name}</h3>
                          <p className="text-white/60 text-[14px]">{psych.experience}</p>
                          <p className="text-[#facc15] text-[14px] flex items-center gap-1 mt-1">⭐ {psych.rating}</p>
                        </div>
                      </div>
                      <div className="text-[#a88bff] font-bold text-[20px]">${psych.price}<span className="text-[16px] font-normal">/seans</span></div>
                    </div>

                    <p className="text-white/70 text-[14px] leading-relaxed mb-4 line-clamp-3">
                      {psych.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {psych.languages.map(lang => (
                        <span key={lang} className="px-3 py-1 rounded-full border border-[#a88bff]/50 text-white/80 text-[12px]">{lang}</span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {psych.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-[12px]">{tag}</span>
                      ))}
                    </div>

                    <button
                      onClick={() => navigate(PATHS.PSYCHOLOGIST.replace(':id', String(psych.id)))}
                      className="w-full bg-[#a88bff] hover:bg-[#9773fc] text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer z-50 relative"
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

        </div>



      </main>
    </div>
  );
};
