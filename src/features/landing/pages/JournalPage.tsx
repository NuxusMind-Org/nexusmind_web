import { useState } from 'react';
import { Lock } from 'lucide-react';
import vrConsultation from '@/assets/vr_consultation.png';
import { Footer } from '../components/Footer';
import { LandingNavbar } from '../components/LandingNavbar';

export const JournalPage = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const moods = [
    {
      id: 1,
      label: 'XOŞBƏXT',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      )
    },
    {
      id: 2,
      label: 'SAKİT',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9 14.5c1 .5 2 .5 3 .5s2 0 3-.5" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      )
    },
    {
      id: 3,
      label: 'NORMAL',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 15h8" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      )
    },
    {
      id: 4,
      label: 'YORĞUN',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 16c1.5-1 2.5-1 4-1s2.5 0 4 1" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      )
    },
    {
      id: 5,
      label: 'KƏDƏRLİ',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 16s1.5-2 4-2 4 2 4 2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      )
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white" style={{ background: 'linear-gradient(260.37deg, #263151 -4.41%, #245D68 51.97%, #914899 100%)', backgroundAttachment: 'fixed' }}>
      <LandingNavbar activePage="journal" />

      {/* Page Content */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[40px] pb-[80px] flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          <div>
            <h1 className="text-[42px] sm:text-[56px] font-serif font-light text-white mb-2 leading-tight">Duyğu <span className="text-[#c39ffd] font-light">Gündəliyi</span></h1>
            <p className="text-white/80 text-[16px] sm:text-[18px]">Səssiz bir məkan. Özünlə dialoq üçün təhlükəsiz və səmimi bir guşə.</p>
          </div>

          {/* Mood Selector */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 sm:p-8 border border-white/10 shadow-xl">
            <h3 className="text-white text-[18px] mb-8 font-medium">Bu gün özünüzü necə hiss edirsiniz?</h3>
            <div className="flex flex-wrap sm:flex-nowrap justify-around sm:justify-between items-center gap-4 sm:gap-0 px-1 sm:px-6">
              {moods.map(mood => (
                <div key={mood.id} className="flex flex-col items-center gap-3 cursor-pointer group" onClick={() => setSelectedMood(mood.id)}>
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center transition-all duration-300 ${selectedMood === mood.id ? 'bg-[#9333ea] scale-110 shadow-[0_0_20px_rgba(147,51,234,0.5)]' : 'bg-[#2b6a8c] group-hover:bg-[#327ba3]'}`}>
                    {mood.icon}
                  </div>
                  <span className="text-white/60 text-[9px] sm:text-[11px] tracking-widest uppercase font-medium">{mood.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Text Area Box */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col min-h-[450px]">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h4 className="text-white/50 text-[11px] tracking-[0.2em] uppercase font-light mb-2">GÜNÜN DÜŞÜNCƏLƏRİ</h4>
                <h3 className="text-white text-[24px] sm:text-[28px] italic font-serif">Nə barədə düşünürsünüz?</h3>
              </div>
              <span className="text-white/60 text-[13px] font-medium hidden sm:block">13 May, 2026</span>
            </div>

            <textarea
              className="w-full flex-1 bg-transparent text-white text-[18px] resize-none outline-none placeholder:text-white/80 leading-relaxed"
              placeholder="Səhifə sənindir..."
            ></textarea>

            <div className="flex flex-wrap justify-end items-center gap-3 sm:gap-4 mt-8">
              <button className="w-12 h-12 bg-[#4f46e5] rounded-lg flex items-center justify-center text-white hover:bg-[#4338ca] transition-colors shadow-lg">
                <Lock size={20} />
              </button>
              <button className="px-6 sm:px-8 py-3 bg-[#d8b4fe] text-[#2D1B44] font-light rounded-lg hover:bg-[#c084fc] transition-colors shadow-lg whitespace-nowrap">
                Saxla
              </button>
              <button className="px-6 sm:px-8 py-3 bg-[#d8b4fe] text-[#2D1B44] font-light rounded-lg hover:bg-[#c084fc] transition-colors shadow-lg whitespace-nowrap">
                Psixoloqa göndər
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[350px] xl:w-[400px] flex flex-col gap-6 lg:mt-[104px]">
          {/* History Box */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col">
            <h3 className="text-white/80 text-[16px] mb-8 flex items-center gap-2 font-medium">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Keçmiş Qeydlər
            </h3>

            <div className="flex flex-col gap-8">
              <div className="relative pl-5 border-l border-white/10">
                <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]"></div>
                <p className="text-white/50 text-[10px] uppercase tracking-wider mb-2 font-medium">10 MAY</p>
                <h4 className="text-white font-medium mb-1">Huzurlu bir dəniz sahilində...</h4>
                <p className="text-white/60 text-[13px] line-clamp-2 leading-relaxed">Bu gün özümü daha sakit və toparlanmış hiss edirəm. Səhər tezdən durub</p>
              </div>

              <div className="relative pl-5 border-l border-white/10">
                <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-[#d8b4fe] shadow-[0_0_10px_#d8b4fe]"></div>
                <p className="text-white/50 text-[10px] uppercase tracking-wider mb-2 font-medium">08 MAY</p>
                <h4 className="text-white font-medium mb-1">Yorğun, lakin ümidli</h4>
                <p className="text-white/60 text-[13px] line-clamp-2 leading-relaxed">İş həftəsi ağır keçdi, amma yeni layihə</p>
              </div>

              <div className="relative pl-5 border-l border-white/10">
                <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-[#d8b4fe] shadow-[0_0_10px_#d8b4fe]"></div>
                <p className="text-white/50 text-[10px] uppercase tracking-wider mb-2 font-medium">03 MAY</p>
                <h4 className="text-white font-medium mb-1">Yeni ilin ilk addımları</h4>
                <p className="text-white/60 text-[13px] line-clamp-2 leading-relaxed">Planlarım çoxdur, amma hər şeyi bir anda</p>
              </div>
            </div>

            <button className="w-full mt-10 py-3.5 border border-white/20 rounded-lg text-white text-[12px] font-light tracking-widest hover:bg-white/10 transition-colors">
              HAMISINI GÖR
            </button>
          </div>

          {/* VR Consultation Mini Box */}
          <div className="w-full h-[180px] rounded-lg overflow-hidden relative group cursor-pointer shadow-xl border border-white/10 hidden sm:block">
            <img src={vrConsultation} alt="VR Consultation" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
            <div className="absolute bottom-4 left-4 right-4 bg-[#eeb3b3]/30 backdrop-blur-xl border border-white/20 rounded-lg p-4">
              <h4 className="text-[14px] font-light text-[#111] mb-1">VR KONSULTASİYA</h4>
              <p className="text-[9px] text-[#222] font-light line-clamp-2">Burada evdən çölə çıxmadan istədiyin konfort zonanı seçə və orada zaman keçirərək sakitləşə bilərsən.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer — full width */}
      <Footer />
    </div>
  );
};
