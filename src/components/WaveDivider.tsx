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

const STAGGER_MS = 150;
const DURATION_MS = 700;
const EASE = 'ease-in-out';

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
      if (rect.top < window.innerHeight - 20) {
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
        rootMargin: '0px 0px -20px 0px',
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

const bandStyle = (index: number, visible: boolean, reduced: boolean): CSSProperties => {
  if (reduced) {
    return { opacity: 1 };
  }

  return {
    opacity: visible ? 1 : 0,
    transition: `opacity ${DURATION_MS}ms ${EASE}`,
    transitionDelay: visible ? `${index * STAGGER_MS}ms` : '0ms',
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
          viewBox="0 0 1271 160"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full block"
          style={{
            height: 'clamp(100px, 12vw, 150px)',
          }}
        >
          {reverse ? (
            <path
              d="
                M -20 15
                C 180 25 400 65 700 60
                C 900 55 1100 25 1291 30
                L 1291 95
                C 1100 90 900 120 700 125
                C 400 130 180 90 -20 80
                Z
              "
              fill="#6B69A8"
              style={bandStyle(0, visible, reducedMotion)}
            />
          ) : (
            <path
              d="
                M -20 45
                C 180 35 400 5 700 12
                C 900 20 1100 45 1291 40
                L 1291 105
                C 1100 110 900 85 700 77
                C 400 70 180 100 -20 110
                Z
              "
              fill="#6B69A8"
              style={bandStyle(0, visible, reducedMotion)}
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
        viewBox="0 0 1271 360"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full block"
        style={{
          height: 'clamp(160px, 31.5vw, 360px)',
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
                L 1291 90
                C 1100 84 900 116 700 124
                C 400 134 180 50 -20 38
                Z
              "
              fill="#FFFFFF"
              style={bandStyle(0, visible, reducedMotion)}
            />

            {/* 2. LIGHT WAVE (Warm Off-White) */}
            <path
              d="
                M -20 38
                C 180 50 400 134 700 124
                C 900 116 1100 84 1291 90
                L 1291 169
                C 1100 163 900 195 700 203
                C 400 213 180 145 -20 133
                Z
              "
              fill="#EFEAEA"
              style={bandStyle(1, visible, reducedMotion)}
            />

            {/* 3. MIDDLE WAVE (Light Lavender) */}
            <path
              d="
                M -20 133
                C 180 145 400 213 700 203
                C 900 195 1100 163 1291 169
                L 1291 240
                C 1100 234 900 266 700 274
                C 400 284 180 222 -20 210
                Z
              "
              fill="#B6BBD9"
              style={bandStyle(2, visible, reducedMotion)}
            />

            {/* 4. DARK WAVE (Dark Purple / Blue) */}
            <path
              d="
                M -20 210
                C 180 222 400 284 700 274
                C 900 266 1100 234 1291 240
                L 1291 330
                C 1100 326 900 358 700 366
                C 400 376 180 312 -20 302
                Z
              "
              fill="#6B69A8"
              style={bandStyle(3, visible, reducedMotion)}
            />
          </>
        ) : (
          <>
            {/* ============================================================
                FORWARD DIVIDER (Hero → Experts)
                Sequence: Dark (#6B69A8) → Lavender (#B6BBD9) → Light (#EFEAEA) → White (#FFFFFF)
                ============================================================ */}

            {/* 1. DARK WAVE (Dark Purple / Blue) — Starts at top */}
            <path
              d="
                M -20 58
                C 180 48 400 -16 700 -6
                C 900 2 1100 34 1291 30
                L 1291 120
                C 1100 126 900 94 700 86
                C 400 76 180 138 -20 150
                Z
              "
              fill="#6B69A8"
              style={bandStyle(0, visible, reducedMotion)}
            />

            {/* 2. MIDDLE WAVE (Light Lavender) */}
            <path
              d="
                M -20 150
                C 180 138 400 76 700 86
                C 900 94 1100 126 1291 120
                L 1291 191
                C 1100 197 900 165 700 157
                C 400 147 180 215 -20 227
                Z
              "
              fill="#B6BBD9"
              style={bandStyle(1, visible, reducedMotion)}
            />

            {/* 3. LIGHT WAVE (Warm Off-White) */}
            <path
              d="
                M -20 227
                C 180 215 400 147 700 157
                C 900 165 1100 197 1291 191
                L 1291 270
                C 1100 276 900 244 700 236
                C 400 226 180 310 -20 322
                Z
              "
              fill="#EFEAEA"
              style={bandStyle(2, visible, reducedMotion)}
            />

            {/* 4. WHITE BASE: Connects seamlessly into white ExpertsSection */}
            <path
              d="
                M -20 322
                C 180 310 400 226 700 236
                C 900 244 1100 276 1291 270
                L 1291 360
                L -20 360
                Z
              "
              fill="#FFFFFF"
              style={bandStyle(3, visible, reducedMotion)}
            />
          </>
        )}
      </svg>
    </div>
  );
};
