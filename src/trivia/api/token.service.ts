import { axiosInstance } from "@/lib/axios";

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

  return data.token;
};
