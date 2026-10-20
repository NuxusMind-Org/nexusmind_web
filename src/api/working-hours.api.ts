import { apiClient } from './client';
import type {
  DayTemplate,
  SaveWeeklyTemplateRequest,
  AvailableSlotDto,
} from './types';

export const workingHoursApi = {
  getMyTemplate: async (): Promise<DayTemplate[]> => {
    const response = await apiClient.get<DayTemplate[]>('/doctors/me/working-hours/template');
    return response.data;
  },

  saveMyTemplate: async (
    data: DayTemplate[] | SaveWeeklyTemplateRequest
  ): Promise<void> => {
    const payload = Array.isArray(data) ? { days: data } : data;
    await apiClient.post('/doctors/me/working-hours/template', payload);
  },

  getAvailableSlots: async (
    doctorId: number,
    from: string,
    to: string
  ): Promise<AvailableSlotDto[]> => {
    const response = await apiClient.get<AvailableSlotDto[]>(
      `/doctors/${doctorId}/working-hours/available`,
      {
        params: { from, to },
      }
    );
    return response.data;
  },
};
