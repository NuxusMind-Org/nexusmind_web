import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import type { PasientRegisterDto } from '@/api/types';

export interface UpdateUserParams {
  id: number;
  data: PasientRegisterDto;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateUserParams): Promise<string> => {
      return await authApi.updateUser(id, data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['user', 'current'] });
    },
  });
};
