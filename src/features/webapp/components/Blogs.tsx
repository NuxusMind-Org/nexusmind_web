import { useRef } from 'react';
import { Calendar, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import digitalBrainImg from '@/assets/digital_brain.png';

interface BlogItem {
  id: number;
  title: string;
  category: string;
  date: string;
  summary: string;
}

export const Blogs = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const blogs: BlogItem[] = [
    {
      id: 1,
      title: 'İmmersiyanın Elmi: Niyə VR Beyni İnanır?',
      category: 'Psixologiya',
      date: '12 Okt, 2024',
      summary: 'Virtual mühitin sinir sistemimizə təsiri və beynin rəqəmsal stimullara qarşı verdiyi reaksiyaların dərin analizi.',
    },
    {
      id: 2,
      title: 'İmmersiyanın Elmi: Niyə VR Beyni İnanır?',
      category: 'Psixologiya',
      date: '12 Okt, 2024',
      summary: 'Virtual mühitin sinir sistemimizə təsiri və beynin rəqəmsal stimullara qarşı verdiyi reaksiyaların dərin analizi.',
    },
    {
      id: 3,
      title: 'İmmersiyanın Elmi: Niyə VR Beyni İnanır?',
      category: 'Psixologiya',
      date: '12 Okt, 2024',
      summary: 'Virtual mühitin sinir sistemimizə təsiri və beynin rəqəmsal stimullara qarşı verdiyi reaksiyaların dərin analizi.',
    },
    {
      id: 4,
      title: 'İmmersiyanın Elmi: Niyə VR Beyni İnanır?',
      category: 'Psixologiya',
      date: '12 Okt, 2024',
      summary: 'Virtual mühitin sinir sistemimizə təsiri və beynin rəqəmsal stimullara qarşı verdiyi reaksiyaların dərin analizi.',
    },
    {
      id: 5,
      title: 'İmmersiyanın Elmi: Niyə VR Beyni İnanır?',
      category: 'Psixologiya',
      date: '12 Okt, 2024',
      summary: 'Virtual mühitin sinir sistemimizə təsiri və beynin rəqəmsal stimullara qarşı verdiyi reaksiyaların dərin analizi.',
    },
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const cardWidth = 433; // Card width 409.79px + gap 24px
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full bg-white px-6 pb-20 lg:px-10 flex flex-col justify-start select-none relative">
      {/* 1. Section Header */}
      <h2
        className="w-full text-left text-[#1E0A42] font-normal mb-8"
        style={{
          fontSize: '31.15px',
          lineHeight: '59.84px',
          letterSpacing: '-0.96px',
          maxWidth: '1251.75px',
        }}
      >
        Bloqlar
      </h2>

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
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex flex-col bg-[#F6EFFF] text-[#1E0A42] overflow-hidden flex-shrink-0 snap-start transition-all duration-300 border border-purple-100/50 hover:scale-[1.02] cursor-pointer group"
              style={{
                width: '409.79px',
                height: '461.37px',
                borderRadius: '15.57px',
                boxShadow: '1.95px 1.95px 1.95px rgba(119, 67, 188, 0.59)',
              }}
            >
              {/* Top: Cover Image Area */}
              <div className="w-full h-[200px] relative overflow-hidden flex-shrink-0">
                <img
                  src={digitalBrainImg}
                  alt={blog.title}
                  className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-700"
                />
                {/* Category Capsule Tag */}
                <span className="absolute top-4 left-4 bg-[#F6EFFF]/90 border border-[#7743BC]/20 px-3 py-1.5 rounded-full text-[10px] font-bold text-[#7743BC] uppercase tracking-wider backdrop-blur-sm">
                  {blog.category}
                </span>
              </div>

              {/* Bottom: Details Area */}
              <div className="flex flex-col text-left flex-1 justify-between">
                <div>
                  {/* Main Title */}
                  <h3 className="text-[#1E0A42] text-[20px] md:text-[22px] font-bold leading-tight tracking-tight mt-5 px-6 line-clamp-2 min-h-[56px]">
                    {blog.title}
                  </h3>

                  {/* Description Summary */}
                  <p className="text-xs md:text-sm text-[#2A2B42]/70 mt-3 px-6 leading-relaxed line-clamp-2">
                    {blog.summary}
                  </p>
                </div>

                {/* Footer Meta & CTA */}
                <div className="px-6 pb-6 pt-4 flex flex-row items-center justify-between border-t border-purple-100/30 mt-auto">
                  {/* Date info */}
                  <span className="flex items-center gap-1.5 text-xs text-[#2A2B42]/60 font-semibold uppercase tracking-wider">
                    <Calendar size={14} className="text-[#2A2B42]/40" />
                    {blog.date}
                  </span>

                  {/* CTA link */}
                  <div className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-[#7743BC] hover:text-[#5E38A0] transition-colors cursor-pointer group/link">
                    <span>Daha çox oxu</span>
                    <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                  </div>
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
