import useTriviaStore from "@/stores/useTriviaStore";
import { useEffect } from "react";

export const useTriviaTimer = () => {
  const { screen, isTimerRunning, answerFeedback, tickTimer } =
    useTriviaStore();

  useEffect(() => {
    if (screen !== "trivia") return;
    if (!isTimerRunning) return;
    if (answerFeedback) return;

    const interval = setInterval(tickTimer, 1000);

    return () => clearInterval(interval);
  }, [screen, isTimerRunning, answerFeedback, tickTimer]);
};
