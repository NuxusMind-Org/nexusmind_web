import { Skeleton } from './Skeleton';
import { DetailPageSkeleton } from '@/features/landing/components/skeletons/DetailPageSkeleton';
import { CardGridSkeleton } from '@/features/landing/components/skeletons/CardGridSkeleton';
import { ExpertGallerySkeleton } from '@/features/landing/components/skeletons/ExpertGallerySkeleton';
import { ExpertCardGridSkeleton } from '@/features/experts/components/ExpertCardSkeleton';
import { PsychologistSkeleton } from '@/features/experts/components/PsychologistSkeleton';

const NavbarBarSkeleton = () => (
  <div
    aria-hidden="true"
    className="w-full h-[72px] sm:h-[80px] md:h-[88px] px-4 sm:px-8 md:px-[72px] flex items-center justify-between shrink-0"
  >
    <Skeleton className="h-10 sm:h-12 w-36 sm:w-44 !rounded-lg" />
    <div className="hidden md:flex items-center gap-7">
      <Skeleton variant="text" className="w-20 !h-4" />
      <Skeleton variant="text" className="w-16 !h-4" />
      <Skeleton variant="text" className="w-24 !h-4" />
      <Skeleton variant="text" className="w-20 !h-4" />
      <Skeleton variant="text" className="w-24 !h-4" />
    </div>
    <div className="flex items-center gap-3">
      <Skeleton variant="circle" className="w-9 h-9" />
      <Skeleton className="hidden md:block h-10 w-36 !rounded-full" />
      <Skeleton className="md:hidden h-9 w-9 !rounded-lg" />
    </div>
  </div>
);

const HomeRouteSkeleton = () => (
  <div className="w-full min-h-screen flex flex-col bg-white overflow-hidden">
    <div className="relative w-full bg-landing-gradient flex flex-col">
      <NavbarBarSkeleton />

      <div className="w-full min-h-[calc(100vh-190px)] flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-[80px] py-10 sm:py-16 gap-8">
        {/* Hero Left Copy & CTAs */}
        <div className="flex flex-col items-start gap-6 w-full max-w-[680px]">
          <div className="flex flex-col gap-3 w-full">
            <Skeleton className="h-10 sm:h-14 md:h-16 w-[92%] !rounded-2xl" />
            <Skeleton className="h-10 sm:h-14 md:h-16 w-[72%] !rounded-2xl" />
          </div>
          <div className="flex flex-col gap-2.5 w-full max-w-[540px] mt-1">
            <Skeleton variant="text" className="w-full !h-5" />
            <Skeleton variant="text" className="w-4/5 !h-5" />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2 w-[62%] sm:w-auto">
            <Skeleton className="h-[52px] w-full sm:w-[200px] !rounded-full" />
            <Skeleton className="h-[52px] w-full sm:w-[200px] !rounded-full" />
          </div>
        </div>

        {/* Hero Right Mascot Silhouette */}
        <div className="hidden sm:flex items-end justify-center shrink-0">
          <Skeleton className="w-[260px] md:w-[340px] lg:w-[420px] aspect-square !rounded-[48px]" />
        </div>
      </div>
    </div>

    {/* White Experts Strip Preview */}
    <div className="w-full bg-white pt-10 pb-12 px-4 flex flex-col items-center gap-6">
      <Skeleton tone="light" className="h-9 sm:h-11 w-56 sm:w-72" />
      <Skeleton tone="light" variant="text" className="w-64 sm:w-96 !h-5" />
      <div className="w-full h-[360px] flex items-center justify-center">
        <ExpertGallerySkeleton />
      </div>
    </div>
  </div>
);

