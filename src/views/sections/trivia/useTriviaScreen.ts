import { useQuestions } from "@/hooks/useQuestions";
import { normalizeQuestions } from "@/lib/normalizer";
import useTriviaStore from "@/stores/useTriviaStore";
import { useEffect } from "react";

export const useTriviaScreen = () => {
  const {
    userName,
    amount,
    category,
    categoryName,
    difficulty,
    triviaType,
    questions,
    timer,
    initTimer,
    stopTimer,
    currentIndex,
    correct,
    incorrect,
    answerFeedback,
    answers,
    addAnswer,
    submitAnswer,
    nextQuestion,
    showAnswerFeedback,
    setQuestions,
    setScreen,
  } = useTriviaStore();

  const { data, isLoading, error, refetch } = useQuestions({
    amount,
    type: triviaType,
    category,
    difficulty,
  });

  useEffect(() => {
    if (!error) return;

    if (
      typeof error === "object" &&
      "type" in error &&
      (error.type === "TOKEN_INVALID" || error.type === "TOKEN_EXHAUSTED")
    ) {
      setScreen("configuration");
    }
  }, [error, setScreen]);

  useEffect(() => {
    if (!data || !triviaType) return;

    const normalized = normalizeQuestions(data, triviaType);
    setQuestions(normalized);
  }, [data, triviaType, setQuestions]);

  const currentQuestion = questions[currentIndex];

  const onHandleAnswer = (answerIndex: number) => {
    if (answerFeedback) return;

    const q = questions[currentIndex];
    if (!q) return;

    const isCorrect = answerIndex === q.correctIndex;

    addAnswer(currentIndex, answerIndex);
    submitAnswer(isCorrect);

    showAnswerFeedback(true);
    setTimeout(nextQuestion, 1000);
  };

  const getButtonClass = (answerIndex: number) => {
    if (!answerFeedback) {
      return "";
    }

    if (answerIndex === currentQuestion.correctIndex) {
      return "bg-green-500";
    }

    if (
      answerIndex === answers[currentIndex] &&
      answerIndex !== currentQuestion.correctIndex
    ) {
      return "bg-primary";
    }

    return "";
  };

  return {
    userName,
    categoryName,
    amount,
    questions,
    timer,
    initTimer,
    stopTimer,
    correct,
    incorrect,
    isLoading,
    error,
    refetch,
    currentQuestion,
    currentIndex,
    onHandleAnswer,
    getButtonClass,
    answerFeedback,
  };
};
