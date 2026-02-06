import { axiosInstance } from "@/lib/axios";

interface Category {
  id: number;
  name: string;
}

interface CategoryResponse {
  trivia_categories: Category[];
}

export const EXCLUDED = [13, 19, 24, 25, 26, 27, 28, 29, 30];

export const removePrefix = (name: string) => {
  const idx = name.indexOf(": ");
  if (idx === -1) return name;

  return name.slice(idx + 2).trim();
};

const fetchCategories = async (): Promise<Category[]> => {
  const response =
    await axiosInstance.get<CategoryResponse>("/api_category.php");

  return response.data.trivia_categories;
};

export default fetchCategories;
