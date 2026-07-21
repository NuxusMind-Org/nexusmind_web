import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { NEWS_ITEMS } from '@/features/landing/constants/news';
import { PATHS } from '@/routes/paths';

type CategoryFilter = 'all' | 'terapiyalar' | 'otaqlar' | 'telimler';
type SortOption = 'popularity' | 'date-desc' | 'date-asc';

export const NewsPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [activeSort, setActiveSort] = useState<SortOption>('popularity');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const categories = [
    { id: 'all', label: 'Hamısı' },
    { id: 'terapiyalar', label: 'Terapiyalar' },
    { id: 'otaqlar', label: 'Otaqlar' },
    { id: 'telimler', label: 'Təlimlər' },
  ] as const;

  const sortOptions = [
    { id: 'popularity', label: 'Populyarlığa görə' },
    { id: 'date-desc', label: 'Tarix: Yenidən köhnəyə' },
    { id: 'date-asc', label: 'Tarix: Köhnədən yeniyə' },
  ] as const;

  const currentSortLabel = sortOptions.find((opt) => opt.id === activeSort)?.label || 'Populyarlığa görə';

  // Process data filtering and sorting
  const processedItems = useMemo(() => {
    let items = [...NEWS_ITEMS];

    // Map categories logically to match news constants
    if (activeCategory === 'terapiyalar') {
      items = items.filter((item) => item.category === 'tedbirler');
    } else if (activeCategory === 'otaqlar') {
      items = items.filter((item) => item.category === 'elanlar');
    } else if (activeCategory === 'telimler') {
      items = items.filter((item) => item.category === 'tecrube');
    }

    // Sort order
    items.sort((a, b) => {
      if (activeSort === 'popularity') {
        return b.views - a.views;
      }
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      return activeSort === 'date-desc' ? timeB - timeA : timeA - timeB;
    });

    return items;
  }, [activeCategory, activeSort]);

  return (
    <div className="w-full flex flex-col rounded-t-[20px] md:rounded-t-[38.93px] rounded-b-[20px] md:rounded-b-[38.93px] overflow-hidden shadow-2xl bg-white animate-fade-in min-h-[calc(100vh-64px)] pb-20 opacity-100">
      {/* Top Header Section (Card with Gradient) - Height 270px according to Figma layout */}
      <div
        className="w-full rounded-t-[20px] md:rounded-t-[38.93px] rounded-b-none h-auto min-h-[220px] sm:min-h-[250px] md:h-[270px] pt-6 sm:pt-[48px] pb-6 md:pb-[32px] px-4 sm:px-6 md:px-[48px] flex flex-col justify-between items-center text-left opacity-100"
        style={{
          background: 'linear-gradient(135deg, #CBE8FC 0%, #DDD4F8 33%, #F9D8E8 66%, #FFF5E6 100%)',
        }}
      >
        <h2 className="text-[28px] md:text-[46.72px] font-normal text-[#1E0A42] text-center max-w-[1041.5px] leading-[36px] md:leading-[59.84px] tracking-[-0.96px] font-['Lexend'] mt-2">
          Son məlumatlardan xəbərdar ol!
        </h2>

        {/* Controls Row */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-6 mt-4">
          {/* Left: Filter & Categories with sliding transition */}
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`bg-[#204F5E] text-white px-5 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 hover:bg-[#204F5E]/90 transition-all duration-300 shadow-sm cursor-pointer font-['Lexend'] border select-none outline-none group ${
                isFilterOpen ? 'border-[#4D2059]' : 'border-transparent'
              }`}
            >
              <SlidersHorizontal size={16} className="group-hover:scale-105 transition-transform duration-300" />
              <span>Filter</span>
            </button>

            <div
              className={`transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isFilterOpen
                  ? 'max-w-[700px] opacity-100 translate-x-0 overflow-x-auto no-scrollbar'
                  : 'max-w-0 opacity-0 -translate-x-8 overflow-hidden pointer-events-none'
              }`}
            >
              <div className="flex items-center gap-2.5 whitespace-nowrap pl-1 pr-4 py-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer border font-['Lexend'] ${
                      activeCategory === cat.id
                        ? 'bg-[#DDD4F8] border-[#4D2059] text-[#1E0A42] shadow-sm'
                        : 'border-[#4D2059]/40 text-[#1E0A42] hover:bg-[#4D2059]/5'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sort controls dropdown */}
          <div className="relative w-full lg:w-auto flex justify-end">
            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
              <span className="text-sm font-medium text-[#1E0A42]/60 font-['Lexend'] whitespace-nowrap">Sıralama :</span>
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="bg-[#4D2059] text-white px-5 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 hover:bg-[#4D2059]/90 transition-colors shadow-md cursor-pointer font-['Lexend'] min-w-[200px] justify-between"
                >
                  <span>{currentSortLabel}</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${showSortDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Card */}
                {showSortDropdown && (
                  <>
                    <div className="fixed inset-0 z-20 cursor-default" onClick={() => setShowSortDropdown(false)} />
                    <div className="absolute right-0 mt-2 bg-white border-[2.5px] border-[#E5DFDF] rounded-[32px] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] w-[200px] h-auto z-30 flex flex-col gap-2 py-[14px] px-[14px] animate-fade-in text-left">
                      {sortOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setActiveSort(opt.id);
                            setShowSortDropdown(false);
                          }}
                          className={`w-full text-left px-3.5 py-1 rounded-[14px] text-[12px] font-normal leading-[21px] tracking-[0.35px] font-['Lexend'] transition-colors duration-150 cursor-pointer ${
                            activeSort === opt.id
                              ? 'bg-[#482476]/10 text-[#482476]'
                              : 'text-[#482476] hover:bg-[#482476]/5'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section: News Feed List Container */}
      <div className="px-4 sm:px-6 md:px-[48px] py-6 sm:py-12 w-full flex flex-col gap-8">
        {processedItems.length > 0 ? (() => {
          const item = processedItems[0];
          return (
            <div
              key={item.id}
              className="flex flex-col md:flex-row w-full max-w-[1235px] h-auto md:h-[535px] mx-auto rounded-[18px] overflow-hidden border-[0.95px] border-white/22 bg-[#482476] backdrop-blur-[19.06px] shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl shrink-0"
            >
              {/* Left Column: Image wrapper */}
              <div className="w-full md:w-[765px] h-[280px] md:h-[535px] shrink-0 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </div>

              {/* Right Column: Panel text and controls content */}
              <div className="w-full md:w-[470px] shrink-0 p-5 sm:p-8 md:pt-[46px] md:pr-[44px] md:pb-[42px] md:pl-[44px] flex flex-col justify-start text-left h-auto md:h-[535px] bg-[#482476]">
                {/* Meta details row */}
                <div className="flex items-center gap-[16px] mb-[24px]">
                  <span className="bg-white/15 text-white/90 text-[10px] tracking-widest h-[28px] px-[14px] py-[6px] rounded-full uppercase font-bold font-['Lexend'] flex items-center justify-center">
                    {item.categoryLabel}
                  </span>
                  <span className="text-white/60 text-[13px] font-normal font-['Lexend']">
                    {item.date}
                  </span>
                </div>

                {/* Title & Description block */}
                <h3 className="text-xl md:text-[26px] font-normal leading-snug text-white font-['Lexend'] max-w-[360px] mb-[24px]">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base font-normal leading-relaxed text-white/80 font-['Lexend'] max-w-[360px] mb-[48px] line-clamp-4">
                  {item.description}
                </p>

                {/* Bottom row actions */}
                <div className="flex items-center justify-between w-full mt-auto pt-4 border-t border-white/10 gap-[16px]">
                  <div className="flex items-center gap-[8px] text-white/70 text-sm font-medium font-['Lexend']">
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-white/70"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>{item.views} baxış</span>
                  </div>

                  <button
                    onClick={() => navigate(PATHS.WEBAPP_NEWS_DETAIL.replace(':id', String(item.id)))}
                    className="w-[176px] h-[50px] bg-white text-[#482476] font-bold text-sm tracking-wider rounded-full hover:bg-white/90 transition-all duration-300 cursor-pointer font-['Lexend'] flex items-center justify-center"
                  >
                    Davamını oxu
                  </button>
                </div>
              </div>
            </div>
          );
        })() : (
          <div className="flex flex-col items-center justify-center py-20 text-center w-full">
            <span className="text-[#1E0A42]/50 text-base font-medium font-['Lexend']">
              Bu kateqoriyada heç bir xəbər tapılmadı.
            </span>
          </div>
        )}
      </div>

      {/* Third Section: Ən son yeniliklər (Latest News) Grid */}
      <div className="px-4 sm:px-6 md:px-[48px] pb-16 w-full flex flex-col max-w-[1235.6px] mx-auto mt-6 text-left">
        <h3 className="text-[32px] font-normal leading-[28px] text-[#1E0A42] font-['Lexend'] mb-8">
          Ən son yeniliklər
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20.35px] w-full max-w-[1235.6px] mx-auto">
          {NEWS_ITEMS.slice(1, 4).map((item) => (
            <div
              key={item.id}
              className="bg-[#F8F9FA] rounded-[18px] overflow-hidden border border-[#E5DFDF] flex flex-col p-4 shadow-sm hover:shadow-md transition-shadow duration-300 w-full max-w-[398.3px] h-[439px] mx-auto"
            >
              {/* Header Image */}
              <div className="w-full h-[180px] rounded-[12px] bg-gradient-to-b from-[#0F8A6B] to-[#0A6B53] flex items-center justify-center overflow-hidden relative mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover absolute inset-0 opacity-90"
                />
                <span className="absolute top-3 left-3 bg-black/30 text-white/95 text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full uppercase font-['Lexend']">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Meta details row */}
              <div className="flex justify-between items-center text-[#1E0A42]/60 text-xs mb-3 font-semibold font-['Lexend']">
                <span>{item.date}</span>
                <span>5 dəq oxu</span>
              </div>

              {/* Title & Description details */}
              <div className="flex flex-col flex-grow">
                <h4 className="text-[#1E0A42] font-bold text-base leading-snug mb-2 line-clamp-2 font-['Lexend'] min-h-[44px]">
                  {item.title}
                </h4>
                <p className="text-[#1E0A42]/70 text-xs leading-relaxed mb-4 line-clamp-3 font-['Lexend']">
                  {item.description}
                </p>
              </div>

              {/* Footer CTA link */}
              <div
                onClick={() => navigate(PATHS.WEBAPP_NEWS_DETAIL.replace(':id', String(item.id)))}
                className="text-[#0D9488] font-bold text-sm tracking-wide flex items-center gap-1 hover:underline cursor-pointer font-['Lexend'] mt-auto pt-2"
              >
                <span>Daha çox oxu</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Center Footer Pagination Link */}
        <button className="mx-auto mt-12 text-[#4D2059] hover:text-[#4D2059]/80 font-bold text-base flex items-center gap-2 cursor-pointer font-['Lexend'] group hover:underline select-none outline-none">
          <span>Daha çox</span>
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </button>
      </div>
    </div>
  );
};
