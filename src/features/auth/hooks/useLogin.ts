import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth.api';
import { authKeys } from '../api/auth.keys';
import { PATHS } from '@/routes/paths';

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // 1. Store JWT token
      localStorage.setItem('auth_token', data.token);

      // 2. Invalidate cache for the user session
      queryClient.invalidateQueries({ queryKey: authKeys.me() });

      // 3. Redirect to web app dashboard
      navigate(PATHS.DASHBOARD);
    },
  });
};
