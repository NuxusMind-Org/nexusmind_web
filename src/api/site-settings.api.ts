import { apiClient } from './client';
import type {
  SiteSettingsRequestDto,
  SiteSettingsResponseDto,
  PostKeywordsRequestDto,
} from './types';

export const siteSettingsApi = {
  getSettings: async (): Promise<SiteSettingsResponseDto> => {
    const response = await apiClient.get<SiteSettingsResponseDto>('/admin/site-settings');
    return response.data;
  },

  updateSettings: async (data: SiteSettingsRequestDto): Promise<SiteSettingsResponseDto> => {
    const response = await apiClient.put<SiteSettingsResponseDto>('/admin/site-settings', data);
    return response.data;
  },

  postKeywords: async (data: PostKeywordsRequestDto): Promise<void> => {
    await apiClient.post('/admin/site-settings/post-keywords', data);
  },

  getScripts: async (): Promise<SiteSettingsResponseDto> => {
    const response = await apiClient.get<SiteSettingsResponseDto>('/site-settings/scripts');
    return response.data;
  },
};
