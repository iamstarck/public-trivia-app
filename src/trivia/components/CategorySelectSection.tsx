import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useTriviaStore, {
  type Difficulty,
  type TriviaType,
} from "../stores/useTriviaStore";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/useCategories";
import { Skeleton } from "@/components/ui/skeleton";

const CategorySelectSection = () => {
  const { userName, category, difficulty, triviaType, amount } =
    useTriviaStore();
  const setCategory = useTriviaStore((s) => s.setCategory);
  const setDifficulty = useTriviaStore((s) => s.setDifficulty);
  const setTriviaType = useTriviaStore((s) => s.setTriviaType);
  const setAmount = useTriviaStore((s) => s.setAmount);
  const setScreen = useTriviaStore((s) => s.setScreen);
  const changeUser = useTriviaStore((s) => s.reset);

  const { data, isLoading, isError } = useCategories();

  const categories = data ?? [];
  const amounts = [10, 15, 20];

  const canPlay =
    category !== undefined &&
    difficulty !== undefined &&
    triviaType !== undefined &&
    amount !== null;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center min-h-screen justify-center">
        <Card className="m-4 w-full max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
          <CardHeader>
            <CardTitle>Welcome, {userName}</CardTitle>
            <CardDescription>Choose Your Trivia Category</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-12">
            <div className="flex flex-col gap-4">
              <Label>Category</Label>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-11 w-full md:w-full lg:w-full rounded-none"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Label>Difficulty</Label>
              <Skeleton className="h-11 lg:w-202.5 xl:w-full rounded-none" />
            </div>

            <div className="flex flex-col gap-4">
              <Label>Trivia Type</Label>
              <Skeleton className="h-11 lg:w-202.5 xl:w-full rounded-none" />
            </div>

            <div className="flex flex-col gap-4">
              <Label>Amount</Label>

              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10  gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-11 w-20.5 rounded-none" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center min-h-screen justify-center">
        <Card className="m-4 w-full max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
          <CardHeader>
            <CardTitle>Welcome, {userName}</CardTitle>
            <CardDescription>Choose Your Trivia Category</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-12">
            <div className="flex flex-col gap-4">
              <Label>Category</Label>
              <p className="text-base text-muted-foreground w-118.75 lg:w-200">
                Error loading categories.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <Card className="m-4 w-full max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        <CardHeader>
          <CardTitle>Welcome, {userName}</CardTitle>
          <CardDescription>Choose Your Trivia Category</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-12">
          <div className="flex flex-col gap-4">
            <Label>Category</Label>
            <RadioGroup
              onValueChange={(value) => {
                const selected = categories.find(
                  (cat) => cat.id === Number(value),
                );
                setCategory(Number(value), selected?.name ?? "");
              }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-start space-x-2">
                  <RadioGroupItem
                    id={String(cat.id)}
                    value={String(cat.id)}
                    className="sr-only peer"
                  />
                  <Label
                    htmlFor={String(cat.id)}
                    className={cn(
                      "rounded-sm border-2 border-border px-8 py-4 transition-all cursor-pointer w-full text-center lg:text-left select-none",
                      "shadow-[4px_4px_0_0_#070707] hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-none",
                      "dark:border-background dark:bg-zinc-800 dark:text-background dark:shadow-[4px_4px_0_0_#e8e9e1]",
                      "peer-data-[state=checked]:bg-secondary peer-data-[state=checked]:shadow-none peer-data-[state=checked]:translate-y-1",
                    )}
                  >
                    {cat.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-4">
            <Label>Difficulty</Label>
            <Select
              value={difficulty || ""}
              onValueChange={(value) => setDifficulty(value as Difficulty)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pick How Tough You Want It" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Difficulty</SelectLabel>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-4">
            <Label>Trivia Type</Label>
            <Select
              value={triviaType || ""}
              onValueChange={(value) => setTriviaType(value as TriviaType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose Your Preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Trivia Type</SelectLabel>
                  <SelectItem value="multiple">Multiple Choice</SelectItem>
                  <SelectItem value="boolean">True/False</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-4">
            <Label>Amount</Label>
            <RadioGroup
              onValueChange={(value) => {
                setAmount(Number(value));
              }}
              className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 gap-4"
            >
              {amounts.map((n) => (
                <div key={n} className="flex items-start space-x-2">
                  <RadioGroupItem
                    id={`amount-${n}`}
                    value={String(n)}
                    className="sr-only peer"
                  />
                  <Label
                    htmlFor={`amount-${n}`}
                    className={cn(
                      "rounded-sm border-2 border-border px-8 py-4 transition-all cursor-pointer w-fit text-center lg:text-left select-none",
                      "shadow-[4px_4px_0_0_#070707] hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-none",
                      "dark:border-background dark:bg-zinc-800 dark:text-background dark:shadow-[4px_4px_0_0_#e8e9e1]",
                      "peer-data-[state=checked]:bg-secondary peer-data-[state=checked]:shadow-none peer-data-[state=checked]:translate-y-1",
                    )}
                  >
                    {n}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-0">
          <Button
            variant="brutal"
            className="w-fit bg-primary"
            onClick={changeUser}
          >
            Back to Home
          </Button>
          <Button
            variant="brutal"
            className="w-fit"
            disabled={!canPlay}
            onClick={() => setScreen("trivia")}
          >
            Play Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CategorySelectSection;
