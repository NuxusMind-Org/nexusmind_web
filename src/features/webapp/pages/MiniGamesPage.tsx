import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { PATHS } from '@/routes/paths';
import { TechniqueCard } from '../components/TechniqueCard';

import miniGame01 from '@/assets/svg/miniGame01.svg';
import miniGame02 from '@/assets/svg/miniGame02.svg';
import miniGame03 from '@/assets/svg/miniGame03.svg';
import miniGame04 from '@/assets/svg/miniGame04.svg';

export const MiniGamesPage = () => {
  const navigate = useNavigate();

  const techniques = [
    {
      id: 'natural-breathing',
      tag: 'STANDART',
      title: 'Təbii Nəfəs',
      imageSrc: miniGame01,
      steps: [
        { number: 1, text: 'Rahat vəziyyətdə oturun və ya uzanın.' },
        { number: 2, text: 'Burundan yavaş və dərin nəfəs alın.' },
        { number: 3, text: 'Ağızdan yavaşca nəfəs verin.' },
        { number: 4, text: 'Bu ritmi təbii şəkildə təkrarlaın.' },
      ],
    },
    {
      id: 'box-breathing',
      tag: 'KVADRAT',
      title: 'Kvadrat Nəfəsi (4-4-4-4)',
      imageSrc: miniGame02,
      steps: [
        { number: 1, text: '4 saniyə nəfəs alın.' },
        { number: 2, text: '4 saniyə nəfəsinizi saxlayın.' },
        { number: 3, text: '4 saniyə nəfəs verin.' },
        { number: 4, text: '4 saniyə nəfəsinizi saxlayın.' },
      ],
    },
    {
      id: 'alternate-nostril',
      tag: 'PRANAYAMA',
      title: 'Burun Dəliyi Dəyişdirilməsi',
      imageSrc: miniGame03,
      steps: [
        { number: 1, text: 'Sağ burun dəliyini bağlayın, soldan nəfəs alın.' },
        { number: 2, text: 'Nəfəsi hər iki tərəf bağlı halda qısa saxlayın.' },
        { number: 3, text: 'Solu bağlayın və sağdan nəfəs verin.' },
        { number: 4, text: 'Ardıcıllığı əks tərəf üçün təkrarlaın.' },
      ],
    },
    {
      id: 'ocean-sound',
      tag: 'UJJAYI',
      title: 'Okean Səsi',
      imageSrc: miniGame04,
      steps: [
        { number: 1, text: 'Boğazınızı yüngülcə daraldın, burundan nəfəs alın.' },
        { number: 2, text: 'Boğazı dar saxlayaraq yavaşca nəfəs verin.' },
        { number: 3, text: 'Yumşaq "okean dalğası" səsinə fokuslanın.' },
        { number: 4, text: 'Ritmi sakit və bərabər saxlayın.' },
      ],
    },
  ];

  return (
    <div className="w-full flex flex-col rounded-none lg:rounded-[38.93px] min-h-full overflow-hidden shadow-none lg:shadow-2xl bg-white animate-fade-in pb-16">
      {/* 1. Top Header Banner Section */}
      <div
        className="w-full relative px-4 sm:px-8 py-10 sm:py-14 flex flex-col items-center justify-center text-center border-b border-black/5 rounded-none lg:rounded-t-[38.93px] shrink-0"
        style={{
          background: 'linear-gradient(135deg, #CBE8FC 0%, #DDD4F8 33%, #F9D8E8 66%, #FFF5E6 100%)',
        }}
      >
        {/* Top-Right Close Button */}
        <button
          onClick={() => navigate(PATHS.DASHBOARD)}
          className="absolute top-5 right-5 sm:top-8 sm:right-8 text-[#1E0A42]/70 hover:text-[#1E0A42] hover:bg-black/5 p-2 rounded-full transition-colors cursor-pointer z-10"
          aria-label="Kapat"
        >
          <X size={24} />
        </button>

        {/* Centered Main Title */}
        <h1 className="text-[26px] sm:text-[36px] md:text-[44px] font-normal text-[#1E0A42] tracking-[-0.96px] leading-tight font-['Lexend',_sans-serif] max-w-[900px]">
          İstədiyin texnikanı seç və başla !
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg font-semibold text-[#7B2CBF] mt-2 font-['Lexend',_sans-serif]">
          İlkin olaraq texnikanı öyrənməyi unutma
        </p>
      </div>

      {/* 2. Cards Grid Container Section */}
      <div className="px-4 sm:px-8 md:px-12 py-10 sm:py-14 flex flex-col w-full max-w-[1231px] mx-auto text-left flex-1">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full justify-items-center">
          {techniques.map((item) => (
            <TechniqueCard
              key={item.id}
              tag={item.tag}
              title={item.title}
              steps={item.steps}
              imageSrc={item.imageSrc}
              onStart={() => {
                navigate(PATHS.WEBAPP_BREATHING_GAME);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

