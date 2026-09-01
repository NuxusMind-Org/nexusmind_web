import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth.api';
import { authKeys } from '../api/auth.keys';
import { PATHS } from '@/routes/paths';
import { setTokens, scheduleProactiveRefresh } from '@/api/tokenManager';
import { useAuthStore } from '@/store/authStore';

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // 1. Store both access and refresh tokens
      setTokens({
        token: data.token,
        refreshToken: data.refreshToken,
      });

      // 2. Schedule proactive refresh timer
      scheduleProactiveRefresh(data.token);

      // 3. Update auth store
      useAuthStore.getState().login();

      // 4. Invalidate cache for the user session
      queryClient.invalidateQueries({ queryKey: authKeys.me() });

      // 5. Redirect to web app dashboard
      navigate(PATHS.DASHBOARD);
    },
  });
};

