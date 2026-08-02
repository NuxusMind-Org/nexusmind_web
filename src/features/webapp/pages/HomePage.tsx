import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wind } from 'lucide-react';
import { PATHS } from '@/routes/paths';
import { WelcomeHeader } from '../components/WelcomeHeader';
import { MoodSelector } from '../components/MoodSelector';
import { NextSession } from '../components/NextSession';
import { SpecialSessions } from '../components/SpecialSessions';
import { MiniGameCard } from '../components/MiniGameCard';
import { Articles } from '../components/Articles';
import { Blogs } from '../components/Blogs';
import { Experts } from '../components/Experts';

export const HomePage = () => {
  const navigate = useNavigate();
  const [showBreathingCard, setShowBreathingCard] = useState(true);
  const [showMeditationCard, setShowMeditationCard] = useState(true);

  return (
    <div className="w-full flex flex-col rounded-none lg:rounded-[38.93px] min-h-full overflow-hidden shadow-none lg:shadow-2xl bg-white animate-fade-in">
      <WelcomeHeader />
      <MoodSelector />
      <NextSession />
      <SpecialSessions />
      {showBreathingCard && (
        <MiniGameCard
          title="5 dəqiqə sakitləşdirici nəfəs məşqi et"
          description="Dərin nəfəs almaq stress hormonlarını azaldır və ağlını sabitləşdirir. Bunu indi cəhd et!"
          icon={<Wind size={64} className="text-white" />}
          bgGradient="linear-gradient(135deg, #06976B 0%, #38A06F 50%, #0E4D2D 100%)"
          onAction={() => navigate(PATHS.WEBAPP_MINI_GAMES)}
          onClose={() => setShowBreathingCard(false)}
        />
      )}
      <Articles />
      <Blogs />
      {showMeditationCard && (
        <MiniGameCard
          title="Özünə bir neçə dəqiqə vaxt ayır"
          description="Bu gün cəmi 5 dəqiqə meditasiya etməyə nə deyirsən? Kiçik addımlar böyük dəyişikliklərə gətirib çıxarır."
          actionText="Meditasiyaya başla"
          icon={
            <svg
              viewBox="0 0 24 24"
              width="64"
              height="64"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <circle cx="12" cy="7" r="2.5" />
              <path d="M12 10.5c-2.5 0-4.5 2-4.5 4.5 0 1.5.8 2.5 1.7 3h5.6c.9-.5 1.7-1.5 1.7-3 0-2.5-2-4.5-4.5-4.5z" />
              <path d="M5 19.5c-1-1-1.5-2.2-1.5-3.5 0-1.8 1.5-3 3-3 .8 0 1.5.3 2 1" />
              <path d="M19 19.5c1-1 1.5-2.2 1.5-3.5 0-1.8-1.5-3-3-3-.8 0-1.5.3-2 1" />
              <path d="M4 21c4-1 12-1 16 0" />
            </svg>
          }
          bgGradient="linear-gradient(135deg, #120697 0%, #3863A0 50%, #2C8BD4 100%)"
          onAction={() => navigate(PATHS.WEBAPP_MINI_GAMES)}
          onClose={() => setShowMeditationCard(false)}
        />
      )}
      <Experts />
    </div>
  );
};
