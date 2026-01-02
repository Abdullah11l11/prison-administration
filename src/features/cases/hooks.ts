import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Case } from "@/types";
import { casesApi } from "./api";

export const useCases = () => {
  return useQuery({
    queryKey: ["cases"],
    queryFn: casesApi.getAll,
  });
};

export const useCreateCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: casesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
    },
  });
};

export const useUpdateCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Case> }) =>
      casesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
    },
  });
};
