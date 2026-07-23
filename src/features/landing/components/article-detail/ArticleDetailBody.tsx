import { Settings, Brain, Quote } from 'lucide-react';

export const ArticleDetailBody = () => {
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
      {/* ── Intro paragraph with drop cap ── */}
      <div style={{ overflow: 'hidden' }}>
        <span
          style={{
            float: 'left',
            fontSize: '6rem',
            lineHeight: '0.78',
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontWeight: 300,
            color: '#ffffff',
            marginRight: '8px',
            marginTop: '8px',
            userSelect: 'none',
          }}
        >
          V
        </span>
        <span style={{ color: 'rgba(255,255,255,0.82)', fontSize: '15px', lineHeight: '1.75', fontWeight: 300 }}>
          irtual Reallıq (VR) texnologiyası müasir psixoterapiyada inqilabi bir alətə çevrilmişdir.
          Xüsusilə Post-Travmatik Stress Pozğunluğu (PTSP) və digər travma ilə əlaqəli vəziyyətlərin
          müalicəsində "Exposure Therapy" (Təsir Terapiyası) metodunu daha idarəolunan və təhlükəsiz
          mühitdə tətbiq etməyə imkan verir. Nexus Mind platforması bu kliniki yanaşmanı ən son
          VR innovasiyaları ilə birləşdirərək xəstələrin sağalma müddətini 40% sürətləndirir.
        </span>
      </div>

      {/* ── Section heading ── */}
      <div>
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
          Klinik Üstünlüklər və Metodologiya
        </h2>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.80)', fontSize: '15px', lineHeight: '1.75', fontWeight: 300 }}>
          Ənənəvi travma terapiyasından fərqli olaraq, VR mühiti pasiyentə travmatik xatirələrlə
          tədricən və mütəxəssis nəzarəti altında qarşılaşma şansı verir. Sistem, pasiyentin
          biometrik göstəricilərini (ürək döyüntüsü, göz bəbəklərinin reaksiyası) real vaxtda
          izləyərək simulyasiyanın intensivliyini avtomatik tənzimləyir.
        </p>
      </div>

      {/* Premium Glassmorphic Blockquote card */}
      <div className="my-6 relative bg-gradient-to-r from-[#7B2CBF]/20 to-[#1B3A4B]/20 border-l-[3px] border-l-[#A682FF]/60 border-t border-t-white/10 border-r border-r-white/10 border-b border-b-white/10 rounded-lg p-6 sm:p-8 pr-6 sm:pr-10 pl-10 sm:pl-12 backdrop-blur-sm flex flex-col gap-3">
        {/* Quote Icon Box (centered on the top-left corner vertex) */}
        <div className="absolute left-0 -translate-x-1/2 top-10 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded bg-[#130d24] border border-[#A682FF]/30 flex items-center justify-center z-20 shadow-lg">
          <Quote className="text-white fill-white w-4 h-4 sm:w-5 sm:h-5" />
        </div>

        <blockquote className="text-white text-[16px] font-light italic leading-relaxed z-10">
          "VR terapiyası beynin neyroplastikliyini stimullaşdıraraq, travmatik neyron yollarının
          yenidən formalaşmasına kömək edir. Bu, sadəcə texnologiya deyil, yeni bir nevroloji şəfa yoludur."
        </blockquote>
      </div>

      {/* ── Section 2 ── */}
      <p style={{ margin: 0, color: 'rgba(255,255,255,0.80)', fontSize: '15px', lineHeight: '1.75', fontWeight: 300 }}>
        Metodologiyamızın əsasını fərdiləşdirilmiş ssenarilər təşkil edir. Hər bir pasiyent üçün
        xüsusi olaraq dizayn edilmiş virtual dünyalar, onlara öz qorxuları ilə güvənli bir zonada
        üzləşməyə şərait yaradır. Bu, klinik şəraitdə əldə edilən nəticələrin gündəlik həyata
        transferini daha effektiv edir.
      </p>

      {/* ── Feature cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-2">
        {/* Card 1 — Tam Nəzarət */}
        <div
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
            <Settings size={20} style={{ color: '#00f2ff', flexShrink: 0 }} />
            <h3 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, margin: 0 }}>
              Tam Nəzarət
            </h3>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: '1.65', fontWeight: 300, margin: 0 }}>
            Terapevt virtual mühitdəki hər bir detalı — səsləri, vizual effektləri, günün saatını
            və hadisələrin intensivliyini pasientin dözümlülük səviyyəsinə uyğun tənzimləyir.
          </p>
        </div>

        {/* Card 2 — Beynin Reaksiyası */}
        <div
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
            <Brain size={20} style={{ color: '#a682ff', flexShrink: 0 }} />
            <h3 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, margin: 0 }}>
              Beynin Reaksiyası
            </h3>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: '1.65', fontWeight: 300, margin: 0 }}>
            Virtual dünya süni olsa da, insan beyni oradakı təhlükəsizlik hissini real qəbul
            edir və travmatik xatirəyə qarşı dözümlülük (desensitizasiya) qazanır.
          </p>
        </div>
      </div>
    </div>
  );
};
