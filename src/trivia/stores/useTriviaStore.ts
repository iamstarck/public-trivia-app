import { create } from "zustand";
import type { TriviaQuestion } from "../normalizer";

type Screen = "home" | "configuration" | "trivia" | "result";
export type Difficulty = "easy" | "medium" | "hard";
export type TriviaType = "multiple" | "boolean";

interface TriviaState {
  screen: Screen;
  userName: string;
  amount: number | null;
  category?: number;
  categoryName: string;
  difficulty?: Difficulty;
  triviaType?: TriviaType;
  questions: TriviaQuestion[];
  answers: Record<number, number>;
  currentIndex: number;
  correct: number;
  incorrect: number;
  answerFeedback: boolean;

  setScreen: (screen: Screen) => void;
  setUserName: (data: { playerName: string }) => void;
  setAmount: (n: number) => void;
  setDifficulty: (d: Difficulty) => void;
  setTriviaType: (t: TriviaType) => void;
  setCategory: (c?: number | null, name?: string) => void;
  setQuestions: (qs: TriviaQuestion[]) => void;
  nextQuestion: () => void;
  addAnswer: (q: number, a: number) => void;
  submitAnswer: (isCorrect: boolean) => void;
  showAnswerFeedback: (feedback: boolean) => void;

  reset: () => void;
}

const useTriviaStore = create<TriviaState>((set) => ({
  screen: "home",
  userName: "",
  amount: null,
  difficulty: undefined,
  category: undefined,
  categoryName: "",
  triviaType: undefined,
  questions: [],
  currentIndex: 0,
  answers: {},
  correct: 0,
  incorrect: 0,
  answerFeedback: false,

  setScreen: (screen) => set({ screen }),
  setUserName: (data) =>
    set({ userName: data.playerName, screen: "configuration" }),

  setAmount: (n) => set({ amount: n }),
  setDifficulty: (d?) => set({ difficulty: d ?? undefined }),
  setTriviaType: (t?) => set({ triviaType: t ?? undefined }),
  setCategory: (c?: number | null, name?: string) =>
    set({
      category: c ?? undefined,
      categoryName: name ?? "",
    }),

  setQuestions: (qs: TriviaQuestion[]) =>
    set({
      questions: qs,
      currentIndex: 0,
      answers: {},
      correct: 0,
      incorrect: 0,
    }),

  nextQuestion: () =>
    set((s) => {
      const nextIndex = s.currentIndex + 1;

      if (s.amount !== null && nextIndex >= s.amount) {
        return {
          currentIndex: nextIndex,
          screen: "result",
          answerFeedback: false,
        };
      }

      return { currentIndex: nextIndex, answerFeedback: false };
    }),

  addAnswer: (qIndex, aIndex) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [qIndex]: aIndex,
      },
    })),

  submitAnswer: (isCorrect) =>
    set((s) => ({
      correct: isCorrect ? s.correct + 1 : s.correct,
      incorrect: !isCorrect ? s.incorrect + 1 : s.incorrect,
    })),

  showAnswerFeedback: (feedback) => set({ answerFeedback: feedback }),

  reset: () =>
    set({
      screen: "home",
      userName: "",
      amount: null,
      difficulty: undefined,
      category: undefined,
      categoryName: "",
      triviaType: undefined,
      questions: [],
      currentIndex: 0,
      answers: {},
      correct: 0,
      incorrect: 0,
      answerFeedback: false,
    }),
}));

export default useTriviaStore;
