import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  BoxIcon,
  ChartNoAxesColumnIncreasingIcon,
  CheckIcon,
  RotateCcwIcon,
  ScrollTextIcon,
  TargetIcon,
  TrophyIcon,
  XIcon,
} from "lucide-react";
import useTriviaStore from "../../../stores/useTriviaStore";
import { cn } from "@/lib/utils";
import {
  getResultPercentage,
  performanceConfig,
  toSentenceCase,
  triviaTypeLabel,
} from "./resultUtils";
import ResultInfoRow from "@/views/components/ResultInfoRow";

const ResultSection = () => {
  const {
    userName,
    categoryName,
    difficulty,
    triviaType,
    amount,
    answers,
    correct,
    reset,
  } = useTriviaStore();

  const answered = Object.keys(answers).length;
  const wrong = answered - correct;

  const percentage = getResultPercentage(correct ?? 0, amount ?? 0);
  const { message, color } = performanceConfig(percentage);

  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <Card className="m-4 max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        <CardHeader className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-center">QUIZ COMPLETE</h1>
            <h1 className="text-xl text-center font-semibold">
              Well done, {userName}! 🎉
            </h1>
          </div>
          <div className="flex items-center justify-between gap-6 w-full">
            <div
              className={cn(
                "flex flex-col items-center w-full gap-4 border-4 p-4",
                color,
              )}
            >
              <div className="space-y-2">
                <div>
                  <p className="text-lg font-bold text-center">Accuracy</p>
                  <h2 className="text-4xl font-bold text-center leading-normal">
                    {percentage}%
                  </h2>
                </div>

                <p className=" text-xl font-semibold text-center leading-normal flex max-md:flex-col items-center gap-2">
                  {message}
                </p>
              </div>
            </div>

            <div className="bg-secondary border-4 w-fit p-4 rotate-3">
              <TrophyIcon size={80} />
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4">
          <div className="w-full space-y-2">
            <ResultInfoRow
              bgColor="chart-5"
              icon={<TargetIcon size={28} className="stroke-chart-5" />}
              label="Category"
              value={toSentenceCase(categoryName)}
              textColor="text-background"
            />

            <ResultInfoRow
              bgColor="chart-5"
              icon={
                <ChartNoAxesColumnIncreasingIcon
                  size={28}
                  className="stroke-chart-5"
                />
              }
              label="Difficulty"
              value={toSentenceCase(difficulty)}
              textColor="text-background"
            />

            <ResultInfoRow
              bgColor="chart-5"
              icon={<BoxIcon size={28} className="stroke-chart-5" />}
              label="Type"
              value={triviaTypeLabel(triviaType)}
              textColor="text-background"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <ResultInfoRow
              bgColor="cyan-500"
              icon={<ScrollTextIcon size={28} className="stroke-cyan-500" />}
              label="Answered"
              value={`${answered} / ${amount}`}
            />

            <ResultInfoRow
              bgColor="green-500"
              icon={<CheckIcon size={28} className="stroke-green-500" />}
              label="Correct"
              value={`${correct} / ${amount}`}
            />

            <ResultInfoRow
              bgColor="red-500"
              icon={<XIcon size={28} className="stroke-red-500" />}
              label="Wrong"
              value={`${wrong} / ${amount}`}
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={() => reset()}
            variant={"brutal"}
            className="w-full space-x-2"
          >
            <span>Take Another Quiz</span>
            <RotateCcwIcon size={18} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResultSection;
