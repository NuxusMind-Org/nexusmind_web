import { Sprout, Headphones, Play } from 'lucide-react';

const CARD_STYLE: React.CSSProperties = {
  width: '284px',
  minHeight: '228px',
  borderRadius: '24px',
  padding: '32px',
  gap: '16px',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(255,255,255,0.07)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  border: '1px solid rgba(255,255,255,0.12)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
  boxSizing: 'border-box',
};

export const ArticleDetailSidebar = () => {
  const popularTopics = [
    '#BeyinElmi',
    '#VRMetaverse',
    '#Terapevtikİnnovasiya',
    '#RəqəmsalDetoks',
    '#GələcəkPsixologiyası',
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '284px',
        flexShrink: 0,
      }}
    >
      {/* Card 1: Support */}
      <div style={CARD_STYLE}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 600, lineHeight: '1.3', margin: 0 }}>
            Dəstək lazımdır?
          </h3>
          <Sprout size={28} style={{ color: 'rgba(255,255,255,0.15)', flexShrink: 0, marginLeft: '8px' }} />
        </div>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', fontWeight: 300, lineHeight: '1.6', margin: 0, flexGrow: 1 }}>
          Mütəxəssislərimiz sizə kömək etməyə hazırdır.
        </p>
        <button
          style={{
            width: '100%',
            padding: '12px 0',
            background: '#581c87',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '14px',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(88,28,135,0.45)',
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = '#6c22b5';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(88,28,135,0.65)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = '#581c87';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px rgba(88,28,135,0.45)';
          }}
        >
          Məsləhət Al
        </button>
      </div>

      {/* Card 2: Podcast */}
      <div style={CARD_STYLE}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(27,58,75,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Headphones size={17} style={{ color: '#00f2ff' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span style={{ color: '#ffffff', fontSize: '15px', fontWeight: 600 }}>Sanctuary Podkast</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 300 }}>Həftəlik buraxılış</span>
          </div>
        </div>

        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', fontWeight: 300, lineHeight: '1.6', margin: 0, flexGrow: 1 }}>
          "Rəqəmsal Dünyada İnsan Olmaq" — Bu həftəlik qonağımız Dr. Leyla Əliyeva ilə maraqlı söhbəti dinləyin.
        </p>

        <button
          style={{
            width: '100%',
            padding: '10px 0',
            background: 'rgba(255,255,255,0.06)',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '13px',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.12)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '7px',
            transition: 'background 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.22)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)';
          }}
        >
          <Play size={11} style={{ fill: '#ffffff', color: '#ffffff' }} />
          <span>İndi Dinlə</span>
        </button>
      </div>

      {/* Card 3: Popular Topics */}
      <div style={CARD_STYLE}>
        <h3 style={{ color: '#c39ffd', fontSize: '16px', fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
          Populyar Mövzular
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {popularTopics.map((topic) => (
            <span
              key={topic}
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.65)',
                padding: '5px 12px',
                fontSize: '11px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                transition: 'color 0.2s, border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLSpanElement).style.color = '#00f2ff';
                (e.currentTarget as HTMLSpanElement).style.borderColor = 'rgba(0,242,255,0.35)';
                (e.currentTarget as HTMLSpanElement).style.background = 'rgba(255,255,255,0.09)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLSpanElement).style.color = 'rgba(255,255,255,0.65)';
                (e.currentTarget as HTMLSpanElement).style.borderColor = 'rgba(255,255,255,0.1)';
                (e.currentTarget as HTMLSpanElement).style.background = 'rgba(255,255,255,0.05)';
              }}
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
