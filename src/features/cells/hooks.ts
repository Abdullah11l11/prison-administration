import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Cell } from "@/types";
import { cellsApi } from "./api";

export const useCells = () => {
  return useQuery({
    queryKey: ["cells"],
    queryFn: cellsApi.getAll,
  });
};

export const useCreateCell = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cellsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cells"] });
    },
  });
};

export const useUpdateCell = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Cell> }) =>
      cellsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cells"] });
    },
  });
};
