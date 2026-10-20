import { apiClient } from './client';

export const uploadApi = {
  uploadImage: async (file: File | Blob): Promise<string> => {
    const formData = new FormData();
    if (file instanceof File) {
      formData.append('file', file);
    } else {
      formData.append('file', file, 'upload.jpg');
    }
    const response = await apiClient.post<string>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  download: async (filename: string): Promise<Blob> => {
    const response = await apiClient.get<Blob>(`/upload/${filename}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  delete: async (filename: string): Promise<void> => {
    await apiClient.delete(`/upload/${filename}`);
  },
};
