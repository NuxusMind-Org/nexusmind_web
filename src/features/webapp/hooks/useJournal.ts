import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { journalApi } from '@/api/journal.api';
import type { JournalEntryRequest, JournalEntryResponse, PageJournalEntryResponse } from '@/api/types';

export const JOURNAL_QUERY_KEYS = {
  all: ['journal'] as const,
  today: () => [...JOURNAL_QUERY_KEYS.all, 'today'] as const,
  history: (params?: { page?: number; size?: number }) => [...JOURNAL_QUERY_KEYS.all, 'history', params] as const,
  detail: (id?: number) => [...JOURNAL_QUERY_KEYS.all, 'detail', id] as const,
};

export const useTodayJournal = () => {
  return useQuery<JournalEntryResponse | null>({
    queryKey: JOURNAL_QUERY_KEYS.today(),
    queryFn: async () => {
      try {
        return await journalApi.getToday();
      } catch {
        return null;
      }
    },
    staleTime: 2 * 60 * 1000,
  });
};

export const useJournalHistory = (params?: { page?: number; size?: number }) => {
  return useQuery<PageJournalEntryResponse>({
    queryKey: JOURNAL_QUERY_KEYS.history(params),
    queryFn: async () => {
      return await journalApi.getHistory(params);
    },
    staleTime: 2 * 60 * 1000,
  });
};

export const useJournalById = (id?: number) => {
  return useQuery<JournalEntryResponse | null>({
    queryKey: JOURNAL_QUERY_KEYS.detail(id),
    queryFn: async () => {
      if (!id) return null;
      return await journalApi.getById(id);
    },
    enabled: !!id,
  });
};

export const useSaveJournal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: JournalEntryRequest): Promise<JournalEntryResponse> => {
      return await journalApi.saveToday(data);
    },
    onSuccess: (savedEntry) => {
      queryClient.setQueryData(JOURNAL_QUERY_KEYS.today(), savedEntry);
      queryClient.invalidateQueries({ queryKey: JOURNAL_QUERY_KEYS.all });
    },
  });
};

export const useDeleteJournal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await journalApi.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: JOURNAL_QUERY_KEYS.all });
    },
  });
};
