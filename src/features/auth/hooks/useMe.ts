import { useQuery } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import { authKeys } from '../api/auth.keys';
import { getAccessToken } from '@/api/tokenManager';

export const useMe = () => {
  const token = getAccessToken();

  return useQuery({
    queryKey: authKeys.me(),
    queryFn: authApi.getMe,
    enabled: !!token, // Only fetch when authenticated
    retry: false,
  });
};

