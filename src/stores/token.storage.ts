const TOKEN_STORAGE_KEY = "trivia_token";

export const getStoredToken = (): string | null =>
  localStorage.getItem(TOKEN_STORAGE_KEY);

export const setStoredToken = (token: string) =>
  localStorage.setItem(TOKEN_STORAGE_KEY, token);

export const clearStoredToken = () =>
  localStorage.removeItem(TOKEN_STORAGE_KEY);
