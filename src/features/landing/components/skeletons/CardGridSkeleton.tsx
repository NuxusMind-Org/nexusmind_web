import { Skeleton, SkeletonGroup } from '@/components/skeleton';

interface CardGridSkeletonProps {
  count?: number;
  /** Image aspect ratio class, e.g. `aspect-[16/10]`. */
  imageAspect?: string;
  /** Show body (title, description, footer) under the image. */
  withBody?: boolean;
  className?: string;
}

/** Generic image-card grid used by Articles, News, Blog, Gallery and Trainings lists. */
export const CardGridSkeleton = ({
  count = 6,
  imageAspect = 'aspect-[16/10]',
  withBody = true,
  className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
}: CardGridSkeletonProps) => (
  <SkeletonGroup className={className}>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="rounded-[18px] overflow-hidden border border-white/10 bg-white/[0.04] flex flex-col"
      >
        <Skeleton className={`w-full ${imageAspect} !rounded-none`} />
        {withBody && (
          <div className="p-5 flex flex-col gap-3">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton variant="text" className="w-full" />
            <Skeleton variant="text" className="w-2/3" />
            <div className="flex justify-between pt-3 border-t border-white/10">
              <Skeleton variant="text" className="w-20" />
              <Skeleton variant="text" className="w-24" />
            </div>
          </div>
        )}
      </div>
    ))}
  </SkeletonGroup>
);
