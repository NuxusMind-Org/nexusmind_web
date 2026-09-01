import { useQuery } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import { getAccessToken, getJwtPayload, getUserId, setUserId } from '@/api/tokenManager';
import type { PasientRegisterDto, PasientRegisterEntity } from '@/api/types';

export interface CurrentUser extends PasientRegisterDto {
  id?: number;
  profileImageUrl?: string;
  status?: string;
  language?: string;
  twoFactorEnabled?: boolean;
}

export const useCurrentUser = () => {
  const token = getAccessToken();
  const storedUserId = getUserId();
  const payload = getJwtPayload(token);
  const rawId = storedUserId ?? payload?.id ?? payload?.userId;
  const userId = typeof rawId === 'number' ? rawId : typeof rawId === 'string' ? parseInt(rawId, 10) : undefined;

  return useQuery<CurrentUser | null>({
    queryKey: ['user', userId ?? 'current'],
    queryFn: async (): Promise<CurrentUser | null> => {
      if (!token) return null;

      try {
        // 1. If user ID is available, call GET /auth/{id}
        if (typeof userId === 'number' && !isNaN(userId)) {
          const userDto = await authApi.getUserById(userId);
          return {
            ...userDto,
            id: userId,
          };
        }

        // 2. Fallback: call GET /auth (getMe) to resolve ID
        const me = await authApi.getMe();
        if (typeof me === 'object' && me !== null) {
          const entity = me as PasientRegisterEntity;
          if (entity.id) {
            setUserId(entity.id);
            const userDto = await authApi.getUserById(entity.id);
            return {
              ...userDto,
              id: entity.id,
              profileImageUrl: entity.profileImageUrl,
              status: entity.status,
              language: entity.language,
              twoFactorEnabled: entity.twoFactorEnabled,
            };
          }

          return {
            name: entity.name || payload?.name || '',
            surname: entity.surname || payload?.surname || '',
            email: entity.email || payload?.email || payload?.sub || '',
            age: entity.age || 0,
            phone: entity.phone,
            id: entity.id,
            profileImageUrl: entity.profileImageUrl,
            status: entity.status,
            language: entity.language,
            twoFactorEnabled: entity.twoFactorEnabled,
          };
        }

        // 3. Fallback to claims in decoded JWT
        if (payload) {
          return {
            name: payload.name || '',
            surname: payload.surname || '',
            email: payload.email || payload.sub || '',
            age: 0,
            id: userId,
          };
        }

        return null;
      } catch (err) {
        console.warn('Failed to fetch current user data:', err);
        // Fallback to decoded JWT claims on network/temporary errors
        if (payload) {
          return {
            name: payload.name || '',
            surname: payload.surname || '',
            email: payload.email || payload.sub || '',
            age: 0,
            id: userId,
          };
        }
        return null;
      }
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });
};
