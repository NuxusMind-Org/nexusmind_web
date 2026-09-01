import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import type { PatientMood } from '@/api/types';

export interface UpdateMoodParams {
  patientId: number;
  mood: PatientMood;
}

export const useUpdateMood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ patientId, mood }: UpdateMoodParams): Promise<void> => {
      await authApi.updateMood(patientId, mood);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', variables.patientId] });
      queryClient.invalidateQueries({ queryKey: ['user', 'current'] });
    },
  });
};
