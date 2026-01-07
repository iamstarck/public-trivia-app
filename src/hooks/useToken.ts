import { requestToken } from "@/trivia/api/token.service";
import { useQuery } from "@tanstack/react-query";

export const TOKEN_QUERY_KEY = ["public-trivia_token"];

export const useToken = () =>
  useQuery({
    queryKey: TOKEN_QUERY_KEY,
    queryFn: requestToken,

    staleTime: Infinity,
    gcTime: Infinity,
  });
