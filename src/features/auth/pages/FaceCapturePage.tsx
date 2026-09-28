import { FaceCapture } from '../components/FaceCapture';

export const FaceCapturePage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-10 relative overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Spacious Centered Glassmorphic Card */}
      <div className="w-full max-w-[680px] glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 relative z-10 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(0,242,255,0.08)]">
        <FaceCapture />
      </div>
    </div>
  );
};
