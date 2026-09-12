import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES, type LanguageCode } from '@/libs/i18n';

interface LanguageSelectorProps {
  direction?: 'down' | 'up';
  className?: string;
}

export const LanguageSelector = ({
  direction = 'down',
  className = '',
}: LanguageSelectorProps) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Normalize current language (e.g. 'en-US' -> 'en')
  const currentLangCode = (i18n.resolvedLanguage || i18n.language || 'az').slice(0, 2) as LanguageCode;
  const currentLang = SUPPORTED_LANGUAGES.find((lang) => lang.code === currentLangCode) || SUPPORTED_LANGUAGES[0];

  const handleLanguageChange = (code: LanguageCode) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left z-50 ${className}`}>
      {/* Trigger Button: matches "En ⌵" design */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 py-2 px-2 text-white/80 hover:text-white font-medium text-[15px] transition-colors cursor-pointer outline-none select-none"
      >
        <span>{currentLang.shortLabel}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 text-white/80 ${
            isOpen ? 'rotate-180 text-[#00f2ff]' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 min-w-[150px] transition-all duration-200 ease-out ${
          direction === 'up'
            ? 'bottom-full mb-2 origin-bottom-right'
            : 'top-full mt-2 origin-top-right'
        } ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="glass-card rounded-xl p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] border border-white/10 backdrop-blur-xl bg-[#1e293b]/90">
          <div role="listbox" aria-label="Languages" className="flex flex-col gap-0.5">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = currentLang.code === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex items-center justify-between px-3 py-2 text-[14px] rounded-lg transition-colors cursor-pointer text-left ${
                    isSelected
                      ? 'bg-white/10 text-[#00f2ff] font-medium'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[13px] opacity-75">{lang.shortLabel}</span>
                    <span>{lang.label}</span>
                  </div>
                  {isSelected && <Check size={14} className="text-[#00f2ff] shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
