import type { ReactNode } from 'react';
import formBannerImage from '@/assets/svg/formBannerImage.svg';

interface AuthPageLayoutProps {
  children: ReactNode;
}

/**
 * Shared layout for all authentication pages.
 * Renders a two-column glassmorphic card: left side contains the form,
 * right side displays a decorative illustration (desktop only).
 */
export const AuthPageLayout = ({ children }: AuthPageLayoutProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-8">
      {/* Main Glassmorphic Container */}
      <div className="w-full max-w-[1100px] h-full min-h-[550px] md:min-h-[700px] glass-card rounded-lg flex flex-col md:flex-row overflow-hidden relative z-10">

        {/* Left Form Section */}
        <div className="w-full md:w-[45%] flex-shrink-0 bg-ui-bg/40 relative">
          {children}
        </div>

        {/* Right Illustration Section (desktop only) */}
        <div className="hidden md:block flex-1 relative overflow-hidden bg-[#0A1624]">
          <img
            src={formBannerImage}
            alt="NexusMind Banner Illustration"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
};

