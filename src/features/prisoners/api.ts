import apiClient from '@/lib/api-client';
import { Prisoner } from '@/types';

export const prisonersApi = {
  getAll: async (): Promise<Prisoner[]> => {
    const response = await apiClient.get<Prisoner[]>('/api/prisoners');
    return response.data;
  },

  getById: async (id: number): Promise<Prisoner> => {
    const response = await apiClient.get<Prisoner>(`/api/prisoners/${id}`);
    return response.data;
  },

  create: async (prisoner: Omit<Prisoner, 'id'>): Promise<Prisoner> => {
    const response = await apiClient.post<Prisoner>('/api/prisoners', prisoner);
    return response.data;
  },

  update: async (id: number, prisoner: Partial<Prisoner>): Promise<Prisoner> => {
    const response = await apiClient.patch<Prisoner>(`/api/prisoners/${id}`, prisoner);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/prisoners/${id}`);
  },
};
