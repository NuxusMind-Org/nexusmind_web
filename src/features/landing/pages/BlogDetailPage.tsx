import { useRef, useMemo } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PATHS } from '@/routes/paths';
import { LandingNavbar } from '../components/LandingNavbar';
import { Footer } from '../components/Footer';
import { DetailPageSkeleton } from '../components/skeletons/DetailPageSkeleton';
import vrConsultationImg from '@/assets/vr_consultation.png';
import type { BlogResponse } from '@/api/types';
import { useBlogDetail, useBlogsList } from '../hooks/useContentQueries';
import {
  formatLocalizedDate,
  mapBlogToSimilarBlogCard,
  parseTimestamp,
  resolveContentLang,
} from '@/utils/contentMappers';
import { SIMILAR_BLOGS, POPULAR_TOPICS } from '../constants/blog';
import { SEO, AppIcon, SmartImage } from '@/components';
import { getLocalizedTitle } from '@/utils/multilingual';

export const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = resolveContentLang(i18n.resolvedLanguage || i18n.language);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: fetchedBlog, isLoading } = useBlogDetail(id);
  const { data: allBlogDtos } = useBlogsList();

  // Prefer live backend DTO; fall back to matching mock item when clicking a static mock blog card
  const blog: BlogResponse | null = useMemo(() => {
    if (fetchedBlog && (fetchedBlog.id || fetchedBlog.title)) {
      return fetchedBlog;
    }
    if (!id) return null;
    const numericId = Number(id);
    const mockFound = SIMILAR_BLOGS.find((item) => item.id === numericId);
    if (!mockFound) return null;

    if (numericId === 1) {
      return {
        id: 1,
        title: 'VR Terapiyasının Gələcəyi: Virtual Dünyalarda Sağalma',
        shortDescription:
          "Psixoterapiya klassik 'şüuraltı söhbətlər' üzərində qurulub. Lakin bu gün Virtual Reallıq (VR) texnologiyası bu sahədə tamamilə yeni bir səhifə açır.",
        introText:
          "Psixoterapiya klassik 'şüuraltı söhbətlər' üzərində qurulub. Lakin bu gün Virtual Reallıq (VR) texnologiyası bu sahədə tamamilə yeni bir səhifə açır. Bəs VR terapiyası klassik üsullardan nə ilə fərqlənir və o, insan beyninə necə təsir edir?",
        sections: [
          {
            order: 1,
            title: 'Ekspozisiya Terapiyasının Rəqəmsal Təkamülü',
            text: "Travma və Posttravmatik Stress Pozuntusunun (PTSP) müalicəsində ən effektiv metodlardan biri 'ekspozisiya' (üzləşmə) terapiyasıdır. Təhlükəsiz və tam nəzarət olunan bir klinika mühitində pasient xüsusi VR eynəkləri vasitəsilə qorxu və ya travma yaratmış mühitə vizual olaraq daxil edilir.",
          },
          {
            order: 2,
            title: 'Neyroplastiklik və Yeni Neyron Əlaqələri',
            text: "VR terapiyası beynin neyroplastiklik qabiliyyətindən istifadə edir. Təhlükəsiz virtual mühitdə qorxulu ssenarilərlə dəfələrlə qarşılaşan beyin köhnə 'təhlükə' siqnallarını silir və yerinə yeni, neytral neyron əlaqələri qurur.",
          },
        ],
        imageUrl: vrConsultationImg,
        category: 'BLOQ',
        authorName: 'Dr. Leyla Rəhimova',
        createdAt: '24 Mart 2026',
        slug: 'vr-terapiyasinin-geleceyi',
        metaTitle: 'VR Terapiyasının Gələcəyi: Virtual Dünyalarda Sağalma',
        metaDescription:
          'Psixoterapiyada Virtual Reallıq texnologiyası və ekspozisiya terapiyasının rəqəmsal təkamülü.',
      };
    }

    return {
      id: mockFound.id,
      title: mockFound.title,
      shortDescription: mockFound.description,
      introText: mockFound.description,
      imageUrl: mockFound.image,
      category: mockFound.badge,
      createdAt: mockFound.date,
      slug: String(mockFound.id),
      metaTitle: mockFound.title,
      metaDescription: mockFound.description,
    };
  }, [fetchedBlog, id]);

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

  const blogTitle = blog
    ? getLocalizedTitle(blog.title || blog.titleDto, lang, t('blog.title'))
    : '';

  const introText = blog
    ? getLocalizedTitle(blog.introText || blog.shortDescription, lang, '')
    : '';

  const sortedSections = useMemo(() => {
    if (!blog || !Array.isArray(blog.sections)) return [];
    return [...blog.sections].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [blog]);

  const formattedDate = blog?.createdAt
    ? formatLocalizedDate(blog.createdAt, lang, true)
    : '';

  const topicTags = useMemo(() => {
    if (blog?.metaKeywords && blog.metaKeywords.length > 0) {
      return blog.metaKeywords;
    }
    return POPULAR_TOPICS;
  }, [blog?.metaKeywords]);

  const relatedBlogs = useMemo(() => {
    const currentId = blog?.id ?? (id ? Number(id) : -1);
    const realBlogs = Array.isArray(allBlogDtos)
      ? allBlogDtos
          .filter((dto) => dto.id !== currentId)
          .sort((a, b) => parseTimestamp(b.createdAt) - parseTimestamp(a.createdAt))
          .map((dto) => mapBlogToSimilarBlogCard(dto, lang))
      : [];

    const realIds = new Set(realBlogs.map((item) => item.id));
    const mockFallback = SIMILAR_BLOGS.filter(
      (mock) => mock.id !== currentId && !realIds.has(mock.id)
    );

    return [...realBlogs, ...mockFallback].slice(0, 6);
  }, [allBlogDtos, blog?.id, id, lang]);

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white bg-landing-gradient">
      <LandingNavbar activePage="blog" />

      {/* State 1: Loading */}
      {isLoading && <DetailPageSkeleton />}

      {/* State 2: Error / Not Found */}
      {!isLoading && !blog && (
        <>
          <SEO
            metaTitle={`${t('blog.title')} | NexusMind`}
            metaDescription={t('blog.subtitle')}
            contentType="blog"
          />
          <main className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[60px] pb-[80px] flex flex-col items-center justify-center">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col items-center text-center gap-4 shadow-xl">
              <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-300">
                <AppIcon icon="lucide:alert-circle" className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white">{t('search.emptyTitle', 'Bloq tapılmadı')}</h2>
              <p className="text-sm text-white/70">
                {t('articles.notFoundDesc')}
              </p>
              <button
                type="button"
                onClick={() => navigate(PATHS.BLOG)}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-nav-action font-semibold transition-colors cursor-pointer border border-white/20"
              >
                <AppIcon icon="lucide:arrow-left" className="w-4 h-4" />
                <span>{t('blog.title')}</span>
              </button>
            </div>
          </main>
        </>
      )}

      {/* State 3: Success */}
      {!isLoading && blog && (
        <>
          <SEO
            metaTitle={blog.metaTitle || blogTitle}
            metaDescription={getLocalizedTitle(blog.metaDescription || blog.shortDescription, lang, '')}
            slug={blog.slug || blog.id}
            schemaMarkup={blog.schemaMarkup}
            metaKeywords={blog.metaKeywords}
            contentType="blog"
            image={blog.imageUrl || vrConsultationImg}
          />

          {/* Page Main Content */}
          <div className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[40px] sm:pt-[60px] pb-[80px] flex flex-col items-center gap-8">

            {/* Left-Aligned Header Section & Breadcrumbs */}
            <div className="w-full max-w-[1295px] text-left flex flex-col gap-3">
              <h1 className="text-[36px] sm:text-[48px] font-bold text-white tracking-tight leading-tight">
                {t('blog.title')}
              </h1>

              {/* Breadcrumbs Trace */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70 font-medium select-none overflow-x-auto no-scrollbar whitespace-nowrap">
                <Link to={PATHS.HOME} className="hover:text-white transition-colors">
                  {t('nav.home')}
                </Link>
                <AppIcon icon="lucide:chevron-right" size={14} className="text-white/40" />
                <Link to={PATHS.BLOG} className="hover:text-white transition-colors">
                  {t('blog.title')}
                </Link>
                <AppIcon icon="lucide:chevron-right" size={14} className="text-white/40" />
                <span className="text-[#a072ff] font-bold truncate max-w-[320px] sm:max-w-[520px]">
                  {blogTitle}
                </span>
              </div>
            </div>

            {/* Hero Banner Card */}
            <div className="w-full max-w-[1295px] h-[380px] sm:h-[480px] lg:h-[614px] rounded-[24px] overflow-hidden relative flex flex-col justify-end p-6 sm:p-10 lg:p-12 shadow-2xl shrink-0 group opacity-100 border border-white/10">
              {/* Cover Image */}
              <SmartImage
                src={blog.imageUrl || vrConsultationImg}
                fallbackSrc={vrConsultationImg}
                alt={blogTitle}
                fetchPriority="high"
                critical
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

              {/* Top Right Action Buttons */}
              <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg border border-white/20 select-none"
                >
                  <AppIcon icon="lucide:share-2" size={18} />
                </button>
                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg border border-white/20 select-none"
                >
                  <AppIcon icon="lucide:bookmark" size={18} />
                </button>
              </div>

              {/* Bottom Details Container */}
              <div className="relative z-20 text-left flex flex-col gap-4 max-w-[1000px]">
                {/* Meta Details Row */}
                <div className="flex flex-wrap items-center gap-4 text-white/95 text-xs font-semibold">
                  <span className="bg-[#3c2549]/80 backdrop-blur-md border border-white/20 text-white text-[10.5px] tracking-wider px-3.5 py-1.5 rounded-full uppercase font-bold select-none">
                    {blog.category || t('blog.title')}
                  </span>
                  {formattedDate && (
                    <span className="flex items-center gap-1.5 text-white/80 select-none">
                      <AppIcon icon="lucide:calendar" size={14} className="text-white/60" />
                      {formattedDate}
                    </span>
                  )}
                  {blog.authorName && (
                    <span className="flex items-center gap-1.5 text-white/80 select-none">
                      <AppIcon icon="lucide:user" size={14} className="text-white/60" />
                      {blog.authorName}
                    </span>
                  )}
                </div>

                {/* Glass Box Overlay Title */}
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug bg-white/10 backdrop-blur-md px-5 sm:px-8 py-3.5 rounded-[12px] border border-white/20 inline-block shadow-lg">
                    {blogTitle}
                  </h2>
                </div>
              </div>
            </div>

            {/* Content Section: Real Blog Body & Right Sidebar Stack */}
            <div className="w-full max-w-[1295px] flex flex-col lg:flex-row gap-10 mt-6 items-start justify-between">
              {/* Left Column: Main Article Content (68%) */}
              <div className="w-full lg:w-[68%] flex flex-col gap-6 text-left text-white/90 leading-relaxed font-light text-[15px] sm:text-[16px]">
                {introText && (
                  <p className="text-base sm:text-[17px] font-normal text-white leading-relaxed whitespace-pre-line">
                    {introText}
                  </p>
                )}

                {sortedSections.map((section, idx) => {
                  const heading = getLocalizedTitle(section.title, lang, '');
                  const body = getLocalizedTitle(section.text, lang, '');
                  if (!heading && !body) return null;

                  return (
                    <div key={`${section.order ?? idx}-${idx}`} className="mt-2 flex flex-col gap-3">
                      {heading && (
                        <h3 className="text-white text-[22px] sm:text-[28px] font-bold tracking-tight">
                          {heading}
                        </h3>
                      )}
                      {body && (
                        <p className="text-white/80 leading-relaxed text-[15px] sm:text-[16px] whitespace-pre-line">
                          {body}
                        </p>
                      )}
                    </div>
                  );
                })}

                {/* Back button */}
                <button
                  type="button"
                  onClick={() => navigate(PATHS.BLOG)}
                  className="mr-auto mt-4 text-[#00f2ff] hover:underline font-semibold text-sm flex items-center gap-2 cursor-pointer select-none"
                >
                  <span>← {t('blog.title')}</span>
                </button>
              </div>

              {/* Right Column: Sidebar Panels (32%) */}
              <div className="w-full lg:w-[32%] flex flex-col gap-6 shrink-0">
                {/* Widget 1: Need Support Card */}
                <div className="bg-[#C3CBD6]/95 backdrop-blur-md rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-xl border border-white/20 relative overflow-hidden">
                  <div className="flex items-center justify-between w-full">
                    <h4 className="text-[#1E0A42] text-[20px] font-bold tracking-tight">
                      Dəstək lazımdır?
                    </h4>
                    <AppIcon icon="lucide:flower-2" className="w-6 h-6 text-[#9a76be] shrink-0" />
                  </div>
                  <p className="text-[#1E0A42]/75 text-[14px] leading-relaxed font-normal">
                    Mütəxəssislərimiz sizə kömək etməyə hazırdır.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate(PATHS.EXPERTS)}
                    className="w-full py-3 bg-[#482476] hover:bg-[#3b1d62] text-white rounded-[12px] text-sm font-bold transition-colors cursor-pointer text-center select-none shadow-md border-0"
                  >
                    Məsləhət Alın
                  </button>
                </div>

                {/* Widget 2: Sanctuary Podcast Player Card */}
                <div className="bg-[#121b3d]/90 backdrop-blur-md border border-white/10 rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#2a3866] flex items-center justify-center shrink-0">
                      <AppIcon icon="lucide:mic" size={18} className="text-[#8b9eff]" />
                    </div>
                    <div className="flex flex-col">
                      <h5 className="text-white text-base font-bold leading-tight">
                        {t('blog.podcastTitle')}
                      </h5>
                      <span className="text-white/50 text-[12px] font-light">
                        {t('blog.weeklyRelease')}
                      </span>
                    </div>
                  </div>
                  <p className="text-white/75 text-[13px] leading-relaxed font-light italic">
                    {t('blog.podcastDesc')}
                  </p>
                  <button
                    type="button"
                    className="w-full h-[44px] border border-white/30 hover:bg-white/10 text-white font-medium text-[14px] rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all select-none"
                  >
                    <span>▶</span> {t('blog.listenNow')}
                  </button>
                </div>

                {/* Widget 3: Popular Topics / Meta Keywords Tag Box */}
                <div className="bg-[#C3CBD6]/95 backdrop-blur-md rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-xl border border-white/20">
                  <h4 className="text-[#1E0A42] text-[18px] font-bold border-b border-black/15 pb-2">
                    {t('blog.popularTopics')}
                  </h4>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {topicTags.map((topic, idx) => (
                      <span
                        key={`${topic}-${idx}`}
                        className="bg-[#242d48] text-white/90 text-[12.5px] font-medium px-3.5 py-1.5 rounded-lg border border-white/10 select-none"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Related Blogs Carousel Slider */}
            {relatedBlogs.length > 0 && (
              <div className="w-full max-w-[1295px] mt-12 border-t border-white/10 pt-10 text-left select-none relative group/slider">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white text-[24px] sm:text-[28px] font-bold tracking-tight">
                    {t('blog.similarBlogs')}
                  </h3>
                  <Link
                    to={PATHS.BLOG}
                    className="text-white/60 hover:underline text-sm font-semibold flex items-center gap-1 group select-none"
                  >
                    <span>{t('news.all', 'Hamısını gör')}</span>
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>

                <div className="w-full relative flex items-center">
                  <button
                    type="button"
                    onClick={() => handleScroll('left')}
                    className="absolute left-[-20px] z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer transition-all opacity-0 group-hover/slider:opacity-100 select-none"
                  >
                    <AppIcon icon="lucide:chevron-left" size={20} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleScroll('right')}
                    className="absolute right-[-20px] z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer transition-all opacity-0 group-hover/slider:opacity-100 select-none"
                  >
                    <AppIcon icon="lucide:chevron-right" size={20} />
                  </button>

                  <div
                    ref={scrollRef}
                    className="w-full flex flex-row overflow-x-auto gap-6 no-scrollbar scroll-smooth snap-x snap-mandatory py-2"
                  >
                    {relatedBlogs.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => navigate(PATHS.BLOG_DETAIL.replace(':id', String(item.id)))}
                        className="bg-[#182a3c]/80 backdrop-blur-md rounded-[18px] overflow-hidden border border-white/10 flex flex-col hover:border-white/30 transition-all duration-300 w-full sm:w-[380px] shrink-0 snap-start cursor-pointer group"
                      >
                        <div className="w-full aspect-[16/10] relative overflow-hidden bg-[#101c29]">
                          <SmartImage
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <span className="absolute top-3 left-3 z-10 bg-[#111c2e]/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium px-3 py-1 rounded-full uppercase">
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
                              {t('blog.readMore')} <span>→</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};
