import { useQuery } from "@tanstack/react-query";
import { TOKEN_QUERY_KEY, useToken } from "./useToken";
import { fetchQuestions } from "@/api/questions.service";
import type { TriviaError } from "@/api/trivia.errors";
import { refreshToken } from "@/stores/token.manager";
import { queryClient } from "@/lib/queryClient";

export interface Question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface QuestionResponse {
  response_code: number;
  results: Question[];
}

export interface QuestionParams {
  amount: number | null;
  type?: "multiple" | "boolean";
  category?: number | null;
  difficulty?: "easy" | "medium" | "hard";
}

export const useQuestions = (params: QuestionParams, enabled = true) => {
  const { data: token } = useToken();

  return useQuery({
    queryKey: [
      "public-trivia_questions",
      params.amount,
      params.type,
      params.category ?? "all",
      params.difficulty ?? "any",
    ],

    enabled: enabled && !!token,
    queryFn: async () => {
      if (!token) {
        throw { type: "TOKEN_INVALID" } satisfies TriviaError;
      }

      const query = new URLSearchParams({
        amount: String(params.amount),
        token,
      });

      if (params.type) query.append("type", params.type);
      if (params.category != null)
        query.append("category", String(params.category));

      if (params.difficulty)
        query.append("difficulty", String(params.difficulty));

      const data: QuestionResponse = await fetchQuestions(query);

      switch (data.response_code) {
        case 0:
          return data.results;

        case 3:
          await refreshToken();
          queryClient.invalidateQueries({ queryKey: TOKEN_QUERY_KEY });
          throw { type: "TOKEN_INVALID" } satisfies TriviaError;

        case 4:
          await refreshToken();
          queryClient.invalidateQueries({ queryKey: TOKEN_QUERY_KEY });
          throw { type: "TOKEN_EXHAUSTED" } satisfies TriviaError;

        default:
          throw { type: "UKNOWN" } satisfies TriviaError;
      }
    },

    retry: (count, error) => {
      if (typeof error === "object" && error && "type" in error) {
        return false;
      }

      return count < 1;
    },
  });
};
