import { useState } from 'react';
import { Search } from 'lucide-react';

export const WelcomeHeader = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'personal'>('home');

  return (
    <div
      className="w-full px-8 md:px-16 flex flex-col items-center justify-center text-center relative border-b border-black/5 rounded-t-[38.93px] gap-6"
      style={{
        height: '359.17px',
        background: 'linear-gradient(135deg, #CBE8FC 0%, #DDD4F8 33%, #F9D8E8 66%, #FFF5E6 100%)'
      }}
    >
      {/* 1. Greeting Header */}
      <h1
        className="w-full text-center text-[#1E0A42] font-normal"
        style={{
          fontSize: '46.72px',
          lineHeight: '59.84px',
          letterSpacing: '-0.96px',
          maxWidth: '1041.5px',
        }}
      >
        Salam Mətin! Bugünkü səyahətimizə hazırsan?
      </h1>

      {/* 2. Segmented Controller (Navigation Tabs) */}
      <div className="flex bg-[#4A247A]/5 border border-[#4A247A]/10 p-1 rounded-full gap-1 max-w-max mx-auto select-none shadow-sm backdrop-blur-sm">
        <button
          onClick={() => setActiveTab('home')}
          className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
            activeTab === 'home'
              ? 'bg-white text-[#4A247A] shadow-md shadow-black/5'
              : 'text-[#7A7495] hover:text-[#4A247A]'
          }`}
        >
          Ana Səhifə
        </button>
        <button
          onClick={() => setActiveTab('personal')}
          className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
            activeTab === 'personal'
              ? 'bg-white text-[#4A247A] shadow-md shadow-black/5'
              : 'text-[#7A7495] hover:text-[#4A247A]'
          }`}
        >
          Şəxsi məlumatlar
        </button>
      </div>

      {/* 3. Rounded Search Bar */}
      <div className="w-full max-w-[1020px] relative flex items-center group">
        <Search
          size={18}
          className="absolute left-5 text-[#8A84A5] group-focus-within:text-[#4A247A] transition-colors"
        />
        <input
          type="text"
          placeholder="Hər şeyi axtarın..."
          className="w-full bg-white border border-[#C5D0D4] focus:border-[#4A247A]/30 text-gray-800 placeholder-[#9C97B3] pl-14 pr-6 py-4 rounded-full text-sm outline-none transition-all font-medium shadow-sm"
        />
      </div>
    </div>
  );
};
