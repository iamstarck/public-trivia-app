import type { Question } from "@/hooks/useQuestions";
import he from "he";
import type { TriviaType } from "./stores/useTriviaStore";

export interface TriviaQuestion {
  question: string;
  answers: string[];
  correctIndex: number;
}

export const normalizeQuestions = (
  raw: Question[],
  triviaType: TriviaType
): TriviaQuestion[] => {
  return raw.map((q) => {
    const decodedQuestion = he.decode(q.question);

    const decodedCorrect = he.decode(q.correct_answer);
    const decodedIncorrect = q.incorrect_answers.map((a) => he.decode(a));

    let answers: string[];

    if (triviaType === "multiple") {
      answers = [...decodedIncorrect, decodedCorrect].sort(
        () => Math.random() - 0.5
      );
    } else {
      answers = ["True", "False"];
    }

    return {
      question: decodedQuestion,
      answers,
      correctIndex: answers.indexOf(he.decode(q.correct_answer)),
    };
  });
};