const AuthRouteSkeleton = () => (
  <div className="min-h-screen w-full bg-landing-gradient flex items-center justify-center p-4 sm:p-8">
    <div className="w-full max-w-[1100px] min-h-[550px] md:min-h-[700px] glass-card rounded-lg flex flex-col md:flex-row overflow-hidden">
      {/* Left Form Column */}
      <div className="w-full flex-1 md:flex-none md:w-[45%] bg-ui-bg/40 flex flex-col justify-center px-6 py-8">
        <div className="w-full max-w-[420px] mx-auto flex flex-col gap-5">
          <Skeleton className="h-12 w-40 mb-2 !rounded-lg" />
          <Skeleton className="h-9 w-48 mb-3 !rounded-lg" />

          <div className="flex flex-col gap-2">
            <Skeleton variant="text" className="w-24 !h-4" />
            <Skeleton className="h-11 w-full !rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton variant="text" className="w-28 !h-4" />
            <Skeleton className="h-11 w-full !rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton variant="text" className="w-20 !h-4" />
            <Skeleton className="h-11 w-full !rounded-lg" />
          </div>

          <Skeleton className="h-12 w-full mt-3 !rounded-lg" />
          <Skeleton variant="text" className="w-48 self-center mt-2 !h-4" />
        </div>
      </div>

      {/* Right Illustration Banner (Desktop) */}
      <div className="hidden md:block flex-1 relative overflow-hidden bg-[#0A1624]">
        <Skeleton className="w-full h-full !rounded-none" />
      </div>
    </div>
  </div>
);

const FlowCardRouteSkeleton = () => (
  <div className="min-h-screen w-full bg-landing-gradient flex flex-col items-center justify-center p-4 sm:p-8">
    <div className="w-full max-w-[820px] glass-card rounded-2xl p-6 sm:p-10 flex flex-col gap-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <Skeleton className="h-11 w-36 !rounded-lg" />
        <Skeleton className="h-9 w-32 !rounded-lg" />
      </div>
      <div className="flex flex-col items-center gap-3 py-2">
        <Skeleton className="h-8 w-64 !rounded-lg" />
        <Skeleton variant="text" className="w-80 max-w-full !h-4" />
      </div>
      <Skeleton className="w-full h-[300px] sm:h-[360px] !rounded-2xl" />
      <div className="flex justify-end gap-3 pt-2">
        <Skeleton className="h-12 w-36 !rounded-xl" />
      </div>
    </div>
  </div>
);

const ExpertsListRouteSkeleton = () => (
  <div className="min-h-screen w-full flex flex-col bg-landing-gradient">
    <NavbarBarSkeleton />
    <div className="flex-1 w-full px-4 sm:px-8 lg:px-[54px] py-8 sm:py-12 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/10">
        <div className="flex flex-col gap-3 max-w-2xl w-full">
          <Skeleton className="h-6 w-36 !rounded-full" />
          <Skeleton className="h-11 sm:h-12 w-64 sm:w-80 !rounded-xl" />
          <Skeleton variant="text" className="w-full max-w-xl !h-4" />
        </div>
        <Skeleton className="h-12 w-full md:w-80 !rounded-2xl" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden">
          {[112, 136, 128, 120].map((w, idx) => (
            <Skeleton key={idx} className="h-10 !rounded-xl shrink-0" style={{ width: w }} />
          ))}
        </div>
        <Skeleton className="h-10 w-40 !rounded-xl" />
      </div>

      <ExpertCardGridSkeleton count={8} />
    </div>
  </div>
);

const PsychologistRouteSkeleton = () => (
  <div className="min-h-screen w-full flex flex-col bg-landing-gradient">
    <NavbarBarSkeleton />
    <div className="w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[40px] pb-[80px] flex flex-col gap-8">
      <Skeleton className="h-11 sm:h-14 w-64 sm:w-80 !rounded-xl" />
      <PsychologistSkeleton />
    </div>
  </div>
);

