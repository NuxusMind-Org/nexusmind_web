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

      {/* ── Gradient zone: navbar + hero share one background ── */}
      <div className="relative">
        {/* WebGL animated gradient — sits behind navbar and hero */}
        <GradientBackground speed={1} resolution={0.5} />

        {/* Navbar — transparent, renders above the canvas */}
        <div className="relative z-50">
          <LandingNavbar
            activePage="landing"
            activeSection={activeSection}
            scrollToSection={scrollToSection}
          />
        </div>

        {/* Hero — renders above the canvas, no negative margin needed */}
        <div className="relative z-10">
          <HeroSection />
        </div>
      </div>

      {/*
       * ── Hero → Experts Wave Divider ──────────────────────────────────────
       * Full-bleed three-band wave transition.
       * Pulled up via negative top margin so the wave overlaps the bottom of
       * the gradient hero zone; the wave's bottom (#EFEAEA / white) merges
       * naturally into the white ExpertsSection beneath it.
       *
       * z-index 5 keeps it above the WebGL canvas (z-0) but below the hero
       * interactive content (z-10 / z-20).
       * pointer-events: none is applied inside WaveDivider itself.
       * ───────────────────────────────────────────────────────────────────── */}
      <div
        className="relative w-full z-[5]"
        style={{ marginTop: 'clamp(-216px, -12vw, -120px)' }}
      >
        <WaveDivider />
      </div>

      {/* ── Main content sections ─────── */}
      <main className="flex-1 w-full relative">
        <div className="w-full relative flex flex-col">
          <ExpertsSection />

          {/* ── Dark gradient sections starting with the Reverse Wave Divider ── */}
          <div className="w-full relative flex flex-col bg-landing-gradient text-white -mt-1">
            {/*
             * ── Experts → VrConsultation Reverse Wave Divider ─────────────
             * Full-bleed three-band wave transition in reverse:
             * White (Experts) → Light Off-White (#EFEAEA) → Lavender (#B6BBD9) → Dark Purple (#6B69A8).
             * Top is pure white #FFFFFF merging into ExpertsSection.
             * Bottom transparent reveal lets bg-landing-gradient emerge organically.
             * ───────────────────────────────────────────────────────────── */}
            <div
              className="relative w-full z-[10] pointer-events-none"
              style={{ marginTop: 'clamp(-200px, -14vw, -90px)' }}
            >
              <WaveDivider reverse />
            </div>

            <VrConsultationSection />

            {/* ── VrConsultation → Roadmap Single Dark Wave Divider ─────── */}
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
