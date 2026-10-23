import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/components';
import { PATHS } from '@/routes/paths';
import type { PaymentStatus } from '../types/payment';

interface PaymentActionsProps {
  status: PaymentStatus;
  onRetry?: () => void;
  onRefresh?: () => void;
}

export const PaymentActions: React.FC<PaymentActionsProps> = ({
  status,
  onRetry,
  onRefresh,
}) => {
  const { t } = useTranslation();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full flex flex-col gap-3 mt-6 sm:mt-8">
      {status === 'success' && (
        <>
          {/* Primary Action Button: View Sessions with animated conic border */}
          <Link
            to={PATHS.SESSIONS}
            className="group relative w-full h-[50px] sm:h-[54px] rounded-xl flex items-center justify-center font-semibold text-[15px] sm:text-[16px] text-white shadow-[0_4px_24px_rgba(103,0,255,0.4)] transition-transform duration-300 active:scale-[0.98] cursor-pointer overflow-hidden bg-[#6700FF]"
          >
            {/* Animated conic border */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                padding: '2px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            >
              <div
                className="absolute left-1/2 top-1/2 w-[220%] aspect-square -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-out group-hover:rotate-90"
                style={{
                  background:
                    'conic-gradient(from 315deg, #A682FF 0%, rgba(255,255,255,0.1) 25%, #FFFFFF 50%, rgba(255,255,255,0.1) 75%, #A682FF 100%)',
                }}
              />
            </div>
            <span className="relative z-10 flex items-center gap-2">
              <AppIcon icon="lucide:calendar-check" size={18} />
              {t('payment.viewSessions', 'Seanslarıma bax')}
            </span>
          </Link>

          {/* Secondary Actions Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <button
              type="button"
              onClick={handlePrint}
              className="w-full h-[46px] rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white/90 hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <AppIcon icon="lucide:printer" size={16} />
              {t('payment.printReceipt', 'Qəbzi çap et')}
            </button>

            <Link
              to={PATHS.HOME}
              className="w-full h-[46px] rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white/90 hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <AppIcon icon="lucide:home" size={16} />
              {t('payment.returnHome', 'Əsas səhifə')}
            </Link>
          </div>
        </>
      )}

      {status === 'error' && (
        <>
          {/* Primary Action Button: Retry */}
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="w-full h-[50px] sm:h-[54px] rounded-xl flex items-center justify-center font-semibold text-[15px] sm:text-[16px] text-white shadow-[0_4px_24px_rgba(244,63,94,0.35)] transition-transform duration-300 active:scale-[0.98] cursor-pointer bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 gap-2"
            >
              <AppIcon icon="lucide:rotate-ccw" size={18} />
              {t('payment.retryPayment', 'Yenidən cəhd edin')}
            </button>
          ) : (
            <Link
              to={PATHS.EXPERTS}
              className="w-full h-[50px] sm:h-[54px] rounded-xl flex items-center justify-center font-semibold text-[15px] sm:text-[16px] text-white shadow-[0_4px_24px_rgba(244,63,94,0.35)] transition-transform duration-300 active:scale-[0.98] cursor-pointer bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 gap-2"
            >
              <AppIcon icon="lucide:rotate-ccw" size={18} />
              {t('payment.retryPayment', 'Yenidən cəhd edin')}
            </Link>
          )}

          {/* Secondary Actions Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <a
              href="mailto:nexusmind.net@gmail.com"
              className="w-full h-[46px] rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white/90 hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <AppIcon icon="lucide:life-buoy" size={16} />
              {t('payment.contactSupport', 'Dəstək xidməti')}
            </a>

            <Link
              to={PATHS.HOME}
              className="w-full h-[46px] rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white/90 hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <AppIcon icon="lucide:home" size={16} />
              {t('payment.returnHome', 'Əsas səhifə')}
            </Link>
          </div>
        </>
      )}

      {status === 'pending' && (
        <>
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              className="w-full h-[50px] sm:h-[54px] rounded-xl flex items-center justify-center font-semibold text-[15px] sm:text-[16px] text-white shadow-[0_4px_24px_rgba(0,242,255,0.25)] transition-transform duration-300 active:scale-[0.98] cursor-pointer bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 gap-2"
            >
              <AppIcon icon="lucide:refresh-cw" size={18} />
              {t('payment.checkStatus', 'Statusu yenilə')}
            </button>
          )}

          <Link
            to={PATHS.HOME}
            className="w-full h-[46px] rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white/90 hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <AppIcon icon="lucide:home" size={16} />
            {t('payment.returnHome', 'Əsas səhifə')}
          </Link>
        </>
      )}
    </div>
  );
};
