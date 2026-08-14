import { apiClient } from '@/api/client';
import type { OnboardingRequest, OnboardingResponse } from '@/api/types';

export const onboardingApi = {
  submitOnboarding: async (payload: OnboardingRequest): Promise<OnboardingResponse> => {
    const response = await apiClient.post<OnboardingResponse>('/onboarding/submit', payload);
    return response.data;
  },

  getStatus: async (): Promise<OnboardingResponse> => {
    const response = await apiClient.get<OnboardingResponse>('/onboarding/status');
    return response.data;
  },

  getMe: async (): Promise<OnboardingResponse> => {
    const response = await apiClient.get<OnboardingResponse>('/onboarding/me');
    return response.data;
  },
};
