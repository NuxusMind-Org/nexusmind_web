/**
 * WaveDivider Component
 *
 * Three large, smooth wave bands separating the Hero section
 * from the Experts section.
 *
 * DESIGN REFERENCE
 * ─────────────────────────────────────────────────────────────
 * • Full viewport width
 * • Approximately 350–360px total visual transition height
 * • Three distinct layered bands
 * • Large, shallow, organic Bézier curves
 * • No strokes
 * • No shadows
 * • No repeated/scalloped waves
 *
 * COLORS
 * ─────────────────────────────────────────────────────────────
 * Wave 1 — Dark Purple/Blue: #6B69A8
 * Wave 2 — Light Lavender:   #B6BBD9
 * Wave 3 — Warm Off-White:   #EFEAEA
 * Final section:             #FFFFFF
 *
 * IMPORTANT
 * ─────────────────────────────────────────────────────────────
 * The SVG uses a 1271 × 360 coordinate system.
 *
 * The curve positions are based on the reference composition:
 *
 *                    CENTER
 *                      ↓
 *       ─────────────╮ ╭─────────────
 *                    ╰─╯
 *
 * The waves are intentionally very broad and shallow.
 */

import { useEffect, useRef, useState, type CSSProperties } from 'react';

interface WaveDividerProps {
  className?: string;
  reverse?: boolean;
  variant?: 'multi' | 'single';
}

const STAGGER_MS = 220;
const INITIAL_DELAY_MS = 80;
const DURATION_MS = 650;
const EASE = 'cubic-bezier(0.25, 1, 0.5, 1)';

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
};

const useDividerVisible = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sync = (rect: DOMRectReadOnly) => {
      if (rect.bottom <= 0) {
        setVisible(true);
        return;
      }
      if (rect.top < window.innerHeight - 30) {
        setVisible(true);
        return;
      }
      setVisible(false);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        sync(entry.boundingClientRect);
      },
      {
        threshold: [0, 0.15, 1],
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(el);
    sync(el.getBoundingClientRect());

    const onScroll = () => sync(el.getBoundingClientRect());
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      observer.unobserve(el);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return { ref, visible };
};

const animatedBandStyle = (index: number, visible: boolean, reduced: boolean): CSSProperties => {
  if (reduced) {
    return { opacity: 1 };
  }

  return {
    opacity: visible ? 1 : 0,
    transition: `opacity ${DURATION_MS}ms ${EASE}`,
    transitionDelay: visible ? `${INITIAL_DELAY_MS + index * STAGGER_MS}ms` : '0ms',
  };
};

