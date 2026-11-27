import { apiClient } from './client';
import { buildPageableParams, SPRING_PARAMS_SERIALIZER } from './utils/pageable';
import type {
  MeqaleRequestDto,
  MeqaleResponseDto,
  PageMeqaleResponseDto,
  Pageable,
} from './types';

export interface ArticleSearchParams {
  keyword?: string;
  query?: string; // legacy alias
  page?: number;
  size?: number;
  sort?: string[];
  pageable?: Pageable;
}

export const articlesApi = {
  getAll: async (): Promise<MeqaleResponseDto[]> => {
    const response = await apiClient.get<MeqaleResponseDto[]>('/meqale');
    return response.data;
  },

  getById: async (id: number | string): Promise<MeqaleResponseDto> => {
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

  search: async (params: ArticleSearchParams = {}): Promise<PageMeqaleResponseDto> => {
    const keyword = params.keyword || params.query || '';
    const pageable = params.pageable || {
      page: params.page ?? 0,
      size: params.size ?? 10,
      sort: params.sort,
    };
    const response = await apiClient.get<PageMeqaleResponseDto>('/meqale/search', {
      params: { keyword, ...buildPageableParams(pageable) },
      paramsSerializer: SPRING_PARAMS_SERIALIZER,
    });
    return response.data;
  },

  getByCategory: async (category: string, pageable?: Pageable): Promise<PageMeqaleResponseDto> => {
    const response = await apiClient.get<PageMeqaleResponseDto>(
      `/meqale/category/${encodeURIComponent(category)}`,
      {
        params: buildPageableParams(pageable),
        paramsSerializer: SPRING_PARAMS_SERIALIZER,
      }
    );
    return response.data;
  },

  getAdminAll: async (pageable?: Pageable): Promise<PageMeqaleResponseDto> => {
    const response = await apiClient.get<PageMeqaleResponseDto>('/meqale/admin/all', {
      params: buildPageableParams(pageable),
      paramsSerializer: SPRING_PARAMS_SERIALIZER,
    });
    return response.data;
  },
};
