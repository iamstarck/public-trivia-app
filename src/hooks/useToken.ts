import { getValidatedToken } from "@/trivia/stores/token.manager";
import { useQuery } from "@tanstack/react-query";

export const TOKEN_QUERY_KEY = ["public-trivia_token"];

export const useToken = () =>
  useQuery({
    queryKey: TOKEN_QUERY_KEY,
    queryFn: getValidatedToken,

    staleTime: Infinity,
    gcTime: Infinity,
  });
