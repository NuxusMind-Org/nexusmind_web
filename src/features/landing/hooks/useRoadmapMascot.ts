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

      const isMobile = window.innerWidth < 768 || Math.abs(card1.offsetLeft - card2.offsetLeft) < 100;

      if (isMobile) {
        const start1x = card1.offsetLeft + card1.offsetWidth / 2;
        const start1y = card1.offsetTop + card1.offsetHeight + 10;
        const end1x = card2.offsetLeft + card2.offsetWidth / 2;
        const end1y = card2.offsetTop - 15;
        setArrow1Path(`M ${start1x},${start1y} C ${start1x},${start1y + (end1y - start1y) * 0.5} ${end1x},${start1y + (end1y - start1y) * 0.5} ${end1x},${end1y}`);
        setArrow1Chevron(`M ${end1x - 7},${end1y - 8} L ${end1x},${end1y} L ${end1x + 7},${end1y - 8}`);

        const start2x = card2.offsetLeft + card2.offsetWidth / 2;
        const start2y = card2.offsetTop + card2.offsetHeight + 10;
        const end2x = card3.offsetLeft + card3.offsetWidth / 2;
        const end2y = card3.offsetTop - 15;
        setArrow2Path(`M ${start2x},${start2y} C ${start2x},${start2y + (end2y - start2y) * 0.5} ${end2x},${start2y + (end2y - start2y) * 0.5} ${end2x},${end2y}`);
        setArrow2Chevron(`M ${end2x - 7},${end2y - 8} L ${end2x},${end2y} L ${end2x + 7},${end2y - 8}`);
      } else {
        const p1x = card1.offsetLeft + card1.offsetWidth;
        const p1y = card1.offsetTop + 170;
        const p2x = card2.offsetLeft + 150;
        const p2y = card2.offsetTop;
        setArrow1Path(`M ${p1x},${p1y} C ${p1x + 60},${p1y} ${p2x},${p2y - 60} ${p2x},${p2y}`);
        setArrow1Chevron(`M ${p2x - 8},${p2y - 10} L ${p2x},${p2y} L ${p2x + 8},${p2y - 10}`);

        const p3x = card2.offsetLeft;
        const p3y = card2.offsetTop + 170;
        const p4x = card3.offsetLeft + card3.offsetWidth - 150;
        const p4y = card3.offsetTop;
        setArrow2Path(`M ${p3x},${p3y} C ${p3x - 60},${p3y} ${p4x},${p4y - 60} ${p4x},${p4y}`);
        setArrow2Chevron(`M ${p4x - 8},${p4y - 10} L ${p4x},${p4y} L ${p4x + 8},${p4y - 10}`);
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