const ContentCollectionRouteSkeleton = ({ withHero = false }: { withHero?: boolean }) => (
  <div className="min-h-screen w-full flex flex-col bg-landing-gradient">
    <NavbarBarSkeleton />
    <div className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[36px] sm:pt-[48px] pb-[80px] flex flex-col items-center">
      <div className="w-full max-w-[1200px] flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-11 sm:h-14 w-56 sm:w-72 !rounded-xl" />
          <Skeleton variant="text" className="w-full max-w-lg !h-5" />
        </div>

        {withHero && (
          <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] flex flex-col lg:flex-row">
            <Skeleton className="w-full lg:w-[56%] aspect-[16/10] lg:h-[380px] !rounded-none" />
            <div className="w-full lg:w-[44%] p-6 sm:p-8 flex flex-col justify-between gap-5">
              <div className="flex flex-col gap-3">
                <Skeleton className="h-6 w-28 !rounded-full" />
                <Skeleton className="h-8 w-11/12" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton variant="text" className="w-full mt-2" />
                <Skeleton variant="text" className="w-5/6" />
              </div>
              <Skeleton className="h-10 w-36 !rounded-lg" />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <Skeleton className="h-10 w-24 !rounded-xl shrink-0" />
            <Skeleton className="h-10 w-28 !rounded-xl shrink-0" />
            <Skeleton className="h-10 w-28 !rounded-xl shrink-0" />
          </div>
          <Skeleton className="hidden sm:block h-10 w-44 !rounded-xl" />
        </div>

        <CardGridSkeleton count={6} />
      </div>
    </div>
  </div>
);

const ContentDetailRouteSkeleton = () => (
  <div className="min-h-screen w-full flex flex-col bg-landing-gradient">
    <NavbarBarSkeleton />
    <DetailPageSkeleton />
  </div>
);

const GenericPageRouteSkeleton = () => (
  <div className="min-h-screen w-full flex flex-col bg-landing-gradient">
    <NavbarBarSkeleton />
    <div className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[36px] sm:pt-[52px] pb-[80px] flex flex-col items-center">
      <div className="w-full max-w-[1160px] flex flex-col gap-8">
        <Skeleton className="w-full h-[240px] sm:h-[340px] !rounded-2xl" />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-32 !rounded-full" />
          <Skeleton className="h-10 sm:h-12 w-3/4 max-w-[680px]" />
          <Skeleton variant="text" className="w-full max-w-[820px] !h-4 mt-2" />
          <Skeleton variant="text" className="w-5/6 max-w-[740px] !h-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <Skeleton className="h-[190px] !rounded-2xl" />
          <Skeleton className="h-[190px] !rounded-2xl" />
        </div>
      </div>
    </div>
  </div>
);

const AUTH_PATHS = new Set([
  '/login',
  '/register',
  '/forgot-password',
  '/verify-otp',
  '/new-password',
  '/registration-success',
]);

/**
 * Selects a layout-accurate full-screen skeleton shell matching the given route pathname.
 */
export const RouteSkeletonForPath = ({ pathname }: { pathname: string }) => {
  if (pathname === '/') {
    return <HomeRouteSkeleton />;
  }

  if (AUTH_PATHS.has(pathname)) {
    return <AuthRouteSkeleton />;
  }

  if (
    pathname === '/register/face-capture' ||
    pathname === '/onboarding' ||
    pathname.endsWith('/verify-face')
  ) {
    return <FlowCardRouteSkeleton />;
  }

  if (pathname === '/experts') {
    return <ExpertsListRouteSkeleton />;
  }

  if (pathname.startsWith('/psychologist/') || pathname.startsWith('/experts/')) {
    return <PsychologistRouteSkeleton />;
  }

  if (pathname === '/news' || pathname === '/blog') {
    return <ContentCollectionRouteSkeleton withHero />;
  }

  if (pathname === '/articles' || pathname === '/gallery') {
    return <ContentCollectionRouteSkeleton />;
  }

  if (
    pathname.startsWith('/articles/') ||
    pathname.startsWith('/news/') ||
    pathname.startsWith('/blog/')
  ) {
    return <ContentDetailRouteSkeleton />;
  }

  return <GenericPageRouteSkeleton />;
};
