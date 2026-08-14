import { apiClient } from './client';
import type {
  UpdateProfileStatusRequest,
  UpdateNameRequest,
  UpdateLanguageRequest,
  UpdateEmailRequest,
  ProfileResponse,
} from './types';

export const profileApi = {
  updateStatus: async (data: UpdateProfileStatusRequest): Promise<ProfileResponse> => {
    const response = await apiClient.put<ProfileResponse>('/profile/status', data);
    return response.data;
  },

  updateName: async (data: UpdateNameRequest): Promise<ProfileResponse> => {
    const response = await apiClient.put<ProfileResponse>('/profile/name', data);
    return response.data;
  },

  updateLanguage: async (data: UpdateLanguageRequest): Promise<ProfileResponse> => {
    const response = await apiClient.put<ProfileResponse>('/profile/language', data);
    return response.data;
  },

  updateEmail: async (data: UpdateEmailRequest): Promise<ProfileResponse> => {
    const response = await apiClient.put<ProfileResponse>('/profile/email', data);
    return response.data;
  },

  updateTwoFactor: async (enabled: boolean): Promise<string> => {
    const response = await apiClient.put<string>('/profile/2fa', null, {
      params: { enabled },
    });
    return response.data;
  },

  uploadPhoto: async (file: File): Promise<ProfileResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post<ProfileResponse>('/profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deletePhoto: async (): Promise<void> => {
    await apiClient.delete('/profile/photo');
  },
};
