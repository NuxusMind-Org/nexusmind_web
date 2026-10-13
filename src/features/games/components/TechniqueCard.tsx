import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/components';

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
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-[552px] bg-white/10 backdrop-blur-xl rounded-3xl border border-white/15 p-6 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-[#03C6B2]/50 hover:shadow-purple-950/40 transition-all duration-300 min-h-[580px] text-white">
      {/* Top Header Section */}
      <div className="flex flex-col">
        {/* Pill Tag */}
        <div className="px-4 py-1 rounded-full border border-[#03C6B2]/40 bg-[#03C6B2]/10 text-[#03C6B2] text-xs font-bold uppercase tracking-widest w-fit mb-3">
          {tag}
        </div>

        {/* Card Title */}
        <h3 className="text-xl sm:text-2xl font-sans font-light text-white mb-5 leading-tight text-left">
          {title}
        </h3>

        {/* Card Image Box */}
        <div className="w-full h-[180px] sm:h-[220px] rounded-2xl mb-6 overflow-hidden flex items-center justify-center bg-white/5 border border-white/10">
          {imageSrc ? (
            <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-white/5" />
          )}
        </div>

        {/* Numbered Steps List */}
        <ul className="flex flex-col gap-3.5 text-left mb-6">
          {steps.map((step) => (
            <li key={step.number} className="flex items-start gap-3.5">
              <div className="w-6 h-6 rounded-full bg-purple-600/30 border border-purple-400/20 text-[#03C6B2] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                {step.number}
              </div>
              <span className="text-sm sm:text-[15px] text-white/80 font-normal leading-relaxed">
                {step.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Start Action Button */}
      <button
        onClick={onStart}
        className="group relative w-full py-3.5 bg-[#4A148F] hover:bg-[#5b1ab0] active:scale-[0.98] text-white font-semibold text-sm sm:text-base rounded-2xl transition-all duration-300 ease-out shadow-[0_4px_20px_rgba(74,20,143,0.45)] flex items-center justify-center gap-2.5 cursor-pointer mt-2 overflow-hidden"
      >
        {/* Animated Border */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
          style={{
            padding: '2px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 w-[200%] aspect-square -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-out group-hover:rotate-90"
            style={{
              background:
                'conic-gradient(from 315deg, #6700FF 0%, rgba(255, 255, 255, 0.04) 25%, #FFFFFF 50%, rgba(255, 255, 255, 0.07) 75%, #6700FF 100%)',
            }}
          />
        </div>

        <span className="relative z-10 flex items-center justify-center gap-2.5">
          <AppIcon icon="lucide:play" size={18} fill="currentColor" className="text-white ml-0.5" />
          <span>{t('webapp.miniGames.start', 'Başla')}</span>
        </span>
      </button>
    </div>
  );
};
