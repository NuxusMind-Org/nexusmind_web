import type { PaymentDetails, PaymentStatus } from '../types/payment';
import i18n from '@/libs/i18n';
import {
  formatSessionDate,
  formatSessionTime,
  resolveSessionLang,
} from '@/utils/sessionDate';

export const parsePaymentParams = (searchParams: URLSearchParams, defaultStatus: PaymentStatus = 'success'): PaymentDetails => {
  const orderId =
    searchParams.get('orderId') ||
    searchParams.get('order_id') ||
    searchParams.get('trans_id') ||
    searchParams.get('id') ||
    `NM-${Math.floor(100000 + Math.random() * 900000)}`;

  const amount = searchParams.get('amount') || searchParams.get('total') || '50.00';
  const currency = searchParams.get('currency') || 'AZN';
  const rrn = searchParams.get('rrn') || searchParams.get('ref') || undefined;
  const item = searchParams.get('item') || searchParams.get('service') || undefined;
  const errorMessage = searchParams.get('message') || searchParams.get('error') || searchParams.get('error_desc') || undefined;

  const rawStatus = (searchParams.get('status') || '').toLowerCase();
  let status: PaymentStatus = defaultStatus;

  if (['success', 'approved', 'ok', 'paid', 'complete'].includes(rawStatus)) {
    status = 'success';
  } else if (['error', 'failed', 'declined', 'rejected', 'canceled', 'cancelled'].includes(rawStatus)) {
    status = 'error';
  } else if (['pending', 'processing', 'waiting'].includes(rawStatus)) {
    status = 'pending';
  }

  // Format date consistently across all browsers and locales
  const now = new Date();
  const lang = resolveSessionLang(i18n.resolvedLanguage || i18n.language);
  const rawDateParam = searchParams.get('date');
  const formattedDate = rawDateParam
    ? formatSessionDate(rawDateParam, lang)
    : `${formatSessionDate(now, lang)}, ${formatSessionTime(now)}`;

  return {
    orderId,
    amount,
    currency,
    date: formattedDate,
    method: searchParams.get('method') || 'Bank kartı (3D Secure)',
    status,
    rrn,
    item,
    errorMessage,
  };
};
