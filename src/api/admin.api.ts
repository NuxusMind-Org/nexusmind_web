import { apiClient } from './client';
import type {
  PasientRegisterEntity,
  PasientResponseDto,
  DoctorResponseDto,
} from './types';

export const bpmApi = {
  getPatients: async (): Promise<PasientRegisterEntity[]> => {
    const response = await apiClient.get<PasientRegisterEntity[]>('/bpm/patients');
    return response.data;
  },

  getDoctors: async (): Promise<DoctorResponseDto[]> => {
    const response = await apiClient.get<DoctorResponseDto[]>('/bpm/doctors');
    return response.data;
  },
};

export const superAdminApi = {
  getAllPatients: async (): Promise<PasientResponseDto[]> => {
    const response = await apiClient.get<PasientResponseDto[]>('/nexusmind/patients');
    return response.data;
  },

  getAllDoctors: async (): Promise<DoctorResponseDto[]> => {
    const response = await apiClient.get<DoctorResponseDto[]>('/nexusmind/doctors');
    return response.data;
  },

  deleteDoctor: async (id: number): Promise<void> => {
    await apiClient.delete(`/nexusmind/doctors/${id}`);
  },
};
