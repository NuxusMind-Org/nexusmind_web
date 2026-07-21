import { useState, useEffect } from 'react';

/**
 * Subscribes to a CSS media query and returns whether it currently matches.
 * Uses `matchMedia` for zero-layout-cost reactivity.
 *
 * @example
 * const isTablet = useMediaQuery('(min-width: 768px)');
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Sync in case SSR initial value diverged
    setMatches(mql.matches);

    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

/**
 * Convenience hook: `true` when viewport is below `lg` breakpoint (< 1024px).
 * This is the boundary at which the webapp switches from sidebar → bottom navigation.
 */
export const useIsMobile = (): boolean => {
  return !useMediaQuery('(min-width: 1024px)');
};
