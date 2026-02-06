import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleCheckIcon, CircleXIcon, TrophyIcon } from "lucide-react";
import useTriviaStore from "../../../stores/useTriviaStore";
import { cn } from "@/lib/utils";
import {
  getResultPercentage,
  performanceConfig,
  toSentenceCase,
  triviaTypeLabel,
} from "./resultUtils";
import ResultInfoRow from "@/views/components/ResultInfoRow";
import ScoreBox from "@/views/components/ScoreBox";

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

  const percentage = getResultPercentage(correct ?? 0, amount ?? 0);
  const { message, color } = performanceConfig(percentage);

  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <Card className="max-w-4xl m-4">
        <CardHeader>
          <CardTitle className="flex flex-col items-center gap-4">
            <div className="bg-secondary border-4 w-fit p-4">
              <TrophyIcon size={"4rem"} />
            </div>
            Quiz Over!
          </CardTitle>
          <CardDescription className="text-xl text-center font-extrabold">
            Well done, {userName}!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center">
          <div
            className={cn(
              "flex flex-col items-center gap-4 border-4 p-8",
              color,
            )}
          >
            <div>
              <h2 className="text-4xl font-bold text-center leading-normal">
                {percentage}%
              </h2>

              <h2 className="text-2xl font-bold text-center leading-normal flex items-center gap-2">
                {message}
              </h2>
            </div>

            <div className="flex flex-col text-center border-4 p-4 gap-4 bg-accent-foreground md:w-md">
              <ResultInfoRow
                label="Category"
                value={toSentenceCase(categoryName)}
              />
              <ResultInfoRow
                label="Difficulty"
                value={toSentenceCase(difficulty)}
              />
              <ResultInfoRow label="Type" value={triviaTypeLabel(triviaType)} />
              <ResultInfoRow label="Total Questions" value={amount} />
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-8">
            <ScoreBox
              icon={<CircleCheckIcon />}
              value={correct}
              color="green"
            />
            <ScoreBox icon={<CircleXIcon />} value={incorrect} color="red" />
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
