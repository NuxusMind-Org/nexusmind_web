import { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Mic, Play, Quote, Settings, Brain, ChevronLeft } from 'lucide-react';
import newsBrainArtImg from '@/assets/news/news_brain_art.png';
import digitalBrainImg from '@/assets/digital_brain.png';
import { PATHS } from '@/routes/paths';

export const ArticleDetailPage = () => {
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
      
      {/* First Section: Top Header Section (Card with Gradient) - Width: 1279px, Height: 271px */}
      <div
        className="w-full rounded-t-[20px] md:rounded-t-[38.93px] rounded-b-none h-auto min-h-[220px] sm:min-h-[250px] md:h-[271px] pt-6 sm:pt-[50px] pb-6 md:pb-[40px] px-4 sm:px-6 md:px-[48px] flex flex-col justify-between items-center text-center opacity-100 relative"
        style={{
          background: 'linear-gradient(135deg, #CBE8FC 0%, #DDD4F8 33%, #F9D8E8 66%, #FFF5E6 100%)',
        }}
      >
        {/* Centered Heading */}
        <h2 className="w-full text-center text-[28px] md:text-[46.72px] font-normal text-[#1E0A42] leading-[36px] md:leading-[59.84px] tracking-[-0.96px] font-['Lexend'] mt-1">
          Elmi məqalələrlə psixoloji biliklərinizi artırın !
        </h2>

        {/* Left-aligned Breadcrumbs at the bottom */}
        <div className="w-full flex items-center justify-start gap-2 text-xs sm:text-sm text-[#1E0A42]/70 font-semibold font-['Lexend'] mt-auto select-none overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link to={PATHS.DASHBOARD} className="hover:text-[#4D2059] transition-colors">
            Ana səhifə
          </Link>
          <ChevronRight size={14} className="text-[#1E0A42]/50" />
          <Link to={PATHS.WEBAPP_ARTICLE} className="hover:text-[#4D2059] transition-colors">
            Məqalələr
          </Link>
          <ChevronRight size={14} className="text-[#1E0A42]/50" />
          <span className="text-[#4D2059] font-bold">Psixoloji Sağlamlıq</span>
        </div>
      </div>

      {/* Second Section: Split Hero Details Section */}
      <div className="px-4 sm:px-6 md:px-[48px] py-6 sm:py-12 w-full flex flex-col lg:flex-row gap-8 sm:gap-12 mt-4 items-center justify-between max-w-[1232px] mx-auto border-b border-[#E5DFDF]/50 pb-8 sm:pb-12">
        
        {/* Left Column: Title, Category Badge, and Buttons */}
        <div className="w-full lg:w-[42%] flex flex-col items-start text-left">
          {/* Turquoise Category Tag Badge */}
          <div className="bg-[#EBFBF7] text-[#0D9488] text-[11px] font-bold tracking-wider px-3.5 py-2 rounded-full uppercase font-['Lexend'] inline-flex items-center gap-1.5 self-start select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
            KLİNİK ARAŞDIRMA
          </div>

          {/* Heading Title */}
          <h1 className="text-2xl md:text-[38px] lg:text-[40px] font-bold leading-tight text-[#1E0A42] font-['Lexend'] text-left mt-5 max-w-[520px]">
            VR Terapiyasının Travma Müalicəsində Effektivliyi
          </h1>

          {/* Buttons Row */}
          <div className="flex items-center gap-4 mt-8 flex-wrap">
            <button className="bg-[#482476] hover:bg-[#3b1d62] text-white text-sm font-semibold px-8 py-3.5 rounded-full transition-colors cursor-pointer border-0 outline-none select-none font-['Lexend'] shadow-sm">
              İndi yoxla
            </button>
            <button className="border border-[#482476] text-[#482476] hover:bg-[#482476]/5 text-sm font-semibold px-8 py-3.5 rounded-full transition-colors cursor-pointer outline-none select-none font-['Lexend'] bg-transparent">
              Mütəxəssislə görüş
            </button>
          </div>
        </div>

        {/* Right Column: Hero Cover Image Card displaying VR portal */}
        <div className="w-full lg:w-[58%] rounded-[24px] overflow-hidden shadow-xl border border-white/10 shrink-0 relative aspect-[1.6]">
          <img
            src={newsBrainArtImg}
            alt="VR Terapiya Portalı"
            className="w-full h-full object-cover hover:scale-[1.01] transition-transform duration-700"
          />
        </div>

      </div>

      {/* Third Section: Split Columns Article Content with Drop-Cap, Quote Box, and Right Sidebar */}
      <div className="px-4 sm:px-6 md:px-[48px] py-6 sm:py-12 w-full flex flex-col lg:flex-row gap-8 sm:gap-12 items-start justify-between max-w-[1232px] mx-auto">
        
        {/* Left Column: Article Content (68% width) */}
        <div className="w-full lg:w-[68%] flex flex-col gap-6 text-left text-[#1E0A42]/90 leading-relaxed font-normal text-[15px] sm:text-[16px] font-['Lexend']">
          
          {/* Paragraph with Drop Cap 'V' */}
          <p className="text-[#1E0A42]/80 leading-relaxed">
            <span className="float-left text-5xl md:text-6xl font-bold pr-2 text-[#482476] leading-none mt-1.5 font-['Lexend']">V</span>
            irtual Reallıq (VR) texnologiyası müasir psixoterapiyada inqilabi bir alətə çevrilmişdir. Xüsusilə Post-Travmatik Stress Pozğunluğu (PTSP) və digər travma ilə əlaqəli vəziyyətlərin müalicəsində "Exposure Therapy" (Təsir Terapiyası) metodunu daha idarəolunan və təhlükəsiz mühitdə tətbiq etməyə imkan verir. Nexus Mind platforması bu kliniki yanaşmanı ən son VR innovasiyaları ilə birləşdirərək xəstələrin sağalma müddətini 40% sürətləndirir.
          </p>

          {/* Heading */}
          <h3 className="text-[#1E0A42] text-[22px] md:text-[28px] font-bold tracking-tight mt-4">
            Klinik Üstünlüklər və Metodologiya
          </h3>

          {/* Paragraph */}
          <p className="text-[#1E0A42]/80 leading-relaxed">
            Ənənəvi travma terapiyasından fərqli olaraq, VR mühiti pasiyentə travmatik xatirələrlə tədricən və mütəxəssis nəzarəti altında qarşılaşma şansı verir. Sistem, pasiyentin biometrik göstəricilərini (ürək döyüntüsü, göz bəbəklərinin reaksiyası) real vaxtda izləyərək simulyasiyanın intensivliyini avtomatik tənzimləyir.
          </p>

          {/* Redesigned Quote box matching the BlogDetailPage (Lavender left border, Quote badge) */}
          <div className="relative bg-[#482476] border-l-[3px] border-l-[#A682FF] rounded-[18px] p-6 sm:p-8 pr-6 sm:pr-10 pl-12 flex flex-col justify-center shrink-0 my-4">
            {/* Quote Icon Box */}
            <div className="absolute left-0 -translate-x-1/2 top-[50%] -translate-y-1/2 w-8 h-8 rounded bg-[#482476] border border-[#A682FF]/30 flex items-center justify-center z-20 shadow-lg">
              <Quote className="text-white fill-white w-4.5 h-4.5" />
            </div>
            <blockquote className="text-white text-[15px] sm:text-[16px] font-light italic leading-relaxed z-10 font-['Lexend'] text-left">
              "VR terapiyası beynin neyroplastikliyini stimullaşdıraraq, travmatik neyron yollarının yenidən formalaşmasına kömək edir. Bu, sadəcə texnologiya deyil, yeni bir nevroloji şəfa yoludur."
            </blockquote>
          </div>

          {/* Closing Paragraph */}
          <p className="text-[#1E0A42]/80 leading-relaxed">
            Metodologiyamızın əsasını fərdiləşdirilmiş ssenarilər təşkil edir. Hər bir pasiyent üçün xüsusi olaraq dizayn edilmiş virtual dünyalar, onlara öz qorxuları ilə güvənli bir zonada üzləşməyə şərait yaradır. Bu, klinik şəraitdə əldə edilən nəticələrin gündəlik həyata transferini daha effektiv edir.
          </p>
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

      {/* Full-width descriptive cards container at the bottom */}
      <div className="px-4 sm:px-6 md:px-[48px] py-6 w-full flex flex-col md:flex-row gap-4 sm:gap-[10.85px] items-center justify-center max-w-[1232px] mx-auto">
        
        {/* Card 1: Tam Nəzarət */}
        <div className="w-full md:w-[563px] max-w-[563px] h-auto min-h-[220px] sm:min-h-[286px] rounded-[21.69px] bg-[#181445] border-[1.36px] border-[#4D4354]/20 p-5 sm:p-[43.38px] flex flex-col gap-[10.85px] text-left shrink-0 shadow-lg justify-center">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded bg-white/10 flex items-center justify-center shrink-0">
              <Settings size={22} className="text-[#DDB7FF]" />
            </span>
            <span className="text-[#E3DFFF] font-semibold text-[27.11px] leading-[37.96px] font-['Lexend'] tracking-tight">
              Tam Nəzarət
            </span>
          </div>
          <p className="text-white font-normal text-[21.16px] leading-[32.54px] font-['Lexend']">
            Terapevt virtual mühitdəki hər bir detalı — səsləri, vizual effektləri, günün saatını və hadisələrin intensivliyini pasientin dözümlülük səviyyəsinə uyğun tənzimləyir.
          </p>
        </div>

        {/* Card 2: Beynin Reaksiyası */}
        <div className="w-full md:w-[563px] max-w-[563px] h-auto min-h-[220px] sm:min-h-[286px] rounded-[21.69px] bg-[#181445] border-[1.36px] border-[#4D4354]/20 p-5 sm:p-[43.38px] flex flex-col gap-[10.85px] text-left shrink-0 shadow-lg justify-center">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded bg-white/10 flex items-center justify-center shrink-0">
              <Brain size={22} className="text-[#DDB7FF]" />
            </span>
            <span className="text-[#E3DFFF] font-semibold text-[27.11px] leading-[37.96px] font-['Lexend'] tracking-tight">
              Beynin Reaksiyası
            </span>
          </div>
          <p className="text-white font-normal text-[21.16px] leading-[32.54px] font-['Lexend']">
            Virtual dünya süni olsa da, insan beyni oradakı təhlükəsizlik hissini real qəbul edir və travmatik xatirəyə qarşı dözümlülük (desensitizasiya) qazanır.
          </p>
        </div>

      </div>

      {/* Related Blogs Carousel Slider */}
      <div className="w-full mt-8 sm:mt-12 border-t border-[#E5DFDF]/50 pt-8 sm:pt-12 text-left select-none relative group/slider px-4 sm:px-6 md:px-[48px] max-w-[1232px] mx-auto">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-[#1E0A42] text-[28px] font-semibold font-['Lexend']">
            Oxşar bloqlar
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
                categoryLabel: 'TEXNOLOGİYA',
                title: 'VR Qulaqlıqların Neyro-interfeys İnkişafı',
                description: 'Növbəti nəsil cihazlar beyin dalğalarını necə daha dəqiq oxuyur?',
              },
              {
                id: 2,
                image: digitalBrainImg,
                categoryLabel: 'TEXNOLOGİYA',
                title: 'VR Qulaqlıqların Neyro-interfeys İnkişafı',
                description: 'Növbəti nəsil cihazlar beyin dalğalarını necə daha dəqiq oxuyur?',
              },
              {
                id: 3,
                image: digitalBrainImg,
                categoryLabel: 'TEXNOLOGİYA',
                title: 'VR Qulaqlıqların Neyro-interfeys İnkişafı',
                description: 'Növbəti nəsil cihazlar beyin dalğalarını necə daha dəqiq oxuyur?',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => navigate(PATHS.WEBAPP_ARTICLE_DETAIL.replace(':id', String(item.id)))}
                className="bg-[#F8F9FA] rounded-[18px] overflow-hidden border border-[#E5DFDF] flex flex-col p-0 shadow-sm hover:shadow-md transition-shadow duration-300 w-full md:w-[385.96px] max-w-[385.96px] h-[411.99px] shrink-0 snap-start cursor-pointer group"
              >
                {/* Card Image Cover wrapper */}
                <div className="w-full h-[180px] rounded-t-[18px] rounded-b-none overflow-hidden relative shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                {/* Card content container with padding */}
                <div className="p-5 pt-3 pb-[26.68px] flex flex-col gap-[7.62px] flex-grow text-left">
                  {/* Tag label */}
                  <span className="text-[#0D9488] text-[10px] font-bold tracking-widest uppercase font-['Lexend'] text-left">
                    {item.categoryLabel}
                  </span>

                  {/* Title & Description details */}
                  <div className="flex flex-col flex-grow">
                    <h4 className="text-[#1E0A42] font-bold text-base leading-snug mb-1 line-clamp-2 font-['Lexend'] min-h-[44px] group-hover:text-[#4D2059] transition-colors text-left">
                      {item.title}
                    </h4>
                    <p className="text-[#1E0A42]/70 text-xs leading-relaxed line-clamp-3 font-['Lexend'] text-left">
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

      {/* Geri qayıt back navigation link container */}
      <div className="px-4 sm:px-6 md:px-[48px] w-full max-w-[1232px] mx-auto text-left mt-8">
        <button
          onClick={() => navigate(PATHS.WEBAPP_ARTICLE)}
          className="text-[#204F5E] hover:text-[#204F5E]/80 font-bold text-sm tracking-wide flex items-center gap-1.5 hover:underline cursor-pointer font-['Lexend'] border-0 bg-transparent outline-none"
        >
          <span>← Geri qayıt</span>
        </button>
      </div>

    </div>
  );
};
