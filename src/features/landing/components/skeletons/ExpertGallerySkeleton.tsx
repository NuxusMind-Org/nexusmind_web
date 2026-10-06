import { Skeleton, SkeletonGroup } from '@/components/skeleton';

/** Placeholder for the circular experts gallery: a row of portrait cards with captions. */
export const ExpertGallerySkeleton = () => (
  <SkeletonGroup className="w-full h-full flex items-center justify-center gap-5 sm:gap-8 overflow-hidden px-4">
    {[0.55, 0.8, 1, 0.8, 0.55].map((scale, i) => {
      const translateY = i === 2 ? 'translate-y-7 sm:translate-y-9' : i === 1 || i === 3 ? 'translate-y-3 sm:translate-y-4' : 'translate-y-0';
      return (
        <div
          key={i}
          className={`flex flex-col items-center gap-4 shrink-0 transition-transform ${translateY} ${
            i === 0 || i === 4 ? 'hidden md:flex' : ''
          } ${i === 1 || i === 3 ? 'hidden sm:flex' : ''}`}
          style={{ opacity: 0.45 + scale * 0.55 }}
        >
          <Skeleton
            tone="light"
            className="!rounded-[24px]"
            style={{ width: 260 * scale, height: 360 * scale }}
          />
          <Skeleton tone="light" variant="text" style={{ width: 150 * scale }} />
        </div>
      );
    })}
  </SkeletonGroup>
);
