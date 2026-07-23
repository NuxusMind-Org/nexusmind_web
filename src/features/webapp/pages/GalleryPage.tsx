import { useState, useMemo } from 'react';
import { SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '@/features/landing/constants/gallery';

type CategoryFilter = 'all' | 'terapiyalar' | 'otaqlar' | 'telimler';
type SortOption = 'popularity' | 'date-desc' | 'date-asc';

export const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [activeSort, setActiveSort] = useState<SortOption>('popularity');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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

  // Multiply mock data to populate pages 2 and 3 dynamically
  const extendedGalleryItems = useMemo(() => {
    const page1 = GALLERY_ITEMS.map(item => ({ ...item, id: item.id }));
    const page2 = GALLERY_ITEMS.map(item => ({
      ...item,
      id: item.id + 8,
      // Slightly alter sort parameters to vary pagination content
      popularity: Math.max(item.popularity - 5, 50),
      date: new Date(new Date(item.date).getTime() - 24 * 60 * 60 * 1000 * 7).toISOString().split('T')[0]
    }));
    const page3 = GALLERY_ITEMS.map(item => ({
      ...item,
      id: item.id + 16,
      popularity: Math.max(item.popularity - 12, 40),
      date: new Date(new Date(item.date).getTime() - 24 * 60 * 60 * 1000 * 14).toISOString().split('T')[0]
    }));
    return [...page1, ...page2, ...page3];
  }, []);

  // Reactive filtering and sorting
  const processedItems = useMemo(() => {
    let items = [...extendedGalleryItems];
    
    // Category Filter
    if (activeCategory !== 'all') {
      items = items.filter((item) => item.category === activeCategory);
    }

    // Sort order
    items.sort((a, b) => {
      if (activeSort === 'popularity') {
        return b.popularity - a.popularity;
      }
      if (activeSort === 'date-desc') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (activeSort === 'date-asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return 0;
    });

    return items;
  }, [extendedGalleryItems, activeCategory, activeSort]);

  // Pagination config (8 items per page = 4 cols x 2 rows)
  const itemsPerPage = 8;
  const totalPages = Math.ceil(processedItems.length / itemsPerPage) || 1;

  // Reset to first page if filter cuts down number of items
  const validatedCurrentPage = useMemo(() => {
    if (currentPage > totalPages) {
      return 1;
    }
    return currentPage;
  }, [currentPage, totalPages]);

  const paginatedItems = useMemo(() => {
    const startIndex = (validatedCurrentPage - 1) * itemsPerPage;
    return processedItems.slice(startIndex, startIndex + itemsPerPage);
  }, [processedItems, validatedCurrentPage]);

  return (
    <div className="w-full flex flex-col rounded-t-[20px] md:rounded-t-[38.93px] rounded-b-[20px] md:rounded-b-[38.93px] overflow-hidden shadow-2xl bg-white animate-fade-in min-h-[calc(100vh-64px)] pb-12 opacity-100">
      {/* Top Header Section (Card with Gradient) - Height increased to 340px for spacious layout */}
      <div
        className="w-full rounded-t-[20px] md:rounded-t-[38.93px] rounded-b-none h-auto min-h-[220px] sm:min-h-[280px] md:h-[340px] pt-6 sm:pt-10 md:pt-[56px] pb-6 md:pb-[32px] px-4 sm:px-6 md:px-[48px] flex flex-col justify-between items-center text-left opacity-100"
        style={{
          background: 'linear-gradient(135deg, #CBE8FC 0%, #DDD4F8 33%, #F9D8E8 66%, #FFF5E6 100%)',
        }}
      >
        <h2 className="text-[28px] md:text-[46.72px] font-normal text-[#1E0A42] text-center max-w-[1041.5px] leading-[36px] md:leading-[59.84px] tracking-[-0.96px] font-['Lexend'] mt-2">
          Terapiyalar, konsultasiyalar, təlimlər və digər fəaliyyətlərdən görüntülər :
        </h2>

        {/* Controls Row */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6 mt-4">
          
          {/* ===== MOBILE VIEW (< lg) ===== */}
          <div className="flex flex-col gap-3.5 w-full lg:hidden">
            {/* Always-visible Horizontal Scrollable Category Bar */}
            <div className="w-full overflow-x-auto no-scrollbar scroll-smooth py-1">
              <div className="flex items-center gap-2 whitespace-nowrap px-0.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setCurrentPage(1);
                    }}
                    className={`min-h-[44px] px-5 py-2.5 rounded-full text-[13px] sm:text-sm font-semibold transition-all duration-200 cursor-pointer border font-['Lexend'] flex items-center justify-center select-none ${
                      activeCategory === cat.id
                        ? 'bg-[#DDD4F8] border-[#4D2059] text-[#1E0A42] shadow-sm font-bold'
                        : 'bg-white/40 border-[#4D2059]/30 text-[#1E0A42]/80 hover:bg-[#4D2059]/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Sort Dropdown */}
            <div className="flex items-center justify-between gap-3 w-full">
              <span className="text-xs sm:text-sm font-medium text-[#1E0A42]/70 font-['Lexend'] whitespace-nowrap">Sıralama :</span>
              <div className="relative flex-1 max-w-[240px]">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="w-full min-h-[44px] bg-[#4D2059] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between gap-2 shadow-md cursor-pointer font-['Lexend'] outline-none"
                >
                  <span className="truncate">{currentSortLabel}</span>
                  <ChevronDown size={16} className={`shrink-0 transition-transform duration-200 ${showSortDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Card */}
                {showSortDropdown && (
                  <>
                    <div className="fixed inset-0 z-20 cursor-default" onClick={() => setShowSortDropdown(false)} />
                    <div className="absolute right-0 mt-2 bg-white border-[2.5px] border-[#E5DFDF] rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.25)] w-full min-w-[200px] z-30 flex flex-col gap-1 p-2 animate-fade-in text-left">
                      {sortOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setActiveSort(opt.id);
                            setShowSortDropdown(false);
                            setCurrentPage(1);
                          }}
                          className={`w-full text-left min-h-[44px] px-4 py-2.5 rounded-[14px] text-[13px] font-medium font-['Lexend'] transition-colors cursor-pointer flex items-center ${
                            activeSort === opt.id
                              ? 'bg-[#482476]/15 text-[#482476] font-bold'
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

          {/* ===== DESKTOP VIEW (≥ lg) ===== */}
          <div className="hidden lg:flex items-center gap-4 w-auto">
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
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setCurrentPage(1);
                    }}
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

          {/* Desktop Sort controls dropdown */}
          <div className="hidden lg:flex relative w-auto justify-end">
            <div className="flex items-center gap-3 w-auto justify-start">
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
                            setCurrentPage(1);
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

      {/* Gallery Grid Section (4 Columns x 2 Rows = 8 items) */}
      <div className="px-4 sm:px-6 md:px-[48px] py-6 sm:py-10 w-full text-left flex-1 flex flex-col justify-between">
        {paginatedItems.length > 0 ? (
          <div className="flex flex-col h-full justify-between gap-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedItems.map((item) => (
                <div
                  key={item.id}
                  className="relative group rounded-3xl overflow-hidden shadow-lg aspect-[4/3] bg-gray-50 border border-gray-100 cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <img
                    src={item.image}
                    alt={item.badgeText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge overlay on the bottom right */}
                  <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
                    <span className="bg-black/45 border border-white/15 backdrop-blur-md text-white text-[10px] md:text-[11px] font-medium tracking-widest px-4 py-2 rounded-full uppercase shadow-sm font-['Lexend']">
                      {item.badgeText}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4">
                {/* Left Arrow */}
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={validatedCurrentPage === 1}
                  className="w-10 h-10 rounded-full bg-[#4D2059] text-white flex items-center justify-center hover:bg-[#4D2059]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-md"
                >
                  <ChevronLeft size={18} />
                </button>
                
                {/* Pages */}
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  const isActive = validatedCurrentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-md cursor-pointer font-['Lexend'] transition-all ${
                        isActive
                          ? 'bg-gradient-to-tr from-[#6366f1] to-[#a855f7] text-white scale-105'
                          : 'bg-[#4D2059] text-white hover:bg-[#4D2059]/90'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                {/* Right Arrow */}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={validatedCurrentPage === totalPages}
                  className="w-10 h-10 rounded-full bg-[#4D2059] text-white flex items-center justify-center hover:bg-[#4D2059]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-md"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center flex-1">
            <span className="text-[#1E0A42]/50 text-base font-medium font-['Lexend']">Bu kateqoriyada heç bir şəkil tapılmadı.</span>
          </div>
        )}
      </div>
    </div>
  );
};
