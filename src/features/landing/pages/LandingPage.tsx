import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Sparkles, BookOpen, Users, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { PATHS } from '@/routes/paths';
import nexusLogo from '@/assets/nexusmindlogo.png';
import nexie from '@/assets/nexie.png';
import nexieCloud from '@/assets/nexie_cloud.png';
import hi0101 from '@/assets/hi0101.png';
import hi0102 from '@/assets/hi0102.png';
import hi0103 from '@/assets/hi0103.png';
import purpleRoom from '@/assets/purple_room.png';
import avatar1 from '@/assets/avatar1.png';
import avatar2 from '@/assets/avatar2.png';
import avatar3 from '@/assets/avatar3.png';
import pillarsImage from '@/assets/pillars_image.png';
import therapist1 from '@/assets/therapist1.png';
import vrConsultation from '@/assets/vr_consultation.png';
import { JournalPage } from './JournalPage';
import { PsychologistPage } from './PsychologistPage';
import { Footer } from '../components/Footer';
import { psychologists } from '@/data/psychologists';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [activeScreen, setActiveScreen] = useState<'landing' | 'journal' | 'psychologist'>('landing');
  const [activeSection, setActiveSection] = useState(0);
  const [selectedPsychologistId, setSelectedPsychologistId] = useState<number>(1);
  const [openAccordion, setOpenAccordion] = useState<number | null>(1);
  const totalSections = 10;
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);

  const handleScrollAction = (deltaY: number) => {
    if (isScrolling.current || activeScreen !== 'landing') return;
    
    if (deltaY > 25 && activeSection < totalSections - 1) {
      isScrolling.current = true;
      setActiveSection(prev => prev + 1);
      setTimeout(() => isScrolling.current = false, 750);
    } else if (deltaY < -25 && activeSection > 0) {
      isScrolling.current = true;
      setActiveSection(prev => prev - 1);
      setTimeout(() => isScrolling.current = false, 750);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    const target = e.target as HTMLElement;
    const scrollableDiv = target.closest('.overflow-y-auto');
    
    if (scrollableDiv) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableDiv;
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;
      
      // Allow native scroll if we haven't reached the bounds
      if ((isScrollingDown && Math.ceil(scrollTop + clientHeight) < scrollHeight) || 
          (isScrollingUp && scrollTop > 0)) {
        return;
      }
    }
    
    handleScrollAction(e.deltaY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const deltaY = touchStartY.current - e.touches[0].clientY;
    
    const target = e.target as HTMLElement;
    const scrollableDiv = target.closest('.overflow-y-auto');
    
    if (scrollableDiv) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableDiv;
      const isScrollingDown = deltaY > 0;
      const isScrollingUp = deltaY < 0;
      
      if ((isScrollingDown && Math.ceil(scrollTop + clientHeight) < scrollHeight) || 
          (isScrollingUp && scrollTop > 0)) {
        return; // Allow native scroll
      }
    }
    
    handleScrollAction(deltaY);
  };

  return (
    <div 
      className="h-screen w-full bg-gradient-to-br from-[#8a4fff]/20 via-[#1E293B] to-[#1E293B] flex flex-col relative overflow-hidden font-sans"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
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
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#b070ff] rounded-full blur-[150px] opacity-20 pointer-events-none" />

      {/* Navbar (Stays fixed/top) */}
      <header className="w-full px-6 py-4 sm:px-10 flex items-center justify-between z-50 bg-white/5 backdrop-blur-md border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <img src={nexusLogo} alt="Nexus Mind" className="h-12 sm:h-14 w-auto" />
        </div>

        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium z-50 relative">
          <button onClick={() => { setActiveScreen('landing'); setActiveSection(0); }} className={`transition-colors relative z-50 cursor-pointer pointer-events-auto ${activeScreen === 'landing' && activeSection === 0 ? 'text-white' : 'text-white/60 hover:text-white'}`}>Əsas səhifə</button>
          <button onClick={() => { setActiveScreen('landing'); setActiveSection(9); }} className={`transition-colors relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.5 after:bg-[#00f2ff] hover:after:opacity-100 z-50 cursor-pointer pointer-events-auto ${activeScreen === 'landing' && activeSection === 9 ? 'text-white after:opacity-100' : 'text-white/60 hover:text-white after:opacity-0'}`}>Ekspertlər</button>
          <button className="text-white/60 hover:text-white transition-colors z-50 cursor-pointer pointer-events-auto">Xəritə</button>
          <button className="text-white/60 hover:text-white transition-colors z-50 cursor-pointer pointer-events-auto">Bloq</button>
          <button onClick={() => setActiveScreen('journal')} className={`transition-colors relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.5 after:bg-[#00f2ff] hover:after:opacity-100 z-50 cursor-pointer pointer-events-auto ${activeScreen === 'journal' ? 'text-white after:opacity-100' : 'text-white/60 hover:text-white after:opacity-0'}`}>Gündəlik</button>
          <button onClick={() => { setActiveScreen('landing'); setActiveSection(7); }} className={`transition-colors relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.5 after:bg-[#00f2ff] hover:after:opacity-100 z-50 cursor-pointer pointer-events-auto ${activeScreen === 'landing' && activeSection === 7 ? 'text-white after:opacity-100' : 'text-white/60 hover:text-white after:opacity-0'}`}>Vr konsultasiya</button>
        </nav>

        <div className="relative group z-50">
          <div 
            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9f5bff] via-[#00f2ff] to-white/90 pointer-events-none transition-opacity group-hover:opacity-100 opacity-60"
            style={{
              padding: '1.5px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude'
            }}
          />
          <button 
            onClick={() => navigate(PATHS.LOGIN)}
            className="px-8 py-2.5 rounded-full text-white text-[15px] font-medium bg-transparent hover:bg-white/5 transition-colors relative pointer-events-auto"
          >
            Giriş et
          </button>
        </div>
      </header>

      {/* Main Content Area - Stacked Sections */}
      <main className="flex-1 w-full relative">
        
        {/* PARALLAX LANDING PAGE CONTENT */}
        <div className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${activeScreen === 'landing' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          {/* ================= SECTION 0: HERO ================= */}
          <section 
          className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center px-6 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-y-auto no-scrollbar py-20 ${
            activeSection === 0 
              ? 'opacity-100 translate-y-0 pointer-events-auto scale-100' 
              : 'opacity-0 -translate-y-[80px] pointer-events-none scale-95'
          }`}
        >
          <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center relative">
            <div className="relative w-full max-w-[850px] bg-white/10 backdrop-blur-xl border border-white/10 rounded-[32px] p-10 sm:p-16 text-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] ml-auto md:ml-20">
              
              <div className="absolute -left-[100px] sm:-left-[140px] lg:-left-[220px] -bottom-[30px] hidden md:flex flex-col items-center pointer-events-none z-20">
                <img src={nexieCloud} alt="Speech Bubble" className="w-[120px] sm:w-[160px] lg:w-[190px] object-contain mb-[-10px] ml-[-40px] sm:ml-[-60px] drop-shadow-xl" />
                <img src={nexie} alt="Nexie Mascot" className="w-[180px] sm:w-[260px] lg:w-[320px] object-contain drop-shadow-[0_0_30px_rgba(0,242,255,0.3)]" />
              </div>

              <h1 className="text-[28px] sm:text-[36px] md:text-[46px] font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
                Özünü kəşf etməyə hazırsan ?
              </h1>
              <p className="text-[18px] sm:text-[24px] md:text-[26px] text-white/80 mb-6 sm:mb-10 max-w-[600px] mx-auto leading-relaxed">
                Sıxıntıdan qurtularaq və rahat nəfəs alaraq , həyatdan zövq al !
              </p>
              
              <button 
                onClick={() => navigate(PATHS.REGISTER)}
                className="bg-[#591b98] hover:bg-[#6c22b5] text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-[16px] sm:text-[18px] font-medium transition-all duration-300 shadow-[0_0_20px_rgba(89,27,152,0.5)] hover:shadow-[0_0_30px_rgba(89,27,152,0.8)] hover:scale-105 mb-8 sm:mb-14 cursor-pointer"
              >
                İndi başla
              </button>

              <p className="text-white/50 text-[11px] sm:text-[13px]">
                Davam etməklə, siz bizim <a href="#" className="text-white/70 hover:text-white transition-colors cursor-pointer pointer-events-auto">Xidmət Şərtləri və Məxfilik Siyasəti</a> ilə razılaşırsınız
              </p>
            </div>

            <div className="w-full max-w-[1000px] mt-8 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-3 sm:p-4 rounded-[20px] hover:bg-white/15 transition-colors">
                <div className="w-[48px] h-[48px] sm:w-[60px] sm:h-[60px] rounded-full overflow-hidden flex-shrink-0 bg-[#591b98]/30">
                  <img src={hi0101} alt="Feature 1" className="w-full h-full object-cover" />
                </div>
                <p className="text-white text-[13px] sm:text-[14px] leading-tight font-medium text-left">
                  Mütəxəssislər köməyilə çətinliklərdən azad ol !
                </p>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-3 sm:p-4 rounded-[20px] hover:bg-white/15 transition-colors">
                <div className="w-[48px] h-[48px] sm:w-[60px] sm:h-[60px] rounded-full overflow-hidden flex-shrink-0 bg-[#591b98]/30">
                  <img src={hi0102} alt="Feature 2" className="w-full h-full object-cover" />
                </div>
                <p className="text-white text-[13px] sm:text-[14px] leading-tight font-medium text-left">
                  Vr konsultasiya ilə evdən çıxmağa belə ehtiyac yoxur !
                </p>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-3 sm:p-4 rounded-[20px] hover:bg-white/15 transition-colors">
                <div className="w-[48px] h-[48px] sm:w-[60px] sm:h-[60px] rounded-full overflow-hidden flex-shrink-0 bg-[#591b98]/30">
                  <img src={hi0103} alt="Feature 3" className="w-full h-full object-cover" />
                </div>
                <p className="text-white text-[13px] sm:text-[14px] leading-tight font-medium text-left">
                  Günlük notlar qeyd edərək səndə öz inkişafını gör !
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 1: FEATURE GRID ================= */}
        <section 
          className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center px-6 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-y-auto no-scrollbar py-20 ${
            activeSection === 1 
              ? 'opacity-100 translate-y-0 pointer-events-auto scale-100' 
              : activeSection > 1
                ? 'opacity-0 -translate-y-[80px] pointer-events-none scale-95'
                : 'opacity-0 translate-y-[80px] pointer-events-none scale-105'
          }`}
        >
          <div className="w-full max-w-[1000px] mx-auto flex flex-col items-center">
            
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-[36px] sm:text-[44px] font-bold text-white mb-4 tracking-tight">
                Daxili tarazlığı tap, özünü daha yaxşı anla.
              </h2>
              <p className="text-[18px] sm:text-[20px] text-white/80 font-medium">
                Psixoloji dəstək və özünüinkişaf üçün təhlükəsiz bir məkan
              </p>
            </div>

            {/* Grid layout matching the image */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Top Left Card (spans 2 cols) */}
              <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 pb-0 flex flex-col overflow-hidden relative shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Heart size={24} className="text-[#00f2ff]" strokeWidth={2} />
                  <h3 className="text-white text-[26px] font-medium tracking-wide">Sənin hisslərin önəmlidir.</h3>
                </div>
                <p className="text-white/80 text-[15px] leading-relaxed max-w-[450px] mb-8">
                  Bu platforma düşüncələrini anlamaq, emosiyalarını idarə etmək və gündəlik streslə daha sağlam şəkildə başa çıxmaq üçün hazırlanıb.
                  Sən burada tək deyilsən.Sevdiyin bir məkan seç və terapiyaya başla
                </p>
                <div className="w-full h-[180px] sm:h-[220px] rounded-t-2xl overflow-hidden mt-auto">
                  <img src={purpleRoom} alt="Room" className="w-full h-full object-cover object-center border-t border-x border-white/10 opacity-90" />
                </div>
              </div>

              {/* Top Right Card */}
              <div className="bg-[#2A7B9B] border border-white/10 rounded-[24px] p-8 flex flex-col relative shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles size={24} className="text-white" strokeWidth={2} />
                  <h3 className="text-white text-[24px] font-medium tracking-wide">Gündəlik Rituallar</h3>
                </div>
                <p className="text-white/90 text-[15px] leading-relaxed flex-1">
                  Kiçik addımlarla psixoloji rifahını gücləndir.Nəfəs məşqləri,qısa meditasiya və gündəlik refleksiya ilə özünü daha balanslı hiss et.
                </p>
                <button className="text-white flex items-center gap-2 text-[15px] hover:opacity-80 transition-opacity mt-8 font-medium cursor-pointer">
                  Bütün ritualları gör <ArrowRight size={18} />
                </button>
              </div>

              {/* Bottom Left Card */}
              <div className="bg-[#276F8C] border border-white/10 rounded-[24px] p-8 flex flex-col relative shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen size={24} className="text-white" strokeWidth={2} />
                  <h3 className="text-white text-[24px] font-medium tracking-wide">Gündəlik Notlar</h3>
                </div>
                <p className="text-white/90 text-[15px] leading-relaxed">
                  Düşüncələrini yaz və özünü daha yaxşı tanı.Gündəlik hisslərini qeyd edərək emosional vəziyyətini izləyə , öz inkişafını görə bilərsən.
                </p>
              </div>

              {/* Bottom Right Card (spans 2 cols) */}
              <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 relative shadow-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Users size={24} className="text-[#00f2ff]" strokeWidth={2} />
                    <h3 className="text-white text-[24px] font-medium tracking-wide">Dəstək və paylaşım icması</h3>
                  </div>
                  <p className="text-white/80 text-[15px] leading-relaxed max-w-[480px]">
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
          </div>
        </section>

        {/* ================= SECTION 2: ACCORDION PILLARS ================= */}
        <section 
          className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center px-6 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            activeSection === 2 
              ? 'opacity-100 translate-y-0 pointer-events-auto scale-100' 
              : activeSection > 2
                ? 'opacity-0 -translate-y-[80px] pointer-events-none scale-95'
                : 'opacity-0 translate-y-[80px] pointer-events-none scale-105'
          }`}
        >
          <div className="w-full max-w-[1050px] mx-auto flex flex-col md:flex-row items-stretch gap-12 lg:gap-20">
            
            {/* Left Image (Pillars) */}
            <div className="w-full md:w-[45%] lg:w-[40%] flex">
              <div className="rounded-[32px] overflow-hidden shadow-2xl relative w-full h-full min-h-[300px]">
                <img src={pillarsImage} alt="6 Pillars of Psychological Health" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>

            {/* Right Accordion */}
            <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col">
              <h2 className="text-[32px] lg:text-[40px] font-bold text-white mb-10 tracking-tight leading-tight">
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
                  <div key={item.id} className={`flex flex-col rounded-[16px] overflow-hidden transition-all duration-300 ${openAccordion === item.id ? 'bg-[#F4F5F6]' : 'bg-transparent'}`}>
                    <button 
                      onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                      className="w-full flex items-center justify-between text-left py-[18px] px-6 hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <span className={`text-[17px] font-medium ${openAccordion === item.id ? 'text-[#1a2b3c]' : 'text-white'}`}>
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
                        <p className="text-[#475467] text-[14px] leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ================= SECTION 3: TESTIMONIALS ================= */}
        <section 
          className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center px-6 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            activeSection === 3 
              ? 'opacity-100 translate-y-0 pointer-events-auto scale-100' 
              : activeSection > 3
                ? 'opacity-0 -translate-y-[80px] pointer-events-none scale-95'
                : 'opacity-0 translate-y-[80px] pointer-events-none scale-105'
          }`}
        >
          <div className="w-full max-w-[1100px] mx-auto flex flex-col items-center">
            
            {/* Header */}
            <div className="text-center mb-14">
              <h2 className="text-[36px] sm:text-[44px] font-bold text-white mb-3 tracking-tight">
                Real həyat hekayələri
              </h2>
              <p className="text-[17px] sm:text-[19px] text-white/80">
                İstifadəçilərimizin təcrübələri (50,000+ istifadəçidən)
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Card 1 */}
              <div className="bg-white rounded-[24px] p-8 sm:p-10 flex flex-col shadow-xl border border-transparent min-h-[300px]">
                <p className="text-[#155a6d] text-[16px] leading-relaxed mb-8 flex-1 font-medium">
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
              <div className="bg-white rounded-[24px] p-8 sm:p-10 flex flex-col shadow-xl border border-transparent min-h-[300px]">
                <p className="text-[#155a6d] text-[16px] leading-relaxed mb-8 flex-1 font-medium">
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
          </div>
        </section>

        {/* ================= SECTION 4: ROADMAP (Steps 4, 5, 6) ================= */}
        <section 
          className={`absolute inset-0 w-full h-full flex flex-col items-center pt-10 px-6 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            activeSection >= 4 && activeSection <= 6
              ? 'opacity-100 pointer-events-auto scale-100' 
              : activeSection > 6
                ? 'opacity-0 -translate-y-[80px] pointer-events-none scale-95'
                : 'opacity-0 translate-y-[80px] pointer-events-none scale-105'
          }`}
        >
          {/* Parallax Wrapper */}
          <div className={`w-full max-w-[1100px] mx-auto flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            activeSection === 4 ? 'translate-y-[5vh]' : 
            activeSection === 5 ? 'translate-y-[-25vh]' : 
            activeSection === 6 ? 'translate-y-[-65vh]' : ''
          }`}>
            
            {/* Partners Header */}
            <div className="w-full flex justify-between items-center bg-white/10 py-5 px-10 rounded-[20px] mb-16 overflow-hidden">
              <span className="text-[18px] sm:text-[22px] font-bold text-white/60 whitespace-nowrap">MindBridge</span>
              <span className="text-[18px] sm:text-[22px] font-bold text-white/60 whitespace-nowrap">HealthTech AZ</span>
              <span className="text-[18px] sm:text-[22px] font-bold text-white/60 whitespace-nowrap">Zenith Wellness</span>
              <span className="text-[18px] sm:text-[22px] font-bold text-white/60 whitespace-nowrap">PsycheCore</span>
              <span className="text-[18px] sm:text-[22px] font-bold text-white/60 whitespace-nowrap">NeuroHarmony</span>
            </div>

            {/* Title */}
            <div className="text-center mb-24">
              <h2 className="text-[36px] sm:text-[44px] font-bold text-white mb-3 tracking-tight">
                Necə istifadə edəcəksən:
              </h2>
              <p className="text-[17px] sm:text-[19px] text-white/80">
                Sən də bizimlə həyatdan yenidən zövq almağı öyrən
              </p>
            </div>

            {/* Roadmap Boxes */}
            <div className="w-full max-w-[1100px] mx-auto relative flex flex-col gap-[100px] pb-[200px]">
              
              {/* Box 1 */}
              <div className={`w-[46%] bg-[#155567] rounded-[32px] p-10 pt-14 relative shadow-2xl transition-all duration-700 ${activeSection >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <img src={nexie} alt="Nexie" className="absolute -top-[110px] left-8 w-[150px] h-auto drop-shadow-[0_15px_30px_rgba(0,242,255,0.3)]" />
                <h3 className="text-white text-[26px] font-bold mb-4 flex items-center gap-4">
                  <Sparkles size={28} className="text-white" /> Özünü tanı
                </h3>
                <p className="text-white/85 text-[16px] leading-relaxed">
                  İlk mərhələdə istifadəçi qısa testlər və gündəlik qeydlərlə emosional vəziyyətini analiz edir. Sistem onun stress, narahatlıq və emosional vəziyyətini müəyyənləşdirərək fərdi tövsiyələr təqdim edir.
                </p>
                
                {/* SVG Line to Box 2 */}
                <div className={`absolute top-[60%] left-[100%] w-[17.39%] h-[130px] pointer-events-none transition-all duration-700 delay-300 ${activeSection >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
                  <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
                    <path d="M 0,0 C 50,0 50,100 100,100" fill="none" stroke="#a072ff" strokeWidth="3" strokeDasharray="8 8" />
                    <polygon points="105,100 90,93 90,107" fill="#a072ff" />
                  </svg>
                </div>
              </div>

              {/* Box 2 */}
              <div className={`w-[46%] self-end bg-[#7B4B8B] rounded-[32px] p-10 pt-14 relative shadow-2xl transition-all duration-700 ${activeSection >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <img src={hi0101} alt="Nexie" className="absolute -top-[110px] right-8 w-[150px] h-auto drop-shadow-[0_15px_30px_rgba(123,75,139,0.5)]" />
                <h3 className="text-white text-[26px] font-bold mb-4 flex items-center gap-4">
                  <Users size={28} className="text-white" /> Ekspertlə əlaqə
                </h3>
                <p className="text-white/85 text-[16px] leading-relaxed">
                  İstifadəçi peşəkar psixoloqlarla təhlükəsiz və rahat şəkildə əlaqə qura bilir. Online konsultasiya və fərdi dəstək sayəsində problemlərə daha düzgün yanaşma formalaşır.
                </p>

                {/* SVG Line to Box 3 */}
                <div className={`absolute top-[60%] right-[100%] w-[17.39%] h-[130px] pointer-events-none transition-all duration-700 delay-300 ${activeSection >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
                  <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
                    <path d="M 100,0 C 50,0 50,100 0,100" fill="none" stroke="#a072ff" strokeWidth="3" strokeDasharray="8 8" />
                    <polygon points="-5,100 10,93 10,107" fill="#a072ff" />
                  </svg>
                </div>
              </div>

              {/* Box 3 */}
              <div className={`w-[46%] bg-[#155567] rounded-[32px] p-10 pt-14 relative shadow-2xl transition-all duration-700 ${activeSection >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <img src={hi0102} alt="Nexie" className="absolute -top-[110px] left-8 w-[150px] h-auto drop-shadow-[0_15px_30px_rgba(0,242,255,0.2)]" />
                <h3 className="text-white text-[26px] font-bold mb-4 flex items-center gap-4">
                  <BookOpen size={28} className="text-white" /> İnkişaf Et
                </h3>
                <p className="text-white/85 text-[16px] leading-relaxed">
                  Platformadakı meditasiya, nəfəs məşqləri və şəxsi inkişaf tapşırıqları ilə istifadəçi özünü daha balanslı və güvənli hiss etməyə başlayır. Məqsəd uzunmüddətli daxili rahatlıq və sağlam düşüncə formalaşdırmaqdır.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ================= SECTION 7: VR CONSULTATION ================= */}
        <section 
          className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center px-6 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            activeSection === 7
              ? 'opacity-100 translate-y-0 pointer-events-auto scale-100' 
              : activeSection > 7
                ? 'opacity-0 -translate-y-[80px] pointer-events-none scale-95'
                : 'opacity-0 translate-y-[80px] pointer-events-none scale-105'
          }`}
        >
          <div className="w-full max-w-[1200px] h-[75vh] mx-auto relative rounded-[40px] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.5)] border border-white/20 group">
            {/* Background Image */}
            <img 
              src={vrConsultation} 
              alt="VR Consultation" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
            />
            
            {/* Floating Glassmorphism Content at Bottom */}
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 bg-[#eeb3b3]/30 backdrop-blur-2xl border border-white/40 rounded-[30px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              <div className="flex-1">
                <h2 className="text-[28px] md:text-[36px] font-bold text-white mb-3 tracking-wide">
                  VR KONSULTASİYA
                </h2>
                <p className="text-[16px] md:text-[20px] text-white/95 leading-relaxed font-semibold">
                  Burada evdən çölə çıxmadan istədiyin konfort zonanı seçə və orada zaman keçirərək sakitləşə bilərsən.
                </p>
              </div>
              <button className="whitespace-nowrap bg-[#a88bff] hover:bg-[#9773fc] text-[#1a2b3c] font-bold text-[18px] rounded-full px-10 py-4 transition-all duration-300 shadow-[0_4px_14px_rgba(168,139,255,0.4)] hover:shadow-[0_6px_20px_rgba(168,139,255,0.6)] cursor-pointer">
                Demo-nu İzlə
              </button>
            </div>
          </div>
        </section>

        {/* ================= SECTION 8: CTA ================= */}
        <section 
          className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center px-6 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            activeSection === 8
              ? 'opacity-100 translate-y-0 pointer-events-auto scale-100' 
              : activeSection > 8
                ? 'opacity-0 -translate-y-[80px] pointer-events-none scale-95'
                : 'opacity-0 translate-y-[80px] pointer-events-none scale-105'
          }`}
        >
          <div className="w-full max-w-[1150px] mx-auto bg-white/20 backdrop-blur-md rounded-[40px] p-16 sm:p-24 lg:py-32 flex flex-col items-center text-center shadow-2xl border border-white/10">
            <h2 className="text-[48px] sm:text-[64px] font-bold text-white mb-6 tracking-tight">
              İndi qoşul !
            </h2>
            <p className="text-[20px] sm:text-[24px] text-white/90 mb-16 max-w-[700px]">
              Email-ini göndər sənə ilkin ödənişsiz planı göndərək.
            </p>
            
            <form 
              onSubmit={(e) => { e.preventDefault(); navigate(PATHS.REGISTER); }}
              className="w-full max-w-[750px] flex flex-col sm:flex-row gap-5"
            >
              <input 
                type="email" 
                placeholder="E-poçt ünvanınız"
                className="flex-1 bg-[#0b2430] rounded-full px-10 py-5 sm:py-6 text-white text-[18px] placeholder-white/50 focus:outline-none border border-transparent focus:border-[#a88bff]/50 transition-colors shadow-inner"
                required
              />
              <button 
                type="submit"
                className="bg-[#a88bff] hover:bg-[#9773fc] text-[#1a2b3c] font-bold text-[18px] sm:text-[20px] rounded-full px-14 py-5 sm:py-6 transition-all duration-300 shadow-[0_4px_14px_rgba(168,139,255,0.4)] hover:shadow-[0_6px_20px_rgba(168,139,255,0.6)] cursor-pointer"
              >
                Göndər
              </button>
            </form>
          </div>
        </section>

        {/* ================= SECTION 9: SPECIALISTS & FOOTER ================= */}
        <section 
          className={`absolute inset-0 w-full h-full flex flex-col items-center pt-12 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-x-hidden overflow-y-auto no-scrollbar ${
            activeSection === 9
              ? 'opacity-100 translate-y-0 pointer-events-auto scale-100' 
              : 'opacity-0 translate-y-[80px] pointer-events-none scale-105'
          }`}
        >
          <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center pb-20 px-6 md:px-8">
            
            <div className="text-center mb-6 sm:mb-10">
              <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-bold text-white mb-2 tracking-tight">
                Mütəxəssislərimiz :
              </h2>
              <p className="text-[16px] sm:text-[20px] md:text-[24px] text-white/90 mb-3">
                Psixoloqlar, Həyat bələdçiləri, Mindfulness terapistləri və s.
              </p>
              <p className="text-[16px] sm:text-[18px] text-[#00f2ff]/80">
                Sən də bizimlə həyatdan yenidən zövq almağı öyrən !
              </p>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
              {psychologists.map((psych) => (
                <div key={psych.id} className="bg-white/5 backdrop-blur-md rounded-[24px] p-6 border border-white/10 hover:bg-white/10 transition-colors">
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
                    onClick={() => { setSelectedPsychologistId(psych.id); setActiveScreen('psychologist'); }} 
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

          </div>

          <Footer />
        </section>
        
        </div>

        {/* JOURNAL PAGE CONTENT */}
        <div className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${activeScreen === 'journal' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          {activeScreen === 'journal' && <JournalPage />}
        </div>
        
        {/* PSYCHOLOGIST PREVIEW SCREEN */}
        <div className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${activeScreen === 'psychologist' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          {activeScreen === 'psychologist' && <PsychologistPage psychologistId={selectedPsychologistId} />}
        </div>
        
      </main>
    </div>
  );
};
