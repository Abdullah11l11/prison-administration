export const ADMIN_TOKEN_KEY = 'admin-token';

const isStorageAvailable = () =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export function getToken(): string | null {
  if (!isStorageAvailable()) return null;
  return window.localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setToken(token: string) {
  if (!isStorageAvailable()) return;
  window.localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearToken() {
  if (!isStorageAvailable()) return;
  window.localStorage.removeItem(ADMIN_TOKEN_KEY);
}
