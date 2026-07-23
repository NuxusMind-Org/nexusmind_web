import { useRef } from 'react';
import { Clock, Calendar, Eye, User, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import vrConsultationImg from '@/assets/vr_consultation.png';

interface ArticleItem {
  id: number;
  title: string;
  category: string;
  author: {
    name: string;
    specialty: string;
  };
  date: string;
  readTime: string;
  views: string;
  summary: string;
}

export const Articles = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const articles: ArticleItem[] = [
    {
      id: 1,
      title: 'VR Terapiyasının Travma Müalicəsində Effektivliyi',
      category: 'Psixologiya',
      author: {
        name: 'Dr. Leyla Rəhimova',
        specialty: 'Klinik Psixoloq',
      },
      date: '24 Mart 2026',
      readTime: '4 dəq oxu',
      views: '93 baxış',
      summary: 'Virtual reallıq texnologiyalarının post-travmatik stress pozuntusu olan pasiyentlərin reabilitasiyasında tətbiqi...',
    },
    {
      id: 2,
      title: 'VR Terapiyasının Travma Müalicəsində Effektivliyi',
      category: 'Psixologiya',
      author: {
        name: 'Dr. Leyla Rəhimova',
        specialty: 'Klinik Psixoloq',
      },
      date: '24 Mart 2026',
      readTime: '4 dəq oxu',
      views: '93 baxış',
      summary: 'Virtual reallıq texnologiyalarının post-travmatik stress pozuntusu olan pasiyentlərin reabilitasiyasında tətbiqi...',
    },
    {
      id: 3,
      title: 'VR Terapiyasının Travma Müalicəsində Effektivliyi',
      category: 'Psixologiya',
      author: {
        name: 'Dr. Leyla Rəhimova',
        specialty: 'Klinik Psixoloq',
      },
      date: '24 Mart 2026',
      readTime: '4 dəq oxu',
      views: '93 baxış',
      summary: 'Virtual reallıq texnologiyalarının post-travmatik stress pozuntusu olan pasiyentlərin reabilitasiyasında tətbiqi...',
    },
    {
      id: 4,
      title: 'VR Terapiyasının Travma Müalicəsində Effektivliyi',
      category: 'Psixologiya',
      author: {
        name: 'Dr. Leyla Rəhimova',
        specialty: 'Klinik Psixoloq',
      },
      date: '24 Mart 2026',
      readTime: '4 dəq oxu',
      views: '93 baxış',
      summary: 'Virtual reallıq texnologiyalarının post-travmatik stress pozuntusu olan pasiyentlərin reabilitasiyasında tətbiqi...',
    },
    {
      id: 5,
      title: 'VR Terapiyasının Travma Müalicəsində Effektivliyi',
      category: 'Psixologiya',
      author: {
        name: 'Dr. Leyla Rəhimova',
        specialty: 'Klinik Psixoloq',
      },
      date: '24 Mart 2026',
      readTime: '4 dəq oxu',
      views: '93 baxış',
      summary: 'Virtual reallıq texnologiyalarının post-travmatik stress pozuntusu olan pasiyentlərin reabilitasiyasında tətbiqi...',
    },
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, firstElementChild } = scrollRef.current;
      const cardWidth = (firstElementChild as HTMLElement)?.offsetWidth || 340;
      const step = cardWidth + 24; // Card width + gap 24px
      const scrollAmount = direction === 'left' ? -step : step;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full bg-white px-4 sm:px-6 pb-12 sm:pb-20 lg:px-10 flex flex-col justify-start select-none relative">
      {/* 1. Section Header */}
      <div className="w-full flex items-center justify-between mb-6 sm:mb-8">
        <h2
          className="text-left text-[#1E0A42] font-normal text-[22px] sm:text-[26px] md:text-[31.15px] leading-[32px] sm:leading-[42px] md:leading-[59.84px]"
          style={{
            letterSpacing: '-0.96px',
          }}
        >
          Məqalələr
        </h2>
        <button
          className="text-[#1E0A42]/60 hover:text-[#1E0A42] font-semibold text-xs sm:text-sm md:text-base cursor-pointer transition-colors bg-transparent border-none p-0 outline-none select-none"
        >
          Daha çox
        </button>
      </div>

      {/* 2. Carousel Wrapper with Nav Buttons */}
      <div className="w-full relative flex items-center group/carousel">
        {/* Left Arrow Button */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-[-16px] lg:left-[-24px] z-10 w-11 h-11 rounded-full bg-white text-[#4A247A] shadow-lg border border-gray-150 flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all opacity-0 group-hover/carousel:opacity-100 duration-300"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Horizontally Scrollable Cards Container */}
        <div
          ref={scrollRef}
          className="w-full flex flex-row overflow-x-auto gap-6 pt-6 pb-8 scrollbar-hide scroll-smooth snap-x snap-mandatory px-2"
        >
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex flex-col bg-[#4D2059] text-white shadow-xl shadow-purple-950/10 cursor-pointer overflow-hidden flex-shrink-0 snap-start transition-all duration-300 border hover:scale-[1.02] hover:shadow-purple-900/20 select-none group w-[280px] sm:w-[340px] lg:w-[calc((100%-72px)/3.5)] rounded-[18px]"
              style={{
                borderWidth: '1.11px',
                borderColor: 'rgba(255, 255, 255, 0.55)',
                backdropFilter: 'blur(22.28px)',
                WebkitBackdropFilter: 'blur(22.28px)',
              }}
            >
              {/* Top Half: Cover Image */}
              <div className="w-full h-[240px] relative overflow-hidden flex-shrink-0">
                <img
                  src={vrConsultationImg}
                  alt={article.title}
                  className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-700"
                />
                {/* Category Capsule Tag */}
                <span className="absolute top-4 left-4 bg-[#1E0A42]/50 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                  {article.category}
                </span>
              </div>

              {/* Bottom Half: Details */}
              <div className="p-6 flex flex-col text-left flex-1 justify-between">
                <div>
                  {/* Author Meta Row */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <User size={18} className="text-white/80" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white">
                        {article.author.name}
                      </span>
                      <span className="text-[11px] text-white/70 font-medium">
                        {article.author.specialty}
                      </span>
                    </div>
                  </div>

                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-4 mt-5 text-[11px] font-semibold text-white/70 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-white/50" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-white/50" />
                      {article.readTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Eye size={13} className="text-white/50" />
                      {article.views}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h3 className="text-[20px] md:text-[22px] font-bold text-white mt-5 leading-snug tracking-tight line-clamp-2 min-h-[56px]">
                    {article.title}
                  </h3>

                  {/* Description Summary */}
                  <p className="text-xs md:text-sm text-white/85 mt-3 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                {/* Bottom CTA Link */}
                <div className="flex items-center justify-end gap-1.5 text-xs md:text-sm font-bold text-white hover:text-white/85 transition-colors mt-auto pt-4 cursor-pointer group/link">
                  <span>Davamını oxu</span>
                  <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-[-16px] lg:right-[-24px] z-10 w-11 h-11 rounded-full bg-white text-[#4A247A] shadow-lg border border-gray-150 flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all opacity-0 group-hover/carousel:opacity-100 duration-300"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
