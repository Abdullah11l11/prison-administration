import apiClient from "@/lib/api-client";
import type { Cell } from "@/types";

export const cellsApi = {
  getAll: async (): Promise<Cell[]> => {
    const response = await apiClient.get<Cell[]>("/api/cells");
    return response.data;
  },

  create: async (payload: Omit<Cell, "id">): Promise<Cell> => {
    const response = await apiClient.post<Cell>("/api/cells", payload);
    return response.data;
  },

  update: async (id: number, payload: Partial<Cell>): Promise<Cell> => {
    const response = await apiClient.patch<Cell>(`/api/cells/${id}`, payload);
    return response.data;
  },
};
