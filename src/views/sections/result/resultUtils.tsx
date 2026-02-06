import {
  BicepsFlexedIcon,
  HandMetalIcon,
  StarIcon,
  ThumbsUpIcon,
} from "lucide-react";
import type { ReactNode } from "react";

export const toSentenceCase = (str?: string) => {
  if (!str) return "";

  const words = str.split(" ");
  const capitalizedWords = words.map((word) => {
    if (word.length === 0) return "";

    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(" ");
};

export const triviaTypeLabel = (type?: string) =>
  type === "multiple" ? "Multiple Choice" : "True / False";

export const getResultPercentage = (correct: number, total: number) =>
  total > 0 ? Math.round((correct / total) * 100) : 0;

type PerformanceColor = "bg-green-500" | "bg-secondary" | "bg-primary";

export const performanceConfig = (
  percentage: number,
): {
  message: ReactNode;
  color: PerformanceColor;
} => {
  if (percentage >= 90)
    return {
      message: (
        <>
          Outstanding! <HandMetalIcon className="fill-secondary" />
        </>
      ),
      color: "bg-green-500",
    };

  if (percentage >= 70)
    return {
      message: (
        <>
          Great job! <StarIcon className="fill-secondary" />
        </>
      ),
      color: "bg-green-500",
    };

  if (percentage >= 50)
    return {
      message: (
        <>
          Good effort! <ThumbsUpIcon className="fill-secondary" />
        </>
      ),
      color: "bg-secondary",
    };

  return {
    message: (
      <>
        Keep practicing! <BicepsFlexedIcon className="fill-secondary" />
      </>
    ),
    color: "bg-primary",
  };
};
