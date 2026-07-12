import { useEffect } from 'react';
import { LandingNavbar } from '../components/LandingNavbar';
import {
  HeroSection,
  FeaturesSection,
  PillarsSection,
  TestimonialsSection,
  RoadmapSection,
  VrConsultationSection,
  CtaSection,
  ExpertsSection,
} from '../components/sections';
import { useActiveSection } from '../hooks/useActiveSection';

const scrollToSection = (id: string) => {
  setTimeout(() => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 50);
};

export const LandingPage = () => {
  const activeSection = useActiveSection();

  // Handle deep-link hash on initial load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      scrollToSection(hash.replace('#', ''));
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col relative font-sans text-white">
      {/* Dynamic Background Layers */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            background: 'linear-gradient(260.37deg, #263151 -4.41%, #245D68 51.97%, #914899 100%)',
            opacity: activeSection <= 1 ? 1 : 0,
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            background: 'linear-gradient(180deg, #263151 5%, #245D68 45%, #914899 95%)',
            opacity: activeSection >= 2 && activeSection <= 4 ? 1 : 0,
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            background: 'linear-gradient(45deg, #263151 0%, #245D68 60%, #914899 100%)',
            opacity: activeSection >= 7 ? 1 : 0,
          }}
        />
      </div>

      {/* Background ambient light */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#b070ff] rounded-full blur-[150px] opacity-20 pointer-events-none z-10" />

      <LandingNavbar
        activePage="landing"
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      <main className="flex-1 w-full relative">
        <div className="w-full relative flex flex-col">
          <HeroSection />
          <FeaturesSection />
          <PillarsSection />
          <TestimonialsSection />
          <RoadmapSection />
          <VrConsultationSection />
          <CtaSection />
          <ExpertsSection />
        </div>
      </main>
    </div>
  );
};
