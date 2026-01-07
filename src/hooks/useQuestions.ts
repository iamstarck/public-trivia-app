import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TOKEN_QUERY_KEY, useToken } from "./useToken";
import { fetchQuestions } from "@/trivia/api/questions.service";
import { clearStoredToken } from "@/trivia/stores/token.storage";

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
  amount: number;
  type?: "multiple" | "boolean";
  category?: number | null;
  difficulty?: "easy" | "medium" | "hard";
}

export const useQuestions = (params: QuestionParams, enabled = true) => {
  const queryClient = useQueryClient();
  const { data: token } = useToken();

  return useQuery({
    queryKey: [
      "public-trivia_questions",
      params.amount,
      params.type,
      params.category ?? "all",
      params.difficulty ?? "any",
      token,
    ],

    enabled: enabled && !!token,

    queryFn: async () => {
      if (!token) {
        throw new Error("Token not ready");
      }

      const query = new URLSearchParams();
      query.append("amount", String(params.amount));
      query.append("token", token);

      if (params.type) query.append("type", params.type);
      if (params.category != null)
        query.append("category", String(params.category));

      if (params.difficulty)
        query.append("difficulty", String(params.difficulty));

      const data: QuestionResponse = await fetchQuestions(query);

      if (data.response_code === 3 || data.response_code === 4) {
        clearStoredToken();
        queryClient.removeQueries({ queryKey: TOKEN_QUERY_KEY });

        throw new Error("Token invalid");
      }

      return data.results;
    },

    retry: 1,
  });
};
