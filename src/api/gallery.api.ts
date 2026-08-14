import { apiClient } from './client';
import type {
  GalleryItemRequest,
  GalleryItemResponse,
  PageGalleryItemResponse,
  GalleryCategory,
} from './types';

export const galleryApi = {
  getItems: async (params?: {
    category?: GalleryCategory | string;
    sort?: string;
    page?: number;
    size?: number;
  }): Promise<PageGalleryItemResponse> => {
    const response = await apiClient.get<PageGalleryItemResponse>('/gallery', { params });
    return response.data;
  },

  create: async (data: GalleryItemRequest): Promise<GalleryItemResponse> => {
    const response = await apiClient.post<GalleryItemResponse>('/gallery', data);
    return response.data;
  },

  update: async (id: number, data: GalleryItemRequest): Promise<GalleryItemResponse> => {
    const response = await apiClient.put<GalleryItemResponse>(`/gallery/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/gallery/${id}`);
  },
};
