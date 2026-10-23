import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/components';
import type { PaymentDetails } from '../types/payment';

interface PaymentReceiptDetailsProps {
  details: PaymentDetails;
}

export const PaymentReceiptDetails: React.FC<PaymentReceiptDetailsProps> = ({ details }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopyOrderId = () => {
    if (details.orderId) {
      navigator.clipboard.writeText(details.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusBadge = () => {
    switch (details.status) {
      case 'success':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t('payment.statusApproved', 'Təsdiqləndi')}
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 border border-rose-500/30 text-rose-300">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            {t('payment.statusDeclined', 'İmtina edildi')}
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {t('payment.statusPending', 'Gözləmədə')}
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-5 sm:p-6 text-left flex flex-col gap-3.5 shadow-inner backdrop-blur-md">
      {/* Header title of breakdown */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="text-xs uppercase tracking-wider font-semibold text-white/50">
          {t('payment.receiptDetailsTitle', 'Ödəniş Məlumatları')}
        </span>
        {getStatusBadge()}
      </div>

      {/* Order ID */}
      <div className="flex items-center justify-between text-sm py-1">
        <span className="text-white/60 font-light">{t('payment.orderId', 'Sifariş ID')}:</span>
        <div className="flex items-center gap-2">
          <span className="font-mono font-medium text-white tracking-wide">{details.orderId}</span>
          <button
            type="button"
            onClick={handleCopyOrderId}
            title={copied ? t('payment.copied', 'Kopyalandı!') : t('payment.copyId', 'Kopyala')}
            className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <AppIcon icon={copied ? 'lucide:check' : 'lucide:copy'} size={14} className={copied ? 'text-emerald-400' : ''} />
          </button>
        </div>
      </div>

      {/* Amount */}
      <div className="flex items-center justify-between text-sm py-1">
        <span className="text-white/60 font-light">{t('payment.amount', 'Məbləğ')}:</span>
        <span className="text-[17px] font-bold text-white tracking-tight">
          {details.amount} <span className="text-cyan-400 font-semibold text-sm">{details.currency}</span>
        </span>
      </div>

      {/* Date */}
      <div className="flex items-center justify-between text-sm py-1">
        <span className="text-white/60 font-light">{t('payment.date', 'Tarix')}:</span>
        <span className="text-white/85 font-medium">{details.date}</span>
      </div>

      {/* Payment Method */}
      <div className="flex items-center justify-between text-sm py-1">
        <span className="text-white/60 font-light">{t('payment.method', 'Ödəniş növü')}:</span>
        <span className="text-white/85 font-medium flex items-center gap-1.5">
          <AppIcon icon="lucide:credit-card" size={15} className="text-purple-300" />
          {details.method}
        </span>
      </div>

      {/* Optional RRN Reference */}
      {details.rrn && (
        <div className="flex items-center justify-between text-sm py-1">
          <span className="text-white/60 font-light">{t('payment.rrn', 'RRN / Əməliyyat №')}:</span>
          <span className="font-mono text-xs text-white/70">{details.rrn}</span>
        </div>
      )}

      {/* Optional Service / Item Name */}
      {details.item && (
        <div className="flex items-center justify-between text-sm py-1">
          <span className="text-white/60 font-light">{t('payment.service', 'Xidmət')}:</span>
          <span className="text-white/85 font-medium">{details.item}</span>
        </div>
      )}

      {/* Optional Error Description */}
      {details.errorMessage && (
        <div className="mt-1 pt-3 border-t border-rose-500/20 text-xs text-rose-300 flex items-start gap-2">
          <AppIcon icon="lucide:alert-circle" size={15} className="shrink-0 mt-0.5 text-rose-400" />
          <span>{details.errorMessage}</span>
        </div>
      )}
    </div>
  );
};
