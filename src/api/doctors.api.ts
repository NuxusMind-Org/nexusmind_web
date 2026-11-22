import { apiClient } from './client';
import type {
  DoctorRegisterDto,
  DoctorDto,
  DoctorResponseDto,
  PasientRegisterEntity,
  AvailableSlotDto,
  DoctorPriceResponse,
} from './types';

const TEST_DOCTOR_ID = 2;

export const doctorsApi = {
  registerDoctor: async (data: DoctorRegisterDto): Promise<string> => {
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.surname) formData.append('surname', data.surname);
    if (data.fatherName) formData.append('fatherName', data.fatherName);
    if (data.age) formData.append('age', data.age.toString());
    if (data.phone) formData.append('phone', data.phone);
    if (data.cv) formData.append('cv', data.cv);

    const response = await apiClient.post<string>('/doctors/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getAll: async (): Promise<DoctorDto[]> => {
    const response = await apiClient.get<DoctorDto[]>('/doctors');
    const doctors = Array.isArray(response.data) ? [...response.data] : [];

    if (!doctors.some((doctor) => doctor.id === TEST_DOCTOR_ID)) {
      try {
        const testDoctor = await doctorsApi.getById(TEST_DOCTOR_ID);
        if (testDoctor && !doctors.some((doctor) => doctor.id === testDoctor.id)) {
          doctors.push(testDoctor);
        }
      } catch (error) {
        console.warn(`Failed to fetch test doctor (id=${TEST_DOCTOR_ID}):`, error);
      }
    }

    return doctors;
  },

  getById: async (id: number): Promise<DoctorDto> => {
    const response = await apiClient.get<DoctorDto>(`/doctors/${id}`);
    return response.data;
  },

  getMyPatients: async (): Promise<PasientRegisterEntity[]> => {
    const response = await apiClient.get<PasientRegisterEntity[]>('/doctors/me/patients');
    return response.data;
  },

  getDoctorList: async (): Promise<DoctorResponseDto[]> => {
    const response = await apiClient.get<DoctorResponseDto[]>('/doctors/doctors');
    return response.data;
  },

  getAvailableWorkingHours: async (doctorId: number, from: string, to: string): Promise<AvailableSlotDto[]> => {
    const response = await apiClient.get<AvailableSlotDto[]>(`/doctors/${doctorId}/working-hours/available`, {
      params: { from, to },
    });
    return response.data;
  },

  getPrices: async (doctorId: number, age?: number): Promise<DoctorPriceResponse[]> => {
    const response = await apiClient.get<DoctorPriceResponse[]>(`/doctors/${doctorId}/prices`, {
      params: age !== undefined ? { age } : undefined,
    });
    return response.data;
  },
};
