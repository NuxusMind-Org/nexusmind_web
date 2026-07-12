import { Link } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import { NewsCard } from './NewsCard';
import type { NewsItem } from '../../constants/news';

import newsTherapyRoom from '@/assets/news/news_therapy_room.png';
import newsBrainArt from '@/assets/news/news_brain_art.png';
import newsLakeDock from '@/assets/news/news_lake_dock.png';

export const NewsDetailRelated = () => {
  const relatedItems: NewsItem[] = [
    {
      id: 101,
      image: newsTherapyRoom,
      category: 'tedbirler',
      categoryLabel: 'Tədbirlər',
      date: '12 May, 2024',
      title: 'İlk Terapiya Seansı: Nələri Gözləməli?',
      description: 'Psixoloqla ilk görüş həm həyəcanlı, həm də ümidverici ola bilər. Budur bilməli olduqlarımız...',
      views: 120,
    },
    {
      id: 102,
      image: newsBrainArt,
      category: 'tecrube',
      categoryLabel: 'Təlimlər',
      date: '10 May, 2024',
      title: 'Seminar: Beyin və Emosiyalar',
      description: 'Hislərimizin bioloji əsaslarını anlamaq özümüzü idarə etməyə necə kömək edir?',
      views: 95,
    },
    {
      id: 103,
      image: newsLakeDock,
      category: 'elanlar',
      categoryLabel: 'Elan',
      date: '08 May, 2024',
      title: 'Rəqəmsal Detoks: 10 günlük təlim',
      description: 'Ekranlardan uzaqlaşmağın psixoloji faydaları və tətbiq üsulları haqqında bələdçi.',
      views: 150,
    },
  ];

  return (
    <div className="w-full mt-16 sm:mt-20 border-t border-white/10 pt-12">
      {/* Heading Header Row */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-white text-[22px] sm:text-[26px] font-semibold tracking-tight">
          Oxşar Xəbərlər
        </h3>
        <Link
          to={PATHS.NEWS}
          className="text-white/60 hover:text-[#00f2ff] text-[14px] font-semibold transition-colors flex items-center gap-1.5 group select-none"
        >
          <span>Hamısını gör</span>
          <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
        </Link>
      </div>

      {/* 3 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {relatedItems.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
