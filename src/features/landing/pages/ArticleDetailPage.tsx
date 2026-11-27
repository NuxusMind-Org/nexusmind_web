import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Footer } from '../components/Footer';
import { DetailPageSkeleton } from '../components/skeletons/DetailPageSkeleton';
import { LandingNavbar } from '../components/LandingNavbar';
import { ARTICLE_ITEMS } from '../constants/articles';
import {
  ArticleDetailHero,
  ArticleDetailBody,
  ArticleDetailSidebar,
  ArticleDetailRelated,
} from '../components/article-detail';
import type { MeqaleResponseDto } from '@/api/types';
import { useArticleDetail, useArticlesList } from '../hooks/useContentQueries';
import {
  mapMeqaleToArticleItem,
  parseTimestamp,
  resolveContentLang,
} from '@/utils/contentMappers';
import { SEO, AppIcon } from '@/components';
import { PATHS } from '@/routes/paths';
import { getLocalizedTitle } from '@/utils/multilingual';

export const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = resolveContentLang(i18n.resolvedLanguage || i18n.language);

  const { data: fetchedMeqale, isLoading } = useArticleDetail(id);
  const { data: allArticleDtos } = useArticlesList();

  // Prefer live backend DTO; fall back to matching mock article when clicking a static mock card
  const meqale: MeqaleResponseDto | null = useMemo(() => {
    if (fetchedMeqale && (fetchedMeqale.id || fetchedMeqale.title)) {
      return fetchedMeqale;
    }
    if (!id) return null;
    const numericId = Number(id);
    const mockFound = ARTICLE_ITEMS.find((item) => item.id === numericId);
    if (!mockFound) return null;

    return {
      id: mockFound.id,
      title: mockFound.title,
      shortDescription: mockFound.description,
      introText: mockFound.description,
      imageUrl: mockFound.image,
      category: mockFound.categoryLabel,
      createdAt: mockFound.date,
      slug: String(mockFound.id),
      metaTitle: mockFound.title,
      metaDescription: mockFound.description,
    };
  }, [fetchedMeqale, id]);

  const article = useMemo(() => {
    if (!meqale) return null;
    return mapMeqaleToArticleItem(meqale, lang);
  }, [meqale, lang]);

  const relatedArticles = useMemo(() => {
    const currentId = meqale?.id ?? (id ? Number(id) : -1);
    const realArticles = Array.isArray(allArticleDtos)
      ? allArticleDtos
          .filter((dto) => (!dto.status || dto.status === 'PUBLISHED') && dto.id !== currentId)
          .sort((a, b) => parseTimestamp(b.createdAt) - parseTimestamp(a.createdAt))
          .map((dto) => mapMeqaleToArticleItem(dto, lang))
      : [];

    const realIds = new Set(realArticles.map((item) => item.id));
    const mockFallback = ARTICLE_ITEMS.filter(
      (mock) => mock.id !== currentId && !realIds.has(mock.id)
    );

    return [...realArticles, ...mockFallback].slice(0, 3);
  }, [allArticleDtos, meqale?.id, id, lang]);

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white bg-landing-gradient">
      <LandingNavbar activePage="articles" />

      {/* State 1: Loading */}
      {isLoading && <DetailPageSkeleton />}

      {/* State 2: Error / Not Found */}
      {!isLoading && (!article || !meqale) && (
        <>
          <SEO
            metaTitle={`${t('articles.notFoundTitle')} | NexusMind`}
            metaDescription={t('articles.notFoundDesc')}
            contentType="article"
          />
          <main className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[60px] pb-[80px] flex flex-col items-center justify-center">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col items-center text-center gap-4 shadow-xl">
              <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-300">
                <AppIcon icon="lucide:alert-circle" className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white">{t('articles.notFoundTitle')}</h2>
              <p className="text-sm text-white/70">
                {t('articles.notFoundDesc')}
              </p>
              <button
                type="button"
                onClick={() => navigate(PATHS.ARTICLE)}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-nav-action font-semibold transition-colors cursor-pointer border border-white/20"
              >
                <AppIcon icon="lucide:arrow-left" className="w-4 h-4" />
                <span>{t('articles.backToList')}</span>
              </button>
            </div>
          </main>
        </>
      )}

      {/* State 3: Success */}
      {!isLoading && article && meqale && (
        <>
          <SEO
            metaTitle={meqale.metaTitle || article.title}
            metaDescription={getLocalizedTitle(meqale.metaDescription || meqale.shortDescription, lang, '')}
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
                  {t('articles.title')}
                </h1>
              </div>

              {/* Hero Header with split info & cover image */}
              <ArticleDetailHero item={article} />

              {/* Core Article Content and Sidebar widgets */}
              <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-10 items-start mt-4">
                <div className="w-full lg:flex-1 min-w-0">
                  <ArticleDetailBody meqale={meqale} lang={lang} />
                </div>
                <div className="w-full lg:w-[284px] shrink-0">
                  <ArticleDetailSidebar />
                </div>
              </div>

              {/* Related Articles and Newsletter */}
              <ArticleDetailRelated items={relatedArticles} />
            </div>
          </main>
        </>
      )}

      <Footer />
    </div>
  );
};

export default ArticleDetailPage;
