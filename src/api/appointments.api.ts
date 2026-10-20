import { apiClient } from './client';
import type {
  CreateAppointmentRequest,
  AppointmentDto,
  CreateSessionNoteRequest,
  SessionNoteDto,
  AppointmentStatsDto,
  AppointmentStatus,
  UpdateUserStatusRequest,
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

  getByDoctorId: async (doctorId: number): Promise<AppointmentDto[]> => {
    const response = await apiClient.get<AppointmentDto[]>(`/appointments/${doctorId}`);
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

  updateStatus: async (
    id: number,
    status: AppointmentStatus | UpdateUserStatusRequest
  ): Promise<AppointmentDto> => {
    const payload = typeof status === 'string' ? { status } : status;
    const response = await apiClient.patch<AppointmentDto>(`/appointments/${id}/status`, payload);
    return response.data;
  },

  cancel: async (id: number): Promise<AppointmentDto> => {
    const response = await apiClient.patch<AppointmentDto>(`/appointments/${id}/cancel`);
    return response.data;
  },

  getStats: async (): Promise<AppointmentStatsDto> => {
    const response = await apiClient.get<AppointmentStatsDto>('/appointments/stats');
    return response.data;
  },

  getDoctorStats: async (): Promise<AppointmentStatsDto> => {
    const response = await apiClient.get<AppointmentStatsDto>('/appointments/doctor/stats');
    return response.data;
  },

  uploadDoctorProfileImage: async (file: File | Blob): Promise<Record<string, string>> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post<Record<string, string>>(
      '/appointments/doctors/me/profile-image',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
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
