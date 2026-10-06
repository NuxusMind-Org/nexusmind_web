import { Skeleton, SkeletonGroup } from '@/components/skeleton';

/** Single expert card placeholder matching ExpertCard's 350x470 layout. */
export const ExpertCardSkeleton = () => (
  <div
    aria-hidden="true"
    className="w-full aspect-[350/470] rounded-[24px] overflow-hidden bg-[#1A2836] border border-white/10 p-5 flex flex-col justify-between relative"
  >
    <div className="flex items-center justify-between w-full">
      <Skeleton className="h-6 w-16 !rounded-full" />
      <Skeleton className="h-6 w-12 !rounded-full" />
    </div>
    <div className="flex flex-col items-center gap-2.5 w-full mt-auto">
      <Skeleton className="h-6 w-3/4 !rounded-lg" />
      <Skeleton variant="text" className="w-1/2 !h-4" />
      <Skeleton variant="text" className="w-1/3 !h-4" />
      <Skeleton className="w-full h-9 mt-2" />
    </div>
  </div>
);

/** Responsive grid of expert card placeholders. */
export const ExpertCardGridSkeleton = ({ count = 8 }: { count?: number }) => (
  <SkeletonGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ExpertCardSkeleton key={i} />
    ))}
  </SkeletonGroup>
);
