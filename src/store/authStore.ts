import { create } from 'zustand';
import { clearTokens, cancelProactiveRefresh, registerOnLogoutCallback, hasValidSession } from '@/api/tokenManager';
import { authApi } from '@/features/auth/api/auth.api';

interface AuthState {
  user: Record<string, unknown> | null;
  isAuthenticated: boolean;
  login: (userData?: Record<string, unknown>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Register callback so tokenManager can reset Zustand state on auth failure
  registerOnLogoutCallback(() => {
    set({ user: null, isAuthenticated: false });
  });

  return {
    user: null,
    isAuthenticated: hasValidSession(),
    login: (userData = {}) => set({ user: userData, isAuthenticated: true }),
    logout: () => {
      // Fire-and-forget server-side session invalidation
      authApi.logout().catch(() => {});
      cancelProactiveRefresh();
      clearTokens();
      set({ user: null, isAuthenticated: false });
    },
  };
});

