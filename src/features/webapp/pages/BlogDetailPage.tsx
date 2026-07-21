import { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Share2, Bookmark, Calendar, Clock, ChevronRight, Quote, Mic, Play, ChevronLeft, Eye, Settings, Shield } from 'lucide-react';
import { PATHS } from '@/routes/paths';
import vrConsultationImg from '@/assets/vr_consultation.png';
import digitalBrainImg from '@/assets/digital_brain.png';
import mountainSunsetImg from '@/assets/mountain_sunset_clouds.png';

export const BlogDetailPage = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const cardWidth = 385.957 + 30.47;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full flex flex-col rounded-t-[20px] md:rounded-t-[38.93px] rounded-b-[20px] md:rounded-b-[38.93px] overflow-hidden shadow-2xl bg-white animate-fade-in min-h-[calc(100vh-64px)] pb-20 opacity-100">
      
      {/* Top Header Section (Card with Gradient) - Height 188px */}
      <div
        className="w-full rounded-t-[20px] md:rounded-t-[38.93px] rounded-b-none h-auto min-h-[140px] sm:min-h-[160px] md:h-[188px] pt-5 sm:pt-[36px] pb-4 sm:pb-[28px] px-4 sm:px-6 md:px-[48px] flex flex-col justify-between items-center text-center opacity-100"
        style={{
          background: 'linear-gradient(135deg, #CBE8FC 0%, #DDD4F8 33%, #F9D8E8 66%, #FFF5E6 100%)',
        }}
      >
        <h2 className="w-full text-center text-[28px] md:text-[46.72px] font-normal text-[#1E0A42] leading-[36px] md:leading-[59.84px] tracking-[-0.96px] font-['Lexend'] mt-2">
          Trendləri bizimlə izlə!
        </h2>

        {/* Breadcrumbs navigation */}
        <div className="w-full flex items-center justify-start gap-2 text-xs sm:text-sm text-[#1E0A42]/70 font-semibold font-['Lexend'] select-none overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link to={PATHS.DASHBOARD} className="hover:text-[#4D2059] transition-colors">
            Ana səhifə
          </Link>
          <ChevronRight size={14} className="text-[#1E0A42]/50" />
          <Link to={PATHS.WEBAPP_BLOG} className="hover:text-[#4D2059] transition-colors">
            Bloqlar
          </Link>
          <ChevronRight size={14} className="text-[#1E0A42]/50" />
          <span className="text-[#4D2059] font-bold">Psixoloji Sağlamlıq</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="px-4 sm:px-6 md:px-[48px] py-6 sm:py-12 w-full flex flex-col gap-8 max-w-[1227.5px] mx-auto">
        
        {/* Cover Image banner card - Width 1227.5px, Height 582px */}
        <div className="w-full rounded-[16px] sm:rounded-[22.75px] overflow-hidden relative min-h-[300px] sm:min-h-[420px] md:h-[582px] flex flex-col justify-end p-5 sm:p-8 md:p-12 shadow-xl shrink-0 group">
          {/* Background image cover */}
          <img
            src={vrConsultationImg}
            alt="VR Terapiyasının Gələcəyi"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700"
          />
          {/* Black gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />

          {/* Top Right action buttons */}
          <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer shadow-sm">
              <Share2 size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer shadow-sm">
              <Bookmark size={18} />
            </button>
          </div>

          {/* Bottom text overlays */}
          <div className="relative z-20 text-left flex flex-col gap-4 max-w-[900px]">
            {/* Meta tags row */}
            <div className="flex flex-wrap items-center gap-4 text-white/95 text-xs font-semibold font-['Lexend']">
              <span className="bg-white/20 text-white text-[10px] tracking-widest px-3.5 py-1.5 rounded-full uppercase font-bold font-['Lexend'] flex items-center justify-center">
                BLOQ
              </span>
              <span className="flex items-center gap-1.5 text-white/80">
                <Calendar size={14} className="text-white/60" />
                24 Mart 2026
              </span>
              <span className="flex items-center gap-1.5 text-white/80">
                <Clock size={14} className="text-white/60" />
                4 dəq oxu
              </span>
              <span className="flex items-center gap-1.5 text-white/80">
                <Eye size={14} className="text-white/60" />
                93 baxış
              </span>
            </div>

            {/* Main title */}
            <h2 className="text-2xl md:text-[36px] font-bold leading-tight text-white font-['Lexend'] mt-2">
              VR Terapiyasının Gələcəyi: Virtual Dünyalarda Sağalma
            </h2>
          </div>
        </div>

        {/* First Content split-body layout section: Contains Exposure Therapy and Right Sidebar */}
        <div className="w-full flex flex-col lg:flex-row gap-12 mt-6 items-start justify-between">
          
          {/* Left Column: First Part of Article (takes 68% width) */}
          <div className="w-full lg:w-[68%] flex flex-col gap-6 text-left text-[#1E0A42]/90 leading-relaxed font-normal text-[15px] sm:text-[16px] font-['Lexend']">
            {/* Intro paragraph */}
            <p className="text-base md:text-[17px] font-normal text-[#1E0A42] leading-relaxed">
              Psixoterapiya klassik 'şüuraltı söhbətlər' üzərində qurulub. Lakin bu gün Virtual Reallıq (VR) texnologiyası bu sahədə tamamilə yeni bir səhifə açır. Bəs VR terapiyası klassik üsullardan nə ilə fərqlənir və o, insan beyninə necə təsir edir?
            </p>

            {/* Section 1: Exposure Therapy */}
            <div className="mt-2 flex flex-col gap-3">
              <h3 className="text-[#1E0A42] text-[22px] md:text-[28px] font-bold tracking-tight">
                Ekspozisiya Terapiyasının Rəqəmsal Təkamülü
              </h3>
              <p className="text-[#1E0A42]/80 leading-relaxed text-[15px] sm:text-[16px]">
                Travma və Posttravmatik Stress Pozuntusunun (PTSP) müalicəsində ən effektiv metodlardan biri 'ekspozisiya' (üzləşmə) terapiyasıdır. Pasient onu travmaya salan xatirəni zehnində yenidən canlandırmalı və onunla üzləşməlidir. Lakin bunu sadəcə təsəvvür etmək hər kəs üçün asan olmur; beyin bəzən özünü qorumaq üçün o xatirələri bloklayır. VR məhz burada dövrəyə girir. Təhlükəsiz və tam nəzarət olunan bir klinika mühitində pasient xüsusi VR eynəkləri vasitəsilə qorxu və ya travma yaratmış mühitə vizual olaraq daxil edilir.
              </p>
            </div>

            {/* Mount Fuji Landscape Card with Overlay and Button */}
            <div className="w-full h-[280px] md:h-[360px] rounded-[18px] overflow-hidden relative shadow-md my-4 shrink-0 flex flex-col justify-end p-6">
              {/* Cover Landscape Image */}
              <img
                src={mountainSunsetImg}
                alt="VR Konsultasiya Komfort Zonası"
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Floating Top Right Glass Card */}
              <div className="absolute top-4 right-4 z-20 max-w-[280px] sm:max-w-[320px] bg-black/40 backdrop-blur-md border border-white/20 rounded-[12px] p-4 text-left text-white">
                <span className="text-[10px] font-bold tracking-widest text-[#FFF5E6] block mb-1">
                  VR KONSULTASİYA
                </span>
                <p className="text-[11px] sm:text-xs leading-relaxed text-white/90 font-light">
                  Burada evdən çölə çıxmadan istədiyin komfort zonanı seçə və orada zaman keçirərək sakitləşə bilərsən.
                </p>
              </div>

              {/* Purple Solid Button on Bottom Left */}
              <div className="relative z-20 self-start">
                <button className="bg-[#482476] hover:bg-[#3b1d62] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition-colors shadow-lg cursor-pointer outline-none border-0 select-none">
                  İndi yoxla
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar Panels (32% width) */}
          <div className="w-full lg:w-[32%] flex flex-col gap-8 shrink-0">
            {/* Widget 1: Need Support Card */}
            <div className="bg-[#482476] rounded-[24px] p-8 shadow-xl flex flex-col gap-4 font-sans text-left relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/5 blur-xl group-hover:scale-110 transition-transform duration-500" />
              
              <h4 className="text-white text-[20px] font-semibold tracking-tight leading-snug font-['Lexend']">
                Dəstək lazımdır?
              </h4>

              <p className="text-white/80 text-[15px] leading-relaxed font-normal font-['Lexend'] pr-6">
                Mütəxəssislərimiz sizə kömək etməyə hazırdır.
              </p>

              <button
                onClick={() => navigate(`${PATHS.HOME}#experts`)}
                className="w-full py-3.5 bg-white text-[#482476] rounded-[16px] text-sm font-bold hover:bg-white/95 transition-all duration-300 cursor-pointer text-center font-['Lexend'] select-none outline-none hover:shadow-lg border-0"
              >
                Məsləhət Alın
              </button>
            </div>

            {/* Widget 2: Popular Topics Tag Box */}
            <div className="bg-white rounded-[24px] border border-[#E5DFDF] p-6 shadow-sm flex flex-col gap-4 text-left">
              <h4 className="text-[#1E0A42] text-[20px] font-semibold font-['Lexend'] border-b border-[#E5DFDF]/50 pb-2">
                Populyar Mövzular
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Meditasiya',
                  'Təşviş',
                  'Yuxu',
                  'Özünü Tanıma',
                  'Uşaq Psixologiyası',
                ].map((topic, idx) => (
                  <button
                    key={idx}
                    className="bg-[#7B7B93] text-white rounded-full px-4 py-2 text-[12px] font-medium hover:bg-[#7B7B93]/90 transition-all duration-300 cursor-pointer outline-none select-none font-['Lexend'] border-0"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Widget 3: Sanctuary Podcast Player Card */}
            <div className="bg-[#0A072B] rounded-[24px] p-8 shadow-xl flex flex-col gap-6 font-sans text-left relative overflow-hidden group text-white">
              {/* Header Group */}
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md shrink-0">
                  <Mic size={18} />
                </span>
                <div className="flex flex-col">
                  <h5 className="text-white text-base font-semibold font-['Lexend']">
                    Sanctuary Podkast
                  </h5>
                  <span className="text-white/50 text-[11px] font-medium tracking-wide uppercase font-['Lexend'] mt-0.5">
                    Həftəlik buraxılış
                  </span>
                </div>
              </div>

              {/* Text Description */}
              <p className="text-white/80 text-xs md:text-sm leading-relaxed font-normal font-['Lexend'] line-clamp-3">
                "Rəqəmsal Dünyada İnsan Olmaq" - Bu həftəlik qonağımız Dr. Leyla Əliyeva ilə maraqlı söhbəti dinləyin.
              </p>

              {/* Action Button */}
              <button className="w-full py-3.5 border border-white/20 hover:border-white rounded-[16px] text-white text-sm font-semibold hover:bg-white/5 transition-all duration-300 cursor-pointer text-center font-['Lexend'] flex items-center justify-center gap-2 select-none outline-none">
                <Play size={14} className="fill-white" />
                <span>İndi Dinlə</span>
              </button>
            </div>
          </div>

        </div>

        {/* Second Content Layout Section (Neyroplastiklik): Spans full 100% container width */}
        <div className="w-full flex flex-col gap-6 text-left mt-12 text-[#1E0A42]/90 leading-relaxed font-normal text-[15px] sm:text-[16px] font-['Lexend']">
          
          {/* Section 2: Neuroplasticity */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[#1E0A42] text-[22px] md:text-[28px] font-bold tracking-tight">
              Neyroplastiklik və Yeni Neyron Əlaqələri
            </h3>
            <p className="text-[#1E0A42]/80 leading-relaxed text-[15px] sm:text-[16px]">
              VR terapiyası sadəcə bir vizual simulyasiya deyil. O, beynin neyroplastiklik (özünü yenidən proqramlaşdırma) qabiliyyətindən istifadə edir. Təhlükəsiz virtual mühitdə qorxulu ssenarilərlə dəfələrlə qarşılaşan və bu zaman heç bir real zərər görməyən beyin, köhnə 'təhlükə' siqnallarını silir və yerinə yeni, neytral neyron əlaqələri qurur. İnsan artıq o xatirəni xatırlayanda bədəni kəskin panik reaksiya vermir.
            </p>
          </div>

          {/* Flex Side-by-side Layout: Left small cards stacked, Right blockquote and text content */}
          <div className="w-full flex flex-col md:flex-row gap-6 my-6 items-stretch">
            
            {/* Left Part: 2 small vertical cards stacked */}
            <div className="w-full md:w-[280px] lg:w-[300px] flex flex-col gap-4 shrink-0">
              
              {/* Small Card 1 */}
              <div className="bg-[#1C1236] rounded-[16px] p-5 text-white text-left flex flex-col gap-3 flex-1 border border-white/5">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white shrink-0">
                    <Settings size={16} />
                  </span>
                  <span className="text-sm font-bold font-['Lexend'] tracking-tight">
                    Tam Nəzarət
                  </span>
                </div>
                <p className="text-white/80 text-[11px] sm:text-xs leading-relaxed font-light font-['Lexend']">
                  Terapevt virtual mühitdəki hər bir detalı — səsləri, vizual effektləri, günün saatını və hadisələrin intensivliyini pasientin dözümlülük səviyyəsinə uyğun tənzimləyir.
                </p>
              </div>

              {/* Small Card 2 */}
              <div className="bg-[#1C1236] rounded-[16px] p-5 text-white text-left flex flex-col gap-3 flex-1 border border-white/5">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white shrink-0">
                    <Shield size={16} />
                  </span>
                  <span className="text-sm font-bold font-['Lexend'] tracking-tight">
                    Tam Nəzarət
                  </span>
                </div>
                <p className="text-white/80 text-[11px] sm:text-xs leading-relaxed font-light font-['Lexend']">
                  Virtual dünya süni olsa da, insan beyni oradakı təhlükəsizlik hissini real qəbul edir və travmatik xatirəyə qarşı dözümlülük (desensitizasiya) qazanır.
                </p>
              </div>

            </div>

            {/* Right Part: Quota Box (compact) and bottom sections (aligned with the left cards) */}
            <div className="flex-grow flex flex-col gap-6 text-left">
              
              {/* Redesigned Quota Box (Blockquote) matching other pages (with border-l and compact height) */}
              <div className="relative bg-[#482476] border-l-[3px] border-l-[#A682FF] rounded-[18px] p-6 sm:p-8 pr-6 sm:pr-10 pl-12 flex flex-col justify-center shrink-0">
                {/* Quote Icon Box */}
                <div className="absolute left-0 -translate-x-1/2 top-[50%] -translate-y-1/2 w-8 h-8 rounded bg-[#482476] border border-[#A682FF]/30 flex items-center justify-center z-20 shadow-lg">
                  <Quote className="text-white fill-white w-4.5 h-4.5" />
                </div>
                <blockquote className="text-white text-[15px] sm:text-[16px] font-light italic leading-relaxed z-10 font-['Lexend'] text-left">
                  "Virtual dünyalar rəqəmsal qaçış vasitəsi olmaqdan çıxıb, real dünyanın yaralarını sağaldan ən güclü tibbi alətlərdən birinə çevrilir."
                </blockquote>
              </div>

              {/* Section 3: Phobia management */}
              <div className="flex flex-col gap-3 mt-2">
                <h3 className="text-[#1E0A42] text-[22px] md:text-[28px] font-bold tracking-tight">
                  Fobiyaların İdarə Edilməsi və Psixoloji Rifah
                </h3>
                <p className="text-[#1E0A42]/80 leading-relaxed text-[15px] sm:text-[16px]">
                  VR təkcə ağır travmaların deyil, gündəlik həyatı məhdudlaşdıran fobiyaların müalicəsində də inqilab edir. Yüksəklik qorxusu (akrofobiya), uçuş qorxusu (aerofobiya) və ya kütlə qarşısında çıxış etmək həyəcanı virtual auditoriyalar və simulyasiyalar vasitəsilə addım-addım aradan qaldırılır.
                </p>
                <p className="text-[#1E0A42]/80 leading-relaxed text-[15px] sm:text-[16px]">
                  Gələcəkdə süni intellekt və VR-ın sinerjisi sayəsində, tamamilə fərdiləşdirilmiş, pasientin real zamandakı ürək döyüntüsünə və emosional reaksiyalarına uyğun olaraq dəyişən rəqəmsal terapiya otaqları yaradılacaq. virtual dünyalar rəqəmsal qaçış vasitəsi olmaqdan çıxıb, real dünyanın yaralarını sağaldan ən güclü tibbi alətlərdən birinə çevrilir.
                </p>
              </div>

              {/* Back button link */}
              <button
                onClick={() => navigate(PATHS.WEBAPP_BLOG)}
                className="mr-auto mt-6 text-[#204F5E] hover:text-[#204F5E]/80 font-bold text-sm tracking-wide flex items-center gap-1.5 hover:underline cursor-pointer"
              >
                <span>← Geri qayıt</span>
              </button>

            </div>

          </div>

        </div>

        {/* Related Blogs Carousel Slider */}
        <div className="w-full mt-16 border-t border-[#E5DFDF] pt-12 text-left select-none relative group/slider">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[#1E0A42] text-[28px] font-semibold font-['Lexend']">
              Oxşar Bloqlar
            </h3>
            <Link
              to={PATHS.WEBAPP_BLOG}
              className="text-[#4D2059]/60 hover:text-[#4D2059] text-sm font-semibold transition-colors flex items-center gap-1.5 group select-none font-['Lexend']"
            >
              <span>Hamısını gör</span>
              <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>

          {/* Carousel Slider Wrapper */}
          <div className="w-full relative flex items-center">
            {/* Left Button */}
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-[-20px] z-10 w-11 h-11 rounded-full bg-white text-[#4D2059] shadow-lg border border-[#E5DFDF] flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all opacity-0 group-hover/slider:opacity-100 duration-300 select-none outline-none"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Right Button */}
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-[-20px] z-10 w-11 h-11 rounded-full bg-white text-[#4D2059] shadow-lg border border-[#E5DFDF] flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all opacity-0 group-hover/slider:opacity-100 duration-300 select-none outline-none"
            >
              <ChevronRight size={20} />
            </button>

            {/* Cards Scrollbox Container */}
            <div
              ref={scrollRef}
              className="w-full flex flex-row overflow-x-auto gap-[30.47px] scrollbar-hide scroll-smooth snap-x snap-mandatory py-4 h-[440px]"
            >
              {[
                {
                  id: 1,
                  image: digitalBrainImg,
                  categoryLabel: 'Psixologiya',
                  date: '12 Okt, 2024',
                  title: 'İmmersiyanın Elmi: Niyə VR Beyni İnanır?',
                  description: 'Virtual mühitin sinir sistemimizə təsiri və beynin rəqəmsal stimullara qarşı verdiyi reaksiyaların dərin analizi.',
                },
                {
                  id: 2,
                  image: digitalBrainImg,
                  categoryLabel: 'Psixologiya',
                  date: '12 Okt, 2024',
                  title: 'İmmersiyanın Elmi: Niyə VR Beyni İnanır?',
                  description: 'Virtual mühitin sinir sistemimizə təsiri və beynin rəqəmsal stimullara qarşı verdiyi reaksiyaların dərin analizi.',
                },
                {
                  id: 3,
                  image: digitalBrainImg,
                  categoryLabel: 'Psixologiya',
                  date: '12 Okt, 2024',
                  title: 'İmmersiyanın Elmi: Niyə VR Beyni İnanır?',
                  description: 'Virtual mühitin sinir sistemimizə təsiri və beynin rəqəmsal stimullara qarşı verdiyi reaksiyaların dərin analizi.',
                },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(PATHS.WEBAPP_BLOG_DETAIL.replace(':id', String(item.id)))}
                  className="bg-[#F8F9FA] rounded-[18px] overflow-hidden border border-[#E5DFDF] flex flex-col p-0 shadow-sm hover:shadow-md transition-shadow duration-300 w-full md:w-[385.96px] max-w-[385.96px] h-[411.99px] shrink-0 snap-start cursor-pointer group"
                >
                  {/* Card Image Cover wrapper */}
                  <div className="w-full h-[180px] rounded-t-[18px] rounded-b-none overflow-hidden relative shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-black/35 text-white text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full uppercase font-['Lexend']">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Card content container with padding */}
                  <div className="p-5 pt-3 pb-[26.68px] flex flex-col gap-[7.62px] flex-grow text-left">
                    {/* Meta details row */}
                    <div className="flex justify-between items-center text-[#1E0A42]/60 text-xs font-semibold font-['Lexend'] mt-1">
                      <span>{item.date}</span>
                      <span>4 dəq oxu</span>
                    </div>

                    {/* Title & Description details */}
                    <div className="flex flex-col flex-grow">
                      <h4 className="text-[#1E0A42] font-bold text-base leading-snug mb-1 line-clamp-2 font-['Lexend'] min-h-[44px] group-hover:text-[#4D2059] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[#1E0A42]/70 text-xs leading-relaxed line-clamp-3 font-['Lexend']">
                        {item.description}
                      </p>
                    </div>

                    {/* Footer CTA link */}
                    <div className="text-[#0D9488] font-bold text-sm tracking-wide flex items-center gap-1 hover:underline cursor-pointer font-['Lexend'] pt-1 mt-auto">
                      <span>Daha çox oxu</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
