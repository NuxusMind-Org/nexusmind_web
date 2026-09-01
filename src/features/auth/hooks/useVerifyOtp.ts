import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth.api';
import { authKeys } from '../api/auth.keys';
import { PATHS } from '@/routes/paths';
import { setTokens, scheduleProactiveRefresh } from '@/api/tokenManager';
import { useAuthStore } from '@/store/authStore';
import type { VerifyOtpRequest, LoginRequest } from '../api/auth.types';

interface VerifyOtpMutationParams {
  verify: VerifyOtpRequest;
  login?: LoginRequest; // optional credentials for auto-signin on registration flow
}

export const useVerifyOtp = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ verify, login }: VerifyOtpMutationParams) => {
      // 1. Verify the OTP code
      await authApi.verifyOtp(verify);
      
      // 2. Perform auto-login if credentials are provided
      if (login) {
        return await authApi.login(login);
      }
      return null;
    },
    onSuccess: (data, variables) => {
      if (data?.token) {
        // Save auth and refresh tokens
        setTokens({
          token: data.token,
          refreshToken: data.refreshToken,
        });
        scheduleProactiveRefresh(data.token);
        useAuthStore.getState().login();

        queryClient.invalidateQueries({ queryKey: authKeys.me() });
        navigate(PATHS.REGISTRATION_SUCCESS, { state: { email: variables.verify.email } });
      } else {
        // Fallback for Password recovery flow: navigate to set new password
        navigate(PATHS.NEW_PASSWORD);
      }
    },
  });
};
