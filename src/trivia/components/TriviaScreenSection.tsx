import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuestions } from "@/hooks/useQuestions";
import useTriviaStore from "../stores/useTriviaStore";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import { normalizeQuestions } from "../normalizer";
import AnswersButton from "./atoms/AnswersButton";
import { CircleCheckIcon, CircleXIcon } from "lucide-react";

const TriviaScreenSection = () => {
  const {
    userName,
    amount,
    category,
    categoryName,
    difficulty,
    triviaType,
    questions,
    currentIndex,
    addAnswer,
    correct,
    incorrect,
    answerFeedback,
    answers,
  } = useTriviaStore();

  const { data, isLoading, error, refetch } = useQuestions({
    amount,
    type: triviaType,
    category,
    difficulty,
  });

  const setScreen = useTriviaStore((q) => q.setScreen);
  const setQuestions = useTriviaStore((q) => q.setQuestions);
  const submitAnswer = useTriviaStore((a) => a.submitAnswer);
  const nextQuestion = useTriviaStore((q) => q.nextQuestion);
  const showAnswerFeedback = useTriviaStore((s) => s.showAnswerFeedback);

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
    const isCorrect = answerIndex === q.correctIndex;

    addAnswer(currentIndex, answerIndex);
    submitAnswer(isCorrect);

    showAnswerFeedback(true);
    setTimeout(nextQuestion, 1500);
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
              {/* <h2 className="text-accent">10:00</h2> */}
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
          <div className="border-4 py-2 px-4 bg-green-500">
            <p className="text-lg flex items-center gap-2 font-medium">
              <CircleCheckIcon /> <span>{correct}</span>
            </p>
          </div>
          <div className="border-4 py-2 px-4 bg-red-500">
            <p className="text-lg flex items-center gap-2 font-medium">
              <CircleXIcon /> <span>{incorrect}</span>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TriviaScreenSection;
