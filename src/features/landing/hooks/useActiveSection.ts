import { useState, useEffect } from 'react';

interface Section {
  id: string;
  index: number;
}

// Ordered strictly as they appear visually from top to bottom on the Landing Page
const SECTIONS: Section[] = [
  { id: 'hero', index: 0 },
  { id: 'experts', index: 9 },
  { id: 'vr', index: 7 },
  { id: 'roadmap', index: 4 },
  { id: 'features', index: 1 },
  { id: 'pillars', index: 2 },
  { id: 'testimonials', index: 3 },
  { id: 'cta', index: 8 },
];

/**
 * Tracks which landing page section is currently in the viewport.
 * Guarantees that when near the top of the page (Hero), the active section
 * is strictly Hero (index 0), preventing lower sections from falsely activating.
 */
export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<number>(0);

  useEffect(() => {
    const computeActiveSection = () => {
      // 1. If at or near the top of the page, hero section is ALWAYS active
      if (window.scrollY < 150) {
        setActiveSection(0);
        return;
      }

      // 2. If scrolled to the bottom of the page, activate the last section
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;
      if (isBottom) {
        for (let i = SECTIONS.length - 1; i >= 0; i--) {
          const el = document.getElementById(SECTIONS[i].id);
          if (el) {
            setActiveSection(SECTIONS[i].index);
            return;
          }
        }
      }

      // 3. Focal line: 180px from top of viewport (just below the sticky navbar)
      const targetY = 180;
      let matchedIndex = 0;

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= targetY && rect.bottom > targetY) {
            matchedIndex = section.index;
            break;
          }
        }
      }

      setActiveSection(matchedIndex);
    };

    let ticking = false;
    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          computeActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Run initial computation
    computeActiveSection();

    // Check again after dynamic layout stabilization (images/fonts/animations load)
    const timer1 = setTimeout(computeActiveSection, 150);
    const timer2 = setTimeout(computeActiveSection, 600);

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return activeSection;
};
