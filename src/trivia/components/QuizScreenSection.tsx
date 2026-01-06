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
import { useQueryClient } from "@tanstack/react-query";
import { TOKEN_QUERY_KEY } from "@/hooks/useToken";

const QuizScreenSection = () => {
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
  } = useTriviaStore();

  const { data, isLoading, isError, refetch } = useQuestions({
    amount,
    type: triviaType,
    category,
    difficulty,
  });

  const setQuestions = useTriviaStore((q) => q.setQuestions);
  const submitAnswer = useTriviaStore((a) => a.submitAnswer);
  const nextQuestion = useTriviaStore((q) => q.nextQuestion);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!data || !triviaType) return;

    const normalized = normalizeQuestions(data, triviaType);
    setQuestions(normalized);
  }, [data, triviaType, setQuestions]);

  const currentQuestion = questions[currentIndex];

  const onHandleRetry = async () => {
    queryClient.removeQueries({ queryKey: TOKEN_QUERY_KEY });
    await refetch();
  };

  const onHandleAnswer = (answerIndex: number) => {
    const q = questions[currentIndex];
    const isCorrect = answerIndex === q.correctIndex;

    addAnswer(currentIndex, answerIndex);
    submitAnswer(isCorrect);

    nextQuestion();
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center min-h-screen justify-center gap-4">
        <h1 className="text-3xl font-bold text-center leading-normal text-primary">
          Error starting Quiz
        </h1>
        <Button variant="brutal" onClick={() => onHandleRetry()}>
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
    return null;
  }

  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <Card className="max-w-4xl lg:w-4xl m-x-4">
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
            <h1 className="text-2xl font-extrabold leading-tight">
              {questions[currentIndex].question}
            </h1>
          </div>

          <AnswersButton
            questions={questions}
            currentIndex={currentIndex}
            onHandleAnswer={onHandleAnswer}
          />
        </CardContent>

        <CardFooter className="flex gap-4 justify-center mt-8">
          <div className="border-4 py-2 px-4 bg-green-500">
            <p className="text-lg">Correct: {correct}</p>
          </div>
          <div className="border-4 py-2 px-4 bg-red-500">
            <p className="text-lg">Incorrect: {incorrect}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizScreenSection;
