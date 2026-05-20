import { create } from 'zustand';

interface AuthState {
  user: Record<string, unknown> | null;
  isAuthenticated: boolean;
  login: (userData: Record<string, unknown>) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => {
    localStorage.removeItem('auth_token');
    set({ user: null, isAuthenticated: false });
  },
}));
