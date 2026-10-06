import { Skeleton, SkeletonGroup } from '@/components/skeleton';

/** Mirrors the journal "past notes" timeline entries. */
export const JournalHistorySkeleton = ({ count = 3 }: { count?: number }) => (
  <SkeletonGroup className="flex flex-col gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="relative pl-5 border-l border-white/15 flex flex-col gap-2">
        <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-white/20" />
        <Skeleton variant="text" className="w-24 !h-2.5" />
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-3/4" />
      </div>
    ))}
  </SkeletonGroup>
);
