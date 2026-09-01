import axios, { type InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, refreshAccessToken } from './tokenManager';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Endpoints that should never trigger automatic 401 token refresh
const AUTH_EXCLUDED_ENDPOINTS = [
  '/auth/login',
  '/auth/doctor-login',
  '/auth/doctor-panel-login',
  '/auth/super-admin-login',
  '/auth/bpm-login',
  '/auth/refresh',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/add',
  '/otp/verify',
  '/otp/send',
];

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig | undefined;

    // Check if error is 401 Unauthorized
    if (error.response?.status === 401 && originalRequest) {
      const requestUrl = originalRequest.url || '';
      const isExcluded = AUTH_EXCLUDED_ENDPOINTS.some((endpoint) => requestUrl.includes(endpoint));

      // Do not attempt refresh on auth-establishing or public endpoints, or if already retried
      if (isExcluded || originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        // Await single-flight refresh
        const newToken = await refreshAccessToken();

        // Update Authorization header with the new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

