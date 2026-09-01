import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import { authKeys } from '../api/auth.keys';
import { useAuthStore } from '@/store/authStore';
import { clearTokens } from '@/api/tokenManager';
import type { ResetPasswordWithOtpRequest } from '../api/auth.types';

export const useResetPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ResetPasswordWithOtpRequest): Promise<string> => {
      return await authApi.resetPassword(data);
    },
    onSuccess: () => {
      // Ensure user is completely logged out and no stale tokens exist
      useAuthStore.getState().logout();
      clearTokens();
      queryClient.removeQueries({ queryKey: authKeys.all });
    },
  });
};
