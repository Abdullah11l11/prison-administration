import apiClient from "@/lib/api-client";
import type { HealthRecord } from "@/types";

export const healthRecordsApi = {
  getAll: async (): Promise<HealthRecord[]> => {
    const response = await apiClient.get<HealthRecord[]>("/api/health-records");
    return response.data;
  },

  create: async (payload: Omit<HealthRecord, "id">): Promise<HealthRecord> => {
    const response = await apiClient.post<HealthRecord>("/api/health-records", payload);
    return response.data;
  },

  update: async (id: number, payload: Partial<HealthRecord>): Promise<HealthRecord> => {
    const response = await apiClient.patch<HealthRecord>(`/api/health-records/${id}`, payload);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/health-records/${id}`);
  },
};
