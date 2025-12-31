import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TOKEN_QUERY_KEY } from "./useToken";
import { fetchQuestions } from "@/trivia/api/questions.service";
import { requestToken } from "@/trivia/api/token.service";

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

  return useQuery({
    queryKey: [
      "public-trivia_questions",
      params.amount,
      params.type,
      params.category ?? "all",
      params.difficulty ?? "any",
    ],

    enabled,
    queryFn: async () => {
      const token = await queryClient.fetchQuery({
        queryKey: TOKEN_QUERY_KEY,
        queryFn: requestToken,
      });

      if (!token) {
        throw new Error("Token not ready");
      }

      const query = new URLSearchParams();

      query.append("amount", String(params.amount));
      query.append("token", token);

      if (params.type) query.append("type", params.type);
      if (params.category != null)
        query.append("category", String(params.category));

      if (params.difficulty) query.append("difficulty", params.difficulty);

      if (params.category) query.append("category", String(params.category));
      if (params.difficulty)
        query.append("difficulty", String(params.difficulty));

      const data: QuestionResponse = await fetchQuestions(query);

      if (data.response_code === 3 || data.response_code === 4) {
        queryClient.invalidateQueries({ queryKey: TOKEN_QUERY_KEY });
        throw new Error("public-trivia_token invalid");
      }

      return data.results;
    },

    retry: 1,
  });
};
