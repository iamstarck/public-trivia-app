import { create } from "zustand";

type Screen = "home" | "category" | "quiz";
export type Difficulty = "easy" | "medium" | "hard" | null;
export type QuizType = "multiple" | "boolean" | null;

interface TriviaState {
  screen: Screen;
  userName: string;
  amount: number;
  category?: number | null;
  categoryName: string;
  difficulty?: Difficulty;
  quizType?: QuizType;

  setScreen: (screen: Screen) => void;
  setUserName: (data: { playerName: string }) => void;
  setAmount: (n: number) => void;
  setDifficulty: (d: Difficulty) => void;
  setQuizType: (t: QuizType) => void;
  setCategory: (c?: number | null, name?: string) => void;
  changeUser: () => void;
}

const useTriviaStore = create<TriviaState>((set) => ({
  screen: "home",
  userName: "",
  amount: 20,
  difficulty: null as Difficulty | null,
  category: null,
  categoryName: "",
  quizType: null as QuizType | null,

  setScreen: (screen) => set({ screen }),
  setUserName: (data) => set({ userName: data.playerName, screen: "category" }),

  changeUser: () =>
    set({
      userName: "",
      screen: "home",
    }),

  setAmount: (n) => set({ amount: n }),
  setDifficulty: (d) => set({ difficulty: d }),
  setQuizType: (t) => set({ quizType: t }),
  setCategory: (c?: number | null, name?: string) =>
    set({
      category: c ?? null,
      categoryName: name ?? "",
    }),
}));

export default useTriviaStore;
