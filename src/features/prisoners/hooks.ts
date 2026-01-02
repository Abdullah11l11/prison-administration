import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { prisonersApi } from './api';
import type { Prisoner } from '@/types';

export const usePrisoners = () => {
  return useQuery({
    queryKey: ['prisoners'],
    queryFn: prisonersApi.getAll,
  });
};

export const usePrisoner = (id: number) => {
  return useQuery({
    queryKey: ['prisoners', id],
    queryFn: () => prisonersApi.getById(id),
    enabled: !!id,
  });
};

export const useCreatePrisoner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: prisonersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prisoners'] });
    },
  });
};

export const useUpdatePrisoner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Prisoner> }) =>
      prisonersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prisoners'] });
    },
  });
};

export const useDeletePrisoner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: prisonersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prisoners'] });
    },
  });
};
