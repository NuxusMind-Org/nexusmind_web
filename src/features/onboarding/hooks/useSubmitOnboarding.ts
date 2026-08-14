import { useMutation } from '@tanstack/react-query';
import { onboardingApi } from '../api/onboarding.api';
import type { OnboardingSubmitPayload } from '../types/onboarding.types';

export const useSubmitOnboarding = () => {
  return useMutation({
    mutationFn: (payload: OnboardingSubmitPayload) => onboardingApi.submitOnboarding(payload),
  });
};
