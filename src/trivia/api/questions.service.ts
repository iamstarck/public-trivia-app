import { axiosInstance } from "@/lib/axios";

export const fetchQuestions = async (params: URLSearchParams) => {
  const { data } = await axiosInstance.get(`/api.php?${params.toString()}`);

  return data;
};

// const fetchQuestions = async (params: QuestionParams): Promise<Question[]> => {
//   const token = await getToken();
//   const query = new URLSearchParams({ amount: String(params.amount), token });

//   if (params.category) query.append("category", String(params.category));
//   if (params.difficulty) query.append("difficulty", params.difficulty);
//   if (params.type) query.append("type", params.type);

//   const response = await axiosInstance.get<QuestionResponse>(
//     `/api.php?${query.toString()}`,
//   );

//   if (response.data.response_code === 3 || response.data.response_code === 4) {
//     clearToken();

//     return fetchQuestions(params);
//   }

//   return response.data.results;
// };

// export default fetchQuestions;
