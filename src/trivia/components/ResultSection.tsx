import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrophyIcon } from "lucide-react";
import useTriviaStore from "../stores/useTriviaStore";
import { cn } from "@/lib/utils";

const ResultSection = () => {
  const {
    userName,
    categoryName,
    difficulty,
    triviaType,
    amount,
    correct,
    incorrect,
    reset,
  } = useTriviaStore();

  const convertTriviaType = (triviaType?: string) => {
    if (triviaType === "multiple") {
      return "multiple choice";
    } else {
      return "True/False";
    }
  };

  const resultPercentage = Math.round((correct / amount) * 100);

  const getPerformanceMessage = () => {
    let performanceMessage = "";
    switch (true) {
      case resultPercentage >= 90:
        performanceMessage = "Outstanding! 🌟";
        break;
      case resultPercentage >= 70:
        performanceMessage = "Great job! 👏";
        break;
      case resultPercentage >= 50:
        performanceMessage = "Good effort! 👍";
        break;
      default:
        performanceMessage = "Keep practicing! 💪";
    }

    return performanceMessage;
  };

  const getPerformanceColor = () => {
    if (resultPercentage >= 70) return "bg-green-500";
    if (resultPercentage >= 50) return "bg-secondary";

    return "bg-primary";
  };

  function toSentenceCase(str?: string) {
    if (!str) {
      return "";
    }

    str = str.toLowerCase();

    const words = str.split(" ");

    const capitalizedWords = words.map((word) => {
      if (word.length === 0) return "";
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    return capitalizedWords.join(" ");
  }

  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <Card className="max-w-4xl m-4">
        <CardHeader>
          <CardTitle className="flex flex-col items-center gap-4">
            <div className="bg-secondary border-4 w-fit p-4">
              <TrophyIcon size={"4rem"} />
            </div>

            <h1>Quiz Over!</h1>
          </CardTitle>
          <CardDescription className="text-xl text-center font-extrabold">
            Well done, {userName}!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center">
          <div
            className={cn(
              "flex flex-col items-center gap-4 border-4 p-8",
              getPerformanceColor(),
            )}
          >
            <div>
              <h2 className="text-4xl font-bold text-center leading-normal">
                {resultPercentage}%
              </h2>
              <h2 className="text-2xl font-bold text-center leading-normal">
                {getPerformanceMessage()}
              </h2>
            </div>

            <div className="flex flex-col border-4 p-4 gap-4 bg-accent-foreground w-md">
              <p className="flex justify-between border-b-2 pb-2 text-base font-bold">
                CATEGORY: <span>{toSentenceCase(categoryName)}</span>
              </p>
              <p className="flex justify-between border-b-2 pb-2 text-base font-bold">
                DIFFICULTY: <span>{toSentenceCase(difficulty)}</span>
              </p>
              <p className="flex justify-between border-b-2 pb-2 text-base font-bold">
                TYPE:{" "}
                <span>{toSentenceCase(convertTriviaType(triviaType))}</span>
              </p>
              <p className="flex justify-between border-b-2 pb-2 text-base font-bold">
                TOTAL QUESTIONS: <span>{amount}</span>
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-8">
            <div className="border-4 py-4 px-8 bg-green-500">
              <p className="text-xl font-bold flex flex-col text-center">
                CORRECT<span>{correct}</span>
              </p>
            </div>
            <div className="border-4 py-4 px-8 bg-red-500">
              <p className="text-xl font-bold flex flex-col text-center">
                INCORRECT<span>{incorrect}</span>
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button onClick={() => reset()} variant={"brutal"} className="w-full">
            Take Another Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResultSection;
