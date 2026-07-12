import { useEffect, useRef, useState, forwardRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(
  ({ children, className = '' }, ref) => {
    const internalRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            return;
          }

          // If not intersecting, check if it's above the top of the screen
          const isAboveViewport = entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0);
          if (isAboveViewport) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        },
        {
          threshold: 0.1, // Trigger as soon as 10% of the element is visible
          rootMargin: '-5% 0px -5% 0px', // Shrink the trigger area slightly for a smoother transition
        }
      );

      // Use the forwarded ref if provided, otherwise fall back to internal ref
      const currentElement = internalRef.current;
      if (currentElement) {
        observer.observe(currentElement);
      }

      return () => {
        if (currentElement) {
          observer.unobserve(currentElement);
        }
      };
    }, []);

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
            : 'opacity-0 translate-y-12 scale-95 pointer-events-none'
        } ${className}`}
      >
        {children}
      </div>
    );
  }
);
