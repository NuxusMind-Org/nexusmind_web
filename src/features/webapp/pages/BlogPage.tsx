import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, ChevronLeft, ChevronRight, Mic } from 'lucide-react';
import vrConsultationImg from '@/assets/vr_consultation.png';
import { PATHS } from '@/routes/paths';
import { blogsApi } from '@/api/blogs.api';
import { mapBlogToSimilarBlogCard } from '@/utils/contentMappers';
import { SIMILAR_BLOGS, type SimilarBlogCard } from '@/features/landing/constants/blog';

export const BlogPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [realBlogs, setRealBlogs] = useState<SimilarBlogCard[]>([]);
  const itemsPerPage = 6;

  useEffect(() => {
    let isMounted = true;
    blogsApi
      .getAll()
      .then((data) => {
        if (isMounted && Array.isArray(data)) {
          const mapped = data.map(mapBlogToSimilarBlogCard);
          setRealBlogs(mapped);
        }
      })
      .catch((err) => {
        console.warn('[WebappBlogPage] Failed to fetch blogs from backend:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const allBlogs = useMemo(() => {
    return [...realBlogs, ...SIMILAR_BLOGS];
  }, [realBlogs]);

  const filteredBlogs = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) return allBlogs;
    return allBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(trimmed) ||
        blog.description.toLowerCase().includes(trimmed) ||
        blog.badge.toLowerCase().includes(trimmed)
    );
  }, [allBlogs, searchQuery]);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage) || 1;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBlogs.slice(start, start + itemsPerPage);
  }, [filteredBlogs, currentPage, itemsPerPage]);

  const heroBlog = allBlogs[0];

  return (
    <div className="w-full flex flex-col rounded-t-[20px] md:rounded-t-[38.93px] rounded-b-[20px] md:rounded-b-[38.93px] overflow-hidden shadow-2xl bg-white animate-fade-in min-h-[calc(100vh-64px)] pb-20 opacity-100">
      {/* First Section: Top Header Section (Card with Gradient) - Height 188px */}
      <div
        className="w-full rounded-t-[20px] md:rounded-t-[38.93px] rounded-b-none h-auto min-h-[140px] sm:min-h-[160px] md:h-[188px] pt-5 sm:pt-[32px] pb-4 sm:pb-[24px] px-4 sm:px-6 md:px-[48px] flex flex-col justify-between items-center text-center opacity-100 relative"
        style={{
          background: 'linear-gradient(135deg, #CBE8FC 0%, #DDD4F8 33%, #F9D8E8 66%, #FFF5E6 100%)',
        }}
      >
        <h2 className="w-full text-center text-[28px] md:text-[46.72px] font-normal text-[#1E0A42] leading-[36px] md:leading-[59.84px] tracking-[-0.96px] font-['Lexend'] mt-1">
          Trendləri bizimlə izlə!
        </h2>

        {/* Centered Search Bar */}
        <div className="w-full max-w-[776px] relative flex items-center mt-3">
          <span className="absolute left-5 text-[#1E0A42]/50">
            <Search size={18} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Hər şeyi axtarın..."
            className="w-full pl-12 pr-6 py-3.5 bg-white rounded-full border border-[#C2B7D0] text-sm text-[#1E0A42] placeholder-[#1E0A42]/50 focus:outline-none focus:border-[#4D2059]/40 focus:ring-1 focus:ring-[#4D2059]/40 font-['Lexend'] transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Second Section: Featured Blog Card Container */}
      {heroBlog && (
        <div className="px-4 sm:px-6 md:px-[48px] py-6 sm:py-12 w-full flex flex-col items-center">
          {/* Featured Card */}
          <div className="w-full max-w-[1232px] h-auto md:h-[475.68px] mx-auto rounded-[18px] overflow-hidden border-[0.95px] border-white/22 bg-[#1E0F44] shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl shrink-0 flex flex-col md:flex-row">

            {/* Left Column: Image wrapper */}
            <div className="w-full md:w-[762px] h-[280px] md:h-[475.68px] shrink-0 relative">
              <img
                src={heroBlog.image || vrConsultationImg}
                alt={heroBlog.title}
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>

            {/* Right Column: Panel text and controls content */}
            <div className="w-full md:w-[470px] shrink-0 p-5 sm:p-8 md:pt-[46px] md:pr-[44px] md:pb-[42px] md:pl-[44px] flex flex-col justify-between text-left h-auto md:h-[475.68px] bg-[#1E0F44] text-white font-['Lexend']">

              {/* Top Details */}
              <div className="flex flex-col gap-[30.44px]">
                {/* Category pill and Date stamp */}
                <div className="flex items-center gap-[16px]">
                  <span className="bg-white/20 text-white text-[10px] tracking-widest px-3.5 py-1.5 rounded-full uppercase font-bold flex items-center justify-center h-[28px]">
                    {heroBlog.badge || 'BLOQLAR'}
                  </span>
                  <span className="text-white/60 text-xs">
                    {heroBlog.date}
                  </span>
                </div>

                {/* Title heading */}
                <h3 className="text-xl md:text-[28px] font-bold leading-snug tracking-tight text-white line-clamp-3">
                  {heroBlog.title}
                </h3>

                {/* Snippet Description */}
                <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                  {heroBlog.description}
                </p>
              </div>

              {/* Bottom Actions Row */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 w-full shrink-0">
                <span className="text-white/60 text-xs font-medium flex items-center gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-white/40"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  130 baxış
                </span>

                <button
                  onClick={() => navigate(PATHS.WEBAPP_BLOG_DETAIL.replace(':id', String(heroBlog.id)))}
                  className="px-6 py-2.5 bg-white text-[#1E0F44] font-bold text-xs md:text-sm rounded-full hover:bg-white/90 transition-colors duration-200 cursor-pointer"
                >
                  Davamını oxu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Third Section: Other Blogs grid and sidebar widgets */}
      <div className="px-4 sm:px-6 md:px-0 pb-16 sm:pb-20 w-full flex flex-col lg:flex-row justify-between gap-8 max-w-[1232px] mx-auto items-start">

        {/* Left Column: Other Blogs grid */}
        <div className="w-full lg:w-[863.93px] flex flex-col gap-8 text-left shrink-0">
          {/* Section title */}
          <h3 className="text-[#1E0A42] text-[28px] md:text-[32px] font-semibold font-['Lexend']">
            Digər bloqlar
          </h3>

          {/* Cards Grid: 3 columns */}
          {paginatedBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[11.95px] w-full max-w-[863.93px]">
              {paginatedBlogs.map((blog) => (
                <div
                  key={blog.id}
                  onClick={() => navigate(PATHS.WEBAPP_BLOG_DETAIL.replace(':id', String(blog.id)))}
                  className="bg-[#F6EFFF] rounded-[10.06px] overflow-hidden flex flex-col p-0 shadow-[1.26px_1.26px_1.26px_rgba(119,67,188,0.59)] hover:shadow-md transition-shadow duration-300 w-full md:w-[264.79px] max-w-[264.79px] h-[298.13px] mx-auto cursor-pointer group"
                >
                  {/* Image Cover */}
                  <div className="w-full h-[120px] rounded-t-[10.06px] rounded-b-none overflow-hidden relative shrink-0">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 bg-black/35 text-white text-[8px] font-bold tracking-widest px-2 py-0.5 rounded-full uppercase font-['Lexend']">
                      {blog.badge}
                    </span>
                  </div>

                  {/* Card content container with padding */}
                  <div className="p-3 pt-2.5 flex flex-col gap-[6.29px] flex-grow justify-between">
                    {/* Title and Summary */}
                    <div className="flex flex-col gap-[4px] text-left">
                      <h4 className="text-[#1E0A42] font-bold text-xs leading-snug line-clamp-2 font-['Lexend'] group-hover:text-[#4D2059] transition-colors">
                        {blog.title}
                      </h4>
                      <p className="text-[#1E0A42]/70 text-[10px] leading-relaxed line-clamp-3 font-['Lexend']">
                        {blog.description}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="flex justify-between items-center text-[#1E0A42]/60 text-[10px] font-semibold font-['Lexend'] border-t border-[#E5DFDF]/50 pt-2 mt-auto shrink-0">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} className="text-[#1E0A42]/40" />
                        {blog.date}
                      </span>
                      <span className="text-[#4D2059] hover:underline flex items-center gap-0.5 font-bold cursor-pointer">
                        Daha çox oxu
                        <span className="text-[9px]">&gt;</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center w-full">
              <span className="text-[#1E0A42]/50 text-base font-medium font-['Lexend']">
                Axtarışa uyğun bloq tapılmadı.
              </span>
            </div>
          )}

          {/* Pagination container */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8 select-none">
              {/* Prev button */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  currentPage === 1
                    ? 'bg-[#4D2059]/5 text-[#4D2059]/30 cursor-not-allowed'
                    : 'bg-[#4D2059]/10 text-[#4D2059] hover:bg-[#4D2059]/20 cursor-pointer'
                }`}
              >
                <ChevronLeft size={16} />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                    currentPage === pageNum
                      ? 'bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white shadow-md cursor-default'
                      : 'bg-[#4D2059]/10 text-[#4D2059] hover:bg-[#4D2059]/20 cursor-pointer'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              {/* Next button */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  currentPage === totalPages
                    ? 'bg-[#4D2059]/5 text-[#4D2059]/30 cursor-not-allowed'
                    : 'bg-[#4D2059]/10 text-[#4D2059] hover:bg-[#4D2059]/20 cursor-pointer'
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Sidebar Panels */}
        <div className="w-full lg:w-[348px] flex flex-col gap-8 shrink-0">

          {/* Widget 1: Newsletter Subscribe Card */}
          <div className="bg-[#1E0F44] rounded-[24px] p-8 shadow-xl flex flex-col gap-4 font-sans text-left relative overflow-hidden group text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#8B5CF6]/20 to-transparent rounded-full blur-2xl -mr-10 -mt-10" />
            <h4 className="text-xl font-bold tracking-tight font-['Lexend']">
              Bloqlardan xəbərdar ol
            </h4>
            <p className="text-xs text-white/70 leading-relaxed font-['Lexend']">
              Ən son VR texnologiyaları və psixoloji araşdırmalar haqqında məlumatları birbaşa elektron poçtunuza alın.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmailInput('');
              }}
              className="flex flex-col gap-3 mt-2"
            >
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="E-poçt ünvanınız"
                className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/20 text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#8B5CF6] transition-colors font-['Lexend']"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white font-bold text-xs rounded-xl hover:opacity-95 transition-opacity shadow-md cursor-pointer font-['Lexend'] uppercase tracking-wider"
              >
                Abunə Ol
              </button>
            </form>

            <span className="text-[10px] text-white/40 text-center mt-1 font-['Lexend']">
              İstənilən vaxt abunəliyi ləğv edə bilərsiniz.
            </span>
          </div>

          {/* Widget 2: Popular Topics Card */}
          <div className="bg-[#C2B7D0]/20 backdrop-blur-md rounded-[24px] p-8 border border-[#1E0A42]/10 flex flex-col gap-4 text-left">
            <h4 className="text-lg font-bold text-[#1E0A42] font-['Lexend'] border-b border-[#1E0A42]/10 pb-3">
              Populyar Mövzular
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                '#BeyinElmi',
                '#VRMetaverse',
                '#Terapevtikİnnovasiya',
                '#RəqəmsalDetoks',
                '#GələcəkPsixologiyası',
              ].map((topic, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 bg-[#4D2059]/10 hover:bg-[#4D2059]/20 text-[#4D2059] rounded-lg text-xs font-semibold font-['Lexend'] cursor-pointer transition-colors duration-150"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Widget 3: Sanctuary Podcast Card */}
          <div className="bg-[#1E0F44] rounded-[24px] p-8 shadow-xl flex flex-col gap-4 font-sans text-left relative overflow-hidden text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/30 flex items-center justify-center text-[#DDD4F8]">
                <Mic size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-white/50 font-['Lexend']">Həftəlik buraxılış</span>
                <span className="text-base font-bold text-white font-['Lexend']">Sanctuary Podkast</span>
              </div>
            </div>
            <p className="text-xs text-white/70 leading-relaxed font-['Lexend'] mt-1">
              &quot;Rəqəmsal Dünyada İnsan Olmaq&quot; - Bu həftəlik qonağımız Dr. Leyla Əliyeva ilə maraqlı söhbəti dinləyin.
            </p>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer font-['Lexend'] mt-2">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-ping" />
              İndi Dinlə
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
