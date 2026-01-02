import apiClient from "@/lib/api-client";
import type { Case } from "@/types";

export const casesApi = {
  getAll: async (): Promise<Case[]> => {
    const response = await apiClient.get<Case[]>("/api/cases");
    return response.data;
  },

  create: async (payload: Omit<Case, "id">): Promise<Case> => {
    const response = await apiClient.post<Case>("/api/cases", payload);
    return response.data;
  },

  update: async (id: number, payload: Partial<Case>): Promise<Case> => {
    const response = await apiClient.patch<Case>(`/api/cases/${id}`, payload);
    return response.data;
  },
};
