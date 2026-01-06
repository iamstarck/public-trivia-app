import { requestToken } from "@/trivia/api/token.service";
import { getStoredToken } from "@/trivia/stores/token.storage";
import { useQuery } from "@tanstack/react-query";

export const TOKEN_QUERY_KEY = ["public-trivia_token"];

export const useToken = () =>
  useQuery({
    queryKey: TOKEN_QUERY_KEY,
    queryFn: requestToken,

    initialData: () => {
      const token = getStoredToken();

      return token ?? undefined;
    },

    staleTime: Infinity,
    gcTime: Infinity,
  });
