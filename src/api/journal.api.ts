import { apiClient } from './client';
import type {
  JournalEntryRequest,
  JournalEntryResponse,
  PageJournalEntryResponse,
} from './types';

export const journalApi = {
  saveToday: async (data: JournalEntryRequest): Promise<JournalEntryResponse> => {
    const response = await apiClient.post<JournalEntryResponse>('/journal', data);
    return response.data;
  },

  getToday: async (): Promise<JournalEntryResponse> => {
    const response = await apiClient.get<JournalEntryResponse>('/journal/today');
    return response.data;
  },

  getById: async (id: number): Promise<JournalEntryResponse> => {
    const response = await apiClient.get<JournalEntryResponse>(`/journal/${id}`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/journal/${id}`);
  },

  getHistory: async (params?: { page?: number; size?: number }): Promise<PageJournalEntryResponse> => {
    const response = await apiClient.get<PageJournalEntryResponse>('/journal/history', { params });
    return response.data;
  },
};
