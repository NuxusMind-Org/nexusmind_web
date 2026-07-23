import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Search, Calendar, ChevronLeft, ChevronRight, Mic, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { PATHS } from '@/routes/paths';
import { Footer } from '../components/Footer';
import { LandingNavbar } from '../components/LandingNavbar';
import vrConsultation from '@/assets/vr_consultation.png';
import newsBrainArt from '@/assets/news/news_brain_art.png';
import newsLakeDock from '@/assets/news/news_lake_dock.png';
import newsTherapyRoom from '@/assets/news/news_therapy_room.png';
import newsAnnouncement from '@/assets/news/news_announcement.png';

interface SimilarBlogCard {
  id: number;
  badge: string;
  image: string;
  title: string;
  description: string;
  date: string;
}

const SIMILAR_BLOGS: SimilarBlogCard[] = [
  {
    id: 1,
    badge: 'Psixologiya',
    image: newsBrainArt,
    title: 'İmmersiyanın Elmi: Niyə VR Beyni İnanır?',
    description: 'Virtual mühitin sinir sistemimizə təsiri və beynin rəqəmsal stimullara qarşı verdiyi reaksiyaların dərin analizi.',
    date: '12 Okt, 2024',
  },
  {
    id: 2,
    badge: 'Sağlamlıq',
    image: newsLakeDock,
    title: 'VR Meditasiya Texnikaları: Daxili Sükut',
    description: 'Müasir dünyada stresslə mübarizə üçün virtual mühitlərin təqdim etdiyi əən effektiv meditasiya üsulları.',
    date: '10 Okt, 2024',
  },
  {
    id: 3,
    badge: 'Simulyasiya',
    image: newsTherapyRoom,
    title: 'Fobiyaların VR ilə Aradan Qaldırılması',
    description: 'Ekspozisiya terapiyasının virtual məkanda tətbiqi: Qorxularınızla təhlükəsiz şəkildə üzləşin.',
    date: '08 Okt, 2024',
  },
  {
    id: 4,
    badge: 'İnnovasiya',
    image: newsAnnouncement,
    title: 'Rəqəmsal Etika və Virtual Terapiya',
    description: 'Virtual dünyalarda aparılan müalicə seanslarının gizliliyi və etik standartlarının gələcəyi haqqında düşüncələr.',
    date: '05 Okt, 2024',
  },
];

const POPULAR_TOPICS = [
  '#BeyinElmi',
  '#VRMetaverse',
  '#Terapevtikİnnovasiya',
  '#RəqəmsalDetoks',
  '#GələcəkPsixologiyası',
];

