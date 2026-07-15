import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll window to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Scroll any overflow-y-auto elements (like the scrollable container in the dashboard layout) to top
    const scrollContainers = document.querySelectorAll('.overflow-y-auto');
    scrollContainers.forEach((container) => {
      container.scrollTop = 0;
    });
  }, [pathname]);

  return null;
};
