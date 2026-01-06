import { axiosInstance } from "@/lib/axios";
import { setStoredToken } from "../stores/token.storage";

interface TokenResponse {
  response_code: number;
  response_message: string;
  token: string;
}

export const requestToken = async (): Promise<string> => {
  const { data } = await axiosInstance.get<TokenResponse>(
    "/api_token.php?command=request",
  );

  if (!data.token) {
    throw new Error("Failed to fetch token");
  }

  setStoredToken(data.token);

  return data.token;
};
