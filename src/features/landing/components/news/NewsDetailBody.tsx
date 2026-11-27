import { AppIcon } from '@/components';
import type { XeberResponseDto } from '@/api/types';
import { getLocalizedTitle } from '@/utils/multilingual';
import type { ContentLang } from '@/utils/contentMappers';

interface NewsDetailBodyProps {
  news: XeberResponseDto;
  lang: ContentLang;
}

export const NewsDetailBody = ({ news, lang }: NewsDetailBodyProps) => {
  const introText = getLocalizedTitle(news.introText || news.shortDescription, lang, '');

  const sortedSections = Array.isArray(news.sections)
    ? [...news.sections].sort(
        (a, b) => (a.sectionOrder ?? a.order ?? 0) - (b.sectionOrder ?? b.order ?? 0)
      )
    : [];

  return (
    <div className="w-full flex flex-col gap-6 text-white/80 leading-relaxed font-light text-[15px] sm:text-[16px]">
      {/* Intro paragraph */}
      {introText && (
        <p className="text-white/90 text-[16px] sm:text-[17px] leading-relaxed whitespace-pre-line">
          {introText}
        </p>
      )}

      {/* Structured backend sections */}
      {sortedSections.map((section, idx) => {
        const heading = getLocalizedTitle(section.title, lang, '');
        const body = getLocalizedTitle(section.text, lang, '');
        if (!heading && !body) return null;

        return (
          <div key={`${section.sectionOrder ?? idx}-${idx}`} className="mt-2">
            {heading && (
              <h3 className="text-white text-[20px] sm:text-[22px] font-semibold mb-3 tracking-tight">
                {heading}
              </h3>
            )}
            {body && <p className="whitespace-pre-line">{body}</p>}
          </div>
        );
      })}

      {/* Glassmorphic Blockquote card (when backend provides a quote) */}
      {news.quote && news.quote.trim().length > 0 && (
        <div className="my-4 relative bg-gradient-to-r from-[#7B2CBF]/20 to-[#1B3A4B]/20 border-l-[3px] border-l-[#A682FF]/60 border-t border-t-white/10 border-r border-r-white/10 border-b border-b-white/10 rounded-lg p-6 sm:p-8 pr-6 sm:pr-10 pl-10 sm:pl-12 backdrop-blur-sm flex flex-col gap-3">
          <div className="absolute left-0 -translate-x-1/2 top-10 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded bg-[#130d24] border border-[#A682FF]/30 flex items-center justify-center z-20 shadow-lg">
            <AppIcon icon="lucide:quote" className="text-white fill-white w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          <blockquote className="text-white text-[16px] font-light italic leading-relaxed z-10">
            &ldquo;{news.quote}&rdquo;
          </blockquote>
          {news.quoteAuthor && news.quoteAuthor.trim().length > 0 && (
            <cite className="text-[#A682FF] text-[14px] font-semibold not-italic z-10">
              — {news.quoteAuthor}
            </cite>
          )}
        </div>
      )}
    </div>
  );
};
