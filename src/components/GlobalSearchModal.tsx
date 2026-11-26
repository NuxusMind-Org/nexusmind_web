import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppIcon } from './common/AppIcon';
import {
  QUICK_SEARCH_TERMS,
  type SearchLanguage,
  type SearchResultItem,
} from '@/data/staticSearchData';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';

export interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePage?: string;
  scrollToSection?: (id: string) => void;
}

const GlobalSearchModalContent = ({
  onClose,
  activePage,
  scrollToSection,
}: Omit<GlobalSearchModalProps, 'isOpen'>) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const rawLang = (i18n.resolvedLanguage || i18n.language || 'az').slice(0, 2);
  const lang: SearchLanguage =
    rawLang === 'en' || rawLang === 'ru' ? rawLang : 'az';

  const { results, totalCount, isShowingPopular } = useGlobalSearch(query, lang);

  const safeHighlightedIndex =
    highlightedIndex >= 0 && results.length > 0
      ? Math.min(highlightedIndex, results.length - 1)
      : -1;

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSelectResult = (item: SearchResultItem) => {
    onClose();
    if (item.scrollId && activePage === 'landing' && scrollToSection) {
      scrollToSection(item.scrollId);
    } else {
      navigate(item.path);
    }
  };

  const handleQuickSearch = (term: string) => {
    setQuery(term);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  // Keyboard navigation inside the open modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (results.length === 0) return;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setHighlightedIndex((prev) => {
          const next = prev < 0 ? 0 : (prev + 1) % results.length;
          resultRefs.current[next]?.scrollIntoView({ block: 'nearest' });
          return next;
        });
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setHighlightedIndex((prev) => {
          const next = prev <= 0 ? results.length - 1 : prev - 1;
          resultRefs.current[next]?.scrollIntoView({ block: 'nearest' });
          return next;
        });
      } else if (event.key === 'Enter' && safeHighlightedIndex >= 0) {
        const selected = results[safeHighlightedIndex];
        if (selected) {
          event.preventDefault();
          onClose();
          if (selected.scrollId && activePage === 'landing' && scrollToSection) {
            scrollToSection(selected.scrollId);
          } else {
            navigate(selected.path);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [results, safeHighlightedIndex, onClose, activePage, scrollToSection, navigate]);

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={t('search.openAriaLabel', 'Axtarış')}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-[560px] max-h-[80vh] bg-[#161226]/95 border border-purple-400/25 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.7),_0_0_24px_rgba(103,0,255,0.16)] flex flex-col overflow-hidden text-white">
        {/* Subtle ambient glow */}
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-[#00F2FF]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Search Input Header */}
        <div className="relative z-10 flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-white/10">
          <AppIcon
            icon="lucide:search"
            size={19}
            className="text-[#00F2FF] shrink-0"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlightedIndex(-1);
            }}
            placeholder={t(
              'search.placeholder',
              'Mütəxəssislər, məqalələr, təlimlər axtarın...'
            )}
            className="flex-1 bg-transparent border-0 outline-none text-white placeholder:text-white/45 text-[15px] sm:text-[16px] min-w-0"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setHighlightedIndex(-1);
                inputRef.current?.focus();
              }}
              aria-label={t('search.clear', 'Axtarışı təmizlə')}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 border-0 outline-none"
            >
              <AppIcon icon="lucide:x" size={14} />
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label={t('search.close', 'Bağla')}
            className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 border border-white/10 outline-none"
          >
            <AppIcon icon="lucide:x" size={16} />
          </button>
        </div>

        {/* Quick Search Buttons */}
        <div className="relative z-10 flex items-center gap-2 px-4 sm:px-5 py-3 border-b border-white/10 flex-wrap">
          <span className="text-[12px] text-white/45 mr-0.5">
            {t('search.quickSearches', 'Sürətli axtarış:')}
          </span>
          {QUICK_SEARCH_TERMS.map((item) => {
            const label = item.label[lang];
            const isActive = query.trim().toLowerCase() === label.toLowerCase();
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleQuickSearch(label)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-medium transition-all cursor-pointer border outline-none ${
                  isActive
                    ? 'bg-[#6700FF]/35 border-[#00F2FF]/50 text-white'
                    : 'bg-white/[0.05] border-white/10 text-white/75 hover:text-white hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <AppIcon icon="lucide:search" size={12} className="text-[#00F2FF]/80" />
                <span className="ponnala-nudge">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Results / Popular Posts Body */}
        <div className="relative z-10 flex-1 overflow-y-auto px-3 sm:px-4 py-3.5 flex flex-col gap-1.5">
          <div className="px-2 pb-1">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-white/45">
              {isShowingPopular
                ? t('search.popularPosts', 'Populyar bloq və xəbərlər')
                : `${t('search.results', 'Nəticələr')} (${totalCount})`}
            </span>
          </div>

          {results.length > 0 ? (
            <div className="flex flex-col gap-1" role="listbox">
              {results.map((item, idx) => {
                const isHighlighted = idx === safeHighlightedIndex;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      resultRefs.current[idx] = el;
                    }}
                    type="button"
                    role="option"
                    aria-selected={isHighlighted}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    onMouseLeave={() => setHighlightedIndex(-1)}
                    onClick={() => handleSelectResult(item)}
                    className={`group/result w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer border outline-none ${
                      isHighlighted
                        ? 'bg-white/[0.08] border-white/15'
                        : 'bg-transparent border-transparent hover:bg-white/[0.06]'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                        isHighlighted
                          ? 'bg-[#6700FF]/25 border-[#00F2FF]/35 text-[#00F2FF]'
                          : 'bg-white/[0.05] border-white/10 text-[#A682FF]'
                      }`}
                    >
                      <AppIcon icon={item.icon} size={17} />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <span className="text-[14px] sm:text-[15px] font-medium text-white truncate">
                        {item.title[lang]}
                      </span>
                      <p className="text-[13px] text-white/55 truncate leading-snug">
                        {item.description[lang]}
                      </p>
                    </div>

                    <AppIcon
                      icon="lucide:arrow-right"
                      size={15}
                      className={`shrink-0 transition-all duration-200 ${
                        isHighlighted
                          ? 'text-[#00F2FF] translate-x-0.5 opacity-100'
                          : 'text-white/30 opacity-0 group-hover/result:opacity-100'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-8 px-4 gap-2.5">
              <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/45">
                <AppIcon icon="lucide:search-x" size={20} />
              </div>
              <div className="flex flex-col gap-1 max-w-xs">
                <p className="text-[15px] font-semibold text-white">
                  {t('search.emptyTitle', 'Nəticə tapılmadı')}
                </p>
                <p className="text-[13px] text-white/55">
                  {t(
                    'search.emptyDescription',
                    'Axtarış sözünü dəyişdirərək yenidən cəhd edin.'
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setHighlightedIndex(-1);
                  inputRef.current?.focus();
                }}
                className="mt-1 px-4 py-1.5 rounded-lg text-[13px] font-medium text-[#00F2FF] bg-[#00F2FF]/10 hover:bg-[#00F2FF]/20 border border-[#00F2FF]/30 transition-colors cursor-pointer outline-none"
              >
                {t('search.clear', 'Axtarışı təmizlə')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export const GlobalSearchModal = ({
  isOpen,
  onClose,
  activePage,
  scrollToSection,
}: GlobalSearchModalProps) => {
  if (!isOpen) return null;

  return (
    <GlobalSearchModalContent
      onClose={onClose}
      activePage={activePage}
      scrollToSection={scrollToSection}
    />
  );
};
