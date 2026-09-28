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
  PartnersSection,
} from '../components/sections';
import { Footer } from '../components/Footer';
import { useActiveSection } from '../hooks/useActiveSection';
import { GradientBackground } from '@/components';
import { WaveDivider } from '@/components/WaveDivider';

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
    <div className="w-full min-h-screen flex flex-col relative font-sans bg-white text-slate-900">


      <div className="relative">

        <GradientBackground speed={1} resolution={0.5} />


        <div className="relative z-50">
          <LandingNavbar
            activePage="landing"
            activeSection={activeSection}
            scrollToSection={scrollToSection}
          />
        </div>


        <div className="relative z-10">
          <HeroSection />
        </div>
      </div>
      <div
        className="relative w-full z-[5]"
        style={{ marginTop: 'clamp(-216px, -12vw, -120px)' }}
      >
        <WaveDivider />
      </div>


      <main className="flex-1 w-full relative">
        <div className="w-full relative flex flex-col">
          <ExpertsSection />
          <div className="w-full relative flex flex-col bg-landing-gradient text-white -mt-1">
            <div
              className="relative w-full z-[10] pointer-events-none"
              style={{ marginTop: 'clamp(-70px, -5vw, -40px)' }}
            >
              <WaveDivider reverse />
            </div>

            <VrConsultationSection />
            <div
              className="relative w-full z-[10] pointer-events-none"
              style={{ marginTop: 'clamp(-65px, -4vw, -45px)' }}
            >
              <WaveDivider variant="single" />
            </div>

            <RoadmapSection />
            <PartnersSection />
            <FeaturesSection />
            <PillarsSection />
            <TestimonialsSection />
            <CtaSection />
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
};
