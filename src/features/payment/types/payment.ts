export type PaymentStatus = 'success' | 'error' | 'pending' | 'unknown';

export interface PaymentDetails {
  orderId: string;
  amount: string;
  currency: string;
  date: string;
  method: string;
  status: PaymentStatus;
  rrn?: string;
  item?: string;
  errorMessage?: string;
}

export interface PaymentQueryParams {
  orderId?: string | null;
  amount?: string | null;
  currency?: string | null;
  status?: string | null;
  rrn?: string | null;
  item?: string | null;
  message?: string | null;
  errorCode?: string | null;
}
