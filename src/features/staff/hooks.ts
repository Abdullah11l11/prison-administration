import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Staff } from "@/types";
import { staffApi } from "./api";

export const useStaff = () => {
  return useQuery({
    queryKey: ["staff"],
    queryFn: staffApi.getAll,
  });
};

export const useCreateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: staffApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
  });
};

export const useUpdateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Staff> }) =>
      staffApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
  });
};
