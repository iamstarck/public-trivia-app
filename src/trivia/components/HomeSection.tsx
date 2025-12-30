import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CircleAlertIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useTriviaStore from "../stores/useTriviaStore";

const playerSchema = z.object({
  playerName: z
    .string()
    .min(3, { error: "Min 3" })
    .max(12, { error: "Max 12" }),
});

type PlayerFormValues = z.infer<typeof playerSchema>;

const HomeSection = () => {
  const insertPlayerName = useTriviaStore((s) => s.setUserName);

  const defaultValues: PlayerFormValues = {
    playerName: "",
  };

  const form = useForm<PlayerFormValues>({
    resolver: zodResolver(playerSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const onSubmitHandler = (data: PlayerFormValues) => {
    insertPlayerName(data);

    reset(defaultValues);
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <div className="px-15 py-10 border-dashed text-center flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-extrabold text-center leading-normal">
            Can You Guess It?
          </h1>
          <p className="leading-normal">
            Created by{" "}
            <a
              href="https://github.com/iamstarck"
              target="_blank"
              className="text-accent"
            >
              iamstarck
            </a>
          </p>
          <p className="leading-normal">
            Trivia Provided by{" "}
            <a
              href="https://opentdb.com/"
              target="_blank"
              className="text-accent"
            >
              Open Trivia DB
            </a>
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="brutal" className="w-fit self-center">
              Start
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Ready to Play? Enter Your Name</DialogTitle>
              <DialogDescription>
                Let’s get to know you before the game starts.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-4">
                  <FieldSet>
                    <FieldGroup>
                      <Field
                        data-invalid={!!errors.playerName}
                        className="mb-4"
                      >
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input
                          id="name"
                          type="text"
                          {...register("playerName")}
                          className="col-span-3"
                        />
                        {errors.playerName && (
                          <FieldError className="inline-flex items-center gap-1 text-primary">
                            <CircleAlertIcon size="14px" />{" "}
                            {errors.playerName.message}
                          </FieldError>
                        )}
                      </Field>
                    </FieldGroup>
                  </FieldSet>
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" variant="brutal">
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HomeSection;
