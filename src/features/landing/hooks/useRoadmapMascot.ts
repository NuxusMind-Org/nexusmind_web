import { useState, useRef, useEffect } from 'react';

export interface RoadmapMascotState {
  roadmapRef: React.RefObject<HTMLDivElement | null>;
  card1Ref: React.RefObject<HTMLDivElement | null>;
  card2Ref: React.RefObject<HTMLDivElement | null>;
  card3Ref: React.RefObject<HTMLDivElement | null>;
  arrowsVisible: { a1: boolean; a2: boolean };
  arrow1Path: string;
  arrow1Chevron: string;
  arrow2Path: string;
  arrow2Chevron: string;
}

const CORNER_R = 28;
const CHEVRON = 9;

const chevronPath = (cx: number, cy: number, dir: 'right' | 'left' | 'down') => {
  if (dir === 'right') {
    return `M ${cx - CHEVRON},${cy - CHEVRON} L ${cx + 3},${cy} L ${cx - CHEVRON},${cy + CHEVRON}`;
  }
  if (dir === 'left') {
    return `M ${cx + CHEVRON},${cy - CHEVRON} L ${cx - 3},${cy} L ${cx + CHEVRON},${cy + CHEVRON}`;
  }
  return `M ${cx - CHEVRON},${cy - CHEVRON} L ${cx},${cy + 3} L ${cx + CHEVRON},${cy - CHEVRON}`;
};

/**
 * Manages refs for roadmap cards and computes SVG connector arrow paths
 * as the user scrolls through the section.
 */
export const useRoadmapMascot = (): RoadmapMascotState => {
  const [arrowsVisible, setArrowsVisible] = useState<{ a1: boolean; a2: boolean }>({ a1: false, a2: false });
  const arrowsVisibleRef = useRef<{ a1: boolean; a2: boolean }>({ a1: false, a2: false });

  const [arrow1Path, setArrow1Path] = useState('');
  const [arrow1Chevron, setArrow1Chevron] = useState('');
  const [arrow2Path, setArrow2Path] = useState('');
  const [arrow2Chevron, setArrow2Chevron] = useState('');

  const roadmapRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateConnectorPaths = () => {
      const container = roadmapRef.current;
      const card1 = card1Ref.current;
      const card2 = card2Ref.current;
      const card3 = card3Ref.current;

      if (!container || !card1 || !card2 || !card3) return;

      const r = CORNER_R;
      const c1Right = card1.offsetLeft + card1.offsetWidth;
      const c2Left = card2.offsetLeft;
      const c2Right = card2.offsetLeft + card2.offsetWidth;
      const c3Right = card3.offsetLeft + card3.offsetWidth;

      // Drop point on Card 2 (for Arrow 1)
      const idealDrop1x = Math.max(c1Right + r * 2 + 10, c2Left + 160);
      const drop1x = Math.min(c2Right - 80, idealDrop1x);

      // Drop point on Card 3 (for Arrow 2)
      const idealDrop2x = Math.min(c2Left - r * 2 - 10, c3Right - 160);
      const drop2x = Math.max(card3.offsetLeft + 80, idealDrop2x);

      const canZigzag =
        window.innerWidth >= 768 &&
        drop1x >= c1Right + r * 2 &&
        drop2x <= c2Left - r * 2;

      if (!canZigzag) {
        const start1x = card1.offsetLeft + card1.offsetWidth / 2;
        const start1y = card1.offsetTop + card1.offsetHeight + 10;
        const end1x = card2.offsetLeft + card2.offsetWidth / 2;
        const end1y = card2.offsetTop - 12;
        const mid1x = (start1x + end1x) / 2;
        const mid1y = (start1y + end1y) / 2;
        setArrow1Path(`M ${start1x},${start1y} L ${end1x},${end1y}`);
        setArrow1Chevron(chevronPath(mid1x, mid1y, 'down'));

        const start2x = card2.offsetLeft + card2.offsetWidth / 2;
        const start2y = card2.offsetTop + card2.offsetHeight + 10;
        const end2x = card3.offsetLeft + card3.offsetWidth / 2;
        const end2y = card3.offsetTop - 12;
        const mid2x = (start2x + end2x) / 2;
        const mid2y = (start2y + end2y) / 2;
        setArrow2Path(`M ${start2x},${start2y} L ${end2x},${end2y}`);
        setArrow2Chevron(chevronPath(mid2x, mid2y, 'down'));
      } else {
        const s1x = c1Right;
        const s1y = card1.offsetTop + card1.offsetHeight - 28;
        const e1x = drop1x;
        const e1y = card2.offsetTop;
        const gap1 = e1y - (card1.offsetTop + card1.offsetHeight);
        const mid1y = card1.offsetTop + card1.offsetHeight + Math.max(r + 8, gap1 * 0.35);

        setArrow1Path(
          `M ${s1x},${s1y} L ${s1x},${mid1y - r} Q ${s1x},${mid1y} ${s1x + r},${mid1y} L ${e1x - r},${mid1y} Q ${e1x},${mid1y} ${e1x},${mid1y + r} L ${e1x},${e1y}`
        );
        setArrow1Chevron(chevronPath((s1x + e1x) / 2, mid1y, 'right'));

        const s2x = c2Left;
        const s2y = card2.offsetTop + card2.offsetHeight - 28;
        const e2x = drop2x;
        const e2y = card3.offsetTop;
        const gap2 = e2y - (card2.offsetTop + card2.offsetHeight);
        const mid2y = card2.offsetTop + card2.offsetHeight + Math.max(r + 8, gap2 * 0.35);

        setArrow2Path(
          `M ${s2x},${s2y} L ${s2x},${mid2y - r} Q ${s2x},${mid2y} ${s2x - r},${mid2y} L ${e2x + r},${mid2y} Q ${e2x},${mid2y} ${e2x},${mid2y + r} L ${e2x},${e2y}`
        );
        setArrow2Chevron(chevronPath((s2x + e2x) / 2, mid2y, 'left'));
      }

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const startScroll = viewportHeight * 0.7;
      const endScroll = -rect.height + viewportHeight * 0.35;
      const currentScroll = rect.top;
      const range = startScroll - endScroll;
      const progress = Math.max(0, Math.min(1, (startScroll - currentScroll) / range));

      const showA1 = progress > 0.12;
      const showA2 = progress > 0.40;

      if (showA1 !== arrowsVisibleRef.current.a1 || showA2 !== arrowsVisibleRef.current.a2) {
        arrowsVisibleRef.current = { a1: showA1, a2: showA2 };
        setArrowsVisible({ a1: showA1, a2: showA2 });
      }
    };

    window.addEventListener('scroll', updateConnectorPaths, { passive: true });
    window.addEventListener('resize', updateConnectorPaths);
    const timer1 = setTimeout(updateConnectorPaths, 100);
    const timer2 = setTimeout(updateConnectorPaths, 400);
    const timer3 = setTimeout(updateConnectorPaths, 1000);

    return () => {
      window.removeEventListener('scroll', updateConnectorPaths);
      window.removeEventListener('resize', updateConnectorPaths);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return {
    roadmapRef,
    card1Ref,
    card2Ref,
    card3Ref,
    arrowsVisible,
    arrow1Path,
    arrow1Chevron,
    arrow2Path,
    arrow2Chevron,
  };
};