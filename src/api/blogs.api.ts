import { apiClient } from './client';
import type {
  BlogRequest,
  BlogResponse,
  PageBlogResponse,
} from './types';

export const blogsApi = {
  getAll: async (): Promise<BlogResponse[]> => {
    const response = await apiClient.get<BlogResponse[]>('/blog');
    return response.data;
  },

  getById: async (id: number): Promise<BlogResponse> => {
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

  search: async (params?: {
    query?: string;
    category?: string;
    page?: number;
    size?: number;
    sort?: string[];
  }): Promise<PageBlogResponse> => {
    const response = await apiClient.get<PageBlogResponse>('/blog/search', { params });
    return response.data;
  },

  getByCategory: async (category: string): Promise<BlogResponse[]> => {
    const response = await apiClient.get<BlogResponse[]>(`/blog/category/${category}`);
    return response.data;
  },
};
