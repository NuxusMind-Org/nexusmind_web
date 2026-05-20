import { ForgotPasswordForm } from '../components/ForgotPasswordForm';
import registrationImg from '@/assets/registrationimg01.png';

export const ForgotPasswordPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-8">
      {/* Main Glassmorphic Container for the whole page/card */}
      <div className="w-full max-w-[1100px] h-full min-h-[700px] glass-card rounded-[var(--radius-xl,28px)] flex flex-col md:flex-row overflow-hidden relative z-10">
        
        {/* Left Form Section */}
        <div className="w-full md:w-[45%] flex-shrink-0 bg-ui-bg/40 relative">
          <ForgotPasswordForm />
        </div>

        {/* Right Image Section */}
        <div className="hidden md:block flex-1 relative bg-gradient-to-br from-[#1E293B] to-[#0F172A]">
          {/* This represents the image area. */}
          <div className="absolute inset-0 bg-cover bg-center opacity-90" style={{ backgroundImage: `url(${registrationImg})` }} />
          
          {/* Overlay gradient to blend the image with the dark neon aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-ui-bg/90 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-ui-bg/80 via-transparent to-transparent" />
          
          {/* Decorative neon orb mimicking the glowing creature */}
          <div className="absolute bottom-[30%] left-[20%] w-32 h-32 bg-brand/30 blur-[60px] rounded-full pointer-events-none" />
          <div className="absolute top-[20%] right-[20%] w-40 h-40 bg-accent/20 blur-[80px] rounded-full pointer-events-none" />
        </div>

      </div>
    </div>
  );
};
