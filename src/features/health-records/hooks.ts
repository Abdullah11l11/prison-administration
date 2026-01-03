import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { HealthRecord } from "@/types";
import { healthRecordsApi } from "./api";

export const useHealthRecords = () => {
  return useQuery({
    queryKey: ["health-records"],
    queryFn: healthRecordsApi.getAll,
  });
};

export const useCreateHealthRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: healthRecordsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["health-records"] });
    },
  });
};

export const useUpdateHealthRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<HealthRecord>;
    }) => healthRecordsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["health-records"] });
    },
  });
};

export const useDeleteHealthRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: healthRecordsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["health-records"] });
    },
  });
};
