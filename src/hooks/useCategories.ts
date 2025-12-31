import fetchCategories, {
  EXCLUDED,
  removePrefix,
} from "@/trivia/api/categories.service";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () =>
  useQuery({
    queryKey: ["public-trivia_categories"],
    queryFn: fetchCategories,
    staleTime: Infinity,
    select: (cats) =>
      cats
        .filter((c) => !EXCLUDED.includes(c.id))
        .map((c) => ({ ...c, name: removePrefix(c.name) })),
  });
