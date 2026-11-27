import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LandingNavbar } from '../components/LandingNavbar';
import {
  HeroSection,
  FeelingsMatterSection,
  DailyRitualsSection,
  PillarsSection,
  TestimonialsSection,
  RoadmapSection,
  VrConsultationSection,
  CtaSection,
  ExpertsSection,
  PartnersSection,
} from '../components/sections';
import { UserHeroSection } from '../components/authenticated';
import { Footer } from '../components/Footer';
import { PartnersTicker } from '../components/PartnersTicker';
import { useActiveSection } from '../hooks/useActiveSection';
import { GradientBackground } from '@/components';
import { WaveDivider } from '@/components/WaveDivider';
import { useAuthStore } from '@/store/authStore';

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
  const { isAuthenticated } = useAuthStore();
  const { hash } = useLocation();

  // Handle deep-link hash on initial load and hash navigation
  useEffect(() => {
    if (hash) {
      scrollToSection(hash.replace('#', ''));
    }
  }, [hash]);

  return (
    <div className="w-full min-h-screen flex flex-col relative font-sans bg-white text-slate-900">
      <LandingNavbar
        activePage="landing"
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      <div className="relative">
        <GradientBackground speed={1} resolution={0.5} />

        <div className="relative z-10">
          {isAuthenticated ? (
            <UserHeroSection />
          ) : (
            <HeroSection />
          )}
        </div>
      </div>
      {/* Single purple wave transitioning seamlessly into the white partners slider strip */}
      <div
        className="relative w-full z-[5]"
        style={{ marginTop: 'clamp(-66px, -4.6vw, -44px)' }}
      >
        <WaveDivider variant="single-to-white" />
      </div>

      {/* Hero-bottom Partners Slider (above ExpertsSection) */}
      <div
        className="relative z-20 w-full bg-white -mt-px py-3 sm:py-4 md:py-5"
        aria-label="Partners"
      >
        <PartnersTicker compact />
      </div>

      <main className="flex-1 w-full relative">
        <div className="w-full relative flex flex-col">
          <ExpertsSection />
          <div
            className="w-full relative flex flex-col bg-landing-gradient text-white"
            style={{ marginTop: 'clamp(-40px, -3.5vw, -16px)' }}
          >
            <VrConsultationSection />
            <div
              className="relative w-full z-[10] pointer-events-none"
              style={{ marginTop: 'clamp(-42px, -2.8vw, -28px)' }}
            >
              <WaveDivider variant="single" />
            </div>

            <RoadmapSection />
            <PartnersSection />
            <FeelingsMatterSection />
            <PillarsSection />
            <DailyRitualsSection />
            <div
              className="relative w-full z-[10] pointer-events-none"
              style={{ marginTop: 'clamp(-42px, -2.8vw, -28px)' }}
            >
              <WaveDivider variant="single" />
            </div>
            <TestimonialsSection />
            {!isAuthenticated && <CtaSection />}
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
};
