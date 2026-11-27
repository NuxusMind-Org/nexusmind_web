import { Footer } from '../components/Footer';
import { LandingNavbar } from '../components/LandingNavbar';
import { TrainingsComingSoon } from '../components/trainings/TrainingsComingSoon';

export const TrainingsPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white bg-landing-gradient">
      <LandingNavbar activePage="trainings" />

      <main className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[120px] sm:pt-[140px] pb-[80px] flex items-center justify-center">
        <TrainingsComingSoon />
      </main>

      <Footer />
    </div>
  );
};
