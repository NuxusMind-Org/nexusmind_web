import type { CSSProperties, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export type SkeletonTone = 'dark' | 'light';
export type SkeletonVariant = 'rect' | 'text' | 'circle';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  tone?: SkeletonTone;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: CSSProperties;
}

/** Base shimmer block. Purely decorative, hidden from assistive tech. */
export const Skeleton = ({
  variant = 'rect',
  tone = 'dark',
  width,
  height,
  className = '',
  style,
}: SkeletonProps) => {
  const radius =
    variant === 'circle' ? 'rounded-full' : variant === 'text' ? 'rounded-md' : 'rounded-xl';
  const defaultHeight = variant === 'text' ? '0.875rem' : undefined;

  return (
    <div
      aria-hidden="true"
      className={`skeleton-shimmer skeleton-${tone} ${radius} ${className}`}
      style={{ width, height: height ?? defaultHeight, ...style }}
    />
  );
};

export interface SkeletonGroupProps {
  children: ReactNode;
  className?: string;
  label?: string;
}

/** Accessible wrapper announcing a busy region to screen readers. */
export const SkeletonGroup = ({ children, className = '', label }: SkeletonGroupProps) => {
  const { t } = useTranslation();
  return (
    <div role="status" aria-busy="true" aria-live="polite" className={className}>
      <span className="sr-only">{label ?? t('common.loading', 'Yüklənir...')}</span>
      {children}
    </div>
  );
};
