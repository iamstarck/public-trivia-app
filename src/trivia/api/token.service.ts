import { axiosInstance } from "@/lib/axios";

interface TokenResponse {
  response_code: number;
  response_message: string;
  token: string;
}

let cachedToken: string | null = null;
export const TOKEN_VAR = "public-trivia_token";

const getToken = async (): Promise<string> => {
  if (cachedToken) return cachedToken;

  const local = localStorage.getItem(TOKEN_VAR);
  if (local) {
    cachedToken = local;

    return local;
  }

  const response = await axiosInstance.get<TokenResponse>(
    "/api_token.php?command=request",
  );
  cachedToken = response.data.token;
  localStorage.setItem(TOKEN_VAR, cachedToken);

  return cachedToken;
};

const clearToken = () => {
  cachedToken = null;
  localStorage.removeItem(TOKEN_VAR);
};

export { getToken, clearToken };
