import { apiClient } from './client';
import type { ChatMessageResponseDto } from './types';

export const chatApi = {
  getMessages: async (appointmentId: number): Promise<ChatMessageResponseDto[]> => {
    const response = await apiClient.get<ChatMessageResponseDto[]>(
      `/chat/${appointmentId}/messages`
    );
    return response.data;
  },
};
