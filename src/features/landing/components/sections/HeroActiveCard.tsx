import React from 'react';

interface HeroActiveCardProps {
  onClose?: () => void;
  children?: React.ReactNode;
}

export const HeroActiveCard: React.FC<HeroActiveCardProps> = ({ onClose, children }) => {
  return (
    <div className="relative w-full min-h-[420px] sm:min-h-[460px] md:min-h-[500px] bg-white rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-white/60 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
      {/* Optional dismiss button */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Geri qayıt"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-95 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-all cursor-pointer z-10"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Card Content Slot */}
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};
