import apiClient from "@/lib/api-client";
import type { Visit } from "@/types";

export const visitsApi = {
  getAll: async (): Promise<Visit[]> => {
    const response = await apiClient.get<Visit[]>("/api/visits");
    return response.data;
  },

  create: async (payload: Omit<Visit, "id">): Promise<Visit> => {
    const response = await apiClient.post<Visit>("/api/visits", payload);
    return response.data;
  },

  update: async (id: number, payload: Partial<Visit>): Promise<Visit> => {
    const response = await apiClient.patch<Visit>(`/api/visits/${id}`, payload);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/visits/${id}`);
  },
};
