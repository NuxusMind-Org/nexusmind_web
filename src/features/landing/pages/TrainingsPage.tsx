import { useState, useEffect } from 'react';
import { Footer } from '../components/Footer';
import { LandingNavbar } from '../components/LandingNavbar';
import {
  TrainingsHeader,
  TrainingsFilters,
  TrainingsGrid,
  TrainingsCalendar,
  RegistrationModal,
} from '../components/trainings';
import { TRAINING_ITEMS } from '../constants/trainings';
import type { Training } from '../constants/trainings';

export const TrainingsPage = () => {
  const [activeView, setActiveView] = useState<'list' | 'calendar'>('list');
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animateEntry, setAnimateEntry] = useState(false);

  useEffect(() => {
    setAnimateEntry(true);
  }, []);

  const handleOpenRegistration = (training: Training) => {
    setSelectedTraining(training);
    setIsModalOpen(true);
  };

  const handleCloseRegistration = () => {
    setIsModalOpen(false);
    setSelectedTraining(null);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col font-sans text-white"
      style={{
        background:
          'linear-gradient(320deg, #914899 -4.41%, #263151 51.97%, #245D68 100%)',
      }}
    >
      {/* Navbar */}
      <LandingNavbar activePage="trainings" />

      {/* Main Content Area with Page Entry Animation */}
      <main className={`flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[32px] pb-[80px] flex flex-col items-center transition-all duration-700 ease-out transform ${
        animateEntry ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="w-full max-w-[1200px] flex flex-col">
          {/* Header */}
          <TrainingsHeader />

          {/* Filters and Switches */}
          <TrainingsFilters
            activeView={activeView}
            onViewChange={setActiveView}
          />

          {/* Active View Render with Cross-Fade and Slide-Scale Transitions */}
          <div className="relative w-full">
            <div
              className={`transition-all duration-500 ease-out transform ${
                activeView === 'list'
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                  : 'absolute top-0 left-0 w-full opacity-0 -translate-y-4 scale-95 pointer-events-none'
              }`}
            >
              <TrainingsGrid
                trainings={TRAINING_ITEMS}
                onRegister={handleOpenRegistration}
              />
            </div>
            <div
              className={`transition-all duration-500 ease-out transform ${
                activeView === 'calendar'
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                  : 'absolute top-0 left-0 w-full opacity-0 translate-y-4 scale-95 pointer-events-none'
              }`}
            >
              <TrainingsCalendar
                trainings={TRAINING_ITEMS}
                onRegister={handleOpenRegistration}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Registration Modal Overlay */}
      <RegistrationModal
        training={selectedTraining}
        isOpen={isModalOpen}
        onClose={handleCloseRegistration}
      />
    </div>
  );
};
