import type { PaymentDetails, PaymentStatus } from '../types/payment';

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

  // Format date nicely
  const now = new Date();
  const formattedDate = searchParams.get('date') ||
    now.toLocaleDateString('az-AZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

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
