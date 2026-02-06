import useTriviaStore from "@/stores/useTriviaStore";
import { useCategories } from "@/hooks/useCategories";

export const useTriviaConfiguration = () => {
  const store = useTriviaStore();

  const { data, isLoading, isError } = useCategories();

  const categories = data ?? [];
  const amounts = [10, 15, 20];

  const canPlay =
    store.category !== undefined &&
    store.difficulty !== undefined &&
    store.triviaType !== undefined &&
    store.amount !== null;

  return {
    ...store,
    categories,
    amounts,
    isLoading,
    isError,
    canPlay,
  };
};
