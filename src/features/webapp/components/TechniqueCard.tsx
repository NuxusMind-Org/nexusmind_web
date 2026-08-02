import React from 'react';
import { Play } from 'lucide-react';

export interface TechniqueStep {
  number: number;
  text: string;
}

export interface TechniqueCardProps {
  tag: string;
  title: string;
  steps: TechniqueStep[];
  imageSrc?: string;
  onStart?: () => void;
}

export const TechniqueCard: React.FC<TechniqueCardProps> = ({
  tag,
  title,
  steps,
  imageSrc,
  onStart,
}) => {
  return (
    <div
      className="w-full max-w-[552px] bg-white rounded-[32px] border border-[#CBC4D2]/20 p-6 sm:p-8 flex flex-col justify-between shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-lg min-h-[600px] sm:min-h-[657px]"
    >
      {/* Top Header Section of Card */}
      <div className="flex flex-col">
        {/* Pill Tag */}
        <div className="px-4 py-1 rounded-full border border-[#B886E6]/60 bg-[#FBF8FF] text-[#A66BD9] text-xs font-bold uppercase tracking-widest w-fit mb-3">
          {tag}
        </div>

        {/* Card Title */}
        <h3 className="text-xl sm:text-[24px] font-semibold text-[#1E0A42] font-['Lexend',_sans-serif] mb-5 leading-tight text-left">
          {title}
        </h3>

        {/* Card Image Box */}
        <div className="w-full h-[180px] sm:h-[220px] rounded-[20px] mb-6 overflow-hidden flex items-center justify-center bg-slate-100">
          {imageSrc ? (
            <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-slate-200/90" />
          )}
        </div>

        {/* Numbered Steps List */}
        <ul className="flex flex-col gap-3.5 text-left mb-6">
          {steps.map((step) => (
            <li key={step.number} className="flex items-start gap-3.5">
              <div className="w-6 h-6 rounded-full bg-[#F3F0F8] text-[#38166D] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                {step.number}
              </div>
              <span className="text-sm sm:text-[15px] text-[#1E0A42]/85 font-normal leading-relaxed">
                {step.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Start Action Button */}
      <button
        onClick={onStart}
        className="w-full py-3.5 bg-[#38166D] hover:bg-[#2c1157] active:scale-[0.99] text-white font-semibold text-sm sm:text-base rounded-[18px] transition-all duration-200 shadow-md flex items-center justify-center gap-2.5 cursor-pointer mt-2"
      >
        <Play size={18} fill="currentColor" className="text-white ml-0.5" />
        <span>Başla</span>
      </button>
    </div>
  );
};
