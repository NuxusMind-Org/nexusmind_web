import { Search } from 'lucide-react';

export const WelcomeHeader = () => {
  return (
    <div
      className="w-full px-4 sm:px-8 md:px-16 flex flex-col items-center justify-center text-center relative border-b border-black/5 rounded-none lg:rounded-t-[38.93px] gap-4 sm:gap-6 h-[260px] sm:h-[300px] md:h-[359px]"
      style={{
        background: 'linear-gradient(135deg, #CBE8FC 0%, #DDD4F8 33%, #F9D8E8 66%, #FFF5E6 100%)'
      }}
    >
      {/* 1. Greeting Header */}
      <h1
        className="w-full text-center text-[#1E0A42] font-normal text-[24px] sm:text-[32px] md:text-[46.72px] leading-[32px] sm:leading-[42px] md:leading-[59.84px]"
        style={{
          letterSpacing: '-0.96px',
          maxWidth: '1041.5px',
        }}
      >
        Salam Mətin! Bugünkü səyahətimizə hazırsan?
      </h1>

      {/* 2. Rounded Search Bar */}
      <div className="w-full max-w-[1020px] relative flex items-center group">
        <Search
          size={18}
          className="absolute left-5 text-[#8A84A5] group-focus-within:text-[#4A247A] transition-colors"
        />
        <input
          type="text"
          placeholder="Hər şeyi axtarın..."
          className="w-full bg-white border border-[#C5D0D4] focus:border-[#4A247A]/30 text-gray-800 placeholder-[#9C97B3] pl-14 pr-6 py-3 sm:py-4 rounded-full text-sm outline-none transition-all font-medium shadow-sm"
        />
      </div>
    </div>
  );
};

