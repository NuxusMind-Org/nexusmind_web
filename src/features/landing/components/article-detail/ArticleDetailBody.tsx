import { AppIcon } from '@/components';
import type { MeqaleResponseDto, MeqaleHighlightCardResponseDto } from '@/api/types';
import { getLocalizedTitle } from '@/utils/multilingual';
import type { ContentLang } from '@/utils/contentMappers';

interface ArticleDetailBodyProps {
  meqale: MeqaleResponseDto;
  lang: ContentLang;
}

function resolveCardIcon(icon?: string): string {
  if (!icon || !icon.trim()) return 'lucide:sparkles';
  return icon.includes(':') ? icon : `lucide:${icon}`;
}

export const ArticleDetailBody = ({ meqale, lang }: ArticleDetailBodyProps) => {
  const introText = getLocalizedTitle(meqale.introText || meqale.shortDescription, lang, '');

  const sortedSections = Array.isArray(meqale.sections)
    ? [...meqale.sections].sort((a, b) => (a.sectionOrder ?? 0) - (b.sectionOrder ?? 0))
    : [];

  const highlightCards: MeqaleHighlightCardResponseDto[] = Array.isArray(meqale.highlightCards) && meqale.highlightCards.length > 0
    ? [...meqale.highlightCards].sort((a, b) => (a.cardOrder ?? 0) - (b.cardOrder ?? 0))
    : meqale.highlightCard
      ? [meqale.highlightCard]
      : [];

  const firstChar = introText ? introText.charAt(0) : '';
  const remainingIntro = introText ? introText.slice(1) : '';

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        color: 'rgba(255,255,255,0.82)',
        fontSize: '15px',
        lineHeight: '1.75',
        fontWeight: 300,
        textAlign: 'left',
      }}
    >
      {/* Intro paragraph with drop cap */}
      {introText && (
        <div style={{ overflow: 'hidden' }}>
          <span
            style={{
              float: 'left',
              fontSize: '5.2rem',
              lineHeight: '0.8',
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 300,
              color: '#ffffff',
              marginRight: '10px',
              marginTop: '6px',
              userSelect: 'none',
            }}
          >
            {firstChar}
          </span>
          <span className="whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.82)', fontSize: '15px', lineHeight: '1.75', fontWeight: 300 }}>
            {remainingIntro}
          </span>
        </div>
      )}

      {/* Structured backend sections */}
      {sortedSections.map((section, idx) => {
        const heading = getLocalizedTitle(section.title, lang, '');
        const body = getLocalizedTitle(section.text, lang, '');
        if (!heading && !body) return null;

        return (
          <div key={`${section.sectionOrder ?? idx}-${idx}`}>
            {heading && (
              <h2
                style={{
                  color: '#ffffff',
                  fontSize: '26px',
                  fontWeight: 600,
                  lineHeight: '1.3',
                  marginBottom: '12px',
                  letterSpacing: '-0.3px',
                }}
              >
                {heading}
              </h2>
            )}
            {body && (
              <p
                className="whitespace-pre-line"
                style={{ margin: 0, color: 'rgba(255,255,255,0.80)', fontSize: '15px', lineHeight: '1.75', fontWeight: 300 }}
              >
                {body}
              </p>
            )}
          </div>
        );
      })}

      {/* Premium Glassmorphic Blockquote card */}
      {meqale.quote && meqale.quote.trim().length > 0 && (
        <div className="my-4 relative bg-gradient-to-r from-[#7B2CBF]/20 to-[#1B3A4B]/20 border-l-[3px] border-l-[#A682FF]/60 border-t border-t-white/10 border-r border-r-white/10 border-b border-b-white/10 rounded-lg p-6 sm:p-8 pr-6 sm:pr-10 pl-10 sm:pl-12 backdrop-blur-sm flex flex-col gap-3">
          <div className="absolute left-0 -translate-x-1/2 top-10 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded bg-[#130d24] border border-[#A682FF]/30 flex items-center justify-center z-20 shadow-lg">
            <AppIcon icon="lucide:quote" className="text-white fill-white w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          <blockquote className="text-white text-[16px] font-light italic leading-relaxed z-10">
            &ldquo;{meqale.quote}&rdquo;
          </blockquote>
        </div>
      )}

      {/* Highlight cards from backend */}
      {highlightCards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-2">
          {highlightCards.map((card, idx) => (
            <div
              key={`${card.id ?? card.cardOrder ?? idx}-${idx}`}
              style={{
                background: 'rgba(18, 24, 64, 0.72)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AppIcon
                  icon={resolveCardIcon(card.icon)}
                  size={20}
                  style={{ color: idx % 2 === 0 ? '#00f2ff' : '#a682ff', flexShrink: 0 }}
                />
                {card.title && (
                  <h3 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, margin: 0 }}>
                    {card.title}
                  </h3>
                )}
              </div>
              {card.text && (
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: '1.65', fontWeight: 300, margin: 0 }}>
                  {card.text}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
