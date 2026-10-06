import { Skeleton, SkeletonGroup } from '@/components/skeleton';

/** Layout-accurate skeleton for Blog / News / Article detail pages. */
export const DetailPageSkeleton = () => (
  <SkeletonGroup className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[40px] sm:pt-[60px] pb-[80px] flex flex-col items-center gap-8">
    {/* Header + breadcrumbs */}
    <div className="w-full max-w-[1295px] flex flex-col gap-4">
      <Skeleton className="h-10 sm:h-12 w-48" />
      <div className="flex items-center gap-3">
        <Skeleton variant="text" className="w-20" />
        <Skeleton variant="text" className="w-16" />
        <Skeleton variant="text" className="w-40" />
      </div>
    </div>

    {/* Hero banner */}
    <div className="w-full max-w-[1295px] h-[380px] sm:h-[480px] lg:h-[614px] rounded-[24px] overflow-hidden relative flex flex-col justify-end p-6 sm:p-10 lg:p-12 border border-white/10 bg-white/[0.04]">
      <Skeleton className="absolute inset-0 !rounded-none" />
      <div className="relative flex flex-col gap-4 max-w-[1000px]">
        <div className="flex gap-4">
          <Skeleton className="h-7 w-24 !rounded-full" />
          <Skeleton variant="text" className="w-28 self-center" />
          <Skeleton variant="text" className="w-20 self-center" />
        </div>
        <Skeleton className="h-12 sm:h-14 w-full max-w-[640px]" />
      </div>
    </div>

    {/* Body + sidebar */}
    <div className="w-full max-w-[1295px] flex flex-col lg:flex-row gap-10 mt-6 items-start justify-between">
      <div className="w-full lg:w-[68%] flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Skeleton variant="text" className="w-full" />
          <Skeleton variant="text" className="w-full" />
          <Skeleton variant="text" className="w-4/5" />
        </div>
        <Skeleton className="h-8 w-3/5 mt-2" />
        <div className="flex flex-col gap-3">
          {[100, 100, 95, 100, 70].map((w, i) => (
            <Skeleton key={i} variant="text" style={{ width: `${w}%` }} />
          ))}
        </div>
        <Skeleton className="w-full h-[280px] sm:h-[360px] !rounded-[18px] my-2" />
        <Skeleton className="h-8 w-1/2" />
        <div className="flex flex-col gap-3">
          {[100, 100, 90, 60].map((w, i) => (
            <Skeleton key={i} variant="text" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>

      <div className="w-full lg:w-[32%] flex flex-col gap-6 shrink-0">
        <Skeleton className="h-[170px] !rounded-[20px]" />
        <Skeleton className="h-[230px] !rounded-[20px]" />
        <Skeleton className="h-[170px] !rounded-[20px]" />
      </div>
    </div>
  </SkeletonGroup>
);
