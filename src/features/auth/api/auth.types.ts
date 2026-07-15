export interface PasientRegisterDto {
  name: string;
  surname: string;
  age: number; // 17 to 45
  email: string;
  password?: string;
  phone?: string;
}

export interface ChangePasswordRequest {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface VerifyOtpRequest {
  email?: string;
  otp?: string;
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
}
