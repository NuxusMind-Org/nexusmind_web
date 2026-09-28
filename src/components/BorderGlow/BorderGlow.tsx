import { useCallback, useRef, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import './BorderGlow.css';

export interface BorderGlowProps {
  children: ReactNode;
  className?: string;
  colors?: [string, string];
  glowRadius?: number;
  borderWidth?: number;
  fillOpacity?: number;
  rounded?: string;
}

export const BorderGlow = ({
  children,
  className = '',
  colors = ['rgba(0, 242, 255, 0.95)', 'rgba(192, 132, 252, 0.55)'],
  glowRadius = 140,
  borderWidth = 1.5,
  fillOpacity = 0,
  rounded = '24px',
}: BorderGlowProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    el.style.setProperty('--glow-x', `${e.clientX - box.left}px`);
    el.style.setProperty('--glow-y', `${e.clientY - box.top}px`);
  }, []);

  const style = {
    '--glow-color-a': colors[0],
    '--glow-color-b': colors[1],
    '--glow-radius': `${glowRadius}px`,
    '--border-w': `${borderWidth}px`,
    '--rounded': rounded,
    '--fill-opacity': fillOpacity,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={`border-glow ${className}`}
      style={style}
      onMouseMove={onMove}
    >
      {children}
    </div>
  );
};
