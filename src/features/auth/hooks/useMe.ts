import { useQuery } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import { authKeys } from '../api/auth.keys';

export const useMe = () => {
  const token = localStorage.getItem('auth_token');

  return useQuery({
    queryKey: authKeys.me(),
    queryFn: authApi.getMe,
    enabled: !!token, // Only fetch when authenticated
    retry: false,
  });
};
