import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { appointmentsApi } from '@/api/appointments.api';
import type { AppointmentDto, CreateAppointmentRequest } from '@/api/types';

interface SessionState {
  sessions: AppointmentDto[];
  loading: boolean;
  error: string | null;
  fetchSessions: (range?: string) => Promise<void>;
  bookSession: (data: CreateAppointmentRequest) => Promise<AppointmentDto>;
  cancelSession: (id: number) => Promise<void>;
  clearSessions: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      sessions: [],
      loading: false,
      error: null,

      fetchSessions: async (range?: string) => {
        set({ loading: true, error: null });
        try {
          const sessions = await appointmentsApi.getMyAppointments(range);
          set({ sessions, loading: false });
        } catch {
          set({ error: 'Seansları yükləmək mümkün olmadı.', loading: false });
        }
      },

      bookSession: async (data: CreateAppointmentRequest) => {
        const created = await appointmentsApi.create(data);
        set((state) => ({
          sessions: [...state.sessions, created],
        }));
        return created;
      },

      cancelSession: async (id: number) => {
        await appointmentsApi.cancel(id);
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== id),
        }));
      },

      clearSessions: () => set({ sessions: [] }),
    }),
    {
      name: 'session-storage',
    }
  )
);
