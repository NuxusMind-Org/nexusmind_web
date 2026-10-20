import { apiClient } from './client';
import type {
  XeberRequestDto,
  XeberResponseDto,
  PageXeberResponseDto,
  Pageable,
} from './types';

export interface NewsSearchParams {
  keyword?: string;
  query?: string; // legacy alias
  page?: number;
  size?: number;
  sort?: string[];
  pageable?: Pageable;
}

export const newsApi = {
  getAll: async (): Promise<XeberResponseDto[]> => {
    const response = await apiClient.get<XeberResponseDto[]>('/xeber');
    return response.data;
  },

  getById: async (id: number | string): Promise<XeberResponseDto> => {
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

  search: async (params: NewsSearchParams = {}): Promise<PageXeberResponseDto> => {
    const keyword = params.keyword || params.query || '';
    const pageable = params.pageable || {
      page: params.page ?? 0,
      size: params.size ?? 10,
      sort: params.sort,
    };
    const response = await apiClient.get<PageXeberResponseDto>('/xeber/search', {
      params: { keyword, pageable },
    });
    return response.data;
  },

  getByCategory: async (category: string, pageable?: Pageable): Promise<PageXeberResponseDto> => {
    const response = await apiClient.get<PageXeberResponseDto>(`/xeber/category/${category}`, {
      params: { pageable: pageable || { page: 0, size: 10 } },
    });
    return response.data;
  },

  getAdminAll: async (pageable?: Pageable): Promise<PageXeberResponseDto> => {
    const response = await apiClient.get<PageXeberResponseDto>('/xeber/admin/all', {
      params: { pageable: pageable || { page: 0, size: 10 } },
    });
    return response.data;
  },
};
