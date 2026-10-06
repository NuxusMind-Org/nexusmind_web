import { useTranslation } from 'react-i18next';
import { Skeleton, SkeletonGroup } from '@/components/skeleton';

/** Call-room skeleton shown while the join token is fetched. */
export const SessionCallSkeleton = () => {
  const { t } = useTranslation();

  return (
    <SkeletonGroup
      label={t('webapp.sessionCall.connecting', 'Seansa qoşulur...')}
      className="w-full h-screen bg-[#0D0618] flex flex-col p-3 sm:p-5 gap-4 animate-fade-in"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-9 h-9 !rounded-full" />
          <Skeleton variant="text" className="w-36" />
        </div>
        <Skeleton className="h-8 w-20 !rounded-full" />
      </div>

      {/* Video stage */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1 min-h-0">
          <Skeleton className="absolute inset-0 !rounded-3xl" />
          <Skeleton className="absolute bottom-4 right-4 w-28 h-20 sm:w-44 sm:h-28 !rounded-2xl" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <Skeleton className="w-6 h-6 !rounded-full" />
            <Skeleton variant="text" className="w-24" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 pb-2">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} variant="circle" className="w-12 h-12 sm:w-14 sm:h-14" />
        ))}
        <Skeleton className="w-14 h-12 sm:w-16 sm:h-14 !rounded-full" />
      </div>
    </SkeletonGroup>
  );
};
