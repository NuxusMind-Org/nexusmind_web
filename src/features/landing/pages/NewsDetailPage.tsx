import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
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

export const NewsDetailPage = () => {
  const { id } = useParams();

  const article = useMemo(() => {
    const articleId = Number(id);
    const found = NEWS_ITEMS.find((item) => item.id === articleId);

    if (found) {
      // If it is the main featured article, match the specific Figma mockup cover art and text details
      if (found.id === 1) {
        return {
          ...found,
          image: newsDetailCover,
          categoryLabel: 'Psixoloji Sağlamlıq',
          title: 'Bakı Psixologiya Mərkəzində: 3 Aylıq Mentorluq Proqramı',
        };
      }
      return found;
    }

    // Default fallback mock item matching mockup values
    return {
      id: 1,
      image: newsDetailCover,
      category: 'tedbirler' as const,
      categoryLabel: 'Psixoloji Sağlamlıq',
      date: '12 May, 2024',
      title: 'Bakı Psixologiya Mərkəzində: 3 Aylıq Mentorluq Proqramı',
      description: 'Yanvarın 15-də Bakı Psixologiya Mərkəzi Mentorluq proqramına başlayıb. Proqram tələbələr, məzunlar və özünü inkişaf etdirmək istəyənlər üçün nəzərdə tutulub.',
      views: 120,
    };
  }, [id]);

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white" style={{ background: "linear-gradient(180deg, #263151 5%, #245D68 45%, #914899 95%)" }}>
      <LandingNavbar activePage="news" />

      {/* Main Page Content */}
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

      <Footer />
    </div>
  );
};
