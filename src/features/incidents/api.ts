import apiClient from "@/lib/api-client";
import type { Incident } from "@/types";

export const incidentsApi = {
  getAll: async (): Promise<Incident[]> => {
    const response = await apiClient.get<Incident[]>("/api/incidents");
    return response.data;
  },

  create: async (payload: Omit<Incident, "id">): Promise<Incident> => {
    const response = await apiClient.post<Incident>("/api/incidents", payload);
    return response.data;
  },

  update: async (id: number, payload: Partial<Incident>): Promise<Incident> => {
    const response = await apiClient.patch<Incident>(`/api/incidents/${id}`, payload);
    return response.data;
  },
};
