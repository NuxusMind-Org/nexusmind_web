import { apiClient } from '@/api/client';
import type {
  LoginRequest,
  AuthResponse,
  PasientRegisterDto,
  ChangePasswordRequest,
  VerifyOtpRequest,
} from './auth.types';

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: PasientRegisterDto): Promise<string> => {
    const response = await apiClient.post<string>('/auth/add', data);
    return response.data;
  },

  getMe: async (): Promise<string> => {
    const response = await apiClient.get<string>('/auth/me');
    return response.data;
  },

  validateToken: async (): Promise<boolean> => {
    const response = await apiClient.get<boolean>('/auth/validate');
    return response.data;
  },

  changePassword: async (data: ChangePasswordRequest): Promise<string> => {
    const response = await apiClient.put<string>('/auth/change-password', data);
    return response.data;
  },

  sendOtp: async (email: string): Promise<string> => {
    const response = await apiClient.post<string>('/otp/send', null, {
      params: { email },
    });
    return response.data;
  },

  verifyOtp: async (data: VerifyOtpRequest): Promise<string> => {
    const response = await apiClient.post<string>('/otp/verify', data);
    return response.data;
  },
};
