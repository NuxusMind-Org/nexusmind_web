import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BookedSession {
  id: string;
  psychologistId: number;
  psychologistName: string;
  psychologistImage: string;
  date: number;
  time: string; // e.g., '14:00 - 14:45'
  status: 'upcoming' | 'completed';
}

interface SessionState {
  sessions: BookedSession[];
  bookSession: (session: Omit<BookedSession, 'id' | 'status'>) => void;
  clearSessions: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      sessions: [],
      bookSession: (sessionData) => 
        set((state) => ({
          sessions: [
            ...state.sessions, 
            { 
              ...sessionData, 
              id: Math.random().toString(36).substr(2, 9),
              status: 'upcoming'
            }
          ]
        })),
      clearSessions: () => set({ sessions: [] }),
    }),
    {
      name: 'session-storage',
    }
  )
);
