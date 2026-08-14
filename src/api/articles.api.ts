import { apiClient } from './client';
import type {
  MeqaleRequestDto,
  MeqaleResponseDto,
  PageMeqaleResponseDto,
  XeberStatus,
  Pageable,
} from './types';

export const articlesApi = {
  getAll: async (): Promise<MeqaleResponseDto[]> => {
    const response = await apiClient.get<MeqaleResponseDto[]>('/meqale');
    return response.data;
  },

  getById: async (id: number): Promise<MeqaleResponseDto> => {
    const response = await apiClient.get<MeqaleResponseDto>(`/meqale/${id}`);
    return response.data;
  },

  create: async (data: MeqaleRequestDto): Promise<MeqaleResponseDto> => {
    const response = await apiClient.post<MeqaleResponseDto>('/meqale', data);
    return response.data;
  },

  update: async (id: number, data: MeqaleRequestDto): Promise<MeqaleResponseDto> => {
    const response = await apiClient.put<MeqaleResponseDto>(`/meqale/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/meqale/${id}`);
  },

  search: async (params?: {
    query?: string;
    category?: string;
    status?: XeberStatus;
    page?: number;
    size?: number;
    sort?: string[];
  }): Promise<PageMeqaleResponseDto> => {
    const response = await apiClient.get<PageMeqaleResponseDto>('/meqale/search', { params });
    return response.data;
  },

  getByCategory: async (category: string): Promise<MeqaleResponseDto[]> => {
    const response = await apiClient.get<MeqaleResponseDto[]>(`/meqale/category/${category}`);
    return response.data;
  },

  getAdminAll: async (params?: Pageable): Promise<PageMeqaleResponseDto> => {
    const response = await apiClient.get<PageMeqaleResponseDto>('/meqale/admin/all', { params });
    return response.data;
  },
};
