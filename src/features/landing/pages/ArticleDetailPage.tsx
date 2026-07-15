import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { Footer } from '../components/Footer';
import { LandingNavbar } from '../components/LandingNavbar';
import { ARTICLE_ITEMS } from '../constants/articles';
import {
  ArticleDetailHero,
  ArticleDetailBody,
  ArticleDetailSidebar,
} from '../components/article-detail';

export const ArticleDetailPage = () => {
  const { id } = useParams();

  // Find the selected article from the static list (or fallback to the first one)
  const article = useMemo(() => {
    const articleId = Number(id);
    const found = ARTICLE_ITEMS.find((item) => item.id === articleId);
    return found || ARTICLE_ITEMS[0];
  }, [id]);

  return (
    <div
      className="min-h-screen w-full flex flex-col font-sans text-white"
      style={{
        background: 'linear-gradient(260.37deg, #263151 -4.41%, #245D68 51.97%, #914899 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      <LandingNavbar activePage="articles" />

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
        </div>
      </main>

      <Footer />
    </div>
  );
};
export default ArticleDetailPage;