export const WaveDivider = ({
  className = '',
  reverse = false,
  variant = 'multi',
}: WaveDividerProps) => {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, visible } = useDividerVisible();

  if (variant === 'single') {
    return (
      <div
        ref={ref}
        className={`
          w-full
          overflow-hidden
          leading-[0]
          pointer-events-none
          select-none
          ${className}
        `}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1271 110"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full block"
          style={{
            height: 'clamp(60px, 7.5vw, 95px)',
          }}
        >
          {reverse ? (
            <path
              d="
                M -20 16
                C 180 22 420 44 700 48
                C 920 50 1120 28 1291 26
                L 1291 38
                C 1120 40 920 82 700 85
                C 420 80 180 34 -20 28
                Z
              "
              fill="#6B69A8"
              style={{ opacity: 1 }}
            />
          ) : (
            <path
              d="
                M -20 35
                C 180 30 420 10 700 15
                C 920 20 1120 34 1291 32
                L 1291 44
                C 1120 46 920 58 700 52
                C 420 46 180 44 -20 47
                Z
              "
              fill="#6B69A8"
              style={{ opacity: 1 }}
            />
          )}
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`
        w-full
        overflow-hidden
        leading-[0]
        pointer-events-none
        select-none
        ${className}
      `}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1271 220"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full block"
        style={{
          height: 'clamp(110px, 19vw, 220px)',
        }}
      >
        {reverse ? (
          <>
            {/* ============================================================
                REVERSE DIVIDER (Experts → VrConsultation)
                Sequence: White (#FFFFFF) → Light (#EFEAEA) → Lavender (#B6BBD9) → Dark (#6B69A8)
                ============================================================ */}

            {/* 1. TOP WHITE BASE: Connects seamlessly with white ExpertsSection */}
            <path
              d="
                M -20 0
                L 1291 0
                L 1291 60
                C 1120 65 920 86 700 80
                C 420 72 180 50 -20 45
                Z
              "
              fill="#FFFFFF"
              style={{ opacity: 1 }}
            />

            {/* 2. 1ST WAVE (Warm Off-White) — Stays still as the primary divider */}
            <path
              d="
                M -20 45
                C 180 50 420 72 700 80
                C 920 86 1120 65 1291 60
                L 1291 74
                C 1120 80 920 134 700 126
                C 420 114 180 68 -20 59
                Z
              "
              fill="#EFEAEA"
              style={{ opacity: 1 }}
            />

            {/* 3. 2ND WAVE (Light Lavender) — Fades in first */}
            <path
              d="
                M -20 59
                C 180 68 420 114 700 126
                C 920 134 1120 80 1291 74
                L 1291 87
                C 1120 94 920 178 700 170
                C 420 154 180 84 -20 72
                Z
              "
              fill="#B6BBD9"
              style={animatedBandStyle(0, visible, reducedMotion)}
            />

            {/* 4. 3RD WAVE (Dark Purple / Blue) — Fades in second */}
            <path
              d="
                M -20 72
                C 180 84 420 154 700 170
                C 920 178 1120 94 1291 87
                L 1291 99
                C 1120 106 920 220 700 212
                C 420 194 180 98 -20 84
                Z
              "
              fill="#6B69A8"
              style={animatedBandStyle(1, visible, reducedMotion)}
            />
          </>
        ) : (
          <>
            {/* ============================================================
                FORWARD DIVIDER (Hero → Experts)
                Sequence: Dark (#6B69A8) → Lavender (#B6BBD9) → Light (#EFEAEA) → White (#FFFFFF)
                ============================================================ */}

            {/* 1. DARK WAVE (Dark Purple / Blue) — Always visible as persistent divider */}
            <path
              d="
                M -20 45
                C 180 38 420 2 700 8
                C 920 14 1120 32 1291 30
                L 1291 42
                C 1120 46 920 56 700 50
                C 420 42 180 54 -20 57
                Z
              "
              fill="#6B69A8"
              style={{ opacity: 1 }}
            />

            {/* 2. MIDDLE WAVE (Light Lavender) — Fades in first */}
            <path
              d="
                M -20 57
                C 180 54 420 42 700 50
                C 920 56 1120 46 1291 42
                L 1291 55
                C 1120 62 920 100 700 94
                C 420 82 180 72 -20 70
                Z
              "
              fill="#B6BBD9"
              style={animatedBandStyle(0, visible, reducedMotion)}
            />

            {/* 3. LIGHT WAVE (Warm Off-White) — Fades in second */}
            <path
              d="
                M -20 70
                C 180 72 420 82 700 94
                C 920 100 1120 62 1291 55
                L 1291 69
                C 1120 80 920 146 700 140
                C 420 124 180 92 -20 84
                Z
              "
              fill="#EFEAEA"
              style={animatedBandStyle(1, visible, reducedMotion)}
            />

            {/* 4. WHITE BASE: Connects seamlessly into white ExpertsSection */}
            <path
              d="
                M -20 84
                C 180 92 420 124 700 140
                C 920 146 1120 80 1291 69
                L 1291 220
                L -20 220
                Z
              "
              fill="#FFFFFF"
              style={{ opacity: 1 }}
            />
          </>
        )}
      </svg>
    </div>
  );
};
