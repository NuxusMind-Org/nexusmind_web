import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import salviAvatar from '@/assets/female_avatar.png';
import { PATHS } from '@/routes/paths';

interface ExpertItem {
  id: number;
  name: string;
  experience: string;
  rating: number;
  price: string;
  bio: string;
  languages: string[];
  specialties: string[];
}

export const Experts = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const experts: ExpertItem[] = [
    {
      id: 1,
      name: 'Səlvi Əliyeva',
      experience: '9 illik təcrübə',
      rating: 4.8,
      price: '$58/seans',
      bio: 'İnsanların emosional balansını bərpa etməyə və gündəlik stresslə mübarizə aparmağa kömək edən təcrübəli psixoloqdur. O, fərdi konsultasiya, stress idarəetməsi və mindfulness terapiyası sahəsində fəaliyyət göstərir.',
      languages: ['English', 'French', 'Turkish'],
      specialties: ['Psixoloq', 'Travma mütəxəssisi', 'Həyat bələdçisi'],
    },
    {
      id: 2,
      name: 'Səlvi Əliyeva',
      experience: '9 illik təcrübə',
      rating: 4.8,
      price: '$58/seans',
      bio: 'İnsanların emosional balansını bərpa etməyə və gündəlik stresslə mübarizə aparmağa kömək edən təcrübəli psixoloqdur. O, fərdi konsultasiya, stress idarəetməsi və mindfulness terapiyası sahəsində fəaliyyət göstərir.',
      languages: ['English', 'French', 'Turkish'],
      specialties: ['Psixoloq', 'Travma mütəxəssisi', 'Həyat bələdçisi'],
    },
    {
      id: 3,
      name: 'Səlvi Əliyeva',
      experience: '9 illik təcrübə',
      rating: 4.8,
      price: '$58/seans',
      bio: 'İnsanların emosional balansını bərpa etməyə və gündəlik stresslə mübarizə aparmağa kömək edən təcrübəli psixoloqdur. O, fərdi konsultasiya, stress idarəetməsi və mindfulness terapiyası sahəsində fəaliyyət göstərir.',
      languages: ['English', 'French', 'Turkish'],
      specialties: ['Psixoloq', 'Travma mütəxəssisi', 'Həyat bələdçisi'],
    },
    {
      id: 4,
      name: 'Səlvi Əliyeva',
      experience: '9 illik təcrübə',
      rating: 4.8,
      price: '$58/seans',
      bio: 'İnsanların emosional balansını bərpa etməyə və gündəlik stresslə mübarizə aparmağa kömək edən təcrübəli psixoloqdur. O, fərdi konsultasiya, stress idarəetməsi və mindfulness terapiyası sahəsində fəaliyyət göstərir.',
      languages: ['English', 'French', 'Turkish'],
      specialties: ['Psixoloq', 'Travma mütəxəssisi', 'Həyat bələdçisi'],
    },
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const cardWidth = 618; // Card width 593.6px + gap 24px
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full bg-white px-6 pb-20 lg:px-10 flex flex-col justify-start select-none relative">
      {/* 1. Section Header */}
      <h2
        onClick={() => navigate(PATHS.WEBAPP_EXPERTS)}
        className="w-full text-left text-[#1E0A42] font-normal mb-8 cursor-pointer hover:text-[#4A247A] transition-colors"
        style={{
          fontSize: '31.15px',
          lineHeight: '59.84px',
          letterSpacing: '-0.96px',
          maxWidth: '1251.75px',
        }}
      >
        Mütəxəssislər →
      </h2>

      {/* 2. Carousel Wrapper with Nav Buttons */}
      <div className="w-full relative flex items-center group/carousel">
        {/* Left Arrow Button */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-[-16px] lg:left-[-24px] z-10 w-11 h-11 rounded-full bg-white text-[#4A247A] shadow-lg border border-gray-150 flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all opacity-0 group-hover/carousel:opacity-100 duration-300"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Horizontally Scrollable Cards Container */}
        <div
          ref={scrollRef}
          className="w-full flex flex-row overflow-x-auto gap-6 pt-6 pb-8 scrollbar-hide scroll-smooth snap-x snap-mandatory px-2"
        >
          {experts.map((expert) => (
            <div
              key={expert.id}
              onClick={() => navigate(PATHS.WEBAPP_EXPERT_DETAIL.replace(':id', String(expert.id)))}
              className="flex flex-col text-white flex-shrink-0 snap-start transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer group p-8"
              style={{
                width: '593.6px',
                height: '458.45px',
                borderRadius: '19.47px',
                backgroundColor: '#4B2E83',
                boxShadow: '0px 4.48px 4.48px rgba(0, 0, 0, 0.25), 0px 4.48px 4.48px rgba(0, 0, 0, 0.25)',
              }}
            >
              {/* Header inside Card: Avatar + Info & Price */}
              <div className="flex flex-row justify-between items-start w-full">
                {/* Avatar & Ratings Column */}
                <div className="flex flex-row gap-4 items-center">
                  <img
                    src={salviAvatar}
                    alt={expert.name}
                    className="w-20 h-20 rounded-full border-2 border-white/20 object-cover shadow-sm flex-shrink-0"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-lg md:text-xl font-bold text-white leading-tight">
                      {expert.name}
                    </span>
                    <span className="text-xs text-white/70 mt-0.5 font-medium">
                      {expert.experience}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-amber-400 mt-1.5 font-semibold">
                      <Star size={13} fill="currentColor" className="text-amber-400" />
                      {expert.rating}
                    </div>
                  </div>
                </div>

                {/* Pricing text */}
                <span className="text-[20px] md:text-[22px] font-bold text-white tracking-tight flex-shrink-0">
                  {expert.price}
                </span>
              </div>

              {/* Bio description paragraph */}
              <p className="text-xs md:text-sm text-white/90 leading-relaxed mt-5 text-left line-clamp-3">
                {expert.bio}
              </p>

              {/* Languages badges */}
              <div className="flex flex-wrap gap-2.5 mt-5">
                {expert.languages.map((lang) => (
                  <span
                    key={lang}
                    className="bg-white text-[#0D0669] text-xs font-semibold px-4 py-1.5 rounded-full border border-[#0D0669]/10 shadow-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>

              {/* Specialties badges */}
              <div className="flex flex-wrap gap-2.5 mt-2.5">
                {expert.specialties.map((spec) => (
                  <span
                    key={spec}
                    className="bg-white/10 text-white text-xs font-semibold px-4 py-1.5 rounded-full border border-white/5 shadow-sm"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* CTA Booking Button */}
              <button className="bg-white hover:bg-white/95 text-[#0D0669] font-bold text-xs md:text-sm py-4 rounded-[14px] w-full text-center mt-6 shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer uppercase tracking-wider">
                Başlayaq
              </button>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-[-16px] lg:right-[-24px] z-10 w-11 h-11 rounded-full bg-white text-[#4A247A] shadow-lg border border-gray-150 flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all opacity-0 group-hover/carousel:opacity-100 duration-300"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
