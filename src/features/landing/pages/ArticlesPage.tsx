import { useState, useMemo } from 'react';
import { AppIcon } from '@/components';
import { useTranslation } from 'react-i18next';
import { Footer } from '../components/Footer';
import { LandingNavbar } from '../components/LandingNavbar';
import { CardGridSkeleton } from '../components/skeletons';
import { Input } from '@/components/input';
import { ArticlesGrid, ArticlesPagination, SubscriptionCard } from '../components/articles';
import { ARTICLE_ITEMS } from '../constants/articles';
import { useArticlesList } from '../hooks/useContentQueries';
import {
  mapMeqaleToArticleItem,
  parseTimestamp,
  resolveContentLang,
} from '@/utils/contentMappers';

const ITEMS_PER_PAGE = 6;

export const ArticlesPage = () => {
  const { t, i18n } = useTranslation();
  const lang = resolveContentLang(i18n.resolvedLanguage || i18n.language);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: articleDtos, isLoading } = useArticlesList();

  const allArticles = useMemo(() => {
    const realArticles = Array.isArray(articleDtos)
      ? articleDtos
          .filter((dto) => !dto.status || dto.status === 'PUBLISHED')
          .sort((a, b) => parseTimestamp(b.createdAt) - parseTimestamp(a.createdAt))
          .map((dto) => mapMeqaleToArticleItem(dto, lang))
      : [];

    const realIds = new Set(realArticles.map((item) => item.id));
    const uniqueMocks = ARTICLE_ITEMS.filter((mock) => !realIds.has(mock.id));
    return [...realArticles, ...uniqueMocks];
  }, [articleDtos, lang]);

  // Filter articles based on search query
  const filteredArticles = useMemo(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    if (!trimmedQuery) return allArticles;

    return allArticles.filter(
      (item) =>
        item.title.toLowerCase().includes(trimmedQuery) ||
        item.description.toLowerCase().includes(trimmedQuery) ||
        item.categoryLabel.toLowerCase().includes(trimmedQuery) ||
        item.author.name.toLowerCase().includes(trimmedQuery)
    );
  }, [allArticles, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedArticles = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredArticles, safeCurrentPage]);

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white bg-landing-gradient">
      <LandingNavbar activePage="articles" />

      {/* Page Content */}
      <main className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[60px] pb-[80px] flex flex-col items-center">
        <div className="w-full max-w-[1100px] flex flex-col gap-8">
          {/* Header */}
          <div className="w-full flex flex-col items-start">
            <h1 className="text-[42px] sm:text-[56px] font-sans font-light text-white mb-2 leading-tight tracking-tight">
              {t('articles.title')}
            </h1>
            <p className="text-white/80 text-[15px] sm:text-[17px] font-light">
              {t('articles.subtitle')}
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full">
            <Input
              type="text"
              placeholder={t('articles.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              rightElement={<AppIcon icon="lucide:search" size={18} className="text-white/40" />}
              className="bg-white/5 border-white/10 hover:border-white/20 focus:border-brand focus:ring-1 focus:ring-brand text-[14px] text-white placeholder-white/30 h-12"
            />
          </div>

          {isLoading ? (
            <CardGridSkeleton count={ITEMS_PER_PAGE} />
          ) : (
            <>
              <ArticlesGrid items={paginatedArticles} />

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <ArticlesPagination
                  currentPage={safeCurrentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}

          {/* Newsletter Subscription Card */}
          <SubscriptionCard />
        </div>
      </main>

      <Footer />
    </div>
  );
};
