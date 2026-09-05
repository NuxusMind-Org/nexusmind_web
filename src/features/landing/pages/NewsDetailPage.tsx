import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft, AlertCircle } from 'lucide-react';
import { Footer } from '../components/Footer';
import { LandingNavbar } from '../components/LandingNavbar';
import {
  NewsDetailHeader,
  NewsDetailHero,
  NewsDetailBody,
  NewsDetailSidebar,
  NewsDetailRelated,
} from '../components/news';
import { NEWS_ITEMS } from '../constants/news';
import newsDetailCover from '@/assets/news/news_detail_cover.png';
import newsConference from '@/assets/news/news_conference.png';
import { newsApi } from '@/api/news.api';
import type { XeberResponseDto } from '@/api/types';
import { SEO } from '@/components';
import { PATHS } from '@/routes/paths';

export const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [news, setNews] = useState<XeberResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(id));
  const [isError, setIsError] = useState<boolean>(!id);

  useEffect(() => {
    let isMounted = true;
    if (!id) return;

    newsApi
      .getById(id)
      .then((data) => {
        if (isMounted) {
          if (data && (data.id || data.title)) {
            setNews(data);
          } else {
            setIsError(true);
          }
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.warn(`[NewsDetailPage] Backend fetch failed for id "${id}":`, err);
        if (isMounted) {
          // Check for fallback in static mock data if backend item does not exist
          const numericId = Number(id);
          const mockFound = NEWS_ITEMS.find((item) => item.id === numericId);
          if (mockFound) {
            setNews({
              id: mockFound.id,
              title:
                mockFound.id === 1
                  ? 'Bakı Psixologiya Mərkəzində: 3 Aylıq Mentorluq Proqramı'
                  : mockFound.title,
              shortDescription: mockFound.description,
              imageUrl: mockFound.id === 1 ? newsDetailCover : mockFound.image,
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

  // Format news for presentation components
  const article = useMemo(() => {
    if (!news) return null;

    const formattedDate = news.createdAt
      ? news.createdAt.includes('T')
        ? new Date(news.createdAt).toLocaleDateString('az-AZ', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        : news.createdAt
      : '12 May, 2024';

    return {
      id: news.id ?? (id ? Number(id) : 1),
      image: news.imageUrl || (news.id === 1 ? newsDetailCover : newsConference),
      category: (news.category?.toLowerCase() || 'tedbirler') as 'elanlar' | 'tecrube' | 'tedbirler',
      categoryLabel: news.category || 'Psixoloji Sağlamlıq',
      date: formattedDate,
      title: news.title || 'Bakı Psixologiya Mərkəzində: 3 Aylıq Mentorluq Proqramı',
      description:
        news.shortDescription ||
        news.introText ||
        'Yanvarın 15-də Bakı Psixologiya Mərkəzi Mentorluq proqramına başlayıb.',
      views: 120,
    };
  }, [news, id]);

  return (
    <div
      className="min-h-screen w-full flex flex-col font-sans text-white"
      style={{
        background: 'linear-gradient(180deg, #263151 5%, #245D68 45%, #914899 95%)',
      }}
    >
      <LandingNavbar activePage="news" />

      {/* State 1: Loading */}
      {isLoading && (
        <main className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[60px] pb-[80px] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-white/80">
            <Loader2 className="w-10 h-10 animate-spin text-[#2dd4bf]" />
            <p className="text-base font-medium">Xəbər məlumatları yüklənir...</p>
          </div>
        </main>
      )}

      {/* State 2: Error / Not Found */}
      {!isLoading && (isError || !article || !news) && (
        <>
          <SEO
            metaTitle="Xəbər tapılmadı | NexusMind"
            metaDescription="Axtardığınız xəbər tapılmadı və ya mövcud deyil."
            contentType="news"
          />
          <main className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[60px] pb-[80px] flex flex-col items-center justify-center">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col items-center text-center gap-4 shadow-xl">
              <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-300">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white">Xəbər tapılmadı</h2>
              <p className="text-sm text-white/70">
                Axtardığınız xəbər silinmiş, ünvanı dəyişdirilmiş və ya mövcud olmaya bilər.
              </p>
              <button
                onClick={() => navigate(PATHS.NEWS)}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm font-semibold transition-colors cursor-pointer border border-white/20"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Xəbərlər siyahısına qayıt</span>
              </button>
            </div>
          </main>
        </>
      )}

      {/* State 3: Success */}
      {!isLoading && !isError && article && news && (
        <>
          <SEO
            metaTitle={news.metaTitle || news.title}
            metaDescription={news.metaDescription || news.shortDescription}
            slug={news.slug || news.id}
            schemaMarkup={news.schemaMarkup}
            metaKeywords={news.metaKeywords}
            contentType="news"
            image={news.imageUrl || article.image}
          />

          <main className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[32px] pb-[80px] flex flex-col items-center">
            <div className="w-full max-w-[1200px] flex flex-col">
              <NewsDetailHeader categoryLabel={article.categoryLabel} />
              <NewsDetailHero item={article} />

              {/* Grid Layout: Left Content Column (67%), Right Sidebar Column (33%) */}
              <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
                <div className="w-full lg:w-[67%]">
                  <NewsDetailBody />
                </div>
                <div className="w-full lg:w-[33%]">
                  <NewsDetailSidebar />
                </div>
              </div>

              <NewsDetailRelated />
            </div>
          </main>
        </>
      )}

      <Footer />
    </div>
  );
};
