import { axiosInstance } from "@/lib/axios";

interface TokenResponse {
  response_code: number;
  response_message: string;
  token: string;
}

interface ResetTokenResponse {
  response_code: number;
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

export const resetToken = async (token: string): Promise<string> => {
  const { data } = await axiosInstance.get<ResetTokenResponse>(
    `/api_token.php?command=reset&token=${token}`,
  );

  if (!data.token) {
    throw new Error("Failed to fetch token");
  }

  return data.token;
};
