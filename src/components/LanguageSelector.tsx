import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AppIcon } from './common/AppIcon';
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
        <AppIcon
          icon="lucide:chevron-down"
          size={14}
          className={`transition-transform duration-300 text-white/80 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 w-44 transition-all duration-200 ease-out ${
          direction === 'up'
            ? 'bottom-full mb-2 origin-bottom-right'
            : 'top-full mt-2 origin-top-right'
        } ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="glass-card rounded-lg p-3 flex flex-col gap-1 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <div role="listbox" aria-label="Languages" className="flex flex-col gap-1">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = currentLang.code === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`group/item flex items-center justify-between hover:text-[#00f2ff] py-2 px-3 text-[14px] font-medium transition-colors cursor-pointer w-full text-left bg-transparent border-0 outline-none ${
                    isSelected ? 'text-white' : 'text-white/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[13px] font-semibold transition-opacity ${isSelected ? 'opacity-100 text-white' : 'opacity-70'}`}>
                      {lang.shortLabel}
                    </span>
                    <span className="ponnala-nudge">{lang.label}</span>
                  </div>
                  {isSelected ? (
                    <AppIcon
                      icon="lucide:check"
                      size={14}
                      className="text-white/80 group-hover/item:text-[#00f2ff] transition-colors shrink-0 ml-2"
                    />
                  ) : (
                    <AppIcon
                      icon="lucide:chevron-right"
                      size={14}
                      className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 text-[#00f2ff]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
