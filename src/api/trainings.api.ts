import { apiClient } from './client';
import type {
  TrainingRequest,
  TrainingResponse,
  PageTrainingResponse,
  TrainingTypeCountResponse,
  TrainingType,
} from './types';

export const trainingsApi = {
  search: async (params?: {
    type?: TrainingType;
    search?: string;
    page?: number;
    size?: number;
    sort?: string[];
  }): Promise<PageTrainingResponse> => {
    const response = await apiClient.get<PageTrainingResponse>('/trainings', { params });
    return response.data;
  },

  create: async (data: TrainingRequest): Promise<TrainingResponse> => {
    const response = await apiClient.post<TrainingResponse>('/trainings', data);
    return response.data;
  },

  update: async (id: number, data: TrainingRequest): Promise<TrainingResponse> => {
    const response = await apiClient.put<TrainingResponse>(`/trainings/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/trainings/${id}`);
  },

  register: async (trainingId: number): Promise<void> => {
    await apiClient.post(`/trainings/${trainingId}/register`);
  },

  unregister: async (trainingId: number): Promise<void> => {
    await apiClient.delete(`/trainings/${trainingId}/unregister`);
  },

  getTypeCounts: async (): Promise<TrainingTypeCountResponse[]> => {
    const response = await apiClient.get<TrainingTypeCountResponse[]>('/trainings/type-counts');
    return response.data;
  },

  getPopularTags: async (): Promise<string[]> => {
    const response = await apiClient.get<string[]>('/trainings/popular-tags');
    return response.data;
  },

  getCalendar: async (year: number, month: number): Promise<TrainingResponse[]> => {
    const response = await apiClient.get<TrainingResponse[]>('/trainings/calendar', {
      params: { year, month },
    });
    return response.data;
  },
};
