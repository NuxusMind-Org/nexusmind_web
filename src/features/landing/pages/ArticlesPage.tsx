import { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Footer } from '../components/Footer';
import { LandingNavbar } from '../components/LandingNavbar';
import { Input } from '@/components/input';
import { ArticlesGrid, ArticlesPagination, SubscriptionCard } from '../components/articles';
import { ARTICLE_ITEMS } from '../constants/articles';

export const ArticlesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset pagination page to 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Filter articles based on search query
  const filteredArticles = useMemo(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    if (!trimmedQuery) return ARTICLE_ITEMS;

    return ARTICLE_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(trimmedQuery) ||
        item.description.toLowerCase().includes(trimmedQuery) ||
        item.categoryLabel.toLowerCase().includes(trimmedQuery) ||
        item.author.name.toLowerCase().includes(trimmedQuery)
    );
  }, [searchQuery]);

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
    <div
      className="min-h-screen w-full flex flex-col font-sans text-white"
      style={{ background: "linear-gradient(180deg, #263151 5%, #245D68 45%, #914899 95%)" }}
    >
      <LandingNavbar activePage="articles" />

      {/* Page Content */}
      <main className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[60px] pb-[80px] flex flex-col items-center">
        <div className="w-full max-w-[1100px] flex flex-col gap-8">
          {/* Header */}
          <div className="w-full flex flex-col items-start">
            <h1 className="text-[42px] sm:text-[56px] font-sans font-light text-white mb-2 leading-tight tracking-tight">
              Məqalələr
            </h1>
            <p className="text-white/80 text-[15px] sm:text-[17px] font-light">
              Psixoloqlarımızın məqalələri
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full">
            <Input
              type="text"
              placeholder="Blogda axtar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
