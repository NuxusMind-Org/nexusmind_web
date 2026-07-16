import { Quote, Check } from 'lucide-react';
import workshopImage from '@/assets/gallery/gallery_workshop.png';

export const NewsDetailBody = () => {
  const checkmarks = [
    'Fərdi mentorluq seansları',
    'Peşəkar inkişaf planının hazırlanması',
    'Ayda bir dəfə ödənişsiz master-klaslar',
  ];

  return (
    <div className="w-full flex flex-col gap-6 text-white/80 leading-relaxed font-light text-[15px] sm:text-[16px]">
      {/* Intro paragraph */}
      <p>
        Yanvarın 15-də Bakı Psixologiya Mərkəzi Mentorluq proqramına başlayıb. Proqram tələbələr,
        məzunlar və özünü inkişaf etdirmək istəyənlər üçün nəzərdə tutulub.
      </p>

      {/* Section 1: Purpose */}
      <div className="mt-4">
        <h3 className="text-white text-[20px] sm:text-[22px] font-semibold mb-3 tracking-tight">
          Proqramın Məqsədi
        </h3>
        <p>
          Proqramın məqsədi psixologiya sahəsində inkişaf etmək istəyən şəxslərə fərdi dəstək vermək,
          peşəkar məqsədlərin sistemli planlanması və real təcrübədən öyrənmə imkanı yaratmaqdır.
        </p>
      </div>

      {/* Premium Glassmorphic Blockquote card */}
      <div className="my-6 relative bg-gradient-to-r from-[#7B2CBF]/20 to-[#1B3A4B]/20 border-l-[3px] border-l-[#A682FF]/60 border-t border-t-white/10 border-r border-r-white/10 border-b border-b-white/10 rounded-lg p-6 sm:p-8 pr-6 sm:pr-10 pl-10 sm:pl-12 backdrop-blur-sm flex flex-col gap-3">
        {/* Quote Icon Box (centered on the top-left corner vertex) */}
        <div className="absolute left-0 -translate-x-1/2 top-0 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded bg-[#130d24] border border-[#A682FF]/30 flex items-center justify-center z-20 shadow-lg">
          <Quote className="text-white fill-white w-4 h-4 sm:w-5 sm:h-5" />
        </div>

        <blockquote className="text-white text-[16px] font-light italic leading-relaxed z-10">
          "Həqiqi şəfa insanın öz daxili səssizliyini kəşf etdiyi andan başlayır. Biz sadəcə bu yolda bələdçilik edirik."
        </blockquote>
        <cite className="text-[#A682FF] text-[14px] font-semibold not-italic z-10">
          — Dr. Leyla Rəhimova
        </cite>
      </div>

      {/* Section 2: Structure */}
      <div className="mt-2">
        <h3 className="text-white text-[20px] sm:text-[22px] font-semibold mb-3 tracking-tight">
          Proqramın Strukturu
        </h3>
        <p className="mb-4">
          Proqram 3 ay davam edəcək. Həftədə 1 dəfə fərdi seans və ayda 1 dəfə ödənişsiz master-klas və ya qrup işi keçiriləcək.
        </p>

        {/* Checkmarks bullet list */}
        <ul className="flex flex-col gap-3.5 pl-1 mb-6">
          {checkmarks.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-white/90">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#115e59]/30 border border-[#115e59]/60 text-[#2dd4bf] shrink-0 mt-0.5">
                <Check size={12} strokeWidth={3} />
              </span>
              <span className="font-light text-[14px] sm:text-[15px]">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* In-body Event Image */}
      <div className="w-full rounded-lg overflow-hidden border border-white/10 shadow-lg my-2">
        <img
          src={workshopImage}
          alt="Mentorluq Proqramı Təlim"
          className="w-full h-auto object-cover max-h-[350px]"
        />
      </div>

      {/* Image caption */}
      <p className="text-white/60 text-[13px] sm:text-[14px] italic text-center font-light">
        Qeydiyyatdan keçən hər iştirakçı öz inkişaf istiqamətinə uyğun mentor seçə bilər. İlk seansda hədəflər müəyyənləşdirilir və aylıq plan hazırlanır.
      </p>
    </div>
  );
};
