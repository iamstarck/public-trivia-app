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
import useTriviaStore from "../stores/useTriviaStore";
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

const CategorySelectSection = () => {
  const { userName } = useTriviaStore();
  const changeUser = useTriviaStore((s) => s.changeUser);

  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <Card className="max-w-4xl m-4">
        <CardHeader>
          <CardTitle>Welcome, {userName}</CardTitle>
          <CardDescription>Choose Your Quiz Category</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-12">
          <div className="flex flex-col gap-4">
            <Label>Category</Label>
            <RadioGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="category-1" className="sr-only peer" />
                <Label
                  className={cn(
                    "rounded-sm border-2 border-border px-8 py-4 transition-all cursor-pointer w-full text-center lg:text-left",
                    "shadow-[4px_4px_0_0_#070707] hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-none",
                    "dark:border-background dark:bg-zinc-800 dark:text-background dark:shadow-[4px_4px_0_0_#e8e9e1]",
                    "peer-data-[state=checked]:bg-secondary peer-data-[state=checked]:shadow-none peer-data-[state=checked]:translate-y-1",
                  )}
                >
                  Category Name
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-4">
            <Label>Difficulty</Label>
            <Select>
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
        </CardContent>
        <CardFooter className="flex justify-between p-0">
          <Button
            variant="brutal"
            className="w-fit bg-primary"
            onClick={changeUser}
          >
            Back to Home
          </Button>
          <Button variant="brutal" className="w-fit">
            Play Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CategorySelectSection;
