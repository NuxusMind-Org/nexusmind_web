import { useEffect, useRef, useState, type RefObject } from 'react';
import { useIsFetching } from '@tanstack/react-query';

export interface UsePageAssetsReadyOptions {
  /** Maximum time (ms) to hold the skeleton before force-revealing the page. */
  maxWaitMs?: number;
  /** Quiet period (ms) after queries & images settle to catch newly committed DOM nodes. */
  settleQuietMs?: number;
  /** Minimum display time (ms) when assets were not already cached in memory. */
  minSkeletonMs?: number;
  /** Viewport multiplier within which images are considered critical for initial reveal. */
  viewportMultiplier?: number;
}

function isElementRendered(el: HTMLElement): boolean {
  if (!el.isConnected) return false;
  // Fast check for display:none ancestors (e.g. `hidden md:block` on mobile)
  if (el.offsetParent === null) {
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') {
      return false;
    }
    // Fixed/body elements have offsetParent === null when visible; verify non-zero box
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      return false;
    }
  }
  return true;
}

function isCriticalImage(img: HTMLImageElement, viewportLimitPx: number): boolean {
  const srcAttr = img.getAttribute('src');
  if (!img.currentSrc && (!srcAttr || srcAttr.trim() === '')) {
    return false;
  }
  if (img.dataset.ignoreGate === 'true') {
    return false;
  }
  if (!isElementRendered(img)) {
    return false;
  }
  if (img.dataset.criticalImage === 'true' || img.loading !== 'lazy') {
    return true;
  }
  const rect = img.getBoundingClientRect();
  return rect.top < viewportLimitPx && rect.bottom > -200;
}

/**
 * Tracks route-level readiness across:
 * 1. Active TanStack Query fetches & in-page `[aria-busy="true"]` / `[data-route-loading="true"]` regions
 * 2. Visible custom canvas/WebGL surfaces reporting `data-asset-ready="false"` (e.g. CircularGallery)
 * 3. Eager and near-viewport `<img>` elements (including asynchronous GPU `img.decode()`)
 *
 * Uses derived state (`readyPathname === pathname`) so `isReady` flips to `false` synchronously
 * on the exact render where `pathname` changes, with zero synchronous setState inside effects.
 */
