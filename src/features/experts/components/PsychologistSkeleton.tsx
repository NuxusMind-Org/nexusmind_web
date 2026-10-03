import React from 'react';

export const PsychologistSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-full animate-fade-in" aria-busy="true" aria-label="Loading expert details">
      {/* Left Column */}
      <div className="flex-1 flex flex-col gap-6 w-full">

        {/* Profile Card Skeleton */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col sm:flex-row gap-6 sm:gap-8 relative items-center sm:items-start text-center sm:text-left">
          {/* Avatar Skeleton */}
          <div className="relative shrink-0">
            <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] rounded-full bg-white/15 border-4 border-white/20 shadow-lg mx-auto animate-pulse" />
            <div className="absolute -bottom-2 right-1 sm:right-2 w-14 h-5 rounded-full bg-[#03C6B2]/40 border border-[#03C6B2]/30 animate-pulse" />
          </div>

          {/* Doctor Details Skeleton */}
          <div className="flex flex-col flex-1 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-3 gap-3 sm:gap-0">
              <div className="flex flex-col items-center sm:items-start gap-2 w-full sm:w-auto">
                <div className="h-7 sm:h-9 w-48 sm:w-60 bg-white/20 rounded-md animate-pulse" />
                <div className="h-4 w-36 sm:w-44 bg-white/10 rounded-md animate-pulse" />
              </div>
              <div className="h-7 sm:h-8 w-24 bg-[#03C6B2]/20 rounded-md animate-pulse self-center sm:self-start" />
            </div>

            {/* Description lines */}
            <div className="flex flex-col gap-2 mt-3 mb-6 w-full">
              <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
              <div className="h-4 w-[90%] bg-white/10 rounded animate-pulse" />
              <div className="h-4 w-[75%] bg-white/10 rounded animate-pulse" />
            </div>

            {/* Languages tags */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start mt-auto">
              <div className="h-7 w-20 rounded-full bg-[#03C6B2]/10 border border-[#03C6B2]/20 animate-pulse" />
              <div className="h-7 w-24 rounded-full bg-[#03C6B2]/10 border border-[#03C6B2]/20 animate-pulse" />
              <div className="h-7 w-18 rounded-full bg-[#03C6B2]/10 border border-[#03C6B2]/20 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Education and Fəaliyyət istiqamətləri */}
        <div className="flex flex-col md:flex-row gap-6">

          {/* Education Skeleton */}
          <div className="flex-1 bg-white/10 backdrop-blur-md rounded-lg p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col">
            <div className="h-5 w-28 bg-white/20 rounded-md mb-6 animate-pulse" />
            <div className="flex flex-col gap-5">
              <div className="border-l-2 border-white/20 pl-4 flex flex-col gap-2">
                <div className="h-4 w-40 bg-white/15 rounded animate-pulse" />
                <div className="h-3.5 w-28 bg-white/10 rounded animate-pulse" />
              </div>
              <div className="border-l-2 border-white/20 pl-4 flex flex-col gap-2">
                <div className="h-4 w-44 bg-white/15 rounded animate-pulse" />
                <div className="h-3.5 w-32 bg-white/10 rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Fəaliyyət istiqamətləri Skeleton */}
          <div className="flex-1 bg-white/10 backdrop-blur-md rounded-lg p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col">
            <div className="h-5 w-44 bg-white/20 rounded-md mb-6 animate-pulse" />
            <div className="flex flex-wrap gap-3">
              <div className="h-8 w-24 rounded-lg bg-white/10 border border-white/10 animate-pulse" />
              <div className="h-8 w-32 rounded-lg bg-white/10 border border-white/10 animate-pulse" />
              <div className="h-8 w-28 rounded-lg bg-white/10 border border-white/10 animate-pulse" />
              <div className="h-8 w-36 rounded-lg bg-white/10 border border-white/10 animate-pulse" />
            </div>
          </div>

        </div>

        {/* Terapiya metodları Skeleton */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col">
          <div className="h-5 w-40 bg-white/20 rounded-md mb-6 animate-pulse" />
          <div className="flex flex-wrap gap-3">
            <div className="h-8 w-28 rounded-lg bg-white/10 border border-white/10 animate-pulse" />
            <div className="h-8 w-36 rounded-lg bg-white/10 border border-white/10 animate-pulse" />
            <div className="h-8 w-32 rounded-lg bg-white/10 border border-white/10 animate-pulse" />
            <div className="h-8 w-24 rounded-lg bg-white/10 border border-white/10 animate-pulse" />
            <div className="h-8 w-40 rounded-lg bg-white/10 border border-white/10 animate-pulse" />
          </div>
        </div>

        {/* Trainings and Certificates Skeleton */}
        <div className="flex flex-col gap-6">

          {/* İştirak Etdiyi Təlimlər */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col">
            <div className="h-5 w-48 bg-white/20 rounded-md mb-6 animate-pulse" />
            <div className="flex flex-col gap-3 mb-4">
              <div className="h-11 rounded-lg bg-white/5 border border-white/5 px-4 flex items-center gap-3 animate-pulse">
                <div className="w-4 h-4 rounded-full bg-[#00f2ff]/30 shrink-0" />
                <div className="h-3.5 w-52 bg-white/15 rounded" />
              </div>
              <div className="h-11 rounded-lg bg-white/5 border border-white/5 px-4 flex items-center gap-3 animate-pulse">
                <div className="w-4 h-4 rounded-full bg-[#00f2ff]/30 shrink-0" />
                <div className="h-3.5 w-60 bg-white/15 rounded" />
              </div>
              <div className="h-11 rounded-lg bg-white/5 border border-white/5 px-4 flex items-center gap-3 animate-pulse">
                <div className="w-4 h-4 rounded-full bg-[#00f2ff]/30 shrink-0" />
                <div className="h-3.5 w-44 bg-white/15 rounded" />
              </div>
            </div>
            <div className="h-9 w-28 bg-[#51237a]/50 rounded-lg self-end mt-auto animate-pulse" />
          </div>

          {/* Sertifikatlar */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col">
            <div className="h-5 w-40 bg-white/20 rounded-md mb-6 animate-pulse" />
            <div className="flex flex-col gap-3 mb-4">
              <div className="h-11 rounded-lg bg-white/5 border border-white/5 px-4 flex items-center gap-3 animate-pulse">
                <div className="w-4 h-4 rounded-full bg-[#c084fc]/30 shrink-0" />
                <div className="h-3.5 w-56 bg-white/15 rounded" />
              </div>
              <div className="h-11 rounded-lg bg-white/5 border border-white/5 px-4 flex items-center gap-3 animate-pulse">
                <div className="w-4 h-4 rounded-full bg-[#c084fc]/30 shrink-0" />
                <div className="h-3.5 w-48 bg-white/15 rounded" />
              </div>
            </div>
            <div className="h-9 w-28 bg-[#51237a]/50 rounded-lg self-end mt-auto animate-pulse" />
          </div>

        </div>

      </div>

      {/* Right Column Sticky Skeleton */}
      <div className="w-full lg:w-[350px] xl:w-[400px] flex flex-col gap-6 sticky top-28">

        {/* Booking Box Skeleton */}
        <div className="bg-[#2D3E50]/60 backdrop-blur-xl rounded-lg p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col">
          <div className="h-6 w-44 bg-white/20 rounded-md mb-6 animate-pulse" />

          {/* Next Available Box */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6 relative overflow-hidden flex flex-col gap-2">
            <div className="h-3.5 w-28 bg-white/10 rounded animate-pulse" />
            <div className="h-5 w-44 bg-white/20 rounded animate-pulse" />
          </div>

          {/* Bullet points */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-white/15 shrink-0 animate-pulse" />
              <div className="h-3.5 w-36 bg-white/15 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-white/15 shrink-0 animate-pulse" />
              <div className="h-3.5 w-32 bg-white/15 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-white/15 shrink-0 animate-pulse" />
              <div className="h-3.5 w-40 bg-white/15 rounded animate-pulse" />
            </div>
          </div>

          {/* Book Session CTA */}
          <div className="w-full h-14 bg-[#c084fc]/35 rounded-lg animate-pulse" />
        </div>

        {/* VR Box Skeleton */}
        <div className="w-full h-[180px] rounded-lg overflow-hidden relative bg-white/5 border border-white/10 shadow-xl p-4 flex flex-col justify-end">
          <div className="bg-[#eeb3b3]/20 backdrop-blur-xl border border-white/20 rounded-lg p-4 flex flex-col gap-2">
            <div className="h-4 w-36 bg-white/30 rounded animate-pulse" />
            <div className="h-3 w-full bg-white/20 rounded animate-pulse" />
          </div>
        </div>

      </div>
    </div>
  );
};
