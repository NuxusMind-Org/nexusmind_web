import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';
import { LandingNavbar } from '../components/LandingNavbar';
import { ARTICLE_ITEMS } from '../constants/articles';
import {
  ArticleDetailHero,
  ArticleDetailBody,
  ArticleDetailSidebar,
  ArticleDetailRelated,
} from '../components/article-detail';
import { articlesApi } from '@/api/articles.api';
import type { MeqaleResponseDto } from '@/api/types';
import { SEO } from '@/components';
import { PATHS } from '@/routes/paths';
import { getLocalizedTitle } from '@/utils/multilingual';

export const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [meqale, setMeqale] = useState<MeqaleResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(id));
  const [isError, setIsError] = useState<boolean>(!id);

  useEffect(() => {
    let isMounted = true;
    if (!id) return;

    articlesApi
      .getById(id)
      .then((data) => {
        if (isMounted) {
          if (data && (data.id || data.title)) {
            setMeqale(data);
          } else {
            setIsError(true);
          }
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.warn(`[LandingArticleDetailPage] Failed to fetch article with id "${id}":`, err);
        if (isMounted) {
          const numericId = Number(id);
          const mockFound = ARTICLE_ITEMS.find((item) => item.id === numericId);
          if (mockFound) {
            setMeqale({
              id: mockFound.id,
              title: mockFound.title,
              shortDescription: mockFound.description,
              imageUrl: mockFound.image,
              category: mockFound.categoryLabel,
              createdAt: mockFound.date,
              slug: String(mockFound.id),
              metaTitle: mockFound.title,
              metaDescription: mockFound.description,
            });
            setIsError(false);
          } else {
            setIsError(true);
          }
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Adapt fetched Meqale data or fallback to presentation ArticleItem structure
  const article = useMemo(() => {
    if (!meqale) return null;
    const defaultItem = ARTICLE_ITEMS[0];
    return {
      id: meqale.id ?? (id ? Number(id) : 1),
      image: meqale.imageUrl || defaultItem.image,
      category: (meqale.category?.toLowerCase() || defaultItem.category),
      categoryLabel: meqale.category || defaultItem.categoryLabel,
      date: meqale.createdAt || defaultItem.date,
      readTime: meqale.readTimeMinutes ? `${meqale.readTimeMinutes} dəq oxu` : defaultItem.readTime,
      views: defaultItem.views,
      title: getLocalizedTitle(meqale.title || meqale.titleDto, 'az', defaultItem.title),
      description: meqale.shortDescription || meqale.introText || defaultItem.description,
      author: defaultItem.author,
    };
  }, [meqale, id]);

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white bg-landing-gradient">
      <LandingNavbar activePage="articles" />

      {/* State 1: Loading */}
      {isLoading && (
        <main className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[60px] pb-[80px] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-white/80">
            <Loader2 className="w-10 h-10 animate-spin text-[#2dd4bf]" />
            <p className="text-base font-medium">Məqalə məlumatları yüklənir...</p>
          </div>
        </main>
      )}

      {/* State 2: Error / Not Found */}
      {!isLoading && (isError || !article || !meqale) && (
        <>
          <SEO
            metaTitle="Məqalə tapılmadı | NexusMind"
            metaDescription="Axtardığınız məqalə tapılmadı və ya mövcud deyil."
            contentType="article"
          />
          <main className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[60px] pb-[80px] flex flex-col items-center justify-center">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col items-center text-center gap-4 shadow-xl">
              <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-300">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white">Məqalə tapılmadı</h2>
              <p className="text-sm text-white/70">
                Axtardığınız elmi məqalə silinmiş, ünvanı dəyişdirilmiş və ya mövcud olmaya bilər.
              </p>
              <button
                onClick={() => navigate(PATHS.ARTICLE)}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm font-semibold transition-colors cursor-pointer border border-white/20"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Məqalələr siyahısına qayıt</span>
              </button>
            </div>
          </main>
        </>
      )}

      {/* State 3: Success */}
      {!isLoading && !isError && article && meqale && (
        <>
          <SEO
            metaTitle={meqale.metaTitle || article.title}
            metaDescription={meqale.metaDescription || meqale.shortDescription}
            slug={meqale.slug || meqale.id}
            schemaMarkup={meqale.schemaMarkup}
            metaKeywords={meqale.metaKeywords}
            contentType="article"
            image={meqale.imageUrl || article.image}
          />

          {/* Main Page Content */}
          <main className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[40px] pb-[80px] flex flex-col items-center">
            <div className="w-full max-w-[1100px] flex flex-col gap-8">
              {/* Main Top Header */}
              <div className="w-full text-left">
                <h1 className="text-[32px] sm:text-[44px] font-sans font-light text-white leading-tight tracking-tight">
                  Məqalələr
                </h1>
              </div>

              {/* Hero Header with split info & VR image */}
              <ArticleDetailHero item={article} />

              {/* Core Article Content and Sidebar widgets */}
              <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-10 items-start mt-4">
                <div className="w-full lg:flex-1 min-w-0">
                  <ArticleDetailBody />
                </div>
                <div className="w-full lg:w-[284px] shrink-0">
                  <ArticleDetailSidebar />
                </div>
              </div>

              {/* Related Articles and Newsletter */}
              <ArticleDetailRelated />
            </div>
          </main>
        </>
      )}

      <Footer />
    </div>
  );
};

export default ArticleDetailPage;
