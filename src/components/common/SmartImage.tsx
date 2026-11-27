import { useCallback, useRef, useState, type ImgHTMLAttributes, type SyntheticEvent } from 'react';
import { Skeleton, type SkeletonTone } from '@/components/skeleton';

export interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Optional fallback image URL if the primary `src` fails to load. */
  fallbackSrc?: string;
  /** Tone for the underlying shimmer placeholder ('dark' by default). */
  skeletonTone?: SkeletonTone;
  /** Additional classes applied to the skeleton shimmer overlay. */
  skeletonClassName?: string;
  /** Wrapper container classes when `wrapperClassName` is needed; if omitted, renders fragment-free overlay inside positioned parent or inline wrapper. */
  wrapperClassName?: string;
  /** Mark as critical for the route-level loading gate. */
  critical?: boolean;
}

/**
 * Progressive image component that displays a smooth `<Skeleton />` shimmer until
 * the image has both downloaded AND completed GPU bitmap decoding (`img.decode()`),
 * eliminating half-painted progressive scans and broken-image flashes on slow networks.
 */
export const SmartImage = ({
  src,
  fallbackSrc,
  alt = '',
  className = '',
  skeletonTone = 'dark',
  skeletonClassName = '',
  wrapperClassName,
  critical,
  onLoad,
  onError,
  decoding = 'async',
  ...rest
}: SmartImageProps) => {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const decodingSrcRef = useRef<string | null>(null);

  const effectiveSrc = failedSrc === src && fallbackSrc ? fallbackSrc : src;
  const isLoaded = Boolean(effectiveSrc && loadedSrc === effectiveSrc);

  const markDecoded = useCallback((img: HTMLImageElement, targetSrc: string) => {
    if (decodingSrcRef.current === targetSrc) return;
    decodingSrcRef.current = targetSrc;

    if (typeof img.decode === 'function') {
      img
        .decode()
        .catch(() => {})
        .finally(() => {
          setLoadedSrc(targetSrc);
        });
    } else {
      Promise.resolve().then(() => setLoadedSrc(targetSrc));
    }
  }, []);

  const handleImgRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (!node || !effectiveSrc) return;
      if (node.complete && node.naturalWidth > 0 && loadedSrc !== effectiveSrc) {
        markDecoded(node, effectiveSrc);
      }
    },
    [effectiveSrc, loadedSrc, markDecoded]
  );

  const handleLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    if (effectiveSrc) {
      markDecoded(e.currentTarget, effectiveSrc);
    }
    onLoad?.(e);
  };

  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    if (src && failedSrc !== src && fallbackSrc && effectiveSrc !== fallbackSrc) {
      decodingSrcRef.current = null;
      setFailedSrc(src);
    } else if (effectiveSrc) {
      // Settle even on error so we don't leave an infinite shimmer over alt text
      setLoadedSrc(effectiveSrc);
    }
    onError?.(e);
  };

  const imgElement = (
    <>
      {!isLoaded && (
        <Skeleton
          tone={skeletonTone}
          className={`absolute inset-0 w-full h-full !rounded-none pointer-events-none z-[1] ${skeletonClassName}`}
        />
      )}
      <img
        ref={handleImgRef}
        src={effectiveSrc}
        alt={alt}
        decoding={decoding}
        data-critical-image={critical ? 'true' : undefined}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...rest}
      />
    </>
  );

  if (wrapperClassName !== undefined) {
    return <div className={`relative overflow-hidden ${wrapperClassName}`}>{imgElement}</div>;
  }

  return imgElement;
};
