import apiClient from "@/lib/api-client";
import type { Staff } from "@/types";

export const staffApi = {
  getAll: async (): Promise<Staff[]> => {
    const response = await apiClient.get<Staff[]>("/api/staff");
    return response.data;
  },

  create: async (payload: Omit<Staff, "id">): Promise<Staff> => {
    const response = await apiClient.post<Staff>("/api/staff", payload);
    return response.data;
  },

  update: async (id: number, payload: Partial<Staff>): Promise<Staff> => {
    const response = await apiClient.patch<Staff>(`/api/staff/${id}`, payload);
    return response.data;
  },
};
