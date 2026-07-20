import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from '@/routes/paths';

import newsDetailCover from '@/assets/news/news_detail_cover.png';
import newsBrainArt from '@/assets/news/news_brain_art.png';
import newsTherapyRoom from '@/assets/news/news_therapy_room.png';

interface RelatedArticleItem {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
}

export const ArticleDetailRelated = () => {
  const [email, setEmail] = useState('');

  const relatedArticles: RelatedArticleItem[] = [
    {
      id: 101,
      image: newsDetailCover,
      category: 'TEXNOLOGİYA',
      title: 'VR Qulaqlıqların Neyro-interfeys İnkişafı',
      description: 'Növbeti nəsil cihazlar beyin dalğalarını necə daha dəqiq oxuyur?',
    },
    {
      id: 102,
      image: newsBrainArt,
      category: 'NEYROLOGİYA',
      title: 'Yaddaşın Bərpası: VR-ın Rolu',
      description: 'Klinik tədqiqatlar yaddaş itkisinin qarşısını almaqda yeni ümidlər vəd edir.',
    },
    {
      id: 103,
      image: newsTherapyRoom,
      category: 'ARAŞDIRMA',
      title: 'Nexus Mind 2024 İllik Hesabatı',
      description: 'Minlərlə pasiyent üzərində aparılan ən son statistik nəticələr.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Qeydiyyat tamamlandı: ${email}`);
      setEmail('');
    }
  };

  return (
    <div className="w-full mt-[44px] border-t border-white/10 pt-[44px] flex flex-col gap-12 font-sans">
      {/* 1. Digər Məqalələr Header & Grid */}
      <div className="w-full flex flex-col gap-8">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-white text-[24px] sm:text-[32px] font-light tracking-tight">
            Digər Məqalələr
          </h3>
          <Link
            to={PATHS.ARTICLE}
            className="text-white/60 hover:text-[#00f2ff] text-[14px] font-semibold transition-colors flex items-center gap-1.5 group select-none"
          >
            <span>Hamısına bax</span>
            <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((item) => (
            <div
              key={item.id}
              className="bg-white/[0.03] border border-white/10 rounded-[24px] overflow-hidden flex flex-col h-full hover:border-white/20 transition-all duration-300 group"
            >
              {/* Image box */}
              <div className="w-full aspect-[3/2] overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-103 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Text box */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 gap-2 text-left">
                <span className="text-[#00f2ff] text-[12px] font-semibold tracking-wider uppercase">
                  {item.category}
                </span>
                <h4 className="text-white text-[18px] sm:text-[20px] font-semibold leading-snug tracking-tight mt-1 group-hover:text-[#00f2ff] transition-colors duration-300 line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-white/70 text-[14px] leading-relaxed font-light mt-1.5 line-clamp-3">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Newsletter Subscription card */}
      <div className="relative overflow-hidden bg-[rgba(255,255,255,0.03)] border border-white/10 rounded-[24px] p-8 sm:p-12 text-center before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-[#A682FF]/60 before:to-transparent mt-4">
        <h3 className="text-white text-[24px] sm:text-[32px] font-semibold tracking-tight">
          Elmi yeniliklərdən xəbərdar olun
        </h3>
        <p className="text-white/60 text-[14px] sm:text-[16px] font-light mt-3 max-w-[580px] mx-auto leading-relaxed">
          Ən son tədqiqatlar və mərkəzimizin xəbər bülleteni üçün qeydiyyatdan keçin.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full max-w-[500px] mx-auto z-10 relative"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-poçt ünvanınız"
            className="w-full sm:flex-1 bg-[#0B091B]/80 text-white border border-white/10 rounded-full px-6 py-3.5 text-[14px] outline-none focus:border-[#A682FF]/50 transition-colors duration-300"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#A682FF] hover:bg-[#b594ff] text-[#130D24] text-[14px] font-bold px-8 py-3.5 rounded-full cursor-pointer transition-all duration-300 select-none outline-none shadow-md shadow-purple-500/10 hover:shadow-purple-500/20 text-center"
          >
            Göndər
          </button>
        </form>
      </div>
    </div>
  );
};
