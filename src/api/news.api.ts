import { apiClient } from './client';
import type {
  XeberRequestDto,
  XeberResponseDto,
  PageXeberResponseDto,
  XeberStatus,
  Pageable,
} from './types';

export const newsApi = {
  getAll: async (): Promise<XeberResponseDto[]> => {
    const response = await apiClient.get<XeberResponseDto[]>('/xeber');
    return response.data;
  },

  getById: async (id: number): Promise<XeberResponseDto> => {
    const response = await apiClient.get<XeberResponseDto>(`/xeber/${id}`);
    return response.data;
  },

  create: async (data: XeberRequestDto): Promise<XeberResponseDto> => {
    const response = await apiClient.post<XeberResponseDto>('/xeber', data);
    return response.data;
  },

  update: async (id: number, data: XeberRequestDto): Promise<XeberResponseDto> => {
    const response = await apiClient.put<XeberResponseDto>(`/xeber/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/xeber/${id}`);
  },

  search: async (params?: {
    query?: string;
    category?: string;
    status?: XeberStatus;
    page?: number;
    size?: number;
    sort?: string[];
  }): Promise<PageXeberResponseDto> => {
    const response = await apiClient.get<PageXeberResponseDto>('/xeber/search', { params });
    return response.data;
  },

  getByCategory: async (category: string): Promise<XeberResponseDto[]> => {
    const response = await apiClient.get<XeberResponseDto[]>(`/xeber/category/${category}`);
    return response.data;
  },

  getAdminAll: async (params?: Pageable): Promise<PageXeberResponseDto> => {
    const response = await apiClient.get<PageXeberResponseDto>('/xeber/admin/all', { params });
    return response.data;
  },
};
