import { apiClient } from './client';
import type {
  BlogRequest,
  BlogResponse,
  PageBlogResponse,
  Pageable,
} from './types';

export interface BlogSearchParams {
  keyword?: string;
  query?: string; // legacy alias
  page?: number;
  size?: number;
  sort?: string[];
  pageable?: Pageable;
}

export const blogsApi = {
  getAll: async (): Promise<BlogResponse[]> => {
    const response = await apiClient.get<BlogResponse[]>('/blog');
    return response.data;
  },

  getById: async (id: number | string): Promise<BlogResponse> => {
    const response = await apiClient.get<BlogResponse>(`/blog/${id}`);
    return response.data;
  },

  create: async (data: BlogRequest): Promise<BlogResponse> => {
    const response = await apiClient.post<BlogResponse>('/blog', data);
    return response.data;
  },

  update: async (id: number, data: BlogRequest): Promise<BlogResponse> => {
    const response = await apiClient.put<BlogResponse>(`/blog/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/blog/${id}`);
  },

  search: async (params: BlogSearchParams = {}): Promise<PageBlogResponse> => {
    const keyword = params.keyword || params.query || '';
    const pageable = params.pageable || {
      page: params.page ?? 0,
      size: params.size ?? 10,
      sort: params.sort,
    };
    const response = await apiClient.get<PageBlogResponse>('/blog/search', {
      params: { keyword, pageable },
    });
    return response.data;
  },

  getByCategory: async (category: string, pageable?: Pageable): Promise<PageBlogResponse> => {
    const response = await apiClient.get<PageBlogResponse>(`/blog/category/${category}`, {
      params: { pageable: pageable || { page: 0, size: 10 } },
    });
    return response.data;
  },
};
