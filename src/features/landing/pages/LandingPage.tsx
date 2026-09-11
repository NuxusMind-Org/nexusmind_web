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
import { Footer } from '../components/Footer';
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
    <div className="w-full min-h-screen flex flex-col relative font-sans text-white bg-landing-gradient">

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
          <ExpertsSection />
          <VrConsultationSection />
          <RoadmapSection />
          <FeaturesSection />
          <PillarsSection />
          <TestimonialsSection />
          <CtaSection />
          <Footer />
        </div>
      </main>
    </div>
  );
};
