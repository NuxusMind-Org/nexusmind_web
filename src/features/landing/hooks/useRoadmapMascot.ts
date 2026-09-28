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
      const drop1x = card2.offsetLeft + 140;
      const drop2x = card3.offsetLeft + card3.offsetWidth - 140;
      const canZigzag =
        window.innerWidth >= 768 &&
        drop1x >= card1.offsetLeft + card1.offsetWidth + r * 2 &&
        drop2x <= card2.offsetLeft - r * 2;

      if (!canZigzag) {
        const start1x = card1.offsetLeft + card1.offsetWidth / 2;
        const start1y = card1.offsetTop + card1.offsetHeight + 10;
        const end1x = card2.offsetLeft + card2.offsetWidth / 2;
        const end1y = card2.offsetTop - 12;
        const mid1y = (start1y + end1y) / 2;
        setArrow1Path(`M ${start1x},${start1y} L ${end1x},${end1y}`);
        setArrow1Chevron(chevronPath(start1x, mid1y, 'down'));

        const start2x = card2.offsetLeft + card2.offsetWidth / 2;
        const start2y = card2.offsetTop + card2.offsetHeight + 10;
        const end2x = card3.offsetLeft + card3.offsetWidth / 2;
        const end2y = card3.offsetTop - 12;
        const mid2y = (start2y + end2y) / 2;
        setArrow2Path(`M ${start2x},${start2y} L ${end2x},${end2y}`);
        setArrow2Chevron(chevronPath(start2x, mid2y, 'down'));
      } else {
        const s1x = card1.offsetLeft + card1.offsetWidth;
        const s1y = card1.offsetTop + card1.offsetHeight - 28;
        const e1x = drop1x;
        const e1y = card2.offsetTop;
        const gap1 = e1y - (card1.offsetTop + card1.offsetHeight);
        const mid1y = card1.offsetTop + card1.offsetHeight + Math.max(r + 8, gap1 * 0.28);

        setArrow1Path(
          `M ${s1x},${s1y} L ${s1x},${mid1y - r} Q ${s1x},${mid1y} ${s1x + r},${mid1y} L ${e1x - r},${mid1y} Q ${e1x},${mid1y} ${e1x},${mid1y + r} L ${e1x},${e1y}`
        );
        setArrow1Chevron(chevronPath((s1x + e1x) / 2, mid1y, 'right'));

        const s2x = card2.offsetLeft;
        const s2y = card2.offsetTop + card2.offsetHeight - 28;
        const e2x = drop2x;
        const e2y = card3.offsetTop;
        const gap2 = e2y - (card2.offsetTop + card2.offsetHeight);
        const mid2y = card2.offsetTop + card2.offsetHeight + Math.max(r + 8, gap2 * 0.28);

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

      const showA1 = progress > 0.15;
      const showA2 = progress > 0.45;

      if (showA1 !== arrowsVisibleRef.current.a1 || showA2 !== arrowsVisibleRef.current.a2) {
        arrowsVisibleRef.current = { a1: showA1, a2: showA2 };
        setArrowsVisible({ a1: showA1, a2: showA2 });
      }
    };

    window.addEventListener('scroll', updateConnectorPaths);
    window.addEventListener('resize', updateConnectorPaths);
    setTimeout(updateConnectorPaths, 100);

    return () => {
      window.removeEventListener('scroll', updateConnectorPaths);
      window.removeEventListener('resize', updateConnectorPaths);
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
