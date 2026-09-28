import { apiClient } from './client';
import type {
  CreateAppointmentRequest,
  AppointmentDto,
  CreateSessionNoteRequest,
  SessionNoteDto,
  AppointmentStatsDto,
  AppointmentStatus,
  JoinTokenResponse,
} from './types';

export const appointmentsApi = {
  getJoinToken: async (id: number): Promise<JoinTokenResponse> => {
    const response = await apiClient.post<JoinTokenResponse>(`/appointments/${id}/join-token`);
    return response.data;
  },
  getMyAppointments: async (range?: string): Promise<AppointmentDto[]> => {
    const response = await apiClient.get<AppointmentDto[]>('/appointments', {
      params: { range },
    });
    return response.data;
  },

  create: async (data: CreateAppointmentRequest): Promise<AppointmentDto> => {
    const response = await apiClient.post<AppointmentDto>('/appointments', data);
    return response.data;
  },

  getById: async (id: number): Promise<AppointmentDto> => {
    const response = await apiClient.get<AppointmentDto>(`/appointments/${id}`);
    return response.data;
  },

  getNote: async (id: number): Promise<SessionNoteDto> => {
    const response = await apiClient.get<SessionNoteDto>(`/appointments/${id}/notes`);
    return response.data;
  },

  addNote: async (id: number, data: CreateSessionNoteRequest): Promise<SessionNoteDto> => {
    const response = await apiClient.post<SessionNoteDto>(`/appointments/${id}/notes`, data);
    return response.data;
  },

  updateStatus: async (id: number, status: AppointmentStatus): Promise<AppointmentDto> => {
    const response = await apiClient.patch<AppointmentDto>(`/appointments/${id}/status`, null, {
      params: { status },
    });
    return response.data;
  },

  cancel: async (id: number): Promise<void> => {
    await apiClient.patch(`/appointments/${id}/cancel`);
  },

  getStats: async (): Promise<AppointmentStatsDto> => {
    const response = await apiClient.get<AppointmentStatsDto>('/appointments/stats');
    return response.data;
  },

  compareFace: async (file: Blob | File): Promise<boolean> => {
    const formData = new FormData();
    if (file instanceof File) {
      formData.append('file', file);
    } else {
      formData.append('file', file, 'face_verification.jpg');
    }
    const response = await apiClient.post<boolean>('/appointments/compare-face', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
