import type { ReactNode } from 'react';
import registrationImg from '@/assets/svg/emotionsIllustration.svg';

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
        <div className="hidden md:block flex-1 relative bg-gradient-to-br from-[#1E293B] to-[#0F172A]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-90"
            style={{ backgroundImage: `url(${registrationImg})` }}
          />
          {/* Blend overlays */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-ui-bg/90 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-ui-bg/80 via-transparent to-transparent" />
          {/* Decorative neon orbs */}
          <div className="absolute bottom-[30%] left-[20%] w-32 h-32 bg-brand/30 blur-[60px] rounded-full pointer-events-none" />
          <div className="absolute top-[20%] right-[20%] w-40 h-40 bg-accent/20 blur-[80px] rounded-full pointer-events-none" />
        </div>

      </div>
    </div>
  );
};
