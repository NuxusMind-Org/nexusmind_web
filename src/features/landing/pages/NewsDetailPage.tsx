import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Footer } from '../components/Footer';
import { DetailPageSkeleton } from '../components/skeletons/DetailPageSkeleton';
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
import type { XeberResponseDto } from '@/api/types';
import { useNewsDetail, useNewsList } from '../hooks/useContentQueries';
import {
  mapXeberToNewsItem,
  parseTimestamp,
  resolveContentLang,
} from '@/utils/contentMappers';
import { SEO, AppIcon } from '@/components';
import { PATHS } from '@/routes/paths';
import { getLocalizedTitle } from '@/utils/multilingual';

export const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = resolveContentLang(i18n.resolvedLanguage || i18n.language);

  const { data: fetchedNews, isLoading } = useNewsDetail(id);
  const { data: allNewsDtos } = useNewsList();

  // Prefer live backend DTO; fall back to matching static mock item if backend has no record for this id
  const news: XeberResponseDto | null = useMemo(() => {
    if (fetchedNews && (fetchedNews.id || fetchedNews.title)) {
      return fetchedNews;
    }
    if (!id) return null;
    const numericId = Number(id);
    const mockFound = NEWS_ITEMS.find((item) => item.id === numericId);
    if (!mockFound) return null;

    return {
      id: mockFound.id,
      title:
        mockFound.id === 1
          ? 'Bakı Psixologiya Mərkəzində: 3 Aylıq Mentorluq Proqramı'
          : mockFound.title,
      shortDescription: mockFound.description,
      introText: mockFound.description,
      imageUrl: mockFound.id === 1 ? newsDetailCover : mockFound.image,
      category: mockFound.categoryLabel,
      viewCount: mockFound.views,
      readTimeMinutes: 5,
      createdAt: mockFound.date,
      slug: String(mockFound.id),
      metaTitle: mockFound.title,
      metaDescription: mockFound.description,
    };
  }, [fetchedNews, id]);

  const article = useMemo(() => {
    if (!news) return null;
    return mapXeberToNewsItem(news, lang);
  }, [news, lang]);

  const relatedNews = useMemo(() => {
    const currentId = news?.id ?? (id ? Number(id) : -1);
    const realNews = Array.isArray(allNewsDtos)
      ? allNewsDtos
          .filter((dto) => (!dto.status || dto.status === 'PUBLISHED') && dto.id !== currentId)
          .sort((a, b) => parseTimestamp(b.createdAt) - parseTimestamp(a.createdAt))
          .map((dto) => mapXeberToNewsItem(dto, lang))
      : [];

    const realIds = new Set(realNews.map((item) => item.id));
    const mockFallback = NEWS_ITEMS.filter(
      (mock) => mock.id !== currentId && !realIds.has(mock.id)
    );

    return [...realNews, ...mockFallback].slice(0, 3);
  }, [allNewsDtos, news?.id, id, lang]);

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white bg-landing-gradient">
      <LandingNavbar activePage="news" />

      {/* State 1: Loading */}
      {isLoading && <DetailPageSkeleton />}

      {/* State 2: Error / Not Found */}
      {!isLoading && (!article || !news) && (
        <>
          <SEO
            metaTitle={`${t('news.notFoundTitle')} | NexusMind`}
            metaDescription={t('news.notFoundDesc')}
            contentType="news"
          />
          <main className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[60px] pb-[80px] flex flex-col items-center justify-center">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col items-center text-center gap-4 shadow-xl">
              <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-300">
                <AppIcon icon="lucide:alert-circle" className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white">{t('news.notFoundTitle')}</h2>
              <p className="text-sm text-white/70">
                {t('news.notFoundDesc')}
              </p>
              <button
                type="button"
                onClick={() => navigate(PATHS.NEWS)}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-nav-action font-semibold transition-colors cursor-pointer border border-white/20"
              >
                <AppIcon icon="lucide:arrow-left" className="w-4 h-4" />
                <span>{t('news.backToList')}</span>
              </button>
            </div>
          </main>
        </>
      )}

      {/* State 3: Success */}
      {!isLoading && article && news && (
        <>
          <SEO
            metaTitle={news.metaTitle || article.title}
            metaDescription={getLocalizedTitle(news.metaDescription || news.shortDescription, lang, '')}
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
                  <NewsDetailBody news={news} lang={lang} />
                </div>
                <div className="w-full lg:w-[33%]">
                  <NewsDetailSidebar />
                </div>
              </div>

              <NewsDetailRelated items={relatedNews} />
            </div>
          </main>
        </>
      )}

      <Footer />
    </div>
  );
};
