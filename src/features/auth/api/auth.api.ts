import { apiClient } from '@/api/client';
import type {
  LoginRequest,
  AuthResponse,
  PasientRegisterDto,
  ChangePasswordRequest,
  VerifyOtpRequest,
  ForgotPasswordRequest,
  ResetPasswordWithOtpRequest,
  AdminLoginRequest,
  PatientMood,
  PasientRegisterEntity,
} from '@/api/types';

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: PasientRegisterDto): Promise<string> => {
    const response = await apiClient.post<string>('/auth/add', data);
    return response.data;
  },

  getUserById: async (id: number): Promise<PasientRegisterDto> => {
    const response = await apiClient.get<PasientRegisterDto>(`/auth/${id}`);
    return response.data;
  },

  updateUser: async (id: number, data: PasientRegisterDto): Promise<string> => {
    const response = await apiClient.put<string>(`/auth/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: number): Promise<string> => {
    const response = await apiClient.delete<string>(`/auth/${id}`);
    return response.data;
  },

  updateMood: async (patientId: number, mood: PatientMood): Promise<void> => {
    await apiClient.put(`/auth/${patientId}/mood`, null, {
      params: { mood },
    });
  },

  getMe: async (): Promise<PasientRegisterEntity | string> => {
    const response = await apiClient.get('/auth');
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

  forgotPassword: async (data: ForgotPasswordRequest): Promise<string> => {
    const response = await apiClient.post<string>('/auth/forgot-password', data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordWithOtpRequest): Promise<string> => {
    const response = await apiClient.post<string>('/auth/reset-password', data);
    return response.data;
  },

  superAdminLogin: async (data: AdminLoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/super-admin-login', data);
    return response.data;
  },

  doctorPanelLogin: async (data: AdminLoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/doctor-panel-login', data);
    return response.data;
  },

  doctorLogin: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/doctor-login', data);
    return response.data;
  },

  bpmLogin: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/bpm-login', data);
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