export function usePageAssetsReady(
  containerRef: RefObject<HTMLElement | null>,
  pathname: string,
  options: UsePageAssetsReadyOptions = {}
): boolean {
  const {
    maxWaitMs = 7000,
    settleQuietMs = 90,
    minSkeletonMs = 180,
    viewportMultiplier = 1.5,
  } = options;

  const activeFetches = useIsFetching();
  const activeFetchesRef = useRef(activeFetches);
  const checkTriggerRef = useRef<(() => void) | null>(null);

  const [readyPathname, setReadyPathname] = useState<string | null>(null);

  useEffect(() => {
    activeFetchesRef.current = activeFetches;
    if (activeFetches === 0) {
      checkTriggerRef.current?.();
    }
  }, [activeFetches]);

  useEffect(() => {
    let cancelled = false;
    const startedAt = performance.now();
    let hadAsyncWork = activeFetchesRef.current > 0;

    const decodedImages = new WeakSet<HTMLImageElement>();
    const decodingImages = new WeakSet<HTMLImageElement>();
    const listenedImages = new WeakSet<HTMLImageElement>();
    const cleanupListeners: Array<() => void> = [];

    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    let minFloorTimer: ReturnType<typeof setTimeout> | undefined;

    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      if (settleTimer) clearTimeout(settleTimer);
      if (minFloorTimer) clearTimeout(minFloorTimer);
      setReadyPathname(pathname);
    };

    const maxWaitTimer = setTimeout(finish, maxWaitMs);

    const evaluate = () => {
      if (cancelled) return;
      if (settleTimer) {
        clearTimeout(settleTimer);
        settleTimer = undefined;
      }

      const root = containerRef.current;
      if (!root) return;

      // 1. Wait while TanStack Query has active requests
      if (activeFetchesRef.current > 0) {
        hadAsyncWork = true;
        return;
      }

      // 2. Wait while page-level loading markers or inline skeletons are still mounted
      const busyRegion = root.querySelector('[data-route-loading="true"], [aria-busy="true"]');
      if (busyRegion) {
        hadAsyncWork = true;
        return;
      }

      const viewportLimitPx = (window.innerHeight || 900) * viewportMultiplier;

      // 3. Wait for visible custom canvas/WebGL surfaces (such as CircularGallery)
      const pendingSurfaces = root.querySelectorAll<HTMLElement>('[data-asset-ready="false"]');
      for (const surface of pendingSurfaces) {
        if (isElementRendered(surface)) {
          const rect = surface.getBoundingClientRect();
          if (rect.top < viewportLimitPx) {
            hadAsyncWork = true;
            return;
          }
        }
      }

      // 4. Inspect all critical/near-viewport <img> elements and ensure download + GPU decode
      const images = root.querySelectorAll<HTMLImageElement>('img');
      let pendingImageCount = 0;

      for (const img of images) {
        if (!isCriticalImage(img, viewportLimitPx)) {
          continue;
        }

        if (!img.complete) {
          hadAsyncWork = true;
          pendingImageCount++;
          if (!listenedImages.has(img)) {
            listenedImages.add(img);
            const onSettled = () => {
              img.removeEventListener('load', onSettled);
              img.removeEventListener('error', onSettled);
              scheduleEvaluate();
            };
            img.addEventListener('load', onSettled, { once: true });
            img.addEventListener('error', onSettled, { once: true });
            cleanupListeners.push(() => {
              img.removeEventListener('load', onSettled);
              img.removeEventListener('error', onSettled);
            });
          }
          continue;
        }

        // Image finished network load; decode bitmap before first visible paint if valid
        if (img.naturalWidth > 0 && !decodedImages.has(img)) {
          if (typeof img.decode === 'function') {
            pendingImageCount++;
            if (!decodingImages.has(img)) {
              decodingImages.add(img);
              img
                .decode()
                .catch(() => {
                  // Ignore decode errors on SVG/corrupt frames; still treat as settled
                })
                .finally(() => {
                  decodedImages.add(img);
                  scheduleEvaluate();
                });
            }
          } else {
            decodedImages.add(img);
          }
        } else {
          decodedImages.add(img);
        }
      }

      if (pendingImageCount > 0) {
        return;
      }

      // 5. All queries, surfaces, and critical images are ready — wait a short quiet window
      // so any React render queued right after an API resolution can commit new <img> nodes.
      settleTimer = setTimeout(() => {
        if (cancelled) return;
        const elapsed = performance.now() - startedAt;
        if (hadAsyncWork && elapsed < minSkeletonMs) {
          minFloorTimer = setTimeout(finish, minSkeletonMs - elapsed);
        } else {
          finish();
        }
      }, settleQuietMs);
    };

    function scheduleEvaluate() {
      if (cancelled) return;
      if (settleTimer) {
        clearTimeout(settleTimer);
        settleTimer = undefined;
      }
      requestAnimationFrame(evaluate);
    }

    checkTriggerRef.current = scheduleEvaluate;

    const root = containerRef.current;
    const observer = new MutationObserver(() => {
      scheduleEvaluate();
    });

    if (root) {
      observer.observe(root, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'srcset', 'aria-busy', 'data-route-loading', 'data-asset-ready'],
      });
    }

    scheduleEvaluate();

    return () => {
      cancelled = true;
      checkTriggerRef.current = null;
      clearTimeout(maxWaitTimer);
      if (settleTimer) clearTimeout(settleTimer);
      if (minFloorTimer) clearTimeout(minFloorTimer);
      observer.disconnect();
      for (const off of cleanupListeners) {
        off();
      }
    };
  }, [containerRef, pathname, maxWaitMs, settleQuietMs, minSkeletonMs, viewportMultiplier]);

  return readyPathname === pathname;
}
