import { useState, useEffect } from 'react';

interface Section {
  id: string;
  index: number;
}

const SECTIONS: Section[] = [
  { id: 'hero', index: 0 },
  { id: 'features', index: 1 },
  { id: 'pillars', index: 2 },
  { id: 'testimonials', index: 3 },
  { id: 'roadmap', index: 4 },
  { id: 'vr', index: 7 },
  { id: 'cta', index: 8 },
  { id: 'experts', index: 9 },
];

/**
 * Tracks which landing page section is currently in the viewport
 * using IntersectionObserver. Returns the active section index.
 */
export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matched = SECTIONS.find((s) => s.id === entry.target.id);
            if (matched !== undefined) {
              setActiveSection(matched.index);
            }
          }
        });
      },
      {
        root: null,
        threshold: 0.2,
        rootMargin: '-5% 0px -5% 0px',
      }
    );

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return activeSection;
};
