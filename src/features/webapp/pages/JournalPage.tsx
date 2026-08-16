import { useState } from 'react';
import { History } from 'lucide-react';
import { MoodSelector } from '../components/MoodSelector';

export const JournalPage = () => {
  const [noteText, setNoteText] = useState<string>('');

  const pastNotes = [
    {
      id: 1,
      date: '10 MAY',
      title: 'Hüzurlu bir dəniz sahilində...',
      snippet: 'Bu gün özümü daha sakit və toparlanmış hiss edirəm. Səhər tezdən durub meditasiya...',
    },
    {
      id: 2,
      date: '08 MAY',
      title: 'Yorğun, lakin ümidli',
      snippet: 'İş həftəsi ağır keçdi, amma yeni layihə məni ruhlandırır. Enerjimi düzgün...',
    },
    {
      id: 3,
      date: '03 MAY',
      title: 'Yeni ilin ilk addımları',
      snippet: 'Planlarım çoxdur, amma hər şeyi bir anda etməyə çalışmaq stres yaradır. Addım...',
    },
  ];

  return (
    <div className="w-full flex flex-col rounded-[20px] md:rounded-[38.93px] overflow-hidden shadow-2xl bg-white animate-fade-in min-h-[calc(100vh-64px)] pb-8 sm:pb-12">
      {/* Top Header Section Card with Pastel Gradient */}
      <div
        className="w-full rounded-t-[20px] md:rounded-t-[38.93px] pt-8 sm:pt-14 pb-6 sm:pb-8 px-4 sm:px-6 md:px-[48px] flex flex-col justify-between h-auto min-h-[320px] sm:min-h-[380px] md:min-h-[442px] shrink-0"
        style={{
          background: 'linear-gradient(135deg, #CBE8FC 0%, #DDD4F8 33%, #F9D8E8 66%, #FFF5E6 100%)',
        }}
      >
        {/* Main Centered Header */}
        <h1 className="text-[24px] sm:text-[32px] md:text-[46.72px] font-normal text-[#1E0A42] text-center tracking-[-0.96px] leading-[32px] sm:leading-[42px] md:leading-[59.84px] w-full">
          Çəkinmədən bütün qeydlərini et.
        </h1>

        {/* Bottom half containing question, emojis and slider - Reusing component */}
        <div className="w-full flex flex-col mb-2">
          <MoodSelector className="w-full flex flex-col" titlePl="pl-[36px] md:pl-[40px] mb-6" />
        </div>
      </div>

      {/* Second Section Container */}
      <div className="px-4 sm:px-8 md:px-12 py-6 sm:py-10 flex flex-col w-full max-w-[1231px] mx-auto text-left">
        {/* Row 1: Left Column Header Row */}
        <div className="flex justify-between items-end mb-6 w-full max-w-[880px]">
          <div>
            <h3 className="text-[22px] md:text-[31.15px] font-normal text-[#1E0A42] tracking-[-0.96px] leading-[32px] md:leading-[59.84px] font-['Lexend']">
              Günün düşüncələri
            </h3>
            <p className="text-[15px] md:text-[16px] font-normal text-[#9633D8] tracking-[0px] leading-[30px] md:leading-[36px] font-['Kite_One',_sans-serif]">
              Nə barədə düşünürsünüz?
            </p>
          </div>
          <span className="text-sm text-gray-400 font-normal mb-1 font-['Lexend']">
            13 May, 2026
          </span>
        </div>

        {/* Row 2: Cards container aligned natively by items-start */}
        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          {/* Note Editor Card */}
          <div className="w-full lg:w-[880px] lg:shrink-0 bg-white border-2 border-gray-200 rounded-[24px] sm:rounded-[40px] pt-[24px] sm:pt-[40px] pr-[24px] sm:pr-[40px] pb-[32px] sm:pb-[58px] pl-[24px] sm:pl-[40px] shadow-sm flex flex-col h-[350px] sm:h-[400px] md:h-[500px] min-h-[350px] sm:min-h-[400px] md:min-h-[500px] relative overflow-hidden">
            {/* Left margin line for notebook aesthetic */}
            <div className="absolute left-[16px] sm:left-[32px] top-0 bottom-0 w-[2px] bg-red-400/30" />
            <div className="absolute left-[20px] sm:left-[36px] top-0 bottom-0 w-[1px] bg-red-400/20" />
            
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Səhifə sənindir..."
              className="w-full h-full bg-transparent text-gray-800 placeholder-gray-400 text-base font-normal resize-none focus:outline-none font-['Lexend'] leading-[32px] z-10 relative"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(0, 0, 0, 0.08) 31px, rgba(0, 0, 0, 0.08) 32px)',
                backgroundAttachment: 'local',
                backgroundPosition: '0 4px', // Offset slightly so text sits nicely on the line
              }}
            />
          </div>

          {/* Right Column - Keçmiş Qeydlər Sidebar Card */}
          <div className="w-full lg:w-[319px] lg:shrink-0 bg-[#482476] border-[0.74px] border-[#6F7B9E] rounded-[20px] sm:rounded-[23.63px] p-5 sm:p-[23.63px] flex flex-col justify-between h-auto min-h-[350px] sm:min-h-[400px] lg:h-[500px] gap-5 sm:gap-[23.63px] shadow-lg">
            {/* Header */}
            <div className="flex items-center gap-3">
              <History size={20} className="text-white/80" />
              <h4 className="text-lg font-medium text-white tracking-wide font-['Lexend']">
                Keçmiş Qeydlər
              </h4>
            </div>

            {/* Past Notes List */}
            <div className="flex flex-col gap-[23.63px] flex-1">
              {pastNotes.map((note) => (
                <div key={note.id} className="flex justify-between items-start group cursor-pointer">
                  <div className="flex flex-col pr-4">
                    <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider font-['Lexend']">
                      {note.date}
                    </span>
                    <h5 className="text-sm font-semibold text-white mt-1 leading-snug group-hover:text-[#46bdc6] transition-colors font-['Lexend']">
                      {note.title}
                    </h5>
                    <p className="text-[11px] text-white/70 mt-1 leading-normal line-clamp-2 font-['Lexend']">
                      {note.snippet}
                    </p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#46bdc6] shadow-[0_0_8px_#46bdc6] flex-shrink-0 mt-1.5" />
                </div>
              ))}
            </div>

            {/* Action Button */}
            <button className="w-full bg-white text-[#482476] py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-colors shadow-md cursor-pointer font-['Lexend']">
              HAMISINI GÖR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