export const BlogPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBlogs = SIMILAR_BLOGS.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.badge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white" style={{ background: "linear-gradient(180deg, #263151 5%, #245D68 45%, #914899 95%)" }}>
      <LandingNavbar activePage="blog" />

      {/* Page Content */}
      <div className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[40px] sm:pt-[60px] pb-[80px] flex flex-col items-center gap-10">
        
        {/* Left-Aligned Header Section */}
        <div className="w-full max-w-[1295px] text-left">
          <h1 className="text-[36px] sm:text-[48px] font-semibold text-white tracking-tight leading-tight">
            Bloqlar
          </h1>
          <p className="text-white/60 text-[15px] sm:text-[16px] font-light mt-2">
            Psixologiya ilə bağlı bloqlar
          </p>
        </div>

        {/* Featured Hero Blog Card */}
        <div
          onClick={() => navigate(PATHS.BLOG_DETAIL.replace(':id', '1'))}
          className="w-full max-w-[1295px] flex flex-col lg:flex-row border border-[#FFFFFF38] rounded-[12px] overflow-hidden bg-[#FFFFFF0D] backdrop-blur-md hover:border-white/30 transition-all duration-300 lg:h-[500px] lg:min-h-[500px] cursor-pointer group"
        >
          {/* Left Block - Image */}
          <div className="w-full lg:w-[58%] aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden relative">
            <img
              src={vrConsultation}
              alt="VR Terapiya"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>

          {/* Right Block - Text Details */}
          <div className="w-full lg:w-[42%] p-8 sm:p-10 flex flex-col justify-between bg-transparent text-left gap-6 lg:gap-0 lg:h-full">
            {/* Header Row */}
            <div className="flex items-center justify-between w-full">
              <span className="text-white text-[11px] font-semibold tracking-wider bg-[#4C5975] px-3.5 py-1 rounded-full uppercase select-none">
                BLOQLAR
              </span>
              <span className="text-white/50 text-[13px] font-light">
                24 Mart 2026
              </span>
            </div>

            {/* Title & Description */}
            <div className="flex flex-col gap-3">
              <h2 className="text-white text-[24px] sm:text-[28px] font-bold leading-tight tracking-tight group-hover:text-[#00f2ff] transition-colors duration-300">
                VR Terapiyasının Gələcəyi: Virtual Dünyalarda Sağalma
              </h2>
              <p className="text-white/70 text-[14px] sm:text-[15px] leading-relaxed font-light line-clamp-3 lg:line-clamp-4">
                Rəqəmsal üfüqlərin psixoloji rifahımızı necə dəyişdirdiyini və virtual reallığın travma müalicəsindəki inqilabi rolunu kəşf edin.
              </p>
            </div>

            {/* Footer Row */}
            <div className="flex items-center justify-between w-full mt-4">
              <div className="flex items-center gap-2 text-white/50 text-[14px] font-light select-none">
                <Eye className="w-4 h-4" />
                <span>130 baxış</span>
              </div>
              <button className="bg-[#5c16c5] hover:bg-[#6f25db] text-white text-[14px] font-semibold px-6 py-2.5 rounded-full cursor-pointer transition-all duration-300 select-none">
                Davamını oxu
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Bənzər bloqlar */}
        <div className="w-full max-w-[1295px] flex flex-col gap-6 mt-6">
          
          {/* Section Header */}
          <div className="w-full text-left">
            <h2 className="text-[28px] sm:text-[36px] font-bold text-white tracking-tight">
              Bənzər bloqlar
            </h2>
          </div>

          {/* Full-width Search Bar */}
          <div className="w-full relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Blogda axtar..."
              className="w-full h-[54px] bg-[#1a2847]/70 backdrop-blur-md border border-white/15 rounded-[14px] sm:rounded-full pl-6 pr-14 text-[15px] text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-all shadow-inner"
            />
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5 pointer-events-none" />
          </div>

          {/* Main Layout Grid: 2 Columns for Cards, 1 Column for Sidebar */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start mt-2">
            
            {/* Left/Center Column: 2x2 Blog Cards Grid */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  onClick={() => navigate(PATHS.BLOG_DETAIL.replace(':id', String(blog.id)))}
                  className="bg-[#182a3c]/80 backdrop-blur-md border border-white/10 rounded-[18px] overflow-hidden flex flex-col justify-between hover:border-white/30 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                >
                  {/* Image & Badge Container */}
                  <div className="w-full aspect-[16/10] relative overflow-hidden bg-[#101c29]">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-[#111c2e]/70 backdrop-blur-md border border-white/20 text-white text-[12px] font-medium px-3.5 py-1 rounded-full select-none">
                      {blog.badge}
                    </span>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 flex flex-col justify-between flex-1 gap-4 text-left">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-white text-[18px] sm:text-[19px] font-bold leading-snug tracking-tight group-hover:text-[#00f2ff] transition-colors duration-200 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-white/70 text-[13.5px] leading-relaxed font-light line-clamp-3">
                        {blog.description}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between w-full pt-4 border-t border-white/10 text-[12.5px] text-white/60">
                      <div className="flex items-center gap-1.5 font-light select-none">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{blog.date}</span>
                      </div>
                      <span className="text-white/80 font-medium group-hover:text-white flex items-center gap-1 transition-colors select-none">
                        Daha çox oxu <ChevronRightIcon className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Sidebar Stack */}
            <div className="lg:col-span-1 flex flex-col gap-6 w-full">
              
              {/* Widget 1: Newsletter Subscription */}
              <div className="bg-[#121c3b]/90 backdrop-blur-md border border-white/10 rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-xl">
                <h3 className="text-white text-[20px] sm:text-[22px] font-bold tracking-tight">
                  Bloqlardan xəbərdar ol
                </h3>
                <p className="text-white/70 text-[13.5px] leading-relaxed font-light">
                  Ən son VR texnologiyaları və psixoloji araşdırmalar haqqında məlumatları birbaşa elektron poçtunuza alın.
                </p>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="E-poçt ünvanınız"
                  className="w-full h-[46px] bg-[#1a284b] border border-white/15 rounded-xl px-4 text-[14px] text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-all"
                />
                <button className="w-full h-[46px] bg-gradient-to-r from-[#7048ea] to-[#2c6df2] text-white font-semibold text-[14.5px] rounded-xl cursor-pointer hover:opacity-95 transition-opacity shadow-lg select-none">
                  Abunə Ol
                </button>
                <span className="text-white/40 text-[11.5px] text-center font-light select-none">
                  İstənilən vaxt abunəliyi ləğv edə bilərsiniz.
                </span>
              </div>

              {/* Widget 2: Popular Topics */}
              <div className="bg-[#cdd5de]/95 backdrop-blur-md rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-xl border border-white/20">
                <h3 className="text-[#190938] text-[18px] font-bold pb-3 border-b border-black/15">
                  Populyar Mövzular
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {POPULAR_TOPICS.map((topic, index) => (
                    <span
                      key={index}
                      className="bg-[#242d48] text-white/90 text-[12.5px] font-medium px-3.5 py-1.5 rounded-lg border border-white/10 hover:bg-[#343e60] cursor-pointer transition-colors select-none"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Widget 3: Sanctuary Podcast */}
              <div className="bg-[#121b3d]/90 backdrop-blur-md border border-white/10 rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2a3866] flex items-center justify-center shrink-0">
                    <Mic className="w-5 h-5 text-[#8b9eff]" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-white text-[16.5px] font-bold leading-tight">
                      Sanctuary Podkast
                    </h4>
                    <span className="text-white/50 text-[12px] font-light">
                      Həftəlik buraxılış
                    </span>
                  </div>
                </div>
                <p className="text-white/75 text-[13px] leading-relaxed font-light italic">
                  &ldquo;Rəqəmsal Dünyada İnsan Olmaq&rdquo; - Bu həftəlik qonağımız Dr. Leyla Əliyeva ilə maraqlı söhbəti dinləyin.
                </p>
                <button className="w-full h-[46px] border border-white/30 hover:bg-white/10 text-white font-medium text-[14px] rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all select-none">
                  <span>▶</span> İndi Dinlə
                </button>
              </div>

            </div>

          </div>

          {/* Pagination Controls */}
          <div className="w-full flex items-center justify-center gap-3 mt-10">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white/80 transition-all cursor-pointer select-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full text-[14px] font-semibold flex items-center justify-center transition-all cursor-pointer select-none ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-[#7048ea] to-[#3a7afb] text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-white/10 hover:bg-white/20 border border-white/15 text-white/80'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white/80 transition-all cursor-pointer select-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
};
