import { useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Share2, Bookmark, Calendar, Clock, ChevronRight, Quote, Check, Mic, Play, ChevronLeft } from 'lucide-react';
import { NEWS_ITEMS } from '@/features/landing/constants/news';
import { PATHS } from '@/routes/paths';
import workshopImage from '@/assets/gallery/gallery_workshop.png';
import newsTherapyRoom from '@/assets/news/news_therapy_room.png';
import newsBrainArt from '@/assets/news/news_brain_art.png';
import newsLakeDock from '@/assets/news/news_lake_dock.png';

export const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const cardWidth = 385.957 + 30.47; // Card width 385.95px + gap 30.47px
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Find article by id, default to the first one if not found
  const articleId = id ? parseInt(id, 10) : 1;
  const article = NEWS_ITEMS.find((item) => item.id === articleId) || NEWS_ITEMS[0];

  return (
    <div className="w-full flex flex-col rounded-t-[20px] md:rounded-t-[38.93px] rounded-b-[20px] md:rounded-b-[38.93px] overflow-hidden shadow-2xl bg-white animate-fade-in min-h-[calc(100vh-64px)] pb-20 opacity-100">
      {/* Top Header Section (Card with Gradient) - Height 188px according to Figma layout */}
      <div
        className="w-full rounded-t-[20px] md:rounded-t-[38.93px] rounded-b-none h-auto min-h-[140px] sm:min-h-[160px] md:h-[188px] pt-5 sm:pt-[36px] pb-4 sm:pb-[28px] px-4 sm:px-6 md:px-[48px] flex flex-col justify-between items-center text-center opacity-100"
        style={{
          background: 'linear-gradient(135deg, #CBE8FC 0%, #DDD4F8 33%, #F9D8E8 66%, #FFF5E6 100%)',
        }}
      >
        <h2 className="w-full text-center text-[28px] md:text-[46.72px] font-normal text-[#1E0A42] leading-[36px] md:leading-[59.84px] tracking-[-0.96px] font-['Lexend'] mt-2">
          Son məlumatlardan xəbərdar ol!
        </h2>

        {/* Breadcrumbs navigation */}
        <div className="w-full flex items-center justify-start gap-2 text-xs sm:text-sm text-[#1E0A42]/70 font-semibold font-['Lexend'] select-none overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link to={PATHS.DASHBOARD} className="hover:text-[#4D2059] transition-colors">
            Ana səhifə
          </Link>
          <ChevronRight size={14} className="text-[#1E0A42]/50" />
          <Link to={PATHS.WEBAPP_NEWS} className="hover:text-[#4D2059] transition-colors">
            Xəbərlər
          </Link>
          <ChevronRight size={14} className="text-[#1E0A42]/50" />
          <span className="text-[#4D2059] font-bold">Psixoloji Sağlamlıq</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="px-4 sm:px-6 md:px-[48px] py-6 sm:py-12 w-full flex flex-col gap-8 max-w-[1227.5px] mx-auto">
        {/* Cover Image banner card */}
        <div className="w-full rounded-[16px] sm:rounded-[22.75px] overflow-hidden relative min-h-[300px] sm:min-h-[420px] md:h-[582px] flex flex-col justify-end p-5 sm:p-8 md:p-12 shadow-xl shrink-0 group">
          {/* Background image cover */}
          <img
            src={article.image}
            alt={article.title}
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
                {article.categoryLabel}
              </span>
              <span className="flex items-center gap-1.5 text-white/80">
                <Calendar size={14} className="text-white/60" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5 text-white/80">
                <Clock size={14} className="text-white/60" />
                8 dəq oxu
              </span>
            </div>

            {/* Main title */}
            <h2 className="text-2xl md:text-[36px] font-bold leading-tight text-white font-['Lexend'] mt-2">
              {article.title}
            </h2>
          </div>
        </div>

        {/* Content body layout section */}
        <div className="w-full flex flex-col lg:flex-row gap-12 mt-6 items-start">
          {/* Left Column: Article Body Content (68%) */}
          <div className="w-full lg:w-[68%] flex flex-col gap-6 text-left text-[#1E0A42]/90 leading-relaxed font-normal text-[15px] sm:text-[16px] font-['Lexend']">
            {/* Intro paragraph */}
            <p className="text-base md:text-[17px] font-medium text-[#1E0A42] leading-relaxed">
              {article.description}
            </p>

            {/* Section 1: Purpose */}
            <div className="mt-2">
              <h3 className="text-[#1E0A42] text-[22px] md:text-[26px] font-semibold mb-3 tracking-tight">
                Proqramın Məqsədi
              </h3>
              <p>
                Proqramın məqsədi psixologiya sahəsində inkişaf etmək istəyən şəxslərə fərdi dəstək vermək, peşəkar məqsədlərin sistemli planlanması və real təcrübədən öyrənmə imkanı yaratmaqdır.
              </p>
            </div>

            {/* Premium Quota Box (Blockquote) */}
            <div className="my-6 relative bg-[#482476] border-l-[3px] border-l-[#A682FF] rounded-[18px] p-6 sm:p-8 pr-6 sm:pr-10 pl-10 sm:pl-12 flex flex-col gap-3 shrink-0">
              {/* Quote Icon Box */}
              <div className="absolute left-0 -translate-x-1/2 top-10 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded bg-[#482476] border border-[#A682FF]/30 flex items-center justify-center z-20 shadow-lg">
                <Quote className="text-white fill-white w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              <blockquote className="text-white text-[16px] font-light italic leading-relaxed z-10">
                "Həqiqi şəfa insanın öz daxili səssizliyini kəşf etdiyi andan başlayır. Biz sadəcə bu yolda bələdçilik edirik."
              </blockquote>
              <cite className="text-[#A682FF] text-[14px] font-semibold not-italic z-10">
                — Dr. Leyla Rəhimova
              </cite>
            </div>

            {/* Section 2: Structure */}
            <div className="mt-2">
              <h3 className="text-[#1E0A42] text-[22px] md:text-[26px] font-semibold mb-3 tracking-tight">
                Proqramın Strukturu
              </h3>
              <p className="mb-4">
                Proqram 3 ay davam edəcək. Həftədə 1 dəfə fərdi seans və ayda 1 dəfə ödənişsiz master-klas və ya qrup işi keçiriləcək.
              </p>

              {/* Checkmarks bullet list */}
              <ul className="flex flex-col gap-3.5 pl-1 mb-6">
                {[
                  'Fərdi mentorluq seansları',
                  'Peşəkar inkişaf planının hazırlanması',
                  'Ayda bir dəfə ödənişsiz master-klaslar',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#1E0A42]/90">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#482476]/10 border border-[#482476]/30 text-[#482476] shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="font-light text-[14px] sm:text-[15px]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* In-body Event Image */}
            <div className="w-full rounded-[18px] overflow-hidden border border-[#E5DFDF] shadow-md my-2">
              <img
                src={workshopImage}
                alt="Mentorluq Proqramı Təlim"
                className="w-full h-auto object-cover max-h-[360px]"
              />
            </div>

            {/* Image caption */}
            <p className="text-[#1E0A42]/60 text-[13px] sm:text-[14px] italic text-center font-light mt-1">
              Qeydiyyatdan keçən hər iştirakçı öz inkişaf istiqamətinə uyğun mentor seçə bilər. İlk seansda hədəflər müəyyənləşdirilir və aylıq plan hazırlanır.
            </p>

            {/* Back button link */}
            <button
              onClick={() => navigate(PATHS.WEBAPP_NEWS)}
              className="mr-auto mt-8 text-[#204F5E] hover:text-[#204F5E]/80 font-bold text-sm tracking-wide flex items-center gap-1.5 hover:underline cursor-pointer"
            >
              <span>← Geri qayıt</span>
            </button>
          </div>

          {/* Right Column: Sidebar Panels (32%) */}
          <div className="w-full lg:w-[32%] flex flex-col gap-8 shrink-0">
            {/* Widget 1: Need Support Card */}
            <div className="bg-[#482476] rounded-[24px] p-8 shadow-xl flex flex-col gap-4 font-sans text-left relative overflow-hidden group">
              {/* Decorative circle glow */}
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
            <div className="flex flex-col gap-4 text-left">
              <h4 className="text-[#1E0A42] text-[20px] font-semibold font-['Lexend']">
                Populyar Mövzular
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {[
                  'Meditasiya',
                  'Təşviş',
                  'Yuxu',
                  'Özünü Tanıma',
                  'Uşaq Psixologiyası',
                ].map((topic, idx) => (
                  <button
                    key={idx}
                    className="bg-[#4D2059]/10 rounded-full px-4 py-2 text-[12px] font-medium text-[#4D2059] hover:bg-[#4D2059]/15 transition-all duration-300 cursor-pointer outline-none select-none font-['Lexend'] border-0"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Widget 3: Sanctuary Podcast Player Card */}
            <div className="bg-[#0A072B] rounded-[24px] p-8 shadow-xl flex flex-col gap-6 font-sans text-left relative overflow-hidden group">
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

        {/* Related News Carousel Slider */}
        <div className="w-full mt-16 border-t border-[#E5DFDF] pt-12 text-left select-none relative group/slider">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[#1E0A42] text-[28px] font-semibold font-['Lexend']">
              Oxşar Xəbərlər
            </h3>
            <Link
              to={PATHS.WEBAPP_NEWS}
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
                  id: 101,
                  image: newsTherapyRoom,
                  categoryLabel: 'Terapiya',
                  date: '12 May, 2024',
                  title: 'İlk Terapiya Seansı: Nələri Gözləməli?',
                  description: 'Psixoloqla ilk görüş həm həyəcanlı, həm də ümidverici ola bilər. Budur bilməli olduqlarımız...',
                },
                {
                  id: 102,
                  image: newsBrainArt,
                  categoryLabel: 'Tədbir',
                  date: '10 May, 2024',
                  title: 'Seminar: Beyin və Emosiyalar',
                  description: 'Hislərimizin bioloji əsaslarını anlamaq özümüzü idarə etməyə necə kömək edir?',
                },
                {
                  id: 103,
                  image: newsLakeDock,
                  categoryLabel: 'Elan',
                  date: '08 May, 2024',
                  title: 'Rəqəmsal Detoks: 10 günlük təlim',
                  description: 'Ekranlardan uzaqlaşmağın psixoloji faydaları və tətbiq üsulları haqqında bələdçi.',
                },
                {
                  id: 104,
                  image: newsTherapyRoom,
                  categoryLabel: 'Terapiya',
                  date: '06 May, 2024',
                  title: 'Narahatlıqla Mübarizə: 5 Praktik Addım',
                  description: 'Gündəlik həyatda yaranan narahatlıq və təşviş hissini azaltmaq üçün effektiv yollar.',
                },
                {
                  id: 105,
                  image: newsBrainArt,
                  categoryLabel: 'Təlim',
                  date: '04 May, 2024',
                  title: 'Emosional Zəka və Peşəkar Uğur',
                  description: 'Peşəkar karyerada emosiyaların rolu və onları idarə etmək bacarığının əhəmiyyəti.',
                }
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(PATHS.WEBAPP_NEWS_DETAIL.replace(':id', String(item.id)))}
                  className="bg-[#F8F9FA] rounded-[18px] overflow-hidden border border-[#E5DFDF] flex flex-col p-4 pb-[26.68px] gap-[7.62px] shadow-sm hover:shadow-md transition-shadow duration-300 w-full md:w-[385.96px] max-w-[385.96px] h-[411.99px] shrink-0 snap-start cursor-pointer group"
                >
                  {/* Card Image Cover wrapper */}
                  <div className="w-full h-[180px] rounded-[12px] overflow-hidden relative shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-black/35 text-white text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full uppercase font-['Lexend']">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Meta details row */}
                  <div className="flex justify-between items-center text-[#1E0A42]/60 text-xs font-semibold font-['Lexend'] mt-1">
                    <span>{item.date}</span>
                    <span>5 dəq oxu</span>
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
