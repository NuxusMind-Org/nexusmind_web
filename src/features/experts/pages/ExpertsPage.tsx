import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/components';
import { psychologists as mockPsychologists } from '@/features/landing/data/psychologists';
import { doctorsApi } from '@/api/doctors.api';
import type { Psychologist } from '@/features/landing/types/psychologist.types';
import { mapDoctorToPsychologist } from '@/utils/mappers';
import { LandingNavbar } from '@/features/landing/components/LandingNavbar';
import { Footer } from '@/features/landing/components/Footer';
import { ExpertCard } from '../components/ExpertCard';

type CategoryFilter = 'all' | 'anxiety' | 'family' | 'child' | 'trauma';
type SortOption = 'popularity' | 'experience' | 'name';

export const ExpertsPage = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [activeSort, setActiveSort] = useState<SortOption>('popularity');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [realExperts, setRealExperts] = useState<Psychologist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        const doctors = await doctorsApi.getAll();
        if (isMounted && doctors && doctors.length > 0) {
          const currentLang = (i18n.language?.slice(0, 2) as 'az' | 'en' | 'ru') || 'az';
          const mapped = doctors.map((doc) => mapDoctorToPsychologist(doc, currentLang));
          setRealExperts(mapped);
        }
      } catch (error) {
        console.error('Failed to fetch doctors from database:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    fetchDoctors();
    return () => {
      isMounted = false;
    };
  }, [i18n.language]);

  const categories = useMemo(() => [
    { id: 'all' as const, label: t('experts.categories.all', 'Bütün mütəxəssislər') },
    { id: 'anxiety' as const, label: t('experts.categories.anxiety', 'Təşviş və Depressiya') },
    { id: 'family' as const, label: t('experts.categories.family', 'Ailə və Münasibətlər') },
    { id: 'child' as const, label: t('experts.categories.child', 'Uşaq və Yeniyetmə') },
    { id: 'trauma' as const, label: t('experts.categories.trauma', 'Travma və Stress') },
  ], [t]);

  const sortOptions = useMemo(() => [
    { id: 'popularity' as const, label: t('experts.sort.popularity', 'Populyarlığa görə') },
    { id: 'experience' as const, label: t('experts.sort.experience', 'Təcrübəyə görə') },
    { id: 'name' as const, label: t('experts.sort.name', 'Ada görə (A-Z)') },
  ], [t]);

  const currentSortLabel = sortOptions.find((opt) => opt.id === activeSort)?.label || sortOptions[0].label;

  const processedExperts = useMemo(() => {
    // If real experts exist in database, prioritize them. If empty, fall back to mock experts.
    let items = realExperts.length > 0 ? [...realExperts] : [...mockPsychologists];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (expert) =>
          expert.name.toLowerCase().includes(q) ||
          (expert.specialty && expert.specialty.toLowerCase().includes(q)) ||
          expert.title.toLowerCase().includes(q) ||
          expert.description.toLowerCase().includes(q) ||
          (expert.tags && expert.tags.some(tag => tag.toLowerCase().includes(q)))
      );
    }

    if (activeCategory !== 'all') {
      items = items.filter((expert) => {
        const text = `${expert.specialty || ''} ${expert.title || ''} ${expert.description || ''} ${(expert.tags || []).join(' ')}`.toLowerCase();
        if (activeCategory === 'anxiety') {
          return text.includes('təşviş') || text.includes('anxiety') || text.includes('depressiya') || text.includes('panik') || text.includes('fobiya') || text.includes('stres');
        }
        if (activeCategory === 'family') {
          return text.includes('ailə') || text.includes('cütlük') || text.includes('family') || text.includes('münasibət') || text.includes('boşanma');
        }
        if (activeCategory === 'child') {
          return text.includes('uşaq') || text.includes('child') || text.includes('yeniyetmə') || text.includes('teen') || text.includes('hiperaktiv');
        }
        if (activeCategory === 'trauma') {
          return text.includes('travma') || text.includes('trauma') || text.includes('posttravmatik') || text.includes('yas') || text.includes('itki');
        }
        return true;
      });
    }

    if (activeSort === 'popularity') {
      items.sort((a, b) => (b.rating || 5.0) - (a.rating || 5.0));
    } else if (activeSort === 'experience') {
      const parseExp = (str: string) => {
        const match = str.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      };
      items.sort((a, b) => parseExp(b.experience) - parseExp(a.experience));
    } else if (activeSort === 'name') {
      items.sort((a, b) => a.name.localeCompare(b.name));
    }

    return items;
  }, [realExperts, searchQuery, activeCategory, activeSort]);

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white bg-landing-gradient">
      <LandingNavbar activePage="experts" />

      <main className="flex-1 w-full px-4 sm:px-8 lg:px-[54px] py-8 sm:py-12 flex flex-col gap-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/10">
          <div className="flex flex-col items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#00f2ff] bg-[#00f2ff]/10 border border-[#00f2ff]/20 mb-3 shadow-[0_0_12px_rgba(0,242,255,0.15)]">
              <AppIcon icon="lucide:sparkles" size={13} />
              {t('experts.badge', 'Peşəkar komanda')}
            </span>
            <h1 className="text-[32px] sm:text-[44px] md:text-[50px] font-bold text-white tracking-tight leading-tight mb-2">
              {t('experts.pageTitle', 'Mütəxəssislərimiz')}
            </h1>
            <p className="text-white/75 text-[15px] sm:text-[17px] max-w-2xl leading-relaxed">
              {t('experts.pageSubtitle', 'Psixoloji rifahınız üçün təsdiqlənmiş, təcrübəli psixoloq və terapevtlərimizlə tanış olun və rahatlıqla seans təyin edin.')}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-88 shrink-0">
            <AppIcon icon="lucide:search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('experts.searchPlaceholder', 'Mütəxəssis adı və ya istiqamət üzrə axtar...')}
              className="w-full bg-white/10 border border-white/15 focus:border-[#00f2ff] text-white placeholder-white/40 pl-11 pr-10 py-3 rounded-2xl text-[14px] outline-none transition-all backdrop-blur-md focus:ring-1 focus:ring-[#00f2ff]/30"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/50 hover:text-white transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <AppIcon icon="lucide:x" size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills & Sort Dropdown */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer select-none ${
                  activeCategory === cat.id
                    ? 'bg-[#00f2ff] text-slate-950 font-semibold shadow-[0_0_15px_rgba(0,242,255,0.4)]'
                    : 'bg-white/10 text-white/80 hover:text-white hover:bg-white/15 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Result Count and Sort Dropdown */}
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-xs sm:text-sm text-white/60 hidden sm:inline-block">
              {processedExperts.length} {t('experts.foundCount', 'mütəxəssis tapıldı')}
            </span>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSortDropdown((prev) => !prev)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm text-white/85 hover:text-white hover:bg-white/15 transition-all cursor-pointer select-none"
              >
                <AppIcon icon="lucide:sliders-horizontal" size={14} className="text-[#00f2ff]" />
                <span>{currentSortLabel}</span>
                <AppIcon icon="lucide:chevron-down" size={14} className={`transition-transform duration-200 ${showSortDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showSortDropdown && (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-[#141226]/95 backdrop-blur-xl border border-white/15 p-1.5 shadow-2xl z-30 flex flex-col gap-1">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setActiveSort(opt.id);
                        setShowSortDropdown(false);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                        activeSort === opt.id ? 'bg-[#00f2ff] text-slate-950 font-semibold' : 'text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Loading Skeletons */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="w-full aspect-[350/470] rounded-[24px] overflow-hidden bg-[#1A2836] border border-white/10 p-5 flex flex-col justify-between animate-pulse relative"
              >
                {/* Top badges skeleton */}
                <div className="flex items-center justify-between w-full">
                  <div className="h-6 w-16 rounded-full bg-white/10" />
                  <div className="h-6 w-12 rounded-full bg-white/10" />
                </div>
                {/* Bottom content skeleton */}
                <div className="flex flex-col items-center gap-2.5 w-full mt-auto">
                  <div className="h-6 w-3/4 rounded-lg bg-white/15" />
                  <div className="h-4 w-1/2 rounded-md bg-white/10" />
                  <div className="h-4 w-1/3 rounded-md bg-white/10" />
                  <div className="w-full h-9 rounded-xl bg-white/10 mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : processedExperts.length === 0 ? (
          /* Empty Search / Filter State */
          <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 text-[#00f2ff]">
              <AppIcon icon="lucide:search" size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {t('experts.noResults', 'Axtarışınıza uyğun mütəxəssis tapılmadı')}
            </h3>
            <p className="text-sm text-white/60 max-w-md mb-6">
              Axtarış sözünü dəyişərək və ya seçilmiş filtrləri sıfırlayaraq yenidən cəhd edə bilərsiniz.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-6 py-2.5 rounded-full bg-[#00f2ff] text-slate-950 font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_15px_rgba(0,242,255,0.4)]"
            >
              {t('experts.resetFilters', 'Filtrləri sıfırla')}
            </button>
          </div>
        ) : (
          /* Experts Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {processedExperts.map((psych) => (
              <ExpertCard key={psych.id} expert={psych} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
