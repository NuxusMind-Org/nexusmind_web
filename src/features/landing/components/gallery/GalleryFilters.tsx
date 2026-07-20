import { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

export type CategoryFilter = 'all' | 'terapiyalar' | 'otaqlar' | 'telimler';
export type SortOption = 'popularity' | 'date-desc' | 'date-asc';

interface GalleryFiltersProps {
  activeCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  activeSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SORT_LABELS: Record<SortOption, string> = {
  'popularity': 'Populyarlığa görə',
  'date-desc': 'Tarix: Yenidən köhnəyə',
  'date-asc': 'Tarix: Köhnədən yeniyə',
};

export const GalleryFilters = ({
  activeCategory,
  onCategoryChange,
  activeSort,
  onSortChange,
}: GalleryFiltersProps) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const categories: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: 'Hamısı' },
    { value: 'terapiyalar', label: 'Terapiyalar' },
    { value: 'otaqlar', label: 'Otaqlar' },
    { value: 'telimler', label: 'Təlimlər' },
  ];

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10 relative z-30">
      {/* Left: Filter Toggle and Pills */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Clickable Filter Toggle Button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`flex items-center gap-2 bg-[#255765]/85 hover:bg-[#255765] border rounded-[8px] px-4 py-2 text-[14px] font-medium text-white shadow-lg cursor-pointer transition-all duration-300 select-none outline-none group ${isFilterOpen ? 'border-[#8A38F5]' : 'border-[rgba(255,255,255,0.1)]'
            }`}
        >
          <SlidersHorizontal size={15} className="group-hover:scale-105 transition-transform duration-300" />
          <span>Filter</span>
        </button>

        {/* Category Pills with smooth horizontal slide animation */}
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isFilterOpen
              ? 'max-w-[700px] opacity-100 translate-x-0 overflow-x-auto no-scrollbar'
              : 'max-w-0 opacity-0 -translate-x-8 overflow-hidden pointer-events-none'
            }`}
        >
          <div className="flex items-center gap-2 whitespace-nowrap pl-1 pr-4 py-1">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => onCategoryChange(cat.value)}
                  className={`px-5 py-2.5 rounded-lg border text-[14px] font-medium transition-all duration-300 cursor-pointer shadow-md ${isSelected
                    ? 'bg-white/10 border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                    : 'bg-transparent border-white/20 text-white/70 hover:text-white hover:border-white/40'
                    }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right: Sorting Select Dropdown */}
      <div className="flex items-center gap-3 self-end md:self-auto" ref={dropdownRef}>
        <span className="text-white/60 text-[14px] font-medium">Sıralama :</span>
        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-lg px-5 py-2.5 text-[14px] font-medium text-white flex items-center justify-between gap-3 min-w-[200px] cursor-pointer hover:bg-white/5 hover:border-white/20 transition-all shadow-lg"
          >
            <span>{SORT_LABELS[activeSort]}</span>
            <ChevronDown size={16} className={`text-white/60 transition-transform duration-300 ${isSortOpen ? 'rotate-180 text-white' : ''}`} />
          </button>

          {/* Custom Dropdown Drop-list */}
          <div
            className={`absolute right-0 top-full mt-2 w-full min-w-[200px] transition-all duration-300 transform z-50 ${isSortOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-2 pointer-events-none'
              }`}
          >
            <div className="glass-card rounded-lg p-2 flex flex-col gap-0.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onSortChange(option);
                    setIsSortOpen(false);
                  }}
                  className={`w-full text-left py-2.5 px-3 rounded-lg text-[13px] font-medium transition-colors cursor-pointer bg-transparent border-0 outline-none ${activeSort === option
                    ? 'text-[#00f2ff] bg-white/5'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {SORT_LABELS[option]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
