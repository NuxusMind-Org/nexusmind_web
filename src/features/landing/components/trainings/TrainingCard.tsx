import { Clock, MapPin } from 'lucide-react';
import type { Training } from '../../constants/trainings';

interface TrainingCardProps {
  training: Training;
  onRegister: (training: Training) => void;
}

export const TrainingCard = ({ training, onRegister }: TrainingCardProps) => {
  const getTagStyles = (tag: string) => {
    const purpleTags = ['Meditasiya', 'Texnika', 'Terapiya', 'Şüuraltı'];
    if (purpleTags.includes(tag)) {
      return 'bg-[#A682FF]/10 text-[#A682FF] border-[#A682FF]/20';
    }
    return 'bg-[#00F2FF]/10 text-[#00F2FF] border-[#00F2FF]/20';
  };

  return (
    <div className="group w-full max-w-[624px] h-[574px] bg-[#1e293b]/30 backdrop-blur-[18px] border-[1.5px] border-white/10 rounded-[12px] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3),_0_0_24px_rgba(0,242,255,0.1)] hover:border-white/20">
      {/* Cover Image Wrapper (40% height) */}
      <div className="relative overflow-hidden h-[40%] shrink-0">
        <img
          src={training.image}
          alt={training.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Floating Date Badge */}
        <div className="absolute top-4 right-4 bg-[#0D1117]/85 text-white font-semibold text-[13px] px-3 py-1 rounded-lg border border-white/10 backdrop-blur-sm">
          {training.date}
        </div>
      </div>

      {/* Content Area (60% height) */}
      <div className="p-6 flex flex-col h-[60%]">
        {/* Top Content */}
        <div className="flex flex-col flex-1">
          {/* Tags Row */}
          <div className="flex flex-wrap gap-2">
            {training.tags.map((tag, idx) => (
              <span
                key={idx}
                className={`text-[12px] font-medium px-3.5 py-1 rounded-full border ${getTagStyles(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-[20px] sm:text-[22px] font-medium text-white tracking-tight mt-4 mb-3 leading-snug font-sans group-hover:text-[#00f2ff] transition-colors line-clamp-2">
            {training.title}
          </h3>

          {/* Metadata Details */}
          <div className="flex flex-col gap-2 mt-auto mb-2">
            <div className="flex items-center gap-3 text-white/80 text-[14px] sm:text-[15px]">
              <Clock size={18} className="text-white/50" />
              <span>{training.time}</span>
            </div>
            <div className="flex items-center gap-3 text-white/80 text-[14px] sm:text-[15px]">
              <MapPin size={18} className="text-white/50" />
              <span className="line-clamp-1">{training.location}</span>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-white/10 my-4" />

        {/* Price & Action Row */}
        <div className="flex items-center justify-between shrink-0">
          <span className="text-[18px] sm:text-[20px] font-semibold text-white">
            {training.price}
          </span>
          <button
            onClick={() => onRegister(training)}
            className="px-6 py-2.5 bg-[#c084fc] hover:bg-[#b573f9] hover:shadow-[0_0_18px_rgba(192,132,252,0.4)] text-[#0D1117] font-semibold text-[14px] rounded-lg transition-all duration-300 border-0 cursor-pointer outline-none select-none"
          >
            Qeydiyyatdan keç
          </button>
        </div>
      </div>
    </div>
  );
};
