import { useRef, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePageAssetsReady } from '@/hooks/usePageAssetsReady';
import { RouteSkeletonForPath } from './RoutePageSkeletons';

export interface RouteLoadingGateProps {
  children: ReactNode;
}

/**
 * Keeps the active route mounted underneath so data queries and image downloads start
 * immediately at `t = 0ms`, while holding a layout-matched skeleton screen on top until
 * queries and critical/viewport images have finished downloading and GPU-decoding.
 */
export const RouteLoadingGate = ({ children }: RouteLoadingGateProps) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);

  // Live video call rooms manage their own WebRTC connection UI directly
  const bypassGate = pathname.endsWith('/call');
  const assetsReady = usePageAssetsReady(contentRef, pathname);
  const isReady = bypassGate || assetsReady;

  return (
    <>
      <div
        ref={contentRef}
        aria-hidden={!isReady ? 'true' : undefined}
        className="w-full min-h-screen"
      >
        {children}
      </div>

      {!bypassGate && (
        <div
          role={!isReady ? 'status' : undefined}
          aria-live={!isReady ? 'polite' : undefined}
          aria-busy={!isReady ? 'true' : undefined}
          aria-hidden={isReady ? 'true' : undefined}
          className={`fixed inset-0 z-[60] overflow-hidden overscroll-contain transition-opacity duration-250 ease-out motion-reduce:transition-none ${
            isReady ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
          }`}
        >
          {!isReady && (
            <span className="visually-hidden">{t('common.loading', 'Yüklənir...')}</span>
          )}
          <RouteSkeletonForPath pathname={pathname} />
        </div>
      )}
    </>
  );
};
