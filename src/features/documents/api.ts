import apiClient from "@/lib/api-client";
import type { Document } from "@/types";

export const documentsApi = {
  getAll: async (): Promise<Document[]> => {
    const response = await apiClient.get<Document[]>("/api/documents");
    return response.data;
  },

  create: async (payload: Omit<Document, "id">): Promise<Document> => {
    const response = await apiClient.post<Document>("/api/documents", payload);
    return response.data;
  },

  update: async (id: number, payload: Partial<Document>): Promise<Document> => {
    const response = await apiClient.patch<Document>(`/api/documents/${id}`, payload);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/documents/${id}`);
  },
};
