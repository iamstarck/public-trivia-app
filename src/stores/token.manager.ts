import { requestToken } from "../api/token.service";
import {
  clearStoredToken,
  getStoredToken,
  setStoredToken,
} from "./token.storage";

export const getValidatedToken = async (): Promise<string> => {
  const stored = getStoredToken();
  if (stored) return stored;

  const token = await requestToken();
  setStoredToken(token);

  return token;
};

export const refreshToken = async (): Promise<string> => {
  clearStoredToken();
  const token = await requestToken();
  setStoredToken(token);

  return token;
};
