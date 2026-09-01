import axios from 'axios';
import { PATHS } from '@/routes/paths';
import type { AuthResponse } from '@/api/types';

export const AUTH_TOKEN_KEY = 'auth_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

// In-flight singleton refresh promise lock (Layer 2)
let refreshPromise: Promise<string> | null = null;

// Proactive refresh timer reference (Layer 3)
let proactiveRefreshTimeout: ReturnType<typeof setTimeout> | null = null;

// Callback hooks for external stores (e.g. Zustand)
let onLogoutCallback: (() => void) | null = null;

export const registerOnLogoutCallback = (cb: () => void) => {
  onLogoutCallback = cb;
};

// ── Token Storage Helpers ─────────────────────────────────────

export const getAccessToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setTokens = ({
  token,
  refreshToken,
}: {
  token: string;
  refreshToken?: string;
}): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

export const clearTokens = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const hasValidSession = (): boolean => {
  return Boolean(getAccessToken());
};

// ── JWT Payload Decoder ───────────────────────────────────────

/**
 * Decodes the `exp` timestamp (in seconds) from a standard JWT token.
 */
export const getJwtExp = (token: string): number | null => {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const parsed = JSON.parse(jsonPayload);
    return typeof parsed.exp === 'number' ? parsed.exp : null;
  } catch {
    return null;
  }
};

// ── Proactive Refresh Timer (Layer 3) ─────────────────────────

export const cancelProactiveRefresh = (): void => {
  if (proactiveRefreshTimeout) {
    clearTimeout(proactiveRefreshTimeout);
    proactiveRefreshTimeout = null;
  }
};

/**
 * Schedules a silent background refresh 5 minutes before the access token expires.
 */
export const scheduleProactiveRefresh = (token: string): void => {
  cancelProactiveRefresh();

  const exp = getJwtExp(token);
  if (!exp) return;

  const nowMs = Date.now();
  const expMs = exp * 1000;
  const bufferMs = 5 * 60 * 1000; // 5 minutes before actual expiry
  const delay = expMs - nowMs - bufferMs;

  // Only schedule if expiry is in the future
  if (delay > 0) {
    proactiveRefreshTimeout = setTimeout(async () => {
      try {
        await refreshAccessToken();
      } catch (err) {
        console.warn('Proactive token refresh failed; will rely on reactive 401 interceptor.', err);
      }
    }, delay);
  } else if (expMs > nowMs) {
    // If token is already within the 5-minute buffer, refresh immediately
    refreshAccessToken().catch(() => {
      // Ignored; fallback to reactive 401 interceptor
    });
  }
};

// ── Session Termination / Hard Logout ─────────────────────────

export const handleAuthFailure = (redirect = true): void => {
  cancelProactiveRefresh();
  clearTokens();
  refreshPromise = null;

  if (onLogoutCallback) {
    onLogoutCallback();
  }

  if (redirect && typeof window !== 'undefined') {
    const publicPaths = [
      PATHS.LOGIN,
      PATHS.REGISTER,
      PATHS.FORGOT_PASSWORD,
      PATHS.NEW_PASSWORD,
      PATHS.VERIFY_OTP,
      PATHS.HOME,
    ];
    const currentPath = window.location.pathname;
    const isPublic = publicPaths.some((p) => currentPath === p || currentPath.startsWith(p + '/'));

    if (!isPublic) {
      window.location.href = PATHS.LOGIN;
    }
  }
};

// ── Single-Flight Token Refresh (Layer 2) ─────────────────────

/**
 * Centralized token refresh function.
 * Ensures only ONE refresh call is in-flight at any time (single-flight lock).
 */
export const refreshAccessToken = async (): Promise<string> => {
  // If a refresh is already in-flight, await and share the existing promise
  if (refreshPromise) {
    return refreshPromise;
  }

  const currentRefreshToken = getRefreshToken();
  if (!currentRefreshToken) {
    handleAuthFailure(true);
    return Promise.reject(new Error('No refresh token available'));
  }

  const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

  refreshPromise = (async () => {
    try {
      // Use raw axios to prevent running through apiClient's 401 interceptor
      const response = await axios.post<AuthResponse>(
        `${baseURL}/auth/refresh`,
        { refreshToken: currentRefreshToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { token, refreshToken: newRefreshToken } = response.data;
      if (!token) {
        throw new Error('Refresh endpoint did not return an access token');
      }

      // Overwrite tokens with the new rotating pair
      setTokens({
        token,
        refreshToken: newRefreshToken || currentRefreshToken,
      });

      // Reschedule proactive timer for the newly issued token
      scheduleProactiveRefresh(token);

      return token;
    } catch (error) {
      // Refresh token is expired, revoked, or invalid -> hard logout
      handleAuthFailure(true);
      throw error;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

// ── Multi-Tab Synchronization & App Boot ──────────────────────

let isInitialized = false;

export const initTokenManager = (): void => {
  if (isInitialized || typeof window === 'undefined') return;
  isInitialized = true;

  // 1. If an existing token is already in storage, schedule proactive refresh
  const existingToken = getAccessToken();
  if (existingToken) {
    scheduleProactiveRefresh(existingToken);
  }

  // 2. Multi-tab synchronization via window 'storage' event
  window.addEventListener('storage', (event) => {
    if (event.key === AUTH_TOKEN_KEY) {
      if (event.newValue) {
        // Another tab refreshed the token -> update local proactive timer
        scheduleProactiveRefresh(event.newValue);
      } else {
        // Another tab logged out -> clean up current tab
        cancelProactiveRefresh();
        if (onLogoutCallback) {
          onLogoutCallback();
        }
      }
    }
  });
};
