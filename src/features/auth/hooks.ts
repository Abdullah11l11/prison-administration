import { useMutation } from '@tanstack/react-query';
import { fakeLogin } from './api';
import type { LoginCredentials, LoginResponse } from './types';

export function useLoginMutation() {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: fakeLogin,
  });
}
