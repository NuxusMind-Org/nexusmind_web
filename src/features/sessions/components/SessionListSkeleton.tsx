import { Skeleton, SkeletonGroup } from '@/components/skeleton';

/** Placeholder for the "upcoming sessions" list cards. */
export const SessionListSkeleton = ({ count = 2 }: { count?: number }) => (
  <SkeletonGroup className="flex flex-col gap-5 w-full">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="w-full bg-white/10 border border-white/15 rounded-3xl p-5 sm:p-6 lg:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4 sm:gap-5">
          <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 !rounded-2xl shrink-0" />
          <div className="flex flex-col gap-2.5">
            <Skeleton className="h-5 w-20 !rounded-full" />
            <Skeleton className="h-5 w-44" />
            <Skeleton variant="text" className="w-28" />
          </div>
        </div>
        <div className="flex gap-6">
          <Skeleton variant="text" className="w-28" />
          <Skeleton variant="text" className="w-16" />
        </div>
        <Skeleton className="h-11 w-full lg:w-40 !rounded-2xl" />
      </div>
    ))}
  </SkeletonGroup>
);
