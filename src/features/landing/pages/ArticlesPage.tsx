import { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Footer } from '../components/Footer';
import { LandingNavbar } from '../components/LandingNavbar';
import { Input } from '@/components/input';
import { ArticlesGrid, ArticlesPagination, SubscriptionCard } from '../components/articles';
import { ARTICLE_ITEMS, type ArticleItem } from '../constants/articles';
import { articlesApi } from '@/api/articles.api';
import { mapMeqaleToArticleItem } from '@/utils/contentMappers';

export const ArticlesPage = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [realArticles, setRealArticles] = useState<ArticleItem[]>([]);
  const itemsPerPage = 6;

  useEffect(() => {
    let isMounted = true;
    articlesApi
      .getAll()
      .then((data) => {
        if (isMounted && Array.isArray(data)) {
          const mapped = data.map(mapMeqaleToArticleItem);
          setRealArticles(mapped);
        }
      })
      .catch((err) => {
        console.warn('[LandingArticlesPage] Failed to fetch articles from backend:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const allArticles = useMemo(() => {
    return [...realArticles, ...ARTICLE_ITEMS];
  }, [realArticles]);

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

  // Calculate total pages for pagination
  const totalPages = useMemo(() => {
    return Math.ceil(filteredArticles.length / itemsPerPage);
  }, [filteredArticles, itemsPerPage]);

  // Get only the articles for the current page
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredArticles, currentPage, itemsPerPage]);

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
              rightElement={<Search size={18} className="text-white/40" />}
              className="bg-white/5 border-white/10 hover:border-white/20 focus:border-brand focus:ring-1 focus:ring-brand text-[14px] text-white placeholder-white/30 h-12"
            />
          </div>

          {/* Grid section */}
          <ArticlesGrid items={paginatedArticles} />

          {/* Pagination Controls */}
          <ArticlesPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          {/* Newsletter Subscription Card */}
          <SubscriptionCard />
        </div>
      </main>

      <Footer />
    </div>
  );
};
