import { useState, useRef, useEffect } from 'react';
import nexieSittingClassic from '@/assets/svg/NexieSittingClassic.svg';
import nexieSittingPurple from '@/assets/svg/NexieSittingPurple.svg';

export interface RoadmapMascotState {
  roadmapRef: React.RefObject<HTMLDivElement | null>;
  card1Ref: React.RefObject<HTMLDivElement | null>;
  card2Ref: React.RefObject<HTMLDivElement | null>;
  card3Ref: React.RefObject<HTMLDivElement | null>;
  mascotSrc: string;
  mascotFilter: string;
  mascotX: number;
  mascotY: number;
  mascotOpacity: number;
  arrowsVisible: { a1: boolean; a2: boolean };
  arrow1Path: string;
  arrow1Chevron: string;
  arrow2Path: string;
  arrow2Chevron: string;
  activeCardIndex: 1 | 2 | 3;
}

/**
 * Manages the animated Nexie mascot that teleports between roadmap cards
 * based on scroll position, plus the SVG connector arrow paths.
 *
 * All ref reads are confined inside useEffect / event handlers (never during render).
 */
export const useRoadmapMascot = (): RoadmapMascotState => {
  const [isMascotInView, setIsMascotInView] = useState(false);
  const [arrowsVisible, setArrowsVisible] = useState<{ a1: boolean; a2: boolean }>({ a1: false, a2: false });
  const arrowsVisibleRef = useRef<{ a1: boolean; a2: boolean }>({ a1: false, a2: false });

  const [arrow1Path, setArrow1Path] = useState('');
  const [arrow1Chevron, setArrow1Chevron] = useState('');
  const [arrow2Path, setArrow2Path] = useState('');
  const [arrow2Chevron, setArrow2Chevron] = useState('');

  const [activeCardIndex, setActiveCardIndex] = useState<1 | 2 | 3>(1);
  const activeCardIndexRef = useRef<1 | 2 | 3>(1);
  const [isTeleporting, setIsTeleporting] = useState(false);

  // Mascot position stored as state — computed inside the scroll handler, never during render
  const [mascotX, setMascotX] = useState(0);
  const [mascotY, setMascotY] = useState(0);

  const roadmapRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMascotPosition = () => {
      const container = roadmapRef.current;
      const card1 = card1Ref.current;
      const card2 = card2Ref.current;
      const card3 = card3Ref.current;

      if (!container || !card1 || !card2 || !card3) return;

      const isMobile = window.innerWidth < 768 || Math.abs(card1.offsetLeft - card2.offsetLeft) < 100;

      if (isMobile) {
        const start1x = card1.offsetLeft + card1.offsetWidth / 2;
        const start1y = card1.offsetTop + card1.offsetHeight + 18;
        const end1x = card2.offsetLeft + card2.offsetWidth / 2;
        const end1y = card2.offsetTop - 25;
        setArrow1Path(`M ${start1x},${start1y} C ${start1x + 30},${start1y + 15} ${end1x - 30},${end1y - 15} ${end1x},${end1y}`);
        setArrow1Chevron(`M ${end1x - 8},${end1y - 10} L ${end1x},${end1y} L ${end1x + 8},${end1y - 10}`);

        const start2x = card2.offsetLeft + card2.offsetWidth / 2;
        const start2y = card2.offsetTop + card2.offsetHeight + 18;
        const end2x = card3.offsetLeft + card3.offsetWidth / 2;
        const end2y = card3.offsetTop - 25;
        setArrow2Path(`M ${start2x},${start2y} C ${start2x - 30},${start2y + 15} ${end2x + 30},${end2y - 15} ${end2x},${end2y}`);
        setArrow2Chevron(`M ${end2x - 8},${end2y - 10} L ${end2x},${end2y} L ${end2x + 8},${end2y - 10}`);
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

      let targetCardIndex: 1 | 2 | 3 = 1;
      if (progress >= 0.33 && progress < 0.66) {
        targetCardIndex = 2;
      } else if (progress >= 0.66) {
        targetCardIndex = 3;
      }

      // Compute mascot position from DOM refs — safe here inside effect/event handler
      const newX = targetCardIndex === 1
        ? card1.offsetLeft + 32
        : targetCardIndex === 2
          ? card2.offsetLeft + card2.offsetWidth - 182
          : card3.offsetLeft + 32;
      const newY = targetCardIndex === 1
        ? card1.offsetTop - 105
        : targetCardIndex === 2
          ? card2.offsetTop - 105
          : card3.offsetTop - 105;

      setMascotX(newX);
      setMascotY(newY);

      if (targetCardIndex !== activeCardIndexRef.current) {
        activeCardIndexRef.current = targetCardIndex;
        setIsTeleporting(true);
        setTimeout(() => {
          setActiveCardIndex(targetCardIndex);
          setIsTeleporting(false);
        }, 120);
      }

      const inView = rect.top < viewportHeight && rect.bottom > 0;
      setIsMascotInView(inView);
    };

    window.addEventListener('scroll', updateMascotPosition);
    window.addEventListener('resize', updateMascotPosition);
    setTimeout(updateMascotPosition, 100);

    return () => {
      window.removeEventListener('scroll', updateMascotPosition);
      window.removeEventListener('resize', updateMascotPosition);
    };
  }, []);

  const mascotSrc = activeCardIndex === 2 ? nexieSittingPurple : nexieSittingClassic;
  const mascotFilter =
    activeCardIndex === 2
      ? 'drop-shadow(0 15px 30px rgba(123, 75, 139, 0.5))'
      : 'drop-shadow(0 15px 30px rgba(0, 242, 255, 0.3))';

  const mascotOpacity = isMascotInView && !isTeleporting ? 1 : 0;

  return {
    roadmapRef,
    card1Ref,
    card2Ref,
    card3Ref,
    mascotSrc,
    mascotFilter,
    mascotX,
    mascotY,
    mascotOpacity,
    arrowsVisible,
    arrow1Path,
    arrow1Chevron,
    arrow2Path,
    arrow2Chevron,
    activeCardIndex,
  };
};
