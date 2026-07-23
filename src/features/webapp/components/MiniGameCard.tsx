import React from 'react';
import { X } from 'lucide-react';

interface MiniGameCardProps {
  title: string;
  description: string;
  bgGradient?: string;
  icon: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
  onClose?: () => void;
}

export const MiniGameCard: React.FC<MiniGameCardProps> = ({
  title,
  description,
  bgGradient = 'linear-gradient(135deg, #06976B 0%, #38A06F 50%, #0E4D2D 100%)',
  icon,
  actionText = 'indi başla',
  onAction,
  onClose,
}) => {
  return (
    <div className="w-full bg-white px-4 sm:px-6 pb-10 sm:pb-16 lg:px-10 flex flex-col justify-start select-none">
      {/* Container wrapper for the mini-game card with custom gradient and rounding */}
      <div
        className="w-full relative overflow-hidden flex flex-col md:flex-row items-center justify-between p-5 sm:p-6 md:px-10 text-white shadow-lg min-h-[180px] md:min-h-[231px]"
        style={{
          background: bgGradient,
          borderRadius: '20px',
          boxShadow: '0px 27.86px 83.57px rgba(75, 46, 131, 0.35)',
        }}
      >
        {/* Soft abstract circle background shapes */}
        <div className="absolute left-[15%] top-[-80px] w-[300px] h-[300px] rounded-full bg-white/[0.04] pointer-events-none" />
        <div className="absolute right-[25%] bottom-[-100px] w-[200px] h-[200px] rounded-full bg-white/[0.03] pointer-events-none" />

        {/* Close Button overlay */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white cursor-pointer transition-colors p-1.5 rounded-full hover:bg-white/10 z-20"
            aria-label="Kapat"
          >
            <X size={18} />
          </button>
        )}

        {/* Left Side: Icon & Details */}
        <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8 relative z-10 text-center md:text-left flex-1">
          {/* Reusable Icon Frame */}
          <div className="flex-shrink-0 flex items-center justify-center">
            {icon}
          </div>

          {/* Texts */}
          <div className="flex flex-col justify-center">
            <h3 className="text-[22px] md:text-[28px] font-bold text-white leading-tight tracking-tight">
              {title}
            </h3>
            <p className="text-sm md:text-[16px] text-white/80 mt-1.5 leading-relaxed max-w-[680px] whitespace-pre-line font-medium">
              {description}
            </p>
          </div>
        </div>

        {/* Right Side: Reusable Action CTA Button */}
        <div className="flex-shrink-0 relative z-10 w-full md:w-auto mt-4 md:mt-0 flex justify-center items-center">
          <button
            onClick={onAction}
            className="w-full md:w-[311px] py-[16.71px] px-[55.72px] bg-white/[0.14] hover:bg-white/[0.22] border-[0.93px] border-white/70 text-white font-bold text-xs md:text-sm rounded-[22.29px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer uppercase tracking-wider text-center backdrop-blur-sm shadow-md flex items-center justify-center"
            style={{
              minHeight: '55.29px',
            }}
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};
