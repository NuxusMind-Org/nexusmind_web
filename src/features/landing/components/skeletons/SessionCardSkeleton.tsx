import { Skeleton, SkeletonGroup } from '@/components/skeleton';

interface Props {
  tone?: 'light' | 'dark';
}

/** Mirrors the "next session" card (doctor avatar, details, action button). */
export const SessionCardSkeleton = ({ tone = 'light' }: Props) => {
  const isLight = tone === 'light';
  const wrapper = isLight
    ? 'bg-white border border-[#ECEEF5] rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 md:p-10'
    : 'bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-5 sm:p-7';

  return (
    <SkeletonGroup
      className={`w-full flex flex-col lg:flex-row items-center justify-between gap-6 ${wrapper}`}
    >
      <div className="flex items-center gap-4 sm:gap-6 w-full lg:w-auto">
        <Skeleton tone={tone} className="w-16 h-16 sm:w-20 sm:h-20 !rounded-2xl shrink-0" />
        <div className="flex flex-col gap-2.5">
          <Skeleton tone={tone} className="h-5 w-20 !rounded-full" />
          <Skeleton tone={tone} className="h-5 w-44" />
          <Skeleton tone={tone} variant="text" className="w-28" />
        </div>
      </div>
      <div className="flex flex-col gap-2.5 w-full lg:w-auto lg:items-center">
        <Skeleton tone={tone} variant="text" className="w-40" />
        <Skeleton tone={tone} variant="text" className="w-28" />
      </div>
      <Skeleton tone={tone} className="h-12 w-full lg:w-44 !rounded-xl" />
    </SkeletonGroup>
  );
};
