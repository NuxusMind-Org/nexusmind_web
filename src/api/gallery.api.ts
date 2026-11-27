import { apiClient } from './client';
import type {
  GalleryItemRequest,
  GalleryItemResponse,
  PageGalleryItemResponse,
  GalleryCategory,
} from './types';

export interface GalleryQueryParams {
  category?: GalleryCategory | string;
  sort?: string;
  page?: number;
  size?: number;
}

export const galleryApi = {
  getItems: async (params?: GalleryQueryParams): Promise<PageGalleryItemResponse> => {
    const cleanParams: Record<string, string | number> = {};
    if (params?.category && params.category !== 'all') {
      cleanParams.category = params.category;
    }
    if (params?.sort) {
      cleanParams.sort = params.sort;
    }
    if (params?.page !== undefined) {
      cleanParams.page = params.page;
    }
    if (params?.size !== undefined) {
      cleanParams.size = params.size;
    }

    const response = await apiClient.get<PageGalleryItemResponse>('/gallery', {
      params: cleanParams,
    });
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
