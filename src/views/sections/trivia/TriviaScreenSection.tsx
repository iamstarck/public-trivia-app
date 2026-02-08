import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import ScoreBox from "@/views/components/ScoreBox";
import { CircleCheckIcon, CircleXIcon } from "lucide-react";
import { useTriviaScreen } from "./useTriviaScreen";
import AnswersButton from "@/views/components/AnswersButton";
import Countdown from "@/views/components/Countdown";
import { useEffect } from "react";
import { useTriviaTimer } from "./useTriviaTimer";

const TriviaScreenSection = () => {
  const {
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
  } = useTriviaScreen();

  useEffect(() => {
    initTimer();

    return () => stopTimer();
  }, [initTimer, stopTimer]);

  useTriviaTimer();

  if (error) {
    return (
      <div className="flex flex-col items-center min-h-screen justify-center gap-4">
        <h1 className="text-3xl font-bold text-center">
          {typeof error === "object" && "type" in error
            ? "Something went wrong"
            : "Network error"}
        </h1>
        <Button variant="brutal" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center min-h-screen justify-center">
        <Spinner />
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="flex flex-col items-center min-h-screen justify-center">
        <p className="text-center">Invalid trivia state</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <Card className="m-4 w-full max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              <h2>Player: {userName}</h2>
              <Countdown timeLeft={timer} />
            </div>
          </CardTitle>
          <CardDescription className="text-base font-extrabold">
            Category: {categoryName}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-8 items-center">
          <div className="w-full">
            <p className="font-medium text-lg">
              Question {currentIndex + 1} of {amount}
            </p>
            <h1 className="text-xl lg:text-2xl font-extrabold leading-tight select-none">
              {questions[currentIndex].question}
            </h1>
          </div>

          <AnswersButton
            questions={questions}
            currentIndex={currentIndex}
            onHandleAnswer={onHandleAnswer}
            answerFeedback={answerFeedback}
            buttonColorClass={getButtonClass}
          />
        </CardContent>

        <CardFooter className="flex gap-4 justify-center mt-8">
          <ScoreBox icon={<CircleCheckIcon />} value={correct} color="green" />
          <ScoreBox icon={<CircleXIcon />} value={incorrect} color="red" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default TriviaScreenSection;
