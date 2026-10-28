import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/components';
import type { AppointmentMode } from '@/api/types';

export interface SessionPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
  psychologist: {
    id: number;
    name: string;
    title?: string;
    image?: string;
    rating?: number;
  };
  patientName: string;
  patientAge?: number;
  appointmentDate: string;
  appointmentTime: string;
  mode: AppointmentMode;
  amount: number;
  currency?: string;
  isProcessing?: boolean;
  error?: string | null;
}

export const SessionPaymentModal: React.FC<SessionPaymentModalProps> = ({
  isOpen,
  onClose,
  onCheckout,
  psychologist,
  patientName,
  patientAge,
  appointmentDate,
  appointmentTime,
  mode,
  amount,
  currency = 'AZN',
  isProcessing = false,
  error = null,
}) => {
  const { t, i18n } = useTranslation();

  if (!isOpen) return null;

  const locale = i18n.language === 'az' ? 'az-AZ' : i18n.language === 'ru' ? 'ru-RU' : 'en-US';

  // Format date nicely
  const formattedDate = (() => {
    try {
      const [year, month, day] = appointmentDate.split('-').map(Number);
      const d = new Date(year, month - 1, day);
      return d.toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return appointmentDate;
    }
  })();

  const timeDisplay = appointmentTime.slice(0, 5);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isProcessing) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-[500px] bg-[#161226]/95 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.7)] flex flex-col gap-6 text-white overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-purple-600/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between relative z-10">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-300">
                <AppIcon icon="lucide:shield-check" size={20} />
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {t('payment.sessionOrderTitle', 'Seans Sifarişi və Ödəniş')}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-white/70">
              {t('payment.sessionOrderSubtitle', 'Zəhmət olmasa seans məlumatlarını yoxlayın və ödənişə keçin')}
            </p>
          </div>

          <button
            type="button"
            disabled={isProcessing}
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={t('common.close', 'Bağla')}
          >
            ✕
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="relative z-10 p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2 animate-shake">
            <AppIcon icon="lucide:alert-circle" size={16} className="shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Details Card */}
        <div className="relative z-10 flex flex-col gap-4 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10">
          {/* Psychologist Info */}
          <div className="flex items-center gap-4 pb-4 border-b border-white/10">
            {psychologist.image ? (
              <img
                src={psychologist.image}
                alt={psychologist.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-purple-400/40 shadow-md"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-purple-600/30 border-2 border-purple-400/40 flex items-center justify-center text-purple-200 font-bold text-lg">
                {psychologist.name.charAt(0)}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-xs uppercase tracking-wider text-purple-300 font-semibold">
                {t('psychologist.specialist', 'Mütəxəssis')}
              </span>
              <h4 className="text-base sm:text-lg font-semibold text-white truncate">
                {psychologist.name}
              </h4>
              {psychologist.title && (
                <span className="text-xs text-white/60 truncate">{psychologist.title}</span>
              )}
            </div>
          </div>

          {/* Schedule & Format Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
              <AppIcon icon="lucide:calendar" size={18} className="text-purple-400 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] text-white/50">{t('webapp.calendar.date', 'Tarix')}</span>
                <span className="text-white font-medium truncate capitalize">{formattedDate}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
              <AppIcon icon="lucide:clock" size={18} className="text-purple-400 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] text-white/50">{t('webapp.calendar.time', 'Saat')}</span>
                <span className="text-white font-medium">{timeDisplay}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
              <AppIcon
                icon={mode === 'VR' ? 'lucide:glasses' : 'lucide:video'}
                size={18}
                className="text-purple-400 shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] text-white/50">{t('webapp.calendar.format', 'Format')}</span>
                <span className="text-white font-medium">
                  {mode === 'VR'
                    ? t('webapp.sessions.vrSession', 'VR Seans')
                    : t('webapp.sessions.videoSession', 'Onlayn Video Seans')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
              <AppIcon icon="lucide:user" size={18} className="text-purple-400 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] text-white/50">{t('payment.patient', 'Pasient')}</span>
                <span className="text-white font-medium truncate">
                  {patientName} {patientAge ? `(${patientAge} yaş)` : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Highlight */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-white/70 font-medium">
                {t('payment.totalToPay', 'Ödəniləcək məbləğ:')}
              </span>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <AppIcon icon="lucide:lock" size={12} />
                e-point 3D Secure
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                {amount.toFixed(2)} {currency}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="relative z-10 flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 w-full">
          {/* Cancel button: Cancels without any backend call */}
          <button
            type="button"
            disabled={isProcessing}
            onClick={onClose}
            className="w-full sm:w-1/2 h-[48px] sm:h-[50px] bg-white/10 hover:bg-white/15 active:scale-[0.98] text-white/80 hover:text-white rounded-xl text-sm font-semibold transition-all cursor-pointer border border-white/10 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {t('common.cancel', 'Ləğv et')}
          </button>

          {/* Checkout button: Sends request to /api/payments/start and redirects to e-point */}
          <button
            type="button"
            disabled={isProcessing}
            onClick={onCheckout}
            className="group relative w-full sm:w-1/2 h-[48px] sm:h-[50px] bg-[#4A148F] hover:bg-[#5b1ab0] active:scale-[0.98] text-white rounded-xl text-sm font-semibold transition-all shadow-[0_4px_20px_rgba(74,20,143,0.45)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden flex items-center justify-center"
          >
            {/* Animated conic border */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden"
              style={{
                padding: '2px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            >
              <div
                className="absolute left-1/2 top-1/2 w-[200%] aspect-square -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-out group-hover:rotate-90"
                style={{
                  background:
                    'conic-gradient(from 315deg, #6700FF 0%, rgba(255, 255, 255, 0.04) 25%, #FFFFFF 50%, rgba(255, 255, 255, 0.07) 75%, #6700FF 100%)',
                }}
              />
            </div>

            <span className="relative z-10 flex items-center justify-center gap-2">
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t('payment.processing', 'Keçid edilir...')}</span>
                </>
              ) : (
                <>
                  <span>{t('payment.checkout', 'Ödənişə keç')}</span>
                  <AppIcon icon="lucide:arrow-right" size={16} />
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
