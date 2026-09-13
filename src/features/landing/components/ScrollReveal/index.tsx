import { useEffect, useRef, useState, forwardRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(
  ({ children, className = '', threshold = 0.05, rootMargin = '0px 0px -20px 0px', once = false }, ref) => {
    const internalRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const currentElement = internalRef.current;
      if (!currentElement) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && currentElement) {
              observer.unobserve(currentElement);
            }
            return;
          }

          // If not intersecting, check if it's above the top of the screen
          const isAboveViewport = entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0);
          if (isAboveViewport) {
            setIsVisible(true);
          } else if (!once) {
            setIsVisible(false);
          }
        },
        {
          threshold,
          rootMargin,
        }
      );

      observer.observe(currentElement);

      return () => {
        observer.unobserve(currentElement);
      };
    }, [threshold, rootMargin, once]);

    // Combine forwarded ref and internal ref
    const setRefs = (node: HTMLDivElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    return (
      <div
        ref={setRefs}
        className={`transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
        } ${className}`}
      >
        {children}
      </div>
    );
  }
);
