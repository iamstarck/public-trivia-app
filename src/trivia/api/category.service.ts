import { axiosInstance } from "@/lib/axios";

interface Category {
  id: number;
  name: string;
}

interface CategoryResponse {
  trivia_categories: Category[];
}

const EXCLUDED = [13, 19, 24, 25, 26, 27, 28, 29, 30];

const removePrefix = (name: string) => {
  const idx = name.indexOf(": ");
  if (idx === -1) return name;

  return name.slice(idx + 2).trim();
};

const fetchCategories = async (): Promise<Category[]> => {
  const response =
    await axiosInstance.get<CategoryResponse>("/api_category.php");

  const filtered = response.data.trivia_categories
    .filter((cat: { id: number }) => !EXCLUDED.includes(cat.id))
    .map((cat: { id: number; name: string }) => ({
      ...cat,
      name: removePrefix(cat.name),
    }));

  return filtered;
};

export default fetchCategories;
