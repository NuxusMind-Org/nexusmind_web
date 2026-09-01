import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import type { ForgotPasswordRequest } from '../api/auth.types';

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordRequest): Promise<string> => {
      return await authApi.forgotPassword(data);
    },
  });
};
