import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, ChevronDown, Star } from 'lucide-react';
import { psychologists as mockPsychologists } from '@/features/landing/data/psychologists';
import { PATHS } from '@/routes/paths';
import { doctorsApi } from '@/api/doctors.api';
import type { Psychologist } from '@/features/landing/types/psychologist.types';
import defaultAvatar from '@/assets/avatar1.png';
import { mapDoctorToPsychologist } from '@/utils/mappers';

type CategoryFilter = 'all' | 'child' | 'teen' | 'family';
type SortOption = 'popularity' | 'price-asc' | 'price-desc';

export const ExpertsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [activeSort, setActiveSort] = useState<SortOption>('popularity');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const [realExperts, setRealExperts] = useState<Psychologist[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctors = await doctorsApi.getAll();
        const mapped = doctors.map(mapDoctorToPsychologist);
        setRealExperts(mapped);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  const categories = [
    { id: 'all', label: 'Hamısı' },
    { id: 'child', label: 'Uşaq Psixoloqları' },
    { id: 'teen', label: 'Yeniyetmə psixoloqları' },
    { id: 'family', label: 'Ailə psixoloqları' },
  ] as const;

  const sortOptions = [
    { id: 'popularity', label: 'Populyarlığa görə' },
    { id: 'price-asc', label: 'Qiymət: Ucuzdan bahaya' },
    { id: 'price-desc', label: 'Qiymət: Bahadan ucuza' },
  ] as const;

  const currentSortLabel = sortOptions.find((opt) => opt.id === activeSort)?.label || 'Populyarlığa görə';

  // Process data filtering and sorting
  const processedExperts = useMemo(() => {
    const realExpertIds = new Set(realExperts.map(e => e.id));
    const filteredMock = mockPsychologists.filter(m => !realExpertIds.has(m.id));
    let items = [...realExperts, ...filteredMock];

    // 1. Search Query Filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.title.toLowerCase().includes(query) ||
          p.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // 2. Category Filter
    if (activeCategory !== 'all') {
      if (activeCategory === 'child') {
        items = items.filter((p) => p.tags.some((t) => t.toLowerCase().includes('uşaq')));
      } else if (activeCategory === 'teen') {
        items = items.filter((p) =>
          p.tags.some((t) => t.toLowerCase().includes('yeniyetmə') || t.toLowerCase().includes('gənclər'))
        );
      } else if (activeCategory === 'family') {
        items = items.filter((p) => p.tags.some((t) => t.toLowerCase().includes('ailə')));
      }
    }

    // 3. Sorting
    items.sort((a, b) => {
      if (activeSort === 'popularity') {
        return b.rating - a.rating; // Sort by rating for popularity
      }
      if (activeSort === 'price-asc') {
        return a.price - b.price;
      }
      if (activeSort === 'price-desc') {
        return b.price - a.price;
      }
      return 0;
    });

    return items;
  }, [searchQuery, activeCategory, activeSort, realExperts]);

  return (
    <div className="w-full flex flex-col rounded-t-[20px] md:rounded-t-[38.93px] rounded-b-[20px] md:rounded-b-[38.93px] overflow-hidden shadow-2xl bg-white animate-fade-in min-h-[calc(100vh-64px)] pb-20 opacity-100">

      {/* Top Header Section (Card with Gradient) - Height 270px */}
      <div
        className="w-full rounded-t-[20px] md:rounded-t-[38.93px] rounded-b-none min-h-[220px] sm:min-h-[250px] md:min-h-[270px] pt-[24px] sm:pt-[36px] md:pt-[45px] pb-[24px] sm:pb-[30px] md:pb-[35px] px-4 sm:px-6 md:px-[48px] flex flex-col justify-between items-center text-left opacity-100 relative"
        style={{
          background: 'linear-gradient(135deg, #CBE8FC 0%, #DDD4F8 33%, #F9D8E8 66%, #FFF5E6 100%)',
        }}
      >
        <h2 className="text-[28px] md:text-[46.72px] font-normal text-[#1E0A42] text-center max-w-[1041.5px] leading-[36px] md:leading-[59.84px] tracking-[-0.96px] font-['Lexend'] mt-1">
          Mütəxəssislərimiz ilə tanış olun!
        </h2>

        {/* Centered Search Bar */}
        <div className="w-full max-w-[776px] relative flex items-center mt-3 z-10">
          <span className="absolute left-5 text-[#1E0A42]/50">
            <Search size={18} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Hər şeyi axtarın..."
            className="w-full pl-12 pr-6 py-3.5 bg-white rounded-full border border-[#C2B7D0] text-sm text-[#1E0A42] placeholder-[#1E0A42]/50 focus:outline-none focus:border-[#4D2059]/40 focus:ring-1 focus:ring-[#4D2059]/40 font-['Lexend'] transition-all shadow-sm"
          />
        </div>

        {/* Controls Row */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6 mt-4 z-10">

          {/* ===== MOBILE VIEW (< lg) ===== */}
          <div className="flex flex-col gap-3.5 w-full lg:hidden">
            {/* Always-visible Horizontal Scrollable Category Bar */}
            <div className="w-full overflow-x-auto no-scrollbar scroll-smooth py-1">
              <div className="flex items-center gap-2 whitespace-nowrap px-0.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`min-h-[44px] px-5 py-2.5 rounded-full text-[13px] sm:text-sm font-semibold transition-all duration-200 cursor-pointer border font-['Lexend'] flex items-center justify-center select-none ${activeCategory === cat.id
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
                  className="w-full min-h-[44px] bg-[#4D2059] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between gap-2 shadow-md cursor-pointer font-['Lexend'] outline-none border-0"
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
                          }}
                          className={`w-full text-left min-h-[44px] px-4 py-2.5 rounded-[14px] text-[13px] font-medium font-['Lexend'] transition-colors cursor-pointer flex items-center border-0 ${activeSort === opt.id
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
              className={`bg-[#204F5E] text-white px-5 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 hover:bg-[#204F5E]/90 transition-all duration-300 shadow-sm cursor-pointer font-['Lexend'] border select-none outline-none group ${isFilterOpen ? 'border-[#4D2059]' : 'border-transparent'
                }`}
            >
              <SlidersHorizontal size={16} className="group-hover:scale-105 transition-transform duration-300" />
              <span>Filter</span>
            </button>

            <div
              className={`transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isFilterOpen
                  ? 'max-w-[700px] opacity-100 translate-x-0 overflow-x-auto no-scrollbar'
                  : 'max-w-0 opacity-0 -translate-x-8 overflow-hidden pointer-events-none'
                }`}
            >
              <div className="flex items-center gap-2.5 whitespace-nowrap pl-1 pr-4 py-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer border font-['Lexend'] ${activeCategory === cat.id
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
              <span className="text-sm font-semibold text-[#1E0A42]/65 font-['Lexend'] whitespace-nowrap">Sıralama :</span>
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="bg-[#4D2059] text-white px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 hover:bg-[#4D2059]/90 transition-colors shadow-md cursor-pointer font-['Lexend'] min-w-[200px] justify-between border-0"
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
                          className={`w-full text-left px-3.5 py-1.5 rounded-[14px] text-[11px] font-bold leading-[21px] tracking-[0.35px] font-['Lexend'] transition-colors duration-150 cursor-pointer border-0 ${activeSort === opt.id
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

      {/* Second Section: Expert Cards Grid Section */}
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {processedExperts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30.98px] w-full justify-start items-stretch">
            {processedExperts.map((expert) => (
              <div
                key={expert.id}
                onClick={() => navigate(PATHS.WEBAPP_EXPERT_DETAIL.replace(':id', String(expert.id)))}
                className="flex flex-col text-white w-full max-w-[593.6px] rounded-[16px] sm:rounded-[19px] bg-[#4B2E83] border border-white/10 hover:shadow-2xl cursor-pointer group p-5 sm:p-6 md:p-8 transition-all duration-300 hover:scale-[1.01] mx-auto"
                style={{
                  boxShadow: '0px 4.48px 4.48px rgba(0, 0, 0, 0.25), 0px 4.48px 4.48px rgba(0, 0, 0, 0.25)',
                }}
              >
                {/* Header inside Card: Avatar + Info & Price */}
                <div className="flex flex-row justify-between items-start w-full">
                  {/* Avatar & Ratings Column */}
                  <div className="flex flex-row gap-4 items-center">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      onError={(e) => {
                        e.currentTarget.src = defaultAvatar;
                      }}
                      className="w-20 h-20 rounded-full border-2 border-white/20 object-cover shadow-sm flex-shrink-0"
                    />
                    <div className="flex flex-col text-left font-['Lexend']">
                      <span className="text-lg md:text-xl font-bold text-white leading-tight">
                        {expert.name}
                      </span>
                      <span className="text-xs text-white/70 mt-1 font-medium">
                        {expert.experience} • {expert.title}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-amber-400 mt-2 font-semibold">
                        <Star size={13} fill="currentColor" className="text-amber-400" />
                        {expert.rating.toFixed(1)}
                      </div>
                    </div>
                  </div>

                  {/* Pricing text */}
                  <span className="text-[20px] md:text-[22px] font-bold text-white tracking-tight flex-shrink-0 font-['Lexend']">
                    ${expert.price}<span className="text-xs font-normal text-white/70">/seans</span>
                  </span>
                </div>

                {/* Bio description paragraph */}
                <p className="text-xs md:text-sm text-white/80 leading-relaxed mt-5 text-left line-clamp-3 font-['Lexend']">
                  {expert.description}
                </p>

                {/* Languages badges */}
                <div className="flex flex-wrap gap-2.5 mt-5">
                  {expert.languages.map((lang) => (
                    <span
                      key={lang}
                      className="bg-white text-[#0D0669] text-[10px] font-bold px-4 py-1.5 rounded-full border border-[#0D0669]/10 shadow-sm font-['Lexend'] uppercase"
                    >
                      {lang}
                    </span>
                  ))}
                </div>

                {/* Specialties badges */}
                <div className="flex flex-wrap gap-2.5 mt-2.5">
                  {expert.tags.slice(0, 3).map((spec) => (
                    <span
                      key={spec}
                      className="bg-white/10 text-white text-[10px] font-bold px-4 py-1.5 rounded-full border border-white/5 shadow-sm font-['Lexend'] uppercase"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* CTA Booking Button */}
                <button className="bg-white hover:bg-white/95 text-[#0D0669] font-bold text-xs md:text-sm py-4 rounded-[14px] w-full text-center mt-2.5 shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer uppercase tracking-wider font-['Lexend'] border-0">
                  Başlayaq
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center w-full">
            <span className="text-[#1E0A42]/50 text-base font-medium font-['Lexend']">
              Axtarışınıza uyğun mütəxəssis tapılmadı.
            </span>
          </div>
        )}
      </div>

    </div>
  );
};
