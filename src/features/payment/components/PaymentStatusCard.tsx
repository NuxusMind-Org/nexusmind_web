import React from 'react';
import { AppIcon } from '@/components';
import type { PaymentStatus } from '../types/payment';

interface PaymentStatusCardProps {
  status: PaymentStatus;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export const PaymentStatusCard: React.FC<PaymentStatusCardProps> = ({
  status,
  title,
  subtitle,
  children,
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'success':
        return {
          icon: 'lucide:check',
          iconColor: 'text-emerald-400',
          badgeBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
          glowBg: 'from-emerald-500/20 via-teal-500/10 to-transparent',
          shadow: 'shadow-[0_0_50px_rgba(16,185,129,0.25)]',
          ringColor: 'border-emerald-400/40',
        };
      case 'error':
        return {
          icon: 'lucide:x',
          iconColor: 'text-rose-400',
          badgeBg: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
          glowBg: 'from-rose-500/20 via-red-500/10 to-transparent',
          shadow: 'shadow-[0_0_50px_rgba(244,63,94,0.25)]',
          ringColor: 'border-rose-400/40',
        };
      case 'pending':
      default:
        return {
          icon: 'lucide:loader-2',
          iconColor: 'text-cyan-400 animate-spin',
          badgeBg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
          glowBg: 'from-cyan-500/20 via-purple-500/10 to-transparent',
          shadow: 'shadow-[0_0_50px_rgba(0,242,255,0.25)]',
          ringColor: 'border-cyan-400/40',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="relative w-full max-w-[640px] mx-auto">
      {/* Background radial glow */}
      <div
        className={`absolute -top-16 left-1/2 -translate-x-1/2 w-[340px] h-[340px] bg-gradient-to-b ${config.glowBg} rounded-full blur-3xl pointer-events-none opacity-80`}
      />

      {/* Main Glassmorphism Card */}
      <div className="relative w-full bg-[#120f26]/40 backdrop-blur-2xl border border-white/15 rounded-[28px] p-6 sm:p-10 md:p-12 shadow-[0_16px_50px_rgba(0,0,0,0.35)] flex flex-col items-center text-center">
        {/* Status Icon Badge with Pulsing Rings */}
        <div className="relative mb-6 sm:mb-8 flex items-center justify-center">
          <div
            className={`absolute -inset-3 rounded-full border border-dashed ${config.ringColor} opacity-50 animate-[spin_12s_linear_infinite]`}
          />
          <div
            className={`w-[88px] h-[88px] sm:w-[96px] sm:h-[96px] rounded-full flex items-center justify-center border backdrop-blur-md ${config.badgeBg} ${config.shadow} transition-transform duration-500 hover:scale-105`}
          >
            <AppIcon icon={config.icon} size={46} className={config.iconColor} />
          </div>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-[26px] sm:text-[34px] font-bold text-white tracking-tight leading-snug mb-3 drop-shadow-sm">
          {title}
        </h1>
        <p className="text-[15px] sm:text-[17px] text-white/75 font-light leading-relaxed max-w-[480px] mb-8">
          {subtitle}
        </p>

        {/* Dynamic Card Content / Details */}
        {children}
      </div>
    </div>
  );
};
