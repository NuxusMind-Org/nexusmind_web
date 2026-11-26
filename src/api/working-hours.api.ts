import { apiClient } from './client';
import type {
  WorkingHourRangeRequest,
  WorkingHoursBatchRequest,
  WorkingRangeDto,
  AvailableSlotDto,
} from './types';

export const workingHoursApi = {
  getMyRanges: async (from: string, to: string): Promise<WorkingRangeDto[]> => {
    const response = await apiClient.get<WorkingRangeDto[]>('/doctors/me/working-hours', {
      params: { from, to },
    });
    return response.data;
  },

  addMyRange: async (data: WorkingHourRangeRequest): Promise<void> => {
    await apiClient.post('/doctors/me/working-hours', data);
  },

  addMyWorkingHoursBatch: async (data: WorkingHoursBatchRequest): Promise<void> => {
    await apiClient.post('/doctors/me/working-hours/batch', data);
  },

  deleteMyRange: async (rangeId: number): Promise<void> => {
    await apiClient.delete(`/doctors/me/working-hours/${rangeId}`);
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
