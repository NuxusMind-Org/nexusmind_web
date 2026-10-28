import { apiClient } from './client';
import type { StartPaymentRequest, StartPaymentResponse } from './types';

export const paymentsApi = {
  start: async (data: StartPaymentRequest): Promise<StartPaymentResponse> => {
    const response = await apiClient.post<StartPaymentResponse>('/api/payments/start', data);
    return response.data;
  },
};
