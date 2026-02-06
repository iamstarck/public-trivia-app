import { axiosInstance } from "@/lib/axios";

export const fetchQuestions = async (params: URLSearchParams) => {
  const { data } = await axiosInstance.get(`/api.php?${params.toString()}`);

  return data;
};
